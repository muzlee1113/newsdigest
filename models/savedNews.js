var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new LibrarySchema object
// This is similar to a Sequelize model
var SavedNewsSchema = new Schema({
    comments: {
        type: Array,
    },
    // comments_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: "notes"
    // },
    date:  {
        type: Date,
        default: Date.now()
    },
    newsobj: {
        type: Object,
        required: "There isn't any news article here!"
    }

});

// This creates our model from the above schema, using mongoose's model method
var SavedNews = mongoose.model("SavedNews", SavedNewsSchema);

// Export the Book model
module.exports = SavedNews;
