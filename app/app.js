'use strict';

let express = require('express'),
    bodyParser = require('body-parser'),
    userController = require('./controllers/usersController'),
    bookController = require('./controllers/booksController'),
    categoryController = require('./controllers/categoryController');

let app = express();

app.use(bodyParser.json());
app.use(express.static('./node_modules'));
app.use(express.static('./public'));

app.get('/books', bookController.get);

app.post('/books', bookController.post);

app.get('/categories', categoryController.get);

app.post('/categories', categoryController.post);

app.post('/register', function(req, res) {
    let user = req.body;
    
    userController.add(req, res);
});

var port = 3333;
app.listen(port, function () {
    console.log(`Server is running at http://localhost:${port}`);
});



