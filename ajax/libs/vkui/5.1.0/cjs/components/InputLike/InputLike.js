"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputLike = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _callMultiple = require("../../lib/callMultiple");
var _utils = require("../../lib/utils");
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["value", "length", "index", "onElementSelect", "onClick", "onFocus", "getRootRef", "className"];
var MASK_SYMBOL = String.fromCharCode(0x2007);
function getMaskElements(length) {
  var result = [];
  for (var _index = 0; _index < length; _index += 1) {
    result.push( /*#__PURE__*/React.createElement("span", {
      key: _index,
      className: "vkuiInputLike__mask"
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
    className = _ref.className,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var handleElementSelect = React.useCallback(function (event) {
    (0, _utils.stopPropagation)(event);
    onElementSelect === null || onElementSelect === void 0 ? void 0 : onElementSelect(index);
  }, [index, onElementSelect]);
  return /*#__PURE__*/React.createElement("span", (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiInputLike", (value === null || value === void 0 ? void 0 : value.length) === length && "vkuiInputLike--full", className),
    tabIndex: 0,
    ref: getRootRef,
    onClick: (0, _callMultiple.callMultiple)(onClick, handleElementSelect),
    onFocus: (0, _callMultiple.callMultiple)(_utils.stopPropagation, onFocus)
  }, props), value === null || value === void 0 ? void 0 : value.slice(0, length - 1), (value === null || value === void 0 ? void 0 : value.slice(length - 1)) && /*#__PURE__*/React.createElement("span", {
    key: index,
    className: "vkuiInputLike__last_character"
  }, value.slice(length - 1)), getMaskElements(length - ((_value$length = value === null || value === void 0 ? void 0 : value.length) !== null && _value$length !== void 0 ? _value$length : 0)));
};
exports.InputLike = InputLike;
InputLike.displayName = 'InputLike';
//# sourceMappingURL=InputLike.js.map