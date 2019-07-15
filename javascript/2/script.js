let btns = document.getElementsByTagName("button");
let numInput = document.querySelector("input[type='Number']");
let p1 = 0;
let p2 = 0;
let max = 5;
let to = " to ";
//when p1 wins: btn1
btns[0].addEventListener("click", () => {
  p1++;
  //   if( p1 == 5){
  //       document.querySelector("")
  //   }
  document.querySelector("h1").textContent = p1 + to + p2;
});
//when p2 wins
btns[1].addEventListener("click", () => {
  p2++;
  document.querySelector("h1").textContent = p1 + to + p2;
});
//when reset data
btns[2].addEventListener("click", () => {
  p1 = 0;
  p2 = 0;
  document.querySelector("h1").textContent = p1 + to + p2;
});
//When user change the winning points
numInput.addEventListener("change", () => {
  //the value of input number(string)
  let num = numInput.value;
  max = Number(num);
  alert(max + 1);
});
