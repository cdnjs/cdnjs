import * as React from 'react';
import vkBridge from '@vkontakte/vk-bridge';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
let initialState = {
    bottom: null,
    top: null,
    left: null,
    right: null
};
function resolveInsets(e) {
    const { type, data } = e.detail;
    switch(type){
        case 'VKWebAppUpdateConfig':
        case 'VKWebAppUpdateInsets':
            const { insets } = data;
            if (insets) {
                return {
                    ...insets,
                    bottom: insets.bottom > 150 ? 0 : insets.bottom
                };
            }
    }
    return null;
}
/**
 * TODO [>=6]: удалить хук (#5049)
 * @deprecated v5.8.0
 */ export function useInsets(disabled = false) {
    const [insets, setInsets] = React.useState(initialState);
    useIsomorphicLayoutEffect(()=>{
        if (disabled) {
            return;
        }
        const handleBridgeEvent = (event)=>{
            const insets = resolveInsets(event);
            if (insets) {
                setInsets(insets);
            }
        };
        vkBridge.subscribe(handleBridgeEvent);
        return ()=>{
            vkBridge.unsubscribe(handleBridgeEvent);
        };
    }, [
        disabled
    ]);
    return insets;
}

//# sourceMappingURL=useInsets.js.map