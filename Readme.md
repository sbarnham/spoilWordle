# **Spoil Wordle** &copy;

Spoil Wordle is a game of Wordle which ruins the fun for everyone else. After you have your fun and complete the Wordle the phone numbers which you have added to the right of the webpage will be called with 1 of 4 automated messages containing the Wordle of the day. A SMS will then be sent as a follow up to make sure they got the message and their day is ruined.

All call activity and messages sent to the Twilio number are visible from the Twilio website.

## **How to Start**
In order to access the website, a .env file is required.The format of the .env file should be:

***

_TWILIO_ACCOUNT_SID="Your Twilio Account SID"_

_TWILIO_AUTH_TOKEN="Your Twilio Authentication Token"_

_TWILIO_PHONE_NUMBER="Your Twilio number"_

***

After you create a Twilio account on the main page by scrolling down you will find your AUTH_TOKEN.

You can buy a phone number to use by clicking the drop down "Phone Numbers" then "Manage" then "Buy a number". The number will need to be a +44 cellphone number with call and SMS capabilities. (Icons are displayed to the right of the number to dipict the actions the number is capable of)

To find your ACCOUNT_SID click on the Twilio logo icon in the top left corner. It will take to to a page containing you ACCOUNT_SID.

## **Server Connection**

To get the server up and runing, begin by "npm install" and then run "node server.js". This will allow you access to server page "http://127.0.0.1:8080/"

Bring people together and have a blast :)

