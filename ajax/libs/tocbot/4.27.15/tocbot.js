/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/js/index-dist.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* globals define */

;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory(root))
  } else if (typeof exports === 'object') {
    module.exports = factory(root)
  } else {
    root.tocbot = factory(root)
  }
})(typeof global !== 'undefined' ? global : window || global, function (root) {
  'use strict'

  // Just return if its not a browser.
  const supports =
    !!root &&
    !!root.document &&
    !!root.document.querySelector &&
    !!root.addEventListener // Feature test
  if (typeof window === 'undefined' && !supports) {
    return
  }

  const tocbot = require('./index-esm.js')

  // Make tocbot available globally.
  root.tocbot = tocbot

  return tocbot
})

/******/ })()
;
//# sourceMappingURL=main.js.map