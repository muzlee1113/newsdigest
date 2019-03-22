// Dependencies
var express = require("express");
const router = express.Router()
// Require all models
var db = require("../models/index");

// routes
// GET: render all the news
router.get("/", function (req, res) {
    db.News.find({}, function (err, data) {
        if (err) {
            res.status(500).send()
            console.log(err)
        } else {
            reversedData = data.reverse()
            var newsDataObj = {
                newsData: reversedData
            }
            // res.json(data)
            //render in news.handlebars
            res.render("news", newsDataObj)
        }
    })
});



// GET: render all the savednews
router.get("/savednews", function (req, res) {
    db.SavedNews.find().populate("comments").then(
        function (savedNewsdata) {
            var newsDataObj = {
                newsData: savedNewsdata
            }
            //render in news.handlebars
            res.render("savedNews", newsDataObj)
            // res.json(savedNewsdata)
        }).catch(function (err) {
            res.json(err)
        })
})




//export router
module.exports = router
