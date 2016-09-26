var Datastore = require('nedb');

var db = {};

db.users = new Datastore({ filename: 'db/datastores/users.db', autoload: true });
db.categories = new Datastore({ filename: 'db/datastores/categories.db', autoload: true });
db.books= new Datastore({ filename: 'db/datastores/books.db', autoload: true });
db.orders = new Datastore({ filename: 'db/datastores/orders.db', autoload: true });


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
