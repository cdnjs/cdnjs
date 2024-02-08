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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _RootComponent = require("../RootComponent/RootComponent");
const Spacing = (_param)=>{
    var { size = 8, style: styleProp } = _param, restProps = _object_without_properties._(_param, [
        "size",
        "style"
    ]);
    const style = _object_spread._({
        height: size,
        padding: `${size / 2}px 0`
    }, styleProp);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: "vkuiSpacing",
        style: style
    }));
};

//# sourceMappingURL=Spacing.js.map