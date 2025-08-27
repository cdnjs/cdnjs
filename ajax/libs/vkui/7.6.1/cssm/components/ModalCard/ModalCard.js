'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ModalContext } from "../../context/ModalContext.js";
import { useModalManager } from "../ModalRoot/useModalManager.js";
import { ModalCardInternal } from "./ModalCardInternal.js";
/**
 * @see https://vkui.io/components/modal-card
 */ export const ModalCard = ({ id: idProp, nav, open = false, modalOverlayTestId, noFocusToDialog, onOpen, onOpened, onClose, onClosed, keepMounted = false, disableModalOverlay, ...restProps })=>{
    const { mounted, shouldPreserveSnapPoint: excludedProp, id, ...resolvedProps } = useModalManager({
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
    });
    if (mounted === false) {
        return null;
    }
    return /*#__PURE__*/ _jsx(ModalContext.Provider, {
        value: id,
        children: /*#__PURE__*/ _jsx(ModalCardInternal, {
            id: id,
            "aria-labelledby": `${id}-label`,
            titleId: `${id}-label`,
            ...resolvedProps,
            ...restProps
        })
    });
};

//# sourceMappingURL=ModalCard.js.map