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
	var keyboardMonitor = new Keyboarder();
	var keyState = {};
	var test = 'test';
	
	window.addEventListener('keydown', function (e) {
	  keyState = keyboardMonitor.keyDown(e);
	});
	
	window.addEventListener('keyup', function (e) {
	  keyState = keyboardMonitor.keyUp(e);
	});
	
	var startPaddle = new Paddle(50, 100, 15);
	
	function gameLoop() {
	  startPaddle.draw(ctx);
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
	    this.dx = 0;
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
	      if (keyState.left === true) {
	        this.x -= 2;
	      } else if (keyState.right === true) {
	        this.x += 2;
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
	      if (e.keyCode === 37) {
	        keyState.left = true;
	      } else if (e.keyCode === 39) {
	        keyState.right = true;
	      };
	      return keyState;
	    }
	  }, {
	    key: "keyUp",
	    value: function keyUp(e) {
	      var keyState = {};
	      if (e.keyCode === 37) {
	        keyState.left = false;
	      } else if (e.keyCode === 39) {
	        keyState.right = false;
	      };
	      return keyState;
	    }
	  }]);
	
	  return Keyboarder;
	}();
	
	module.exports = Keyboarder;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWE5ZWVkZWI2YmIzZjE1YmM3ZjMiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9QYWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2tleWJvYXJkZXIuanMiXSwibmFtZXMiOlsiY2FudmFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3R4IiwiZ2V0Q29udGV4dCIsIlBhZGRsZSIsInJlcXVpcmUiLCJLZXlib2FyZGVyIiwia2V5Ym9hcmRNb25pdG9yIiwia2V5U3RhdGUiLCJ0ZXN0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlEb3duIiwia2V5VXAiLCJzdGFydFBhZGRsZSIsImdhbWVMb29wIiwiZHJhdyIsImFuaW1hdGUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ4Iiwid2lkdGgiLCJoZWlnaHQiLCJ5IiwiZHgiLCJjb250ZXh0IiwiZmlsbFJlY3QiLCJsZWZ0IiwicmlnaHQiLCJtb2R1bGUiLCJleHBvcnRzIiwia2V5cyIsImtleUNvZGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsS0FBSUEsU0FBU0MsU0FBU0MsYUFBVCxDQUF1QixjQUF2QixDQUFiO0FBQ0EsS0FBSUMsTUFBTUgsT0FBT0ksVUFBUCxDQUFrQixJQUFsQixDQUFWO0FBQ0EsS0FBSUMsU0FBUyxtQkFBQUMsQ0FBUSxDQUFSLENBQWI7QUFDQSxLQUFJQyxhQUFhLG1CQUFBRCxDQUFRLENBQVIsQ0FBakI7QUFDQSxLQUFJRSxrQkFBa0IsSUFBSUQsVUFBSixFQUF0QjtBQUNBLEtBQUlFLFdBQVcsRUFBZjtBQUNBLEtBQUlDLE9BQU8sTUFBWDs7QUFFQUMsUUFBT0MsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsVUFBU0MsQ0FBVCxFQUFZO0FBQzdDSixjQUFXRCxnQkFBZ0JNLE9BQWhCLENBQXdCRCxDQUF4QixDQUFYO0FBQ0QsRUFGRDs7QUFJQUYsUUFBT0MsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBU0MsQ0FBVCxFQUFZO0FBQzNDSixjQUFXRCxnQkFBZ0JPLEtBQWhCLENBQXNCRixDQUF0QixDQUFYO0FBQ0QsRUFGRDs7QUFJQSxLQUFJRyxjQUFjLElBQUlYLE1BQUosQ0FBVyxFQUFYLEVBQWUsR0FBZixFQUFvQixFQUFwQixDQUFsQjs7QUFFQSxVQUFTWSxRQUFULEdBQW9CO0FBQ2xCRCxlQUFZRSxJQUFaLENBQWlCZixHQUFqQjtBQUNBYSxlQUFZRyxPQUFaLENBQW9CVixRQUFwQjtBQUNBVyx5QkFBc0JILFFBQXRCO0FBQ0Q7O0FBRURBLFk7Ozs7Ozs7Ozs7OztLQ3hCTVosTTtBQUNKLG1CQUFZZ0IsQ0FBWixFQUFlQyxLQUFmLEVBQXNCQyxNQUF0QixFQUE4QjtBQUFBOztBQUM1QixVQUFLQyxDQUFMLEdBQVMsR0FBVDtBQUNBLFVBQUtILENBQUwsR0FBU0EsQ0FBVDtBQUNBLFVBQUtJLEVBQUwsR0FBVSxDQUFWO0FBQ0EsVUFBS0gsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsVUFBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0Q7Ozs7MEJBQ0lHLE8sRUFBUztBQUNaQSxlQUFRQyxRQUFSLENBQWlCLEtBQUtOLENBQXRCLEVBQXlCLEtBQUtHLENBQTlCLEVBQWlDLEtBQUtGLEtBQXRDLEVBQTZDLEtBQUtDLE1BQWxEO0FBQ0Q7Ozs2QkFDT2QsUSxFQUFVO0FBQ2hCLFdBQUlBLFNBQVNtQixJQUFULEtBQWtCLElBQXRCLEVBQTRCO0FBQzFCLGNBQUtQLENBQUwsSUFBVSxDQUFWO0FBQ0QsUUFGRCxNQUVPLElBQUlaLFNBQVNvQixLQUFULEtBQW1CLElBQXZCLEVBQTZCO0FBQ2xDLGNBQUtSLENBQUwsSUFBVSxDQUFWO0FBQ0Q7QUFDRjs7Ozs7O0FBR0hTLFFBQU9DLE9BQVAsR0FBaUIxQixNQUFqQixDOzs7Ozs7Ozs7Ozs7S0NwQk1FLFU7QUFDSix5QkFBYztBQUFBOztBQUNaLFVBQUt5QixJQUFMLEdBQVk7QUFDVkosYUFBTSxFQURJO0FBRVZDLGNBQU87QUFGRyxNQUFaO0FBSUQ7Ozs7NkJBQ09oQixDLEVBQUc7QUFDVCxXQUFJSixXQUFXLEVBQWY7QUFDQSxXQUFJSSxFQUFFb0IsT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQ3BCeEIsa0JBQVNtQixJQUFULEdBQWdCLElBQWhCO0FBQ0QsUUFGRCxNQUVPLElBQUlmLEVBQUVvQixPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDM0J4QixrQkFBU29CLEtBQVQsR0FBaUIsSUFBakI7QUFDRDtBQUNELGNBQU9wQixRQUFQO0FBQ0Q7OzsyQkFFS0ksQyxFQUFHO0FBQ1AsV0FBSUosV0FBVyxFQUFmO0FBQ0EsV0FBSUksRUFBRW9CLE9BQUYsS0FBYyxFQUFsQixFQUFzQjtBQUNwQnhCLGtCQUFTbUIsSUFBVCxHQUFnQixLQUFoQjtBQUNELFFBRkQsTUFFTyxJQUFJZixFQUFFb0IsT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQzNCeEIsa0JBQVNvQixLQUFULEdBQWlCLEtBQWpCO0FBQ0Q7QUFDRCxjQUFPcEIsUUFBUDtBQUNEOzs7Ozs7QUFJSHFCLFFBQU9DLE9BQVAsR0FBaUJ4QixVQUFqQixDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWE5ZWVkZWI2YmIzZjE1YmM3ZjMiLCJ2YXIgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtc2NyZWVuJyk7XG52YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG52YXIgUGFkZGxlID0gcmVxdWlyZSgnLi9QYWRkbGUnKTtcbnZhciBLZXlib2FyZGVyID0gcmVxdWlyZSgnLi9rZXlib2FyZGVyJyk7XG52YXIga2V5Ym9hcmRNb25pdG9yID0gbmV3IEtleWJvYXJkZXIoKTtcbnZhciBrZXlTdGF0ZSA9IHt9O1xudmFyIHRlc3QgPSAndGVzdCc7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICBrZXlTdGF0ZSA9IGtleWJvYXJkTW9uaXRvci5rZXlEb3duKGUpO1xufSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAga2V5U3RhdGUgPSBrZXlib2FyZE1vbml0b3Iua2V5VXAoZSk7XG59KTtcblxudmFyIHN0YXJ0UGFkZGxlID0gbmV3IFBhZGRsZSg1MCwgMTAwLCAxNSk7XG5cbmZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICBzdGFydFBhZGRsZS5kcmF3KGN0eCk7XG4gIHN0YXJ0UGFkZGxlLmFuaW1hdGUoa2V5U3RhdGUpO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xufTtcblxuZ2FtZUxvb3AoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9pbmRleC5qcyIsImNsYXNzIFBhZGRsZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLnkgPSA0NzU7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLmR4ID0gMDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cbiAgZHJhdyhjb250ZXh0KSB7XG4gICAgY29udGV4dC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG4gIGFuaW1hdGUoa2V5U3RhdGUpIHtcbiAgICBpZiAoa2V5U3RhdGUubGVmdCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy54IC09IDI7XG4gICAgfSBlbHNlIGlmIChrZXlTdGF0ZS5yaWdodCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy54ICs9IDI7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFkZGxlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9QYWRkbGUuanMiLCJjbGFzcyBLZXlib2FyZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5rZXlzID0ge1xuICAgICAgbGVmdDogMzcsXG4gICAgICByaWdodDogMzksXG4gICAgfVxuICB9XG4gIGtleURvd24oZSkge1xuICAgIHZhciBrZXlTdGF0ZSA9IHt9O1xuICAgIGlmIChlLmtleUNvZGUgPT09IDM3KSB7XG4gICAgICBrZXlTdGF0ZS5sZWZ0ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgIGtleVN0YXRlLnJpZ2h0ID0gdHJ1ZTtcbiAgICB9O1xuICAgIHJldHVybiBrZXlTdGF0ZTtcbiAgfTtcblxuICBrZXlVcChlKSB7XG4gICAgdmFyIGtleVN0YXRlID0ge307XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMzcpIHtcbiAgICAgIGtleVN0YXRlLmxlZnQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgIGtleVN0YXRlLnJpZ2h0ID0gZmFsc2U7XG4gICAgfTtcbiAgICByZXR1cm4ga2V5U3RhdGU7XG4gIH07XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2tleWJvYXJkZXIuanMiXSwic291cmNlUm9vdCI6IiJ9