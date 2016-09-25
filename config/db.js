var Datastore = require('nedb');

var db = {};

db.users = new Datastore({ filename: 'config/models/users.db', autoload: true });
db.categories = new Datastore({ filename: 'config/models/categories.db', autoload: true });
db.books= new Datastore({ filename: 'config/models/books.db', autoload: true });
db.orders = new Datastore({ filename: 'config/models/orders.db', autoload: true });

module.exports = db;
