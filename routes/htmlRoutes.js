// Dependencies
var express = require("express");
const router = express.Router()
// Require all models
var db = require("../models/index");

// routes
// GET: render all the news
router.get("/", function (req, res) {
    console.log("a GET request for all the scraped news")
    db.News.find({}, function (err, data) {
        if (err) {
            res.status(500).send()
            console.log(err)
        } else {

            var newsDataObj = {
                newsData: data
            }
            // res.json(data)
            //render in news.handlebars
            res.render("news", newsDataObj)
        }
    })
});



// GET: render all the savednews
router.get("/savednews", function (req, res) {
    console.log("a GET request for all the saved news")
    db.SavedNews.find({}, function (err, data) {
        if (err) {
            res.status(500).send()
            console.log(err)
        } else {
            var newsDataObj = {
                newsData: data
            }
            //render in news.handlebars
            res.render("savedNews", newsDataObj)
        }
    })

})




//export router
module.exports = router
