class Paddle {
  constructor(x, width, height) {
    this.y = 475;
    this.x = x;
    this.dx = 0;
    this.width = width;
    this.height = height;
  }
  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  animate(keyState) {
    if (keyState.left === true) {
      this.x -= 2;
    } else if (keyState.right === true) {
      this.x += 2;
    }
  }
}

module.exports = Paddle;