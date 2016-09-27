'use strict';

let express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    userController = require('./controllers/usersController'),
    bookController = require('./controllers/booksController'),
    categoryController = require('./controllers/categoryController');

let app = express();

app.use(bodyParser.json());
app.use(cookieParser('shhhh, very secret'));
app.use(session());
app.use(express.static('./node_modules'));
app.use(express.static('./public'));

app.get('/books', bookController.get);

app.post('/books', bookController.post);

app.get('/categories', categoryController.get);

app.post('/categories', categoryController.post);

app.post('/register', function(req, res) {
    userController.add(req, res);
});

app.post('/login', function(req, res) {
    userController.login(req, res);
});

var port = 3333;
app.listen(port, function () {
    console.log(`Server is running at http://localhost:${port}`);
});



