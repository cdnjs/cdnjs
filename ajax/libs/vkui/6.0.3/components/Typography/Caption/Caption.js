import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Typography } from '../Typography';
const stylesLevel = {
    '1': "vkuiCaption--level-1",
    '2': "vkuiCaption--level-2",
    '3': "vkuiCaption--level-3"
};
/**
 * Используется для мелких подписей.
 *
 * @see https://vkcom.github.io/VKUI/#/Caption
 */ export const Caption = (_param)=>{
    var { className, level = '1', caps, Component = 'span', normalize = true } = _param, restProps = _object_without_properties(_param, [
        "className",
        "level",
        "caps",
        "Component",
        "normalize"
    ]);
    return /*#__PURE__*/ React.createElement(Typography, _object_spread({
        Component: Component,
        normalize: normalize,
        className: classNames(className, caps && "vkuiCaption--caps", stylesLevel[level])
    }, restProps));
};

//# sourceMappingURL=Caption.js.map