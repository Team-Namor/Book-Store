let data = require('../../db/data.js');

let bookController = {
    get(req, res){
        data.getBooks().then(books => res.json(books)).catch(err => 
        {
            res.status(500).send(err.message)
        })
    },

    post(req, res){
        
    }
}

module.exports = bookController;