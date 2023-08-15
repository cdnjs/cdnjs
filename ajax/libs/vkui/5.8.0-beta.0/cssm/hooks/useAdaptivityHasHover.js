import * as React from 'react';
import { hasHover as hasHoverLib } from '@vkontakte/vkjs';
import { AdaptivityContext } from '../components/AdaptivityProvider/AdaptivityContext';
import { useIsClient } from './useIsClient';
export function useAdaptivityHasHover(deferDetect = true) {
    const { hasHover: hasHoverContext } = React.useContext(AdaptivityContext);
    const hasHover = hasHoverContext === undefined ? hasHoverLib : hasHoverContext;
    const isClient = useIsClient(!deferDetect);
    if (!isClient) {
        return undefined;
    }
    return hasHover;
}

//# sourceMappingURL=useAdaptivityHasHover.js.map