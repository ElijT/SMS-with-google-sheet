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
//  Logger.log(JSON.stringify(LoadData())  );
  
  var html = template.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return html.setTitle('App2 page').addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function ErrorText(e) {
  const json = JSON.stringify(e);
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.TEXT);
}

function BuildTable() {
  // This function will populate the table in the index.html directly in Apps Script.
  // Usually I would do that by JavaScript in the browser but here I tried to avoid to have any JS in the index.html
  var sheet = SpreadsheetApp.openByUrl(SHEET_URL).getSheetByName(SHEET_NAME);
  var Range = sheet.getDataRange().getDisplayValues();
  var lastRow = sheet.getLastRow();
 
  var HTMoutput = '';
  //
  for (var i=0; i < 6; i++) {
     HTMoutput = HTMoutput + '<th>' + Range[0][i] + '</th>'
     
  }
  HTMoutput = HTMoutput + '</tr></thead><tbody id="tablebody">';
  
  //Create rows
  for (var k=1; k < lastRow; k++) {
    HTMoutput = HTMoutput + '<tr>'; 
    for (var j=0; j < 6; j++) {
        HTMoutput = HTMoutput + '<td>' + Range[k][j] + '</td>'
     
  }
    HTMoutput = HTMoutput + '</tr>'; 
  }
       
    return HTMoutput;
}
