"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useAutoDetectAppearance", {
    enumerable: true,
    get: function() {
        return useAutoDetectAppearance;
    }
});
var _interop_require_default = require("@swc/helpers/_/_interop_require_default");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkbridge = /*#__PURE__*/ _interop_require_default._(require("@vkontakte/vk-bridge"));
var _vkjs = require("@vkontakte/vkjs");
var _appearance = require("../helpers/appearance");
var _dom = require("../lib/dom");
var _matchMedia = require("../lib/matchMedia");
function autoDetectAppearanceByBridge(setAppearance, onDetectAppearanceByBridge) {
    function updateAppearance(data) {
        var initialAppearance = (0, _appearance.resolveAppearance)(data);
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
    _vkbridge.default.subscribe(bridgeListener);
    _vkbridge.default.send("VKWebAppGetConfig").then(updateAppearance).catch(console.error);
    return function() {
        return _vkbridge.default.unsubscribe(bridgeListener);
    };
}
function autoDetectAppearance(window, setAppearance) {
    var mediaQuery = window && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery === undefined) {
        return _vkjs.noop;
    }
    var check = function(event) {
        // eslint-disable-next-line no-restricted-properties
        setAppearance(event.matches ? "dark" : "light");
    };
    check(mediaQuery);
    (0, _matchMedia.matchMediaListAddListener)(mediaQuery, check);
    return function() {
        return (0, _matchMedia.matchMediaListRemoveListener)(mediaQuery, check);
    };
}
var useAutoDetectAppearance = function(appearanceProp, onDetectAppearanceByBridge) {
    var window = (0, _dom.useDOM)().window;
    var onceDetectAppearanceByBridge = _react.useRef(function() {
        onDetectAppearanceByBridge && onDetectAppearanceByBridge();
        onceDetectAppearanceByBridge.current = _vkjs.noop;
    });
    var _React_useState = _sliced_to_array._(_react.useState(function() {
        if (appearanceProp) {
            return appearanceProp;
        }
        var mediaQuery = window && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
        // eslint-disable-next-line no-restricted-properties
        return (mediaQuery === null || mediaQuery === void 0 ? void 0 : mediaQuery.matches) ? "dark" : "light";
    }), 2), appearance = _React_useState[0], setAppearance = _React_useState[1];
    _react.useEffect(function() {
        if (appearanceProp) {
            setAppearance(appearanceProp);
            return _vkjs.noop;
        }
        if (_vkbridge.default.isEmbedded()) {
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