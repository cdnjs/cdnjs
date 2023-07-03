import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import vkBridge from "@vkontakte/vk-bridge";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect";
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
vkBridge.subscribe(function(e) {
    var bridgeAdaptivity = resolveAdaptivity(e);
    if (bridgeAdaptivity) {
        initialState = bridgeAdaptivity;
    }
});
export function useBridgeAdaptivity() {
    var _React_useState = _sliced_to_array(React.useState(initialState), 2), bridgeAdaptivity = _React_useState[0], setBridgeAdaptivity = _React_useState[1];
    useIsomorphicLayoutEffect(function() {
        var bridgeListener = function bridgeListener(e) {
            var newBridgeAdaptivity = resolveAdaptivity(e);
            if (newBridgeAdaptivity) {
                setBridgeAdaptivity(newBridgeAdaptivity);
            }
        };
        vkBridge.subscribe(bridgeListener);
        return function() {
            vkBridge.unsubscribe(bridgeListener);
        };
    }, []);
    return bridgeAdaptivity;
}

//# sourceMappingURL=useBridgeAdaptivity.js.map