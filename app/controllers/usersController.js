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
        
    }
};

module.exports = usersController;