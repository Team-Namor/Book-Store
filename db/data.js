var Datastore = require('nedb');
var getNewCategory=require('./models/category.js');

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
    postBook(book) {
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

let categorySciFi = getNewCategory('Science Fiction');
let categoryHorror = getNewCategory('Horror');
let categoryDrama = getNewCategory('Drama');
let categoryRomance = getNewCategory('Romance');
let categoryThriller = getNewCategory('Thriller');
let categoryComedy = getNewCategory('Comedy')

data.postCategory(categorySciFi);
data.postCategory(categoryHorror);
data.postCategory(categoryDrama);
data.postCategory(categoryRomance);
data.postCategory(categoryThriller);
data.postCategory(categoryComedy)

module.exports = data;
