'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBar = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _ProgressBar = require('./ProgressBar.js');

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThemedProgressBar = (0, _reactCssThemr.themr)(_identifiers.PROGRESS_BAR, _theme2.default)(_ProgressBar.ProgressBar);

exports.default = ThemedProgressBar;
exports.ProgressBar = ThemedProgressBar;