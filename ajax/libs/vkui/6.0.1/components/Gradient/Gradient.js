import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
/**
 * @see https://vkcom.github.io/VKUI/#/Gradient
 */ export const Gradient = (_param)=>{
    var { mode = 'default', to = 'top' } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "to"
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({
        role: "presentation"
    }, restProps), {
        baseClassName: classNames("vkuiGradient", mode !== 'default' && "vkuiGradient--mode-tint", to === 'bottom' && "vkuiGradient--to-bottom")
    }));
};

//# sourceMappingURL=Gradient.js.map