import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { html, body } from '../CssBaseline/CssBaseline';
import { jsx as _jsx } from "react/jsx-runtime";
export var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: _extends({}, html, body(theme), {
      '& *, & *::before, & *::after': {
        boxSizing: 'inherit'
      },
      '& strong, & b': {
        fontWeight: theme.typography.fontWeightBold
      }
    })
  };
};
var ScopedCssBaseline = /*#__PURE__*/React.forwardRef(function ScopedCssBaseline(props, ref) {
  var classes = props.classes,
      className = props.className,
      other = _objectWithoutProperties(props, ["classes", "className"]);

  return /*#__PURE__*/_jsx("div", _extends({
    className: clsx(classes.root, className),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? ScopedCssBaseline.propTypes
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
  className: PropTypes.string
} : void 0;
export default withStyles(styles, {
  name: 'MuiScopedCssBaseline'
})(ScopedCssBaseline);