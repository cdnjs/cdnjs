import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { Typography } from '../Typography';
import styles from './DisplayTitle.module.css';
const stylesLevel = {
    '1': styles['DisplayTitle--level-1'],
    '2': styles['DisplayTitle--level-2'],
    '3': styles['DisplayTitle--level-3'],
    '4': styles['DisplayTitle--level-4']
};
const sizeYClassNames = {
    none: styles['DisplayTitle--sizeY-none'],
    compact: styles['DisplayTitle--sizeY-compact']
};
/**
 * Используется для крупных заголовков.
 *
 * @see https://vkcom.github.io/VKUI/#/DisplayTitle
 */ export const DisplayTitle = ({ className, level = '1', Component = 'span', normalize = true, inline = false, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Typography, {
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: classNames(className, sizeY !== 'regular' && sizeYClassNames[sizeY], stylesLevel[level]),
        ...restProps
    });
};

//# sourceMappingURL=DisplayTitle.js.map