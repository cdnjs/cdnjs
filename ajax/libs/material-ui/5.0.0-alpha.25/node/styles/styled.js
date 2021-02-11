"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _styles = require("@material-ui/styles");

var _defaultTheme = _interopRequireDefault(require("./defaultTheme"));

const styled = Component => {
  const componentCreator = (0, _styles.styled)(Component);
  return (style, options) => componentCreator(style, (0, _extends2.default)({
    defaultTheme: _defaultTheme.default
  }, options));
};

var _default = styled;
exports.default = _default;