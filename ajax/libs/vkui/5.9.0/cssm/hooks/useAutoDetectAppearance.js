import * as React from 'react';
import vkBridge from '@vkontakte/vk-bridge';
import { noop } from '@vkontakte/vkjs';
import { resolveAppearance } from '../helpers/appearance';
import { useDOM } from '../lib/dom';
import { matchMediaListAddListener, matchMediaListRemoveListener } from '../lib/matchMedia';
function autoDetectAppearanceByBridge(setAppearance, onDetectAppearanceByBridge) {
    function updateAppearance(data) {
        const initialAppearance = resolveAppearance(data);
        if (initialAppearance) {
            onDetectAppearanceByBridge();
            setAppearance(initialAppearance);
        }
    }
    function bridgeListener(e) {
        const { type, data } = e.detail;
        if (type !== 'VKWebAppUpdateConfig') {
            return;
        }
        updateAppearance(data);
    }
    vkBridge.subscribe(bridgeListener);
    vkBridge.send('VKWebAppGetConfig').then(updateAppearance).catch(console.error);
    return ()=>vkBridge.unsubscribe(bridgeListener);
}
function autoDetectAppearance(window, setAppearance) {
    const mediaQuery = window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery === undefined) {
        return noop;
    }
    const check = (event)=>{
        // eslint-disable-next-line no-restricted-properties
        setAppearance(event.matches ? 'dark' : 'light');
    };
    check(mediaQuery);
    matchMediaListAddListener(mediaQuery, check);
    return ()=>matchMediaListRemoveListener(mediaQuery, check);
}
/**
 * TODO [>=6]: удалить хук (#5049)
 * @deprecated v5.8.0
 */ export const useAutoDetectAppearance = (appearanceProp, onDetectAppearanceByBridge)=>{
    const { window } = useDOM();
    const onceDetectAppearanceByBridge = React.useRef(()=>{
        onDetectAppearanceByBridge && onDetectAppearanceByBridge();
        onceDetectAppearanceByBridge.current = noop;
    });
    const [appearance, setAppearance] = React.useState(()=>{
        if (appearanceProp) {
            return appearanceProp;
        }
        const mediaQuery = window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
        // eslint-disable-next-line no-restricted-properties
        return mediaQuery?.matches ? 'dark' : 'light';
    });
    React.useEffect(()=>{
        if (appearanceProp) {
            setAppearance(appearanceProp);
            return noop;
        }
        if (vkBridge.isEmbedded()) {
            return autoDetectAppearanceByBridge(setAppearance, onceDetectAppearanceByBridge.current);
        }
        return autoDetectAppearance(window, setAppearance);
    }, [
        window,
        appearanceProp
    ]);
    return appearance;
};

//# sourceMappingURL=useAutoDetectAppearance.js.map