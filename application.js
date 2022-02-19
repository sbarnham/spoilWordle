const express = require('express');
const app = express();
const words = require('./words.json')

app.use(express.static('client'));
app.use(express.json());

module.exports = app

app.get('/words', function(req,resp) {
    resp.json(words)
})