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
function resolveAdaptivity(data) {
    var adaptivity = data.adaptivity, viewport_width = data.viewport_width, viewport_height = data.viewport_height;
    var bridgeAdaptivity = {
        type: "",
        viewportWidth: isFinite(viewport_width) ? Number(viewport_width) : 0,
        viewportHeight: isFinite(viewport_height) ? Number(viewport_height) : 0
    };
    switch(adaptivity){
        case "force_mobile":
        case "force_mobile_compact":
        case "adaptive":
            bridgeAdaptivity.type = adaptivity;
    }
    return bridgeAdaptivity;
}
function useBridgeAdaptivity() {
    var disable = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var _React_useState = _sliced_to_array._(_react.useState(initialState), 2), bridgeAdaptivity = _React_useState[0], setBridgeAdaptivity = _React_useState[1];
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (disable) {
            return;
        }
        var updateAdaptivity = function(data) {
            if (!("adaptivity" in data) || !("viewport_width" in data) || !("viewport_height" in data)) {
                return;
            }
            var newAdaptivity = resolveAdaptivity(data);
            if (newAdaptivity) {
                setBridgeAdaptivity(newAdaptivity);
            }
        };
        var handleBridgeEvent = function(event) {
            var _event_detail = event.detail, type = _event_detail.type, data = _event_detail.data;
            if (type !== "VKWebAppUpdateConfig") {
                return;
            }
            updateAdaptivity(data);
        };
        _vkbridge.default.subscribe(handleBridgeEvent);
        _vkbridge.default.send("VKWebAppGetConfig").then(updateAdaptivity).catch(console.error);
        return function() {
            _vkbridge.default.unsubscribe(handleBridgeEvent);
        };
    }, []);
    return bridgeAdaptivity;
}

//# sourceMappingURL=useBridgeAdaptivity.js.map