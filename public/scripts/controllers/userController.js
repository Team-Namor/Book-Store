import requester from '../utils/jqueryJSONRequester.js' ;
import template from 'template';
import popUp from '../utils/pop-up.js'

 class UserController {
    constructor(){

    }

    add(userContext) {
        requester.post('/register', userContext.params)
            .then(success => popUp.info('Successfully registered!'))
            .then(
                setTimeout(function(){
                    userContext.redirect('#books/page/1')
                }, 1000)
            )
            .catch(err => popUp.alert(err.responseText))
    }

    login(userContext) {
       requester.post('/login', userContext.params)
           .then(success => popUp.info('Successfully logged in!'))
           .then(
               setTimeout(function(){
                   userContext.redirect('#books/page/1')
               }, 1000)
           )
           .catch(err => popUp.alert(err.responseText))
    }

    edit() {

    }

    delete() {

    }
}

export default UserController;
