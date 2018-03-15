class Game {
  constructor(ball, paddle) {
    this.bricks = [];
    this.balls = [ball];
    this.paddle = paddle;
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
}

module.exports = Game;