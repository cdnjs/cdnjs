"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalCard = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getPlatformClassName = require("../../helpers/getPlatformClassName");

var _classNames = require("../../lib/classNames");

var _ModalRootContext = require("../ModalRoot/ModalRootContext");

var _types = require("../ModalRoot/types");

var _getNavId = require("../../lib/getNavId");

var _warnOnce = require("../../lib/warnOnce");

var _ModalCardBase = require("../ModalCardBase/ModalCardBase");

var _useAdaptivityWithMediaQueries = require("../../hooks/useAdaptivityWithMediaQueries");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["icon", "header", "subheader", "children", "actions", "onClose", "nav", "id"];
var warn = (0, _warnOnce.warnOnce)("ModalCard");
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCard
 */

var ModalCard = function ModalCard(_ref) {
  var icon = _ref.icon,
      header = _ref.header,
      subheader = _ref.subheader,
      children = _ref.children,
      actions = _ref.actions,
      onClose = _ref.onClose,
      nav = _ref.nav,
      id = _ref.id,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useAdaptivityWithMed = (0, _useAdaptivityWithMediaQueries.useAdaptivityWithMediaQueries)(),
      isDesktop = _useAdaptivityWithMed.isDesktop;

  var platform = (0, _usePlatform.usePlatform)();
  var modalContext = React.useContext(_ModalRootContext.ModalRootContext);

  var _useModalRegistry = (0, _ModalRootContext.useModalRegistry)((0, _getNavId.getNavId)({
    nav: nav,
    id: id
  }, warn), _types.ModalType.CARD),
      refs = _useModalRegistry.refs;

  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    id: id,
    vkuiClass: (0, _classNames.classNames)("ModalCard", (0, _getPlatformClassName.getPlatformClassName)("ModalCard", platform), isDesktop && "ModalCard--desktop")
  }), (0, _jsxRuntime.createScopedElement)(_ModalCardBase.ModalCardBase, {
    vkuiClass: "ModalCard__in",
    getRootRef: refs.innerElement,
    icon: icon,
    header: header,
    subheader: subheader,
    actions: actions,
    onClose: onClose || modalContext.onClose
  }, children));
};

exports.ModalCard = ModalCard;
//# sourceMappingURL=ModalCard.js.map