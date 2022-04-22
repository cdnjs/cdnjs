"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputLike = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _jsxRuntime = require("../../lib/jsxRuntime");

var React = _interopRequireWildcard(require("react"));

var _callMultiple = require("../../lib/callMultiple");

var _utils = require("../../lib/utils");

var _classNames = require("../../lib/classNames");

var _excluded = ["value", "length", "index", "onElementSelect", "onClick", "onFocus", "getRootRef"];
var MASK_SYMBOL = String.fromCharCode(0x2007);

function getMaskElements(length) {
  var result = [];

  for (var _index = 0; _index < length; _index += 1) {
    result.push((0, _jsxRuntime.createScopedElement)("span", {
      key: _index,
      vkuiClass: "InputLike__mask"
    }, MASK_SYMBOL));
  }

  return result;
}

var InputLike = function InputLike(_ref) {
  var _value$length;

  var value = _ref.value,
      length = _ref.length,
      index = _ref.index,
      onElementSelect = _ref.onElementSelect,
      onClick = _ref.onClick,
      onFocus = _ref.onFocus,
      getRootRef = _ref.getRootRef,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var handleElementSelect = React.useCallback(function (event) {
    (0, _utils.stopPropagation)(event);
    onElementSelect === null || onElementSelect === void 0 ? void 0 : onElementSelect(index);
  }, [index, onElementSelect]);
  return (0, _jsxRuntime.createScopedElement)("span", (0, _extends2.default)({
    vkuiClass: (0, _classNames.classNames)("InputLike", (value === null || value === void 0 ? void 0 : value.length) === length && "InputLike--full"),
    tabIndex: 0,
    ref: getRootRef,
    onClick: (0, _callMultiple.callMultiple)(onClick, handleElementSelect),
    onFocus: (0, _callMultiple.callMultiple)(_utils.stopPropagation, onFocus)
  }, props), value === null || value === void 0 ? void 0 : value.slice(0, length - 1), (value === null || value === void 0 ? void 0 : value.slice(length - 1)) && (0, _jsxRuntime.createScopedElement)("span", {
    key: index,
    vkuiClass: "InputLike__last_character"
  }, value.slice(length - 1)), getMaskElements(length - ((_value$length = value === null || value === void 0 ? void 0 : value.length) !== null && _value$length !== void 0 ? _value$length : 0)));
};

exports.InputLike = InputLike;
InputLike.displayName = "InputLike";
//# sourceMappingURL=InputLike.js.map