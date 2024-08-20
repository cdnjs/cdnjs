(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapePopper"] = factory();
	else
		root["cytoscapePopper"] = factory();
})(this, function() {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(5),
    getBoundingBox = _require.getBoundingBox;

// Create a popper virtual element (aka popper v1 reference object)
// https://popper.js.org/docs/v2/virtual-elements/


function getRef(target, opts) {

  //Define popper reference object and cy reference  object
  var refObject = {
    getBoundingClientRect: function getBoundingClientRect() {
      return getBoundingBox(target, opts);
    }
  };

  return refObject;
}

module.exports = { getRef: getRef };

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Simple, internal Object.assign() polyfill for options objects etc.

module.exports = Object.assign != null ? Object.assign.bind(Object) : function (tgt) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  srcs.forEach(function (src) {
    if (src !== null && src !== undefined) {
      Object.keys(src).forEach(function (k) {
        return tgt[k] = src[k];
      });
    }
  });

  return tgt;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    getRef = _require.getRef;

var _require2 = __webpack_require__(6),
    getContent = _require2.getContent;

// Create a new popper object for a core or element target


function getPopper(target, opts) {
  var refObject = getRef(target, opts);
  var content = getContent(target, opts.content);

  return target.popperFactory(refObject, content, opts.popper);
}

module.exports = { getPopper: getPopper };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(1);

var _require = __webpack_require__(2),
    getPopper = _require.getPopper;

var _require2 = __webpack_require__(0),
    getRef = _require2.getRef;

function popper(opts) {
  checkForWarning(this);

  return getPopper(this[0], createOptionsObject(this[0], opts));
}

function popperRef(opts) {
  checkForWarning(this);

  return getRef(this[0], createOptionsObject(this[0], opts));
}

function createOptionsObject(target, opts) {
  var renderedDimensions = function renderedDimensions(el) {
    return el.isNode() ? { w: el.renderedWidth(), h: el.renderedHeight() } : { w: 3, h: 3 };
  };
  var renderedPosition = function renderedPosition(el) {
    return el.isNode() ? getRenderedCenter(el, renderedDimensions) : getRenderedMidpoint(el);
  };
  var popper = {};
  var cy = target.cy();

  var defaults = { renderedDimensions: renderedDimensions, renderedPosition: renderedPosition, popper: popper, cy: cy };

  return assign({}, defaults, opts);
}

//Get the rendered center
function getRenderedCenter(target, renderedDimensions) {
  var pos = target.renderedPosition();
  var dimensions = renderedDimensions(target);
  var offsetX = dimensions.w / 2;
  var offsetY = dimensions.h / 2;

  return {
    x: pos.x - offsetX,
    y: pos.y - offsetY
  };
}

//Get the rendered position of the midpoint
function getRenderedMidpoint(target) {
  var p = target.midpoint();
  var pan = target.cy().pan();
  var zoom = target.cy().zoom();

  return {
    x: p.x * zoom + pan.x,
    y: p.y * zoom + pan.y
  };
}

//Warn user about misuse of the plugin
function checkForWarning(elements) {
  /* eslint-disable no-console */

  //Popper.js Should only be used on 1 element
  if (elements.length > 1) {
    console.warn("Popper.js Extension should only be used on one element.");
    console.warn("Ignoring all subsequent elements");
  }

  /* eslint-enable */
}

module.exports = { popper: popper, popperRef: popperRef };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(1);

var _require = __webpack_require__(2),
    getPopper = _require.getPopper;

var _require2 = __webpack_require__(0),
    getRef = _require2.getRef;

function popper(opts) {
  return getPopper(this, createOptionsObject(this, opts));
}

function popperRef(opts) {
  return getRef(this, createOptionsObject(this, opts));
}

//Create a options object with required default values
function createOptionsObject(target, opts) {
  var defaults = {
    boundingBox: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      w: 3,
      h: 3
    },
    renderedDimensions: function renderedDimensions() {
      return { w: 3, h: 3 };
    },
    renderedPosition: function renderedPosition() {
      return { x: 0, y: 0 };
    },
    popper: {},
    cy: target
  };

  return assign({}, defaults, opts);
}

module.exports = { popper: popper, popperRef: popperRef };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getBoundingBox(target, opts) {
  var renderedPosition = opts.renderedPosition,
      cy = opts.cy,
      renderedDimensions = opts.renderedDimensions;

  var offset = cy.container().getBoundingClientRect();
  var dims = renderedDimensions(target);
  var pos = renderedPosition(target);

  return {
    top: pos.y + offset.top,
    left: pos.x + offset.left,
    right: pos.x + dims.w + offset.left,
    bottom: pos.y + dims.h + offset.top,
    width: dims.w,
    height: dims.h
  };
}

module.exports = { getBoundingBox: getBoundingBox };

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getContent(target, content) {
  var contentObject = null;

  if (typeof content === "function") {
    //Execute function if user opted for a dyanamic target
    contentObject = content(target);
  } else if (content instanceof HTMLElement) {
    //Target option is an HTML element
    return content;
  } else {
    throw new Error("Can not create popper from 'target' with unknown type");
  }

  // Check validity of parsed target
  if (contentObject === null) {
    throw new Error("No 'target' specified to create popper");
  } else {
    return contentObject;
  }
}

module.exports = { getContent: getContent };

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreImpl = __webpack_require__(4);
var collectionImpl = __webpack_require__(3);

// registers the extension on a cytoscape lib ref
var registerFactory = function registerFactory(popperFactory) {
  if (typeof popperFactory !== "function") {
    throw new Error('Provide \'popperFactory\' before registering the module');
  }

  return function register(cytoscape) {
    if (!cytoscape) {
      return;
    } // can't register if cytoscape unspecified

    // register with cytoscape.js
    cytoscape('core', 'popperFactory', popperFactory); // Cytoscape Core factory
    cytoscape('collection', 'popperFactory', popperFactory); //Cytoscape Collections factory
    cytoscape('core', 'popper', coreImpl.popper); //Cytoscape Core
    cytoscape('collection', 'popper', collectionImpl.popper); //Cytoscape Collections
    cytoscape('core', 'popperRef', coreImpl.popperRef); //Cytoscape Core for References
    cytoscape('collection', 'popperRef', collectionImpl.popperRef); //Cytoscape Collections for References
  };
};

module.exports = registerFactory;

/***/ })
/******/ ]);
});