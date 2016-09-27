let data = require('../../db/data.js');
let User = require('../../db/models/user');

let usersController = {
    get(req, res) {
        
    },
    
    add(req, res) {
        let userData = req.body,
            userType = 'user',
            firstName = userData['firstname'],
            lastName = userData['lastname'],
            email = userData['email'],
            password = userData['password'];

        let user = new User(userType, firstName, lastName, email, password);

        data.addUser(user)
            .then(data => res.json(data))
            .catch(err => {
                res.send(err);
            });
    },

    login(req, res) {
        let reqUsername = req.body.username,
            reqPassword = req.body.password;

        let userPromise = data.checkUserExisting(reqUsername, reqPassword);

        userPromise.then(function(value) {
            let user = value;

            if(user) {
                res.cookie('cookieName', user._id, { maxAge: 900000, httpOnly: true });
                res.send();
            }
            else{
                res.send();
            }
        });
    }
};

module.exports = usersController;