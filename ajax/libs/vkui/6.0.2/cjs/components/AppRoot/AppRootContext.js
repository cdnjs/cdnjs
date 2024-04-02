"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AppRootContext: function() {
        return AppRootContext;
    },
    DEFAULT_APP_ROOT_CONTEXT_VALUE: function() {
        return DEFAULT_APP_ROOT_CONTEXT_VALUE;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const DEFAULT_APP_ROOT_CONTEXT_VALUE = {
    appRoot: _react.createRef(),
    mode: 'full',
    portalRoot: _react.createRef(),
    embedded: false,
    keyboardInput: false,
    disablePortal: false
};
const AppRootContext = _react.createContext(DEFAULT_APP_ROOT_CONTEXT_VALUE);

//# sourceMappingURL=AppRootContext.js.map