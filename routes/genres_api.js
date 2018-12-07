let router = require('express').Router();
let Genre = require('../models/Genres');
let bodyParser = require('body-parser');

// body-parser to parse json objects
let urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/genres', (req, res, next) => {
    // find genres
    if (req.query.limit) {
        Genre.find({}, (err, data)=>{
            if (err) throw err;
            res.json(data);
        }).limit(parseInt(req.query.limit));
    }else{
        Genre.find({}, (err, data)=>{
            if (err) throw err;
            res.json(data);
        });
    }    
});

router.get('/genres/:id', (req, res, next) => {
    Genre.findOne({name: req.params.id}, (err, data)=>{
        if (err) throw err;
        res.json(data);
    });   
});

router.post('/genres', urlencodedParser, (req, res, next) => {
    Genre(req.body).save((err, data) => {
        if (err) throw err;
        res.json(data);
        console.log("Genre successfully saved");
    });
});

router.put('/genres/:id', urlencodedParser, (req, res, next) => {
    Genre.findByIdAndUpdate({_id: req.params.id}, req.body).then(
        // find and replace with the updated genre
        ()=>{
            Genre.findById(req.params.id).then(
                genre => {
                    res.json(genre);
                }
            )
        }
    )
});

router.delete('/genres/:id', (req, res, next) => {
    Genre.findOneAndDelete({name: req.params.id}, (err, data)=>{
        if(err) throw err;
        res.json(data);
        console.log('Genre successfully Deleted');
    });
}); 


module.exports = router;