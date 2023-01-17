"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdaptivityProvider = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _adaptivity = require("../../lib/adaptivity");
var _useBridgeAdaptivity = require("../../hooks/useBridgeAdaptivity");
var _AdaptivityContext = require("./AdaptivityContext");
/**
 * @see https://vkcom.github.io/VKUI/#/AdaptivityProvider
 */
var AdaptivityProvider = function AdaptivityProvider(_ref) {
  var viewWidth = _ref.viewWidth,
    viewHeight = _ref.viewHeight,
    sizeX = _ref.sizeX,
    sizeY = _ref.sizeY,
    hasPointer = _ref.hasPointer,
    hasHover = _ref.hasHover,
    children = _ref.children;
  var bridge = (0, _useBridgeAdaptivity.useBridgeAdaptivity)();
  var _React$useState = React.useState({
      viewWidth: viewWidth,
      viewHeight: viewHeight,
      sizeX: sizeX,
      sizeY: sizeY,
      hasPointer: hasPointer,
      hasHover: hasHover
    }),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
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
  return /*#__PURE__*/React.createElement(_AdaptivityContext.AdaptivityContext.Provider, {
    value: adaptivity
  }, children);
};
exports.AdaptivityProvider = AdaptivityProvider;
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
    if (viewportWidth >= _adaptivity.BREAKPOINTS.DESKTOP) {
      viewWidth = _adaptivity.ViewWidth.DESKTOP;
    } else if (viewportWidth >= _adaptivity.BREAKPOINTS.TABLET) {
      viewWidth = _adaptivity.ViewWidth.TABLET;
    } else if (viewportWidth >= _adaptivity.BREAKPOINTS.SMALL_TABLET) {
      viewWidth = _adaptivity.ViewWidth.SMALL_TABLET;
    } else if (viewportWidth >= _adaptivity.BREAKPOINTS.MOBILE) {
      viewWidth = _adaptivity.ViewWidth.MOBILE;
    } else {
      viewWidth = _adaptivity.ViewWidth.SMALL_MOBILE;
    }
    if (viewportHeight >= _adaptivity.BREAKPOINTS.MEDIUM_HEIGHT) {
      viewHeight = _adaptivity.ViewHeight.MEDIUM;
    } else if (viewportHeight > _adaptivity.BREAKPOINTS.MOBILE_LANDSCAPE_HEIGHT) {
      viewHeight = _adaptivity.ViewHeight.SMALL;
    } else {
      viewHeight = _adaptivity.ViewHeight.EXTRA_SMALL;
    }
    if (viewWidth <= _adaptivity.ViewWidth.MOBILE) {
      sizeX = _adaptivity.SizeType.COMPACT;
    } else {
      sizeX = _adaptivity.SizeType.REGULAR;
    }
    if (viewWidth >= _adaptivity.ViewWidth.SMALL_TABLET && _vkjs.hasMouse || viewHeight <= _adaptivity.ViewHeight.EXTRA_SMALL) {
      sizeY = _adaptivity.SizeType.COMPACT;
    } else {
      sizeY = _adaptivity.SizeType.REGULAR;
    }
  } else if (bridge.type === 'force_mobile' || bridge.type === 'force_mobile_compact') {
    viewWidth = _adaptivity.ViewWidth.MOBILE;
    sizeX = _adaptivity.SizeType.COMPACT;
    if (bridge.type === 'force_mobile_compact') {
      sizeY = _adaptivity.SizeType.COMPACT;
    } else {
      sizeY = _adaptivity.SizeType.REGULAR;
    }
  } else {
    if (sizeX === undefined && viewWidth !== undefined) {
      if (viewWidth <= _adaptivity.ViewWidth.MOBILE) {
        sizeX = _adaptivity.SizeType.COMPACT;
      } else {
        sizeX = _adaptivity.SizeType.REGULAR;
      }
    }
    if (sizeY === undefined && viewWidth !== undefined && viewHeight !== undefined) {
      if (viewWidth >= _adaptivity.ViewWidth.SMALL_TABLET && _vkjs.hasMouse || viewHeight <= _adaptivity.ViewHeight.EXTRA_SMALL) {
        sizeY = _adaptivity.SizeType.COMPACT;
      } else {
        sizeY = _adaptivity.SizeType.REGULAR;
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