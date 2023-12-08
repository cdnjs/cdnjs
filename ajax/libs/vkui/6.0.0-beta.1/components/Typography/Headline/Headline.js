import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { Typography } from '../Typography';
const stylesLevel = {
    '1': "vkuiHeadline--level-1",
    '2': "vkuiHeadline--level-2"
};
const sizeYClassNames = {
    none: "vkuiHeadline--sizeY-none",
    ['compact']: "vkuiHeadline--sizeY-compact"
};
/**
 * Используется для подзаголовков.
 *
 * @see https://vkcom.github.io/VKUI/#/Headline
 */ export const Headline = (_param)=>{
    var { className, weight = '3', level = '1', Component = 'span', normalize = true } = _param, restProps = _object_without_properties(_param, [
        "className",
        "weight",
        "level",
        "Component",
        "normalize"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(Typography, _object_spread({
        Component: Component,
        normalize: normalize,
        weight: weight,
        className: classNames(className, sizeY !== 'regular' && sizeYClassNames[sizeY], stylesLevel[level])
    }, restProps));
};

//# sourceMappingURL=Headline.js.map