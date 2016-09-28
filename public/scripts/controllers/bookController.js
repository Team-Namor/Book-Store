import requester from '../utils/jqueryJSONRequester.js';
import template from 'template';
import 'jquery';

class BookController {
    constructor() { }
    index(element) {
        Promise.all([requester.get('/books'), template.get('book')])
            .then(([book, template]) => {
                let obj = { book: book };
                console.log(obj);
                let html = template(obj);
                element.html(html);
            });
    }

    get(id) {
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
