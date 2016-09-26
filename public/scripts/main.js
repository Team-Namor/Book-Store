import 'jquery'
import Sammy from 'sammy';
import template from 'template'

/* Controllers */
import UserController from 'UserController';

/* Create controller instance */
let UC = new UserController();


let nav = $('ul.nav');

nav.on('click','a',ev => {
    let element = $(ev.target);

    nav.find('a').removeClass('active');
    element.addClass('active');
});

let app = new Sammy('#sammy-app');

app.get('#/', function (con) {
        template.get('link').then(temp => {
        let html = temp({ name: 'MAIN' })

        con.$element().html(html);
    });
});

app.get('#books', con => {
    template.get('link').then(temp => {
        let html = temp({ name: 'BOOKS' })

        con.$element().html(html);
    });
});

app.get('#categories', con => {
    template.get('link').then(temp => {
        let html = temp({ name: 'CATEGORIES' })

        con.$element().html(html);
    });
});

app.get('#link3', con => {
    template.get('link').then(temp => {
        let html = temp({ name: 'LINK3' })

        con.$element().html(html);
    });
});

/* Login and registration routes */
app.get('#Register', con => {
    template.get('register').then(temp => {
        let html = temp({ name: 'REGISTER' })

        con.$element().html(html);
    });
});

app.post('#Register', con => {
    UC.add(con.params);
});

app.run('#/')