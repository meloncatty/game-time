/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var canvas = document.querySelector('#game-screen');
	var ctx = canvas.getContext('2d');
	var Paddle = __webpack_require__(1);
	var startPaddle = new Paddle(350, 100, 15);
	var Keyboarder = __webpack_require__(2);
	var Ball = __webpack_require__(3);
	var Scores = __webpack_require__(4);
	var keyboardMonitor = new Keyboarder();
	var bouncyBall = new Ball(400, 200, Math.random() * 3 - 1.5, 4);
	var keyState = {};
	var Game = __webpack_require__(5);
	var newGame = new Game(bouncyBall, startPaddle);
	var Brick = __webpack_require__(6);
	var bricks = new Brick();
	var requestID = undefined;
	var isDead = null;
	
	newGame.level = 3;
	
	function generateBricks() {
	  if (newGame.level === 1) {
	    var newBricks = bricks.createBricks(40, 1);
	    newBricks.forEach(function (brick) {
	      return newGame.grabBricks(brick);
	    });
	  } else if (newGame.level === 2) {
	    var _newBricks = bricks.createBricks(40, 2);
	    _newBricks.forEach(function (brick) {
	      return newGame.grabBricks(brick);
	    });
	  } else if (newGame.level === 3) {
	    var _newBricks2 = bricks.createBricks(40, 2);
	    _newBricks2.filter(function (brick) {
	      return brick.x === 5 ? console.log(brick.x) : brick.x;
	    });
	    _newBricks2.forEach(function (brick) {
	      return newGame.grabBricks(brick);
	    });
	  };
	};
	
	generateBricks();
	
	window.addEventListener('keydown', function (e) {
	  keyState = keyboardMonitor.keyDown(e);
	});
	
	window.addEventListener('keyup', function (e) {
	  keyState = keyboardMonitor.keyUp(e);
	});
	
	document.querySelector('.new-game-button').addEventListener('click', restartGame);
	
	function gameLoop() {
	  document.getElementById('user-score').innerHTML = newGame.score;
	  document.querySelector('.lives-indicator').innerHTML = newGame.lives;
	  ctx.fillStyle = '#000';
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  startPaddle.draw(ctx);
	  bouncyBall.draw(ctx);
	  bouncyBall.dy = newGame.paddleBallColliding(bouncyBall, startPaddle);
	  bouncyBall.dx = newGame.paddleBallXCheck(bouncyBall, startPaddle);
	  bouncyBall.dx = newGame.brickBallSideCollision(bouncyBall, newGame.bricks);
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
	  if (newGame.checkBricks()) {
	    bricks.clearBricks();
	    generateBricks();
	    window.cancelAnimationFrame(requestID);
	    requestID = null;
	    startGame();
	  }
	};
	
	startGame();
	
	function restartGame() {
	  window.cancelAnimationFrame(requestID);
	  requestID = null;
	  newGame.bricks = bricks.clearBricks();
	  bouncyBall = new Ball(400, 200, Math.random() * 3 - 1.5, 4);
	  newGame = new Game(bouncyBall, startPaddle);
	  generateBricks();
	  startGame();
	}
	
	function startGame() {
	  ctx.fillStyle = '#000';
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  bouncyBall = new Ball(400, 200, Math.random() * 3 - 1.5, 4);
	  startPaddle = new Paddle(350, 100, 15);
	  startPaddle.draw(ctx);
	  bouncyBall.draw(ctx);
	  bricks.draw(ctx, newGame.bricks);
	  delayedStart();
	  endGame();
	}
	
	function delayedStart() {
	  if (!requestID) {
	    window.setTimeout(gameLoop, 3000);
	  }
	}
	
	function ballDeath() {
	  if (requestID) {
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
	  if (newGame.lives === 0) {
	    document.getElementById('user-score').innerHTML = 0;
	    userScores.initials = prompt('Enter your initials!', '');
	    userScores.score = newGame.score;
	    console.log(userScores.initials);
	    userScores.initials = checkInitials(userScores.initials);
	    scoreToStorage(userScores);
	    getFromStorage(userScores);
	    newGame = new Game(bouncyBall, startPaddle);
	    bricks = new Brick();
	    generateBricks();
	  }
	}
	
	var checkInitials = function checkInitials(s) {
	  return (/[a-z]*/gi.test(s) ? s.slice(0, 3).toUpperCase() : 'N/A'
	  );
	};
	
	function scoreToStorage(scores) {
	  var storeScores = scores;
	  var stringifyScores = JSON.stringify(storeScores);
	  localStorage.setItem(scores.id, stringifyScores);
	}
	
	function getFromStorage(scores) {
	  var topScores = [];
	  for (var i = 0; i < localStorage.length; i++) {
	    var retrievedItem = localStorage.getItem(localStorage.key(i));
	    var parsedItem = JSON.parse(retrievedItem);
	    topScores.push(parsedItem);
	  }
	  topScores.sort(function (a, b) {
	    return b.score - a.score;
	  });
	  topScores.splice(10, 1000);
	  for (var i = 0; i < topScores.length; i++) {
	    var initials = topScores[i].initials;
	    var score = topScores[i].score;
	    var HTMLInitials = 'high-initials-' + (i + 1);
	    var HTMLScores = 'high-score-' + (i + 1);
	    document.querySelector('.' + HTMLInitials).innerHTML = initials;
	    document.querySelector('.' + HTMLScores).innerHTML = score;
	  }
	}
	
	getFromStorage();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Paddle = function () {
	  function Paddle(x, width, height) {
	    _classCallCheck(this, Paddle);
	
	    this.y = 475;
	    this.x = x;
	    this.width = width;
	    this.height = height;
	  }
	
	  _createClass(Paddle, [{
	    key: "draw",
	    value: function draw(context) {
	      context.fillRect(this.x, this.y, this.width, this.height);
	    }
	  }, {
	    key: "animate",
	    value: function animate(keyState) {
	      if (keyState[37] && this.x > 0) {
	        this.x -= 5;
	      } else if (keyState[39] && this.x < 700) {
	        this.x += 5;
	      }
	    }
	  }]);
	
	  return Paddle;
	}();
	
	module.exports = Paddle;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Keyboarder = function () {
	  function Keyboarder() {
	    _classCallCheck(this, Keyboarder);
	
	    this.keys = {
	      left: 37,
	      right: 39
	    };
	  }
	
	  _createClass(Keyboarder, [{
	    key: "keyDown",
	    value: function keyDown(e) {
	      var keyState = {};
	      keyState[e.keyCode] = true;
	      return keyState;
	    }
	  }, {
	    key: "keyUp",
	    value: function keyUp(e) {
	      var keyState = {};
	      keyState[e.keyCode] = false;
	      return keyState;
	    }
	  }]);
	
	  return Keyboarder;
	}();
	
	module.exports = Keyboarder;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ball = function () {
	  function Ball(x, y, dx, dy) {
	    _classCallCheck(this, Ball);
	
	    this.x = x;
	    this.y = y;
	    this.dx = dx;
	    this.dy = dy;
	    this.radius = 5;
	    this.width = this.radius * 2;
	    this.height = this.radius * 2;
	  }
	
	  _createClass(Ball, [{
	    key: "draw",
	    value: function draw(context) {
	      context.beginPath();
	      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	      context.stroke();
	      context.fillStyle = "#000";
	      context.fill();
	    }
	  }, {
	    key: "move",
	    value: function move(canvasHeight, canvasWidth) {
	      if (this.x + this.radius >= canvasWidth || this.x - this.radius <= 0) {
	        this.dx = -this.dx;
	      }
	      if (this.y - this.radius <= 0) {
	        this.dy = -this.dy;
	      }
	      this.y += this.dy;
	      this.x += this.dx;
	    }
	  }]);
	
	  return Ball;
	}();
	
	module.exports = Ball;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Scores = function Scores() {
	  _classCallCheck(this, Scores);
	
	  this.score = 0;
	  this.initials = 'XXX';
	  this.id = Date.now();
	};
	
	module.exports = Scores;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(ball, paddle) {
	    _classCallCheck(this, Game);
	
	    this.bricks = [];
	    this.discardedBricks = [];
	    this.balls = [ball];
	    this.paddle = paddle;
	    this.level = 1;
	    this.lives = 3;
	    this.score = 0;
	  }
	
	  _createClass(Game, [{
	    key: "collisionCheck",
	    value: function collisionCheck(obj1, obj2) {
	      if (obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: "paddleBallColliding",
	    value: function paddleBallColliding(ball, paddle) {
	      var boolean = this.collisionCheck(ball, paddle);
	      var dy = ball.dy;
	      if (boolean === true) {
	        return dy = -dy;
	      } else {
	        return dy;
	      }
	    }
	  }, {
	    key: "paddleBallXCheck",
	    value: function paddleBallXCheck(ball, paddle) {
	      var boolean = this.collisionCheck(ball, paddle);
	      var paddleFirstFifth = paddle.x + paddle.width / 5;
	      var paddleSecondFifth = paddle.x + paddle.width / 5 * 2;
	      var paddleMiddleFifth = paddle.x + paddle.width / 5 * 3;
	      var paddleThirdFifth = paddle.x + paddle.width / 5 * 4;
	      var paddleFourthFifth = paddle.x + paddle.width;
	      if (boolean === true) {
	        if (ball.x < paddleFirstFifth) {
	          ball.dx -= 3;
	        } else if (ball.x < paddleSecondFifth) {
	          ball.dx -= 1;
	        } else if (ball.x < paddleThirdFifth) {
	          ball.dx += 1;
	        } else if (ball.x < paddleFourthFifth) {
	          ball.dx += 3;
	        }
	      }
	      if (ball.dx > 10) {
	        ball.dx = 10;
	      } else if (ball.dx < -10) {
	        ball.dx = -10;
	      }
	      return ball.dx;
	    }
	  }, {
	    key: "grabBricks",
	    value: function grabBricks(bricks) {
	      this.bricks.push(bricks);
	    }
	  }, {
	    key: "brickBallColliding",
	    value: function brickBallColliding(ball, bricks) {
	      var dy = ball.dy;
	      bricks.forEach(function (brick) {
	        var index = this.bricks.indexOf(brick);
	        var boolean = this.collisionCheck(ball, brick);
	        if (boolean === true) {
	          this.score += 100;
	          if (brick.health === 1) {
	            var _index = this.bricks.indexOf(brick);
	            this.discardedBricks = this.bricks.splice(_index, 1);
	          }
	          brick.health--;
	          if (ball.x < brick.x + brick.width && ball.x > brick.x) {
	            return dy = -dy;
	          } else {
	            return dy;
	          }
	        }
	      }.bind(this));
	      return dy;
	    }
	  }, {
	    key: "checkBricks",
	    value: function checkBricks() {
	      if (this.bricks.length === 0) {
	        this.level++;
	        return true;
	      }
	    }
	  }, {
	    key: "brickBallSideCollision",
	    value: function brickBallSideCollision(ball, bricks) {
	      bricks.forEach(function (brick) {
	        var boolean = this.collisionCheck(ball, brick);
	        if (boolean === true) {
	          if (ball.x <= brick.x || ball.x >= brick.x + brick.width) {
	            ball.dx = -ball.dx;
	          }
	        }
	      }.bind(this));
	      return ball.dx;
	    }
	  }, {
	    key: "checkBallDeath",
	    value: function checkBallDeath(ball, canvasHeight) {
	      if (ball.y >= canvasHeight) {
	        this.lives -= 1;
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Brick = function () {
	  function Brick(x, y, fillStyle) {
	    _classCallCheck(this, Brick);
	
	    this.x = x;
	    this.y = y;
	    this.health = 1;
	    this.width = 75;
	    this.height = 25;
	    this.bricks = [];
	  }
	
	  _createClass(Brick, [{
	    key: 'createBricks',
	    value: function createBricks(numBricks, level) {
	      for (var i = 0; i < numBricks; i++) {
	        if (i <= 9) {
	          var x = 2.5 + i * 75 + i * 5;
	          var y = 15;
	          this.bricks.push(new Brick(x, y));
	        } else if (i <= 19) {
	          var _x = 2.5 + (i - 10) * 75 + (i - 10) * 5;
	          var _y = 45;
	          this.bricks.push(new Brick(_x, _y));
	        } else if (i <= 29) {
	          var _x2 = 2.5 + (i - 20) * 75 + (i - 20) * 5;
	          var _y2 = 75;
	          this.bricks.push(new Brick(_x2, _y2));
	        } else if (i <= 39) {
	          var _x3 = 2.5 + (i - 30) * 75 + (i - 30) * 5;
	          var _y3 = 105;
	          if (level === 2) {
	            var health = 2;
	            this.bricks.push(new StrongerBrick(_x3, _y3, health));
	          }
	        }
	      }
	      return this.bricks;
	    }
	  }, {
	    key: 'clearBricks',
	    value: function clearBricks() {
	      this.bricks = [];
	      return this.bricks;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(context, bricks) {
	      for (var i = 0; i < bricks.length; i++) {
	        var _bricks$i = bricks[i],
	            x = _bricks$i.x,
	            y = _bricks$i.y,
	            width = _bricks$i.width,
	            height = _bricks$i.height;
	
	        if (bricks[i].health === 2) {
	          context.fillStyle = '#360600';
	        } else if (bricks[i].health === 1) {
	          context.fillStyle = '#FC0009';
	        }
	        context.fillRect(x, y, width, height);
	      }
	    }
	  }]);
	
	  return Brick;
	}();
	
	var StrongerBrick = function (_Brick) {
	  _inherits(StrongerBrick, _Brick);
	
	  function StrongerBrick(x, y, health, fillStyle) {
	    _classCallCheck(this, StrongerBrick);
	
	    var _this = _possibleConstructorReturn(this, (StrongerBrick.__proto__ || Object.getPrototypeOf(StrongerBrick)).call(this, x, y));
	
	    _this.health = health;
	    return _this;
	  }
	
	  return StrongerBrick;
	}(Brick);
	
	module.exports = Brick;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWQ4YWViOWMwOGExNWU3MzM4Y2EiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9QYWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2tleWJvYXJkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3Njb3Jlcy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvR2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYnJpY2tzLmpzIl0sIm5hbWVzIjpbImNhbnZhcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImN0eCIsImdldENvbnRleHQiLCJQYWRkbGUiLCJyZXF1aXJlIiwic3RhcnRQYWRkbGUiLCJLZXlib2FyZGVyIiwiQmFsbCIsIlNjb3JlcyIsImtleWJvYXJkTW9uaXRvciIsImJvdW5jeUJhbGwiLCJNYXRoIiwicmFuZG9tIiwia2V5U3RhdGUiLCJHYW1lIiwibmV3R2FtZSIsIkJyaWNrIiwiYnJpY2tzIiwicmVxdWVzdElEIiwidW5kZWZpbmVkIiwiaXNEZWFkIiwibGV2ZWwiLCJnZW5lcmF0ZUJyaWNrcyIsIm5ld0JyaWNrcyIsImNyZWF0ZUJyaWNrcyIsImZvckVhY2giLCJncmFiQnJpY2tzIiwiYnJpY2siLCJmaWx0ZXIiLCJ4IiwiY29uc29sZSIsImxvZyIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5RG93biIsImtleVVwIiwicmVzdGFydEdhbWUiLCJnYW1lTG9vcCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic2NvcmUiLCJsaXZlcyIsImZpbGxTdHlsZSIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiZHJhdyIsImR5IiwicGFkZGxlQmFsbENvbGxpZGluZyIsImR4IiwicGFkZGxlQmFsbFhDaGVjayIsImJyaWNrQmFsbFNpZGVDb2xsaXNpb24iLCJicmlja0JhbGxDb2xsaWRpbmciLCJtb3ZlIiwiYW5pbWF0ZSIsImNoZWNrQmFsbERlYXRoIiwiYmFsbERlYXRoIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2hlY2tCcmlja3MiLCJjbGVhckJyaWNrcyIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwic3RhcnRHYW1lIiwiZGVsYXllZFN0YXJ0IiwiZW5kR2FtZSIsInNldFRpbWVvdXQiLCJsaXZlc0luZGljYXRvciIsImlubmVyVGV4dCIsInVzZXJTY29yZXMiLCJpbml0aWFscyIsInByb21wdCIsImNoZWNrSW5pdGlhbHMiLCJzY29yZVRvU3RvcmFnZSIsImdldEZyb21TdG9yYWdlIiwidGVzdCIsInMiLCJzbGljZSIsInRvVXBwZXJDYXNlIiwic2NvcmVzIiwic3RvcmVTY29yZXMiLCJzdHJpbmdpZnlTY29yZXMiLCJKU09OIiwic3RyaW5naWZ5IiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImlkIiwidG9wU2NvcmVzIiwiaSIsImxlbmd0aCIsInJldHJpZXZlZEl0ZW0iLCJnZXRJdGVtIiwia2V5IiwicGFyc2VkSXRlbSIsInBhcnNlIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsInNwbGljZSIsIkhUTUxJbml0aWFscyIsIkhUTUxTY29yZXMiLCJ5IiwiY29udGV4dCIsImZpbGxSZWN0IiwibW9kdWxlIiwiZXhwb3J0cyIsImtleXMiLCJsZWZ0IiwicmlnaHQiLCJrZXlDb2RlIiwicmFkaXVzIiwiYmVnaW5QYXRoIiwiYXJjIiwiUEkiLCJzdHJva2UiLCJmaWxsIiwiY2FudmFzSGVpZ2h0IiwiY2FudmFzV2lkdGgiLCJEYXRlIiwibm93IiwiYmFsbCIsInBhZGRsZSIsImRpc2NhcmRlZEJyaWNrcyIsImJhbGxzIiwib2JqMSIsIm9iajIiLCJib29sZWFuIiwiY29sbGlzaW9uQ2hlY2siLCJwYWRkbGVGaXJzdEZpZnRoIiwicGFkZGxlU2Vjb25kRmlmdGgiLCJwYWRkbGVNaWRkbGVGaWZ0aCIsInBhZGRsZVRoaXJkRmlmdGgiLCJwYWRkbGVGb3VydGhGaWZ0aCIsImlu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QjtBQUNELFVBRkMsTUFFSyxJQUFJMUIsT0FBT3NFLENBQVAsRUFBVWdELE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDakNqQyxtQkFBUTNELFNBQVIsR0FBb0IsU0FBcEI7QUFDRDtBQUNDMkQsaUJBQVFDLFFBQVIsQ0FBaUIxRSxDQUFqQixFQUFvQndFLENBQXBCLEVBQXVCeEQsS0FBdkIsRUFBOEJDLE1BQTlCO0FBQ0Q7QUFDRjs7Ozs7O0tBR0c0RixhOzs7QUFDSiwwQkFBWTdHLENBQVosRUFBZXdFLENBQWYsRUFBa0JrQyxNQUFsQixFQUEwQjVGLFNBQTFCLEVBQXFDO0FBQUE7O0FBQUEsK0hBQzdCZCxDQUQ2QixFQUMxQndFLENBRDBCOztBQUVuQyxXQUFLa0MsTUFBTCxHQUFjQSxNQUFkO0FBRm1DO0FBR3BDOzs7R0FKeUJ2SCxLOztBQU81QndGLFFBQU9DLE9BQVAsR0FBaUJ6RixLQUFqQixDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZWQ4YWViOWMwOGExNWU3MzM4Y2EiLCJjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS1zY3JlZW4nKTtcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmNvbnN0IFBhZGRsZSA9IHJlcXVpcmUoJy4vUGFkZGxlJyk7XG5sZXQgc3RhcnRQYWRkbGUgPSBuZXcgUGFkZGxlKDM1MCwgMTAwLCAxNSk7XG5jb25zdCBLZXlib2FyZGVyID0gcmVxdWlyZSgnLi9rZXlib2FyZGVyJyk7XG5jb25zdCBCYWxsID0gcmVxdWlyZSgnLi9iYWxsLmpzJyk7XG5jb25zdCBTY29yZXMgPSByZXF1aXJlKCcuL3Njb3Jlcy5qcycpO1xubGV0IGtleWJvYXJkTW9uaXRvciA9IG5ldyBLZXlib2FyZGVyKCk7XG5sZXQgYm91bmN5QmFsbCA9IG5ldyBCYWxsKDQwMCwgMjAwLCAoKE1hdGgucmFuZG9tKCkgKiAzKSAtMS41KSwgNCk7XG5sZXQga2V5U3RhdGUgPSB7fTtcbmNvbnN0IEdhbWUgPSByZXF1aXJlKCcuL0dhbWUnKTtcbmxldCBuZXdHYW1lID0gbmV3IEdhbWUoYm91bmN5QmFsbCwgc3RhcnRQYWRkbGUpO1xuY29uc3QgQnJpY2sgPSByZXF1aXJlKCcuL2JyaWNrcy5qcycpO1xubGV0IGJyaWNrcyA9IG5ldyBCcmljaygpO1xubGV0IHJlcXVlc3RJRCA9IHVuZGVmaW5lZDtcbmxldCBpc0RlYWQgPSBudWxsO1xuXG5uZXdHYW1lLmxldmVsID0gMztcblxuZnVuY3Rpb24gZ2VuZXJhdGVCcmlja3MoKSB7XG4gIGlmIChuZXdHYW1lLmxldmVsID09PSAxKSB7XG4gICAgbGV0IG5ld0JyaWNrcyA9IGJyaWNrcy5jcmVhdGVCcmlja3MoNDAsIDEpO1xuICAgIG5ld0JyaWNrcy5mb3JFYWNoKCBicmljayA9PiBuZXdHYW1lLmdyYWJCcmlja3MoYnJpY2spICk7XG4gIH0gZWxzZSBpZiAobmV3R2FtZS5sZXZlbCA9PT0gMikge1xuICAgIGxldCBuZXdCcmlja3MgPSBicmlja3MuY3JlYXRlQnJpY2tzKDQwLCAyKTtcbiAgICBuZXdCcmlja3MuZm9yRWFjaCggYnJpY2sgPT4gbmV3R2FtZS5ncmFiQnJpY2tzKGJyaWNrKSApO1xuICB9IGVsc2UgaWYgKG5ld0dhbWUubGV2ZWwgPT09IDMpe1xuICAgIGxldCBuZXdCcmlja3MgPSBicmlja3MuY3JlYXRlQnJpY2tzKDQwLCAyKTtcbiAgICBuZXdCcmlja3MuZmlsdGVyKCBicmljayA9PiBicmljay54ID09PSA1ID8gY29uc29sZS5sb2coYnJpY2sueCkgOiBicmljay54KTtcbiAgICBuZXdCcmlja3MuZm9yRWFjaCggYnJpY2sgPT4gbmV3R2FtZS5ncmFiQnJpY2tzKGJyaWNrKSApO1xuICB9O1xufTtcblxuZ2VuZXJhdGVCcmlja3MoKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gIGtleVN0YXRlID0ga2V5Ym9hcmRNb25pdG9yLmtleURvd24oZSk7XG59KTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICBrZXlTdGF0ZSA9IGtleWJvYXJkTW9uaXRvci5rZXlVcChlKTtcbn0pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWdhbWUtYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXN0YXJ0R2FtZSk7XG5cbmZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1zY29yZScpLmlubmVySFRNTCA9IG5ld0dhbWUuc2NvcmU7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXZlcy1pbmRpY2F0b3InKS5pbm5lckhUTUwgPSBuZXdHYW1lLmxpdmVzO1xuICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xuICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gIHN0YXJ0UGFkZGxlLmRyYXcoY3R4KTtcbiAgYm91bmN5QmFsbC5kcmF3KGN0eCk7XG4gIGJvdW5jeUJhbGwuZHkgPSBuZXdHYW1lLnBhZGRsZUJhbGxDb2xsaWRpbmcoYm91bmN5QmFsbCwgc3RhcnRQYWRkbGUpO1xuICBib3VuY3lCYWxsLmR4ID0gbmV3R2FtZS5wYWRkbGVCYWxsWENoZWNrKGJvdW5jeUJhbGwsIHN0YXJ0UGFkZGxlKTtcbiAgYm91bmN5QmFsbC5keCA9IG5ld0dhbWUuYnJpY2tCYWxsU2lkZUNvbGxpc2lvbihib3VuY3lCYWxsLCBuZXdHYW1lLmJyaWNrcyk7XG4gIGJvdW5jeUJhbGwuZHkgPSBuZXdHYW1lLmJyaWNrQmFsbENvbGxpZGluZyhib3VuY3lCYWxsLCBuZXdHYW1lLmJyaWNrcyk7XG4gIGJyaWNrcy5kcmF3KGN0eCwgbmV3R2FtZS5icmlja3MpO1xuICBib3VuY3lCYWxsLm1vdmUoY2FudmFzLmhlaWdodCwgY2FudmFzLndpZHRoKTtcbiAgc3RhcnRQYWRkbGUuYW5pbWF0ZShrZXlTdGF0ZSk7XG4gIGlzRGVhZCA9IG5ld0dhbWUuY2hlY2tCYWxsRGVhdGgoYm91bmN5QmFsbCwgY2FudmFzLmhlaWdodCk7XG4gIGlmIChpc0RlYWQpIHtcbiAgICBiYWxsRGVhdGgoKTtcbiAgfSBlbHNlIHtcbiAgICByZXF1ZXN0SUQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICB9XG4gIGlmIChuZXdHYW1lLmNoZWNrQnJpY2tzKCkpIHtcbiAgICBicmlja3MuY2xlYXJCcmlja3MoKTtcbiAgICBnZW5lcmF0ZUJyaWNrcygpO1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShyZXF1ZXN0SUQpO1xuICAgIHJlcXVlc3RJRCA9IG51bGw7XG4gICAgc3RhcnRHYW1lKCk7XG4gIH1cbn07XG5cbnN0YXJ0R2FtZSgpO1xuXG5mdW5jdGlvbiByZXN0YXJ0R2FtZSgpIHtcbiAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHJlcXVlc3RJRCk7XG4gIHJlcXVlc3RJRCA9IG51bGw7XG4gIG5ld0dhbWUuYnJpY2tzID0gYnJpY2tzLmNsZWFyQnJpY2tzKCk7XG4gIGJvdW5jeUJhbGwgPSBuZXcgQmFsbCg0MDAsIDIwMCwgKChNYXRoLnJhbmRvbSgpICogMykgLTEuNSksIDQpO1xuICBuZXdHYW1lID0gbmV3IEdhbWUoYm91bmN5QmFsbCwgc3RhcnRQYWRkbGUpO1xuICBnZW5lcmF0ZUJyaWNrcygpO1xuICBzdGFydEdhbWUoKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xuICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gIGJvdW5jeUJhbGwgPSBuZXcgQmFsbCg0MDAsIDIwMCwgKChNYXRoLnJhbmRvbSgpICogMykgLTEuNSksIDQpO1xuICBzdGFydFBhZGRsZSA9IG5ldyBQYWRkbGUoMzUwLCAxMDAsIDE1KTtcbiAgc3RhcnRQYWRkbGUuZHJhdyhjdHgpO1xuICBib3VuY3lCYWxsLmRyYXcoY3R4KTtcbiAgYnJpY2tzLmRyYXcoY3R4LCBuZXdHYW1lLmJyaWNrcyk7XG4gIGRlbGF5ZWRTdGFydCgpO1xuICBlbmRHYW1lKCk7XG59XG5cbmZ1bmN0aW9uIGRlbGF5ZWRTdGFydCgpIHtcbiAgaWYoIXJlcXVlc3RJRCkge1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGdhbWVMb29wLCAzMDAwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBiYWxsRGVhdGgoKSB7XG4gIGlmKHJlcXVlc3RJRCkge1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShyZXF1ZXN0SUQpO1xuICAgIHJlcXVlc3RJRCA9IG51bGw7XG4gICAgaXNEZWFkID0gZmFsc2U7XG4gICAgdmFyIGxpdmVzSW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpdmVzLWluZGljYXRvcicpO1xuICAgIGxpdmVzSW5kaWNhdG9yLmlubmVyVGV4dCA9IG5ld0dhbWUubGl2ZXM7XG4gICAgc3RhcnRHYW1lKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5kR2FtZSgpIHtcbiAgdmFyIHVzZXJTY29yZXMgPSBuZXcgU2NvcmVzKCk7XG4gIGlmKG5ld0dhbWUubGl2ZXMgPT09IDApIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1zY29yZScpLmlubmVySFRNTCA9IDA7XG4gICAgdXNlclNjb3Jlcy5pbml0aWFscyA9IHByb21wdCgnRW50ZXIgeW91ciBpbml0aWFscyEnLCAnJyk7XG4gICAgdXNlclNjb3Jlcy5zY29yZSA9IG5ld0dhbWUuc2NvcmU7XG4gICAgY29uc29sZS5sb2codXNlclNjb3Jlcy5pbml0aWFscyk7XG4gICAgdXNlclNjb3Jlcy5pbml0aWFscyA9IGNoZWNrSW5pdGlhbHModXNlclNjb3Jlcy5pbml0aWFscyk7XG4gICAgc2NvcmVUb1N0b3JhZ2UodXNlclNjb3Jlcyk7XG4gICAgZ2V0RnJvbVN0b3JhZ2UodXNlclNjb3Jlcyk7XG4gICAgbmV3R2FtZSA9IG5ldyBHYW1lKGJvdW5jeUJhbGwsIHN0YXJ0UGFkZGxlKTtcbiAgICBicmlja3MgPSBuZXcgQnJpY2soKTtcbiAgICBnZW5lcmF0ZUJyaWNrcygpO1xuICB9XG59XG5cbmNvbnN0IGNoZWNrSW5pdGlhbHMgPSBzID0+IC9bYS16XSovZ2kudGVzdChzKSA/IHMuc2xpY2UoMCwzKS50b1VwcGVyQ2FzZSgpIDogJ04vQSc7XG5cbmZ1bmN0aW9uIHNjb3JlVG9TdG9yYWdlKHNjb3Jlcykge1xuICB2YXIgc3RvcmVTY29yZXMgPSBzY29yZXM7XG4gIHZhciBzdHJpbmdpZnlTY29yZXMgPSBKU09OLnN0cmluZ2lmeShzdG9yZVNjb3Jlcyk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHNjb3Jlcy5pZCwgc3RyaW5naWZ5U2NvcmVzKTtcbn1cblxuZnVuY3Rpb24gZ2V0RnJvbVN0b3JhZ2Uoc2NvcmVzKSB7XG4gIGxldCB0b3BTY29yZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhbFN0b3JhZ2UubGVuZ3RoOyBpKyspe1xuICAgIGxldCByZXRyaWV2ZWRJdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxTdG9yYWdlLmtleShpKSk7XG4gICAgbGV0IHBhcnNlZEl0ZW0gPSBKU09OLnBhcnNlKHJldHJpZXZlZEl0ZW0pO1xuICAgIHRvcFNjb3Jlcy5wdXNoKHBhcnNlZEl0ZW0pO1xuICB9XG4gIHRvcFNjb3Jlcy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYi5zY29yZSAtIGEuc2NvcmU7XG4gIH0pXG4gIHRvcFNjb3Jlcy5zcGxpY2UoMTAsIDEwMDApO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRvcFNjb3Jlcy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBpbml0aWFscyA9IHRvcFNjb3Jlc1tpXS5pbml0aWFscztcbiAgICBsZXQgc2NvcmUgPSB0b3BTY29yZXNbaV0uc2NvcmU7XG4gICAgbGV0IEhUTUxJbml0aWFscyA9ICdoaWdoLWluaXRpYWxzLScgKyAoaSArIDEpO1xuICAgIGxldCBIVE1MU2NvcmVzID0gJ2hpZ2gtc2NvcmUtJyArIChpICsgMSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBIVE1MSW5pdGlhbHMpLmlubmVySFRNTCA9IGluaXRpYWxzO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgSFRNTFNjb3JlcykuaW5uZXJIVE1MID0gc2NvcmU7XG4gIH1cbn1cblxuZ2V0RnJvbVN0b3JhZ2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9pbmRleC5qcyIsImNsYXNzIFBhZGRsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLnkgPSA0NzU7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cbiAgZHJhdyhjb250ZXh0KSB7XG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG4gIGFuaW1hdGUoa2V5U3RhdGUpIHtcbiAgICBpZiAoa2V5U3RhdGVbMzddICYmIHRoaXMueCA+IDApIHtcbiAgICAgIHRoaXMueCAtPSA1O1xuICAgIH0gZWxzZSBpZiAoa2V5U3RhdGVbMzldICYmIHRoaXMueCA8IDcwMCkge1xuICAgICAgdGhpcy54ICs9IDU7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFkZGxlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9QYWRkbGUuanMiLCJjbGFzcyBLZXlib2FyZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5rZXlzID0ge1xuICAgICAgbGVmdDogMzcsXG4gICAgICByaWdodDogMzksXG4gICAgfVxuICB9XG4gIGtleURvd24oZSkge1xuICAgIHZhciBrZXlTdGF0ZSA9IHt9O1xuICAgIGtleVN0YXRlW2Uua2V5Q29kZV0gPSB0cnVlO1xuICAgIHJldHVybiBrZXlTdGF0ZTtcbiAgfTtcblxuICBrZXlVcChlKSB7XG4gICAgdmFyIGtleVN0YXRlID0ge307XG4gICAga2V5U3RhdGVbZS5rZXlDb2RlXSA9IGZhbHNlO1xuICAgIHJldHVybiBrZXlTdGF0ZTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2tleWJvYXJkZXIuanMiLCJjbGFzcyBCYWxsIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgZHgsIGR5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuZHggPSBkeDtcbiAgICB0aGlzLmR5ID0gZHk7XG4gICAgdGhpcy5yYWRpdXMgPSA1O1xuICAgIHRoaXMud2lkdGggPSB0aGlzLnJhZGl1cyAqIDI7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLnJhZGl1cyAqIDI7XG4gIH1cbiAgZHJhdyhjb250ZXh0KSB7XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIE1hdGguUEkgKiAyICxmYWxzZSk7XG4gICAgY29udGV4dC5zdHJva2UoKTtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgIGNvbnRleHQuZmlsbCgpO1xuICB9XG4gIG1vdmUoY2FudmFzSGVpZ2h0LCBjYW52YXNXaWR0aCkge1xuICAgIGlmICgodGhpcy54ICsgdGhpcy5yYWRpdXMpID49IGNhbnZhc1dpZHRoIHx8ICh0aGlzLnggLSB0aGlzLnJhZGl1cykgPD0gMCkge1xuICAgICAgdGhpcy5keCA9IC10aGlzLmR4O1xuICAgIH1cbiAgICBpZiAoKHRoaXMueSAtIHRoaXMucmFkaXVzKSA8PSAwKSB7XG4gICAgICB0aGlzLmR5ID0gLXRoaXMuZHk7XG4gICAgfVxuICAgIHRoaXMueSArPSB0aGlzLmR5O1xuICAgIHRoaXMueCArPSB0aGlzLmR4O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFsbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9iYWxsLmpzIiwiY2xhc3MgU2NvcmVzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5pbml0aWFscyA9ICdYWFgnO1xuICAgIHRoaXMuaWQgPSBEYXRlLm5vdygpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2NvcmVzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3Njb3Jlcy5qcyIsImNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihiYWxsLCBwYWRkbGUpIHtcbiAgICB0aGlzLmJyaWNrcyA9IFtdO1xuICAgIHRoaXMuZGlzY2FyZGVkQnJpY2tzID0gW107XG4gICAgdGhpcy5iYWxscyA9IFtiYWxsXTtcbiAgICB0aGlzLnBhZGRsZSA9IHBhZGRsZTtcbiAgICB0aGlzLmxldmVsID0gMTtcbiAgICB0aGlzLmxpdmVzID0gMztcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgfVxuXG4gIGNvbGxpc2lvbkNoZWNrKG9iajEsIG9iajIpIHtcbiAgICBpZiAob2JqMS54IDwgb2JqMi54ICsgb2JqMi53aWR0aCAgJiYgb2JqMS54ICsgb2JqMS53aWR0aCAgPiBvYmoyLnggJiZcbiAgICAgICAgb2JqMS55IDwgb2JqMi55ICsgb2JqMi5oZWlnaHQgJiYgb2JqMS55ICsgb2JqMS5oZWlnaHQgPiBvYmoyLnkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcGFkZGxlQmFsbENvbGxpZGluZyhiYWxsLCBwYWRkbGUpIHtcbiAgICBsZXQgYm9vbGVhbiA9IHRoaXMuY29sbGlzaW9uQ2hlY2soYmFsbCwgcGFkZGxlKTtcbiAgICBsZXQgZHkgPSBiYWxsLmR5O1xuICAgIGlmIChib29sZWFuID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZHkgPSAtZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkeTtcbiAgICB9XG4gIH1cblxuICBwYWRkbGVCYWxsWENoZWNrKGJhbGwsIHBhZGRsZSkge1xuICAgIGxldCBib29sZWFuID0gdGhpcy5jb2xsaXNpb25DaGVjayhiYWxsLCBwYWRkbGUpO1xuICAgIGxldCBwYWRkbGVGaXJzdEZpZnRoID0gcGFkZGxlLnggKyAocGFkZGxlLndpZHRoIC8gNSk7XG4gICAgbGV0IHBhZGRsZVNlY29uZEZpZnRoID0gcGFkZGxlLnggKyAoKHBhZGRsZS53aWR0aCAvIDUpICogMik7XG4gICAgbGV0IHBhZGRsZU1pZGRsZUZpZnRoID0gcGFkZGxlLnggKyAoKHBhZGRsZS53aWR0aCAvIDUpICogMyk7XG4gICAgbGV0IHBhZGRsZVRoaXJkRmlmdGggPSBwYWRkbGUueCArICgocGFkZGxlLndpZHRoIC8gNSkgKiA0KTtcbiAgICBsZXQgcGFkZGxlRm91cnRoRmlmdGggPSBwYWRkbGUueCArIHBhZGRsZS53aWR0aDtcbiAgICBpZiAoYm9vbGVhbiA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGJhbGwueCA8IHBhZGRsZUZpcnN0RmlmdGgpIHtcbiAgICAgICAgYmFsbC5keCAtPSAzO1xuICAgICAgfSBlbHNlIGlmIChiYWxsLnggPCBwYWRkbGVTZWNvbmRGaWZ0aCkge1xuICAgICAgICBiYWxsLmR4IC09IDE7XG4gICAgICB9IGVsc2UgaWYgKGJhbGwueCA8IHBhZGRsZVRoaXJkRmlmdGgpIHtcbiAgICAgICAgYmFsbC5keCArPSAxO1xuICAgICAgfSBlbHNlIGlmIChiYWxsLnggPCBwYWRkbGVGb3VydGhGaWZ0aCkge1xuICAgICAgICBiYWxsLmR4ICs9IDM7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChiYWxsLmR4ID4gMTApIHtcbiAgICAgIGJhbGwuZHggPSAxMDtcbiAgICB9IGVsc2UgaWYgKGJhbGwuZHggPCAtMTApIHtcbiAgICAgIGJhbGwuZHggPSAtMTA7XG4gICAgfVxuICAgIHJldHVybiBiYWxsLmR4XG4gIH1cblxuICBncmFiQnJpY2tzKGJyaWNrcykge1xuICAgIHRoaXMuYnJpY2tzLnB1c2goYnJpY2tzKTtcbiAgfVxuXG4gIGJyaWNrQmFsbENvbGxpZGluZyhiYWxsLCBicmlja3MpIHtcbiAgICBsZXQgZHkgPSBiYWxsLmR5O1xuICAgIGJyaWNrcy5mb3JFYWNoKGZ1bmN0aW9uKGJyaWNrKSB7XG4gICAgICBsZXQgaW5kZXggPSB0aGlzLmJyaWNrcy5pbmRleE9mKGJyaWNrKTtcbiAgICAgIGxldCBib29sZWFuID0gdGhpcy5jb2xsaXNpb25DaGVjayhiYWxsLCBicmljayk7XG4gICAgICBpZiAoYm9vbGVhbiA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnNjb3JlICs9IDEwMDtcbiAgICAgICAgaWYgKGJyaWNrLmhlYWx0aCA9PT0gMSl7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmJyaWNrcy5pbmRleE9mKGJyaWNrKTtcbiAgICAgICAgICAgIHRoaXMuZGlzY2FyZGVkQnJpY2tzID0gdGhpcy5icmlja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBicmljay5oZWFsdGgtLTtcbiAgICAgICAgaWYgKGJhbGwueCA8IChicmljay54ICsgYnJpY2sud2lkdGgpICYmIGJhbGwueCA+IGJyaWNrLngpIHtcbiAgICAgICAgICByZXR1cm4gZHkgPSAtZHk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGR5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB9LmJpbmQodGhpcykpXG4gICAgcmV0dXJuIGR5O1xuICB9XG5cbiAgY2hlY2tCcmlja3MoKSB7XG4gICAgaWYgKHRoaXMuYnJpY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5sZXZlbCsrO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgYnJpY2tCYWxsU2lkZUNvbGxpc2lvbihiYWxsLCBicmlja3MpIHtcbiAgICBicmlja3MuZm9yRWFjaChmdW5jdGlvbihicmljaykge1xuICAgICAgbGV0IGJvb2xlYW4gPSB0aGlzLmNvbGxpc2lvbkNoZWNrKGJhbGwsIGJyaWNrKTtcbiAgICAgIGlmIChib29sZWFuID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChiYWxsLnggPD0gYnJpY2sueCB8fCBiYWxsLnggPj0gKGJyaWNrLnggKyBicmljay53aWR0aCkpIHtcbiAgICAgICAgICBiYWxsLmR4ID0gLWJhbGwuZHg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpXG4gICAgcmV0dXJuIGJhbGwuZHg7XG4gIH1cblxuICBjaGVja0JhbGxEZWF0aChiYWxsLCBjYW52YXNIZWlnaHQpIHtcbiAgICBpZiAoYmFsbC55ID49IGNhbnZhc0hlaWdodCkge1xuICAgICAgdGhpcy5saXZlcyAtPSAxO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0dhbWUuanMiLCJjbGFzcyBCcmljayB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGZpbGxTdHlsZSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmhlYWx0aCA9IDE7XG4gICAgdGhpcy53aWR0aCA9IDc1O1xuICAgIHRoaXMuaGVpZ2h0ID0gMjU7XG4gICAgdGhpcy5icmlja3MgPSBbXTtcbiAgfVxuXG4gIGNyZWF0ZUJyaWNrcyhudW1Ccmlja3MsIGxldmVsKSB7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG51bUJyaWNrczsgaSsrKSB7XG4gICAgICBpZiAoaSA8PSA5KSB7XG4gICAgICAgIGxldCB4ID0gMi41ICsgKGkgKiA3NSkgKyAoaSAqIDUpO1xuICAgICAgICBsZXQgeSA9ICgxNSk7XG4gICAgICAgIHRoaXMuYnJpY2tzLnB1c2gobmV3IEJyaWNrKHgsIHkpKTtcbiAgICAgIH0gZWxzZSBpZiAoaSA8PSAxOSkge1xuICAgICAgICBsZXQgeCA9IDIuNSArICgoaSAtIDEwKSAqIDc1KSArICgoaSAtIDEwKSAqIDUpO1xuICAgICAgICBsZXQgeSA9ICg0NSk7XG4gICAgICAgIHRoaXMuYnJpY2tzLnB1c2gobmV3IEJyaWNrKHgsIHkpKTtcbiAgICAgIH0gZWxzZSBpZiAoaSA8PSAyOSkge1xuICAgICAgICBsZXQgeCA9IDIuNSArICgoaSAtIDIwKSAqIDc1KSArICgoaSAtIDIwKSAqIDUpO1xuICAgICAgICBsZXQgeSA9ICg3NSk7XG4gICAgICAgIHRoaXMuYnJpY2tzLnB1c2gobmV3IEJyaWNrKHgsIHkpKTtcbiAgICAgIH0gZWxzZSBpZiAoaSA8PSAzOSkge1xuICAgICAgICBsZXQgeCA9IDIuNSArICgoaSAtIDMwKSAqIDc1KSArICgoaSAtIDMwKSAqIDUpO1xuICAgICAgICBsZXQgeSA9ICgxMDUpO1xuICAgICAgICBpZiAobGV2ZWwgPT09IDIpIHtcbiAgICAgICAgICBsZXQgaGVhbHRoID0gMjtcbiAgICAgICAgICB0aGlzLmJyaWNrcy5wdXNoKG5ldyBTdHJvbmdlckJyaWNrKHgsIHksIGhlYWx0aCkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYnJpY2tzO1xuICB9XG5cbiAgY2xlYXJCcmlja3MoKSB7XG4gICAgdGhpcy5icmlja3MgPSBbXTtcbiAgICByZXR1cm4gdGhpcy5icmlja3M7XG4gIH1cblxuICBkcmF3KGNvbnRleHQsIGJyaWNrcykge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBicmlja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IGJyaWNrc1tpXTtcbiAgICAgIGlmIChicmlja3NbaV0uaGVhbHRoID09PSAyKSB7XG4gICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjMzYwNjAwJ1xuICAgIH0gZWxzZSBpZiAoYnJpY2tzW2ldLmhlYWx0aCA9PT0gMSkge1xuICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnI0ZDMDAwOSdcbiAgICB9XG4gICAgICBjb250ZXh0LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBTdHJvbmdlckJyaWNrIGV4dGVuZHMgQnJpY2sge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBoZWFsdGgsIGZpbGxTdHlsZSkge1xuICAgIHN1cGVyKHgsIHkpO1xuICAgIHRoaXMuaGVhbHRoID0gaGVhbHRoO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnJpY2s7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvYnJpY2tzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==