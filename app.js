let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let books_api = require('./routes/books_api');
let genres_api = require('./routes/genres_api');

const app = express();

// mongodb connection
mongoose.connect('mongodb://localhost/bookstore');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// api endpoints
app.get('/', (req, res, next)=>{
    res.end('Please use: /api/books or /api/genres');
});

app.use('/api', books_api);
app.use('/api', genres_api);

app.listen(3000 || process.env.port, ()=>{
    console.log("\nServer up and running: Now listening to port 3000")
});