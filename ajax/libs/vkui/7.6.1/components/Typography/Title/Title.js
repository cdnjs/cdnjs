'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { Typography } from "../Typography.js";
const stylesLevel = {
    '1': "vkuiTitle__level1",
    '2': "vkuiTitle__level2",
    '3': "vkuiTitle__level3"
};
const sizeYClassNames = {
    none: "vkuiTitle__sizeYNone",
    compact: "vkuiTitle__sizeYCompact"
};
/**
 * Используется для заголовков.
 *
 * @see https://vkui.io/components/typography#title
 */ export const Title = (_param)=>{
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

//# sourceMappingURL=Title.js.map