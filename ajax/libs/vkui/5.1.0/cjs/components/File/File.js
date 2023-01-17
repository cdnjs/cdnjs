"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.File = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _getPlatformClassName = require("../../helpers/getPlatformClassName");
var _Button = require("../Button/Button");
var _usePlatform = require("../../hooks/usePlatform");
var _VisuallyHiddenInput = require("../VisuallyHiddenInput/VisuallyHiddenInput");
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["children", "align", "size", "mode", "stretched", "before", "after", "loading", "className", "style", "getRef", "getRootRef", "appearance"];
/**
 * @see https://vkcom.github.io/VKUI/#/File
 */
var File = function File(_ref) {
  var _ref$children = _ref.children,
    children = _ref$children === void 0 ? 'Выберите файл' : _ref$children,
    _ref$align = _ref.align,
    align = _ref$align === void 0 ? 'left' : _ref$align,
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
  return /*#__PURE__*/React.createElement(_Button.Button, {
    Component: "label",
    align: align,
    className: (0, _vkjs.classNames)("vkuiFile", (0, _getPlatformClassName.getPlatformClassName)("vkuiFile", platform), className),
    stretched: stretched,
    mode: mode,
    appearance: appearance,
    size: size,
    before: before,
    after: after,
    loading: loading,
    style: style,
    getRootRef: getRootRef,
    disabled: restProps.disabled
  }, /*#__PURE__*/React.createElement(_VisuallyHiddenInput.VisuallyHiddenInput, (0, _extends2.default)({}, restProps, {
    className: "vkuiFile__input",
    type: "file",
    getRef: getRef
  })), children);
};
exports.File = File;
//# sourceMappingURL=File.js.map