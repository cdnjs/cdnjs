import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { Typography } from '../Typography';
const sizeYClassNames = {
    none: "vkuiSubhead--sizeY-none",
    ['compact']: "vkuiSubhead--sizeY-compact"
};
/**
 * Используется для подзаголовков 2 уровня.
 *
 * @see https://vkcom.github.io/VKUI/#/Subhead
 */ export const Subhead = (_param)=>{
    var { className, Component = 'span', normalize = true } = _param, restProps = _object_without_properties(_param, [
        "className",
        "Component",
        "normalize"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(Typography, _object_spread({
        Component: Component,
        normalize: normalize,
        className: classNames(className, "vkuiSubhead", sizeY !== 'regular' && sizeYClassNames[sizeY])
    }, restProps));
};

//# sourceMappingURL=Subhead.js.map