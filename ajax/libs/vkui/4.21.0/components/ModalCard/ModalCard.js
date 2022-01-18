import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["icon", "header", "subheader", "children", "actions", "actionsLayout", "onClose", "platform", "viewWidth", "viewHeight", "hasMouse", "nav"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { withPlatform } from "../../hoc/withPlatform";
import { withAdaptivity, ViewHeight, ViewWidth } from "../../hoc/withAdaptivity";
import ModalRootContext, { useModalRegistry } from "../ModalRoot/ModalRootContext";
import { ModalType } from "../ModalRoot/types";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
import { ModalCardBase } from "../ModalCardBase/ModalCardBase";
var warn = warnOnce('ModalCard');

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
      restProps = _objectWithoutProperties(props, _excluded);

  var isDesktop = viewWidth >= ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= ViewHeight.MEDIUM);
  var modalContext = React.useContext(ModalRootContext);

  var _useModalRegistry = useModalRegistry(getNavId(props, warn), ModalType.CARD),
      refs = _useModalRegistry.refs;

  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(getClassName('ModalCard', platform), {
      'ModalCard--desktop': isDesktop
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

ModalCard.defaultProps = {
  actionsLayout: 'horizontal'
};
export default withAdaptivity(withPlatform(ModalCard), {
  viewWidth: true,
  viewHeight: true,
  hasMouse: true
});
//# sourceMappingURL=ModalCard.js.map