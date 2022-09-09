"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionSheetDropdown = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getSizeYClassName = require("../../helpers/getSizeYClassName");

var _classNames = require("../../lib/classNames");

var _platform = require("../../lib/platform");

var _usePlatform = require("../../hooks/usePlatform");

var _useAdaptivityWithMediaQueries = require("../../hooks/useAdaptivityWithMediaQueries");

var _FocusTrap = require("../FocusTrap/FocusTrap");

var _excluded = ["children", "closing", "toggleRef", "popupDirection"];

var stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};

var ActionSheetDropdown = function ActionSheetDropdown(_ref) {
  var children = _ref.children,
      closing = _ref.closing,
      toggleRef = _ref.toggleRef,
      popupDirection = _ref.popupDirection,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useAdaptivityWithMed = (0, _useAdaptivityWithMediaQueries.useAdaptivityWithMediaQueries)(),
      sizeY = _useAdaptivityWithMed.sizeY;

  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_FocusTrap.FocusTrap, (0, _extends2.default)({}, restProps, {
    onClick: stopPropagation,
    vkuiClass: (0, _classNames.classNames)("ActionSheet", platform === _platform.Platform.IOS && "ActionSheet--ios", closing && "ActionSheet--closing", (0, _getSizeYClassName.getSizeYClassName)("ActionSheet", sizeY))
  }), children);
};

exports.ActionSheetDropdown = ActionSheetDropdown;
//# sourceMappingURL=ActionSheetDropdown.js.map