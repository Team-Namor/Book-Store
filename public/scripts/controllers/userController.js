import requester from '../utils/jqueryJSONRequester.js' ;
import template from 'template';
import popUp from '../utils/pop-up.js'

 class UserController {
    constructor(){

    }

    add(userData) {
        requester.post('/register', userData)
            .then(data => console.log(data))
            .catch(err => popUp.alert(err.responseText))
    }

    login(userData) {
       requester.post('/login', userData)
           .then(data => {console.log('then')})
           .catch(err => {
               popUp.alert(err.responseText)})

    }

    edit() {

    }

    delete() {

    }
}

export default UserController;
