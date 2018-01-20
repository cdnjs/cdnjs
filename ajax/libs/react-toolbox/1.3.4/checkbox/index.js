'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkbox = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _Checkbox = require('./Checkbox.js');

var _Check = require('./Check.js');

var _Check2 = _interopRequireDefault(_Check);

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThemedCheck = (0, _Check2.default)((0, _ripple2.default)({ centered: true, spread: 2.6 }));
var ThemedCheckbox = (0, _reactCssThemr.themr)(_identifiers.CHECKBOX, _theme2.default)((0, _Checkbox.checkboxFactory)(ThemedCheck));

exports.default = ThemedCheckbox;
exports.Checkbox = ThemedCheckbox;