"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "withInsets", {
    enumerable: true,
    get: function() {
        return withInsets;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useInsets = require("../hooks/useInsets");
var _warnOnce = require("../lib/warnOnce");
var warn = (0, _warnOnce.warnOnce)("withInsets");
function withInsets(Component) {
    if (process.env.NODE_ENV === "development") {
        warn("[@vkontakte/vk-bridge] Интеграция VKUI с @vkontakte/vk-bridge устарела и будет удалена в v6. Используйте хук `useInsets()` из @vkontakte/vk-bridge-react, для получения инсетов (см. https://github.com/VKCOM/VKUI/issues/5049)"); // prettier-ignore
    }
    function WithInsets(props) {
        var insets = (0, _useInsets.useInsets)();
        return /*#__PURE__*/ _react.createElement(Component, _object_spread_props._(_object_spread._({}, props), {
            insets: insets
        }));
    }
    return WithInsets;
}

//# sourceMappingURL=withInsets.js.map