import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import withWidth, { isWidthDown } from '../withWidth';
var warnedOnce = false;
/**
 * Dialog will responsively be full screen *at or below* the given breakpoint
 * (defaults to 'sm' for mobile devices).
 * Notice that this Higher-order Component is incompatible with server-side rendering.
 */

var withMobileDialog = function withMobileDialog() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (Component) {
    if (process.env.NODE_ENV !== 'production') {
      if (!warnedOnce) {
        console.warn(['Material-UI: The `withMobileDialog` function is deprecated.', 'Head to https://mui.com/r/migration-v4/#dialog for a migration path.'].join('\n'));
        warnedOnce = true;
      }
    }

    var _options$breakpoint = options.breakpoint,
        breakpoint = _options$breakpoint === void 0 ? 'sm' : _options$breakpoint;

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
};

export default withMobileDialog;