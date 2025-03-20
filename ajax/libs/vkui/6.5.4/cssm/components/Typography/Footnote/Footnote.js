import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { Typography } from '../Typography';
import styles from './Footnote.module.css';
/**
 * Используется для основных подписей.
 *
 * @see https://vkcom.github.io/VKUI/#/Footnote
 */ export const Footnote = ({ className, caps, Component = 'span', normalize = true, inline = false, ...restProps })=>/*#__PURE__*/ _jsx(Typography, {
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: classNames(className, styles['Footnote'], caps && styles['Footnote--caps']),
        ...restProps
    });

//# sourceMappingURL=Footnote.js.map