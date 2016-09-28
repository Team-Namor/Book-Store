import 'jquery';
import Sammy from 'sammy';
import template from 'template';

/* Controllers */
import UserController from 'scripts/controllers/userController.js';
import BookController from 'scripts/controllers/bookController.js';
import CategoryController from 'scripts/controllers/categoryController.js';

/* Create controller instance */
let UC = new UserController();
let BC = new BookController();
let CC = new CategoryController();

let nav = $('ul.nav');

nav.on('click', 'a', ev => {
    let element = $(ev.target);

    nav.find('a').removeClass('active');
    element.addClass('active');
});

let app = new Sammy('#sammy-app');

app.get('#/', function (con) {
    template.get('link').then(temp => {
        let html = temp({ name: 'MAIN' });

        con.$element().html(html);
    });
});

app.get('#books', con => {
    let element = con.$element();
    BC.index()
        .then(html => {
            element.html(html);
        });

    $('#main-wrapper').on('click', $('#search-btn'), function () {
        let searchedQuery = $('#search-value').val();
        if (searchedQuery !== '') {
            con.redirect(`#search/${searchedQuery}`);
        }

    });
});

app.get('#search/?:query', con => {
    let slashIndex = app.last_location[1].lastIndexOf('/');
    let query = app.last_location[1].substring(slashIndex + 1);

    BC.searchBy(query).then((html) => {
        con.$element().html(html);
    });
});

app.get('#categories', con => {
    let element = con.$element();
    CC.index(element);
});

app.get('#link3', con => {
    template.get('link').then(temp => {
        let html = temp({ name: 'LINK3' })

        con.$element().html(html);
    });
});

/* Register user */
app.get('#Register', con => {
    template.get('register').then(temp => {
        let html = temp({ name: 'REGISTER' })

        con.$element().html(html);
    });
});

app.post('#Register', con => {
    UC.add(con.params);
});

/* Login user */
app.get('#Login', con => {
    template.get('login').then(temp => {
        let html = temp({ name: 'LOGIN' })

        con.$element().html(html);
    });
});

app.post('#Login', con => {
    UC.login(con.params);
});


app.get('#Admin', con => {
    UC.login(con.params);
});

app.run('#/')