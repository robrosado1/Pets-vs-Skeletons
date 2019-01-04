let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const grid = document.getElementById("grid");

class Board {
  constructor(game) {
    this.game = game;
  }
  start() {
    requestAnimationFrame(this.animate.bind(this));
  }
  animate(time) {
    this.game.step();
    requestAnimationFrame(this.animate.bind(this));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-game").addEventListener("click", () => {
    initialize();
  });
  document.getElementById("instructions").addEventListener("click", () => {
    document.getElementById("title-card").innerHTML = "What."
  });
});

function initialize() {
  const game = new Game();
  new Grid(game);
  const board = new Board(game).start();
  document.getElementById("score").style.display = "block";
  document.getElementById("title-card").style.display = "none";
}
