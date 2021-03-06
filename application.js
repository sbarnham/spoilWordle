require('dotenv').config()
const express = require('express');
const app = express();
const words = require('./words.json')
const allFiveLetterWords = require('./allFiveLetterWords.json')

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

const twilio = require('twilio')(accountSid, authToken);

app.use(express.static('client'));
app.use(express.json());

module.exports = app

app.get('/words', function (req, resp) {
    resp.json(words)
})

app.post('/spoil', function (req, resp) {
    const todaysWord = getWord();
    const numbers = req.body.numberlist;
    let preCallMessage = Math.floor(Math.random() * 4 + 1);
    for (let number of numbers) {
        twilio.messages
            .create({ body: `Hope this ruins your day: Today's Wordle is ${todaysWord.toUpperCase()}. Jog on.`, from: `${phoneNumber}`, to: `${number}` })
    }
    for (let number of numbers) {
        twilio.calls
      .create({
         twiml: `<Response>
         <Play>https://altaudio-9871.twil.io/${preCallMessage}.mp3</Play>
         <Say language="en-AU">${todaysWord}!</Say>
         <Play>http://demo.twilio.com/docs/classic.mp3</Play>
         </Response>`,
         to: `${number}`,
         from: `${phoneNumber}`
       })
      .then(call => console.log(call.sid));
    }
})  

app.get('/currentWord', function(req, resp) {
    const currentWord = req.query.word
    if (allFiveLetterWords.includes(currentWord)) {
        resp.json('Yes')
    } else {
        resp.json('No')
    }
})

app.post('/hint', function(req, resp) {
    const letterList = req.body.letterlist
    let word = getWord()
    allFiveLetterWordsCopy = JSON.parse(JSON.stringify(allFiveLetterWords))
    for (let letter of letterList) {
        allFiveLetterWordsCopy = allFiveLetterWordsCopy.filter(word => !(word.includes(letter)))
        word = word.replace(letter, '')
    }
    let hintWord = allFiveLetterWordsCopy[allFiveLetterWordsCopy.findIndex(hintWord => hintWord.includes(word[0]))]
    if (hintWord == null) {
        resp.json("No hint found!")
    } else {
        resp.json(allFiveLetterWordsCopy[allFiveLetterWordsCopy.findIndex(hintWord => hintWord.includes(word[0]))])
    }
})

function getWord() {
    var startDate = new Date("02/19/2022");
    var today = new Date();

    var timeDifference = today.getTime() - startDate.getTime();
    var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return words[daysDifference];
};
