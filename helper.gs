function LoadData() {
      var sheet = SpreadsheetApp.openByUrl(SHEET_URL).getSheetByName(SHEET_NAME);
      
      const [header, ...data] = sheet.getDataRange().getDisplayValues();
      const PHONE = header.indexOf('Phone');
      const TEXT = header.indexOf('Text');
      const STATUS = header.indexOf('Status');
      const output = [];
      
      data.forEach((row, index) => {
                   
                   if (row[STATUS] === '') {
        output.push([index + 1, row[PHONE], row[TEXT]]);
      }
    });
    
    const json = JSON.stringify(output);
    return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.TEXT);
}

function UpdateStatus(row) {
  const sheet = SpreadsheetApp.openByUrl(SHEET_URL).getSheetByName(SHEET_NAME);
   const [header] = sheet.getRange('A1:1').getValues();
   const STATUS = header.indexOf('Status');
   var rowId = Number(row);
   sheet.getRange(rowId + 1, STATUS + 1).setValue('SMS Sent');
   return ContentService.createTextOutput('SMS_Sent' + rowId).setMimeType(ContentService.MimeType.TEXT);
}


function ServeWebPage() {
  var template = HtmlService.createTemplateFromFile('index');
    // Build and return HTML in IFRAME sandbox mode.
    return template.evaluate()
      .setTitle('App page')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function ErrorText(e) {
  const json = JSON.stringify(e);
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.TEXT);
}
