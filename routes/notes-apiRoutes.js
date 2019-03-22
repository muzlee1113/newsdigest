// Dependencies
var express = require("express");
const router = express.Router()
// Require all models
var db = require("../models/index");


//Routes
// GET: detailed notes of a specific saved news
router.get("/api/notes/:id", function(req, res){
    let id = req.params.id    
    db.Notes.find({savedNews: id}).populate("savedNews").then(function(notesdata){
        res.json(notesdata)
    }).catch(function(err){
        res.json(err)
    })
})

// POST: a new note
router.post("/api/newnote", function(req, res){
    db.Notes.create(req.body).then(function(notedata){
        // return  connect with savedNews DB push comments array
        return db.SavedNews.findByIdAndUpdate(notedata.savedNews, {$push:{comments: notedata._id}})
    }).then(function(savedNewsdata){
        res.json(savedNewsdata)
    }).catch(function(err){
        res.json(err)
    })
})

// DELETE: a note with id
router.delete("/api/note/:id", function(req, res){
    db.Notes.deleteOne({ _id: req.params.id }).then(function(result){
        res.json(result)
    }).catch(function(err){
        res.json(err)
    })
})

// DELETE: all notes with id
router.delete("/api/clearnotes/:id", function(req, res){
    db.Notes.deleteMany({ savedNews: req.params.id }).then(function(result){
        res.json(result)
    }).catch(function(err){
        res.json(err)
    })

})




//export router
module.exports = router
