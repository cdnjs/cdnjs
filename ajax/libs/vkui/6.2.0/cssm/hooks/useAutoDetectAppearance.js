import * as React from 'react';
import { noop } from '@vkontakte/vkjs';
import { Appearance } from '../lib/appearance';
import { useDOM } from '../lib/dom';
import { matchMediaListAddListener, matchMediaListRemoveListener } from '../lib/matchMedia';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
/**
 * @private
 */ export const useAutoDetectAppearance = (appearanceProp)=>{
    const { window } = useDOM();
    const [appearance, setAppearance] = React.useState(appearanceProp || Appearance.LIGHT);
    useIsomorphicLayoutEffect(()=>{
        if (appearanceProp) {
            setAppearance(appearanceProp);
            return noop;
        }
        const mediaQuery = window ? window.matchMedia('(prefers-color-scheme: dark)') : undefined;
        if (!mediaQuery) {
            return noop;
        }
        const check = (event)=>{
            // eslint-disable-next-line no-restricted-properties
            setAppearance(event.matches ? Appearance.DARK : Appearance.LIGHT);
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