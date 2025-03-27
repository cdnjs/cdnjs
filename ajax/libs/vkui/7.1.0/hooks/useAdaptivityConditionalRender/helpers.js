import { tryToCheckIsDesktop, ViewWidth } from "../../lib/adaptivity/index.js";
import { forcedProps } from "./constants.js";
export const getAdaptiveSizeType = (type, compactMediaQueryProps, regularMediaQueryProps)=>{
    return {
        compact: type === undefined ? compactMediaQueryProps : type === 'compact' ? forcedProps : false,
        regular: type === undefined ? regularMediaQueryProps : type === 'regular' ? forcedProps : false
    };
};
export const getAdaptiveViewWidth = (viewWidth, viewWidthMapProps)=>{
    return {
        tabletMinus: viewWidth === undefined ? viewWidthMapProps.tabletMinus : viewWidth < ViewWidth.TABLET ? forcedProps : false,
        tabletPlus: viewWidth === undefined ? viewWidthMapProps.tabletPlus : viewWidth >= ViewWidth.TABLET ? forcedProps : false
    };
};
export const getAdaptiveDeviceType = (viewWidth, viewHeight, hasPointer, platform, deviceTypeMapProps)=>{
    const isDesktop = tryToCheckIsDesktop(viewWidth, viewHeight, hasPointer, platform);
    if (isDesktop === null) {
        return {
            mobile: deviceTypeMapProps.mobile,
            desktop: deviceTypeMapProps.desktop
        };
    }
    if (isDesktop) {
        return {
            mobile: false,
            desktop: forcedProps
        };
    }
    return {
        mobile: forcedProps,
        desktop: false
    };
};

//# sourceMappingURL=helpers.js.map