let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const grid = document.getElementById("grid");

class Board {
  constructor(game, context) {
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
  const game = new Game();
  new Grid(game);
  new Board(game).start();

});
