import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import vkBridge from "@vkontakte/vk-bridge";
import { noop } from "@vkontakte/vkjs";
import { resolveAppearance } from "../helpers/appearance";
import { useDOM } from "../lib/dom";
import { matchMediaListAddListener, matchMediaListRemoveListener } from "../lib/matchMedia";
function autoDetectAppearanceByBridge(setAppearance, onDetectAppearanceByBridge) {
    function updateAppearance(data) {
        var initialAppearance = resolveAppearance(data);
        if (initialAppearance) {
            onDetectAppearanceByBridge();
            setAppearance(initialAppearance);
        }
    }
    function bridgeListener(e) {
        var _e_detail = e.detail, type = _e_detail.type, data = _e_detail.data;
        if (type !== "VKWebAppUpdateConfig") {
            return;
        }
        updateAppearance(data);
    }
    vkBridge.subscribe(bridgeListener);
    vkBridge.send("VKWebAppGetConfig").then(updateAppearance).catch(console.error);
    return function() {
        return vkBridge.unsubscribe(bridgeListener);
    };
}
function autoDetectAppearance(window, setAppearance) {
    var mediaQuery = window && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery === undefined) {
        return noop;
    }
    var check = function(event) {
        // eslint-disable-next-line no-restricted-properties
        setAppearance(event.matches ? "dark" : "light");
    };
    check(mediaQuery);
    matchMediaListAddListener(mediaQuery, check);
    return function() {
        return matchMediaListRemoveListener(mediaQuery, check);
    };
}
/**
 * TODO [>=6]: удалить хук (#5049)
 * @deprecated v5.8.0
 */ export var useAutoDetectAppearance = function(appearanceProp, onDetectAppearanceByBridge) {
    var window = useDOM().window;
    var onceDetectAppearanceByBridge = React.useRef(function() {
        onDetectAppearanceByBridge && onDetectAppearanceByBridge();
        onceDetectAppearanceByBridge.current = noop;
    });
    var _React_useState = _sliced_to_array(React.useState(function() {
        if (appearanceProp) {
            return appearanceProp;
        }
        var mediaQuery = window && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
        // eslint-disable-next-line no-restricted-properties
        return (mediaQuery === null || mediaQuery === void 0 ? void 0 : mediaQuery.matches) ? "dark" : "light";
    }), 2), appearance = _React_useState[0], setAppearance = _React_useState[1];
    React.useEffect(function() {
        if (appearanceProp) {
            setAppearance(appearanceProp);
            return noop;
        }
        if (vkBridge.isEmbedded()) {
            return autoDetectAppearanceByBridge(setAppearance, onceDetectAppearanceByBridge.current);
        }
        return autoDetectAppearance(window, setAppearance);
    }, [
        window,
        appearanceProp
    ]);
    return appearance;
};

//# sourceMappingURL=useAutoDetectAppearance.js.map