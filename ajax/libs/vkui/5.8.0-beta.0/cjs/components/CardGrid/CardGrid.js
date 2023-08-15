"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CardGrid", {
    enumerable: true,
    get: function() {
        return CardGrid;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _adaptivity = require("../../lib/adaptivity");
var sizeXClassNames = _define_property._({
    none: "vkuiCardGrid--sizeX-none"
}, _adaptivity.SizeType.COMPACT, "vkuiCardGrid--sizeX-compact");
var CardGrid = function(_param) {
    var children = _param.children, _param_size = _param.size, size = _param_size === void 0 ? "s" : _param_size, _param_spaced = _param.spaced, spaced = _param_spaced === void 0 ? false : _param_spaced, className = _param.className, restProps = _object_without_properties._(_param, [
        "children",
        "size",
        "spaced",
        "className"
    ]);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeX = _useAdaptivity1.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    return /*#__PURE__*/ _react.createElement("div", _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiCardGrid", "vkuiInternalCardGrid", spaced && "vkuiCardGrid--spaced", {
            s: "vkuiInternalCardGrid--size-s",
            m: "vkuiInternalCardGrid--size-m",
            l: "vkuiInternalCardGrid--size-l"
        }[size], sizeX !== _adaptivity.SizeType.REGULAR && sizeXClassNames[sizeX], className)
    }), children);
};

//# sourceMappingURL=CardGrid.js.map