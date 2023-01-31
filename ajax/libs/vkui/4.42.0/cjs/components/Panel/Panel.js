"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classNames = require("../../lib/classNames");
var _Touch = require("../Touch/Touch");
var _TooltipContainer = require("../Tooltip/TooltipContainer");
var _withAdaptivity = require("../../hoc/withAdaptivity");
var _platform = require("../../lib/platform");
var _usePlatform = require("../../hooks/usePlatform");
var _excluded = ["centered", "children", "getRootRef", "sizeX", "nav"];
/**
 * @see https://vkcom.github.io/VKUI/#/Panel
 */
var Panel = (0, _withAdaptivity.withAdaptivity)(function (_ref) {
  var _ref$centered = _ref.centered,
    centered = _ref$centered === void 0 ? false : _ref$centered,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    sizeX = _ref.sizeX,
    nav = _ref.nav,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    vkuiClass: (0, _classNames.classNames)("Panel", platform === _platform.IOS && "Panel--ios", platform === _platform.VKCOM && "Panel--vkcom", // TODO v5.0.0 поправить под новую адаптивность
    "Panel--sizeX-".concat(sizeX), centered && "Panel--centered")
  }), (0, _jsxRuntime.createScopedElement)(_Touch.Touch, {
    Component: _TooltipContainer.TooltipContainer,
    vkuiClass: "Panel__in"
  }, platform === _platform.IOS && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Panel__fade"
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Panel__in-before"
  }), centered ? (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Panel__centered"
  }, children) : children, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Panel__in-after"
  })));
}, {
  sizeX: true
});
exports.Panel = Panel;
Panel.displayName = "Panel";
//# sourceMappingURL=Panel.js.map