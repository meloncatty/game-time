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
	
	var startPaddle = new Paddle(350, 100, 15);
	
	function gameLoop() {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDkwZjdiZjBlYTVkMzM0ZDNhNDQiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9QYWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2tleWJvYXJkZXIuanMiXSwibmFtZXMiOlsiY2FudmFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3R4IiwiZ2V0Q29udGV4dCIsIlBhZGRsZSIsInJlcXVpcmUiLCJLZXlib2FyZGVyIiwia2V5Ym9hcmRNb25pdG9yIiwia2V5U3RhdGUiLCJ0ZXN0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlEb3duIiwia2V5VXAiLCJzdGFydFBhZGRsZSIsImdhbWVMb29wIiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJkcmF3IiwiYW5pbWF0ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIngiLCJ5IiwiY29udGV4dCIsImZpbGxSZWN0IiwibW9kdWxlIiwiZXhwb3J0cyIsImtleXMiLCJsZWZ0IiwicmlnaHQiLCJrZXlDb2RlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBLEtBQUlBLFNBQVNDLFNBQVNDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBYjtBQUNBLEtBQUlDLE1BQU1ILE9BQU9JLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBVjtBQUNBLEtBQUlDLFNBQVMsbUJBQUFDLENBQVEsQ0FBUixDQUFiO0FBQ0EsS0FBSUMsYUFBYSxtQkFBQUQsQ0FBUSxDQUFSLENBQWpCO0FBQ0EsS0FBSUUsa0JBQWtCLElBQUlELFVBQUosRUFBdEI7QUFDQSxLQUFJRSxXQUFXLEVBQWY7QUFDQSxLQUFJQyxPQUFPLE1BQVg7O0FBRUFDLFFBQU9DLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DLFVBQVNDLENBQVQsRUFBWTtBQUM3Q0osY0FBV0QsZ0JBQWdCTSxPQUFoQixDQUF3QkQsQ0FBeEIsQ0FBWDtBQUNELEVBRkQ7O0FBSUFGLFFBQU9DLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQVNDLENBQVQsRUFBWTtBQUMzQ0osY0FBV0QsZ0JBQWdCTyxLQUFoQixDQUFzQkYsQ0FBdEIsQ0FBWDtBQUNELEVBRkQ7O0FBSUEsS0FBSUcsY0FBYyxJQUFJWCxNQUFKLENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixFQUFyQixDQUFsQjs7QUFFQSxVQUFTWSxRQUFULEdBQW9CO0FBQ2xCZCxPQUFJZSxTQUFKLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQmxCLE9BQU9tQixLQUEzQixFQUFrQ25CLE9BQU9vQixNQUF6QztBQUNBSixlQUFZSyxJQUFaLENBQWlCbEIsR0FBakI7QUFDQWEsZUFBWU0sT0FBWixDQUFvQmIsUUFBcEI7QUFDQWMseUJBQXNCTixRQUF0QjtBQUNEOztBQUVEQSxZOzs7Ozs7Ozs7Ozs7S0N6Qk1aLE07QUFDSixtQkFBWW1CLENBQVosRUFBZUwsS0FBZixFQUFzQkMsTUFBdEIsRUFBOEI7QUFBQTs7QUFDNUIsVUFBS0ssQ0FBTCxHQUFTLEdBQVQ7QUFDQSxVQUFLRCxDQUFMLEdBQVNBLENBQVQ7QUFDQSxVQUFLTCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxVQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDRDs7OzswQkFDSU0sTyxFQUFTO0FBQ1pBLGVBQVFDLFFBQVIsQ0FBaUIsS0FBS0gsQ0FBdEIsRUFBeUIsS0FBS0MsQ0FBOUIsRUFBaUMsS0FBS04sS0FBdEMsRUFBNkMsS0FBS0MsTUFBbEQ7QUFDRDs7OzZCQUNPWCxRLEVBQVU7QUFDaEIsV0FBSUEsU0FBUyxFQUFULEtBQWdCLEtBQUtlLENBQUwsR0FBUyxDQUE3QixFQUFnQztBQUM5QixjQUFLQSxDQUFMLElBQVUsQ0FBVjtBQUNELFFBRkQsTUFFTyxJQUFJZixTQUFTLEVBQVQsS0FBZ0IsS0FBS2UsQ0FBTCxHQUFTLEdBQTdCLEVBQWtDO0FBQ3ZDLGNBQUtBLENBQUwsSUFBVSxDQUFWO0FBQ0Q7QUFDRjs7Ozs7O0FBR0hJLFFBQU9DLE9BQVAsR0FBaUJ4QixNQUFqQixDOzs7Ozs7Ozs7Ozs7S0NuQk1FLFU7QUFDSix5QkFBYztBQUFBOztBQUNaLFVBQUt1QixJQUFMLEdBQVk7QUFDVkMsYUFBTSxFQURJO0FBRVZDLGNBQU87QUFGRyxNQUFaO0FBSUQ7Ozs7NkJBQ09uQixDLEVBQUc7QUFDVCxXQUFJSixXQUFXLEVBQWY7QUFDQUEsZ0JBQVNJLEVBQUVvQixPQUFYLElBQXNCLElBQXRCO0FBQ0EsY0FBT3hCLFFBQVA7QUFDRDs7OzJCQUVLSSxDLEVBQUc7QUFDUCxXQUFJSixXQUFXLEVBQWY7QUFDQUEsZ0JBQVNJLEVBQUVvQixPQUFYLElBQXNCLEtBQXRCO0FBQ0EsY0FBT3hCLFFBQVA7QUFDRDs7Ozs7O0FBR0htQixRQUFPQyxPQUFQLEdBQWlCdEIsVUFBakIsQyIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ5MGY3YmYwZWE1ZDMzNGQzYTQ0IiwidmFyIGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLXNjcmVlbicpO1xudmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xudmFyIFBhZGRsZSA9IHJlcXVpcmUoJy4vUGFkZGxlJyk7XG52YXIgS2V5Ym9hcmRlciA9IHJlcXVpcmUoJy4va2V5Ym9hcmRlcicpO1xudmFyIGtleWJvYXJkTW9uaXRvciA9IG5ldyBLZXlib2FyZGVyKCk7XG52YXIga2V5U3RhdGUgPSB7fTtcbnZhciB0ZXN0ID0gJ3Rlc3QnO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAga2V5U3RhdGUgPSBrZXlib2FyZE1vbml0b3Iua2V5RG93bihlKTtcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gIGtleVN0YXRlID0ga2V5Ym9hcmRNb25pdG9yLmtleVVwKGUpO1xufSk7XG5cbnZhciBzdGFydFBhZGRsZSA9IG5ldyBQYWRkbGUoMzUwLCAxMDAsIDE1KTtcblxuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG4gIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgc3RhcnRQYWRkbGUuZHJhdyhjdHgpO1xuICBzdGFydFBhZGRsZS5hbmltYXRlKGtleVN0YXRlKTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbn07XG5cbmdhbWVMb29wKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvaW5kZXguanMiLCJjbGFzcyBQYWRkbGUge1xuICBjb25zdHJ1Y3Rvcih4LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy55ID0gNDc1O1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG4gIGRyYXcoY29udGV4dCkge1xuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuICBhbmltYXRlKGtleVN0YXRlKSB7XG4gICAgaWYgKGtleVN0YXRlWzM3XSAmJiB0aGlzLnggPiAwKSB7XG4gICAgICB0aGlzLnggLT0gNDtcbiAgICB9IGVsc2UgaWYgKGtleVN0YXRlWzM5XSAmJiB0aGlzLnggPCA3MDApIHtcbiAgICAgIHRoaXMueCArPSA0O1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZGRsZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvUGFkZGxlLmpzIiwiY2xhc3MgS2V5Ym9hcmRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMua2V5cyA9IHtcbiAgICAgIGxlZnQ6IDM3LFxuICAgICAgcmlnaHQ6IDM5LFxuICAgIH1cbiAgfVxuICBrZXlEb3duKGUpIHtcbiAgICB2YXIga2V5U3RhdGUgPSB7fTtcbiAgICBrZXlTdGF0ZVtlLmtleUNvZGVdID0gdHJ1ZTtcbiAgICByZXR1cm4ga2V5U3RhdGU7XG4gIH07XG5cbiAga2V5VXAoZSkge1xuICAgIHZhciBrZXlTdGF0ZSA9IHt9O1xuICAgIGtleVN0YXRlW2Uua2V5Q29kZV0gPSBmYWxzZTtcbiAgICByZXR1cm4ga2V5U3RhdGU7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9rZXlib2FyZGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==