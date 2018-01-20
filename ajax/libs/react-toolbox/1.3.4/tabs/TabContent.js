'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabContent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabContent = function (_Component) {
  _inherits(TabContent, _Component);

  function TabContent() {
    _classCallCheck(this, TabContent);

    return _possibleConstructorReturn(this, (TabContent.__proto__ || Object.getPrototypeOf(TabContent)).apply(this, arguments));
  }

  _createClass(TabContent, [{
    key: 'render',
    value: function render() {
      var className = (0, _classnames3.default)(this.props.theme.tab, _defineProperty({}, this.props.theme.active, this.props.active), this.props.className);

      return _react2.default.createElement(
        'section',
        { className: className, tabIndex: this.props.tabIndex },
        this.props.children
      );
    }
  }]);

  return TabContent;
}(_react.Component);

TabContent.propTypes = {
  active: _react.PropTypes.bool,
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  tabIndex: _react.PropTypes.number,
  theme: _react.PropTypes.shape({
    active: _react.PropTypes.string,
    tab: _react.PropTypes.string
  })
};
TabContent.defaultProps = {
  active: false,
  className: ''
};
exports.default = (0, _reactCssThemr.themr)(_identifiers.TABS)(TabContent);
exports.TabContent = TabContent;