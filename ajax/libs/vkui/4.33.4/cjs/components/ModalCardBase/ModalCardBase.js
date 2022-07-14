"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalCardBase = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _utils = require("../../lib/utils");

var _Title = require("../Typography/Title/Title");

var _Subhead = require("../Typography/Subhead/Subhead");

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");

var _platform = require("../../lib/platform");

var _ModalDismissButton = require("../ModalDismissButton/ModalDismissButton");

var _icons = require("@vkontakte/icons");

var _useKeyboard = require("../../hooks/useKeyboard");

var _useAdaptivity = require("../../hooks/useAdaptivity");

var _excluded = ["getRootRef", "icon", "header", "subheader", "children", "actions", "actionsLayout", "viewWidth", "hasMouse", "viewHeight", "onClose", "dismissLabel"];

/**
 * @see https://vkcom.github.io/VKUI/#/ModalCardBase
 */
var ModalCardBase = (0, _withAdaptivity.withAdaptivity)(function (_ref) {
  var getRootRef = _ref.getRootRef,
      icon = _ref.icon,
      header = _ref.header,
      subheader = _ref.subheader,
      children = _ref.children,
      actions = _ref.actions,
      actionsLayout = _ref.actionsLayout,
      viewWidth = _ref.viewWidth,
      hasMouse = _ref.hasMouse,
      viewHeight = _ref.viewHeight,
      onClose = _ref.onClose,
      _ref$dismissLabel = _ref.dismissLabel,
      dismissLabel = _ref$dismissLabel === void 0 ? "Скрыть" : _ref$dismissLabel,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var isDesktop = (0, _useAdaptivity.useAdaptivityIsDesktop)();
  var isSoftwareKeyboardOpened = (0, _useKeyboard.useKeyboard)().isOpened;
  var canShowCloseBtn = viewWidth >= _withAdaptivity.ViewWidth.SMALL_TABLET || platform === _platform.Platform.VKCOM;
  var canShowCloseBtnIos = platform === _platform.IOS && !canShowCloseBtn;
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    // eslint-disable-next-line vkui/no-object-expression-in-arguments
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("ModalCardBase", platform), {
      "ModalCardBase--desktop": isDesktop
    }),
    ref: getRootRef
  }), (0, _jsxRuntime.createScopedElement)("div", {
    // eslint-disable-next-line vkui/no-object-expression-in-arguments
    vkuiClass: (0, _classNames.classNames)("ModalCardBase__container", {
      "ModalCardBase__container--softwareKeyboardOpened": isSoftwareKeyboardOpened
    })
  }, (0, _utils.hasReactNode)(icon) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ModalCardBase__icon"
  }, icon), (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(_Title.Title, {
    level: "2",
    weight: platform === _platform.ANDROID ? "2" : "1",
    vkuiClass: "ModalCardBase__header"
  }, header), (0, _utils.hasReactNode)(subheader) && (0, _jsxRuntime.createScopedElement)(_Subhead.Subhead, {
    vkuiClass: "ModalCardBase__subheader"
  }, subheader), children, (0, _utils.hasReactNode)(actions) && (0, _jsxRuntime.createScopedElement)("div", {
    // eslint-disable-next-line vkui/no-object-expression-in-arguments
    vkuiClass: (0, _classNames.classNames)("ModalCardBase__actions", {
      "ModalCardBase__actions--v": actionsLayout === "vertical"
    })
  }, actions), canShowCloseBtn && (0, _jsxRuntime.createScopedElement)(_ModalDismissButton.ModalDismissButton, {
    onClick: onClose
  }), canShowCloseBtnIos && (0, _jsxRuntime.createScopedElement)(_PanelHeaderButton.PanelHeaderButton, {
    "aria-label": dismissLabel,
    vkuiClass: "ModalCardBase__dismiss",
    onClick: onClose
  }, (0, _jsxRuntime.createScopedElement)(_icons.Icon24Dismiss, null))));
}, {
  viewWidth: true,
  viewHeight: true,
  hasMouse: true
});
exports.ModalCardBase = ModalCardBase;
//# sourceMappingURL=ModalCardBase.js.map