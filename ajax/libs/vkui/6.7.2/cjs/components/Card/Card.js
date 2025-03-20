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
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const Card = (_param)=>{
    var { mode = 'tint', // TODO [>=7]: поменять тег на li https://github.com/VKCOM/VKUI/issues/7336
    Component = 'div' } = _param, restProps = _object_without_properties._(_param, [
        "mode",
        "Component"
    ]);
    const withBorder = mode === 'outline' || mode === 'outline-tint';
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        Component: Component,
        baseClassName: (0, _vkjs.classNames)("vkuiCard", mode === 'outline' && "vkuiCard--mode-outline", mode === 'shadow' && "vkuiCard--mode-shadow", withBorder && "vkuiCard--withBorder")
    }));
};

//# sourceMappingURL=Card.js.map