"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalDismissButton = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _icons = require("@vkontakte/icons");

var _Tappable = require("../Tappable/Tappable");

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["aria-label"];

/**
 * @see https://vkcom.github.io/VKUI/#/ModalDismissButton
 */
var ModalDismissButton = function ModalDismissButton(_ref) {
  var _ref$ariaLabel = _ref["aria-label"],
      ariaLabel = _ref$ariaLabel === void 0 ? "Закрыть" : _ref$ariaLabel,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({
    vkuiClass: (0, _getClassName.getClassName)("ModalDismissButton", platform)
  }, restProps, {
    "aria-label": ariaLabel,
    activeMode: "ModalDismissButton--active",
    hoverMode: "ModalDismissButton--hover"
  }), (0, _jsxRuntime.createScopedElement)(_icons.Icon20Cancel, null));
};

exports.ModalDismissButton = ModalDismissButton;
//# sourceMappingURL=ModalDismissButton.js.map