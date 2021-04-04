import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
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

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return deepmerge(_extends({}, styleProps.orientation && styles[styleProps.orientation]), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    orientation,
    disabled
  } = styleProps;
  const slots = {
    root: ['root', orientation, disabled && 'disabled']
  };
  return composeClasses(slots, getTabScrollButtonUtilityClass, classes);
};

const TabScrollButtonRoot = experimentalStyled(ButtonBase, {}, {
  name: 'MuiTabScrollButton',
  slot: 'Root',
  overridesResolver
})(({
  styleProps
}) => _extends({
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
}));

var _ref = /*#__PURE__*/_jsx(KeyboardArrowLeft, {
  fontSize: "small"
});

var _ref2 = /*#__PURE__*/_jsx(KeyboardArrowRight, {
  fontSize: "small"
});

const TabScrollButton = /*#__PURE__*/React.forwardRef(function TabScrollButton(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTabScrollButton'
  });

  const {
    className,
    direction
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["className", "direction", "orientation", "disabled"]); // TODO: convert to simple assignment after the type error in defaultPropsHandler.js:60:6 is fixed


  const styleProps = _extends({}, props);

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(TabScrollButtonRoot, _extends({
    component: "div",
    className: clsx(classes.root, className),
    ref: ref,
    role: null,
    styleProps: styleProps,
    tabIndex: null
  }, other, {
    children: direction === 'left' ? _ref : _ref2
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