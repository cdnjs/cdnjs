"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Divider;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Divider(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: "react-date-picker__inputGroup__divider"
  }, children);
}

Divider.propTypes = {
  children: _propTypes["default"].node
};