'use strict';
let express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    db = require('../config/db');

app.use(bodyParser.json());
app.use(express.static('./'));

module.exports.database = db;

var port = 3333;
app.listen(port, function () {
    console.log(`Server is running at http://localhost:${port}`);
});
