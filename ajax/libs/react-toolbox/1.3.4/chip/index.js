'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chip = undefined;

var _identifiers = require('../identifiers.js');

var _reactCssThemr = require('react-css-themr');

var _Chip = require('./Chip.js');

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chip = (0, _Chip.chipFactory)(_avatar2.default);
var ThemedChip = (0, _reactCssThemr.themr)(_identifiers.CHIP, _theme2.default)(Chip);

exports.default = ThemedChip;
exports.Chip = ThemedChip;