import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { Typography } from '../Typography';
import styles from './DisplayTitle.module.css';
const stylesLevel = {
    '1': styles['DisplayTitle--level-1'],
    '2': styles['DisplayTitle--level-2'],
    '3': styles['DisplayTitle--level-3'],
    '4': styles['DisplayTitle--level-4']
};
/**
 * Используется для крупных заголовков.
 *
 * @see https://vkcom.github.io/VKUI/#/DisplayTitle
 */ export const DisplayTitle = ({ className, level = '1', Component = 'span', normalize = true, inline = false, ...restProps })=>{
    return /*#__PURE__*/ _jsx(Typography, {
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: classNames(className, stylesLevel[level]),
        ...restProps
    });
};

//# sourceMappingURL=DisplayTitle.js.map