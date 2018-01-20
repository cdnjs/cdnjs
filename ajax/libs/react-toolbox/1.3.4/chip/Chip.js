'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chip = exports.chipFactory = undefined;

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
  var Chip = function Chip(_ref) {
    var _classnames;

    var children = _ref.children,
        className = _ref.className,
        deletable = _ref.deletable,
        onDeleteClick = _ref.onDeleteClick,
        theme = _ref.theme,
        other = _objectWithoutProperties(_ref, ['children', 'className', 'deletable', 'onDeleteClick', 'theme']);

    var hasAvatar = false;
    if (_react2.default.Children.count(children)) {
      var flatChildren = _react2.default.Children.toArray(children);
      var firstChild = flatChildren[0];
      hasAvatar = firstChild && firstChild.type && firstChild.type === Avatar;
    }

    var classes = (0, _classnames3.default)(theme.chip, (_classnames = {}, _defineProperty(_classnames, theme.deletable, !!deletable), _defineProperty(_classnames, theme.avatar, !!hasAvatar), _classnames), className);

    return _react2.default.createElement(
      'div',
      _extends({ 'data-react-toolbox': 'chip', className: classes }, other),
      typeof children === 'string' ? _react2.default.createElement(
        'span',
        null,
        children
      ) : children,
      deletable ? _react2.default.createElement(
        'span',
        { className: theme.delete, onClick: onDeleteClick },
        _react2.default.createElement(
          'svg',
          { viewBox: '0 0 40 40', className: theme.deleteIcon },
          _react2.default.createElement('path', { className: theme.deleteX, d: 'M 12,12 L 28,28 M 28,12 L 12,28' })
        )
      ) : null
    );
  };

  Chip.propTypes = {
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    deletable: _react.PropTypes.bool,
    onDeleteClick: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      avatar: _react.PropTypes.string,
      chip: _react.PropTypes.string,
      deletable: _react.PropTypes.string,
      delete: _react.PropTypes.string,
      deleteIcon: _react.PropTypes.string,
      deleteX: _react.PropTypes.string
    })
  };

  Chip.defaultProps = {
    className: '',
    deletable: false
  };

  return Chip;
};

var Chip = factory(_Avatar2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.CHIP)(Chip);
exports.chipFactory = factory;
exports.Chip = Chip;