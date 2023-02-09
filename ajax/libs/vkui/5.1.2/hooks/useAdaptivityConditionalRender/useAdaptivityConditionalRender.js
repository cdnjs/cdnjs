import * as React from 'react';
import { AdaptivityContext } from '../../components/AdaptivityProvider/AdaptivityContext';
import { usePlatform } from '../usePlatform';
import { sizeXCompactClassNames, sizeXRegularClassNames, sizeYCompactClassNames, sizeYRegularClassNames, viewWidthClassNames, deviceTypeClassNames } from './constants';
import { getAdaptiveSizeType, getAdaptiveViewWidth, getAdaptiveDeviceType } from './helpers';
export var useAdaptivityConditionalRender = function useAdaptivityConditionalRender() {
  var _React$useContext = React.useContext(AdaptivityContext),
    sizeXContext = _React$useContext.sizeX,
    sizeYContext = _React$useContext.sizeY,
    viewWidthContext = _React$useContext.viewWidth,
    viewHeightContext = _React$useContext.viewHeight,
    hasPointerContext = _React$useContext.hasPointer;
  var platform = usePlatform();
  return React.useMemo(function () {
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
  }, [sizeXContext, sizeYContext, viewWidthContext, viewHeightContext, hasPointerContext, platform]);
};
//# sourceMappingURL=useAdaptivityConditionalRender.js.map