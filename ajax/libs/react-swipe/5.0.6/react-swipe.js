(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("swipe-js-iso"));
	else if(typeof define === 'function' && define.amd)
		define("ReactSwipe", ["react", "swipe-js-iso"], factory);
	else if(typeof exports === 'object')
		exports["ReactSwipe"] = factory(require("react"), require("swipe-js-iso"));
	else
		root["ReactSwipe"] = factory(root["React"], root["Swipe"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _swipeJsIso = __webpack_require__(2);

	var _swipeJsIso2 = _interopRequireDefault(_swipeJsIso);

	var _objectAssign = __webpack_require__(3);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ReactSwipe = function (_Component) {
	  _inherits(ReactSwipe, _Component);

	  function ReactSwipe() {
	    _classCallCheck(this, ReactSwipe);

	    return _possibleConstructorReturn(this, (ReactSwipe.__proto__ || Object.getPrototypeOf(ReactSwipe)).apply(this, arguments));
	  }

	  _createClass(ReactSwipe, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var swipeOptions = this.props.swipeOptions;


	      this.swipe = (0, _swipeJsIso2.default)(this.refs.container, swipeOptions);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.swipe.kill();
	      this.swipe = void 0;
	    }
	  }, {
	    key: 'next',
	    value: function next() {
	      this.swipe.next();
	    }
	  }, {
	    key: 'prev',
	    value: function prev() {
	      this.swipe.prev();
	    }
	  }, {
	    key: 'slide',
	    value: function slide() {
	      var _swipe;

	      (_swipe = this.swipe).slide.apply(_swipe, arguments);
	    }
	  }, {
	    key: 'getPos',
	    value: function getPos() {
	      return this.swipe.getPos();
	    }
	  }, {
	    key: 'getNumSlides',
	    value: function getNumSlides() {
	      return this.swipe.getNumSlides();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var id = _props.id;
	      var className = _props.className;
	      var style = _props.style;
	      var children = _props.children;


	      return _react2.default.createElement(
	        'div',
	        { ref: 'container', id: id, className: 'react-swipe-container ' + className, style: style.container },
	        _react2.default.createElement(
	          'div',
	          { style: style.wrapper },
	          _react2.default.Children.map(children, function (child) {
	            return _react2.default.cloneElement(child, {
	              style: child.props.style ? (0, _objectAssign2.default)(child.props.style, style.child) : style.child
	            });
	          })
	        )
	      );
	    }
	  }]);

	  return ReactSwipe;
	}(_react.Component);

	ReactSwipe.propTypes = {
	  swipeOptions: _react.PropTypes.shape({
	    startSlide: _react.PropTypes.number,
	    speed: _react.PropTypes.number,
	    auto: _react.PropTypes.number,
	    continuous: _react.PropTypes.bool,
	    disableScroll: _react.PropTypes.bool,
	    stopPropagation: _react.PropTypes.bool,
	    swiping: _react.PropTypes.func,
	    callback: _react.PropTypes.func,
	    transitionEnd: _react.PropTypes.func
	  }),
	  style: _react.PropTypes.shape({
	    container: _react.PropTypes.object,
	    wrapper: _react.PropTypes.object,
	    child: _react.PropTypes.object
	  }),
	  id: _react.PropTypes.string,
	  className: _react.PropTypes.string
	};
	ReactSwipe.defaultProps = {
	  swipeOptions: {},
	  style: {
	    container: {
	      overflow: 'hidden',
	      visibility: 'hidden',
	      position: 'relative'
	    },

	    wrapper: {
	      overflow: 'hidden',
	      position: 'relative'
	    },

	    child: {
	      float: 'left',
	      width: '100%',
	      position: 'relative',
	      transitionProperty: 'transform'
	    }
	  },
	  className: ''
	};
	exports.default = ReactSwipe;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
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
			var test1 = new String('abc');  // eslint-disable-line
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
		} catch (e) {
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

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }
/******/ ])
});
;