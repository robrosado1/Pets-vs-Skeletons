class Entity {
  constructor(options) {
    this.scale = options.scale;
    this.width = options.width;
    this.height = options.height;
    this.scaledWidth = this.scale * this.width;
    this.scaledHeight = this.scale * this.height;
    this.image = new Image();
    this.image.src = options.source;
    this.pos = options.pos;
    this.game = options.game;
  }

  render(frameRow, frameCol, canvasX, canvasY) {
    ctx.drawImage(this.image, frameRow * this.width, frameCol * this.height,
      this.width, this.height, canvasX, canvasY, this.scaledWidth, this.scaledHeight);
  }

  inProximityOf(otherEntity) {
    return (this.pos[0] + 300 >= otherEntity.pos[0]) && this.latMatchWith(otherEntity);
  }

  proximityWith(otherEntity) {
    if ((this instanceof Cat && otherEntity instanceof Skeleton)
      && !otherEntity.isDead) {
        this.shootActive = true;
    } else {
      return false;
    }
  }

  collisionWith(otherEntity) {
    if (this instanceof Blast && otherEntity instanceof Skeleton) {
      this.strike = true;
      otherEntity.isDead = true;
    } else if (this instanceof Cat && otherEntity instanceof Skeleton) {
      this.isDead = true;
    } else {
      return false;
    }
  }

  didCollideWith(otherEntity) {
    const myWidth = this.width / 3;
    const otherWidth = otherEntity.width / 3;
    return this.lonMatchWith(otherEntity) && this.latMatchWith(otherEntity);
  }

  remove() {
    this.game.remove(this);
  }

  latMatchWith(otherEntity) {
    return this.pos[1] <= otherEntity.pos[1] &&
      (this.pos[1] + this.height) > otherEntity.pos[1];
  }

  lonMatchWith(otherEntity) {
    return this.pos[0] + (this.width * 0.6) >= otherEntity.pos[0] + (otherEntity.width / 3)
  }
}

// this.pos[0] + (2 * myWidth) >= (otherEntity.pos[0] + otherWidth)
