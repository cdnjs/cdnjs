"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _icons = require("@vkontakte/icons");

var _usePlatform = require("../../hooks/usePlatform");

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var HorizontalScrollArrow = function HorizontalScrollArrow(_ref) {
  var onClick = _ref.onClick,
      direction = _ref.direction;
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_Tappable.default, {
    Component: "button",
    hasHover: false,
    hasActive: false,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('HorizontalScrollArrow', platform), "HorizontalScrollArrow--".concat(direction)),
    onClick: onClick
  }, (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "HorizontalScrollArrow__icon"
  }, (0, _jsxRuntime.createScopedElement)(_icons.Icon24Chevron, null)));
};

var _default = HorizontalScrollArrow;
exports.default = _default;
//# sourceMappingURL=HorizontalScrollArrow.js.map