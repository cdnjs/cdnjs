'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tooltipFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Tooltip = require('./Tooltip.js');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var themedTooltipFactory = function themedTooltipFactory(options) {
  return (0, _Tooltip2.default)(_extends({}, options, { theme: _theme2.default }));
};
exports.default = (0, _Tooltip2.default)({ theme: _theme2.default });
exports.tooltipFactory = themedTooltipFactory;