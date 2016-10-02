import requester from '../data/requester.js';
import popUp from '../utils/pop-up.js'
import template from 'template';
import 'jquery';

 class UserController {

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
        this.clearCart();

        requester.get('/logout', context)
            .then(() => { this.showGuestMenu(); })
            .then(() => {
                setTimeout(function(){
                    context.redirect('#/')
                }, 1000)
            })
    }

    admin(context){
        template.get('admin-dashboard')
        .then(template => {
            let html = template();
            context.swap(html)
        })
    }

     showUserMenu() {
         $('#menu-user-login').hide();
         $('#menu-user-register').hide();
         $('#menu-user-logout').show();
     }

     showGuestMenu() {
         $('#menu-user-login').show();
         $('#menu-user-register').show();
         $('#menu-user-logout').hide();
         $('#admin-nav-item').hide();
     }

     clearCart() {
         $('.total').html(`$0.00`);
         $("#dropdown-cart").html('');
         sessionStorage.clear();
     }
}

export default UserController;
