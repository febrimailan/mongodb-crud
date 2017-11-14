const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

let index = require('./routes/index');
let books = require('./routes/books');

app.use('/', index);
app.use('/books', books);

// Start Server
const port = process.env.PORT || 3014;
app.listen(port);
console.log(`server listening at port ${port}`);
