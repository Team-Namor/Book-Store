let data = require('../../db/data.js');
let User = require('../../db/models/user');

let usersController = {
    get(req, res) {
        
    },
    
    add(req, res) {
        let userData = req.body;

        //todo validation
        let user = new User(
            userData['firstname'],
            userData['lastname'],
            userData['email'],
            userData['password']
        );

        data.addUser(user)
            .then(data => res.json(data))
            .catch(err => {
                res.status(500).send(err.message);
            });
    },

    login(req, res) {
        let reqUsername = req.body.username,
            reqPassword = req.body.password;

        let userPromise = data.checkUserExisting(reqUsername, reqPassword);

        userPromise.then(function(value) {
            let user = value;

            if(user) {
                req.session.user = user;
                req.session.success = 'Successfully authenticated';
                res.redirect('/#admin');
            }
            else{
                req.session.error = 'Authentication failed, please check your credentials';
                res.redirect('/#login1');
            }
        });
    }
};

module.exports = usersController;