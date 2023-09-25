import * as React from 'react';
import { AdaptivityContext } from '../../components/AdaptivityProvider/AdaptivityContext';
import { usePlatform } from '../usePlatform';
import { deviceTypeClassNames, sizeXCompactClassNames, sizeXRegularClassNames, sizeYCompactClassNames, sizeYRegularClassNames, viewWidthClassNames } from './constants';
import { getAdaptiveDeviceType, getAdaptiveSizeType, getAdaptiveViewWidth } from './helpers';
export const useAdaptivityConditionalRender = ()=>{
    const { sizeX: sizeXContext, sizeY: sizeYContext, viewWidth: viewWidthContext, viewHeight: viewHeightContext, hasPointer: hasPointerContext } = React.useContext(AdaptivityContext);
    const platform = usePlatform();
    return React.useMemo(()=>{
        const sizeX = getAdaptiveSizeType(sizeXContext, sizeXCompactClassNames, sizeXRegularClassNames);
        const sizeY = getAdaptiveSizeType(sizeYContext, sizeYCompactClassNames, sizeYRegularClassNames);
        const viewWidth = getAdaptiveViewWidth(viewWidthContext, viewWidthClassNames);
        const deviceType = getAdaptiveDeviceType(viewWidthContext, viewHeightContext, hasPointerContext, platform, deviceTypeClassNames);
        return {
            sizeX,
            sizeY,
            viewWidth,
            deviceType
        };
    }, [
        sizeXContext,
        sizeYContext,
        viewWidthContext,
        viewHeightContext,
        hasPointerContext,
        platform
    ]);
};

//# sourceMappingURL=useAdaptivityConditionalRender.js.map