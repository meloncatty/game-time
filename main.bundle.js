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
	    userScores.initials = prompt('Enter your initials!', 'XXX');
	    userScores.score = newGame.score;
	    checkInitials(userScores.score);
	    scoreToStorage(userScores);
	    getFromStorage(userScores);
	    newGame = new Game(bouncyBall, startPaddle);
	    bricks = new Brick();
	    generateBricks();
	  }
	}
	
	function checkInitials(s) {
	  s === '' ? 'N/A' : s;
	}
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWMwZGQ1YWJhYmRmZWFlN2NmNTQiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9QYWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2tleWJvYXJkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3Njb3Jlcy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvR2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYnJpY2tzLmpzIl0sIm5hbWVzIjpbImNhbnZhcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImN0eCIsImdldENvbnRleHQiLCJQYWRkbGUiLCJyZXF1aXJlIiwic3RhcnRQYWRkbGUiLCJLZXlib2FyZGVyIiwiQmFsbCIsIlNjb3JlcyIsImtleWJvYXJkTW9uaXRvciIsImJvdW5jeUJhbGwiLCJNYXRoIiwicmFuZG9tIiwia2V5U3RhdGUiLCJHYW1lIiwibmV3R2FtZSIsIkJyaWNrIiwiYnJpY2tzIiwicmVxdWVzdElEIiwidW5kZWZpbmVkIiwiaXNEZWFkIiwiYnJpY2tzRGVzaXJlZCIsImdlbmVyYXRlQnJpY2tzIiwibGV2ZWwiLCJuZXdCcmlja3MiLCJjcmVhdGVCcmlja3MiLCJmb3JFYWNoIiwiZ3JhYkJyaWNrcyIsImJyaWNrIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlEb3duIiwia2V5VXAiLCJnYW1lTG9vcCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic2NvcmUiLCJsaXZlcyIsImZpbGxTdHlsZSIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiZHJhdyIsImR5IiwicGFkZGxlQmFsbENvbGxpZGluZyIsImJyaWNrQmFsbENvbGxpZGluZyIsIm1vdmUiLCJhbmltYXRlIiwiY2hlY2tCYWxsRGVhdGgiLCJiYWxsRGVhdGgiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzdGFydEdhbWUiLCJkZWxheWVkU3RhcnQiLCJlbmRHYW1lIiwic2V0VGltZW91dCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibGl2ZXNJbmRpY2F0b3IiLCJpbm5lclRleHQiLCJ1c2VyU2NvcmVzIiwiaW5pdGlhbHMiLCJwcm9tcHQiLCJjaGVja0luaXRpYWxzIiwic2NvcmVUb1N0b3JhZ2UiLCJnZXRGcm9tU3RvcmFnZSIsInMiLCJzY29yZXMiLCJzdG9yZVNjb3JlcyIsInN0cmluZ2lmeVNjb3JlcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiaWQiLCJ0b3BTY29yZXMiLCJpIiwibGVuZ3RoIiwicmV0cmlldmVkSXRlbSIsImdldEl0ZW0iLCJrZXkiLCJwYXJzZWRJdGVtIiwicGFyc2UiLCJwdXNoIiwic29ydCIsImEiLCJiIiwic3BsaWNlIiwiSFRNTEluaXRpYWxzIiwiSFRNTFNjb3JlcyIsIngiLCJ5IiwiY29udGV4dCIsImZpbGxSZWN0IiwibW9kdWxlIiwiZXhwb3J0cyIsImtleXMiLCJsZWZ0IiwicmlnaHQiLCJrZXlDb2RlIiwiZHgiLCJyYWRpdXMiLCJiZWdpblBhdGgiLCJhcmMiLCJQSSIsInN0cm9rZSIsImZpbGwiLCJjYW52YXNIZWlnaHQiLCJjYW52YXNXaWR0aCIsIkRhdGUiLCJub3ciLCJiYWxsIiwicGFkZGxlIiwiZGlzY2FyZGVkQnJpY2tzIiwiYmFsbHMiLCJvYmoxIiwib2JqMiIsImJvb2xlYW4iLCJjb2xsaXNpb25DaGVjayIsImluZGV4IiwiaW5kZXhPZiIsImJpbmQiLCJudW1Ccmlja3MiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsS0FB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LElBQUkwRCxJQUFJLENBQVosRUFBZUEsSUFBSTFELE9BQU8yRCxNQUExQixFQUFrQ0QsR0FBbEMsRUFBdUM7QUFBQSx5QkFDUDFELE9BQU8wRCxDQUFQLENBRE87QUFBQSxhQUM5QmMsQ0FEOEIsYUFDOUJBLENBRDhCO0FBQUEsYUFDM0JDLENBRDJCLGFBQzNCQSxDQUQyQjtBQUFBLGFBQ3hCakQsS0FEd0IsYUFDeEJBLEtBRHdCO0FBQUEsYUFDakJDLE1BRGlCLGFBQ2pCQSxNQURpQjs7QUFFckNpRCxpQkFBUUMsUUFBUixDQUFpQkgsQ0FBakIsRUFBb0JDLENBQXBCLEVBQXVCakQsS0FBdkIsRUFBOEJDLE1BQTlCO0FBQ0Q7QUFDRjs7Ozs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBbUQsUUFBT0MsT0FBUCxHQUFpQjlFLEtBQWpCLEMiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxYzBkZDVhYmFiZGZlYWU3Y2Y1NCIsImNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLXNjcmVlbicpO1xubGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuY29uc3QgUGFkZGxlID0gcmVxdWlyZSgnLi9QYWRkbGUnKTtcbmxldCBzdGFydFBhZGRsZSA9IG5ldyBQYWRkbGUoMzUwLCAxMDAsIDE1KTtcbmNvbnN0IEtleWJvYXJkZXIgPSByZXF1aXJlKCcuL2tleWJvYXJkZXInKTtcbmNvbnN0IEJhbGwgPSByZXF1aXJlKCcuL2JhbGwuanMnKTtcbmNvbnN0IFNjb3JlcyA9IHJlcXVpcmUoJy4vc2NvcmVzLmpzJyk7XG5sZXQga2V5Ym9hcmRNb25pdG9yID0gbmV3IEtleWJvYXJkZXIoKTtcbmxldCBib3VuY3lCYWxsID0gbmV3IEJhbGwoNDAwLCAyMDAsICgoTWF0aC5yYW5kb20oKSAqIDMpIC0xLjUpLCA0KTtcbmxldCBrZXlTdGF0ZSA9IHt9O1xuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vR2FtZScpO1xubGV0IG5ld0dhbWUgPSBuZXcgR2FtZShib3VuY3lCYWxsLCBzdGFydFBhZGRsZSk7XG5jb25zdCBCcmljayA9IHJlcXVpcmUoJy4vYnJpY2tzLmpzJyk7XG5sZXQgYnJpY2tzID0gbmV3IEJyaWNrKCk7XG5sZXQgcmVxdWVzdElEID0gdW5kZWZpbmVkO1xubGV0IGlzRGVhZCA9IG51bGw7XG5sZXQgYnJpY2tzRGVzaXJlZCA9IDQwO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUJyaWNrcygpIHtcbiAgaWYgKG5ld0dhbWUubGV2ZWwgPT09IDEpIHtcbiAgICBsZXQgbmV3QnJpY2tzID0gYnJpY2tzLmNyZWF0ZUJyaWNrcyhicmlja3NEZXNpcmVkKTtcbiAgICBuZXdCcmlja3MuZm9yRWFjaCggYnJpY2sgPT4gbmV3R2FtZS5ncmFiQnJpY2tzKGJyaWNrKSApXG4gIH0gZWxzZSB7XG4gICAgbGV0IG5ld0JyaWNrcyA9IGJyaWNrcy5jcmVhdGVCcmlja3MoYnJpY2tzRGVzaXJlZCk7XG4gICAgbmV3QnJpY2tzLmZvckVhY2goIGJyaWNrID0+IG5ld0dhbWUuZ3JhYkJyaWNrcyhicmljaykgKVxuICB9XG59O1xuXG5nZW5lcmF0ZUJyaWNrcygpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAga2V5U3RhdGUgPSBrZXlib2FyZE1vbml0b3Iua2V5RG93bihlKTtcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gIGtleVN0YXRlID0ga2V5Ym9hcmRNb25pdG9yLmtleVVwKGUpO1xufSk7XG5cbmZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1zY29yZScpLmlubmVySFRNTCA9IG5ld0dhbWUuc2NvcmU7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXZlcy1pbmRpY2F0b3InKS5pbm5lckhUTUwgPSBuZXdHYW1lLmxpdmVzO1xuICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xuICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gIHN0YXJ0UGFkZGxlLmRyYXcoY3R4KTtcbiAgYm91bmN5QmFsbC5kcmF3KGN0eCk7XG4gIGJvdW5jeUJhbGwuZHkgPSBuZXdHYW1lLnBhZGRsZUJhbGxDb2xsaWRpbmcoYm91bmN5QmFsbCwgc3RhcnRQYWRkbGUpO1xuICBib3VuY3lCYWxsLmR5ID0gbmV3R2FtZS5icmlja0JhbGxDb2xsaWRpbmcoYm91bmN5QmFsbCwgbmV3R2FtZS5icmlja3MpO1xuICBicmlja3MuZHJhdyhjdHgsIG5ld0dhbWUuYnJpY2tzKTtcbiAgYm91bmN5QmFsbC5tb3ZlKGNhbnZhcy5oZWlnaHQsIGNhbnZhcy53aWR0aCk7XG4gIHN0YXJ0UGFkZGxlLmFuaW1hdGUoa2V5U3RhdGUpO1xuICBpc0RlYWQgPSBuZXdHYW1lLmNoZWNrQmFsbERlYXRoKGJvdW5jeUJhbGwsIGNhbnZhcy5oZWlnaHQpO1xuICBpZiAoaXNEZWFkKSB7XG4gICAgYmFsbERlYXRoKCk7XG4gIH0gZWxzZSB7XG4gICAgcmVxdWVzdElEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbiAgfVxufTtcblxuc3RhcnRHYW1lKCk7XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICBib3VuY3lCYWxsID0gbmV3IEJhbGwoNDAwLCAyMDAsICgoTWF0aC5yYW5kb20oKSAqIDMpIC0xLjUpLCA0KTtcbiAgc3RhcnRQYWRkbGUgPSBuZXcgUGFkZGxlKDM1MCwgMTAwLCAxNSk7XG4gIHN0YXJ0UGFkZGxlLmRyYXcoY3R4KTtcbiAgYm91bmN5QmFsbC5kcmF3KGN0eCk7XG4gIGJyaWNrcy5kcmF3KGN0eCwgbmV3R2FtZS5icmlja3MpO1xuICBkZWxheWVkU3RhcnQoKTtcbiAgZW5kR2FtZSgpO1xufVxuXG5mdW5jdGlvbiBkZWxheWVkU3RhcnQoKSB7XG4gIGlmKCFyZXF1ZXN0SUQpIHtcbiAgICB3aW5kb3cuc2V0VGltZW91dChnYW1lTG9vcCwgMzAwMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYmFsbERlYXRoKCkge1xuICBpZihyZXF1ZXN0SUQpIHtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUocmVxdWVzdElEKTtcbiAgICByZXF1ZXN0SUQgPSBudWxsO1xuICAgIGlzRGVhZCA9IGZhbHNlO1xuICAgIHZhciBsaXZlc0luZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXZlcy1pbmRpY2F0b3InKTtcbiAgICBsaXZlc0luZGljYXRvci5pbm5lclRleHQgPSBuZXdHYW1lLmxpdmVzO1xuICAgIHN0YXJ0R2FtZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuZEdhbWUoKSB7XG4gIHZhciB1c2VyU2NvcmVzID0gbmV3IFNjb3JlcygpO1xuICBpZihuZXdHYW1lLmxpdmVzID09PSAwKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItc2NvcmUnKS5pbm5lckhUTUwgPSAwO1xuICAgIHVzZXJTY29yZXMuaW5pdGlhbHMgPSBwcm9tcHQoJ0VudGVyIHlvdXIgaW5pdGlhbHMhJywgJ1hYWCcpO1xuICAgIHVzZXJTY29yZXMuc2NvcmUgPSBuZXdHYW1lLnNjb3JlO1xuICAgIGNoZWNrSW5pdGlhbHModXNlclNjb3Jlcy5zY29yZSk7XG4gICAgc2NvcmVUb1N0b3JhZ2UodXNlclNjb3Jlcyk7XG4gICAgZ2V0RnJvbVN0b3JhZ2UodXNlclNjb3Jlcyk7XG4gICAgbmV3R2FtZSA9IG5ldyBHYW1lKGJvdW5jeUJhbGwsIHN0YXJ0UGFkZGxlKTtcbiAgICBicmlja3MgPSBuZXcgQnJpY2soKTtcbiAgICBnZW5lcmF0ZUJyaWNrcygpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrSW5pdGlhbHMocykge1xuICBzID09PSAnJyA/ICdOL0EnIDogcztcbn1cblxuZnVuY3Rpb24gc2NvcmVUb1N0b3JhZ2Uoc2NvcmVzKSB7XG4gIHZhciBzdG9yZVNjb3JlcyA9IHNjb3JlcztcbiAgdmFyIHN0cmluZ2lmeVNjb3JlcyA9IEpTT04uc3RyaW5naWZ5KHN0b3JlU2NvcmVzKTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc2NvcmVzLmlkLCBzdHJpbmdpZnlTY29yZXMpO1xufVxuZGVidWdnZXI7XG5mdW5jdGlvbiBnZXRGcm9tU3RvcmFnZShzY29yZXMpIHtcbiAgbGV0IHRvcFNjb3JlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IHJldHJpZXZlZEl0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbFN0b3JhZ2Uua2V5KGkpKTtcbiAgICBsZXQgcGFyc2VkSXRlbSA9IEpTT04ucGFyc2UocmV0cmlldmVkSXRlbSk7XG4gICAgdG9wU2NvcmVzLnB1c2gocGFyc2VkSXRlbSk7XG4gIH1cbiAgdG9wU2NvcmVzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBiLnNjb3JlIC0gYS5zY29yZTtcbiAgfSlcbiAgdG9wU2NvcmVzLnNwbGljZSgxMCwgMTAwMCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9wU2NvcmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGluaXRpYWxzID0gdG9wU2NvcmVzW2ldLmluaXRpYWxzO1xuICAgIGxldCBzY29yZSA9IHRvcFNjb3Jlc1tpXS5zY29yZTtcbiAgICBsZXQgSFRNTEluaXRpYWxzID0gJ2hpZ2gtaW5pdGlhbHMtJyArIChpICsgMSk7XG4gICAgbGV0IEhUTUxTY29yZXMgPSAnaGlnaC1zY29yZS0nICsgKGkgKyAxKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIEhUTUxJbml0aWFscykuaW5uZXJIVE1MID0gaW5pdGlhbHM7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBIVE1MU2NvcmVzKS5pbm5lckhUTUwgPSBzY29yZTtcbiAgfVxufVxuXG5nZXRGcm9tU3RvcmFnZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2luZGV4LmpzIiwiY2xhc3MgUGFkZGxlIHtcbiAgY29uc3RydWN0b3IoeCwgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMueSA9IDQ3NTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgfVxuICBkcmF3KGNvbnRleHQpIHtcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cbiAgYW5pbWF0ZShrZXlTdGF0ZSkge1xuICAgIGlmIChrZXlTdGF0ZVszN10gJiYgdGhpcy54ID4gMCkge1xuICAgICAgdGhpcy54IC09IDQ7XG4gICAgfSBlbHNlIGlmIChrZXlTdGF0ZVszOV0gJiYgdGhpcy54IDwgNzAwKSB7XG4gICAgICB0aGlzLnggKz0gNDtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYWRkbGU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL1BhZGRsZS5qcyIsImNsYXNzIEtleWJvYXJkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmtleXMgPSB7XG4gICAgICBsZWZ0OiAzNyxcbiAgICAgIHJpZ2h0OiAzOSxcbiAgICB9XG4gIH1cbiAga2V5RG93bihlKSB7XG4gICAgdmFyIGtleVN0YXRlID0ge307XG4gICAga2V5U3RhdGVbZS5rZXlDb2RlXSA9IHRydWU7XG4gICAgcmV0dXJuIGtleVN0YXRlO1xuICB9O1xuXG4gIGtleVVwKGUpIHtcbiAgICB2YXIga2V5U3RhdGUgPSB7fTtcbiAgICBrZXlTdGF0ZVtlLmtleUNvZGVdID0gZmFsc2U7XG4gICAgcmV0dXJuIGtleVN0YXRlO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIva2V5Ym9hcmRlci5qcyIsImNsYXNzIEJhbGwge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBkeCwgZHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5keCA9IGR4O1xuICAgIHRoaXMuZHkgPSBkeTtcbiAgICB0aGlzLnJhZGl1cyA9IDU7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMucmFkaXVzICogMjtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMucmFkaXVzICogMjtcbiAgfVxuICBkcmF3KGNvbnRleHQpIHtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQuYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIgLGZhbHNlKTtcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgY29udGV4dC5maWxsKCk7XG4gIH1cbiAgbW92ZShjYW52YXNIZWlnaHQsIGNhbnZhc1dpZHRoKSB7XG4gICAgaWYgKCh0aGlzLnggKyB0aGlzLnJhZGl1cykgPj0gY2FudmFzV2lkdGggfHwgKHRoaXMueCAtIHRoaXMucmFkaXVzKSA8PSAwKSB7XG4gICAgICB0aGlzLmR4ID0gLXRoaXMuZHg7XG4gICAgfVxuICAgIGlmICgodGhpcy55IC0gdGhpcy5yYWRpdXMpIDw9IDApIHtcbiAgICAgIHRoaXMuZHkgPSAtdGhpcy5keTtcbiAgICB9XG4gICAgdGhpcy55ICs9IHRoaXMuZHk7XG4gICAgdGhpcy54ICs9IHRoaXMuZHg7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCYWxsO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2JhbGwuanMiLCJjbGFzcyBTY29yZXMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLmluaXRpYWxzID0gJ1hYWCc7XG4gICAgdGhpcy5pZCA9IERhdGUubm93KCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTY29yZXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvc2NvcmVzLmpzIiwiY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKGJhbGwsIHBhZGRsZSkge1xuICAgIHRoaXMuYnJpY2tzID0gW107XG4gICAgdGhpcy5kaXNjYXJkZWRCcmlja3MgPSBbXTtcbiAgICB0aGlzLmJhbGxzID0gW2JhbGxdO1xuICAgIHRoaXMucGFkZGxlID0gcGFkZGxlO1xuICAgIHRoaXMubGV2ZWwgPSAxO1xuICAgIHRoaXMubGl2ZXMgPSAzO1xuICAgIHRoaXMuc2NvcmUgPSAwO1xuICB9XG5cbiAgY29sbGlzaW9uQ2hlY2sob2JqMSwgb2JqMikge1xuICAgIGlmIChvYmoxLnggPCBvYmoyLnggKyBvYmoyLndpZHRoICAmJiBvYmoxLnggKyBvYmoxLndpZHRoICA+IG9iajIueCAmJlxuICAgICAgICBvYmoxLnkgPCBvYmoyLnkgKyBvYmoyLmhlaWdodCAmJiBvYmoxLnkgKyBvYmoxLmhlaWdodCA+IG9iajIueSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwYWRkbGVCYWxsQ29sbGlkaW5nKGJhbGwsIHBhZGRsZSkge1xuICAgIHZhciBib29sZWFuID0gdGhpcy5jb2xsaXNpb25DaGVjayhiYWxsLCBwYWRkbGUpO1xuICAgIHZhciBkeSA9IGJhbGwuZHk7XG4gICAgaWYgKGJvb2xlYW4gPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBkeSA9IC1keTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGR5O1xuICAgIH1cbiAgfVxuXG4gIGdyYWJCcmlja3MoYnJpY2tzKSB7XG4gICAgdGhpcy5icmlja3MucHVzaChicmlja3MpO1xuICB9XG5cbiAgYnJpY2tCYWxsQ29sbGlkaW5nKGJhbGwsIGJyaWNrcykge1xuICAgIHZhciBkeSA9IGJhbGwuZHk7XG4gICAgYnJpY2tzLmZvckVhY2goZnVuY3Rpb24oYnJpY2spIHtcbiAgICAgIHZhciBib29sZWFuID0gdGhpcy5jb2xsaXNpb25DaGVjayhiYWxsLCBicmljayk7XG4gICAgICBpZiAoYm9vbGVhbiA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnNjb3JlICs9IDEwMDtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5icmlja3MuaW5kZXhPZihicmljayk7XG4gICAgICAgIHRoaXMuZGlzY2FyZGVkQnJpY2tzID0gdGhpcy5icmlja3Muc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICByZXR1cm4gZHkgPSAtZHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZHk7XG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpKVxuICAgIHJldHVybiBkeTtcbiAgfVxuXG4gIGNoZWNrQmFsbERlYXRoKGJhbGwsIGNhbnZhc0hlaWdodCkge1xuICAgIGlmIChiYWxsLnkgPj0gY2FudmFzSGVpZ2h0KSB7XG4gICAgICB0aGlzLmxpdmVzIC09IDE7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvR2FtZS5qcyIsImNsYXNzIEJyaWNrIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLndpZHRoID0gNzU7XG4gICAgdGhpcy5oZWlnaHQgPSAyNTtcbiAgICB0aGlzLmJyaWNrcyA9IFtdO1xuICB9XG5cbiAgY3JlYXRlQnJpY2tzKG51bUJyaWNrcykge1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBudW1Ccmlja3M7IGkrKykge1xuICAgICAgaWYgKGkgPD0gOSkge1xuICAgICAgICBsZXQgeCA9IDIuNSArIChpICogNzUpICsgKGkgKiA1KTtcbiAgICAgICAgbGV0IHkgPSAoMTUpO1xuICAgICAgICB0aGlzLmJyaWNrcy5wdXNoKG5ldyBCcmljayh4LCB5KSk7XG4gICAgICB9IGVsc2UgaWYgKGkgPD0gMTkpIHtcbiAgICAgICAgbGV0IHggPSAyLjUgKyAoKGkgLSAxMCkgKiA3NSkgKyAoKGkgLSAxMCkgKiA1KTtcbiAgICAgICAgbGV0IHkgPSAoNDUpO1xuICAgICAgICB0aGlzLmJyaWNrcy5wdXNoKG5ldyBCcmljayh4LCB5KSk7XG4gICAgICB9IGVsc2UgaWYgKGkgPD0gMjkpIHtcbiAgICAgICAgbGV0IHggPSAyLjUgKyAoKGkgLSAyMCkgKiA3NSkgKyAoKGkgLSAyMCkgKiA1KTtcbiAgICAgICAgbGV0IHkgPSAoNzUpO1xuICAgICAgICB0aGlzLmJyaWNrcy5wdXNoKG5ldyBCcmljayh4LCB5KSk7XG4gICAgICB9IGVsc2UgaWYgKGkgPD0gMzkpIHtcbiAgICAgICAgbGV0IHggPSAyLjUgKyAoKGkgLSAzMCkgKiA3NSkgKyAoKGkgLSAzMCkgKiA1KTtcbiAgICAgICAgbGV0IHkgPSAoMTA1KTtcbiAgICAgICAgdGhpcy5icmlja3MucHVzaChuZXcgQnJpY2soeCwgeSkpO1xuICAgICAgfSBcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYnJpY2tzO1xuICB9XG5cbiAgZHJhdyhjb250ZXh0LCBicmlja3MpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYnJpY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSBicmlja3NbaV07XG4gICAgICBjb250ZXh0LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBjbGFzcyBTdHJvbmdlckJyaWNrIGV4dGVuZHMgQnJpY2sge1xuLy8gICBjb25zdHJ1Y3Rvcih4LCB5LCBoZWFsdGgpIHtcbi8vICAgICBzdXBlcih4LCB5KTtcbi8vICAgICB0aGlzLmhlYWx0aCA9IGhlYWx0aDtcbi8vICAgfVxuLy8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJyaWNrO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2JyaWNrcy5qcyJdLCJzb3VyY2VSb290IjoiIn0=