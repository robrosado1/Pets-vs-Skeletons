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

  collisionWith(entity) {

  }

  didCollideWith(otherObject) {
    return this.pos[1] === otherObject.pos[1] && (this.pos[0] + this.width) <= otherObject.pos[0];
  }

  remove() {
    this.game.remove(this);
  }
}
