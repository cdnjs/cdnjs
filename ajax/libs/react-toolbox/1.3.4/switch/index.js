'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = undefined;

var _reactCssThemr = require('react-css-themr');

var _Switch = require('./Switch.js');

var _identifiers = require('../identifiers.js');

var _Thumb = require('./Thumb.js');

var _Thumb2 = _interopRequireDefault(_Thumb);

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyTheme = function applyTheme(Component) {
  return (0, _reactCssThemr.themr)(_identifiers.SWITCH, _theme2.default)(Component);
};
var ripple = (0, _ripple2.default)({ centered: true, spread: 2.6 });
var ThemedThumb = applyTheme((0, _Thumb2.default)(ripple));
var ThemedSwitch = applyTheme((0, _Switch.switchFactory)(ThemedThumb));

exports.default = ThemedSwitch;
exports.Switch = ThemedSwitch;