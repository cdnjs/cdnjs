"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabbar = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _excluded = ["children", "shadow", "mode", "className"];
var getItemsLayoutClassName = function getItemsLayoutClassName(itemsLayout, children) {
  switch (itemsLayout) {
    case 'horizontal':
      return "vkuiTabbar--layout-horizontal";
    case 'vertical':
      return "vkuiTabbar--layout-vertical";
    default:
      return React.Children.count(children) > 2 ? getItemsLayoutClassName('vertical', []) : getItemsLayoutClassName('horizontal', []);
  }
};

/**
 * @see https://vkcom.github.io/VKUI/#/Tabbar
 */
var Tabbar = function Tabbar(_ref) {
  var children = _ref.children,
    _ref$shadow = _ref.shadow,
    shadow = _ref$shadow === void 0 ? true : _ref$shadow,
    mode = _ref.mode,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiTabbar", platform === _platform.Platform.IOS && "vkuiTabbar--ios", getItemsLayoutClassName(mode, children), shadow && "vkuiTabbar--shadow", className)
  }, restProps), /*#__PURE__*/React.createElement("div", {
    className: "vkuiTabbar__in"
  }, children));
};
exports.Tabbar = Tabbar;
//# sourceMappingURL=Tabbar.js.map