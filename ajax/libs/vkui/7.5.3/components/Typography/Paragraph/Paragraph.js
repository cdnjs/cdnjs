'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { Typography } from "../Typography.js";
const sizeYClassNames = {
    none: "vkuiParagraph__sizeYNone",
    compact: "vkuiParagraph__sizeYCompact"
};
/**
 * Используется для основного текста.
 *
 * @see https://vkui.io/components/typography#paragraph
 */ export const Paragraph = (_param)=>{
    var { className, Component = 'span', normalize = false, inline = false } = _param, restProps = _object_without_properties(_param, [
        "className",
        "Component",
        "normalize",
        "inline"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Typography, _object_spread({
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: classNames(className, "vkuiParagraph__host", sizeY !== 'regular' && sizeYClassNames[sizeY])
    }, restProps));
};

//# sourceMappingURL=Paragraph.js.map