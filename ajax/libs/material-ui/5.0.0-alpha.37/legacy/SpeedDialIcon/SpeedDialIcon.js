import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import AddIcon from '../internal/svg-icons/Add';
import speedDialIconClasses, { getSpeedDialIconUtilityClass } from './speedDialIconClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      open = styleProps.open,
      openIcon = styleProps.openIcon;
  var slots = {
    root: ['root'],
    icon: ['icon', open && 'iconOpen', openIcon && open && 'iconWithOpenIconOpen'],
    openIcon: ['openIcon', open && 'openIconOpen']
  };
  return composeClasses(slots, getSpeedDialIconUtilityClass, classes);
};

var SpeedDialIconRoot = styled('span', {
  name: 'MuiSpeedDialIcon',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var _extends2;

    var styleProps = props.styleProps;
    return _extends((_extends2 = {}, _defineProperty(_extends2, "& .".concat(speedDialIconClasses.icon), _extends({}, styles.icon, styleProps.open && styles.iconOpen, styleProps.open && styleProps.openIcon && styles.iconWithOpenIconOpen)), _defineProperty(_extends2, "& .".concat(speedDialIconClasses.openIcon), _extends({}, styles.openIcon, styleProps.open && styles.openIconOpen)), _extends2), styles.root);
  }
})(function (_ref) {
  var _ref2;

  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _ref2 = {
    height: 24
  }, _defineProperty(_ref2, "& .".concat(speedDialIconClasses.icon), _extends({
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short
    })
  }, styleProps.open && _extends({
    transform: 'rotate(45deg)'
  }, styleProps.openIcon && {
    opacity: 0
  }))), _defineProperty(_ref2, "& .".concat(speedDialIconClasses.openIcon), _extends({
    position: 'absolute',
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0,
    transform: 'rotate(-45deg)'
  }, styleProps.open && {
    transform: 'rotate(0deg)',
    opacity: 1
  })), _ref2;
});
var SpeedDialIcon = /*#__PURE__*/React.forwardRef(function SpeedDialIcon(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiSpeedDialIcon'
  });

  var className = props.className,
      iconProp = props.icon,
      open = props.open,
      openIconProp = props.openIcon,
      other = _objectWithoutProperties(props, ["className", "icon", "open", "openIcon"]);

  var styleProps = _extends({}, props);

  var classes = useUtilityClasses(styleProps);

  function formatIcon(icon, newClassName) {
    if ( /*#__PURE__*/React.isValidElement(icon)) {
      return /*#__PURE__*/React.cloneElement(icon, {
        className: newClassName
      });
    }

    return icon;
  }

  return /*#__PURE__*/_jsxs(SpeedDialIconRoot, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: [openIconProp ? formatIcon(openIconProp, classes.openIcon) : null, iconProp ? formatIcon(iconProp, classes.icon) : /*#__PURE__*/_jsx(AddIcon, {
      className: classes.icon
    })]
  }));
});
process.env.NODE_ENV !== "production" ? SpeedDialIcon.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The icon to display.
   */
  icon: PropTypes.node,

  /**
   * @ignore
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,

  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon: PropTypes.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
SpeedDialIcon.muiName = 'SpeedDialIcon';
export default SpeedDialIcon;