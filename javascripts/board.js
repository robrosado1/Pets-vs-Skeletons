let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

class Board {
  constructor(game, context) {
    this.game = game;
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDiff = time - this.lastTime;

    this.game.step(timeDiff);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

document.addEventListener("DOMContentLoaded", () => {

  const game = new Game();
  new Board(game).start();

});
