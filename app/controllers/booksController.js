let data = require('../../db/data.js');
let Book = require('../../db/models/book');
let getNewCategory = require('../../db/models/category');

let bookController = {
    get(req, res) {
        data.getBooks()
            .then(books => {
                res.json(books)})
            .catch(err => { res.status(500).send(err.message); });
    },

    getById(req, res) {
        data.getBookById(req)
            .then(book => res.json(book)[0])
            .catch(err => { res.status(500).send(err.message); });
    },

    add(req, res) {
        let book = new Book(req.body.title, req.body.author, req.body.year,req.body.category, req.body.description,req.body.imgURL, req.body.price);
        let category = getNewCategory(req.body.category);

        data.addBook(book)
            .then( newBook => {
                res.json(newBook);
                data.checkCategoryExisting(category.name).then(newCategory => {
                    if(!newCategory){
                        data.postCategory(category);
                    }
                })            
            })
            .catch(err => { res.status(500).send(err.message); });
    },
    put(req, res) {
        let update = req.body,
            bookToBeUpdated = req.params.id;

        data.updateBook(update, bookToBeUpdated)
            .then(data => res.json(data))
            .catch(err => res.status(500).send(err.message));
    }
};

module.exports = bookController;