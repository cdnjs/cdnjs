(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactBootstrap"] = factory(require("react"), require("react-dom"));
	else
		root["ReactBootstrap"] = factory(root["React"], root["ReactDOM"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__787__, __WEBPACK_EXTERNAL_MODULE__156__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 814:
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;
  var nativeCodeString = '[native code]';
  function classNames() {
    var classes = [];
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;
      var argType = typeof arg;
      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        if (arg.length) {
          var inner = classNames.apply(null, arg);
          if (inner) {
            classes.push(inner);
          }
        }
      } else if (argType === 'object') {
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
          classes.push(arg.toString());
          continue;
        }
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
    return classes.join(' ');
  }
  if ( true && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if (true) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return classNames;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),

/***/ 286:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
var invariant = function (condition, format, a, b, c, d, e, f) {
  if (false) {}
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
};
module.exports = invariant;

/***/ }),

/***/ 946:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = all;
var _createChainableTypeChecker = __webpack_require__(844);
var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
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

/***/ 964:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var _react = __webpack_require__(787);
var _react2 = _interopRequireDefault(_react);
var _createChainableTypeChecker = __webpack_require__(844);
var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
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
exports["default"] = (0, _createChainableTypeChecker2.default)(validate);
module.exports = exports['default'];

/***/ }),

/***/ 647:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = deprecated;
var _warning = __webpack_require__(459);
var _warning2 = _interopRequireDefault(_warning);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
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

/***/ 835:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _react = __webpack_require__(787);
var _react2 = _interopRequireDefault(_react);
var _reactIs = __webpack_require__(532);
var _createChainableTypeChecker = __webpack_require__(844);
var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function elementType(props, propName, componentName, location, propFullName) {
  var propValue = props[propName];
  if (_react2.default.isValidElement(propValue)) {
    return new Error('Invalid ' + location + ' `' + propFullName + '` of type ReactElement ' + ('supplied to `' + componentName + '`,expected an element type (a string ') + ', component class, or function component).');
  }
  if (!(0, _reactIs.isValidElementType)(propValue)) {
    return new Error('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + ', component class, or function component).');
  }
  return null;
}
exports["default"] = (0, _createChainableTypeChecker2.default)(elementType);
module.exports = exports['default'];

/***/ }),

/***/ 517:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
__webpack_unused_export__ = exports.nm = __webpack_unused_export__ = exports.ax = __webpack_unused_export__ = undefined;
var _all = __webpack_require__(946);
var _all2 = _interopRequireDefault(_all);
var _componentOrElement = __webpack_require__(964);
var _componentOrElement2 = _interopRequireDefault(_componentOrElement);
var _deprecated = __webpack_require__(647);
var _deprecated2 = _interopRequireDefault(_deprecated);
var _elementType = __webpack_require__(835);
var _elementType2 = _interopRequireDefault(_elementType);
var _isRequiredForA11y = __webpack_require__(422);
var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
__webpack_unused_export__ = _all2.default;
exports.ax = _componentOrElement2.default;
__webpack_unused_export__ = _deprecated2.default;
exports.nm = _elementType2.default;
__webpack_unused_export__ = _isRequiredForA11y2.default;

/***/ }),

/***/ 422:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isRequiredForA11y;
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

/***/ 844:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = createChainableTypeChecker;
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

/***/ 428:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(134);
function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }
  ;
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  ;
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/***/ }),

/***/ 526:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(428)();
}

/***/ }),

/***/ 134:
/***/ ((module) => {

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

/***/ 15:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var b = "function" === typeof Symbol && Symbol.for,
  c = b ? Symbol.for("react.element") : 60103,
  d = b ? Symbol.for("react.portal") : 60106,
  e = b ? Symbol.for("react.fragment") : 60107,
  f = b ? Symbol.for("react.strict_mode") : 60108,
  g = b ? Symbol.for("react.profiler") : 60114,
  h = b ? Symbol.for("react.provider") : 60109,
  k = b ? Symbol.for("react.context") : 60110,
  l = b ? Symbol.for("react.async_mode") : 60111,
  m = b ? Symbol.for("react.concurrent_mode") : 60111,
  n = b ? Symbol.for("react.forward_ref") : 60112,
  p = b ? Symbol.for("react.suspense") : 60113,
  q = b ? Symbol.for("react.suspense_list") : 60120,
  r = b ? Symbol.for("react.memo") : 60115,
  t = b ? Symbol.for("react.lazy") : 60116,
  v = b ? Symbol.for("react.block") : 60121,
  w = b ? Symbol.for("react.fundamental") : 60117,
  x = b ? Symbol.for("react.responder") : 60118,
  y = b ? Symbol.for("react.scope") : 60119;
function z(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;
    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;
              default:
                return u;
            }
        }
      case d:
        return u;
    }
  }
}
function A(a) {
  return z(a) === m;
}
exports.AsyncMode = l;
exports.ConcurrentMode = m;
exports.ContextConsumer = k;
exports.ContextProvider = h;
exports.Element = c;
exports.ForwardRef = n;
exports.Fragment = e;
exports.Lazy = t;
exports.Memo = r;
exports.Portal = d;
exports.Profiler = g;
exports.StrictMode = f;
exports.Suspense = p;
exports.isAsyncMode = function (a) {
  return A(a) || z(a) === l;
};
exports.isConcurrentMode = A;
exports.isContextConsumer = function (a) {
  return z(a) === k;
};
exports.isContextProvider = function (a) {
  return z(a) === h;
};
exports.isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};
exports.isForwardRef = function (a) {
  return z(a) === n;
};
exports.isFragment = function (a) {
  return z(a) === e;
};
exports.isLazy = function (a) {
  return z(a) === t;
};
exports.isMemo = function (a) {
  return z(a) === r;
};
exports.isPortal = function (a) {
  return z(a) === d;
};
exports.isProfiler = function (a) {
  return z(a) === g;
};
exports.isStrictMode = function (a) {
  return z(a) === f;
};
exports.isSuspense = function (a) {
  return z(a) === p;
};
exports.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};
exports.typeOf = z;

/***/ }),

/***/ 532:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(15);
} else {}

/***/ }),

/***/ 955:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/** @license React v16.14.0
 * react-jsx-dev-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


__webpack_require__(787);
exports.Fragment = 60107;
if ("function" === typeof Symbol && Symbol.for) {
  var a = Symbol.for;
  exports.Fragment = a("react.fragment");
}
exports.jsxDEV = void 0;

/***/ }),

/***/ 356:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/** @license React v16.14.0
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var f = __webpack_require__(787),
  g = 60103;
exports.Fragment = 60107;
if ("function" === typeof Symbol && Symbol.for) {
  var h = Symbol.for;
  g = h("react.element");
  exports.Fragment = h("react.fragment");
}
var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  n = Object.prototype.hasOwnProperty,
  p = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };
function q(c, a, k) {
  var b,
    d = {},
    e = null,
    l = null;
  void 0 !== k && (e = "" + k);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (l = a.ref);
  for (b in a) n.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return {
    $$typeof: g,
    type: c,
    key: e,
    ref: l,
    props: d,
    _owner: m.current
  };
}
exports.jsx = q;
exports.jsxs = q;

/***/ }),

/***/ 485:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(955);
} else {}

/***/ }),

/***/ 373:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(356);
} else {}

/***/ }),

/***/ 459:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */
var __DEV__ = "production" !== 'production';
var warning = function () {};
if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
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
  warning = function (condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}
module.exports = warning;

/***/ }),

/***/ 787:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__787__;

/***/ }),

/***/ 156:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__156__;

/***/ })

/******/ 	});
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
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Accordion: () => (/* reexport */ src_Accordion),
  AccordionButton: () => (/* reexport */ src_AccordionButton),
  AccordionCollapse: () => (/* reexport */ src_AccordionCollapse),
  AccordionContext: () => (/* reexport */ AccordionContext),
  AccordionHeader: () => (/* reexport */ src_AccordionHeader),
  AccordionItem: () => (/* reexport */ src_AccordionItem),
  Alert: () => (/* reexport */ src_Alert),
  AlertHeading: () => (/* reexport */ src_AlertHeading),
  AlertLink: () => (/* reexport */ src_AlertLink),
  Anchor: () => (/* reexport */ src_Anchor),
  Badge: () => (/* reexport */ src_Badge),
  Breadcrumb: () => (/* reexport */ src_Breadcrumb),
  BreadcrumbItem: () => (/* reexport */ src_BreadcrumbItem),
  Button: () => (/* reexport */ src_Button),
  ButtonGroup: () => (/* reexport */ src_ButtonGroup),
  ButtonToolbar: () => (/* reexport */ src_ButtonToolbar),
  Card: () => (/* reexport */ src_Card),
  CardBody: () => (/* reexport */ src_CardBody),
  CardFooter: () => (/* reexport */ src_CardFooter),
  CardGroup: () => (/* reexport */ src_CardGroup),
  CardHeader: () => (/* reexport */ src_CardHeader),
  CardImg: () => (/* reexport */ src_CardImg),
  CardImgOverlay: () => (/* reexport */ src_CardImgOverlay),
  CardLink: () => (/* reexport */ src_CardLink),
  CardSubtitle: () => (/* reexport */ src_CardSubtitle),
  CardText: () => (/* reexport */ src_CardText),
  CardTitle: () => (/* reexport */ src_CardTitle),
  Carousel: () => (/* reexport */ src_Carousel),
  CarouselCaption: () => (/* reexport */ src_CarouselCaption),
  CarouselItem: () => (/* reexport */ src_CarouselItem),
  CloseButton: () => (/* reexport */ src_CloseButton),
  Col: () => (/* reexport */ src_Col),
  Collapse: () => (/* reexport */ src_Collapse),
  Container: () => (/* reexport */ src_Container),
  Dropdown: () => (/* reexport */ src_Dropdown),
  DropdownButton: () => (/* reexport */ src_DropdownButton),
  DropdownDivider: () => (/* reexport */ src_DropdownDivider),
  DropdownHeader: () => (/* reexport */ src_DropdownHeader),
  DropdownItem: () => (/* reexport */ src_DropdownItem),
  DropdownItemText: () => (/* reexport */ src_DropdownItemText),
  DropdownMenu: () => (/* reexport */ src_DropdownMenu),
  DropdownToggle: () => (/* reexport */ src_DropdownToggle),
  Fade: () => (/* reexport */ src_Fade),
  Figure: () => (/* reexport */ src_Figure),
  FigureCaption: () => (/* reexport */ src_FigureCaption),
  FigureImage: () => (/* reexport */ src_FigureImage),
  FloatingLabel: () => (/* reexport */ src_FloatingLabel),
  Form: () => (/* reexport */ src_Form),
  FormCheck: () => (/* reexport */ src_FormCheck),
  FormControl: () => (/* reexport */ src_FormControl),
  FormFloating: () => (/* reexport */ src_FormFloating),
  FormGroup: () => (/* reexport */ src_FormGroup),
  FormLabel: () => (/* reexport */ src_FormLabel),
  FormSelect: () => (/* reexport */ src_FormSelect),
  FormText: () => (/* reexport */ src_FormText),
  Image: () => (/* reexport */ src_Image),
  InputGroup: () => (/* reexport */ src_InputGroup),
  ListGroup: () => (/* reexport */ src_ListGroup),
  ListGroupItem: () => (/* reexport */ src_ListGroupItem),
  Modal: () => (/* reexport */ src_Modal),
  ModalBody: () => (/* reexport */ src_ModalBody),
  ModalDialog: () => (/* reexport */ src_ModalDialog),
  ModalFooter: () => (/* reexport */ src_ModalFooter),
  ModalHeader: () => (/* reexport */ src_ModalHeader),
  ModalTitle: () => (/* reexport */ src_ModalTitle),
  Nav: () => (/* reexport */ src_Nav),
  NavDropdown: () => (/* reexport */ src_NavDropdown),
  NavItem: () => (/* reexport */ src_NavItem),
  NavLink: () => (/* reexport */ src_NavLink),
  Navbar: () => (/* reexport */ src_Navbar),
  NavbarBrand: () => (/* reexport */ src_NavbarBrand),
  NavbarCollapse: () => (/* reexport */ src_NavbarCollapse),
  NavbarOffcanvas: () => (/* reexport */ src_NavbarOffcanvas),
  NavbarText: () => (/* reexport */ src_NavbarText),
  NavbarToggle: () => (/* reexport */ src_NavbarToggle),
  Offcanvas: () => (/* reexport */ src_Offcanvas),
  OffcanvasBody: () => (/* reexport */ src_OffcanvasBody),
  OffcanvasHeader: () => (/* reexport */ src_OffcanvasHeader),
  OffcanvasTitle: () => (/* reexport */ src_OffcanvasTitle),
  OffcanvasToggling: () => (/* reexport */ src_OffcanvasToggling),
  Overlay: () => (/* reexport */ src_Overlay),
  OverlayTrigger: () => (/* reexport */ src_OverlayTrigger),
  PageItem: () => (/* reexport */ src_PageItem),
  Pagination: () => (/* reexport */ src_Pagination),
  Placeholder: () => (/* reexport */ src_Placeholder),
  PlaceholderButton: () => (/* reexport */ src_PlaceholderButton),
  Popover: () => (/* reexport */ src_Popover),
  PopoverBody: () => (/* reexport */ src_PopoverBody),
  PopoverHeader: () => (/* reexport */ src_PopoverHeader),
  ProgressBar: () => (/* reexport */ src_ProgressBar),
  Ratio: () => (/* reexport */ src_Ratio),
  Row: () => (/* reexport */ src_Row),
  SSRProvider: () => (/* reexport */ SSRProvider),
  Spinner: () => (/* reexport */ src_Spinner),
  SplitButton: () => (/* reexport */ src_SplitButton),
  Stack: () => (/* reexport */ src_Stack),
  Tab: () => (/* reexport */ src_Tab),
  TabContainer: () => (/* reexport */ src_TabContainer),
  TabContent: () => (/* reexport */ src_TabContent),
  TabPane: () => (/* reexport */ src_TabPane),
  Table: () => (/* reexport */ src_Table),
  Tabs: () => (/* reexport */ src_Tabs),
  ThemeProvider: () => (/* reexport */ src_ThemeProvider),
  Toast: () => (/* reexport */ src_Toast),
  ToastBody: () => (/* reexport */ src_ToastBody),
  ToastContainer: () => (/* reexport */ src_ToastContainer),
  ToastHeader: () => (/* reexport */ src_ToastHeader),
  ToggleButton: () => (/* reexport */ src_ToggleButton),
  ToggleButtonGroup: () => (/* reexport */ src_ToggleButtonGroup),
  Tooltip: () => (/* reexport */ src_Tooltip),
  useAccordionButton: () => (/* reexport */ useAccordionButton)
});

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(814);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}
var external_root_React_commonjs2_react_commonjs_react_amd_react_ = __webpack_require__(787);
var external_root_React_commonjs2_react_commonjs_react_amd_react_default = /*#__PURE__*/__webpack_require__.n(external_root_React_commonjs2_react_commonjs_react_amd_react_);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(526);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function extends_extends() {
  extends_extends = Object.assign ? Object.assign.bind() : function (target) {
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
  return extends_extends.apply(this, arguments);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
// EXTERNAL MODULE: ./node_modules/invariant/browser.js
var browser = __webpack_require__(286);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);
;// CONCATENATED MODULE: ./node_modules/uncontrollable/lib/esm/utils.js

var noop = function noop() {};
function readOnlyPropType(handler, name) {
  return function (props, propName) {
    if (props[propName] !== undefined) {
      if (!props[handler]) {
        return new Error("You have provided a `" + propName + "` prop to `" + name + "` " + ("without an `" + handler + "` handler prop. This will render a read-only field. ") + ("If the field should be mutable use `" + defaultKey(propName) + "`. ") + ("Otherwise, set `" + handler + "`."));
      }
    }
  };
}
function uncontrolledPropTypes(controlledValues, displayName) {
  var propTypes = {};
  Object.keys(controlledValues).forEach(function (prop) {
    // add default propTypes for folks that use runtime checks
    propTypes[defaultKey(prop)] = noop;
    if (false) { var handler; }
  });
  return propTypes;
}
function isProp(props, prop) {
  return props[prop] !== undefined;
}
function defaultKey(key) {
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
}
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

function canAcceptRef(component) {
  return !!component && (typeof component !== 'function' || component.prototype && component.prototype.isReactComponent);
}
;// CONCATENATED MODULE: ./node_modules/uncontrollable/lib/esm/hook.js


function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}


function useUncontrolledProp(propValue, defaultValue, handler) {
  var wasPropRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(propValue !== undefined);
  var _useState = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(defaultValue),
    stateValue = _useState[0],
    setState = _useState[1];
  var isProp = propValue !== undefined;
  var wasProp = wasPropRef.current;
  wasPropRef.current = isProp;
  /**
   * If a prop switches from controlled to Uncontrolled
   * reset its value to the defaultValue
   */

  if (!isProp && wasProp && stateValue !== defaultValue) {
    setState(defaultValue);
  }
  return [isProp ? propValue : stateValue, (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (value) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (handler) handler.apply(void 0, [value].concat(args));
    setState(value);
  }, [handler])];
}

function useUncontrolled(props, config) {
  return Object.keys(config).reduce(function (result, fieldName) {
    var _extends2;
    var _ref = result,
      defaultValue = _ref[defaultKey(fieldName)],
      propsValue = _ref[fieldName],
      rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, [defaultKey(fieldName), fieldName].map(_toPropertyKey));
    var handlerName = config[fieldName];
    var _useUncontrolledProp = useUncontrolledProp(propsValue, defaultValue, props[handlerName]),
      value = _useUncontrolledProp[0],
      handler = _useUncontrolledProp[1];
    return extends_extends({}, rest, (_extends2 = {}, _extends2[fieldName] = value, _extends2[handlerName] = handler, _extends2));
  }, props);
}
;// CONCATENATED MODULE: ./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function componentWillMount() {
  // Call this.constructor.gDSFP to support sub-classes.
  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
  if (state !== null && state !== undefined) {
    this.setState(state);
  }
}
function componentWillReceiveProps(nextProps) {
  // Call this.constructor.gDSFP to support sub-classes.
  // Use the setState() updater to ensure state isn't stale in certain edge cases.
  function updater(prevState) {
    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
    return state !== null && state !== undefined ? state : null;
  }
  // Binding "this" is important for shallow renderer support.
  this.setState(updater.bind(this));
}
function componentWillUpdate(nextProps, nextState) {
  try {
    var prevProps = this.props;
    var prevState = this.state;
    this.props = nextProps;
    this.state = nextState;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(prevProps, prevState);
  } finally {
    this.props = prevProps;
    this.state = prevState;
  }
}

// React may warn about cWM/cWRP/cWU methods being deprecated.
// Add a flag to suppress these warnings for this special case.
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;
function react_lifecycles_compat_es_polyfill(Component) {
  var prototype = Component.prototype;
  if (!prototype || !prototype.isReactComponent) {
    throw new Error('Can only polyfill class components');
  }
  if (typeof Component.getDerivedStateFromProps !== 'function' && typeof prototype.getSnapshotBeforeUpdate !== 'function') {
    return Component;
  }

  // If new component APIs are defined, "unsafe" lifecycles won't be called.
  // Error if any of these lifecycles are present,
  // Because they would work differently between older and newer (16.3+) versions of React.
  var foundWillMountName = null;
  var foundWillReceivePropsName = null;
  var foundWillUpdateName = null;
  if (typeof prototype.componentWillMount === 'function') {
    foundWillMountName = 'componentWillMount';
  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
    foundWillMountName = 'UNSAFE_componentWillMount';
  }
  if (typeof prototype.componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'componentWillReceiveProps';
  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
  }
  if (typeof prototype.componentWillUpdate === 'function') {
    foundWillUpdateName = 'componentWillUpdate';
  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
    foundWillUpdateName = 'UNSAFE_componentWillUpdate';
  }
  if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
    var componentName = Component.displayName || Component.name;
    var newApiName = typeof Component.getDerivedStateFromProps === 'function' ? 'getDerivedStateFromProps()' : 'getSnapshotBeforeUpdate()';
    throw Error('Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' + componentName + ' uses ' + newApiName + ' but also contains the following legacy lifecycles:' + (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') + (foundWillReceivePropsName !== null ? '\n  ' + foundWillReceivePropsName : '') + (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') + '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' + 'https://fb.me/react-async-component-lifecycle-hooks');
  }

  // React <= 16.2 does not support static getDerivedStateFromProps.
  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
  // Newer versions of React will ignore these lifecycles if gDSFP exists.
  if (typeof Component.getDerivedStateFromProps === 'function') {
    prototype.componentWillMount = componentWillMount;
    prototype.componentWillReceiveProps = componentWillReceiveProps;
  }

  // React <= 16.2 does not support getSnapshotBeforeUpdate.
  // As a workaround, use cWU to invoke the new lifecycle.
  // Newer versions of React will ignore that lifecycle if gSBU exists.
  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
    if (typeof prototype.componentDidUpdate !== 'function') {
      throw new Error('Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype');
    }
    prototype.componentWillUpdate = componentWillUpdate;
    var componentDidUpdate = prototype.componentDidUpdate;
    prototype.componentDidUpdate = function componentDidUpdatePolyfill(prevProps, prevState, maybeSnapshot) {
      // 16.3+ will not execute our will-update method;
      // It will pass a snapshot value to did-update though.
      // Older versions will require our polyfilled will-update value.
      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
      // Because for <= 15.x versions this might be a "prevContext" object.
      // We also can't just check "__reactInternalSnapshot",
      // Because get-snapshot might return a falsy value.
      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
      var snapshot = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : maybeSnapshot;
      componentDidUpdate.call(this, prevProps, prevState, snapshot);
    };
  }
  return Component;
}

;// CONCATENATED MODULE: ./node_modules/uncontrollable/lib/esm/uncontrollable.js



var _jsxFileName = "/Users/jquense/src/uncontrollable/src/uncontrollable.js";




function uncontrollable(Component, controlledValues, methods) {
  if (methods === void 0) {
    methods = [];
  }
  var displayName = Component.displayName || Component.name || 'Component';
  var canAcceptRef = Utils.canAcceptRef(Component);
  var controlledProps = Object.keys(controlledValues);
  var PROPS_TO_OMIT = controlledProps.map(Utils.defaultKey);
  !(canAcceptRef || !methods.length) ?  false ? 0 : invariant(false) : void 0;
  var UncontrolledComponent = /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(UncontrolledComponent, _React$Component);
    function UncontrolledComponent() {
      var _this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.handlers = Object.create(null);
      controlledProps.forEach(function (propName) {
        var handlerName = controlledValues[propName];
        var handleChange = function handleChange(value) {
          if (_this.props[handlerName]) {
            var _this$props;
            _this._notifying = true;
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            (_this$props = _this.props)[handlerName].apply(_this$props, [value].concat(args));
            _this._notifying = false;
          }
          if (!_this.unmounted) _this.setState(function (_ref) {
            var _extends2;
            var values = _ref.values;
            return {
              values: _extends(Object.create(null), values, (_extends2 = {}, _extends2[propName] = value, _extends2))
            };
          });
        };
        _this.handlers[handlerName] = handleChange;
      });
      if (methods.length) _this.attachRef = function (ref) {
        _this.inner = ref;
      };
      var values = Object.create(null);
      controlledProps.forEach(function (key) {
        values[key] = _this.props[Utils.defaultKey(key)];
      });
      _this.state = {
        values: values,
        prevProps: {}
      };
      return _this;
    }
    var _proto = UncontrolledComponent.prototype;
    _proto.shouldComponentUpdate = function shouldComponentUpdate() {
      //let setState trigger the update
      return !this._notifying;
    };
    UncontrolledComponent.getDerivedStateFromProps = function getDerivedStateFromProps(props, _ref2) {
      var values = _ref2.values,
        prevProps = _ref2.prevProps;
      var nextState = {
        values: _extends(Object.create(null), values),
        prevProps: {}
      };
      controlledProps.forEach(function (key) {
        /**
         * If a prop switches from controlled to Uncontrolled
         * reset its value to the defaultValue
         */
        nextState.prevProps[key] = props[key];
        if (!Utils.isProp(props, key) && Utils.isProp(prevProps, key)) {
          nextState.values[key] = props[Utils.defaultKey(key)];
        }
      });
      return nextState;
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
      this.unmounted = true;
    };
    _proto.render = function render() {
      var _this2 = this;
      var _this$props2 = this.props,
        innerRef = _this$props2.innerRef,
        props = _objectWithoutPropertiesLoose(_this$props2, ["innerRef"]);
      PROPS_TO_OMIT.forEach(function (prop) {
        delete props[prop];
      });
      var newProps = {};
      controlledProps.forEach(function (propName) {
        var propValue = _this2.props[propName];
        newProps[propName] = propValue !== undefined ? propValue : _this2.state.values[propName];
      });
      return React.createElement(Component, _extends({}, props, newProps, this.handlers, {
        ref: innerRef || this.attachRef
      }));
    };
    return UncontrolledComponent;
  }(React.Component);
  polyfill(UncontrolledComponent);
  UncontrolledComponent.displayName = "Uncontrolled(" + displayName + ")";
  UncontrolledComponent.propTypes = _extends({
    innerRef: function innerRef() {}
  }, Utils.uncontrolledPropTypes(controlledValues, displayName));
  methods.forEach(function (method) {
    UncontrolledComponent.prototype[method] = function $proxiedMethod() {
      var _this$inner;
      return (_this$inner = this.inner)[method].apply(_this$inner, arguments);
    };
  });
  var WrappedComponent = UncontrolledComponent;
  if (React.forwardRef) {
    WrappedComponent = React.forwardRef(function (props, ref) {
      return React.createElement(UncontrolledComponent, _extends({}, props, {
        innerRef: ref,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }));
    });
    WrappedComponent.propTypes = UncontrolledComponent.propTypes;
  }
  WrappedComponent.ControlledComponent = Component;
  /**
   * useful when wrapping a Component and you want to control
   * everything
   */

  WrappedComponent.deferControlTo = function (newComponent, additions, nextMethods) {
    if (additions === void 0) {
      additions = {};
    }
    return uncontrollable(newComponent, _extends({}, controlledValues, additions), nextMethods);
  };
  return WrappedComponent;
}
;// CONCATENATED MODULE: ./node_modules/uncontrollable/lib/esm/index.js


// EXTERNAL MODULE: ./node_modules/react/jsx-dev-runtime.js
var jsx_dev_runtime = __webpack_require__(485);
;// CONCATENATED MODULE: ./src/ThemeProvider.tsx
var ThemeProvider_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ThemeProvider.tsx";




const DEFAULT_BREAKPOINTS = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
const DEFAULT_MIN_BREAKPOINT = 'xs';
const ThemeContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.createContext({
  prefixes: {},
  breakpoints: DEFAULT_BREAKPOINTS,
  minBreakpoint: DEFAULT_MIN_BREAKPOINT
});
const {
  Consumer,
  Provider
} = ThemeContext;
function ThemeProvider({
  prefixes = {},
  breakpoints = DEFAULT_BREAKPOINTS,
  minBreakpoint = DEFAULT_MIN_BREAKPOINT,
  dir,
  children
}) {
  const contextValue = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({
    prefixes: {
      ...prefixes
    },
    breakpoints,
    minBreakpoint,
    dir
  }), [prefixes, breakpoints, minBreakpoint, dir]);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Provider, {
    value: contextValue,
    children: children
  }, void 0, false, {
    fileName: ThemeProvider_jsxFileName,
    lineNumber: 43,
    columnNumber: 10
  }, this);
}
ThemeProvider.propTypes = {
  /**
   * An object mapping of Bootstrap component classes that
   * map to a custom class.
   *
   * **Note: Changing prefixes is an escape hatch and generally
   * shouldn't be used.**
   *
   * For more information, see [here](/getting-started/theming/#prefixing-components).
   */
  prefixes: (prop_types_default()).object,
  /**
   * An array of breakpoints that your application supports.
   * Defaults to the standard Bootstrap breakpoints.
   */
  breakpoints: prop_types_default().arrayOf((prop_types_default()).string),
  /**
   * The minimum breakpoint used by your application.
   * Defaults to the smallest of the standard Bootstrap breakpoints.
   */
  minBreakpoint: (prop_types_default()).string,
  /**
   * Indicates the directionality of the application's text.
   *
   * Use `rtl` to set text as "right to left".
   */
  dir: (prop_types_default()).string
};
function useBootstrapPrefix(prefix, defaultPrefix) {
  const {
    prefixes
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}
function useBootstrapBreakpoints() {
  const {
    breakpoints
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(ThemeContext);
  return breakpoints;
}
function useBootstrapMinBreakpoint() {
  const {
    minBreakpoint
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(ThemeContext);
  return minBreakpoint;
}
function useIsRTL() {
  const {
    dir
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(ThemeContext);
  return dir === 'rtl';
}
function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = {
    prefix: opts
  };
  const isClassy = Component.prototype && Component.prototype.isReactComponent;
  // If it's a functional component make sure we don't break it with a ref
  const {
    prefix,
    forwardRefAs = isClassy ? 'ref' : 'innerRef'
  } = opts;
  const Wrapped = /*#__PURE__*/React.forwardRef(({
    ...props
  }, ref) => {
    props[forwardRefAs] = ref;
    const bsPrefix = useBootstrapPrefix(props.bsPrefix, prefix);
    return /*#__PURE__*/_jsxDEV(Component, {
      ...props,
      bsPrefix: bsPrefix
    }, void 0, false, {
      fileName: ThemeProvider_jsxFileName,
      lineNumber: 111,
      columnNumber: 14
    }, this);
  });
  Wrapped.displayName = `Bootstrap(${Component.displayName || Component.name})`;
  return Wrapped;
}

/* harmony default export */ const src_ThemeProvider = (ThemeProvider);
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/ownerDocument.js
/**
 * Returns the owner document of a given element.
 * 
 * @param node the element
 */
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/ownerWindow.js

/**
 * Returns the owner window of a given element.
 * 
 * @param node the element
 */

function ownerWindow(node) {
  var doc = ownerDocument(node);
  return doc && doc.defaultView || window;
}
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/getComputedStyle.js

/**
 * Returns one or all computed style properties of an element.
 * 
 * @param node the element
 * @param psuedoElement the style property
 */

function getComputedStyle_getComputedStyle(node, psuedoElement) {
  return ownerWindow(node).getComputedStyle(node, psuedoElement);
}
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/hyphenate.js
var rUpper = /([A-Z])/g;
function hyphenate(string) {
  return string.replace(rUpper, '-$1').toLowerCase();
}
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/hyphenateStyle.js
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
 */

var msPattern = /^ms-/;
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/isTransform.js
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function isTransform(value) {
  return !!(value && supportedTransforms.test(value));
}
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/css.js



function style(node, property) {
  var css = '';
  var transforms = '';
  if (typeof property === 'string') {
    return node.style.getPropertyValue(hyphenateStyleName(property)) || getComputedStyle_getComputedStyle(node).getPropertyValue(hyphenateStyleName(property));
  }
  Object.keys(property).forEach(function (key) {
    var value = property[key];
    if (!value && value !== 0) {
      node.style.removeProperty(hyphenateStyleName(key));
    } else if (isTransform(key)) {
      transforms += key + "(" + value + ") ";
    } else {
      css += hyphenateStyleName(key) + ": " + value + ";";
    }
  });
  if (transforms) {
    css += "transform: " + transforms + ";";
  }
  node.style.cssText += ";" + css;
}
/* harmony default export */ const css = (style);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js

function inheritsLoose_inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
// EXTERNAL MODULE: external {"root":"ReactDOM","commonjs2":"react-dom","commonjs":"react-dom","amd":"react-dom"}
var external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_ = __webpack_require__(156);
var external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default = /*#__PURE__*/__webpack_require__.n(external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_);
;// CONCATENATED MODULE: ./node_modules/react-transition-group/esm/config.js
/* harmony default export */ const config = ({
  disabled: false
});
;// CONCATENATED MODULE: ./node_modules/react-transition-group/esm/TransitionGroupContext.js

/* harmony default export */ const TransitionGroupContext = (external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(null));
;// CONCATENATED MODULE: ./node_modules/react-transition-group/esm/utils/reflow.js
var forceReflow = function forceReflow(node) {
  return node.scrollTop;
};
;// CONCATENATED MODULE: ./node_modules/react-transition-group/esm/Transition.js









var UNMOUNTED = 'unmounted';
var EXITED = 'exited';
var ENTERING = 'entering';
var ENTERED = 'entered';
var EXITING = 'exiting';
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 *   exiting:  { opacity: 0 },
 *   exited:  { opacity: 0 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example (we'll use the
 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <Transition in={inProp} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

var Transition = /*#__PURE__*/function (_React$Component) {
  inheritsLoose_inheritsLoose(Transition, _React$Component);
  function Transition(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context; // In the context of a TransitionGroup all enters are really appears

    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;
    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
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
    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }
  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;
    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }
    return null;
  } // getSnapshotBeforeUpdate(prevProps) {
  //   let nextStatus = null
  //   if (prevProps !== this.props) {
  //     const { status } = this.state
  //     if (this.props.in) {
  //       if (status !== ENTERING && status !== ENTERED) {
  //         nextStatus = ENTERING
  //       }
  //     } else {
  //       if (status === ENTERING || status === ENTERED) {
  //         nextStatus = EXITING
  //       }
  //     }
  //   }
  //   return { nextStatus }
  // }
  ;

  var _proto = Transition.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;
    if (prevProps !== this.props) {
      var status = this.state.status;
      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }
    this.updateStatus(false, nextStatus);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };
  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;
    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter; // TODO: remove fallback for next major

      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }
    return {
      exit: exit,
      enter: enter,
      appear: appear
    };
  };
  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }
    if (nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();
      if (nextStatus === ENTERING) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var node = this.props.nodeRef ? this.props.nodeRef.current : external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().findDOMNode(this); // https://github.com/reactjs/react-transition-group/pull/749
          // With unmountOnExit or mountOnEnter, the enter animation should happen at the transition between `exited` and `entering`.
          // To make the animation happen,  we have to separate each rendering and avoid being processed as batched.

          if (node) forceReflow(node);
        }
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };
  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;
    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;
    var _ref2 = this.props.nodeRef ? [appearing] : [external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().findDOMNode(this), appearing],
      maybeNode = _ref2[0],
      maybeAppearing = _ref2[1];
    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set

    if (!mounting && !enter || config.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function () {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }
    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function () {
      _this2.props.onEntering(maybeNode, maybeAppearing);
      _this2.onTransitionEnd(enterTimeout, function () {
        _this2.safeSetState({
          status: ENTERED
        }, function () {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };
  _proto.performExit = function performExit() {
    var _this3 = this;
    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? undefined : external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().findDOMNode(this); // no exit animation skip right to EXITED

    if (!exit || config.disabled) {
      this.safeSetState({
        status: EXITED
      }, function () {
        _this3.props.onExited(maybeNode);
      });
      return;
    }
    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function () {
      _this3.props.onExiting(maybeNode);
      _this3.onTransitionEnd(timeouts.exit, function () {
        _this3.safeSetState({
          status: EXITED
        }, function () {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };
  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  _proto.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };
  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;
    var active = true;
    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };
    this.nextCallback.cancel = function () {
      active = false;
    };
    return this.nextCallback;
  };
  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback],
        maybeNode = _ref3[0],
        maybeNextCallback = _ref3[1];
      this.props.addEndListener(maybeNode, maybeNextCallback);
    }
    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };
  _proto.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }
    var _this$props = this.props,
      children = _this$props.children,
      _in = _this$props.in,
      _mountOnEnter = _this$props.mountOnEnter,
      _unmountOnExit = _this$props.unmountOnExit,
      _appear = _this$props.appear,
      _enter = _this$props.enter,
      _exit = _this$props.exit,
      _timeout = _this$props.timeout,
      _addEndListener = _this$props.addEndListener,
      _onEnter = _this$props.onEnter,
      _onEntering = _this$props.onEntering,
      _onEntered = _this$props.onEntered,
      _onExit = _this$props.onExit,
      _onExiting = _this$props.onExiting,
      _onExited = _this$props.onExited,
      _nodeRef = _this$props.nodeRef,
      childProps = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return /*#__PURE__*/(
      // allows for nested Transitions
      external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(TransitionGroupContext.Provider, {
        value: null
      }, typeof children === 'function' ? children(status, childProps) : external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.only(children), childProps))
    );
  };
  return Transition;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);
Transition.contextType = TransitionGroupContext;
Transition.propTypes =  false ? 0 : {}; // Name the function so it is clearer in the documentation

function Transition_noop() {}
Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: Transition_noop,
  onEntering: Transition_noop,
  onEntered: Transition_noop,
  onExit: Transition_noop,
  onExiting: Transition_noop,
  onExited: Transition_noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
/* harmony default export */ const esm_Transition = (Transition);
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/canUseDOM.js
/* harmony default export */ const canUseDOM = (!!(typeof window !== 'undefined' && window.document && window.document.createElement));
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/addEventListener.js
/* eslint-disable no-return-assign */

var optionsSupported = false;
var onceSupported = false;
try {
  var options = {
    get passive() {
      return optionsSupported = true;
    },
    get once() {
      // eslint-disable-next-line no-multi-assign
      return onceSupported = optionsSupported = true;
    }
  };
  if (canUseDOM) {
    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, true);
  }
} catch (e) {
  /* */
}

/**
 * An `addEventListener` ponyfill, supports the `once` option
 * 
 * @param node the element
 * @param eventName the event name
 * @param handle the handler
 * @param options event options
 */
function addEventListener(node, eventName, handler, options) {
  if (options && typeof options !== 'boolean' && !onceSupported) {
    var once = options.once,
      capture = options.capture;
    var wrappedHandler = handler;
    if (!onceSupported && once) {
      wrappedHandler = handler.__once || function onceHandler(event) {
        this.removeEventListener(eventName, onceHandler, capture);
        handler.call(this, event);
      };
      handler.__once = wrappedHandler;
    }
    node.addEventListener(eventName, wrappedHandler, optionsSupported ? options : capture);
  }
  node.addEventListener(eventName, handler, options);
}
/* harmony default export */ const esm_addEventListener = (addEventListener);
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/removeEventListener.js
/**
 * A `removeEventListener` ponyfill
 * 
 * @param node the element
 * @param eventName the event name
 * @param handle the handler
 * @param options event options
 */
function removeEventListener(node, eventName, handler, options) {
  var capture = options && typeof options !== 'boolean' ? options.capture : options;
  node.removeEventListener(eventName, handler, capture);
  if (handler.__once) {
    node.removeEventListener(eventName, handler.__once, capture);
  }
}
/* harmony default export */ const esm_removeEventListener = (removeEventListener);
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/listen.js


function listen(node, eventName, handler, options) {
  esm_addEventListener(node, eventName, handler, options);
  return function () {
    esm_removeEventListener(node, eventName, handler, options);
  };
}
/* harmony default export */ const esm_listen = (listen);
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/triggerEvent.js
/**
 * Triggers an event on a given element.
 * 
 * @param node the element
 * @param eventName the event name to trigger
 * @param bubbles whether the event should bubble up
 * @param cancelable whether the event should be cancelable
 */
function triggerEvent(node, eventName, bubbles, cancelable) {
  if (bubbles === void 0) {
    bubbles = false;
  }
  if (cancelable === void 0) {
    cancelable = true;
  }
  if (node) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, bubbles, cancelable);
    node.dispatchEvent(event);
  }
}
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/transitionEnd.js



function parseDuration(node) {
  var str = css(node, 'transitionDuration') || '';
  var mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}
function emulateTransitionEnd(element, duration, padding) {
  if (padding === void 0) {
    padding = 5;
  }
  var called = false;
  var handle = setTimeout(function () {
    if (!called) triggerEvent(element, 'transitionend', true);
  }, duration + padding);
  var remove = esm_listen(element, 'transitionend', function () {
    called = true;
  }, {
    once: true
  });
  return function () {
    clearTimeout(handle);
    remove();
  };
}
function transitionEnd(element, handler, duration, padding) {
  if (duration == null) duration = parseDuration(element) || 0;
  var removeEmulate = emulateTransitionEnd(element, duration, padding);
  var remove = esm_listen(element, 'transitionend', handler);
  return function () {
    removeEmulate();
    remove();
  };
}
;// CONCATENATED MODULE: ./src/transitionEndListener.ts


function transitionEndListener_parseDuration(node, property) {
  const str = css(node, property) || '';
  const mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}
function transitionEndListener(element, handler) {
  const duration = transitionEndListener_parseDuration(element, 'transitionDuration');
  const delay = transitionEndListener_parseDuration(element, 'transitionDelay');
  const remove = transitionEnd(element, e => {
    if (e.target === element) {
      remove();
      handler(e);
    }
  }, duration + delay);
}
;// CONCATENATED MODULE: ./src/createChainedFunction.tsx
/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction(...funcs) {
  return funcs.filter(f => f != null).reduce((acc, f) => {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }
    if (acc === null) return f;
    return function chainedFunction(...args) {
      // @ts-ignore
      acc.apply(this, args);
      // @ts-ignore
      f.apply(this, args);
    };
  }, null);
}
/* harmony default export */ const src_createChainedFunction = (createChainedFunction);
;// CONCATENATED MODULE: ./src/triggerBrowserReflow.tsx
// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
function triggerBrowserReflow(node) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  node.offsetHeight;
}
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useMergedRefs.js

var toFnRef = function toFnRef(ref) {
  return !ref || typeof ref === 'function' ? ref : function (value) {
    ref.current = value;
  };
};
function mergeRefs(refA, refB) {
  var a = toFnRef(refA);
  var b = toFnRef(refB);
  return function (value) {
    if (a) a(value);
    if (b) b(value);
  };
}
/**
 * Create and returns a single callback ref composed from two other Refs.
 *
 * ```tsx
 * const Button = React.forwardRef((props, ref) => {
 *   const [element, attachRef] = useCallbackRef<HTMLButtonElement>();
 *   const mergedRef = useMergedRefs(ref, attachRef);
 *
 *   return <button ref={mergedRef} {...props}/>
 * })
 * ```
 *
 * @param refA A Callback or mutable Ref
 * @param refB A Callback or mutable Ref
 * @category refs
 */

function useMergedRefs(refA, refB) {
  return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return mergeRefs(refA, refB);
  }, [refA, refB]);
}
/* harmony default export */ const esm_useMergedRefs = (useMergedRefs);
;// CONCATENATED MODULE: ./src/safeFindDOMNode.ts

function safeFindDOMNode(componentOrElement) {
  if (componentOrElement && 'setState' in componentOrElement) {
    return external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().findDOMNode(componentOrElement);
  }
  return componentOrElement != null ? componentOrElement : null;
}
;// CONCATENATED MODULE: ./src/TransitionWrapper.tsx
var TransitionWrapper_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/TransitionWrapper.tsx";





// Normalizes Transition callbacks when nodeRef is used.
const TransitionWrapper = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(({
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  addEndListener,
  children,
  childRef,
  ...props
}, ref) => {
  const nodeRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  const mergedRef = esm_useMergedRefs(nodeRef, childRef);
  const attachRef = r => {
    mergedRef(safeFindDOMNode(r));
  };
  const normalize = callback => param => {
    if (callback && nodeRef.current) {
      callback(nodeRef.current, param);
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleEnter = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(normalize(onEnter), [onEnter]);
  const handleEntering = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(normalize(onEntering), [onEntering]);
  const handleEntered = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(normalize(onEntered), [onEntered]);
  const handleExit = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(normalize(onExit), [onExit]);
  const handleExiting = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(normalize(onExiting), [onExiting]);
  const handleExited = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(normalize(onExited), [onExited]);
  const handleAddEndListener = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(normalize(addEndListener), [addEndListener]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(esm_Transition, {
    ref: ref,
    ...props,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    nodeRef: nodeRef,
    children: typeof children === 'function' ? (status, innerProps) =>
    // TODO: Types for RTG missing innerProps, so need to cast.
    children(status, {
      ...innerProps,
      ref: attachRef
    }) : /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(children, {
      ref: attachRef
    })
  }, void 0, false, {
    fileName: TransitionWrapper_jsxFileName,
    lineNumber: 66,
    columnNumber: 7
  }, undefined);
});
/* harmony default export */ const src_TransitionWrapper = (TransitionWrapper);
;// CONCATENATED MODULE: ./src/Collapse.tsx
var Collapse_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Collapse.tsx";










const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};
function getDefaultDimensionValue(dimension, elem) {
  const offset = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}`;
  const value = elem[offset];
  const margins = MARGINS[dimension];
  return value +
  // @ts-ignore
  parseInt(css(elem, margins[0]), 10) +
  // @ts-ignore
  parseInt(css(elem, margins[1]), 10);
}
const collapseStyles = {
  [EXITED]: 'collapse',
  [EXITING]: 'collapsing',
  [ENTERING]: 'collapsing',
  [ENTERED]: 'collapse show'
};
const propTypes = {
  /**
   * Show the component; triggers the expand or collapse animation
   */
  in: (prop_types_default()).bool,
  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: (prop_types_default()).bool,
  /**
   * Unmount the component (remove it from the DOM) when it is collapsed
   */
  unmountOnExit: (prop_types_default()).bool,
  /**
   * Run the expand animation when the component mounts, if it is initially
   * shown
   */
  appear: (prop_types_default()).bool,
  /**
   * Duration of the collapse animation in milliseconds, to ensure that
   * finishing callbacks are fired even if the original browser transition end
   * events are canceled
   */
  timeout: (prop_types_default()).number,
  /**
   * Callback fired before the component expands
   */
  onEnter: (prop_types_default()).func,
  /**
   * Callback fired after the component starts to expand
   */
  onEntering: (prop_types_default()).func,
  /**
   * Callback fired after the component has expanded
   */
  onEntered: (prop_types_default()).func,
  /**
   * Callback fired before the component collapses
   */
  onExit: (prop_types_default()).func,
  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: (prop_types_default()).func,
  /**
   * Callback fired after the component has collapsed
   */
  onExited: (prop_types_default()).func,
  /**
   * The dimension used when collapsing, or a function that returns the
   * dimension
   */
  dimension: prop_types_default().oneOfType([prop_types_default().oneOf(['height', 'width']), (prop_types_default()).func]),
  /**
   * Function that returns the height or width of the animating DOM node
   *
   * Allows for providing some custom logic for how much the Collapse component
   * should animate in its specified dimension. Called with the current
   * dimension prop value and the DOM node.
   *
   * @default element.offsetWidth | element.offsetHeight
   */
  getDimensionValue: (prop_types_default()).func,
  /**
   * ARIA role of collapsible element
   */
  role: (prop_types_default()).string,
  /**
   * You must provide a single JSX child element to this component and that element cannot be a \<React.Fragment\>
   */
  children: (prop_types_default()).element.isRequired
};
const Collapse = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(({
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  className,
  children,
  dimension = 'height',
  in: inProp = false,
  timeout = 300,
  mountOnEnter = false,
  unmountOnExit = false,
  appear = false,
  getDimensionValue = getDefaultDimensionValue,
  ...props
}, ref) => {
  /* Compute dimension */
  const computedDimension = typeof dimension === 'function' ? dimension() : dimension;

  /* -- Expanding -- */
  const handleEnter = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => src_createChainedFunction(elem => {
    elem.style[computedDimension] = '0';
  }, onEnter), [computedDimension, onEnter]);
  const handleEntering = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => src_createChainedFunction(elem => {
    const scroll = `scroll${computedDimension[0].toUpperCase()}${computedDimension.slice(1)}`;
    elem.style[computedDimension] = `${elem[scroll]}px`;
  }, onEntering), [computedDimension, onEntering]);
  const handleEntered = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => src_createChainedFunction(elem => {
    elem.style[computedDimension] = null;
  }, onEntered), [computedDimension, onEntered]);

  /* -- Collapsing -- */
  const handleExit = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => src_createChainedFunction(elem => {
    elem.style[computedDimension] = `${getDimensionValue(computedDimension, elem)}px`;
    triggerBrowserReflow(elem);
  }, onExit), [onExit, getDimensionValue, computedDimension]);
  const handleExiting = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => src_createChainedFunction(elem => {
    elem.style[computedDimension] = null;
  }, onExiting), [computedDimension, onExiting]);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_TransitionWrapper, {
    ref: ref,
    addEndListener: transitionEndListener,
    ...props,
    "aria-expanded": props.role ? inProp : null,
    onEnter: handleEnter,
    onEntering: handleEntering,
    onEntered: handleEntered,
    onExit: handleExit,
    onExiting: handleExiting,
    childRef: children.ref,
    in: inProp,
    timeout: timeout,
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit,
    appear: appear,
    children: (state, innerProps) => /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(children, {
      ...innerProps,
      className: classnames_default()(className, children.props.className, collapseStyles[state], computedDimension === 'width' && 'collapse-horizontal')
    })
  }, void 0, false, {
    fileName: Collapse_jsxFileName,
    lineNumber: 222,
    columnNumber: 7
  }, undefined);
});

// @ts-ignore
Collapse.propTypes = propTypes;
/* harmony default export */ const src_Collapse = (Collapse);
;// CONCATENATED MODULE: ./src/AccordionContext.ts

function isAccordionItemSelected(activeEventKey, eventKey) {
  return Array.isArray(activeEventKey) ? activeEventKey.includes(eventKey) : activeEventKey === eventKey;
}
const context = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.createContext({});
context.displayName = 'AccordionContext';
/* harmony default export */ const AccordionContext = (context);
;// CONCATENATED MODULE: ./src/AccordionCollapse.tsx
var AccordionCollapse_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/AccordionCollapse.tsx";








const AccordionCollapse_propTypes = {
  /** Set a custom element for this component */
  as: (prop_types_default()).elementType,
  /**
   * A key that corresponds to the toggler that triggers this collapse's expand or collapse.
   */
  eventKey: (prop_types_default()).string.isRequired,
  /** Children prop should only contain a single child, and is enforced as such */
  children: (prop_types_default()).element.isRequired
};

/**
 * This component accepts all of [`Collapse`'s props](/docs/utilities/transitions#collapse-1).
 */
const AccordionCollapse = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  as: Component = 'div',
  bsPrefix,
  className,
  children,
  eventKey,
  ...props
}, ref) => {
  const {
    activeEventKey
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(AccordionContext);
  bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-collapse');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Collapse, {
    ref: ref,
    in: isAccordionItemSelected(activeEventKey, eventKey),
    ...props,
    className: classnames_default()(className, bsPrefix),
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
      children: external_root_React_commonjs2_react_commonjs_react_amd_react_.Children.only(children)
    }, void 0, false, {
      fileName: AccordionCollapse_jsxFileName,
      lineNumber: 56,
      columnNumber: 9
    }, undefined)
  }, void 0, false, {
    fileName: AccordionCollapse_jsxFileName,
    lineNumber: 50,
    columnNumber: 7
  }, undefined);
});
AccordionCollapse.propTypes = AccordionCollapse_propTypes;
AccordionCollapse.displayName = 'AccordionCollapse';
/* harmony default export */ const src_AccordionCollapse = (AccordionCollapse);
;// CONCATENATED MODULE: ./src/AccordionItemContext.ts

const AccordionItemContext_context = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.createContext({
  eventKey: ''
});
AccordionItemContext_context.displayName = 'AccordionItemContext';
/* harmony default export */ const AccordionItemContext = (AccordionItemContext_context);
;// CONCATENATED MODULE: ./src/AccordionBody.tsx
var AccordionBody_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/AccordionBody.tsx";








const AccordionBody_propTypes = {
  /** Set a custom element for this component */
  as: (prop_types_default()).elementType,
  /** @default 'accordion-body' */
  bsPrefix: (prop_types_default()).string,
  /**
   * Callback fired before the component expands
   */
  onEnter: (prop_types_default()).func,
  /**
   * Callback fired after the component starts to expand
   */
  onEntering: (prop_types_default()).func,
  /**
   * Callback fired after the component has expanded
   */
  onEntered: (prop_types_default()).func,
  /**
   * Callback fired before the component collapses
   */
  onExit: (prop_types_default()).func,
  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: (prop_types_default()).func,
  /**
   * Callback fired after the component has collapsed
   */
  onExited: (prop_types_default()).func
};
const AccordionBody = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  bsPrefix,
  className,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-body');
  const {
    eventKey
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(AccordionItemContext);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_AccordionCollapse, {
    eventKey: eventKey,
    onEnter: onEnter,
    onEntering: onEntering,
    onEntered: onEntered,
    onExit: onExit,
    onExiting: onExiting,
    onExited: onExited,
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
      ref: ref,
      ...props,
      className: classnames_default()(className, bsPrefix)
    }, void 0, false, {
      fileName: AccordionBody_jsxFileName,
      lineNumber: 80,
      columnNumber: 11
    }, undefined)
  }, void 0, false, {
    fileName: AccordionBody_jsxFileName,
    lineNumber: 71,
    columnNumber: 9
  }, undefined);
});
AccordionBody.propTypes = AccordionBody_propTypes;
AccordionBody.displayName = 'AccordionBody';
/* harmony default export */ const src_AccordionBody = (AccordionBody);
;// CONCATENATED MODULE: ./src/AccordionButton.tsx
var AccordionButton_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/AccordionButton.tsx";








const AccordionButton_propTypes = {
  /** Set a custom element for this component */
  as: (prop_types_default()).elementType,
  /** @default 'accordion-button' */
  bsPrefix: (prop_types_default()).string,
  /** A callback function for when this component is clicked */
  onClick: (prop_types_default()).func
};
function useAccordionButton(eventKey, onClick) {
  const {
    activeEventKey,
    onSelect,
    alwaysOpen
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(AccordionContext);
  return e => {
    /*
      Compare the event key in context with the given event key.
      If they are the same, then collapse the component.
    */
    let eventKeyPassed = eventKey === activeEventKey ? null : eventKey;
    if (alwaysOpen) {
      if (Array.isArray(activeEventKey)) {
        if (activeEventKey.includes(eventKey)) {
          eventKeyPassed = activeEventKey.filter(k => k !== eventKey);
        } else {
          eventKeyPassed = [...activeEventKey, eventKey];
        }
      } else {
        // activeEventKey is undefined.
        eventKeyPassed = [eventKey];
      }
    }
    onSelect == null ? void 0 : onSelect(eventKeyPassed, e);
    onClick == null ? void 0 : onClick(e);
  };
}
const AccordionButton = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'button',
  bsPrefix,
  className,
  onClick,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-button');
  const {
    eventKey
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(AccordionItemContext);
  const accordionOnClick = useAccordionButton(eventKey, onClick);
  const {
    activeEventKey
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(AccordionContext);
  if (Component === 'button') {
    props.type = 'button';
  }
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    onClick: accordionOnClick,
    ...props,
    "aria-expanded": Array.isArray(activeEventKey) ? activeEventKey.includes(eventKey) : eventKey === activeEventKey,
    className: classnames_default()(className, bsPrefix, !isAccordionItemSelected(activeEventKey, eventKey) && 'collapsed')
  }, void 0, false, {
    fileName: AccordionButton_jsxFileName,
    lineNumber: 86,
    columnNumber: 7
  }, undefined);
});
AccordionButton.propTypes = AccordionButton_propTypes;
AccordionButton.displayName = 'AccordionButton';
/* harmony default export */ const src_AccordionButton = (AccordionButton);
;// CONCATENATED MODULE: ./src/AccordionHeader.tsx
var AccordionHeader_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/AccordionHeader.tsx";






const AccordionHeader_propTypes = {
  /** Set a custom element for this component */
  as: (prop_types_default()).elementType,
  /** @default 'accordion-header' */
  bsPrefix: (prop_types_default()).string,
  /** Click handler for the `AccordionButton` element */
  onClick: (prop_types_default()).func
};
const AccordionHeader = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'h2',
  bsPrefix,
  className,
  children,
  onClick,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-header');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    ...props,
    className: classnames_default()(className, bsPrefix),
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_AccordionButton, {
      onClick: onClick,
      children: children
    }, void 0, false, {
      fileName: AccordionHeader_jsxFileName,
      lineNumber: 47,
      columnNumber: 9
    }, undefined)
  }, void 0, false, {
    fileName: AccordionHeader_jsxFileName,
    lineNumber: 42,
    columnNumber: 7
  }, undefined);
});
AccordionHeader.propTypes = AccordionHeader_propTypes;
AccordionHeader.displayName = 'AccordionHeader';
/* harmony default export */ const src_AccordionHeader = (AccordionHeader);
;// CONCATENATED MODULE: ./src/AccordionItem.tsx
var AccordionItem_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/AccordionItem.tsx";







const AccordionItem_propTypes = {
  /** Set a custom element for this component */
  as: (prop_types_default()).elementType,
  /** @default 'accordion-item' */
  bsPrefix: (prop_types_default()).string,
  /**
   * A unique key used to control this item's collapse/expand.
   * @required
   */
  eventKey: (prop_types_default()).string.isRequired
};
const AccordionItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  bsPrefix,
  className,
  eventKey,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-item');
  const contextValue = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({
    eventKey
  }), [eventKey]);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(AccordionItemContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
      ref: ref,
      ...props,
      className: classnames_default()(className, bsPrefix)
    }, void 0, false, {
      fileName: AccordionItem_jsxFileName,
      lineNumber: 54,
      columnNumber: 11
    }, undefined)
  }, void 0, false, {
    fileName: AccordionItem_jsxFileName,
    lineNumber: 53,
    columnNumber: 9
  }, undefined);
});
AccordionItem.propTypes = AccordionItem_propTypes;
AccordionItem.displayName = 'AccordionItem';
/* harmony default export */ const src_AccordionItem = (AccordionItem);
;// CONCATENATED MODULE: ./src/Accordion.tsx
var Accordion_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Accordion.tsx";













const Accordion_propTypes = {
  /** Set a custom element for this component */
  as: (prop_types_default()).elementType,
  /** @default 'accordion' */
  bsPrefix: (prop_types_default()).string,
  /** The current active key that corresponds to the currently expanded card */
  activeKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).array]),
  /** The default active key that is expanded on start */
  defaultActiveKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).array]),
  /**
   * Callback fired when the active item changes.
   *
   * ```js
   * (eventKey: string | string[] | null, event: Object) => void
   * ```
   *
   * @controllable activeIndex
   */
  onSelect: (prop_types_default()).func,
  /** Renders accordion edge-to-edge with its parent container */
  flush: (prop_types_default()).bool,
  /** Allow accordion items to stay open when another item is opened */
  alwaysOpen: (prop_types_default()).bool
};
const Accordion = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((props, ref) => {
  const {
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    activeKey,
    bsPrefix,
    className,
    onSelect,
    flush,
    alwaysOpen,
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect'
  });
  const prefix = useBootstrapPrefix(bsPrefix, 'accordion');
  const contextValue = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({
    activeEventKey: activeKey,
    onSelect,
    alwaysOpen
  }), [activeKey, onSelect, alwaysOpen]);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(AccordionContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
      ref: ref,
      ...controlledProps,
      className: classnames_default()(className, prefix, flush && `${prefix}-flush`)
    }, void 0, false, {
      fileName: Accordion_jsxFileName,
      lineNumber: 87,
      columnNumber: 9
    }, undefined)
  }, void 0, false, {
    fileName: Accordion_jsxFileName,
    lineNumber: 86,
    columnNumber: 7
  }, undefined);
});
Accordion.displayName = 'Accordion';
Accordion.propTypes = Accordion_propTypes;
/* harmony default export */ const src_Accordion = (Object.assign(Accordion, {
  Button: src_AccordionButton,
  Collapse: src_AccordionCollapse,
  Item: src_AccordionItem,
  Header: src_AccordionHeader,
  Body: src_AccordionBody
}));
// EXTERNAL MODULE: ./node_modules/prop-types-extra/lib/index.js
var lib = __webpack_require__(517);
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useCommittedRef.js

/**
 * Creates a `Ref` whose value is updated in an effect, ensuring the most recent
 * value is the one rendered with. Generally only required for Concurrent mode usage
 * where previous work in `render()` may be discarded before being used.
 *
 * This is safe to access in an event handler.
 *
 * @param value The `Ref` value
 */

function useCommittedRef_useCommittedRef(value) {
  var ref = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(value);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    ref.current = value;
  }, [value]);
  return ref;
}
/* harmony default export */ const esm_useCommittedRef = (useCommittedRef_useCommittedRef);
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useEventCallback.js


function useEventCallback(fn) {
  var ref = esm_useCommittedRef(fn);
  return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    return ref.current && ref.current.apply(ref, arguments);
  }, [ref]);
}
;// CONCATENATED MODULE: ./src/divWithClassName.tsx
var divWithClassName_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/divWithClassName.tsx";



/* harmony default export */ const divWithClassName = (className => /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((p, ref) => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
  ...p,
  ref: ref,
  className: classnames_default()(p.className, className)
}, void 0, false, {
  fileName: divWithClassName_jsxFileName,
  lineNumber: 6,
  columnNumber: 5
}, undefined)));
;// CONCATENATED MODULE: ./src/AlertHeading.tsx
var AlertHeading_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/AlertHeading.tsx";





const DivStyledAsH4 = divWithClassName('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';
const AlertHeading = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH4,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'alert-heading');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: AlertHeading_jsxFileName,
    lineNumber: 19,
    columnNumber: 9
  }, undefined);
});
AlertHeading.displayName = 'AlertHeading';
/* harmony default export */ const src_AlertHeading = (AlertHeading);
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useCallbackRef.js

/**
 * A convenience hook around `useState` designed to be paired with
 * the component [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) api.
 * Callback refs are useful over `useRef()` when you need to respond to the ref being set
 * instead of lazily accessing it in an effect.
 *
 * ```ts
 * const [element, attachRef] = useCallbackRef<HTMLDivElement>()
 *
 * useEffect(() => {
 *   if (!element) return
 *
 *   const calendar = new FullCalendar.Calendar(element)
 *
 *   return () => {
 *     calendar.destroy()
 *   }
 * }, [element])
 *
 * return <div ref={attachRef} />
 * ```
 *
 * @category refs
 */

function useCallbackRef() {
  return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(null);
}
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useEventListener.js



/**
 * Attaches an event handler outside directly to specified DOM element
 * bypassing the react synthetic event system.
 *
 * @param element The target to listen for events on
 * @param event The DOM event name
 * @param handler An event handler
 * @param capture Whether or not to listen during the capture event phase
 */
function useEventListener_useEventListener(eventTarget, event, listener, capture) {
  if (capture === void 0) {
    capture = false;
  }
  var handler = useEventCallback(listener);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    var target = typeof eventTarget === 'function' ? eventTarget() : eventTarget;
    target.addEventListener(event, handler, capture);
    return function () {
      return target.removeEventListener(event, handler, capture);
    };
  }, [eventTarget]);
}
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useGlobalListener.js



/**
 * Attaches an event handler outside directly to the `document`,
 * bypassing the react synthetic event system.
 *
 * ```ts
 * useGlobalListener('keydown', (event) => {
 *  console.log(event.key)
 * })
 * ```
 *
 * @param event The DOM event name
 * @param handler An event handler
 * @param capture Whether or not to listen during the capture event phase
 */
function useGlobalListener(event, handler, capture) {
  if (capture === void 0) {
    capture = false;
  }
  var documentTarget = useCallback(function () {
    return document;
  }, []);
  return useEventListener(documentTarget, event, handler, capture);
}
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useInterval.js


/**
 * Creates a `setInterval` that is properly cleaned up when a component unmounted
 *
 * ```tsx
 *  function Timer() {
 *    const [timer, setTimer] = useState(0)
 *    useInterval(() => setTimer(i => i + 1), 1000)
 *
 *    return <span>{timer} seconds past</span>
 *  }
 * ```
 *
 * @param fn an function run on each interval
 * @param ms The milliseconds duration of the interval
 */

function useInterval(fn, ms, paused, runImmediately) {
  if (paused === void 0) {
    paused = false;
  }
  if (runImmediately === void 0) {
    runImmediately = false;
  }
  var handle;
  var fnRef = useCommittedRef(fn); // this ref is necessary b/c useEffect will sometimes miss a paused toggle
  // orphaning a setTimeout chain in the aether, so relying on it's refresh logic is not reliable.

  var pausedRef = useCommittedRef(paused);
  var tick = function tick() {
    if (pausedRef.current) return;
    fnRef.current();
    schedule(); // eslint-disable-line no-use-before-define
  };

  var schedule = function schedule() {
    clearTimeout(handle);
    handle = setTimeout(tick, ms);
  };
  useEffect(function () {
    if (runImmediately) {
      tick();
    } else {
      schedule();
    }
    return function () {
      return clearTimeout(handle);
    };
  }, [paused, runImmediately]);
}
/* harmony default export */ const esm_useInterval = ((/* unused pure expression or super */ null && (useInterval)));
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useRafInterval.js


function useRafInterval(fn, ms, paused) {
  if (paused === void 0) {
    paused = false;
  }
  var handle;
  var start = new Date().getTime();
  var fnRef = useCommittedRef(fn); // this ref is necessary b/c useEffect will sometimes miss a paused toggle
  // orphaning a setTimeout chain in the aether, so relying on it's refresh logic is not reliable.

  var pausedRef = useCommittedRef(paused);
  function loop() {
    var current = new Date().getTime();
    var delta = current - start;
    if (pausedRef.current) return;
    if (delta >= ms && fnRef.current) {
      fnRef.current();
      start = new Date().getTime();
    }
    cancelAnimationFrame(handle);
    handle = requestAnimationFrame(loop);
  }
  useEffect(function () {
    handle = requestAnimationFrame(loop);
    return function () {
      return cancelAnimationFrame(handle);
    };
  }, []);
}
/* harmony default export */ const esm_useRafInterval = ((/* unused pure expression or super */ null && (useRafInterval)));
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useMergeState.js
function useMergeState_extends() {
  useMergeState_extends = Object.assign || function (target) {
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
  return useMergeState_extends.apply(this, arguments);
}


/**
 * Mimics a React class component's state model, of having a single unified
 * `state` object and an updater that merges updates into the existing state, as
 * opposed to replacing it.
 *
 * ```js
 * const [state, setState] = useMergeState({ name: 'Betsy', age: 24 })
 *
 * setState({ name: 'Johan' }) // { name: 'Johan', age: 24 }
 *
 * setState(state => ({ age: state.age + 10 })) // { name: 'Johan', age: 34 }
 * ```
 *
 * @param initialState The initial state object
 */
function useMergeState_useMergeState(initialState) {
  var _useState = useState(initialState),
    state = _useState[0],
    setState = _useState[1];
  var updater = useCallback(function (update) {
    if (update === null) return;
    if (typeof update === 'function') {
      setState(function (state) {
        var nextState = update(state);
        return nextState == null ? state : useMergeState_extends({}, state, nextState);
      });
    } else {
      setState(function (state) {
        return useMergeState_extends({}, state, update);
      });
    }
  }, [setState]);
  return [state, updater];
}
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useMergeStateFromProps.js

function useMergeStateFromProps(props, gDSFP, initialState) {
  var _useMergeState = useMergeState(initialState),
    state = _useMergeState[0],
    setState = _useMergeState[1];
  var nextState = gDSFP(props, state);
  if (nextState !== null) setState(nextState);
  return [state, setState];
}
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useMounted.js

/**
 * Track whether a component is current mounted. Generally less preferable than
 * properlly canceling effects so they don't run after a component is unmounted,
 * but helpful in cases where that isn't feasible, such as a `Promise` resolution.
 *
 * @returns a function that returns the current isMounted state of the component
 *
 * ```ts
 * const [data, setData] = useState(null)
 * const isMounted = useMounted()
 *
 * useEffect(() => {
 *   fetchdata().then((newData) => {
 *      if (isMounted()) {
 *        setData(newData);
 *      }
 *   })
 * })
 * ```
 */

function useMounted() {
  var mounted = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(true);
  var isMounted = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(function () {
    return mounted.current;
  });
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    mounted.current = true;
    return function () {
      mounted.current = false;
    };
  }, []);
  return isMounted.current;
}
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/usePrevious.js

/**
 * Store the last of some value. Tracked via a `Ref` only updating it
 * after the component renders.
 *
 * Helpful if you need to compare a prop value to it's previous value during render.
 *
 * ```ts
 * function Component(props) {
 *   const lastProps = usePrevious(props)
 *
 *   if (lastProps.foo !== props.foo)
 *     resetValueFromProps(props.foo)
 * }
 * ```
 *
 * @param value the value to track
 */

function usePrevious(value) {
  var ref = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    ref.current = value;
  });
  return ref.current;
}
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useImage.js


/**
 * Fetch and load an image for programatic use such as in a `<canvas>` element.
 *
 * @param imageOrUrl The `HtmlImageElement` or image url to load
 * @param crossOrigin The `crossorigin` attribute to set
 *
 * ```ts
 * const { image, error } = useImage('/static/kittens.png')
 * const ref = useRef<HTMLCanvasElement>()
 *
 * useEffect(() => {
 *   const ctx = ref.current.getContext('2d')
 *
 *   if (image) {
 *     ctx.drawImage(image, 0, 0)
 *   }
 * }, [ref, image])
 *
 * return (
 *   <>
 *     {error && "there was a problem loading the image"}
 *     <canvas ref={ref} />
 *   </>
 * ```
 */
function useImage(imageOrUrl, crossOrigin) {
  var _useState = useState({
      image: null,
      error: null
    }),
    state = _useState[0],
    setState = _useState[1];
  useEffect(function () {
    if (!imageOrUrl) return undefined;
    var image;
    if (typeof imageOrUrl === 'string') {
      image = new Image();
      if (crossOrigin) image.crossOrigin = crossOrigin;
      image.src = imageOrUrl;
    } else {
      image = imageOrUrl;
      if (image.complete && image.naturalHeight > 0) {
        setState({
          image: image,
          error: null
        });
        return;
      }
    }
    function onLoad() {
      setState({
        image: image,
        error: null
      });
    }
    function onError(error) {
      setState({
        image: image,
        error: error
      });
    }
    image.addEventListener('load', onLoad);
    image.addEventListener('error', onError);
    return function () {
      image.removeEventListener('load', onLoad);
      image.removeEventListener('error', onError);
    };
  }, [imageOrUrl, crossOrigin]);
  return state;
}
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useIsomorphicEffect.js

var isReactNative = typeof __webpack_require__.g !== 'undefined' &&
// @ts-ignore
__webpack_require__.g.navigator &&
// @ts-ignore
__webpack_require__.g.navigator.product === 'ReactNative';
var isDOM = typeof document !== 'undefined';
/**
 * Is `useLayoutEffect` in a DOM or React Native environment, otherwise resolves to useEffect
 * Only useful to avoid the console warning.
 *
 * PREFER `useEffect` UNLESS YOU KNOW WHAT YOU ARE DOING.
 *
 * @category effects
 */

/* harmony default export */ const useIsomorphicEffect = (isDOM || isReactNative ? external_root_React_commonjs2_react_commonjs_react_amd_react_.useLayoutEffect : external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect);
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useResizeObserver.js


var targetMap = new WeakMap();
var resizeObserver;
function getResizeObserver() {
  // eslint-disable-next-line no-return-assign
  return resizeObserver = resizeObserver || new window.ResizeObserver(function (entries) {
    entries.forEach(function (entry) {
      var handler = targetMap.get(entry.target);
      if (handler) handler(entry.contentRect);
    });
  });
}
/**
 * Efficiently observe size changes on an element. Depends on the `ResizeObserver` api,
 * and polyfills are needed in older browsers.
 *
 * ```ts
 * const [ref, attachRef] = useCallbackRef(null);
 *
 * const rect = useResizeObserver(ref);
 *
 * return (
 *  <div ref={attachRef}>
 *    {JSON.stringify(rect)}
 *  </div>
 * )
 * ```
 *
 * @param element The DOM element to observe
 */

function useResizeObserver(element) {
  var _useState = useState(null),
    rect = _useState[0],
    setRect = _useState[1];
  useEffect(function () {
    if (!element) return;
    getResizeObserver().observe(element);
    setRect(element.getBoundingClientRect());
    targetMap.set(element, function (rect) {
      setRect(rect);
    });
    return function () {
      targetMap.delete(element);
    };
  }, [element]);
  return rect;
}
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/index.js














// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(373);
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/Button.js
const _excluded = ["as", "disabled"];
function Button_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}


function isTrivialHref(href) {
  return !href || href.trim() === '#';
}
function useButtonProps({
  tagName,
  disabled,
  href,
  target,
  rel,
  role,
  onClick,
  tabIndex = 0,
  type
}) {
  if (!tagName) {
    if (href != null || target != null || rel != null) {
      tagName = 'a';
    } else {
      tagName = 'button';
    }
  }
  const meta = {
    tagName
  };
  if (tagName === 'button') {
    return [{
      type: type || 'button',
      disabled
    }, meta];
  }
  const handleClick = event => {
    if (disabled || tagName === 'a' && isTrivialHref(href)) {
      event.preventDefault();
    }
    if (disabled) {
      event.stopPropagation();
      return;
    }
    onClick == null ? void 0 : onClick(event);
  };
  const handleKeyDown = event => {
    if (event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  };
  if (tagName === 'a') {
    // Ensure there's a href so Enter can trigger anchor button.
    href || (href = '#');
    if (disabled) {
      href = undefined;
    }
  }
  return [{
    role: role != null ? role : 'button',
    // explicitly undefined so that it overrides the props disabled in a spread
    // e.g. <Tag {...props} {...hookProps} />
    disabled: undefined,
    tabIndex: disabled ? undefined : tabIndex,
    href,
    target: tagName === 'a' ? target : undefined,
    'aria-disabled': !disabled ? undefined : disabled,
    rel: tagName === 'a' ? rel : undefined,
    onClick: handleClick,
    onKeyDown: handleKeyDown
  }, meta];
}
const Button = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((_ref, ref) => {
  let {
      as: asProp,
      disabled
    } = _ref,
    props = Button_objectWithoutPropertiesLoose(_ref, _excluded);
  const [buttonProps, {
    tagName: Component
  }] = useButtonProps(Object.assign({
    tagName: asProp,
    disabled
  }, props));
  return /*#__PURE__*/(0,jsx_runtime.jsx)(Component, Object.assign({}, props, buttonProps, {
    ref: ref
  }));
});
Button.displayName = 'Button';
/* harmony default export */ const esm_Button = (Button);
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/Anchor.js
const Anchor_excluded = ["onKeyDown"];
function Anchor_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-has-content */





function Anchor_isTrivialHref(href) {
  return !href || href.trim() === '#';
}
/**
 * An generic `<a>` component that covers a few A11y cases, ensuring that
 * cases where the `href` is missing or trivial like "#" are treated like buttons.
 */
const Anchor = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((_ref, ref) => {
  let {
      onKeyDown
    } = _ref,
    props = Anchor_objectWithoutPropertiesLoose(_ref, Anchor_excluded);
  const [buttonProps] = useButtonProps(Object.assign({
    tagName: 'a'
  }, props));
  const handleKeyDown = useEventCallback(e => {
    buttonProps.onKeyDown(e);
    onKeyDown == null ? void 0 : onKeyDown(e);
  });
  if (Anchor_isTrivialHref(props.href) || props.role === 'button') {
    return /*#__PURE__*/(0,jsx_runtime.jsx)("a", Object.assign({
      ref: ref
    }, props, buttonProps, {
      onKeyDown: handleKeyDown
    }));
  }
  return /*#__PURE__*/(0,jsx_runtime.jsx)("a", Object.assign({
    ref: ref
  }, props, {
    onKeyDown: onKeyDown
  }));
});
Anchor.displayName = 'Anchor';
/* harmony default export */ const esm_Anchor = (Anchor);
;// CONCATENATED MODULE: ./src/AlertLink.tsx
var AlertLink_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/AlertLink.tsx";





const AlertLink = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = esm_Anchor,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'alert-link');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: AlertLink_jsxFileName,
    lineNumber: 16,
    columnNumber: 9
  }, undefined);
});
AlertLink.displayName = 'AlertLink';
/* harmony default export */ const src_AlertLink = (AlertLink);
;// CONCATENATED MODULE: ./src/Fade.tsx
var Fade_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Fade.tsx";









const Fade_propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in: (prop_types_default()).bool,
  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: (prop_types_default()).bool,
  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: (prop_types_default()).bool,
  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  appear: (prop_types_default()).bool,
  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: (prop_types_default()).number,
  /**
   * Callback fired before the component fades in
   */
  onEnter: (prop_types_default()).func,
  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: (prop_types_default()).func,
  /**
   * Callback fired after the has component faded in
   */
  onEntered: (prop_types_default()).func,
  /**
   * Callback fired before the component fades out
   */
  onExit: (prop_types_default()).func,
  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: (prop_types_default()).func,
  /**
   * Callback fired after the component has faded out
   */
  onExited: (prop_types_default()).func,
  /**
   * You must provide a single JSX child element to this component and that element cannot be a \<React.Fragment\>
   */
  children: (prop_types_default()).element.isRequired,
  /**
   * Applies additional specified classes during the transition. Takes an object
   * where the keys correspond to the Transition status
   */
  transitionClasses: (prop_types_default()).object
};
const fadeStyles = {
  [ENTERING]: 'show',
  [ENTERED]: 'show'
};
const Fade = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  children,
  transitionClasses = {},
  onEnter,
  ...rest
}, ref) => {
  const props = {
    in: false,
    timeout: 300,
    mountOnEnter: false,
    unmountOnExit: false,
    appear: false,
    ...rest
  };
  const handleEnter = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)((node, isAppearing) => {
    triggerBrowserReflow(node);
    onEnter == null ? void 0 : onEnter(node, isAppearing);
  }, [onEnter]);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_TransitionWrapper, {
    ref: ref,
    addEndListener: transitionEndListener,
    ...props,
    onEnter: handleEnter,
    childRef: children.ref,
    children: (status, innerProps) => /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement(children, {
      ...innerProps,
      className: classnames_default()('fade', className, children.props.className, fadeStyles[status], transitionClasses[status])
    })
  }, void 0, false, {
    fileName: Fade_jsxFileName,
    lineNumber: 117,
    columnNumber: 7
  }, undefined);
});
Fade.propTypes = Fade_propTypes;
Fade.displayName = 'Fade';
/* harmony default export */ const src_Fade = (Fade);
;// CONCATENATED MODULE: ./src/CloseButton.tsx
var CloseButton_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CloseButton.tsx";




const CloseButton_propTypes = {
  /** An accessible label indicating the relevant information about the Close Button. */
  'aria-label': (prop_types_default()).string,
  /** A callback fired after the Close Button is clicked. */
  onClick: (prop_types_default()).func,
  /**
   * Render different color variant for the button.
   *
   * Omitting this will render the default dark color.
   */
  variant: prop_types_default().oneOf(['white'])
};
const CloseButton = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  variant,
  'aria-label': ariaLabel = 'Close',
  ...props
}, ref) => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("button", {
  ref: ref,
  type: "button",
  className: classnames_default()('btn-close', variant && `btn-close-${variant}`, className),
  "aria-label": ariaLabel,
  ...props
}, void 0, false, {
  fileName: CloseButton_jsxFileName,
  lineNumber: 32,
  columnNumber: 5
}, undefined));
CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = CloseButton_propTypes;
/* harmony default export */ const src_CloseButton = (CloseButton);
;// CONCATENATED MODULE: ./src/Alert.tsx
var Alert_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Alert.tsx";












const Alert_propTypes = {
  /**
   * @default 'alert'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * The Alert visual variant
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'}
   */
  variant: (prop_types_default()).string,
  /**
   * Renders a properly aligned dismiss button, as well as
   * adding extra horizontal padding to the Alert.
   */
  dismissible: (prop_types_default()).bool,
  /**
   * Controls the visual state of the Alert.
   *
   * @controllable onClose
   */
  show: (prop_types_default()).bool,
  /**
   * Callback fired when alert is closed.
   *
   * @controllable show
   */
  onClose: (prop_types_default()).func,
  /**
   * Sets the text for alert close button.
   */
  closeLabel: (prop_types_default()).string,
  /**
   * Sets the variant for close button.
   */
  closeVariant: prop_types_default().oneOf(['white']),
  /**
   * Animate the alert dismissal. Defaults to using `<Fade>` animation or use
   * `false` to disable. A custom `react-transition-group` Transition can also
   * be provided.
   */
  transition: prop_types_default().oneOfType([(prop_types_default()).bool, lib/* elementType */.nm])
};
const Alert = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((uncontrolledProps, ref) => {
  const {
    bsPrefix,
    show = true,
    closeLabel = 'Close alert',
    closeVariant,
    className,
    children,
    variant = 'primary',
    onClose,
    dismissible,
    transition = src_Fade,
    ...props
  } = useUncontrolled(uncontrolledProps, {
    show: 'onClose'
  });
  const prefix = useBootstrapPrefix(bsPrefix, 'alert');
  const handleClose = useEventCallback(e => {
    if (onClose) {
      onClose(false, e);
    }
  });
  const Transition = transition === true ? src_Fade : transition;
  const alert = /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
    role: "alert",
    ...(!Transition ? props : undefined),
    ref: ref,
    className: classnames_default()(className, prefix, variant && `${prefix}-${variant}`, dismissible && `${prefix}-dismissible`),
    children: [dismissible && /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_CloseButton, {
      onClick: handleClose,
      "aria-label": closeLabel,
      variant: closeVariant
    }, void 0, false, {
      fileName: Alert_jsxFileName,
      lineNumber: 115,
      columnNumber: 11
    }, undefined), children]
  }, void 0, true, {
    fileName: Alert_jsxFileName,
    lineNumber: 103,
    columnNumber: 7
  }, undefined);
  if (!Transition) return show ? alert : null;
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Transition, {
    unmountOnExit: true,
    ...props,
    ref: undefined,
    in: show,
    children: alert
  }, void 0, false, {
    fileName: Alert_jsxFileName,
    lineNumber: 128,
    columnNumber: 7
  }, undefined);
});
Alert.displayName = 'Alert';
Alert.propTypes = Alert_propTypes;
/* harmony default export */ const src_Alert = (Object.assign(Alert, {
  Link: src_AlertLink,
  Heading: src_AlertHeading
}));
;// CONCATENATED MODULE: ./src/Anchor.tsx

/* harmony default export */ const src_Anchor = (esm_Anchor);
;// CONCATENATED MODULE: ./src/Badge.tsx
var Badge_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Badge.tsx";





const Badge_propTypes = {
  /** @default 'badge' */
  bsPrefix: (prop_types_default()).string,
  /**
   * The visual style of the badge
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  bg: (prop_types_default()).string,
  /**
   * Add the `pill` modifier to make badges more rounded with
   * some additional horizontal padding
   */
  pill: (prop_types_default()).bool,
  /**
   * Sets badge text color
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  text: (prop_types_default()).string,
  /** @default span */
  as: (prop_types_default()).elementType
};
const Badge = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  bg = 'primary',
  pill = false,
  text,
  className,
  as: Component = 'span',
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, 'badge');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    ...props,
    className: classnames_default()(className, prefix, pill && `rounded-pill`, text && `text-${text}`, bg && `bg-${bg}`)
  }, void 0, false, {
    fileName: Badge_jsxFileName,
    lineNumber: 61,
    columnNumber: 9
  }, undefined);
});
Badge.displayName = 'Badge';
Badge.propTypes = Badge_propTypes;
/* harmony default export */ const src_Badge = (Badge);
;// CONCATENATED MODULE: ./src/BreadcrumbItem.tsx
var BreadcrumbItem_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/BreadcrumbItem.tsx";






const BreadcrumbItem_propTypes = {
  /**
   * @default 'breadcrumb-item'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Adds a visual "active" state to a Breadcrumb
   * Item and disables the link.
   */
  active: (prop_types_default()).bool,
  /**
   * `href` attribute for the inner `a` element
   */
  href: (prop_types_default()).string,
  /**
   * You can use a custom element type for this component's inner link.
   */
  linkAs: (prop_types_default()).elementType,
  /**
   * `title` attribute for the inner `a` element
   */
  title: (prop_types_default()).node,
  /**
   * `target` attribute for the inner `a` element
   */
  target: (prop_types_default()).string,
  /**
   * Additional props passed as-is to the underlying link for non-active items.
   */
  linkProps: (prop_types_default()).object,
  as: (prop_types_default()).elementType
};
const BreadcrumbItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  active = false,
  children,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'li',
  linkAs: LinkComponent = esm_Anchor,
  linkProps = {},
  href,
  title,
  target,
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, 'breadcrumb-item');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    ...props,
    className: classnames_default()(prefix, className, {
      active
    }),
    "aria-current": active ? 'page' : undefined,
    children: active ? children : /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(LinkComponent, {
      ...linkProps,
      href: href,
      title: title,
      target: target,
      children: children
    }, void 0, false, {
      fileName: BreadcrumbItem_jsxFileName,
      lineNumber: 86,
      columnNumber: 11
    }, undefined)
  }, void 0, false, {
    fileName: BreadcrumbItem_jsxFileName,
    lineNumber: 77,
    columnNumber: 7
  }, undefined);
});
BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.propTypes = BreadcrumbItem_propTypes;
/* harmony default export */ const src_BreadcrumbItem = (BreadcrumbItem);
;// CONCATENATED MODULE: ./src/Breadcrumb.tsx
var Breadcrumb_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Breadcrumb.tsx";






const Breadcrumb_propTypes = {
  /**
   * @default 'breadcrumb'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * ARIA label for the nav element
   * https://www.w3.org/TR/wai-aria-practices/#breadcrumb
   */
  label: (prop_types_default()).string,
  /**
   * Additional props passed as-is to the underlying `<ol>` element
   */
  listProps: (prop_types_default()).object,
  as: (prop_types_default()).elementType
};
const Breadcrumb = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  listProps = {},
  children,
  label = 'breadcrumb',
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'nav',
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, 'breadcrumb');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    "aria-label": label,
    className: className,
    ref: ref,
    ...props,
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("ol", {
      ...listProps,
      className: classnames_default()(prefix, listProps == null ? void 0 : listProps.className),
      children: children
    }, void 0, false, {
      fileName: Breadcrumb_jsxFileName,
      lineNumber: 60,
      columnNumber: 11
    }, undefined)
  }, void 0, false, {
    fileName: Breadcrumb_jsxFileName,
    lineNumber: 54,
    columnNumber: 9
  }, undefined);
});
Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = Breadcrumb_propTypes;
/* harmony default export */ const src_Breadcrumb = (Object.assign(Breadcrumb, {
  Item: src_BreadcrumbItem
}));
;// CONCATENATED MODULE: ./src/Button.tsx
var Button_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Button.tsx";






const Button_propTypes = {
  /**
   * @default 'btn'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * One or more button variant combinations
   *
   * buttons may be one of a variety of visual variants such as:
   *
   * `'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'link'`
   *
   * as well as "outline" versions (prefixed by 'outline-*')
   *
   * `'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-dark', 'outline-light'`
   */
  variant: (prop_types_default()).string,
  /**
   * Callback fired when the button is clicked.
   */
  onClick: (prop_types_default()).func,
  /**
   * Specifies a large or small button.
   *
   * @type ('sm'|'lg')
   */
  size: (prop_types_default()).string,
  /** Manually set the visual state of the button to `:active` */
  active: (prop_types_default()).bool,
  /**
   * Disables the Button, preventing mouse events,
   * even if the underlying component is an `<a>` element
   */
  disabled: (prop_types_default()).bool,
  /** Providing a `href` will render an `<a>` element, _styled_ as a button. */
  href: (prop_types_default()).string,
  /**
   * Defines HTML button type attribute.
   *
   * @default 'button'
   */
  type: prop_types_default().oneOf(['button', 'reset', 'submit', null]),
  as: (prop_types_default()).elementType
};
const Button_Button = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  as,
  bsPrefix,
  variant = 'primary',
  size,
  active = false,
  disabled = false,
  className,
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, 'btn');
  const [buttonProps, {
    tagName
  }] = useButtonProps({
    tagName: as,
    disabled,
    ...props
  });
  const Component = tagName;
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ...buttonProps,
    ...props,
    ref: ref,
    disabled: disabled,
    className: classnames_default()(className, prefix, active && 'active', variant && `${prefix}-${variant}`, size && `${prefix}-${size}`, props.href && disabled && 'disabled')
  }, void 0, false, {
    fileName: Button_jsxFileName,
    lineNumber: 100,
    columnNumber: 9
  }, undefined);
});
Button_Button.displayName = 'Button';
Button_Button.propTypes = Button_propTypes;
/* harmony default export */ const src_Button = (Button_Button);
;// CONCATENATED MODULE: ./src/ButtonGroup.tsx
var ButtonGroup_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ButtonGroup.tsx";





const ButtonGroup_propTypes = {
  /**
   * @default 'btn-group'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Sets the size for all Buttons in the group.
   *
   * @type ('sm'|'lg')
   */
  size: (prop_types_default()).string,
  /** Make the set of Buttons appear vertically stacked. */
  vertical: (prop_types_default()).bool,
  /**
   * An ARIA role describing the button group. Usually the default
   * "group" role is fine. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role: (prop_types_default()).string,
  as: (prop_types_default()).elementType
};
const ButtonGroup = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  size,
  vertical = false,
  className,
  role = 'group',
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...rest
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, 'btn-group');
  let baseClass = prefix;
  if (vertical) baseClass = `${prefix}-vertical`;
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ...rest,
    ref: ref,
    role: role,
    className: classnames_default()(className, baseClass, size && `${prefix}-${size}`)
  }, void 0, false, {
    fileName: ButtonGroup_jsxFileName,
    lineNumber: 62,
    columnNumber: 9
  }, undefined);
});
ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.propTypes = ButtonGroup_propTypes;
/* harmony default export */ const src_ButtonGroup = (ButtonGroup);
;// CONCATENATED MODULE: ./src/ButtonToolbar.tsx
var ButtonToolbar_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ButtonToolbar.tsx";





const ButtonToolbar_propTypes = {
  /**
   * @default 'btn-toolbar'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * The ARIA role describing the button toolbar. Generally the default
   * "toolbar" role is correct. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role: (prop_types_default()).string
};
const ButtonToolbar = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  role = 'toolbar',
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, 'btn-toolbar');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
    ...props,
    ref: ref,
    className: classnames_default()(className, prefix),
    role: role
  }, void 0, false, {
    fileName: ButtonToolbar_jsxFileName,
    lineNumber: 32,
    columnNumber: 7
  }, undefined);
});
ButtonToolbar.displayName = 'ButtonToolbar';
ButtonToolbar.propTypes = ButtonToolbar_propTypes;
/* harmony default export */ const src_ButtonToolbar = (ButtonToolbar);
;// CONCATENATED MODULE: ./src/CardBody.tsx
var CardBody_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CardBody.tsx";




const CardBody = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'card-body');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: CardBody_jsxFileName,
    lineNumber: 15,
    columnNumber: 9
  }, undefined);
});
CardBody.displayName = 'CardBody';
/* harmony default export */ const src_CardBody = (CardBody);
;// CONCATENATED MODULE: ./src/CardFooter.tsx
var CardFooter_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CardFooter.tsx";




const CardFooter = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'card-footer');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: CardFooter_jsxFileName,
    lineNumber: 15,
    columnNumber: 9
  }, undefined);
});
CardFooter.displayName = 'CardFooter';
/* harmony default export */ const src_CardFooter = (CardFooter);
;// CONCATENATED MODULE: ./src/CardHeaderContext.tsx

const CardHeaderContext_context = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.createContext(null);
CardHeaderContext_context.displayName = 'CardHeaderContext';
/* harmony default export */ const CardHeaderContext = (CardHeaderContext_context);
;// CONCATENATED MODULE: ./src/CardHeader.tsx
var CardHeader_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CardHeader.tsx";







const CardHeader_propTypes = {
  /**
   * @default 'card-header'
   */
  bsPrefix: (prop_types_default()).string,
  as: (prop_types_default()).elementType
};
const CardHeader = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, 'card-header');
  const contextValue = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({
    cardHeaderBsPrefix: prefix
  }), [prefix]);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(CardHeaderContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
      ref: ref,
      ...props,
      className: classnames_default()(className, prefix)
    }, void 0, false, {
      fileName: CardHeader_jsxFileName,
      lineNumber: 45,
      columnNumber: 11
    }, undefined)
  }, void 0, false, {
    fileName: CardHeader_jsxFileName,
    lineNumber: 44,
    columnNumber: 9
  }, undefined);
});
CardHeader.displayName = 'CardHeader';
CardHeader.propTypes = CardHeader_propTypes;
/* harmony default export */ const src_CardHeader = (CardHeader);
;// CONCATENATED MODULE: ./src/CardImg.tsx
var CardImg_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CardImg.tsx";





const CardImg_propTypes = {
  /**
   * @default 'card-img'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Defines image position inside
   * the card.
   *
   * @type {('top'|'bottom')}
   */
  variant: prop_types_default().oneOf(['top', 'bottom']),
  as: (prop_types_default()).elementType
};
const CardImg = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
({
  bsPrefix,
  className,
  variant,
  as: Component = 'img',
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, 'card-img');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(variant ? `${prefix}-${variant}` : prefix, className),
    ...props
  }, void 0, false, {
    fileName: CardImg_jsxFileName,
    lineNumber: 47,
    columnNumber: 9
  }, undefined);
});
CardImg.displayName = 'CardImg';
CardImg.propTypes = CardImg_propTypes;
/* harmony default export */ const src_CardImg = (CardImg);
;// CONCATENATED MODULE: ./src/CardImgOverlay.tsx
var CardImgOverlay_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CardImgOverlay.tsx";




const CardImgOverlay = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'card-img-overlay');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: CardImgOverlay_jsxFileName,
    lineNumber: 17,
    columnNumber: 7
  }, undefined);
});
CardImgOverlay.displayName = 'CardImgOverlay';
/* harmony default export */ const src_CardImgOverlay = (CardImgOverlay);
;// CONCATENATED MODULE: ./src/CardLink.tsx
var CardLink_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CardLink.tsx";




const CardLink = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'a',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'card-link');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: CardLink_jsxFileName,
    lineNumber: 15,
    columnNumber: 9
  }, undefined);
});
CardLink.displayName = 'CardLink';
/* harmony default export */ const src_CardLink = (CardLink);
;// CONCATENATED MODULE: ./src/CardSubtitle.tsx
var CardSubtitle_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CardSubtitle.tsx";





const DivStyledAsH6 = divWithClassName('h6');
const CardSubtitle = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH6,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'card-subtitle');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: CardSubtitle_jsxFileName,
    lineNumber: 18,
    columnNumber: 9
  }, undefined);
});
CardSubtitle.displayName = 'CardSubtitle';
/* harmony default export */ const src_CardSubtitle = (CardSubtitle);
;// CONCATENATED MODULE: ./src/CardText.tsx
var CardText_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CardText.tsx";




const CardText = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'p',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'card-text');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: CardText_jsxFileName,
    lineNumber: 15,
    columnNumber: 9
  }, undefined);
});
CardText.displayName = 'CardText';
/* harmony default export */ const src_CardText = (CardText);
;// CONCATENATED MODULE: ./src/CardTitle.tsx
var CardTitle_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CardTitle.tsx";





const DivStyledAsH5 = divWithClassName('h5');
const CardTitle = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH5,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'card-title');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: CardTitle_jsxFileName,
    lineNumber: 18,
    columnNumber: 9
  }, undefined);
});
CardTitle.displayName = 'CardTitle';
/* harmony default export */ const src_CardTitle = (CardTitle);
;// CONCATENATED MODULE: ./src/Card.tsx
var Card_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Card.tsx";














const Card_propTypes = {
  /**
   * @default 'card'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Sets card background
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
   */
  bg: (prop_types_default()).string,
  /**
   * Sets card text color
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light'|'white'|'muted')}
   */
  text: (prop_types_default()).string,
  /**
   * Sets card border color
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
   */
  border: (prop_types_default()).string,
  /**
   * When this prop is set, it creates a Card with a Card.Body inside
   * passing the children directly to it
   */
  body: (prop_types_default()).bool,
  as: (prop_types_default()).elementType
};
const Card = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  bg,
  text,
  border,
  body = false,
  children,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, 'card');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    ...props,
    className: classnames_default()(className, prefix, bg && `bg-${bg}`, text && `text-${text}`, border && `border-${border}`),
    children: body ? /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_CardBody, {
      children: children
    }, void 0, false, {
      fileName: Card_jsxFileName,
      lineNumber: 96,
      columnNumber: 17
    }, undefined) : children
  }, void 0, false, {
    fileName: Card_jsxFileName,
    lineNumber: 85,
    columnNumber: 7
  }, undefined);
});
Card.displayName = 'Card';
Card.propTypes = Card_propTypes;
/* harmony default export */ const src_Card = (Object.assign(Card, {
  Img: src_CardImg,
  Title: src_CardTitle,
  Subtitle: src_CardSubtitle,
  Body: src_CardBody,
  Link: src_CardLink,
  Text: src_CardText,
  Header: src_CardHeader,
  Footer: src_CardFooter,
  ImgOverlay: src_CardImgOverlay
}));
;// CONCATENATED MODULE: ./src/CardGroup.tsx
var CardGroup_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CardGroup.tsx";




const CardGroup = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'card-group');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: CardGroup_jsxFileName,
    lineNumber: 15,
    columnNumber: 9
  }, undefined);
});
CardGroup.displayName = 'CardGroup';
/* harmony default export */ const src_CardGroup = (CardGroup);
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useUpdateEffect.js

/**
 * Runs an effect only when the dependencies have changed, skipping the
 * initial "on mount" run. Caution, if the dependency list never changes,
 * the effect is **never run**
 *
 * ```ts
 *  const ref = useRef<HTMLInput>(null);
 *
 *  // focuses an element only if the focus changes, and not on mount
 *  useUpdateEffect(() => {
 *    const element = ref.current?.children[focusedIdx] as HTMLElement
 *
 *    element?.focus()
 *
 *  }, [focusedIndex])
 * ```
 * @param effect An effect to run on mount
 *
 * @category effects
 */

function useUpdateEffect(fn, deps) {
  var isFirst = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(true);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    return fn();
  }, deps);
}
/* harmony default export */ const esm_useUpdateEffect = (useUpdateEffect);
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useUpdatedRef.js

/**
 * Returns a ref that is immediately updated with the new value
 *
 * @param value The Ref value
 * @category refs
 */

function useUpdatedRef(value) {
  var valueRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(value);
  valueRef.current = value;
  return valueRef;
}
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useWillUnmount.js


/**
 * Attach a callback that fires when a component unmounts
 *
 * @param fn Handler to run when the component unmounts
 * @category effects
 */

function useWillUnmount(fn) {
  var onUnmount = useUpdatedRef(fn);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    return function () {
      return onUnmount.current();
    };
  }, []);
}
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useTimeout.js



/*
 * Browsers including Internet Explorer, Chrome, Safari, and Firefox store the
 * delay as a 32-bit signed integer internally. This causes an integer overflow
 * when using delays larger than 2,147,483,647 ms (about 24.8 days),
 * resulting in the timeout being executed immediately.
 *
 * via: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
 */

var MAX_DELAY_MS = Math.pow(2, 31) - 1;
function setChainedTimeout(handleRef, fn, timeoutAtMs) {
  var delayMs = timeoutAtMs - Date.now();
  handleRef.current = delayMs <= MAX_DELAY_MS ? setTimeout(fn, delayMs) : setTimeout(function () {
    return setChainedTimeout(handleRef, fn, timeoutAtMs);
  }, MAX_DELAY_MS);
}
/**
 * Returns a controller object for setting a timeout that is properly cleaned up
 * once the component unmounts. New timeouts cancel and replace existing ones.
 *
 *
 *
 * ```tsx
 * const { set, clear } = useTimeout();
 * const [hello, showHello] = useState(false);
 * //Display hello after 5 seconds
 * set(() => showHello(true), 5000);
 * return (
 *   <div className="App">
 *     {hello ? <h3>Hello</h3> : null}
 *   </div>
 * );
 * ```
 */

function useTimeout() {
  var isMounted = useMounted(); // types are confused between node and web here IDK

  var handleRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)();
  useWillUnmount(function () {
    return clearTimeout(handleRef.current);
  });
  return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    var clear = function clear() {
      return clearTimeout(handleRef.current);
    };
    function set(fn, delayMs) {
      if (delayMs === void 0) {
        delayMs = 0;
      }
      if (!isMounted()) return;
      clear();
      if (delayMs <= MAX_DELAY_MS) {
        // For simplicity, if the timeout is short, just set a normal timeout.
        handleRef.current = setTimeout(fn, delayMs);
      } else {
        setChainedTimeout(handleRef, fn, Date.now() + delayMs);
      }
    }
    return {
      set: set,
      clear: clear
    };
  }, []);
}
;// CONCATENATED MODULE: ./src/CarouselCaption.tsx
var CarouselCaption_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CarouselCaption.tsx";




const CarouselCaption = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'carousel-caption');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: CarouselCaption_jsxFileName,
    lineNumber: 17,
    columnNumber: 7
  }, undefined);
});
CarouselCaption.displayName = 'CarouselCaption';
/* harmony default export */ const src_CarouselCaption = (CarouselCaption);
;// CONCATENATED MODULE: ./src/CarouselItem.tsx
var CarouselItem_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CarouselItem.tsx";





const CarouselItem_propTypes = {
  /** Set a custom element for this component */
  as: (prop_types_default()).elementType,
  /** @default 'carousel-item' */
  bsPrefix: (prop_types_default()).string,
  /** The amount of time to delay between automatically cycling this specific item. Will default to the Carousel's `interval` prop value if none is specified. */
  interval: (prop_types_default()).number
};
const CarouselItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  bsPrefix,
  className,
  ...props
}, ref) => {
  const finalClassName = classnames_default()(className, useBootstrapPrefix(bsPrefix, 'carousel-item'));
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    ...props,
    className: finalClassName
  }, void 0, false, {
    fileName: CarouselItem_jsxFileName,
    lineNumber: 40,
    columnNumber: 14
  }, undefined);
});
CarouselItem.displayName = 'CarouselItem';
CarouselItem.propTypes = CarouselItem_propTypes;
/* harmony default export */ const src_CarouselItem = (CarouselItem);
;// CONCATENATED MODULE: ./src/ElementChildren.tsx


/**
 * Iterates through children that are typically specified as `props.children`,
 * but only maps over children that are "valid elements".
 *
 * The mapFunction provided index will be normalised to the components mapped,
 * so an invalid component would not increase the index.
 *
 */
function map(children, func) {
  let index = 0;
  return external_root_React_commonjs2_react_commonjs_react_amd_react_.Children.map(children, child => /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.isValidElement(child) ? func(child, index++) : child);
}

/**
 * Iterates through children that are "valid elements".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 */
function forEach(children, func) {
  let index = 0;
  external_root_React_commonjs2_react_commonjs_react_amd_react_.Children.forEach(children, child => {
    if ( /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.isValidElement(child)) func(child, index++);
  });
}

/**
 * Finds whether a component's `children` prop includes a React element of the
 * specified type.
 */
function hasChildOfType(children, type) {
  return external_root_React_commonjs2_react_commonjs_react_amd_react_.Children.toArray(children).some(child => /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.isValidElement(child) && child.type === type);
}

;// CONCATENATED MODULE: ./src/Carousel.tsx
var Carousel_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Carousel.tsx";



















const SWIPE_THRESHOLD = 40;
const Carousel_propTypes = {
  /**
   * @default 'carousel'
   */
  bsPrefix: (prop_types_default()).string,
  as: (prop_types_default()).elementType,
  /**
   * Enables animation on the Carousel as it transitions between slides.
   */
  slide: (prop_types_default()).bool,
  /** Animates slides with a crossfade animation instead of the default slide animation */
  fade: (prop_types_default()).bool,
  /**
   * Show the Carousel previous and next arrows for changing the current slide
   */
  controls: (prop_types_default()).bool,
  /**
   * Show a set of slide position indicators
   */
  indicators: (prop_types_default()).bool,
  /**
   * An array of labels for the indicators. Defaults to "Slide #" if not provided.
   */
  indicatorLabels: (prop_types_default()).array,
  /**
   * Controls the current visible slide
   *
   * @controllable onSelect
   */
  activeIndex: (prop_types_default()).number,
  /**
   * Callback fired when the active item changes.
   *
   * ```js
   * (eventKey: number, event: Object | null) => void
   * ```
   *
   * @controllable activeIndex
   */
  onSelect: (prop_types_default()).func,
  /**
   * Callback fired when a slide transition starts.
   *
   * ```js
   * (eventKey: number, direction: 'left' | 'right') => void
   */
  onSlide: (prop_types_default()).func,
  /**
   * Callback fired when a slide transition ends.
   *
   * ```js
   * (eventKey: number, direction: 'left' | 'right') => void
   */
  onSlid: (prop_types_default()).func,
  /**
   * The amount of time to delay between automatically cycling an item. If `null`, carousel will not automatically cycle.
   */
  interval: prop_types_default().oneOfType([(prop_types_default()).number, prop_types_default().oneOf([null])]),
  /** Whether the carousel should react to keyboard events. */
  keyboard: (prop_types_default()).bool,
  /**
   * If set to `"hover"`, pauses the cycling of the carousel on `mouseenter` and resumes the cycling of the carousel on `mouseleave`. If set to `false`, hovering over the carousel won't pause it.
   *
   * On touch-enabled devices, when set to `"hover"`, cycling will pause on `touchend` (once the user finished interacting with the carousel) for two intervals, before automatically resuming. Note that this is in addition to the above mouse behavior.
   */
  pause: prop_types_default().oneOf(['hover', false]),
  /** Whether the carousel should cycle continuously or have hard stops. */
  wrap: (prop_types_default()).bool,
  /**
   * Whether the carousel should support left/right swipe interactions on touchscreen devices.
   */
  touch: (prop_types_default()).bool,
  /** Override the default button icon for the "previous" control */
  prevIcon: (prop_types_default()).node,
  /**
   * Label shown to screen readers only, can be used to show the previous element
   * in the carousel.
   * Set to null to deactivate.
   */
  prevLabel: (prop_types_default()).string,
  /** Override the default button icon for the "next" control */
  nextIcon: (prop_types_default()).node,
  /**
   * Label shown to screen readers only, can be used to show the next element
   * in the carousel.
   * Set to null to deactivate.
   */
  nextLabel: (prop_types_default()).string,
  /**
   * Color variant that controls the colors of the controls, indicators
   * and captions.
   */
  variant: prop_types_default().oneOf(['dark'])
};
function isVisible(element) {
  if (!element || !element.style || !element.parentNode || !element.parentNode.style) {
    return false;
  }
  const elementStyle = getComputedStyle(element);
  return elementStyle.display !== 'none' && elementStyle.visibility !== 'hidden' && getComputedStyle(element.parentNode).display !== 'none';
}
const Carousel = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  defaultActiveIndex = 0,
  ...uncontrolledProps
}, ref) => {
  const {
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    bsPrefix,
    slide = true,
    fade = false,
    controls = true,
    indicators = true,
    indicatorLabels = [],
    activeIndex,
    onSelect,
    onSlide,
    onSlid,
    interval = 5000,
    keyboard = true,
    onKeyDown,
    pause = 'hover',
    onMouseOver,
    onMouseOut,
    wrap = true,
    touch = true,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    prevIcon = /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("span", {
      "aria-hidden": "true",
      className: "carousel-control-prev-icon"
    }, void 0, false, {
      fileName: Carousel_jsxFileName,
      lineNumber: 225,
      columnNumber: 11
    }, undefined),
    prevLabel = 'Previous',
    nextIcon = /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("span", {
      "aria-hidden": "true",
      className: "carousel-control-next-icon"
    }, void 0, false, {
      fileName: Carousel_jsxFileName,
      lineNumber: 229,
      columnNumber: 11
    }, undefined),
    nextLabel = 'Next',
    variant,
    className,
    children,
    ...props
  } = useUncontrolled({
    defaultActiveIndex,
    ...uncontrolledProps
  }, {
    activeIndex: 'onSelect'
  });
  const prefix = useBootstrapPrefix(bsPrefix, 'carousel');
  const isRTL = useIsRTL();
  const nextDirectionRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  const [direction, setDirection] = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)('next');
  const [paused, setPaused] = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(false);
  const [isSliding, setIsSliding] = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(false);
  const [renderedActiveIndex, setRenderedActiveIndex] = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(activeIndex || 0);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    if (!isSliding && activeIndex !== renderedActiveIndex) {
      if (nextDirectionRef.current) {
        setDirection(nextDirectionRef.current);
      } else {
        setDirection((activeIndex || 0) > renderedActiveIndex ? 'next' : 'prev');
      }
      if (slide) {
        setIsSliding(true);
      }
      setRenderedActiveIndex(activeIndex || 0);
    }
  }, [activeIndex, isSliding, renderedActiveIndex, slide]);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    if (nextDirectionRef.current) {
      nextDirectionRef.current = null;
    }
  });
  let numChildren = 0;
  let activeChildInterval;

  // Iterate to grab all of the children's interval values
  // (and count them, too)
  forEach(children, (child, index) => {
    ++numChildren;
    if (index === activeIndex) {
      activeChildInterval = child.props.interval;
    }
  });
  const activeChildIntervalRef = esm_useCommittedRef(activeChildInterval);
  const prev = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(event => {
    if (isSliding) {
      return;
    }
    let nextActiveIndex = renderedActiveIndex - 1;
    if (nextActiveIndex < 0) {
      if (!wrap) {
        return;
      }
      nextActiveIndex = numChildren - 1;
    }
    nextDirectionRef.current = 'prev';
    onSelect == null ? void 0 : onSelect(nextActiveIndex, event);
  }, [isSliding, renderedActiveIndex, onSelect, wrap, numChildren]);

  // This is used in the setInterval, so it should not invalidate.
  const next = useEventCallback(event => {
    if (isSliding) {
      return;
    }
    let nextActiveIndex = renderedActiveIndex + 1;
    if (nextActiveIndex >= numChildren) {
      if (!wrap) {
        return;
      }
      nextActiveIndex = 0;
    }
    nextDirectionRef.current = 'next';
    onSelect == null ? void 0 : onSelect(nextActiveIndex, event);
  });
  const elementRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)();
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useImperativeHandle)(ref, () => ({
    element: elementRef.current,
    prev,
    next
  }));

  // This is used in the setInterval, so it should not invalidate.
  const nextWhenVisible = useEventCallback(() => {
    if (!document.hidden && isVisible(elementRef.current)) {
      if (isRTL) {
        prev();
      } else {
        next();
      }
    }
  });
  const slideDirection = direction === 'next' ? 'start' : 'end';
  esm_useUpdateEffect(() => {
    if (slide) {
      // These callbacks will be handled by the <Transition> callbacks.
      return;
    }
    onSlide == null ? void 0 : onSlide(renderedActiveIndex, slideDirection);
    onSlid == null ? void 0 : onSlid(renderedActiveIndex, slideDirection);
  }, [renderedActiveIndex]);
  const orderClassName = `${prefix}-item-${direction}`;
  const directionalClassName = `${prefix}-item-${slideDirection}`;
  const handleEnter = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(node => {
    triggerBrowserReflow(node);
    onSlide == null ? void 0 : onSlide(renderedActiveIndex, slideDirection);
  }, [onSlide, renderedActiveIndex, slideDirection]);
  const handleEntered = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(() => {
    setIsSliding(false);
    onSlid == null ? void 0 : onSlid(renderedActiveIndex, slideDirection);
  }, [onSlid, renderedActiveIndex, slideDirection]);
  const handleKeyDown = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(event => {
    if (keyboard && !/input|textarea/i.test(event.target.tagName)) {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          if (isRTL) {
            next(event);
          } else {
            prev(event);
          }
          return;
        case 'ArrowRight':
          event.preventDefault();
          if (isRTL) {
            prev(event);
          } else {
            next(event);
          }
          return;
        default:
      }
    }
    onKeyDown == null ? void 0 : onKeyDown(event);
  }, [keyboard, onKeyDown, prev, next, isRTL]);
  const handleMouseOver = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(event => {
    if (pause === 'hover') {
      setPaused(true);
    }
    onMouseOver == null ? void 0 : onMouseOver(event);
  }, [pause, onMouseOver]);
  const handleMouseOut = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(event => {
    setPaused(false);
    onMouseOut == null ? void 0 : onMouseOut(event);
  }, [onMouseOut]);
  const touchStartXRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(0);
  const touchDeltaXRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(0);
  const touchUnpauseTimeout = useTimeout();
  const handleTouchStart = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(event => {
    touchStartXRef.current = event.touches[0].clientX;
    touchDeltaXRef.current = 0;
    if (pause === 'hover') {
      setPaused(true);
    }
    onTouchStart == null ? void 0 : onTouchStart(event);
  }, [pause, onTouchStart]);
  const handleTouchMove = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(event => {
    if (event.touches && event.touches.length > 1) {
      touchDeltaXRef.current = 0;
    } else {
      touchDeltaXRef.current = event.touches[0].clientX - touchStartXRef.current;
    }
    onTouchMove == null ? void 0 : onTouchMove(event);
  }, [onTouchMove]);
  const handleTouchEnd = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(event => {
    if (touch) {
      const touchDeltaX = touchDeltaXRef.current;
      if (Math.abs(touchDeltaX) > SWIPE_THRESHOLD) {
        if (touchDeltaX > 0) {
          prev(event);
        } else {
          next(event);
        }
      }
    }
    if (pause === 'hover') {
      touchUnpauseTimeout.set(() => {
        setPaused(false);
      }, interval || undefined);
    }
    onTouchEnd == null ? void 0 : onTouchEnd(event);
  }, [touch, pause, prev, next, touchUnpauseTimeout, interval, onTouchEnd]);
  const shouldPlay = interval != null && !paused && !isSliding;
  const intervalHandleRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)();
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    var _ref, _activeChildIntervalR;
    if (!shouldPlay) {
      return undefined;
    }
    const nextFunc = isRTL ? prev : next;
    intervalHandleRef.current = window.setInterval(document.visibilityState ? nextWhenVisible : nextFunc, (_ref = (_activeChildIntervalR = activeChildIntervalRef.current) != null ? _activeChildIntervalR : interval) != null ? _ref : undefined);
    return () => {
      if (intervalHandleRef.current !== null) {
        clearInterval(intervalHandleRef.current);
      }
    };
  }, [shouldPlay, prev, next, activeChildIntervalRef, interval, nextWhenVisible, isRTL]);
  const indicatorOnClicks = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => indicators && Array.from({
    length: numChildren
  }, (_, index) => event => {
    onSelect == null ? void 0 : onSelect(index, event);
  }), [indicators, numChildren, onSelect]);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: elementRef,
    ...props,
    onKeyDown: handleKeyDown,
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    className: classnames_default()(className, prefix, slide && 'slide', fade && `${prefix}-fade`, variant && `${prefix}-${variant}`),
    children: [indicators && /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
      className: `${prefix}-indicators`,
      children: map(children, (_, index) => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("button", {
        type: "button",
        "data-bs-target": "" // Bootstrap requires this in their css.
        ,
        "aria-label": indicatorLabels != null && indicatorLabels.length ? indicatorLabels[index] : `Slide ${index + 1}`,
        className: index === renderedActiveIndex ? 'active' : undefined,
        onClick: indicatorOnClicks ? indicatorOnClicks[index] : undefined,
        "aria-current": index === renderedActiveIndex
      }, index, false, {
        fileName: Carousel_jsxFileName,
        lineNumber: 548,
        columnNumber: 17
      }, undefined))
    }, void 0, false, {
      fileName: Carousel_jsxFileName,
      lineNumber: 546,
      columnNumber: 13
    }, undefined), /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
      className: `${prefix}-inner`,
      children: map(children, (child, index) => {
        const isActive = index === renderedActiveIndex;
        return slide ? /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_TransitionWrapper, {
          in: isActive,
          onEnter: isActive ? handleEnter : undefined,
          onEntered: isActive ? handleEntered : undefined,
          addEndListener: transitionEndListener,
          children: (status, innerProps) => /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement(child, {
            ...innerProps,
            className: classnames_default()(child.props.className, isActive && status !== 'entered' && orderClassName, (status === 'entered' || status === 'exiting') && 'active', (status === 'entering' || status === 'exiting') && directionalClassName)
          })
        }, void 0, false, {
          fileName: Carousel_jsxFileName,
          lineNumber: 574,
          columnNumber: 17
        }, undefined) : /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement(child, {
          className: classnames_default()(child.props.className, isActive && 'active')
        });
      })
    }, void 0, false, {
      fileName: Carousel_jsxFileName,
      lineNumber: 569,
      columnNumber: 11
    }, undefined), controls && /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(jsx_dev_runtime.Fragment, {
      children: [(wrap || activeIndex !== 0) && /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(esm_Anchor, {
        className: `${prefix}-control-prev`,
        onClick: prev,
        children: [prevIcon, prevLabel && /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("span", {
          className: "visually-hidden",
          children: prevLabel
        }, void 0, false, {
          fileName: Carousel_jsxFileName,
          lineNumber: 614,
          columnNumber: 21
        }, undefined)]
      }, void 0, true, {
        fileName: Carousel_jsxFileName,
        lineNumber: 611,
        columnNumber: 17
      }, undefined), (wrap || activeIndex !== numChildren - 1) && /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(esm_Anchor, {
        className: `${prefix}-control-next`,
        onClick: next,
        children: [nextIcon, nextLabel && /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("span", {
          className: "visually-hidden",
          children: nextLabel
        }, void 0, false, {
          fileName: Carousel_jsxFileName,
          lineNumber: 622,
          columnNumber: 21
        }, undefined)]
      }, void 0, true, {
        fileName: Carousel_jsxFileName,
        lineNumber: 619,
        columnNumber: 17
      }, undefined)]
    }, void 0, true)]
  }, void 0, true, {
    fileName: Carousel_jsxFileName,
    lineNumber: 528,
    columnNumber: 9
  }, undefined);
});
Carousel.displayName = 'Carousel';
Carousel.propTypes = Carousel_propTypes;
/* harmony default export */ const src_Carousel = (Object.assign(Carousel, {
  Caption: src_CarouselCaption,
  Item: src_CarouselItem
}));
;// CONCATENATED MODULE: ./src/Col.tsx
var Col_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Col.tsx";





const colSize = prop_types_default().oneOfType([(prop_types_default()).bool, (prop_types_default()).number, (prop_types_default()).string, prop_types_default().oneOf(['auto'])]);
const stringOrNumber = prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string]);
const column = prop_types_default().oneOfType([colSize, prop_types_default().shape({
  size: colSize,
  order: stringOrNumber,
  offset: stringOrNumber
})]);
const Col_propTypes = {
  /**
   * @default 'col'
   */
  bsPrefix: (prop_types_default()).string,
  as: (prop_types_default()).elementType,
  /**
   * The number of columns to span on extra small devices (<576px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  xs: column,
  /**
   * The number of columns to span on small devices (≥576px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  sm: column,
  /**
   * The number of columns to span on medium devices (≥768px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  md: column,
  /**
   * The number of columns to span on large devices (≥992px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  lg: column,
  /**
   * The number of columns to span on extra large devices (≥1200px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  xl: column,
  /**
   * The number of columns to span on extra extra large devices (≥1400px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  xxl: column
};
function useCol({
  as,
  bsPrefix,
  className,
  ...props
}) {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'col');
  const breakpoints = useBootstrapBreakpoints();
  const minBreakpoint = useBootstrapMinBreakpoint();
  const spans = [];
  const classes = [];
  breakpoints.forEach(brkPoint => {
    const propValue = props[brkPoint];
    delete props[brkPoint];
    let span;
    let offset;
    let order;
    if (typeof propValue === 'object' && propValue != null) {
      ({
        span,
        offset,
        order
      } = propValue);
    } else {
      span = propValue;
    }
    const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';
    if (span) spans.push(span === true ? `${bsPrefix}${infix}` : `${bsPrefix}${infix}-${span}`);
    if (order != null) classes.push(`order${infix}-${order}`);
    if (offset != null) classes.push(`offset${infix}-${offset}`);
  });
  return [{
    ...props,
    className: classnames_default()(className, ...spans, ...classes)
  }, {
    as,
    bsPrefix,
    spans
  }];
}
const Col = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
(props, ref) => {
  const [{
    className,
    ...colProps
  }, {
    as: Component = 'div',
    bsPrefix,
    spans
  }] = useCol(props);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ...colProps,
    ref: ref,
    className: classnames_default()(className, !spans.length && bsPrefix)
  }, void 0, false, {
    fileName: Col_jsxFileName,
    lineNumber: 184,
    columnNumber: 7
  }, undefined);
});
Col.displayName = 'Col';
Col.propTypes = Col_propTypes;
/* harmony default export */ const src_Col = (Col);
;// CONCATENATED MODULE: ./src/Container.tsx
var Container_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Container.tsx";





const Container_propTypes = {
  /**
   * @default 'container'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Allow the Container to fill all of its available horizontal space.
   * @type {(true|"sm"|"md"|"lg"|"xl"|"xxl")}
   */
  fluid: prop_types_default().oneOfType([(prop_types_default()).bool, (prop_types_default()).string]),
  /**
   * You can use a custom element for this component
   */
  as: (prop_types_default()).elementType
};
const Container = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  fluid = false,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  className,
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, 'container');
  const suffix = typeof fluid === 'string' ? `-${fluid}` : '-fluid';
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    ...props,
    className: classnames_default()(className, fluid ? `${prefix}${suffix}` : prefix)
  }, void 0, false, {
    fileName: Container_jsxFileName,
    lineNumber: 47,
    columnNumber: 9
  }, undefined);
});
Container.displayName = 'Container';
Container.propTypes = Container_propTypes;
/* harmony default export */ const src_Container = (Container);
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/querySelectorAll.js
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
/**
 * Runs `querySelectorAll` on a given element.
 * 
 * @param element the element
 * @param selector the selector
 */

function qsa(element, selector) {
  return toArray(element.querySelectorAll(selector));
}
;// CONCATENATED MODULE: ./node_modules/@restart/ui/node_modules/uncontrollable/lib/esm/index.js
function esm_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function esm_toPropertyKey(arg) {
  var key = esm_toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function esm_toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function esm_defaultKey(key) {
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
}
function esm_useUncontrolledProp(propValue, defaultValue, handler) {
  const wasPropRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(propValue !== undefined);
  const [stateValue, setState] = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(defaultValue);
  const isProp = propValue !== undefined;
  const wasProp = wasPropRef.current;
  wasPropRef.current = isProp;

  /**
   * If a prop switches from controlled to Uncontrolled
   * reset its value to the defaultValue
   */
  if (!isProp && wasProp && stateValue !== defaultValue) {
    setState(defaultValue);
  }
  return [isProp ? propValue : stateValue, (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)((value, ...args) => {
    if (handler) handler(value, ...args);
    setState(value);
  }, [handler])];
}

function esm_useUncontrolled(props, config) {
  return Object.keys(config).reduce((result, fieldName) => {
    const _ref = result,
      _defaultKey = esm_defaultKey(fieldName),
      {
        [_defaultKey]: defaultValue,
        [fieldName]: propsValue
      } = _ref,
      rest = esm_objectWithoutPropertiesLoose(_ref, [_defaultKey, fieldName].map(esm_toPropertyKey));
    const handlerName = config[fieldName];
    const [value, handler] = esm_useUncontrolledProp(propsValue, defaultValue, props[handlerName]);
    return Object.assign({}, rest, {
      [fieldName]: value,
      [handlerName]: handler
    });
  }, props);
}
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useForceUpdate.js

/**
 * Returns a function that triggers a component update. the hook equivalent to
 * `this.forceUpdate()` in a class component. In most cases using a state value directly
 * is preferable but may be required in some advanced usages of refs for interop or
 * when direct DOM manipulation is required.
 *
 * ```ts
 * const forceUpdate = useForceUpdate();
 *
 * const updateOnClick = useCallback(() => {
 *  forceUpdate()
 * }, [forceUpdate])
 *
 * return <button type="button" onClick={updateOnClick}>Hi there</button>
 * ```
 */

function useForceUpdate() {
  // The toggling state value is designed to defeat React optimizations for skipping
  // updates when they are stricting equal to the last state value
  var _useReducer = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useReducer)(function (state) {
      return !state;
    }, false),
    dispatch = _useReducer[1];
  return dispatch;
}
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/DropdownContext.js

const DropdownContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.createContext(null);
/* harmony default export */ const esm_DropdownContext = (DropdownContext);
;// CONCATENATED MODULE: ./node_modules/dequal/dist/index.mjs
var has = Object.prototype.hasOwnProperty;

function find(iter, tar, key) {
	for (key of iter.keys()) {
		if (dequal(key, tar)) return key;
	}
}

function dequal(foo, bar) {
	var ctor, len, tmp;
	if (foo === bar) return true;

	if (foo && bar && (ctor=foo.constructor) === bar.constructor) {
		if (ctor === Date) return foo.getTime() === bar.getTime();
		if (ctor === RegExp) return foo.toString() === bar.toString();

		if (ctor === Array) {
			if ((len=foo.length) === bar.length) {
				while (len-- && dequal(foo[len], bar[len]));
			}
			return len === -1;
		}

		if (ctor === Set) {
			if (foo.size !== bar.size) {
				return false;
			}
			for (len of foo) {
				tmp = len;
				if (tmp && typeof tmp === 'object') {
					tmp = find(bar, tmp);
					if (!tmp) return false;
				}
				if (!bar.has(tmp)) return false;
			}
			return true;
		}

		if (ctor === Map) {
			if (foo.size !== bar.size) {
				return false;
			}
			for (len of foo) {
				tmp = len[0];
				if (tmp && typeof tmp === 'object') {
					tmp = find(bar, tmp);
					if (!tmp) return false;
				}
				if (!dequal(len[1], bar.get(tmp))) {
					return false;
				}
			}
			return true;
		}

		if (ctor === ArrayBuffer) {
			foo = new Uint8Array(foo);
			bar = new Uint8Array(bar);
		} else if (ctor === DataView) {
			if ((len=foo.byteLength) === bar.byteLength) {
				while (len-- && foo.getInt8(len) === bar.getInt8(len));
			}
			return len === -1;
		}

		if (ArrayBuffer.isView(foo)) {
			if ((len=foo.byteLength) === bar.byteLength) {
				while (len-- && foo[len] === bar[len]);
			}
			return len === -1;
		}

		if (!ctor || typeof foo === 'object') {
			len = 0;
			for (ctor in foo) {
				if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
				if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
			}
			return Object.keys(bar).length === len;
		}
	}

	return foo !== foo && bar !== bar;
}

;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useSafeState.js


function useSafeState(state) {
  var isMounted = useMounted();
  return [state[0], (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (nextState) {
    if (!isMounted()) return;
    return state[1](nextState);
  }, [isMounted, state[1]])];
}
/* harmony default export */ const esm_useSafeState = (useSafeState);
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js

function getBasePlacement(placement) {
  return placement.split('-')[0];
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/math.js
var math_max = Math.max;
var math_min = Math.min;
var round = Math.round;
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }
  return navigator.userAgent;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js




function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window,
    visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/contains.js

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      } // $FlowFixMe[prop-missing]: need a better way to handle this...

      next = next.parentNode || next.host;
    } while (next);
  } // Give up, the result is false

  return false;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js

function dom_utils_getComputedStyle_getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement(element) ? element.ownerDocument :
  // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js



function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot ||
    // step into the shadow DOM of the parent of a slotted node
    element.parentNode || (
    // DOM Element detected
    isShadowRoot(element) ? element.host : null) ||
    // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback
  );
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js







function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) ||
  // https://github.com/popperjs/popper-core/issues/837
  dom_utils_getComputedStyle_getComputedStyle(element).position === 'fixed') {
    return null;
  }
  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block

function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = dom_utils_getComputedStyle_getComputedStyle(element);
    if (elementCss.position === 'fixed') {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = dom_utils_getComputedStyle_getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.

function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && dom_utils_getComputedStyle_getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && dom_utils_getComputedStyle_getComputedStyle(offsetParent).position === 'static')) {
    return window;
  }
  return offsetParent || getContainingBlock(element) || window;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/within.js

function within(min, value, max) {
  return math_max(min, math_min(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/enums.js
var enums_top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [enums_top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var enums_placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/arrow.js









 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state,
    name = _ref.name,
    options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';
  if (!arrowElement || !popperOffsets) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? enums_top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}
function effect(_ref2) {
  var state = _ref2.state,
    options = _ref2.options;
  var _options$element = options.element,
    arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
  if (arrowElement == null) {
    return;
  } // CSS selector

  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (false) {}
  if (!contains(state.elements.popper, arrowElement)) {
    if (false) {}
    return;
  }
  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules

/* harmony default export */ const modifiers_arrow = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split('-')[1];
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x,
    y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper = _ref2.popper,
    popperRect = _ref2.popperRect,
    placement = _ref2.placement,
    variation = _ref2.variation,
    offsets = _ref2.offsets,
    position = _ref2.position,
    gpuAcceleration = _ref2.gpuAcceleration,
    adaptive = _ref2.adaptive,
    roundOffsets = _ref2.roundOffsets,
    isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
    x = _offsets$x === void 0 ? 0 : _offsets$x,
    _offsets$y = offsets.y,
    y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = enums_top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';
    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);
      if (dom_utils_getComputedStyle_getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

    offsetParent = offsetParent;
    if (placement === enums_top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height :
      // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === enums_top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width :
      // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }, getWindow(popper)) : {
    x: x,
    y: y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state,
    options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
    gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
    _options$adaptive = options.adaptive,
    adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
    _options$roundOffsets = options.roundOffsets,
    roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (false) { var transitionProperty; }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules

/* harmony default export */ const modifiers_computeStyles = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};
function eventListeners_effect(_ref) {
  var state = _ref.state,
    instance = _ref.instance,
    options = _ref.options;
  var _options$scroll = options.scroll,
    scroll = _options$scroll === void 0 ? true : _options$scroll,
    _options$resize = options.resize,
    resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }
  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }
  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }
    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules

/* harmony default export */ const eventListeners = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: eventListeners_effect,
  data: {}
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var getOppositeVariationPlacement_hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return getOppositeVariationPlacement_hash[matched];
  });
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js




function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = math_max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = math_max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (dom_utils_getComputedStyle_getComputedStyle(body || html).direction === 'rtl') {
    x += math_max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = dom_utils_getComputedStyle_getComputedStyle(element),
    overflow = _getComputedStyle.overflow,
    overflowX = _getComputedStyle.overflowX,
    overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList :
  // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js














function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`

function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(dom_utils_getComputedStyle_getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414

  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents

function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = math_max(rect.top, accRect.top);
    accRect.right = math_min(rect.right, accRect.right);
    accRect.bottom = math_min(rect.bottom, accRect.bottom);
    accRect.left = math_max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/computeOffsets.js




function computeOffsets(_ref) {
  var reference = _ref.reference,
    element = _ref.element,
    placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case enums_top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/detectOverflow.js








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    _options$placement = _options.placement,
    placement = _options$placement === void 0 ? state.placement : _options$placement,
    _options$strategy = _options.strategy,
    strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
    _options$boundary = _options.boundary,
    boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
    _options$rootBoundary = _options.rootBoundary,
    rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
    _options$elementConte = _options.elementContext,
    elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
    _options$altBoundary = _options.altBoundary,
    altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
    _options$padding = _options.padding,
    padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [enums_top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }
  return overflowOffsets;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    placement = _options.placement,
    boundary = _options.boundary,
    rootBoundary = _options.rootBoundary,
    padding = _options.padding,
    flipVariations = _options.flipVariations,
    _options$allowedAutoP = _options.allowedAutoPlacements,
    allowedAutoPlacements = _options$allowedAutoP === void 0 ? enums_placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;
    if (false) {}
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...

  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/flip.js






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state,
    options = _ref.options,
    name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis,
    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
    _options$altAxis = options.altAxis,
    checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
    specifiedFallbackPlacements = options.fallbackPlacements,
    padding = options.padding,
    boundary = options.boundary,
    rootBoundary = options.rootBoundary,
    altBoundary = options.altBoundary,
    _options$flipVariatio = options.flipVariations,
    flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
    allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];
  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [enums_top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : enums_top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);
        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break") break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules

/* harmony default export */ const modifiers_flip = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/hide.js


function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [enums_top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state,
    name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules

/* harmony default export */ const modifiers_hide = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/offset.js

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, enums_top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
    skidding = _ref[0],
    distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state,
    options = _ref2.options,
    name = _ref2.name;
  var _options$offset = options.offset,
    offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = enums_placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
    x = _data$state$placement.x,
    y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules

/* harmony default export */ const modifiers_offset = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js

function popperOffsets(_ref) {
  var state = _ref.state,
    name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules

/* harmony default export */ const modifiers_popperOffsets = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js











function preventOverflow(_ref) {
  var state = _ref.state,
    options = _ref.options,
    name = _ref.name;
  var _options$mainAxis = options.mainAxis,
    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
    _options$altAxis = options.altAxis,
    checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
    boundary = options.boundary,
    rootBoundary = options.rootBoundary,
    altBoundary = options.altBoundary,
    padding = options.padding,
    _options$tether = options.tether,
    tether = _options$tether === void 0 ? true : _options$tether,
    _options$tetherOffset = options.tetherOffset,
    tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === 'y' ? enums_top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? math_min(min, tetherMin) : min, offset, tether ? math_max(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === 'x' ? enums_top : left;
    var _altSide = mainAxis === 'x' ? bottom : right;
    var _offset = popperOffsets[altAxis];
    var _len = altAxis === 'y' ? 'height' : 'width';
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [enums_top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules

/* harmony default export */ const modifiers_preventOverflow = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js




function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js








function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' ||
    // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/orderModifiers.js
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }
    return pending;
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/createPopper.js














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions,
    _generatorOptions$def = _generatorOptions.defaultModifiers,
    defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
    _generatorOptions$def2 = _generatorOptions.defaultOptions,
    defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (false) { var _getComputedStyle, marginTop, marginRight, marginBottom, marginLeft, flipModifier, modifiers; }
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements,
          reference = _state$elements.reference,
          popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (false) {}
          return;
        } // Store the reference and popper rects to be read by modifiers

        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (false) {}
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index],
            fn = _state$orderedModifie.fn,
            _state$orderedModifie2 = _state$orderedModifie.options,
            _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
            name = _state$orderedModifie.name;
          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference, popper)) {
      if (false) {}
      return instance;
    }
    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
          _ref3$options = _ref3.options,
          options = _ref3$options === void 0 ? {} : _ref3$options,
          effect = _ref3.effect;
        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });
          var noopFn = function noopFn() {};
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper = /*#__PURE__*/(/* unused pure expression or super */ null && (popperGenerator())); // eslint-disable-next-line import/no-unused-modules


;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/popper.js











// For the common JS build we will turn this file into a bundle with no imports.
// This is b/c the Popper lib is all esm files, and would break in a common js only environment
const popper_createPopper = popperGenerator({
  defaultModifiers: [modifiers_hide, modifiers_popperOffsets, modifiers_computeStyles, eventListeners, modifiers_offset, modifiers_flip, modifiers_preventOverflow, modifiers_arrow]
});

;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/usePopper.js
const usePopper_excluded = ["enabled", "placement", "strategy", "modifiers"];
function usePopper_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}




const disabledApplyStylesModifier = {
  name: 'applyStyles',
  enabled: false,
  phase: 'afterWrite',
  fn: () => undefined
};

// until docjs supports type exports...

const ariaDescribedByModifier = {
  name: 'ariaDescribedBy',
  enabled: true,
  phase: 'afterWrite',
  effect: ({
    state
  }) => () => {
    const {
      reference,
      popper
    } = state.elements;
    if ('removeAttribute' in reference) {
      const ids = (reference.getAttribute('aria-describedby') || '').split(',').filter(id => id.trim() !== popper.id);
      if (!ids.length) reference.removeAttribute('aria-describedby');else reference.setAttribute('aria-describedby', ids.join(','));
    }
  },
  fn: ({
    state
  }) => {
    var _popper$getAttribute;
    const {
      popper,
      reference
    } = state.elements;
    const role = (_popper$getAttribute = popper.getAttribute('role')) == null ? void 0 : _popper$getAttribute.toLowerCase();
    if (popper.id && role === 'tooltip' && 'setAttribute' in reference) {
      const ids = reference.getAttribute('aria-describedby');
      if (ids && ids.split(',').indexOf(popper.id) !== -1) {
        return;
      }
      reference.setAttribute('aria-describedby', ids ? `${ids},${popper.id}` : popper.id);
    }
  }
};
const EMPTY_MODIFIERS = [];
/**
 * Position an element relative some reference element using Popper.js
 *
 * @param referenceElement
 * @param popperElement
 * @param {object}      options
 * @param {object=}     options.modifiers Popper.js modifiers
 * @param {boolean=}    options.enabled toggle the popper functionality on/off
 * @param {string=}     options.placement The popper element placement relative to the reference element
 * @param {string=}     options.strategy the positioning strategy
 * @param {function=}   options.onCreate called when the popper is created
 * @param {function=}   options.onUpdate called when the popper is updated
 *
 * @returns {UsePopperState} The popper state
 */
function usePopper(referenceElement, popperElement, _ref = {}) {
  let {
      enabled = true,
      placement = 'bottom',
      strategy = 'absolute',
      modifiers = EMPTY_MODIFIERS
    } = _ref,
    config = usePopper_objectWithoutPropertiesLoose(_ref, usePopper_excluded);
  const prevModifiers = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(modifiers);
  const popperInstanceRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)();
  const update = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(() => {
    var _popperInstanceRef$cu;
    (_popperInstanceRef$cu = popperInstanceRef.current) == null ? void 0 : _popperInstanceRef$cu.update();
  }, []);
  const forceUpdate = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(() => {
    var _popperInstanceRef$cu2;
    (_popperInstanceRef$cu2 = popperInstanceRef.current) == null ? void 0 : _popperInstanceRef$cu2.forceUpdate();
  }, []);
  const [popperState, setState] = esm_useSafeState((0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)({
    placement,
    update,
    forceUpdate,
    attributes: {},
    styles: {
      popper: {},
      arrow: {}
    }
  }));
  const updateModifier = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({
    name: 'updateStateModifier',
    enabled: true,
    phase: 'write',
    requires: ['computeStyles'],
    fn: ({
      state
    }) => {
      const styles = {};
      const attributes = {};
      Object.keys(state.elements).forEach(element => {
        styles[element] = state.styles[element];
        attributes[element] = state.attributes[element];
      });
      setState({
        state,
        styles,
        attributes,
        update,
        forceUpdate,
        placement: state.placement
      });
    }
  }), [update, forceUpdate, setState]);
  const nextModifiers = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => {
    if (!dequal(prevModifiers.current, modifiers)) {
      prevModifiers.current = modifiers;
    }
    return prevModifiers.current;
  }, [modifiers]);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    if (!popperInstanceRef.current || !enabled) return;
    popperInstanceRef.current.setOptions({
      placement,
      strategy,
      modifiers: [...nextModifiers, updateModifier, disabledApplyStylesModifier]
    });
  }, [strategy, placement, updateModifier, enabled, nextModifiers]);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    if (!enabled || referenceElement == null || popperElement == null) {
      return undefined;
    }
    popperInstanceRef.current = popper_createPopper(referenceElement, popperElement, Object.assign({}, config, {
      placement,
      strategy,
      modifiers: [...nextModifiers, ariaDescribedByModifier, updateModifier]
    }));
    return () => {
      if (popperInstanceRef.current != null) {
        popperInstanceRef.current.destroy();
        popperInstanceRef.current = undefined;
        setState(s => Object.assign({}, s, {
          attributes: {},
          styles: {
            popper: {}
          }
        }));
      }
    };
    // This is only run once to _create_ the popper
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, referenceElement, popperElement]);
  return popperState;
}
/* harmony default export */ const esm_usePopper = (usePopper);
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/contains.js
/* eslint-disable no-bitwise, no-cond-assign */

/**
 * Checks if an element contains another given element.
 * 
 * @param context the context element
 * @param node the element to check
 */
function contains_contains(context, node) {
  // HTML DOM and SVG DOM may have different support levels,
  // so we need to check on context instead of a document root element.
  if (context.contains) return context.contains(node);
  if (context.compareDocumentPosition) return context === node || !!(context.compareDocumentPosition(node) & 16);
}
// EXTERNAL MODULE: ./node_modules/warning/warning.js
var warning = __webpack_require__(459);
var warning_default = /*#__PURE__*/__webpack_require__.n(warning);
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/useClickOutside.js






const useClickOutside_noop = () => {};
function isLeftClickEvent(event) {
  return event.button === 0;
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
const getRefTarget = ref => ref && ('current' in ref ? ref.current : ref);
const InitialTriggerEvents = {
  click: 'mousedown',
  mouseup: 'mousedown',
  pointerup: 'pointerdown'
};

/**
 * The `useClickOutside` hook registers your callback on the document that fires
 * when a pointer event is registered outside of the provided ref or element.
 *
 * @param {Ref<HTMLElement>| HTMLElement} ref  The element boundary
 * @param {function} onClickOutside
 * @param {object=}  options
 * @param {boolean=} options.disabled
 * @param {string=}  options.clickTrigger The DOM event name (click, mousedown, etc) to attach listeners on
 */
function useClickOutside(ref, onClickOutside = useClickOutside_noop, {
  disabled,
  clickTrigger = 'click'
} = {}) {
  const preventMouseClickOutsideRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(false);
  const waitingForTrigger = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(false);
  const handleMouseCapture = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(e => {
    const currentTarget = getRefTarget(ref);
    warning_default()(!!currentTarget, 'ClickOutside captured a close event but does not have a ref to compare it to. ' + 'useClickOutside(), should be passed a ref that resolves to a DOM node');
    preventMouseClickOutsideRef.current = !currentTarget || isModifiedEvent(e) || !isLeftClickEvent(e) || !!contains_contains(currentTarget, e.target) || waitingForTrigger.current;
    waitingForTrigger.current = false;
  }, [ref]);
  const handleInitialMouse = useEventCallback(e => {
    const currentTarget = getRefTarget(ref);
    if (currentTarget && contains_contains(currentTarget, e.target)) {
      waitingForTrigger.current = true;
    }
  });
  const handleMouse = useEventCallback(e => {
    if (!preventMouseClickOutsideRef.current) {
      onClickOutside(e);
    }
  });
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    var _ownerWindow$event, _ownerWindow$parent;
    if (disabled || ref == null) return undefined;
    const doc = ownerDocument(getRefTarget(ref));
    const ownerWindow = doc.defaultView || window;

    // Store the current event to avoid triggering handlers immediately
    // For things rendered in an iframe, the event might originate on the parent window
    // so we should fall back to that global event if the local one doesn't exist
    // https://github.com/facebook/react/issues/20074
    let currentEvent = (_ownerWindow$event = ownerWindow.event) != null ? _ownerWindow$event : (_ownerWindow$parent = ownerWindow.parent) == null ? void 0 : _ownerWindow$parent.event;
    let removeInitialTriggerListener = null;
    if (InitialTriggerEvents[clickTrigger]) {
      removeInitialTriggerListener = esm_listen(doc, InitialTriggerEvents[clickTrigger], handleInitialMouse, true);
    }

    // Use capture for this listener so it fires before React's listener, to
    // avoid false positives in the contains() check below if the target DOM
    // element is removed in the React mouse callback.
    const removeMouseCaptureListener = esm_listen(doc, clickTrigger, handleMouseCapture, true);
    const removeMouseListener = esm_listen(doc, clickTrigger, e => {
      // skip if this event is the same as the one running when we added the handlers
      if (e === currentEvent) {
        currentEvent = undefined;
        return;
      }
      handleMouse(e);
    });
    let mobileSafariHackListeners = [];
    if ('ontouchstart' in doc.documentElement) {
      mobileSafariHackListeners = [].slice.call(doc.body.children).map(el => esm_listen(el, 'mousemove', useClickOutside_noop));
    }
    return () => {
      removeInitialTriggerListener == null ? void 0 : removeInitialTriggerListener();
      removeMouseCaptureListener();
      removeMouseListener();
      mobileSafariHackListeners.forEach(remove => remove());
    };
  }, [ref, disabled, clickTrigger, handleMouseCapture, handleInitialMouse, handleMouse]);
}
/* harmony default export */ const esm_useClickOutside = (useClickOutside);
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/mergeOptionsWithPopperConfig.js
function toModifierMap(modifiers) {
  const result = {};
  if (!Array.isArray(modifiers)) {
    return modifiers || result;
  }

  // eslint-disable-next-line no-unused-expressions
  modifiers == null ? void 0 : modifiers.forEach(m => {
    result[m.name] = m;
  });
  return result;
}
function toModifierArray(map = {}) {
  if (Array.isArray(map)) return map;
  return Object.keys(map).map(k => {
    map[k].name = k;
    return map[k];
  });
}
function mergeOptionsWithPopperConfig({
  enabled,
  enableEvents,
  placement,
  flip,
  offset,
  fixed,
  containerPadding,
  arrowElement,
  popperConfig = {}
}) {
  var _modifiers$eventListe, _modifiers$preventOve, _modifiers$preventOve2, _modifiers$offset, _modifiers$arrow;
  const modifiers = toModifierMap(popperConfig.modifiers);
  return Object.assign({}, popperConfig, {
    placement,
    enabled,
    strategy: fixed ? 'fixed' : popperConfig.strategy,
    modifiers: toModifierArray(Object.assign({}, modifiers, {
      eventListeners: {
        enabled: enableEvents,
        options: (_modifiers$eventListe = modifiers.eventListeners) == null ? void 0 : _modifiers$eventListe.options
      },
      preventOverflow: Object.assign({}, modifiers.preventOverflow, {
        options: containerPadding ? Object.assign({
          padding: containerPadding
        }, (_modifiers$preventOve = modifiers.preventOverflow) == null ? void 0 : _modifiers$preventOve.options) : (_modifiers$preventOve2 = modifiers.preventOverflow) == null ? void 0 : _modifiers$preventOve2.options
      }),
      offset: {
        options: Object.assign({
          offset
        }, (_modifiers$offset = modifiers.offset) == null ? void 0 : _modifiers$offset.options)
      },
      arrow: Object.assign({}, modifiers.arrow, {
        enabled: !!arrowElement,
        options: Object.assign({}, (_modifiers$arrow = modifiers.arrow) == null ? void 0 : _modifiers$arrow.options, {
          element: arrowElement
        })
      }),
      flip: Object.assign({
        enabled: !!flip
      }, modifiers.flip)
    }))
  });
}
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/DropdownMenu.js
const DropdownMenu_excluded = ["children"];
function DropdownMenu_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}









const DropdownMenu_noop = () => {};

/**
 * @memberOf Dropdown
 * @param {object}  options
 * @param {boolean} options.flip Automatically adjust the menu `drop` position based on viewport edge detection
 * @param {[number, number]} options.offset Define an offset distance between the Menu and the Toggle
 * @param {boolean} options.show Display the menu manually, ignored in the context of a `Dropdown`
 * @param {boolean} options.usePopper opt in/out of using PopperJS to position menus. When disabled you must position it yourself.
 * @param {string}  options.rootCloseEvent The pointer event to listen for when determining "clicks outside" the menu for triggering a close.
 * @param {object}  options.popperConfig Options passed to the [`usePopper`](/api/usePopper) hook.
 */
function useDropdownMenu(options = {}) {
  const context = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(esm_DropdownContext);
  const [arrowElement, attachArrowRef] = useCallbackRef();
  const hasShownRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(false);
  const {
    flip,
    offset,
    rootCloseEvent,
    fixed = false,
    placement: placementOverride,
    popperConfig = {},
    enableEventListeners = true,
    usePopper: shouldUsePopper = !!context
  } = options;
  const show = (context == null ? void 0 : context.show) == null ? !!options.show : context.show;
  if (show && !hasShownRef.current) {
    hasShownRef.current = true;
  }
  const handleClose = e => {
    context == null ? void 0 : context.toggle(false, e);
  };
  const {
    placement,
    setMenu,
    menuElement,
    toggleElement
  } = context || {};
  const popper = esm_usePopper(toggleElement, menuElement, mergeOptionsWithPopperConfig({
    placement: placementOverride || placement || 'bottom-start',
    enabled: shouldUsePopper,
    enableEvents: enableEventListeners == null ? show : enableEventListeners,
    offset,
    flip,
    fixed,
    arrowElement,
    popperConfig
  }));
  const menuProps = Object.assign({
    ref: setMenu || DropdownMenu_noop,
    'aria-labelledby': toggleElement == null ? void 0 : toggleElement.id
  }, popper.attributes.popper, {
    style: popper.styles.popper
  });
  const metadata = {
    show,
    placement,
    hasShown: hasShownRef.current,
    toggle: context == null ? void 0 : context.toggle,
    popper: shouldUsePopper ? popper : null,
    arrowProps: shouldUsePopper ? Object.assign({
      ref: attachArrowRef
    }, popper.attributes.arrow, {
      style: popper.styles.arrow
    }) : {}
  };
  esm_useClickOutside(menuElement, handleClose, {
    clickTrigger: rootCloseEvent,
    disabled: !show
  });
  return [menuProps, metadata];
}
const defaultProps = {
  usePopper: true
};
/**
 * Also exported as `<Dropdown.Menu>` from `Dropdown`.
 *
 * @displayName DropdownMenu
 * @memberOf Dropdown
 */
function DropdownMenu(_ref) {
  let {
      children
    } = _ref,
    options = DropdownMenu_objectWithoutPropertiesLoose(_ref, DropdownMenu_excluded);
  const [props, meta] = useDropdownMenu(options);
  return /*#__PURE__*/(0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
    children: children(props, meta)
  });
}
DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.defaultProps = defaultProps;

/** @component */
/* harmony default export */ const esm_DropdownMenu = (DropdownMenu);
;// CONCATENATED MODULE: ./node_modules/@react-aria/ssr/dist/import.mjs


/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // We must avoid a circular dependency with @react-aria/utils, and this useLayoutEffect is
// guarded by a check that it only runs on the client side.
// eslint-disable-next-line rulesdir/useLayoutEffectRule

// Default context value to use in case there is no SSRProvider. This is fine for
// client-only apps. In order to support multiple copies of React Aria potentially
// being on the page at once, the prefix is set to a random number. SSRProvider
// will reset this to zero for consistency between server and client, so in the
// SSR case multiple copies of React Aria is not supported.
const $704cf1d3b684cc5c$var$defaultContext = {
    prefix: String(Math.round(Math.random() * 10000000000)),
    current: 0,
    isSSR: false
};
const $704cf1d3b684cc5c$var$SSRContext = /*#__PURE__*/ (0, external_root_React_commonjs2_react_commonjs_react_amd_react_).createContext($704cf1d3b684cc5c$var$defaultContext);
function $704cf1d3b684cc5c$export$9f8ac96af4b1b2ae(props) {
    let cur = (0, external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)($704cf1d3b684cc5c$var$SSRContext);
    let counter = $704cf1d3b684cc5c$var$useCounter(cur === $704cf1d3b684cc5c$var$defaultContext);
    let [isSSR, setIsSSR] = (0, external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(true);
    let value = (0, external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(()=>({
            // If this is the first SSRProvider, start with an empty string prefix, otherwise
            // append and increment the counter.
            prefix: cur === $704cf1d3b684cc5c$var$defaultContext ? "" : `${cur.prefix}-${counter}`,
            current: 0,
            isSSR: isSSR
        }), [
        cur,
        counter,
        isSSR
    ]);
    // If on the client, and the component was initially server rendered,
    // then schedule a layout effect to update the component after hydration.
    if (typeof window !== "undefined") // This if statement technically breaks the rules of hooks, but is safe
    // because the condition never changes after mounting.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, external_root_React_commonjs2_react_commonjs_react_amd_react_.useLayoutEffect)(()=>{
        setIsSSR(false);
    }, []);
    return /*#__PURE__*/ (0, external_root_React_commonjs2_react_commonjs_react_amd_react_).createElement($704cf1d3b684cc5c$var$SSRContext.Provider, {
        value: value
    }, props.children);
}
let $704cf1d3b684cc5c$var$canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
let $704cf1d3b684cc5c$var$componentIds = new WeakMap();
function $704cf1d3b684cc5c$var$useCounter(isDisabled = false) {
    let ctx = (0, external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)($704cf1d3b684cc5c$var$SSRContext);
    let ref = (0, external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
    if (ref.current === null && !isDisabled) {
        var _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner;
        // In strict mode, React renders components twice, and the ref will be reset to null on the second render.
        // This means our id counter will be incremented twice instead of once. This is a problem because on the
        // server, components are only rendered once and so ids generated on the server won't match the client.
        // In React 18, useId was introduced to solve this, but it is not available in older versions. So to solve this
        // we need to use some React internals to access the underlying Fiber instance, which is stable between renders.
        // This is exposed as ReactCurrentOwner in development, which is all we need since StrictMode only runs in development.
        // To ensure that we only increment the global counter once, we store the starting id for this component in
        // a weak map associated with the Fiber. On the second render, we reset the global counter to this value.
        // Since React runs the second render immediately after the first, this is safe.
        // @ts-ignore
        let currentOwner = (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = (0, external_root_React_commonjs2_react_commonjs_react_amd_react_).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === void 0 ? void 0 : (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner = _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner === void 0 ? void 0 : _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner.current;
        if (currentOwner) {
            let prevComponentValue = $704cf1d3b684cc5c$var$componentIds.get(currentOwner);
            if (prevComponentValue == null) // On the first render, and first call to useId, store the id and state in our weak map.
            $704cf1d3b684cc5c$var$componentIds.set(currentOwner, {
                id: ctx.current,
                state: currentOwner.memoizedState
            });
            else if (currentOwner.memoizedState !== prevComponentValue.state) {
                // On the second render, the memoizedState gets reset by React.
                // Reset the counter, and remove from the weak map so we don't
                // do this for subsequent useId calls.
                ctx.current = prevComponentValue.id;
                $704cf1d3b684cc5c$var$componentIds.delete(currentOwner);
            }
        }
        ref.current = ++ctx.current;
    }
    return ref.current;
}
function $704cf1d3b684cc5c$export$619500959fc48b26(defaultId) {
    let ctx = (0, external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)($704cf1d3b684cc5c$var$SSRContext);
    // If we are rendering in a non-DOM environment, and there's no SSRProvider,
    // provide a warning to hint to the developer to add one.
    if (ctx === $704cf1d3b684cc5c$var$defaultContext && !$704cf1d3b684cc5c$var$canUseDOM) console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");
    let counter = $704cf1d3b684cc5c$var$useCounter(!!defaultId);
    return defaultId || `react-aria${ctx.prefix}-${counter}`;
}
function $704cf1d3b684cc5c$export$535bd6ca7f90a273() {
    let cur = (0, $89yE2$useContext)($704cf1d3b684cc5c$var$SSRContext);
    return cur.isSSR;
}





//# sourceMappingURL=module.js.map

;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/DropdownToggle.js






const isRoleMenu = el => {
  var _el$getAttribute;
  return ((_el$getAttribute = el.getAttribute('role')) == null ? void 0 : _el$getAttribute.toLowerCase()) === 'menu';
};
const DropdownToggle_noop = () => {};

/**
 * Wires up Dropdown toggle functionality, returning a set a props to attach
 * to the element that functions as the dropdown toggle (generally a button).
 *
 * @memberOf Dropdown
 */
function useDropdownToggle() {
  const id = $704cf1d3b684cc5c$export$619500959fc48b26();
  const {
    show = false,
    toggle = DropdownToggle_noop,
    setToggle,
    menuElement
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(esm_DropdownContext) || {};
  const handleClick = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(e => {
    toggle(!show, e);
  }, [show, toggle]);
  const props = {
    id,
    ref: setToggle || DropdownToggle_noop,
    onClick: handleClick,
    'aria-expanded': !!show
  };

  // This is maybe better down in an effect, but
  // the component is going to update anyway when the menu element
  // is set so might return new props.
  if (menuElement && isRoleMenu(menuElement)) {
    props['aria-haspopup'] = true;
  }
  return [props, {
    show,
    toggle
  }];
}
/**
 * Also exported as `<Dropdown.Toggle>` from `Dropdown`.
 *
 * @displayName DropdownToggle
 * @memberOf Dropdown
 */
function DropdownToggle({
  children
}) {
  const [props, meta] = useDropdownToggle();
  return /*#__PURE__*/(0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
    children: children(props, meta)
  });
}
DropdownToggle.displayName = 'DropdownToggle';

/** @component */
/* harmony default export */ const esm_DropdownToggle = (DropdownToggle);
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/SelectableContext.js

const SelectableContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.createContext(null);
const makeEventKey = (eventKey, href = null) => {
  if (eventKey != null) return String(eventKey);
  return href || null;
};
/* harmony default export */ const esm_SelectableContext = (SelectableContext);
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/NavContext.js

const NavContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.createContext(null);
NavContext.displayName = 'NavContext';
/* harmony default export */ const esm_NavContext = (NavContext);
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/DataKey.js
const ATTRIBUTE_PREFIX = `data-rr-ui-`;
const PROPERTY_PREFIX = `rrUi`;
function dataAttr(property) {
  return `${ATTRIBUTE_PREFIX}${property}`;
}
function dataProp(property) {
  return `${PROPERTY_PREFIX}${property}`;
}
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/DropdownItem.js
const DropdownItem_excluded = ["eventKey", "disabled", "onClick", "active", "as"];
function DropdownItem_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}








/**
 * Create a dropdown item. Returns a set of props for the dropdown item component
 * including an `onClick` handler that prevents selection when the item is disabled
 */
function useDropdownItem({
  key,
  href,
  active,
  disabled,
  onClick
}) {
  const onSelectCtx = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(esm_SelectableContext);
  const navContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(esm_NavContext);
  const {
    activeKey
  } = navContext || {};
  const eventKey = makeEventKey(key, href);
  const isActive = active == null && key != null ? makeEventKey(activeKey) === eventKey : active;
  const handleClick = useEventCallback(event => {
    if (disabled) return;
    onClick == null ? void 0 : onClick(event);
    if (onSelectCtx && !event.isPropagationStopped()) {
      onSelectCtx(eventKey, event);
    }
  });
  return [{
    onClick: handleClick,
    'aria-disabled': disabled || undefined,
    'aria-selected': isActive,
    [dataAttr('dropdown-item')]: ''
  }, {
    isActive
  }];
}
const DropdownItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((_ref, ref) => {
  let {
      eventKey,
      disabled,
      onClick,
      active,
      as: Component = esm_Button
    } = _ref,
    props = DropdownItem_objectWithoutPropertiesLoose(_ref, DropdownItem_excluded);
  const [dropdownItemProps] = useDropdownItem({
    key: eventKey,
    href: props.href,
    disabled,
    onClick,
    active
  });
  return /*#__PURE__*/(0,jsx_runtime.jsx)(Component, Object.assign({}, props, {
    ref: ref
  }, dropdownItemProps));
});
DropdownItem.displayName = 'DropdownItem';
/* harmony default export */ const esm_DropdownItem = (DropdownItem);
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/useWindow.js


const Context = /*#__PURE__*/(0,external_root_React_commonjs2_react_commonjs_react_amd_react_.createContext)(canUseDOM ? window : undefined);
const WindowProvider = Context.Provider;

/**
 * The document "window" placed in React context. Helpful for determining
 * SSR context, or when rendering into an iframe.
 *
 * @returns the current window
 */
function useWindow() {
  return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(Context);
}
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/Dropdown.js

















function useRefWithUpdate() {
  const forceUpdate = useForceUpdate();
  const ref = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  const attachRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(element => {
    ref.current = element;
    // ensure that a menu set triggers an update for consumers
    forceUpdate();
  }, [forceUpdate]);
  return [ref, attachRef];
}

/**
 * @displayName Dropdown
 * @public
 */
function Dropdown({
  defaultShow,
  show: rawShow,
  onSelect,
  onToggle: rawOnToggle,
  itemSelector = `* [${dataAttr('dropdown-item')}]`,
  focusFirstItemOnShow,
  placement = 'bottom-start',
  children
}) {
  const window = useWindow();
  const [show, onToggle] = esm_useUncontrolledProp(rawShow, defaultShow, rawOnToggle);

  // We use normal refs instead of useCallbackRef in order to populate the
  // the value as quickly as possible, otherwise the effect to focus the element
  // may run before the state value is set
  const [menuRef, setMenu] = useRefWithUpdate();
  const menuElement = menuRef.current;
  const [toggleRef, setToggle] = useRefWithUpdate();
  const toggleElement = toggleRef.current;
  const lastShow = usePrevious(show);
  const lastSourceEvent = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  const focusInDropdown = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(false);
  const onSelectCtx = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(esm_SelectableContext);
  const toggle = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)((nextShow, event, source = event == null ? void 0 : event.type) => {
    onToggle(nextShow, {
      originalEvent: event,
      source
    });
  }, [onToggle]);
  const handleSelect = useEventCallback((key, event) => {
    onSelect == null ? void 0 : onSelect(key, event);
    toggle(false, event, 'select');
    if (!event.isPropagationStopped()) {
      onSelectCtx == null ? void 0 : onSelectCtx(key, event);
    }
  });
  const context = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({
    toggle,
    placement,
    show,
    menuElement,
    toggleElement,
    setMenu,
    setToggle
  }), [toggle, placement, show, menuElement, toggleElement, setMenu, setToggle]);
  if (menuElement && lastShow && !show) {
    focusInDropdown.current = menuElement.contains(menuElement.ownerDocument.activeElement);
  }
  const focusToggle = useEventCallback(() => {
    if (toggleElement && toggleElement.focus) {
      toggleElement.focus();
    }
  });
  const maybeFocusFirst = useEventCallback(() => {
    const type = lastSourceEvent.current;
    let focusType = focusFirstItemOnShow;
    if (focusType == null) {
      focusType = menuRef.current && isRoleMenu(menuRef.current) ? 'keyboard' : false;
    }
    if (focusType === false || focusType === 'keyboard' && !/^key.+$/.test(type)) {
      return;
    }
    const first = qsa(menuRef.current, itemSelector)[0];
    if (first && first.focus) first.focus();
  });
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    if (show) maybeFocusFirst();else if (focusInDropdown.current) {
      focusInDropdown.current = false;
      focusToggle();
    }
    // only `show` should be changing
  }, [show, focusInDropdown, focusToggle, maybeFocusFirst]);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    lastSourceEvent.current = null;
  });
  const getNextFocusedChild = (current, offset) => {
    if (!menuRef.current) return null;
    const items = qsa(menuRef.current, itemSelector);
    let index = items.indexOf(current) + offset;
    index = Math.max(0, Math.min(index, items.length));
    return items[index];
  };
  useEventListener_useEventListener((0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(() => window.document, [window]), 'keydown', event => {
    var _menuRef$current, _toggleRef$current;
    const {
      key
    } = event;
    const target = event.target;
    const fromMenu = (_menuRef$current = menuRef.current) == null ? void 0 : _menuRef$current.contains(target);
    const fromToggle = (_toggleRef$current = toggleRef.current) == null ? void 0 : _toggleRef$current.contains(target);

    // Second only to https://github.com/twbs/bootstrap/blob/8cfbf6933b8a0146ac3fbc369f19e520bd1ebdac/js/src/dropdown.js#L400
    // in inscrutability
    const isInput = /input|textarea/i.test(target.tagName);
    if (isInput && (key === ' ' || key !== 'Escape' && fromMenu || key === 'Escape' && target.type === 'search')) {
      return;
    }
    if (!fromMenu && !fromToggle) {
      return;
    }
    if (key === 'Tab' && (!menuRef.current || !show)) {
      return;
    }
    lastSourceEvent.current = event.type;
    const meta = {
      originalEvent: event,
      source: event.type
    };
    switch (key) {
      case 'ArrowUp':
        {
          const next = getNextFocusedChild(target, -1);
          if (next && next.focus) next.focus();
          event.preventDefault();
          return;
        }
      case 'ArrowDown':
        event.preventDefault();
        if (!show) {
          onToggle(true, meta);
        } else {
          const next = getNextFocusedChild(target, 1);
          if (next && next.focus) next.focus();
        }
        return;
      case 'Tab':
        // on keydown the target is the element being tabbed FROM, we need that
        // to know if this event is relevant to this dropdown (e.g. in this menu).
        // On `keyup` the target is the element being tagged TO which we use to check
        // if focus has left the menu
        esm_addEventListener(target.ownerDocument, 'keyup', e => {
          var _menuRef$current2;
          if (e.key === 'Tab' && !e.target || !((_menuRef$current2 = menuRef.current) != null && _menuRef$current2.contains(e.target))) {
            onToggle(false, meta);
          }
        }, {
          once: true
        });
        break;
      case 'Escape':
        if (key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
        }
        onToggle(false, meta);
        break;
      default:
    }
  });
  return /*#__PURE__*/(0,jsx_runtime.jsx)(esm_SelectableContext.Provider, {
    value: handleSelect,
    children: /*#__PURE__*/(0,jsx_runtime.jsx)(esm_DropdownContext.Provider, {
      value: context,
      children: children
    })
  });
}
Dropdown.displayName = 'Dropdown';
Dropdown.Menu = esm_DropdownMenu;
Dropdown.Toggle = esm_DropdownToggle;
Dropdown.Item = esm_DropdownItem;
/* harmony default export */ const esm_Dropdown = (Dropdown);
;// CONCATENATED MODULE: ./src/DropdownContext.ts

const DropdownContext_DropdownContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.createContext({});
DropdownContext_DropdownContext.displayName = 'DropdownContext';
/* harmony default export */ const src_DropdownContext = (DropdownContext_DropdownContext);
;// CONCATENATED MODULE: ./src/DropdownDivider.tsx
var DropdownDivider_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/DropdownDivider.tsx";




const DropdownDivider = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'hr',
  role = 'separator',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'dropdown-divider');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    role: role,
    ...props
  }, void 0, false, {
    fileName: DropdownDivider_jsxFileName,
    lineNumber: 20,
    columnNumber: 7
  }, undefined);
});
DropdownDivider.displayName = 'DropdownDivider';
/* harmony default export */ const src_DropdownDivider = (DropdownDivider);
;// CONCATENATED MODULE: ./src/DropdownHeader.tsx
var DropdownHeader_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/DropdownHeader.tsx";




const DropdownHeader = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  role = 'heading',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'dropdown-header');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    role: role,
    ...props
  }, void 0, false, {
    fileName: DropdownHeader_jsxFileName,
    lineNumber: 20,
    columnNumber: 7
  }, undefined);
});
DropdownHeader.displayName = 'DropdownHeader';
/* harmony default export */ const src_DropdownHeader = (DropdownHeader);
;// CONCATENATED MODULE: ./src/DropdownItem.tsx
var DropdownItem_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/DropdownItem.tsx";







const DropdownItem_propTypes = {
  /** @default 'dropdown-item' */
  bsPrefix: (prop_types_default()).string,
  /**
   * Highlight the menu item as active.
   */
  active: (prop_types_default()).bool,
  /**
   * Disable the menu item, making it unselectable.
   */
  disabled: (prop_types_default()).bool,
  /**
   * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
   */
  eventKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]),
  /**
   * HTML `href` attribute corresponding to `a.href`.
   */
  href: (prop_types_default()).string,
  /**
   * Callback fired when the menu item is clicked.
   */
  onClick: (prop_types_default()).func,
  as: (prop_types_default()).elementType
};
const DropdownItem_DropdownItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  eventKey,
  disabled = false,
  onClick,
  active,
  as: Component = esm_Anchor,
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-item');
  const [dropdownItemProps, meta] = useDropdownItem({
    key: eventKey,
    href: props.href,
    disabled,
    onClick,
    active
  });
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ...props,
    ...dropdownItemProps,
    ref: ref,
    className: classnames_default()(className, prefix, meta.isActive && 'active', disabled && 'disabled')
  }, void 0, false, {
    fileName: DropdownItem_jsxFileName,
    lineNumber: 73,
    columnNumber: 9
  }, undefined);
});
DropdownItem_DropdownItem.displayName = 'DropdownItem';
DropdownItem_DropdownItem.propTypes = DropdownItem_propTypes;
/* harmony default export */ const src_DropdownItem = (DropdownItem_DropdownItem);
;// CONCATENATED MODULE: ./src/DropdownItemText.tsx
var DropdownItemText_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/DropdownItemText.tsx";




const DropdownItemText = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'span',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'dropdown-item-text');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: DropdownItemText_jsxFileName,
    lineNumber: 17,
    columnNumber: 7
  }, undefined);
});
DropdownItemText.displayName = 'DropdownItemText';
/* harmony default export */ const src_DropdownItemText = (DropdownItemText);
;// CONCATENATED MODULE: ./src/InputGroupContext.tsx

const InputGroupContext_context = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.createContext(null);
InputGroupContext_context.displayName = 'InputGroupContext';
/* harmony default export */ const InputGroupContext = (InputGroupContext_context);
;// CONCATENATED MODULE: ./src/NavbarContext.tsx


// TODO: check

const NavbarContext_context = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.createContext(null);
NavbarContext_context.displayName = 'NavbarContext';
/* harmony default export */ const NavbarContext = (NavbarContext_context);
;// CONCATENATED MODULE: ./src/useWrappedRefWithWarning.tsx



function useWrappedRefWithWarning(ref, componentName) {
  // @ts-ignore
  if (true) return ref;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const warningRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(refValue => {
    !(refValue == null || !refValue.isReactComponent) ?  false ? 0 : browser_default()(false) : void 0;
  }, [componentName]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return esm_useMergedRefs(warningRef, ref);
}
;// CONCATENATED MODULE: ./src/types.tsx

const alignDirection = prop_types_default().oneOf(['start', 'end']);
const alignPropType = prop_types_default().oneOfType([alignDirection, prop_types_default().shape({
  sm: alignDirection
}), prop_types_default().shape({
  md: alignDirection
}), prop_types_default().shape({
  lg: alignDirection
}), prop_types_default().shape({
  xl: alignDirection
}), prop_types_default().shape({
  xxl: alignDirection
}), (prop_types_default()).object]);
;// CONCATENATED MODULE: ./src/DropdownMenu.tsx
var DropdownMenu_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/DropdownMenu.tsx";















const DropdownMenu_propTypes = {
  /**
   * @default 'dropdown-menu'
   */
  bsPrefix: (prop_types_default()).string,
  /** Controls the visibility of the Dropdown menu  */
  show: (prop_types_default()).bool,
  /** Whether to render the dropdown menu in the DOM before the first time it is shown */
  renderOnMount: (prop_types_default()).bool,
  /** Have the dropdown switch to it's opposite placement when necessary to stay on screen. */
  flip: (prop_types_default()).bool,
  /**
   * Aligns the dropdown menu to the specified side of the container. You can also align
   * the menu responsively for breakpoints starting at `sm` and up. The alignment
   * direction will affect the specified breakpoint or larger.
   *
   * *Note: Using responsive alignment will disable Popper usage for positioning.*
   *
   * @type {"start"|"end"|{ sm: "start"|"end" }|{ md: "start"|"end" }|{ lg: "start"|"end" }|{ xl: "start"|"end"}|{ xxl: "start"|"end"} }
   */
  align: alignPropType,
  /**
   * Which event when fired outside the component will cause it to be closed
   *
   * *Note: For custom dropdown components, you will have to pass the
   * `rootCloseEvent` to `<RootCloseWrapper>` in your custom dropdown menu
   * component ([similarly to how it is implemented in `<Dropdown.Menu>`](https://github.com/react-bootstrap/react-bootstrap/blob/v0.31.5/src/DropdownMenu.js#L115-L119)).*
   */
  rootCloseEvent: prop_types_default().oneOf(['click', 'mousedown']),
  /**
   * Control the rendering of the DropdownMenu. All non-menu props
   * (listed here) are passed through to the `as` Component.
   *
   * If providing a custom, non DOM, component. the `show`, `close` and `align` props
   * are also injected and should be handled appropriately.
   */
  as: (prop_types_default()).elementType,
  /**
   * A set of popper options and props passed directly to Popper.
   */
  popperConfig: (prop_types_default()).object,
  /**
   * Menu color variant.
   *
   * Omitting this will use the default light color.
   */
  variant: (prop_types_default()).string
};
function getDropdownMenuPlacement(alignEnd, dropDirection, isRTL) {
  const topStart = isRTL ? 'top-end' : 'top-start';
  const topEnd = isRTL ? 'top-start' : 'top-end';
  const bottomStart = isRTL ? 'bottom-end' : 'bottom-start';
  const bottomEnd = isRTL ? 'bottom-start' : 'bottom-end';
  const leftStart = isRTL ? 'right-start' : 'left-start';
  const leftEnd = isRTL ? 'right-end' : 'left-end';
  const rightStart = isRTL ? 'left-start' : 'right-start';
  const rightEnd = isRTL ? 'left-end' : 'right-end';
  let placement = alignEnd ? bottomEnd : bottomStart;
  if (dropDirection === 'up') placement = alignEnd ? topEnd : topStart;else if (dropDirection === 'end') placement = alignEnd ? rightEnd : rightStart;else if (dropDirection === 'start') placement = alignEnd ? leftEnd : leftStart;else if (dropDirection === 'down-centered') placement = 'bottom';else if (dropDirection === 'up-centered') placement = 'top';
  return placement;
}
const DropdownMenu_DropdownMenu = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  align,
  rootCloseEvent,
  flip = true,
  show: showProps,
  renderOnMount,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  popperConfig,
  variant,
  ...props
}, ref) => {
  let alignEnd = false;
  const isNavbar = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(NavbarContext);
  const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-menu');
  const {
    align: contextAlign,
    drop,
    isRTL
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_DropdownContext);
  align = align || contextAlign;
  const isInputGroup = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(InputGroupContext);
  const alignClasses = [];
  if (align) {
    if (typeof align === 'object') {
      const keys = Object.keys(align);
       false ? 0 : void 0;
      if (keys.length) {
        const brkPoint = keys[0];
        const direction = align[brkPoint];

        // .dropdown-menu-end is required for responsively aligning
        // left in addition to align left classes.
        alignEnd = direction === 'start';
        alignClasses.push(`${prefix}-${brkPoint}-${direction}`);
      }
    } else if (align === 'end') {
      alignEnd = true;
    }
  }
  const placement = getDropdownMenuPlacement(alignEnd, drop, isRTL);
  const [menuProps, {
    hasShown,
    popper,
    show,
    toggle
  }] = useDropdownMenu({
    flip,
    rootCloseEvent,
    show: showProps,
    usePopper: !isNavbar && alignClasses.length === 0,
    offset: [0, 2],
    popperConfig,
    placement
  });
  menuProps.ref = esm_useMergedRefs(useWrappedRefWithWarning(ref, 'DropdownMenu'), menuProps.ref);
  useIsomorphicEffect(() => {
    // Popper's initial position for the menu is incorrect when
    // renderOnMount=true. Need to call update() to correct it.
    if (show) popper == null ? void 0 : popper.update();
  }, [show]);
  if (!hasShown && !renderOnMount && !isInputGroup) return null;

  // For custom components provide additional, non-DOM, props;
  if (typeof Component !== 'string') {
    menuProps.show = show;
    menuProps.close = () => toggle == null ? void 0 : toggle(false);
    menuProps.align = align;
  }
  let style = props.style;
  if (popper != null && popper.placement) {
    // we don't need the default popper style,
    // menus are display: none when not shown.
    style = {
      ...props.style,
      ...menuProps.style
    };
    props['x-placement'] = popper.placement;
  }
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ...props,
    ...menuProps,
    style: style
    // Bootstrap css requires this data attrib to style responsive menus.
    ,
    ...((alignClasses.length || isNavbar) && {
      'data-bs-popper': 'static'
    }),
    className: classnames_default()(className, prefix, show && 'show', alignEnd && `${prefix}-end`, variant && `${prefix}-${variant}`, ...alignClasses)
  }, void 0, false, {
    fileName: DropdownMenu_jsxFileName,
    lineNumber: 207,
    columnNumber: 9
  }, undefined);
});
DropdownMenu_DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu_DropdownMenu.propTypes = DropdownMenu_propTypes;
/* harmony default export */ const src_DropdownMenu = (DropdownMenu_DropdownMenu);
;// CONCATENATED MODULE: ./src/DropdownToggle.tsx
var DropdownToggle_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/DropdownToggle.tsx";











const DropdownToggle_propTypes = {
  /**
   * @default 'dropdown-toggle'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   */
  id: (prop_types_default()).string,
  split: (prop_types_default()).bool,
  as: (prop_types_default()).elementType,
  /**
   * to passthrough to the underlying button or whatever from DropdownButton
   * @private
   */
  childBsPrefix: (prop_types_default()).string
};
const DropdownToggle_DropdownToggle = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  split,
  className,
  childBsPrefix,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = src_Button,
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-toggle');
  const dropdownContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(esm_DropdownContext);
  if (childBsPrefix !== undefined) {
    props.bsPrefix = childBsPrefix;
  }
  const [toggleProps] = useDropdownToggle();
  toggleProps.ref = esm_useMergedRefs(toggleProps.ref, useWrappedRefWithWarning(ref, 'DropdownToggle'));

  // This intentionally forwards size and variant (if set) to the
  // underlying component, to allow it to render size and style variants.
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    className: classnames_default()(className, prefix, split && `${prefix}-split`, (dropdownContext == null ? void 0 : dropdownContext.show) && 'show'),
    ...toggleProps,
    ...props
  }, void 0, false, {
    fileName: DropdownToggle_jsxFileName,
    lineNumber: 81,
    columnNumber: 7
  }, undefined);
});
DropdownToggle_DropdownToggle.displayName = 'DropdownToggle';
DropdownToggle_DropdownToggle.propTypes = DropdownToggle_propTypes;
/* harmony default export */ const src_DropdownToggle = (DropdownToggle_DropdownToggle);
;// CONCATENATED MODULE: ./src/Dropdown.tsx
var Dropdown_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Dropdown.tsx";


















const Dropdown_propTypes = {
  /** @default 'dropdown' */
  bsPrefix: (prop_types_default()).string,
  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   */
  drop: prop_types_default().oneOf(['up', 'up-centered', 'start', 'end', 'down', 'down-centered']),
  as: (prop_types_default()).elementType,
  /**
   * Aligns the dropdown menu to the specified side of the Dropdown toggle. You can
   * also align the menu responsively for breakpoints starting at `sm` and up.
   * The alignment direction will affect the specified breakpoint or larger.
   *
   * *Note: Using responsive alignment will disable Popper usage for positioning.*
   *
   * @type {"start"|"end"|{ sm: "start"|"end" }|{ md: "start"|"end" }|{ lg: "start"|"end" }|{ xl: "start"|"end"}|{ xxl: "start"|"end"} }
   */
  align: alignPropType,
  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  show: (prop_types_default()).bool,
  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `show` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(
   *   nextShow: boolean,
   *   meta: ToggleMetadata,
   * ): void
   * ```
   *
   * @controllable show
   */
  onToggle: (prop_types_default()).func,
  /**
   * A callback fired when a menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: (prop_types_default()).func,
  /**
   * Controls the focus behavior for when the Dropdown is opened. Set to
   * `true` to always focus the first menu item, `keyboard` to focus only when
   * navigating via the keyboard, or `false` to disable completely
   *
   * The Default behavior is `false` **unless** the Menu has a `role="menu"`
   * where it will default to `keyboard` to match the recommended [ARIA Authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton).
   */
  focusFirstItemOnShow: prop_types_default().oneOf([false, true, 'keyboard']),
  /** @private */
  navbar: (prop_types_default()).bool,
  /**
   * Controls the auto close behaviour of the dropdown when clicking outside of
   * the button or the list.
   */
  autoClose: prop_types_default().oneOf([true, 'outside', 'inside', false])
};
const Dropdown_Dropdown = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((pProps, ref) => {
  const {
    bsPrefix,
    drop = 'down',
    show,
    className,
    align = 'start',
    onSelect,
    onToggle,
    focusFirstItemOnShow,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    navbar: _4,
    autoClose = true,
    ...props
  } = useUncontrolled(pProps, {
    show: 'onToggle'
  });
  const isInputGroup = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(InputGroupContext);
  const prefix = useBootstrapPrefix(bsPrefix, 'dropdown');
  const isRTL = useIsRTL();
  const isClosingPermitted = source => {
    // autoClose=false only permits close on button click
    if (autoClose === false) return source === 'click';

    // autoClose=inside doesn't permit close on rootClose
    if (autoClose === 'inside') return source !== 'rootClose';

    // autoClose=outside doesn't permit close on select
    if (autoClose === 'outside') return source !== 'select';
    return true;
  };
  const handleToggle = useEventCallback((nextShow, meta) => {
    if (meta.originalEvent.currentTarget === document && (meta.source !== 'keydown' || meta.originalEvent.key === 'Escape')) meta.source = 'rootClose';
    if (isClosingPermitted(meta.source)) onToggle == null ? void 0 : onToggle(nextShow, meta);
  });
  const alignEnd = align === 'end';
  const placement = getDropdownMenuPlacement(alignEnd, drop, isRTL);
  const contextValue = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({
    align,
    drop,
    isRTL
  }), [align, drop, isRTL]);
  const directionClasses = {
    down: prefix,
    'down-centered': `${prefix}-center`,
    up: 'dropup',
    'up-centered': 'dropup-center dropup',
    end: 'dropend',
    start: 'dropstart'
  };
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_DropdownContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(esm_Dropdown, {
      placement: placement,
      show: show,
      onSelect: onSelect,
      onToggle: handleToggle,
      focusFirstItemOnShow: focusFirstItemOnShow,
      itemSelector: `.${prefix}-item:not(.disabled):not(:disabled)`,
      children: isInputGroup ? props.children : /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
        ...props,
        ref: ref,
        className: classnames_default()(className, show && 'show', directionClasses[drop])
      }, void 0, false, {
        fileName: Dropdown_jsxFileName,
        lineNumber: 195,
        columnNumber: 13
      }, undefined)
    }, void 0, false, {
      fileName: Dropdown_jsxFileName,
      lineNumber: 184,
      columnNumber: 9
    }, undefined)
  }, void 0, false, {
    fileName: Dropdown_jsxFileName,
    lineNumber: 183,
    columnNumber: 7
  }, undefined);
});
Dropdown_Dropdown.displayName = 'Dropdown';
Dropdown_Dropdown.propTypes = Dropdown_propTypes;
/* harmony default export */ const src_Dropdown = (Object.assign(Dropdown_Dropdown, {
  Toggle: src_DropdownToggle,
  Menu: src_DropdownMenu,
  Item: src_DropdownItem,
  ItemText: src_DropdownItemText,
  Divider: src_DropdownDivider,
  Header: src_DropdownHeader
}));
;// CONCATENATED MODULE: ./src/DropdownButton.tsx
var DropdownButton_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/DropdownButton.tsx";







const DropdownButton_propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string}
   */
  id: (prop_types_default()).string,
  /** An `href` passed to the Toggle component */
  href: (prop_types_default()).string,
  /** An `onClick` handler passed to the Toggle component */
  onClick: (prop_types_default()).func,
  /** The content of the non-toggle Button.  */
  title: (prop_types_default()).node.isRequired,
  /** Disables both Buttons  */
  disabled: (prop_types_default()).bool,
  /**
   * Aligns the dropdown menu.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   *
   * @type {"start"|"end"|{ sm: "start"|"end" }|{ md: "start"|"end" }|{ lg: "start"|"end" }|{ xl: "start"|"end"}|{ xxl: "start"|"end"} }
   */
  align: alignPropType,
  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: (prop_types_default()).string,
  /** Whether to render the dropdown menu in the DOM before the first time it is shown */
  renderMenuOnMount: (prop_types_default()).bool,
  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   */
  rootCloseEvent: (prop_types_default()).string,
  /**
   * Menu color variant.
   *
   * Omitting this will use the default light color.
   */
  menuVariant: prop_types_default().oneOf(['dark']),
  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   * Popper.js's flip [docs](https://popper.js.org/docs/v2/modifiers/flip/).
   *
   */
  flip: (prop_types_default()).bool,
  /** @ignore */
  bsPrefix: (prop_types_default()).string,
  /** @ignore */
  variant: (prop_types_default()).string,
  /** @ignore */
  size: (prop_types_default()).string
};

/**
 * A convenience component for simple or general use dropdowns. Renders a `Button` toggle and all `children`
 * are passed directly to the default `Dropdown.Menu`. This component accepts all of
 * [`Dropdown`'s props](#dropdown-props).
 *
 * _All unknown props are passed through to the `Dropdown` component._ Only
 * the Button `variant`, `size` and `bsPrefix` props are passed to the toggle,
 * along with menu-related props are passed to the `Dropdown.Menu`
 */
const DropdownButton = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  title,
  children,
  bsPrefix,
  rootCloseEvent,
  variant,
  size,
  menuRole,
  renderMenuOnMount,
  disabled,
  href,
  id,
  menuVariant,
  flip,
  ...props
}, ref) => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Dropdown, {
  ref: ref,
  ...props,
  children: [/*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_DropdownToggle, {
    id: id,
    href: href,
    size: size,
    variant: variant,
    disabled: disabled,
    childBsPrefix: bsPrefix,
    children: title
  }, void 0, false, {
    fileName: DropdownButton_jsxFileName,
    lineNumber: 118,
    columnNumber: 7
  }, undefined), /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_DropdownMenu, {
    role: menuRole,
    renderOnMount: renderMenuOnMount,
    rootCloseEvent: rootCloseEvent,
    variant: menuVariant,
    flip: flip,
    children: children
  }, void 0, false, {
    fileName: DropdownButton_jsxFileName,
    lineNumber: 128,
    columnNumber: 7
  }, undefined)]
}, void 0, true, {
  fileName: DropdownButton_jsxFileName,
  lineNumber: 117,
  columnNumber: 5
}, undefined));
DropdownButton.displayName = 'DropdownButton';
DropdownButton.propTypes = DropdownButton_propTypes;
/* harmony default export */ const src_DropdownButton = (DropdownButton);
;// CONCATENATED MODULE: ./src/Image.tsx
var Image_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Image.tsx";





const Image_propTypes = {
  /**
   * @default 'img'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Sets image as fluid image.
   */
  fluid: (prop_types_default()).bool,
  /**
   * Sets image shape as rounded.
   */
  rounded: (prop_types_default()).bool,
  /**
   * Sets image shape as circle.
   */
  roundedCircle: (prop_types_default()).bool,
  /**
   * Sets image shape as thumbnail.
   */
  thumbnail: (prop_types_default()).bool
};
const Image_Image = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  fluid = false,
  rounded = false,
  roundedCircle = false,
  thumbnail = false,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'img');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("img", {
    // eslint-disable-line jsx-a11y/alt-text
    ref: ref,
    ...props,
    className: classnames_default()(className, fluid && `${bsPrefix}-fluid`, rounded && `rounded`, roundedCircle && `rounded-circle`, thumbnail && `${bsPrefix}-thumbnail`)
  }, void 0, false, {
    fileName: Image_jsxFileName,
    lineNumber: 58,
    columnNumber: 7
  }, undefined);
});
Image_Image.displayName = 'Image';
Image_Image.propTypes = Image_propTypes;
/* harmony default export */ const src_Image = (Image_Image);
;// CONCATENATED MODULE: ./src/FigureImage.tsx
var FigureImage_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FigureImage.tsx";




const FigureImage = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  fluid = true,
  ...props
}, ref) => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Image, {
  ref: ref,
  ...props,
  fluid: fluid,
  className: classnames_default()(className, 'figure-img')
}, void 0, false, {
  fileName: FigureImage_jsxFileName,
  lineNumber: 8,
  columnNumber: 5
}, undefined));
FigureImage.displayName = 'FigureImage';
FigureImage.propTypes = Image_propTypes;
/* harmony default export */ const src_FigureImage = (FigureImage);
;// CONCATENATED MODULE: ./src/FigureCaption.tsx
var FigureCaption_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FigureCaption.tsx";




const FigureCaption = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'figcaption',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'figure-caption');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: FigureCaption_jsxFileName,
    lineNumber: 17,
    columnNumber: 7
  }, undefined);
});
FigureCaption.displayName = 'FigureCaption';
/* harmony default export */ const src_FigureCaption = (FigureCaption);
;// CONCATENATED MODULE: ./src/Figure.tsx
var Figure_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Figure.tsx";






const Figure = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'figure',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'figure');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: Figure_jsxFileName,
    lineNumber: 17,
    columnNumber: 9
  }, undefined);
});
Figure.displayName = 'Figure';
/* harmony default export */ const src_Figure = (Object.assign(Figure, {
  Image: src_FigureImage,
  Caption: src_FigureCaption
}));
;// CONCATENATED MODULE: ./src/Feedback.tsx
var Feedback_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Feedback.tsx";




const Feedback_propTypes = {
  /**
   * Specify whether the feedback is for valid or invalid fields
   *
   * @type {('valid'|'invalid')}
   */
  type: (prop_types_default()).string,
  /** Display feedback as a tooltip. */
  tooltip: (prop_types_default()).bool,
  as: (prop_types_default()).elementType
};
const Feedback = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
({
  as: Component = 'div',
  className,
  type = 'valid',
  tooltip = false,
  ...props
}, ref) => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
  ...props,
  ref: ref,
  className: classnames_default()(className, `${type}-${tooltip ? 'tooltip' : 'feedback'}`)
}, void 0, false, {
  fileName: Feedback_jsxFileName,
  lineNumber: 45,
  columnNumber: 7
}, undefined));
Feedback.displayName = 'Feedback';
Feedback.propTypes = Feedback_propTypes;
/* harmony default export */ const src_Feedback = (Feedback);
;// CONCATENATED MODULE: ./src/FormContext.tsx


// TODO

const FormContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.createContext({});
/* harmony default export */ const src_FormContext = (FormContext);
;// CONCATENATED MODULE: ./src/FormCheckInput.tsx
var FormCheckInput_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormCheckInput.tsx";







const FormCheckInput_propTypes = {
  /**
   * @default 'form-check-input'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * The underlying HTML element to use when rendering the FormCheckInput.
   *
   * @type {('input'|elementType)}
   */
  as: (prop_types_default()).elementType,
  /** A HTML id attribute, necessary for proper form accessibility. */
  id: (prop_types_default()).string,
  /** The type of checkable. */
  type: prop_types_default().oneOf(['radio', 'checkbox']).isRequired,
  /** Manually style the input as valid */
  isValid: (prop_types_default()).bool,
  /** Manually style the input as invalid */
  isInvalid: (prop_types_default()).bool
};
const FormCheckInput = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  id,
  bsPrefix,
  className,
  type = 'checkbox',
  isValid = false,
  isInvalid = false,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'input',
  ...props
}, ref) => {
  const {
    controlId
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_FormContext);
  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-check-input');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ...props,
    ref: ref,
    type: type,
    id: id || controlId,
    className: classnames_default()(className, bsPrefix, isValid && 'is-valid', isInvalid && 'is-invalid')
  }, void 0, false, {
    fileName: FormCheckInput_jsxFileName,
    lineNumber: 67,
    columnNumber: 7
  }, undefined);
});
FormCheckInput.displayName = 'FormCheckInput';
FormCheckInput.propTypes = FormCheckInput_propTypes;
/* harmony default export */ const src_FormCheckInput = (FormCheckInput);
;// CONCATENATED MODULE: ./src/FormCheckLabel.tsx
var FormCheckLabel_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormCheckLabel.tsx";







const FormCheckLabel_propTypes = {
  /**
   * @default 'form-check-label'
   */
  bsPrefix: (prop_types_default()).string,
  /** The HTML for attribute for associating the label with an input */
  htmlFor: (prop_types_default()).string
};
const FormCheckLabel = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  htmlFor,
  ...props
}, ref) => {
  const {
    controlId
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_FormContext);
  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-check-label');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("label", {
    ...props,
    ref: ref,
    htmlFor: htmlFor || controlId,
    className: classnames_default()(className, bsPrefix)
  }, void 0, false, {
    fileName: FormCheckLabel_jsxFileName,
    lineNumber: 31,
    columnNumber: 7
  }, undefined);
});
FormCheckLabel.displayName = 'FormCheckLabel';
FormCheckLabel.propTypes = FormCheckLabel_propTypes;
/* harmony default export */ const src_FormCheckLabel = (FormCheckLabel);
;// CONCATENATED MODULE: ./src/FormCheck.tsx
var FormCheck_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormCheck.tsx";












const FormCheck_propTypes = {
  /**
   * @default 'form-check'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * bsPrefix override for the base switch class.
   *
   * @default 'form-switch'
   */
  bsSwitchPrefix: (prop_types_default()).string,
  /**
   * The FormCheck `ref` will be forwarded to the underlying input element,
   * which means it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: (prop_types_default()).any,
  /**
   * The underlying HTML element to use when rendering the FormCheck.
   *
   * @type {('input'|elementType)}
   */
  as: (prop_types_default()).elementType,
  /**
   * A HTML id attribute, necessary for proper form accessibility.
   * An id is recommended for allowing label clicks to toggle the check control.
   *
   * This is **required** when `type="switch"` due to how they are rendered.
   */
  id: (prop_types_default()).string,
  /**
   * Provide a function child to manually handle the layout of the FormCheck's inner components.
   *
   * ```jsx
   * <FormCheck>
   *   <FormCheck.Input isInvalid type={radio} />
   *   <FormCheck.Label>Allow us to contact you?</FormCheck.Label>
   *   <Feedback type="invalid">Yo this is required</Feedback>
   * </FormCheck>
   * ```
   */
  children: (prop_types_default()).node,
  /**
   * Groups controls horizontally with other `FormCheck`s.
   */
  inline: (prop_types_default()).bool,
  /**
   * Put your checkboxes, radios, and switches on the opposite side.
   */
  reverse: (prop_types_default()).bool,
  /**
   * Disables the control.
   */
  disabled: (prop_types_default()).bool,
  /**
   * `title` attribute for the underlying `FormCheckLabel`.
   */
  title: (prop_types_default()).string,
  /**
   * Label for the control.
   */
  label: (prop_types_default()).node,
  /**
   * The type of checkable.
   * @type {('radio' | 'checkbox' | 'switch')}
   */
  type: prop_types_default().oneOf(['radio', 'checkbox', 'switch']),
  /** Manually style the input as valid */
  isValid: (prop_types_default()).bool,
  /** Manually style the input as invalid */
  isInvalid: (prop_types_default()).bool,
  /** Display feedback as a tooltip. */
  feedbackTooltip: (prop_types_default()).bool,
  /** A message to display when the input is in a validation state */
  feedback: (prop_types_default()).node
};
const FormCheck = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  id,
  bsPrefix,
  bsSwitchPrefix,
  inline = false,
  reverse = false,
  disabled = false,
  isValid = false,
  isInvalid = false,
  feedbackTooltip = false,
  feedback,
  feedbackType,
  className,
  style,
  title = '',
  type = 'checkbox',
  label,
  children,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as = 'input',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-check');
  bsSwitchPrefix = useBootstrapPrefix(bsSwitchPrefix, 'form-switch');
  const {
    controlId
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_FormContext);
  const innerFormContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({
    controlId: id || controlId
  }), [controlId, id]);
  const hasLabel = !children && label != null && label !== false || hasChildOfType(children, src_FormCheckLabel);
  const input = /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_FormCheckInput, {
    ...props,
    type: type === 'switch' ? 'checkbox' : type,
    ref: ref,
    isValid: isValid,
    isInvalid: isInvalid,
    disabled: disabled,
    as: as
  }, void 0, false, {
    fileName: FormCheck_jsxFileName,
    lineNumber: 168,
    columnNumber: 9
  }, undefined);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_FormContext.Provider, {
    value: innerFormContext,
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
      style: style,
      className: classnames_default()(className, hasLabel && bsPrefix, inline && `${bsPrefix}-inline`, reverse && `${bsPrefix}-reverse`, type === 'switch' && bsSwitchPrefix),
      children: children || /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(jsx_dev_runtime.Fragment, {
        children: [input, hasLabel && /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_FormCheckLabel, {
          title: title,
          children: label
        }, void 0, false, {
          fileName: FormCheck_jsxFileName,
          lineNumber: 195,
          columnNumber: 19
        }, undefined), feedback && /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Feedback, {
          type: feedbackType,
          tooltip: feedbackTooltip,
          children: feedback
        }, void 0, false, {
          fileName: FormCheck_jsxFileName,
          lineNumber: 198,
          columnNumber: 19
        }, undefined)]
      }, void 0, true)
    }, void 0, false, {
      fileName: FormCheck_jsxFileName,
      lineNumber: 181,
      columnNumber: 11
    }, undefined)
  }, void 0, false, {
    fileName: FormCheck_jsxFileName,
    lineNumber: 180,
    columnNumber: 9
  }, undefined);
});
FormCheck.displayName = 'FormCheck';
FormCheck.propTypes = FormCheck_propTypes;
/* harmony default export */ const src_FormCheck = (Object.assign(FormCheck, {
  Input: src_FormCheckInput,
  Label: src_FormCheckLabel
}));
;// CONCATENATED MODULE: ./src/FormControl.tsx
var FormControl_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormControl.tsx";









const FormControl_propTypes = {
  /**
   * @default {'form-control'}
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * The FormControl `ref` will be forwarded to the underlying input element,
   * which means unless `as` is a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: (prop_types_default()).any,
  /**
   * Input size variants
   *
   * @type {('sm'|'lg')}
   */
  size: (prop_types_default()).string,
  /**
   * The size attribute of the underlying HTML element.
   * Specifies the visible width in characters if `as` is `'input'`.
   */
  htmlSize: (prop_types_default()).number,
  /**
   * The underlying HTML element to use when rendering the FormControl.
   *
   * @type {('input'|'textarea'|elementType)}
   */
  as: (prop_types_default()).elementType,
  /**
   * Render the input as plain text. Generally used along side `readOnly`.
   */
  plaintext: (prop_types_default()).bool,
  /** Make the control readonly */
  readOnly: (prop_types_default()).bool,
  /** Make the control disabled */
  disabled: (prop_types_default()).bool,
  /**
   * The `value` attribute of underlying input
   *
   * @controllable onChange
   * */
  value: prop_types_default().oneOfType([(prop_types_default()).string, prop_types_default().arrayOf((prop_types_default()).string), (prop_types_default()).number]),
  /** A callback fired when the `value` prop changes */
  onChange: (prop_types_default()).func,
  /**
   * The HTML input `type`, which is only relevant if `as` is `'input'` (the default).
   */
  type: (prop_types_default()).string,
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id: (prop_types_default()).string,
  /** Add "valid" validation styles to the control */
  isValid: (prop_types_default()).bool,
  /** Add "invalid" validation styles to the control and accompanying label */
  isInvalid: (prop_types_default()).bool
};
const FormControl = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  type,
  size,
  htmlSize,
  id,
  className,
  isValid = false,
  isInvalid = false,
  plaintext,
  readOnly,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'input',
  ...props
}, ref) => {
  const {
    controlId
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_FormContext);
  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-control');
   false ? 0 : void 0;
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ...props,
    type: type,
    size: htmlSize,
    ref: ref,
    readOnly: readOnly,
    id: id || controlId,
    className: classnames_default()(className, plaintext ? `${bsPrefix}-plaintext` : bsPrefix, size && `${bsPrefix}-${size}`, type === 'color' && `${bsPrefix}-color`, isValid && 'is-valid', isInvalid && 'is-invalid')
  }, void 0, false, {
    fileName: FormControl_jsxFileName,
    lineNumber: 135,
    columnNumber: 9
  }, undefined);
});
FormControl.displayName = 'FormControl';
FormControl.propTypes = FormControl_propTypes;
/* harmony default export */ const src_FormControl = (Object.assign(FormControl, {
  Feedback: src_Feedback
}));
;// CONCATENATED MODULE: ./src/FormFloating.tsx
var FormFloating_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormFloating.tsx";




const FormFloating = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-floating');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: FormFloating_jsxFileName,
    lineNumber: 15,
    columnNumber: 9
  }, undefined);
});
FormFloating.displayName = 'FormFloating';
/* harmony default export */ const src_FormFloating = (FormFloating);
;// CONCATENATED MODULE: ./src/FormGroup.tsx
var FormGroup_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormGroup.tsx";





const FormGroup_propTypes = {
  as: (prop_types_default()).elementType,
  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: (prop_types_default()).string,
  /**
   * The FormGroup `ref` will be forwarded to the underlying element.
   * Unless the FormGroup is rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: (prop_types_default()).any
};
const FormGroup = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  controlId,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const context = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({
    controlId
  }), [controlId]);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_FormContext.Provider, {
    value: context,
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
      ...props,
      ref: ref
    }, void 0, false, {
      fileName: FormGroup_jsxFileName,
      lineNumber: 48,
      columnNumber: 11
    }, undefined)
  }, void 0, false, {
    fileName: FormGroup_jsxFileName,
    lineNumber: 47,
    columnNumber: 9
  }, undefined);
});
FormGroup.displayName = 'FormGroup';
FormGroup.propTypes = FormGroup_propTypes;
/* harmony default export */ const src_FormGroup = (FormGroup);
;// CONCATENATED MODULE: ./src/FormLabel.tsx
var FormLabel_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormLabel.tsx";









const FormLabel_propTypes = {
  /**
   * @default 'form-label'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  htmlFor: (prop_types_default()).string,
  /**
   * Renders the FormLabel as a `<Col>` component (accepting all the same props),
   * as well as adding additional styling for horizontal forms.
   */
  column: prop_types_default().oneOfType([(prop_types_default()).bool, prop_types_default().oneOf(['sm', 'lg'])]),
  /**
   * The FormLabel `ref` will be forwarded to the underlying element.
   * Unless the FormLabel is rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: (prop_types_default()).any,
  /**
   * Hides the label visually while still allowing it to be
   * read by assistive technologies.
   */
  visuallyHidden: (prop_types_default()).bool,
  /** Set a custom element for this component */
  as: (prop_types_default()).elementType
};
const FormLabel = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'label',
  bsPrefix,
  column = false,
  visuallyHidden = false,
  className,
  htmlFor,
  ...props
}, ref) => {
  const {
    controlId
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_FormContext);
  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-label');
  let columnClass = 'col-form-label';
  if (typeof column === 'string') columnClass = `${columnClass} ${columnClass}-${column}`;
  const classes = classnames_default()(className, bsPrefix, visuallyHidden && 'visually-hidden', column && columnClass);
   false ? 0 : void 0;
  htmlFor = htmlFor || controlId;
  if (column) return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Col, {
    ref: ref,
    as: "label",
    className: classes,
    htmlFor: htmlFor,
    ...props
  }, void 0, false, {
    fileName: FormLabel_jsxFileName,
    lineNumber: 104,
    columnNumber: 11
  }, undefined);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
    (0,jsx_dev_runtime.jsxDEV)(Component, {
      ref: ref,
      className: classes,
      htmlFor: htmlFor,
      ...props
    }, void 0, false, {
      fileName: FormLabel_jsxFileName,
      lineNumber: 115,
      columnNumber: 9
    }, undefined)
  );
});
FormLabel.displayName = 'FormLabel';
FormLabel.propTypes = FormLabel_propTypes;
/* harmony default export */ const src_FormLabel = (FormLabel);
;// CONCATENATED MODULE: ./src/FormRange.tsx
var FormRange_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormRange.tsx";







const FormRange_propTypes = {
  /**
   * @default {'form-range'}
   */
  bsPrefix: (prop_types_default()).string,
  /** Make the control disabled */
  disabled: (prop_types_default()).bool,
  /**
   * The `value` attribute of underlying input
   *
   * @controllable onChange
   * */
  value: prop_types_default().oneOfType([(prop_types_default()).string, prop_types_default().arrayOf((prop_types_default()).string.isRequired), (prop_types_default()).number]),
  /** A callback fired when the `value` prop changes */
  onChange: (prop_types_default()).func,
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id: (prop_types_default()).string
};
const FormRange = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  id,
  ...props
}, ref) => {
  const {
    controlId
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_FormContext);
  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-range');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("input", {
    ...props,
    type: "range",
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    id: id || controlId
  }, void 0, false, {
    fileName: FormRange_jsxFileName,
    lineNumber: 48,
    columnNumber: 7
  }, undefined);
});
FormRange.displayName = 'FormRange';
FormRange.propTypes = FormRange_propTypes;
/* harmony default export */ const src_FormRange = (FormRange);
;// CONCATENATED MODULE: ./src/FormSelect.tsx
var FormSelect_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormSelect.tsx";







const FormSelect_propTypes = {
  /**
   * @default {'form-select'}
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Size variants
   *
   * @type {('sm'|'lg')}
   */
  size: (prop_types_default()).string,
  /**
   * The size attribute of the underlying HTML element.
   * Specifies the number of visible options.
   */
  htmlSize: (prop_types_default()).number,
  /** Make the control disabled */
  disabled: (prop_types_default()).bool,
  /**
   * The `value` attribute of underlying input
   *
   * @controllable onChange
   * */
  value: prop_types_default().oneOfType([(prop_types_default()).string, prop_types_default().arrayOf((prop_types_default()).string), (prop_types_default()).number]),
  /** A callback fired when the `value` prop changes */
  onChange: (prop_types_default()).func,
  /** Add "valid" validation styles to the control */
  isValid: (prop_types_default()).bool,
  /** Add "invalid" validation styles to the control and accompanying label */
  isInvalid: (prop_types_default()).bool
};
const FormSelect = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  size,
  htmlSize,
  className,
  isValid = false,
  isInvalid = false,
  id,
  ...props
}, ref) => {
  const {
    controlId
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_FormContext);
  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-select');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("select", {
    ...props,
    size: htmlSize,
    ref: ref,
    className: classnames_default()(className, bsPrefix, size && `${bsPrefix}-${size}`, isValid && `is-valid`, isInvalid && `is-invalid`),
    id: id || controlId
  }, void 0, false, {
    fileName: FormSelect_jsxFileName,
    lineNumber: 80,
    columnNumber: 9
  }, undefined);
});
FormSelect.displayName = 'FormSelect';
FormSelect.propTypes = FormSelect_propTypes;
/* harmony default export */ const src_FormSelect = (FormSelect);
;// CONCATENATED MODULE: ./src/FormText.tsx
var FormText_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormText.tsx";





const FormText_propTypes = {
  /** @default 'form-text' */
  bsPrefix: (prop_types_default()).string,
  /**
   * The FormText `ref` will be forwarded to the underlying element.
   * Unless the FormText is rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: (prop_types_default()).any,
  /**
   * A convenience prop for add the `text-muted` class,
   * since it's so commonly used here.
   */
  muted: (prop_types_default()).bool,
  as: (prop_types_default()).elementType
};
const FormText = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
({
  bsPrefix,
  className,
  as: Component = 'small',
  muted,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-text');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ...props,
    ref: ref,
    className: classnames_default()(className, bsPrefix, muted && 'text-muted')
  }, void 0, false, {
    fileName: FormText_jsxFileName,
    lineNumber: 48,
    columnNumber: 9
  }, undefined);
});
FormText.displayName = 'FormText';
FormText.propTypes = FormText_propTypes;
/* harmony default export */ const src_FormText = (FormText);
;// CONCATENATED MODULE: ./src/Switch.tsx
var Switch_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Switch.tsx";



const Switch = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((props, ref) => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_FormCheck, {
  ...props,
  ref: ref,
  type: "switch"
}, void 0, false, {
  fileName: Switch_jsxFileName,
  lineNumber: 9,
  columnNumber: 5
}, undefined));
Switch.displayName = 'Switch';
/* harmony default export */ const src_Switch = (Object.assign(Switch, {
  Input: src_FormCheck.Input,
  Label: src_FormCheck.Label
}));
;// CONCATENATED MODULE: ./src/FloatingLabel.tsx
var FloatingLabel_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FloatingLabel.tsx";






const FloatingLabel_propTypes = {
  as: (prop_types_default()).elementType,
  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<label>`.
   */
  controlId: (prop_types_default()).string,
  /**
   * Form control label.
   */
  label: (prop_types_default()).node.isRequired
};
const FloatingLabel = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  children,
  controlId,
  label,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-floating');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_FormGroup, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    controlId: controlId,
    ...props,
    children: [children, /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("label", {
      htmlFor: controlId,
      children: label
    }, void 0, false, {
      fileName: FloatingLabel_jsxFileName,
      lineNumber: 41,
      columnNumber: 11
    }, undefined)]
  }, void 0, true, {
    fileName: FloatingLabel_jsxFileName,
    lineNumber: 34,
    columnNumber: 9
  }, undefined);
});
FloatingLabel.displayName = 'FloatingLabel';
FloatingLabel.propTypes = FloatingLabel_propTypes;
/* harmony default export */ const src_FloatingLabel = (FloatingLabel);
;// CONCATENATED MODULE: ./src/Form.tsx
var Form_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Form.tsx";














const Form_propTypes = {
  /**
   * The Form `ref` will be forwarded to the underlying element,
   * which means, unless it's rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: (prop_types_default()).any,
  /**
   * Mark a form as having been validated. Setting it to `true` will
   * toggle any validation styles on the forms elements.
   */
  validated: (prop_types_default()).bool,
  as: (prop_types_default()).elementType
};
const Form = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  validated,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'form',
  ...props
}, ref) => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
  ...props,
  ref: ref,
  className: classnames_default()(className, validated && 'was-validated')
}, void 0, false, {
  fileName: Form_jsxFileName,
  lineNumber: 53,
  columnNumber: 7
}, undefined));
Form.displayName = 'Form';
Form.propTypes = Form_propTypes;
/* harmony default export */ const src_Form = (Object.assign(Form, {
  Group: src_FormGroup,
  Control: src_FormControl,
  Floating: src_FormFloating,
  Check: src_FormCheck,
  Switch: src_Switch,
  Label: src_FormLabel,
  Text: src_FormText,
  Range: src_FormRange,
  Select: src_FormSelect,
  FloatingLabel: src_FloatingLabel
}));
;// CONCATENATED MODULE: ./src/InputGroupText.tsx
var InputGroupText_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/InputGroupText.tsx";




const InputGroupText = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'span',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'input-group-text');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: InputGroupText_jsxFileName,
    lineNumber: 17,
    columnNumber: 7
  }, undefined);
});
InputGroupText.displayName = 'InputGroupText';
/* harmony default export */ const src_InputGroupText = (InputGroupText);
;// CONCATENATED MODULE: ./src/InputGroup.tsx
var InputGroup_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/InputGroup.tsx";









const InputGroupCheckbox = props => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_InputGroupText, {
  children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_FormCheckInput, {
    type: "checkbox",
    ...props
  }, void 0, false, {
    fileName: InputGroup_jsxFileName,
    lineNumber: 15,
    columnNumber: 5
  }, undefined)
}, void 0, false, {
  fileName: InputGroup_jsxFileName,
  lineNumber: 14,
  columnNumber: 3
}, undefined);
const InputGroupRadio = props => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_InputGroupText, {
  children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_FormCheckInput, {
    type: "radio",
    ...props
  }, void 0, false, {
    fileName: InputGroup_jsxFileName,
    lineNumber: 21,
    columnNumber: 5
  }, undefined)
}, void 0, false, {
  fileName: InputGroup_jsxFileName,
  lineNumber: 20,
  columnNumber: 3
}, undefined);
const InputGroup_propTypes = {
  /** @default 'input-group' */
  bsPrefix: (prop_types_default()).string,
  /**
   * Control the size of buttons and form elements from the top-level.
   *
   * @type {('sm'|'lg')}
   */
  size: (prop_types_default()).string,
  /**
   * Handles the input's rounded corners when using form validation.
   *
   * Use this when your input group contains both an input and feedback element.
   */
  hasValidation: (prop_types_default()).bool,
  as: (prop_types_default()).elementType
};
const InputGroup = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  size,
  hasValidation,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'input-group');

  // Intentionally an empty object. Used in detecting if a dropdown
  // exists under an input group.
  const contextValue = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({}), []);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(InputGroupContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
      ref: ref,
      ...props,
      className: classnames_default()(className, bsPrefix, size && `${bsPrefix}-${size}`, hasValidation && 'has-validation')
    }, void 0, false, {
      fileName: InputGroup_jsxFileName,
      lineNumber: 75,
      columnNumber: 11
    }, undefined)
  }, void 0, false, {
    fileName: InputGroup_jsxFileName,
    lineNumber: 74,
    columnNumber: 9
  }, undefined);
});
InputGroup.propTypes = InputGroup_propTypes;
InputGroup.displayName = 'InputGroup';
/* harmony default export */ const src_InputGroup = (Object.assign(InputGroup, {
  Text: src_InputGroupText,
  Radio: InputGroupRadio,
  Checkbox: InputGroupCheckbox
}));
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/TabContext.js

const TabContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.createContext(null);
/* harmony default export */ const esm_TabContext = (TabContext);
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/NavItem.js
const NavItem_excluded = ["as", "active", "eventKey"];
function NavItem_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}









function useNavItem({
  key,
  onClick,
  active,
  id,
  role,
  disabled
}) {
  const parentOnSelect = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(esm_SelectableContext);
  const navContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(esm_NavContext);
  const tabContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(esm_TabContext);
  let isActive = active;
  const props = {
    role
  };
  if (navContext) {
    if (!role && navContext.role === 'tablist') props.role = 'tab';
    const contextControllerId = navContext.getControllerId(key != null ? key : null);
    const contextControlledId = navContext.getControlledId(key != null ? key : null);

    // @ts-ignore
    props[dataAttr('event-key')] = key;
    props.id = contextControllerId || id;
    isActive = active == null && key != null ? navContext.activeKey === key : active;

    /**
     * Simplified scenario for `mountOnEnter`.
     *
     * While it would make sense to keep 'aria-controls' for tabs that have been mounted at least
     * once, it would also complicate the code quite a bit, for very little gain.
     * The following implementation is probably good enough.
     *
     * @see https://github.com/react-restart/ui/pull/40#issuecomment-1009971561
     */
    if (isActive || !(tabContext != null && tabContext.unmountOnExit) && !(tabContext != null && tabContext.mountOnEnter)) props['aria-controls'] = contextControlledId;
  }
  if (props.role === 'tab') {
    props['aria-selected'] = isActive;
    if (!isActive) {
      props.tabIndex = -1;
    }
    if (disabled) {
      props.tabIndex = -1;
      props['aria-disabled'] = true;
    }
  }
  props.onClick = useEventCallback(e => {
    if (disabled) return;
    onClick == null ? void 0 : onClick(e);
    if (key == null) {
      return;
    }
    if (parentOnSelect && !e.isPropagationStopped()) {
      parentOnSelect(key, e);
    }
  });
  return [props, {
    isActive
  }];
}
const NavItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((_ref, ref) => {
  let {
      as: Component = esm_Button,
      active,
      eventKey
    } = _ref,
    options = NavItem_objectWithoutPropertiesLoose(_ref, NavItem_excluded);
  const [props, meta] = useNavItem(Object.assign({
    key: makeEventKey(eventKey, options.href),
    active
  }, options));

  // @ts-ignore
  props[dataAttr('active')] = meta.isActive;
  return /*#__PURE__*/(0,jsx_runtime.jsx)(Component, Object.assign({}, options, props, {
    ref: ref
  }));
});
NavItem.displayName = 'NavItem';
/* harmony default export */ const esm_NavItem = (NavItem);
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/Nav.js
const Nav_excluded = ["as", "onSelect", "activeKey", "role", "onKeyDown"];
function Nav_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}











// eslint-disable-next-line @typescript-eslint/no-empty-function
const Nav_noop = () => {};
const EVENT_KEY_ATTR = dataAttr('event-key');
const Nav = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((_ref, ref) => {
  let {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      onSelect,
      activeKey,
      role,
      onKeyDown
    } = _ref,
    props = Nav_objectWithoutPropertiesLoose(_ref, Nav_excluded);
  // A ref and forceUpdate for refocus, b/c we only want to trigger when needed
  // and don't want to reset the set in the effect
  const forceUpdate = useForceUpdate();
  const needsRefocusRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(false);
  const parentOnSelect = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(esm_SelectableContext);
  const tabContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(esm_TabContext);
  let getControlledId, getControllerId;
  if (tabContext) {
    role = role || 'tablist';
    activeKey = tabContext.activeKey;
    // TODO: do we need to duplicate these?
    getControlledId = tabContext.getControlledId;
    getControllerId = tabContext.getControllerId;
  }
  const listNode = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  const getNextActiveTab = offset => {
    const currentListNode = listNode.current;
    if (!currentListNode) return null;
    const items = qsa(currentListNode, `[${EVENT_KEY_ATTR}]:not([aria-disabled=true])`);
    const activeChild = currentListNode.querySelector('[aria-selected=true]');
    if (!activeChild || activeChild !== document.activeElement) return null;
    const index = items.indexOf(activeChild);
    if (index === -1) return null;
    let nextIndex = index + offset;
    if (nextIndex >= items.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = items.length - 1;
    return items[nextIndex];
  };
  const handleSelect = (key, event) => {
    if (key == null) return;
    onSelect == null ? void 0 : onSelect(key, event);
    parentOnSelect == null ? void 0 : parentOnSelect(key, event);
  };
  const handleKeyDown = event => {
    onKeyDown == null ? void 0 : onKeyDown(event);
    if (!tabContext) {
      return;
    }
    let nextActiveChild;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextActiveChild = getNextActiveTab(-1);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        nextActiveChild = getNextActiveTab(1);
        break;
      default:
        return;
    }
    if (!nextActiveChild) return;
    event.preventDefault();
    handleSelect(nextActiveChild.dataset[dataProp('EventKey')] || null, event);
    needsRefocusRef.current = true;
    forceUpdate();
  };
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    if (listNode.current && needsRefocusRef.current) {
      const activeChild = listNode.current.querySelector(`[${EVENT_KEY_ATTR}][aria-selected=true]`);
      activeChild == null ? void 0 : activeChild.focus();
    }
    needsRefocusRef.current = false;
  });
  const mergedRef = esm_useMergedRefs(ref, listNode);
  return /*#__PURE__*/(0,jsx_runtime.jsx)(esm_SelectableContext.Provider, {
    value: handleSelect,
    children: /*#__PURE__*/(0,jsx_runtime.jsx)(esm_NavContext.Provider, {
      value: {
        role,
        // used by NavLink to determine it's role
        activeKey: makeEventKey(activeKey),
        getControlledId: getControlledId || Nav_noop,
        getControllerId: getControllerId || Nav_noop
      },
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(Component, Object.assign({}, props, {
        onKeyDown: handleKeyDown,
        ref: mergedRef,
        role: role
      }))
    })
  });
});
Nav.displayName = 'Nav';
/* harmony default export */ const esm_Nav = (Object.assign(Nav, {
  Item: esm_NavItem
}));
;// CONCATENATED MODULE: ./src/ListGroupItem.tsx
var ListGroupItem_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ListGroupItem.tsx";









const ListGroupItem_propTypes = {
  /**
   * @default 'list-group-item'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Sets contextual classes for list item.
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
   */
  variant: (prop_types_default()).string,
  /**
   * Marks a ListGroupItem as actionable, applying additional hover, active and disabled styles
   * for links and buttons.
   */
  action: (prop_types_default()).bool,
  /**
   * Sets list item as active.
   */
  active: (prop_types_default()).bool,
  /**
   * Sets list item state as disabled.
   */
  disabled: (prop_types_default()).bool,
  eventKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]),
  /** A callback function for when this component is clicked.  */
  onClick: (prop_types_default()).func,
  /** Providing a `href` and setting `action` to `true`, it will render the ListGroup.Item as an `<a>` element (unless `as` is provided). */
  href: (prop_types_default()).string,
  /**
   * You can use a custom element type for this component. For none `action` items, items render as `li`.
   * For actions the default is an anchor or button element depending on whether a `href` is provided.
   *
   * @default {'div' | 'a' | 'button'}
   */
  as: (prop_types_default()).elementType
};
const ListGroupItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  active,
  disabled,
  eventKey,
  className,
  variant,
  action,
  as,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'list-group-item');
  const [navItemProps, meta] = useNavItem({
    key: makeEventKey(eventKey, props.href),
    active,
    ...props
  });
  const handleClick = useEventCallback(event => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    navItemProps.onClick(event);
  });
  if (disabled && props.tabIndex === undefined) {
    props.tabIndex = -1;
    props['aria-disabled'] = true;
  }

  // eslint-disable-next-line no-nested-ternary
  const Component = as || (action ? props.href ? 'a' : 'button' : 'div');
   false ? 0 : void 0;
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    ...props,
    ...navItemProps,
    onClick: handleClick,
    className: classnames_default()(className, bsPrefix, meta.isActive && 'active', disabled && 'disabled', variant && `${bsPrefix}-${variant}`, action && `${bsPrefix}-action`)
  }, void 0, false, {
    fileName: ListGroupItem_jsxFileName,
    lineNumber: 113,
    columnNumber: 9
  }, undefined);
});
ListGroupItem.propTypes = ListGroupItem_propTypes;
ListGroupItem.displayName = 'ListGroupItem';
/* harmony default export */ const src_ListGroupItem = (ListGroupItem);
;// CONCATENATED MODULE: ./src/ListGroup.tsx
var ListGroup_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ListGroup.tsx";









const ListGroup_propTypes = {
  /**
   * @default 'list-group'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Adds a variant to the list-group
   *
   * @type {('flush')}
   */
  variant: prop_types_default().oneOf(['flush']),
  /**
   * Changes the flow of the list group items from vertical to horizontal.
   * A value of `null` (the default) sets it to vertical for all breakpoints;
   * Just including the prop sets it for all breakpoints, while `{sm|md|lg|xl|xxl}`
   * makes the list group horizontal starting at that breakpoint’s `min-width`.
   * @type {(true|'sm'|'md'|'lg'|'xl'|'xxl')}
   */
  horizontal: prop_types_default().oneOfType([(prop_types_default()).bool, (prop_types_default()).string]),
  /**
   * Generate numbered list items.
   */
  numbered: (prop_types_default()).bool,
  /**
   * You can use a custom element type for this component.
   */
  as: (prop_types_default()).elementType
};
const ListGroup = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((props, ref) => {
  const {
    className,
    bsPrefix: initialBsPrefix,
    variant,
    horizontal,
    numbered,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as = 'div',
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect'
  });
  const bsPrefix = useBootstrapPrefix(initialBsPrefix, 'list-group');
  let horizontalVariant;
  if (horizontal) {
    horizontalVariant = horizontal === true ? 'horizontal' : `horizontal-${horizontal}`;
  }
   false ? 0 : void 0;
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(esm_Nav, {
    ref: ref,
    ...controlledProps,
    as: as,
    className: classnames_default()(className, bsPrefix, variant && `${bsPrefix}-${variant}`, horizontalVariant && `${bsPrefix}-${horizontalVariant}`, numbered && `${bsPrefix}-numbered`)
  }, void 0, false, {
    fileName: ListGroup_jsxFileName,
    lineNumber: 81,
    columnNumber: 7
  }, undefined);
});
ListGroup.propTypes = ListGroup_propTypes;
ListGroup.displayName = 'ListGroup';
/* harmony default export */ const src_ListGroup = (Object.assign(ListGroup, {
  Item: src_ListGroupItem
}));
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/scrollbarSize.js

var size;
function scrollbarSize(recalc) {
  if (!size && size !== 0 || recalc) {
    if (canUseDOM) {
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
}
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/activeElement.js

/**
 * Returns the actively focused element safely.
 *
 * @param doc the document to check
 */

function activeElement(doc) {
  if (doc === void 0) {
    doc = ownerDocument();
  }

  // Support: IE 9 only
  // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
  try {
    var active = doc.activeElement; // IE11 returns a seemingly empty object in some cases when accessing
    // document.activeElement from an <iframe>

    if (!active || !active.nodeName) return null;
    return active;
  } catch (e) {
    /* ie throws if no active element */
    return doc.body;
  }
}
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/getScrollbarWidth.js
/**
 * Get the width of the vertical window scrollbar if it's visible
 */
function getBodyScrollbarWidth(ownerDocument = document) {
  const window = ownerDocument.defaultView;
  return Math.abs(window.innerWidth - ownerDocument.documentElement.clientWidth);
}
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/ModalManager.js



const OPEN_DATA_ATTRIBUTE = dataAttr('modal-open');

/**
 * Manages a stack of Modals as well as ensuring
 * body scrolling is is disabled and padding accounted for
 */
class ModalManager {
  constructor({
    ownerDocument,
    handleContainerOverflow = true,
    isRTL = false
  } = {}) {
    this.handleContainerOverflow = handleContainerOverflow;
    this.isRTL = isRTL;
    this.modals = [];
    this.ownerDocument = ownerDocument;
  }
  getScrollbarWidth() {
    return getBodyScrollbarWidth(this.ownerDocument);
  }
  getElement() {
    return (this.ownerDocument || document).body;
  }
  setModalAttributes(_modal) {
    // For overriding
  }
  removeModalAttributes(_modal) {
    // For overriding
  }
  setContainerStyle(containerState) {
    const style = {
      overflow: 'hidden'
    };

    // we are only interested in the actual `style` here
    // because we will override it
    const paddingProp = this.isRTL ? 'paddingLeft' : 'paddingRight';
    const container = this.getElement();
    containerState.style = {
      overflow: container.style.overflow,
      [paddingProp]: container.style[paddingProp]
    };
    if (containerState.scrollBarWidth) {
      // use computed style, here to get the real padding
      // to add our scrollbar width
      style[paddingProp] = `${parseInt(css(container, paddingProp) || '0', 10) + containerState.scrollBarWidth}px`;
    }
    container.setAttribute(OPEN_DATA_ATTRIBUTE, '');
    css(container, style);
  }
  reset() {
    [...this.modals].forEach(m => this.remove(m));
  }
  removeContainerStyle(containerState) {
    const container = this.getElement();
    container.removeAttribute(OPEN_DATA_ATTRIBUTE);
    Object.assign(container.style, containerState.style);
  }
  add(modal) {
    let modalIdx = this.modals.indexOf(modal);
    if (modalIdx !== -1) {
      return modalIdx;
    }
    modalIdx = this.modals.length;
    this.modals.push(modal);
    this.setModalAttributes(modal);
    if (modalIdx !== 0) {
      return modalIdx;
    }
    this.state = {
      scrollBarWidth: this.getScrollbarWidth(),
      style: {}
    };
    if (this.handleContainerOverflow) {
      this.setContainerStyle(this.state);
    }
    return modalIdx;
  }
  remove(modal) {
    const modalIdx = this.modals.indexOf(modal);
    if (modalIdx === -1) {
      return;
    }
    this.modals.splice(modalIdx, 1);

    // if that was the last modal in a container,
    // clean up the container
    if (!this.modals.length && this.handleContainerOverflow) {
      this.removeContainerStyle(this.state);
    }
    this.removeModalAttributes(modal);
  }
  isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  }
}
/* harmony default export */ const esm_ModalManager = (ModalManager);
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/useWaitForDOMRef.js




const resolveContainerRef = (ref, document) => {
  if (!canUseDOM) return null;
  if (ref == null) return (document || ownerDocument()).body;
  if (typeof ref === 'function') ref = ref();
  if (ref && 'current' in ref) ref = ref.current;
  if (ref && ('nodeType' in ref || ref.getBoundingClientRect)) return ref;
  return null;
};
function useWaitForDOMRef(ref, onResolved) {
  const window = useWindow();
  const [resolvedRef, setRef] = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(() => resolveContainerRef(ref, window == null ? void 0 : window.document));
  if (!resolvedRef) {
    const earlyRef = resolveContainerRef(ref);
    if (earlyRef) setRef(earlyRef);
  }
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    if (onResolved && resolvedRef) {
      onResolved(resolvedRef);
    }
  }, [onResolved, resolvedRef]);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    const nextRef = resolveContainerRef(ref);
    if (nextRef !== resolvedRef) {
      setRef(nextRef);
    }
  }, [ref, resolvedRef]);
  return resolvedRef;
}
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/NoopTransition.js



function NoopTransition({
  children,
  in: inProp,
  onExited,
  mountOnEnter,
  unmountOnExit
}) {
  const ref = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  const hasEnteredRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(inProp);
  const handleExited = useEventCallback(onExited);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    if (inProp) hasEnteredRef.current = true;else {
      handleExited(ref.current);
    }
  }, [inProp, handleExited]);
  const combinedRef = esm_useMergedRefs(ref, children.ref);
  const child = /*#__PURE__*/(0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(children, {
    ref: combinedRef
  });
  if (inProp) return child;
  if (unmountOnExit) {
    return null;
  }
  if (!hasEnteredRef.current && mountOnEnter) {
    return null;
  }
  return child;
}
/* harmony default export */ const esm_NoopTransition = (NoopTransition);
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/ImperativeTransition.js






function useTransition({
  in: inProp,
  onTransition
}) {
  const ref = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  const isInitialRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(true);
  const handleTransition = useEventCallback(onTransition);
  useIsomorphicEffect(() => {
    if (!ref.current) {
      return undefined;
    }
    let stale = false;
    handleTransition({
      in: inProp,
      element: ref.current,
      initial: isInitialRef.current,
      isStale: () => stale
    });
    return () => {
      stale = true;
    };
  }, [inProp, handleTransition]);
  useIsomorphicEffect(() => {
    isInitialRef.current = false;
    // this is for strict mode
    return () => {
      isInitialRef.current = true;
    };
  }, []);
  return ref;
}
/**
 * Adapts an imperative transition function to a subset of the RTG `<Transition>` component API.
 *
 * ImperativeTransition does not support mounting options or `appear` at the moment, meaning
 * that it always acts like: `mountOnEnter={true} unmountOnExit={true} appear={true}`
 */
function ImperativeTransition({
  children,
  in: inProp,
  onExited,
  onEntered,
  transition
}) {
  const [exited, setExited] = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(!inProp);

  // TODO: I think this needs to be in an effect
  if (inProp && exited) {
    setExited(false);
  }
  const ref = useTransition({
    in: !!inProp,
    onTransition: options => {
      const onFinish = () => {
        if (options.isStale()) return;
        if (options.in) {
          onEntered == null ? void 0 : onEntered(options.element, options.initial);
        } else {
          setExited(true);
          onExited == null ? void 0 : onExited(options.element);
        }
      };
      Promise.resolve(transition(options)).then(onFinish, error => {
        if (!options.in) setExited(true);
        throw error;
      });
    }
  });
  const combinedRef = esm_useMergedRefs(ref, children.ref);
  return exited && !inProp ? null : /*#__PURE__*/(0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(children, {
    ref: combinedRef
  });
}
function renderTransition(Component, runTransition, props) {
  if (Component) {
    return /*#__PURE__*/(0,jsx_runtime.jsx)(Component, Object.assign({}, props));
  }
  if (runTransition) {
    return /*#__PURE__*/(0,jsx_runtime.jsx)(ImperativeTransition, Object.assign({}, props, {
      transition: runTransition
    }));
  }
  return /*#__PURE__*/(0,jsx_runtime.jsx)(esm_NoopTransition, Object.assign({}, props));
}
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/utils.js
/* eslint-disable import/prefer-default-export */
function isEscKey(e) {
  return e.code === 'Escape' || e.keyCode === 27;
}
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/Modal.js
const Modal_excluded = ["show", "role", "className", "style", "children", "backdrop", "keyboard", "onBackdropClick", "onEscapeKeyDown", "transition", "runTransition", "backdropTransition", "runBackdropTransition", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "renderDialog", "renderBackdrop", "manager", "container", "onShow", "onHide", "onExit", "onExited", "onExiting", "onEnter", "onEntering", "onEntered"];
function Modal_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
/* eslint-disable @typescript-eslint/no-use-before-define, react/prop-types */




















let manager;
function getManager(window) {
  if (!manager) manager = new esm_ModalManager({
    ownerDocument: window == null ? void 0 : window.document
  });
  return manager;
}
function useModalManager(provided) {
  const window = useWindow();
  const modalManager = provided || getManager(window);
  const modal = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)({
    dialog: null,
    backdrop: null
  });
  return Object.assign(modal.current, {
    add: () => modalManager.add(modal.current),
    remove: () => modalManager.remove(modal.current),
    isTopModal: () => modalManager.isTopModal(modal.current),
    setDialogRef: (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(ref => {
      modal.current.dialog = ref;
    }, []),
    setBackdropRef: (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(ref => {
      modal.current.backdrop = ref;
    }, [])
  });
}
const Modal = /*#__PURE__*/(0,external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef)((_ref, ref) => {
  let {
      show = false,
      role = 'dialog',
      className,
      style,
      children,
      backdrop = true,
      keyboard = true,
      onBackdropClick,
      onEscapeKeyDown,
      transition,
      runTransition,
      backdropTransition,
      runBackdropTransition,
      autoFocus = true,
      enforceFocus = true,
      restoreFocus = true,
      restoreFocusOptions,
      renderDialog,
      renderBackdrop = props => /*#__PURE__*/(0,jsx_runtime.jsx)("div", Object.assign({}, props)),
      manager: providedManager,
      container: containerRef,
      onShow,
      onHide = () => {},
      onExit,
      onExited,
      onExiting,
      onEnter,
      onEntering,
      onEntered
    } = _ref,
    rest = Modal_objectWithoutPropertiesLoose(_ref, Modal_excluded);
  const ownerWindow = useWindow();
  const container = useWaitForDOMRef(containerRef);
  const modal = useModalManager(providedManager);
  const isMounted = useMounted();
  const prevShow = usePrevious(show);
  const [exited, setExited] = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(!show);
  const lastFocusRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useImperativeHandle)(ref, () => modal, [modal]);
  if (canUseDOM && !prevShow && show) {
    lastFocusRef.current = activeElement(ownerWindow == null ? void 0 : ownerWindow.document);
  }

  // TODO: I think this needs to be in an effect
  if (show && exited) {
    setExited(false);
  }
  const handleShow = useEventCallback(() => {
    modal.add();
    removeKeydownListenerRef.current = esm_listen(document, 'keydown', handleDocumentKeyDown);
    removeFocusListenerRef.current = esm_listen(document, 'focus',
    // the timeout is necessary b/c this will run before the new modal is mounted
    // and so steals focus from it
    () => setTimeout(handleEnforceFocus), true);
    if (onShow) {
      onShow();
    }

    // autofocus after onShow to not trigger a focus event for previous
    // modals before this one is shown.
    if (autoFocus) {
      var _modal$dialog$ownerDo, _modal$dialog;
      const currentActiveElement = activeElement((_modal$dialog$ownerDo = (_modal$dialog = modal.dialog) == null ? void 0 : _modal$dialog.ownerDocument) != null ? _modal$dialog$ownerDo : ownerWindow == null ? void 0 : ownerWindow.document);
      if (modal.dialog && currentActiveElement && !contains_contains(modal.dialog, currentActiveElement)) {
        lastFocusRef.current = currentActiveElement;
        modal.dialog.focus();
      }
    }
  });
  const handleHide = useEventCallback(() => {
    modal.remove();
    removeKeydownListenerRef.current == null ? void 0 : removeKeydownListenerRef.current();
    removeFocusListenerRef.current == null ? void 0 : removeFocusListenerRef.current();
    if (restoreFocus) {
      var _lastFocusRef$current;
      // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
      (_lastFocusRef$current = lastFocusRef.current) == null ? void 0 : _lastFocusRef$current.focus == null ? void 0 : _lastFocusRef$current.focus(restoreFocusOptions);
      lastFocusRef.current = null;
    }
  });

  // TODO: try and combine these effects: https://github.com/react-bootstrap/react-overlays/pull/794#discussion_r409954120

  // Show logic when:
  //  - show is `true` _and_ `container` has resolved
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    if (!show || !container) return;
    handleShow();
  }, [show, container, /* should never change: */handleShow]);

  // Hide cleanup logic when:
  //  - `exited` switches to true
  //  - component unmounts;
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    if (!exited) return;
    handleHide();
  }, [exited, handleHide]);
  useWillUnmount(() => {
    handleHide();
  });

  // --------------------------------

  const handleEnforceFocus = useEventCallback(() => {
    if (!enforceFocus || !isMounted() || !modal.isTopModal()) {
      return;
    }
    const currentActiveElement = activeElement(ownerWindow == null ? void 0 : ownerWindow.document);
    if (modal.dialog && currentActiveElement && !contains_contains(modal.dialog, currentActiveElement)) {
      modal.dialog.focus();
    }
  });
  const handleBackdropClick = useEventCallback(e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onBackdropClick == null ? void 0 : onBackdropClick(e);
    if (backdrop === true) {
      onHide();
    }
  });
  const handleDocumentKeyDown = useEventCallback(e => {
    if (keyboard && isEscKey(e) && modal.isTopModal()) {
      onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);
      if (!e.defaultPrevented) {
        onHide();
      }
    }
  });
  const removeFocusListenerRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)();
  const removeKeydownListenerRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)();
  const handleHidden = (...args) => {
    setExited(true);
    onExited == null ? void 0 : onExited(...args);
  };
  if (!container) {
    return null;
  }
  const dialogProps = Object.assign({
    role,
    ref: modal.setDialogRef,
    // apparently only works on the dialog role element
    'aria-modal': role === 'dialog' ? true : undefined
  }, rest, {
    style,
    className,
    tabIndex: -1
  });
  let dialog = renderDialog ? renderDialog(dialogProps) : /*#__PURE__*/(0,jsx_runtime.jsx)("div", Object.assign({}, dialogProps, {
    children: /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement(children, {
      role: 'document'
    })
  }));
  dialog = renderTransition(transition, runTransition, {
    unmountOnExit: true,
    mountOnEnter: true,
    appear: true,
    in: !!show,
    onExit,
    onExiting,
    onExited: handleHidden,
    onEnter,
    onEntering,
    onEntered,
    children: dialog
  });
  let backdropElement = null;
  if (backdrop) {
    backdropElement = renderBackdrop({
      ref: modal.setBackdropRef,
      onClick: handleBackdropClick
    });
    backdropElement = renderTransition(backdropTransition, runBackdropTransition, {
      in: !!show,
      appear: true,
      mountOnEnter: true,
      unmountOnExit: true,
      children: backdropElement
    });
  }
  return /*#__PURE__*/(0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
    children: /*#__PURE__*/external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().createPortal( /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
      children: [backdropElement, dialog]
    }), container)
  });
});
Modal.displayName = 'Modal';
/* harmony default export */ const esm_Modal = (Object.assign(Modal, {
  Manager: esm_ModalManager
}));
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/hasClass.js
/**
 * Checks if a given element has a CSS class.
 * 
 * @param element the element
 * @param className the CSS class name
 */
function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/addClass.js

/**
 * Adds a CSS class to a given element.
 * 
 * @param element the element
 * @param className the CSS class name
 */

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!hasClass(element, className)) if (typeof element.className === 'string') element.className = element.className + " " + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + " " + className);
}
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/removeClass.js
function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}
/**
 * Removes a CSS class from a given element.
 * 
 * @param element the element
 * @param className the CSS class name
 */

function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === 'string') {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
  }
}
;// CONCATENATED MODULE: ./src/BootstrapModalManager.tsx





const Selector = {
  FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
  STICKY_CONTENT: '.sticky-top',
  NAVBAR_TOGGLER: '.navbar-toggler'
};
class BootstrapModalManager extends esm_ModalManager {
  adjustAndStore(prop, element, adjust) {
    const actual = element.style[prop];
    // TODO: DOMStringMap and CSSStyleDeclaration aren't strictly compatible
    // @ts-ignore
    element.dataset[prop] = actual;
    css(element, {
      [prop]: `${parseFloat(css(element, prop)) + adjust}px`
    });
  }
  restore(prop, element) {
    const value = element.dataset[prop];
    if (value !== undefined) {
      delete element.dataset[prop];
      css(element, {
        [prop]: value
      });
    }
  }
  setContainerStyle(containerState) {
    super.setContainerStyle(containerState);
    const container = this.getElement();
    addClass(container, 'modal-open');
    if (!containerState.scrollBarWidth) return;
    const paddingProp = this.isRTL ? 'paddingLeft' : 'paddingRight';
    const marginProp = this.isRTL ? 'marginLeft' : 'marginRight';
    qsa(container, Selector.FIXED_CONTENT).forEach(el => this.adjustAndStore(paddingProp, el, containerState.scrollBarWidth));
    qsa(container, Selector.STICKY_CONTENT).forEach(el => this.adjustAndStore(marginProp, el, -containerState.scrollBarWidth));
    qsa(container, Selector.NAVBAR_TOGGLER).forEach(el => this.adjustAndStore(marginProp, el, containerState.scrollBarWidth));
  }
  removeContainerStyle(containerState) {
    super.removeContainerStyle(containerState);
    const container = this.getElement();
    removeClass(container, 'modal-open');
    const paddingProp = this.isRTL ? 'paddingLeft' : 'paddingRight';
    const marginProp = this.isRTL ? 'marginLeft' : 'marginRight';
    qsa(container, Selector.FIXED_CONTENT).forEach(el => this.restore(paddingProp, el));
    qsa(container, Selector.STICKY_CONTENT).forEach(el => this.restore(marginProp, el));
    qsa(container, Selector.NAVBAR_TOGGLER).forEach(el => this.restore(marginProp, el));
  }
}
let sharedManager;
function getSharedManager(options) {
  if (!sharedManager) sharedManager = new BootstrapModalManager(options);
  return sharedManager;
}
/* harmony default export */ const src_BootstrapModalManager = (BootstrapModalManager);
;// CONCATENATED MODULE: ./src/ModalBody.tsx
var ModalBody_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ModalBody.tsx";




const ModalBody = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-body');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: ModalBody_jsxFileName,
    lineNumber: 15,
    columnNumber: 9
  }, undefined);
});
ModalBody.displayName = 'ModalBody';
/* harmony default export */ const src_ModalBody = (ModalBody);
;// CONCATENATED MODULE: ./src/ModalContext.tsx

const ModalContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onHide() {}
});
/* harmony default export */ const src_ModalContext = (ModalContext);
;// CONCATENATED MODULE: ./src/ModalDialog.tsx
var ModalDialog_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ModalDialog.tsx";





const ModalDialog_propTypes = {
  /** @default 'modal' */
  bsPrefix: (prop_types_default()).string,
  contentClassName: (prop_types_default()).string,
  /**
   * Render a large, extra large or small modal.
   *
   * @type ('sm'|'lg'|'xl')
   */
  size: (prop_types_default()).string,
  /**
   * Renders a fullscreen modal. Specifying a breakpoint will render the modal
   * as fullscreen __below__ the breakpoint size.
   *
   * @type (true|'sm-down'|'md-down'|'lg-down'|'xl-down'|'xxl-down')
   */
  fullscreen: prop_types_default().oneOfType([(prop_types_default()).bool, (prop_types_default()).string]),
  /**
   * Specify whether the Component should be vertically centered
   */
  centered: (prop_types_default()).bool,
  /**
   * Allows scrolling the `<Modal.Body>` instead of the entire Modal when overflowing.
   */
  scrollable: (prop_types_default()).bool
};
const ModalDialog = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  contentClassName,
  centered,
  size,
  fullscreen,
  children,
  scrollable,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'modal');
  const dialogClass = `${bsPrefix}-dialog`;
  const fullScreenClass = typeof fullscreen === 'string' ? `${bsPrefix}-fullscreen-${fullscreen}` : `${bsPrefix}-fullscreen`;
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
    ...props,
    ref: ref,
    className: classnames_default()(dialogClass, className, size && `${bsPrefix}-${size}`, centered && `${dialogClass}-centered`, scrollable && `${dialogClass}-scrollable`, fullscreen && fullScreenClass),
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
      className: classnames_default()(`${bsPrefix}-content`, contentClassName),
      children: children
    }, void 0, false, {
      fileName: ModalDialog_jsxFileName,
      lineNumber: 93,
      columnNumber: 9
    }, undefined)
  }, void 0, false, {
    fileName: ModalDialog_jsxFileName,
    lineNumber: 81,
    columnNumber: 7
  }, undefined);
});
ModalDialog.displayName = 'ModalDialog';
ModalDialog.propTypes = ModalDialog_propTypes;
/* harmony default export */ const src_ModalDialog = (ModalDialog);
;// CONCATENATED MODULE: ./src/ModalFooter.tsx
var ModalFooter_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ModalFooter.tsx";




const ModalFooter = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-footer');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: ModalFooter_jsxFileName,
    lineNumber: 15,
    columnNumber: 9
  }, undefined);
});
ModalFooter.displayName = 'ModalFooter';
/* harmony default export */ const src_ModalFooter = (ModalFooter);
;// CONCATENATED MODULE: ./src/AbstractModalHeader.tsx
var AbstractModalHeader_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/AbstractModalHeader.tsx";







const AbstractModalHeader_propTypes = {
  /**
   * Provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  closeLabel: (prop_types_default()).string,
  /**
   * Sets the variant for close button.
   */
  closeVariant: prop_types_default().oneOf(['white']),
  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: (prop_types_default()).bool,
  /**
   * A Callback fired when the close button is clicked. If used directly inside
   * a ModalContext, the onHide will automatically be propagated up
   * to the parent `onHide`.
   */
  onHide: (prop_types_default()).func
};
const AbstractModalHeader = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  closeLabel = 'Close',
  closeVariant,
  closeButton = false,
  onHide,
  children,
  ...props
}, ref) => {
  const context = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_ModalContext);
  const handleClick = useEventCallback(() => {
    context == null ? void 0 : context.onHide();
    onHide == null ? void 0 : onHide();
  });
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
    ref: ref,
    ...props,
    children: [children, closeButton && /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_CloseButton, {
      "aria-label": closeLabel,
      variant: closeVariant,
      onClick: handleClick
    }, void 0, false, {
      fileName: AbstractModalHeader_jsxFileName,
      lineNumber: 69,
      columnNumber: 11
    }, undefined)]
  }, void 0, true, {
    fileName: AbstractModalHeader_jsxFileName,
    lineNumber: 65,
    columnNumber: 7
  }, undefined);
});
AbstractModalHeader.propTypes = AbstractModalHeader_propTypes;
/* harmony default export */ const src_AbstractModalHeader = (AbstractModalHeader);
;// CONCATENATED MODULE: ./src/ModalHeader.tsx
var ModalHeader_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ModalHeader.tsx";






const ModalHeader_propTypes = {
  /**
   * @default 'modal-header'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  closeLabel: (prop_types_default()).string,
  /**
   * Sets the variant for close button.
   */
  closeVariant: prop_types_default().oneOf(['white']),
  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: (prop_types_default()).bool,
  /**
   * A Callback fired when the close button is clicked. If used directly inside
   * a Modal component, the onHide will automatically be propagated up to the
   * parent Modal `onHide`.
   */
  onHide: (prop_types_default()).func
};
const ModalHeader = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  closeLabel = 'Close',
  closeButton = false,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-header');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_AbstractModalHeader, {
    ref: ref,
    ...props,
    className: classnames_default()(className, bsPrefix),
    closeLabel: closeLabel,
    closeButton: closeButton
  }, void 0, false, {
    fileName: ModalHeader_jsxFileName,
    lineNumber: 59,
    columnNumber: 7
  }, undefined);
});
ModalHeader.displayName = 'ModalHeader';
ModalHeader.propTypes = ModalHeader_propTypes;
/* harmony default export */ const src_ModalHeader = (ModalHeader);
;// CONCATENATED MODULE: ./src/ModalTitle.tsx
var ModalTitle_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ModalTitle.tsx";





const ModalTitle_DivStyledAsH4 = divWithClassName('h4');
const ModalTitle = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = ModalTitle_DivStyledAsH4,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-title');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: ModalTitle_jsxFileName,
    lineNumber: 18,
    columnNumber: 9
  }, undefined);
});
ModalTitle.displayName = 'ModalTitle';
/* harmony default export */ const src_ModalTitle = (ModalTitle);
;// CONCATENATED MODULE: ./src/Modal.tsx
var Modal_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Modal.tsx";

























const Modal_propTypes = {
  /**
   * @default 'modal'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Render a large, extra large or small modal.
   * When not provided, the modal is rendered with medium (default) size.
   * @type ('sm'|'lg'|'xl')
   */
  size: (prop_types_default()).string,
  /**
   * Renders a fullscreen modal. Specifying a breakpoint will render the modal
   * as fullscreen __below__ the breakpoint size.
   *
   * @type (true|'sm-down'|'md-down'|'lg-down'|'xl-down'|'xxl-down')
   */
  fullscreen: prop_types_default().oneOfType([(prop_types_default()).bool, (prop_types_default()).string]),
  /**
   * vertically center the Dialog in the window
   */
  centered: (prop_types_default()).bool,
  /**
   * Include a backdrop component. Specify 'static' for a backdrop that doesn't
   * trigger an "onHide" when clicked.
   */
  backdrop: prop_types_default().oneOf(['static', true, false]),
  /**
   * Add an optional extra class name to .modal-backdrop
   * It could end up looking like class="modal-backdrop foo-modal-backdrop in".
   */
  backdropClassName: (prop_types_default()).string,
  /**
   * Close the modal when escape key is pressed
   */
  keyboard: (prop_types_default()).bool,
  /**
   * Allows scrolling the `<Modal.Body>` instead of the entire Modal when overflowing.
   */
  scrollable: (prop_types_default()).bool,
  /**
   * Open and close the Modal with a slide and fade animation.
   */
  animation: (prop_types_default()).bool,
  /**
   * A css class to apply to the Modal dialog DOM node.
   */
  dialogClassName: (prop_types_default()).string,
  /**
   * Add an optional extra class name to .modal-content
   */
  contentClassName: (prop_types_default()).string,
  /**
   * A Component type that provides the modal content Markup. This is a useful
   * prop when you want to use your own styles and markup to create a custom
   * modal component.
   */
  dialogAs: (prop_types_default()).elementType,
  /**
   * When `true` The modal will automatically shift focus to itself when it
   * opens, and replace it to the last focused element when it closes.
   * Generally this should never be set to false as it makes the Modal less
   * accessible to assistive technologies, like screen-readers.
   */
  autoFocus: (prop_types_default()).bool,
  /**
   * When `true` The modal will prevent focus from leaving the Modal while
   * open. Consider leaving the default value here, as it is necessary to make
   * the Modal work well with assistive technologies, such as screen readers.
   */
  enforceFocus: (prop_types_default()).bool,
  /**
   * When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus: (prop_types_default()).bool,
  /**
   * Options passed to focus function when `restoreFocus` is set to `true`
   *
   * @link  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Parameters
   */
  restoreFocusOptions: prop_types_default().shape({
    preventScroll: (prop_types_default()).bool
  }),
  /**
   * When `true` The modal will show itself.
   */
  show: (prop_types_default()).bool,
  /**
   * A callback fired when the Modal is opening.
   */
  onShow: (prop_types_default()).func,
  /**
   * A callback fired when the header closeButton or non-static backdrop is
   * clicked. Required if either are specified.
   */
  onHide: (prop_types_default()).func,
  /**
   * A callback fired when the escape key, if specified in `keyboard`, is pressed.
   */
  onEscapeKeyDown: (prop_types_default()).func,
  /**
   * Callback fired before the Modal transitions in
   */
  onEnter: (prop_types_default()).func,
  /**
   * Callback fired as the Modal begins to transition in
   */
  onEntering: (prop_types_default()).func,
  /**
   * Callback fired after the Modal finishes transitioning in
   */
  onEntered: (prop_types_default()).func,
  /**
   * Callback fired right before the Modal transitions out
   */
  onExit: (prop_types_default()).func,
  /**
   * Callback fired as the Modal begins to transition out
   */
  onExiting: (prop_types_default()).func,
  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited: (prop_types_default()).func,
  /**
   * A ModalManager instance used to track and manage the state of open
   * Modals. Useful when customizing how modals interact within a container
   */
  manager: (prop_types_default()).object,
  /**
   * @private
   */
  container: (prop_types_default()).any,
  'aria-labelledby': (prop_types_default()).string,
  'aria-describedby': (prop_types_default()).string,
  'aria-label': (prop_types_default()).string
};

/* eslint-disable no-use-before-define, react/no-multi-comp */
function DialogTransition(props) {
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Fade, {
    ...props,
    timeout: null
  }, void 0, false, {
    fileName: Modal_jsxFileName,
    lineNumber: 227,
    columnNumber: 10
  }, this);
}
function BackdropTransition(props) {
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Fade, {
    ...props,
    timeout: null
  }, void 0, false, {
    fileName: Modal_jsxFileName,
    lineNumber: 231,
    columnNumber: 10
  }, this);
}

/* eslint-enable no-use-before-define */
const Modal_Modal = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  style,
  dialogClassName,
  contentClassName,
  children,
  dialogAs: Dialog = src_ModalDialog,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-label': ariaLabel,
  /* BaseModal props */

  show = false,
  animation = true,
  backdrop = true,
  keyboard = true,
  onEscapeKeyDown,
  onShow,
  onHide,
  container,
  autoFocus = true,
  enforceFocus = true,
  restoreFocus = true,
  restoreFocusOptions,
  onEntered,
  onExit,
  onExiting,
  onEnter,
  onEntering,
  onExited,
  backdropClassName,
  manager: propsManager,
  ...props
}, ref) => {
  const [modalStyle, setStyle] = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)({});
  const [animateStaticModal, setAnimateStaticModal] = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(false);
  const waitingForMouseUpRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(false);
  const ignoreBackdropClickRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(false);
  const removeStaticModalAnimationRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  const [modal, setModalRef] = useCallbackRef();
  const mergedRef = esm_useMergedRefs(ref, setModalRef);
  const handleHide = useEventCallback(onHide);
  const isRTL = useIsRTL();
  bsPrefix = useBootstrapPrefix(bsPrefix, 'modal');
  const modalContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({
    onHide: handleHide
  }), [handleHide]);
  function getModalManager() {
    if (propsManager) return propsManager;
    return getSharedManager({
      isRTL
    });
  }
  function updateDialogStyle(node) {
    if (!canUseDOM) return;
    const containerIsOverflowing = getModalManager().getScrollbarWidth() > 0;
    const modalIsOverflowing = node.scrollHeight > ownerDocument(node).documentElement.clientHeight;
    setStyle({
      paddingRight: containerIsOverflowing && !modalIsOverflowing ? scrollbarSize() : undefined,
      paddingLeft: !containerIsOverflowing && modalIsOverflowing ? scrollbarSize() : undefined
    });
  }
  const handleWindowResize = useEventCallback(() => {
    if (modal) {
      updateDialogStyle(modal.dialog);
    }
  });
  useWillUnmount(() => {
    esm_removeEventListener(window, 'resize', handleWindowResize);
    removeStaticModalAnimationRef.current == null ? void 0 : removeStaticModalAnimationRef.current();
  });

  // We prevent the modal from closing during a drag by detecting where the
  // click originates from. If it starts in the modal and then ends outside
  // don't close.
  const handleDialogMouseDown = () => {
    waitingForMouseUpRef.current = true;
  };
  const handleMouseUp = e => {
    if (waitingForMouseUpRef.current && modal && e.target === modal.dialog) {
      ignoreBackdropClickRef.current = true;
    }
    waitingForMouseUpRef.current = false;
  };
  const handleStaticModalAnimation = () => {
    setAnimateStaticModal(true);
    removeStaticModalAnimationRef.current = transitionEnd(modal.dialog, () => {
      setAnimateStaticModal(false);
    });
  };
  const handleStaticBackdropClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    handleStaticModalAnimation();
  };
  const handleClick = e => {
    if (backdrop === 'static') {
      handleStaticBackdropClick(e);
      return;
    }
    if (ignoreBackdropClickRef.current || e.target !== e.currentTarget) {
      ignoreBackdropClickRef.current = false;
      return;
    }
    onHide == null ? void 0 : onHide();
  };
  const handleEscapeKeyDown = e => {
    if (keyboard) {
      onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);
    } else {
      // Call preventDefault to stop modal from closing in @restart/ui.
      e.preventDefault();
      if (backdrop === 'static') {
        // Play static modal animation.
        handleStaticModalAnimation();
      }
    }
  };
  const handleEnter = (node, isAppearing) => {
    if (node) {
      updateDialogStyle(node);
    }
    onEnter == null ? void 0 : onEnter(node, isAppearing);
  };
  const handleExit = node => {
    removeStaticModalAnimationRef.current == null ? void 0 : removeStaticModalAnimationRef.current();
    onExit == null ? void 0 : onExit(node);
  };
  const handleEntering = (node, isAppearing) => {
    onEntering == null ? void 0 : onEntering(node, isAppearing);

    // FIXME: This should work even when animation is disabled.
    esm_addEventListener(window, 'resize', handleWindowResize);
  };
  const handleExited = node => {
    if (node) node.style.display = ''; // RHL removes it sometimes
    onExited == null ? void 0 : onExited(node);

    // FIXME: This should work even when animation is disabled.
    esm_removeEventListener(window, 'resize', handleWindowResize);
  };
  const renderBackdrop = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(backdropProps => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
    ...backdropProps,
    className: classnames_default()(`${bsPrefix}-backdrop`, backdropClassName, !animation && 'show')
  }, void 0, false, {
    fileName: Modal_jsxFileName,
    lineNumber: 426,
    columnNumber: 11
  }, undefined), [animation, backdropClassName, bsPrefix]);
  const baseModalStyle = {
    ...style,
    ...modalStyle
  };

  // If `display` is not set to block, autoFocus inside the modal fails
  // https://github.com/react-bootstrap/react-bootstrap/issues/5102
  baseModalStyle.display = 'block';
  const renderDialog = dialogProps => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
    role: "dialog",
    ...dialogProps,
    style: baseModalStyle,
    className: classnames_default()(className, bsPrefix, animateStaticModal && `${bsPrefix}-static`, !animation && 'show'),
    onClick: backdrop ? handleClick : undefined,
    onMouseUp: handleMouseUp,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Dialog, {
      ...props,
      onMouseDown: handleDialogMouseDown,
      className: dialogClassName,
      contentClassName: contentClassName,
      children: children
    }, void 0, false, {
      fileName: Modal_jsxFileName,
      lineNumber: 463,
      columnNumber: 11
    }, undefined)
  }, void 0, false, {
    fileName: Modal_jsxFileName,
    lineNumber: 445,
    columnNumber: 9
  }, undefined);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_ModalContext.Provider, {
    value: modalContext,
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(esm_Modal, {
      show: show,
      ref: mergedRef,
      backdrop: backdrop,
      container: container,
      keyboard: true // Always set true - see handleEscapeKeyDown
      ,
      autoFocus: autoFocus,
      enforceFocus: enforceFocus,
      restoreFocus: restoreFocus,
      restoreFocusOptions: restoreFocusOptions,
      onEscapeKeyDown: handleEscapeKeyDown,
      onShow: onShow,
      onHide: onHide,
      onEnter: handleEnter,
      onEntering: handleEntering,
      onEntered: onEntered,
      onExit: handleExit,
      onExiting: onExiting,
      onExited: handleExited,
      manager: getModalManager(),
      transition: animation ? DialogTransition : undefined,
      backdropTransition: animation ? BackdropTransition : undefined,
      renderBackdrop: renderBackdrop,
      renderDialog: renderDialog
    }, void 0, false, {
      fileName: Modal_jsxFileName,
      lineNumber: 476,
      columnNumber: 11
    }, undefined)
  }, void 0, false, {
    fileName: Modal_jsxFileName,
    lineNumber: 475,
    columnNumber: 9
  }, undefined);
});
Modal_Modal.displayName = 'Modal';
Modal_Modal.propTypes = Modal_propTypes;
/* harmony default export */ const src_Modal = (Object.assign(Modal_Modal, {
  Body: src_ModalBody,
  Header: src_ModalHeader,
  Title: src_ModalTitle,
  Footer: src_ModalFooter,
  Dialog: src_ModalDialog,
  TRANSITION_DURATION: 300,
  BACKDROP_TRANSITION_DURATION: 150
}));
// EXTERNAL MODULE: ./node_modules/prop-types-extra/lib/all.js
var lib_all = __webpack_require__(946);
var all_default = /*#__PURE__*/__webpack_require__.n(lib_all);
;// CONCATENATED MODULE: ./src/NavItem.tsx
var NavItem_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/NavItem.tsx";




const NavItem_NavItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-item');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: NavItem_jsxFileName,
    lineNumber: 15,
    columnNumber: 9
  }, undefined);
});
NavItem_NavItem.displayName = 'NavItem';
/* harmony default export */ const src_NavItem = (NavItem_NavItem);
;// CONCATENATED MODULE: ./src/NavLink.tsx
var NavLink_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/NavLink.tsx";








const NavLink_propTypes = {
  /**
   * @default 'nav-link'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * The active state of the NavItem item.
   */
  active: (prop_types_default()).bool,
  /**
   * The disabled state of the NavItem item.
   */
  disabled: (prop_types_default()).bool,
  /**
   * The ARIA role for the `NavLink`, In the context of a 'tablist' parent Nav,
   * the role defaults to 'tab'
   * */
  role: (prop_types_default()).string,
  /** The HTML href attribute for the `NavLink` */
  href: (prop_types_default()).string,
  /**
   * Uniquely identifies the `NavItem` amongst its siblings,
   * used to determine and control the active state of the parent `Nav`
   */
  eventKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]),
  /** @default 'a' */
  as: (prop_types_default()).elementType
};
const NavLink = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  as: Component = esm_Anchor,
  active,
  eventKey,
  disabled = false,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-link');
  const [navItemProps, meta] = useNavItem({
    key: makeEventKey(eventKey, props.href),
    active,
    disabled,
    ...props
  });
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ...props,
    ...navItemProps,
    ref: ref,
    disabled: disabled,
    className: classnames_default()(className, bsPrefix, disabled && 'disabled', meta.isActive && 'active')
  }, void 0, false, {
    fileName: NavLink_jsxFileName,
    lineNumber: 76,
    columnNumber: 9
  }, undefined);
});
NavLink.displayName = 'NavLink';
NavLink.propTypes = NavLink_propTypes;
/* harmony default export */ const src_NavLink = (NavLink);
;// CONCATENATED MODULE: ./src/Nav.tsx
var Nav_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Nav.tsx";













const Nav_propTypes = {
  /**
   * @default 'nav'
   */
  bsPrefix: (prop_types_default()).string,
  /** @private */
  navbarBsPrefix: (prop_types_default()).string,
  /** @private */
  cardHeaderBsPrefix: (prop_types_default()).string,
  /**
   * The visual variant of the nav items.
   *
   * @type {('tabs'| 'pills' | 'underline')}
   */
  variant: (prop_types_default()).string,
  /**
   * Marks the NavItem with a matching `eventKey` (or `href` if present) as active.
   */
  activeKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]),
  /**
   * The default active key that is selected on start.
   */
  defaultActiveKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]),
  /**
   * Have all `NavItem`s proportionately fill all available width.
   */
  fill: (prop_types_default()).bool,
  /**
   * Have all `NavItem`s evenly fill all available width.
   *
   * @type {boolean}
   */
  justify: all_default()((prop_types_default()).bool, ({
    justify,
    navbar
  }) => justify && navbar ? Error('justify navbar `Nav`s are not supported') : null),
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
  onSelect: (prop_types_default()).func,
  /**
   * ARIA role for the Nav, in the context of a TabContainer, the default will
   * be set to "tablist", but can be overridden by the Nav when set explicitly.
   *
   * When the role is "tablist", NavLink focus is managed according to
   * the ARIA authoring practices for tabs:
   * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
   */
  role: (prop_types_default()).string,
  /**
   * Apply styling an alignment for use in a Navbar. This prop will be set
   * automatically when the Nav is used inside a Navbar.
   */
  navbar: (prop_types_default()).bool,
  /**
   * Enable vertical scrolling within the toggleable contents of a collapsed Navbar.
   */
  navbarScroll: (prop_types_default()).bool,
  as: (prop_types_default()).elementType,
  /** @private */
  onKeyDown: (prop_types_default()).func
};
const Nav_Nav = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((uncontrolledProps, ref) => {
  const {
    as = 'div',
    bsPrefix: initialBsPrefix,
    variant,
    fill = false,
    justify = false,
    navbar,
    navbarScroll,
    className,
    activeKey,
    ...props
  } = useUncontrolled(uncontrolledProps, {
    activeKey: 'onSelect'
  });
  const bsPrefix = useBootstrapPrefix(initialBsPrefix, 'nav');
  let navbarBsPrefix;
  let cardHeaderBsPrefix;
  let isNavbar = false;
  const navbarContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(NavbarContext);
  const cardHeaderContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(CardHeaderContext);
  if (navbarContext) {
    navbarBsPrefix = navbarContext.bsPrefix;
    isNavbar = navbar == null ? true : navbar;
  } else if (cardHeaderContext) {
    ({
      cardHeaderBsPrefix
    } = cardHeaderContext);
  }
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(esm_Nav, {
    as: as,
    ref: ref,
    activeKey: activeKey,
    className: classnames_default()(className, {
      [bsPrefix]: !isNavbar,
      [`${navbarBsPrefix}-nav`]: isNavbar,
      [`${navbarBsPrefix}-nav-scroll`]: isNavbar && navbarScroll,
      [`${cardHeaderBsPrefix}-${variant}`]: !!cardHeaderBsPrefix,
      [`${bsPrefix}-${variant}`]: !!variant,
      [`${bsPrefix}-fill`]: fill,
      [`${bsPrefix}-justified`]: justify
    }),
    ...props
  }, void 0, false, {
    fileName: Nav_jsxFileName,
    lineNumber: 143,
    columnNumber: 5
  }, undefined);
});
Nav_Nav.displayName = 'Nav';
Nav_Nav.propTypes = Nav_propTypes;
/* harmony default export */ const src_Nav = (Object.assign(Nav_Nav, {
  Item: src_NavItem,
  Link: src_NavLink
}));
;// CONCATENATED MODULE: ./src/NavbarBrand.tsx
var NavbarBrand_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/NavbarBrand.tsx";





const NavbarBrand_propTypes = {
  /** @default 'navbar' */
  bsPrefix: (prop_types_default()).string,
  /**
   * An href, when provided the Brand will render as an `<a>` element (unless `as` is provided).
   */
  href: (prop_types_default()).string,
  /**
   * Set a custom element for this component.
   */
  as: (prop_types_default()).elementType
};
const NavbarBrand = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  as,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-brand');
  const Component = as || (props.href ? 'a' : 'span');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ...props,
    ref: ref,
    className: classnames_default()(className, bsPrefix)
  }, void 0, false, {
    fileName: NavbarBrand_jsxFileName,
    lineNumber: 37,
    columnNumber: 9
  }, undefined);
});
NavbarBrand.displayName = 'NavbarBrand';
NavbarBrand.propTypes = NavbarBrand_propTypes;
/* harmony default export */ const src_NavbarBrand = (NavbarBrand);
;// CONCATENATED MODULE: ./src/NavbarCollapse.tsx
var NavbarCollapse_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/NavbarCollapse.tsx";







const NavbarCollapse_propTypes = {
  /** @default 'navbar-collapse' */
  bsPrefix: (prop_types_default()).string
};
const NavbarCollapse = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  children,
  bsPrefix,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-collapse');
  const context = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(NavbarContext);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Collapse, {
    in: !!(context && context.expanded),
    ...props,
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
      ref: ref,
      className: bsPrefix,
      children: children
    }, void 0, false, {
      fileName: NavbarCollapse_jsxFileName,
      lineNumber: 27,
      columnNumber: 9
    }, undefined)
  }, void 0, false, {
    fileName: NavbarCollapse_jsxFileName,
    lineNumber: 26,
    columnNumber: 7
  }, undefined);
});
NavbarCollapse.displayName = 'NavbarCollapse';
NavbarCollapse.propTypes = NavbarCollapse_propTypes;
/* harmony default export */ const src_NavbarCollapse = (NavbarCollapse);
;// CONCATENATED MODULE: ./src/NavbarToggle.tsx
var NavbarToggle_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/NavbarToggle.tsx";








const NavbarToggle_propTypes = {
  /** @default 'navbar-toggler' */
  bsPrefix: (prop_types_default()).string,
  /** An accessible ARIA label for the toggler button. */
  label: (prop_types_default()).string,
  /** @private */
  onClick: (prop_types_default()).func,
  /**
   * The toggle content. When empty, the default toggle will be rendered.
   */
  children: (prop_types_default()).node,
  as: (prop_types_default()).elementType
};
const NavbarToggle = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  children,
  label = 'Toggle navigation',
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'button',
  onClick,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-toggler');
  const {
    onToggle,
    expanded
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(NavbarContext) || {};
  const handleClick = useEventCallback(e => {
    if (onClick) onClick(e);
    if (onToggle) onToggle();
  });
  if (Component === 'button') {
    props.type = 'button';
  }
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ...props,
    ref: ref,
    onClick: handleClick,
    "aria-label": label,
    className: classnames_default()(className, bsPrefix, !expanded && 'collapsed'),
    children: children || /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("span", {
      className: `${bsPrefix}-icon`
    }, void 0, false, {
      fileName: NavbarToggle_jsxFileName,
      lineNumber: 73,
      columnNumber: 22
    }, undefined)
  }, void 0, false, {
    fileName: NavbarToggle_jsxFileName,
    lineNumber: 66,
    columnNumber: 7
  }, undefined);
});
NavbarToggle.displayName = 'NavbarToggle';
NavbarToggle.propTypes = NavbarToggle_propTypes;
/* harmony default export */ const src_NavbarToggle = (NavbarToggle);
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useMediaQuery.js


var matchersByWindow = new WeakMap();
var getMatcher = function getMatcher(query, targetWindow) {
  if (!query || !targetWindow) return undefined;
  var matchers = matchersByWindow.get(targetWindow) || new Map();
  matchersByWindow.set(targetWindow, matchers);
  var mql = matchers.get(query);
  if (!mql) {
    mql = targetWindow.matchMedia(query);
    mql.refCount = 0;
    matchers.set(mql.media, mql);
  }
  return mql;
};
/**
 * Match a media query and get updates as the match changes. The media string is
 * passed directly to `window.matchMedia` and run as a Layout Effect, so initial
 * matches are returned before the browser has a chance to paint.
 *
 * ```tsx
 * function Page() {
 *   const isWide = useMediaQuery('min-width: 1000px')
 *
 *   return isWide ? "very wide" : 'not so wide'
 * }
 * ```
 *
 * Media query lists are also reused globally, hook calls for the same query
 * will only create a matcher once under the hood.
 *
 * @param query A media query
 * @param targetWindow The window to match against, uses the globally available one as a default.
 */

function useMediaQuery(query, targetWindow) {
  if (targetWindow === void 0) {
    targetWindow = typeof window === 'undefined' ? undefined : window;
  }
  var mql = getMatcher(query, targetWindow);
  var _useState = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(function () {
      return mql ? mql.matches : false;
    }),
    matches = _useState[0],
    setMatches = _useState[1];
  useIsomorphicEffect(function () {
    var mql = getMatcher(query, targetWindow);
    if (!mql) {
      return setMatches(false);
    }
    var matchers = matchersByWindow.get(targetWindow);
    var handleChange = function handleChange() {
      setMatches(mql.matches);
    };
    mql.refCount++;
    mql.addListener(handleChange);
    handleChange();
    return function () {
      mql.removeListener(handleChange);
      mql.refCount--;
      if (mql.refCount <= 0) {
        matchers == null ? void 0 : matchers.delete(mql.media);
      }
      mql = undefined;
    };
  }, [query]);
  return matches;
}
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useBreakpoint.js



/**
 * Create a responsive hook we a set of breakpoint names and widths.
 * You can use any valid css units as well as a numbers (for pixels).
 *
 * **NOTE:** The object key order is important! it's assumed to be in order from smallest to largest
 *
 * ```ts
 * const useBreakpoint = createBreakpointHook({
 *  xs: 0,
 *  sm: 576,
 *  md: 768,
 *  lg: 992,
 *  xl: 1200,
 * })
 * ```
 *
 * **Watch out!** using string values will sometimes construct media queries using css `calc()` which
 * is NOT supported in media queries by all browsers at the moment. use numbers for
 * the widest range of browser support.
 *
 * @param breakpointValues A object hash of names to breakpoint dimensions
 */
function createBreakpointHook(breakpointValues) {
  var names = Object.keys(breakpointValues);
  function and(query, next) {
    if (query === next) {
      return next;
    }
    return query ? query + " and " + next : next;
  }
  function getNext(breakpoint) {
    return names[Math.min(names.indexOf(breakpoint) + 1, names.length - 1)];
  }
  function getMaxQuery(breakpoint) {
    var next = getNext(breakpoint);
    var value = breakpointValues[next];
    if (typeof value === 'number') value = value - 0.2 + "px";else value = "calc(" + value + " - 0.2px)";
    return "(max-width: " + value + ")";
  }
  function getMinQuery(breakpoint) {
    var value = breakpointValues[breakpoint];
    if (typeof value === 'number') {
      value = value + "px";
    }
    return "(min-width: " + value + ")";
  }
  /**
   * Match a set of breakpoints
   *
   * ```tsx
   * const MidSizeOnly = () => {
   *   const isMid = useBreakpoint({ lg: 'down', sm: 'up' });
   *
   *   if (isMid) return <div>On a Reasonable sized Screen!</div>
   *   return null;
   * }
   * ```
   * @param breakpointMap An object map of breakpoints and directions, queries are constructed using "and" to join
   * breakpoints together
   * @param window Optionally specify the target window to match against (useful when rendering into iframes)
   */

  function useBreakpoint(breakpointOrMap, direction, window) {
    var breakpointMap;
    if (typeof breakpointOrMap === 'object') {
      breakpointMap = breakpointOrMap;
      window = direction;
      direction = true;
    } else {
      var _breakpointMap;
      direction = direction || true;
      breakpointMap = (_breakpointMap = {}, _breakpointMap[breakpointOrMap] = direction, _breakpointMap);
    }
    var query = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
      return Object.entries(breakpointMap).reduce(function (query, _ref) {
        var key = _ref[0],
          direction = _ref[1];
        if (direction === 'up' || direction === true) {
          query = and(query, getMinQuery(key));
        }
        if (direction === 'down' || direction === true) {
          query = and(query, getMaxQuery(key));
        }
        return query;
      }, '');
    }, [JSON.stringify(breakpointMap)]);
    return useMediaQuery(query, window);
  }
  return useBreakpoint;
}
var useBreakpoint = createBreakpointHook({
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
});
/* harmony default export */ const esm_useBreakpoint = (useBreakpoint);
;// CONCATENATED MODULE: ./src/OffcanvasBody.tsx
var OffcanvasBody_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/OffcanvasBody.tsx";




const OffcanvasBody = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas-body');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: OffcanvasBody_jsxFileName,
    lineNumber: 15,
    columnNumber: 9
  }, undefined);
});
OffcanvasBody.displayName = 'OffcanvasBody';
/* harmony default export */ const src_OffcanvasBody = (OffcanvasBody);
;// CONCATENATED MODULE: ./src/OffcanvasToggling.tsx
var OffcanvasToggling_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/OffcanvasToggling.tsx";








const OffcanvasToggling_propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in: (prop_types_default()).bool,
  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: (prop_types_default()).bool,
  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: (prop_types_default()).bool,
  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  appear: (prop_types_default()).bool,
  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: (prop_types_default()).number,
  /**
   * Callback fired before the component fades in
   */
  onEnter: (prop_types_default()).func,
  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: (prop_types_default()).func,
  /**
   * Callback fired after the has component faded in
   */
  onEntered: (prop_types_default()).func,
  /**
   * Callback fired before the component fades out
   */
  onExit: (prop_types_default()).func,
  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: (prop_types_default()).func,
  /**
   * Callback fired after the component has faded out
   */
  onExited: (prop_types_default()).func
};
const transitionStyles = {
  [ENTERING]: 'show',
  [ENTERED]: 'show'
};
const OffcanvasToggling = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  children,
  in: inProp = false,
  mountOnEnter = false,
  unmountOnExit = false,
  appear = false,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_TransitionWrapper, {
    ref: ref,
    addEndListener: transitionEndListener,
    in: inProp,
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit,
    appear: appear,
    ...props,
    childRef: children.ref,
    children: (status, innerProps) => /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement(children, {
      ...innerProps,
      className: classnames_default()(className, children.props.className, (status === ENTERING || status === EXITING) && `${bsPrefix}-toggling`, transitionStyles[status])
    })
  }, void 0, false, {
    fileName: OffcanvasToggling_jsxFileName,
    lineNumber: 108,
    columnNumber: 7
  }, undefined);
});
OffcanvasToggling.propTypes = OffcanvasToggling_propTypes;
OffcanvasToggling.displayName = 'OffcanvasToggling';
/* harmony default export */ const src_OffcanvasToggling = (OffcanvasToggling);
;// CONCATENATED MODULE: ./src/OffcanvasHeader.tsx
var OffcanvasHeader_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/OffcanvasHeader.tsx";






const OffcanvasHeader_propTypes = {
  /**
   * @default 'offcanvas-header'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  closeLabel: (prop_types_default()).string,
  /**
   * Sets the variant for close button.
   */
  closeVariant: prop_types_default().oneOf(['white']),
  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: (prop_types_default()).bool,
  /**
   * A Callback fired when the close button is clicked. If used directly inside
   * a Offcanvas component, the onHide will automatically be propagated up to the
   * parent Offcanvas `onHide`.
   */
  onHide: (prop_types_default()).func
};
const OffcanvasHeader = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  closeLabel = 'Close',
  closeButton = false,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas-header');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_AbstractModalHeader, {
    ref: ref,
    ...props,
    className: classnames_default()(className, bsPrefix),
    closeLabel: closeLabel,
    closeButton: closeButton
  }, void 0, false, {
    fileName: OffcanvasHeader_jsxFileName,
    lineNumber: 59,
    columnNumber: 7
  }, undefined);
});
OffcanvasHeader.displayName = 'OffcanvasHeader';
OffcanvasHeader.propTypes = OffcanvasHeader_propTypes;
/* harmony default export */ const src_OffcanvasHeader = (OffcanvasHeader);
;// CONCATENATED MODULE: ./src/OffcanvasTitle.tsx
var OffcanvasTitle_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/OffcanvasTitle.tsx";





const OffcanvasTitle_DivStyledAsH5 = divWithClassName('h5');
const OffcanvasTitle = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = OffcanvasTitle_DivStyledAsH5,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas-title');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: OffcanvasTitle_jsxFileName,
    lineNumber: 20,
    columnNumber: 7
  }, undefined);
});
OffcanvasTitle.displayName = 'OffcanvasTitle';
/* harmony default export */ const src_OffcanvasTitle = (OffcanvasTitle);
;// CONCATENATED MODULE: ./src/Offcanvas.tsx
var Offcanvas_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Offcanvas.tsx";


















const Offcanvas_propTypes = {
  /**
   * @default 'offcanvas'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Include a backdrop component. Specify 'static' for a backdrop that doesn't
   * trigger an "onHide" when clicked.
   */
  backdrop: prop_types_default().oneOf(['static', true, false]),
  /**
   * Add an optional extra class name to .offcanvas-backdrop.
   */
  backdropClassName: (prop_types_default()).string,
  /**
   * Closes the offcanvas when escape key is pressed.
   */
  keyboard: (prop_types_default()).bool,
  /**
   * Allow body scrolling while offcanvas is open.
   */
  scroll: (prop_types_default()).bool,
  /**
   * Which side of the viewport the offcanvas will appear from.
   */
  placement: prop_types_default().oneOf(['start', 'end', 'top', 'bottom']),
  /**
   * Hide content outside the viewport from a specified breakpoint and down.
   * @type {("sm"|"md"|"lg"|"xl"|"xxl")}
   */
  responsive: (prop_types_default()).string,
  /**
   * When `true` The offcanvas will automatically shift focus to itself when it
   * opens, and replace it to the last focused element when it closes.
   * Generally this should never be set to false as it makes the offcanvas less
   * accessible to assistive technologies, like screen-readers.
   */
  autoFocus: (prop_types_default()).bool,
  /**
   * When `true` The offcanvas will prevent focus from leaving the offcanvas while
   * open. Consider leaving the default value here, as it is necessary to make
   * the offcanvas work well with assistive technologies, such as screen readers.
   */
  enforceFocus: (prop_types_default()).bool,
  /**
   * When `true` The offcanvas will restore focus to previously focused element once
   * offcanvas is hidden
   */
  restoreFocus: (prop_types_default()).bool,
  /**
   * Options passed to focus function when `restoreFocus` is set to `true`
   *
   * @link  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Parameters
   */
  restoreFocusOptions: prop_types_default().shape({
    preventScroll: (prop_types_default()).bool
  }),
  /**
   * When `true` The offcanvas will show itself.
   */
  show: (prop_types_default()).bool,
  /**
   * A callback fired when the offcanvas is opening.
   */
  onShow: (prop_types_default()).func,
  /**
   * A callback fired when the header closeButton or backdrop is
   * clicked. Required if either are specified.
   */
  onHide: (prop_types_default()).func,
  /**
   * A callback fired when the escape key, if specified in `keyboard`, is pressed.
   */
  onEscapeKeyDown: (prop_types_default()).func,
  /**
   * Callback fired before the offcanvas transitions in
   */
  onEnter: (prop_types_default()).func,
  /**
   * Callback fired as the offcanvas begins to transition in
   */
  onEntering: (prop_types_default()).func,
  /**
   * Callback fired after the offcanvas finishes transitioning in
   */
  onEntered: (prop_types_default()).func,
  /**
   * Callback fired right before the offcanvas transitions out
   */
  onExit: (prop_types_default()).func,
  /**
   * Callback fired as the offcanvas begins to transition out
   */
  onExiting: (prop_types_default()).func,
  /**
   * Callback fired after the offcanvas finishes transitioning out
   */
  onExited: (prop_types_default()).func,
  /**
   * @private
   */
  container: (prop_types_default()).any,
  /**
   * For internal use to render static node from NavbarOffcanvas.
   *
   * @private
   */
  renderStaticNode: (prop_types_default()).bool,
  'aria-labelledby': (prop_types_default()).string
};
function Offcanvas_DialogTransition(props) {
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_OffcanvasToggling, {
    ...props
  }, void 0, false, {
    fileName: Offcanvas_jsxFileName,
    lineNumber: 191,
    columnNumber: 10
  }, this);
}
function Offcanvas_BackdropTransition(props) {
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Fade, {
    ...props
  }, void 0, false, {
    fileName: Offcanvas_jsxFileName,
    lineNumber: 195,
    columnNumber: 10
  }, this);
}
const Offcanvas = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  children,
  'aria-labelledby': ariaLabelledby,
  placement = 'start',
  responsive,
  /* BaseModal props */

  show = false,
  backdrop = true,
  keyboard = true,
  scroll = false,
  onEscapeKeyDown,
  onShow,
  onHide,
  container,
  autoFocus = true,
  enforceFocus = true,
  restoreFocus = true,
  restoreFocusOptions,
  onEntered,
  onExit,
  onExiting,
  onEnter,
  onEntering,
  onExited,
  backdropClassName,
  manager: propsManager,
  renderStaticNode = false,
  ...props
}, ref) => {
  const modalManager = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)();
  bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas');
  const {
    onToggle
  } = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(NavbarContext) || {};
  const [showOffcanvas, setShowOffcanvas] = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(false);
  const hideResponsiveOffcanvas = esm_useBreakpoint(responsive || 'xs', 'up');
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    // Handles the case where screen is resized while the responsive
    // offcanvas is shown. If `responsive` not provided, just use `show`.
    setShowOffcanvas(responsive ? show && !hideResponsiveOffcanvas : show);
  }, [show, responsive, hideResponsiveOffcanvas]);
  const handleHide = useEventCallback(() => {
    onToggle == null ? void 0 : onToggle();
    onHide == null ? void 0 : onHide();
  });
  const modalContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({
    onHide: handleHide
  }), [handleHide]);
  function getModalManager() {
    if (propsManager) return propsManager;
    if (scroll) {
      // Have to use a different modal manager since the shared
      // one handles overflow.
      if (!modalManager.current) modalManager.current = new src_BootstrapModalManager({
        handleContainerOverflow: false
      });
      return modalManager.current;
    }
    return getSharedManager();
  }
  const handleEnter = (node, ...args) => {
    if (node) node.style.visibility = 'visible';
    onEnter == null ? void 0 : onEnter(node, ...args);
  };
  const handleExited = (node, ...args) => {
    if (node) node.style.visibility = '';
    onExited == null ? void 0 : onExited(...args);
  };
  const renderBackdrop = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(backdropProps => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
    ...backdropProps,
    className: classnames_default()(`${bsPrefix}-backdrop`, backdropClassName)
  }, void 0, false, {
    fileName: Offcanvas_jsxFileName,
    lineNumber: 291,
    columnNumber: 11
  }, undefined), [backdropClassName, bsPrefix]);
  const renderDialog = dialogProps => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
    ...dialogProps,
    ...props,
    className: classnames_default()(className, responsive ? `${bsPrefix}-${responsive}` : bsPrefix, `${bsPrefix}-${placement}`),
    "aria-labelledby": ariaLabelledby,
    children: children
  }, void 0, false, {
    fileName: Offcanvas_jsxFileName,
    lineNumber: 300,
    columnNumber: 9
  }, undefined);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(jsx_dev_runtime.Fragment, {
    children: [!showOffcanvas && (responsive || renderStaticNode) && renderDialog({}), /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_ModalContext.Provider, {
      value: modalContext,
      children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(esm_Modal, {
        show: showOffcanvas,
        ref: ref,
        backdrop: backdrop,
        container: container,
        keyboard: keyboard,
        autoFocus: autoFocus,
        enforceFocus: enforceFocus && !scroll,
        restoreFocus: restoreFocus,
        restoreFocusOptions: restoreFocusOptions,
        onEscapeKeyDown: onEscapeKeyDown,
        onShow: onShow,
        onHide: handleHide,
        onEnter: handleEnter,
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: handleExited,
        manager: getModalManager(),
        transition: Offcanvas_DialogTransition,
        backdropTransition: Offcanvas_BackdropTransition,
        renderBackdrop: renderBackdrop,
        renderDialog: renderDialog
      }, void 0, false, {
        fileName: Offcanvas_jsxFileName,
        lineNumber: 328,
        columnNumber: 13
      }, undefined)
    }, void 0, false, {
      fileName: Offcanvas_jsxFileName,
      lineNumber: 327,
      columnNumber: 11
    }, undefined)]
  }, void 0, true);
});
Offcanvas.displayName = 'Offcanvas';
Offcanvas.propTypes = Offcanvas_propTypes;
/* harmony default export */ const src_Offcanvas = (Object.assign(Offcanvas, {
  Body: src_OffcanvasBody,
  Header: src_OffcanvasHeader,
  Title: src_OffcanvasTitle
}));
;// CONCATENATED MODULE: ./src/NavbarOffcanvas.tsx
var NavbarOffcanvas_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/NavbarOffcanvas.tsx";





const NavbarOffcanvas = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((props, ref) => {
  const context = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(NavbarContext);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Offcanvas, {
    ref: ref,
    show: !!(context != null && context.expanded),
    ...props,
    renderStaticNode: true
  }, void 0, false, {
    fileName: NavbarOffcanvas_jsxFileName,
    lineNumber: 13,
    columnNumber: 7
  }, undefined);
});
NavbarOffcanvas.displayName = 'NavbarOffcanvas';
/* harmony default export */ const src_NavbarOffcanvas = (NavbarOffcanvas);
;// CONCATENATED MODULE: ./src/NavbarText.tsx
var NavbarText_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/NavbarText.tsx";




const NavbarText = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'span',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-text');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: NavbarText_jsxFileName,
    lineNumber: 15,
    columnNumber: 9
  }, undefined);
});
NavbarText.displayName = 'NavbarText';
/* harmony default export */ const src_NavbarText = (NavbarText);
;// CONCATENATED MODULE: ./src/Navbar.tsx
var Navbar_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Navbar.tsx";














const Navbar_propTypes = {
  /** @default 'navbar' */
  bsPrefix: (prop_types_default()).string,
  /**
   * The general visual variant a the Navbar.
   * Use in combination with the `bg` prop, `background-color` utilities,
   * or your own background styles.
   *
   * @type {('light'|'dark')}
   */
  variant: (prop_types_default()).string,
  /**
   * The breakpoint, below which, the Navbar will collapse.
   * When `true` the Navbar will always be expanded regardless of screen size.
   */
  expand: prop_types_default().oneOfType([(prop_types_default()).bool, (prop_types_default()).string]),
  /**
   * A convenience prop for adding `bg-*` utility classes since they are so commonly used here.
   * `light` and `dark` are common choices but any `bg-*` class is supported, including any custom ones you might define.
   *
   * Pairs nicely with the `variant` prop.
   */
  bg: (prop_types_default()).string,
  /**
   * Create a fixed navbar along the top or bottom of the screen, that scrolls with the
   * page. A convenience prop for the `fixed-*` positioning classes.
   */
  fixed: prop_types_default().oneOf(['top', 'bottom']),
  /**
   * Position the navbar at the top of the viewport, but only after scrolling past it.
   * A convenience prop for the `sticky-top` positioning class.
   *
   *  __Not supported in <= IE11 and other older browsers without a polyfill__
   */
  sticky: prop_types_default().oneOf(['top']),
  /**
   * Set a custom element for this component.
   */
  as: (prop_types_default()).elementType,
  /**
   * A callback fired when the `<Navbar>` body collapses or expands. Fired when
   * a `<Navbar.Toggle>` is clicked and called with the new `expanded`
   * boolean value.
   *
   * @controllable expanded
   */
  onToggle: (prop_types_default()).func,
  /**
   * A callback fired when a descendant of a child `<Nav>` is selected. Should
   * be used to execute complex closing or other miscellaneous actions desired
   * after selecting a descendant of `<Nav>`. Does nothing if no `<Nav>` or `<Nav>`
   * descendants exist. The callback is called with an eventKey, which is a
   * prop from the selected `<Nav>` descendant, and an event.
   *
   * ```js
   * function (
   *  eventKey: mixed,
   *  event?: SyntheticEvent
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
  onSelect: (prop_types_default()).func,
  /**
   * Toggles `expanded` to `false` after the onSelect event of a descendant of a
   * child `<Nav>` fires. Does nothing if no `<Nav>` or `<Nav>` descendants exist.
   *
   * Manually controlling `expanded` via the onSelect callback is recommended instead,
   * for more complex operations that need to be executed after
   * the `select` event of `<Nav>` descendants.
   */
  collapseOnSelect: (prop_types_default()).bool,
  /**
   * Controls the visibility of the navbar body
   *
   * @controllable onToggle
   */
  expanded: (prop_types_default()).bool,
  /**
   * The ARIA role for the navbar, will default to 'navigation' for
   * Navbars whose `as` is something other than `<nav>`.
   *
   * @default 'navigation'
   */
  role: (prop_types_default()).string
};
const Navbar = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((props, ref) => {
  const {
    bsPrefix: initialBsPrefix,
    expand = true,
    variant = 'light',
    bg,
    fixed,
    sticky,
    className,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'nav',
    expanded,
    onToggle,
    onSelect,
    collapseOnSelect = false,
    ...controlledProps
  } = useUncontrolled(props, {
    expanded: 'onToggle'
  });
  const bsPrefix = useBootstrapPrefix(initialBsPrefix, 'navbar');
  const handleCollapse = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)((...args) => {
    onSelect == null ? void 0 : onSelect(...args);
    if (collapseOnSelect && expanded) {
      onToggle == null ? void 0 : onToggle(false);
    }
  }, [onSelect, collapseOnSelect, expanded, onToggle]);

  // will result in some false positives but that seems better
  // than false negatives. strict `undefined` check allows explicit
  // "nulling" of the role if the user really doesn't want one
  if (controlledProps.role === undefined && Component !== 'nav') {
    controlledProps.role = 'navigation';
  }
  let expandClass = `${bsPrefix}-expand`;
  if (typeof expand === 'string') expandClass = `${expandClass}-${expand}`;
  const navbarContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({
    onToggle: () => onToggle == null ? void 0 : onToggle(!expanded),
    bsPrefix,
    expanded: !!expanded,
    expand
  }), [bsPrefix, expanded, expand, onToggle]);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(NavbarContext.Provider, {
    value: navbarContext,
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(esm_SelectableContext.Provider, {
      value: handleCollapse,
      children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
        ref: ref,
        ...controlledProps,
        className: classnames_default()(className, bsPrefix, expand && expandClass, variant && `${bsPrefix}-${variant}`, bg && `bg-${bg}`, sticky && `sticky-${sticky}`, fixed && `fixed-${fixed}`)
      }, void 0, false, {
        fileName: Navbar_jsxFileName,
        lineNumber: 191,
        columnNumber: 11
      }, undefined)
    }, void 0, false, {
      fileName: Navbar_jsxFileName,
      lineNumber: 190,
      columnNumber: 9
    }, undefined)
  }, void 0, false, {
    fileName: Navbar_jsxFileName,
    lineNumber: 189,
    columnNumber: 7
  }, undefined);
});
Navbar.propTypes = Navbar_propTypes;
Navbar.displayName = 'Navbar';
/* harmony default export */ const src_Navbar = (Object.assign(Navbar, {
  Brand: src_NavbarBrand,
  Collapse: src_NavbarCollapse,
  Offcanvas: src_NavbarOffcanvas,
  Text: src_NavbarText,
  Toggle: src_NavbarToggle
}));
;// CONCATENATED MODULE: ./src/NavDropdown.tsx
var NavDropdown_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/NavDropdown.tsx";







const NavDropdown_propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string}
   */
  id: (prop_types_default()).string,
  /** An `onClick` handler passed to the Toggle component */
  onClick: (prop_types_default()).func,
  /** The content of the non-toggle Button.  */
  title: (prop_types_default()).node.isRequired,
  /** Disables the toggle NavLink  */
  disabled: (prop_types_default()).bool,
  /** Style the toggle NavLink as active  */
  active: (prop_types_default()).bool,
  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: (prop_types_default()).string,
  /** Whether to render the dropdown menu in the DOM before the first time it is shown */
  renderMenuOnMount: (prop_types_default()).bool,
  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#menu-props) for more details_
   */
  rootCloseEvent: (prop_types_default()).string,
  /**
   * Menu color variant.
   *
   * Omitting this will use the default light color.
   */
  menuVariant: prop_types_default().oneOf(['dark']),
  /** @ignore */
  bsPrefix: (prop_types_default()).string
};
const NavDropdown = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  id,
  title,
  children,
  bsPrefix,
  className,
  rootCloseEvent,
  menuRole,
  disabled,
  active,
  renderMenuOnMount,
  menuVariant,
  ...props
}, ref) => {
  /* NavItem has no additional logic, it's purely presentational. Can set nav item class here to support "as" */
  const navItemPrefix = useBootstrapPrefix(undefined, 'nav-item');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Dropdown, {
    ref: ref,
    ...props,
    className: classnames_default()(className, navItemPrefix),
    children: [/*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Dropdown.Toggle, {
      id: id,
      eventKey: null,
      active: active,
      disabled: disabled,
      childBsPrefix: bsPrefix,
      as: src_NavLink,
      children: title
    }, void 0, false, {
      fileName: NavDropdown_jsxFileName,
      lineNumber: 92,
      columnNumber: 11
    }, undefined), /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Dropdown.Menu, {
      role: menuRole,
      renderOnMount: renderMenuOnMount,
      rootCloseEvent: rootCloseEvent,
      variant: menuVariant,
      children: children
    }, void 0, false, {
      fileName: NavDropdown_jsxFileName,
      lineNumber: 103,
      columnNumber: 11
    }, undefined)]
  }, void 0, true, {
    fileName: NavDropdown_jsxFileName,
    lineNumber: 87,
    columnNumber: 9
  }, undefined);
});
NavDropdown.displayName = 'NavDropdown';
NavDropdown.propTypes = NavDropdown_propTypes;
/* harmony default export */ const src_NavDropdown = (Object.assign(NavDropdown, {
  Item: src_Dropdown.Item,
  ItemText: src_Dropdown.ItemText,
  Divider: src_Dropdown.Divider,
  Header: src_Dropdown.Header
}));
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/useRootClose.js






const useRootClose_noop = () => {};
/**
 * The `useRootClose` hook registers your callback on the document
 * when rendered. Powers the `<Overlay/>` component. This is used achieve modal
 * style behavior where your callback is triggered when the user tries to
 * interact with the rest of the document or hits the `esc` key.
 *
 * @param {Ref<HTMLElement>| HTMLElement} ref  The element boundary
 * @param {function} onRootClose
 * @param {object=}  options
 * @param {boolean=} options.disabled
 * @param {string=}  options.clickTrigger The DOM event name (click, mousedown, etc) to attach listeners on
 */
function useRootClose(ref, onRootClose, {
  disabled,
  clickTrigger
} = {}) {
  const onClose = onRootClose || useRootClose_noop;
  esm_useClickOutside(ref, onClose, {
    disabled,
    clickTrigger
  });
  const handleKeyUp = useEventCallback(e => {
    if (isEscKey(e)) {
      onClose(e);
    }
  });
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    if (disabled || ref == null) return undefined;
    const doc = ownerDocument(getRefTarget(ref));

    // Store the current event to avoid triggering handlers immediately
    // https://github.com/facebook/react/issues/20074
    let currentEvent = (doc.defaultView || window).event;
    const removeKeyupListener = esm_listen(doc, 'keyup', e => {
      // skip if this event is the same as the one running when we added the handlers
      if (e === currentEvent) {
        currentEvent = undefined;
        return;
      }
      handleKeyUp(e);
    });
    return () => {
      removeKeyupListener();
    };
  }, [ref, disabled, handleKeyUp]);
}
/* harmony default export */ const esm_useRootClose = (useRootClose);
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/Overlay.js










/**
 * Built on top of `Popper.js`, the overlay component is
 * great for custom tooltip overlays.
 */
const Overlay = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((props, outerRef) => {
  const {
    flip,
    offset,
    placement,
    containerPadding,
    popperConfig = {},
    transition: Transition,
    runTransition
  } = props;
  const [rootElement, attachRef] = useCallbackRef();
  const [arrowElement, attachArrowRef] = useCallbackRef();
  const mergedRef = esm_useMergedRefs(attachRef, outerRef);
  const container = useWaitForDOMRef(props.container);
  const target = useWaitForDOMRef(props.target);
  const [exited, setExited] = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(!props.show);
  const popper = esm_usePopper(target, rootElement, mergeOptionsWithPopperConfig({
    placement,
    enableEvents: !!props.show,
    containerPadding: containerPadding || 5,
    flip,
    offset,
    arrowElement,
    popperConfig
  }));

  // TODO: I think this needs to be in an effect
  if (props.show && exited) {
    setExited(false);
  }
  const handleHidden = (...args) => {
    setExited(true);
    if (props.onExited) {
      props.onExited(...args);
    }
  };

  // Don't un-render the overlay while it's transitioning out.
  const mountOverlay = props.show || !exited;
  esm_useRootClose(rootElement, props.onHide, {
    disabled: !props.rootClose || props.rootCloseDisabled,
    clickTrigger: props.rootCloseEvent
  });
  if (!mountOverlay) {
    // Don't bother showing anything if we don't have to.
    return null;
  }
  const {
    onExit,
    onExiting,
    onEnter,
    onEntering,
    onEntered
  } = props;
  let child = props.children(Object.assign({}, popper.attributes.popper, {
    style: popper.styles.popper,
    ref: mergedRef
  }), {
    popper,
    placement,
    show: !!props.show,
    arrowProps: Object.assign({}, popper.attributes.arrow, {
      style: popper.styles.arrow,
      ref: attachArrowRef
    })
  });
  child = renderTransition(Transition, runTransition, {
    in: !!props.show,
    appear: true,
    mountOnEnter: true,
    unmountOnExit: true,
    children: child,
    onExit,
    onExiting,
    onExited: handleHidden,
    onEnter,
    onEntering,
    onEntered
  });
  return container ? /*#__PURE__*/external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().createPortal(child, container) : null;
});
Overlay.displayName = 'Overlay';
/* harmony default export */ const esm_Overlay = (Overlay);
;// CONCATENATED MODULE: ./src/PopoverHeader.tsx
var PopoverHeader_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/PopoverHeader.tsx";




const PopoverHeader = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-header');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: PopoverHeader_jsxFileName,
    lineNumber: 15,
    columnNumber: 9
  }, undefined);
});
PopoverHeader.displayName = 'PopoverHeader';
/* harmony default export */ const src_PopoverHeader = (PopoverHeader);
;// CONCATENATED MODULE: ./src/PopoverBody.tsx
var PopoverBody_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/PopoverBody.tsx";




const PopoverBody = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-body');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: PopoverBody_jsxFileName,
    lineNumber: 15,
    columnNumber: 9
  }, undefined);
});
PopoverBody.displayName = 'PopoverBody';
/* harmony default export */ const src_PopoverBody = (PopoverBody);
;// CONCATENATED MODULE: ./src/helpers.ts

class BsPrefixComponent extends external_root_React_commonjs2_react_commonjs_react_amd_react_.Component {}

// Need to use this instead of typeof Component to get proper type checking.

function getOverlayDirection(placement, isRTL) {
  let bsDirection = placement;
  if (placement === 'left') {
    bsDirection = isRTL ? 'end' : 'start';
  } else if (placement === 'right') {
    bsDirection = isRTL ? 'start' : 'end';
  }
  return bsDirection;
}
;// CONCATENATED MODULE: ./src/getInitialPopperStyles.ts
function getInitialPopperStyles(position = 'absolute') {
  return {
    position,
    top: '0',
    left: '0',
    opacity: '0',
    pointerEvents: 'none'
  };
}
;// CONCATENATED MODULE: ./src/Popover.tsx
var Popover_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Popover.tsx";









const Popover_propTypes = {
  /**
   * @default 'popover'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * An html id attribute, necessary for accessibility
   * @type {string}
   * @required
   */
  id: (prop_types_default()).string,
  /**
   * Sets the direction the Popover is positioned towards.
   *
   * > This is generally provided by the `Overlay` component positioning the popover
   */
  placement: prop_types_default().oneOf(['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']),
  /**
   * An Overlay injected set of props for positioning the popover arrow.
   *
   * > This is generally provided by the `Overlay` component positioning the popover
   */
  arrowProps: prop_types_default().shape({
    ref: (prop_types_default()).any,
    style: (prop_types_default()).object
  }),
  /**
   * When this prop is set, it creates a Popover with a Popover.Body inside
   * passing the children directly to it
   */
  body: (prop_types_default()).bool,
  /**
   * Whether or not Popper has done its initial measurement and positioning.
   */
  hasDoneInitialMeasure: (prop_types_default()).bool,
  /** @private */
  popper: (prop_types_default()).object,
  /** @private */
  show: (prop_types_default()).bool
};
const Popover = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  placement = 'right',
  className,
  style,
  children,
  body,
  arrowProps,
  hasDoneInitialMeasure,
  popper,
  show,
  ...props
}, ref) => {
  const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'popover');
  const isRTL = useIsRTL();
  const [primaryPlacement] = (placement == null ? void 0 : placement.split('-')) || [];
  const bsDirection = getOverlayDirection(primaryPlacement, isRTL);
  let computedStyle = style;
  if (show && !hasDoneInitialMeasure) {
    computedStyle = {
      ...style,
      ...getInitialPopperStyles(popper == null ? void 0 : popper.strategy)
    };
  }
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
    ref: ref,
    role: "tooltip",
    style: computedStyle,
    "x-placement": primaryPlacement,
    className: classnames_default()(className, decoratedBsPrefix, primaryPlacement && `bs-popover-${bsDirection}`),
    ...props,
    children: [/*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
      className: "popover-arrow",
      ...arrowProps
    }, void 0, false, {
      fileName: Popover_jsxFileName,
      lineNumber: 131,
      columnNumber: 9
    }, undefined), body ? /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_PopoverBody, {
      children: children
    }, void 0, false, {
      fileName: Popover_jsxFileName,
      lineNumber: 132,
      columnNumber: 17
    }, undefined) : children]
  }, void 0, true, {
    fileName: Popover_jsxFileName,
    lineNumber: 119,
    columnNumber: 7
  }, undefined);
});
Popover.propTypes = Popover_propTypes;
/* harmony default export */ const src_Popover = (Object.assign(Popover, {
  Header: src_PopoverHeader,
  Body: src_PopoverBody,
  // Default popover offset.
  // https://github.com/twbs/bootstrap/blob/5c32767e0e0dbac2d934bcdee03719a65d3f1187/js/src/popover.js#L28
  POPPER_OFFSET: [0, 8]
}));
;// CONCATENATED MODULE: ./src/Tooltip.tsx
var Tooltip_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Tooltip.tsx";







const Tooltip_propTypes = {
  /**
   * @default 'tooltip'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * An html id attribute, necessary for accessibility
   * @type {string}
   * @required
   */
  id: (prop_types_default()).string,
  /**
   * Sets the direction the Tooltip is positioned towards.
   *
   * > This is generally provided by the `Overlay` component positioning the tooltip
   */
  placement: prop_types_default().oneOf(['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']),
  /**
   * An Overlay injected set of props for positioning the tooltip arrow.
   *
   * > This is generally provided by the `Overlay` component positioning the tooltip
   *
   * @type {{ ref: ReactRef, style: Object }}
   */
  arrowProps: prop_types_default().shape({
    ref: (prop_types_default()).any,
    style: (prop_types_default()).object
  }),
  /**
   * Whether or not Popper has done its initial measurement and positioning.
   */
  hasDoneInitialMeasure: (prop_types_default()).bool,
  /** @private */
  popper: (prop_types_default()).object,
  /** @private */
  show: (prop_types_default()).any
};
const Tooltip = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  placement = 'right',
  className,
  style,
  children,
  arrowProps,
  hasDoneInitialMeasure,
  popper,
  show,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'tooltip');
  const isRTL = useIsRTL();
  const [primaryPlacement] = (placement == null ? void 0 : placement.split('-')) || [];
  const bsDirection = getOverlayDirection(primaryPlacement, isRTL);
  let computedStyle = style;
  if (show && !hasDoneInitialMeasure) {
    computedStyle = {
      ...style,
      ...getInitialPopperStyles(popper == null ? void 0 : popper.strategy)
    };
  }
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
    ref: ref,
    style: computedStyle,
    role: "tooltip",
    "x-placement": primaryPlacement,
    className: classnames_default()(className, bsPrefix, `bs-tooltip-${bsDirection}`),
    ...props,
    children: [/*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
      className: "tooltip-arrow",
      ...arrowProps
    }, void 0, false, {
      fileName: Tooltip_jsxFileName,
      lineNumber: 119,
      columnNumber: 9
    }, undefined), /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
      className: `${bsPrefix}-inner`,
      children: children
    }, void 0, false, {
      fileName: Tooltip_jsxFileName,
      lineNumber: 120,
      columnNumber: 9
    }, undefined)]
  }, void 0, true, {
    fileName: Tooltip_jsxFileName,
    lineNumber: 111,
    columnNumber: 7
  }, undefined);
});
Tooltip.propTypes = Tooltip_propTypes;
Tooltip.displayName = 'Tooltip';
/* harmony default export */ const src_Tooltip = (Object.assign(Tooltip, {
  // Default tooltip offset.
  // https://github.com/twbs/bootstrap/blob/beca2a6c7f6bc88b6449339fc76edcda832c59e5/js/src/tooltip.js#L65
  TOOLTIP_OFFSET: [0, 6]
}));
;// CONCATENATED MODULE: ./src/useOverlayOffset.tsx






// This is meant for internal use.
// This applies a custom offset to the overlay if it's a popover or tooltip.
function useOverlayOffset(customOffset) {
  const overlayRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  const popoverClass = useBootstrapPrefix(undefined, 'popover');
  const tooltipClass = useBootstrapPrefix(undefined, 'tooltip');
  const offset = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({
    name: 'offset',
    options: {
      offset: () => {
        if (customOffset) {
          return customOffset;
        }
        if (overlayRef.current) {
          if (hasClass(overlayRef.current, popoverClass)) {
            return src_Popover.POPPER_OFFSET;
          }
          if (hasClass(overlayRef.current, tooltipClass)) {
            return src_Tooltip.TOOLTIP_OFFSET;
          }
        }
        return [0, 0];
      }
    }
  }), [customOffset, popoverClass, tooltipClass]);
  return [overlayRef, [offset]];
}
;// CONCATENATED MODULE: ./src/Overlay.tsx
var Overlay_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Overlay.tsx";













const Overlay_propTypes = {
  /**
   * A component instance, DOM node, or function that returns either.
   * The `container` element will have the Overlay appended to it via a React portal.
   */
  container: prop_types_default().oneOfType([lib/* componentOrElement */.ax, (prop_types_default()).func]),
  /**
   * A component instance, DOM node, or function that returns either.
   * The overlay will be positioned in relation to the `target`
   */
  target: prop_types_default().oneOfType([lib/* componentOrElement */.ax, (prop_types_default()).func]),
  /**
   * Set the visibility of the Overlay
   */
  show: (prop_types_default()).bool,
  /**
   * A set of popper options and props passed directly to Popper.
   */
  popperConfig: (prop_types_default()).object,
  /**
   * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
   */
  rootClose: (prop_types_default()).bool,
  /**
   * Specify event for triggering a "root close" toggle.
   */
  rootCloseEvent: prop_types_default().oneOf(['click', 'mousedown']),
  /**
   * A callback invoked by the overlay when it wishes to be hidden. Required if
   * `rootClose` is specified.
   */
  onHide: (prop_types_default()).func,
  /**
   * Animate the entering and exiting of the Overlay. `true` will use the `<Fade>` transition,
   * or a custom react-transition-group `<Transition>` component can be provided.
   */
  transition: prop_types_default().oneOfType([(prop_types_default()).bool, lib/* elementType */.nm]),
  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: (prop_types_default()).func,
  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: (prop_types_default()).func,
  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: (prop_types_default()).func,
  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: (prop_types_default()).func,
  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: (prop_types_default()).func,
  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: (prop_types_default()).func,
  /**
   * The placement of the Overlay in relation to it's `target`.
   */
  placement: prop_types_default().oneOf(['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'])
};
function wrapRefs(props, arrowProps) {
  const {
    ref
  } = props;
  const {
    ref: aRef
  } = arrowProps;
  props.ref = ref.__wrapped || (ref.__wrapped = r => ref(safeFindDOMNode(r)));
  arrowProps.ref = aRef.__wrapped || (aRef.__wrapped = r => aRef(safeFindDOMNode(r)));
}
const Overlay_Overlay = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  children: overlay,
  transition = src_Fade,
  popperConfig = {},
  rootClose = false,
  placement = 'top',
  show: outerShow = false,
  ...outerProps
}, outerRef) => {
  const popperRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)({});
  const [firstRenderedState, setFirstRenderedState] = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(null);
  const [ref, modifiers] = useOverlayOffset(outerProps.offset);
  const mergedRef = esm_useMergedRefs(outerRef, ref);
  const actualTransition = transition === true ? src_Fade : transition || undefined;
  const handleFirstUpdate = useEventCallback(state => {
    setFirstRenderedState(state);
    popperConfig == null ? void 0 : popperConfig.onFirstUpdate == null ? void 0 : popperConfig.onFirstUpdate(state);
  });
  useIsomorphicEffect(() => {
    if (firstRenderedState && outerProps.target) {
      // Must wait for target element to resolve before updating popper.
      popperRef.current.scheduleUpdate == null ? void 0 : popperRef.current.scheduleUpdate();
    }
  }, [firstRenderedState, outerProps.target]);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    if (!outerShow) {
      setFirstRenderedState(null);
    }
  }, [outerShow]);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(esm_Overlay, {
    ...outerProps,
    ref: mergedRef,
    popperConfig: {
      ...popperConfig,
      modifiers: modifiers.concat(popperConfig.modifiers || []),
      onFirstUpdate: handleFirstUpdate
    },
    transition: actualTransition,
    rootClose: rootClose,
    placement: placement,
    show: outerShow,
    children: (overlayProps, {
      arrowProps,
      popper: popperObj,
      show
    }) => {
      var _popperObj$state, _popperObj$state$modi;
      wrapRefs(overlayProps, arrowProps);
      // Need to get placement from popper object, handling case when overlay is flipped using 'flip' prop
      const updatedPlacement = popperObj == null ? void 0 : popperObj.placement;
      const popper = Object.assign(popperRef.current, {
        state: popperObj == null ? void 0 : popperObj.state,
        scheduleUpdate: popperObj == null ? void 0 : popperObj.update,
        placement: updatedPlacement,
        outOfBoundaries: (popperObj == null ? void 0 : (_popperObj$state = popperObj.state) == null ? void 0 : (_popperObj$state$modi = _popperObj$state.modifiersData.hide) == null ? void 0 : _popperObj$state$modi.isReferenceHidden) || false,
        strategy: popperConfig.strategy
      });
      const hasDoneInitialMeasure = !!firstRenderedState;
      if (typeof overlay === 'function') return overlay({
        ...overlayProps,
        placement: updatedPlacement,
        show,
        ...(!transition && show && {
          className: 'show'
        }),
        popper,
        arrowProps,
        hasDoneInitialMeasure
      });
      return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement(overlay, {
        ...overlayProps,
        placement: updatedPlacement,
        arrowProps,
        popper,
        hasDoneInitialMeasure,
        className: classnames_default()(overlay.props.className, !transition && show && 'show'),
        style: {
          ...overlay.props.style,
          ...overlayProps.style
        }
      });
    }
  }, void 0, false, {
    fileName: Overlay_jsxFileName,
    lineNumber: 195,
    columnNumber: 7
  }, undefined);
});
Overlay_Overlay.displayName = 'Overlay';
Overlay_Overlay.propTypes = Overlay_propTypes;
/* harmony default export */ const src_Overlay = (Overlay_Overlay);
;// CONCATENATED MODULE: ./src/OverlayTrigger.tsx
var OverlayTrigger_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/OverlayTrigger.tsx";












function normalizeDelay(delay) {
  return delay && typeof delay === 'object' ? delay : {
    show: delay,
    hide: delay
  };
}

// Simple implementation of mouseEnter and mouseLeave.
// React's built version is broken: https://github.com/facebook/react/issues/4251
// for cases when the trigger is disabled and mouseOut/Over can cause flicker
// moving from one child element to another.
function handleMouseOverOut(
// eslint-disable-next-line @typescript-eslint/no-shadow
handler, args, relatedNative) {
  const [e] = args;
  const target = e.currentTarget;
  const related = e.relatedTarget || e.nativeEvent[relatedNative];
  if ((!related || related !== target) && !contains_contains(target, related)) {
    handler(...args);
  }
}
const triggerType = prop_types_default().oneOf(['click', 'hover', 'focus']);
const OverlayTrigger_propTypes = {
  children: prop_types_default().oneOfType([(prop_types_default()).element, (prop_types_default()).func]).isRequired,
  /**
   * Specify which action or actions trigger Overlay visibility
   *
   * The `click` trigger ignores the configured `delay`.
   *
   * @type {'hover' | 'click' |'focus' | Array<'hover' | 'click' |'focus'>}
   */
  trigger: prop_types_default().oneOfType([triggerType.isRequired, prop_types_default().arrayOf(triggerType.isRequired)]),
  /**
   * A millisecond delay amount to show and hide the Overlay once triggered
   */
  delay: prop_types_default().oneOfType([(prop_types_default()).number.isRequired, prop_types_default().shape({
    show: (prop_types_default()).number.isRequired,
    hide: (prop_types_default()).number.isRequired
  })]),
  /**
   * The visibility of the Overlay. `show` is a _controlled_ prop so should be paired
   * with `onToggle` to avoid breaking user interactions.
   *
   * Manually toggling `show` does **not** wait for `delay` to change the visibility.
   *
   * @controllable onToggle
   */
  show: (prop_types_default()).bool,
  /**
   * The initial visibility state of the Overlay.
   */
  defaultShow: (prop_types_default()).bool,
  /**
   * A callback that fires when the user triggers a change in tooltip visibility.
   *
   * `onToggle` is called with the desired next `show`, and generally should be passed
   * back to the `show` prop. `onToggle` fires _after_ the configured `delay`
   *
   * @controllable `show`
   */
  onToggle: (prop_types_default()).func,
  /**
    The initial flip state of the Overlay.
   */
  flip: (prop_types_default()).bool,
  /**
   * An element or text to overlay next to the target.
   */
  overlay: prop_types_default().oneOfType([(prop_types_default()).func, (prop_types_default()).element.isRequired]).isRequired,
  /**
   * A Popper.js config object passed to the underlying popper instance.
   */
  popperConfig: (prop_types_default()).object,
  // Overridden props from `<Overlay>`.
  /**
   * @private
   */
  target: prop_types_default().oneOf([null]),
  /**
   * @private
   */
  onHide: prop_types_default().oneOf([null]),
  /**
   * The placement of the Overlay in relation to it's `target`.
   */
  placement: prop_types_default().oneOf(['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'])
};
const OverlayTrigger = ({
  trigger = ['hover', 'focus'],
  overlay,
  children,
  popperConfig = {},
  show: propsShow,
  defaultShow = false,
  onToggle,
  delay: propsDelay,
  placement,
  flip = placement && placement.indexOf('auto') !== -1,
  ...props
}) => {
  const triggerNodeRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  const mergedRef = esm_useMergedRefs(triggerNodeRef, children.ref);
  const timeout = useTimeout();
  const hoverStateRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)('');
  const [show, setShow] = useUncontrolledProp(propsShow, defaultShow, onToggle);
  const delay = normalizeDelay(propsDelay);
  const {
    onFocus,
    onBlur,
    onClick
  } = typeof children !== 'function' ? external_root_React_commonjs2_react_commonjs_react_amd_react_.Children.only(children).props : {};
  const attachRef = r => {
    mergedRef(safeFindDOMNode(r));
  };
  const handleShow = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(() => {
    timeout.clear();
    hoverStateRef.current = 'show';
    if (!delay.show) {
      setShow(true);
      return;
    }
    timeout.set(() => {
      if (hoverStateRef.current === 'show') setShow(true);
    }, delay.show);
  }, [delay.show, setShow, timeout]);
  const handleHide = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(() => {
    timeout.clear();
    hoverStateRef.current = 'hide';
    if (!delay.hide) {
      setShow(false);
      return;
    }
    timeout.set(() => {
      if (hoverStateRef.current === 'hide') setShow(false);
    }, delay.hide);
  }, [delay.hide, setShow, timeout]);
  const handleFocus = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)((...args) => {
    handleShow();
    onFocus == null ? void 0 : onFocus(...args);
  }, [handleShow, onFocus]);
  const handleBlur = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)((...args) => {
    handleHide();
    onBlur == null ? void 0 : onBlur(...args);
  }, [handleHide, onBlur]);
  const handleClick = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)((...args) => {
    setShow(!show);
    onClick == null ? void 0 : onClick(...args);
  }, [onClick, setShow, show]);
  const handleMouseOver = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)((...args) => {
    handleMouseOverOut(handleShow, args, 'fromElement');
  }, [handleShow]);
  const handleMouseOut = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)((...args) => {
    handleMouseOverOut(handleHide, args, 'toElement');
  }, [handleHide]);
  const triggers = trigger == null ? [] : [].concat(trigger);
  const triggerProps = {
    ref: attachRef
  };
  if (triggers.indexOf('click') !== -1) {
    triggerProps.onClick = handleClick;
  }
  if (triggers.indexOf('focus') !== -1) {
    triggerProps.onFocus = handleFocus;
    triggerProps.onBlur = handleBlur;
  }
  if (triggers.indexOf('hover') !== -1) {
     false ? 0 : void 0;
    triggerProps.onMouseOver = handleMouseOver;
    triggerProps.onMouseOut = handleMouseOut;
  }
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(jsx_dev_runtime.Fragment, {
    children: [typeof children === 'function' ? children(triggerProps) : /*#__PURE__*/(0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(children, triggerProps), /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Overlay, {
      ...props,
      show: show,
      onHide: handleHide,
      flip: flip,
      placement: placement,
      popperConfig: popperConfig,
      target: triggerNodeRef.current,
      children: overlay
    }, void 0, false, {
      fileName: OverlayTrigger_jsxFileName,
      lineNumber: 307,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
};
OverlayTrigger.propTypes = OverlayTrigger_propTypes;
/* harmony default export */ const src_OverlayTrigger = (OverlayTrigger);
;// CONCATENATED MODULE: ./src/PageItem.tsx
var PageItem_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/PageItem.tsx";
/* eslint-disable react/no-multi-comp */





const PageItem_propTypes = {
  /** Disables the PageItem */
  disabled: (prop_types_default()).bool,
  /** Styles PageItem as active, and renders a `<span>` instead of an `<a>`. */
  active: (prop_types_default()).bool,
  /** An accessible label indicating the active state. */
  activeLabel: (prop_types_default()).string,
  /** The HTML href attribute for the `PageItem`. */
  href: (prop_types_default()).string,
  /** A callback function for when this component is clicked. */
  onClick: (prop_types_default()).func,
  /** custom style for the inner component of the PageItem */
  linkStyle: (prop_types_default()).object,
  /** custom className for the inner component of the PageItem */
  linkClassName: (prop_types_default()).string
};
const PageItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  active = false,
  disabled = false,
  className,
  style,
  activeLabel = '(current)',
  children,
  linkStyle,
  linkClassName,
  ...props
}, ref) => {
  const Component = active || disabled ? 'span' : esm_Anchor;
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("li", {
    ref: ref,
    style: style,
    className: classnames_default()(className, 'page-item', {
      active,
      disabled
    }),
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
      className: classnames_default()('page-link', linkClassName),
      style: linkStyle,
      ...props,
      children: [children, active && activeLabel && /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("span", {
        className: "visually-hidden",
        children: activeLabel
      }, void 0, false, {
        fileName: PageItem_jsxFileName,
        lineNumber: 73,
        columnNumber: 15
      }, undefined)]
    }, void 0, true, {
      fileName: PageItem_jsxFileName,
      lineNumber: 66,
      columnNumber: 11
    }, undefined)
  }, void 0, false, {
    fileName: PageItem_jsxFileName,
    lineNumber: 61,
    columnNumber: 9
  }, undefined);
});
PageItem.propTypes = PageItem_propTypes;
PageItem.displayName = 'PageItem';
/* harmony default export */ const src_PageItem = (PageItem);
function createButton(name, defaultValue, label = name) {
  const Button = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
    children,
    ...props
  }, ref) => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(PageItem, {
    ...props,
    ref: ref,
    children: [/*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("span", {
      "aria-hidden": "true",
      children: children || defaultValue
    }, void 0, false, {
      fileName: PageItem_jsxFileName,
      lineNumber: 90,
      columnNumber: 9
    }, this), /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("span", {
      className: "visually-hidden",
      children: label
    }, void 0, false, {
      fileName: PageItem_jsxFileName,
      lineNumber: 91,
      columnNumber: 9
    }, this)]
  }, void 0, true, {
    fileName: PageItem_jsxFileName,
    lineNumber: 89,
    columnNumber: 7
  }, this));
  Button.displayName = name;
  return Button;
}
const First = createButton('First', '«');
const Prev = createButton('Prev', '‹', 'Previous');
const Ellipsis = createButton('Ellipsis', '…', 'More');
const Next = createButton('Next', '›');
const Last = createButton('Last', '»');
;// CONCATENATED MODULE: ./src/Pagination.tsx
var Pagination_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Pagination.tsx";






const Pagination_propTypes = {
  /**
   * @default 'pagination'
   * */
  bsPrefix: (prop_types_default()).string,
  /**
   * Sets the size of all PageItems.
   *
   * @type {('sm'|'lg')}
   */
  size: prop_types_default().oneOf(['sm', 'lg'])
};
const Pagination = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  size,
  ...props
}, ref) => {
  const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'pagination');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("ul", {
    ref: ref,
    ...props,
    className: classnames_default()(className, decoratedBsPrefix, size && `${decoratedBsPrefix}-${size}`)
  }, void 0, false, {
    fileName: Pagination_jsxFileName,
    lineNumber: 35,
    columnNumber: 7
  }, undefined);
});
Pagination.propTypes = Pagination_propTypes;
Pagination.displayName = 'Pagination';
/* harmony default export */ const src_Pagination = (Object.assign(Pagination, {
  First: First,
  Prev: Prev,
  Ellipsis: Ellipsis,
  Item: src_PageItem,
  Next: Next,
  Last: Last
}));
;// CONCATENATED MODULE: ./src/usePlaceholder.ts



function usePlaceholder({
  animation,
  bg,
  bsPrefix,
  size,
  ...props
}) {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'placeholder');
  const [{
    className,
    ...colProps
  }] = useCol(props);
  return {
    ...colProps,
    className: classnames_default()(className, animation ? `${bsPrefix}-${animation}` : bsPrefix, size && `${bsPrefix}-${size}`, bg && `bg-${bg}`)
  };
}
;// CONCATENATED MODULE: ./src/PlaceholderButton.tsx
var PlaceholderButton_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/PlaceholderButton.tsx";





const PlaceholderButton_propTypes = {
  /**
   * @default 'placeholder'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Changes the animation of the placeholder.
   */
  animation: prop_types_default().oneOf(['glow', 'wave']),
  size: prop_types_default().oneOf(['xs', 'sm', 'lg']),
  /**
   * Button variant.
   */
  variant: (prop_types_default()).string
};
const PlaceholderButton = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((props, ref) => {
  const placeholderProps = usePlaceholder(props);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Button, {
    ...placeholderProps,
    ref: ref,
    disabled: true,
    tabIndex: -1
  }, void 0, false, {
    fileName: PlaceholderButton_jsxFileName,
    lineNumber: 38,
    columnNumber: 12
  }, undefined);
});
PlaceholderButton.displayName = 'PlaceholderButton';
PlaceholderButton.propTypes = PlaceholderButton_propTypes;
/* harmony default export */ const src_PlaceholderButton = (PlaceholderButton);
;// CONCATENATED MODULE: ./src/Placeholder.tsx
var Placeholder_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Placeholder.tsx";





const Placeholder_propTypes = {
  /**
   * @default 'placeholder'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Changes the animation of the placeholder.
   *
   * @type ('glow'|'wave')
   */
  animation: (prop_types_default()).string,
  /**
   * Change the background color of the placeholder.
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  bg: (prop_types_default()).string,
  /**
   * Component size variations.
   *
   * @type ('xs'|'sm'|'lg')
   */
  size: (prop_types_default()).string
};
const Placeholder = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  as: Component = 'span',
  ...props
}, ref) => {
  const placeholderProps = usePlaceholder(props);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ...placeholderProps,
    ref: ref
  }, void 0, false, {
    fileName: Placeholder_jsxFileName,
    lineNumber: 42,
    columnNumber: 14
  }, undefined);
});
Placeholder.displayName = 'Placeholder';
Placeholder.propTypes = Placeholder_propTypes;
/* harmony default export */ const src_Placeholder = (Object.assign(Placeholder, {
  Button: src_PlaceholderButton
}));
;// CONCATENATED MODULE: ./src/ProgressBar.tsx
var ProgressBar_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ProgressBar.tsx";







const ROUND_PRECISION = 1000;

/**
 * Validate that children, if any, are instances of `ProgressBar`.
 */
function onlyProgressBar(props, propName, componentName) {
  const children = props[propName];
  if (!children) {
    return null;
  }
  let error = null;
  external_root_React_commonjs2_react_commonjs_react_amd_react_.Children.forEach(children, child => {
    if (error) {
      return;
    }

    /**
     * Compare types in a way that works with libraries that patch and proxy
     * components like react-hot-loader.
     *
     * see https://github.com/gaearon/react-hot-loader#checking-element-types
     */
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const element = /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(ProgressBar, {}, void 0, false, {
      fileName: ProgressBar_jsxFileName,
      lineNumber: 50,
      columnNumber: 21
    }, this);
    if (child.type === element.type) return;
    const childType = child.type;
    const childIdentifier = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.isValidElement(child) ? childType.displayName || childType.name || childType : child;
    error = new Error(`Children of ${componentName} can contain only ProgressBar ` + `components. Found ${childIdentifier}.`);
  });
  return error;
}
const ProgressBar_propTypes = {
  /**
   * Minimum value progress can begin from
   */
  min: (prop_types_default()).number,
  /**
   * Current value of progress
   */
  now: (prop_types_default()).number,
  /**
   * Maximum value progress can reach
   */
  max: (prop_types_default()).number,
  /**
   * Show label that represents visual percentage.
   * EG. 60%
   */
  label: (prop_types_default()).node,
  /**
   * Hide's the label visually.
   */
  visuallyHidden: (prop_types_default()).bool,
  /**
   * Uses a gradient to create a striped effect.
   */
  striped: (prop_types_default()).bool,
  /**
   * Animate's the stripes from right to left
   */
  animated: (prop_types_default()).bool,
  /**
   * @private
   * @default 'progress-bar'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Sets the background class of the progress bar.
   *
   * @type ('success'|'danger'|'warning'|'info')
   */
  variant: (prop_types_default()).string,
  /**
   * Child elements (only allows elements of type <ProgressBar />)
   */
  children: onlyProgressBar,
  /**
   * @private
   */
  isChild: (prop_types_default()).bool
};
function getPercentage(now, min, max) {
  const percentage = (now - min) / (max - min) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}
function renderProgressBar({
  min,
  now,
  max,
  label,
  visuallyHidden,
  striped,
  animated,
  className,
  style,
  variant,
  bsPrefix,
  ...props
}, ref) {
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
    ref: ref,
    ...props,
    role: "progressbar",
    className: classnames_default()(className, `${bsPrefix}-bar`, {
      [`bg-${variant}`]: variant,
      [`${bsPrefix}-bar-animated`]: animated,
      [`${bsPrefix}-bar-striped`]: animated || striped
    }),
    style: {
      width: `${getPercentage(now, min, max)}%`,
      ...style
    },
    "aria-valuenow": now,
    "aria-valuemin": min,
    "aria-valuemax": max,
    children: visuallyHidden ? /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("span", {
      className: "visually-hidden",
      children: label
    }, void 0, false, {
      fileName: ProgressBar_jsxFileName,
      lineNumber: 165,
      columnNumber: 9
    }, this) : label
  }, void 0, false, {
    fileName: ProgressBar_jsxFileName,
    lineNumber: 150,
    columnNumber: 5
  }, this);
}
renderProgressBar.propTypes = ProgressBar_propTypes;
const ProgressBar = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  isChild = false,
  ...rest
}, ref) => {
  const props = {
    min: 0,
    max: 100,
    animated: false,
    visuallyHidden: false,
    striped: false,
    ...rest
  };
  props.bsPrefix = useBootstrapPrefix(props.bsPrefix, 'progress');
  if (isChild) {
    return renderProgressBar(props, ref);
  }
  const {
    min,
    now,
    max,
    label,
    visuallyHidden,
    striped,
    animated,
    bsPrefix,
    variant,
    className,
    children,
    ...wrapperProps
  } = props;
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
    ref: ref,
    ...wrapperProps,
    className: classnames_default()(className, bsPrefix),
    children: children ? map(children, child => /*#__PURE__*/(0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(child, {
      isChild: true
    })) : renderProgressBar({
      min,
      now,
      max,
      label,
      visuallyHidden,
      striped,
      animated,
      bsPrefix,
      variant
    }, ref)
  }, void 0, false, {
    fileName: ProgressBar_jsxFileName,
    lineNumber: 208,
    columnNumber: 7
  }, undefined);
});
ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = ProgressBar_propTypes;
/* harmony default export */ const src_ProgressBar = (ProgressBar);
;// CONCATENATED MODULE: ./src/Ratio.tsx
var Ratio_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Ratio.tsx";





const Ratio_propTypes = {
  /**
   * @default 'ratio'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * This component requires a single child element
   */
  children: (prop_types_default()).element.isRequired,
  /**
   * Set the aspect ratio of the embed. A fraction or a percentage can also
   * be used to create custom aspect ratios.
   */
  aspectRatio: prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string])
};
function toPercent(num) {
  if (num <= 0) return '100%';
  if (num < 1) return `${num * 100}%`;
  return `${num}%`;
}
const Ratio = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  children,
  aspectRatio = '1x1',
  style,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'ratio');
  const isCustomRatio = typeof aspectRatio === 'number';
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
    ref: ref,
    ...props,
    style: {
      ...style,
      ...(isCustomRatio && {
        '--bs-aspect-ratio': toPercent(aspectRatio)
      })
    },
    className: classnames_default()(bsPrefix, className, !isCustomRatio && `${bsPrefix}-${aspectRatio}`),
    children: external_root_React_commonjs2_react_commonjs_react_amd_react_.Children.only(children)
  }, void 0, false, {
    fileName: Ratio_jsxFileName,
    lineNumber: 50,
    columnNumber: 7
  }, undefined);
});
Ratio.propTypes = Ratio_propTypes;
/* harmony default export */ const src_Ratio = (Ratio);
;// CONCATENATED MODULE: ./src/Row.tsx
var Row_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Row.tsx";





const rowColWidth = prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string]);
const rowColumns = prop_types_default().oneOfType([rowColWidth, prop_types_default().shape({
  cols: rowColWidth
})]);
const Row_propTypes = {
  /**
   * @default 'row'
   */
  bsPrefix: (prop_types_default()).string,
  as: (prop_types_default()).elementType,
  /**
   * The number of columns that will fit next to each other on extra small devices (<576px).
   * Use `auto` to give columns their natural widths.
   *
   * @type {(number|'auto'|{ cols: number|'auto' })}
   */
  xs: rowColumns,
  /**
   * The number of columns that will fit next to each other on small devices (≥576px).
   * Use `auto` to give columns their natural widths.
   *
   * @type {(number|'auto'|{ cols: number|'auto' })}
   */
  sm: rowColumns,
  /**
   * The number of columns that will fit next to each other on medium devices (≥768px).
   * Use `auto` to give columns their natural widths.
   *
   * @type {(number|'auto'|{ cols: number|'auto' })}
   */
  md: rowColumns,
  /**
   * The number of columns that will fit next to each other on large devices (≥992px).
   * Use `auto` to give columns their natural widths.
   *
   * @type {(number|'auto'|{ cols: number|'auto' })}
   */
  lg: rowColumns,
  /**
   * The number of columns that will fit next to each other on extra large devices (≥1200px).
   * Use `auto` to give columns their natural widths.
   *
   * @type {(number|'auto'|{ cols: number|'auto' })}
   */
  xl: rowColumns,
  /**
   * The number of columns that will fit next to each other on extra extra large devices (≥1400px).
   * Use `auto` to give columns their natural widths.
   *
   * @type {(number|'auto'|{ cols: number|'auto' })}
   */
  xxl: rowColumns
};
const Row = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'row');
  const breakpoints = useBootstrapBreakpoints();
  const minBreakpoint = useBootstrapMinBreakpoint();
  const sizePrefix = `${decoratedBsPrefix}-cols`;
  const classes = [];
  breakpoints.forEach(brkPoint => {
    const propValue = props[brkPoint];
    delete props[brkPoint];
    let cols;
    if (propValue != null && typeof propValue === 'object') {
      ({
        cols
      } = propValue);
    } else {
      cols = propValue;
    }
    const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';
    if (cols != null) classes.push(`${sizePrefix}${infix}-${cols}`);
  });
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    ...props,
    className: classnames_default()(className, decoratedBsPrefix, ...classes)
  }, void 0, false, {
    fileName: Row_jsxFileName,
    lineNumber: 146,
    columnNumber: 7
  }, undefined);
});
Row.displayName = 'Row';
Row.propTypes = Row_propTypes;
/* harmony default export */ const src_Row = (Row);
;// CONCATENATED MODULE: ./src/Spinner.tsx
var Spinner_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Spinner.tsx";





const Spinner_propTypes = {
  /**
   * @default 'spinner'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * The visual color style of the spinner
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  variant: (prop_types_default()).string,
  /**
   * Changes the animation style of the spinner.
   *
   * @type {('border'|'grow')}
   * @default true
   */
  animation: prop_types_default().oneOf(['border', 'grow']).isRequired,
  /**
   * Component size variations.
   *
   * @type {('sm')}
   */
  size: (prop_types_default()).string,
  /**
   * This component may be used to wrap child elements or components.
   */
  children: (prop_types_default()).element,
  /**
   * An ARIA accessible role applied to the Menu component. This should generally be set to 'status'
   */
  role: (prop_types_default()).string,
  /**
   * @default div
   */
  as: (prop_types_default()).elementType
};
const Spinner = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  variant,
  animation = 'border',
  size,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  className,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'spinner');
  const bsSpinnerPrefix = `${bsPrefix}-${animation}`;
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    ...props,
    className: classnames_default()(className, bsSpinnerPrefix, size && `${bsSpinnerPrefix}-${size}`, variant && `text-${variant}`)
  }, void 0, false, {
    fileName: Spinner_jsxFileName,
    lineNumber: 79,
    columnNumber: 9
  }, undefined);
});
Spinner.propTypes = Spinner_propTypes;
Spinner.displayName = 'Spinner';
/* harmony default export */ const src_Spinner = (Spinner);
;// CONCATENATED MODULE: ./src/SplitButton.tsx
var SplitButton_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/SplitButton.tsx";







const SplitButton_propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string}
   * @required
   */
  id: (prop_types_default()).string,
  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: (prop_types_default()).string,
  /** An `href` passed to the non-toggle Button */
  href: (prop_types_default()).string,
  /** An anchor `target` passed to the non-toggle Button */
  target: (prop_types_default()).string,
  /** An `onClick` handler passed to the non-toggle Button */
  onClick: (prop_types_default()).func,
  /** The content of the non-toggle Button.  */
  title: (prop_types_default()).node.isRequired,
  /** A `type` passed to the non-toggle Button */
  type: (prop_types_default()).string,
  /** Disables both Buttons  */
  disabled: (prop_types_default()).bool,
  /**
   * Aligns the dropdown menu.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   *
   * @type {"start"|"end"|{ sm: "start"|"end" }|{ md: "start"|"end" }|{ lg: "start"|"end" }|{ xl: "start"|"end"}|{ xxl: "start"|"end"} }
   */
  align: alignPropType,
  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: (prop_types_default()).string,
  /** Whether to render the dropdown menu in the DOM before the first time it is shown */
  renderMenuOnMount: (prop_types_default()).bool,
  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   */
  rootCloseEvent: (prop_types_default()).string,
  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   * Popper.js's flip [docs](https://popper.js.org/docs/v2/modifiers/flip/).
   *
   */
  flip: (prop_types_default()).bool,
  /** @ignore */
  bsPrefix: (prop_types_default()).string,
  /** @ignore */
  variant: (prop_types_default()).string,
  /** @ignore */
  size: (prop_types_default()).string
};

/**
 * A convenience component for simple or general use split button dropdowns. Renders a
 * `ButtonGroup` containing a `Button` and a `Button` toggle for the `Dropdown`. All `children`
 * are passed directly to the default `Dropdown.Menu`. This component accepts all of [`Dropdown`'s
 * props](#dropdown-props).
 *
 * _All unknown props are passed through to the `Dropdown` component._
 * The Button `variant`, `size` and `bsPrefix` props are passed to the button and toggle,
 * and menu-related props are passed to the `Dropdown.Menu`
 */
const SplitButton = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  id,
  bsPrefix,
  size,
  variant,
  title,
  type = 'button',
  toggleLabel = 'Toggle dropdown',
  children,
  onClick,
  href,
  target,
  menuRole,
  renderMenuOnMount,
  rootCloseEvent,
  flip,
  ...props
}, ref) => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Dropdown, {
  ref: ref,
  ...props,
  as: src_ButtonGroup,
  children: [/*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Button, {
    size: size,
    variant: variant,
    disabled: props.disabled,
    bsPrefix: bsPrefix,
    href: href,
    target: target,
    onClick: onClick,
    type: type,
    children: title
  }, void 0, false, {
    fileName: SplitButton_jsxFileName,
    lineNumber: 126,
    columnNumber: 7
  }, undefined), /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Dropdown.Toggle, {
    split: true,
    id: id,
    size: size,
    variant: variant,
    disabled: props.disabled,
    childBsPrefix: bsPrefix,
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("span", {
      className: "visually-hidden",
      children: toggleLabel
    }, void 0, false, {
      fileName: SplitButton_jsxFileName,
      lineNumber: 146,
      columnNumber: 9
    }, undefined)
  }, void 0, false, {
    fileName: SplitButton_jsxFileName,
    lineNumber: 138,
    columnNumber: 7
  }, undefined), /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Dropdown.Menu, {
    role: menuRole,
    renderOnMount: renderMenuOnMount,
    rootCloseEvent: rootCloseEvent,
    flip: flip,
    children: children
  }, void 0, false, {
    fileName: SplitButton_jsxFileName,
    lineNumber: 149,
    columnNumber: 7
  }, undefined)]
}, void 0, true, {
  fileName: SplitButton_jsxFileName,
  lineNumber: 125,
  columnNumber: 5
}, undefined));
SplitButton.propTypes = SplitButton_propTypes;
SplitButton.displayName = 'SplitButton';
/* harmony default export */ const src_SplitButton = (SplitButton);
;// CONCATENATED MODULE: ./src/SSRProvider.ts

/* harmony default export */ const SSRProvider = ($704cf1d3b684cc5c$export$9f8ac96af4b1b2ae);
;// CONCATENATED MODULE: ./src/createUtilityClasses.ts


function responsivePropType(propType) {
  return prop_types_default().oneOfType([propType, prop_types_default().shape({
    xs: propType,
    sm: propType,
    md: propType,
    lg: propType,
    xl: propType,
    xxl: propType
  })]);
}
function createUtilityClassName(utilityValues, breakpoints = DEFAULT_BREAKPOINTS, minBreakpoint = DEFAULT_MIN_BREAKPOINT) {
  const classes = [];
  Object.entries(utilityValues).forEach(([utilName, utilValue]) => {
    if (utilValue != null) {
      if (typeof utilValue === 'object') {
        breakpoints.forEach(brkPoint => {
          const bpValue = utilValue[brkPoint];
          if (bpValue != null) {
            const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';
            classes.push(`${utilName}${infix}-${bpValue}`);
          }
        });
      } else {
        classes.push(`${utilName}-${utilValue}`);
      }
    }
  });
  return classes;
}
;// CONCATENATED MODULE: ./src/Stack.tsx
var Stack_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Stack.tsx";






const Stack_propTypes = {
  /**
   * Change the underlying component CSS base class name and modifier class names prefix.
   * **This is an escape hatch** for working with heavily customized bootstrap css.
   *
   * Defaults to `hstack` if direction is `horizontal` or `vstack` if direction
   * is `vertical`.
   *
   * @default 'hstack | vstack'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Sets the spacing between each item. Valid values are `0-5`.
   */
  gap: responsivePropType((prop_types_default()).number)
};
const Stack = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  as: Component = 'div',
  bsPrefix,
  className,
  direction,
  gap,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, direction === 'horizontal' ? 'hstack' : 'vstack');
  const breakpoints = useBootstrapBreakpoints();
  const minBreakpoint = useBootstrapMinBreakpoint();
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ...props,
    ref: ref,
    className: classnames_default()(className, bsPrefix, ...createUtilityClassName({
      gap
    }, breakpoints, minBreakpoint))
  }, void 0, false, {
    fileName: Stack_jsxFileName,
    lineNumber: 57,
    columnNumber: 9
  }, undefined);
});
Stack.displayName = 'Stack';
Stack.propTypes = Stack_propTypes;
/* harmony default export */ const src_Stack = (Stack);
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/TabPanel.js
const TabPanel_excluded = ["active", "eventKey", "mountOnEnter", "transition", "unmountOnExit", "role", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited"],
  _excluded2 = ["activeKey", "getControlledId", "getControllerId"],
  _excluded3 = ["as"];
function TabPanel_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}






function useTabPanel(_ref) {
  let {
      active,
      eventKey,
      mountOnEnter,
      transition,
      unmountOnExit,
      role = 'tabpanel',
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited
    } = _ref,
    props = TabPanel_objectWithoutPropertiesLoose(_ref, TabPanel_excluded);
  const context = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(esm_TabContext);
  if (!context) return [Object.assign({}, props, {
    role
  }), {
    eventKey,
    isActive: active,
    mountOnEnter,
    transition,
    unmountOnExit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited
  }];
  const {
      activeKey,
      getControlledId,
      getControllerId
    } = context,
    rest = TabPanel_objectWithoutPropertiesLoose(context, _excluded2);
  const key = makeEventKey(eventKey);
  return [Object.assign({}, props, {
    role,
    id: getControlledId(eventKey),
    'aria-labelledby': getControllerId(eventKey)
  }), {
    eventKey,
    isActive: active == null && key != null ? makeEventKey(activeKey) === key : active,
    transition: transition || rest.transition,
    mountOnEnter: mountOnEnter != null ? mountOnEnter : rest.mountOnEnter,
    unmountOnExit: unmountOnExit != null ? unmountOnExit : rest.unmountOnExit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited
  }];
}
const TabPanel = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
(_ref2, ref) => {
  let {
      as: Component = 'div'
    } = _ref2,
    props = TabPanel_objectWithoutPropertiesLoose(_ref2, _excluded3);
  const [tabPanelProps, {
    isActive,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    mountOnEnter,
    unmountOnExit,
    transition: Transition = esm_NoopTransition
  }] = useTabPanel(props);
  // We provide an empty the TabContext so `<Nav>`s in `<TabPanel>`s don't
  // conflict with the top level one.
  return /*#__PURE__*/(0,jsx_runtime.jsx)(esm_TabContext.Provider, {
    value: null,
    children: /*#__PURE__*/(0,jsx_runtime.jsx)(esm_SelectableContext.Provider, {
      value: null,
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(Transition, {
        in: isActive,
        onEnter: onEnter,
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: onExited,
        mountOnEnter: mountOnEnter,
        unmountOnExit: unmountOnExit,
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(Component, Object.assign({}, tabPanelProps, {
          ref: ref,
          hidden: !isActive,
          "aria-hidden": !isActive
        }))
      })
    })
  });
});
TabPanel.displayName = 'TabPanel';
/* harmony default export */ const esm_TabPanel = (TabPanel);
;// CONCATENATED MODULE: ./node_modules/@restart/ui/esm/Tabs.js








const Tabs = props => {
  const {
    id: userId,
    generateChildId: generateCustomChildId,
    onSelect: propsOnSelect,
    activeKey: propsActiveKey,
    defaultActiveKey,
    transition,
    mountOnEnter,
    unmountOnExit,
    children
  } = props;
  const [activeKey, onSelect] = esm_useUncontrolledProp(propsActiveKey, defaultActiveKey, propsOnSelect);
  const id = $704cf1d3b684cc5c$export$619500959fc48b26(userId);
  const generateChildId = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => generateCustomChildId || ((key, type) => id ? `${id}-${type}-${key}` : null), [id, generateCustomChildId]);
  const tabContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({
    onSelect,
    activeKey,
    transition,
    mountOnEnter: mountOnEnter || false,
    unmountOnExit: unmountOnExit || false,
    getControlledId: key => generateChildId(key, 'tabpane'),
    getControllerId: key => generateChildId(key, 'tab')
  }), [onSelect, activeKey, transition, mountOnEnter, unmountOnExit, generateChildId]);
  return /*#__PURE__*/(0,jsx_runtime.jsx)(esm_TabContext.Provider, {
    value: tabContext,
    children: /*#__PURE__*/(0,jsx_runtime.jsx)(esm_SelectableContext.Provider, {
      value: onSelect || null,
      children: children
    })
  });
};
Tabs.Panel = esm_TabPanel;
/* harmony default export */ const esm_Tabs = (Tabs);
;// CONCATENATED MODULE: ./src/getTabTransitionComponent.ts


function getTabTransitionComponent(transition) {
  if (typeof transition === 'boolean') {
    return transition ? src_Fade : esm_NoopTransition;
  }
  return transition;
}
;// CONCATENATED MODULE: ./src/TabContainer.tsx
var TabContainer_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/TabContainer.tsx";





const TabContainer_propTypes = {
  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   *
   * @type {string}
   */
  id: (prop_types_default()).string,
  /**
   * Sets a default animation strategy for all children `<TabPane>`s.
   * Defaults to `<Fade>` animation; else, use `false` to disable, or a
   * custom react-transition-group `<Transition/>` component.
   *
   * @type {{Transition | false}}
   * @default {Fade}
   */
  transition: prop_types_default().oneOfType([prop_types_default().oneOf([false]), (prop_types_default()).elementType]),
  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: (prop_types_default()).bool,
  /**
   * Unmount tabs (remove it from the DOM) when they are no longer visible
   */
  unmountOnExit: (prop_types_default()).bool,
  /**
   * A function that takes an `eventKey` and `type` and returns a unique id for
   * child tab `<NavItem>`s and `<TabPane>`s. The function _must_ be a pure
   * function, meaning it should always return the _same_ id for the same set
   * of inputs. The default value requires that an `id` to be set for the
   * `<TabContainer>`.
   *
   * The `type` argument will either be `"tab"` or `"pane"`.
   *
   * @defaultValue (eventKey, type) => `${props.id}-${type}-${eventKey}`
   */
  generateChildId: (prop_types_default()).func,
  /**
   * A callback fired when a tab is selected.
   *
   * @controllable activeKey
   */
  onSelect: (prop_types_default()).func,
  /**
   * The `eventKey` of the currently active tab.
   *
   * @controllable onSelect
   */
  activeKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number])
};
const TabContainer = ({
  transition,
  ...props
}) => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(esm_Tabs, {
  ...props,
  transition: getTabTransitionComponent(transition)
}, void 0, false, {
  fileName: TabContainer_jsxFileName,
  lineNumber: 71,
  columnNumber: 3
}, undefined);
TabContainer.propTypes = TabContainer_propTypes;
TabContainer.displayName = 'TabContainer';
/* harmony default export */ const src_TabContainer = (TabContainer);
;// CONCATENATED MODULE: ./src/TabContent.tsx
var TabContent_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/TabContent.tsx";




const TabContent = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'tab-content');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: TabContent_jsxFileName,
    lineNumber: 15,
    columnNumber: 9
  }, undefined);
});
TabContent.displayName = 'TabContent';
/* harmony default export */ const src_TabContent = (TabContent);
;// CONCATENATED MODULE: ./src/TabPane.tsx
var TabPane_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/TabPane.tsx";










const TabPane_propTypes = {
  /**
   * @default 'tab-pane'
   */
  bsPrefix: (prop_types_default()).string,
  as: (prop_types_default()).elementType,
  /**
   * A key that associates the `TabPane` with it's controlling `NavLink`.
   */
  eventKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]),
  /**
   * Toggles the active state of the TabPane, this is generally controlled by a
   * TabContainer.
   */
  active: (prop_types_default()).bool,
  /**
   * Use animation when showing or hiding `<TabPane>`s. Defaults to `<Fade>`
   * animation, else use `false` to disable or a react-transition-group
   * `<Transition/>` component.
   */
  transition: prop_types_default().oneOfType([(prop_types_default()).bool, (prop_types_default()).elementType]),
  /**
   * Transition onEnter callback when animation is not `false`
   */
  onEnter: (prop_types_default()).func,
  /**
   * Transition onEntering callback when animation is not `false`
   */
  onEntering: (prop_types_default()).func,
  /**
   * Transition onEntered callback when animation is not `false`
   */
  onEntered: (prop_types_default()).func,
  /**
   * Transition onExit callback when animation is not `false`
   */
  onExit: (prop_types_default()).func,
  /**
   * Transition onExiting callback when animation is not `false`
   */
  onExiting: (prop_types_default()).func,
  /**
   * Transition onExited callback when animation is not `false`
   */
  onExited: (prop_types_default()).func,
  /**
   * Wait until the first "enter" transition to mount the tab (add it to the DOM)
   */
  mountOnEnter: (prop_types_default()).bool,
  /**
   * Unmount the tab (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit: (prop_types_default()).bool,
  /** @ignore * */
  id: (prop_types_default()).string,
  /** @ignore * */
  'aria-labelledby': (prop_types_default()).string
};
const TabPane = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  transition,
  ...props
}, ref) => {
  const [{
    className,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    ...rest
  }, {
    isActive,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    mountOnEnter,
    unmountOnExit,
    transition: Transition = src_Fade
  }] = useTabPanel({
    ...props,
    transition: getTabTransitionComponent(transition)
  });
  const prefix = useBootstrapPrefix(bsPrefix, 'tab-pane');

  // We provide an empty the TabContext so `<Nav>`s in `<TabPanel>`s don't
  // conflict with the top level one.
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(esm_TabContext.Provider, {
    value: null,
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(esm_SelectableContext.Provider, {
      value: null,
      children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Transition, {
        in: isActive,
        onEnter: onEnter,
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: onExited,
        mountOnEnter: mountOnEnter,
        unmountOnExit: unmountOnExit,
        children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
          ...rest,
          ref: ref,
          className: classnames_default()(className, prefix, isActive && 'active')
        }, void 0, false, {
          fileName: TabPane_jsxFileName,
          lineNumber: 146,
          columnNumber: 15
        }, undefined)
      }, void 0, false, {
        fileName: TabPane_jsxFileName,
        lineNumber: 135,
        columnNumber: 13
      }, undefined)
    }, void 0, false, {
      fileName: TabPane_jsxFileName,
      lineNumber: 134,
      columnNumber: 11
    }, undefined)
  }, void 0, false, {
    fileName: TabPane_jsxFileName,
    lineNumber: 133,
    columnNumber: 9
  }, undefined);
});
TabPane.displayName = 'TabPane';
TabPane.propTypes = TabPane_propTypes;
/* harmony default export */ const src_TabPane = (TabPane);
;// CONCATENATED MODULE: ./src/Tab.tsx




/* eslint-disable react/no-unused-prop-types */
const Tab_propTypes = {
  eventKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]),
  /**
   * Content for the tab title.
   */
  title: (prop_types_default()).node.isRequired,
  /**
   * The disabled state of the tab.
   */
  disabled: (prop_types_default()).bool,
  /**
   * Class to pass to the underlying nav link.
   */
  tabClassName: (prop_types_default()).string,
  /**
   * Object containing attributes to pass to underlying nav link.
   */
  tabAttrs: (prop_types_default()).object
};
const Tab = () => {
  throw new Error('ReactBootstrap: The `Tab` component is not meant to be rendered! ' + "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. " + 'For custom tabs components use TabPane and TabsContainer directly');
};
Tab.propTypes = Tab_propTypes;
/* harmony default export */ const src_Tab = (Object.assign(Tab, {
  Container: src_TabContainer,
  Content: src_TabContent,
  Pane: src_TabPane
}));
;// CONCATENATED MODULE: ./src/Table.tsx
var Table_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Table.tsx";





const Table_propTypes = {
  /**
   * @default 'table'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Adds zebra-striping to any table row within the `<tbody>`.
   * Use `columns` to add zebra-striping to any table column.
   */
  striped: prop_types_default().oneOfType([(prop_types_default()).bool, (prop_types_default()).string]),
  /**
   * Adds borders on all sides of the table and cells.
   */
  bordered: (prop_types_default()).bool,
  /**
   * Removes all borders on the table and cells, including table header.
   */
  borderless: (prop_types_default()).bool,
  /**
   * Enable a hover state on table rows within a `<tbody>`.
   */
  hover: (prop_types_default()).bool,
  /**
   * Make tables more compact by cutting cell padding in half by setting
   * size as `sm`.
   */
  size: (prop_types_default()).string,
  /**
   * Invert the colors of the table — with light text on dark backgrounds
   * by setting variant as `dark`.
   */
  variant: (prop_types_default()).string,
  /**
   * Responsive tables allow tables to be scrolled horizontally with ease.
   * Across every breakpoint, use `responsive` for horizontally
   * scrolling tables. Responsive tables are wrapped automatically in a `div`.
   * Use `responsive="sm"`, `responsive="md"`, `responsive="lg"`, or
   * `responsive="xl"` as needed to create responsive tables up to
   * a particular breakpoint. From that breakpoint and up, the table will
   * behave normally and not scroll horizontally.
   */
  responsive: prop_types_default().oneOfType([(prop_types_default()).bool, (prop_types_default()).string])
};
const Table = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  striped,
  bordered,
  borderless,
  hover,
  size,
  variant,
  responsive,
  ...props
}, ref) => {
  const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'table');
  const classes = classnames_default()(className, decoratedBsPrefix, variant && `${decoratedBsPrefix}-${variant}`, size && `${decoratedBsPrefix}-${size}`, striped && `${decoratedBsPrefix}-${typeof striped === 'string' ? `striped-${striped}` : 'striped'}`, bordered && `${decoratedBsPrefix}-bordered`, borderless && `${decoratedBsPrefix}-borderless`, hover && `${decoratedBsPrefix}-hover`);
  const table = /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("table", {
    ...props,
    className: classes,
    ref: ref
  }, void 0, false, {
    fileName: Table_jsxFileName,
    lineNumber: 103,
    columnNumber: 19
  }, undefined);
  if (responsive) {
    let responsiveClass = `${decoratedBsPrefix}-responsive`;
    if (typeof responsive === 'string') {
      responsiveClass = `${responsiveClass}-${responsive}`;
    }
    return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
      className: responsiveClass,
      children: table
    }, void 0, false, {
      fileName: Table_jsxFileName,
      lineNumber: 110,
      columnNumber: 14
    }, undefined);
  }
  return table;
});
Table.propTypes = Table_propTypes;
/* harmony default export */ const src_Table = (Table);
;// CONCATENATED MODULE: ./src/Tabs.tsx
var Tabs_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Tabs.tsx";












const Tabs_propTypes = {
  /**
   * Mark the Tab with a matching `eventKey` as active.
   *
   * @controllable onSelect
   */
  activeKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]),
  /** The default active key that is selected on start */
  defaultActiveKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]),
  /**
   * Navigation style
   *
   * @type {('tabs'| 'pills' | 'underline')}
   */
  variant: (prop_types_default()).string,
  /**
   * Sets a default animation strategy for all children `<TabPane>`s.<tbcont
   *
   * Defaults to `<Fade>` animation, else use `false` to disable or a
   * react-transition-group `<Transition/>` component.
   *
   * @type {Transition | false}
   * @default {Fade}
   */
  transition: prop_types_default().oneOfType([prop_types_default().oneOf([false]), (prop_types_default()).elementType]),
  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   *
   * @type {string}
   */
  id: (prop_types_default()).string,
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
  onSelect: (prop_types_default()).func,
  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: (prop_types_default()).bool,
  /**
   * Unmount tabs (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit: (prop_types_default()).bool,
  /**
   * Have all `Tabs`s proportionately fill all available width.
   */
  fill: (prop_types_default()).bool,
  /**
   * Have all `Tab`s evenly fill all available width.
   */
  justify: (prop_types_default()).bool
};
function getDefaultActiveKey(children) {
  let defaultActiveKey;
  forEach(children, child => {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });
  return defaultActiveKey;
}
function renderTab(child) {
  const {
    title,
    eventKey,
    disabled,
    tabClassName,
    tabAttrs,
    id
  } = child.props;
  if (title == null) {
    return null;
  }
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_NavItem, {
    as: "li",
    role: "presentation",
    children: /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_NavLink, {
      as: "button",
      type: "button",
      eventKey: eventKey,
      disabled: disabled,
      id: id,
      className: tabClassName,
      ...tabAttrs,
      children: title
    }, void 0, false, {
      fileName: Tabs_jsxFileName,
      lineNumber: 116,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: Tabs_jsxFileName,
    lineNumber: 115,
    columnNumber: 5
  }, this);
}
const Tabs_Tabs = props => {
  const {
    id,
    onSelect,
    transition,
    mountOnEnter = false,
    unmountOnExit = false,
    variant = 'tabs',
    children,
    activeKey = getDefaultActiveKey(children),
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect'
  });
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(esm_Tabs, {
    id: id,
    activeKey: activeKey,
    onSelect: onSelect,
    transition: getTabTransitionComponent(transition),
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit,
    children: [/*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Nav, {
      ...controlledProps,
      role: "tablist",
      as: "ul",
      variant: variant,
      children: map(children, renderTab)
    }, void 0, false, {
      fileName: Tabs_jsxFileName,
      lineNumber: 155,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_TabContent, {
      children: map(children, child => {
        const childProps = {
          ...child.props
        };
        delete childProps.title;
        delete childProps.disabled;
        delete childProps.tabClassName;
        delete childProps.tabAttrs;
        return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_TabPane, {
          ...childProps
        }, void 0, false, {
          fileName: Tabs_jsxFileName,
          lineNumber: 168,
          columnNumber: 18
        }, undefined);
      })
    }, void 0, false, {
      fileName: Tabs_jsxFileName,
      lineNumber: 159,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: Tabs_jsxFileName,
    lineNumber: 147,
    columnNumber: 5
  }, undefined);
};
Tabs_Tabs.propTypes = Tabs_propTypes;
Tabs_Tabs.displayName = 'Tabs';
/* harmony default export */ const src_Tabs = (Tabs_Tabs);
;// CONCATENATED MODULE: ./src/ToastFade.tsx
var ToastFade_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ToastFade.tsx";




const ToastFade_fadeStyles = {
  [ENTERING]: 'showing',
  [EXITING]: 'showing show'
};
const ToastFade = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((props, ref) => /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Fade, {
  ...props,
  ref: ref,
  transitionClasses: ToastFade_fadeStyles
}, void 0, false, {
  fileName: ToastFade_jsxFileName,
  lineNumber: 14,
  columnNumber: 3
}, undefined));
ToastFade.displayName = 'ToastFade';
/* harmony default export */ const src_ToastFade = (ToastFade);
;// CONCATENATED MODULE: ./src/ToastContext.tsx

const ToastContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose() {}
});
/* harmony default export */ const src_ToastContext = (ToastContext);
;// CONCATENATED MODULE: ./src/ToastHeader.tsx
var ToastHeader_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ToastHeader.tsx";









const ToastHeader_propTypes = {
  bsPrefix: (prop_types_default()).string,
  /**
   * Provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  closeLabel: (prop_types_default()).string,
  /**
   * Sets the variant for close button.
   */
  closeVariant: prop_types_default().oneOf(['white']),
  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: (prop_types_default()).bool
};
const ToastHeader = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  closeLabel = 'Close',
  closeVariant,
  closeButton = true,
  className,
  children,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'toast-header');
  const context = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_ToastContext);
  const handleClick = useEventCallback(e => {
    context == null ? void 0 : context.onClose == null ? void 0 : context.onClose(e);
  });
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
    ref: ref,
    ...props,
    className: classnames_default()(bsPrefix, className),
    children: [children, closeButton && /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_CloseButton, {
      "aria-label": closeLabel,
      variant: closeVariant,
      onClick: handleClick,
      "data-dismiss": "toast"
    }, void 0, false, {
      fileName: ToastHeader_jsxFileName,
      lineNumber: 67,
      columnNumber: 11
    }, undefined)]
  }, void 0, true, {
    fileName: ToastHeader_jsxFileName,
    lineNumber: 63,
    columnNumber: 7
  }, undefined);
});
ToastHeader.displayName = 'ToastHeader';
ToastHeader.propTypes = ToastHeader_propTypes;
/* harmony default export */ const src_ToastHeader = (ToastHeader);
;// CONCATENATED MODULE: ./src/ToastBody.tsx
var ToastBody_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ToastBody.tsx";




const ToastBody = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'toast-body');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    ...props
  }, void 0, false, {
    fileName: ToastBody_jsxFileName,
    lineNumber: 15,
    columnNumber: 9
  }, undefined);
});
ToastBody.displayName = 'ToastBody';
/* harmony default export */ const src_ToastBody = (ToastBody);
;// CONCATENATED MODULE: ./src/Toast.tsx
var Toast_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Toast.tsx";











const Toast_propTypes = {
  /**
   * @default 'toast'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Apply a CSS fade transition to the toast
   */
  animation: (prop_types_default()).bool,
  /**
   * Auto hide the toast
   */
  autohide: (prop_types_default()).bool,
  /**
   * Delay hiding the toast (ms)
   */
  delay: (prop_types_default()).number,
  /**
   * A Callback fired when the close button is clicked.
   */
  onClose: (prop_types_default()).func,
  /**
   * Callback fired before the toast transitions in
   */
  onEnter: (prop_types_default()).func,
  /**
   * Callback fired as the toast begins to transition in
   */
  onEntering: (prop_types_default()).func,
  /**
   * Callback fired after the toast finishes transitioning in
   */
  onEntered: (prop_types_default()).func,
  /**
   * Transition onExit callback when animation is not `false`
   */
  onExit: (prop_types_default()).func,
  /**
   * Transition onExiting callback when animation is not `false`
   */
  onExiting: (prop_types_default()).func,
  /**
   * Transition onExited callback when animation is not `false`
   */
  onExited: (prop_types_default()).func,
  /**
   * When `true` The toast will show itself.
   */
  show: (prop_types_default()).bool,
  /**
   * A `react-transition-group` Transition component used to animate the Toast on dismissal.
   */
  transition: (prop_types_default()).elementType,
  /**
   * Sets Toast background
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
   */
  bg: (prop_types_default()).string
};
const Toast = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  className,
  transition: Transition = src_ToastFade,
  show = true,
  animation = true,
  delay = 5000,
  autohide = false,
  onClose,
  onEntered,
  onExit,
  onExiting,
  onEnter,
  onEntering,
  onExited,
  bg,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'toast');

  // We use refs for these, because we don't want to restart the autohide
  // timer in case these values change.
  const delayRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(delay);
  const onCloseRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(onClose);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    delayRef.current = delay;
    onCloseRef.current = onClose;
  }, [delay, onClose]);
  const autohideTimeout = useTimeout();
  const autohideToast = !!(autohide && show);
  const autohideFunc = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(() => {
    if (autohideToast) {
      onCloseRef.current == null ? void 0 : onCloseRef.current();
    }
  }, [autohideToast]);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    // Only reset timer if show or autohide changes.
    autohideTimeout.set(autohideFunc, delayRef.current);
  }, [autohideTimeout, autohideFunc]);
  const toastContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => ({
    onClose
  }), [onClose]);
  const hasAnimation = !!(Transition && animation);
  const toast = /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("div", {
    ...props,
    ref: ref,
    className: classnames_default()(bsPrefix, className, bg && `bg-${bg}`, !hasAnimation && (show ? 'show' : 'hide')),
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true"
  }, void 0, false, {
    fileName: Toast_jsxFileName,
    lineNumber: 163,
    columnNumber: 9
  }, undefined);
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_ToastContext.Provider, {
    value: toastContext,
    children: hasAnimation && Transition ? /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Transition, {
      in: show,
      onEnter: onEnter,
      onEntering: onEntering,
      onEntered: onEntered,
      onExit: onExit,
      onExiting: onExiting,
      onExited: onExited,
      unmountOnExit: true,
      children: toast
    }, void 0, false, {
      fileName: Toast_jsxFileName,
      lineNumber: 181,
      columnNumber: 13
    }, undefined) : toast
  }, void 0, false, {
    fileName: Toast_jsxFileName,
    lineNumber: 179,
    columnNumber: 9
  }, undefined);
});
Toast.propTypes = Toast_propTypes;
Toast.displayName = 'Toast';
/* harmony default export */ const src_Toast = (Object.assign(Toast, {
  Body: src_ToastBody,
  Header: src_ToastHeader
}));
;// CONCATENATED MODULE: ./src/ToastContainer.tsx
var ToastContainer_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ToastContainer.tsx";





const ToastContainer_propTypes = {
  /**
   * @default 'toast-container'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * Where the toasts will be placed within the container.
   */
  position: prop_types_default().oneOf(['top-start', 'top-center', 'top-end', 'middle-start', 'middle-center', 'middle-end', 'bottom-start', 'bottom-center', 'bottom-end']),
  /**
   * Specify the positioning method for the container.
   */
  containerPosition: (prop_types_default()).string
};
const positionClasses = {
  'top-start': 'top-0 start-0',
  'top-center': 'top-0 start-50 translate-middle-x',
  'top-end': 'top-0 end-0',
  'middle-start': 'top-50 start-0 translate-middle-y',
  'middle-center': 'top-50 start-50 translate-middle',
  'middle-end': 'top-50 end-0 translate-middle-y',
  'bottom-start': 'bottom-0 start-0',
  'bottom-center': 'bottom-0 start-50 translate-middle-x',
  'bottom-end': 'bottom-0 end-0'
};
const ToastContainer = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  position,
  containerPosition,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'toast-container');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(Component, {
    ref: ref,
    ...props,
    className: classnames_default()(bsPrefix, position && positionClasses[position], containerPosition && `position-${containerPosition}`, className)
  }, void 0, false, {
    fileName: ToastContainer_jsxFileName,
    lineNumber: 83,
    columnNumber: 7
  }, undefined);
});
ToastContainer.displayName = 'ToastContainer';
ToastContainer.propTypes = ToastContainer_propTypes;
/* harmony default export */ const src_ToastContainer = (ToastContainer);
;// CONCATENATED MODULE: ./src/ToggleButton.tsx
var ToggleButton_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ToggleButton.tsx";







const ToggleButton_noop = () => undefined;
const ToggleButton_propTypes = {
  /**
   * @default 'btn-check'
   */
  bsPrefix: (prop_types_default()).string,
  /**
   * The `<input>` element `type`
   */
  type: prop_types_default().oneOf(['checkbox', 'radio']),
  /**
   * The HTML input name, used to group like checkboxes or radio buttons together
   * semantically
   */
  name: (prop_types_default()).string,
  /**
   * The checked state of the input, managed by `<ToggleButtonGroup>` automatically
   */
  checked: (prop_types_default()).bool,
  /**
   * The disabled state of both the label and input
   */
  disabled: (prop_types_default()).bool,
  /**
   * `id` is required for button clicks to toggle input.
   */
  id: (prop_types_default()).string.isRequired,
  /**
   * A callback fired when the underlying input element changes. This is passed
   * directly to the `<input>` so shares the same signature as a native `onChange` event.
   */
  onChange: (prop_types_default()).func,
  /**
   * The value of the input, should be unique amongst its siblings when nested in a
   * `ToggleButtonGroup`.
   */
  value: prop_types_default().oneOfType([(prop_types_default()).string, prop_types_default().arrayOf((prop_types_default()).string.isRequired), (prop_types_default()).number]).isRequired,
  /**
   * A ref attached to the `<input>` element
   * @type {ReactRef}
   */
  inputRef: prop_types_default().oneOfType([(prop_types_default()).func, (prop_types_default()).any])
};
const ToggleButton = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef(({
  bsPrefix,
  name,
  className,
  checked,
  type,
  onChange,
  value,
  disabled,
  id,
  inputRef,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'btn-check');
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(jsx_dev_runtime.Fragment, {
    children: [/*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)("input", {
      className: bsPrefix,
      name: name,
      type: type,
      value: value,
      ref: inputRef,
      autoComplete: "off",
      checked: !!checked,
      disabled: !!disabled,
      onChange: onChange || ToggleButton_noop,
      id: id
    }, void 0, false, {
      fileName: ToggleButton_jsxFileName,
      lineNumber: 99,
      columnNumber: 9
    }, undefined), /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_Button, {
      ...props,
      ref: ref,
      className: classnames_default()(className, disabled && 'disabled'),
      type: undefined,
      role: undefined,
      as: "label",
      htmlFor: id
    }, void 0, false, {
      fileName: ToggleButton_jsxFileName,
      lineNumber: 111,
      columnNumber: 9
    }, undefined)]
  }, void 0, true);
});
ToggleButton.propTypes = ToggleButton_propTypes;
ToggleButton.displayName = 'ToggleButton';
/* harmony default export */ const src_ToggleButton = (ToggleButton);
;// CONCATENATED MODULE: ./src/ToggleButtonGroup.tsx
var ToggleButtonGroup_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ToggleButtonGroup.tsx";









const ToggleButtonGroup_propTypes = {
  /**
   * An HTML `<input>` name for each child button.
   *
   * __Required if `type` is set to `'radio'`__
   */
  name: (prop_types_default()).string,
  /**
   * The value, or array of values, of the active (pressed) buttons
   *
   * @controllable onChange
   */
  value: (prop_types_default()).any,
  /**
   * Callback fired when a button is pressed, depending on whether the `type`
   * is `'radio'` or `'checkbox'`, `onChange` will be called with the value or
   * array of active values
   *
   * @controllable value
   */
  onChange: (prop_types_default()).func,
  /**
   * The input `type` of the rendered buttons, determines the toggle behavior
   * of the buttons
   */
  type: prop_types_default().oneOf(['checkbox', 'radio']).isRequired,
  /**
   * Sets the size for all Buttons in the group.
   *
   * @type ('sm'|'lg')
   */
  size: (prop_types_default()).string,
  /** Make the set of Buttons appear vertically stacked. */
  vertical: (prop_types_default()).bool
};
const ToggleButtonGroup = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef((props, ref) => {
  const {
    children,
    type = 'radio',
    name,
    value,
    onChange,
    vertical = false,
    ...controlledProps
  } = useUncontrolled(props, {
    value: 'onChange'
  });
  const getValues = () => value == null ? [] : [].concat(value);
  const handleToggle = (inputVal, event) => {
    if (!onChange) {
      return;
    }
    const values = getValues();
    const isActive = values.indexOf(inputVal) !== -1;
    if (type === 'radio') {
      if (!isActive) onChange(inputVal, event);
      return;
    }
    if (isActive) {
      onChange(values.filter(n => n !== inputVal), event);
    } else {
      onChange([...values, inputVal], event);
    }
  };
  !(type !== 'radio' || !!name) ?  false ? 0 : browser_default()(false) : void 0;
  return /*#__PURE__*/(0,jsx_dev_runtime.jsxDEV)(src_ButtonGroup, {
    ...controlledProps,
    ref: ref,
    vertical: vertical,
    children: map(children, child => {
      const values = getValues();
      const {
        value: childVal,
        onChange: childOnChange
      } = child.props;
      const handler = e => handleToggle(childVal, e);
      return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement(child, {
        type,
        name: child.name || name,
        checked: values.indexOf(childVal) !== -1,
        onChange: src_createChainedFunction(childOnChange, handler)
      });
    })
  }, void 0, false, {
    fileName: ToggleButtonGroup_jsxFileName,
    lineNumber: 125,
    columnNumber: 5
  }, undefined);
});
ToggleButtonGroup.propTypes = ToggleButtonGroup_propTypes;
/* harmony default export */ const src_ToggleButtonGroup = (Object.assign(ToggleButtonGroup, {
  Button: src_ToggleButton
}));
;// CONCATENATED MODULE: ./src/index.tsx














































































































})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});