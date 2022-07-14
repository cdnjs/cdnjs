"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsModeContext = exports.Tabs = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _platform = require("../../lib/platform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _excluded = ["children", "mode", "getRootRef", "sizeX"];
var TabsModeContext = /*#__PURE__*/React.createContext("default");
exports.TabsModeContext = TabsModeContext;

var TabsComponent = function TabsComponent(_ref) {
  var children = _ref.children,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "default" : _ref$mode,
      getRootRef = _ref.getRootRef,
      sizeX = _ref.sizeX,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  if (platform !== _platform.IOS && mode === "segmented") {
    mode = "default";
  }

  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Tabs", platform), "Tabs--".concat(mode), "Tabs--sizeX-".concat(sizeX))
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Tabs__in"
  }, (0, _jsxRuntime.createScopedElement)(TabsModeContext.Provider, {
    value: mode
  }, children)));
};
/**
 * @see https://vkcom.github.io/VKUI/#/Tabs
 */


var Tabs = (0, _withAdaptivity.withAdaptivity)(TabsComponent, {
  sizeX: true
});
exports.Tabs = Tabs;
Tabs.displayName = "Tabs";
//# sourceMappingURL=Tabs.js.map