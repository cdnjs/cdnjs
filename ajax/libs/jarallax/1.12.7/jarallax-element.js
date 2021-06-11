/*!
 * Name    : DEPRECATED Elements Extension for Jarallax. Use laxxx instead https://github.com/alexfoxy/laxxx
 * Version : 1.0.0
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lite_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var lite_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lite_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jarallax_element_esm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);



Object(_jarallax_element_esm__WEBPACK_IMPORTED_MODULE_2__["default"])(); // data-jarallax-element initialization

lite_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  if ('undefined' !== typeof global__WEBPACK_IMPORTED_MODULE_1___default.a.jarallax) {
    global__WEBPACK_IMPORTED_MODULE_1___default.a.jarallax(document.querySelectorAll('[data-jarallax-element]'));
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (callback) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Already ready or interactive, execute callback
    callback.call();
  } else if (document.attachEvent) {
    // Old browsers
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'interactive') callback.call();
    });
  } else if (document.addEventListener) {
    // Modern browsers
    document.addEventListener('DOMContentLoaded', callback);
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
  win = window;
} else if (typeof global !== "undefined") {
  win = global;
} else if (typeof self !== "undefined") {
  win = self;
} else {
  win = {};
}

module.exports = win;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return jarallaxElement; });
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_0__);
/* eslint no-case-declarations: "off" */

function jarallaxElement() {
  var jarallax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : global__WEBPACK_IMPORTED_MODULE_0___default.a.jarallax;

  if ('undefined' === typeof jarallax) {
    return;
  }

  var Jarallax = jarallax.constructor; // redefine default methods

  ['initImg', 'canInitParallax', 'init', 'destroy', 'clipContainer', 'coverImage', 'isVisible', 'onScroll', 'onResize'].forEach(function (key) {
    var def = Jarallax.prototype[key];

    Jarallax.prototype[key] = function () {
      var self = this;

      if ('initImg' === key && null !== self.$item.getAttribute('data-jarallax-element')) {
        self.options.type = 'element';
        self.pureOptions.speed = self.$item.getAttribute('data-jarallax-element') || self.pureOptions.speed;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if ('element' !== self.options.type) {
        return def.apply(self, args);
      }

      self.pureOptions.threshold = self.$item.getAttribute('data-threshold') || '';

      switch (key) {
        case 'init':
          var speedArr = self.pureOptions.speed.split(' ');
          self.options.speed = self.pureOptions.speed || 0;
          self.options.speedY = speedArr[0] ? parseFloat(speedArr[0]) : 0;
          self.options.speedX = speedArr[1] ? parseFloat(speedArr[1]) : 0;
          var thresholdArr = self.pureOptions.threshold.split(' ');
          self.options.thresholdY = thresholdArr[0] ? parseFloat(thresholdArr[0]) : null;
          self.options.thresholdX = thresholdArr[1] ? parseFloat(thresholdArr[1]) : null;
          def.apply(self, args); // restore background image if available.

          var originalStylesTag = self.$item.getAttribute('data-jarallax-original-styles');

          if (originalStylesTag) {
            self.$item.setAttribute('style', originalStylesTag);
          }

          return true;

        case 'onResize':
          var defTransform = self.css(self.$item, 'transform');
          self.css(self.$item, {
            transform: ''
          });
          var rect = self.$item.getBoundingClientRect();
          self.itemData = {
            width: rect.width,
            height: rect.height,
            y: rect.top + self.getWindowData().y,
            x: rect.left
          };
          self.css(self.$item, {
            transform: defTransform
          });
          break;

        case 'onScroll':
          var wnd = self.getWindowData();
          var centerPercent = (wnd.y + wnd.height / 2 - self.itemData.y - self.itemData.height / 2) / (wnd.height / 2);
          var moveY = centerPercent * self.options.speedY;
          var moveX = centerPercent * self.options.speedX;
          var my = moveY;
          var mx = moveX;
          if (null !== self.options.thresholdY && moveY > self.options.thresholdY) my = 0;
          if (null !== self.options.thresholdX && moveX > self.options.thresholdX) mx = 0;
          self.css(self.$item, {
            transform: "translate3d(".concat(mx, "px,").concat(my, "px,0)")
          });
          break;

        case 'initImg':
        case 'isVisible':
        case 'clipContainer':
        case 'coverImage':
          return true;
        // no default
      }

      return def.apply(self, args);
    };
  });
}

/***/ })
/******/ ]);