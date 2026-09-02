/**
 * ==============================================================================
 * Testbook Govt Exam Tools - Student Mobile / Email Google Sheet Logger
 * ==============================================================================
 * 
 * ⚠️ CRITICAL DEPLOYMENT SETTING:
 * When clicking "Deploy" -> "New deployment":
 * 1. Execute as: "Me" (your email)
 * 2. Who has access: "Anyone"
 *    (IMPORTANT: If it says "Anyone within testbook.com", external students cannot submit data and Google will block it. Make sure to choose "Anyone"!)
 * ==============================================================================
 */

function handleLeadLogging(data) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create header row if sheet is fresh/empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp (IST)", "Mobile / Email", "Device / User Agent", "Source Tool", "Status"]);
      sheet.getRange(1, 1, 1, 5)
        .setFontWeight("bold")
        .setBackground("#0076D7")
        .setFontColor("#FFFFFF")
        .setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }
    
    var contact = data.mobileOrEmail || data.contact || data.phone || data.email || "Unknown";
    var userAgent = data.userAgent || data.device || "Browser Client";
    var toolVisited = data.toolVisited || data.source || "Govt Exam Tools";
    
    // Format timestamp in Indian Standard Time (IST)
    var timestamp = new Date();
    var formattedDate = Utilities.formatDate(timestamp, "Asia/Kolkata", "dd-MMM-yyyy hh:mm:ss a");
    
    // Append the student's entry
    sheet.appendRow([formattedDate, contact, userAgent, toolVisited, "Verified Student"]);
    
    // Format row styling
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 5).setVerticalAlignment("middle");
    sheet.getRange(lastRow, 2).setFontWeight("bold");
    
    return ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "message": "Student contact saved successfully",
      "timestamp": formattedDate,
      "contact": contact
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error",
      "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  var data = {};
  if (e && e.postData && e.postData.contents) {
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      data = e.parameter || {};
    }
  } else if (e && e.parameter) {
    data = e.parameter;
  }
  return handleLeadLogging(data);
}

function doGet(e) {
  var data = (e && e.parameter) ? e.parameter : {};
  if (data.mobileOrEmail || data.contact || data.phone || data.email) {
    return handleLeadLogging(data);
  }
  return ContentService.createTextOutput(JSON.stringify({
    "status": "active",
    "service": "Testbook Govt Tools Lead Logger",
    "message": "Web App is active and ready to log student contacts."
  })).setMimeType(ContentService.MimeType.JSON);
}
