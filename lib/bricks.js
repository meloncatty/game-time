class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 25;
    this.bricks = [];
  }

  createBricks() {
    for(var i = 0; i < 20; i++) {
      if (i <= 9) {
        let x = (i * 75) + (i * 5);
        let y = (15);
        this.bricks.push(new Brick(x, y));
      } else if (i <= 19) {
        let x = ((i - 10) * 75) + ((i - 10) * 5);
        let y = (45);
        this.bricks.push(new Brick(x, y));
      }
    }
  }

  draw(context) {
    for(let i = 0; i < this.bricks.length; i++) {
      const {x, y, width, height} = this.bricks[i];
      context.fillRect(x, y, width, height);
    }
  }
}

module.exports = Brick;
