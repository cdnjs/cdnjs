import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["icon", "header", "subheader", "children", "actions", "onClose", "nav", "id"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { getPlatformClassName } from "../../helpers/getPlatformClassName";
import { classNames } from "../../lib/classNames";
import { ModalRootContext, useModalRegistry } from "../ModalRoot/ModalRootContext";
import { ModalType } from "../ModalRoot/types";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
import { ModalCardBase } from "../ModalCardBase/ModalCardBase";
import { useAdaptivityWithMediaQueries } from "../../hooks/useAdaptivityWithMediaQueries";
import { usePlatform } from "../../hooks/usePlatform";
var warn = warnOnce("ModalCard");
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCard
 */

export var ModalCard = function ModalCard(_ref) {
  var icon = _ref.icon,
      header = _ref.header,
      subheader = _ref.subheader,
      children = _ref.children,
      actions = _ref.actions,
      onClose = _ref.onClose,
      nav = _ref.nav,
      id = _ref.id,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _useAdaptivityWithMed = useAdaptivityWithMediaQueries(),
      isDesktop = _useAdaptivityWithMed.isDesktop;

  var platform = usePlatform();
  var modalContext = React.useContext(ModalRootContext);

  var _useModalRegistry = useModalRegistry(getNavId({
    nav: nav,
    id: id
  }, warn), ModalType.CARD),
      refs = _useModalRegistry.refs;

  return createScopedElement("div", _extends({}, restProps, {
    id: id,
    vkuiClass: classNames("ModalCard", getPlatformClassName("ModalCard", platform), isDesktop && "ModalCard--desktop")
  }), createScopedElement(ModalCardBase, {
    vkuiClass: "ModalCard__in",
    getRootRef: refs.innerElement,
    icon: icon,
    header: header,
    subheader: subheader,
    actions: actions,
    onClose: onClose || modalContext.onClose
  }, children));
};
//# sourceMappingURL=ModalCard.js.map