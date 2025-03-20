import * as React from 'react';
import { hasMouse as hasPointerLib } from '@vkontakte/vkjs';
import { AdaptivityContext } from '../components/AdaptivityProvider/AdaptivityContext';
import { useIsClient } from './useIsClient';
export function useAdaptivityHasPointer(deferDetect = true) {
    const { hasPointer: hasPointerContext } = React.useContext(AdaptivityContext);
    const needTwoPassRendering = deferDetect || hasPointerContext === undefined;
    const isClient = useIsClient(!needTwoPassRendering);
    if (!isClient || hasPointerContext !== undefined) {
        return hasPointerContext;
    }
    return hasPointerLib;
}

//# sourceMappingURL=useAdaptivityHasPointer.js.map