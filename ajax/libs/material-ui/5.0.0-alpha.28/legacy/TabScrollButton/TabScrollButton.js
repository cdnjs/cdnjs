import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";

/* eslint-disable jsx-a11y/aria-role */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import ButtonBase from '../ButtonBase';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import { getTabScrollButtonUtilityClass } from './tabScrollButtonClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var overridesResolver = function overridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return deepmerge(_extends({}, styleProps.orientation && styles[styleProps.orientation]), styles.root || {});
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      orientation = styleProps.orientation,
      disabled = styleProps.disabled;
  var slots = {
    root: ['root', orientation, disabled && 'disabled']
  };
  return composeClasses(slots, getTabScrollButtonUtilityClass, classes);
};

var TabScrollButtonRoot = experimentalStyled(ButtonBase, {}, {
  name: 'MuiTabScrollButton',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var styleProps = _ref.styleProps;
  return _extends({
    /* Styles applied to the root element. */
    width: 40,
    flexShrink: 0,
    opacity: 0.8,
    '&.Mui-disabled': {
      opacity: 0
    }
  }, styleProps.orientation === 'vertical' && {
    width: '100%',
    height: 40,
    '& svg': {
      transform: 'rotate(90deg)'
    }
  });
});

var _ref2 = /*#__PURE__*/_jsx(KeyboardArrowLeft, {
  fontSize: "small"
});

var _ref3 = /*#__PURE__*/_jsx(KeyboardArrowRight, {
  fontSize: "small"
});

var TabScrollButton = /*#__PURE__*/React.forwardRef(function TabScrollButton(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiTabScrollButton'
  });

  var className = props.className,
      direction = props.direction,
      orientation = props.orientation,
      disabled = props.disabled,
      other = _objectWithoutProperties(props, ["className", "direction", "orientation", "disabled"]); // TODO: convert to simple assignment after the type error in defaultPropsHandler.js:60:6 is fixed


  var styleProps = _extends({}, props);

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(TabScrollButtonRoot, _extends({
    component: "div",
    className: clsx(classes.root, className),
    ref: ref,
    role: null,
    styleProps: styleProps,
    tabIndex: null
  }, other, {
    children: direction === 'left' ? _ref2 : _ref3
  }));
});
process.env.NODE_ENV !== "production" ? TabScrollButton.propTypes
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
   * The direction the button should indicate.
   */
  direction: PropTypes.oneOf(['left', 'right']).isRequired,

  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * The component orientation (layout flow direction).
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default TabScrollButton;