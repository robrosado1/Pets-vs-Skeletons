let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

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
canvas.addEventListener("click", e => {
  console.log(`X: ${e.clientX}`);
  console.log(`Y: ${e.clientY}`);
})

document.addEventListener("DOMContentLoaded", () => {

  const game = new Game();
  new Board(game).start();

});
