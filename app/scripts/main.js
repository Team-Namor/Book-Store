
import 'jquery'
//import 'bootstrap-utils';
//import 'bootstrap-tabs';
import Sammy from 'sammy';
import template from 'template'

let nav = $('ul.nav');

nav.on('click','a',ev => {
    let element = $(ev.target);

    nav.find('a').removeClass('active');
    element.addClass('active');
})

let app = new Sammy('#sammy-app');

app.get('#/', function (context) {
    context.$element().html('MAIN')
})

app.get('#link1', con => {
    template.get('link').then(temp => {
        let html = temp({ name: 'LINK1' })

        con.$element().html(html);
    });
});

app.get('#link2', con => {
    template.get('link').then(temp => {
        let html = temp({ name: 'LINK2' })

        con.$element().html(html);
    });
});

app.get('#link3', con => {
    template.get('link').then(temp => {
        let html = temp({ name: 'LINK3' })

        con.$element().html(html);
    });
});

app.run('#/')