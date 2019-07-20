// let request = require("request");
// request("https://jsonplaceholder.typicode.com/todos", function(
//   error,
//   response,
//   body
// ) {
//   if (!error && response.statusCode == 200) {
//     eval(require("locus"));
//     //body is a string, we translate it into a json object
//     //so that we can access the data inside th e json object
//     let jsondata = JSON.parse(body);
//     console.log(jsondata);
//   } else {
//     console.log(error);
//   }
// });
let rp = require("request-promise");
rp("https://jsonplaceholder.typicode.com/todos")
  .then(htmlString => {
    let jsondata = JSON.parse(htmlString);
    console.log(jsondata);
  })
  .catch(err => {
    console.log(err);
  });
