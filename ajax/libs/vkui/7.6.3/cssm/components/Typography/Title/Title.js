'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { Typography } from "../Typography.js";
import styles from "./Title.module.css";
const stylesLevel = {
    '1': styles.level1,
    '2': styles.level2,
    '3': styles.level3
};
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
/**
 * Используется для заголовков.
 *
 * @see https://vkui.io/components/typography#title
 */ export const Title = ({ className, level = '1', Component = 'span', normalize = true, inline = false, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Typography, {
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: classNames(className, sizeY !== 'regular' && sizeYClassNames[sizeY], stylesLevel[level]),
        ...restProps
    });
};

//# sourceMappingURL=Title.js.map