// Dependencies
var express = require("express");
const router = express.Router()
// Require all models
var db = require("../models/index");


//Routes
// POST: save a news article from newsDB to savednewsDB
router.post("/api/savenews", function (req, res) {

    db.News.findById(req.body.id, function (err, newsdata) {
        if (err) throw err
        console.log(newsdata)
        db.SavedNews.create({ newsobj: newsdata }).then(function (dbNews) {
            res.json(dbNews)

        }).catch(function (err) {
            res.json(err)
        })

    // return connect with News DB change boolean

    })
})







//export router
module.exports = router
