import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Typography from '../Typography';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { getDialogTitleUtilityClass } from './dialogTitleClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var overridesResolver = function overridesResolver(props, styles) {
  return styles.root || {};
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getDialogTitleUtilityClass, classes);
};

var DialogTitleRoot = experimentalStyled('div', {}, {
  name: 'MuiDialogTitle',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function () {
  return {
    /* Styles applied to the root element. */
    margin: 0,
    padding: '16px 24px',
    flex: '0 0 auto'
  };
});
var DialogTitle = /*#__PURE__*/React.forwardRef(function DialogTitle(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiDialogTitle'
  });

  var children = props.children,
      className = props.className,
      _props$disableTypogra = props.disableTypography,
      disableTypography = _props$disableTypogra === void 0 ? false : _props$disableTypogra,
      other = _objectWithoutProperties(props, ["children", "className", "disableTypography"]);

  var styleProps = _extends({}, props, {
    disableTypography: disableTypography
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(DialogTitleRoot, _extends({
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other, {
    children: disableTypography ? children : /*#__PURE__*/_jsx(Typography, {
      component: "h2",
      variant: "h6",
      children: children
    })
  }));
});
process.env.NODE_ENV !== "production" ? DialogTitle.propTypes
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
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, this can be useful to render an h4 instead of the default h2.
   * @default false
   */
  disableTypography: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default DialogTitle;