var Datastore = require('nedb');

var db = {};

db.users = new Datastore({ filename: 'db/models/users.db', autoload: true });
db.categories = new Datastore({ filename: 'db/models/categories.db', autoload: true });
db.books= new Datastore({ filename: 'db/models/books.db', autoload: true });
db.orders = new Datastore({ filename: 'db/models/orders.db', autoload: true });

module.exports = db;
