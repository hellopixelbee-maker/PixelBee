# Pixel Bee → Google Sheets

This small Google Apps Script receives validated contact requests from the
Pixel Bee Vercel function and appends them to a private Google Sheet.

## Setup

1. Create a private Google Sheet for Pixel Bee contacts.
2. In that Sheet open **Extensions → Apps Script**.
3. Replace the editor contents with `Code.gs` from this folder and save it.
4. Select `configurePixelBee` and click **Run** once. Approve Google's prompt.
5. Open **Execution log** and copy the generated
   `GOOGLE_SHEETS_WEBHOOK_SECRET` value.
6. Choose **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Deploy and copy the Web app URL ending in `/exec`.
8. Add these values in Vercel → Project → Settings → Environment Variables:

```bash
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
GOOGLE_SHEETS_WEBHOOK_SECRET=the-value-from-the-execution-log
```

9. Redeploy the latest Vercel deployment and submit one test request.

The script creates a `Contact Requests` tab automatically. Keep the spreadsheet
private. The secret is sent only by the Vercel serverless function and must not
be added to frontend code or committed to Git.
