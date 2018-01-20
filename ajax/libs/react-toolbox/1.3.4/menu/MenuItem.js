'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuItem = exports.menuItemFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _FontIcon = require('../font_icon/FontIcon.js');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Ripple = require('../ripple/Ripple.js');

var _Ripple2 = _interopRequireDefault(_Ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(ripple) {
  var MenuItem = function (_Component) {
    _inherits(MenuItem, _Component);

    function MenuItem() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, MenuItem);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
        if (_this.props.onClick && !_this.props.disabled) {
          _this.props.onClick(event, _this);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MenuItem, [{
      key: 'render',
      value: function render() {
        var _classnames;

        var _props = this.props,
            icon = _props.icon,
            caption = _props.caption,
            children = _props.children,
            shortcut = _props.shortcut,
            selected = _props.selected,
            disabled = _props.disabled,
            theme = _props.theme,
            others = _objectWithoutProperties(_props, ['icon', 'caption', 'children', 'shortcut', 'selected', 'disabled', 'theme']);

        var className = (0, _classnames3.default)(theme.menuItem, (_classnames = {}, _defineProperty(_classnames, theme.selected, selected), _defineProperty(_classnames, theme.disabled, disabled), _classnames), this.props.className);

        return _react2.default.createElement(
          'li',
          _extends({}, others, { 'data-react-toolbox': 'menu-item', className: className, onClick: this.handleClick }),
          icon ? _react2.default.createElement(_FontIcon2.default, { value: icon, className: theme.icon }) : null,
          _react2.default.createElement(
            'span',
            { className: theme.caption },
            caption
          ),
          shortcut ? _react2.default.createElement(
            'small',
            { className: theme.shortcut },
            shortcut
          ) : null,
          children
        );
      }
    }]);

    return MenuItem;
  }(_react.Component);

  MenuItem.propTypes = {
    caption: _react.PropTypes.string,
    children: _react.PropTypes.any,
    className: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    icon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    onClick: _react.PropTypes.func,
    selected: _react.PropTypes.bool,
    shortcut: _react.PropTypes.string,
    theme: _react.PropTypes.shape({
      caption: _react.PropTypes.string,
      disabled: _react.PropTypes.string,
      icon: _react.PropTypes.string,
      menuItem: _react.PropTypes.string,
      selected: _react.PropTypes.string,
      shortcut: _react.PropTypes.string
    })
  };
  MenuItem.defaultProps = {
    className: '',
    disabled: false,
    selected: false
  };


  return ripple(MenuItem);
};

var MenuItem = factory((0, _Ripple2.default)({}));
exports.default = (0, _reactCssThemr.themr)(_identifiers.MENU)(MenuItem);
exports.menuItemFactory = factory;
exports.MenuItem = MenuItem;