"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalPage = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _classNames = require("../../lib/classNames");
var _ModalRootContext = require("../ModalRoot/ModalRootContext");
var _usePlatform = require("../../hooks/usePlatform");
var _useOrientationChange = require("../../hooks/useOrientationChange");
var _withAdaptivity = require("../../hoc/withAdaptivity");
var _ModalDismissButton = require("../ModalDismissButton/ModalDismissButton");
var _utils = require("../../lib/utils");
var _types = require("../ModalRoot/types");
var _getNavId = require("../../lib/getNavId");
var _warnOnce = require("../../lib/warnOnce");
var _platform = require("../../lib/platform");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _excluded = ["children", "header", "size", "viewWidth", "viewHeight", "sizeX", "hasMouse", "onOpen", "onOpened", "onClose", "onClosed", "settlingHeight", "dynamicContentHeight", "getModalContentRef", "nav", "id", "hideCloseButton"];
var warn = (0, _warnOnce.warnOnce)("ModalPage");
var ModalPageComponent = function ModalPageComponent(_ref) {
  var children = _ref.children,
    header = _ref.header,
    _ref$size = _ref.size,
    sizeProp = _ref$size === void 0 ? "s" : _ref$size,
    viewWidth = _ref.viewWidth,
    viewHeight = _ref.viewHeight,
    sizeX = _ref.sizeX,
    hasMouse = _ref.hasMouse,
    onOpen = _ref.onOpen,
    onOpened = _ref.onOpened,
    onClose = _ref.onClose,
    onClosed = _ref.onClosed,
    settlingHeight = _ref.settlingHeight,
    dynamicContentHeight = _ref.dynamicContentHeight,
    getModalContentRef = _ref.getModalContentRef,
    nav = _ref.nav,
    id = _ref.id,
    _ref$hideCloseButton = _ref.hideCloseButton,
    hideCloseButton = _ref$hideCloseButton === void 0 ? false : _ref$hideCloseButton,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _React$useContext = React.useContext(_ModalRootContext.ModalRootContext),
    updateModalHeight = _React$useContext.updateModalHeight;
  var platform = (0, _usePlatform.usePlatform)();
  var orientation = (0, _useOrientationChange.useOrientationChange)();
  React.useEffect(updateModalHeight, [children, orientation, updateModalHeight]);
  var isDesktop = (0, _useAdaptivity.useAdaptivityIsDesktop)();
  var isCloseButtonShown = !hideCloseButton && isDesktop;
  var size = isDesktop ? sizeProp : "s";
  var modalContext = React.useContext(_ModalRootContext.ModalRootContext);
  var _useModalRegistry = (0, _ModalRootContext.useModalRegistry)((0, _getNavId.getNavId)({
      nav: nav,
      id: id
    }, warn), _types.ModalType.PAGE),
    refs = _useModalRegistry.refs;
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    id: id,
    vkuiClass: (0, _classNames.classNames)("ModalPage", platform === _platform.Platform.IOS && "ModalPage--ios", platform === _platform.Platform.VKCOM && "ModalPage--vkcom", "ModalPage--sizeX-".concat(sizeX),
    // TODO v5.0.0 поправить под новую адаптивность
    isDesktop && "ModalPage--desktop", size && "ModalPage--".concat(size))
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ModalPage__in-wrap",
    ref: refs.innerElement
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ModalPage__in"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ModalPage__header",
    ref: refs.headerElement
  }, header), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ModalPage__content-wrap"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ModalPage__content",
    ref: (0, _utils.multiRef)(refs.contentElement, getModalContentRef)
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ModalPage__content-in"
  }, children))), isCloseButtonShown && (0, _jsxRuntime.createScopedElement)(_ModalDismissButton.ModalDismissButton, {
    onClick: onClose || modalContext.onClose
  }))));
};

/**
 * @see https://vkcom.github.io/VKUI/#/ModalPage
 */
var ModalPage = (0, _withAdaptivity.withAdaptivity)(ModalPageComponent, {
  viewWidth: true,
  viewHeight: true,
  sizeX: true,
  hasMouse: true
});
exports.ModalPage = ModalPage;
ModalPage.displayName = "ModalPage";
//# sourceMappingURL=ModalPage.js.map