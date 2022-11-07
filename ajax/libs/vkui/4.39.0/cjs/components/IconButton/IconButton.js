"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconButton = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _Tappable = require("../Tappable/Tappable");
var _classNames = require("../../lib/classNames");
var _usePlatform = require("../../hooks/usePlatform");
var _withAdaptivity = require("../../hoc/withAdaptivity");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _excluded = ["icon", "sizeY", "children", "Component"];
var warn = (0, _warnOnce.warnOnce)("IconButton");
var IconButtonComponent = function IconButtonComponent(_ref) {
  var icon = _ref.icon,
    sizeY = _ref.sizeY,
    children = _ref.children,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? "button" : _ref$Component,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  if (icon && process.env.NODE_ENV === "development") {
    warn("Свойство icon устарело и будет удалено в 5.0.0. Используйте children");
  }
  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({
    activeEffectDelay: 200,
    activeMode: "background"
  }, restProps, {
    Component: restProps.href ? "a" : Component,
    vkuiClass: (0, _classNames.classNames)("IconButton", "IconButton--sizeY-".concat(sizeY), platform === _platform.IOS && "IconButton--ios")
  }), icon || children);
};

/**
 * @see https://vkcom.github.io/VKUI/#/IconButton
 */
var IconButton = (0, _withAdaptivity.withAdaptivity)(IconButtonComponent, {
  sizeY: true
});
exports.IconButton = IconButton;
IconButton.displayName = "IconButton";
//# sourceMappingURL=IconButton.js.map