"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalCardBase = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _Title = require("../Typography/Title/Title");
var _Subhead = require("../Typography/Subhead/Subhead");
var _vkjs = require("@vkontakte/vkjs");
var _getPlatformClassName = require("../../helpers/getPlatformClassName");
var _usePlatform = require("../../hooks/usePlatform");
var _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");
var _platform = require("../../lib/platform");
var _ModalDismissButton = require("../ModalDismissButton/ModalDismissButton");
var _icons = require("@vkontakte/icons");
var _useKeyboard = require("../../hooks/useKeyboard");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _excluded = ["getRootRef", "icon", "header", "subheader", "children", "actions", "onClose", "dismissLabel", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCardBase
 */
var ModalCardBase = function ModalCardBase(_ref) {
  var getRootRef = _ref.getRootRef,
    icon = _ref.icon,
    header = _ref.header,
    subheader = _ref.subheader,
    children = _ref.children,
    actions = _ref.actions,
    onClose = _ref.onClose,
    _ref$dismissLabel = _ref.dismissLabel,
    dismissLabel = _ref$dismissLabel === void 0 ? 'Скрыть' : _ref$dismissLabel,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _useAdaptivityWithJSM = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)(),
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  var isSoftwareKeyboardOpened = (0, _useKeyboard.useKeyboard)().isOpened;
  var canShowCloseButtonIOS = platform === _platform.Platform.IOS && !isDesktop;
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiModalCardBase", (0, _getPlatformClassName.getPlatformClassName)("vkuiModalCardBase", platform), isDesktop && "vkuiModalCardBase--desktop", className),
    ref: getRootRef
  }), /*#__PURE__*/React.createElement("div", {
    className: (0, _vkjs.classNames)("vkuiModalCardBase__container", isSoftwareKeyboardOpened && "vkuiModalCardBase__container--softwareKeyboardOpened")
  }, (0, _vkjs.hasReactNode)(icon) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalCardBase__icon"
  }, icon), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/React.createElement(_Title.Title, {
    level: "2",
    weight: "2",
    className: "vkuiModalCardBase__header"
  }, header), (0, _vkjs.hasReactNode)(subheader) && /*#__PURE__*/React.createElement(_Subhead.Subhead, {
    className: "vkuiModalCardBase__subheader"
  }, subheader), children, (0, _vkjs.hasReactNode)(actions) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalCardBase__actions"
  }, actions), isDesktop && /*#__PURE__*/React.createElement(_ModalDismissButton.ModalDismissButton, {
    onClick: onClose
  }), canShowCloseButtonIOS && /*#__PURE__*/React.createElement(_PanelHeaderButton.PanelHeaderButton, {
    "aria-label": dismissLabel,
    className: "vkuiModalCardBase__dismiss",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(_icons.Icon24Dismiss, null))));
};
exports.ModalCardBase = ModalCardBase;
//# sourceMappingURL=ModalCardBase.js.map