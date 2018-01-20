'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItemText = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ListItemText = function ListItemText(_ref) {
  var className = _ref.className,
      primary = _ref.primary,
      children = _ref.children,
      theme = _ref.theme,
      other = _objectWithoutProperties(_ref, ['className', 'primary', 'children', 'theme']);

  var _className = (0, _classnames3.default)(theme.itemText, _defineProperty({}, theme.primary, primary), className);
  return _react2.default.createElement(
    'span',
    _extends({ 'data-react-toolbox': 'list-item-text', className: _className }, other),
    children
  );
};

ListItemText.propTypes = {
  children: _react.PropTypes.any,
  className: _react.PropTypes.string,
  primary: _react.PropTypes.bool,
  theme: _react.PropTypes.shape({
    itemText: _react.PropTypes.string,
    primary: _react.PropTypes.string
  })
};

ListItemText.defaultProps = {
  primary: false
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.LIST)(ListItemText);
exports.ListItemText = ListItemText;