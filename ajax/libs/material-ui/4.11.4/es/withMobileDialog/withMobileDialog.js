import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import withWidth, { isWidthDown } from '../withWidth';
/**
 * Dialog will responsively be full screen *at or below* the given breakpoint
 * (defaults to 'sm' for mobile devices).
 * Notice that this Higher-order Component is incompatible with server-side rendering.
 */

const withMobileDialog = (options = {}) => Component => {
  const {
    breakpoint = 'sm'
  } = options;

  function WithMobileDialog(props) {
    return /*#__PURE__*/React.createElement(Component, _extends({
      fullScreen: isWidthDown(breakpoint, props.width)
    }, props));
  }

  process.env.NODE_ENV !== "production" ? WithMobileDialog.propTypes = {
    width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired
  } : void 0;
  return withWidth()(WithMobileDialog);
};

export default withMobileDialog;