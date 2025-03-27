'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { noop } from "@vkontakte/vkjs";
import { warnOnce } from "../../lib/warnOnce.js";
import { AppRootPortal } from "../AppRoot/AppRootPortal.js";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay.js";
import { ModalRootContext, ModalRootOverlayContext } from "./ModalRootContext.js";
const warn = warnOnce('ModalRoot');
/**
 * @see https://vkcom.github.io/VKUI/#/ModalRoot
 */ export const ModalRoot = ({ activeModal, children, modalOverlayTestId, noFocusToDialog, usePortal, onOpen, onOpened, onClose, onClosed })=>{
    const contextValue = React.useMemo(()=>({
            isInsideModal: true,
            // base props
            activeModal,
            modalOverlayTestId,
            noFocusToDialog,
            // callbacks
            onOpen,
            onOpened,
            onClose,
            onClosed,
            // TODO [>=8] Удалить метод
            updateModalHeight: /* istanbul ignore next: deprecated */ process.env.NODE_ENV === 'development' ? ()=>{
                warn('Метод updateModalHeight() устарел и будет удалён в VKUI v8');
            } : noop,
            // TODO [>=8] Удалить метод
            registerModal: /* istanbul ignore next: deprecated */ process.env.NODE_ENV === 'development' ? ()=>{
                warn('Метод registerModal() устарел и будет удалён в VKUI v8');
            } : noop
        }), [
        activeModal,
        modalOverlayTestId,
        noFocusToDialog,
        onClose,
        onClosed,
        onOpen,
        onOpened
    ]);
    const modalOverlayRef = React.useRef(null);
    return /*#__PURE__*/ _jsx(AppRootPortal, {
        usePortal: usePortal,
        children: /*#__PURE__*/ _jsx(ModalRootContext.Provider, {
            value: contextValue,
            children: /*#__PURE__*/ _jsxs(ModalRootOverlayContext.Provider, {
                value: modalOverlayRef,
                children: [
                    /*#__PURE__*/ _jsx(ModalOverlay, {
                        position: "fixed",
                        visible: typeof activeModal === 'string',
                        getRootRef: modalOverlayRef
                    }),
                    children
                ]
            })
        })
    });
};

//# sourceMappingURL=ModalRoot.js.map