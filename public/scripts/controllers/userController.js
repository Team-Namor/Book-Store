import requester from '../utils/jqueryJSONRequester.js' ;
import template from 'template';

 class UserController {
    constructor(){

    }

    add(userData) {
        requester.post('/register', userData)
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    login(userData) {
       requester.post('/login', userData)
           .then(data => console.log(data))
           .catch(err => console.log(err.message))
    }

    edit() {

    }

    delete() {

    }
}

export default UserController;
