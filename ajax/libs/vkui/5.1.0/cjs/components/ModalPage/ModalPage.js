"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalPage = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _getSizeXClassName = require("../../helpers/getSizeXClassName");
var _vkjs = require("@vkontakte/vkjs");
var _platform = require("../../lib/platform");
var _ModalRootContext = require("../ModalRoot/ModalRootContext");
var _usePlatform = require("../../hooks/usePlatform");
var _useOrientationChange = require("../../hooks/useOrientationChange");
var _ModalDismissButton = require("../ModalDismissButton/ModalDismissButton");
var _utils = require("../../lib/utils");
var _types = require("../ModalRoot/types");
var _getNavId = require("../../lib/getNavId");
var _warnOnce = require("../../lib/warnOnce");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _excluded = ["children", "header", "size", "onOpen", "onOpened", "onClose", "onClosed", "settlingHeight", "dynamicContentHeight", "getModalContentRef", "nav", "id", "hideCloseButton", "className"];
var warn = (0, _warnOnce.warnOnce)('ModalPage');

/**
 * @see https://vkcom.github.io/VKUI/#/ModalPage
 */
var ModalPage = function ModalPage(_ref) {
  var children = _ref.children,
    header = _ref.header,
    _ref$size = _ref.size,
    sizeProp = _ref$size === void 0 ? 's' : _ref$size,
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
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _React$useContext = React.useContext(_ModalRootContext.ModalRootContext),
    updateModalHeight = _React$useContext.updateModalHeight;
  var platform = (0, _usePlatform.usePlatform)();
  var orientation = (0, _useOrientationChange.useOrientationChange)();
  var _useAdaptivityWithJSM = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)(),
    sizeX = _useAdaptivityWithJSM.sizeX,
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  React.useEffect(updateModalHeight, [children, orientation, updateModalHeight]);
  var isCloseButtonShown = !hideCloseButton && isDesktop;
  var size = isDesktop ? sizeProp : 's';
  var modalContext = React.useContext(_ModalRootContext.ModalRootContext);
  var _useModalRegistry = (0, _ModalRootContext.useModalRegistry)((0, _getNavId.getNavId)({
      nav: nav,
      id: id
    }, warn), _types.ModalType.PAGE),
    refs = _useModalRegistry.refs;
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    id: id,
    className: (0, _vkjs.classNames)("vkuiModalPage", platform === _platform.Platform.IOS && "vkuiModalPage--ios", platform === _platform.Platform.VKCOM && "vkuiModalPage--vkcom", (0, _getSizeXClassName.getSizeXClassName)("vkuiModalPage", sizeX), isDesktop && "vkuiModalPage--desktop", styles["ModalPage--size-".concat(size)], className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalPage__in-wrap",
    ref: refs.innerElement
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalPage__in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalPage__header",
    ref: refs.headerElement
  }, header), /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalPage__content-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalPage__content",
    ref: (0, _utils.multiRef)(refs.contentElement, getModalContentRef)
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalPage__content-in"
  }, children))), isCloseButtonShown && /*#__PURE__*/React.createElement(_ModalDismissButton.ModalDismissButton, {
    onClick: onClose || modalContext.onClose
  }))));
};
exports.ModalPage = ModalPage;
var styles = {
  "ModalPage--size-s": "vkuiModalPage--size-s",
  "ModalPage--size-m": "vkuiModalPage--size-m",
  "ModalPage--size-l": "vkuiModalPage--size-l"
};
//# sourceMappingURL=ModalPage.js.map