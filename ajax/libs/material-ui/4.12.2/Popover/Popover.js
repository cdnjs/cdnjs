"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffsetTop = getOffsetTop;
exports.getOffsetLeft = getOffsetLeft;
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _utils = require("@material-ui/utils");

var _debounce = _interopRequireDefault(require("../utils/debounce"));

var _clsx = _interopRequireDefault(require("clsx"));

var _ownerDocument = _interopRequireDefault(require("../utils/ownerDocument"));

var _ownerWindow = _interopRequireDefault(require("../utils/ownerWindow"));

var _createChainedFunction = _interopRequireDefault(require("../utils/createChainedFunction"));

var _deprecatedPropType = _interopRequireDefault(require("../utils/deprecatedPropType"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _Modal = _interopRequireDefault(require("../Modal"));

var _Grow = _interopRequireDefault(require("../Grow"));

var _Paper = _interopRequireDefault(require("../Paper"));

function getOffsetTop(rect, vertical) {
  var offset = 0;

  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }

  return offset;
}

function getOffsetLeft(rect, horizontal) {
  var offset = 0;

  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }

  return offset;
}

function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical].map(function (n) {
    return typeof n === 'number' ? "".concat(n, "px") : n;
  }).join(' ');
} // Sum the scrollTop between two elements.


function getScrollParent(parent, child) {
  var element = child;
  var scrollTop = 0;

  while (element && element !== parent) {
    element = element.parentElement;
    scrollTop += element.scrollTop;
  }

  return scrollTop;
}

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

var styles = {
  /* Styles applied to the root element. */
  root: {},

  /* Styles applied to the `Paper` component. */
  paper: {
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    // So we see the popover when it's empty.
    // It's most likely on issue on userland.
    minWidth: 16,
    minHeight: 16,
    maxWidth: 'calc(100% - 32px)',
    maxHeight: 'calc(100% - 32px)',
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0
  }
};
exports.styles = styles;
var Popover = /*#__PURE__*/React.forwardRef(function Popover(props, ref) {
  var action = props.action,
      anchorEl = props.anchorEl,
      _props$anchorOrigin = props.anchorOrigin,
      anchorOrigin = _props$anchorOrigin === void 0 ? {
    vertical: 'top',
    horizontal: 'left'
  } : _props$anchorOrigin,
      anchorPosition = props.anchorPosition,
      _props$anchorReferenc = props.anchorReference,
      anchorReference = _props$anchorReferenc === void 0 ? 'anchorEl' : _props$anchorReferenc,
      children = props.children,
      classes = props.classes,
      className = props.className,
      containerProp = props.container,
      _props$elevation = props.elevation,
      elevation = _props$elevation === void 0 ? 8 : _props$elevation,
      getContentAnchorEl = props.getContentAnchorEl,
      _props$marginThreshol = props.marginThreshold,
      marginThreshold = _props$marginThreshol === void 0 ? 16 : _props$marginThreshol,
      onEnter = props.onEnter,
      onEntered = props.onEntered,
      onEntering = props.onEntering,
      onExit = props.onExit,
      onExited = props.onExited,
      onExiting = props.onExiting,
      open = props.open,
      _props$PaperProps = props.PaperProps,
      PaperProps = _props$PaperProps === void 0 ? {} : _props$PaperProps,
      _props$transformOrigi = props.transformOrigin,
      transformOrigin = _props$transformOrigi === void 0 ? {
    vertical: 'top',
    horizontal: 'left'
  } : _props$transformOrigi,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? _Grow.default : _props$TransitionComp,
      _props$transitionDura = props.transitionDuration,
      transitionDurationProp = _props$transitionDura === void 0 ? 'auto' : _props$transitionDura,
      _props$TransitionProp = props.TransitionProps,
      TransitionProps = _props$TransitionProp === void 0 ? {} : _props$TransitionProp,
      other = (0, _objectWithoutProperties2.default)(props, ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "classes", "className", "container", "elevation", "getContentAnchorEl", "marginThreshold", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "open", "PaperProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps"]);
  var paperRef = React.useRef(); // Returns the top/left offset of the position
  // to attach to on the anchor element (or body if none is provided)

  var getAnchorOffset = React.useCallback(function (contentAnchorOffset) {
    if (anchorReference === 'anchorPosition') {
      if (process.env.NODE_ENV !== 'production') {
        if (!anchorPosition) {
          console.error('Material-UI: You need to provide a `anchorPosition` prop when using ' + '<Popover anchorReference="anchorPosition" />.');
        }
      }

      return anchorPosition;
    }

    var resolvedAnchorEl = getAnchorEl(anchorEl); // If an anchor element wasn't provided, just use the parent body element of this Popover

    var anchorElement = resolvedAnchorEl && resolvedAnchorEl.nodeType === 1 ? resolvedAnchorEl : (0, _ownerDocument.default)(paperRef.current).body;
    var anchorRect = anchorElement.getBoundingClientRect();

    if (process.env.NODE_ENV !== 'production') {
      var box = anchorElement.getBoundingClientRect();

      if (process.env.NODE_ENV !== 'test' && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
        console.warn(['Material-UI: The `anchorEl` prop provided to the component is invalid.', 'The anchor element should be part of the document layout.', "Make sure the element is present in the document or that it's not display none."].join('\n'));
      }
    }

    var anchorVertical = contentAnchorOffset === 0 ? anchorOrigin.vertical : 'center';
    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorVertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal)
    };
  }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical, anchorPosition, anchorReference]); // Returns the vertical offset of inner content to anchor the transform on if provided

  var getContentAnchorOffset = React.useCallback(function (element) {
    var contentAnchorOffset = 0;

    if (getContentAnchorEl && anchorReference === 'anchorEl') {
      var contentAnchorEl = getContentAnchorEl(element);

      if (contentAnchorEl && element.contains(contentAnchorEl)) {
        var scrollTop = getScrollParent(element, contentAnchorEl);
        contentAnchorOffset = contentAnchorEl.offsetTop + contentAnchorEl.clientHeight / 2 - scrollTop || 0;
      } // != the default value


      if (process.env.NODE_ENV !== 'production') {
        if (anchorOrigin.vertical !== 'top') {
          console.error(['Material-UI: You can not change the default `anchorOrigin.vertical` value ', 'when also providing the `getContentAnchorEl` prop to the popover component.', 'Only use one of the two props.', 'Set `getContentAnchorEl` to `null | undefined`' + ' or leave `anchorOrigin.vertical` unchanged.'].join('\n'));
        }
      }
    }

    return contentAnchorOffset;
  }, [anchorOrigin.vertical, anchorReference, getContentAnchorEl]); // Return the base transform origin using the element
  // and taking the content anchor offset into account if in use

  var getTransformOrigin = React.useCallback(function (elemRect) {
    var contentAnchorOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return {
      vertical: getOffsetTop(elemRect, transformOrigin.vertical) + contentAnchorOffset,
      horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal)
    };
  }, [transformOrigin.horizontal, transformOrigin.vertical]);
  var getPositioningStyle = React.useCallback(function (element) {
    // Check if the parent has requested anchoring on an inner content node
    var contentAnchorOffset = getContentAnchorOffset(element);
    var elemRect = {
      width: element.offsetWidth,
      height: element.offsetHeight
    }; // Get the transform origin point on the element itself

    var elemTransformOrigin = getTransformOrigin(elemRect, contentAnchorOffset);

    if (anchorReference === 'none') {
      return {
        top: null,
        left: null,
        transformOrigin: getTransformOriginValue(elemTransformOrigin)
      };
    } // Get the offset of of the anchoring element


    var anchorOffset = getAnchorOffset(contentAnchorOffset); // Calculate element positioning

    var top = anchorOffset.top - elemTransformOrigin.vertical;
    var left = anchorOffset.left - elemTransformOrigin.horizontal;
    var bottom = top + elemRect.height;
    var right = left + elemRect.width; // Use the parent window of the anchorEl if provided

    var containerWindow = (0, _ownerWindow.default)(getAnchorEl(anchorEl)); // Window thresholds taking required margin into account

    var heightThreshold = containerWindow.innerHeight - marginThreshold;
    var widthThreshold = containerWindow.innerWidth - marginThreshold; // Check if the vertical axis needs shifting

    if (top < marginThreshold) {
      var diff = top - marginThreshold;
      top -= diff;
      elemTransformOrigin.vertical += diff;
    } else if (bottom > heightThreshold) {
      var _diff = bottom - heightThreshold;

      top -= _diff;
      elemTransformOrigin.vertical += _diff;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (elemRect.height > heightThreshold && elemRect.height && heightThreshold) {
        console.error(['Material-UI: The popover component is too tall.', "Some part of it can not be seen on the screen (".concat(elemRect.height - heightThreshold, "px)."), 'Please consider adding a `max-height` to improve the user-experience.'].join('\n'));
      }
    } // Check if the horizontal axis needs shifting


    if (left < marginThreshold) {
      var _diff2 = left - marginThreshold;

      left -= _diff2;
      elemTransformOrigin.horizontal += _diff2;
    } else if (right > widthThreshold) {
      var _diff3 = right - widthThreshold;

      left -= _diff3;
      elemTransformOrigin.horizontal += _diff3;
    }

    return {
      top: "".concat(Math.round(top), "px"),
      left: "".concat(Math.round(left), "px"),
      transformOrigin: getTransformOriginValue(elemTransformOrigin)
    };
  }, [anchorEl, anchorReference, getAnchorOffset, getContentAnchorOffset, getTransformOrigin, marginThreshold]);
  var setPositioningStyles = React.useCallback(function () {
    var element = paperRef.current;

    if (!element) {
      return;
    }

    var positioning = getPositioningStyle(element);

    if (positioning.top !== null) {
      element.style.top = positioning.top;
    }

    if (positioning.left !== null) {
      element.style.left = positioning.left;
    }

    element.style.transformOrigin = positioning.transformOrigin;
  }, [getPositioningStyle]);

  var handleEntering = function handleEntering(element, isAppearing) {
    if (onEntering) {
      onEntering(element, isAppearing);
    }

    setPositioningStyles();
  };

  var handlePaperRef = React.useCallback(function (instance) {
    // #StrictMode ready
    paperRef.current = ReactDOM.findDOMNode(instance);
  }, []);
  React.useEffect(function () {
    if (open) {
      setPositioningStyles();
    }
  });
  React.useImperativeHandle(action, function () {
    return open ? {
      updatePosition: function updatePosition() {
        setPositioningStyles();
      }
    } : null;
  }, [open, setPositioningStyles]);
  React.useEffect(function () {
    if (!open) {
      return undefined;
    }

    var handleResize = (0, _debounce.default)(function () {
      setPositioningStyles();
    });
    window.addEventListener('resize', handleResize);
    return function () {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
    };
  }, [open, setPositioningStyles]);
  var transitionDuration = transitionDurationProp;

  if (transitionDurationProp === 'auto' && !TransitionComponent.muiSupportAuto) {
    transitionDuration = undefined;
  } // If the container prop is provided, use that
  // If the anchorEl prop is provided, use its parent body element as the container
  // If neither are provided let the Modal take care of choosing the container


  var container = containerProp || (anchorEl ? (0, _ownerDocument.default)(getAnchorEl(anchorEl)).body : undefined);
  return /*#__PURE__*/React.createElement(_Modal.default, (0, _extends2.default)({
    container: container,
    open: open,
    ref: ref,
    BackdropProps: {
      invisible: true
    },
    className: (0, _clsx.default)(classes.root, className)
  }, other), /*#__PURE__*/React.createElement(TransitionComponent, (0, _extends2.default)({
    appear: true,
    in: open,
    onEnter: onEnter,
    onEntered: onEntered,
    onExit: onExit,
    onExited: onExited,
    onExiting: onExiting,
    timeout: transitionDuration
  }, TransitionProps, {
    onEntering: (0, _createChainedFunction.default)(handleEntering, TransitionProps.onEntering)
  }), /*#__PURE__*/React.createElement(_Paper.default, (0, _extends2.default)({
    elevation: elevation,
    ref: handlePaperRef
  }, PaperProps, {
    className: (0, _clsx.default)(classes.paper, PaperProps.className)
  }), children)));
});
process.env.NODE_ENV !== "production" ? Popover.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: _utils.refType,

  /**
   * A HTML element, or a function that returns it.
   * It's used to set the position of the popover.
   */
  anchorEl: (0, _utils.chainPropTypes)(_propTypes.default.oneOfType([_utils.HTMLElementType, _propTypes.default.func]), function (props) {
    if (props.open && (!props.anchorReference || props.anchorReference === 'anchorEl')) {
      var resolvedAnchorEl = getAnchorEl(props.anchorEl);

      if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
        var box = resolvedAnchorEl.getBoundingClientRect();

        if (process.env.NODE_ENV !== 'test' && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          return new Error(['Material-UI: The `anchorEl` prop provided to the component is invalid.', 'The anchor element should be part of the document layout.', "Make sure the element is present in the document or that it's not display none."].join('\n'));
        }
      } else {
        return new Error(['Material-UI: The `anchorEl` prop provided to the component is invalid.', "It should be an Element instance but it's `".concat(resolvedAnchorEl, "` instead.")].join('\n'));
      }
    }

    return null;
  }),

  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   */
  anchorOrigin: _propTypes.default.shape({
    horizontal: _propTypes.default.oneOfType([_propTypes.default.oneOf(['center', 'left', 'right']), _propTypes.default.number]).isRequired,
    vertical: _propTypes.default.oneOfType([_propTypes.default.oneOf(['bottom', 'center', 'top']), _propTypes.default.number]).isRequired
  }),

  /**
   * This is the position that may be used
   * to set the position of the popover.
   * The coordinates are relative to
   * the application's client area.
   */
  anchorPosition: _propTypes.default.shape({
    left: _propTypes.default.number.isRequired,
    top: _propTypes.default.number.isRequired
  }),

  /**
   * This determines which anchor prop to refer to to set
   * the position of the popover.
   */
  anchorReference: _propTypes.default.oneOf(['anchorEl', 'anchorPosition', 'none']),

  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * A HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_utils.HTMLElementType, _propTypes.default.instanceOf(React.Component), _propTypes.default.func]),

  /**
   * The elevation of the popover.
   */
  elevation: _propTypes.default.number,

  /**
   * This function is called in order to retrieve the content anchor element.
   * It's the opposite of the `anchorEl` prop.
   * The content anchor element should be an element inside the popover.
   * It's used to correctly scroll and set the position of the popover.
   * The positioning strategy tries to make the content anchor element just above the
   * anchor element.
   */
  getContentAnchorEl: _propTypes.default.func,

  /**
   * Specifies how close to the edge of the window the popover can appear.
   */
  marginThreshold: _propTypes.default.number,

  /**
   * Callback fired when the component requests to be closed.
   */
  onClose: _propTypes.default.func,

  /**
   * Callback fired before the component is entering.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onEnter: (0, _deprecatedPropType.default)(_propTypes.default.func, 'Use the `TransitionProps` prop instead.'),

  /**
   * Callback fired when the component has entered.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onEntered: (0, _deprecatedPropType.default)(_propTypes.default.func, 'Use the `TransitionProps` prop instead.'),

  /**
   * Callback fired when the component is entering.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onEntering: (0, _deprecatedPropType.default)(_propTypes.default.func, 'Use the `TransitionProps` prop instead.'),

  /**
   * Callback fired before the component is exiting.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onExit: (0, _deprecatedPropType.default)(_propTypes.default.func, 'Use the `TransitionProps` prop instead.'),

  /**
   * Callback fired when the component has exited.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onExited: (0, _deprecatedPropType.default)(_propTypes.default.func, 'Use the `TransitionProps` prop instead.'),

  /**
   * Callback fired when the component is exiting.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onExiting: (0, _deprecatedPropType.default)(_propTypes.default.func, 'Use the `TransitionProps` prop instead.'),

  /**
   * If `true`, the popover is visible.
   */
  open: _propTypes.default.bool.isRequired,

  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .shape({
    component: _utils.elementTypeAcceptingRef
  }),

  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   */
  transformOrigin: _propTypes.default.shape({
    horizontal: _propTypes.default.oneOfType([_propTypes.default.oneOf(['center', 'left', 'right']), _propTypes.default.number]).isRequired,
    vertical: _propTypes.default.oneOfType([_propTypes.default.oneOf(['bottom', 'center', 'top']), _propTypes.default.number]).isRequired
  }),

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent: _propTypes.default.elementType,

  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number, _propTypes.default.shape({
    appear: _propTypes.default.number,
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })]),

  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps: _propTypes.default.object
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiPopover'
})(Popover);

exports.default = _default;