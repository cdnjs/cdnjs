'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItemLayout = exports.listItemLayoutFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _FontIcon = require('../font_icon/FontIcon.js');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Avatar = require('../avatar/Avatar.js');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _ListItemContent = require('./ListItemContent.js');

var _ListItemContent2 = _interopRequireDefault(_ListItemContent);

var _ListItemActions = require('./ListItemActions.js');

var _ListItemActions2 = _interopRequireDefault(_ListItemActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var factory = function factory(Avatar, ListItemContent, ListItemActions) {
  var ListItemLayout = function ListItemLayout(props) {
    var _classnames;

    var className = (0, _classnames3.default)(props.theme.item, (_classnames = {}, _defineProperty(_classnames, props.theme.disabled, props.disabled), _defineProperty(_classnames, props.theme.selectable, props.selectable), _classnames), props.className);

    var leftActions = [props.leftIcon && _react2.default.createElement(_FontIcon2.default, { value: props.leftIcon, key: 'leftIcon' }), props.avatar && _react2.default.createElement(Avatar, { image: props.avatar, key: 'avatar' })].concat(_toConsumableArray(props.leftActions));
    var rightActions = [props.rightIcon && _react2.default.createElement(_FontIcon2.default, { value: props.rightIcon, key: 'rightIcon' })].concat(_toConsumableArray(props.rightActions));
    var content = props.itemContent || _react2.default.createElement(ListItemContent, { theme: props.theme, caption: props.caption, legend: props.legend });
    var emptyActions = function emptyActions(item) {
      return !item[0] && !item[1] && !item[2];
    };

    return _react2.default.createElement(
      'span',
      { className: className },
      !emptyActions(leftActions) > 0 && _react2.default.createElement(
        ListItemActions,
        { type: 'left', theme: props.theme },
        leftActions
      ),
      content,
      !emptyActions(rightActions) > 0 && _react2.default.createElement(
        ListItemActions,
        { type: 'right', theme: props.theme },
        rightActions
      )
    );
  };

  ListItemLayout.propTypes = {
    avatar: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    caption: _react.PropTypes.string,
    children: _react.PropTypes.any,
    className: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    itemContent: _react.PropTypes.element,
    leftActions: _react.PropTypes.array,
    leftIcon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    legend: _react.PropTypes.string,
    rightActions: _react.PropTypes.array,
    rightIcon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    selectable: _react.PropTypes.bool,
    theme: _react.PropTypes.shape({
      disabled: _react.PropTypes.string,
      item: _react.PropTypes.string,
      selectable: _react.PropTypes.string
    }),
    to: _react.PropTypes.string
  };

  ListItemLayout.defaultProps = {
    disabled: false,
    selectable: false
  };

  return ListItemLayout;
};

var ListItemLayout = factory(_Avatar2.default, _ListItemContent2.default, _ListItemActions2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.LIST)(ListItemLayout);
exports.listItemLayoutFactory = factory;
exports.ListItemLayout = ListItemLayout;