// var btn = document.querySelector("button");
// var bool = true;
// var bg = document.querySelector("body");
// function changebg() {
//   if (bool) {
//     bg.style.background = "blue";
//   } else {
//     bg.style.background = "white";
//   }
//   bool = !bool;
// }
// function clickAlert() {
//   alert("Clicked!");
// }
// btn.addEventListener("click", changebg);

//toggle way to change background color
let btn = document.querySelector("button");
function toggleBg() {
  document.body.classList.toggle("purple");
}

btn.addEventListener("click", toggleBg);
