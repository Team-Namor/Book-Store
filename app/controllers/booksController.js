let data = require('../../db/data.js');

let bookController = {
    get(req, res) {
        data.getBooks().then(books => res.json(books)).catch(err => {
            res.status(500).send(err.message)
        });
    },

    post(req, res) {
        let book = req.body;
        data.postBook(book).then(data => res.json(data)).catch(err => {
            res.status(500).send(err.message);
        });
    }
};

module.exports = bookController;