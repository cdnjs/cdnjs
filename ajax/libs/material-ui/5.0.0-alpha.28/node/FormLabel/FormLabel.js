"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FormLabelRoot = exports.overridesResolver = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _formControlState = _interopRequireDefault(require("../FormControl/formControlState"));

var _useFormControl = _interopRequireDefault(require("../FormControl/useFormControl"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _formLabelClasses = _interopRequireWildcard(require("./formLabelClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = ({
  styleProps
}, styles) => {
  return (0, _utils.deepmerge)((0, _extends2.default)({}, styleProps.color === 'secondary' && styles.colorSecondary, styleProps.filled && styles.filled, {
    [`& .${_formLabelClasses.default.asterisk}`]: (0, _extends2.default)({}, styles.asterisk)
  }), styles.root || {});
};

exports.overridesResolver = overridesResolver;

const useUtilityClasses = styleProps => {
  const {
    classes,
    color,
    focused,
    disabled,
    error,
    filled,
    required
  } = styleProps;
  const slots = {
    root: ['root', `color${(0, _capitalize.default)(color)}`, disabled && 'disabled', error && 'error', filled && 'filled', focused && 'focused', required && 'required'],
    asterisk: ['asterisk', error && 'error']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _formLabelClasses.getFormLabelUtilityClasses, classes);
};

const FormLabelRoot = (0, _experimentalStyled.default)('label', {}, {
  name: 'MuiFormLabel',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  color: theme.palette.text.secondary
}, theme.typography.body1, {
  lineHeight: '1.4375em',
  padding: 0,
  '&.Mui-focused': {
    color: theme.palette[styleProps.color].main
  },
  '&.Mui-disabled': {
    color: theme.palette.text.disabled
  },
  '&.Mui-error': {
    color: theme.palette.error.main
  }
}));
exports.FormLabelRoot = FormLabelRoot;
const AsteriskComponent = (0, _experimentalStyled.default)('span', {}, {
  name: 'MuiFormLabel',
  slot: 'Asterisk'
})(({
  theme
}) => ({
  '&.Mui-error': {
    color: theme.palette.error.main
  }
}));
const FormLabel = /*#__PURE__*/React.forwardRef(function FormLabel(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiFormLabel'
  });
  const {
    children,
    className,
    component = 'label'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "className", "color", "component", "disabled", "error", "filled", "focused", "required"]);
  const muiFormControl = (0, _useFormControl.default)();
  const fcs = (0, _formControlState.default)({
    props,
    muiFormControl,
    states: ['color', 'required', 'focused', 'disabled', 'error', 'filled']
  });
  const styleProps = (0, _extends2.default)({}, props, {
    color: fcs.color || 'primary',
    component,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(FormLabelRoot, (0, _extends2.default)({
    as: component,
    styleProps: styleProps,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other, {
    children: [children, fcs.required && /*#__PURE__*/(0, _jsxRuntime.jsxs)(AsteriskComponent, {
      styleProps: styleProps,
      "aria-hidden": true,
      className: classes.asterisk,
      children: ["\u2009", '*']
    })]
  }));
});
process.env.NODE_ENV !== "production" ? FormLabel.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
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
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: _propTypes.default.oneOf(['primary', 'secondary']),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the label is displayed in an error state.
   */
  error: _propTypes.default.bool,

  /**
   * If `true`, the label should use filled classes key.
   */
  filled: _propTypes.default.bool,

  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: _propTypes.default.bool,

  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = FormLabel;
exports.default = _default;