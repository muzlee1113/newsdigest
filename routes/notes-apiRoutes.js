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
    db.Notes.create(req.body,function(err, data){
        if(err)throw err
        res.json(data)
    })
    // return  connect with savedNews DB push comments array
    //.catch

})




//export router
module.exports = router
