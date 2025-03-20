import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { Typography } from '../Typography';
const stylesLevel = {
    '1': "vkuiDisplayTitle--level-1",
    '2': "vkuiDisplayTitle--level-2",
    '3': "vkuiDisplayTitle--level-3",
    '4': "vkuiDisplayTitle--level-4"
};
const sizeYClassNames = {
    none: "vkuiDisplayTitle--sizeY-none",
    compact: "vkuiDisplayTitle--sizeY-compact"
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