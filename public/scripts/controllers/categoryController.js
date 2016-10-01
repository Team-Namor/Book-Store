import requester from '../data/requester.js';
import template from 'template';
import 'jquery';

class CategoryController {
    
    index(element) {
        Promise.all([requester.get('/categories'), template.get('category')])
            .then(([category, template]) => {
                let obj = {category: category};
                let html = template(obj);
                element.html(html);
            });
    }

    add(newCategory) {
        requester.post('/categories', newCategory);
    }

    searchBooksByCategory(element, categoryName) {
        Promise.all([requester.get('/books'), template.get('booksByCategory')])
            .then(([books, template]) => {
                let filteredBooks = books.find(book=>book._category === categoryName);
                let obj={
                    books:[filteredBooks]
                };

                let html = template(obj);
                element.append(html);
            });
    }
}

export default CategoryController;