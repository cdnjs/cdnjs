"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownIcon = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _icons = require("@vkontakte/icons");

var _AdaptivityContext = require("../AdaptivityProvider/AdaptivityContext");

var _getClassName = require("../../helpers/getClassName");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _usePlatform = require("../../hooks/usePlatform");

var DropdownIcon = function DropdownIcon(props) {
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  var Icon = sizeY === _AdaptivityContext.SizeType.COMPACT ? _icons.Icon20Dropdown : _icons.Icon24ChevronDown;
  return (0, _jsxRuntime.createScopedElement)(Icon, (0, _extends2.default)({
    vkuiClass: (0, _getClassName.getClassName)("DropdownIcon", platform)
  }, props));
};

exports.DropdownIcon = DropdownIcon;
//# sourceMappingURL=DropdownIcon.js.map