'use strict';
let express = require('express'),
    db = rootRequire('../db/data'),
    bodyParser = require('body-parser'),
    bookController = require('./controllers/booksController')

app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(express.static('../node_modules'));

app.get('/books',bookController.get);

app.post('/books', function(req, res){
    let book = req.body;
    db.books.insert(book, function(err, newBook){
        res.send(newBook)
    })
})

var port = 3333;
app.listen(port, function () {
    console.log(`Server is running at http://localhost:${port}`);
});



