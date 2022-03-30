"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionSheetDropdown = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

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
  var platform = (0, _usePlatform.usePlatform)();
  var baseClaseName = (0, _getClassName.getClassName)("ActionSheet", platform);
  return (0, _jsxRuntime.createScopedElement)(_FocusTrap.FocusTrap, (0, _extends2.default)({}, restProps, {
    onClick: stopPropagation,
    vkuiClass: (0, _classNames.classNames)(baseClaseName, {
      "ActionSheet--closing": closing
    })
  }), children);
};

exports.ActionSheetDropdown = ActionSheetDropdown;
//# sourceMappingURL=ActionSheetDropdown.js.map