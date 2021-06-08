"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _styles = require("@material-ui/styles");

var _defaultTheme = _interopRequireDefault(require("./defaultTheme"));

function makeStyles(stylesOrCreator) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _styles.makeStyles)(stylesOrCreator, (0, _extends2.default)({
    defaultTheme: _defaultTheme.default
  }, options));
}

var _default = makeStyles;
exports.default = _default;