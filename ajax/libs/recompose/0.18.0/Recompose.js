(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Recompose"] = factory(require("react"));
	else
		root["Recompose"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(31);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var createHelper = function createHelper(func, helperName) {
	  var setDisplayName = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	  var noArgs = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	  if (false) {
	    var _ret = function () {
	      var wrapDisplayName = require('./wrapDisplayName').default;

	      if (noArgs) {
	        return {
	          v: function v(BaseComponent) {
	            var Component = func(BaseComponent);
	            Component.displayName = wrapDisplayName(BaseComponent, helperName);
	            return Component;
	          }
	        };
	      }

	      return {
	        v: function v() {
	          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	          }

	          if (process.env.NODE_ENV !== 'production' && args.length > func.length) {
	            /* eslint-disable */
	            console.error(
	            /* eslint-enable */
	            'Too many arguments passed to ' + helperName + '(). It should called ' + ('like so: ' + helperName + '(...args)(BaseComponent).'));
	          }

	          return function (BaseComponent) {
	            var Component = noArgs ? func(BaseComponent) : func.apply(undefined, args)(BaseComponent);

	            Component.displayName = wrapDisplayName(BaseComponent, helperName);

	            return Component;
	          };
	        }
	      };
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }

	  return func;
	};

	exports.default = createHelper;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.internalCreateElement = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _isReferentiallyTransparentFunctionComponent = __webpack_require__(32);

	var _isReferentiallyTransparentFunctionComponent2 = _interopRequireDefault(_isReferentiallyTransparentFunctionComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _createElement = function _createElement(hasKey, isReferentiallyTransparent, Component, props, children) {
	  if (!hasKey && isReferentiallyTransparent) {
	    var component = Component;
	    if (children) {
	      return component(_extends({}, props, { children: children }));
	    }
	    return component(props);
	  }

	  if (children) {
	    return _react2.default.createElement(
	      Component,
	      props,
	      children
	    );
	  }

	  return _react2.default.createElement(Component, props);
	};

	var internalCreateElement = exports.internalCreateElement = function internalCreateElement(Component) {
	  var isReferentiallyTransparent = (0, _isReferentiallyTransparentFunctionComponent2.default)(Component);
	  return function (p, c) {
	    return _createElement(false, isReferentiallyTransparent, Component, p, c);
	  };
	};

	var createElement = function createElement(Component, props, children) {
	  var isReferentiallyTransparent = (0, _isReferentiallyTransparentFunctionComponent2.default)(Component);
	  /* eslint-disable */
	  var hasKey = props && props.hasOwnProperty('key');
	  /* eslint-enable */
	  return _createElement(hasKey, isReferentiallyTransparent, Component, props, children);
	};

	exports.default = createElement;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createElement = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapProps = function mapProps(propsMapper) {
	  return function (BaseComponent) {
	    var createElement = (0, _createElement.internalCreateElement)(BaseComponent);
	    return function (props) {
	      return createElement(propsMapper(props));
	    };
	  };
	};

	exports.default = (0, _createHelper2.default)(mapProps, 'mapProps');

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _shallowEqual = __webpack_require__(50);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _shallowEqual2.default;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var omit = function omit(obj, keys) {
	  var rest = _objectWithoutProperties(obj, []);

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (rest.hasOwnProperty(key)) {
	      delete rest[key];
	    }
	  }
	  return rest;
	};

	exports.default = omit;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getDisplayName = function getDisplayName(Component) {
	  if (typeof Component === 'string') {
	    return Component;
	  }

	  if (!Component) {
	    return undefined;
	  }

	  return Component.displayName || Component.name || 'Component';
	};

	exports.default = getDisplayName;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var isClassComponent = function isClassComponent(Component) {
	  return Boolean(Component && Component.prototype && _typeof(Component.prototype.isReactComponent) === 'object');
	};

	exports.default = isClassComponent;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var setStatic = function setStatic(key, value) {
	  return function (BaseComponent) {
	    BaseComponent[key] = value;
	    return BaseComponent;
	  };
	};

	exports.default = (0, _createHelper2.default)(setStatic, 'setStatic', false);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createElement = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var shouldUpdate = function shouldUpdate(test) {
	  return function (BaseComponent) {
	    var createElement = (0, _createElement.internalCreateElement)(BaseComponent);
	    return function (_Component) {
	      _inherits(_class, _Component);

	      function _class() {
	        _classCallCheck(this, _class);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	      }

	      _createClass(_class, [{
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps) {
	          return test(this.props, nextProps);
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          return createElement(this.props);
	        }
	      }]);

	      return _class;
	    }(_react.Component);
	  };
	};

	exports.default = (0, _createHelper2.default)(shouldUpdate, 'shouldUpdate');

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pick = function pick(obj, keys) {
	  var result = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (obj.hasOwnProperty(key)) {
	      result[key] = obj[key];
	    }
	  }
	  return result;
	};

	exports.default = pick;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(17),
	    baseLodash = __webpack_require__(14);

	/** Used as references for the maximum length and index of an array. */
	var MAX_ARRAY_LENGTH = 4294967295;

	/**
	 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	 *
	 * @private
	 * @constructor
	 * @param {*} value The value to wrap.
	 */
	function LazyWrapper(value) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__dir__ = 1;
	  this.__filtered__ = false;
	  this.__iteratees__ = [];
	  this.__takeCount__ = MAX_ARRAY_LENGTH;
	  this.__views__ = [];
	}

	// Ensure `LazyWrapper` is an instance of `baseLodash`.
	LazyWrapper.prototype = baseCreate(baseLodash.prototype);
	LazyWrapper.prototype.constructor = LazyWrapper;

	module.exports = LazyWrapper;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(17),
	    baseLodash = __webpack_require__(14);

	/**
	 * The base constructor for creating `lodash` wrapper objects.
	 *
	 * @private
	 * @param {*} value The value to wrap.
	 * @param {boolean} [chainAll] Enable explicit method chain sequences.
	 */
	function LodashWrapper(value, chainAll) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__chain__ = !!chainAll;
	  this.__index__ = 0;
	  this.__values__ = undefined;
	}

	LodashWrapper.prototype = baseCreate(baseLodash.prototype);
	LodashWrapper.prototype.constructor = LodashWrapper;

	module.exports = LodashWrapper;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * The function whose prototype chain sequence wrappers inherit from.
	 *
	 * @private
	 */
	function baseLodash() {
	  // No operation performed.
	}

	module.exports = baseLodash;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _shouldUpdate = __webpack_require__(10);

	var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

	var _shallowEqual = __webpack_require__(5);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _pick = __webpack_require__(11);

	var _pick2 = _interopRequireDefault(_pick);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var onlyUpdateForKeys = function onlyUpdateForKeys(propKeys) {
	  return (0, _shouldUpdate2.default)(function (props, nextProps) {
	    return !(0, _shallowEqual2.default)((0, _pick2.default)(nextProps, propKeys), (0, _pick2.default)(props, propKeys));
	  });
	};

	exports.default = (0, _createHelper2.default)(onlyUpdateForKeys, 'onlyUpdateForKeys');

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(proto) {
	  return isObject(proto) ? objectCreate(proto) : {};
	}

	module.exports = baseCreate;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * A no-operation function that returns `undefined` regardless of the
	 * arguments it receives.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.noop(object) === undefined;
	 * // => true
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = noop;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var realNames = __webpack_require__(61);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the name of `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {string} Returns the function name.
	 */
	function getFuncName(func) {
	  var result = (func.name + ''),
	      array = realNames[result],
	      length = hasOwnProperty.call(realNames, result) ? array.length : 0;

	  while (length--) {
	    var data = array[length],
	        otherFunc = data.func;
	    if (otherFunc == null || otherFunc == func) {
	      return data.name;
	    }
	  }
	  return result;
	}

	module.exports = getFuncName;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(65),
	    isObjectLike = __webpack_require__(22);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createElement = __webpack_require__(2);

	var _createElement2 = _interopRequireDefault(_createElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var branch = function branch(test, left, right) {
	  return function (BaseComponent) {
	    return function (_React$Component) {
	      _inherits(_class2, _React$Component);

	      function _class2(props, context) {
	        _classCallCheck(this, _class2);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).call(this, props, context));

	        _this.LeftComponent = null;
	        _this.RightComponent = null;

	        _this.computeChildComponent(_this.props);
	        return _this;
	      }

	      _createClass(_class2, [{
	        key: 'computeChildComponent',
	        value: function computeChildComponent(props) {
	          if (test(props)) {
	            this.LeftComponent = this.LeftComponent || left(BaseComponent);
	            this.Component = this.LeftComponent;
	          } else {
	            this.RightComponent = this.RightComponent || right(BaseComponent);
	            this.Component = this.RightComponent;
	          }
	        }
	      }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	          this.computeChildComponent(nextProps);
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          var Component = this.Component;

	          return (0, _createElement2.default)(Component, this.props);
	        }
	      }]);

	      return _class2;
	    }(_react2.default.Component);
	  };
	};

	exports.default = (0, _createHelper2.default)(branch, 'branch');

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _omit = __webpack_require__(6);

	var _omit2 = _interopRequireDefault(_omit);

	var _createElement = __webpack_require__(2);

	var _createElement2 = _interopRequireDefault(_createElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var componentFromProp = function componentFromProp(propName) {
	  var Component = function Component(props) {
	    return (0, _createElement2.default)(props[propName], (0, _omit2.default)(props, [propName]));
	  };
	  Component.displayName = 'componentFromProp(' + propName + ')';
	  return Component;
	};

	exports.default = componentFromProp;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _flowRight = __webpack_require__(63);

	var _flowRight2 = _interopRequireDefault(_flowRight);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _flowRight2.default;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var createSink = function createSink(callback) {
	  return function (_Component) {
	    _inherits(Sink, _Component);

	    function Sink() {
	      _classCallCheck(this, Sink);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(Sink).apply(this, arguments));
	    }

	    _createClass(Sink, [{
	      key: 'componentWillMount',
	      value: function componentWillMount() {
	        callback(this.props);
	      }
	    }, {
	      key: 'componentWillReceiveProps',
	      value: function componentWillReceiveProps(nextProps) {
	        callback(nextProps);
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return null;
	      }
	    }]);

	    return Sink;
	  }(_react.Component);
	};

	exports.default = createSink;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createElement = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultProps = function defaultProps(props) {
	  return function (BaseComponent) {
	    var createElement = (0, _createElement.internalCreateElement)(BaseComponent);
	    var DefaultProps = function DefaultProps(ownerProps) {
	      return createElement(ownerProps);
	    };
	    DefaultProps.defaultProps = props;
	    return DefaultProps;
	  };
	};

	exports.default = (0, _createHelper2.default)(defaultProps, 'defaultProps');

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _omit = __webpack_require__(6);

	var _omit2 = _interopRequireDefault(_omit);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createElement = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var flattenProp = function flattenProp(propName) {
	  return function (BaseComponent) {
	    var createElement = (0, _createElement.internalCreateElement)(BaseComponent);
	    return function (props) {
	      return createElement(_extends({}, (0, _omit2.default)(props, [propName]), props[propName]));
	    };
	  };
	};

	exports.default = (0, _createHelper2.default)(flattenProp, 'flattenProp');

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createElement = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getContext = function getContext(contextTypes) {
	  return function (BaseComponent) {
	    var createElement = (0, _createElement.internalCreateElement)(BaseComponent);
	    var GetContext = function GetContext(ownerProps, context) {
	      return createElement(_extends({}, ownerProps, context));
	    };

	    GetContext.contextTypes = contextTypes;

	    return GetContext;
	  };
	};

	exports.default = (0, _createHelper2.default)(getContext, 'getContext');

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _hoistNonReactStatics = __webpack_require__(51);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var hoistStatics = function hoistStatics(higherOrderComponent) {
	  return function (BaseComponent) {
	    var NewComponent = higherOrderComponent(BaseComponent);
	    (0, _hoistNonReactStatics2.default)(NewComponent, BaseComponent);
	    return NewComponent;
	  };
	};

	exports.default = hoistStatics;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.hoistStatics = exports.nest = exports.componentFromProp = exports.createSink = exports.isClassComponent = exports.shallowEqual = exports.wrapDisplayName = exports.getDisplayName = exports.compose = exports.setDisplayName = exports.setPropTypes = exports.setStatic = exports.toClass = exports.getContext = exports.withContext = exports.onlyUpdateForPropTypes = exports.onlyUpdateForKeys = exports.pure = exports.shouldUpdate = exports.renderNothing = exports.renderComponent = exports.branch = exports.withReducer = exports.withState = exports.flattenProp = exports.renameProps = exports.renameProp = exports.defaultProps = exports.withHandlers = exports.withPropsOnChange = exports.withProps = exports.mapProps = undefined;

	var _mapProps2 = __webpack_require__(4);

	var _mapProps3 = _interopRequireDefault(_mapProps2);

	var _withProps2 = __webpack_require__(45);

	var _withProps3 = _interopRequireDefault(_withProps2);

	var _withPropsOnChange2 = __webpack_require__(46);

	var _withPropsOnChange3 = _interopRequireDefault(_withPropsOnChange2);

	var _withHandlers2 = __webpack_require__(44);

	var _withHandlers3 = _interopRequireDefault(_withHandlers2);

	var _defaultProps2 = __webpack_require__(27);

	var _defaultProps3 = _interopRequireDefault(_defaultProps2);

	var _renameProp2 = __webpack_require__(36);

	var _renameProp3 = _interopRequireDefault(_renameProp2);

	var _renameProps2 = __webpack_require__(37);

	var _renameProps3 = _interopRequireDefault(_renameProps2);

	var _flattenProp2 = __webpack_require__(28);

	var _flattenProp3 = _interopRequireDefault(_flattenProp2);

	var _withState2 = __webpack_require__(48);

	var _withState3 = _interopRequireDefault(_withState2);

	var _withReducer2 = __webpack_require__(47);

	var _withReducer3 = _interopRequireDefault(_withReducer2);

	var _branch2 = __webpack_require__(23);

	var _branch3 = _interopRequireDefault(_branch2);

	var _renderComponent2 = __webpack_require__(38);

	var _renderComponent3 = _interopRequireDefault(_renderComponent2);

	var _renderNothing2 = __webpack_require__(39);

	var _renderNothing3 = _interopRequireDefault(_renderNothing2);

	var _shouldUpdate2 = __webpack_require__(10);

	var _shouldUpdate3 = _interopRequireDefault(_shouldUpdate2);

	var _pure2 = __webpack_require__(35);

	var _pure3 = _interopRequireDefault(_pure2);

	var _onlyUpdateForKeys2 = __webpack_require__(16);

	var _onlyUpdateForKeys3 = _interopRequireDefault(_onlyUpdateForKeys2);

	var _onlyUpdateForPropTypes2 = __webpack_require__(34);

	var _onlyUpdateForPropTypes3 = _interopRequireDefault(_onlyUpdateForPropTypes2);

	var _withContext2 = __webpack_require__(43);

	var _withContext3 = _interopRequireDefault(_withContext2);

	var _getContext2 = __webpack_require__(29);

	var _getContext3 = _interopRequireDefault(_getContext2);

	var _toClass2 = __webpack_require__(42);

	var _toClass3 = _interopRequireDefault(_toClass2);

	var _setStatic2 = __webpack_require__(9);

	var _setStatic3 = _interopRequireDefault(_setStatic2);

	var _setPropTypes2 = __webpack_require__(41);

	var _setPropTypes3 = _interopRequireDefault(_setPropTypes2);

	var _setDisplayName2 = __webpack_require__(40);

	var _setDisplayName3 = _interopRequireDefault(_setDisplayName2);

	var _compose2 = __webpack_require__(25);

	var _compose3 = _interopRequireDefault(_compose2);

	var _getDisplayName2 = __webpack_require__(7);

	var _getDisplayName3 = _interopRequireDefault(_getDisplayName2);

	var _wrapDisplayName2 = __webpack_require__(49);

	var _wrapDisplayName3 = _interopRequireDefault(_wrapDisplayName2);

	var _shallowEqual2 = __webpack_require__(5);

	var _shallowEqual3 = _interopRequireDefault(_shallowEqual2);

	var _isClassComponent2 = __webpack_require__(8);

	var _isClassComponent3 = _interopRequireDefault(_isClassComponent2);

	var _createSink2 = __webpack_require__(26);

	var _createSink3 = _interopRequireDefault(_createSink2);

	var _componentFromProp2 = __webpack_require__(24);

	var _componentFromProp3 = _interopRequireDefault(_componentFromProp2);

	var _nest2 = __webpack_require__(33);

	var _nest3 = _interopRequireDefault(_nest2);

	var _hoistStatics2 = __webpack_require__(30);

	var _hoistStatics3 = _interopRequireDefault(_hoistStatics2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.mapProps = _mapProps3.default; // Higher-order component helpers

	exports.withProps = _withProps3.default;
	exports.withPropsOnChange = _withPropsOnChange3.default;
	exports.withHandlers = _withHandlers3.default;
	exports.defaultProps = _defaultProps3.default;
	exports.renameProp = _renameProp3.default;
	exports.renameProps = _renameProps3.default;
	exports.flattenProp = _flattenProp3.default;
	exports.withState = _withState3.default;
	exports.withReducer = _withReducer3.default;
	exports.branch = _branch3.default;
	exports.renderComponent = _renderComponent3.default;
	exports.renderNothing = _renderNothing3.default;
	exports.shouldUpdate = _shouldUpdate3.default;
	exports.pure = _pure3.default;
	exports.onlyUpdateForKeys = _onlyUpdateForKeys3.default;
	exports.onlyUpdateForPropTypes = _onlyUpdateForPropTypes3.default;
	exports.withContext = _withContext3.default;
	exports.getContext = _getContext3.default;
	exports.toClass = _toClass3.default;

	// Static property helpers

	exports.setStatic = _setStatic3.default;
	exports.setPropTypes = _setPropTypes3.default;
	exports.setDisplayName = _setDisplayName3.default;

	// Composition function

	exports.compose = _compose3.default;

	// Other utils

	exports.getDisplayName = _getDisplayName3.default;
	exports.wrapDisplayName = _wrapDisplayName3.default;
	exports.shallowEqual = _shallowEqual3.default;
	exports.isClassComponent = _isClassComponent3.default;
	exports.createSink = _createSink3.default;
	exports.componentFromProp = _componentFromProp3.default;
	exports.nest = _nest3.default;
	exports.hoistStatics = _hoistStatics3.default;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isClassComponent = __webpack_require__(8);

	var _isClassComponent2 = _interopRequireDefault(_isClassComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isReferentiallyTransparentFunctionComponent = function isReferentiallyTransparentFunctionComponent(Component) {
	  return Boolean(typeof Component === 'function' && !(0, _isClassComponent2.default)(Component) && !Component.defaultProps && !Component.contextTypes && !Component.propTypes);
	};

	exports.default = isReferentiallyTransparentFunctionComponent;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createElement = __webpack_require__(2);

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var nest = function nest() {
	  for (var _len = arguments.length, Components = Array(_len), _key = 0; _key < _len; _key++) {
	    Components[_key] = arguments[_key];
	  }

	  var createElements = Components.map(_createElement.internalCreateElement);
	  var Nest = function Nest(_ref) {
	    var props = _objectWithoutProperties(_ref, []);

	    var children = _ref.children;
	    return createElements.reduceRight(function (child, createElement) {
	      return createElement(props, child);
	    }, children);
	  };

	  if (false) {
	    var getDisplayName = require('./getDisplayName').default;
	    var displayNames = Components.map(getDisplayName);
	    Nest.displayName = 'nest(' + displayNames.join(', ') + ')';
	  }

	  return Nest;
	};

	exports.default = nest;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _onlyUpdateForKeys = __webpack_require__(16);

	var _onlyUpdateForKeys2 = _interopRequireDefault(_onlyUpdateForKeys);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var onlyUpdateForPropTypes = function onlyUpdateForPropTypes(BaseComponent) {
	  var propTypes = BaseComponent.propTypes;

	  if (false) {
	    var getDisplayName = require('./getDisplayName').default;
	    if (!propTypes) {
	      /* eslint-disable */
	      console.error('A component without any `propTypes` was passed to ' + '`onlyUpdateForPropTypes()`. Check the implementation of the ' + ('component with display name "' + getDisplayName(BaseComponent) + '".'));
	      /* eslint-enable */
	    }
	  }

	  var propKeys = Object.keys(propTypes || {});
	  var OnlyUpdateForPropTypes = (0, _onlyUpdateForKeys2.default)(propKeys)(BaseComponent);

	  return OnlyUpdateForPropTypes;
	};

	exports.default = (0, _createHelper2.default)(onlyUpdateForPropTypes, 'onlyUpdateForPropTypes', true, true);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _shouldUpdate = __webpack_require__(10);

	var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

	var _shallowEqual = __webpack_require__(5);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var pure = (0, _shouldUpdate2.default)(function (props, nextProps) {
	  return !(0, _shallowEqual2.default)(props, nextProps);
	});

	exports.default = (0, _createHelper2.default)(pure, 'pure', true, true);

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _omit = __webpack_require__(6);

	var _omit2 = _interopRequireDefault(_omit);

	var _mapProps = __webpack_require__(4);

	var _mapProps2 = _interopRequireDefault(_mapProps);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var renameProp = function renameProp(oldName, newName) {
	  return (0, _mapProps2.default)(function (props) {
	    return _extends({}, (0, _omit2.default)(props, [oldName]), _defineProperty({}, newName, props[oldName]));
	  });
	};

	exports.default = (0, _createHelper2.default)(renameProp, 'renameProp');

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _omit = __webpack_require__(6);

	var _omit2 = _interopRequireDefault(_omit);

	var _pick = __webpack_require__(11);

	var _pick2 = _interopRequireDefault(_pick);

	var _mapProps = __webpack_require__(4);

	var _mapProps2 = _interopRequireDefault(_mapProps);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var keys = Object.keys;


	var mapKeys = function mapKeys(obj, func) {
	  return keys(obj).reduce(function (result, key) {
	    var val = obj[key];
	    result[func(val, key)] = val;
	    return result;
	  }, {});
	};

	var renameProps = function renameProps(nameMap) {
	  return (0, _mapProps2.default)(function (props) {
	    return _extends({}, (0, _omit2.default)(props, keys(nameMap)), mapKeys((0, _pick2.default)(props, keys(nameMap)), function (_, oldName) {
	      return nameMap[oldName];
	    }));
	  });
	};

	exports.default = (0, _createHelper2.default)(renameProps, 'renameProps');

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createElement = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var renderComponent = function renderComponent(Component) {
	  return function (_) {
	    var createElement = (0, _createElement.internalCreateElement)(Component);
	    var RenderComponent = function RenderComponent(props) {
	      return createElement(props);
	    };
	    if (false) {
	      var wrapDisplayName = require('./wrapDisplayName').default;
	      RenderComponent.displayName = wrapDisplayName(Component, 'renderComponent');
	    }
	    return RenderComponent;
	  };
	};

	exports.default = (0, _createHelper2.default)(renderComponent, 'renderComponent', false);

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var renderNothing = function renderNothing(_) {
	  var Nothing = function Nothing() {
	    return null;
	  };
	  Nothing.displayName = 'Nothing';
	  return Nothing;
	};

	exports.default = (0, _createHelper2.default)(renderNothing, 'renderNothing', false, true);

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _setStatic = __webpack_require__(9);

	var _setStatic2 = _interopRequireDefault(_setStatic);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var setDisplayName = function setDisplayName(displayName) {
	  return (0, _setStatic2.default)('displayName', displayName);
	};

	exports.default = (0, _createHelper2.default)(setDisplayName, 'setDisplayName', false);

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _setStatic = __webpack_require__(9);

	var _setStatic2 = _interopRequireDefault(_setStatic);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var setPropTypes = function setPropTypes(propTypes) {
	  return (0, _setStatic2.default)('propTypes', propTypes);
	};

	exports.default = (0, _createHelper2.default)(setPropTypes, 'setPropTypes', false);

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _getDisplayName = __webpack_require__(7);

	var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

	var _isClassComponent = __webpack_require__(8);

	var _isClassComponent2 = _interopRequireDefault(_isClassComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var toClass = function toClass(baseComponent) {
	  if ((0, _isClassComponent2.default)(baseComponent)) {
	    return baseComponent;
	  }

	  var ToClass = function (_Component) {
	    _inherits(ToClass, _Component);

	    function ToClass() {
	      _classCallCheck(this, ToClass);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(ToClass).apply(this, arguments));
	    }

	    _createClass(ToClass, [{
	      key: 'render',
	      value: function render() {
	        if (typeof baseComponent === 'string') {
	          return _react2.default.createElement('baseComponent', this.props);
	        }
	        return baseComponent(this.props, this.context);
	      }
	    }]);

	    return ToClass;
	  }(_react.Component);

	  ToClass.displayName = (0, _getDisplayName2.default)(baseComponent);
	  ToClass.propTypes = baseComponent.propTypes;
	  ToClass.contextTypes = baseComponent.contextTypes;
	  ToClass.defaultProps = baseComponent.defaultProps;

	  return ToClass;
	};

	exports.default = toClass;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createElement = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var withContext = function withContext(childContextTypes, getChildContext) {
	  return function (BaseComponent) {
	    var createElement = (0, _createElement.internalCreateElement)(BaseComponent);

	    var WithContext = function (_Component) {
	      _inherits(WithContext, _Component);

	      function WithContext() {
	        var _Object$getPrototypeO;

	        var _temp, _this, _ret;

	        _classCallCheck(this, WithContext);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(WithContext)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.getChildContext = function () {
	          return getChildContext(_this.props);
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	      }

	      _createClass(WithContext, [{
	        key: 'render',
	        value: function render() {
	          return createElement(this.props);
	        }
	      }]);

	      return WithContext;
	    }(_react.Component);

	    WithContext.childContextTypes = childContextTypes;

	    return WithContext;
	  };
	};

	exports.default = (0, _createHelper2.default)(withContext, 'withContext');

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _createElement = __webpack_require__(2);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var mapValues = function mapValues(obj, func) {
	  return Object.keys(obj).reduce(function (result, key, i) {
	    result[key] = func(obj[key], key, i);
	    return result;
	  }, {});
	};

	var withHandlers = function withHandlers(handlers) {
	  return function (BaseComponent) {
	    var _class, _temp2, _initialiseProps;

	    var createElement = (0, _createElement.internalCreateElement)(BaseComponent);
	    return _temp2 = _class = function (_Component) {
	      _inherits(_class, _Component);

	      function _class() {
	        var _Object$getPrototypeO;

	        var _temp, _this, _ret;

	        _classCallCheck(this, _class);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
	      }

	      _createClass(_class, [{
	        key: 'render',
	        value: function render() {
	          return createElement(_extends({}, this.props, this.handlers));
	        }
	      }]);

	      return _class;
	    }(_react.Component), _initialiseProps = function _initialiseProps() {
	      var _this2 = this;

	      this.handlers = mapValues(handlers, function (createHandler) {
	        return function () {
	          var handler = createHandler(_this2.props);

	          if (false) {
	            console.error('withHandlers(): Expected a map of higher-order functions. ' + 'Refer to the docs for more info.');
	          }

	          return handler.apply(undefined, arguments);
	        };
	      });
	    }, _temp2;
	  };
	};

	exports.default = (0, _createHelper2.default)(withHandlers, 'withHandlers');

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _mapProps = __webpack_require__(4);

	var _mapProps2 = _interopRequireDefault(_mapProps);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var withProps = function withProps(input) {
	  return (0, _mapProps2.default)(function (props) {
	    return _extends({}, props, typeof input === 'function' ? input(props) : input);
	  });
	};

	exports.default = (0, _createHelper2.default)(withProps, 'withProps');

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _pick = __webpack_require__(11);

	var _pick2 = _interopRequireDefault(_pick);

	var _shallowEqual = __webpack_require__(5);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createElement = __webpack_require__(2);

	var _createElement2 = _interopRequireDefault(_createElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var withPropsOnChange = function withPropsOnChange(shouldMapOrKeys, propsMapper) {
	  return function (BaseComponent) {
	    var shouldMap = typeof shouldMapOrKeys === 'function' ? shouldMapOrKeys : function (props, nextProps) {
	      return !(0, _shallowEqual2.default)((0, _pick2.default)(props, shouldMapOrKeys), (0, _pick2.default)(nextProps, shouldMapOrKeys));
	    };

	    return function (_Component) {
	      _inherits(_class2, _Component);

	      function _class2() {
	        var _Object$getPrototypeO;

	        var _temp, _this, _ret;

	        _classCallCheck(this, _class2);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class2)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.computedProps = propsMapper(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
	      }

	      _createClass(_class2, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	          if (shouldMap(this.props, nextProps)) {
	            this.computedProps = propsMapper(nextProps);
	          }
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          return (0, _createElement2.default)(BaseComponent, _extends({}, this.props, this.computedProps));
	        }
	      }]);

	      return _class2;
	    }(_react.Component);
	  };
	};

	exports.default = (0, _createHelper2.default)(withPropsOnChange, 'withPropsOnChange');

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createElement = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var withReducer = function withReducer(stateName, dispatchName, reducer, initialState) {
	  return function (BaseComponent) {
	    var createElement = (0, _createElement.internalCreateElement)(BaseComponent);
	    return function (_Component) {
	      _inherits(_class2, _Component);

	      function _class2() {
	        var _Object$getPrototypeO;

	        var _temp, _this, _ret;

	        _classCallCheck(this, _class2);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class2)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
	          stateValue: typeof initialState === 'function' ? initialState(_this.props) : initialState
	        }, _this.dispatch = function (action) {
	          return _this.setState(function (_ref) {
	            var stateValue = _ref.stateValue;
	            return {
	              stateValue: reducer(stateValue, action)
	            };
	          });
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	      }

	      _createClass(_class2, [{
	        key: 'render',
	        value: function render() {
	          var _extends2;

	          return createElement(_extends({}, this.props, (_extends2 = {}, _defineProperty(_extends2, stateName, this.state.stateValue), _defineProperty(_extends2, dispatchName, this.dispatch), _extends2)));
	        }
	      }]);

	      return _class2;
	    }(_react.Component);
	  };
	};

	exports.default = (0, _createHelper2.default)(withReducer, 'withReducer');

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createElement = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var withState = function withState(stateName, stateUpdaterName, initialState) {
	  return function (BaseComponent) {
	    var createElement = (0, _createElement.internalCreateElement)(BaseComponent);
	    return function (_Component) {
	      _inherits(_class2, _Component);

	      function _class2() {
	        var _Object$getPrototypeO;

	        var _temp, _this, _ret;

	        _classCallCheck(this, _class2);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class2)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
	          stateValue: typeof initialState === 'function' ? initialState(_this.props) : initialState
	        }, _this.updateStateValue = function (updateFn, callback) {
	          return _this.setState(function (_ref) {
	            var stateValue = _ref.stateValue;
	            return {
	              stateValue: typeof updateFn === 'function' ? updateFn(stateValue) : updateFn
	            };
	          }, callback);
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	      }

	      _createClass(_class2, [{
	        key: 'render',
	        value: function render() {
	          var _extends2;

	          return createElement(_extends({}, this.props, (_extends2 = {}, _defineProperty(_extends2, stateName, this.state.stateValue), _defineProperty(_extends2, stateUpdaterName, this.updateStateValue), _extends2)));
	        }
	      }]);

	      return _class2;
	    }(_react.Component);
	  };
	};

	exports.default = (0, _createHelper2.default)(withState, 'withState');

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getDisplayName = __webpack_require__(7);

	var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
	  return hocName + '(' + (0, _getDisplayName2.default)(BaseComponent) + ')';
	};

	exports.default = wrapDisplayName;

/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * 
	 */

	/*eslint-disable no-self-compare */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
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

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  if (is(objA, objB)) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ },
/* 51 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent) {
	    var keys = Object.getOwnPropertyNames(sourceComponent);
	    for (var i=0; i<keys.length; ++i) {
	        if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
	            try {
	                targetComponent[keys[i]] = sourceComponent[keys[i]];
	            } catch (error) {

	            }
	        }
	    }

	    return targetComponent;
	};


/***/ },
/* 52 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 53 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(53),
	    isFlattenable = __webpack_require__(59);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ },
/* 55 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 56 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var LodashWrapper = __webpack_require__(13),
	    baseFlatten = __webpack_require__(54),
	    getData = __webpack_require__(18),
	    getFuncName = __webpack_require__(19),
	    isArray = __webpack_require__(15),
	    isLaziable = __webpack_require__(60),
	    rest = __webpack_require__(68);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used to compose bitmasks for wrapper metadata. */
	var CURRY_FLAG = 8,
	    PARTIAL_FLAG = 32,
	    ARY_FLAG = 128,
	    REARG_FLAG = 256;

	/**
	 * Creates a `_.flow` or `_.flowRight` function.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new flow function.
	 */
	function createFlow(fromRight) {
	  return rest(function(funcs) {
	    funcs = baseFlatten(funcs, 1);

	    var length = funcs.length,
	        index = length,
	        prereq = LodashWrapper.prototype.thru;

	    if (fromRight) {
	      funcs.reverse();
	    }
	    while (index--) {
	      var func = funcs[index];
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
	        var wrapper = new LodashWrapper([], true);
	      }
	    }
	    index = wrapper ? index : length;
	    while (++index < length) {
	      func = funcs[index];

	      var funcName = getFuncName(func),
	          data = funcName == 'wrapper' ? getData(func) : undefined;

	      if (data && isLaziable(data[0]) &&
	            data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) &&
	            !data[4].length && data[9] == 1
	          ) {
	        wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
	      } else {
	        wrapper = (func.length == 1 && isLaziable(func))
	          ? wrapper[funcName]()
	          : wrapper.thru(func);
	      }
	    }
	    return function() {
	      var args = arguments,
	          value = args[0];

	      if (wrapper && args.length == 1 &&
	          isArray(value) && value.length >= LARGE_ARRAY_SIZE) {
	        return wrapper.plant(value).value();
	      }
	      var index = 0,
	          result = length ? funcs[index].apply(this, args) : value;

	      while (++index < length) {
	        result = funcs[index].call(this, result);
	      }
	      return result;
	    };
	  });
	}

	module.exports = createFlow;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(55);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(64),
	    isArray = __webpack_require__(15),
	    isArrayLikeObject = __webpack_require__(20);

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArrayLikeObject(value) && (isArray(value) || isArguments(value));
	}

	module.exports = isFlattenable;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(12),
	    getData = __webpack_require__(18),
	    getFuncName = __webpack_require__(19),
	    lodash = __webpack_require__(70);

	/**
	 * Checks if `func` has a lazy counterpart.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
	 *  else `false`.
	 */
	function isLaziable(func) {
	  var funcName = getFuncName(func),
	      other = lodash[funcName];

	  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
	    return false;
	  }
	  if (func === other) {
	    return true;
	  }
	  var data = getData(other);
	  return !!data && func === data[0];
	}

	module.exports = isLaziable;


/***/ },
/* 61 */
/***/ function(module, exports) {

	/** Used to lookup unminified function names. */
	var realNames = {};

	module.exports = realNames;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(12),
	    LodashWrapper = __webpack_require__(13),
	    copyArray = __webpack_require__(56);

	/**
	 * Creates a clone of `wrapper`.
	 *
	 * @private
	 * @param {Object} wrapper The wrapper to clone.
	 * @returns {Object} Returns the cloned wrapper.
	 */
	function wrapperClone(wrapper) {
	  if (wrapper instanceof LazyWrapper) {
	    return wrapper.clone();
	  }
	  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
	  result.__actions__ = copyArray(wrapper.__actions__);
	  result.__index__  = wrapper.__index__;
	  result.__values__ = wrapper.__values__;
	  return result;
	}

	module.exports = wrapperClone;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var createFlow = __webpack_require__(57);

	/**
	 * This method is like `_.flow` except that it creates a function that
	 * invokes the given functions from right to left.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {...(Function|Function[])} [funcs] Functions to invoke.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * var addSquare = _.flowRight(square, _.add);
	 * addSquare(1, 2);
	 * // => 9
	 */
	var flowRight = createFlow(true);

	module.exports = flowRight;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(20);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(58),
	    isFunction = __webpack_require__(66),
	    isLength = __webpack_require__(67);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;


/***/ },
/* 67 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(52),
	    toInteger = __webpack_require__(69);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as
	 * an array.
	 *
	 * **Note:** This method is based on the
	 * [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, array);
	      case 1: return func.call(this, args[0], array);
	      case 2: return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = rest;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(12),
	    LodashWrapper = __webpack_require__(13),
	    baseLodash = __webpack_require__(14),
	    isArray = __webpack_require__(15),
	    isObjectLike = __webpack_require__(22),
	    wrapperClone = __webpack_require__(62);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates a `lodash` object which wraps `value` to enable implicit method
	 * chain sequences. Methods that operate on and return arrays, collections,
	 * and functions can be chained together. Methods that retrieve a single value
	 * or may return a primitive value will automatically end the chain sequence
	 * and return the unwrapped value. Otherwise, the value must be unwrapped
	 * with `_#value`.
	 *
	 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
	 * enabled using `_.chain`.
	 *
	 * The execution of chained methods is lazy, that is, it's deferred until
	 * `_#value` is implicitly or explicitly called.
	 *
	 * Lazy evaluation allows several methods to support shortcut fusion.
	 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
	 * the creation of intermediate arrays and can greatly reduce the number of
	 * iteratee executions. Sections of a chain sequence qualify for shortcut
	 * fusion if the section is applied to an array of at least `200` elements
	 * and any iteratees accept only one argument. The heuristic for whether a
	 * section qualifies for shortcut fusion is subject to change.
	 *
	 * Chaining is supported in custom builds as long as the `_#value` method is
	 * directly or indirectly included in the build.
	 *
	 * In addition to lodash methods, wrappers have `Array` and `String` methods.
	 *
	 * The wrapper `Array` methods are:
	 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
	 *
	 * The wrapper `String` methods are:
	 * `replace` and `split`
	 *
	 * The wrapper methods that support shortcut fusion are:
	 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
	 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
	 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
	 *
	 * The chainable wrapper methods are:
	 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
	 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
	 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
	 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
	 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
	 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
	 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
	 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
	 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
	 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
	 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
	 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
	 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
	 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
	 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
	 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
	 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
	 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
	 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
	 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
	 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
	 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
	 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
	 * `zipObject`, `zipObjectDeep`, and `zipWith`
	 *
	 * The wrapper methods that are **not** chainable by default are:
	 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
	 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `deburr`, `divide`, `each`,
	 * `eachRight`, `endsWith`, `eq`, `escape`, `escapeRegExp`, `every`, `find`,
	 * `findIndex`, `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `first`,
	 * `floor`, `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`,
	 * `forOwnRight`, `get`, `gt`, `gte`, `has`, `hasIn`, `head`, `identity`,
	 * `includes`, `indexOf`, `inRange`, `invoke`, `isArguments`, `isArray`,
	 * `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`, `isBoolean`, `isBuffer`,
	 * `isDate`, `isElement`, `isEmpty`, `isEqual`, `isEqualWith`, `isError`,
	 * `isFinite`, `isFunction`, `isInteger`, `isLength`, `isMap`, `isMatch`,
	 * `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`, `isNumber`,
	 * `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`, `isSafeInteger`,
	 * `isSet`, `isString`, `isUndefined`, `isTypedArray`, `isWeakMap`, `isWeakSet`,
	 * `join`, `kebabCase`, `last`, `lastIndexOf`, `lowerCase`, `lowerFirst`,
	 * `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`, `min`, `minBy`, `multiply`,
	 * `noConflict`, `noop`, `now`, `nth`, `pad`, `padEnd`, `padStart`, `parseInt`,
	 * `pop`, `random`, `reduce`, `reduceRight`, `repeat`, `result`, `round`,
	 * `runInContext`, `sample`, `shift`, `size`, `snakeCase`, `some`, `sortedIndex`,
	 * `sortedIndexBy`, `sortedLastIndex`, `sortedLastIndexBy`, `startCase`,
	 * `startsWith`, `subtract`, `sum`, `sumBy`, `template`, `times`, `toInteger`,
	 * `toJSON`, `toLength`, `toLower`, `toNumber`, `toSafeInteger`, `toString`,
	 * `toUpper`, `trim`, `trimEnd`, `trimStart`, `truncate`, `unescape`,
	 * `uniqueId`, `upperCase`, `upperFirst`, `value`, and `words`
	 *
	 * @name _
	 * @constructor
	 * @category Seq
	 * @param {*} value The value to wrap in a `lodash` instance.
	 * @returns {Object} Returns the new `lodash` wrapper instance.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * var wrapped = _([1, 2, 3]);
	 *
	 * // Returns an unwrapped value.
	 * wrapped.reduce(_.add);
	 * // => 6
	 *
	 * // Returns a wrapped value.
	 * var squares = wrapped.map(square);
	 *
	 * _.isArray(squares);
	 * // => false
	 *
	 * _.isArray(squares.value());
	 * // => true
	 */
	function lodash(value) {
	  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
	    if (value instanceof LodashWrapper) {
	      return value;
	    }
	    if (hasOwnProperty.call(value, '__wrapped__')) {
	      return wrapperClone(value);
	    }
	  }
	  return new LodashWrapper(value);
	}

	// Ensure wrappers are instances of `baseLodash`.
	lodash.prototype = baseLodash.prototype;
	lodash.prototype.constructor = lodash;

	module.exports = lodash;


/***/ }
/******/ ])
});
;