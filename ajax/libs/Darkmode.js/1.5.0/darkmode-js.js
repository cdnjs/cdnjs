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
exports.default = exports.IS_BROWSER = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IS_BROWSER = typeof window !== 'undefined';
exports.IS_BROWSER = IS_BROWSER;

var Darkmode =
/*#__PURE__*/
function () {
  function Darkmode(options) {
    _classCallCheck(this, Darkmode);

    if (!IS_BROWSER) {
      return;
    }

    var bottom = options && options.bottom || '32px';
    var right = options && options.right || '32px';
    var left = options && options.left || 'unset';
    var time = options && options.time || '0.3s';
    var mixColor = options && options.mixColor || '#fff';
    var backgroundColor = options && options.backgroundColor || '#fff';
    var buttonColorDark = options && options.buttonColorDark || '#100f2c';
    var buttonColorLight = options && options.buttonColorLight || '#fff';
    var label = options && options.label || '';
    var saveInCookies = options && options.saveInCookies;
    /* eslint-disable */

    var autoMatchOsTheme = options && options.autoMatchOsTheme === false ? false : true;
    /* eslint-enable */

    var css = "\n      .darkmode-layer {\n        position: fixed;\n        pointer-events: none;\n        background: ".concat(mixColor, ";\n        transition: all ").concat(time, " ease;\n        mix-blend-mode: difference;\n      }\n\n      .darkmode-layer--button {\n        width: 2.9rem;\n        height: 2.9rem;\n        border-radius: 50%;\n        right: ").concat(right, ";\n        bottom: ").concat(bottom, ";\n        left: ").concat(left, ";\n      }\n\n      .darkmode-layer--simple {\n        width: 100%;\n        height: 100%;\n        top: 0;\n        left: 0;\n        transform: scale(1) !important;\n      }\n\n      .darkmode-layer--expanded {\n        transform: scale(100);\n        border-radius: 0;\n      }\n\n      .darkmode-layer--no-transition {\n        transition: none;\n      }\n\n      .darkmode-toggle {\n        background: ").concat(buttonColorDark, ";\n        width: 3rem;\n        height: 3rem;\n        position: fixed;\n        border-radius: 50%;\n        right: ").concat(right, ";\n        bottom: ").concat(bottom, ";\n        left: ").concat(left, ";\n        cursor: pointer;\n        transition: all 0.5s ease;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n      }\n\n      .darkmode-toggle--white {\n        background: ").concat(buttonColorLight, ";\n      }\n\n      .darkmode-background {\n        background: ").concat(backgroundColor, ";\n        position: fixed;\n        pointer-events: none;\n        z-index: -10;\n        width: 100%;\n        height: 100%;\n        top: 0;\n        left: 0;\n      }\n\n      img, .darkmode-ignore {\n        isolation: isolate;\n        display: inline-block;\n      }\n\n      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n        .darkmode-toggle {display: none !important}\n      }\n\n      @supports (-ms-ime-align:auto), (-ms-accelerator:true) {\n        .darkmode-toggle {display: none !important}\n      }\n    ");
    var layer = document.createElement('div');
    var button = document.createElement('div');
    var background = document.createElement('div');
    button.innerHTML = label;
    layer.classList.add('darkmode-layer');
    background.classList.add('darkmode-background');
    var darkmodeActivated = window.localStorage.getItem('darkmode') === 'true';
    var preferedThemeOs = autoMatchOsTheme && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var darkmodeNeverActivatedByAction = window.localStorage.getItem('darkmode') === null;

    if (darkmodeActivated === true && saveInCookies || darkmodeNeverActivatedByAction && preferedThemeOs) {
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
      var _this = this;

      if (!IS_BROWSER) {
        return;
      }

      var button = this.button;
      var layer = this.layer;
      var time = parseFloat(this.time) * 1000;
      button.classList.add('darkmode-toggle');
      layer.classList.add('darkmode-layer--button');
      button.addEventListener('click', function () {
        var isDarkmode = _this.isActivated();

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
      if (!IS_BROWSER) {
        return;
      }

      var layer = this.layer;
      var isDarkmode = this.isActivated();
      layer.classList.toggle('darkmode-layer--simple');
      document.body.classList.toggle('darkmode--activated');
      window.localStorage.setItem('darkmode', !isDarkmode);
    }
  }, {
    key: "isActivated",
    value: function isActivated() {
      if (!IS_BROWSER) {
        return null;
      }

      return document.body.classList.contains('darkmode--activated');
    }
  }]);

  return Darkmode;
}();

exports.default = Darkmode;

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

var _darkmode = _interopRequireWildcard(__webpack_require__(/*! ./darkmode */ "./src/darkmode.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _default = _darkmode.default;
/* eslint-disable */

exports.default = _default;

if (_darkmode.IS_BROWSER) {
  (function (window) {
    window.Darkmode = _darkmode.default;
  })(window);
}
/* eslint-enable */


module.exports = exports["default"];

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYXJrbW9kZS1qcy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vZGFya21vZGUtanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZGFya21vZGUtanMvLi9zcmMvZGFya21vZGUuanMiLCJ3ZWJwYWNrOi8vZGFya21vZGUtanMvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiSVNfQlJPV1NFUiIsIndpbmRvdyIsIkRhcmttb2RlIiwib3B0aW9ucyIsImJvdHRvbSIsInJpZ2h0IiwibGVmdCIsInRpbWUiLCJtaXhDb2xvciIsImJhY2tncm91bmRDb2xvciIsImJ1dHRvbkNvbG9yRGFyayIsImJ1dHRvbkNvbG9yTGlnaHQiLCJsYWJlbCIsInNhdmVJbkNvb2tpZXMiLCJhdXRvTWF0Y2hPc1RoZW1lIiwiY3NzIiwibGF5ZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJidXR0b24iLCJiYWNrZ3JvdW5kIiwiaW5uZXJIVE1MIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGFya21vZGVBY3RpdmF0ZWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicHJlZmVyZWRUaGVtZU9zIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJkYXJrbW9kZU5ldmVyQWN0aXZhdGVkQnlBY3Rpb24iLCJib2R5IiwiaW5zZXJ0QmVmb3JlIiwiZmlyc3RDaGlsZCIsImFkZFN0eWxlIiwibGlua0VsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJwYXJzZUZsb2F0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImlzRGFya21vZGUiLCJpc0FjdGl2YXRlZCIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJ0b2dnbGUiLCJzZXRJdGVtIiwiY29udGFpbnMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q2QsR0FBQyxVQUFTL0MsTUFBVCxFQUFpQjtBQUNoQkEsVUFBTSxDQUFDQyxRQUFQO0FBQ0QsR0FGRCxFQUVHRCxNQUZIO0FBR0Q7QUFDRCIsImZpbGUiOiJkYXJrbW9kZS1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiZGFya21vZGUtanNcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZGFya21vZGUtanNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZGFya21vZGUtanNcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJleHBvcnQgY29uc3QgSVNfQlJPV1NFUiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFya21vZGUge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGlmICghSVNfQlJPV1NFUikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBib3R0b20gPSAob3B0aW9ucyAmJiBvcHRpb25zLmJvdHRvbSkgfHwgJzMycHgnO1xyXG4gICAgY29uc3QgcmlnaHQgPSAob3B0aW9ucyAmJiBvcHRpb25zLnJpZ2h0KSB8fCAnMzJweCc7XHJcbiAgICBjb25zdCBsZWZ0ID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5sZWZ0KSB8fCAndW5zZXQnO1xyXG4gICAgY29uc3QgdGltZSA9IChvcHRpb25zICYmIG9wdGlvbnMudGltZSkgfHwgJzAuM3MnO1xyXG4gICAgY29uc3QgbWl4Q29sb3IgPSAob3B0aW9ucyAmJiBvcHRpb25zLm1peENvbG9yKSB8fCAnI2ZmZic7XHJcbiAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3IgPSAob3B0aW9ucyAmJiBvcHRpb25zLmJhY2tncm91bmRDb2xvcikgfHwgJyNmZmYnO1xyXG4gICAgY29uc3QgYnV0dG9uQ29sb3JEYXJrID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5idXR0b25Db2xvckRhcmspIHx8ICcjMTAwZjJjJztcclxuICAgIGNvbnN0IGJ1dHRvbkNvbG9yTGlnaHQgPSAob3B0aW9ucyAmJiBvcHRpb25zLmJ1dHRvbkNvbG9yTGlnaHQpIHx8ICcjZmZmJztcclxuICAgIGNvbnN0IGxhYmVsID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5sYWJlbCkgfHwgJyc7XHJcbiAgICBjb25zdCBzYXZlSW5Db29raWVzID0gb3B0aW9ucyAmJiBvcHRpb25zLnNhdmVJbkNvb2tpZXM7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG4gICAgY29uc3QgYXV0b01hdGNoT3NUaGVtZSA9XHJcbiAgICAgIG9wdGlvbnMgJiYgb3B0aW9ucy5hdXRvTWF0Y2hPc1RoZW1lID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZTtcclxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cclxuXHJcbiAgICBjb25zdCBjc3MgPSBgXHJcbiAgICAgIC5kYXJrbW9kZS1sYXllciB7XHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICR7bWl4Q29sb3J9O1xyXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAke3RpbWV9IGVhc2U7XHJcbiAgICAgICAgbWl4LWJsZW5kLW1vZGU6IGRpZmZlcmVuY2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5kYXJrbW9kZS1sYXllci0tYnV0dG9uIHtcclxuICAgICAgICB3aWR0aDogMi45cmVtO1xyXG4gICAgICAgIGhlaWdodDogMi45cmVtO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICByaWdodDogJHtyaWdodH07XHJcbiAgICAgICAgYm90dG9tOiAke2JvdHRvbX07XHJcbiAgICAgICAgbGVmdDogJHtsZWZ0fTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLmRhcmttb2RlLWxheWVyLS1zaW1wbGUge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgbGVmdDogMDtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpICFpbXBvcnRhbnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5kYXJrbW9kZS1sYXllci0tZXhwYW5kZWQge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMTAwKTtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuZGFya21vZGUtbGF5ZXItLW5vLXRyYW5zaXRpb24ge1xyXG4gICAgICAgIHRyYW5zaXRpb246IG5vbmU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5kYXJrbW9kZS10b2dnbGUge1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICR7YnV0dG9uQ29sb3JEYXJrfTtcclxuICAgICAgICB3aWR0aDogM3JlbTtcclxuICAgICAgICBoZWlnaHQ6IDNyZW07XHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICByaWdodDogJHtyaWdodH07XHJcbiAgICAgICAgYm90dG9tOiAke2JvdHRvbX07XHJcbiAgICAgICAgbGVmdDogJHtsZWZ0fTtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZTtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5kYXJrbW9kZS10b2dnbGUtLXdoaXRlIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAke2J1dHRvbkNvbG9yTGlnaHR9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuZGFya21vZGUtYmFja2dyb3VuZCB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogJHtiYWNrZ3JvdW5kQ29sb3J9O1xyXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgICAgICB6LWluZGV4OiAtMTA7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIHRvcDogMDtcclxuICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpbWcsIC5kYXJrbW9kZS1pZ25vcmUge1xyXG4gICAgICAgIGlzb2xhdGlvbjogaXNvbGF0ZTtcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDogYWN0aXZlKSwgKC1tcy1oaWdoLWNvbnRyYXN0OiBub25lKSB7XHJcbiAgICAgICAgLmRhcmttb2RlLXRvZ2dsZSB7ZGlzcGxheTogbm9uZSAhaW1wb3J0YW50fVxyXG4gICAgICB9XHJcblxyXG4gICAgICBAc3VwcG9ydHMgKC1tcy1pbWUtYWxpZ246YXV0byksICgtbXMtYWNjZWxlcmF0b3I6dHJ1ZSkge1xyXG4gICAgICAgIC5kYXJrbW9kZS10b2dnbGUge2Rpc3BsYXk6IG5vbmUgIWltcG9ydGFudH1cclxuICAgICAgfVxyXG4gICAgYDtcclxuXHJcbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBiYWNrZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgYnV0dG9uLmlubmVySFRNTCA9IGxhYmVsO1xyXG4gICAgbGF5ZXIuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtbGF5ZXInKTtcclxuICAgIGJhY2tncm91bmQuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtYmFja2dyb3VuZCcpO1xyXG5cclxuICAgIGNvbnN0IGRhcmttb2RlQWN0aXZhdGVkID1cclxuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXJrbW9kZScpID09PSAndHJ1ZSc7XHJcbiAgICBjb25zdCBwcmVmZXJlZFRoZW1lT3MgPVxyXG4gICAgICBhdXRvTWF0Y2hPc1RoZW1lICYmXHJcbiAgICAgIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcztcclxuICAgIGNvbnN0IGRhcmttb2RlTmV2ZXJBY3RpdmF0ZWRCeUFjdGlvbiA9XHJcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya21vZGUnKSA9PT0gbnVsbDtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIChkYXJrbW9kZUFjdGl2YXRlZCA9PT0gdHJ1ZSAmJiBzYXZlSW5Db29raWVzKSB8fFxyXG4gICAgICAoZGFya21vZGVOZXZlckFjdGl2YXRlZEJ5QWN0aW9uICYmIHByZWZlcmVkVGhlbWVPcylcclxuICAgICkge1xyXG4gICAgICBsYXllci5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAgICdkYXJrbW9kZS1sYXllci0tZXhwYW5kZWQnLFxyXG4gICAgICAgICdkYXJrbW9kZS1sYXllci0tc2ltcGxlJyxcclxuICAgICAgICAnZGFya21vZGUtbGF5ZXItLW5vLXRyYW5zaXRpb24nXHJcbiAgICAgICk7XHJcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdkYXJrbW9kZS10b2dnbGUtLXdoaXRlJyk7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtLWFjdGl2YXRlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGJ1dHRvbiwgZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKTtcclxuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGxheWVyLCBkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoYmFja2dyb3VuZCwgZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKTtcclxuXHJcbiAgICB0aGlzLmFkZFN0eWxlKGNzcyk7XHJcblxyXG4gICAgdGhpcy5idXR0b24gPSBidXR0b247XHJcbiAgICB0aGlzLmxheWVyID0gbGF5ZXI7XHJcbiAgICB0aGlzLnNhdmVJbkNvb2tpZXMgPSBzYXZlSW5Db29raWVzO1xyXG4gICAgdGhpcy50aW1lID0gdGltZTtcclxuICB9XHJcblxyXG4gIGFkZFN0eWxlKGNzcykge1xyXG4gICAgY29uc3QgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XHJcblxyXG4gICAgbGlua0VsZW1lbnQuc2V0QXR0cmlidXRlKCdyZWwnLCAnc3R5bGVzaGVldCcpO1xyXG4gICAgbGlua0VsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XHJcbiAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICdocmVmJyxcclxuICAgICAgJ2RhdGE6dGV4dC9jc3M7Y2hhcnNldD1VVEYtOCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KGNzcylcclxuICAgICk7XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmtFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIHNob3dXaWRnZXQoKSB7XHJcbiAgICBpZiAoIUlTX0JST1dTRVIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5idXR0b247XHJcbiAgICBjb25zdCBsYXllciA9IHRoaXMubGF5ZXI7XHJcbiAgICBjb25zdCB0aW1lID0gcGFyc2VGbG9hdCh0aGlzLnRpbWUpICogMTAwMDtcclxuXHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtdG9nZ2xlJyk7XHJcbiAgICBsYXllci5jbGFzc0xpc3QuYWRkKCdkYXJrbW9kZS1sYXllci0tYnV0dG9uJyk7XHJcblxyXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBjb25zdCBpc0Rhcmttb2RlID0gdGhpcy5pc0FjdGl2YXRlZCgpO1xyXG5cclxuICAgICAgaWYgKCFpc0Rhcmttb2RlKSB7XHJcbiAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtbGF5ZXItLWV4cGFuZGVkJyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKCdkYXJrbW9kZS1sYXllci0tbm8tdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtbGF5ZXItLXNpbXBsZScpO1xyXG4gICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Rhcmttb2RlLWxheWVyLS1zaW1wbGUnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Rhcmttb2RlLWxheWVyLS1uby10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrbW9kZS1sYXllci0tZXhwYW5kZWQnKTtcclxuICAgICAgICB9LCAxKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ2Rhcmttb2RlLXRvZ2dsZS0td2hpdGUnKTtcclxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrbW9kZS0tYWN0aXZhdGVkJyk7XHJcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya21vZGUnLCAhaXNEYXJrbW9kZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZSgpIHtcclxuICAgIGlmICghSVNfQlJPV1NFUikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBsYXllciA9IHRoaXMubGF5ZXI7XHJcbiAgICBjb25zdCBpc0Rhcmttb2RlID0gdGhpcy5pc0FjdGl2YXRlZCgpO1xyXG5cclxuICAgIGxheWVyLmNsYXNzTGlzdC50b2dnbGUoJ2Rhcmttb2RlLWxheWVyLS1zaW1wbGUnKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFya21vZGUtLWFjdGl2YXRlZCcpO1xyXG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrbW9kZScsICFpc0Rhcmttb2RlKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZhdGVkKCkge1xyXG4gICAgaWYgKCFJU19CUk9XU0VSKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXJrbW9kZS0tYWN0aXZhdGVkJyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBEYXJrbW9kZSwgeyBJU19CUk9XU0VSIH0gZnJvbSAnLi9kYXJrbW9kZSc7XHJcbmV4cG9ydCBkZWZhdWx0IERhcmttb2RlO1xyXG5cclxuLyogZXNsaW50LWRpc2FibGUgKi9cclxuaWYgKElTX0JST1dTRVIpIHtcclxuICAoZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB3aW5kb3cuRGFya21vZGUgPSBEYXJrbW9kZTtcclxuICB9KSh3aW5kb3cpO1xyXG59XHJcbi8qIGVzbGludC1lbmFibGUgKi9cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==