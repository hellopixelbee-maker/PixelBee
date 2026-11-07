const CONTACT_SHEET_NAME = 'Contact Requests';
const CONTACT_HEADERS = [
  'გაგზავნის დრო',
  'სახელი და გვარი',
  'კომპანია / ბრენდი',
  'საკომუნიკაციო არხი',
  'საკონტაქტო ინფორმაცია',
  'შეტყობინება',
  'სტატუსი',
];

function doPost(event) {
  try {
    const properties = PropertiesService.getScriptProperties();
    const expectedSecret = properties.getProperty('WEBHOOK_SECRET');
    const spreadsheetId = properties.getProperty('SHEET_ID');

    if (!expectedSecret || !spreadsheetId) {
      throw new Error('Pixel Bee Google Sheets integration is not configured.');
    }

    const payload = JSON.parse(event.postData.contents || '{}');
    if (!payload.secret || payload.secret !== expectedSecret) {
      return jsonResponse({ ok: false, error: 'Unauthorized.' });
    }

    const channelLabels = {
      phone: 'ტელეფონი',
      whatsapp: 'WhatsApp',
      email: 'ელფოსტა',
    };
    const submittedAt = payload.submittedAt ? new Date(payload.submittedAt) : new Date();
    const safeSubmittedAt = Number.isNaN(submittedAt.getTime()) ? new Date() : submittedAt;
    const lock = LockService.getScriptLock();

    lock.waitLock(10000);
    try {
      const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      const sheet = spreadsheet.getSheetByName(CONTACT_SHEET_NAME) ||
        spreadsheet.insertSheet(CONTACT_SHEET_NAME);

      if (sheet.getLastRow() === 0) {
        sheet.appendRow(CONTACT_HEADERS);
        sheet.setFrozenRows(1);
        sheet.getRange(1, 1, 1, CONTACT_HEADERS.length)
          .setFontWeight('bold')
          .setBackground('#11172a')
          .setFontColor('#ffffff');
      }

      sheet.appendRow([
        safeSubmittedAt,
        safeCell(payload.fullName),
        safeCell(payload.company),
        channelLabels[payload.channel] || safeCell(payload.channel),
        safeCell(payload.contact),
        safeCell(payload.message || ''),
        'ახალი',
      ]);

      const newRow = sheet.getLastRow();
      sheet.getRange(newRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
      sheet.getRange(newRow, 6).setWrap(true);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: 'Unable to save contact request.' });
  }
}

function configurePixelBee() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error('Run this function from an Apps Script project attached to your Google Sheet.');
  }

  const secret = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
  PropertiesService.getScriptProperties().setProperties({
    SHEET_ID: spreadsheet.getId(),
    WEBHOOK_SECRET: secret,
  });

  console.log('GOOGLE_SHEETS_WEBHOOK_SECRET=' + secret);
}

function safeCell(value) {
  const text = String(value || '').replace(/\u0000/g, '').trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
