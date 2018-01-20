'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListDivider = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListDivider = function ListDivider(_ref) {
  var inset = _ref.inset,
      theme = _ref.theme;
  return _react2.default.createElement('hr', { className: inset ? theme.divider + ' ' + theme.inset : theme.divider });
};

ListDivider.propTypes = {
  inset: _react.PropTypes.bool,
  theme: _react.PropTypes.shape({
    divider: _react.PropTypes.string,
    inset: _react.PropTypes.string
  })
};

ListDivider.defaultProps = {
  inset: false
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.LIST)(ListDivider);
exports.ListDivider = ListDivider;