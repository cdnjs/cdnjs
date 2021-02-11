"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _reactIs = require("react-is");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _transitions = require("../styles/transitions");

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _Zoom = _interopRequireDefault(require("../Zoom"));

var _Fab = _interopRequireDefault(require("../Fab"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _isMuiElement = _interopRequireDefault(require("../utils/isMuiElement"));

var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));

var _useControlled = _interopRequireDefault(require("../utils/useControlled"));

function getOrientation(direction) {
  if (direction === 'up' || direction === 'down') {
    return 'vertical';
  }

  if (direction === 'right' || direction === 'left') {
    return 'horizontal';
  }

  return undefined;
}

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

const dialRadius = 32;
const spacingActions = 16;

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    zIndex: theme.zIndex.speedDial,
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none'
  },

  /* Styles applied to the Fab component. */
  fab: {
    pointerEvents: 'auto'
  },

  /* Styles applied to the root element if direction="up" */
  directionUp: {
    flexDirection: 'column-reverse',
    '& $actions': {
      flexDirection: 'column-reverse',
      marginBottom: -dialRadius,
      paddingBottom: spacingActions + dialRadius
    }
  },

  /* Styles applied to the root element if direction="down" */
  directionDown: {
    flexDirection: 'column',
    '& $actions': {
      flexDirection: 'column',
      marginTop: -dialRadius,
      paddingTop: spacingActions + dialRadius
    }
  },

  /* Styles applied to the root element if direction="left" */
  directionLeft: {
    flexDirection: 'row-reverse',
    '& $actions': {
      flexDirection: 'row-reverse',
      marginRight: -dialRadius,
      paddingRight: spacingActions + dialRadius
    }
  },

  /* Styles applied to the root element if direction="right" */
  directionRight: {
    flexDirection: 'row',
    '& $actions': {
      flexDirection: 'row',
      marginLeft: -dialRadius,
      paddingLeft: spacingActions + dialRadius
    }
  },

  /* Styles applied to the actions (`children` wrapper) element. */
  actions: {
    display: 'flex',
    pointerEvents: 'auto'
  },

  /* Styles applied to the actions (`children` wrapper) element if `open={false}`. */
  actionsClosed: {
    transition: 'top 0s linear 0.2s',
    pointerEvents: 'none'
  }
});

exports.styles = styles;
const SpeedDial = /*#__PURE__*/React.forwardRef(function SpeedDial(props, ref) {
  const {
    ariaLabel,
    FabProps: {
      ref: origDialButtonRef
    } = {},
    children: childrenProp,
    classes,
    className,
    direction = 'up',
    hidden = false,
    icon,
    onBlur,
    onClose,
    onFocus,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onOpen,
    open: openProp,
    TransitionComponent = _Zoom.default,
    transitionDuration = {
      enter: _transitions.duration.enteringScreen,
      exit: _transitions.duration.leavingScreen
    },
    TransitionProps
  } = props,
        FabProps = (0, _objectWithoutPropertiesLoose2.default)(props.FabProps, ["ref"]),
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["ariaLabel", "FabProps", "children", "classes", "className", "direction", "hidden", "icon", "onBlur", "onClose", "onFocus", "onKeyDown", "onMouseEnter", "onMouseLeave", "onOpen", "open", "openIcon", "TransitionComponent", "transitionDuration", "TransitionProps"]);
  const [open, setOpenState] = (0, _useControlled.default)({
    controlled: openProp,
    default: false,
    name: 'SpeedDial',
    state: 'open'
  });
  const eventTimer = React.useRef();
  React.useEffect(() => {
    return () => {
      clearTimeout(eventTimer.current);
    };
  }, []);
  /**
   * an index in actions.current
   */

  const focusedAction = React.useRef(0);
  /**
   * pressing this key while the focus is on a child SpeedDialAction focuses
   * the next SpeedDialAction.
   * It is equal to the first arrow key pressed while focus is on the SpeedDial
   * that is not orthogonal to the direction.
   * @type {utils.ArrowKey?}
   */

  const nextItemArrowKey = React.useRef();
  /**
   * refs to the Button that have an action associated to them in this SpeedDial
   * [Fab, ...(SpeedDialActions > Button)]
   * @type {HTMLButtonElement[]}
   */

  const actions = React.useRef([]);
  actions.current = [actions.current[0]];
  const handleOwnFabRef = React.useCallback(fabFef => {
    actions.current[0] = fabFef;
  }, []);
  const handleFabRef = (0, _useForkRef.default)(origDialButtonRef, handleOwnFabRef);
  /**
   * creates a ref callback for the Button in a SpeedDialAction
   * Is called before the original ref callback for Button that was set in buttonProps
   *
   * @param dialActionIndex {number}
   * @param origButtonRef {React.RefObject?}
   */

  const createHandleSpeedDialActionButtonRef = (dialActionIndex, origButtonRef) => {
    return buttonRef => {
      actions.current[dialActionIndex + 1] = buttonRef;

      if (origButtonRef) {
        origButtonRef(buttonRef);
      }
    };
  };

  const handleKeyDown = event => {
    if (onKeyDown) {
      onKeyDown(event);
    }

    const key = event.key.replace('Arrow', '').toLowerCase();
    const {
      current: nextItemArrowKeyCurrent = key
    } = nextItemArrowKey;

    if (event.key === 'Escape') {
      setOpenState(false);

      if (onClose) {
        actions.current[0].focus();
        onClose(event, 'escapeKeyDown');
      }

      return;
    }

    if (getOrientation(key) === getOrientation(nextItemArrowKeyCurrent) && getOrientation(key) !== undefined) {
      event.preventDefault();
      const actionStep = key === nextItemArrowKeyCurrent ? 1 : -1; // stay within array indices

      const nextAction = clamp(focusedAction.current + actionStep, 0, actions.current.length - 1);
      actions.current[nextAction].focus();
      focusedAction.current = nextAction;
      nextItemArrowKey.current = nextItemArrowKeyCurrent;
    }
  };

  React.useEffect(() => {
    // actions were closed while navigation state was not reset
    if (!open) {
      focusedAction.current = 0;
      nextItemArrowKey.current = undefined;
    }
  }, [open]);

  const handleClose = event => {
    if (event.type === 'mouseleave' && onMouseLeave) {
      onMouseLeave(event);
    }

    if (event.type === 'blur' && onBlur) {
      onBlur(event);
    }

    clearTimeout(eventTimer.current);

    if (event.type === 'blur') {
      event.persist();
      eventTimer.current = setTimeout(() => {
        setOpenState(false);

        if (onClose) {
          onClose(event, 'blur');
        }
      });
    } else {
      setOpenState(false);

      if (onClose) {
        onClose(event, 'mouseLeave');
      }
    }
  };

  const handleClick = event => {
    if (FabProps.onClick) {
      FabProps.onClick(event);
    }

    clearTimeout(eventTimer.current);

    if (open) {
      setOpenState(false);

      if (onClose) {
        onClose(event, 'toggle');
      }
    } else {
      setOpenState(true);

      if (onOpen) {
        onOpen(event, 'toggle');
      }
    }
  };

  const handleOpen = event => {
    if (event.type === 'mouseenter' && onMouseEnter) {
      onMouseEnter(event);
    }

    if (event.type === 'focus' && onFocus) {
      onFocus(event);
    } // When moving the focus between two items,
    // a chain if blur and focus event is triggered.
    // We only handle the last event.


    clearTimeout(eventTimer.current);

    if (!open) {
      event.persist(); // Wait for a future focus or click event

      eventTimer.current = setTimeout(() => {
        setOpenState(true);

        if (onOpen) {
          const eventMap = {
            focus: 'focus',
            mouseenter: 'mouseEnter'
          };
          onOpen(event, eventMap[event.type]);
        }
      });
    }
  }; // Filter the label for valid id characters.


  const id = ariaLabel.replace(/^[^a-z]+|[^\w:.-]+/gi, '');
  const allItems = React.Children.toArray(childrenProp).filter(child => {
    if (process.env.NODE_ENV !== 'production') {
      if ((0, _reactIs.isFragment)(child)) {
        console.error(["Material-UI: The SpeedDial component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    return /*#__PURE__*/React.isValidElement(child);
  });
  const children = allItems.map((child, index) => {
    const {
      FabProps: {
        ref: origButtonRef
      } = {}
    } = child.props,
          ChildFabProps = (0, _objectWithoutPropertiesLoose2.default)(child.props.FabProps, ["ref"]);
    return /*#__PURE__*/React.cloneElement(child, {
      FabProps: (0, _extends2.default)({}, ChildFabProps, {
        ref: createHandleSpeedDialActionButtonRef(index, origButtonRef)
      }),
      delay: 30 * (open ? index : allItems.length - index),
      open,
      id: `${id}-action-${index}`
    });
  });
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, classes[`direction${(0, _capitalize.default)(direction)}`], className),
    ref: ref,
    role: "presentation",
    onKeyDown: handleKeyDown,
    onBlur: handleClose,
    onFocus: handleOpen,
    onMouseEnter: handleOpen,
    onMouseLeave: handleClose
  }, other), /*#__PURE__*/React.createElement(TransitionComponent, (0, _extends2.default)({
    in: !hidden,
    timeout: transitionDuration,
    unmountOnExit: true
  }, TransitionProps), /*#__PURE__*/React.createElement(_Fab.default, (0, _extends2.default)({
    color: "primary",
    "aria-label": ariaLabel,
    "aria-haspopup": "true",
    "aria-expanded": open,
    "aria-controls": `${id}-actions`
  }, FabProps, {
    onClick: handleClick,
    className: (0, _clsx.default)(classes.fab, FabProps.className),
    ref: handleFabRef
  }), /*#__PURE__*/React.isValidElement(icon) && (0, _isMuiElement.default)(icon, ['SpeedDialIcon']) ? /*#__PURE__*/React.cloneElement(icon, {
    open
  }) : icon)), /*#__PURE__*/React.createElement("div", {
    id: `${id}-actions`,
    role: "menu",
    "aria-orientation": getOrientation(direction),
    className: (0, _clsx.default)(classes.actions, !open && classes.actionsClosed)
  }, children));
});
process.env.NODE_ENV !== "production" ? SpeedDial.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The aria-label of the button element.
   * Also used to provide the `id` for the `SpeedDial` element and its children.
   */
  ariaLabel: _propTypes.default.string.isRequired,

  /**
   * SpeedDialActions to display when the SpeedDial is `open`.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The direction the actions open relative to the floating action button.
   * @default 'up'
   */
  direction: _propTypes.default.oneOf(['down', 'left', 'right', 'up']),

  /**
   * Props applied to the [`Fab`](/api/fab/) element.
   * @default {}
   */
  FabProps: _propTypes.default.object,

  /**
   * If `true`, the SpeedDial is hidden.
   * @default false
   */
  hidden: _propTypes.default.bool,

  /**
   * The icon to display in the SpeedDial Fab. The `SpeedDialIcon` component
   * provides a default Icon with animation.
   */
  icon: _propTypes.default.node,

  /**
   * @ignore
   */
  onBlur: _propTypes.default.func,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"blur"`, `"mouseLeave"`, `"escapeKeyDown"`.
   */
  onClose: _propTypes.default.func,

  /**
   * @ignore
   */
  onFocus: _propTypes.default.func,

  /**
   * @ignore
   */
  onKeyDown: _propTypes.default.func,

  /**
   * @ignore
   */
  onMouseEnter: _propTypes.default.func,

  /**
   * @ignore
   */
  onMouseLeave: _propTypes.default.func,

  /**
   * Callback fired when the component requests to be open.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"focus"`, `"mouseEnter"`.
   */
  onOpen: _propTypes.default.func,

  /**
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool,

  /**
   * The icon to display in the SpeedDial Fab when the SpeedDial is open.
   */
  openIcon: _propTypes.default.node,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Zoom
   */
  TransitionComponent: _propTypes.default.elementType,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: duration.enteringScreen,
   *   exit: duration.leavingScreen,
   * }
   */
  transitionDuration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    appear: _propTypes.default.number,
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })]),

  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps: _propTypes.default.object
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiSpeedDial'
})(SpeedDial);

exports.default = _default;