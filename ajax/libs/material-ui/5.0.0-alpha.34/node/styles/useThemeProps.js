"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useThemeProps;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _getThemeProps = _interopRequireDefault(require("./getThemeProps"));

var _useTheme = _interopRequireDefault(require("./useTheme"));

var _defaultTheme = _interopRequireDefault(require("./defaultTheme"));

function useThemeProps({
  props,
  name
}) {
  const contextTheme = (0, _useTheme.default)() || _defaultTheme.default;

  const more = (0, _getThemeProps.default)({
    theme: contextTheme,
    name,
    props
  });
  const theme = more.theme || contextTheme;
  return (0, _extends2.default)({
    theme,
    isRtl: theme.direction === 'rtl'
  }, more);
}