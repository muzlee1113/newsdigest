// Dependencies
var express = require("express");
const router = express.Router()
// Require all models
var db = require("../models/index");


//Routes
// POST: save a news article from newsDB to savednewsDB
router.post("/api/savenews", function (req, res) {
    //  check the headline 
    // if match sth don sent the record to the database

    // News DB change boolean saved to true
    db.News.findByIdAndUpdate(req.body.id, { $set: { saved: true } }, { new: true }).then(function (newsdata) {
        console.log(newsdata)
        // avoid multiple saved action
        db.SavedNews.init().then(function () {
            // insert the savedNews as an object into savedNews DB
            db.SavedNews.create({ news_id: req.body.id, newsobj: newsdata })
                .then(function (savedNewsdata) {

                    res.json(savedNewsdata)

                }).catch(function (err) {
                    res.json(err)
                })
        })
    })
})







//export router
module.exports = router
