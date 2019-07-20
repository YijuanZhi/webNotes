let port = 3000;

let express = require("express");
let app = express();

let bodyParser = require("body-parser");

let friends = [
  {
    name: "Zac",
    age: 22
  },
  {
    name: "Yijuan",
    age: 23
  }
];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

//routes
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/friends", function(req, res) {
  res.render("friends", {
    friends: friends
  });
});

//POST gets(body-parser) the request info and puses the info into database
//req.body includes all the info that is post(from form)
//then redirect the users to /friends page
app.post("/addFriends", function(req, res) {
  let fname = req.body.name;
  let fage = req.body.age;
  friends.push({
    name: fname,
    age: fage
  });
  res.redirect("/friends");
});

app.listen(port, function() {
  console.log("Server started.");
});
