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

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _SwitchBase = _interopRequireDefault(require("../internal/SwitchBase"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _RadioButtonIcon = _interopRequireDefault(require("./RadioButtonIcon"));

var _colorManipulator = require("../styles/colorManipulator");

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _createChainedFunction = _interopRequireDefault(require("../utils/createChainedFunction"));

var _useRadioGroup = _interopRequireDefault(require("../RadioGroup/useRadioGroup"));

var _radioClasses = require("./radioClasses");

var _experimentalStyled = _interopRequireWildcard(require("../styles/experimentalStyled"));

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)(styles.root || {}, styles[`color${(0, _capitalize.default)(styleProps.color)}`]);
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    color
  } = styleProps;
  const slots = {
    root: ['root', `color${(0, _capitalize.default)(color)}`]
  };
  return (0, _extends2.default)({}, classes, (0, _unstyled.unstable_composeClasses)(slots, _radioClasses.getRadioUtilityClass, classes));
};

const RadioRoot = (0, _experimentalStyled.default)(_SwitchBase.default, {
  shouldForwardProp: prop => (0, _experimentalStyled.shouldForwardProp)(prop) || prop === 'classes'
}, {
  name: 'MuiRadio',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the root element. */
  color: theme.palette.text.secondary
}, styleProps.color !== 'default' && {
  '&.Mui-checked': {
    color: theme.palette[styleProps.color].main,
    '&:hover': {
      backgroundColor: (0, _colorManipulator.alpha)(theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }
}, {
  '&.Mui-disabled': {
    color: theme.palette.action.disabled
  }
}));
const defaultCheckedIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_RadioButtonIcon.default, {
  checked: true
});
const defaultIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_RadioButtonIcon.default, {});
const Radio = /*#__PURE__*/React.forwardRef(function Radio(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiRadio'
  });
  const {
    checked: checkedProp,
    color = 'secondary',
    name: nameProp,
    onChange: onChangeProp,
    size = 'medium'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["checked", "color", "name", "onChange", "size"]);
  const styleProps = (0, _extends2.default)({}, props, {
    color,
    size
  });
  const classes = useUtilityClasses(styleProps);
  const radioGroup = (0, _useRadioGroup.default)();
  let checked = checkedProp;
  const onChange = (0, _createChainedFunction.default)(onChangeProp, radioGroup && radioGroup.onChange);
  let name = nameProp;

  if (radioGroup) {
    if (typeof checked === 'undefined') {
      checked = radioGroup.value === props.value;
    }

    if (typeof name === 'undefined') {
      name = radioGroup.name;
    }
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(RadioRoot, (0, _extends2.default)({
    color: color,
    type: "radio",
    icon: /*#__PURE__*/React.cloneElement(defaultIcon, {
      fontSize: size === 'small' ? 'small' : 'medium'
    }),
    checkedIcon: /*#__PURE__*/React.cloneElement(defaultCheckedIcon, {
      fontSize: size === 'small' ? 'small' : 'medium'
    }),
    styleProps: styleProps,
    classes: classes,
    name: name,
    checked: checked,
    onChange: onChange,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Radio.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the component is checked.
   */
  checked: _propTypes.default.bool,

  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'secondary'
   */
  color: _propTypes.default.oneOf(['default', 'primary', 'secondary']),

  /**
   * If `true`, the component is disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: _propTypes.default.bool,

  /**
   * The icon to display when the component is unchecked.
   */
  icon: _propTypes.default.node,

  /**
   * The id of the `input` element.
   */
  id: _propTypes.default.string,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: _propTypes.default.object,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: _utils.refType,

  /**
   * Name attribute of the `input` element.
   */
  name: _propTypes.default.string,

  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: _propTypes.default.func,

  /**
   * If `true`, the `input` element is required.
   */
  required: _propTypes.default.bool,

  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   * @default 'medium'
   */
  size: _propTypes.default.oneOf(['medium', 'small']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: _propTypes.default.any
} : void 0;
var _default = Radio;
exports.default = _default;