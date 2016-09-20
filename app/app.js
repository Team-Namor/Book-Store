'use strict';
let db = require('../db/db');

let express = require('express'),
    bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(express.static('./'));

app.get('/items', function (req, res) {
    let items = db.getItems();
    res.json(items);
});


app.post('/items', function (req, res) {
    var item = req.body;
    console.log(req.body);
    db.addToStorage(item).then((item) => {
        res.json(item);
    }, function (err) {
        res.status(400).json(err);
    });
});



var port = 3333;
app.listen(port, function () {
    console.log(`Server is running at http://localhost:${port}`);
});

