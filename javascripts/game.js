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
    for (let i = 0; i < Game.NUM_SKELLYS; i++) {
      this.add(new Skeleton({ game: this }));
    }
  }

  addPets() {
    const pet = new Pet({
      pos: [0,0],
      game: this
    });
    this.add(pet);
    return pet;
  }

  allEntities() {
    return [].concat(this.enemies, this.pets, this.blasts);
  }

  checkCollisions() {
    const allEntities = this.allEntities;
    for (let i = 0; i < allEntities.length; i++) {
      for (let j = 0; j < allEntities.length; j++) {
        const ent1 = allEntities[i];
        const ent2 = allEntities[j];

        if (i == j) {
          continue;
        }
        if (ent1.didCollideWith(ent2))
          if (ent1.collisionWith(ent2)) return;
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.allEntities().forEach( entitiy => {
      entity.draw(ctx);
    });
  }

  isOutOfBounds(pos) {
    return (pos[0] > canvas.width || pos[1] > canvas.height) ||
      (pos[0] < 0 || pos[1] < 0);
  }

  remove(entity) {
    if (entity instanceof Skeleton) {
      this.enemies.splice(this.enemies.indexOf(entity), 1);
    } else if (entity instanceof Pet) {
      this.pets.splice(this.pets.indexOf(entity), 1);
    } else {
      throw new Error("unknown type of object");
    }
  }

  step() {
    this.draw();
  }

}
