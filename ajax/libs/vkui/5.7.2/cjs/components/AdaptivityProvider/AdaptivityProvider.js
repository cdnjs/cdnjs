"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdaptivityProvider", {
    enumerable: true,
    get: function() {
        return AdaptivityProvider;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useBridgeAdaptivity = require("../../hooks/useBridgeAdaptivity");
var _adaptivity = require("../../lib/adaptivity");
var _AdaptivityContext = require("./AdaptivityContext");
var AdaptivityProvider = function(param) {
    var viewWidth = param.viewWidth, viewHeight = param.viewHeight, sizeX = param.sizeX, sizeY = param.sizeY, hasPointer = param.hasPointer, hasHover = param.hasHover, children = param.children;
    var bridge = (0, _useBridgeAdaptivity.useBridgeAdaptivity)();
    var adaptivity = _react.useMemo(function() {
        return calculateAdaptivity({
            viewWidth: viewWidth,
            viewHeight: viewHeight,
            sizeX: sizeX,
            sizeY: sizeY,
            hasPointer: hasPointer,
            hasHover: hasHover
        }, bridge);
    }, [
        viewWidth,
        viewHeight,
        sizeX,
        sizeY,
        hasPointer,
        hasHover,
        bridge
    ]);
    return /*#__PURE__*/ _react.createElement(_AdaptivityContext.AdaptivityContext.Provider, {
        value: adaptivity
    }, children);
};
function calculateAdaptivity(param, bridge) {
    var viewWidth = param.viewWidth, viewHeight = param.viewHeight, sizeX = param.sizeX, sizeY = param.sizeY, hasPointer = param.hasPointer, hasHover = param.hasHover;
    if (bridge.type === "adaptive") {
        var viewportWidth = bridge.viewportWidth, viewportHeight = bridge.viewportHeight;
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
        } else if (viewportHeight >= _adaptivity.BREAKPOINTS.MOBILE_LANDSCAPE_HEIGHT) {
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
    } else if (bridge.type === "force_mobile" || bridge.type === "force_mobile_compact") {
        viewWidth = _adaptivity.ViewWidth.MOBILE;
        sizeX = _adaptivity.SizeType.COMPACT;
        if (bridge.type === "force_mobile_compact") {
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