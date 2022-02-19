require("dotenv").config();

const twilio = require('twilio')();

twilio.messages.create({
    to: `${number}`,
    from: '447488884357',
    twiml: ''
})

