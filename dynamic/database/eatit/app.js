let port = 3000;
let express = require("express");
let rq = require("request-promise");
let bodyparser = require("body-parser");
let app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//Database Setup
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/photo_camp", { useNewUrlParser: true });
let photoSchema = new mongoose.Schema({
  name: String,
  url: String
});
let Photo = mongoose.model("photo_camp", photoSchema);

let items = [
  {
    name: "Forest Lake",
    url:
      "https://images.unsplash.com/photo-1561454260-8559bd155736?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80"
  },
  {
    name: "Sea Doggo",
    url:
      "https://images.unsplash.com/photo-1561470678-f67882eb3fef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1959&q=80"
  },
  {
    name: "Sunset Sea",
    url:
      "https://images.unsplash.com/photo-1561485039-765c8e81686d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
  },
  {
    name: "Racing Car",
    url:
      "https://images.unsplash.com/photo-1561444533-fa0a9266bf67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
  },
  {
    name: "Forest Lake",
    url:
      "https://images.unsplash.com/photo-1561454260-8559bd155736?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80"
  },
  {
    name: "Sea Doggo",
    url:
      "https://images.unsplash.com/photo-1561470678-f67882eb3fef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1959&q=80"
  },
  {
    name: "Sunset Sea",
    url:
      "https://images.unsplash.com/photo-1561485039-765c8e81686d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
  },
  {
    name: "Racing Car",
    url:
      "https://images.unsplash.com/photo-1561444533-fa0a9266bf67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
  },
  {
    name: "Forest Lake",
    url:
      "https://images.unsplash.com/photo-1561454260-8559bd155736?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80"
  },
  {
    name: "Sea Doggo",
    url:
      "https://images.unsplash.com/photo-1561470678-f67882eb3fef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1959&q=80"
  },
  {
    name: "Sunset Sea",
    url:
      "https://images.unsplash.com/photo-1561485039-765c8e81686d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
  },
  {
    name: "Racing Car",
    url:
      "https://images.unsplash.com/photo-1561444533-fa0a9266bf67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
  }
];

// Routes=======================================================================
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/items", (req, res) => {
  Photo.find({}, (err, items) => {
    if (err) {
      console.log("Something went wrong:");
      console.log(err);
    } else {
      res.render("items", {
        items: items
      });
    }
  });
});

app.post("/items", (req, res) => {
  let newItem = {
    name: req.body.name,
    url: req.body.url
  };
  Photo.create(newItem, (err, item) => {
    if (err) {
      console.log("Something went wrong: " + err);
    } else {
      console.log("New item successfully added: ");
      console.log(item);
    }
  });
  res.redirect("items");
});

app.get("/items/new", (req, res) => {
  res.render("new");
});

app.listen(port, () => {
  console.log("Server has started.");
});
