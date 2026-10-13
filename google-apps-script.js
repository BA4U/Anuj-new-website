/**
 * GOOGLE APPS SCRIPT — LinkedIn Funnel Lead Logger
 * ─────────────────────────────────────────────────
 * This script turns a Google Sheet into a free database
 * for every LinkedIn funnel submission.
 *
 * HOW TO SET UP (5 minutes):
 * ──────────────────────────
 * 1. Create a new Google Sheet at https://sheets.google.com
 *    - Name the sheet "Funnel Leads" (optional)
 *    - Add these headers in Row 1:
 *      A: Timestamp | B: Date | C: Email | D: Funnel | E: Detail | F: Email ID | G: Status
 *
 *      Funnel = "linkedin" | "reel-hooks" | "youtube-audit" (the lead-magnet source)
 *      Detail = LinkedIn URL, YouTube channel URL, or the user's niche
 *      Status flows: new → contacted → client  (update manually or via the script)
 *
 * 2. In the sheet, click Extensions → Apps Script
 *
 * 3. Delete any existing code and paste the entire function below
 *
 * 4. Click Save (Ctrl+S)
 *
 * 5. Click Deploy → New Deployment
 *    - Type: "Web App"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"  ← IMPORTANT
 *    - Click Deploy
 *    - Copy the Web App URL that looks like:
 *      https://script.google.com/macros/s/AKfycb.../exec
 *
 * 6. Paste that URL into your .env.local as GOOGLE_SHEETS_WEBHOOK_URL
 *
 * DONE! Every LinkedIn funnel submission will now appear as a new row.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.date || new Date().toISOString().slice(0, 10),
      data.email || "",
      data.funnel || data.source || "unknown",
      data.linkedinUrl || data.channelUrl || data.niche || "",
      data.emailId || "unknown",
      data.status || "new"
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test this function manually from Apps Script editor to verify it works:
function testAppend() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date().toISOString(),
    new Date().toISOString().slice(0, 10),
    "test@example.com",
    "linkedin",
    "https://linkedin.com/in/test-user",
    "test_email_id",
    "new"
  ]);
  Logger.log("Test row appended successfully!");
}
