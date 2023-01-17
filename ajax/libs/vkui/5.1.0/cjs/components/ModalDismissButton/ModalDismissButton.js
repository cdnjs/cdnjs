"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalDismissButton = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _icons = require("@vkontakte/icons");
var _Tappable = require("../Tappable/Tappable");
var _excluded = ["aria-label", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/ModalDismissButton
 */
var ModalDismissButton = function ModalDismissButton(_ref) {
  var _ref$ariaLabel = _ref['aria-label'],
    ariaLabel = _ref$ariaLabel === void 0 ? 'Закрыть' : _ref$ariaLabel,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiModalDismissButton", className)
  }, restProps, {
    "aria-label": ariaLabel,
    activeMode: "vkuiModalDismissButton--active",
    hoverMode: "vkuiModalDismissButton--hover"
  }), /*#__PURE__*/React.createElement(_icons.Icon20Cancel, null));
};
exports.ModalDismissButton = ModalDismissButton;
//# sourceMappingURL=ModalDismissButton.js.map