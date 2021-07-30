"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/styles");

var _defaultTheme = _interopRequireDefault(require("./defaultTheme"));

var withTheme = (0, _styles.withThemeCreator)({
  defaultTheme: _defaultTheme.default
});
var _default = withTheme;
exports.default = _default;