import * as React from "react";
import { AdaptivityContext } from "../../components/AdaptivityProvider/AdaptivityContext";
import { usePlatform } from "../usePlatform";
import { deviceTypeClassNames, sizeXCompactClassNames, sizeXRegularClassNames, sizeYCompactClassNames, sizeYRegularClassNames, viewWidthClassNames } from "./constants";
import { getAdaptiveDeviceType, getAdaptiveSizeType, getAdaptiveViewWidth } from "./helpers";
export var useAdaptivityConditionalRender = function() {
    var _React_useContext = React.useContext(AdaptivityContext), sizeXContext = _React_useContext.sizeX, sizeYContext = _React_useContext.sizeY, viewWidthContext = _React_useContext.viewWidth, viewHeightContext = _React_useContext.viewHeight, hasPointerContext = _React_useContext.hasPointer;
    var platform = usePlatform();
    return React.useMemo(function() {
        var sizeX = getAdaptiveSizeType(sizeXContext, sizeXCompactClassNames, sizeXRegularClassNames);
        var sizeY = getAdaptiveSizeType(sizeYContext, sizeYCompactClassNames, sizeYRegularClassNames);
        var viewWidth = getAdaptiveViewWidth(viewWidthContext, viewWidthClassNames);
        var deviceType = getAdaptiveDeviceType(viewWidthContext, viewHeightContext, hasPointerContext, platform, deviceTypeClassNames);
        return {
            sizeX: sizeX,
            sizeY: sizeY,
            viewWidth: viewWidth,
            deviceType: deviceType
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