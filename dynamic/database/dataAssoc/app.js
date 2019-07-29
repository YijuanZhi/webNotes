let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/assoc_demo", { useNewUrlParser: true });
let User = require("./modules/user");
let Post = require("./modules/post");

// Creating newuser and newpost
// let newPost = new Post({
//   title: "My First Post Ever!!!",
//   content: "basdfnasdfdslaflsljeovnonon"
// });
// let newUser = new User({
//   email: "newboi@gmail.com",
//   name: "Your Boi"
// });
// newUser.posts.push(newPost);

// newUser.posts.push(newPost);

// newUser.save(function(err, user) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });
// let newUser2 = new User({
//   name: "New Boi",
//   email: "newboi@gmail.com"
// });
// newUser2.save((err, user) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

// create and save the new post id into the posts array inside the user
// Post.create(
//   {
//     title: "New post by our New Boi",
//     content: "dsajfkadsjlflsadjfldsajlkfdksl"
//   },
//   (err, post) => {
//     User.findOne({ name: "New Boi" }, (err, user) => {
//       // Directly push the new post object, they will handle the rest
//       user.posts.push(post);
//       user.save((err, user) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("successfully save an new post id to the user");
//           console.log(user);
//         }
//       });
//     });
//   }
// );
User.findOne({ name: "New Boi" })
  .populate("posts")
  .exec((err, user) => {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
    }
  });
