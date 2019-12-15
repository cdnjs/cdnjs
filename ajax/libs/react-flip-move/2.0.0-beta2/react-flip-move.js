(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["FlipMove"] = factory(require("react"), require("react-dom"));
	else
		root["FlipMove"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__) {
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

	/**
	 * React Flip Move
	 * (c) 2016-present Joshua Comeau
	 */
	module.exports = __webpack_require__(3);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.convertToInt = convertToInt;
	exports.convertAllToInt = convertAllToInt;
	exports.filterNewItems = filterNewItems;
	exports.applyStylesToDOMNode = applyStylesToDOMNode;
	exports.whichTransitionEvent = whichTransitionEvent;
	/**
	 * React Flip Move
	 * (c) 2016-present Joshua Comeau
	 */

	function convertToInt(val, propName) {
	  var int = typeof val === 'string' ? parseInt(val) : val;

	  if (isNaN(int)) {
	    console.error('Invalid prop \'' + propName + '\' supplied to FlipMove. Expected a number, or a string that can easily be resolved to a number (eg. "100"). Instead, received \'' + val + '\'.');
	  }

	  return int;
	}

	function convertAllToInt() {
	  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
	    values[_key] = arguments[_key];
	  }

	  return values.map(convertToInt);
	}

	function filterNewItems(group1, group2) {
	  var idProp = arguments.length <= 2 || arguments[2] === undefined ? 'key' : arguments[2];

	  // We want to find all items in group2 that are NOT in group1.
	  return group2.filter(function (g2Item) {
	    return !group1.find(function (g1Item) {
	      return g1Item[idProp] === g2Item[idProp];
	    });
	  });
	}

	function applyStylesToDOMNode(domNode, styles) {
	  // Can't just do an object merge because domNode.styles is no regular object.
	  // Need to do it this way for the engine to fire its `set` listeners.
	  Object.keys(styles).forEach(function (key) {
	    domNode.style[key] = styles[key];
	  });
	}

	// Modified from Modernizr
	function whichTransitionEvent() {
	  var transitions = {
	    'transition': 'transitionend',
	    'OTransition': 'oTransitionEnd',
	    'MozTransition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd'
	  };

	  // If we're running in a browserless environment (eg. SSR), it doesn't apply.
	  // Return a string so that it maintains the type that is expected.
	  if (typeof document === 'undefined') return '';

	  var el = document.createElement('fakeelement');

	  for (var t in transitions) {
	    if (el.style[t] !== undefined) return transitions[t];
	  }
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class; /**
	             * React Flip Move
	             * (c) 2016-present Joshua Comeau
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(6);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _helpers = __webpack_require__(1);

	var _propConverter = __webpack_require__(5);

	var _propConverter2 = _interopRequireDefault(_propConverter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var transitionEnd = (0, _helpers.whichTransitionEvent)();

	var FlipMove = (0, _propConverter2.default)(_class = function (_Component) {
	  _inherits(FlipMove, _Component);

	  function FlipMove(props) {
	    _classCallCheck(this, FlipMove);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FlipMove).call(this, props));

	    _this.boundingBoxes = {};

	    _this.parentElement = null;
	    _this.parentBox = null;

	    _this.doesChildNeedToBeAnimated = _this.doesChildNeedToBeAnimated.bind(_this);

	    // Copy props.children into state.
	    // This may seem like an anti-pattern, but there's a very good, complicated
	    // reason for doing so; sometimes, when the props change, we want to "delay"
	    // their render (eg. when the new props don't contain a previous item, we
	    // want to keep that item in the DOM while we animate its exit).
	    _this.state = { children: _this.props.children };

	    // Keep track of remaining animations so we know when to fire the
	    // all-finished callback, and clean up after ourselves.
	    _this.remainingAnimations = 0;
	    _this.childrenToAnimate = {
	      elements: [],
	      domNodes: []
	    };

	    // When leaving items, we apply some over-ride styles to them (position,
	    // top, left). If the item is passed in through props BEFORE the item has
	    // finished leaving, its style will be wrong. So, to prevent any weirdness,
	    // we store the "original" styles here so they can be applied on re-entry.
	    // A crazy edge case, I know.
	    _this.originalDomStyles = {};
	    return _this;
	  }

	  _createClass(FlipMove, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.parentElement = _reactDom2.default.findDOMNode(this);
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(previousProps) {
	      // If the props have changed, trigger an animation.
	      // This check is required so that we don't trigger a re-animation when the
	      // onFinishAll handler is called, at the end of the animation, to remove
	      // exited nodes.
	      if (this.props.children !== previousProps.children) {
	        this.calculateAndAnimateChildren();
	      }
	    }

	    // When the component is handed new props, we need to figure out the "resting"
	    // position of all currently-rendered DOM nodes. We store that data in
	    // this.boundingBoxes, so it can be used later to work out the animation.

	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var _this2 = this;

	      // Calculate the parentBox. This is used to find childBoxes relative
	      // to the parent container, not the viewport.
	      var parentBox = this.parentElement.getBoundingClientRect();

	      // Get the bounding boxes of all currently-rendered, keyed children.
	      var newBoundingBoxes = this.props.children.reduce(function (boxes, child) {
	        // It is possible that a child does not have a `key` property;
	        // Ignore these children, they don't need to be moved.
	        if (!child.key) return boxes;

	        var domNode = _reactDom2.default.findDOMNode(_this2.refs[child.key]);

	        var childBox = domNode.getBoundingClientRect();
	        var relativeBox = {
	          'top': childBox['top'] - parentBox['top'],
	          'left': childBox['left'] - parentBox['left'],
	          'right': parentBox['right'] - childBox['right'],
	          'bottom': parentBox['bottom'] - childBox['bottom']
	        };

	        return _extends({}, boxes, _defineProperty({}, child.key, relativeBox));
	      }, {});

	      this.boundingBoxes = _extends({}, this.boundingBoxes, newBoundingBoxes);

	      // Create our custom list of items.
	      // We use this list instead of props so that we can mutate it.
	      // We're keeping just-deleted nodes for a bit longer, as well as adding a
	      // flag to just-created nodes, so we know they need to be entered.
	      this.setState({
	        children: this.prepareNextChildren(nextProps.children)
	      });
	    }
	  }, {
	    key: 'prepareNextChildren',
	    value: function prepareNextChildren(nextChildren) {
	      var _this3 = this;

	      // We want to:
	      //   - Mark all new children as `entering`
	      //   - Pull in previous children that aren't in nextChildren, and mark them
	      //     as `leaving`
	      //   - Preserve the nextChildren list order, with leaving children in their
	      //     appropriate places.
	      //

	      // Start by marking new children as 'entering'
	      var updatedChildren = nextChildren.map(function (nextChild) {
	        var child = _this3.state.children.find(function (_ref) {
	          var key = _ref.key;
	          return key === nextChild.key;
	        });

	        // If the current child did exist, but it was in the middle of leaving,
	        // we want to treat it as though it's entering
	        var isEntering = !child || child.leaving;

	        return _extends({}, nextChild, { entering: isEntering });
	      });

	      // This is tricky. We want to keep the nextChildren's ordering, but with
	      // any just-removed items maintaining their original position.
	      // eg.
	      //   this.state.children  = [ 1, 2, 3, 4 ]
	      //   nextChildren         = [ 3, 1 ]
	      //
	      // In this example, we've removed the '2' & '4'
	      // We want to end up with:  [ 2, 3, 1, 4 ]
	      //
	      // To accomplish that, we'll iterate through this.state.children. whenever
	      // we find a match, we'll append our `leaving` flag to it, and insert it
	      // into the nextChildren in its ORIGINAL position. Note that, as we keep
	      // inserting old items into the new list, the "original" position will
	      // keep incrementing.
	      var numOfChildrenLeaving = 0;
	      this.state.children.forEach(function (child, index) {
	        var isLeaving = !nextChildren.find(function (_ref2) {
	          var key = _ref2.key;
	          return key === child.key;
	        });

	        if (!isLeaving) return;

	        var nextChild = _extends({}, child, { leaving: true });
	        var nextChildIndex = index + numOfChildrenLeaving;

	        updatedChildren.splice(nextChildIndex, 0, nextChild);
	        numOfChildrenLeaving++;
	      });

	      return updatedChildren;
	    }
	  }, {
	    key: 'calculateAndAnimateChildren',
	    value: function calculateAndAnimateChildren() {
	      var _this4 = this;

	      // Re-calculate the bounding boxes of tracked elements.
	      // Compare to the bounding boxes stored in state.
	      // Animate as required =)

	      // If we've decided to disable animations, we don't want to run any of this!
	      if (this.isAnimationDisabled()) return;

	      this.parentBox = this.parentElement.getBoundingClientRect();

	      // we need to make all leaving nodes "invisible" to the layout calculations
	      // that will take place in the next step (this.animateTransform).
	      if (this.props.enterLeaveAnimation.leave) {
	        var leavingChildren = this.state.children.filter(function (_ref3) {
	          var leaving = _ref3.leaving;
	          return leaving;
	        });

	        leavingChildren.forEach(function (leavingChild) {
	          var domNode = _reactDom2.default.findDOMNode(_this4.refs[leavingChild.key]);
	          var leavingBoundingBox = _this4.boundingBoxes[leavingChild.key];

	          // We need to take the items out of the "flow" of the document, so that
	          // its siblings can move to take its place.
	          // By setting its position to absolute and positioning it where it is,
	          // we can make it leave in-place while its siblings can calculate where
	          // they need to go.
	          // If, however, the 'leave' is interrupted and they're forced to re-enter,
	          // we want to undo this change, and the only way to do that is to preserve
	          // their current styles.
	          _this4.originalDomStyles[leavingChild.key] = {
	            position: domNode.style.position,
	            top: domNode.style.top,
	            left: domNode.style.left,
	            right: domNode.style.right
	          };

	          // For this to work, we have to offset any given `margin`.
	          var computed = _extends({}, window.getComputedStyle(domNode));

	          ['marginTop', 'marginLeft', 'marginRight'].forEach(function (margin) {
	            computed[margin] = Number(computed[margin].replace('px', ''));
	          });

	          domNode.style.position = 'absolute';
	          domNode.style.top = leavingBoundingBox.top - computed.marginTop + 'px';
	          domNode.style.left = leavingBoundingBox.left - computed.marginLeft + 'px';
	          domNode.style.right = leavingBoundingBox.right + computed.marginRight + 'px';
	        });
	      }

	      var dynamicChildren = this.state.children.filter(this.doesChildNeedToBeAnimated);

	      // Next, we need to do all our new layout calculations, and get our new
	      // styles for each item. We'll organize it as an object where the keys
	      // are the item key, and the value is their new 'style'.
	      this.domStyles = dynamicChildren.reduce(function (memo, child) {
	        memo[child.key] = _this4.computeInitialStyles(child);
	        return memo;
	      }, {});

	      // Now that the styles are computed, animate each child individually.
	      dynamicChildren.forEach(function (child, index) {
	        _this4.addChildToAnimationsList(child);
	        _this4.animateTransform(child, index);
	      });
	    }
	  }, {
	    key: 'computeInitialStyles',
	    value: function computeInitialStyles(child) {
	      var style = { transition: '0ms' };

	      var _props$enterLeaveAnim = this.props.enterLeaveAnimation;
	      var enter = _props$enterLeaveAnim.enter;
	      var leave = _props$enterLeaveAnim.leave;

	      if (child.entering) {
	        if (enter) {
	          var original = this.originalDomStyles[child.key] || {};
	          style = _extends({}, style, enter.from, original);
	        }
	      } else if (child.leaving) {
	        if (leave) {
	          style = _extends({}, style, leave.from);
	        }
	      } else {
	        var domNode = _reactDom2.default.findDOMNode(this.refs[child.key]);

	        var _getPositionDelta = this.getPositionDelta(domNode, child.key);

	        var _getPositionDelta2 = _slicedToArray(_getPositionDelta, 2);

	        var dX = _getPositionDelta2[0];
	        var dY = _getPositionDelta2[1];

	        style.transform = 'translate(' + dX + 'px, ' + dY + 'px)';
	      }

	      return style;
	    }
	  }, {
	    key: 'isAnimationDisabled',
	    value: function isAnimationDisabled() {
	      // If the component is explicitly passed a `disableAnimations` flag,
	      // we can skip this whole process. Similarly, if all of the numbers have
	      // been set to 0, there is no point in trying to animate; doing so would
	      // only cause a flicker (and the intent is probably to disable animations)
	      return this.props.disableAnimations || this.props.duration === 0 && this.props.delay === 0 && this.props.staggerDurationBy === 0 && this.props.staggerDelayBy === 0;
	    }
	  }, {
	    key: 'doesChildNeedToBeAnimated',
	    value: function doesChildNeedToBeAnimated(child) {
	      // If the child doesn't have a key, it's an immovable child (one that we
	      // do not want to do flip stuff to.)
	      if (!child.key) return;

	      if (child.entering && this.props.enterLeaveAnimation.enter || child.leaving && this.props.enterLeaveAnimation.leave) {
	        return true;
	      }

	      // Otherwise, we only want to animate it if the child's position on-screen
	      // has changed. Let's figure that out.
	      var domNode = _reactDom2.default.findDOMNode(this.refs[child.key]);

	      var _getPositionDelta3 = this.getPositionDelta(domNode, child.key);

	      var _getPositionDelta4 = _slicedToArray(_getPositionDelta3, 2);

	      var dX = _getPositionDelta4[0];
	      var dY = _getPositionDelta4[1];

	      return dX !== 0 || dY !== 0;
	    }
	  }, {
	    key: 'addChildToAnimationsList',
	    value: function addChildToAnimationsList(child) {
	      // Add this child to the animations array. This is used for working out
	      // when all children have finished animated (so that the onFinishAll
	      // callback can be fired, and so we can do some cleanup).
	      var domNode = _reactDom2.default.findDOMNode(this.refs[child.key]);

	      this.remainingAnimations++;
	      this.childrenToAnimate.elements.push(child);
	      this.childrenToAnimate.domNodes.push(domNode);
	    }
	  }, {
	    key: 'animateTransform',
	    value: function animateTransform(child, n) {
	      var _this5 = this;

	      var domNode = _reactDom2.default.findDOMNode(this.refs[child.key]);
	      var styles = this.domStyles[child.key];

	      // Apply the relevant style for this DOM node
	      (0, _helpers.applyStylesToDOMNode)(domNode, styles);

	      // Sadly, this is the most browser-compatible way to do this I've found.
	      // Essentially we need to set the initial styles outside of any request
	      // callbacks to avoid batching them. Then, a frame needs to pass with
	      // the styles above rendered. Then, on the second frame, we can apply
	      // our final styles to perform the animation.
	      requestAnimationFrame(function () {
	        requestAnimationFrame(function () {
	          var styles = {
	            transition: _this5.createTransitionString(n),
	            transform: '',
	            opacity: ''
	          };

	          var _props$enterLeaveAnim2 = _this5.props.enterLeaveAnimation;
	          var enter = _props$enterLeaveAnim2.enter;
	          var leave = _props$enterLeaveAnim2.leave;

	          if (child.entering && enter) {
	            styles = _extends({}, styles, enter.to);
	          } else if (child.leaving && leave) {
	            styles = _extends({}, styles, leave.to);
	          }

	          (0, _helpers.applyStylesToDOMNode)(domNode, styles);
	        });
	      });

	      // Trigger the onStart callback immediately.
	      if (this.props.onStart) this.props.onStart(child, domNode);

	      // The onFinish callback needs to be bound to the transitionEnd event.
	      // We also need to unbind it when the transition completes, so this ugly
	      // inline function is required (we need it here so it closes over
	      // dependent variables `child` and `domNode`)
	      var transitionEndHandler = function transitionEndHandler() {
	        // Remove the 'transition' inline style we added. This is cleanup.
	        domNode.style.transition = '';

	        // Trigger any applicable onFinish/onFinishAll hooks
	        _this5.triggerFinishHooks(child, domNode);

	        domNode.removeEventListener(transitionEnd, transitionEndHandler);
	      };

	      domNode.addEventListener(transitionEnd, transitionEndHandler);
	    }
	  }, {
	    key: 'getPositionDelta',
	    value: function getPositionDelta(domNode, key) {
	      var newBox = domNode.getBoundingClientRect();
	      var oldBox = this.boundingBoxes[key];
	      var relativeBox = {
	        top: newBox.top - this.parentBox.top,
	        left: newBox.left - this.parentBox.left
	      };

	      return [oldBox.left - relativeBox.left, oldBox.top - relativeBox.top];
	    }
	  }, {
	    key: 'createTransitionString',
	    value: function createTransitionString(n) {
	      var props = arguments.length <= 1 || arguments[1] === undefined ? ['transform', 'opacity'] : arguments[1];
	      var _props = this.props;
	      var duration = _props.duration;
	      var staggerDurationBy = _props.staggerDurationBy;
	      var delay = _props.delay;
	      var staggerDelayBy = _props.staggerDelayBy;
	      var easing = _props.easing;

	      delay += n * staggerDelayBy;
	      duration += n * staggerDurationBy;

	      return props.map(function (prop) {
	        return prop + ' ' + duration + 'ms ' + easing + ' ' + delay + 'ms';
	      }).join(', ');
	    }
	  }, {
	    key: 'triggerFinishHooks',
	    value: function triggerFinishHooks(child, domNode) {
	      if (this.props.onFinish) this.props.onFinish(child, domNode);

	      // Reduce the number of children we need to animate by 1,
	      // so that we can tell when all children have finished.
	      this.remainingAnimations--;

	      if (this.remainingAnimations === 0) {
	        try {
	          if (typeof this.props.onFinishAll === 'function') {
	            this.props.onFinishAll(this.childrenToAnimate.elements, this.childrenToAnimate.domNodes);
	          }
	        } finally {
	          // Reset our variables for the next iteration
	          this.childrenToAnimate.elements = [];
	          this.childrenToAnimate.domNodes = [];

	          var nextChildren = this.state.children.filter(function (_ref4) {
	            var leaving = _ref4.leaving;
	            return !leaving;
	          }).map(function (item) {
	            item.entering = false;
	            return item;
	          });

	          this.originalDomStyles = {};

	          this.setState({ children: nextChildren });
	        }
	      }
	    }
	  }, {
	    key: 'childrenWithRefs',
	    value: function childrenWithRefs() {
	      return this.state.children.map(function (child) {
	        return _react2.default.cloneElement(child, { ref: child.key });
	      });
	    }

	    // MOVE this.items into this.state.children.
	    // THat way, it will re-render with the right kids, without forceUpdate.
	    // Will unify all our language as well.
	    // We do want the component to render whenever the items change; we'll need
	    // to do some poking around to see how this works with interrupted animations.

	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(this.props.typeName, {
	        className: this.props.className,
	        style: { position: 'relative' }
	      }, this.childrenWithRefs());
	    }
	  }]);

	  return FlipMove;
	}(_react.Component)) || _class;

	exports.default = FlipMove;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * React Flip Move | enterLeavePresets
	 * (c) 2016-present Joshua Comeau
	 *
	 * This contains the master list of presets available for enter/leave animations,
	 * along with the mapping between preset and styles.
	 */

	var enterLeavePresets = {
	  'elevator': {
	    enter: {
	      from: { transform: 'scale(0)', opacity: 0 },
	      to: { transform: '', opacity: '' }
	    },
	    leave: {
	      from: { transform: 'scale(1)', opacity: 1 },
	      to: { transform: 'scale(0)', opacity: 0 }
	    }
	  },
	  'fade': {
	    enter: {
	      from: { opacity: 0 },
	      to: { opacity: '' }
	    },
	    leave: {
	      from: { opacity: 1 },
	      to: { opacity: 0 }
	    }
	  },
	  'accordianVertical': {
	    enter: {
	      from: { transform: 'scaleY(0)', transformOrigin: 'center top' },
	      to: { transform: '', transformOrigin: 'center top' }
	    },
	    leave: {
	      from: { transform: 'scaleY(1)', transformOrigin: 'center top' },
	      to: { transform: 'scaleY(0)', transformOrigin: 'center top' }
	    }
	  },
	  'accordianHorizontal': {
	    enter: {
	      from: { transform: 'scaleX(0)', transformOrigin: 'left center' },
	      to: { transform: '', transformOrigin: 'left center' }
	    },
	    leave: {
	      from: { transform: 'scaleX(1)', transformOrigin: 'left center' },
	      to: { transform: 'scaleX(0)', transformOrigin: 'left center' }
	    }
	  },
	  'none': {
	    enter: false,
	    leave: false
	  }
	};

	var defaultPreset = exports.defaultPreset = 'elevator';
	var disablePreset = exports.disablePreset = 'none';

	exports.default = enterLeavePresets;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _helpers = __webpack_require__(1);

	var _enterLeavePresets = __webpack_require__(4);

	var _enterLeavePresets2 = _interopRequireDefault(_enterLeavePresets);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * React Flip Move | propConverter
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * (c) 2016-present Joshua Comeau
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Abstracted away a bunch of the messy business with props.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   - propTypes and defaultProps
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   - Type conversion (We accept 'string' and 'number' values for duration,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     delay, and other fields, but we actually need them to be ints.)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   - Children conversion (we need the children to be an array. May not always
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     be, if a single child is passed in.)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	function propConverter(ComposedComponent) {
	  var _class, _temp;

	  return _temp = _class = function (_Component) {
	    _inherits(Converter, _Component);

	    function Converter() {
	      _classCallCheck(this, Converter);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(Converter).apply(this, arguments));
	    }

	    _createClass(Converter, [{
	      key: 'convertProps',
	      value: function convertProps(props) {
	        // Create a non-immutable working copy
	        var workingProps = _extends({}, props);

	        // Do string-to-int conversion for all timing-related props
	        var timingPropNames = ['duration', 'delay', 'staggerDurationBy', 'staggerDelayBy'];

	        timingPropNames.forEach(function (prop) {
	          return workingProps[prop] = (0, _helpers.convertToInt)(workingProps[prop], prop);
	        });

	        // Convert the children to a React.Children array.
	        // This is to ensure we're always working with an array, and not
	        // an only child. There's some weirdness with this.
	        // See: https://github.com/facebook/react/pull/3650/files
	        workingProps.children = _react2.default.Children.toArray(this.props.children);

	        // Convert an enterLeave preset to the real thing
	        workingProps.enterLeaveAnimation = this.convertEnterLeaveAnimation(workingProps.enterLeaveAnimation);

	        return workingProps;
	      }
	    }, {
	      key: 'convertEnterLeaveAnimation',
	      value: function convertEnterLeaveAnimation(enterLeaveAnimation) {
	        var newAnimation = undefined;

	        switch (typeof enterLeaveAnimation === 'undefined' ? 'undefined' : _typeof(enterLeaveAnimation)) {
	          case 'boolean':
	            // If it's true, we want to use the default preset.
	            // If it's false, we want to use the 'none' preset.
	            newAnimation = _enterLeavePresets2.default[enterLeaveAnimation ? _enterLeavePresets.defaultPreset : _enterLeavePresets.disablePreset];
	            break;
	          case 'string':
	            var presetKeys = Object.keys(_enterLeavePresets2.default);
	            if (presetKeys.indexOf(enterLeaveAnimation) === -1) {
	              console.error('You supplied an invalid preset name of \'' + _enterLeavePresets2.default + '\'. The accepted values are: ' + presetKeys.join(', ') + '. Defaulting to ' + _enterLeavePresets.defaultPreset);
	              newAnimation = _enterLeavePresets2.default[_enterLeavePresets.defaultPreset];
	            } else {
	              newAnimation = _enterLeavePresets2.default[enterLeaveAnimation];
	            }
	            break;
	          case 'object':
	            var triggerEvents = Object.keys(enterLeaveAnimation);
	            var hasEnter = triggerEvents.indexOf('enter') !== -1;
	            var hasLeave = triggerEvents.indexOf('leave') !== -1;

	            if (!hasEnter && !hasLeave) {
	              console.error("Please provide an `enter` or `leave` property when supplying a custom enterLeaveAnimation object.");
	            }

	            // TODO: More thorough validation? Ensure that a `from`/`to` is
	            // provided, ensure valid CSS properties?

	            newAnimation = enterLeaveAnimation;
	            break;
	        }

	        return newAnimation;
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        console.log(this.props.enterLeaveAnimation);
	        return _react2.default.createElement(ComposedComponent, this.convertProps(this.props));
	      }
	    }]);

	    return Converter;
	  }(_react.Component), _class.propTypes = {
	    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]).isRequired,
	    easing: _react.PropTypes.string,
	    duration: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	    delay: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	    staggerDurationBy: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	    staggerDelayBy: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	    onStart: _react.PropTypes.func,
	    onFinish: _react.PropTypes.func,
	    onFinishAll: _react.PropTypes.func,
	    className: _react.PropTypes.string,
	    typeName: _react.PropTypes.string,
	    disableAnimations: _react.PropTypes.bool,
	    enterLeaveAnimation: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool, _react.PropTypes.object])
	  }, _class.defaultProps = {
	    easing: 'ease-in-out',
	    duration: 350,
	    delay: 0,
	    staggerDurationBy: 0,
	    staggerDelayBy: 0,
	    typeName: 'div',
	    enterLeaveAnimation: _enterLeavePresets.defaultPreset
	  }, _temp;
	}

	exports.default = propConverter;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }
/******/ ])
});
;