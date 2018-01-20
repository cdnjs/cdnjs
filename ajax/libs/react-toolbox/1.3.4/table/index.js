'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _checkbox = require('../checkbox');

var _Table = require('./Table.js');

var _TableHead = require('./TableHead.js');

var _TableHead2 = _interopRequireDefault(_TableHead);

var _TableRow = require('./TableRow.js');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyTheme = function applyTheme(Component) {
  return (0, _reactCssThemr.themr)(_identifiers.TABLE, _theme2.default)(Component);
};
var ThemedTableHead = applyTheme((0, _TableHead2.default)(_checkbox.Checkbox));
var ThemedTableRow = applyTheme((0, _TableRow2.default)(_checkbox.Checkbox));
var ThemedTable = applyTheme((0, _Table.tableFactory)(ThemedTableHead, ThemedTableRow));

exports.default = ThemedTable;
exports.Table = ThemedTable;