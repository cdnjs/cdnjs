"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.File = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _getClassName = require("../../helpers/getClassName");
var _Button = require("../Button/Button");
var _usePlatform = require("../../hooks/usePlatform");
var _VisuallyHiddenInput = require("../VisuallyHiddenInput/VisuallyHiddenInput");
var _excluded = ["children", "align", "controlSize", "size", "mode", "stretched", "before", "after", "loading", "className", "style", "getRef", "getRootRef", "appearance"];
/**
 * @see https://vkcom.github.io/VKUI/#/File
 */
var File = function File(_ref) {
  var _ref$children = _ref.children,
    children = _ref$children === void 0 ? "Выберите файл" : _ref$children,
    _ref$align = _ref.align,
    align = _ref$align === void 0 ? "left" : _ref$align,
    controlSize = _ref.controlSize,
    size = _ref.size,
    mode = _ref.mode,
    stretched = _ref.stretched,
    before = _ref.before,
    after = _ref.after,
    loading = _ref.loading,
    className = _ref.className,
    style = _ref.style,
    getRef = _ref.getRef,
    getRootRef = _ref.getRootRef,
    appearance = _ref.appearance,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_Button.Button, {
    Component: "label",
    align: align,
    vkuiClass: (0, _getClassName.getClassName)("File", platform),
    className: className,
    stretched: stretched,
    mode: mode,
    appearance: appearance
    // TODO: v5.0.0 удалить controlSize
    ,
    size: size !== null && size !== void 0 ? size : controlSize,
    before: before,
    after: after,
    loading: loading,
    style: style,
    getRootRef: getRootRef,
    disabled: restProps.disabled
  }, (0, _jsxRuntime.createScopedElement)(_VisuallyHiddenInput.VisuallyHiddenInput, (0, _extends2.default)({}, restProps, {
    vkuiClass: "File__input",
    type: "file",
    getRef: getRef
  })), children);
};
exports.File = File;
//# sourceMappingURL=File.js.map