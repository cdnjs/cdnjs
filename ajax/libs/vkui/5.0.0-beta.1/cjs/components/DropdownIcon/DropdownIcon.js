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

var _SizeYConditionalRender = require("../SizeYConditionalRender/SizeYConditionalRender");

var _excluded = ["opened"];

var DropdownIcon = function DropdownIcon(_ref) {
  var _ref$opened = _ref.opened,
      opened = _ref$opened === void 0 ? false : _ref$opened,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var IconCompact = opened ? _icons.Icon20ChevronUp : _icons.Icon20Dropdown;
  var IconRegular = opened ? _icons.Icon24ChevronUp : _icons.Icon24ChevronDown;
  return (0, _jsxRuntime.createScopedElement)(_SizeYConditionalRender.SizeYConditionalRender, {
    compact: (0, _jsxRuntime.createScopedElement)(IconCompact, (0, _extends2.default)({
      vkuiClass: "DropdownIcon"
    }, restProps)),
    regular: (0, _jsxRuntime.createScopedElement)(IconRegular, (0, _extends2.default)({
      vkuiClass: "DropdownIcon"
    }, restProps))
  });
};

exports.DropdownIcon = DropdownIcon;
//# sourceMappingURL=DropdownIcon.js.map