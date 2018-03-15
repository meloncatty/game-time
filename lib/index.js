var canvas = document.querySelector('#game-screen');
var ctx = canvas.getContext('2d');
var Paddle = require('./Paddle');
var Keyboarder = require('./keyboarder');
var Ball = require('./ball.js');
var keyboardMonitor = new Keyboarder();
var bouncyBall = new Ball(395, 200);
var keyState = {};
var test = 'test';

window.addEventListener('keydown', function(e) {
  keyState = keyboardMonitor.keyDown(e);
});

window.addEventListener('keyup', function(e) {
  keyState = keyboardMonitor.keyUp(e);
});

var startPaddle = new Paddle(350, 100, 15);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  startPaddle.draw(ctx);
  bouncyBall.draw(ctx);
  startPaddle.animate(keyState);
  requestAnimationFrame(gameLoop);
};

gameLoop();
