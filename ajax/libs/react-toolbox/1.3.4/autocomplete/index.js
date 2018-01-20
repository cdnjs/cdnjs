'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Autocomplete = undefined;

var _identifiers = require('../identifiers.js');

var _reactCssThemr = require('react-css-themr');

var _Autocomplete = require('./Autocomplete.js');

var _chip = require('../chip');

var _chip2 = _interopRequireDefault(_chip);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Autocomplete = (0, _Autocomplete.autocompleteFactory)(_chip2.default, _input2.default);
var ThemedAutocomplete = (0, _reactCssThemr.themr)(_identifiers.AUTOCOMPLETE, _theme2.default)(Autocomplete);

exports.default = ThemedAutocomplete;
exports.Autocomplete = ThemedAutocomplete;