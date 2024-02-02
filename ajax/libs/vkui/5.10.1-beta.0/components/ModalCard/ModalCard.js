import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries";
import { useExternRef } from "../../hooks/useExternRef";
import { usePlatform } from "../../hooks/usePlatform";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
import { ModalCardBase } from "../ModalCardBase/ModalCardBase";
import { ModalRootContext, useModalRegistry } from "../ModalRoot/ModalRootContext";
import { ModalType } from "../ModalRoot/types";
import { RootComponent } from "../RootComponent/RootComponent";
var platformClassNames = {
    ios: "vkuiModalCard--ios",
    android: "vkuiModalCard--android",
    vkcom: "vkuiModalCard--vkcom"
};
var warn = warnOnce("ModalCard");
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCard
 */ export var ModalCard = function(_param) {
    var icon = _param.icon, header = _param.header, subheader = _param.subheader, children = _param.children, actions = _param.actions, onClose = _param.onClose, nav = _param.nav, id = _param.id, size = _param.size, modalDismissButtonTestId = _param.modalDismissButtonTestId, getRootRef = _param.getRootRef, dismissButtonMode = _param.dismissButtonMode, dismissLabel = _param.dismissLabel, restProps = _object_without_properties(_param, [
        "icon",
        "header",
        "subheader",
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
    var isDesktop = useAdaptivityWithJSMediaQueries().isDesktop;
    var platform = usePlatform();
    var modalContext = React.useContext(ModalRootContext);
    var refs = useModalRegistry(getNavId({
        nav: nav,
        id: id
    }, warn), ModalType.CARD).refs;
    var rootRef = useExternRef(getRootRef, refs.modalElement);
    var contextValue = React.useMemo(function() {
        return {
            labelId: "".concat(id, "-label")
        };
    }, [
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
        subheader: subheader,
        actions: actions,
        onClose: onClose || modalContext.onClose,
        size: size,
        modalDismissButtonTestId: modalDismissButtonTestId,
        dismissButtonMode: dismissButtonMode,
        dismissLabel: dismissLabel
    }, children));
};

//# sourceMappingURL=ModalCard.js.map