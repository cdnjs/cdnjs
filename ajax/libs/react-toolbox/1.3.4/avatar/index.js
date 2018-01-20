'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = undefined;

var _identifiers = require('../identifiers.js');

var _reactCssThemr = require('react-css-themr');

var _Avatar = require('./Avatar.js');

var _FontIcon = require('../font_icon/FontIcon.js');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Avatar = (0, _Avatar.avatarFactory)(_FontIcon2.default);
var ThemedAvatar = (0, _reactCssThemr.themr)(_identifiers.AVATAR, _theme2.default)(Avatar);

exports.default = ThemedAvatar;
exports.Avatar = ThemedAvatar;