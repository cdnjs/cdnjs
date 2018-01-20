'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = exports.Tab = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Tabs = require('./Tabs.js');

var _TabContent = require('./TabContent.js');

var _Tab = require('./Tab.js');

var _FontIcon = require('../font_icon/FontIcon.js');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyTheme = function applyTheme(Component) {
  return (0, _reactCssThemr.themr)(_identifiers.TABS, _theme2.default)(Component);
};
var ThemedTabContent = applyTheme(_TabContent.TabContent);
var ThemedTab = applyTheme(_Tab.Tab);
var ThemedTabs = applyTheme((0, _Tabs.tabsFactory)(ThemedTab, ThemedTabContent, _FontIcon2.default));

exports.Tab = ThemedTab;
exports.Tabs = ThemedTabs;