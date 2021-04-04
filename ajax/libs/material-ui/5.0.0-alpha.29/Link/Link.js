import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge, elementTypeAcceptingRef } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import capitalize from '../utils/capitalize';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import useIsFocusVisible from '../utils/useIsFocusVisible';
import useForkRef from '../utils/useForkRef';
import Typography from '../Typography';
import linkClasses, { getLinkUtilityClass } from './linkClasses';
import { jsx as _jsx } from "react/jsx-runtime";

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return deepmerge(_extends({}, styles[`underline${capitalize(styleProps.underline)}`], styleProps.component === 'button' && styles.button), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    component,
    focusVisible,
    underline
  } = styleProps;
  const slots = {
    root: ['root', `underline${capitalize(underline)}`, component === 'button' && 'button', focusVisible && 'focusVisible']
  };
  return composeClasses(slots, getLinkUtilityClass, classes);
};

const LinkRoot = experimentalStyled(Typography, {}, {
  name: 'MuiLink',
  slot: 'Root',
  overridesResolver
})(({
  styleProps
}) => {
  return _extends({}, styleProps.underline === 'none' && {
    textDecoration: 'none'
  }, styleProps.underline === 'hover' && {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }, styleProps.underline === 'always' && {
    textDecoration: 'underline'
  }, styleProps.component === 'button' && {
    position: 'relative',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0,
    // Remove the margin in Safari
    borderRadius: 0,
    padding: 0,
    // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none',
    // Reset
    WebkitAppearance: 'none',
    // Reset
    '&::-moz-focus-inner': {
      borderStyle: 'none' // Remove Firefox dotted outline.

    },
    [`&.${linkClasses.focusVisible}`]: {
      outline: 'auto'
    }
  });
});
const Link = /*#__PURE__*/React.forwardRef(function Link(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiLink'
  });

  const {
    className,
    color = 'primary',
    component = 'a',
    onBlur,
    onFocus,
    TypographyClasses,
    underline = 'hover',
    variant = 'inherit'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["className", "color", "component", "onBlur", "onFocus", "TypographyClasses", "underline", "variant"]);

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(false);
  const handlerRef = useForkRef(ref, focusVisibleRef);

  const handleBlur = event => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    if (onBlur) {
      onBlur(event);
    }
  };

  const handleFocus = event => {
    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  const styleProps = _extends({}, props, {
    color,
    component,
    focusVisible,
    underline,
    variant
  });

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(LinkRoot, _extends({
    className: clsx(classes.root, className),
    classes: TypographyClasses,
    color: color,
    component: component,
    onBlur: handleBlur,
    onFocus: handleFocus,
    ref: handlerRef,
    styleProps: styleProps,
    variant: variant
  }, other));
});
process.env.NODE_ENV !== "production" ? Link.propTypes
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
   * The color of the link.
   * @default 'primary'
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .any,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,

  /**
   * @ignore
   */
  onBlur: PropTypes.func,

  /**
   * @ignore
   */
  onFocus: PropTypes.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * `classes` prop applied to the [`Typography`](/api/typography/) element.
   */
  TypographyClasses: PropTypes.object,

  /**
   * Controls when the link should have an underline.
   * @default 'hover'
   */
  underline: PropTypes.oneOf(['always', 'hover', 'none']),

  /**
   * Applies the theme typography styles.
   * @default 'inherit'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2']), PropTypes.string])
} : void 0;
export default Link;