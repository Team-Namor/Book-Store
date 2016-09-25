let db = require('./database');

class UserController {
    index() {
       /* let users = {};

        db.users.find({}, function (err, usersData) {
            users = usersData;
        });*/

        //show view
    }

    get(id) {
       /* let user = {}

        db.users.find({ id: id }, function (err, userFound) {
            user = userFound;
        });*/

        //show view
    }

    add(userData) {
        console.dir(userData);

        //todo validation

        var newUser = {
            firstname: userData['firstname'],
            lastname: userData['lastname'],
            email: userData['email'],
            password: userData['password']
        };


        // db.users.insert(newUser, function (err, newUser) {});
    }

    edit() {

    }

    delete() {

    }
}

module.exports = UserController;