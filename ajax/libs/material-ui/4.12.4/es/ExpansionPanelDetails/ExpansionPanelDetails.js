import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    padding: theme.spacing(1, 2, 2)
  }
});
let warnedOnce = false;
/**
 * ⚠️ The ExpansionPanelDetails component was renamed to AccordionDetails to use a more common naming convention.
 *
 * You should use `import { AccordionDetails } from '@material-ui/core'`
 * or `import AccordionDetails from '@material-ui/core/AccordionDetails'`.
 */

const ExpansionPanelDetails = /*#__PURE__*/React.forwardRef(function ExpansionPanelDetails(props, ref) {
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(['Material-UI: the ExpansionPanelDetails component was renamed to AccordionDetails to use a more common naming convention.', '', "You should use `import { AccordionDetails } from '@material-ui/core'`", "or `import AccordionDetails from '@material-ui/core/AccordionActions'`"].join('\n'));
    }
  }

  const {
    classes,
    className
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["classes", "className"]);

  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx(classes.root, className),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? ExpansionPanelDetails.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the expansion panel details.
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
  className: PropTypes.string
} : void 0;
export default withStyles(styles, {
  name: 'MuiExpansionPanelDetails'
})(ExpansionPanelDetails);