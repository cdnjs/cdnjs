import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { Typography } from '../Typography';
const stylesLevel = {
    '1': "vkuiCaption--level-1",
    '2': "vkuiCaption--level-2",
    '3': "vkuiCaption--level-3"
};
const sizeYClassNames = {
    none: "vkuiCaption--sizeY-none",
    compact: "vkuiCaption--sizeY-compact"
};
/**
 * Используется для мелких подписей.
 *
 * @see https://vkcom.github.io/VKUI/#/Caption
 */ export const Caption = (_param)=>{
    var { className, level = '1', caps, Component = 'span', normalize = true, inline = false } = _param, restProps = _object_without_properties(_param, [
        "className",
        "level",
        "caps",
        "Component",
        "normalize",
        "inline"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Typography, _object_spread({
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: classNames(className, sizeY !== 'regular' && sizeYClassNames[sizeY], caps && "vkuiCaption--caps", stylesLevel[level])
    }, restProps));
};

//# sourceMappingURL=Caption.js.map