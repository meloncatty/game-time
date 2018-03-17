class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 300;
    this.height = 100;
    this.bricks = [];
  }

  createBricks(brick) {
    for(var i = 0; i < 84; i++) {
      let x = (i % 10);
      let y = (i % 4);
      this.bricks.push(new Brick(x, y));
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
