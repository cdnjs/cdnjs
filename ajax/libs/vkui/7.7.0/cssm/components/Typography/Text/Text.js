'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { Typography } from "../Typography.js";
import styles from "./Text.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
/**
 * Основной наборный текст.
 *
 * @see https://vkui.io/components/typography#text
 */ export const Text = ({ className, Component = 'span', normalize = true, inline = false, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Typography, {
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: classNames(className, styles.host, sizeY !== 'regular' && sizeYClassNames[sizeY]),
        ...restProps
    });
};

//# sourceMappingURL=Text.js.map