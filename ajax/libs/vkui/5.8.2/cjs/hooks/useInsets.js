"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useInsets", {
    enumerable: true,
    get: function() {
        return useInsets;
    }
});
var _interop_require_default = require("@swc/helpers/_/_interop_require_default");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkbridge = /*#__PURE__*/ _interop_require_default._(require("@vkontakte/vk-bridge"));
var _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
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
                return _object_spread_props._(_object_spread._({}, insets), {
                    bottom: insets.bottom > 150 ? 0 : insets.bottom
                });
            }
    }
    return null;
}
function useInsets() {
    var disabled = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var _React_useState = _sliced_to_array._(_react.useState(initialState), 2), insets = _React_useState[0], setInsets = _React_useState[1];
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (disabled) {
            return;
        }
        var handleBridgeEvent = function(event) {
            var insets = resolveInsets(event);
            if (insets) {
                setInsets(insets);
            }
        };
        _vkbridge.default.subscribe(handleBridgeEvent);
        return function() {
            _vkbridge.default.unsubscribe(handleBridgeEvent);
        };
    }, [
        disabled
    ]);
    return insets;
}

//# sourceMappingURL=useInsets.js.map