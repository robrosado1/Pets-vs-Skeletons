class Blast extends Entity {
  constructor(options) {
    options.source = './images/energy_ball.png';
    options.width = 64;
    options.height = 64;
    options.scale = 1;
    super(options);
    this.x = this.pos[0];
    this.y = this.pos[1];
    this.health = 10;
    this.frameCount = 0;
    this.flyCycle = [4,5,6,7];
    this.strikeCycle = [4,5,6];
    this.currFrameIndex = 0;
    this.startPos = this.x;
    this.speed = 2;
    this.struck = false;
    this.exploding = false;
    this.damage = 3;
  }

  draw() {
    if (this.struck) {
      this.exploding = true;
      this.hit();
    } else {
      this.fly();
    }
  }

  fly() {
    if (this.x - this.startPos >= 300) {
      this.remove();
    }

    this.frameCount++;
    this.x += this.speed;

    if (this.frameCount < 10) {
      this.render(this.flyCycle[this.currFrameIndex], 0, this.x, this.y);
      return;
    }
    this.frameCount = 0;
    this.render(this.flyCycle[this.currFrameIndex], 0, this.x, this.y);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.flyCycle.length) {
      this.currFrameIndex = 0;
    }

    if (this.x >= canvas.width) {
      this.remove();
    }
  }

  hit() {
    this.frameCount++;
    this.damage = 0;

    if (this.frameCount < 5) {
      this.render(this.strikeCycle[this.currFrameIndex], 2, this.x, this.y);
      return;
    }
    this.frameCount = 0;
    this.render(this.strikeCycle[this.currFrameIndex], 2, this.x, this.y);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.strikeCycle.length) {
      this.remove();
    }
  }
}
