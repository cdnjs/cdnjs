"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getAdaptiveDeviceType: function() {
        return getAdaptiveDeviceType;
    },
    getAdaptiveSizeType: function() {
        return getAdaptiveSizeType;
    },
    getAdaptiveViewWidth: function() {
        return getAdaptiveViewWidth;
    }
});
var _adaptivity = require("../../lib/adaptivity");
var getAdaptiveSizeType = function(type, compactClassNames, regularClassNames) {
    return {
        compact: type === undefined ? compactClassNames.mq : type === _adaptivity.SizeType.COMPACT ? compactClassNames[type] : false,
        regular: type === undefined ? regularClassNames.mq : type === _adaptivity.SizeType.REGULAR ? regularClassNames[type] : false
    };
};
var getAdaptiveViewWidth = function(viewWidth, viewWidthClassNames) {
    return {
        tabletMinus: viewWidth === undefined ? viewWidthClassNames.tabletMinus.mq : viewWidth < _adaptivity.ViewWidth.TABLET ? viewWidthClassNames.tabletMinus.forced : false,
        tabletPlus: viewWidth === undefined ? viewWidthClassNames.tabletPlus.mq : viewWidth >= _adaptivity.ViewWidth.TABLET ? viewWidthClassNames.tabletPlus.forced : false
    };
};
var getAdaptiveDeviceType = function(viewWidth, viewHeight, hasPointer, platform, deviceTypeClassNames) {
    var isDesktop = (0, _adaptivity.tryToCheckIsDesktop)(viewWidth, viewHeight, hasPointer, platform);
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