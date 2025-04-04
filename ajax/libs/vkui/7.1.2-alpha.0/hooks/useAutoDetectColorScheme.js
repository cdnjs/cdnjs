import * as React from "react";
import { noop } from "@vkontakte/vkjs";
import { ColorScheme } from "../lib/colorScheme/index.js";
import { useDOM } from "../lib/dom.js";
import { matchMediaListAddListener, matchMediaListRemoveListener } from "../lib/matchMedia.js";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect.js";
/**
 * @private
 */ export const useAutoDetectColorScheme = (colorSchemeProp)=>{
    const { window } = useDOM();
    const [colorScheme, setColorScheme] = React.useState(colorSchemeProp || ColorScheme.LIGHT);
    useIsomorphicLayoutEffect(()=>{
        if (colorSchemeProp) {
            setColorScheme(colorSchemeProp);
            return noop;
        }
        const mediaQuery = window ? window.matchMedia('(prefers-color-scheme: dark)') : undefined;
        if (!mediaQuery) {
            return noop;
        }
        const check = (event)=>{
            // eslint-disable-next-line no-restricted-properties
            setColorScheme(event.matches ? ColorScheme.DARK : ColorScheme.LIGHT);
        };
        check(mediaQuery);
        matchMediaListAddListener(mediaQuery, check);
        return ()=>matchMediaListRemoveListener(mediaQuery, check);
    }, [
        window,
        colorSchemeProp
    ]);
    return colorScheme;
};

//# sourceMappingURL=useAutoDetectColorScheme.js.map