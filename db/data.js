var Datastore = require('nedb');

var db = {};

db.users = new Datastore({ filename: 'db/models/users.db', autoload: true });
db.categories = new Datastore({ filename: 'db/models/categories.db', autoload: true });
db.books= new Datastore({ filename: 'db/models/books.db', autoload: true });
db.orders = new Datastore({ filename: 'db/models/orders.db', autoload: true });


let data = {
    getBooks(){
        return new Promise((resolve, reject) => {
            db.books.find({},(err, books) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(books);
                }
            })
        });
    }
}
module.exports = data;
