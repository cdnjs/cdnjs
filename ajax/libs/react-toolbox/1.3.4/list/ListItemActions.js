'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItemActions = exports.listItemActionsFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _ListItemAction = require('./ListItemAction.js');

var _ListItemAction2 = _interopRequireDefault(_ListItemAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var factory = function factory(ListItemAction) {
  var ListItemActions = function ListItemActions(_ref) {
    var type = _ref.type,
        children = _ref.children,
        theme = _ref.theme;

    var validChildren = _react2.default.Children.toArray(children).filter(function (c) {
      return _react2.default.isValidElement(c);
    });

    return _react2.default.createElement(
      'span',
      { className: theme[type] },
      validChildren.map(function (action, i) {
        return _react2.default.createElement(ListItemAction, { key: i, theme: theme, action: action });
      })
    );
  };

  ListItemActions.propTypes = {
    children: _react.PropTypes.any,
    theme: _react.PropTypes.shape({
      left: _react.PropTypes.string,
      right: _react.PropTypes.string
    }),
    type: _react.PropTypes.oneOf(['left', 'right'])
  };

  return ListItemActions;
};

var ListItemActions = factory(_ListItemAction2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.LIST)(ListItemActions);
exports.listItemActionsFactory = factory;
exports.ListItemActions = ListItemActions;