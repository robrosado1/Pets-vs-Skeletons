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
    return (this.x + 300 >= otherEntity.x) && this.latMatchWith(otherEntity);
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
      otherEntity.health -= this.damage;
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
    const rowCenterLine = ((this.y / 64) * 64) + 32;
    return (this.y < rowCenterLine &&
      (this.y + this.height > rowCenterLine )) &&
      (otherEntity.y < rowCenterLine &&
      (otherEntity.y + otherEntity.height > rowCenterLine));

  }

  lonMatchWith(otherEntity) {
    return this.x + (this.width * 0.6) >= otherEntity.x + (otherEntity.width / 3)
  }
}
