"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisuallyHiddenInput = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["getRef", "className"];
/**
 * @description
 * Обертка над обычным `<input/>`; дает
 * скрыть его визуально и оставить
 * доступным для ассистивных технологий.
 */
var VisuallyHiddenInput = function VisuallyHiddenInput(_ref) {
  var getRef = _ref.getRef,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement("input", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiVisuallyHiddenInput", className),
    ref: getRef
  }));
};
exports.VisuallyHiddenInput = VisuallyHiddenInput;
//# sourceMappingURL=VisuallyHiddenInput.js.map