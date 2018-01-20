'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawer = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _overlay = require('../overlay');

var _Drawer = require('./Drawer.js');

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Drawer = (0, _Drawer.drawerFactory)(_overlay.Overlay);
var ThemedDrawer = (0, _reactCssThemr.themr)(_identifiers.DRAWER, _theme2.default)(Drawer);

exports.default = ThemedDrawer;
exports.Drawer = ThemedDrawer;