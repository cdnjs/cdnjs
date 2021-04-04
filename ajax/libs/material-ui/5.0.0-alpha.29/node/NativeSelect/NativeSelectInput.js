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

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _jsxRuntime = require("react/jsx-runtime");

/**
 * @ignore - internal component.
 */
const NativeSelectInput = /*#__PURE__*/React.forwardRef(function NativeSelectInput(props, ref) {
  const {
    classes,
    className,
    disabled,
    IconComponent,
    inputRef,
    variant = 'standard'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["classes", "className", "disabled", "IconComponent", "inputRef", "variant"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("select", (0, _extends2.default)({
      className: (0, _clsx.default)(classes.root, // TODO v5: merge root and select
      classes.select, classes[variant], className, disabled && classes.disabled),
      disabled: disabled,
      ref: inputRef || ref
    }, other)), props.multiple ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(IconComponent, {
      className: (0, _clsx.default)(classes.icon, classes[`icon${(0, _capitalize.default)(variant)}`], disabled && classes.disabled)
    })]
  });
});
process.env.NODE_ENV !== "production" ? NativeSelectInput.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * The CSS class name of the select element.
   */
  className: _propTypes.default.string,

  /**
   * If `true`, the select is disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * The icon that displays the arrow.
   */
  IconComponent: _propTypes.default.elementType.isRequired,

  /**
   * Use that prop to pass a ref to the native select element.
   * @deprecated
   */
  inputRef: _utils.refType,

  /**
   * @ignore
   */
  multiple: _propTypes.default.bool,

  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: _propTypes.default.string,

  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: _propTypes.default.func,

  /**
   * The input value.
   */
  value: _propTypes.default.any,

  /**
   * The variant to use.
   */
  variant: _propTypes.default.oneOf(['standard', 'outlined', 'filled'])
} : void 0;
var _default = NativeSelectInput;
exports.default = _default;