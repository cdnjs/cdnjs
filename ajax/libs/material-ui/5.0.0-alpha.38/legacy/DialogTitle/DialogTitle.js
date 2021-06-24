import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Typography from '../Typography';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getDialogTitleUtilityClass } from './dialogTitleClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getDialogTitleUtilityClass, classes);
};

var DialogTitleRoot = styled(Typography, {
  name: 'MuiDialogTitle',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})({
  padding: '16px 24px',
  flex: '0 0 auto'
});
var DialogTitle = /*#__PURE__*/React.forwardRef(function DialogTitle(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiDialogTitle'
  });

  var className = props.className,
      other = _objectWithoutProperties(props, ["className"]);

  var styleProps = props;
  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(DialogTitleRoot, _extends({
    component: "h2",
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref,
    variant: "h6"
  }, other));
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default DialogTitle;