/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");

var TABLE = document.querySelector('table');
var tableCell = document.querySelectorAll('table td p');
var moveCounter = document.querySelector('.move-count span');
var winnerSection = document.querySelector('.winner-section');
var sessionRecordTime = document.querySelector('.best-time span');
var sessionRecordCount = document.querySelector('.best-count span');
var counter = 0;

var startGame = function startGame() {
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["startTimer"])();
  var values = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["shuffleArray"])();
  winnerSection.style.display = 'none';
  counter = 0;
  moveCounter.textContent = counter;

  for (var i = 0, cellLength = tableCell.length; i < cellLength; i += 1) {
    var value = values[i];
    tableCell[i].className = '';
    tableCell[i].textContent = value;

    if (value === '') {
      tableCell[i].className = 'empty';
    }
  }
};

var showWinBlock = function showWinBlock() {
  var _getTime = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getTime"])(),
      minutes = _getTime.minutes,
      seconds = _getTime.seconds;

  winnerSection.style.display = 'block';

  if (minutes * 60 + seconds < sessionStorage['minutes'] * 60 + sessionStorage['seconds'] || !sessionStorage['minutes']) {
    sessionStorage['minutes'] = minutes;
    sessionStorage['seconds'] = seconds;
    sessionRecordTime.textContent = "".concat(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["checkTimeLength"])(sessionStorage['minutes']), " : ").concat(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["checkTimeLength"])(sessionStorage['seconds']));
  }

  if (+sessionStorage['bestCount'] > counter || !sessionStorage['bestCount']) {
    sessionStorage['bestCount'] = counter;
    sessionRecordCount.textContent = counter;
  }
};

var checkWin = function checkWin() {
  for (var i = 1, cellLength = tableCell.length; i < cellLength; i += 1) {
    if (+tableCell[i - 1].textContent !== i) {
      return false;
    }
  }

  showWinBlock();
};

TABLE.addEventListener('click', function (e) {
  if (e.target.nodeName !== 'P') {
    return false;
  }

  var selfRowIndex = +e.target.closest('tr').rowIndex;
  var selfCellIndex = +e.target.closest('td').cellIndex;
  var selfTable = e.currentTarget;
  var selfCell = e.target;
  var top = null;
  var bottom = null;
  var left = null;
  var right = null;

  if (selfRowIndex - 1 >= 0) {
    top = selfTable.rows[selfRowIndex - 1].cells[selfCellIndex].querySelector('p');
  }

  if (selfRowIndex + 1 <= 3) {
    bottom = selfTable.rows[selfRowIndex + 1].cells[selfCellIndex].querySelector('p');
  }

  if (selfCellIndex - 1 >= 0) {
    left = selfTable.rows[selfRowIndex].cells[selfCellIndex - 1].querySelector('p');
  }

  if (selfCellIndex + 1 <= 3) {
    right = selfTable.rows[selfRowIndex].cells[selfCellIndex + 1].querySelector('p');
  }

  if (top && top.classList.contains('empty')) {
    selfCell.classList.add('empty');
    top.classList.remove('empty');
    top.textContent = selfCell.textContent;
    selfCell.textContent = '';
  } else if (bottom && bottom.classList.contains('empty')) {
    selfCell.classList.add('empty');
    bottom.classList.remove('empty');
    bottom.textContent = selfCell.textContent;
    selfCell.textContent = '';
  } else if (left && left.classList.contains('empty')) {
    selfCell.classList.add('empty');
    left.classList.remove('empty');
    left.textContent = selfCell.textContent;
    selfCell.textContent = '';
  } else if (right && right.classList.contains('empty')) {
    selfCell.classList.add('empty');
    right.classList.remove('empty');
    right.textContent = selfCell.textContent;
    selfCell.textContent = '';
  }

  counter += 1;
  moveCounter.textContent = counter;
  checkWin();
});
/* harmony default export */ __webpack_exports__["default"] = (startGame);

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }



var startButtons = _toConsumableArray(document.querySelectorAll('.new-game'));

startButtons.forEach(function (elem) {
  return elem.addEventListener('click', _game__WEBPACK_IMPORTED_MODULE_0__["default"]);
});
Object(_game__WEBPACK_IMPORTED_MODULE_0__["default"])();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: shuffleArray, startTimer, getTime, checkTimeLength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffleArray", function() { return shuffleArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startTimer", function() { return startTimer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTime", function() { return getTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkTimeLength", function() { return checkTimeLength; });
var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];
var timerElem = document.querySelector('.game-time span');
var actualTime = '';
var minutes = 0;
var seconds = 0;
var interval;

var checkTimeLength = function checkTimeLength(num) {
  return +num <= 9 ? "0".concat(num) : num;
};

var resetTimer = function resetTimer() {
  minutes = 0;
  seconds = 0;
  timerElem.textContent = '00 : 00';
};

timerElem.addEventListener('click', resetTimer);

var startTimer = function startTimer() {
  clearInterval(interval);
  resetTimer();
  interval = setInterval(function () {
    seconds += 1;

    if (seconds === 60) {
      minutes += 1;
      seconds = 0;
    }

    if (minutes === 60) {
      clearInterval(interval);
    }

    var strMin = checkTimeLength(minutes);
    var strSec = checkTimeLength(seconds);
    actualTime = "".concat(strMin, " : ").concat(strSec);
    timerElem.textContent = actualTime;
  }, 1000);
};

var getTime = function getTime() {
  return {
    minutes: minutes,
    seconds: seconds
  };
};

var shuffleArray = function shuffleArray() {
  for (var i = values.length - 1; i > 0; i -= 1) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [values[j], values[i]];
    values[i] = _ref[0];
    values[j] = _ref[1];
  }

  return values;
};



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbIlRBQkxFIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGFibGVDZWxsIiwicXVlcnlTZWxlY3RvckFsbCIsIm1vdmVDb3VudGVyIiwid2lubmVyU2VjdGlvbiIsInNlc3Npb25SZWNvcmRUaW1lIiwic2Vzc2lvblJlY29yZENvdW50IiwiY291bnRlciIsInN0YXJ0R2FtZSIsInN0YXJ0VGltZXIiLCJ2YWx1ZXMiLCJzaHVmZmxlQXJyYXkiLCJzdHlsZSIsImRpc3BsYXkiLCJ0ZXh0Q29udGVudCIsImkiLCJjZWxsTGVuZ3RoIiwibGVuZ3RoIiwidmFsdWUiLCJjbGFzc05hbWUiLCJzaG93V2luQmxvY2siLCJnZXRUaW1lIiwibWludXRlcyIsInNlY29uZHMiLCJzZXNzaW9uU3RvcmFnZSIsImNoZWNrVGltZUxlbmd0aCIsImNoZWNrV2luIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJub2RlTmFtZSIsInNlbGZSb3dJbmRleCIsImNsb3Nlc3QiLCJyb3dJbmRleCIsInNlbGZDZWxsSW5kZXgiLCJjZWxsSW5kZXgiLCJzZWxmVGFibGUiLCJjdXJyZW50VGFyZ2V0Iiwic2VsZkNlbGwiLCJ0b3AiLCJib3R0b20iLCJsZWZ0IiwicmlnaHQiLCJyb3dzIiwiY2VsbHMiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImFkZCIsInJlbW92ZSIsInN0YXJ0QnV0dG9ucyIsImZvckVhY2giLCJlbGVtIiwidGltZXJFbGVtIiwiYWN0dWFsVGltZSIsImludGVydmFsIiwibnVtIiwicmVzZXRUaW1lciIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInN0ck1pbiIsInN0clNlYyIsImoiLCJNYXRoIiwiZmxvb3IiLCJyYW5k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QUFDLEdBQUdMLE1BQU0sQ0FBQ08sTUFBUCxHQUFnQixDQUE3QixFQUFnQ0YsQ0FBQyxHQUFHLENBQXBDLEVBQXVDQSxDQUFDLElBQUksQ0FBNUMsRUFBK0M7QUFDN0MsUUFBTThDLENBQUMsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxNQUFpQmpELENBQUMsR0FBRyxDQUFyQixDQUFYLENBQVY7QUFENkMsZUFFcEIsQ0FBQ0wsTUFBTSxDQUFDbUQsQ0FBRCxDQUFQLEVBQVluRCxNQUFNLENBQUNLLENBQUQsQ0FBbEIsQ0FGb0I7QUFFNUNMLFVBQU0sQ0FBQ0ssQ0FBRCxDQUZzQztBQUVqQ0wsVUFBTSxDQUFDbUQsQ0FBRCxDQUYyQjtBQUc5Qzs7QUFDRCxTQUFPbkQsTUFBUDtBQUNELENBTkQiLCJmaWxlIjoianMvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsImltcG9ydCB7IHNodWZmbGVBcnJheSwgc3RhcnRUaW1lciwgZ2V0VGltZSwgY2hlY2tUaW1lTGVuZ3RoIH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IFRBQkxFID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGFibGUnKTtcbmNvbnN0IHRhYmxlQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RhYmxlIHRkIHAnKTtcbmNvbnN0IG1vdmVDb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmUtY291bnQgc3BhbicpO1xuY29uc3Qgd2lubmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5uZXItc2VjdGlvbicpO1xuY29uc3Qgc2Vzc2lvblJlY29yZFRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmVzdC10aW1lIHNwYW4nKTtcbmNvbnN0IHNlc3Npb25SZWNvcmRDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iZXN0LWNvdW50IHNwYW4nKTtcbmxldCBjb3VudGVyID0gMDtcblxuY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xuICBzdGFydFRpbWVyKCk7XG4gIGNvbnN0IHZhbHVlcyA9IHNodWZmbGVBcnJheSgpO1xuICB3aW5uZXJTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGNvdW50ZXIgPSAwO1xuICBtb3ZlQ291bnRlci50ZXh0Q29udGVudCA9IGNvdW50ZXI7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGNlbGxMZW5ndGggPSB0YWJsZUNlbGwubGVuZ3RoOyBpIDwgY2VsbExlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZXNbaV07XG4gICAgdGFibGVDZWxsW2ldLmNsYXNzTmFtZSA9ICcnO1xuICAgIHRhYmxlQ2VsbFtpXS50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PT0gJycpIHtcbiAgICAgIHRhYmxlQ2VsbFtpXS5jbGFzc05hbWUgPSAnZW1wdHknO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3Qgc2hvd1dpbkJsb2NrID0gKCkgPT4ge1xuICBjb25zdCB7IG1pbnV0ZXMsIHNlY29uZHMgfSA9IGdldFRpbWUoKTtcbiAgd2lubmVyU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgaWYgKChtaW51dGVzICogNjAgKyBzZWNvbmRzIDwgc2Vzc2lvblN0b3JhZ2VbJ21pbnV0ZXMnXSAqIDYwICsgc2Vzc2lvblN0b3JhZ2VbJ3NlY29uZHMnXSkgfHwgIXNlc3Npb25TdG9yYWdlWydtaW51dGVzJ10pIHtcbiAgICBzZXNzaW9uU3RvcmFnZVsnbWludXRlcyddID0gbWludXRlcztcbiAgICBzZXNzaW9uU3RvcmFnZVsnc2Vjb25kcyddID0gc2Vjb25kcztcbiAgICBzZXNzaW9uUmVjb3JkVGltZS50ZXh0Q29udGVudCA9IGAke2NoZWNrVGltZUxlbmd0aChzZXNzaW9uU3RvcmFnZVsnbWludXRlcyddKX0gOiAke2NoZWNrVGltZUxlbmd0aChzZXNzaW9uU3RvcmFnZVsnc2Vjb25kcyddKX1gO1xuICB9XG4gIGlmICgrc2Vzc2lvblN0b3JhZ2VbJ2Jlc3RDb3VudCddID4gY291bnRlciB8fCAhc2Vzc2lvblN0b3JhZ2VbJ2Jlc3RDb3VudCddKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2VbJ2Jlc3RDb3VudCddID0gY291bnRlcjtcbiAgICBzZXNzaW9uUmVjb3JkQ291bnQudGV4dENvbnRlbnQgPSBjb3VudGVyO1xuICB9XG59O1xuXG5jb25zdCBjaGVja1dpbiA9ICgpID0+IHtcbiAgZm9yIChsZXQgaSA9IDEsIGNlbGxMZW5ndGggPSB0YWJsZUNlbGwubGVuZ3RoOyBpIDwgY2VsbExlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKCt0YWJsZUNlbGxbaSAtIDFdLnRleHRDb250ZW50ICE9PSBpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgc2hvd1dpbkJsb2NrKCk7XG59O1xuXG5UQUJMRS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGlmIChlLnRhcmdldC5ub2RlTmFtZSAhPT0gJ1AnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHNlbGZSb3dJbmRleCA9ICtlLnRhcmdldC5jbG9zZXN0KCd0cicpLnJvd0luZGV4O1xuICBjb25zdCBzZWxmQ2VsbEluZGV4ID0gK2UudGFyZ2V0LmNsb3Nlc3QoJ3RkJykuY2VsbEluZGV4O1xuICBjb25zdCBzZWxmVGFibGUgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gIGNvbnN0IHNlbGZDZWxsID0gZS50YXJnZXQ7XG4gIGxldCB0b3AgPSBudWxsO1xuICBsZXQgYm90dG9tID0gbnVsbDtcbiAgbGV0IGxlZnQgPSBudWxsO1xuICBsZXQgcmlnaHQgPSBudWxsO1xuXG4gIGlmIChzZWxmUm93SW5kZXggLSAxID49IDApIHtcbiAgICB0b3AgPSBzZWxmVGFibGUucm93c1tzZWxmUm93SW5kZXggLSAxXS5jZWxsc1tzZWxmQ2VsbEluZGV4XS5xdWVyeVNlbGVjdG9yKCdwJyk7XG4gIH1cbiAgaWYgKHNlbGZSb3dJbmRleCArIDEgPD0gMykge1xuICAgIGJvdHRvbSA9IHNlbGZUYWJsZS5yb3dzW3NlbGZSb3dJbmRleCArIDFdLmNlbGxzW3NlbGZDZWxsSW5kZXhdLnF1ZXJ5U2VsZWN0b3IoJ3AnKTtcbiAgfVxuICBpZiAoc2VsZkNlbGxJbmRleCAtIDEgPj0gMCkge1xuICAgIGxlZnQgPSBzZWxmVGFibGUucm93c1tzZWxmUm93SW5kZXhdLmNlbGxzW3NlbGZDZWxsSW5kZXggLSAxXS5xdWVyeVNlbGVjdG9yKCdwJyk7XG4gIH1cbiAgaWYgKHNlbGZDZWxsSW5kZXggKyAxIDw9IDMpIHtcbiAgICByaWdodCA9IHNlbGZUYWJsZS5yb3dzW3NlbGZSb3dJbmRleF0uY2VsbHNbc2VsZkNlbGxJbmRleCArIDFdLnF1ZXJ5U2VsZWN0b3IoJ3AnKTtcbiAgfVxuXG4gIGlmICh0b3AgJiYgdG9wLmNsYXNzTGlzdC5jb250YWlucygnZW1wdHknKSkge1xuICAgIHNlbGZDZWxsLmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XG4gICAgdG9wLmNsYXNzTGlzdC5yZW1vdmUoJ2VtcHR5Jyk7XG4gICAgdG9wLnRleHRDb250ZW50ID0gc2VsZkNlbGwudGV4dENvbnRlbnQ7XG4gICAgc2VsZkNlbGwudGV4dENvbnRlbnQgPSAnJztcbiAgfVxuICBlbHNlIGlmIChib3R0b20gJiYgYm90dG9tLmNsYXNzTGlzdC5jb250YWlucygnZW1wdHknKSkge1xuICAgIHNlbGZDZWxsLmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XG4gICAgYm90dG9tLmNsYXNzTGlzdC5yZW1vdmUoJ2VtcHR5Jyk7XG4gICAgYm90dG9tLnRleHRDb250ZW50ID0gc2VsZkNlbGwudGV4dENvbnRlbnQ7XG4gICAgc2VsZkNlbGwudGV4dENvbnRlbnQgPSAnJztcbiAgfVxuICBlbHNlIGlmIChsZWZ0ICYmIGxlZnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlbXB0eScpKSB7XG4gICAgc2VsZkNlbGwuY2xhc3NMaXN0LmFkZCgnZW1wdHknKTtcbiAgICBsZWZ0LmNsYXNzTGlzdC5yZW1vdmUoJ2VtcHR5Jyk7XG4gICAgbGVmdC50ZXh0Q29udGVudCA9IHNlbGZDZWxsLnRleHRDb250ZW50O1xuICAgIHNlbGZDZWxsLnRleHRDb250ZW50ID0gJyc7XG4gIH1cbiAgZWxzZSBpZiAocmlnaHQgJiYgcmlnaHQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlbXB0eScpKSB7XG4gICAgc2VsZkNlbGwuY2xhc3NMaXN0LmFkZCgnZW1wdHknKTtcbiAgICByaWdodC5jbGFzc0xpc3QucmVtb3ZlKCdlbXB0eScpO1xuICAgIHJpZ2h0LnRleHRDb250ZW50ID0gc2VsZkNlbGwudGV4dENvbnRlbnQ7XG4gICAgc2VsZkNlbGwudGV4dENvbnRlbnQgPSAnJztcbiAgfVxuXG4gIGNvdW50ZXIgKz0gMTtcbiAgbW92ZUNvdW50ZXIudGV4dENvbnRlbnQgPSBjb3VudGVyO1xuICBjaGVja1dpbigpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHN0YXJ0R2FtZTtcbiIsImltcG9ydCBzdGFydEdhbWUgZnJvbSAnLi9nYW1lJztcblxuY29uc3Qgc3RhcnRCdXR0b25zID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uZXctZ2FtZScpXTtcblxuXG5zdGFydEJ1dHRvbnMuZm9yRWFjaChlbGVtID0+IGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWUpKTtcbnN0YXJ0R2FtZSgpO1xuIiwiY29uc3QgdmFsdWVzID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsICcnXTtcbmNvbnN0IHRpbWVyRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLXRpbWUgc3BhbicpO1xubGV0IGFjdHVhbFRpbWUgPSAnJztcbmxldCBtaW51dGVzID0gMDtcbmxldCBzZWNvbmRzID0gMDtcbmxldCBpbnRlcnZhbDtcblxuY29uc3QgY2hlY2tUaW1lTGVuZ3RoID0gbnVtID0+ICgrbnVtIDw9IDkgPyBgMCR7bnVtfWAgOiBudW0pO1xuXG5jb25zdCByZXNldFRpbWVyID0gKCkgPT4ge1xuICBtaW51dGVzID0gMDtcbiAgc2Vjb25kcyA9IDA7XG4gIHRpbWVyRWxlbS50ZXh0Q29udGVudCA9ICcwMCA6IDAwJztcbn07XG5cbnRpbWVyRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlc2V0VGltZXIpO1xuXG5jb25zdCBzdGFydFRpbWVyID0gKCkgPT4ge1xuICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgcmVzZXRUaW1lcigpO1xuICBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICBzZWNvbmRzICs9IDE7XG4gICAgaWYgKHNlY29uZHMgPT09IDYwKSB7XG4gICAgICBtaW51dGVzICs9IDE7XG4gICAgICBzZWNvbmRzID0gMDtcbiAgICB9XG4gICAgaWYgKG1pbnV0ZXMgPT09IDYwKSB7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9XG4gICAgY29uc3Qgc3RyTWluID0gY2hlY2tUaW1lTGVuZ3RoKG1pbnV0ZXMpO1xuICAgIGNvbnN0IHN0clNlYyA9IGNoZWNrVGltZUxlbmd0aChzZWNvbmRzKTtcblxuICAgIGFjdHVhbFRpbWUgPSBgJHtzdHJNaW59IDogJHtzdHJTZWN9YDtcbiAgICB0aW1lckVsZW0udGV4dENvbnRlbnQgPSBhY3R1YWxUaW1lO1xuICB9LCAxMDAwKTtcbn07XG5cbmNvbnN0IGdldFRpbWUgPSAoKSA9PiB7XG4gIHJldHVybiB7IG1pbnV0ZXMsIHNlY29uZHMgfTtcbn07XG5cbmNvbnN0IHNodWZmbGVBcnJheSA9ICgpID0+IHtcbiAgZm9yIChsZXQgaSA9IHZhbHVlcy5sZW5ndGggLSAxOyBpID4gMDsgaSAtPSAxKSB7XG4gICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgIFt2YWx1ZXNbaV0sIHZhbHVlc1tqXV0gPSBbdmFsdWVzW2pdLCB2YWx1ZXNbaV1dO1xuICB9XG4gIHJldHVybiB2YWx1ZXM7XG59O1xuXG5leHBvcnQgeyBzaHVmZmxlQXJyYXksIHN0YXJ0VGltZXIsIGdldFRpbWUsIGNoZWNrVGltZUxlbmd0aCB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==