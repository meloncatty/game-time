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
<<<<<<< HEAD
	var Bricks = __webpack_require__(5);
	var bricks = new Bricks();
=======
>>>>>>> master
	
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
	  bouncyBall.dy = newGame.paddleBallColliding(bouncyBall, startPaddle);
	  bouncyBall.draw(ctx);
<<<<<<< HEAD
	  bricks.draw(ctx);
=======
>>>>>>> master
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
<<<<<<< HEAD
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
=======
	    this.width = this.radius;
	    this.height = this.radius;
>>>>>>> master
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

/***/ })
/******/ ]);
<<<<<<< HEAD
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzE3ZDc0N2QzODhjMjhlZTAyNTAiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9QYWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2tleWJvYXJkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL0dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL0JhbGwuanMiXSwibmFtZXMiOlsiY2FudmFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3R4IiwiZ2V0Q29udGV4dCIsIlBhZGRsZSIsInJlcXVpcmUiLCJzdGFydFBhZGRsZSIsIktleWJvYXJkZXIiLCJCYWxsIiwia2V5Ym9hcmRNb25pdG9yIiwiYm91bmN5QmFsbCIsIk1hdGgiLCJyYW5kb20iLCJrZXlTdGF0ZSIsIkdhbWUiLCJuZXdHYW1lIiwiQnJpY2tzIiwiYnJpY2tzIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlEb3duIiwia2V5VXAiLCJnYW1lTG9vcCIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiZHJhdyIsImR5IiwicGFkZGxlQmFsbENvbGxpZGluZyIsIm1vdmUiLCJhbmltYXRlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwieCIsInkiLCJjb250ZXh0IiwiZmlsbFJlY3QiLCJtb2R1bGUiLCJleHBvcnRzIiwia2V5cyIsImxlZnQiLCJyaWdodCIsImtleUNvZGUiLCJkeCIsInJhZGl1cyIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwic3Ryb2tlIiwiZmlsbFN0eWxlIiwiZmlsbCIsImNhbnZhc0hlaWdodCIsImNhbnZhc1dpZHRoIiwiYmFsbCIsInBhZGRsZSIsImJhbGxzIiwib2JqMSIsIm9iajIiLCJib29sZWFuIiwiY29sbGlzaW9uQ2hlY2siXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FB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QUFMLEdBQVUsQ0FBQyxLQUFLQSxFQUFoQjtBQUNEO0FBQ0QsV0FBSSxLQUFLVCxDQUFMLElBQVUsQ0FBZCxFQUFpQjtBQUNmLGNBQUtOLEVBQUwsR0FBVSxDQUFDLEtBQUtBLEVBQWhCO0FBQ0Q7QUFDRCxZQUFLTSxDQUFMLElBQVUsS0FBS04sRUFBZjtBQUNBLFlBQUtLLENBQUwsSUFBVSxLQUFLVSxFQUFmO0FBQ0Q7Ozs7OztBQUdITixRQUFPQyxPQUFQLEdBQWlCOUIsSUFBakIsQyIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGMxN2Q3NDdkMzg4YzI4ZWUwMjUwIiwiY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtc2NyZWVuJyk7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmNvbnN0IFBhZGRsZSA9IHJlcXVpcmUoJy4vUGFkZGxlJyk7XG5jb25zdCBzdGFydFBhZGRsZSA9IG5ldyBQYWRkbGUoMzUwLCAxMDAsIDE1KTtcbmNvbnN0IEtleWJvYXJkZXIgPSByZXF1aXJlKCcuL2tleWJvYXJkZXInKTtcbmNvbnN0IEJhbGwgPSByZXF1aXJlKCcuL2JhbGwuanMnKTtcbmNvbnN0IGtleWJvYXJkTW9uaXRvciA9IG5ldyBLZXlib2FyZGVyKCk7XG5jb25zdCBib3VuY3lCYWxsID0gbmV3IEJhbGwoNDAwLCAyMDAsICgoTWF0aC5yYW5kb20oKSAqIDMpIC0xLjUpLCA0KTtcbmxldCBrZXlTdGF0ZSA9IHt9O1xuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vR2FtZScpO1xuY29uc3QgbmV3R2FtZSA9IG5ldyBHYW1lKGJvdW5jeUJhbGwsIHN0YXJ0UGFkZGxlKTtcbmNvbnN0IEJyaWNrcyA9IHJlcXVpcmUoJy4vQmFsbC5qcycpO1xuY29uc3QgYnJpY2tzID0gbmV3IEJyaWNrcygpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAga2V5U3RhdGUgPSBrZXlib2FyZE1vbml0b3Iua2V5RG93bihlKTtcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gIGtleVN0YXRlID0ga2V5Ym9hcmRNb25pdG9yLmtleVVwKGUpO1xufSk7XG5cbmZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gIHN0YXJ0UGFkZGxlLmRyYXcoY3R4KTtcbiAgYm91bmN5QmFsbC5keSA9IG5ld0dhbWUucGFkZGxlQmFsbENvbGxpZGluZyhib3VuY3lCYWxsLCBzdGFydFBhZGRsZSk7XG4gIGJvdW5jeUJhbGwuZHJhdyhjdHgpO1xuICBicmlja3MuZHJhdyhjdHgpXG4gIGJvdW5jeUJhbGwubW92ZShjYW52YXMuaGVpZ2h0LCBjYW52YXMud2lkdGgpO1xuICBzdGFydFBhZGRsZS5hbmltYXRlKGtleVN0YXRlKTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbn07XG5cbmdhbWVMb29wKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvaW5kZXguanMiLCJjbGFzcyBQYWRkbGUge1xuICBjb25zdHJ1Y3Rvcih4LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy55ID0gNDc1O1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG4gIGRyYXcoY29udGV4dCkge1xuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuICBhbmltYXRlKGtleVN0YXRlKSB7XG4gICAgaWYgKGtleVN0YXRlWzM3XSAmJiB0aGlzLnggPiAwKSB7XG4gICAgICB0aGlzLnggLT0gNDtcbiAgICB9IGVsc2UgaWYgKGtleVN0YXRlWzM5XSAmJiB0aGlzLnggPCA3MDApIHtcbiAgICAgIHRoaXMueCArPSA0O1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZGRsZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvUGFkZGxlLmpzIiwiY2xhc3MgS2V5Ym9hcmRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMua2V5cyA9IHtcbiAgICAgIGxlZnQ6IDM3LFxuICAgICAgcmlnaHQ6IDM5LFxuICAgIH1cbiAgfVxuICBrZXlEb3duKGUpIHtcbiAgICB2YXIga2V5U3RhdGUgPSB7fTtcbiAgICBrZXlTdGF0ZVtlLmtleUNvZGVdID0gdHJ1ZTtcbiAgICByZXR1cm4ga2V5U3RhdGU7XG4gIH07XG5cbiAga2V5VXAoZSkge1xuICAgIHZhciBrZXlTdGF0ZSA9IHt9O1xuICAgIGtleVN0YXRlW2Uua2V5Q29kZV0gPSBmYWxzZTtcbiAgICByZXR1cm4ga2V5U3RhdGU7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9rZXlib2FyZGVyLmpzIiwiY2xhc3MgQmFsbCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGR4LCBkeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmR4ID0gZHg7XG4gICAgdGhpcy5keSA9IGR5O1xuICAgIHRoaXMucmFkaXVzID0gNTtcbiAgICB0aGlzLndpZHRoID0gdGhpcy5yYWRpdXMgKiAyO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5yYWRpdXMgKiAyO1xuICB9XG4gIGRyYXcoY29udGV4dCkge1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMiAsZmFsc2UpO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICBjb250ZXh0LmZpbGwoKTtcbiAgfVxuICBtb3ZlKGNhbnZhc0hlaWdodCwgY2FudmFzV2lkdGgpIHtcbiAgICBpZiAodGhpcy54ID49IGNhbnZhc1dpZHRoIHx8IHRoaXMueCA8PSAwKSB7XG4gICAgICB0aGlzLmR4ID0gLXRoaXMuZHg7XG4gICAgfVxuICAgIGlmICh0aGlzLnkgPD0gMCkge1xuICAgICAgdGhpcy5keSA9IC10aGlzLmR5O1xuICAgIH1cbiAgICB0aGlzLnkgKz0gdGhpcy5keTtcbiAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhbGw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvYmFsbC5qcyIsImNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihiYWxsLCBwYWRkbGUpIHtcbiAgICB0aGlzLmJyaWNrcyA9IFtdO1xuICAgIHRoaXMuYmFsbHMgPSBbYmFsbF07XG4gICAgdGhpcy5wYWRkbGUgPSBwYWRkbGU7XG4gIH1cbiAgY29sbGlzaW9uQ2hlY2sob2JqMSwgb2JqMikge1xuICAgIGlmIChvYmoxLnggPCBvYmoyLnggKyBvYmoyLndpZHRoICAmJiBvYmoxLnggKyBvYmoxLndpZHRoICA+IG9iajIueCAmJlxuICAgICAgICBvYmoxLnkgPCBvYmoyLnkgKyBvYmoyLmhlaWdodCAmJiBvYmoxLnkgKyBvYmoxLmhlaWdodCA+IG9iajIueSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcGFkZGxlQmFsbENvbGxpZGluZyhiYWxsLCBwYWRkbGUpIHtcbiAgICB2YXIgYm9vbGVhbiA9IHRoaXMuY29sbGlzaW9uQ2hlY2soYmFsbCwgcGFkZGxlKTtcbiAgICB2YXIgZHkgPSBiYWxsLmR5O1xuICAgIGlmIChib29sZWFuID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZHkgPSAtZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkeTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9HYW1lLmpzIiwiY2xhc3MgQmFsbCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGR4LCBkeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmR4ID0gZHg7XG4gICAgdGhpcy5keSA9IGR5O1xuICAgIHRoaXMucmFkaXVzID0gNTtcbiAgICB0aGlzLndpZHRoID0gdGhpcy5yYWRpdXMgKiAyO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5yYWRpdXMgKiAyO1xuICB9XG4gIGRyYXcoY29udGV4dCkge1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMiAsZmFsc2UpO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICBjb250ZXh0LmZpbGwoKTtcbiAgfVxuICBtb3ZlKGNhbnZhc0hlaWdodCwgY2FudmFzV2lkdGgpIHtcbiAgICBpZiAodGhpcy54ID49IGNhbnZhc1dpZHRoIHx8IHRoaXMueCA8PSAwKSB7XG4gICAgICB0aGlzLmR4ID0gLXRoaXMuZHg7XG4gICAgfVxuICAgIGlmICh0aGlzLnkgPD0gMCkge1xuICAgICAgdGhpcy5keSA9IC10aGlzLmR5O1xuICAgIH1cbiAgICB0aGlzLnkgKz0gdGhpcy5keTtcbiAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhbGw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvQmFsbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=
=======
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTYxOTE1MDJhN2IzNmNiNjA5ZDkiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9QYWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2tleWJvYXJkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL0dhbWUuanMiXSwibmFtZXMiOlsiY2FudmFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3R4IiwiZ2V0Q29udGV4dCIsIlBhZGRsZSIsInJlcXVpcmUiLCJzdGFydFBhZGRsZSIsIktleWJvYXJkZXIiLCJCYWxsIiwia2V5Ym9hcmRNb25pdG9yIiwiYm91bmN5QmFsbCIsIk1hdGgiLCJyYW5kb20iLCJrZXlTdGF0ZSIsIkdhbWUiLCJuZXdHYW1lIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlEb3duIiwia2V5VXAiLCJnYW1lTG9vcCIsImZpbGxTdHlsZSIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiZHJhdyIsImR5IiwicGFkZGxlQmFsbENvbGxpZGluZyIsIm1vdmUiLCJhbmltYXRlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwieCIsInkiLCJjb250ZXh0IiwiZmlsbFJlY3QiLCJtb2R1bGUiLCJleHBvcnRzIiwia2V5cyIsImxlZnQiLCJyaWdodCIsImtleUNvZGUiLCJkeCIsInJhZGl1cyIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwic3Ryb2tlIiwiZmlsbCIsImNhbnZhc0hlaWdodCIsImNhbnZhc1dpZHRoIiwiYmFsbCIsInBhZGRsZSIsImJyaWNrcyIsImJhbGxzIiwib2JqMSIsIm9iajIiLCJib29sZWFuIiwiY29sbGlzaW9uQ2hlY2siXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtB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QUFoQixFQUFzQjtBQUNwQixnQkFBTzlCLEtBQUssQ0FBQ0EsRUFBYjtBQUNELFFBRkQsTUFFTztBQUNMLGdCQUFPQSxFQUFQO0FBQ0Q7QUFDRjs7Ozs7O0FBR0hTLFFBQU9DLE9BQVAsR0FBaUJ2QixJQUFqQixDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTYxOTE1MDJhN2IzNmNiNjA5ZDkiLCJjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS1zY3JlZW4nKTtcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuY29uc3QgUGFkZGxlID0gcmVxdWlyZSgnLi9QYWRkbGUnKTtcbmNvbnN0IHN0YXJ0UGFkZGxlID0gbmV3IFBhZGRsZSgzNTAsIDEwMCwgMTUpO1xuY29uc3QgS2V5Ym9hcmRlciA9IHJlcXVpcmUoJy4va2V5Ym9hcmRlcicpO1xuY29uc3QgQmFsbCA9IHJlcXVpcmUoJy4vYmFsbC5qcycpO1xubGV0IGtleWJvYXJkTW9uaXRvciA9IG5ldyBLZXlib2FyZGVyKCk7XG5jb25zdCBib3VuY3lCYWxsID0gbmV3IEJhbGwoNDAwLCAyMDAsICgoTWF0aC5yYW5kb20oKSAqIDMpIC0xLjUpLCA0KTtcbmxldCBrZXlTdGF0ZSA9IHt9O1xuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vR2FtZScpO1xubGV0IG5ld0dhbWUgPSBuZXcgR2FtZShib3VuY3lCYWxsLCBzdGFydFBhZGRsZSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICBrZXlTdGF0ZSA9IGtleWJvYXJkTW9uaXRvci5rZXlEb3duKGUpO1xufSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAga2V5U3RhdGUgPSBrZXlib2FyZE1vbml0b3Iua2V5VXAoZSk7XG59KTtcblxuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG4gIGN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XG4gIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgc3RhcnRQYWRkbGUuZHJhdyhjdHgpO1xuICBib3VuY3lCYWxsLmR5ID0gbmV3R2FtZS5wYWRkbGVCYWxsQ29sbGlkaW5nKGJvdW5jeUJhbGwsIHN0YXJ0UGFkZGxlKTtcbiAgYm91bmN5QmFsbC5kcmF3KGN0eCk7XG4gIGJvdW5jeUJhbGwubW92ZShjYW52YXMuaGVpZ2h0LCBjYW52YXMud2lkdGgpO1xuICBzdGFydFBhZGRsZS5hbmltYXRlKGtleVN0YXRlKTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbn07XG5cbmdhbWVMb29wKCk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9pbmRleC5qcyIsImNsYXNzIFBhZGRsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLnkgPSA0NzU7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cbiAgZHJhdyhjb250ZXh0KSB7XG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG4gIGFuaW1hdGUoa2V5U3RhdGUpIHtcbiAgICBpZiAoa2V5U3RhdGVbMzddICYmIHRoaXMueCA+IDApIHtcbiAgICAgIHRoaXMueCAtPSA0O1xuICAgIH0gZWxzZSBpZiAoa2V5U3RhdGVbMzldICYmIHRoaXMueCA8IDcwMCkge1xuICAgICAgdGhpcy54ICs9IDQ7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFkZGxlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9QYWRkbGUuanMiLCJjbGFzcyBLZXlib2FyZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5rZXlzID0ge1xuICAgICAgbGVmdDogMzcsXG4gICAgICByaWdodDogMzksXG4gICAgfVxuICB9XG4gIGtleURvd24oZSkge1xuICAgIHZhciBrZXlTdGF0ZSA9IHt9O1xuICAgIGtleVN0YXRlW2Uua2V5Q29kZV0gPSB0cnVlO1xuICAgIHJldHVybiBrZXlTdGF0ZTtcbiAgfTtcblxuICBrZXlVcChlKSB7XG4gICAgdmFyIGtleVN0YXRlID0ge307XG4gICAga2V5U3RhdGVbZS5rZXlDb2RlXSA9IGZhbHNlO1xuICAgIHJldHVybiBrZXlTdGF0ZTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2tleWJvYXJkZXIuanMiLCJjbGFzcyBCYWxsIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgZHgsIGR5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuZHggPSBkeDtcbiAgICB0aGlzLmR5ID0gZHk7XG4gICAgdGhpcy5yYWRpdXMgPSA1O1xuICAgIHRoaXMud2lkdGggPSB0aGlzLnJhZGl1cztcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMucmFkaXVzO1xuICB9XG4gIGRyYXcoY29udGV4dCkge1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMiAsZmFsc2UpO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICBjb250ZXh0LmZpbGwoKTtcbiAgfVxuICBtb3ZlKGNhbnZhc0hlaWdodCwgY2FudmFzV2lkdGgpIHtcbiAgICBpZiAodGhpcy54ID49IGNhbnZhc1dpZHRoIHx8IHRoaXMueCA8PSAwKSB7XG4gICAgICB0aGlzLmR4ID0gLXRoaXMuZHg7XG4gICAgfVxuICAgIGlmICh0aGlzLnkgPD0gMCkge1xuICAgICAgdGhpcy5keSA9IC10aGlzLmR5O1xuICAgIH1cbiAgICB0aGlzLnkgKz0gdGhpcy5keTtcbiAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhbGw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvYmFsbC5qcyIsImNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihiYWxsLCBwYWRkbGUpIHtcbiAgICB0aGlzLmJyaWNrcyA9IFtdO1xuICAgIHRoaXMuYmFsbHMgPSBbYmFsbF07XG4gICAgdGhpcy5wYWRkbGUgPSBwYWRkbGU7XG4gIH1cbiAgY29sbGlzaW9uQ2hlY2sob2JqMSwgb2JqMikge1xuICAgIGlmIChvYmoxLnggPCBvYmoyLnggKyBvYmoyLndpZHRoICAmJiBvYmoxLnggKyBvYmoxLndpZHRoICA+IG9iajIueCAmJlxuICAgICAgICBvYmoxLnkgPCBvYmoyLnkgKyBvYmoyLmhlaWdodCAmJiBvYmoxLnkgKyBvYmoxLmhlaWdodCA+IG9iajIueSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcGFkZGxlQmFsbENvbGxpZGluZyhiYWxsLCBwYWRkbGUpIHtcbiAgICB2YXIgYm9vbGVhbiA9IHRoaXMuY29sbGlzaW9uQ2hlY2soYmFsbCwgcGFkZGxlKTtcbiAgICB2YXIgZHkgPSBiYWxsLmR5O1xuICAgIGlmIChib29sZWFuID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZHkgPSAtZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkeTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9HYW1lLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
>>>>>>> master
