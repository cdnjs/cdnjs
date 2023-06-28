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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _configProviderContext = require("../components/ConfigProvider/ConfigProviderContext");
function withPlatform(Component) {
    var WithPlatform = function WithPlatform(props) {
        var platform = (0, _configProviderContext.useConfigProvider)().platform;
        return /*#__PURE__*/ _react.createElement(Component, _objectSpreadProps(_objectSpread({}, props), {
            platform: platform
        }));
    };
    return WithPlatform;
}

//# sourceMappingURL=withPlatform.js.map