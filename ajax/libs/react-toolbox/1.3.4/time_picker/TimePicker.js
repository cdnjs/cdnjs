'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePicker = exports.timePickerFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _events = require('../utils/events.js');

var _events2 = _interopRequireDefault(_events);

var _time = require('../utils/time.js');

var _time2 = _interopRequireDefault(_time);

var _Dialog = require('../dialog/Dialog.js');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Input = require('../input/Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _TimePickerDialog = require('./TimePickerDialog.js');

var _TimePickerDialog2 = _interopRequireDefault(_TimePickerDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(TimePickerDialog, Input) {
  var TimePicker = function (_Component) {
    _inherits(TimePicker, _Component);

    function TimePicker() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, TimePicker);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        active: _this.props.active
      }, _this.handleDismiss = function () {
        _this.setState({ active: false });
        if (_this.props.onDismiss) {
          _this.props.onDismiss();
        }
      }, _this.handleInputFocus = function (event) {
        _events2.default.pauseEvent(event);
        _this.setState({ active: true });
      }, _this.handleInputBlur = function (event) {
        _events2.default.pauseEvent(event);
        _this.setState({ active: false });
      }, _this.handleInputClick = function (event) {
        _events2.default.pauseEvent(event);
        _this.setState({ active: true });
        if (_this.props.onClick) _this.props.onClick(event);
      }, _this.handleInputKeyPress = function (event) {
        if (event.charCode === 13) {
          _events2.default.pauseEvent(event);
          _this.setState({ active: true });
        }
        if (_this.props.onKeyPress) _this.props.onKeyPress(event);
      }, _this.handleSelect = function (value, event) {
        if (_this.props.onChange) _this.props.onChange(value, event);
        _this.setState({ active: false });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TimePicker, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.active !== this.props.active && this.state.active !== nextProps.active) {
          this.setState({ active: nextProps.active });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            active = _props.active,
            onDismiss = _props.onDismiss,
            cancelLabel = _props.cancelLabel,
            format = _props.format,
            inputClassName = _props.inputClassName,
            okLabel = _props.okLabel,
            onEscKeyDown = _props.onEscKeyDown,
            onOverlayClick = _props.onOverlayClick,
            readonly = _props.readonly,
            value = _props.value,
            others = _objectWithoutProperties(_props, ['active', 'onDismiss', 'cancelLabel', 'format', 'inputClassName', 'okLabel', 'onEscKeyDown', 'onOverlayClick', 'readonly', 'value']);

        var formattedTime = value ? _time2.default.formatTime(value, format) : '';
        return _react2.default.createElement(
          'div',
          { 'data-react-toolbox': 'time-picker' },
          _react2.default.createElement(Input, _extends({}, others, {
            className: (0, _classnames3.default)(this.props.theme.input, _defineProperty({}, inputClassName, inputClassName)),
            disabled: readonly,
            error: this.props.error,
            label: this.props.label,
            name: this.props.name,
            onKeyPress: this.handleInputKeyPress,
            onClick: this.handleInputClick,
            readOnly: true,
            type: 'text',
            value: formattedTime
          })),
          _react2.default.createElement(TimePickerDialog, {
            active: this.state.active,
            cancelLabel: cancelLabel,
            className: this.props.className,
            format: format,
            name: this.props.name,
            okLabel: okLabel,
            onDismiss: this.handleDismiss,
            onEscKeyDown: onEscKeyDown,
            onOverlayClick: onOverlayClick,
            onSelect: this.handleSelect,
            theme: this.props.theme,
            value: this.props.value
          })
        );
      }
    }]);

    return TimePicker;
  }(_react.Component);

  TimePicker.propTypes = {
    active: _react.PropTypes.bool,
    cancelLabel: _react.PropTypes.string,
    className: _react.PropTypes.string,
    error: _react.PropTypes.string,
    format: _react.PropTypes.oneOf(['24hr', 'ampm']),
    inputClassName: _react.PropTypes.string,
    label: _react.PropTypes.string,
    name: _react.PropTypes.string,
    okLabel: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    onClick: _react.PropTypes.func,
    onDismiss: _react.PropTypes.func,
    onEscKeyDown: _react.PropTypes.func,
    onKeyPress: _react.PropTypes.func,
    onOverlayClick: _react.PropTypes.func,
    readonly: _react.PropTypes.bool,
    theme: _react.PropTypes.shape({
      input: _react.PropTypes.string
    }),
    value: _react.PropTypes.object
  };
  TimePicker.defaultProps = {
    active: false,
    className: '',
    format: '24hr'
  };


  return TimePicker;
};

var TimePickerDialog = (0, _TimePickerDialog2.default)(_Dialog2.default);
var TimePicker = factory(TimePickerDialog, _Input2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.TIME_PICKER)(TimePicker);
exports.timePickerFactory = factory;
exports.TimePicker = TimePicker;