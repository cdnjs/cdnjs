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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _Modal = _interopRequireDefault(require("../Modal"));

var _Fade = _interopRequireDefault(require("../Fade"));

var _transitions = require("../styles/transitions");

var _Paper = _interopRequireDefault(require("../Paper"));

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    '@media print': {
      // Use !important to override the Modal inline-style.
      position: 'absolute !important'
    }
  },

  /* Styles applied to the container element if `scroll="paper"`. */
  scrollPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  /* Styles applied to the container element if `scroll="body"`. */
  scrollBody: {
    overflowY: 'auto',
    overflowX: 'hidden',
    textAlign: 'center',
    '&:after': {
      content: '""',
      display: 'inline-block',
      verticalAlign: 'middle',
      height: '100%',
      width: '0'
    }
  },

  /* Styles applied to the container element. */
  container: {
    height: '100%',
    '@media print': {
      height: 'auto'
    },
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0
  },

  /* Styles applied to the Paper component. */
  paper: {
    margin: 32,
    position: 'relative',
    overflowY: 'auto',
    // Fix IE11 issue, to remove at some point.
    '@media print': {
      overflowY: 'visible',
      boxShadow: 'none'
    }
  },

  /* Styles applied to the Paper component if `scroll="paper"`. */
  paperScrollPaper: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100% - 64px)'
  },

  /* Styles applied to the Paper component if `scroll="body"`. */
  paperScrollBody: {
    display: 'inline-block',
    verticalAlign: 'middle',
    textAlign: 'left' // 'initial' doesn't work on IE11

  },

  /* Styles applied to the Paper component if `maxWidth=false`. */
  paperWidthFalse: {
    maxWidth: 'calc(100% - 64px)'
  },

  /* Styles applied to the Paper component if `maxWidth="xs"`. */
  paperWidthXs: {
    maxWidth: Math.max(theme.breakpoints.values.xs, 444),
    '&$paperScrollBody': {
      [theme.breakpoints.down(Math.max(theme.breakpoints.values.xs, 444) + 32 * 2)]: {
        maxWidth: 'calc(100% - 64px)'
      }
    }
  },

  /* Styles applied to the Paper component if `maxWidth="sm"`. */
  paperWidthSm: {
    maxWidth: theme.breakpoints.values.sm,
    '&$paperScrollBody': {
      [theme.breakpoints.down(theme.breakpoints.values.sm + 32 * 2)]: {
        maxWidth: 'calc(100% - 64px)'
      }
    }
  },

  /* Styles applied to the Paper component if `maxWidth="md"`. */
  paperWidthMd: {
    maxWidth: theme.breakpoints.values.md,
    '&$paperScrollBody': {
      [theme.breakpoints.down(theme.breakpoints.values.md + 32 * 2)]: {
        maxWidth: 'calc(100% - 64px)'
      }
    }
  },

  /* Styles applied to the Paper component if `maxWidth="lg"`. */
  paperWidthLg: {
    maxWidth: theme.breakpoints.values.lg,
    '&$paperScrollBody': {
      [theme.breakpoints.down(theme.breakpoints.values.lg + 32 * 2)]: {
        maxWidth: 'calc(100% - 64px)'
      }
    }
  },

  /* Styles applied to the Paper component if `maxWidth="xl"`. */
  paperWidthXl: {
    maxWidth: theme.breakpoints.values.xl,
    '&$paperScrollBody': {
      [theme.breakpoints.down(theme.breakpoints.values.xl + 32 * 2)]: {
        maxWidth: 'calc(100% - 64px)'
      }
    }
  },

  /* Styles applied to the Paper component if `fullWidth={true}`. */
  paperFullWidth: {
    width: 'calc(100% - 64px)'
  },

  /* Styles applied to the Paper component if `fullScreen={true}`. */
  paperFullScreen: {
    margin: 0,
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    maxHeight: 'none',
    borderRadius: 0,
    '&$paperScrollBody': {
      margin: 0,
      maxWidth: '100%'
    }
  }
});

exports.styles = styles;
const defaultTransitionDuration = {
  enter: _transitions.duration.enteringScreen,
  exit: _transitions.duration.leavingScreen
};
/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */

const Dialog = /*#__PURE__*/React.forwardRef(function Dialog(props, ref) {
  const {
    BackdropProps,
    children,
    classes,
    className,
    disableEscapeKeyDown = false,
    fullScreen = false,
    fullWidth = false,
    maxWidth = 'sm',
    onBackdropClick,
    onClose,
    open,
    PaperComponent = _Paper.default,
    PaperProps = {},
    scroll = 'paper',
    TransitionComponent = _Fade.default,
    transitionDuration = defaultTransitionDuration,
    TransitionProps,
    'aria-describedby': ariaDescribedby,
    'aria-labelledby': ariaLabelledby
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["BackdropProps", "children", "classes", "className", "disableEscapeKeyDown", "fullScreen", "fullWidth", "maxWidth", "onBackdropClick", "onClose", "open", "PaperComponent", "PaperProps", "scroll", "TransitionComponent", "transitionDuration", "TransitionProps", "aria-describedby", "aria-labelledby"]);
  const backdropClick = React.useRef();

  const handleMouseDown = event => {
    // We don't want to close the dialog when clicking the dialog content.
    // Make sure the event starts and ends on the same DOM element.
    backdropClick.current = event.target === event.currentTarget;
  };

  const handleBackdropClick = event => {
    // Ignore the events not coming from the "backdrop".
    if (!backdropClick.current) {
      return;
    }

    backdropClick.current = null;

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };

  return /*#__PURE__*/React.createElement(_Modal.default, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    BackdropProps: (0, _extends2.default)({
      transitionDuration
    }, BackdropProps),
    closeAfterTransition: true,
    disableEscapeKeyDown: disableEscapeKeyDown,
    onClose: onClose,
    open: open,
    ref: ref,
    onClick: handleBackdropClick
  }, other), /*#__PURE__*/React.createElement(TransitionComponent, (0, _extends2.default)({
    appear: true,
    in: open,
    timeout: transitionDuration,
    role: "presentation"
  }, TransitionProps), /*#__PURE__*/React.createElement("div", {
    className: (0, _clsx.default)(classes.container, classes[`scroll${(0, _capitalize.default)(scroll)}`]),
    onMouseDown: handleMouseDown
  }, /*#__PURE__*/React.createElement(PaperComponent, (0, _extends2.default)({
    elevation: 24,
    role: "dialog",
    "aria-describedby": ariaDescribedby,
    "aria-labelledby": ariaLabelledby
  }, PaperProps, {
    className: (0, _clsx.default)(classes.paper, classes[`paperScroll${(0, _capitalize.default)(scroll)}`], classes[`paperWidth${(0, _capitalize.default)(String(maxWidth))}`], PaperProps.className, fullScreen && classes.paperFullScreen, fullWidth && classes.paperFullWidth)
  }), children))));
});
process.env.NODE_ENV !== "production" ? Dialog.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  'aria-describedby': _propTypes.default.string,

  /**
   * The id(s) of the element(s) that label the dialog.
   */
  'aria-labelledby': _propTypes.default.string,

  /**
   * @ignore
   */
  BackdropProps: _propTypes.default.object,

  /**
   * Dialog children, usually the included sub-components.
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
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: _propTypes.default.bool,

  /**
   * If `true`, the dialog is full-screen.
   * @default false
   */
  fullScreen: _propTypes.default.bool,

  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   * @default false
   */
  fullWidth: _propTypes.default.bool,

  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'sm'
   */
  maxWidth: _propTypes.default.oneOf(['lg', 'md', 'sm', 'xl', 'xs', false]),

  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick: _propTypes.default.func,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: _propTypes.default.func,

  /**
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool.isRequired,

  /**
   * The component used to render the body of the dialog.
   * @default Paper
   */
  PaperComponent: _propTypes.default.elementType,

  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   * @default {}
   */
  PaperProps: _propTypes.default.object,

  /**
   * Determine the container for scrolling the dialog.
   * @default 'paper'
   */
  scroll: _propTypes.default.oneOf(['body', 'paper']),

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: _propTypes.default.elementType,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default { enter: duration.enteringScreen, exit: duration.leavingScreen }
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
  name: 'MuiDialog'
})(Dialog);

exports.default = _default;