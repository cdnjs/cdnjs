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

var _StepperContext = _interopRequireDefault(require("../Stepper/StepperContext"));

var _StepContext = _interopRequireDefault(require("./StepContext"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _stepClasses = require("./stepClasses");

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)((0, _extends2.default)({}, styles[styleProps.orientation], styleProps.alternativeLabel && styles.alternativeLabel, styleProps.completed && styles.completed), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    orientation,
    alternativeLabel,
    completed
  } = styleProps;
  const slots = {
    root: ['root', orientation, alternativeLabel && 'alternativeLabel', completed && 'completed']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _stepClasses.getStepUtilityClass, classes);
};

const StepRoot = (0, _experimentalStyled.default)('div', {}, {
  name: 'MuiStep',
  slot: 'Root',
  overridesResolver
})(({
  styleProps
}) => (0, _extends2.default)({}, styleProps.orientation === 'horizontal' && {
  paddingLeft: 8,
  paddingRight: 8
}, styleProps.alternativeLabel && {
  flex: 1,
  position: 'relative'
}));
const Step = /*#__PURE__*/React.forwardRef(function Step(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiStep'
  });
  const {
    active: activeProp,
    children,
    className,
    completed: completedProp,
    disabled: disabledProp,
    expanded = false,
    index,
    last
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["active", "children", "className", "completed", "disabled", "expanded", "index", "last"]);
  const {
    activeStep,
    connector,
    alternativeLabel,
    orientation,
    nonLinear
  } = React.useContext(_StepperContext.default);
  let [active = false, completed = false, disabled = false] = [activeProp, completedProp, disabledProp];

  if (activeStep === index) {
    active = activeProp !== undefined ? activeProp : true;
  } else if (!nonLinear && activeStep > index) {
    completed = completedProp !== undefined ? completedProp : true;
  } else if (!nonLinear && activeStep < index) {
    disabled = disabledProp !== undefined ? disabledProp : true;
  }

  const contextValue = React.useMemo(() => ({
    index,
    last,
    expanded,
    icon: index + 1,
    active,
    completed,
    disabled
  }), [index, last, expanded, active, completed, disabled]);
  const styleProps = (0, _extends2.default)({}, props, {
    active,
    orientation,
    alternativeLabel,
    completed,
    disabled,
    expanded
  });
  const classes = useUtilityClasses(styleProps);
  const newChildren = /*#__PURE__*/(0, _jsxRuntime.jsxs)(StepRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: [connector && alternativeLabel && index !== 0 ? connector : null, children]
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_StepContext.default.Provider, {
    value: contextValue,
    children: connector && !alternativeLabel && index !== 0 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
      children: [connector, newChildren]
    }) : newChildren
  });
});
process.env.NODE_ENV !== "production" ? Step.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Sets the step as active. Is passed to child components.
   */
  active: _propTypes.default.bool,

  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
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
   * Mark the step as completed. Is passed to child components.
   */
  completed: _propTypes.default.bool,

  /**
   * If `true`, the step is disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled: _propTypes.default.bool,

  /**
   * Expand the step.
   * @default false
   */
  expanded: _propTypes.default.bool,

  /**
   * The position of the step.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  index: _utils.integerPropType,

  /**
   * If `true`, the Step is displayed as rendered last.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  last: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = Step;
exports.default = _default;