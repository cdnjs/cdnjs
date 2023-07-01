import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import vkBridge from "@vkontakte/vk-bridge";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect";
var initialState = {
    bottom: null,
    top: null,
    left: null,
    right: null
};
function resolveInsets(e) {
    var _e_detail = e.detail, type = _e_detail.type, data = _e_detail.data;
    switch(type){
        case "VKWebAppUpdateConfig":
        case "VKWebAppUpdateInsets":
            var insets = data.insets;
            if (insets) {
                return _object_spread_props(_object_spread({}, insets), {
                    bottom: insets.bottom > 150 ? 0 : insets.bottom
                });
            }
    }
    return null;
}
vkBridge.subscribe(function(e) {
    var insets = resolveInsets(e);
    if (insets) {
        initialState = insets;
    }
});
export function useInsets() {
    var _React_useState = _sliced_to_array(React.useState(initialState), 2), insets = _React_useState[0], setInsets = _React_useState[1];
    useIsomorphicLayoutEffect(function() {
        var connectListener = function connectListener(e) {
            var insets = resolveInsets(e);
            if (insets) {
                setInsets(insets);
            }
        };
        vkBridge.subscribe(connectListener);
        return function() {
            vkBridge.unsubscribe(connectListener);
        };
    }, []);
    return insets;
}

//# sourceMappingURL=useInsets.js.map