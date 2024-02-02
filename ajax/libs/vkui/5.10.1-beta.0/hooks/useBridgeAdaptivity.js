import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import vkBridge from "@vkontakte/vk-bridge";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect";
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
/**
 * TODO [>=6]: удалить хук (#5049)
 * @deprecated v5.8.0
 */ export function useBridgeAdaptivity() {
    var disable = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var _React_useState = _sliced_to_array(React.useState(initialState), 2), bridgeAdaptivity = _React_useState[0], setBridgeAdaptivity = _React_useState[1];
    useIsomorphicLayoutEffect(function() {
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
        vkBridge.subscribe(handleBridgeEvent);
        vkBridge.send("VKWebAppGetConfig").then(updateAdaptivity).catch(console.error);
        return function() {
            vkBridge.unsubscribe(handleBridgeEvent);
        };
    }, []);
    return bridgeAdaptivity;
}

//# sourceMappingURL=useBridgeAdaptivity.js.map