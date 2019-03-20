// Dependencies
var express = require("express");
const router = express.Router()
// Require all models
var db = require("../models/index");


//Routes
// POST: save a news article from newsDB to savednewsDB
router.post("/api/savenews", function (req, res) {

    // db.News.findById(req.body.id, function (err, newsdata) {
    //     if (err) throw err
    //     console.log(newsdata)
    //     db.SavedNews.create({ newsobj: newsdata }).then(function (savedNewsdata) {
    //         // return connect with News DB change boolean
    //         return db.News.findByIdAndUpdate(savedNewsdata.newsobj._id, { $set:{saved:true}})
    //     }).then(function(newsdata){

    //         res.json(newsdata)
    //     }).catch(function (err) {
    //         res.json(err)
    //     })
    // })

    // News DB change boolean saved to true
    db.News.findByIdAndUpdate(req.body.id, { $set: { saved: true } }, {new:true}).then(function (newsdata) {
        console.log(newsdata)
        // insert the savedNews as an object into savedNews DB
        db.SavedNews.create({ newsobj: newsdata }).then(function (savedNewsdata) {

            res.json(savedNewsdata)

        }).catch(function (err) {
            res.json(err)
        })
    })
})







    //export router
    module.exports = router
