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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _adaptivityContext = require("../../components/AdaptivityProvider/AdaptivityContext");
var _usePlatform = require("../usePlatform");
var _constants = require("./constants");
var _helpers = require("./helpers");
var useAdaptivityConditionalRender = function() {
    var _React_useContext = _react.useContext(_adaptivityContext.AdaptivityContext), sizeXContext = _React_useContext.sizeX, sizeYContext = _React_useContext.sizeY, viewWidthContext = _React_useContext.viewWidth, viewHeightContext = _React_useContext.viewHeight, hasPointerContext = _React_useContext.hasPointer;
    var platform = (0, _usePlatform.usePlatform)();
    return _react.useMemo(function() {
        var sizeX = (0, _helpers.getAdaptiveSizeType)(sizeXContext, _constants.sizeXCompactClassNames, _constants.sizeXRegularClassNames);
        var sizeY = (0, _helpers.getAdaptiveSizeType)(sizeYContext, _constants.sizeYCompactClassNames, _constants.sizeYRegularClassNames);
        var viewWidth = (0, _helpers.getAdaptiveViewWidth)(viewWidthContext, _constants.viewWidthClassNames);
        var deviceType = (0, _helpers.getAdaptiveDeviceType)(viewWidthContext, viewHeightContext, hasPointerContext, platform, _constants.deviceTypeClassNames);
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