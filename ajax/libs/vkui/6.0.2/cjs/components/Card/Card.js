"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Card", {
    enumerable: true,
    get: function() {
        return Card;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const Card = (_param)=>{
    var { mode = 'tint' } = _param, restProps = _object_without_properties._(_param, [
        "mode"
    ]);
    const withBorder = mode === 'outline' || mode === 'outline-tint';
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiCard", mode === 'outline' && "vkuiCard--mode-outline", mode === 'shadow' && "vkuiCard--mode-shadow", withBorder && "vkuiCard--withBorder")
    }));
};

//# sourceMappingURL=Card.js.map