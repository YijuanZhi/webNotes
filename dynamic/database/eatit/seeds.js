let mongoose = require("mongoose");
let Photo = require("./modules/photo.js");
let Comment = require("./modules/comment.js");

let data = [
  {
    name: "Sea Doggo",
    url:
      "https://images.unsplash.com/photo-1561470678-f67882eb3fef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    name: "Dark Forest",
    url:
      "https://images.unsplash.com/photo-1562627952-f52a76c3c823?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    name: "Race Car",
    url:
      "https://images.unsplash.com/photo-1561444533-fa0a9266bf67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    name: "Ice Forest",
    url:
      "https://images.unsplash.com/photo-1562889787-86c93f43e52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }
];

function seekDB() {
  Photo.remove((err, photos) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Delete all the photos:");
      console.log(photos);
      // data.forEach(item => {
      //   Photo.create(item, (err, item) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       console.log("Create a new photo:");
      //       console.log(item);
      //       Comment.create(
      //         {
      //           author: "Yorick Dan",
      //           text:
      //             "This picture is awesome! I just made it as my desktop wallpaper!"
      //         },
      //         (err, comment) => {
      //           if (err) {
      //             console.log(err);
      //           } else {
      //             item.comments.push(comment);
      //             item.save();
      //           }
      //         }
      //       );
      //     }
      //   });
      // });
    }
  });
}

module.exports = seekDB;
