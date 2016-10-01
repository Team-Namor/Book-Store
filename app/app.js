'use strict';

let express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    userController = require('./controllers/usersController'),
    bookController = require('./controllers/booksController'),
    categoryController = require('./controllers/categoryController');

let app = express();

app.use(express.static('./node_modules'));
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(cookieParser('shhhh, very secret'));
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

/* Routes */
app.get('/books', bookController.get);

app.post('/books', bookController.add);

app.get('/books/:id', bookController.getById);

app.put('/books/:id', bookController.put);

app.get('/categories', categoryController.get);

app.post('/categories', categoryController.add);

app.post('/register', function(req, res) {
    userController.add(req, res);
});

app.post('/login', function(req, res) {
    userController.login(req, res);
});

app.get('/admin', function(req, res){
    res.send('admin logged in');
});

app.get('/logout', function (req, res) {
    userController.logout(req, res);
});

var port = 3333;
app.listen(port, function () {
    console.log(`Server is running at http://localhost:${port}`);
});



