let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let passport = require("passport");
let localStrategy = require("passport-local");
let passportLocalMongoose = require("passport-local-mongoose");
let expressSession = require("express-session");

let app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost/auth_demo", { useNewUrlParser: true });

// Authentication part
let User = require("./modules/user");
app.use(
  expressSession({
    secret: "this is a secret option",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===============================
// MAIN ROUTES
// ===============================
app.get("/", (req, res) => {
  res.render("./main/index");
});

app.get("/secret", isLoggedIn, (req, res) => {
  res.render("./main/secret");
});

// ===============================
// AUTH ROUTES
// ===============================
app.get("/register", (req, res) => {
  res.render("./auth/register");
});

// REGISTER LOGIC
app.post("/register", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.render("./auth/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          console.log(user);
          res.redirect("/secret");
        });
      }
    }
  );
});

app.get("/login", (req, res) => {
  res.render("./auth/login");
});

// LOGIN LOGIC
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
  }),
  (req, res) => {}
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

app.listen(3000, () => {
  console.log("Server has started.");
});
