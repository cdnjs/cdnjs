"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useAdaptivityConditionalRender", {
    enumerable: true,
    get: function() {
        return useAdaptivityConditionalRender;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _AdaptivityContext = require("../../components/AdaptivityProvider/AdaptivityContext");
const _usePlatform = require("../usePlatform");
const _constants = require("./constants");
const _helpers = require("./helpers");
const useAdaptivityConditionalRender = ()=>{
    const { sizeX: sizeXContext, sizeY: sizeYContext, viewWidth: viewWidthContext, viewHeight: viewHeightContext, hasPointer: hasPointerContext } = _react.useContext(_AdaptivityContext.AdaptivityContext);
    const platform = (0, _usePlatform.usePlatform)();
    return _react.useMemo(()=>{
        const sizeX = (0, _helpers.getAdaptiveSizeType)(sizeXContext, _constants.sizeXCompactClassNames, _constants.sizeXRegularClassNames);
        const sizeY = (0, _helpers.getAdaptiveSizeType)(sizeYContext, _constants.sizeYCompactClassNames, _constants.sizeYRegularClassNames);
        const viewWidth = (0, _helpers.getAdaptiveViewWidth)(viewWidthContext, _constants.viewWidthClassNames);
        const deviceType = (0, _helpers.getAdaptiveDeviceType)(viewWidthContext, viewHeightContext, hasPointerContext, platform, _constants.deviceTypeClassNames);
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