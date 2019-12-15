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

    var css = "\n      .darkmode-layer {\n        position: fixed;\n        pointer-events: none;\n        background: ".concat(mixColor, ";\n        transition: all ").concat(time, " ease;\n        mix-blend-mode: difference;\n      }\n\n      .darkmode-layer--button {\n        width: 2.9rem;\n        height: 2.9rem;\n        border-radius: 50%;\n        right: ").concat(right, ";\n        bottom: ").concat(bottom, ";\n        left: ").concat(left, ";\n      }\n\n      .darkmode-layer--simple {\n        width: 100%;\n        height: 100%;\n        top: 0;\n        left: 0;\n        transform: scale(1) !important;\n      }\n      \n      .darkmode-layer--expanded {\n        transform: scale(100);\n        border-radius: 0;\n      }\n\n      .darkmode-layer--no-transition {\n        transition: none;\n      }\n      \n      .darkmode-toggle {\n        background: ").concat(buttonColorDark, ";\n        width: 3rem;\n        height: 3rem;\n        position: fixed;\n        border-radius: 50%;\n        right: ").concat(right, ";\n        bottom: ").concat(bottom, ";\n        left: ").concat(left, ";\n        cursor: pointer;\n        transition: all 0.5s ease;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n      }\n      \n      .darkmode-toggle--white {\n        background: ").concat(buttonColorLight, ";\n      }\n\n      .darkmode-background {\n        background: ").concat(mixColor, ";\n        position: fixed;\n        pointer-events: none;\n        z-index: -10;\n        width: 100%;\n        height: 100%;\n        top: 0;\n        left: 0;\n      }\n      \n      img, .darkmode-ignore {\n        isolation: isolate;\n        display: inline-block;\n      }\n    ");
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
      var _this = this;

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
      var layer = this.layer;
      var isDarkmode = this.isActivated();
      layer.classList.toggle('darkmode-layer--simple');
      document.body.classList.toggle('darkmode--activated');
      window.localStorage.setItem('darkmode', !isDarkmode);
    }
  }, {
    key: "isActivated",
    value: function isActivated() {
      return document.body.classList.contains('darkmode--activated');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYXJrbW9kZS1qcy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vZGFya21vZGUtanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZGFya21vZGUtanMvLi9zcmMvZGFya21vZGUuanMiLCJ3ZWJwYWNrOi8vZGFya21vZGUtanMvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRGFya21vZGUiLCJvcHRpb25zIiwiYm90dG9tIiwicmlnaHQiLCJsZWZ0IiwidGltZSIsIm1peENvbG9yIiwiYnV0dG9uQ29sb3JEYXJrIiwiYnV0dG9uQ29sb3JMaWdodCIsImxhYmVsIiwic2F2ZUluQ29va2llcyIsImNzcyIsImxheWVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYnV0dG9uIiwiYmFja2dyb3VuZCIsImlubmVySFRNTCIsImNsYXNzTGlzdCIsImFkZCIsImRhcmttb2RlQWN0aXZhdGVkIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImJvZHkiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwiYWRkU3R5bGUiLCJsaW5rRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImVuY29kZVVSSUNvbXBvbmVudCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsInBhcnNlRmxvYXQiLCJhZGRFdmVudExpc3RlbmVyIiwiaXNEYXJrbW9kZSIsImlzQWN0aXZhdGVkIiwic2V0VGltZW91dCIsInJlbW92ZSIsInRvZ2dsZSIsInNldEl0ZW0iLCJjb250YWlucyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7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QXBCLENBQTRCLFVBQTVCLEVBQXdDLENBQUNMLFVBQXpDO0FBQ0QsT0FwQkQ7QUFxQkQ7Ozs2QkFFUTtBQUNQLFVBQU12QixLQUFLLEdBQUcsS0FBS0EsS0FBbkI7QUFDQSxVQUFNdUIsVUFBVSxHQUFHLEtBQUtDLFdBQUwsRUFBbkI7QUFFQXhCLFdBQUssQ0FBQ00sU0FBTixDQUFnQnFCLE1BQWhCLENBQXVCLHdCQUF2QjtBQUNBMUIsY0FBUSxDQUFDVyxJQUFULENBQWNOLFNBQWQsQ0FBd0JxQixNQUF4QixDQUErQixxQkFBL0I7QUFDQWxCLFlBQU0sQ0FBQ0MsWUFBUCxDQUFvQmtCLE9BQXBCLENBQTRCLFVBQTVCLEVBQXdDLENBQUNMLFVBQXpDO0FBQ0Q7OztrQ0FFYTtBQUNaLGFBQU90QixRQUFRLENBQUNXLElBQVQsQ0FBY04sU0FBZCxDQUF3QnVCLFFBQXhCLENBQWlDLHFCQUFqQyxDQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcktIOzs7OztBQUdBOzs7O0FBQ0EsQ0FBQyxVQUFTcEIsTUFBVCxFQUFnQjtBQUNmQSxRQUFNLENBQUNyQixRQUFQO0FBQ0QsQ0FGRCxFQUVHcUIsTUFGSDtBQUdBIiwiZmlsZSI6ImRhcmttb2RlLWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJkYXJrbW9kZS1qc1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJkYXJrbW9kZS1qc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJkYXJrbW9kZS1qc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERhcmttb2RlIHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCBib3R0b20gPSBvcHRpb25zICYmIG9wdGlvbnMuYm90dG9tID8gb3B0aW9ucy5ib3R0b20gOiAnMzJweCc7XHJcbiAgICBjb25zdCByaWdodCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5yaWdodCA/IG9wdGlvbnMucmlnaHQgOiAnMzJweCc7XHJcbiAgICBjb25zdCBsZWZ0ID0gb3B0aW9ucyAmJiBvcHRpb25zLmxlZnQgPyBvcHRpb25zLmxlZnQgOiAndW5zZXQnO1xyXG4gICAgY29uc3QgdGltZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy50aW1lID8gb3B0aW9ucy50aW1lIDogJzAuM3MnO1xyXG4gICAgY29uc3QgbWl4Q29sb3IgPSBvcHRpb25zICYmIG9wdGlvbnMubWl4Q29sb3IgPyBvcHRpb25zLm1peENvbG9yIDogJyNmZmYnO1xyXG4gICAgY29uc3QgYnV0dG9uQ29sb3JEYXJrID0gb3B0aW9ucyAmJiBvcHRpb25zLmJ1dHRvbkNvbG9yRGFyayA/IG9wdGlvbnMuYnV0dG9uQ29sb3JEYXJrIDogJyMxMDBmMmMnO1xyXG4gICAgY29uc3QgYnV0dG9uQ29sb3JMaWdodCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5idXR0b25Db2xvckxpZ2h0ID8gb3B0aW9ucy5idXR0b25Db2xvckxpZ2h0IDogJyNmZmYnO1xyXG4gICAgY29uc3QgbGFiZWwgPSBvcHRpb25zICYmIG9wdGlvbnMubGFiZWwgPyBvcHRpb25zLmxhYmVsIDogJyc7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG4gICAgY29uc3Qgc2F2ZUluQ29va2llcyA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zYXZlSW5Db29raWVzID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZTtcclxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cclxuXHJcbiAgICBjb25zdCBjc3MgPSBgXHJcbiAgICAgIC5kYXJrbW9kZS1sYXllciB7XHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICR7bWl4Q29sb3J9O1xyXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAke3RpbWV9IGVhc2U7XHJcbiAgICAgICAgbWl4LWJsZW5kLW1vZGU6IGRpZmZlcmVuY2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5kYXJrbW9kZS1sYXllci0tYnV0dG9uIHtcclxuICAgICAgICB3aWR0aDogMi45cmVtO1xyXG4gICAgICAgIGhlaWdodDogMi45cmVtO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICByaWdodDogJHtyaWdodH07XHJcbiAgICAgICAgYm90dG9tOiAke2JvdHRvbX07XHJcbiAgICAgICAgbGVmdDogJHtsZWZ0fTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLmRhcmttb2RlLWxheWVyLS1zaW1wbGUge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgbGVmdDogMDtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpICFpbXBvcnRhbnQ7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIC5kYXJrbW9kZS1sYXllci0tZXhwYW5kZWQge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMTAwKTtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuZGFya21vZGUtbGF5ZXItLW5vLXRyYW5zaXRpb24ge1xyXG4gICAgICAgIHRyYW5zaXRpb246IG5vbmU7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIC5kYXJrbW9kZS10b2dnbGUge1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICR7YnV0dG9uQ29sb3JEYXJrfTtcclxuICAgICAgICB3aWR0aDogM3JlbTtcclxuICAgICAgICBoZWlnaHQ6IDNyZW07XHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICByaWdodDogJHtyaWdodH07XHJcbiAgICAgICAgYm90dG9tOiAke2JvdHRvbX07XHJcbiAgICAgICAgbGVmdDogJHtsZWZ0fTtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZTtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIC5kYXJrbW9kZS10b2dnbGUtLXdoaXRlIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAke2J1dHRvbkNvbG9yTGlnaHR9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuZGFya21vZGUtYmFja2dyb3VuZCB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogJHttaXhDb2xvcn07XHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgICAgIHotaW5kZXg6IC0xMDtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGltZywgLmRhcmttb2RlLWlnbm9yZSB7XHJcbiAgICAgICAgaXNvbGF0aW9uOiBpc29sYXRlO1xyXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgfVxyXG4gICAgYDtcclxuXHJcbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBiYWNrZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgYnV0dG9uLmlubmVySFRNTCA9IGxhYmVsO1xyXG4gICAgbGF5ZXIuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtbGF5ZXInKTtcclxuICAgIGJhY2tncm91bmQuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtYmFja2dyb3VuZCcpO1xyXG5cclxuICAgIGNvbnN0IGRhcmttb2RlQWN0aXZhdGVkID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXJrbW9kZScpID09PSAndHJ1ZSc7XHJcblxyXG4gICAgaWYgKGRhcmttb2RlQWN0aXZhdGVkID09PSB0cnVlICYmIHNhdmVJbkNvb2tpZXMpIHtcclxuICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtbGF5ZXItLWV4cGFuZGVkJywgJ2Rhcmttb2RlLWxheWVyLS1zaW1wbGUnLCAnZGFya21vZGUtbGF5ZXItLW5vLXRyYW5zaXRpb24nKTtcclxuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2Rhcmttb2RlLXRvZ2dsZS0td2hpdGUnKTtcclxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdkYXJrbW9kZS0tYWN0aXZhdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoYnV0dG9uLCBkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUobGF5ZXIsIGRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZCk7XHJcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShiYWNrZ3JvdW5kLCBkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpO1xyXG5cclxuICAgIHRoaXMuYWRkU3R5bGUoY3NzKTtcclxuXHJcbiAgICB0aGlzLmJ1dHRvbiA9IGJ1dHRvbjtcclxuICAgIHRoaXMubGF5ZXIgPSBsYXllcjtcclxuICAgIHRoaXMuc2F2ZUluQ29va2llcyA9IHNhdmVJbkNvb2tpZXM7XHJcbiAgICB0aGlzLnRpbWUgPSB0aW1lO1xyXG4gIH1cclxuXHJcbiAgYWRkU3R5bGUoY3NzKSB7XHJcbiAgICBjb25zdCBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuXHJcbiAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdzdHlsZXNoZWV0Jyk7XHJcbiAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcclxuICAgIGxpbmtFbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsICdkYXRhOnRleHQvY3NzO2NoYXJzZXQ9VVRGLTgsJyArIGVuY29kZVVSSUNvbXBvbmVudChjc3MpKTtcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGlua0VsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgc2hvd1dpZGdldCgpIHtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuYnV0dG9uO1xyXG4gICAgY29uc3QgbGF5ZXIgPSB0aGlzLmxheWVyO1xyXG4gICAgY29uc3QgdGltZSA9IHBhcnNlRmxvYXQodGhpcy50aW1lKSAqIDEwMDA7XHJcblxyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2Rhcmttb2RlLXRvZ2dsZScpO1xyXG4gICAgbGF5ZXIuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtbGF5ZXItLWJ1dHRvbicpO1xyXG5cclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgY29uc3QgaXNEYXJrbW9kZSA9IHRoaXMuaXNBY3RpdmF0ZWQoKTtcclxuXHJcbiAgICAgIGlmICghaXNEYXJrbW9kZSkge1xyXG4gICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoJ2Rhcmttb2RlLWxheWVyLS1leHBhbmRlZCcpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtbGF5ZXItLW5vLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoJ2Rhcmttb2RlLWxheWVyLS1zaW1wbGUnKTtcclxuICAgICAgICB9LCB0aW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrbW9kZS1sYXllci0tc2ltcGxlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrbW9kZS1sYXllci0tbm8tdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LnJlbW92ZSgnZGFya21vZGUtbGF5ZXItLWV4cGFuZGVkJyk7XHJcbiAgICAgICAgfSwgMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrbW9kZS10b2dnbGUtLXdoaXRlJyk7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFya21vZGUtLWFjdGl2YXRlZCcpO1xyXG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Rhcmttb2RlJywgIWlzRGFya21vZGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGUoKSB7XHJcbiAgICBjb25zdCBsYXllciA9IHRoaXMubGF5ZXI7XHJcbiAgICBjb25zdCBpc0Rhcmttb2RlID0gdGhpcy5pc0FjdGl2YXRlZCgpO1xyXG5cclxuICAgIGxheWVyLmNsYXNzTGlzdC50b2dnbGUoJ2Rhcmttb2RlLWxheWVyLS1zaW1wbGUnKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFya21vZGUtLWFjdGl2YXRlZCcpO1xyXG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrbW9kZScsICFpc0Rhcmttb2RlKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZhdGVkKCkge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXJrbW9kZS0tYWN0aXZhdGVkJyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBEYXJrbW9kZSBmcm9tICcuL2Rhcmttb2RlJztcclxuZXhwb3J0IGRlZmF1bHQgRGFya21vZGU7XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG4oZnVuY3Rpb24od2luZG93KXtcclxuICB3aW5kb3cuRGFya21vZGUgPSBEYXJrbW9kZTtcclxufSkod2luZG93KVxyXG4vKiBlc2xpbnQtZW5hYmxlICovXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=