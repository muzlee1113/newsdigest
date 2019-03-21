// Dependencies
var express = require("express");
const router = express.Router()
// Require all models
var db = require("../models/index");


//Routes
router.post("/api/newnote", function(req, res){
    // req.body  --> {
        // savedNews_id: id
        // comment: ""
    // }
    db.Notes.create(req.body).then(function(notedata){
        // return  connect with savedNews DB push comments array
        return db.SavedNews.findByIdAndUpdate(notedata.savedNews_id, {$push:{comments: notedata._id}})
    }).then(function(savedNewsdata){
        res.json(savedNewsdata)
    }).catch(function(err){
        res.json(err)
    })
})




//export router
module.exports = router
