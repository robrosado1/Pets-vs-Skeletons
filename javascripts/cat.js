class Cat extends Entity {
  constructor(options) {
    options.source = './images/pet_cat.png';
    options.width = 64;
    options.height = 64;
    options.scale = 1.25;
    super(options);
    this.health = 10;
    this.frameCount = 0;
    this.idleCycle = [0,1,2,3];
    this.deathCycle = [0,1,2,3,4,5,6];
    this.shootCycle = [0,1,2,3,4,5,6];
    this.currFrameIndex = 0;
    this.speed = 5;
    this.isDead = false;
    this.shootActive = false;
  }

  draw() {
    if (this.isDead) {
      this.death();
    } else if (this.shootActive) {
      this.shoot();
    } else {
      this.idle();
    }
  }

  idle() {
    this.frameCount++;

    if (this.frameCount < 10) {
      this.render(this.idleCycle[this.currFrameIndex], 0, this.pos[0], this.pos[1]);
      return;
    }
    this.frameCount = 0;
    this.render(this.idleCycle[this.currFrameIndex], 0, this.pos[0], this.pos[1]);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.idleCycle.length) {
      this.currFrameIndex = 0;
    }
  }

  shoot() {
    this.frameCount++;

    if (this.frameCount < 10) {
      this.render(this.shootCycle[this.currFrameIndex], 5, this.pos[0], this.pos[1]);
      return;
    }
    this.frameCount = 0;
    this.render(this.shootCycle[this.currFrameIndex], 5, this.pos[0], this.pos[1]);
    this.currFrameIndex++;

    if (this.currFrameIndex === 5) {
      this.game.addBlasts(this);
    }

    if (this.currFrameIndex >= this.shootCycle.length) {
      this.shootActive = false;
      this.currFrameIndex = 0;
      return;
    }
  }

  death() {
    this.frameCount++;

    if (this.frameCount < 10) {
      this.render(this.deathCycle[this.currFrameIndex], 4, this.pos[0], this.pos[1]);
      return;
    }

    this.frameCount = 0;
    this.render(this.deathCycle[this.currFrameIndex], 4, this.pos[0], this.pos[1]);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.deathCycle.length) {
      this.currFrameIndex = 0;
      this.remove();
    }
  }
}
