"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _LinearProgress = _interopRequireDefault(require("../LinearProgress"));

var styles = function styles(theme) {
  return {
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
  };
};

exports.styles = styles;
var MobileStepper = /*#__PURE__*/React.forwardRef(function MobileStepper(props, ref) {
  var _props$activeStep = props.activeStep,
      activeStep = _props$activeStep === void 0 ? 0 : _props$activeStep,
      backButton = props.backButton,
      classes = props.classes,
      className = props.className,
      LinearProgressProps = props.LinearProgressProps,
      nextButton = props.nextButton,
      _props$position = props.position,
      position = _props$position === void 0 ? 'bottom' : _props$position,
      steps = props.steps,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'dots' : _props$variant,
      other = (0, _objectWithoutProperties2.default)(props, ["activeStep", "backButton", "classes", "className", "LinearProgressProps", "nextButton", "position", "steps", "variant"]);
  return /*#__PURE__*/React.createElement(_Paper.default, (0, _extends2.default)({
    square: true,
    elevation: 0,
    className: (0, _clsx.default)(classes.root, classes["position".concat((0, _capitalize.default)(position))], className),
    ref: ref
  }, other), backButton, variant === 'text' && /*#__PURE__*/React.createElement(React.Fragment, null, activeStep + 1, " / ", steps), variant === 'dots' && /*#__PURE__*/React.createElement("div", {
    className: classes.dots
  }, (0, _toConsumableArray2.default)(new Array(steps)).map(function (_, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: (0, _clsx.default)(classes.dot, index === activeStep && classes.dotActive)
    });
  })), variant === 'progress' && /*#__PURE__*/React.createElement(_LinearProgress.default, (0, _extends2.default)({
    className: classes.progress,
    variant: "determinate",
    value: Math.ceil(activeStep / (steps - 1) * 100)
  }, LinearProgressProps)), nextButton);
});
process.env.NODE_ENV !== "production" ? MobileStepper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the variant is 'dots'.
   */
  activeStep: _propTypes.default.number,

  /**
   * A back button element. For instance, it can be a `Button` or an `IconButton`.
   */
  backButton: _propTypes.default.node,

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
   * Props applied to the `LinearProgress` element.
   */
  LinearProgressProps: _propTypes.default.object,

  /**
   * A next button element. For instance, it can be a `Button` or an `IconButton`.
   */
  nextButton: _propTypes.default.node,

  /**
   * Set the positioning type.
   */
  position: _propTypes.default.oneOf(['bottom', 'static', 'top']),

  /**
   * The total steps.
   */
  steps: _propTypes.default.number.isRequired,

  /**
   * The variant to use.
   */
  variant: _propTypes.default.oneOf(['dots', 'progress', 'text'])
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiMobileStepper'
})(MobileStepper);

exports.default = _default;