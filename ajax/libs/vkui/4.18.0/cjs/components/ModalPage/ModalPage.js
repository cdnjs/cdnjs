"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _ModalRootContext = require("../ModalRoot/ModalRootContext");

var _usePlatform = require("../../hooks/usePlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _ModalDismissButton = _interopRequireDefault(require("../ModalDismissButton/ModalDismissButton"));

var _utils = require("../../lib/utils");

var _types = require("../ModalRoot/types");

var _getNavId = require("../../lib/getNavId");

var _warnOnce = require("../../lib/warnOnce");

var _excluded = ["children", "header", "viewWidth", "viewHeight", "sizeX", "hasMouse", "onClose", "settlingHeight", "dynamicContentHeight", "getModalContentRef", "nav"];
var warn = (0, _warnOnce.warnOnce)('ModalPage');

var ModalPage = function ModalPage(props) {
  var platform = (0, _usePlatform.usePlatform)();

  var _React$useContext = React.useContext(_ModalRootContext.ModalRootContext),
      updateModalHeight = _React$useContext.updateModalHeight;

  var children = props.children,
      header = props.header,
      viewWidth = props.viewWidth,
      viewHeight = props.viewHeight,
      sizeX = props.sizeX,
      hasMouse = props.hasMouse,
      onClose = props.onClose,
      settlingHeight = props.settlingHeight,
      dynamicContentHeight = props.dynamicContentHeight,
      getModalContentRef = props.getModalContentRef,
      nav = props.nav,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  React.useEffect(function () {
    updateModalHeight();
  }, [children]);
  var isDesktop = viewWidth >= _withAdaptivity.ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= _withAdaptivity.ViewHeight.MEDIUM);
  var canShowCloseBtn = viewWidth >= _withAdaptivity.ViewWidth.SMALL_TABLET;
  var modalContext = React.useContext(_ModalRootContext.ModalRootContext);

  var _useModalRegistry = (0, _ModalRootContext.useModalRegistry)((0, _getNavId.getNavId)(props, warn), _types.ModalType.PAGE),
      refs = _useModalRegistry.refs;

  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('ModalPage', platform), "ModalPage--sizeX-".concat(sizeX), {
      'ModalPage--desktop': isDesktop
    })
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
  }, children))), canShowCloseBtn && (0, _jsxRuntime.createScopedElement)(_ModalDismissButton.default, {
    onClick: onClose || modalContext.onClose
  }))));
};

ModalPage.defaultProps = {
  settlingHeight: 75
};

var _default = (0, _withAdaptivity.withAdaptivity)(ModalPage, {
  viewWidth: true,
  viewHeight: true,
  sizeX: true,
  hasMouse: true
});

exports.default = _default;
//# sourceMappingURL=ModalPage.js.map