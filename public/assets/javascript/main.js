$(document).ready(function () {

    // clickhandlers
    // scrape news
    $("#scrapeNYTWN").on("click",function(e){
        console.log("scrape NYT WN click!")
        e.preventDefault()
        // ajax GET request to do scraping on NYT World News
        $.ajax({
            url: "/api/scrape/nytworld",
            method: "GET"
        }).then(function(result){
            alert(result)
        })
    })
    $("#scrapeNYTUS").on("click",function(e){
        console.log("scrape NYT US click!")
        e.preventDefault()
        // ajax GET request to do scraping on NYT US News
        $.ajax({
            url: "/api/scrape/nytus",
            method: "GET"
        }).then(function(result){
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
        })
    })

    // trigger input areas for taking notes on saved news articles
    $(".noteNews").on("click", function(e){
        console.log("note click!")
        e.preventDefault()
        // get the _id out from data_id
        var id = $(this).data("id")
        $("#notearea").css("display","block")
        $("#savenote").attr("data-id", id)
    })

    // save notes into database
    $("#savenote").on("click", function(e){
        console.log("note click!")
        e.preventDefault()
        // get the _id out from data_id
        var id = $(this).data("id")
        console.log(id)
        var comment = $("#note").val()
        console.log(comment)
        // format the reqest body
        var requestBody = {
            savedNews_id: id,
            comment: comment
        }
        // make a POST request to notesDB
        $.ajax({
            url: "/api/newnote",
            method: "POST",
            data: requestBody
        }).then(function(result){
            console.log(result)
        })
    })


})




  // functions
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








