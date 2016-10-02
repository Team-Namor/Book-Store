import Sammy from 'sammy';
import template from 'template';
import cookies from 'scripts/utils/cookies.js';
import popup from 'scripts/utils/pop-up.js';
import 'jquery';
import Tether from 'tether'
import 'bootstrap';

/* Controllers */
import UserController from 'scripts/controllers/userController.js';
import BookController from 'scripts/controllers/bookController.js';
import CategoryController from 'scripts/controllers/categoryController.js';

/* Create controller instance */
let UC = new UserController();
let BC = new BookController();
let CC = new CategoryController();

let app = new Sammy('#sammy-app');

/* books events */
app.bind('click', function (ev) {
    if (ev.target.id === 'search-btn') {
        let searchedQuery = $('#search-value').val();
        if (searchedQuery !== '') {
            app.setLocation(`#search/${searchedQuery}&${1}&false`);
        }
        else{
            app.setLocation(`#books/page/1`);
        }
    }
});

app.bind('click', function (ev) {
    if (ev.target.className === 'page-link') {
        let element = $(ev.target);

        $('.pagination').find('a').removeClass('active');
        element.addClass('active');

        var body = $("html, body");
            body.stop().animate({scrollTop:0}, '500', 'swing', function() {
        });
    }
});

app.bind('click', function (ev) {
    if (ev.target.id === 'add-to-cart-btn') {
        let element = $(ev.target);
            /*link = window.location.hash,
            slash = link.indexOf('/'),
            bookId = link.substring(slash + 1);*/

        let bookId = element.attr('book-target');

        BC.get(bookId).then(data => {
            let cartInfo = JSON.parse(sessionStorage.getItem('cart')) || [];
            cartInfo.push(data[0]);
            sessionStorage.setItem('cart', JSON.stringify(cartInfo));

            let currentAmount = +$('.total').html().substring(1),
                newAMount = (currentAmount + data[0]._price).toFixed(2);
            $('.total').html(`$${newAMount}`);

        });
    }
});

app.bind('click', function (ev) {
    if (ev.target.id === 'like-btn') {
        let element = $(ev.target),
            currentLikes = () => element.find('i').text(),
            link = window.location.hash,
            slash = link.indexOf('/'),
            bookId = link.substring(slash + 1);

        BC.edit().increaseLikes(bookId, +(currentLikes()) + 1)
            .then(success => {
                if (success === 1) {
                    return element.find('i').text(+(currentLikes()) + 1);
                }
                console.log('DB update fail');
            });
    }
});

app.before({ except: { path: ['#/', '#Login', '#Register'] } }, context => {
    if (!cookies.get('user')) {
        popup.alert('You must first login to view our catalogue.')
        context.redirect('#Login');
        return false;
    }

    $('#menu-user-login').hide();
    $('#menu-user-register').hide();
    $('#menu-user-logout').show();

    context.isLogedin = true;
    context.userType = cookies.get('user-type');
    let adminNavItem = $('#admin-nav-item');

    if (context.userType === 'admin') {
        adminNavItem.show();
    } else {
        adminNavItem.hide();
    }
});

app.get('#/', function (con) {
    SetActiveLink('/');
    BC.getRandom()
        .then((book) => {
            BC.attachToTemplate(book, 'home')
                .then(html => {
                    con.swap(html);
                });
        });
});

app.get('#books/page/?:page', con => {
    SetActiveLink('books/page/1');
    let page = +con.params.page;
    BC.index(page)
        .then(html => {
            con.swap(html);
        });
});

app.get('#books/:id', con => {
    let bookId = con.params.id;
    BC.get(bookId)
        .then((book) => {
            BC.attachToTemplate(book, 'single-book')
                .then(html => {
                    con.swap(html);
                });
        });
});

app.post('#books', context => {
    BC.add(context).then(data => {
        popup.info('book added');
        context.redirect('#admin');
    })
});

app.get('#search/?:query&:page&:isCategory', con => {
    let query = con.params.query,
        page = +con.params.page,
        isCateg = con.params.isCategory;

    BC.searchBy(query, page, isCateg).then((html) => {
        con.swap(html);
    });
});

app.get('#categories', con => {
    template.get('category').then(temp => {
        let html = temp({ name: 'Categories' })

        con.swap(html);
    });

    CC.index(con);
});

app.get('#categories/:category', con => {
    let categoryName = con.params.category;


    CC.searchBooksByCategory(con, categoryName);
});


/* Register user */
app.get('#Register', con => {
    template.get('register').then(temp => {
        let html = temp({ name: 'REGISTER' });

        app.swap(html);
    });
});

app.post('#Register', con => {
    UC.add(con);
});

/* Login user */
app.get('#Login', con => {
    template.get('login').then(temp => {
        let html = temp({ name: 'LOGIN' });

        app.swap(html);
    });
});

app.post('#Login', con => {
    UC.login(con);
});

app.get("#Logout", con => {
    UC.logout(con);
});

app.get('#Admin', con => {
    UC.login(con.params);
});

/* Admin */

app.get('#admin', UC.admin);
app.run('#/');

/* Events */
$(document).ready(function() {
    $('.carousel').carousel({
        interval: 4000
    });
});

/* Cart items update */
$('#cart-btn').on('mouseenter', function () {
    console.log('asdasd');
    BC.updateCartItems();
});

$('#cart-btn').on('mouseover', function () {
    $("#dropdown-cart").css('display', 'block');
});

$('#cart-btn').on('mouseout', function () {
    $("#dropdown-cart").css('display', 'none');
});

let nav = $('#main-nav');

nav.on('click', 'a', ev => {
    let element = $(ev.target);

    nav.find('a').removeClass('active');
    element.addClass('active');
});


function SetActiveLink(name){
    let nav = $('#main-nav');
    nav.find('a').removeClass('active');

    nav.find('a[href="#'+name+'"]').addClass('active');
}

