// Dependencies
var express = require("express");
const router = express.Router()
// Require all models
var db = require("../models/index");

// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// routes
// GET : Scrape News
router.get("/api/scrape/:source", function (req, res) {
    let source = req.params.source
    // make a axio request for NYT webpage
    axios.get("https://www.nytimes.com/section/" + source).then(function (response) {
        // Load the HTML into cheerio and save it to a variable 
        var $ = cheerio.load(response.data);
        var newsArr = [];
        // scraping headline, link, summary, picture, date
        $("#stream-panel").find("li").each(function (i, element) {
            source = source.toUpperCase()
            var headline = $(element).find("h2").text()
            var link = $(element).find("a").attr("href")
            var photo = $(element).find("img").attr("src")
            var summary = $(element).find("p").text()
            var date = link.slice(1, 11)
            var n = summary.search(".By")
            var reporter = summary.slice(n + 4)
            summary = summary.slice(0, n + 1)



            // Save these results in an object that we'll push into the results array we defined earlier
            var news = {
                source: "NEW YORK TIMES " + source,
                headline: headline,
                link: "https://www.nytimes.com" + link,
                photo: photo,
                summary: summary,
                date: date,
                reporter: reporter
            };

            // push a specific piece of news into an Array
            newsArr.push(news)
        })

        // save the number of articles in a variable
        var amount = newsArr.length

        // push the array of news objects into news database
        db.News.insertMany(newsArr, { "ordered": false }).then(function (dbNews) {
            res.json("Get " + amount + " news articles and " + amount + " different ones added!")
        }).catch(function (err) {
            let inserted = err.result.nInserted
            let message = "Get " + amount + " news articles and " + inserted + " different ones added!"
            res.json(message)
            console.log(err)
        })

    })

});

// DELETE: empty the news database
router.delete("/api/clearnews", function (req, res) {
    // remove exisiting news
    db.News.remove({}, function (result) {
        res.json("Delete All!")
    })
})

//export router
module.exports = router
