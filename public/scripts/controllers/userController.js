import requester from '../utils/jqueryJSONRequester.js' ;
import template from 'template';
import popUp from '../utils/pop-up.js'

 class UserController {
    constructor(){

    }

    add(userData) {
        requester.post('/register', userData)
            .then(data => popUp.info(`${userData.firstname} ${userData.lastname} registerd`))
            .catch(err => popUp.alert(err.responseText))
    }

    login(userData) {
       requester.post('/login', userData)
           .then(data => popUp.info(`${userData.username} logedin`))
           .catch(err => popUp.alert(err.responseText))

    }

    edit() {

    }

    delete() {

    }
}

export default UserController;
