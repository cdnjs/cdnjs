'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardMedia = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssThemr = require('react-css-themr');

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CardMedia = function CardMedia(_ref) {
  var aspectRatio = _ref.aspectRatio,
      children = _ref.children,
      className = _ref.className,
      color = _ref.color,
      contentOverlay = _ref.contentOverlay,
      image = _ref.image,
      theme = _ref.theme,
      other = _objectWithoutProperties(_ref, ['aspectRatio', 'children', 'className', 'color', 'contentOverlay', 'image', 'theme']);

  var classes = (0, _classnames4.default)(theme.cardMedia, _defineProperty({}, theme[aspectRatio], aspectRatio), className);

  var innerClasses = (0, _classnames4.default)(theme.content, _defineProperty({}, theme.contentOverlay, contentOverlay));

  var bgStyle = {
    backgroundColor: color ? color : undefined,
    backgroundImage: typeof image === 'string' ? 'url(\'' + image + '\')' : undefined
  };

  return _react2.default.createElement(
    'div',
    _extends({ style: bgStyle, className: classes }, other),
    _react2.default.createElement(
      'div',
      { className: innerClasses },
      children
    )
  );
};

CardMedia.propTypes = {
  aspectRatio: _react.PropTypes.oneOf(['wide', 'square']),
  children: _react.PropTypes.any,
  className: _react.PropTypes.string,
  color: _react.PropTypes.string,
  contentOverlay: _react.PropTypes.bool,
  image: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  theme: _react.PropTypes.shape({
    cardMedia: _react.PropTypes.string,
    content: _react.PropTypes.string,
    contentOverlay: _react.PropTypes.string,
    square: _react.PropTypes.string,
    wide: _react.PropTypes.string
  })
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.CARD)(CardMedia);
exports.CardMedia = CardMedia;