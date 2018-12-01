class Cat extends Entity {
  constructor()
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
