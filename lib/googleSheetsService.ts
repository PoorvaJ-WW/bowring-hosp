// Google Sheets Service for form submission auto-sync
// Uses user's OAuth tokens to append to their sheets

import { google } from 'googleapis';

interface SheetsConfig {
  sheetId: string;
  sheetName?: string;
  enabled: boolean;
  accessToken: string;
  refreshToken: string;
  expiryDate?: number;
}

interface FormData {
  [key: string]: string | number | boolean | undefined;
}

interface TokenRefreshResult {
  accessToken: string;
  expiryDate: number;
}

class GoogleSheetsService {
  private getOAuth2Client() {
    return new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
  }

  async refreshAccessToken(refreshToken: string): Promise<TokenRefreshResult | null> {
    try {
      const oauth2Client = this.getOAuth2Client();
      oauth2Client.setCredentials({ refresh_token: refreshToken });

      const { credentials } = await oauth2Client.refreshAccessToken();

      if (credentials.access_token && credentials.expiry_date) {
        return {
          accessToken: credentials.access_token,
          expiryDate: credentials.expiry_date,
        };
      }
      return null;
    } catch (error) {
      console.error('[GoogleSheets] Failed to refresh token:', error);
      return null;
    }
  }

  async appendFormSubmission(
    config: SheetsConfig,
    formData: FormData,
    formName: string,
    submittedAt: string,
    onTokenRefresh?: (newToken: string, expiryDate: number) => Promise<void>
  ): Promise<{ success: boolean; error?: string }> {
    if (!config.enabled || !config.sheetId) {
      return { success: false, error: 'Sheets sync not enabled' };
    }

    if (!config.accessToken || !config.refreshToken) {
      return { success: false, error: 'No OAuth tokens configured' };
    }

    try {
      const oauth2Client = this.getOAuth2Client();
      let accessToken = config.accessToken;

      // Check if token needs refresh (5 min buffer)
      const now = Date.now();
      if (config.expiryDate && config.expiryDate < now + 5 * 60 * 1000) {
        console.log('[GoogleSheets] Token expired, refreshing...');
        const refreshed = await this.refreshAccessToken(config.refreshToken);

        if (refreshed) {
          accessToken = refreshed.accessToken;
          // Notify caller to update stored tokens
          if (onTokenRefresh) {
            await onTokenRefresh(refreshed.accessToken, refreshed.expiryDate);
          }
        } else {
          return { success: false, error: 'Failed to refresh access token' };
        }
      }

      oauth2Client.setCredentials({ access_token: accessToken });
      const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

      const sheetName = config.sheetName || 'Sheet1';
      const range = `${sheetName}!A:Z`;

      // Get current headers from the sheet
      const existingData = await sheets.spreadsheets.values.get({
        spreadsheetId: config.sheetId,
        range: `${sheetName}!1:1`,
      });

      let headers = existingData.data.values?.[0] || [];
      const formFields = Object.keys(formData).filter(
        (key) => key !== 'honeypot' && key !== 'website' // Exclude honeypot fields
      );

      // Build standard headers if sheet is empty
      if (headers.length === 0) {
        headers = ['Timestamp', 'Form Name', ...formFields];

        // Write headers to the sheet
        await sheets.spreadsheets.values.update({
          spreadsheetId: config.sheetId,
          range: `${sheetName}!A1`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers],
          },
        });
        console.log('[GoogleSheets] Created headers:', headers);
      }

      // Check for new fields not in headers and add them
      const newFields = formFields.filter(
        (field) =>
          !headers.includes(field) &&
          field !== 'Timestamp' &&
          field !== 'Form Name'
      );

      if (newFields.length > 0) {
        headers = [...headers, ...newFields];
        await sheets.spreadsheets.values.update({
          spreadsheetId: config.sheetId,
          range: `${sheetName}!A1`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers],
          },
        });
        console.log('[GoogleSheets] Added new columns:', newFields);
      }

      // Build row data matching header order
      const rowData = headers.map((header: string) => {
        if (header === 'Timestamp') return submittedAt;
        if (header === 'Form Name') return formName;
        const value = formData[header];
        if (value === undefined || value === null) return '';
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        return String(value);
      });

      // Append the row
      await sheets.spreadsheets.values.append({
        spreadsheetId: config.sheetId,
        range: range,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [rowData],
        },
      });

      console.log('[GoogleSheets] Successfully appended row to sheet');
      return { success: true };
    } catch (error: any) {
      console.error('[GoogleSheets] Append error:', error?.message);

      if (error?.code === 401 || error?.message?.includes('invalid_grant')) {
        return {
          success: false,
          error: 'OAuth token expired. User needs to reconnect.',
        };
      }
      if (error?.code === 403) {
        return {
          success: false,
          error: 'Access denied to spreadsheet',
        };
      }
      return { success: false, error: error?.message || 'Failed to append to spreadsheet' };
    }
  }
}

// Singleton instance
export const googleSheetsService = new GoogleSheetsService();
