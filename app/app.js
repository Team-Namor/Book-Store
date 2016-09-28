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

// Authentication and Authorization Middleware
function authenticate(req, res, next) {
    /*if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/#login');
    }*/
}

app.get('/books', bookController.get);

app.post('/books', bookController.add);

app.get('/categories', categoryController.get);

app.post('/categories', categoryController.add);

app.post('/register', function(req, res) {
    userController.add(req, res);
});

app.post('/login', function(req, res) {
    userController.login(req, res);
});

app.get('/admin', authenticate, function(req, res){
    res.send('admin logged in');
});

app.get('/logout', function (req, res) {
    req.session.destroy(function(){
        res.redirect('/');
    });
});

var port = 3333;
app.listen(port, function () {
    console.log(`Server is running at http://localhost:${port}`);
});



