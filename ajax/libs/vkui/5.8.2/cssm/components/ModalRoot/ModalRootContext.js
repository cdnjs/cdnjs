import * as React from 'react';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
export const ModalRootContext = /*#__PURE__*/ React.createContext({
    updateModalHeight: ()=>undefined,
    registerModal: ()=>undefined,
    isInsideModal: false
});
/**
 * All referenced elements must be static
 */ export function useModalRegistry(id, type) {
    const modalContext = React.useContext(ModalRootContext);
    const elements = React.useRef({}).current;
    useIsomorphicLayoutEffect(()=>{
        if (id !== undefined) {
            modalContext.registerModal({
                ...elements,
                type,
                id
            });
            // unset refs on  unmount to prevent leak
            const reset = Object.keys(elements).reduce((acc, k)=>({
                    ...acc,
                    [k]: null
                }), {
                type,
                id
            });
            return ()=>modalContext.registerModal(reset);
        }
        return undefined;
    }, []);
    const refs = React.useRef({
        modalElement: (e)=>elements.modalElement = e,
        innerElement: (e)=>elements.innerElement = e,
        headerElement: (e)=>elements.headerElement = e,
        contentElement: (e)=>elements.contentElement = e,
        bottomInset: (e)=>elements.bottomInset = e
    }).current;
    return {
        refs
    };
}

//# sourceMappingURL=ModalRootContext.js.map