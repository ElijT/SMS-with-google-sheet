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

>  Access Token

TBU
