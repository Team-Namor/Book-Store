'use strict';
let express = require('express'),
    bodyParser = require('body-parser'),
    bookController = require('./controllers/booksController');

let app = express();

app.use(bodyParser.json());
app.use(express.static('./node_modules'));
app.use(express.static('./public'));

app.get('/books', bookController.get);

app.post('/books', function(req, res){
    let book = req.body;
    db.books.insert(book, function(err, newBook){
        res.send(newBook)
    })
})

app.post('/register', function(req,res) {
    let user = req.body;
    user.isFromServer = true;

    res.json(user);
})

var port = 3333;
app.listen(port, function () {
    console.log(`Server is running at http://localhost:${port}`);
});



