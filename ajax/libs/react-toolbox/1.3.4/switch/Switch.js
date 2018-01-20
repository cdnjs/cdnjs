'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = exports.switchFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Ripple = require('../ripple/Ripple.js');

var _Ripple2 = _interopRequireDefault(_Ripple);

var _Thumb = require('./Thumb.js');

var _Thumb2 = _interopRequireDefault(_Thumb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Thumb) {
  var Switch = function (_Component) {
    _inherits(Switch, _Component);

    function Switch() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Switch);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Switch.__proto__ || Object.getPrototypeOf(Switch)).call.apply(_ref, [this].concat(args))), _this), _this.handleToggle = function (event) {
        if (event.pageX !== 0 && event.pageY !== 0) _this.blur();
        if (!_this.props.disabled && _this.props.onChange) {
          _this.props.onChange(!_this.props.checked, event);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Switch, [{
      key: 'blur',
      value: function blur() {
        this.refs.input.blur();
      }
    }, {
      key: 'focus',
      value: function focus() {
        this.refs.input.focus();
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            className = _props.className,
            checked = _props.checked,
            disabled = _props.disabled,
            onChange = _props.onChange,
            theme = _props.theme,
            others = _objectWithoutProperties(_props, ['className', 'checked', 'disabled', 'onChange', 'theme']); //eslint-disable-line no-unused-vars


        var _className = (0, _classnames2.default)(theme[disabled ? 'disabled' : 'field'], className);
        return _react2.default.createElement(
          'label',
          { 'data-react-toolbox': 'switch', className: _className },
          _react2.default.createElement('input', _extends({}, others, {
            checked: this.props.checked,
            className: theme.input,
            onClick: this.handleToggle,
            readOnly: true,
            ref: 'input',
            type: 'checkbox'
          })),
          _react2.default.createElement(
            'span',
            { className: theme[checked ? 'on' : 'off'] },
            _react2.default.createElement(Thumb, { disabled: this.props.disabled, theme: theme })
          ),
          this.props.label ? _react2.default.createElement(
            'span',
            { className: theme.text },
            this.props.label
          ) : null
        );
      }
    }]);

    return Switch;
  }(_react.Component);

  Switch.propTypes = {
    checked: _react.PropTypes.bool,
    className: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    label: _react.PropTypes.string,
    name: _react.PropTypes.string,
    onBlur: _react.PropTypes.func,
    onChange: _react.PropTypes.func,
    onFocus: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      disabled: _react.PropTypes.string,
      field: _react.PropTypes.string,
      input: _react.PropTypes.string,
      off: _react.PropTypes.string,
      on: _react.PropTypes.string,
      ripple: _react.PropTypes.string,
      text: _react.PropTypes.string,
      thumb: _react.PropTypes.string
    })
  };
  Switch.defaultProps = {
    checked: false,
    className: '',
    disabled: false
  };


  return Switch;
};

var Thumb = (0, _Thumb2.default)((0, _Ripple2.default)({ centered: true, spread: 2.6 }));
var Switch = factory(Thumb);

exports.default = (0, _reactCssThemr.themr)(_identifiers.SWITCH)(Switch);
exports.switchFactory = factory;
exports.Switch = Switch;