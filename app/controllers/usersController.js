let data = require('../../db/data.js');
let User = require('../../db/models/user');

let usersController = {
    get(req, res) {
        
    },
    
    add(req, res) {
        data.addUser(req.body)
            .then(data => res.json(data))
            .catch(err => {
                res.status(500).send(err.message);
            });
    }

};

module.exports = usersController;