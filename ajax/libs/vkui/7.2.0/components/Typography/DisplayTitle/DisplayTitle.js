'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { Typography } from "../Typography.js";
const stylesLevel = {
    '1': "vkuiDisplayTitle__level1",
    '2': "vkuiDisplayTitle__level2",
    '3': "vkuiDisplayTitle__level3",
    '4': "vkuiDisplayTitle__level4"
};
const sizeYClassNames = {
    none: "vkuiDisplayTitle__sizeYNone",
    compact: "vkuiDisplayTitle__sizeYCompact"
};
/**
 * Используется для крупных заголовков.
 *
 * @see https://vkcom.github.io/VKUI/#/DisplayTitle
 */ export const DisplayTitle = (_param)=>{
    var { className, level = '1', Component = 'span', normalize = true, inline = false } = _param, restProps = _object_without_properties(_param, [
        "className",
        "level",
        "Component",
        "normalize",
        "inline"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Typography, _object_spread({
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: classNames(className, sizeY !== 'regular' && sizeYClassNames[sizeY], stylesLevel[level])
    }, restProps));
};

//# sourceMappingURL=DisplayTitle.js.map