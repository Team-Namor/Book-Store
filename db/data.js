var Datastore = require('nedb');

var db = {};

db.users = new Datastore({ filename: 'db/datastores/users.db', autoload: true });
db.categories = new Datastore({ filename: 'db/datastores/categories.db', autoload: true });
db.books = new Datastore({ filename: 'db/datastores/books.db', autoload: true });
db.orders = new Datastore({ filename: 'db/datastores/orders.db', autoload: true });

let data = {
    getBooks() {
        return new Promise((resolve, reject) => {
            db.books.find({}, (err, books) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(books);
                }
            });
        });
    },
      getBookById(req) {
        return new Promise((resolve, reject) => {
            db.books.find({_id: req.params.id }, (err, book) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(book);
                }
            });
        });
    },
    addBook(book) {
        return new Promise((resolve, reject) => {
            db.books.insert(book, function (err, newBook) {
                if (err) {
                    reject(err);
                } else {
                    resolve(book);
                }
            });
        });

    },
    getCategories() {
        return new Promise((resolve, reject) => {
            db.categories.find({}, (err, categories) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(categories);
                }
            });
        });
    },
    postCategory(category) {
        return new Promise((resolve, reject) => {
            db.categories.insert(category, function (err, newCategory) {
                if (err) {
                    reject(err);
                } else {
                    resolve(category);
                }
            });
        });
    },

    addUser(user) {
        return new Promise ((resolve, reject) => {
            db.users.insert(user, function(err, newUser) {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    },

    getUserById(userId) {
        return new Promise ((resolve, reject) => {
            db.users.find({_id: userId}, (err, books) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(books);
                }
            });
        });
    },

    checkUserExisting(username, password) {
        return new Promise ((resolve, reject) => {
            db.users.findOne({_email: username, _password: password}, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    }
};
module.exports = data;
