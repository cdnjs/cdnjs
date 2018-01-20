'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconMenu = exports.Menu = exports.MenuItem = exports.MenuDivider = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _button = require('../button');

var _MenuDivider = require('./MenuDivider.js');

var _MenuItem = require('./MenuItem.js');

var _Menu = require('./Menu.js');

var _IconMenu = require('./IconMenu.js');

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyTheme = function applyTheme(Component) {
  return (0, _reactCssThemr.themr)(_identifiers.MENU, _theme2.default)(Component);
};
var ThemedMenuDivider = applyTheme(_MenuDivider.MenuDivider);
var ThemedMenuItem = applyTheme((0, _MenuItem.menuItemFactory)((0, _ripple2.default)({})));
var ThemedMenu = applyTheme((0, _Menu.menuFactory)(ThemedMenuItem));
var ThemedIconMenu = applyTheme((0, _IconMenu.iconMenuFactory)(_button.IconButton, ThemedMenu));

exports.MenuDivider = ThemedMenuDivider;
exports.MenuItem = ThemedMenuItem;
exports.Menu = ThemedMenu;
exports.IconMenu = ThemedIconMenu;