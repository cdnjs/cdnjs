'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioGroup = exports.radioGroupFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _RadioButton = require('./RadioButton.js');

var _RadioButton2 = _interopRequireDefault(_RadioButton);

var _react3 = require('../utils/react.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(RadioButton) {
  var RadioGroup = function (_Component) {
    _inherits(RadioGroup, _Component);

    function RadioGroup() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, RadioGroup);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value) {
        if (_this.props.onChange) _this.props.onChange(value);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RadioGroup, [{
      key: 'renderRadioButtons',
      value: function renderRadioButtons() {
        var _this2 = this;

        return _react2.default.Children.map(this.props.children, function (child) {
          return !(0, _react3.isComponentOfType)(RadioButton, child) ? child : _react2.default.cloneElement(child, {
            checked: child.props.value === _this2.props.value,
            disabled: _this2.props.disabled || child.props.disabled,
            onChange: _this2.handleChange.bind(_this2, child.props.value)
          });
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { 'data-react-toolbox': 'radio-group', className: this.props.className },
          this.renderRadioButtons()
        );
      }
    }]);

    return RadioGroup;
  }(_react.Component);

  RadioGroup.propTypes = {
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    name: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    value: _react.PropTypes.any
  };
  RadioGroup.defaultProps = {
    className: '',
    disabled: false
  };


  return RadioGroup;
};

var RadioGroup = factory(_RadioButton2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.RADIO)(RadioGroup);
exports.radioGroupFactory = factory;
exports.RadioGroup = RadioGroup;