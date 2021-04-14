import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import unsupportedProp from '../utils/unsupportedProp';
import tabClasses, { getTabUtilityClass } from './tabClasses';
import { jsxs as _jsxs } from "react/jsx-runtime";

var overridesResolver = function overridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return deepmerge(_extends({}, styleProps.label && styleProps.icon && styles.labelIcon, styles["textColor".concat(capitalize(styleProps.textColor))], styleProps.fullWidth && styles.fullWidth, styleProps.wrapped && styles.wrapped, _defineProperty({}, "& .".concat(tabClasses.wrapper), styles.wrapper)), styles.root || {});
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      textColor = styleProps.textColor,
      fullWidth = styleProps.fullWidth,
      wrapped = styleProps.wrapped,
      icon = styleProps.icon,
      label = styleProps.label,
      selected = styleProps.selected,
      disabled = styleProps.disabled;
  var slots = {
    root: ['root', icon && label && 'labelIcon', "textColor".concat(capitalize(textColor)), fullWidth && 'fullWidth', wrapped && 'wrapped', selected && 'selected', disabled && 'disabled'],
    wrapper: ['wrapper']
  };
  return composeClasses(slots, getTabUtilityClass, classes);
};

var TabRoot = experimentalStyled(ButtonBase, {}, {
  name: 'MuiTab',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({}, theme.typography.button, _defineProperty({
    maxWidth: 264,
    minWidth: 72,
    position: 'relative',
    minHeight: 48,
    flexShrink: 0,
    padding: '6px 12px',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textAlign: 'center'
  }, theme.breakpoints.up('sm'), {
    minWidth: 160
  }), styleProps.icon && styleProps.label && _defineProperty({
    minHeight: 72,
    paddingTop: 9
  }, "& .".concat(tabClasses.wrapper, " > *:first-child"), {
    marginBottom: 6
  }), styleProps.textColor === 'inherit' && {
    color: 'inherit',
    opacity: 0.6,
    // same opacity as theme.palette.text.secondary
    '&.Mui-selected': {
      opacity: 1
    },
    '&.Mui-disabled': {
      opacity: theme.palette.action.disabledOpacity
    }
  }, styleProps.textColor === 'primary' && {
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.primary.main
    },
    '&.Mui-disabled': {
      color: theme.palette.text.disabled
    }
  }, styleProps.textColor === 'secondary' && {
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.secondary.main
    },
    '&.Mui-disabled': {
      color: theme.palette.text.disabled
    }
  }, styleProps.fullWidth && {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: 'none'
  }, styleProps.wrapped && {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1.5
  });
});
var TabWrapper = experimentalStyled('span', {}, {
  name: 'MuiTab',
  slot: 'Wrapper'
})({
  /* Styles applied to the `icon` and `label`'s wrapper element. */
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  flexDirection: 'column'
});
var Tab = /*#__PURE__*/React.forwardRef(function Tab(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiTab'
  });

  var className = props.className,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableFocusRi = props.disableFocusRipple,
      disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
      fullWidth = props.fullWidth,
      icon = props.icon,
      indicator = props.indicator,
      label = props.label,
      onChange = props.onChange,
      onClick = props.onClick,
      onFocus = props.onFocus,
      selected = props.selected,
      selectionFollowsFocus = props.selectionFollowsFocus,
      _props$textColor = props.textColor,
      textColor = _props$textColor === void 0 ? 'inherit' : _props$textColor,
      value = props.value,
      _props$wrapped = props.wrapped,
      wrapped = _props$wrapped === void 0 ? false : _props$wrapped,
      other = _objectWithoutProperties(props, ["className", "disabled", "disableFocusRipple", "fullWidth", "icon", "indicator", "label", "onChange", "onClick", "onFocus", "selected", "selectionFollowsFocus", "textColor", "value", "wrapped"]);

  var styleProps = _extends({}, props, {
    disabled: disabled,
    disableFocusRipple: disableFocusRipple,
    selected: selected,
    icon: !!icon,
    label: !!label,
    fullWidth: fullWidth,
    textColor: textColor,
    wrapped: wrapped
  });

  var classes = useUtilityClasses(styleProps);

  var handleClick = function handleClick(event) {
    if (!selected && onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  var handleFocus = function handleFocus(event) {
    if (selectionFollowsFocus && !selected && onChange) {
      onChange(event, value);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  return /*#__PURE__*/_jsxs(TabRoot, _extends({
    focusRipple: !disableFocusRipple,
    className: clsx(classes.root, className),
    ref: ref,
    role: "tab",
    "aria-selected": selected,
    disabled: disabled,
    onClick: handleClick,
    onFocus: handleFocus,
    styleProps: styleProps,
    tabIndex: selected ? 0 : -1
  }, other, {
    children: [/*#__PURE__*/_jsxs(TabWrapper, {
      className: classes.wrapper,
      styleProps: styleProps,
      children: [icon, label]
    }), indicator]
  }));
});
process.env.NODE_ENV !== "production" ? Tab.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,

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
   * The icon to display.
   */
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),

  /**
   * The label element.
   */
  label: PropTypes.node,

  /**
   * @ignore
   */
  onChange: PropTypes.func,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * @ignore
   */
  onFocus: PropTypes.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: PropTypes.any,

  /**
   * Tab labels appear in a single row.
   * They can use a second line if needed.
   * @default false
   */
  wrapped: PropTypes.bool
} : void 0;
export default Tab;