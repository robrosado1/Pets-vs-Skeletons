class Game {
  constructor() {
    this.enemies = [];
    this.pets = [];
    this.blasts = [];
    this.NUM_SKELLYS = 10;
    this.SKELLY_ROWS = [0, 1, 2, 3, 4].map(row => row * 64);

    this.addEnemies();
    this.time = Date.now() / 1000;
    this.addBlasts();
  }

  add(entity) {
    if (entity instanceof Skeleton) {
      this.enemies.push(entity);
    // } else if (entity instanceof Pet) {
    //   this.pets.push(entity);
    } else if (entity instanceof Blast) {
      this.blasts.push(entity);
    } else {
      throw new Error("unknown entity");
    }
  }

  addEnemies() {
    if (this.enemies.length < this.NUM_SKELLYS) {
      const y = this.SKELLY_ROWS[Math.floor(Math.random() * 6)];
      if (y === undefined) {
        this.addEnemies();
        return;
      }
      this.add(new Skeleton({
        game: this,
        pos: [canvas.width, y]
      }));
    }
  }

  addBlasts() {
    this.add(new Blast({
      game: this,
      pos: [this.SKELLY_ROWS[3] + 10, this.SKELLY_ROWS[2] + 20]
    }));
  }

  addPets() {
    // const pet = new Pet({
    //   pos: [0,0],
    //   game: this
    // });
    // this.add(pet);
    // return pet;
  }

  allEntities() {
    return [].concat(this.enemies, this.pets, this.blasts);
  }

  checkCollisions() {
    const allEntities = this.allEntities();
    // console.log(allEntities);
    // debugger
    for (let i = 0; i < allEntities.length; i++) {
      for (let j = 0; j < allEntities.length; j++) {
        const ent1 = allEntities[i];
        const ent2 = allEntities[j];

        if (i === j) {
          continue;
        }
        if (ent1.didCollideWith(ent2)) {
          if (ent1.collisionWith(ent2)) return;
        }
      }
    }
  }

  draw() {
    const now = Date.now() / 1000;
    if (now - this.time >= 2) {
      this.addEnemies();
      this.time = now;
    }
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
      // debugger
      this.enemies.splice(this.enemies.indexOf(entity), 1);
      // debugger
    // } else if (entity instanceof Pet) {
    //   this.pets.splice(this.pets.indexOf(entity), 1);
    } else {
      throw new Error("unknown type of object");
    }
  }

  step() {
    this.checkCollisions();
    this.draw();
  }

}
