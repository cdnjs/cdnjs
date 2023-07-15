"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionSheetDropdown = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classNames = require("../../lib/classNames");
var _platform = require("../../lib/platform");
var _usePlatform = require("../../hooks/usePlatform");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _FocusTrap = require("../FocusTrap/FocusTrap");
var _excluded = ["children", "closing", "toggleRef"];
var stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};
var ActionSheetDropdown = function ActionSheetDropdown(_ref) {
  var children = _ref.children,
    closing = _ref.closing,
    toggleRef = _ref.toggleRef,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_FocusTrap.FocusTrap, (0, _extends2.default)({}, restProps, {
    onClick: stopPropagation,
    vkuiClass: (0, _classNames.classNames)("ActionSheet", platform === _platform.Platform.IOS && "ActionSheet--ios", closing && "ActionSheet--closing", "ActionSheet--sizeY-".concat(sizeY))
  }), children);
};
exports.ActionSheetDropdown = ActionSheetDropdown;
//# sourceMappingURL=ActionSheetDropdown.js.map