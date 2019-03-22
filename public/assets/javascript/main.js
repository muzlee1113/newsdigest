$(document).ready(function () {
    //======================================================================================================
    // Clickhandlers
    //======================================================================================================
    
    // Home ------------------------------------------------------------------------------------------------
    // scrape news
    $(".scrapebtn").on("click", function(e){
        console.log("scrape click!")
        e.preventDefault()
        let source = $(this).data("source")
        console.log("Scraping from "+ source + "...")
        // ajax GET request to do scraping on News from source
        $.ajax({
            url: "/api/scrape/" + source,
            method: "GET"
        }).then(function (result) {
            location.reload()
            alert(result)
            console.log(result)
        })
    })

    // clear all scraped news
    $("#clearnews").on("click",function(e){
        console.log("clear all news click!")
        e.preventDefault()
        // ajax DELETE request to empty the news database and update the dom
        $.ajax({
            url: "/api/clearnews",
            method: "DELETE"
        }).then(function (result) {
            location.reload()
            alert(result)
        })
    })


    // save a news article
    $(".saveNews").on("click", function (e) {
        console.log("save click!")
        e.preventDefault()
        // get the _id out from data_id
        var id = $(this).data("id")
        // create the request body
        var requestBody = {
            id: id
        }
        console.log(requestBody)
        // make an ajax request with the request body
        $.ajax({
            url: "/api/savenews",
            method: "POST",
            data: requestBody
        }).then(result => {
            console.log("Save an article!")
            console.log(result)
            location.reload()
        })
       
    })
// --------------------------------------------------------------------------------------------------------------


// Saved --------------------------------------------------------------------------------------------------------
    // about saved news !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // delete a saved news
    $(".deleteNews").on("click",function(e){

        console.log("delete a savednews click!")
        e.preventDefault()
        // get the _id out from data-id
        let id = $(this).data("id")
        let originalid = $(this).data("originalid")
        let requestBody = {
            originalid: originalid
        }
        // make a DELETE request to delete the specific saved news
        $.ajax({
            url: "/api/deletesavednews/"+id,
            method: "DELETE",
            data: requestBody
        }).then(function(result){
            console.log("deleted a savednews!")
            // reload the page
            location.reload()
        })
    })
    // delete all saved news
    $("#deletesavednews").on("click",function(e){
        console.log("delete all saved news click!")
        e.preventDefault()
        // make a DELETE request to delete all the saved news
        $.ajax({
            url: "/api/deletesavednews/",
            method: "DELETE",
        }).then(function(result){
            console.log("deleted all savednews!")
            // reload the page
            location.reload()
        })

    })

    // about notes !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // trigger all notes modal and show all notes connecting with headline
    $("#showallnotes").on("click",function(e){
        console.log("show all notes click!")
        e.preventDefault()
        $.ajax({
            url: "/api/allnotes",
            method: "GET",
            // data: requestBody
        }).then(function (data) {
            console.log(data)
            $("#allNotes").empty()
    
            for (let i in data) {
                // get headline
                let headline = data[i].newsobj.headline
                let link = data[i].newsobj.link
                // get comments
                let commentPtag = ``
                for(let j in data[i].comments){
                    let comment = data[i].comments[j].comment
                    let date = data[i].comments[j].date
                    let commentid = data[i].comments[j]._id
                    commentPtag += `<p data-commentid="`+ commentid +`"><b>"`+comment+ `"</b> <span class="text-info">at ` + date +`</span></p><hr>`
                }
                // set headline and comment divs to the card
                let cardDiv = 
                `<div class="card bg-light mb-3" style="width: 100%;">
                    <a href="`+ link +`" style="color:rgb(0,0,128)!important"><div class="card-header">Notes for "`+ headline +`"</div></a>
                    <div class="card-body">` +
                        commentPtag +
                    `</div>
                </div>`
                // append the card to the modal body
                $("#allNotes").append(cardDiv)
            }
        })
    })
     


    // trigger input areas for taking notes on savednews
    $(".noteNews").on("click", function (e) {
        console.log("note click!")
        e.preventDefault()
        // get the _id out from data-id
        let id = $(this).data("id")
        let headline = $(this).data("headline")
        // changed the submit button's data id
        $("#savenote").attr("data-id", id)
        $("#clearnotes").attr("data-id", id)
        console.log("now the savenote btn data-id is " + id)
        // make a get request to get all the notes of this saved notes
        updateModal(id, headline)
    })

    // save notes into database
    $(".buttons").on("click", "#savenote", function (e) {
        console.log("note click!")
        e.preventDefault()
        // get the _id out from data_id
        let id = $(this).attr("data-id")
        console.log("the data-id I actually grabbed is " + id)
        console.log(id)
        var comment = $("#note").val()
        console.log(comment)
        // format the reqest body
        var requestBody = {
            savedNews: id,
            comment: comment
        }
        // make a POST request to notesDB
        $.ajax({
            url: "/api/newnote",
            method: "POST",
            data: requestBody
        }).then(function (result) {
            console.log(result)
            // call the updateModal function to update the notes on dom
            updateModal(id)
        })

    })

    // delete a specific note
    $(".notes").on("click","button.deletenote",function(e){
        console.log("delete note click!")
        e.preventDefault()
        // make a delete request to delete specific note
        let savednewsid = $("#savenote").data("id")
        let id = $(this).data("id")
        $.ajax({
            url: "/api/note/"+id,
            method: "DELETE",
        }).then(function(result){
            console.log("delete a note!")
            updateModal(savednewsid)
        })
    })

    // delete all notes
    $(".buttons").on("click","#clearnotes",function(e){
        console.log("delete all notes click!")
        e.preventDefault()
        // make a delete request to delete all note
        let id = $(this).attr("data-id")
        console.log(id)
        $.ajax({
            url: "/api/clearnotes/"+id,
            method: "DELETE",
        }).then(function(result){
            console.log("delete all notes!")
            updateModal(id)
        })
    })
})
// --------------------------------------------------------------------------------------------------------------







//===============================================================================================================
// Functions
//===============================================================================================================

// update notes modal
const updateModal = function (savednewsid, headline) {
    // empty all the things
    $("#takennotes").empty()
    $('#note').val('');
    if(headline){
        $("#selectedNewsTile").text(headline)
    }

    //GET request for all the notes of a specific saved news
    $.ajax({
        url: "/api/notes/" + savednewsid,
        method: "GET",
        // data: requestBody
    }).then(function (data) {
        console.log(data)
        for (let i in data) {
            let noteid = data[i]._id
            let comment = data[i].comment
            let date = data[i].date
            let noteDiv = 
            `<div class="card mb-2"  style="width:100%">`
                +`<div class="card-body mb-2" data-id=` + noteid + `>`
                + `<div class="row align-items-center">`
                + `<div class="col-10">`
                + `<h5>` + comment + `</h5>`
                + `<p class="mb-0">Made at ` + date + `</p>`
                + `</div>`
                + `<div class="col-2"><button class="btn btn-danger deletenote" data-id=` + noteid + `>x</button></div>`
                + `</div>`
                + `</div>`
            + `</div>`
            $("#takennotes").append(noteDiv)

        }
    })
}






