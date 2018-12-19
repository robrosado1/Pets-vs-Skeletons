class Pellet extends Entity {
  constructor(options) {
    options.source = './images/skeleton_plant(64x64)[effect 50x50].png';
    options.width = 32;
    options.height = 30;
    options.scale = 1;
    super(options);
    this.x = this.pos[0] - 10;
    this.y = this.pos[1] + 40;
    this.health = 10;
    this.frameCount = 0;
    this.fireCycle = [0,1,2];
    this.strikeCycle = [3,4,5];
    this.currFrameIndex = 0;
    this.startPos = this.x;
    this.speed = 2;
    this.strike = false;
    this.damage = 2;
  }

  draw() {
    if (this.strike) {
      this.hit();
    } else {
      this.fire();
    }
  }

  fire() {
    if (Math.abs(this.x - this.startPos) >= 300) {
      this.remove();
    }

    this.frameCount++;
    this.x -= this.speed;

    if (this.frameCount < 10) {
      this.render(this.fireCycle[this.currFrameIndex], 11, this.x, this.y);
      return;
    }
    this.frameCount = 0;
    this.render(this.fireCycle[this.currFrameIndex], 11, this.x, this.y);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.fireCycle.length) {
      this.currFrameIndex = 0;
    }

    if (this.x <= -30) {
      this.remove();
    }
  }

  hit() {
    this.frameCount++;
    this.damage = 0;

    if (this.frameCount < 10) {
      this.render(this.strikeCycle[this.currFrameIndex], 11, this.x, this.y);
      return;
    }
    this.frameCount = 0;
    this.render(this.strikeCycle[this.currFrameIndex], 11, this.x, this.y);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.strikeCycle.length) {
      this.remove();
    }
  }
}
