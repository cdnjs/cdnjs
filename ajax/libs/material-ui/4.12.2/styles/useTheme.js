"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTheme;

var _styles = require("@material-ui/styles");

var _react = _interopRequireDefault(require("react"));

var _defaultTheme = _interopRequireDefault(require("./defaultTheme"));

function useTheme() {
  var theme = (0, _styles.useTheme)() || _defaultTheme.default;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    _react.default.useDebugValue(theme);
  }

  return theme;
}