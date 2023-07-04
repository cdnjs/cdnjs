"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useBridgeAdaptivity", {
    enumerable: true,
    get: function() {
        return useBridgeAdaptivity;
    }
});
var _interop_require_default = require("@swc/helpers/_/_interop_require_default");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkbridge = /*#__PURE__*/ _interop_require_default._(require("@vkontakte/vk-bridge"));
var _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
var initialState = {
    type: "",
    viewportWidth: 0,
    viewportHeight: 0
};
function resolveAdaptivity(e) {
    var _e_detail = e.detail, type = _e_detail.type, data = _e_detail.data;
    if (type !== "VKWebAppUpdateConfig" || !data) {
        return null;
    }
    var adaptivity = data.adaptivity, viewportWidth = data.viewport_width, viewportHeight = data.viewport_height;
    var bridgeAdaptivity = {
        type: "",
        viewportWidth: isFinite(viewportWidth) ? +viewportWidth : 0,
        viewportHeight: isFinite(viewportHeight) ? +viewportHeight : 0
    };
    switch(adaptivity){
        case "force_mobile":
        case "force_mobile_compact":
        case "adaptive":
            bridgeAdaptivity.type = adaptivity;
    }
    return bridgeAdaptivity;
}
_vkbridge.default.subscribe(function(e) {
    var bridgeAdaptivity = resolveAdaptivity(e);
    if (bridgeAdaptivity) {
        initialState = bridgeAdaptivity;
    }
});
function useBridgeAdaptivity() {
    var _React_useState = _sliced_to_array._(_react.useState(initialState), 2), bridgeAdaptivity = _React_useState[0], setBridgeAdaptivity = _React_useState[1];
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        var bridgeListener = function bridgeListener(e) {
            var newBridgeAdaptivity = resolveAdaptivity(e);
            if (newBridgeAdaptivity) {
                setBridgeAdaptivity(newBridgeAdaptivity);
            }
        };
        _vkbridge.default.subscribe(bridgeListener);
        return function() {
            _vkbridge.default.unsubscribe(bridgeListener);
        };
    }, []);
    return bridgeAdaptivity;
}

//# sourceMappingURL=useBridgeAdaptivity.js.map