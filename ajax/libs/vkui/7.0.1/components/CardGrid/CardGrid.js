'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
const sizeXClassNames = {
    none: "vkuiCardGrid__sizeXNone",
    compact: "vkuiCardGrid__sizeXCompact"
};
const stylesSize = {
    s: 'vkuiInternalCardGrid--size-s',
    m: 'vkuiInternalCardGrid--size-m',
    l: 'vkuiInternalCardGrid--size-l'
};
/**
 * @see https://vkcom.github.io/VKUI/#/CardGrid
 */ export const CardGrid = (_param)=>{
    var { size = 's', padding = false, Component = 'ul' } = _param, restProps = _object_without_properties(_param, [
        "size",
        "padding",
        "Component"
    ]);
    const { sizeX = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        Component: Component,
        baseClassName: classNames("vkuiCardGrid__host", 'vkuiInternalCardGrid', padding && "vkuiCardGrid__padding", stylesSize[size], sizeX !== 'regular' && sizeXClassNames[sizeX])
    }));
};

//# sourceMappingURL=CardGrid.js.map