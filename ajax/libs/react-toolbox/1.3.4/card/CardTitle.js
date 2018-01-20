'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardTitleFactory = exports.CardTitle = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Avatar = require('../avatar/Avatar.js');

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var factory = function factory(Avatar) {
  var CardTitle = function CardTitle(_ref) {
    var _classnames;

    var avatar = _ref.avatar,
        children = _ref.children,
        className = _ref.className,
        subtitle = _ref.subtitle,
        theme = _ref.theme,
        title = _ref.title,
        other = _objectWithoutProperties(_ref, ['avatar', 'children', 'className', 'subtitle', 'theme', 'title']);

    var classes = (0, _classnames3.default)(theme.cardTitle, (_classnames = {}, _defineProperty(_classnames, theme.small, avatar), _defineProperty(_classnames, theme.large, !avatar), _classnames), className);

    return _react2.default.createElement(
      'div',
      _extends({ className: classes }, other),
      typeof avatar === 'string' ? _react2.default.createElement(Avatar, { image: avatar, theme: theme }) : avatar,
      _react2.default.createElement(
        'div',
        null,
        title && _react2.default.createElement(
          'h5',
          { className: theme.title },
          title
        ),
        children && typeof children === 'string' && _react2.default.createElement(
          'h5',
          { className: theme.title },
          children
        ),
        subtitle && _react2.default.createElement(
          'p',
          { className: theme.subtitle },
          subtitle
        ),
        children && typeof children !== 'string' && children
      )
    );
  };

  CardTitle.propTypes = {
    avatar: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    children: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.array]),
    className: _react.PropTypes.string,
    subtitle: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    theme: _react.PropTypes.shape({
      large: _react.PropTypes.string,
      title: _react.PropTypes.string,
      small: _react.PropTypes.string,
      subtitle: _react.PropTypes.string
    }),
    title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element])
  };

  return CardTitle;
};

var CardTitle = factory(_Avatar2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.CARD)(CardTitle);
exports.CardTitle = CardTitle;
exports.cardTitleFactory = factory;