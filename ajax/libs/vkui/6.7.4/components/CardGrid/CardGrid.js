import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { RootComponent } from '../RootComponent/RootComponent';
const sizeXClassNames = {
    none: "vkuiCardGrid--sizeX-none",
    compact: "vkuiCardGrid--sizeX-compact"
};
const stylesSize = {
    s: 'vkuiInternalCardGrid--size-s',
    m: 'vkuiInternalCardGrid--size-m',
    l: 'vkuiInternalCardGrid--size-l'
};
/**
 * @see https://vkcom.github.io/VKUI/#/CardGrid
 */ export const CardGrid = (_param)=>{
    var { size = 's', spaced = false, // TODO [>=7]: поменять тег на ul https://github.com/VKCOM/VKUI/issues/7336
    Component = 'div' } = _param, restProps = _object_without_properties(_param, [
        "size",
        "spaced",
        "Component"
    ]);
    const { sizeX = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        Component: Component,
        baseClassName: classNames("vkuiCardGrid", 'vkuiInternalCardGrid', spaced && "vkuiCardGrid--spaced", stylesSize[size], sizeX !== 'regular' && sizeXClassNames[sizeX])
    }));
};

//# sourceMappingURL=CardGrid.js.map