class Game {
  constructor() {
    this.enemies = [];
    this.pets = [];
    this.blasts = [];
    this.score = 250;
    this.lastScore = 250;
    this.gridSpaces = {};
    this.ROWS = [0, 1, 2, 3, 4].map(row => row * 64);
    this.over = false;
    this.time = Date.now() / 1000;
    this.streak = 0;
    document.getElementById("score").innerHTML = "SCORE: 250";
    this.addEnemies();
  }

  add(entity) {
    if (entity instanceof Skeleton || entity instanceof SkellyPlant) {
      this.enemies.push(entity);
    } else if (entity instanceof Cat) {
      this.pets.push(entity);
    } else if (entity instanceof Blast || entity instanceof Pellet) {
      this.blasts.push(entity);
    } else {
      throw new Error("unknown entity");
    }
  }

  addEnemies() {
    const y = this.ROWS[Math.floor(Math.random() * 5)];
    this.add(new Skeleton({
      game: this,
      pos: [canvas.width, y]
    }));
  }

  addBlasts(sourceEntity) {
    const x = (sourceEntity.x + (sourceEntity.width / 3));
    const y = sourceEntity.y + 20;
    this.add(new Blast({
      pos: [x, y],
      game: this
    }));
  }

  addPets(pos, key) {
    if (this.score >= 50) {
      if (pos[0] > 2) {
        console.log("Out of Bounds!");
        return;
      }
      if (this.gridSpaces[key] === undefined) {
        this.score -= 50;
        this.add(new Cat({
          pos: pos,
          game: this
        }));
        this.gridSpaces[key] = "taken";
      } else {
        console.log("This space is already taken!");
      }
    } else {
      console.log("You don't have enough points for this!");
    }
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
    if (this.score !== this.lastScore) {
      document.getElementById("score").innerHTML = `SCORE: ${this.score}`;
      this.lastScore = this.score;
    }
    const now = Date.now() / 1000;
    if (now - this.time >= this.difficulty(this.streak)) {
      this.addEnemies();
      this.time = now;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.allEntities().forEach(entity => {
      entity.draw();
    });
  }

  isOutOfBounds(pos) {
    const x = pos[0];
    const y = pos[1];
    return (x > canvas.width || y > canvas.height) ||
      (x < 0 || y < 0);
  }

  remove(entity) {
    if (entity instanceof Skeleton || entity instanceof SkellyPlant) {
      this.enemies.splice(this.enemies.indexOf(entity), 1);
    } else if (entity instanceof Cat) {

      const key = entity.pos.join();
      this.pets.splice(this.pets.indexOf(entity), 1);
      this.gridSpaces[key] = undefined;
    } else if (entity instanceof Blast || entity instanceof Pellet) {
      this.blasts.splice(this.blasts.indexOf(entity), 1);
    } else {
      throw new Error("unknown type of object");
    }
  }

  step() {
    this.endGame();
    this.checkProximity();
    this.checkCollisions();
    this.draw();
  }

  endGame() {
    if (this.over) {
      this.blasts = [];
      this.pets = [];
      document.getElementById("score").style.display = "none";
      document.getElementById('game-over-message').style.display = "flex";
      document.getElementById('game-over-overlay').style.display = "block";
      document.getElementById("game-over-score").innerHTML = `Your score was ${this.score} points!`
      this.over = false;
      document.getElementById('play-again').addEventListener("click", () => {
        location.reload();
      });
    }
  }

  difficulty(streak) {
    if (streak < 5) {
      return 5;
    } else if (streak < 10) {
      return 4;
    } else if (streak < 15) {
      return 3;
    } else if (streak < 20) {
      return 2;
    } else if (streak < 25) {
      return 1;
    } else {
      return 0.8;
    }
  }
}
