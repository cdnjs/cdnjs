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

var _utils = require("@material-ui/utils");

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _LinearProgress = _interopRequireDefault(require("../LinearProgress"));

var _jsxRuntime = require("react/jsx-runtime");

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.background.default,
    padding: 8
  },

  /* Styles applied to the root element if `position="bottom"`. */
  positionBottom: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.mobileStepper
  },

  /* Styles applied to the root element if `position="top"`. */
  positionTop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.mobileStepper
  },

  /* Styles applied to the root element if `position="static"`. */
  positionStatic: {},

  /* Styles applied to the dots container if `variant="dots"`. */
  dots: {
    display: 'flex',
    flexDirection: 'row'
  },

  /* Styles applied to each dot if `variant="dots"`. */
  dot: {
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest
    }),
    backgroundColor: theme.palette.action.disabled,
    borderRadius: '50%',
    width: 8,
    height: 8,
    margin: '0 2px'
  },

  /* Styles applied to a dot if `variant="dots"` and this is the active step. */
  dotActive: {
    backgroundColor: theme.palette.primary.main
  },

  /* Styles applied to the Linear Progress component if `variant="progress"`. */
  progress: {
    width: '50%'
  }
});

exports.styles = styles;
const MobileStepper = /*#__PURE__*/React.forwardRef(function MobileStepper(props, ref) {
  const {
    activeStep = 0,
    backButton,
    classes,
    className,
    LinearProgressProps,
    nextButton,
    position = 'bottom',
    steps,
    variant = 'dots'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["activeStep", "backButton", "classes", "className", "LinearProgressProps", "nextButton", "position", "steps", "variant"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Paper.default, (0, _extends2.default)({
    square: true,
    elevation: 0,
    className: (0, _clsx.default)(classes.root, classes[`position${(0, _capitalize.default)(position)}`], className),
    ref: ref
  }, other, {
    children: [backButton, variant === 'text' && /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
      children: [activeStep + 1, " / ", steps]
    }), variant === 'dots' && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: classes.dots,
      children: [...new Array(steps)].map((_, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: (0, _clsx.default)(classes.dot, index === activeStep && classes.dotActive)
      }, index))
    }), variant === 'progress' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LinearProgress.default, (0, _extends2.default)({
      className: classes.progress,
      variant: "determinate",
      value: Math.ceil(activeStep / (steps - 1) * 100)
    }, LinearProgressProps)), nextButton]
  }));
});
process.env.NODE_ENV !== "production" ? MobileStepper.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the variant is 'dots'.
   * @default 0
   */
  activeStep: _utils.integerPropType,

  /**
   * A back button element. For instance, it can be a `Button` or an `IconButton`.
   */
  backButton: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Props applied to the `LinearProgress` element.
   */
  LinearProgressProps: _propTypes.default.object,

  /**
   * A next button element. For instance, it can be a `Button` or an `IconButton`.
   */
  nextButton: _propTypes.default.node,

  /**
   * Set the positioning type.
   * @default 'bottom'
   */
  position: _propTypes.default.oneOf(['bottom', 'static', 'top']),

  /**
   * The total steps.
   */
  steps: _utils.integerPropType.isRequired,

  /**
   * The variant to use.
   * @default 'dots'
   */
  variant: _propTypes.default.oneOf(['dots', 'progress', 'text'])
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiMobileStepper'
})(MobileStepper);

exports.default = _default;