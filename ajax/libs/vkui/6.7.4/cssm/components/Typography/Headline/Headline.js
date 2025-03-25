import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { Typography } from '../Typography';
import styles from './Headline.module.css';
const stylesLevel = {
    '1': styles['Headline--level-1'],
    '2': styles['Headline--level-2']
};
const sizeYClassNames = {
    none: styles['Headline--sizeY-none'],
    compact: styles['Headline--sizeY-compact']
};
/**
 * Используется для подзаголовков.
 *
 * @see https://vkcom.github.io/VKUI/#/Headline
 */ export const Headline = ({ className, level = '1', Component = 'span', normalize = true, inline = false, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Typography, {
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: classNames(className, sizeY !== 'regular' && sizeYClassNames[sizeY], stylesLevel[level]),
        ...restProps
    });
};

//# sourceMappingURL=Headline.js.map