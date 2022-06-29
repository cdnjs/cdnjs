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

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _withPlatform = require("../../hoc/withPlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _ModalRootContext = require("../ModalRoot/ModalRootContext");

var _types = require("../ModalRoot/types");

var _getNavId = require("../../lib/getNavId");

var _warnOnce = require("../../lib/warnOnce");

var _ModalCardBase = require("../ModalCardBase/ModalCardBase");

var _useAdaptivity = require("../../hooks/useAdaptivity");

var _excluded = ["icon", "header", "subheader", "children", "actions", "actionsLayout", "onClose", "platform", "viewWidth", "viewHeight", "hasMouse", "nav", "id"];
var warn = (0, _warnOnce.warnOnce)("ModalCard");

var ModalCardComponent = function ModalCardComponent(_ref) {
  var icon = _ref.icon,
      header = _ref.header,
      subheader = _ref.subheader,
      children = _ref.children,
      actions = _ref.actions,
      _ref$actionsLayout = _ref.actionsLayout,
      actionsLayout = _ref$actionsLayout === void 0 ? "horizontal" : _ref$actionsLayout,
      onClose = _ref.onClose,
      platform = _ref.platform,
      viewWidth = _ref.viewWidth,
      viewHeight = _ref.viewHeight,
      hasMouse = _ref.hasMouse,
      nav = _ref.nav,
      id = _ref.id,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var isDesktop = (0, _useAdaptivity.useAdaptivityIsDesktop)();
  var modalContext = React.useContext(_ModalRootContext.ModalRootContext);

  var _useModalRegistry = (0, _ModalRootContext.useModalRegistry)((0, _getNavId.getNavId)({
    nav: nav,
    id: id
  }, warn), _types.ModalType.CARD),
      refs = _useModalRegistry.refs;

  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    id: id // eslint-disable-next-line vkui/no-object-expression-in-arguments
    ,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("ModalCard", platform), {
      "ModalCard--desktop": isDesktop
    })
  }), (0, _jsxRuntime.createScopedElement)(_ModalCardBase.ModalCardBase, {
    vkuiClass: "ModalCard__in",
    getRootRef: refs.innerElement,
    icon: icon,
    header: header,
    subheader: subheader,
    actions: actions,
    actionsLayout: actionsLayout,
    onClose: onClose || modalContext.onClose
  }, children));
};
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCard
 */


var ModalCard = (0, _withAdaptivity.withAdaptivity)((0, _withPlatform.withPlatform)(ModalCardComponent), {
  viewWidth: true,
  viewHeight: true,
  hasMouse: true
});
exports.ModalCard = ModalCard;
ModalCard.displayName = "ModalCard";
//# sourceMappingURL=ModalCard.js.map