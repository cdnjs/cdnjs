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
var _interopRequireDefault = require("@swc/helpers/lib/_interop_require_default.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkBridge = /*#__PURE__*/ _interopRequireDefault(require("@vkontakte/vk-bridge"));
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
_vkBridge.default.subscribe(function(e) {
    var bridgeAdaptivity = resolveAdaptivity(e);
    if (bridgeAdaptivity) {
        initialState = bridgeAdaptivity;
    }
});
function useBridgeAdaptivity() {
    var _React_useState = _slicedToArray(_react.useState(initialState), 2), bridgeAdaptivity = _React_useState[0], setBridgeAdaptivity = _React_useState[1];
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        var bridgeListener = function bridgeListener(e) {
            var newBridgeAdaptivity = resolveAdaptivity(e);
            if (newBridgeAdaptivity) {
                setBridgeAdaptivity(newBridgeAdaptivity);
            }
        };
        _vkBridge.default.subscribe(bridgeListener);
        return function() {
            _vkBridge.default.unsubscribe(bridgeListener);
        };
    }, []);
    return bridgeAdaptivity;
}

//# sourceMappingURL=useBridgeAdaptivity.js.map