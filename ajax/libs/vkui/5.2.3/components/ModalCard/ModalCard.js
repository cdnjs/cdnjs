import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["icon", "header", "subheader", "children", "actions", "onClose", "nav", "id", "className", "size"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { getPlatformClassName } from '../../helpers/getPlatformClassName';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { getNavId } from '../../lib/getNavId';
import { warnOnce } from '../../lib/warnOnce';
import { ModalCardBase } from '../ModalCardBase/ModalCardBase';
import { ModalRootContext, useModalRegistry } from '../ModalRoot/ModalRootContext';
import { ModalType } from '../ModalRoot/types';
var warn = warnOnce('ModalCard');

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
    className = _ref.className,
    size = _ref.size,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useAdaptivityWithJSM = useAdaptivityWithJSMediaQueries(),
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  var platform = usePlatform();
  var modalContext = React.useContext(ModalRootContext);
  var _useModalRegistry = useModalRegistry(getNavId({
      nav: nav,
      id: id
    }, warn), ModalType.CARD),
    refs = _useModalRegistry.refs;
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    id: id,
    className: classNames("vkuiModalCard", getPlatformClassName("vkuiModalCard", platform), isDesktop && "vkuiModalCard--desktop", className)
  }), /*#__PURE__*/React.createElement(ModalCardBase, {
    className: "vkuiModalCard__in",
    getRootRef: refs.innerElement,
    icon: icon,
    header: header,
    subheader: subheader,
    actions: actions,
    onClose: onClose || modalContext.onClose,
    size: size
  }, children));
};
//# sourceMappingURL=ModalCard.js.map