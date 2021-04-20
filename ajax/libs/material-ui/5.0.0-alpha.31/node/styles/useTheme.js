"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTheme;

var _styles = require("@material-ui/styles");

var React = _interopRequireWildcard(require("react"));

var _defaultTheme = _interopRequireDefault(require("./defaultTheme"));

function useTheme() {
  const theme = (0, _styles.useTheme)() || _defaultTheme.default;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(theme);
  }

  return theme;
}