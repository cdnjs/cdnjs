"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createMuiStrictModeTheme;

var _utils = require("@material-ui/utils");

var _createMuiTheme = _interopRequireDefault(require("./createMuiTheme"));

function createMuiStrictModeTheme(options, ...args) {
  return (0, _createMuiTheme.default)((0, _utils.deepmerge)({
    unstable_strictMode: true
  }, options), ...args);
}