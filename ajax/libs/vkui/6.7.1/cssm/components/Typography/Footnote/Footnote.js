import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { Typography } from '../Typography';
import styles from './Footnote.module.css';
const sizeYClassNames = {
    none: styles['Footnote--sizeY-none'],
    compact: styles['Footnote--sizeY-compact']
};
/**
 * Используется для основных подписей.
 *
 * @see https://vkcom.github.io/VKUI/#/Footnote
 */ export const Footnote = ({ className, caps, Component = 'span', normalize = true, inline = false, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Typography, {
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: classNames(className, sizeY !== 'regular' && sizeYClassNames[sizeY], styles['Footnote'], caps && styles['Footnote--caps']),
        ...restProps
    });
};

//# sourceMappingURL=Footnote.js.map