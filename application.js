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

app.get('/words', function(req,resp) {
    resp.json(words)
})

app.post('/spoil', function(req, resp) {
    const numbers = req.body
    for (let number of numbers) {
        twilio.messages
            .create({body: `${todaysWord}`, from: '+447488884357', to: `${number}`})
    }
})