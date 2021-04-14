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

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _StepperContext = _interopRequireDefault(require("../Stepper/StepperContext"));

var _StepContext = _interopRequireDefault(require("../Step/StepContext"));

var _stepConnectorClasses = _interopRequireWildcard(require("./stepConnectorClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)((0, _extends2.default)({}, styles[styleProps.orientation], styleProps.alternativeLabel && styles.alternativeLabel, styleProps.completed && styles.completed, {
    [`& .${_stepConnectorClasses.default.line}`]: (0, _extends2.default)({}, styles.line, styles[`line${(0, _capitalize.default)(styleProps.orientation)}`])
  }), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    orientation,
    alternativeLabel,
    active,
    completed,
    disabled
  } = styleProps;
  const slots = {
    root: ['root', orientation, alternativeLabel && 'alternativeLabel', active && 'active', completed && 'completed', disabled && 'disabled'],
    line: ['line', `line${(0, _capitalize.default)(orientation)}`]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _stepConnectorClasses.getStepConnectorUtilityClass, classes);
};

const StepConnectorRoot = (0, _experimentalStyled.default)('div', {}, {
  name: 'MuiStepConnector',
  slot: 'Root',
  overridesResolver
})(({
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the root element. */
  flex: '1 1 auto'
}, styleProps.orientation === 'vertical' && {
  marginLeft: 12 // half icon

}, styleProps.alternativeLabel && {
  position: 'absolute',
  top: 8 + 4,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)'
}));
const StepConnectorLine = (0, _experimentalStyled.default)('span', {}, {
  name: 'MuiStepConnector',
  slot: 'Line'
})(({
  styleProps,
  theme
}) => (0, _extends2.default)({
  /* Styles applied to the line element. */
  display: 'block',
  borderColor: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
}, styleProps.orientation === 'horizontal' && {
  borderTopStyle: 'solid',
  borderTopWidth: 1
}, styleProps.orientation === 'vertical' && {
  borderLeftStyle: 'solid',
  borderLeftWidth: 1,
  minHeight: 24
}));
const StepConnector = /*#__PURE__*/React.forwardRef(function StepConnector(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiStepConnector'
  });
  const {
    className
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className"]);
  const {
    alternativeLabel,
    orientation = 'horizontal'
  } = React.useContext(_StepperContext.default);
  const {
    active,
    disabled,
    completed
  } = React.useContext(_StepContext.default);
  const styleProps = (0, _extends2.default)({}, props, {
    alternativeLabel,
    orientation,
    active,
    completed,
    disabled
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(StepConnectorRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(StepConnectorLine, {
      className: classes.line,
      styleProps: styleProps
    })
  }));
});
process.env.NODE_ENV !== "production" ? StepConnector.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = StepConnector;
exports.default = _default;