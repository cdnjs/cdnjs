import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { refType, deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import SwitchBase from '../internal/SwitchBase';
import CheckBoxOutlineBlankIcon from '../internal/svg-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '../internal/svg-icons/CheckBox';
import { alpha } from '../styles/colorManipulator';
import IndeterminateCheckBoxIcon from '../internal/svg-icons/IndeterminateCheckBox';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled, { shouldForwardProp as _shouldForwardProp } from '../styles/experimentalStyled';
import checkboxClasses, { getCheckboxUtilityClass } from './checkboxClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var overridesResolver = function overridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return deepmerge(_extends({}, styleProps.indeterminate && styles.indeterminate, styleProps.color !== 'default' && styles["color".concat(capitalize(styleProps.color))]), styles.root || {});
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      indeterminate = styleProps.indeterminate,
      color = styleProps.color;
  var slots = {
    root: ['root', indeterminate && 'indeterminate', "color".concat(capitalize(color))]
  };
  var composedClasses = composeClasses(slots, getCheckboxUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};

var CheckboxRoot = experimentalStyled(SwitchBase, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return _shouldForwardProp(prop) || prop === 'classes';
  }
}, {
  name: 'MuiCheckbox',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var _ref2;

  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    /* Styles applied to the root element. */
    color: theme.palette.text.secondary
  }, styleProps.color !== 'default' && (_ref2 = {}, _defineProperty(_ref2, "&.Mui-checked, &.".concat(checkboxClasses.indeterminate), {
    color: theme.palette[styleProps.color].main,
    '&:hover': {
      backgroundColor: alpha(theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }), _defineProperty(_ref2, '&.Mui-disabled', {
    color: theme.palette.action.disabled
  }), _ref2));
});

var defaultCheckedIcon = /*#__PURE__*/_jsx(CheckBoxIcon, {});

var defaultIcon = /*#__PURE__*/_jsx(CheckBoxOutlineBlankIcon, {});

var defaultIndeterminateIcon = /*#__PURE__*/_jsx(IndeterminateCheckBoxIcon, {});

var Checkbox = /*#__PURE__*/React.forwardRef(function Checkbox(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiCheckbox'
  });

  var _props$checkedIcon = props.checkedIcon,
      checkedIcon = _props$checkedIcon === void 0 ? defaultCheckedIcon : _props$checkedIcon,
      _props$color = props.color,
      color = _props$color === void 0 ? 'secondary' : _props$color,
      _props$icon = props.icon,
      iconProp = _props$icon === void 0 ? defaultIcon : _props$icon,
      _props$indeterminate = props.indeterminate,
      indeterminate = _props$indeterminate === void 0 ? false : _props$indeterminate,
      _props$indeterminateI = props.indeterminateIcon,
      indeterminateIconProp = _props$indeterminateI === void 0 ? defaultIndeterminateIcon : _props$indeterminateI,
      inputProps = props.inputProps,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      other = _objectWithoutProperties(props, ["checkedIcon", "color", "icon", "indeterminate", "indeterminateIcon", "inputProps", "size"]);

  var icon = indeterminate ? indeterminateIconProp : iconProp;
  var indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;

  var styleProps = _extends({}, props, {
    color: color,
    indeterminate: indeterminate,
    size: size
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(CheckboxRoot, _extends({
    type: "checkbox",
    color: color,
    inputProps: _extends({
      'data-indeterminate': indeterminate
    }, inputProps),
    icon: /*#__PURE__*/React.cloneElement(icon, {
      fontSize: icon.props.fontSize === undefined && size !== 'medium' ? size : icon.props.fontSize
    }),
    checkedIcon: /*#__PURE__*/React.cloneElement(indeterminateIcon, {
      fontSize: indeterminateIcon.props.fontSize === undefined && size !== 'medium' ? size : indeterminateIcon.props.fontSize
    }),
    styleProps: styleProps,
    ref: ref
  }, other, {
    classes: classes
  }));
});
process.env.NODE_ENV !== "production" ? Checkbox.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,

  /**
   * The icon to display when the component is checked.
   * @default <CheckBoxIcon />
   */
  checkedIcon: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'secondary'
   */
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),

  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,

  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: PropTypes.bool,

  /**
   * The icon to display when the component is unchecked.
   * @default <CheckBoxOutlineBlankIcon />
   */
  icon: PropTypes.node,

  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,

  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the `input`.
   * @default false
   */
  indeterminate: PropTypes.bool,

  /**
   * The icon to display when the component is indeterminate.
   * @default <IndeterminateCheckBoxIcon />
   */
  indeterminateIcon: PropTypes.node,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,

  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,

  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,

  /**
   * The size of the component.
   * `small` is equivalent to the dense checkbox styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['medium', 'small']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any
} : void 0;
export default Checkbox;