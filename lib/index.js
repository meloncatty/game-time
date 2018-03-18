const canvas = document.querySelector('#game-screen');
let ctx = canvas.getContext('2d');
const Paddle = require('./Paddle');
let startPaddle = new Paddle(350, 100, 15);
const Keyboarder = require('./keyboarder');
const Ball = require('./ball.js');
const Scores = require('./scores.js');
let keyboardMonitor = new Keyboarder();
let bouncyBall = new Ball(400, 200, ((Math.random() * 3) -1.5), 4);
let keyState = {};
const Game = require('./Game');
const newGame = new Game(bouncyBall, startPaddle);
const Brick = require('./bricks.js');
const bricks = new Brick();
let requestID = undefined;
let isDead = null;

function generateBricks() {
  var bricksDesired = null;
  if (newGame.level === 1) {
    bricksDesired = 40;
    let newBricks = bricks.createBricks(bricksDesired);
    newBricks.forEach( brick => newGame.grabBricks(brick) )
  } else {
  let newBricks = bricks.createBricks(bricksDesired);
  newBricks.forEach( brick => newGame.grabBricks(brick) )
  }
};

generateBricks();

window.addEventListener('keydown', function(e) {
  keyState = keyboardMonitor.keyDown(e);
});

window.addEventListener('keyup', function(e) {
  keyState = keyboardMonitor.keyUp(e);
});

function gameLoop() {
  document.getElementById('user-score').innerHTML = newGame.score;
  document.querySelector('.lives-indicator').innerHTML = newGame.lives;
  ctx.fillStyle = '#000';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  startPaddle.draw(ctx);
  bouncyBall.draw(ctx);
  bouncyBall.dy = newGame.paddleBallColliding(bouncyBall, startPaddle);
  bouncyBall.dy = newGame.brickBallColliding(bouncyBall, newGame.bricks);
  bricks.draw(ctx, newGame.bricks);
  bouncyBall.move(canvas.height, canvas.width);
  startPaddle.animate(keyState);
  isDead = newGame.checkBallDeath(bouncyBall, canvas.height);
  if (isDead) {
    ballDeath();
  } else {
    requestID = requestAnimationFrame(gameLoop);
  }
};

startGame();

function startGame() {
  ctx.fillStyle = '#000';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bouncyBall = new Ball(400, 200, ((Math.random() * 3) -1.5), 4);
  startPaddle = new Paddle(350, 100, 15);
  startPaddle.draw(ctx);
  bouncyBall.draw(ctx);
  bricks.draw(ctx, newGame.bricks);
  delayedStart();
  endGame();
  // persistScores();
}

function delayedStart() {
  if(!requestID) {
    window.setTimeout(gameLoop, 3000);
  }
}

function ballDeath() {
  if(requestID) {
    window.cancelAnimationFrame(requestID);
    requestID = null;
    isDead = false;
    var livesIndicator = document.querySelector('.lives-indicator');
    livesIndicator.innerText = newGame.lives;
    startGame();
  }
}

function endGame() {
  var userScores = new Scores();
  if(newGame.lives <= 0) {
    newGame.lives = 3;
    userScores.initials = prompt('Enter your initials!', 'XXX');
    userScores.score = newGame.score;
    console.log(userScores);
    scoreToStorage(userScores);
    getFromStorage(userScores);
  }
}

function scoreToStorage(scores) {
  var storeScores = scores;
  var stringifyScores = JSON.stringify(storeScores);
  localStorage.setItem(scores.id, stringifyScores);
}

function getFromStorage(scores) {
  let retrieveScores = scores;
  let parsedScores = JSON.parse(retrieveScores);
  for (var i = 0; i < parsedScores.length; i++) {
    const {topScores} = parsedScores.score[i];
    const {initials} = parsedScores.initials[i];
    console.log(topScores);
  }
  // const {topScores} = ;
  // Object.keys(localStorage).forEach( key => {
  //   topScores.push(localStorage.getItem(key));
  // });
  // console.log(topScores);


  // var retrieveObject = localStorage.getItem(scores);
  // var parsedObject = JSON.parse(retrieveObject);
  // return parsedObject;
  // console.log(parsedObject);
}

// getFromStorage(localStorage);

function persistScores(scores) {
  getFromStorage(scores);
}
