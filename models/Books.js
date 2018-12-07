let mongoose = require('mongoose');

// book schema
const BookSchema = mongoose.Schema(
    {
        "title" : {
            type: String,
            required: true
        },
        "genre" : {
            type: String,
            required: true
        },
        "description" : String,
        "author" : {
            type: String,
            required: true
        },
        "publisher" : {
            type: String,
            required: true
        },
        "pages" : Number,
        "image_url" : String,
        "buy_url" : String,
        "create_date": {
            type: Date,
            default: Date.now
        }
    }
);

// book model
let BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;