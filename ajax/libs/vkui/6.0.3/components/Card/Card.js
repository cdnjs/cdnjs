import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
/**
 * @see https://vkcom.github.io/VKUI/#/Card
 */ export const Card = (_param)=>{
    var { mode = 'tint' } = _param, restProps = _object_without_properties(_param, [
        "mode"
    ]);
    const withBorder = mode === 'outline' || mode === 'outline-tint';
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiCard", mode === 'outline' && "vkuiCard--mode-outline", mode === 'shadow' && "vkuiCard--mode-shadow", withBorder && "vkuiCard--withBorder")
    }));
};

//# sourceMappingURL=Card.js.map