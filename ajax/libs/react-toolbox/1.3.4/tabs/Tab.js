'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _font_icon = require('../font_icon');

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = function (_Component) {
  _inherits(Tab, _Component);

  function Tab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tab.__proto__ || Object.getPrototypeOf(Tab)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (!_this.props.disabled && _this.props.onClick) {
        _this.props.onClick(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tab, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.active && this.props.active && this.props.onActive) {
        this.props.onActive();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          onActive = _props.onActive,
          active = _props.active,
          activeClassName = _props.activeClassName,
          className = _props.className,
          disabled = _props.disabled,
          hidden = _props.hidden,
          label = _props.label,
          icon = _props.icon,
          theme = _props.theme,
          other = _objectWithoutProperties(_props, ['onActive', 'active', 'activeClassName', 'className', 'disabled', 'hidden', 'label', 'icon', 'theme']);

      var _className = (0, _classnames3.default)(theme.label, (_classnames = {}, _defineProperty(_classnames, theme.active, active), _defineProperty(_classnames, theme.hidden, hidden), _defineProperty(_classnames, theme.withText, label), _defineProperty(_classnames, theme.withIcon, icon), _defineProperty(_classnames, theme.disabled, disabled), _defineProperty(_classnames, activeClassName, active), _classnames), className);

      return _react2.default.createElement(
        'label',
        _extends({}, other, { 'data-react-toolbox': 'tab', className: _className, onClick: this.handleClick }),
        icon && _react2.default.createElement(_font_icon.FontIcon, { className: theme.icon, value: icon }),
        label
      );
    }
  }]);

  return Tab;
}(_react.Component);

Tab.propTypes = {
  active: _react.PropTypes.bool,
  activeClassName: _react.PropTypes.string,
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  hidden: _react.PropTypes.bool,
  icon: _react.PropTypes.node,
  label: _react.PropTypes.node,
  onActive: _react.PropTypes.func,
  onClick: _react.PropTypes.func,
  theme: _react.PropTypes.shape({
    active: _react.PropTypes.string,
    disabled: _react.PropTypes.string,
    hidden: _react.PropTypes.string,
    label: _react.PropTypes.string,
    withIcon: _react.PropTypes.string,
    withText: _react.PropTypes.string
  })
};
Tab.defaultProps = {
  active: false,
  className: '',
  disabled: false,
  hidden: false
};
exports.default = (0, _reactCssThemr.themr)(_identifiers.TABS)(Tab);
exports.Tab = Tab;