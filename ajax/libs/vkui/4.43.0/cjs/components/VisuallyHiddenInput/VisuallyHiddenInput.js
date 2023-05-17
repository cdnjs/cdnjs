"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisuallyHiddenInput = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _excluded = ["getRef"];
/**
 * @description
 * Обертка над обычным `<input/>`; дает
 * скрыть его визуально и оставить
 * доступным для ассистивных технологий.
 */
var VisuallyHiddenInput = function VisuallyHiddenInput(_ref) {
  var getRef = _ref.getRef,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)("input", (0, _extends2.default)({}, restProps, {
    vkuiClass: "VisuallyHiddenInput",
    ref: getRef
  }));
};
exports.VisuallyHiddenInput = VisuallyHiddenInput;
//# sourceMappingURL=VisuallyHiddenInput.js.map