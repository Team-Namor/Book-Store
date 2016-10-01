'use strict';

let express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

let app = express();

/* Configure */
app.use(express.static('./node_modules'));
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(cookieParser('shhhh, very secret'));
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

/* Routing */
require('./router/router')(app);

/* Run */
app.listen(3333, function () {
    console.log(`Server is running at http://localhost:3333`);
});



