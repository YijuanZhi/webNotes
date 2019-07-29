let mongoose = require("mongoose");
let Photo = require("./modules/photo.js");
let Comment = require("./modules/comment.js");

let data = [
  {
    name: "Sea Doggo",
    url:
      "data:image/jpeg;base64,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",
    description: "Owmayiwa mo xinmdalu."
  },
  {
    name: "Dark Forest",
    url:
      "https://images.unsplash.com/photo-1562627952-f52a76c3c823?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    description:
      "This is a dark forest where plenty treasures are yet to be found."
  },
  {
    name: "Race Car",
    url:
      "https://images.unsplash.com/photo-1562906099-ee419af0874f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    description: "This is my car, don't ever touch it. Thank you."
  },
  {
    name: "Ice Forest",
    url:
      "https://images.unsplash.com/photo-1562889787-86c93f43e52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    description: "Winter has come. Yall be dead."
  }
];

function seekDB() {
  Photo.remove((err, photos) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Delete all the photos:");
      console.log(photos);
      data.forEach(item => {
        Photo.create(item, (err, item) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Create a new photo:");
            console.log(item);
            Comment.create(
              {
                author: "Eddy",
                text:
                  "This picture is awesome! I just made it as my desktop wallpaper!"
              },
              (err, comment) => {
                if (err) {
                  console.log(err);
                } else {
                  item.comments.push(comment);
                  item.save();
                }
              }
            );
          }
        });
      });
    }
  });
}

module.exports = seekDB;
