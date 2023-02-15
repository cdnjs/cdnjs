"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconButton = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _Tappable = require("../Tappable/Tappable");
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _warnOnce = require("../../lib/warnOnce");
var _excluded = ["children", "Component", "className"];
var warn = (0, _warnOnce.warnOnce)('IconButton');

/**
 * @see https://vkcom.github.io/VKUI/#/IconButton
 */
var IconButton = function IconButton(_ref) {
  var children = _ref.children,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'button' : _ref$Component,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  if (process.env.NODE_ENV === 'development') {
    var isAccessible = restProps['aria-label'] || restProps['aria-labelledby'];
    if (!isAccessible) {
      warn(_warnOnce.COMMON_WARNINGS.a11y[restProps.href ? 'link-name' : 'button-name'], 'error');
    }
  }
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({
    activeEffectDelay: 200,
    activeMode: "background"
  }, restProps, {
    Component: restProps.href ? 'a' : Component,
    className: (0, _vkjs.classNames)("vkuiIconButton", (0, _getSizeYClassName.getSizeYClassName)("vkuiIconButton", sizeY), platform === _platform.Platform.IOS && "vkuiIconButton--ios", className)
  }), children);
};
exports.IconButton = IconButton;
//# sourceMappingURL=IconButton.js.map