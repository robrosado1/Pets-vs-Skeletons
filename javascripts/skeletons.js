
class Skeleton extends Entity {
  constructor(options) {
    options.source = './images/skeleton_monster.png';
    options.width = 64;
    options.height = 64;
    options.scale = 1.25;
    super(options);
    this.health = 10;
    this.frameCount = 0;
    this.walkCycle = [0,1,2,3];
    this.deathCycle = [0, 1, 2, 3, 4, 5, 6, 7];
    this.currFrameIndex = 0;
    this.speed = 5;
    this.isDead = false;
  }

  draw() {
    if (this.isDead) {
      this.death();
    } else {
      this.walk();
    }
  }

  walk() {
    this.frameCount++;

    if (this.frameCount < 10) {
      this.render(this.walkCycle[this.currFrameIndex], 1, this.pos[0], this.pos[1]);
      return;
    }
    this.frameCount = 0;
    this.pos[0] -= this.speed;
    this.render(this.walkCycle[this.currFrameIndex], 1, this.pos[0], this.pos[1]);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.walkCycle.length) {
      this.currFrameIndex = 0;
    }

    if (this.pos[0] < -(this.width)) {
      this.remove();
    }
  }

  death() {
    this.frameCount++;

    if (this.frameCount < 10) {
      this.render(this.deathCycle[this.currFrameIndex], 3, this.pos[0], this.pos[1]);
      return;
    }

    this.frameCount = 0;
    this.render(this.deathCycle[this.currFrameIndex], 3, this.pos[0], this.pos[1]);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.deathCycle.length) {
      this.remove();
    }
  }
}
