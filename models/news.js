var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new LibrarySchema object
// This is similar to a Sequelize model
var NewsSchema = new Schema({
    source: String,
    headline: {
        type: String,
        required: "Headline is a must!"
    },
    summary:  String,
    link: {
        type: String,
        required: "Link is a must!",
        // link is the best field for unique checking
        unique: [true, "Don't scrape the news twice"]

    },
    date: String,
    photo: String,
    saved: {
        type: Boolean,
        default: false
    },
    reporter: String,
    
});

// This creates our model from the above schema, using mongoose's model method
var News = mongoose.model("News", NewsSchema);

// Export the Book model
module.exports = News;
