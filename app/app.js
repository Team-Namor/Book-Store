'use strict';
require('./utils/rootRequire')();

let express = require('express'),
    db = rootRequire('../db/db'),
    bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());
app.use(express.static('./'));

var port = 3333;
app.listen(port, function () {
    console.log(`Server is running at http://localhost:${port}`);
});


/* DB TEST just to check if working _ > should be deleted */
var doc = { hello: 'world'
    , n: 10
    , today: new Date()
    , nedbIsAwesome: true
    , notthere: null
    , notToBeSaved: undefined  // Will not be saved
    , fruits: [ 'apple', 'orange', 'pear' ]
    , infos: { name: 'nedb' }
};

db.users.insert(doc, function (err, newDoc) {});

db.users.find({ nedbIsAwesome: true }, function (err, docs) {
    console.dir(docs);
});