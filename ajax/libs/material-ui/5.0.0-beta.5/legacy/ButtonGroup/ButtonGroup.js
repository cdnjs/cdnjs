import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '@material-ui/system';
import capitalize from '../utils/capitalize';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import buttonGroupClasses, { getButtonGroupUtilityClass } from './buttonGroupClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var overridesResolver = function overridesResolver(props, styles) {
  var ownerState = props.ownerState;
  return [_defineProperty({}, "& .".concat(buttonGroupClasses.grouped), styles.grouped), _defineProperty({}, "& .".concat(buttonGroupClasses.grouped), styles["grouped".concat(capitalize(ownerState.orientation))]), _defineProperty({}, "& .".concat(buttonGroupClasses.grouped), styles["grouped".concat(capitalize(ownerState.variant))]), _defineProperty({}, "& .".concat(buttonGroupClasses.grouped), styles["grouped".concat(capitalize(ownerState.variant)).concat(capitalize(ownerState.orientation))]), _defineProperty({}, "& .".concat(buttonGroupClasses.grouped), styles["grouped".concat(capitalize(ownerState.variant)).concat(capitalize(ownerState.color))]), styles.root, styles[ownerState.variant], ownerState.disableElevation === true && styles.disableElevation, ownerState.fullWidth && styles.fullWidth, ownerState.orientation === 'vertical' && styles.vertical];
};

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
      color = ownerState.color,
      disabled = ownerState.disabled,
      disableElevation = ownerState.disableElevation,
      fullWidth = ownerState.fullWidth,
      orientation = ownerState.orientation,
      variant = ownerState.variant;
  var slots = {
    root: ['root', variant, orientation === 'vertical' && 'vertical', fullWidth && 'fullWidth', disableElevation && 'disableElevation'],
    grouped: ['grouped', "grouped".concat(capitalize(orientation)), "grouped".concat(capitalize(variant)), "grouped".concat(capitalize(variant)).concat(capitalize(orientation)), "grouped".concat(capitalize(variant)).concat(capitalize(color)), disabled && 'disabled']
  };
  return composeClasses(slots, getButtonGroupUtilityClass, classes);
};

var ButtonGroupRoot = styled('div', {
  name: 'MuiButtonGroup',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref6) {
  var theme = _ref6.theme,
      ownerState = _ref6.ownerState;
  return _extends({
    display: 'inline-flex',
    borderRadius: theme.shape.borderRadius
  }, ownerState.variant === 'contained' && {
    boxShadow: theme.shadows[2]
  }, ownerState.disableElevation && {
    boxShadow: 'none'
  }, ownerState.fullWidth && {
    width: '100%'
  }, ownerState.orientation === 'vertical' && {
    flexDirection: 'column'
  }, _defineProperty({}, "& .".concat(buttonGroupClasses.grouped), _extends({
    minWidth: 40,
    '&:not(:first-of-type)': _extends({}, ownerState.orientation === 'horizontal' && {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    }, ownerState.orientation === 'vertical' && {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0
    }, ownerState.variant === 'outlined' && ownerState.orientation === 'horizontal' && {
      marginLeft: -1
    }, ownerState.variant === 'outlined' && ownerState.orientation === 'vertical' && {
      marginTop: -1
    }),
    '&:not(:last-of-type)': _extends({}, ownerState.orientation === 'horizontal' && {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    }, ownerState.orientation === 'vertical' && {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0
    }, ownerState.variant === 'text' && ownerState.orientation === 'horizontal' && {
      borderRight: "1px solid ".concat(theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)')
    }, ownerState.variant === 'text' && ownerState.orientation === 'vertical' && {
      borderBottom: "1px solid ".concat(theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)')
    }, ownerState.variant === 'text' && ownerState.color !== 'inherit' && {
      borderColor: alpha(theme.palette[ownerState.color].main, 0.5)
    }, ownerState.variant === 'outlined' && ownerState.orientation === 'horizontal' && {
      borderRightColor: 'transparent'
    }, ownerState.variant === 'outlined' && ownerState.orientation === 'vertical' && {
      borderBottomColor: 'transparent'
    }, ownerState.variant === 'contained' && ownerState.orientation === 'horizontal' && _defineProperty({
      borderRight: "1px solid ".concat(theme.palette.grey[400])
    }, "&.".concat(buttonGroupClasses.disabled), {
      borderRight: "1px solid ".concat(theme.palette.action.disabled)
    }), ownerState.variant === 'contained' && ownerState.orientation === 'vertical' && _defineProperty({
      borderBottom: "1px solid ".concat(theme.palette.grey[400])
    }, "&.".concat(buttonGroupClasses.disabled), {
      borderBottom: "1px solid ".concat(theme.palette.action.disabled)
    }), ownerState.variant === 'contained' && ownerState.color !== 'inherit' && {
      borderColor: theme.palette[ownerState.color].dark
    }),
    '&:hover': _extends({}, ownerState.variant === 'outlined' && ownerState.color !== 'inherit' && {
      borderColor: theme.palette[ownerState.color].main
    }, ownerState.variant === 'contained' && {
      boxShadow: 'none'
    })
  }, ownerState.variant === 'contained' && {
    boxShadow: 'none'
  })));
});
var ButtonGroup = /*#__PURE__*/React.forwardRef(function ButtonGroup(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiButtonGroup'
  });

  var children = props.children,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'primary' : _props$color,
      _props$component = props.component,
      component = _props$component === void 0 ? 'div' : _props$component,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableElevati = props.disableElevation,
      disableElevation = _props$disableElevati === void 0 ? false : _props$disableElevati,
      _props$disableFocusRi = props.disableFocusRipple,
      disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
      _props$disableRipple = props.disableRipple,
      disableRipple = _props$disableRipple === void 0 ? false : _props$disableRipple,
      _props$fullWidth = props.fullWidth,
      fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'outlined' : _props$variant,
      other = _objectWithoutProperties(props, ["children", "className", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "disableRipple", "fullWidth", "orientation", "size", "variant"]);

  var ownerState = _extends({}, props, {
    color: color,
    component: component,
    disabled: disabled,
    disableElevation: disableElevation,
    disableFocusRipple: disableFocusRipple,
    disableRipple: disableRipple,
    fullWidth: fullWidth,
    orientation: orientation,
    size: size,
    variant: variant
  });

  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(ButtonGroupRoot, _extends({
    as: component,
    role: "group",
    className: clsx(classes.root, className),
    ref: ref,
    ownerState: ownerState
  }, other, {
    children: React.Children.map(children, function (child) {
      if (! /*#__PURE__*/React.isValidElement(child)) {
        return null;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (isFragment(child)) {
          console.error(["Material-UI: The ButtonGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
        }
      }

      return /*#__PURE__*/React.cloneElement(child, {
        className: clsx(classes.grouped, child.props.className),
        color: child.props.color || color,
        disabled: child.props.disabled || disabled,
        disableElevation: child.props.disableElevation || disableElevation,
        disableFocusRipple: disableFocusRipple,
        disableRipple: disableRipple,
        fullWidth: fullWidth,
        size: child.props.size || size,
        variant: child.props.variant || variant
      });
    })
  }));
});
process.env.NODE_ENV !== "production" ? ButtonGroup.propTypes
/* remove-proptypes */
= {
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['inherit', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: PropTypes.bool,

  /**
   * If `true`, the button keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,

  /**
   * If `true`, the button ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,

  /**
   * If `true`, the buttons will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,

  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['contained', 'outlined', 'text']), PropTypes.string])
} : void 0;
export default ButtonGroup;