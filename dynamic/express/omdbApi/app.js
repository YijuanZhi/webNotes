let port = 3000;
let express = require("express");
let app = express();

let bodyparser = require("body-parser");
let rp = require("request-promise");

// app.use(static("public"));
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/search", (req, res) => {
  //   console.log(req.body);
  let searchTerm = req.query.search;
  let url = "http://www.omdbapi.com/?apikey=thewdb&s=" + searchTerm;
  rp(url)
    .then(htmlString => {
      let jsonData = JSON.parse(htmlString);
      if (jsonData["Response"] === "True") {
        let searchData = jsonData["Search"];
        res.render("search", { search: searchData });
      } else {
        res.send(jsonData["Error"]);
      }
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log("Server " + port + " started.");
});
