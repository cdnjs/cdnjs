import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { getDialogContentUtilityClass } from './dialogContentClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var overridesResolver = function overridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return deepmerge(_extends({}, styleProps.dividers && styles.dividers), styles.root || {});
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      dividers = styleProps.dividers;
  var slots = {
    root: ['root', dividers && 'dividers']
  };
  return composeClasses(slots, getDialogContentUtilityClass, classes);
};

var DialogContentRoot = experimentalStyled('div', {}, {
  name: 'MuiDialogContent',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    /* Styles applied to the root element. */
    flex: '1 1 auto',
    WebkitOverflowScrolling: 'touch',
    // Add iOS momentum scrolling.
    overflowY: 'auto',
    padding: '8px 24px',
    '&:first-of-type': {
      // dialog without title
      paddingTop: 20
    }
  }, styleProps.dividers && {
    padding: '16px 24px',
    borderTop: "1px solid ".concat(theme.palette.divider),
    borderBottom: "1px solid ".concat(theme.palette.divider)
  });
});
var DialogContent = /*#__PURE__*/React.forwardRef(function DialogContent(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiDialogContent'
  });

  var className = props.className,
      _props$dividers = props.dividers,
      dividers = _props$dividers === void 0 ? false : _props$dividers,
      other = _objectWithoutProperties(props, ["className", "dividers"]);

  var styleProps = _extends({}, props, {
    dividers: dividers
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(DialogContentRoot, _extends({
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? DialogContent.propTypes
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
   * Display the top and bottom dividers.
   * @default false
   */
  dividers: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default DialogContent;