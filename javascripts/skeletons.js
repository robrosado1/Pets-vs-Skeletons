
class Skeleton extends Entity {
  constructor(options) {
    options.source = './images/skeleton_monster.png';
    options.width = 64;
    options.height = 64;
    options.scale = 1.25;
    super(options);
    this.x = this.pos[0];
    this.y = this.pos[1];
    this.health = 10;
    this.frameCount = 0;
    this.walkCycle = [0,1,2,3];
    this.deathCycle = [0, 1, 2, 3, 4, 5, 6, 7];
    this.currFrameIndex = 0;
    this.speed = 5;
  }

  draw() {
    if (this.health < 1) {
      this.death();
    } else {
      this.walk();
    }
  }

  walk() {
    this.frameCount++;

    if (this.frameCount < 10) {
      this.render(this.walkCycle[this.currFrameIndex], 1, this.x, this.y);
      return;
    }
    this.frameCount = 0;
    this.x -= this.speed;
    this.render(this.walkCycle[this.currFrameIndex], 1, this.x, this.y);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.walkCycle.length) {
      this.currFrameIndex = 0;
    }

    if (this.x < -(this.width)) {
      this.remove();
      this.game.gameOver = true;
    }
  }

  death() {
    this.frameCount++;

    if (this.frameCount < 10) {
      this.render(this.deathCycle[this.currFrameIndex], 3, this.x, this.y);
      return;
    }

    this.frameCount = 0;
    this.render(this.deathCycle[this.currFrameIndex], 3, this.x, this.y);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.deathCycle.length) {
      this.game.score += 10;
      this.remove();
    }
  }
}
