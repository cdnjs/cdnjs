/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 *
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 *
 * @version 3.12.4
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-selection"));
	else if(typeof define === 'function' && define.amd)
		define("bb", ["d3-selection"], factory);
	else if(typeof exports === 'object')
		exports["bb"] = factory(require("d3-selection"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["bubblecompare"] = factory(root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__1__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ BubbleCompare; }
});

// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(1);
;// CONCATENATED MODULE: ./src/Plugin/Plugin.ts
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Plugin {
  /**
   * Constructor
   * @param {Any} options config option object
   * @private
   */
  constructor(options = {}) {
    __publicField(this, "$$");
    __publicField(this, "options");
    this.options = options;
  }
  /**
   * Lifecycle hook for 'beforeInit' phase.
   * @private
   */
  $beforeInit() {
  }
  /**
   * Lifecycle hook for 'init' phase.
   * @private
   */
  $init() {
  }
  /**
   * Lifecycle hook for 'afterInit' phase.
   * @private
   */
  $afterInit() {
  }
  /**
   * Lifecycle hook for 'redraw' phase.
   * @private
   */
  $redraw() {
  }
  /**
   * Lifecycle hook for 'willDestroy' phase.
   * @private
   */
  $willDestroy() {
    Object.keys(this).forEach((key) => {
      this[key] = null;
      delete this[key];
    });
  }
}
__publicField(Plugin, "version", "3.12.4");

;// CONCATENATED MODULE: ./src/Plugin/bubblecompare/index.ts
var bubblecompare_defProp = Object.defineProperty;
var bubblecompare_defNormalProp = (obj, key, value) => key in obj ? bubblecompare_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var bubblecompare_publicField = (obj, key, value) => {
  bubblecompare_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};


const _BubbleCompare = class _BubbleCompare extends Plugin {
  constructor(options) {
    super(options);
    bubblecompare_publicField(this, "$$");
    return this;
  }
  $init() {
    const { $$ } = this;
    $$.findClosest = this.findClosest.bind(this);
    $$.getBubbleR = this.getBubbleR.bind(this);
    $$.pointExpandedR = this.pointExpandedR.bind(this);
  }
  pointExpandedR(d) {
    const baseR = this.getBubbleR(d);
    const { expandScale = 1 } = this.options;
    _BubbleCompare.raiseFocusedBubbleLayer(d);
    this.changeCursorPoint();
    return baseR * expandScale;
  }
  static raiseFocusedBubbleLayer(d) {
    d.raise && (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(d.node().parentNode.parentNode).raise();
  }
  changeCursorPoint() {
    this.$$.$el.eventRect.style("cursor", "pointer");
  }
  findClosest(values, pos) {
    const { $$ } = this;
    return values.filter((v) => v && !$$.isBarType(v.id)).reduce((acc, cur) => {
      const d = $$.dist(cur, pos);
      return d < this.getBubbleR(cur) ? cur : acc;
    }, 0);
  }
  getBubbleR(d) {
    const { minR, maxR } = this.options;
    const curVal = this.getZData(d);
    if (!curVal)
      return minR;
    const [min, max] = this.$$.data.targets.reduce(
      ([accMin, accMax], cur) => {
        const val = this.getZData(cur.values[0]);
        return [Math.min(accMin, val), Math.max(accMax, val)];
      },
      [1e4, 0]
    );
    const size = min > 0 && max === min ? 0 : curVal / max;
    return Math.abs(size) * (maxR - minR) + minR;
  }
  getZData(d) {
    return this.$$.isBubbleZType(d) ? this.$$.getBubbleZData(d.value, "z") : d.value;
  }
};
bubblecompare_publicField(_BubbleCompare, "version", `0.0.1`);
let BubbleCompare = _BubbleCompare;


__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});