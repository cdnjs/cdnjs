(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["FlipMove"] = factory(require("react"), require("react-dom"));
	else
		root["FlipMove"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_13__) {
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
	exports.omit = omit;
	exports.arraysEqual = arraysEqual;
	var isElementAnSFC = exports.isElementAnSFC = function isElementAnSFC(element) {
	  var isNativeDOMElement = typeof element.type === 'string';

	  if (isNativeDOMElement) {
	    return false;
	  }

	  return !element.type.prototype.isReactComponent;
	};

	function omit(obj) {
	  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	  var result = {};
	  Object.keys(obj).forEach(function (key) {
	    if (attrs.indexOf(key) === -1) {
	      result[key] = obj[key];
	    }
	  });
	  return result;
	}

	function arraysEqual(a, b) {
	  var sameObject = a === b;
	  if (sameObject) {
	    return true;
	  }

	  var notBothArrays = !Array.isArray(a) || !Array.isArray(b);
	  var differentLengths = a.length !== b.length;

	  if (notBothArrays || differentLengths) {
	    return false;
	  }

	  return a.every(function (element, index) {
	    return element === b[index];
	  });
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(7);

	var _propConverter = __webpack_require__(8);

	var _propConverter2 = _interopRequireDefault(_propConverter);

	var _domManipulation = __webpack_require__(4);

	var _helpers = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * React Flip Move
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * (c) 2016-present Joshua Comeau
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * For information on how this code is laid out, check out CODE_TOUR.md
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	/* eslint-disable react/prop-types */

	var transitionEnd = (0, _domManipulation.whichTransitionEvent)();
	var noBrowserSupport = !transitionEnd;

	var FlipMove = function (_Component) {
	  _inherits(FlipMove, _Component);

	  function FlipMove(props) {
	    _classCallCheck(this, FlipMove);

	    // FlipMove needs to know quite a bit about its children in order to do
	    // its job. We store these as a property on the instance. We're not using
	    // state, because we don't want changes to trigger re-renders, we just
	    // need a place to keep the data for reference, when changes happen.
	    var _this = _possibleConstructorReturn(this, (FlipMove.__proto__ || Object.getPrototypeOf(FlipMove)).call(this, props));

	    _this.childrenData = {
	      /* Populated via callback refs on render. eg
	      userSpecifiedKey1: {
	        domNode: <domNode>,
	        boundingBox: { top, left, right, bottom, width, height },
	      },
	      userSpecifiedKey2: { ... },
	      ...
	      */
	    };

	    // Similarly, track the dom node and box of our parent element.
	    _this.parentData = {
	      domNode: null,
	      boundingBox: null
	    };

	    // If `maintainContainerHeight` prop is set to true, we'll create a
	    // placeholder element which occupies space so that the parent height
	    // doesn't change when items are removed from the document flow (which
	    // happens during leave animations)
	    _this.heightPlaceholderData = {
	      domNode: null
	    };

	    // Copy props.children into state.
	    // To understand why this is important (and not an anti-pattern), consider
	    // how "leave" animations work. An item has "left" when the component
	    // receives a new set of props that do NOT contain the item.
	    // If we just render the props as-is, the item would instantly disappear.
	    // We want to keep the item rendered for a little while, until its animation
	    // can complete. Because we cannot mutate props, we make `state` the source
	    // of truth.
	    _this.state = {
	      children: _react.Children.toArray(props.children).map(function (child) {
	        return _extends({}, child, {
	          appearing: true
	        });
	      })
	    };

	    // Keep track of remaining animations so we know when to fire the
	    // all-finished callback, and clean up after ourselves.
	    // NOTE: we can't simply use childrenToAnimate.length to track remaining
	    // animations, because we need to maintain the list of animating children,
	    // to pass to the `onFinishAll` handler.
	    _this.remainingAnimations = 0;
	    _this.childrenToAnimate = [];

	    _this.doesChildNeedToBeAnimated = _this.doesChildNeedToBeAnimated.bind(_this);
	    _this.runAnimation = _this.runAnimation.bind(_this);
	    return _this;
	  }

	  _createClass(FlipMove, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // Run our `appearAnimation` if it was requested, right after the
	      // component mounts.
	      var shouldTriggerFLIP = this.props.appearAnimation && !this.isAnimationDisabled(this.props);

	      if (shouldTriggerFLIP) {
	        this.prepForAnimation();
	        this.runAnimation();
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      // When the component is handed new props, we need to figure out the
	      // "resting" position of all currently-rendered DOM nodes.
	      // We store that data in this.parent and this.children,
	      // so it can be used later to work out the animation.
	      this.updateBoundingBoxCaches();

	      // Convert opaque children object to array.
	      var nextChildren = _react.Children.toArray(nextProps.children);

	      // Next, we need to update our state, so that it contains our new set of
	      // children. If animation is disabled or unsupported, this is easy;
	      // we just copy our props into state.
	      // Assuming that we can animate, though, we have to do some work.
	      // Essentially, we want to keep just-deleted nodes in the DOM for a bit
	      // longer, so that we can animate them away.
	      this.setState({
	        children: this.isAnimationDisabled(nextProps) ? nextChildren : this.calculateNextSetOfChildren(nextChildren)
	      });
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(previousProps) {
	      // If the children have been re-arranged, moved, or added/removed,
	      // trigger the main FLIP animation.
	      //
	      // IMPORTANT: We need to make sure that the children have actually changed.
	      // At the end of the transition, we clean up nodes that need to be removed.
	      // We DON'T want this cleanup to trigger another update.

	      var oldChildrenKeys = _react.Children.toArray(this.props.children).map(function (d) {
	        return d.key;
	      });
	      var nextChildrenKeys = _react.Children.toArray(previousProps.children).map(function (d) {
	        return d.key;
	      });

	      var shouldTriggerFLIP = !(0, _helpers.arraysEqual)(oldChildrenKeys, nextChildrenKeys) && !this.isAnimationDisabled(this.props);

	      if (shouldTriggerFLIP) {
	        this.prepForAnimation();
	        this.runAnimation();
	      }
	    }
	  }, {
	    key: 'calculateNextSetOfChildren',
	    value: function calculateNextSetOfChildren(nextChildren) {
	      var _this2 = this;

	      // We want to:
	      //   - Mark all new children as `entering`
	      //   - Pull in previous children that aren't in nextChildren, and mark them
	      //     as `leaving`
	      //   - Preserve the nextChildren list order, with leaving children in their
	      //     appropriate places.
	      //

	      // Start by marking new children as 'entering'
	      var updatedChildren = nextChildren.map(function (nextChild) {
	        var child = _this2.findChildByKey(nextChild.key);

	        // If the current child did exist, but it was in the midst of leaving,
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
	        var isLeaving = !nextChildren.find(function (_ref) {
	          var key = _ref.key;
	          return key === child.key;
	        });

	        // If the child isn't leaving (or, if there is no leave animation),
	        // we don't need to add it into the state children.
	        if (!isLeaving || !_this2.props.leaveAnimation) return;

	        var nextChild = _extends({}, child, { leaving: true });
	        var nextChildIndex = index + numOfChildrenLeaving;

	        updatedChildren.splice(nextChildIndex, 0, nextChild);
	        numOfChildrenLeaving += 1;
	      });

	      return updatedChildren;
	    }
	  }, {
	    key: 'prepForAnimation',
	    value: function prepForAnimation() {
	      var _this3 = this;

	      // Our animation prep consists of:
	      // - remove children that are leaving from the DOM flow, so that the new
	      //   layout can be accurately calculated,
	      // - update the placeholder container height, if needed, to ensure that
	      //   the parent's height doesn't collapse.

	      var _props = this.props,
	          leaveAnimation = _props.leaveAnimation,
	          maintainContainerHeight = _props.maintainContainerHeight,
	          getPosition = _props.getPosition;

	      // we need to make all leaving nodes "invisible" to the layout calculations
	      // that will take place in the next step (this.runAnimation).

	      if (leaveAnimation) {
	        var leavingChildren = this.state.children.filter(function (child) {
	          return !!child.leaving;
	        });

	        leavingChildren.forEach(function (leavingChild) {
	          var childData = _this3.childrenData[leavingChild.key];

	          // We need to take the items out of the "flow" of the document, so that
	          // its siblings can move to take its place.
	          if (childData.boundingBox) {
	            (0, _domManipulation.removeNodeFromDOMFlow)(childData, _this3.props.verticalAlignment);
	          }
	        });

	        if (maintainContainerHeight) {
	          (0, _domManipulation.updateHeightPlaceholder)({
	            domNode: this.heightPlaceholderData.domNode,
	            parentData: this.parentData,
	            getPosition: getPosition
	          });
	        }
	      }

	      // For all children not in the middle of entering or leaving,
	      // we need to reset the transition, so that the NEW shuffle starts from
	      // the right place.
	      this.state.children.forEach(function (child) {
	        var _ref2 = _this3.childrenData[child.key] || {},
	            domNode = _ref2.domNode;

	        // Ignore children that don't render DOM nodes (eg. by returning null)


	        if (!domNode) {
	          return;
	        }

	        if (!child.entering && !child.leaving) {
	          (0, _domManipulation.applyStylesToDOMNode)({
	            domNode: domNode,
	            styles: {
	              transition: ''
	            }
	          });
	        }
	      });
	    }
	  }, {
	    key: 'runAnimation',
	    value: function runAnimation() {
	      var _this4 = this;

	      var dynamicChildren = this.state.children.filter(this.doesChildNeedToBeAnimated);

	      dynamicChildren.forEach(function (child, n) {
	        _this4.remainingAnimations += 1;
	        _this4.childrenToAnimate.push(child.key);
	        _this4.animateChild(child, n);
	      });

	      if (this.props.onStartAll) {
	        var _formatChildrenForHoo = this.formatChildrenForHooks(),
	            _formatChildrenForHoo2 = _slicedToArray(_formatChildrenForHoo, 2),
	            elements = _formatChildrenForHoo2[0],
	            domNodes = _formatChildrenForHoo2[1];

	        this.props.onStartAll(elements, domNodes);
	      }
	    }
	  }, {
	    key: 'animateChild',
	    value: function animateChild(child, index) {
	      var _this5 = this;

	      var domNode = this.childrenData[child.key].domNode;

	      // Apply the relevant style for this DOM node
	      // This is the offset from its actual DOM position.
	      // eg. if an item has been re-rendered 20px lower, we want to apply a
	      // style of 'transform: translate(-20px)', so that it appears to be where
	      // it started.
	      // In FLIP terminology, this is the 'Invert' stage.

	      (0, _domManipulation.applyStylesToDOMNode)({
	        domNode: domNode,
	        styles: this.computeInitialStyles(child)
	      });

	      // Start by invoking the onStart callback for this child.
	      if (this.props.onStart) this.props.onStart(child, domNode);

	      // Next, animate the item from it's artificially-offset position to its
	      // new, natural position.
	      requestAnimationFrame(function () {
	        requestAnimationFrame(function () {
	          // NOTE, RE: the double-requestAnimationFrame:
	          // Sadly, this is the most browser-compatible way to do this I've found.
	          // Essentially we need to set the initial styles outside of any request
	          // callbacks to avoid batching them. Then, a frame needs to pass with
	          // the styles above rendered. Then, on the second frame, we can apply
	          // our final styles to perform the animation.

	          // Our first order of business is to "undo" the styles applied in the
	          // previous frames, while also adding a `transition` property.
	          // This way, the item will smoothly transition from its old position
	          // to its new position.
	          var styles = {
	            transition: (0, _domManipulation.createTransitionString)(index, _this5.props),
	            transform: '',
	            opacity: ''
	          };

	          if (child.appearing && _this5.props.appearAnimation) {
	            styles = _extends({}, styles, _this5.props.appearAnimation.to);
	          } else if (child.entering && _this5.props.enterAnimation) {
	            styles = _extends({}, styles, _this5.props.enterAnimation.to);
	          } else if (child.leaving && _this5.props.leaveAnimation) {
	            styles = _extends({}, styles, _this5.props.leaveAnimation.to);
	          }

	          // In FLIP terminology, this is the 'Play' stage.
	          (0, _domManipulation.applyStylesToDOMNode)({ domNode: domNode, styles: styles });
	        });
	      });

	      this.bindTransitionEndHandler(child);
	    }
	  }, {
	    key: 'bindTransitionEndHandler',
	    value: function bindTransitionEndHandler(child) {
	      var _this6 = this;

	      var domNode = this.childrenData[child.key].domNode;

	      // The onFinish callback needs to be bound to the transitionEnd event.
	      // We also need to unbind it when the transition completes, so this ugly
	      // inline function is required (we need it here so it closes over
	      // dependent variables `child` and `domNode`)

	      var transitionEndHandler = function transitionEndHandler(ev) {
	        // It's possible that this handler is fired not on our primary transition,
	        // but on a nested transition (eg. a hover effect). Ignore these cases.
	        if (ev.target !== domNode) return;

	        // Remove the 'transition' inline style we added. This is cleanup.
	        domNode.style.transition = '';

	        // Trigger any applicable onFinish/onFinishAll hooks
	        _this6.triggerFinishHooks(child, domNode);

	        domNode.removeEventListener(transitionEnd, transitionEndHandler);

	        if (child.leaving) {
	          delete _this6.childrenData[child.key];
	        }
	      };

	      domNode.addEventListener(transitionEnd, transitionEndHandler);
	    }
	  }, {
	    key: 'triggerFinishHooks',
	    value: function triggerFinishHooks(child, domNode) {
	      var _this7 = this;

	      if (this.props.onFinish) this.props.onFinish(child, domNode);

	      // Reduce the number of children we need to animate by 1,
	      // so that we can tell when all children have finished.
	      this.remainingAnimations -= 1;

	      if (this.remainingAnimations === 0) {
	        // Remove any items from the DOM that have left, and reset `entering`.
	        var nextChildren = this.state.children.filter(function (_ref3) {
	          var leaving = _ref3.leaving;
	          return !leaving;
	        }).map(function (item) {
	          return _extends({}, item, {
	            appearing: false,
	            entering: false
	          });
	        });

	        this.setState({ children: nextChildren }, function () {
	          if (typeof _this7.props.onFinishAll === 'function') {
	            var _formatChildrenForHoo3 = _this7.formatChildrenForHooks(),
	                _formatChildrenForHoo4 = _slicedToArray(_formatChildrenForHoo3, 2),
	                elements = _formatChildrenForHoo4[0],
	                domNodes = _formatChildrenForHoo4[1];

	            _this7.props.onFinishAll(elements, domNodes);
	          }

	          // Reset our variables for the next iteration
	          _this7.childrenToAnimate = [];
	        });

	        // If the placeholder was holding the container open while elements were
	        // leaving, we we can now set its height to zero.
	        if (this.heightPlaceholderData.domNode !== null) {
	          this.heightPlaceholderData.domNode.style.height = 0;
	        }
	      }
	    }
	  }, {
	    key: 'formatChildrenForHooks',
	    value: function formatChildrenForHooks() {
	      var _this8 = this;

	      var elements = [];
	      var domNodes = [];

	      this.childrenToAnimate.forEach(function (childKey) {
	        // If this was an exit animation, the child may no longer exist.
	        // If so, skip it.
	        var element = _this8.findChildByKey(childKey);

	        if (!element) {
	          return;
	        }

	        elements.push(element);
	        domNodes.push(_this8.childrenData[childKey].domNode);
	      });

	      return [elements, domNodes];
	    }
	  }, {
	    key: 'updateBoundingBoxCaches',
	    value: function updateBoundingBoxCaches() {
	      var _this9 = this;

	      // This is the ONLY place that parentData and childrenData's
	      // bounding boxes are updated. They will be calculated at other times
	      // to be compared to this value, but it's important that the cache is
	      // updated once per update.
	      this.parentData.boundingBox = this.props.getPosition(this.parentData.domNode);

	      this.state.children.forEach(function (child) {
	        // It is possible that a child does not have a `key` property;
	        // Ignore these children, they don't need to be moved.
	        if (!child.key) {
	          return;
	        }

	        var childData = _this9.childrenData[child.key];

	        // In very rare circumstances, for reasons unknown, the ref is never
	        // populated for certain children. In this case, avoid doing this update.
	        // see: https://github.com/joshwcomeau/react-flip-move/pull/91
	        if (!childData) {
	          return;
	        }

	        // If the child element returns null, we need to avoid trying to
	        // account for it
	        if (!childData.domNode) {
	          return;
	        }

	        childData.boundingBox = (0, _domManipulation.getRelativeBoundingBox)({
	          childData: childData,
	          parentData: _this9.parentData,
	          getPosition: _this9.props.getPosition
	        });
	      });
	    }
	  }, {
	    key: 'computeInitialStyles',
	    value: function computeInitialStyles(child) {
	      var noAnimationRequestedForThisEvent = child.appearing && !this.props.appearAnimation || child.entering && !this.props.enterAnimation || child.leaving && !this.props.leaveAnimation;

	      if (noAnimationRequestedForThisEvent) {
	        return {};
	      }

	      if (child.appearing) {
	        return this.props.appearAnimation.from;
	      } else if (child.entering) {
	        // If this child was in the middle of leaving, it still has its
	        // absolute positioning styles applied. We need to undo those.
	        return _extends({
	          position: '',
	          top: '',
	          left: '',
	          right: '',
	          bottom: ''
	        }, this.props.enterAnimation.from);
	      } else if (child.leaving) {
	        return this.props.leaveAnimation.from;
	      }

	      var _getPositionDelta = (0, _domManipulation.getPositionDelta)({
	        childData: this.childrenData[child.key],
	        parentData: this.parentData,
	        getPosition: this.props.getPosition
	      }),
	          _getPositionDelta2 = _slicedToArray(_getPositionDelta, 2),
	          dX = _getPositionDelta2[0],
	          dY = _getPositionDelta2[1];

	      return {
	        transform: 'translate(' + dX + 'px, ' + dY + 'px)'
	      };
	    }

	    // eslint-disable-next-line class-methods-use-this

	  }, {
	    key: 'isAnimationDisabled',
	    value: function isAnimationDisabled(props) {
	      // If the component is explicitly passed a `disableAllAnimations` flag,
	      // we can skip this whole process. Similarly, if all of the numbers have
	      // been set to 0, there is no point in trying to animate; doing so would
	      // only cause a flicker (and the intent is probably to disable animations)
	      // We can also skip this rigamarole if there's no browser support for it.
	      return noBrowserSupport || props.disableAllAnimations || props.duration === 0 && props.delay === 0 && props.staggerDurationBy === 0 && props.staggerDelayBy === 0;
	    }
	  }, {
	    key: 'doesChildNeedToBeAnimated',
	    value: function doesChildNeedToBeAnimated(child) {
	      // If the child doesn't have a key, it's an immovable child (one that we
	      // do not want to do FLIP stuff to.)
	      if (!child.key) {
	        return false;
	      }

	      var childData = this.childrenData[child.key];

	      if (!childData || !childData.domNode) {
	        return false;
	      }

	      var _props2 = this.props,
	          appearAnimation = _props2.appearAnimation,
	          enterAnimation = _props2.enterAnimation,
	          leaveAnimation = _props2.leaveAnimation,
	          getPosition = _props2.getPosition;


	      var isAppearingWithAnimation = child.appearing && appearAnimation;
	      var isEnteringWithAnimation = child.entering && enterAnimation;
	      var isLeavingWithAnimation = child.leaving && leaveAnimation;

	      if (isAppearingWithAnimation || isEnteringWithAnimation || isLeavingWithAnimation) {
	        return true;
	      }

	      // If it isn't entering/leaving, we want to animate it if it's
	      // on-screen position has changed.

	      var _getPositionDelta3 = (0, _domManipulation.getPositionDelta)({
	        childData: childData,
	        parentData: this.parentData,
	        getPosition: getPosition
	      }),
	          _getPositionDelta4 = _slicedToArray(_getPositionDelta3, 2),
	          dX = _getPositionDelta4[0],
	          dY = _getPositionDelta4[1];

	      return dX !== 0 || dY !== 0;
	    }
	  }, {
	    key: 'findChildByKey',
	    value: function findChildByKey(key) {
	      return this.state.children.find(function (child) {
	        return child.key === key;
	      });
	    }
	  }, {
	    key: 'createHeightPlaceholder',
	    value: function createHeightPlaceholder() {
	      var _this10 = this;

	      var typeName = this.props.typeName;

	      // If requested, create an invisible element at the end of the list.
	      // Its height will be modified to prevent the container from collapsing
	      // prematurely.

	      var isContainerAList = typeName === 'ul' || typeName === 'ol';
	      var placeholderType = isContainerAList ? 'li' : 'div';

	      return _react2.default.createElement(placeholderType, {
	        key: 'height-placeholder',
	        ref: function ref(domNode) {
	          _this10.heightPlaceholderData.domNode = domNode;
	        },
	        style: { visibility: 'hidden', height: 0 }
	      });
	    }
	  }, {
	    key: 'childrenWithRefs',
	    value: function childrenWithRefs() {
	      var _this11 = this;

	      // We need to clone the provided children, capturing a reference to the
	      // underlying DOM node. Flip Move needs to use the React escape hatches to
	      // be able to do its calculations.
	      return this.state.children.map(function (child) {
	        return _react2.default.cloneElement(child, {
	          ref: function ref(element) {
	            // Stateless Functional Components are not supported by FlipMove,
	            // because they don't have instances.
	            if (!element) {
	              return;
	            }

	            var domNode = (0, _domManipulation.getNativeNode)(element);

	            // If this is the first render, we need to create the data entry
	            if (!_this11.childrenData[child.key]) {
	              _this11.childrenData[child.key] = {};
	            }

	            _this11.childrenData[child.key].domNode = domNode;
	          }
	        });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this12 = this;

	      var _props3 = this.props,
	          typeName = _props3.typeName,
	          delegated = _props3.delegated,
	          leaveAnimation = _props3.leaveAnimation,
	          maintainContainerHeight = _props3.maintainContainerHeight;


	      var props = _extends({}, delegated, {
	        ref: function ref(node) {
	          _this12.parentData.domNode = node;
	        }
	      });

	      var children = this.childrenWithRefs();
	      if (leaveAnimation && maintainContainerHeight) {
	        children.push(this.createHeightPlaceholder());
	      }

	      return _react2.default.createElement(typeName, props, children);
	    }
	  }]);

	  return FlipMove;
	}(_react.Component);

	exports.default = (0, _propConverter2.default)(FlipMove);
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createTransitionString = exports.getNativeNode = exports.updateHeightPlaceholder = exports.removeNodeFromDOMFlow = exports.getPositionDelta = exports.getRelativeBoundingBox = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
	                                                                                                                                                                                                                                                                   * React Flip Move
	                                                                                                                                                                                                                                                                   * (c) 2016-present Joshua Comeau
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * These methods read from and write to the DOM.
	                                                                                                                                                                                                                                                                   * They almost always have side effects, and will hopefully become the
	                                                                                                                                                                                                                                                                   * only spot in the codebase with impure functions.
	                                                                                                                                                                                                                                                                   */


	exports.applyStylesToDOMNode = applyStylesToDOMNode;
	exports.whichTransitionEvent = whichTransitionEvent;

	var _reactDom = __webpack_require__(13);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function applyStylesToDOMNode(_ref) {
	  var domNode = _ref.domNode,
	      styles = _ref.styles;

	  // Can't just do an object merge because domNode.styles is no regular object.
	  // Need to do it this way for the engine to fire its `set` listeners.
	  Object.keys(styles).forEach(function (key) {
	    // eslint-disable-next-line no-param-reassign
	    domNode.style[key] = styles[key];
	  });
	}

	// Modified from Modernizr
	function whichTransitionEvent() {
	  var transitions = {
	    transition: 'transitionend',
	    OTransition: 'oTransitionEnd',
	    MozTransition: 'transitionend',
	    WebkitTransition: 'webkitTransitionEnd'
	  };

	  // If we're running in a browserless environment (eg. SSR), it doesn't apply.
	  // Return a placeholder string, for consistent type return.
	  if (typeof document === 'undefined') return '';

	  var el = document.createElement('fakeelement');

	  var match = Object.keys(transitions).find(function (t) {
	    return el.style[t] !== undefined;
	  });

	  // If no `transition` is found, we must be running in a browser so ancient,
	  // React itself won't run. Return an empty string, for consistent type return
	  return match ? transitions[match] : '';
	}

	var getRelativeBoundingBox = exports.getRelativeBoundingBox = function getRelativeBoundingBox(_ref2) {
	  var childData = _ref2.childData,
	      parentData = _ref2.parentData,
	      getPosition = _ref2.getPosition;
	  var childDomNode = childData.domNode;
	  var parentDomNode = parentData.domNode;


	  var parentBox = getPosition(parentDomNode);

	  var _getPosition = getPosition(childDomNode),
	      top = _getPosition.top,
	      left = _getPosition.left,
	      right = _getPosition.right,
	      bottom = _getPosition.bottom,
	      width = _getPosition.width,
	      height = _getPosition.height;

	  return {
	    top: top - parentBox.top,
	    left: left - parentBox.left,
	    right: parentBox.right - right,
	    bottom: parentBox.bottom - bottom,
	    width: width,
	    height: height
	  };
	};

	/** getPositionDelta
	 * This method returns the delta between two bounding boxes, to figure out
	 * how mant pixels on each axis the element has moved.
	 *
	 * @param {Object} childData - needs shape { domNode, boundingBox }
	 * @param {Object} parentData - needs shape { domNode, boundingBox }
	 * @param {Function} getPosition - the function called to get bounding boxes
	 * for a DOM node. Defaults to `getBoundingClientRect`.
	 *
	 * @returns [{Number: left}, {Number: top}]
	 */
	var getPositionDelta = exports.getPositionDelta = function getPositionDelta(_ref3) {
	  var childData = _ref3.childData,
	      parentData = _ref3.parentData,
	      getPosition = _ref3.getPosition;

	  // TEMP: A mystery bug is sometimes causing unnecessary boundingBoxes to
	  // remain. Until this bug can be solved, this band-aid fix does the job:
	  var defaultBox = { top: 0, left: 0, right: 0, bottom: 0 };

	  // Our old box is its last calculated position, derived on mount or at the
	  // start of the previous animation.
	  var oldRelativeBox = childData.boundingBox || defaultBox;

	  // Our new box is the new final resting place: Where we expect it to wind up
	  // after the animation. First we get the box in absolute terms (AKA relative
	  // to the viewport), and then we calculate its relative box (relative to the
	  // parent container)
	  var newAbsoluteBox = getPosition(childData.domNode);
	  var newRelativeBox = {
	    top: newAbsoluteBox.top - parentData.boundingBox.top,
	    left: newAbsoluteBox.left - parentData.boundingBox.left
	  };

	  return [oldRelativeBox.left - newRelativeBox.left, oldRelativeBox.top - newRelativeBox.top];
	};

	/** removeNodeFromDOMFlow
	 * This method does something very sneaky: it removes a DOM node from the
	 * document flow, but without actually changing its on-screen position.
	 *
	 * It works by calculating where the node is, and then applying styles
	 * so that it winds up being positioned absolutely, but in exactly the
	 * same place.
	 *
	 * This is a vital part of the FLIP technique.
	 *
	 * @param {Object} domNode - the node we'll be working with
	 * @param {Object} boundingBox - the node's starting position.
	 *
	 * @returns null
	 */
	var removeNodeFromDOMFlow = exports.removeNodeFromDOMFlow = function removeNodeFromDOMFlow(childData, verticalAlignment) {
	  var domNode = childData.domNode,
	      boundingBox = childData.boundingBox;

	  // For this to work, we have to offset any given `margin`.

	  var computed = window.getComputedStyle(domNode);

	  // We need to clean up margins, by converting and removing suffix:
	  // eg. '21px' -> 21
	  var marginAttrs = ['margin-top', 'margin-left', 'margin-right'];
	  var margins = marginAttrs.reduce(function (acc, margin) {
	    var propertyVal = computed.getPropertyValue(margin);

	    return _extends({}, acc, _defineProperty({}, margin, Number(propertyVal.replace('px', ''))));
	  }, {});

	  // If we're bottom-aligned, we need to add the height of the child to its
	  // top offset. This is because, when the container is bottom-aligned, its
	  // height shrinks from the top, not the bottom. We're removing this node
	  // from the flow, so the top is going to drop by its height.
	  var topOffset = verticalAlignment === 'bottom' ? boundingBox.top - boundingBox.height : boundingBox.top;

	  var styles = {
	    position: 'absolute',
	    top: topOffset - margins['margin-top'] + 'px',
	    left: boundingBox.left - margins['margin-left'] + 'px',
	    right: boundingBox.right - margins['margin-right'] + 'px'
	  };

	  applyStylesToDOMNode({ domNode: domNode, styles: styles });
	};

	/** updateHeightPlaceholder
	 * An optional property to FlipMove is a `maintainContainerHeight` boolean.
	 * This property creates a node that fills space, so that the parent
	 * container doesn't collapse when its children are removed from the
	 * document flow.
	 *
	 * @param {Object} domNode - the node we'll be working with
	 * @param {Object} parentData - needs shape { domNode, boundingBox }
	 * @param {Function} getPosition - the function called to get bounding boxes
	 * for a DOM node. Defaults to `getBoundingClientRect`.
	 *
	 * @returns null
	 */
	var updateHeightPlaceholder = exports.updateHeightPlaceholder = function updateHeightPlaceholder(_ref4) {
	  var domNode = _ref4.domNode,
	      parentData = _ref4.parentData,
	      getPosition = _ref4.getPosition;

	  // We need to find the height of the container *without* the placeholder.
	  // Since it's possible that the placeholder might already be present,
	  // we first set its height to 0.
	  // This allows the container to collapse down to the size of just its
	  // content (plus container padding or borders if any).
	  applyStylesToDOMNode({ domNode: domNode, styles: { height: 0 } });

	  // Find the distance by which the container would be collapsed by elements
	  // leaving. We compare the freshly-available parent height with the original,
	  // cached container height.
	  var originalParentHeight = parentData.boundingBox.height;
	  var collapsedParentHeight = getPosition(parentData.domNode).height;
	  var reductionInHeight = originalParentHeight - collapsedParentHeight;

	  // If the container has become shorter, update the padding element's
	  // height to take up the difference. Otherwise set its height to zero,
	  // so that it has no effect.
	  var styles = {
	    height: reductionInHeight > 0 ? reductionInHeight + 'px' : 0
	  };

	  applyStylesToDOMNode({ domNode: domNode, styles: styles });
	};

	var getNativeNode = exports.getNativeNode = function getNativeNode(element) {
	  // When running in a windowless environment, abort!
	  if (typeof HTMLElement === 'undefined') {
	    return null;
	  }

	  // `element` may already be a native node.
	  if (element instanceof HTMLElement) {
	    return element;
	  }

	  // While ReactDOM's `findDOMNode` is discouraged, it's the only
	  // publicly-exposed way to find the underlying DOM node for
	  // composite components.
	  return (0, _reactDom.findDOMNode)(element);
	};

	var createTransitionString = exports.createTransitionString = function createTransitionString(index, props) {
	  var delay = props.delay,
	      duration = props.duration;
	  var staggerDurationBy = props.staggerDurationBy,
	      staggerDelayBy = props.staggerDelayBy,
	      easing = props.easing;


	  delay += index * staggerDelayBy;
	  duration += index * staggerDurationBy;

	  var cssProperties = ['transform', 'opacity'];

	  return cssProperties.map(function (prop) {
	    return prop + ' ' + duration + 'ms ' + easing + ' ' + delay + 'ms';
	  }).join(', ');
	};

/***/ },
/* 5 */
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

	var enterPresets = exports.enterPresets = {
	  elevator: {
	    from: { transform: 'scale(0)', opacity: 0 },
	    to: { transform: '', opacity: '' }
	  },
	  fade: {
	    from: { opacity: 0 },
	    to: { opacity: '' }
	  },
	  accordionVertical: {
	    from: { transform: 'scaleY(0)', transformOrigin: 'center top' },
	    to: { transform: '', transformOrigin: 'center top' }
	  },
	  accordionHorizontal: {
	    from: { transform: 'scaleX(0)', transformOrigin: 'left center' },
	    to: { transform: '', transformOrigin: 'left center' }
	  },
	  none: false
	};

	var leavePresets = exports.leavePresets = {
	  elevator: {
	    from: { transform: 'scale(1)', opacity: 1 },
	    to: { transform: 'scale(0)', opacity: 0 }
	  },
	  fade: {
	    from: { opacity: 1 },
	    to: { opacity: 0 }
	  },
	  accordionVertical: {
	    from: { transform: 'scaleY(1)', transformOrigin: 'center top' },
	    to: { transform: 'scaleY(0)', transformOrigin: 'center top' }
	  },
	  accordionHorizontal: {
	    from: { transform: 'scaleX(1)', transformOrigin: 'left center' },
	    to: { transform: 'scaleX(0)', transformOrigin: 'left center' }
	  },
	  none: false
	};

	// For now, appearPresets will be identical to enterPresets.
	// Assigning a custom export in case we ever want to add appear-specific ones.
	var appearPresets = exports.appearPresets = enterPresets;

	// Embarrassingly enough, v2.0 launched with typo'ed preset names.
	// To avoid penning a new major version over something so inconsequential,
	// we're supporting both spellings. In a future version, these alternatives
	// may be deprecated.
	enterPresets.accordianVertical = enterPresets.accordionVertical;
	enterPresets.accordianHorizontal = enterPresets.accordionHorizontal;
	leavePresets.accordianVertical = leavePresets.accordionVertical;
	leavePresets.accordianHorizontal = leavePresets.accordionHorizontal;

	var defaultPreset = exports.defaultPreset = 'elevator';
	var disablePreset = exports.disablePreset = 'none';

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var statelessFunctionalComponentSupplied = exports.statelessFunctionalComponentSupplied = function statelessFunctionalComponentSupplied() {
	  return "\n>> Error, via react-flip-move <<\n\nYou provided a stateless functional component as a child to <FlipMove>. Unfortunately, SFCs aren't supported, because Flip Move needs access to the backing instances via refs, and SFCs don't have a public instance that holds that info.\n\nPlease wrap your components in a native element (eg. <div>), or a non-functional component.\n";
	};

	var invalidTypeForTimingProp = exports.invalidTypeForTimingProp = function invalidTypeForTimingProp(_ref) {
	  var prop = _ref.prop,
	      value = _ref.value,
	      defaultValue = _ref.defaultValue;
	  return "\n>> Error, via react-flip-move <<\n\nThe prop you provided for '" + prop + "' is invalid. It needs to be a positive integer, or a string that can be resolved to a number. The value you provided is '" + value + "'.\n\nAs a result,  the default value for this parameter will be used, which is '" + defaultValue + "'.\n";
	};

	var deprecatedDisableAnimations = exports.deprecatedDisableAnimations = function deprecatedDisableAnimations() {
	  return "\n>> Warning, via react-flip-move <<\n\nThe 'disableAnimations' prop you provided is deprecated. Please switch to use 'disableAllAnimations'.\n\nThis will become a silent error in future versions of react-flip-move.\n";
	};

	var invalidEnterLeavePreset = exports.invalidEnterLeavePreset = function invalidEnterLeavePreset(_ref2) {
	  var value = _ref2.value,
	      acceptableValues = _ref2.acceptableValues,
	      defaultValue = _ref2.defaultValue;
	  return "\n>> Error, via react-flip-move <<\n\nThe enter/leave preset you provided is invalid. We don't currently have a '" + value + " preset.'\n\nAcceptable values are " + acceptableValues + ". The default value of '" + defaultValue + "' will be used.\n";
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * React Flip Move - Polyfills
	 * (c) 2016-present Joshua Comeau
	 */

	/* eslint-disable */

	if (!Array.prototype.find) {
	  Array.prototype.find = function (predicate) {
	    if (this === null) {
	      throw new TypeError('Array.prototype.find called on null or undefined');
	    }
	    if (typeof predicate !== 'function') {
	      throw new TypeError('predicate must be a function');
	    }
	    var list = Object(this);
	    var length = list.length >>> 0;
	    var thisArg = arguments[1];
	    var value = void 0;

	    for (var i = 0; i < length; i++) {
	      value = list[i];
	      if (predicate.call(thisArg, value, i, list)) {
	        return value;
	      }
	    }
	    return undefined;
	  };
	}

	if (!Array.prototype.every) {
	  Array.prototype.every = function (callbackfn, thisArg) {
	    'use strict';

	    var T, k;

	    if (this == null) {
	      throw new TypeError('this is null or not defined');
	    }

	    var O = Object(this);
	    var len = O.length >>> 0;

	    if (typeof callbackfn !== 'function') {
	      throw new TypeError();
	    }

	    if (arguments.length > 1) {
	      T = thisArg;
	    }

	    k = 0;

	    while (k < len) {

	      var kValue;

	      if (k in O) {
	        kValue = O[k];

	        var testResult = callbackfn.call(T, kValue, k, O);

	        if (!testResult) {
	          return false;
	        }
	      }
	      k++;
	    }
	    return true;
	  };
	}

	if (!Array.isArray) {
	  Array.isArray = function (arg) {
	    return Object.prototype.toString.call(arg) === '[object Array]';
	  };
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(12);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _errorMessages = __webpack_require__(6);

	var _enterLeavePresets = __webpack_require__(5);

	var _helpers = __webpack_require__(1);

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
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   - Resolving animation presets into their base CSS styles
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	/* eslint-disable block-scoped-var */

	var nodeEnv = void 0;
	try {
	  nodeEnv = ("production");
	} catch (e) {
	  nodeEnv = 'development';
	}

	function propConverter(ComposedComponent) {
	  var FlipMovePropConverter = function (_Component) {
	    _inherits(FlipMovePropConverter, _Component);

	    function FlipMovePropConverter() {
	      _classCallCheck(this, FlipMovePropConverter);

	      return _possibleConstructorReturn(this, (FlipMovePropConverter.__proto__ || Object.getPrototypeOf(FlipMovePropConverter)).apply(this, arguments));
	    }

	    _createClass(FlipMovePropConverter, [{
	      key: 'checkForStatelessFunctionalComponents',
	      value: function checkForStatelessFunctionalComponents(children) {
	        // Skip all console warnings in production.
	        // Bail early, to avoid unnecessary work.
	        if (nodeEnv === 'production') {
	          return;
	        }

	        // FlipMove does not support stateless functional components.
	        // Check to see if any supplied components won't work.
	        // If the child doesn't have a key, it means we aren't animating it.
	        // It's allowed to be an SFC, since we ignore it.
	        var noStateless = _react.Children.toArray(children).every(function (child) {
	          return !(0, _helpers.isElementAnSFC)(child) || typeof child.key === 'undefined';
	        });

	        if (!noStateless) {
	          console.warn((0, _errorMessages.statelessFunctionalComponentSupplied)());
	        }
	      }
	    }, {
	      key: 'convertProps',
	      value: function convertProps(props) {
	        var propTypes = FlipMovePropConverter.propTypes,
	            defaultProps = FlipMovePropConverter.defaultProps;

	        // Create a non-immutable working copy

	        var workingProps = _extends({}, props);

	        this.checkForStatelessFunctionalComponents(workingProps.children);

	        // Do string-to-int conversion for all timing-related props
	        var timingPropNames = ['duration', 'delay', 'staggerDurationBy', 'staggerDelayBy'];

	        timingPropNames.forEach(function (prop) {
	          var rawValue = workingProps[prop];
	          var value = typeof rawValue === 'string' ? parseInt(rawValue, 10) : rawValue;

	          if (isNaN(value)) {
	            var defaultValue = defaultProps[prop];

	            if (nodeEnv !== 'production') {
	              console.error((0, _errorMessages.invalidTypeForTimingProp)({
	                prop: prop,
	                value: value,
	                defaultValue: defaultValue
	              }));
	            }

	            value = defaultValue;
	          }

	          workingProps[prop] = value;
	        });

	        // Our enter/leave animations can be specified as boolean (default or
	        // disabled), string (preset name), or object (actual animation values).
	        // Let's standardize this so that they're always objects
	        workingProps.appearAnimation = this.convertAnimationProp(workingProps.appearAnimation, _enterLeavePresets.appearPresets);
	        workingProps.enterAnimation = this.convertAnimationProp(workingProps.enterAnimation, _enterLeavePresets.enterPresets);
	        workingProps.leaveAnimation = this.convertAnimationProp(workingProps.leaveAnimation, _enterLeavePresets.leavePresets);

	        // Accept `disableAnimations`, but add a deprecation warning
	        if (typeof props.disableAnimations !== 'undefined') {
	          if (nodeEnv !== 'production') {
	            console.warn((0, _errorMessages.deprecatedDisableAnimations)());
	          }

	          workingProps.disableAnimations = undefined;
	          workingProps.disableAllAnimations = props.disableAnimations;
	        }

	        // Gather any additional props;
	        // they will be delegated to the ReactElement created.
	        var primaryPropKeys = Object.keys(propTypes);
	        var delegatedProps = (0, _helpers.omit)(this.props, primaryPropKeys);

	        // The FlipMove container element needs to have a non-static position.
	        // We use `relative` by default, but it can be overridden by the user.
	        // Now that we're delegating props, we need to merge this in.
	        delegatedProps.style = _extends({
	          position: 'relative'
	        }, delegatedProps.style);

	        workingProps = (0, _helpers.omit)(workingProps, Object.keys(delegatedProps));
	        workingProps.delegated = delegatedProps;

	        return workingProps;
	      }

	      // eslint-disable-next-line class-methods-use-this

	    }, {
	      key: 'convertAnimationProp',
	      value: function convertAnimationProp(animation, presets) {
	        var newAnimation = void 0;

	        switch (typeof animation === 'undefined' ? 'undefined' : _typeof(animation)) {
	          case 'boolean':
	            {
	              // If it's true, we want to use the default preset.
	              // If it's false, we want to use the 'none' preset.
	              newAnimation = presets[animation ? _enterLeavePresets.defaultPreset : _enterLeavePresets.disablePreset];
	              break;
	            }

	          case 'string':
	            {
	              var presetKeys = Object.keys(presets);

	              if (presetKeys.indexOf(animation) === -1) {
	                if (nodeEnv !== 'production') {
	                  console.error((0, _errorMessages.invalidEnterLeavePreset)({
	                    value: animation,
	                    acceptableValues: presetKeys.join(', '),
	                    defaultValue: _enterLeavePresets.defaultPreset
	                  }));
	                }

	                newAnimation = presets[_enterLeavePresets.defaultPreset];
	              } else {
	                newAnimation = presets[animation];
	              }
	              break;
	            }

	          default:
	            {
	              newAnimation = animation;
	              break;
	            }
	        }

	        return newAnimation;
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return _react2.default.createElement(ComposedComponent, this.convertProps(this.props));
	      }
	    }]);

	    return FlipMovePropConverter;
	  }(_react.Component);

	  var animationPropTypes = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.shape({
	    from: _propTypes2.default.object,
	    to: _propTypes2.default.object
	  })]);

	  FlipMovePropConverter.propTypes = {
	    children: _propTypes2.default.node,
	    easing: _propTypes2.default.string,
	    duration: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	    delay: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	    staggerDurationBy: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	    staggerDelayBy: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	    onStart: _propTypes2.default.func,
	    onFinish: _propTypes2.default.func,
	    onStartAll: _propTypes2.default.func,
	    onFinishAll: _propTypes2.default.func,
	    typeName: _propTypes2.default.string,
	    appearAnimation: animationPropTypes,
	    enterAnimation: animationPropTypes,
	    leaveAnimation: animationPropTypes,
	    disableAllAnimations: _propTypes2.default.bool,
	    getPosition: _propTypes2.default.func,
	    maintainContainerHeight: _propTypes2.default.bool.isRequired,
	    verticalAlignment: _propTypes2.default.oneOf(['top', 'bottom']).isRequired
	  };

	  FlipMovePropConverter.defaultProps = {
	    easing: 'ease-in-out',
	    duration: 350,
	    delay: 0,
	    staggerDurationBy: 0,
	    staggerDelayBy: 0,
	    typeName: 'div',
	    enterAnimation: _enterLeavePresets.defaultPreset,
	    leaveAnimation: _enterLeavePresets.defaultPreset,
	    disableAllAnimations: false,
	    getPosition: function getPosition(node) {
	      return node.getBoundingClientRect();
	    },
	    maintainContainerHeight: false,
	    verticalAlignment: 'top'
	  };

	  return FlipMovePropConverter;
	}

	exports.default = propConverter;
	module.exports = exports['default'];

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

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

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(9);
	var invariant = __webpack_require__(10);

	module.exports = function() {
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  function shim() {
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
	    shape: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
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
	  module.exports = __webpack_require__(11)();
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }
/******/ ])
});
;