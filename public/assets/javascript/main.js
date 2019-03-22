$(document).ready(function () {

    // clickhandlers
    // scrape news
    // NYT World News
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

    // trigger input areas for taking notes on savednews
    $(".noteNews").on("click", function (e) {
        console.log("note click!")
        e.preventDefault()
        // get the _id out from data-id
        let id = $(this).data("id")
        // changed the submit button's data id
        $("#savenote").attr("data-id", id)
        $("#clearnotes").attr("data-id", id)
        // make a get request to get all the notes of this saved notes
        updateModal(id)
    })

    // save notes into database
    $("#savenote").on("click", function (e) {
        console.log("note click!")
        e.preventDefault()
        // get the _id out from data_id
        let id = $(this).data("id")
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
    $("#clearnotes").on("click",function(e){
        console.log("delete all notes click!")
        e.preventDefault()
        // make a delete request to delete all note
        let id = $(this).data("id")
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







//===========================================================================
// functions
// update notes modal
const updateModal = function (savednewsid) {
    $.ajax({
        url: "/api/notes/" + savednewsid,
        method: "GET",
        // data: requestBody
    }).then(function (data) {
        console.log(data)
        $("#takennotes").empty()
        $("#selectedNewsTile").text(data[0].savedNews.newsobj.headline)

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
//   var saveNews = function(e){
//     console.log("click!")
//     e.preventDefault()
//     // get the _id out from data_id
//     var id = $(this).data("id")
//     // create the request body
//     var requestBody={
//         id: id
//     }
//     // make an ajax request with the request body
//     $.ajax({
//         url: "/api/savenews",
//         method: "POST",
//         data: requestBody
//     }).then(result => {
//         console.log("Save an article!")
//         console.log(result)
//     })
//   }

// })   








