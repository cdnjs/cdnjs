'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Dialog = require('./Dialog.js');

var _overlay = require('../overlay');

var _overlay2 = _interopRequireDefault(_overlay);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dialog = (0, _Dialog.dialogFactory)(_overlay2.default, _button2.default);
var ThemedDialog = (0, _reactCssThemr.themr)(_identifiers.DIALOG, _theme2.default)(Dialog);

exports.default = ThemedDialog;
exports.Dialog = ThemedDialog;