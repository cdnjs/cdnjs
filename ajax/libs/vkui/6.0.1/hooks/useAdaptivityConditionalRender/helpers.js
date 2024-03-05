import { tryToCheckIsDesktop, ViewWidth } from '../../lib/adaptivity';
export const getAdaptiveSizeType = (type, compactClassNames, regularClassNames)=>{
    return {
        compact: type === undefined ? compactClassNames.mq : type === 'compact' ? compactClassNames[type] : false,
        regular: type === undefined ? regularClassNames.mq : type === 'regular' ? regularClassNames[type] : false
    };
};
export const getAdaptiveViewWidth = (viewWidth, viewWidthClassNames)=>{
    return {
        tabletMinus: viewWidth === undefined ? viewWidthClassNames.tabletMinus.mq : viewWidth < ViewWidth.TABLET ? viewWidthClassNames.tabletMinus.forced : false,
        tabletPlus: viewWidth === undefined ? viewWidthClassNames.tabletPlus.mq : viewWidth >= ViewWidth.TABLET ? viewWidthClassNames.tabletPlus.forced : false
    };
};
export const getAdaptiveDeviceType = (viewWidth, viewHeight, hasPointer, platform, deviceTypeClassNames)=>{
    const isDesktop = tryToCheckIsDesktop(viewWidth, viewHeight, hasPointer, platform);
    if (isDesktop === null) {
        return {
            mobile: deviceTypeClassNames.mobile.mq,
            desktop: deviceTypeClassNames.desktop.mq
        };
    }
    if (isDesktop) {
        return {
            mobile: false,
            desktop: deviceTypeClassNames.desktop.forced
        };
    }
    return {
        mobile: deviceTypeClassNames.mobile.forced,
        desktop: false
    };
};

//# sourceMappingURL=helpers.js.map