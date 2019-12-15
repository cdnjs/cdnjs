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

    var css = "\n      .darkmode-layer {\n        position: fixed;\n        pointer-events: none;\n        background: ".concat(mixColor, ";\n        transition: all ").concat(time, " ease;\n        mix-blend-mode: difference;\n      }\n\n      .darkmode-layer--button {\n        width: 2.9rem;\n        height: 2.9rem;\n        border-radius: 50%;\n        right: ").concat(right, ";\n        bottom: ").concat(bottom, ";\n        left: ").concat(left, ";\n      }\n\n      .darkmode-layer--simple {\n        width: 100vw;\n        height: 100vh;\n        top: 0;\n        left: 0;\n      }\n      \n      .darkmode-layer--expanded {\n        transform: scale(100);\n      }\n      \n      .darkmode-toggle {\n        background: ").concat(buttonColorDark, ";\n        width: 3rem;\n        height: 3rem;\n        position: fixed;\n        border-radius: 50%;\n        right: ").concat(right, ";\n        bottom: ").concat(bottom, ";\n        left: ").concat(left, ";\n        cursor: pointer;\n        transition: all 0.5s ease;\n      }\n      \n      .darkmode-toggle--white {\n        background: ").concat(buttonColorLight, ";\n      }\n      \n      img, .darkmode-ignore {\n        isolation: isolate;\n        display: inline-block;\n      }\n    ");
    var layer = document.createElement('div');
    var button = document.createElement('div');
    layer.classList.add('darkmode-layer');
    var darkmodeActivated = window.localStorage.getItem('darkmode') === 'true';

    if (darkmodeActivated === true && saveInCookies) {
      layer.classList.add('darkmode-layer--simple');
      button.classList.add('darkmode-toggle--white');
      document.body.classList.add('darkmode--activated');
    }

    document.body.insertBefore(button, document.body.firstChild);
    document.body.insertBefore(layer, document.body.firstChild);
    this.addStyle(css);
    this.button = button;
    this.layer = layer;
    this.saveInCookies = saveInCookies;
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

      if (layer.classList.contains('darkmode-layer--simple') && this.saveInCookies) {
        layer.classList.remove('darkmode-layer--simple');
        layer.classList.add('darkmode-layer--expanded');
      }

      button.classList.add('darkmode-toggle');
      layer.classList.add('darkmode-layer--button');
      button.addEventListener('click', function () {
        layer.classList.toggle('darkmode-layer--expanded');
        button.classList.toggle('darkmode-toggle--white');
        document.body.classList.toggle('darkmode--activated');
        window.localStorage.setItem('darkmode', layer.classList.contains('darkmode-layer--expanded'));
      });
    }
  }, {
    key: "toggle",
    value: function toggle() {
      var layer = this.layer;
      layer.classList.toggle('darkmode-layer--simple');
      document.body.classList.toggle('darkmode--activated');
      window.localStorage.setItem('darkmode', layer.classList.contains('darkmode-layer--simple'));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYXJrbW9kZS1qcy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vZGFya21vZGUtanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZGFya21vZGUtanMvLi9zcmMvZGFya21vZGUuanMiLCJ3ZWJwYWNrOi8vZGFya21vZGUtanMvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRGFya21vZGUiLCJvcHRpb25zIiwiYm90dG9tIiwicmlnaHQiLCJsZWZ0IiwidGltZSIsIm1peENvbG9yIiwiYnV0dG9uQ29sb3JEYXJrIiwiYnV0dG9uQ29sb3JMaWdodCIsInNhdmVJbkNvb2tpZXMiLCJjc3MiLCJsYXllciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImJ1dHRvbiIsImNsYXNzTGlzdCIsImFkZCIsImRhcmttb2RlQWN0aXZhdGVkIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImJvZHkiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwiYWRkU3R5bGUiLCJsaW5rRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImVuY29kZVVSSUNvbXBvbmVudCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsImNvbnRhaW5zIiwicmVtb3ZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRvZ2dsZSIsInNldEl0ZW0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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QmtCLE1BQWpCLENBQXdCLHdCQUF4QjtBQUNBckIsZ0JBQVEsQ0FBQ1MsSUFBVCxDQUFjTixTQUFkLENBQXdCa0IsTUFBeEIsQ0FBK0IscUJBQS9CO0FBQ0FmLGNBQU0sQ0FBQ0MsWUFBUCxDQUFvQmUsT0FBcEIsQ0FBNEIsVUFBNUIsRUFBd0N2QixLQUFLLENBQUNJLFNBQU4sQ0FBZ0JlLFFBQWhCLENBQXlCLDBCQUF6QixDQUF4QztBQUNELE9BTEQ7QUFNRDs7OzZCQUVRO0FBQ1AsVUFBTW5CLEtBQUssR0FBRyxLQUFLQSxLQUFuQjtBQUVBQSxXQUFLLENBQUNJLFNBQU4sQ0FBZ0JrQixNQUFoQixDQUF1Qix3QkFBdkI7QUFDQXJCLGNBQVEsQ0FBQ1MsSUFBVCxDQUFjTixTQUFkLENBQXdCa0IsTUFBeEIsQ0FBK0IscUJBQS9CO0FBQ0FmLFlBQU0sQ0FBQ0MsWUFBUCxDQUFvQmUsT0FBcEIsQ0FBNEIsVUFBNUIsRUFBd0N2QixLQUFLLENBQUNJLFNBQU4sQ0FBZ0JlLFFBQWhCLENBQXlCLHdCQUF6QixDQUF4QztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNISDs7Ozs7QUFHQTs7OztBQUNBLENBQUMsVUFBU1osTUFBVCxFQUFnQjtBQUNmQSxRQUFNLENBQUNsQixRQUFQO0FBQ0QsQ0FGRCxFQUVHa0IsTUFGSDtBQUdBIiwiZmlsZSI6ImRhcmttb2RlLWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJkYXJrbW9kZS1qc1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJkYXJrbW9kZS1qc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJkYXJrbW9kZS1qc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERhcmttb2RlIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGNvbnN0IGJvdHRvbSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5ib3R0b20gPyBvcHRpb25zLmJvdHRvbSA6ICczMnB4JztcbiAgICBjb25zdCByaWdodCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5yaWdodCA/IG9wdGlvbnMucmlnaHQgOiAnMzJweCc7XG4gICAgY29uc3QgbGVmdCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5sZWZ0ID8gb3B0aW9ucy5sZWZ0IDogJ3Vuc2V0JztcbiAgICBjb25zdCB0aW1lID0gb3B0aW9ucyAmJiBvcHRpb25zLnRpbWUgPyBvcHRpb25zLnRpbWUgOiAnMC4zcyc7XG4gICAgY29uc3QgbWl4Q29sb3IgPSBvcHRpb25zICYmIG9wdGlvbnMubWl4Q29sb3IgPyBvcHRpb25zLm1peENvbG9yIDogJyNmZmYnO1xuICAgIGNvbnN0IGJ1dHRvbkNvbG9yRGFyayA9IG9wdGlvbnMgJiYgb3B0aW9ucy5idXR0b25Db2xvckRhcmsgPyBvcHRpb25zLmJ1dHRvbkNvbG9yRGFyayA6ICcjMTAwZjJjJztcbiAgICBjb25zdCBidXR0b25Db2xvckxpZ2h0ID0gb3B0aW9ucyAmJiBvcHRpb25zLmJ1dHRvbkNvbG9yTGlnaHQgPyBvcHRpb25zLmJ1dHRvbkNvbG9yTGlnaHQgOiAnI2ZmZic7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICBjb25zdCBzYXZlSW5Db29raWVzID0gb3B0aW9ucyAmJiBvcHRpb25zLnNhdmVJbkNvb2tpZXMgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlO1xuICAgIC8qIGVzbGludC1lbmFibGUgKi9cblxuICAgIGNvbnN0IGNzcyA9IGBcbiAgICAgIC5kYXJrbW9kZS1sYXllciB7XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIGJhY2tncm91bmQ6ICR7bWl4Q29sb3J9O1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgJHt0aW1lfSBlYXNlO1xuICAgICAgICBtaXgtYmxlbmQtbW9kZTogZGlmZmVyZW5jZTtcbiAgICAgIH1cblxuICAgICAgLmRhcmttb2RlLWxheWVyLS1idXR0b24ge1xuICAgICAgICB3aWR0aDogMi45cmVtO1xuICAgICAgICBoZWlnaHQ6IDIuOXJlbTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICByaWdodDogJHtyaWdodH07XG4gICAgICAgIGJvdHRvbTogJHtib3R0b219O1xuICAgICAgICBsZWZ0OiAke2xlZnR9O1xuICAgICAgfVxuXG4gICAgICAuZGFya21vZGUtbGF5ZXItLXNpbXBsZSB7XG4gICAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgfVxuICAgICAgXG4gICAgICAuZGFya21vZGUtbGF5ZXItLWV4cGFuZGVkIHtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxMDApO1xuICAgICAgfVxuICAgICAgXG4gICAgICAuZGFya21vZGUtdG9nZ2xlIHtcbiAgICAgICAgYmFja2dyb3VuZDogJHtidXR0b25Db2xvckRhcmt9O1xuICAgICAgICB3aWR0aDogM3JlbTtcbiAgICAgICAgaGVpZ2h0OiAzcmVtO1xuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgcmlnaHQ6ICR7cmlnaHR9O1xuICAgICAgICBib3R0b206ICR7Ym90dG9tfTtcbiAgICAgICAgbGVmdDogJHtsZWZ0fTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlO1xuICAgICAgfVxuICAgICAgXG4gICAgICAuZGFya21vZGUtdG9nZ2xlLS13aGl0ZSB7XG4gICAgICAgIGJhY2tncm91bmQ6ICR7YnV0dG9uQ29sb3JMaWdodH07XG4gICAgICB9XG4gICAgICBcbiAgICAgIGltZywgLmRhcmttb2RlLWlnbm9yZSB7XG4gICAgICAgIGlzb2xhdGlvbjogaXNvbGF0ZTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgfVxuICAgIGA7XG5cbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgbGF5ZXIuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtbGF5ZXInKTtcblxuICAgIGNvbnN0IGRhcmttb2RlQWN0aXZhdGVkID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXJrbW9kZScpID09PSAndHJ1ZSc7XG5cbiAgICBpZiAoZGFya21vZGVBY3RpdmF0ZWQgPT09IHRydWUgJiYgc2F2ZUluQ29va2llcykge1xuICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtbGF5ZXItLXNpbXBsZScpO1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2Rhcmttb2RlLXRvZ2dsZS0td2hpdGUnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtLWFjdGl2YXRlZCcpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGJ1dHRvbiwgZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKTtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShsYXllciwgZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKTtcblxuICAgIHRoaXMuYWRkU3R5bGUoY3NzKTtcblxuICAgIHRoaXMuYnV0dG9uID0gYnV0dG9uO1xuICAgIHRoaXMubGF5ZXIgPSBsYXllcjtcbiAgICB0aGlzLnNhdmVJbkNvb2tpZXMgPSBzYXZlSW5Db29raWVzO1xuICB9XG5cbiAgYWRkU3R5bGUoY3NzKSB7XG4gICAgY29uc3QgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdzdHlsZXNoZWV0Jyk7XG4gICAgbGlua0VsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgbGlua0VsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgJ2RhdGE6dGV4dC9jc3M7Y2hhcnNldD1VVEYtOCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KGNzcykpO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGlua0VsZW1lbnQpO1xuICB9XG5cbiAgc2hvd1dpZGdldCgpIHtcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLmJ1dHRvbjtcbiAgICBjb25zdCBsYXllciA9IHRoaXMubGF5ZXI7XG5cbiAgICBpZiAobGF5ZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXJrbW9kZS1sYXllci0tc2ltcGxlJykgJiYgdGhpcy5zYXZlSW5Db29raWVzKSB7XG4gICAgICBsYXllci5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrbW9kZS1sYXllci0tc2ltcGxlJyk7XG4gICAgICBsYXllci5jbGFzc0xpc3QuYWRkKCdkYXJrbW9kZS1sYXllci0tZXhwYW5kZWQnKTtcbiAgICB9XG5cbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtdG9nZ2xlJyk7XG4gICAgbGF5ZXIuY2xhc3NMaXN0LmFkZCgnZGFya21vZGUtbGF5ZXItLWJ1dHRvbicpO1xuXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbGF5ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnZGFya21vZGUtbGF5ZXItLWV4cGFuZGVkJyk7XG4gICAgICBidXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnZGFya21vZGUtdG9nZ2xlLS13aGl0ZScpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrbW9kZS0tYWN0aXZhdGVkJyk7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Rhcmttb2RlJywgbGF5ZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXJrbW9kZS1sYXllci0tZXhwYW5kZWQnKSk7XG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgY29uc3QgbGF5ZXIgPSB0aGlzLmxheWVyO1xuXG4gICAgbGF5ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnZGFya21vZGUtbGF5ZXItLXNpbXBsZScpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFya21vZGUtLWFjdGl2YXRlZCcpO1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFya21vZGUnLCBsYXllci5jbGFzc0xpc3QuY29udGFpbnMoJ2Rhcmttb2RlLWxheWVyLS1zaW1wbGUnKSk7XG4gIH1cbn1cbiIsImltcG9ydCBEYXJrbW9kZSBmcm9tICcuL2Rhcmttb2RlJztcbmV4cG9ydCBkZWZhdWx0IERhcmttb2RlO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuKGZ1bmN0aW9uKHdpbmRvdyl7XG4gIHdpbmRvdy5EYXJrbW9kZSA9IERhcmttb2RlO1xufSkod2luZG93KVxuLyogZXNsaW50LWVuYWJsZSAqL1xuIl0sInNvdXJjZVJvb3QiOiIifQ==