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
var _warnOnce = require("../../lib/warnOnce");
var _AdaptivityContext = require("./AdaptivityContext");
var warn = (0, _warnOnce.warnOnce)("AdaptivityProvider");
var AdaptivityProvider = function(param) {
    var viewWidth = param.viewWidth, viewHeight = param.viewHeight, sizeX = param.sizeX, sizeY = param.sizeY, hasPointer = param.hasPointer, hasHover = param.hasHover, children = param.children;
    // TODO [>=6]: удалить использование хука (#5049)
    /* eslint-disable @typescript-eslint/naming-convention */ var LEGACY_isPerhapsPropsByBridgeTypeAdaptive = viewWidth !== undefined && viewHeight !== undefined;
    var LEGACY_isPerhapsPropsByBridgeTypeForceMobile = viewWidth !== undefined && sizeX !== undefined && sizeY !== undefined;
    var LEGACY_disableInternalUseBridgeAdaptivity = LEGACY_isPerhapsPropsByBridgeTypeAdaptive || LEGACY_isPerhapsPropsByBridgeTypeForceMobile;
    var LEGACY_bridge = (0, _useBridgeAdaptivity.useBridgeAdaptivity)(LEGACY_disableInternalUseBridgeAdaptivity);
    /* eslint-enable @typescript-eslint/naming-convention */ if (process.env.NODE_ENV === "development") {
        // TODO [>=6]: удалить warn
        if (!LEGACY_disableInternalUseBridgeAdaptivity) {
            warn("[@vkontakte/vk-bridge] Интеграция VKUI с @vkontakte/vk-bridge устарела и будет удалена в v6. Используйте хук `useAdaptivity()` из @vkontakte/vk-bridge-react и результат передайте в компонент (см. https://github.com/VKCOM/VKUI/issues/5049)"); // prettier-ignore
        }
    }
    var adaptivity = _react.useMemo(function() {
        return calculateAdaptivity({
            viewWidth: viewWidth,
            viewHeight: viewHeight,
            sizeX: sizeX,
            sizeY: sizeY,
            hasPointer: hasPointer,
            hasHover: hasHover
        }, LEGACY_bridge);
    }, [
        viewWidth,
        viewHeight,
        sizeX,
        sizeY,
        hasPointer,
        hasHover,
        LEGACY_bridge
    ]);
    return /*#__PURE__*/ _react.createElement(_AdaptivityContext.AdaptivityContext.Provider, {
        value: adaptivity
    }, children);
};
function calculateAdaptivity(param, LEGACY_bridge) {
    var viewWidth = param.viewWidth, viewHeight = param.viewHeight, sizeX = param.sizeX, sizeY = param.sizeY, hasPointer = param.hasPointer, hasHover = param.hasHover;
    // TODO [>=6]: удалить блок кода c использованием LEGACY_bridge (#5049)
    //  https://github.com/VKCOM/VKUI/blob/v5.5.5/packages/vkui/src/components/AdaptivityProvider/AdaptivityProvider.tsx#L46-L92
    if (LEGACY_bridge.type === "adaptive") {
        var viewportWidth = LEGACY_bridge.viewportWidth, viewportHeight = LEGACY_bridge.viewportHeight;
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
    } else if (LEGACY_bridge.type === "force_mobile" || LEGACY_bridge.type === "force_mobile_compact") {
        viewWidth = _adaptivity.ViewWidth.MOBILE;
        sizeX = _adaptivity.SizeType.COMPACT;
        if (LEGACY_bridge.type === "force_mobile_compact") {
            sizeY = _adaptivity.SizeType.COMPACT;
        } else {
            sizeY = _adaptivity.SizeType.REGULAR;
        }
    } else {
        if (sizeX === undefined && viewWidth !== undefined) {
            sizeX = (0, _adaptivity.getSizeX)(viewWidth);
        }
        if (sizeY === undefined) {
            if ((0, _adaptivity.isCompactByViewWidth)(viewWidth, hasPointer) || (0, _adaptivity.isCompactByViewHeight)(viewHeight)) {
                sizeY = _adaptivity.SizeType.COMPACT;
            } else if (viewWidth !== undefined || viewHeight !== undefined) {
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