class Blast extends Entity {
  constructor(options) {
    options.source = './images/energy_ball.png';
    options.width = 64;
    options.height = 64;
    options.scale = 1;
    super(options);
    this.health = 10;
    this.frameCount = 0;
    this.fireCycle = [4,5,6,7];
    this.strikeCycle = [4,5,6];
    this.currFrameIndex = 0;
    this.startPos = this.pos[0];
    this.speed = 2;
    this.strike = false;
    this.damage = 3;
  }

  draw() {
    if (this.strike) {
      this.hit();
    } else {
      this.fire();
    }
  }

  fire() {
    if (this.pos[0] - this.startPos >= 300) {
      this.remove();
    }

    this.frameCount++;
    this.pos[0] += this.speed;

    if (this.frameCount < 10) {
      this.render(this.fireCycle[this.currFrameIndex], 0, this.pos[0], this.pos[1]);
      return;
    }
    this.frameCount = 0;
    this.render(this.fireCycle[this.currFrameIndex], 0, this.pos[0], this.pos[1]);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.fireCycle.length) {
      this.currFrameIndex = 0;
    }

    if (this.pos[0] >= canvas.width) {
      this.remove();
    }
  }

  hit() {
    this.frameCount++;
    this.damage = 0;

    if (this.frameCount < 5) {
      this.render(this.strikeCycle[this.currFrameIndex], 2, this.pos[0], this.pos[1]);
      return;
    }
    this.frameCount = 0;
    this.render(this.strikeCycle[this.currFrameIndex], 2, this.pos[0], this.pos[1]);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.strikeCycle.length) {
      this.remove();
    }
  }
}
