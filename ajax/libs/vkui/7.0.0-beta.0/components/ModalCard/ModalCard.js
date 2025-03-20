import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { getNavId } from "../../lib/getNavId.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { ModalCardBase } from "../ModalCardBase/ModalCardBase.js";
import { ModalRootContext, useModalRegistry } from "../ModalRoot/ModalRootContext.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
const platformClassNames = {
    ios: "vkuiModalCard__ios",
    android: "vkuiModalCard__android",
    vkcom: "vkuiModalCard__vkcom"
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
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        getRootRef: rootRef,
        tabIndex: -1,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": contextValue.labelId,
        id: id,
        baseClassName: classNames("vkuiModalCard__host", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, isDesktop && "vkuiModalCard__desktop"),
        children: /*#__PURE__*/ _jsx(ModalCardBase, {
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
            dismissLabel: dismissLabel,
            children: children
        })
    }));
};

//# sourceMappingURL=ModalCard.js.map