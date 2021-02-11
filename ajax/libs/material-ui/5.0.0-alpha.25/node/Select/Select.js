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

var _styles = require("@material-ui/styles");

var _SelectInput = _interopRequireDefault(require("./SelectInput"));

var _formControlState = _interopRequireDefault(require("../FormControl/formControlState"));

var _useFormControl = _interopRequireDefault(require("../FormControl/useFormControl"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _ArrowDropDown = _interopRequireDefault(require("../internal/svg-icons/ArrowDropDown"));

var _Input = _interopRequireDefault(require("../Input"));

var _NativeSelect = require("../NativeSelect/NativeSelect");

var _NativeSelectInput = _interopRequireDefault(require("../NativeSelect/NativeSelectInput"));

var _FilledInput = _interopRequireDefault(require("../FilledInput"));

var _OutlinedInput = _interopRequireDefault(require("../OutlinedInput"));

const styles = _NativeSelect.styles;
exports.styles = styles;

var _ref = /*#__PURE__*/React.createElement(_Input.default, null);

var _ref2 = /*#__PURE__*/React.createElement(_FilledInput.default, null);

const Select = /*#__PURE__*/React.forwardRef(function Select(props, ref) {
  const {
    autoWidth = false,
    children,
    classes,
    displayEmpty = false,
    IconComponent = _ArrowDropDown.default,
    id,
    input,
    inputProps,
    label,
    labelId,
    labelWidth = 0,
    MenuProps,
    multiple = false,
    native = false,
    onClose,
    onOpen,
    open,
    renderValue,
    SelectDisplayProps,
    variant: variantProps = 'standard'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["autoWidth", "children", "classes", "displayEmpty", "IconComponent", "id", "input", "inputProps", "label", "labelId", "labelWidth", "MenuProps", "multiple", "native", "onClose", "onOpen", "open", "renderValue", "SelectDisplayProps", "variant"]);
  const inputComponent = native ? _NativeSelectInput.default : _SelectInput.default;
  const muiFormControl = (0, _useFormControl.default)();
  const fcs = (0, _formControlState.default)({
    props,
    muiFormControl,
    states: ['variant']
  });
  const variant = fcs.variant || variantProps;
  const InputComponent = input || {
    standard: _ref,
    outlined: /*#__PURE__*/React.createElement(_OutlinedInput.default, {
      label: label,
      labelWidth: labelWidth
    }),
    filled: _ref2
  }[variant];
  return /*#__PURE__*/React.cloneElement(InputComponent, (0, _extends2.default)({
    // Most of the logic is implemented in `SelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent,
    inputProps: (0, _extends2.default)({
      children,
      IconComponent,
      variant,
      type: undefined,
      // We render a select. We can ignore the type provided by the `Input`.
      multiple
    }, native ? {
      id
    } : {
      autoWidth,
      displayEmpty,
      labelId,
      MenuProps,
      onClose,
      onOpen,
      open,
      renderValue,
      SelectDisplayProps: (0, _extends2.default)({
        id
      }, SelectDisplayProps)
    }, inputProps, {
      classes: inputProps ? (0, _styles.mergeClasses)({
        baseClasses: classes,
        newClasses: inputProps.classes,
        Component: Select
      }) : classes
    }, input ? input.props.inputProps : {}),
    ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Select.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   * @default false
   */
  autoWidth: _propTypes.default.bool,

  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   *
   * ⚠️The `MenuItem` elements **must** be direct descendants when `native` is false.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: _propTypes.default.any,

  /**
   * If `true`, a value is displayed even if no items are selected.
   *
   * In order to display a meaningful value, a function can be passed to the `renderValue` prop which
   * returns the value to be displayed when no items are selected.
   *
   * ⚠️ When using this prop, make sure the label doesn't overlap with the empty displayed value.
   * The label should either be hidden or forced to a shrunk state.
   * @default false
   */
  displayEmpty: _propTypes.default.bool,

  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: _propTypes.default.elementType,

  /**
   * The `id` of the wrapper element or the `select` element when `native`.
   */
  id: _propTypes.default.string,

  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: _propTypes.default.element,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * When `native` is `true`, the attributes are applied on the `select` element.
   */
  inputProps: _propTypes.default.object,

  /**
   * See [OutlinedInput#label](/api/outlined-input/#props)
   */
  label: _propTypes.default.node,

  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: _propTypes.default.string,

  /**
   * See [OutlinedInput#label](/api/outlined-input/#props)
   * @default 0
   */
  labelWidth: _propTypes.default.number,

  /**
   * Props applied to the [`Menu`](/api/menu/) element.
   */
  MenuProps: _propTypes.default.object,

  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: _propTypes.default.bool,

  /**
   * If `true`, the component uses a native `select` element.
   * @default false
   */
  native: _propTypes.default.bool,

  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   */
  onChange: _propTypes.default.func,

  /**
   * Callback fired when the component requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: _propTypes.default.func,

  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: _propTypes.default.func,

  /**
   * If `true`, the component is shown.
   * You can only use it when the `native` prop is `false` (default).
   */
  open: _propTypes.default.bool,

  /**
   * Render the selected value.
   * You can only use it when the `native` prop is `false` (default).
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: _propTypes.default.func,

  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: _propTypes.default.object,

  /**
   * The `input` value. Providing an empty string will select no options.
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
   */
  value: _propTypes.default.any,

  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: _propTypes.default.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
Select.muiName = 'Select';

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiSelect'
})(Select);

exports.default = _default;