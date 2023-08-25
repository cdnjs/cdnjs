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
vkBridge.subscribe((e)=>{
    const insets = resolveInsets(e);
    if (insets) {
        initialState = insets;
    }
});
export function useInsets() {
    const [insets, setInsets] = React.useState(initialState);
    useIsomorphicLayoutEffect(()=>{
        function connectListener(e) {
            const insets = resolveInsets(e);
            if (insets) {
                setInsets(insets);
            }
        }
        vkBridge.subscribe(connectListener);
        return ()=>{
            vkBridge.unsubscribe(connectListener);
        };
    }, []);
    return insets;
}

//# sourceMappingURL=useInsets.js.map