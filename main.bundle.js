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
	var Bricks = __webpack_require__(5);
	var bricks = new Bricks();
	
	window.addEventListener('keydown', function (e) {
	  keyState = keyboardMonitor.keyDown(e);
	});
	
	window.addEventListener('keyup', function (e) {
	  keyState = keyboardMonitor.keyUp(e);
	});
	
	function gameLoop() {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  startPaddle.draw(ctx);
	  bouncyBall.dy = newGame.paddleBallColliding(bouncyBall, startPaddle);
	  bouncyBall.draw(ctx);
	  bricks.draw(ctx);
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
	      if (this.x >= canvasWidth || this.x <= 0) {
	        this.dx = -this.dx;
	      }
	      if (this.y <= 0) {
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
	    this.balls = [ball];
	    this.paddle = paddle;
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
	      if (this.x >= canvasWidth || this.x <= 0) {
	        this.dx = -this.dx;
	      }
	      if (this.y <= 0) {
	        this.dy = -this.dy;
	      }
	      this.y += this.dy;
	      this.x += this.dx;
	    }
	  }]);
	
	  return Ball;
	}();
	
	module.exports = Ball;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzE3ZDc0N2QzODhjMjhlZTAyNTAiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9QYWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2tleWJvYXJkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL0dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL0JhbGwuanMiXSwibmFtZXMiOlsiY2FudmFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3R4IiwiZ2V0Q29udGV4dCIsIlBhZGRsZSIsInJlcXVpcmUiLCJzdGFydFBhZGRsZSIsIktleWJvYXJkZXIiLCJCYWxsIiwia2V5Ym9hcmRNb25pdG9yIiwiYm91bmN5QmFsbCIsIk1hdGgiLCJyYW5kb20iLCJrZXlTdGF0ZSIsIkdhbWUiLCJuZXdHYW1lIiwiQnJpY2tzIiwiYnJpY2tzIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlEb3duIiwia2V5VXAiLCJnYW1lTG9vcCIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiZHJhdyIsImR5IiwicGFkZGxlQmFsbENvbGxpZGluZyIsIm1vdmUiLCJhbmltYXRlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwieCIsInkiLCJjb250ZXh0IiwiZmlsbFJlY3QiLCJtb2R1bGUiLCJleHBvcnRzIiwia2V5cyIsImxlZnQiLCJyaWdodCIsImtleUNvZGUiLCJkeCIsInJhZGl1cyIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwic3Ryb2tlIiwiZmlsbFN0eWxlIiwiZmlsbCIsImNhbnZhc0hlaWdodCIsImNhbnZhc1dpZHRoIiwiYmFsbCIsInBhZGRsZSIsImJhbGxzIiwib2JqMSIsIm9iajIiLCJib29sZWFuIiwiY29sbGlzaW9uQ2hlY2siXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FB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QUFMLEdBQVUsQ0FBQyxLQUFLQSxFQUFoQjtBQUNEO0FBQ0QsV0FBSSxLQUFLVCxDQUFMLElBQVUsQ0FBZCxFQUFpQjtBQUNmLGNBQUtOLEVBQUwsR0FBVSxDQUFDLEtBQUtBLEVBQWhCO0FBQ0Q7QUFDRCxZQUFLTSxDQUFMLElBQVUsS0FBS04sRUFBZjtBQUNBLFlBQUtLLENBQUwsSUFBVSxLQUFLVSxFQUFmO0FBQ0Q7Ozs7OztBQUdITixRQUFPQyxPQUFQLEdBQWlCOUIsSUFBakIsQyIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGMxN2Q3NDdkMzg4YzI4ZWUwMjUwIiwiY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtc2NyZWVuJyk7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmNvbnN0IFBhZGRsZSA9IHJlcXVpcmUoJy4vUGFkZGxlJyk7XG5jb25zdCBzdGFydFBhZGRsZSA9IG5ldyBQYWRkbGUoMzUwLCAxMDAsIDE1KTtcbmNvbnN0IEtleWJvYXJkZXIgPSByZXF1aXJlKCcuL2tleWJvYXJkZXInKTtcbmNvbnN0IEJhbGwgPSByZXF1aXJlKCcuL2JhbGwuanMnKTtcbmNvbnN0IGtleWJvYXJkTW9uaXRvciA9IG5ldyBLZXlib2FyZGVyKCk7XG5jb25zdCBib3VuY3lCYWxsID0gbmV3IEJhbGwoNDAwLCAyMDAsICgoTWF0aC5yYW5kb20oKSAqIDMpIC0xLjUpLCA0KTtcbmxldCBrZXlTdGF0ZSA9IHt9O1xuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vR2FtZScpO1xuY29uc3QgbmV3R2FtZSA9IG5ldyBHYW1lKGJvdW5jeUJhbGwsIHN0YXJ0UGFkZGxlKTtcbmNvbnN0IEJyaWNrcyA9IHJlcXVpcmUoJy4vQmFsbC5qcycpO1xuY29uc3QgYnJpY2tzID0gbmV3IEJyaWNrcygpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAga2V5U3RhdGUgPSBrZXlib2FyZE1vbml0b3Iua2V5RG93bihlKTtcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gIGtleVN0YXRlID0ga2V5Ym9hcmRNb25pdG9yLmtleVVwKGUpO1xufSk7XG5cbmZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gIHN0YXJ0UGFkZGxlLmRyYXcoY3R4KTtcbiAgYm91bmN5QmFsbC5keSA9IG5ld0dhbWUucGFkZGxlQmFsbENvbGxpZGluZyhib3VuY3lCYWxsLCBzdGFydFBhZGRsZSk7XG4gIGJvdW5jeUJhbGwuZHJhdyhjdHgpO1xuICBicmlja3MuZHJhdyhjdHgpXG4gIGJvdW5jeUJhbGwubW92ZShjYW52YXMuaGVpZ2h0LCBjYW52YXMud2lkdGgpO1xuICBzdGFydFBhZGRsZS5hbmltYXRlKGtleVN0YXRlKTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbn07XG5cbmdhbWVMb29wKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvaW5kZXguanMiLCJjbGFzcyBQYWRkbGUge1xuICBjb25zdHJ1Y3Rvcih4LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy55ID0gNDc1O1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG4gIGRyYXcoY29udGV4dCkge1xuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuICBhbmltYXRlKGtleVN0YXRlKSB7XG4gICAgaWYgKGtleVN0YXRlWzM3XSAmJiB0aGlzLnggPiAwKSB7XG4gICAgICB0aGlzLnggLT0gNDtcbiAgICB9IGVsc2UgaWYgKGtleVN0YXRlWzM5XSAmJiB0aGlzLnggPCA3MDApIHtcbiAgICAgIHRoaXMueCArPSA0O1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZGRsZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvUGFkZGxlLmpzIiwiY2xhc3MgS2V5Ym9hcmRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMua2V5cyA9IHtcbiAgICAgIGxlZnQ6IDM3LFxuICAgICAgcmlnaHQ6IDM5LFxuICAgIH1cbiAgfVxuICBrZXlEb3duKGUpIHtcbiAgICB2YXIga2V5U3RhdGUgPSB7fTtcbiAgICBrZXlTdGF0ZVtlLmtleUNvZGVdID0gdHJ1ZTtcbiAgICByZXR1cm4ga2V5U3RhdGU7XG4gIH07XG5cbiAga2V5VXAoZSkge1xuICAgIHZhciBrZXlTdGF0ZSA9IHt9O1xuICAgIGtleVN0YXRlW2Uua2V5Q29kZV0gPSBmYWxzZTtcbiAgICByZXR1cm4ga2V5U3RhdGU7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9rZXlib2FyZGVyLmpzIiwiY2xhc3MgQmFsbCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGR4LCBkeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmR4ID0gZHg7XG4gICAgdGhpcy5keSA9IGR5O1xuICAgIHRoaXMucmFkaXVzID0gNTtcbiAgICB0aGlzLndpZHRoID0gdGhpcy5yYWRpdXMgKiAyO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5yYWRpdXMgKiAyO1xuICB9XG4gIGRyYXcoY29udGV4dCkge1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMiAsZmFsc2UpO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICBjb250ZXh0LmZpbGwoKTtcbiAgfVxuICBtb3ZlKGNhbnZhc0hlaWdodCwgY2FudmFzV2lkdGgpIHtcbiAgICBpZiAodGhpcy54ID49IGNhbnZhc1dpZHRoIHx8IHRoaXMueCA8PSAwKSB7XG4gICAgICB0aGlzLmR4ID0gLXRoaXMuZHg7XG4gICAgfVxuICAgIGlmICh0aGlzLnkgPD0gMCkge1xuICAgICAgdGhpcy5keSA9IC10aGlzLmR5O1xuICAgIH1cbiAgICB0aGlzLnkgKz0gdGhpcy5keTtcbiAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhbGw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvYmFsbC5qcyIsImNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihiYWxsLCBwYWRkbGUpIHtcbiAgICB0aGlzLmJyaWNrcyA9IFtdO1xuICAgIHRoaXMuYmFsbHMgPSBbYmFsbF07XG4gICAgdGhpcy5wYWRkbGUgPSBwYWRkbGU7XG4gIH1cbiAgY29sbGlzaW9uQ2hlY2sob2JqMSwgb2JqMikge1xuICAgIGlmIChvYmoxLnggPCBvYmoyLnggKyBvYmoyLndpZHRoICAmJiBvYmoxLnggKyBvYmoxLndpZHRoICA+IG9iajIueCAmJlxuICAgICAgICBvYmoxLnkgPCBvYmoyLnkgKyBvYmoyLmhlaWdodCAmJiBvYmoxLnkgKyBvYmoxLmhlaWdodCA+IG9iajIueSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcGFkZGxlQmFsbENvbGxpZGluZyhiYWxsLCBwYWRkbGUpIHtcbiAgICB2YXIgYm9vbGVhbiA9IHRoaXMuY29sbGlzaW9uQ2hlY2soYmFsbCwgcGFkZGxlKTtcbiAgICB2YXIgZHkgPSBiYWxsLmR5O1xuICAgIGlmIChib29sZWFuID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZHkgPSAtZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkeTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9HYW1lLmpzIiwiY2xhc3MgQmFsbCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGR4LCBkeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmR4ID0gZHg7XG4gICAgdGhpcy5keSA9IGR5O1xuICAgIHRoaXMucmFkaXVzID0gNTtcbiAgICB0aGlzLndpZHRoID0gdGhpcy5yYWRpdXMgKiAyO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5yYWRpdXMgKiAyO1xuICB9XG4gIGRyYXcoY29udGV4dCkge1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMiAsZmFsc2UpO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICBjb250ZXh0LmZpbGwoKTtcbiAgfVxuICBtb3ZlKGNhbnZhc0hlaWdodCwgY2FudmFzV2lkdGgpIHtcbiAgICBpZiAodGhpcy54ID49IGNhbnZhc1dpZHRoIHx8IHRoaXMueCA8PSAwKSB7XG4gICAgICB0aGlzLmR4ID0gLXRoaXMuZHg7XG4gICAgfVxuICAgIGlmICh0aGlzLnkgPD0gMCkge1xuICAgICAgdGhpcy5keSA9IC10aGlzLmR5O1xuICAgIH1cbiAgICB0aGlzLnkgKz0gdGhpcy5keTtcbiAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhbGw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvQmFsbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=