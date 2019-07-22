//=================================basic values setup=================================
let express = require("express");
let app = express();
let port = 3000;

//=================================Routes part=================================
//when going to the main page "localhost:3000"
app.get("/", function(req, res) {
  console.log("Someone request the main page.");
  res.send("Hello there!");
});

app.get("/bye", function(req, res) {
  console.log("Someone request the bye page.");
  res.send("Goodbye!");
});

//Use ":" to add it as a pattern that application can change
//req inside the function contains all the info of the request, some are important:
//params(an object) in here it is an object including a property named subReddit, we can get its value
app.get("/r/:subReddit", function(req, res) {
  res.send("Now you have enter the subreddit: " + req.params.subReddit);
});

//it has 3 params: subReddit, id and title
//we can access them with req.params.______
app.get("/r/:subReddit/comment/:id/:title", function(req, res) {
  res.send("Now you have enter a comment page of subreddit!");
  let subReddit = req.params.subReddit;
  let id = req.params.id;
  let title = req.params.title;
});

//Any other undefined link will go here,
//it must be placed in the end of routing code and their order matters
app.get("*", function(req, res) {
  res.send("You enter a wrong http link. $404");
});

//=================================App Listen Part=================================
//after we start the app, using the port and report a msg to command line
app.listen(port, function() {
  console.log(port + " server has started.");
});
