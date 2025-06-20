'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useId } from "react";
import { ModalContext } from "../../context/ModalContext.js";
import { getNavId } from "../../lib/getNavId.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { useModalManager } from "../ModalRoot/useModalManager.js";
import { ModalCardInternal } from "./ModalCardInternal.js";
const warn = warnOnce('ModalCard');
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCard
 */ export const ModalCard = ({ id: idProp, nav, open = false, modalOverlayTestId, noFocusToDialog, onOpen, onOpened, onClose, onClosed, keepMounted = false, ...restProps })=>{
    const generatingId = useId();
    const id = getNavId({
        nav,
        id: idProp
    }, warn) || generatingId;
    const { mounted, shouldPreserveSnapPoint: excludedProp, ...resolvedProps } = useModalManager({
        id,
        open,
        keepMounted,
        modalOverlayTestId,
        noFocusToDialog,
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