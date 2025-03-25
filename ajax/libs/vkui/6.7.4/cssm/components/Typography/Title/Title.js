import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { Typography } from '../Typography';
import styles from './Title.module.css';
const stylesLevel = {
    '1': styles['Title--level-1'],
    '2': styles['Title--level-2'],
    '3': styles['Title--level-3']
};
const sizeYClassNames = {
    none: styles['Title--sizeY-none'],
    compact: styles['Title--sizeY-compact']
};
/**
 * Используется для заголовков.
 *
 * @see https://vkcom.github.io/VKUI/#/Title
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