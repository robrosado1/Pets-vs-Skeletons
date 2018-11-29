function Skeleton() {

  skeleton.src = "images/skeleton_monster.png";

  const scale = 1.25;
  const width = 64;
  const height = 64;
  const scaledWidth = scale * width;
  const scaledHeight = scale * height;

  function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(skeleton, frameX * width, frameY * height, width, height,
      canvasX, canvasY, scaledWidth, scaledHeight);
  }

  const stepCycle = [0, 1, 2, 3];
  const deathCycle = [0, 1, 2, 3, 4, 5, 6, 7]
  let currStepIndex = 0;
  let currDeathIndex = 0;
  let frameCount = 0;
  let dx = 5;

  let x = 0;
  function step() {
    frameCount++;
    if (frameCount < 15) {
      window.requestAnimationFrame(step);
      return;
    }
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(stepCycle[currStepIndex], 1, x, 0);
    // drawFrame(stepCycle[currStepIndex], 2, 0, 64);
    // drawFrame(deathCycle[currDeathIndex], 3, 0, 128);
    // drawFrame(stepCycle[currStepIndex], 0, 0, 192);
    // drawFrame(deathCycle[currDeathIndex], 5, 0, 256);
    currStepIndex++;
    currDeathIndex++;
    if (x <= canvas.width - 64) {
      x += dx;
    }
    if (currStepIndex >= stepCycle.length) {
      currStepIndex = 0;
    }
    if (currDeathIndex >= deathCycle.length) {
      currDeathIndex = 0;
    }
    window.requestAnimationFrame(step);
  }
}

export default Skeleton;
