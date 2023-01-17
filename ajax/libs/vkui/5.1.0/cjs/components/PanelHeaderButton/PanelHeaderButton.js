"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeaderButton = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _Tappable = require("../Tappable/Tappable");
var _getPlatformClassName = require("../../helpers/getPlatformClassName");
var _vkjs = require("@vkontakte/vkjs");
var _warnOnce = require("../../lib/warnOnce");
var _usePlatform = require("../../hooks/usePlatform");
var _utils = require("../../lib/utils");
var _platform = require("../../lib/platform");
var _Text = require("../Typography/Text/Text");
var _Title = require("../Typography/Title/Title");
var _excluded = ["children", "primary", "label", "className"];
var ButtonTypography = function ButtonTypography(_ref) {
  var primary = _ref.primary,
    children = _ref.children;
  var platform = (0, _usePlatform.usePlatform)();
  if (platform === _platform.Platform.IOS) {
    return /*#__PURE__*/React.createElement(_Title.Title, {
      Component: "span",
      level: "3",
      weight: primary ? '1' : '3'
    }, children);
  }
  return /*#__PURE__*/React.createElement(_Text.Text, {
    weight: platform === _platform.Platform.VKCOM ? undefined : '2'
  }, children);
};
var warn = (0, _warnOnce.warnOnce)('PanelHeaderButton');

/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */
var PanelHeaderButton = function PanelHeaderButton(_ref2) {
  var children = _ref2.children,
    _ref2$primary = _ref2.primary,
    primary = _ref2$primary === void 0 ? false : _ref2$primary,
    label = _ref2.label,
    className = _ref2.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
  var isPrimitive = (0, _vkjs.isPrimitiveReactNode)(children);
  var isPrimitiveLabel = (0, _vkjs.isPrimitiveReactNode)(label);
  var platform = (0, _usePlatform.usePlatform)();
  var hoverMode;
  var activeMode;
  switch (platform) {
    case _platform.Platform.IOS:
      hoverMode = 'background';
      activeMode = 'opacity';
      break;
    case _platform.Platform.VKCOM:
      hoverMode = "vkuiPanelHeaderButton--hover";
      activeMode = "vkuiPanelHeaderButton--active";
      break;
    default:
      hoverMode = 'background';
      activeMode = 'background';
  }
  if (process.env.NODE_ENV === 'development') {
    var hasAccessibleName = Boolean((0, _utils.getTitleFromChildren)(children) || (0, _utils.getTitleFromChildren)(label) || restProps['aria-label'] || restProps['aria-labelledby']);
    if (!hasAccessibleName) {
      warn('a11y: У кнопки нет названия, которое может прочитать скринридер, и она недоступна для части пользователей. Замените содержимое на текст или добавьте описание действия с помощью пропа aria-label.', 'error');
    }
  }
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    hoverMode: hoverMode,
    Component: restProps.href ? 'a' : 'button',
    activeEffectDelay: 200,
    activeMode: activeMode,
    className: (0, _vkjs.classNames)("vkuiPanelHeaderButton", (0, _getPlatformClassName.getPlatformClassName)("vkuiPanelHeaderButton", platform), isPrimitive && "vkuiPanelHeaderButton--primitive", !isPrimitive && !isPrimitiveLabel && "vkuiPanelHeaderButton--notPrimitive", className)
  }), isPrimitive ? /*#__PURE__*/React.createElement(ButtonTypography, {
    primary: primary
  }, children) : children, isPrimitiveLabel ? /*#__PURE__*/React.createElement(ButtonTypography, {
    primary: primary,
    className: "vkuiPanelHeaderButton__label"
  }, label) : label);
};
exports.PanelHeaderButton = PanelHeaderButton;
//# sourceMappingURL=PanelHeaderButton.js.map