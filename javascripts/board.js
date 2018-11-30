let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
// document.body.appendChild(canvas);

// let lastUpdate;
function gameLoop() {
  window.requestAnimationFrame(main);
}

let baddies = [];
while (baddies.length < 5) {
  setTimeout(500);
  // debugger
  let skel = new Skeleton(64, 64, 1.25, "images/skeleton_monster.png",
    [0, (64 * baddies.length)]);
  debugger
  baddies.push(skel);
}


function main() {
  baddies.forEach(skelly => {
    window.requestAnimationFrame(skelly.walk.bind(skelly));
  });
  return;
}

document.addEventListener("DOMContentLoaded", () => {
  gameLoop();
});
