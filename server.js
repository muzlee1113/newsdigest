// =================================================================================
// Setting up 
// Dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Port
var PORT = process.env.PORT || 3000;


// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));


// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Make public a static folder
app.use(express.static("public"));



// =================================================================================
// Handlebars
//For express and handlebars to talk to each others
// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ 
    defaultLayout: "main",
    helpers: {
        dateFormat: require('handlebars-dateformat')
    }
}));
// all the handlebars are in the ‘view’ folder, the following path will look for handlerbar in this folder
app.set("view engine", "handlebars");


// =================================================================================
// Database Connection
// Connect to the Mongo DB (newsdigest)
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsdigest";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });





// =================================================================================
// Routes
// require routes
var newsRoutes = require("./routes/news-apiRoutes");
var savedNewsRoutes = require("./routes/savedNews-apiRoutes");
var notesRoutes = require("./routes/notes-apiRoutes");
var htmlRoutes = require("./routes/htmlRoutes");


// use the routes
app.use(htmlRoutes);
app.use(newsRoutes);
app.use(savedNewsRoutes);
app.use(notesRoutes);



// =================================================================================
// Listen
// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});