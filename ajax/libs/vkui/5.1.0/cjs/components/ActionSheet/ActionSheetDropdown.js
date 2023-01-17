"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionSheetDropdown = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _vkjs = require("@vkontakte/vkjs");
var _platform = require("../../lib/platform");
var _usePlatform = require("../../hooks/usePlatform");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _FocusTrap = require("../FocusTrap/FocusTrap");
var _excluded = ["children", "closing", "toggleRef", "className"];
var stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};
var ActionSheetDropdown = function ActionSheetDropdown(_ref) {
  var children = _ref.children,
    closing = _ref.closing,
    toggleRef = _ref.toggleRef,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useAdaptivityWithJSM = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)(),
    sizeY = _useAdaptivityWithJSM.sizeY;
  var platform = (0, _usePlatform.usePlatform)();
  return /*#__PURE__*/React.createElement(_FocusTrap.FocusTrap, (0, _extends2.default)({}, restProps, {
    onClick: stopPropagation,
    className: (0, _vkjs.classNames)("vkuiActionSheet", platform === _platform.Platform.IOS && "vkuiActionSheet--ios", closing && "vkuiActionSheet--closing", (0, _getSizeYClassName.getSizeYClassName)("vkuiActionSheet", sizeY), className)
  }), children);
};
exports.ActionSheetDropdown = ActionSheetDropdown;
//# sourceMappingURL=ActionSheetDropdown.js.map