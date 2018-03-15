class Paddle {
  constructor(x, width, height) {
    this.y = 475;
    this.x = x;
    this.width = width;
    this.height = height;
  }
  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  animate(keyState) {
    if (keyState[37] === true && this.x > 0) {
      this.x -= 4;
    } else if (keyState[39] === true && this.x < 700) {
      this.x += 4;
    }
  }
}

module.exports = Paddle;