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
	  return (/[a-z]/g.test(s) ? 'N/A' : s.slice(0, 3).toUpperCase()
	  );
	};
	
	function scoreToStorage(scores) {
	  var storeScores = scores;
	  var stringifyScores = JSON.stringify(storeScores);
	  localStorage.setItem(scores.id, stringifyScores);
	}
	debugger;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTY4OGU3ZTA4N2FhYTQ1ZjhjN2MiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9QYWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2tleWJvYXJkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3Njb3Jlcy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvR2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYnJpY2tzLmpzIl0sIm5hbWVzIjpbImNhbnZhcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImN0eCIsImdldENvbnRleHQiLCJQYWRkbGUiLCJyZXF1aXJlIiwic3RhcnRQYWRkbGUiLCJLZXlib2FyZGVyIiwiQmFsbCIsIlNjb3JlcyIsImtleWJvYXJkTW9uaXRvciIsImJvdW5jeUJhbGwiLCJNYXRoIiwicmFuZG9tIiwia2V5U3RhdGUiLCJHYW1lIiwibmV3R2FtZSIsIkJyaWNrIiwiYnJpY2tzIiwicmVxdWVzdElEIiwidW5kZWZpbmVkIiwiaXNEZWFkIiwiYnJpY2tzRGVzaXJlZCIsImdlbmVyYXRlQnJpY2tzIiwibGV2ZWwiLCJuZXdCcmlja3MiLCJjcmVhdGVCcmlja3MiLCJmb3JFYWNoIiwiZ3JhYkJyaWNrcyIsImJyaWNrIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlEb3duIiwia2V5VXAiLCJnYW1lTG9vcCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic2NvcmUiLCJsaXZlcyIsImZpbGxTdHlsZSIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiZHJhdyIsImR5IiwicGFkZGxlQmFsbENvbGxpZGluZyIsImJyaWNrQmFsbENvbGxpZGluZyIsIm1vdmUiLCJhbmltYXRlIiwiY2hlY2tCYWxsRGVhdGgiLCJiYWxsRGVhdGgiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzdGFydEdhbWUiLCJkZWxheWVkU3RhcnQiLCJlbmRHYW1lIiwic2V0VGltZW91dCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibGl2ZXNJbmRpY2F0b3IiLCJpbm5lclRleHQiLCJ1c2VyU2NvcmVzIiwiaW5pdGlhbHMiLCJwcm9tcHQiLCJjb25zb2xlIiwibG9nIiwiY2hlY2tJbml0aWFscyIsInNjb3JlVG9TdG9yYWdlIiwiZ2V0RnJvbVN0b3JhZ2UiLCJ0ZXN0IiwicyIsInNsaWNlIiwidG9VcHBlckNhc2UiLCJzY29yZXMiLCJzdG9yZVNjb3JlcyIsInN0cmluZ2lmeVNjb3JlcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiaWQiLCJ0b3BTY29yZXMiLCJpIiwibGVuZ3RoIiwicmV0cmlldmVkSXRlbSIsImdldEl0ZW0iLCJrZXkiLCJwYXJzZWRJdGVtIiwicGFyc2UiLCJwdXNoIiwic29ydCIsImEiLCJiIiwic3BsaWNlIiwiSFRNTEluaXRpYWxzIiwiSFRNTFNjb3JlcyIsIngiLCJ5IiwiY29udGV4dCIsImZpbGxSZWN0IiwibW9kdWxlIiwiZXhwb3J0cyIsImtleXMiLCJsZWZ0IiwicmlnaHQiLCJrZXlDb2RlIiwiZHgiLCJyYWRpdXMiLCJiZWdpblBhdGgiLCJhcmMiLCJQSSIsInN0cm9rZSIsImZpbGwiLCJjYW52YXNIZWlnaHQiLCJjYW52YXNXaWR0aCIsIkRhdGUiLCJub3ciLCJiYWxsIiwicGFkZGxlIiwiZGlzY2FyZGVkQnJpY2tzIiwiYmFsbHMiLCJvYmoxIiwib2JqMiIsImJvb2xlYW4iLCJjb2xsaXNpb25DaGVjayIsImluZGV4IiwiaW5kZXhPZiIsImJpbmQiLCJudW1Ccmlja3MiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVB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LGVBQUllLE1BQUssR0FBVDtBQUNBLGdCQUFLOUUsTUFBTCxDQUFZc0UsSUFBWixDQUFpQixJQUFJdkUsS0FBSixDQUFVOEUsR0FBVixFQUFhQyxHQUFiLENBQWpCO0FBQ0Q7QUFDRjtBQUNELGNBQU8sS0FBSzlFLE1BQVo7QUFDRDs7OzBCQUVJK0UsTyxFQUFTL0UsTSxFQUFRO0FBQ3BCLFlBQUksSUFBSStELElBQUksQ0FBWixFQUFlQSxJQUFJL0QsT0FBT2dFLE1BQTFCLEVBQWtDRCxHQUFsQyxFQUF1QztBQUFBLHlCQUNQL0QsT0FBTytELENBQVAsQ0FETztBQUFBLGFBQzlCYyxDQUQ4QixhQUM5QkEsQ0FEOEI7QUFBQSxhQUMzQkMsQ0FEMkIsYUFDM0JBLENBRDJCO0FBQUEsYUFDeEJ0RCxLQUR3QixhQUN4QkEsS0FEd0I7QUFBQSxhQUNqQkMsTUFEaUIsYUFDakJBLE1BRGlCOztBQUVyQ3NELGlCQUFRQyxRQUFSLENBQWlCSCxDQUFqQixFQUFvQkMsQ0FBcEIsRUFBdUJ0RCxLQUF2QixFQUE4QkMsTUFBOUI7QUFDRDtBQUNGOzs7Ozs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUF3RCxRQUFPQyxPQUFQLEdBQWlCbkYsS0FBakIsQyIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE2ODhlN2UwODdhYWE0NWY4YzdjIiwiY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtc2NyZWVuJyk7XG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5jb25zdCBQYWRkbGUgPSByZXF1aXJlKCcuL1BhZGRsZScpO1xubGV0IHN0YXJ0UGFkZGxlID0gbmV3IFBhZGRsZSgzNTAsIDEwMCwgMTUpO1xuY29uc3QgS2V5Ym9hcmRlciA9IHJlcXVpcmUoJy4va2V5Ym9hcmRlcicpO1xuY29uc3QgQmFsbCA9IHJlcXVpcmUoJy4vYmFsbC5qcycpO1xuY29uc3QgU2NvcmVzID0gcmVxdWlyZSgnLi9zY29yZXMuanMnKTtcbmxldCBrZXlib2FyZE1vbml0b3IgPSBuZXcgS2V5Ym9hcmRlcigpO1xubGV0IGJvdW5jeUJhbGwgPSBuZXcgQmFsbCg0MDAsIDIwMCwgKChNYXRoLnJhbmRvbSgpICogMykgLTEuNSksIDQpO1xubGV0IGtleVN0YXRlID0ge307XG5jb25zdCBHYW1lID0gcmVxdWlyZSgnLi9HYW1lJyk7XG5sZXQgbmV3R2FtZSA9IG5ldyBHYW1lKGJvdW5jeUJhbGwsIHN0YXJ0UGFkZGxlKTtcbmNvbnN0IEJyaWNrID0gcmVxdWlyZSgnLi9icmlja3MuanMnKTtcbmxldCBicmlja3MgPSBuZXcgQnJpY2soKTtcbmxldCByZXF1ZXN0SUQgPSB1bmRlZmluZWQ7XG5sZXQgaXNEZWFkID0gbnVsbDtcbmxldCBicmlja3NEZXNpcmVkID0gNDA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQnJpY2tzKCkge1xuICBpZiAobmV3R2FtZS5sZXZlbCA9PT0gMSkge1xuICAgIGxldCBuZXdCcmlja3MgPSBicmlja3MuY3JlYXRlQnJpY2tzKGJyaWNrc0Rlc2lyZWQpO1xuICAgIG5ld0JyaWNrcy5mb3JFYWNoKCBicmljayA9PiBuZXdHYW1lLmdyYWJCcmlja3MoYnJpY2spIClcbiAgfSBlbHNlIHtcbiAgICBsZXQgbmV3QnJpY2tzID0gYnJpY2tzLmNyZWF0ZUJyaWNrcyhicmlja3NEZXNpcmVkKTtcbiAgICBuZXdCcmlja3MuZm9yRWFjaCggYnJpY2sgPT4gbmV3R2FtZS5ncmFiQnJpY2tzKGJyaWNrKSApXG4gIH1cbn07XG5cbmdlbmVyYXRlQnJpY2tzKCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICBrZXlTdGF0ZSA9IGtleWJvYXJkTW9uaXRvci5rZXlEb3duKGUpO1xufSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAga2V5U3RhdGUgPSBrZXlib2FyZE1vbml0b3Iua2V5VXAoZSk7XG59KTtcblxuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLXNjb3JlJykuaW5uZXJIVE1MID0gbmV3R2FtZS5zY29yZTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpdmVzLWluZGljYXRvcicpLmlubmVySFRNTCA9IG5ld0dhbWUubGl2ZXM7XG4gIGN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XG4gIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgc3RhcnRQYWRkbGUuZHJhdyhjdHgpO1xuICBib3VuY3lCYWxsLmRyYXcoY3R4KTtcbiAgYm91bmN5QmFsbC5keSA9IG5ld0dhbWUucGFkZGxlQmFsbENvbGxpZGluZyhib3VuY3lCYWxsLCBzdGFydFBhZGRsZSk7XG4gIGJvdW5jeUJhbGwuZHkgPSBuZXdHYW1lLmJyaWNrQmFsbENvbGxpZGluZyhib3VuY3lCYWxsLCBuZXdHYW1lLmJyaWNrcyk7XG4gIGJyaWNrcy5kcmF3KGN0eCwgbmV3R2FtZS5icmlja3MpO1xuICBib3VuY3lCYWxsLm1vdmUoY2FudmFzLmhlaWdodCwgY2FudmFzLndpZHRoKTtcbiAgc3RhcnRQYWRkbGUuYW5pbWF0ZShrZXlTdGF0ZSk7XG4gIGlzRGVhZCA9IG5ld0dhbWUuY2hlY2tCYWxsRGVhdGgoYm91bmN5QmFsbCwgY2FudmFzLmhlaWdodCk7XG4gIGlmIChpc0RlYWQpIHtcbiAgICBiYWxsRGVhdGgoKTtcbiAgfSBlbHNlIHtcbiAgICByZXF1ZXN0SUQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICB9XG59O1xuXG5zdGFydEdhbWUoKTtcblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xuICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gIGJvdW5jeUJhbGwgPSBuZXcgQmFsbCg0MDAsIDIwMCwgKChNYXRoLnJhbmRvbSgpICogMykgLTEuNSksIDQpO1xuICBzdGFydFBhZGRsZSA9IG5ldyBQYWRkbGUoMzUwLCAxMDAsIDE1KTtcbiAgc3RhcnRQYWRkbGUuZHJhdyhjdHgpO1xuICBib3VuY3lCYWxsLmRyYXcoY3R4KTtcbiAgYnJpY2tzLmRyYXcoY3R4LCBuZXdHYW1lLmJyaWNrcyk7XG4gIGRlbGF5ZWRTdGFydCgpO1xuICBlbmRHYW1lKCk7XG59XG5cbmZ1bmN0aW9uIGRlbGF5ZWRTdGFydCgpIHtcbiAgaWYoIXJlcXVlc3RJRCkge1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGdhbWVMb29wLCAzMDAwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBiYWxsRGVhdGgoKSB7XG4gIGlmKHJlcXVlc3RJRCkge1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShyZXF1ZXN0SUQpO1xuICAgIHJlcXVlc3RJRCA9IG51bGw7XG4gICAgaXNEZWFkID0gZmFsc2U7XG4gICAgdmFyIGxpdmVzSW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpdmVzLWluZGljYXRvcicpO1xuICAgIGxpdmVzSW5kaWNhdG9yLmlubmVyVGV4dCA9IG5ld0dhbWUubGl2ZXM7XG4gICAgc3RhcnRHYW1lKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5kR2FtZSgpIHtcbiAgdmFyIHVzZXJTY29yZXMgPSBuZXcgU2NvcmVzKCk7XG4gIGlmKG5ld0dhbWUubGl2ZXMgPT09IDApIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1zY29yZScpLmlubmVySFRNTCA9IDA7XG4gICAgdXNlclNjb3Jlcy5pbml0aWFscyA9IHByb21wdCgnRW50ZXIgeW91ciBpbml0aWFscyEnLCAnJyk7XG4gICAgdXNlclNjb3Jlcy5zY29yZSA9IG5ld0dhbWUuc2NvcmU7XG4gICAgY29uc29sZS5sb2codXNlclNjb3Jlcy5pbml0aWFscyk7XG4gICAgdXNlclNjb3Jlcy5pbml0aWFscyA9IGNoZWNrSW5pdGlhbHModXNlclNjb3Jlcy5pbml0aWFscyk7XG4gICAgc2NvcmVUb1N0b3JhZ2UodXNlclNjb3Jlcyk7XG4gICAgZ2V0RnJvbVN0b3JhZ2UodXNlclNjb3Jlcyk7XG4gICAgbmV3R2FtZSA9IG5ldyBHYW1lKGJvdW5jeUJhbGwsIHN0YXJ0UGFkZGxlKTtcbiAgICBicmlja3MgPSBuZXcgQnJpY2soKTtcbiAgICBnZW5lcmF0ZUJyaWNrcygpO1xuICB9XG59XG5cbmNvbnN0IGNoZWNrSW5pdGlhbHMgPSBzID0+IC9bYS16XS9nLnRlc3QocykgPyAnTi9BJyA6IHMuc2xpY2UoMCwzKS50b1VwcGVyQ2FzZSgpO1xuXG5cbmZ1bmN0aW9uIHNjb3JlVG9TdG9yYWdlKHNjb3Jlcykge1xuICB2YXIgc3RvcmVTY29yZXMgPSBzY29yZXM7XG4gIHZhciBzdHJpbmdpZnlTY29yZXMgPSBKU09OLnN0cmluZ2lmeShzdG9yZVNjb3Jlcyk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHNjb3Jlcy5pZCwgc3RyaW5naWZ5U2NvcmVzKTtcbn1cbmRlYnVnZ2VyO1xuZnVuY3Rpb24gZ2V0RnJvbVN0b3JhZ2Uoc2NvcmVzKSB7XG4gIGxldCB0b3BTY29yZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhbFN0b3JhZ2UubGVuZ3RoOyBpKyspe1xuICAgIGxldCByZXRyaWV2ZWRJdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxTdG9yYWdlLmtleShpKSk7XG4gICAgbGV0IHBhcnNlZEl0ZW0gPSBKU09OLnBhcnNlKHJldHJpZXZlZEl0ZW0pO1xuICAgIHRvcFNjb3Jlcy5wdXNoKHBhcnNlZEl0ZW0pO1xuICB9XG4gIHRvcFNjb3Jlcy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYi5zY29yZSAtIGEuc2NvcmU7XG4gIH0pXG4gIHRvcFNjb3Jlcy5zcGxpY2UoMTAsIDEwMDApO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRvcFNjb3Jlcy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBpbml0aWFscyA9IHRvcFNjb3Jlc1tpXS5pbml0aWFscztcbiAgICBsZXQgc2NvcmUgPSB0b3BTY29yZXNbaV0uc2NvcmU7XG4gICAgbGV0IEhUTUxJbml0aWFscyA9ICdoaWdoLWluaXRpYWxzLScgKyAoaSArIDEpO1xuICAgIGxldCBIVE1MU2NvcmVzID0gJ2hpZ2gtc2NvcmUtJyArIChpICsgMSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBIVE1MSW5pdGlhbHMpLmlubmVySFRNTCA9IGluaXRpYWxzO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgSFRNTFNjb3JlcykuaW5uZXJIVE1MID0gc2NvcmU7XG4gIH1cbn1cblxuZ2V0RnJvbVN0b3JhZ2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9pbmRleC5qcyIsImNsYXNzIFBhZGRsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLnkgPSA0NzU7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cbiAgZHJhdyhjb250ZXh0KSB7XG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG4gIGFuaW1hdGUoa2V5U3RhdGUpIHtcbiAgICBpZiAoa2V5U3RhdGVbMzddICYmIHRoaXMueCA+IDApIHtcbiAgICAgIHRoaXMueCAtPSA0O1xuICAgIH0gZWxzZSBpZiAoa2V5U3RhdGVbMzldICYmIHRoaXMueCA8IDcwMCkge1xuICAgICAgdGhpcy54ICs9IDQ7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFkZGxlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9QYWRkbGUuanMiLCJjbGFzcyBLZXlib2FyZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5rZXlzID0ge1xuICAgICAgbGVmdDogMzcsXG4gICAgICByaWdodDogMzksXG4gICAgfVxuICB9XG4gIGtleURvd24oZSkge1xuICAgIHZhciBrZXlTdGF0ZSA9IHt9O1xuICAgIGtleVN0YXRlW2Uua2V5Q29kZV0gPSB0cnVlO1xuICAgIHJldHVybiBrZXlTdGF0ZTtcbiAgfTtcblxuICBrZXlVcChlKSB7XG4gICAgdmFyIGtleVN0YXRlID0ge307XG4gICAga2V5U3RhdGVbZS5rZXlDb2RlXSA9IGZhbHNlO1xuICAgIHJldHVybiBrZXlTdGF0ZTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2tleWJvYXJkZXIuanMiLCJjbGFzcyBCYWxsIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgZHgsIGR5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuZHggPSBkeDtcbiAgICB0aGlzLmR5ID0gZHk7XG4gICAgdGhpcy5yYWRpdXMgPSA1O1xuICAgIHRoaXMud2lkdGggPSB0aGlzLnJhZGl1cyAqIDI7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLnJhZGl1cyAqIDI7XG4gIH1cbiAgZHJhdyhjb250ZXh0KSB7XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIE1hdGguUEkgKiAyICxmYWxzZSk7XG4gICAgY29udGV4dC5zdHJva2UoKTtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgIGNvbnRleHQuZmlsbCgpO1xuICB9XG4gIG1vdmUoY2FudmFzSGVpZ2h0LCBjYW52YXNXaWR0aCkge1xuICAgIGlmICgodGhpcy54ICsgdGhpcy5yYWRpdXMpID49IGNhbnZhc1dpZHRoIHx8ICh0aGlzLnggLSB0aGlzLnJhZGl1cykgPD0gMCkge1xuICAgICAgdGhpcy5keCA9IC10aGlzLmR4O1xuICAgIH1cbiAgICBpZiAoKHRoaXMueSAtIHRoaXMucmFkaXVzKSA8PSAwKSB7XG4gICAgICB0aGlzLmR5ID0gLXRoaXMuZHk7XG4gICAgfVxuICAgIHRoaXMueSArPSB0aGlzLmR5O1xuICAgIHRoaXMueCArPSB0aGlzLmR4O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFsbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9iYWxsLmpzIiwiY2xhc3MgU2NvcmVzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5pbml0aWFscyA9ICdYWFgnO1xuICAgIHRoaXMuaWQgPSBEYXRlLm5vdygpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2NvcmVzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3Njb3Jlcy5qcyIsImNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihiYWxsLCBwYWRkbGUpIHtcbiAgICB0aGlzLmJyaWNrcyA9IFtdO1xuICAgIHRoaXMuZGlzY2FyZGVkQnJpY2tzID0gW107XG4gICAgdGhpcy5iYWxscyA9IFtiYWxsXTtcbiAgICB0aGlzLnBhZGRsZSA9IHBhZGRsZTtcbiAgICB0aGlzLmxldmVsID0gMTtcbiAgICB0aGlzLmxpdmVzID0gMztcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgfVxuXG4gIGNvbGxpc2lvbkNoZWNrKG9iajEsIG9iajIpIHtcbiAgICBpZiAob2JqMS54IDwgb2JqMi54ICsgb2JqMi53aWR0aCAgJiYgb2JqMS54ICsgb2JqMS53aWR0aCAgPiBvYmoyLnggJiZcbiAgICAgICAgb2JqMS55IDwgb2JqMi55ICsgb2JqMi5oZWlnaHQgJiYgb2JqMS55ICsgb2JqMS5oZWlnaHQgPiBvYmoyLnkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcGFkZGxlQmFsbENvbGxpZGluZyhiYWxsLCBwYWRkbGUpIHtcbiAgICB2YXIgYm9vbGVhbiA9IHRoaXMuY29sbGlzaW9uQ2hlY2soYmFsbCwgcGFkZGxlKTtcbiAgICB2YXIgZHkgPSBiYWxsLmR5O1xuICAgIGlmIChib29sZWFuID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZHkgPSAtZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkeTtcbiAgICB9XG4gIH1cblxuICBncmFiQnJpY2tzKGJyaWNrcykge1xuICAgIHRoaXMuYnJpY2tzLnB1c2goYnJpY2tzKTtcbiAgfVxuXG4gIGJyaWNrQmFsbENvbGxpZGluZyhiYWxsLCBicmlja3MpIHtcbiAgICB2YXIgZHkgPSBiYWxsLmR5O1xuICAgIGJyaWNrcy5mb3JFYWNoKGZ1bmN0aW9uKGJyaWNrKSB7XG4gICAgICB2YXIgYm9vbGVhbiA9IHRoaXMuY29sbGlzaW9uQ2hlY2soYmFsbCwgYnJpY2spO1xuICAgICAgaWYgKGJvb2xlYW4gPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5zY29yZSArPSAxMDA7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuYnJpY2tzLmluZGV4T2YoYnJpY2spO1xuICAgICAgICB0aGlzLmRpc2NhcmRlZEJyaWNrcyA9IHRoaXMuYnJpY2tzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgcmV0dXJuIGR5ID0gLWR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGR5O1xuICAgICAgfVxuICAgIH0uYmluZCh0aGlzKSlcbiAgICByZXR1cm4gZHk7XG4gIH1cblxuICBjaGVja0JhbGxEZWF0aChiYWxsLCBjYW52YXNIZWlnaHQpIHtcbiAgICBpZiAoYmFsbC55ID49IGNhbnZhc0hlaWdodCkge1xuICAgICAgdGhpcy5saXZlcyAtPSAxO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0dhbWUuanMiLCJjbGFzcyBCcmljayB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IDc1O1xuICAgIHRoaXMuaGVpZ2h0ID0gMjU7XG4gICAgdGhpcy5icmlja3MgPSBbXTtcbiAgfVxuXG4gIGNyZWF0ZUJyaWNrcyhudW1Ccmlja3MpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbnVtQnJpY2tzOyBpKyspIHtcbiAgICAgIGlmIChpIDw9IDkpIHtcbiAgICAgICAgbGV0IHggPSAyLjUgKyAoaSAqIDc1KSArIChpICogNSk7XG4gICAgICAgIGxldCB5ID0gKDE1KTtcbiAgICAgICAgdGhpcy5icmlja3MucHVzaChuZXcgQnJpY2soeCwgeSkpO1xuICAgICAgfSBlbHNlIGlmIChpIDw9IDE5KSB7XG4gICAgICAgIGxldCB4ID0gMi41ICsgKChpIC0gMTApICogNzUpICsgKChpIC0gMTApICogNSk7XG4gICAgICAgIGxldCB5ID0gKDQ1KTtcbiAgICAgICAgdGhpcy5icmlja3MucHVzaChuZXcgQnJpY2soeCwgeSkpO1xuICAgICAgfSBlbHNlIGlmIChpIDw9IDI5KSB7XG4gICAgICAgIGxldCB4ID0gMi41ICsgKChpIC0gMjApICogNzUpICsgKChpIC0gMjApICogNSk7XG4gICAgICAgIGxldCB5ID0gKDc1KTtcbiAgICAgICAgdGhpcy5icmlja3MucHVzaChuZXcgQnJpY2soeCwgeSkpO1xuICAgICAgfSBlbHNlIGlmIChpIDw9IDM5KSB7XG4gICAgICAgIGxldCB4ID0gMi41ICsgKChpIC0gMzApICogNzUpICsgKChpIC0gMzApICogNSk7XG4gICAgICAgIGxldCB5ID0gKDEwNSk7XG4gICAgICAgIHRoaXMuYnJpY2tzLnB1c2gobmV3IEJyaWNrKHgsIHkpKTtcbiAgICAgIH0gXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmJyaWNrcztcbiAgfVxuXG4gIGRyYXcoY29udGV4dCwgYnJpY2tzKSB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGJyaWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gYnJpY2tzW2ldO1xuICAgICAgY29udGV4dC5maWxsUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG4gIH1cbn1cblxuLy8gY2xhc3MgU3Ryb25nZXJCcmljayBleHRlbmRzIEJyaWNrIHtcbi8vICAgY29uc3RydWN0b3IoeCwgeSwgaGVhbHRoKSB7XG4vLyAgICAgc3VwZXIoeCwgeSk7XG4vLyAgICAgdGhpcy5oZWFsdGggPSBoZWFsdGg7XG4vLyAgIH1cbi8vIH1cblxubW9kdWxlLmV4cG9ydHMgPSBCcmljaztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9icmlja3MuanMiXSwic291cmNlUm9vdCI6IiJ9