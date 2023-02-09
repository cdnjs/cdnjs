"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalCard = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _getPlatformClassName = require("../../helpers/getPlatformClassName");
var _vkjs = require("@vkontakte/vkjs");
var _ModalRootContext = require("../ModalRoot/ModalRootContext");
var _types = require("../ModalRoot/types");
var _getNavId = require("../../lib/getNavId");
var _warnOnce = require("../../lib/warnOnce");
var _ModalCardBase = require("../ModalCardBase/ModalCardBase");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _usePlatform = require("../../hooks/usePlatform");
var _excluded = ["icon", "header", "subheader", "children", "actions", "onClose", "nav", "id", "className"];
var warn = (0, _warnOnce.warnOnce)('ModalCard');

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
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useAdaptivityWithJSM = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)(),
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  var platform = (0, _usePlatform.usePlatform)();
  var modalContext = React.useContext(_ModalRootContext.ModalRootContext);
  var _useModalRegistry = (0, _ModalRootContext.useModalRegistry)((0, _getNavId.getNavId)({
      nav: nav,
      id: id
    }, warn), _types.ModalType.CARD),
    refs = _useModalRegistry.refs;
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    id: id,
    className: (0, _vkjs.classNames)("vkuiModalCard", (0, _getPlatformClassName.getPlatformClassName)("vkuiModalCard", platform), isDesktop && "vkuiModalCard--desktop", className)
  }), /*#__PURE__*/React.createElement(_ModalCardBase.ModalCardBase, {
    className: "vkuiModalCard__in",
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