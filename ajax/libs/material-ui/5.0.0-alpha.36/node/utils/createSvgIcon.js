"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSvgIcon;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _SvgIcon = _interopRequireDefault(require("../SvgIcon"));

var _jsxRuntime = require("react/jsx-runtime");

/**
 * Private module reserved for @material-ui packages.
 */
function createSvgIcon(path, displayName) {
  const Component = (props, ref) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgIcon.default, (0, _extends2.default)({
    "data-testid": `${displayName}Icon`,
    ref: ref
  }, props, {
    children: path
  }));

  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = `${displayName}Icon`;
  }

  Component.muiName = _SvgIcon.default.muiName;
  return /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Component));
}