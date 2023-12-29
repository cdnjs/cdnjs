"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "withContext", {
    enumerable: true,
    get: function() {
        return withContext;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
function withContext(Component, Ctx, prop) {
    function WithContext(props) {
        const context = _react.useContext(Ctx);
        return /*#__PURE__*/ _react.createElement(Component, _object_spread_props._(_object_spread._({}, props), {
            [prop]: context
        }));
    }
    return WithContext;
}

//# sourceMappingURL=withContext.js.map