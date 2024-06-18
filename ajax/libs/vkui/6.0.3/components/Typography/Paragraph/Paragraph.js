import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Typography } from '../Typography';
/**
 * Используется для основного текста.
 *
 * @see https://vkcom.github.io/VKUI/#/Paragraph
 */ export const Paragraph = (_param)=>{
    var { className, Component = 'span', normalize = false } = _param, restProps = _object_without_properties(_param, [
        "className",
        "Component",
        "normalize"
    ]);
    return /*#__PURE__*/ React.createElement(Typography, _object_spread({
        Component: Component,
        normalize: normalize,
        className: classNames(className, "vkuiParagraph")
    }, restProps));
};

//# sourceMappingURL=Paragraph.js.map