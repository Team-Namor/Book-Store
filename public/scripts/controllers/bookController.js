import requester from '../utils/jqueryJSONRequester.js';
import template from 'template';
import 'jquery';

class BookController {
    constructor() { }
    index() {
        return getData('/books');
    }

    get(id) {
        return getData('/books/' + id);
    }

    searchBy(param) {
        let book;
        return new Promise((resolve, reject) => {
            requester.get('/books')
                .then((data) => {
                    let paramToLower = param.toLowerCase();
                    book = data.filter(b => b.title.toLowerCase().indexOf(paramToLower) > -1 ||
                        b.author.toLowerCase().indexOf(paramToLower) > -1);
                    return template.get('book');
                }).then((templ) => {
                    let searchedBooksObject = { book: book };
                    let html = templ(searchedBooksObject);
                    resolve(html);
                });
        });
    }

    add(bookData) {
        requester.post('/books', bookData);
    }

    edit() {

    }

    delete() {
        requester.get('/books').then((books) => {
            // TODO delete books
        });
    }
}

function getData(url) {
    let book;
    return new Promise((resolve, reject) => {
        requester.get(url)
            .then(data => {
                book = data;
                return template.get('book');
            }).then((template) => {
                let obj = { book: book };
                let html = template(obj);
                resolve(html);
            });
    });
}

export default BookController;
