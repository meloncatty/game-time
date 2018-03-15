class Ball {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = 5;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2 ,false);
    context.stroke();
    context.fillStyle = "#000";
    context.fill();
  }
  move() {
    this.y += this.dy;
    this.x += this.dx;
  }
}

module.exports = Ball;
