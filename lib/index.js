var canvas = document.querySelector('#game-screen');
var ctx = canvas.getContext('2d');
var Paddle = require('./Paddle');
var Keyboarder = require('./keyboarder');
var keyboardMonitor = new Keyboarder();
var keyState = {};
var test = 'test';

window.addEventListener('keydown', function(e) {
  keyState = keyboardMonitor.listen(e);
});
var startPaddle = new Paddle(50, 100, 15);

function gameLoop() {
  startPaddle.draw(ctx);
  startPaddle.animate(keyState);
  requestAnimationFrame(gameLoop);
};

gameLoop();