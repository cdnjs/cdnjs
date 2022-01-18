"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _utils = require("../../lib/utils");

var _Title = _interopRequireDefault(require("../Typography/Title/Title"));

var _Headline = _interopRequireDefault(require("../Typography/Headline/Headline"));

var _excluded = ["icon", "header", "action", "children", "stretched", "getRootRef"];

var Placeholder = function Placeholder(props) {
  var icon = props.icon,
      header = props.header,
      action = props.action,
      children = props.children,
      stretched = props.stretched,
      getRootRef = props.getRootRef,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    vkuiClass: (0, _classNames.classNames)('Placeholder', {
      'Placeholder--stretched': stretched
    })
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Placeholder__in"
  }, (0, _utils.hasReactNode)(icon) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Placeholder__icon"
  }, icon), (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(_Title.default, {
    level: "2",
    weight: "medium",
    vkuiClass: "Placeholder__header"
  }, header), (0, _utils.hasReactNode)(children) && (0, _jsxRuntime.createScopedElement)(_Headline.default, {
    weight: "regular",
    vkuiClass: "Placeholder__text"
  }, children), (0, _utils.hasReactNode)(action) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Placeholder__action"
  }, action)));
};

var _default = Placeholder;
exports.default = _default;
//# sourceMappingURL=Placeholder.js.map