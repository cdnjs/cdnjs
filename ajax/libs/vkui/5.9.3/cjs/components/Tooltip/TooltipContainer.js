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
    TooltipContainer: function() {
        return TooltipContainer;
    },
    tooltipContainerAttr: function() {
        return tooltipContainerAttr;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var tooltipContainerAttr = "data-tooltip-container";
var TooltipContainer = /*#__PURE__*/ _react.forwardRef(function TooltipContainer(_param, ref) {
    var _param_fixed = _param.fixed, fixed = _param_fixed === void 0 ? false : _param_fixed, props = _object_without_properties._(_param, [
        "fixed"
    ]);
    props[tooltipContainerAttr] = fixed ? "fixed" : "true";
    return /*#__PURE__*/ _react.createElement("div", _object_spread_props._(_object_spread._({}, props), {
        ref: ref
    }));
});

//# sourceMappingURL=TooltipContainer.js.map