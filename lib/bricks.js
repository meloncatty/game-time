class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 25;
    this.bricks = [];
  }

  createBricks(numBricks) {
    for(var i = 0; i < numBricks; i++) {
      if (i <= 9) {
        let x = 2.5 + (i * 75) + (i * 5);
        let y = (15);
        this.bricks.push(new Brick(x, y));
      } else if (i <= 19) {
        let x = 2.5 + ((i - 10) * 75) + ((i - 10) * 5);
        let y = (45);
        this.bricks.push(new Brick(x, y));
      } else if (i <= 29) {
        let x = 2.5 + ((i - 20) * 75) + ((i - 20) * 5);
        let y = (75);
        this.bricks.push(new Brick(x, y));
      } else if (i <= 39) {
        let x = 2.5 + ((i - 30) * 75) + ((i - 30) * 5);
        let y = (105);
        this.bricks.push(new Brick(x, y));
      } 
    }
    return this.bricks;
  }

  clearBricks() {
    this.bricks = [];
    return this.bricks;
  }

  draw(context, bricks) {
    for(let i = 0; i < bricks.length; i++) {
      const {x, y, width, height} = bricks[i];
      context.fillRect(x, y, width, height);
    }
  }
}

// class StrongerBrick extends Brick {
//   constructor(x, y, health) {
//     super(x, y);
//     this.health = health;
//   }
// }

module.exports = Brick;
