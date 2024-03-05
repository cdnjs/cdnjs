import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Typography } from '../Typography';
/**
 * Используется для основных подписей.
 *
 * @see https://vkcom.github.io/VKUI/#/Footnote
 */ export const Footnote = (_param)=>{
    var { className, caps, Component = 'span', normalize = true } = _param, restProps = _object_without_properties(_param, [
        "className",
        "caps",
        "Component",
        "normalize"
    ]);
    return /*#__PURE__*/ React.createElement(Typography, _object_spread({
        Component: Component,
        normalize: normalize,
        className: classNames(className, "vkuiFootnote", caps && "vkuiFootnote--caps")
    }, restProps));
};

//# sourceMappingURL=Footnote.js.map