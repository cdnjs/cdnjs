'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { Typography } from "../Typography.js";
import styles from "./Footnote.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
export function footnoteClassNames(sizeY, caps = false) {
    return classNames(styles.host, sizeY !== 'regular' && sizeYClassNames[sizeY], caps && styles.caps);
}
/**
 * Используется для основных подписей.
 *
 * @see https://vkui.io/components/typography#footnote
 */ export const Footnote = ({ className, caps, Component = 'span', normalize = true, inline = false, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Typography, {
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: classNames(className, footnoteClassNames(sizeY, caps)),
        ...restProps
    });
};

//# sourceMappingURL=Footnote.js.map