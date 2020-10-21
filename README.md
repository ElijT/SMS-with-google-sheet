# SMS with Google Sheet
Send SMS from your android phone via AppInventor and Google apps script from your Google Sheet using the power of Google Apps Script.
##Credits
Let me start where most of the credit for this project is due @AmitAgarwal, editor of [labnol blog](https://www.labnol.org/).

The current application is largely based on the tutorial he made on [# How to Send SMS Messages with Google Sheets and your Android Phone](https://www.labnol.org/send-sms-google-sheets-200402) (largely like 100% of the idea and 80% of the code).
I highly recommend you watch his tutorial and video as he is better than I to explain the logic of the app. 

## Change from Amit's work

So you might ask what is the point of posting it here,**here are some answers**.

>  Main reason: Changing the POST method used to update the Gg Sheet

I did manage to reproduce the application up to the use of doPost method to update the Google Sheet. The fact that Stackdriver logs don't register logs for anonymous access did not help. As I had no previous experience I play around with the doPost method, failed and subsequently moved to a doGet method.
As the POST function is only used to send the 'rowId', you can use a parameter such as ?rowId=X to send the rowId number.

- Access Token
I don't know if that if a reasonnable concern but having a script that can be accessed from anyone seems somewhat concerning so I added a single hardcoded token security as I would be the single user of it.

- Page display.
I wanted also to have some control over the display of the data, so I am serving a webpage on top of the Gg sheet data. It is completely optionnal, but it does look nicer ;-)

## Communication between Android App and Apps Script
All data between the Android App and Google Apps Script (GAS) is done by GET request by the Android App to the GAS server.
The url of the apps script is usually structured like this (w/ custom domain variation)  :
```sh
https://script.google.com/macros/s/'XXXX-ScriptID'/exec
```
The GAS server can handle parameters [(see reference)](https://developers.google.com/apps-script/guides/web) indicated after the url in the form of : '.../XXXX-ScriptID'/exec?key1=value1&key2=value2'. I have defined four different keys:
```sh
token : Unique value hard coded in GAS and android app. 25+ Alphanumeric characters seems fit.
database: Request the Gg sheet data.
interface: request the HTML page
updater: Update Gg to indicate SMS_sent value
```

## HTML interface
The Web interface from the AppInventor is somewhat limited so I am serving a fully structured HTML/CSS file, limited javascript on the page and no AJAX, button in the html (no need for it either).


## Project structure

### GAS server
3 files:
- App.gs : Entry point for the GET request. Handle all parameter passed by the url address
- Handler.gs : Function called by the App.gs depending on the parameter entered.
- Index.html : Page served by the interface. BAsed on Bootstrap 4.5 for formatting.
- 
The project must be published and cannot be accessed by the Android App easily by '.../XXXX-ScriptID'/dev' which requires auth. The dev url might still be useful to debug with your browser! 

## AppInventor project
The project is published into AppInventor Gallery here : [(Send SMS Gallery App)](ai2.appinventor.mit.edu/?galleryId=5506738923372544)
There one screen and beyond the web interface, very similar to original Amit's work. Please see his tutorial for reference.

You will need to update two global values ONLY to get to work: The script url from your Apps Script and your token.
```sh
GAS_URL: https://script.google.com/macros/s/'XXXX-ScriptID'/exec
GG_TOKEN : Unique value hard coded in GAS and android app. 25+ Alphanumeric characters seems fit.
```

