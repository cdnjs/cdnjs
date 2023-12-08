import * as React from 'react';
import { noop } from '@vkontakte/vkjs';
import { useDOM } from '../lib/dom';
import { matchMediaListAddListener, matchMediaListRemoveListener } from '../lib/matchMedia';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
/**
 * @private
 */ export const useAutoDetectAppearance = (appearanceProp)=>{
    const { window } = useDOM();
    const [appearance, setAppearance] = React.useState(()=>{
        if (appearanceProp) {
            return appearanceProp;
        }
        // eslint-disable-next-line no-restricted-properties
        return window.matchMedia('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
    });
    useIsomorphicLayoutEffect(()=>{
        if (appearanceProp) {
            setAppearance(appearanceProp);
            return noop;
        }
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (!mediaQuery) {
            return noop;
        }
        const check = (event)=>{
            // eslint-disable-next-line no-restricted-properties
            setAppearance(event.matches ? 'dark' : 'light');
        };
        check(mediaQuery);
        matchMediaListAddListener(mediaQuery, check);
        return ()=>matchMediaListRemoveListener(mediaQuery, check);
    }, [
        window,
        appearanceProp
    ]);
    return appearance;
};

//# sourceMappingURL=useAutoDetectAppearance.js.map