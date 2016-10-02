import requester from '../data/requester.js';
import template from 'template';
import 'jquery';

class CategoryController {

    constructor() {
    }

    index(context) {
        Promise.all([requester.get('/categories'), template.get('category')])
            .then(([category, template]) => {
                let obj = {category: category};
                let html = template(obj);
                context.swap(html);
            });
    }

    add(newCategory) {
        requester.post('/categories', newCategory);
    }

    searchBooksByCategory(context, categoryName) {
        Promise.all([requester.get('/books'), template.get('booksByCategory')])
            .then(([books, template]) => {
                let filteredBooks = books.filter(book=>book._category === categoryName);
                let obj={
                    books:filteredBooks
                };

                let html = template(obj);
               context.$element().find('#selected-books').html(html);
            });
    }
}

export default CategoryController;