// requiring packages
let express = require("express");
let bodyparser = require("body-parser");
let methodOveride = require("method-override");
let session = require("express-session");
let passport = require("passport");
let localStrategy = require("passport-local");
let mongoose = require("mongoose");
let User = require("./modules/user");
let commentsRouter = require("./routes/comments");
let indexRouter = require("./routes/index");
let itemsRouter = require("./routes/items");
let seedDB = require("./seeds");

// basic app setup
let app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOveride("_method")); //override POST with potential PUT or DELETE

//Database Setup
mongoose.connect("mongodb://localhost/photo_camp", { useNewUrlParser: true });
// seedDB();

// Authentication Setup
app.use(
  session({
    secret: "This is the secret!",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Making currentUser available for every routes(ejs) even if it is not defined
// res.locals stands for resources in res
// app.use can not use arrow function
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
// use routes
app.use(indexRouter);
app.use("/items", itemsRouter); // all start with "/items"
app.use("/items/:id/comments", commentsRouter);

//Server start
app.listen(3000, () => {
  console.log("Server has started.");
});
