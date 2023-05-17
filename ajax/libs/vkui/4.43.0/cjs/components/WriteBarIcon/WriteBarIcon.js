"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WriteBarIcon = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _icons = require("@vkontakte/icons");
var _usePlatform = require("../../hooks/usePlatform");
var _classNames = require("../../lib/classNames");
var _platform = require("../../lib/platform");
var _Counter = require("../Counter/Counter");
var _Tappable = require("../Tappable/Tappable");
var _warnOnce = require("../../lib/warnOnce");
var _utils = require("../../lib/utils");
var _excluded = ["mode", "children", "count"];
var warn = (0, _warnOnce.warnOnce)("WriteBarIcon");
var IS_DEV = process.env.NODE_ENV === "development";

/**
 * @see https://vkcom.github.io/VKUI/#/WriteBarIcon
 */
var WriteBarIcon = function WriteBarIcon(_ref) {
  var mode = _ref.mode,
    children = _ref.children,
    count = _ref.count,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var icon;
  var ariaLabel = undefined;
  switch (mode) {
    case "attach":
      icon = platform === _platform.IOS ? (0, _jsxRuntime.createScopedElement)(_icons.Icon28AddCircleOutline, {
        "aria-hidden": true
      }) : (0, _jsxRuntime.createScopedElement)(_icons.Icon28AttachOutline, {
        "aria-hidden": true
      });
      ariaLabel = "Прикрепить файл";
      break;
    case "send":
      icon = platform === _platform.IOS ? (0, _jsxRuntime.createScopedElement)(_icons.Icon48WritebarSend, {
        "aria-hidden": true
      }) : (0, _jsxRuntime.createScopedElement)(_icons.Icon24Send, {
        "aria-hidden": true
      });
      ariaLabel = "Отправить";
      break;
    case "done":
      icon = platform === _platform.IOS ? (0, _jsxRuntime.createScopedElement)(_icons.Icon48WritebarDone, {
        "aria-hidden": true
      }) : (0, _jsxRuntime.createScopedElement)(_icons.Icon28CheckCircleOutline, {
        "aria-hidden": true
      });
      ariaLabel = "Готово";
      break;
    default:
      break;
  }
  if (IS_DEV && !restProps["aria-label"] && !ariaLabel) {
    warn("a11y: У WriteBarIcon нет aria-label. Кнопка будет недоступной для части пользователей.", "error");
  }
  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({
    "aria-label": ariaLabel
  }, restProps, {
    Component: "button",
    hasHover: false,
    activeMode: "WriteBarIcon__active",
    vkuiClass: (0, _classNames.classNames)("WriteBarIcon", platform === _platform.Platform.IOS && "WriteBarIcon--ios", !!mode && "WriteBarIcon--".concat(mode))
  }), (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "WriteBarIcon__in"
  }, icon || children, (0, _utils.hasReactNode)(count) && (0, _jsxRuntime.createScopedElement)(_Counter.Counter, {
    vkuiClass: "WriteBarIcon__counter",
    size: "s"
  }, count)));
};
exports.WriteBarIcon = WriteBarIcon;
//# sourceMappingURL=WriteBarIcon.js.map