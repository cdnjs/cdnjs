(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("darkmode-js", [], factory);
	else if(typeof exports === 'object')
		exports["darkmode-js"] = factory();
	else
		root["darkmode-js"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/darkmode.js":
/*!*************************!*\
  !*** ./src/darkmode.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Darkmode =
/*#__PURE__*/
function () {
  function Darkmode(options) {
    _classCallCheck(this, Darkmode);

    var bottom = options && options.bottom ? options.bottom : '32px';
    var right = options && options.right ? options.right : '32px';
    var left = options && options.left ? options.left : 'unset';
    var time = options && options.time ? options.time : '0.3s';
    var mixColor = options && options.mixColor ? options.mixColor : '#fff';
    var buttonColorDark = options && options.buttonColorDark ? options.buttonColorDark : '#100f2c';
    var buttonColorLight = options && options.buttonColorLight ? options.buttonColorLight : '#fff';
    var label = options && options.label ? options.label : '';
    /* eslint-disable */

    var saveInCookies = options && options.saveInCookies === false ? false : true;
    /* eslint-enable */

    var css = "\n      .darkmode-layer {\n        position: fixed;\n        pointer-events: none;\n        background: ".concat(mixColor, ";\n        transition: all ").concat(time, " ease;\n        mix-blend-mode: difference;\n      }\n\n      .darkmode-layer--button {\n        width: 2.9rem;\n        height: 2.9rem;\n        border-radius: 50%;\n        right: ").concat(right, ";\n        bottom: ").concat(bottom, ";\n        left: ").concat(left, ";\n      }\n\n      .darkmode-layer--simple {\n        width: 100vw;\n        height: 100vh;\n        top: 0;\n        left: 0;\n        transform: scale(1) !important;\n      }\n      \n      .darkmode-layer--expanded {\n        transform: scale(100);\n        border-radius: 0;\n      }\n\n      .darkmode-layer--no-transition {\n        transition: none;\n      }\n      \n      .darkmode-toggle {\n        background: ").concat(buttonColorDark, ";\n        width: 3rem;\n        height: 3rem;\n        position: fixed;\n        border-radius: 50%;\n        right: ").concat(right, ";\n        bottom: ").concat(bottom, ";\n        left: ").concat(left, ";\n        cursor: pointer;\n        transition: all 0.5s ease;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n      }\n      \n      .darkmode-toggle--white {\n        background: ").concat(buttonColorLight, ";\n      }\n\n      .darkmode-background {\n        background: ").concat(mixColor, ";\n        position: fixed;\n        pointer-events: none;\n        z-index: -10;\n        width: 100vw;\n        height: 100vh;\n        top: 0;\n        left: 0;\n      }\n      \n      img, .darkmode-ignore {\n        isolation: isolate;\n        display: inline-block;\n      }\n    ");
    var layer = document.createElement('div');
    var button = document.createElement('div');
    var background = document.createElement('div');
    button.innerHTML = label;
    layer.classList.add('darkmode-layer');
    background.classList.add('darkmode-background');
    var darkmodeActivated = window.localStorage.getItem('darkmode') === 'true';

    if (darkmodeActivated === true && saveInCookies) {
      layer.classList.add('darkmode-layer--expanded', 'darkmode-layer--simple', 'darkmode-layer--no-transition');
      button.classList.add('darkmode-toggle--white');
      document.body.classList.add('darkmode--activated');
    }

    document.body.insertBefore(button, document.body.firstChild);
    document.body.insertBefore(layer, document.body.firstChild);
    document.body.insertBefore(background, document.body.firstChild);
    this.addStyle(css);
    this.button = button;
    this.layer = layer;
    this.saveInCookies = saveInCookies;
    this.time = time;
  }

  _createClass(Darkmode, [{
    key: "addStyle",
    value: function addStyle(css) {
      var linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'stylesheet');
      linkElement.setAttribute('type', 'text/css');
      linkElement.setAttribute('href', 'data:text/css;charset=UTF-8,' + encodeURIComponent(css));
      document.head.appendChild(linkElement);
    }
  }, {
    key: "showWidget",
    value: function showWidget() {
      var button = this.button;
      var layer = this.layer;
      var time = parseFloat(this.time) * 1000;
      button.classList.add('darkmode-toggle');
      layer.classList.add('darkmode-layer--button');
      button.addEventListener('click', function () {
        var isDarkmode = document.body.classList.contains('darkmode--activated');

        if (!isDarkmode) {
          layer.classList.add('darkmode-layer--expanded');
          setTimeout(function () {
            layer.classList.add('darkmode-layer--no-transition');
            layer.classList.add('darkmode-layer--simple');
          }, time);
        } else {
          layer.classList.remove('darkmode-layer--simple');
          setTimeout(function () {
            layer.classList.remove('darkmode-layer--no-transition');
            layer.classList.remove('darkmode-layer--expanded');
          }, 1);
        }

        button.classList.toggle('darkmode-toggle--white');
        document.body.classList.toggle('darkmode--activated');
        window.localStorage.setItem('darkmode', !isDarkmode);
      });
    }
  }, {
    key: "toggle",
    value: function toggle() {
      var layer = this.layer;
      var isDarkmode = document.body.classList.contains('darkmode--activated');
      layer.classList.toggle('darkmode-layer--simple');
      document.body.classList.toggle('darkmode--activated');
      window.localStorage.setItem('darkmode', !isDarkmode);
    }
  }]);

  return Darkmode;
}();

exports.default = Darkmode;
module.exports = exports["default"];

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _darkmode = _interopRequireDefault(__webpack_require__(/*! ./darkmode */ "./src/darkmode.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _darkmode.default;
/* eslint-disable */

exports.default = _default;

(function (window) {
  window.Darkmode = _darkmode.default;
})(window);
/* eslint-enable */


module.exports = exports["default"];

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYXJrbW9kZS1qcy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vZGFya21vZGUtanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZGFya21vZGUtanMvLi9zcmMvZGFya21vZGUuanMiLCJ3ZWJwYWNrOi8vZGFya21vZGUtanMvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRGFya21vZGUiLCJvcHRpb25zIiwiYm90dG9tIiwicmlnaHQiLCJsZWZ0IiwidGltZSIsIm1peENvbG9yIiwiYnV0dG9uQ29sb3JEYXJrIiwiYnV0dG9uQ29sb3JMaWdodCIsImxhYmVsIiwic2F2ZUluQ29va2llcyIsImNzcyIsImxheWVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYnV0dG9uIiwiYmFja2dyb3VuZCIsImlubmVySFRNTCIsImNsYXNzTGlzdCIsImFkZCIsImRhcmttb2RlQWN0aXZhdGVkIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImJvZHkiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwiYWRkU3R5bGUiLCJsaW5rRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImVuY29kZVVSSUNvbXBvbmVudCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsInBhcnNlRmxvYXQiLCJhZGRFdmVudExpc3RlbmVyIiwiaXNEYXJrbW9kZSIsImNvbnRhaW5zIiwic2V0VGltZW91dCIsInJlbW92ZSIsInRvZ2dsZSIsInNldEl0ZW0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FB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QUFDQyxZQUFQLENBQW9Ca0IsT0FBcEIsQ0FBNEIsVUFBNUIsRUFBd0MsQ0FBQ0wsVUFBekM7QUFDRCxPQXBCRDtBQXFCRDs7OzZCQUVRO0FBQ1AsVUFBTXZCLEtBQUssR0FBRyxLQUFLQSxLQUFuQjtBQUNBLFVBQU11QixVQUFVLEdBQUd0QixRQUFRLENBQUNXLElBQVQsQ0FBY04sU0FBZCxDQUF3QmtCLFFBQXhCLENBQWlDLHFCQUFqQyxDQUFuQjtBQUVBeEIsV0FBSyxDQUFDTSxTQUFOLENBQWdCcUIsTUFBaEIsQ0FBdUIsd0JBQXZCO0FBQ0ExQixjQUFRLENBQUNXLElBQVQsQ0FBY04sU0FBZCxDQUF3QnFCLE1BQXhCLENBQStCLHFCQUEvQjtBQUNBbEIsWUFBTSxDQUFDQyxZQUFQLENBQW9Ca0IsT0FBcEIsQ0FBNEIsVUFBNUIsRUFBd0MsQ0FBQ0wsVUFBekM7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqS0g7Ozs7O0FBR0E7Ozs7QUFDQSxDQUFDLFVBQVNkLE1BQVQsRUFBZ0I7QUFDZkEsUUFBTSxDQUFDckIsUUFBUDtBQUNELENBRkQsRUFFR3FCLE1BRkg7QUFHQSIsImZpbGUiOiJkYXJrbW9kZS1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiZGFya21vZGUtanNcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZGFya21vZGUtanNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZGFya21vZGUtanNcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEYXJrbW9kZSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBjb25zdCBib3R0b20gPSBvcHRpb25zICYmIG9wdGlvbnMuYm90dG9tID8gb3B0aW9ucy5ib3R0b20gOiAnMzJweCc7XG4gICAgY29uc3QgcmlnaHQgPSBvcHRpb25zICYmIG9wdGlvbnMucmlnaHQgPyBvcHRpb25zLnJpZ2h0IDogJzMycHgnO1xuICAgIGNvbnN0IGxlZnQgPSBvcHRpb25zICYmIG9wdGlvbnMubGVmdCA/IG9wdGlvbnMubGVmdCA6ICd1bnNldCc7XG4gICAgY29uc3QgdGltZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy50aW1lID8gb3B0aW9ucy50aW1lIDogJzAuM3MnO1xuICAgIGNvbnN0IG1peENvbG9yID0gb3B0aW9ucyAmJiBvcHRpb25zLm1peENvbG9yID8gb3B0aW9ucy5taXhDb2xvciA6ICcjZmZmJztcbiAgICBjb25zdCBidXR0b25Db2xvckRhcmsgPSBvcHRpb25zICYmIG9wdGlvbnMuYnV0dG9uQ29sb3JEYXJrID8gb3B0aW9ucy5idXR0b25Db2xvckRhcmsgOiAnIzEwMGYyYyc7XG4gICAgY29uc3QgYnV0dG9uQ29sb3JMaWdodCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5idXR0b25Db2xvckxpZ2h0ID8gb3B0aW9ucy5idXR0b25Db2xvckxpZ2h0IDogJyNmZmYnO1xuICAgIGNvbnN0IGxhYmVsID0gb3B0aW9ucyAmJiBvcHRpb25zLmxhYmVsID8gb3B0aW9ucy5sYWJlbCA6ICcnXG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICBjb25zdCBzYXZlSW5Db29raWVzID0gb3B0aW9ucyAmJiBvcHRpb25zLnNhdmVJbkNvb2tpZXMgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlO1xuICAgIC8qIGVzbGludC1lbmFibGUgKi9cblxuICAgIGNvbnN0IGNzcyA9IGBcbiAgICAgIC5kYXJrbW9kZS1sYXllciB7XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIGJhY2tncm91bmQ6ICR7bWl4Q29sb3J9O1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgJHt0aW1lfSBlYXNlO1xuICAgICAgICBtaXgtYmxlbmQtbW9kZTogZGlmZmVyZW5jZTtcbiAgICAgIH1cblxuICAgICAgLmRhcmttb2RlLWxheWVyLS1idXR0b24ge1xuICAgICAgICB3aWR0aDogMi45cmVtO1xuICAgICAgICBoZWlnaHQ6IDIuOXJlbTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICByaWdodDogJHtyaWdodH07XG4gICAgICAgIGJvdHRvbTogJHtib3R0b219O1xuICAgICAgICBsZWZ0OiAke2xlZnR9O1xuICAgICAgfVxuXG4gICAgICAuZGFya21vZGUtbGF5ZXItLXNpbXBsZSB7XG4gICAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpICFpbXBvcnRhbnQ7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5kYXJrbW9kZS1sYXllci0tZXhwYW5kZWQge1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEwMCk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICB9XG5cbiAgICAgIC5kYXJrbW9kZS1sYXllci0tbm8tdHJhbnNpdGlvbiB7XG4gICAgICAgIHRyYW5zaXRpb246IG5vbmU7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5kYXJrbW9kZS10b2dnbGUge1xuICAgICAgICBiYWNrZ3JvdW5kOiAke2J1dHRvbkNvbG9yRGFya307XG4gICAgICAgIHdpZHRoOiAzcmVtO1xuICAgICAgICBoZWlnaHQ6IDNyZW07XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICByaWdodDogJHtyaWdodH07XG4gICAgICAgIGJvdHRvbTogJHtib3R0b219O1xuICAgICAgICBsZWZ0OiAke2xlZnR9O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2U7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgfVxuICAgICAgXG4gICAgICAuZGFya21vZGUtdG9nZ2xlLS13aGl0ZSB7XG4gICAgICAgIGJhY2tncm91bmQ6ICR7YnV0dG9uQ29sb3JMaWdodH07XG4gICAgICB9XG5cbiAgICAgIC5kYXJrbW9kZS1iYWNrZ3JvdW5kIHtcbiAgICAgICAgYmFja2dyb3VuZDogJHttaXhDb2xvcn07XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHotaW5kZXg6IC0xMDtcbiAgICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgICBoZWlnaHQ6IDEwMHZoO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGltZywgLmRhcmttb2RlLWlnbm9yZSB7XG4gICAgICAgIGlzb2xhdGlvbjogaXNvbGF0ZTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgfVxuICAgIGA7XG5cbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJhY2tncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBsYWJlbDtcbiAgICBsYXllci5jbGFzc0xpc3QuYWRkKCdkYXJrbW9kZS1sYXllcicpO1xuICAgIGJhY2tncm91bmQuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtYmFja2dyb3VuZCcpO1xuXG4gICAgY29uc3QgZGFya21vZGVBY3RpdmF0ZWQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Rhcmttb2RlJykgPT09ICd0cnVlJztcblxuICAgIGlmIChkYXJrbW9kZUFjdGl2YXRlZCA9PT0gdHJ1ZSAmJiBzYXZlSW5Db29raWVzKSB7XG4gICAgICBsYXllci5jbGFzc0xpc3QuYWRkKCdkYXJrbW9kZS1sYXllci0tZXhwYW5kZWQnLCAnZGFya21vZGUtbGF5ZXItLXNpbXBsZScsICdkYXJrbW9kZS1sYXllci0tbm8tdHJhbnNpdGlvbicpO1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2Rhcmttb2RlLXRvZ2dsZS0td2hpdGUnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtLWFjdGl2YXRlZCcpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGJ1dHRvbiwgZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKTtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShsYXllciwgZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKTtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShiYWNrZ3JvdW5kLCBkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpO1xuXG4gICAgdGhpcy5hZGRTdHlsZShjc3MpO1xuXG4gICAgdGhpcy5idXR0b24gPSBidXR0b247XG4gICAgdGhpcy5sYXllciA9IGxheWVyO1xuICAgIHRoaXMuc2F2ZUluQ29va2llcyA9IHNhdmVJbkNvb2tpZXM7XG4gICAgdGhpcy50aW1lID0gdGltZTtcbiAgfVxuXG4gIGFkZFN0eWxlKGNzcykge1xuICAgIGNvbnN0IGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgbGlua0VsZW1lbnQuc2V0QXR0cmlidXRlKCdyZWwnLCAnc3R5bGVzaGVldCcpO1xuICAgIGxpbmtFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuICAgIGxpbmtFbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsICdkYXRhOnRleHQvY3NzO2NoYXJzZXQ9VVRGLTgsJyArIGVuY29kZVVSSUNvbXBvbmVudChjc3MpKTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmtFbGVtZW50KTtcbiAgfVxuXG4gIHNob3dXaWRnZXQoKSB7XG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5idXR0b247XG4gICAgY29uc3QgbGF5ZXIgPSB0aGlzLmxheWVyO1xuICAgIGNvbnN0IHRpbWUgPSBwYXJzZUZsb2F0KHRoaXMudGltZSkgKiAxMDAwO1xuXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2Rhcmttb2RlLXRvZ2dsZScpO1xuICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoJ2Rhcmttb2RlLWxheWVyLS1idXR0b24nKTtcblxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IGlzRGFya21vZGUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygnZGFya21vZGUtLWFjdGl2YXRlZCcpO1xuXG4gICAgICBpZiAoIWlzRGFya21vZGUpIHtcbiAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtbGF5ZXItLWV4cGFuZGVkJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoJ2Rhcmttb2RlLWxheWVyLS1uby10cmFuc2l0aW9uJyk7XG4gICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtbGF5ZXItLXNpbXBsZScpO1xuICAgICAgICB9LCB0aW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Rhcmttb2RlLWxheWVyLS1zaW1wbGUnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZSgnZGFya21vZGUtbGF5ZXItLW5vLXRyYW5zaXRpb24nKTtcbiAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrbW9kZS1sYXllci0tZXhwYW5kZWQnKTtcbiAgICAgICAgfSwgMSk7XG4gICAgICB9XG5cbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrbW9kZS10b2dnbGUtLXdoaXRlJyk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2Rhcmttb2RlLS1hY3RpdmF0ZWQnKTtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya21vZGUnLCAhaXNEYXJrbW9kZSk7XG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgY29uc3QgbGF5ZXIgPSB0aGlzLmxheWVyO1xuICAgIGNvbnN0IGlzRGFya21vZGUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygnZGFya21vZGUtLWFjdGl2YXRlZCcpO1xuXG4gICAgbGF5ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnZGFya21vZGUtbGF5ZXItLXNpbXBsZScpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFya21vZGUtLWFjdGl2YXRlZCcpO1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya21vZGUnLCAhaXNEYXJrbW9kZSk7XG4gIH1cbn1cbiIsImltcG9ydCBEYXJrbW9kZSBmcm9tICcuL2Rhcmttb2RlJztcbmV4cG9ydCBkZWZhdWx0IERhcmttb2RlO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuKGZ1bmN0aW9uKHdpbmRvdyl7XG4gIHdpbmRvdy5EYXJrbW9kZSA9IERhcmttb2RlO1xufSkod2luZG93KVxuLyogZXNsaW50LWVuYWJsZSAqL1xuIl0sInNvdXJjZVJvb3QiOiIifQ==