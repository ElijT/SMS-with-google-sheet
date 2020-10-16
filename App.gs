const SHEET_URL = "UPDATEHERE-Google Sheet URL";
const TOKEN_ID = "UPDATEHERE-Token value - Only alphanumeric character that can go in a URL";
const SHEET_NAME = "SMS";

function doGet(e) {
  if (e.parameter.token == TOKEN_ID) {
    
    // Send template or data or update information
    
    if (e.parameter.data == "load") {
          return LoadData();
      
    } else if (e.parameter.update == "true"){
          return UpdateStatus(e.parameter.row);
      
    } else if (e.parameter.display == "true"){
          return ServeWebPage();
      
    } else {
          return ErrorText("Erreur 405");
    }
  } else {
        return ErrorText("Erreur 401 -  Access denied");
  }
}
