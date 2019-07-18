//basic values setup
let express = require("express");
let app = express();
let port = 3000;

//when going to the main page "localhost:3000"
app.get("/", function(req, res) {
  console.log("Someone request the main page.");
  res.send("Hello there!");
});

app.get("/bye", function(req, res) {
  console.log("Someone request the bye page.");
  res.send("Goodbye!");
});

//after we start the app, using the port and report a msg to command line
app.listen(port, function() {
  console.log(port + "server has started.");
});
