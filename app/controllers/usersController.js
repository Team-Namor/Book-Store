let data = require('../../db/data.js');
let User = require('../../db/models/user');
let validator = require('validate-obj');

let usersController = {
    get(req, res) {
        
    },
    
    add(req, res) {
        let userData = req.body;

        let validationExpression = {
            firstname: [validator.required, validator.isString],
            lastname: [validator.required, validator.isString],
            email: [validator.required, validator.isEmail],
            password: [validator.isString, validator.required],
            confirm: [validator.isString, validator.required],
            selfCrossValidators : [function(obj) {
                if (obj.password !== obj.confirm){
                    return 'passwords do not match';
                }

                return undefined;
            }]
        };

        let validationErrors = validator.hasErrors(userData, validationExpression, 'user');

        if(!validationErrors) {
            try{
                let userType = 'user',
                    firstName = userData['firstname'],
                    lastName = userData['lastname'],
                    email = userData['email'],
                    password = userData['password'];

                let user = new User(userType, firstName, lastName, email, password);

                data.addUser(user)
                    .then(data => res.json(data))
                    .catch(err => { res.send(err); });

            } catch (err) {
                res.status(400).send(err.message)
            }
        } else{
            res.status(400).send({errors: validationErrors})
        }

    },

    login(req, res) {
        let reqUsername = req.body.username,
            reqPassword = req.body.password;

        let userPromise = data.checkUserExisting(reqUsername, reqPassword);

        userPromise.then(function(value) {
            let user = value;

            if(user) {
                res.cookie('user', user._id);
                res.send();
            }
            else{
                res.status(400).send({ error: 'Login failed!' });
            }
        });
    }
};

module.exports = usersController;