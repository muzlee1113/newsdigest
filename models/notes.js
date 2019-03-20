var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new LibrarySchema object
// This is similar to a Sequelize model
var NotesSchema = new Schema({
    comment: {
        type: String,
        required: "Comments is a must!"
    },
    date:  {
        type: Date,
        default: Date.now()
    },
    savedNews_id: String
});

// This creates our model from the above schema, using mongoose's model method
var Notes = mongoose.model("Notes", NotesSchema);

// Export the Book model
module.exports = Notes;
