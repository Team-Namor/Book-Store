import 'jquery';
import Sammy from 'sammy';
import template from 'template';
import cookies from 'scripts/utils/cookies.js';
import popup from 'scripts/utils/pop-up.js';

/* Controllers */
import UserController from 'scripts/controllers/userController.js';
import BookController from 'scripts/controllers/bookController.js';
import CategoryController from 'scripts/controllers/categoryController.js';

/* Create controller instance */
let UC = new UserController();
let BC = new BookController();
let CC = new CategoryController();
let dynamicContainer = $('#dynamic-container');

let nav = $('ul.nav');

nav.on('click', 'a', ev => {
    let element = $(ev.target);

    nav.find('a').removeClass('active');
    element.addClass('active');
});

/* books events */
dynamicContainer.on('click', '#search-btn', function () {
    let searchedQuery = $('#search-value').val();
    if (searchedQuery !== '') {
        window.location.href = (`#search/${searchedQuery}&${1}`);
    }
});

dynamicContainer.on('click', '.book-cover', function (ev) {
    let element = $(ev.target);
    let parent = element.parent();
    let bookId = $(parent).attr('id');
    window.location.href = (`#books/${bookId}`);
});

dynamicContainer.on('click', '#like-btn', function (ev) {
    let element = $(event.target),
        currentLikes = ()=>element.find('i').text(),
        link = window.location.hash,
        slash = link.indexOf('/'),
        bookId = link.substring(slash + 1);

    BC.edit().increaseLikes(bookId, +(currentLikes())+1)
      .then(success => {
        if(success===1){
          return element.find('i').text(+(currentLikes())+1);
        }
        console.log('DB update fail');
      });
});

let app = new Sammy('#sammy-app');

app.before({except: {path: ['#/', '#Login', '#Register']}}, callback => {
    if(!cookies.get('user')){
        popup.alert('user not loged in !!!')
        callback.redirect('#Login');
        return false;
    } 

    callback.isLogedin = true;
})

app.get('#/', function (con) {
    template.get('home').then(temp => {
        let html = temp({ name: 'MAIN' });
        dynamicContainer.html(html);
    });
});

app.get('#books/page/?:page', con => {
    let page = +con.params.page;
    BC.index(page)
        .then(html => {
            dynamicContainer.html(html);
        });
});

app.get('#books/:id', con => {
    let bookId = con.params.id;
    BC.get(bookId)
        .then((html) => {
            dynamicContainer.html(html);
        });
});

app.get('#search/?:query&:page', con => {
    let query = con.params.query;
    let page = +con.params.page;
    BC.searchBy(query, page).then((html) => {
        dynamicContainer.html(html);
    });
});

app.get('#categories', con => {
    template.get('category').then(temp => {
        let html = temp({ name: 'Categories' })

        dynamicContainer.html(html);
    });

    CC.index(dynamicContainer);
});

app.get('#link3', con => {
    template.get('link').then(temp => {
        let html = temp({ name: 'LINK3' });

        dynamicContainer.html(html);
    });
});

/* Register user */
app.get('#Register', con => {
    template.get('register').then(temp => {
        let html = temp({ name: 'REGISTER' });

        dynamicContainer.html(html);
    });
});

app.post('#Register', con => {
    UC.add(con.params);
});

/* Login user */
app.get('#Login', con => {
    template.get('login').then(temp => {
        let html = temp({ name: 'LOGIN' });

        dynamicContainer.html(html);
    });
});

app.post('#Login', con => {
    UC.login(con.params)
        .then(err => {
        console.dir(err);
    });
});


app.get('#Admin', con => {
    UC.login(con.params);
});

app.run('#/');
