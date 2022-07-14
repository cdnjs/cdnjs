import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["icon", "header", "subheader", "children", "actions", "actionsLayout", "onClose", "platform", "viewWidth", "viewHeight", "hasMouse", "nav", "id"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { withPlatform } from "../../hoc/withPlatform";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { ModalRootContext, useModalRegistry } from "../ModalRoot/ModalRootContext";
import { ModalType } from "../ModalRoot/types";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
import { ModalCardBase } from "../ModalCardBase/ModalCardBase";
import { useAdaptivityIsDesktop } from "../../hooks/useAdaptivity";
var warn = warnOnce("ModalCard");

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
      restProps = _objectWithoutProperties(_ref, _excluded);

  var isDesktop = useAdaptivityIsDesktop();
  var modalContext = React.useContext(ModalRootContext);

  var _useModalRegistry = useModalRegistry(getNavId({
    nav: nav,
    id: id
  }, warn), ModalType.CARD),
      refs = _useModalRegistry.refs;

  return createScopedElement("div", _extends({}, restProps, {
    id: id // eslint-disable-next-line vkui/no-object-expression-in-arguments
    ,
    vkuiClass: classNames(getClassName("ModalCard", platform), {
      "ModalCard--desktop": isDesktop
    })
  }), createScopedElement(ModalCardBase, {
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


export var ModalCard = withAdaptivity(withPlatform(ModalCardComponent), {
  viewWidth: true,
  viewHeight: true,
  hasMouse: true
});
ModalCard.displayName = "ModalCard";
//# sourceMappingURL=ModalCard.js.map