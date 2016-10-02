import requester from '../data/requester.js';
import template from 'template';
import 'jquery';

const SIZE = 6;

class BookController {

    index(page) {
        let book;
        return new Promise((resolve, reject) => {
            requester.get('/books')
                .then(data => {
                    book = data;
                    return template.get('book');
                }).then((template) => {
                    let pageSize = Math.floor(Math.abs((book.length - SIZE - 1)) / SIZE);
                    let currentPage = book.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE);
                    let buttonsCount = Array(Math.ceil(book.length / SIZE)).fill(1);
                    let obj = { books: { book: currentPage, size: buttonsCount, hasQuery: false } };
                    let html = template(obj);
                    resolve(html);
                });
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            requester.get('/books/' + id)
                .then(data => {
                     resolve(data);
                });
        });
    }

    getRandom() {
        return new Promise((resolve, reject) => {
            requester.get('/books')
                .then(data => {
                    resolve(data[Math.floor(Math.random() * data.length)]);
                    console.dir(data[Math.floor(Math.random() * data.length)])
                });
        });
    }

    attachToTemplate(data, templateName) {
        return new Promise((resolve, reject) => {
            template.get(templateName).then(template => {
                let obj = { book: data };
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
                    book = data.filter(b => b._title.toLowerCase().indexOf(paramToLower) > -1 ||
                        b._author.toLowerCase().indexOf(paramToLower) > -1);
                    return template.get('book');
                }).then((templ) => {
                    let pageSize = Math.floor(Math.abs((book.length - SIZE - 1)) / SIZE);
                    let currentPage = book.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE);
                    let buttonsCount = Array(Math.ceil(book.length / SIZE)).fill(param);
                    let searchedBooksObject = { books: { book: currentPage, size: buttonsCount, hasQuery: true } };
                    let html = templ(searchedBooksObject);
                    resolve(html);
                });
        });
    }

    add(context) {
        context.params.price = parseFloat(context.params.price);
        return  requester.post('/books', context.params);       
    }

    edit() {
        function increaseLikes(bookId, newLikes) {
            return requester.put(`/books/${bookId}`, { likes: newLikes })
        }

        return {
            increaseLikes
        };
    }
    
    updateCartItems(){
        let currentBooksInCart = JSON.parse(sessionStorage.getItem('cart'));
        let totalAmount = 0;
        if (currentBooksInCart !== null) {
            for (let book of currentBooksInCart) {
                totalAmount += +book._price;
            }

            template.get('cart-dropdown').then(template => {
                let obj = { book: currentBooksInCart, amount: totalAmount };
                let html = template(obj);

                console.log('+1');
                $("#dropdown-cart").html(html);
            });
        }
    }

    delete() {
        requester.get('/books').then((books) => {
            // TODO delete books
        });
    }
}

export default BookController;
