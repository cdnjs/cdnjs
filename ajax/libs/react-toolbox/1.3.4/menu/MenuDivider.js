'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuDivider = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuDivider = function MenuDivider(_ref) {
  var theme = _ref.theme;
  return _react2.default.createElement('hr', { 'data-react-toolbox': 'menu-divider', className: theme.menuDivider });
};

MenuDivider.propTypes = {
  theme: _react.PropTypes.shape({
    menuDivider: _react.PropTypes.string
  })
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.MENU)(MenuDivider);
exports.MenuDivider = MenuDivider;