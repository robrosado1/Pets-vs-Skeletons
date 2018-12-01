class Blast extends Entity{
  constructor(options) {
    options.source = './images/energy_ball.png';
    options.width = 64;
    options.height = 64;
    options.scale = 1;
    super(options);
    this.health = 10;
    this.frameCount = 0;
    this.floatCycle = [4,5,6,7];
    this.currFrameIndex = 0;
    this.speed = 5;
  }

  draw() {
    this.float();
  }

  float() {
    this.frameCount++;

    if (this.frameCount < 10) {
      this.render(this.floatCycle[this.currFrameIndex], 0, this.pos[0], this.pos[1]);
      return;
    }
    this.frameCount = 0;
    // this.pos[0] += this.speed;
    this.render(this.floatCycle[this.currFrameIndex], 0, this.pos[0], this.pos[1]);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.floatCycle.length) {
      this.currFrameIndex = 0;
    }

    if (this.pos[0] >= canvas.width) {
      this.remove()
    }
  }
}
