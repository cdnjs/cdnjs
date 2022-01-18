"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getClassName = require("../../helpers/getClassName");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _usePlatform = require("../../hooks/usePlatform");

var _utils = require("../../lib/utils");

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _Headline = _interopRequireDefault(require("../Typography/Headline/Headline"));

var _platform = require("../../lib/platform");

var _excluded = ["className", "style", "aside", "status", "before", "children", "onClick"];

var PanelHeaderContent = function PanelHeaderContent(_ref) {
  var className = _ref.className,
      style = _ref.style,
      aside = _ref.aside,
      status = _ref.status,
      before = _ref.before,
      children = _ref.children,
      onClick = _ref.onClick,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var InComponent = onClick ? _Tappable.default : 'div';
  var rootProps = onClick ? {} : restProps;
  var platform = (0, _usePlatform.usePlatform)();
  var inProps = onClick ? (0, _objectSpread2.default)((0, _objectSpread2.default)({}, restProps), {}, {
    onClick: onClick,
    activeEffectDelay: 200,
    hasActive: platform === _platform.IOS,
    activeMode: 'opacity'
  }) : {};
  var baseClassNames = (0, _getClassName.getClassName)('PanelHeaderContent', platform);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, rootProps, {
    vkuiClass: baseClassNames,
    style: style,
    className: className
  }), (0, _utils.hasReactNode)(before) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PanelHeaderContent__before"
  }, before), (0, _jsxRuntime.createScopedElement)(InComponent, (0, _extends2.default)({}, inProps, {
    vkuiClass: "PanelHeaderContent__in"
  }), (0, _utils.hasReactNode)(status) && (0, _jsxRuntime.createScopedElement)(_Caption.default, {
    level: "1",
    weight: "regular",
    vkuiClass: "PanelHeaderContent__status"
  }, status), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PanelHeaderContent__children"
  }, (0, _utils.hasReactNode)(status) ? (0, _jsxRuntime.createScopedElement)(_Headline.default, {
    Component: "span",
    weight: "medium"
  }, children) : (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "PanelHeaderContent__children-in"
  }, children), (0, _utils.hasReactNode)(aside) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PanelHeaderContent__aside"
  }, aside)), (0, _utils.hasReactNode)(before) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PanelHeaderContent__width"
  })));
};

var _default = PanelHeaderContent;
exports.default = _default;
//# sourceMappingURL=PanelHeaderContent.js.map