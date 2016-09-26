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

/* Backend Router */
app.post('/register', function (req, res) {
    var newUser = {
        firstname: userData['firstname'],
        lastname: userData['lastname'],
        email: userData['email'],
        password: userData['password']
    };
    
    db.users.insert(newUser, function (err, newUser) {});

    res.send('POST request to the homepage');
});
