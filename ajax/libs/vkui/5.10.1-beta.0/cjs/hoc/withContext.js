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
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
function withContext(Component, Ctx, prop) {
    function WithContext(props) {
        var context = _react.useContext(Ctx);
        return /*#__PURE__*/ _react.createElement(Component, _object_spread_props._(_object_spread._({}, props), _define_property._({}, prop, context)));
    }
    return WithContext;
}

//# sourceMappingURL=withContext.js.map