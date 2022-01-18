"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubnavigationBar = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _usePlatform = require("../../hooks/usePlatform");

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _HorizontalScroll = _interopRequireDefault(require("../HorizontalScroll/HorizontalScroll"));

var _excluded = ["mode", "children"];

var SubnavigationBar = function SubnavigationBar(props) {
  var platform = (0, _usePlatform.usePlatform)();
  var mode = props.mode,
      children = props.children,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var ScrollWrapper = mode === 'fixed' ? 'div' : _HorizontalScroll.default;
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('SubnavigationBar', platform), "SubnavigationBar--".concat(mode))
  }), (0, _jsxRuntime.createScopedElement)(ScrollWrapper, {
    vkuiClass: "SubnavigationBar__in"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SubnavigationBar__scrollIn"
  }, children)));
};

exports.SubnavigationBar = SubnavigationBar;
SubnavigationBar.defaultProps = {
  mode: 'overflow'
};
//# sourceMappingURL=SubnavigationBar.js.map