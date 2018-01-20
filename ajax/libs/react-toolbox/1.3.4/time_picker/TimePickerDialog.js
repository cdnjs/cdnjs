'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _time = require('../utils/time.js');

var _time2 = _interopRequireDefault(_time);

var _Clock = require('./Clock.js');

var _Clock2 = _interopRequireDefault(_Clock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Dialog) {
  var TimePickerDialog = function (_Component) {
    _inherits(TimePickerDialog, _Component);

    function TimePickerDialog() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, TimePickerDialog);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TimePickerDialog.__proto__ || Object.getPrototypeOf(TimePickerDialog)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        display: 'hours',
        displayTime: new Date(_this.props.value.getTime())
      }, _this.handleClockChange = function (value) {
        _this.setState({ displayTime: value });
      }, _this.handleSelect = function (event) {
        _this.props.onSelect(_this.state.displayTime, event);
      }, _this.toggleTimeMode = function () {
        _this.setState({ displayTime: _time2.default.toggleTimeMode(_this.state.displayTime) });
      }, _this.handleHandMoved = function () {
        if (_this.state.display === 'hours') _this.setState({ display: 'minutes' });
      }, _this.switchDisplay = function (event) {
        _this.setState({ display: event.target.id });
      }, _this.actions = [{ label: _this.props.cancelLabel, className: _this.props.theme.button, onClick: _this.props.onDismiss }, { label: _this.props.okLabel, className: _this.props.theme.button, name: _this.props.name, onClick: _this.handleSelect }], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TimePickerDialog, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.value.getTime() !== this.state.displayTime.getTime()) {
          this.setState({ displayTime: new Date(nextProps.value.getTime()) });
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (!prevProps.active && this.props.active) {
          setTimeout(this.refs.clock.handleCalculateShape, 1000);
        }
      }
    }, {
      key: 'formatHours',
      value: function formatHours() {
        if (this.props.format === 'ampm') {
          return this.state.displayTime.getHours() % 12 || 12;
        } else {
          return this.state.displayTime.getHours();
        }
      }
    }, {
      key: 'renderAMPMLabels',
      value: function renderAMPMLabels() {
        var theme = this.props.theme;

        if (this.props.format === 'ampm') {
          return _react2.default.createElement(
            'div',
            { className: theme.ampm },
            _react2.default.createElement(
              'span',
              { className: theme.am, onClick: this.toggleTimeMode },
              'AM'
            ),
            _react2.default.createElement(
              'span',
              { className: theme.pm, onClick: this.toggleTimeMode },
              'PM'
            )
          );
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var theme = this.props.theme;

        var display = this.state.display + 'Display';
        var format = _time2.default.getTimeMode(this.state.displayTime) + 'Format';
        var className = (0, _classnames2.default)([theme.dialog, theme[display], theme[format]], this.props.className);
        return _react2.default.createElement(
          Dialog,
          {
            actions: this.actions,
            active: this.props.active,
            className: className,
            onEscKeyDown: this.props.onEscKeyDown,
            onOverlayClick: this.props.onOverlayClick
          },
          _react2.default.createElement(
            'header',
            { className: theme.header },
            _react2.default.createElement(
              'span',
              { id: 'hours', className: theme.hours, onClick: this.switchDisplay },
              ('0' + this.formatHours()).slice(-2)
            ),
            _react2.default.createElement(
              'span',
              { className: theme.separator },
              ':'
            ),
            _react2.default.createElement(
              'span',
              { id: 'minutes', className: theme.minutes, onClick: this.switchDisplay },
              ('0' + this.state.displayTime.getMinutes()).slice(-2)
            ),
            this.renderAMPMLabels()
          ),
          _react2.default.createElement(_Clock2.default, {
            ref: 'clock',
            display: this.state.display,
            format: this.props.format,
            onChange: this.handleClockChange,
            onHandMoved: this.handleHandMoved,
            theme: this.props.theme,
            time: this.state.displayTime
          })
        );
      }
    }]);

    return TimePickerDialog;
  }(_react.Component);

  TimePickerDialog.propTypes = {
    active: _react.PropTypes.bool,
    cancelLabel: _react.PropTypes.string,
    className: _react.PropTypes.string,
    format: _react.PropTypes.oneOf(['24hr', 'ampm']),
    name: _react.PropTypes.string,
    okLabel: _react.PropTypes.string,
    onDismiss: _react.PropTypes.func,
    onEscKeyDown: _react.PropTypes.func,
    onOverlayClick: _react.PropTypes.func,
    onSelect: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      am: _react.PropTypes.string,
      amFormat: _react.PropTypes.string,
      ampm: _react.PropTypes.string,
      button: _react.PropTypes.string,
      dialog: _react.PropTypes.string,
      header: _react.PropTypes.string,
      hours: _react.PropTypes.string,
      hoursDisplay: _react.PropTypes.string,
      minutes: _react.PropTypes.string,
      minutesDisplay: _react.PropTypes.string,
      pm: _react.PropTypes.string,
      pmFormat: _react.PropTypes.string,
      separator: _react.PropTypes.string
    }),
    value: _react.PropTypes.object
  };
  TimePickerDialog.defaultProps = {
    active: false,
    cancelLabel: 'Cancel',
    format: '24hr',
    okLabel: 'Ok',
    value: new Date()
  };


  return TimePickerDialog;
};

exports.default = factory;