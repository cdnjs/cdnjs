"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getClassName = require("../../helpers/getClassName");

var _Counter = _interopRequireDefault(require("../Counter/Counter"));

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _utils = require("../../lib/utils");

var _excluded = ["children", "selected", "label", "indicator", "text"];

var TabbarItem = function TabbarItem(props) {
  var children = props.children,
      selected = props.selected,
      label = props.label,
      indicator = props.indicator,
      text = props.text,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var Component = restProps.href ? 'a' : 'div';
  return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('TabbarItem', platform), {
      'TabbarItem--selected': selected,
      'TabbarItem--text': !!text
    })
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "TabbarItem__in"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "TabbarItem__icon"
  }, children, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "TabbarItem__label"
  }, (0, _utils.hasReactNode)(indicator) && indicator, !indicator && label && (0, _jsxRuntime.createScopedElement)(_Counter.default, {
    size: "s",
    mode: "prominent"
  }, label))), text && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "TabbarItem__text"
  }, text)));
};

var _default = TabbarItem;
exports.default = _default;
//# sourceMappingURL=TabbarItem.js.map