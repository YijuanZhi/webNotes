// requiring npm packages
let express = require("express");
let bodyparser = require("body-parser");
let session = require("express-session");
let passport = require("passport");
let localStrategy = require("passport-local");

// requiring and use routes
let commentsRouter = require("./routes/comments");
let indexRouter = require("./routes/index");
let itemsRouter = require("./routes/items");
app.use("/items/:id/comments", commentsRouter);
app.use(indexRouter);
app.use("/items", itemsRouter); // all start with "/items"

// basic app setup
let app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Authentication Setup
let User = require("./modules/user");
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

// Making currentUser available for every routes even if it is not defined
// res.locals stands for resources in res
// app.use can not use arrow function
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//Database Setup
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/photo_camp", { useNewUrlParser: true });
// clear the database and reset and database
// let seedDB = require("./seeds");
// seedDB();

//Server start
app.listen(3000, () => {
  console.log("Server has started.");
});
