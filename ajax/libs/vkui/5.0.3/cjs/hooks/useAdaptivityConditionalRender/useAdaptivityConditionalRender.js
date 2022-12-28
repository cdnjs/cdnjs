"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAdaptivityConditionalRender = void 0;
var React = _interopRequireWildcard(require("react"));
var _AdaptivityContext = require("../../components/AdaptivityProvider/AdaptivityContext");
var _usePlatform = require("../usePlatform");
var _constants = require("./constants");
var _helpers = require("./helpers");
var useAdaptivityConditionalRender = function useAdaptivityConditionalRender() {
  var _React$useContext = React.useContext(_AdaptivityContext.AdaptivityContext),
    sizeXContext = _React$useContext.sizeX,
    sizeYContext = _React$useContext.sizeY,
    viewWidthContext = _React$useContext.viewWidth,
    viewHeightContext = _React$useContext.viewHeight,
    hasPointerContext = _React$useContext.hasPointer;
  var platform = (0, _usePlatform.usePlatform)();
  return React.useMemo(function () {
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
  }, [sizeXContext, sizeYContext, viewWidthContext, viewHeightContext, hasPointerContext, platform]);
};
exports.useAdaptivityConditionalRender = useAdaptivityConditionalRender;
//# sourceMappingURL=useAdaptivityConditionalRender.js.map