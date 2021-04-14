"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FormControlLabelRoot = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _FormControl = require("../FormControl");

var _Typography = _interopRequireDefault(require("../Typography"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _formControlLabelClasses = _interopRequireWildcard(require("./formControlLabelClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)((0, _extends2.default)({}, styles[`labelPlacement${(0, _capitalize.default)(styleProps.labelPlacement)}`], {
    [`& .${_formControlLabelClasses.default.label}`]: styles.label
  }), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    disabled,
    labelPlacement
  } = styleProps;
  const slots = {
    root: ['root', disabled && 'disabled', `labelPlacement${(0, _capitalize.default)(labelPlacement)}`],
    label: ['label', disabled && 'disabled']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _formControlLabelClasses.getFormControlLabelUtilityClasses, classes);
};

const FormControlLabelRoot = (0, _experimentalStyled.default)('label', {}, {
  name: 'MuiFormControlLabel',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  // For correct alignment with the text.
  verticalAlign: 'middle',
  WebkitTapHighlightColor: 'transparent',
  marginLeft: -11,
  marginRight: 16,
  // used for row presentation of radio/checkbox
  '&.Mui-disabled': {
    cursor: 'default'
  }
}, styleProps.labelPlacement === 'start' && {
  flexDirection: 'row-reverse',
  marginLeft: 16,
  // used for row presentation of radio/checkbox
  marginRight: -11
}, styleProps.labelPlacement === 'top' && {
  flexDirection: 'column-reverse',
  marginLeft: 16
}, styleProps.labelPlacement === 'bottom' && {
  flexDirection: 'column',
  marginLeft: 16
}, {
  [`& .${_formControlLabelClasses.default.label}`]: {
    '&.Mui-disabled': {
      color: theme.palette.text.disabled
    }
  }
}));
/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */

exports.FormControlLabelRoot = FormControlLabelRoot;
const FormControlLabel = /*#__PURE__*/React.forwardRef(function FormControlLabel(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiFormControlLabel'
  });
  const {
    className,
    control,
    disabled: disabledProp,
    label,
    labelPlacement = 'end'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["checked", "className", "control", "disabled", "inputRef", "label", "labelPlacement", "name", "onChange", "value"]);
  const muiFormControl = (0, _FormControl.useFormControl)();
  let disabled = disabledProp;

  if (typeof disabled === 'undefined' && typeof control.props.disabled !== 'undefined') {
    disabled = control.props.disabled;
  }

  if (typeof disabled === 'undefined' && muiFormControl) {
    disabled = muiFormControl.disabled;
  }

  const controlProps = {
    disabled
  };
  ['checked', 'name', 'onChange', 'value', 'inputRef'].forEach(key => {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key];
    }
  });
  const styleProps = (0, _extends2.default)({}, props, {
    disabled,
    label,
    labelPlacement
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(FormControlLabelRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other, {
    children: [/*#__PURE__*/React.cloneElement(control, controlProps), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
      component: "span",
      className: classes.label,
      children: label
    })]
  }));
});
process.env.NODE_ENV !== "production" ? FormControlLabel.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the component appears selected.
   */
  checked: _propTypes.default.bool,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: _propTypes.default.element.isRequired,

  /**
   * If `true`, the control is disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: _utils.refType,

  /**
   * The text to be used in an enclosing label element.
   */
  label: _propTypes.default.node,

  /**
   * The position of the label.
   * @default 'end'
   */
  labelPlacement: _propTypes.default.oneOf(['bottom', 'end', 'start', 'top']),

  /**
   * @ignore
   */
  name: _propTypes.default.string,

  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: _propTypes.default.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The value of the component.
   */
  value: _propTypes.default.any
} : void 0;
var _default = FormControlLabel;
exports.default = _default;