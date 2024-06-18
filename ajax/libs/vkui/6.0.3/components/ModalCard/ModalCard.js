import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { getNavId } from '../../lib/getNavId';
import { warnOnce } from '../../lib/warnOnce';
import { ModalCardBase } from '../ModalCardBase/ModalCardBase';
import { ModalRootContext, useModalRegistry } from '../ModalRoot/ModalRootContext';
import { RootComponent } from '../RootComponent/RootComponent';
const platformClassNames = {
    ios: "vkuiModalCard--ios",
    android: "vkuiModalCard--android",
    vkcom: "vkuiModalCard--vkcom"
};
const warn = warnOnce('ModalCard');
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCard
 */ export const ModalCard = (_param)=>{
    var { icon, header, headerComponent, subheader, subheaderComponent, children, actions, onClose, nav, id, size, modalDismissButtonTestId, getRootRef, dismissButtonMode, dismissLabel } = _param, restProps = _object_without_properties(_param, [
        "icon",
        "header",
        "headerComponent",
        "subheader",
        "subheaderComponent",
        "children",
        "actions",
        "onClose",
        "nav",
        "id",
        "size",
        "modalDismissButtonTestId",
        "getRootRef",
        "dismissButtonMode",
        "dismissLabel"
    ]);
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    const platform = usePlatform();
    const modalContext = React.useContext(ModalRootContext);
    const { refs } = useModalRegistry(getNavId({
        nav,
        id
    }, warn), 'card');
    const rootRef = useExternRef(getRootRef, refs.modalElement);
    const contextValue = React.useMemo(()=>({
            labelId: `${id}-label`
        }), [
        id
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        getRootRef: rootRef,
        tabIndex: -1,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": contextValue.labelId,
        id: id,
        baseClassName: classNames("vkuiModalCard", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, isDesktop && "vkuiModalCard--desktop")
    }), /*#__PURE__*/ React.createElement(ModalCardBase, {
        className: "vkuiModalCard__in",
        getRootRef: refs.innerElement,
        icon: icon,
        header: header,
        headerComponent: headerComponent,
        subheader: subheader,
        subheaderComponent: subheaderComponent,
        actions: actions,
        onClose: onClose || modalContext.onClose,
        size: size,
        modalDismissButtonTestId: modalDismissButtonTestId,
        dismissButtonMode: dismissButtonMode,
        dismissLabel: dismissLabel
    }, children));
};

//# sourceMappingURL=ModalCard.js.map