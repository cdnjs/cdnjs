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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useObjectMemo = require("../../hooks/useObjectMemo");
var _ConfigProviderContext = require("./ConfigProviderContext");
function ConfigProviderOverride(_param) {
    var children = _param.children, contextValue = _object_without_properties._(_param, [
        "children"
    ]);
    var parentConfig = (0, _ConfigProviderContext.useConfigProvider)();
    var configContext = (0, _useObjectMemo.useObjectMemo)(_object_spread._({}, parentConfig, contextValue));
    return /*#__PURE__*/ _react.createElement(_ConfigProviderContext.ConfigProviderContext.Provider, {
        value: configContext
    }, children);
}

//# sourceMappingURL=ConfigProviderOverride.js.map