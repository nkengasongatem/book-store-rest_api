let router = require('express').Router();
let Book = require('../models/Books');
let bodyParser = require('body-parser');

// body-parser to parse json objects
let urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/books', (req, res, next) => {
    // find books
    if(req.query.limit){
        Book.find({}, (err, data) => {
            if (err) throw err;
            res.send(data);
        }).limit(parseInt(req.query.limit));
    }else{
        Book.find({}, (err, data) => {
            if (err) throw err;
            res.send(data);
        });      
    }
});

router.get('/books/:id', (req, res, next) => {
    // find book
    Book.findOne({title: req.params.id.replace(/\-/g," ")}, (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

router.post('/books', urlencodedParser, (req, res, next) => {
    Book(req.body).save((err, data)  => {
        if(err) throw err;
        res.json(data);
        console.log('Book successfully saved');
    })
});

router.put('/books/:id', urlencodedParser, (req, res, next) => {
    Book.findByIdAndUpdate({_id: req.params.id}, req.body).then( ()=>{
        Book.findById(req.params.id).then(
            book => {
                res.json(book);
            }
        )}
    )
});

router.delete('/books/:id', (req, res, next) => {
    Book.findOneAndDelete({title: req.params.id.replace(/\-/g," ")}, (err, data)=>{
        if(err) throw err;
        res.json(data);
        console.log('Book successfully deleted');
    });
});


module.exports = router;