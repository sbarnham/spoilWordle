const express = require('express');
const app = express();

app.use(express.static('client'));
app.use(express.json());

module.exports = app