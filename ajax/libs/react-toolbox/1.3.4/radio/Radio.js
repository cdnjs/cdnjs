'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var factory = function factory(ripple) {
  var Radio = function Radio(_ref) {
    var checked = _ref.checked,
        onMouseDown = _ref.onMouseDown,
        theme = _ref.theme,
        other = _objectWithoutProperties(_ref, ['checked', 'onMouseDown', 'theme']);

    return _react2.default.createElement('div', _extends({
      'data-react-toolbox': 'radio',
      className: theme[checked ? 'radioChecked' : 'radio'],
      onMouseDown: onMouseDown
    }, other));
  };

  Radio.propTypes = {
    checked: _react.PropTypes.bool,
    children: _react.PropTypes.any,
    onMouseDown: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      radio: _react.PropTypes.string,
      radioChecked: _react.PropTypes.string,
      ripple: _react.PropTypes.string
    })
  };

  return ripple(Radio);
};

exports.default = factory;