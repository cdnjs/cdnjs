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

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _getSizeXClassName = require("../../helpers/getSizeXClassName");

var _excluded = ["children", "mode", "getRootRef"];
var TabsModeContext = /*#__PURE__*/React.createContext({
  mode: "default",
  withGaps: false
});
/**
 * @see https://vkcom.github.io/VKUI/#/Tabs
 */

exports.TabsModeContext = TabsModeContext;

var Tabs = function Tabs(_ref) {
  var children = _ref.children,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "default" : _ref$mode,
      getRootRef = _ref.getRootRef,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeX = _useAdaptivity.sizeX;

  var withGaps = mode === "accent" || mode === "secondary";
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    vkuiClass: (0, _classNames.classNames)("Tabs", (platform === _platform.Platform.IOS || platform === _platform.Platform.VKCOM) && "Tabs--".concat(platform), (0, _getSizeXClassName.getSizeXClassName)("Tabs", sizeX), withGaps && "Tabs--withGaps", "Tabs--mode-".concat(mode))
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Tabs__in"
  }, (0, _jsxRuntime.createScopedElement)(TabsModeContext.Provider, {
    value: {
      mode: mode,
      withGaps: withGaps
    }
  }, children)));
};

exports.Tabs = Tabs;
//# sourceMappingURL=Tabs.js.map