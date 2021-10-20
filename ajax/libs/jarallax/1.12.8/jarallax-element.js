/*!
 * Name    : DEPRECATED Elements Extension for Jarallax. Use laxxx instead https://github.com/alexfoxy/laxxx
 * Version : 1.0.0
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(module) {

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
/* 2 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var win;

if (typeof window !== "undefined") {
  win = window;
} else if (typeof __webpack_require__.g !== "undefined") {
  win = __webpack_require__.g;
} else if (typeof self !== "undefined") {
  win = self;
} else {
  win = {};
}

module.exports = win;

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ jarallaxElement; }
/* harmony export */ });
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_0__);
/* eslint no-case-declarations: "off" */

function jarallaxElement() {
  var jarallax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (global__WEBPACK_IMPORTED_MODULE_0___default().jarallax);

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
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lite_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var lite_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lite_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jarallax_element_esm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);



(0,_jarallax_element_esm__WEBPACK_IMPORTED_MODULE_2__["default"])(); // data-jarallax-element initialization

lite_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  if ('undefined' !== typeof (global__WEBPACK_IMPORTED_MODULE_1___default().jarallax)) {
    global__WEBPACK_IMPORTED_MODULE_1___default().jarallax(document.querySelectorAll('[data-jarallax-element]'));
  }
});
}();
/******/ })()
;