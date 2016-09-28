import requester from '../utils/jqueryJSONRequester.js';
import template from 'template';
import 'jquery';

class CategoryController {
    constructor() { }
    index(element) {
        Promise.all([requester.get('/categories'), template.get('category')])
            .then(([category, template]) => {
                let obj = { category: category };
                console.log(obj);
                let html = template(obj);
                element.html(html);
            });
    }

    add(newCategory) {
        requester.post('/categories', newCategory);
    }

    edit() {

    }

}

export default CategoryController;