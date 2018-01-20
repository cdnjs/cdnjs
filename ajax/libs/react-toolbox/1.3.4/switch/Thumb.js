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
  var Thumb = function Thumb(_ref) {
    var onMouseDown = _ref.onMouseDown,
        theme = _ref.theme,
        other = _objectWithoutProperties(_ref, ['onMouseDown', 'theme']);

    return _react2.default.createElement('span', _extends({ role: 'thumb', className: theme.thumb, onMouseDown: onMouseDown }, other));
  };

  Thumb.propTypes = {
    children: _react.PropTypes.any,
    theme: _react.PropTypes.shape({
      ripple: _react.PropTypes.string,
      thumb: _react.PropTypes.string
    })
  };

  return ripple(Thumb);
};

exports.default = factory;