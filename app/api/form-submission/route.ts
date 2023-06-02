// API route for handling form submissions
// Stores submissions in Firestore: user_forms/{websiteId}/forms/{formId}/submissions/{submissionId}
// Sends email notifications to both the submitter and the site owner

import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, FieldValue } from '@/lib/firebase-admin';
import crypto from 'crypto';
import { EmailService } from '@/lib/emailService';
import { googleSheetsService } from '@/lib/googleSheetsService';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    console.log('[Form Submission] Received request');
    const body = await request.json();
    console.log('[Form Submission] Request body:', JSON.stringify(body, null, 2));

    const {
      websiteId,
      formId,
      formName,
      formType,
      formData,
      altchaPayload,
      pageUrl,
      userAgent,
      successMessage,
    } = body;

    console.log('[Form Submission] Extracted fields:', {
      websiteId,
      formId,
      formName,
      formType,
      hasFormData: !!formData,
      hasAltchaPayload: !!altchaPayload
    });

    // Validate required fields
    if (!websiteId || !formId || !formData) {
      console.error('[Form Submission] Validation failed - missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: websiteId, formId, formData' },
        { status: 400 }
      );
    }

    // Verify ALTCHA proof-of-work if provided (optional - graceful degradation)
    if (altchaPayload) {
      console.log('[Form Submission] ALTCHA payload present, verifying...');
      try {
        // Parse the ALTCHA payload
        const payload = JSON.parse(Buffer.from(altchaPayload, 'base64').toString());
        console.log('[Form Submission] ALTCHA payload decoded:', payload);
        const { algorithm, challenge, number, salt } = payload;

        // Verify the challenge was solved correctly
        // ALTCHA format: hash(salt + number)
        const computedChallenge = crypto
          .createHash(algorithm.toLowerCase())
          .update(salt + number.toString())
          .digest('hex');

        console.log('[Form Submission] ALTCHA verification:', {
          challenge,
          computedChallenge,
          match: computedChallenge === challenge
        });

        if (computedChallenge !== challenge) {
          console.log('[Form Submission] ALTCHA verification failed - invalid solution');
          return NextResponse.json(
            { error: 'ALTCHA verification failed' },
            { status: 403 }
          );
        }

        console.log('[Form Submission] ALTCHA verification successful');
      } catch (verifyError) {
        console.error('[Form Submission] ALTCHA verification error:', verifyError);
        // Don't block submission if ALTCHA fails to verify - graceful degradation
        console.log('[Form Submission] ALTCHA verification error - allowing submission with honeypot only');
      }
    } else {
      console.log('[Form Submission] No ALTCHA payload - relying on honeypot protection only');
    }

    // Create the document path: user_forms/{websiteId}/forms/{formId}/submissions
    // Using Firebase Admin SDK - async to support both VM and Cloud Run environments
    console.log('[Form Submission] Getting Firestore database instance...');
    const adminDb = await getAdminDb();

    console.log('[Form Submission] Creating Firestore reference...');
    const submissionsRef = adminDb
      .collection('user_forms')
      .doc(websiteId)
      .collection('forms')
      .doc(formId)
      .collection('submissions');

    // Add the submission with timestamp
    const submissionData = {
      formName: formName || 'Unnamed Form',
      formType: formType || 'unknown',
      formData,
      pageUrl: pageUrl || '',
      userAgent: userAgent || '',
      submittedAt: FieldValue.serverTimestamp(),
      status: 'new',
      read: false,
    };

    console.log('[Form Submission] Submission data prepared:', {
      formName: submissionData.formName,
      formType: submissionData.formType,
      fieldsCount: Object.keys(formData).length
    });

    console.log('[Form Submission] Writing to Firestore with Admin SDK...');
    const docRef = await submissionsRef.add(submissionData);
    console.log('[Form Submission] Successfully written to Firestore, doc ID:', docRef.id);

    // Sync to Google Sheets (non-blocking)
    try {
      console.log('[Form Submission] Checking Google Sheets integration...');

      // Fetch sheets config from form_settings collection
      const settingsDoc = await adminDb
        .collection('form_settings')
        .doc(websiteId)
        .get();

      const settings = settingsDoc.data();
      const sheetsConfig = settings?.integrations?.googleSheets;

      if (sheetsConfig?.enabled && sheetsConfig?.sheetId && sheetsConfig?.connected) {
        console.log('[Form Submission] Google Sheets sync enabled, syncing...');

        const submittedAt = new Date().toISOString();
        const result = await googleSheetsService.appendFormSubmission(
          {
            sheetId: sheetsConfig.sheetId,
            sheetName: sheetsConfig.sheetName || 'Sheet1',
            enabled: true,
            accessToken: sheetsConfig.accessToken,
            refreshToken: sheetsConfig.refreshToken,
            expiryDate: sheetsConfig.expiryDate,
          },
          formData,
          formName || 'Form Submission',
          submittedAt,
          // Callback to update refreshed tokens in Firestore
          async (newToken: string, expiryDate: number) => {
            await adminDb
              .collection('form_settings')
              .doc(websiteId)
              .update({
                'integrations.googleSheets.accessToken': newToken,
                'integrations.googleSheets.expiryDate': expiryDate,
              });
            console.log('[Form Submission] Updated refreshed OAuth token');
          }
        );

        if (result.success) {
          console.log('[Form Submission] ✅ Successfully synced to Google Sheets');

          // Update last synced timestamp
          await adminDb
            .collection('form_settings')
            .doc(websiteId)
            .update({
              'integrations.googleSheets.lastSyncedAt': FieldValue.serverTimestamp(),
            });
        } else {
          console.log('[Form Submission] ⚠️ Google Sheets sync failed:', result.error);

          // Increment sync error counter
          await adminDb
            .collection('form_settings')
            .doc(websiteId)
            .update({
              'integrations.googleSheets.syncErrors': FieldValue.increment(1),
            });
        }
      } else {
        console.log('[Form Submission] Google Sheets integration not configured or disabled');
      }
    } catch (sheetsError) {
      console.error('[Form Submission] Google Sheets sync error (non-critical):', sheetsError);
      // Don't fail the submission if sheets sync fails
    }

    // Send email notifications
    try {
      console.log('[Form Submission] Loading metadata for email configuration...');

      // Read metadata.json to get business name and email configuration
      const metadataPath = path.join(process.cwd(), '_metadata.json');
      let businessName = 'Our Business';
      let ownerEmail: string | undefined;
      let customMessage: string | undefined;
      let submitterEmail: string | undefined;
      let emailFromName: string | undefined;

      if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
        // Get default business name from global metadata
        const defaultBusinessName = metadata.name || metadata.businessName || businessName;
        businessName = defaultBusinessName;

        // Find the form component in metadata to get email configuration
        const page = metadata.pages?.find((p: any) =>
          p.components?.some((c: any) => c.id === formId || c.content?.formId === formId)
        );

        if (page) {
          const component = page.components?.find((c: any) =>
            c.id === formId || c.content?.formId === formId
          );

          if (component?.content) {
            ownerEmail = component.content.submitEmail;
            customMessage = component.content.customEmailMessage;
            emailFromName = component.content.emailFromName;

            // Use form-specific emailFromName if provided, otherwise use global business name
            businessName = emailFromName || defaultBusinessName;
          }
        }
      }

      // Extract submitter email from form data
      submitterEmail = formData.email || formData.Email || formData.emailAddress;

      console.log('[Form Submission] Email configuration:', {
        businessName,
        emailFromName,
        ownerEmail,
        submitterEmail,
        hasCustomMessage: !!customMessage,
      });

      // Send confirmation email to submitter (if email provided in form)
      if (submitterEmail) {
        console.log('[Form Submission] Sending confirmation email to submitter...');
        const confirmationSent = await EmailService.sendFormSubmissionConfirmation(
          submitterEmail,
          businessName,
          formName || 'Contact Form',
          formData,
          customMessage,
          ownerEmail
        );

        if (confirmationSent) {
          console.log('[Form Submission] ✅ Confirmation email sent to submitter');
        } else {
          console.log('[Form Submission] ⚠️ Confirmation email not sent (AWS SES may not be configured)');
        }
      } else {
        console.log('[Form Submission] No submitter email found in form data - skipping confirmation email');
      }

      // Send notification email to owner (if configured)
      if (ownerEmail) {
        console.log('[Form Submission] Sending notification email to owner...');
        const notificationSent = await EmailService.sendFormSubmissionNotificationToOwner(
          ownerEmail,
          businessName,
          formName || 'Contact Form',
          formData,
          submitterEmail,
          docRef.id
        );

        if (notificationSent) {
          console.log('[Form Submission] ✅ Notification email sent to owner');
        } else {
          console.log('[Form Submission] ⚠️ Notification email not sent (AWS SES may not be configured)');
        }
      } else {
        console.log('[Form Submission] No owner email configured - skipping notification email');
      }
    } catch (emailError) {
      console.error('[Form Submission] Email notification error (non-critical):', emailError);
      // Don't fail the submission if email fails - it's already saved to Firestore
    }

    return NextResponse.json(
      {
        success: true,
        submissionId: docRef.id,
        message: successMessage || 'Form submission received successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Form Submission] ERROR:', error);
    console.error('[Form Submission] Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    return NextResponse.json(
      {
        error: 'Failed to submit form',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve submissions (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const websiteId = searchParams.get('websiteId');
    const formId = searchParams.get('formId');

    if (!websiteId || !formId) {
      return NextResponse.json(
        { error: 'Missing required parameters: websiteId, formId' },
        { status: 400 }
      );
    }

    // Note: In a real implementation, you'd want to add authentication here
    // to ensure only authorized users can view submissions

    return NextResponse.json(
      {
        message: 'Use Firestore client SDK to query submissions',
        path: `user_forms/${websiteId}/forms/${formId}/submissions`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving submissions:', error);

    return NextResponse.json(
      {
        error: 'Failed to retrieve submissions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
