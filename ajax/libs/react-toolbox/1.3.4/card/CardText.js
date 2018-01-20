'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardText = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssThemr = require('react-css-themr');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CardText = function CardText(_ref) {
  var children = _ref.children,
      className = _ref.className,
      theme = _ref.theme,
      other = _objectWithoutProperties(_ref, ['children', 'className', 'theme']);

  return _react2.default.createElement(
    'div',
    _extends({ className: (0, _classnames2.default)(theme.cardText, className) }, other),
    typeof children === 'string' ? _react2.default.createElement(
      'p',
      null,
      children
    ) : children
  );
};

CardText.propTypes = {
  children: _react.PropTypes.any,
  className: _react.PropTypes.string,
  theme: _react.PropTypes.shape({
    cardText: _react.PropTypes.string
  })
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.CARD)(CardText);
exports.CardText = CardText;