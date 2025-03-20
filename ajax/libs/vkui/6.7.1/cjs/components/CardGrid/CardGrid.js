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
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _RootComponent = require("../RootComponent/RootComponent");
const sizeXClassNames = {
    none: "vkuiCardGrid--sizeX-none",
    compact: "vkuiCardGrid--sizeX-compact"
};
const stylesSize = {
    s: 'vkuiInternalCardGrid--size-s',
    m: 'vkuiInternalCardGrid--size-m',
    l: 'vkuiInternalCardGrid--size-l'
};
const CardGrid = (_param)=>{
    var { size = 's', spaced = false, // TODO [>=7]: поменять тег на ul https://github.com/VKCOM/VKUI/issues/7336
    Component = 'div' } = _param, restProps = _object_without_properties._(_param, [
        "size",
        "spaced",
        "Component"
    ]);
    const { sizeX = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        Component: Component,
        baseClassName: (0, _vkjs.classNames)("vkuiCardGrid", 'vkuiInternalCardGrid', spaced && "vkuiCardGrid--spaced", stylesSize[size], sizeX !== 'regular' && sizeXClassNames[sizeX])
    }));
};

//# sourceMappingURL=CardGrid.js.map