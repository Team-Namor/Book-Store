import requester from '../data/requester.js';
import template from 'template';
import 'jquery';

const SIZE = 12;

class BookController {

    index(page) {
        let book;
        let categories;

        /* Get all categories */
        let categoriesPromise = requester.get('/categories');
        categoriesPromise.then(data => {
            categories = data;
        });

        return new Promise((resolve, reject) => {
            requester.get('/books')
                .then(data => {
                    book = data;
                })
                .then(() => {
                    return template.get('book');
                })
                .then((template) => {
                    let currentPage = book.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE);
                    let buttonsCount = Array(Math.ceil(book.length / SIZE));
                    for (let i = 0; i < buttonsCount.length; i += 1) {
                        buttonsCount[i] = 1;
                    }

                    let obj = {
                        categories: categories,
                        books: {
                            book: currentPage,
                            size: buttonsCount,
                            hasQuery: false
                        }
                    };
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

    searchBy(param, page, isCategory) {
        let book,
            categories;

        /* Get all categories */
        let categoriesPromise = requester.get('/categories');
        categoriesPromise.then(data => {
            categories = data;
        });

        return new Promise((resolve, reject) => {
            requester.get('/books')
                .then((data) => {
                    let paramToLower = param.toLowerCase();

                    if(isCategory === 'true') {
                        book = data.filter(
                            b =>  b._category.toLowerCase().indexOf(paramToLower) > -1
                        );
                    }
                    else{
                        book = data.filter(
                            b => b._title.toLowerCase().indexOf(paramToLower) > -1 ||
                            b._author.toLowerCase().indexOf(paramToLower) > -1 ||
                            b._category.toLowerCase().indexOf(paramToLower) > -1
                        );
                    }

                    return template.get('book');
                })
                .then((templ) => {
                    let currentPage = book.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE);
                    let buttonsCount = Array(Math.ceil(book.length / SIZE));
                     for (let i = 0; i < buttonsCount.length; i += 1) {
                        buttonsCount[i] = param;
                    }

                    let searchedBooksObject = {
                        categories: categories,
                        books: {
                            book: currentPage,
                            size: buttonsCount,
                            hasQuery: true
                        }
                    };
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
