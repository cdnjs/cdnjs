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
    tooltipContainerAttr: function() {
        return tooltipContainerAttr;
    },
    TooltipContainer: function() {
        return TooltipContainer;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var tooltipContainerAttr = "data-tooltip-container";
var TooltipContainer = /*#__PURE__*/ _react.forwardRef(function TooltipContainer(_param, ref) {
    var _param_fixed = _param.fixed, fixed = _param_fixed === void 0 ? false : _param_fixed, props = _objectWithoutProperties(_param, [
        "fixed"
    ]);
    props[tooltipContainerAttr] = fixed ? "fixed" : "true";
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, props), {
        ref: ref
    }));
});

//# sourceMappingURL=TooltipContainer.js.map