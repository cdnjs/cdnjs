'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snackbar = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Snackbar = require('./Snackbar.js');

var _overlay = require('../overlay');

var _button = require('../button');

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThemedSnackbar = (0, _reactCssThemr.themr)(_identifiers.SNACKBAR, _theme2.default)((0, _Snackbar.snackbarFactory)(_overlay.Overlay, _button.Button));

exports.default = ThemedSnackbar;
exports.Snackbar = ThemedSnackbar;