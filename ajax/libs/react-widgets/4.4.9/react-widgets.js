/*! (c) 2014 - present: Jason Quense | https://github.com/jquense/react-widgets/blob/master/LICENSE.md */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactWidgets"] = factory(require("react"), require("react-dom"));
	else
		root["ReactWidgets"] = factory(root["React"], root["ReactDOM"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_6__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 59);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
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
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(61)();
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
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
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
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
		classNames.default = classNames;
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.message = exports.accessor = exports.disabled = exports.dateFormat = exports.numberFormat = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _elementType = _interopRequireDefault(__webpack_require__(82));

exports.elementType = _elementType.default;

var _createChainableTypeChecker = _interopRequireDefault(__webpack_require__(53));

var _localizers = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numberFormat = (0, _createChainableTypeChecker.default)(function () {
  return _localizers.number.propType.apply(_localizers.number, arguments);
});
exports.numberFormat = numberFormat;
var dateFormat = (0, _createChainableTypeChecker.default)(function () {
  return _localizers.date.propType.apply(_localizers.date, arguments);
});
exports.dateFormat = dateFormat;
var disabled = (0, _createChainableTypeChecker.default)(function () {
  return _propTypes.default.bool.apply(_propTypes.default, arguments);
});
exports.disabled = disabled;
disabled.acceptsArray = _propTypes.default.oneOfType([disabled, _propTypes.default.array]);

var accessor = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]);

exports.accessor = accessor;

var message = _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string, _propTypes.default.func]);

exports.message = message;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.pick = pick;
exports.pickElementProps = pickElementProps;
exports.omitOwn = omitOwn;
var whitelist = ['style', 'className', 'role', 'id', 'autocomplete', 'size', 'tabIndex', 'maxLength', 'name'];
var whitelistRegex = [/^aria-/, /^data-/, /^on[A-Z]\w+/];

function pick(props, componentClass) {
  var keys = Object.keys(componentClass.propTypes);
  var result = {};
  Object.keys(props).forEach(function (key) {
    if (keys.indexOf(key) === -1) return;
    result[key] = props[key];
  });
  return result;
}

function pickElementProps(component) {
  for (var _len = arguments.length, others = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    others[_key - 1] = arguments[_key];
  }

  var props = omitOwn.apply(void 0, [component].concat(others));
  var result = {};
  Object.keys(props).forEach(function (key) {
    if (whitelist.indexOf(key) !== -1 || whitelistRegex.some(function (r) {
      return !!key.match(r);
    })) result[key] = props[key];
  });
  return result;
}

function omitOwn(component) {
  var initial = Object.keys(component.constructor.propTypes);

  for (var _len2 = arguments.length, others = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    others[_key2 - 1] = arguments[_key2];
  }

  var keys = others.reduce(function (arr, compClass) {
    return arr.concat(Object.keys(compClass.propTypes));
  }, initial);
  var result = {};
  Object.keys(component.props).forEach(function (key) {
    if (keys.indexOf(key) !== -1) return;
    result[key] = component.props[key];
  });
  return result;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.setNumber = setNumber;
exports.setDate = setDate;
exports.date = exports.number = void 0;

var _invariant = _interopRequireDefault(__webpack_require__(26));

var _ = __webpack_require__(8);

var _propTypes = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localePropType = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]);

var REQUIRED_NUMBER_FORMATS = ['default'];
var REQUIRED_DATE_FORMATS = ['default', 'date', 'time', 'header', 'footer', 'weekday', 'dayOfMonth', 'month', 'year', 'decade', 'century'];

var _numberLocalizer = createWrapper('NumberPicker');

var number = {
  propType: function propType() {
    var _numberLocalizer2;

    return (_numberLocalizer2 = _numberLocalizer).propType.apply(_numberLocalizer2, arguments);
  },
  getFormat: function getFormat(key, format) {
    return format || _numberLocalizer.formats[key];
  },
  parse: function parse() {
    var _numberLocalizer3;

    return (_numberLocalizer3 = _numberLocalizer).parse.apply(_numberLocalizer3, arguments);
  },
  format: function format() {
    var _numberLocalizer4;

    return (_numberLocalizer4 = _numberLocalizer).format.apply(_numberLocalizer4, arguments);
  },
  decimalChar: function decimalChar() {
    var _numberLocalizer5;

    return (_numberLocalizer5 = _numberLocalizer).decimalChar.apply(_numberLocalizer5, arguments);
  },
  precision: function precision() {
    var _numberLocalizer6;

    return (_numberLocalizer6 = _numberLocalizer).precision.apply(_numberLocalizer6, arguments);
  }
};
exports.number = number;

function setNumber(_ref) {
  var format = _ref.format,
      _parse = _ref.parse,
      formats = _ref.formats,
      _ref$propType = _ref.propType,
      propType = _ref$propType === void 0 ? localePropType : _ref$propType,
      _ref$decimalChar = _ref.decimalChar,
      decimalChar = _ref$decimalChar === void 0 ? function () {
    return '.';
  } : _ref$decimalChar,
      _ref$precision = _ref.precision,
      precision = _ref$precision === void 0 ? function () {
    return null;
  } : _ref$precision;
  checkFormats(REQUIRED_NUMBER_FORMATS, formats);
  _numberLocalizer = {
    formats: formats,
    precision: precision,
    decimalChar: decimalChar,
    propType: propType,
    format: wrapFormat(format),
    parse: function parse(value, culture, format) {
      var result = _parse.call(this, value, culture, format);

      !(result == null || typeof result === 'number') ?  false ? (0, _invariant.default)(false, 'number localizer `parse(..)` must return a number, null, or undefined') : invariant(false) : void 0;
      return result;
    }
  };
}

var _dateLocalizer = createWrapper('DateTimePicker');

var date = {
  propType: function propType() {
    var _dateLocalizer2;

    return (_dateLocalizer2 = _dateLocalizer).propType.apply(_dateLocalizer2, arguments);
  },
  getFormat: function getFormat(key, format) {
    return format || _dateLocalizer.formats[key];
  },
  parse: function parse() {
    var _dateLocalizer3;

    return (_dateLocalizer3 = _dateLocalizer).parse.apply(_dateLocalizer3, arguments);
  },
  format: function format() {
    var _dateLocalizer4;

    return (_dateLocalizer4 = _dateLocalizer).format.apply(_dateLocalizer4, arguments);
  },
  firstOfWeek: function firstOfWeek() {
    var _dateLocalizer5;

    return (_dateLocalizer5 = _dateLocalizer).firstOfWeek.apply(_dateLocalizer5, arguments);
  }
};
exports.date = date;

function setDate(_ref2) {
  var formats = _ref2.formats,
      format = _ref2.format,
      _parse2 = _ref2.parse,
      firstOfWeek = _ref2.firstOfWeek,
      _ref2$propType = _ref2.propType,
      propType = _ref2$propType === void 0 ? localePropType : _ref2$propType;
  checkFormats(REQUIRED_DATE_FORMATS, formats);
  _dateLocalizer = {
    formats: formats,
    propType: propType,
    firstOfWeek: firstOfWeek,
    format: wrapFormat(format),
    parse: function parse(value, format, culture) {
      var result = _parse2.call(this, value, format, culture);

      !(result == null || result instanceof Date && !isNaN(result.getTime())) ?  false ? (0, _invariant.default)(false, 'date localizer `parse(..)` must return a valid Date, null, or undefined') : invariant(false) : void 0;
      return result;
    }
  };
}

var wrapFormat = function wrapFormat(formatter) {
  return function (value, format, culture) {
    var result = typeof format === 'function' ? format(value, culture, this) : formatter.call(this, value, format, culture);
    !(result == null || typeof result === 'string') ?  false ? (0, _invariant.default)(false, '`localizer format(..)` must return a string, null, or undefined') : invariant(false) : void 0;
    return result;
  };
};

function checkFormats(required, formats) {
  if (false) required.forEach(function (f) {
    return !(0, _.has)(formats, f) ? process.env.NODE_ENV !== "production" ? (0, _invariant.default)(false, 'localizer missing required format: `%s`', f) : invariant(false) : void 0;
  });
}

function createWrapper() {
  var dummy = {};

  if (false) {
    ['formats', 'parse', 'format', 'firstOfWeek', 'precision', 'propType'].forEach(function (name) {
      return Object.defineProperty(dummy, name, {
        enumerable: true,
        get: function get() {
          throw new Error('[React Widgets] You are attempting to use a widget that requires localization ' + '(Calendar, DateTimePicker, NumberPicker). ' + 'However there is no localizer set. Please configure a localizer. \n\n' + 'see http://jquense.github.io/react-widgets/docs/#/i18n for more info.');
        }
      });
    });
  }

  return dummy;
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polyfill", function() { return polyfill; });
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
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
      prevProps,
      prevState
    );
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

function polyfill(Component) {
  var prototype = Component.prototype;

  if (!prototype || !prototype.isReactComponent) {
    throw new Error('Can only polyfill class components');
  }

  if (
    typeof Component.getDerivedStateFromProps !== 'function' &&
    typeof prototype.getSnapshotBeforeUpdate !== 'function'
  ) {
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
  if (
    foundWillMountName !== null ||
    foundWillReceivePropsName !== null ||
    foundWillUpdateName !== null
  ) {
    var componentName = Component.displayName || Component.name;
    var newApiName =
      typeof Component.getDerivedStateFromProps === 'function'
        ? 'getDerivedStateFromProps()'
        : 'getSnapshotBeforeUpdate()';

    throw Error(
      'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
        componentName +
        ' uses ' +
        newApiName +
        ' but also contains the following legacy lifecycles:' +
        (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
        (foundWillReceivePropsName !== null
          ? '\n  ' + foundWillReceivePropsName
          : '') +
        (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
        '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
        'https://fb.me/react-async-component-lifecycle-hooks'
    );
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
      throw new Error(
        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
      );
    }

    prototype.componentWillUpdate = componentWillUpdate;

    var componentDidUpdate = prototype.componentDidUpdate;

    prototype.componentDidUpdate = function componentDidUpdatePolyfill(
      prevProps,
      prevState,
      maybeSnapshot
    ) {
      // 16.3+ will not execute our will-update method;
      // It will pass a snapshot value to did-update though.
      // Older versions will require our polyfilled will-update value.
      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
      // Because for <= 15.x versions this might be a "prevContext" object.
      // We also can't just check "__reactInternalSnapshot",
      // Because get-snapshot might return a falsy value.
      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
      var snapshot = this.__reactInternalSnapshotFlag
        ? this.__reactInternalSnapshot
        : maybeSnapshot;

      componentDidUpdate.call(this, prevProps, prevState, snapshot);
    };
  }

  return Component;
}




/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isShallowEqual = isShallowEqual;
exports.chunk = chunk;
exports.groupBySortedKeys = groupBySortedKeys;
exports.has = exports.makeArray = void 0;

var _warning = _interopRequireDefault(__webpack_require__(41));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeArray = function makeArray(obj) {
  return obj == null ? [] : [].concat(obj);
};

exports.makeArray = makeArray;

var has = function has(o, k) {
  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
};

exports.has = has;

function isShallowEqual(a, b) {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return +a === +b;
  if (typeof a !== 'object' && typeof b !== 'object') return a === b;
  if (typeof a !== typeof b) return false;
  if (a == null || b == null) return false; // if they were both null we wouldn't be here

  var keysA = Object.keys(a);
  var keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!has(b, keysA[i]) || a[keysA[i]] !== b[keysA[i]]) return false;
  }

  return true;
}

function chunk(array, chunkSize) {
  var index = 0,
      length = array ? array.length : 0;
  var result = [];
  chunkSize = Math.max(+chunkSize || 1, 1);

  while (index < length) {
    result.push(array.slice(index, index += chunkSize));
  }

  return result;
}

function groupBySortedKeys(groupBy, data, keys) {
  var iter = typeof groupBy === 'function' ? groupBy : function (item) {
    return item[groupBy];
  }; // the keys array ensures that groups are rendered in the order they came in
  // which means that if you sort the data array it will render sorted,
  // so long as you also sorted by group

  keys = keys || [];
   false ? (0, _warning.default)(typeof groupBy !== 'string' || !data.length || has(data[0], groupBy), "[React Widgets] You seem to be trying to group this list by a " + ("property `" + groupBy + "` that doesn't exist in the dataset items, this may be a typo")) : void 0;
  return data.reduce(function (grps, item) {
    var group = iter(item);

    if (has(grps, group)) {
      grps[group].push(item);
    } else {
      keys.push(group);
      grps[group] = [item];
    }

    return grps;
  }, {});
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.notify = notify;
exports.instanceId = instanceId;
exports.isFirstFocusedRender = isFirstFocusedRender;
var idCount = 0;

function uniqueId(prefix) {
  return '' + ((prefix == null ? '' : prefix) + ++idCount);
}

function notify(handler, args) {
  handler && handler.apply(null, [].concat(args));
}

function instanceId(component, suffix) {
  if (suffix === void 0) {
    suffix = '';
  }

  component.__id || (component.__id = uniqueId('rw_'));
  return (component.props.id || component.__id) + suffix;
}
/**
 * Allows for defering popup rendering untill the widget is focused,
 * or has been opened (in order to not remove it suddenly on close)
 */


function isFirstFocusedRender(component) {
  return component._firstFocus || (component.state.focused || !!component.props.open) && (component._firstFocus = true);
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.widgetEditable = exports.widgetEnabled = exports.isInDisabledFieldset = void 0;

var _reactDom = __webpack_require__(6);

var _matches = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isInDisabledFieldset = function isInDisabledFieldset(inst) {
  var node;

  try {
    node = (0, _reactDom.findDOMNode)(inst);
  } catch (err) {
    /* ignore */
  }

  return !!node && (0, _matches.default)(node, 'fieldset[disabled] *');
};

exports.isInDisabledFieldset = isInDisabledFieldset;
var widgetEnabled = interactionDecorator(true);
exports.widgetEnabled = widgetEnabled;
var widgetEditable = interactionDecorator(false);
exports.widgetEditable = widgetEditable;

function interactionDecorator(disabledOnly) {
  function wrap(method) {
    return function decoratedMethod() {
      var _this$props = this.props,
          disabled = _this$props.disabled,
          readOnly = _this$props.readOnly;
      disabled = isInDisabledFieldset(this) || disabled == true || !disabledOnly && readOnly === true;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (!disabled) return method.apply(this, args);
    };
  }

  return function decorate(target, key, desc) {
    if (desc.initializer) {
      var init = desc.initializer;

      desc.initializer = function () {
        return wrap(init.call(this)).bind(this);
      };
    } else desc.value = wrap(desc.value);

    return desc;
  };
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getMessages = getMessages;

var _react = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messages = {
  moveBack: 'Navigate back',
  moveForward: 'Navigate forward',
  dateButton: 'Select date',
  timeButton: 'Select time',
  openCombobox: 'open combobox',
  openDropdown: 'open dropdown',
  placeholder: '',
  filterPlaceholder: '',
  emptyList: 'There are no items in this list',
  emptyFilter: 'The filter returned no results',
  createOption: function createOption(_ref) {
    var searchTerm = _ref.searchTerm;
    return [' Create option', searchTerm && ' ', searchTerm && _react.default.createElement("strong", {
      key: "_"
    }, "\"" + searchTerm + "\"")];
  },
  tagsLabel: 'Selected items',
  removeLabel: 'Remove selected item',
  noneSelected: 'no selected items',
  selectedItems: function selectedItems(labels) {
    return "Selected items: " + labels.join(', ');
  },
  // number
  increment: 'Increment value',
  decrement: 'Decrement value'
};

function getMessages(defaults) {
  if (defaults === void 0) {
    defaults = {};
  }

  var processed = {};
  Object.keys(messages).forEach(function (message) {
    var value = defaults[message];
    if (value == null) value = messages[message];
    processed[message] = typeof value === 'function' ? value : function () {
      return value;
    };
  });
  return processed;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _dateArithmetic = _interopRequireDefault(__webpack_require__(96));

var _localizers = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var dates = _extends({}, _dateArithmetic.default, {
  monthsInYear: function monthsInYear(year) {
    var date = new Date(year, 0, 1);
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (i) {
      return dates.month(date, i);
    });
  },
  firstVisibleDay: function firstVisibleDay(date, culture) {
    var firstOfMonth = dates.startOf(date, 'month');
    return dates.startOf(firstOfMonth, 'week', _localizers.date.firstOfWeek(culture));
  },
  lastVisibleDay: function lastVisibleDay(date, culture) {
    var endOfMonth = dates.endOf(date, 'month');
    return dates.endOf(endOfMonth, 'week', _localizers.date.firstOfWeek(culture));
  },
  visibleDays: function visibleDays(date, culture) {
    var current = dates.firstVisibleDay(date, culture);
    var last = dates.lastVisibleDay(date, culture);
    var days = [];

    while (dates.lte(current, last, 'day')) {
      days.push(current);
      current = dates.add(current, 1, 'day');
    }

    return days;
  },
  merge: function merge(date, time, defaultDate) {
    if (time == null && date == null) return null;
    if (time == null) time = defaultDate || new Date();
    if (date == null) date = defaultDate || new Date();
    date = dates.startOf(date, 'day');
    date = dates.hours(date, dates.hours(time));
    date = dates.minutes(date, dates.minutes(time));
    date = dates.seconds(date, dates.seconds(time));
    return dates.milliseconds(date, dates.milliseconds(time));
  },
  today: function today() {
    return dates.startOf(new Date(), 'day');
  },
  tomorrow: function tomorrow() {
    return dates.add(dates.startOf(new Date(), 'day'), 1, 'day');
  }
});

var _default = dates;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = uncontrollable;

var _react = _interopRequireDefault(__webpack_require__(1));

var _invariant = _interopRequireDefault(__webpack_require__(26));

var Utils = _interopRequireWildcard(__webpack_require__(72));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function uncontrollable(Component, controlledValues, methods) {
  if (methods === void 0) {
    methods = [];
  }

  var displayName = Component.displayName || Component.name || 'Component';
  var isCompositeComponent = Utils.isReactComponent(Component);
  var controlledProps = Object.keys(controlledValues);
  var PROPS_TO_OMIT = controlledProps.map(Utils.defaultKey);
  !(isCompositeComponent || !methods.length) ?  false ? (0, _invariant.default)(false, '[uncontrollable] stateless function components cannot pass through methods ' + 'because they have no associated instances. Check component: ' + displayName + ', ' + 'attempting to pass through methods: ' + methods.join(', ')) : invariant(false) : void 0;

  var UncontrolledComponent =
  /*#__PURE__*/
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

          _this._values[propName] = value;
          if (!_this.unmounted) _this.forceUpdate();
        };

        _this.handlers[handlerName] = handleChange;
      });
      if (isCompositeComponent) _this.attachRef = function (ref) {
        _this.inner = ref;
      };
      return _this;
    }

    var _proto = UncontrolledComponent.prototype;

    _proto.shouldComponentUpdate = function shouldComponentUpdate() {
      //let the forceUpdate trigger the update
      return !this._notifying;
    };

    _proto.componentWillMount = function componentWillMount() {
      var _this2 = this;

      var props = this.props;
      this._values = Object.create(null);
      controlledProps.forEach(function (key) {
        _this2._values[key] = props[Utils.defaultKey(key)];
      });
    };

    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var props = this.props;
      controlledProps.forEach(function (key) {
        /**
         * If a prop switches from controlled to Uncontrolled
         * reset its value to the defaultValue
         */
        if (!Utils.isProp(nextProps, key) && Utils.isProp(props, key)) {
          _this3._values[key] = nextProps[Utils.defaultKey(key)];
        }
      });
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.unmounted = true;
    };

    _proto.getControlledInstance = function getControlledInstance() {
      return this.inner;
    };

    _proto.render = function render() {
      var _this4 = this;

      var props = _extends({}, this.props);

      PROPS_TO_OMIT.forEach(function (prop) {
        delete props[prop];
      });
      var newProps = {};
      controlledProps.forEach(function (propName) {
        var propValue = _this4.props[propName];
        newProps[propName] = propValue !== undefined ? propValue : _this4._values[propName];
      });
      return _react.default.createElement(Component, _extends({}, props, newProps, this.handlers, {
        ref: this.attachRef
      }));
    };

    return UncontrolledComponent;
  }(_react.default.Component);

  UncontrolledComponent.displayName = "Uncontrolled(" + displayName + ")";
  UncontrolledComponent.propTypes = Utils.uncontrolledPropTypes(controlledValues, displayName);
  methods.forEach(function (method) {
    UncontrolledComponent.prototype[method] = function $proxiedMethod() {
      var _inner;

      return (_inner = this.inner)[method].apply(_inner, arguments);
    };
  });
  UncontrolledComponent.ControlledComponent = Component;
  /**
   * useful when wrapping a Component and you want to control
   * everything
   */

  UncontrolledComponent.deferControlTo = function (newComponent, additions, nextMethods) {
    if (additions === void 0) {
      additions = {};
    }

    return uncontrollable(newComponent, _extends({}, controlledValues, additions), nextMethods);
  };

  return UncontrolledComponent;
}

module.exports = exports["default"];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Widget =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Widget, _React$Component);

  function Widget() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Widget.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        tabIndex = _this$props.tabIndex,
        focused = _this$props.focused,
        open = _this$props.open,
        dropUp = _this$props.dropUp,
        disabled = _this$props.disabled,
        readOnly = _this$props.readOnly,
        autofilling = _this$props.autofilling,
        _this$props$isRtl = _this$props.isRtl,
        isRtl = _this$props$isRtl === void 0 ? this.context.isRtl : _this$props$isRtl,
        props = _objectWithoutProperties(_this$props, ["className", "tabIndex", "focused", "open", "dropUp", "disabled", "readOnly", "autofilling", "isRtl"]);

    tabIndex = tabIndex != null ? tabIndex : '-1';
    return _react.default.createElement("div", _extends({}, props, {
      tabIndex: tabIndex,
      className: (0, _classnames.default)(className, 'rw-widget', isRtl && 'rw-rtl', disabled && 'rw-state-disabled', readOnly && 'rw-state-readonly', focused && 'rw-state-focus', autofilling && 'rw-webkit-autofill', open && "rw-open" + (dropUp ? '-up' : ''))
    }));
  };

  return Widget;
}(_react.default.Component);

Widget.contextTypes = {
  isRtl: _propTypes.default.bool
};
Widget.propTypes = {
  tabIndex: _propTypes.default.node,
  focused: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  autofilling: _propTypes.default.bool,
  open: _propTypes.default.bool,
  dropUp: _propTypes.default.bool,
  isRtl: _propTypes.default.bool
};
var _default = Widget;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = createFocusManager;

var _reactComponentManagers = __webpack_require__(21);

var _interaction = __webpack_require__(10);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function createFocusManager(inst, options) {
  var _didHandle = options.didHandle;
  return (0, _reactComponentManagers.focusManager)(inst, _extends({}, options, {
    onChange: function onChange(focused) {
      inst.setState({
        focused: focused
      });
    },
    isDisabled: function isDisabled() {
      return inst.props.disabled === true || (0, _interaction.isInDisabledFieldset)(inst);
    },
    didHandle: function didHandle(focused, event) {
      var handler = this.props[focused ? 'onFocus' : 'onBlur'];
      handler && handler(event);
      if (_didHandle && !event.isWidgetDefaultPrevented) _didHandle(focused, event);
    }
  }));
}

module.exports = exports["default"];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Loading = function Loading() {
  return _react.default.createElement("span", {
    "aria-hidden": "true",
    className: "rw-i rw-loading"
  });
};

var Button =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Button, _React$Component);

  function Button() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        disabled = _this$props.disabled,
        label = _this$props.label,
        icon = _this$props.icon,
        busy = _this$props.busy,
        active = _this$props.active,
        children = _this$props.children,
        _this$props$variant = _this$props.variant,
        variant = _this$props$variant === void 0 ? 'primary' : _this$props$variant,
        _this$props$spinner = _this$props.spinner,
        spinner = _this$props$spinner === void 0 ? _react.default.createElement(Loading, null) : _this$props$spinner,
        _this$props$component = _this$props.component,
        Tag = _this$props$component === void 0 ? 'button' : _this$props$component,
        props = _objectWithoutProperties(_this$props, ["className", "disabled", "label", "icon", "busy", "active", "children", "variant", "spinner", "component"]);

    var type = props.type;
    if (Tag === 'button') type = type || 'button';
    return _react.default.createElement(Tag, _extends({}, props, {
      tabIndex: "-1",
      title: label,
      type: type,
      disabled: disabled,
      "aria-disabled": disabled,
      "aria-label": label,
      className: (0, _classnames.default)(className, 'rw-btn', active && !disabled && 'rw-state-active', variant && 'rw-btn-' + variant)
    }), busy ? spinner : icon, children);
  };

  return Button;
}(_react.default.Component);

Button.propTypes = {
  disabled: _propTypes.default.bool,
  label: _propTypes.default.string,
  icon: _propTypes.default.node,
  busy: _propTypes.default.bool,
  active: _propTypes.default.bool,
  variant: _propTypes.default.oneOf(['primary', 'select']),
  component: _propTypes.default.any,
  spinner: _propTypes.default.node
};
var _default = Button;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.defaultGetDataState = defaultGetDataState;
exports.getCommonListProps = getCommonListProps;
exports.default = reduceToListState;

var _Filter = __webpack_require__(32);

var _ = __webpack_require__(8);

var _dataHelpers = __webpack_require__(19);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var EMPTY_VALUE = {};

var returnFalse = function returnFalse() {
  return false;
};

function defaultGetDataState(data, _ref, lastState) {
  var groupBy = _ref.groupBy;

  if (lastState === void 0) {
    lastState = {};
  }

  if (lastState.data !== data || lastState.groupBy !== groupBy) {
    if (!groupBy) return {};
    var keys = [];
    var groups = (0, _.groupBySortedKeys)(groupBy, data, keys);
    return {
      data: data,
      groupBy: groupBy,
      groups: groups,
      sortedKeys: keys,
      sequentialData: Object.keys(groups).reduce(function (flat, grp) {
        return flat.concat(groups[grp]);
      }, [])
    };
  }

  return lastState;
}

var getStateGetterFromList = function getStateGetterFromList(_ref2) {
  var l = _ref2.listComponent;
  return l && l.getDataState;
};

var getIsDisabled = function getIsDisabled(disabledProp, valueField) {
  return !Array.isArray(disabledProp) ? returnFalse : function (item) {
    return disabledProp.some(function (i) {
      return (0, _dataHelpers.dataValue)(item, valueField) === (0, _dataHelpers.dataValue)(i, valueField);
    });
  };
};

function getCommonListProps(list, accessors, _ref3) {
  var groupBy = _ref3.groupBy,
      optionComponent = _ref3.optionComponent,
      itemComponent = _ref3.itemComponent,
      groupComponent = _ref3.groupComponent,
      searchTerm = _ref3.searchTerm,
      listProps = _ref3.listProps;
  return _extends({
    searchTerm: searchTerm,
    groupBy: groupBy,
    groupComponent: groupComponent,
    itemComponent: itemComponent,
    optionComponent: optionComponent
  }, listProps, {
    data: list.data,
    dataState: list.state,
    textAccessor: accessors.text,
    valueAccessor: accessors.value
  });
}

function reduceToListState(nextListData, prevList, _temp) {
  var _ref4 = _temp === void 0 ? {} : _temp,
      nextProps = _ref4.nextProps,
      getDataState = _ref4.getDataState;

  var disabled = nextProps.disabled,
      valueField = nextProps.valueField,
      textField = nextProps.textField;
  getDataState = getDataState || getStateGetterFromList(nextProps) || defaultGetDataState;
  var dataState = getDataState(nextListData, nextProps, prevList && prevList.dataState);
  var data = dataState && dataState.sequentialData || nextListData;
  var isDisabled = getIsDisabled(disabled, valueField);

  var moveNext = function moveNext(item, word) {
    return isDisabled(item) || word && !_Filter.presets.startsWith((0, _dataHelpers.dataText)(item, textField).toLowerCase(), word.toLowerCase());
  };

  var list = {
    dataState: dataState,
    isDisabled: isDisabled,
    first: function first() {
      return list.next(EMPTY_VALUE);
    },
    last: function last() {
      return list.prevEnabled(data[data.length - 1]);
    },
    prev: function prev(item, word) {
      var nextIdx = Math.max(0, data.indexOf(item)) - 1;

      while (nextIdx > -1 && moveNext(data[nextIdx], word)) {
        nextIdx--;
      }

      if (nextIdx >= 0) return data[nextIdx];
      return isDisabled(item) ? null : item;
    },
    next: function next(item, word) {
      var nextIdx = data.indexOf(item) + 1;

      while (nextIdx < data.length && moveNext(data[nextIdx], word)) {
        nextIdx++;
      }

      if (nextIdx < data.length) return data[nextIdx];
      return isDisabled(item) ? null : item;
    },
    prevEnabled: function prevEnabled(item) {
      return isDisabled(item) ? list.prev(item) : item;
    },
    nextEnabled: function nextEnabled(item) {
      return isDisabled(item) ? list.next(item) : item;
    }
  };
  return list;
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.dataIndexOf = dataIndexOf;
exports.valueMatcher = valueMatcher;
exports.dataItem = dataItem;
exports.dataText = exports.dataValue = void 0;

var _ = __webpack_require__(8);

var dataValue = function dataValue(data, field) {
  var value = data;
  if (typeof field === 'function') value = field(data);else if (data == null) value = data;else if (typeof field === 'string' && typeof data === 'object' && field in data) value = data[field];
  return value;
};

exports.dataValue = dataValue;

var dataText = function dataText(item, textField) {
  var value = dataValue(item, textField);
  return value == null ? '' : value + '';
};

exports.dataText = dataText;

function dataIndexOf(data, item, valueField) {
  var idx = -1;

  var isValueEqual = function isValueEqual(datum) {
    return valueMatcher(item, datum, valueField);
  };

  while (++idx < data.length) {
    var datum = data[idx];
    if (datum === item || isValueEqual(datum)) return idx;
  }

  return -1;
}
/**
 * I don't know that the shallow equal makes sense here but am too afraid to
 * remove it.
 */


function valueMatcher(a, b, valueField) {
  return (0, _.isShallowEqual)(dataValue(a, valueField), dataValue(b, valueField));
}

function dataItem(data, item, valueField) {
  var idx = dataIndexOf(data, item, valueField);
  return idx !== -1 ? data[idx] : item;
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.search = exports.clock = exports.calendar = exports.chevronLeft = exports.chevronRight = exports.caretDown = exports.caretUp = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _react = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  icon: _propTypes.default.string.isRequired
};

var Icon = function Icon(_ref) {
  var icon = _ref.icon;
  return _react.default.createElement("span", {
    "aria-hidden": "true",
    className: "rw-i rw-i-" + icon
  });
};

Icon.propTypes = propTypes;

var caretUp = _react.default.createElement(Icon, {
  icon: "caret-up"
});

exports.caretUp = caretUp;

var caretDown = _react.default.createElement(Icon, {
  icon: "caret-down"
});

exports.caretDown = caretDown;

var chevronRight = _react.default.createElement(Icon, {
  icon: "chevron-right"
});

exports.chevronRight = chevronRight;

var chevronLeft = _react.default.createElement(Icon, {
  icon: "chevron-left"
});

exports.chevronLeft = chevronLeft;

var calendar = _react.default.createElement(Icon, {
  icon: "calendar"
});

exports.calendar = calendar;

var clock = _react.default.createElement(Icon, {
  icon: "clock-o"
});

exports.clock = clock;

var search = _react.default.createElement(Icon, {
  icon: "search"
});

exports.search = search;
var _default = Icon;
exports.default = _default;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _spyOnComponent = _interopRequireDefault(__webpack_require__(28));

exports.spyOnComponent = _spyOnComponent.default;

var _autoFocus = _interopRequireDefault(__webpack_require__(64));

exports.autoFocus = _autoFocus.default;

var _focusManager = _interopRequireDefault(__webpack_require__(70));

exports.focusManager = _focusManager.default;

var _mountManager = _interopRequireDefault(__webpack_require__(35));

exports.mountManager = _mountManager.default;

var _timeoutManager = _interopRequireDefault(__webpack_require__(43));

exports.timeoutManager = _timeoutManager.default;

var _mixin = _interopRequireDefault(__webpack_require__(71));

exports.mixin = _mixin.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var WidgetPicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(WidgetPicker, _React$Component);

  function WidgetPicker() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = WidgetPicker.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        open = _this$props.open,
        dropUp = _this$props.dropUp,
        className = _this$props.className,
        disabled = _this$props.disabled,
        readOnly = _this$props.readOnly,
        focused = _this$props.focused,
        props = _objectWithoutProperties(_this$props, ["open", "dropUp", "className", "disabled", "readOnly", "focused"]);

    var openClass = "rw-open" + (dropUp ? '-up' : '');
    return _react.default.createElement("div", _extends({}, props, {
      className: (0, _classnames.default)(className, 'rw-widget-picker', 'rw-widget-container', open && openClass, disabled && 'rw-state-disabled', readOnly && 'rw-state-readonly', focused && 'rw-state-focus')
    }));
  };

  return WidgetPicker;
}(_react.default.Component);

WidgetPicker.propTypes = {
  tabIndex: _propTypes.default.node,
  focused: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  open: _propTypes.default.bool,
  dropUp: _propTypes.default.bool,
  picker: _propTypes.default.bool
};
var _default = WidgetPicker;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _Button = _interopRequireDefault(__webpack_require__(17));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Select =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Select, _React$Component);

  function Select() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Select.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        bordered = _this$props.bordered,
        children = _this$props.children,
        props = _objectWithoutProperties(_this$props, ["className", "bordered", "children"]);

    return _react.default.createElement("span", {
      className: (0, _classnames.default)(className, 'rw-select', bordered && 'rw-select-bordered')
    }, children ? _react.default.Children.map(children, function (child) {
      return child && _react.default.cloneElement(child, {
        variant: 'select'
      });
    }) : _react.default.createElement(_Button.default, _extends({}, props, {
      variant: "select"
    })));
  };

  return Select;
}(_react.default.Component);

Select.propTypes = {
  bordered: _propTypes.default.bool
};
var _default = Select;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactDom = __webpack_require__(6);

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

var Props = _interopRequireWildcard(__webpack_require__(4));

var _widgetHelpers = __webpack_require__(9);

var _reduceToListState = __webpack_require__(18);

var _Listbox = _interopRequireDefault(__webpack_require__(54));

var _ListOption = _interopRequireDefault(__webpack_require__(38));

var _ListOptionGroup = _interopRequireDefault(__webpack_require__(85));

var _messages = __webpack_require__(12);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var EMPTY_DATA_STATE = {};
var propTypes = {
  data: _propTypes.default.array,
  dataState: _propTypes.default.shape({
    sortedKeys: _propTypes.default.array,
    groups: _propTypes.default.object,
    data: _propTypes.default.array,
    sequentialData: _propTypes.default.array
  }),
  valueAccessor: CustomPropTypes.accessor,
  textAccessor: CustomPropTypes.accessor,
  onSelect: _propTypes.default.func,
  onMove: _propTypes.default.func,
  activeId: _propTypes.default.string,
  itemComponent: CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
  optionComponent: CustomPropTypes.elementType,
  renderItem: _propTypes.default.func,
  renderGroup: _propTypes.default.func,
  focusedItem: _propTypes.default.any,
  selectedItem: _propTypes.default.any,
  searchTerm: _propTypes.default.string,
  isDisabled: _propTypes.default.func.isRequired,
  messages: _propTypes.default.shape({
    emptyList: _propTypes.default.func.isRequired
  })
};
var defaultProps = {
  onSelect: function onSelect() {},
  data: [],
  dataState: EMPTY_DATA_STATE,
  optionComponent: _ListOption.default
};

var List =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(List, _React$Component);

  function List() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.renderItem = function (_ref) {
      var item = _ref.item,
          rest = _objectWithoutProperties(_ref, ["item"]);

      var _this$props = _this.props,
          isDisabled = _this$props.isDisabled,
          renderItem = _this$props.renderItem,
          textAccessor = _this$props.textAccessor,
          valueAccessor = _this$props.valueAccessor;
      var Component = _this.props.itemComponent;

      if (renderItem) {
        return renderItem(_extends({
          item: item
        }, rest));
      } else if (Component) {
        return _react.default.createElement(Component, _extends({
          item: item,
          value: valueAccessor(item),
          text: textAccessor(item),
          disabled: isDisabled(item)
        }, rest));
      }

      return textAccessor(item);
    };

    _this.renderGroup = function (group) {
      var _this$props2 = _this.props,
          renderGroup = _this$props2.renderGroup,
          Component = _this$props2.groupComponent;

      if (renderGroup) {
        return renderGroup({
          group: group
        });
      } else if (Component) {
        return _react.default.createElement(Component, {
          item: group
        });
      }

      return group;
    };

    return _this;
  }

  var _proto = List.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.move();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.move();
  };

  _proto.mapItems = function mapItems(fn) {
    var _this$props3 = this.props,
        data = _this$props3.data,
        dataState = _this$props3.dataState;
    var sortedKeys = dataState.sortedKeys,
        groups = dataState.groups;
    if (!groups) return data.map(function (item, idx) {
      return fn(item, idx, false);
    });
    var idx = -1;
    return sortedKeys.reduce(function (items, key) {
      var group = groups[key];
      return items.concat(fn(key, idx, true), group.map(function (item) {
        return fn(item, ++idx, false);
      }));
    }, []);
  };

  _proto.move = function move() {
    var _this$props4 = this.props,
        focusedItem = _this$props4.focusedItem,
        onMove = _this$props4.onMove,
        data = _this$props4.data,
        dataState = _this$props4.dataState;
    var list = (0, _reactDom.findDOMNode)(this);
    var idx = renderedIndexOf(focusedItem, list, data, dataState);
    var selectedItem = list.children[idx];
    if (selectedItem) (0, _widgetHelpers.notify)(onMove, [selectedItem, list, focusedItem]);
  };

  _proto.renderOption = function renderOption(item, index) {
    var _this$props5 = this.props,
        activeId = _this$props5.activeId,
        focusedItem = _this$props5.focusedItem,
        selectedItem = _this$props5.selectedItem,
        onSelect = _this$props5.onSelect,
        isDisabled = _this$props5.isDisabled,
        searchTerm = _this$props5.searchTerm,
        Option = _this$props5.optionComponent;
    var isFocused = focusedItem === item;
    return _react.default.createElement(Option, {
      dataItem: item,
      key: 'item_' + index,
      index: index,
      activeId: activeId,
      focused: isFocused,
      onSelect: onSelect,
      disabled: isDisabled(item),
      selected: selectedItem === item
    }, this.renderItem({
      item: item,
      index: index,
      searchTerm: searchTerm
    }));
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props6 = this.props,
        className = _this$props6.className,
        messages = _this$props6.messages;
    var elementProps = Props.pickElementProps(this);

    var _getMessages = (0, _messages.getMessages)(messages),
        emptyList = _getMessages.emptyList;

    return _react.default.createElement(_Listbox.default, _extends({}, elementProps, {
      className: className,
      emptyListMessage: emptyList(this.props)
    }), this.mapItems(function (item, idx, isHeader) {
      return isHeader ? _react.default.createElement(_ListOptionGroup.default, {
        key: 'group_' + item,
        group: item
      }, _this2.renderGroup(item)) : _this2.renderOption(item, idx);
    }));
  };

  return List;
}(_react.default.Component);

List.getDataState = _reduceToListState.defaultGetDataState;

function renderedIndexOf(item, list, data, dataState) {
  var groups = dataState.groups,
      sortedKeys = dataState.sortedKeys;
  if (!groups) return data.indexOf(item);
  var runningIdx = -1;
  var idx = -1;
  sortedKeys.some(function (group) {
    var itemIdx = groups[group].indexOf(item);
    runningIdx++;

    if (itemIdx !== -1) {
      idx = runningIdx + itemIdx + 1;
      return true;
    }

    runningIdx += groups[group].length;
  });
  return idx;
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;
var _default = List;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = createScrollManager;

var _scrollTo = _interopRequireDefault(__webpack_require__(87));

var _reactComponentManagers = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createScrollManager(inst, getScrollParent) {
  if (getScrollParent === void 0) {
    getScrollParent = function getScrollParent(list) {
      return list.parentNode;
    };
  }

  var isMounted = (0, _reactComponentManagers.mountManager)(inst);
  var currentFocused, currentVisible, cancelScroll;

  function handleScroll(selected, list, nextFocused) {
    if (!isMounted()) return;
    var lastVisible = currentVisible;
    var lastItem = currentFocused;
    var shown, changed;
    currentVisible = !(!list.offsetWidth || !list.offsetHeight);
    currentFocused = nextFocused;
    changed = lastItem !== nextFocused;
    shown = currentVisible && !lastVisible;

    if (shown || currentVisible && changed) {
      if (this.props.onMove) this.props.onMove(selected, list, nextFocused);else {
        cancelScroll && cancelScroll();
        cancelScroll = (0, _scrollTo.default)(selected, false && getScrollParent(list));
      }
    }
  }

  return handleScroll.bind(inst);
}

module.exports = exports["default"];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

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

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = activeElement;

var _ownerDocument = __webpack_require__(42);

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
/* 28 */
/***/ (function(module, exports) {

var LIFECYCLE_HOOKS = {
  componentWillMount: true,
  componentDidMount: true,
  componentWillReceiveProps: true,
  getSnapshotBeforeUpdate: true,
  shouldComponentUpdate: true,
  componentWillUpdate: true,
  componentDidUpdate: true,
  componentWillUnmount: true,
}

var STATIC_HOOKS = {
  getDerivedStateFromProps: true,
}

function wrap(base, method, isStatic) {
  var before = true

  if (Array.isArray(method)) {
    before = method[0] !== 'after'
    method = method[1]
  }

  if (!base) return method

  return function wrappedLifecyclehook() {
    var ctx = isStatic ? null : this
    before && method.apply(ctx, arguments)
    base.apply(ctx, arguments)
    !before && method.apply(ctx, arguments)
  }
}

module.exports = function spyOnComponent(component, hooks) {
  var originals = Object.create(null)

  for (var key in hooks)
    if (STATIC_HOOKS[key])
      component.constructor[key] = wrap(
        (originals[key] = component.constructor[key]),
        hooks[key],
        true
      )

  for (var key in hooks)
    if (LIFECYCLE_HOOKS[key])
      component[key] = wrap((originals[key] = component[key]), hooks[key])

  return function reset(key) {
    var subject = STATIC_HOOKS[key] ? component.constructor : component

    if (key && key in originals) subject[key] = originals[key]
    else for (var key in originals) subject[key] = originals[key]
  }
}

module.exports.mixin = function mixinIntoComponent(componentClass, hooks) {
  spyOnComponent(componentClass.prototype, hooks)
  return componentClass
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _react = _interopRequireWildcard(__webpack_require__(1));

var _SlideDownTransition = _interopRequireDefault(__webpack_require__(44));

var _PropTypes = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var StaticContainer =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(StaticContainer, _React$Component);

  function StaticContainer() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = StaticContainer.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(_ref) {
    var shouldUpdate = _ref.shouldUpdate;
    return !!shouldUpdate;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutProperties(_this$props, ["className", "children"]);

    delete props.shouldUpdate;
    return (0, _react.cloneElement)(children, _extends({}, props, {
      className: (0, _classnames.default)(className, children.props.className, 'rw-popup')
    }));
  };

  return StaticContainer;
}(_react.default.Component);

StaticContainer.propTypes = {
  shouldUpdate: function shouldUpdate() {}
};

var Popup =
/*#__PURE__*/
function (_React$Component2) {
  _inheritsLoose(Popup, _React$Component2);

  function Popup() {
    return _React$Component2.apply(this, arguments) || this;
  }

  var _proto2 = Popup.prototype;

  _proto2.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        dropUp = _this$props2.dropUp,
        open = _this$props2.open,
        Transition = _this$props2.transition,
        props = _objectWithoutProperties(_this$props2, ["className", "dropUp", "open", "transition"]);

    return _react.default.createElement(Transition, _extends({}, props, {
      in: open,
      dropUp: dropUp,
      className: (0, _classnames.default)(className, 'rw-popup-container')
    }), _react.default.createElement(StaticContainer, {
      shouldUpdate: open
    }, _react.default.Children.only(this.props.children)));
  };

  return Popup;
}(_react.default.Component);

Popup.defaultProps = {
  open: false,
  transition: _SlideDownTransition.default
};
Popup.propTypes = {
  open: _propTypes.default.bool,
  dropUp: _propTypes.default.bool,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  transition: _PropTypes.elementType
};
var _default = Popup;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = height;

var _offset = __webpack_require__(51);

var _offset2 = _interopRequireDefault(_offset);

var _isWindow = __webpack_require__(31);

var _isWindow2 = _interopRequireDefault(_isWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function height(node, client) {
  var win = (0, _isWindow2.default)(node);
  return win ? win.innerHeight : client ? node.clientHeight : (0, _offset2.default)(node).height;
}
module.exports = exports['default'];

/***/ }),
/* 31 */
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.indexOf = indexOf;
exports.filter = filter;
exports.suggest = suggest;
exports.propTypes = exports.presets = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

var _dataHelpers = __webpack_require__(19);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var presets = {
  eq: function eq(a, b) {
    return a === b;
  },
  neq: function neq(a, b) {
    return a !== b;
  },
  gt: function gt(a, b) {
    return a > b;
  },
  gte: function gte(a, b) {
    return a >= b;
  },
  lt: function lt(a, b) {
    return a < b;
  },
  lte: function lte(a, b) {
    return a <= b;
  },
  contains: function contains(a, b) {
    return a.indexOf(b) !== -1;
  },
  startsWith: function startsWith(a, b) {
    return a.lastIndexOf(b, 0) === 0;
  },
  endsWith: function endsWith(a, b) {
    var pos = a.length - b.length;
    var lastIndex = a.indexOf(b, pos);
    return lastIndex !== -1 && lastIndex === pos;
  }
};
exports.presets = presets;

function normalizeFilterType(type) {
  if (type === false) return null;
  if (type === true) return 'startsWith';
  return type || 'eq';
}

function normalizeFilter(_ref) {
  var filter = _ref.filter,
      _ref$caseSensitive = _ref.caseSensitive,
      caseSensitive = _ref$caseSensitive === void 0 ? false : _ref$caseSensitive,
      textField = _ref.textField;
  filter = normalizeFilterType(filter);

  if (typeof filter === 'function' || !filter) {
    return filter;
  }

  filter = presets[filter];
  return function (item, searchTerm) {
    var textValue = (0, _dataHelpers.dataText)(item, textField);

    if (!caseSensitive) {
      textValue = textValue.toLowerCase();
      searchTerm = searchTerm.toLowerCase();
    }

    return filter(textValue, searchTerm);
  };
}

function normalizeOptions(nextOptions) {
  var options = _extends({}, nextOptions);

  options.minLengh = options.minLengh || 0;
  options.filter = normalizeFilter(options);
  return options;
}

var propTypes = {
  textField: CustomPropTypes.accessor,
  caseSensitive: _propTypes.default.bool,
  minLength: _propTypes.default.number,
  filter: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.bool, _propTypes.default.oneOf(Object.keys(presets))])
};
exports.propTypes = propTypes;

function indexOf(data, _ref2) {
  var _ref2$searchTerm = _ref2.searchTerm,
      searchTerm = _ref2$searchTerm === void 0 ? '' : _ref2$searchTerm,
      options = _objectWithoutProperties(_ref2, ["searchTerm"]);

  var _normalizeOptions = normalizeOptions(options),
      filter = _normalizeOptions.filter,
      minLength = _normalizeOptions.minLength;

  if (!filter || !searchTerm || !searchTerm.trim() || searchTerm.length < minLength) return -1;

  for (var idx = 0; idx < data.length; idx++) {
    if (filter(data[idx], searchTerm, idx)) return idx;
  }

  return -1;
}

function filter(data, _ref3) {
  var _ref3$searchTerm = _ref3.searchTerm,
      searchTerm = _ref3$searchTerm === void 0 ? '' : _ref3$searchTerm,
      options = _objectWithoutProperties(_ref3, ["searchTerm"]);

  var _normalizeOptions2 = normalizeOptions(options),
      filter = _normalizeOptions2.filter,
      minLength = _normalizeOptions2.minLength;

  if (!filter || !searchTerm || !searchTerm.trim() || searchTerm.length < minLength) return data;
  return data.filter(function (item, idx) {
    return filter(item, searchTerm, idx);
  });
}

function suggest(data, _ref4) {
  var _ref4$searchTerm = _ref4.searchTerm,
      searchTerm = _ref4$searchTerm === void 0 ? '' : _ref4$searchTerm,
      options = _objectWithoutProperties(_ref4, ["searchTerm"]);

  var _normalizeOptions3 = normalizeOptions(options),
      filter = _normalizeOptions3.filter,
      minLength = _normalizeOptions3.minLength;

  if (!filter || !searchTerm || !searchTerm.trim() || searchTerm.length < minLength) return searchTerm;

  for (var idx = 0; idx < data.length; idx++) {
    if (filter(data[idx], searchTerm, idx)) return data[idx];
  }

  return searchTerm;
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = createAccessors;

var helpers = _interopRequireWildcard(__webpack_require__(19));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function createAccessors(_ref) {
  var textField = _ref.textField,
      valueField = _ref.valueField;
  return {
    text: function text(item) {
      return helpers.dataText(item, textField);
    },
    value: function value(item) {
      return helpers.dataValue(item, valueField);
    },
    indexOf: function indexOf(data, item) {
      return helpers.dataIndexOf(data, item, valueField);
    },
    matches: function matches(a, b) {
      return helpers.valueMatcher(a, b, valueField);
    },
    findOrSelf: function findOrSelf(data, item) {
      return helpers.dataItem(data, item, valueField);
    },
    includes: function includes(data, item) {
      return helpers.dataIndexOf(data, item, valueField) !== -1;
    }
  };
}

module.exports = exports["default"];

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _dates = _interopRequireDefault(__webpack_require__(13));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var VIEW_UNITS = ['month', 'year', 'decade', 'century'];

function clamp(date, min, max) {
  return _dates.default.max(_dates.default.min(date, max), min);
}

var CalendarView =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(CalendarView, _React$Component);

  function CalendarView() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = CalendarView.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        activeId = _this$props.activeId,
        props = _objectWithoutProperties(_this$props, ["className", "activeId"]);

    return _react.default.createElement("table", _extends({}, props, {
      role: "grid",
      tabIndex: "-1",
      "aria-activedescendant": activeId || null,
      className: (0, _classnames.default)(className, 'rw-nav-view', 'rw-calendar-grid')
    }));
  };

  return CalendarView;
}(_react.default.Component);

CalendarView.propTypes = {
  activeId: _propTypes.default.string
};

var CalendarViewCell =
/*#__PURE__*/
function (_React$Component2) {
  _inheritsLoose(CalendarViewCell, _React$Component2);

  function CalendarViewCell() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component2.call.apply(_React$Component2, [this].concat(args)) || this;

    _this.handleChange = function () {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          min = _this$props2.min,
          max = _this$props2.max,
          date = _this$props2.date;
      onChange(clamp(date, min, max));
    };

    return _this;
  }

  var _proto2 = CalendarViewCell.prototype;

  _proto2.isEmpty = function isEmpty() {
    var _this$props3 = this.props,
        unit = _this$props3.unit,
        min = _this$props3.min,
        max = _this$props3.max,
        date = _this$props3.date;
    return !_dates.default.inRange(date, min, max, unit);
  };

  _proto2.isEqual = function isEqual(date) {
    return _dates.default.eq(this.props.date, date, this.props.unit);
  };

  _proto2.isFocused = function isFocused() {
    return !this.props.disabled && !this.isEmpty() && this.isEqual(this.props.focused);
  };

  _proto2.isNow = function isNow() {
    return this.props.now && this.isEqual(this.props.now);
  };

  _proto2.isOffView = function isOffView() {
    var _this$props4 = this.props,
        viewUnit = _this$props4.viewUnit,
        focused = _this$props4.focused,
        date = _this$props4.date;
    return date && focused && viewUnit && _dates.default[viewUnit](date) !== _dates.default[viewUnit](focused);
  };

  _proto2.isSelected = function isSelected() {
    return this.props.selected && this.isEqual(this.props.selected);
  };

  _proto2.render = function render() {
    var _this$props5 = this.props,
        children = _this$props5.children,
        activeId = _this$props5.activeId,
        label = _this$props5.label,
        disabled = _this$props5.disabled;
    var isDisabled = disabled || this.isEmpty();
    return _react.default.createElement("td", {
      role: "gridcell",
      id: this.isFocused() ? activeId : null,
      title: label,
      "aria-label": label,
      "aria-readonly": disabled,
      "aria-selected": this.isSelected(),
      onClick: !isDisabled ? this.handleChange : undefined,
      className: (0, _classnames.default)('rw-cell', this.isNow() && 'rw-now', isDisabled && 'rw-state-disabled', this.isEmpty() && 'rw-cell-not-allowed', this.isOffView() && 'rw-cell-off-range', this.isFocused() && 'rw-state-focus', this.isSelected() && 'rw-state-selected')
    }, children);
  };

  return CalendarViewCell;
}(_react.default.Component);

CalendarViewCell.propTypes = {
  id: _propTypes.default.string,
  activeId: _propTypes.default.string.isRequired,
  label: _propTypes.default.string,
  now: _propTypes.default.instanceOf(Date),
  date: _propTypes.default.instanceOf(Date),
  selected: _propTypes.default.instanceOf(Date),
  focused: _propTypes.default.instanceOf(Date),
  min: _propTypes.default.instanceOf(Date),
  max: _propTypes.default.instanceOf(Date),
  unit: _propTypes.default.oneOf(['day'].concat(VIEW_UNITS)),
  viewUnit: _propTypes.default.oneOf(VIEW_UNITS),
  onChange: _propTypes.default.func.isRequired,
  disabled: _propTypes.default.bool
};

CalendarView.Body = function (props) {
  return _react.default.createElement("tbody", _extends({
    className: "rw-calendar-body"
  }, props));
};

CalendarView.Row = function (props) {
  return _react.default.createElement("tr", _extends({
    role: "row",
    className: "rw-calendar-row"
  }, props));
};

CalendarView.Cell = CalendarViewCell;
var _default = CalendarView;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = spyOnMount;

var _spyOnComponent = _interopRequireDefault(__webpack_require__(28));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function spyOnMount(componentInstance) {
  var mounted = true;
  (0, _spyOnComponent.default)(componentInstance, {
    componentWillUnmount: function componentWillUnmount() {
      mounted = false;
    }
  });
  return function () {
    return mounted;
  };
}

module.exports = exports["default"];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = style;

var _camelizeStyle = __webpack_require__(50);

var _camelizeStyle2 = _interopRequireDefault(_camelizeStyle);

var _hyphenateStyle = __webpack_require__(76);

var _hyphenateStyle2 = _interopRequireDefault(_hyphenateStyle);

var _getComputedStyle2 = __webpack_require__(78);

var _getComputedStyle3 = _interopRequireDefault(_getComputedStyle2);

var _removeStyle = __webpack_require__(79);

var _removeStyle2 = _interopRequireDefault(_removeStyle);

var _properties = __webpack_require__(37);

var _isTransform = __webpack_require__(80);

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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = undefined;

var _inDOM = __webpack_require__(11);

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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(2));

var Props = _interopRequireWildcard(__webpack_require__(4));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ListOption =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ListOption, _React$Component);

  function ListOption() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleSelect = function (event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          disabled = _this$props.disabled,
          dataItem = _this$props.dataItem;
      if (onSelect && !disabled) onSelect(dataItem, event);
    };

    return _this;
  }

  var _proto = ListOption.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        children = _this$props2.children,
        focused = _this$props2.focused,
        selected = _this$props2.selected,
        disabled = _this$props2.disabled,
        activeId = _this$props2.activeId;
    var Tag = this.props.component || 'li';
    var props = Props.omitOwn(this);
    var classes = {
      'rw-state-focus': focused,
      'rw-state-selected': selected,
      'rw-state-disabled': disabled
    };
    var id = focused ? activeId : undefined;
    return _react.default.createElement(Tag, _extends({
      id: id,
      role: "option",
      tabIndex: !disabled ? '-1' : undefined,
      "aria-selected": !!selected,
      className: (0, _classnames.default)('rw-list-option', className, classes),
      onClick: this.handleSelect
    }, props), children);
  };

  return ListOption;
}(_react.default.Component);

ListOption.propTypes = {
  activeId: _propTypes.default.string,
  dataItem: _propTypes.default.any,
  index: _propTypes.default.number,
  focused: _propTypes.default.bool,
  selected: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  onSelect: _propTypes.default.func,
  component: _propTypes.default.string
};
var _default = ListOption;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

Input.propTypes = {
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  value: _propTypes.default.string,
  type: _propTypes.default.string,
  tabIndex: _propTypes.default.string,
  component: _propTypes.default.any,
  nodeRef: _propTypes.default.func
};

function Input(_ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      readOnly = _ref.readOnly,
      value = _ref.value,
      tabIndex = _ref.tabIndex,
      nodeRef = _ref.nodeRef,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'text' : _ref$type,
      _ref$component = _ref.component,
      Component = _ref$component === void 0 ? 'input' : _ref$component,
      props = _objectWithoutProperties(_ref, ["className", "disabled", "readOnly", "value", "tabIndex", "nodeRef", "type", "component"]);

  return _react.default.createElement(Component, _extends({}, props, {
    type: type,
    ref: nodeRef,
    tabIndex: tabIndex || 0,
    autoComplete: "off",
    disabled: disabled,
    readOnly: readOnly,
    "aria-disabled": disabled,
    "aria-readonly": readOnly,
    value: value == null ? '' : value,
    className: (0, _classnames.default)(className, 'rw-input')
  }));
}

var _default = Input;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _invariant = _interopRequireDefault(__webpack_require__(26));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactDom = __webpack_require__(6);

var _reactLifecyclesCompat = __webpack_require__(7);

var _activeElement = _interopRequireDefault(__webpack_require__(27));

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _deprecated = _interopRequireDefault(__webpack_require__(103));

var _uncontrollable = _interopRequireDefault(__webpack_require__(14));

var _Widget = _interopRequireDefault(__webpack_require__(15));

var _WidgetPicker = _interopRequireDefault(__webpack_require__(22));

var _Popup = _interopRequireDefault(__webpack_require__(29));

var _Button = _interopRequireDefault(__webpack_require__(17));

var _Calendar = _interopRequireDefault(__webpack_require__(57));

var _DateTimePickerInput = _interopRequireDefault(__webpack_require__(104));

var _Select = _interopRequireDefault(__webpack_require__(23));

var _TimeList = _interopRequireDefault(__webpack_require__(105));

var _messages = __webpack_require__(12);

var Props = _interopRequireWildcard(__webpack_require__(4));

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

var _focusManager = _interopRequireDefault(__webpack_require__(16));

var _scrollManager = _interopRequireDefault(__webpack_require__(25));

var _interaction = __webpack_require__(10);

var _dates = _interopRequireDefault(__webpack_require__(13));

var _localizers = __webpack_require__(5);

var _widgetHelpers = __webpack_require__(9);

var _Icon = __webpack_require__(20);

var _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var NEXT_VIEW = {
  date: 'time',
  time: 'date'
};

var isBothOrNeither = function isBothOrNeither(a, b) {
  return a && b || !a && !b;
};

var propTypes = _extends({}, _Calendar.default.ControlledComponent.propTypes, {
  /**
   * @example ['valuePicker', [ ['new Date()', null] ]]
   */
  value: _propTypes.default.instanceOf(Date),

  /**
   * @example ['onChangePicker', [ ['new Date()', null] ]]
   */
  onChange: _propTypes.default.func,

  /**
   * @type {(false | 'time' | 'date')}
   * @example ['openDateTime']
   */
  open: _propTypes.default.oneOf([false, 'time', 'date']),
  onToggle: _propTypes.default.func,

  /**
   * Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).
   */
  currentDate: _propTypes.default.instanceOf(Date),

  /**
   * Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object.
   */
  onCurrentDateChange: _propTypes.default.func,
  onSelect: _propTypes.default.func,

  /**
   * The minimum Date that can be selected. Min only limits selection, it doesn't constrain the date values that
   * can be typed or pasted into the widget. If you need this behavior you can constrain values via
   * the `onChange` handler.
   *
   * @example ['prop', ['min', 'new Date()']]
   */
  min: _propTypes.default.instanceOf(Date),

  /**
   * The maximum Date that can be selected. Max only limits selection, it doesn't constrain the date values that
   * can be typed or pasted into the widget. If you need this behavior you can constrain values via
   * the `onChange` handler.
   *
   * @example ['prop', ['max', 'new Date()']]
   */
  max: _propTypes.default.instanceOf(Date),

  /**
   * The amount of minutes between each entry in the time list.
   *
   * @example ['prop', { step: 90 }]
   */
  step: _propTypes.default.number,
  culture: _propTypes.default.string,

  /**
   * A formatter used to display the date value. For more information about formats
   * visit the [Localization page](/localization)
   *
   * @example ['dateFormat', ['format', "{ raw: 'MMM dd, yyyy' }", null, { defaultValue: 'new Date()', time: 'false' }]]
   */
  format: CustomPropTypes.dateFormat,

  /**
   * A formatter used by the time dropdown to render times. For more information about formats visit
   * the [Localization page](/localization).
   *
   * @example ['dateFormat', ['timeFormat', "{ time: 'medium' }", null, { date: 'false', open: '"time"' }]]
   */
  timeFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter to be used while the date input has focus. Useful for showing a simpler format for inputing.
   * For more information about formats visit the [Localization page](/localization)
   *
   * @example ['dateFormat', ['editFormat', "{ date: 'short' }", null, { defaultValue: 'new Date()', format: "{ raw: 'MMM dd, yyyy' }", time: 'false' }]]
   */
  editFormat: CustomPropTypes.dateFormat,

  /**
   * Enable the calendar component of the picker.
   */
  date: _propTypes.default.bool,

  /**
   * Enable the time list component of the picker.
   */
  time: _propTypes.default.bool,

  /** @ignore */
  calendar: (0, _deprecated.default)(_propTypes.default.bool, 'Use `date` instead'),

  /**
   * A customize the rendering of times but providing a custom component.
   */
  timeComponent: CustomPropTypes.elementType,

  /** Specify the element used to render the calendar dropdown icon. */
  dateIcon: _propTypes.default.node,

  /** Specify the element used to render the time list dropdown icon. */
  timeIcon: _propTypes.default.node,
  dropUp: _propTypes.default.bool,
  popupTransition: CustomPropTypes.elementType,
  placeholder: _propTypes.default.string,
  name: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,

  /**
   * @example ['disabled', ['new Date()']]
   */
  disabled: CustomPropTypes.disabled,

  /**
   * @example ['readOnly', ['new Date()']]
   */
  readOnly: CustomPropTypes.disabled,

  /**
   * Determines how the widget parses the typed date string into a Date object. You can provide an array of formats to try,
   * or provide a function that returns a date to handle parsing yourself. When `parse` is unspecified and
   * the `format` prop is a `string` parse will automatically use that format as its default.
   */
  parse: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string, _propTypes.default.func]),

  /** @ignore */
  tabIndex: _propTypes.default.any,

  /** @ignore */
  'aria-labelledby': _propTypes.default.string,

  /** @ignore */
  'aria-describedby': _propTypes.default.string,
  onKeyDown: _propTypes.default.func,
  onKeyPress: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onFocus: _propTypes.default.func,

  /** Adds a css class to the input container element. */
  containerClassName: _propTypes.default.string,
  inputProps: _propTypes.default.object,
  isRtl: _propTypes.default.bool,
  messages: _propTypes.default.shape({
    dateButton: _propTypes.default.string,
    timeButton: _propTypes.default.string
  })
  /**
   * ---
   * subtitle: DatePicker, TimePicker
   * localized: true
   * shortcuts:
   *   - { key: alt + down arrow, label:  open calendar or time }
   *   - { key: alt + up arrow, label: close calendar or time }
   *   - { key: down arrow, label: move focus to next item }
   *   - { key: up arrow, label: move focus to previous item }
   *   - { key: home, label: move focus to first item }
   *   - { key: end, label: move focus to last item }
   *   - { key: enter, label: select focused item }
   *   - { key: any key, label: search list for item starting with key }
   * ---
   *
   * @public
   * @extends Calendar
   */

});

var DateTimePicker = (0, _reactLifecyclesCompat.polyfill)(_class = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DateTimePicker, _React$Component);

  function DateTimePicker() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _initializerDefineProperty(_this, "handleChange", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleKeyDown", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleKeyPress", _descriptor3, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleDateSelect", _descriptor4, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleTimeSelect", _descriptor5, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleCalendarClick", _descriptor6, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleTimeClick", _descriptor7, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.attachCalRef = function (ref) {
      return _this.calRef = ref;
    };

    _this.attachTimeRef = function (ref) {
      return _this.timeRef = ref;
    };

    _this.attachInputRef = function (ref) {
      return _this.inputRef = ref;
    };

    _this.parse = function (string) {
      var _this$props = _this.props,
          parse = _this$props.parse,
          culture = _this$props.culture,
          editFormat = _this$props.editFormat;
      var format = getFormat(_this.props, true);
      !(parse || format || editFormat) ?  false ? (0, _invariant.default)(false, 'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' + 'the DateTimePicker is unable to parse `%s` into a dateTime, ' + 'please provide either a parse function or localizer compatible `format` prop', string) : invariant(false) : void 0;
      var date;
      var formats = [format, editFormat];

      if (typeof parse == 'function') {
        date = parse(string, culture);
        if (date) return date;
      } else {
        // parse is a string format or array of string formats
        formats = formats.concat(parse).filter(Boolean);
      }

      for (var i = 0; i < formats.length; i++) {
        date = _localizers.date.parse(string, formats[i], culture);
        if (date) return date;
      }

      return null;
    };

    _this.inputId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_input');
    _this.dateId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_date');
    _this.listId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox');
    _this.activeCalendarId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_calendar_active_cell');
    _this.activeOptionId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox_active_option');
    _this.handleScroll = (0, _scrollManager.default)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusManager = (0, _focusManager.default)(_assertThisInitialized(_assertThisInitialized(_this)), {
      didHandle: function didHandle(focused) {
        if (!focused) _this.close();
      }
    });
    _this.state = {
      focused: false,
      messages: (0, _messages.getMessages)(_this.props.messages)
    };
    return _this;
  }

  DateTimePicker.getDerivedStateFromProps = function getDerivedStateFromProps(_ref) {
    var messages = _ref.messages;
    return {
      messages: (0, _messages.getMessages)(messages)
    };
  };

  var _proto = DateTimePicker.prototype;

  _proto.renderInput = function renderInput(owns) {
    var _this$props2 = this.props,
        open = _this$props2.open,
        value = _this$props2.value,
        editFormat = _this$props2.editFormat,
        culture = _this$props2.culture,
        placeholder = _this$props2.placeholder,
        disabled = _this$props2.disabled,
        readOnly = _this$props2.readOnly,
        name = _this$props2.name,
        tabIndex = _this$props2.tabIndex,
        autoFocus = _this$props2.autoFocus,
        inputProps = _this$props2.inputProps,
        ariaLabelledby = _this$props2['aria-labelledby'],
        ariaDescribedby = _this$props2['aria-describedby'];
    var focused = this.state.focused;
    var inputReadOnly = inputProps ? inputProps.readOnly : null;
    var activeId = null;

    if (open === 'time') {
      activeId = this.activeOptionId;
    } else if (open === 'date') {
      activeId = this.activeCalendarId;
    }

    return _react.default.createElement(_DateTimePickerInput.default, _extends({}, inputProps, {
      id: this.inputId,
      ref: this.attachInputRef,
      role: "combobox",
      name: name,
      value: value,
      tabIndex: tabIndex,
      autoFocus: autoFocus,
      placeholder: placeholder,
      disabled: disabled,
      readOnly: inputReadOnly != null ? inputReadOnly : readOnly,
      format: getFormat(this.props),
      editFormat: editFormat,
      editing: focused,
      culture: culture,
      parse: this.parse,
      onChange: this.handleChange,
      "aria-haspopup": true,
      "aria-activedescendant": activeId,
      "aria-labelledby": ariaLabelledby,
      "aria-describedby": ariaDescribedby,
      "aria-expanded": !!open,
      "aria-owns": owns
    }));
  };

  _proto.renderButtons = function renderButtons() {
    var _this$props3 = this.props,
        date = _this$props3.date,
        dateIcon = _this$props3.dateIcon,
        time = _this$props3.time,
        timeIcon = _this$props3.timeIcon,
        disabled = _this$props3.disabled,
        readOnly = _this$props3.readOnly;

    if (!date && !time) {
      return null;
    }

    var messages = this.state.messages;
    return _react.default.createElement(_Select.default, {
      bordered: true
    }, date && _react.default.createElement(_Button.default, {
      icon: dateIcon,
      label: messages.dateButton(),
      disabled: disabled || readOnly,
      onClick: this.handleCalendarClick
    }), time && _react.default.createElement(_Button.default, {
      icon: timeIcon,
      label: messages.timeButton(),
      disabled: disabled || readOnly,
      onClick: this.handleTimeClick
    }));
  };

  _proto.renderCalendar = function renderCalendar() {
    var _this2 = this;

    var activeCalendarId = this.activeCalendarId,
        inputId = this.inputId,
        dateId = this.dateId;
    var _this$props4 = this.props,
        open = _this$props4.open,
        value = _this$props4.value,
        popupTransition = _this$props4.popupTransition,
        dropUp = _this$props4.dropUp,
        onCurrentDateChange = _this$props4.onCurrentDateChange,
        currentDate = _this$props4.currentDate;
    var calendarProps = Props.pick(this.props, _Calendar.default.ControlledComponent); // manually include the last controlled default Props

    calendarProps.defaultView = this.props.defaultView;
    return _react.default.createElement(_Popup.default, {
      dropUp: dropUp,
      open: open === 'date',
      className: "rw-calendar-popup",
      transition: popupTransition
    }, _react.default.createElement(_Calendar.default, _extends({}, calendarProps, {
      id: dateId,
      activeId: activeCalendarId,
      tabIndex: "-1",
      value: value,
      autoFocus: false,
      onChange: this.handleDateSelect // #75: need to aggressively reclaim focus from the calendar otherwise
      // disabled header/footer buttons will drop focus completely from the widget
      ,
      onNavigate: function onNavigate() {
        return _this2.focus();
      },
      currentDate: currentDate,
      onCurrentDateChange: onCurrentDateChange,
      "aria-hidden": !open,
      "aria-live": "polite",
      "aria-labelledby": inputId,
      ref: this.attachCalRef
    })));
  };

  _proto.renderTimeList = function renderTimeList() {
    var _this3 = this;

    var activeOptionId = this.activeOptionId,
        inputId = this.inputId,
        listId = this.listId;
    var _this$props5 = this.props,
        open = _this$props5.open,
        value = _this$props5.value,
        min = _this$props5.min,
        max = _this$props5.max,
        step = _this$props5.step,
        currentDate = _this$props5.currentDate,
        dropUp = _this$props5.dropUp,
        date = _this$props5.date,
        culture = _this$props5.culture,
        timeFormat = _this$props5.timeFormat,
        timeComponent = _this$props5.timeComponent,
        timeListProps = _this$props5.timeListProps,
        popupTransition = _this$props5.popupTransition;
    return _react.default.createElement(_Popup.default, {
      dropUp: dropUp,
      transition: popupTransition,
      open: open === 'time',
      onEntering: function onEntering() {
        return _this3.timeRef.forceUpdate();
      }
    }, _react.default.createElement("div", null, _react.default.createElement(_TimeList.default, {
      id: listId,
      min: min,
      max: max,
      step: step,
      listProps: timeListProps,
      currentDate: currentDate,
      activeId: activeOptionId,
      format: timeFormat,
      culture: culture,
      value: dateOrNull(value),
      onMove: this.handleScroll,
      onSelect: this.handleTimeSelect,
      preserveDate: !!date,
      itemComponent: timeComponent,
      "aria-labelledby": inputId,
      "aria-live": open && 'polite',
      "aria-hidden": !open,
      messages: this.state.messages,
      ref: this.attachTimeRef
    })));
  };

  _proto.render = function render() {
    var _this$props6 = this.props,
        className = _this$props6.className,
        date = _this$props6.date,
        time = _this$props6.time,
        open = _this$props6.open,
        disabled = _this$props6.disabled,
        readOnly = _this$props6.readOnly,
        dropUp = _this$props6.dropUp,
        containerClassName = _this$props6.containerClassName;
    var focused = this.state.focused;
    var elementProps = Props.pickElementProps(this, _Calendar.default.ControlledComponent);
    var shouldRenderList = (0, _widgetHelpers.isFirstFocusedRender)(this);
    var shouldRenderTimeList = !!(shouldRenderList && time);
    var shouldRenderCalendar = !!(shouldRenderList && date);
    var owns = '';
    if (shouldRenderCalendar && open === 'date') owns += this.dateId;
    if (shouldRenderTimeList && open === 'time') owns += ' ' + this.listId;
    return _react.default.createElement(_Widget.default, _extends({}, elementProps, {
      open: !!open,
      dropUp: dropUp,
      focused: focused,
      disabled: disabled,
      readOnly: readOnly,
      onKeyDown: this.handleKeyDown,
      onKeyPress: this.handleKeyPress,
      onBlur: this.focusManager.handleBlur,
      onFocus: this.focusManager.handleFocus,
      className: (0, _classnames.default)(className, 'rw-datetime-picker')
    }), _react.default.createElement(_WidgetPicker.default, {
      className: containerClassName
    }, this.renderInput(owns.trim()), this.renderButtons()), shouldRenderTimeList && this.renderTimeList(), shouldRenderCalendar && this.renderCalendar());
  };

  _proto.focus = function focus() {
    if (this.inputRef && (0, _activeElement.default)() !== (0, _reactDom.findDOMNode)(this.inputRef)) this.inputRef.focus();
  };

  _proto.toggle = function toggle(view) {
    var open = this.props.open;
    if (!open || open !== view) this.open(view);else this.close();
  };

  _proto.open = function open(view) {
    var _this$props7 = this.props,
        open = _this$props7.open,
        date = _this$props7.date,
        time = _this$props7.time,
        onToggle = _this$props7.onToggle;

    if (!view) {
      if (time) view = 'time';
      if (date) view = 'date';
      if (isBothOrNeither(date, time)) view = NEXT_VIEW[open] || 'date';
    }

    if (open !== view) (0, _widgetHelpers.notify)(onToggle, view);
  };

  _proto.close = function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  _proto.inRangeValue = function inRangeValue(value) {
    if (value == null) return value;
    return _dates.default.max(_dates.default.min(value, this.props.max), this.props.min);
  };

  return DateTimePicker;
}(_react.default.Component), _class3.displayName = 'DateTimePicker', _class3.propTypes = propTypes, _class3.defaultProps = _extends({}, _Calendar.default.ControlledComponent.defaultProps, {
  value: null,
  min: new Date(1900, 0, 1),
  max: new Date(2099, 11, 31),
  date: true,
  time: true,
  open: false,
  dateIcon: _Icon.calendar,
  timeIcon: _Icon.clock
}), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "handleChange", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (date, str, constrain) {
      var _this4$props = _this4.props,
          onChange = _this4$props.onChange,
          value = _this4$props.value;
      if (constrain) date = _this4.inRangeValue(date);

      if (onChange) {
        if (date == null || value == null) {
          if (date != value //eslint-disable-line eqeqeq
          ) onChange(date, str);
        } else if (!_dates.default.eq(date, value)) {
          onChange(date, str);
        }
      }
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (e) {
      var _this5$props = _this5.props,
          open = _this5$props.open,
          onKeyDown = _this5$props.onKeyDown;
      (0, _widgetHelpers.notify)(onKeyDown, [e]);
      if (e.defaultPrevented) return;
      if (e.key === 'Escape' && open) _this5.close();else if (e.altKey) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();

          _this5.open();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();

          _this5.close();
        }
      } else if (open) {
        if (open === 'date') _this5.calRef.inner.handleKeyDown(e);
        if (open === 'time') _this5.timeRef.handleKeyDown(e);
      }
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyPress", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (e) {
      (0, _widgetHelpers.notify)(_this6.props.onKeyPress, [e]);
      if (e.defaultPrevented) return;
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "handleDateSelect", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (date) {
      var format = getFormat(_this7.props),
          dateTime = _dates.default.merge(date, _this7.props.value, _this7.props.currentDate),
          dateStr = formatDate(date, format, _this7.props.culture);

      _this7.close();

      (0, _widgetHelpers.notify)(_this7.props.onSelect, [dateTime, dateStr]);

      _this7.handleChange(dateTime, dateStr, true);

      _this7.focus();
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "handleTimeSelect", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this8 = this;

    return function (datum) {
      var format = getFormat(_this8.props),
          dateTime = _dates.default.merge(_this8.props.value, datum.date, _this8.props.currentDate),
          dateStr = formatDate(datum.date, format, _this8.props.culture);

      _this8.close();

      (0, _widgetHelpers.notify)(_this8.props.onSelect, [dateTime, dateStr]);

      _this8.handleChange(dateTime, dateStr, true);

      _this8.focus();
    };
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "handleCalendarClick", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this9 = this;

    return function () {
      _this9.focus();

      _this9.toggle('date');
    };
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "handleTimeClick", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this10 = this;

    return function () {
      _this10.focus();

      _this10.toggle('time');
    };
  }
})), _class2)) || _class;

var _default = (0, _uncontrollable.default)(DateTimePicker, {
  open: 'onToggle',
  value: 'onChange',
  currentDate: 'onCurrentDateChange'
}, ['focus']);

exports.default = _default;

function getFormat(props) {
  var isDate = props.date != null ? props.date : true;
  var isTime = props.time != null ? props.time : true;
  return props.format ? props.format : isDate && isTime || !isDate && !isTime ? _localizers.date.getFormat('default') : _localizers.date.getFormat(isDate ? 'date' : 'time');
}

function formatDate(date, format, culture) {
  var val = '';
  if (date instanceof Date && !isNaN(date.getTime())) val = _localizers.date.format(date, format, culture);
  return val;
}

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt;
  return null;
}

module.exports = exports["default"];

/***/ }),
/* 41 */
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

if (false) {
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
/* 42 */
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = createTimeoutManager;

var _spyOnComponent = _interopRequireDefault(__webpack_require__(28));

var _mountManager = _interopRequireDefault(__webpack_require__(35));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTimeoutManager(componentInstance) {
  var isMounted = (0, _mountManager.default)(componentInstance);
  var timers = Object.create(null);
  var manager;
  (0, _spyOnComponent.default)(componentInstance, {
    componentWillUnmount: function componentWillUnmount() {
      for (var k in timers) {
        clearTimeout(timers[k]);
      }

      timers = null;
    }
  });
  return manager = {
    clear: function clear(key) {
      clearTimeout(timers[key]);
    },
    set: function set(key, fn, ms) {
      if (!isMounted()) return;
      manager.clear(key);
      timers[key] = setTimeout(fn, ms);
    }
  };
}

module.exports = exports["default"];

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _events = _interopRequireDefault(__webpack_require__(45));

var _style = _interopRequireDefault(__webpack_require__(36));

var _height = _interopRequireDefault(__webpack_require__(30));

var _properties = __webpack_require__(37);

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _react = _interopRequireDefault(__webpack_require__(1));

var _Transition = _interopRequireWildcard(__webpack_require__(52));

var _transitionClasses;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var transitionClasses = (_transitionClasses = {}, _transitionClasses[_Transition.ENTERING] = 'rw-popup-transition-entering', _transitionClasses[_Transition.EXITING] = 'rw-popup-transition-exiting', _transitionClasses[_Transition.EXITED] = 'rw-popup-transition-exited', _transitionClasses);
var propTypes = {
  in: _propTypes.default.bool.isRequired,
  dropUp: _propTypes.default.bool,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func
};

function parseDuration(node) {
  var str = (0, _style.default)(node, _properties.transitionDuration);
  var mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

var SlideDownTransition =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SlideDownTransition, _React$Component);

  function SlideDownTransition() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.setContainerHeight = function (elem) {
      elem.style.height = _this.getHeight() + 'px';
    };

    _this.clearContainerHeight = function (elem) {
      elem.style.height = '';
    };

    _this.handleEntered = function (elem) {
      _this.clearContainerHeight(elem);

      if (_this.props.onEntered) _this.props.onEntered();
    };

    _this.handleEntering = function () {
      if (_this.props.onEntering) _this.props.onEntering();
    };

    _this.handleTransitionEnd = function (node, done) {
      var duration = parseDuration(node.lastChild) || 0;

      var handler = function handler() {
        _events.default.off(node, _properties.transitionEnd, handler, false);

        done();
      };

      setTimeout(handler, duration * 1.5);

      _events.default.on(node, _properties.transitionEnd, handler, false);
    };

    _this.attachRef = function (ref) {
      return _this.element = ref;
    };

    return _this;
  }

  var _proto = SlideDownTransition.prototype;

  _proto.getHeight = function getHeight() {
    var container = this.element;
    var content = container.firstChild;
    var margin = parseInt((0, _style.default)(content, 'margin-top'), 10) + parseInt((0, _style.default)(content, 'margin-bottom'), 10);
    var old = container.style.display;
    var height;
    container.style.display = 'block';
    height = ((0, _height.default)(content) || 0) + (isNaN(margin) ? 0 : margin);
    container.style.display = old;
    return height;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        dropUp = _this$props.dropUp;
    return _react.default.createElement(_Transition.default, {
      appear: true,
      in: this.props.in,
      timeout: 5000,
      onEnter: this.setContainerHeight,
      onEntering: this.handleEntering,
      onEntered: this.handleEntered,
      onExit: this.setContainerHeight,
      onExited: this.clearContainerHeight,
      addEndListener: this.handleTransitionEnd
    }, function (status, innerProps) {
      return _react.default.createElement("div", _extends({}, innerProps, {
        ref: _this2.attachRef,
        className: (0, _classnames.default)(className, dropUp && 'rw-dropup', transitionClasses[status])
      }), _react.default.createElement("div", {
        className: "rw-popup-transition"
      }, children));
    });
  };

  return SlideDownTransition;
}(_react.default.Component);

SlideDownTransition.propTypes = propTypes;
var _default = SlideDownTransition;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listen = exports.filter = exports.off = exports.on = undefined;

var _on = __webpack_require__(46);

var _on2 = _interopRequireDefault(_on);

var _off = __webpack_require__(47);

var _off2 = _interopRequireDefault(_off);

var _filter = __webpack_require__(73);

var _filter2 = _interopRequireDefault(_filter);

var _listen = __webpack_require__(74);

var _listen2 = _interopRequireDefault(_listen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.on = _on2.default;
exports.off = _off2.default;
exports.filter = _filter2.default;
exports.listen = _listen2.default;
exports.default = { on: _on2.default, off: _off2.default, filter: _filter2.default, listen: _listen2.default };

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(11);

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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(11);

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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(11);

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
/* 49 */
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = camelizeStyleName;

var _camelize = __webpack_require__(75);

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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = offset;

var _contains = __webpack_require__(48);

var _contains2 = _interopRequireDefault(_contains);

var _isWindow = __webpack_require__(31);

var _isWindow2 = _interopRequireDefault(_isWindow);

var _ownerDocument = __webpack_require__(42);

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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = undefined;

var _propTypes = __webpack_require__(0);

var PropTypes = _interopRequireWildcard(_propTypes);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(6);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactLifecyclesCompat = __webpack_require__(7);

var _PropTypes = __webpack_require__(81);

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
 *         I'm a fade Transition!
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
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component begins the
 * "Enter" stage. During this stage, the component will shift from its current transition state,
 * to `'entering'` for the duration of the transition and then to the `'entered'` stage once
 * it's complete. Let's take the following example:
 *
 * ```jsx
 * state = { in: false };
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
 * stay there for 500ms (the value of `timeout`) before it finally switches to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from `'exiting'` to `'exited'`.
 *
 * ## Timing
 *
 * Timing is often the trickiest part of animation, mistakes can result in slight delays
 * that are hard to pin down. A common example is when you want to add an exit transition,
 * you should set the desired final styles when the state is `'exiting'`. That's when the
 * transition to those styles will start and, if you matched the `timeout` prop with the
 * CSS Transition duration, it will end exactly when the state changes to `'exited'`.
 *
 * > **Note**: For simpler transitions the `Transition` component might be enough, but
 * > take into account that it's platform-agnostic, while the `CSSTransition` component
 * > [forces reflows](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215)
 * > in order to make more complex transitions more predictable. For example, even though
 * > classes `example-enter` and `example-enter-active` are applied immediately one after
 * > another, you can still transition from one to the other because of the forced reflow
 * > (read [this issue](https://github.com/reactjs/react-transition-group/issues/159#issuecomment-322761171)
 * > for more info). Take this into account when choosing between `Transition` and
 * > `CSSTransition`.
 *
 * ## Example
 *
 * <iframe src="https://codesandbox.io/embed/741op4mmj0?fontsize=14" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
 *
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

    _this.state = { status: initialStatus };

    _this.nextCallback = null;
    return _this;
  }

  Transition.prototype.getChildContext = function getChildContext() {
    return { transitionGroup: null // allows for nested Transitions
    };
  };

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;

    if (nextIn && prevState.status === UNMOUNTED) {
      return { status: EXITED };
    }
    return null;
  };

  // getSnapshotBeforeUpdate(prevProps) {
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

  Transition.prototype.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };

  Transition.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
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
    var nextStatus = arguments[1];

    if (nextStatus !== null) {
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
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };

  Transition.prototype.setNextCallback = function setNextCallback(callback) {
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


Transition.propTypes =  false ? {
  /**
   * A `function` child can be used instead of a React element.
   * This function is called with the current transition status
   * ('entering', 'entered', 'exiting', 'exited', 'unmounted'), which can be used
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
   * Required unless `addEndListener` is provided
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

  // Name the function so it is clearer in the documentation
} : {};function noop() {}

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

exports.default = (0, _reactLifecyclesCompat.polyfill)(Transition);

/***/ }),
/* 53 */
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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _widgetHelpers = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var propTypes = {
  className: _propTypes.default.string,
  role: _propTypes.default.string,
  nodeRef: _propTypes.default.func,
  emptyListMessage: _propTypes.default.node
};

var Listbox =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Listbox, _React$Component);

  function Listbox() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Listbox.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        role = _this$props.role,
        children = _this$props.children,
        emptyListMessage = _this$props.emptyListMessage,
        nodeRef = _this$props.nodeRef,
        props = _objectWithoutProperties(_this$props, ["className", "role", "children", "emptyListMessage", "nodeRef"]);

    var id = (0, _widgetHelpers.instanceId)(this);
    return _react.default.createElement("ul", _extends({
      id: id,
      tabIndex: "-1",
      ref: nodeRef,
      className: (0, _classnames.default)(className, 'rw-list'),
      role: role === undefined ? 'listbox' : role
    }, props), _react.default.Children.count(children) ? children : _react.default.createElement("li", {
      className: "rw-list-empty"
    }, emptyListMessage));
  };

  return Listbox;
}(_react.default.Component);

Listbox.propTypes = propTypes;
var _default = Listbox;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var PropTypes = _interopRequireWildcard(__webpack_require__(0));

var _react = _interopRequireDefault(__webpack_require__(1));

var _Listbox = _interopRequireDefault(__webpack_require__(54));

var _ListOption = _interopRequireDefault(__webpack_require__(38));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

var propTypes = {
  searchTerm: PropTypes.string,
  focused: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  activeId: PropTypes.string
};

function AddToListOption(_ref) {
  var searchTerm = _ref.searchTerm,
      onSelect = _ref.onSelect,
      focused = _ref.focused,
      children = _ref.children,
      activeId = _ref.activeId,
      props = _objectWithoutProperties(_ref, ["searchTerm", "onSelect", "focused", "children", "activeId"]);

  return _react.default.createElement(_Listbox.default, _extends({}, props, {
    className: "rw-list-option-create"
  }), _react.default.createElement(_ListOption.default, {
    onSelect: onSelect,
    focused: focused,
    activeId: activeId,
    dataItem: searchTerm
  }, children));
}

AddToListOption.propTypes = propTypes;
var _default = AddToListOption;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matches;

var _inDOM = __webpack_require__(11);

var _inDOM2 = _interopRequireDefault(_inDOM);

var _querySelectorAll = __webpack_require__(49);

var _querySelectorAll2 = _interopRequireDefault(_querySelectorAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchesCache = void 0;

function matches(node, selector) {
  if (!matchesCache && _inDOM2.default) {
    (function () {
      var body = document.body;
      var nativeMatch = body.matches || body.matchesSelector || body.webkitMatchesSelector || body.mozMatchesSelector || body.msMatchesSelector;

      matchesCache = nativeMatch ? function (node, selector) {
        return nativeMatch.call(node, selector);
      } : ie8MatchesSelector;
    })();
  }

  return matchesCache ? matchesCache(node, selector) : null;
}

function ie8MatchesSelector(node, selector) {
  var matches = (0, _querySelectorAll2.default)(node.document || node.ownerDocument, selector),
      i = 0;

  while (matches[i] && matches[i] !== node) {
    i++;
  }return !!matches[i];
}
module.exports = exports['default'];

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactDom = __webpack_require__(6);

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _uncontrollable = _interopRequireDefault(__webpack_require__(14));

var _reactLifecyclesCompat = __webpack_require__(7);

var _reactComponentManagers = __webpack_require__(21);

var _Widget = _interopRequireDefault(__webpack_require__(15));

var _Header = _interopRequireDefault(__webpack_require__(93));

var _Footer = _interopRequireDefault(__webpack_require__(94));

var _Month = _interopRequireDefault(__webpack_require__(95));

var _Year = _interopRequireDefault(__webpack_require__(97));

var _Decade = _interopRequireDefault(__webpack_require__(98));

var _Century = _interopRequireDefault(__webpack_require__(99));

var _messages = __webpack_require__(12);

var _SlideTransitionGroup = _interopRequireDefault(__webpack_require__(58));

var _focusManager = _interopRequireDefault(__webpack_require__(16));

var _localizers = __webpack_require__(5);

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

var Props = _interopRequireWildcard(__webpack_require__(4));

var _dates = _interopRequireDefault(__webpack_require__(13));

var _widgetHelpers = __webpack_require__(9);

var _interaction = __webpack_require__(10);

var _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class3, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var last = function last(a) {
  return a[a.length - 1];
};

var VIEW_UNIT = {
  month: 'day',
  year: 'month',
  decade: 'year',
  century: 'decade'
};
var VIEW_OPTIONS = ['month', 'year', 'decade', 'century'];
var VIEW = {
  month: _Month.default,
  year: _Year.default,
  decade: _Decade.default,
  century: _Century.default
};
var ARROWS_TO_DIRECTION = {
  ArrowDown: 'DOWN',
  ArrowUp: 'UP',
  ArrowRight: 'RIGHT',
  ArrowLeft: 'LEFT'
};
var OPPOSITE_DIRECTION = {
  LEFT: 'RIGHT',
  RIGHT: 'LEFT'
};
var MULTIPLIER = {
  year: 1,
  decade: 10,
  century: 100
};

function inRangeValue(_value, min, max) {
  var value = dateOrNull(_value);
  if (value === null) return value;
  return _dates.default.max(_dates.default.min(value, max), min);
}

var propTypes = {
  /** @ignore */
  activeId: _propTypes.default.string,

  /**
   * @example ['disabled', ['new Date()']]
   */
  disabled: CustomPropTypes.disabled,

  /**
   * @example ['readOnly', ['new Date()']]
   */
  readOnly: CustomPropTypes.disabled,

  /**
   * @example ['onChangePicker', [ ['new Date()'] ]]
   */
  onChange: _propTypes.default.func,

  /**
   * @example ['valuePicker', [ ['new Date()'] ]]
   */
  value: _propTypes.default.instanceOf(Date),

  /**
   * The minimum date that the Calendar can navigate from.
   *
   * @example ['prop', ['min', 'new Date()']]
   */
  min: _propTypes.default.instanceOf(Date).isRequired,

  /**
   * The maximum date that the Calendar can navigate to.
   *
   * @example ['prop', ['max', 'new Date()']]
   */
  max: _propTypes.default.instanceOf(Date).isRequired,

  /**
   * Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).
   */
  currentDate: _propTypes.default.instanceOf(Date),

  /**
   * Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object.
   */
  onCurrentDateChange: _propTypes.default.func,

  /** Specify the navigate into the past header icon */
  navigatePrevIcon: _propTypes.default.node,

  /** Specify the navigate into the future header icon */
  navigateNextIcon: _propTypes.default.node,

  /**
   * Controls the currently displayed calendar view. Use `defaultView` to set a unique starting view.
   *
   * @type {("month"|"year"|"decade"|"century")}
   * @controllable onViewChange
   */
  view: function view(props) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return _propTypes.default.oneOf(props.views || VIEW_OPTIONS).apply(void 0, [props].concat(args));
  },

  /**
   * Defines a list of views the Calendar can traverse through, starting with the
   * first in the list to the last.
   *
   * @type array<"month"|"year"|"decade"|"century">
   */
  views: _propTypes.default.arrayOf(_propTypes.default.oneOf(VIEW_OPTIONS)).isRequired,

  /**
   * A callback fired when the `view` changes.
   *
   * @controllable view
   */
  onViewChange: _propTypes.default.func,

  /**
   * Callback fired when the Calendar navigates between views, or forward and backwards in time.
   *
   * @type function(date: ?Date, direction: string, view: string)
   */
  onNavigate: _propTypes.default.func,
  culture: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,

  /**
   * Show or hide the Calendar footer.
   *
   * @example ['prop', ['footer', true]]
   */
  footer: _propTypes.default.bool,

  /**
   * Provide a custom component to render the days of the month. The Component is provided the following props
   *
   * - `date`: a `Date` object for the day of the month to render
   * - `label`: a formatted `string` of the date to render. To adjust the format of the `label` string use the `dateFormat` prop, listed below.
   */
  dayComponent: CustomPropTypes.elementType,

  /**
   * A formatter for the header button of the month view.
   *
   * @example ['dateFormat', ['headerFormat', "{ date: 'medium' }"]]
   */
  headerFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for the Calendar footer, formats today's Date as a string.
   *
   * @example ['dateFormat', ['footerFormat', "{ date: 'medium' }", "date => 'Today is: ' + formatter(date)"]]
   */
  footerFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter calendar days of the week, the default formats each day as a Narrow name: "Mo", "Tu", etc.
   *
   * @example ['prop', { dayFormat: "day => \n['🎉', 'M', 'T','W','Th', 'F', '🎉'][day.getDay()]" }]
   */
  dayFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for day of the month
   *
   * @example ['prop', { dateFormat: "dt => String(dt.getDate())" }]
   */
  dateFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for month name.
   *
   * @example ['dateFormat', ['monthFormat', "{ raw: 'MMMM' }", null, { defaultView: '"year"' }]]
   */
  monthFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for month name.
   *
   * @example ['dateFormat', ['yearFormat', "{ raw: 'yy' }", null, { defaultView: '"decade"' }]]
   */
  yearFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for decade, the default formats the first and last year of the decade like: 2000 - 2009.
   */
  decadeFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for century, the default formats the first and last year of the century like: 1900 - 1999.
   */
  centuryFormat: CustomPropTypes.dateFormat,
  isRtl: _propTypes.default.bool,
  messages: _propTypes.default.shape({
    moveBack: _propTypes.default.string,
    moveForward: _propTypes.default.string
  }),
  onKeyDown: _propTypes.default.func,

  /** @ignore */
  tabIndex: _propTypes.default.any
  /**
   * ---
   * localized: true
   * shortcuts:
   *   - { key: ctrl + down arrow, label: navigate to next view }
   *   - { key: ctrl + up arrow, label: navigate to previous view }
   *   - { key: ctrl + left arrow, label: "navigate to previous: month, year, decade, or century" }
   *   - { key: ctrl + right arrow, label: "navigate to next: month, year, decade, or century" }
   *   - { key: left arrow, label:  move focus to previous date}
   *   - { key: right arrow, label: move focus to next date }
   *   - { key: up arrow, label: move focus up within view }
   *   - { key: down key, label: move focus down within view }
   * ---
   *
   * @public
   */

};

var Calendar = (0, _reactLifecyclesCompat.polyfill)(_class = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Calendar, _React$Component);

  Calendar.move = function move(date, min, max, unit, direction) {
    var isMonth = unit === 'month';
    var isUpOrDown = direction === 'UP' || direction === 'DOWN';
    var rangeUnit = VIEW_UNIT[unit];
    var addUnit = isMonth && isUpOrDown ? 'week' : VIEW_UNIT[unit];
    var amount = isMonth || !isUpOrDown ? 1 : 4;
    var newDate;
    if (direction === 'UP' || direction === 'LEFT') amount *= -1;
    newDate = _dates.default.add(date, amount, addUnit);
    return _dates.default.inRange(newDate, min, max, rangeUnit) ? newDate : date;
  };

  function Calendar() {
    var _this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleFocusWillChange = function () {
      if (_this.props.tabIndex == -1) return false;
    };

    _initializerDefineProperty(_this, "handleViewChange", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleMoveBack", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleMoveForward", _descriptor3, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleChange", _descriptor4, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleFooterClick", _descriptor5, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleKeyDown", _descriptor6, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.viewId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_calendar');
    _this.labelId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_calendar_label');
    _this.activeId = _this.props.activeId || (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_calendar_active_cell');
    (0, _reactComponentManagers.autoFocus)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusManager = (0, _focusManager.default)(_assertThisInitialized(_assertThisInitialized(_this)), {
      willHandle: _this.handleFocusWillChange
    });
    var _this$props = _this.props,
        view = _this$props.view,
        views = _this$props.views;
    _this.state = {
      selectedIndex: 0,
      view: view || views[0]
    };
    return _this;
  }

  Calendar.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var messages = _ref.messages,
        view = _ref.view,
        views = _ref.views,
        value = _ref.value,
        currentDate = _ref.currentDate;
    view = view || views[0];
    var slideDirection = prevState.slideDirection,
        lastView = prevState.view,
        lastDate = prevState.currentDate;

    if (lastView !== view) {
      slideDirection = views.indexOf(lastView) > views.indexOf(view) ? 'top' : 'bottom';
    } else if (lastDate !== currentDate) {
      slideDirection = _dates.default.gt(currentDate, lastDate) ? 'left' : 'right';
    }

    return {
      view: view,
      slideDirection: slideDirection,
      messages: (0, _messages.getMessages)(messages),
      currentDate: currentDate || value || new Date()
    };
  };

  var _proto = Calendar.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props2 = this.props,
        value = _this$props2.value,
        min = _this$props2.min,
        max = _this$props2.max;
    var view = this.state.view;
    value = inRangeValue(value, min, max);
    if (!_dates.default.eq(value, dateOrNull(prevProps.value), VIEW_UNIT[view])) this.maybeSetCurrentDate(value);
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        className = _this$props3.className,
        value = _this$props3.value,
        footerFormat = _this$props3.footerFormat,
        disabled = _this$props3.disabled,
        readOnly = _this$props3.readOnly,
        footer = _this$props3.footer,
        views = _this$props3.views,
        min = _this$props3.min,
        max = _this$props3.max,
        culture = _this$props3.culture,
        tabIndex = _this$props3.tabIndex;
    var _this$state = this.state,
        currentDate = _this$state.currentDate,
        view = _this$state.view,
        slideDirection = _this$state.slideDirection,
        focused = _this$state.focused,
        messages = _this$state.messages;
    var View = VIEW[view],
        todaysDate = new Date(),
        todayNotInRange = !_dates.default.inRange(todaysDate, min, max, view);

    var key = view + '_' + _dates.default[view](currentDate);

    var elementProps = Props.pickElementProps(this),
        viewProps = Props.pick(this.props, View);
    var isDisabled = disabled || readOnly;
    return _react.default.createElement(_Widget.default, _extends({}, elementProps, {
      role: "group",
      focused: focused,
      disabled: disabled,
      readOnly: readOnly,
      tabIndex: tabIndex || 0,
      onKeyDown: this.handleKeyDown,
      onBlur: this.focusManager.handleBlur,
      onFocus: this.focusManager.handleFocus,
      className: (0, _classnames.default)(className, 'rw-calendar rw-widget-container'),
      "aria-activedescendant": this.activeId
    }), _react.default.createElement(_Header.default, {
      isRtl: this.isRtl(),
      label: this.getHeaderLabel(),
      labelId: this.labelId,
      messages: messages,
      upDisabled: isDisabled || view === last(views),
      prevDisabled: isDisabled || !_dates.default.inRange(this.nextDate('LEFT'), min, max, view),
      nextDisabled: isDisabled || !_dates.default.inRange(this.nextDate('RIGHT'), min, max, view),
      onViewChange: this.handleViewChange,
      onMoveLeft: this.handleMoveBack,
      onMoveRight: this.handleMoveForward
    }), _react.default.createElement(Calendar.Transition, {
      direction: slideDirection
    }, _react.default.createElement(View, _extends({}, viewProps, {
      key: key,
      id: this.viewId,
      activeId: this.activeId,
      value: value,
      today: todaysDate,
      disabled: disabled,
      focused: currentDate,
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown,
      "aria-labelledby": this.labelId
    }))), footer && _react.default.createElement(_Footer.default, {
      value: todaysDate,
      format: footerFormat,
      culture: culture,
      disabled: disabled || todayNotInRange,
      readOnly: readOnly,
      onClick: this.handleFooterClick
    }));
  };

  _proto.navigate = function navigate(direction, date) {
    var _this$props4 = this.props,
        views = _this$props4.views,
        min = _this$props4.min,
        max = _this$props4.max,
        onNavigate = _this$props4.onNavigate,
        onViewChange = _this$props4.onViewChange;
    var _this$state2 = this.state,
        view = _this$state2.view,
        currentDate = _this$state2.currentDate;
    var slideDir = direction === 'LEFT' || direction === 'UP' ? 'right' : 'left';
    if (direction === 'UP') view = views[views.indexOf(view) + 1] || view;
    if (direction === 'DOWN') view = views[views.indexOf(view) - 1] || view;
    if (!date) date = ['LEFT', 'RIGHT'].indexOf(direction) !== -1 ? this.nextDate(direction) : currentDate;

    if (_dates.default.inRange(date, min, max, view)) {
      (0, _widgetHelpers.notify)(onNavigate, [date, slideDir, view]);
      this.focus(true);
      this.maybeSetCurrentDate(date);
      (0, _widgetHelpers.notify)(onViewChange, [view]);
    }
  };

  _proto.focus = function focus() {
    if (+this.props.tabIndex > -1) (0, _reactDom.findDOMNode)(this).focus();
  };

  _proto.maybeSetCurrentDate = function maybeSetCurrentDate(date) {
    var _this$props5 = this.props,
        min = _this$props5.min,
        max = _this$props5.max;
    var _this$state3 = this.state,
        view = _this$state3.view,
        currentDate = _this$state3.currentDate;
    var inRangeDate = inRangeValue(date ? new Date(date) : currentDate, min, max);
    if (date === currentDate || _dates.default.eq(inRangeDate, dateOrNull(currentDate), VIEW_UNIT[view])) return;
    (0, _widgetHelpers.notify)(this.props.onCurrentDateChange, inRangeDate);
  };

  _proto.nextDate = function nextDate(direction) {
    var method = direction === 'LEFT' ? 'subtract' : 'add';
    var _this$state4 = this.state,
        currentDate = _this$state4.currentDate,
        view = _this$state4.view;
    var unit = view === 'month' ? view : 'year';
    var multi = MULTIPLIER[view] || 1;
    return _dates.default[method](currentDate, 1 * multi, unit);
  };

  _proto.getHeaderLabel = function getHeaderLabel() {
    var _this$props6 = this.props,
        culture = _this$props6.culture,
        decadeFormat = _this$props6.decadeFormat,
        yearFormat = _this$props6.yearFormat,
        headerFormat = _this$props6.headerFormat,
        centuryFormat = _this$props6.centuryFormat;
    var _this$state5 = this.state,
        currentDate = _this$state5.currentDate,
        view = _this$state5.view;

    switch (view) {
      case 'month':
        headerFormat = _localizers.date.getFormat('header', headerFormat);
        return _localizers.date.format(currentDate, headerFormat, culture);

      case 'year':
        yearFormat = _localizers.date.getFormat('year', yearFormat);
        return _localizers.date.format(currentDate, yearFormat, culture);

      case 'decade':
        decadeFormat = _localizers.date.getFormat('decade', decadeFormat);
        return _localizers.date.format(_dates.default.startOf(currentDate, 'decade'), decadeFormat, culture);

      case 'century':
        centuryFormat = _localizers.date.getFormat('century', centuryFormat);
        return _localizers.date.format(_dates.default.startOf(currentDate, 'century'), centuryFormat, culture);
    }
  };

  _proto.isRtl = function isRtl() {
    return !!(this.props.isRtl || this.context && this.context.isRtl);
  };

  _proto.isValidView = function isValidView(next, views) {
    if (views === void 0) {
      views = this.props.views;
    }

    return views.indexOf(next) !== -1;
  };

  return Calendar;
}(_react.default.Component), _class3.displayName = 'Calendar', _class3.propTypes = propTypes, _class3.defaultProps = {
  value: null,
  min: new Date(1900, 0, 1),
  max: new Date(2099, 11, 31),
  views: VIEW_OPTIONS,
  tabIndex: '0',
  footer: true
}, _class3.contextTypes = {
  isRtl: _propTypes.default.bool
}, _class3.Transition = _SlideTransitionGroup.default, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "handleViewChange", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function () {
      _this2.navigate('UP');
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handleMoveBack", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function () {
      _this3.navigate('LEFT');
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "handleMoveForward", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      _this4.navigate('RIGHT');
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "handleChange", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (date) {
      var _this5$props = _this5.props,
          views = _this5$props.views,
          onChange = _this5$props.onChange;
      var view = _this5.state.view;

      if (views[0] === view) {
        _this5.maybeSetCurrentDate(date);

        (0, _widgetHelpers.notify)(onChange, date);

        _this5.focus();

        return;
      }

      _this5.navigate('DOWN', date);
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "handleFooterClick", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (date) {
      var _this6$props = _this6.props,
          views = _this6$props.views,
          min = _this6$props.min,
          max = _this6$props.max,
          onViewChange = _this6$props.onViewChange;
      var firstView = views[0];
      (0, _widgetHelpers.notify)(_this6.props.onChange, date);

      if (_dates.default.inRange(date, min, max, firstView)) {
        _this6.focus();

        _this6.maybeSetCurrentDate(date);

        (0, _widgetHelpers.notify)(onViewChange, [firstView]);
      }
    };
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (e) {
      var _this7$state = _this7.state,
          currentDate = _this7$state.currentDate,
          view = _this7$state.view;
      var ctrl = e.ctrlKey || e.metaKey;
      var key = e.key;
      var direction = ARROWS_TO_DIRECTION[key];
      var unit = VIEW_UNIT[view];

      if (key === 'Enter') {
        e.preventDefault();
        return _this7.handleChange(currentDate);
      }

      if (direction) {
        if (ctrl) {
          e.preventDefault();

          _this7.navigate(direction);
        } else {
          if (_this7.isRtl() && OPPOSITE_DIRECTION[direction]) direction = OPPOSITE_DIRECTION[direction];
          var nextDate = Calendar.move(currentDate, _this7.props.min, _this7.props.max, view, direction);

          if (!_dates.default.eq(currentDate, nextDate, unit)) {
            e.preventDefault();
            if (_dates.default.gt(nextDate, currentDate, view)) _this7.navigate('RIGHT', nextDate);else if (_dates.default.lt(nextDate, currentDate, view)) _this7.navigate('LEFT', nextDate);else _this7.maybeSetCurrentDate(nextDate);
          }
        }
      }

      (0, _widgetHelpers.notify)(_this7.props.onKeyDown, [e]);
    };
  }
})), _class2)) || _class;

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt;
  return null;
}

var _default = (0, _uncontrollable.default)(Calendar, {
  value: 'onChange',
  currentDate: 'onCurrentDateChange',
  view: 'onViewChange'
}, ['focus']);

exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _events = _interopRequireDefault(__webpack_require__(45));

var _style = _interopRequireDefault(__webpack_require__(36));

var _height = _interopRequireDefault(__webpack_require__(30));

var _properties = __webpack_require__(37);

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _TransitionGroup = _interopRequireDefault(__webpack_require__(100));

var _Transition = _interopRequireWildcard(__webpack_require__(52));

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactDom = __webpack_require__(6);

var Props = _interopRequireWildcard(__webpack_require__(4));

var _transitionStyle, _transitionClasses;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DirectionPropType = _propTypes.default.oneOf(['left', 'right', 'top', 'bottom']);

var transitionStyle = (_transitionStyle = {}, _transitionStyle[_Transition.ENTERING] = {
  position: 'absolute'
}, _transitionStyle[_Transition.EXITING] = {
  position: 'absolute'
}, _transitionStyle);
var transitionClasses = (_transitionClasses = {}, _transitionClasses[_Transition.ENTERED] = 'rw-calendar-transition-entered', _transitionClasses[_Transition.ENTERING] = 'rw-calendar-transition-entering', _transitionClasses[_Transition.EXITING] = 'rw-calendar-transition-exiting', _transitionClasses[_Transition.EXITED] = 'rw-calendar-transition-exited', _transitionClasses);

function parseDuration(node) {
  var str = (0, _style.default)(node, _properties.transitionDuration);
  var mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

var SlideTransition =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SlideTransition, _React$Component);

  function SlideTransition() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleTransitionEnd = function (node, done) {
      var duration = parseDuration(node) || 300;

      var handler = function handler() {
        _events.default.off(node, _properties.transitionEnd, handler, false);

        done();
      };

      setTimeout(handler, duration * 1.5);

      _events.default.on(node, _properties.transitionEnd, handler, false);
    };

    return _this;
  }

  var _proto = SlideTransition.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        props = _objectWithoutProperties(_this$props, ["children"]);

    var direction = this.context.direction;

    var child = _react.default.Children.only(children);

    return _react.default.createElement(_Transition.default, _extends({}, props, {
      timeout: 5000,
      addEndListener: this.handleTransitionEnd
    }), function (status, innerProps) {
      return _react.default.cloneElement(child, _extends({}, innerProps, {
        style: transitionStyle[status],
        className: (0, _classnames.default)(child.props.className, 'rw-calendar-transition', "rw-calendar-transition-" + direction, transitionClasses[status])
      }));
    });
  };

  return SlideTransition;
}(_react.default.Component);

SlideTransition.contextTypes = {
  direction: DirectionPropType
};

var SlideTransitionGroup =
/*#__PURE__*/
function (_React$Component2) {
  _inheritsLoose(SlideTransitionGroup, _React$Component2);

  function SlideTransitionGroup() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _React$Component2.call.apply(_React$Component2, [this].concat(args)) || this;

    _this2.handleEnter = function (child) {
      var node = (0, _reactDom.findDOMNode)(_assertThisInitialized(_assertThisInitialized(_this2)));
      if (!child) return;
      var height = (0, _height.default)(child) + 'px';
      (0, _style.default)(node, {
        height: height,
        overflow: 'hidden'
      });
    };

    _this2.handleExited = function () {
      var node = (0, _reactDom.findDOMNode)(_assertThisInitialized(_assertThisInitialized(_this2)));
      (0, _style.default)(node, {
        overflow: '',
        height: ''
      });
    };

    return _this2;
  }

  var _proto2 = SlideTransitionGroup.prototype;

  _proto2.getChildContext = function getChildContext() {
    return {
      direction: this.props.direction
    };
  };

  _proto2.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        direction = _this$props2.direction;
    return _react.default.createElement(_TransitionGroup.default, _extends({}, Props.omitOwn(this), {
      component: "div",
      className: "rw-calendar-transition-group"
    }), _react.default.createElement(SlideTransition, {
      key: children.key,
      direction: direction,
      onEnter: this.handleEnter,
      onExited: this.handleExited
    }, children));
  };

  return SlideTransitionGroup;
}(_react.default.Component);

SlideTransitionGroup.childContextTypes = {
  direction: DirectionPropType
};
SlideTransitionGroup.defaultProps = {
  direction: 'left'
};
SlideTransitionGroup.propTypes = {
  direction: DirectionPropType
};
var _default = SlideTransitionGroup;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.setNumberLocalizer = exports.setDateLocalizer = exports.setLocalizers = exports.utils = void 0;

var _configure = _interopRequireDefault(__webpack_require__(60));

var _DropdownList = _interopRequireDefault(__webpack_require__(63));

exports.DropdownList = _DropdownList.default;

var _Combobox = _interopRequireDefault(__webpack_require__(91));

exports.Combobox = _Combobox.default;

var _Calendar = _interopRequireDefault(__webpack_require__(57));

exports.Calendar = _Calendar.default;

var _DatePicker = _interopRequireDefault(__webpack_require__(102));

exports.DatePicker = _DatePicker.default;

var _TimePicker = _interopRequireDefault(__webpack_require__(106));

exports.TimePicker = _TimePicker.default;

var _DateTimePicker = _interopRequireDefault(__webpack_require__(40));

exports.DateTimePicker = _DateTimePicker.default;

var _NumberPicker = _interopRequireDefault(__webpack_require__(107));

exports.NumberPicker = _NumberPicker.default;

var _Multiselect = _interopRequireDefault(__webpack_require__(109));

exports.Multiselect = _Multiselect.default;

var _SelectList = _interopRequireDefault(__webpack_require__(114));

exports.SelectList = _SelectList.default;

var _SlideTransitionGroup = _interopRequireDefault(__webpack_require__(58));

var _SlideDownTransition = _interopRequireDefault(__webpack_require__(44));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable global-require */
var setLocalizers = _configure.default.setLocalizers,
    setDateLocalizer = _configure.default.setDateLocalizer,
    setNumberLocalizer = _configure.default.setNumberLocalizer;
exports.setNumberLocalizer = setNumberLocalizer;
exports.setDateLocalizer = setDateLocalizer;
exports.setLocalizers = setLocalizers;
var utils = {
  SlideTransitionGroup: _SlideTransitionGroup.default,
  SlideDownTransition: _SlideDownTransition.default
};
exports.utils = utils;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var localizers = _interopRequireWildcard(__webpack_require__(5));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _default = {
  setLocalizers: function setLocalizers(_ref) {
    var date = _ref.date,
        number = _ref.number;
    date && this.setDateLocalizer(date);
    number && this.setNumberLocalizer(number);
  },
  setDateLocalizer: localizers.setDate,
  setNumberLocalizer: localizers.setNumber
};
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(62);

function emptyFunction() {}

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
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
/* 62 */
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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactDom = __webpack_require__(6);

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _activeElement = _interopRequireDefault(__webpack_require__(27));

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _reactComponentManagers = __webpack_require__(21);

var _reactLifecyclesCompat = __webpack_require__(7);

var _uncontrollable = _interopRequireDefault(__webpack_require__(14));

var _Widget = _interopRequireDefault(__webpack_require__(15));

var _WidgetPicker = _interopRequireDefault(__webpack_require__(22));

var _Select = _interopRequireDefault(__webpack_require__(23));

var _Popup = _interopRequireDefault(__webpack_require__(29));

var _List = _interopRequireDefault(__webpack_require__(24));

var _AddToListOption = _interopRequireDefault(__webpack_require__(55));

var _DropdownListInput = _interopRequireDefault(__webpack_require__(86));

var _messages = __webpack_require__(12);

var Props = _interopRequireWildcard(__webpack_require__(4));

var Filter = _interopRequireWildcard(__webpack_require__(32));

var _focusManager = _interopRequireDefault(__webpack_require__(16));

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

var _reduceToListState = _interopRequireDefault(__webpack_require__(18));

var _getAccessors = _interopRequireDefault(__webpack_require__(33));

var _scrollManager = _interopRequireDefault(__webpack_require__(25));

var _interaction = __webpack_require__(10);

var _widgetHelpers = __webpack_require__(9);

var _dataHelpers = __webpack_require__(19);

var _Icon = __webpack_require__(20);

var _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var CREATE_OPTION = {};
/**
 * ---
 * shortcuts:
 *   - { key: alt + down arrow, label: open dropdown }
 *   - { key: alt + up arrow, label: close dropdown }
 *   - { key: down arrow, label: move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: ctrl + enter, label: create new option from current searchTerm }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * A `<select>` replacement for single value lists.
 * @public
 */

var DropdownList = (0, _reactLifecyclesCompat.polyfill)(_class = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownList, _React$Component);

  function DropdownList() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleFocusChanged = function (focused) {
      if (!focused) _this.close();
    };

    _initializerDefineProperty(_this, "handleSelect", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleCreate", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleClick", _descriptor3, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleKeyDown", _descriptor4, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleKeyPress", _descriptor5, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.handleInputChange = function (e) {
      _this.search(e.target.value, e, 'input');
    };

    _this.handleAutofillChange = function (e) {
      var data = _this.props.data;
      var filledValue = e.target.value.toLowerCase();
      if (filledValue === '') return void _this.change(null);

      for (var _iterator = data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var item = _ref;
        var value = (0, _dataHelpers.dataValue)(item);

        if (String(value).toLowerCase() === filledValue || (0, _dataHelpers.dataText)(item).toLowerCase() === filledValue) {
          _this.change(item, e);

          break;
        }
      }
    };

    _this.handleAutofill = function (autofilling) {
      _this.setState({
        autofilling: autofilling
      });
    };

    _this.attachInputRef = function (ref) {
      return _this.inputRef = ref;
    };

    _this.attachFilterRef = function (ref) {
      return _this.filterRef = ref;
    };

    _this.attachListRef = function (ref) {
      return _this.listRef = ref;
    };

    _this.focus = function (target) {
      var _this$props = _this.props,
          filter = _this$props.filter,
          open = _this$props.open;
      var inst = target || (filter && open ? _this.filterRef : _this.inputRef);
      inst = (0, _reactDom.findDOMNode)(inst);
      if (inst && (0, _activeElement.default)() !== inst) inst.focus();
    };

    (0, _reactComponentManagers.autoFocus)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.inputId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_input');
    _this.listId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox');
    _this.activeId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox_active_option');
    _this.mounted = (0, _reactComponentManagers.mountManager)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.timeouts = (0, _reactComponentManagers.timeoutManager)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleScroll = (0, _scrollManager.default)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusManager = (0, _focusManager.default)(_assertThisInitialized(_assertThisInitialized(_this)), {
      didHandle: _this.handleFocusChanged
    });
    _this.state = {};
    return _this;
  }

  DropdownList.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var open = nextProps.open,
        value = nextProps.value,
        data = nextProps.data,
        messages = nextProps.messages,
        searchTerm = nextProps.searchTerm,
        filter = nextProps.filter,
        minLength = nextProps.minLength,
        caseSensitive = nextProps.caseSensitive;
    var focusedItem = prevState.focusedItem;
    var accessors = (0, _getAccessors.default)(nextProps);
    var valueChanged = value !== prevState.lastValue;
    var initialIdx = valueChanged && accessors.indexOf(data, value);
    if (open) data = Filter.filter(data, {
      filter: filter,
      searchTerm: searchTerm,
      minLength: minLength,
      caseSensitive: caseSensitive,
      textField: accessors.text
    });
    var list = (0, _reduceToListState.default)(data, prevState.list, {
      nextProps: nextProps
    });
    var selectedItem = data[initialIdx];
    var nextFocusedItem = ~data.indexOf(focusedItem) ? focusedItem : data[0];
    return {
      data: data,
      list: list,
      accessors: accessors,
      lastValue: value,
      messages: (0, _messages.getMessages)(messages),
      selectedItem: valueChanged ? list.nextEnabled(selectedItem) : prevState.selectedItem,
      focusedItem: valueChanged || !focusedItem ? list.nextEnabled(selectedItem || nextFocusedItem) : nextFocusedItem
    };
  };

  var _proto = DropdownList.prototype;

  _proto.change = function change(nextValue, originalEvent) {
    var _this$props2 = this.props,
        onChange = _this$props2.onChange,
        searchTerm = _this$props2.searchTerm,
        lastValue = _this$props2.value;

    if (!this.state.accessors.matches(nextValue, lastValue)) {
      (0, _widgetHelpers.notify)(onChange, [nextValue, {
        originalEvent: originalEvent,
        lastValue: lastValue,
        searchTerm: searchTerm
      }]);
      this.clearSearch(originalEvent);
      this.close();
    }
  };

  _proto.renderList = function renderList() {
    var _this$props3 = this.props,
        open = _this$props3.open,
        filter = _this$props3.filter,
        data = _this$props3.data,
        searchTerm = _this$props3.searchTerm,
        searchIcon = _this$props3.searchIcon,
        optionComponent = _this$props3.optionComponent,
        itemComponent = _this$props3.itemComponent,
        groupComponent = _this$props3.groupComponent,
        listProps = _this$props3.listProps;
    var _this$state = this.state,
        list = _this$state.list,
        accessors = _this$state.accessors,
        focusedItem = _this$state.focusedItem,
        selectedItem = _this$state.selectedItem,
        messages = _this$state.messages,
        filteredData = _this$state.data;
    var List = this.props.listComponent;
    return _react.default.createElement("div", null, filter && _react.default.createElement(_WidgetPicker.default, {
      className: "rw-filter-input rw-input"
    }, _react.default.createElement("input", {
      value: searchTerm,
      className: "rw-input-reset",
      onChange: this.handleInputChange,
      placeholder: messages.filterPlaceholder(this.props),
      ref: this.attachFilterRef
    }), _react.default.createElement(_Select.default, {
      icon: searchIcon,
      role: "presentation",
      "aria-hidden": "true"
    })), _react.default.createElement(List, _extends({}, listProps, {
      id: this.listId,
      activeId: this.activeId,
      data: filteredData,
      dataState: list.dataState,
      isDisabled: list.isDisabled,
      searchTerm: searchTerm,
      textAccessor: accessors.text,
      valueAccessor: accessors.value,
      itemComponent: itemComponent,
      groupComponent: groupComponent,
      optionComponent: optionComponent,
      selectedItem: selectedItem,
      focusedItem: open ? focusedItem : null,
      onSelect: this.handleSelect,
      onMove: this.handleScroll,
      "aria-live": open && 'polite',
      "aria-labelledby": this.inputId,
      "aria-hidden": !this.props.open,
      ref: this.attachListRef,
      messages: {
        emptyList: data.length ? messages.emptyFilter : messages.emptyList
      }
    })), this.allowCreate() && _react.default.createElement(_AddToListOption.default, {
      id: this.createId,
      searchTerm: searchTerm,
      onSelect: this.handleCreate,
      focused: !focusedItem || focusedItem === CREATE_OPTION
    }, messages.createOption(this.props)));
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props4 = this.props,
        className = _this$props4.className,
        tabIndex = _this$props4.tabIndex,
        popupTransition = _this$props4.popupTransition,
        textField = _this$props4.textField,
        data = _this$props4.data,
        busy = _this$props4.busy,
        dropUp = _this$props4.dropUp,
        placeholder = _this$props4.placeholder,
        value = _this$props4.value,
        open = _this$props4.open,
        isRtl = _this$props4.isRtl,
        filter = _this$props4.filter,
        inputProps = _this$props4.inputProps,
        selectIcon = _this$props4.selectIcon,
        busySpinner = _this$props4.busySpinner,
        containerClassName = _this$props4.containerClassName,
        valueComponent = _this$props4.valueComponent;
    var _this$state2 = this.state,
        focused = _this$state2.focused,
        accessors = _this$state2.accessors,
        messages = _this$state2.messages,
        autofilling = _this$state2.autofilling;
    var disabled = this.props.disabled === true;
    var readOnly = this.props.readOnly === true;
    var valueItem = accessors.findOrSelf(data, value);
    var shouldRenderPopup = (0, _widgetHelpers.isFirstFocusedRender)(this);

    var elementProps = _extends(Props.pickElementProps(this), {
      name: undefined,
      role: 'combobox',
      id: this.inputId,
      tabIndex: open && filter ? -1 : tabIndex || 0,
      'aria-owns': this.listId,
      'aria-activedescendant': open ? this.activeId : null,
      'aria-expanded': !!open,
      'aria-haspopup': true,
      'aria-busy': !!busy,
      'aria-live': !open && 'polite',
      'aria-autocomplete': 'list',
      'aria-disabled': disabled,
      'aria-readonly': readOnly
    });

    return _react.default.createElement(_Widget.default, _extends({}, elementProps, {
      open: open,
      isRtl: isRtl,
      dropUp: dropUp,
      focused: focused,
      disabled: disabled,
      readOnly: readOnly,
      autofilling: autofilling,
      onBlur: this.focusManager.handleBlur,
      onFocus: this.focusManager.handleFocus,
      onKeyDown: this.handleKeyDown,
      onKeyPress: this.handleKeyPress,
      className: (0, _classnames.default)(className, 'rw-dropdown-list'),
      ref: this.attachInputRef
    }), _react.default.createElement(_WidgetPicker.default, {
      onClick: this.handleClick,
      className: (0, _classnames.default)(containerClassName, 'rw-widget-input')
    }, _react.default.createElement(_DropdownListInput.default, _extends({}, inputProps, {
      value: valueItem,
      textField: textField,
      name: this.props.name,
      autoComplete: this.props.autoComplete,
      onAutofill: this.handleAutofill,
      onAutofillChange: this.handleAutofillChange,
      placeholder: placeholder,
      valueComponent: valueComponent
    })), _react.default.createElement(_Select.default, {
      busy: busy,
      icon: selectIcon,
      spinner: busySpinner,
      role: "presentational",
      "aria-hidden": "true",
      disabled: disabled || readOnly,
      label: messages.openDropdown(this.props)
    })), shouldRenderPopup && _react.default.createElement(_Popup.default, {
      open: open,
      dropUp: dropUp,
      transition: popupTransition,
      onEntered: function onEntered() {
        return _this2.focus();
      },
      onEntering: function onEntering() {
        return _this2.listRef.forceUpdate();
      }
    }, this.renderList(messages)));
  };

  _proto.findOption = function findOption(character, cb) {
    var _this3 = this;

    var word = ((this._currentWord || '') + character).toLowerCase();
    if (!character) return;
    this._currentWord = word;
    this.timeouts.set('search', function () {
      var list = _this3.state.list;
      var key = _this3.props.open ? 'focusedItem' : 'selectedItem';
      var item = list.next(_this3.state[key], word);

      if (item === _this3.state[key]) {
        item = list.next(null, word);
      }

      _this3._currentWord = '';
      if (item) cb(item);
    }, this.props.delay);
  };

  _proto.clearSearch = function clearSearch(originalEvent) {
    this.search('', originalEvent, 'clear');
  };

  _proto.search = function search(searchTerm, originalEvent, action) {
    if (action === void 0) {
      action = 'input';
    }

    var _this$props5 = this.props,
        onSearch = _this$props5.onSearch,
        lastSearchTerm = _this$props5.searchTerm;
    if (searchTerm !== lastSearchTerm) (0, _widgetHelpers.notify)(onSearch, [searchTerm, {
      action: action,
      lastSearchTerm: lastSearchTerm,
      originalEvent: originalEvent
    }]);
  };

  _proto.open = function open() {
    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
  };

  _proto.close = function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  _proto.toggle = function toggle() {
    this.props.open ? this.close() : this.open();
  };

  _proto.allowCreate = function allowCreate() {
    var _this$props6 = this.props,
        searchTerm = _this$props6.searchTerm,
        onCreate = _this$props6.onCreate,
        allowCreate = _this$props6.allowCreate;
    return !!(onCreate && (allowCreate === true || allowCreate === 'onFilter' && searchTerm) && !this.hasExtactMatch());
  };

  _proto.hasExtactMatch = function hasExtactMatch() {
    var _this$props7 = this.props,
        searchTerm = _this$props7.searchTerm,
        caseSensitive = _this$props7.caseSensitive,
        filter = _this$props7.filter;
    var _this$state3 = this.state,
        data = _this$state3.data,
        accessors = _this$state3.accessors;

    var lower = function lower(text) {
      return caseSensitive ? text : text.toLowerCase();
    }; // if there is an exact match on textFields:


    return filter && data.some(function (v) {
      return lower(accessors.text(v)) === lower(searchTerm);
    });
  };

  return DropdownList;
}(_react.default.Component), _class3.propTypes = _extends({}, Filter.propTypes, {
  value: _propTypes.default.any,

  /**
   * @type {function (
   *  dataItems: ?any,
   *  metadata: {
   *    lastValue: ?any,
   *    searchTerm: ?string
   *    originalEvent: SyntheticEvent,
   *  }
   * ): void}
   */
  onChange: _propTypes.default.func,
  open: _propTypes.default.bool,
  onToggle: _propTypes.default.func,
  data: _propTypes.default.array,
  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  allowCreate: _propTypes.default.oneOf([true, false, 'onFilter']),

  /**
   * A React component for customizing the rendering of the DropdownList
   * value
   */
  valueComponent: CustomPropTypes.elementType,
  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,
  optionComponent: CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,

  /**
   *
   * @type {(dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void}
   */
  onSelect: _propTypes.default.func,
  onCreate: _propTypes.default.func,

  /**
   * @type function(searchTerm: string, metadata: { action, lastSearchTerm, originalEvent? })
   */
  onSearch: _propTypes.default.func,
  searchTerm: _propTypes.default.string,
  busy: _propTypes.default.bool,

  /** Specify the element used to render the select (down arrow) icon. */
  selectIcon: _propTypes.default.node,
  searchIcon: _propTypes.default.node,

  /** Specify the element used to render the busy indicator */
  busySpinner: _propTypes.default.node,
  placeholder: _propTypes.default.string,
  dropUp: _propTypes.default.bool,
  popupTransition: CustomPropTypes.elementType,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,

  /** Adds a css class to the input container element. */
  containerClassName: _propTypes.default.string,
  inputProps: _propTypes.default.object,
  listProps: _propTypes.default.object,
  isRtl: _propTypes.default.bool,
  messages: _propTypes.default.shape({
    open: _propTypes.default.string,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
    filterPlaceholder: _propTypes.default.string,
    createOption: CustomPropTypes.message
  })
}), _class3.defaultProps = {
  data: [],
  delay: 500,
  searchTerm: '',
  allowCreate: false,
  searchIcon: _Icon.search,
  selectIcon: _Icon.caretDown,
  listComponent: _List.default
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "handleSelect", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (dataItem, originalEvent) {
      if (dataItem === undefined || dataItem === CREATE_OPTION) {
        _this4.handleCreate(_this4.props.searchTerm);

        return;
      }

      (0, _widgetHelpers.notify)(_this4.props.onSelect, [dataItem, {
        originalEvent: originalEvent
      }]);

      _this4.change(dataItem, originalEvent);

      _this4.close();

      _this4.focus(_this4);
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handleCreate", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (searchTerm, event) {
      if (searchTerm === void 0) {
        searchTerm = '';
      }

      (0, _widgetHelpers.notify)(_this5.props.onCreate, searchTerm);

      _this5.clearSearch(event);

      _this5.close();

      _this5.focus(_this5);
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "handleClick", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (e) {
      _this6.focus();

      _this6.toggle();

      (0, _widgetHelpers.notify)(_this6.props.onClick, e);
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (e) {
      var key = e.key,
          altKey = e.altKey,
          ctrlKey = e.ctrlKey;
      var _this7$props = _this7.props,
          open = _this7$props.open,
          onKeyDown = _this7$props.onKeyDown,
          filter = _this7$props.filter,
          searchTerm = _this7$props.searchTerm;
      var _this7$state = _this7.state,
          focusedItem = _this7$state.focusedItem,
          selectedItem = _this7$state.selectedItem,
          list = _this7$state.list;
      var createIsFocused = focusedItem === CREATE_OPTION;

      var canCreate = _this7.allowCreate();

      (0, _widgetHelpers.notify)(onKeyDown, [e]);

      var closeWithFocus = function closeWithFocus() {
        _this7.close();

        (0, _reactDom.findDOMNode)(_this7).focus();
      };

      var change = function change(item) {
        return item != null && _this7.change(item, e);
      };

      var focusItem = function focusItem(item) {
        return _this7.setState({
          focusedItem: item
        });
      };

      if (e.defaultPrevented) return;

      if (key === 'End') {
        e.preventDefault();
        if (open) focusItem(list.last());else change(list.last());
      } else if (key === 'Home') {
        e.preventDefault();
        if (open) focusItem(list.first());else change(list.first());
      } else if (key === 'Escape' && open) {
        e.preventDefault();
        closeWithFocus();
      } else if (key === 'Enter' && open && ctrlKey && canCreate) {
        e.preventDefault();

        _this7.handleCreate(searchTerm, e);
      } else if ((key === 'Enter' || key === ' ' && !filter) && open) {
        e.preventDefault();

        _this7.handleSelect(focusedItem, e);
      } else if (key === ' ' && !open) {
        e.preventDefault();

        _this7.open();
      } else if (key === 'ArrowDown') {
        e.preventDefault();
        if (altKey) return _this7.open();
        if (!open) change(list.next(selectedItem));
        var next = list.next(focusedItem);
        var creating = createIsFocused || canCreate && focusedItem === next;
        focusItem(creating ? CREATE_OPTION : next);
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        if (altKey) return closeWithFocus();
        if (!open) return change(list.prev(selectedItem));
        focusItem(createIsFocused ? list.last() : list.prev(focusedItem));
      }
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyPress", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this8 = this;

    return function (e) {
      (0, _widgetHelpers.notify)(_this8.props.onKeyPress, [e]);
      if (e.defaultPrevented) return;
      if (!(_this8.props.filter && _this8.props.open)) _this8.findOption(String.fromCharCode(e.which), function (item) {
        _this8.mounted() && _this8.props.open ? _this8.setState({
          focusedItem: item
        }) : item && _this8.change(item, e);
      });
    };
  }
})), _class2)) || _class;

var _default = (0, _uncontrollable.default)(DropdownList, {
  open: 'onToggle',
  value: 'onChange',
  searchTerm: 'onSearch'
}, ['focus']);

exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = makeAutoFocusable;
exports.PropTypes = void 0;

var _propTypes = __webpack_require__(65);

var _reactDom = __webpack_require__(6);

var _spyOnComponent = _interopRequireDefault(__webpack_require__(28));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = {
  autoFocus: _propTypes.bool
};
exports.PropTypes = PropTypes;

function makeAutoFocusable(instance) {
  (0, _spyOnComponent.default)(instance, {
    componentDidMount: function componentDidMount() {
      var autoFocus = this.props.autoFocus;
      if (autoFocus) this.focus ? this.focus() : (0, _reactDom.findDOMNode)(this).focus();
    }
  });
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
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
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(66)();
}


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(67);
var invariant = __webpack_require__(68);
var ReactPropTypesSecret = __webpack_require__(69);

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
/* 67 */
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
/* 68 */
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

if (false) {
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
/* 69 */
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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.callFocusEventHandler = callFocusEventHandler;
exports.default = createFocusManager;

var _reactDom = __webpack_require__(6);

var _timeoutManager = _interopRequireDefault(__webpack_require__(43));

var _mountManager = _interopRequireDefault(__webpack_require__(35));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function callFocusEventHandler(inst, focused, e) {
  var handler = inst.props[focused ? 'onFocus' : 'onBlur'];
  handler && handler(e);
}

function createFocusManager(instance, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      willHandle = _ref.willHandle,
      didHandle = _ref.didHandle,
      onChange = _ref.onChange,
      _ref$isDisabled = _ref.isDisabled,
      isDisabled = _ref$isDisabled === void 0 ? function () {
    return !!instance.props.disabled;
  } : _ref$isDisabled;

  var lastFocused;
  var timeouts = (0, _timeoutManager.default)(instance);
  var isMounted = (0, _mountManager.default)(instance);

  function _handleFocus(focused, event) {
    if (event && event.persist) event.persist();
    if (willHandle && willHandle(focused, event) === false) return;
    timeouts.set('focus', function () {
      (0, _reactDom.unstable_batchedUpdates)(function () {
        if (focused !== lastFocused) {
          if (didHandle) didHandle.call(instance, focused, event); // only fire a change when unmounted if its a blur

          if (isMounted() || !focused) {
            lastFocused = focused;
            onChange && onChange(focused, event);
          }
        }
      });
    });
  }

  return {
    handleBlur: function handleBlur(event) {
      if (!isDisabled()) _handleFocus(false, event);
    },
    handleFocus: function handleFocus(event) {
      if (!isDisabled()) _handleFocus(true, event);
    }
  };
}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.mixin = mixin;
exports.default = mixIntoClass;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function mixin(componentClass, _ref) {
  var propTypes = _ref.propTypes,
      contextTypes = _ref.contextTypes,
      childContextTypes = _ref.childContextTypes,
      getChildContext = _ref.getChildContext,
      protoSpec = _objectWithoutProperties(_ref, ["propTypes", "contextTypes", "childContextTypes", "getChildContext"]);

  if (propTypes) componentClass.propTypes = _extends({}, componentClass.propTypes, propTypes);
  if (contextTypes) componentClass.contextTypes = _extends({}, componentClass.contextTypes, contextTypes);
  if (childContextTypes) componentClass.childContextTypes = _extends({}, componentClass.childContextTypes, childContextTypes);

  if (getChildContext) {
    var baseGCContext = componentClass.prototype.getChildContext;

    componentClass.prototype.getChildContext = function $getChildContext() {
      return _extends({}, baseGCContext && baseGCContext.call(this), getChildContext.call(this));
    };
  }

  _extends(componentClass.prototype, protoSpec);

  return componentClass;
}

function mixIntoClass(spec) {
  return function (componentClass) {
    return mixin(componentClass, spec);
  };
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.uncontrolledPropTypes = uncontrolledPropTypes;
exports.isProp = isProp;
exports.defaultKey = defaultKey;
exports.isReactComponent = isReactComponent;

var _invariant = _interopRequireDefault(__webpack_require__(26));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    if (false) {
      var handler = controlledValues[prop];
      !(typeof handler === 'string' && handler.trim().length) ? process.env.NODE_ENV !== "production" ? (0, _invariant.default)(false, 'Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable', displayName, prop) : invariant(false) : void 0;
      propTypes[prop] = readOnlyPropType(handler, displayName);
    }
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


function isReactComponent(component) {
  return !!(component && component.prototype && component.prototype.isReactComponent);
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filterEvents;

var _contains = __webpack_require__(48);

var _contains2 = _interopRequireDefault(_contains);

var _querySelectorAll = __webpack_require__(49);

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
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(11);

var _inDOM2 = _interopRequireDefault(_inDOM);

var _on = __webpack_require__(46);

var _on2 = _interopRequireDefault(_on);

var _off = __webpack_require__(47);

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
/* 75 */
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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateStyleName;

var _hyphenate = __webpack_require__(77);

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
/* 77 */
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
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _getComputedStyle;

var _camelizeStyle = __webpack_require__(50);

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
/* 79 */
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
/* 80 */
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.classNamesShape = exports.timeoutsShape = undefined;
exports.transitionTimeout = transitionTimeout;

var _propTypes = __webpack_require__(0);

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
  enterDone: _propTypes2.default.string,
  enterActive: _propTypes2.default.string,
  exit: _propTypes2.default.string,
  exitDone: _propTypes2.default.string,
  exitActive: _propTypes2.default.string
})]);

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactIs = __webpack_require__(83);

var _createChainableTypeChecker = __webpack_require__(53);

var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(84);
} else {
  module.exports = require('./cjs/react-is.development.js');
}


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.4.0
 * react-is.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports,"__esModule",{value:!0});var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.forward_ref"):60112,n=b?Symbol.for("react.timeout"):60113;
function q(a){if("object"===typeof a&&null!==a){var p=a.$$typeof;switch(p){case c:switch(a=a.type,a){case l:case e:case g:case f:return a;default:switch(a=a&&a.$$typeof,a){case k:case m:case h:return a;default:return p}}case d:return p}}}exports.typeOf=q;exports.AsyncMode=l;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=m;exports.Fragment=e;exports.Profiler=g;exports.Portal=d;exports.StrictMode=f;
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===l||a===g||a===f||a===n||"object"===typeof a&&null!==a&&(a.$$typeof===h||a.$$typeof===k||a.$$typeof===m)};exports.isAsyncMode=function(a){return q(a)===l};exports.isContextConsumer=function(a){return q(a)===k};exports.isContextProvider=function(a){return q(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return q(a)===m};
exports.isFragment=function(a){return q(a)===e};exports.isProfiler=function(a){return q(a)===g};exports.isPortal=function(a){return q(a)===d};exports.isStrictMode=function(a){return q(a)===f};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes.default.string,
  component: _propTypes.default.string
};

function ListOptionGroup(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$component = _ref.component,
      component = _ref$component === void 0 ? 'li' : _ref$component;
  var Tag = component;
  return _react.default.createElement(Tag, {
    tabIndex: "-1",
    role: "separator",
    className: (0, _classnames.default)(className, 'rw-list-optgroup')
  }, children);
}

ListOptionGroup.propTypes = propTypes;
var _default = ListOptionGroup;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

var _dataHelpers = __webpack_require__(19);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DropdownListInput =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownListInput, _React$Component);

  function DropdownListInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      autofilling: false
    };

    _this.handleAutofillDetect = function (_ref) {
      var animationName = _ref.animationName;
      var autofilling;
      if (animationName === 'react-widgets-autofill-start') autofilling = true;else if (animationName === 'react-widgets-autofill-cancel') autofilling = false;else return;

      _this.setState({
        autofilling: autofilling
      });

      _this.props.onAutofill(autofilling);
    };

    _this.handleAutofill = function (e) {
      _this.setState({
        autofilling: false
      });

      _this.props.onAutofillChange(e);
    };

    return _this;
  }

  var _proto = DropdownListInput.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        name = _this$props.name,
        placeholder = _this$props.placeholder,
        value = _this$props.value,
        textField = _this$props.textField,
        autoComplete = _this$props.autoComplete,
        Component = _this$props.valueComponent;
    var autofilling = this.state.autofilling;
    var child = null;

    if (!autofilling && autoComplete !== 'off') {
      child = !value && placeholder ? _react.default.createElement("span", {
        className: "rw-placeholder"
      }, placeholder) : Component ? _react.default.createElement(Component, {
        item: value
      }) : (0, _dataHelpers.dataText)(value, textField);
    }

    var val = (0, _dataHelpers.dataValue)(value);
    return _react.default.createElement("div", {
      className: "rw-input rw-dropdown-list-input"
    }, autoComplete !== 'off' && _react.default.createElement("input", {
      tabIndex: "-1",
      name: name,
      value: val == null ? '' : val,
      autoComplete: autoComplete,
      onChange: this.handleAutofill,
      onAnimationStart: this.handleAutofillDetect,
      className: (0, _classnames.default)('rw-dropdown-list-autofill rw-detect-autofill', !autofilling && 'rw-sr')
    }), child);
  };

  return DropdownListInput;
}(_react.default.Component);

DropdownListInput.propTypes = {
  value: _propTypes.default.any,
  placeholder: _propTypes.default.string,
  name: _propTypes.default.string,
  autoComplete: _propTypes.default.string,
  textField: CustomPropTypes.accessor,
  valueComponent: CustomPropTypes.elementType,
  onAutofill: _propTypes.default.func.isRequired,
  onAutofillChange: _propTypes.default.func.isRequired
};
var _default = DropdownListInput;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollTo;

var _offset = __webpack_require__(51);

var _offset2 = _interopRequireDefault(_offset);

var _height = __webpack_require__(30);

var _height2 = _interopRequireDefault(_height);

var _scrollParent = __webpack_require__(88);

var _scrollParent2 = _interopRequireDefault(_scrollParent);

var _scrollTop = __webpack_require__(89);

var _scrollTop2 = _interopRequireDefault(_scrollTop);

var _requestAnimationFrame = __webpack_require__(90);

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

var _isWindow = __webpack_require__(31);

var _isWindow2 = _interopRequireDefault(_isWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollTo(selected, scrollParent) {
  var offset = (0, _offset2.default)(selected);
  var poff = { top: 0, left: 0 };
  var list = void 0,
      listScrollTop = void 0,
      selectedTop = void 0,
      isWin = void 0;
  var selectedHeight = void 0,
      listHeight = void 0,
      bottom = void 0;

  if (!selected) return;

  list = scrollParent || (0, _scrollParent2.default)(selected);
  isWin = (0, _isWindow2.default)(list);
  listScrollTop = (0, _scrollTop2.default)(list);

  listHeight = (0, _height2.default)(list, true);
  isWin = (0, _isWindow2.default)(list);

  if (!isWin) poff = (0, _offset2.default)(list);

  offset = {
    top: offset.top - poff.top,
    left: offset.left - poff.left,
    height: offset.height,
    width: offset.width
  };

  selectedHeight = offset.height;
  selectedTop = offset.top + (isWin ? 0 : listScrollTop);
  bottom = selectedTop + selectedHeight;

  listScrollTop = listScrollTop > selectedTop ? selectedTop : bottom > listScrollTop + listHeight ? bottom - listHeight : listScrollTop;

  var id = (0, _requestAnimationFrame2.default)(function () {
    return (0, _scrollTop2.default)(list, listScrollTop);
  });
  return function () {
    return _requestAnimationFrame2.default.cancel(id);
  };
}
module.exports = exports['default'];

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollPrarent;

var _style = __webpack_require__(36);

var _style2 = _interopRequireDefault(_style);

var _height = __webpack_require__(30);

var _height2 = _interopRequireDefault(_height);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollPrarent(node) {
  var position = (0, _style2.default)(node, 'position'),
      excludeStatic = position === 'absolute',
      ownerDoc = node.ownerDocument;

  if (position === 'fixed') return ownerDoc || document;

  while ((node = node.parentNode) && node.nodeType !== 9) {

    var isStatic = excludeStatic && (0, _style2.default)(node, 'position') === 'static',
        style = (0, _style2.default)(node, 'overflow') + (0, _style2.default)(node, 'overflow-y') + (0, _style2.default)(node, 'overflow-x');

    if (isStatic) continue;

    if (/(auto|scroll)/.test(style) && (0, _height2.default)(node) < node.scrollHeight) return node;
  }

  return document;
}
module.exports = exports['default'];

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollTop;

var _isWindow = __webpack_require__(31);

var _isWindow2 = _interopRequireDefault(_isWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollTop(node, val) {
  var win = (0, _isWindow2.default)(node);

  if (val === undefined) return win ? 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;

  if (win) win.scrollTo('pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
}
module.exports = exports['default'];

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(11);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vendors = ['', 'webkit', 'moz', 'o', 'ms'];
var cancel = 'clearTimeout';
var raf = fallback;
var compatRaf = void 0;

var getKey = function getKey(vendor, k) {
  return vendor + (!vendor ? k : k[0].toUpperCase() + k.substr(1)) + 'AnimationFrame';
};

if (_inDOM2.default) {
  vendors.some(function (vendor) {
    var rafKey = getKey(vendor, 'request');

    if (rafKey in window) {
      cancel = getKey(vendor, 'cancel');
      return raf = function raf(cb) {
        return window[rafKey](cb);
      };
    }
  });
}

/* https://github.com/component/raf */
var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime(),
      ms = Math.max(0, 16 - (curr - prev)),
      req = setTimeout(fn, ms);

  prev = curr;
  return req;
}

compatRaf = function compatRaf(cb) {
  return raf(cb);
};
compatRaf.cancel = function (id) {
  window[cancel] && typeof window[cancel] === 'function' && window[cancel](id);
};
exports.default = compatRaf;
module.exports = exports['default'];

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _reactLifecyclesCompat = __webpack_require__(7);

var _uncontrollable = _interopRequireDefault(__webpack_require__(14));

var _Widget = _interopRequireDefault(__webpack_require__(15));

var _WidgetPicker = _interopRequireDefault(__webpack_require__(22));

var _List = _interopRequireDefault(__webpack_require__(24));

var _Popup = _interopRequireDefault(__webpack_require__(29));

var _Select = _interopRequireDefault(__webpack_require__(23));

var _ComboboxInput = _interopRequireDefault(__webpack_require__(92));

var _messages = __webpack_require__(12);

var _focusManager = _interopRequireDefault(__webpack_require__(16));

var _reduceToListState = _interopRequireDefault(__webpack_require__(18));

var _getAccessors = _interopRequireDefault(__webpack_require__(33));

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

var _scrollManager = _interopRequireDefault(__webpack_require__(25));

var _ = __webpack_require__(8);

var Props = _interopRequireWildcard(__webpack_require__(4));

var Filter = _interopRequireWildcard(__webpack_require__(32));

var _interaction = __webpack_require__(10);

var _widgetHelpers = __webpack_require__(9);

var _Icon = __webpack_require__(20);

var _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var propTypes = _extends({}, Filter.propTypes, {
  value: _propTypes.default.any,
  onChange: _propTypes.default.func,
  open: _propTypes.default.bool,
  onToggle: _propTypes.default.func,
  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,
  data: _propTypes.default.array,
  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  name: _propTypes.default.string,

  /**
   *
   * @type {(dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void}
   */
  onSelect: _propTypes.default.func,
  autoFocus: _propTypes.default.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,

  /**
   * When `true` the Combobox will suggest, or fill in, values as you type. The suggestions
   * are always "startsWith", meaning it will search from the start of the `textField` property
   */
  suggest: Filter.propTypes.filter,
  busy: _propTypes.default.bool,

  /** Specify the element used to render the select (down arrow) icon. */
  selectIcon: _propTypes.default.node,

  /** Specify the element used to render the busy indicator */
  busySpinner: _propTypes.default.node,
  delay: _propTypes.default.number,
  dropUp: _propTypes.default.bool,
  popupTransition: CustomPropTypes.elementType,
  placeholder: _propTypes.default.string,

  /** Adds a css class to the input container element. */
  containerClassName: _propTypes.default.string,
  inputProps: _propTypes.default.object,
  listProps: _propTypes.default.object,
  isRtl: _propTypes.default.bool,
  messages: _propTypes.default.shape({
    openCombobox: CustomPropTypes.message,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message
  })
  /**
   * ---
   * shortcuts:
   *   - { key: alt + down arrow, label: open combobox }
   *   - { key: alt + up arrow, label: close combobox }
   *   - { key: down arrow, label: move focus to next item }
   *   - { key: up arrow, label: move focus to previous item }
   *   - { key: home, label: move focus to first item }
   *   - { key: end, label: move focus to last item }
   *   - { key: enter, label: select focused item }
   *   - { key: any key, label: search list for item starting with key }
   * ---
   *
   * Select an item from the list, or input a custom value. The Combobox can also make suggestions as you type.
  
   * @public
   */

});

var Combobox = (0, _reactLifecyclesCompat.polyfill)(_class = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Combobox, _React$Component);

  function Combobox(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    _this.handleFocusWillChange = function (focused) {
      if (!focused && _this.inputRef) _this.inputRef.accept();
      if (focused) _this.focus();
    };

    _this.handleFocusChanged = function (focused) {
      if (!focused) _this.close();
    };

    _initializerDefineProperty(_this, "handleSelect", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.handleInputKeyDown = function (_ref) {
      var key = _ref.key;
      _this._deleting = key === 'Backspace' || key === 'Delete';
      _this._isTyping = true;
    };

    _this.handleInputChange = function (event) {
      var suggestion = _this.suggest(event.target.value);

      _this.change(suggestion, true, event);

      _this.open();
    };

    _initializerDefineProperty(_this, "handleKeyDown", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.attachListRef = function (ref) {
      _this.listRef = ref;
    };

    _this.attachInputRef = function (ref) {
      _this.inputRef = ref;
    };

    _initializerDefineProperty(_this, "toggle", _descriptor3, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.inputId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_input');
    _this.listId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox');
    _this.activeId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox_active_option');
    _this.handleScroll = (0, _scrollManager.default)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusManager = (0, _focusManager.default)(_assertThisInitialized(_assertThisInitialized(_this)), {
      willHandle: _this.handleFocusWillChange,
      didHandle: _this.handleFocusChanged
    });
    _this.state = {
      isSuggesting: function isSuggesting() {
        return _this.inputRef && _this.inputRef.isSuggesting();
      }
    };
    return _this;
  }

  var _proto = Combobox.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    var isSuggesting = nextState.isSuggesting(),
        stateChanged = !(0, _.isShallowEqual)(nextState, this.state),
        valueChanged = !(0, _.isShallowEqual)(nextProps, this.props);
    return isSuggesting || stateChanged || valueChanged;
  };

  Combobox.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        data = nextProps.data,
        messages = nextProps.messages,
        filter = nextProps.filter,
        minLength = nextProps.minLength,
        caseSensitive = nextProps.caseSensitive;
    var focusedItem = prevState.focusedItem;
    var accessors = (0, _getAccessors.default)(nextProps);
    var valueChanged = value !== prevState.lastValue;
    var selectedIndex = accessors.indexOf(data, value);
    var dataItem = selectedIndex === -1 ? value : data[selectedIndex];
    var searchTerm; // filter only when the value is not an item in the data list

    if (selectedIndex === -1 || prevState.isSuggesting()) {
      searchTerm = accessors.text(dataItem);
    }

    data = Filter.filter(data, {
      filter: filter,
      searchTerm: searchTerm,
      minLength: minLength,
      caseSensitive: caseSensitive,
      textField: accessors.text
    });
    var list = (0, _reduceToListState.default)(data, prevState.list, {
      nextProps: nextProps
    }); // index may have changed after filtering

    if (selectedIndex !== -1) {
      selectedIndex = accessors.indexOf(data, value);
    }

    var focusedIndex = accessors.indexOf(data, focusedItem);

    if (focusedIndex === -1) {
      // value isn't a dataItem so find the close match
      focusedIndex = Filter.indexOf(data, {
        searchTerm: searchTerm,
        textField: accessors.text,
        filter: filter || true
      });
    }

    var selectedItem = data[selectedIndex];
    var nextFocusedItem = null; // If no item is focused, or is no longer in the dataset, default to either the selected item, or to the first item in the list

    if (focusedIndex === -1) {
      if (selectedItem) {
        nextFocusedItem = selectedItem;
      } else {
        nextFocusedItem = data[0];
      }
    } else {
      nextFocusedItem = data[focusedIndex];
    }

    return {
      data: data,
      list: list,
      accessors: accessors,
      lastValue: value,
      messages: (0, _messages.getMessages)(messages),
      selectedItem: valueChanged ? list.nextEnabled(selectedItem) : prevState.selectedItem,
      focusedItem: valueChanged || !focusedItem ? list.nextEnabled(selectedItem || nextFocusedItem) : nextFocusedItem
    };
  }; // has to be done early since `accept()` re-focuses the input


  _proto.renderInput = function renderInput() {
    var _this$props = this.props,
        suggest = _this$props.suggest,
        filter = _this$props.filter,
        busy = _this$props.busy,
        name = _this$props.name,
        data = _this$props.data,
        value = _this$props.value,
        autoFocus = _this$props.autoFocus,
        tabIndex = _this$props.tabIndex,
        placeholder = _this$props.placeholder,
        inputProps = _this$props.inputProps,
        disabled = _this$props.disabled,
        readOnly = _this$props.readOnly,
        open = _this$props.open;
    var accessors = this.state.accessors;
    var valueItem = accessors.findOrSelf(data, value);
    var completeType = suggest ? filter ? 'both' : 'inline' : filter ? 'list' : '';
    return _react.default.createElement(_ComboboxInput.default, _extends({}, inputProps, {
      role: "combobox",
      name: name,
      id: this.inputId,
      autoFocus: autoFocus,
      tabIndex: tabIndex,
      suggest: suggest,
      disabled: disabled === true,
      readOnly: readOnly === true,
      "aria-busy": !!busy,
      "aria-owns": this.listId,
      "aria-autocomplete": completeType,
      "aria-activedescendant": open ? this.activeId : null,
      "aria-expanded": open,
      "aria-haspopup": true,
      placeholder: placeholder,
      value: accessors.text(valueItem),
      onChange: this.handleInputChange,
      onKeyDown: this.handleInputKeyDown,
      ref: this.attachInputRef
    }));
  };

  _proto.renderList = function renderList(messages) {
    var activeId = this.activeId,
        inputId = this.inputId,
        listId = this.listId;
    var _this$props2 = this.props,
        open = _this$props2.open,
        data = _this$props2.data,
        value = _this$props2.value,
        listProps = _this$props2.listProps,
        optionComponent = _this$props2.optionComponent,
        itemComponent = _this$props2.itemComponent,
        groupComponent = _this$props2.groupComponent;
    var _this$state = this.state,
        list = _this$state.list,
        accessors = _this$state.accessors,
        focusedItem = _this$state.focusedItem,
        selectedItem = _this$state.selectedItem,
        filteredData = _this$state.data;
    var List = this.props.listComponent;
    return _react.default.createElement(List, _extends({}, listProps, {
      id: listId,
      activeId: activeId,
      data: filteredData,
      dataState: list.dataState,
      isDisabled: list.isDisabled,
      textAccessor: accessors.text,
      valueAccessor: accessors.value,
      itemComponent: itemComponent,
      groupComponent: groupComponent,
      optionComponent: optionComponent,
      selectedItem: selectedItem,
      focusedItem: open ? focusedItem : null,
      searchTerm: accessors.text(value) || '',
      "aria-hidden": !open,
      "aria-labelledby": inputId,
      "aria-live": open && 'polite',
      onSelect: this.handleSelect,
      onMove: this.handleScroll,
      ref: this.attachListRef,
      messages: {
        emptyList: data.length ? messages.emptyFilter : messages.emptyList
      }
    }));
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        isRtl = _this$props3.isRtl,
        className = _this$props3.className,
        popupTransition = _this$props3.popupTransition,
        busy = _this$props3.busy,
        dropUp = _this$props3.dropUp,
        open = _this$props3.open,
        selectIcon = _this$props3.selectIcon,
        busySpinner = _this$props3.busySpinner,
        containerClassName = _this$props3.containerClassName;
    var _this$state2 = this.state,
        focused = _this$state2.focused,
        messages = _this$state2.messages;
    var disabled = this.props.disabled === true,
        readOnly = this.props.readOnly === true;
    var elementProps = Props.pickElementProps(this);
    var shouldRenderPopup = (0, _widgetHelpers.isFirstFocusedRender)(this);
    return _react.default.createElement(_Widget.default, _extends({}, elementProps, {
      open: open,
      isRtl: isRtl,
      dropUp: dropUp,
      focused: focused,
      disabled: disabled,
      readOnly: readOnly,
      onBlur: this.focusManager.handleBlur,
      onFocus: this.focusManager.handleFocus,
      onKeyDown: this.handleKeyDown,
      className: (0, _classnames.default)(className, 'rw-combobox')
    }), _react.default.createElement(_WidgetPicker.default, {
      className: containerClassName
    }, this.renderInput(), _react.default.createElement(_Select.default, {
      bordered: true,
      busy: busy,
      icon: selectIcon,
      spinner: busySpinner,
      onClick: this.toggle,
      disabled: disabled || readOnly,
      label: messages.openCombobox(this.props)
    })), shouldRenderPopup && _react.default.createElement(_Popup.default, {
      open: open,
      dropUp: dropUp,
      transition: popupTransition,
      onEntering: function onEntering() {
        return _this2.listRef.forceUpdate();
      }
    }, _react.default.createElement("div", null, this.renderList(messages))));
  };

  _proto.focus = function focus() {
    if (this.inputRef) this.inputRef.focus();
  };

  _proto.change = function change(nextValue, typing, originalEvent) {
    var _this$props4 = this.props,
        onChange = _this$props4.onChange,
        lastValue = _this$props4.value;
    this._typedChange = !!typing;
    (0, _widgetHelpers.notify)(onChange, [nextValue, {
      lastValue: lastValue,
      originalEvent: originalEvent
    }]);
  };

  _proto.open = function open() {
    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
  };

  _proto.close = function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  _proto.suggest = function suggest(searchTerm) {
    var _this$props5 = this.props,
        textField = _this$props5.textField,
        suggest = _this$props5.suggest,
        minLength = _this$props5.minLength;
    var data = this.state.data;
    if (!this._deleting) return Filter.suggest(data, {
      minLength: minLength,
      textField: textField,
      searchTerm: searchTerm,
      filter: suggest,
      caseSensitive: false
    });
    return searchTerm;
  };

  return Combobox;
}(_react.default.Component), _class3.propTypes = propTypes, _class3.defaultProps = {
  data: [],
  value: '',
  open: false,
  suggest: false,
  filter: false,
  delay: 500,
  selectIcon: _Icon.caretDown,
  listComponent: _List.default
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "handleSelect", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (data, originalEvent) {
      _this3.close();

      (0, _widgetHelpers.notify)(_this3.props.onSelect, [data, {
        originalEvent: originalEvent
      }]);

      _this3.change(data, false, originalEvent);

      _this3.inputRef && _this3.inputRef.accept(true);

      _this3.focus();
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (e) {
      var key = e.key,
          altKey = e.altKey;
      var _this4$props = _this4.props,
          open = _this4$props.open,
          onKeyDown = _this4$props.onKeyDown;
      var _this4$state = _this4.state,
          focusedItem = _this4$state.focusedItem,
          selectedItem = _this4$state.selectedItem,
          list = _this4$state.list;
      (0, _widgetHelpers.notify)(onKeyDown, [e]);
      if (e.defaultPrevented) return;

      var select = function select(item) {
        return item != null && _this4.handleSelect(item, e);
      };

      var focusItem = function focusItem(item) {
        return _this4.setState({
          focusedItem: item
        });
      };

      if (key === 'End' && open) {
        e.preventDefault();
        focusItem(list.last());
      } else if (key === 'Home' && open) {
        e.preventDefault();
        focusItem(list.first());
      } else if (key === 'Escape' && open) {
        e.preventDefault();

        _this4.close();
      } else if (key === 'Enter' && open) {
        e.preventDefault();
        select(_this4.state.focusedItem);
      } else if (key === 'Tab') {
        _this4.inputRef.accept();
      } else if (key === 'ArrowDown') {
        e.preventDefault();
        if (altKey) return _this4.open();
        if (open) focusItem(list.next(focusedItem));else select(list.next(selectedItem));
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        if (altKey) return _this4.close();
        if (open) focusItem(list.prev(focusedItem));else select(list.prev(selectedItem));
      }
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "toggle", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function () {
      _this5.focus();

      _this5.props.open ? _this5.close() : _this5.open();
    };
  }
})), _class2)) || _class;

var _default = (0, _uncontrollable.default)(Combobox, {
  open: 'onToggle',
  value: 'onChange'
}, ['focus']);

exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = exports.caretSet = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _reactDom = __webpack_require__(6);

var _Input = _interopRequireDefault(__webpack_require__(39));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var caretSet = function caretSet(node, start, end) {
  if (end === void 0) {
    end = start;
  }

  try {
    node.setSelectionRange(start, end);
  } catch (e) {
    /* not focused or not visible */
  }
};

exports.caretSet = caretSet;

var ComboboxInput =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ComboboxInput, _React$Component);

  function ComboboxInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleChange = function (e) {
      var _this$props = _this.props,
          placeholder = _this$props.placeholder,
          value = _this$props.value,
          onChange = _this$props.onChange;
      var stringValue = e.target.value;
      var hasPlaceholder = !!placeholder; // IE fires input events when setting/unsetting placeholders.
      // issue #112

      if (hasPlaceholder && !stringValue && stringValue === (value || '')) return;
      _this._last = stringValue;
      onChange(e, stringValue);
    };

    return _this;
  }

  var _proto = ComboboxInput.prototype;

  _proto.componentDidUpdate = function componentDidUpdate() {
    var input = (0, _reactDom.findDOMNode)(this);
    var val = this.props.value;

    if (this.isSuggesting()) {
      var start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length;

      var end = val.length - start;

      if (start >= 0 && end !== 0) {
        caretSet(input, start, start + end);
      }
    }
  };

  _proto.accept = function accept(clearSelection) {
    if (clearSelection === void 0) {
      clearSelection = false;
    }

    this._last = null;

    if (clearSelection) {
      var node = (0, _reactDom.findDOMNode)(this);
      caretSet(node, node.value.length);
    }
  };

  _proto.focus = function focus() {
    (0, _reactDom.findDOMNode)(this).focus();
  };

  _proto.isSuggesting = function isSuggesting() {
    var _this$props2 = this.props,
        value = _this$props2.value,
        suggest = _this$props2.suggest;
    if (!suggest) return false;
    return this._last != null && value.toLowerCase().indexOf(this._last.toLowerCase()) !== -1;
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        onKeyDown = _this$props3.onKeyDown,
        props = _objectWithoutProperties(_this$props3, ["onKeyDown"]);

    delete props.suggest;
    return _react.default.createElement(_Input.default, _extends({}, props, {
      className: "rw-widget-input",
      onKeyDown: onKeyDown,
      onChange: this.handleChange
    }));
  };

  return ComboboxInput;
}(_react.default.Component);

ComboboxInput.defaultProps = {
  value: ''
};
ComboboxInput.propTypes = {
  value: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  suggest: _propTypes.default.bool,
  onChange: _propTypes.default.func.isRequired,
  onKeyDown: _propTypes.default.func
};
var _default = ComboboxInput;
exports.default = _default;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _Button = _interopRequireDefault(__webpack_require__(17));

var _Icon = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Header =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Header, _React$Component);

  function Header() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Header.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        messages = _this$props.messages,
        label = _this$props.label,
        labelId = _this$props.labelId,
        onMoveRight = _this$props.onMoveRight,
        onMoveLeft = _this$props.onMoveLeft,
        onViewChange = _this$props.onViewChange,
        prevDisabled = _this$props.prevDisabled,
        upDisabled = _this$props.upDisabled,
        nextDisabled = _this$props.nextDisabled,
        _this$props$navigateP = _this$props.navigatePrevIcon,
        navigatePrevIcon = _this$props$navigateP === void 0 ? _Icon.chevronLeft : _this$props$navigateP,
        _this$props$navigateN = _this$props.navigateNextIcon,
        navigateNextIcon = _this$props$navigateN === void 0 ? _Icon.chevronRight : _this$props$navigateN,
        isRtl = _this$props.isRtl;
    return _react.default.createElement("div", {
      className: "rw-calendar-header"
    }, _react.default.createElement(_Button.default, {
      className: "rw-calendar-btn-left",
      onClick: onMoveLeft,
      disabled: prevDisabled,
      label: messages.moveBack(),
      icon: isRtl ? navigateNextIcon : navigatePrevIcon
    }), _react.default.createElement(_Button.default, {
      id: labelId,
      onClick: onViewChange,
      className: "rw-calendar-btn-view",
      disabled: upDisabled,
      "aria-live": "polite",
      "aria-atomic": "true"
    }, label), _react.default.createElement(_Button.default, {
      className: "rw-calendar-btn-right",
      onClick: onMoveRight,
      disabled: nextDisabled,
      label: messages.moveForward(),
      icon: isRtl ? navigatePrevIcon : navigateNextIcon
    }));
  };

  return Header;
}(_react.default.Component);

Header.propTypes = {
  label: _propTypes.default.string.isRequired,
  labelId: _propTypes.default.string,
  upDisabled: _propTypes.default.bool.isRequired,
  prevDisabled: _propTypes.default.bool.isRequired,
  nextDisabled: _propTypes.default.bool.isRequired,
  onViewChange: _propTypes.default.func.isRequired,
  onMoveLeft: _propTypes.default.func.isRequired,
  onMoveRight: _propTypes.default.func.isRequired,
  navigatePrevIcon: _propTypes.default.node,
  navigateNextIcon: _propTypes.default.node,
  messages: _propTypes.default.shape({
    moveBack: _propTypes.default.func.isRequired,
    moveForward: _propTypes.default.func.isRequired
  }),
  isRtl: _propTypes.default.bool
};
var _default = Header;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = Footer;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _Button = _interopRequireDefault(__webpack_require__(17));

var _localizers = __webpack_require__(5);

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  value: _propTypes.default.instanceOf(Date),
  onClick: _propTypes.default.func.isRequired,
  culture: _propTypes.default.string,
  format: CustomPropTypes.dateFormat
};

function Footer(_ref) {
  var disabled = _ref.disabled,
      readOnly = _ref.readOnly,
      value = _ref.value,
      onClick = _ref.onClick,
      culture = _ref.culture,
      format = _ref.format;
  return _react.default.createElement("div", {
    className: "rw-calendar-footer"
  }, _react.default.createElement(_Button.default, {
    disabled: !!(disabled || readOnly),
    onClick: onClick.bind(null, value)
  }, _localizers.date.format(value, _localizers.date.getFormat('footer', format), culture)));
}

Footer.propTypes = propTypes;
module.exports = exports["default"];

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _react = _interopRequireDefault(__webpack_require__(1));

var _CalendarView = _interopRequireDefault(__webpack_require__(34));

var _dates = _interopRequireDefault(__webpack_require__(13));

var _localizers = __webpack_require__(5);

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

var _ = __webpack_require__(8);

var Props = _interopRequireWildcard(__webpack_require__(4));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var isEqual = function isEqual(dateA, dateB) {
  return _dates.default.eq(dateA, dateB, 'day');
};

var MonthView =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MonthView, _React$Component);

  function MonthView() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.renderRow = function (row, rowIdx) {
      var _this$props = _this.props,
          focused = _this$props.focused,
          today = _this$props.today,
          activeId = _this$props.activeId,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange,
          value = _this$props.value,
          culture = _this$props.culture,
          min = _this$props.min,
          max = _this$props.max,
          footerFormat = _this$props.footerFormat,
          dateFormat = _this$props.dateFormat,
          Day = _this$props.dayComponent;
      footerFormat = _localizers.date.getFormat('footer', footerFormat);
      dateFormat = _localizers.date.getFormat('dayOfMonth', dateFormat);
      return _react.default.createElement(_CalendarView.default.Row, {
        key: rowIdx
      }, row.map(function (date, colIdx) {
        var formattedDate = _localizers.date.format(date, dateFormat, culture);

        var label = _localizers.date.format(date, footerFormat, culture);

        return _react.default.createElement(_CalendarView.default.Cell, {
          key: colIdx,
          activeId: activeId,
          label: label,
          date: date,
          now: today,
          min: min,
          max: max,
          unit: "day",
          viewUnit: "month",
          onChange: onChange,
          focused: focused,
          selected: value,
          disabled: disabled
        }, Day ? _react.default.createElement(Day, {
          date: date,
          label: formattedDate
        }) : formattedDate);
      }));
    };

    return _this;
  }

  var _proto = MonthView.prototype;

  _proto.renderHeaders = function renderHeaders(week, format, culture) {
    var firstOfWeek = _localizers.date.firstOfWeek(culture);

    return week.map(function (date) {
      return _react.default.createElement("th", {
        className: "rw-head-cell",
        key: 'header_' + _dates.default.weekday(date, undefined, firstOfWeek)
      }, _localizers.date.format(date, format, culture));
    });
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        focused = _this$props2.focused,
        culture = _this$props2.culture,
        activeId = _this$props2.activeId,
        dayFormat = _this$props2.dayFormat;

    var month = _dates.default.visibleDays(focused, culture);

    var rows = (0, _.chunk)(month, 7);
    dayFormat = _localizers.date.getFormat('weekday', dayFormat);
    return _react.default.createElement(_CalendarView.default, _extends({}, Props.omitOwn(this), {
      activeId: activeId,
      className: (0, _classnames.default)(className, 'rw-calendar-month')
    }), _react.default.createElement("thead", {
      className: "rw-calendar-head"
    }, _react.default.createElement("tr", {
      className: "rw-calendar-row"
    }, this.renderHeaders(rows[0], dayFormat, culture))), _react.default.createElement(_CalendarView.default.Body, null, rows.map(this.renderRow)));
  };

  return MonthView;
}(_react.default.Component);

MonthView.isEqual = isEqual;
MonthView.propTypes = {
  activeId: _propTypes.default.string,
  culture: _propTypes.default.string,
  today: _propTypes.default.instanceOf(Date),
  value: _propTypes.default.instanceOf(Date),
  focused: _propTypes.default.instanceOf(Date),
  min: _propTypes.default.instanceOf(Date),
  max: _propTypes.default.instanceOf(Date),
  onChange: _propTypes.default.func.isRequired,
  dayComponent: CustomPropTypes.elementType,
  dayFormat: CustomPropTypes.dateFormat,
  dateFormat: CustomPropTypes.dateFormat,
  footerFormat: CustomPropTypes.dateFormat,
  disabled: _propTypes.default.bool
};
var _default = MonthView;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 96 */
/***/ (function(module, exports) {

var MILI    = 'milliseconds'
  , SECONDS = 'seconds'
  , MINUTES = 'minutes'
  , HOURS   = 'hours'
  , DAY     = 'day'
  , WEEK    = 'week'
  , MONTH   = 'month'
  , YEAR    = 'year'
  , DECADE  = 'decade'
  , CENTURY = 'century';

var dates = module.exports = {

  add: function(date, num, unit) {
    date = new Date(date)

    switch (unit){
      case MILI:
      case SECONDS:
      case MINUTES:
      case HOURS:
      case YEAR:
        return dates[unit](date, dates[unit](date) + num)
      case DAY:
        return dates.date(date, dates.date(date) + num)
      case WEEK:
        return dates.date(date, dates.date(date) + (7 * num)) 
      case MONTH:
        return monthMath(date, num)
      case DECADE:
        return dates.year(date, dates.year(date) + (num * 10))
      case CENTURY:
        return dates.year(date, dates.year(date) + (num * 100))
    }

    throw new TypeError('Invalid units: "' + unit + '"')
  },

  subtract: function(date, num, unit) {
    return dates.add(date, -num, unit)
  },

  startOf: function(date, unit, firstOfWeek) {
    date = new Date(date)

    switch (unit) {
      case 'century':
      case 'decade':
      case 'year':
          date = dates.month(date, 0);
      case 'month':
          date = dates.date(date, 1);
      case 'week':
      case 'day':
          date = dates.hours(date, 0);
      case 'hours':
          date = dates.minutes(date, 0);
      case 'minutes':
          date = dates.seconds(date, 0);
      case 'seconds':
          date = dates.milliseconds(date, 0);
    }

    if (unit === DECADE) 
      date = dates.subtract(date, dates.year(date) % 10, 'year')
    
    if (unit === CENTURY) 
      date = dates.subtract(date, dates.year(date) % 100, 'year')

    if (unit === WEEK) 
      date = dates.weekday(date, 0, firstOfWeek);

    return date
  },


  endOf: function(date, unit, firstOfWeek){
    date = new Date(date)
    date = dates.startOf(date, unit, firstOfWeek)
    date = dates.add(date, 1, unit)
    date = dates.subtract(date, 1, MILI)
    return date
  },

  eq:  createComparer(function(a, b){ return a === b }),
  neq: createComparer(function(a, b){ return a !== b }),
  gt:  createComparer(function(a, b){ return a > b }),
  gte: createComparer(function(a, b){ return a >= b }),
  lt:  createComparer(function(a, b){ return a < b }),
  lte: createComparer(function(a, b){ return a <= b }),

  min: function(){
    return new Date(Math.min.apply(Math, arguments))
  },

  max: function(){
    return new Date(Math.max.apply(Math, arguments))
  },
  
  inRange: function(day, min, max, unit){
    unit = unit || 'day'

    return (!min || dates.gte(day, min, unit))
        && (!max || dates.lte(day, max, unit))
  },

  milliseconds:   createAccessor('Milliseconds'),
  seconds:        createAccessor('Seconds'),
  minutes:        createAccessor('Minutes'),
  hours:          createAccessor('Hours'),
  day:            createAccessor('Day'),
  date:           createAccessor('Date'),
  month:          createAccessor('Month'),
  year:           createAccessor('FullYear'),

  decade: function (date, val) {
    return val === undefined 
      ? dates.year(dates.startOf(date, DECADE))
      : dates.add(date, val + 10, YEAR);
  },

  century: function (date, val) {
    return val === undefined 
      ? dates.year(dates.startOf(date, CENTURY))
      : dates.add(date, val + 100, YEAR);
  },

  weekday: function (date, val, firstDay) {
      var weekday = (dates.day(date) + 7 - (firstDay || 0) ) % 7;

      return val === undefined 
        ? weekday 
        : dates.add(date, val - weekday, DAY);
  },

  diff: function (date1, date2, unit, asFloat) {
    var dividend, divisor, result;

    switch (unit) {
      case MILI:
      case SECONDS:
      case MINUTES:
      case HOURS:
      case DAY:
      case WEEK:
        dividend = date2.getTime() - date1.getTime(); break;
      case MONTH:
      case YEAR:
      case DECADE:
      case CENTURY:
        dividend = (dates.year(date2) - dates.year(date1)) * 12 + dates.month(date2) - dates.month(date1); break;
      default:
        throw new TypeError('Invalid units: "' + unit + '"');
    }

    switch (unit) {
      case MILI:
          divisor = 1; break;
      case SECONDS:
          divisor = 1000; break;
      case MINUTES:
          divisor = 1000 * 60; break;
      case HOURS:
          divisor = 1000 * 60 * 60; break;
      case DAY:
          divisor = 1000 * 60 * 60 * 24; break;
      case WEEK:
          divisor = 1000 * 60 * 60 * 24 * 7; break;
      case MONTH:
          divisor = 1; break;
      case YEAR:
          divisor = 12; break;
      case DECADE:
          divisor = 120; break;
      case CENTURY:
          divisor = 1200; break;
      default:
        throw new TypeError('Invalid units: "' + unit + '"');
    }

    result = dividend / divisor;

    return asFloat ? result : absoluteFloor(result);
  }
};

function absoluteFloor(number) {
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

function monthMath(date, val){
  var current = dates.month(date)
    , newMonth  = (current + val);

    date = dates.month(date, newMonth)

    while (newMonth < 0 ) newMonth = 12 + newMonth
      
    //month rollover
    if ( dates.month(date) !== ( newMonth % 12))
      date = dates.date(date, 0) //move to last of month

    return date
}

function createAccessor(method){
  return function(date, val){
    if (val === undefined)
      return date['get' + method]()

    date = new Date(date)
    date['set' + method](val)
    return date
  }
}

function createComparer(operator) {
  return function (a, b, unit) {
    return operator(+dates.startOf(a, unit), +dates.startOf(b, unit))
  };
}


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _CalendarView = _interopRequireDefault(__webpack_require__(34));

var _dates = _interopRequireDefault(__webpack_require__(13));

var _localizers = __webpack_require__(5);

var _ = __webpack_require__(8);

var Props = _interopRequireWildcard(__webpack_require__(4));

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var YearView =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(YearView, _React$Component);

  function YearView() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.renderRow = function (row, rowIdx) {
      var _this$props = _this.props,
          focused = _this$props.focused,
          activeId = _this$props.activeId,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange,
          value = _this$props.value,
          today = _this$props.today,
          culture = _this$props.culture,
          headerFormat = _this$props.headerFormat,
          monthFormat = _this$props.monthFormat,
          min = _this$props.min,
          max = _this$props.max;
      headerFormat = _localizers.date.getFormat('header', headerFormat);
      monthFormat = _localizers.date.getFormat('month', monthFormat);
      return _react.default.createElement(_CalendarView.default.Row, {
        key: rowIdx
      }, row.map(function (date, colIdx) {
        var label = _localizers.date.format(date, headerFormat, culture);

        return _react.default.createElement(_CalendarView.default.Cell, {
          key: colIdx,
          activeId: activeId,
          label: label,
          date: date,
          now: today,
          min: min,
          max: max,
          unit: "month",
          onChange: onChange,
          focused: focused,
          selected: value,
          disabled: disabled
        }, _localizers.date.format(date, monthFormat, culture));
      }));
    };

    return _this;
  }

  var _proto = YearView.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        focused = _this$props2.focused,
        activeId = _this$props2.activeId,
        months = _dates.default.monthsInYear(_dates.default.year(focused));

    return _react.default.createElement(_CalendarView.default, _extends({}, Props.omitOwn(this), {
      activeId: activeId
    }), _react.default.createElement(_CalendarView.default.Body, null, (0, _.chunk)(months, 4).map(this.renderRow)));
  };

  return YearView;
}(_react.default.Component);

YearView.propTypes = {
  activeId: _propTypes.default.string,
  culture: _propTypes.default.string,
  today: _propTypes.default.instanceOf(Date),
  value: _propTypes.default.instanceOf(Date),
  focused: _propTypes.default.instanceOf(Date),
  min: _propTypes.default.instanceOf(Date),
  max: _propTypes.default.instanceOf(Date),
  onChange: _propTypes.default.func.isRequired,
  headerFormat: CustomPropTypes.dateFormat,
  monthFormat: CustomPropTypes.dateFormat,
  disabled: _propTypes.default.bool
};
var _default = YearView;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _CalendarView = _interopRequireDefault(__webpack_require__(34));

var _dates = _interopRequireDefault(__webpack_require__(13));

var _localizers = __webpack_require__(5);

var _ = __webpack_require__(8);

var Props = _interopRequireWildcard(__webpack_require__(4));

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DecadeView =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DecadeView, _React$Component);

  function DecadeView() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.renderRow = function (row, rowIdx) {
      var _this$props = _this.props,
          focused = _this$props.focused,
          activeId = _this$props.activeId,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange,
          yearFormat = _this$props.yearFormat,
          value = _this$props.value,
          today = _this$props.today,
          culture = _this$props.culture,
          min = _this$props.min,
          max = _this$props.max;
      return _react.default.createElement(_CalendarView.default.Row, {
        key: rowIdx
      }, row.map(function (date, colIdx) {
        var label = _localizers.date.format(date, _localizers.date.getFormat('year', yearFormat), culture);

        return _react.default.createElement(_CalendarView.default.Cell, {
          key: colIdx,
          unit: "year",
          activeId: activeId,
          label: label,
          date: date,
          now: today,
          min: min,
          max: max,
          onChange: onChange,
          focused: focused,
          selected: value,
          disabled: disabled
        }, label);
      }));
    };

    return _this;
  }

  var _proto = DecadeView.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        focused = _this$props2.focused,
        activeId = _this$props2.activeId;
    return _react.default.createElement(_CalendarView.default, _extends({}, Props.omitOwn(this), {
      activeId: activeId
    }), _react.default.createElement(_CalendarView.default.Body, null, (0, _.chunk)(getDecadeYears(focused), 4).map(this.renderRow)));
  };

  return DecadeView;
}(_react.default.Component);

DecadeView.propTypes = {
  activeId: _propTypes.default.string,
  culture: _propTypes.default.string,
  today: _propTypes.default.instanceOf(Date),
  value: _propTypes.default.instanceOf(Date),
  focused: _propTypes.default.instanceOf(Date),
  min: _propTypes.default.instanceOf(Date),
  max: _propTypes.default.instanceOf(Date),
  onChange: _propTypes.default.func.isRequired,
  yearFormat: CustomPropTypes.dateFormat,
  disabled: _propTypes.default.bool
};

function getDecadeYears(_date) {
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      date = _dates.default.add(_dates.default.startOf(_date, 'decade'), -2, 'year');

  return days.map(function () {
    return date = _dates.default.add(date, 1, 'year');
  });
}

var _default = DecadeView;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _CalendarView = _interopRequireDefault(__webpack_require__(34));

var _dates = _interopRequireDefault(__webpack_require__(13));

var _localizers = __webpack_require__(5);

var _ = __webpack_require__(8);

var Props = _interopRequireWildcard(__webpack_require__(4));

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var CenturyView =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(CenturyView, _React$Component);

  function CenturyView() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.renderRow = function (row, rowIdx) {
      var _this$props = _this.props,
          focused = _this$props.focused,
          activeId = _this$props.activeId,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange,
          value = _this$props.value,
          today = _this$props.today,
          culture = _this$props.culture,
          min = _this$props.min,
          decadeFormat = _this$props.decadeFormat,
          max = _this$props.max;
      decadeFormat = _localizers.date.getFormat('decade', decadeFormat);
      return _react.default.createElement(_CalendarView.default.Row, {
        key: rowIdx
      }, row.map(function (date, colIdx) {
        var label = _localizers.date.format(_dates.default.startOf(date, 'decade'), decadeFormat, culture);

        return _react.default.createElement(_CalendarView.default.Cell, {
          key: colIdx,
          unit: "decade",
          activeId: activeId,
          label: label,
          date: date,
          now: today,
          min: min,
          max: max,
          onChange: onChange,
          focused: focused,
          selected: value,
          disabled: disabled
        }, label);
      }));
    };

    return _this;
  }

  var _proto = CenturyView.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        focused = _this$props2.focused,
        activeId = _this$props2.activeId;
    return _react.default.createElement(_CalendarView.default, _extends({}, Props.omitOwn(this), {
      activeId: activeId
    }), _react.default.createElement(_CalendarView.default.Body, null, (0, _.chunk)(getCenturyDecades(focused), 4).map(this.renderRow)));
  };

  return CenturyView;
}(_react.default.Component);

CenturyView.propTypes = {
  activeId: _propTypes.default.string,
  culture: _propTypes.default.string,
  today: _propTypes.default.instanceOf(Date),
  value: _propTypes.default.instanceOf(Date),
  focused: _propTypes.default.instanceOf(Date),
  min: _propTypes.default.instanceOf(Date),
  max: _propTypes.default.instanceOf(Date),
  onChange: _propTypes.default.func.isRequired,
  decadeFormat: CustomPropTypes.dateFormat,
  disabled: _propTypes.default.bool
};

function getCenturyDecades(_date) {
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      date = _dates.default.add(_dates.default.startOf(_date, 'century'), -20, 'year');

  return days.map(function () {
    return date = _dates.default.add(date, 10, 'year');
  });
}

var _default = CenturyView;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactLifecyclesCompat = __webpack_require__(7);

var _ChildMapping = __webpack_require__(101);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var values = Object.values || function (obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
};

var propTypes = {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: _propTypes2.default.any,
  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   */
  children: _propTypes2.default.node,

  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: _propTypes2.default.bool,
  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: _propTypes2.default.bool,
  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: _propTypes2.default.bool,

  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: _propTypes2.default.func
};

var defaultProps = {
  component: 'div',
  childFactory: function childFactory(child) {
    return child;
  }

  /**
   * The `<TransitionGroup>` component manages a set of `<Transition>` components
   * in a list. Like with the `<Transition>` component, `<TransitionGroup>`, is a
   * state machine for managing the mounting and unmounting of components over
   * time.
   *
   * Consider the example below using the `Fade` CSS transition from before.
   * As items are removed or added to the TodoList the `in` prop is toggled
   * automatically by the `<TransitionGroup>`. You can use _any_ `<Transition>`
   * component in a `<TransitionGroup>`, not just css.
   *
   * ## Example
   *
   * <iframe src="https://codesandbox.io/embed/00rqyo26kn?fontsize=14" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
   *
   * Note that `<TransitionGroup>`  does not define any animation behavior!
   * Exactly _how_ a list item animates is up to the individual `<Transition>`
   * components. This means you can mix and match animations across different
   * list items.
   */
};
var TransitionGroup = function (_React$Component) {
  _inherits(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    _classCallCheck(this, TransitionGroup);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    var handleExited = _this.handleExited.bind(_this);

    // Initial children should all be entering, dependent on appear
    _this.state = {
      handleExited: handleExited,
      firstRender: true
    };
    return _this;
  }

  TransitionGroup.prototype.getChildContext = function getChildContext() {
    return {
      transitionGroup: { isMounting: !this.appeared }
    };
  };

  TransitionGroup.prototype.componentDidMount = function componentDidMount() {
    this.appeared = true;
  };

  TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children,
        handleExited = _ref.handleExited,
        firstRender = _ref.firstRender;

    return {
      children: firstRender ? (0, _ChildMapping.getInitialChildMapping)(nextProps, handleExited) : (0, _ChildMapping.getNextChildMapping)(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  };

  TransitionGroup.prototype.handleExited = function handleExited(child, node) {
    var currentChildMapping = (0, _ChildMapping.getChildMapping)(this.props.children);

    if (child.key in currentChildMapping) return;

    if (child.props.onExited) {
      child.props.onExited(node);
    }

    this.setState(function (state) {
      var children = _extends({}, state.children);

      delete children[child.key];
      return { children: children };
    });
  };

  TransitionGroup.prototype.render = function render() {
    var _props = this.props,
        Component = _props.component,
        childFactory = _props.childFactory,
        props = _objectWithoutProperties(_props, ['component', 'childFactory']);

    var children = values(this.state.children).map(childFactory);

    delete props.appear;
    delete props.enter;
    delete props.exit;

    if (Component === null) {
      return children;
    }
    return _react2.default.createElement(
      Component,
      props,
      children
    );
  };

  return TransitionGroup;
}(_react2.default.Component);

TransitionGroup.childContextTypes = {
  transitionGroup: _propTypes2.default.object.isRequired
};


TransitionGroup.propTypes =  false ? propTypes : {};
TransitionGroup.defaultProps = defaultProps;

exports.default = (0, _reactLifecyclesCompat.polyfill)(TransitionGroup);
module.exports = exports['default'];

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;
exports.getInitialChildMapping = getInitialChildMapping;
exports.getNextChildMapping = getNextChildMapping;

var _react = __webpack_require__(1);

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children, mapFn) {
  var mapper = function mapper(child) {
    return mapFn && (0, _react.isValidElement)(child) ? mapFn(child) : child;
  };

  var result = Object.create(null);
  if (children) _react.Children.map(children, function (c) {
    return c;
  }).forEach(function (child) {
    // run the map function here instead so that the key is the computed one
    result[child.key] = mapper(child);
  });
  return result;
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextKeysPending = Object.create(null);

  var pendingKeys = [];
  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i = void 0;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}

function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function (child) {
    return (0, _react.cloneElement)(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, 'appear', props),
      enter: getProp(child, 'enter', props),
      exit: getProp(child, 'exit', props)
    });
  });
}

function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);

  Object.keys(children).forEach(function (key) {
    var child = children[key];

    if (!(0, _react.isValidElement)(child)) return;

    var hasPrev = key in prevChildMapping;
    var hasNext = key in nextChildMapping;

    var prevChild = prevChildMapping[key];
    var isLeaving = (0, _react.isValidElement)(prevChild) && !prevChild.props.in;

    // item is new (entering)
    if (hasNext && (!hasPrev || isLeaving)) {
      // console.log('entering', key)
      children[key] = (0, _react.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      // item is old (exiting)
      // console.log('leaving', key)
      children[key] = (0, _react.cloneElement)(child, { in: false });
    } else if (hasNext && hasPrev && (0, _react.isValidElement)(prevChild)) {
      // item hasn't changed transition states
      // copy over the last transition props;
      // console.log('unchanged', key)
      children[key] = (0, _react.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    }
  });

  return children;
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _DateTimePicker = _interopRequireDefault(__webpack_require__(40));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var propTypes = {
  open: _propTypes.default.bool,
  defaultOpen: _propTypes.default.bool,
  onToggle: _propTypes.default.func
};

var DatePicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DatePicker, _React$Component);

  function DatePicker(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    _this.handleToggle = function (open) {
      _this.toggleState = !!open;
      if (_this.props.onToggle) _this.props.onToggle(_this.toggleState);else _this.forceUpdate();
    };

    _this.toggleState = props.defaultOpen;
    return _this;
  }

  var _proto = DatePicker.prototype;

  _proto.render = function render() {
    var open = this.props.open;
    open = open === undefined ? this.toggleState : open;
    return _react.default.createElement(_DateTimePicker.default, _extends({}, this.props, {
      time: false,
      open: open ? 'date' : open,
      onToggle: this.handleToggle
    }));
  };

  return DatePicker;
}(_react.default.Component);

DatePicker.propTypes = propTypes;
var _default = DatePicker;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deprecated;

var _warning = __webpack_require__(41);

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
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactLifecyclesCompat = __webpack_require__(7);

var _reactDom = __webpack_require__(6);

var _Input = _interopRequireDefault(__webpack_require__(39));

var _localizers = __webpack_require__(5);

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

var Props = _interopRequireWildcard(__webpack_require__(4));

var _class, _class2, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DateTimePickerInput = (0, _reactLifecyclesCompat.polyfill)(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DateTimePickerInput, _React$Component);

  function DateTimePickerInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {};

    _this.handleBlur = function (event) {
      var _this$props = _this.props,
          format = _this$props.format,
          culture = _this$props.culture,
          parse = _this$props.parse,
          onChange = _this$props.onChange,
          onBlur = _this$props.onBlur;
      onBlur && onBlur(event);

      if (_this._needsFlush) {
        var date = parse(event.target.value);
        var dateIsInvalid = event.target.value != '' && date == null;

        if (dateIsInvalid) {
          _this.setState({
            textValue: ''
          });
        }

        _this._needsFlush = false;
        onChange(date, formatDate(date, format, culture));
      }
    };

    _this.handleChange = function (_ref) {
      var value = _ref.target.value;
      _this._needsFlush = true;

      _this.setState({
        textValue: value
      });
    };

    return _this;
  }

  DateTimePickerInput.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        editing = nextProps.editing,
        editFormat = nextProps.editFormat,
        format = nextProps.format,
        culture = nextProps.culture;
    var textValue = formatDate(value, editing && editFormat ? editFormat : format, culture);
    if (prevState.lastValueFromProps !== textValue) return {
      textValue: textValue,
      lastValueFromProps: textValue
    };
    return null;
  };

  var _proto = DateTimePickerInput.prototype;

  _proto.focus = function focus() {
    (0, _reactDom.findDOMNode)(this).focus();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        disabled = _this$props2.disabled,
        readOnly = _this$props2.readOnly;
    var textValue = this.state.textValue;
    var props = Props.omitOwn(this);
    return _react.default.createElement(_Input.default, _extends({}, props, {
      type: "text",
      className: "rw-widget-input",
      value: textValue,
      disabled: disabled,
      readOnly: readOnly,
      onChange: this.handleChange,
      onBlur: this.handleBlur
    }));
  };

  return DateTimePickerInput;
}(_react.default.Component), _class2.propTypes = {
  format: CustomPropTypes.dateFormat.isRequired,
  editing: _propTypes.default.bool,
  editFormat: CustomPropTypes.dateFormat,
  parse: _propTypes.default.func.isRequired,
  value: _propTypes.default.instanceOf(Date),
  onChange: _propTypes.default.func.isRequired,
  onBlur: _propTypes.default.func,
  culture: _propTypes.default.string,
  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled
}, _temp)) || _class;

var _default = DateTimePickerInput;
exports.default = _default;

function isValid(d) {
  return !isNaN(d.getTime());
}

function formatDate(date, format, culture) {
  var val = '';
  if (date instanceof Date && isValid(date)) val = _localizers.date.format(date, format, culture);
  return val;
}

module.exports = exports["default"];

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactLifecyclesCompat = __webpack_require__(7);

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _List = _interopRequireDefault(__webpack_require__(24));

var _dates = _interopRequireDefault(__webpack_require__(13));

var _reduceToListState = _interopRequireDefault(__webpack_require__(18));

var _localizers = __webpack_require__(5);

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

var _class, _class2, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

var format = function format(props) {
  return _localizers.date.getFormat('time', props.format);
};

var accessors = {
  text: function text(item) {
    return item.label;
  },
  value: function value(item) {
    return item.date;
  }
};

var find = function find(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    if (fn(arr[i])) return arr[i];
  }

  return null;
};

function getBounds(_ref) {
  var min = _ref.min,
      max = _ref.max,
      currentDate = _ref.currentDate,
      value = _ref.value,
      preserveDate = _ref.preserveDate;

  //compare just the time regradless of whether they fall on the same day
  if (!preserveDate) {
    var _start = _dates.default.startOf(_dates.default.merge(new Date(), min, currentDate), 'minutes');

    var _end = _dates.default.startOf(_dates.default.merge(new Date(), max, currentDate), 'minutes');

    if (_dates.default.lte(_end, _start) && _dates.default.gt(max, min, 'day')) _end = _dates.default.tomorrow();
    return {
      min: _start,
      max: _end
    };
  }

  var start = _dates.default.today();

  var end = _dates.default.tomorrow();

  value = value || currentDate || start; //date parts are equal

  return {
    min: _dates.default.eq(value, min, 'day') ? _dates.default.merge(start, min, currentDate) : start,
    max: _dates.default.eq(value, max, 'day') ? _dates.default.merge(start, max, currentDate) : end
  };
}

function getDates(_ref2) {
  var step = _ref2.step,
      culture = _ref2.culture,
      props = _objectWithoutProperties(_ref2, ["step", "culture"]);

  var times = [];

  var _getBounds = getBounds(props),
      min = _getBounds.min,
      max = _getBounds.max;

  var startDay = _dates.default.date(min);

  while (_dates.default.date(min) === startDay && _dates.default.lte(min, max)) {
    times.push({
      date: min,
      label: _localizers.date.format(min, format(props), culture)
    });
    min = _dates.default.add(min, step || 30, 'minutes');
  }

  return times;
}

var TimeList = (0, _reactLifecyclesCompat.polyfill)(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TimeList, _React$Component);

  function TimeList() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {};

    _this.handleKeyDown = function (e) {
      var key = e.key;
      var _this$state = _this.state,
          focusedItem = _this$state.focusedItem,
          list = _this$state.list;

      if (key === 'End') {
        e.preventDefault();

        _this.setState({
          focusedItem: list.last()
        });
      } else if (key === 'Home') {
        e.preventDefault();

        _this.setState({
          focusedItem: list.first()
        });
      } else if (key === 'Enter') {
        _this.props.onSelect(focusedItem);
      } else if (key === 'ArrowDown') {
        e.preventDefault();

        _this.setState({
          focusedItem: list.next(focusedItem)
        });
      } else if (key === 'ArrowUp') {
        e.preventDefault();

        _this.setState({
          focusedItem: list.prev(focusedItem)
        });
      }
    };

    return _this;
  }

  TimeList.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        currentDate = nextProps.currentDate,
        step = nextProps.step;
    var data = getDates(nextProps);
    var currentValue = value || currentDate;
    var valueChanged = !prevState.lastValue || !_dates.default.eq(currentValue, prevState.lastValue, 'minutes');
    var list = (0, _reduceToListState.default)(data, prevState.list, {
      nextProps: nextProps
    });
    var selectedItem = find(data, function (t) {
      return _dates.default.eq(t.date, currentValue, 'minutes');
    });
    var closestDate = find(data, function (t) {
      return Math.abs(_dates.default.diff(t.date, currentValue, 'minutes')) < step;
    });
    return {
      data: data,
      list: list,
      lastValue: currentValue,
      selectedItem: list.nextEnabled(selectedItem),
      focusedItem: valueChanged || !prevState.focusedItem ? list.nextEnabled(selectedItem || closestDate || data[0]) : find(data, function (t) {
        return _dates.default.eq(t.date, prevState.focusedItem.date, 'minutes');
      })
    };
  };

  var _proto = TimeList.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unmounted = true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        listProps = _this$props.listProps,
        props = _objectWithoutProperties(_this$props, ["listProps"]);

    var _this$state2 = this.state,
        data = _this$state2.data,
        list = _this$state2.list,
        focusedItem = _this$state2.focusedItem,
        selectedItem = _this$state2.selectedItem;
    delete props.currentDate;
    delete props.min;
    delete props.max;
    delete props.step;
    delete props.format;
    delete props.culture;
    delete props.preserveDate;
    delete props.value;
    return _react.default.createElement(_List.default, _extends({}, props, listProps, {
      data: data,
      dataState: list.dataState,
      isDisabled: list.isDisabled,
      textAccessor: accessors.text,
      valueAccessor: accessors.value,
      selectedItem: selectedItem,
      focusedItem: focusedItem
    }));
  };

  return TimeList;
}(_react.default.Component), _class2.defaultProps = {
  step: 30,
  currentDate: new Date(),
  min: new Date(1900, 0, 1),
  max: new Date(2099, 11, 31),
  preserveDate: true
}, _class2.propTypes = {
  value: _propTypes.default.instanceOf(Date),
  step: _propTypes.default.number,
  min: _propTypes.default.instanceOf(Date),
  max: _propTypes.default.instanceOf(Date),
  currentDate: _propTypes.default.instanceOf(Date),
  itemComponent: CustomPropTypes.elementType,
  listProps: _propTypes.default.object,
  format: CustomPropTypes.dateFormat,
  onSelect: _propTypes.default.func,
  preserveDate: _propTypes.default.bool,
  culture: _propTypes.default.string
}, _temp)) || _class;

var _default = TimeList;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _DateTimePicker = _interopRequireDefault(__webpack_require__(40));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var propTypes = {
  open: _propTypes.default.bool,
  defaultOpen: _propTypes.default.bool,
  onToggle: _propTypes.default.func
};

var TimePicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TimePicker, _React$Component);

  function TimePicker(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    _this.handleToggle = function (open) {
      _this.toggleState = !!open;
      if (_this.props.onToggle) _this.props.onToggle(_this.toggleState);else _this.forceUpdate();
    };

    _this.toggleState = props.defaultOpen;
    return _this;
  }

  var _proto = TimePicker.prototype;

  _proto.render = function render() {
    var open = this.props.open;
    open = open === undefined ? this.toggleState : open;
    return _react.default.createElement(_DateTimePicker.default, _extends({}, this.props, {
      date: false,
      open: open ? 'time' : open,
      onToggle: this.handleToggle
    }));
  };

  return TimePicker;
}(_react.default.Component);

TimePicker.propTypes = propTypes;
var _default = TimePicker;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactLifecyclesCompat = __webpack_require__(7);

var _uncontrollable = _interopRequireDefault(__webpack_require__(14));

var _Widget = _interopRequireDefault(__webpack_require__(15));

var _WidgetPicker = _interopRequireDefault(__webpack_require__(22));

var _Select = _interopRequireDefault(__webpack_require__(23));

var _NumberInput = _interopRequireDefault(__webpack_require__(108));

var _Button = _interopRequireDefault(__webpack_require__(17));

var _messages = __webpack_require__(12);

var Props = _interopRequireWildcard(__webpack_require__(4));

var _focusManager = _interopRequireDefault(__webpack_require__(16));

var _interaction = __webpack_require__(10);

var _widgetHelpers = __webpack_require__(9);

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

var _localizers = __webpack_require__(5);

var _Icon = __webpack_require__(20);

var _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var format = function format(props) {
  return _localizers.number.getFormat('default', props.format);
}; // my tests in ie11/chrome/FF indicate that keyDown repeats
// at about 35ms+/- 5ms after an initial 500ms delay. callback fires on the leading edge


function createInterval(callback) {
  var _fn;

  var id,
      cancel = function cancel() {
    return clearTimeout(id);
  };

  id = setTimeout(_fn = function fn() {
    id = setTimeout(_fn, 35);
    callback(); //fire after everything in case the user cancels on the first call
  }, 500);
  return cancel;
}

function clamp(value, min, max) {
  max = max == null ? Infinity : max;
  min = min == null ? -Infinity : min;
  if (value == null || value === '') return null;
  return Math.max(Math.min(value, max), min);
}
/**
 * ---
 * localized: true
 * shortcuts:
 *   - { key: down arrow, label: decrement value }
 *   - { key: up arrow, label: increment value }
 *   - { key: home, label: set value to minimum value, if finite }
 *   - { key: end, label: set value to maximum value, if finite }
 * ---
 *
 * @public
 */


var NumberPicker = (0, _reactLifecyclesCompat.polyfill)(_class = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NumberPicker, _React$Component);

  function NumberPicker() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _initializerDefineProperty(_this, "handleMouseDown", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleMouseUp", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleKeyDown", _descriptor3, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.handleChange = function (rawValue, originalEvent) {
      if (originalEvent === void 0) {
        originalEvent = null;
      }

      var _this$props = _this.props,
          onChange = _this$props.onChange,
          lastValue = _this$props.value,
          min = _this$props.min,
          max = _this$props.max;
      var nextValue = clamp(rawValue, min, max);
      if (lastValue !== nextValue) (0, _widgetHelpers.notify)(onChange, [nextValue, {
        rawValue: rawValue,
        lastValue: lastValue,
        originalEvent: originalEvent
      }]);
    };

    _this.attachInputRef = function (ref) {
      _this.inputRef = ref;
    };

    _this.focusManager = (0, _focusManager.default)(_assertThisInitialized(_assertThisInitialized(_this)), {
      willHandle: function willHandle(focused) {
        if (focused) _this.focus();
      }
    });
    _this.state = {
      focused: false
    };
    return _this;
  }

  NumberPicker.getDerivedStateFromProps = function getDerivedStateFromProps(_ref) {
    var messages = _ref.messages;
    return {
      messages: (0, _messages.getMessages)(messages)
    };
  };

  var _proto = NumberPicker.prototype;

  _proto.renderInput = function renderInput(value) {
    var _this$props2 = this.props,
        placeholder = _this$props2.placeholder,
        autoFocus = _this$props2.autoFocus,
        tabIndex = _this$props2.tabIndex,
        parse = _this$props2.parse,
        name = _this$props2.name,
        onKeyPress = _this$props2.onKeyPress,
        onKeyUp = _this$props2.onKeyUp,
        min = _this$props2.min,
        max = _this$props2.max,
        disabled = _this$props2.disabled,
        readOnly = _this$props2.readOnly,
        inputProps = _this$props2.inputProps,
        format = _this$props2.format,
        culture = _this$props2.culture;
    return _react.default.createElement(_NumberInput.default, _extends({}, inputProps, {
      role: "spinbutton",
      tabIndex: tabIndex,
      value: value,
      placeholder: placeholder,
      autoFocus: autoFocus,
      editing: this.state.focused,
      format: format,
      culture: culture,
      parse: parse,
      name: name,
      min: min,
      max: max,
      disabled: disabled,
      readOnly: readOnly,
      onChange: this.handleChange,
      onKeyPress: onKeyPress,
      onKeyUp: onKeyUp,
      nodeRef: this.attachInputRef
    }));
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        className = _this$props3.className,
        containerClassName = _this$props3.containerClassName,
        disabled = _this$props3.disabled,
        readOnly = _this$props3.readOnly,
        value = _this$props3.value,
        min = _this$props3.min,
        max = _this$props3.max,
        incrementIcon = _this$props3.incrementIcon,
        decrementIcon = _this$props3.decrementIcon;
    var _this$state = this.state,
        focused = _this$state.focused,
        messages = _this$state.messages;
    var elementProps = Props.pickElementProps(this);
    value = clamp(value, min, max);
    return _react.default.createElement(_Widget.default, _extends({}, elementProps, {
      focused: focused,
      disabled: disabled,
      readOnly: readOnly,
      onKeyDown: this.handleKeyDown,
      onBlur: this.focusManager.handleBlur,
      onFocus: this.focusManager.handleFocus,
      className: (0, _classnames.default)(className, 'rw-number-picker')
    }), _react.default.createElement(_WidgetPicker.default, {
      className: containerClassName
    }, this.renderInput(value), _react.default.createElement(_Select.default, {
      bordered: true
    }, _react.default.createElement(_Button.default, {
      icon: incrementIcon,
      onClick: this.handleFocus,
      disabled: value === max || disabled,
      label: messages.increment({
        value: value,
        min: min,
        max: max
      }),
      onMouseUp: function onMouseUp(e) {
        return _this2.handleMouseUp('UP', e);
      },
      onMouseDown: function onMouseDown(e) {
        return _this2.handleMouseDown('UP', e);
      },
      onMouseLeave: function onMouseLeave(e) {
        return _this2.handleMouseUp('UP', e);
      }
    }), _react.default.createElement(_Button.default, {
      icon: decrementIcon,
      onClick: this.handleFocus,
      disabled: value === min || disabled,
      label: messages.decrement({
        value: value,
        min: min,
        max: max
      }),
      onMouseUp: function onMouseUp(e) {
        return _this2.handleMouseUp('DOWN', e);
      },
      onMouseDown: function onMouseDown(e) {
        return _this2.handleMouseDown('DOWN', e);
      },
      onMouseLeave: function onMouseLeave(e) {
        return _this2.handleMouseUp('DOWN', e);
      }
    }))));
  };

  _proto.focus = function focus() {
    this.inputRef.focus();
  };

  _proto.increment = function increment(event) {
    return this.step(this.props.step, event);
  };

  _proto.decrement = function decrement(event) {
    return this.step(-this.props.step, event);
  };

  _proto.step = function step(amount, event) {
    var value = (this.props.value || 0) + amount;
    var decimals = this.props.precision != null ? this.props.precision : _localizers.number.precision(format(this.props));
    this.handleChange(decimals != null ? round(value, decimals) : value, event);
    return value;
  };

  return NumberPicker;
}(_react.default.Component), _class3.propTypes = {
  value: _propTypes.default.number,

  /**
   * @example ['onChangePicker', [ [1, null] ]]
   */
  onChange: _propTypes.default.func,

  /**
   * The minimum number that the NumberPicker value.
   * @example ['prop', ['min', 0]]
   */
  min: _propTypes.default.number,

  /**
   * The maximum number that the NumberPicker value.
   *
   * @example ['prop', ['max', 0]]
   */
  max: _propTypes.default.number,

  /**
   * Amount to increase or decrease value when using the spinner buttons.
   *
   * @example ['prop', ['step', 5]]
   */
  step: _propTypes.default.number,

  /**
   * Specify how precise the `value` should be when typing, incrementing, or decrementing the value.
   * When empty, precision is parsed from the current `format` and culture.
   */
  precision: _propTypes.default.number,
  culture: _propTypes.default.string,

  /**
   * A format string used to display the number value. Localizer dependent, read [localization](../localization) for more info.
   *
   * @example ['prop', { max: 1, min: -1 , defaultValue: 0.2585, format: "{ style: 'percent' }" }]
   */
  format: CustomPropTypes.numberFormat,

  /**
   * Determines how the NumberPicker parses a number from the localized string representation.
   * You can also provide a parser `function` to pair with a custom `format`.
   */
  parse: _propTypes.default.func,
  incrementIcon: _propTypes.default.node,
  decrementIcon: _propTypes.default.node,

  /** @ignore */
  tabIndex: _propTypes.default.any,
  name: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  onKeyDown: _propTypes.default.func,
  onKeyPress: _propTypes.default.func,
  onKeyUp: _propTypes.default.func,
  autoFocus: _propTypes.default.bool,

  /**
   * @example ['disabled', ['1']]
   */
  disabled: CustomPropTypes.disabled,

  /**
   * @example ['readOnly', ['1.5']]
   */
  readOnly: CustomPropTypes.disabled,

  /** Adds a css class to the input container element. */
  containerClassName: _propTypes.default.string,
  inputProps: _propTypes.default.object,
  isRtl: _propTypes.default.bool,
  messages: _propTypes.default.shape({
    increment: _propTypes.default.string,
    decrement: _propTypes.default.string
  })
}, _class3.defaultProps = {
  value: null,
  open: false,
  incrementIcon: _Icon.caretUp,
  decrementIcon: _Icon.caretDown,
  min: -Infinity,
  max: Infinity,
  step: 1
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "handleMouseDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (direction, event) {
      var _this3$props = _this3.props,
          min = _this3$props.min,
          max = _this3$props.max;
      event && event.persist();
      var method = direction === 'UP' ? _this3.increment : _this3.decrement;
      var value = method.call(_this3, event),
          atTop = direction === 'UP' && value === max,
          atBottom = direction === 'DOWN' && value === min;
      if (atTop || atBottom) _this3.handleMouseUp();else if (!_this3._cancelRepeater) {
        _this3._cancelRepeater = createInterval(function () {
          _this3.handleMouseDown(direction, event);
        });
      }
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handleMouseUp", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      _this4._cancelRepeater && _this4._cancelRepeater();
      _this4._cancelRepeater = null;
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (event) {
      var _this5$props = _this5.props,
          min = _this5$props.min,
          max = _this5$props.max,
          onKeyDown = _this5$props.onKeyDown;
      var key = event.key;
      (0, _widgetHelpers.notify)(onKeyDown, [event]);
      if (event.defaultPrevented) return;
      if (key === 'End' && isFinite(max)) _this5.handleChange(max, event);else if (key === 'Home' && isFinite(min)) _this5.handleChange(min, event);else if (key === 'ArrowDown') {
        event.preventDefault();

        _this5.decrement(event);
      } else if (key === 'ArrowUp') {
        event.preventDefault();

        _this5.increment(event);
      }
    };
  }
})), _class2)) || _class;

var _default = (0, _uncontrollable.default)(NumberPicker, {
  value: 'onChange'
}, ['focus']); // thank you kendo ui core
// https://github.com/telerik/kendo-ui-core/blob/master/src/kendo.core.js#L1036


exports.default = _default;

function round(value, precision) {
  precision = precision || 0;
  value = ('' + value).split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? +value[1] + precision : precision)));
  value = ('' + value).split('e');
  value = +(value[0] + 'e' + (value[1] ? +value[1] - precision : -precision));
  return value.toFixed(precision);
}

module.exports = exports["default"];

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _inDOM = _interopRequireDefault(__webpack_require__(11));

var _activeElement = _interopRequireDefault(__webpack_require__(27));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactDom = __webpack_require__(6);

var _reactLifecyclesCompat = __webpack_require__(7);

var _Input = _interopRequireDefault(__webpack_require__(39));

var Props = _interopRequireWildcard(__webpack_require__(4));

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

var _localizers = __webpack_require__(5);

var _class, _class2, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var getFormat = function getFormat(props) {
  return _localizers.number.getFormat('default', props.format);
};

var isSign = function isSign(val) {
  return (val || '').trim() === '-';
};

function isPaddedZeros(str, culture) {
  var localeChar = _localizers.number.decimalChar(null, culture);

  var _str$split = str.split(localeChar),
      _ = _str$split[0],
      decimals = _str$split[1];

  return !!(decimals && decimals.match(/0+$/));
}

function isAtDelimiter(num, str, culture) {
  var localeChar = _localizers.number.decimalChar(null, culture),
      lastIndex = str.length - 1,
      char;

  if (str.length < 1) return false;
  char = str[lastIndex];
  return !!(char === localeChar && str.indexOf(char) === lastIndex);
}

var NumberPickerInput = (0, _reactLifecyclesCompat.polyfill)(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NumberPickerInput, _React$Component);

  function NumberPickerInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {};

    _this.handleBlur = function (event) {
      var str = _this.state.stringValue,
          number = _this.parseNumber(str); // if number is below the min
      // we need to flush low values and decimal stops, onBlur means i'm done inputing


      if (_this.isIntermediateValue(number, str)) {
        if (isNaN(number)) {
          number = null;
        }

        _this.props.onChange(number, event);
      }
    };

    _this.handleChange = function (event) {
      var _this$props = _this.props,
          value = _this$props.value,
          onChange = _this$props.onChange;

      var stringValue = event.target.value,
          numberValue = _this.parseNumber(stringValue);

      var isIntermediate = _this.isIntermediateValue(numberValue, stringValue);

      if (stringValue == null || stringValue.trim() === '') {
        _this.setStringValue('');

        onChange(null, event);
        return;
      } // order here matters a lot


      if (isIntermediate) {
        _this.setStringValue(stringValue);
      } else if (numberValue !== value) {
        onChange(numberValue, event);
      } else if (stringValue != _this.state.stringValue) {
        _this.setStringValue(stringValue);
      }
    };

    return _this;
  }

  var _proto = NumberPickerInput.prototype;

  _proto.getSnapshotBeforeUpdate = function getSnapshotBeforeUpdate(_ref) {
    var editing = _ref.editing;
    return {
      reselectText: !editing && this.props.editing && this.isSelectingAllText()
    };
  };

  NumberPickerInput.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        culture = nextProps.culture,
        editing = nextProps.editing;

    var decimal = _localizers.number.decimalChar(null, culture);

    var format = getFormat(nextProps);
    if (value == null || isNaN(value)) value = '';else value = editing ? ('' + value).replace('.', decimal) : _localizers.number.format(value, format, culture);
    var stringValue = '' + value;
    if (prevState.lastValueFromProps !== stringValue) return {
      stringValue: stringValue,
      lastValueFromProps: stringValue
    };
    return null;
  };

  _proto.componentDidUpdate = function componentDidUpdate(_, __, _ref2) {
    var reselectText = _ref2.reselectText;
    if (reselectText) (0, _reactDom.findDOMNode)(this).select();
  }; // this intermediate state is for when one runs into
  // the decimal or are typing the number


  _proto.setStringValue = function setStringValue(stringValue) {
    this.setState({
      stringValue: stringValue
    });
  };

  _proto.isIntermediateValue = function isIntermediateValue(num, str) {
    var _this$props2 = this.props,
        culture = _this$props2.culture,
        min = _this$props2.min;
    return !!(num < min || isSign(str) || isAtDelimiter(num, str, culture) || isPaddedZeros(str, culture));
  };

  _proto.isSelectingAllText = function isSelectingAllText() {
    var node = _inDOM.default && (0, _reactDom.findDOMNode)(this);
    return _inDOM.default && (0, _activeElement.default)() === node && node.selectionStart === 0 && node.selectionEnd === node.value.length;
  };

  _proto.parseNumber = function parseNumber(strVal) {
    var _this$props3 = this.props,
        culture = _this$props3.culture,
        userParse = _this$props3.parse;

    var delimChar = _localizers.number.decimalChar(null, culture);

    if (userParse) return userParse(strVal, culture);
    strVal = strVal.replace(delimChar, '.');
    strVal = parseFloat(strVal);
    return strVal;
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        disabled = _this$props4.disabled,
        readOnly = _this$props4.readOnly,
        placeholder = _this$props4.placeholder,
        min = _this$props4.min,
        max = _this$props4.max;
    var value = this.state.stringValue;
    var props = Props.omitOwn(this);
    return _react.default.createElement(_Input.default, _extends({}, props, {
      className: "rw-widget-input",
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      "aria-valuenow": value,
      "aria-valuemin": isFinite(min) ? min : null,
      "aria-valuemax": isFinite(max) ? max : null,
      disabled: disabled,
      readOnly: readOnly,
      placeholder: placeholder,
      value: value
    }));
  };

  return NumberPickerInput;
}(_react.default.Component), _class2.defaultProps = {
  value: null,
  editing: false
}, _class2.propTypes = {
  value: _propTypes.default.number,
  editing: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  format: CustomPropTypes.numberFormat,
  parse: _propTypes.default.func,
  culture: _propTypes.default.string,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled,
  onChange: _propTypes.default.func.isRequired
}, _temp)) || _class;

var _default = NumberPickerInput;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _closest = _interopRequireDefault(__webpack_require__(110));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactLifecyclesCompat = __webpack_require__(7);

var _uncontrollable = _interopRequireDefault(__webpack_require__(14));

var _Widget = _interopRequireDefault(__webpack_require__(15));

var _WidgetPicker = _interopRequireDefault(__webpack_require__(22));

var _Select = _interopRequireDefault(__webpack_require__(23));

var _Popup = _interopRequireDefault(__webpack_require__(29));

var _MultiselectInput = _interopRequireDefault(__webpack_require__(111));

var _MultiselectTagList = _interopRequireDefault(__webpack_require__(112));

var _List = _interopRequireDefault(__webpack_require__(24));

var _AddToListOption = _interopRequireDefault(__webpack_require__(55));

var _ = __webpack_require__(8);

var Filter = _interopRequireWildcard(__webpack_require__(32));

var Props = _interopRequireWildcard(__webpack_require__(4));

var _messages = __webpack_require__(12);

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

var _reduceToListState = _interopRequireWildcard(__webpack_require__(18));

var _getAccessors = _interopRequireDefault(__webpack_require__(33));

var _focusManager = _interopRequireDefault(__webpack_require__(16));

var _scrollManager = _interopRequireDefault(__webpack_require__(25));

var _interaction = __webpack_require__(10);

var _widgetHelpers = __webpack_require__(9);

var _Icon = __webpack_require__(20);

var _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var CREATE_OPTION = {};
var ENTER = 13;
var INSERT = 'insert';
var REMOVE = 'remove';

var propTypes = _extends({}, Filter.propTypes, {
  data: _propTypes.default.array,
  //-- controlled props --
  value: _propTypes.default.array,

  /**
   * @type {function (
   *  dataItems: ?any[],
   *  metadata: {
   *    dataItem: any,
   *    action: 'insert' | 'remove',
   *    originalEvent: SyntheticEvent,
   *    lastValue: ?any[],
   *    searchTerm: ?string
   *  }
   * ): void}
   */
  onChange: _propTypes.default.func,
  searchTerm: _propTypes.default.string,

  /**
   * @type {function (
   *  searchTerm: ?string,
   *  metadata: {
   *    action: 'clear' | 'input',
   *    lastSearchTerm: ?string,
   *    originalEvent: SyntheticEvent,
   *  }
   * ): void}
   */
  onSearch: _propTypes.default.func,
  open: _propTypes.default.bool,
  onToggle: _propTypes.default.func,
  //-------------------------------------------
  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  tagComponent: CustomPropTypes.elementType,
  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,
  allowCreate: _propTypes.default.oneOf([true, false, 'onFilter']),

  /**
   *
   * @type { (dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void }
   */
  onSelect: _propTypes.default.func,

  /**
   * @type { (searchTerm: string) => void }
   */
  onCreate: _propTypes.default.func,
  busy: _propTypes.default.bool,

  /** Specify the element used to render the select (down arrow) icon. */
  selectIcon: _propTypes.default.node,

  /** Specify the element used to render the busy indicator */
  busySpinner: _propTypes.default.node,
  dropUp: _propTypes.default.bool,
  popupTransition: CustomPropTypes.elementType,

  /** Adds a css class to the input container element. */
  containerClassName: _propTypes.default.string,
  inputProps: _propTypes.default.object,
  listProps: _propTypes.default.object,
  autoFocus: _propTypes.default.bool,
  placeholder: _propTypes.default.string,

  /** Continue to show the input placeholder even if tags are selected */
  showPlaceholderWithValues: _propTypes.default.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,
  isRtl: _propTypes.default.bool,
  messages: _propTypes.default.shape({
    open: CustomPropTypes.message,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
    createOption: CustomPropTypes.message,
    tagsLabel: CustomPropTypes.message,
    selectedItems: CustomPropTypes.message,
    noneSelected: CustomPropTypes.message,
    removeLabel: CustomPropTypes.message
  })
  /**
   * ---
   * shortcuts:
   *   - { key: left arrow, label: move focus to previous tag }
   *   - { key: right arrow, label: move focus to next tag }
   *   - { key: delete, deselect focused tag }
   *   - { key: backspace, deselect next tag }
   *   - { key: alt + up arrow, label: close Multiselect }
   *   - { key: down arrow, label: open Multiselect, and move focus to next item }
   *   - { key: up arrow, label: move focus to previous item }
   *   - { key: home, label: move focus to first item }
   *   - { key: end, label: move focus to last item }
   *   - { key: enter, label: select focused item }
   *   - { key: ctrl + enter, label: create new tag from current searchTerm }
   *   - { key: any key, label: search list for item starting with key }
   * ---
   *
   * A select listbox alternative.
   *
   * @public
   */

});

var Multiselect = (0, _reactLifecyclesCompat.polyfill)(_class = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Multiselect, _React$Component);

  function Multiselect() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleFocusDidChange = function (focused) {
      if (focused) return _this.focus();

      _this.close();

      _this.clearSearch();

      if (_this.tagsRef) _this.setState({
        focusedTag: null
      });
    };

    _this.handleDelete = function (dataItem, event) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          readOnly = _this$props.readOnly;
      if (disabled == true || readOnly) return;

      _this.focus();

      _this.change(dataItem, event, REMOVE);
    };

    _this.handleSearchKeyDown = function (e) {
      if (e.key === 'Backspace' && e.target.value && !_this._deletingText) _this._deletingText = true;
    };

    _this.handleSearchKeyUp = function (e) {
      if (e.key === 'Backspace' && _this._deletingText) _this._deletingText = false;
    };

    _this.handleInputChange = function (e) {
      _this.search(e.target.value, e, 'input');

      _this.open();
    };

    _initializerDefineProperty(_this, "handleClick", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleDoubleClick", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleSelect", _descriptor3, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleCreate", _descriptor4, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleKeyDown", _descriptor5, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.attachListRef = function (ref) {
      return _this.listRef = ref;
    };

    _this.attachTagsRef = function (ref) {
      return _this.tagsRef = ref;
    };

    _this.attachInputRef = function (ref) {
      return _this.inputRef = ref;
    };

    _this.inputId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_input');
    _this.tagsId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_taglist');
    _this.notifyId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_notify_area');
    _this.listId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox');
    _this.createId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_createlist_option');
    _this.activeTagId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_taglist_active_tag');
    _this.activeOptionId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox_active_option');
    _this.handleScroll = (0, _scrollManager.default)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusManager = (0, _focusManager.default)(_assertThisInitialized(_assertThisInitialized(_this)), {
      didHandle: _this.handleFocusDidChange
    });
    _this.state = {
      focusedTag: null
    };
    return _this;
  }

  Multiselect.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var data = nextProps.data,
        searchTerm = nextProps.searchTerm,
        messages = nextProps.messages,
        minLength = nextProps.minLength,
        caseSensitive = nextProps.caseSensitive,
        filter = nextProps.filter;
    var focusedItem = prevState.focusedItem,
        focusedTag = prevState.focusedTag;
    var accessors = (0, _getAccessors.default)(nextProps);
    var valueChanged = nextProps.value !== prevState.lastValue;
    var values = (0, _.makeArray)(nextProps.value);
    var dataItems = valueChanged ? values.map(function (item) {
      return accessors.findOrSelf(data, item);
    }) : prevState.dataItems;
    data = data.filter(function (i) {
      return !values.some(function (v) {
        return accessors.matches(i, v);
      });
    });
    var lengthWithoutValues = data.length;
    data = Filter.filter(data, {
      filter: filter,
      searchTerm: searchTerm,
      minLength: minLength,
      caseSensitive: caseSensitive,
      textField: accessors.text
    });
    var list = (0, _reduceToListState.default)(data, prevState.list, {
      nextProps: nextProps
    });
    var tagList = (0, _reduceToListState.default)(dataItems, prevState.tagList, {
      nextProps: nextProps,
      getDataState: _reduceToListState.defaultGetDataState
    });
    var nextFocusedItem = ~data.indexOf(focusedItem) ? focusedItem : data[0];
    return {
      data: data,
      dataItems: dataItems,
      list: list,
      tagList: tagList,
      accessors: accessors,
      lengthWithoutValues: lengthWithoutValues,
      lastValue: nextProps.value,
      messages: (0, _messages.getMessages)(messages),
      focusedTag: valueChanged ? list.nextEnabled(~dataItems.indexOf(focusedTag) ? focusedTag : null) : focusedTag,
      focusedItem: valueChanged || !prevState.focusedItem ? list.nextEnabled(nextFocusedItem) : nextFocusedItem
    };
  };

  var _proto = Multiselect.prototype;

  _proto.renderInput = function renderInput(ownedIds) {
    var _this$props2 = this.props,
        searchTerm = _this$props2.searchTerm,
        maxLength = _this$props2.maxLength,
        tabIndex = _this$props2.tabIndex,
        busy = _this$props2.busy,
        autoFocus = _this$props2.autoFocus,
        inputProps = _this$props2.inputProps,
        open = _this$props2.open;
    var _this$state = this.state,
        focusedItem = _this$state.focusedItem,
        focusedTag = _this$state.focusedTag;
    var disabled = this.props.disabled === true;
    var readOnly = this.props.readOnly === true;
    var active;
    if (!open) active = focusedTag ? this.activeTagId : '';else if (focusedItem || this.allowCreate()) active = this.activeOptionId;
    return _react.default.createElement(_MultiselectInput.default, _extends({}, inputProps, {
      autoFocus: autoFocus,
      tabIndex: tabIndex || 0,
      role: "listbox",
      "aria-expanded": !!open,
      "aria-busy": !!busy,
      "aria-owns": ownedIds,
      "aria-haspopup": true,
      "aria-activedescendant": active || null,
      value: searchTerm,
      maxLength: maxLength,
      disabled: disabled,
      readOnly: readOnly,
      placeholder: this.getPlaceholder(),
      onKeyDown: this.handleSearchKeyDown,
      onKeyUp: this.handleSearchKeyUp,
      onChange: this.handleInputChange,
      ref: this.attachInputRef
    }));
  };

  _proto.renderList = function renderList() {
    var inputId = this.inputId,
        activeOptionId = this.activeOptionId,
        listId = this.listId;
    var _this$props3 = this.props,
        open = _this$props3.open,
        searchTerm = _this$props3.searchTerm,
        optionComponent = _this$props3.optionComponent,
        itemComponent = _this$props3.itemComponent,
        groupComponent = _this$props3.groupComponent,
        listProps = _this$props3.listProps;
    var _this$state2 = this.state,
        focusedItem = _this$state2.focusedItem,
        list = _this$state2.list,
        lengthWithoutValues = _this$state2.lengthWithoutValues,
        accessors = _this$state2.accessors,
        data = _this$state2.data,
        messages = _this$state2.messages;
    var List = this.props.listComponent;
    return _react.default.createElement(List, _extends({}, listProps, {
      id: listId,
      activeId: activeOptionId,
      data: data,
      dataState: list.dataState,
      isDisabled: list.isDisabled,
      searchTerm: searchTerm,
      textAccessor: accessors.text,
      valueAccessor: accessors.value,
      itemComponent: itemComponent,
      groupComponent: groupComponent,
      optionComponent: optionComponent,
      focusedItem: focusedItem,
      onSelect: this.handleSelect,
      onMove: this.handleScroll,
      "aria-live": "polite",
      "aria-labelledby": inputId,
      "aria-hidden": !open,
      ref: this.attachListRef,
      messages: {
        emptyList: lengthWithoutValues ? messages.emptyFilter : messages.emptyList
      }
    }));
  };

  _proto.renderNotificationArea = function renderNotificationArea() {
    var _this$state3 = this.state,
        focused = _this$state3.focused,
        dataItems = _this$state3.dataItems,
        accessors = _this$state3.accessors,
        messages = _this$state3.messages;
    var itemLabels = dataItems.map(function (item) {
      return accessors.text(item);
    });
    return _react.default.createElement("span", {
      id: this.notifyId,
      role: "status",
      className: "rw-sr",
      "aria-live": "assertive",
      "aria-atomic": "true",
      "aria-relevant": "additions removals text"
    }, focused && (dataItems.length ? messages.selectedItems(itemLabels) : messages.noneSelected()));
  };

  _proto.renderTags = function renderTags() {
    var _this$props4 = this.props,
        readOnly = _this$props4.readOnly,
        disabled = _this$props4.disabled;
    var _this$state4 = this.state,
        focusedTag = _this$state4.focusedTag,
        dataItems = _this$state4.dataItems,
        accessors = _this$state4.accessors,
        messages = _this$state4.messages;
    var Component = this.props.tagComponent;
    return _react.default.createElement(_MultiselectTagList.default, {
      id: this.tagsId,
      activeId: this.activeTagId,
      textAccessor: accessors.text,
      valueAccessor: accessors.value,
      label: messages.tagsLabel(),
      value: dataItems,
      readOnly: readOnly,
      disabled: disabled,
      focusedItem: focusedTag,
      onDelete: this.handleDelete,
      valueComponent: Component,
      ref: this.attachTagsRef
    });
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props5 = this.props,
        className = _this$props5.className,
        busy = _this$props5.busy,
        dropUp = _this$props5.dropUp,
        open = _this$props5.open,
        searchTerm = _this$props5.searchTerm,
        selectIcon = _this$props5.selectIcon,
        busySpinner = _this$props5.busySpinner,
        containerClassName = _this$props5.containerClassName,
        popupTransition = _this$props5.popupTransition;
    var _this$state5 = this.state,
        focused = _this$state5.focused,
        focusedItem = _this$state5.focusedItem,
        dataItems = _this$state5.dataItems,
        messages = _this$state5.messages;
    var elementProps = Props.pickElementProps(this);
    var shouldRenderTags = !!dataItems.length,
        shouldRenderPopup = (0, _widgetHelpers.isFirstFocusedRender)(this),
        allowCreate = this.allowCreate();
    var inputOwns = this.listId + " " + this.notifyId + " " + (shouldRenderTags ? this.tagsId : '') + (allowCreate ? this.createId : '');
    var disabled = this.props.disabled === true;
    var readOnly = this.props.readOnly === true;
    return _react.default.createElement(_Widget.default, _extends({}, elementProps, {
      open: open,
      dropUp: dropUp,
      focused: focused,
      disabled: disabled,
      readOnly: readOnly,
      onKeyDown: this.handleKeyDown,
      onBlur: this.focusManager.handleBlur,
      onFocus: this.focusManager.handleFocus,
      className: (0, _classnames.default)(className, 'rw-multiselect')
    }), this.renderNotificationArea(messages), _react.default.createElement(_WidgetPicker.default, {
      onClick: this.handleClick,
      onTouchEnd: this.handleClick,
      onDoubleClick: this.handleDoubleClick,
      className: (0, _classnames.default)(containerClassName, 'rw-widget-input')
    }, _react.default.createElement("div", null, shouldRenderTags && this.renderTags(messages), this.renderInput(inputOwns)), _react.default.createElement(_Select.default, {
      busy: busy,
      spinner: busySpinner,
      icon: focused ? selectIcon : null,
      "aria-hidden": "true",
      role: "presentational",
      disabled: disabled || readOnly
    })), shouldRenderPopup && _react.default.createElement(_Popup.default, {
      dropUp: dropUp,
      open: open,
      transition: popupTransition,
      onEntering: function onEntering() {
        return _this2.listRef.forceUpdate();
      }
    }, _react.default.createElement("div", null, this.renderList(), allowCreate && _react.default.createElement(_AddToListOption.default, {
      id: this.createId,
      searchTerm: searchTerm,
      onSelect: this.handleCreate,
      focused: !focusedItem || focusedItem === CREATE_OPTION
    }, messages.createOption(this.props)))));
  };

  _proto.change = function change(dataItem, originalEvent, action) {
    var _this$props6 = this.props,
        onChange = _this$props6.onChange,
        searchTerm = _this$props6.searchTerm,
        lastValue = _this$props6.value;
    var dataItems = this.state.dataItems;

    switch (action) {
      case INSERT:
        dataItems = dataItems.concat(dataItem);
        break;

      case REMOVE:
        dataItems = dataItems.filter(function (d) {
          return d !== dataItem;
        });
        break;
    }

    (0, _widgetHelpers.notify)(onChange, [dataItems, {
      action: action,
      dataItem: dataItem,
      originalEvent: originalEvent,
      lastValue: lastValue,
      searchTerm: searchTerm
    }]);
    this.clearSearch(originalEvent);
  };

  _proto.clearSearch = function clearSearch(originalEvent) {
    this.search('', originalEvent, 'clear');
  };

  _proto.search = function search(searchTerm, originalEvent, action) {
    if (action === void 0) {
      action = 'input';
    }

    var _this$props7 = this.props,
        onSearch = _this$props7.onSearch,
        lastSearchTerm = _this$props7.searchTerm;
    if (searchTerm !== lastSearchTerm) (0, _widgetHelpers.notify)(onSearch, [searchTerm, {
      action: action,
      lastSearchTerm: lastSearchTerm,
      originalEvent: originalEvent
    }]);
  };

  _proto.focus = function focus() {
    if (this.inputRef) this.inputRef.focus();
  };

  _proto.toggle = function toggle() {
    this.props.open ? this.close() : this.open();
  };

  _proto.open = function open() {
    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
  };

  _proto.close = function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  _proto.allowCreate = function allowCreate() {
    var _this$props8 = this.props,
        searchTerm = _this$props8.searchTerm,
        onCreate = _this$props8.onCreate,
        allowCreate = _this$props8.allowCreate;
    return !!(onCreate && (allowCreate === true || allowCreate === 'onFilter' && searchTerm) && !this.hasExtactMatch());
  };

  _proto.hasExtactMatch = function hasExtactMatch() {
    var _this$props9 = this.props,
        searchTerm = _this$props9.searchTerm,
        caseSensitive = _this$props9.caseSensitive;
    var _this$state6 = this.state,
        data = _this$state6.data,
        dataItems = _this$state6.dataItems,
        accessors = _this$state6.accessors;

    var lower = function lower(text) {
      return caseSensitive ? text : text.toLowerCase();
    };

    var eq = function eq(v) {
      return lower(accessors.text(v)) === lower(searchTerm);
    }; // if there is an exact match on textFields:
    // "john" => { name: "john" }, don't show


    return dataItems.some(eq) || data.some(eq);
  };

  _proto.getPlaceholder = function getPlaceholder() {
    var _this$props10 = this.props,
        value = _this$props10.value,
        placeholder = _this$props10.placeholder,
        showPlaceholderWithValues = _this$props10.showPlaceholderWithValues;
    return (value && value.length && !showPlaceholderWithValues ? '' : placeholder) || '';
  };

  return Multiselect;
}(_react.default.Component), _class3.propTypes = propTypes, _class3.defaultProps = {
  data: [],
  allowCreate: 'onFilter',
  filter: 'startsWith',
  value: [],
  searchTerm: '',
  selectIcon: _Icon.caretDown,
  listComponent: _List.default,
  showPlaceholderWithValues: false
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "handleClick", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (_ref) {
      var target = _ref.target;

      _this3.focus();

      if ((0, _closest.default)(target, '.rw-select')) _this3.toggle();else _this3.open();
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handleDoubleClick", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      if (!_this4.inputRef) return;

      _this4.focus();

      _this4.inputRef.select();
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "handleSelect", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (dataItem, originalEvent) {
      if (dataItem === undefined || dataItem === CREATE_OPTION) {
        _this5.handleCreate(_this5.props.searchTerm, originalEvent);

        return;
      }

      (0, _widgetHelpers.notify)(_this5.props.onSelect, [dataItem, {
        originalEvent: originalEvent
      }]);

      _this5.change(dataItem, originalEvent, INSERT);

      _this5.focus();
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "handleCreate", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (searchTerm, event) {
      if (searchTerm === void 0) {
        searchTerm = '';
      }

      (0, _widgetHelpers.notify)(_this6.props.onCreate, searchTerm);

      _this6.clearSearch(event);

      _this6.focus();
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (event) {
      var _this7$props = _this7.props,
          open = _this7$props.open,
          searchTerm = _this7$props.searchTerm,
          onKeyDown = _this7$props.onKeyDown;
      var key = event.key,
          keyCode = event.keyCode,
          altKey = event.altKey,
          ctrlKey = event.ctrlKey;
      var _this7$state = _this7.state,
          focusedTag = _this7$state.focusedTag,
          focusedItem = _this7$state.focusedItem,
          list = _this7$state.list,
          tagList = _this7$state.tagList;
      var createIsFocused = focusedItem === CREATE_OPTION;

      var canCreate = _this7.allowCreate();

      var focusTag = function focusTag(tag) {
        return _this7.setState({
          focusedTag: tag
        });
      };

      var focusItem = function focusItem(item) {
        return _this7.setState({
          focusedItem: item,
          focusedTag: null
        });
      };

      (0, _widgetHelpers.notify)(onKeyDown, [event]);
      if (event.defaultPrevented) return;

      if (key === 'ArrowDown') {
        event.preventDefault();
        if (!open) return _this7.open();
        var next = list.next(focusedItem);
        var creating = createIsFocused || canCreate && focusedItem === next;
        focusItem(creating ? CREATE_OPTION : next);
      } else if (key === 'ArrowUp' && (open || altKey)) {
        event.preventDefault();
        if (altKey) return _this7.close();
        focusItem(createIsFocused ? list.last() : list.prev(focusedItem));
      } else if (key === 'End') {
        event.preventDefault();
        if (open) focusItem(list.last());else focusTag(tagList.last());
      } else if (key === 'Home') {
        event.preventDefault();
        if (open) focusItem(list.first());else focusTag(tagList.first());
      } else if (open && keyCode === ENTER) {
        // using keyCode to ignore enter for japanese IME
        event.preventDefault();
        if (ctrlKey && canCreate) return _this7.handleCreate(searchTerm, event);

        _this7.handleSelect(focusedItem, event);
      } else if (key === 'Escape') {
        open ? _this7.close() : tagList && focusTag(null);
      } else if (!searchTerm && !_this7._deletingText) {
        if (key === 'ArrowLeft') {
          focusTag(tagList.prev(focusedTag) || tagList.last());
        } else if (key === 'ArrowRight' && focusedTag) {
          var nextTag = tagList.next(focusedTag);
          focusTag(nextTag === focusedTag ? null : nextTag);
        } else if (key === 'Delete' && !tagList.isDisabled(focusedTag)) {
          _this7.handleDelete(focusedTag, event);
        } else if (key === 'Backspace') {
          _this7.handleDelete(tagList.last(), event);
        } else if (key === ' ' && !open) {
          event.preventDefault();

          _this7.open();
        }
      }
    };
  }
})), _class2)) || _class;

var _default = (0, _uncontrollable.default)(Multiselect, {
  open: 'onToggle',
  value: 'onChange',
  searchTerm: 'onSearch'
}, ['focus']);

exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closest;

var _matches = __webpack_require__(56);

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDoc = function isDoc(obj) {
  return obj != null && obj.nodeType === obj.DOCUMENT_NODE;
};

function closest(node, selector, context) {
  while (node && (isDoc(node) || !(0, _matches2.default)(node, selector))) {
    node = node !== context && !isDoc(node) ? node.parentNode : undefined;
  }
  return node;
}
module.exports = exports['default'];

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _activeElement = _interopRequireDefault(__webpack_require__(27));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactDom = __webpack_require__(6);

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var MultiselectInput =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MultiselectInput, _React$Component);

  function MultiselectInput() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = MultiselectInput.prototype;

  _proto.focus = function focus() {
    var node = (0, _reactDom.findDOMNode)(this);
    if ((0, _activeElement.default)() === node) return;
    node.focus();
  };

  _proto.select = function select() {
    (0, _reactDom.findDOMNode)(this).select();
  };

  _proto.render = function render() {
    var _this$props = this.props,
        disabled = _this$props.disabled,
        readOnly = _this$props.readOnly,
        props = _objectWithoutProperties(_this$props, ["disabled", "readOnly"]);

    var size = Math.max((props.value || props.placeholder).length, 1) + 1;
    return _react.default.createElement("input", _extends({}, props, {
      size: size,
      className: "rw-input-reset",
      autoComplete: "off",
      "aria-disabled": disabled,
      "aria-readonly": readOnly,
      disabled: disabled,
      readOnly: readOnly
    }));
  };

  return MultiselectInput;
}(_react.default.Component);

MultiselectInput.propTypes = {
  value: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  maxLength: _propTypes.default.number,
  onChange: _propTypes.default.func.isRequired,
  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled
};
var _default = MultiselectInput;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _MultiselectTag = _interopRequireDefault(__webpack_require__(113));

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

var _dataHelpers = __webpack_require__(19);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

// disabled === true || [1, 2, 3, etc]
var isDisabled = function isDisabled(item, list, value) {
  return !!(Array.isArray(list) ? ~(0, _dataHelpers.dataIndexOf)(list, item, value) : list);
};

var MultiselectTagList =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MultiselectTagList, _React$Component);

  function MultiselectTagList() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = MultiselectTagList.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        id = _this$props.id,
        value = _this$props.value,
        activeId = _this$props.activeId,
        valueAccessor = _this$props.valueAccessor,
        textAccessor = _this$props.textAccessor,
        label = _this$props.label,
        disabled = _this$props.disabled,
        onDelete = _this$props.onDelete,
        focusedItem = _this$props.focusedItem,
        ValueComponent = _this$props.valueComponent;
    return _react.default.createElement("ul", {
      id: id,
      role: "listbox",
      "aria-label": label,
      className: "rw-multiselect-taglist"
    }, value.map(function (item, i) {
      var isFocused = focusedItem === item;
      return _react.default.createElement(_MultiselectTag.default, {
        key: i,
        id: isFocused ? activeId : null,
        value: item,
        focused: isFocused,
        onClick: onDelete,
        disabled: isDisabled(item, disabled, valueAccessor)
      }, ValueComponent ? _react.default.createElement(ValueComponent, {
        item: item
      }) : _react.default.createElement("span", null, textAccessor(item)));
    }));
  };

  return MultiselectTagList;
}(_react.default.Component);

MultiselectTagList.propTypes = {
  id: _propTypes.default.string.isRequired,
  activeId: _propTypes.default.string.isRequired,
  label: _propTypes.default.string,
  value: _propTypes.default.array,
  focusedItem: _propTypes.default.any,
  valueAccessor: _propTypes.default.func.isRequired,
  textAccessor: _propTypes.default.func.isRequired,
  onDelete: _propTypes.default.func.isRequired,
  valueComponent: _propTypes.default.func,
  disabled: CustomPropTypes.disabled.acceptsArray
};
var _default = MultiselectTagList;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _interaction = __webpack_require__(10);

var _Button = _interopRequireDefault(__webpack_require__(17));

var _class, _descriptor, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var MultiselectTag = (_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MultiselectTag, _React$Component);

  function MultiselectTag() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _initializerDefineProperty(_this, "onClick", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  var _proto = MultiselectTag.prototype;

  _proto.renderDelete = function renderDelete() {
    var _this$props = this.props,
        label = _this$props.label,
        disabled = _this$props.disabled,
        readOnly = _this$props.readOnly;
    return _react.default.createElement(_Button.default, {
      variant: "select",
      onClick: this.onClick,
      className: "rw-multiselect-tag-btn",
      disabled: disabled || readOnly,
      "aria-label": label || 'Remove item'
    }, _react.default.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"));
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        id = _this$props2.id,
        children = _this$props2.children,
        focused = _this$props2.focused,
        disabled = _this$props2.disabled;
    return _react.default.createElement("li", {
      id: id,
      role: "option",
      className: (0, _classnames.default)('rw-multiselect-tag', disabled && 'rw-state-disabled', focused && !disabled && 'rw-state-focus')
    }, children, _react.default.createElement("div", null, this.renderDelete()));
  };

  return MultiselectTag;
}(_react.default.Component), _class2.propTypes = {
  id: _propTypes.default.string,
  onClick: _propTypes.default.func.isRequired,
  focused: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  label: _propTypes.default.string,
  value: _propTypes.default.any
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "onClick", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (event) {
      var _this2$props = _this2.props,
          value = _this2$props.value,
          disabled = _this2$props.disabled,
          onClick = _this2$props.onClick;
      if (!disabled) onClick(value, event);
    };
  }
})), _class);
var _default = MultiselectTag;
exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactDom = __webpack_require__(6);

var _reactLifecyclesCompat = __webpack_require__(7);

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _classnames = _interopRequireDefault(__webpack_require__(2));

var _reactComponentManagers = __webpack_require__(21);

var _uncontrollable = _interopRequireDefault(__webpack_require__(14));

var _List = _interopRequireDefault(__webpack_require__(24));

var _Widget = _interopRequireDefault(__webpack_require__(15));

var _SelectListItem = _interopRequireDefault(__webpack_require__(115));

var _messages = __webpack_require__(12);

var _ = __webpack_require__(8);

var Props = _interopRequireWildcard(__webpack_require__(4));

var CustomPropTypes = _interopRequireWildcard(__webpack_require__(3));

var _reduceToListState = _interopRequireDefault(__webpack_require__(18));

var _getAccessors = _interopRequireDefault(__webpack_require__(33));

var _focusManager = _interopRequireDefault(__webpack_require__(16));

var _scrollManager = _interopRequireDefault(__webpack_require__(25));

var _interaction = __webpack_require__(10);

var _widgetHelpers = __webpack_require__(9);

var _class, _class2, _descriptor, _descriptor2, _class3, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var BusyMask = function BusyMask() {
  return _react.default.createElement("span", {
    className: "rw-loading-mask"
  });
};

function getFirstValue(data, values) {
  if (!values.length) return null;

  for (var idx = 0; idx < data.length; idx++) {
    if (~values.indexOf(data[idx])) return data[idx];
  }

  return null;
}
/**
 * ---
 * shortcuts:
 *   - { key: down arrow, label: move focus, or select previous option }
 *   - { key: up arrow, label: move focus, or select next option }
 *   - { key: home, label: move focus to first option }
 *   - { key: end, label: move focus to last option }
 *   - { key: spacebar, label: toggle focused option }
 *   - { key: ctrl + a, label: ctoggle select all/select none }
 *   - { key: any key, label: search list for option starting with key }
 * ---
 *
 * A group of radio buttons or checkboxes bound to a dataset.
 *
 * @public
 */


var SelectList = (0, _reactLifecyclesCompat.polyfill)(_class = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SelectList, _React$Component);

  function SelectList() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleMouseDown = function () {
      _this._clicking = true;
    };

    _this.handleFocusChanged = function (focused) {
      var _this$props = _this.props,
          data = _this$props.data,
          disabled = _this$props.disabled;
      var _this$state = _this.state,
          dataItems = _this$state.dataItems,
          accessors = _this$state.accessors,
          list = _this$state.list; // the rigamarole here is to avoid flicker went clicking an item and
      // gaining focus at the same time.

      if (focused !== _this.state.focused) {
        if (!focused) _this.setState({
          focusedItem: null
        });else if (focused && !_this._clicking) {
          var allowed = Array.isArray(disabled) ? dataItems.filter(function (v) {
            return !accessors.includes(disabled, v);
          }) : dataItems;

          _this.setState({
            focusedItem: getFirstValue(data, allowed) || list.nextEnabled(data[0])
          });
        }
        _this._clicking = false;
      }
    };

    _initializerDefineProperty(_this, "handleKeyDown", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "handleKeyPress", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.handleChange = function (item, checked, originalEvent) {
      var _this$props2 = _this.props,
          multiple = _this$props2.multiple,
          onChange = _this$props2.onChange;
      var lastValue = _this.state.dataItems;

      _this.setState({
        focusedItem: item
      });

      if (!multiple) return (0, _widgetHelpers.notify)(onChange, [checked ? item : null, {
        originalEvent: originalEvent,
        lastValue: lastValue,
        checked: checked
      }]);
      var nextValue = checked ? lastValue.concat(item) : lastValue.filter(function (v) {
        return v !== item;
      });
      (0, _widgetHelpers.notify)(onChange, [nextValue || [], {
        checked: checked,
        lastValue: lastValue,
        originalEvent: originalEvent,
        dataItem: item
      }]);
    };

    _this.attachListRef = function (ref) {
      return _this.listRef = ref;
    };

    _this.renderListItem = function (itemProps) {
      var _this$props3 = _this.props,
          name = _this$props3.name,
          multiple = _this$props3.multiple,
          disabled = _this$props3.disabled,
          readOnly = _this$props3.readOnly;
      var _this$state2 = _this.state,
          dataItems = _this$state2.dataItems,
          accessors = _this$state2.accessors;
      return _react.default.createElement(_SelectListItem.default, _extends({}, itemProps, {
        name: name || _this.itemName,
        type: multiple ? 'checkbox' : 'radio',
        readOnly: disabled === true || readOnly,
        onChange: _this.handleChange,
        onMouseDown: _this.handleMouseDown,
        checked: accessors.includes(dataItems, itemProps.dataItem)
      }));
    };

    (0, _reactComponentManagers.autoFocus)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.widgetId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_widget');
    _this.listId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox');
    _this.activeId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_listbox_active_option');
    _this.itemName = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_assertThisInitialized(_this)), '_name');
    _this.timeouts = (0, _reactComponentManagers.timeoutManager)(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleScroll = (0, _scrollManager.default)(_assertThisInitialized(_assertThisInitialized(_this)), false);
    _this.focusManager = (0, _focusManager.default)(_assertThisInitialized(_assertThisInitialized(_this)), {
      didHandle: _this.handleFocusChanged
    });
    _this.state = {};
    return _this;
  }

  SelectList.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        data = nextProps.data,
        messages = nextProps.messages;
    var accessors = (0, _getAccessors.default)(nextProps);
    var list = (0, _reduceToListState.default)(data, prevState.list, {
      nextProps: nextProps
    });
    return {
      list: list,
      accessors: accessors,
      messages: (0, _messages.getMessages)(messages),
      dataItems: (0, _.makeArray)(value).map(function (item) {
        return accessors.findOrSelf(data, item);
      })
    };
  };

  var _proto = SelectList.prototype;

  _proto.render = function render() {
    var _this$props4 = this.props,
        className = _this$props4.className,
        tabIndex = _this$props4.tabIndex,
        busy = _this$props4.busy,
        data = _this$props4.data,
        busySpinner = _this$props4.busySpinner,
        itemComponent = _this$props4.itemComponent,
        groupComponent = _this$props4.groupComponent,
        listProps = _this$props4.listProps;
    var elementProps = Props.pickElementProps(this);
    var _this$state3 = this.state,
        focusedItem = _this$state3.focusedItem,
        focused = _this$state3.focused,
        accessors = _this$state3.accessors,
        list = _this$state3.list,
        messages = _this$state3.messages;
    var List = this.props.listComponent;
    var disabled = this.props.disabled === true,
        readOnly = this.props.readOnly === true;
    focusedItem = focused && !disabled && !readOnly && focusedItem;
    return _react.default.createElement(_Widget.default, _extends({}, elementProps, {
      id: this.widgetId,
      onBlur: this.focusManager.handleBlur,
      onFocus: this.focusManager.handleFocus,
      onKeyDown: this.handleKeyDown,
      onKeyPress: this.handleKeyPress,
      focused: focused,
      disabled: disabled,
      readOnly: readOnly,
      role: "radiogroup",
      "aria-busy": !!busy,
      "aria-activedescendant": this.activeId,
      className: (0, _classnames.default)(className, 'rw-select-list', 'rw-widget-input', 'rw-widget-container')
    }), _react.default.createElement(List, _extends({}, listProps, {
      role: "radiogroup",
      tabIndex: tabIndex || '0',
      id: this.listId,
      activeId: this.activeId,
      data: data,
      dataState: list.dataState,
      isDisabled: list.isDisabled,
      textAccessor: accessors.text,
      valueAccessor: accessors.value,
      itemComponent: itemComponent,
      groupComponent: groupComponent,
      optionComponent: this.renderListItem,
      focusedItem: focusedItem,
      onMove: this.handleScroll,
      messages: {
        emptyList: messages.emptyList
      },
      ref: this.attachListRef
    })), busy && busySpinner);
  };

  _proto.focus = function focus() {
    (0, _reactDom.findDOMNode)(this.refs.list).focus();
  };

  _proto.selectAll = function selectAll() {
    var accessors = this.accessors;
    var _this$props5 = this.props,
        data = _this$props5.data,
        disabled = _this$props5.disabled,
        onChange = _this$props5.onChange;
    var values = this.state.dataItems;
    disabled = Array.isArray(disabled) ? disabled : [];
    var disabledValues;
    var enabledData = data;

    if (disabled.length) {
      disabledValues = values.filter(function (v) {
        return accessors.includes(disabled, v);
      });
      enabledData = data.filter(function (v) {
        return !accessors.includes(disabled, v);
      });
    }

    var nextValues = values.length >= enabledData.length ? values.filter(function (v) {
      return accessors.includes(disabled, v);
    }) : enabledData.concat(disabledValues);
    (0, _widgetHelpers.notify)(onChange, [nextValues]);
  };

  _proto.search = function search(character, originalEvent) {
    var _this2 = this;

    var _searchTerm = this._searchTerm,
        list = this.list;
    var word = ((_searchTerm || '') + character).toLowerCase();
    var multiple = this.props.multiple;
    if (!multiple) originalEvent.persist();
    if (!character) return;
    this._searchTerm = word;
    this.timeouts.set('search', function () {
      var focusedItem = list.next(_this2.state.focusedItem, word);
      _this2._searchTerm = '';

      if (focusedItem) {
        !multiple ? _this2.handleChange(focusedItem, true, originalEvent) : _this2.setState({
          focusedItem: focusedItem
        });
      }
    }, this.props.delay);
  };

  return SelectList;
}(_react.default.Component), _class3.propTypes = {
  data: _propTypes.default.array,
  value: _propTypes.default.oneOfType([_propTypes.default.any, _propTypes.default.array]),
  onChange: _propTypes.default.func,

  /**
   * A handler called when focus shifts on the SelectList. Internally this is used to ensure the focused item is in view.
   * If you want to define your own "scrollTo" behavior or just disable the default one specify an `onMove` handler.
   * The handler is called with the relevant DOM nodes needed to implement scroll behavior: the list element,
   * the element that is currently focused, and a focused value.
   *
   * @type {function(list: HTMLELement, focusedNode: HTMLElement, focusedItem: any)}
   */
  onMove: _propTypes.default.func,

  /**
   * Whether or not the SelectList allows multiple selection or not. when `false` the SelectList will
   * render as a list of radio buttons, and checkboxes when `true`.
   */
  multiple: _propTypes.default.bool,
  onKeyDown: _propTypes.default.func,
  onKeyPress: _propTypes.default.func,
  itemComponent: CustomPropTypes.elementType,
  busySpinner: _propTypes.default.node,
  listComponent: CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,
  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  busy: _propTypes.default.bool,
  delay: _propTypes.default.number,
  autoFocus: _propTypes.default.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,
  listProps: _propTypes.default.object,
  tabIndex: _propTypes.default.any,

  /**
   * The HTML `name` attribute used to group checkboxes and radio buttons
   * together.
   */
  name: _propTypes.default.string,
  isRtl: _propTypes.default.bool,
  messages: _propTypes.default.shape({
    emptyList: CustomPropTypes.message
  })
}, _class3.defaultProps = {
  delay: 250,
  value: [],
  data: [],
  busySpinner: _react.default.createElement(BusyMask, null),
  listComponent: _List.default
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "handleKeyDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (event) {
      var multiple = _this3.props.multiple;
      var _this3$state = _this3.state,
          dataItems = _this3$state.dataItems,
          focusedItem = _this3$state.focusedItem,
          list = _this3$state.list,
          accessors = _this3$state.accessors;
      var keyCode = event.keyCode,
          key = event.key,
          ctrlKey = event.ctrlKey;

      var change = function change(item) {
        if (!item) return;
        var checked = multiple ? !accessors.includes(dataItems, item) // toggle value
        : true;

        _this3.handleChange(item, checked, event);
      };

      (0, _widgetHelpers.notify)(_this3.props.onKeyDown, [event]);
      if (event.defaultPrevented) return;

      if (key === 'End') {
        event.preventDefault();
        focusedItem = list.last();

        _this3.setState({
          focusedItem: focusedItem
        });

        if (!multiple) change(focusedItem);
      } else if (key === 'Home') {
        event.preventDefault();
        focusedItem = list.first();

        _this3.setState({
          focusedItem: focusedItem
        });

        if (!multiple) change(focusedItem);
      } else if (key === 'Enter' || key === ' ') {
        event.preventDefault();
        change(focusedItem);
      } else if (key === 'ArrowDown' || key === 'ArrowRight') {
        event.preventDefault();
        focusedItem = list.next(focusedItem);

        _this3.setState({
          focusedItem: focusedItem
        });

        if (!multiple) change(focusedItem);
      } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
        event.preventDefault();
        focusedItem = list.prev(focusedItem);

        _this3.setState({
          focusedItem: focusedItem
        });

        if (!multiple) change(focusedItem);
      } else if (multiple && keyCode === 65 && ctrlKey) {
        event.preventDefault();

        _this3.selectAll();
      }
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handleKeyPress", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (event) {
      (0, _widgetHelpers.notify)(_this4.props.onKeyPress, [event]);
      if (event.defaultPrevented) return;

      _this4.search(String.fromCharCode(event.which), event);
    };
  }
})), _class2)) || _class;

var _default = (0, _uncontrollable.default)(SelectList, {
  value: 'onChange'
}, ['selectAll', 'focus']);

exports.default = _default;
module.exports = exports["default"];

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(0));

var _ListOption = _interopRequireDefault(__webpack_require__(38));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var SelectListItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SelectListItem, _React$Component);

  function SelectListItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleChange = function (e) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          disabled = _this$props.disabled,
          dataItem = _this$props.dataItem;
      if (!disabled) onChange(dataItem, e.target.checked);
    };

    return _this;
  }

  var _proto = SelectListItem.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        disabled = _this$props2.disabled,
        readOnly = _this$props2.readOnly,
        name = _this$props2.name,
        type = _this$props2.type,
        checked = _this$props2.checked,
        onMouseDown = _this$props2.onMouseDown,
        props = _objectWithoutProperties(_this$props2, ["children", "disabled", "readOnly", "name", "type", "checked", "onMouseDown"]);

    delete props.onChange;
    return _react.default.createElement(_ListOption.default, _extends({}, props, {
      role: type,
      disabled: disabled,
      "aria-checked": !!checked
    }), _react.default.createElement("label", {
      onMouseDown: onMouseDown,
      className: "rw-select-list-label"
    }, _react.default.createElement("input", {
      name: name,
      type: type,
      tabIndex: "-1",
      checked: checked,
      disabled: disabled || !!readOnly,
      role: "presentation",
      className: "rw-select-list-input",
      onChange: this.handleChange
    }), children));
  };

  return SelectListItem;
}(_react.default.Component);

SelectListItem.propTypes = {
  type: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  dataItem: _propTypes.default.any,
  checked: _propTypes.default.bool.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onMouseDown: _propTypes.default.func.isRequired
};
var _default = SelectListItem;
exports.default = _default;
module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=react-widgets.js.map