let express = require("express");
let app = express();
let port = 3000;

//Serving static files in Express
//https://expressjs.com/en/starter/static-files.html
//use the following code to serve images, CSS files
//and JavaScript files in a directory named public
app.use(express.static("public"));

//set the open engine from views folder
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  //Express will go the views folder, and find as well as renders the target file
  res.render("home.ejs");
});

app.get("/love/id/:something", function(req, res) {
  let thing = req.params.something;
  let posts = [
    {
      title: "Post 1",
      author: "Yijuan"
    },
    {
      title: "Post 2",
      author: "Xavier"
    },
    {
      title: "Post 3",
      author: "Zac"
    }
  ];
  //When we pass the render method with an object, the object will be used in ejs
  //thingVar is a variable in ejs file and thing is a local variable from js file
  //ejs: <h1>You fell in love with: <%=thingVar%> </h1>
  res.render("love.ejs", {
    thingVar: thing,
    posts: posts
  });
});

app.get("/bye", function(req, res) {
  res.send("Good bye!");
});

app.listen(port, function() {
  console.log(port + " server has started.");
});
