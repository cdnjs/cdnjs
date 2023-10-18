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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _ConfigProviderContext = require("../components/ConfigProvider/ConfigProviderContext");
function withPlatform(Component) {
    function WithPlatform(props) {
        var platform = (0, _ConfigProviderContext.useConfigProvider)().platform;
        return /*#__PURE__*/ _react.createElement(Component, _object_spread_props._(_object_spread._({}, props), {
            platform: platform
        }));
    }
    return WithPlatform;
}

//# sourceMappingURL=withPlatform.js.map