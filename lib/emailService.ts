// Email service for generated websites
// Sends emails via Amazon SES through WisdomScribe.ai infrastructure
// All emails are sent from no-reply@wisdomscribe.ai with business name in the "From" name

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Initialize AWS SES client
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export class EmailService {
  private static fromEmail = 'no-reply@wisdomscribe.ai';

  /**
   * Send an email using AWS SES
   */
  static async sendEmail(
    options: EmailOptions,
    businessName: string
  ): Promise<boolean> {
    console.log('📧 EmailService.sendEmail called with:', {
      to: options.to,
      subject: options.subject,
      businessName,
    });

    try {
      // Check if AWS SES is configured
      if (
        !process.env.AWS_ACCESS_KEY_ID ||
        !process.env.AWS_SECRET_ACCESS_KEY
      ) {
        console.log('⚠️ AWS SES not configured - logging email instead');
        console.log('Email details:', {
          to: options.to,
          subject: options.subject,
          from: `${businessName} <${this.fromEmail}>`,
          replyTo: options.replyTo,
        });

        if (process.env.NODE_ENV === 'development') {
          console.log('📧 Email HTML Preview:', options.html?.substring(0, 500) + '...');
        }

        return false;
      }

      // Convert to array for consistent handling
      const toAddresses = Array.isArray(options.to) ? options.to : [options.to];

      console.log('📤 Sending email via AWS SES:', {
        to: toAddresses,
        from: `${businessName} <${this.fromEmail}>`,
        subject: options.subject,
      });

      const sendEmailCommand = new SendEmailCommand({
        Source: `${businessName} <${this.fromEmail}>`,
        Destination: {
          ToAddresses: toAddresses,
        },
        ...(options.replyTo && {
          ReplyToAddresses: [options.replyTo],
        }),
        Message: {
          Subject: {
            Data: options.subject,
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: options.html,
              Charset: 'UTF-8',
            },
            ...(options.text && {
              Text: {
                Data: options.text,
                Charset: 'UTF-8',
              },
            }),
          },
        },
      });

      const response = await sesClient.send(sendEmailCommand);
      console.log(
        '✅ Email sent successfully via AWS SES to:',
        options.to,
        'MessageId:',
        response.MessageId
      );
      return true;
    } catch (error: any) {
      console.error('❌ AWS SES email error:', error);

      if (error.name === 'MessageRejected') {
        console.error('🚫 AWS SES MessageRejected: Check if sender email is verified');
      } else if (error.name === 'InvalidParameterValue') {
        console.error('🚫 AWS SES InvalidParameterValue: Check email format');
      } else if (error.name === 'AccessDeniedException') {
        console.error('🚫 AWS SES AccessDenied: Invalid credentials or permissions');
      }

      console.error('Error details:', error.message);

      // Don't throw in production, just return false
      if (process.env.NODE_ENV === 'production') {
        return false;
      }

      throw error;
    }
  }

  /**
   * Send form submission notification to the form submitter
   * This email confirms their form was received
   */
  static async sendFormSubmissionConfirmation(
    email: string,
    businessName: string,
    formName: string,
    formData: Record<string, any>,
    customMessage?: string,
    submitEmail?: string
  ): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Form Submission Received</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 0;">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #5C49D8 0%, #7B68EE 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
              Thank You for Contacting Us!
            </h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
              We've received your message
            </p>
          </div>

          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Hello,
            </p>

            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
              Thank you for submitting the <strong>${formName}</strong> form. We have received your submission and will get back to you soon.
            </p>

            ${customMessage ? `
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #3B82F6;">
              <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0;">
                ${customMessage}
              </p>
            </div>
            ` : ''}

            <h3 style="color: #5C49D8; font-size: 20px; margin: 30px 0 15px 0;">Your Submission Details:</h3>

            <div style="background-color: #f8f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              ${Object.entries(formData)
                .map(
                  ([key, value]) => `
                <div style="margin: 10px 0;">
                  <strong style="color: #333; text-transform: capitalize;">${key.replace(/_/g, ' ')}:</strong>
                  <span style="color: #666;">${value}</span>
                </div>
              `
                )
                .join('')}
            </div>

            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0;">
              If you have any questions, feel free to reply to this email.
            </p>

            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
              Best regards,<br>
              <strong>${businessName}</strong>
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8f9ff; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="color: #888; font-size: 14px; margin: 0 0 10px 0;">
              You received this email because you submitted a form at ${businessName}
            </p>
            <p style="color: #888; font-size: 12px; margin: 0;">
              Powered by <a href="https://wisdomscribe.ai" style="color: #5C49D8; text-decoration: none;">WisdomScribe.ai</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Thank You for Contacting Us!

Hello,

Thank you for submitting the ${formName} form. We have received your submission and will get back to you soon.

${customMessage ? `\n${customMessage}\n` : ''}

Your Submission Details:
${Object.entries(formData)
  .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${value}`)
  .join('\n')}

If you have any questions, feel free to reply to this email.

Best regards,
${businessName}

---
Powered by WisdomScribe.ai
    `;

    const emailOptions: EmailOptions = {
      to: email,
      subject: `${businessName} - Form Submission Received`,
      html,
      text,
    };

    // If submitEmail is provided, set it as reply-to so user can reply directly to owner
    if (submitEmail) {
      emailOptions.replyTo = submitEmail;
    }

    return this.sendEmail(emailOptions, businessName);
  }

  /**
   * Send form submission notification to the site owner
   * This email alerts them about a new form submission
   */
  static async sendFormSubmissionNotificationToOwner(
    ownerEmail: string,
    businessName: string,
    formName: string,
    formData: Record<string, any>,
    submitterEmail?: string,
    submissionId?: string
  ): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 0;">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #10B981 0%, #34D399 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
              📋 New Form Submission
            </h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
              You have a new submission from ${businessName}
            </p>
          </div>

          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Hi,
            </p>

            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
              You have received a new submission for the <strong>${formName}</strong> form.
            </p>

            ${submissionId ? `
            <div style="background-color: #f0fdf4; padding: 15px 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10B981;">
              <p style="color: #333; font-size: 14px; margin: 0;">
                <strong>Submission ID:</strong> ${submissionId}
              </p>
            </div>
            ` : ''}

            <h3 style="color: #10B981; font-size: 20px; margin: 30px 0 15px 0;">Submission Details:</h3>

            <div style="background-color: #f8f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              ${Object.entries(formData)
                .map(
                  ([key, value]) => `
                <div style="margin: 12px 0; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                  <strong style="color: #333; text-transform: capitalize; display: block; margin-bottom: 5px;">${key.replace(/_/g, ' ')}:</strong>
                  <span style="color: #666; display: block;">${value}</span>
                </div>
              `
                )
                .join('')}
            </div>

            ${submitterEmail ? `
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #f59e0b;">
              <p style="color: #92400e; font-size: 15px; margin: 0;">
                💡 <strong>Tip:</strong> You can reply directly to this email to respond to <strong>${submitterEmail}</strong>
              </p>
            </div>
            ` : ''}

            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
              Best regards,<br>
              <strong>Your Website Notification System</strong>
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8f9ff; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="color: #888; font-size: 14px; margin: 0 0 10px 0;">
              This is an automated notification from ${businessName}
            </p>
            <p style="color: #888; font-size: 12px; margin: 0;">
              Powered by <a href="https://wisdomscribe.ai" style="color: #5C49D8; text-decoration: none;">WisdomScribe.ai</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
New Form Submission

Hi,

You have received a new submission for the ${formName} form.

${submissionId ? `Submission ID: ${submissionId}\n` : ''}

Submission Details:
${Object.entries(formData)
  .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${value}`)
  .join('\n')}

${submitterEmail ? `\nYou can reply directly to this email to respond to ${submitterEmail}` : ''}

Best regards,
Your Website Notification System

---
Powered by WisdomScribe.ai
    `;

    const emailOptions: EmailOptions = {
      to: ownerEmail,
      subject: `[${businessName}] New Form Submission - ${formName}`,
      html,
      text,
    };

    // If submitter email is provided, set it as reply-to
    if (submitterEmail) {
      emailOptions.replyTo = submitterEmail;
    }

    return this.sendEmail(emailOptions, businessName);
  }
}
