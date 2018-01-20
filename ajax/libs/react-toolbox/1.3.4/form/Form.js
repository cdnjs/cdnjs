'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = exports.formFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Autocomplete = require('../autocomplete/Autocomplete.js');

var _Autocomplete2 = _interopRequireDefault(_Autocomplete);

var _Button = require('../button/Button.js');

var _Button2 = _interopRequireDefault(_Button);

var _Checkbox = require('../checkbox/Checkbox.js');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _DatePicker = require('../date_picker/DatePicker.js');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _Dropdown = require('../dropdown/Dropdown.js');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Input = require('../input/Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _RadioGroup = require('../radio/RadioGroup.js');

var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

var _Slider = require('../slider/Slider.js');

var _Slider2 = _interopRequireDefault(_Slider);

var _Switch = require('../switch/Switch.js');

var _Switch2 = _interopRequireDefault(_Switch);

var _TimePicker = require('../time_picker/TimePicker.js');

var _TimePicker2 = _interopRequireDefault(_TimePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Autocomplete, Button, Checkbox, DatePicker, Dropdown, Input, RadioGroup, Slider, Switch, TimePicker) {

  var COMPONENTS = {
    'autocomplete': Autocomplete,
    'button': Button,
    'checkbox': Checkbox,
    'datepicker': DatePicker,
    'dropdown': Dropdown,
    'input': Input,
    'radioGroup': RadioGroup,
    'slider': Slider,
    'switch': Switch,
    'timepicker': TimePicker
  };

  var Form = function (_Component) {
    _inherits(Form, _Component);

    function Form() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Form);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this.onSubmit = function (event) {
        event.preventDefault();
        if (_this.props.onSubmit) _this.props.onSubmit(event);
      }, _this.onChange = function (field, value, event) {
        if (_this.props.onChange) _this.props.onChange(field, value, event);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Form, [{
      key: 'renderFields',
      value: function renderFields() {
        var _this2 = this;

        return Object.keys(this.props.model).map(function (field, index) {
          var properties = _this2.props.model[field];
          var Field = COMPONENTS[properties.kind.toLowerCase()];
          return _react2.default.createElement(Field, _extends({ key: index }, properties, { onChange: _this2.onChange.bind(_this2, field) }));
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'form',
          { 'data-react-toolbox': 'form', className: this.props.className, onSubmit: this.onSubmit },
          this.renderFields(),
          this.props.children
        );
      }
    }]);

    return Form;
  }(_react.Component);

  Form.propTypes = {
    attributes: _react.PropTypes.array,
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    model: _react.PropTypes.object,
    onChange: _react.PropTypes.func,
    onError: _react.PropTypes.func,
    onSubmit: _react.PropTypes.func,
    onValid: _react.PropTypes.func,
    storage: _react.PropTypes.string
  };
  Form.defaultProps = {
    attributes: [],
    className: ''
  };


  return Form;
};

var Form = factory(_Autocomplete2.default, _Button2.default, _Checkbox2.default, _DatePicker2.default, _Dropdown2.default, _Input2.default, _RadioGroup2.default, _Slider2.default, _Switch2.default, _TimePicker2.default);

exports.default = Form;
exports.formFactory = factory;
exports.Form = Form;