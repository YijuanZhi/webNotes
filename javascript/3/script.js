let msgDisplay = document.getElementById("msg");
let msgGoal = document.getElementById("goal");
let squares = document.querySelectorAll(".square");
let btns = document.getElementsByTagName("button");
let nav = document.getElementById("nav");
let colornum = 6; //Total number of colors default as 6
let gameover = false;
let bgColor = "rgb(54, 54, 54)";
let colors = [];
let target = "";
resetGame(colornum);

//===============================button events area===============================
//New game button(play again) => reset
btns[0].addEventListener("click", () => {
  resetGame(colornum);
});

//Easy button => 3 colors, and set other squares as bgColor
btns[1].addEventListener("click", () => {
  colornum = 3;
  resetGame(colornum);
  for (let i = 3; i < 6; ++i) {
    squares[i].style.backgroundColor = bgColor;
  }
});

//Hard button => 6 colors
btns[2].addEventListener("click", () => {
  colornum = 6;
  resetGame(colornum);
});

//===============================helper functions area===============================
function generateColor() {
  //generates unit color from 0 to 255
  return Math.floor(256 * Math.random());
}

function generateColors(cn) {
  //generate number of cn colors
  let ret = [];
  for (let i = 0; i < cn; ++i) {
    let c1 = generateColor();
    let c2 = generateColor();
    let c3 = generateColor();
    let rgb = "rgb(" + c1 + ", " + c2 + ", " + c3 + " )";
    ret.push(rgb);
  }
  return ret;
}

function resetGame(cn) {
  nav.style.backgroundColor = "#4ec0fc";
  colors = generateColors(cn);
  target = colors[Math.floor(Math.random() * cn)];
  msgGoal.textContent = target;
  msgDisplay.textContent = "GUESS!";
  gameover = false;
  for (let i = 0; i < squares.length; ++i) {
    //asignin colors to squares
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", () => {
      if (gameover) return;
      else {
        if (target === colors[i]) {
          msgDisplay.textContent = "Correct!";
          gameover = true;
          for (let j = 0; j < colornum; ++j) {
            squares[j].style.backgroundColor = target;
          }
          nav.style.backgroundColor = target;
        } else {
          msgDisplay.textContent = "Keep on trying!";
          squares[i].style.backgroundColor = bgColor;
        }
      }
    });
  }
}
