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

var _withPlatform = require("../../hoc/withPlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _ModalRootContext = _interopRequireWildcard(require("../ModalRoot/ModalRootContext"));

var _types = require("../ModalRoot/types");

var _getNavId = require("../../lib/getNavId");

var _warnOnce = require("../../lib/warnOnce");

var _ModalCardBase = require("../ModalCardBase/ModalCardBase");

var _excluded = ["icon", "header", "subheader", "children", "actions", "actionsLayout", "onClose", "platform", "viewWidth", "viewHeight", "hasMouse", "nav"];
var warn = (0, _warnOnce.warnOnce)('ModalCard');

var ModalCard = function ModalCard(props) {
  var icon = props.icon,
      header = props.header,
      subheader = props.subheader,
      children = props.children,
      actions = props.actions,
      actionsLayout = props.actionsLayout,
      onClose = props.onClose,
      platform = props.platform,
      viewWidth = props.viewWidth,
      viewHeight = props.viewHeight,
      hasMouse = props.hasMouse,
      nav = props.nav,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var isDesktop = viewWidth >= _withAdaptivity.ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= _withAdaptivity.ViewHeight.MEDIUM);
  var modalContext = React.useContext(_ModalRootContext.default);

  var _useModalRegistry = (0, _ModalRootContext.useModalRegistry)((0, _getNavId.getNavId)(props, warn), _types.ModalType.CARD),
      refs = _useModalRegistry.refs;

  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('ModalCard', platform), {
      'ModalCard--desktop': isDesktop
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

ModalCard.defaultProps = {
  actionsLayout: 'horizontal'
};

var _default = (0, _withAdaptivity.withAdaptivity)((0, _withPlatform.withPlatform)(ModalCard), {
  viewWidth: true,
  viewHeight: true,
  hasMouse: true
});

exports.default = _default;
//# sourceMappingURL=ModalCard.js.map