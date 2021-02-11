"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _formControlState = _interopRequireDefault(require("../FormControl/formControlState"));

var _useFormControl = _interopRequireDefault(require("../FormControl/useFormControl"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

const styles = theme => ({
  /* Styles applied to the root element. */
  root: (0, _extends2.default)({
    color: theme.palette.text.secondary
  }, theme.typography.body1, {
    lineHeight: 1,
    padding: 0,
    '&$focused': {
      color: theme.palette.primary.main
    },
    '&$disabled': {
      color: theme.palette.text.disabled
    },
    '&$error': {
      color: theme.palette.error.main
    }
  }),

  /* Styles applied to the root element if the color is secondary. */
  colorSecondary: {
    '&$focused': {
      color: theme.palette.secondary.main
    },
    '&$error': {
      // To remove once we migrate to emotion
      color: theme.palette.error.main
    }
  },

  /* Pseudo-class applied to the root element if `focused={true}`. */
  focused: {},

  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},

  /* Pseudo-class applied to the root element if `error={true}`. */
  error: {},

  /* Pseudo-class applied to the root element if `filled={true}`. */
  filled: {},

  /* Pseudo-class applied to the root element if `required={true}`. */
  required: {},

  /* Styles applied to the asterisk element. */
  asterisk: {
    '&$error': {
      color: theme.palette.error.main
    }
  }
});

exports.styles = styles;
const FormLabel = /*#__PURE__*/React.forwardRef(function FormLabel(props, ref) {
  const {
    children,
    classes,
    className,
    component: Component = 'label'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "classes", "className", "color", "component", "disabled", "error", "filled", "focused", "required"]);
  const muiFormControl = (0, _useFormControl.default)();
  const fcs = (0, _formControlState.default)({
    props,
    muiFormControl,
    states: ['color', 'required', 'focused', 'disabled', 'error', 'filled']
  });
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, classes[`color${(0, _capitalize.default)(fcs.color || 'primary')}`], className, fcs.disabled && classes.disabled, fcs.error && classes.error, fcs.filled && classes.filled, fcs.focused && classes.focused, fcs.required && classes.required),
    ref: ref
  }, other), children, fcs.required && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    className: (0, _clsx.default)(classes.asterisk, fcs.error && classes.error)
  }, "\u2009", '*'));
});
process.env.NODE_ENV !== "production" ? FormLabel.propTypes = {
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
  required: _propTypes.default.bool
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiFormLabel'
})(FormLabel);

exports.default = _default;