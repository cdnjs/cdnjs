"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Gradient", {
    enumerable: true,
    get: function() {
        return Gradient;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const Gradient = (_param)=>{
    var { mode = 'default', to = 'top' } = _param, restProps = _object_without_properties._(_param, [
        "mode",
        "to"
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        role: "presentation"
    }, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiGradient", mode !== 'default' && "vkuiGradient--mode-tint", to === 'bottom' && "vkuiGradient--to-bottom")
    }));
};

//# sourceMappingURL=Gradient.js.map