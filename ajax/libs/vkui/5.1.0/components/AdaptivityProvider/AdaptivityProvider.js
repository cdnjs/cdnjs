import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from 'react';
import { hasMouse as _hasPointer } from '@vkontakte/vkjs';
import { SizeType, ViewWidth, ViewHeight, BREAKPOINTS } from '../../lib/adaptivity';
import { useBridgeAdaptivity } from '../../hooks/useBridgeAdaptivity';
import { AdaptivityContext } from './AdaptivityContext';
/**
 * @see https://vkcom.github.io/VKUI/#/AdaptivityProvider
 */
export var AdaptivityProvider = function AdaptivityProvider(_ref) {
  var viewWidth = _ref.viewWidth,
    viewHeight = _ref.viewHeight,
    sizeX = _ref.sizeX,
    sizeY = _ref.sizeY,
    hasPointer = _ref.hasPointer,
    hasHover = _ref.hasHover,
    children = _ref.children;
  var bridge = useBridgeAdaptivity();
  var _React$useState = React.useState({
      viewWidth: viewWidth,
      viewHeight: viewHeight,
      sizeX: sizeX,
      sizeY: sizeY,
      hasPointer: hasPointer,
      hasHover: hasHover
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    adaptivity = _React$useState2[0],
    setAdaptivity = _React$useState2[1];
  React.useEffect(function () {
    setAdaptivity(calculateAdaptivity({
      viewWidth: viewWidth,
      viewHeight: viewHeight,
      sizeX: sizeX,
      sizeY: sizeY,
      hasPointer: hasPointer,
      hasHover: hasHover
    }, bridge));
  }, [viewWidth, viewHeight, sizeX, sizeY, hasPointer, hasHover, bridge]);
  return /*#__PURE__*/React.createElement(AdaptivityContext.Provider, {
    value: adaptivity
  }, children);
};
function calculateAdaptivity(_ref2, bridge) {
  var viewWidth = _ref2.viewWidth,
    viewHeight = _ref2.viewHeight,
    sizeX = _ref2.sizeX,
    sizeY = _ref2.sizeY,
    hasPointer = _ref2.hasPointer,
    hasHover = _ref2.hasHover;
  if (bridge.type === 'adaptive') {
    var viewportWidth = bridge.viewportWidth,
      viewportHeight = bridge.viewportHeight;
    if (viewportWidth >= BREAKPOINTS.DESKTOP) {
      viewWidth = ViewWidth.DESKTOP;
    } else if (viewportWidth >= BREAKPOINTS.TABLET) {
      viewWidth = ViewWidth.TABLET;
    } else if (viewportWidth >= BREAKPOINTS.SMALL_TABLET) {
      viewWidth = ViewWidth.SMALL_TABLET;
    } else if (viewportWidth >= BREAKPOINTS.MOBILE) {
      viewWidth = ViewWidth.MOBILE;
    } else {
      viewWidth = ViewWidth.SMALL_MOBILE;
    }
    if (viewportHeight >= BREAKPOINTS.MEDIUM_HEIGHT) {
      viewHeight = ViewHeight.MEDIUM;
    } else if (viewportHeight > BREAKPOINTS.MOBILE_LANDSCAPE_HEIGHT) {
      viewHeight = ViewHeight.SMALL;
    } else {
      viewHeight = ViewHeight.EXTRA_SMALL;
    }
    if (viewWidth <= ViewWidth.MOBILE) {
      sizeX = SizeType.COMPACT;
    } else {
      sizeX = SizeType.REGULAR;
    }
    if (viewWidth >= ViewWidth.SMALL_TABLET && _hasPointer || viewHeight <= ViewHeight.EXTRA_SMALL) {
      sizeY = SizeType.COMPACT;
    } else {
      sizeY = SizeType.REGULAR;
    }
  } else if (bridge.type === 'force_mobile' || bridge.type === 'force_mobile_compact') {
    viewWidth = ViewWidth.MOBILE;
    sizeX = SizeType.COMPACT;
    if (bridge.type === 'force_mobile_compact') {
      sizeY = SizeType.COMPACT;
    } else {
      sizeY = SizeType.REGULAR;
    }
  } else {
    if (sizeX === undefined && viewWidth !== undefined) {
      if (viewWidth <= ViewWidth.MOBILE) {
        sizeX = SizeType.COMPACT;
      } else {
        sizeX = SizeType.REGULAR;
      }
    }
    if (sizeY === undefined && viewWidth !== undefined && viewHeight !== undefined) {
      if (viewWidth >= ViewWidth.SMALL_TABLET && _hasPointer || viewHeight <= ViewHeight.EXTRA_SMALL) {
        sizeY = SizeType.COMPACT;
      } else {
        sizeY = SizeType.REGULAR;
      }
    }
  }
  return {
    viewWidth: viewWidth,
    viewHeight: viewHeight,
    sizeX: sizeX,
    sizeY: sizeY,
    hasPointer: hasPointer,
    hasHover: hasHover
  };
}
//# sourceMappingURL=AdaptivityProvider.js.map