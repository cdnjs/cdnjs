"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _stepperClasses = require("./stepperClasses");

var _StepConnector = _interopRequireDefault(require("../StepConnector"));

var _StepperContext = _interopRequireDefault(require("./StepperContext"));

var _jsxRuntime = require("react/jsx-runtime");

const useUtilityClasses = styleProps => {
  const {
    orientation,
    alternativeLabel,
    classes
  } = styleProps;
  const slots = {
    root: ['root', orientation, alternativeLabel && 'alternativeLabel']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _stepperClasses.getStepperUtilityClass, classes);
};

const StepperRoot = (0, _styled.default)('div', {
  name: 'MuiStepper',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return (0, _extends2.default)({}, styles.root, styles[styleProps.orientation], styleProps.alternativeLabel && styles.alternativeLabel);
  }
})(({
  styleProps
}) => (0, _extends2.default)({
  display: 'flex'
}, styleProps.orientation === 'horizontal' && {
  flexDirection: 'row',
  alignItems: 'center'
}, styleProps.orientation === 'vertical' && {
  flexDirection: 'column'
}, styleProps.alternativeLabel && {
  alignItems: 'flex-start'
}));
const defaultConnector = /*#__PURE__*/(0, _jsxRuntime.jsx)(_StepConnector.default, {});
const Stepper = /*#__PURE__*/React.forwardRef(function Stepper(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiStepper'
  });
  const {
    activeStep = 0,
    alternativeLabel = false,
    children,
    className,
    connector = defaultConnector,
    nonLinear = false,
    orientation = 'horizontal'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["activeStep", "alternativeLabel", "children", "className", "connector", "nonLinear", "orientation"]);
  const styleProps = (0, _extends2.default)({}, props, {
    alternativeLabel,
    orientation
  });
  const classes = useUtilityClasses(styleProps);
  const childrenArray = React.Children.toArray(children).filter(Boolean);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_StepperContext.default.Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(StepperRoot, (0, _extends2.default)({
      styleProps: styleProps,
      className: (0, _clsx.default)(classes.root, className),
      ref: ref
    }, other, {
      children: steps
    }))
  });
});
process.env.NODE_ENV !== "production" ? Stepper.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the active step (zero based index).
   * Set to -1 to disable all the steps.
   * @default 0
   */
  activeStep: _utils.integerPropType,

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
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = Stepper;
exports.default = _default;