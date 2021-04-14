"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _CheckCircle = _interopRequireDefault(require("../internal/svg-icons/CheckCircle"));

var _Warning = _interopRequireDefault(require("../internal/svg-icons/Warning"));

var _SvgIcon = _interopRequireDefault(require("../SvgIcon"));

var _stepIconClasses = _interopRequireWildcard(require("./stepIconClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => {
  return (0, _utils.deepmerge)({
    [`& .${_stepIconClasses.default.text}`]: styles.text
  }, styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    active,
    completed,
    error
  } = styleProps;
  const slots = {
    root: ['root', active && 'active', completed && 'completed', error && 'error'],
    text: ['text']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _stepIconClasses.getStepIconUtilityClass, classes);
};

const StepIconRoot = (0, _experimentalStyled.default)(_SvgIcon.default, {}, {
  name: 'MuiStepIcon',
  slot: 'Root',
  overridesResolver
})(({
  theme
}) => ({
  /* Styles applied to the root element. */
  display: 'block',
  transition: theme.transitions.create('color', {
    duration: theme.transitions.duration.shortest
  }),
  color: theme.palette.text.disabled,
  [`&.${_stepIconClasses.default.completed}`]: {
    color: theme.palette.primary.main
  },
  [`&.${_stepIconClasses.default.active}`]: {
    color: theme.palette.primary.main
  },
  [`&.${_stepIconClasses.default.error}`]: {
    color: theme.palette.error.main
  }
}));
const StepIconText = (0, _experimentalStyled.default)('text', {}, {
  name: 'MuiStepIcon',
  slot: 'Text',
  overridesResolver
})(({
  theme
}) => ({
  /* Styles applied to the SVG text element. */
  fill: theme.palette.primary.contrastText,
  fontSize: theme.typography.caption.fontSize,
  fontFamily: theme.typography.fontFamily
}));

var _ref = /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
  cx: "12",
  cy: "12",
  r: "12"
});

const StepIcon = /*#__PURE__*/React.forwardRef(function StepIcon(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiStepIcon'
  });
  const {
    active = false,
    className: classNameProp,
    completed = false,
    error = false,
    icon
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["active", "className", "completed", "error", "icon"]);
  const styleProps = (0, _extends2.default)({}, props, {
    active,
    completed,
    error
  });
  const classes = useUtilityClasses(styleProps);

  if (typeof icon === 'number' || typeof icon === 'string') {
    const className = (0, _clsx.default)(classNameProp, classes.root);

    if (error) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(StepIconRoot, (0, _extends2.default)({
        as: _Warning.default,
        className: className,
        ref: ref,
        styleProps: styleProps
      }, other));
    }

    if (completed) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(StepIconRoot, (0, _extends2.default)({
        as: _CheckCircle.default,
        className: className,
        ref: ref,
        styleProps: styleProps
      }, other));
    }

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(StepIconRoot, (0, _extends2.default)({
      className: className,
      ref: ref,
      styleProps: styleProps
    }, other, {
      children: [_ref, /*#__PURE__*/(0, _jsxRuntime.jsx)(StepIconText, {
        className: classes.text,
        x: "12",
        y: "16",
        textAnchor: "middle",
        styleProps: styleProps,
        children: icon
      })]
    }));
  }

  return icon;
});
process.env.NODE_ENV !== "production" ? StepIcon.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Whether this step is active.
   * @default false
   */
  active: _propTypes.default.bool,

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
   * @default false
   */
  completed: _propTypes.default.bool,

  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error: _propTypes.default.bool,

  /**
   * The label displayed in the step icon.
   */
  icon: _propTypes.default.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = StepIcon;
exports.default = _default;