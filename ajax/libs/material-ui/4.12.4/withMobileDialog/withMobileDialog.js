"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _withWidth = _interopRequireWildcard(require("../withWidth"));

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
      return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
        fullScreen: (0, _withWidth.isWidthDown)(breakpoint, props.width)
      }, props));
    }

    process.env.NODE_ENV !== "production" ? WithMobileDialog.propTypes = {
      width: _propTypes.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired
    } : void 0;
    return (0, _withWidth.default)()(WithMobileDialog);
  };
};

var _default = withMobileDialog;
exports.default = _default;