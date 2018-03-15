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
	var Keyboarder = __webpack_require__(2);
	var Ball = __webpack_require__(3);
	var keyboardMonitor = new Keyboarder();
	var bouncyBall = new Ball(395, 200, 0, 4);
	var keyState = {};
	var test = 'test';
	
	window.addEventListener('keydown', function (e) {
	  keyState = keyboardMonitor.keyDown(e);
	});
	
	window.addEventListener('keyup', function (e) {
	  keyState = keyboardMonitor.keyUp(e);
	});
	
	var startPaddle = new Paddle(350, 100, 15);
	
	function gameLoop() {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  startPaddle.draw(ctx);
	  bouncyBall.draw(ctx);
	  bouncyBall.move();
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
	    value: function move() {
	      this.y += this.dy;
	      this.x += this.dx;
	    }
	  }]);
	
	  return Ball;
	}();
	
	module.exports = Ball;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmZmNTI0NDk3MDhlOWZlMzMxNjUiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9QYWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2tleWJvYXJkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2JhbGwuanMiXSwibmFtZXMiOlsiY2FudmFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3R4IiwiZ2V0Q29udGV4dCIsIlBhZGRsZSIsInJlcXVpcmUiLCJLZXlib2FyZGVyIiwiQmFsbCIsImtleWJvYXJkTW9uaXRvciIsImJvdW5jeUJhbGwiLCJrZXlTdGF0ZSIsInRlc3QiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleURvd24iLCJrZXlVcCIsInN0YXJ0UGFkZGxlIiwiZ2FtZUxvb3AiLCJjbGVhclJlY3QiLCJ3aWR0aCIsImhlaWdodCIsImRyYXciLCJtb3ZlIiwiYW5pbWF0ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIngiLCJ5IiwiY29udGV4dCIsImZpbGxSZWN0IiwibW9kdWxlIiwiZXhwb3J0cyIsImtleXMiLCJsZWZ0IiwicmlnaHQiLCJrZXlDb2RlIiwiZHgiLCJkeSIsInJhZGl1cyIsImJlZ2luUGF0aCIsImFyYyIsIk1hdGgiLCJQSSIsInN0cm9rZSIsImZpbGxTdHlsZSIsImZpbGwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsS0FBTUEsU0FBU0MsU0FBU0MsYUFBVCxDQUF1QixjQUF2QixDQUFmO0FBQ0EsS0FBTUMsTUFBTUgsT0FB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LENBQUwsR0FBU0EsQ0FBVDtBQUNBLFVBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFVBQUtTLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFVBQUtDLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFVBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0Q7Ozs7MEJBQ0lWLE8sRUFBUztBQUNaQSxlQUFRVyxTQUFSO0FBQ0FYLGVBQVFZLEdBQVIsQ0FBWSxLQUFLZCxDQUFqQixFQUFvQixLQUFLQyxDQUF6QixFQUE0QixLQUFLVyxNQUFqQyxFQUF5QyxDQUF6QyxFQUE0Q0csS0FBS0MsRUFBTCxHQUFVLENBQXRELEVBQXlELEtBQXpEO0FBQ0FkLGVBQVFlLE1BQVI7QUFDQWYsZUFBUWdCLFNBQVIsR0FBb0IsTUFBcEI7QUFDQWhCLGVBQVFpQixJQUFSO0FBQ0Q7Ozs0QkFDTTtBQUNMLFlBQUtsQixDQUFMLElBQVUsS0FBS1UsRUFBZjtBQUNBLFlBQUtYLENBQUwsSUFBVSxLQUFLVSxFQUFmO0FBQ0Q7Ozs7OztBQUdITixRQUFPQyxPQUFQLEdBQWlCeEIsSUFBakIsQyIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJmZjUyNDQ5NzA4ZTlmZTMzMTY1IiwiY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtc2NyZWVuJyk7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmNvbnN0IFBhZGRsZSA9IHJlcXVpcmUoJy4vUGFkZGxlJyk7XG5jb25zdCBLZXlib2FyZGVyID0gcmVxdWlyZSgnLi9rZXlib2FyZGVyJyk7XG5jb25zdCBCYWxsID0gcmVxdWlyZSgnLi9iYWxsLmpzJyk7XG5jb25zdCBrZXlib2FyZE1vbml0b3IgPSBuZXcgS2V5Ym9hcmRlcigpO1xuY29uc3QgYm91bmN5QmFsbCA9IG5ldyBCYWxsKDM5NSwgMjAwLCAwLCA0KTtcbmxldCBrZXlTdGF0ZSA9IHt9O1xuY29uc3QgdGVzdCA9ICd0ZXN0Jztcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gIGtleVN0YXRlID0ga2V5Ym9hcmRNb25pdG9yLmtleURvd24oZSk7XG59KTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICBrZXlTdGF0ZSA9IGtleWJvYXJkTW9uaXRvci5rZXlVcChlKTtcbn0pO1xuXG5jb25zdCBzdGFydFBhZGRsZSA9IG5ldyBQYWRkbGUoMzUwLCAxMDAsIDE1KTtcblxuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG4gIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgc3RhcnRQYWRkbGUuZHJhdyhjdHgpO1xuICBib3VuY3lCYWxsLmRyYXcoY3R4KTtcbiAgYm91bmN5QmFsbC5tb3ZlKCk7XG4gIHN0YXJ0UGFkZGxlLmFuaW1hdGUoa2V5U3RhdGUpO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xufTtcblxuZ2FtZUxvb3AoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9pbmRleC5qcyIsImNsYXNzIFBhZGRsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLnkgPSA0NzU7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cbiAgZHJhdyhjb250ZXh0KSB7XG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG4gIGFuaW1hdGUoa2V5U3RhdGUpIHtcbiAgICBpZiAoa2V5U3RhdGVbMzddICYmIHRoaXMueCA+IDApIHtcbiAgICAgIHRoaXMueCAtPSA0O1xuICAgIH0gZWxzZSBpZiAoa2V5U3RhdGVbMzldICYmIHRoaXMueCA8IDcwMCkge1xuICAgICAgdGhpcy54ICs9IDQ7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFkZGxlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9QYWRkbGUuanMiLCJjbGFzcyBLZXlib2FyZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5rZXlzID0ge1xuICAgICAgbGVmdDogMzcsXG4gICAgICByaWdodDogMzksXG4gICAgfVxuICB9XG4gIGtleURvd24oZSkge1xuICAgIHZhciBrZXlTdGF0ZSA9IHt9O1xuICAgIGtleVN0YXRlW2Uua2V5Q29kZV0gPSB0cnVlO1xuICAgIHJldHVybiBrZXlTdGF0ZTtcbiAgfTtcblxuICBrZXlVcChlKSB7XG4gICAgdmFyIGtleVN0YXRlID0ge307XG4gICAga2V5U3RhdGVbZS5rZXlDb2RlXSA9IGZhbHNlO1xuICAgIHJldHVybiBrZXlTdGF0ZTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2tleWJvYXJkZXIuanMiLCJjbGFzcyBCYWxsIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgZHgsIGR5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuZHggPSBkeDtcbiAgICB0aGlzLmR5ID0gZHk7XG4gICAgdGhpcy5yYWRpdXMgPSA1O1xuICB9XG4gIGRyYXcoY29udGV4dCkge1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMiAsZmFsc2UpO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICBjb250ZXh0LmZpbGwoKTtcbiAgfVxuICBtb3ZlKCkge1xuICAgIHRoaXMueSArPSB0aGlzLmR5O1xuICAgIHRoaXMueCArPSB0aGlzLmR4O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFsbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9iYWxsLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==