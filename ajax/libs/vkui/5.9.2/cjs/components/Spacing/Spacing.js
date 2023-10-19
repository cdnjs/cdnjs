"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Spacing", {
    enumerable: true,
    get: function() {
        return Spacing;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _RootComponent = require("../RootComponent/RootComponent");
var Spacing = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? 8 : _param_size, styleProp = _param.style, restProps = _object_without_properties._(_param, [
        "size",
        "style"
    ]);
    var style = _object_spread._({
        height: size,
        padding: "".concat(size / 2, "px 0")
    }, styleProp);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: "vkuiSpacing",
        style: style
    }));
};

//# sourceMappingURL=Spacing.js.map