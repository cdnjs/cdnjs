(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Glamor"] = factory();
	else
		root["Glamor"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// returns a style object with a single concated prefixed value string

exports.default = function (property, value) {
  var replacer = arguments.length <= 2 || arguments[2] === undefined ? function (prefix, value) {
    return prefix + value;
  } : arguments[2];
  return _defineProperty({}, property, ['-webkit-', '-moz-', ''].map(function (prefix) {
    return replacer(prefix, value);
  }));
};

module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  if (Array.isArray(value)) value = value.join(',');

  return value.match(/-webkit-|-moz-|-ms-/) !== null;
};

module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fbjs_lib_camelizeStyleName__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fbjs_lib_camelizeStyleName___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fbjs_lib_camelizeStyleName__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dangerousStyleValue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fbjs_lib_hyphenateStyleName__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fbjs_lib_hyphenateStyleName___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_fbjs_lib_hyphenateStyleName__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_fbjs_lib_memoizeStringOnly__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_fbjs_lib_memoizeStringOnly___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_fbjs_lib_memoizeStringOnly__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fbjs_lib_warning__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fbjs_lib_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_fbjs_lib_warning__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return processStyleName; });
/* harmony export (immutable) */ exports["b"] = createMarkupForStyles;
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSPropertyOperations
 */







var processStyleName = __WEBPACK_IMPORTED_MODULE_3_fbjs_lib_memoizeStringOnly___default()(__WEBPACK_IMPORTED_MODULE_2_fbjs_lib_hyphenateStyleName___default.a);

if (true) {
  var warnValidStyle;

  (function () {
    // 'msTransform' is correct, but the other prefixes should be capitalized
    var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

    // style values shouldn't contain a semicolon
    var badStyleValueWithSemicolonPattern = /;\s*$/;

    var warnedStyleNames = {};
    var warnedStyleValues = {};
    var warnedForNaNValue = false;

    var warnHyphenatedStyleName = function warnHyphenatedStyleName(name, owner) {
      if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
        return;
      }

      warnedStyleNames[name] = true;
       true ? __WEBPACK_IMPORTED_MODULE_4_fbjs_lib_warning___default()(false, 'Unsupported style property %s. Did you mean %s?%s', name, __WEBPACK_IMPORTED_MODULE_0_fbjs_lib_camelizeStyleName___default()(name), checkRenderMessage(owner)) : void 0;
    };

    var warnBadVendoredStyleName = function warnBadVendoredStyleName(name, owner) {
      if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
        return;
      }

      warnedStyleNames[name] = true;
       true ? __WEBPACK_IMPORTED_MODULE_4_fbjs_lib_warning___default()(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), checkRenderMessage(owner)) : void 0;
    };

    var warnStyleValueWithSemicolon = function warnStyleValueWithSemicolon(name, value, owner) {
      if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
        return;
      }

      warnedStyleValues[value] = true;
       true ? __WEBPACK_IMPORTED_MODULE_4_fbjs_lib_warning___default()(false, 'Style property values shouldn\'t contain a semicolon.%s ' + 'Try "%s: %s" instead.', checkRenderMessage(owner), name, value.replace(badStyleValueWithSemicolonPattern, '')) : void 0;
    };

    var warnStyleValueIsNaN = function warnStyleValueIsNaN(name, value, owner) {
      if (warnedForNaNValue) {
        return;
      }

      warnedForNaNValue = true;
       true ? __WEBPACK_IMPORTED_MODULE_4_fbjs_lib_warning___default()(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner)) : void 0;
    };

    var checkRenderMessage = function checkRenderMessage(owner) {
      if (owner) {
        var name = owner.getName();
        if (name) {
          return ' Check the render method of `' + name + '`.';
        }
      }
      return '';
    };

    /**
     * @param {string} name
     * @param {*} value
     * @param {ReactDOMComponent} component
     */

    warnValidStyle = function warnValidStyle(name, value, component) {
      //eslint-disable-line no-var
      var owner = void 0;
      if (component) {
        owner = component._currentElement._owner;
      }
      if (name.indexOf('-') > -1) {
        warnHyphenatedStyleName(name, owner);
      } else if (badVendoredStyleNamePattern.test(name)) {
        warnBadVendoredStyleName(name, owner);
      } else if (badStyleValueWithSemicolonPattern.test(value)) {
        warnStyleValueWithSemicolon(name, value, owner);
      }

      if (typeof value === 'number' && isNaN(value)) {
        warnStyleValueIsNaN(name, value, owner);
      }
    };
  })();
}

/**
   * Serializes a mapping of style properties for use as inline styles:
   *
   *   > createMarkupForStyles({width: '200px', height: 0})
   *   "width:200px;height:0;"
   *
   * Undefined values are ignored so that declarative programming is easier.
   * The result should be HTML-escaped before insertion into the DOM.
   *
   * @param {object} styles
   * @param {ReactDOMComponent} component
   * @return {?string}
   */

function createMarkupForStyles(styles, component) {
  var serialized = '';
  for (var styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }
    var styleValue = styles[styleName];
    if (true) {
      warnValidStyle(styleName, styleValue, component);
    }
    if (styleValue != null) {
      serialized += processStyleName(styleName) + ':';
      serialized += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__dangerousStyleValue__["a" /* default */])(styleName, styleValue, component) + ';';
    }
  }
  return serialized || null;
}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyFunction = __webpack_require__(14);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (true) {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;

/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = { "Webkit": { "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "backfaceVisibility": true, "perspective": true, "perspectiveOrigin": true, "transformStyle": true, "transformOriginZ": true, "animation": true, "animationDelay": true, "animationDirection": true, "animationFillMode": true, "animationDuration": true, "animationIterationCount": true, "animationName": true, "animationPlayState": true, "animationTimingFunction": true, "appearance": true, "userSelect": true, "fontKerning": true, "textEmphasisPosition": true, "textEmphasis": true, "textEmphasisStyle": true, "textEmphasisColor": true, "boxDecorationBreak": true, "clipPath": true, "maskImage": true, "maskMode": true, "maskRepeat": true, "maskPosition": true, "maskClip": true, "maskOrigin": true, "maskSize": true, "maskComposite": true, "mask": true, "maskBorderSource": true, "maskBorderMode": true, "maskBorderSlice": true, "maskBorderWidth": true, "maskBorderOutset": true, "maskBorderRepeat": true, "maskBorder": true, "maskType": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "filter": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true, "flex": true, "flexBasis": true, "flexDirection": true, "flexGrow": true, "flexFlow": true, "flexShrink": true, "flexWrap": true, "alignContent": true, "alignItems": true, "alignSelf": true, "justifyContent": true, "order": true, "transition": true, "transitionDelay": true, "transitionDuration": true, "transitionProperty": true, "transitionTimingFunction": true, "backdropFilter": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "shapeImageThreshold": true, "shapeImageMargin": true, "shapeImageOutside": true, "hyphens": true, "flowInto": true, "flowFrom": true, "regionFragment": true, "textSizeAdjust": true }, "Moz": { "appearance": true, "userSelect": true, "boxSizing": true, "textAlignLast": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "tabSize": true, "hyphens": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true }, "ms": { "flex": true, "flexBasis": false, "flexDirection": true, "flexGrow": false, "flexFlow": true, "flexShrink": false, "flexWrap": true, "alignContent": false, "alignItems": false, "alignSelf": false, "justifyContent": false, "order": false, "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "userSelect": true, "wrapFlow": true, "wrapThrough": true, "wrapMargin": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "touchAction": true, "hyphens": true, "flowInto": true, "flowFrom": true, "breakBefore": true, "breakAfter": true, "breakInside": true, "regionFragment": true, "gridTemplateColumns": true, "gridTemplateRows": true, "gridTemplateAreas": true, "gridTemplate": true, "gridAutoColumns": true, "gridAutoRows": true, "gridAutoFlow": true, "grid": true, "gridRowStart": true, "gridColumnStart": true, "gridRowEnd": true, "gridRow": true, "gridColumn": true, "gridColumnEnd": true, "gridColumnGap": true, "gridRowGap": true, "gridArea": true, "gridGap": true, "textSizeAdjust": true } };
module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// helper to capitalize strings

exports.default = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = clean;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Returns true for null, false, undefined and {}
function isFalsy(value) {
  return value === null || value === undefined || value === false || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && Object.keys(value).length === 0;
}

function cleanObject(object) {
  if (isFalsy(object)) return null;
  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') return object;

  var acc = {},
      keys = Object.keys(object),
      hasFalsy = false;
  for (var i = 0; i < keys.length; i++) {
    var value = object[keys[i]];
    var filteredValue = clean(value);
    if (filteredValue === null || filteredValue !== value) {
      hasFalsy = true;
    }
    if (filteredValue !== null) {
      acc[keys[i]] = filteredValue;
    }
  }
  return Object.keys(acc).length === 0 ? null : hasFalsy ? acc : object;
}

function cleanArray(rules) {
  var hasFalsy = false;
  var filtered = [];
  rules.forEach(function (rule) {
    var filteredRule = clean(rule);
    if (filteredRule === null || filteredRule !== rule) {
      hasFalsy = true;
    }
    if (filteredRule !== null) {
      filtered.push(filteredRule);
    }
  });
  return filtered.length == 0 ? null : hasFalsy ? filtered : rules;
}

// Takes style array or object provided by user and clears all the falsy data 
// If there is no styles left after filtration returns null
function clean(input) {
  return Array.isArray(input) ? cleanArray(input) : cleanObject(input);
}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = doHash;
// murmurhash2 via https://gist.github.com/raycmorgan/588423

function doHash(str, seed) {
  var m = 0x5bd1e995;
  var r = 24;
  var h = seed ^ str.length;
  var length = str.length;
  var currentIndex = 0;

  while (length >= 4) {
    var k = UInt32(str, currentIndex);

    k = Umul32(k, m);
    k ^= k >>> r;
    k = Umul32(k, m);

    h = Umul32(h, m);
    h ^= k;

    currentIndex += 4;
    length -= 4;
  }

  switch (length) {
    case 3:
      h ^= UInt16(str, currentIndex);
      h ^= str.charCodeAt(currentIndex + 2) << 16;
      h = Umul32(h, m);
      break;

    case 2:
      h ^= UInt16(str, currentIndex);
      h = Umul32(h, m);
      break;

    case 1:
      h ^= str.charCodeAt(currentIndex);
      h = Umul32(h, m);
      break;
  }

  h ^= h >>> 13;
  h = Umul32(h, m);
  h ^= h >>> 15;

  return h >>> 0;
}

function UInt32(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24);
}

function UInt16(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
}

function Umul32(n, m) {
  n = n | 0;
  m = m | 0;
  var nlo = n & 0xffff;
  var nhi = n >>> 16;
  var res = nlo * m + ((nhi * m & 0xffff) << 16) | 0;
  return res;
}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CSSPropertyOperations__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inline_style_prefixer_static__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inline_style_prefixer_static___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_inline_style_prefixer_static__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PluginSet; });
/* harmony export (immutable) */ exports["d"] = fallbacks;
/* harmony export (immutable) */ exports["b"] = prefixes;
/* harmony export (immutable) */ exports["c"] = positionSticky;
/* unused harmony export bug20fix */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isDev = function (x) {
  return x === 'development' || !x;
}("development");

var PluginSet = function () {
  function PluginSet() {
    _classCallCheck(this, PluginSet);

    for (var _len = arguments.length, initial = Array(_len), _key = 0; _key < _len; _key++) {
      initial[_key] = arguments[_key];
    }

    this.fns = initial || [];
  }

  _createClass(PluginSet, [{
    key: 'add',
    value: function add() {
      var _this = this;

      for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        fns[_key2] = arguments[_key2];
      }

      fns.forEach(function (fn) {
        if (_this.fns.indexOf(fn) >= 0) {
          if (isDev) {
            console.warn('adding the same plugin again, ignoring'); //eslint-disable-line no-console
          }
        } else {
          _this.fns = [fn].concat(_toConsumableArray(_this.fns));
        }
      });
    }
  }, {
    key: 'remove',
    value: function remove(fn) {
      this.fns = this.fns.filter(function (x) {
        return x !== fn;
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.fns = [];
    }
  }, {
    key: 'transform',
    value: function transform(o) {
      return this.fns.reduce(function (o, fn) {
        return fn(o);
      }, o);
    }
  }]);

  return PluginSet;
}();



function fallbacks(node) {
  var hasArray = Object.keys(node.style).map(function (x) {
    return Array.isArray(node.style[x]);
  }).indexOf(true) >= 0;
  if (hasArray) {
    var _ret = function () {
      var style = node.style,
          rest = _objectWithoutProperties(node, ['style']);

      var flattened = Object.keys(style).reduce(function (o, key) {
        o[key] = Array.isArray(style[key]) ? style[key].join('; ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__CSSPropertyOperations__["a" /* processStyleName */])(key) + ': ') : style[key];
        return o;
      }, {});
      // todo - 
      // flatten arrays which haven't been flattened yet 
      return {
        v: _extends({ style: flattened }, rest)
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
  return node;
}



function prefixes(_ref) {
  var style = _ref.style,
      rest = _objectWithoutProperties(_ref, ['style']);

  return _extends({ style: __WEBPACK_IMPORTED_MODULE_1_inline_style_prefixer_static___default()(style) }, rest);
}

function positionSticky(node) {
  if (node.style.position === 'sticky') {
    var style = node.style,
        rest = _objectWithoutProperties(node, ['style']);

    return _extends({
      style: _extends({}, style, {
        position: ['sticky', '-webkit-sticky']
      })
    }, rest);
  }
  return node;
}

function bug20fix(_ref2) {
  var selector = _ref2.selector,
      style = _ref2.style;

  // https://github.com/threepointone/glamor/issues/20
  // todo - only on chrome versions and server side   
  return { selector: selector.replace(/\:hover/g, ':hover:nth-child(n)'), style: style };
}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return StyleSheet; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 

high performance StyleSheet for css-in-js systems 

- uses multiple style tags behind the scenes for millions of rules 
- uses `insertRule` for appending in production for *much* faster performance
- 'polyfills' on server side 


// usage

import StyleSheet from 'glamor/lib/sheet'
let styleSheet = new StyleSheet()

styleSheet.inject() 
- 'injects' the stylesheet into the page (or into memory if on server)

styleSheet.insert('#box { border: 1px solid red; }') 
- appends a css rule into the stylesheet 

styleSheet.flush() 
- empties the stylesheet of all its contents


*/

function last(arr) {
  return arr[arr.length - 1];
}

function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }

  // this weirdness brought to you by firefox 
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}

var isBrowser = typeof window !== 'undefined';
var isDev = "development" === 'development' || !"development"; //(x => (x === 'development') || !x)(process.env.NODE_ENV)
var isTest = "development" === 'test';

var oldIE = function () {
  if (isBrowser) {
    var div = document.createElement('div');
    div.innerHTML = '<!--[if lt IE 10]><i></i><![endif]-->';
    return div.getElementsByTagName('i').length === 1;
  }
}();

function makeStyleTag() {
  var tag = document.createElement('style');
  tag.type = 'text/css';
  tag.appendChild(document.createTextNode(''));
  (document.head || document.getElementsByTagName('head')[0]).appendChild(tag);
  return tag;
}

var StyleSheet = function () {
  function StyleSheet() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$speedy = _ref.speedy,
        speedy = _ref$speedy === undefined ? !isDev && !isTest : _ref$speedy,
        _ref$maxLength = _ref.maxLength,
        maxLength = _ref$maxLength === undefined ? isBrowser && oldIE ? 4000 : 65000 : _ref$maxLength;

    _classCallCheck(this, StyleSheet);

    this.isSpeedy = speedy; // the big drawback here is that the css won't be editable in devtools
    this.sheet = undefined;
    this.tags = [];
    this.maxLength = maxLength;
    this.ctr = 0;
  }

  _createClass(StyleSheet, [{
    key: 'getSheet',
    value: function getSheet() {
      return sheetForTag(last(this.tags));
    }
  }, {
    key: 'inject',
    value: function inject() {
      var _this = this;

      if (this.injected) {
        throw new Error('already injected stylesheet!');
      }
      if (isBrowser) {
        this.tags[0] = makeStyleTag();
      } else {
        // server side 'polyfill'. just enough behavior to be useful.
        this.sheet = {
          cssRules: [],
          insertRule: function insertRule(rule) {
            // enough 'spec compliance' to be able to extract the rules later  
            // in other words, just the cssText field 
            _this.sheet.cssRules.push({ cssText: rule });
          }
        };
      }
      this.injected = true;
    }
  }, {
    key: 'speedy',
    value: function speedy(bool) {
      if (this.ctr !== 0) {
        throw new Error('cannot change speedy mode after inserting any rule to sheet. Either call speedy(' + bool + ') earlier in your app, or call flush() before speedy(' + bool + ')');
      }
      this.isSpeedy = !!bool;
    }
  }, {
    key: '_insert',
    value: function _insert(rule) {
      // this weirdness for perf, and chrome's weird bug 
      // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
      try {
        var sheet = this.getSheet();
        sheet.insertRule(rule, sheet.cssRules.length); // todo - correct index here     
      } catch (e) {
        if (isDev) {
          // might need beter dx for this 
          console.warn('whoops, illegal rule inserted', rule); //eslint-disable-line no-console
        }
      }
    }
  }, {
    key: 'insert',
    value: function insert(rule) {

      if (isBrowser) {
        // this is the ultrafast version, works across browsers 
        if (this.isSpeedy && this.getSheet().insertRule) {
          this._insert(rule);
        }
        // more browser weirdness. I don't even know    
        // else if(this.tags.length > 0 && this.tags::last().styleSheet) {      
        //   this.tags::last().styleSheet.cssText+= rule
        // }
        else {
            last(this.tags).appendChild(document.createTextNode(rule));
          }
      } else {
        // server side is pretty simple         
        this.sheet.insertRule(rule);
      }

      this.ctr++;
      if (isBrowser && this.ctr % this.maxLength === 0) {
        this.tags.push(makeStyleTag());
      }
      return this.ctr - 1;
    }
    // commenting this out till we decide on v3's decision 
    // _replace(index, rule) {
    //   // this weirdness for perf, and chrome's weird bug 
    //   // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
    //   try {  
    //     let sheet = this.getSheet()        
    //     sheet.deleteRule(index) // todo - correct index here     
    //     sheet.insertRule(rule, index)
    //   }
    //   catch(e) {
    //     if(isDev) {
    //       // might need beter dx for this 
    //       console.warn('whoops, problem replacing rule', rule) //eslint-disable-line no-console
    //     }          
    //   }          

    // }
    // replace(index, rule) {
    //   if(isBrowser) {
    //     if(this.isSpeedy && this.getSheet().insertRule) {
    //       this._replace(index, rule)
    //     }
    //     else {
    //       let _slot = Math.floor((index  + this.maxLength) / this.maxLength) - 1        
    //       let _index = (index % this.maxLength) + 1
    //       let tag = this.tags[_slot]
    //       tag.replaceChild(document.createTextNode(rule), tag.childNodes[_index])
    //     }
    //   }
    //   else {
    //     let rules = this.sheet.cssRules
    //     this.sheet.cssRules = [ ...rules.slice(0, index), { cssText: rule }, ...rules.slice(index + 1) ]
    //   }
    // }
    // delete(index) {
    //   // we insert a blank rule when 'deleting' so previously returned indexes remain stable
    //   return this.replace(index, '')
    // }

  }, {
    key: 'flush',
    value: function flush() {
      if (isBrowser) {
        this.tags.forEach(function (tag) {
          return tag.parentNode.removeChild(tag);
        });
        this.tags = [];
        this.sheet = null;
        this.ctr = 0;
        // todo - look for remnants in document.styleSheets
      } else {
        // simpler on server 
        this.sheet.cssRules = [];
      }
      this.injected = false;
    }
  }, {
    key: 'rules',
    value: function rules() {
      if (!isBrowser) {
        return this.sheet.cssRules;
      }
      var arr = [];
      this.tags.forEach(function (tag) {
        return arr.splice.apply(arr, [arr.length, 0].concat(_toConsumableArray(Array.from(sheetForTag(tag).cssRules))));
      });
      return arr;
    }
  }]);

  return StyleSheet;
}();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSProperty
 */

/**
 * CSS properties which accept numbers but are not in units of "px".
 */

var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */
var shorthandPropertyExpansions = {
  background: {
    backgroundAttachment: true,
    backgroundColor: true,
    backgroundImage: true,
    backgroundPositionX: true,
    backgroundPositionY: true,
    backgroundRepeat: true
  },
  backgroundPosition: {
    backgroundPositionX: true,
    backgroundPositionY: true
  },
  border: {
    borderWidth: true,
    borderStyle: true,
    borderColor: true
  },
  borderBottom: {
    borderBottomWidth: true,
    borderBottomStyle: true,
    borderBottomColor: true
  },
  borderLeft: {
    borderLeftWidth: true,
    borderLeftStyle: true,
    borderLeftColor: true
  },
  borderRight: {
    borderRightWidth: true,
    borderRightStyle: true,
    borderRightColor: true
  },
  borderTop: {
    borderTopWidth: true,
    borderTopStyle: true,
    borderTopColor: true
  },
  font: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    fontFamily: true
  },
  outline: {
    outlineWidth: true,
    outlineStyle: true,
    outlineColor: true
  }
};

var CSSProperty = {
  isUnitlessNumber: isUnitlessNumber,
  shorthandPropertyExpansions: shorthandPropertyExpansions
};

/* harmony default export */ exports["a"] = CSSProperty;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CSSProperty__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fbjs_lib_warning__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fbjs_lib_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fbjs_lib_warning__);
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule dangerousStyleValue
 */




var isUnitlessNumber = __WEBPACK_IMPORTED_MODULE_0__CSSProperty__["a" /* default */].isUnitlessNumber;
var styleWarnings = {};

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @param {ReactDOMComponent} component
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(name, value, component) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
    return '' + value; // cast to string
  }

  if (typeof value === 'string') {
    if (true) {
      // Allow '0' to pass through without warning. 0 is already special and
      // doesn't require units, so we don't need to warn about it.
      if (component && value !== '0') {
        var owner = component._currentElement._owner;
        var ownerName = owner ? owner.getName() : null;
        if (ownerName && !styleWarnings[ownerName]) {
          styleWarnings[ownerName] = {};
        }
        var warned = false;
        if (ownerName) {
          var warnings = styleWarnings[ownerName];
          warned = warnings[name];
          if (!warned) {
            warnings[name] = true;
          }
        }
        if (!warned) {
           true ? __WEBPACK_IMPORTED_MODULE_1_fbjs_lib_warning___default()(false, 'a `%s` tag (owner: `%s`) was passed a numeric string value ' + 'for CSS property `%s` (value: `%s`) which will be treated ' + 'as a unitless number in a future version of React.', component._currentElement.type, ownerName || 'unknown', name, value) : void 0;
        }
      }
    }
    value = value.trim();
  }
  return value + 'px';
}

/* harmony default export */ exports["a"] = dangerousStyleValue;

/***/ },
/* 12 */
/***/ function(module, exports) {

"use strict";
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

'use strict';

var camelize = __webpack_require__(12);

var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
}

module.exports = camelizeStyleName;

/***/ },
/* 14 */
/***/ function(module, exports) {

"use strict";
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ },
/* 15 */
/***/ function(module, exports) {

"use strict";
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

'use strict';

var hyphenate = __webpack_require__(15);

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

/***/ },
/* 17 */
/***/ function(module, exports) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @typechecks static-only
 */

'use strict';

/**
 * Memoizes the return value of a function that accepts one string argument.
 */

function memoizeStringOnly(callback) {
  var cache = {};
  return function (string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}

module.exports = memoizeStringOnly;

/***/ },
/* 18 */
/***/ function(module, exports) {

"use strict";
'use strict';

var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};

function hyphenateStyleName(string) {
    return string in cache
    ? cache[string]
    : cache[string] = string
      .replace(uppercasePattern, '-$&')
      .toLowerCase()
      .replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calc;

var _joinPrefixedValue = __webpack_require__(0);

var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

var _isPrefixedValue = __webpack_require__(1);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calc(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('calc(') > -1) {
    return (0, _joinPrefixedValue2.default)(property, value, function (prefix, value) {
      return value.replace(/calc\(/g, prefix + 'calc(');
    });
  }
}
module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;

var _joinPrefixedValue = __webpack_require__(0);

var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
};

function cursor(property, value) {
  if (property === 'cursor' && values[value]) {
    return (0, _joinPrefixedValue2.default)(property, value);
  }
}
module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;
var values = { flex: true, 'inline-flex': true };

function flex(property, value) {
  if (property === 'display' && values[value]) {
    return {
      display: ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value]
    };
  }
}
module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxIE;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end'
};
var alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msPreferredSize'
};

function flexboxIE(property, value) {
  if (alternativeProps[property]) {
    return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
  }
}
module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

function flexboxOld(property, value) {
  if (property === 'flexDirection' && typeof value === 'string') {
    return {
      WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
      WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
    };
  }
  if (alternativeProps[property]) {
    return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
  }
}
module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;

var _joinPrefixedValue = __webpack_require__(0);

var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

var _isPrefixedValue = __webpack_require__(1);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.match(values) !== null) {
    return (0, _joinPrefixedValue2.default)(property, value);
  }
}
module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;

var _joinPrefixedValue = __webpack_require__(0);

var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties[property] && values[value]) {
    return (0, _joinPrefixedValue2.default)(property, value);
  }
}
module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;

var _hyphenateStyleName = __webpack_require__(18);

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

var _capitalizeString = __webpack_require__(5);

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

var _isPrefixedValue = __webpack_require__(1);

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

var _prefixProps = __webpack_require__(4);

var _prefixProps2 = _interopRequireDefault(_prefixProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true
};

function transition(property, value) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties[property]) {
    var _ref2;

    var outputValue = prefixValue(value);
    var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (value) {
      return value.match(/-moz-|-ms-/) === null;
    }).join(',');

    // if the property is already prefixed
    if (property.indexOf('Webkit') > -1) {
      return _defineProperty({}, property, webkitOutput);
    }

    return _ref2 = {}, _defineProperty(_ref2, 'Webkit' + (0, _capitalizeString2.default)(property), webkitOutput), _defineProperty(_ref2, property, outputValue), _ref2;
  }
}

function prefixValue(value) {
  if ((0, _isPrefixedValue2.default)(value)) {
    return value;
  }

  // only split multi values, not cubic beziers
  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

  // iterate each single value and check for transitioned properties
  // that need to be prefixed as well
  multipleValues.forEach(function (val, index) {
    multipleValues[index] = Object.keys(_prefixProps2.default).reduce(function (out, prefix) {
      var dashCasePrefix = '-' + prefix.toLowerCase() + '-';

      Object.keys(_prefixProps2.default[prefix]).forEach(function (prop) {
        var dashCaseProperty = (0, _hyphenateStyleName2.default)(prop);

        if (val.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
          // join all prefixes and create a new value
          out = val.replace(dashCaseProperty, dashCasePrefix + dashCaseProperty) + ',' + out;
        }
      });
      return out;
    }, val);
  });

  return multipleValues.join(',');
}
module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixAll;

var _prefixProps = __webpack_require__(4);

var _prefixProps2 = _interopRequireDefault(_prefixProps);

var _capitalizeString = __webpack_require__(5);

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

var _calc = __webpack_require__(19);

var _calc2 = _interopRequireDefault(_calc);

var _cursor = __webpack_require__(20);

var _cursor2 = _interopRequireDefault(_cursor);

var _flex = __webpack_require__(21);

var _flex2 = _interopRequireDefault(_flex);

var _sizing = __webpack_require__(25);

var _sizing2 = _interopRequireDefault(_sizing);

var _gradient = __webpack_require__(24);

var _gradient2 = _interopRequireDefault(_gradient);

var _transition = __webpack_require__(26);

var _transition2 = _interopRequireDefault(_transition);

var _flexboxIE = __webpack_require__(22);

var _flexboxIE2 = _interopRequireDefault(_flexboxIE);

var _flexboxOld = __webpack_require__(23);

var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// special flexbox specifications


var plugins = [_calc2.default, _cursor2.default, _sizing2.default, _gradient2.default, _transition2.default, _flexboxIE2.default, _flexboxOld2.default, _flex2.default];

/**
 * Returns a prefixed version of the style object using all vendor prefixes
 * @param {Object} styles - Style object that gets prefixed properties added
 * @returns {Object} - Style object with prefixed properties and values
 */
function prefixAll(styles) {
  Object.keys(styles).forEach(function (property) {
    var value = styles[property];
    if (value instanceof Object && !Array.isArray(value)) {
      // recurse through nested style objects
      styles[property] = prefixAll(value);
    } else {
      Object.keys(_prefixProps2.default).forEach(function (prefix) {
        var properties = _prefixProps2.default[prefix];
        // add prefixes if needed
        if (properties[property]) {
          styles[prefix + (0, _capitalizeString2.default)(property)] = value;
        }
      });
    }
  });

  Object.keys(styles).forEach(function (property) {
    [].concat(styles[property]).forEach(function (value, index) {
      // resolve every special plugins
      plugins.forEach(function (plugin) {
        return assignStyles(styles, plugin(property, value));
      });
    });
  });

  return styles;
}

function assignStyles(base) {
  var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  Object.keys(extend).forEach(function (property) {
    var baseValue = base[property];
    if (Array.isArray(baseValue)) {
      [].concat(extend[property]).forEach(function (value) {
        var valueIndex = baseValue.indexOf(value);
        if (valueIndex > -1) {
          base[property].splice(valueIndex, 1);
        }
        base[property].push(value);
      });
    } else {
      base[property] = extend[property];
    }
  });
}
module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(27)


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sheet_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CSSPropertyOperations__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__clean_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__hash__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(exports, "styleSheet", function() { return styleSheet; });
/* harmony export (immutable) */ exports["speedy"] = speedy;
/* harmony export (binding) */ __webpack_require__.d(exports, "plugins", function() { return plugins; });
/* harmony export (immutable) */ exports["simulations"] = simulations;
/* harmony export (immutable) */ exports["simulate"] = simulate;
/* harmony export (immutable) */ exports["cssLabels"] = cssLabels;
/* harmony export (immutable) */ exports["isLikeRule"] = isLikeRule;
/* harmony export (immutable) */ exports["idFor"] = idFor;
/* harmony export (immutable) */ exports["insertRule"] = insertRule;
/* harmony export (immutable) */ exports["insertGlobal"] = insertGlobal;
/* harmony export (immutable) */ exports["rehydrate"] = rehydrate;
/* harmony export (immutable) */ exports["flush"] = flush;
/* harmony export (immutable) */ exports["style"] = style;
/* harmony export (immutable) */ exports["select"] = select;
/* harmony export (binding) */ __webpack_require__.d(exports, "$", function() { return $; });
/* harmony export (immutable) */ exports["parent"] = parent;
/* harmony export (immutable) */ exports["merge"] = merge;
/* harmony export (binding) */ __webpack_require__.d(exports, "compose", function() { return compose; });
/* harmony export (immutable) */ exports["media"] = media;
/* harmony export (binding) */ __webpack_require__.d(exports, "presets", function() { return presets; });
/* harmony export (immutable) */ exports["trackMediaQueryLabels"] = trackMediaQueryLabels;
/* harmony export (immutable) */ exports["pseudo"] = pseudo;
/* harmony export (immutable) */ exports["active"] = active;
/* harmony export (immutable) */ exports["any"] = any;
/* harmony export (immutable) */ exports["checked"] = checked;
/* harmony export (immutable) */ exports["disabled"] = disabled;
/* harmony export (immutable) */ exports["empty"] = empty;
/* harmony export (immutable) */ exports["enabled"] = enabled;
/* harmony export (immutable) */ exports["_default"] = _default;
/* harmony export (immutable) */ exports["first"] = first;
/* harmony export (immutable) */ exports["firstChild"] = firstChild;
/* harmony export (immutable) */ exports["firstOfType"] = firstOfType;
/* harmony export (immutable) */ exports["fullscreen"] = fullscreen;
/* harmony export (immutable) */ exports["focus"] = focus;
/* harmony export (immutable) */ exports["hover"] = hover;
/* harmony export (immutable) */ exports["indeterminate"] = indeterminate;
/* harmony export (immutable) */ exports["inRange"] = inRange;
/* harmony export (immutable) */ exports["invalid"] = invalid;
/* harmony export (immutable) */ exports["lastChild"] = lastChild;
/* harmony export (immutable) */ exports["lastOfType"] = lastOfType;
/* harmony export (immutable) */ exports["left"] = left;
/* harmony export (immutable) */ exports["link"] = link;
/* harmony export (immutable) */ exports["onlyChild"] = onlyChild;
/* harmony export (immutable) */ exports["onlyOfType"] = onlyOfType;
/* harmony export (immutable) */ exports["optional"] = optional;
/* harmony export (immutable) */ exports["outOfRange"] = outOfRange;
/* harmony export (immutable) */ exports["readOnly"] = readOnly;
/* harmony export (immutable) */ exports["readWrite"] = readWrite;
/* harmony export (immutable) */ exports["required"] = required;
/* harmony export (immutable) */ exports["right"] = right;
/* harmony export (immutable) */ exports["root"] = root;
/* harmony export (immutable) */ exports["scope"] = scope;
/* harmony export (immutable) */ exports["target"] = target;
/* harmony export (immutable) */ exports["valid"] = valid;
/* harmony export (immutable) */ exports["visited"] = visited;
/* harmony export (immutable) */ exports["dir"] = dir;
/* harmony export (immutable) */ exports["lang"] = lang;
/* harmony export (immutable) */ exports["not"] = not;
/* harmony export (immutable) */ exports["nthChild"] = nthChild;
/* harmony export (immutable) */ exports["nthLastChild"] = nthLastChild;
/* harmony export (immutable) */ exports["nthLastOfType"] = nthLastOfType;
/* harmony export (immutable) */ exports["nthOfType"] = nthOfType;
/* harmony export (immutable) */ exports["after"] = after;
/* harmony export (immutable) */ exports["before"] = before;
/* harmony export (immutable) */ exports["firstLetter"] = firstLetter;
/* harmony export (immutable) */ exports["firstLine"] = firstLine;
/* harmony export (immutable) */ exports["selection"] = selection;
/* harmony export (immutable) */ exports["backdrop"] = backdrop;
/* harmony export (immutable) */ exports["placeholder"] = placeholder;
/* harmony export (immutable) */ exports["keyframes"] = keyframes;
/* harmony export (immutable) */ exports["fontFace"] = fontFace;
/* harmony export (immutable) */ exports["cssFor"] = cssFor;
/* harmony export (immutable) */ exports["attribsFor"] = attribsFor;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**** stylesheet  ****/





var styleSheet = new __WEBPACK_IMPORTED_MODULE_0__sheet_js__["a" /* StyleSheet */]();
// an isomorphic StyleSheet shim. hides all the nitty gritty.

// /**************** LIFTOFF IN 3... 2... 1... ****************/
styleSheet.inject(); //eslint-disable-line indent
// /****************      TO THE MOOOOOOON     ****************/

// convenience function to toggle speedy
function speedy(bool) {
  return styleSheet.speedy(bool);
}

// plugins
 // we include these by default
var plugins = styleSheet.plugins = new __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* PluginSet */](__WEBPACK_IMPORTED_MODULE_3__plugins__["b" /* prefixes */], __WEBPACK_IMPORTED_MODULE_3__plugins__["c" /* positionSticky */], __WEBPACK_IMPORTED_MODULE_3__plugins__["d" /* fallbacks */]);
plugins.media = new __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* PluginSet */](); // neat! media, font-face, keyframes
plugins.fontFace = new __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* PluginSet */]();
plugins.keyframes = new __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* PluginSet */](__WEBPACK_IMPORTED_MODULE_3__plugins__["b" /* prefixes */]);

// define some constants
var isBrowser = typeof window !== 'undefined';
var isDev = "development" === 'development' || !"development";
var isTest = "development" === 'test';

/**** simulations  ****/

// a flag to enable simulation meta tags on dom nodes
// defaults to true in dev mode. recommend *not* to
// toggle often.
var canSimulate = isDev;

// we use these flags for issuing warnings when simulate is called
// in prod / in incorrect order
var warned1 = false,
    warned2 = false;

// toggles simulation activity. shouldn't be needed in most cases
function simulations() {
  var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  canSimulate = !!bool;
}

// use this on dom nodes to 'simulate' pseudoclasses
// <div {...hover({ color: 'red' })} {...simulate('hover', 'visited')}>...</div>
// you can even send in some weird ones, as long as it's in simple format
// and matches an existing rule on the element
// eg simulate('nthChild2', ':hover:active') etc
function simulate() {
  for (var _len = arguments.length, pseudos = Array(_len), _key = 0; _key < _len; _key++) {
    pseudos[_key] = arguments[_key];
  }

  pseudos = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__clean_js__["a" /* default */])(pseudos);
  if (!pseudos) return {};
  if (!canSimulate) {
    if (!warned1) {
      console.warn('can\'t simulate without once calling simulations(true)'); //eslint-disable-line no-console
      warned1 = true;
    }
    if (!isDev && !isTest && !warned2) {
      console.warn('don\'t use simulation outside dev'); //eslint-disable-line no-console
      warned2 = true;
    }
    return {};
  }
  return pseudos.reduce(function (o, p) {
    return o['data-simulate-' + simple(p)] = '', o;
  }, {});
}

/**** labels ****/
// toggle for debug labels.
// *shouldn't* have to mess with this manually
var hasLabels = isDev;

function cssLabels(bool) {
  hasLabels = !!bool;
}

// takes a string, converts to lowercase, strips out nonalphanumeric.
function simple(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// flatten a nested array
function flatten(inArr) {
  var arr = [];
  for (var i = 0; i < inArr.length; i++) {
    if (Array.isArray(inArr[i])) arr = arr.concat(flatten(inArr[i]));else arr = arr.concat(inArr[i]);
  }
  return arr;
}

// hashes a string to something 'unique'
// we use this to generate ids for styles


function hashify() {
  for (var _len2 = arguments.length, objs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    objs[_key2] = arguments[_key2];
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__hash__["a" /* default */])(objs.map(function (x) {
    return JSON.stringify(x);
  }).join('')).toString(36);
}

// of shape { 'data-css-<id>': ''}
function isLikeRule(rule) {
  var keys = Object.keys(rule).filter(function (x) {
    return x !== 'toString';
  });
  if (keys.length !== 1) {
    return false;
  }
  return !!/data\-css\-([a-zA-Z0-9]+)/.exec(keys[0]);
}

// extracts id from a { 'data-css-<id>': ''} like object
function idFor(rule) {
  var keys = Object.keys(rule).filter(function (x) {
    return x !== 'toString';
  });
  if (keys.length !== 1) throw new Error('not a rule');
  var regex = /data\-css\-([a-zA-Z0-9]+)/;
  var match = regex.exec(keys[0]);
  if (!match) throw new Error('not a rule');
  return match[1];
}

// a simple cache to store generated rules
var registered = styleSheet.registered = {};
function register(spec) {
  if (!registered[spec.id]) {
    registered[spec.id] = spec;
  }
}

// semi-deeply merge 2 'mega' style objects
function deepMergeStyles(dest, src) {
  Object.keys(src).forEach(function (expr) {
    dest[expr] = dest[expr] || {};
    Object.keys(src[expr]).forEach(function (type) {
      dest[expr][type] = dest[expr][type] || {};
      Object.assign(dest[expr][type], src[expr][type]);
    });
  });
}

//todo - prevent nested media queries
function deconstruct(obj) {
  var ret = [],
      composesWith = void 0;
  var plain = {},
      hasPlain = false;
  var isSpecial = obj && find(Object.keys(obj), function (x) {
    return x.charAt(0) === ':' || // pseudos
    x.charAt(0) === '@' || // media queries; todo - check @media
    x.indexOf('&') >= 0 || // 'selects'
    x === 'composes';
  } // like css modules!
  );

  if (isSpecial) {
    Object.keys(obj).forEach(function (key) {
      if (key === 'composes') {
        composesWith = obj[key];
      } else if (key.charAt(0) === ':') {
        ret.push({
          type: 'pseudo',
          style: obj[key],
          selector: key
        });
      } else if (key.charAt(0) === '@') {
        ret.push({
          type: 'media',
          rules: deconstruct(obj[key]),
          expr: key.substring(6)
        });
      } else if (key.indexOf('&') >= 0 || _typeof(obj[key]) === 'object') {
        ret.push({
          type: 'select',
          style: Array.isArray(obj[key]) ? Object.assign.apply(Object, [{}].concat(_toConsumableArray(obj[key]))) : obj[key],
          selector: key
        });
      } else {
        hasPlain = true;
        plain[key] = obj[key];
      }
    });
    ret = hasPlain ? [plain].concat(_toConsumableArray(ret)) : ret;
    ret = composesWith ? [composesWith].concat(_toConsumableArray(ret)) : ret;
    return ret;
  }
  return obj;
}

function _getRegistered(rule) {
  if (isLikeRule(rule)) {
    var ret = registered[idFor(rule)];
    if (ret == null) {
      throw new Error('[glamor] an unexpected rule cache miss occurred. This is probably a sign of multiple glamor instances in your app. See https://github.com/threepointone/glamor/issues/79');
    }
    return ret;
  }
  return rule;
}

// extracts and composes styles from a rule into a 'mega' style
// with sub styles keyed by media query + 'path'
function extractStyles() {
  for (var _len3 = arguments.length, rules = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    rules[_key3] = arguments[_key3];
  }

  rules = flatten(rules);
  var exprs = {};
  // converts {[data-css-<id>]} to the backing rule

  rules = rules.map(_getRegistered).map(function (x) {
    return x.type === 'style' || !x.type ? deconstruct(x.style || x) : x;
  });

  rules = flatten(rules).map(_getRegistered); // sigh, this is to handle arrays in `composes`. must make better.

  rules.forEach(function (rule) {
    // avoid possible label. todo - cleaner
    if (typeof rule === 'string') {
      return;
    }
    switch (rule.type) {
      case 'raw':
        throw new Error('not implemented');
      case 'font-face':
        throw new Error('not implemented');
      case 'keyframes':
        throw new Error('not implemented');

      case 'merge':
        return deepMergeStyles(exprs, extractStyles(rule.rules));

      case 'pseudo':
        if (rule.selector === ':hover' && exprs._ && exprs._['%%%:active'] && !exprs._['%%%:hover']) {
          console.warn(':active must come after :hover to work correctly'); //eslint-disable-line no-console
        }
        return deepMergeStyles(exprs, { _: _defineProperty({}, '%%%' + rule.selector, rule.style) });
      case 'select':
        return deepMergeStyles(exprs, { _: _defineProperty({}, '^^^' + rule.selector, rule.style) });
      case 'parent':
        return deepMergeStyles(exprs, { _: _defineProperty({}, '***' + rule.selector, rule.style) });

      case 'style':
        return deepMergeStyles(exprs, { _: { _: rule.style } });

      case 'media':
        return deepMergeStyles(exprs, _defineProperty({}, rule.expr, extractStyles(rule.rules)._));

      default:
        return deepMergeStyles(exprs, { _: { _: rule } });
    }
  });
  return exprs;
}

// extract label from a rule / style
function extractLabel(rule) {
  if (isLikeRule(rule)) {
    rule = registered[idFor(rule)];
  }
  return rule.label || '{:}';
}

// given an id / 'path', generate a css selector
function selector(id, path) {
  if (path === '_') return '.css-' + id + ',[data-css-' + id + ']';

  if (path.indexOf('%%%') === 0) {
    var x = '.css-' + id + path.slice(3) + ',[data-css-' + id + ']' + path.slice(3);
    if (canSimulate) x += ',.css-' + id + '[data-simulate-' + simple(path) + '],[data-css-' + id + '][data-simulate-' + simple(path) + ']';
    return x;
  }

  if (path.indexOf('***') === 0) {
    return path.slice(3).split(',').map(function (x) {
      return x + ' .css-' + id + ',' + x + ' [data-css-' + id + ']';
    }).join(',');
  }
  if (path.indexOf('^^^') === 0) {
    return path.slice(3).split(',').map(function (x) {
      return x.indexOf('&') >= 0 ? [x.replace(/\&/mg, '.css-' + id), x.replace(/\&/mg, '[data-css-' + id + ']')].join(',') // todo - make sure each sub selector has an &
      : '.css-' + id + x + ',[data-css-' + id + ']' + x;
    }).join(',');
  }
}

function toCSS(_ref4) {
  var selector = _ref4.selector,
      style = _ref4.style;

  var result = plugins.transform({ selector: selector, style: style });
  return result.selector + '{' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__CSSPropertyOperations__["b" /* createMarkupForStyles */])(result.style) + '}';
}

function ruleToAst(rule) {
  var styles = extractStyles(rule);
  return Object.keys(styles).reduce(function (o, expr) {
    o[expr] = Object.keys(styles[expr]).map(function (s) {
      return { selector: selector(rule.id, s), style: styles[expr][s] };
    });
    return o;
  }, {});
}

function ruleToCSS(spec) {
  var css = [];
  var ast = ruleToAst(spec);
  // plugins here

  var _ = ast._,
      exprs = _objectWithoutProperties(ast, ['_']);

  if (_) {
    _.map(toCSS).forEach(function (str) {
      return css.push(str);
    });
  }
  Object.keys(exprs).forEach(function (expr) {
    css.push('@media ' + expr + '{' + exprs[expr].map(toCSS).join('') + '}');
  });
  return css;
}

// this cache to track which rules have
// been inserted into the stylesheet
var inserted = styleSheet.inserted = {};

// and helpers to insert rules into said styleSheet
function insert(spec) {
  if (!inserted[spec.id]) {
    inserted[spec.id] = true;
    ruleToCSS(spec).map(function (cssRule) {
      return styleSheet.insert(cssRule);
    });
  }
}

function insertRule(css) {
  var spec = {
    id: hashify(css),
    css: css,
    type: 'raw',
    label: '^'
  };
  register(spec);
  if (!inserted[spec.id]) {
    styleSheet.insert(spec.css);
    inserted[spec.id] = true;
  }
}

function insertGlobal(selector, style) {
  return insertRule(selector + '{' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__CSSPropertyOperations__["b" /* createMarkupForStyles */])(style) + '}');
}

function insertKeyframe(spec) {
  if (!inserted[spec.id]) {
    (function () {
      var inner = Object.keys(spec.keyframes).map(function (kf) {
        var result = plugins.keyframes.transform({ id: spec.id, name: kf, style: spec.keyframes[kf] });
        return result.name + '{' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__CSSPropertyOperations__["b" /* createMarkupForStyles */])(result.style) + '}';
      }).join('');

      ['-webkit-', '-moz-', '-o-', ''].forEach(function (prefix) {
        return styleSheet.insert('@' + prefix + 'keyframes ' + (spec.name + '_' + spec.id) + '{' + inner + '}');
      });

      inserted[spec.id] = true;
    })();
  }
}

function insertFontFace(spec) {
  if (!inserted[spec.id]) {
    styleSheet.insert('@font-face{' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__CSSPropertyOperations__["b" /* createMarkupForStyles */])(spec.font) + '}');
    inserted[spec.id] = true;
  }
}

// rehydrate the insertion cache with ids sent from
// renderStatic / renderStaticOptimized
function rehydrate(ids) {
  // load up ids
  Object.assign(inserted, ids.reduce(function (o, i) {
    return o[i] = true, o;
  }, {}));
  // assume css loaded separately
}

// todo - perf
var ruleCache = {};
function toRule(spec) {
  register(spec);
  insert(spec);
  if (ruleCache[spec.id]) {
    return ruleCache[spec.id];
  }

  var ret = _defineProperty({}, 'data-css-' + spec.id, hasLabels ? spec.label || '' : '');
  Object.defineProperty(ret, 'toString', {
    enumerable: false, value: function value() {
      return 'css-' + spec.id;
    }
  });
  ruleCache[spec.id] = ret;
  return ret;
}

// clears out the cache and empties the stylesheet
// best for tests, though there might be some value for SSR.

function flush() {
  inserted = styleSheet.inserted = {};
  registered = styleSheet.registered = {};
  ruleCache = {};
  styleSheet.flush();
  styleSheet.inject();
}

function find(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    if (fn(arr[i]) === true) {
      return true;
    }
  }
  return false;
}

function style(obj) {
  obj = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__clean_js__["a" /* default */])(obj);

  return obj ? toRule({
    id: hashify(obj),
    type: 'style',
    style: obj,
    label: obj.label || '*'
  }) : {};
}

// unique feature
// when you need to define 'real' css (whatever that may be)
// https://twitter.com/threepointone/status/756585907877273600
// https://twitter.com/threepointone/status/756986938033254400
function select(selector, obj) {
  if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
    return style(selector);
  }
  obj = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__clean_js__["a" /* default */])(obj);

  return obj ? toRule({
    id: hashify(selector, obj),
    type: 'select',
    selector: selector,
    style: obj,
    label: obj.label || '*'
  }) : {};
}

var $ = select; // bringin' jquery back

function parent(selector, obj) {
  obj = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__clean_js__["a" /* default */])(obj);
  return obj ? toRule({
    id: hashify(selector, obj),
    type: 'parent',
    selector: selector,
    style: obj,
    label: obj.label || '*'
  }) : {};
}

// we define a function to 'merge' styles together.
// backstory - because of a browser quirk, multiple styles are applied in the order they're
// defined in the stylesheet, not in the order of application
// in most cases, this won't case an issue UNTIL IT DOES
// instead, use merge() to merge styles,
// with latter styles gaining precedence over former ones

function merge() {
  for (var _len4 = arguments.length, rules = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    rules[_key4] = arguments[_key4];
  }

  rules = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__clean_js__["a" /* default */])(rules);
  return rules ? toRule({
    id: hashify(extractStyles(rules)),
    type: 'merge',
    rules: rules,
    label: '[' + (typeof rules[0] === 'string' ? rules[0] : rules.map(extractLabel).join(' + ')) + ']'
  }) : {};
}

var compose = merge;

function media(expr) {
  for (var _len5 = arguments.length, rules = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    rules[_key5 - 1] = arguments[_key5];
  }

  rules = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__clean_js__["a" /* default */])(rules);
  return rules ? toRule({
    id: hashify(expr, extractStyles(rules)),
    type: 'media',
    rules: rules,
    expr: expr,
    label: '*mq(' + rules.map(extractLabel).join(' + ') + ')'
  }) : {};
}

var presets = {
  mobile: '(min-width: 400px)',
  phablet: '(min-width: 550px)',
  tablet: '(min-width: 750px)',
  desktop: '(min-width: 1000px)',
  hd: '(min-width: 1200px)'
};

/**** live media query labels ****/

// simplest implementation -
// cycle through the cache, and for every media query
// find matching elements and update the label
function updateMediaQueryLabels() {
  Object.keys(registered).forEach(function (id) {
    var expr = registered[id].expr;

    if (expr && hasLabels && window.matchMedia) {
      (function () {
        var els = document.querySelectorAll('[data-css-' + id + ']');
        var match = window.matchMedia(expr).matches ? '✓' : '✕';
        var regex = /^(✓|✕|\*)mq/;
        [].concat(_toConsumableArray(els)).forEach(function (el) {
          return el.setAttribute('data-css-' + id, el.getAttribute('data-css-' + id).replace(regex, match + 'mq'));
        });
      })();
    }
  });
}

// saves a reference to the loop we trigger
var interval = void 0;

function trackMediaQueryLabels() {
  var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var period = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

  if (bool) {
    if (interval) {
      console.warn('already tracking labels, call trackMediaQueryLabels(false) to stop'); // eslint-disable-line no-console
      return;
    }
    interval = setInterval(function () {
      return updateMediaQueryLabels();
    }, period);
  } else {
    clearInterval(interval);
    interval = null;
  }
}

// in dev mode, start this up immediately
if (isDev && isBrowser) {
  trackMediaQueryLabels(true);
  // todo - make sure hot loading isn't broken
  // todo - clearInterval on browser close
}

function pseudo(selector, obj) {
  obj = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__clean_js__["a" /* default */])(obj);
  return obj ? toRule({
    id: hashify(selector, obj),
    type: 'pseudo',
    selector: selector,
    style: obj,
    label: obj.label || ':*'
  }) : {};
}

// allllll the pseudoclasses

function active(x) {
  return pseudo(':active', x);
}

function any(x) {
  return pseudo(':any', x);
}

function checked(x) {
  return pseudo(':checked', x);
}

function disabled(x) {
  return pseudo(':disabled', x);
}

function empty(x) {
  return pseudo(':empty', x);
}

function enabled(x) {
  return pseudo(':enabled', x);
}

function _default(x) {
  return pseudo(':default', x); // note '_default' name
}

function first(x) {
  return pseudo(':first', x);
}

function firstChild(x) {
  return pseudo(':first-child', x);
}

function firstOfType(x) {
  return pseudo(':first-of-type', x);
}

function fullscreen(x) {
  return pseudo(':fullscreen', x);
}

function focus(x) {
  return pseudo(':focus', x);
}

function hover(x) {
  return pseudo(':hover', x);
}

function indeterminate(x) {
  return pseudo(':indeterminate', x);
}

function inRange(x) {
  return pseudo(':in-range', x);
}

function invalid(x) {
  return pseudo(':invalid', x);
}

function lastChild(x) {
  return pseudo(':last-child', x);
}

function lastOfType(x) {
  return pseudo(':last-of-type', x);
}

function left(x) {
  return pseudo(':left', x);
}

function link(x) {
  return pseudo(':link', x);
}

function onlyChild(x) {
  return pseudo(':only-child', x);
}

function onlyOfType(x) {
  return pseudo(':only-of-type', x);
}

function optional(x) {
  return pseudo(':optional', x);
}

function outOfRange(x) {
  return pseudo(':out-of-range', x);
}

function readOnly(x) {
  return pseudo(':read-only', x);
}

function readWrite(x) {
  return pseudo(':read-write', x);
}

function required(x) {
  return pseudo(':required', x);
}

function right(x) {
  return pseudo(':right', x);
}

function root(x) {
  return pseudo(':root', x);
}

function scope(x) {
  return pseudo(':scope', x);
}

function target(x) {
  return pseudo(':target', x);
}

function valid(x) {
  return pseudo(':valid', x);
}

function visited(x) {
  return pseudo(':visited', x);
}

// parameterized pseudoclasses
function dir(p, x) {
  return pseudo(':dir(' + p + ')', x);
}
function lang(p, x) {
  return pseudo(':lang(' + p + ')', x);
}
function not(p, x) {
  // should this be a plugin?
  var selector = p.split(',').map(function (x) {
    return x.trim();
  }).map(function (x) {
    return ':not(' + x + ')';
  });
  if (selector.length === 1) {
    return pseudo(':not(' + p + ')', x);
  }
  return select(selector.join(''), x);
}
function nthChild(p, x) {
  return pseudo(':nth-child(' + p + ')', x);
}
function nthLastChild(p, x) {
  return pseudo(':nth-last-child(' + p + ')', x);
}
function nthLastOfType(p, x) {
  return pseudo(':nth-last-of-type(' + p + ')', x);
}
function nthOfType(p, x) {
  return pseudo(':nth-of-type(' + p + ')', x);
}

// pseudoelements
function after(x) {
  return pseudo('::after', x);
}
function before(x) {
  return pseudo('::before', x);
}
function firstLetter(x) {
  return pseudo('::first-letter', x);
}
function firstLine(x) {
  return pseudo('::first-line', x);
}
function selection(x) {
  return pseudo('::selection', x);
}
function backdrop(x) {
  return pseudo('::backdrop', x);
}
function placeholder(x) {
  // https://github.com/threepointone/glamor/issues/14
  return merge(pseudo('::placeholder', x), pseudo('::-webkit-input-placeholder', x), pseudo('::-moz-placeholder', x), pseudo('::-ms-input-placeholder', x));
}

// we can add keyframes in a similar manner, but still generating a unique name
// for including in styles. this gives us modularity, but still a natural api
function keyframes(name, kfs) {
  if (!kfs) {
    kfs = name, name = 'animation';
  }

  // do not ignore empty keyframe definitions for now.
  kfs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__clean_js__["a" /* default */])(kfs) || {};
  var spec = {
    id: hashify(name, kfs),
    type: 'keyframes',
    name: name,
    keyframes: kfs
  };
  register(spec);
  insertKeyframe(spec);
  return name + '_' + spec.id;
}

// we don't go all out for fonts as much, giving a simple font loading strategy
// use a fancier lib if you need moar power
function fontFace(font) {
  font = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__clean_js__["a" /* default */])(font);
  var spec = {
    id: hashify(font),
    type: 'font-face',
    font: font
  };
  register(spec);
  insertFontFace(spec);

  return font.fontFamily;
}

/*** helpers for web components ***/
// https://github.com/threepointone/glamor/issues/16

function cssFor() {
  for (var _len6 = arguments.length, rules = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    rules[_key6] = arguments[_key6];
  }

  rules = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__clean_js__["a" /* default */])(rules);
  return rules ? flatten(rules.map(function (r) {
    return registered[idFor(r)];
  }).map(ruleToCSS)).join('') : '';
}

function attribsFor() {
  for (var _len7 = arguments.length, rules = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    rules[_key7] = arguments[_key7];
  }

  rules = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__clean_js__["a" /* default */])(rules);
  var htmlAttributes = rules ? rules.map(function (rule) {
    idFor(rule); // throwaway check for rule
    var key = Object.keys(rule)[0],
        value = rule[key];
    return key + '="' + (value || '') + '"';
  }).join(' ') : '';

  return htmlAttributes;
}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map