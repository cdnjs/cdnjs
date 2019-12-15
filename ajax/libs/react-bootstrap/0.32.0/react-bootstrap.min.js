(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactBootstrap"] = factory(require("react"), require("react-dom"));
	else
		root["ReactBootstrap"] = factory(root["React"], root["ReactDOM"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_9__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 91);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(52);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(119);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(123);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(52);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(66);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (undefined !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(126)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(129)();
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _createChainableTypeChecker = __webpack_require__(36);

var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function elementType(props, propName, componentName, location, propFullName) {
  var propValue = props[propName];
  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);

  if (_react2.default.isValidElement(propValue)) {
    return new Error('Invalid ' + location + ' `' + propFullName + '` of type ReactElement ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + 'or a ReactClass).');
  }

  if (propType !== 'function' && propType !== 'string') {
    return new Error('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + 'or a ReactClass).');
  }

  return null;
}

exports.default = (0, _createChainableTypeChecker2.default)(elementType);
module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (undefined !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(48)('wks');
var uid = __webpack_require__(34);
var Symbol = __webpack_require__(14).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(14);
var core = __webpack_require__(11);
var ctx = __webpack_require__(42);
var hide = __webpack_require__(20);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(21);
var IE8_DOM_DEFINE = __webpack_require__(67);
var toPrimitive = __webpack_require__(43);
var dP = Object.defineProperty;

exports.f = __webpack_require__(23) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(70);
var defined = __webpack_require__(45);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _createUncontrollable = __webpack_require__(130);

var _createUncontrollable2 = _interopRequireDefault(_createUncontrollable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mixin = {
  shouldComponentUpdate: function shouldComponentUpdate() {
    //let the forceUpdate trigger the update
    return !this._notifying;
  }
};

function set(component, propName, handler, value, args) {
  if (handler) {
    component._notifying = true;
    handler.call.apply(handler, [component, value].concat(args));
    component._notifying = false;
  }

  component._values[propName] = value;

  if (!component.unmounted) component.forceUpdate();
}

exports.default = (0, _createUncontrollable2.default)(mixin, set);
module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(16);
var createDesc = __webpack_require__(29);
module.exports = __webpack_require__(23) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(22);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(28)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(134), __esModule: true };

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ownerDocument;
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
module.exports = exports["default"];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(15);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  // HTML DOM and SVG DOM may have different support levels,
  // so we need to check on context instead of a document root element.
  return _inDOM2.default ? function (context, node) {
    if (context.contains) {
      return context.contains(node);
    } else if (context.compareDocumentPosition) {
      return context === node || !!(context.compareDocumentPosition(node) & 16);
    } else {
      return fallback(context, node);
    }
  } : fallback;
}();

function fallback(context, node) {
  if (node) do {
    if (node === context) return true;
  } while (node = node.parentNode);

  return false;
}
module.exports = exports['default'];

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (componentOrElement) {
  return (0, _ownerDocument2.default)(_reactDom2.default.findDOMNode(componentOrElement));
};

var _reactDom = __webpack_require__(9);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ownerDocument = __webpack_require__(25);

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(69);
var enumBugKeys = __webpack_require__(49);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = style;

var _camelizeStyle = __webpack_require__(80);

var _camelizeStyle2 = _interopRequireDefault(_camelizeStyle);

var _hyphenateStyle = __webpack_require__(139);

var _hyphenateStyle2 = _interopRequireDefault(_hyphenateStyle);

var _getComputedStyle2 = __webpack_require__(141);

var _getComputedStyle3 = _interopRequireDefault(_getComputedStyle2);

var _removeStyle = __webpack_require__(142);

var _removeStyle2 = _interopRequireDefault(_removeStyle);

var _properties = __webpack_require__(61);

var _isTransform = __webpack_require__(143);

var _isTransform2 = _interopRequireDefault(_isTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function style(node, property, value) {
  var css = '';
  var transforms = '';
  var props = property;

  if (typeof property === 'string') {
    if (value === undefined) {
      return node.style[(0, _camelizeStyle2.default)(property)] || (0, _getComputedStyle3.default)(node).getPropertyValue((0, _hyphenateStyle2.default)(property));
    } else {
      (props = {})[property] = value;
    }
  }

  Object.keys(props).forEach(function (key) {
    var value = props[key];
    if (!value && value !== 0) {
      (0, _removeStyle2.default)(node, (0, _hyphenateStyle2.default)(key));
    } else if ((0, _isTransform2.default)(key)) {
      transforms += key + '(' + value + ') ';
    } else {
      css += (0, _hyphenateStyle2.default)(key) + ': ' + value + ';';
    }
  });

  if (transforms) {
    css += _properties.transform + ': ' + transforms + ';';
  }

  node.style.cssText += ';' + css;
}
module.exports = exports['default'];

/***/ }),
/* 34 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (undefined !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createChainableTypeChecker;
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// Mostly taken from ReactPropTypes.

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (props[propName] == null) {
      if (isRequired) {
        return new Error('Required ' + location + ' `' + propFullNameSafe + '` was not specified ' + ('in `' + componentNameSafe + '`.'));
      }

      return null;
    }

    for (var _len = arguments.length, args = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      args[_key - 6] = arguments[_key];
    }

    return validate.apply(undefined, [props, propName, componentNameSafe, location, propFullNameSafe].concat(args));
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}
module.exports = exports['default'];

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = all;

var _createChainableTypeChecker = __webpack_require__(36);

var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function all() {
  for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  function allPropTypes() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var error = null;

    validators.forEach(function (validator) {
      if (error != null) {
        return;
      }

      var result = validator.apply(undefined, args);
      if (result != null) {
        error = result;
      }
    });

    return error;
  }

  return (0, _createChainableTypeChecker2.default)(allPropTypes);
}
module.exports = exports['default'];

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRequiredForA11y;
function isRequiredForA11y(validator) {
  return function validate(props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (props[propName] == null) {
      return new Error('The ' + location + ' `' + propFullNameSafe + '` is required to make ' + ('`' + componentNameSafe + '` accessible for users of assistive ') + 'technologies such as screen readers.');
    }

    for (var _len = arguments.length, args = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      args[_key - 5] = arguments[_key];
    }

    return validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
  };
}
module.exports = exports['default'];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _createChainableTypeChecker = __webpack_require__(36);

var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(props, propName, componentName, location, propFullName) {
  var propValue = props[propName];
  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);

  if (_react2.default.isValidElement(propValue)) {
    return new Error('Invalid ' + location + ' `' + propFullName + '` of type ReactElement ' + ('supplied to `' + componentName + '`, expected a ReactComponent or a ') + 'DOMElement. You can usually obtain a ReactComponent or DOMElement ' + 'from a ReactElement by attaching a ref to it.');
  }

  if ((propType !== 'object' || typeof propValue.render !== 'function') && propValue.nodeType !== 1) {
    return new Error('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected a ReactComponent or a ') + 'DOMElement.');
  }

  return null;
}

exports.default = (0, _createChainableTypeChecker2.default)(validate);
module.exports = exports['default'];

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWindow;
function getWindow(node) {
  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
}
module.exports = exports["default"];

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = getContainer;

var _reactDom = __webpack_require__(9);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return _reactDom2.default.findDOMNode(container) || defaultContainer;
}
module.exports = exports['default'];

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(94);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(22);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 44 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(48)('keys');
var uid = __webpack_require__(34);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(14);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 50 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(45);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(98);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(109);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(21);
var dPs = __webpack_require__(102);
var enumBugKeys = __webpack_require__(49);
var IE_PROTO = __webpack_require__(47)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(68)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(103).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(16).f;
var has = __webpack_require__(17);
var TAG = __webpack_require__(12)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(12);


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(14);
var core = __webpack_require__(11);
var LIBRARY = __webpack_require__(53);
var wksExt = __webpack_require__(56);
var defineProperty = __webpack_require__(16).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (undefined !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = undefined;

var _inDOM = __webpack_require__(15);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transform = 'transform';
var prefix = void 0,
    transitionEnd = void 0,
    animationEnd = void 0;
var transitionProperty = void 0,
    transitionDuration = void 0,
    transitionTiming = void 0,
    transitionDelay = void 0;
var animationName = void 0,
    animationDuration = void 0,
    animationTiming = void 0,
    animationDelay = void 0;

if (_inDOM2.default) {
  var _getTransitionPropert = getTransitionProperties();

  prefix = _getTransitionPropert.prefix;
  exports.transitionEnd = transitionEnd = _getTransitionPropert.transitionEnd;
  exports.animationEnd = animationEnd = _getTransitionPropert.animationEnd;


  exports.transform = transform = prefix + '-' + transform;
  exports.transitionProperty = transitionProperty = prefix + '-transition-property';
  exports.transitionDuration = transitionDuration = prefix + '-transition-duration';
  exports.transitionDelay = transitionDelay = prefix + '-transition-delay';
  exports.transitionTiming = transitionTiming = prefix + '-transition-timing-function';

  exports.animationName = animationName = prefix + '-animation-name';
  exports.animationDuration = animationDuration = prefix + '-animation-duration';
  exports.animationTiming = animationTiming = prefix + '-animation-delay';
  exports.animationDelay = animationDelay = prefix + '-animation-timing-function';
}

exports.transform = transform;
exports.transitionProperty = transitionProperty;
exports.transitionTiming = transitionTiming;
exports.transitionDelay = transitionDelay;
exports.transitionDuration = transitionDuration;
exports.transitionEnd = transitionEnd;
exports.animationName = animationName;
exports.animationDuration = animationDuration;
exports.animationTiming = animationTiming;
exports.animationDelay = animationDelay;
exports.animationEnd = animationEnd;
exports.default = {
  transform: transform,
  end: transitionEnd,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration
};


function getTransitionProperties() {
  var style = document.createElement('div').style;

  var vendorMap = {
    O: function O(e) {
      return 'o' + e.toLowerCase();
    },
    Moz: function Moz(e) {
      return e.toLowerCase();
    },
    Webkit: function Webkit(e) {
      return 'webkit' + e;
    },
    ms: function ms(e) {
      return 'MS' + e;
    }
  };

  var vendors = Object.keys(vendorMap);

  var transitionEnd = void 0,
      animationEnd = void 0;
  var prefix = '';

  for (var i = 0; i < vendors.length; i++) {
    var vendor = vendors[i];

    if (vendor + 'TransitionProperty' in style) {
      prefix = '-' + vendor.toLowerCase();
      transitionEnd = vendorMap[vendor]('TransitionEnd');
      animationEnd = vendorMap[vendor]('AnimationEnd');
      break;
    }
  }

  if (!transitionEnd && 'transitionProperty' in style) transitionEnd = 'transitionend';

  if (!animationEnd && 'animationName' in style) animationEnd = 'animationend';

  style = null;

  return { animationEnd: animationEnd, transitionEnd: transitionEnd, prefix: prefix };
}

/***/ }),
/* 62 */
/***/ (function(module, exports) {

// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

exports = module.exports = function(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) searchInput = hasKeyCode
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput)

  // check codes
  var foundNamedKey = codes[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'left command': 91,
  'right command': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222
}

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 34,
  'ins': 45,
  'del': 46,
  'cmd': 91
}


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {} // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias]
}


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(15);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var on = function on() {};
if (_inDOM2.default) {
  on = function () {

    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.addEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.attachEvent('on' + eventName, function (e) {
        e = e || window.event;
        e.target = e.target || e.srcElement;
        e.currentTarget = node;
        handler.call(node, e);
      });
    };
  }();
}

exports.default = on;
module.exports = exports['default'];

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(15);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var off = function off() {};
if (_inDOM2.default) {
  off = function () {
    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.removeEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.detachEvent('on' + eventName, handler);
    };
  }();
}

exports.default = off;
module.exports = exports['default'];

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _createChainableTypeChecker = __webpack_require__(174);

var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function elementType(props, propName, componentName, location, propFullName) {
  var propValue = props[propName];
  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);

  if (_react2.default.isValidElement(propValue)) {
    return new Error('Invalid ' + location + ' `' + propFullName + '` of type ReactElement ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + 'or a ReactClass).');
  }

  if (propType !== 'function' && propType !== 'string') {
    return new Error('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + 'or a ReactClass).');
  }

  return null;
}

exports.default = (0, _createChainableTypeChecker2.default)(elementType);

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(92), __esModule: true };

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(23) && !__webpack_require__(28)(function () {
  return Object.defineProperty(__webpack_require__(68)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(22);
var document = __webpack_require__(14).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(17);
var toIObject = __webpack_require__(18);
var arrayIndexOf = __webpack_require__(96)(false);
var IE_PROTO = __webpack_require__(47)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(44);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(46);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(100)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(73)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(53);
var $export = __webpack_require__(13);
var redefine = __webpack_require__(74);
var hide = __webpack_require__(20);
var has = __webpack_require__(17);
var Iterators = __webpack_require__(32);
var $iterCreate = __webpack_require__(101);
var setToStringTag = __webpack_require__(55);
var getPrototypeOf = __webpack_require__(104);
var ITERATOR = __webpack_require__(12)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(69);
var hiddenKeys = __webpack_require__(49).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(31);
var createDesc = __webpack_require__(29);
var toIObject = __webpack_require__(18);
var toPrimitive = __webpack_require__(43);
var has = __webpack_require__(17);
var IE8_DOM_DEFINE = __webpack_require__(67);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(23) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(58);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (undefined !== 'production') {
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
}

module.exports = warning;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(132), __esModule: true };

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(30);
var toIObject = __webpack_require__(18);
var isEnum = __webpack_require__(31).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = camelizeStyleName;

var _camelize = __webpack_require__(138);

var _camelize2 = _interopRequireDefault(_camelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var msPattern = /^-ms-/; /**
                          * Copyright 2014-2015, Facebook, Inc.
                          * All rights reserved.
                          * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
                          */
function camelizeStyleName(string) {
  return (0, _camelize2.default)(string.replace(msPattern, 'ms-'));
}
module.exports = exports['default'];

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = undefined;

var _propTypes = __webpack_require__(7);

var PropTypes = _interopRequireWildcard(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(9);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _PropTypes = __webpack_require__(144);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UNMOUNTED = exports.UNMOUNTED = 'unmounted';
var EXITED = exports.EXITED = 'exited';
var ENTERING = exports.ENTERING = 'entering';
var ENTERED = exports.ENTERED = 'entered';
var EXITING = exports.EXITING = 'exiting';

/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the components.
 * It's up to you to give meaning and effect to those states. For example we can
 * add styles to a component when it enters or exits:
 *
 * ```jsx
 * import Transition from 'react-transition-group/Transition';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 0 },
 *   entered:  { opacity: 1 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {(state) => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm A fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * As noted the `Transition` component doesn't _do_ anything by itself to its child component.
 * What it does do is track transition states over time so you can update the
 * component (such as by adding styles or classes) when it changes states.
 *
 * There are 4 main states a Transition can be in:
 *  - `ENTERING`
 *  - `ENTERED`
 *  - `EXITING`
 *  - `EXITED`
 *
 * Transition state is toggled via the `in` prop. When `true` the component begins the
 * "Enter" stage. During this stage, the component will shift from its current transition state,
 * to `'entering'` for the duration of the transition and then to the `'entered'` stage once
 * it's complete. Let's take the following example:
 *
 * ```jsx
 * state= { in: false };
 *
 * toggleEnterState = () => {
 *   this.setState({ in: true });
 * }
 *
 * render() {
 *   return (
 *     <div>
 *       <Transition in={this.state.in} timeout={500} />
 *       <button onClick={this.toggleEnterState}>Click to Enter</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state and
 * stay there for 500ms (the value of `timeout`) when finally switches to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from `'exiting'` to `'exited'`.
 */

var Transition = function (_React$Component) {
  _inherits(Transition, _React$Component);

  function Transition(props, context) {
    _classCallCheck(this, Transition);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    var parentGroup = context.transitionGroup;
    // In the context of a TransitionGroup all enters are really appears
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;

    var initialStatus = void 0;
    _this.nextStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.nextStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = { status: initialStatus };

    _this.nextCallback = null;
    return _this;
  }

  Transition.prototype.getChildContext = function getChildContext() {
    return { transitionGroup: null }; // allows for nested Transitions
  };

  Transition.prototype.componentDidMount = function componentDidMount() {
    this.updateStatus(true);
  };

  Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _ref = this.pendingState || this.state,
        status = _ref.status;

    if (nextProps.in) {
      if (status === UNMOUNTED) {
        this.setState({ status: EXITED });
      }
      if (status !== ENTERING && status !== ENTERED) {
        this.nextStatus = ENTERING;
      }
    } else {
      if (status === ENTERING || status === ENTERED) {
        this.nextStatus = EXITING;
      }
    }
  };

  Transition.prototype.componentDidUpdate = function componentDidUpdate() {
    this.updateStatus();
  };

  Transition.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  Transition.prototype.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;

    var exit = void 0,
        enter = void 0,
        appear = void 0;

    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter;
      appear = timeout.appear;
    }
    return { exit: exit, enter: enter, appear: appear };
  };

  Transition.prototype.updateStatus = function updateStatus() {
    var mounting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var nextStatus = this.nextStatus;

    if (nextStatus !== null) {
      this.nextStatus = null;
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();
      var node = _reactDom2.default.findDOMNode(this);

      if (nextStatus === ENTERING) {
        this.performEnter(node, mounting);
      } else {
        this.performExit(node);
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({ status: UNMOUNTED });
    }
  };

  Transition.prototype.performEnter = function performEnter(node, mounting) {
    var _this2 = this;

    var enter = this.props.enter;

    var appearing = this.context.transitionGroup ? this.context.transitionGroup.isMounting : mounting;

    var timeouts = this.getTimeouts();

    // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set
    if (!mounting && !enter) {
      this.safeSetState({ status: ENTERED }, function () {
        _this2.props.onEntered(node);
      });
      return;
    }

    this.props.onEnter(node, appearing);

    this.safeSetState({ status: ENTERING }, function () {
      _this2.props.onEntering(node, appearing);

      // FIXME: appear timeout?
      _this2.onTransitionEnd(node, timeouts.enter, function () {
        _this2.safeSetState({ status: ENTERED }, function () {
          _this2.props.onEntered(node, appearing);
        });
      });
    });
  };

  Transition.prototype.performExit = function performExit(node) {
    var _this3 = this;

    var exit = this.props.exit;

    var timeouts = this.getTimeouts();

    // no exit animation skip right to EXITED
    if (!exit) {
      this.safeSetState({ status: EXITED }, function () {
        _this3.props.onExited(node);
      });
      return;
    }
    this.props.onExit(node);

    this.safeSetState({ status: EXITING }, function () {
      _this3.props.onExiting(node);

      _this3.onTransitionEnd(node, timeouts.exit, function () {
        _this3.safeSetState({ status: EXITED }, function () {
          _this3.props.onExited(node);
        });
      });
    });
  };

  Transition.prototype.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  Transition.prototype.safeSetState = function safeSetState(nextState, callback) {
    var _this4 = this;

    // We need to track pending updates for instances where a cWRP fires quickly
    // after cDM and before the state flushes, which would double trigger a
    // transition
    this.pendingState = nextState;

    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, function () {
      _this4.pendingState = null;
      callback();
    });
  };

  Transition.prototype.setNextCallback = function setNextCallback(callback) {
    var _this5 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this5.nextCallback = null;

        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  Transition.prototype.onTransitionEnd = function onTransitionEnd(node, timeout, handler) {
    this.setNextCallback(handler);

    if (node) {
      if (this.props.addEndListener) {
        this.props.addEndListener(node, this.nextCallback);
      }
      if (timeout != null) {
        setTimeout(this.nextCallback, timeout);
      }
    } else {
      setTimeout(this.nextCallback, 0);
    }
  };

  Transition.prototype.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }

    var _props = this.props,
        children = _props.children,
        childProps = _objectWithoutProperties(_props, ['children']);
    // filter props for Transtition


    delete childProps.in;
    delete childProps.mountOnEnter;
    delete childProps.unmountOnExit;
    delete childProps.appear;
    delete childProps.enter;
    delete childProps.exit;
    delete childProps.timeout;
    delete childProps.addEndListener;
    delete childProps.onEnter;
    delete childProps.onEntering;
    delete childProps.onEntered;
    delete childProps.onExit;
    delete childProps.onExiting;
    delete childProps.onExited;

    if (typeof children === 'function') {
      return children(status, childProps);
    }

    var child = _react2.default.Children.only(children);
    return _react2.default.cloneElement(child, childProps);
  };

  return Transition;
}(_react2.default.Component);

Transition.contextTypes = {
  transitionGroup: PropTypes.object
};
Transition.childContextTypes = {
  transitionGroup: function transitionGroup() {}
};


Transition.propTypes = undefined !== "production" ? {
  /**
   * A `function` child can be used instead of a React element.
   * This function is called with the current transition status
   * ('entering', 'entered', 'exiting', 'exited', 'unmounted'), which can used
   * to apply context specific props to a component.
   *
   * ```jsx
   * <Transition timeout={150}>
   *   {(status) => (
   *     <MyComponent className={`fade fade-${status}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.element.isRequired]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: PropTypes.bool,

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Normally a component is not transitioned if it is shown when the `<Transition>` component mounts.
   * If you want to transition on the first mount set `appear` to `true`, and the
   * component will transition in as soon as the `<Transition>` mounts.
   *
   * > Note: there are no specific "appear" states. `appear` only adds an additional `enter` transition.
   */
  appear: PropTypes.bool,

  /**
   * Enable or disable enter transitions.
   */
  enter: PropTypes.bool,

  /**
   * Enable or disable exit transitions.
   */
  exit: PropTypes.bool,

  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEventListener` is provided
   *
   * You may specify a single timeout for all transitions like: `timeout={500}`,
   * or individually like:
   *
   * ```jsx
   * timeout={{
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * @type {number | { enter?: number, exit?: number }}
   */
  timeout: function timeout(props) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var pt = _PropTypes.timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;
    return pt.apply(undefined, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. **Note:** Timeouts are still used as a fallback if provided.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: PropTypes.func,

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: PropTypes.func,

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the "exited" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: PropTypes.func
} : {};

// Name the function so it is clearer in the documentation
function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,

  onEnter: noop,
  onEntering: noop,
  onEntered: noop,

  onExit: noop,
  onExiting: noop,
  onExited: noop
};

Transition.UNMOUNTED = 0;
Transition.EXITED = 1;
Transition.ENTERING = 2;
Transition.ENTERED = 3;
Transition.EXITING = 4;

exports.default = Transition;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = activeElement;

var _ownerDocument = __webpack_require__(25);

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function activeElement() {
  var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _ownerDocument2.default)();

  try {
    return doc.activeElement;
  } catch (e) {/* ie throws if no active element */}
}
module.exports = exports['default'];

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _contains = __webpack_require__(26);

var _contains2 = _interopRequireDefault(_contains);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(9);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _addEventListener = __webpack_require__(84);

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _ownerDocument = __webpack_require__(27);

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var escapeKeyCode = 27;

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/**
 * The `<RootCloseWrapper/>` component registers your callback on the document
 * when rendered. Powers the `<Overlay/>` component. This is used achieve modal
 * style behavior where your callback is triggered when the user tries to
 * interact with the rest of the document or hits the `esc` key.
 */

var RootCloseWrapper = function (_React$Component) {
  _inherits(RootCloseWrapper, _React$Component);

  function RootCloseWrapper(props, context) {
    _classCallCheck(this, RootCloseWrapper);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.addEventListeners = function () {
      var event = _this.props.event;

      var doc = (0, _ownerDocument2.default)(_this);

      // Use capture for this listener so it fires before React's listener, to
      // avoid false positives in the contains() check below if the target DOM
      // element is removed in the React mouse callback.
      _this.documentMouseCaptureListener = (0, _addEventListener2.default)(doc, event, _this.handleMouseCapture, true);

      _this.documentMouseListener = (0, _addEventListener2.default)(doc, event, _this.handleMouse);

      _this.documentKeyupListener = (0, _addEventListener2.default)(doc, 'keyup', _this.handleKeyUp);
    };

    _this.removeEventListeners = function () {
      if (_this.documentMouseCaptureListener) {
        _this.documentMouseCaptureListener.remove();
      }

      if (_this.documentMouseListener) {
        _this.documentMouseListener.remove();
      }

      if (_this.documentKeyupListener) {
        _this.documentKeyupListener.remove();
      }
    };

    _this.handleMouseCapture = function (e) {
      _this.preventMouseRootClose = isModifiedEvent(e) || !isLeftClickEvent(e) || (0, _contains2.default)(_reactDom2.default.findDOMNode(_this), e.target);
    };

    _this.handleMouse = function (e) {
      if (!_this.preventMouseRootClose && _this.props.onRootClose) {
        _this.props.onRootClose(e);
      }
    };

    _this.handleKeyUp = function (e) {
      if (e.keyCode === escapeKeyCode && _this.props.onRootClose) {
        _this.props.onRootClose(e);
      }
    };

    _this.preventMouseRootClose = false;
    return _this;
  }

  RootCloseWrapper.prototype.componentDidMount = function componentDidMount() {
    if (!this.props.disabled) {
      this.addEventListeners();
    }
  };

  RootCloseWrapper.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (!this.props.disabled && prevProps.disabled) {
      this.addEventListeners();
    } else if (this.props.disabled && !prevProps.disabled) {
      this.removeEventListeners();
    }
  };

  RootCloseWrapper.prototype.componentWillUnmount = function componentWillUnmount() {
    if (!this.props.disabled) {
      this.removeEventListeners();
    }
  };

  RootCloseWrapper.prototype.render = function render() {
    return this.props.children;
  };

  return RootCloseWrapper;
}(_react2.default.Component);

RootCloseWrapper.displayName = 'RootCloseWrapper';

RootCloseWrapper.propTypes = {
  /**
   * Callback fired after click or mousedown. Also triggers when user hits `esc`.
   */
  onRootClose: _propTypes2.default.func,
  /**
   * Children to render.
   */
  children: _propTypes2.default.element,
  /**
   * Disable the the RootCloseWrapper, preventing it from triggering `onRootClose`.
   */
  disabled: _propTypes2.default.bool,
  /**
   * Choose which document mouse event to bind to.
   */
  event: _propTypes2.default.oneOf(['click', 'mousedown'])
};

RootCloseWrapper.defaultProps = {
  event: 'click'
};

exports.default = RootCloseWrapper;
module.exports = exports['default'];

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (node, event, handler, capture) {
  (0, _on2.default)(node, event, handler, capture);

  return {
    remove: function remove() {
      (0, _off2.default)(node, event, handler, capture);
    }
  };
};

var _on = __webpack_require__(63);

var _on2 = _interopRequireDefault(_on);

var _off = __webpack_require__(64);

var _off2 = _interopRequireDefault(_off);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (recalc) {
  if (!size && size !== 0 || recalc) {
    if (_inDOM2.default) {
      var scrollDiv = document.createElement('div');

      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';

      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
};

var _inDOM = __webpack_require__(15);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var size = void 0;

module.exports = exports['default'];

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasClass;
function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);else return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}
module.exports = exports["default"];

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = isOverflowing;

var _isWindow = __webpack_require__(40);

var _isWindow2 = _interopRequireDefault(_isWindow);

var _ownerDocument = __webpack_require__(25);

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBody(node) {
  return node && node.tagName.toLowerCase() === 'body';
}

function bodyIsOverflowing(node) {
  var doc = (0, _ownerDocument2.default)(node);
  var win = (0, _isWindow2.default)(doc);
  var fullWidth = win.innerWidth;

  // Support: ie8, no innerWidth
  if (!fullWidth) {
    var documentElementRect = doc.documentElement.getBoundingClientRect();
    fullWidth = documentElementRect.right - Math.abs(documentElementRect.left);
  }

  return doc.body.clientWidth < fullWidth;
}

function isOverflowing(container) {
  var win = (0, _isWindow2.default)(container);

  return win || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
}
module.exports = exports['default'];

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _componentOrElement = __webpack_require__(39);

var _componentOrElement2 = _interopRequireDefault(_componentOrElement);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(9);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _getContainer = __webpack_require__(41);

var _getContainer2 = _interopRequireDefault(_getContainer);

var _ownerDocument = __webpack_require__(27);

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

var _LegacyPortal = __webpack_require__(165);

var _LegacyPortal2 = _interopRequireDefault(_LegacyPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `<Portal/>` component renders its children into a new "subtree" outside of current component hierarchy.
 * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.
 * The children of `<Portal/>` component will be appended to the `container` specified.
 */
var Portal = function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal() {
    var _temp, _this, _ret;

    _classCallCheck(this, Portal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.setContainer = function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;

      _this._portalContainerNode = (0, _getContainer2.default)(props.container, (0, _ownerDocument2.default)(_this).body);
    }, _this.getMountNode = function () {
      return _this._portalContainerNode;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Portal.prototype.componentDidMount = function componentDidMount() {
    this.setContainer();
    this.forceUpdate(this.props.onRendered);
  };

  Portal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.container !== this.props.container) {
      this.setContainer(nextProps);
    }
  };

  Portal.prototype.componentWillUnmount = function componentWillUnmount() {
    this._portalContainerNode = null;
  };

  Portal.prototype.render = function render() {
    return this.props.children && this._portalContainerNode ? _reactDom2.default.createPortal(this.props.children, this._portalContainerNode) : null;
  };

  return Portal;
}(_react2.default.Component);

Portal.displayName = 'Portal';
Portal.propTypes = {
  /**
   * A Node, Component instance, or function that returns either. The `container` will have the Portal children
   * appended to it.
   */
  container: _propTypes2.default.oneOfType([_componentOrElement2.default, _propTypes2.default.func]),

  onRendered: _propTypes2.default.func
};
exports.default = _reactDom2.default.createPortal ? Portal : _LegacyPortal2.default;
module.exports = exports['default'];

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = offset;

var _contains = __webpack_require__(26);

var _contains2 = _interopRequireDefault(_contains);

var _isWindow = __webpack_require__(40);

var _isWindow2 = _interopRequireDefault(_isWindow);

var _ownerDocument = __webpack_require__(25);

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function offset(node) {
  var doc = (0, _ownerDocument2.default)(node),
      win = (0, _isWindow2.default)(doc),
      docElem = doc && doc.documentElement,
      box = { top: 0, left: 0, height: 0, width: 0 };

  if (!doc) return;

  // Make sure it's not a disconnected DOM node
  if (!(0, _contains2.default)(docElem, node)) return box;

  if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect();

  // IE8 getBoundingClientRect doesn't support width & height
  box = {
    top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
    left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
    width: (box.width == null ? node.offsetWidth : box.width) || 0,
    height: (box.height == null ? node.offsetHeight : box.height) || 0
  };

  return box;
}
module.exports = exports['default'];

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollTop;

var _isWindow = __webpack_require__(40);

var _isWindow2 = _interopRequireDefault(_isWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollTop(node, val) {
  var win = (0, _isWindow2.default)(node);

  if (val === undefined) return win ? 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;

  if (win) win.scrollTo('pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
}
module.exports = exports['default'];

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var bootstrapUtils_namespaceObject = {};
__webpack_require__.d(bootstrapUtils_namespaceObject, "prefix", function() { return prefix; });
__webpack_require__.d(bootstrapUtils_namespaceObject, "bsClass", function() { return bootstrapUtils_bsClass; });
__webpack_require__.d(bootstrapUtils_namespaceObject, "bsStyles", function() { return bsStyles; });
__webpack_require__.d(bootstrapUtils_namespaceObject, "bsSizes", function() { return bsSizes; });
__webpack_require__.d(bootstrapUtils_namespaceObject, "getClassSet", function() { return getClassSet; });
__webpack_require__.d(bootstrapUtils_namespaceObject, "splitBsProps", function() { return splitBsProps; });
__webpack_require__.d(bootstrapUtils_namespaceObject, "splitBsPropsAndOmit", function() { return splitBsPropsAndOmit; });
__webpack_require__.d(bootstrapUtils_namespaceObject, "addStyle", function() { return addStyle; });
__webpack_require__.d(bootstrapUtils_namespaceObject, "_curry", function() { return _curry; });
var utils_namespaceObject = {};
__webpack_require__.d(utils_namespaceObject, "bootstrapUtils", function() { return bootstrapUtils_namespaceObject; });
__webpack_require__.d(utils_namespaceObject, "createChainedFunction", function() { return utils_createChainedFunction; });
__webpack_require__.d(utils_namespaceObject, "ValidComponentChildren", function() { return ValidComponentChildren; });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(4);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(1);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(2);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/inherits.js
var inherits = __webpack_require__(3);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}
var external___root___React___commonjs2___react___commonjs___react___amd___react__ = __webpack_require__(0);
var external___root___React___commonjs2___react___commonjs___react___amd___react___default = /*#__PURE__*/__webpack_require__.n(external___root___React___commonjs2___react___commonjs___react___amd___react__);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(5);
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(6);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(7);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/uncontrollable/index.js
var uncontrollable = __webpack_require__(19);
var uncontrollable_default = /*#__PURE__*/__webpack_require__.n(uncontrollable);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/entries.js
var entries = __webpack_require__(78);
var entries_default = /*#__PURE__*/__webpack_require__.n(entries);

// EXTERNAL MODULE: ./node_modules/invariant/browser.js
var browser = __webpack_require__(35);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// CONCATENATED MODULE: ./src/utils/StyleConfig.js
var Size = {
  LARGE: 'large',
  SMALL: 'small',
  XSMALL: 'xsmall'
};

var SIZE_MAP = {
  large: 'lg',
  medium: 'md',
  small: 'sm',
  xsmall: 'xs',
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xs: 'xs'
};

var DEVICE_SIZES = ['lg', 'md', 'sm', 'xs'];

var State = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info'
};

var Style = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  LINK: 'link',
  INVERSE: 'inverse'
};
// CONCATENATED MODULE: ./src/utils/bootstrapUtils.js


// TODO: The publicly exposed parts of this should be in lib/BootstrapUtils.






function curry(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var last = args[args.length - 1];
    if (typeof last === 'function') {
      return fn.apply(undefined, args);
    }
    return function (Component) {
      return fn.apply(undefined, args.concat([Component]));
    };
  };
}

function prefix(props, variant) {
  var bsClass = (props.bsClass || '').trim();
  !(bsClass != null) ? undefined !== 'production' ? browser_default()(false, 'A `bsClass` prop is required for this component') : browser_default()(false) : void 0;
  return bsClass + (variant ? '-' + variant : '');
}

var bootstrapUtils_bsClass = curry(function (defaultClass, Component) {
  var propTypes = Component.propTypes || (Component.propTypes = {});
  var defaultProps = Component.defaultProps || (Component.defaultProps = {});

  propTypes.bsClass = prop_types_default.a.string;
  defaultProps.bsClass = defaultClass;

  return Component;
});

var bsStyles = curry(function (styles, defaultStyle, Component) {
  if (typeof defaultStyle !== 'string') {
    Component = defaultStyle;
    defaultStyle = undefined;
  }

  var existing = Component.STYLES || [];
  var propTypes = Component.propTypes || {};

  styles.forEach(function (style) {
    if (existing.indexOf(style) === -1) {
      existing.push(style);
    }
  });

  var propType = prop_types_default.a.oneOf(existing);

  // expose the values on the propType function for documentation
  Component.STYLES = existing;
  propType._values = existing;

  Component.propTypes = extends_default()({}, propTypes, {
    bsStyle: propType
  });

  if (defaultStyle !== undefined) {
    var defaultProps = Component.defaultProps || (Component.defaultProps = {});
    defaultProps.bsStyle = defaultStyle;
  }

  return Component;
});

var bsSizes = curry(function (sizes, defaultSize, Component) {
  if (typeof defaultSize !== 'string') {
    Component = defaultSize;
    defaultSize = undefined;
  }

  var existing = Component.SIZES || [];
  var propTypes = Component.propTypes || {};

  sizes.forEach(function (size) {
    if (existing.indexOf(size) === -1) {
      existing.push(size);
    }
  });

  var values = [];
  existing.forEach(function (size) {
    var mappedSize = SIZE_MAP[size];
    if (mappedSize && mappedSize !== size) {
      values.push(mappedSize);
    }

    values.push(size);
  });

  var propType = prop_types_default.a.oneOf(values);
  propType._values = values;

  // expose the values on the propType function for documentation
  Component.SIZES = existing;

  Component.propTypes = extends_default()({}, propTypes, {
    bsSize: propType
  });

  if (defaultSize !== undefined) {
    if (!Component.defaultProps) {
      Component.defaultProps = {};
    }
    Component.defaultProps.bsSize = defaultSize;
  }

  return Component;
});

function getClassSet(props) {
  var _classes;

  var classes = (_classes = {}, _classes[prefix(props)] = true, _classes);

  if (props.bsSize) {
    var bsSize = SIZE_MAP[props.bsSize] || props.bsSize;
    classes[prefix(props, bsSize)] = true;
  }

  if (props.bsStyle) {
    classes[prefix(props, props.bsStyle)] = true;
  }

  return classes;
}

function getBsProps(props) {
  return {
    bsClass: props.bsClass,
    bsSize: props.bsSize,
    bsStyle: props.bsStyle,
    bsRole: props.bsRole
  };
}

function isBsProp(propName) {
  return propName === 'bsClass' || propName === 'bsSize' || propName === 'bsStyle' || propName === 'bsRole';
}

function splitBsProps(props) {
  var elementProps = {};
  entries_default()(props).forEach(function (_ref) {
    var propName = _ref[0],
        propValue = _ref[1];

    if (!isBsProp(propName)) {
      elementProps[propName] = propValue;
    }
  });

  return [getBsProps(props), elementProps];
}

function splitBsPropsAndOmit(props, omittedPropNames) {
  var isOmittedProp = {};
  omittedPropNames.forEach(function (propName) {
    isOmittedProp[propName] = true;
  });

  var elementProps = {};
  entries_default()(props).forEach(function (_ref2) {
    var propName = _ref2[0],
        propValue = _ref2[1];

    if (!isBsProp(propName) && !isOmittedProp[propName]) {
      elementProps[propName] = propValue;
    }
  });

  return [getBsProps(props), elementProps];
}

/**
 * Add a style variant to a Component. Mutates the propTypes of the component
 * in order to validate the new variant.
 */
function addStyle(Component) {
  for (var _len2 = arguments.length, styleVariant = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    styleVariant[_key2 - 1] = arguments[_key2];
  }

  bsStyles(styleVariant, Component);
}

var _curry = curry;
// CONCATENATED MODULE: ./src/utils/ValidComponentChildren.js
// TODO: This module should be ElementChildren, and should use named exports.



/**
 * Iterates through children that are typically specified as `props.children`,
 * but only maps over children that are "valid components".
 *
 * The mapFunction provided index will be normalised to the components mapped,
 * so an invalid component would not increase the index.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func.
 * @param {*} context Context for func.
 * @return {object} Object containing the ordered map of results.
 */
function map(children, func, context) {
  var index = 0;

  return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Children.map(children, function (child) {
    if (!external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.isValidElement(child)) {
      return child;
    }

    return func.call(context, child, index++);
  });
}

/**
 * Iterates through children that are "valid components".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func.
 * @param {*} context Context for context.
 */
function forEach(children, func, context) {
  var index = 0;

  external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Children.forEach(children, function (child) {
    if (!external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.isValidElement(child)) {
      return;
    }

    func.call(context, child, index++);
  });
}

/**
 * Count the number of "valid components" in the Children container.
 *
 * @param {?*} children Children tree container.
 * @returns {number}
 */
function ValidComponentChildren_count(children) {
  var result = 0;

  external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Children.forEach(children, function (child) {
    if (!external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.isValidElement(child)) {
      return;
    }

    ++result;
  });

  return result;
}

/**
 * Finds children that are typically specified as `props.children`,
 * but only iterates over children that are "valid components".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func.
 * @param {*} context Context for func.
 * @returns {array} of children that meet the func return statement
 */
function filter(children, func, context) {
  var index = 0;
  var result = [];

  external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Children.forEach(children, function (child) {
    if (!external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.isValidElement(child)) {
      return;
    }

    if (func.call(context, child, index++)) {
      result.push(child);
    }
  });

  return result;
}

function find(children, func, context) {
  var index = 0;
  var result = void 0;

  external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Children.forEach(children, function (child) {
    if (result) {
      return;
    }
    if (!external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.isValidElement(child)) {
      return;
    }

    if (func.call(context, child, index++)) {
      result = child;
    }
  });

  return result;
}

function every(children, func, context) {
  var index = 0;
  var result = true;

  external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Children.forEach(children, function (child) {
    if (!result) {
      return;
    }
    if (!external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.isValidElement(child)) {
      return;
    }

    if (!func.call(context, child, index++)) {
      result = false;
    }
  });

  return result;
}

function some(children, func, context) {
  var index = 0;
  var result = false;

  external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Children.forEach(children, function (child) {
    if (result) {
      return;
    }
    if (!external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.isValidElement(child)) {
      return;
    }

    if (func.call(context, child, index++)) {
      result = true;
    }
  });

  return result;
}

function toArray(children) {
  var result = [];

  external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Children.forEach(children, function (child) {
    if (!external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.isValidElement(child)) {
      return;
    }

    result.push(child);
  });

  return result;
}

/* harmony default export */ var ValidComponentChildren = ({
  map: map,
  forEach: forEach,
  count: ValidComponentChildren_count,
  find: find,
  filter: filter,
  every: every,
  some: some,
  toArray: toArray
});
// EXTERNAL MODULE: ./node_modules/prop-types-extra/lib/utils/createChainableTypeChecker.js
var createChainableTypeChecker = __webpack_require__(36);
var createChainableTypeChecker_default = /*#__PURE__*/__webpack_require__.n(createChainableTypeChecker);

// CONCATENATED MODULE: ./src/utils/PropTypes.js





var idPropType = prop_types_default.a.oneOfType([prop_types_default.a.string, prop_types_default.a.number]);

function generatedId(name) {
  return function (props) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var error = null;

    if (!props.generateChildId) {
      error = idPropType.apply(undefined, [props].concat(args));

      if (!error && !props.id) {
        error = new Error('In order to properly initialize the ' + name + ' in a way that is accessible to assistive technologies ' + ('(such as screen readers) an `id` or a `generateChildId` prop to ' + name + ' is required'));
      }
    }
    return error;
  };
}

function requiredRoles() {
  for (var _len2 = arguments.length, roles = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    roles[_key2] = arguments[_key2];
  }

  return createChainableTypeChecker_default()(function (props, propName, component) {
    var missing = void 0;

    roles.every(function (role) {
      if (!ValidComponentChildren.some(props.children, function (child) {
        return child.props.bsRole === role;
      })) {
        missing = role;
        return false;
      }

      return true;
    });

    if (missing) {
      return new Error('(children) ' + component + ' - Missing a required child with bsRole: ' + (missing + '. ' + component + ' must have at least one child of each of ') + ('the following bsRoles: ' + roles.join(', ')));
    }

    return null;
  });
}

function exclusiveRoles() {
  for (var _len3 = arguments.length, roles = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    roles[_key3] = arguments[_key3];
  }

  return createChainableTypeChecker_default()(function (props, propName, component) {
    var duplicate = void 0;

    roles.every(function (role) {
      var childrenWithRole = ValidComponentChildren.filter(props.children, function (child) {
        return child.props.bsRole === role;
      });

      if (childrenWithRole.length > 1) {
        duplicate = role;
        return false;
      }

      return true;
    });

    if (duplicate) {
      return new Error('(children) ' + component + ' - Duplicate children detected of bsRole: ' + (duplicate + '. Only one child each allowed with the following ') + ('bsRoles: ' + roles.join(', ')));
    }

    return null;
  });
}
// CONCATENATED MODULE: ./src/PanelGroup.js














var PanelGroup_propTypes = {
  accordion: prop_types_default.a.bool,
  /**
   * When `accordion` is enabled, `activeKey` controls the which child `Panel` is expanded. `activeKey` should
   * match a child Panel `eventKey` prop exactly.
   *
   * @controllable onSelect
   */
  activeKey: prop_types_default.a.any,

  /**
   * A callback fired when a child Panel collapse state changes. It's called with the next expanded `activeKey`
   *
   * @controllable activeKey
   */
  onSelect: prop_types_default.a.func,

  /**
   * An HTML role attribute
   */
  role: prop_types_default.a.string,

  /**
   * A function that takes an eventKey and type and returns a
   * unique id for each Panel heading and Panel Collapse. The function _must_ be a pure function,
   * meaning it should always return the _same_ id for the same set of inputs. The default
   * value requires that an `id` to be set for the PanelGroup.
   *
   * The `type` argument will either be `"body"` or `"heading"`.
   *
   * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${key}`
   */
  generateChildId: prop_types_default.a.func,

  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   */
  id: generatedId('PanelGroup')
};

var PanelGroup_defaultProps = {
  accordion: false
};

var childContextTypes = {
  $bs_panelGroup: prop_types_default.a.shape({
    getId: prop_types_default.a.func,
    headerRole: prop_types_default.a.string,
    panelRole: prop_types_default.a.string,
    activeKey: prop_types_default.a.any,
    onToggle: prop_types_default.a.func
  })
};

var PanelGroup_PanelGroup = function (_React$Component) {
  inherits_default()(PanelGroup, _React$Component);

  function PanelGroup(props, context) {
    classCallCheck_default()(this, PanelGroup);

    var _this = possibleConstructorReturn_default()(this, _React$Component.call(this, props, context));

    _this.handleSelect = _this.handleSelect.bind(_this);
    return _this;
  }

  PanelGroup.prototype.getChildContext = function getChildContext() {
    var _props = this.props,
        activeKey = _props.activeKey,
        accordion = _props.accordion,
        generateChildId = _props.generateChildId,
        id = _props.id;

    var getId = null;

    if (accordion) {
      getId = generateChildId || function (key, type) {
        return id ? id + '-' + type + '-' + key : null;
      };
    }

    return {
      $bs_panelGroup: extends_default()({
        getId: getId,
        headerRole: 'tab',
        panelRole: 'tabpanel'
      }, accordion && {
        activeKey: activeKey,
        onToggle: this.handleSelect
      })
    };
  };

  PanelGroup.prototype.handleSelect = function handleSelect(key, expanded, e) {
    if (expanded) {
      this.props.onSelect(key, e);
    }
  };

  PanelGroup.prototype.render = function render() {
    var _props2 = this.props,
        accordion = _props2.accordion,
        className = _props2.className,
        children = _props2.children,
        props = objectWithoutProperties_default()(_props2, ['accordion', 'className', 'children']);

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['onSelect', 'activeKey']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    if (accordion) {
      elementProps.role = elementProps.role || 'tablist';
    }

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      extends_default()({}, elementProps, { className: classnames_default()(className, classes) }),
      ValidComponentChildren.map(children, function (child) {
        return Object(external___root___React___commonjs2___react___commonjs___react___amd___react__["cloneElement"])(child, {
          bsStyle: child.props.bsStyle || bsProps.bsStyle
        });
      })
    );
  };

  return PanelGroup;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

PanelGroup_PanelGroup.propTypes = PanelGroup_propTypes;
PanelGroup_PanelGroup.defaultProps = PanelGroup_defaultProps;
PanelGroup_PanelGroup.childContextTypes = childContextTypes;

/* harmony default export */ var src_PanelGroup = (uncontrollable_default()(bootstrapUtils_bsClass('panel-group', PanelGroup_PanelGroup), {
  activeKey: 'onSelect'
}));
// CONCATENATED MODULE: ./src/Accordion.js








var Accordion_Accordion = function (_React$Component) {
  inherits_default()(Accordion, _React$Component);

  function Accordion() {
    classCallCheck_default()(this, Accordion);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Accordion.prototype.render = function render() {
    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      src_PanelGroup,
      extends_default()({}, this.props, { accordion: true }),
      this.props.children
    );
  };

  return Accordion;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

/* harmony default export */ var src_Accordion = (Accordion_Accordion);
// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/values.js
var object_values = __webpack_require__(24);
var values_default = /*#__PURE__*/__webpack_require__.n(object_values);

// CONCATENATED MODULE: ./src/CloseButton.js






var CloseButton_propTypes = {
  label: prop_types_default.a.string.isRequired,
  onClick: prop_types_default.a.func
};

var CloseButton_defaultProps = {
  label: 'Close'
};

var CloseButton_CloseButton = function (_React$Component) {
  inherits_default()(CloseButton, _React$Component);

  function CloseButton() {
    classCallCheck_default()(this, CloseButton);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  CloseButton.prototype.render = function render() {
    var _props = this.props,
        label = _props.label,
        onClick = _props.onClick;

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'button',
      { type: 'button', className: 'close', onClick: onClick },
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'span',
        { 'aria-hidden': 'true' },
        '\xD7'
      ),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'span',
        { className: 'sr-only' },
        label
      )
    );
  };

  return CloseButton;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

CloseButton_CloseButton.propTypes = CloseButton_propTypes;
CloseButton_CloseButton.defaultProps = CloseButton_defaultProps;

/* harmony default export */ var src_CloseButton = (CloseButton_CloseButton);
// CONCATENATED MODULE: ./src/Alert.js














var Alert_propTypes = {
  onDismiss: prop_types_default.a.func,
  closeLabel: prop_types_default.a.string
};

var Alert_defaultProps = {
  closeLabel: 'Close alert'
};

var Alert_Alert = function (_React$Component) {
  inherits_default()(Alert, _React$Component);

  function Alert() {
    classCallCheck_default()(this, Alert);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Alert.prototype.render = function render() {
    var _extends2;

    var _props = this.props,
        onDismiss = _props.onDismiss,
        closeLabel = _props.closeLabel,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['onDismiss', 'closeLabel', 'className', 'children']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var dismissable = !!onDismiss;
    var classes = extends_default()({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps, 'dismissable')] = dismissable, _extends2));

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      extends_default()({}, elementProps, {
        role: 'alert',
        className: classnames_default()(className, classes)
      }),
      dismissable && external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(src_CloseButton, { onClick: onDismiss, label: closeLabel }),
      children
    );
  };

  return Alert;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Alert_Alert.propTypes = Alert_propTypes;
Alert_Alert.defaultProps = Alert_defaultProps;

/* harmony default export */ var src_Alert = (bsStyles(values_default()(State), State.INFO, bootstrapUtils_bsClass('alert', Alert_Alert)));
// CONCATENATED MODULE: ./src/Badge.js











// TODO: `pullRight` doesn't belong here. There's no special handling here.

var Badge_propTypes = {
  pullRight: prop_types_default.a.bool
};

var Badge_defaultProps = {
  pullRight: false
};

var Badge_Badge = function (_React$Component) {
  inherits_default()(Badge, _React$Component);

  function Badge() {
    classCallCheck_default()(this, Badge);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Badge.prototype.hasContent = function hasContent(children) {
    var result = false;

    external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Children.forEach(children, function (child) {
      if (result) {
        return;
      }

      if (child || child === 0) {
        result = true;
      }
    });

    return result;
  };

  Badge.prototype.render = function render() {
    var _props = this.props,
        pullRight = _props.pullRight,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['pullRight', 'className', 'children']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = extends_default()({}, getClassSet(bsProps), {
      'pull-right': pullRight,

      // Hack for collapsing on IE8.
      hidden: !this.hasContent(children)
    });

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'span',
      extends_default()({}, elementProps, { className: classnames_default()(className, classes) }),
      children
    );
  };

  return Badge;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Badge_Badge.propTypes = Badge_propTypes;
Badge_Badge.defaultProps = Badge_defaultProps;

/* harmony default export */ var src_Badge = (bootstrapUtils_bsClass('badge', Badge_Badge));
// EXTERNAL MODULE: ./node_modules/prop-types-extra/lib/elementType.js
var elementType = __webpack_require__(8);
var elementType_default = /*#__PURE__*/__webpack_require__.n(elementType);

// CONCATENATED MODULE: ./src/utils/createChainedFunction.js
/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.filter(function (f) {
    return f != null;
  }).reduce(function (acc, f) {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }

    if (acc === null) {
      return f;
    }

    return function chainedFunction() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      acc.apply(this, args);
      f.apply(this, args);
    };
  }, null);
}

/* harmony default export */ var utils_createChainedFunction = (createChainedFunction);
// CONCATENATED MODULE: ./src/SafeAnchor.js











var SafeAnchor_propTypes = {
  href: prop_types_default.a.string,
  onClick: prop_types_default.a.func,
  onKeyDown: prop_types_default.a.func,
  disabled: prop_types_default.a.bool,
  role: prop_types_default.a.string,
  tabIndex: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.string]),
  /**
   * this is sort of silly but needed for Button
   */
  componentClass: elementType_default.a
};

var SafeAnchor_defaultProps = {
  componentClass: 'a'
};

function isTrivialHref(href) {
  return !href || href.trim() === '#';
}

/**
 * There are situations due to browser quirks or Bootstrap CSS where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, MenuItems, etc.
 */

var SafeAnchor_SafeAnchor = function (_React$Component) {
  inherits_default()(SafeAnchor, _React$Component);

  function SafeAnchor(props, context) {
    classCallCheck_default()(this, SafeAnchor);

    var _this = possibleConstructorReturn_default()(this, _React$Component.call(this, props, context));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    return _this;
  }

  SafeAnchor.prototype.handleClick = function handleClick(event) {
    var _props = this.props,
        disabled = _props.disabled,
        href = _props.href,
        onClick = _props.onClick;


    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  SafeAnchor.prototype.handleKeyDown = function handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  };

  SafeAnchor.prototype.render = function render() {
    var _props2 = this.props,
        Component = _props2.componentClass,
        disabled = _props2.disabled,
        onKeyDown = _props2.onKeyDown,
        props = objectWithoutProperties_default()(_props2, ['componentClass', 'disabled', 'onKeyDown']);

    if (isTrivialHref(props.href)) {
      props.role = props.role || 'button';
      // we want to make sure there is a href attribute on the node
      // otherwise, the cursor incorrectly styled (except with role='button')
      props.href = props.href || '#';
    }

    if (disabled) {
      props.tabIndex = -1;
      props.style = extends_default()({ pointerEvents: 'none' }, props.style);
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, props, {
      onClick: this.handleClick,
      onKeyDown: utils_createChainedFunction(this.handleKeyDown, onKeyDown)
    }));
  };

  return SafeAnchor;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

SafeAnchor_SafeAnchor.propTypes = SafeAnchor_propTypes;
SafeAnchor_SafeAnchor.defaultProps = SafeAnchor_defaultProps;

/* harmony default export */ var src_SafeAnchor = (SafeAnchor_SafeAnchor);
// CONCATENATED MODULE: ./src/BreadcrumbItem.js











var BreadcrumbItem_propTypes = {
  /**
   * If set to true, renders `span` instead of `a`
   */
  active: prop_types_default.a.bool,
  /**
   * `href` attribute for the inner `a` element
   */
  href: prop_types_default.a.string,
  /**
   * `title` attribute for the inner `a` element
   */
  title: prop_types_default.a.node,
  /**
   * `target` attribute for the inner `a` element
   */
  target: prop_types_default.a.string
};

var BreadcrumbItem_defaultProps = {
  active: false
};

var BreadcrumbItem_BreadcrumbItem = function (_React$Component) {
  inherits_default()(BreadcrumbItem, _React$Component);

  function BreadcrumbItem() {
    classCallCheck_default()(this, BreadcrumbItem);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  BreadcrumbItem.prototype.render = function render() {
    var _props = this.props,
        active = _props.active,
        href = _props.href,
        title = _props.title,
        target = _props.target,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['active', 'href', 'title', 'target', 'className']);

    // Don't try to render these props on non-active <span>.


    var linkProps = { href: href, title: title, target: target };

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'li',
      { className: classnames_default()(className, { active: active }) },
      active ? external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('span', props) : external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(src_SafeAnchor, extends_default()({}, props, linkProps))
    );
  };

  return BreadcrumbItem;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

BreadcrumbItem_BreadcrumbItem.propTypes = BreadcrumbItem_propTypes;
BreadcrumbItem_BreadcrumbItem.defaultProps = BreadcrumbItem_defaultProps;

/* harmony default export */ var src_BreadcrumbItem = (BreadcrumbItem_BreadcrumbItem);
// CONCATENATED MODULE: ./src/Breadcrumb.js











var Breadcrumb_Breadcrumb = function (_React$Component) {
  inherits_default()(Breadcrumb, _React$Component);

  function Breadcrumb() {
    classCallCheck_default()(this, Breadcrumb);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Breadcrumb.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('ol', extends_default()({}, elementProps, {
      role: 'navigation',
      'aria-label': 'breadcrumbs',
      className: classnames_default()(className, classes)
    }));
  };

  return Breadcrumb;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Breadcrumb_Breadcrumb.Item = src_BreadcrumbItem;

/* harmony default export */ var src_Breadcrumb = (bootstrapUtils_bsClass('breadcrumb', Breadcrumb_Breadcrumb));
// CONCATENATED MODULE: ./src/Button.js
















var Button_propTypes = {
  active: prop_types_default.a.bool,
  disabled: prop_types_default.a.bool,
  block: prop_types_default.a.bool,
  onClick: prop_types_default.a.func,
  componentClass: elementType_default.a,
  href: prop_types_default.a.string,
  /**
   * Defines HTML button type attribute
   * @defaultValue 'button'
   */
  type: prop_types_default.a.oneOf(['button', 'reset', 'submit'])
};

var Button_defaultProps = {
  active: false,
  block: false,
  disabled: false
};

var Button_Button = function (_React$Component) {
  inherits_default()(Button, _React$Component);

  function Button() {
    classCallCheck_default()(this, Button);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Button.prototype.renderAnchor = function renderAnchor(elementProps, className) {
    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(src_SafeAnchor, extends_default()({}, elementProps, {
      className: classnames_default()(className, elementProps.disabled && 'disabled')
    }));
  };

  Button.prototype.renderButton = function renderButton(_ref, className) {
    var componentClass = _ref.componentClass,
        elementProps = objectWithoutProperties_default()(_ref, ['componentClass']);

    var Component = componentClass || 'button';

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, {
      type: elementProps.type || 'button',
      className: className
    }));
  };

  Button.prototype.render = function render() {
    var _extends2;

    var _props = this.props,
        active = _props.active,
        block = _props.block,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['active', 'block', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = extends_default()({}, getClassSet(bsProps), (_extends2 = {
      active: active
    }, _extends2[prefix(bsProps, 'block')] = block, _extends2));
    var fullClassName = classnames_default()(className, classes);

    if (elementProps.href) {
      return this.renderAnchor(elementProps, fullClassName);
    }

    return this.renderButton(elementProps, fullClassName);
  };

  return Button;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Button_Button.propTypes = Button_propTypes;
Button_Button.defaultProps = Button_defaultProps;

/* harmony default export */ var src_Button = (bootstrapUtils_bsClass('btn', bsSizes([Size.LARGE, Size.SMALL, Size.XSMALL], bsStyles([].concat(values_default()(State), [Style.DEFAULT, Style.PRIMARY, Style.LINK]), Style.DEFAULT, Button_Button))));
// EXTERNAL MODULE: ./node_modules/prop-types-extra/lib/all.js
var lib_all = __webpack_require__(37);
var all_default = /*#__PURE__*/__webpack_require__.n(lib_all);

// CONCATENATED MODULE: ./src/ButtonGroup.js













var ButtonGroup_propTypes = {
  vertical: prop_types_default.a.bool,
  justified: prop_types_default.a.bool,

  /**
   * Display block buttons; only useful when used with the "vertical" prop.
   * @type {bool}
   */
  block: all_default()(prop_types_default.a.bool, function (_ref) {
    var block = _ref.block,
        vertical = _ref.vertical;
    return block && !vertical ? new Error('`block` requires `vertical` to be set to have any effect') : null;
  })
};

var ButtonGroup_defaultProps = {
  block: false,
  justified: false,
  vertical: false
};

var ButtonGroup_ButtonGroup = function (_React$Component) {
  inherits_default()(ButtonGroup, _React$Component);

  function ButtonGroup() {
    classCallCheck_default()(this, ButtonGroup);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  ButtonGroup.prototype.render = function render() {
    var _extends2;

    var _props = this.props,
        block = _props.block,
        justified = _props.justified,
        vertical = _props.vertical,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['block', 'justified', 'vertical', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = extends_default()({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps)] = !vertical, _extends2[prefix(bsProps, 'vertical')] = vertical, _extends2[prefix(bsProps, 'justified')] = justified, _extends2[prefix(src_Button.defaultProps, 'block')] = block, _extends2));

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('div', extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return ButtonGroup;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

ButtonGroup_ButtonGroup.propTypes = ButtonGroup_propTypes;
ButtonGroup_ButtonGroup.defaultProps = ButtonGroup_defaultProps;

/* harmony default export */ var src_ButtonGroup = (bootstrapUtils_bsClass('btn-group', ButtonGroup_ButtonGroup));
// CONCATENATED MODULE: ./src/ButtonToolbar.js










var ButtonToolbar_ButtonToolbar = function (_React$Component) {
  inherits_default()(ButtonToolbar, _React$Component);

  function ButtonToolbar() {
    classCallCheck_default()(this, ButtonToolbar);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  ButtonToolbar.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('div', extends_default()({}, elementProps, {
      role: 'toolbar',
      className: classnames_default()(className, classes)
    }));
  };

  return ButtonToolbar;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

/* harmony default export */ var src_ButtonToolbar = (bootstrapUtils_bsClass('btn-toolbar', ButtonToolbar_ButtonToolbar));
// CONCATENATED MODULE: ./src/CarouselCaption.js











var CarouselCaption_propTypes = {
  componentClass: elementType_default.a
};

var CarouselCaption_defaultProps = {
  componentClass: 'div'
};

var CarouselCaption_CarouselCaption = function (_React$Component) {
  inherits_default()(CarouselCaption, _React$Component);

  function CarouselCaption() {
    classCallCheck_default()(this, CarouselCaption);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  CarouselCaption.prototype.render = function render() {
    var _props = this.props,
        Component = _props.componentClass,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['componentClass', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return CarouselCaption;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

CarouselCaption_CarouselCaption.propTypes = CarouselCaption_propTypes;
CarouselCaption_CarouselCaption.defaultProps = CarouselCaption_defaultProps;

/* harmony default export */ var src_CarouselCaption = (bootstrapUtils_bsClass('carousel-caption', CarouselCaption_CarouselCaption));
// EXTERNAL MODULE: external {"root":"ReactDOM","commonjs2":"react-dom","commonjs":"react-dom","amd":"react-dom"}
var external___root___ReactDOM___commonjs2___react_dom___commonjs___react_dom___amd___react_dom__ = __webpack_require__(9);
var external___root___ReactDOM___commonjs2___react_dom___commonjs___react_dom___amd___react_dom___default = /*#__PURE__*/__webpack_require__.n(external___root___ReactDOM___commonjs2___react_dom___commonjs___react_dom___amd___react_dom__);

// EXTERNAL MODULE: ./node_modules/dom-helpers/transition/index.js
var dom_helpers_transition = __webpack_require__(136);
var transition_default = /*#__PURE__*/__webpack_require__.n(dom_helpers_transition);

// CONCATENATED MODULE: ./src/CarouselItem.js











var CarouselItem_propTypes = {
  direction: prop_types_default.a.oneOf(['prev', 'next']),
  onAnimateOutEnd: prop_types_default.a.func,
  active: prop_types_default.a.bool,
  animateIn: prop_types_default.a.bool,
  animateOut: prop_types_default.a.bool,
  index: prop_types_default.a.number
};

var CarouselItem_defaultProps = {
  active: false,
  animateIn: false,
  animateOut: false
};

var CarouselItem_CarouselItem = function (_React$Component) {
  inherits_default()(CarouselItem, _React$Component);

  function CarouselItem(props, context) {
    classCallCheck_default()(this, CarouselItem);

    var _this = possibleConstructorReturn_default()(this, _React$Component.call(this, props, context));

    _this.handleAnimateOutEnd = _this.handleAnimateOutEnd.bind(_this);

    _this.state = {
      direction: null
    };

    _this.isUnmounted = false;
    return _this;
  }

  CarouselItem.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({ direction: null });
    }
  };

  CarouselItem.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;

    var active = this.props.active;

    var prevActive = prevProps.active;

    if (!active && prevActive) {
      transition_default.a.end(external___root___ReactDOM___commonjs2___react_dom___commonjs___react_dom___amd___react_dom___default.a.findDOMNode(this), this.handleAnimateOutEnd);
    }

    if (active !== prevActive) {
      setTimeout(function () {
        return _this2.startAnimation();
      }, 20);
    }
  };

  CarouselItem.prototype.componentWillUnmount = function componentWillUnmount() {
    this.isUnmounted = true;
  };

  CarouselItem.prototype.handleAnimateOutEnd = function handleAnimateOutEnd() {
    if (this.isUnmounted) {
      return;
    }

    if (this.props.onAnimateOutEnd) {
      this.props.onAnimateOutEnd(this.props.index);
    }
  };

  CarouselItem.prototype.startAnimation = function startAnimation() {
    if (this.isUnmounted) {
      return;
    }

    this.setState({
      direction: this.props.direction === 'prev' ? 'right' : 'left'
    });
  };

  CarouselItem.prototype.render = function render() {
    var _props = this.props,
        direction = _props.direction,
        active = _props.active,
        animateIn = _props.animateIn,
        animateOut = _props.animateOut,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['direction', 'active', 'animateIn', 'animateOut', 'className']);

    delete props.onAnimateOutEnd;
    delete props.index;

    var classes = {
      item: true,
      active: active && !animateIn || animateOut
    };
    if (direction && active && animateIn) {
      classes[direction] = true;
    }
    if (this.state.direction && (animateIn || animateOut)) {
      classes[this.state.direction] = true;
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('div', extends_default()({}, props, { className: classnames_default()(className, classes) }));
  };

  return CarouselItem;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

CarouselItem_CarouselItem.propTypes = CarouselItem_propTypes;
CarouselItem_CarouselItem.defaultProps = CarouselItem_defaultProps;

/* harmony default export */ var src_CarouselItem = (CarouselItem_CarouselItem);
// CONCATENATED MODULE: ./src/Glyphicon.js











var Glyphicon_propTypes = {
  /**
   * An icon name without "glyphicon-" prefix. See e.g. http://getbootstrap.com/components/#glyphicons
   */
  glyph: prop_types_default.a.string.isRequired
};

var Glyphicon_Glyphicon = function (_React$Component) {
  inherits_default()(Glyphicon, _React$Component);

  function Glyphicon() {
    classCallCheck_default()(this, Glyphicon);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Glyphicon.prototype.render = function render() {
    var _extends2;

    var _props = this.props,
        glyph = _props.glyph,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['glyph', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = extends_default()({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps, glyph)] = true, _extends2));

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('span', extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return Glyphicon;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Glyphicon_Glyphicon.propTypes = Glyphicon_propTypes;

/* harmony default export */ var src_Glyphicon = (bootstrapUtils_bsClass('glyphicon', Glyphicon_Glyphicon));
// CONCATENATED MODULE: ./src/Carousel.js
















// TODO: `slide` should be `animate`.

// TODO: Use uncontrollable.

var Carousel_propTypes = {
  slide: prop_types_default.a.bool,
  indicators: prop_types_default.a.bool,
  /**
   * The amount of time to delay between automatically cycling an item.
   * If `null`, carousel will not automatically cycle.
   */
  interval: prop_types_default.a.number,
  controls: prop_types_default.a.bool,
  pauseOnHover: prop_types_default.a.bool,
  wrap: prop_types_default.a.bool,
  /**
   * Callback fired when the active item changes.
   *
   * ```js
   * (eventKey: any, ?event: Object) => any
   * ```
   *
   * If this callback takes two or more arguments, the second argument will
   * be a persisted event object with `direction` set to the direction of the
   * transition.
   */
  onSelect: prop_types_default.a.func,
  onSlideEnd: prop_types_default.a.func,
  activeIndex: prop_types_default.a.number,
  defaultActiveIndex: prop_types_default.a.number,
  direction: prop_types_default.a.oneOf(['prev', 'next']),
  prevIcon: prop_types_default.a.node,
  /**
   * Label shown to screen readers only, can be used to show the previous element
   * in the carousel.
   * Set to null to deactivate.
   */
  prevLabel: prop_types_default.a.string,
  nextIcon: prop_types_default.a.node,
  /**
   * Label shown to screen readers only, can be used to show the next element
   * in the carousel.
   * Set to null to deactivate.
   */
  nextLabel: prop_types_default.a.string
};

var Carousel_defaultProps = {
  slide: true,
  interval: 5000,
  pauseOnHover: true,
  wrap: true,
  indicators: true,
  controls: true,
  prevIcon: external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(src_Glyphicon, { glyph: 'chevron-left' }),
  prevLabel: 'Previous',
  nextIcon: external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(src_Glyphicon, { glyph: 'chevron-right' }),
  nextLabel: 'Next'
};

var Carousel_Carousel = function (_React$Component) {
  inherits_default()(Carousel, _React$Component);

  function Carousel(props, context) {
    classCallCheck_default()(this, Carousel);

    var _this = possibleConstructorReturn_default()(this, _React$Component.call(this, props, context));

    _this.handleMouseOver = _this.handleMouseOver.bind(_this);
    _this.handleMouseOut = _this.handleMouseOut.bind(_this);
    _this.handlePrev = _this.handlePrev.bind(_this);
    _this.handleNext = _this.handleNext.bind(_this);
    _this.handleItemAnimateOutEnd = _this.handleItemAnimateOutEnd.bind(_this);

    var defaultActiveIndex = props.defaultActiveIndex;


    _this.state = {
      activeIndex: defaultActiveIndex != null ? defaultActiveIndex : 0,
      previousActiveIndex: null,
      direction: null
    };

    _this.isUnmounted = false;
    return _this;
  }

  Carousel.prototype.componentDidMount = function componentDidMount() {
    this.waitForNext();
  };

  Carousel.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var activeIndex = this.getActiveIndex();

    if (nextProps.activeIndex != null && nextProps.activeIndex !== activeIndex) {
      clearTimeout(this.timeout);

      this.setState({
        previousActiveIndex: activeIndex,
        direction: nextProps.direction != null ? nextProps.direction : this.getDirection(activeIndex, nextProps.activeIndex)
      });
    }

    if (nextProps.activeIndex == null && this.state.activeIndex >= nextProps.children.length) {
      this.setState({
        activeIndex: 0,
        previousActiveIndex: null,
        direction: null
      });
    }
  };

  Carousel.prototype.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.timeout);
    this.isUnmounted = true;
  };

  Carousel.prototype.getActiveIndex = function getActiveIndex() {
    var activeIndexProp = this.props.activeIndex;
    return activeIndexProp != null ? activeIndexProp : this.state.activeIndex;
  };

  Carousel.prototype.getDirection = function getDirection(prevIndex, index) {
    if (prevIndex === index) {
      return null;
    }

    return prevIndex > index ? 'prev' : 'next';
  };

  Carousel.prototype.handleItemAnimateOutEnd = function handleItemAnimateOutEnd() {
    var _this2 = this;

    this.setState({
      previousActiveIndex: null,
      direction: null
    }, function () {
      _this2.waitForNext();

      if (_this2.props.onSlideEnd) {
        _this2.props.onSlideEnd();
      }
    });
  };

  Carousel.prototype.handleMouseOut = function handleMouseOut() {
    if (this.isPaused) {
      this.play();
    }
  };

  Carousel.prototype.handleMouseOver = function handleMouseOver() {
    if (this.props.pauseOnHover) {
      this.pause();
    }
  };

  Carousel.prototype.handleNext = function handleNext(e) {
    var index = this.getActiveIndex() + 1;
    var count = ValidComponentChildren.count(this.props.children);

    if (index > count - 1) {
      if (!this.props.wrap) {
        return;
      }
      index = 0;
    }

    this.select(index, e, 'next');
  };

  Carousel.prototype.handlePrev = function handlePrev(e) {
    var index = this.getActiveIndex() - 1;

    if (index < 0) {
      if (!this.props.wrap) {
        return;
      }
      index = ValidComponentChildren.count(this.props.children) - 1;
    }

    this.select(index, e, 'prev');
  };

  // This might be a public API.


  Carousel.prototype.pause = function pause() {
    this.isPaused = true;
    clearTimeout(this.timeout);
  };

  // This might be a public API.


  Carousel.prototype.play = function play() {
    this.isPaused = false;
    this.waitForNext();
  };

  Carousel.prototype.select = function select(index, e, direction) {
    clearTimeout(this.timeout);

    // TODO: Is this necessary? Seems like the only risk is if the component
    // unmounts while handleItemAnimateOutEnd fires.
    if (this.isUnmounted) {
      return;
    }

    var previousActiveIndex = this.props.slide ? this.getActiveIndex() : null;
    direction = direction || this.getDirection(previousActiveIndex, index);

    var onSelect = this.props.onSelect;


    if (onSelect) {
      if (onSelect.length > 1) {
        // React SyntheticEvents are pooled, so we need to remove this event
        // from the pool to add a custom property. To avoid unnecessarily
        // removing objects from the pool, only do this when the listener
        // actually wants the event.
        if (e) {
          e.persist();
          e.direction = direction;
        } else {
          e = { direction: direction };
        }

        onSelect(index, e);
      } else {
        onSelect(index);
      }
    }

    if (this.props.activeIndex == null && index !== previousActiveIndex) {
      if (this.state.previousActiveIndex != null) {
        // If currently animating don't activate the new index.
        // TODO: look into queueing this canceled call and
        // animating after the current animation has ended.
        return;
      }

      this.setState({
        activeIndex: index,
        previousActiveIndex: previousActiveIndex,
        direction: direction
      });
    }
  };

  Carousel.prototype.waitForNext = function waitForNext() {
    var _props = this.props,
        slide = _props.slide,
        interval = _props.interval,
        activeIndexProp = _props.activeIndex;


    if (!this.isPaused && slide && interval && activeIndexProp == null) {
      this.timeout = setTimeout(this.handleNext, interval);
    }
  };

  Carousel.prototype.renderControls = function renderControls(properties) {
    var wrap = properties.wrap,
        children = properties.children,
        activeIndex = properties.activeIndex,
        prevIcon = properties.prevIcon,
        nextIcon = properties.nextIcon,
        bsProps = properties.bsProps,
        prevLabel = properties.prevLabel,
        nextLabel = properties.nextLabel;

    var controlClassName = prefix(bsProps, 'control');
    var count = ValidComponentChildren.count(children);

    return [(wrap || activeIndex !== 0) && external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      src_SafeAnchor,
      {
        key: 'prev',
        className: classnames_default()(controlClassName, 'left'),
        onClick: this.handlePrev
      },
      prevIcon,
      prevLabel && external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'span',
        { className: 'sr-only' },
        prevLabel
      )
    ), (wrap || activeIndex !== count - 1) && external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      src_SafeAnchor,
      {
        key: 'next',
        className: classnames_default()(controlClassName, 'right'),
        onClick: this.handleNext
      },
      nextIcon,
      nextLabel && external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'span',
        { className: 'sr-only' },
        nextLabel
      )
    )];
  };

  Carousel.prototype.renderIndicators = function renderIndicators(children, activeIndex, bsProps) {
    var _this3 = this;

    var indicators = [];

    ValidComponentChildren.forEach(children, function (child, index) {
      indicators.push(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('li', {
        key: index,
        className: index === activeIndex ? 'active' : null,
        onClick: function onClick(e) {
          return _this3.select(index, e);
        }
      }),

      // Force whitespace between indicator elements. Bootstrap requires
      // this for correct spacing of elements.
      ' ');
    });

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'ol',
      { className: prefix(bsProps, 'indicators') },
      indicators
    );
  };

  Carousel.prototype.render = function render() {
    var _this4 = this;

    var _props2 = this.props,
        slide = _props2.slide,
        indicators = _props2.indicators,
        controls = _props2.controls,
        wrap = _props2.wrap,
        prevIcon = _props2.prevIcon,
        prevLabel = _props2.prevLabel,
        nextIcon = _props2.nextIcon,
        nextLabel = _props2.nextLabel,
        className = _props2.className,
        children = _props2.children,
        props = objectWithoutProperties_default()(_props2, ['slide', 'indicators', 'controls', 'wrap', 'prevIcon', 'prevLabel', 'nextIcon', 'nextLabel', 'className', 'children']);

    var _state = this.state,
        previousActiveIndex = _state.previousActiveIndex,
        direction = _state.direction;

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['interval', 'pauseOnHover', 'onSelect', 'onSlideEnd', 'activeIndex', // Accessed via this.getActiveIndex().
    'defaultActiveIndex', 'direction']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    var activeIndex = this.getActiveIndex();

    var classes = extends_default()({}, getClassSet(bsProps), {
      slide: slide
    });

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      extends_default()({}, elementProps, {
        className: classnames_default()(className, classes),
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseOut
      }),
      indicators && this.renderIndicators(children, activeIndex, bsProps),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'div',
        { className: prefix(bsProps, 'inner') },
        ValidComponentChildren.map(children, function (child, index) {
          var active = index === activeIndex;
          var previousActive = slide && index === previousActiveIndex;

          return Object(external___root___React___commonjs2___react___commonjs___react___amd___react__["cloneElement"])(child, {
            active: active,
            index: index,
            animateOut: previousActive,
            animateIn: active && previousActiveIndex != null && slide,
            direction: direction,
            onAnimateOutEnd: previousActive ? _this4.handleItemAnimateOutEnd : null
          });
        })
      ),
      controls && this.renderControls({
        wrap: wrap,
        children: children,
        activeIndex: activeIndex,
        prevIcon: prevIcon,
        prevLabel: prevLabel,
        nextIcon: nextIcon,
        nextLabel: nextLabel,
        bsProps: bsProps
      })
    );
  };

  return Carousel;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Carousel_Carousel.propTypes = Carousel_propTypes;
Carousel_Carousel.defaultProps = Carousel_defaultProps;

Carousel_Carousel.Caption = src_CarouselCaption;
Carousel_Carousel.Item = src_CarouselItem;

/* harmony default export */ var src_Carousel = (bootstrapUtils_bsClass('carousel', Carousel_Carousel));
// EXTERNAL MODULE: ./node_modules/warning/browser.js
var warning_browser = __webpack_require__(10);
var warning_browser_default = /*#__PURE__*/__webpack_require__.n(warning_browser);

// CONCATENATED MODULE: ./src/Checkbox.js





/* eslint-disable jsx-a11y/label-has-for */








var Checkbox_propTypes = {
  inline: prop_types_default.a.bool,
  disabled: prop_types_default.a.bool,
  title: prop_types_default.a.string,
  /**
   * Only valid if `inline` is not set.
   */
  validationState: prop_types_default.a.oneOf(['success', 'warning', 'error', null]),
  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <Checkbox inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: prop_types_default.a.func
};

var Checkbox_defaultProps = {
  inline: false,
  disabled: false,
  title: ''
};

var Checkbox_Checkbox = function (_React$Component) {
  inherits_default()(Checkbox, _React$Component);

  function Checkbox() {
    classCallCheck_default()(this, Checkbox);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Checkbox.prototype.render = function render() {
    var _props = this.props,
        inline = _props.inline,
        disabled = _props.disabled,
        validationState = _props.validationState,
        inputRef = _props.inputRef,
        className = _props.className,
        style = _props.style,
        title = _props.title,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['inline', 'disabled', 'validationState', 'inputRef', 'className', 'style', 'title', 'children']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var input = external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('input', extends_default()({}, elementProps, {
      ref: inputRef,
      type: 'checkbox',
      disabled: disabled
    }));

    if (inline) {
      var _classes2;

      var _classes = (_classes2 = {}, _classes2[prefix(bsProps, 'inline')] = true, _classes2.disabled = disabled, _classes2);

      // Use a warning here instead of in propTypes to get better-looking
      // generated documentation.
      undefined !== 'production' ? warning_browser_default()(!validationState, '`validationState` is ignored on `<Checkbox inline>`. To display ' + 'validation state on an inline checkbox, set `validationState` on a ' + 'parent `<FormGroup>` or other element instead.') : void 0;

      return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'label',
        {
          className: classnames_default()(className, _classes),
          style: style,
          title: title
        },
        input,
        children
      );
    }

    var classes = extends_default()({}, getClassSet(bsProps), {
      disabled: disabled
    });
    if (validationState) {
      classes['has-' + validationState] = true;
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      { className: classnames_default()(className, classes), style: style },
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'label',
        { title: title },
        input,
        children
      )
    );
  };

  return Checkbox;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Checkbox_Checkbox.propTypes = Checkbox_propTypes;
Checkbox_Checkbox.defaultProps = Checkbox_defaultProps;

/* harmony default export */ var src_Checkbox = (bootstrapUtils_bsClass('checkbox', Checkbox_Checkbox));
// CONCATENATED MODULE: ./src/utils/capitalize.js
function capitalize(string) {
  return "" + string.charAt(0).toUpperCase() + string.slice(1);
}
// CONCATENATED MODULE: ./src/Clearfix.js














var Clearfix_propTypes = {
  componentClass: elementType_default.a,

  /**
   * Apply clearfix
   *
   * on Extra small devices Phones
   *
   * adds class `visible-xs-block`
   */
  visibleXsBlock: prop_types_default.a.bool,
  /**
   * Apply clearfix
   *
   * on Small devices Tablets
   *
   * adds class `visible-sm-block`
   */
  visibleSmBlock: prop_types_default.a.bool,
  /**
   * Apply clearfix
   *
   * on Medium devices Desktops
   *
   * adds class `visible-md-block`
   */
  visibleMdBlock: prop_types_default.a.bool,
  /**
   * Apply clearfix
   *
   * on Large devices Desktops
   *
   * adds class `visible-lg-block`
   */
  visibleLgBlock: prop_types_default.a.bool
};

var Clearfix_defaultProps = {
  componentClass: 'div'
};

var Clearfix_Clearfix = function (_React$Component) {
  inherits_default()(Clearfix, _React$Component);

  function Clearfix() {
    classCallCheck_default()(this, Clearfix);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Clearfix.prototype.render = function render() {
    var _props = this.props,
        Component = _props.componentClass,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['componentClass', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    DEVICE_SIZES.forEach(function (size) {
      var propName = 'visible' + capitalize(size) + 'Block';
      if (elementProps[propName]) {
        classes['visible-' + size + '-block'] = true;
      }

      delete elementProps[propName];
    });

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return Clearfix;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Clearfix_Clearfix.propTypes = Clearfix_propTypes;
Clearfix_Clearfix.defaultProps = Clearfix_defaultProps;

/* harmony default export */ var src_Clearfix = (bootstrapUtils_bsClass('clearfix', Clearfix_Clearfix));
// CONCATENATED MODULE: ./src/ControlLabel.js












var ControlLabel_propTypes = {
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  htmlFor: prop_types_default.a.string,
  srOnly: prop_types_default.a.bool
};

var ControlLabel_defaultProps = {
  srOnly: false
};

var contextTypes = {
  $bs_formGroup: prop_types_default.a.object
};

var ControlLabel_ControlLabel = function (_React$Component) {
  inherits_default()(ControlLabel, _React$Component);

  function ControlLabel() {
    classCallCheck_default()(this, ControlLabel);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  ControlLabel.prototype.render = function render() {
    var formGroup = this.context.$bs_formGroup;
    var controlId = formGroup && formGroup.controlId;

    var _props = this.props,
        _props$htmlFor = _props.htmlFor,
        htmlFor = _props$htmlFor === undefined ? controlId : _props$htmlFor,
        srOnly = _props.srOnly,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['htmlFor', 'srOnly', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    undefined !== 'production' ? warning_browser_default()(controlId == null || htmlFor === controlId, '`controlId` is ignored on `<ControlLabel>` when `htmlFor` is specified.') : void 0;

    var classes = extends_default()({}, getClassSet(bsProps), {
      'sr-only': srOnly
    });

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('label', extends_default()({}, elementProps, {
      htmlFor: htmlFor,
      className: classnames_default()(className, classes)
    }));
  };

  return ControlLabel;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

ControlLabel_ControlLabel.propTypes = ControlLabel_propTypes;
ControlLabel_ControlLabel.defaultProps = ControlLabel_defaultProps;
ControlLabel_ControlLabel.contextTypes = contextTypes;

/* harmony default export */ var src_ControlLabel = (bootstrapUtils_bsClass('control-label', ControlLabel_ControlLabel));
// CONCATENATED MODULE: ./src/Col.js













var Col_propTypes = {
  componentClass: elementType_default.a,

  /**
   * The number of columns you wish to span
   *
   * for Extra small devices Phones (<768px)
   *
   * class-prefix `col-xs-`
   */
  xs: prop_types_default.a.number,
  /**
   * The number of columns you wish to span
   *
   * for Small devices Tablets (≥768px)
   *
   * class-prefix `col-sm-`
   */
  sm: prop_types_default.a.number,
  /**
   * The number of columns you wish to span
   *
   * for Medium devices Desktops (≥992px)
   *
   * class-prefix `col-md-`
   */
  md: prop_types_default.a.number,
  /**
   * The number of columns you wish to span
   *
   * for Large devices Desktops (≥1200px)
   *
   * class-prefix `col-lg-`
   */
  lg: prop_types_default.a.number,
  /**
   * Hide column
   *
   * on Extra small devices Phones
   *
   * adds class `hidden-xs`
   */
  xsHidden: prop_types_default.a.bool,
  /**
   * Hide column
   *
   * on Small devices Tablets
   *
   * adds class `hidden-sm`
   */
  smHidden: prop_types_default.a.bool,
  /**
   * Hide column
   *
   * on Medium devices Desktops
   *
   * adds class `hidden-md`
   */
  mdHidden: prop_types_default.a.bool,
  /**
   * Hide column
   *
   * on Large devices Desktops
   *
   * adds class `hidden-lg`
   */
  lgHidden: prop_types_default.a.bool,
  /**
   * Move columns to the right
   *
   * for Extra small devices Phones
   *
   * class-prefix `col-xs-offset-`
   */
  xsOffset: prop_types_default.a.number,
  /**
   * Move columns to the right
   *
   * for Small devices Tablets
   *
   * class-prefix `col-sm-offset-`
   */
  smOffset: prop_types_default.a.number,
  /**
   * Move columns to the right
   *
   * for Medium devices Desktops
   *
   * class-prefix `col-md-offset-`
   */
  mdOffset: prop_types_default.a.number,
  /**
   * Move columns to the right
   *
   * for Large devices Desktops
   *
   * class-prefix `col-lg-offset-`
   */
  lgOffset: prop_types_default.a.number,
  /**
   * Change the order of grid columns to the right
   *
   * for Extra small devices Phones
   *
   * class-prefix `col-xs-push-`
   */
  xsPush: prop_types_default.a.number,
  /**
   * Change the order of grid columns to the right
   *
   * for Small devices Tablets
   *
   * class-prefix `col-sm-push-`
   */
  smPush: prop_types_default.a.number,
  /**
   * Change the order of grid columns to the right
   *
   * for Medium devices Desktops
   *
   * class-prefix `col-md-push-`
   */
  mdPush: prop_types_default.a.number,
  /**
   * Change the order of grid columns to the right
   *
   * for Large devices Desktops
   *
   * class-prefix `col-lg-push-`
   */
  lgPush: prop_types_default.a.number,
  /**
   * Change the order of grid columns to the left
   *
   * for Extra small devices Phones
   *
   * class-prefix `col-xs-pull-`
   */
  xsPull: prop_types_default.a.number,
  /**
   * Change the order of grid columns to the left
   *
   * for Small devices Tablets
   *
   * class-prefix `col-sm-pull-`
   */
  smPull: prop_types_default.a.number,
  /**
   * Change the order of grid columns to the left
   *
   * for Medium devices Desktops
   *
   * class-prefix `col-md-pull-`
   */
  mdPull: prop_types_default.a.number,
  /**
   * Change the order of grid columns to the left
   *
   * for Large devices Desktops
   *
   * class-prefix `col-lg-pull-`
   */
  lgPull: prop_types_default.a.number
};

var Col_defaultProps = {
  componentClass: 'div'
};

var Col_Col = function (_React$Component) {
  inherits_default()(Col, _React$Component);

  function Col() {
    classCallCheck_default()(this, Col);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Col.prototype.render = function render() {
    var _props = this.props,
        Component = _props.componentClass,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['componentClass', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = [];

    DEVICE_SIZES.forEach(function (size) {
      function popProp(propSuffix, modifier) {
        var propName = '' + size + propSuffix;
        var propValue = elementProps[propName];

        if (propValue != null) {
          classes.push(prefix(bsProps, '' + size + modifier + '-' + propValue));
        }

        delete elementProps[propName];
      }

      popProp('', '');
      popProp('Offset', '-offset');
      popProp('Push', '-push');
      popProp('Pull', '-pull');

      var hiddenPropName = size + 'Hidden';
      if (elementProps[hiddenPropName]) {
        classes.push('hidden-' + size);
      }
      delete elementProps[hiddenPropName];
    });

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return Col;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Col_Col.propTypes = Col_propTypes;
Col_Col.defaultProps = Col_defaultProps;

/* harmony default export */ var src_Col = (bootstrapUtils_bsClass('col', Col_Col));
// EXTERNAL MODULE: ./node_modules/dom-helpers/style/index.js
var dom_helpers_style = __webpack_require__(33);
var style_default = /*#__PURE__*/__webpack_require__.n(dom_helpers_style);

// EXTERNAL MODULE: ./node_modules/react-transition-group/Transition.js
var react_transition_group_Transition = __webpack_require__(81);
var Transition_default = /*#__PURE__*/__webpack_require__.n(react_transition_group_Transition);

// CONCATENATED MODULE: ./src/Collapse.js






var _collapseStyles;










var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
function triggerBrowserReflow(node) {
  node.offsetHeight; // eslint-disable-line no-unused-expressions
}

function getDimensionValue(dimension, elem) {
  var value = elem['offset' + capitalize(dimension)];
  var margins = MARGINS[dimension];

  return value + parseInt(style_default()(elem, margins[0]), 10) + parseInt(style_default()(elem, margins[1]), 10);
}

var collapseStyles = (_collapseStyles = {}, _collapseStyles[react_transition_group_Transition["EXITED"]] = 'collapse', _collapseStyles[react_transition_group_Transition["EXITING"]] = 'collapsing', _collapseStyles[react_transition_group_Transition["ENTERING"]] = 'collapsing', _collapseStyles[react_transition_group_Transition["ENTERED"]] = 'collapse in', _collapseStyles);

var Collapse_propTypes = {
  /**
   * Show the component; triggers the expand or collapse animation
   */
  in: prop_types_default.a.bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: prop_types_default.a.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is collapsed
   */
  unmountOnExit: prop_types_default.a.bool,

  /**
   * Run the expand animation when the component mounts, if it is initially
   * shown
   */
  appear: prop_types_default.a.bool,

  /**
   * Duration of the collapse animation in milliseconds, to ensure that
   * finishing callbacks are fired even if the original browser transition end
   * events are canceled
   */
  timeout: prop_types_default.a.number,

  /**
   * Callback fired before the component expands
   */
  onEnter: prop_types_default.a.func,
  /**
   * Callback fired after the component starts to expand
   */
  onEntering: prop_types_default.a.func,
  /**
   * Callback fired after the component has expanded
   */
  onEntered: prop_types_default.a.func,
  /**
   * Callback fired before the component collapses
   */
  onExit: prop_types_default.a.func,
  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: prop_types_default.a.func,
  /**
   * Callback fired after the component has collapsed
   */
  onExited: prop_types_default.a.func,

  /**
   * The dimension used when collapsing, or a function that returns the
   * dimension
   *
   * _Note: Bootstrap only partially supports 'width'!
   * You will need to supply your own CSS animation for the `.width` CSS class._
   */
  dimension: prop_types_default.a.oneOfType([prop_types_default.a.oneOf(['height', 'width']), prop_types_default.a.func]),

  /**
   * Function that returns the height or width of the animating DOM node
   *
   * Allows for providing some custom logic for how much the Collapse component
   * should animate in its specified dimension. Called with the current
   * dimension prop value and the DOM node.
   */
  getDimensionValue: prop_types_default.a.func,

  /**
   * ARIA role of collapsible element
   */
  role: prop_types_default.a.string
};

var Collapse_defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,

  dimension: 'height',
  getDimensionValue: getDimensionValue
};

var Collapse_Collapse = function (_React$Component) {
  inherits_default()(Collapse, _React$Component);

  function Collapse() {
    var _temp, _this, _ret;

    classCallCheck_default()(this, Collapse);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn_default()(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleEnter = function (elem) {
      elem.style[_this.getDimension()] = '0';
    }, _this.handleEntering = function (elem) {
      var dimension = _this.getDimension();
      elem.style[dimension] = _this._getScrollDimensionValue(elem, dimension);
    }, _this.handleEntered = function (elem) {
      elem.style[_this.getDimension()] = null;
    }, _this.handleExit = function (elem) {
      var dimension = _this.getDimension();
      elem.style[dimension] = _this.props.getDimensionValue(dimension, elem) + 'px';
      triggerBrowserReflow(elem);
    }, _this.handleExiting = function (elem) {
      elem.style[_this.getDimension()] = '0';
    }, _temp), possibleConstructorReturn_default()(_this, _ret);
  }

  Collapse.prototype.getDimension = function getDimension() {
    return typeof this.props.dimension === 'function' ? this.props.dimension() : this.props.dimension;
  };

  // for testing


  Collapse.prototype._getScrollDimensionValue = function _getScrollDimensionValue(elem, dimension) {
    return elem['scroll' + capitalize(dimension)] + 'px';
  };

  /* -- Expanding -- */


  /* -- Collapsing -- */


  Collapse.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        onEnter = _props.onEnter,
        onEntering = _props.onEntering,
        onEntered = _props.onEntered,
        onExit = _props.onExit,
        onExiting = _props.onExiting,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'className', 'children']);

    delete props.dimension;
    delete props.getDimensionValue;

    var handleEnter = utils_createChainedFunction(this.handleEnter, onEnter);
    var handleEntering = utils_createChainedFunction(this.handleEntering, onEntering);
    var handleEntered = utils_createChainedFunction(this.handleEntered, onEntered);
    var handleExit = utils_createChainedFunction(this.handleExit, onExit);
    var handleExiting = utils_createChainedFunction(this.handleExiting, onExiting);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      Transition_default.a,
      extends_default()({}, props, {
        'aria-expanded': props.role ? props.in : null,
        onEnter: handleEnter,
        onEntering: handleEntering,
        onEntered: handleEntered,
        onExit: handleExit,
        onExiting: handleExiting
      }),
      function (state, innerProps) {
        return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.cloneElement(children, extends_default()({}, innerProps, {
          className: classnames_default()(className, children.props.className, collapseStyles[state], _this2.getDimension() === 'width' && 'width')
        }));
      }
    );
  };

  return Collapse;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Collapse_Collapse.propTypes = Collapse_propTypes;
Collapse_Collapse.defaultProps = Collapse_defaultProps;

/* harmony default export */ var src_Collapse = (Collapse_Collapse);
// EXTERNAL MODULE: ./node_modules/dom-helpers/activeElement.js
var activeElement = __webpack_require__(82);
var activeElement_default = /*#__PURE__*/__webpack_require__.n(activeElement);

// EXTERNAL MODULE: ./node_modules/dom-helpers/query/contains.js
var contains = __webpack_require__(26);
var contains_default = /*#__PURE__*/__webpack_require__.n(contains);

// EXTERNAL MODULE: ./node_modules/keycode/index.js
var keycode = __webpack_require__(62);
var keycode_default = /*#__PURE__*/__webpack_require__.n(keycode);

// EXTERNAL MODULE: ./node_modules/prop-types-extra/lib/isRequiredForA11y.js
var isRequiredForA11y = __webpack_require__(38);
var isRequiredForA11y_default = /*#__PURE__*/__webpack_require__.n(isRequiredForA11y);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/array/from.js
var from = __webpack_require__(145);
var from_default = /*#__PURE__*/__webpack_require__.n(from);

// EXTERNAL MODULE: ./node_modules/react-overlays/lib/RootCloseWrapper.js
var RootCloseWrapper = __webpack_require__(83);
var RootCloseWrapper_default = /*#__PURE__*/__webpack_require__.n(RootCloseWrapper);

// CONCATENATED MODULE: ./src/DropdownMenu.js

















var DropdownMenu_propTypes = {
  open: prop_types_default.a.bool,
  pullRight: prop_types_default.a.bool,
  onClose: prop_types_default.a.func,
  labelledBy: prop_types_default.a.oneOfType([prop_types_default.a.string, prop_types_default.a.number]),
  onSelect: prop_types_default.a.func,
  rootCloseEvent: prop_types_default.a.oneOf(['click', 'mousedown'])
};

var DropdownMenu_defaultProps = {
  bsRole: 'menu',
  pullRight: false
};

var DropdownMenu_DropdownMenu = function (_React$Component) {
  inherits_default()(DropdownMenu, _React$Component);

  function DropdownMenu(props) {
    classCallCheck_default()(this, DropdownMenu);

    var _this = possibleConstructorReturn_default()(this, _React$Component.call(this, props));

    _this.handleRootClose = _this.handleRootClose.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    return _this;
  }

  DropdownMenu.prototype.getFocusableMenuItems = function getFocusableMenuItems() {
    var node = external___root___ReactDOM___commonjs2___react_dom___commonjs___react_dom___amd___react_dom___default.a.findDOMNode(this);
    if (!node) {
      return [];
    }

    return from_default()(node.querySelectorAll('[tabIndex="-1"]'));
  };

  DropdownMenu.prototype.getItemsAndActiveIndex = function getItemsAndActiveIndex() {
    var items = this.getFocusableMenuItems();
    var activeIndex = items.indexOf(document.activeElement);

    return { items: items, activeIndex: activeIndex };
  };

  DropdownMenu.prototype.focusNext = function focusNext() {
    var _getItemsAndActiveInd = this.getItemsAndActiveIndex(),
        items = _getItemsAndActiveInd.items,
        activeIndex = _getItemsAndActiveInd.activeIndex;

    if (items.length === 0) {
      return;
    }

    var nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    items[nextIndex].focus();
  };

  DropdownMenu.prototype.focusPrevious = function focusPrevious() {
    var _getItemsAndActiveInd2 = this.getItemsAndActiveIndex(),
        items = _getItemsAndActiveInd2.items,
        activeIndex = _getItemsAndActiveInd2.activeIndex;

    if (items.length === 0) {
      return;
    }

    var prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    items[prevIndex].focus();
  };

  DropdownMenu.prototype.handleKeyDown = function handleKeyDown(event) {
    switch (event.keyCode) {
      case keycode_default.a.codes.down:
        this.focusNext();
        event.preventDefault();
        break;
      case keycode_default.a.codes.up:
        this.focusPrevious();
        event.preventDefault();
        break;
      case keycode_default.a.codes.esc:
      case keycode_default.a.codes.tab:
        this.props.onClose(event, { source: 'keydown' });
        break;
      default:
    }
  };

  DropdownMenu.prototype.handleRootClose = function handleRootClose(event) {
    this.props.onClose(event, { source: 'rootClose' });
  };

  DropdownMenu.prototype.render = function render() {
    var _extends2,
        _this2 = this;

    var _props = this.props,
        open = _props.open,
        pullRight = _props.pullRight,
        labelledBy = _props.labelledBy,
        onSelect = _props.onSelect,
        className = _props.className,
        rootCloseEvent = _props.rootCloseEvent,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['open', 'pullRight', 'labelledBy', 'onSelect', 'className', 'rootCloseEvent', 'children']);

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['onClose']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    var classes = extends_default()({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps, 'right')] = pullRight, _extends2));

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      RootCloseWrapper_default.a,
      {
        disabled: !open,
        onRootClose: this.handleRootClose,
        event: rootCloseEvent
      },
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'ul',
        extends_default()({}, elementProps, {
          role: 'menu',
          className: classnames_default()(className, classes),
          'aria-labelledby': labelledBy
        }),
        ValidComponentChildren.map(children, function (child) {
          return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.cloneElement(child, {
            onKeyDown: utils_createChainedFunction(child.props.onKeyDown, _this2.handleKeyDown),
            onSelect: utils_createChainedFunction(child.props.onSelect, onSelect)
          });
        })
      )
    );
  };

  return DropdownMenu;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

DropdownMenu_DropdownMenu.propTypes = DropdownMenu_propTypes;
DropdownMenu_DropdownMenu.defaultProps = DropdownMenu_defaultProps;

/* harmony default export */ var src_DropdownMenu = (bootstrapUtils_bsClass('dropdown-menu', DropdownMenu_DropdownMenu));
// CONCATENATED MODULE: ./src/DropdownToggle.js













var DropdownToggle_propTypes = {
  noCaret: prop_types_default.a.bool,
  open: prop_types_default.a.bool,
  title: prop_types_default.a.string,
  useAnchor: prop_types_default.a.bool
};

var DropdownToggle_defaultProps = {
  open: false,
  useAnchor: false,
  bsRole: 'toggle'
};

var DropdownToggle_DropdownToggle = function (_React$Component) {
  inherits_default()(DropdownToggle, _React$Component);

  function DropdownToggle() {
    classCallCheck_default()(this, DropdownToggle);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  DropdownToggle.prototype.render = function render() {
    var _props = this.props,
        noCaret = _props.noCaret,
        open = _props.open,
        useAnchor = _props.useAnchor,
        bsClass = _props.bsClass,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['noCaret', 'open', 'useAnchor', 'bsClass', 'className', 'children']);

    delete props.bsRole;

    var Component = useAnchor ? src_SafeAnchor : src_Button;
    var useCaret = !noCaret;

    // This intentionally forwards bsSize and bsStyle (if set) to the
    // underlying component, to allow it to render size and style variants.

    // FIXME: Should this really fall back to `title` as children?

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      Component,
      extends_default()({}, props, {
        role: 'button',
        className: classnames_default()(className, bsClass),
        'aria-haspopup': true,
        'aria-expanded': open
      }),
      children || props.title,
      useCaret && ' ',
      useCaret && external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('span', { className: 'caret' })
    );
  };

  return DropdownToggle;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

DropdownToggle_DropdownToggle.propTypes = DropdownToggle_propTypes;
DropdownToggle_DropdownToggle.defaultProps = DropdownToggle_defaultProps;

/* harmony default export */ var src_DropdownToggle = (bootstrapUtils_bsClass('dropdown-toggle', DropdownToggle_DropdownToggle));
// CONCATENATED MODULE: ./src/Dropdown.js


























var TOGGLE_ROLE = src_DropdownToggle.defaultProps.bsRole;
var MENU_ROLE = src_DropdownMenu.defaultProps.bsRole;

var Dropdown_propTypes = {
  /**
   * The menu will open above the dropdown button, instead of below it.
   */
  dropup: prop_types_default.a.bool,

  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y_default()(prop_types_default.a.oneOfType([prop_types_default.a.string, prop_types_default.a.number])),

  componentClass: elementType_default.a,

  /**
   * The children of a Dropdown may be a `<Dropdown.Toggle>` or a `<Dropdown.Menu>`.
   * @type {node}
   */
  children: all_default()(requiredRoles(TOGGLE_ROLE, MENU_ROLE), exclusiveRoles(MENU_ROLE)),

  /**
   * Whether or not component is disabled.
   */
  disabled: prop_types_default.a.bool,

  /**
   * Align the menu to the right side of the Dropdown toggle
   */
  pullRight: prop_types_default.a.bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  open: prop_types_default.a.bool,

  defaultOpen: prop_types_default.a.bool,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `open` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(Boolean isOpen, Object event, { String source }) {}
   * ```
   * @controllable open
   */
  onToggle: prop_types_default.a.func,

  /**
   * A callback fired when a menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: prop_types_default.a.func,

  /**
   * If `'menuitem'`, causes the dropdown to behave like a menu item rather than
   * a menu button.
   */
  role: prop_types_default.a.string,

  /**
   * Which event when fired outside the component will cause it to be closed
   *
   * *Note: For custom dropdown components, you will have to pass the
   * `rootCloseEvent` to `<RootCloseWrapper>` in your custom dropdown menu
   * component ([similarly to how it is implemented in `<Dropdown.Menu>`](https://github.com/react-bootstrap/react-bootstrap/blob/v0.31.5/src/DropdownMenu.js#L115-L119)).*
   */
  rootCloseEvent: prop_types_default.a.oneOf(['click', 'mousedown']),

  /**
   * @private
   */
  onMouseEnter: prop_types_default.a.func,
  /**
   * @private
   */
  onMouseLeave: prop_types_default.a.func
};

var Dropdown_defaultProps = {
  componentClass: src_ButtonGroup
};

var Dropdown_Dropdown = function (_React$Component) {
  inherits_default()(Dropdown, _React$Component);

  function Dropdown(props, context) {
    classCallCheck_default()(this, Dropdown);

    var _this = possibleConstructorReturn_default()(this, _React$Component.call(this, props, context));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleClose = _this.handleClose.bind(_this);

    _this._focusInDropdown = false;
    _this.lastOpenEventType = null;
    return _this;
  }

  Dropdown.prototype.componentDidMount = function componentDidMount() {
    this.focusNextOnOpen();
  };

  Dropdown.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    if (!nextProps.open && this.props.open) {
      this._focusInDropdown = contains_default()(external___root___ReactDOM___commonjs2___react_dom___commonjs___react_dom___amd___react_dom___default.a.findDOMNode(this.menu), activeElement_default()(document));
    }
  };

  Dropdown.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var open = this.props.open;

    var prevOpen = prevProps.open;

    if (open && !prevOpen) {
      this.focusNextOnOpen();
    }

    if (!open && prevOpen) {
      // if focus hasn't already moved from the menu let's return it
      // to the toggle
      if (this._focusInDropdown) {
        this._focusInDropdown = false;
        this.focus();
      }
    }
  };

  Dropdown.prototype.focus = function focus() {
    var toggle = external___root___ReactDOM___commonjs2___react_dom___commonjs___react_dom___amd___react_dom___default.a.findDOMNode(this.toggle);

    if (toggle && toggle.focus) {
      toggle.focus();
    }
  };

  Dropdown.prototype.focusNextOnOpen = function focusNextOnOpen() {
    var menu = this.menu;

    if (!menu.focusNext) {
      return;
    }

    if (this.lastOpenEventType === 'keydown' || this.props.role === 'menuitem') {
      menu.focusNext();
    }
  };

  Dropdown.prototype.handleClick = function handleClick(event) {
    if (this.props.disabled) {
      return;
    }

    this.toggleOpen(event, { source: 'click' });
  };

  Dropdown.prototype.handleClose = function handleClose(event, eventDetails) {
    if (!this.props.open) {
      return;
    }

    this.toggleOpen(event, eventDetails);
  };

  Dropdown.prototype.handleKeyDown = function handleKeyDown(event) {
    if (this.props.disabled) {
      return;
    }

    switch (event.keyCode) {
      case keycode_default.a.codes.down:
        if (!this.props.open) {
          this.toggleOpen(event, { source: 'keydown' });
        } else if (this.menu.focusNext) {
          this.menu.focusNext();
        }
        event.preventDefault();
        break;
      case keycode_default.a.codes.esc:
      case keycode_default.a.codes.tab:
        this.handleClose(event, { source: 'keydown' });
        break;
      default:
    }
  };

  Dropdown.prototype.toggleOpen = function toggleOpen(event, eventDetails) {
    var open = !this.props.open;

    if (open) {
      this.lastOpenEventType = eventDetails.source;
    }

    if (this.props.onToggle) {
      this.props.onToggle(open, event, eventDetails);
    }
  };

  Dropdown.prototype.renderMenu = function renderMenu(child, _ref) {
    var _this2 = this;

    var id = _ref.id,
        onSelect = _ref.onSelect,
        rootCloseEvent = _ref.rootCloseEvent,
        props = objectWithoutProperties_default()(_ref, ['id', 'onSelect', 'rootCloseEvent']);

    var ref = function ref(c) {
      _this2.menu = c;
    };

    if (typeof child.ref === 'string') {
      undefined !== 'production' ? warning_browser_default()(false, 'String refs are not supported on `<Dropdown.Menu>` components. ' + 'To apply a ref to the component use the callback signature:\n\n ' + 'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute') : void 0;
    } else {
      ref = utils_createChainedFunction(child.ref, ref);
    }

    return Object(external___root___React___commonjs2___react___commonjs___react___amd___react__["cloneElement"])(child, extends_default()({}, props, {
      ref: ref,
      labelledBy: id,
      bsClass: prefix(props, 'menu'),
      onClose: utils_createChainedFunction(child.props.onClose, this.handleClose),
      onSelect: utils_createChainedFunction(child.props.onSelect, onSelect, function (key, event) {
        return _this2.handleClose(event, { source: 'select' });
      }),
      rootCloseEvent: rootCloseEvent
    }));
  };

  Dropdown.prototype.renderToggle = function renderToggle(child, props) {
    var _this3 = this;

    var ref = function ref(c) {
      _this3.toggle = c;
    };

    if (typeof child.ref === 'string') {
      undefined !== 'production' ? warning_browser_default()(false, 'String refs are not supported on `<Dropdown.Toggle>` components. ' + 'To apply a ref to the component use the callback signature:\n\n ' + 'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute') : void 0;
    } else {
      ref = utils_createChainedFunction(child.ref, ref);
    }

    return Object(external___root___React___commonjs2___react___commonjs___react___amd___react__["cloneElement"])(child, extends_default()({}, props, {
      ref: ref,
      bsClass: prefix(props, 'toggle'),
      onClick: utils_createChainedFunction(child.props.onClick, this.handleClick),
      onKeyDown: utils_createChainedFunction(child.props.onKeyDown, this.handleKeyDown)
    }));
  };

  Dropdown.prototype.render = function render() {
    var _classes,
        _this4 = this;

    var _props = this.props,
        Component = _props.componentClass,
        id = _props.id,
        dropup = _props.dropup,
        disabled = _props.disabled,
        pullRight = _props.pullRight,
        open = _props.open,
        onSelect = _props.onSelect,
        role = _props.role,
        bsClass = _props.bsClass,
        className = _props.className,
        rootCloseEvent = _props.rootCloseEvent,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['componentClass', 'id', 'dropup', 'disabled', 'pullRight', 'open', 'onSelect', 'role', 'bsClass', 'className', 'rootCloseEvent', 'children']);

    delete props.onToggle;

    var classes = (_classes = {}, _classes[bsClass] = true, _classes.open = open, _classes.disabled = disabled, _classes);

    if (dropup) {
      classes[bsClass] = false;
      classes.dropup = true;
    }

    // This intentionally forwards bsSize and bsStyle (if set) to the
    // underlying component, to allow it to render size and style variants.

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      Component,
      extends_default()({}, props, { className: classnames_default()(className, classes) }),
      ValidComponentChildren.map(children, function (child) {
        switch (child.props.bsRole) {
          case TOGGLE_ROLE:
            return _this4.renderToggle(child, {
              id: id,
              disabled: disabled,
              open: open,
              role: role,
              bsClass: bsClass
            });
          case MENU_ROLE:
            return _this4.renderMenu(child, {
              id: id,
              open: open,
              pullRight: pullRight,
              bsClass: bsClass,
              onSelect: onSelect,
              rootCloseEvent: rootCloseEvent
            });
          default:
            return child;
        }
      })
    );
  };

  return Dropdown;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Dropdown_Dropdown.propTypes = Dropdown_propTypes;
Dropdown_Dropdown.defaultProps = Dropdown_defaultProps;

bootstrapUtils_bsClass('dropdown', Dropdown_Dropdown);

var UncontrolledDropdown = uncontrollable_default()(Dropdown_Dropdown, { open: 'onToggle' });

UncontrolledDropdown.Toggle = src_DropdownToggle;
UncontrolledDropdown.Menu = src_DropdownMenu;

/* harmony default export */ var src_Dropdown = (UncontrolledDropdown);
// CONCATENATED MODULE: ./src/utils/splitComponentProps.js

function splitComponentProps(props, Component) {
  var componentPropTypes = Component.propTypes;

  var parentProps = {};
  var childProps = {};

  entries_default()(props).forEach(function (_ref) {
    var propName = _ref[0],
        propValue = _ref[1];

    if (componentPropTypes[propName]) {
      parentProps[propName] = propValue;
    } else {
      childProps[propName] = propValue;
    }
  });

  return [parentProps, childProps];
}
// CONCATENATED MODULE: ./src/DropdownButton.js











var DropdownButton_propTypes = extends_default()({}, src_Dropdown.propTypes, {

  // Toggle props.
  bsStyle: prop_types_default.a.string,
  bsSize: prop_types_default.a.string,
  title: prop_types_default.a.node.isRequired,
  noCaret: prop_types_default.a.bool,

  // Override generated docs from <Dropdown>.
  /**
   * @private
   */
  children: prop_types_default.a.node
});

var DropdownButton_DropdownButton = function (_React$Component) {
  inherits_default()(DropdownButton, _React$Component);

  function DropdownButton() {
    classCallCheck_default()(this, DropdownButton);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  DropdownButton.prototype.render = function render() {
    var _props = this.props,
        bsSize = _props.bsSize,
        bsStyle = _props.bsStyle,
        title = _props.title,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['bsSize', 'bsStyle', 'title', 'children']);

    var _splitComponentProps = splitComponentProps(props, src_Dropdown.ControlledComponent),
        dropdownProps = _splitComponentProps[0],
        toggleProps = _splitComponentProps[1];

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      src_Dropdown,
      extends_default()({}, dropdownProps, { bsSize: bsSize, bsStyle: bsStyle }),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        src_Dropdown.Toggle,
        extends_default()({}, toggleProps, { bsSize: bsSize, bsStyle: bsStyle }),
        title
      ),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        src_Dropdown.Menu,
        null,
        children
      )
    );
  };

  return DropdownButton;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

DropdownButton_DropdownButton.propTypes = DropdownButton_propTypes;

/* harmony default export */ var src_DropdownButton = (DropdownButton_DropdownButton);
// CONCATENATED MODULE: ./src/Fade.js






var _fadeStyles;






var Fade_propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in: prop_types_default.a.bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: prop_types_default.a.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: prop_types_default.a.bool,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  appear: prop_types_default.a.bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: prop_types_default.a.number,

  /**
   * Callback fired before the component fades in
   */
  onEnter: prop_types_default.a.func,
  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: prop_types_default.a.func,
  /**
   * Callback fired after the has component faded in
   */
  onEntered: prop_types_default.a.func,
  /**
   * Callback fired before the component fades out
   */
  onExit: prop_types_default.a.func,
  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: prop_types_default.a.func,
  /**
   * Callback fired after the component has faded out
   */
  onExited: prop_types_default.a.func
};

var Fade_defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false
};

var fadeStyles = (_fadeStyles = {}, _fadeStyles[react_transition_group_Transition["ENTERING"]] = 'in', _fadeStyles[react_transition_group_Transition["ENTERED"]] = 'in', _fadeStyles);

var Fade_Fade = function (_React$Component) {
  inherits_default()(Fade, _React$Component);

  function Fade() {
    classCallCheck_default()(this, Fade);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Fade.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['className', 'children']);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      Transition_default.a,
      props,
      function (status, innerProps) {
        return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.cloneElement(children, extends_default()({}, innerProps, {
          className: classnames_default()('fade', className, children.props.className, fadeStyles[status])
        }));
      }
    );
  };

  return Fade;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Fade_Fade.propTypes = Fade_propTypes;
Fade_Fade.defaultProps = Fade_defaultProps;

/* harmony default export */ var src_Fade = (Fade_Fade);
// CONCATENATED MODULE: ./src/Form.js












var Form_propTypes = {
  horizontal: prop_types_default.a.bool,
  inline: prop_types_default.a.bool,
  componentClass: elementType_default.a
};

var Form_defaultProps = {
  horizontal: false,
  inline: false,
  componentClass: 'form'
};

var Form_Form = function (_React$Component) {
  inherits_default()(Form, _React$Component);

  function Form() {
    classCallCheck_default()(this, Form);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Form.prototype.render = function render() {
    var _props = this.props,
        horizontal = _props.horizontal,
        inline = _props.inline,
        Component = _props.componentClass,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['horizontal', 'inline', 'componentClass', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = [];
    if (horizontal) {
      classes.push(prefix(bsProps, 'horizontal'));
    }
    if (inline) {
      classes.push(prefix(bsProps, 'inline'));
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return Form;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Form_Form.propTypes = Form_propTypes;
Form_Form.defaultProps = Form_defaultProps;

/* harmony default export */ var src_Form = (bootstrapUtils_bsClass('form', Form_Form));
// CONCATENATED MODULE: ./src/FormControlFeedback.js












var FormControlFeedback_defaultProps = {
  bsRole: 'feedback'
};

var FormControlFeedback_contextTypes = {
  $bs_formGroup: prop_types_default.a.object
};

var FormControlFeedback_FormControlFeedback = function (_React$Component) {
  inherits_default()(FormControlFeedback, _React$Component);

  function FormControlFeedback() {
    classCallCheck_default()(this, FormControlFeedback);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  FormControlFeedback.prototype.getGlyph = function getGlyph(validationState) {
    switch (validationState) {
      case 'success':
        return 'ok';
      case 'warning':
        return 'warning-sign';
      case 'error':
        return 'remove';
      default:
        return null;
    }
  };

  FormControlFeedback.prototype.renderDefaultFeedback = function renderDefaultFeedback(formGroup, className, classes, elementProps) {
    var glyph = this.getGlyph(formGroup && formGroup.validationState);
    if (!glyph) {
      return null;
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(src_Glyphicon, extends_default()({}, elementProps, {
      glyph: glyph,
      className: classnames_default()(className, classes)
    }));
  };

  FormControlFeedback.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['className', 'children']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    if (!children) {
      return this.renderDefaultFeedback(this.context.$bs_formGroup, className, classes, elementProps);
    }

    var child = external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Children.only(children);
    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.cloneElement(child, extends_default()({}, elementProps, {
      className: classnames_default()(child.props.className, className, classes)
    }));
  };

  return FormControlFeedback;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

FormControlFeedback_FormControlFeedback.defaultProps = FormControlFeedback_defaultProps;
FormControlFeedback_FormControlFeedback.contextTypes = FormControlFeedback_contextTypes;

/* harmony default export */ var src_FormControlFeedback = (bootstrapUtils_bsClass('form-control-feedback', FormControlFeedback_FormControlFeedback));
// CONCATENATED MODULE: ./src/FormControlStatic.js











var FormControlStatic_propTypes = {
  componentClass: elementType_default.a
};

var FormControlStatic_defaultProps = {
  componentClass: 'p'
};

var FormControlStatic_FormControlStatic = function (_React$Component) {
  inherits_default()(FormControlStatic, _React$Component);

  function FormControlStatic() {
    classCallCheck_default()(this, FormControlStatic);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  FormControlStatic.prototype.render = function render() {
    var _props = this.props,
        Component = _props.componentClass,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['componentClass', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return FormControlStatic;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

FormControlStatic_FormControlStatic.propTypes = FormControlStatic_propTypes;
FormControlStatic_FormControlStatic.defaultProps = FormControlStatic_defaultProps;

/* harmony default export */ var src_FormControlStatic = (bootstrapUtils_bsClass('form-control-static', FormControlStatic_FormControlStatic));
// CONCATENATED MODULE: ./src/FormControl.js
















var FormControl_propTypes = {
  componentClass: elementType_default.a,
  /**
   * Only relevant if `componentClass` is `'input'`.
   */
  type: prop_types_default.a.string,
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id: prop_types_default.a.string,
  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <FormControl inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: prop_types_default.a.func
};

var FormControl_defaultProps = {
  componentClass: 'input'
};

var FormControl_contextTypes = {
  $bs_formGroup: prop_types_default.a.object
};

var FormControl_FormControl = function (_React$Component) {
  inherits_default()(FormControl, _React$Component);

  function FormControl() {
    classCallCheck_default()(this, FormControl);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  FormControl.prototype.render = function render() {
    var formGroup = this.context.$bs_formGroup;
    var controlId = formGroup && formGroup.controlId;

    var _props = this.props,
        Component = _props.componentClass,
        type = _props.type,
        _props$id = _props.id,
        id = _props$id === undefined ? controlId : _props$id,
        inputRef = _props.inputRef,
        className = _props.className,
        bsSize = _props.bsSize,
        props = objectWithoutProperties_default()(_props, ['componentClass', 'type', 'id', 'inputRef', 'className', 'bsSize']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    undefined !== 'production' ? warning_browser_default()(controlId == null || id === controlId, '`controlId` is ignored on `<FormControl>` when `id` is specified.') : void 0;

    // input[type="file"] should not have .form-control.
    var classes = void 0;
    if (type !== 'file') {
      classes = getClassSet(bsProps);
    }

    // If user provides a size, make sure to append it to classes as input-
    // e.g. if bsSize is small, it will append input-sm
    if (bsSize) {
      var size = SIZE_MAP[bsSize] || bsSize;
      classes[prefix({ bsClass: 'input' }, size)] = true;
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, {
      type: type,
      id: id,
      ref: inputRef,
      className: classnames_default()(className, classes)
    }));
  };

  return FormControl;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

FormControl_FormControl.propTypes = FormControl_propTypes;
FormControl_FormControl.defaultProps = FormControl_defaultProps;
FormControl_FormControl.contextTypes = FormControl_contextTypes;

FormControl_FormControl.Feedback = src_FormControlFeedback;
FormControl_FormControl.Static = src_FormControlStatic;

/* harmony default export */ var src_FormControl = (bootstrapUtils_bsClass('form-control', bsSizes([Size.SMALL, Size.LARGE], FormControl_FormControl)));
// CONCATENATED MODULE: ./src/FormGroup.js













var FormGroup_propTypes = {
  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: prop_types_default.a.string,
  validationState: prop_types_default.a.oneOf(['success', 'warning', 'error', null])
};

var FormGroup_childContextTypes = {
  $bs_formGroup: prop_types_default.a.object.isRequired
};

var FormGroup_FormGroup = function (_React$Component) {
  inherits_default()(FormGroup, _React$Component);

  function FormGroup() {
    classCallCheck_default()(this, FormGroup);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  FormGroup.prototype.getChildContext = function getChildContext() {
    var _props = this.props,
        controlId = _props.controlId,
        validationState = _props.validationState;


    return {
      $bs_formGroup: {
        controlId: controlId,
        validationState: validationState
      }
    };
  };

  FormGroup.prototype.hasFeedback = function hasFeedback(children) {
    var _this2 = this;

    return ValidComponentChildren.some(children, function (child) {
      return child.props.bsRole === 'feedback' || child.props.children && _this2.hasFeedback(child.props.children);
    });
  };

  FormGroup.prototype.render = function render() {
    var _props2 = this.props,
        validationState = _props2.validationState,
        className = _props2.className,
        children = _props2.children,
        props = objectWithoutProperties_default()(_props2, ['validationState', 'className', 'children']);

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['controlId']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    var classes = extends_default()({}, getClassSet(bsProps), {
      'has-feedback': this.hasFeedback(children)
    });
    if (validationState) {
      classes['has-' + validationState] = true;
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      extends_default()({}, elementProps, { className: classnames_default()(className, classes) }),
      children
    );
  };

  return FormGroup;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

FormGroup_FormGroup.propTypes = FormGroup_propTypes;
FormGroup_FormGroup.childContextTypes = FormGroup_childContextTypes;

/* harmony default export */ var src_FormGroup = (bootstrapUtils_bsClass('form-group', bsSizes([Size.LARGE, Size.SMALL], FormGroup_FormGroup)));
// CONCATENATED MODULE: ./src/Grid.js












var Grid_propTypes = {
  /**
   * Turn any fixed-width grid layout into a full-width layout by this property.
   *
   * Adds `container-fluid` class.
   */
  fluid: prop_types_default.a.bool,
  /**
   * You can use a custom element for this component
   */
  componentClass: elementType_default.a
};

var Grid_defaultProps = {
  componentClass: 'div',
  fluid: false
};

var Grid_Grid = function (_React$Component) {
  inherits_default()(Grid, _React$Component);

  function Grid() {
    classCallCheck_default()(this, Grid);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Grid.prototype.render = function render() {
    var _props = this.props,
        fluid = _props.fluid,
        Component = _props.componentClass,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['fluid', 'componentClass', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = prefix(bsProps, fluid && 'fluid');

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return Grid;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Grid_Grid.propTypes = Grid_propTypes;
Grid_Grid.defaultProps = Grid_defaultProps;

/* harmony default export */ var src_Grid = (bootstrapUtils_bsClass('container', Grid_Grid));
// CONCATENATED MODULE: ./src/HelpBlock.js










var HelpBlock_HelpBlock = function (_React$Component) {
  inherits_default()(HelpBlock, _React$Component);

  function HelpBlock() {
    classCallCheck_default()(this, HelpBlock);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  HelpBlock.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('span', extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return HelpBlock;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

/* harmony default export */ var src_HelpBlock = (bootstrapUtils_bsClass('help-block', HelpBlock_HelpBlock));
// CONCATENATED MODULE: ./src/Image.js











var Image_propTypes = {
  /**
   * Sets image as responsive image
   */
  responsive: prop_types_default.a.bool,

  /**
   * Sets image shape as rounded
   */
  rounded: prop_types_default.a.bool,

  /**
   * Sets image shape as circle
   */
  circle: prop_types_default.a.bool,

  /**
   * Sets image shape as thumbnail
   */
  thumbnail: prop_types_default.a.bool
};

var Image_defaultProps = {
  responsive: false,
  rounded: false,
  circle: false,
  thumbnail: false
};

var Image_Image = function (_React$Component) {
  inherits_default()(Image, _React$Component);

  function Image() {
    classCallCheck_default()(this, Image);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Image.prototype.render = function render() {
    var _classes;

    var _props = this.props,
        responsive = _props.responsive,
        rounded = _props.rounded,
        circle = _props.circle,
        thumbnail = _props.thumbnail,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['responsive', 'rounded', 'circle', 'thumbnail', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = (_classes = {}, _classes[prefix(bsProps, 'responsive')] = responsive, _classes[prefix(bsProps, 'rounded')] = rounded, _classes[prefix(bsProps, 'circle')] = circle, _classes[prefix(bsProps, 'thumbnail')] = thumbnail, _classes);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('img', extends_default()({}, elementProps, {
      className: classnames_default()(className, classes)
    }));
  };

  return Image;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Image_Image.propTypes = Image_propTypes;
Image_Image.defaultProps = Image_defaultProps;

/* harmony default export */ var src_Image = (bootstrapUtils_bsClass('img', Image_Image));
// CONCATENATED MODULE: ./src/InputGroupAddon.js










var InputGroupAddon_InputGroupAddon = function (_React$Component) {
  inherits_default()(InputGroupAddon, _React$Component);

  function InputGroupAddon() {
    classCallCheck_default()(this, InputGroupAddon);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  InputGroupAddon.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('span', extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return InputGroupAddon;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

/* harmony default export */ var src_InputGroupAddon = (bootstrapUtils_bsClass('input-group-addon', InputGroupAddon_InputGroupAddon));
// CONCATENATED MODULE: ./src/InputGroupButton.js










var InputGroupButton_InputGroupButton = function (_React$Component) {
  inherits_default()(InputGroupButton, _React$Component);

  function InputGroupButton() {
    classCallCheck_default()(this, InputGroupButton);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  InputGroupButton.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('span', extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return InputGroupButton;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

/* harmony default export */ var src_InputGroupButton = (bootstrapUtils_bsClass('input-group-btn', InputGroupButton_InputGroupButton));
// CONCATENATED MODULE: ./src/InputGroup.js













var InputGroup_InputGroup = function (_React$Component) {
  inherits_default()(InputGroup, _React$Component);

  function InputGroup() {
    classCallCheck_default()(this, InputGroup);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  InputGroup.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('span', extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return InputGroup;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

InputGroup_InputGroup.Addon = src_InputGroupAddon;
InputGroup_InputGroup.Button = src_InputGroupButton;

/* harmony default export */ var src_InputGroup = (bootstrapUtils_bsClass('input-group', bsSizes([Size.LARGE, Size.SMALL], InputGroup_InputGroup)));
// CONCATENATED MODULE: ./src/Jumbotron.js











var Jumbotron_propTypes = {
  componentClass: elementType_default.a
};

var Jumbotron_defaultProps = {
  componentClass: 'div'
};

var Jumbotron_Jumbotron = function (_React$Component) {
  inherits_default()(Jumbotron, _React$Component);

  function Jumbotron() {
    classCallCheck_default()(this, Jumbotron);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Jumbotron.prototype.render = function render() {
    var _props = this.props,
        Component = _props.componentClass,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['componentClass', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return Jumbotron;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Jumbotron_Jumbotron.propTypes = Jumbotron_propTypes;
Jumbotron_Jumbotron.defaultProps = Jumbotron_defaultProps;

/* harmony default export */ var src_Jumbotron = (bootstrapUtils_bsClass('jumbotron', Jumbotron_Jumbotron));
// CONCATENATED MODULE: ./src/Label.js












var Label_Label = function (_React$Component) {
  inherits_default()(Label, _React$Component);

  function Label() {
    classCallCheck_default()(this, Label);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Label.prototype.hasContent = function hasContent(children) {
    var result = false;

    external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Children.forEach(children, function (child) {
      if (result) {
        return;
      }

      if (child || child === 0) {
        result = true;
      }
    });

    return result;
  };

  Label.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['className', 'children']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = extends_default()({}, getClassSet(bsProps), {

      // Hack for collapsing on IE8.
      hidden: !this.hasContent(children)
    });

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'span',
      extends_default()({}, elementProps, { className: classnames_default()(className, classes) }),
      children
    );
  };

  return Label;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

/* harmony default export */ var src_Label = (bootstrapUtils_bsClass('label', bsStyles([].concat(values_default()(State), [Style.DEFAULT, Style.PRIMARY]), Style.DEFAULT, Label_Label)));
// CONCATENATED MODULE: ./src/ListGroupItem.js













var ListGroupItem_propTypes = {
  active: prop_types_default.a.any,
  disabled: prop_types_default.a.any,
  header: prop_types_default.a.node,
  listItem: prop_types_default.a.bool,
  onClick: prop_types_default.a.func,
  href: prop_types_default.a.string,
  type: prop_types_default.a.string
};

var ListGroupItem_defaultProps = {
  listItem: false
};

var ListGroupItem_ListGroupItem = function (_React$Component) {
  inherits_default()(ListGroupItem, _React$Component);

  function ListGroupItem() {
    classCallCheck_default()(this, ListGroupItem);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  ListGroupItem.prototype.renderHeader = function renderHeader(header, headingClassName) {
    if (external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.isValidElement(header)) {
      return Object(external___root___React___commonjs2___react___commonjs___react___amd___react__["cloneElement"])(header, {
        className: classnames_default()(header.props.className, headingClassName)
      });
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'h4',
      { className: headingClassName },
      header
    );
  };

  ListGroupItem.prototype.render = function render() {
    var _props = this.props,
        active = _props.active,
        disabled = _props.disabled,
        className = _props.className,
        header = _props.header,
        listItem = _props.listItem,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['active', 'disabled', 'className', 'header', 'listItem', 'children']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = extends_default()({}, getClassSet(bsProps), {
      active: active,
      disabled: disabled
    });

    var Component = void 0;

    if (elementProps.href) {
      Component = 'a';
    } else if (elementProps.onClick) {
      Component = 'button';
      elementProps.type = elementProps.type || 'button';
    } else if (listItem) {
      Component = 'li';
    } else {
      Component = 'span';
    }

    elementProps.className = classnames_default()(className, classes);

    // TODO: Deprecate `header` prop.
    if (header) {
      return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        Component,
        elementProps,
        this.renderHeader(header, prefix(bsProps, 'heading')),
        external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
          'p',
          { className: prefix(bsProps, 'text') },
          children
        )
      );
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      Component,
      elementProps,
      children
    );
  };

  return ListGroupItem;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

ListGroupItem_ListGroupItem.propTypes = ListGroupItem_propTypes;
ListGroupItem_ListGroupItem.defaultProps = ListGroupItem_defaultProps;

/* harmony default export */ var src_ListGroupItem = (bootstrapUtils_bsClass('list-group-item', bsStyles(values_default()(State), ListGroupItem_ListGroupItem)));
// CONCATENATED MODULE: ./src/ListGroup.js













var ListGroup_propTypes = {
  /**
   * You can use a custom element type for this component.
   *
   * If not specified, it will be treated as `'li'` if every child is a
   * non-actionable `<ListGroupItem>`, and `'div'` otherwise.
   */
  componentClass: elementType_default.a
};

function getDefaultComponent(children) {
  if (!children) {
    // FIXME: This is the old behavior. Is this right?
    return 'div';
  }

  if (ValidComponentChildren.some(children, function (child) {
    return child.type !== src_ListGroupItem || child.props.href || child.props.onClick;
  })) {
    return 'div';
  }

  return 'ul';
}

var ListGroup_ListGroup = function (_React$Component) {
  inherits_default()(ListGroup, _React$Component);

  function ListGroup() {
    classCallCheck_default()(this, ListGroup);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  ListGroup.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        _props$componentClass = _props.componentClass,
        Component = _props$componentClass === undefined ? getDefaultComponent(children) : _props$componentClass,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['children', 'componentClass', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    var useListItem = Component === 'ul' && ValidComponentChildren.every(children, function (child) {
      return child.type === src_ListGroupItem;
    });

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      Component,
      extends_default()({}, elementProps, { className: classnames_default()(className, classes) }),
      useListItem ? ValidComponentChildren.map(children, function (child) {
        return Object(external___root___React___commonjs2___react___commonjs___react___amd___react__["cloneElement"])(child, { listItem: true });
      }) : children
    );
  };

  return ListGroup;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

ListGroup_ListGroup.propTypes = ListGroup_propTypes;

/* harmony default export */ var src_ListGroup = (bootstrapUtils_bsClass('list-group', ListGroup_ListGroup));
// CONCATENATED MODULE: ./src/MediaBody.js













var MediaBody_propTypes = {
  /**
   * Align the media to the top, middle, or bottom of the media object.
   */
  align: prop_types_default.a.oneOf(['top', 'middle', 'bottom']),

  componentClass: elementType_default.a
};

var MediaBody_defaultProps = {
  componentClass: 'div'
};

var MediaBody_MediaBody = function (_React$Component) {
  inherits_default()(MediaBody, _React$Component);

  function MediaBody() {
    classCallCheck_default()(this, MediaBody);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  MediaBody.prototype.render = function render() {
    var _props = this.props,
        Component = _props.componentClass,
        align = _props.align,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['componentClass', 'align', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    if (align) {
      // The class is e.g. `media-top`, not `media-left-top`.
      classes[prefix(src_Media.defaultProps, align)] = true;
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return MediaBody;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

MediaBody_MediaBody.propTypes = MediaBody_propTypes;
MediaBody_MediaBody.defaultProps = MediaBody_defaultProps;

/* harmony default export */ var src_MediaBody = (bootstrapUtils_bsClass('media-body', MediaBody_MediaBody));
// CONCATENATED MODULE: ./src/MediaHeading.js











var MediaHeading_propTypes = {
  componentClass: elementType_default.a
};

var MediaHeading_defaultProps = {
  componentClass: 'h4'
};

var MediaHeading_MediaHeading = function (_React$Component) {
  inherits_default()(MediaHeading, _React$Component);

  function MediaHeading() {
    classCallCheck_default()(this, MediaHeading);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  MediaHeading.prototype.render = function render() {
    var _props = this.props,
        Component = _props.componentClass,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['componentClass', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return MediaHeading;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

MediaHeading_MediaHeading.propTypes = MediaHeading_propTypes;
MediaHeading_MediaHeading.defaultProps = MediaHeading_defaultProps;

/* harmony default export */ var src_MediaHeading = (bootstrapUtils_bsClass('media-heading', MediaHeading_MediaHeading));
// CONCATENATED MODULE: ./src/MediaLeft.js












var MediaLeft_propTypes = {
  /**
   * Align the media to the top, middle, or bottom of the media object.
   */
  align: prop_types_default.a.oneOf(['top', 'middle', 'bottom'])
};

var MediaLeft_MediaLeft = function (_React$Component) {
  inherits_default()(MediaLeft, _React$Component);

  function MediaLeft() {
    classCallCheck_default()(this, MediaLeft);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  MediaLeft.prototype.render = function render() {
    var _props = this.props,
        align = _props.align,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['align', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    if (align) {
      // The class is e.g. `media-top`, not `media-left-top`.
      classes[prefix(src_Media.defaultProps, align)] = true;
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('div', extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return MediaLeft;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

MediaLeft_MediaLeft.propTypes = MediaLeft_propTypes;

/* harmony default export */ var src_MediaLeft = (bootstrapUtils_bsClass('media-left', MediaLeft_MediaLeft));
// CONCATENATED MODULE: ./src/MediaList.js










var MediaList_MediaList = function (_React$Component) {
  inherits_default()(MediaList, _React$Component);

  function MediaList() {
    classCallCheck_default()(this, MediaList);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  MediaList.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('ul', extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return MediaList;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

/* harmony default export */ var src_MediaList = (bootstrapUtils_bsClass('media-list', MediaList_MediaList));
// CONCATENATED MODULE: ./src/MediaListItem.js










var MediaListItem_MediaListItem = function (_React$Component) {
  inherits_default()(MediaListItem, _React$Component);

  function MediaListItem() {
    classCallCheck_default()(this, MediaListItem);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  MediaListItem.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('li', extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return MediaListItem;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

/* harmony default export */ var src_MediaListItem = (bootstrapUtils_bsClass('media', MediaListItem_MediaListItem));
// CONCATENATED MODULE: ./src/MediaRight.js












var MediaRight_propTypes = {
  /**
   * Align the media to the top, middle, or bottom of the media object.
   */
  align: prop_types_default.a.oneOf(['top', 'middle', 'bottom'])
};

var MediaRight_MediaRight = function (_React$Component) {
  inherits_default()(MediaRight, _React$Component);

  function MediaRight() {
    classCallCheck_default()(this, MediaRight);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  MediaRight.prototype.render = function render() {
    var _props = this.props,
        align = _props.align,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['align', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    if (align) {
      // The class is e.g. `media-top`, not `media-right-top`.
      classes[prefix(src_Media.defaultProps, align)] = true;
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('div', extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return MediaRight;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

MediaRight_MediaRight.propTypes = MediaRight_propTypes;

/* harmony default export */ var src_MediaRight = (bootstrapUtils_bsClass('media-right', MediaRight_MediaRight));
// CONCATENATED MODULE: ./src/Media.js

















var Media_propTypes = {
  componentClass: elementType_default.a
};

var Media_defaultProps = {
  componentClass: 'div'
};

var Media_Media = function (_React$Component) {
  inherits_default()(Media, _React$Component);

  function Media() {
    classCallCheck_default()(this, Media);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Media.prototype.render = function render() {
    var _props = this.props,
        Component = _props.componentClass,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['componentClass', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return Media;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Media_Media.propTypes = Media_propTypes;
Media_Media.defaultProps = Media_defaultProps;

Media_Media.Heading = src_MediaHeading;
Media_Media.Body = src_MediaBody;
Media_Media.Left = src_MediaLeft;
Media_Media.Right = src_MediaRight;
Media_Media.List = src_MediaList;
Media_Media.ListItem = src_MediaListItem;

/* harmony default export */ var src_Media = (bootstrapUtils_bsClass('media', Media_Media));
// CONCATENATED MODULE: ./src/MenuItem.js














var MenuItem_propTypes = {
  /**
   * Highlight the menu item as active.
   */
  active: prop_types_default.a.bool,

  /**
   * Disable the menu item, making it unselectable.
   */
  disabled: prop_types_default.a.bool,

  /**
   * Styles the menu item as a horizontal rule, providing visual separation between
   * groups of menu items.
   */
  divider: all_default()(prop_types_default.a.bool, function (_ref) {
    var divider = _ref.divider,
        children = _ref.children;
    return divider && children ? new Error('Children will not be rendered for dividers') : null;
  }),

  /**
   * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
   */
  eventKey: prop_types_default.a.any,

  /**
   * Styles the menu item as a header label, useful for describing a group of menu items.
   */
  header: prop_types_default.a.bool,

  /**
   * HTML `href` attribute corresponding to `a.href`.
   */
  href: prop_types_default.a.string,

  /**
   * Callback fired when the menu item is clicked.
   */
  onClick: prop_types_default.a.func,

  /**
   * Callback fired when the menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: prop_types_default.a.func
};

var MenuItem_defaultProps = {
  divider: false,
  disabled: false,
  header: false
};

var MenuItem_MenuItem = function (_React$Component) {
  inherits_default()(MenuItem, _React$Component);

  function MenuItem(props, context) {
    classCallCheck_default()(this, MenuItem);

    var _this = possibleConstructorReturn_default()(this, _React$Component.call(this, props, context));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  MenuItem.prototype.handleClick = function handleClick(event) {
    var _props = this.props,
        href = _props.href,
        disabled = _props.disabled,
        onSelect = _props.onSelect,
        eventKey = _props.eventKey;


    if (!href || disabled) {
      event.preventDefault();
    }

    if (disabled) {
      return;
    }

    if (onSelect) {
      onSelect(eventKey, event);
    }
  };

  MenuItem.prototype.render = function render() {
    var _props2 = this.props,
        active = _props2.active,
        disabled = _props2.disabled,
        divider = _props2.divider,
        header = _props2.header,
        onClick = _props2.onClick,
        className = _props2.className,
        style = _props2.style,
        props = objectWithoutProperties_default()(_props2, ['active', 'disabled', 'divider', 'header', 'onClick', 'className', 'style']);

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['eventKey', 'onSelect']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    if (divider) {
      // Forcibly blank out the children; separators shouldn't render any.
      elementProps.children = undefined;

      return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('li', extends_default()({}, elementProps, {
        role: 'separator',
        className: classnames_default()(className, 'divider'),
        style: style
      }));
    }

    if (header) {
      return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('li', extends_default()({}, elementProps, {
        role: 'heading',
        className: classnames_default()(className, prefix(bsProps, 'header')),
        style: style
      }));
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'li',
      {
        role: 'presentation',
        className: classnames_default()(className, { active: active, disabled: disabled }),
        style: style
      },
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(src_SafeAnchor, extends_default()({}, elementProps, {
        role: 'menuitem',
        tabIndex: '-1',
        onClick: utils_createChainedFunction(onClick, this.handleClick)
      }))
    );
  };

  return MenuItem;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

MenuItem_MenuItem.propTypes = MenuItem_propTypes;
MenuItem_MenuItem.defaultProps = MenuItem_defaultProps;

/* harmony default export */ var src_MenuItem = (bootstrapUtils_bsClass('dropdown', MenuItem_MenuItem));
// EXTERNAL MODULE: ./node_modules/dom-helpers/events/index.js
var events = __webpack_require__(154);
var events_default = /*#__PURE__*/__webpack_require__.n(events);

// EXTERNAL MODULE: ./node_modules/dom-helpers/ownerDocument.js
var ownerDocument = __webpack_require__(25);
var ownerDocument_default = /*#__PURE__*/__webpack_require__.n(ownerDocument);

// EXTERNAL MODULE: ./node_modules/dom-helpers/util/inDOM.js
var inDOM = __webpack_require__(15);
var inDOM_default = /*#__PURE__*/__webpack_require__.n(inDOM);

// EXTERNAL MODULE: ./node_modules/dom-helpers/util/scrollbarSize.js
var scrollbarSize = __webpack_require__(85);
var scrollbarSize_default = /*#__PURE__*/__webpack_require__.n(scrollbarSize);

// EXTERNAL MODULE: ./node_modules/react-overlays/lib/Modal.js
var lib_Modal = __webpack_require__(158);
var Modal_default = /*#__PURE__*/__webpack_require__.n(lib_Modal);

// EXTERNAL MODULE: ./node_modules/react-overlays/lib/utils/isOverflowing.js
var isOverflowing = __webpack_require__(87);
var isOverflowing_default = /*#__PURE__*/__webpack_require__.n(isOverflowing);

// CONCATENATED MODULE: ./src/ModalBody.js











var ModalBody_propTypes = {
  componentClass: elementType_default.a
};

var ModalBody_defaultProps = {
  componentClass: 'div'
};

var ModalBody_ModalBody = function (_React$Component) {
  inherits_default()(ModalBody, _React$Component);

  function ModalBody() {
    classCallCheck_default()(this, ModalBody);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  ModalBody.prototype.render = function render() {
    var _props = this.props,
        Component = _props.componentClass,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['componentClass', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return ModalBody;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

ModalBody_ModalBody.propTypes = ModalBody_propTypes;
ModalBody_ModalBody.defaultProps = ModalBody_defaultProps;

/* harmony default export */ var src_ModalBody = (bootstrapUtils_bsClass('modal-body', ModalBody_ModalBody));
// CONCATENATED MODULE: ./src/ModalDialog.js












var ModalDialog_propTypes = {
  /**
   * A css class to apply to the Modal dialog DOM node.
   */
  dialogClassName: prop_types_default.a.string
};

var ModalDialog_ModalDialog = function (_React$Component) {
  inherits_default()(ModalDialog, _React$Component);

  function ModalDialog() {
    classCallCheck_default()(this, ModalDialog);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  ModalDialog.prototype.render = function render() {
    var _extends2;

    var _props = this.props,
        dialogClassName = _props.dialogClassName,
        className = _props.className,
        style = _props.style,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['dialogClassName', 'className', 'style', 'children']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var bsClassName = prefix(bsProps);

    var modalStyle = extends_default()({ display: 'block' }, style);

    var dialogClasses = extends_default()({}, getClassSet(bsProps), (_extends2 = {}, _extends2[bsClassName] = false, _extends2[prefix(bsProps, 'dialog')] = true, _extends2));

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      extends_default()({}, elementProps, {
        tabIndex: '-1',
        role: 'dialog',
        style: modalStyle,
        className: classnames_default()(className, bsClassName)
      }),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'div',
        { className: classnames_default()(dialogClassName, dialogClasses) },
        external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
          'div',
          { className: prefix(bsProps, 'content'), role: 'document' },
          children
        )
      )
    );
  };

  return ModalDialog;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

ModalDialog_ModalDialog.propTypes = ModalDialog_propTypes;

/* harmony default export */ var src_ModalDialog = (bootstrapUtils_bsClass('modal', bsSizes([Size.LARGE, Size.SMALL], ModalDialog_ModalDialog)));
// CONCATENATED MODULE: ./src/ModalFooter.js











var ModalFooter_propTypes = {
  componentClass: elementType_default.a
};

var ModalFooter_defaultProps = {
  componentClass: 'div'
};

var ModalFooter_ModalFooter = function (_React$Component) {
  inherits_default()(ModalFooter, _React$Component);

  function ModalFooter() {
    classCallCheck_default()(this, ModalFooter);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  ModalFooter.prototype.render = function render() {
    var _props = this.props,
        Component = _props.componentClass,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['componentClass', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return ModalFooter;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

ModalFooter_ModalFooter.propTypes = ModalFooter_propTypes;
ModalFooter_ModalFooter.defaultProps = ModalFooter_defaultProps;

/* harmony default export */ var src_ModalFooter = (bootstrapUtils_bsClass('modal-footer', ModalFooter_ModalFooter));
// CONCATENATED MODULE: ./src/ModalHeader.js













// TODO: `aria-label` should be `closeLabel`.

var ModalHeader_propTypes = {
  /**
   * Provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  closeLabel: prop_types_default.a.string,

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: prop_types_default.a.bool,

  /**
   * A Callback fired when the close button is clicked. If used directly inside
   * a Modal component, the onHide will automatically be propagated up to the
   * parent Modal `onHide`.
   */
  onHide: prop_types_default.a.func
};

var ModalHeader_defaultProps = {
  closeLabel: 'Close',
  closeButton: false
};

var ModalHeader_contextTypes = {
  $bs_modal: prop_types_default.a.shape({
    onHide: prop_types_default.a.func
  })
};

var ModalHeader_ModalHeader = function (_React$Component) {
  inherits_default()(ModalHeader, _React$Component);

  function ModalHeader() {
    classCallCheck_default()(this, ModalHeader);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  ModalHeader.prototype.render = function render() {
    var _props = this.props,
        closeLabel = _props.closeLabel,
        closeButton = _props.closeButton,
        onHide = _props.onHide,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['closeLabel', 'closeButton', 'onHide', 'className', 'children']);

    var modal = this.context.$bs_modal;

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      extends_default()({}, elementProps, { className: classnames_default()(className, classes) }),
      closeButton && external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(src_CloseButton, {
        label: closeLabel,
        onClick: utils_createChainedFunction(modal && modal.onHide, onHide)
      }),
      children
    );
  };

  return ModalHeader;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

ModalHeader_ModalHeader.propTypes = ModalHeader_propTypes;
ModalHeader_ModalHeader.defaultProps = ModalHeader_defaultProps;
ModalHeader_ModalHeader.contextTypes = ModalHeader_contextTypes;

/* harmony default export */ var src_ModalHeader = (bootstrapUtils_bsClass('modal-header', ModalHeader_ModalHeader));
// CONCATENATED MODULE: ./src/ModalTitle.js











var ModalTitle_propTypes = {
  componentClass: elementType_default.a
};

var ModalTitle_defaultProps = {
  componentClass: 'h4'
};

var ModalTitle_ModalTitle = function (_React$Component) {
  inherits_default()(ModalTitle, _React$Component);

  function ModalTitle() {
    classCallCheck_default()(this, ModalTitle);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  ModalTitle.prototype.render = function render() {
    var _props = this.props,
        Component = _props.componentClass,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['componentClass', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return ModalTitle;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

ModalTitle_ModalTitle.propTypes = ModalTitle_propTypes;
ModalTitle_ModalTitle.defaultProps = ModalTitle_defaultProps;

/* harmony default export */ var src_ModalTitle = (bootstrapUtils_bsClass('modal-title', ModalTitle_ModalTitle));
// CONCATENATED MODULE: ./src/Modal.js




























var Modal_propTypes = extends_default()({}, Modal_default.a.propTypes, src_ModalDialog.propTypes, {

  /**
   * Include a backdrop component. Specify 'static' for a backdrop that doesn't
   * trigger an "onHide" when clicked.
   */
  backdrop: prop_types_default.a.oneOf(['static', true, false]),

  /**
   * Add an optional extra class name to .modal-backdrop
   * It could end up looking like class="modal-backdrop foo-modal-backdrop in".
   */
  backdropClassName: prop_types_default.a.string,

  /**
   * Close the modal when escape key is pressed
   */
  keyboard: prop_types_default.a.bool,

  /**
   * Open and close the Modal with a slide and fade animation.
   */
  animation: prop_types_default.a.bool,

  /**
   * A Component type that provides the modal content Markup. This is a useful
   * prop when you want to use your own styles and markup to create a custom
   * modal component.
   */
  dialogComponentClass: elementType_default.a,

  /**
   * When `true` The modal will automatically shift focus to itself when it
   * opens, and replace it to the last focused element when it closes.
   * Generally this should never be set to false as it makes the Modal less
   * accessible to assistive technologies, like screen-readers.
   */
  autoFocus: prop_types_default.a.bool,

  /**
   * When `true` The modal will prevent focus from leaving the Modal while
   * open. Consider leaving the default value here, as it is necessary to make
   * the Modal work well with assistive technologies, such as screen readers.
   */
  enforceFocus: prop_types_default.a.bool,

  /**
   * When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus: prop_types_default.a.bool,

  /**
   * When `true` The modal will show itself.
   */
  show: prop_types_default.a.bool,

  /**
   * A callback fired when the header closeButton or non-static backdrop is
   * clicked. Required if either are specified.
   */
  onHide: prop_types_default.a.func,

  /**
   * Callback fired before the Modal transitions in
   */
  onEnter: prop_types_default.a.func,

  /**
   * Callback fired as the Modal begins to transition in
   */
  onEntering: prop_types_default.a.func,

  /**
   * Callback fired after the Modal finishes transitioning in
   */
  onEntered: prop_types_default.a.func,

  /**
   * Callback fired right before the Modal transitions out
   */
  onExit: prop_types_default.a.func,

  /**
   * Callback fired as the Modal begins to transition out
   */
  onExiting: prop_types_default.a.func,

  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited: prop_types_default.a.func,

  /**
   * @private
   */
  container: Modal_default.a.propTypes.container
});

var Modal_defaultProps = extends_default()({}, Modal_default.a.defaultProps, {
  animation: true,
  dialogComponentClass: src_ModalDialog
});

var Modal_childContextTypes = {
  $bs_modal: prop_types_default.a.shape({
    onHide: prop_types_default.a.func
  })
};

/* eslint-disable no-use-before-define, react/no-multi-comp */
function DialogTransition(props) {
  return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(src_Fade, extends_default()({}, props, { timeout: Modal_Modal.TRANSITION_DURATION }));
}

function BackdropTransition(props) {
  return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(src_Fade, extends_default()({}, props, { timeout: Modal_Modal.BACKDROP_TRANSITION_DURATION }));
}

/* eslint-enable no-use-before-define */

var Modal_Modal = function (_React$Component) {
  inherits_default()(Modal, _React$Component);

  function Modal(props, context) {
    classCallCheck_default()(this, Modal);

    var _this = possibleConstructorReturn_default()(this, _React$Component.call(this, props, context));

    _this.handleEntering = _this.handleEntering.bind(_this);
    _this.handleExited = _this.handleExited.bind(_this);
    _this.handleWindowResize = _this.handleWindowResize.bind(_this);
    _this.handleDialogClick = _this.handleDialogClick.bind(_this);
    _this.setModalRef = _this.setModalRef.bind(_this);

    _this.state = {
      style: {}
    };
    return _this;
  }

  Modal.prototype.getChildContext = function getChildContext() {
    return {
      $bs_modal: {
        onHide: this.props.onHide
      }
    };
  };

  Modal.prototype.componentWillUnmount = function componentWillUnmount() {
    // Clean up the listener if we need to.
    this.handleExited();
  };

  Modal.prototype.setModalRef = function setModalRef(ref) {
    this._modal = ref;
  };

  Modal.prototype.handleDialogClick = function handleDialogClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onHide();
  };

  Modal.prototype.handleEntering = function handleEntering() {
    // FIXME: This should work even when animation is disabled.
    events_default.a.on(window, 'resize', this.handleWindowResize);
    this.updateStyle();
  };

  Modal.prototype.handleExited = function handleExited() {
    // FIXME: This should work even when animation is disabled.
    events_default.a.off(window, 'resize', this.handleWindowResize);
  };

  Modal.prototype.handleWindowResize = function handleWindowResize() {
    this.updateStyle();
  };

  Modal.prototype.updateStyle = function updateStyle() {
    if (!inDOM_default.a) {
      return;
    }

    var dialogNode = this._modal.getDialogElement();
    var dialogHeight = dialogNode.scrollHeight;

    var document = ownerDocument_default()(dialogNode);
    var bodyIsOverflowing = isOverflowing_default()(external___root___ReactDOM___commonjs2___react_dom___commonjs___react_dom___amd___react_dom___default.a.findDOMNode(this.props.container || document.body));
    var modalIsOverflowing = dialogHeight > document.documentElement.clientHeight;

    this.setState({
      style: {
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? scrollbarSize_default()() : undefined,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? scrollbarSize_default()() : undefined
      }
    });
  };

  Modal.prototype.render = function render() {
    var _props = this.props,
        backdrop = _props.backdrop,
        backdropClassName = _props.backdropClassName,
        animation = _props.animation,
        show = _props.show,
        Dialog = _props.dialogComponentClass,
        className = _props.className,
        style = _props.style,
        children = _props.children,
        onEntering = _props.onEntering,
        onExited = _props.onExited,
        props = objectWithoutProperties_default()(_props, ['backdrop', 'backdropClassName', 'animation', 'show', 'dialogComponentClass', 'className', 'style', 'children', 'onEntering', 'onExited']);

    var _splitComponentProps = splitComponentProps(props, Modal_default.a),
        baseModalProps = _splitComponentProps[0],
        dialogProps = _splitComponentProps[1];

    var inClassName = show && !animation && 'in';

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      Modal_default.a,
      extends_default()({}, baseModalProps, {
        ref: this.setModalRef,
        show: show,
        containerClassName: prefix(props, 'open'),
        transition: animation ? DialogTransition : undefined,
        backdrop: backdrop,
        backdropTransition: animation ? BackdropTransition : undefined,
        backdropClassName: classnames_default()(prefix(props, 'backdrop'), backdropClassName, inClassName),
        onEntering: utils_createChainedFunction(onEntering, this.handleEntering),
        onExited: utils_createChainedFunction(onExited, this.handleExited)
      }),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        Dialog,
        extends_default()({}, dialogProps, {
          style: extends_default()({}, this.state.style, style),
          className: classnames_default()(className, inClassName),
          onClick: backdrop === true ? this.handleDialogClick : null
        }),
        children
      )
    );
  };

  return Modal;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Modal_Modal.propTypes = Modal_propTypes;
Modal_Modal.defaultProps = Modal_defaultProps;
Modal_Modal.childContextTypes = Modal_childContextTypes;

Modal_Modal.Body = src_ModalBody;
Modal_Modal.Header = src_ModalHeader;
Modal_Modal.Title = src_ModalTitle;
Modal_Modal.Footer = src_ModalFooter;

Modal_Modal.Dialog = src_ModalDialog;

Modal_Modal.TRANSITION_DURATION = 300;
Modal_Modal.BACKDROP_TRANSITION_DURATION = 150;

/* harmony default export */ var src_Modal = (bootstrapUtils_bsClass('modal', bsSizes([Size.LARGE, Size.SMALL], Modal_Modal)));
// CONCATENATED MODULE: ./src/Nav.js

















// TODO: Should we expose `<NavItem>` as `<Nav.Item>`?

// TODO: This `bsStyle` is very unlike the others. Should we rename it?

// TODO: `pullRight` and `pullLeft` don't render right outside of `navbar`.
// Consider renaming or replacing them.

var Nav_propTypes = {
  /**
   * Marks the NavItem with a matching `eventKey` as active. Has a
   * higher precedence over `activeHref`.
   */
  activeKey: prop_types_default.a.any,

  /**
   * Marks the child NavItem with a matching `href` prop as active.
   */
  activeHref: prop_types_default.a.string,

  /**
   * NavItems are be positioned vertically.
   */
  stacked: prop_types_default.a.bool,

  justified: all_default()(prop_types_default.a.bool, function (_ref) {
    var justified = _ref.justified,
        navbar = _ref.navbar;
    return justified && navbar ? Error('justified navbar `Nav`s are not supported') : null;
  }),

  /**
   * A callback fired when a NavItem is selected.
   *
   * ```js
   * function (
   *  Any eventKey,
   *  SyntheticEvent event?
   * )
   * ```
   */
  onSelect: prop_types_default.a.func,

  /**
   * ARIA role for the Nav, in the context of a TabContainer, the default will
   * be set to "tablist", but can be overridden by the Nav when set explicitly.
   *
   * When the role is set to "tablist" NavItem focus is managed according to
   * the ARIA authoring practices for tabs:
   * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
   */
  role: prop_types_default.a.string,

  /**
   * Apply styling an alignment for use in a Navbar. This prop will be set
   * automatically when the Nav is used inside a Navbar.
   */
  navbar: prop_types_default.a.bool,

  /**
   * Float the Nav to the right. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullRight: prop_types_default.a.bool,

  /**
   * Float the Nav to the left. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullLeft: prop_types_default.a.bool
};

var Nav_defaultProps = {
  justified: false,
  pullRight: false,
  pullLeft: false,
  stacked: false
};

var Nav_contextTypes = {
  $bs_navbar: prop_types_default.a.shape({
    bsClass: prop_types_default.a.string,
    onSelect: prop_types_default.a.func
  }),

  $bs_tabContainer: prop_types_default.a.shape({
    activeKey: prop_types_default.a.any,
    onSelect: prop_types_default.a.func.isRequired,
    getTabId: prop_types_default.a.func.isRequired,
    getPaneId: prop_types_default.a.func.isRequired
  })
};

var Nav_Nav = function (_React$Component) {
  inherits_default()(Nav, _React$Component);

  function Nav() {
    classCallCheck_default()(this, Nav);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Nav.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    if (!this._needsRefocus) {
      return;
    }

    this._needsRefocus = false;

    var children = this.props.children;

    var _getActiveProps = this.getActiveProps(),
        activeKey = _getActiveProps.activeKey,
        activeHref = _getActiveProps.activeHref;

    var activeChild = ValidComponentChildren.find(children, function (child) {
      return _this2.isActive(child, activeKey, activeHref);
    });

    var childrenArray = ValidComponentChildren.toArray(children);
    var activeChildIndex = childrenArray.indexOf(activeChild);

    var childNodes = external___root___ReactDOM___commonjs2___react_dom___commonjs___react_dom___amd___react_dom___default.a.findDOMNode(this).children;
    var activeNode = childNodes && childNodes[activeChildIndex];

    if (!activeNode || !activeNode.firstChild) {
      return;
    }

    activeNode.firstChild.focus();
  };

  Nav.prototype.getActiveProps = function getActiveProps() {
    var tabContainer = this.context.$bs_tabContainer;

    if (tabContainer) {
      undefined !== 'production' ? warning_browser_default()(this.props.activeKey == null && !this.props.activeHref, 'Specifying a `<Nav>` `activeKey` or `activeHref` in the context of ' + 'a `<TabContainer>` is not supported. Instead use `<TabContainer ' + ('activeKey={' + this.props.activeKey + '} />`.')) : void 0;

      return tabContainer;
    }

    return this.props;
  };

  Nav.prototype.getNextActiveChild = function getNextActiveChild(offset) {
    var _this3 = this;

    var children = this.props.children;

    var validChildren = children.filter(function (child) {
      return child.props.eventKey != null && !child.props.disabled;
    });

    var _getActiveProps2 = this.getActiveProps(),
        activeKey = _getActiveProps2.activeKey,
        activeHref = _getActiveProps2.activeHref;

    var activeChild = ValidComponentChildren.find(children, function (child) {
      return _this3.isActive(child, activeKey, activeHref);
    });

    // This assumes the active child is not disabled.
    var activeChildIndex = validChildren.indexOf(activeChild);
    if (activeChildIndex === -1) {
      // Something has gone wrong. Select the first valid child we can find.
      return validChildren[0];
    }

    var nextIndex = activeChildIndex + offset;
    var numValidChildren = validChildren.length;

    if (nextIndex >= numValidChildren) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = numValidChildren - 1;
    }

    return validChildren[nextIndex];
  };

  Nav.prototype.getTabProps = function getTabProps(child, tabContainer, navRole, active, onSelect) {
    var _this4 = this;

    if (!tabContainer && navRole !== 'tablist') {
      // No tab props here.
      return null;
    }

    var _child$props = child.props,
        id = _child$props.id,
        controls = _child$props['aria-controls'],
        eventKey = _child$props.eventKey,
        role = _child$props.role,
        onKeyDown = _child$props.onKeyDown,
        tabIndex = _child$props.tabIndex;


    if (tabContainer) {
      undefined !== 'production' ? warning_browser_default()(!id && !controls, 'In the context of a `<TabContainer>`, `<NavItem>`s are given ' + 'generated `id` and `aria-controls` attributes for the sake of ' + 'proper component accessibility. Any provided ones will be ignored. ' + 'To control these attributes directly, provide a `generateChildId` ' + 'prop to the parent `<TabContainer>`.') : void 0;

      id = tabContainer.getTabId(eventKey);
      controls = tabContainer.getPaneId(eventKey);
    }

    if (navRole === 'tablist') {
      role = role || 'tab';
      onKeyDown = utils_createChainedFunction(function (event) {
        return _this4.handleTabKeyDown(onSelect, event);
      }, onKeyDown);
      tabIndex = active ? tabIndex : -1;
    }

    return {
      id: id,
      role: role,
      onKeyDown: onKeyDown,
      'aria-controls': controls,
      tabIndex: tabIndex
    };
  };

  Nav.prototype.handleTabKeyDown = function handleTabKeyDown(onSelect, event) {
    var nextActiveChild = void 0;

    switch (event.keyCode) {
      case keycode_default.a.codes.left:
      case keycode_default.a.codes.up:
        nextActiveChild = this.getNextActiveChild(-1);
        break;
      case keycode_default.a.codes.right:
      case keycode_default.a.codes.down:
        nextActiveChild = this.getNextActiveChild(1);
        break;
      default:
        // It was a different key; don't handle this keypress.
        return;
    }

    event.preventDefault();

    if (onSelect && nextActiveChild && nextActiveChild.props.eventKey != null) {
      onSelect(nextActiveChild.props.eventKey);
    }

    this._needsRefocus = true;
  };

  Nav.prototype.isActive = function isActive(_ref2, activeKey, activeHref) {
    var props = _ref2.props;

    if (props.active || activeKey != null && props.eventKey === activeKey || activeHref && props.href === activeHref) {
      return true;
    }

    return props.active;
  };

  Nav.prototype.render = function render() {
    var _extends2,
        _this5 = this;

    var _props = this.props,
        stacked = _props.stacked,
        justified = _props.justified,
        onSelect = _props.onSelect,
        propsRole = _props.role,
        propsNavbar = _props.navbar,
        pullRight = _props.pullRight,
        pullLeft = _props.pullLeft,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['stacked', 'justified', 'onSelect', 'role', 'navbar', 'pullRight', 'pullLeft', 'className', 'children']);

    var tabContainer = this.context.$bs_tabContainer;
    var role = propsRole || (tabContainer ? 'tablist' : null);

    var _getActiveProps3 = this.getActiveProps(),
        activeKey = _getActiveProps3.activeKey,
        activeHref = _getActiveProps3.activeHref;

    delete props.activeKey; // Accessed via this.getActiveProps().
    delete props.activeHref; // Accessed via this.getActiveProps().

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = extends_default()({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps, 'stacked')] = stacked, _extends2[prefix(bsProps, 'justified')] = justified, _extends2));

    var navbar = propsNavbar != null ? propsNavbar : this.context.$bs_navbar;
    var pullLeftClassName = void 0;
    var pullRightClassName = void 0;

    if (navbar) {
      var navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

      classes[prefix(navbarProps, 'nav')] = true;

      pullRightClassName = prefix(navbarProps, 'right');
      pullLeftClassName = prefix(navbarProps, 'left');
    } else {
      pullRightClassName = 'pull-right';
      pullLeftClassName = 'pull-left';
    }

    classes[pullRightClassName] = pullRight;
    classes[pullLeftClassName] = pullLeft;

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'ul',
      extends_default()({}, elementProps, {
        role: role,
        className: classnames_default()(className, classes)
      }),
      ValidComponentChildren.map(children, function (child) {
        var active = _this5.isActive(child, activeKey, activeHref);
        var childOnSelect = utils_createChainedFunction(child.props.onSelect, onSelect, navbar && navbar.onSelect, tabContainer && tabContainer.onSelect);

        return Object(external___root___React___commonjs2___react___commonjs___react___amd___react__["cloneElement"])(child, extends_default()({}, _this5.getTabProps(child, tabContainer, role, active, childOnSelect), {
          active: active,
          activeKey: activeKey,
          activeHref: activeHref,
          onSelect: childOnSelect
        }));
      })
    );
  };

  return Nav;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Nav_Nav.propTypes = Nav_propTypes;
Nav_Nav.defaultProps = Nav_defaultProps;
Nav_Nav.contextTypes = Nav_contextTypes;

/* harmony default export */ var src_Nav = (bootstrapUtils_bsClass('nav', bsStyles(['tabs', 'pills'], Nav_Nav)));
// CONCATENATED MODULE: ./src/NavbarBrand.js











var NavbarBrand_contextTypes = {
  $bs_navbar: prop_types_default.a.shape({
    bsClass: prop_types_default.a.string
  })
};

var NavbarBrand_NavbarBrand = function (_React$Component) {
  inherits_default()(NavbarBrand, _React$Component);

  function NavbarBrand() {
    classCallCheck_default()(this, NavbarBrand);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  NavbarBrand.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['className', 'children']);

    var navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

    var bsClassName = prefix(navbarProps, 'brand');

    if (external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.isValidElement(children)) {
      return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.cloneElement(children, {
        className: classnames_default()(children.props.className, className, bsClassName)
      });
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'span',
      extends_default()({}, props, { className: classnames_default()(className, bsClassName) }),
      children
    );
  };

  return NavbarBrand;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

NavbarBrand_NavbarBrand.contextTypes = NavbarBrand_contextTypes;

/* harmony default export */ var src_NavbarBrand = (NavbarBrand_NavbarBrand);
// CONCATENATED MODULE: ./src/NavbarCollapse.js











var NavbarCollapse_contextTypes = {
  $bs_navbar: prop_types_default.a.shape({
    bsClass: prop_types_default.a.string,
    expanded: prop_types_default.a.bool
  })
};

var NavbarCollapse_NavbarCollapse = function (_React$Component) {
  inherits_default()(NavbarCollapse, _React$Component);

  function NavbarCollapse() {
    classCallCheck_default()(this, NavbarCollapse);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  NavbarCollapse.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['children']);

    var navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

    var bsClassName = prefix(navbarProps, 'collapse');

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      src_Collapse,
      extends_default()({ 'in': navbarProps.expanded }, props),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'div',
        { className: bsClassName },
        children
      )
    );
  };

  return NavbarCollapse;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

NavbarCollapse_NavbarCollapse.contextTypes = NavbarCollapse_contextTypes;

/* harmony default export */ var src_NavbarCollapse = (NavbarCollapse_NavbarCollapse);
// CONCATENATED MODULE: ./src/NavbarHeader.js











var NavbarHeader_contextTypes = {
  $bs_navbar: prop_types_default.a.shape({
    bsClass: prop_types_default.a.string
  })
};

var NavbarHeader_NavbarHeader = function (_React$Component) {
  inherits_default()(NavbarHeader, _React$Component);

  function NavbarHeader() {
    classCallCheck_default()(this, NavbarHeader);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  NavbarHeader.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['className']);

    var navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

    var bsClassName = prefix(navbarProps, 'header');

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('div', extends_default()({}, props, { className: classnames_default()(className, bsClassName) }));
  };

  return NavbarHeader;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

NavbarHeader_NavbarHeader.contextTypes = NavbarHeader_contextTypes;

/* harmony default export */ var src_NavbarHeader = (NavbarHeader_NavbarHeader);
// CONCATENATED MODULE: ./src/NavbarToggle.js












var NavbarToggle_propTypes = {
  onClick: prop_types_default.a.func,
  /**
   * The toggle content, if left empty it will render the default toggle (seen above).
   */
  children: prop_types_default.a.node
};

var NavbarToggle_contextTypes = {
  $bs_navbar: prop_types_default.a.shape({
    bsClass: prop_types_default.a.string,
    expanded: prop_types_default.a.bool,
    onToggle: prop_types_default.a.func.isRequired
  })
};

var NavbarToggle_NavbarToggle = function (_React$Component) {
  inherits_default()(NavbarToggle, _React$Component);

  function NavbarToggle() {
    classCallCheck_default()(this, NavbarToggle);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  NavbarToggle.prototype.render = function render() {
    var _props = this.props,
        onClick = _props.onClick,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['onClick', 'className', 'children']);

    var navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

    var buttonProps = extends_default()({
      type: 'button'
    }, props, {
      onClick: utils_createChainedFunction(onClick, navbarProps.onToggle),
      className: classnames_default()(className, prefix(navbarProps, 'toggle'), !navbarProps.expanded && 'collapsed')
    });

    if (children) {
      return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'button',
        buttonProps,
        children
      );
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'button',
      buttonProps,
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'span',
        { className: 'sr-only' },
        'Toggle navigation'
      ),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('span', { className: 'icon-bar' }),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('span', { className: 'icon-bar' }),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('span', { className: 'icon-bar' })
    );
  };

  return NavbarToggle;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

NavbarToggle_NavbarToggle.propTypes = NavbarToggle_propTypes;
NavbarToggle_NavbarToggle.contextTypes = NavbarToggle_contextTypes;

/* harmony default export */ var src_NavbarToggle = (NavbarToggle_NavbarToggle);
// CONCATENATED MODULE: ./src/Navbar.js





// TODO: Remove this pragma once we upgrade eslint-config-airbnb.
/* eslint-disable react/no-multi-comp */
















var Navbar_propTypes = {
  /**
   * Create a fixed navbar along the top of the screen, that scrolls with the
   * page
   */
  fixedTop: prop_types_default.a.bool,
  /**
   * Create a fixed navbar along the bottom of the screen, that scrolls with
   * the page
   */
  fixedBottom: prop_types_default.a.bool,
  /**
   * Create a full-width navbar that scrolls away with the page
   */
  staticTop: prop_types_default.a.bool,
  /**
   * An alternative dark visual style for the Navbar
   */
  inverse: prop_types_default.a.bool,
  /**
   * Allow the Navbar to fluidly adjust to the page or container width, instead
   * of at the predefined screen breakpoints
   */
  fluid: prop_types_default.a.bool,

  /**
   * Set a custom element for this component.
   */
  componentClass: elementType_default.a,
  /**
   * A callback fired when the `<Navbar>` body collapses or expands. Fired when
   * a `<Navbar.Toggle>` is clicked and called with the new `expanded`
   * boolean value.
   *
   * @controllable expanded
   */
  onToggle: prop_types_default.a.func,
  /**
   * A callback fired when a descendant of a child `<Nav>` is selected. Should
   * be used to execute complex closing or other miscellaneous actions desired
   * after selecting a descendant of `<Nav>`. Does nothing if no `<Nav>` or `<Nav>`
   * descendants exist. The callback is called with an eventKey, which is a
   * prop from the selected `<Nav>` descendant, and an event.
   *
   * ```js
   * function (
   *  Any eventKey,
   *  SyntheticEvent event?
   * )
   * ```
   *
   * For basic closing behavior after all `<Nav>` descendant onSelect events in
   * mobile viewports, try using collapseOnSelect.
   *
   * Note: If you are manually closing the navbar using this `OnSelect` prop,
   * ensure that you are setting `expanded` to false and not *toggling* between
   * true and false.
   */
  onSelect: prop_types_default.a.func,
  /**
   * Sets `expanded` to `false` after the onSelect event of a descendant of a
   * child `<Nav>`. Does nothing if no `<Nav>` or `<Nav>` descendants exist.
   *
   * The onSelect callback should be used instead for more complex operations
   * that need to be executed after the `select` event of `<Nav>` descendants.
   */
  collapseOnSelect: prop_types_default.a.bool,
  /**
   * Explicitly set the visiblity of the navbar body
   *
   * @controllable onToggle
   */
  expanded: prop_types_default.a.bool,

  role: prop_types_default.a.string
};

var Navbar_defaultProps = {
  componentClass: 'nav',
  fixedTop: false,
  fixedBottom: false,
  staticTop: false,
  inverse: false,
  fluid: false,
  collapseOnSelect: false
};

var Navbar_childContextTypes = {
  $bs_navbar: prop_types_default.a.shape({
    bsClass: prop_types_default.a.string,
    expanded: prop_types_default.a.bool,
    onToggle: prop_types_default.a.func.isRequired,
    onSelect: prop_types_default.a.func
  })
};

var Navbar_Navbar = function (_React$Component) {
  inherits_default()(Navbar, _React$Component);

  function Navbar(props, context) {
    classCallCheck_default()(this, Navbar);

    var _this = possibleConstructorReturn_default()(this, _React$Component.call(this, props, context));

    _this.handleToggle = _this.handleToggle.bind(_this);
    _this.handleCollapse = _this.handleCollapse.bind(_this);
    return _this;
  }

  Navbar.prototype.getChildContext = function getChildContext() {
    var _props = this.props,
        bsClass = _props.bsClass,
        expanded = _props.expanded,
        onSelect = _props.onSelect,
        collapseOnSelect = _props.collapseOnSelect;


    return {
      $bs_navbar: {
        bsClass: bsClass,
        expanded: expanded,
        onToggle: this.handleToggle,
        onSelect: utils_createChainedFunction(onSelect, collapseOnSelect ? this.handleCollapse : null)
      }
    };
  };

  Navbar.prototype.handleCollapse = function handleCollapse() {
    var _props2 = this.props,
        onToggle = _props2.onToggle,
        expanded = _props2.expanded;


    if (expanded) {
      onToggle(false);
    }
  };

  Navbar.prototype.handleToggle = function handleToggle() {
    var _props3 = this.props,
        onToggle = _props3.onToggle,
        expanded = _props3.expanded;


    onToggle(!expanded);
  };

  Navbar.prototype.render = function render() {
    var _extends2;

    var _props4 = this.props,
        Component = _props4.componentClass,
        fixedTop = _props4.fixedTop,
        fixedBottom = _props4.fixedBottom,
        staticTop = _props4.staticTop,
        inverse = _props4.inverse,
        fluid = _props4.fluid,
        className = _props4.className,
        children = _props4.children,
        props = objectWithoutProperties_default()(_props4, ['componentClass', 'fixedTop', 'fixedBottom', 'staticTop', 'inverse', 'fluid', 'className', 'children']);

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['expanded', 'onToggle', 'onSelect', 'collapseOnSelect']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    // will result in some false positives but that seems better
    // than false negatives. strict `undefined` check allows explicit
    // "nulling" of the role if the user really doesn't want one


    if (elementProps.role === undefined && Component !== 'nav') {
      elementProps.role = 'navigation';
    }

    if (inverse) {
      bsProps.bsStyle = Style.INVERSE;
    }

    var classes = extends_default()({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps, 'fixed-top')] = fixedTop, _extends2[prefix(bsProps, 'fixed-bottom')] = fixedBottom, _extends2[prefix(bsProps, 'static-top')] = staticTop, _extends2));

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      Component,
      extends_default()({}, elementProps, { className: classnames_default()(className, classes) }),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        src_Grid,
        { fluid: fluid },
        children
      )
    );
  };

  return Navbar;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Navbar_Navbar.propTypes = Navbar_propTypes;
Navbar_Navbar.defaultProps = Navbar_defaultProps;
Navbar_Navbar.childContextTypes = Navbar_childContextTypes;

bootstrapUtils_bsClass('navbar', Navbar_Navbar);

var UncontrollableNavbar = uncontrollable_default()(Navbar_Navbar, { expanded: 'onToggle' });

function createSimpleWrapper(tag, suffix, displayName) {
  var Wrapper = function Wrapper(_ref, _ref2) {
    var _ref2$$bs_navbar = _ref2.$bs_navbar,
        navbarProps = _ref2$$bs_navbar === undefined ? { bsClass: 'navbar' } : _ref2$$bs_navbar;

    var Component = _ref.componentClass,
        className = _ref.className,
        pullRight = _ref.pullRight,
        pullLeft = _ref.pullLeft,
        props = objectWithoutProperties_default()(_ref, ['componentClass', 'className', 'pullRight', 'pullLeft']);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, props, {
      className: classnames_default()(className, prefix(navbarProps, suffix), pullRight && prefix(navbarProps, 'right'), pullLeft && prefix(navbarProps, 'left'))
    }));
  };

  Wrapper.displayName = displayName;

  Wrapper.propTypes = {
    componentClass: elementType_default.a,
    pullRight: prop_types_default.a.bool,
    pullLeft: prop_types_default.a.bool
  };

  Wrapper.defaultProps = {
    componentClass: tag,
    pullRight: false,
    pullLeft: false
  };

  Wrapper.contextTypes = {
    $bs_navbar: prop_types_default.a.shape({
      bsClass: prop_types_default.a.string
    })
  };

  return Wrapper;
}

UncontrollableNavbar.Brand = src_NavbarBrand;
UncontrollableNavbar.Header = src_NavbarHeader;
UncontrollableNavbar.Toggle = src_NavbarToggle;
UncontrollableNavbar.Collapse = src_NavbarCollapse;

UncontrollableNavbar.Form = createSimpleWrapper('div', 'form', 'NavbarForm');
UncontrollableNavbar.Text = createSimpleWrapper('p', 'text', 'NavbarText');
UncontrollableNavbar.Link = createSimpleWrapper('a', 'link', 'NavbarLink');

// Set bsStyles here so they can be overridden.
/* harmony default export */ var src_Navbar = (bsStyles([Style.DEFAULT, Style.INVERSE], Style.DEFAULT, UncontrollableNavbar));
// CONCATENATED MODULE: ./src/NavDropdown.js













var NavDropdown_propTypes = extends_default()({}, src_Dropdown.propTypes, {

  // Toggle props.
  title: prop_types_default.a.node.isRequired,
  noCaret: prop_types_default.a.bool,
  active: prop_types_default.a.bool,
  activeKey: prop_types_default.a.any,
  activeHref: prop_types_default.a.string,

  // Override generated docs from <Dropdown>.
  /**
   * @private
   */
  children: prop_types_default.a.node
});

var NavDropdown_NavDropdown = function (_React$Component) {
  inherits_default()(NavDropdown, _React$Component);

  function NavDropdown() {
    classCallCheck_default()(this, NavDropdown);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  NavDropdown.prototype.isActive = function isActive(_ref, activeKey, activeHref) {
    var props = _ref.props;

    var _this2 = this;

    if (props.active || activeKey != null && props.eventKey === activeKey || activeHref && props.href === activeHref) {
      return true;
    }

    if (ValidComponentChildren.some(props.children, function (child) {
      return _this2.isActive(child, activeKey, activeHref);
    })) {
      return true;
    }

    return props.active;
  };

  NavDropdown.prototype.render = function render() {
    var _this3 = this;

    var _props = this.props,
        title = _props.title,
        activeKey = _props.activeKey,
        activeHref = _props.activeHref,
        className = _props.className,
        style = _props.style,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['title', 'activeKey', 'activeHref', 'className', 'style', 'children']);

    var active = this.isActive(this, activeKey, activeHref);
    delete props.active; // Accessed via this.isActive().
    delete props.eventKey; // Accessed via this.isActive().

    var _splitComponentProps = splitComponentProps(props, src_Dropdown.ControlledComponent),
        dropdownProps = _splitComponentProps[0],
        toggleProps = _splitComponentProps[1];

    // Unlike for the other dropdowns, styling needs to go to the `<Dropdown>`
    // rather than the `<Dropdown.Toggle>`.

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      src_Dropdown,
      extends_default()({}, dropdownProps, {
        componentClass: 'li',
        className: classnames_default()(className, { active: active }),
        style: style
      }),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        src_Dropdown.Toggle,
        extends_default()({}, toggleProps, { useAnchor: true }),
        title
      ),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        src_Dropdown.Menu,
        null,
        ValidComponentChildren.map(children, function (child) {
          return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.cloneElement(child, {
            active: _this3.isActive(child, activeKey, activeHref)
          });
        })
      )
    );
  };

  return NavDropdown;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

NavDropdown_NavDropdown.propTypes = NavDropdown_propTypes;

/* harmony default export */ var src_NavDropdown = (NavDropdown_NavDropdown);
// CONCATENATED MODULE: ./src/NavItem.js












var NavItem_propTypes = {
  active: prop_types_default.a.bool,
  disabled: prop_types_default.a.bool,
  role: prop_types_default.a.string,
  href: prop_types_default.a.string,
  onClick: prop_types_default.a.func,
  onSelect: prop_types_default.a.func,
  eventKey: prop_types_default.a.any
};

var NavItem_defaultProps = {
  active: false,
  disabled: false
};

var NavItem_NavItem = function (_React$Component) {
  inherits_default()(NavItem, _React$Component);

  function NavItem(props, context) {
    classCallCheck_default()(this, NavItem);

    var _this = possibleConstructorReturn_default()(this, _React$Component.call(this, props, context));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  NavItem.prototype.handleClick = function handleClick(e) {
    if (this.props.disabled) {
      e.preventDefault();
      return;
    }

    if (this.props.onSelect) {
      this.props.onSelect(this.props.eventKey, e);
    }
  };

  NavItem.prototype.render = function render() {
    var _props = this.props,
        active = _props.active,
        disabled = _props.disabled,
        onClick = _props.onClick,
        className = _props.className,
        style = _props.style,
        props = objectWithoutProperties_default()(_props, ['active', 'disabled', 'onClick', 'className', 'style']);

    delete props.onSelect;
    delete props.eventKey;

    // These are injected down by `<Nav>` for building `<SubNav>`s.
    delete props.activeKey;
    delete props.activeHref;

    if (!props.role) {
      if (props.href === '#') {
        props.role = 'button';
      }
    } else if (props.role === 'tab') {
      props['aria-selected'] = active;
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'li',
      {
        role: 'presentation',
        className: classnames_default()(className, { active: active, disabled: disabled }),
        style: style
      },
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(src_SafeAnchor, extends_default()({}, props, {
        disabled: disabled,
        onClick: utils_createChainedFunction(onClick, this.handleClick)
      }))
    );
  };

  return NavItem;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

NavItem_NavItem.propTypes = NavItem_propTypes;
NavItem_NavItem.defaultProps = NavItem_defaultProps;

/* harmony default export */ var src_NavItem = (NavItem_NavItem);
// EXTERNAL MODULE: ./node_modules/react-overlays/lib/Overlay.js
var lib_Overlay = __webpack_require__(168);
var Overlay_default = /*#__PURE__*/__webpack_require__.n(lib_Overlay);

// CONCATENATED MODULE: ./src/Overlay.js













var Overlay_propTypes = extends_default()({}, Overlay_default.a.propTypes, {

  /**
   * Set the visibility of the Overlay
   */
  show: prop_types_default.a.bool,
  /**
   * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
   */
  rootClose: prop_types_default.a.bool,
  /**
   * A callback invoked by the overlay when it wishes to be hidden. Required if
   * `rootClose` is specified.
   */
  onHide: prop_types_default.a.func,

  /**
   * Use animation
   */
  animation: prop_types_default.a.oneOfType([prop_types_default.a.bool, elementType_default.a]),

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: prop_types_default.a.func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: prop_types_default.a.func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: prop_types_default.a.func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: prop_types_default.a.func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: prop_types_default.a.func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: prop_types_default.a.func,

  /**
   * Sets the direction of the Overlay.
   */
  placement: prop_types_default.a.oneOf(['top', 'right', 'bottom', 'left'])
});

var Overlay_defaultProps = {
  animation: src_Fade,
  rootClose: false,
  show: false,
  placement: 'right'
};

var Overlay_Overlay = function (_React$Component) {
  inherits_default()(Overlay, _React$Component);

  function Overlay() {
    classCallCheck_default()(this, Overlay);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Overlay.prototype.render = function render() {
    var _props = this.props,
        animation = _props.animation,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['animation', 'children']);

    var transition = animation === true ? src_Fade : animation || null;

    var child = void 0;

    if (!transition) {
      child = Object(external___root___React___commonjs2___react___commonjs___react___amd___react__["cloneElement"])(children, {
        className: classnames_default()(children.props.className, 'in')
      });
    } else {
      child = children;
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      Overlay_default.a,
      extends_default()({}, props, { transition: transition }),
      child
    );
  };

  return Overlay;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Overlay_Overlay.propTypes = Overlay_propTypes;
Overlay_Overlay.defaultProps = Overlay_defaultProps;

/* harmony default export */ var src_Overlay = (Overlay_Overlay);
// CONCATENATED MODULE: ./src/OverlayTrigger.js















/**
 * Check if value one is inside or equal to the of value
 *
 * @param {string} one
 * @param {string|array} of
 * @returns {boolean}
 */
function isOneOf(one, of) {
  if (Array.isArray(of)) {
    return of.indexOf(one) >= 0;
  }
  return one === of;
}

var triggerType = prop_types_default.a.oneOf(['click', 'hover', 'focus']);

var OverlayTrigger_propTypes = extends_default()({}, src_Overlay.propTypes, {

  /**
   * Specify which action or actions trigger Overlay visibility
   */
  trigger: prop_types_default.a.oneOfType([triggerType, prop_types_default.a.arrayOf(triggerType)]),

  /**
   * A millisecond delay amount to show and hide the Overlay once triggered
   */
  delay: prop_types_default.a.number,
  /**
   * A millisecond delay amount before showing the Overlay once triggered.
   */
  delayShow: prop_types_default.a.number,
  /**
   * A millisecond delay amount before hiding the Overlay once triggered.
   */
  delayHide: prop_types_default.a.number,

  // FIXME: This should be `defaultShow`.
  /**
   * The initial visibility state of the Overlay. For more nuanced visibility
   * control, consider using the Overlay component directly.
   */
  defaultOverlayShown: prop_types_default.a.bool,

  /**
   * An element or text to overlay next to the target.
   */
  overlay: prop_types_default.a.node.isRequired,

  /**
   * @private
   */
  onBlur: prop_types_default.a.func,
  /**
   * @private
   */
  onClick: prop_types_default.a.func,
  /**
   * @private
   */
  onFocus: prop_types_default.a.func,
  /**
   * @private
   */
  onMouseOut: prop_types_default.a.func,
  /**
   * @private
   */
  onMouseOver: prop_types_default.a.func,

  // Overridden props from `<Overlay>`.
  /**
   * @private
   */
  target: prop_types_default.a.oneOf([null]),
  /**
   * @private
   */
  onHide: prop_types_default.a.oneOf([null]),
  /**
   * @private
   */
  show: prop_types_default.a.oneOf([null])
});

var OverlayTrigger_defaultProps = {
  defaultOverlayShown: false,
  trigger: ['hover', 'focus']
};

var OverlayTrigger_OverlayTrigger = function (_React$Component) {
  inherits_default()(OverlayTrigger, _React$Component);

  function OverlayTrigger(props, context) {
    classCallCheck_default()(this, OverlayTrigger);

    var _this = possibleConstructorReturn_default()(this, _React$Component.call(this, props, context));

    _this.handleToggle = _this.handleToggle.bind(_this);
    _this.handleDelayedShow = _this.handleDelayedShow.bind(_this);
    _this.handleDelayedHide = _this.handleDelayedHide.bind(_this);
    _this.handleHide = _this.handleHide.bind(_this);

    _this.handleMouseOver = function (e) {
      return _this.handleMouseOverOut(_this.handleDelayedShow, e, 'fromElement');
    };
    _this.handleMouseOut = function (e) {
      return _this.handleMouseOverOut(_this.handleDelayedHide, e, 'toElement');
    };

    _this._mountNode = null;

    _this.state = {
      show: props.defaultOverlayShown
    };
    return _this;
  }

  OverlayTrigger.prototype.componentDidMount = function componentDidMount() {
    this._mountNode = document.createElement('div');
    this.renderOverlay();
  };

  OverlayTrigger.prototype.componentDidUpdate = function componentDidUpdate() {
    this.renderOverlay();
  };

  OverlayTrigger.prototype.componentWillUnmount = function componentWillUnmount() {
    external___root___ReactDOM___commonjs2___react_dom___commonjs___react_dom___amd___react_dom___default.a.unmountComponentAtNode(this._mountNode);
    this._mountNode = null;

    clearTimeout(this._hoverShowDelay);
    clearTimeout(this._hoverHideDelay);
  };

  OverlayTrigger.prototype.handleDelayedHide = function handleDelayedHide() {
    var _this2 = this;

    if (this._hoverShowDelay != null) {
      clearTimeout(this._hoverShowDelay);
      this._hoverShowDelay = null;
      return;
    }

    if (!this.state.show || this._hoverHideDelay != null) {
      return;
    }

    var delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay;

    if (!delay) {
      this.hide();
      return;
    }

    this._hoverHideDelay = setTimeout(function () {
      _this2._hoverHideDelay = null;
      _this2.hide();
    }, delay);
  };

  OverlayTrigger.prototype.handleDelayedShow = function handleDelayedShow() {
    var _this3 = this;

    if (this._hoverHideDelay != null) {
      clearTimeout(this._hoverHideDelay);
      this._hoverHideDelay = null;
      return;
    }

    if (this.state.show || this._hoverShowDelay != null) {
      return;
    }

    var delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay;

    if (!delay) {
      this.show();
      return;
    }

    this._hoverShowDelay = setTimeout(function () {
      _this3._hoverShowDelay = null;
      _this3.show();
    }, delay);
  };

  OverlayTrigger.prototype.handleHide = function handleHide() {
    this.hide();
  };

  // Simple implementation of mouseEnter and mouseLeave.
  // React's built version is broken: https://github.com/facebook/react/issues/4251
  // for cases when the trigger is disabled and mouseOut/Over can cause flicker
  // moving from one child element to another.


  OverlayTrigger.prototype.handleMouseOverOut = function handleMouseOverOut(handler, e, relatedNative) {
    var target = e.currentTarget;
    var related = e.relatedTarget || e.nativeEvent[relatedNative];

    if ((!related || related !== target) && !contains_default()(target, related)) {
      handler(e);
    }
  };

  OverlayTrigger.prototype.handleToggle = function handleToggle() {
    if (this.state.show) {
      this.hide();
    } else {
      this.show();
    }
  };

  OverlayTrigger.prototype.hide = function hide() {
    this.setState({ show: false });
  };

  OverlayTrigger.prototype.makeOverlay = function makeOverlay(overlay, props) {
    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      src_Overlay,
      extends_default()({}, props, {
        show: this.state.show,
        onHide: this.handleHide,
        target: this
      }),
      overlay
    );
  };

  OverlayTrigger.prototype.show = function show() {
    this.setState({ show: true });
  };

  OverlayTrigger.prototype.renderOverlay = function renderOverlay() {
    external___root___ReactDOM___commonjs2___react_dom___commonjs___react_dom___amd___react_dom___default.a.unstable_renderSubtreeIntoContainer(this, this._overlay, this._mountNode);
  };

  OverlayTrigger.prototype.render = function render() {
    var _props = this.props,
        trigger = _props.trigger,
        overlay = _props.overlay,
        children = _props.children,
        onBlur = _props.onBlur,
        onClick = _props.onClick,
        onFocus = _props.onFocus,
        onMouseOut = _props.onMouseOut,
        onMouseOver = _props.onMouseOver,
        props = objectWithoutProperties_default()(_props, ['trigger', 'overlay', 'children', 'onBlur', 'onClick', 'onFocus', 'onMouseOut', 'onMouseOver']);

    delete props.delay;
    delete props.delayShow;
    delete props.delayHide;
    delete props.defaultOverlayShown;

    var child = external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Children.only(children);
    var childProps = child.props;
    var triggerProps = {};

    if (this.state.show) {
      triggerProps['aria-describedby'] = overlay.props.id;
    }

    // FIXME: The logic here for passing through handlers on this component is
    // inconsistent. We shouldn't be passing any of these props through.

    triggerProps.onClick = utils_createChainedFunction(childProps.onClick, onClick);

    if (isOneOf('click', trigger)) {
      triggerProps.onClick = utils_createChainedFunction(triggerProps.onClick, this.handleToggle);
    }

    if (isOneOf('hover', trigger)) {
      undefined !== 'production' ? warning_browser_default()(!(trigger === 'hover'), '[react-bootstrap] Specifying only the `"hover"` trigger limits the ' + 'visibility of the overlay to just mouse users. Consider also ' + 'including the `"focus"` trigger so that touch and keyboard only ' + 'users can see the overlay as well.') : void 0;

      triggerProps.onMouseOver = utils_createChainedFunction(childProps.onMouseOver, onMouseOver, this.handleMouseOver);
      triggerProps.onMouseOut = utils_createChainedFunction(childProps.onMouseOut, onMouseOut, this.handleMouseOut);
    }

    if (isOneOf('focus', trigger)) {
      triggerProps.onFocus = utils_createChainedFunction(childProps.onFocus, onFocus, this.handleDelayedShow);
      triggerProps.onBlur = utils_createChainedFunction(childProps.onBlur, onBlur, this.handleDelayedHide);
    }

    this._overlay = this.makeOverlay(overlay, props);

    return Object(external___root___React___commonjs2___react___commonjs___react___amd___react__["cloneElement"])(child, triggerProps);
  };

  return OverlayTrigger;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

OverlayTrigger_OverlayTrigger.propTypes = OverlayTrigger_propTypes;
OverlayTrigger_OverlayTrigger.defaultProps = OverlayTrigger_defaultProps;

/* harmony default export */ var src_OverlayTrigger = (OverlayTrigger_OverlayTrigger);
// CONCATENATED MODULE: ./src/PageHeader.js










var PageHeader_PageHeader = function (_React$Component) {
  inherits_default()(PageHeader, _React$Component);

  function PageHeader() {
    classCallCheck_default()(this, PageHeader);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  PageHeader.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['className', 'children']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      extends_default()({}, elementProps, { className: classnames_default()(className, classes) }),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'h1',
        null,
        children
      )
    );
  };

  return PageHeader;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

/* harmony default export */ var src_PageHeader = (bootstrapUtils_bsClass('page-header', PageHeader_PageHeader));
// CONCATENATED MODULE: ./src/PagerItem.js












var PagerItem_propTypes = {
  disabled: prop_types_default.a.bool,
  previous: prop_types_default.a.bool,
  next: prop_types_default.a.bool,
  onClick: prop_types_default.a.func,
  onSelect: prop_types_default.a.func,
  eventKey: prop_types_default.a.any
};

var PagerItem_defaultProps = {
  disabled: false,
  previous: false,
  next: false
};

var PagerItem_PagerItem = function (_React$Component) {
  inherits_default()(PagerItem, _React$Component);

  function PagerItem(props, context) {
    classCallCheck_default()(this, PagerItem);

    var _this = possibleConstructorReturn_default()(this, _React$Component.call(this, props, context));

    _this.handleSelect = _this.handleSelect.bind(_this);
    return _this;
  }

  PagerItem.prototype.handleSelect = function handleSelect(e) {
    var _props = this.props,
        disabled = _props.disabled,
        onSelect = _props.onSelect,
        eventKey = _props.eventKey;


    if (disabled) {
      e.preventDefault();
      return;
    }

    if (onSelect) {
      onSelect(eventKey, e);
    }
  };

  PagerItem.prototype.render = function render() {
    var _props2 = this.props,
        disabled = _props2.disabled,
        previous = _props2.previous,
        next = _props2.next,
        onClick = _props2.onClick,
        className = _props2.className,
        style = _props2.style,
        props = objectWithoutProperties_default()(_props2, ['disabled', 'previous', 'next', 'onClick', 'className', 'style']);

    delete props.onSelect;
    delete props.eventKey;

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'li',
      {
        className: classnames_default()(className, { disabled: disabled, previous: previous, next: next }),
        style: style
      },
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(src_SafeAnchor, extends_default()({}, props, {
        disabled: disabled,
        onClick: utils_createChainedFunction(onClick, this.handleSelect)
      }))
    );
  };

  return PagerItem;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

PagerItem_PagerItem.propTypes = PagerItem_propTypes;
PagerItem_PagerItem.defaultProps = PagerItem_defaultProps;

/* harmony default export */ var src_PagerItem = (PagerItem_PagerItem);
// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(52);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./src/utils/deprecationWarning.js






var warned = {};

function deprecationWarning(oldname, newname, link) {
  var message = void 0;

  if ((typeof oldname === 'undefined' ? 'undefined' : typeof_default()(oldname)) === 'object') {
    message = oldname.message;
  } else {
    message = oldname + ' is deprecated. Use ' + newname + ' instead.';

    if (link) {
      message += '\nYou can read more about it at ' + link;
    }
  }

  if (warned[message]) {
    return;
  }

  undefined !== 'production' ? warning_browser_default()(false, message) : void 0;
  warned[message] = true;
}

deprecationWarning.wrapper = function (Component) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return function (_Component) {
    inherits_default()(DeprecatedComponent, _Component);

    function DeprecatedComponent() {
      classCallCheck_default()(this, DeprecatedComponent);

      return possibleConstructorReturn_default()(this, _Component.apply(this, arguments));
    }

    DeprecatedComponent.prototype.componentWillMount = function componentWillMount() {
      deprecationWarning.apply(undefined, args);

      if (_Component.prototype.componentWillMount) {
        var _Component$prototype$;

        for (var _len2 = arguments.length, methodArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          methodArgs[_key2] = arguments[_key2];
        }

        (_Component$prototype$ = _Component.prototype.componentWillMount).call.apply(_Component$prototype$, [this].concat(methodArgs));
      }
    };

    return DeprecatedComponent;
  }(Component);
};

/* harmony default export */ var utils_deprecationWarning = (deprecationWarning);

function _resetWarned() {
  warned = {};
}
// CONCATENATED MODULE: ./src/PageItem.js



/* harmony default export */ var PageItem = (utils_deprecationWarning.wrapper(src_PagerItem, '`<PageItem>`', '`<Pager.Item>`'));
// CONCATENATED MODULE: ./src/Pager.js














var Pager_propTypes = {
  onSelect: prop_types_default.a.func
};

var Pager_Pager = function (_React$Component) {
  inherits_default()(Pager, _React$Component);

  function Pager() {
    classCallCheck_default()(this, Pager);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Pager.prototype.render = function render() {
    var _props = this.props,
        onSelect = _props.onSelect,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['onSelect', 'className', 'children']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'ul',
      extends_default()({}, elementProps, { className: classnames_default()(className, classes) }),
      ValidComponentChildren.map(children, function (child) {
        return Object(external___root___React___commonjs2___react___commonjs___react___amd___react__["cloneElement"])(child, {
          onSelect: utils_createChainedFunction(child.props.onSelect, onSelect)
        });
      })
    );
  };

  return Pager;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Pager_Pager.propTypes = Pager_propTypes;

Pager_Pager.Item = src_PagerItem;

/* harmony default export */ var src_Pager = (bootstrapUtils_bsClass('pager', Pager_Pager));
// CONCATENATED MODULE: ./src/PaginationItem.js





/* eslint-disable react/no-multi-comp */






var PaginationItem_propTypes = {
  eventKey: prop_types_default.a.any,
  className: prop_types_default.a.string,
  onSelect: prop_types_default.a.func,
  disabled: prop_types_default.a.bool,
  active: prop_types_default.a.bool,
  activeLabel: prop_types_default.a.string.isRequired
};

var PaginationItem_defaultProps = {
  active: false,
  disabled: false,
  activeLabel: '(current)'
};

function PaginationItem(_ref) {
  var active = _ref.active,
      disabled = _ref.disabled,
      className = _ref.className,
      style = _ref.style,
      activeLabel = _ref.activeLabel,
      children = _ref.children,
      props = objectWithoutProperties_default()(_ref, ['active', 'disabled', 'className', 'style', 'activeLabel', 'children']);

  var Component = active || disabled ? 'span' : src_SafeAnchor;
  return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
    'li',
    { style: style, className: classnames_default()(className, { active: active, disabled: disabled }) },
    external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      Component,
      extends_default()({ disabled: disabled }, props),
      children,
      active && external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'span',
        { className: 'sr-only' },
        activeLabel
      )
    )
  );
}

PaginationItem.propTypes = PaginationItem_propTypes;
PaginationItem.defaultProps = PaginationItem_defaultProps;

function createButton(name, defaultValue) {
  var _class, _temp;

  var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : name;

  return _temp = _class = function (_React$Component) {
    inherits_default()(_class, _React$Component);

    function _class() {
      classCallCheck_default()(this, _class);

      return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
    }

    _class.prototype.render = function render() {
      var _props = this.props,
          disabled = _props.disabled,
          children = _props.children,
          className = _props.className,
          props = objectWithoutProperties_default()(_props, ['disabled', 'children', 'className']);

      var Component = disabled ? 'span' : src_SafeAnchor;

      return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'li',
        extends_default()({
          'aria-label': label,
          className: classnames_default()(className, { disabled: disabled })
        }, props),
        external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
          Component,
          null,
          children || defaultValue
        )
      );
    };

    return _class;
  }(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component), _class.displayName = name, _class.propTypes = { disabled: prop_types_default.a.bool }, _temp;
}

var First = createButton('First', '\xAB');
var Prev = createButton('Prev', '\u2039');
var Ellipsis = createButton('Ellipsis', '\u2026', 'More');
var Next = createButton('Next', '\u203A');
var Last = createButton('Last', '\xBB');
// CONCATENATED MODULE: ./src/Pagination.js











var Pagination_Pagination = function (_React$Component) {
  inherits_default()(Pagination, _React$Component);

  function Pagination() {
    classCallCheck_default()(this, Pagination);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Pagination.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['className', 'children']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'ul',
      extends_default()({}, elementProps, { className: classnames_default()(className, classes) }),
      children
    );
  };

  return Pagination;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

bootstrapUtils_bsClass('pagination', Pagination_Pagination);

Pagination_Pagination.First = First;
Pagination_Pagination.Prev = Prev;
Pagination_Pagination.Ellipsis = Ellipsis;
Pagination_Pagination.Item = PaginationItem;
Pagination_Pagination.Next = Next;
Pagination_Pagination.Last = Last;

/* harmony default export */ var src_Pagination = (Pagination_Pagination);
// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__(66);
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// CONCATENATED MODULE: ./src/PanelCollapse.js










var PanelCollapse_propTypes = {
  /**
   * Callback fired before the component expands
   */
  onEnter: prop_types_default.a.func,
  /**
   * Callback fired after the component starts to expand
   */
  onEntering: prop_types_default.a.func,
  /**
   * Callback fired after the component has expanded
   */
  onEntered: prop_types_default.a.func,
  /**
   * Callback fired before the component collapses
   */
  onExit: prop_types_default.a.func,
  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: prop_types_default.a.func,
  /**
   * Callback fired after the component has collapsed
   */
  onExited: prop_types_default.a.func
};

var PanelCollapse_contextTypes = {
  $bs_panel: prop_types_default.a.shape({
    headingId: prop_types_default.a.string,
    bodyId: prop_types_default.a.string,
    bsClass: prop_types_default.a.string,
    expanded: prop_types_default.a.bool
  })
};

var PanelCollapse_PanelCollapse = function (_React$Component) {
  inherits_default()(PanelCollapse, _React$Component);

  function PanelCollapse() {
    classCallCheck_default()(this, PanelCollapse);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  PanelCollapse.prototype.render = function render() {
    var children = this.props.children;

    var _ref = this.context.$bs_panel || {},
        headingId = _ref.headingId,
        bodyId = _ref.bodyId,
        _bsClass = _ref.bsClass,
        expanded = _ref.expanded;

    var _splitBsProps = splitBsProps(this.props),
        bsProps = _splitBsProps[0],
        props = _splitBsProps[1];

    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (headingId && bodyId) {
      props.id = bodyId;
      props.role = props.role || 'tabpanel';
      props['aria-labelledby'] = headingId;
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      src_Collapse,
      extends_default()({ 'in': expanded }, props),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'div',
        { className: prefix(bsProps, 'collapse') },
        children
      )
    );
  };

  return PanelCollapse;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

PanelCollapse_PanelCollapse.propTypes = PanelCollapse_propTypes;
PanelCollapse_PanelCollapse.contextTypes = PanelCollapse_contextTypes;

/* harmony default export */ var src_PanelCollapse = (bootstrapUtils_bsClass('panel', PanelCollapse_PanelCollapse));
// CONCATENATED MODULE: ./src/PanelBody.js










var PanelBody_propTypes = {
  /**
   * A convenience prop that renders a Collapse component around the Body for
   * situations when the parent Panel only contains a single Panel.Body child.
   *
   * renders:
   * ```jsx
   * <Panel.Collapse>
   *  <Panel.Body />
   * </Panel.Collapse>
   * ```
   */
  collapsible: prop_types_default.a.bool.isRequired
};

var PanelBody_defaultProps = {
  collapsible: false
};

var PanelBody_contextTypes = {
  $bs_panel: prop_types_default.a.shape({
    bsClass: prop_types_default.a.string
  })
};

var PanelBody_PanelBody = function (_React$Component) {
  inherits_default()(PanelBody, _React$Component);

  function PanelBody() {
    classCallCheck_default()(this, PanelBody);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  PanelBody.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        className = _props.className,
        collapsible = _props.collapsible;

    var _ref = this.context.$bs_panel || {},
        _bsClass = _ref.bsClass;

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(this.props, ['collapsible']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    bsProps.bsClass = _bsClass || bsProps.bsClass;

    var body = external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      extends_default()({}, elementProps, { className: classnames_default()(className, prefix(bsProps, 'body')) }),
      children
    );

    if (collapsible) {
      body = external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        src_PanelCollapse,
        null,
        body
      );
    }

    return body;
  };

  return PanelBody;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

PanelBody_PanelBody.propTypes = PanelBody_propTypes;
PanelBody_PanelBody.defaultProps = PanelBody_defaultProps;
PanelBody_PanelBody.contextTypes = PanelBody_contextTypes;

/* harmony default export */ var src_PanelBody = (bootstrapUtils_bsClass('panel', PanelBody_PanelBody));
// EXTERNAL MODULE: ./node_modules/react-prop-types/lib/elementType.js
var lib_elementType = __webpack_require__(65);
var lib_elementType_default = /*#__PURE__*/__webpack_require__.n(lib_elementType);

// CONCATENATED MODULE: ./src/PanelHeading.js












var PanelHeading_propTypes = {
  componentClass: lib_elementType_default.a
};

var PanelHeading_defaultProps = {
  componentClass: 'div'
};

var PanelHeading_contextTypes = {
  $bs_panel: prop_types_default.a.shape({
    headingId: prop_types_default.a.string,
    bsClass: prop_types_default.a.string
  })
};

var PanelHeading_PanelHeading = function (_React$Component) {
  inherits_default()(PanelHeading, _React$Component);

  function PanelHeading() {
    classCallCheck_default()(this, PanelHeading);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  PanelHeading.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        className = _props.className,
        Component = _props.componentClass,
        props = objectWithoutProperties_default()(_props, ['children', 'className', 'componentClass']);

    var _ref = this.context.$bs_panel || {},
        headingId = _ref.headingId,
        _bsClass = _ref.bsClass;

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (headingId) {
      elementProps.role = elementProps.role || 'tab';
      elementProps.id = headingId;
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      Component,
      extends_default()({}, elementProps, {
        className: classnames_default()(className, prefix(bsProps, 'heading'))
      }),
      children
    );
  };

  return PanelHeading;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

PanelHeading_PanelHeading.propTypes = PanelHeading_propTypes;
PanelHeading_PanelHeading.defaultProps = PanelHeading_defaultProps;
PanelHeading_PanelHeading.contextTypes = PanelHeading_contextTypes;

/* harmony default export */ var src_PanelHeading = (bootstrapUtils_bsClass('panel', PanelHeading_PanelHeading));
// CONCATENATED MODULE: ./src/PanelToggle.js











var PanelToggle_propTypes = {
  /**
   * only here to satisfy linting, just the html onClick handler.
   *
   * @private
   */
  onClick: prop_types_default.a.func,
  /**
   * You can use a custom element for this component
   */
  componentClass: lib_elementType_default.a
};

var PanelToggle_defaultProps = {
  componentClass: src_SafeAnchor
};

var PanelToggle_contextTypes = {
  $bs_panel: prop_types_default.a.shape({
    bodyId: prop_types_default.a.string,
    onToggle: prop_types_default.a.func,
    expanded: prop_types_default.a.bool
  })
};

var PanelToggle_PanelToggle = function (_React$Component) {
  inherits_default()(PanelToggle, _React$Component);

  function PanelToggle() {
    classCallCheck_default()(this, PanelToggle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn_default()(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.handleToggle = _this.handleToggle.bind(_this);
    return _this;
  }

  PanelToggle.prototype.handleToggle = function handleToggle(event) {
    var _ref = this.context.$bs_panel || {},
        onToggle = _ref.onToggle;

    if (onToggle) {
      onToggle(event);
    }
  };

  PanelToggle.prototype.render = function render() {
    var _props = this.props,
        onClick = _props.onClick,
        className = _props.className,
        componentClass = _props.componentClass,
        props = objectWithoutProperties_default()(_props, ['onClick', 'className', 'componentClass']);

    var _ref2 = this.context.$bs_panel || {},
        expanded = _ref2.expanded,
        bodyId = _ref2.bodyId;

    var Component = componentClass;

    props.onClick = utils_createChainedFunction(onClick, this.handleToggle);

    props['aria-expanded'] = expanded;
    props.className = classnames_default()(className, !expanded && 'collapsed');

    if (bodyId) {
      props['aria-controls'] = bodyId;
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, props);
  };

  return PanelToggle;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

PanelToggle_PanelToggle.propTypes = PanelToggle_propTypes;
PanelToggle_PanelToggle.defaultProps = PanelToggle_defaultProps;
PanelToggle_PanelToggle.contextTypes = PanelToggle_contextTypes;

/* harmony default export */ var src_PanelToggle = (PanelToggle_PanelToggle);
// CONCATENATED MODULE: ./src/PanelTitle.js













var PanelTitle_propTypes = {
  componentClass: lib_elementType_default.a,
  /**
   * A convenience prop that renders the Panel.Title as a panel collapse toggle component
   * for the common use-case.
   */
  toggle: prop_types_default.a.bool
};

var PanelTitle_contextTypes = {
  $bs_panel: prop_types_default.a.shape({
    bsClass: prop_types_default.a.string
  })
};

var PanelTitle_defaultProps = {
  componentClass: 'div'
};

var PanelTitle_PanelTitle = function (_React$Component) {
  inherits_default()(PanelTitle, _React$Component);

  function PanelTitle() {
    classCallCheck_default()(this, PanelTitle);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  PanelTitle.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        className = _props.className,
        toggle = _props.toggle,
        Component = _props.componentClass,
        props = objectWithoutProperties_default()(_props, ['children', 'className', 'toggle', 'componentClass']);

    var _ref = this.context.$bs_panel || {},
        _bsClass = _ref.bsClass;

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (toggle) {
      children = external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        src_PanelToggle,
        null,
        children
      );
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      Component,
      extends_default()({}, elementProps, {
        className: classnames_default()(className, prefix(bsProps, 'title'))
      }),
      children
    );
  };

  return PanelTitle;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

PanelTitle_PanelTitle.propTypes = PanelTitle_propTypes;
PanelTitle_PanelTitle.defaultProps = PanelTitle_defaultProps;
PanelTitle_PanelTitle.contextTypes = PanelTitle_contextTypes;

/* harmony default export */ var src_PanelTitle = (bootstrapUtils_bsClass('panel', PanelTitle_PanelTitle));
// CONCATENATED MODULE: ./src/PanelFooter.js









var PanelFooter_contextTypes = {
  $bs_panel: prop_types_default.a.shape({
    bsClass: prop_types_default.a.string
  })
};

var PanelFooter_PanelFooter = function (_React$Component) {
  inherits_default()(PanelFooter, _React$Component);

  function PanelFooter() {
    classCallCheck_default()(this, PanelFooter);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  PanelFooter.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        className = _props.className;

    var _ref = this.context.$bs_panel || {},
        _bsClass = _ref.bsClass;

    var _splitBsProps = splitBsProps(this.props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    bsProps.bsClass = _bsClass || bsProps.bsClass;

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      extends_default()({}, elementProps, {
        className: classnames_default()(className, prefix(bsProps, 'footer'))
      }),
      children
    );
  };

  return PanelFooter;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

PanelFooter_PanelFooter.contextTypes = PanelFooter_contextTypes;

/* harmony default export */ var src_PanelFooter = (bootstrapUtils_bsClass('panel', PanelFooter_PanelFooter));
// CONCATENATED MODULE: ./src/Panel.js




















var defaultGetId = function defaultGetId(id, type) {
  return id ? id + '--' + type : null;
};

var Panel_propTypes = {
  /**
   * Controls the collapsed/expanded state ofthe Panel. Requires
   * a `Panel.Collapse` or `<Panel.Body collapsible>` child component
   * in order to actually animate out or in.
   *
   * @controllable onToggle
   */
  expanded: prop_types_default.a.bool,
  /**
   * A callback fired when the collapse state changes.
   *
   * @controllable expanded
   */
  onToggle: prop_types_default.a.func,
  eventKey: prop_types_default.a.any,

  /**
   * An HTML `id` attribute uniquely identifying the Panel component.
   */
  id: prop_types_default.a.string
};

var Panel_contextTypes = {
  $bs_panelGroup: prop_types_default.a.shape({
    getId: prop_types_default.a.func,
    activeKey: prop_types_default.a.any,
    onToggle: prop_types_default.a.func
  })
};

var Panel_childContextTypes = {
  $bs_panel: prop_types_default.a.shape({
    headingId: prop_types_default.a.string,
    bodyId: prop_types_default.a.string,
    bsClass: prop_types_default.a.string,
    onToggle: prop_types_default.a.func,
    expanded: prop_types_default.a.bool
  })
};

var Panel_Panel = function (_React$Component) {
  inherits_default()(Panel, _React$Component);

  function Panel() {
    classCallCheck_default()(this, Panel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn_default()(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.handleToggle = _this.handleToggle.bind(_this);
    return _this;
  }

  Panel.prototype.getChildContext = function getChildContext() {
    var _props = this.props,
        eventKey = _props.eventKey,
        id = _props.id;

    var _ref = this.context.$bs_panelGroup || {},
        getId = _ref.getId;

    var ids = void 0;
    var idKey = eventKey == null ? id : eventKey;

    if (idKey !== null) {
      getId = getId || defaultGetId;
      ids = {
        headingId: getId(idKey, 'heading'),
        bodyId: getId(idKey, 'body')
      };
    }

    return {
      $bs_panel: extends_default()({}, ids, {
        bsClass: this.props.bsClass,
        expanded: this.getExpanded(),
        onToggle: this.handleToggle
      })
    };
  };

  Panel.prototype.getExpanded = function getExpanded() {
    var eventKey = this.props.eventKey;

    var _ref2 = this.context.$bs_panelGroup || {},
        activeKey = _ref2.activeKey;

    return this.props.expanded != null || activeKey === undefined ? this.props.expanded : activeKey === eventKey;
  };

  Panel.prototype.handleToggle = function handleToggle(e) {
    var _ref3 = this.context.$bs_panelGroup || {},
        onToggle = _ref3.onToggle;

    var expanded = !this.getExpanded();

    this.props.onToggle(expanded, e);
    if (onToggle) {
      onToggle(this.props.eventKey, expanded, e);
    }
  };

  Panel.prototype.render = function render() {
    var _props2 = this.props,
        className = _props2.className,
        children = _props2.children;

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(this.props, ['onToggle', 'eventKey', 'expanded']),
        bsProps = _splitBsPropsAndOmit[0],
        props = _splitBsPropsAndOmit[1];

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      extends_default()({}, props, { className: classnames_default()(className, getClassSet(bsProps)) }),
      children
    );
  };

  return Panel;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Panel_Panel.propTypes = Panel_propTypes;

Panel_Panel.contextTypes = Panel_contextTypes;
Panel_Panel.childContextTypes = Panel_childContextTypes;

var UncontrolledPanel = uncontrollable_default()(bootstrapUtils_bsClass('panel', bsStyles([].concat(values_default()(State), [Style.DEFAULT, Style.PRIMARY]), Style.DEFAULT, Panel_Panel)), { expanded: 'onToggle' });

assign_default()(UncontrolledPanel, {
  Heading: src_PanelHeading,
  Title: src_PanelTitle,
  Body: src_PanelBody,
  Footer: src_PanelFooter,
  Toggle: src_PanelToggle,
  Collapse: src_PanelCollapse
});

/* harmony default export */ var src_Panel = (UncontrolledPanel);
// CONCATENATED MODULE: ./src/Popover.js












var Popover_propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string}
   * @required
   */
  id: isRequiredForA11y_default()(prop_types_default.a.oneOfType([prop_types_default.a.string, prop_types_default.a.number])),

  /**
   * Sets the direction the Popover is positioned towards.
   */
  placement: prop_types_default.a.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The "top" position value for the Popover.
   */
  positionTop: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.string]),
  /**
   * The "left" position value for the Popover.
   */
  positionLeft: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.string]),

  /**
   * The "top" position value for the Popover arrow.
   */
  arrowOffsetTop: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.string]),
  /**
   * The "left" position value for the Popover arrow.
   */
  arrowOffsetLeft: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.string]),

  /**
   * Title content
   */
  title: prop_types_default.a.node
};

var Popover_defaultProps = {
  placement: 'right'
};

var Popover_Popover = function (_React$Component) {
  inherits_default()(Popover, _React$Component);

  function Popover() {
    classCallCheck_default()(this, Popover);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Popover.prototype.render = function render() {
    var _extends2;

    var _props = this.props,
        placement = _props.placement,
        positionTop = _props.positionTop,
        positionLeft = _props.positionLeft,
        arrowOffsetTop = _props.arrowOffsetTop,
        arrowOffsetLeft = _props.arrowOffsetLeft,
        title = _props.title,
        className = _props.className,
        style = _props.style,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['placement', 'positionTop', 'positionLeft', 'arrowOffsetTop', 'arrowOffsetLeft', 'title', 'className', 'style', 'children']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = extends_default()({}, getClassSet(bsProps), (_extends2 = {}, _extends2[placement] = true, _extends2));

    var outerStyle = extends_default()({
      display: 'block',
      top: positionTop,
      left: positionLeft
    }, style);

    var arrowStyle = {
      top: arrowOffsetTop,
      left: arrowOffsetLeft
    };

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      extends_default()({}, elementProps, {
        role: 'tooltip',
        className: classnames_default()(className, classes),
        style: outerStyle
      }),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('div', { className: 'arrow', style: arrowStyle }),
      title && external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'h3',
        { className: prefix(bsProps, 'title') },
        title
      ),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'div',
        { className: prefix(bsProps, 'content') },
        children
      )
    );
  };

  return Popover;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Popover_Popover.propTypes = Popover_propTypes;
Popover_Popover.defaultProps = Popover_defaultProps;

/* harmony default export */ var src_Popover = (bootstrapUtils_bsClass('popover', Popover_Popover));
// CONCATENATED MODULE: ./src/ProgressBar.js














var ROUND_PRECISION = 1000;

/**
 * Validate that children, if any, are instances of `<ProgressBar>`.
 */
function onlyProgressBar(props, propName, componentName) {
  var children = props[propName];
  if (!children) {
    return null;
  }

  var error = null;

  external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Children.forEach(children, function (child) {
    if (error) {
      return;
    }

    // eslint-disable-next-line no-use-before-define
    if (child.type === ProgressBar_ProgressBar) return;

    var childIdentifier = external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.isValidElement(child) ? child.type.displayName || child.type.name || child.type : child;
    error = new Error('Children of ' + componentName + ' can contain only ProgressBar ' + ('components. Found ' + childIdentifier + '.'));
  });

  return error;
}

var ProgressBar_propTypes = {
  min: prop_types_default.a.number,
  now: prop_types_default.a.number,
  max: prop_types_default.a.number,
  label: prop_types_default.a.node,
  srOnly: prop_types_default.a.bool,
  striped: prop_types_default.a.bool,
  active: prop_types_default.a.bool,
  children: onlyProgressBar,

  /**
   * @private
   */
  isChild: prop_types_default.a.bool
};

var ProgressBar_defaultProps = {
  min: 0,
  max: 100,
  active: false,
  isChild: false,
  srOnly: false,
  striped: false
};

function getPercentage(now, min, max) {
  var percentage = (now - min) / (max - min) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}

var ProgressBar_ProgressBar = function (_React$Component) {
  inherits_default()(ProgressBar, _React$Component);

  function ProgressBar() {
    classCallCheck_default()(this, ProgressBar);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  ProgressBar.prototype.renderProgressBar = function renderProgressBar(_ref) {
    var _extends2;

    var min = _ref.min,
        now = _ref.now,
        max = _ref.max,
        label = _ref.label,
        srOnly = _ref.srOnly,
        striped = _ref.striped,
        active = _ref.active,
        className = _ref.className,
        style = _ref.style,
        props = objectWithoutProperties_default()(_ref, ['min', 'now', 'max', 'label', 'srOnly', 'striped', 'active', 'className', 'style']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = extends_default()({}, getClassSet(bsProps), (_extends2 = {
      active: active
    }, _extends2[prefix(bsProps, 'striped')] = active || striped, _extends2));

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      extends_default()({}, elementProps, {
        role: 'progressbar',
        className: classnames_default()(className, classes),
        style: extends_default()({ width: getPercentage(now, min, max) + '%' }, style),
        'aria-valuenow': now,
        'aria-valuemin': min,
        'aria-valuemax': max
      }),
      srOnly ? external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'span',
        { className: 'sr-only' },
        label
      ) : label
    );
  };

  ProgressBar.prototype.render = function render() {
    var _props = this.props,
        isChild = _props.isChild,
        props = objectWithoutProperties_default()(_props, ['isChild']);

    if (isChild) {
      return this.renderProgressBar(props);
    }

    var min = props.min,
        now = props.now,
        max = props.max,
        label = props.label,
        srOnly = props.srOnly,
        striped = props.striped,
        active = props.active,
        bsClass = props.bsClass,
        bsStyle = props.bsStyle,
        className = props.className,
        children = props.children,
        wrapperProps = objectWithoutProperties_default()(props, ['min', 'now', 'max', 'label', 'srOnly', 'striped', 'active', 'bsClass', 'bsStyle', 'className', 'children']);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      extends_default()({}, wrapperProps, { className: classnames_default()(className, 'progress') }),
      children ? ValidComponentChildren.map(children, function (child) {
        return Object(external___root___React___commonjs2___react___commonjs___react___amd___react__["cloneElement"])(child, { isChild: true });
      }) : this.renderProgressBar({
        min: min,
        now: now,
        max: max,
        label: label,
        srOnly: srOnly,
        striped: striped,
        active: active,
        bsClass: bsClass,
        bsStyle: bsStyle
      })
    );
  };

  return ProgressBar;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

ProgressBar_ProgressBar.propTypes = ProgressBar_propTypes;
ProgressBar_ProgressBar.defaultProps = ProgressBar_defaultProps;

/* harmony default export */ var src_ProgressBar = (bootstrapUtils_bsClass('progress-bar', bsStyles(values_default()(State), ProgressBar_ProgressBar)));
// CONCATENATED MODULE: ./src/Radio.js





/* eslint-disable jsx-a11y/label-has-for */








var Radio_propTypes = {
  inline: prop_types_default.a.bool,
  disabled: prop_types_default.a.bool,
  title: prop_types_default.a.string,
  /**
   * Only valid if `inline` is not set.
   */
  validationState: prop_types_default.a.oneOf(['success', 'warning', 'error', null]),
  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <Radio inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: prop_types_default.a.func
};

var Radio_defaultProps = {
  inline: false,
  disabled: false,
  title: ''
};

var Radio_Radio = function (_React$Component) {
  inherits_default()(Radio, _React$Component);

  function Radio() {
    classCallCheck_default()(this, Radio);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Radio.prototype.render = function render() {
    var _props = this.props,
        inline = _props.inline,
        disabled = _props.disabled,
        validationState = _props.validationState,
        inputRef = _props.inputRef,
        className = _props.className,
        style = _props.style,
        title = _props.title,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['inline', 'disabled', 'validationState', 'inputRef', 'className', 'style', 'title', 'children']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var input = external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('input', extends_default()({}, elementProps, {
      ref: inputRef,
      type: 'radio',
      disabled: disabled
    }));

    if (inline) {
      var _classes2;

      var _classes = (_classes2 = {}, _classes2[prefix(bsProps, 'inline')] = true, _classes2.disabled = disabled, _classes2);

      // Use a warning here instead of in propTypes to get better-looking
      // generated documentation.
      undefined !== 'production' ? warning_browser_default()(!validationState, '`validationState` is ignored on `<Radio inline>`. To display ' + 'validation state on an inline radio, set `validationState` on a ' + 'parent `<FormGroup>` or other element instead.') : void 0;

      return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'label',
        {
          className: classnames_default()(className, _classes),
          style: style,
          title: title
        },
        input,
        children
      );
    }

    var classes = extends_default()({}, getClassSet(bsProps), {
      disabled: disabled
    });
    if (validationState) {
      classes['has-' + validationState] = true;
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      { className: classnames_default()(className, classes), style: style },
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'label',
        { title: title },
        input,
        children
      )
    );
  };

  return Radio;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Radio_Radio.propTypes = Radio_propTypes;
Radio_Radio.defaultProps = Radio_defaultProps;

/* harmony default export */ var src_Radio = (bootstrapUtils_bsClass('radio', Radio_Radio));
// CONCATENATED MODULE: ./src/ResponsiveEmbed.js












// TODO: This should probably take a single `aspectRatio` prop.

var ResponsiveEmbed_propTypes = {
  /**
   * This component requires a single child element
   */
  children: prop_types_default.a.element.isRequired,
  /**
   * 16by9 aspect ratio
   */
  a16by9: prop_types_default.a.bool,
  /**
   * 4by3 aspect ratio
   */
  a4by3: prop_types_default.a.bool
};

var ResponsiveEmbed_defaultProps = {
  a16by9: false,
  a4by3: false
};

var ResponsiveEmbed_ResponsiveEmbed = function (_React$Component) {
  inherits_default()(ResponsiveEmbed, _React$Component);

  function ResponsiveEmbed() {
    classCallCheck_default()(this, ResponsiveEmbed);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  ResponsiveEmbed.prototype.render = function render() {
    var _extends2;

    var _props = this.props,
        a16by9 = _props.a16by9,
        a4by3 = _props.a4by3,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['a16by9', 'a4by3', 'className', 'children']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    undefined !== 'production' ? warning_browser_default()(a16by9 || a4by3, 'Either `a16by9` or `a4by3` must be set.') : void 0;
    undefined !== 'production' ? warning_browser_default()(!(a16by9 && a4by3), 'Only one of `a16by9` or `a4by3` can be set.') : void 0;

    var classes = extends_default()({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps, '16by9')] = a16by9, _extends2[prefix(bsProps, '4by3')] = a4by3, _extends2));

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      { className: classnames_default()(classes) },
      Object(external___root___React___commonjs2___react___commonjs___react___amd___react__["cloneElement"])(children, extends_default()({}, elementProps, {
        className: classnames_default()(className, prefix(bsProps, 'item'))
      }))
    );
  };

  return ResponsiveEmbed;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

ResponsiveEmbed_ResponsiveEmbed.propTypes = ResponsiveEmbed_propTypes;
ResponsiveEmbed_ResponsiveEmbed.defaultProps = ResponsiveEmbed_defaultProps;

/* harmony default export */ var src_ResponsiveEmbed = (bootstrapUtils_bsClass('embed-responsive', ResponsiveEmbed_ResponsiveEmbed));
// CONCATENATED MODULE: ./src/Row.js











var Row_propTypes = {
  componentClass: elementType_default.a
};

var Row_defaultProps = {
  componentClass: 'div'
};

var Row_Row = function (_React$Component) {
  inherits_default()(Row, _React$Component);

  function Row() {
    classCallCheck_default()(this, Row);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Row.prototype.render = function render() {
    var _props = this.props,
        Component = _props.componentClass,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['componentClass', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return Row;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Row_Row.propTypes = Row_propTypes;
Row_Row.defaultProps = Row_defaultProps;

/* harmony default export */ var src_Row = (bootstrapUtils_bsClass('row', Row_Row));
// CONCATENATED MODULE: ./src/SplitToggle.js








var SplitToggle_SplitToggle = function (_React$Component) {
  inherits_default()(SplitToggle, _React$Component);

  function SplitToggle() {
    classCallCheck_default()(this, SplitToggle);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  SplitToggle.prototype.render = function render() {
    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(src_DropdownToggle, extends_default()({}, this.props, { useAnchor: false, noCaret: false }));
  };

  return SplitToggle;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

SplitToggle_SplitToggle.defaultProps = src_DropdownToggle.defaultProps;

/* harmony default export */ var src_SplitToggle = (SplitToggle_SplitToggle);
// CONCATENATED MODULE: ./src/SplitButton.js













var SplitButton_propTypes = extends_default()({}, src_Dropdown.propTypes, {

  // Toggle props.
  bsStyle: prop_types_default.a.string,
  bsSize: prop_types_default.a.string,
  href: prop_types_default.a.string,
  onClick: prop_types_default.a.func,
  /**
   * The content of the split button.
   */
  title: prop_types_default.a.node.isRequired,
  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: prop_types_default.a.string,

  // Override generated docs from <Dropdown>.
  /**
   * @private
   */
  children: prop_types_default.a.node
});

var SplitButton_SplitButton = function (_React$Component) {
  inherits_default()(SplitButton, _React$Component);

  function SplitButton() {
    classCallCheck_default()(this, SplitButton);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  SplitButton.prototype.render = function render() {
    var _props = this.props,
        bsSize = _props.bsSize,
        bsStyle = _props.bsStyle,
        title = _props.title,
        toggleLabel = _props.toggleLabel,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['bsSize', 'bsStyle', 'title', 'toggleLabel', 'children']);

    var _splitComponentProps = splitComponentProps(props, src_Dropdown.ControlledComponent),
        dropdownProps = _splitComponentProps[0],
        buttonProps = _splitComponentProps[1];

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      src_Dropdown,
      extends_default()({}, dropdownProps, { bsSize: bsSize, bsStyle: bsStyle }),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        src_Button,
        extends_default()({}, buttonProps, {
          disabled: props.disabled,
          bsSize: bsSize,
          bsStyle: bsStyle
        }),
        title
      ),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(src_SplitToggle, {
        'aria-label': toggleLabel || title,
        bsSize: bsSize,
        bsStyle: bsStyle
      }),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        src_Dropdown.Menu,
        null,
        children
      )
    );
  };

  return SplitButton;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

SplitButton_SplitButton.propTypes = SplitButton_propTypes;

SplitButton_SplitButton.Toggle = src_SplitToggle;

/* harmony default export */ var src_SplitButton = (SplitButton_SplitButton);
// CONCATENATED MODULE: ./src/TabContainer.js








var TAB = 'tab';
var PANE = 'pane';

var TabContainer_idPropType = prop_types_default.a.oneOfType([prop_types_default.a.string, prop_types_default.a.number]);

var TabContainer_propTypes = {
  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   */
  id: function id(props) {
    var error = null;

    if (!props.generateChildId) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      error = TabContainer_idPropType.apply(undefined, [props].concat(args));

      if (!error && !props.id) {
        error = new Error('In order to properly initialize Tabs in a way that is accessible ' + 'to assistive technologies (such as screen readers) an `id` or a ' + '`generateChildId` prop to TabContainer is required');
      }
    }

    return error;
  },


  /**
   * A function that takes an `eventKey` and `type` and returns a unique id for
   * child tab `<NavItem>`s and `<TabPane>`s. The function _must_ be a pure
   * function, meaning it should always return the _same_ id for the same set
   * of inputs. The default value requires that an `id` to be set for the
   * `<TabContainer>`.
   *
   * The `type` argument will either be `"tab"` or `"pane"`.
   *
   * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${key}`
   */
  generateChildId: prop_types_default.a.func,

  /**
   * A callback fired when a tab is selected.
   *
   * @controllable activeKey
   */
  onSelect: prop_types_default.a.func,

  /**
   * The `eventKey` of the currently active tab.
   *
   * @controllable onSelect
   */
  activeKey: prop_types_default.a.any
};

var TabContainer_childContextTypes = {
  $bs_tabContainer: prop_types_default.a.shape({
    activeKey: prop_types_default.a.any,
    onSelect: prop_types_default.a.func.isRequired,
    getTabId: prop_types_default.a.func.isRequired,
    getPaneId: prop_types_default.a.func.isRequired
  })
};

var TabContainer_TabContainer = function (_React$Component) {
  inherits_default()(TabContainer, _React$Component);

  function TabContainer() {
    classCallCheck_default()(this, TabContainer);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  TabContainer.prototype.getChildContext = function getChildContext() {
    var _props = this.props,
        activeKey = _props.activeKey,
        onSelect = _props.onSelect,
        generateChildId = _props.generateChildId,
        id = _props.id;


    var getId = generateChildId || function (key, type) {
      return id ? id + '-' + type + '-' + key : null;
    };

    return {
      $bs_tabContainer: {
        activeKey: activeKey,
        onSelect: onSelect,
        getTabId: function getTabId(key) {
          return getId(key, TAB);
        },
        getPaneId: function getPaneId(key) {
          return getId(key, PANE);
        }
      }
    };
  };

  TabContainer.prototype.render = function render() {
    var _props2 = this.props,
        children = _props2.children,
        props = objectWithoutProperties_default()(_props2, ['children']);

    delete props.generateChildId;
    delete props.onSelect;
    delete props.activeKey;

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.cloneElement(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Children.only(children), props);
  };

  return TabContainer;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

TabContainer_TabContainer.propTypes = TabContainer_propTypes;
TabContainer_TabContainer.childContextTypes = TabContainer_childContextTypes;

/* harmony default export */ var src_TabContainer = (uncontrollable_default()(TabContainer_TabContainer, { activeKey: 'onSelect' }));
// CONCATENATED MODULE: ./src/TabContent.js












var TabContent_propTypes = {
  componentClass: elementType_default.a,

  /**
   * Sets a default animation strategy for all children `<TabPane>`s. Use
   * `false` to disable, `true` to enable the default `<Fade>` animation or
   * a react-transition-group v2 `<Transition/>` component.
   */
  animation: prop_types_default.a.oneOfType([prop_types_default.a.bool, elementType_default.a]),

  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: prop_types_default.a.bool,

  /**
   * Unmount tabs (remove it from the DOM) when they are no longer visible
   */
  unmountOnExit: prop_types_default.a.bool
};

var TabContent_defaultProps = {
  componentClass: 'div',
  animation: true,
  mountOnEnter: false,
  unmountOnExit: false
};

var TabContent_contextTypes = {
  $bs_tabContainer: prop_types_default.a.shape({
    activeKey: prop_types_default.a.any
  })
};

var TabContent_childContextTypes = {
  $bs_tabContent: prop_types_default.a.shape({
    bsClass: prop_types_default.a.string,
    animation: prop_types_default.a.oneOfType([prop_types_default.a.bool, elementType_default.a]),
    activeKey: prop_types_default.a.any,
    mountOnEnter: prop_types_default.a.bool,
    unmountOnExit: prop_types_default.a.bool,
    onPaneEnter: prop_types_default.a.func.isRequired,
    onPaneExited: prop_types_default.a.func.isRequired,
    exiting: prop_types_default.a.bool.isRequired
  })
};

var TabContent_TabContent = function (_React$Component) {
  inherits_default()(TabContent, _React$Component);

  function TabContent(props, context) {
    classCallCheck_default()(this, TabContent);

    var _this = possibleConstructorReturn_default()(this, _React$Component.call(this, props, context));

    _this.handlePaneEnter = _this.handlePaneEnter.bind(_this);
    _this.handlePaneExited = _this.handlePaneExited.bind(_this);

    // Active entries in state will be `null` unless `animation` is set. Need
    // to track active child in case keys swap and the active child changes
    // but the active key does not.
    _this.state = {
      activeKey: null,
      activeChild: null
    };
    return _this;
  }

  TabContent.prototype.getChildContext = function getChildContext() {
    var _props = this.props,
        bsClass = _props.bsClass,
        animation = _props.animation,
        mountOnEnter = _props.mountOnEnter,
        unmountOnExit = _props.unmountOnExit;


    var stateActiveKey = this.state.activeKey;
    var containerActiveKey = this.getContainerActiveKey();

    var activeKey = stateActiveKey != null ? stateActiveKey : containerActiveKey;
    var exiting = stateActiveKey != null && stateActiveKey !== containerActiveKey;

    return {
      $bs_tabContent: {
        bsClass: bsClass,
        animation: animation,
        activeKey: activeKey,
        mountOnEnter: mountOnEnter,
        unmountOnExit: unmountOnExit,
        onPaneEnter: this.handlePaneEnter,
        onPaneExited: this.handlePaneExited,
        exiting: exiting
      }
    };
  };

  TabContent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!nextProps.animation && this.state.activeChild) {
      this.setState({ activeKey: null, activeChild: null });
    }
  };

  TabContent.prototype.componentWillUnmount = function componentWillUnmount() {
    this.isUnmounted = true;
  };

  TabContent.prototype.getContainerActiveKey = function getContainerActiveKey() {
    var tabContainer = this.context.$bs_tabContainer;
    return tabContainer && tabContainer.activeKey;
  };

  TabContent.prototype.handlePaneEnter = function handlePaneEnter(child, childKey) {
    if (!this.props.animation) {
      return false;
    }

    // It's possible that this child should be transitioning out.
    if (childKey !== this.getContainerActiveKey()) {
      return false;
    }

    this.setState({
      activeKey: childKey,
      activeChild: child
    });

    return true;
  };

  TabContent.prototype.handlePaneExited = function handlePaneExited(child) {
    // This might happen as everything is unmounting.
    if (this.isUnmounted) {
      return;
    }

    this.setState(function (_ref) {
      var activeChild = _ref.activeChild;

      if (activeChild !== child) {
        return null;
      }

      return {
        activeKey: null,
        activeChild: null
      };
    });
  };

  TabContent.prototype.render = function render() {
    var _props2 = this.props,
        Component = _props2.componentClass,
        className = _props2.className,
        props = objectWithoutProperties_default()(_props2, ['componentClass', 'className']);

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['animation', 'mountOnEnter', 'unmountOnExit']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(Component, extends_default()({}, elementProps, {
      className: classnames_default()(className, prefix(bsProps, 'content'))
    }));
  };

  return TabContent;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

TabContent_TabContent.propTypes = TabContent_propTypes;
TabContent_TabContent.defaultProps = TabContent_defaultProps;
TabContent_TabContent.contextTypes = TabContent_contextTypes;
TabContent_TabContent.childContextTypes = TabContent_childContextTypes;

/* harmony default export */ var src_TabContent = (bootstrapUtils_bsClass('tab', TabContent_TabContent));
// CONCATENATED MODULE: ./src/TabPane.js
















var TabPane_propTypes = {
  /**
   * Uniquely identify the `<TabPane>` among its siblings.
   */
  eventKey: prop_types_default.a.any,

  /**
   * Use animation when showing or hiding `<TabPane>`s. Use `false` to disable,
   * `true` to enable the default `<Fade>` animation or
   * a react-transition-group v2 `<Transition/>` component.
   */
  animation: prop_types_default.a.oneOfType([prop_types_default.a.bool, elementType_default.a]),

  /** @private * */
  id: prop_types_default.a.string,

  /** @private * */
  'aria-labelledby': prop_types_default.a.string,

  /**
   * If not explicitly specified and rendered in the context of a
   * `<TabContent>`, the `bsClass` of the `<TabContent>` suffixed by `-pane`.
   * If otherwise not explicitly specified, `tab-pane`.
   */
  bsClass: prop_types_default.a.string,

  /**
   * Transition onEnter callback when animation is not `false`
   */
  onEnter: prop_types_default.a.func,

  /**
   * Transition onEntering callback when animation is not `false`
   */
  onEntering: prop_types_default.a.func,

  /**
   * Transition onEntered callback when animation is not `false`
   */
  onEntered: prop_types_default.a.func,

  /**
   * Transition onExit callback when animation is not `false`
   */
  onExit: prop_types_default.a.func,

  /**
   * Transition onExiting callback when animation is not `false`
   */
  onExiting: prop_types_default.a.func,

  /**
   * Transition onExited callback when animation is not `false`
   */
  onExited: prop_types_default.a.func,

  /**
   * Wait until the first "enter" transition to mount the tab (add it to the DOM)
   */
  mountOnEnter: prop_types_default.a.bool,

  /**
   * Unmount the tab (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit: prop_types_default.a.bool
};

var TabPane_contextTypes = {
  $bs_tabContainer: prop_types_default.a.shape({
    getTabId: prop_types_default.a.func,
    getPaneId: prop_types_default.a.func
  }),
  $bs_tabContent: prop_types_default.a.shape({
    bsClass: prop_types_default.a.string,
    animation: prop_types_default.a.oneOfType([prop_types_default.a.bool, elementType_default.a]),
    activeKey: prop_types_default.a.any,
    mountOnEnter: prop_types_default.a.bool,
    unmountOnExit: prop_types_default.a.bool,
    onPaneEnter: prop_types_default.a.func.isRequired,
    onPaneExited: prop_types_default.a.func.isRequired,
    exiting: prop_types_default.a.bool.isRequired
  })
};

/**
 * We override the `<TabContainer>` context so `<Nav>`s in `<TabPane>`s don't
 * conflict with the top level one.
 */
var TabPane_childContextTypes = {
  $bs_tabContainer: prop_types_default.a.oneOf([null])
};

var TabPane_TabPane = function (_React$Component) {
  inherits_default()(TabPane, _React$Component);

  function TabPane(props, context) {
    classCallCheck_default()(this, TabPane);

    var _this = possibleConstructorReturn_default()(this, _React$Component.call(this, props, context));

    _this.handleEnter = _this.handleEnter.bind(_this);
    _this.handleExited = _this.handleExited.bind(_this);

    _this.in = false;
    return _this;
  }

  TabPane.prototype.getChildContext = function getChildContext() {
    return {
      $bs_tabContainer: null
    };
  };

  TabPane.prototype.componentDidMount = function componentDidMount() {
    if (this.shouldBeIn()) {
      // In lieu of the action event firing.
      this.handleEnter();
    }
  };

  TabPane.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.in) {
      if (!this.shouldBeIn()) {
        // We shouldn't be active any more. Notify the parent.
        this.handleExited();
      }
    } else if (this.shouldBeIn()) {
      // We are the active child. Notify the parent.
      this.handleEnter();
    }
  };

  TabPane.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.in) {
      // In lieu of the action event firing.
      this.handleExited();
    }
  };

  TabPane.prototype.getAnimation = function getAnimation() {
    if (this.props.animation != null) {
      return this.props.animation;
    }

    var tabContent = this.context.$bs_tabContent;
    return tabContent && tabContent.animation;
  };

  TabPane.prototype.handleEnter = function handleEnter() {
    var tabContent = this.context.$bs_tabContent;
    if (!tabContent) {
      return;
    }

    this.in = tabContent.onPaneEnter(this, this.props.eventKey);
  };

  TabPane.prototype.handleExited = function handleExited() {
    var tabContent = this.context.$bs_tabContent;
    if (!tabContent) {
      return;
    }

    tabContent.onPaneExited(this);
    this.in = false;
  };

  TabPane.prototype.isActive = function isActive() {
    var tabContent = this.context.$bs_tabContent;
    var activeKey = tabContent && tabContent.activeKey;

    return this.props.eventKey === activeKey;
  };

  TabPane.prototype.shouldBeIn = function shouldBeIn() {
    return this.getAnimation() && this.isActive();
  };

  TabPane.prototype.render = function render() {
    var _props = this.props,
        eventKey = _props.eventKey,
        className = _props.className,
        onEnter = _props.onEnter,
        onEntering = _props.onEntering,
        onEntered = _props.onEntered,
        onExit = _props.onExit,
        onExiting = _props.onExiting,
        onExited = _props.onExited,
        propsMountOnEnter = _props.mountOnEnter,
        propsUnmountOnExit = _props.unmountOnExit,
        props = objectWithoutProperties_default()(_props, ['eventKey', 'className', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited', 'mountOnEnter', 'unmountOnExit']);

    var _context = this.context,
        tabContent = _context.$bs_tabContent,
        tabContainer = _context.$bs_tabContainer;

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['animation']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    var active = this.isActive();
    var animation = this.getAnimation();

    var mountOnEnter = propsMountOnEnter != null ? propsMountOnEnter : tabContent && tabContent.mountOnEnter;
    var unmountOnExit = propsUnmountOnExit != null ? propsUnmountOnExit : tabContent && tabContent.unmountOnExit;

    if (!active && !animation && unmountOnExit) {
      return null;
    }

    var Transition = animation === true ? src_Fade : animation || null;

    if (tabContent) {
      bsProps.bsClass = prefix(tabContent, 'pane');
    }

    var classes = extends_default()({}, getClassSet(bsProps), {
      active: active
    });

    if (tabContainer) {
      undefined !== 'production' ? warning_browser_default()(!elementProps.id && !elementProps['aria-labelledby'], 'In the context of a `<TabContainer>`, `<TabPanes>` are given ' + 'generated `id` and `aria-labelledby` attributes for the sake of ' + 'proper component accessibility. Any provided ones will be ignored. ' + 'To control these attributes directly provide a `generateChildId` ' + 'prop to the parent `<TabContainer>`.') : void 0;

      elementProps.id = tabContainer.getPaneId(eventKey);
      elementProps['aria-labelledby'] = tabContainer.getTabId(eventKey);
    }

    var pane = external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('div', extends_default()({}, elementProps, {
      role: 'tabpanel',
      'aria-hidden': !active,
      className: classnames_default()(className, classes)
    }));

    if (Transition) {
      var exiting = tabContent && tabContent.exiting;

      return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        Transition,
        {
          'in': active && !exiting,
          onEnter: utils_createChainedFunction(this.handleEnter, onEnter),
          onEntering: onEntering,
          onEntered: onEntered,
          onExit: onExit,
          onExiting: onExiting,
          onExited: utils_createChainedFunction(this.handleExited, onExited),
          mountOnEnter: mountOnEnter,
          unmountOnExit: unmountOnExit
        },
        pane
      );
    }

    return pane;
  };

  return TabPane;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

TabPane_TabPane.propTypes = TabPane_propTypes;
TabPane_TabPane.contextTypes = TabPane_contextTypes;
TabPane_TabPane.childContextTypes = TabPane_childContextTypes;

/* harmony default export */ var src_TabPane = (bootstrapUtils_bsClass('tab-pane', TabPane_TabPane));
// CONCATENATED MODULE: ./src/Tab.js











var Tab_propTypes = extends_default()({}, src_TabPane.propTypes, {

  disabled: prop_types_default.a.bool,

  title: prop_types_default.a.node,

  /**
   * tabClassName is used as className for the associated NavItem
   */
  tabClassName: prop_types_default.a.string
});

var Tab_Tab = function (_React$Component) {
  inherits_default()(Tab, _React$Component);

  function Tab() {
    classCallCheck_default()(this, Tab);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Tab.prototype.render = function render() {
    var props = extends_default()({}, this.props);

    // These props are for the parent `<Tabs>` rather than the `<TabPane>`.
    delete props.title;
    delete props.disabled;
    delete props.tabClassName;

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(src_TabPane, props);
  };

  return Tab;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Tab_Tab.propTypes = Tab_propTypes;

Tab_Tab.Container = src_TabContainer;
Tab_Tab.Content = src_TabContent;
Tab_Tab.Pane = src_TabPane;

/* harmony default export */ var src_Tab = (Tab_Tab);
// CONCATENATED MODULE: ./src/Table.js











var Table_propTypes = {
  striped: prop_types_default.a.bool,
  bordered: prop_types_default.a.bool,
  condensed: prop_types_default.a.bool,
  hover: prop_types_default.a.bool,
  responsive: prop_types_default.a.bool
};

var Table_defaultProps = {
  bordered: false,
  condensed: false,
  hover: false,
  responsive: false,
  striped: false
};

var Table_Table = function (_React$Component) {
  inherits_default()(Table, _React$Component);

  function Table() {
    classCallCheck_default()(this, Table);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Table.prototype.render = function render() {
    var _extends2;

    var _props = this.props,
        striped = _props.striped,
        bordered = _props.bordered,
        condensed = _props.condensed,
        hover = _props.hover,
        responsive = _props.responsive,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['striped', 'bordered', 'condensed', 'hover', 'responsive', 'className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = extends_default()({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps, 'striped')] = striped, _extends2[prefix(bsProps, 'bordered')] = bordered, _extends2[prefix(bsProps, 'condensed')] = condensed, _extends2[prefix(bsProps, 'hover')] = hover, _extends2));

    var table = external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('table', extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));

    if (responsive) {
      return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'div',
        { className: prefix(bsProps, 'responsive') },
        table
      );
    }

    return table;
  };

  return Table;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Table_Table.propTypes = Table_propTypes;
Table_Table.defaultProps = Table_defaultProps;

/* harmony default export */ var src_Table = (bootstrapUtils_bsClass('table', Table_Table));
// CONCATENATED MODULE: ./src/Tabs.js

















var Tabs_TabContainer = src_TabContainer.ControlledComponent;

var Tabs_propTypes = {
  /**
   * Mark the Tab with a matching `eventKey` as active.
   *
   * @controllable onSelect
   */
  activeKey: prop_types_default.a.any,

  /**
   * Navigation style
   */
  bsStyle: prop_types_default.a.oneOf(['tabs', 'pills']),

  animation: prop_types_default.a.bool,

  id: isRequiredForA11y_default()(prop_types_default.a.oneOfType([prop_types_default.a.string, prop_types_default.a.number])),

  /**
   * Callback fired when a Tab is selected.
   *
   * ```js
   * function (
   *   Any eventKey,
   *   SyntheticEvent event?
   * )
   * ```
   *
   * @controllable activeKey
   */
  onSelect: prop_types_default.a.func,

  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: prop_types_default.a.bool,

  /**
   * Unmount tabs (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit: prop_types_default.a.bool
};

var Tabs_defaultProps = {
  bsStyle: 'tabs',
  animation: true,
  mountOnEnter: false,
  unmountOnExit: false
};

function getDefaultActiveKey(children) {
  var defaultActiveKey = void 0;
  ValidComponentChildren.forEach(children, function (child) {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });

  return defaultActiveKey;
}

var Tabs_Tabs = function (_React$Component) {
  inherits_default()(Tabs, _React$Component);

  function Tabs() {
    classCallCheck_default()(this, Tabs);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Tabs.prototype.renderTab = function renderTab(child) {
    var _child$props = child.props,
        title = _child$props.title,
        eventKey = _child$props.eventKey,
        disabled = _child$props.disabled,
        tabClassName = _child$props.tabClassName;

    if (title == null) {
      return null;
    }

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      src_NavItem,
      { eventKey: eventKey, disabled: disabled, className: tabClassName },
      title
    );
  };

  Tabs.prototype.render = function render() {
    var _props = this.props,
        id = _props.id,
        onSelect = _props.onSelect,
        animation = _props.animation,
        mountOnEnter = _props.mountOnEnter,
        unmountOnExit = _props.unmountOnExit,
        bsClass = _props.bsClass,
        className = _props.className,
        style = _props.style,
        children = _props.children,
        _props$activeKey = _props.activeKey,
        activeKey = _props$activeKey === undefined ? getDefaultActiveKey(children) : _props$activeKey,
        props = objectWithoutProperties_default()(_props, ['id', 'onSelect', 'animation', 'mountOnEnter', 'unmountOnExit', 'bsClass', 'className', 'style', 'children', 'activeKey']);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      Tabs_TabContainer,
      {
        id: id,
        activeKey: activeKey,
        onSelect: onSelect,
        className: className,
        style: style
      },
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'div',
        null,
        external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
          src_Nav,
          extends_default()({}, props, { role: 'tablist' }),
          ValidComponentChildren.map(children, this.renderTab)
        ),
        external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
          src_TabContent,
          {
            bsClass: bsClass,
            animation: animation,
            mountOnEnter: mountOnEnter,
            unmountOnExit: unmountOnExit
          },
          children
        )
      )
    );
  };

  return Tabs;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Tabs_Tabs.propTypes = Tabs_propTypes;
Tabs_Tabs.defaultProps = Tabs_defaultProps;

bootstrapUtils_bsClass('tab', Tabs_Tabs);

/* harmony default export */ var src_Tabs = (uncontrollable_default()(Tabs_Tabs, { activeKey: 'onSelect' }));
// CONCATENATED MODULE: ./src/Thumbnail.js





/* eslint-disable jsx-a11y/alt-text */








var Thumbnail_propTypes = {
  /**
   * src property that is passed down to the image inside this component
   */
  src: prop_types_default.a.string,
  /**
   * alt property that is passed down to the image inside this component
   */
  alt: prop_types_default.a.string,
  /**
   * href property that is passed down to the image inside this component
   */
  href: prop_types_default.a.string,
  /**
   * onError callback that is passed down to the image inside this component
   */
  onError: prop_types_default.a.func,
  /**
   * onLoad callback that is passed down to the image inside this component
   */
  onLoad: prop_types_default.a.func
};

var Thumbnail_Thumbnail = function (_React$Component) {
  inherits_default()(Thumbnail, _React$Component);

  function Thumbnail() {
    classCallCheck_default()(this, Thumbnail);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Thumbnail.prototype.render = function render() {
    var _props = this.props,
        src = _props.src,
        alt = _props.alt,
        onError = _props.onError,
        onLoad = _props.onLoad,
        className = _props.className,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['src', 'alt', 'onError', 'onLoad', 'className', 'children']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var Component = elementProps.href ? src_SafeAnchor : 'div';
    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      Component,
      extends_default()({}, elementProps, { className: classnames_default()(className, classes) }),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('img', { src: src, alt: alt, onError: onError, onLoad: onLoad }),
      children && external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'div',
        { className: 'caption' },
        children
      )
    );
  };

  return Thumbnail;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Thumbnail_Thumbnail.propTypes = Thumbnail_propTypes;

/* harmony default export */ var src_Thumbnail = (bootstrapUtils_bsClass('thumbnail', Thumbnail_Thumbnail));
// CONCATENATED MODULE: ./src/ToggleButton.js










var ToggleButton_propTypes = {
  /**
   * The `<input>` `type`
   * @type {[type]}
   */
  type: prop_types_default.a.oneOf(['checkbox', 'radio']),

  /**
   * The HTML input name, used to group like checkboxes or radio buttons together
   * semantically
   */
  name: prop_types_default.a.string,

  /**
   * The checked state of the input, managed by `<ToggleButtonGroup>`` automatically
   */
  checked: prop_types_default.a.bool,

  /**
   * The disabled state of both the label and input
   */
  disabled: prop_types_default.a.bool,

  /**
   * [onChange description]
   */
  onChange: prop_types_default.a.func,
  /**
   * The value of the input, and unique identifier in the ToggleButtonGroup
   */
  value: prop_types_default.a.any.isRequired
};

var ToggleButton_ToggleButton = function (_React$Component) {
  inherits_default()(ToggleButton, _React$Component);

  function ToggleButton() {
    classCallCheck_default()(this, ToggleButton);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  ToggleButton.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        name = _props.name,
        checked = _props.checked,
        type = _props.type,
        onChange = _props.onChange,
        value = _props.value,
        props = objectWithoutProperties_default()(_props, ['children', 'name', 'checked', 'type', 'onChange', 'value']);

    var disabled = props.disabled;

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      src_Button,
      extends_default()({}, props, { active: !!checked, componentClass: 'label' }),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('input', {
        name: name,
        type: type,
        autoComplete: 'off',
        value: value,
        checked: !!checked,
        disabled: !!disabled,
        onChange: onChange
      }),
      children
    );
  };

  return ToggleButton;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

ToggleButton_ToggleButton.propTypes = ToggleButton_propTypes;

/* harmony default export */ var src_ToggleButton = (ToggleButton_ToggleButton);
// CONCATENATED MODULE: ./src/ToggleButtonGroup.js















var ToggleButtonGroup_propTypes = {
  /**
   * An HTML `<input>` name for each child button.
   *
   * __Required if `type` is set to `'radio'`__
   */
  name: prop_types_default.a.string,

  /**
   * The value, or array of values, of the active (pressed) buttons
   *
   * @controllable onChange
   */
  value: prop_types_default.a.any,

  /**
   * Callback fired when a button is pressed, depending on whether the `type`
   * is `'radio'` or `'checkbox'`, `onChange` will be called with the value or
   * array of active values
   *
   * @controllable values
   */
  onChange: prop_types_default.a.func,

  /**
   * The input `type` of the rendered buttons, determines the toggle behavior
   * of the buttons
   */
  type: prop_types_default.a.oneOf(['checkbox', 'radio']).isRequired
};

var ToggleButtonGroup_defaultProps = {
  type: 'radio'
};

var ToggleButtonGroup_ToggleButtonGroup = function (_React$Component) {
  inherits_default()(ToggleButtonGroup, _React$Component);

  function ToggleButtonGroup() {
    classCallCheck_default()(this, ToggleButtonGroup);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  ToggleButtonGroup.prototype.getValues = function getValues() {
    var value = this.props.value;

    return value == null ? [] : [].concat(value);
  };

  ToggleButtonGroup.prototype.handleToggle = function handleToggle(value) {
    var _props = this.props,
        type = _props.type,
        onChange = _props.onChange;

    var values = this.getValues();
    var isActive = values.indexOf(value) !== -1;

    if (type === 'radio') {
      if (!isActive) {
        onChange(value);
      }
      return;
    }

    if (isActive) {
      onChange(values.filter(function (n) {
        return n !== value;
      }));
    } else {
      onChange([].concat(values, [value]));
    }
  };

  ToggleButtonGroup.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        children = _props2.children,
        type = _props2.type,
        name = _props2.name,
        props = objectWithoutProperties_default()(_props2, ['children', 'type', 'name']);

    var values = this.getValues();

    !(type !== 'radio' || !!name) ? undefined !== 'production' ? browser_default()(false, 'A `name` is required to group the toggle buttons when the `type` ' + 'is set to "radio"') : browser_default()(false) : void 0;

    delete props.onChange;
    delete props.value;

    // the data attribute is required b/c twbs css uses it in the selector
    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      src_ButtonGroup,
      extends_default()({}, props, { 'data-toggle': 'buttons' }),
      ValidComponentChildren.map(children, function (child) {
        var _child$props = child.props,
            value = _child$props.value,
            onChange = _child$props.onChange;

        var handler = function handler() {
          return _this2.handleToggle(value);
        };

        return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.cloneElement(child, {
          type: type,
          name: child.name || name,
          checked: values.indexOf(value) !== -1,
          onChange: utils_createChainedFunction(onChange, handler)
        });
      })
    );
  };

  return ToggleButtonGroup;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

ToggleButtonGroup_ToggleButtonGroup.propTypes = ToggleButtonGroup_propTypes;
ToggleButtonGroup_ToggleButtonGroup.defaultProps = ToggleButtonGroup_defaultProps;

var UncontrolledToggleButtonGroup = uncontrollable_default()(ToggleButtonGroup_ToggleButtonGroup, {
  value: 'onChange'
});

UncontrolledToggleButtonGroup.Button = src_ToggleButton;

/* harmony default export */ var src_ToggleButtonGroup = (UncontrolledToggleButtonGroup);
// CONCATENATED MODULE: ./src/Tooltip.js












var Tooltip_propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y_default()(prop_types_default.a.oneOfType([prop_types_default.a.string, prop_types_default.a.number])),

  /**
   * Sets the direction the Tooltip is positioned towards.
   */
  placement: prop_types_default.a.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The "top" position value for the Tooltip.
   */
  positionTop: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.string]),
  /**
   * The "left" position value for the Tooltip.
   */
  positionLeft: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.string]),

  /**
   * The "top" position value for the Tooltip arrow.
   */
  arrowOffsetTop: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.string]),
  /**
   * The "left" position value for the Tooltip arrow.
   */
  arrowOffsetLeft: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.string])
};

var Tooltip_defaultProps = {
  placement: 'right'
};

var Tooltip_Tooltip = function (_React$Component) {
  inherits_default()(Tooltip, _React$Component);

  function Tooltip() {
    classCallCheck_default()(this, Tooltip);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Tooltip.prototype.render = function render() {
    var _extends2;

    var _props = this.props,
        placement = _props.placement,
        positionTop = _props.positionTop,
        positionLeft = _props.positionLeft,
        arrowOffsetTop = _props.arrowOffsetTop,
        arrowOffsetLeft = _props.arrowOffsetLeft,
        className = _props.className,
        style = _props.style,
        children = _props.children,
        props = objectWithoutProperties_default()(_props, ['placement', 'positionTop', 'positionLeft', 'arrowOffsetTop', 'arrowOffsetLeft', 'className', 'style', 'children']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = extends_default()({}, getClassSet(bsProps), (_extends2 = {}, _extends2[placement] = true, _extends2));

    var outerStyle = extends_default()({
      top: positionTop,
      left: positionLeft
    }, style);

    var arrowStyle = {
      top: arrowOffsetTop,
      left: arrowOffsetLeft
    };

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
      'div',
      extends_default()({}, elementProps, {
        role: 'tooltip',
        className: classnames_default()(className, classes),
        style: outerStyle
      }),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('div', { className: prefix(bsProps, 'arrow'), style: arrowStyle }),
      external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement(
        'div',
        { className: prefix(bsProps, 'inner') },
        children
      )
    );
  };

  return Tooltip;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

Tooltip_Tooltip.propTypes = Tooltip_propTypes;
Tooltip_Tooltip.defaultProps = Tooltip_defaultProps;

/* harmony default export */ var src_Tooltip = (bootstrapUtils_bsClass('tooltip', Tooltip_Tooltip));
// CONCATENATED MODULE: ./src/Well.js











var Well_Well = function (_React$Component) {
  inherits_default()(Well, _React$Component);

  function Well() {
    classCallCheck_default()(this, Well);

    return possibleConstructorReturn_default()(this, _React$Component.apply(this, arguments));
  }

  Well.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        props = objectWithoutProperties_default()(_props, ['className']);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    return external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.createElement('div', extends_default()({}, elementProps, { className: classnames_default()(className, classes) }));
  };

  return Well;
}(external___root___React___commonjs2___react___commonjs___react___amd___react___default.a.Component);

/* harmony default export */ var src_Well = (bootstrapUtils_bsClass('well', bsSizes([Size.LARGE, Size.SMALL], Well_Well)));
// CONCATENATED MODULE: ./src/utils/index.js






// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Accordion", function() { return src_Accordion; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Alert", function() { return src_Alert; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Badge", function() { return src_Badge; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Breadcrumb", function() { return src_Breadcrumb; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "BreadcrumbItem", function() { return src_BreadcrumbItem; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Button", function() { return src_Button; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ButtonGroup", function() { return src_ButtonGroup; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ButtonToolbar", function() { return src_ButtonToolbar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Carousel", function() { return src_Carousel; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CarouselItem", function() { return src_CarouselItem; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Checkbox", function() { return src_Checkbox; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Clearfix", function() { return src_Clearfix; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CloseButton", function() { return src_CloseButton; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ControlLabel", function() { return src_ControlLabel; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Col", function() { return src_Col; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Collapse", function() { return src_Collapse; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Dropdown", function() { return src_Dropdown; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DropdownButton", function() { return src_DropdownButton; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Fade", function() { return src_Fade; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Form", function() { return src_Form; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "FormControl", function() { return src_FormControl; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "FormGroup", function() { return src_FormGroup; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Glyphicon", function() { return src_Glyphicon; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Grid", function() { return src_Grid; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "HelpBlock", function() { return src_HelpBlock; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Image", function() { return src_Image; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "InputGroup", function() { return src_InputGroup; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Jumbotron", function() { return src_Jumbotron; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Label", function() { return src_Label; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ListGroup", function() { return src_ListGroup; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ListGroupItem", function() { return src_ListGroupItem; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Media", function() { return src_Media; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MenuItem", function() { return src_MenuItem; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Modal", function() { return src_Modal; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ModalBody", function() { return src_ModalBody; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ModalFooter", function() { return src_ModalFooter; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ModalHeader", function() { return src_ModalHeader; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ModalTitle", function() { return src_ModalTitle; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Nav", function() { return src_Nav; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Navbar", function() { return src_Navbar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "NavbarBrand", function() { return src_NavbarBrand; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "NavDropdown", function() { return src_NavDropdown; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "NavItem", function() { return src_NavItem; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Overlay", function() { return src_Overlay; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "OverlayTrigger", function() { return src_OverlayTrigger; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PageHeader", function() { return src_PageHeader; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PageItem", function() { return PageItem; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Pager", function() { return src_Pager; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Pagination", function() { return src_Pagination; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Panel", function() { return src_Panel; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PanelGroup", function() { return src_PanelGroup; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Popover", function() { return src_Popover; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ProgressBar", function() { return src_ProgressBar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Radio", function() { return src_Radio; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ResponsiveEmbed", function() { return src_ResponsiveEmbed; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Row", function() { return src_Row; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "SafeAnchor", function() { return src_SafeAnchor; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "SplitButton", function() { return src_SplitButton; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Tab", function() { return src_Tab; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "TabContainer", function() { return src_TabContainer; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "TabContent", function() { return src_TabContent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Table", function() { return src_Table; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "TabPane", function() { return src_TabPane; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Tabs", function() { return src_Tabs; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Thumbnail", function() { return src_Thumbnail; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ToggleButton", function() { return src_ToggleButton; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ToggleButtonGroup", function() { return src_ToggleButtonGroup; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Tooltip", function() { return src_Tooltip; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Well", function() { return src_Well; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utils", function() { return utils_namespaceObject; });













































































































































/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(93);
module.exports = __webpack_require__(11).Object.assign;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(13);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(95) });


/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(30);
var gOPS = __webpack_require__(50);
var pIE = __webpack_require__(31);
var toObject = __webpack_require__(51);
var IObject = __webpack_require__(70);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(28)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(18);
var toLength = __webpack_require__(71);
var toAbsoluteIndex = __webpack_require__(97);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(46);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(72);
__webpack_require__(105);
module.exports = __webpack_require__(56).f('iterator');


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(46);
var defined = __webpack_require__(45);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(54);
var descriptor = __webpack_require__(29);
var setToStringTag = __webpack_require__(55);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(20)(IteratorPrototype, __webpack_require__(12)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(16);
var anObject = __webpack_require__(21);
var getKeys = __webpack_require__(30);

module.exports = __webpack_require__(23) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(14).document;
module.exports = document && document.documentElement;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(17);
var toObject = __webpack_require__(51);
var IE_PROTO = __webpack_require__(47)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(106);
var global = __webpack_require__(14);
var hide = __webpack_require__(20);
var Iterators = __webpack_require__(32);
var TO_STRING_TAG = __webpack_require__(12)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(107);
var step = __webpack_require__(108);
var Iterators = __webpack_require__(32);
var toIObject = __webpack_require__(18);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(73)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(111);
__webpack_require__(116);
__webpack_require__(117);
__webpack_require__(118);
module.exports = __webpack_require__(11).Symbol;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(14);
var has = __webpack_require__(17);
var DESCRIPTORS = __webpack_require__(23);
var $export = __webpack_require__(13);
var redefine = __webpack_require__(74);
var META = __webpack_require__(112).KEY;
var $fails = __webpack_require__(28);
var shared = __webpack_require__(48);
var setToStringTag = __webpack_require__(55);
var uid = __webpack_require__(34);
var wks = __webpack_require__(12);
var wksExt = __webpack_require__(56);
var wksDefine = __webpack_require__(57);
var enumKeys = __webpack_require__(113);
var isArray = __webpack_require__(114);
var anObject = __webpack_require__(21);
var isObject = __webpack_require__(22);
var toIObject = __webpack_require__(18);
var toPrimitive = __webpack_require__(43);
var createDesc = __webpack_require__(29);
var _create = __webpack_require__(54);
var gOPNExt = __webpack_require__(115);
var $GOPD = __webpack_require__(76);
var $DP = __webpack_require__(16);
var $keys = __webpack_require__(30);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(75).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(31).f = $propertyIsEnumerable;
  __webpack_require__(50).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(53)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(20)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(34)('meta');
var isObject = __webpack_require__(22);
var has = __webpack_require__(17);
var setDesc = __webpack_require__(16).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(28)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(30);
var gOPS = __webpack_require__(50);
var pIE = __webpack_require__(31);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(44);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(18);
var gOPN = __webpack_require__(75).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 116 */
/***/ (function(module, exports) {



/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(57)('asyncIterator');


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(57)('observable');


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(121);
module.exports = __webpack_require__(11).Object.setPrototypeOf;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(13);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(122).set });


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(22);
var anObject = __webpack_require__(21);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(42)(Function.call, __webpack_require__(76).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(124), __esModule: true };

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(125);
var $Object = __webpack_require__(11).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(13);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(54) });


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(58);
var invariant = __webpack_require__(59);
var warning = __webpack_require__(77);
var assign = __webpack_require__(127);

var ReactPropTypesSecret = __webpack_require__(60);
var checkPropTypes = __webpack_require__(128);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (undefined !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (undefined !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      undefined !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      undefined !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (undefined !== 'production') {
  var invariant = __webpack_require__(59);
  var warning = __webpack_require__(77);
  var ReactPropTypesSecret = __webpack_require__(60);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (undefined !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(58);
var invariant = __webpack_require__(59);
var ReactPropTypesSecret = __webpack_require__(60);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createUncontrollable;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _invariant = __webpack_require__(35);

var _invariant2 = _interopRequireDefault(_invariant);

var _utils = __webpack_require__(131);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createUncontrollable(mixin, set) {

  return uncontrollable;

  function uncontrollable(Component, controlledValues) {
    var _class, _temp;

    var methods = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var displayName = Component.displayName || Component.name || 'Component',
        basePropTypes = utils.getType(Component).propTypes,
        isCompositeComponent = utils.isReactComponent(Component),
        controlledProps = Object.keys(controlledValues),
        propTypes;

    var OMIT_PROPS = ['valueLink', 'checkedLink'].concat(controlledProps.map(utils.defaultKey));

    propTypes = utils.uncontrolledPropTypes(controlledValues, basePropTypes, displayName);

    (0, _invariant2.default)(isCompositeComponent || !methods.length, '[uncontrollable] stateless function components cannot pass through methods ' + 'because they have no associated instances. Check component: ' + displayName + ', ' + 'attempting to pass through methods: ' + methods.join(', '));

    methods = utils.transform(methods, function (obj, method) {
      obj[method] = function () {
        var _refs$inner;

        return (_refs$inner = this.refs.inner)[method].apply(_refs$inner, arguments);
      };
    }, {});

    var component = (_temp = _class = function (_React$Component) {
      _inherits(component, _React$Component);

      function component() {
        _classCallCheck(this, component);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
      }

      component.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return !mixin.shouldComponentUpdate || mixin.shouldComponentUpdate.apply(this, args);
      };

      component.prototype.componentWillMount = function componentWillMount() {
        var _this2 = this;

        var props = this.props;

        this._values = {};

        controlledProps.forEach(function (key) {
          _this2._values[key] = props[utils.defaultKey(key)];
        });
      };

      /**
       * If a prop switches from controlled to Uncontrolled
       * reset its value to the defaultValue
       */


      component.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var _this3 = this;

        var props = this.props;

        if (mixin.componentWillReceiveProps) {
          mixin.componentWillReceiveProps.call(this, nextProps);
        }

        controlledProps.forEach(function (key) {
          if (utils.getValue(nextProps, key) === undefined && utils.getValue(props, key) !== undefined) {
            _this3._values[key] = nextProps[utils.defaultKey(key)];
          }
        });
      };

      component.prototype.componentWillUnmount = function componentWillUnmount() {
        this.unmounted = true;
      };

      component.prototype.getControlledInstance = function getControlledInstance() {
        return this.refs.inner;
      };

      component.prototype.render = function render() {
        var _this4 = this;

        var newProps = {},
            props = omitProps(this.props);

        utils.each(controlledValues, function (handle, propName) {
          var linkPropName = utils.getLinkName(propName),
              prop = _this4.props[propName];

          if (linkPropName && !isProp(_this4.props, propName) && isProp(_this4.props, linkPropName)) {
            prop = _this4.props[linkPropName].value;
          }

          newProps[propName] = prop !== undefined ? prop : _this4._values[propName];

          newProps[handle] = setAndNotify.bind(_this4, propName);
        });

        newProps = _extends({}, props, newProps, {
          ref: isCompositeComponent ? 'inner' : null
        });

        return _react2.default.createElement(Component, newProps);
      };

      return component;
    }(_react2.default.Component), _class.displayName = 'Uncontrolled(' + displayName + ')', _class.propTypes = propTypes, _temp);

    _extends(component.prototype, methods);

    component.ControlledComponent = Component;

    /**
     * useful when wrapping a Component and you want to control
     * everything
     */
    component.deferControlTo = function (newComponent) {
      var additions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var nextMethods = arguments[2];

      return uncontrollable(newComponent, _extends({}, controlledValues, additions), nextMethods);
    };

    return component;

    function setAndNotify(propName, value) {
      var linkName = utils.getLinkName(propName),
          handler = this.props[controlledValues[propName]];

      if (linkName && isProp(this.props, linkName) && !handler) {
        handler = this.props[linkName].requestChange;
      }

      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      set(this, propName, handler, value, args);
    }

    function isProp(props, prop) {
      return props[prop] !== undefined;
    }

    function omitProps(props) {
      var result = {};

      utils.each(props, function (value, key) {
        if (OMIT_PROPS.indexOf(key) === -1) result[key] = value;
      });

      return result;
    }
  }
}
module.exports = exports['default'];

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.version = undefined;
exports.uncontrolledPropTypes = uncontrolledPropTypes;
exports.getType = getType;
exports.getValue = getValue;
exports.getLinkName = getLinkName;
exports.defaultKey = defaultKey;
exports.chain = chain;
exports.transform = transform;
exports.each = each;
exports.has = has;
exports.isReactComponent = isReactComponent;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _invariant = __webpack_require__(35);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readOnlyPropType(handler, name) {
  return function (props, propName) {
    if (props[propName] !== undefined) {
      if (!props[handler]) {
        return new Error('You have provided a `' + propName + '` prop to ' + '`' + name + '` without an `' + handler + '` handler. This will render a read-only field. ' + 'If the field should be mutable use `' + defaultKey(propName) + '`. Otherwise, set `' + handler + '`');
      }
    }
  };
}

function uncontrolledPropTypes(controlledValues, basePropTypes, displayName) {
  var propTypes = {};

  if (undefined !== 'production' && basePropTypes) {
    transform(controlledValues, function (obj, handler, prop) {
      (0, _invariant2.default)(typeof handler === 'string' && handler.trim().length, 'Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable', displayName, prop);

      obj[prop] = readOnlyPropType(handler, displayName);
    }, propTypes);
  }

  return propTypes;
}

var version = exports.version = _react2.default.version.split('.').map(parseFloat);

function getType(component) {
  if (version[0] >= 15 || version[0] === 0 && version[1] >= 13) return component;

  return component.type;
}

function getValue(props, name) {
  var linkPropName = getLinkName(name);

  if (linkPropName && !isProp(props, name) && isProp(props, linkPropName)) return props[linkPropName].value;

  return props[name];
}

function isProp(props, prop) {
  return props[prop] !== undefined;
}

function getLinkName(name) {
  return name === 'value' ? 'valueLink' : name === 'checked' ? 'checkedLink' : null;
}

function defaultKey(key) {
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
}

function chain(thisArg, a, b) {
  return function chainedFunction() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    a && a.call.apply(a, [thisArg].concat(args));
    b && b.call.apply(b, [thisArg].concat(args));
  };
}

function transform(obj, cb, seed) {
  each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})));
  return seed;
}

function each(obj, cb, thisArg) {
  if (Array.isArray(obj)) return obj.forEach(cb, thisArg);

  for (var key in obj) {
    if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
  }
}

function has(o, k) {
  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
function isReactComponent(component) {
  return !!(component && component.prototype && component.prototype.isReactComponent);
}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(133);
module.exports = __webpack_require__(11).Object.entries;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(13);
var $entries = __webpack_require__(79)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(135);
module.exports = __webpack_require__(11).Object.values;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(13);
var $values = __webpack_require__(79)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.properties = exports.end = undefined;

var _end = __webpack_require__(137);

var _end2 = _interopRequireDefault(_end);

var _properties = __webpack_require__(61);

var _properties2 = _interopRequireDefault(_properties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.end = _end2.default;
exports.properties = _properties2.default;
exports.default = { end: _end2.default, properties: _properties2.default };

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _properties = __webpack_require__(61);

var _properties2 = _interopRequireDefault(_properties);

var _style = __webpack_require__(33);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onEnd(node, handler, duration) {
  var fakeEvent = {
    target: node,
    currentTarget: node
  },
      backup;

  if (!_properties2.default.end) duration = 0;else if (duration == null) duration = parseDuration(node) || 0;

  if (_properties2.default.end) {
    node.addEventListener(_properties2.default.end, done, false);

    backup = setTimeout(function () {
      return done(fakeEvent);
    }, (duration || 100) * 1.5);
  } else setTimeout(done.bind(null, fakeEvent), 0);

  function done(event) {
    if (event.target !== event.currentTarget) return;
    clearTimeout(backup);
    event.target.removeEventListener(_properties2.default.end, done);
    handler.call(this);
  }
}

onEnd._parseDuration = parseDuration;

exports.default = onEnd;


function parseDuration(node) {
  var str = (0, _style2.default)(node, _properties2.default.duration),
      mult = str.indexOf('ms') === -1 ? 1000 : 1;

  return parseFloat(str) * mult;
}
module.exports = exports['default'];

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = camelize;
var rHyphen = /-(.)/g;

function camelize(string) {
  return string.replace(rHyphen, function (_, chr) {
    return chr.toUpperCase();
  });
}
module.exports = exports["default"];

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateStyleName;

var _hyphenate = __webpack_require__(140);

var _hyphenate2 = _interopRequireDefault(_hyphenate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var msPattern = /^ms-/; /**
                         * Copyright 2013-2014, Facebook, Inc.
                         * All rights reserved.
                         * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
                         */

function hyphenateStyleName(string) {
  return (0, _hyphenate2.default)(string).replace(msPattern, '-ms-');
}
module.exports = exports['default'];

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenate;

var rUpper = /([A-Z])/g;

function hyphenate(string) {
  return string.replace(rUpper, '-$1').toLowerCase();
}
module.exports = exports['default'];

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _getComputedStyle;

var _camelizeStyle = __webpack_require__(80);

var _camelizeStyle2 = _interopRequireDefault(_camelizeStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rposition = /^(top|right|bottom|left)$/;
var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;

function _getComputedStyle(node) {
  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
  var doc = node.ownerDocument;

  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : {
    //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
    getPropertyValue: function getPropertyValue(prop) {
      var style = node.style;

      prop = (0, _camelizeStyle2.default)(prop);

      if (prop == 'float') prop = 'styleFloat';

      var current = node.currentStyle[prop] || null;

      if (current == null && style && style[prop]) current = style[prop];

      if (rnumnonpx.test(current) && !rposition.test(prop)) {
        // Remember the original values
        var left = style.left;
        var runStyle = node.runtimeStyle;
        var rsLeft = runStyle && runStyle.left;

        // Put in the new values to get a computed value out
        if (rsLeft) runStyle.left = node.currentStyle.left;

        style.left = prop === 'fontSize' ? '1em' : current;
        current = style.pixelLeft + 'px';

        // Revert the changed values
        style.left = left;
        if (rsLeft) runStyle.left = rsLeft;
      }

      return current;
    }
  };
}
module.exports = exports['default'];

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeStyle;
function removeStyle(node, key) {
  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
}
module.exports = exports['default'];

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTransform;
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;

function isTransform(property) {
  return !!(property && supportedTransforms.test(property));
}
module.exports = exports["default"];

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.classNamesShape = exports.timeoutsShape = undefined;
exports.transitionTimeout = transitionTimeout;

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transitionTimeout(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function (props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (props[timeoutPropName] == null) {
        return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }

    return null;
  };
}

var timeoutsShape = exports.timeoutsShape = _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({
  enter: _propTypes2.default.number,
  exit: _propTypes2.default.number
}).isRequired]);

var classNamesShape = exports.classNamesShape = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  exit: _propTypes2.default.string,
  active: _propTypes2.default.string
}), _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  enterActive: _propTypes2.default.string,
  exit: _propTypes2.default.string,
  exitActive: _propTypes2.default.string
})]);

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(146), __esModule: true };

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(72);
__webpack_require__(147);
module.exports = __webpack_require__(11).Array.from;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(42);
var $export = __webpack_require__(13);
var toObject = __webpack_require__(51);
var call = __webpack_require__(148);
var isArrayIter = __webpack_require__(149);
var toLength = __webpack_require__(71);
var createProperty = __webpack_require__(150);
var getIterFn = __webpack_require__(151);

$export($export.S + $export.F * !__webpack_require__(153)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(21);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(32);
var ITERATOR = __webpack_require__(12)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(16);
var createDesc = __webpack_require__(29);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(152);
var ITERATOR = __webpack_require__(12)('iterator');
var Iterators = __webpack_require__(32);
module.exports = __webpack_require__(11).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(44);
var TAG = __webpack_require__(12)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(12)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listen = exports.filter = exports.off = exports.on = undefined;

var _on = __webpack_require__(63);

var _on2 = _interopRequireDefault(_on);

var _off = __webpack_require__(64);

var _off2 = _interopRequireDefault(_off);

var _filter = __webpack_require__(155);

var _filter2 = _interopRequireDefault(_filter);

var _listen = __webpack_require__(157);

var _listen2 = _interopRequireDefault(_listen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.on = _on2.default;
exports.off = _off2.default;
exports.filter = _filter2.default;
exports.listen = _listen2.default;
exports.default = { on: _on2.default, off: _off2.default, filter: _filter2.default, listen: _listen2.default };

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filterEvents;

var _contains = __webpack_require__(26);

var _contains2 = _interopRequireDefault(_contains);

var _querySelectorAll = __webpack_require__(156);

var _querySelectorAll2 = _interopRequireDefault(_querySelectorAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterEvents(selector, handler) {
  return function filterHandler(e) {
    var top = e.currentTarget,
        target = e.target,
        matches = (0, _querySelectorAll2.default)(top, selector);

    if (matches.some(function (match) {
      return (0, _contains2.default)(match, target);
    })) handler.call(this, e);
  };
}
module.exports = exports['default'];

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = qsa;
// Zepto.js
// (c) 2010-2015 Thomas Fuchs
// Zepto.js may be freely distributed under the MIT license.
var simpleSelectorRE = /^[\w-]*$/;
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);

function qsa(element, selector) {
  var maybeID = selector[0] === '#',
      maybeClass = selector[0] === '.',
      nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
      isSimple = simpleSelectorRE.test(nameOnly),
      found;

  if (isSimple) {
    if (maybeID) {
      element = element.getElementById ? element : document;
      return (found = element.getElementById(nameOnly)) ? [found] : [];
    }

    if (element.getElementsByClassName && maybeClass) return toArray(element.getElementsByClassName(nameOnly));

    return toArray(element.getElementsByTagName(selector));
  }

  return toArray(element.querySelectorAll(selector));
}
module.exports = exports['default'];

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(15);

var _inDOM2 = _interopRequireDefault(_inDOM);

var _on = __webpack_require__(63);

var _on2 = _interopRequireDefault(_on);

var _off = __webpack_require__(64);

var _off2 = _interopRequireDefault(_off);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listen = function listen() {};

if (_inDOM2.default) {
  listen = function listen(node, eventName, handler, capture) {
    (0, _on2.default)(node, eventName, handler, capture);
    return function () {
      (0, _off2.default)(node, eventName, handler, capture);
    };
  };
}

exports.default = listen;
module.exports = exports['default'];

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _activeElement = __webpack_require__(82);

var _activeElement2 = _interopRequireDefault(_activeElement);

var _contains = __webpack_require__(26);

var _contains2 = _interopRequireDefault(_contains);

var _inDOM = __webpack_require__(15);

var _inDOM2 = _interopRequireDefault(_inDOM);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _componentOrElement = __webpack_require__(39);

var _componentOrElement2 = _interopRequireDefault(_componentOrElement);

var _deprecated = __webpack_require__(159);

var _deprecated2 = _interopRequireDefault(_deprecated);

var _elementType = __webpack_require__(8);

var _elementType2 = _interopRequireDefault(_elementType);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(9);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _warning = __webpack_require__(10);

var _warning2 = _interopRequireDefault(_warning);

var _ModalManager = __webpack_require__(160);

var _ModalManager2 = _interopRequireDefault(_ModalManager);

var _Portal = __webpack_require__(88);

var _Portal2 = _interopRequireDefault(_Portal);

var _RefHolder = __webpack_require__(166);

var _RefHolder2 = _interopRequireDefault(_RefHolder);

var _addEventListener = __webpack_require__(84);

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _addFocusListener = __webpack_require__(167);

var _addFocusListener2 = _interopRequireDefault(_addFocusListener);

var _getContainer = __webpack_require__(41);

var _getContainer2 = _interopRequireDefault(_getContainer);

var _ownerDocument = __webpack_require__(27);

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/prop-types */

var modalManager = new _ModalManager2.default();

/**
 * Love them or hate them, `<Modal/>` provides a solid foundation for creating dialogs, lightboxes, or whatever else.
 * The Modal component renders its `children` node in front of a backdrop component.
 *
 * The Modal offers a few helpful features over using just a `<Portal/>` component and some styles:
 *
 * - Manages dialog stacking when one-at-a-time just isn't enough.
 * - Creates a backdrop, for disabling interaction below the modal.
 * - It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
 * - It disables scrolling of the page content while open.
 * - Adds the appropriate ARIA roles are automatically.
 * - Easily pluggable animations via a `<Transition/>` component.
 *
 * Note that, in the same way the backdrop element prevents users from clicking or interacting
 * with the page content underneath the Modal, Screen readers also need to be signaled to not to
 * interact with page content while the Modal is open. To do this, we use a common technique of applying
 * the `aria-hidden='true'` attribute to the non-Modal elements in the Modal `container`. This means that for
 * a Modal to be truly modal, it should have a `container` that is _outside_ your app's
 * React hierarchy (such as the default: document.body).
 */

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  Modal.prototype.omitProps = function omitProps(props, propTypes) {

    var keys = Object.keys(props);
    var newProps = {};
    keys.map(function (prop) {
      if (!Object.prototype.hasOwnProperty.call(propTypes, prop)) {
        newProps[prop] = props[prop];
      }
    });

    return newProps;
  };

  Modal.prototype.render = function render() {
    var _props = this.props,
        show = _props.show,
        container = _props.container,
        children = _props.children,
        Transition = _props.transition,
        backdrop = _props.backdrop,
        className = _props.className,
        style = _props.style,
        onExit = _props.onExit,
        onExiting = _props.onExiting,
        onEnter = _props.onEnter,
        onEntering = _props.onEntering,
        onEntered = _props.onEntered;


    var dialog = _react2.default.Children.only(children);
    var filteredProps = this.omitProps(this.props, Modal.propTypes);

    var mountModal = show || Transition && !this.state.exited;
    if (!mountModal) {
      return null;
    }

    var _dialog$props = dialog.props,
        role = _dialog$props.role,
        tabIndex = _dialog$props.tabIndex;


    if (role === undefined || tabIndex === undefined) {
      dialog = (0, _react.cloneElement)(dialog, {
        role: role === undefined ? 'document' : role,
        tabIndex: tabIndex == null ? '-1' : tabIndex
      });
    }

    if (Transition) {
      dialog = _react2.default.createElement(
        Transition,
        {
          appear: true,
          unmountOnExit: true,
          'in': show,
          onExit: onExit,
          onExiting: onExiting,
          onExited: this.handleHidden,
          onEnter: onEnter,
          onEntering: onEntering,
          onEntered: onEntered
        },
        dialog
      );
    }

    return _react2.default.createElement(
      _Portal2.default,
      {
        ref: this.setMountNode,
        container: container,
        onRendered: this.onPortalRendered
      },
      _react2.default.createElement(
        'div',
        _extends({
          ref: this.setModalNodeRef,
          role: role || 'dialog'
        }, filteredProps, {
          style: style,
          className: className
        }),
        backdrop && this.renderBackdrop(),
        _react2.default.createElement(
          _RefHolder2.default,
          { ref: this.setDialogRef },
          dialog
        )
      )
    );
  };

  Modal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.setState({ exited: false });
    } else if (!nextProps.transition) {
      // Otherwise let handleHidden take care of marking exited.
      this.setState({ exited: true });
    }
  };

  Modal.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    if (!this.props.show && nextProps.show) {
      this.checkForFocus();
    }
  };

  Modal.prototype.componentDidMount = function componentDidMount() {
    this._isMounted = true;
    if (this.props.show) {
      this.onShow();
    }
  };

  Modal.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var transition = this.props.transition;


    if (prevProps.show && !this.props.show && !transition) {
      // Otherwise handleHidden will call this.
      this.onHide();
    } else if (!prevProps.show && this.props.show) {
      this.onShow();
    }
  };

  Modal.prototype.componentWillUnmount = function componentWillUnmount() {
    var _props2 = this.props,
        show = _props2.show,
        transition = _props2.transition;


    this._isMounted = false;

    if (show || transition && !this.state.exited) {
      this.onHide();
    }
  };

  Modal.prototype.autoFocus = function autoFocus() {
    if (!this.props.autoFocus) {
      return;
    }

    var dialogElement = this.getDialogElement();
    var currentActiveElement = (0, _activeElement2.default)((0, _ownerDocument2.default)(this));

    if (dialogElement && !(0, _contains2.default)(dialogElement, currentActiveElement)) {
      this.lastFocus = currentActiveElement;

      if (!dialogElement.hasAttribute('tabIndex')) {
        (0, _warning2.default)(false, 'The modal content node does not accept focus. For the benefit of ' + 'assistive technologies, the tabIndex of the node is being set ' + 'to "-1".');

        dialogElement.setAttribute('tabIndex', -1);
      }

      dialogElement.focus();
    }
  };

  Modal.prototype.restoreLastFocus = function restoreLastFocus() {
    // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
    if (this.lastFocus && this.lastFocus.focus) {
      this.lastFocus.focus();
      this.lastFocus = null;
    }
  };

  Modal.prototype.getDialogElement = function getDialogElement() {
    return _reactDom2.default.findDOMNode(this.dialog);
  };

  Modal.prototype.isTopModal = function isTopModal() {
    return this.props.manager.isTopModal(this);
  };

  return Modal;
}(_react2.default.Component);

Modal.propTypes = _extends({}, _Portal2.default.propTypes, {

  /**
   * Set the visibility of the Modal
   */
  show: _propTypes2.default.bool,

  /**
   * A Node, Component instance, or function that returns either. The Modal is appended to it's container element.
   *
   * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
   * page content can be placed behind a virtual backdrop as well as a visual one.
   */
  container: _propTypes2.default.oneOfType([_componentOrElement2.default, _propTypes2.default.func]),

  /**
   * A callback fired when the Modal is opening.
   */
  onShow: _propTypes2.default.func,

  /**
   * A callback fired when either the backdrop is clicked, or the escape key is pressed.
   *
   * The `onHide` callback only signals intent from the Modal,
   * you must actually set the `show` prop to `false` for the Modal to close.
   */
  onHide: _propTypes2.default.func,

  /**
   * Include a backdrop component.
   */
  backdrop: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.oneOf(['static'])]),

  /**
   * A function that returns a backdrop component. Useful for custom
   * backdrop rendering.
   *
   * ```js
   *  renderBackdrop={props => <MyBackdrop {...props} />}
   * ```
   */
  renderBackdrop: _propTypes2.default.func,

  /**
   * A callback fired when the escape key, if specified in `keyboard`, is pressed.
   */
  onEscapeKeyDown: _propTypes2.default.func,

  /**
   * Support for this function will be deprecated. Please use `onEscapeKeyDown` instead
   * A callback fired when the escape key, if specified in `keyboard`, is pressed.
   * @deprecated
   */
  onEscapeKeyUp: (0, _deprecated2.default)(_propTypes2.default.func, 'Please use onEscapeKeyDown instead for consistency'),

  /**
   * A callback fired when the backdrop, if specified, is clicked.
   */
  onBackdropClick: _propTypes2.default.func,

  /**
   * A style object for the backdrop component.
   */
  backdropStyle: _propTypes2.default.object,

  /**
   * A css class or classes for the backdrop component.
   */
  backdropClassName: _propTypes2.default.string,

  /**
   * A css class or set of classes applied to the modal container when the modal is open,
   * and removed when it is closed.
   */
  containerClassName: _propTypes2.default.string,

  /**
   * Close the modal when escape key is pressed
   */
  keyboard: _propTypes2.default.bool,

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component used
   * to control animations for the dialog component.
   */
  transition: _elementType2.default,

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component used
   * to control animations for the backdrop components.
   */
  backdropTransition: _elementType2.default,

  /**
   * When `true` The modal will automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes. This also
   * works correctly with any Modal children that have the `autoFocus` prop.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
   */
  autoFocus: _propTypes2.default.bool,

  /**
   * When `true` The modal will prevent focus from leaving the Modal while open.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
   */
  enforceFocus: _propTypes2.default.bool,

  /**
   * When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus: _propTypes2.default.bool,

  /**
   * Callback fired before the Modal transitions in
   */
  onEnter: _propTypes2.default.func,

  /**
   * Callback fired as the Modal begins to transition in
   */
  onEntering: _propTypes2.default.func,

  /**
   * Callback fired after the Modal finishes transitioning in
   */
  onEntered: _propTypes2.default.func,

  /**
   * Callback fired right before the Modal transitions out
   */
  onExit: _propTypes2.default.func,

  /**
   * Callback fired as the Modal begins to transition out
   */
  onExiting: _propTypes2.default.func,

  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited: _propTypes2.default.func,

  /**
   * A ModalManager instance used to track and manage the state of open
   * Modals. Useful when customizing how modals interact within a container
   */
  manager: _propTypes2.default.object.isRequired
});
Modal.defaultProps = {
  show: false,
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  onHide: function onHide() {},
  manager: modalManager,
  renderBackdrop: function renderBackdrop(props) {
    return _react2.default.createElement('div', props);
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.state = { exited: !this.props.show };

  this.renderBackdrop = function () {
    var _props3 = _this2.props,
        backdropStyle = _props3.backdropStyle,
        backdropClassName = _props3.backdropClassName,
        renderBackdrop = _props3.renderBackdrop,
        Transition = _props3.backdropTransition;


    var backdropRef = function backdropRef(ref) {
      return _this2.backdrop = ref;
    };

    var backdrop = renderBackdrop({
      ref: backdropRef,
      style: backdropStyle,
      className: backdropClassName,
      onClick: _this2.handleBackdropClick
    });

    if (Transition) {
      backdrop = _react2.default.createElement(
        Transition,
        {
          appear: true,
          'in': _this2.props.show
        },
        backdrop
      );
    }

    return backdrop;
  };

  this.onPortalRendered = function () {
    _this2.autoFocus();

    if (_this2.props.onShow) {
      _this2.props.onShow();
    }
  };

  this.onShow = function () {
    var doc = (0, _ownerDocument2.default)(_this2);
    var container = (0, _getContainer2.default)(_this2.props.container, doc.body);

    _this2.props.manager.add(_this2, container, _this2.props.containerClassName);

    _this2._onDocumentKeydownListener = (0, _addEventListener2.default)(doc, 'keydown', _this2.handleDocumentKeyDown);

    _this2._onDocumentKeyupListener = (0, _addEventListener2.default)(doc, 'keyup', _this2.handleDocumentKeyUp);

    _this2._onFocusinListener = (0, _addFocusListener2.default)(_this2.enforceFocus);
  };

  this.onHide = function () {
    _this2.props.manager.remove(_this2);

    _this2._onDocumentKeydownListener.remove();

    _this2._onDocumentKeyupListener.remove();

    _this2._onFocusinListener.remove();

    if (_this2.props.restoreFocus) {
      _this2.restoreLastFocus();
    }
  };

  this.setMountNode = function (ref) {
    _this2.mountNode = ref ? ref.getMountNode() : ref;
  };

  this.setModalNodeRef = function (ref) {
    _this2.modalNode = ref;
  };

  this.setDialogRef = function (ref) {
    _this2.dialog = ref;
  };

  this.handleHidden = function () {
    _this2.setState({ exited: true });
    _this2.onHide();

    if (_this2.props.onExited) {
      var _props4;

      (_props4 = _this2.props).onExited.apply(_props4, arguments);
    }
  };

  this.handleBackdropClick = function (e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    if (_this2.props.onBackdropClick) {
      _this2.props.onBackdropClick(e);
    }

    if (_this2.props.backdrop === true) {
      _this2.props.onHide();
    }
  };

  this.handleDocumentKeyDown = function (e) {
    if (_this2.props.keyboard && e.keyCode === 27 && _this2.isTopModal()) {
      if (_this2.props.onEscapeKeyDown) {
        _this2.props.onEscapeKeyDown(e);
      }

      _this2.props.onHide();
    }
  };

  this.handleDocumentKeyUp = function (e) {
    if (_this2.props.keyboard && e.keyCode === 27 && _this2.isTopModal()) {
      if (_this2.props.onEscapeKeyUp) {
        _this2.props.onEscapeKeyUp(e);
      }
    }
  };

  this.checkForFocus = function () {
    if (_inDOM2.default) {
      _this2.lastFocus = (0, _activeElement2.default)();
    }
  };

  this.enforceFocus = function () {
    if (!_this2.props.enforceFocus || !_this2._isMounted || !_this2.isTopModal()) {
      return;
    }

    var dialogElement = _this2.getDialogElement();
    var currentActiveElement = (0, _activeElement2.default)((0, _ownerDocument2.default)(_this2));

    if (dialogElement && !(0, _contains2.default)(dialogElement, currentActiveElement)) {
      dialogElement.focus();
    }
  };
};

Modal.Manager = _ModalManager2.default;

exports.default = Modal;
module.exports = exports['default'];

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deprecated;

var _warning = __webpack_require__(10);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var warned = {};

function deprecated(validator, reason) {
  return function validate(props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (props[propName] != null) {
      var messageKey = componentName + '.' + propName;

      (0, _warning2.default)(warned[messageKey], 'The ' + location + ' `' + propFullNameSafe + '` of ' + ('`' + componentNameSafe + '` is deprecated. ' + reason + '.'));

      warned[messageKey] = true;
    }

    for (var _len = arguments.length, args = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      args[_key - 5] = arguments[_key];
    }

    return validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
  };
}

/* eslint-disable no-underscore-dangle */
function _resetWarned() {
  warned = {};
}

deprecated._resetWarned = _resetWarned;
/* eslint-enable no-underscore-dangle */

module.exports = exports['default'];

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _class = __webpack_require__(161);

var _class2 = _interopRequireDefault(_class);

var _style = __webpack_require__(33);

var _style2 = _interopRequireDefault(_style);

var _scrollbarSize = __webpack_require__(85);

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);

var _isOverflowing = __webpack_require__(87);

var _isOverflowing2 = _interopRequireDefault(_isOverflowing);

var _manageAriaHidden = __webpack_require__(164);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function findIndexOf(arr, cb) {
  var idx = -1;
  arr.some(function (d, i) {
    if (cb(d, i)) {
      idx = i;
      return true;
    }
  });
  return idx;
}

function findContainer(data, modal) {
  return findIndexOf(data, function (d) {
    return d.modals.indexOf(modal) !== -1;
  });
}

function setContainerStyle(state, container) {
  var style = { overflow: 'hidden' };

  // we are only interested in the actual `style` here
  // becasue we will override it
  state.style = {
    overflow: container.style.overflow,
    paddingRight: container.style.paddingRight
  };

  if (state.overflowing) {
    // use computed style, here to get the real padding
    // to add our scrollbar width
    style.paddingRight = parseInt((0, _style2.default)(container, 'paddingRight') || 0, 10) + (0, _scrollbarSize2.default)() + 'px';
  }

  (0, _style2.default)(container, style);
}

function removeContainerStyle(_ref, container) {
  var style = _ref.style;


  Object.keys(style).forEach(function (key) {
    return container.style[key] = style[key];
  });
}
/**
 * Proper state managment for containers and the modals in those containers.
 *
 * @internal Used by the Modal to ensure proper styling of containers.
 */

var ModalManager = function ModalManager() {
  var _this = this;

  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$hideSiblingNode = _ref2.hideSiblingNodes,
      hideSiblingNodes = _ref2$hideSiblingNode === undefined ? true : _ref2$hideSiblingNode,
      _ref2$handleContainer = _ref2.handleContainerOverflow,
      handleContainerOverflow = _ref2$handleContainer === undefined ? true : _ref2$handleContainer;

  _classCallCheck(this, ModalManager);

  this.add = function (modal, container, className) {
    var modalIdx = _this.modals.indexOf(modal);
    var containerIdx = _this.containers.indexOf(container);

    if (modalIdx !== -1) {
      return modalIdx;
    }

    modalIdx = _this.modals.length;
    _this.modals.push(modal);

    if (_this.hideSiblingNodes) {
      (0, _manageAriaHidden.hideSiblings)(container, modal.mountNode);
    }

    if (containerIdx !== -1) {
      _this.data[containerIdx].modals.push(modal);
      return modalIdx;
    }

    var data = {
      modals: [modal],
      //right now only the first modal of a container will have its classes applied
      classes: className ? className.split(/\s+/) : [],

      overflowing: (0, _isOverflowing2.default)(container)
    };

    if (_this.handleContainerOverflow) {
      setContainerStyle(data, container);
    }

    data.classes.forEach(_class2.default.addClass.bind(null, container));

    _this.containers.push(container);
    _this.data.push(data);

    return modalIdx;
  };

  this.remove = function (modal) {
    var modalIdx = _this.modals.indexOf(modal);

    if (modalIdx === -1) {
      return;
    }

    var containerIdx = findContainer(_this.data, modal);
    var data = _this.data[containerIdx];
    var container = _this.containers[containerIdx];

    data.modals.splice(data.modals.indexOf(modal), 1);

    _this.modals.splice(modalIdx, 1);

    // if that was the last modal in a container,
    // clean up the container
    if (data.modals.length === 0) {
      data.classes.forEach(_class2.default.removeClass.bind(null, container));

      if (_this.handleContainerOverflow) {
        removeContainerStyle(data, container);
      }

      if (_this.hideSiblingNodes) {
        (0, _manageAriaHidden.showSiblings)(container, modal.mountNode);
      }
      _this.containers.splice(containerIdx, 1);
      _this.data.splice(containerIdx, 1);
    } else if (_this.hideSiblingNodes) {
      //otherwise make sure the next top modal is visible to a SR
      (0, _manageAriaHidden.ariaHidden)(false, data.modals[data.modals.length - 1].mountNode);
    }
  };

  this.isTopModal = function (modal) {
    return !!_this.modals.length && _this.modals[_this.modals.length - 1] === modal;
  };

  this.hideSiblingNodes = hideSiblingNodes;
  this.handleContainerOverflow = handleContainerOverflow;
  this.modals = [];
  this.containers = [];
  this.data = [];
};

exports.default = ModalManager;
module.exports = exports['default'];

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasClass = exports.removeClass = exports.addClass = undefined;

var _addClass = __webpack_require__(162);

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = __webpack_require__(163);

var _removeClass2 = _interopRequireDefault(_removeClass);

var _hasClass = __webpack_require__(86);

var _hasClass2 = _interopRequireDefault(_hasClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.addClass = _addClass2.default;
exports.removeClass = _removeClass2.default;
exports.hasClass = _hasClass2.default;
exports.default = { addClass: _addClass2.default, removeClass: _removeClass2.default, hasClass: _hasClass2.default };

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addClass;

var _hasClass = __webpack_require__(86);

var _hasClass2 = _interopRequireDefault(_hasClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!(0, _hasClass2.default)(element, className)) if (typeof element.className === 'string') element.className = element.className + ' ' + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + ' ' + className);
}
module.exports = exports['default'];

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp('(^|\\s)' + classToRemove + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}

module.exports = function removeClass(element, className) {
  if (element.classList) element.classList.remove(className);else if (typeof element.className === 'string') element.className = replaceClassName(element.className, className);else element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.ariaHidden = ariaHidden;
exports.hideSiblings = hideSiblings;
exports.showSiblings = showSiblings;

var BLACKLIST = ['template', 'script', 'style'];

var isHidable = function isHidable(_ref) {
  var nodeType = _ref.nodeType,
      tagName = _ref.tagName;
  return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
};

var siblings = function siblings(container, mount, cb) {
  mount = [].concat(mount);

  [].forEach.call(container.children, function (node) {
    if (mount.indexOf(node) === -1 && isHidable(node)) {
      cb(node);
    }
  });
};

function ariaHidden(show, node) {
  if (!node) {
    return;
  }
  if (show) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}

function hideSiblings(container, mountNode) {
  siblings(container, mountNode, function (node) {
    return ariaHidden(true, node);
  });
}

function showSiblings(container, mountNode) {
  siblings(container, mountNode, function (node) {
    return ariaHidden(false, node);
  });
}

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _componentOrElement = __webpack_require__(39);

var _componentOrElement2 = _interopRequireDefault(_componentOrElement);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(9);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _getContainer = __webpack_require__(41);

var _getContainer2 = _interopRequireDefault(_getContainer);

var _ownerDocument = __webpack_require__(27);

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `<Portal/>` component renders its children into a new "subtree" outside of current component hierarchy.
 * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.
 * The children of `<Portal/>` component will be appended to the `container` specified.
 */
var Portal = function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal() {
    var _temp, _this, _ret;

    _classCallCheck(this, Portal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this._mountOverlayTarget = function () {
      if (!_this._overlayTarget) {
        _this._overlayTarget = document.createElement('div');
        _this._portalContainerNode = (0, _getContainer2.default)(_this.props.container, (0, _ownerDocument2.default)(_this).body);
        _this._portalContainerNode.appendChild(_this._overlayTarget);
      }
    }, _this._unmountOverlayTarget = function () {
      if (_this._overlayTarget) {
        _this._portalContainerNode.removeChild(_this._overlayTarget);
        _this._overlayTarget = null;
      }
      _this._portalContainerNode = null;
    }, _this._renderOverlay = function () {
      var overlay = !_this.props.children ? null : _react2.default.Children.only(_this.props.children);

      // Save reference for future access.
      if (overlay !== null) {
        _this._mountOverlayTarget();

        var initialRender = !_this._overlayInstance;

        _this._overlayInstance = _reactDom2.default.unstable_renderSubtreeIntoContainer(_this, overlay, _this._overlayTarget, function () {
          if (initialRender && _this.props.onRendered) {
            _this.props.onRendered();
          }
        });
      } else {
        // Unrender if the component is null for transitions to null
        _this._unrenderOverlay();
        _this._unmountOverlayTarget();
      }
    }, _this._unrenderOverlay = function () {
      if (_this._overlayTarget) {
        _reactDom2.default.unmountComponentAtNode(_this._overlayTarget);
        _this._overlayInstance = null;
      }
    }, _this.getMountNode = function () {
      return _this._overlayTarget;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Portal.prototype.componentDidMount = function componentDidMount() {
    this._isMounted = true;
    this._renderOverlay();
  };

  Portal.prototype.componentDidUpdate = function componentDidUpdate() {
    this._renderOverlay();
  };

  Portal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this._overlayTarget && nextProps.container !== this.props.container) {
      this._portalContainerNode.removeChild(this._overlayTarget);
      this._portalContainerNode = (0, _getContainer2.default)(nextProps.container, (0, _ownerDocument2.default)(this).body);
      this._portalContainerNode.appendChild(this._overlayTarget);
    }
  };

  Portal.prototype.componentWillUnmount = function componentWillUnmount() {
    this._isMounted = false;
    this._unrenderOverlay();
    this._unmountOverlayTarget();
  };

  Portal.prototype.render = function render() {
    return null;
  };

  return Portal;
}(_react2.default.Component);

Portal.displayName = 'Portal';
Portal.propTypes = {
  /**
   * A Node, Component instance, or function that returns either. The `container` will have the Portal children
   * appended to it.
   */
  container: _propTypes2.default.oneOfType([_componentOrElement2.default, _propTypes2.default.func]),

  onRendered: _propTypes2.default.func
};
exports.default = Portal;
module.exports = exports['default'];

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  children: _propTypes2.default.node
};

/**
 * Internal helper component to allow attaching a non-conflicting ref to a
 * child element that may not accept refs.
 */

var RefHolder = function (_React$Component) {
  _inherits(RefHolder, _React$Component);

  function RefHolder() {
    _classCallCheck(this, RefHolder);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  RefHolder.prototype.render = function render() {
    return this.props.children;
  };

  return RefHolder;
}(_react2.default.Component);

RefHolder.propTypes = propTypes;

exports.default = RefHolder;
module.exports = exports['default'];

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = addFocusListener;
/**
 * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
 * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
 *
 * We only allow one Listener at a time to avoid stack overflows
 */
function addFocusListener(handler) {
  var useFocusin = !document.addEventListener;
  var remove = void 0;

  if (useFocusin) {
    document.attachEvent('onfocusin', handler);
    remove = function remove() {
      return document.detachEvent('onfocusin', handler);
    };
  } else {
    document.addEventListener('focus', handler, true);
    remove = function remove() {
      return document.removeEventListener('focus', handler, true);
    };
  }

  return { remove: remove };
}
module.exports = exports['default'];

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _elementType = __webpack_require__(8);

var _elementType2 = _interopRequireDefault(_elementType);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Portal = __webpack_require__(88);

var _Portal2 = _interopRequireDefault(_Portal);

var _Position = __webpack_require__(169);

var _Position2 = _interopRequireDefault(_Position);

var _RootCloseWrapper = __webpack_require__(83);

var _RootCloseWrapper2 = _interopRequireDefault(_RootCloseWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Built on top of `<Position/>` and `<Portal/>`, the overlay component is great for custom tooltip overlays.
 */
var Overlay = function (_React$Component) {
  _inherits(Overlay, _React$Component);

  function Overlay(props, context) {
    _classCallCheck(this, Overlay);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.handleHidden = function () {
      _this.setState({ exited: true });

      if (_this.props.onExited) {
        var _this$props;

        (_this$props = _this.props).onExited.apply(_this$props, arguments);
      }
    };

    _this.state = { exited: !props.show };
    _this.onHiddenListener = _this.handleHidden.bind(_this);
    return _this;
  }

  Overlay.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.setState({ exited: false });
    } else if (!nextProps.transition) {
      // Otherwise let handleHidden take care of marking exited.
      this.setState({ exited: true });
    }
  };

  Overlay.prototype.render = function render() {
    var _props = this.props,
        container = _props.container,
        containerPadding = _props.containerPadding,
        target = _props.target,
        placement = _props.placement,
        shouldUpdatePosition = _props.shouldUpdatePosition,
        rootClose = _props.rootClose,
        children = _props.children,
        Transition = _props.transition,
        props = _objectWithoutProperties(_props, ['container', 'containerPadding', 'target', 'placement', 'shouldUpdatePosition', 'rootClose', 'children', 'transition']);

    // Don't un-render the overlay while it's transitioning out.


    var mountOverlay = props.show || Transition && !this.state.exited;
    if (!mountOverlay) {
      // Don't bother showing anything if we don't have to.
      return null;
    }

    var child = children;

    // Position is be inner-most because it adds inline styles into the child,
    // which the other wrappers don't forward correctly.
    child = _react2.default.createElement(
      _Position2.default,
      { container: container, containerPadding: containerPadding, target: target, placement: placement, shouldUpdatePosition: shouldUpdatePosition },
      child
    );

    if (Transition) {
      var onExit = props.onExit,
          onExiting = props.onExiting,
          onEnter = props.onEnter,
          onEntering = props.onEntering,
          onEntered = props.onEntered;

      // This animates the child node by injecting props, so it must precede
      // anything that adds a wrapping div.

      child = _react2.default.createElement(
        Transition,
        {
          'in': props.show,
          appear: true,
          onExit: onExit,
          onExiting: onExiting,
          onExited: this.onHiddenListener,
          onEnter: onEnter,
          onEntering: onEntering,
          onEntered: onEntered
        },
        child
      );
    }

    // This goes after everything else because it adds a wrapping div.
    if (rootClose) {
      child = _react2.default.createElement(
        _RootCloseWrapper2.default,
        { onRootClose: props.onHide },
        child
      );
    }

    return _react2.default.createElement(
      _Portal2.default,
      { container: container },
      child
    );
  };

  return Overlay;
}(_react2.default.Component);

Overlay.propTypes = _extends({}, _Portal2.default.propTypes, _Position2.default.propTypes, {

  /**
   * Set the visibility of the Overlay
   */
  show: _propTypes2.default.bool,

  /**
   * Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
   */
  rootClose: _propTypes2.default.bool,

  /**
   * A Callback fired by the Overlay when it wishes to be hidden.
   *
   * __required__ when `rootClose` is `true`.
   *
   * @type func
   */
  onHide: function onHide(props) {
    var propType = _propTypes2.default.func;
    if (props.rootClose) {
      propType = propType.isRequired;
    }

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return propType.apply(undefined, [props].concat(args));
  },


  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component
   * used to animate the overlay as it changes visibility.
   */
  transition: _elementType2.default,

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: _propTypes2.default.func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: _propTypes2.default.func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: _propTypes2.default.func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: _propTypes2.default.func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: _propTypes2.default.func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: _propTypes2.default.func
});

exports.default = Overlay;
module.exports = exports['default'];

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = __webpack_require__(6);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _componentOrElement = __webpack_require__(39);

var _componentOrElement2 = _interopRequireDefault(_componentOrElement);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(9);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _calculatePosition = __webpack_require__(170);

var _calculatePosition2 = _interopRequireDefault(_calculatePosition);

var _getContainer = __webpack_require__(41);

var _getContainer2 = _interopRequireDefault(_getContainer);

var _ownerDocument = __webpack_require__(27);

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Position component calculates the coordinates for its child, to position
 * it relative to a `target` component or node. Useful for creating callouts
 * and tooltips, the Position component injects a `style` props with `left` and
 * `top` values for positioning your component.
 *
 * It also injects "arrow" `left`, and `top` values for styling callout arrows
 * for giving your components a sense of directionality.
 */
var Position = function (_React$Component) {
  _inherits(Position, _React$Component);

  function Position(props, context) {
    _classCallCheck(this, Position);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.getTarget = function () {
      var target = _this.props.target;

      var targetElement = typeof target === 'function' ? target() : target;
      return targetElement && _reactDom2.default.findDOMNode(targetElement) || null;
    };

    _this.maybeUpdatePosition = function (placementChanged) {
      var target = _this.getTarget();

      if (!_this.props.shouldUpdatePosition && target === _this._lastTarget && !placementChanged) {
        return;
      }

      _this.updatePosition(target);
    };

    _this.state = {
      positionLeft: 0,
      positionTop: 0,
      arrowOffsetLeft: null,
      arrowOffsetTop: null
    };

    _this._needsFlush = false;
    _this._lastTarget = null;
    return _this;
  }

  Position.prototype.componentDidMount = function componentDidMount() {
    this.updatePosition(this.getTarget());
  };

  Position.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    this._needsFlush = true;
  };

  Position.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this._needsFlush) {
      this._needsFlush = false;
      this.maybeUpdatePosition(this.props.placement !== prevProps.placement);
    }
  };

  Position.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        className = _props.className,
        props = _objectWithoutProperties(_props, ['children', 'className']);

    var _state = this.state,
        positionLeft = _state.positionLeft,
        positionTop = _state.positionTop,
        arrowPosition = _objectWithoutProperties(_state, ['positionLeft', 'positionTop']);

    // These should not be forwarded to the child.


    delete props.target;
    delete props.container;
    delete props.containerPadding;
    delete props.shouldUpdatePosition;

    var child = _react2.default.Children.only(children);
    return (0, _react.cloneElement)(child, _extends({}, props, arrowPosition, {
      // FIXME: Don't forward `positionLeft` and `positionTop` via both props
      // and `props.style`.
      positionLeft: positionLeft,
      positionTop: positionTop,
      className: (0, _classnames2.default)(className, child.props.className),
      style: _extends({}, child.props.style, {
        left: positionLeft,
        top: positionTop
      })
    }));
  };

  Position.prototype.updatePosition = function updatePosition(target) {
    this._lastTarget = target;

    if (!target) {
      this.setState({
        positionLeft: 0,
        positionTop: 0,
        arrowOffsetLeft: null,
        arrowOffsetTop: null
      });

      return;
    }

    var overlay = _reactDom2.default.findDOMNode(this);
    var container = (0, _getContainer2.default)(this.props.container, (0, _ownerDocument2.default)(this).body);

    this.setState((0, _calculatePosition2.default)(this.props.placement, overlay, target, container, this.props.containerPadding));
  };

  return Position;
}(_react2.default.Component);

Position.propTypes = {
  /**
   * A node, element, or function that returns either. The child will be
   * be positioned next to the `target` specified.
   */
  target: _propTypes2.default.oneOfType([_componentOrElement2.default, _propTypes2.default.func]),

  /**
   * "offsetParent" of the component
   */
  container: _propTypes2.default.oneOfType([_componentOrElement2.default, _propTypes2.default.func]),
  /**
   * Minimum spacing in pixels between container border and component border
   */
  containerPadding: _propTypes2.default.number,
  /**
   * How to position the component relative to the target
   */
  placement: _propTypes2.default.oneOf(['top', 'right', 'bottom', 'left']),
  /**
   * Whether the position should be changed on each update
   */
  shouldUpdatePosition: _propTypes2.default.bool
};

Position.displayName = 'Position';

Position.defaultProps = {
  containerPadding: 0,
  placement: 'right',
  shouldUpdatePosition: false
};

exports.default = Position;
module.exports = exports['default'];

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = calculatePosition;

var _offset = __webpack_require__(89);

var _offset2 = _interopRequireDefault(_offset);

var _position = __webpack_require__(171);

var _position2 = _interopRequireDefault(_position);

var _scrollTop = __webpack_require__(90);

var _scrollTop2 = _interopRequireDefault(_scrollTop);

var _ownerDocument = __webpack_require__(27);

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getContainerDimensions(containerNode) {
  var width = void 0,
      height = void 0,
      scroll = void 0;

  if (containerNode.tagName === 'BODY') {
    width = window.innerWidth;
    height = window.innerHeight;

    scroll = (0, _scrollTop2.default)((0, _ownerDocument2.default)(containerNode).documentElement) || (0, _scrollTop2.default)(containerNode);
  } else {
    var _getOffset = (0, _offset2.default)(containerNode);

    width = _getOffset.width;
    height = _getOffset.height;

    scroll = (0, _scrollTop2.default)(containerNode);
  }

  return { width: width, height: height, scroll: scroll };
}

function getTopDelta(top, overlayHeight, container, padding) {
  var containerDimensions = getContainerDimensions(container);
  var containerScroll = containerDimensions.scroll;
  var containerHeight = containerDimensions.height;

  var topEdgeOffset = top - padding - containerScroll;
  var bottomEdgeOffset = top + padding - containerScroll + overlayHeight;

  if (topEdgeOffset < 0) {
    return -topEdgeOffset;
  } else if (bottomEdgeOffset > containerHeight) {
    return containerHeight - bottomEdgeOffset;
  } else {
    return 0;
  }
}

function getLeftDelta(left, overlayWidth, container, padding) {
  var containerDimensions = getContainerDimensions(container);
  var containerWidth = containerDimensions.width;

  var leftEdgeOffset = left - padding;
  var rightEdgeOffset = left + padding + overlayWidth;

  if (leftEdgeOffset < 0) {
    return -leftEdgeOffset;
  } else if (rightEdgeOffset > containerWidth) {
    return containerWidth - rightEdgeOffset;
  }

  return 0;
}

function calculatePosition(placement, overlayNode, target, container, padding) {
  var childOffset = container.tagName === 'BODY' ? (0, _offset2.default)(target) : (0, _position2.default)(target, container);

  var _getOffset2 = (0, _offset2.default)(overlayNode),
      overlayHeight = _getOffset2.height,
      overlayWidth = _getOffset2.width;

  var positionLeft = void 0,
      positionTop = void 0,
      arrowOffsetLeft = void 0,
      arrowOffsetTop = void 0;

  if (placement === 'left' || placement === 'right') {
    positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;

    if (placement === 'left') {
      positionLeft = childOffset.left - overlayWidth;
    } else {
      positionLeft = childOffset.left + childOffset.width;
    }

    var topDelta = getTopDelta(positionTop, overlayHeight, container, padding);

    positionTop += topDelta;
    arrowOffsetTop = 50 * (1 - 2 * topDelta / overlayHeight) + '%';
    arrowOffsetLeft = void 0;
  } else if (placement === 'top' || placement === 'bottom') {
    positionLeft = childOffset.left + (childOffset.width - overlayWidth) / 2;

    if (placement === 'top') {
      positionTop = childOffset.top - overlayHeight;
    } else {
      positionTop = childOffset.top + childOffset.height;
    }

    var leftDelta = getLeftDelta(positionLeft, overlayWidth, container, padding);

    positionLeft += leftDelta;
    arrowOffsetLeft = 50 * (1 - 2 * leftDelta / overlayWidth) + '%';
    arrowOffsetTop = void 0;
  } else {
    throw new Error('calcOverlayPosition(): No such placement of "' + placement + '" found.');
  }

  return { positionLeft: positionLeft, positionTop: positionTop, arrowOffsetLeft: arrowOffsetLeft, arrowOffsetTop: arrowOffsetTop };
}
module.exports = exports['default'];

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = position;

var _offset = __webpack_require__(89);

var _offset2 = _interopRequireDefault(_offset);

var _offsetParent = __webpack_require__(172);

var _offsetParent2 = _interopRequireDefault(_offsetParent);

var _scrollTop = __webpack_require__(90);

var _scrollTop2 = _interopRequireDefault(_scrollTop);

var _scrollLeft = __webpack_require__(173);

var _scrollLeft2 = _interopRequireDefault(_scrollLeft);

var _style = __webpack_require__(33);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nodeName(node) {
  return node.nodeName && node.nodeName.toLowerCase();
}

function position(node, offsetParent) {
  var parentOffset = { top: 0, left: 0 },
      offset;

  // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
  // because it is its only offset parent
  if ((0, _style2.default)(node, 'position') === 'fixed') {
    offset = node.getBoundingClientRect();
  } else {
    offsetParent = offsetParent || (0, _offsetParent2.default)(node);
    offset = (0, _offset2.default)(node);

    if (nodeName(offsetParent) !== 'html') parentOffset = (0, _offset2.default)(offsetParent);

    parentOffset.top += parseInt((0, _style2.default)(offsetParent, 'borderTopWidth'), 10) - (0, _scrollTop2.default)(offsetParent) || 0;
    parentOffset.left += parseInt((0, _style2.default)(offsetParent, 'borderLeftWidth'), 10) - (0, _scrollLeft2.default)(offsetParent) || 0;
  }

  // Subtract parent offsets and node margins
  return _extends({}, offset, {
    top: offset.top - parentOffset.top - (parseInt((0, _style2.default)(node, 'marginTop'), 10) || 0),
    left: offset.left - parentOffset.left - (parseInt((0, _style2.default)(node, 'marginLeft'), 10) || 0)
  });
}
module.exports = exports['default'];

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = offsetParent;

var _ownerDocument = __webpack_require__(25);

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

var _style = __webpack_require__(33);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nodeName(node) {
  return node.nodeName && node.nodeName.toLowerCase();
}

function offsetParent(node) {
  var doc = (0, _ownerDocument2.default)(node),
      offsetParent = node && node.offsetParent;

  while (offsetParent && nodeName(node) !== 'html' && (0, _style2.default)(offsetParent, 'position') === 'static') {
    offsetParent = offsetParent.offsetParent;
  }

  return offsetParent || doc.documentElement;
}
module.exports = exports['default'];

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollTop;

var _isWindow = __webpack_require__(40);

var _isWindow2 = _interopRequireDefault(_isWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollTop(node, val) {
  var win = (0, _isWindow2.default)(node);

  if (val === undefined) return win ? 'pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft : node.scrollLeft;

  if (win) win.scrollTo(val, 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop);else node.scrollLeft = val;
}
module.exports = exports['default'];

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = createChainableTypeChecker;
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// Mostly taken from ReactPropTypes.

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (props[propName] == null) {
      if (isRequired) {
        return new Error('Required ' + location + ' `' + propFullNameSafe + '` was not specified ' + ('in `' + componentNameSafe + '`.'));
      }

      return null;
    }

    for (var _len = arguments.length, args = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      args[_key - 6] = arguments[_key];
    }

    return validate.apply(undefined, [props, propName, componentNameSafe, location, propFullNameSafe].concat(args));
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

/***/ })
/******/ ]);
});