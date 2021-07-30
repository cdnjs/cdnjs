"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _StepConnector = _interopRequireDefault(require("../StepConnector"));

var styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    padding: 24
  },

  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    flexDirection: 'column'
  },

  /* Styles applied to the root element if `alternativeLabel={true}`. */
  alternativeLabel: {
    alignItems: 'flex-start'
  }
};
exports.styles = styles;
var defaultConnector = /*#__PURE__*/React.createElement(_StepConnector.default, null);
var Stepper = /*#__PURE__*/React.forwardRef(function Stepper(props, ref) {
  var _props$activeStep = props.activeStep,
      activeStep = _props$activeStep === void 0 ? 0 : _props$activeStep,
      _props$alternativeLab = props.alternativeLabel,
      alternativeLabel = _props$alternativeLab === void 0 ? false : _props$alternativeLab,
      children = props.children,
      classes = props.classes,
      className = props.className,
      _props$connector = props.connector,
      connectorProp = _props$connector === void 0 ? defaultConnector : _props$connector,
      _props$nonLinear = props.nonLinear,
      nonLinear = _props$nonLinear === void 0 ? false : _props$nonLinear,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
      other = (0, _objectWithoutProperties2.default)(props, ["activeStep", "alternativeLabel", "children", "classes", "className", "connector", "nonLinear", "orientation"]);
  var connector = /*#__PURE__*/React.isValidElement(connectorProp) ? /*#__PURE__*/React.cloneElement(connectorProp, {
    orientation: orientation
  }) : null;
  var childrenArray = React.Children.toArray(children);
  var steps = childrenArray.map(function (step, index) {
    var state = {
      index: index,
      active: false,
      completed: false,
      disabled: false
    };

    if (activeStep === index) {
      state.active = true;
    } else if (!nonLinear && activeStep > index) {
      state.completed = true;
    } else if (!nonLinear && activeStep < index) {
      state.disabled = true;
    }

    return /*#__PURE__*/React.cloneElement(step, (0, _extends2.default)({
      alternativeLabel: alternativeLabel,
      connector: connector,
      last: index + 1 === childrenArray.length,
      orientation: orientation
    }, state, step.props));
  });
  return /*#__PURE__*/React.createElement(_Paper.default, (0, _extends2.default)({
    square: true,
    elevation: 0,
    className: (0, _clsx.default)(classes.root, classes[orientation], className, alternativeLabel && classes.alternativeLabel),
    ref: ref
  }, other), steps);
});
process.env.NODE_ENV !== "production" ? Stepper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the active step (zero based index).
   * Set to -1 to disable all the steps.
   */
  activeStep: _propTypes.default.number,

  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   */
  alternativeLabel: _propTypes.default.bool,

  /**
   * Two or more `<Step />` components.
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
   * An element to be placed between each step.
   */
  connector: _propTypes.default.element,

  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   */
  nonLinear: _propTypes.default.bool,

  /**
   * The stepper orientation (layout flow direction).
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical'])
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiStepper'
})(Stepper);

exports.default = _default;