"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("../../lib/jsxRuntime");

var _icons = require("@vkontakte/icons");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var ModalDismissButton = function ModalDismissButton(props) {
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_Tappable.default, (0, _extends2.default)({
    vkuiClass: (0, _getClassName.getClassName)('ModalDismissButton', platform)
  }, props, {
    activeMode: "ModalDismissButton--active",
    hoverMode: "ModalDismissButton--hover"
  }), (0, _jsxRuntime.createScopedElement)(_icons.Icon20Cancel, null));
};

ModalDismissButton.defaultProps = {
  'aria-label': 'Закрыть'
};
var _default = ModalDismissButton;
exports.default = _default;
//# sourceMappingURL=ModalDismissButton.js.map