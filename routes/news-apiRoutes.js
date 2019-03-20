// Dependencies
var express = require("express");
const router = express.Router()
// Require all models
var db = require("../models/index");

// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// routes
// GET : NYT World News
router.get("/api/scrape/nytworld", function (req, res) {
    // remove exisiting news
    db.News.remove({}, function () {
        // make a axio request for NYT webpage
        axios.get("https://www.nytimes.com/section/world").then(function (response) {
            // Load the HTML into cheerio and save it to a variable 
            var $ = cheerio.load(response.data);
            var newsArr = [];
            // scraping headline, link, summary, picture, date
            $("#stream-panel").find("li").each(function (i, element) {

                var headline = $(element).find("h2").text()
                var link = $(element).find("a").attr("href")
                var photo = $(element).find("img").attr("src")
                var summary = $(element).find("p").text()
                var date = link.slice(1,11)
                var n = summary.search(".By")
                var reporter = summary.slice(n+4)
                summary = summary.slice(0,n+1)
                console.log(reporter)
                console.log(summary)



                // Save these results in an object that we'll push into the results array we defined earlier
                var news = {
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
            db.News.create(newsArr).then(function (dbNews) {
                res.json(amount + " news articles added!")
            }).catch(function (err) {
                res.json(err)
            })

        })

    })
});

// GET : NYT US News
router.get("/api/scrape/nytus", function (req, res) {
    // remove exisiting news
    db.News.remove({}, function () {
        // make a axio request for NYT webpage
        axios.get("https://www.nytimes.com/section/us").then(function (response) {
            // Load the HTML into cheerio and save it to a variable 
            var $ = cheerio.load(response.data);
            var newsArr = [];
            // scraping headline, link, summary, picture, date
            $("#stream-panel").find("li").each(function (i, element) {

                var headline = $(element).find("h2").text()
                var link = $(element).find("a").attr("href")
                var photo = $(element).find("img").attr("src")
                var summary = $(element).find("p").text()
                var date = link.slice(1,11)
                var n = summary.search(".By")
                var reporter = summary.slice(n+4)
                summary = summary.slice(0,n+1)
                console.log(reporter)
                console.log(summary)



                // Save these results in an object that we'll push into the results array we defined earlier
                var news = {
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
            db.News.create(newsArr).then(function (dbNews) {
                res.json(amount + " news articles added!")
            }).catch(function (err) {
                res.json(err)
            })

        })

    })
});

// GET: NYT Tech News
//https://www.nytimes.com/section/technology


// GET: NYT Sport News
// https://www.nytimes.com/section/sports


// GET: NYT Business News
//https://www.nytimes.com/section/business

//export router
module.exports = router
