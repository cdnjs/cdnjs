import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    marginBottom: 12
  }
};
const DialogContentText = /*#__PURE__*/React.forwardRef(function DialogContentText(props, ref) {
  return /*#__PURE__*/React.createElement(Typography, _extends({
    component: "p",
    variant: "body1",
    color: "textSecondary",
    ref: ref
  }, props));
});
process.env.NODE_ENV !== "production" ? DialogContentText.propTypes = {
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
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object
} : void 0;
export default withStyles(styles, {
  name: 'MuiDialogContentText'
})(DialogContentText);