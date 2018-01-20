'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Navigation = exports.navigationFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Button = require('../button/Button.js');

var _Button2 = _interopRequireDefault(_Button);

var _Link = require('../link/Link.js');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var factory = function factory(Button, Link) {
  var Navigation = function Navigation(_ref) {
    var actions = _ref.actions,
        children = _ref.children,
        className = _ref.className,
        routes = _ref.routes,
        theme = _ref.theme,
        type = _ref.type;

    var _className = (0, _classnames2.default)(theme[type], className);
    var buttons = actions.map(function (action, index) {
      return _react2.default.createElement(Button, _extends({ className: theme.button, key: index }, action));
    });

    var links = routes.map(function (route, index) {
      return _react2.default.createElement(Link, _extends({ className: theme.link, key: index }, route));
    });

    return _react2.default.createElement(
      'nav',
      { 'data-react-toolbox': 'navigation', className: _className },
      links,
      buttons,
      children
    );
  };

  Navigation.propTypes = {
    actions: _react.PropTypes.array,
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    routes: _react.PropTypes.array,
    theme: _react.PropTypes.shape({
      button: _react.PropTypes.string,
      horizontal: _react.PropTypes.string,
      link: _react.PropTypes.string,
      vertical: _react.PropTypes.string
    }),
    type: _react.PropTypes.oneOf(['vertical', 'horizontal'])
  };

  Navigation.defaultProps = {
    actions: [],
    className: '',
    type: 'horizontal',
    routes: []
  };

  return Navigation;
};

var Navigation = factory(_Button2.default, _Link2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.NAVIGATION)(Navigation);
exports.navigationFactory = factory;
exports.Navigation = Navigation;