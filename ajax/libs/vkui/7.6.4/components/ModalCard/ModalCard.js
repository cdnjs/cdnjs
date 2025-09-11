'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { ModalContext } from "../../context/ModalContext.js";
import { useModalManager } from "../ModalRoot/useModalManager.js";
import { ModalCardInternal } from "./ModalCardInternal.js";
/**
 * @see https://vkui.io/components/modal-card
 */ export const ModalCard = (_param)=>{
    var { id: idProp, nav, open = false, modalOverlayTestId, noFocusToDialog, onOpen, onOpened, onClose, onClosed, keepMounted = false, disableModalOverlay } = _param, restProps = _object_without_properties(_param, [
        "id",
        "nav",
        "open",
        "modalOverlayTestId",
        "noFocusToDialog",
        "onOpen",
        "onOpened",
        "onClose",
        "onClosed",
        "keepMounted",
        "disableModalOverlay"
    ]);
    const _useModalManager = useModalManager({
        id: nav || idProp,
        open,
        keepMounted,
        modalOverlayTestId,
        noFocusToDialog,
        disableModalOverlay,
        onOpen,
        onOpened,
        onClose,
        onClosed
    }), { mounted, shouldPreserveSnapPoint: excludedProp, id } = _useModalManager, resolvedProps = _object_without_properties(_useModalManager, [
        "mounted",
        "shouldPreserveSnapPoint",
        "id"
    ]);
    if (mounted === false) {
        return null;
    }
    return /*#__PURE__*/ _jsx(ModalContext.Provider, {
        value: id,
        children: /*#__PURE__*/ _jsx(ModalCardInternal, _object_spread({
            id: id,
            "aria-labelledby": `${id}-label`,
            titleId: `${id}-label`
        }, resolvedProps, restProps))
    });
};

//# sourceMappingURL=ModalCard.js.map