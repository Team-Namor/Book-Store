import requester from '../utils/jqueryJSONRequester.js' ;
import template from 'template';

 class UserController {
    constructor(){
       
    }

    index() {
      
    }

    get(id) {

    }

    add(userData) {
        requester.post('/register', userData)
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    edit() {

    }

    delete() {

    }
}

export default UserController;
