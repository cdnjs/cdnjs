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
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _Counter = require("../Counter/Counter");
var _Tappable = require("../Tappable/Tappable");
var _WriteBarIconRenderer = require("./WriteBarIconRenderer");
var _excluded = ["mode", "children", "count", "className"];
var warn = (0, _warnOnce.warnOnce)('WriteBarIcon');

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
  var modeLabel = undefined;
  var predefinedIcons;
  switch (mode) {
    case 'attach':
      predefinedIcons = {
        IconCompact: platform === _platform.Platform.IOS ? _icons.Icon28AddCircleOutline : _icons.Icon24Attach,
        IconRegular: platform === _platform.Platform.IOS ? _icons.Icon28AddCircleOutline : _icons.Icon28AttachOutline
      };
      modeLabel = 'Прикрепить файл';
      break;
    case 'send':
      predefinedIcons = {
        IconCompact: platform === _platform.Platform.IOS ? _icons.Icon48WritebarSend : _icons.Icon24Send,
        IconRegular: platform === _platform.Platform.IOS ? _icons.Icon48WritebarSend : _icons.Icon28Send
      };
      modeLabel = 'Отправить';
      break;
    case 'done':
      predefinedIcons = {
        IconCompact: platform === _platform.Platform.IOS ? _icons.Icon48WritebarDone : _icons.Icon24CheckCircleOutline,
        IconRegular: platform === _platform.Platform.IOS ? _icons.Icon48WritebarDone : _icons.Icon28CheckCircleOutline
      };
      modeLabel = 'Готово';
      break;
    default:
      break;
  }
  if (process.env.NODE_ENV === 'development') {
    var isAccessible = !modeLabel && (!restProps['aria-label'] || restProps['aria-labelledby']);
    if (!isAccessible) {
      warn(_warnOnce.COMMON_WARNINGS.a11y['button-name'], 'error');
    }
  }
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({
    "aria-label": modeLabel
  }, restProps, {
    Component: "button",
    hasHover: false,
    activeMode: "vkuiWriteBarIcon__active",
    className: (0, _vkjs.classNames)("vkuiWriteBarIcon", platform === _platform.Platform.IOS && "vkuiWriteBarIcon--ios", mode && styles["WriteBarIcon--mode-".concat(mode)], className)
  }), /*#__PURE__*/React.createElement("span", {
    className: "vkuiWriteBarIcon__in"
  }, predefinedIcons ? /*#__PURE__*/React.createElement(_WriteBarIconRenderer.WriteBarIconRenderer, predefinedIcons) : children), (0, _vkjs.hasReactNode)(count) && /*#__PURE__*/React.createElement(_Counter.Counter, {
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