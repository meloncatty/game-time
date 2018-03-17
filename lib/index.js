const canvas = document.querySelector('#game-screen');
const ctx = canvas.getContext('2d');
const Paddle = require('./Paddle');
const startPaddle = new Paddle(350, 100, 15);
const Keyboarder = require('./keyboarder');
const Ball = require('./ball.js');
let keyboardMonitor = new Keyboarder();
const bouncyBall = new Ball(400, 200, ((Math.random() * 3) -1.5), 4);
let keyState = {};
const Game = require('./Game');
const newGame = new Game(bouncyBall, startPaddle);
const Brick = require('./bricks.js');
const bricks = new Brick();

function generateBricks() {
  let newBricks = bricks.createBricks();
  newBricks.forEach( brick => newGame.grabBricks(brick) )
};

generateBricks();

window.addEventListener('keydown', function(e) {
  keyState = keyboardMonitor.keyDown(e);
});

window.addEventListener('keyup', function(e) {
  keyState = keyboardMonitor.keyUp(e);
});

function gameLoop() {
  ctx.fillStyle = '#000';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  startPaddle.draw(ctx);
  bouncyBall.dy = newGame.paddleBallColliding(bouncyBall, startPaddle);
  bouncyBall.draw(ctx);
  bricks.draw(ctx, newGame.bricks);
  bouncyBall.move(canvas.height, canvas.width);
  startPaddle.animate(keyState);
  requestAnimationFrame(gameLoop);
};

gameLoop();

