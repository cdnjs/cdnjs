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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _RootComponent = require("../RootComponent/RootComponent");
const sizeXClassNames = {
    none: "vkuiCardGrid--sizeX-none",
    ['compact']: "vkuiCardGrid--sizeX-compact"
};
const stylesSize = {
    s: 'vkuiInternalCardGrid--size-s',
    m: 'vkuiInternalCardGrid--size-m',
    l: 'vkuiInternalCardGrid--size-l'
};
const CardGrid = (_param)=>{
    var { size = 's', spaced = false } = _param, restProps = _object_without_properties._(_param, [
        "size",
        "spaced"
    ]);
    const { sizeX = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiCardGrid", 'vkuiInternalCardGrid', spaced && "vkuiCardGrid--spaced", stylesSize[size], sizeX !== 'regular' && sizeXClassNames[sizeX])
    }));
};

//# sourceMappingURL=CardGrid.js.map