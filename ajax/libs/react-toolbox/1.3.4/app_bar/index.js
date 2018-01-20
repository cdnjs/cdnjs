'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppBar = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _AppBar = require('./AppBar.js');

var _button = require('../button');

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppBar = (0, _AppBar.appBarFactory)(_button.IconButton);
var ThemedAppBar = (0, _reactCssThemr.themr)(_identifiers.APP_BAR, _theme2.default)(AppBar);

exports.default = ThemedAppBar;
exports.AppBar = ThemedAppBar;