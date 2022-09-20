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

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _platform = require("../../lib/platform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _warnOnce = require("../../lib/warnOnce");

var _excluded = ["children", "mode", "getRootRef", "sizeX"];
var warn = (0, _warnOnce.warnOnce)("Tabs");
var TabsModeContext = /*#__PURE__*/React.createContext({
  mode: "default",
  withGaps: false
});
exports.TabsModeContext = TabsModeContext;

var TabsComponent = function TabsComponent(_ref) {
  var children = _ref.children,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "default" : _ref$mode,
      getRootRef = _ref.getRootRef,
      sizeX = _ref.sizeX,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  if ((mode === "buttons" || mode === "segmented") && process.env.NODE_ENV === "development") {
    var expectedValueText = mode === "buttons" ? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \"secondary\"" : "компонент SegmentedControl";
    warn("mode=\"".concat(mode, "\" \u0443\u0441\u0442\u0430\u0440\u0435\u043B\u043E \u0438 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u043E \u0432 5.0.0. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 ").concat(expectedValueText));
  }

  if (platform !== _platform.IOS && mode === "segmented") {
    mode = "default";
  }

  if (mode === "buttons") {
    mode = "secondary";
  }

  var withGaps = mode === "accent" || mode === "secondary";
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    vkuiClass: (0, _classNames.classNames)("Tabs", (platform === _platform.IOS || platform === _platform.VKCOM) && "Tabs--".concat(platform), "Tabs--".concat(mode), withGaps && "Tabs--withGaps", // TODO v5.0.0 новая адаптивность
    "Tabs--sizeX-".concat(sizeX))
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Tabs__in"
  }, (0, _jsxRuntime.createScopedElement)(TabsModeContext.Provider, {
    value: {
      mode: mode,
      withGaps: withGaps
    }
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