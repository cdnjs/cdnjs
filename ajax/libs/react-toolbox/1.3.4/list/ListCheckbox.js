'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCheckbox = exports.listCheckboxFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Checkbox = require('../checkbox/Checkbox.js');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _ListItemContent = require('./ListItemContent.js');

var _ListItemContent2 = _interopRequireDefault(_ListItemContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var factory = function factory(Checkbox, ListItemContent) {
  var ListCheckbox = function ListCheckbox(_ref) {
    var caption = _ref.caption,
        checked = _ref.checked,
        className = _ref.className,
        disabled = _ref.disabled,
        legend = _ref.legend,
        name = _ref.name,
        onBlur = _ref.onBlur,
        onChange = _ref.onChange,
        onFocus = _ref.onFocus,
        theme = _ref.theme;

    var _className = (0, _classnames3.default)(theme.item, theme.checkboxItem, _defineProperty({}, theme.disabled, disabled), className);

    return _react2.default.createElement(
      'li',
      { className: _className },
      _react2.default.createElement(Checkbox, {
        checked: checked,
        className: theme.checkbox,
        disabled: disabled,
        label: _react2.default.createElement(ListItemContent, { caption: caption, legend: legend }),
        name: name,
        onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus
      })
    );
  };

  ListCheckbox.propTypes = {
    caption: _react.PropTypes.string,
    checked: _react.PropTypes.bool,
    className: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    legend: _react.PropTypes.string,
    name: _react.PropTypes.string,
    onBlur: _react.PropTypes.func,
    onChange: _react.PropTypes.func,
    onFocus: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      checkbox: _react.PropTypes.string,
      checkboxItem: _react.PropTypes.string,
      disabled: _react.PropTypes.string,
      item: _react.PropTypes.string
    })
  };

  ListCheckbox.defaultProps = {
    checked: false,
    disabled: false
  };

  return ListCheckbox;
};

var ListCheckbox = factory(_Checkbox2.default, _ListItemContent2.default);

exports.default = (0, _reactCssThemr.themr)(_identifiers.LIST)(ListCheckbox);
exports.listCheckboxFactory = factory;
exports.ListCheckbox = ListCheckbox;