import * as React from 'react';
import { hasMouse as hasPointerLib } from '@vkontakte/vkjs';
import { AdaptivityContext } from '../components/AdaptivityProvider/AdaptivityContext';
import { useIsClient } from './useIsClient';
export function useAdaptivityHasPointer(deferDetect = true) {
    const { hasPointer: hasPointerContext } = React.useContext(AdaptivityContext);
    const hasPointer = hasPointerContext === undefined ? hasPointerLib : hasPointerContext;
    const isClient = useIsClient(!deferDetect);
    if (!isClient) {
        return undefined;
    }
    return hasPointer;
}

//# sourceMappingURL=useAdaptivityHasPointer.js.map