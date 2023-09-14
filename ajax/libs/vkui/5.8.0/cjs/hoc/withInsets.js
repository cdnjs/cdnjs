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
function withInsets(Component) {
    var WithInsets = function WithInsets(props) {
        var insets = (0, _useInsets.useInsets)();
        return /*#__PURE__*/ _react.createElement(Component, _object_spread_props._(_object_spread._({}, props), {
            insets: insets
        }));
    };
    return WithInsets;
}

//# sourceMappingURL=withInsets.js.map