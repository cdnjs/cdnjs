'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { Typography } from "../Typography.js";
const stylesLevel = {
    '1': "vkuiCaption__level1",
    '2': "vkuiCaption__level2",
    '3': "vkuiCaption__level3"
};
const sizeYClassNames = {
    none: "vkuiCaption__sizeYNone",
    compact: "vkuiCaption__sizeYCompact"
};
export function captionClassNames(sizeY, level = '1', caps = false) {
    return classNames(sizeY !== 'regular' && sizeYClassNames[sizeY], caps && "vkuiCaption__caps", stylesLevel[level]);
}
/**
 * Используется для мелких подписей.
 *
 * @see https://vkui.io/components/typography#caption
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
        className: classNames(className, captionClassNames(sizeY, level, caps))
    }, restProps));
};

//# sourceMappingURL=Caption.js.map