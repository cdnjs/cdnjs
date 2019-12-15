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
    /* eslint-disable */

    var saveInCookies = options && options.saveInCookies === false ? false : true;
    /* eslint-enable */

    var css = "\n      .darkmode-layer {\n        position: fixed;\n        pointer-events: none;\n        background: ".concat(mixColor, ";\n        transition: all ").concat(time, " ease;\n        mix-blend-mode: difference;\n      }\n\n      .darkmode-layer--button {\n        width: 2.9rem;\n        height: 2.9rem;\n        border-radius: 50%;\n        right: ").concat(right, ";\n        bottom: ").concat(bottom, ";\n        left: ").concat(left, ";\n      }\n\n      .darkmode-layer--simple {\n        width: 100vw;\n        height: 100vh;\n        top: 0;\n        left: 0;\n        transform: scale(1) !important;\n      }\n      \n      .darkmode-layer--expanded {\n        transform: scale(100);\n        border-radius: 0;\n      }\n\n      .darkmode-layer--no-transition {\n        transition: none;\n      }\n      \n      .darkmode-toggle {\n        background: ").concat(buttonColorDark, ";\n        width: 3rem;\n        height: 3rem;\n        position: fixed;\n        border-radius: 50%;\n        right: ").concat(right, ";\n        bottom: ").concat(bottom, ";\n        left: ").concat(left, ";\n        cursor: pointer;\n        transition: all 0.5s ease;\n      }\n      \n      .darkmode-toggle--white {\n        background: ").concat(buttonColorLight, ";\n      }\n\n      .darkmode-background {\n        background: ").concat(mixColor, ";\n        position: fixed;\n        pointer-events: none;\n        z-index: -10;\n        width: 100vw;\n        height: 100vh;\n        top: 0;\n        left: 0;\n      }\n      \n      img, .darkmode-ignore {\n        isolation: isolate;\n        display: inline-block;\n      }\n    ");
    var layer = document.createElement('div');
    var button = document.createElement('div');
    var background = document.createElement('div');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYXJrbW9kZS1qcy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vZGFya21vZGUtanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZGFya21vZGUtanMvLi9zcmMvZGFya21vZGUuanMiLCJ3ZWJwYWNrOi8vZGFya21vZGUtanMvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRGFya21vZGUiLCJvcHRpb25zIiwiYm90dG9tIiwicmlnaHQiLCJsZWZ0IiwidGltZSIsIm1peENvbG9yIiwiYnV0dG9uQ29sb3JEYXJrIiwiYnV0dG9uQ29sb3JMaWdodCIsInNhdmVJbkNvb2tpZXMiLCJjc3MiLCJsYXllciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImJ1dHRvbiIsImJhY2tncm91bmQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkYXJrbW9kZUFjdGl2YXRlZCIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJib2R5IiwiaW5zZXJ0QmVmb3JlIiwiZmlyc3RDaGlsZCIsImFkZFN0eWxlIiwibGlua0VsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJwYXJzZUZsb2F0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImlzRGFya21vZGUiLCJjb250YWlucyIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJ0b2dnbGUiLCJzZXRJdGVtIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtB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Q0FBQ1UsSUFBVCxDQUFjTixTQUFkLENBQXdCa0IsUUFBeEIsQ0FBaUMscUJBQWpDLENBQW5CO0FBRUF2QixXQUFLLENBQUNLLFNBQU4sQ0FBZ0JxQixNQUFoQixDQUF1Qix3QkFBdkI7QUFDQXpCLGNBQVEsQ0FBQ1UsSUFBVCxDQUFjTixTQUFkLENBQXdCcUIsTUFBeEIsQ0FBK0IscUJBQS9CO0FBQ0FsQixZQUFNLENBQUNDLFlBQVAsQ0FBb0JrQixPQUFwQixDQUE0QixVQUE1QixFQUF3QyxDQUFDTCxVQUF6QztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVKSDs7Ozs7QUFHQTs7OztBQUNBLENBQUMsVUFBU2QsTUFBVCxFQUFnQjtBQUNmQSxRQUFNLENBQUNuQixRQUFQO0FBQ0QsQ0FGRCxFQUVHbUIsTUFGSDtBQUdBIiwiZmlsZSI6ImRhcmttb2RlLWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJkYXJrbW9kZS1qc1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJkYXJrbW9kZS1qc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJkYXJrbW9kZS1qc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERhcmttb2RlIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGNvbnN0IGJvdHRvbSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5ib3R0b20gPyBvcHRpb25zLmJvdHRvbSA6ICczMnB4JztcbiAgICBjb25zdCByaWdodCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5yaWdodCA/IG9wdGlvbnMucmlnaHQgOiAnMzJweCc7XG4gICAgY29uc3QgbGVmdCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5sZWZ0ID8gb3B0aW9ucy5sZWZ0IDogJ3Vuc2V0JztcbiAgICBjb25zdCB0aW1lID0gb3B0aW9ucyAmJiBvcHRpb25zLnRpbWUgPyBvcHRpb25zLnRpbWUgOiAnMC4zcyc7XG4gICAgY29uc3QgbWl4Q29sb3IgPSBvcHRpb25zICYmIG9wdGlvbnMubWl4Q29sb3IgPyBvcHRpb25zLm1peENvbG9yIDogJyNmZmYnO1xuICAgIGNvbnN0IGJ1dHRvbkNvbG9yRGFyayA9IG9wdGlvbnMgJiYgb3B0aW9ucy5idXR0b25Db2xvckRhcmsgPyBvcHRpb25zLmJ1dHRvbkNvbG9yRGFyayA6ICcjMTAwZjJjJztcbiAgICBjb25zdCBidXR0b25Db2xvckxpZ2h0ID0gb3B0aW9ucyAmJiBvcHRpb25zLmJ1dHRvbkNvbG9yTGlnaHQgPyBvcHRpb25zLmJ1dHRvbkNvbG9yTGlnaHQgOiAnI2ZmZic7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICBjb25zdCBzYXZlSW5Db29raWVzID0gb3B0aW9ucyAmJiBvcHRpb25zLnNhdmVJbkNvb2tpZXMgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlO1xuICAgIC8qIGVzbGludC1lbmFibGUgKi9cblxuICAgIGNvbnN0IGNzcyA9IGBcbiAgICAgIC5kYXJrbW9kZS1sYXllciB7XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIGJhY2tncm91bmQ6ICR7bWl4Q29sb3J9O1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgJHt0aW1lfSBlYXNlO1xuICAgICAgICBtaXgtYmxlbmQtbW9kZTogZGlmZmVyZW5jZTtcbiAgICAgIH1cblxuICAgICAgLmRhcmttb2RlLWxheWVyLS1idXR0b24ge1xuICAgICAgICB3aWR0aDogMi45cmVtO1xuICAgICAgICBoZWlnaHQ6IDIuOXJlbTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICByaWdodDogJHtyaWdodH07XG4gICAgICAgIGJvdHRvbTogJHtib3R0b219O1xuICAgICAgICBsZWZ0OiAke2xlZnR9O1xuICAgICAgfVxuXG4gICAgICAuZGFya21vZGUtbGF5ZXItLXNpbXBsZSB7XG4gICAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpICFpbXBvcnRhbnQ7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5kYXJrbW9kZS1sYXllci0tZXhwYW5kZWQge1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEwMCk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICB9XG5cbiAgICAgIC5kYXJrbW9kZS1sYXllci0tbm8tdHJhbnNpdGlvbiB7XG4gICAgICAgIHRyYW5zaXRpb246IG5vbmU7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5kYXJrbW9kZS10b2dnbGUge1xuICAgICAgICBiYWNrZ3JvdW5kOiAke2J1dHRvbkNvbG9yRGFya307XG4gICAgICAgIHdpZHRoOiAzcmVtO1xuICAgICAgICBoZWlnaHQ6IDNyZW07XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICByaWdodDogJHtyaWdodH07XG4gICAgICAgIGJvdHRvbTogJHtib3R0b219O1xuICAgICAgICBsZWZ0OiAke2xlZnR9O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2U7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5kYXJrbW9kZS10b2dnbGUtLXdoaXRlIHtcbiAgICAgICAgYmFja2dyb3VuZDogJHtidXR0b25Db2xvckxpZ2h0fTtcbiAgICAgIH1cblxuICAgICAgLmRhcmttb2RlLWJhY2tncm91bmQge1xuICAgICAgICBiYWNrZ3JvdW5kOiAke21peENvbG9yfTtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgei1pbmRleDogLTEwO1xuICAgICAgICB3aWR0aDogMTAwdnc7XG4gICAgICAgIGhlaWdodDogMTAwdmg7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaW1nLCAuZGFya21vZGUtaWdub3JlIHtcbiAgICAgICAgaXNvbGF0aW9uOiBpc29sYXRlO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICB9XG4gICAgYDtcblxuICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgYmFja2dyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgbGF5ZXIuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtbGF5ZXInKTtcbiAgICBiYWNrZ3JvdW5kLmNsYXNzTGlzdC5hZGQoJ2Rhcmttb2RlLWJhY2tncm91bmQnKTtcblxuICAgIGNvbnN0IGRhcmttb2RlQWN0aXZhdGVkID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXJrbW9kZScpID09PSAndHJ1ZSc7XG5cbiAgICBpZiAoZGFya21vZGVBY3RpdmF0ZWQgPT09IHRydWUgJiYgc2F2ZUluQ29va2llcykge1xuICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtbGF5ZXItLWV4cGFuZGVkJywgJ2Rhcmttb2RlLWxheWVyLS1zaW1wbGUnLCAnZGFya21vZGUtbGF5ZXItLW5vLXRyYW5zaXRpb24nKTtcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdkYXJrbW9kZS10b2dnbGUtLXdoaXRlJyk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2Rhcmttb2RlLS1hY3RpdmF0ZWQnKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShidXR0b24sIGRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZCk7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUobGF5ZXIsIGRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZCk7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoYmFja2dyb3VuZCwgZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKTtcblxuICAgIHRoaXMuYWRkU3R5bGUoY3NzKTtcblxuICAgIHRoaXMuYnV0dG9uID0gYnV0dG9uO1xuICAgIHRoaXMubGF5ZXIgPSBsYXllcjtcbiAgICB0aGlzLnNhdmVJbkNvb2tpZXMgPSBzYXZlSW5Db29raWVzO1xuICAgIHRoaXMudGltZSA9IHRpbWU7XG4gIH1cblxuICBhZGRTdHlsZShjc3MpIHtcbiAgICBjb25zdCBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgIGxpbmtFbGVtZW50LnNldEF0dHJpYnV0ZSgncmVsJywgJ3N0eWxlc2hlZXQnKTtcbiAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcbiAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnZGF0YTp0ZXh0L2NzcztjaGFyc2V0PVVURi04LCcgKyBlbmNvZGVVUklDb21wb25lbnQoY3NzKSk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rRWxlbWVudCk7XG4gIH1cblxuICBzaG93V2lkZ2V0KCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuYnV0dG9uO1xuICAgIGNvbnN0IGxheWVyID0gdGhpcy5sYXllcjtcbiAgICBjb25zdCB0aW1lID0gcGFyc2VGbG9hdCh0aGlzLnRpbWUpICogMTAwMDtcblxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdkYXJrbW9kZS10b2dnbGUnKTtcbiAgICBsYXllci5jbGFzc0xpc3QuYWRkKCdkYXJrbW9kZS1sYXllci0tYnV0dG9uJyk7XG5cbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBpc0Rhcmttb2RlID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rhcmttb2RlLS1hY3RpdmF0ZWQnKTtcblxuICAgICAgaWYgKCFpc0Rhcmttb2RlKSB7XG4gICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoJ2Rhcmttb2RlLWxheWVyLS1leHBhbmRlZCcpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBsYXllci5jbGFzc0xpc3QuYWRkKCdkYXJrbW9kZS1sYXllci0tbm8tdHJhbnNpdGlvbicpO1xuICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoJ2Rhcmttb2RlLWxheWVyLS1zaW1wbGUnKTtcbiAgICAgICAgfSwgdGltZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrbW9kZS1sYXllci0tc2ltcGxlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Rhcmttb2RlLWxheWVyLS1uby10cmFuc2l0aW9uJyk7XG4gICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZSgnZGFya21vZGUtbGF5ZXItLWV4cGFuZGVkJyk7XG4gICAgICAgIH0sIDEpO1xuICAgICAgfVxuXG4gICAgICBidXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnZGFya21vZGUtdG9nZ2xlLS13aGl0ZScpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrbW9kZS0tYWN0aXZhdGVkJyk7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Rhcmttb2RlJywgIWlzRGFya21vZGUpO1xuICAgIH0pO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIGNvbnN0IGxheWVyID0gdGhpcy5sYXllcjtcbiAgICBjb25zdCBpc0Rhcmttb2RlID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rhcmttb2RlLS1hY3RpdmF0ZWQnKTtcblxuICAgIGxheWVyLmNsYXNzTGlzdC50b2dnbGUoJ2Rhcmttb2RlLWxheWVyLS1zaW1wbGUnKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2Rhcmttb2RlLS1hY3RpdmF0ZWQnKTtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Rhcmttb2RlJywgIWlzRGFya21vZGUpO1xuICB9XG59XG4iLCJpbXBvcnQgRGFya21vZGUgZnJvbSAnLi9kYXJrbW9kZSc7XG5leHBvcnQgZGVmYXVsdCBEYXJrbW9kZTtcblxuLyogZXNsaW50LWRpc2FibGUgKi9cbihmdW5jdGlvbih3aW5kb3cpe1xuICB3aW5kb3cuRGFya21vZGUgPSBEYXJrbW9kZTtcbn0pKHdpbmRvdylcbi8qIGVzbGludC1lbmFibGUgKi9cbiJdLCJzb3VyY2VSb290IjoiIn0=