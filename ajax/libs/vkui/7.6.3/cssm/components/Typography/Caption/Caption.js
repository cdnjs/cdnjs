'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { Typography } from "../Typography.js";
import styles from "./Caption.module.css";
const stylesLevel = {
    '1': styles.level1,
    '2': styles.level2,
    '3': styles.level3
};
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
export function captionClassNames(sizeY, level = '1', caps = false) {
    return classNames(sizeY !== 'regular' && sizeYClassNames[sizeY], caps && styles.caps, stylesLevel[level]);
}
/**
 * Используется для мелких подписей.
 *
 * @see https://vkui.io/components/typography#caption
 */ export const Caption = ({ className, level = '1', caps, Component = 'span', normalize = true, inline = false, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Typography, {
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: classNames(className, captionClassNames(sizeY, level, caps)),
        ...restProps
    });
};

//# sourceMappingURL=Caption.js.map