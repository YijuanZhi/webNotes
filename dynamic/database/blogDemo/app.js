let port = 3000;
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let methodOverride = require("method-override");
let app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/blog_app", { useNewUrlParser: true });
let blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});
let Blog = mongoose.model("post", blogSchema);

//RESTFULL routes
// 1. INDEX Route
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

// 2. NEW Route
app.get("/blogs/new", (req, res) => {
  res.render("new");
});

// 3. CREATE Route
app.post("/blogs", (req, res) => {
  let blog = req.body.blog;
  Blog.create(
    {
      title: blog.title,
      image: blog.image,
      body: blog.body
    },
    (err, blog) => {
      if (err) {
        console.log(err);
      } else {
        console.log("You just add an new blog post:");
        console.log(blog);
        res.redirect("/blogs");
      }
    }
  );
});

// 4. SHOW Route
app.get("/blogs/:id", (req, res) => {
  let id = req.params.id;
  Blog.findById(id, (err, blog) => {
    if (err) {
      res.render("Your requested page is not found!");
    } else {
      res.render("show", { blog: blog });
    }
  });
});

// 5. EDIT Route
app.get("/blogs/:id/edit", (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      res.render("Can not find the requested blog page.");
    } else {
      res.render("edit", { blog: blog });
    }
  });
});

// 6. UPDATE Route
app.put("/blogs/:id", (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blog) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
  // res.send("Updated page!");
});

// 7. DELETE Route
app.delete("/blogs/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id, (err, deletedBlog) => {
    if (err) {
      console.log(err);
    } else {
      console.log(deletedBlog);
      res.redirect("/blogs");
    }
  });
});

app.listen(port, () => {
  console.log("Server has started.");
});
