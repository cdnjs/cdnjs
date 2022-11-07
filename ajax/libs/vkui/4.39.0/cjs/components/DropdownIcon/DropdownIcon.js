"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownIcon = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _icons = require("@vkontakte/icons");
var _classNames = require("../../lib/classNames");
var _AdaptivityContext = require("../AdaptivityProvider/AdaptivityContext");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _excluded = ["opened"];
var DropdownIcon = function DropdownIcon(_ref) {
  var _ref$opened = _ref.opened,
    opened = _ref$opened === void 0 ? false : _ref$opened,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  var Icon = sizeY === _AdaptivityContext.SizeType.COMPACT ? _icons.Icon20Dropdown : _icons.Icon24ChevronDown;
  if (opened) {
    Icon = sizeY === _AdaptivityContext.SizeType.COMPACT ? _icons.Icon20ChevronUp : _icons.Icon24ChevronUp;
  }
  return (0, _jsxRuntime.createScopedElement)(Icon, (0, _extends2.default)({
    vkuiClass: (0, _classNames.classNames)("DropdownIcon"),
    "aria-hidden": true
  }, restProps));
};
exports.DropdownIcon = DropdownIcon;
//# sourceMappingURL=DropdownIcon.js.map