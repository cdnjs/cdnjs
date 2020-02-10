(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('react-dom')) :
	typeof define === 'function' && define.amd ? define(['react', 'react-dom'], factory) :
	(global.FlipMove = factory(global.React,global.ReactDOM));
}(this, (function (React,ReactDOM) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;
var ReactDOM__default = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

function warnOnce(msg) {
  var hasWarned = false;
  return function () {
    if (!hasWarned) {
      console.warn(msg);
      hasWarned = true;
    }
  };
}


var statelessFunctionalComponentSupplied = warnOnce('\n>> Error, via react-flip-move <<\n\nYou provided a stateless functional component as a child to <FlipMove>. Unfortunately, SFCs aren\'t supported, because Flip Move needs access to the backing instances via refs, and SFCs don\'t have a public instance that holds that info.\n\nPlease wrap your components in a native element (eg. <div>), or a non-functional component.\n');

var primitiveNodeSupplied = warnOnce('\n>> Error, via react-flip-move <<\n\nYou provided a primitive (text or number) node as a child to <FlipMove>. Flip Move needs containers with unique keys to move children around.\n\nPlease wrap your value in a native element (eg. <span>), or a component.\n');

var invalidTypeForTimingProp = function invalidTypeForTimingProp(args
// prettier-ignore
) {
  return console.error('\n>> Error, via react-flip-move <<\n\nThe prop you provided for \'' + args.prop + '\' is invalid. It needs to be a positive integer, or a string that can be resolved to a number. The value you provided is \'' + args.value + '\'.\n\nAs a result,  the default value for this parameter will be used, which is \'' + args.defaultValue + '\'.\n');
};

var invalidEnterLeavePreset = function invalidEnterLeavePreset(args
// prettier-ignore
) {
  return console.error('\n>> Error, via react-flip-move <<\n\nThe enter/leave preset you provided is invalid. We don\'t currently have a \'' + args.value + ' preset.\'\n\nAcceptable values are ' + args.acceptableValues + '. The default value of \'' + args.defaultValue + '\' will be used.\n');
};

var parentNodePositionStatic = warnOnce('\n>> Warning, via react-flip-move <<\n\nWhen using "wrapperless" mode (by supplying \'typeName\' of \'null\'), strange things happen when the direct parent has the default "static" position.\n\nFlipMove has added \'position: relative\' to this node, to ensure Flip Move animates correctly.\n\nTo avoid seeing this warning, simply apply a non-static position to that parent node.\n');

var childIsDisabled = warnOnce('\n>> Warning, via react-flip-move <<\n\nOne or more of Flip Move\'s child elements have the html attribute \'disabled\' set to true.\n\nPlease note that this will cause animations to break in Internet Explorer 11 and below. Either remove the disabled attribute or set \'animation\' to false.\n');

var enterPresets = {
  elevator: {
    from: { transform: 'scale(0)', opacity: '0' },
    to: { transform: '', opacity: '' }
  },
  fade: {
    from: { opacity: '0' },
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
  none: null
};
/**
 * React Flip Move | enterLeavePresets
 * (c) 2016-present Joshua Comeau
 *
 * This contains the master list of presets available for enter/leave animations,
 * along with the mapping between preset and styles.
 */


var leavePresets = {
  elevator: {
    from: { transform: 'scale(1)', opacity: '1' },
    to: { transform: 'scale(0)', opacity: '0' }
  },
  fade: {
    from: { opacity: '1' },
    to: { opacity: '0' }
  },
  accordionVertical: {
    from: { transform: 'scaleY(1)', transformOrigin: 'center top' },
    to: { transform: 'scaleY(0)', transformOrigin: 'center top' }
  },
  accordionHorizontal: {
    from: { transform: 'scaleX(1)', transformOrigin: 'left center' },
    to: { transform: 'scaleX(0)', transformOrigin: 'left center' }
  },
  none: null
};

// For now, appearPresets will be identical to enterPresets.
// Assigning a custom export in case we ever want to add appear-specific ones.
var appearPresets = enterPresets;

var defaultPreset = 'elevator';
var disablePreset = 'none';

var find = function find(predicate, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      return arr[i];
    }
  }

  return undefined;
};


var every = function every(predicate, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (!predicate(arr[i], i, arr)) {
      return false;
    }
  }
  return true;
};

// eslint-disable-next-line import/no-mutable-exports
var _isArray = function isArray(arr) {
  _isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
  return _isArray(arr);
};

var isElementAnSFC = function isElementAnSFC(element) {
  var isNativeDOMElement = typeof element.type === 'string';

  if (isNativeDOMElement) {
    return false;
  }

  return typeof element.type === 'function' && !element.type.prototype.isReactComponent;
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

  var notBothArrays = !_isArray(a) || !_isArray(b);
  var differentLengths = a.length !== b.length;

  if (notBothArrays || differentLengths) {
    return false;
  }

  return every(function (element, index) {
    return element === b[index];
  }, a);
}

function memoizeString(fn) {
  var cache = {};

  return function (str) {
    if (!cache[str]) {
      cache[str] = fn(str);
    }
    return cache[str];
  };
}

var hyphenate = memoizeString(function (str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
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



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * React Flip Move | propConverter
 * (c) 2016-present Joshua Comeau
 *
 * Abstracted away a bunch of the messy business with props.
 *   - props flow types and defaultProps
 *   - Type conversion (We accept 'string' and 'number' values for duration,
 *     delay, and other fields, but we actually need them to be ints.)
 *   - Children conversion (we need the children to be an array. May not always
 *     be, if a single child is passed in.)
 *   - Resolving animation presets into their base CSS styles
 */
/* eslint-disable block-scoped-var */

// eslint-disable-next-line no-duplicate-imports


function propConverter(ComposedComponent) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    inherits(FlipMovePropConverter, _Component);

    function FlipMovePropConverter() {
      classCallCheck(this, FlipMovePropConverter);
      return possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    // eslint-disable-next-line class-methods-use-this
    FlipMovePropConverter.prototype.checkChildren = function checkChildren(children) {
      // Skip all console warnings in production.
      // Bail early, to avoid unnecessary work.
      React.Children.forEach(children, function (child) {
        // null, undefined, and booleans will be filtered out by Children.toArray
        if (child == null || typeof child === 'boolean') {
          return;
        }

        if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object') {
          primitiveNodeSupplied();
          return;
        }

        if (isElementAnSFC(child) && child.key != null) {
          statelessFunctionalComponentSupplied();
        }
      });
    };

    FlipMovePropConverter.prototype.convertProps = function convertProps(props) {
      var workingProps = {
        // explicitly bypass the props that don't need conversion
        children: props.children,
        easing: props.easing,
        onStart: props.onStart,
        onFinish: props.onFinish,
        onStartAll: props.onStartAll,
        onFinishAll: props.onFinishAll,
        typeName: props.typeName,
        disableAllAnimations: props.disableAllAnimations,
        getPosition: props.getPosition,
        maintainContainerHeight: props.maintainContainerHeight,
        verticalAlignment: props.verticalAlignment,

        // Do string-to-int conversion for all timing-related props
        duration: this.convertTimingProp('duration'),
        delay: this.convertTimingProp('delay'),
        staggerDurationBy: this.convertTimingProp('staggerDurationBy'),
        staggerDelayBy: this.convertTimingProp('staggerDelayBy'),

        // Our enter/leave animations can be specified as boolean (default or
        // disabled), string (preset name), or object (actual animation values).
        // Let's standardize this so that they're always objects
        appearAnimation: this.convertAnimationProp(props.appearAnimation, appearPresets),
        enterAnimation: this.convertAnimationProp(props.enterAnimation, enterPresets),
        leaveAnimation: this.convertAnimationProp(props.leaveAnimation, leavePresets),

        delegated: {}
      };

      this.checkChildren(workingProps.children);

      // Gather any additional props;
      // they will be delegated to the ReactElement created.
      var primaryPropKeys = Object.keys(workingProps);
      var delegatedProps = omit(this.props, primaryPropKeys);

      // The FlipMove container element needs to have a non-static position.
      // We use `relative` by default, but it can be overridden by the user.
      // Now that we're delegating props, we need to merge this in.
      delegatedProps.style = _extends({
        position: 'relative'
      }, delegatedProps.style);

      workingProps.delegated = delegatedProps;

      return workingProps;
    };

    FlipMovePropConverter.prototype.convertTimingProp = function convertTimingProp(prop) {
      var rawValue = this.props[prop];

      var value = typeof rawValue === 'number' ? rawValue : parseInt(rawValue, 10);

      if (isNaN(value)) {
        var defaultValue = FlipMovePropConverter.defaultProps[prop];

        {
          invalidTypeForTimingProp({
            prop: prop,
            value: rawValue,
            defaultValue: defaultValue
          });
        }

        return defaultValue;
      }

      return value;
    };

    // eslint-disable-next-line class-methods-use-this


    FlipMovePropConverter.prototype.convertAnimationProp = function convertAnimationProp(animation, presets) {
      switch (typeof animation === 'undefined' ? 'undefined' : _typeof(animation)) {
        case 'boolean':
          {
            // If it's true, we want to use the default preset.
            // If it's false, we want to use the 'none' preset.
            return presets[animation ? defaultPreset : disablePreset];
          }

        case 'string':
          {
            var presetKeys = Object.keys(presets);

            if (presetKeys.indexOf(animation) === -1) {
              {
                invalidEnterLeavePreset({
                  value: animation,
                  acceptableValues: presetKeys.join(', '),
                  defaultValue: defaultPreset
                });
              }

              return presets[defaultPreset];
            }

            return presets[animation];
          }

        default:
          {
            return animation;
          }
      }
    };

    FlipMovePropConverter.prototype.render = function render() {
      return React__default.createElement(ComposedComponent, this.convertProps(this.props));
    };

    return FlipMovePropConverter;
  }(React.Component), _class.defaultProps = {
    easing: 'ease-in-out',
    duration: 350,
    delay: 0,
    staggerDurationBy: 0,
    staggerDelayBy: 0,
    typeName: 'div',
    enterAnimation: defaultPreset,
    leaveAnimation: defaultPreset,
    disableAllAnimations: false,
    getPosition: function getPosition(node) {
      return node.getBoundingClientRect();
    },
    maintainContainerHeight: false,
    verticalAlignment: 'top'
  }, _temp;
}

/**
 * React Flip Move
 * (c) 2016-present Joshua Comeau
 *
 * These methods read from and write to the DOM.
 * They almost always have side effects, and will hopefully become the
 * only spot in the codebase with impure functions.
 */
function applyStylesToDOMNode(_ref) {
  var domNode = _ref.domNode,
      styles = _ref.styles;

  // Can't just do an object merge because domNode.styles is no regular object.
  // Need to do it this way for the engine to fire its `set` listeners.
  Object.keys(styles).forEach(function (key) {
    domNode.style.setProperty(hyphenate(key), styles[key]);
  });
}

// Modified from Modernizr
function whichTransitionEvent() {
  var transitions = {
    transition: 'transitionend',
    '-o-transition': 'oTransitionEnd',
    '-moz-transition': 'transitionend',
    '-webkit-transition': 'webkitTransitionEnd'
  };

  // If we're running in a browserless environment (eg. SSR), it doesn't apply.
  // Return a placeholder string, for consistent type return.
  if (typeof document === 'undefined') return '';

  var el = document.createElement('fakeelement');

  var match = find(function (t) {
    return el.style.getPropertyValue(t) !== undefined;
  }, Object.keys(transitions));

  // If no `transition` is found, we must be running in a browser so ancient,
  // React itself won't run. Return an empty string, for consistent type return
  return match ? transitions[match] : '';
}

var getRelativeBoundingBox = function getRelativeBoundingBox(_ref2) {
  var childDomNode = _ref2.childDomNode,
      parentDomNode = _ref2.parentDomNode,
      getPosition = _ref2.getPosition;

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
 * how many pixels on each axis the element has moved.
 *
 */
var getPositionDelta = function getPositionDelta(_ref3) {
  var childDomNode = _ref3.childDomNode,
      childBoundingBox = _ref3.childBoundingBox,
      parentBoundingBox = _ref3.parentBoundingBox,
      getPosition = _ref3.getPosition;

  // TEMP: A mystery bug is sometimes causing unnecessary boundingBoxes to
  var defaultBox = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 0,
    width: 0
  };

  // Our old box is its last calculated position, derived on mount or at the
  // start of the previous animation.
  var oldRelativeBox = childBoundingBox || defaultBox;
  var parentBox = parentBoundingBox || defaultBox;

  // Our new box is the new final resting place: Where we expect it to wind up
  // after the animation. First we get the box in absolute terms (AKA relative
  // to the viewport), and then we calculate its relative box (relative to the
  // parent container)
  var newAbsoluteBox = getPosition(childDomNode);
  var newRelativeBox = {
    top: newAbsoluteBox.top - parentBox.top,
    left: newAbsoluteBox.left - parentBox.left
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
 */
var removeNodeFromDOMFlow = function removeNodeFromDOMFlow(childData, verticalAlignment) {
  var domNode = childData.domNode,
      boundingBox = childData.boundingBox;


  if (!domNode || !boundingBox) {
    return;
  }

  // For this to work, we have to offset any given `margin`.
  var computed = window.getComputedStyle(domNode);

  // We need to clean up margins, by converting and removing suffix:
  // eg. '21px' -> 21
  var marginAttrs = ['margin-top', 'margin-left', 'margin-right'];
  var margins = marginAttrs.reduce(function (acc, margin) {
    var _babelHelpers$extends;

    var propertyVal = computed.getPropertyValue(margin);

    return _extends({}, acc, (_babelHelpers$extends = {}, _babelHelpers$extends[margin] = Number(propertyVal.replace('px', '')), _babelHelpers$extends));
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
 */
var updateHeightPlaceholder = function updateHeightPlaceholder(_ref4) {
  var domNode = _ref4.domNode,
      parentData = _ref4.parentData,
      getPosition = _ref4.getPosition;

  var parentDomNode = parentData.domNode;
  var parentBoundingBox = parentData.boundingBox;

  if (!parentDomNode || !parentBoundingBox) {
    return;
  }

  // We need to find the height of the container *without* the placeholder.
  // Since it's possible that the placeholder might already be present,
  // we first set its height to 0.
  // This allows the container to collapse down to the size of just its
  // content (plus container padding or borders if any).
  applyStylesToDOMNode({ domNode: domNode, styles: { height: '0' } });

  // Find the distance by which the container would be collapsed by elements
  // leaving. We compare the freshly-available parent height with the original,
  // cached container height.
  var originalParentHeight = parentBoundingBox.height;
  var collapsedParentHeight = getPosition(parentDomNode).height;
  var reductionInHeight = originalParentHeight - collapsedParentHeight;

  // If the container has become shorter, update the padding element's
  // height to take up the difference. Otherwise set its height to zero,
  // so that it has no effect.
  var styles = {
    height: reductionInHeight > 0 ? reductionInHeight + 'px' : '0'
  };

  applyStylesToDOMNode({ domNode: domNode, styles: styles });
};

var getNativeNode = function getNativeNode(element) {
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
  var foundNode = ReactDOM.findDOMNode(element);

  if (foundNode && foundNode.nodeType === Node.TEXT_NODE) {
    // Text nodes are not supported
    return null;
  }
  // eslint-disable-next-line flowtype/no-weak-types
  return foundNode;
};

var createTransitionString = function createTransitionString(index, props) {
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

/**
 * React Flip Move
 * (c) 2016-present Joshua Comeau
 *
 * For information on how this code is laid out, check out CODE_TOUR.md
 */

/* eslint-disable react/prop-types */

// eslint-disable-next-line no-duplicate-imports


var transitionEnd = whichTransitionEvent();
var noBrowserSupport = !transitionEnd;

function getKey(childData) {
  return childData.key || '';
}

function getElementChildren(children) {
  // Fix incomplete typing of Children.toArray
  // eslint-disable-next-line flowtype/no-weak-types
  return React.Children.toArray(children);
}

var FlipMove$1 = function (_Component) {
  inherits(FlipMove, _Component);

  function FlipMove() {
    var _temp, _this, _ret;

    classCallCheck(this, FlipMove);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      children: getElementChildren(
      // `this.props` ought to always be defined at this point, but a report
      // was made about it not being defined in IE10.
      // TODO: Test in IE10, to see if there's an underlying cause that can
      // be addressed.
      _this.props ? _this.props.children : []).map(function (element) {
        return _extends({}, element, {
          element: element,
          appearing: true
        });
      })
    }, _this.childrenData = {}, _this.parentData = {
      domNode: null,
      boundingBox: null
    }, _this.heightPlaceholderData = {
      domNode: null
    }, _this.remainingAnimations = 0, _this.childrenToAnimate = [], _this.findDOMContainer = function () {
      // eslint-disable-next-line react/no-find-dom-node
      var domNode = ReactDOM__default.findDOMNode(_this);
      var parentNode = domNode && domNode.parentNode;

      // This ought to be impossible, but handling it for Flow's sake.
      if (!parentNode || !(parentNode instanceof HTMLElement)) {
        return;
      }

      // If the parent node has static positioning, leave animations might look
      // really funky. Let's automatically apply `position: relative` in this
      // case, to prevent any quirkiness.
      if (window.getComputedStyle(parentNode).position === 'static') {
        parentNode.style.position = 'relative';
        parentNodePositionStatic();
      }

      _this.parentData.domNode = parentNode;
    }, _this.runAnimation = function () {
      var dynamicChildren = _this.state.children.filter(_this.doesChildNeedToBeAnimated);

      // Splitting DOM reads and writes to be peformed in batches
      var childrenInitialStyles = dynamicChildren.map(function (child) {
        return _this.computeInitialStyles(child);
      });
      dynamicChildren.forEach(function (child, index) {
        _this.remainingAnimations += 1;
        _this.childrenToAnimate.push(getKey(child));
        _this.animateChild(child, index, childrenInitialStyles[index]);
      });

      if (typeof _this.props.onStartAll === 'function') {
        _this.callChildrenHook(_this.props.onStartAll);
      }
    }, _this.doesChildNeedToBeAnimated = function (child) {
      // If the child doesn't have a key, it's an immovable child (one that we
      // do not want to do FLIP stuff to.)
      if (!getKey(child)) {
        return false;
      }

      var childData = _this.getChildData(getKey(child));
      var childDomNode = childData.domNode;
      var childBoundingBox = childData.boundingBox;
      var parentBoundingBox = _this.parentData.boundingBox;

      if (!childDomNode) {
        return false;
      }

      var _this$props = _this.props,
          appearAnimation = _this$props.appearAnimation,
          enterAnimation = _this$props.enterAnimation,
          leaveAnimation = _this$props.leaveAnimation,
          getPosition = _this$props.getPosition;


      var isAppearingWithAnimation = child.appearing && appearAnimation;
      var isEnteringWithAnimation = child.entering && enterAnimation;
      var isLeavingWithAnimation = child.leaving && leaveAnimation;

      if (isAppearingWithAnimation || isEnteringWithAnimation || isLeavingWithAnimation) {
        return true;
      }

      // If it isn't entering/leaving, we want to animate it if it's
      // on-screen position has changed.

      var _getPositionDelta = getPositionDelta({
        childDomNode: childDomNode,
        childBoundingBox: childBoundingBox,
        parentBoundingBox: parentBoundingBox,
        getPosition: getPosition
      }),
          dX = _getPositionDelta[0],
          dY = _getPositionDelta[1];

      return dX !== 0 || dY !== 0;
    }, _temp), possibleConstructorReturn(_this, _ret);
  }
  // Copy props.children into state.
  // To understand why this is important (and not an anti-pattern), consider
  // how "leave" animations work. An item has "left" when the component
  // receives a new set of props that do NOT contain the item.
  // If we just render the props as-is, the item would instantly disappear.
  // We want to keep the item rendered for a little while, until its animation
  // can complete. Because we cannot mutate props, we make `state` the source
  // of truth.


  // FlipMove needs to know quite a bit about its children in order to do
  // its job. We store these as a property on the instance. We're not using
  // state, because we don't want changes to trigger re-renders, we just
  // need a place to keep the data for reference, when changes happen.
  // This field should not be accessed directly. Instead, use getChildData,
  // putChildData, etc...


  // Similarly, track the dom node and box of our parent element.


  // If `maintainContainerHeight` prop is set to true, we'll create a
  // placeholder element which occupies space so that the parent height
  // doesn't change when items are removed from the document flow (which
  // happens during leave animations)


  // Keep track of remaining animations so we know when to fire the
  // all-finished callback, and clean up after ourselves.
  // NOTE: we can't simply use childrenToAnimate.length to track remaining
  // animations, because we need to maintain the list of animating children,
  // to pass to the `onFinishAll` handler.


  FlipMove.prototype.componentDidMount = function componentDidMount() {
    // Because React 16 no longer requires wrapping elements, Flip Move can opt
    // to not wrap the children in an element. In that case, find the parent
    // element using `findDOMNode`.
    if (this.props.typeName === null) {
      this.findDOMContainer();
    }

    // Run our `appearAnimation` if it was requested, right after the
    // component mounts.
    var shouldTriggerFLIP = this.props.appearAnimation && !this.isAnimationDisabled(this.props);

    if (shouldTriggerFLIP) {
      this.prepForAnimation();
      this.runAnimation();
    }
  };

  FlipMove.prototype.componentDidUpdate = function componentDidUpdate(previousProps) {
    if (this.props.typeName === null) {
      this.findDOMContainer();
    }
    // If the children have been re-arranged, moved, or added/removed,
    // trigger the main FLIP animation.
    //
    // IMPORTANT: We need to make sure that the children have actually changed.
    // At the end of the transition, we clean up nodes that need to be removed.
    // We DON'T want this cleanup to trigger another update.

    var oldChildrenKeys = getElementChildren(this.props.children).map(function (d) {
      return d.key;
    });
    var nextChildrenKeys = getElementChildren(previousProps.children).map(function (d) {
      return d.key;
    });

    var shouldTriggerFLIP = !arraysEqual(oldChildrenKeys, nextChildrenKeys) && !this.isAnimationDisabled(this.props);

    if (shouldTriggerFLIP) {
      this.prepForAnimation();
      this.runAnimation();
    }
  };

  FlipMove.prototype.calculateNextSetOfChildren = function calculateNextSetOfChildren(nextChildren) {
    var _this2 = this;

    // We want to:
    //   - Mark all new children as `entering`
    //   - Pull in previous children that aren't in nextChildren, and mark them
    //     as `leaving`
    //   - Preserve the nextChildren list order, with leaving children in their
    //     appropriate places.
    //

    var updatedChildren = nextChildren.map(function (nextChild) {
      var child = _this2.findChildByKey(nextChild.key);

      // If the current child did exist, but it was in the midst of leaving,
      // we want to treat it as though it's entering
      var isEntering = !child || child.leaving;

      return _extends({}, nextChild, { element: nextChild, entering: isEntering });
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
      var isLeaving = !find(function (_ref) {
        var key = _ref.key;
        return key === getKey(child);
      }, nextChildren);

      // If the child isn't leaving (or, if there is no leave animation),
      // we don't need to add it into the state children.
      if (!isLeaving || !_this2.props.leaveAnimation) return;

      var nextChild = _extends({}, child, { leaving: true });
      var nextChildIndex = index + numOfChildrenLeaving;

      updatedChildren.splice(nextChildIndex, 0, nextChild);
      numOfChildrenLeaving += 1;
    });

    return updatedChildren;
  };

  FlipMove.prototype.prepForAnimation = function prepForAnimation() {
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
        return child.leaving;
      });

      leavingChildren.forEach(function (leavingChild) {
        var childData = _this3.getChildData(getKey(leavingChild));

        // Warn if child is disabled
        if (!_this3.isAnimationDisabled(_this3.props) && childData.domNode && childData.domNode.disabled) {
          childIsDisabled();
        }

        // We need to take the items out of the "flow" of the document, so that
        // its siblings can move to take its place.
        if (childData.boundingBox) {
          removeNodeFromDOMFlow(childData, _this3.props.verticalAlignment);
        }
      });

      if (maintainContainerHeight && this.heightPlaceholderData.domNode) {
        updateHeightPlaceholder({
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
      var _getChildData = _this3.getChildData(getKey(child)),
          domNode = _getChildData.domNode;

      // Ignore children that don't render DOM nodes (eg. by returning null)


      if (!domNode) {
        return;
      }

      if (!child.entering && !child.leaving) {
        applyStylesToDOMNode({
          domNode: domNode,
          styles: {
            transition: ''
          }
        });
      }
    });
  };

  // eslint-disable-next-line camelcase


  FlipMove.prototype.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    // When the component is handed new props, we need to figure out the
    // "resting" position of all currently-rendered DOM nodes.
    // We store that data in this.parent and this.children,
    // so it can be used later to work out the animation.
    this.updateBoundingBoxCaches();

    // Convert opaque children object to array.
    var nextChildren = getElementChildren(nextProps.children);

    // Next, we need to update our state, so that it contains our new set of
    // children. If animation is disabled or unsupported, this is easy;
    // we just copy our props into state.
    // Assuming that we can animate, though, we have to do some work.
    // Essentially, we want to keep just-deleted nodes in the DOM for a bit
    // longer, so that we can animate them away.
    this.setState({
      children: this.isAnimationDisabled(nextProps) ? nextChildren.map(function (element) {
        return _extends({}, element, { element: element });
      }) : this.calculateNextSetOfChildren(nextChildren)
    });
  };

  FlipMove.prototype.animateChild = function animateChild(child, index, childInitialStyles) {
    var _this4 = this;

    var _getChildData2 = this.getChildData(getKey(child)),
        domNode = _getChildData2.domNode;

    if (!domNode) {
      return;
    }

    // Apply the relevant style for this DOM node
    // This is the offset from its actual DOM position.
    // eg. if an item has been re-rendered 20px lower, we want to apply a
    // style of 'transform: translate(-20px)', so that it appears to be where
    // it started.
    // In FLIP terminology, this is the 'Invert' stage.
    applyStylesToDOMNode({
      domNode: domNode,
      styles: childInitialStyles
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

        // eslint-disable-next-line flowtype/require-variable-type
        var styles = {
          transition: createTransitionString(index, _this4.props),
          transform: '',
          opacity: ''
        };

        if (child.appearing && _this4.props.appearAnimation) {
          styles = _extends({}, styles, _this4.props.appearAnimation.to);
        } else if (child.entering && _this4.props.enterAnimation) {
          styles = _extends({}, styles, _this4.props.enterAnimation.to);
        } else if (child.leaving && _this4.props.leaveAnimation) {
          styles = _extends({}, styles, _this4.props.leaveAnimation.to);
        }

        // In FLIP terminology, this is the 'Play' stage.
        applyStylesToDOMNode({ domNode: domNode, styles: styles });
      });
    });

    this.bindTransitionEndHandler(child);
  };

  FlipMove.prototype.bindTransitionEndHandler = function bindTransitionEndHandler(child) {
    var _this5 = this;

    var _getChildData3 = this.getChildData(getKey(child)),
        domNode = _getChildData3.domNode;

    if (!domNode) {
      return;
    }

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
      _this5.triggerFinishHooks(child, domNode);

      domNode.removeEventListener(transitionEnd, transitionEndHandler);

      if (child.leaving) {
        _this5.removeChildData(getKey(child));
      }
    };

    domNode.addEventListener(transitionEnd, transitionEndHandler);
  };

  FlipMove.prototype.triggerFinishHooks = function triggerFinishHooks(child, domNode) {
    var _this6 = this;

    if (this.props.onFinish) this.props.onFinish(child, domNode);

    // Reduce the number of children we need to animate by 1,
    // so that we can tell when all children have finished.
    this.remainingAnimations -= 1;

    if (this.remainingAnimations === 0) {
      // Remove any items from the DOM that have left, and reset `entering`.
      var nextChildren = this.state.children.filter(function (_ref2) {
        var leaving = _ref2.leaving;
        return !leaving;
      }).map(function (item) {
        return _extends({}, item, {
          // fix for Flow
          element: item.element,
          appearing: false,
          entering: false
        });
      });

      this.setState({ children: nextChildren }, function () {
        if (typeof _this6.props.onFinishAll === 'function') {
          _this6.callChildrenHook(_this6.props.onFinishAll);
        }

        // Reset our variables for the next iteration
        _this6.childrenToAnimate = [];
      });

      // If the placeholder was holding the container open while elements were
      // leaving, we we can now set its height to zero.
      if (this.heightPlaceholderData.domNode) {
        this.heightPlaceholderData.domNode.style.height = '0';
      }
    }
  };

  FlipMove.prototype.callChildrenHook = function callChildrenHook(hook) {
    var _this7 = this;

    var elements = [];
    var domNodes = [];

    this.childrenToAnimate.forEach(function (childKey) {
      // If this was an exit animation, the child may no longer exist.
      // If so, skip it.
      var child = _this7.findChildByKey(childKey);

      if (!child) {
        return;
      }

      elements.push(child);

      if (_this7.hasChildData(childKey)) {
        domNodes.push(_this7.getChildData(childKey).domNode);
      }
    });

    hook(elements, domNodes);
  };

  FlipMove.prototype.updateBoundingBoxCaches = function updateBoundingBoxCaches() {
    var _this8 = this;

    // This is the ONLY place that parentData and childrenData's
    // bounding boxes are updated. They will be calculated at other times
    // to be compared to this value, but it's important that the cache is
    // updated once per update.
    var parentDomNode = this.parentData.domNode;

    if (!parentDomNode) {
      return;
    }

    this.parentData.boundingBox = this.props.getPosition(parentDomNode);

    // Splitting DOM reads and writes to be peformed in batches
    var childrenBoundingBoxes = [];

    this.state.children.forEach(function (child) {
      var childKey = getKey(child);

      // It is possible that a child does not have a `key` property;
      // Ignore these children, they don't need to be moved.
      if (!childKey) {
        childrenBoundingBoxes.push(null);
        return;
      }

      // In very rare circumstances, for reasons unknown, the ref is never
      // populated for certain children. In this case, avoid doing this update.
      // see: https://github.com/joshwcomeau/react-flip-move/pull/91
      if (!_this8.hasChildData(childKey)) {
        childrenBoundingBoxes.push(null);
        return;
      }

      var childData = _this8.getChildData(childKey);

      // If the child element returns null, we need to avoid trying to
      // account for it
      if (!childData.domNode || !child) {
        childrenBoundingBoxes.push(null);
        return;
      }

      childrenBoundingBoxes.push(getRelativeBoundingBox({
        childDomNode: childData.domNode,
        parentDomNode: parentDomNode,
        getPosition: _this8.props.getPosition
      }));
    });

    this.state.children.forEach(function (child, index) {
      var childKey = getKey(child);

      var childBoundingBox = childrenBoundingBoxes[index];

      if (!childKey) {
        return;
      }

      _this8.setChildData(childKey, {
        boundingBox: childBoundingBox
      });
    });
  };

  FlipMove.prototype.computeInitialStyles = function computeInitialStyles(child) {
    if (child.appearing) {
      return this.props.appearAnimation ? this.props.appearAnimation.from : {};
    } else if (child.entering) {
      if (!this.props.enterAnimation) {
        return {};
      }
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
      return this.props.leaveAnimation ? this.props.leaveAnimation.from : {};
    }

    var childData = this.getChildData(getKey(child));
    var childDomNode = childData.domNode;
    var childBoundingBox = childData.boundingBox;
    var parentBoundingBox = this.parentData.boundingBox;

    if (!childDomNode) {
      return {};
    }

    var _getPositionDelta2 = getPositionDelta({
      childDomNode: childDomNode,
      childBoundingBox: childBoundingBox,
      parentBoundingBox: parentBoundingBox,
      getPosition: this.props.getPosition
    }),
        dX = _getPositionDelta2[0],
        dY = _getPositionDelta2[1];

    return {
      transform: 'translate(' + dX + 'px, ' + dY + 'px)'
    };
  };

  // eslint-disable-next-line class-methods-use-this


  FlipMove.prototype.isAnimationDisabled = function isAnimationDisabled(props) {
    // If the component is explicitly passed a `disableAllAnimations` flag,
    // we can skip this whole process. Similarly, if all of the numbers have
    // been set to 0, there is no point in trying to animate; doing so would
    // only cause a flicker (and the intent is probably to disable animations)
    // We can also skip this rigamarole if there's no browser support for it.
    return noBrowserSupport || props.disableAllAnimations || props.duration === 0 && props.delay === 0 && props.staggerDurationBy === 0 && props.staggerDelayBy === 0;
  };

  FlipMove.prototype.findChildByKey = function findChildByKey(key) {
    return find(function (child) {
      return getKey(child) === key;
    }, this.state.children);
  };

  FlipMove.prototype.hasChildData = function hasChildData(key) {
    // Object has some built-in properties on its prototype, such as toString.  hasOwnProperty makes
    // sure that key is present on childrenData itself, not on its prototype.
    return Object.prototype.hasOwnProperty.call(this.childrenData, key);
  };

  FlipMove.prototype.getChildData = function getChildData(key) {
    return this.hasChildData(key) ? this.childrenData[key] : {};
  };

  FlipMove.prototype.setChildData = function setChildData(key, data) {
    this.childrenData[key] = _extends({}, this.getChildData(key), data);
  };

  FlipMove.prototype.removeChildData = function removeChildData(key) {
    delete this.childrenData[key];
    this.setState(function (prevState) {
      return _extends({}, prevState, {
        children: prevState.children.filter(function (child) {
          return child.element.key !== key;
        })
      });
    });
  };

  FlipMove.prototype.createHeightPlaceholder = function createHeightPlaceholder() {
    var _this9 = this;

    var typeName = this.props.typeName;

    // If requested, create an invisible element at the end of the list.
    // Its height will be modified to prevent the container from collapsing
    // prematurely.

    var isContainerAList = typeName === 'ul' || typeName === 'ol';
    var placeholderType = isContainerAList ? 'li' : 'div';

    return React.createElement(placeholderType, {
      key: 'height-placeholder',
      ref: function ref(domNode) {
        _this9.heightPlaceholderData.domNode = domNode;
      },
      style: { visibility: 'hidden', height: 0 }
    });
  };

  FlipMove.prototype.childrenWithRefs = function childrenWithRefs() {
    var _this10 = this;

    // We need to clone the provided children, capturing a reference to the
    // underlying DOM node. Flip Move needs to use the React escape hatches to
    // be able to do its calculations.
    return this.state.children.map(function (child) {
      return React.cloneElement(child.element, {
        ref: function ref(element) {
          // Stateless Functional Components are not supported by FlipMove,
          // because they don't have instances.
          if (!element) {
            return;
          }

          var domNode = getNativeNode(element);
          _this10.setChildData(getKey(child), { domNode: domNode });
        }
      });
    });
  };

  FlipMove.prototype.render = function render() {
    var _this11 = this;

    var _props2 = this.props,
        typeName = _props2.typeName,
        delegated = _props2.delegated,
        leaveAnimation = _props2.leaveAnimation,
        maintainContainerHeight = _props2.maintainContainerHeight;


    var children = this.childrenWithRefs();
    if (leaveAnimation && maintainContainerHeight) {
      children.push(this.createHeightPlaceholder());
    }

    if (!typeName) return children;

    var props = _extends({}, delegated, {
      children: children,
      ref: function ref(node) {
        _this11.parentData.domNode = node;
      }
    });

    return React.createElement(typeName, props);
  };

  return FlipMove;
}(React.Component);

var enhancedFlipMove = /* #__PURE__ */propConverter(FlipMove$1);

/**
 * React Flip Move
 * (c) 2016-present Joshua Comeau
 */

return enhancedFlipMove;

})));
