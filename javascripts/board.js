let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const grid = document.getElementById("grid");
const title = document.getElementById("title-card");

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
  startup();
});

function initialize() {
  const game = new Game();
  new Grid(game);
  const board = new Board(game).start();
  document.getElementById("score").style.display = "block";
  title.style.display = "none";
}

function startup() {
  document.getElementById("start-game").addEventListener("click", () => {
    initialize();
  });
  document.getElementById("learn").addEventListener("click", () => {
    const tc = title.innerHTML;
    title.innerHTML = "";
    document.getElementById("instructions").style.display = "block";
    document.getElementById("back").addEventListener("click", () => {
      document.getElementById("instructions").style.display = "none";
      title.innerHTML = tc;
      startup();
    });
  });
}
