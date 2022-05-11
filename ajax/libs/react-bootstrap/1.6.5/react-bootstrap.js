(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactBootstrap"] = factory(require("react"), require("react-dom"));
	else
		root["ReactBootstrap"] = factory(root["React"], root["ReactDOM"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__698__, __WEBPACK_EXTERNAL_MODULE__207__) {
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
        if (arg.toString === Object.prototype.toString) {
          for (var key in arg) {
            if (hasOwn.call(arg, key) && arg[key]) {
              classes.push(key);
            }
          }
        } else {
          classes.push(arg.toString());
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
exports.default = all;

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

var _react = __webpack_require__(698);

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

exports.default = (0, _createChainableTypeChecker2.default)(validate);
module.exports = exports['default'];

/***/ }),

/***/ 647:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = deprecated;

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

var _react = __webpack_require__(698);

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

exports.default = (0, _createChainableTypeChecker2.default)(elementType);
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

/***/ 844:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
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

  ; // Important!
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

/***/ 698:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__698__;

/***/ }),

/***/ 207:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__207__;

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
  "Accordion": () => (/* reexport */ src_Accordion),
  "AccordionCollapse": () => (/* reexport */ src_AccordionCollapse),
  "AccordionContext": () => (/* reexport */ AccordionContext),
  "AccordionToggle": () => (/* reexport */ src_AccordionToggle),
  "Alert": () => (/* reexport */ src_Alert),
  "Badge": () => (/* reexport */ src_Badge),
  "Breadcrumb": () => (/* reexport */ src_Breadcrumb),
  "BreadcrumbItem": () => (/* reexport */ src_BreadcrumbItem),
  "Button": () => (/* reexport */ src_Button),
  "ButtonGroup": () => (/* reexport */ src_ButtonGroup),
  "ButtonToolbar": () => (/* reexport */ src_ButtonToolbar),
  "Card": () => (/* reexport */ src_Card),
  "CardColumns": () => (/* reexport */ CardColumns),
  "CardDeck": () => (/* reexport */ CardDeck),
  "CardGroup": () => (/* reexport */ CardGroup),
  "CardImg": () => (/* reexport */ src_CardImg),
  "Carousel": () => (/* reexport */ src_Carousel),
  "CarouselItem": () => (/* reexport */ src_CarouselItem),
  "CloseButton": () => (/* reexport */ src_CloseButton),
  "Col": () => (/* reexport */ src_Col),
  "Collapse": () => (/* reexport */ src_Collapse),
  "Container": () => (/* reexport */ src_Container),
  "Dropdown": () => (/* reexport */ src_Dropdown),
  "DropdownButton": () => (/* reexport */ src_DropdownButton),
  "Fade": () => (/* reexport */ src_Fade),
  "Figure": () => (/* reexport */ src_Figure),
  "Form": () => (/* reexport */ Form),
  "FormCheck": () => (/* reexport */ src_FormCheck),
  "FormControl": () => (/* reexport */ src_FormControl),
  "FormFile": () => (/* reexport */ src_FormFile),
  "FormGroup": () => (/* reexport */ src_FormGroup),
  "FormLabel": () => (/* reexport */ src_FormLabel),
  "FormText": () => (/* reexport */ src_FormText),
  "Image": () => (/* reexport */ src_Image),
  "InputGroup": () => (/* reexport */ src_InputGroup),
  "Jumbotron": () => (/* reexport */ src_Jumbotron),
  "ListGroup": () => (/* reexport */ src_ListGroup),
  "ListGroupItem": () => (/* reexport */ src_ListGroupItem),
  "Media": () => (/* reexport */ src_Media),
  "Modal": () => (/* reexport */ src_Modal),
  "ModalBody": () => (/* reexport */ ModalBody),
  "ModalDialog": () => (/* reexport */ src_ModalDialog),
  "ModalFooter": () => (/* reexport */ ModalFooter),
  "ModalTitle": () => (/* reexport */ ModalTitle),
  "Nav": () => (/* reexport */ src_Nav),
  "NavDropdown": () => (/* reexport */ src_NavDropdown),
  "NavItem": () => (/* reexport */ src_NavItem),
  "NavLink": () => (/* reexport */ src_NavLink),
  "Navbar": () => (/* reexport */ src_Navbar),
  "NavbarBrand": () => (/* reexport */ src_NavbarBrand),
  "Overlay": () => (/* reexport */ src_Overlay),
  "OverlayTrigger": () => (/* reexport */ src_OverlayTrigger),
  "PageItem": () => (/* reexport */ src_PageItem),
  "Pagination": () => (/* reexport */ src_Pagination),
  "Popover": () => (/* reexport */ src_Popover),
  "PopoverContent": () => (/* reexport */ src_PopoverContent),
  "PopoverTitle": () => (/* reexport */ src_PopoverTitle),
  "ProgressBar": () => (/* reexport */ src_ProgressBar),
  "ResponsiveEmbed": () => (/* reexport */ src_ResponsiveEmbed),
  "Row": () => (/* reexport */ src_Row),
  "SafeAnchor": () => (/* reexport */ src_SafeAnchor),
  "Spinner": () => (/* reexport */ src_Spinner),
  "SplitButton": () => (/* reexport */ src_SplitButton),
  "Tab": () => (/* reexport */ src_Tab),
  "TabContainer": () => (/* reexport */ src_TabContainer),
  "TabContent": () => (/* reexport */ src_TabContent),
  "TabPane": () => (/* reexport */ src_TabPane),
  "Table": () => (/* reexport */ src_Table),
  "Tabs": () => (/* reexport */ src_Tabs),
  "ThemeProvider": () => (/* reexport */ src_ThemeProvider),
  "Toast": () => (/* reexport */ src_Toast),
  "ToastBody": () => (/* reexport */ ToastBody),
  "ToastHeader": () => (/* reexport */ src_ToastHeader),
  "ToggleButton": () => (/* reexport */ src_ToggleButton),
  "ToggleButtonGroup": () => (/* reexport */ src_ToggleButtonGroup),
  "Tooltip": () => (/* reexport */ src_Tooltip),
  "useAccordionToggle": () => (/* reexport */ useAccordionToggle)
});

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function extends_extends() {
  extends_extends = Object.assign || function (target) {
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
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(814);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}
var external_root_React_commonjs2_react_commonjs_react_amd_react_ = __webpack_require__(698);
var external_root_React_commonjs2_react_commonjs_react_amd_react_default = /*#__PURE__*/__webpack_require__.n(external_root_React_commonjs2_react_commonjs_react_amd_react_);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(526);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
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
  } // Binding "this" is important for shallow renderer support.


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
} // React may warn about cWM/cWRP/cWU methods being deprecated.
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
  } // If new component APIs are defined, "unsafe" lifecycles won't be called.
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
  } // React <= 16.2 does not support static getDerivedStateFromProps.
  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
  // Newer versions of React will ignore these lifecycles if gDSFP exists.


  if (typeof Component.getDerivedStateFromProps === 'function') {
    prototype.componentWillMount = componentWillMount;
    prototype.componentWillReceiveProps = componentWillReceiveProps;
  } // React <= 16.2 does not support getSnapshotBeforeUpdate.
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

  var UncontrolledComponent = /*#__PURE__*/function (_React$Component) {
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


;// CONCATENATED MODULE: ./src/ThemeProvider.tsx

var ThemeProvider_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ThemeProvider.tsx";


var ThemeContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext({});
var Consumer = ThemeContext.Consumer,
    Provider = ThemeContext.Provider;

function ThemeProvider(_ref) {
  var prefixes = _ref.prefixes,
      children = _ref.children;
  var copiedPrefixes = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return extends_extends({}, prefixes);
  }, [prefixes]);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Provider, {
    value: copiedPrefixes,
    __self: this,
    __source: {
      fileName: ThemeProvider_jsxFileName,
      lineNumber: 14,
      columnNumber: 10
    }
  }, children);
}

ThemeProvider.propTypes = {
  prefixes: (prop_types_default()).object.isRequired
};
function useBootstrapPrefix(prefix, defaultPrefix) {
  var prefixes = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}

function createBootstrapComponent(Component, opts) {
  var _this = this;

  if (typeof opts === 'string') opts = {
    prefix: opts
  };
  var isClassy = Component.prototype && Component.prototype.isReactComponent; // If it's a functional component make sure we don't break it with a ref

  var _opts = opts,
      prefix = _opts.prefix,
      _opts$forwardRefAs = _opts.forwardRefAs,
      forwardRefAs = _opts$forwardRefAs === void 0 ? isClassy ? 'ref' : 'innerRef' : _opts$forwardRefAs;
  var Wrapped = /*#__PURE__*/React.forwardRef(function (_ref2, ref) {
    var props = _extends({}, _ref2);

    props[forwardRefAs] = ref;
    var bsPrefix = useBootstrapPrefix(props.bsPrefix, prefix);
    return /*#__PURE__*/React.createElement(Component, _extends({}, props, {
      bsPrefix: bsPrefix,
      __self: _this,
      __source: {
        fileName: ThemeProvider_jsxFileName,
        lineNumber: 38,
        columnNumber: 12
      }
    }));
  });
  Wrapped.displayName = "Bootstrap(" + (Component.displayName || Component.name) + ")";
  return Wrapped;
}


/* harmony default export */ const src_ThemeProvider = (ThemeProvider);
;// CONCATENATED MODULE: ./src/SelectableContext.tsx
 // TODO (apparently this is a bare "onSelect"?)

var SelectableContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(null);
var makeEventKey = function makeEventKey(eventKey, href) {
  if (href === void 0) {
    href = null;
  }

  if (eventKey != null) return String(eventKey);
  return href || null;
};
/* harmony default export */ const src_SelectableContext = (SelectableContext);
;// CONCATENATED MODULE: ./src/AccordionContext.ts

var context = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(null);
context.displayName = 'AccordionContext';
/* harmony default export */ const AccordionContext = (context);
;// CONCATENATED MODULE: ./src/AccordionToggle.tsx


var _excluded = ["as", "children", "eventKey", "onClick"];

var AccordionToggle_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/AccordionToggle.tsx",
    _this = undefined;





var propTypes = {
  /** Set a custom element for this component */
  as: (prop_types_default()).elementType,

  /**
   * A key that corresponds to the collapse component that gets triggered
   * when this has been clicked.
   */
  eventKey: (prop_types_default()).string.isRequired,

  /** A callback function for when this component is clicked */
  onClick: (prop_types_default()).func
};
function useAccordionToggle(eventKey, onClick) {
  var contextEventKey = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(AccordionContext);
  var onSelect = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_SelectableContext);
  return function (e) {
    /*
      Compare the event key in context with the given event key.
      If they are the same, then collapse the component.
    */
    var eventKeyPassed = eventKey === contextEventKey ? null : eventKey;
    if (onSelect) onSelect(eventKeyPassed, e);
    if (onClick) onClick(e);
  };
}
var AccordionToggle = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'button' : _ref$as,
      children = _ref.children,
      eventKey = _ref.eventKey,
      onClick = _ref.onClick,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, _excluded);

  var accordionOnClick = useAccordionToggle(eventKey, onClick);

  if (Component === 'button') {
    props.type = 'button';
  }

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref,
    onClick: accordionOnClick
  }, props, {
    __self: _this,
    __source: {
      fileName: AccordionToggle_jsxFileName,
      lineNumber: 74,
      columnNumber: 7
    }
  }), children);
});
AccordionToggle.propTypes = propTypes;
/* harmony default export */ const src_AccordionToggle = (AccordionToggle);
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
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
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
var external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_ = __webpack_require__(207);
var external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default = /*#__PURE__*/__webpack_require__.n(external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_);
;// CONCATENATED MODULE: ./node_modules/react-transition-group/esm/config.js
/* harmony default export */ const config = ({
  disabled: false
});
;// CONCATENATED MODULE: ./node_modules/react-transition-group/esm/TransitionGroupContext.js

/* harmony default export */ const TransitionGroupContext = (external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(null));
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

    return (
      /*#__PURE__*/
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
  var str = css(node, property) || '';
  var mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

function transitionEndListener(element, handler) {
  var duration = transitionEndListener_parseDuration(element, 'transitionDuration');
  var delay = transitionEndListener_parseDuration(element, 'transitionDelay');
  var remove = transitionEnd(element, function (e) {
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
function createChainedFunction() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.filter(function (f) {
    return f != null;
  }).reduce(function (acc, f) {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }

    if (acc === null) return f;
    return function chainedFunction() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      // @ts-ignore
      acc.apply(this, args); // @ts-ignore

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
;// CONCATENATED MODULE: ./src/Collapse.tsx


var Collapse_excluded = ["onEnter", "onEntering", "onEntered", "onExit", "onExiting", "className", "children", "dimension", "getDimensionValue"];

var Collapse_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Collapse.tsx",
    _collapseStyles,
    Collapse_this = undefined;









var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

function getDefaultDimensionValue(dimension, elem) {
  var offset = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
  var value = elem[offset];
  var margins = MARGINS[dimension];
  return value + // @ts-ignore
  parseInt(css(elem, margins[0]), 10) + // @ts-ignore
  parseInt(css(elem, margins[1]), 10);
}

var collapseStyles = (_collapseStyles = {}, _collapseStyles[EXITED] = 'collapse', _collapseStyles[EXITING] = 'collapsing', _collapseStyles[ENTERING] = 'collapsing', _collapseStyles[ENTERED] = 'collapse show', _collapseStyles);
var Collapse_propTypes = {
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
   *
   * _Note: Bootstrap only partially supports 'width'!
   * You will need to supply your own CSS animation for the `.width` CSS class._
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
  role: (prop_types_default()).string
};
var defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  getDimensionValue: getDefaultDimensionValue
};
var Collapse = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var onEnter = _ref.onEnter,
      onEntering = _ref.onEntering,
      onEntered = _ref.onEntered,
      onExit = _ref.onExit,
      onExiting = _ref.onExiting,
      className = _ref.className,
      children = _ref.children,
      _ref$dimension = _ref.dimension,
      dimension = _ref$dimension === void 0 ? 'height' : _ref$dimension,
      _ref$getDimensionValu = _ref.getDimensionValue,
      getDimensionValue = _ref$getDimensionValu === void 0 ? getDefaultDimensionValue : _ref$getDimensionValu,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Collapse_excluded);

  /* Compute dimension */
  var computedDimension = typeof dimension === 'function' ? dimension() : dimension;
  /* -- Expanding -- */

  var handleEnter = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return src_createChainedFunction(function (elem) {
      elem.style[computedDimension] = '0';
    }, onEnter);
  }, [computedDimension, onEnter]);
  var handleEntering = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return src_createChainedFunction(function (elem) {
      var scroll = "scroll" + computedDimension[0].toUpperCase() + computedDimension.slice(1);
      elem.style[computedDimension] = elem[scroll] + "px";
    }, onEntering);
  }, [computedDimension, onEntering]);
  var handleEntered = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return src_createChainedFunction(function (elem) {
      elem.style[computedDimension] = null;
    }, onEntered);
  }, [computedDimension, onEntered]);
  /* -- Collapsing -- */

  var handleExit = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return src_createChainedFunction(function (elem) {
      elem.style[computedDimension] = getDimensionValue(computedDimension, elem) + "px";
      triggerBrowserReflow(elem);
    }, onExit);
  }, [onExit, getDimensionValue, computedDimension]);
  var handleExiting = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return src_createChainedFunction(function (elem) {
      elem.style[computedDimension] = null;
    }, onExiting);
  }, [computedDimension, onExiting]);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(esm_Transition // @ts-ignore
  , extends_extends({
    ref: ref,
    addEndListener: transitionEndListener
  }, props, {
    "aria-expanded": props.role ? props.in : null,
    onEnter: handleEnter,
    onEntering: handleEntering,
    onEntered: handleEntered,
    onExit: handleExit,
    onExiting: handleExiting,
    __self: Collapse_this,
    __source: {
      fileName: Collapse_jsxFileName,
      lineNumber: 222,
      columnNumber: 7
    }
  }), function (state, innerProps) {
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(children, extends_extends({}, innerProps, {
      className: classnames_default()(className, children.props.className, collapseStyles[state], computedDimension === 'width' && 'width')
    }));
  });
}); // @ts-ignore

Collapse.propTypes = Collapse_propTypes; // @ts-ignore

Collapse.defaultProps = defaultProps;
/* harmony default export */ const src_Collapse = (Collapse);
;// CONCATENATED MODULE: ./src/AccordionCollapse.tsx


var AccordionCollapse_excluded = ["children", "eventKey"];

var AccordionCollapse_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/AccordionCollapse.tsx",
    AccordionCollapse_this = undefined;






var AccordionCollapse_propTypes = {
  /**
   * A key that corresponds to the toggler that triggers this collapse's expand or collapse.
   */
  eventKey: (prop_types_default()).string.isRequired,

  /** Children prop should only contain a single child, and is enforced as such */
  children: (prop_types_default()).element.isRequired
};
var AccordionCollapse = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var children = _ref.children,
      eventKey = _ref.eventKey,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, AccordionCollapse_excluded);

  var contextEventKey = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(AccordionContext); // Empty SelectableContext is to prevent elements in the collapse
  // from collapsing the accordion when clicked.

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SelectableContext.Provider, {
    value: null,
    __self: AccordionCollapse_this,
    __source: {
      fileName: AccordionCollapse_jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Collapse, extends_extends({
    ref: ref,
    in: contextEventKey === eventKey
  }, props, {
    __self: AccordionCollapse_this,
    __source: {
      fileName: AccordionCollapse_jsxFileName,
      lineNumber: 37,
      columnNumber: 9
    }
  }), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
    __self: AccordionCollapse_this,
    __source: {
      fileName: AccordionCollapse_jsxFileName,
      lineNumber: 38,
      columnNumber: 11
    }
  }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.only(children))));
});
AccordionCollapse.propTypes = AccordionCollapse_propTypes;
AccordionCollapse.displayName = 'AccordionCollapse';
/* harmony default export */ const src_AccordionCollapse = (AccordionCollapse);
;// CONCATENATED MODULE: ./src/Accordion.tsx


var Accordion_excluded = ["as", "activeKey", "bsPrefix", "children", "className", "onSelect"];

var Accordion_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Accordion.tsx",
    Accordion_this = undefined;










var Accordion_propTypes = {
  /** Set a custom element for this component */
  as: (prop_types_default()).elementType,

  /** @default 'accordion' */
  bsPrefix: (prop_types_default()).string,

  /** The current active key that corresponds to the currently expanded card */
  activeKey: (prop_types_default()).string,

  /** The default active key that is expanded on start */
  defaultActiveKey: (prop_types_default()).string
};
var Accordion = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (props, ref) {
  var _useUncontrolled = useUncontrolled(props, {
    activeKey: 'onSelect'
  }),
      _useUncontrolled$as = _useUncontrolled.as,
      Component = _useUncontrolled$as === void 0 ? 'div' : _useUncontrolled$as,
      activeKey = _useUncontrolled.activeKey,
      bsPrefix = _useUncontrolled.bsPrefix,
      children = _useUncontrolled.children,
      className = _useUncontrolled.className,
      onSelect = _useUncontrolled.onSelect,
      controlledProps = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_useUncontrolled, Accordion_excluded);

  var finalClassName = classnames_default()(className, useBootstrapPrefix(bsPrefix, 'accordion'));
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(AccordionContext.Provider, {
    value: activeKey || null,
    __self: Accordion_this,
    __source: {
      fileName: Accordion_jsxFileName,
      lineNumber: 62,
      columnNumber: 5
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SelectableContext.Provider, {
    value: onSelect || null,
    __self: Accordion_this,
    __source: {
      fileName: Accordion_jsxFileName,
      lineNumber: 63,
      columnNumber: 7
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref
  }, controlledProps, {
    className: finalClassName,
    __self: Accordion_this,
    __source: {
      fileName: Accordion_jsxFileName,
      lineNumber: 64,
      columnNumber: 9
    }
  }), children)));
});
Accordion.displayName = 'Accordion';
Accordion.propTypes = Accordion_propTypes;
Accordion.Toggle = src_AccordionToggle;
Accordion.Collapse = src_AccordionCollapse;
/* harmony default export */ const src_Accordion = (Accordion);
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

function useCommittedRef(value) {
  var ref = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(value);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    ref.current = value;
  }, [value]);
  return ref;
}

/* harmony default export */ const esm_useCommittedRef = (useCommittedRef);
;// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useEventCallback.js


function useEventCallback(fn) {
  var ref = esm_useCommittedRef(fn);
  return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    return ref.current && ref.current.apply(ref, arguments);
  }, [ref]);
}
;// CONCATENATED MODULE: ./src/Fade.tsx


var Fade_excluded = ["className", "children"];

var Fade_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Fade.tsx",
    _fadeStyles,
    Fade_this = undefined;







var Fade_propTypes = {
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
var Fade_defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false
};
var fadeStyles = (_fadeStyles = {}, _fadeStyles[ENTERING] = 'show', _fadeStyles[ENTERED] = 'show', _fadeStyles);
var Fade = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var className = _ref.className,
      children = _ref.children,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Fade_excluded);

  var handleEnter = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (node) {
    triggerBrowserReflow(node);
    if (props.onEnter) props.onEnter(node);
  }, [props]);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(esm_Transition, extends_extends({
    ref: ref,
    addEndListener: transitionEndListener
  }, props, {
    onEnter: handleEnter,
    __self: Fade_this,
    __source: {
      fileName: Fade_jsxFileName,
      lineNumber: 101,
      columnNumber: 7
    }
  }), function (status, innerProps) {
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(children, extends_extends({}, innerProps, {
      className: classnames_default()('fade', className, children.props.className, fadeStyles[status])
    }));
  });
});
Fade.propTypes = Fade_propTypes;
Fade.defaultProps = Fade_defaultProps;
Fade.displayName = 'Fade';
/* harmony default export */ const src_Fade = (Fade);
;// CONCATENATED MODULE: ./src/CloseButton.tsx


var CloseButton_excluded = ["label", "onClick", "className"];

var CloseButton_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CloseButton.tsx",
    CloseButton_this = undefined;




var CloseButton_propTypes = {
  label: (prop_types_default()).string.isRequired,
  onClick: (prop_types_default()).func
};
var CloseButton_defaultProps = {
  label: 'Close'
};
var CloseButton = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var label = _ref.label,
      onClick = _ref.onClick,
      className = _ref.className,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, CloseButton_excluded);

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("button", extends_extends({
    ref: ref,
    type: "button",
    className: classnames_default()('close', className),
    onClick: onClick
  }, props, {
    __self: CloseButton_this,
    __source: {
      fileName: CloseButton_jsxFileName,
      lineNumber: 21,
      columnNumber: 5
    }
  }), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
    "aria-hidden": "true",
    __self: CloseButton_this,
    __source: {
      fileName: CloseButton_jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }
  }, "\xD7"), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
    className: "sr-only",
    __self: CloseButton_this,
    __source: {
      fileName: CloseButton_jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }
  }, label));
});
CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = CloseButton_propTypes;
CloseButton.defaultProps = CloseButton_defaultProps;
/* harmony default export */ const src_CloseButton = (CloseButton);
;// CONCATENATED MODULE: ./src/divWithClassName.tsx


var divWithClassName_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/divWithClassName.tsx",
    divWithClassName_this = undefined;



/* harmony default export */ const divWithClassName = (function (className) {
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (p, ref) {
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({}, p, {
      ref: ref,
      className: classnames_default()(p.className, className),
      __self: divWithClassName_this,
      __source: {
        fileName: divWithClassName_jsxFileName,
        lineNumber: 6,
        columnNumber: 5
      }
    }));
  });
});
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/camelize.js
var rHyphen = /-(.)/g;
function camelize(string) {
  return string.replace(rHyphen, function (_, chr) {
    return chr.toUpperCase();
  });
}
;// CONCATENATED MODULE: ./src/createWithBsPrefix.tsx


var createWithBsPrefix_excluded = ["className", "bsPrefix", "as"];
var createWithBsPrefix_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/createWithBsPrefix.tsx";





var pascalCase = function pascalCase(str) {
  return str[0].toUpperCase() + camelize(str).slice(1);
};

// TODO: emstricten & fix the typing here! `createWithBsPrefix<TElementType>...`
function createWithBsPrefix(prefix, _temp) {
  var _this = this;

  var _ref = _temp === void 0 ? {} : _temp,
      _ref$displayName = _ref.displayName,
      displayName = _ref$displayName === void 0 ? pascalCase(prefix) : _ref$displayName,
      Component = _ref.Component,
      defaultProps = _ref.defaultProps;

  var BsComponent = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref2, ref) {
    var className = _ref2.className,
        bsPrefix = _ref2.bsPrefix,
        _ref2$as = _ref2.as,
        Tag = _ref2$as === void 0 ? Component || 'div' : _ref2$as,
        props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref2, createWithBsPrefix_excluded);

    var resolvedPrefix = useBootstrapPrefix(bsPrefix, prefix);
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Tag, extends_extends({
      ref: ref,
      className: classnames_default()(className, resolvedPrefix)
    }, props, {
      __self: _this,
      __source: {
        fileName: createWithBsPrefix_jsxFileName,
        lineNumber: 33,
        columnNumber: 9
      }
    }));
  });
  BsComponent.defaultProps = defaultProps;
  BsComponent.displayName = displayName;
  return BsComponent;
}
;// CONCATENATED MODULE: ./src/SafeAnchor.tsx


var SafeAnchor_excluded = ["as", "disabled", "onKeyDown"];

var SafeAnchor_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/SafeAnchor.tsx",
    SafeAnchor_this = undefined;




var SafeAnchor_propTypes = {
  href: (prop_types_default()).string,
  onClick: (prop_types_default()).func,
  onKeyDown: (prop_types_default()).func,
  disabled: (prop_types_default()).bool,
  role: (prop_types_default()).string,
  tabIndex: prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string]),

  /**
   * this is sort of silly but needed for Button
   */
  as: (prop_types_default()).elementType
};

function isTrivialHref(href) {
  return !href || href.trim() === '#';
}
/**
 * There are situations due to browser quirks or Bootstrap CSS where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, DropdownItems, etc.
 */


var SafeAnchor = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'a' : _ref$as,
      disabled = _ref.disabled,
      onKeyDown = _ref.onKeyDown,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, SafeAnchor_excluded);

  var handleClick = function handleClick(event) {
    var href = props.href,
        onClick = props.onClick;

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

  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  };

  if (isTrivialHref(props.href)) {
    props.role = props.role || 'button'; // we want to make sure there is a href attribute on the node
    // otherwise, the cursor incorrectly styled (except with role='button')

    props.href = props.href || '#';
  }

  if (disabled) {
    props.tabIndex = -1;
    props['aria-disabled'] = true;
  }

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref
  }, props, {
    onClick: handleClick,
    onKeyDown: src_createChainedFunction(handleKeyDown, onKeyDown),
    __self: SafeAnchor_this,
    __source: {
      fileName: SafeAnchor_jsxFileName,
      lineNumber: 90,
      columnNumber: 7
    }
  }));
});
SafeAnchor.propTypes = SafeAnchor_propTypes;
SafeAnchor.displayName = 'SafeAnchor';
/* harmony default export */ const src_SafeAnchor = (SafeAnchor);
;// CONCATENATED MODULE: ./src/Alert.tsx


var Alert_excluded = ["bsPrefix", "show", "closeLabel", "className", "children", "variant", "onClose", "dismissible", "transition"];

var Alert_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Alert.tsx",
    Alert_this = undefined;













var DivStyledAsH4 = divWithClassName('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';
var AlertHeading = createWithBsPrefix('alert-heading', {
  Component: DivStyledAsH4
});
var AlertLink = createWithBsPrefix('alert-link', {
  Component: src_SafeAnchor
});
var Alert_propTypes = {
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
   * Animate the alert dismissal. Defaults to using `<Fade>` animation or use
   * `false` to disable. A custom `react-transition-group` Transition can also
   * be provided.
   */
  transition: prop_types_default().oneOfType([(prop_types_default()).bool, lib/* elementType */.nm])
};
var Alert_defaultProps = {
  show: true,
  transition: src_Fade,
  closeLabel: 'Close alert'
};
var Alert = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (uncontrolledProps, ref) {
  var _useUncontrolled = useUncontrolled(uncontrolledProps, {
    show: 'onClose'
  }),
      bsPrefix = _useUncontrolled.bsPrefix,
      show = _useUncontrolled.show,
      closeLabel = _useUncontrolled.closeLabel,
      className = _useUncontrolled.className,
      children = _useUncontrolled.children,
      variant = _useUncontrolled.variant,
      onClose = _useUncontrolled.onClose,
      dismissible = _useUncontrolled.dismissible,
      transition = _useUncontrolled.transition,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_useUncontrolled, Alert_excluded);

  var prefix = useBootstrapPrefix(bsPrefix, 'alert');
  var handleClose = useEventCallback(function (e) {
    if (onClose) {
      onClose(false, e);
    }
  });
  var Transition = transition === true ? src_Fade : transition;
  var alert = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({
    role: "alert"
  }, !Transition ? props : undefined, {
    ref: ref,
    className: classnames_default()(className, prefix, variant && prefix + "-" + variant, dismissible && prefix + "-dismissible"),
    __self: Alert_this,
    __source: {
      fileName: Alert_jsxFileName,
      lineNumber: 119,
      columnNumber: 7
    }
  }), dismissible && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_CloseButton, {
    onClick: handleClose,
    label: closeLabel,
    __self: Alert_this,
    __source: {
      fileName: Alert_jsxFileName,
      lineNumber: 131,
      columnNumber: 11
    }
  }), children);
  if (!Transition) return show ? alert : null;
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Transition, extends_extends({
    unmountOnExit: true
  }, props, {
    ref: undefined,
    in: show,
    __self: Alert_this,
    __source: {
      fileName: Alert_jsxFileName,
      lineNumber: 140,
      columnNumber: 7
    }
  }), alert);
});
Alert.displayName = 'Alert';
Alert.defaultProps = Alert_defaultProps;
Alert.propTypes = Alert_propTypes;
Alert.Link = AlertLink;
Alert.Heading = AlertHeading;
/* harmony default export */ const src_Alert = (Alert);
;// CONCATENATED MODULE: ./src/Badge.tsx


var Badge_excluded = ["bsPrefix", "variant", "pill", "className", "as"];

var Badge_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Badge.tsx",
    Badge_this = undefined;





var Badge_propTypes = {
  /** @default 'badge' */
  bsPrefix: (prop_types_default()).string,

  /**
   * The visual style of the badge
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  variant: (prop_types_default()).string,

  /**
   * Add the `pill` modifier to make badges more rounded with
   * some additional horizontal padding
   */
  pill: (prop_types_default()).bool.isRequired,

  /** @default span */
  as: (prop_types_default()).elementType
};
var Badge_defaultProps = {
  pill: false
};
var Badge = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      variant = _ref.variant,
      pill = _ref.pill,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'span' : _ref$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Badge_excluded);

  var prefix = useBootstrapPrefix(bsPrefix, 'badge');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(className, prefix, pill && prefix + "-pill", variant && prefix + "-" + variant),
    __self: Badge_this,
    __source: {
      fileName: Badge_jsxFileName,
      lineNumber: 55,
      columnNumber: 7
    }
  }));
});
Badge.displayName = 'Badge';
Badge.propTypes = Badge_propTypes;
Badge.defaultProps = Badge_defaultProps;
/* harmony default export */ const src_Badge = (Badge);
;// CONCATENATED MODULE: ./src/BreadcrumbItem.tsx


var BreadcrumbItem_excluded = ["bsPrefix", "active", "children", "className", "as", "linkAs", "linkProps", "href", "title", "target"];

var BreadcrumbItem_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/BreadcrumbItem.tsx",
    BreadcrumbItem_this = undefined;






var BreadcrumbItem_propTypes = {
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
var BreadcrumbItem_defaultProps = {
  active: false,
  linkProps: {}
};
var BreadcrumbItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      active = _ref.active,
      children = _ref.children,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'li' : _ref$as,
      _ref$linkAs = _ref.linkAs,
      LinkComponent = _ref$linkAs === void 0 ? src_SafeAnchor : _ref$linkAs,
      linkProps = _ref.linkProps,
      href = _ref.href,
      title = _ref.title,
      target = _ref.target,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, BreadcrumbItem_excluded);

  var prefix = useBootstrapPrefix(bsPrefix, 'breadcrumb-item');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(prefix, className, {
      active: active
    }),
    "aria-current": active ? 'page' : undefined,
    __self: BreadcrumbItem_this,
    __source: {
      fileName: BreadcrumbItem_jsxFileName,
      lineNumber: 83,
      columnNumber: 7
    }
  }), active ? children : /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(LinkComponent, extends_extends({}, linkProps, {
    href: href,
    title: title,
    target: target,
    __self: BreadcrumbItem_this,
    __source: {
      fileName: BreadcrumbItem_jsxFileName,
      lineNumber: 92,
      columnNumber: 11
    }
  }), children));
});
BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.propTypes = BreadcrumbItem_propTypes;
BreadcrumbItem.defaultProps = BreadcrumbItem_defaultProps;
/* harmony default export */ const src_BreadcrumbItem = (BreadcrumbItem);
;// CONCATENATED MODULE: ./src/Breadcrumb.tsx


var Breadcrumb_excluded = ["bsPrefix", "className", "listProps", "children", "label", "as"];

var Breadcrumb_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Breadcrumb.tsx",
    Breadcrumb_this = undefined;






var Breadcrumb_propTypes = {
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
var Breadcrumb_defaultProps = {
  label: 'breadcrumb',
  listProps: {}
};
var Breadcrumb = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      listProps = _ref.listProps,
      children = _ref.children,
      label = _ref.label,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'nav' : _ref$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Breadcrumb_excluded);

  var prefix = useBootstrapPrefix(bsPrefix, 'breadcrumb');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    "aria-label": label,
    className: className,
    ref: ref
  }, props, {
    __self: Breadcrumb_this,
    __source: {
      fileName: Breadcrumb_jsxFileName,
      lineNumber: 62,
      columnNumber: 7
    }
  }), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("ol", extends_extends({}, listProps, {
    className: classnames_default()(prefix, listProps == null ? void 0 : listProps.className),
    __self: Breadcrumb_this,
    __source: {
      fileName: Breadcrumb_jsxFileName,
      lineNumber: 63,
      columnNumber: 9
    }
  }), children));
});
Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = Breadcrumb_propTypes;
Breadcrumb.defaultProps = Breadcrumb_defaultProps;
Breadcrumb.Item = src_BreadcrumbItem;
/* harmony default export */ const src_Breadcrumb = (Breadcrumb);
;// CONCATENATED MODULE: ./src/Button.tsx


var Button_excluded = ["bsPrefix", "variant", "size", "active", "className", "block", "type", "as"];

var Button_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Button.tsx",
    Button_this = undefined;






var Button_propTypes = {
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
   * Specifies a large or small button.
   *
   * @type ('sm'|'lg')
   */
  size: (prop_types_default()).string,

  /** Spans the full width of the Button parent */
  block: (prop_types_default()).bool,

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
var Button_defaultProps = {
  variant: 'primary',
  active: false,
  disabled: false
};
var Button = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      variant = _ref.variant,
      size = _ref.size,
      active = _ref.active,
      className = _ref.className,
      block = _ref.block,
      type = _ref.type,
      as = _ref.as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Button_excluded);

  var prefix = useBootstrapPrefix(bsPrefix, 'btn');
  var classes = classnames_default()(className, prefix, active && 'active', variant && prefix + "-" + variant, block && prefix + "-block", size && prefix + "-" + size);

  if (props.href) {
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SafeAnchor, extends_extends({}, props, {
      as: as,
      ref: ref,
      className: classnames_default()(classes, props.disabled && 'disabled'),
      __self: Button_this,
      __source: {
        fileName: Button_jsxFileName,
        lineNumber: 116,
        columnNumber: 9
      }
    }));
  }

  if (ref) {
    props.ref = ref;
  }

  if (type) {
    props.type = type;
  } else if (!as) {
    props.type = 'button';
  }

  var Component = as || 'button';
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    className: classes,
    __self: Button_this,
    __source: {
      fileName: Button_jsxFileName,
      lineNumber: 136,
      columnNumber: 12
    }
  }));
});
Button.displayName = 'Button';
Button.propTypes = Button_propTypes;
Button.defaultProps = Button_defaultProps;
/* harmony default export */ const src_Button = (Button);
;// CONCATENATED MODULE: ./src/ButtonGroup.tsx


var ButtonGroup_excluded = ["bsPrefix", "size", "toggle", "vertical", "className", "as"];

var ButtonGroup_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ButtonGroup.tsx",
    ButtonGroup_this = undefined;





var ButtonGroup_propTypes = {
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
   * Display as a button toggle group.
   *
   * (Generally it's better to use `ToggleButtonGroup` directly)
   */
  toggle: (prop_types_default()).bool,

  /**
   * An ARIA role describing the button group. Usually the default
   * "group" role is fine. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role: (prop_types_default()).string,
  as: (prop_types_default()).elementType
};
var ButtonGroup_defaultProps = {
  vertical: false,
  toggle: false,
  role: 'group'
};
var ButtonGroup = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      size = _ref.size,
      toggle = _ref.toggle,
      vertical = _ref.vertical,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, ButtonGroup_excluded);

  var prefix = useBootstrapPrefix(bsPrefix, 'btn-group');
  var baseClass = prefix;
  if (vertical) baseClass = prefix + "-vertical";
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, rest, {
    ref: ref,
    className: classnames_default()(className, baseClass, size && prefix + "-" + size, toggle && prefix + "-toggle"),
    __self: ButtonGroup_this,
    __source: {
      fileName: ButtonGroup_jsxFileName,
      lineNumber: 79,
      columnNumber: 7
    }
  }));
});
ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.propTypes = ButtonGroup_propTypes;
ButtonGroup.defaultProps = ButtonGroup_defaultProps;
/* harmony default export */ const src_ButtonGroup = (ButtonGroup);
;// CONCATENATED MODULE: ./src/ButtonToolbar.tsx


var ButtonToolbar_excluded = ["bsPrefix", "className"];

var ButtonToolbar_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ButtonToolbar.tsx",
    ButtonToolbar_this = undefined;





var ButtonToolbar_propTypes = {
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
var ButtonToolbar_defaultProps = {
  role: 'toolbar'
};
var ButtonToolbar = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, ButtonToolbar_excluded);

  var prefix = useBootstrapPrefix(bsPrefix, 'btn-toolbar');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({}, props, {
    ref: ref,
    className: classnames_default()(className, prefix),
    __self: ButtonToolbar_this,
    __source: {
      fileName: ButtonToolbar_jsxFileName,
      lineNumber: 42,
      columnNumber: 10
    }
  }));
});
ButtonToolbar.displayName = 'ButtonToolbar';
ButtonToolbar.propTypes = ButtonToolbar_propTypes;
ButtonToolbar.defaultProps = ButtonToolbar_defaultProps;
/* harmony default export */ const src_ButtonToolbar = (ButtonToolbar);
;// CONCATENATED MODULE: ./src/CardContext.tsx

var CardContext_context = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(null);
CardContext_context.displayName = 'CardContext';
/* harmony default export */ const CardContext = (CardContext_context);
;// CONCATENATED MODULE: ./src/CardImg.tsx


var CardImg_excluded = ["bsPrefix", "className", "variant", "as"];

var CardImg_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CardImg.tsx",
    CardImg_this = undefined;





var CardImg_propTypes = {
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
  variant: prop_types_default().oneOf(['top', 'bottom', null]),
  as: (prop_types_default()).elementType
};
var CardImg_defaultProps = {
  variant: null
};
var CardImg = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      variant = _ref.variant,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'img' : _ref$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, CardImg_excluded);

  var prefix = useBootstrapPrefix(bsPrefix, 'card-img');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref,
    className: classnames_default()(variant ? prefix + "-" + variant : prefix, className)
  }, props, {
    __self: CardImg_this,
    __source: {
      fileName: CardImg_jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }
  }));
});
CardImg.displayName = 'CardImg';
CardImg.propTypes = CardImg_propTypes;
CardImg.defaultProps = CardImg_defaultProps;
/* harmony default export */ const src_CardImg = (CardImg);
;// CONCATENATED MODULE: ./src/Card.tsx


var Card_excluded = ["bsPrefix", "className", "bg", "text", "border", "body", "children", "as"];

var Card_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Card.tsx",
    Card_this = undefined;









var DivStyledAsH5 = divWithClassName('h5');
var DivStyledAsH6 = divWithClassName('h6');
var CardBody = createWithBsPrefix('card-body');
var CardTitle = createWithBsPrefix('card-title', {
  Component: DivStyledAsH5
});
var CardSubtitle = createWithBsPrefix('card-subtitle', {
  Component: DivStyledAsH6
});
var CardLink = createWithBsPrefix('card-link', {
  Component: 'a'
});
var CardText = createWithBsPrefix('card-text', {
  Component: 'p'
});
var CardHeader = createWithBsPrefix('card-header');
var CardFooter = createWithBsPrefix('card-footer');
var CardImgOverlay = createWithBsPrefix('card-img-overlay');
var Card_propTypes = {
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
var Card_defaultProps = {
  body: false
};
var Card = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      bg = _ref.bg,
      text = _ref.text,
      border = _ref.border,
      body = _ref.body,
      children = _ref.children,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Card_excluded);

  var prefix = useBootstrapPrefix(bsPrefix, 'card');
  var cardContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return {
      cardHeaderBsPrefix: prefix + "-header"
    };
  }, [prefix]);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(CardContext.Provider, {
    value: cardContext,
    __self: Card_this,
    __source: {
      fileName: Card_jsxFileName,
      lineNumber: 115,
      columnNumber: 7
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(className, prefix, bg && "bg-" + bg, text && "text-" + text, border && "border-" + border),
    __self: Card_this,
    __source: {
      fileName: Card_jsxFileName,
      lineNumber: 116,
      columnNumber: 9
    }
  }), body ?
  /*#__PURE__*/
  // @ts-ignore
  external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(CardBody, {
    __self: Card_this,
    __source: {
      fileName: Card_jsxFileName,
      lineNumber: 129,
      columnNumber: 13
    }
  }, children) : children));
});
Card.displayName = 'Card';
Card.propTypes = Card_propTypes;
Card.defaultProps = Card_defaultProps;
Card.Img = src_CardImg;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Body = CardBody;
Card.Link = CardLink;
Card.Text = CardText;
Card.Header = CardHeader;
Card.Footer = CardFooter;
Card.ImgOverlay = CardImgOverlay;
/* harmony default export */ const src_Card = (Card);
;// CONCATENATED MODULE: ./src/CardColumns.tsx

/* harmony default export */ const CardColumns = (createWithBsPrefix('card-columns'));
;// CONCATENATED MODULE: ./src/CardDeck.tsx

/* harmony default export */ const CardDeck = (createWithBsPrefix('card-deck'));
;// CONCATENATED MODULE: ./src/CardGroup.tsx

/* harmony default export */ const CardGroup = (createWithBsPrefix('card-group'));
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

/* harmony default export */ const CarouselCaption = (createWithBsPrefix('carousel-caption'));
;// CONCATENATED MODULE: ./src/CarouselItem.tsx


var CarouselItem_excluded = ["as", "bsPrefix", "children", "className"];

var CarouselItem_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/CarouselItem.tsx",
    CarouselItem_this = undefined;





var CarouselItem_propTypes = {
  /** Set a custom element for this component */
  as: (prop_types_default()).elementType,

  /** @default 'carousel-item' */
  bsPrefix: (prop_types_default()).string,

  /** The amount of time to delay between automatically cycling this specific item. Will default to the Carousel's `interval` prop value if none is specified. */
  interval: (prop_types_default()).number
};
var CarouselItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      bsPrefix = _ref.bsPrefix,
      children = _ref.children,
      className = _ref.className,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, CarouselItem_excluded);

  var finalClassName = classnames_default()(className, useBootstrapPrefix(bsPrefix, 'carousel-item'));
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref
  }, props, {
    className: finalClassName,
    __self: CarouselItem_this,
    __source: {
      fileName: CarouselItem_jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }
  }), children);
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
  var index = 0;
  return external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.map(children, function (child) {
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().isValidElement(child) ? func(child, index++) : child;
  });
}
/**
 * Iterates through children that are "valid elements".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 */


function forEach(children, func) {
  var index = 0;
  external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.forEach(children, function (child) {
    if ( /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().isValidElement(child)) func(child, index++);
  });
}


;// CONCATENATED MODULE: ./src/Carousel.tsx


var Carousel_excluded = ["as", "bsPrefix", "slide", "fade", "controls", "indicators", "activeIndex", "onSelect", "onSlide", "onSlid", "interval", "keyboard", "onKeyDown", "pause", "onMouseOver", "onMouseOut", "wrap", "touch", "onTouchStart", "onTouchMove", "onTouchEnd", "prevIcon", "prevLabel", "nextIcon", "nextLabel", "className", "children"];
var Carousel_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Carousel.tsx";
















var SWIPE_THRESHOLD = 40;
var Carousel_propTypes = {
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
  interval: (prop_types_default()).number,

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
  nextLabel: (prop_types_default()).string
};
var Carousel_defaultProps = {
  slide: true,
  fade: false,
  controls: true,
  indicators: true,
  defaultActiveIndex: 0,
  interval: 5000,
  keyboard: true,
  pause: 'hover',
  wrap: true,
  touch: true,
  prevIcon: /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
    "aria-hidden": "true",
    className: "carousel-control-prev-icon",
    __self: undefined,
    __source: {
      fileName: Carousel_jsxFileName,
      lineNumber: 190,
      columnNumber: 13
    }
  }),
  prevLabel: 'Previous',
  nextIcon: /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
    "aria-hidden": "true",
    className: "carousel-control-next-icon",
    __self: undefined,
    __source: {
      fileName: Carousel_jsxFileName,
      lineNumber: 193,
      columnNumber: 13
    }
  }),
  nextLabel: 'Next'
};

function isVisible(element) {
  if (!element || !element.style || !element.parentNode || !element.parentNode.style) {
    return false;
  }

  var elementStyle = getComputedStyle(element);
  return elementStyle.display !== 'none' && elementStyle.visibility !== 'hidden' && getComputedStyle(element.parentNode).display !== 'none';
}

function CarouselFunc(uncontrolledProps, ref) {
  var _this = this;

  var _useUncontrolled = useUncontrolled(uncontrolledProps, {
    activeIndex: 'onSelect'
  }),
      _useUncontrolled$as = _useUncontrolled.as,
      Component = _useUncontrolled$as === void 0 ? 'div' : _useUncontrolled$as,
      bsPrefix = _useUncontrolled.bsPrefix,
      slide = _useUncontrolled.slide,
      fade = _useUncontrolled.fade,
      controls = _useUncontrolled.controls,
      indicators = _useUncontrolled.indicators,
      activeIndex = _useUncontrolled.activeIndex,
      onSelect = _useUncontrolled.onSelect,
      onSlide = _useUncontrolled.onSlide,
      onSlid = _useUncontrolled.onSlid,
      interval = _useUncontrolled.interval,
      keyboard = _useUncontrolled.keyboard,
      onKeyDown = _useUncontrolled.onKeyDown,
      pause = _useUncontrolled.pause,
      onMouseOver = _useUncontrolled.onMouseOver,
      onMouseOut = _useUncontrolled.onMouseOut,
      wrap = _useUncontrolled.wrap,
      touch = _useUncontrolled.touch,
      onTouchStart = _useUncontrolled.onTouchStart,
      onTouchMove = _useUncontrolled.onTouchMove,
      onTouchEnd = _useUncontrolled.onTouchEnd,
      prevIcon = _useUncontrolled.prevIcon,
      prevLabel = _useUncontrolled.prevLabel,
      nextIcon = _useUncontrolled.nextIcon,
      nextLabel = _useUncontrolled.nextLabel,
      className = _useUncontrolled.className,
      children = _useUncontrolled.children,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_useUncontrolled, Carousel_excluded);

  var prefix = useBootstrapPrefix(bsPrefix, 'carousel');
  var nextDirectionRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);

  var _useState = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)('next'),
      direction = _useState[0],
      setDirection = _useState[1];

  var _useState2 = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(false),
      paused = _useState2[0],
      setPaused = _useState2[1];

  var _useState3 = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(false),
      isSliding = _useState3[0],
      setIsSliding = _useState3[1];

  var _useState4 = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(activeIndex || 0),
      renderedActiveIndex = _useState4[0],
      setRenderedActiveIndex = _useState4[1];

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

  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (nextDirectionRef.current) {
      nextDirectionRef.current = null;
    }
  });
  var numChildren = 0;
  var activeChildInterval; // Iterate to grab all of the children's interval values
  // (and count them, too)

  forEach(children, function (child, index) {
    ++numChildren;

    if (index === activeIndex) {
      activeChildInterval = child.props.interval;
    }
  });
  var activeChildIntervalRef = esm_useCommittedRef(activeChildInterval);
  var prev = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (event) {
    if (isSliding) {
      return;
    }

    var nextActiveIndex = renderedActiveIndex - 1;

    if (nextActiveIndex < 0) {
      if (!wrap) {
        return;
      }

      nextActiveIndex = numChildren - 1;
    }

    nextDirectionRef.current = 'prev';

    if (onSelect) {
      onSelect(nextActiveIndex, event);
    }
  }, [isSliding, renderedActiveIndex, onSelect, wrap, numChildren]); // This is used in the setInterval, so it should not invalidate.

  var next = useEventCallback(function (event) {
    if (isSliding) {
      return;
    }

    var nextActiveIndex = renderedActiveIndex + 1;

    if (nextActiveIndex >= numChildren) {
      if (!wrap) {
        return;
      }

      nextActiveIndex = 0;
    }

    nextDirectionRef.current = 'next';

    if (onSelect) {
      onSelect(nextActiveIndex, event);
    }
  });
  var elementRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)();
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useImperativeHandle)(ref, function () {
    return {
      element: elementRef.current,
      prev: prev,
      next: next
    };
  }); // This is used in the setInterval, so it should not invalidate.

  var nextWhenVisible = useEventCallback(function () {
    if (!document.hidden && isVisible(elementRef.current)) {
      next();
    }
  });
  var slideDirection = direction === 'next' ? 'left' : 'right';
  esm_useUpdateEffect(function () {
    if (slide) {
      // These callbacks will be handled by the <Transition> callbacks.
      return;
    }

    if (onSlide) {
      onSlide(renderedActiveIndex, slideDirection);
    }

    if (onSlid) {
      onSlid(renderedActiveIndex, slideDirection);
    }
  }, [renderedActiveIndex]);
  var orderClassName = prefix + "-item-" + direction;
  var directionalClassName = prefix + "-item-" + slideDirection;
  var handleEnter = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (node) {
    triggerBrowserReflow(node);

    if (onSlide) {
      onSlide(renderedActiveIndex, slideDirection);
    }
  }, [onSlide, renderedActiveIndex, slideDirection]);
  var handleEntered = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    setIsSliding(false);

    if (onSlid) {
      onSlid(renderedActiveIndex, slideDirection);
    }
  }, [onSlid, renderedActiveIndex, slideDirection]);
  var handleKeyDown = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (event) {
    if (keyboard && !/input|textarea/i.test(event.target.tagName)) {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prev(event);
          return;

        case 'ArrowRight':
          event.preventDefault();
          next(event);
          return;

        default:
      }
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  }, [keyboard, onKeyDown, prev, next]);
  var handleMouseOver = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (event) {
    if (pause === 'hover') {
      setPaused(true);
    }

    if (onMouseOver) {
      onMouseOver(event);
    }
  }, [pause, onMouseOver]);
  var handleMouseOut = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (event) {
    setPaused(false);

    if (onMouseOut) {
      onMouseOut(event);
    }
  }, [onMouseOut]);
  var touchStartXRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(0);
  var touchDeltaXRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(0);
  var touchUnpauseTimeout = useTimeout();
  var handleTouchStart = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (event) {
    touchStartXRef.current = event.touches[0].clientX;
    touchDeltaXRef.current = 0;

    if (pause === 'hover') {
      setPaused(true);
    }

    if (onTouchStart) {
      onTouchStart(event);
    }
  }, [pause, onTouchStart]);
  var handleTouchMove = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (event) {
    if (event.touches && event.touches.length > 1) {
      touchDeltaXRef.current = 0;
    } else {
      touchDeltaXRef.current = event.touches[0].clientX - touchStartXRef.current;
    }

    if (onTouchMove) {
      onTouchMove(event);
    }
  }, [onTouchMove]);
  var handleTouchEnd = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (event) {
    if (touch) {
      var touchDeltaX = touchDeltaXRef.current;

      if (Math.abs(touchDeltaX) > SWIPE_THRESHOLD) {
        if (touchDeltaX > 0) {
          prev(event);
        } else {
          next(event);
        }
      }
    }

    if (pause === 'hover') {
      touchUnpauseTimeout.set(function () {
        setPaused(false);
      }, interval || undefined);
    }

    if (onTouchEnd) {
      onTouchEnd(event);
    }
  }, [touch, pause, prev, next, touchUnpauseTimeout, interval, onTouchEnd]);
  var shouldPlay = interval != null && !paused && !isSliding;
  var intervalHandleRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)();
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    var _ref, _activeChildIntervalR;

    if (!shouldPlay) {
      return undefined;
    }

    intervalHandleRef.current = window.setInterval(document.visibilityState ? nextWhenVisible : next, (_ref = (_activeChildIntervalR = activeChildIntervalRef.current) != null ? _activeChildIntervalR : interval) != null ? _ref : undefined);
    return function () {
      if (intervalHandleRef.current !== null) {
        clearInterval(intervalHandleRef.current);
      }
    };
  }, [shouldPlay, next, activeChildIntervalRef, interval, nextWhenVisible]);
  var indicatorOnClicks = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return indicators && Array.from({
      length: numChildren
    }, function (_, index) {
      return function (event) {
        if (onSelect) {
          onSelect(index, event);
        }
      };
    });
  }, [indicators, numChildren, onSelect]);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: elementRef
  }, props, {
    onKeyDown: handleKeyDown,
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    className: classnames_default()(className, prefix, slide && 'slide', fade && prefix + "-fade"),
    __self: this,
    __source: {
      fileName: Carousel_jsxFileName,
      lineNumber: 533,
      columnNumber: 5
    }
  }), indicators && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("ol", {
    className: prefix + "-indicators",
    __self: this,
    __source: {
      fileName: Carousel_jsxFileName,
      lineNumber: 550,
      columnNumber: 9
    }
  }, map(children, function (_child, index) {
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("li", {
      key: index,
      className: index === renderedActiveIndex ? 'active' : undefined,
      onClick: indicatorOnClicks ? indicatorOnClicks[index] : undefined,
      __self: _this,
      __source: {
        fileName: Carousel_jsxFileName,
        lineNumber: 552,
        columnNumber: 13
      }
    });
  })), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
    className: prefix + "-inner",
    __self: this,
    __source: {
      fileName: Carousel_jsxFileName,
      lineNumber: 561,
      columnNumber: 7
    }
  }, map(children, function (child, index) {
    var isActive = index === renderedActiveIndex;
    return slide ? /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(esm_Transition, {
      in: isActive,
      onEnter: isActive ? handleEnter : undefined,
      onEntered: isActive ? handleEntered : undefined,
      addEndListener: transitionEndListener,
      __self: _this,
      __source: {
        fileName: Carousel_jsxFileName,
        lineNumber: 566,
        columnNumber: 13
      }
    }, function (status) {
      return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(child, {
        className: classnames_default()(child.props.className, isActive && status !== 'entered' && orderClassName, (status === 'entered' || status === 'exiting') && 'active', (status === 'entering' || status === 'exiting') && directionalClassName)
      });
    }) : /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(child, {
      className: classnames_default()(child.props.className, isActive && 'active')
    });
  })), controls && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Fragment, null, (wrap || activeIndex !== 0) && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SafeAnchor, {
    className: prefix + "-control-prev",
    onClick: prev,
    __self: this,
    __source: {
      fileName: Carousel_jsxFileName,
      lineNumber: 598,
      columnNumber: 13
    }
  }, prevIcon, prevLabel && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
    className: "sr-only",
    __self: this,
    __source: {
      fileName: Carousel_jsxFileName,
      lineNumber: 600,
      columnNumber: 29
    }
  }, prevLabel)), (wrap || activeIndex !== numChildren - 1) && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SafeAnchor, {
    className: prefix + "-control-next",
    onClick: next,
    __self: this,
    __source: {
      fileName: Carousel_jsxFileName,
      lineNumber: 604,
      columnNumber: 13
    }
  }, nextIcon, nextLabel && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
    className: "sr-only",
    __self: this,
    __source: {
      fileName: Carousel_jsxFileName,
      lineNumber: 606,
      columnNumber: 29
    }
  }, nextLabel))));
}

var Carousel = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(CarouselFunc);
Carousel.displayName = 'Carousel';
Carousel.propTypes = Carousel_propTypes;
Carousel.defaultProps = Carousel_defaultProps;
Carousel.Caption = CarouselCaption;
Carousel.Item = src_CarouselItem;
/* harmony default export */ const src_Carousel = (Carousel);
;// CONCATENATED MODULE: ./src/Col.tsx


var Col_excluded = ["bsPrefix", "className", "as"];

var Col_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Col.tsx",
    Col_this = undefined;





var DEVICE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs'];
var colSize = prop_types_default().oneOfType([(prop_types_default()).bool, (prop_types_default()).number, (prop_types_default()).string, prop_types_default().oneOf(['auto'])]);
var stringOrNumber = prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string]);
var column = prop_types_default().oneOfType([colSize, prop_types_default().shape({
  size: colSize,
  order: stringOrNumber,
  offset: stringOrNumber
})]);
var Col_propTypes = {
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
  xl: column
};
var Col = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Col_excluded);

  var prefix = useBootstrapPrefix(bsPrefix, 'col');
  var spans = [];
  var classes = [];
  DEVICE_SIZES.forEach(function (brkPoint) {
    var propValue = props[brkPoint];
    delete props[brkPoint];
    var span;
    var offset;
    var order;

    if (typeof propValue === 'object' && propValue != null) {
      var _propValue$span = propValue.span;
      span = _propValue$span === void 0 ? true : _propValue$span;
      offset = propValue.offset;
      order = propValue.order;
    } else {
      span = propValue;
    }

    var infix = brkPoint !== 'xs' ? "-" + brkPoint : '';
    if (span) spans.push(span === true ? "" + prefix + infix : "" + prefix + infix + "-" + span);
    if (order != null) classes.push("order" + infix + "-" + order);
    if (offset != null) classes.push("offset" + infix + "-" + offset);
  });

  if (!spans.length) {
    spans.push(prefix); // plain 'col'
  }

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    ref: ref,
    className: classnames_default().apply(void 0, [className].concat(spans, classes)),
    __self: Col_this,
    __source: {
      fileName: Col_jsxFileName,
      lineNumber: 149,
      columnNumber: 7
    }
  }));
});
Col.displayName = 'Col';
Col.propTypes = Col_propTypes;
/* harmony default export */ const src_Col = (Col);
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/matches.js
var matchesImpl;
/**
 * Checks if a given element matches a selector.
 * 
 * @param node the element
 * @param selector the selector
 */

function matches(node, selector) {
  if (!matchesImpl) {
    var body = document.body;
    var nativeMatch = body.matches || body.matchesSelector || body.webkitMatchesSelector || body.mozMatchesSelector || body.msMatchesSelector;

    matchesImpl = function matchesImpl(n, s) {
      return nativeMatch.call(n, s);
    };
  }

  return matchesImpl(node, selector);
}
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

function useEventListener(eventTarget, event, listener, capture) {
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

  var documentTarget = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    return document;
  }, []);
  return useEventListener(documentTarget, event, handler, capture);
}
;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/DropdownContext.js

var DropdownContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(null);
/* harmony default export */ const esm_DropdownContext = (DropdownContext);
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
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
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
  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js



function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js







function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  dom_utils_getComputedStyle_getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = dom_utils_getComputedStyle_getComputedStyle(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

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
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/math.js
var math_max = Math.max;
var math_min = Math.min;
var round = Math.round;
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/within.js

function within(min, value, max) {
  return math_max(min, math_min(value, max));
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

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(round(x * dpr) / dpr) || 0,
    y: round(round(y * dpr) / dpr) || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets;

  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y;

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

      if (dom_utils_getComputedStyle_getComputedStyle(offsetParent).position !== 'static') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === enums_top) {
      sideY = bottom; // $FlowFixMe[prop-missing]

      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left) {
      sideX = right; // $FlowFixMe[prop-missing]

      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref4) {
  var state = _ref4.state,
      options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (false) { var transitionProperty; }

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
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



function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
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
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
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















function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
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

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
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


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = math_max(rect.top, accRect.top);
    accRect.right = math_min(rect.right, accRect.right);
    accRect.bottom = math_min(rect.bottom, accRect.bottom);
    accRect.left = math_max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split('-')[1];
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
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(referenceElement);
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
      name = _ref.name; // Offsets are the actual position the popper needs to have to be
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
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === 'y' ? enums_top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = popperOffsets[mainAxis] + overflow[mainSide];
    var max = popperOffsets[mainAxis] - overflow[altSide];
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
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

    if (checkMainAxis) {
      var preventedOffset = within(tether ? math_min(min, tetherMin) : min, offset, tether ? math_max(max, tetherMax) : max);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _mainSide = mainAxis === 'x' ? enums_top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var _preventedOffset = within(tether ? math_min(_min, tetherMin) : _min, _offset, tether ? math_max(_max, tetherMax) : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
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






 // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
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
      setOptions: function setOptions(options) {
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


;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/popper.js









 // For the common JS build we will turn this file into a bundle with no imports.
// This is b/c the Popper lib is all esm files, and would break in a common js only environment

var popper_createPopper = popperGenerator({
  defaultModifiers: [modifiers_hide, modifiers_popperOffsets, modifiers_computeStyles, eventListeners, modifiers_offset, modifiers_flip, modifiers_preventOverflow, modifiers_arrow]
});

;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/usePopper.js






var initialPopperStyles = function initialPopperStyles(position) {
  return {
    position: position,
    top: '0',
    left: '0',
    opacity: '0',
    pointerEvents: 'none'
  };
};

var disabledApplyStylesModifier = {
  name: 'applyStyles',
  enabled: false
}; // until docjs supports type exports...

var ariaDescribedByModifier = {
  name: 'ariaDescribedBy',
  enabled: true,
  phase: 'afterWrite',
  effect: function effect(_ref) {
    var state = _ref.state;
    return function () {
      var _state$elements = state.elements,
          reference = _state$elements.reference,
          popper = _state$elements.popper;

      if ('removeAttribute' in reference) {
        var ids = (reference.getAttribute('aria-describedby') || '').split(',').filter(function (id) {
          return id.trim() !== popper.id;
        });
        if (!ids.length) reference.removeAttribute('aria-describedby');else reference.setAttribute('aria-describedby', ids.join(','));
      }
    };
  },
  fn: function fn(_ref2) {
    var _popper$getAttribute;

    var state = _ref2.state;
    var _state$elements2 = state.elements,
        popper = _state$elements2.popper,
        reference = _state$elements2.reference;
    var role = (_popper$getAttribute = popper.getAttribute('role')) == null ? void 0 : _popper$getAttribute.toLowerCase();

    if (popper.id && role === 'tooltip' && 'setAttribute' in reference) {
      var ids = reference.getAttribute('aria-describedby');

      if (ids && ids.split(',').indexOf(popper.id) !== -1) {
        return;
      }

      reference.setAttribute('aria-describedby', ids ? ids + "," + popper.id : popper.id);
    }
  }
};
var EMPTY_MODIFIERS = [];
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
 * @param {boolean=}    options.eventsEnabled have Popper listen on window resize events to reposition the element
 * @param {function=}   options.onCreate called when the popper is created
 * @param {function=}   options.onUpdate called when the popper is updated
 *
 * @returns {UsePopperState} The popper state
 */

function usePopper(referenceElement, popperElement, _temp) {
  var _ref3 = _temp === void 0 ? {} : _temp,
      _ref3$enabled = _ref3.enabled,
      enabled = _ref3$enabled === void 0 ? true : _ref3$enabled,
      _ref3$placement = _ref3.placement,
      placement = _ref3$placement === void 0 ? 'bottom' : _ref3$placement,
      _ref3$strategy = _ref3.strategy,
      strategy = _ref3$strategy === void 0 ? 'absolute' : _ref3$strategy,
      _ref3$modifiers = _ref3.modifiers,
      modifiers = _ref3$modifiers === void 0 ? EMPTY_MODIFIERS : _ref3$modifiers,
      config = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref3, ["enabled", "placement", "strategy", "modifiers"]);

  var popperInstanceRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)();
  var update = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    var _popperInstanceRef$cu;

    (_popperInstanceRef$cu = popperInstanceRef.current) == null ? void 0 : _popperInstanceRef$cu.update();
  }, []);
  var forceUpdate = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    var _popperInstanceRef$cu2;

    (_popperInstanceRef$cu2 = popperInstanceRef.current) == null ? void 0 : _popperInstanceRef$cu2.forceUpdate();
  }, []);

  var _useSafeState = esm_useSafeState((0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)({
    placement: placement,
    update: update,
    forceUpdate: forceUpdate,
    attributes: {},
    styles: {
      popper: initialPopperStyles(strategy),
      arrow: {}
    }
  })),
      popperState = _useSafeState[0],
      setState = _useSafeState[1];

  var updateModifier = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return {
      name: 'updateStateModifier',
      enabled: true,
      phase: 'write',
      requires: ['computeStyles'],
      fn: function fn(_ref4) {
        var state = _ref4.state;
        var styles = {};
        var attributes = {};
        Object.keys(state.elements).forEach(function (element) {
          styles[element] = state.styles[element];
          attributes[element] = state.attributes[element];
        });
        setState({
          state: state,
          styles: styles,
          attributes: attributes,
          update: update,
          forceUpdate: forceUpdate,
          placement: state.placement
        });
      }
    };
  }, [update, forceUpdate, setState]);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (!popperInstanceRef.current || !enabled) return;
    popperInstanceRef.current.setOptions({
      placement: placement,
      strategy: strategy,
      modifiers: [].concat(modifiers, [updateModifier, disabledApplyStylesModifier])
    }); // intentionally NOT re-running on new modifiers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strategy, placement, updateModifier, enabled]);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (!enabled || referenceElement == null || popperElement == null) {
      return undefined;
    }

    popperInstanceRef.current = popper_createPopper(referenceElement, popperElement, extends_extends({}, config, {
      placement: placement,
      strategy: strategy,
      modifiers: [].concat(modifiers, [ariaDescribedByModifier, updateModifier])
    }));
    return function () {
      if (popperInstanceRef.current != null) {
        popperInstanceRef.current.destroy();
        popperInstanceRef.current = undefined;
        setState(function (s) {
          return extends_extends({}, s, {
            attributes: {},
            styles: {
              popper: initialPopperStyles(strategy)
            }
          });
        });
      }
    }; // This is only run once to _create_ the popper
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
;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/safeFindDOMNode.js

function safeFindDOMNode(componentOrElement) {
  if (componentOrElement && 'setState' in componentOrElement) {
    return external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().findDOMNode(componentOrElement);
  }

  return componentOrElement != null ? componentOrElement : null;
}
;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/ownerDocument.js


/* harmony default export */ const esm_ownerDocument = (function (componentOrElement) {
  return ownerDocument(safeFindDOMNode(componentOrElement));
});
;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/useRootClose.js






var escapeKeyCode = 27;

var useRootClose_noop = function noop() {};

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

var getRefTarget = function getRefTarget(ref) {
  return ref && ('current' in ref ? ref.current : ref);
};
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


function useRootClose(ref, onRootClose, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      disabled = _ref.disabled,
      _ref$clickTrigger = _ref.clickTrigger,
      clickTrigger = _ref$clickTrigger === void 0 ? 'click' : _ref$clickTrigger;

  var preventMouseRootCloseRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(false);
  var onClose = onRootClose || useRootClose_noop;
  var handleMouseCapture = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (e) {
    var currentTarget = getRefTarget(ref);
    warning_default()(!!currentTarget, 'RootClose captured a close event but does not have a ref to compare it to. ' + 'useRootClose(), should be passed a ref that resolves to a DOM node');
    preventMouseRootCloseRef.current = !currentTarget || isModifiedEvent(e) || !isLeftClickEvent(e) || !!contains_contains(currentTarget, e.target);
  }, [ref]);
  var handleMouse = useEventCallback(function (e) {
    if (!preventMouseRootCloseRef.current) {
      onClose(e);
    }
  });
  var handleKeyUp = useEventCallback(function (e) {
    if (e.keyCode === escapeKeyCode) {
      onClose(e);
    }
  });
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (disabled || ref == null) return undefined; // Store the current event to avoid triggering handlers immediately
    // https://github.com/facebook/react/issues/20074

    var currentEvent = window.event;
    var doc = esm_ownerDocument(getRefTarget(ref)); // Use capture for this listener so it fires before React's listener, to
    // avoid false positives in the contains() check below if the target DOM
    // element is removed in the React mouse callback.

    var removeMouseCaptureListener = esm_listen(doc, clickTrigger, handleMouseCapture, true);
    var removeMouseListener = esm_listen(doc, clickTrigger, function (e) {
      // skip if this event is the same as the one running when we added the handlers
      if (e === currentEvent) {
        currentEvent = undefined;
        return;
      }

      handleMouse(e);
    });
    var removeKeyupListener = esm_listen(doc, 'keyup', function (e) {
      // skip if this event is the same as the one running when we added the handlers
      if (e === currentEvent) {
        currentEvent = undefined;
        return;
      }

      handleKeyUp(e);
    });
    var mobileSafariHackListeners = [];

    if ('ontouchstart' in doc.documentElement) {
      mobileSafariHackListeners = [].slice.call(doc.body.children).map(function (el) {
        return esm_listen(el, 'mousemove', useRootClose_noop);
      });
    }

    return function () {
      removeMouseCaptureListener();
      removeMouseListener();
      removeKeyupListener();
      mobileSafariHackListeners.forEach(function (remove) {
        return remove();
      });
    };
  }, [ref, disabled, clickTrigger, handleMouseCapture, handleMouse, handleKeyUp]);
}

/* harmony default export */ const esm_useRootClose = (useRootClose);
;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/mergeOptionsWithPopperConfig.js

function toModifierMap(modifiers) {
  var result = {};

  if (!Array.isArray(modifiers)) {
    return modifiers || result;
  } // eslint-disable-next-line no-unused-expressions


  modifiers == null ? void 0 : modifiers.forEach(function (m) {
    result[m.name] = m;
  });
  return result;
}
function toModifierArray(map) {
  if (map === void 0) {
    map = {};
  }

  if (Array.isArray(map)) return map;
  return Object.keys(map).map(function (k) {
    map[k].name = k;
    return map[k];
  });
}
function mergeOptionsWithPopperConfig(_ref) {
  var _modifiers$preventOve, _modifiers$preventOve2, _modifiers$offset, _modifiers$arrow;

  var enabled = _ref.enabled,
      enableEvents = _ref.enableEvents,
      placement = _ref.placement,
      flip = _ref.flip,
      offset = _ref.offset,
      fixed = _ref.fixed,
      containerPadding = _ref.containerPadding,
      arrowElement = _ref.arrowElement,
      _ref$popperConfig = _ref.popperConfig,
      popperConfig = _ref$popperConfig === void 0 ? {} : _ref$popperConfig;
  var modifiers = toModifierMap(popperConfig.modifiers);
  return extends_extends({}, popperConfig, {
    placement: placement,
    enabled: enabled,
    strategy: fixed ? 'fixed' : popperConfig.strategy,
    modifiers: toModifierArray(extends_extends({}, modifiers, {
      eventListeners: {
        enabled: enableEvents
      },
      preventOverflow: extends_extends({}, modifiers.preventOverflow, {
        options: containerPadding ? extends_extends({
          padding: containerPadding
        }, (_modifiers$preventOve = modifiers.preventOverflow) == null ? void 0 : _modifiers$preventOve.options) : (_modifiers$preventOve2 = modifiers.preventOverflow) == null ? void 0 : _modifiers$preventOve2.options
      }),
      offset: {
        options: extends_extends({
          offset: offset
        }, (_modifiers$offset = modifiers.offset) == null ? void 0 : _modifiers$offset.options)
      },
      arrow: extends_extends({}, modifiers.arrow, {
        enabled: !!arrowElement,
        options: extends_extends({}, (_modifiers$arrow = modifiers.arrow) == null ? void 0 : _modifiers$arrow.options, {
          element: arrowElement
        })
      }),
      flip: extends_extends({
        enabled: !!flip
      }, modifiers.flip)
    }))
  });
}
;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/DropdownMenu.js










var DropdownMenu_noop = function noop() {};
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


function useDropdownMenu(options) {
  if (options === void 0) {
    options = {};
  }

  var context = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(esm_DropdownContext);

  var _useCallbackRef = useCallbackRef(),
      arrowElement = _useCallbackRef[0],
      attachArrowRef = _useCallbackRef[1];

  var hasShownRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(false);
  var _options = options,
      flip = _options.flip,
      offset = _options.offset,
      rootCloseEvent = _options.rootCloseEvent,
      _options$fixed = _options.fixed,
      fixed = _options$fixed === void 0 ? false : _options$fixed,
      _options$popperConfig = _options.popperConfig,
      popperConfig = _options$popperConfig === void 0 ? {} : _options$popperConfig,
      _options$usePopper = _options.usePopper,
      shouldUsePopper = _options$usePopper === void 0 ? !!context : _options$usePopper;
  var show = (context == null ? void 0 : context.show) == null ? !!options.show : context.show;
  var alignEnd = (context == null ? void 0 : context.alignEnd) == null ? options.alignEnd : context.alignEnd;

  if (show && !hasShownRef.current) {
    hasShownRef.current = true;
  }

  var handleClose = function handleClose(e) {
    context == null ? void 0 : context.toggle(false, e);
  };

  var _ref = context || {},
      drop = _ref.drop,
      setMenu = _ref.setMenu,
      menuElement = _ref.menuElement,
      toggleElement = _ref.toggleElement;

  var placement = alignEnd ? 'bottom-end' : 'bottom-start';
  if (drop === 'up') placement = alignEnd ? 'top-end' : 'top-start';else if (drop === 'right') placement = alignEnd ? 'right-end' : 'right-start';else if (drop === 'left') placement = alignEnd ? 'left-end' : 'left-start';
  var popper = esm_usePopper(toggleElement, menuElement, mergeOptionsWithPopperConfig({
    placement: placement,
    enabled: !!(shouldUsePopper && show),
    enableEvents: show,
    offset: offset,
    flip: flip,
    fixed: fixed,
    arrowElement: arrowElement,
    popperConfig: popperConfig
  }));

  var menuProps = extends_extends({
    ref: setMenu || DropdownMenu_noop,
    'aria-labelledby': toggleElement == null ? void 0 : toggleElement.id
  }, popper.attributes.popper, {
    style: popper.styles.popper
  });

  var metadata = {
    show: show,
    alignEnd: alignEnd,
    hasShown: hasShownRef.current,
    toggle: context == null ? void 0 : context.toggle,
    popper: shouldUsePopper ? popper : null,
    arrowProps: shouldUsePopper ? extends_extends({
      ref: attachArrowRef
    }, popper.attributes.arrow, {
      style: popper.styles.arrow
    }) : {}
  };
  esm_useRootClose(menuElement, handleClose, {
    clickTrigger: rootCloseEvent,
    disabled: !show
  });
  return [menuProps, metadata];
}
var DropdownMenu_propTypes = {
  /**
   * A render prop that returns a Menu element. The `props`
   * argument should spread through to **a component that can accept a ref**.
   *
   * @type {Function ({
   *   show: boolean,
   *   alignEnd: boolean,
   *   close: (?SyntheticEvent) => void,
   *   placement: Placement,
   *   update: () => void,
   *   forceUpdate: () => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     aria-labelledby: ?string
   *   },
   *   arrowProps: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *   },
   * }) => React.Element}
   */
  children: (prop_types_default()).func.isRequired,

  /**
   * Controls the visible state of the menu, generally this is
   * provided by the parent `Dropdown` component,
   * but may also be specified as a prop directly.
   */
  show: (prop_types_default()).bool,

  /**
   * Aligns the dropdown menu to the 'end' of it's placement position.
   * Generally this is provided by the parent `Dropdown` component,
   * but may also be specified as a prop directly.
   */
  alignEnd: (prop_types_default()).bool,

  /**
   * Enables the Popper.js `flip` modifier, allowing the Dropdown to
   * automatically adjust it's placement in case of overlap with the viewport or toggle.
   * Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
   */
  flip: (prop_types_default()).bool,
  usePopper: prop_types_default().oneOf([true, false]),

  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig: (prop_types_default()).object,

  /**
   * Override the default event used by RootCloseWrapper.
   */
  rootCloseEvent: (prop_types_default()).string
};
var DropdownMenu_defaultProps = {
  usePopper: true
};
/**
 * Also exported as `<Dropdown.Menu>` from `Dropdown`.
 *
 * @displayName DropdownMenu
 * @memberOf Dropdown
 */

function DropdownMenu(_ref2) {
  var children = _ref2.children,
      options = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref2, ["children"]);

  var _useDropdownMenu = useDropdownMenu(options),
      props = _useDropdownMenu[0],
      meta = _useDropdownMenu[1];

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Fragment, null, meta.hasShown ? children(props, meta) : null);
}

DropdownMenu.displayName = 'ReactOverlaysDropdownMenu';
DropdownMenu.propTypes = DropdownMenu_propTypes;
DropdownMenu.defaultProps = DropdownMenu_defaultProps;
/** @component */

/* harmony default export */ const esm_DropdownMenu = (DropdownMenu);
;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/DropdownToggle.js




var DropdownToggle_noop = function noop() {};
/**
 * Wires up Dropdown toggle functionality, returning a set a props to attach
 * to the element that functions as the dropdown toggle (generally a button).
 *
 * @memberOf Dropdown
 */


function useDropdownToggle() {
  var _ref = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(esm_DropdownContext) || {},
      _ref$show = _ref.show,
      show = _ref$show === void 0 ? false : _ref$show,
      _ref$toggle = _ref.toggle,
      toggle = _ref$toggle === void 0 ? DropdownToggle_noop : _ref$toggle,
      setToggle = _ref.setToggle;

  var handleClick = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (e) {
    toggle(!show, e);
  }, [show, toggle]);
  return [{
    ref: setToggle || DropdownToggle_noop,
    onClick: handleClick,
    'aria-haspopup': true,
    'aria-expanded': !!show
  }, {
    show: show,
    toggle: toggle
  }];
}
var DropdownToggle_propTypes = {
  /**
   * A render prop that returns a Toggle element. The `props`
   * argument should spread through to **a component that can accept a ref**. Use
   * the `onToggle` argument to toggle the menu open or closed
   *
   * @type {Function ({
   *   show: boolean,
   *   toggle: (show: boolean) => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     aria-haspopup: true
   *     aria-expanded: boolean
   *   },
   * }) => React.Element}
   */
  children: (prop_types_default()).func.isRequired
};
/**
 * Also exported as `<Dropdown.Toggle>` from `Dropdown`.
 *
 * @displayName DropdownToggle
 * @memberOf Dropdown
 */

function DropdownToggle(_ref2) {
  var children = _ref2.children;

  var _useDropdownToggle = useDropdownToggle(),
      props = _useDropdownToggle[0],
      meta = _useDropdownToggle[1];

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Fragment, null, children(props, meta));
}

DropdownToggle.displayName = 'ReactOverlaysDropdownToggle';
DropdownToggle.propTypes = DropdownToggle_propTypes;
/** @component */

/* harmony default export */ const esm_DropdownToggle = (DropdownToggle);
;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/Dropdown.js













var Dropdown_propTypes = {
  /**
   * A render prop that returns the root dropdown element. The `props`
   * argument should spread through to an element containing _both_ the
   * menu and toggle in order to handle keyboard events for focus management.
   *
   * @type {Function ({
   *   props: {
   *     onKeyDown: (SyntheticEvent) => void,
   *   },
   * }) => React.Element}
   */
  children: (prop_types_default()).node,

  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   */
  drop: prop_types_default().oneOf(['up', 'left', 'right', 'down']),

  /**
   * Controls the focus behavior for when the Dropdown is opened. Set to
   * `true` to always focus the first menu item, `keyboard` to focus only when
   * navigating via the keyboard, or `false` to disable completely
   *
   * The Default behavior is `false` **unless** the Menu has a `role="menu"`
   * where it will default to `keyboard` to match the recommended [ARIA Authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton).
   */
  focusFirstItemOnShow: prop_types_default().oneOf([false, true, 'keyboard']),

  /**
   * A css slector string that will return __focusable__ menu items.
   * Selectors should be relative to the menu component:
   * e.g. ` > li:not('.disabled')`
   */
  itemSelector: (prop_types_default()).string,

  /**
   * Align the menu to the 'end' side of the placement side of the Dropdown toggle. The default placement is `top-start` or `bottom-start`.
   */
  alignEnd: (prop_types_default()).bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  show: (prop_types_default()).bool,

  /**
   * Sets the initial show position of the Dropdown.
   */
  defaultShow: (prop_types_default()).bool,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `show` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```ts static
   * function(
   *   isOpen: boolean,
   *   event: SyntheticEvent,
   * ): void
   * ```
   *
   * @controllable show
   */
  onToggle: (prop_types_default()).func
};

function useRefWithUpdate() {
  var forceUpdate = useForceUpdate();
  var ref = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  var attachRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (element) {
    ref.current = element; // ensure that a menu set triggers an update for consumers

    forceUpdate();
  }, [forceUpdate]);
  return [ref, attachRef];
}
/**
 * @displayName Dropdown
 * @public
 */


function Dropdown(_ref) {
  var drop = _ref.drop,
      alignEnd = _ref.alignEnd,
      defaultShow = _ref.defaultShow,
      rawShow = _ref.show,
      rawOnToggle = _ref.onToggle,
      _ref$itemSelector = _ref.itemSelector,
      itemSelector = _ref$itemSelector === void 0 ? '* > *' : _ref$itemSelector,
      focusFirstItemOnShow = _ref.focusFirstItemOnShow,
      children = _ref.children;

  var _useUncontrolledProp = useUncontrolledProp(rawShow, defaultShow, rawOnToggle),
      show = _useUncontrolledProp[0],
      onToggle = _useUncontrolledProp[1]; // We use normal refs instead of useCallbackRef in order to populate the
  // the value as quickly as possible, otherwise the effect to focus the element
  // may run before the state value is set


  var _useRefWithUpdate = useRefWithUpdate(),
      menuRef = _useRefWithUpdate[0],
      setMenu = _useRefWithUpdate[1];

  var menuElement = menuRef.current;

  var _useRefWithUpdate2 = useRefWithUpdate(),
      toggleRef = _useRefWithUpdate2[0],
      setToggle = _useRefWithUpdate2[1];

  var toggleElement = toggleRef.current;
  var lastShow = usePrevious(show);
  var lastSourceEvent = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  var focusInDropdown = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(false);
  var toggle = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (nextShow, event) {
    onToggle(nextShow, event);
  }, [onToggle]);
  var context = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return {
      toggle: toggle,
      drop: drop,
      show: show,
      alignEnd: alignEnd,
      menuElement: menuElement,
      toggleElement: toggleElement,
      setMenu: setMenu,
      setToggle: setToggle
    };
  }, [toggle, drop, show, alignEnd, menuElement, toggleElement, setMenu, setToggle]);

  if (menuElement && lastShow && !show) {
    focusInDropdown.current = menuElement.contains(document.activeElement);
  }

  var focusToggle = useEventCallback(function () {
    if (toggleElement && toggleElement.focus) {
      toggleElement.focus();
    }
  });
  var maybeFocusFirst = useEventCallback(function () {
    var type = lastSourceEvent.current;
    var focusType = focusFirstItemOnShow;

    if (focusType == null) {
      focusType = menuRef.current && matches(menuRef.current, '[role=menu]') ? 'keyboard' : false;
    }

    if (focusType === false || focusType === 'keyboard' && !/^key.+$/.test(type)) {
      return;
    }

    var first = qsa(menuRef.current, itemSelector)[0];
    if (first && first.focus) first.focus();
  });
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (show) maybeFocusFirst();else if (focusInDropdown.current) {
      focusInDropdown.current = false;
      focusToggle();
    } // only `show` should be changing
  }, [show, focusInDropdown, focusToggle, maybeFocusFirst]);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    lastSourceEvent.current = null;
  });

  var getNextFocusedChild = function getNextFocusedChild(current, offset) {
    if (!menuRef.current) return null;
    var items = qsa(menuRef.current, itemSelector);
    var index = items.indexOf(current) + offset;
    index = Math.max(0, Math.min(index, items.length));
    return items[index];
  };

  useGlobalListener('keydown', function (event) {
    var _menuRef$current, _toggleRef$current;

    var key = event.key;
    var target = event.target;
    var fromMenu = (_menuRef$current = menuRef.current) == null ? void 0 : _menuRef$current.contains(target);
    var fromToggle = (_toggleRef$current = toggleRef.current) == null ? void 0 : _toggleRef$current.contains(target); // Second only to https://github.com/twbs/bootstrap/blob/8cfbf6933b8a0146ac3fbc369f19e520bd1ebdac/js/src/dropdown.js#L400
    // in inscrutability

    var isInput = /input|textarea/i.test(target.tagName);

    if (isInput && (key === ' ' || key !== 'Escape' && fromMenu)) {
      return;
    }

    if (!fromMenu && !fromToggle) {
      return;
    }

    if (!menuRef.current && key === 'Tab') {
      return;
    }

    lastSourceEvent.current = event.type;

    switch (key) {
      case 'ArrowUp':
        {
          var next = getNextFocusedChild(target, -1);
          if (next && next.focus) next.focus();
          event.preventDefault();
          return;
        }

      case 'ArrowDown':
        event.preventDefault();

        if (!show) {
          onToggle(true, event);
        } else {
          var _next = getNextFocusedChild(target, 1);

          if (_next && _next.focus) _next.focus();
        }

        return;

      case 'Tab':
        // on keydown the target is the element being tabbed FROM, we need that
        // to know if this event is relevant to this dropdown (e.g. in this menu).
        // On `keyup` the target is the element being tagged TO which we use to check
        // if focus has left the menu
        esm_addEventListener(document, 'keyup', function (e) {
          var _menuRef$current2;

          if (e.key === 'Tab' && !e.target || !((_menuRef$current2 = menuRef.current) != null && _menuRef$current2.contains(e.target))) {
            onToggle(false, event);
          }
        }, {
          once: true
        });
        break;

      case 'Escape':
        event.preventDefault();
        event.stopPropagation();
        onToggle(false, event);
        break;

      default:
    }
  });
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(esm_DropdownContext.Provider, {
    value: context
  }, children);
}

Dropdown.displayName = 'ReactOverlaysDropdown';
Dropdown.propTypes = Dropdown_propTypes;
Dropdown.Menu = esm_DropdownMenu;
Dropdown.Toggle = esm_DropdownToggle;
/* harmony default export */ const esm_Dropdown = (Dropdown);
;// CONCATENATED MODULE: ./src/NavContext.tsx
 // TODO: check this

var NavContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(null);
NavContext.displayName = 'NavContext';
/* harmony default export */ const src_NavContext = (NavContext);
;// CONCATENATED MODULE: ./src/DropdownItem.tsx


var DropdownItem_excluded = ["bsPrefix", "className", "children", "eventKey", "disabled", "href", "onClick", "onSelect", "active", "as"];

var DropdownItem_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/DropdownItem.tsx",
    DropdownItem_this = undefined;









var DropdownItem_propTypes = {
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

  /**
   * Callback fired when the menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: (prop_types_default()).func,
  as: (prop_types_default()).elementType
};
var DropdownItem_defaultProps = {
  as: src_SafeAnchor,
  disabled: false
};
var DropdownItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      eventKey = _ref.eventKey,
      disabled = _ref.disabled,
      href = _ref.href,
      onClick = _ref.onClick,
      onSelect = _ref.onSelect,
      propActive = _ref.active,
      Component = _ref.as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, DropdownItem_excluded);

  var prefix = useBootstrapPrefix(bsPrefix, 'dropdown-item');
  var onSelectCtx = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_SelectableContext);
  var navContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_NavContext);

  var _ref2 = navContext || {},
      activeKey = _ref2.activeKey;

  var key = makeEventKey(eventKey, href);
  var active = propActive == null && key != null ? makeEventKey(activeKey) === key : propActive;
  var handleClick = useEventCallback(function (event) {
    // SafeAnchor handles the disabled case, but we handle it here
    // for other components
    if (disabled) return;
    if (onClick) onClick(event);
    if (onSelectCtx) onSelectCtx(key, event);
    if (onSelect) onSelect(key, event);
  });
  return (
    /*#__PURE__*/
    // "TS2604: JSX element type 'Component' does not have any construct or call signatures."
    // @ts-ignore
    external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
      ref: ref,
      href: href,
      disabled: disabled,
      className: classnames_default()(className, prefix, active && 'active', disabled && 'disabled'),
      onClick: handleClick,
      __self: DropdownItem_this,
      __source: {
        fileName: DropdownItem_jsxFileName,
        lineNumber: 119,
        columnNumber: 7
      }
    }), children)
  );
});
DropdownItem.displayName = 'DropdownItem';
DropdownItem.propTypes = DropdownItem_propTypes;
DropdownItem.defaultProps = DropdownItem_defaultProps;
/* harmony default export */ const src_DropdownItem = (DropdownItem);
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
;// CONCATENATED MODULE: ./src/NavbarContext.tsx
 // TODO: check

var NavbarContext_context = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(null);
NavbarContext_context.displayName = 'NavbarContext';
/* harmony default export */ const NavbarContext = (NavbarContext_context);
;// CONCATENATED MODULE: ./src/useWrappedRefWithWarning.tsx



function useWrappedRefWithWarning(ref, componentName) {
  // @ts-ignore
  if (true) return ref; // eslint-disable-next-line react-hooks/rules-of-hooks

  var warningRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (refValue) {
    !(refValue == null || !refValue.isReactComponent) ?  false ? 0 : browser_default()(false) : void 0;
  }, [componentName]); // eslint-disable-next-line react-hooks/rules-of-hooks

  return esm_useMergedRefs(warningRef, ref);
}
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
;// CONCATENATED MODULE: ./src/usePopperMarginModifiers.tsx




function getMargins(element) {
  var styles = window.getComputedStyle(element);
  var top = parseFloat(styles.marginTop) || 0;
  var right = parseFloat(styles.marginRight) || 0;
  var bottom = parseFloat(styles.marginBottom) || 0;
  var left = parseFloat(styles.marginLeft) || 0;
  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left
  };
}

function usePopperMarginModifiers() {
  var overlayRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  var margins = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  var arrowMargins = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  var popoverClass = useBootstrapPrefix(undefined, 'popover');
  var dropdownMenuClass = useBootstrapPrefix(undefined, 'dropdown-menu');
  var callback = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (overlay) {
    if (!overlay || !(hasClass(overlay, popoverClass) || hasClass(overlay, dropdownMenuClass))) return;
    margins.current = getMargins(overlay);
    overlay.style.margin = '0';
    overlayRef.current = overlay;
  }, [popoverClass, dropdownMenuClass]);
  var offset = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return {
      name: 'offset',
      options: {
        offset: function offset(_ref) {
          var placement = _ref.placement;
          if (!margins.current) return [0, 0];
          var _margins$current = margins.current,
              top = _margins$current.top,
              left = _margins$current.left,
              bottom = _margins$current.bottom,
              right = _margins$current.right;

          switch (placement.split('-')[0]) {
            case 'top':
              return [0, bottom];

            case 'left':
              return [0, right];

            case 'bottom':
              return [0, top];

            case 'right':
              return [0, left];

            default:
              return [0, 0];
          }
        }
      }
    };
  }, [margins]);
  var arrow = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return {
      name: 'arrow',
      options: {
        padding: function padding() {
          // The options here are used for Popper 2.8.4 and up.
          // For earlier version, padding is handled in popoverArrowMargins below.
          if (!arrowMargins.current) {
            return 0;
          }

          var _arrowMargins$current = arrowMargins.current,
              top = _arrowMargins$current.top,
              right = _arrowMargins$current.right;
          var padding = top || right;
          return {
            top: padding,
            left: padding,
            right: padding,
            bottom: padding
          };
        }
      }
    };
  }, [arrowMargins]); // Converts popover arrow margin to arrow modifier padding

  var popoverArrowMargins = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return {
      name: 'popoverArrowMargins',
      enabled: true,
      phase: 'main',
      fn: function fn() {
        return undefined;
      },
      requiresIfExists: ['arrow'],
      effect: function effect(_ref2) {
        var state = _ref2.state;

        if (!overlayRef.current || !state.elements.arrow || !hasClass(overlayRef.current, popoverClass)) {
          return undefined;
        }

        if (state.modifiersData['arrow#persistent']) {
          // @popperjs/core <= 2.8.3 uses arrow#persistent to pass padding to arrow modifier.
          var _getMargins = getMargins(state.elements.arrow),
              top = _getMargins.top,
              right = _getMargins.right;

          var padding = top || right;
          state.modifiersData['arrow#persistent'].padding = {
            top: padding,
            left: padding,
            right: padding,
            bottom: padding
          };
        } else {
          // @popperjs/core >= 2.8.4 gets the padding from the arrow modifier options,
          // so we'll get the margins here, and let the arrow modifier above pass
          // it to popper.
          arrowMargins.current = getMargins(state.elements.arrow);
        }

        state.elements.arrow.style.margin = '0';
        return function () {
          if (state.elements.arrow) state.elements.arrow.style.margin = '';
        };
      }
    };
  }, [popoverClass]);
  return [callback, [offset, arrow, popoverArrowMargins]];
}
;// CONCATENATED MODULE: ./src/DropdownMenu.tsx


var DropdownMenu_excluded = ["bsPrefix", "className", "align", "alignRight", "rootCloseEvent", "flip", "show", "renderOnMount", "as", "popperConfig"];

var DropdownMenu_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/DropdownMenu.tsx",
    DropdownMenu_this = undefined;











var alignDirection = prop_types_default().oneOf(['left', 'right']);
var alignPropType = prop_types_default().oneOfType([alignDirection, prop_types_default().shape({
  sm: alignDirection
}), prop_types_default().shape({
  md: alignDirection
}), prop_types_default().shape({
  lg: alignDirection
}), prop_types_default().shape({
  xl: alignDirection
})]);
var src_DropdownMenu_propTypes = {
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
   * @type {"left"|"right"|{ sm: "left"|"right" }|{ md: "left"|"right" }|{ lg: "left"|"right" }|{ xl: "left"|"right"} }
   */
  align: alignPropType,

  /**
   * Aligns the Dropdown menu to the right of it's container.
   *
   * @deprecated Use align="right"
   */
  alignRight: (prop_types_default()).bool,
  onSelect: (prop_types_default()).func,

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
   * If providing a custom, non DOM, component. the `show`, `close` and `alignRight` props
   * are also injected and should be handled appropriately.
   */
  as: (prop_types_default()).elementType,

  /**
   * A set of popper options and props passed directly to Popper.
   */
  popperConfig: (prop_types_default()).object
};
var src_DropdownMenu_defaultProps = {
  align: 'left',
  alignRight: false,
  flip: true
};
var DropdownMenu_DropdownMenu = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      align = _ref.align,
      alignRight = _ref.alignRight,
      rootCloseEvent = _ref.rootCloseEvent,
      flip = _ref.flip,
      showProps = _ref.show,
      renderOnMount = _ref.renderOnMount,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      popperConfig = _ref.popperConfig,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, DropdownMenu_excluded);

  var isNavbar = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(NavbarContext);
  var prefix = useBootstrapPrefix(bsPrefix, 'dropdown-menu');

  var _usePopperMarginModif = usePopperMarginModifiers(),
      popperRef = _usePopperMarginModif[0],
      marginModifiers = _usePopperMarginModif[1];

  var alignClasses = [];

  if (align) {
    if (typeof align === 'object') {
      var keys = Object.keys(align);
       false ? 0 : void 0;

      if (keys.length) {
        var brkPoint = keys[0];
        var direction = align[brkPoint]; // .dropdown-menu-right is required for responsively aligning
        // left in addition to align left classes.
        // Reuse alignRight to toggle the class below.

        alignRight = direction === 'left';
        alignClasses.push(prefix + "-" + brkPoint + "-" + direction);
      }
    } else if (align === 'right') {
      alignRight = true;
    }
  }

  var _useDropdownMenu = useDropdownMenu({
    flip: flip,
    rootCloseEvent: rootCloseEvent,
    show: showProps,
    alignEnd: alignRight,
    usePopper: !isNavbar && alignClasses.length === 0,
    popperConfig: extends_extends({}, popperConfig, {
      modifiers: marginModifiers.concat((popperConfig == null ? void 0 : popperConfig.modifiers) || [])
    })
  }),
      menuProps = _useDropdownMenu[0],
      _useDropdownMenu$ = _useDropdownMenu[1],
      hasShown = _useDropdownMenu$.hasShown,
      popper = _useDropdownMenu$.popper,
      show = _useDropdownMenu$.show,
      alignEnd = _useDropdownMenu$.alignEnd,
      toggle = _useDropdownMenu$.toggle;

  menuProps.ref = esm_useMergedRefs(popperRef, esm_useMergedRefs(useWrappedRefWithWarning(ref, 'DropdownMenu'), menuProps.ref));
  if (!hasShown && !renderOnMount) return null; // For custom components provide additional, non-DOM, props;

  if (typeof Component !== 'string') {
    menuProps.show = show;

    menuProps.close = function () {
      return toggle == null ? void 0 : toggle(false);
    };

    menuProps.alignRight = alignEnd;
  }

  var style = props.style;

  if (popper != null && popper.placement) {
    // we don't need the default popper style,
    // menus are display: none when not shown.
    style = extends_extends({}, props.style, menuProps.style);
    props['x-placement'] = popper.placement;
  }

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, menuProps, {
    style: style,
    className: classnames_default().apply(void 0, [className, prefix, show && 'show', alignEnd && prefix + "-right"].concat(alignClasses)),
    __self: DropdownMenu_this,
    __source: {
      fileName: DropdownMenu_jsxFileName,
      lineNumber: 208,
      columnNumber: 7
    }
  }));
});
DropdownMenu_DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu_DropdownMenu.propTypes = src_DropdownMenu_propTypes;
DropdownMenu_DropdownMenu.defaultProps = src_DropdownMenu_defaultProps;
/* harmony default export */ const src_DropdownMenu = (DropdownMenu_DropdownMenu);
// EXTERNAL MODULE: ./node_modules/prop-types-extra/lib/isRequiredForA11y.js
var isRequiredForA11y = __webpack_require__(422);
var isRequiredForA11y_default = /*#__PURE__*/__webpack_require__.n(isRequiredForA11y);
;// CONCATENATED MODULE: ./src/DropdownToggle.tsx


var DropdownToggle_excluded = ["bsPrefix", "split", "className", "childBsPrefix", "as"];

var DropdownToggle_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/DropdownToggle.tsx",
    DropdownToggle_this = undefined;










var src_DropdownToggle_propTypes = {
  /**
   * @default 'dropdown-toggle'
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y_default()((prop_types_default()).any),
  split: (prop_types_default()).bool,
  as: (prop_types_default()).elementType,

  /**
   * to passthrough to the underlying button or whatever from DropdownButton
   * @private
   */
  childBsPrefix: (prop_types_default()).string
};
var DropdownToggle_DropdownToggle = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      split = _ref.split,
      className = _ref.className,
      childBsPrefix = _ref.childBsPrefix,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? src_Button : _ref$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, DropdownToggle_excluded);

  var prefix = useBootstrapPrefix(bsPrefix, 'dropdown-toggle');

  if (childBsPrefix !== undefined) {
    props.bsPrefix = childBsPrefix;
  }

  var _useDropdownToggle = useDropdownToggle(),
      toggleProps = _useDropdownToggle[0];

  toggleProps.ref = esm_useMergedRefs(toggleProps.ref, useWrappedRefWithWarning(ref, 'DropdownToggle')); // This intentionally forwards size and variant (if set) to the
  // underlying component, to allow it to render size and style variants.

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    className: classnames_default()(className, prefix, split && prefix + "-split")
  }, toggleProps, props, {
    __self: DropdownToggle_this,
    __source: {
      fileName: DropdownToggle_jsxFileName,
      lineNumber: 84,
      columnNumber: 7
    }
  }));
});
DropdownToggle_DropdownToggle.displayName = 'DropdownToggle';
DropdownToggle_DropdownToggle.propTypes = src_DropdownToggle_propTypes;
/* harmony default export */ const src_DropdownToggle = (DropdownToggle_DropdownToggle);
;// CONCATENATED MODULE: ./src/Dropdown.tsx


var Dropdown_excluded = ["bsPrefix", "drop", "show", "className", "alignRight", "onSelect", "onToggle", "focusFirstItemOnShow", "as", "navbar"];

var Dropdown_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Dropdown.tsx",
    Dropdown_this = undefined;













var DropdownHeader = createWithBsPrefix('dropdown-header', {
  defaultProps: {
    role: 'heading'
  }
});
var DropdownDivider = createWithBsPrefix('dropdown-divider', {
  defaultProps: {
    role: 'separator'
  }
});
var DropdownItemText = createWithBsPrefix('dropdown-item-text', {
  Component: 'span'
});
var src_Dropdown_propTypes = {
  /** @default 'dropdown' */
  bsPrefix: (prop_types_default()).string,

  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   */
  drop: prop_types_default().oneOf(['up', 'left', 'right', 'down']),
  as: (prop_types_default()).elementType,

  /**
   * Align the menu to the right side of the Dropdown toggle
   */
  alignRight: (prop_types_default()).bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  show: (prop_types_default()).bool,

  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   * Popper.js's flip [docs](https://popper.js.org/docs/v2/modifiers/flip/).
   *
   */
  flip: (prop_types_default()).bool,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `show` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(
   *   isOpen: boolean,
   *   event: SyntheticEvent,
   *   metadata: {
   *     source: 'select' | 'click' | 'rootClose' | 'keydown'
   *   }
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
  navbar: (prop_types_default()).bool
};
var Dropdown_defaultProps = {
  navbar: false
};
var Dropdown_Dropdown = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (pProps, ref) {
  var _useUncontrolled = useUncontrolled(pProps, {
    show: 'onToggle'
  }),
      bsPrefix = _useUncontrolled.bsPrefix,
      drop = _useUncontrolled.drop,
      show = _useUncontrolled.show,
      className = _useUncontrolled.className,
      alignRight = _useUncontrolled.alignRight,
      onSelect = _useUncontrolled.onSelect,
      onToggle = _useUncontrolled.onToggle,
      focusFirstItemOnShow = _useUncontrolled.focusFirstItemOnShow,
      _useUncontrolled$as = _useUncontrolled.as,
      Component = _useUncontrolled$as === void 0 ? 'div' : _useUncontrolled$as,
      _4 = _useUncontrolled.navbar,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_useUncontrolled, Dropdown_excluded);

  var onSelectCtx = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_SelectableContext);
  var prefix = useBootstrapPrefix(bsPrefix, 'dropdown');
  var handleToggle = useEventCallback(function (nextShow, event, source) {
    if (source === void 0) {
      source = event.type;
    }

    if (event.currentTarget === document && (source !== 'keydown' || event.key === 'Escape')) source = 'rootClose';

    if (onToggle) {
      onToggle(nextShow, event, {
        source: source
      });
    }
  });
  var handleSelect = useEventCallback(function (key, event) {
    if (onSelectCtx) onSelectCtx(key, event);
    if (onSelect) onSelect(key, event);
    handleToggle(false, event, 'select');
  });
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SelectableContext.Provider, {
    value: handleSelect,
    __self: Dropdown_this,
    __source: {
      fileName: Dropdown_jsxFileName,
      lineNumber: 166,
      columnNumber: 5
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(esm_Dropdown, {
    drop: drop,
    show: show,
    alignEnd: alignRight,
    onToggle: handleToggle,
    focusFirstItemOnShow: focusFirstItemOnShow,
    itemSelector: "." + prefix + "-item:not(.disabled):not(:disabled)",
    __self: Dropdown_this,
    __source: {
      fileName: Dropdown_jsxFileName,
      lineNumber: 167,
      columnNumber: 7
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    ref: ref,
    className: classnames_default()(className, show && 'show', (!drop || drop === 'down') && prefix, drop === 'up' && 'dropup', drop === 'right' && 'dropright', drop === 'left' && 'dropleft'),
    __self: Dropdown_this,
    __source: {
      fileName: Dropdown_jsxFileName,
      lineNumber: 175,
      columnNumber: 9
    }
  }))));
});
Dropdown_Dropdown.displayName = 'Dropdown';
Dropdown_Dropdown.propTypes = src_Dropdown_propTypes;
Dropdown_Dropdown.defaultProps = Dropdown_defaultProps;
Dropdown_Dropdown.Divider = DropdownDivider;
Dropdown_Dropdown.Header = DropdownHeader;
Dropdown_Dropdown.Item = src_DropdownItem;
Dropdown_Dropdown.ItemText = DropdownItemText;
Dropdown_Dropdown.Menu = src_DropdownMenu;
Dropdown_Dropdown.Toggle = src_DropdownToggle;
/* harmony default export */ const src_Dropdown = (Dropdown_Dropdown);
;// CONCATENATED MODULE: ./src/DropdownButton.tsx


var DropdownButton_excluded = ["title", "children", "bsPrefix", "rootCloseEvent", "variant", "size", "menuAlign", "menuRole", "renderMenuOnMount", "disabled", "href", "id"];

var DropdownButton_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/DropdownButton.tsx",
    DropdownButton_this = undefined;






var DropdownButton_propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: (prop_types_default()).any,

  /** An `href` passed to the Toggle component */
  href: (prop_types_default()).string,

  /** An `onClick` handler passed to the Toggle component */
  onClick: (prop_types_default()).func,

  /** The content of the non-toggle Button.  */
  title: (prop_types_default()).node.isRequired,

  /** Disables both Buttons  */
  disabled: (prop_types_default()).bool,

  /**
   * Aligns the dropdown menu responsively.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   *
   * @type {"left"|"right"|{ sm: "left"|"right" }|{ md: "left"|"right" }|{ lg: "left"|"right" }|{ xl: "left"|"right"} }
   */
  menuAlign: alignPropType,

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

var DropdownButton = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var title = _ref.title,
      children = _ref.children,
      bsPrefix = _ref.bsPrefix,
      rootCloseEvent = _ref.rootCloseEvent,
      variant = _ref.variant,
      size = _ref.size,
      menuAlign = _ref.menuAlign,
      menuRole = _ref.menuRole,
      renderMenuOnMount = _ref.renderMenuOnMount,
      disabled = _ref.disabled,
      href = _ref.href,
      id = _ref.id,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, DropdownButton_excluded);

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Dropdown, extends_extends({
    ref: ref
  }, props, {
    __self: DropdownButton_this,
    __source: {
      fileName: DropdownButton_jsxFileName,
      lineNumber: 110,
      columnNumber: 5
    }
  }), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_DropdownToggle, {
    id: id,
    href: href,
    size: size,
    variant: variant,
    disabled: disabled,
    childBsPrefix: bsPrefix,
    __self: DropdownButton_this,
    __source: {
      fileName: DropdownButton_jsxFileName,
      lineNumber: 111,
      columnNumber: 7
    }
  }, title), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_DropdownMenu, {
    align: menuAlign,
    role: menuRole,
    renderOnMount: renderMenuOnMount,
    rootCloseEvent: rootCloseEvent,
    __self: DropdownButton_this,
    __source: {
      fileName: DropdownButton_jsxFileName,
      lineNumber: 121,
      columnNumber: 7
    }
  }, children));
});
DropdownButton.displayName = 'DropdownButton';
DropdownButton.propTypes = DropdownButton_propTypes;
/* harmony default export */ const src_DropdownButton = (DropdownButton);
// EXTERNAL MODULE: ./node_modules/prop-types-extra/lib/all.js
var lib_all = __webpack_require__(946);
var all_default = /*#__PURE__*/__webpack_require__.n(lib_all);
;// CONCATENATED MODULE: ./src/Feedback.tsx


var Feedback_excluded = ["as", "className", "type", "tooltip"];

var Feedback_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Feedback.tsx",
    Feedback_this = undefined;




var Feedback_propTypes = {
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
var Feedback = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'valid' : _ref$type,
      _ref$tooltip = _ref.tooltip,
      tooltip = _ref$tooltip === void 0 ? false : _ref$tooltip,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Feedback_excluded);

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    ref: ref,
    className: classnames_default()(className, type + "-" + (tooltip ? 'tooltip' : 'feedback')),
    __self: Feedback_this,
    __source: {
      fileName: Feedback_jsxFileName,
      lineNumber: 41,
      columnNumber: 5
    }
  }));
});
Feedback.displayName = 'Feedback';
Feedback.propTypes = Feedback_propTypes;
/* harmony default export */ const src_Feedback = (Feedback);
;// CONCATENATED MODULE: ./src/FormContext.tsx
 // TODO

var FormContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext({
  controlId: undefined
});
/* harmony default export */ const src_FormContext = (FormContext);
;// CONCATENATED MODULE: ./src/FormCheckInput.tsx


var FormCheckInput_excluded = ["id", "bsPrefix", "bsCustomPrefix", "className", "type", "isValid", "isInvalid", "isStatic", "as"];

var FormCheckInput_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormCheckInput.tsx",
    FormCheckInput_this = undefined;






var FormCheckInput_propTypes = {
  /**
   * @default 'form-check-input'
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * A seperate bsPrefix used for custom controls
   *
   * @default 'custom-control'
   */
  bsCustomPrefix: (prop_types_default()).string,

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

  /**
   * A convenience prop shortcut for adding `position-static` to the input, for
   * correct styling when used without an FormCheckLabel
   */
  isStatic: (prop_types_default()).bool,

  /** Manually style the input as valid */
  isValid: (prop_types_default()).bool,

  /** Manually style the input as invalid */
  isInvalid: (prop_types_default()).bool
};
var FormCheckInput = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var id = _ref.id,
      bsPrefix = _ref.bsPrefix,
      bsCustomPrefix = _ref.bsCustomPrefix,
      className = _ref.className,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'checkbox' : _ref$type,
      _ref$isValid = _ref.isValid,
      isValid = _ref$isValid === void 0 ? false : _ref$isValid,
      _ref$isInvalid = _ref.isInvalid,
      isInvalid = _ref$isInvalid === void 0 ? false : _ref$isInvalid,
      isStatic = _ref.isStatic,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'input' : _ref$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, FormCheckInput_excluded);

  var _useContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_FormContext),
      controlId = _useContext.controlId,
      custom = _useContext.custom;

  var _ref2 = custom ? [bsCustomPrefix, 'custom-control-input'] : [bsPrefix, 'form-check-input'],
      prefix = _ref2[0],
      defaultPrefix = _ref2[1];

  bsPrefix = useBootstrapPrefix(prefix, defaultPrefix);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    ref: ref,
    type: type,
    id: id || controlId,
    className: classnames_default()(className, bsPrefix, isValid && 'is-valid', isInvalid && 'is-invalid', isStatic && 'position-static'),
    __self: FormCheckInput_this,
    __source: {
      fileName: FormCheckInput_jsxFileName,
      lineNumber: 88,
      columnNumber: 7
    }
  }));
});
FormCheckInput.displayName = 'FormCheckInput';
FormCheckInput.propTypes = FormCheckInput_propTypes;
/* harmony default export */ const src_FormCheckInput = (FormCheckInput);
;// CONCATENATED MODULE: ./src/FormCheckLabel.tsx


var FormCheckLabel_excluded = ["bsPrefix", "bsCustomPrefix", "className", "htmlFor"];

var FormCheckLabel_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormCheckLabel.tsx",
    FormCheckLabel_this = undefined;






var FormCheckLabel_propTypes = {
  /**
   * @default 'form-check-input'
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * A seperate bsPrefix used for custom controls
   *
   * @default 'custom-control'
   */
  bsCustomPrefix: (prop_types_default()).string,

  /** The HTML for attribute for associating the label with an input */
  htmlFor: (prop_types_default()).string
};
var FormCheckLabel = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      bsCustomPrefix = _ref.bsCustomPrefix,
      className = _ref.className,
      htmlFor = _ref.htmlFor,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, FormCheckLabel_excluded);

  var _useContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_FormContext),
      controlId = _useContext.controlId,
      custom = _useContext.custom;

  var _ref2 = custom ? [bsCustomPrefix, 'custom-control-label'] : [bsPrefix, 'form-check-label'],
      prefix = _ref2[0],
      defaultPrefix = _ref2[1];

  bsPrefix = useBootstrapPrefix(prefix, defaultPrefix);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("label", extends_extends({}, props, {
    ref: ref,
    htmlFor: htmlFor || controlId,
    className: classnames_default()(className, bsPrefix),
    __self: FormCheckLabel_this,
    __source: {
      fileName: FormCheckLabel_jsxFileName,
      lineNumber: 42,
      columnNumber: 7
    }
  }));
});
FormCheckLabel.displayName = 'FormCheckLabel';
FormCheckLabel.propTypes = FormCheckLabel_propTypes;
/* harmony default export */ const src_FormCheckLabel = (FormCheckLabel);
;// CONCATENATED MODULE: ./src/FormCheck.tsx


var FormCheck_excluded = ["id", "bsPrefix", "bsCustomPrefix", "inline", "disabled", "isValid", "isInvalid", "feedbackTooltip", "feedback", "className", "style", "title", "type", "label", "children", "custom", "as"];

var FormCheck_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormCheck.tsx",
    FormCheck_this = undefined;










var FormCheck_propTypes = {
  /**
   * @default 'form-check'
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * A seperate bsPrefix used for custom controls
   *
   * @default 'custom-control'
   */
  bsCustomPrefix: (prop_types_default()).string,

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
   * This is **required** for custom check controls or when `type="switch"` due to
   * how they are rendered.
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

  /** Use Bootstrap's custom form elements to replace the browser defaults */
  custom: all_default()((prop_types_default()).bool, function (_ref) {
    var custom = _ref.custom,
        id = _ref.id;
    return custom && !id ? Error('Custom check controls require an id to work') : null;
  }),

  /**
   * The type of checkable.
   * @type {('radio' | 'checkbox' | 'switch')}
   */
  type: all_default()(prop_types_default().oneOf(['radio', 'checkbox', 'switch']).isRequired, function (_ref2) {
    var type = _ref2.type,
        custom = _ref2.custom;
    return type === 'switch' && custom === false ? Error('`custom` cannot be set to `false` when the type is `switch`') : null;
  }, function (_ref3) {
    var type = _ref3.type,
        id = _ref3.id;
    return type === 'switch' && !id ? Error('`id` must be defined when the type is `switch`') : null;
  }),

  /** Manually style the input as valid */
  isValid: (prop_types_default()).bool,

  /** Manually style the input as invalid */
  isInvalid: (prop_types_default()).bool,

  /** Display feedback as a tooltip. */
  feedbackTooltip: (prop_types_default()).bool,

  /** A message to display when the input is in a validation state */
  feedback: (prop_types_default()).node
};
var FormCheck = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref4, ref) {
  var id = _ref4.id,
      bsPrefix = _ref4.bsPrefix,
      bsCustomPrefix = _ref4.bsCustomPrefix,
      _ref4$inline = _ref4.inline,
      inline = _ref4$inline === void 0 ? false : _ref4$inline,
      _ref4$disabled = _ref4.disabled,
      disabled = _ref4$disabled === void 0 ? false : _ref4$disabled,
      _ref4$isValid = _ref4.isValid,
      isValid = _ref4$isValid === void 0 ? false : _ref4$isValid,
      _ref4$isInvalid = _ref4.isInvalid,
      isInvalid = _ref4$isInvalid === void 0 ? false : _ref4$isInvalid,
      _ref4$feedbackTooltip = _ref4.feedbackTooltip,
      feedbackTooltip = _ref4$feedbackTooltip === void 0 ? false : _ref4$feedbackTooltip,
      feedback = _ref4.feedback,
      className = _ref4.className,
      style = _ref4.style,
      _ref4$title = _ref4.title,
      title = _ref4$title === void 0 ? '' : _ref4$title,
      _ref4$type = _ref4.type,
      type = _ref4$type === void 0 ? 'checkbox' : _ref4$type,
      label = _ref4.label,
      children = _ref4.children,
      propCustom = _ref4.custom,
      _ref4$as = _ref4.as,
      as = _ref4$as === void 0 ? 'input' : _ref4$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref4, FormCheck_excluded);

  var custom = type === 'switch' ? true : propCustom;

  var _ref5 = custom ? [bsCustomPrefix, 'custom-control'] : [bsPrefix, 'form-check'],
      prefix = _ref5[0],
      defaultPrefix = _ref5[1];

  bsPrefix = useBootstrapPrefix(prefix, defaultPrefix);

  var _useContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_FormContext),
      controlId = _useContext.controlId;

  var innerFormContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return {
      controlId: id || controlId,
      custom: custom
    };
  }, [controlId, custom, id]);
  var hasLabel = custom || label != null && label !== false && !children;
  var input = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_FormCheckInput, extends_extends({}, props, {
    type: type === 'switch' ? 'checkbox' : type,
    ref: ref,
    isValid: isValid,
    isInvalid: isInvalid,
    isStatic: !hasLabel,
    disabled: disabled,
    as: as,
    __self: FormCheck_this,
    __source: {
      fileName: FormCheck_jsxFileName,
      lineNumber: 186,
      columnNumber: 7
    }
  }));
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_FormContext.Provider, {
    value: innerFormContext,
    __self: FormCheck_this,
    __source: {
      fileName: FormCheck_jsxFileName,
      lineNumber: 199,
      columnNumber: 7
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
    style: style,
    className: classnames_default()(className, bsPrefix, custom && "custom-" + type, inline && bsPrefix + "-inline"),
    __self: FormCheck_this,
    __source: {
      fileName: FormCheck_jsxFileName,
      lineNumber: 200,
      columnNumber: 9
    }
  }, children || /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Fragment, null, input, hasLabel && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_FormCheckLabel, {
    title: title,
    __self: FormCheck_this,
    __source: {
      fileName: FormCheck_jsxFileName,
      lineNumber: 213,
      columnNumber: 17
    }
  }, label), (isValid || isInvalid) && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Feedback, {
    type: isValid ? 'valid' : 'invalid',
    tooltip: feedbackTooltip,
    __self: FormCheck_this,
    __source: {
      fileName: FormCheck_jsxFileName,
      lineNumber: 216,
      columnNumber: 17
    }
  }, feedback))));
});
FormCheck.displayName = 'FormCheck';
FormCheck.propTypes = FormCheck_propTypes;
FormCheck.Input = src_FormCheckInput;
FormCheck.Label = src_FormCheckLabel;
/* harmony default export */ const src_FormCheck = (FormCheck);
;// CONCATENATED MODULE: ./src/FormFileInput.tsx


var FormFileInput_excluded = ["id", "bsPrefix", "bsCustomPrefix", "className", "isValid", "isInvalid", "lang", "as"];

var FormFileInput_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormFileInput.tsx",
    FormFileInput_this = undefined;






var FormFileInput_propTypes = {
  /**
   * @default 'form-file-input'
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * A seperate bsPrefix used for custom controls
   *
   * @default 'custom-file-input'
   */
  bsCustomPrefix: (prop_types_default()).string,

  /**
   * The underlying HTML element to use when rendering the FormFileInput.
   *
   * @type {('input'|elementType)}
   */
  as: (prop_types_default()).elementType,

  /** A HTML id attribute, necessary for proper form accessibility. */
  id: (prop_types_default()).string,

  /** Manually style the input as valid */
  isValid: (prop_types_default()).bool,

  /** Manually style the input as invalid */
  isInvalid: (prop_types_default()).bool,

  /** The language for the button when using custom file input and SCSS based strings */
  lang: (prop_types_default()).string
};
var FormFileInput = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var id = _ref.id,
      bsPrefix = _ref.bsPrefix,
      bsCustomPrefix = _ref.bsCustomPrefix,
      className = _ref.className,
      isValid = _ref.isValid,
      isInvalid = _ref.isInvalid,
      lang = _ref.lang,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'input' : _ref$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, FormFileInput_excluded);

  var _useContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_FormContext),
      controlId = _useContext.controlId,
      custom = _useContext.custom;

  var type = 'file';

  var _ref2 = custom ? [bsCustomPrefix, 'custom-file-input'] : [bsPrefix, 'form-control-file'],
      prefix = _ref2[0],
      defaultPrefix = _ref2[1];

  bsPrefix = useBootstrapPrefix(prefix, defaultPrefix);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    ref: ref,
    id: id || controlId,
    type: type,
    lang: lang,
    className: classnames_default()(className, bsPrefix, isValid && 'is-valid', isInvalid && 'is-invalid'),
    __self: FormFileInput_this,
    __source: {
      fileName: FormFileInput_jsxFileName,
      lineNumber: 83,
      columnNumber: 7
    }
  }));
});
FormFileInput.displayName = 'FormFileInput';
FormFileInput.propTypes = FormFileInput_propTypes;
/* harmony default export */ const src_FormFileInput = (FormFileInput);
;// CONCATENATED MODULE: ./src/FormFileLabel.tsx


var FormFileLabel_excluded = ["bsPrefix", "bsCustomPrefix", "className", "htmlFor"];

var FormFileLabel_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormFileLabel.tsx",
    FormFileLabel_this = undefined;






var FormFileLabel_propTypes = {
  /**
   * @default 'form-file-input'
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * A seperate bsPrefix used for custom controls
   *
   * @default 'custom-file-label'
   */
  bsCustomPrefix: (prop_types_default()).string,

  /** The HTML for attribute for associating the label with an input */
  htmlFor: (prop_types_default()).string,

  /** The string for the "Browse" text label when using custom file input */
  'data-browse': (prop_types_default()).string
};
var FormFileLabel = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      bsCustomPrefix = _ref.bsCustomPrefix,
      className = _ref.className,
      htmlFor = _ref.htmlFor,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, FormFileLabel_excluded);

  var _useContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_FormContext),
      controlId = _useContext.controlId,
      custom = _useContext.custom;

  var _ref2 = custom ? [bsCustomPrefix, 'custom-file-label'] : [bsPrefix, 'form-file-label'],
      prefix = _ref2[0],
      defaultPrefix = _ref2[1];

  bsPrefix = useBootstrapPrefix(prefix, defaultPrefix);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("label", extends_extends({}, props, {
    ref: ref,
    htmlFor: htmlFor || controlId,
    className: classnames_default()(className, bsPrefix),
    "data-browse": props['data-browse'],
    __self: FormFileLabel_this,
    __source: {
      fileName: FormFileLabel_jsxFileName,
      lineNumber: 53,
      columnNumber: 5
    }
  }));
});
FormFileLabel.displayName = 'FormFileLabel';
FormFileLabel.propTypes = FormFileLabel_propTypes;
/* harmony default export */ const src_FormFileLabel = (FormFileLabel);
;// CONCATENATED MODULE: ./src/FormFile.tsx


var FormFile_excluded = ["id", "bsPrefix", "bsCustomPrefix", "disabled", "isValid", "isInvalid", "feedbackTooltip", "feedback", "className", "style", "label", "children", "custom", "lang", "data-browse", "as", "inputAs"];

var FormFile_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormFile.tsx",
    FormFile_this = undefined;










var FormFile_propTypes = {
  /**
   * @default 'form-file'
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * A seperate bsPrefix used for custom controls
   *
   * @default 'custom-file'
   */
  bsCustomPrefix: (prop_types_default()).string,

  /**
   * The wrapping HTML element to use when rendering the FormFile.
   *
   * @type {('div'|elementType)}
   */
  as: (prop_types_default()).elementType,

  /**
   * The underlying HTML element to use when rendering the FormFile.
   *
   * @type {('input'|elementType)}
   */
  inputAs: (prop_types_default()).elementType,

  /** A HTML id attribute, necessary for proper form accessibility. */
  id: (prop_types_default()).string,

  /**
   * Provide a function child to manually handle the layout of the FormFile's inner components.
   *
   * If not using the custom prop <code>FormFile.Label></code> should be before <code><FormFile.Input isInvalid /></code>
   * ```jsx
   * <FormFile>
   *   <FormFile.Label>Allow us to contact you?</FormFile.Label>
   *   <FormFile.Input isInvalid />
   *   <Feedback type="invalid">Yo this is required</Feedback>
   * </FormFile>
   * ```
   *
   * If using the custom prop <code><FormFile.Input isInvalid /></code> should be before <code>FormFile.Label></code>
   * ```jsx
   * <FormFile custom>
   *   <FormFile.Input isInvalid />
   *   <FormFile.Label>Allow us to contact you?</FormFile.Label>
   *   <Feedback type="invalid">Yo this is required</Feedback>
   * </FormFile>
   * ```
   */
  children: (prop_types_default()).node,
  disabled: (prop_types_default()).bool,
  label: (prop_types_default()).node,

  /** Use Bootstrap's custom form elements to replace the browser defaults */
  custom: (prop_types_default()).bool,

  /** Manually style the input as valid */
  isValid: (prop_types_default()).bool,

  /** Manually style the input as invalid */
  isInvalid: (prop_types_default()).bool,

  /** Display feedback as a tooltip. */
  feedbackTooltip: (prop_types_default()).bool,

  /** A message to display when the input is in a validation state */
  feedback: (prop_types_default()).node,

  /**
   * The string for the "Browse" text label when using custom file input
   *
   * @type string
   */
  'data-browse': all_default()((prop_types_default()).string, function (_ref) {
    var custom = _ref.custom,
        dataBrowse = _ref['data-browse'];
    return dataBrowse && !custom ? Error('`data-browse` attribute value will only be used when custom is `true`') : null;
  }),

  /** The language for the button when using custom file input and SCSS based strings */
  lang: all_default()((prop_types_default()).string, function (_ref2) {
    var custom = _ref2.custom,
        lang = _ref2.lang;
    return lang && !custom ? Error('`lang` can only be set when custom is `true`') : null;
  })
};
var FormFile = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref3, ref) {
  var id = _ref3.id,
      bsPrefix = _ref3.bsPrefix,
      bsCustomPrefix = _ref3.bsCustomPrefix,
      _ref3$disabled = _ref3.disabled,
      disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
      _ref3$isValid = _ref3.isValid,
      isValid = _ref3$isValid === void 0 ? false : _ref3$isValid,
      _ref3$isInvalid = _ref3.isInvalid,
      isInvalid = _ref3$isInvalid === void 0 ? false : _ref3$isInvalid,
      _ref3$feedbackTooltip = _ref3.feedbackTooltip,
      feedbackTooltip = _ref3$feedbackTooltip === void 0 ? false : _ref3$feedbackTooltip,
      feedback = _ref3.feedback,
      className = _ref3.className,
      style = _ref3.style,
      label = _ref3.label,
      children = _ref3.children,
      custom = _ref3.custom,
      lang = _ref3.lang,
      dataBrowse = _ref3['data-browse'],
      _ref3$as = _ref3.as,
      Component = _ref3$as === void 0 ? 'div' : _ref3$as,
      _ref3$inputAs = _ref3.inputAs,
      inputAs = _ref3$inputAs === void 0 ? 'input' : _ref3$inputAs,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref3, FormFile_excluded);

  var _ref4 = custom ? [bsCustomPrefix, 'custom'] : [bsPrefix, 'form-file'],
      prefix = _ref4[0],
      defaultPrefix = _ref4[1];

  bsPrefix = useBootstrapPrefix(prefix, defaultPrefix);
  var type = 'file';

  var _useContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_FormContext),
      controlId = _useContext.controlId;

  var innerFormContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return {
      controlId: id || controlId,
      custom: custom
    };
  }, [controlId, custom, id]);
  var hasLabel = label != null && label !== false && !children;
  var input = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_FormFileInput, extends_extends({}, props, {
    ref: ref,
    isValid: isValid,
    isInvalid: isInvalid,
    disabled: disabled,
    as: inputAs,
    lang: lang,
    __self: FormFile_this,
    __source: {
      fileName: FormFile_jsxFileName,
      lineNumber: 176,
      columnNumber: 7
    }
  }));
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_FormContext.Provider, {
    value: innerFormContext,
    __self: FormFile_this,
    __source: {
      fileName: FormFile_jsxFileName,
      lineNumber: 188,
      columnNumber: 7
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, {
    style: style,
    className: classnames_default()(className, bsPrefix, custom && "custom-" + type),
    __self: FormFile_this,
    __source: {
      fileName: FormFile_jsxFileName,
      lineNumber: 189,
      columnNumber: 9
    }
  }, children || /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Fragment, null, custom ? /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Fragment, null, input, hasLabel && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_FormFileLabel, {
    "data-browse": dataBrowse,
    __self: FormFile_this,
    __source: {
      fileName: FormFile_jsxFileName,
      lineNumber: 203,
      columnNumber: 21
    }
  }, label)) : /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Fragment, null, hasLabel && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_FormFileLabel, {
    __self: FormFile_this,
    __source: {
      fileName: FormFile_jsxFileName,
      lineNumber: 210,
      columnNumber: 32
    }
  }, label), input), (isValid || isInvalid) && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Feedback, {
    type: isValid ? 'valid' : 'invalid',
    tooltip: feedbackTooltip,
    __self: FormFile_this,
    __source: {
      fileName: FormFile_jsxFileName,
      lineNumber: 215,
      columnNumber: 17
    }
  }, feedback))));
});
FormFile.displayName = 'FormFile';
FormFile.propTypes = FormFile_propTypes;
FormFile.Input = src_FormFileInput;
FormFile.Label = src_FormFileLabel;
/* harmony default export */ const src_FormFile = (FormFile);
;// CONCATENATED MODULE: ./src/FormControl.tsx


var FormControl_excluded = ["bsPrefix", "bsCustomPrefix", "type", "size", "htmlSize", "id", "className", "isValid", "isInvalid", "plaintext", "readOnly", "custom", "as"];

var FormControl_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormControl.tsx",
    FormControl_this = undefined;









var FormControl_propTypes = {
  /**
   * @default {'form-control'}
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * A seperate bsPrefix used for custom controls
   *
   * @default 'custom'
   */
  bsCustomPrefix: (prop_types_default()).string,

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
   * Specifies the number of visible options if `as` is `'select'`.
   */
  htmlSize: (prop_types_default()).number,

  /**
   * The underlying HTML element to use when rendering the FormControl.
   *
   * @type {('input'|'textarea'|'select'|elementType)}
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
   * Use Bootstrap's custom form elements to replace the browser defaults
   * @type boolean
   */
  custom: all_default()((prop_types_default()).bool, function (_ref) {
    var as = _ref.as,
        type = _ref.type,
        custom = _ref.custom;
    return custom === true && type !== 'range' && as !== 'select' ? Error('`custom` can only be set to `true` when the input type is `range`, or  `select`') : null;
  }),

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
var FormControl = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref2, ref) {
  var bsPrefix = _ref2.bsPrefix,
      bsCustomPrefix = _ref2.bsCustomPrefix,
      type = _ref2.type,
      size = _ref2.size,
      htmlSize = _ref2.htmlSize,
      id = _ref2.id,
      className = _ref2.className,
      _ref2$isValid = _ref2.isValid,
      isValid = _ref2$isValid === void 0 ? false : _ref2$isValid,
      _ref2$isInvalid = _ref2.isInvalid,
      isInvalid = _ref2$isInvalid === void 0 ? false : _ref2$isInvalid,
      plaintext = _ref2.plaintext,
      readOnly = _ref2.readOnly,
      custom = _ref2.custom,
      _ref2$as = _ref2.as,
      Component = _ref2$as === void 0 ? 'input' : _ref2$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref2, FormControl_excluded);

  var _useContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_FormContext),
      controlId = _useContext.controlId;

  var _ref3 = custom ? [bsCustomPrefix, 'custom'] : [bsPrefix, 'form-control'],
      prefix = _ref3[0],
      defaultPrefix = _ref3[1];

  bsPrefix = useBootstrapPrefix(prefix, defaultPrefix);
  var classes;

  if (plaintext) {
    var _classes;

    classes = (_classes = {}, _classes[bsPrefix + "-plaintext"] = true, _classes);
  } else if (type === 'file') {
    var _classes2;

    classes = (_classes2 = {}, _classes2[bsPrefix + "-file"] = true, _classes2);
  } else if (type === 'range') {
    var _classes3;

    classes = (_classes3 = {}, _classes3[bsPrefix + "-range"] = true, _classes3);
  } else if (Component === 'select' && custom) {
    var _classes4;

    classes = (_classes4 = {}, _classes4[bsPrefix + "-select"] = true, _classes4[bsPrefix + "-select-" + size] = size, _classes4);
  } else {
    var _classes5;

    classes = (_classes5 = {}, _classes5[bsPrefix] = true, _classes5[bsPrefix + "-" + size] = size, _classes5);
  }

   false ? 0 : void 0;
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    type: type,
    size: htmlSize,
    ref: ref,
    readOnly: readOnly,
    id: id || controlId,
    className: classnames_default()(className, classes, isValid && "is-valid", isInvalid && "is-invalid"),
    __self: FormControl_this,
    __source: {
      fileName: FormControl_jsxFileName,
      lineNumber: 185,
      columnNumber: 7
    }
  }));
});
FormControl.displayName = 'FormControl';
FormControl.propTypes = FormControl_propTypes;
/* harmony default export */ const src_FormControl = (Object.assign(FormControl, {
  Feedback: src_Feedback
}));
;// CONCATENATED MODULE: ./src/FormGroup.tsx


var FormGroup_excluded = ["bsPrefix", "className", "children", "controlId", "as"];

var FormGroup_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormGroup.tsx",
    FormGroup_this = undefined;






var FormGroup_propTypes = {
  /**
   * @default 'form-group'
   */
  bsPrefix: (prop_types_default()).string,
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
var FormGroup = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      controlId = _ref.controlId,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, FormGroup_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-group');
  var context = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return {
      controlId: controlId
    };
  }, [controlId]);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_FormContext.Provider, {
    value: context,
    __self: FormGroup_this,
    __source: {
      fileName: FormGroup_jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    __self: FormGroup_this,
    __source: {
      fileName: FormGroup_jsxFileName,
      lineNumber: 60,
      columnNumber: 9
    }
  }), children));
});
FormGroup.displayName = 'FormGroup';
FormGroup.propTypes = FormGroup_propTypes;
/* harmony default export */ const src_FormGroup = (FormGroup);
;// CONCATENATED MODULE: ./src/FormLabel.tsx


var FormLabel_excluded = ["as", "bsPrefix", "column", "srOnly", "className", "htmlFor"];

var FormLabel_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormLabel.tsx",
    FormLabel_this = undefined;








var FormLabel_propTypes = {
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
  srOnly: (prop_types_default()).bool,

  /** Set a custom element for this component */
  as: (prop_types_default()).elementType
};
var FormLabel_defaultProps = {
  column: false,
  srOnly: false
};
var FormLabel = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'label' : _ref$as,
      bsPrefix = _ref.bsPrefix,
      column = _ref.column,
      srOnly = _ref.srOnly,
      className = _ref.className,
      htmlFor = _ref.htmlFor,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, FormLabel_excluded);

  var _useContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_FormContext),
      controlId = _useContext.controlId;

  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-label');
  var columnClass = 'col-form-label';
  if (typeof column === 'string') columnClass = columnClass + " " + columnClass + "-" + column;
  var classes = classnames_default()(className, bsPrefix, srOnly && 'sr-only', column && columnClass);
   false ? 0 : void 0;
  htmlFor = htmlFor || controlId;
  if (column) return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Col, extends_extends({
    ref: ref,
    as: "label",
    className: classes,
    htmlFor: htmlFor
  }, props, {
    __self: FormLabel_this,
    __source: {
      fileName: FormLabel_jsxFileName,
      lineNumber: 110,
      columnNumber: 9
    }
  }));
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
    external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
      ref: ref,
      className: classes,
      htmlFor: htmlFor
    }, props, {
      __self: FormLabel_this,
      __source: {
        fileName: FormLabel_jsxFileName,
        lineNumber: 121,
        columnNumber: 7
      }
    }))
  );
});
FormLabel.displayName = 'FormLabel';
FormLabel.propTypes = FormLabel_propTypes;
FormLabel.defaultProps = FormLabel_defaultProps;
/* harmony default export */ const src_FormLabel = (FormLabel);
;// CONCATENATED MODULE: ./src/FormText.tsx


var FormText_excluded = ["bsPrefix", "className", "as", "muted"];

var FormText_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FormText.tsx",
    FormText_this = undefined;





var FormText_propTypes = {
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
var FormText = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'small' : _ref$as,
      muted = _ref.muted,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, FormText_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'form-text');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    ref: ref,
    className: classnames_default()(className, bsPrefix, muted && 'text-muted'),
    __self: FormText_this,
    __source: {
      fileName: FormText_jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }
  }));
});
FormText.displayName = 'FormText';
FormText.propTypes = FormText_propTypes;
/* harmony default export */ const src_FormText = (FormText);
;// CONCATENATED MODULE: ./src/Switch.tsx


var Switch_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Switch.tsx",
    Switch_this = undefined;



var Switch = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (props, ref) {
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_FormCheck, extends_extends({}, props, {
    ref: ref,
    type: "switch",
    __self: Switch_this,
    __source: {
      fileName: Switch_jsxFileName,
      lineNumber: 13,
      columnNumber: 19
    }
  }));
});
Switch.displayName = 'Switch';
Switch.Input = src_FormCheck.Input;
Switch.Label = src_FormCheck.Label;
/* harmony default export */ const src_Switch = (Switch);
;// CONCATENATED MODULE: ./src/Form.tsx


var Form_excluded = ["bsPrefix", "inline", "className", "validated", "as"];

var Form_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Form.tsx",
    Form_this = undefined;













var FormRow = createWithBsPrefix('form-row');
var Form_propTypes = {
  /**
   * @default {'form'}
   */
  bsPrefix: (prop_types_default()).string,

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
   * Display the series of labels, form controls,
   * and buttons on a single horizontal row
   */
  inline: (prop_types_default()).bool,

  /**
   * Mark a form as having been validated. Setting it to `true` will
   * toggle any validation styles on the forms elements.
   */
  validated: (prop_types_default()).bool,
  as: (prop_types_default()).elementType
};
var Form_defaultProps = {
  inline: false
};
var FormImpl = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      inline = _ref.inline,
      className = _ref.className,
      validated = _ref.validated,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'form' : _ref$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Form_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'form');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    ref: ref,
    className: classnames_default()(className, validated && 'was-validated', inline && bsPrefix + "-inline"),
    __self: Form_this,
    __source: {
      fileName: Form_jsxFileName,
      lineNumber: 84,
      columnNumber: 7
    }
  }));
});
FormImpl.displayName = 'Form';
FormImpl.propTypes = Form_propTypes;
FormImpl.defaultProps = Form_defaultProps;
FormImpl.Row = FormRow;
FormImpl.Group = src_FormGroup;
FormImpl.Control = src_FormControl;
FormImpl.Check = src_FormCheck;
FormImpl.File = src_FormFile;
FormImpl.Switch = src_Switch;
FormImpl.Label = src_FormLabel;
FormImpl.Text = src_FormText;
/* harmony default export */ const Form = (FormImpl);
;// CONCATENATED MODULE: ./src/Container.tsx


var Container_excluded = ["bsPrefix", "fluid", "as", "className"];

var Container_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Container.tsx",
    Container_this = undefined;





var containerSizes = prop_types_default().oneOfType([(prop_types_default()).bool, prop_types_default().oneOf(['sm', 'md', 'lg', 'xl'])]);
var Container_propTypes = {
  /**
   * @default 'container'
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * Allow the Container to fill all of its available horizontal space.
   * @type {(true|"sm"|"md"|"lg"|"xl")}
   */
  fluid: containerSizes,

  /**
   * You can use a custom element for this component
   */
  as: (prop_types_default()).elementType
};
var Container_defaultProps = {
  fluid: false
};
var Container = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      fluid = _ref.fluid,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Container_excluded);

  var prefix = useBootstrapPrefix(bsPrefix, 'container');
  var suffix = typeof fluid === 'string' ? "-" + fluid : '-fluid';
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(className, fluid ? "" + prefix + suffix : prefix),
    __self: Container_this,
    __source: {
      fileName: Container_jsxFileName,
      lineNumber: 58,
      columnNumber: 7
    }
  }));
});
Container.displayName = 'Container';
Container.propTypes = Container_propTypes;
Container.defaultProps = Container_defaultProps;
/* harmony default export */ const src_Container = (Container);
;// CONCATENATED MODULE: ./src/Image.tsx


var Image_excluded = ["bsPrefix", "className", "fluid", "rounded", "roundedCircle", "thumbnail"];

var Image_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Image.tsx",
    Image_this = undefined;





var Image_propTypes = {
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
var Image_defaultProps = {
  fluid: false,
  rounded: false,
  roundedCircle: false,
  thumbnail: false
};
var Image = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      fluid = _ref.fluid,
      rounded = _ref.rounded,
      roundedCircle = _ref.roundedCircle,
      thumbnail = _ref.thumbnail,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Image_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'img');
  var classes = classnames_default()(fluid && bsPrefix + "-fluid", rounded && "rounded", roundedCircle && "rounded-circle", thumbnail && bsPrefix + "-thumbnail");
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("img", extends_extends({
    // eslint-disable-line jsx-a11y/alt-text
    ref: ref
  }, props, {
    className: classnames_default()(className, classes),
    __self: Image_this,
    __source: {
      fileName: Image_jsxFileName,
      lineNumber: 66,
      columnNumber: 7
    }
  }));
});
Image.displayName = 'Image';
Image.propTypes = Image_propTypes;
Image.defaultProps = Image_defaultProps;
/* harmony default export */ const src_Image = (Image);
;// CONCATENATED MODULE: ./src/FigureImage.tsx


var FigureImage_excluded = ["className"];

var FigureImage_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/FigureImage.tsx",
    FigureImage_this = undefined;




var FigureImage_defaultProps = {
  fluid: true
};
var FigureImage = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, FigureImage_excluded);

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Image, extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(className, 'figure-img'),
    __self: FigureImage_this,
    __source: {
      fileName: FigureImage_jsxFileName,
      lineNumber: 10,
      columnNumber: 5
    }
  }));
});
FigureImage.displayName = 'FigureImage';
FigureImage.propTypes = Image_propTypes;
FigureImage.defaultProps = FigureImage_defaultProps;
/* harmony default export */ const src_FigureImage = (FigureImage);
;// CONCATENATED MODULE: ./src/FigureCaption.tsx

var FigureCaption = createWithBsPrefix('figure-caption', {
  Component: 'figcaption'
});
/* harmony default export */ const src_FigureCaption = (FigureCaption);
;// CONCATENATED MODULE: ./src/Figure.tsx



var Figure = createWithBsPrefix('figure', {
  Component: 'figure'
});
Figure.Image = src_FigureImage;
Figure.Caption = src_FigureCaption;
/* harmony default export */ const src_Figure = (Figure);
;// CONCATENATED MODULE: ./src/InputGroup.tsx


var InputGroup_excluded = ["bsPrefix", "size", "hasValidation", "className", "as"];

var InputGroup_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/InputGroup.tsx",
    InputGroup_this = undefined;






var InputGroupAppend = createWithBsPrefix('input-group-append');
var InputGroupPrepend = createWithBsPrefix('input-group-prepend');
var InputGroupText = createWithBsPrefix('input-group-text', {
  Component: 'span'
});

var InputGroupCheckbox = function InputGroupCheckbox(props) {
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(InputGroupText, {
    __self: InputGroup_this,
    __source: {
      fileName: InputGroup_jsxFileName,
      lineNumber: 19,
      columnNumber: 3
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("input", extends_extends({
    type: "checkbox"
  }, props, {
    __self: InputGroup_this,
    __source: {
      fileName: InputGroup_jsxFileName,
      lineNumber: 20,
      columnNumber: 5
    }
  })));
};

var InputGroupRadio = function InputGroupRadio(props) {
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(InputGroupText, {
    __self: InputGroup_this,
    __source: {
      fileName: InputGroup_jsxFileName,
      lineNumber: 25,
      columnNumber: 3
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("input", extends_extends({
    type: "radio"
  }, props, {
    __self: InputGroup_this,
    __source: {
      fileName: InputGroup_jsxFileName,
      lineNumber: 26,
      columnNumber: 5
    }
  })));
};

var InputGroup_propTypes = {
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
/**
 *
 * @property {InputGroupAppend} Append
 * @property {InputGroupPrepend} Prepend
 * @property {InputGroupText} Text
 * @property {InputGroupRadio} Radio
 * @property {InputGroupCheckbox} Checkbox
 */

var InputGroup = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      size = _ref.size,
      hasValidation = _ref.hasValidation,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, InputGroup_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'input-group');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(className, bsPrefix, size && bsPrefix + "-" + size, hasValidation && 'has-validation'),
    __self: InputGroup_this,
    __source: {
      fileName: InputGroup_jsxFileName,
      lineNumber: 90,
      columnNumber: 7
    }
  }));
});
InputGroup.propTypes = InputGroup_propTypes;
InputGroup.displayName = 'InputGroup';
InputGroup.Text = InputGroupText;
InputGroup.Radio = InputGroupRadio;
InputGroup.Checkbox = InputGroupCheckbox;
InputGroup.Append = InputGroupAppend;
InputGroup.Prepend = InputGroupPrepend;
/* harmony default export */ const src_InputGroup = (InputGroup);
;// CONCATENATED MODULE: ./src/Jumbotron.tsx


var Jumbotron_excluded = ["as", "className", "fluid", "bsPrefix"];

var Jumbotron_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Jumbotron.tsx",
    Jumbotron_this = undefined;





var Jumbotron_propTypes = {
  as: (prop_types_default()).elementType,

  /** Make the jumbotron full width, and without rounded corners */
  fluid: (prop_types_default()).bool,

  /** @default 'jumbotron' */
  bsPrefix: (prop_types_default()).string
};
var Jumbotron_defaultProps = {
  fluid: false
};
var Jumbotron = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var _classes;

  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      fluid = _ref.fluid,
      bsPrefix = _ref.bsPrefix,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Jumbotron_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'jumbotron');
  var classes = (_classes = {}, _classes[bsPrefix] = true, _classes[bsPrefix + "-fluid"] = fluid, _classes);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(className, classes),
    __self: Jumbotron_this,
    __source: {
      fileName: Jumbotron_jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }
  }));
});
Jumbotron.propTypes = Jumbotron_propTypes;
Jumbotron.defaultProps = Jumbotron_defaultProps;
Jumbotron.displayName = 'Jumbotron';
/* harmony default export */ const src_Jumbotron = (Jumbotron);
;// CONCATENATED MODULE: ./src/TabContext.tsx

var TabContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(null);
/* harmony default export */ const src_TabContext = (TabContext);
;// CONCATENATED MODULE: ./src/AbstractNav.tsx


var AbstractNav_excluded = ["as", "onSelect", "activeKey", "role", "onKeyDown"];

var AbstractNav_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/AbstractNav.tsx",
    AbstractNav_this = undefined;










// eslint-disable-next-line @typescript-eslint/no-empty-function
var AbstractNav_noop = function noop() {};

var AbstractNav_propTypes = {
  onSelect: (prop_types_default()).func.isRequired,
  as: (prop_types_default()).elementType,
  role: (prop_types_default()).string,

  /** @private */
  onKeyDown: (prop_types_default()).func,

  /** @private */
  parentOnSelect: (prop_types_default()).func,

  /** @private */
  getControlledId: (prop_types_default()).func,

  /** @private */
  getControllerId: (prop_types_default()).func,

  /** @private */
  activeKey: (prop_types_default()).any
}; // TODO: is this correct?

var AbstractNav = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'ul' : _ref$as,
      onSelect = _ref.onSelect,
      activeKey = _ref.activeKey,
      role = _ref.role,
      onKeyDown = _ref.onKeyDown,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, AbstractNav_excluded);

  // A ref and forceUpdate for refocus, b/c we only want to trigger when needed
  // and don't want to reset the set in the effect
  var forceUpdate = useForceUpdate();
  var needsRefocusRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(false);
  var parentOnSelect = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_SelectableContext);
  var tabContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_TabContext);
  var getControlledId, getControllerId;

  if (tabContext) {
    role = role || 'tablist';
    activeKey = tabContext.activeKey;
    getControlledId = tabContext.getControlledId;
    getControllerId = tabContext.getControllerId;
  }

  var listNode = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);

  var getNextActiveChild = function getNextActiveChild(offset) {
    var currentListNode = listNode.current;
    if (!currentListNode) return null;
    var items = qsa(currentListNode, '[data-rb-event-key]:not(.disabled)');
    var activeChild = currentListNode.querySelector('.active');
    if (!activeChild) return null;
    var index = items.indexOf(activeChild);
    if (index === -1) return null;
    var nextIndex = index + offset;
    if (nextIndex >= items.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = items.length - 1;
    return items[nextIndex];
  };

  var handleSelect = function handleSelect(key, event) {
    if (key == null) return;
    if (onSelect) onSelect(key, event);
    if (parentOnSelect) parentOnSelect(key, event);
  };

  var handleKeyDown = function handleKeyDown(event) {
    if (onKeyDown) onKeyDown(event);
    var nextActiveChild;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextActiveChild = getNextActiveChild(-1);
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        nextActiveChild = getNextActiveChild(1);
        break;

      default:
        return;
    }

    if (!nextActiveChild) return;
    event.preventDefault();
    handleSelect(nextActiveChild.dataset.rbEventKey, event);
    needsRefocusRef.current = true;
    forceUpdate();
  };

  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (listNode.current && needsRefocusRef.current) {
      var activeChild = listNode.current.querySelector('[data-rb-event-key].active');
      if (activeChild) activeChild.focus();
    }

    needsRefocusRef.current = false;
  });
  var mergedRef = esm_useMergedRefs(ref, listNode);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SelectableContext.Provider, {
    value: handleSelect,
    __self: AbstractNav_this,
    __source: {
      fileName: AbstractNav_jsxFileName,
      lineNumber: 141,
      columnNumber: 7
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_NavContext.Provider, {
    value: {
      role: role,
      // used by NavLink to determine it's role
      activeKey: makeEventKey(activeKey),
      getControlledId: getControlledId || AbstractNav_noop,
      getControllerId: getControllerId || AbstractNav_noop
    },
    __self: AbstractNav_this,
    __source: {
      fileName: AbstractNav_jsxFileName,
      lineNumber: 142,
      columnNumber: 9
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    onKeyDown: handleKeyDown,
    ref: mergedRef,
    role: role,
    __self: AbstractNav_this,
    __source: {
      fileName: AbstractNav_jsxFileName,
      lineNumber: 150,
      columnNumber: 11
    }
  }))));
});
AbstractNav.propTypes = AbstractNav_propTypes;
/* harmony default export */ const src_AbstractNav = (AbstractNav);
;// CONCATENATED MODULE: ./src/AbstractNavItem.tsx


var AbstractNavItem_excluded = ["active", "className", "eventKey", "onSelect", "onClick", "as"];

var AbstractNavItem_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/AbstractNavItem.tsx",
    AbstractNavItem_this = undefined;








var AbstractNavItem_propTypes = {
  id: (prop_types_default()).string,
  active: (prop_types_default()).bool,
  role: (prop_types_default()).string,
  href: (prop_types_default()).string,
  tabIndex: prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string]),
  eventKey: (prop_types_default()).any,
  onclick: (prop_types_default()).func,
  as: (prop_types_default()).any,
  onClick: (prop_types_default()).func,
  onSelect: (prop_types_default()).func,
  'aria-controls': (prop_types_default()).string
};
var AbstractNavItem_defaultProps = {
  disabled: false
};
var AbstractNavItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var active = _ref.active,
      className = _ref.className,
      eventKey = _ref.eventKey,
      onSelect = _ref.onSelect,
      onClick = _ref.onClick,
      Component = _ref.as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, AbstractNavItem_excluded);

  var navKey = makeEventKey(eventKey, props.href);
  var parentOnSelect = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_SelectableContext);
  var navContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_NavContext);
  var isActive = active;

  if (navContext) {
    if (!props.role && navContext.role === 'tablist') props.role = 'tab';
    var contextControllerId = navContext.getControllerId(navKey);
    var contextControlledId = navContext.getControlledId(navKey);
     false ? 0 : void 0;
     false ? 0 : void 0;
    props['data-rb-event-key'] = navKey;
    props.id = contextControllerId || props.id;
    props['aria-controls'] = contextControlledId || props['aria-controls'];
    isActive = active == null && navKey != null ? navContext.activeKey === navKey : active;
  }

  if (props.role === 'tab') {
    if (props.disabled) {
      props.tabIndex = -1;
      props['aria-disabled'] = true;
    }

    props['aria-selected'] = isActive;
  }

  var handleOnclick = useEventCallback(function (e) {
    if (onClick) onClick(e);
    if (navKey == null) return;
    if (onSelect) onSelect(navKey, e);
    if (parentOnSelect) parentOnSelect(navKey, e);
  });
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    ref: ref,
    onClick: handleOnclick,
    className: classnames_default()(className, isActive && 'active'),
    __self: AbstractNavItem_this,
    __source: {
      fileName: AbstractNavItem_jsxFileName,
      lineNumber: 112,
      columnNumber: 7
    }
  }));
});
AbstractNavItem.propTypes = AbstractNavItem_propTypes;
AbstractNavItem.defaultProps = AbstractNavItem_defaultProps;
/* harmony default export */ const src_AbstractNavItem = (AbstractNavItem);
;// CONCATENATED MODULE: ./src/ListGroupItem.tsx


var ListGroupItem_excluded = ["bsPrefix", "active", "disabled", "className", "variant", "action", "as", "onClick"];

var ListGroupItem_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ListGroupItem.tsx",
    ListGroupItem_this = undefined;






var ListGroupItem_propTypes = {
  /**
   * @default 'list-group-item'
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * Sets contextual classes for list item
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
   */
  variant: (prop_types_default()).string,

  /**
   * Marks a ListGroupItem as actionable, applying additional hover, active and disabled styles
   * for links and buttons.
   */
  action: (prop_types_default()).bool,

  /**
   * Sets list item as active
   */
  active: (prop_types_default()).bool,

  /**
   * Sets list item state as disabled
   */
  disabled: (prop_types_default()).bool,
  eventKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]),
  onClick: (prop_types_default()).func,
  href: (prop_types_default()).string,

  /**
   * You can use a custom element type for this component. For none `action` items, items render as `li`.
   * For actions the default is an achor or button element depending on whether a `href` is provided.
   *
   * @default {'div' | 'a' | 'button'}
   */
  as: (prop_types_default()).elementType
};
var ListGroupItem_defaultProps = {
  variant: undefined,
  active: false,
  disabled: false
};
var ListGroupItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      active = _ref.active,
      disabled = _ref.disabled,
      className = _ref.className,
      variant = _ref.variant,
      action = _ref.action,
      as = _ref.as,
      onClick = _ref.onClick,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, ListGroupItem_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'list-group-item');
  var handleClick = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (event) {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (onClick) onClick(event);
  }, [disabled, onClick]);

  if (disabled && props.tabIndex === undefined) {
    props.tabIndex = -1;
    props['aria-disabled'] = true;
  }

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_AbstractNavItem, extends_extends({
    ref: ref
  }, props, {
    // eslint-disable-next-line no-nested-ternary
    as: as || (action ? props.href ? 'a' : 'button' : 'div'),
    onClick: handleClick,
    className: classnames_default()(className, bsPrefix, active && 'active', disabled && 'disabled', variant && bsPrefix + "-" + variant, action && bsPrefix + "-action"),
    __self: ListGroupItem_this,
    __source: {
      fileName: ListGroupItem_jsxFileName,
      lineNumber: 107,
      columnNumber: 7
    }
  }));
});
ListGroupItem.propTypes = ListGroupItem_propTypes;
ListGroupItem.defaultProps = ListGroupItem_defaultProps;
ListGroupItem.displayName = 'ListGroupItem';
/* harmony default export */ const src_ListGroupItem = (ListGroupItem);
;// CONCATENATED MODULE: ./src/ListGroup.tsx


var ListGroup_excluded = ["className", "bsPrefix", "variant", "horizontal", "as"];

var ListGroup_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ListGroup.tsx",
    ListGroup_this = undefined;









var ListGroup_propTypes = {
  /**
   * @default 'list-group'
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * Adds a variant to the list-group
   *
   * @type {('flush')}
   */
  variant: prop_types_default().oneOf(['flush', undefined]),

  /**
   * Changes the flow of the list group items from vertical to horizontal.
   * A value of `null` (the default) sets it to vertical for all breakpoints;
   * Just including the prop sets it for all breakpoints, while `{sm|md|lg|xl}`
   * makes the list group horizontal starting at that breakpoint’s `min-width`.
   * @type {(true|'sm'|'md'|'lg'|'xl')}
   */
  horizontal: prop_types_default().oneOf([true, 'sm', 'md', 'lg', 'xl', undefined]),

  /**
   * You can use a custom element type for this component.
   */
  as: (prop_types_default()).elementType
};
var ListGroup_defaultProps = {
  variant: undefined,
  horizontal: undefined
};
var ListGroup = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (props, ref) {
  var _useUncontrolled = useUncontrolled(props, {
    activeKey: 'onSelect'
  }),
      className = _useUncontrolled.className,
      initialBsPrefix = _useUncontrolled.bsPrefix,
      variant = _useUncontrolled.variant,
      horizontal = _useUncontrolled.horizontal,
      _useUncontrolled$as = _useUncontrolled.as,
      as = _useUncontrolled$as === void 0 ? 'div' : _useUncontrolled$as,
      controlledProps = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_useUncontrolled, ListGroup_excluded);

  var bsPrefix = useBootstrapPrefix(initialBsPrefix, 'list-group');
  var horizontalVariant;

  if (horizontal) {
    horizontalVariant = horizontal === true ? 'horizontal' : "horizontal-" + horizontal;
  } else {
    horizontalVariant = null;
  }

   false ? 0 : void 0;
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_AbstractNav, extends_extends({
    ref: ref
  }, controlledProps, {
    as: as,
    className: classnames_default()(className, bsPrefix, variant && bsPrefix + "-" + variant, horizontalVariant && bsPrefix + "-" + horizontalVariant),
    __self: ListGroup_this,
    __source: {
      fileName: ListGroup_jsxFileName,
      lineNumber: 92,
      columnNumber: 5
    }
  }));
});
ListGroup.propTypes = ListGroup_propTypes;
ListGroup.defaultProps = ListGroup_defaultProps;
ListGroup.displayName = 'ListGroup';
ListGroup.Item = src_ListGroupItem;
/* harmony default export */ const src_ListGroup = (ListGroup);
;// CONCATENATED MODULE: ./src/Media.tsx


var Media_excluded = ["bsPrefix", "className", "as"];

var Media_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Media.tsx",
    Media_this = undefined;






var MediaBody = createWithBsPrefix('media-body');
var Media_propTypes = {
  /**
   * @default 'media'
   */
  bsPrefix: (prop_types_default()).string,
  as: (prop_types_default()).elementType
};
var Media = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Media_excluded);

  var prefix = useBootstrapPrefix(bsPrefix, 'media');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    ref: ref,
    className: classnames_default()(className, prefix),
    __self: Media_this,
    __source: {
      fileName: Media_jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }
  }));
});
Media.displayName = 'Media';
Media.propTypes = Media_propTypes;
Media.Body = MediaBody;
/* harmony default export */ const src_Media = (Media);
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
  } // Support: IE 9 only
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
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/isDocument.js
function isDocument(element) {
  return 'nodeType' in element && element.nodeType === document.DOCUMENT_NODE;
}
;// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/isWindow.js

function isWindow(node) {
  if ('window' in node && node.window === node) return node;
  if (isDocument(node)) return node.defaultView || false;
  return false;
}
;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/isOverflowing.js



function isBody(node) {
  return node && node.tagName.toLowerCase() === 'body';
}

function bodyIsOverflowing(node) {
  var doc = isWindow(node) ? ownerDocument() : ownerDocument(node);
  var win = isWindow(node) || doc.defaultView;
  return doc.body.clientWidth < win.innerWidth;
}

function isOverflowing(container) {
  var win = isWindow(container);
  return win || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
}
;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/manageAriaHidden.js
var BLACKLIST = ['template', 'script', 'style'];

var isHidable = function isHidable(_ref) {
  var nodeType = _ref.nodeType,
      tagName = _ref.tagName;
  return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
};

var siblings = function siblings(container, exclude, cb) {
  [].forEach.call(container.children, function (node) {
    if (exclude.indexOf(node) === -1 && isHidable(node)) {
      cb(node);
    }
  });
};

function ariaHidden(hide, node) {
  if (!node) return;

  if (hide) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}
function hideSiblings(container, _ref2) {
  var dialog = _ref2.dialog,
      backdrop = _ref2.backdrop;
  siblings(container, [dialog, backdrop], function (node) {
    return ariaHidden(true, node);
  });
}
function showSiblings(container, _ref3) {
  var dialog = _ref3.dialog,
      backdrop = _ref3.backdrop;
  siblings(container, [dialog, backdrop], function (node) {
    return ariaHidden(false, node);
  });
}
;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/ModalManager.js







function findIndexOf(arr, cb) {
  var idx = -1;
  arr.some(function (d, i) {
    if (cb(d, i)) {
      idx = i;
      return true;
    }

    return false;
  });
  return idx;
}
/**
 * Proper state management for containers and the modals in those containers.
 *
 * @internal Used by the Modal to ensure proper styling of containers.
 */


var ModalManager = /*#__PURE__*/function () {
  function ModalManager(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$hideSiblingNodes = _ref.hideSiblingNodes,
        hideSiblingNodes = _ref$hideSiblingNodes === void 0 ? true : _ref$hideSiblingNodes,
        _ref$handleContainerO = _ref.handleContainerOverflow,
        handleContainerOverflow = _ref$handleContainerO === void 0 ? true : _ref$handleContainerO;

    this.hideSiblingNodes = void 0;
    this.handleContainerOverflow = void 0;
    this.modals = void 0;
    this.containers = void 0;
    this.data = void 0;
    this.scrollbarSize = void 0;
    this.hideSiblingNodes = hideSiblingNodes;
    this.handleContainerOverflow = handleContainerOverflow;
    this.modals = [];
    this.containers = [];
    this.data = [];
    this.scrollbarSize = scrollbarSize();
  }

  var _proto = ModalManager.prototype;

  _proto.isContainerOverflowing = function isContainerOverflowing(modal) {
    var data = this.data[this.containerIndexFromModal(modal)];
    return data && data.overflowing;
  };

  _proto.containerIndexFromModal = function containerIndexFromModal(modal) {
    return findIndexOf(this.data, function (d) {
      return d.modals.indexOf(modal) !== -1;
    });
  };

  _proto.setContainerStyle = function setContainerStyle(containerState, container) {
    var style = {
      overflow: 'hidden'
    }; // we are only interested in the actual `style` here
    // because we will override it

    containerState.style = {
      overflow: container.style.overflow,
      paddingRight: container.style.paddingRight
    };

    if (containerState.overflowing) {
      // use computed style, here to get the real padding
      // to add our scrollbar width
      style.paddingRight = parseInt(css(container, 'paddingRight') || '0', 10) + this.scrollbarSize + "px";
    }

    css(container, style);
  };

  _proto.removeContainerStyle = function removeContainerStyle(containerState, container) {
    Object.assign(container.style, containerState.style);
  };

  _proto.add = function add(modal, container, className) {
    var modalIdx = this.modals.indexOf(modal);
    var containerIdx = this.containers.indexOf(container);

    if (modalIdx !== -1) {
      return modalIdx;
    }

    modalIdx = this.modals.length;
    this.modals.push(modal);

    if (this.hideSiblingNodes) {
      hideSiblings(container, modal);
    }

    if (containerIdx !== -1) {
      this.data[containerIdx].modals.push(modal);
      return modalIdx;
    }

    var data = {
      modals: [modal],
      // right now only the first modal of a container will have its classes applied
      classes: className ? className.split(/\s+/) : [],
      overflowing: isOverflowing(container)
    };

    if (this.handleContainerOverflow) {
      this.setContainerStyle(data, container);
    }

    data.classes.forEach(addClass.bind(null, container));
    this.containers.push(container);
    this.data.push(data);
    return modalIdx;
  };

  _proto.remove = function remove(modal) {
    var modalIdx = this.modals.indexOf(modal);

    if (modalIdx === -1) {
      return;
    }

    var containerIdx = this.containerIndexFromModal(modal);
    var data = this.data[containerIdx];
    var container = this.containers[containerIdx];
    data.modals.splice(data.modals.indexOf(modal), 1);
    this.modals.splice(modalIdx, 1); // if that was the last modal in a container,
    // clean up the container

    if (data.modals.length === 0) {
      data.classes.forEach(removeClass.bind(null, container));

      if (this.handleContainerOverflow) {
        this.removeContainerStyle(data, container);
      }

      if (this.hideSiblingNodes) {
        showSiblings(container, modal);
      }

      this.containers.splice(containerIdx, 1);
      this.data.splice(containerIdx, 1);
    } else if (this.hideSiblingNodes) {
      // otherwise make sure the next top modal is visible to a SR
      var _data$modals = data.modals[data.modals.length - 1],
          backdrop = _data$modals.backdrop,
          dialog = _data$modals.dialog;
      ariaHidden(false, dialog);
      ariaHidden(false, backdrop);
    }
  };

  _proto.isTopModal = function isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  };

  return ModalManager;
}();

/* harmony default export */ const esm_ModalManager = (ModalManager);
;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/useWaitForDOMRef.js


var resolveContainerRef = function resolveContainerRef(ref) {
  var _ref;

  if (typeof document === 'undefined') return null;
  if (ref == null) return ownerDocument().body;
  if (typeof ref === 'function') ref = ref();
  if (ref && 'current' in ref) ref = ref.current;
  if ((_ref = ref) != null && _ref.nodeType) return ref || null;
  return null;
};
function useWaitForDOMRef(ref, onResolved) {
  var _useState = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(function () {
    return resolveContainerRef(ref);
  }),
      resolvedRef = _useState[0],
      setRef = _useState[1];

  if (!resolvedRef) {
    var earlyRef = resolveContainerRef(ref);
    if (earlyRef) setRef(earlyRef);
  }

  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (onResolved && resolvedRef) {
      onResolved(resolvedRef);
    }
  }, [onResolved, resolvedRef]);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    var nextRef = resolveContainerRef(ref);

    if (nextRef !== resolvedRef) {
      setRef(nextRef);
    }
  }, [ref, resolvedRef]);
  return resolvedRef;
}
;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/Modal.js


/* eslint-disable @typescript-eslint/no-use-before-define, react/prop-types */














var manager;

function getManager() {
  if (!manager) manager = new esm_ModalManager();
  return manager;
}

function useModalManager(provided) {
  var modalManager = provided || getManager();
  var modal = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)({
    dialog: null,
    backdrop: null
  });
  return Object.assign(modal.current, {
    add: function add(container, className) {
      return modalManager.add(modal.current, container, className);
    },
    remove: function remove() {
      return modalManager.remove(modal.current);
    },
    isTopModal: function isTopModal() {
      return modalManager.isTopModal(modal.current);
    },
    setDialogRef: (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (ref) {
      modal.current.dialog = ref;
    }, []),
    setBackdropRef: (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (ref) {
      modal.current.backdrop = ref;
    }, [])
  });
}

var Modal = /*#__PURE__*/(0,external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef)(function (_ref, ref) {
  var _ref$show = _ref.show,
      show = _ref$show === void 0 ? false : _ref$show,
      _ref$role = _ref.role,
      role = _ref$role === void 0 ? 'dialog' : _ref$role,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      _ref$backdrop = _ref.backdrop,
      backdrop = _ref$backdrop === void 0 ? true : _ref$backdrop,
      _ref$keyboard = _ref.keyboard,
      keyboard = _ref$keyboard === void 0 ? true : _ref$keyboard,
      onBackdropClick = _ref.onBackdropClick,
      onEscapeKeyDown = _ref.onEscapeKeyDown,
      transition = _ref.transition,
      backdropTransition = _ref.backdropTransition,
      _ref$autoFocus = _ref.autoFocus,
      autoFocus = _ref$autoFocus === void 0 ? true : _ref$autoFocus,
      _ref$enforceFocus = _ref.enforceFocus,
      enforceFocus = _ref$enforceFocus === void 0 ? true : _ref$enforceFocus,
      _ref$restoreFocus = _ref.restoreFocus,
      restoreFocus = _ref$restoreFocus === void 0 ? true : _ref$restoreFocus,
      restoreFocusOptions = _ref.restoreFocusOptions,
      renderDialog = _ref.renderDialog,
      _ref$renderBackdrop = _ref.renderBackdrop,
      renderBackdrop = _ref$renderBackdrop === void 0 ? function (props) {
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", props);
  } : _ref$renderBackdrop,
      providedManager = _ref.manager,
      containerRef = _ref.container,
      containerClassName = _ref.containerClassName,
      onShow = _ref.onShow,
      _ref$onHide = _ref.onHide,
      onHide = _ref$onHide === void 0 ? function () {} : _ref$onHide,
      onExit = _ref.onExit,
      onExited = _ref.onExited,
      onExiting = _ref.onExiting,
      onEnter = _ref.onEnter,
      onEntering = _ref.onEntering,
      onEntered = _ref.onEntered,
      rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, ["show", "role", "className", "style", "children", "backdrop", "keyboard", "onBackdropClick", "onEscapeKeyDown", "transition", "backdropTransition", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "renderDialog", "renderBackdrop", "manager", "container", "containerClassName", "onShow", "onHide", "onExit", "onExited", "onExiting", "onEnter", "onEntering", "onEntered"]);

  var container = useWaitForDOMRef(containerRef);
  var modal = useModalManager(providedManager);
  var isMounted = useMounted();
  var prevShow = usePrevious(show);

  var _useState = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(!show),
      exited = _useState[0],
      setExited = _useState[1];

  var lastFocusRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useImperativeHandle)(ref, function () {
    return modal;
  }, [modal]);

  if (canUseDOM && !prevShow && show) {
    lastFocusRef.current = activeElement();
  }

  if (!transition && !show && !exited) {
    setExited(true);
  } else if (show && exited) {
    setExited(false);
  }

  var handleShow = useEventCallback(function () {
    modal.add(container, containerClassName);
    removeKeydownListenerRef.current = esm_listen(document, 'keydown', handleDocumentKeyDown);
    removeFocusListenerRef.current = esm_listen(document, 'focus', // the timeout is necessary b/c this will run before the new modal is mounted
    // and so steals focus from it
    function () {
      return setTimeout(handleEnforceFocus);
    }, true);

    if (onShow) {
      onShow();
    } // autofocus after onShow to not trigger a focus event for previous
    // modals before this one is shown.


    if (autoFocus) {
      var currentActiveElement = activeElement(document);

      if (modal.dialog && currentActiveElement && !contains_contains(modal.dialog, currentActiveElement)) {
        lastFocusRef.current = currentActiveElement;
        modal.dialog.focus();
      }
    }
  });
  var handleHide = useEventCallback(function () {
    modal.remove();
    removeKeydownListenerRef.current == null ? void 0 : removeKeydownListenerRef.current();
    removeFocusListenerRef.current == null ? void 0 : removeFocusListenerRef.current();

    if (restoreFocus) {
      var _lastFocusRef$current; // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)


      (_lastFocusRef$current = lastFocusRef.current) == null ? void 0 : _lastFocusRef$current.focus == null ? void 0 : _lastFocusRef$current.focus(restoreFocusOptions);
      lastFocusRef.current = null;
    }
  }); // TODO: try and combine these effects: https://github.com/react-bootstrap/react-overlays/pull/794#discussion_r409954120
  // Show logic when:
  //  - show is `true` _and_ `container` has resolved

  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (!show || !container) return;
    handleShow();
  }, [show, container,
  /* should never change: */
  handleShow]); // Hide cleanup logic when:
  //  - `exited` switches to true
  //  - component unmounts;

  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (!exited) return;
    handleHide();
  }, [exited, handleHide]);
  useWillUnmount(function () {
    handleHide();
  }); // --------------------------------

  var handleEnforceFocus = useEventCallback(function () {
    if (!enforceFocus || !isMounted() || !modal.isTopModal()) {
      return;
    }

    var currentActiveElement = activeElement();

    if (modal.dialog && currentActiveElement && !contains_contains(modal.dialog, currentActiveElement)) {
      modal.dialog.focus();
    }
  });
  var handleBackdropClick = useEventCallback(function (e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    onBackdropClick == null ? void 0 : onBackdropClick(e);

    if (backdrop === true) {
      onHide();
    }
  });
  var handleDocumentKeyDown = useEventCallback(function (e) {
    if (keyboard && e.keyCode === 27 && modal.isTopModal()) {
      onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);

      if (!e.defaultPrevented) {
        onHide();
      }
    }
  });
  var removeFocusListenerRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)();
  var removeKeydownListenerRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)();

  var handleHidden = function handleHidden() {
    setExited(true);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    onExited == null ? void 0 : onExited.apply(void 0, args);
  };

  var Transition = transition;

  if (!container || !(show || Transition && !exited)) {
    return null;
  }

  var dialogProps = extends_extends({
    role: role,
    ref: modal.setDialogRef,
    // apparently only works on the dialog role element
    'aria-modal': role === 'dialog' ? true : undefined
  }, rest, {
    style: style,
    className: className,
    tabIndex: -1
  });

  var dialog = renderDialog ? renderDialog(dialogProps) : /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", dialogProps, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(children, {
    role: 'document'
  }));

  if (Transition) {
    dialog = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Transition, {
      appear: true,
      unmountOnExit: true,
      "in": !!show,
      onExit: onExit,
      onExiting: onExiting,
      onExited: handleHidden,
      onEnter: onEnter,
      onEntering: onEntering,
      onEntered: onEntered
    }, dialog);
  }

  var backdropElement = null;

  if (backdrop) {
    var BackdropTransition = backdropTransition;
    backdropElement = renderBackdrop({
      ref: modal.setBackdropRef,
      onClick: handleBackdropClick
    });

    if (BackdropTransition) {
      backdropElement = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(BackdropTransition, {
        appear: true,
        "in": !!show
      }, backdropElement);
    }
  }

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Fragment, null, /*#__PURE__*/external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().createPortal( /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Fragment, null, backdropElement, dialog), container));
});
var Modal_propTypes = {
  /**
   * Set the visibility of the Modal
   */
  show: (prop_types_default()).bool,

  /**
   * A DOM element, a `ref` to an element, or function that returns either. The Modal is appended to it's `container` element.
   *
   * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
   * page content can be placed behind a virtual backdrop as well as a visual one.
   */
  container: (prop_types_default()).any,

  /**
   * A callback fired when the Modal is opening.
   */
  onShow: (prop_types_default()).func,

  /**
   * A callback fired when either the backdrop is clicked, or the escape key is pressed.
   *
   * The `onHide` callback only signals intent from the Modal,
   * you must actually set the `show` prop to `false` for the Modal to close.
   */
  onHide: (prop_types_default()).func,

  /**
   * Include a backdrop component.
   */
  backdrop: prop_types_default().oneOfType([(prop_types_default()).bool, prop_types_default().oneOf(['static'])]),

  /**
   * A function that returns the dialog component. Useful for custom
   * rendering. **Note:** the component should make sure to apply the provided ref.
   *
   * ```js static
   * renderDialog={props => <MyDialog {...props} />}
   * ```
   */
  renderDialog: (prop_types_default()).func,

  /**
   * A function that returns a backdrop component. Useful for custom
   * backdrop rendering.
   *
   * ```js
   *  renderBackdrop={props => <MyBackdrop {...props} />}
   * ```
   */
  renderBackdrop: (prop_types_default()).func,

  /**
   * A callback fired when the escape key, if specified in `keyboard`, is pressed.
   *
   * If preventDefault() is called on the keyboard event, closing the modal will be cancelled.
   */
  onEscapeKeyDown: (prop_types_default()).func,

  /**
   * A callback fired when the backdrop, if specified, is clicked.
   */
  onBackdropClick: (prop_types_default()).func,

  /**
   * A css class or set of classes applied to the modal container when the modal is open,
   * and removed when it is closed.
   */
  containerClassName: (prop_types_default()).string,

  /**
   * Close the modal when escape key is pressed
   */
  keyboard: (prop_types_default()).bool,

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component used
   * to control animations for the dialog component.
   */
  transition: (prop_types_default()).elementType,

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component used
   * to control animations for the backdrop components.
   */
  backdropTransition: (prop_types_default()).elementType,

  /**
   * When `true` The modal will automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes. This also
   * works correctly with any Modal children that have the `autoFocus` prop.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
   */
  autoFocus: (prop_types_default()).bool,

  /**
   * When `true` The modal will prevent focus from leaving the Modal while open.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
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
  manager: prop_types_default().instanceOf(esm_ModalManager)
};
Modal.displayName = 'Modal';
Modal.propTypes = Modal_propTypes;
/* harmony default export */ const esm_Modal = (Object.assign(Modal, {
  Manager: esm_ModalManager
}));
;// CONCATENATED MODULE: ./src/BootstrapModalManager.tsx





var Selector = {
  FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
  STICKY_CONTENT: '.sticky-top',
  NAVBAR_TOGGLER: '.navbar-toggler'
};

var BootstrapModalManager = /*#__PURE__*/function (_ModalManager) {
  inheritsLoose_inheritsLoose(BootstrapModalManager, _ModalManager);

  function BootstrapModalManager() {
    return _ModalManager.apply(this, arguments) || this;
  }

  var _proto = BootstrapModalManager.prototype;

  _proto.adjustAndStore = function adjustAndStore(prop, element, adjust) {
    var _css;

    var actual = element.style[prop]; // TODO: DOMStringMap and CSSStyleDeclaration aren't strictly compatible
    // @ts-ignore

    element.dataset[prop] = actual;
    css(element, (_css = {}, _css[prop] = parseFloat(css(element, prop)) + adjust + "px", _css));
  };

  _proto.restore = function restore(prop, element) {
    var value = element.dataset[prop];

    if (value !== undefined) {
      var _css2;

      delete element.dataset[prop];
      css(element, (_css2 = {}, _css2[prop] = value, _css2));
    }
  };

  _proto.setContainerStyle = function setContainerStyle(containerState, container) {
    var _this = this;

    _ModalManager.prototype.setContainerStyle.call(this, containerState, container);

    if (!containerState.overflowing) return;
    var size = scrollbarSize();
    qsa(container, Selector.FIXED_CONTENT).forEach(function (el) {
      return _this.adjustAndStore('paddingRight', el, size);
    });
    qsa(container, Selector.STICKY_CONTENT).forEach(function (el) {
      return _this.adjustAndStore('marginRight', el, -size);
    });
    qsa(container, Selector.NAVBAR_TOGGLER).forEach(function (el) {
      return _this.adjustAndStore('marginRight', el, size);
    });
  };

  _proto.removeContainerStyle = function removeContainerStyle(containerState, container) {
    var _this2 = this;

    _ModalManager.prototype.removeContainerStyle.call(this, containerState, container);

    qsa(container, Selector.FIXED_CONTENT).forEach(function (el) {
      return _this2.restore('paddingRight', el);
    });
    qsa(container, Selector.STICKY_CONTENT).forEach(function (el) {
      return _this2.restore('marginRight', el);
    });
    qsa(container, Selector.NAVBAR_TOGGLER).forEach(function (el) {
      return _this2.restore('marginRight', el);
    });
  };

  return BootstrapModalManager;
}(esm_ModalManager);


;// CONCATENATED MODULE: ./src/ModalBody.tsx

/* harmony default export */ const ModalBody = (createWithBsPrefix('modal-body'));
;// CONCATENATED MODULE: ./src/ModalContext.tsx

var ModalContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onHide: function onHide() {}
});
/* harmony default export */ const src_ModalContext = (ModalContext);
;// CONCATENATED MODULE: ./src/ModalDialog.tsx


var ModalDialog_excluded = ["bsPrefix", "className", "contentClassName", "centered", "size", "children", "scrollable"];

var ModalDialog_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ModalDialog.tsx",
    ModalDialog_this = undefined;





var ModalDialog_propTypes = {
  /** @default 'modal' */
  bsPrefix: (prop_types_default()).string,
  contentClassName: (prop_types_default()).string,

  /**
   * Render a large, extra large or small modal.
   *
   * @type ('sm'|'lg','xl')
   */
  size: (prop_types_default()).string,

  /**
   * Specify whether the Component should be vertically centered
   */
  centered: (prop_types_default()).bool,

  /**
   * Allows scrolling the `<Modal.Body>` instead of the entire Modal when overflowing.
   */
  scrollable: (prop_types_default()).bool
};
var ModalDialog = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      contentClassName = _ref.contentClassName,
      centered = _ref.centered,
      size = _ref.size,
      children = _ref.children,
      scrollable = _ref.scrollable,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, ModalDialog_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'modal');
  var dialogClass = bsPrefix + "-dialog";
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({}, props, {
    ref: ref,
    className: classnames_default()(dialogClass, className, size && bsPrefix + "-" + size, centered && dialogClass + "-centered", scrollable && dialogClass + "-scrollable"),
    __self: ModalDialog_this,
    __source: {
      fileName: ModalDialog_jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }
  }), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
    className: classnames_default()(bsPrefix + "-content", contentClassName),
    __self: ModalDialog_this,
    __source: {
      fileName: ModalDialog_jsxFileName,
      lineNumber: 70,
      columnNumber: 9
    }
  }, children));
});
ModalDialog.displayName = 'ModalDialog';
ModalDialog.propTypes = ModalDialog_propTypes;
/* harmony default export */ const src_ModalDialog = (ModalDialog);
;// CONCATENATED MODULE: ./src/ModalFooter.tsx

/* harmony default export */ const ModalFooter = (createWithBsPrefix('modal-footer'));
;// CONCATENATED MODULE: ./src/ModalHeader.tsx


var ModalHeader_excluded = ["bsPrefix", "closeLabel", "closeButton", "onHide", "className", "children"];

var ModalHeader_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ModalHeader.tsx",
    ModalHeader_this = undefined;








var ModalHeader_propTypes = {
  bsPrefix: (prop_types_default()).string,

  /**
   * Provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  closeLabel: (prop_types_default()).string,

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
var ModalHeader_defaultProps = {
  closeLabel: 'Close',
  closeButton: false
};
var ModalHeader = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      closeLabel = _ref.closeLabel,
      closeButton = _ref.closeButton,
      onHide = _ref.onHide,
      className = _ref.className,
      children = _ref.children,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, ModalHeader_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-header');
  var context = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_ModalContext);
  var handleClick = useEventCallback(function () {
    if (context) context.onHide();
    if (onHide) onHide();
  });
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(className, bsPrefix),
    __self: ModalHeader_this,
    __source: {
      fileName: ModalHeader_jsxFileName,
      lineNumber: 70,
      columnNumber: 7
    }
  }), children, closeButton && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_CloseButton, {
    label: closeLabel,
    onClick: handleClick,
    __self: ModalHeader_this,
    __source: {
      fileName: ModalHeader_jsxFileName,
      lineNumber: 74,
      columnNumber: 11
    }
  }));
});
ModalHeader.displayName = 'ModalHeader';
ModalHeader.propTypes = ModalHeader_propTypes;
ModalHeader.defaultProps = ModalHeader_defaultProps;
/* harmony default export */ const src_ModalHeader = (ModalHeader);
;// CONCATENATED MODULE: ./src/ModalTitle.tsx


var ModalTitle_DivStyledAsH4 = divWithClassName('h4');
/* harmony default export */ const ModalTitle = (createWithBsPrefix('modal-title', {
  Component: ModalTitle_DivStyledAsH4
}));
;// CONCATENATED MODULE: ./src/Modal.tsx


var Modal_excluded = ["bsPrefix", "className", "style", "dialogClassName", "contentClassName", "children", "dialogAs", "aria-labelledby", "show", "animation", "backdrop", "keyboard", "onEscapeKeyDown", "onShow", "onHide", "container", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "onEntered", "onExit", "onExiting", "onEnter", "onEntering", "onExited", "backdropClassName", "manager"];

var Modal_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Modal.tsx",
    Modal_this = undefined;
























var Modal_manager;
var src_Modal_propTypes = {
  /**
   * @default 'modal'
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * Render a large, extra large or small modal.
   * When not provided, the modal is rendered with medium (default) size.
   * @type ('sm'|'lg','xl')
   */
  size: (prop_types_default()).string,

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
  'aria-labelledby': (prop_types_default()).any
};
var Modal_defaultProps = {
  show: false,
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  animation: true,
  dialogAs: src_ModalDialog
};
/* eslint-disable no-use-before-define, react/no-multi-comp */

function DialogTransition(props) {
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Fade, extends_extends({}, props, {
    timeout: null,
    __self: this,
    __source: {
      fileName: Modal_jsxFileName,
      lineNumber: 236,
      columnNumber: 10
    }
  }));
}

function BackdropTransition(props) {
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Fade, extends_extends({}, props, {
    timeout: null,
    __self: this,
    __source: {
      fileName: Modal_jsxFileName,
      lineNumber: 240,
      columnNumber: 10
    }
  }));
}
/* eslint-enable no-use-before-define */


var Modal_Modal = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      style = _ref.style,
      dialogClassName = _ref.dialogClassName,
      contentClassName = _ref.contentClassName,
      children = _ref.children,
      Dialog = _ref.dialogAs,
      ariaLabelledby = _ref['aria-labelledby'],
      show = _ref.show,
      animation = _ref.animation,
      backdrop = _ref.backdrop,
      keyboard = _ref.keyboard,
      onEscapeKeyDown = _ref.onEscapeKeyDown,
      onShow = _ref.onShow,
      onHide = _ref.onHide,
      container = _ref.container,
      autoFocus = _ref.autoFocus,
      enforceFocus = _ref.enforceFocus,
      restoreFocus = _ref.restoreFocus,
      restoreFocusOptions = _ref.restoreFocusOptions,
      onEntered = _ref.onEntered,
      onExit = _ref.onExit,
      onExiting = _ref.onExiting,
      onEnter = _ref.onEnter,
      onEntering = _ref.onEntering,
      onExited = _ref.onExited,
      backdropClassName = _ref.backdropClassName,
      propsManager = _ref.manager,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Modal_excluded);

  var _useState = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)({}),
      modalStyle = _useState[0],
      setStyle = _useState[1];

  var _useState2 = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(false),
      animateStaticModal = _useState2[0],
      setAnimateStaticModal = _useState2[1];

  var waitingForMouseUpRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(false);
  var ignoreBackdropClickRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(false);
  var removeStaticModalAnimationRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null); // TODO: what's this type

  var _useCallbackRef = useCallbackRef(),
      modal = _useCallbackRef[0],
      setModalRef = _useCallbackRef[1];

  var handleHide = useEventCallback(onHide);
  bsPrefix = useBootstrapPrefix(bsPrefix, 'modal');
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useImperativeHandle)(ref, function () {
    return {
      get _modal() {
         false ? 0 : void 0;
        return modal;
      }

    };
  }, [modal]);
  var modalContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return {
      onHide: handleHide
    };
  }, [handleHide]);

  function getModalManager() {
    if (propsManager) return propsManager;
    if (!Modal_manager) Modal_manager = new BootstrapModalManager();
    return Modal_manager;
  }

  function updateDialogStyle(node) {
    if (!canUseDOM) return;
    var containerIsOverflowing = getModalManager().isContainerOverflowing(modal);
    var modalIsOverflowing = node.scrollHeight > ownerDocument(node).documentElement.clientHeight;
    setStyle({
      paddingRight: containerIsOverflowing && !modalIsOverflowing ? scrollbarSize() : undefined,
      paddingLeft: !containerIsOverflowing && modalIsOverflowing ? scrollbarSize() : undefined
    });
  }

  var handleWindowResize = useEventCallback(function () {
    if (modal) {
      updateDialogStyle(modal.dialog);
    }
  });
  useWillUnmount(function () {
    esm_removeEventListener(window, 'resize', handleWindowResize);

    if (removeStaticModalAnimationRef.current) {
      removeStaticModalAnimationRef.current();
    }
  }); // We prevent the modal from closing during a drag by detecting where the
  // the click originates from. If it starts in the modal and then ends outside
  // don't close.

  var handleDialogMouseDown = function handleDialogMouseDown() {
    waitingForMouseUpRef.current = true;
  };

  var handleMouseUp = function handleMouseUp(e) {
    if (waitingForMouseUpRef.current && modal && e.target === modal.dialog) {
      ignoreBackdropClickRef.current = true;
    }

    waitingForMouseUpRef.current = false;
  };

  var handleStaticModalAnimation = function handleStaticModalAnimation() {
    setAnimateStaticModal(true);
    removeStaticModalAnimationRef.current = transitionEnd(modal.dialog, function () {
      setAnimateStaticModal(false);
    });
  };

  var handleStaticBackdropClick = function handleStaticBackdropClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    handleStaticModalAnimation();
  };

  var handleClick = function handleClick(e) {
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

  var handleEscapeKeyDown = function handleEscapeKeyDown(e) {
    if (!keyboard && backdrop === 'static') {
      // Call preventDefault to stop modal from closing in react-overlays,
      // then play our animation.
      e.preventDefault();
      handleStaticModalAnimation();
    } else if (keyboard && onEscapeKeyDown) {
      onEscapeKeyDown(e);
    }
  };

  var handleEnter = function handleEnter(node, isAppearing) {
    if (node) {
      node.style.display = 'block';
      updateDialogStyle(node);
    }

    onEnter == null ? void 0 : onEnter(node, isAppearing);
  };

  var handleExit = function handleExit(node) {
    removeStaticModalAnimationRef.current == null ? void 0 : removeStaticModalAnimationRef.current();
    onExit == null ? void 0 : onExit(node);
  };

  var handleEntering = function handleEntering(node, isAppearing) {
    onEntering == null ? void 0 : onEntering(node, isAppearing); // FIXME: This should work even when animation is disabled.

    esm_addEventListener(window, 'resize', handleWindowResize);
  };

  var handleExited = function handleExited(node) {
    if (node) node.style.display = ''; // RHL removes it sometimes

    onExited == null ? void 0 : onExited(node); // FIXME: This should work even when animation is disabled.

    esm_removeEventListener(window, 'resize', handleWindowResize);
  };

  var renderBackdrop = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (backdropProps) {
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({}, backdropProps, {
      className: classnames_default()(bsPrefix + "-backdrop", backdropClassName, !animation && 'show'),
      __self: Modal_this,
      __source: {
        fileName: Modal_jsxFileName,
        lineNumber: 445,
        columnNumber: 9
      }
    }));
  }, [animation, backdropClassName, bsPrefix]);

  var baseModalStyle = extends_extends({}, style, modalStyle); // Sets `display` always block when `animation` is false


  if (!animation) {
    baseModalStyle.display = 'block';
  }

  var renderDialog = function renderDialog(dialogProps) {
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({
      role: "dialog"
    }, dialogProps, {
      style: baseModalStyle,
      className: classnames_default()(className, bsPrefix, animateStaticModal && bsPrefix + "-static"),
      onClick: backdrop ? handleClick : undefined,
      onMouseUp: handleMouseUp,
      "aria-labelledby": ariaLabelledby,
      __self: Modal_this,
      __source: {
        fileName: Modal_jsxFileName,
        lineNumber: 465,
        columnNumber: 7
      }
    }), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Dialog, extends_extends({}, props, {
      onMouseDown: handleDialogMouseDown,
      className: dialogClassName,
      contentClassName: contentClassName,
      __self: Modal_this,
      __source: {
        fileName: Modal_jsxFileName,
        lineNumber: 480,
        columnNumber: 9
      }
    }), children));
  };

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_ModalContext.Provider, {
    value: modalContext,
    __self: Modal_this,
    __source: {
      fileName: Modal_jsxFileName,
      lineNumber: 492,
      columnNumber: 7
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(esm_Modal, {
    show: show,
    ref: setModalRef,
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
    containerClassName: bsPrefix + "-open",
    transition: animation ? DialogTransition : undefined,
    backdropTransition: animation ? BackdropTransition : undefined,
    renderBackdrop: renderBackdrop,
    renderDialog: renderDialog,
    __self: Modal_this,
    __source: {
      fileName: Modal_jsxFileName,
      lineNumber: 493,
      columnNumber: 9
    }
  }));
});
Modal_Modal.displayName = 'Modal';
Modal_Modal.propTypes = src_Modal_propTypes;
Modal_Modal.defaultProps = Modal_defaultProps;
Modal_Modal.Body = ModalBody;
Modal_Modal.Header = src_ModalHeader;
Modal_Modal.Title = ModalTitle;
Modal_Modal.Footer = ModalFooter;
Modal_Modal.Dialog = src_ModalDialog;
Modal_Modal.TRANSITION_DURATION = 300;
Modal_Modal.BACKDROP_TRANSITION_DURATION = 150;
/* harmony default export */ const src_Modal = (Modal_Modal);
;// CONCATENATED MODULE: ./src/NavItem.tsx


var NavItem_excluded = ["bsPrefix", "className", "children", "as"];

var NavItem_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/NavItem.tsx",
    NavItem_this = undefined;





var NavItem_propTypes = {
  /**
   * @default 'nav-item'
   */
  bsPrefix: (prop_types_default()).string,

  /** The ARIA role of the component */
  role: (prop_types_default()).string,
  as: (prop_types_default()).elementType
};
var NavItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, NavItem_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-item');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    __self: NavItem_this,
    __source: {
      fileName: NavItem_jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }
  }), children);
});
NavItem.displayName = 'NavItem';
NavItem.propTypes = NavItem_propTypes;
/* harmony default export */ const src_NavItem = (NavItem);
;// CONCATENATED MODULE: ./src/NavLink.tsx


var NavLink_excluded = ["bsPrefix", "disabled", "className", "href", "eventKey", "onSelect", "as"];

var NavLink_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/NavLink.tsx",
    NavLink_this = undefined;







var NavLink_propTypes = {
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

  /** A callback fired when the `NavLink` is selected.
   *
   * ```js
   * function (eventKey: any, event: SyntheticEvent) {}
   * ```
   */
  onSelect: (prop_types_default()).func,

  /**
   * Uniquely idenifies the `NavItem` amongst its siblings,
   * used to determine and control the active state of the parent `Nav`
   */
  eventKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]),

  /** @default 'a' */
  as: (prop_types_default()).elementType
};
var NavLink_defaultProps = {
  disabled: false,
  as: src_SafeAnchor
};
var NavLink = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      disabled = _ref.disabled,
      className = _ref.className,
      href = _ref.href,
      eventKey = _ref.eventKey,
      onSelect = _ref.onSelect,
      as = _ref.as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, NavLink_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-link');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_AbstractNavItem, extends_extends({}, props, {
    href: href,
    ref: ref,
    eventKey: eventKey,
    as: as,
    disabled: disabled,
    onSelect: onSelect,
    className: classnames_default()(className, bsPrefix, disabled && 'disabled'),
    __self: NavLink_this,
    __source: {
      fileName: NavLink_jsxFileName,
      lineNumber: 91,
      columnNumber: 7
    }
  }));
});
NavLink.displayName = 'NavLink';
NavLink.propTypes = NavLink_propTypes;
NavLink.defaultProps = NavLink_defaultProps;
/* harmony default export */ const src_NavLink = (NavLink);
;// CONCATENATED MODULE: ./src/Nav.tsx


var Nav_excluded = ["as", "bsPrefix", "variant", "fill", "justify", "navbar", "navbarScroll", "className", "children", "activeKey"];

var Nav_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Nav.tsx",
    Nav_this = undefined;












var Nav_propTypes = {
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
   * @type {('tabs'|'pills')}
   */
  variant: (prop_types_default()).string,

  /**
   * Marks the NavItem with a matching `eventKey` (or `href` if present) as active.
   *
   * @type {string}
   */
  activeKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]),

  /**
   * Have all `NavItem`s proportionately fill all available width.
   */
  fill: (prop_types_default()).bool,

  /**
   * Have all `NavItem`s evenly fill all available width.
   *
   * @type {boolean}
   */
  justify: all_default()((prop_types_default()).bool, function (_ref) {
    var justify = _ref.justify,
        navbar = _ref.navbar;
    return justify && navbar ? Error('justify navbar `Nav`s are not supported') : null;
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
var Nav_defaultProps = {
  justify: false,
  fill: false
};
var Nav = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (uncontrolledProps, ref) {
  var _classNames;

  var _useUncontrolled = useUncontrolled(uncontrolledProps, {
    activeKey: 'onSelect'
  }),
      _useUncontrolled$as = _useUncontrolled.as,
      as = _useUncontrolled$as === void 0 ? 'div' : _useUncontrolled$as,
      initialBsPrefix = _useUncontrolled.bsPrefix,
      variant = _useUncontrolled.variant,
      fill = _useUncontrolled.fill,
      justify = _useUncontrolled.justify,
      navbar = _useUncontrolled.navbar,
      navbarScroll = _useUncontrolled.navbarScroll,
      className = _useUncontrolled.className,
      children = _useUncontrolled.children,
      activeKey = _useUncontrolled.activeKey,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_useUncontrolled, Nav_excluded);

  var bsPrefix = useBootstrapPrefix(initialBsPrefix, 'nav');
  var navbarBsPrefix;
  var cardHeaderBsPrefix;
  var isNavbar = false;
  var navbarContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(NavbarContext);
  var cardContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(CardContext);

  if (navbarContext) {
    navbarBsPrefix = navbarContext.bsPrefix;
    isNavbar = navbar == null ? true : navbar;
  } else if (cardContext) {
    cardHeaderBsPrefix = cardContext.cardHeaderBsPrefix;
  }

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_AbstractNav, extends_extends({
    as: as,
    ref: ref,
    activeKey: activeKey,
    className: classnames_default()(className, (_classNames = {}, _classNames[bsPrefix] = !isNavbar, _classNames[navbarBsPrefix + "-nav"] = isNavbar, _classNames[navbarBsPrefix + "-nav-scroll"] = isNavbar && navbarScroll, _classNames[cardHeaderBsPrefix + "-" + variant] = !!cardHeaderBsPrefix, _classNames[bsPrefix + "-" + variant] = !!variant, _classNames[bsPrefix + "-fill"] = fill, _classNames[bsPrefix + "-justified"] = justify, _classNames))
  }, props, {
    __self: Nav_this,
    __source: {
      fileName: Nav_jsxFileName,
      lineNumber: 156,
      columnNumber: 5
    }
  }), children);
});
Nav.displayName = 'Nav';
Nav.propTypes = Nav_propTypes;
Nav.defaultProps = Nav_defaultProps;
Nav.Item = src_NavItem;
Nav.Link = src_NavLink;
/* harmony default export */ const src_Nav = (Nav);
;// CONCATENATED MODULE: ./src/NavbarBrand.tsx


var NavbarBrand_excluded = ["bsPrefix", "className", "as"];

var NavbarBrand_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/NavbarBrand.tsx",
    NavbarBrand_this = undefined;





var NavbarBrand_propTypes = {
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
var NavbarBrand = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      as = _ref.as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, NavbarBrand_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-brand');
  var Component = as || (props.href ? 'a' : 'span');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    ref: ref,
    className: classnames_default()(className, bsPrefix),
    __self: NavbarBrand_this,
    __source: {
      fileName: NavbarBrand_jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }
  }));
});
NavbarBrand.displayName = 'NavbarBrand';
NavbarBrand.propTypes = NavbarBrand_propTypes;
/* harmony default export */ const src_NavbarBrand = (NavbarBrand);
;// CONCATENATED MODULE: ./src/NavbarCollapse.tsx


var NavbarCollapse_excluded = ["children", "bsPrefix"];

var NavbarCollapse_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/NavbarCollapse.tsx",
    NavbarCollapse_this = undefined;






var NavbarCollapse_propTypes = {
  /** @default 'navbar-collapse' */
  bsPrefix: (prop_types_default()).string
};
var NavbarCollapse = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var children = _ref.children,
      bsPrefix = _ref.bsPrefix,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, NavbarCollapse_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-collapse');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(NavbarContext.Consumer, {
    __self: NavbarCollapse_this,
    __source: {
      fileName: NavbarCollapse_jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }
  }, function (context) {
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Collapse, extends_extends({
      in: !!(context && context.expanded)
    }, props, {
      __self: NavbarCollapse_this,
      __source: {
        fileName: NavbarCollapse_jsxFileName,
        lineNumber: 25,
        columnNumber: 11
      }
    }), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      ref: ref,
      className: bsPrefix,
      __self: NavbarCollapse_this,
      __source: {
        fileName: NavbarCollapse_jsxFileName,
        lineNumber: 26,
        columnNumber: 13
      }
    }, children));
  });
});
NavbarCollapse.displayName = 'NavbarCollapse';
NavbarCollapse.propTypes = NavbarCollapse_propTypes;
/* harmony default export */ const src_NavbarCollapse = (NavbarCollapse);
;// CONCATENATED MODULE: ./src/NavbarToggle.tsx


var NavbarToggle_excluded = ["bsPrefix", "className", "children", "label", "as", "onClick"];

var NavbarToggle_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/NavbarToggle.tsx",
    NavbarToggle_this = undefined;







var NavbarToggle_propTypes = {
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
var NavbarToggle_defaultProps = {
  label: 'Toggle navigation'
};
var NavbarToggle = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      label = _ref.label,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'button' : _ref$as,
      onClick = _ref.onClick,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, NavbarToggle_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'navbar-toggler');

  var _ref2 = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(NavbarContext) || {},
      onToggle = _ref2.onToggle,
      expanded = _ref2.expanded;

  var handleClick = useEventCallback(function (e) {
    if (onClick) onClick(e);
    if (onToggle) onToggle();
  });

  if (Component === 'button') {
    props.type = 'button';
  }

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, props, {
    ref: ref,
    onClick: handleClick,
    "aria-label": label,
    className: classnames_default()(className, bsPrefix, !expanded && 'collapsed'),
    __self: NavbarToggle_this,
    __source: {
      fileName: NavbarToggle_jsxFileName,
      lineNumber: 70,
      columnNumber: 7
    }
  }), children || /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
    className: bsPrefix + "-icon",
    __self: NavbarToggle_this,
    __source: {
      fileName: NavbarToggle_jsxFileName,
      lineNumber: 77,
      columnNumber: 22
    }
  }));
});
NavbarToggle.displayName = 'NavbarToggle';
NavbarToggle.propTypes = NavbarToggle_propTypes;
NavbarToggle.defaultProps = NavbarToggle_defaultProps;
/* harmony default export */ const src_NavbarToggle = (NavbarToggle);
;// CONCATENATED MODULE: ./src/Navbar.tsx


var Navbar_excluded = ["bsPrefix", "expand", "variant", "bg", "fixed", "sticky", "className", "children", "as", "expanded", "onToggle", "onSelect", "collapseOnSelect"];

var Navbar_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Navbar.tsx",
    Navbar_this = undefined;












var NavbarText = createWithBsPrefix('navbar-text', {
  Component: 'span'
});
var Navbar_propTypes = {
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
  expand: prop_types_default().oneOf([true, 'sm', 'md', 'lg', 'xl']).isRequired,

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
   * Controls the visiblity of the navbar body
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
var Navbar_defaultProps = {
  expand: true,
  variant: 'light',
  collapseOnSelect: false
};
var Navbar = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (props, ref) {
  var _useUncontrolled = useUncontrolled(props, {
    expanded: 'onToggle'
  }),
      initialBsPrefix = _useUncontrolled.bsPrefix,
      expand = _useUncontrolled.expand,
      variant = _useUncontrolled.variant,
      bg = _useUncontrolled.bg,
      fixed = _useUncontrolled.fixed,
      sticky = _useUncontrolled.sticky,
      className = _useUncontrolled.className,
      children = _useUncontrolled.children,
      _useUncontrolled$as = _useUncontrolled.as,
      Component = _useUncontrolled$as === void 0 ? 'nav' : _useUncontrolled$as,
      expanded = _useUncontrolled.expanded,
      _onToggle = _useUncontrolled.onToggle,
      onSelect = _useUncontrolled.onSelect,
      collapseOnSelect = _useUncontrolled.collapseOnSelect,
      controlledProps = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_useUncontrolled, Navbar_excluded);

  var bsPrefix = useBootstrapPrefix(initialBsPrefix, 'navbar');
  var handleCollapse = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    if (onSelect) onSelect.apply(void 0, arguments);

    if (collapseOnSelect && expanded) {
      if (_onToggle) {
        _onToggle(false);
      }
    }
  }, [onSelect, collapseOnSelect, expanded, _onToggle]); // will result in some false positives but that seems better
  // than false negatives. strict `undefined` check allows explicit
  // "nulling" of the role if the user really doesn't want one

  if (controlledProps.role === undefined && Component !== 'nav') {
    controlledProps.role = 'navigation';
  }

  var expandClass = bsPrefix + "-expand";
  if (typeof expand === 'string') expandClass = expandClass + "-" + expand;
  var navbarContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return {
      onToggle: function onToggle() {
        return _onToggle && _onToggle(!expanded);
      },
      bsPrefix: bsPrefix,
      expanded: !!expanded
    };
  }, [bsPrefix, expanded, _onToggle]);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(NavbarContext.Provider, {
    value: navbarContext,
    __self: Navbar_this,
    __source: {
      fileName: Navbar_jsxFileName,
      lineNumber: 208,
      columnNumber: 5
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SelectableContext.Provider, {
    value: handleCollapse,
    __self: Navbar_this,
    __source: {
      fileName: Navbar_jsxFileName,
      lineNumber: 209,
      columnNumber: 7
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref
  }, controlledProps, {
    className: classnames_default()(className, bsPrefix, expand && expandClass, variant && bsPrefix + "-" + variant, bg && "bg-" + bg, sticky && "sticky-" + sticky, fixed && "fixed-" + fixed),
    __self: Navbar_this,
    __source: {
      fileName: Navbar_jsxFileName,
      lineNumber: 210,
      columnNumber: 9
    }
  }), children)));
});
Navbar.propTypes = Navbar_propTypes;
Navbar.defaultProps = Navbar_defaultProps;
Navbar.displayName = 'Navbar';
Navbar.Brand = src_NavbarBrand;
Navbar.Toggle = src_NavbarToggle;
Navbar.Collapse = src_NavbarCollapse;
Navbar.Text = NavbarText;
/* harmony default export */ const src_Navbar = (Navbar);
;// CONCATENATED MODULE: ./src/NavDropdown.tsx


var NavDropdown_excluded = ["id", "title", "children", "bsPrefix", "className", "rootCloseEvent", "menuRole", "disabled", "active", "renderMenuOnMount"];

var NavDropdown_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/NavDropdown.tsx",
    NavDropdown_this = undefined;







var NavDropdown_propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: (prop_types_default()).any,

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

  /** @ignore */
  bsPrefix: (prop_types_default()).string
};
var NavDropdown = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var id = _ref.id,
      title = _ref.title,
      children = _ref.children,
      bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      rootCloseEvent = _ref.rootCloseEvent,
      menuRole = _ref.menuRole,
      disabled = _ref.disabled,
      active = _ref.active,
      renderMenuOnMount = _ref.renderMenuOnMount,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, NavDropdown_excluded);

  /* NavItem has no additional logic, it's purely presentational. Can set nav item class here to support "as" */
  var navItemPrefix = useBootstrapPrefix(undefined, 'nav-item');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Dropdown, extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(className, navItemPrefix),
    __self: NavDropdown_this,
    __source: {
      fileName: NavDropdown_jsxFileName,
      lineNumber: 87,
      columnNumber: 7
    }
  }), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Dropdown.Toggle, {
    id: id,
    eventKey: null,
    active: active,
    disabled: disabled,
    childBsPrefix: bsPrefix,
    as: src_NavLink,
    __self: NavDropdown_this,
    __source: {
      fileName: NavDropdown_jsxFileName,
      lineNumber: 92,
      columnNumber: 9
    }
  }, title), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Dropdown.Menu, {
    role: menuRole,
    renderOnMount: renderMenuOnMount,
    rootCloseEvent: rootCloseEvent,
    __self: NavDropdown_this,
    __source: {
      fileName: NavDropdown_jsxFileName,
      lineNumber: 103,
      columnNumber: 9
    }
  }, children));
});
NavDropdown.displayName = 'NavDropdown';
NavDropdown.propTypes = NavDropdown_propTypes;
NavDropdown.Item = src_Dropdown.Item;
NavDropdown.ItemText = src_Dropdown.ItemText;
NavDropdown.Divider = src_Dropdown.Divider;
NavDropdown.Header = src_Dropdown.Header;
/* harmony default export */ const src_NavDropdown = (NavDropdown);
;// CONCATENATED MODULE: ./node_modules/react-overlays/esm/Overlay.js












/**
 * Built on top of `Popper.js`, the overlay component is
 * great for custom tooltip overlays.
 */

var Overlay = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (props, outerRef) {
  var flip = props.flip,
      offset = props.offset,
      placement = props.placement,
      _props$containerPaddi = props.containerPadding,
      containerPadding = _props$containerPaddi === void 0 ? 5 : _props$containerPaddi,
      _props$popperConfig = props.popperConfig,
      popperConfig = _props$popperConfig === void 0 ? {} : _props$popperConfig,
      Transition = props.transition;

  var _useCallbackRef = useCallbackRef(),
      rootElement = _useCallbackRef[0],
      attachRef = _useCallbackRef[1];

  var _useCallbackRef2 = useCallbackRef(),
      arrowElement = _useCallbackRef2[0],
      attachArrowRef = _useCallbackRef2[1];

  var mergedRef = esm_useMergedRefs(attachRef, outerRef);
  var container = useWaitForDOMRef(props.container);
  var target = useWaitForDOMRef(props.target);

  var _useState = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(!props.show),
      exited = _useState[0],
      setExited = _useState[1];

  var _usePopper = esm_usePopper(target, rootElement, mergeOptionsWithPopperConfig({
    placement: placement,
    enableEvents: !!props.show,
    containerPadding: containerPadding || 5,
    flip: flip,
    offset: offset,
    arrowElement: arrowElement,
    popperConfig: popperConfig
  })),
      styles = _usePopper.styles,
      attributes = _usePopper.attributes,
      popper = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_usePopper, ["styles", "attributes"]);

  if (props.show) {
    if (exited) setExited(false);
  } else if (!props.transition && !exited) {
    setExited(true);
  }

  var handleHidden = function handleHidden() {
    setExited(true);

    if (props.onExited) {
      props.onExited.apply(props, arguments);
    }
  }; // Don't un-render the overlay while it's transitioning out.


  var mountOverlay = props.show || Transition && !exited;
  esm_useRootClose(rootElement, props.onHide, {
    disabled: !props.rootClose || props.rootCloseDisabled,
    clickTrigger: props.rootCloseEvent
  });

  if (!mountOverlay) {
    // Don't bother showing anything if we don't have to.
    return null;
  }

  var child = props.children(extends_extends({}, popper, {
    show: !!props.show,
    props: extends_extends({}, attributes.popper, {
      style: styles.popper,
      ref: mergedRef
    }),
    arrowProps: extends_extends({}, attributes.arrow, {
      style: styles.arrow,
      ref: attachArrowRef
    })
  }));

  if (Transition) {
    var onExit = props.onExit,
        onExiting = props.onExiting,
        onEnter = props.onEnter,
        onEntering = props.onEntering,
        onEntered = props.onEntered;
    child = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Transition, {
      "in": props.show,
      appear: true,
      onExit: onExit,
      onExiting: onExiting,
      onExited: handleHidden,
      onEnter: onEnter,
      onEntering: onEntering,
      onEntered: onEntered
    }, child);
  }

  return container ? /*#__PURE__*/external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().createPortal(child, container) : null;
});
Overlay.displayName = 'Overlay';
Overlay.propTypes = {
  /**
   * Set the visibility of the Overlay
   */
  show: (prop_types_default()).bool,

  /** Specify where the overlay element is positioned in relation to the target element */
  placement: prop_types_default().oneOf(enums_placements),

  /**
   * A DOM Element, Ref to an element, or function that returns either. The `target` element is where
   * the overlay is positioned relative to.
   */
  target: (prop_types_default()).any,

  /**
   * A DOM Element, Ref to an element, or function that returns either. The `container` will have the Portal children
   * appended to it.
   */
  container: (prop_types_default()).any,

  /**
   * Enables the Popper.js `flip` modifier, allowing the Overlay to
   * automatically adjust it's placement in case of overlap with the viewport or toggle.
   * Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
   */
  flip: (prop_types_default()).bool,

  /**
   * A render prop that returns an element to overlay and position. See
   * the [react-popper documentation](https://github.com/FezVrasta/react-popper#children) for more info.
   *
   * @type {Function ({
   *   show: boolean,
   *   placement: Placement,
   *   update: () => void,
   *   forceUpdate: () => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     aria-labelledby: ?string
   *     [string]: string | number,
   *   },
   *   arrowProps: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     [string]: string | number,
   *   },
   * }) => React.Element}
   */
  children: (prop_types_default()).func.isRequired,

  /**
   * Control how much space there is between the edge of the boundary element and overlay.
   * A convenience shortcut to setting `popperConfig.modfiers.preventOverflow.padding`
   */
  containerPadding: (prop_types_default()).number,

  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig: (prop_types_default()).object,

  /**
   * Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
   */
  rootClose: (prop_types_default()).bool,

  /**
   * Specify event for toggling overlay
   */
  rootCloseEvent: prop_types_default().oneOf(['click', 'mousedown']),

  /**
   * Specify disabled for disable RootCloseWrapper
   */
  rootCloseDisabled: (prop_types_default()).bool,

  /**
   * A Callback fired by the Overlay when it wishes to be hidden.
   *
   * __required__ when `rootClose` is `true`.
   *
   * @type func
   */
  onHide: function onHide(props) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (props.rootClose) {
      var _PropTypes$func;

      return (_PropTypes$func = (prop_types_default()).func).isRequired.apply(_PropTypes$func, [props].concat(args));
    }

    return prop_types_default().func.apply((prop_types_default()), [props].concat(args));
  },

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component
   * used to animate the overlay as it changes visibility.
   */
  // @ts-ignore
  transition: (prop_types_default()).elementType,

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
  onExited: (prop_types_default()).func
};
/* harmony default export */ const esm_Overlay = (Overlay);
;// CONCATENATED MODULE: ./src/Overlay.tsx


var Overlay_excluded = ["children", "transition", "popperConfig"],
    _excluded2 = ["props", "arrowProps", "show", "update", "forceUpdate", "placement", "state"];
var Overlay_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Overlay.tsx";








var Overlay_propTypes = {
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
var Overlay_defaultProps = {
  transition: src_Fade,
  rootClose: false,
  show: false,
  placement: 'top'
};

function wrapRefs(props, arrowProps) {
  var ref = props.ref;
  var aRef = arrowProps.ref;

  props.ref = ref.__wrapped || (ref.__wrapped = function (r) {
    return ref(safeFindDOMNode(r));
  });

  arrowProps.ref = aRef.__wrapped || (aRef.__wrapped = function (r) {
    return aRef(safeFindDOMNode(r));
  });
}

function Overlay_Overlay(_ref) {
  var overlay = _ref.children,
      transition = _ref.transition,
      _ref$popperConfig = _ref.popperConfig,
      popperConfig = _ref$popperConfig === void 0 ? {} : _ref$popperConfig,
      outerProps = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Overlay_excluded);

  var popperRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)({});

  var _usePopperMarginModif = usePopperMarginModifiers(),
      ref = _usePopperMarginModif[0],
      marginModifiers = _usePopperMarginModif[1];

  var actualTransition = transition === true ? src_Fade : transition || null;
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(esm_Overlay, extends_extends({}, outerProps, {
    ref: ref,
    popperConfig: extends_extends({}, popperConfig, {
      modifiers: marginModifiers.concat(popperConfig.modifiers || [])
    }),
    transition: actualTransition,
    __self: this,
    __source: {
      fileName: Overlay_jsxFileName,
      lineNumber: 174,
      columnNumber: 5
    }
  }), function (_ref2) {
    var _state$modifiersData$;

    var overlayProps = _ref2.props,
        arrowProps = _ref2.arrowProps,
        show = _ref2.show,
        update = _ref2.update,
        _ = _ref2.forceUpdate,
        placement = _ref2.placement,
        state = _ref2.state,
        props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref2, _excluded2);

    wrapRefs(overlayProps, arrowProps);
    var popper = Object.assign(popperRef.current, {
      state: state,
      scheduleUpdate: update,
      placement: placement,
      outOfBoundaries: (state == null ? void 0 : (_state$modifiersData$ = state.modifiersData.hide) == null ? void 0 : _state$modifiersData$.isReferenceHidden) || false
    });
    if (typeof overlay === 'function') return overlay(extends_extends({}, props, overlayProps, {
      placement: placement,
      show: show
    }, !transition && show && {
      className: 'show'
    }, {
      popper: popper,
      arrowProps: arrowProps
    }));
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(overlay, extends_extends({}, props, overlayProps, {
      placement: placement,
      arrowProps: arrowProps,
      popper: popper,
      className: classnames_default()(overlay.props.className, !transition && show && 'show'),
      style: extends_extends({}, overlay.props.style, overlayProps.style)
    }));
  });
}

Overlay_Overlay.propTypes = Overlay_propTypes;
Overlay_Overlay.defaultProps = Overlay_defaultProps;
/* harmony default export */ const src_Overlay = (Overlay_Overlay);
;// CONCATENATED MODULE: ./src/OverlayTrigger.tsx



var OverlayTrigger_excluded = ["trigger", "overlay", "children", "popperConfig", "show", "defaultShow", "onToggle", "delay", "placement", "flip"];
var OverlayTrigger_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/OverlayTrigger.tsx";









var RefHolder = /*#__PURE__*/function (_React$Component) {
  inheritsLoose_inheritsLoose(RefHolder, _React$Component);

  function RefHolder() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = RefHolder.prototype;

  _proto.render = function render() {
    return this.props.children;
  };

  return RefHolder;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

function normalizeDelay(delay) {
  return delay && typeof delay === 'object' ? delay : {
    show: delay,
    hide: delay
  };
} // Simple implementation of mouseEnter and mouseLeave.
// React's built version is broken: https://github.com/facebook/react/issues/4251
// for cases when the trigger is disabled and mouseOut/Over can cause flicker
// moving from one child element to another.


function handleMouseOverOut( // eslint-disable-next-line @typescript-eslint/no-shadow
handler, args, relatedNative) {
  var e = args[0];
  var target = e.currentTarget;
  var related = e.relatedTarget || e.nativeEvent[relatedNative];

  if ((!related || related !== target) && !contains_contains(target, related)) {
    handler.apply(void 0, args);
  }
}

var triggerType = prop_types_default().oneOf(['click', 'hover', 'focus']);
var OverlayTrigger_propTypes = {
  children: prop_types_default().oneOfType([(prop_types_default()).element, (prop_types_default()).func]).isRequired,

  /**
   * Specify which action or actions trigger Overlay visibility
   *
   * @type {'hover' | 'click' |'focus' | Array<'hover' | 'click' |'focus'>}
   */
  trigger: prop_types_default().oneOfType([triggerType, prop_types_default().arrayOf(triggerType)]),

  /**
   * A millisecond delay amount to show and hide the Overlay once triggered
   */
  delay: prop_types_default().oneOfType([(prop_types_default()).number, prop_types_default().shape({
    show: (prop_types_default()).number,
    hide: (prop_types_default()).number
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
  overlay: prop_types_default().oneOfType([(prop_types_default()).func, (prop_types_default()).element.isRequired]),

  /**
   * A Popper.js config object passed to the the underlying popper instance.
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
var OverlayTrigger_defaultProps = {
  defaultShow: false,
  trigger: ['hover', 'focus']
};

function OverlayTrigger(_ref) {
  var trigger = _ref.trigger,
      overlay = _ref.overlay,
      children = _ref.children,
      _ref$popperConfig = _ref.popperConfig,
      popperConfig = _ref$popperConfig === void 0 ? {} : _ref$popperConfig,
      propsShow = _ref.show,
      _ref$defaultShow = _ref.defaultShow,
      defaultShow = _ref$defaultShow === void 0 ? false : _ref$defaultShow,
      onToggle = _ref.onToggle,
      propsDelay = _ref.delay,
      placement = _ref.placement,
      _ref$flip = _ref.flip,
      flip = _ref$flip === void 0 ? placement && placement.indexOf('auto') !== -1 : _ref$flip,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, OverlayTrigger_excluded);

  var triggerNodeRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  var timeout = useTimeout();
  var hoverStateRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)('');

  var _useUncontrolledProp = useUncontrolledProp(propsShow, defaultShow, onToggle),
      show = _useUncontrolledProp[0],
      setShow = _useUncontrolledProp[1];

  var delay = normalizeDelay(propsDelay);

  var _ref2 = typeof children !== 'function' ? external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.only(children).props : {},
      onFocus = _ref2.onFocus,
      onBlur = _ref2.onBlur,
      onClick = _ref2.onClick;

  var getTarget = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    return safeFindDOMNode(triggerNodeRef.current);
  }, []);
  var handleShow = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    timeout.clear();
    hoverStateRef.current = 'show';

    if (!delay.show) {
      setShow(true);
      return;
    }

    timeout.set(function () {
      if (hoverStateRef.current === 'show') setShow(true);
    }, delay.show);
  }, [delay.show, setShow, timeout]);
  var handleHide = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    timeout.clear();
    hoverStateRef.current = 'hide';

    if (!delay.hide) {
      setShow(false);
      return;
    }

    timeout.set(function () {
      if (hoverStateRef.current === 'hide') setShow(false);
    }, delay.hide);
  }, [delay.hide, setShow, timeout]);
  var handleFocus = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    handleShow();

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    onFocus == null ? void 0 : onFocus.apply(void 0, args);
  }, [handleShow, onFocus]);
  var handleBlur = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    handleHide();

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    onBlur == null ? void 0 : onBlur.apply(void 0, args);
  }, [handleHide, onBlur]);
  var handleClick = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    setShow(!show);
    if (onClick) onClick.apply(void 0, arguments);
  }, [onClick, setShow, show]);
  var handleMouseOver = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    handleMouseOverOut(handleShow, args, 'fromElement');
  }, [handleShow]);
  var handleMouseOut = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    handleMouseOverOut(handleHide, args, 'toElement');
  }, [handleHide]);
  var triggers = trigger == null ? [] : [].concat(trigger);
  var triggerProps = {};

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

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Fragment, null, typeof children === 'function' ? children(extends_extends({}, triggerProps, {
    ref: triggerNodeRef
  })) : /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(RefHolder, {
    ref: triggerNodeRef,
    __self: this,
    __source: {
      fileName: OverlayTrigger_jsxFileName,
      lineNumber: 299,
      columnNumber: 9
    }
  }, /*#__PURE__*/(0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(children, triggerProps)), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Overlay, extends_extends({}, props, {
    show: show,
    onHide: handleHide,
    flip: flip,
    placement: placement,
    popperConfig: popperConfig,
    target: getTarget,
    __self: this,
    __source: {
      fileName: OverlayTrigger_jsxFileName,
      lineNumber: 303,
      columnNumber: 7
    }
  }), overlay));
}

OverlayTrigger.propTypes = OverlayTrigger_propTypes;
OverlayTrigger.defaultProps = OverlayTrigger_defaultProps;
/* harmony default export */ const src_OverlayTrigger = (OverlayTrigger);
;// CONCATENATED MODULE: ./src/PageItem.tsx


var PageItem_excluded = ["active", "disabled", "className", "style", "activeLabel", "children"],
    PageItem_excluded2 = ["children"];

var PageItem_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/PageItem.tsx",
    PageItem_this = undefined;

/* eslint-disable react/no-multi-comp */




var PageItem_propTypes = {
  /** Disables the PageItem */
  disabled: (prop_types_default()).bool,

  /** Styles PageItem as active, and renders a `<span>` instead of an `<a>`. */
  active: (prop_types_default()).bool,

  /** An accessible label indicating the active state.. */
  activeLabel: (prop_types_default()).string,

  /** A callback function for when this component is clicked */
  onClick: (prop_types_default()).func
};
var PageItem_defaultProps = {
  active: false,
  disabled: false,
  activeLabel: '(current)'
};
var PageItem = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var active = _ref.active,
      disabled = _ref.disabled,
      className = _ref.className,
      style = _ref.style,
      activeLabel = _ref.activeLabel,
      children = _ref.children,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, PageItem_excluded);

  var Component = active || disabled ? 'span' : src_SafeAnchor;
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("li", {
    ref: ref,
    style: style,
    className: classnames_default()(className, 'page-item', {
      active: active,
      disabled: disabled
    }),
    __self: PageItem_this,
    __source: {
      fileName: PageItem_jsxFileName,
      lineNumber: 58,
      columnNumber: 7
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    className: "page-link",
    disabled: disabled
  }, props, {
    __self: PageItem_this,
    __source: {
      fileName: PageItem_jsxFileName,
      lineNumber: 63,
      columnNumber: 9
    }
  }), children, active && activeLabel && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
    className: "sr-only",
    __self: PageItem_this,
    __source: {
      fileName: PageItem_jsxFileName,
      lineNumber: 66,
      columnNumber: 13
    }
  }, activeLabel)));
});
PageItem.propTypes = PageItem_propTypes;
PageItem.defaultProps = PageItem_defaultProps;
PageItem.displayName = 'PageItem';
/* harmony default export */ const src_PageItem = (PageItem);

function createButton(name, defaultValue, label) {
  if (label === void 0) {
    label = name;
  }

  function Button(_ref2) {
    var children = _ref2.children,
        props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref2, PageItem_excluded2);

    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(PageItem, extends_extends({}, props, {
      __self: this,
      __source: {
        fileName: PageItem_jsxFileName,
        lineNumber: 83,
        columnNumber: 7
      }
    }), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
      "aria-hidden": "true",
      __self: this,
      __source: {
        fileName: PageItem_jsxFileName,
        lineNumber: 84,
        columnNumber: 9
      }
    }, children || defaultValue), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
      className: "sr-only",
      __self: this,
      __source: {
        fileName: PageItem_jsxFileName,
        lineNumber: 85,
        columnNumber: 9
      }
    }, label));
  }

  Button.displayName = name;
  return Button;
}

var First = createButton('First', '«');
var Prev = createButton('Prev', '‹', 'Previous');
var Ellipsis = createButton('Ellipsis', '…', 'More');
var Next = createButton('Next', '›');
var Last = createButton('Last', '»');
;// CONCATENATED MODULE: ./src/Pagination.tsx


var Pagination_excluded = ["bsPrefix", "className", "children", "size"];

var Pagination_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Pagination.tsx",
    Pagination_this = undefined;






var Pagination_propTypes = {
  /**
   * @default 'pagination'
   * */
  bsPrefix: (prop_types_default()).string,

  /**
   * Set's the size of all PageItems.
   *
   * @type {('sm'|'lg')}
   */
  size: (prop_types_default()).string
};
/**
 * @property {PageItem} Item
 * @property {PageItem} First
 * @property {PageItem} Prev
 * @property {PageItem} Ellipsis
 * @property {PageItem} Next
 * @property {PageItem} Last
 */

var Pagination = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      size = _ref.size,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Pagination_excluded);

  var decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'pagination');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("ul", extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(className, decoratedBsPrefix, size && decoratedBsPrefix + "-" + size),
    __self: Pagination_this,
    __source: {
      fileName: Pagination_jsxFileName,
      lineNumber: 53,
      columnNumber: 5
    }
  }), children);
});
Pagination.propTypes = Pagination_propTypes;
Pagination.First = First;
Pagination.Prev = Prev;
Pagination.Ellipsis = Ellipsis;
Pagination.Item = src_PageItem;
Pagination.Next = Next;
Pagination.Last = Last;
/* harmony default export */ const src_Pagination = (Pagination);
;// CONCATENATED MODULE: ./src/PopoverTitle.tsx


var PopoverTitle_excluded = ["as", "bsPrefix", "className", "children"];

var PopoverTitle_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/PopoverTitle.tsx",
    PopoverTitle_this = undefined;





var PopoverTitle_propTypes = {
  /** Set a custom element for this component */
  as: (prop_types_default()).elementType,

  /** @default 'popover-header' */
  bsPrefix: (prop_types_default()).string
};
var PopoverTitle = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, PopoverTitle_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-header');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(bsPrefix, className),
    __self: PopoverTitle_this,
    __source: {
      fileName: PopoverTitle_jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }
  }), children);
});
PopoverTitle.propTypes = PopoverTitle_propTypes;
/* harmony default export */ const src_PopoverTitle = (PopoverTitle);
;// CONCATENATED MODULE: ./src/PopoverContent.tsx


var PopoverContent_excluded = ["as", "bsPrefix", "className", "children"];

var PopoverContent_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/PopoverContent.tsx",
    PopoverContent_this = undefined;





var PopoverContent_propTypes = {
  /** Set a custom element for this component */
  as: (prop_types_default()).elementType,

  /** @default 'popover-body' */
  bsPrefix: (prop_types_default()).string
};
var PopoverContent = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, PopoverContent_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-body');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(className, bsPrefix),
    __self: PopoverContent_this,
    __source: {
      fileName: PopoverContent_jsxFileName,
      lineNumber: 40,
      columnNumber: 7
    }
  }), children);
});
PopoverContent.propTypes = PopoverContent_propTypes;
/* harmony default export */ const src_PopoverContent = (PopoverContent);
;// CONCATENATED MODULE: ./src/Popover.tsx


var Popover_excluded = ["bsPrefix", "placement", "className", "style", "children", "content", "arrowProps", "popper", "show"];

var Popover_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Popover.tsx",
    Popover_this = undefined;








var Popover_propTypes = {
  /**
   * @default 'popover'
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * An html id attribute, necessary for accessibility
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y_default()(prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number])),

  /**
   * Sets the direction the Popover is positioned towards.
   *
   * > This is generally provided by the `Overlay` component positioning the popover
   */
  placement: prop_types_default().oneOf(['auto', 'top', 'bottom', 'left', 'right']),

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
   * When this prop is set, it creates a Popover with a Popover.Content inside
   * passing the children directly to it
   */
  content: (prop_types_default()).bool,

  /** @private */
  popper: (prop_types_default()).object,

  /** @private */
  show: (prop_types_default()).bool
};
var Popover_defaultProps = {
  placement: 'right'
};
var Popover = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      placement = _ref.placement,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      content = _ref.content,
      arrowProps = _ref.arrowProps,
      _ = _ref.popper,
      _1 = _ref.show,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Popover_excluded);

  var decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'popover');

  var _ref2 = (placement == null ? void 0 : placement.split('-')) || [],
      primaryPlacement = _ref2[0];

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({
    ref: ref,
    role: "tooltip",
    style: style,
    "x-placement": primaryPlacement,
    className: classnames_default()(className, decoratedBsPrefix, primaryPlacement && "bs-popover-" + primaryPlacement)
  }, props, {
    __self: Popover_this,
    __source: {
      fileName: Popover_jsxFileName,
      lineNumber: 100,
      columnNumber: 7
    }
  }), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({
    className: "arrow"
  }, arrowProps, {
    __self: Popover_this,
    __source: {
      fileName: Popover_jsxFileName,
      lineNumber: 112,
      columnNumber: 9
    }
  })), content ? /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_PopoverContent, {
    __self: Popover_this,
    __source: {
      fileName: Popover_jsxFileName,
      lineNumber: 113,
      columnNumber: 20
    }
  }, children) : children);
});
Popover.propTypes = Popover_propTypes;
Popover.defaultProps = Popover_defaultProps;
Popover.Title = src_PopoverTitle;
Popover.Content = src_PopoverContent;
/* harmony default export */ const src_Popover = (Popover);
;// CONCATENATED MODULE: ./src/ProgressBar.tsx


var ProgressBar_excluded = ["min", "now", "max", "label", "srOnly", "striped", "animated", "className", "style", "variant", "bsPrefix"],
    ProgressBar_excluded2 = ["isChild"],
    _excluded3 = ["min", "now", "max", "label", "srOnly", "striped", "animated", "bsPrefix", "variant", "className", "children"];

var ProgressBar_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ProgressBar.tsx",
    _this2 = undefined;






var ROUND_PRECISION = 1000;
/**
 * Validate that children, if any, are instances of `<ProgressBar>`.
 */

function onlyProgressBar(props, propName, componentName) {
  var _this = this;

  var children = props[propName];

  if (!children) {
    return null;
  }

  var error = null;
  external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.forEach(children, function (child) {
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


    var element = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(ProgressBar, {
      __self: _this,
      __source: {
        fileName: ProgressBar_jsxFileName,
        lineNumber: 49,
        columnNumber: 21
      }
    });
    if (child.type === element.type) return;
    var childType = child.type;
    var childIdentifier = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().isValidElement(child) ? childType.displayName || childType.name || childType : child;
    error = new Error("Children of " + componentName + " can contain only ProgressBar " + ("components. Found " + childIdentifier + "."));
  });
  return error;
}

var ProgressBar_propTypes = {
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
  srOnly: (prop_types_default()).bool,

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
var ProgressBar_defaultProps = {
  min: 0,
  max: 100,
  animated: false,
  isChild: false,
  srOnly: false,
  striped: false
};

function getPercentage(now, min, max) {
  var percentage = (now - min) / (max - min) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}

function renderProgressBar(_ref, ref) {
  var _classNames;

  var min = _ref.min,
      now = _ref.now,
      max = _ref.max,
      label = _ref.label,
      srOnly = _ref.srOnly,
      striped = _ref.striped,
      animated = _ref.animated,
      className = _ref.className,
      style = _ref.style,
      variant = _ref.variant,
      bsPrefix = _ref.bsPrefix,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, ProgressBar_excluded);

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({
    ref: ref
  }, props, {
    role: "progressbar",
    className: classnames_default()(className, bsPrefix + "-bar", (_classNames = {}, _classNames["bg-" + variant] = variant, _classNames[bsPrefix + "-bar-animated"] = animated, _classNames[bsPrefix + "-bar-striped"] = animated || striped, _classNames)),
    style: extends_extends({
      width: getPercentage(now, min, max) + "%"
    }, style),
    "aria-valuenow": now,
    "aria-valuemin": min,
    "aria-valuemax": max,
    __self: this,
    __source: {
      fileName: ProgressBar_jsxFileName,
      lineNumber: 158,
      columnNumber: 5
    }
  }), srOnly ? /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
    className: "sr-only",
    __self: this,
    __source: {
      fileName: ProgressBar_jsxFileName,
      lineNumber: 172,
      columnNumber: 17
    }
  }, label) : label);
}

renderProgressBar.propTypes = ProgressBar_propTypes;
var ProgressBar = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref2, ref) {
  var isChild = _ref2.isChild,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref2, ProgressBar_excluded2);

  props.bsPrefix = useBootstrapPrefix(props.bsPrefix, 'progress');

  if (isChild) {
    return renderProgressBar(props, ref);
  }

  var min = props.min,
      now = props.now,
      max = props.max,
      label = props.label,
      srOnly = props.srOnly,
      striped = props.striped,
      animated = props.animated,
      bsPrefix = props.bsPrefix,
      variant = props.variant,
      className = props.className,
      children = props.children,
      wrapperProps = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(props, _excluded3);

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({
    ref: ref
  }, wrapperProps, {
    className: classnames_default()(className, bsPrefix),
    __self: _this2,
    __source: {
      fileName: ProgressBar_jsxFileName,
      lineNumber: 203,
      columnNumber: 7
    }
  }), children ? map(children, function (child) {
    return /*#__PURE__*/(0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(child, {
      isChild: true
    });
  }) : renderProgressBar({
    min: min,
    now: now,
    max: max,
    label: label,
    srOnly: srOnly,
    striped: striped,
    animated: animated,
    bsPrefix: bsPrefix,
    variant: variant
  }, ref));
});
ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = ProgressBar_propTypes;
ProgressBar.defaultProps = ProgressBar_defaultProps;
/* harmony default export */ const src_ProgressBar = (ProgressBar);
;// CONCATENATED MODULE: ./src/ResponsiveEmbed.tsx


var ResponsiveEmbed_excluded = ["bsPrefix", "className", "children", "aspectRatio"];

var ResponsiveEmbed_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ResponsiveEmbed.tsx",
    ResponsiveEmbed_this = undefined;





var ResponsiveEmbed_propTypes = {
  /**
   * @default 'embed-responsive'
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * This component requires a single child element
   */
  children: (prop_types_default()).element.isRequired,

  /**
   * Set the aspect ration of the embed
   */
  aspectRatio: prop_types_default().oneOf(['21by9', '16by9', '4by3', '1by1'])
};
var ResponsiveEmbed_defaultProps = {
  aspectRatio: '1by1'
};
var ResponsiveEmbed = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      aspectRatio = _ref.aspectRatio,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, ResponsiveEmbed_excluded);

  var decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'embed-responsive');
  var child = external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.only(children);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(decoratedBsPrefix, className, aspectRatio && decoratedBsPrefix + "-" + aspectRatio),
    __self: ResponsiveEmbed_this,
    __source: {
      fileName: ResponsiveEmbed_jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }
  }), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(child, {
    className: classnames_default()(child.props.className, decoratedBsPrefix + "-item")
  }));
});
ResponsiveEmbed.propTypes = ResponsiveEmbed_propTypes;
ResponsiveEmbed.defaultProps = ResponsiveEmbed_defaultProps;
/* harmony default export */ const src_ResponsiveEmbed = (ResponsiveEmbed);
;// CONCATENATED MODULE: ./src/Row.tsx


var Row_excluded = ["bsPrefix", "className", "noGutters", "as"];

var Row_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Row.tsx",
    Row_this = undefined;





var Row_DEVICE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs'];
var rowColWidth = prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string]);
var rowColumns = prop_types_default().oneOfType([rowColWidth, prop_types_default().shape({
  cols: rowColWidth
})]);
var Row_propTypes = {
  /**
   * @default 'row'
   */
  bsPrefix: (prop_types_default()).string,

  /** Removes the gutter spacing between `Col`s as well as any added negative margins. */
  noGutters: (prop_types_default()).bool.isRequired,
  as: (prop_types_default()).elementType,

  /**
   * The number of columns that will fit next to each other on extra small devices (<576px)
   *
   * @type {(number|{ cols: number })}
   */
  xs: rowColumns,

  /**
   * The number of columns that will fit next to each other on small devices (≥576px)
   *
   * @type {(number|{ cols: number })}
   */
  sm: rowColumns,

  /**
   * The number of columns that will fit next to each other on medium devices (≥768px)
   *
   * @type {(number|{ cols: number })}
   */
  md: rowColumns,

  /**
   * The number of columns that will fit next to each other on large devices (≥992px)
   *
   * @type {(number|{ cols: number })}
   */
  lg: rowColumns,

  /**
   * The number of columns that will fit next to each other on extra large devices (≥1200px)
   *
   * @type {(number|{ cols: number })}
   */
  xl: rowColumns
};
var Row_defaultProps = {
  noGutters: false
};
var Row = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      noGutters = _ref.noGutters,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Row_excluded);

  var decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'row');
  var sizePrefix = decoratedBsPrefix + "-cols";
  var classes = [];
  Row_DEVICE_SIZES.forEach(function (brkPoint) {
    var propValue = props[brkPoint];
    delete props[brkPoint];
    var cols;

    if (propValue != null && typeof propValue === 'object') {
      cols = propValue.cols;
    } else {
      cols = propValue;
    }

    var infix = brkPoint !== 'xs' ? "-" + brkPoint : '';
    if (cols != null) classes.push("" + sizePrefix + infix + "-" + cols);
  });
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref
  }, props, {
    className: classnames_default().apply(void 0, [className, decoratedBsPrefix, noGutters && 'no-gutters'].concat(classes)),
    __self: Row_this,
    __source: {
      fileName: Row_jsxFileName,
      lineNumber: 132,
      columnNumber: 7
    }
  }));
});
Row.displayName = 'Row';
Row.propTypes = Row_propTypes;
Row.defaultProps = Row_defaultProps;
/* harmony default export */ const src_Row = (Row);
;// CONCATENATED MODULE: ./src/Spinner.tsx


var Spinner_excluded = ["bsPrefix", "variant", "animation", "size", "children", "as", "className"];

var Spinner_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Spinner.tsx",
    Spinner_this = undefined;





var Spinner_propTypes = {
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
var Spinner = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      variant = _ref.variant,
      animation = _ref.animation,
      size = _ref.size,
      children = _ref.children,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Spinner_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'spinner');
  var bsSpinnerPrefix = bsPrefix + "-" + animation;
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(className, bsSpinnerPrefix, size && bsSpinnerPrefix + "-" + size, variant && "text-" + variant),
    __self: Spinner_this,
    __source: {
      fileName: Spinner_jsxFileName,
      lineNumber: 80,
      columnNumber: 7
    }
  }), children);
});
Spinner.propTypes = Spinner_propTypes;
Spinner.displayName = 'Spinner';
/* harmony default export */ const src_Spinner = (Spinner);
;// CONCATENATED MODULE: ./src/SplitButton.tsx


var SplitButton_excluded = ["id", "bsPrefix", "size", "variant", "title", "type", "toggleLabel", "children", "onClick", "href", "target", "menuAlign", "menuRole", "renderMenuOnMount", "rootCloseEvent"];

var SplitButton_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/SplitButton.tsx",
    SplitButton_this = undefined;







var SplitButton_propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: (prop_types_default()).any,

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
   * Aligns the dropdown menu responsively.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   *
   * @type {"left"|"right"|{ sm: "left"|"right" }|{ md: "left"|"right" }|{ lg: "left"|"right" }|{ xl: "left"|"right"} }
   */
  menuAlign: alignPropType,

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

  /** @ignore */
  bsPrefix: (prop_types_default()).string,

  /** @ignore */
  variant: (prop_types_default()).string,

  /** @ignore */
  size: (prop_types_default()).string
};
var SplitButton_defaultProps = {
  toggleLabel: 'Toggle dropdown',
  type: 'button'
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

var SplitButton = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var id = _ref.id,
      bsPrefix = _ref.bsPrefix,
      size = _ref.size,
      variant = _ref.variant,
      title = _ref.title,
      type = _ref.type,
      toggleLabel = _ref.toggleLabel,
      children = _ref.children,
      onClick = _ref.onClick,
      href = _ref.href,
      target = _ref.target,
      menuAlign = _ref.menuAlign,
      menuRole = _ref.menuRole,
      renderMenuOnMount = _ref.renderMenuOnMount,
      rootCloseEvent = _ref.rootCloseEvent,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, SplitButton_excluded);

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Dropdown, extends_extends({
    ref: ref
  }, props, {
    as: src_ButtonGroup,
    __self: SplitButton_this,
    __source: {
      fileName: SplitButton_jsxFileName,
      lineNumber: 125,
      columnNumber: 5
    }
  }), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Button, {
    size: size,
    variant: variant,
    disabled: props.disabled,
    bsPrefix: bsPrefix,
    href: href,
    target: target,
    onClick: onClick,
    type: type,
    __self: SplitButton_this,
    __source: {
      fileName: SplitButton_jsxFileName,
      lineNumber: 126,
      columnNumber: 7
    }
  }, title), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Dropdown.Toggle, {
    split: true,
    id: id ? id.toString() : undefined,
    size: size,
    variant: variant,
    disabled: props.disabled,
    childBsPrefix: bsPrefix,
    __self: SplitButton_this,
    __source: {
      fileName: SplitButton_jsxFileName,
      lineNumber: 138,
      columnNumber: 7
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
    className: "sr-only",
    __self: SplitButton_this,
    __source: {
      fileName: SplitButton_jsxFileName,
      lineNumber: 146,
      columnNumber: 9
    }
  }, toggleLabel)), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Dropdown.Menu, {
    align: menuAlign,
    role: menuRole,
    renderOnMount: renderMenuOnMount,
    rootCloseEvent: rootCloseEvent,
    __self: SplitButton_this,
    __source: {
      fileName: SplitButton_jsxFileName,
      lineNumber: 149,
      columnNumber: 7
    }
  }, children));
});
SplitButton.propTypes = SplitButton_propTypes;
SplitButton.defaultProps = SplitButton_defaultProps;
SplitButton.displayName = 'SplitButton';
/* harmony default export */ const src_SplitButton = (SplitButton);
;// CONCATENATED MODULE: ./src/TabContainer.tsx
var TabContainer_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/TabContainer.tsx",
    TabContainer_this = undefined;







var validateId = function validateId(props) {
  var error = null;

  if (!props.generateChildId) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    error = prop_types_default().string.apply((prop_types_default()), [props].concat(args));

    if (!error && !props.id) {
      error = new Error('In order to properly initialize Tabs in a way that is accessible ' + 'to assistive technologies (such as screen readers) an `id` or a ' + '`generateChildId` prop to TabContainer is required');
    }
  }

  return error;
};
/* eslint-disable react/no-unused-prop-types */


var TabContainer_propTypes = {
  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   *
   * @type {string}
   */
  id: validateId,

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

var TabContainer = function TabContainer(props) {
  var _useUncontrolled = useUncontrolled(props, {
    activeKey: 'onSelect'
  }),
      id = _useUncontrolled.id,
      generateCustomChildId = _useUncontrolled.generateChildId,
      onSelect = _useUncontrolled.onSelect,
      activeKey = _useUncontrolled.activeKey,
      transition = _useUncontrolled.transition,
      mountOnEnter = _useUncontrolled.mountOnEnter,
      unmountOnExit = _useUncontrolled.unmountOnExit,
      children = _useUncontrolled.children;

  var generateChildId = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return generateCustomChildId || function (key, type) {
      return id ? id + "-" + type + "-" + key : null;
    };
  }, [id, generateCustomChildId]);
  var tabContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return {
      onSelect: onSelect,
      activeKey: activeKey,
      transition: transition,
      mountOnEnter: mountOnEnter || false,
      unmountOnExit: unmountOnExit || false,
      getControlledId: function getControlledId(key) {
        return generateChildId(key, 'tabpane');
      },
      getControllerId: function getControllerId(key) {
        return generateChildId(key, 'tab');
      }
    };
  }, [onSelect, activeKey, transition, mountOnEnter, unmountOnExit, generateChildId]);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_TabContext.Provider, {
    value: tabContext,
    __self: TabContainer_this,
    __source: {
      fileName: TabContainer_jsxFileName,
      lineNumber: 139,
      columnNumber: 5
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SelectableContext.Provider, {
    value: onSelect || null,
    __self: TabContainer_this,
    __source: {
      fileName: TabContainer_jsxFileName,
      lineNumber: 140,
      columnNumber: 7
    }
  }, children));
};

TabContainer.propTypes = TabContainer_propTypes;
/* harmony default export */ const src_TabContainer = (TabContainer);
;// CONCATENATED MODULE: ./src/TabContent.tsx


var TabContent_excluded = ["bsPrefix", "as", "className"];

var TabContent_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/TabContent.tsx",
    TabContent_this = undefined;





var TabContent_propTypes = {
  /**
   * @default 'tab-content'
   */
  bsPrefix: (prop_types_default()).string,
  as: (prop_types_default()).elementType
};
var TabContent = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, TabContent_excluded);

  var decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'tab-content');
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(className, decoratedBsPrefix),
    __self: TabContent_this,
    __source: {
      fileName: TabContent_jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }
  }));
});
TabContent.propTypes = TabContent_propTypes;
/* harmony default export */ const src_TabContent = (TabContent);
;// CONCATENATED MODULE: ./src/TabPane.tsx


var TabPane_excluded = ["activeKey", "getControlledId", "getControllerId"],
    TabPane_excluded2 = ["bsPrefix", "className", "active", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "mountOnEnter", "unmountOnExit", "transition", "as", "eventKey"];

var TabPane_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/TabPane.tsx",
    TabPane_this = undefined;








var TabPane_propTypes = {
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

function useTabContext(props) {
  var context = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_TabContext);
  if (!context) return props;

  var activeKey = context.activeKey,
      getControlledId = context.getControlledId,
      getControllerId = context.getControllerId,
      rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(context, TabPane_excluded);

  var shouldTransition = props.transition !== false && rest.transition !== false;
  var key = makeEventKey(props.eventKey);
  return extends_extends({}, props, {
    active: props.active == null && key != null ? makeEventKey(activeKey) === key : props.active,
    id: getControlledId(props.eventKey),
    'aria-labelledby': getControllerId(props.eventKey),
    transition: shouldTransition && (props.transition || rest.transition || src_Fade),
    mountOnEnter: props.mountOnEnter != null ? props.mountOnEnter : rest.mountOnEnter,
    unmountOnExit: props.unmountOnExit != null ? props.unmountOnExit : rest.unmountOnExit
  });
}

var TabPane = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (props, ref) {
  var _useTabContext = useTabContext(props),
      bsPrefix = _useTabContext.bsPrefix,
      className = _useTabContext.className,
      active = _useTabContext.active,
      onEnter = _useTabContext.onEnter,
      onEntering = _useTabContext.onEntering,
      onEntered = _useTabContext.onEntered,
      onExit = _useTabContext.onExit,
      onExiting = _useTabContext.onExiting,
      onExited = _useTabContext.onExited,
      mountOnEnter = _useTabContext.mountOnEnter,
      unmountOnExit = _useTabContext.unmountOnExit,
      Transition = _useTabContext.transition,
      _useTabContext$as = _useTabContext.as,
      Component = _useTabContext$as === void 0 ? 'div' : _useTabContext$as,
      _ = _useTabContext.eventKey,
      rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_useTabContext, TabPane_excluded2);

  var prefix = useBootstrapPrefix(bsPrefix, 'tab-pane');
  if (!active && !Transition && unmountOnExit) return null;
  var pane = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, extends_extends({}, rest, {
    ref: ref,
    role: "tabpanel",
    "aria-hidden": !active,
    className: classnames_default()(className, prefix, {
      active: active
    }),
    __self: TabPane_this,
    __source: {
      fileName: TabPane_jsxFileName,
      lineNumber: 153,
      columnNumber: 5
    }
  }));
  if (Transition) pane = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Transition, {
    in: active,
    onEnter: onEnter,
    onEntering: onEntering,
    onEntered: onEntered,
    onExit: onExit,
    onExiting: onExiting,
    onExited: onExited,
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit,
    __self: TabPane_this,
    __source: {
      fileName: TabPane_jsxFileName,
      lineNumber: 164,
      columnNumber: 7
    }
  }, pane); // We provide an empty the TabContext so `<Nav>`s in `<TabPane>`s don't
  // conflict with the top level one.

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_TabContext.Provider, {
    value: null,
    __self: TabPane_this,
    __source: {
      fileName: TabPane_jsxFileName,
      lineNumber: 182,
      columnNumber: 5
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SelectableContext.Provider, {
    value: null,
    __self: TabPane_this,
    __source: {
      fileName: TabPane_jsxFileName,
      lineNumber: 183,
      columnNumber: 7
    }
  }, pane));
});
TabPane.displayName = 'TabPane';
TabPane.propTypes = TabPane_propTypes;
/* harmony default export */ const src_TabPane = (TabPane);
;// CONCATENATED MODULE: ./src/Tab.tsx







/* eslint-disable react/require-render-return, react/no-unused-prop-types */
var Tab = /*#__PURE__*/function (_React$Component) {
  inheritsLoose_inheritsLoose(Tab, _React$Component);

  function Tab() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tab.prototype;

  _proto.render = function render() {
    throw new Error('ReactBootstrap: The `Tab` component is not meant to be rendered! ' + "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. " + 'For custom tabs components use TabPane and TabsContainer directly');
    return null;
  };

  return Tab;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Tab.propTypes = {
  title: (prop_types_default()).node.isRequired,
  eventKey: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number])
};
Tab.Container = src_TabContainer;
Tab.Content = src_TabContent;
Tab.Pane = src_TabPane;
/* harmony default export */ const src_Tab = (Tab);
;// CONCATENATED MODULE: ./src/Table.tsx


var Table_excluded = ["bsPrefix", "className", "striped", "bordered", "borderless", "hover", "size", "variant", "responsive"];

var Table_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Table.tsx",
    Table_this = undefined;





var Table_propTypes = {
  /**
   * @default 'table'
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * Adds zebra-striping to any table row within the `<tbody>`.
   */
  striped: (prop_types_default()).bool,

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
var Table = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      striped = _ref.striped,
      bordered = _ref.bordered,
      borderless = _ref.borderless,
      hover = _ref.hover,
      size = _ref.size,
      variant = _ref.variant,
      responsive = _ref.responsive,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Table_excluded);

  var decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'table');
  var classes = classnames_default()(className, decoratedBsPrefix, variant && decoratedBsPrefix + "-" + variant, size && decoratedBsPrefix + "-" + size, striped && decoratedBsPrefix + "-striped", bordered && decoratedBsPrefix + "-bordered", borderless && decoratedBsPrefix + "-borderless", hover && decoratedBsPrefix + "-hover");
  var table = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("table", extends_extends({}, props, {
    className: classes,
    ref: ref,
    __self: Table_this,
    __source: {
      fileName: Table_jsxFileName,
      lineNumber: 101,
      columnNumber: 19
    }
  }));

  if (responsive) {
    var responsiveClass = decoratedBsPrefix + "-responsive";

    if (typeof responsive === 'string') {
      responsiveClass = responsiveClass + "-" + responsive;
    }

    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      className: responsiveClass,
      __self: Table_this,
      __source: {
        fileName: Table_jsxFileName,
        lineNumber: 108,
        columnNumber: 14
      }
    }, table);
  }

  return table;
});
Table.propTypes = Table_propTypes;
/* harmony default export */ const src_Table = (Table);
;// CONCATENATED MODULE: ./src/Tabs.tsx


var Tabs_excluded = ["id", "onSelect", "transition", "mountOnEnter", "unmountOnExit", "children", "activeKey"];

var Tabs_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Tabs.tsx",
    Tabs_this = undefined;












var Tabs_propTypes = {
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
   * @type {('tabs'| 'pills')}
   */
  variant: (prop_types_default()).string,

  /**
   * Sets a default animation strategy for all children `<TabPane>`s.
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
  id: isRequiredForA11y_default()((prop_types_default()).string),

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
  unmountOnExit: (prop_types_default()).bool
};
var Tabs_defaultProps = {
  variant: 'tabs',
  mountOnEnter: false,
  unmountOnExit: false
};

function getDefaultActiveKey(children) {
  var defaultActiveKey;
  forEach(children, function (child) {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });
  return defaultActiveKey;
}

function renderTab(child) {
  var _child$props = child.props,
      title = _child$props.title,
      eventKey = _child$props.eventKey,
      disabled = _child$props.disabled,
      tabClassName = _child$props.tabClassName,
      id = _child$props.id;

  if (title == null) {
    return null;
  }

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_NavItem, {
    as: src_NavLink,
    eventKey: eventKey,
    disabled: disabled,
    id: id,
    className: tabClassName,
    __self: this,
    __source: {
      fileName: Tabs_jsxFileName,
      lineNumber: 116,
      columnNumber: 5
    }
  }, title);
}

var Tabs = function Tabs(props) {
  var _useUncontrolled = useUncontrolled(props, {
    activeKey: 'onSelect'
  }),
      id = _useUncontrolled.id,
      onSelect = _useUncontrolled.onSelect,
      transition = _useUncontrolled.transition,
      mountOnEnter = _useUncontrolled.mountOnEnter,
      unmountOnExit = _useUncontrolled.unmountOnExit,
      children = _useUncontrolled.children,
      _useUncontrolled$acti = _useUncontrolled.activeKey,
      activeKey = _useUncontrolled$acti === void 0 ? getDefaultActiveKey(children) : _useUncontrolled$acti,
      controlledProps = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_useUncontrolled, Tabs_excluded);

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_TabContainer, {
    id: id,
    activeKey: activeKey,
    onSelect: onSelect,
    transition: transition,
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit,
    __self: Tabs_this,
    __source: {
      fileName: Tabs_jsxFileName,
      lineNumber: 143,
      columnNumber: 5
    }
  }, /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Nav, extends_extends({}, controlledProps, {
    role: "tablist",
    as: "nav",
    __self: Tabs_this,
    __source: {
      fileName: Tabs_jsxFileName,
      lineNumber: 151,
      columnNumber: 7
    }
  }), map(children, renderTab)), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_TabContent, {
    __self: Tabs_this,
    __source: {
      fileName: Tabs_jsxFileName,
      lineNumber: 155,
      columnNumber: 7
    }
  }, map(children, function (child) {
    var childProps = extends_extends({}, child.props);

    delete childProps.title;
    delete childProps.disabled;
    delete childProps.tabClassName;
    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_TabPane, extends_extends({}, childProps, {
      __self: Tabs_this,
      __source: {
        fileName: Tabs_jsxFileName,
        lineNumber: 163,
        columnNumber: 18
      }
    }));
  })));
};

Tabs.propTypes = Tabs_propTypes;
Tabs.defaultProps = Tabs_defaultProps;
Tabs.displayName = 'Tabs';
/* harmony default export */ const src_Tabs = (Tabs);
;// CONCATENATED MODULE: ./src/ToastContext.tsx
 // TODO: check

var ToastContext = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose: function onClose() {}
});
/* harmony default export */ const src_ToastContext = (ToastContext);
;// CONCATENATED MODULE: ./src/ToastHeader.tsx


var ToastHeader_excluded = ["bsPrefix", "closeLabel", "closeButton", "className", "children"];

var ToastHeader_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ToastHeader.tsx",
    ToastHeader_this = undefined;








var ToastHeader_propTypes = {
  bsPrefix: (prop_types_default()).string,

  /**
   * Provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  closeLabel: (prop_types_default()).string,

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: (prop_types_default()).bool
};
var ToastHeader_defaultProps = {
  closeLabel: 'Close',
  closeButton: true
};
var ToastHeader = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      closeLabel = _ref.closeLabel,
      closeButton = _ref.closeButton,
      className = _ref.className,
      children = _ref.children,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, ToastHeader_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'toast-header');
  var context = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_ToastContext);
  var handleClick = useEventCallback(function (e) {
    if (context && context.onClose) {
      context.onClose(e);
    }
  });
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({
    ref: ref
  }, props, {
    className: classnames_default()(bsPrefix, className),
    __self: ToastHeader_this,
    __source: {
      fileName: ToastHeader_jsxFileName,
      lineNumber: 69,
      columnNumber: 7
    }
  }), children, closeButton && /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_CloseButton, {
    label: closeLabel,
    onClick: handleClick,
    className: "ml-2 mb-1",
    "data-dismiss": "toast",
    __self: ToastHeader_this,
    __source: {
      fileName: ToastHeader_jsxFileName,
      lineNumber: 73,
      columnNumber: 11
    }
  }));
});
ToastHeader.displayName = 'ToastHeader';
ToastHeader.propTypes = ToastHeader_propTypes;
ToastHeader.defaultProps = ToastHeader_defaultProps;
/* harmony default export */ const src_ToastHeader = (ToastHeader);
;// CONCATENATED MODULE: ./src/ToastBody.tsx

/* harmony default export */ const ToastBody = (createWithBsPrefix('toast-body'));
;// CONCATENATED MODULE: ./src/Toast.tsx


var Toast_excluded = ["bsPrefix", "className", "children", "transition", "show", "animation", "delay", "autohide", "onClose"];

var Toast_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Toast.tsx",
    Toast_this = undefined;










var Toast_propTypes = {
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
   * When `true` The modal will show itself.
   */
  show: (prop_types_default()).bool,

  /**
   * A `react-transition-group` Transition component used to animate the Toast on dismissal.
   */
  transition: (prop_types_default()).elementType
};
var Toast = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      _ref$transition = _ref.transition,
      Transition = _ref$transition === void 0 ? src_Fade : _ref$transition,
      _ref$show = _ref.show,
      show = _ref$show === void 0 ? true : _ref$show,
      _ref$animation = _ref.animation,
      animation = _ref$animation === void 0 ? true : _ref$animation,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? 3000 : _ref$delay,
      _ref$autohide = _ref.autohide,
      autohide = _ref$autohide === void 0 ? false : _ref$autohide,
      onClose = _ref.onClose,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Toast_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'toast'); // We use refs for these, because we don't want to restart the autohide
  // timer in case these values change.

  var delayRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(delay);
  var onCloseRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(onClose);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    delayRef.current = delay;
    onCloseRef.current = onClose;
  }, [delay, onClose]);
  var autohideTimeout = useTimeout();
  var autohideToast = !!(autohide && show);
  var autohideFunc = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    if (autohideToast) {
      onCloseRef.current == null ? void 0 : onCloseRef.current();
    }
  }, [autohideToast]);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    // Only reset timer if show or autohide changes.
    autohideTimeout.set(autohideFunc, delayRef.current);
  }, [autohideTimeout, autohideFunc]);
  var toastContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return {
      onClose: onClose
    };
  }, [onClose]);
  var hasAnimation = !!(Transition && animation);
  var toast = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({}, props, {
    ref: ref,
    className: classnames_default()(bsPrefix, className, !hasAnimation && (show ? 'show' : 'hide')),
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true",
    __self: Toast_this,
    __source: {
      fileName: Toast_jsxFileName,
      lineNumber: 118,
      columnNumber: 7
    }
  }), children);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_ToastContext.Provider, {
    value: toastContext,
    __self: Toast_this,
    __source: {
      fileName: Toast_jsxFileName,
      lineNumber: 135,
      columnNumber: 7
    }
  }, hasAnimation && Transition ? /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Transition, {
    in: show,
    unmountOnExit: true,
    __self: Toast_this,
    __source: {
      fileName: Toast_jsxFileName,
      lineNumber: 137,
      columnNumber: 11
    }
  }, toast) : toast);
});
Toast.propTypes = Toast_propTypes;
Toast.displayName = 'Toast';
/* harmony default export */ const src_Toast = (Object.assign(Toast, {
  Body: ToastBody,
  Header: src_ToastHeader
}));
;// CONCATENATED MODULE: ./src/ToggleButton.tsx


var ToggleButton_excluded = ["children", "name", "className", "checked", "type", "onChange", "value", "disabled", "inputRef"];

var ToggleButton_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ToggleButton.tsx",
    ToggleButton_this = undefined;






var ToggleButton_noop = function noop() {
  return undefined;
};

var ToggleButton_propTypes = {
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
   * A callback fired when the underlying input element changes. This is passed
   * directly to the `<input>` so shares the same signature as a native `onChange` event.
   */
  onChange: (prop_types_default()).func,

  /**
   * The value of the input, should be unique amongst it's siblings when nested in a
   * `ToggleButtonGroup`.
   */
  value: prop_types_default().oneOfType([(prop_types_default()).string, prop_types_default().arrayOf((prop_types_default()).string), (prop_types_default()).number]).isRequired,

  /**
   * A ref attached to the `<input>` element
   * @type {ReactRef}
   */
  inputRef: prop_types_default().oneOfType([(prop_types_default()).func, (prop_types_default()).object])
};
var ToggleButton = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var children = _ref.children,
      name = _ref.name,
      className = _ref.className,
      checked = _ref.checked,
      type = _ref.type,
      onChange = _ref.onChange,
      value = _ref.value,
      disabled = _ref.disabled,
      inputRef = _ref.inputRef,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, ToggleButton_excluded);

  var _useState = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(false),
      focused = _useState[0],
      setFocused = _useState[1];

  var handleFocus = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (e) {
    if (e.target.tagName === 'INPUT') setFocused(true);
  }, []);
  var handleBlur = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (e) {
    if (e.target.tagName === 'INPUT') setFocused(false);
  }, []);
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Button, extends_extends({}, props, {
    ref: ref,
    className: classnames_default()(className, focused && 'focus', disabled && 'disabled'),
    type: undefined,
    active: !!checked,
    as: "label",
    __self: ToggleButton_this,
    __source: {
      fileName: ToggleButton_jsxFileName,
      lineNumber: 98,
      columnNumber: 7
    }
  }), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("input", {
    name: name,
    type: type,
    value: value,
    ref: inputRef,
    autoComplete: "off",
    checked: !!checked,
    disabled: !!disabled,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: onChange || ToggleButton_noop,
    __self: ToggleButton_this,
    __source: {
      fileName: ToggleButton_jsxFileName,
      lineNumber: 110,
      columnNumber: 9
    }
  }), children);
});
ToggleButton.propTypes = ToggleButton_propTypes;
ToggleButton.displayName = 'ToggleButton';
/* harmony default export */ const src_ToggleButton = (ToggleButton);
;// CONCATENATED MODULE: ./src/ToggleButtonGroup.tsx


var ToggleButtonGroup_excluded = ["children", "type", "name", "value", "onChange"];

var ToggleButtonGroup_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/ToggleButtonGroup.tsx",
    ToggleButtonGroup_this = undefined;









var ToggleButtonGroup_propTypes = {
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
var ToggleButtonGroup_defaultProps = {
  type: 'radio',
  vertical: false
};
var ToggleButtonGroup = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (props, ref) {
  var _useUncontrolled = useUncontrolled(props, {
    value: 'onChange'
  }),
      children = _useUncontrolled.children,
      type = _useUncontrolled.type,
      name = _useUncontrolled.name,
      value = _useUncontrolled.value,
      onChange = _useUncontrolled.onChange,
      controlledProps = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_useUncontrolled, ToggleButtonGroup_excluded);

  var getValues = function getValues() {
    return value == null ? [] : [].concat(value);
  };

  var handleToggle = function handleToggle(inputVal, event) {
    if (!onChange) {
      return;
    }

    var values = getValues();
    var isActive = values.indexOf(inputVal) !== -1;

    if (type === 'radio') {
      if (!isActive && onChange) onChange(inputVal, event);
      return;
    }

    if (isActive) {
      onChange(values.filter(function (n) {
        return n !== inputVal;
      }), event);
    } else {
      onChange([].concat(values, [inputVal]), event);
    }
  };

  !(type !== 'radio' || !!name) ?  false ? 0 : browser_default()(false) : void 0;
  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_ButtonGroup, extends_extends({}, controlledProps, {
    ref: ref,
    toggle: true,
    __self: ToggleButtonGroup_this,
    __source: {
      fileName: ToggleButtonGroup_jsxFileName,
      lineNumber: 132,
      columnNumber: 7
    }
  }), map(children, function (child) {
    var values = getValues();
    var _child$props = child.props,
        childVal = _child$props.value,
        childOnChange = _child$props.onChange;

    var handler = function handler(e) {
      return handleToggle(childVal, e);
    };

    return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(child, {
      type: type,
      name: child.name || name,
      checked: values.indexOf(childVal) !== -1,
      onChange: src_createChainedFunction(childOnChange, handler)
    });
  }));
});
ToggleButtonGroup.propTypes = ToggleButtonGroup_propTypes;
ToggleButtonGroup.defaultProps = ToggleButtonGroup_defaultProps;
ToggleButtonGroup.Button = src_ToggleButton;
/* harmony default export */ const src_ToggleButtonGroup = (ToggleButtonGroup);
;// CONCATENATED MODULE: ./src/Tooltip.tsx


var Tooltip_excluded = ["bsPrefix", "placement", "className", "style", "children", "arrowProps", "popper", "show"];

var Tooltip_jsxFileName = "/Users/kyletsang/Documents/Kyle/Code/react-bootstrap/src/Tooltip.tsx",
    Tooltip_this = undefined;






var Tooltip_propTypes = {
  /**
   * @default 'tooltip'
   */
  bsPrefix: (prop_types_default()).string,

  /**
   * An html id attribute, necessary for accessibility
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y_default()(prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number])),

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

  /** @private */
  popper: (prop_types_default()).object,

  /** @private */
  show: (prop_types_default()).any
};
var Tooltip_defaultProps = {
  placement: 'right'
};
var Tooltip = /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      placement = _ref.placement,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      arrowProps = _ref.arrowProps,
      _ = _ref.popper,
      _2 = _ref.show,
      props = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, Tooltip_excluded);

  bsPrefix = useBootstrapPrefix(bsPrefix, 'tooltip');

  var _ref2 = (placement == null ? void 0 : placement.split('-')) || [],
      primaryPlacement = _ref2[0];

  return /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({
    ref: ref,
    style: style,
    role: "tooltip",
    "x-placement": primaryPlacement,
    className: classnames_default()(className, bsPrefix, "bs-tooltip-" + primaryPlacement)
  }, props, {
    __self: Tooltip_this,
    __source: {
      fileName: Tooltip_jsxFileName,
      lineNumber: 106,
      columnNumber: 7
    }
  }), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", extends_extends({
    className: "arrow"
  }, arrowProps, {
    __self: Tooltip_this,
    __source: {
      fileName: Tooltip_jsxFileName,
      lineNumber: 118,
      columnNumber: 9
    }
  })), /*#__PURE__*/external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
    className: bsPrefix + "-inner",
    __self: Tooltip_this,
    __source: {
      fileName: Tooltip_jsxFileName,
      lineNumber: 119,
      columnNumber: 9
    }
  }, children));
});
Tooltip.propTypes = Tooltip_propTypes;
Tooltip.defaultProps = Tooltip_defaultProps;
Tooltip.displayName = 'Tooltip';
/* harmony default export */ const src_Tooltip = (Tooltip);
;// CONCATENATED MODULE: ./src/index.tsx












































































})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});