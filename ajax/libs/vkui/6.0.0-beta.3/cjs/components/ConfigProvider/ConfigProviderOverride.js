"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConfigProviderOverride", {
    enumerable: true,
    get: function() {
        return ConfigProviderOverride;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useObjectMemo = require("../../hooks/useObjectMemo");
const _ConfigProviderContext = require("./ConfigProviderContext");
function ConfigProviderOverride(_param) {
    var { children } = _param, contextValue = _object_without_properties._(_param, [
        "children"
    ]);
    const parentConfig = (0, _ConfigProviderContext.useConfigProvider)();
    const configContext = (0, _useObjectMemo.useObjectMemo)(_object_spread._({}, parentConfig, contextValue));
    return /*#__PURE__*/ _react.createElement(_ConfigProviderContext.ConfigProviderContext.Provider, {
        value: configContext
    }, children);
}

//# sourceMappingURL=ConfigProviderOverride.js.map