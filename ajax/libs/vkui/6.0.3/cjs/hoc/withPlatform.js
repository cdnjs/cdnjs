"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "withPlatform", {
    enumerable: true,
    get: function() {
        return withPlatform;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _ConfigProviderContext = require("../components/ConfigProvider/ConfigProviderContext");
function withPlatform(Component) {
    function WithPlatform(props) {
        const { platform } = (0, _ConfigProviderContext.useConfigProvider)();
        return /*#__PURE__*/ _react.createElement(Component, _object_spread_props._(_object_spread._({}, props), {
            platform: platform
        }));
    }
    return WithPlatform;
}

//# sourceMappingURL=withPlatform.js.map