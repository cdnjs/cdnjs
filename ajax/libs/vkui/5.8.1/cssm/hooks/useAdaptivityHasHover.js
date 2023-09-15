import * as React from 'react';
import { hasHover as hasHoverLib } from '@vkontakte/vkjs';
import { AdaptivityContext } from '../components/AdaptivityProvider/AdaptivityContext';
import { useIsClient } from './useIsClient';
export function useAdaptivityHasHover(deferDetect = true) {
    const { hasHover: hasHoverContext } = React.useContext(AdaptivityContext);
    const hasHover = hasHoverContext === undefined ? hasHoverLib : hasHoverContext;
    const needTwoPassRendering = deferDetect || hasHoverContext === undefined;
    const isClient = useIsClient(!needTwoPassRendering);
    if (!isClient || hasHoverContext !== undefined) {
        return hasHoverContext;
    }
    return hasHover;
}

//# sourceMappingURL=useAdaptivityHasHover.js.map