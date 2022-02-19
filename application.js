require('dotenv').config()
const express = require('express');
const app = express();
const words = require('./words.json')
const twilio = require('twilio')(accountSid, authToken);

app.use(express.static('client'));
app.use(express.json());

module.exports = app

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

app.get('/words', function (req, resp) {
    resp.json(words)
})

app.post('/spoil', function (req, resp) {
    const todaysWord = getWord();
    const numbers = req.body
    for (let number of numbers) {
        twilio.messages
            .create({ body: `${todaysWord}`, from: `${phoneNumber}`, to: `${number}` })
    }
    for (let number of numbers) {
        client.calls
      .create({
         url: <Response>
         <Say voice="alice">Do you have any time to talk about Jesus? No? Today's Wordle is ${todaysWord}!</Say>
         <Play>http://demo.twilio.com/docs/classic.mp3</Play>
         </Response>,
         to: '+14155551212',
         from: '+15017122661'
       })
      .then(call => console.log(call.sid));  
    }
})

function getWord() {
    var startDate = Date('19/02/2022');

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    var timeDifference = date2.getTime() - date1.getTime();
    var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return words[daysDifference];
};
