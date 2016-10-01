let userController = require('../controllers/usersController'),
    bookController = require('../controllers/booksController'),
    categoryController = require('../controllers/categoryController');

module.exports = function (app) {
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
};