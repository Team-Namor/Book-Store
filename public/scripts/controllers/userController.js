import requester from '../utils/jqueryJSONRequester.js' ;
import popUp from '../utils/pop-up.js'
import 'jquery';

 class UserController {
    constructor(){

    }

    add(userContext) {
        requester.post('/register', userContext.params)
            .then(success => popUp.info('Successfully registered!'))
            .then(() => {
                setTimeout(function () {
                    userContext.redirect('#books/page/1')
                }, 1000)
            })
            .catch(err => popUp.alert(err.responseText))
    }

    login(userContext) {
       requester.post('/login', userContext.params)
           .then(success => popUp.info('Successfully logged in!'))
           .then(() => { this.showUserMenu(); })
           .then(() => {
               setTimeout(function(){
                   userContext.redirect('#books/page/1')
               }, 1000)
           })
           .catch(err => popUp.alert(err.responseText))
    }

    logout(context) {
        requester.get('/logout', context)
            .then(() => {
                setTimeout(function(){
                    context.redirect('#/')
                }, 1000)
            })
    }

     showUserMenu() {
         $('#menu-user-login').hide();
         $('#menu-user-register').hide();
         $('#menu-user-logout').show();
     }
}

export default UserController;
