let data = require('../../db/data.js');

let categoryController = {
    get(req, res) {
        data.getCategories().then(categories => res.json(categories)).catch(err => {
            res.status(500).send(err.message)
        });
    },

    post(req, res) {
        let category = req.body;
        data.postCategories(category).then(data => res.json(data)).catch(err => {
            res.status(500).send(err.message);
        });
    }
};

module.exports = categoryController;