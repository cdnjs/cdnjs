import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge, elementAcceptingRef } from '@material-ui/utils';
import { fade } from '../styles/colorManipulator';
import withStyles from '../styles/withStyles';
import capitalize from '../utils/capitalize';
import Grow from '../Grow';
import Popper from '../Popper';
import useForkRef from '../utils/useForkRef';
import useId from '../utils/unstable_useId';
import setRef from '../utils/setRef';
import useIsFocusVisible from '../utils/useIsFocusVisible';
import useControlled from '../utils/useControlled';
import useTheme from '../styles/useTheme';

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

function arrowGenerator() {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.71em',
      marginLeft: 4,
      marginRight: 4,
      '&::before': {
        transformOrigin: '0 100%'
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.71em',
      marginLeft: 4,
      marginRight: 4,
      '&::before': {
        transformOrigin: '100% 0'
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.71em',
      height: '1em',
      width: '0.71em',
      marginTop: 4,
      marginBottom: 4,
      '&::before': {
        transformOrigin: '100% 100%'
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.71em',
      height: '1em',
      width: '0.71em',
      marginTop: 4,
      marginBottom: 4,
      '&::before': {
        transformOrigin: '0 0'
      }
    }
  };
}

export var styles = function styles(theme) {
  return {
    /* Styles applied to the Popper component. */
    popper: {
      zIndex: theme.zIndex.tooltip,
      pointerEvents: 'none' // disable jss-rtl plugin

    },

    /* Styles applied to the Popper component if `interactive={true}`. */
    popperInteractive: {
      pointerEvents: 'auto'
    },

    /* Styles applied to the Popper component if `arrow={true}`. */
    popperArrow: arrowGenerator(),

    /* Styles applied to the tooltip (label wrapper) element. */
    tooltip: {
      backgroundColor: fade(theme.palette.grey[700], 0.9),
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.common.white,
      fontFamily: theme.typography.fontFamily,
      padding: '4px 8px',
      fontSize: theme.typography.pxToRem(10),
      lineHeight: "".concat(round(14 / 10), "em"),
      maxWidth: 300,
      wordWrap: 'break-word',
      fontWeight: theme.typography.fontWeightMedium
    },

    /* Styles applied to the tooltip (label wrapper) element if `arrow={true}`. */
    tooltipArrow: {
      position: 'relative',
      margin: '0'
    },

    /* Styles applied to the arrow element. */
    arrow: {
      overflow: 'hidden',
      position: 'absolute',
      width: '1em',
      height: '0.71em'
      /* = width / sqrt(2) = (length of the hypotenuse) */
      ,
      boxSizing: 'border-box',
      color: fade(theme.palette.grey[700], 0.9),
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundColor: 'currentColor',
        transform: 'rotate(45deg)'
      }
    },

    /* Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch. */
    touch: {
      padding: '8px 16px',
      fontSize: theme.typography.pxToRem(14),
      lineHeight: "".concat(round(16 / 14), "em"),
      fontWeight: theme.typography.fontWeightRegular
    },

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "left". */
    tooltipPlacementLeft: _defineProperty({
      transformOrigin: 'right center',
      margin: '0 24px '
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
    tooltipPlacementRight: _defineProperty({
      transformOrigin: 'left center',
      margin: '0 24px'
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
    tooltipPlacementTop: _defineProperty({
      transformOrigin: 'center bottom',
      margin: '24px 0'
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    }),

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
    tooltipPlacementBottom: _defineProperty({
      transformOrigin: 'center top',
      margin: '24px 0'
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    })
  };
};
var hystersisOpen = false;
var hystersisTimer = null;
export function testReset() {
  hystersisOpen = false;
  clearTimeout(hystersisTimer);
}
var Tooltip = /*#__PURE__*/React.forwardRef(function Tooltip(props, ref) {
  var _props$arrow = props.arrow,
      arrow = _props$arrow === void 0 ? false : _props$arrow,
      children = props.children,
      classes = props.classes,
      _props$disableFocusLi = props.disableFocusListener,
      disableFocusListener = _props$disableFocusLi === void 0 ? false : _props$disableFocusLi,
      _props$disableHoverLi = props.disableHoverListener,
      disableHoverListener = _props$disableHoverLi === void 0 ? false : _props$disableHoverLi,
      _props$disableTouchLi = props.disableTouchListener,
      disableTouchListener = _props$disableTouchLi === void 0 ? false : _props$disableTouchLi,
      _props$enterDelay = props.enterDelay,
      enterDelay = _props$enterDelay === void 0 ? 100 : _props$enterDelay,
      _props$enterNextDelay = props.enterNextDelay,
      enterNextDelay = _props$enterNextDelay === void 0 ? 0 : _props$enterNextDelay,
      _props$enterTouchDela = props.enterTouchDelay,
      enterTouchDelay = _props$enterTouchDela === void 0 ? 700 : _props$enterTouchDela,
      idProp = props.id,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? false : _props$interactive,
      _props$leaveDelay = props.leaveDelay,
      leaveDelay = _props$leaveDelay === void 0 ? 0 : _props$leaveDelay,
      _props$leaveTouchDela = props.leaveTouchDelay,
      leaveTouchDelay = _props$leaveTouchDela === void 0 ? 1500 : _props$leaveTouchDela,
      onClose = props.onClose,
      onOpen = props.onOpen,
      openProp = props.open,
      _props$placement = props.placement,
      placement = _props$placement === void 0 ? 'bottom' : _props$placement,
      _props$PopperComponen = props.PopperComponent,
      PopperComponent = _props$PopperComponen === void 0 ? Popper : _props$PopperComponen,
      PopperProps = props.PopperProps,
      title = props.title,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? Grow : _props$TransitionComp,
      TransitionProps = props.TransitionProps,
      other = _objectWithoutProperties(props, ["arrow", "children", "classes", "disableFocusListener", "disableHoverListener", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "id", "interactive", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "title", "TransitionComponent", "TransitionProps"]);

  var theme = useTheme();

  var _React$useState = React.useState(),
      childNode = _React$useState[0],
      setChildNode = _React$useState[1];

  var _React$useState2 = React.useState(null),
      arrowRef = _React$useState2[0],
      setArrowRef = _React$useState2[1];

  var ignoreNonTouchEvents = React.useRef(false);
  var closeTimer = React.useRef();
  var enterTimer = React.useRef();
  var leaveTimer = React.useRef();
  var touchTimer = React.useRef();

  var _useControlled = useControlled({
    controlled: openProp,
    default: false,
    name: 'Tooltip',
    state: 'open'
  }),
      _useControlled2 = _slicedToArray(_useControlled, 2),
      openState = _useControlled2[0],
      setOpenState = _useControlled2[1];

  var open = openState;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var _React$useRef = React.useRef(openProp !== undefined),
        isControlled = _React$useRef.current; // eslint-disable-next-line react-hooks/rules-of-hooks


    React.useEffect(function () {
      if (childNode && childNode.disabled && !isControlled && title !== '' && childNode.tagName.toLowerCase() === 'button') {
        console.error(['Material-UI: You are providing a disabled `button` child to the Tooltip component.', 'A disabled element does not fire events.', "Tooltip needs to listen to the child element's events to display the title.", '', 'Add a simple wrapper element, such as a `span`.'].join('\n'));
      }
    }, [title, childNode, isControlled]);
  }

  var id = useId(idProp);
  React.useEffect(function () {
    return function () {
      clearTimeout(closeTimer.current);
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      clearTimeout(touchTimer.current);
    };
  }, []);

  var handleOpen = function handleOpen(event) {
    clearTimeout(hystersisTimer);
    hystersisOpen = true; // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.

    setOpenState(true);

    if (onOpen) {
      onOpen(event);
    }
  };

  var handleEnter = function handleEnter() {
    var forward = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return function (event) {
      var childrenProps = children.props;

      if (event.type === 'mouseover' && childrenProps.onMouseOver && forward) {
        childrenProps.onMouseOver(event);
      }

      if (ignoreNonTouchEvents.current && event.type !== 'touchstart') {
        return;
      } // Remove the title ahead of time.
      // We don't want to wait for the next render commit.
      // We would risk displaying two tooltips at the same time (native + this one).


      if (childNode) {
        childNode.removeAttribute('title');
      }

      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);

      if (enterDelay || hystersisOpen && enterNextDelay) {
        event.persist();
        enterTimer.current = setTimeout(function () {
          handleOpen(event);
        }, hystersisOpen ? enterNextDelay : enterDelay);
      } else {
        handleOpen(event);
      }
    };
  };

  var _useIsFocusVisible = useIsFocusVisible(),
      isFocusVisible = _useIsFocusVisible.isFocusVisible,
      onBlurVisible = _useIsFocusVisible.onBlurVisible,
      focusVisibleRef = _useIsFocusVisible.ref;

  var _React$useState3 = React.useState(false),
      childIsFocusVisible = _React$useState3[0],
      setChildIsFocusVisible = _React$useState3[1];

  var handleBlur = function handleBlur() {
    if (childIsFocusVisible) {
      setChildIsFocusVisible(false);
      onBlurVisible();
    }
  };

  var handleFocus = function handleFocus() {
    var forward = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return function (event) {
      // Workaround for https://github.com/facebook/react/issues/7769
      // The autoFocus of React might trigger the event before the componentDidMount.
      // We need to account for this eventuality.
      if (!childNode) {
        setChildNode(event.currentTarget);
      }

      if (isFocusVisible(event)) {
        setChildIsFocusVisible(true);
        handleEnter()(event);
      }

      var childrenProps = children.props;

      if (childrenProps.onFocus && forward) {
        childrenProps.onFocus(event);
      }
    };
  };

  var handleClose = function handleClose(event) {
    clearTimeout(hystersisTimer);
    hystersisTimer = setTimeout(function () {
      hystersisOpen = false;
    }, 800 + leaveDelay);
    setOpenState(false);

    if (onClose) {
      onClose(event);
    }

    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(function () {
      ignoreNonTouchEvents.current = false;
    }, theme.transitions.duration.shortest);
  };

  var handleLeave = function handleLeave() {
    var forward = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return function (event) {
      var childrenProps = children.props;

      if (event.type === 'blur') {
        if (childrenProps.onBlur && forward) {
          childrenProps.onBlur(event);
        }

        handleBlur();
      }

      if (event.type === 'mouseleave' && childrenProps.onMouseLeave && event.currentTarget === childNode) {
        childrenProps.onMouseLeave(event);
      }

      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      event.persist();
      leaveTimer.current = setTimeout(function () {
        handleClose(event);
      }, leaveDelay);
    };
  };

  var detectTouchStart = function detectTouchStart(event) {
    ignoreNonTouchEvents.current = true;
    var childrenProps = children.props;

    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }
  };

  var handleTouchStart = function handleTouchStart(event) {
    detectTouchStart(event);
    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    clearTimeout(touchTimer.current);
    event.persist();
    touchTimer.current = setTimeout(function () {
      handleEnter()(event);
    }, enterTouchDelay);
  };

  var handleTouchEnd = function handleTouchEnd(event) {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    clearTimeout(touchTimer.current);
    clearTimeout(leaveTimer.current);
    event.persist();
    leaveTimer.current = setTimeout(function () {
      handleClose(event);
    }, leaveTouchDelay);
  };

  var handleUseRef = useForkRef(setChildNode, ref);
  var handleFocusRef = useForkRef(focusVisibleRef, handleUseRef); // can be removed once we drop support for non ref forwarding class components

  var handleOwnRef = React.useCallback(function (instance) {
    // #StrictMode ready
    setRef(handleFocusRef, ReactDOM.findDOMNode(instance));
  }, [handleFocusRef]);
  var handleRef = useForkRef(children.ref, handleOwnRef); // There is no point in displaying an empty tooltip.

  if (title === '') {
    open = false;
  } // For accessibility and SEO concerns, we render the title to the DOM node when
  // the tooltip is hidden. However, we have made a tradeoff when
  // `disableHoverListener` is set. This title logic is disabled.
  // It's allowing us to keep the implementation size minimal.
  // We are open to change the tradeoff.


  var shouldShowNativeTitle = !open && !disableHoverListener;

  var childrenProps = _extends({
    'aria-describedby': open ? id : null,
    title: shouldShowNativeTitle && typeof title === 'string' ? title : null
  }, other, children.props, {
    className: clsx(other.className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef
  });

  var interactiveWrapperListeners = {};

  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }

  if (!disableHoverListener) {
    childrenProps.onMouseOver = handleEnter();
    childrenProps.onMouseLeave = handleLeave();

    if (interactive) {
      interactiveWrapperListeners.onMouseOver = handleEnter(false);
      interactiveWrapperListeners.onMouseLeave = handleLeave(false);
    }
  }

  if (!disableFocusListener) {
    childrenProps.onFocus = handleFocus();
    childrenProps.onBlur = handleLeave();

    if (interactive) {
      interactiveWrapperListeners.onFocus = handleFocus(false);
      interactiveWrapperListeners.onBlur = handleLeave(false);
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    if (children.props.title) {
      console.error(['Material-UI: You have provided a `title` prop to the child of <Tooltip />.', "Remove this title prop `".concat(children.props.title, "` or the Tooltip component.")].join('\n'));
    }
  }

  var mergedPopperProps = React.useMemo(function () {
    return deepmerge({
      popperOptions: {
        modifiers: {
          arrow: {
            enabled: Boolean(arrowRef),
            element: arrowRef
          }
        }
      }
    }, PopperProps);
  }, [arrowRef, PopperProps]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.cloneElement(children, childrenProps), /*#__PURE__*/React.createElement(PopperComponent, _extends({
    className: clsx(classes.popper, interactive && classes.popperInteractive, arrow && classes.popperArrow),
    placement: placement,
    anchorEl: childNode,
    open: childNode ? open : false,
    id: childrenProps['aria-describedby'],
    transition: true
  }, interactiveWrapperListeners, mergedPopperProps), function (_ref) {
    var placementInner = _ref.placement,
        TransitionPropsInner = _ref.TransitionProps;
    return /*#__PURE__*/React.createElement(TransitionComponent, _extends({
      timeout: theme.transitions.duration.shorter
    }, TransitionPropsInner, TransitionProps), /*#__PURE__*/React.createElement("div", {
      className: clsx(classes.tooltip, classes["tooltipPlacement".concat(capitalize(placementInner.split('-')[0]))], ignoreNonTouchEvents.current && classes.touch, arrow && classes.tooltipArrow)
    }, title, arrow ? /*#__PURE__*/React.createElement("span", {
      className: classes.arrow,
      ref: setArrowRef
    }) : null));
  }));
});
process.env.NODE_ENV !== "production" ? Tooltip.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, adds an arrow to the tooltip.
   */
  arrow: PropTypes.bool,

  /**
   * Tooltip reference element.
   */
  children: elementAcceptingRef.isRequired,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * Do not respond to focus events.
   */
  disableFocusListener: PropTypes.bool,

  /**
   * Do not respond to hover events.
   */
  disableHoverListener: PropTypes.bool,

  /**
   * Do not respond to long press touch events.
   */
  disableTouchListener: PropTypes.bool,

  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   */
  enterDelay: PropTypes.number,

  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   */
  enterNextDelay: PropTypes.number,

  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   */
  enterTouchDelay: PropTypes.number,

  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,

  /**
   * Makes a tooltip interactive, i.e. will not close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   */
  interactive: PropTypes.bool,

  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   */
  leaveDelay: PropTypes.number,

  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   */
  leaveTouchDelay: PropTypes.number,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,

  /**
   * Callback fired when the component requests to be open.
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func,

  /**
   * If `true`, the tooltip is shown.
   */
  open: PropTypes.bool,

  /**
   * Tooltip placement.
   */
  placement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * The component used for the popper.
   */
  PopperComponent: PropTypes.elementType,

  /**
   * Props applied to the [`Popper`](/api/popper/) element.
   */
  PopperProps: PropTypes.object,

  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: PropTypes
  /* @typescript-to-proptypes-ignore */
  .node.isRequired,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent: PropTypes.elementType,

  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps: PropTypes.object
} : void 0;
export default withStyles(styles, {
  name: 'MuiTooltip',
  flip: false
})(Tooltip);