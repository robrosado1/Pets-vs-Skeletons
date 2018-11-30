class Entity {
  constructor(width, height, scale, source, pos) {
    this.scale = scale;
    this.width = width;
    this.height = height;
    this.scaledWidth = this.scale * this.width;
    this.scaledHeight = this.scale * this.height;
    this.image = new Image();
    this.image.src = source;
    this.pos = pos;
    // this.context = context;
  }
}

Entity.prototype.draw = function(frameRow, frameCol, canvasX, canvasY) {
  ctx.drawImage(this.image, frameRow * this.width, frameCol * this.height,
    this.width, this.height, canvasX, canvasY, this.scaledWidth, this.scaledHeight);
}
