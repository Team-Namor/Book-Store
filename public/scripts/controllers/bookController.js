import requester from '../utils/jqueryJSONRequester.js';
import template from 'template';
import 'jquery';

const SIZE = 6;

class BookController {
    constructor() { }
    index(page) {
        //  return getData('/books');
        let book;
        return new Promise((resolve, reject) => {
            requester.get('/books')
                .then(data => {
                    book = data;
                    return template.get('book');
                }).then((template) => {
                    let pageSize = Math.floor(Math.abs((book.length - SIZE - 1)) / SIZE);
                    let currentPage = book.slice((page - 1) * SIZE, page * SIZE);
                    let buttonsCount = Array(SIZE - 1).fill(1);
                    let obj = { books: { book: currentPage, size: buttonsCount, hasQuery: false } };
                    let html = template(obj);
                    resolve(html);
                });
        });
    }

    get(id) {
        let book;
        return new Promise((resolve, reject) => {
            requester.get('/books/' + id)
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

    searchBy(param, page) {
        let book;
        return new Promise((resolve, reject) => {
            requester.get('/books')
                .then((data) => {
                    let paramToLower = param.toLowerCase();
                    book = data.filter(b => b.title.toLowerCase().indexOf(paramToLower) > -1 ||
                        b.author.toLowerCase().indexOf(paramToLower) > -1);
                    return template.get('book');
                }).then((templ) => {
                    let pageSize = Math.floor(Math.abs((book.length - SIZE - 1)) / SIZE);
                    let currentPage = book.slice((page - 1) * SIZE, page * SIZE);
                    let buttonsCount = Array(Math.ceil(book.length / SIZE)).fill(param);
                    let searchedBooksObject = { books: { book: currentPage, size: buttonsCount, hasQuery: true } };
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
