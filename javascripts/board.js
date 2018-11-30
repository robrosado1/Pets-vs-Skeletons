let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
// document.body.appendChild(canvas);

// let lastUpdate;
class Game {
  constructor() {
    this.enemies = [];
    this.pets = [];
    this.blasts = [];

    this.addEnemies();
  }

  add(entity) {
    if (entity instanceof Skeleton) {
      this.enemies.push(entity);
    } else if (entity instanceof Pet) {
      this.pets.push(entity);
    } else {
      throw new Error("unknown entity");
    }
  }

  addEnemies() {
    
  }
}

let baddies = [];
while (baddies.length < 5) {
  setTimeout(500);
  // debugger
  let skel = new Skeleton(64, 64, 1.25, "images/skeleton_monster.png",
    [0, (64 * baddies.length)]);
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
