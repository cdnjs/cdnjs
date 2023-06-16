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
var _interopRequireDefault = require("@swc/helpers/lib/_interop_require_default.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireDefault(require("react"));
var _useObjectMemo = require("../../hooks/useObjectMemo");
var _configProviderContext = require("./ConfigProviderContext");
function ConfigProviderOverride(_param) {
    var children = _param.children, contextValue = _objectWithoutProperties(_param, [
        "children"
    ]);
    var parentConfig = (0, _configProviderContext.useConfigProvider)();
    var configContext = (0, _useObjectMemo.useObjectMemo)(_objectSpread({}, parentConfig, contextValue));
    return /*#__PURE__*/ _react.default.createElement(_configProviderContext.ConfigProviderContext.Provider, {
        value: configContext
    }, children);
}

//# sourceMappingURL=ConfigProviderOverride.js.map