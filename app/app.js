'use strict';
let db = require('../db/db');

let express = require('express'),
    bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(express.static('./'));




var port = 3333;
app.listen(port, function () {
    console.log(`Server is running at http://localhost:${port}`);
});

