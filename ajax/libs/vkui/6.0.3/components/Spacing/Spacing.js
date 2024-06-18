import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { RootComponent } from '../RootComponent/RootComponent';
/**
 * @see https://vkcom.github.io/VKUI/#/Spacing
 */ export const Spacing = (_param)=>{
    var { size = 8, style: styleProp } = _param, restProps = _object_without_properties(_param, [
        "size",
        "style"
    ]);
    const style = _object_spread({
        height: size,
        padding: `${size / 2}px 0`
    }, styleProp);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: "vkuiSpacing",
        style: style
    }));
};

//# sourceMappingURL=Spacing.js.map