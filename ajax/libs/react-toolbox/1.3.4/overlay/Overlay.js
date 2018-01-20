'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Overlay = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Portal = require('../hoc/Portal.js');

var _Portal2 = _interopRequireDefault(_Portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Overlay = function (_Component) {
  _inherits(Overlay, _Component);

  function Overlay() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Overlay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call.apply(_ref, [this].concat(args))), _this), _this.handleEscKey = function (e) {
      if (_this.props.active && _this.props.onEscKeyDown && e.which === 27) {
        _this.props.onEscKeyDown(e);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Overlay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.active) {
        document.body.addEventListener('keydown', this.handleEscKey);
        document.body.style.overflow = 'hidden';
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.active && !this.props.active) document.body.style.overflow = 'hidden';
      if (!nextProps.active && this.props.active && !document.querySelectorAll('[data-react-toolbox="overlay"]')[1]) document.body.style.overflow = '';
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.active) {
        document.body.addEventListener('keydown', this.handleEscKey);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!document.querySelectorAll('[data-react-toolbox="overlay"]')[1]) document.body.style.overflow = '';
      document.body.removeEventListener('keydown', this.handleEscKey);
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          active = _props.active,
          className = _props.className,
          children = _props.children,
          invisible = _props.invisible,
          onClick = _props.onClick,
          theme = _props.theme;

      var _className = (0, _classnames3.default)(theme.overlay, (_classnames = {}, _defineProperty(_classnames, theme.active, active), _defineProperty(_classnames, theme.invisible, invisible), _classnames), className);

      return _react2.default.createElement(
        _Portal2.default,
        null,
        _react2.default.createElement(
          'div',
          { className: _className, 'data-react-toolbox': 'overlay' },
          _react2.default.createElement('div', { className: theme.backdrop, onClick: onClick }),
          children
        )
      );
    }
  }]);

  return Overlay;
}(_react.Component);

Overlay.propTypes = {
  active: _react.PropTypes.bool,
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  invisible: _react.PropTypes.bool,
  onClick: _react.PropTypes.func,
  onEscKeyDown: _react.PropTypes.func,
  theme: _react.PropTypes.shape({
    active: _react.PropTypes.string,
    backdrop: _react.PropTypes.string,
    invisible: _react.PropTypes.string,
    overlay: _react.PropTypes.string
  })
};
Overlay.defaultProps = {
  invisible: false
};
exports.default = (0, _reactCssThemr.themr)(_identifiers.OVERLAY)(Overlay);
exports.Overlay = Overlay;