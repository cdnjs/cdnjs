import * as React from 'react';
import vkBridge from '@vkontakte/vk-bridge';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
let initialState = {
    type: '',
    viewportWidth: 0,
    viewportHeight: 0
};
function resolveAdaptivity(e) {
    const { type, data } = e.detail;
    if (type !== 'VKWebAppUpdateConfig' || !data) {
        return null;
    }
    const { adaptivity, viewport_width: viewportWidth, viewport_height: viewportHeight } = data;
    const bridgeAdaptivity = {
        type: '',
        viewportWidth: isFinite(viewportWidth) ? +viewportWidth : 0,
        viewportHeight: isFinite(viewportHeight) ? +viewportHeight : 0
    };
    switch(adaptivity){
        case 'force_mobile':
        case 'force_mobile_compact':
        case 'adaptive':
            bridgeAdaptivity.type = adaptivity;
    }
    return bridgeAdaptivity;
}
vkBridge.subscribe((e)=>{
    const bridgeAdaptivity = resolveAdaptivity(e);
    if (bridgeAdaptivity) {
        initialState = bridgeAdaptivity;
    }
});
export function useBridgeAdaptivity() {
    const [bridgeAdaptivity, setBridgeAdaptivity] = React.useState(initialState);
    useIsomorphicLayoutEffect(()=>{
        function bridgeListener(e) {
            const newBridgeAdaptivity = resolveAdaptivity(e);
            if (newBridgeAdaptivity) {
                setBridgeAdaptivity(newBridgeAdaptivity);
            }
        }
        vkBridge.subscribe(bridgeListener);
        return ()=>{
            vkBridge.unsubscribe(bridgeListener);
        };
    }, []);
    return bridgeAdaptivity;
}

//# sourceMappingURL=useBridgeAdaptivity.js.map