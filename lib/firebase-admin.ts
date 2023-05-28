// Firebase Admin SDK for server-side operations
// This provides full Firestore access without needing authentication
// Supports: VM (file-based), Cloud Run (Secret Manager), and fallback (env variable)
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Firebase Admin SDK
async function initializeFirebaseAdmin() {
  try {
    // Check if already initialized
    if (admin.apps && admin.apps.length > 0) {
      console.log('Firebase Admin already initialized');
      return admin.apps[0];
    }

    // Get project configuration
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'ws-main-site';
    console.log(`Initializing Firebase Admin for project: ${projectId}`);

    let app;

    // Priority 1: Check for environment variable (Cloud Run with Secret Manager)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      console.log('Loading service account from environment variable (Cloud Run)');
      console.log('FIREBASE_SERVICE_ACCOUNT env var exists, length:', process.env.FIREBASE_SERVICE_ACCOUNT.length);
      console.log('First 100 chars:', process.env.FIREBASE_SERVICE_ACCOUNT.substring(0, 100));
      try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        console.log('Successfully parsed service account, project_id:', serviceAccount.project_id);
        app = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          projectId: serviceAccount.project_id || projectId
        });
        console.log('Firebase Admin initialized with service account from environment');
        return app;
      } catch (error) {
        console.error('Error loading service account from environment:', error);
        console.error('Error details:', error instanceof Error ? error.message : String(error));
        // Continue to next option
      }
    } else {
      console.log('FIREBASE_SERVICE_ACCOUNT environment variable not found');
    }

    // Priority 2: Check for service account file on VM
    const sharedServiceAccountPath = '/opt/shared/firebase-service-account.json';
    if (fs.existsSync(sharedServiceAccountPath)) {
      console.log('Loading service account from shared folder:', sharedServiceAccountPath);
      try {
        const serviceAccount = JSON.parse(fs.readFileSync(sharedServiceAccountPath, 'utf8'));
        app = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          projectId: serviceAccount.project_id || projectId
        });
        console.log('Firebase Admin initialized with service account from shared folder');
        return app;
      } catch (error) {
        console.error('Error loading service account from shared folder:', error);
        // Continue to fallback
      }
    }

    // Priority 3: Fallback to default credentials (for GCP environment)
    console.log('No service account found, using default credentials');
    app = admin.initializeApp({ projectId });
    console.log('Firebase Admin initialized with default credentials (fallback)');

    return app;
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error;
  }
}

// Initialize Admin app (note: this is now async-safe)
let firebaseApp: admin.app.App | null = null;
let firestoreDb: FirebaseFirestore.Firestore | null = null;

// Lazy initialization wrapper
async function getFirebaseApp() {
  if (!firebaseApp) {
    firebaseApp = await initializeFirebaseAdmin();
  }
  return firebaseApp;
}

async function getFirestoreDb() {
  if (!firestoreDb) {
    const app = await getFirebaseApp();
    if (app) {
      firestoreDb = app.firestore();

      // Apply settings only once
      if (!process.env.FIRESTORE_SETTINGS_APPLIED) {
        firestoreDb.settings({
          ignoreUndefinedProperties: true
        });
        process.env.FIRESTORE_SETTINGS_APPLIED = 'true';
        console.log('Firestore Admin initialized successfully');
      }
    } else {
      throw new Error('Firebase app not initialized');
    }
  }
  return firestoreDb;
}

// For backward compatibility - initialize immediately for VM environment
if (fs.existsSync('/opt/shared/firebase-service-account.json') || process.env.FIREBASE_SERVICE_ACCOUNT) {
  initializeFirebaseAdmin().then(app => {
    firebaseApp = app;
    if (app) {
      firestoreDb = app.firestore();
      if (!process.env.FIRESTORE_SETTINGS_APPLIED) {
        firestoreDb.settings({
          ignoreUndefinedProperties: true
        });
        process.env.FIRESTORE_SETTINGS_APPLIED = 'true';
        console.log('Firestore Admin initialized successfully (immediate)');
      }
    }
  }).catch(error => {
    console.error('Failed to initialize Firebase Admin:', error);
  });
}

// Export the admin Firestore instance and utilities
// Note: adminDb might be null initially in Cloud Run, routes should handle this
export const adminDb = firestoreDb!; // For backward compatibility
export const getAdminDb = getFirestoreDb; // Async version for Cloud Run
export const FieldValue = admin.firestore.FieldValue;
export { firebaseApp, getFirebaseApp };
export default admin;
