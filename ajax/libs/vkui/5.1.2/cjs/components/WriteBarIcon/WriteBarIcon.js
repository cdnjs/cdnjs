"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WriteBarIcon = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _usePlatform = require("../../hooks/usePlatform");
var _vkjs = require("@vkontakte/vkjs");
var _platform = require("../../lib/platform");
var _Counter = require("../Counter/Counter");
var _Tappable = require("../Tappable/Tappable");
var _warnOnce = require("../../lib/warnOnce");
var _excluded = ["mode", "children", "count", "className"];
var warn = (0, _warnOnce.warnOnce)('WriteBarIcon');
var IS_DEV = process.env.NODE_ENV === 'development';

/**
 * @see https://vkcom.github.io/VKUI/#/WriteBarIcon
 */
var WriteBarIcon = function WriteBarIcon(_ref) {
  var mode = _ref.mode,
    children = _ref.children,
    count = _ref.count,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var icon;
  var ariaLabel = undefined;
  switch (mode) {
    case 'attach':
      icon = platform === _platform.Platform.IOS ? /*#__PURE__*/React.createElement(_icons.Icon28AddCircleOutline, null) : /*#__PURE__*/React.createElement(_icons.Icon28AttachOutline, null);
      ariaLabel = 'Прикрепить файл';
      break;
    case 'send':
      icon = platform === _platform.Platform.IOS ? /*#__PURE__*/React.createElement(_icons.Icon48WritebarSend, null) : /*#__PURE__*/React.createElement(_icons.Icon24Send, null);
      ariaLabel = 'Отправить';
      break;
    case 'done':
      icon = platform === _platform.Platform.IOS ? /*#__PURE__*/React.createElement(_icons.Icon48WritebarDone, null) : /*#__PURE__*/React.createElement(_icons.Icon28CheckCircleOutline, null);
      ariaLabel = 'Готово';
      break;
    default:
      break;
  }
  if (IS_DEV && !restProps['aria-label'] && !ariaLabel) {
    warn('a11y: У WriteBarIcon нет aria-label. Кнопка будет недоступной для части пользователей.', 'error');
  }
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({
    "aria-label": ariaLabel
  }, restProps, {
    Component: "button",
    hasHover: false,
    activeMode: "vkuiWriteBarIcon__active",
    className: (0, _vkjs.classNames)("vkuiWriteBarIcon", platform === _platform.Platform.IOS && "vkuiWriteBarIcon--ios", mode && styles["WriteBarIcon--mode-".concat(mode)], className)
  }), /*#__PURE__*/React.createElement("span", {
    className: "vkuiWriteBarIcon__in"
  }, icon || children), (0, _vkjs.hasReactNode)(count) && /*#__PURE__*/React.createElement(_Counter.Counter, {
    className: "vkuiWriteBarIcon__counter",
    size: "s"
  }, count));
};
exports.WriteBarIcon = WriteBarIcon;
var styles = {
  "WriteBarIcon--mode-send": "vkuiWriteBarIcon--mode-send",
  "WriteBarIcon--mode-done": "vkuiWriteBarIcon--mode-done",
  "WriteBarIcon--mode-attach": "vkuiWriteBarIcon--mode-attach"
};
//# sourceMappingURL=WriteBarIcon.js.map