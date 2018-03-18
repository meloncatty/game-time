class Game {
  constructor(ball, paddle) {
    this.bricks = [];
    this.discardedBricks = [];
    this.balls = [ball];
    this.paddle = paddle;
    this.level = 1;
    this.lives = 3;
    this.score = 0;
  }

  collisionCheck(obj1, obj2) {
    if (obj1.x < obj2.x + obj2.width  && obj1.x + obj1.width  > obj2.x &&
        obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y) {
      return true;
    } else {
      return false;
    }
  }

  paddleBallColliding(ball, paddle) {
    var boolean = this.collisionCheck(ball, paddle);
    var dy = ball.dy;
    if (boolean === true) {
      return dy = -dy;
    } else {
      return dy;
    }
  }

  grabBricks(bricks) {
    this.bricks.push(bricks);
  }

  brickBallColliding(ball, bricks) {
    var dy = ball.dy;
    bricks.forEach(function(brick) {
      var boolean = this.collisionCheck(ball, brick);
      if (boolean === true) {
        this.score += 100;
        var index = this.bricks.indexOf(brick);
        this.discardedBricks = this.bricks.splice(index, 1)
        return dy = -dy;
      } else {
        return dy;
      }
    }.bind(this))
    return dy;
  }

  checkBallDeath(ball, canvasHeight) {
    if (ball.y >= canvasHeight) {
      this.lives -= 1;
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Game;
