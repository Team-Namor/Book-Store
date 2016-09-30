var Datastore = require('nedb');
var getNewCategory = require('./models/category.js');
var Book = require('./models/book.js');

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
            db.books.find({ _id: req.params.id }, (err, book) => {
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
    updateBook(update, bookToBeUpdated) {
        return new Promise((resolve, reject) => {
            db.books.update({ "_id": bookToBeUpdated }, { $set: update }, { returnUpdatedDocs: true }, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
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
        return new Promise((resolve, reject) => {
            db.users.insert(user, function (err, newUser) {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    },

    getUserById(userId) {
        return new Promise((resolve, reject) => {
            db.users.find({ _id: userId }, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    },

    getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            db.users.find({ _email: username }, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    },

    checkUserExisting(username, password) {
        return new Promise((resolve, reject) => {
            db.users.findOne({ _email: username, _password: password }, (err, user) => {
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

let lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

let book2 = new Book("1984", "George Orwell", 1924, "Science Fiction", lorem, "http://6.darkroom.shortlist.com/980/b75d3b311009738de30d065d6d530928:402fef9b2f2bf80737098bfd988c23f2/1984", 123);
let book4 = new Book("Just another book", "Jack", 1999, "Thriller", lorem, "https://s-media-cache-ak0.pinimg.com/236x/d2/0b/29/d20b291bd20bf99262d4dbdc41ded105.jpg", 4312);
let book6 = new Book("Ripe", "Julia Moulden", 2012, "Comedy", lorem, "https://upload.wikimedia.org/wikipedia/en/b/b3/Book_Cover_V2.jpeg", 41);

data.addBook(book2);
data.addBook(book4);
data.addBook(book6);

module.exports = data;
