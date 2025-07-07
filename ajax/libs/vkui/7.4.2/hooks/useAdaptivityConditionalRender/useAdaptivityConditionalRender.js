import * as React from "react";
import { AdaptivityContext } from "../../components/AdaptivityProvider/AdaptivityContext.js";
import { usePlatform } from "../usePlatform.js";
import { deviceTypeMediaQueryMapProps, sizeXCompactMediaQueryProps, sizeXRegularMediaQueryProps, sizeYCompactMediaQueryProps, sizeYRegularMediaQueryProps, viewWidthMediaQueryMapProps } from "./constants.js";
import { getAdaptiveDeviceType, getAdaptiveSizeType, getAdaptiveViewWidth } from "./helpers.js";
export const useAdaptivityConditionalRender = ()=>{
    const { sizeX: sizeXContext, sizeY: sizeYContext, viewWidth: viewWidthContext, viewHeight: viewHeightContext, hasPointer: hasPointerContext } = React.useContext(AdaptivityContext);
    const platform = usePlatform();
    return React.useMemo(()=>{
        const sizeX = getAdaptiveSizeType(sizeXContext, sizeXCompactMediaQueryProps, sizeXRegularMediaQueryProps);
        const sizeY = getAdaptiveSizeType(sizeYContext, sizeYCompactMediaQueryProps, sizeYRegularMediaQueryProps);
        const viewWidth = getAdaptiveViewWidth(viewWidthContext, viewWidthMediaQueryMapProps);
        const deviceType = getAdaptiveDeviceType(viewWidthContext, viewHeightContext, hasPointerContext, platform, deviceTypeMediaQueryMapProps);
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