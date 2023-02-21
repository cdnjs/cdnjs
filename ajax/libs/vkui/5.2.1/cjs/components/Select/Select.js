"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityHasPointer = require("../../hooks/useAdaptivityHasPointer");
var _CustomSelect = require("../CustomSelect/CustomSelect");
var _NativeSelect = require("../NativeSelect/NativeSelect");
var _excluded = ["children", "options", "popupDirection", "renderOption", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Select
 */
var Select = function Select(_ref) {
  var children = _ref.children,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? [] : _ref$options,
    popupDirection = _ref.popupDirection,
    renderOption = _ref.renderOption,
    className = _ref.className,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
  return /*#__PURE__*/React.createElement(React.Fragment, null, (hasPointer === undefined || hasPointer) && /*#__PURE__*/React.createElement(_CustomSelect.CustomSelect, (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiSelect__custom", className),
    options: options,
    popupDirection: popupDirection,
    renderOption: renderOption
  }, props)), (hasPointer === undefined || !hasPointer) && /*#__PURE__*/React.createElement(_NativeSelect.NativeSelect, (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiSelect__native", className)
  }, props), options.map(function (_ref2) {
    var label = _ref2.label,
      value = _ref2.value;
    return /*#__PURE__*/React.createElement("option", {
      value: value,
      key: "".concat(value)
    }, label);
  })));
};
exports.Select = Select;
//# sourceMappingURL=Select.js.map