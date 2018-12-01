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
    this.dead = false;
    this.shootActive = false;
  }

  draw() {
    if (this.dead) {
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

// let cat = new Image();
//
// cat.src = "images/pet_cat.png";
//
// const scale = 1.25;
// const width = 64;
// const height = 64;
// const scaledWidth = scale * width;
// const scaledHeight = scale * height;
//
// function drawFrame(frameX, frameY, canvasX, canvasY) {
//   ctx.drawImage(cat, frameX * width, frameY * height, width, height,
//     canvasX, canvasY, scaledWidth, scaledHeight);
// }
//
// let shootActive = false;
//
// function keyDownHandler(e) {
//   if (e.keyCode == 32) {
//     shootActive = true;
//   }
// }
//
// const stepCycle = [0, 1];
// const shootCycle = [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 1, 0];
// let currStepIndex = 0;
// let currShootIndex = 0;
// let frameCount = 0;
//
// function step() {
//   if (shootActive) {
//     shootActive = false;
//     window.requestAnimationFrame(shoot);
//     return;
//   }
//   frameCount++;
//   if (frameCount < 30) {
//     window.requestAnimationFrame(step);
//     return;
//   }
//   frameCount = 0;
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawFrame(stepCycle[currStepIndex], 2, 0, 128);
//   currStepIndex++;
//   if (currStepIndex >= stepCycle.length) {
//     currStepIndex = 0;
//   }
//   window.requestAnimationFrame(step);
// }
//
// function shoot() {
//   frameCount++;
//   if (frameCount < 15) {
//     return window.requestAnimationFrame(shoot);
//   }
//   frameCount = 0
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawFrame(shootCycle[currShootIndex], 2, 0, 128);
//   currShootIndex++;
//   if (currShootIndex >= shootCycle.length) {
//     currShootIndex = 0;
//     window.requestAnimationFrame(step);
//     return;
//   }
//   window.requestAnimationFrame(shoot);
// }
//
// function init() {
//   window.requestAnimationFrame(shoot);
// }
