"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styleFunction = void 0;

var _system = require("@material-ui/system");

var _styled = _interopRequireDefault(require("../styles/styled"));

var styleFunction = (0, _system.styleFunctionSx)((0, _system.compose)(_system.borders, _system.display, _system.flexbox, _system.grid, _system.positions, _system.palette, _system.shadows, _system.sizing, _system.spacing, _system.typography));
/**
 * @ignore - do not document.
 */

exports.styleFunction = styleFunction;
var Box = (0, _styled.default)('div')(styleFunction, {
  name: 'MuiBox'
});
var _default = Box;
exports.default = _default;