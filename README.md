# News Digest

## Getting Started

This is a web application that collects latest news from New York Times and allows users to save a specific notes article and take notes on saved news. [Deploy Page](https://eatdaburgerbyyuwen.herokuapp.com](https://digestnewsbyyuwen.herokuapp.com/). Take a look! Here are some demos:

![Demo1](/demos/demo1.gif)

![Demo2](/demos/demo2.gif)

### Prerequisites

To run the website locally please first follow the steps below

1. Clone the whole repository and get into the directory in your terminal.
2. In your terminal and in the root directory of the repository type in  `npm install`  to set up all the required modules.
3. Run the server.js by entering `node server.js` in the root directory. 
4. Open your browser and enter `http://localhost:3000/` as the address. Then, you can see the page!

## How to use it
- Home
  - Click the `Scrape` button and then click the prefered type of news link to collect latest news; Click another one or the same one will add other/updated news the top of the page, too
  - Click the headline to get access to original webpage of the news
  - Click the `Save` button of a news to add the news to Saved page
- Saved
  - This page deploys all the saved news
  - Click the `Notes` of a to view added notes or add a new note; you can delete a specific note or all notes here, too
  - Click the `Show All Notes` button to view all the notes and `Delete All Saved News` button to empty the saved news page

## Some code snippets
- insert unique scraped news without repeating
  - in **models/news.js**
  
    ~~~~
    var NewsSchema = new Schema({
        source: String,
        headline: {
            type: String,
            required: "Headline is a must!"
        },
        summary:  String,
        link: {
            type: String,
            required: "Link is a must!",
            // link is the best field for unique checking
            unique: [true, "Don't scrape the news twice"]
        },
        date: String,
        photo: String,
        saved: {
            type: Boolean,
            default: false
        },
        reporter: String,
    });
    ~~~~

  - in **routes/news-apiRoutes.js**
    ~~~~
    db.News.insertMany(newsArr, { "ordered": false }).then(function (dbNews) {
        res.json("Get " + amount + " news articles and " + amount + " different ones added!")
    }).catch(function (err) {
        let inserted = err.result.nInserted
        let message = "Get " + amount + " news articles and " + inserted + " different ones added!"
        res.json(message)
        console.log(err)
    })
    ~~~~
- dry up the routes/ajax request for different news sources
  - in **routes/news-apiRoutes.js**
    ~~~~
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
                console.log(reporter)
                console.log(summary)



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
    ~~~~
  - in **public/assets/javascript/main.js**
    ~~~~
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
    ~~~~

## To do
- Add a user model and use JWT to sign up/log in users in order to provide user-related notebook
- Bring in moment.js to convert all the date time in the dom into more readable format


## Authors

* **Yuwen Li** - *Initial work* - [Github](https://github.com/muzlee1113)

