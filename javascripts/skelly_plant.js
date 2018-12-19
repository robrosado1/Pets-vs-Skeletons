class SkellyPlant extends Entity {
  constructor(options) {
    options.source = './images/skeleton_plant(64x64)[effect 50x50].png';
    options.width = 64;
    options.height = 64;
    options.scale = 1;
    super(options);
    this.x = this.pos[0];
    this.y = this.pos[1] + 10;
    this.health = 10;
    this.frameCount = 0;
    this.idleCycle = [0,1,2,3];
    this.deathCycle = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.spawnCycle = [7, 6, 5, 4, 3, 2, 1, 0];
    this.currFrameIndex = 0;
    this.spawning = true;
  }

  draw() {
    if (this.spawning) {
      this.spawn();
    } else if (this.health < 1) {
      this.death();
    } else {
      this.idle();
    }
  }

  spawn() {
    this.frameCount++;

    if (this.frameCount < 6) {
      this.render(this.spawnCycle[this.currFrameIndex], 4, this.x, this.y);
      return;
    }
    this.frameCount = 0;
    this.render(this.spawnCycle[this.currFrameIndex], 4, this.x, this.y);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.spawnCycle.length) {
      this.currFrameIndex = 0;
      this.spawning = false;
    }
  }

  idle() {
    this.frameCount++;

    if (this.frameCount < 20) {
      this.render(this.idleCycle[this.currFrameIndex], 0, this.x, this.y);
      return;
    }
    this.frameCount = 0;
    this.render(this.idleCycle[this.currFrameIndex], 0, this.x, this.y);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.idleCycle.length) {
      this.currFrameIndex = 0;
    }
  }

  death() {
    this.frameCount++;

    if (this.frameCount < 20) {
      this.render(this.deathCycle[this.currFrameIndex], 4, this.x, this.y);
      return;
    }

    this.frameCount = 0;
    this.render(this.deathCycle[this.currFrameIndex], 4, this.x, this.y);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.deathCycle.length) {
      this.remove();
      this.game.score += 10;
      this.game.streak += 1;
    }
  }
}
