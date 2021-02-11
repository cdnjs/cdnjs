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

var _StepConnector = _interopRequireDefault(require("../StepConnector"));

var _StepperContext = _interopRequireDefault(require("./StepperContext"));

const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex'
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
const defaultConnector = /*#__PURE__*/React.createElement(_StepConnector.default, null);
const Stepper = /*#__PURE__*/React.forwardRef(function Stepper(props, ref) {
  const {
    activeStep = 0,
    alternativeLabel = false,
    children,
    classes,
    className,
    connector = defaultConnector,
    nonLinear = false,
    orientation = 'horizontal'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["activeStep", "alternativeLabel", "children", "classes", "className", "connector", "nonLinear", "orientation"]);
  const childrenArray = React.Children.toArray(children);
  const steps = childrenArray.map((step, index) => {
    return /*#__PURE__*/React.cloneElement(step, (0, _extends2.default)({
      index,
      last: index + 1 === childrenArray.length
    }, step.props));
  });
  const contextValue = React.useMemo(() => ({
    activeStep,
    alternativeLabel,
    connector,
    nonLinear,
    orientation
  }), [activeStep, alternativeLabel, connector, nonLinear, orientation]);
  return /*#__PURE__*/React.createElement(_StepperContext.default.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, classes[orientation], className, alternativeLabel && classes.alternativeLabel),
    ref: ref
  }, other), steps));
});
process.env.NODE_ENV !== "production" ? Stepper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the active step (zero based index).
   * Set to -1 to disable all the steps.
   * @default 0
   */
  activeStep: _propTypes.default.number,

  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   * @default false
   */
  alternativeLabel: _propTypes.default.bool,

  /**
   * Two or more `<Step />` components.
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
   * An element to be placed between each step.
   * @default <StepConnector />
   */
  connector: _propTypes.default.element,

  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   * @default false
   */
  nonLinear: _propTypes.default.bool,

  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical'])
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiStepper'
})(Stepper);

exports.default = _default;