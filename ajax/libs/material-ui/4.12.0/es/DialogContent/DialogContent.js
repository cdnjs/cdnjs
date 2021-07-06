import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    flex: '1 1 auto',
    WebkitOverflowScrolling: 'touch',
    // Add iOS momentum scrolling.
    overflowY: 'auto',
    padding: '8px 24px',
    '&:first-child': {
      // dialog without title
      paddingTop: 20
    }
  },

  /* Styles applied to the root element if `dividers={true}`. */
  dividers: {
    padding: '16px 24px',
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
});
const DialogContent = /*#__PURE__*/React.forwardRef(function DialogContent(props, ref) {
  const {
    classes,
    className,
    dividers = false
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["classes", "className", "dividers"]);

  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx(classes.root, className, dividers && classes.dividers),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? DialogContent.propTypes = {
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
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * Display the top and bottom dividers.
   */
  dividers: PropTypes.bool
} : void 0;
export default withStyles(styles, {
  name: 'MuiDialogContent'
})(DialogContent);