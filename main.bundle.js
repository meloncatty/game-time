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
	var bricksDesired = 40;
	
	function generateBricks() {
	  if (newGame.level === 1) {
	    var newBricks = bricks.createBricks(bricksDesired);
	    newBricks.forEach(function (brick) {
	      return newGame.grabBricks(brick);
	    });
	  } else {
	    var _newBricks = bricks.createBricks(bricksDesired);
	    _newBricks.forEach(function (brick) {
	      return newGame.grabBricks(brick);
	    });
	  }
	};
	
	generateBricks();
	
	window.addEventListener('keydown', function (e) {
	  keyState = keyboardMonitor.keyDown(e);
	});
	
	window.addEventListener('keyup', function (e) {
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
	  if (newGame.lives === 0) {
	    // newGame = new Game(bouncyBall, startPaddle);
	    bricks = new Brick();
	    bricks.draw(ctx, newGame.bricks);
	  } else {
	    bricks.draw(ctx, newGame.bricks);
	  }
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
	  bouncyBall = new Ball(400, 200, Math.random() * 3 - 1.5, 4);
	  startPaddle = new Paddle(350, 100, 15);
	  startPaddle.draw(ctx);
	  bouncyBall.draw(ctx);
	  // bricks.draw(ctx, newGame.bricks);
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
	    newGame.lives = 3;
	    console.log(newGame.bricks);
	    document.getElementById('user-score').innerHTML = 0;
	    newGame.score = 0;
	    userScores.initials = prompt('Enter your initials!', 'XXX');
	    userScores.score = newGame.score;
	    scoreToStorage(userScores);
	    getFromStorage(userScores);
	    newGame.lives = 3;
	  }
	}
	
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
	        this.x -= 4;
	      } else if (keyState[39] && this.x < 700) {
	        this.x += 4;
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
	    key: "grabBricks",
	    value: function grabBricks(bricks) {
	      this.bricks.push(bricks);
	    }
	  }, {
	    key: "brickBallColliding",
	    value: function brickBallColliding(ball, bricks) {
	      var dy = ball.dy;
	      bricks.forEach(function (brick) {
	        var boolean = this.collisionCheck(ball, brick);
	        if (boolean === true) {
	          this.score += 100;
	          var index = this.bricks.indexOf(brick);
	          this.discardedBricks = this.bricks.splice(index, 1);
	          return dy = -dy;
	        } else {
	          return dy;
	        }
	      }.bind(this));
	      return dy;
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

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Brick = function () {
	  function Brick(x, y) {
	    _classCallCheck(this, Brick);
	
	    this.x = x;
	    this.y = y;
	    this.width = 75;
	    this.height = 25;
	    this.bricks = [];
	  }
	
	  _createClass(Brick, [{
	    key: "createBricks",
	    value: function createBricks(numBricks) {
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
	          this.bricks.push(new Brick(_x3, _y3));
	        }
	      }
	      return this.bricks;
	    }
	  }, {
	    key: "draw",
	    value: function draw(context, bricks) {
	      for (var i = 0; i < bricks.length; i++) {
	        var _bricks$i = bricks[i],
	            x = _bricks$i.x,
	            y = _bricks$i.y,
	            width = _bricks$i.width,
	            height = _bricks$i.height;
	
	        context.fillRect(x, y, width, height);
	      }
	    }
	  }]);
	
	  return Brick;
	}();
	
	// class StrongerBrick extends Brick {
	//   constructor(x, y, health) {
	//     super(x, y);
	//     this.health = health;
	//   }
	// }
	
	module.exports = Brick;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjQ3ZGQ0ZWFmNjUwNjBiNTJmZDUiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9QYWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2tleWJvYXJkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3Njb3Jlcy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvR2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYnJpY2tzLmpzIl0sIm5hbWVzIjpbImNhbnZhcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImN0eCIsImdldENvbnRleHQiLCJQYWRkbGUiLCJyZXF1aXJlIiwic3RhcnRQYWRkbGUiLCJLZXlib2FyZGVyIiwiQmFsbCIsIlNjb3JlcyIsImtleWJvYXJkTW9uaXRvciIsImJvdW5jeUJhbGwiLCJNYXRoIiwicmFuZG9tIiwia2V5U3RhdGUiLCJHYW1lIiwibmV3R2FtZSIsIkJyaWNrIiwiYnJpY2tzIiwicmVxdWVzdElEIiwidW5kZWZpbmVkIiwiaXNEZWFkIiwiYnJpY2tzRGVzaXJlZCIsImdlbmVyYXRlQnJpY2tzIiwibGV2ZWwiLCJuZXdCcmlja3MiLCJjcmVhdGVCcmlja3MiLCJmb3JFYWNoIiwiZ3JhYkJyaWNrcyIsImJyaWNrIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlEb3duIiwia2V5VXAiLCJnYW1lTG9vcCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic2NvcmUiLCJsaXZlcyIsImZpbGxTdHlsZSIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiZHJhdyIsImR5IiwicGFkZGxlQmFsbENvbGxpZGluZyIsImJyaWNrQmFsbENvbGxpZGluZyIsIm1vdmUiLCJhbmltYXRlIiwiY2hlY2tCYWxsRGVhdGgiLCJiYWxsRGVhdGgiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzdGFydEdhbWUiLCJkZWxheWVkU3RhcnQiLCJlbmRHYW1lIiwic2V0VGltZW91dCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibGl2ZXNJbmRpY2F0b3IiLCJpbm5lclRleHQiLCJ1c2VyU2NvcmVzIiwiY29uc29sZSIsImxvZyIsImluaXRpYWxzIiwicHJvbXB0Iiwic2NvcmVUb1N0b3JhZ2UiLCJnZXRGcm9tU3RvcmFnZSIsInNjb3JlcyIsInN0b3JlU2NvcmVzIiwic3RyaW5naWZ5U2NvcmVzIiwiSlNPTiIsInN0cmluZ2lmeSIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJpZCIsInRvcFNjb3JlcyIsImkiLCJsZW5ndGgiLCJyZXRyaWV2ZWRJdGVtIiwiZ2V0SXRlbSIsImtleSIsInBhcnNlZEl0ZW0iLCJwYXJzZSIsInB1c2giLCJzb3J0IiwiYSIsImIiLCJzcGxpY2UiLCJIVE1MSW5pdGlhbHMiLCJIVE1MU2NvcmVzIiwieCIsInkiLCJjb250ZXh0IiwiZmlsbFJlY3QiLCJtb2R1bGUiLCJleHBvcnRzIiwia2V5cyIsImxlZnQiLCJyaWdodCIsImtleUNvZGUiLCJkeCIsInJhZGl1cyIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwic3Ryb2tlIiwiZmlsbCIsImNhbnZhc0hlaWdodCIsImNhbnZhc1dpZHRoIiwiRGF0ZSIsIm5vdyIsImJhbGwiLCJwYWRkbGUiLCJkaXNjYXJkZWRCcmlja3MiLCJiYWxscyIsIm9iajEiLCJvYmoyIiwiYm9vbGVhbiIsImNvbGxpc2lvbkNoZWNrIiwiaW5kZXgiLCJpbmRleE9mIiwiYmluZCIsIm51bUJyaWNrcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxLQUFNQSxT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MEUsTyxFQUFTMUUsTSxFQUFRO0FBQ3BCLFlBQUksSUFBSTBELElBQUksQ0FBWixFQUFlQSxJQUFJMUQsT0FBTzJELE1BQTFCLEVBQWtDRCxHQUFsQyxFQUF1QztBQUFBLHlCQUNQMUQsT0FBTzBELENBQVAsQ0FETztBQUFBLGFBQzlCYyxDQUQ4QixhQUM5QkEsQ0FEOEI7QUFBQSxhQUMzQkMsQ0FEMkIsYUFDM0JBLENBRDJCO0FBQUEsYUFDeEJqRCxLQUR3QixhQUN4QkEsS0FEd0I7QUFBQSxhQUNqQkMsTUFEaUIsYUFDakJBLE1BRGlCOztBQUVyQ2lELGlCQUFRQyxRQUFSLENBQWlCSCxDQUFqQixFQUFvQkMsQ0FBcEIsRUFBdUJqRCxLQUF2QixFQUE4QkMsTUFBOUI7QUFDRDtBQUNGOzs7Ozs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFtRCxRQUFPQyxPQUFQLEdBQWlCOUUsS0FBakIsQyIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI0N2RkNGVhZjY1MDYwYjUyZmQ1IiwiY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtc2NyZWVuJyk7XG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5jb25zdCBQYWRkbGUgPSByZXF1aXJlKCcuL1BhZGRsZScpO1xubGV0IHN0YXJ0UGFkZGxlID0gbmV3IFBhZGRsZSgzNTAsIDEwMCwgMTUpO1xuY29uc3QgS2V5Ym9hcmRlciA9IHJlcXVpcmUoJy4va2V5Ym9hcmRlcicpO1xuY29uc3QgQmFsbCA9IHJlcXVpcmUoJy4vYmFsbC5qcycpO1xuY29uc3QgU2NvcmVzID0gcmVxdWlyZSgnLi9zY29yZXMuanMnKTtcbmxldCBrZXlib2FyZE1vbml0b3IgPSBuZXcgS2V5Ym9hcmRlcigpO1xubGV0IGJvdW5jeUJhbGwgPSBuZXcgQmFsbCg0MDAsIDIwMCwgKChNYXRoLnJhbmRvbSgpICogMykgLTEuNSksIDQpO1xubGV0IGtleVN0YXRlID0ge307XG5jb25zdCBHYW1lID0gcmVxdWlyZSgnLi9HYW1lJyk7XG5jb25zdCBuZXdHYW1lID0gbmV3IEdhbWUoYm91bmN5QmFsbCwgc3RhcnRQYWRkbGUpO1xuY29uc3QgQnJpY2sgPSByZXF1aXJlKCcuL2JyaWNrcy5qcycpO1xubGV0IGJyaWNrcyA9IG5ldyBCcmljaygpO1xubGV0IHJlcXVlc3RJRCA9IHVuZGVmaW5lZDtcbmxldCBpc0RlYWQgPSBudWxsO1xubGV0IGJyaWNrc0Rlc2lyZWQgPSA0MDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVCcmlja3MoKSB7XG4gIGlmIChuZXdHYW1lLmxldmVsID09PSAxKSB7XG4gICAgbGV0IG5ld0JyaWNrcyA9IGJyaWNrcy5jcmVhdGVCcmlja3MoYnJpY2tzRGVzaXJlZCk7XG4gICAgbmV3QnJpY2tzLmZvckVhY2goIGJyaWNrID0+IG5ld0dhbWUuZ3JhYkJyaWNrcyhicmljaykgKVxuICB9IGVsc2Uge1xuICAgIGxldCBuZXdCcmlja3MgPSBicmlja3MuY3JlYXRlQnJpY2tzKGJyaWNrc0Rlc2lyZWQpO1xuICAgIG5ld0JyaWNrcy5mb3JFYWNoKCBicmljayA9PiBuZXdHYW1lLmdyYWJCcmlja3MoYnJpY2spIClcbiAgfVxufTtcblxuZ2VuZXJhdGVCcmlja3MoKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gIGtleVN0YXRlID0ga2V5Ym9hcmRNb25pdG9yLmtleURvd24oZSk7XG59KTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICBrZXlTdGF0ZSA9IGtleWJvYXJkTW9uaXRvci5rZXlVcChlKTtcbn0pO1xuXG5mdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItc2NvcmUnKS5pbm5lckhUTUwgPSBuZXdHYW1lLnNjb3JlO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGl2ZXMtaW5kaWNhdG9yJykuaW5uZXJIVE1MID0gbmV3R2FtZS5saXZlcztcbiAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICBzdGFydFBhZGRsZS5kcmF3KGN0eCk7XG4gIGJvdW5jeUJhbGwuZHJhdyhjdHgpO1xuICBib3VuY3lCYWxsLmR5ID0gbmV3R2FtZS5wYWRkbGVCYWxsQ29sbGlkaW5nKGJvdW5jeUJhbGwsIHN0YXJ0UGFkZGxlKTtcbiAgYm91bmN5QmFsbC5keSA9IG5ld0dhbWUuYnJpY2tCYWxsQ29sbGlkaW5nKGJvdW5jeUJhbGwsIG5ld0dhbWUuYnJpY2tzKTtcbiAgaWYobmV3R2FtZS5saXZlcyA9PT0gMCkge1xuICAgIC8vIG5ld0dhbWUgPSBuZXcgR2FtZShib3VuY3lCYWxsLCBzdGFydFBhZGRsZSk7XG4gICAgYnJpY2tzID0gbmV3IEJyaWNrKCk7XG4gICAgYnJpY2tzLmRyYXcoY3R4LCBuZXdHYW1lLmJyaWNrcyk7XG4gIH0gZWxzZSB7XG4gICAgYnJpY2tzLmRyYXcoY3R4LCBuZXdHYW1lLmJyaWNrcyk7XG4gIH1cbiAgYm91bmN5QmFsbC5tb3ZlKGNhbnZhcy5oZWlnaHQsIGNhbnZhcy53aWR0aCk7XG4gIHN0YXJ0UGFkZGxlLmFuaW1hdGUoa2V5U3RhdGUpO1xuICBpc0RlYWQgPSBuZXdHYW1lLmNoZWNrQmFsbERlYXRoKGJvdW5jeUJhbGwsIGNhbnZhcy5oZWlnaHQpO1xuICBpZiAoaXNEZWFkKSB7XG4gICAgYmFsbERlYXRoKCk7XG4gIH0gZWxzZSB7XG4gICAgcmVxdWVzdElEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbiAgfVxufTtcblxuc3RhcnRHYW1lKCk7XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICBib3VuY3lCYWxsID0gbmV3IEJhbGwoNDAwLCAyMDAsICgoTWF0aC5yYW5kb20oKSAqIDMpIC0xLjUpLCA0KTtcbiAgc3RhcnRQYWRkbGUgPSBuZXcgUGFkZGxlKDM1MCwgMTAwLCAxNSk7XG4gIHN0YXJ0UGFkZGxlLmRyYXcoY3R4KTtcbiAgYm91bmN5QmFsbC5kcmF3KGN0eCk7XG4gIC8vIGJyaWNrcy5kcmF3KGN0eCwgbmV3R2FtZS5icmlja3MpO1xuICBkZWxheWVkU3RhcnQoKTtcbiAgZW5kR2FtZSgpO1xufVxuXG5mdW5jdGlvbiBkZWxheWVkU3RhcnQoKSB7XG4gIGlmKCFyZXF1ZXN0SUQpIHtcbiAgICB3aW5kb3cuc2V0VGltZW91dChnYW1lTG9vcCwgMzAwMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYmFsbERlYXRoKCkge1xuICBpZihyZXF1ZXN0SUQpIHtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUocmVxdWVzdElEKTtcbiAgICByZXF1ZXN0SUQgPSBudWxsO1xuICAgIGlzRGVhZCA9IGZhbHNlO1xuICAgIHZhciBsaXZlc0luZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXZlcy1pbmRpY2F0b3InKTtcbiAgICBsaXZlc0luZGljYXRvci5pbm5lclRleHQgPSBuZXdHYW1lLmxpdmVzO1xuICAgIHN0YXJ0R2FtZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuZEdhbWUoKSB7XG4gIHZhciB1c2VyU2NvcmVzID0gbmV3IFNjb3JlcygpO1xuICBpZihuZXdHYW1lLmxpdmVzID09PSAwKSB7XG4gICAgbmV3R2FtZS5saXZlcyA9IDM7XG4gICAgY29uc29sZS5sb2cobmV3R2FtZS5icmlja3MpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLXNjb3JlJykuaW5uZXJIVE1MID0gMDtcbiAgICBuZXdHYW1lLnNjb3JlID0gMDtcbiAgICB1c2VyU2NvcmVzLmluaXRpYWxzID0gcHJvbXB0KCdFbnRlciB5b3VyIGluaXRpYWxzIScsICdYWFgnKTtcbiAgICB1c2VyU2NvcmVzLnNjb3JlID0gbmV3R2FtZS5zY29yZTtcbiAgICBzY29yZVRvU3RvcmFnZSh1c2VyU2NvcmVzKTtcbiAgICBnZXRGcm9tU3RvcmFnZSh1c2VyU2NvcmVzKTtcbiAgICBuZXdHYW1lLmxpdmVzID0gMztcbiAgfVxufVxuXG5mdW5jdGlvbiBzY29yZVRvU3RvcmFnZShzY29yZXMpIHtcbiAgdmFyIHN0b3JlU2NvcmVzID0gc2NvcmVzO1xuICB2YXIgc3RyaW5naWZ5U2NvcmVzID0gSlNPTi5zdHJpbmdpZnkoc3RvcmVTY29yZXMpO1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzY29yZXMuaWQsIHN0cmluZ2lmeVNjb3Jlcyk7XG59XG5cbmZ1bmN0aW9uIGdldEZyb21TdG9yYWdlKHNjb3Jlcykge1xuICBsZXQgdG9wU2NvcmVzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYWxTdG9yYWdlLmxlbmd0aDsgaSsrKXtcbiAgICBsZXQgcmV0cmlldmVkSXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsU3RvcmFnZS5rZXkoaSkpO1xuICAgIGxldCBwYXJzZWRJdGVtID0gSlNPTi5wYXJzZShyZXRyaWV2ZWRJdGVtKTtcbiAgICB0b3BTY29yZXMucHVzaChwYXJzZWRJdGVtKTtcbiAgfVxuICB0b3BTY29yZXMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGIuc2NvcmUgLSBhLnNjb3JlO1xuICB9KVxuICB0b3BTY29yZXMuc3BsaWNlKDEwLCAxMDAwKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3BTY29yZXMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgaW5pdGlhbHMgPSB0b3BTY29yZXNbaV0uaW5pdGlhbHM7XG4gICAgbGV0IHNjb3JlID0gdG9wU2NvcmVzW2ldLnNjb3JlO1xuICAgIGxldCBIVE1MSW5pdGlhbHMgPSAnaGlnaC1pbml0aWFscy0nICsgKGkgKyAxKTtcbiAgICBsZXQgSFRNTFNjb3JlcyA9ICdoaWdoLXNjb3JlLScgKyAoaSArIDEpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgSFRNTEluaXRpYWxzKS5pbm5lckhUTUwgPSBpbml0aWFscztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIEhUTUxTY29yZXMpLmlubmVySFRNTCA9IHNjb3JlO1xuICB9XG59XG5cbmdldEZyb21TdG9yYWdlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvaW5kZXguanMiLCJjbGFzcyBQYWRkbGUge1xuICBjb25zdHJ1Y3Rvcih4LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy55ID0gNDc1O1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG4gIGRyYXcoY29udGV4dCkge1xuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuICBhbmltYXRlKGtleVN0YXRlKSB7XG4gICAgaWYgKGtleVN0YXRlWzM3XSAmJiB0aGlzLnggPiAwKSB7XG4gICAgICB0aGlzLnggLT0gNDtcbiAgICB9IGVsc2UgaWYgKGtleVN0YXRlWzM5XSAmJiB0aGlzLnggPCA3MDApIHtcbiAgICAgIHRoaXMueCArPSA0O1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZGRsZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvUGFkZGxlLmpzIiwiY2xhc3MgS2V5Ym9hcmRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMua2V5cyA9IHtcbiAgICAgIGxlZnQ6IDM3LFxuICAgICAgcmlnaHQ6IDM5LFxuICAgIH1cbiAgfVxuICBrZXlEb3duKGUpIHtcbiAgICB2YXIga2V5U3RhdGUgPSB7fTtcbiAgICBrZXlTdGF0ZVtlLmtleUNvZGVdID0gdHJ1ZTtcbiAgICByZXR1cm4ga2V5U3RhdGU7XG4gIH07XG5cbiAga2V5VXAoZSkge1xuICAgIHZhciBrZXlTdGF0ZSA9IHt9O1xuICAgIGtleVN0YXRlW2Uua2V5Q29kZV0gPSBmYWxzZTtcbiAgICByZXR1cm4ga2V5U3RhdGU7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9rZXlib2FyZGVyLmpzIiwiY2xhc3MgQmFsbCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGR4LCBkeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmR4ID0gZHg7XG4gICAgdGhpcy5keSA9IGR5O1xuICAgIHRoaXMucmFkaXVzID0gNTtcbiAgICB0aGlzLndpZHRoID0gdGhpcy5yYWRpdXMgKiAyO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5yYWRpdXMgKiAyO1xuICB9XG4gIGRyYXcoY29udGV4dCkge1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMiAsZmFsc2UpO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICBjb250ZXh0LmZpbGwoKTtcbiAgfVxuICBtb3ZlKGNhbnZhc0hlaWdodCwgY2FudmFzV2lkdGgpIHtcbiAgICBpZiAoKHRoaXMueCArIHRoaXMucmFkaXVzKSA+PSBjYW52YXNXaWR0aCB8fCAodGhpcy54IC0gdGhpcy5yYWRpdXMpIDw9IDApIHtcbiAgICAgIHRoaXMuZHggPSAtdGhpcy5keDtcbiAgICB9XG4gICAgaWYgKCh0aGlzLnkgLSB0aGlzLnJhZGl1cykgPD0gMCkge1xuICAgICAgdGhpcy5keSA9IC10aGlzLmR5O1xuICAgIH1cbiAgICB0aGlzLnkgKz0gdGhpcy5keTtcbiAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhbGw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvYmFsbC5qcyIsImNsYXNzIFNjb3JlcyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgIHRoaXMuaW5pdGlhbHMgPSAnWFhYJztcbiAgICB0aGlzLmlkID0gRGF0ZS5ub3coKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjb3JlcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9zY29yZXMuanMiLCJjbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoYmFsbCwgcGFkZGxlKSB7XG4gICAgdGhpcy5icmlja3MgPSBbXTtcbiAgICB0aGlzLmRpc2NhcmRlZEJyaWNrcyA9IFtdO1xuICAgIHRoaXMuYmFsbHMgPSBbYmFsbF07XG4gICAgdGhpcy5wYWRkbGUgPSBwYWRkbGU7XG4gICAgdGhpcy5sZXZlbCA9IDE7XG4gICAgdGhpcy5saXZlcyA9IDM7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gIH1cblxuICBjb2xsaXNpb25DaGVjayhvYmoxLCBvYmoyKSB7XG4gICAgaWYgKG9iajEueCA8IG9iajIueCArIG9iajIud2lkdGggICYmIG9iajEueCArIG9iajEud2lkdGggID4gb2JqMi54ICYmXG4gICAgICAgIG9iajEueSA8IG9iajIueSArIG9iajIuaGVpZ2h0ICYmIG9iajEueSArIG9iajEuaGVpZ2h0ID4gb2JqMi55KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHBhZGRsZUJhbGxDb2xsaWRpbmcoYmFsbCwgcGFkZGxlKSB7XG4gICAgdmFyIGJvb2xlYW4gPSB0aGlzLmNvbGxpc2lvbkNoZWNrKGJhbGwsIHBhZGRsZSk7XG4gICAgdmFyIGR5ID0gYmFsbC5keTtcbiAgICBpZiAoYm9vbGVhbiA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGR5ID0gLWR5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZHk7XG4gICAgfVxuICB9XG5cbiAgZ3JhYkJyaWNrcyhicmlja3MpIHtcbiAgICB0aGlzLmJyaWNrcy5wdXNoKGJyaWNrcyk7XG4gIH1cblxuICBicmlja0JhbGxDb2xsaWRpbmcoYmFsbCwgYnJpY2tzKSB7XG4gICAgdmFyIGR5ID0gYmFsbC5keTtcbiAgICBicmlja3MuZm9yRWFjaChmdW5jdGlvbihicmljaykge1xuICAgICAgdmFyIGJvb2xlYW4gPSB0aGlzLmNvbGxpc2lvbkNoZWNrKGJhbGwsIGJyaWNrKTtcbiAgICAgIGlmIChib29sZWFuID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gMTAwO1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmJyaWNrcy5pbmRleE9mKGJyaWNrKTtcbiAgICAgICAgdGhpcy5kaXNjYXJkZWRCcmlja3MgPSB0aGlzLmJyaWNrcy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgIHJldHVybiBkeSA9IC1keTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkeTtcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpXG4gICAgcmV0dXJuIGR5O1xuICB9XG5cbiAgY2hlY2tCYWxsRGVhdGgoYmFsbCwgY2FudmFzSGVpZ2h0KSB7XG4gICAgaWYgKGJhbGwueSA+PSBjYW52YXNIZWlnaHQpIHtcbiAgICAgIHRoaXMubGl2ZXMgLT0gMTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9HYW1lLmpzIiwiY2xhc3MgQnJpY2sge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMud2lkdGggPSA3NTtcbiAgICB0aGlzLmhlaWdodCA9IDI1O1xuICAgIHRoaXMuYnJpY2tzID0gW107XG4gIH1cblxuICBjcmVhdGVCcmlja3MobnVtQnJpY2tzKSB7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG51bUJyaWNrczsgaSsrKSB7XG4gICAgICBpZiAoaSA8PSA5KSB7XG4gICAgICAgIGxldCB4ID0gMi41ICsgKGkgKiA3NSkgKyAoaSAqIDUpO1xuICAgICAgICBsZXQgeSA9ICgxNSk7XG4gICAgICAgIHRoaXMuYnJpY2tzLnB1c2gobmV3IEJyaWNrKHgsIHkpKTtcbiAgICAgIH0gZWxzZSBpZiAoaSA8PSAxOSkge1xuICAgICAgICBsZXQgeCA9IDIuNSArICgoaSAtIDEwKSAqIDc1KSArICgoaSAtIDEwKSAqIDUpO1xuICAgICAgICBsZXQgeSA9ICg0NSk7XG4gICAgICAgIHRoaXMuYnJpY2tzLnB1c2gobmV3IEJyaWNrKHgsIHkpKTtcbiAgICAgIH0gZWxzZSBpZiAoaSA8PSAyOSkge1xuICAgICAgICBsZXQgeCA9IDIuNSArICgoaSAtIDIwKSAqIDc1KSArICgoaSAtIDIwKSAqIDUpO1xuICAgICAgICBsZXQgeSA9ICg3NSk7XG4gICAgICAgIHRoaXMuYnJpY2tzLnB1c2gobmV3IEJyaWNrKHgsIHkpKTtcbiAgICAgIH0gZWxzZSBpZiAoaSA8PSAzOSkge1xuICAgICAgICBsZXQgeCA9IDIuNSArICgoaSAtIDMwKSAqIDc1KSArICgoaSAtIDMwKSAqIDUpO1xuICAgICAgICBsZXQgeSA9ICgxMDUpO1xuICAgICAgICB0aGlzLmJyaWNrcy5wdXNoKG5ldyBCcmljayh4LCB5KSk7XG4gICAgICB9IFxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5icmlja3M7XG4gIH1cblxuICBkcmF3KGNvbnRleHQsIGJyaWNrcykge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBicmlja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IGJyaWNrc1tpXTtcbiAgICAgIGNvbnRleHQuZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICB9XG59XG5cbi8vIGNsYXNzIFN0cm9uZ2VyQnJpY2sgZXh0ZW5kcyBCcmljayB7XG4vLyAgIGNvbnN0cnVjdG9yKHgsIHksIGhlYWx0aCkge1xuLy8gICAgIHN1cGVyKHgsIHkpO1xuLy8gICAgIHRoaXMuaGVhbHRoID0gaGVhbHRoO1xuLy8gICB9XG4vLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gQnJpY2s7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvYnJpY2tzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==