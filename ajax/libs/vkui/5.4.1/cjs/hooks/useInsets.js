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
var _interopRequireDefault = require("@swc/helpers/lib/_interop_require_default.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkBridge = /*#__PURE__*/ _interopRequireDefault(require("@vkontakte/vk-bridge"));
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
                return _objectSpreadProps(_objectSpread({}, insets), {
                    bottom: insets.bottom > 150 ? 0 : insets.bottom
                });
            }
    }
    return null;
}
_vkBridge.default.subscribe(function(e) {
    var insets = resolveInsets(e);
    if (insets) {
        initialState = insets;
    }
});
function useInsets() {
    var _React_useState = _slicedToArray(_react.useState(initialState), 2), insets = _React_useState[0], setInsets = _React_useState[1];
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        var connectListener = function connectListener(e) {
            var insets = resolveInsets(e);
            if (insets) {
                setInsets(insets);
            }
        };
        _vkBridge.default.subscribe(connectListener);
        return function() {
            _vkBridge.default.unsubscribe(connectListener);
        };
    }, []);
    return insets;
}

//# sourceMappingURL=useInsets.js.map