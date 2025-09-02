'use client';
import { createContext } from "react";
import { noop } from "@vkontakte/vkjs";
/**
 * Сохраняем `ref` компонента `ModalOverlay` из `ModalRoot` в контекст, чтобы можно было пробросить
 * его до `ModalPage` и `ModalCard`.
 *
 * @private
 */ export const ModalRootOverlayContext = /*#__PURE__*/ createContext({
    current: null
});
export const ModalRootContext = /*#__PURE__*/ createContext({
    updateModalHeight: noop,
    registerModal: noop,
    isInsideModal: false
});

//# sourceMappingURL=ModalRootContext.js.map