import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
// @inheritedComponent ButtonBase
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '../styles';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import toggleButtonClasses, { getToggleButtonUtilityClass } from './toggleButtonClasses';

var overridesResolver = function overridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return deepmerge(_extends({}, styles["size".concat(capitalize(styleProps.size))], _defineProperty({}, "& .".concat(toggleButtonClasses.label), styles.label)), styles.root || {});
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      selected = styleProps.selected,
      disabled = styleProps.disabled,
      size = styleProps.size;
  var slots = {
    root: ['root', selected && 'selected', disabled && 'disabled', "size".concat(capitalize(size))],
    label: ['label']
  };
  return composeClasses(slots, getToggleButtonUtilityClass, classes);
};

var ToggleButtonRoot = experimentalStyled(ButtonBase, {}, {
  name: 'MuiToggleButton',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({}, theme.typography.button, {
    borderRadius: theme.shape.borderRadius,
    padding: 11,
    border: "1px solid ".concat(alpha(theme.palette.action.active, 0.12)),
    color: alpha(theme.palette.action.active, 0.38),
    '&.Mui-selected': {
      color: theme.palette.action.active,
      backgroundColor: alpha(theme.palette.action.active, 0.12),
      '&:hover': {
        backgroundColor: alpha(theme.palette.action.active, 0.15)
      }
    },
    '&.Mui-disabled': {
      color: alpha(theme.palette.action.disabled, 0.12)
    },
    '&:hover': {
      textDecoration: 'none',
      // Reset on mouse devices
      backgroundColor: alpha(theme.palette.text.primary, 0.05),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }, styleProps.size === 'small' && {
    padding: 7,
    fontSize: theme.typography.pxToRem(13)
  }, styleProps.size === 'large' && {
    padding: 15,
    fontSize: theme.typography.pxToRem(15)
  });
});
var ToggleButtonLabel = experimentalStyled('span', {}, {
  name: 'MuiToggleButton',
  slot: 'Label'
})({
  /* Styles applied to the label wrapper element. */
  width: '100%',
  // Ensure the correct width for iOS Safari
  display: 'inherit',
  alignItems: 'inherit',
  justifyContent: 'inherit'
});
var ToggleButton = /*#__PURE__*/React.forwardRef(function ToggleButton(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiToggleButton'
  });

  var children = props.children,
      className = props.className,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableFocusRi = props.disableFocusRipple,
      disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
      onChange = props.onChange,
      onClick = props.onClick,
      selected = props.selected,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      value = props.value,
      other = _objectWithoutProperties(props, ["children", "className", "disabled", "disableFocusRipple", "onChange", "onClick", "selected", "size", "value"]);

  var styleProps = _extends({}, props, {
    disabled: disabled,
    disableFocusRipple: disableFocusRipple,
    size: size
  });

  var classes = useUtilityClasses(styleProps);

  var handleChange = function handleChange(event) {
    if (onClick) {
      onClick(event, value);

      if (event.defaultPrevented) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  return /*#__PURE__*/React.createElement(ToggleButtonRoot, _extends({
    className: clsx(classes.root, className),
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    ref: ref,
    onClick: handleChange,
    onChange: onChange,
    value: value,
    styleProps: styleProps,
    "aria-pressed": selected
  }, other), /*#__PURE__*/React.createElement(ToggleButtonLabel, {
    className: classes.label,
    styleProps: styleProps
  }, children));
});
process.env.NODE_ENV !== "production" ? ToggleButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,

  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusedVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,

  /**
   * @ignore
   */
  onChange: PropTypes.func,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * If `true`, the button is rendered in an active state.
   */
  selected: PropTypes.bool,

  /**
   * The size of the component.
   * The prop defaults to the value inherited from the parent ToggleButtonGroup component.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: PropTypes.any.isRequired
} : void 0;
export default ToggleButton;