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
	var keyboardMonitor = new Keyboarder();
	var bouncyBall = new Ball(400, 200, Math.random() * 3 - 1.5, 4);
	var keyState = {};
	var Game = __webpack_require__(4);
	var newGame = new Game(bouncyBall, startPaddle);
	var Brick = __webpack_require__(5);
	var bricks = new Brick();
	
	function generateBricks() {
	  var newBricks = bricks.createBricks();
	  newBricks.forEach(function (brick) {
	    return newGame.grabBricks(brick);
	  });
	};
	
	generateBricks();
	
	window.addEventListener('keydown', function (e) {
	  keyState = keyboardMonitor.keyDown(e);
	});
	
	window.addEventListener('keyup', function (e) {
	  keyState = keyboardMonitor.keyUp(e);
	});
	
	function gameLoop() {
	  ctx.fillStyle = '#000';
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  startPaddle.draw(ctx);
	  bouncyBall.draw(ctx);
	  bouncyBall.dy = newGame.paddleBallColliding(bouncyBall, startPaddle);
	  bouncyBall.dy = newGame.brickBallColliding(bouncyBall, newGame.bricks);
	  bricks.draw(ctx, newGame.bricks);
	  bouncyBall.move(canvas.height, canvas.width);
	  startPaddle.animate(keyState);
	  requestAnimationFrame(gameLoop);
	};
	
	gameLoop();

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
	          var index = this.bricks.indexOf(brick);
	          this.discardedBricks = this.bricks.splice(index, 1);
	          return dy = -dy;
	        } else {
	          return dy;
	        }
	      }.bind(this));
	      return dy;
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ }),
/* 5 */
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
	    value: function createBricks() {
	      for (var i = 0; i < 20; i++) {
	        if (i <= 9) {
	          var x = i * 75 + i * 5;
	          var y = 15;
	          this.bricks.push(new Brick(x, y));
	        } else if (i <= 19) {
	          var _x = (i - 10) * 75 + (i - 10) * 5;
	          var _y = 45;
	          this.bricks.push(new Brick(_x, _y));
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
	
	module.exports = Brick;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTk3ZTk5NzE4ZjI5ZThmNzJjZTkiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9QYWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2tleWJvYXJkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL0dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2JyaWNrcy5qcyJdLCJuYW1lcyI6WyJjYW52YXMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjdHgiLCJnZXRDb250ZXh0IiwiUGFkZGxlIiwicmVxdWlyZSIsInN0YXJ0UGFkZGxlIiwiS2V5Ym9hcmRlciIsIkJhbGwiLCJrZXlib2FyZE1vbml0b3IiLCJib3VuY3lCYWxsIiwiTWF0aCIsInJhbmRvbSIsImtleVN0YXRlIiwiR2FtZSIsIm5ld0dhbWUiLCJCcmljayIsImJyaWNrcyIsImdlbmVyYXRlQnJpY2tzIiwibmV3QnJpY2tzIiwiY3JlYXRlQnJpY2tzIiwiZm9yRWFjaCIsImdyYWJCcmlja3MiLCJicmljayIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5RG93biIsImtleVVwIiwiZ2FtZUxvb3AiLCJmaWxsU3R5bGUiLCJjbGVhclJlY3QiLCJ3aWR0aCIsImhlaWdodCIsImRyYXciLCJkeSIsInBhZGRsZUJhbGxDb2xsaWRpbmciLCJicmlja0JhbGxDb2xsaWRpbmciLCJtb3ZlIiwiYW5pbWF0ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIngiLCJ5IiwiY29udGV4dCIsImZpbGxSZWN0IiwibW9kdWxlIiwiZXhwb3J0cyIsImtleXMiLCJsZWZ0IiwicmlnaHQiLCJrZXlDb2RlIiwiZHgiLCJyYWRpdXMiLCJiZWdpblBhdGgiLCJhcmMiLCJQSSIsInN0cm9rZSIsImZpbGwiLCJjYW52YXNIZWlnaHQiLCJjYW52YXNXaWR0aCIsImJhbGwiLCJwYWRkbGUiLCJkaXNjYXJkZWRCcmlja3MiLCJiYWxscyIsImxldmVsIiwib2JqMSIsIm9iajIiLCJib29sZWFuIiwiY29sbGlzaW9uQ2hlY2siLCJwdXNoIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiYmluZCIsImkiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsS0FBTUEsU0FBU0MsU0FBU0MsYUFBVCxDQUF1QixjQUF2QixDQUFmO0FBQ0EsS0FBTUMsTUFBTUgsT0FBT0ksVUFBUCxDQUFrQixJQUFsQixDQUFaO0FBQ0EsS0FBTUMsU0FBUyxtQkFBQUMsQ0FBUSxDQUFSLENBQWY7QUFDQSxLQUFNQyxjQUFjLElBQUlGLE1BQUosQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEVBQXJCLENBQXBCO0FBQ0EsS0FBTUcsYUFBYSxtQkFBQUYsQ0FBUSxDQUFSLENBQW5CO0FBQ0EsS0FBTUcsT0FBTyxtQkFBQUgsQ0FBUSxDQUFSLENBQWI7QUFDQSxLQUFJSSxrQkFBa0IsSUFBSUYsVUFBSixFQUF0QjtBQUNBLEtBQU1HLGFBQWEsSUFBSUYsSUFBSixDQUFTLEdBQVQsRUFBYyxHQUFkLEVBQXFCRyxLQUFLQyxNQUFMLEtBQWdCLENBQWpCLEdBQXFCLEdBQXpDLEVBQStDLENBQS9DLENBQW5CO0FBQ0EsS0FBSUMsV0FBVyxFQUFmO0FBQ0EsS0FBTUMsT0FBTyxtQkFBQVQsQ0FBUSxDQUFSLENBQWI7QUFDQSxLQUFNVSxVQUFVLElBQUlELElBQUosQ0FBU0osVUFBVCxFQUFxQkosV0FBckIsQ0FBaEI7QUFDQSxLQUFNVSxRQUFRLG1CQUFBWCxDQUFRLENBQVIsQ0FBZDtBQUNBLEtBQU1ZLFNB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SyxFQUFULEVBQWE7QUFDbEIsZUFBSWpDLEtBQUssQ0FBQ2lDLElBQUksRUFBTCxJQUFXLEVBQVosR0FBbUIsQ0FBQ0EsSUFBSSxFQUFMLElBQVcsQ0FBdEM7QUFDQSxlQUFJaEMsS0FBSyxFQUFUO0FBQ0EsZ0JBQUt6QixNQUFMLENBQVlvRCxJQUFaLENBQWlCLElBQUlyRCxLQUFKLENBQVV5QixFQUFWLEVBQWFDLEVBQWIsQ0FBakI7QUFDRDtBQUNGO0FBQ0QsY0FBTyxLQUFLekIsTUFBWjtBQUNEOzs7MEJBRUkwQixPLEVBQVMxQixNLEVBQVE7QUFDcEIsWUFBSSxJQUFJeUQsSUFBSSxDQUFaLEVBQWVBLElBQUl6RCxPQUFPMEQsTUFBMUIsRUFBa0NELEdBQWxDLEVBQXVDO0FBQUEseUJBQ1B6RCxPQUFPeUQsQ0FBUCxDQURPO0FBQUEsYUFDOUJqQyxDQUQ4QixhQUM5QkEsQ0FEOEI7QUFBQSxhQUMzQkMsQ0FEMkIsYUFDM0JBLENBRDJCO0FBQUEsYUFDeEJWLEtBRHdCLGFBQ3hCQSxLQUR3QjtBQUFBLGFBQ2pCQyxNQURpQixhQUNqQkEsTUFEaUI7O0FBRXJDVSxpQkFBUUMsUUFBUixDQUFpQkgsQ0FBakIsRUFBb0JDLENBQXBCLEVBQXVCVixLQUF2QixFQUE4QkMsTUFBOUI7QUFDRDtBQUNGOzs7Ozs7QUFHSFksUUFBT0MsT0FBUCxHQUFpQjlCLEtBQWpCLEMiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1OTdlOTk3MThmMjllOGY3MmNlOSIsImNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLXNjcmVlbicpO1xuY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5jb25zdCBQYWRkbGUgPSByZXF1aXJlKCcuL1BhZGRsZScpO1xuY29uc3Qgc3RhcnRQYWRkbGUgPSBuZXcgUGFkZGxlKDM1MCwgMTAwLCAxNSk7XG5jb25zdCBLZXlib2FyZGVyID0gcmVxdWlyZSgnLi9rZXlib2FyZGVyJyk7XG5jb25zdCBCYWxsID0gcmVxdWlyZSgnLi9iYWxsLmpzJyk7XG5sZXQga2V5Ym9hcmRNb25pdG9yID0gbmV3IEtleWJvYXJkZXIoKTtcbmNvbnN0IGJvdW5jeUJhbGwgPSBuZXcgQmFsbCg0MDAsIDIwMCwgKChNYXRoLnJhbmRvbSgpICogMykgLTEuNSksIDQpO1xubGV0IGtleVN0YXRlID0ge307XG5jb25zdCBHYW1lID0gcmVxdWlyZSgnLi9HYW1lJyk7XG5jb25zdCBuZXdHYW1lID0gbmV3IEdhbWUoYm91bmN5QmFsbCwgc3RhcnRQYWRkbGUpO1xuY29uc3QgQnJpY2sgPSByZXF1aXJlKCcuL2JyaWNrcy5qcycpO1xuY29uc3QgYnJpY2tzID0gbmV3IEJyaWNrKCk7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQnJpY2tzKCkge1xuICBsZXQgbmV3QnJpY2tzID0gYnJpY2tzLmNyZWF0ZUJyaWNrcygpO1xuICBuZXdCcmlja3MuZm9yRWFjaCggYnJpY2sgPT4gbmV3R2FtZS5ncmFiQnJpY2tzKGJyaWNrKSApXG59O1xuXG5nZW5lcmF0ZUJyaWNrcygpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAga2V5U3RhdGUgPSBrZXlib2FyZE1vbml0b3Iua2V5RG93bihlKTtcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gIGtleVN0YXRlID0ga2V5Ym9hcmRNb25pdG9yLmtleVVwKGUpO1xufSk7XG5cbmZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xuICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gIHN0YXJ0UGFkZGxlLmRyYXcoY3R4KTtcbiAgYm91bmN5QmFsbC5kcmF3KGN0eCk7XG4gIGJvdW5jeUJhbGwuZHkgPSBuZXdHYW1lLnBhZGRsZUJhbGxDb2xsaWRpbmcoYm91bmN5QmFsbCwgc3RhcnRQYWRkbGUpO1xuICBib3VuY3lCYWxsLmR5ID0gbmV3R2FtZS5icmlja0JhbGxDb2xsaWRpbmcoYm91bmN5QmFsbCwgbmV3R2FtZS5icmlja3MpO1xuICBicmlja3MuZHJhdyhjdHgsIG5ld0dhbWUuYnJpY2tzKTtcbiAgYm91bmN5QmFsbC5tb3ZlKGNhbnZhcy5oZWlnaHQsIGNhbnZhcy53aWR0aCk7XG4gIHN0YXJ0UGFkZGxlLmFuaW1hdGUoa2V5U3RhdGUpO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xufTtcblxuZ2FtZUxvb3AoKTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2luZGV4LmpzIiwiY2xhc3MgUGFkZGxlIHtcbiAgY29uc3RydWN0b3IoeCwgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMueSA9IDQ3NTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgfVxuICBkcmF3KGNvbnRleHQpIHtcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cbiAgYW5pbWF0ZShrZXlTdGF0ZSkge1xuICAgIGlmIChrZXlTdGF0ZVszN10gJiYgdGhpcy54ID4gMCkge1xuICAgICAgdGhpcy54IC09IDQ7XG4gICAgfSBlbHNlIGlmIChrZXlTdGF0ZVszOV0gJiYgdGhpcy54IDwgNzAwKSB7XG4gICAgICB0aGlzLnggKz0gNDtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYWRkbGU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL1BhZGRsZS5qcyIsImNsYXNzIEtleWJvYXJkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmtleXMgPSB7XG4gICAgICBsZWZ0OiAzNyxcbiAgICAgIHJpZ2h0OiAzOSxcbiAgICB9XG4gIH1cbiAga2V5RG93bihlKSB7XG4gICAgdmFyIGtleVN0YXRlID0ge307XG4gICAga2V5U3RhdGVbZS5rZXlDb2RlXSA9IHRydWU7XG4gICAgcmV0dXJuIGtleVN0YXRlO1xuICB9O1xuXG4gIGtleVVwKGUpIHtcbiAgICB2YXIga2V5U3RhdGUgPSB7fTtcbiAgICBrZXlTdGF0ZVtlLmtleUNvZGVdID0gZmFsc2U7XG4gICAgcmV0dXJuIGtleVN0YXRlO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIva2V5Ym9hcmRlci5qcyIsImNsYXNzIEJhbGwge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBkeCwgZHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5keCA9IGR4O1xuICAgIHRoaXMuZHkgPSBkeTtcbiAgICB0aGlzLnJhZGl1cyA9IDU7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMucmFkaXVzICogMjtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMucmFkaXVzICogMjtcbiAgfVxuICBkcmF3KGNvbnRleHQpIHtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQuYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIgLGZhbHNlKTtcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgY29udGV4dC5maWxsKCk7XG4gIH1cbiAgbW92ZShjYW52YXNIZWlnaHQsIGNhbnZhc1dpZHRoKSB7XG4gICAgaWYgKCh0aGlzLnggKyB0aGlzLnJhZGl1cykgPj0gY2FudmFzV2lkdGggfHwgKHRoaXMueCAtIHRoaXMucmFkaXVzKSA8PSAwKSB7XG4gICAgICB0aGlzLmR4ID0gLXRoaXMuZHg7XG4gICAgfVxuICAgIGlmICgodGhpcy55IC0gdGhpcy5yYWRpdXMpIDw9IDApIHtcbiAgICAgIHRoaXMuZHkgPSAtdGhpcy5keTtcbiAgICB9XG4gICAgdGhpcy55ICs9IHRoaXMuZHk7XG4gICAgdGhpcy54ICs9IHRoaXMuZHg7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCYWxsO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2JhbGwuanMiLCJjbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoYmFsbCwgcGFkZGxlKSB7XG4gICAgdGhpcy5icmlja3MgPSBbXTtcbiAgICB0aGlzLmRpc2NhcmRlZEJyaWNrcyA9IFtdO1xuICAgIHRoaXMuYmFsbHMgPSBbYmFsbF07XG4gICAgdGhpcy5wYWRkbGUgPSBwYWRkbGU7XG4gICAgdGhpcy5sZXZlbCA9IDE7XG4gIH1cblxuICBjb2xsaXNpb25DaGVjayhvYmoxLCBvYmoyKSB7XG4gICAgaWYgKG9iajEueCA8IG9iajIueCArIG9iajIud2lkdGggICYmIG9iajEueCArIG9iajEud2lkdGggID4gb2JqMi54ICYmXG4gICAgICAgIG9iajEueSA8IG9iajIueSArIG9iajIuaGVpZ2h0ICYmIG9iajEueSArIG9iajEuaGVpZ2h0ID4gb2JqMi55KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHBhZGRsZUJhbGxDb2xsaWRpbmcoYmFsbCwgcGFkZGxlKSB7XG4gICAgdmFyIGJvb2xlYW4gPSB0aGlzLmNvbGxpc2lvbkNoZWNrKGJhbGwsIHBhZGRsZSk7XG4gICAgdmFyIGR5ID0gYmFsbC5keTtcbiAgICBpZiAoYm9vbGVhbiA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGR5ID0gLWR5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZHk7XG4gICAgfVxuICB9XG5cbiAgZ3JhYkJyaWNrcyhicmlja3MpIHtcbiAgICB0aGlzLmJyaWNrcy5wdXNoKGJyaWNrcyk7XG4gIH1cblxuICBicmlja0JhbGxDb2xsaWRpbmcoYmFsbCwgYnJpY2tzKSB7XG4gICAgdmFyIGR5ID0gYmFsbC5keTtcbiAgICBicmlja3MuZm9yRWFjaChmdW5jdGlvbihicmljaykge1xuICAgICAgdmFyIGJvb2xlYW4gPSB0aGlzLmNvbGxpc2lvbkNoZWNrKGJhbGwsIGJyaWNrKTtcbiAgICAgIGlmIChib29sZWFuID09PSB0cnVlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuYnJpY2tzLmluZGV4T2YoYnJpY2spO1xuICAgICAgICB0aGlzLmRpc2NhcmRlZEJyaWNrcyA9IHRoaXMuYnJpY2tzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgcmV0dXJuIGR5ID0gLWR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGR5O1xuICAgICAgfVxuICAgIH0uYmluZCh0aGlzKSlcbiAgICByZXR1cm4gZHk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9HYW1lLmpzIiwiY2xhc3MgQnJpY2sge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMud2lkdGggPSA3NTtcbiAgICB0aGlzLmhlaWdodCA9IDI1O1xuICAgIHRoaXMuYnJpY2tzID0gW107XG4gIH1cblxuICBjcmVhdGVCcmlja3MoKSB7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgIGlmIChpIDw9IDkpIHtcbiAgICAgICAgbGV0IHggPSAoaSAqIDc1KSArIChpICogNSk7XG4gICAgICAgIGxldCB5ID0gKDE1KTtcbiAgICAgICAgdGhpcy5icmlja3MucHVzaChuZXcgQnJpY2soeCwgeSkpO1xuICAgICAgfSBlbHNlIGlmIChpIDw9IDE5KSB7XG4gICAgICAgIGxldCB4ID0gKChpIC0gMTApICogNzUpICsgKChpIC0gMTApICogNSk7XG4gICAgICAgIGxldCB5ID0gKDQ1KTtcbiAgICAgICAgdGhpcy5icmlja3MucHVzaChuZXcgQnJpY2soeCwgeSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5icmlja3M7XG4gIH1cblxuICBkcmF3KGNvbnRleHQsIGJyaWNrcykge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBicmlja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IGJyaWNrc1tpXTtcbiAgICAgIGNvbnRleHQuZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnJpY2s7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvYnJpY2tzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==