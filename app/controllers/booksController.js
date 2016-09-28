let data = require('../../db/data.js');

let bookController = {
    get(req, res) {
        data.getBooks().then(books => res.json(books)).catch(err => {
            res.status(500).send(err.message);
        });
    },

    getById(req, res) {
        data.getBookById(req).then(book => res.json(book)[0]).catch(err => {
            res.status(500).send(err.message);
        });
    },

    add(req, res) {
        let book = req.body;
        data.addBook(book).then(data => res.json(data)).catch(err => {
            res.status(500).send(err.message);
        });
    }
};

module.exports = bookController;