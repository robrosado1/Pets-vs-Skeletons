
class Skeleton extends Entity {
  constructor(options) {
    super(options);
    this.health = 10;
    this.frameCount = 0;
    this.walkCycle = [0,1,2,3];
    this.deathCycle = [0, 1, 2, 3, 4, 5, 6, 7];
    this.currFrameIndex = 0;
    this.speed = 5;
  }

  walk() {
    this.frameCount++;
    if (this.frameCount < 15) {
      window.requestAnimationFrame(this.walk.bind(this));
      return;
    }
    this.frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.draw(this.walkCycle[this.currFrameIndex], 1, this.pos[0], 0);
    this.currFrameIndex++;

    if(this.pos[0] >= canvas.width - this.width) {
      this.speed = 0;
      window.requestAnimationFrame(this.death.bind(this));
      return;
    }
    this.pos[0] += this.speed;
    if (this.currFrameIndex >= this.walkCycle.length) {
      this.currFrameIndex = 0;
    }
    window.requestAnimationFrame(this.walk.bind(this));
  }

  death() {
    this.frameCount++;
    if (this.frameCount < 10) {
      window.requestAnimationFrame(this.death.bind(this));
      return;
    }
    this.frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.draw(this.deathCycle[this.currFrameIndex], 3, this.pos[0], 0);
    this.currFrameIndex++;

    if (this.currFrameIndex >= this.deathCycle.length) {

    }
    window.requestAnimationFrame(this.death.bind(this));
  }
}


// step() {
  //   frameCount++;
  //   if (frameCount < 15) {
    //     window.requestAnimationFrame(step);
    //     return;
    //   }
    //   frameCount = 0;
    // }

// function Skeleton() {
//
//   skeleton.src = "images/skeleton_monster.png";
//
//   const scale = 1.25;
//   const width = 64;
//   const height = 64;
//   const scaledWidth = scale * width;
//   const scaledHeight = scale * height;
//
//
//
//   const stepCycle = [0, 1, 2, 3];
//   const deathCycle = [0, 1, 2, 3, 4, 5, 6, 7];
//   let currFrameIndex = 0;
//   let currDeathIndex = 0;
//   let frameCount = 0;
//   let dx = 5;
//
//   let x = 0;
//   function step() {
//     frameCount++;
//     if (frameCount < 15) {
//       window.requestAnimationFrame(step);
//       return;
//     }
//     frameCount = 0;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawFrame(stepCycle[currStepIndex], 1, x, 0);
//     // drawFrame(stepCycle[currStepIndex], 2, 0, 64);
//     // drawFrame(deathCycle[currDeathIndex], 3, 0, 128);
//     // drawFrame(stepCycle[currStepIndex], 0, 0, 192);
//     // drawFrame(deathCycle[currDeathIndex], 5, 0, 256);
//     currStepIndex++;
//     currDeathIndex++;
//     if (x <= canvas.width - 64) {
//       x += dx;
//     }
//     if (currStepIndex >= stepCycle.length) {
//       currStepIndex = 0;
//     }
//     if (currDeathIndex >= deathCycle.length) {
//       currDeathIndex = 0;
//     }
//     window.requestAnimationFrame(step);
//   }
// }
