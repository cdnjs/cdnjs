'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Navigation = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Navigation = require('./Navigation.js');

var _button = require('../button');

var _link = require('../link');

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThemedNavigation = (0, _reactCssThemr.themr)(_identifiers.NAVIGATION, _theme2.default)((0, _Navigation.navigationFactory)(_button.Button, _link.Link));
exports.default = ThemedNavigation;
exports.Navigation = ThemedNavigation;