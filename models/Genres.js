let mongoose = require('mongoose');

// genre schema
const GenreSchema = mongoose.Schema({
    "name" : {
        type: String,
        required: true 
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// genre model
let BookModel = mongoose.model('Genre', GenreSchema);

module.exports = BookModel;