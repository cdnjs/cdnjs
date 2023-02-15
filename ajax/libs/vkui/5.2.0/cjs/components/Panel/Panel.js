"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _getSizeXClassName = require("../../helpers/getSizeXClassName");
var _vkjs = require("@vkontakte/vkjs");
var _Touch = require("../Touch/Touch");
var _TooltipContainer = require("../Tooltip/TooltipContainer");
var _platform = require("../../lib/platform");
var _usePlatform = require("../../hooks/usePlatform");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _excluded = ["centered", "children", "getRootRef", "nav", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Panel
 */
var Panel = function Panel(_ref) {
  var _ref$centered = _ref.centered,
    centered = _ref$centered === void 0 ? false : _ref$centered,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    nav = _ref.nav,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeX = _useAdaptivity.sizeX;
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    className: (0, _vkjs.classNames)("vkuiPanel", (0, _getSizeXClassName.getSizeXClassName)("vkuiPanel", sizeX), centered && "vkuiPanel--centered", className)
  }), /*#__PURE__*/React.createElement(_Touch.Touch, {
    Component: _TooltipContainer.TooltipContainer,
    className: "vkuiPanel__in"
  }, platform === _platform.Platform.IOS && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanel__fade"
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanel__in-before"
  }), centered ? /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanel__centered"
  }, children) : children, /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanel__in-after"
  })));
};
exports.Panel = Panel;
//# sourceMappingURL=Panel.js.map