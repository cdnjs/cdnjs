import { useContext, useState } from "react";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay.js";
import { ModalRootContext } from "./ModalRootContext.js";
import { VisuallyHiddenModalOverlay } from "./VisuallyHiddenModalOverlay/VisuallyHiddenModalOverlay.js";
export const useModalManager = ({ id, open, keepMounted, modalOverlayTestId, noFocusToDialog, onOpen, onOpened, onClose, onClosed })=>{
    const context = useContext(ModalRootContext);
    const opened = context.isInsideModal ? context.activeModal === id : open;
    const shouldPreserveSnapPoint = context.isInsideModal ? context.activeModal !== null : false;
    const [unmounted, setUnmounted] = useState(keepMounted ? false : !opened);
    useIsomorphicLayoutEffect(function unsetUnmounted() {
        if (!keepMounted && opened) {
            setUnmounted((prev)=>prev ? false : prev);
        }
    }, [
        opened,
        keepMounted
    ]);
    if (unmounted) {
        return {
            mounted: false,
            shouldPreserveSnapPoint
        };
    }
    return {
        mounted: true,
        open: opened,
        shouldPreserveSnapPoint,
        noFocusToDialog: noFocusToDialog || context.noFocusToDialog,
        modalOverlayTestId: modalOverlayTestId || context.modalOverlayTestId,
        ModalOverlay: context.isInsideModal ? VisuallyHiddenModalOverlay : ModalOverlay,
        onOpen: onOpen || getContextCallback(id, context.onOpen),
        onOpened: onOpened || getContextCallback(id, context.onOpened),
        onClose: onClose || getContextCallback(id, context.onClose),
        onClosed: function handleClosed(...args) {
            if (!keepMounted) {
                setUnmounted(true);
            }
            if (onClosed) {
                onClosed(...args);
            } else {
                var _context_onClosed;
                (_context_onClosed = context.onClosed) === null || _context_onClosed === void 0 ? void 0 : _context_onClosed.call(context, id);
            }
        }
    };
};
function getContextCallback(id, fn) {
    return fn ? ()=>fn(id) : undefined;
}

//# sourceMappingURL=useModalManager.js.map