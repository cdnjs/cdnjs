/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.3.2
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initPjs": () => (/* binding */ initPjs)
/* harmony export */ });
/**
 * Initializes particles.js compatibility to the given engine
 * @param engine the engine that requires particles.js compatibility
 */
const initPjs = engine => {
  /**
   * Loads the provided options to create a [[Container]] object.
   * @deprecated this method is obsolete, please use the new tsParticles.load
   * @param tagId the particles container element id
   * @param options the options object to initialize the [[Container]]
   */
  const particlesJS = (tagId, options) => {
    return engine.load(tagId, options);
  };
  /**
   * Loads the provided json with a GET request.
   * The content will be used to create a [[Container]] object.
   * @deprecated this method is obsolete, please use the new tsParticles.loadJSON
   * @param tagId the particles container element id
   * @param pathConfigJson the json path to use in the GET request
   * @param callback called after the [[Container]] is loaded and it will be passed as a parameter
   */


  particlesJS.load = (tagId, pathConfigJson, callback) => {
    engine.loadJSON(tagId, pathConfigJson).then(container => {
      if (container) {
        callback(container);
      }
    }).catch(() => {
      callback(undefined);
    });
  };
  /**
   * Adds a click handler to all the loaded [[Container]] objects.
   * @deprecated this method is obsolete, please use the new tsParticles.setOnClickHandler
   * @param callback the function called after the click event is fired
   */


  particlesJS.setOnClickHandler = callback => {
    engine.setOnClickHandler(callback);
  };
  /**
   * All the [[Container]] objects loaded
   * @deprecated this method is obsolete, please use the new [[tsParticles.dom]]
   */


  const pJSDom = engine.dom();
  return {
    particlesJS,
    pJSDom
  };
};


/******/ 	return __webpack_exports__;
/******/ })()
;
});