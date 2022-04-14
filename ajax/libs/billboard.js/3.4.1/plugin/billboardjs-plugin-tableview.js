/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 *
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 *
 * @version 3.4.1
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-selection"), require("d3-brush"));
	else if(typeof define === 'function' && define.amd)
		define("bb", ["d3-selection", "d3-brush"], factory);
	else if(typeof exports === 'object')
		exports["bb"] = factory(require("d3-selection"), require("d3-brush"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["tableview"] = factory(root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__3__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ TableView; }
});

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
;// CONCATENATED MODULE: ./src/Plugin/Plugin.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Base class to generate billboard.js plugin
 * @class Plugin
 */

/**
 * Version info string for plugin
 * @name version
 * @static
 * @memberof Plugin
 * @type {string}
 * @example
 *   bb.plugin.stanford.version;  // ex) 1.9.0
 */
var Plugin = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param {Any} options config option object
   * @private
   */
  function Plugin(options) {
    if (options === void 0) {
      options = {};
    }

    this.$$ = void 0;
    this.options = void 0;
    this.options = options;
  }
  /**
   * Lifecycle hook for 'beforeInit' phase.
   * @private
   */


  var _proto = Plugin.prototype;

  _proto.$beforeInit = function $beforeInit() {}
  /**
   * Lifecycle hook for 'init' phase.
   * @private
   */
  ;

  _proto.$init = function $init() {}
  /**
   * Lifecycle hook for 'afterInit' phase.
   * @private
   */
  ;

  _proto.$afterInit = function $afterInit() {}
  /**
   * Lifecycle hook for 'redraw' phase.
   * @private
   */
  ;

  _proto.$redraw = function $redraw() {}
  /**
   * Lifecycle hook for 'willDestroy' phase.
   * @private
   */
  ;

  _proto.$willDestroy = function $willDestroy() {
    var _this = this;

    Object.keys(this).forEach(function (key) {
      _this[key] = null;
      delete _this[key];
    });
  };

  return Plugin;
}();

Plugin.version = "3.4.1";

;// CONCATENATED MODULE: ./src/Plugin/tableview/Options.ts
/**
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * TableView plugin option class
 * @class TableviewOptions
 * @param {Options} options TableView plugin options
 * @augments Plugin
 * @returns {TableviewOptions}
 * @private
 */
var Options = function () {
  return {
    /**
     * Set tableview holder selector.
     * - **NOTE:** If not set, will append new holder element dynamically right after chart element.
     * @name selector
     * @memberof plugin-tableview
     * @type {string}
     * @default undefined
     * @example
     *   selector: "#table-holder"
     */
    selector: undefined,

    /**
     * Set category title text
     * @name categoryTitle
     * @memberof plugin-tableview
     * @type {string}
     * @default "Category"
     * @example
     *   categoryTitle: "#table-holder"
     */
    categoryTitle: "Category",

    /**
     * Set category text format function.
     * @name categoryFormat
     * @memberof plugin-tableview
     * @type {Function}
     * @returns {string}
     * @default function(v) { // will return formatted value according x Axis type }}
     * @example
     *   categoryFormat: "#table-holder"
     */
    categoryFormat: function categoryFormat(v) {
      var category = v;

      if (this.$$.axis.isCategorized()) {
        category = this.$$.categoryName(v);
      } else if (this.$$.axis.isTimeSeries()) {
        category = v.toLocaleDateString();
      }

      return category;
    },

    /**
     * Set tableview holder class name.
     * @name class
     * @memberof plugin-tableview
     * @type {string}
     * @default undefined
     * @example
     *   class: "table-class-name"
     */
    class: undefined,

    /**
     * Set to apply default style(`.bb-tableview`) to tableview element.
     * @name style
     * @memberof plugin-tableview
     * @type {boolean}
     * @default true
     * @example
     *   style: false
     */
    style: !0,

    /**
     * Set tableview title text.
     * - **NOTE:** If set [title.text](https://naver.github.io/billboard.js/release/latest/doc/Options.html#.title), will be used when this option value is empty.
     * @name title
     * @memberof plugin-tableview
     * @type {string}
     * @default undefined
     * @example
     *   title: "Table Title Text"
     */
    title: undefined,

    /**
     * Update tableview from data visibility update(ex. legend toggle).
     * @name updateOnToggle
     * @memberof plugin-tableview
     * @type {boolean}
     * @default true
     * @example
     *   legendToggleUpdate: false
     */
    updateOnToggle: !0
  };
};


;// CONCATENATED MODULE: ./src/Plugin/tableview/const.ts
/**
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Constants values for plugin option
 * @ignore
 */

var defaultStyle = {
  id: "__tableview-style__",
  class: "bb-tableview",
  rule: ".bb-tableview {\n\t\tborder-collapse:collapse;\n\t\tborder-spacing:0;\n\t\tbackground:#fff;\n\t\tmin-width:100%;\n\t\tmargin-top:10px;\n\t\tfont-family:sans-serif;\n\t\tfont-size:.9em;\n\t}\n\t.bb-tableview tr:hover {\n\t\tbackground:#eef7ff;\n\t}\n\t.bb-tableview thead tr {\n\t\tbackground:#f8f8f8;\n\t}\n\t.bb-tableview caption,.bb-tableview td,.bb-tableview th {\n\t\ttext-align: center;\n\t\tborder:1px solid silver;\n\t\tpadding:.5em;\n\t}\n\t.bb-tableview caption {\n\t\tfont-size:1.1em;\n\t\tfont-weight:700;\n\t\tmargin-bottom: -1px;\n\t}"
},
    tpl = {
  body: "<caption>{=title}</caption>\n\t\t<thead><tr>{=thead}</tr></thead>\n\t\t<tbody>{=tbody}</tbody>",
  thead: "<th scope=\"col\">{=title}</th>",
  tbodyHeader: "<th scope=\"row\">{=value}</th>",
  tbody: "<td>{=value}</td>"
}; // template
// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(1);
// EXTERNAL MODULE: external {"commonjs":"d3-brush","commonjs2":"d3-brush","amd":"d3-brush","root":"d3"}
var external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_ = __webpack_require__(3);
;// CONCATENATED MODULE: ./src/module/browser.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Window object
 * @private
 */

/* eslint-disable no-new-func, no-undef */


var win = function () {
  var root = typeof globalThis === "object" && globalThis !== null && globalThis.Object === Object && globalThis || typeof global === "object" && global !== null && global.Object === Object && global || typeof self === "object" && self !== null && self.Object === Object && self;
  return root || Function("return this")();
}();
/* eslint-enable no-new-func, no-undef */
// fallback for non-supported environments


win.requestIdleCallback = win.requestIdleCallback || function (cb) {
  return setTimeout(cb, 1);
};

win.cancelIdleCallback = win.cancelIdleCallback || function (id) {
  return clearTimeout(id);
};

var doc = win == null ? void 0 : win.document;
;// CONCATENATED MODULE: ./src/module/util.ts


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1, source; i < arguments.length; i++) { source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */





var isValue = function (v) {
  return v || v === 0;
},
    isFunction = function (v) {
  return typeof v === "function";
},
    isString = function (v) {
  return typeof v === "string";
},
    isNumber = function (v) {
  return typeof v === "number";
},
    isUndefined = function (v) {
  return typeof v === "undefined";
},
    isDefined = function (v) {
  return typeof v !== "undefined";
},
    isboolean = function (v) {
  return typeof v === "boolean";
},
    ceil10 = function (v) {
  return Math.ceil(v / 10) * 10;
},
    asHalfPixel = function (n) {
  return Math.ceil(n) + .5;
},
    diffDomain = function (d) {
  return d[1] - d[0];
},
    isObjectType = function (v) {
  return typeof v === "object";
},
    isEmpty = function (o) {
  return isUndefined(o) || o === null || isString(o) && o.length === 0 || isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0 || isNumber(o) && isNaN(o);
},
    notEmpty = function (o) {
  return !isEmpty(o);
},
    isArray = function (arr) {
  return Array.isArray(arr);
},
    isObject = function (obj) {
  return obj && !(obj != null && obj.nodeType) && isObjectType(obj) && !isArray(obj);
};

/**
 * Get specified key value from object
 * If default value is given, will return if given key value not found
 * @param {object} options Source object
 * @param {string} key Key value
 * @param {*} defaultValue Default value
 * @returns {*}
 * @private
 */
function getOption(options, key, defaultValue) {
  return isDefined(options[key]) ? options[key] : defaultValue;
}
/**
 * Check if value exist in the given object
 * @param {object} dict Target object to be checked
 * @param {*} value Value to be checked
 * @returns {boolean}
 * @private
 */


function hasValue(dict, value) {
  var found = !1;
  Object.keys(dict).forEach(function (key) {
    return dict[key] === value && (found = !0);
  });
  return found;
}
/**
 * Call function with arguments
 * @param {Function} fn Function to be called
 * @param {*} thisArg "this" value for fn
 * @param {*} args Arguments for fn
 * @returns {boolean} true: fn is function, false: fn is not function
 * @private
 */


function callFn(fn, thisArg) {
  for (var isFn = isFunction(fn), _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  isFn && fn.call.apply(fn, [thisArg].concat(args));
  return isFn;
}
/**
 * Call function after all transitions ends
 * @param {d3.transition} transition Transition
 * @param {Fucntion} cb Callback function
 * @private
 */


function endall(transition, cb) {
  var n = 0,
      end = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    --n || cb.apply.apply(cb, [this].concat(args));
  };

  // if is transition selection
  if ("duration" in transition) {
    transition.each(function () {
      return ++n;
    }).on("end", end);
  } else {
    ++n;
    transition.call(end);
  }
}
/**
 * Replace tag sign to html entity
 * @param {string} str Target string value
 * @returns {string}
 * @private
 */


function sanitise(str) {
  return isString(str) ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : str;
}
/**
 * Set text value. If there's multiline add nodes.
 * @param {d3Selection} node Text node
 * @param {string} text Text value string
 * @param {Array} dy dy value for multilined text
 * @param {boolean} toMiddle To be alingned vertically middle
 * @private
 */


function setTextValue(node, text, dy, toMiddle) {
  if (dy === void 0) {
    dy = [-1, 1];
  }

  if (toMiddle === void 0) {
    toMiddle = !1;
  }

  if (!node || !isString(text)) {
    return;
  }

  if (text.indexOf("\n") === -1) {
    node.text(text);
  } else {
    var diff = [node.text(), text].map(function (v) {
      return v.replace(/[\s\n]/g, "");
    });

    if (diff[0] !== diff[1]) {
      var multiline = text.split("\n"),
          len = toMiddle ? multiline.length - 1 : 1;
      // reset possible text
      node.html("");
      multiline.forEach(function (v, i) {
        node.append("tspan").attr("x", 0).attr("dy", (i === 0 ? dy[0] * len : dy[1]) + "em").text(v);
      });
    }
  }
}
/**
 * Substitution of SVGPathSeg API polyfill
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {Array}
 * @private
 */


function getRectSegList(path) {
  /*
   * seg1 ---------- seg2
   *   |               |
   *   |               |
   *   |               |
   * seg0 ---------- seg3
   * */
  var _path$getBBox = path.getBBox(),
      x = _path$getBBox.x,
      y = _path$getBBox.y,
      width = _path$getBBox.width,
      height = _path$getBBox.height;

  return [{
    x: x,
    y: y + height
  }, // seg0
  {
    x: x,
    y: y
  }, // seg1
  {
    x: x + width,
    y: y
  }, // seg2
  {
    x: x + width,
    y: y + height
  } // seg3
  ];
}
/**
 * Get svg bounding path box dimension
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {object}
 * @private
 */


function getPathBox(path) {
  var _path$getBoundingClie = path.getBoundingClientRect(),
      width = _path$getBoundingClie.width,
      height = _path$getBoundingClie.height,
      items = getRectSegList(path),
      x = items[0].x,
      y = Math.min(items[0].y, items[1].y);

  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
}
/**
 * Get event's current position coordinates
 * @param {object} event Event object
 * @param {SVGElement|HTMLElement} element Target element
 * @returns {Array} [x, y] Coordinates x, y array
 * @private
 */


function getPointer(event, element) {
  var _ref,
      touches = event && ((_ref = event.touches || event.sourceEvent && event.sourceEvent.touches) == null ? void 0 : _ref[0]),
      pointer = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.pointer)(touches || event, element);

  return pointer.map(function (v) {
    return isNaN(v) ? 0 : v;
  });
}
/**
 * Return brush selection array
 * @param {object} ctx Current instance
 * @returns {d3.brushSelection}
 * @private
 */


function getBrushSelection(ctx) {
  var event = ctx.event,
      $el = ctx.$el,
      main = $el.subchart.main || $el.main,
      selection;

  // check from event
  if (event && event.type === "brush") {
    selection = event.selection; // check from brush area selection
  } else if (main && (selection = main.select(".bb-brush").node())) {
    selection = (0,external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_.brushSelection)(selection);
  }

  return selection;
}
/**
 * Get boundingClientRect.
 * Cache the evaluated value once it was called.
 * @param {HTMLElement} node Target element
 * @returns {object}
 * @private
 */


function getBoundingRect(node) {
  var needEvaluate = !("rect" in node) || "rect" in node && node.hasAttribute("width") && node.rect.width !== +node.getAttribute("width");
  return needEvaluate ? node.rect = node.getBoundingClientRect() : node.rect;
}
/**
 * Retrun random number
 * @param {boolean} asStr Convert returned value as string
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @returns {number|string}
 * @private
 */


function getRandom(asStr, min, max) {
  if (asStr === void 0) {
    asStr = !0;
  }

  if (min === void 0) {
    min = 0;
  }

  if (max === void 0) {
    max = 1e4;
  }

  var rand = Math.floor(Math.random() * (max - min) + min);
  return asStr ? rand + "" : rand;
}
/**
 * Find index based on binary search
 * @param {Array} arr Data array
 * @param {number} v Target number to find
 * @param {number} start Start index of data array
 * @param {number} end End index of data arr
 * @param {boolean} isRotated Weather is roted axis
 * @returns {number} Index number
 * @private
 */


function findIndex(arr, v, start, end, isRotated) {
  if (start > end) {
    return -1;
  }

  var mid = Math.floor((start + end) / 2),
      _arr$mid = arr[mid],
      x = _arr$mid.x,
      _arr$mid$w = _arr$mid.w,
      w = _arr$mid$w === void 0 ? 0 : _arr$mid$w;

  if (isRotated) {
    x = arr[mid].y;
    w = arr[mid].h;
  }

  if (v >= x && v <= x + w) {
    return mid;
  }

  return v < x ? findIndex(arr, v, start, mid - 1, isRotated) : findIndex(arr, v, mid + 1, end, isRotated);
}
/**
 * Check if brush is empty
 * @param {object} ctx Bursh context
 * @returns {boolean}
 * @private
 */


function brushEmpty(ctx) {
  var selection = getBrushSelection(ctx);

  if (selection) {
    // brush selected area
    // two-dimensional: [[x0, y0], [x1, y1]]
    // one-dimensional: [x0, x1] or [y0, y1]
    return selection[0] === selection[1];
  }

  return !0;
}
/**
 * Deep copy object
 * @param {object} objectN Source object
 * @returns {object} Cloned object
 * @private
 */


function deepClone() {
  for (var clone = function (v) {
    if (isObject(v) && v.constructor) {
      var r = new v.constructor();

      for (var k in v) {
        r[k] = clone(v[k]);
      }

      return r;
    }

    return v;
  }, _len3 = arguments.length, objectN = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    objectN[_key3] = arguments[_key3];
  }

  return objectN.map(function (v) {
    return clone(v);
  }).reduce(function (a, c) {
    return _objectSpread(_objectSpread({}, a), c);
  });
}
/**
 * Extend target from source object
 * @param {object} target Target object
 * @param {object|Array} source Source object
 * @returns {object}
 * @private
 */


function extend(target, source) {
  if (target === void 0) {
    target = {};
  }

  if (isArray(source)) {
    source.forEach(function (v) {
      return extend(target, v);
    });
  } // exclude name with only numbers


  for (var p in source) {
    if (/^\d+$/.test(p) || p in target) {
      continue;
    }

    target[p] = source[p];
  }

  return target;
}
/**
 * Return first letter capitalized
 * @param {string} str Target string
 * @returns {string} capitalized string
 * @private
 */


var capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
/**
 * Camelize from kebob style string
 * @param {string} str Target string
 * @param {string} separator Separator string
 * @returns {string} camelized string
 * @private
 */


function camelize(str, separator) {
  if (separator === void 0) {
    separator = "-";
  }

  return str.split(separator).map(function (v, i) {
    return i ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : v.toLowerCase();
  }).join("");
}
/**
 * Convert to array
 * @param {object} v Target to be converted
 * @returns {Array}
 * @private
 */


var toArray = function (v) {
  return [].slice.call(v);
};
/**
 * Get css rules for specified stylesheets
 * @param {Array} styleSheets The stylesheets to get the rules from
 * @returns {Array}
 * @private
 */


function getCssRules(styleSheets) {
  var rules = [];
  styleSheets.forEach(function (sheet) {
    try {
      if (sheet.cssRules && sheet.cssRules.length) {
        rules = rules.concat(toArray(sheet.cssRules));
      }
    } catch (e) {
      console.error("Error while reading rules from " + sheet.href + ": " + e.toString());
    }
  });
  return rules;
}
/**
 * Gets the SVGMatrix of an SVGGElement
 * @param {SVGElement} node Node element
 * @returns {SVGMatrix} matrix
 * @private
 */


function getTranslation(node) {
  var transform = node ? node.transform : null,
      baseVal = transform && transform.baseVal;
  return baseVal && baseVal.numberOfItems ? baseVal.getItem(0).matrix : {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0
  };
}
/**
 * Get unique value from array
 * @param {Array} data Source data
 * @returns {Array} Unique array value
 * @private
 */


function getUnique(data) {
  var isDate = data[0] instanceof Date,
      d = (isDate ? data.map(Number) : data).filter(function (v, i, self) {
    return self.indexOf(v) === i;
  });
  return isDate ? d.map(function (v) {
    return new Date(v);
  }) : d;
}
/**
 * Merge array
 * @param {Array} arr Source array
 * @returns {Array}
 * @private
 */


function mergeArray(arr) {
  return arr && arr.length ? arr.reduce(function (p, c) {
    return p.concat(c);
  }) : [];
}
/**
 * Merge object returning new object
 * @param {object} target Target object
 * @param {object} objectN Source object
 * @returns {object} merged target object
 * @private
 */


function mergeObj(target) {
  for (var _len4 = arguments.length, objectN = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    objectN[_key4 - 1] = arguments[_key4];
  }

  if (!objectN.length || objectN.length === 1 && !objectN[0]) {
    return target;
  }

  var source = objectN.shift();

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(function (key) {
      var value = source[key];

      if (isObject(value)) {
        target[key] || (target[key] = {});
        target[key] = mergeObj(target[key], value);
      } else {
        target[key] = isArray(value) ? value.concat() : value;
      }
    });
  }

  return mergeObj.apply(void 0, [target].concat(objectN));
}
/**
 * Sort value
 * @param {Array} data value to be sorted
 * @param {boolean} isAsc true: asc, false: desc
 * @returns {number|string|Date} sorted date
 * @private
 */


function sortValue(data, isAsc) {
  if (isAsc === void 0) {
    isAsc = !0;
  }

  var fn;

  if (data[0] instanceof Date) {
    fn = isAsc ? function (a, b) {
      return a - b;
    } : function (a, b) {
      return b - a;
    };
  } else {
    if (isAsc && !data.every(isNaN)) {
      fn = function (a, b) {
        return a - b;
      };
    } else if (!isAsc) {
      fn = function (a, b) {
        return a > b && -1 || a < b && 1 || a === b && 0;
      };
    }
  }

  return data.concat().sort(fn);
}
/**
 * Get min/max value
 * @param {string} type 'min' or 'max'
 * @param {Array} data Array data value
 * @returns {number|Date|undefined}
 * @private
 */


function getMinMax(type, data) {
  var res = data.filter(function (v) {
    return notEmpty(v);
  });

  if (res.length) {
    if (isNumber(res[0])) {
      res = Math[type].apply(Math, res);
    } else if (res[0] instanceof Date) {
      res = sortValue(res, type === "min")[0];
    }
  } else {
    res = undefined;
  }

  return res;
}
/**
 * Get range
 * @param {number} start Start number
 * @param {number} end End number
 * @param {number} step Step number
 * @returns {Array}
 * @private
 */


var getRange = function (start, end, step) {
  if (step === void 0) {
    step = 1;
  }

  var res = [],
      n = Math.max(0, Math.ceil((end - start) / step)) | 0;

  for (var i = start; i < n; i++) {
    res.push(start + i * step);
  }

  return res;
},
    emulateEvent = {
  mouse: function () {
    var getParams = function () {
      return {
        bubbles: !1,
        cancelable: !1,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0
      };
    };

    try {
      // eslint-disable-next-line no-new
      new MouseEvent("t");
      return function (el, eventType, params) {
        if (params === void 0) {
          params = getParams();
        }

        el.dispatchEvent(new MouseEvent(eventType, params));
      };
    } catch (e) {
      // Polyfills DOM4 MouseEvent
      return function (el, eventType, params) {
        if (params === void 0) {
          params = getParams();
        }

        var mouseEvent = doc.createEvent("MouseEvent"); // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent

        mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, win, 0, // the event's mouse click count
        params.screenX, params.screenY, params.clientX, params.clientY, !1, !1, !1, !1, 0, null);
        el.dispatchEvent(mouseEvent);
      };
    }
  }(),
  touch: function touch(el, eventType, params) {
    var touchObj = new Touch(mergeObj({
      identifier: Date.now(),
      target: el,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: .5
    }, params));
    el.dispatchEvent(new TouchEvent(eventType, {
      cancelable: !0,
      bubbles: !0,
      shiftKey: !0,
      touches: [touchObj],
      targetTouches: [],
      changedTouches: [touchObj]
    }));
  }
}; // emulate event


/**
 * Process the template  & return bound string
 * @param {string} tpl Template string
 * @param {object} data Data value to be replaced
 * @returns {string}
 * @private
 */
function tplProcess(tpl, data) {
  var res = tpl;

  for (var x in data) {
    res = res.replace(new RegExp("{=" + x + "}", "g"), data[x]);
  }

  return res;
}
/**
 * Get parsed date value
 * (It must be called in 'ChartInternal' context)
 * @param {Date|string|number} date Value of date to be parsed
 * @returns {Date}
 * @private
 */


function parseDate(date) {
  var parsedDate;

  if (date instanceof Date) {
    parsedDate = date;
  } else if (isString(date)) {
    var _format$dataTime,
        config = this.config,
        format = this.format;

    // if fails to parse, try by new Date()
    // https://github.com/naver/billboard.js/issues/1714
    parsedDate = (_format$dataTime = format.dataTime(config.data_xFormat)(date)) != null ? _format$dataTime : new Date(date);
  } else if (isNumber(date) && !isNaN(date)) {
    parsedDate = new Date(+date);
  }

  if (!parsedDate || isNaN(+parsedDate)) {
    console && console.error && console.error("Failed to parse x '" + date + "' to Date object");
  }

  return parsedDate;
}
/**
 * Return if the current doc is visible or not
 * @returns {boolean}
 * @private
 */


function isTabVisible() {
  return (doc == null ? void 0 : doc.hidden) === !1 || (doc == null ? void 0 : doc.visibilityState) === "visible";
}
/**
 * Get the current input type
 * @param {boolean} mouse Config value: interaction.inputType.mouse
 * @param {boolean} touch Config value: interaction.inputType.touch
 * @returns {string} "mouse" | "touch" | null
 * @private
 */


function convertInputType(mouse, touch) {
  var DocumentTouch = win.DocumentTouch,
      matchMedia = win.matchMedia,
      navigator = win.navigator,
      hasTouch = !1;

  if (touch) {
    // Some Edge desktop return true: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/20417074/
    if (navigator && "maxTouchPoints" in navigator) {
      hasTouch = navigator.maxTouchPoints > 0; // Ref: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
      // On IE11 with IE9 emulation mode, ('ontouchstart' in window) is returning true
    } else if ("ontouchmove" in win || DocumentTouch && doc instanceof DocumentTouch) {
      hasTouch = !0;
    } else {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#avoiding_user_agent_detection
      if (matchMedia != null && matchMedia("(pointer:coarse)").matches) {
        hasTouch = !0;
      } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouch = /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
  } // Check if agent has mouse using any-hover, touch devices (e.g iPad) with external mouse will return true as long as mouse is connected
  // https://css-tricks.com/interaction-media-features-and-their-potential-for-incorrect-assumptions/#aa-testing-the-capabilities-of-all-inputs
  // Demo: https://patrickhlauke.github.io/touch/pointer-hover-any-pointer-any-hover/


  var hasMouse = mouse && ["any-hover:hover", "any-pointer:fine"].some(function (v) {
    return matchMedia == null ? void 0 : matchMedia("(" + v + ")").matches;
  }); // fallback to 'mouse' if no input type is detected.

  return hasMouse && "mouse" || hasTouch && "touch" || "mouse";
}
;// CONCATENATED MODULE: ./src/config/config.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/**
 * Load configuration option
 * @param {object} config User's generation config value
 * @private
 */
function loadConfig(config) {
  var thisConfig = this.config,
      target,
      keys,
      read,
      find = function () {
    var key = keys.shift();

    if (key && target && isObjectType(target) && key in target) {
      target = target[key];
      return find();
    } else if (!key) {
      return target;
    }

    return undefined;
  };

  Object.keys(thisConfig).forEach(function (key) {
    target = config;
    keys = key.split("_");
    read = find();

    if (isDefined(read)) {
      thisConfig[key] = read;
    }
  });
}
;// CONCATENATED MODULE: ./src/Plugin/tableview/index.ts




function tableview_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function tableview_objectSpread(target) { for (var i = 1, source; i < arguments.length; i++) { source = null != arguments[i] ? arguments[i] : {}; i % 2 ? tableview_ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : tableview_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */





/**
 * Table view plugin.<br>
 * Generates table view for bound dataset.
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * @class plugin-tableview
 * @param {object} options table view plugin options
 * @augments Plugin
 * @returns {TableView}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-tableview.js"></script>
 *
 *  var chart = bb.generate({
 *     ...
 *     plugins: [
 *        new bb.plugin.tableview({
 *          selector: "#my-table-view",
 *          categoryTitle: "Category",
 *          categoryFormat: function(v) {
 *              // do some transformation
 *              ...
 *              return v;
 *          },
 *          class: "my-class-name",
 *          style: true,
 *          title: "My Data List",
 *          updateOnToggle: false
 *        }),
 *     ]
 *  });
 * @example
 * import {bb} from "billboard.js";
 * import TableView from "billboard.js/dist/billboardjs-plugin-tableview";
 *
 * bb.generate({
 *     ...
 *     plugins: [
 *        new TableView({ ... })
 *     ]
 * })
 */

var TableView = /*#__PURE__*/function (_Plugin) {
  _inheritsLoose(TableView, _Plugin);

  function TableView(options) {
    var _this = _Plugin.call(this, options) || this;

    _this.config = void 0;
    _this.element = void 0;
    _this.config = new Options();
    return _assertThisInitialized(_this) || _assertThisInitialized(_this);
  }

  var _proto = TableView.prototype;

  _proto.$beforeInit = function $beforeInit() {
    loadConfig.call(this, this.options);
  };

  _proto.$init = function $init() {
    var _element$classList,
        _this$config = this.config,
        className = _this$config.class,
        selector = _this$config.selector,
        style = _this$config.style,
        element = document.querySelector(selector || "." + (className || defaultStyle["class"]));

    if (!element) {
      var chart = this.$$.$el.chart.node();
      element = document.createElement("table");
      chart.parentNode.insertBefore(element, chart.nextSibling);
    }

    if (element.tagName !== "TABLE") {
      var table = document.createElement("table");
      element.appendChild(table);
      element = table;
    } // append default css style


    if (style && !document.getElementById(defaultStyle.id)) {
      var s = document.createElement("style");
      s.id = defaultStyle.id;
      s.innerHTML = defaultStyle.rule;
      (document.head || document.getElementsByTagName("head")[0]).appendChild(s);
    }

    (_element$classList = element.classList).add.apply(_element$classList, [style && defaultStyle["class"], className].filter(Boolean));

    this.element = element;
  }
  /**
   * Generate table
   * @private
   */
  ;

  _proto.generateTable = function generateTable() {
    var _this2 = this,
        $$ = this.$$,
        config = this.config,
        element = this.element,
        dataToShow = $$.filterTargetsToShow($$.data.targets),
        thead = tplProcess(tpl.thead, {
      title: dataToShow.length ? this.config.categoryTitle : ""
    }),
        tbody = "",
        rows = [];

    dataToShow.forEach(function (v) {
      thead += tplProcess(tpl.thead, {
        title: v.id
      }); // make up value rows

      v.values.forEach(function (d, i) {
        if (!rows[i]) {
          rows[i] = [d.x];
        }

        rows[i].push(d.value);
      });
    });
    rows.forEach(function (v) {
      tbody += "<tr>" + v.map(function (d, i) {
        return tplProcess(i ? tpl.tbody : tpl.tbodyHeader, {
          value: i === 0 ? config.categoryFormat.bind(_this2)(d) : isNumber(d) ? d.toLocaleString() : ""
        });
      }).join("") + "</tr>";
    });
    var r = tplProcess(tpl.body, tableview_objectSpread(tableview_objectSpread({}, config), {}, {
      title: config.title || $$.config.title_text || "",
      thead: thead,
      tbody: tbody
    })).replace(/<[^>]+><\/[^>]+>/g, "");
    element.innerHTML = r;
  };

  _proto.$redraw = function $redraw() {
    var state = this.$$.state,
        doNotUpdate = state.resizing || !this.config.updateOnToggle && state.toggling;
    doNotUpdate || this.generateTable();
  };

  _proto.$willDestroy = function $willDestroy() {
    this.element.parentNode.removeChild(this.element); // remove default css style when left one chart instance

    if (this.$$.charts.length === 1) {
      var _s$parentNode,
          s = document.getElementById(defaultStyle.id);

      s == null ? void 0 : (_s$parentNode = s.parentNode) == null ? void 0 : _s$parentNode.removeChild(s);
    }
  };

  return TableView;
}(Plugin);


}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});