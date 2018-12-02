class Game {
  constructor() {
    this.enemies = [];
    this.pets = [];
    this.blasts = [];
    this.score = 0;
    this.NUM_SKELLYS = 10;
    this.ROWS = [0, 1, 2, 3, 4].map(row => row * 64);
    this.gameOver = false;
    // this.addEnemies();
    this.time = Date.now() / 1000;
    this.addPets();
  }

  add(entity) {
    if (entity instanceof Skeleton) {
      this.enemies.push(entity);
    } else if (entity instanceof Cat) {
      this.pets.push(entity);
    } else if (entity instanceof Blast) {
      this.blasts.push(entity);
    } else {
      throw new Error("unknown entity");
    }
  }

  addEnemies() {
    if (this.enemies.length < this.NUM_SKELLYS) {
      const y = this.ROWS[Math.floor(Math.random() * 5)];
      // if (y === undefined) {
      //   this.addEnemies();
      //   return;
      // }
      this.add(new Skeleton({
        game: this,
        pos: [canvas.width, y]
      }));
    }
  }

  addBlasts(sourceEntity) {
    const x = (sourceEntity.pos[0] + (sourceEntity.width / 3));
    const y = sourceEntity.pos[1];
    this.add(new Blast({
      game: this,
      pos: [x, y + 20]
    }));
  }

  addPets(pos) {
    // if (pos.currentTarget.className === "free") {
    // }
    // for (let i = 0; i < this.ROWS.length; i++) {
    //   this.add(new Cat({
    //     pos: [-5, this.ROWS[i]],
    //     game: this
    //   }));
    // }
  }

  allEntities() {
    return [].concat(this.enemies, this.pets, this.blasts);
  }

  checkCollisions() {
    const allEntities = this.allEntities();
    for (let i = 0; i < allEntities.length; i++) {
      for (let j = 0; j < allEntities.length; j++) {
        const ent1 = allEntities[i];
        const ent2 = allEntities[j];

        if (i === j) {
          continue;
        }
        if (ent1.didCollideWith(ent2)) {
          if (ent1.collisionWith(ent2)) {
            // debugger
          };
        }
      }
    }
  }

  checkProximity() {
    const allEntities = this.allEntities();
    for (let i = 0; i < allEntities.length; i++) {
      for (let j = 0; j < allEntities.length; j++) {
        const ent1 = allEntities[i];
        const ent2 = allEntities[j];

        if (i === j) {
          continue;
        }
        if (ent1.inProximityOf(ent2)) {
          if (ent1.proximityWith(ent2)) return;
        }
      }
    }
  }

  draw() {
    // const now = Date.now() / 1000;
    // if (now - this.time >= 2) {
    //   this.addEnemies();
    //   this.time = now;
    // }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.allEntities().forEach(entity => {
      entity.draw();
    });
  }

  isOutOfBounds(pos) {
    return (pos[0] > canvas.width || pos[1] > canvas.height) ||
      (pos[0] < 0 || pos[1] < 0);
  }

  remove(entity) {
    if (entity instanceof Skeleton) {
      this.enemies.splice(this.enemies.indexOf(entity), 1);
    } else if (entity instanceof Cat) {
      // debugger
      this.pets.splice(this.pets.indexOf(entity), 1);
    } else if (entity instanceof Blast) {
      this.blasts.splice(this.blasts.indexOf(entity), 1);
    } else {
      throw new Error("unknown type of object");
    }
  }

  step() {
    document.getElementById("scoreboard").innerHTML = `Score: ${this.score}`
    this.over();
    this.checkProximity();
    this.checkCollisions();
    this.draw();
  }

  over() {
    if (this.gameOver) {
      document.getElementById("scoreboard").innerHTML = `Game Over!\nFinal Score: ${this.score}`;
      return;
    }
  }

}
