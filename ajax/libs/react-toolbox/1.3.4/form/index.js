'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = undefined;

var _Form = require('./Form.js');

var _autocomplete = require('../autocomplete');

var _autocomplete2 = _interopRequireDefault(_autocomplete);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _date_picker = require('../date_picker');

var _date_picker2 = _interopRequireDefault(_date_picker);

var _dropdown = require('../dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _radio = require('../radio');

var _radio2 = _interopRequireDefault(_radio);

var _slider = require('../slider');

var _slider2 = _interopRequireDefault(_slider);

var _switch = require('../switch');

var _switch2 = _interopRequireDefault(_switch);

var _time_picker = require('../time_picker');

var _time_picker2 = _interopRequireDefault(_time_picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThemedForm = (0, _Form.formFactory)(_autocomplete2.default, _button2.default, _checkbox2.default, _date_picker2.default, _dropdown2.default, _input2.default, _radio2.default, _slider2.default, _switch2.default, _time_picker2.default);

exports.default = ThemedForm;
exports.Form = ThemedForm;