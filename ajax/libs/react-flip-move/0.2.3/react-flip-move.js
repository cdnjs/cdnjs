(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["FlipMove"] = factory(require("react"), require("react-dom"));
	else
		root["FlipMove"] = factory(root["react"], root["react-dom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
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

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _helpers = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * React Flip Move
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Automagically animate the transition when the DOM gets reordered.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * How it works:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * The basic idea with this component is pretty straightforward:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   - We track all rendered elements by their `key` property, and we keep
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     their bounding boxes (their top/left/right/bottom coordinates) in this
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     component's state.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   - When the component updates, we compare its former position (held in
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     state) with its new position (derived from the DOM after update).
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   - If the two have moved, we use the FLIP technique to animate the
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     transition between their positions.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var transitionEnd = (0, _helpers.whichTransitionEvent)();

	var FlipMove = function (_Component) {
	  _inherits(FlipMove, _Component);

	  function FlipMove() {
	    _classCallCheck(this, FlipMove);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(FlipMove).apply(this, arguments));
	  }

	  _createClass(FlipMove, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      var _this2 = this;

	      // Ensure we're dealing with an array, and not an only child.
	      var children = _react2.default.Children.toArray(this.props.children);

	      // Get the bounding boxes of all currently-rendered, keyed children.
	      // Store it in this.state.
	      var newState = children.reduce(function (state, child) {
	        // It is possible that a child does not have a `key` property;
	        // Ignore these children, they don't need to be moved.
	        if (!child.key) return state;

	        var domNode = _reactDom2.default.findDOMNode(_this2.refs[child.key]);
	        var boundingBox = domNode.getBoundingClientRect();

	        return _extends({}, state, _defineProperty({}, child.key, boundingBox));
	      }, {});

	      this.setState(newState);
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(previousProps) {
	      // Re-calculate the bounding boxes of tracked elements.
	      // Compare to the bounding boxes stored in state.
	      // Animate as required =)

	      // On the very first render, `componentWillReceiveProps` is not called.
	      // This means that `this.state` will be undefined.
	      // That's alright, though, because there is no possible transition on
	      // the first render; we only animate transitions between state changes =)
	      if (!this.state) return;

	      _react2.default.Children.toArray(previousProps.children).filter(this.childNeedsToBeAnimated.bind(this)).forEach(this.animateTransform.bind(this));
	    }
	  }, {
	    key: 'childNeedsToBeAnimated',
	    value: function childNeedsToBeAnimated(child) {
	      // We only want to animate if:
	      //  * The child has an associated key (immovable children are supported)
	      //  * The child still exists in the DOM.
	      //  * The child isn't brand new.
	      //  * The child has moved
	      var isImmovable = !child.key;
	      var isBrandNew = !this.state[child.key];
	      var isDestroyed = !this.refs[child.key];

	      var domNode = _reactDom2.default.findDOMNode(this.refs[child.key]);

	      var _getPositionDelta = this.getPositionDelta(domNode, child.key);

	      var _getPositionDelta2 = _slicedToArray(_getPositionDelta, 2);

	      var dX = _getPositionDelta2[0];
	      var dY = _getPositionDelta2[1];

	      var isStationary = dX === 0 && dY === 0;

	      return !isImmovable && !isBrandNew && !isDestroyed && !isStationary;
	    }
	  }, {
	    key: 'getPositionDelta',
	    value: function getPositionDelta(domNode, key) {
	      var newBox = domNode.getBoundingClientRect();
	      var oldBox = this.state[key];

	      return [oldBox.left - newBox.left, oldBox.top - newBox.top];
	    }
	  }, {
	    key: 'createTransitionString',
	    value: function createTransitionString(n) {
	      var _props = this.props;
	      var duration = _props.duration;
	      var staggerDurationBy = _props.staggerDurationBy;
	      var delay = _props.delay;
	      var staggerDelayBy = _props.staggerDelayBy;
	      var easing = _props.easing;

	      // There has to be a nicer way to do this...

	      var _convertToInt = (0, _helpers.convertToInt)(duration, delay, staggerDurationBy, staggerDelayBy);

	      var _convertToInt2 = _slicedToArray(_convertToInt, 4);

	      duration = _convertToInt2[0];
	      delay = _convertToInt2[1];
	      staggerDurationBy = _convertToInt2[2];
	      staggerDelayBy = _convertToInt2[3];

	      delay += n * staggerDelayBy;
	      duration += n * staggerDurationBy;

	      return 'transform ' + duration + 'ms ' + easing + ' ' + delay + 'ms';
	    }
	  }, {
	    key: 'animateTransform',
	    value: function animateTransform(child, n) {
	      var _this3 = this;

	      var domNode = _reactDom2.default.findDOMNode(this.refs[child.key]);

	      // Get the △X and △Y

	      var _getPositionDelta3 = this.getPositionDelta(domNode, child.key);

	      var _getPositionDelta4 = _slicedToArray(_getPositionDelta3, 2);

	      var dX = _getPositionDelta4[0];
	      var dY = _getPositionDelta4[1];

	      // TODO: Don't clobber existing properties!

	      domNode.style.transition = '';
	      domNode.style.transform = 'translate(' + dX + 'px, ' + dY + 'px)';

	      // Sadly, this is the most browser-compatible way to do this I've found.
	      // Essentially we need to set the initial styles outside of any request
	      // callbacks to avoid batching them. Then, a frame needs to pass with
	      // the styles above rendered. Then, on the second frame, we can apply
	      // our final styles to perform the animation.
	      requestAnimationFrame(function (t1) {
	        requestAnimationFrame(function (t2) {
	          domNode.style.transition = _this3.createTransitionString(n);
	          domNode.style.transform = '';
	        });
	      });

	      if (this.props.onStart) this.props.onStart(child, domNode);

	      domNode.addEventListener(transitionEnd, function () {
	        domNode.style.transition = '';
	        if (_this3.props.onFinish) _this3.props.onFinish(child, domNode);
	      });
	    }
	  }, {
	    key: 'childrenWithRefs',
	    value: function childrenWithRefs() {
	      // Convert the children to an array, and map.
	      // Cannot use React.Children.map directly, because the #toArray method
	      // re-maps some of the keys ('1' -> '.$1'). We need this behaviour to
	      // be consistent, so we do this conversion upfront.
	      // See: https://github.com/facebook/react/pull/3650/files
	      return _react2.default.Children.toArray(this.props.children).map(function (child) {
	        return _react2.default.cloneElement(child, { ref: child.key });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        this.childrenWithRefs()
	      );
	    }
	  }]);

	  return FlipMove;
	}(_react.Component);

	FlipMove.propTypes = {
	  children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]).isRequired,
	  easing: _react.PropTypes.string,
	  duration: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	  delay: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	  staggerDurationBy: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	  staggerDelayBy: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	  onStart: _react.PropTypes.func,
	  onFinish: _react.PropTypes.func
	};
	FlipMove.defaultProps = {
	  easing: 'ease-in-out',
	  duration: 350,
	  delay: 0,
	  staggerDurationBy: 0,
	  staggerDelayBy: 0
	};
	exports.default = FlipMove;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.convertToInt = convertToInt;
	exports.whichTransitionEvent = whichTransitionEvent;
	function convertToInt() {
	  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
	    values[_key] = arguments[_key];
	  }

	  return values.map(function (val) {
	    return typeof val === 'string' ? parseInt(val) : val;
	  });
	}

	// Modified from Modernizr
	function whichTransitionEvent() {
	  var el = document.createElement('fakeelement');

	  var transitions = {
	    'transition': 'transitionend',
	    'OTransition': 'oTransitionEnd',
	    'MozTransition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd'
	  };

	  for (var t in transitions) {
	    if (el.style[t] !== undefined) return transitions[t];
	  }
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;