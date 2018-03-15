class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2 ,false);
    context.stroke();
    context.fillStyle = "#000";
    context.fill();
  }
}

module.exports = Ball;
