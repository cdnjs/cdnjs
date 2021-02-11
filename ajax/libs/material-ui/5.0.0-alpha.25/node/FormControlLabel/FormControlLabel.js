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

var _FormControl = require("../FormControl");

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _Typography = _interopRequireDefault(require("../Typography"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    // For correct alignment with the text.
    verticalAlign: 'middle',
    WebkitTapHighlightColor: 'transparent',
    marginLeft: -11,
    marginRight: 16,
    // used for row presentation of radio/checkbox
    '&$disabled': {
      cursor: 'default'
    }
  },

  /* Styles applied to the root element if `labelPlacement="start"`. */
  labelPlacementStart: {
    flexDirection: 'row-reverse',
    marginLeft: 16,
    // used for row presentation of radio/checkbox
    marginRight: -11
  },

  /* Styles applied to the root element if `labelPlacement="top"`. */
  labelPlacementTop: {
    flexDirection: 'column-reverse',
    marginLeft: 16
  },

  /* Styles applied to the root element if `labelPlacement="bottom"`. */
  labelPlacementBottom: {
    flexDirection: 'column',
    marginLeft: 16
  },

  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},

  /* Styles applied to the label's Typography component. */
  label: {
    '&$disabled': {
      color: theme.palette.text.disabled
    }
  }
});
/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */


exports.styles = styles;
const FormControlLabel = /*#__PURE__*/React.forwardRef(function FormControlLabel(props, ref) {
  const {
    classes,
    className,
    control,
    disabled: disabledProp,
    label,
    labelPlacement = 'end'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["checked", "classes", "className", "control", "disabled", "inputRef", "label", "labelPlacement", "name", "onChange", "value"]);
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
  return /*#__PURE__*/React.createElement("label", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, labelPlacement !== 'end' && classes[`labelPlacement${(0, _capitalize.default)(labelPlacement)}`], disabled && classes.disabled),
    ref: ref
  }, other), /*#__PURE__*/React.cloneElement(control, controlProps), /*#__PURE__*/React.createElement(_Typography.default, {
    component: "span",
    className: (0, _clsx.default)(classes.label, disabled && classes.disabled)
  }, label));
});
process.env.NODE_ENV !== "production" ? FormControlLabel.propTypes = {
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
   * The value of the component.
   */
  value: _propTypes.default.any
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiFormControlLabel'
})(FormControlLabel);

exports.default = _default;