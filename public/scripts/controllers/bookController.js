import requester from '../utils/jqueryJSONRequester.js';
import template from 'template';
import 'jquery';

class BookController {
    constructor() { }
    index() {
        let books;
        return new Promise((resolve, reject) => {
            requester.get('/books')
                .then(data => {
                    books = data;
                    return template.get('book');
                }).then((template) => {
                    let obj = { book: books };
                    let html = template(obj);
                    resolve(html);
                });
        });
    }

    get(id) {

    }

    searchBy(param) {
        let foundBooks;
        return new Promise((resolve, reject) => {
            requester.get('/books')
                .then((data) => {
                    foundBooks = data.filter(b => b.title.toLowerCase().indexOf(param) > -1 || b.author.toLowerCase().indexOf(param) > -1);
                    return template.get('book');
                }).then((templ) => {
                    let searchedBooksObject = { book: foundBooks };
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

export default BookController;
