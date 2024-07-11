import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { Typography } from '../Typography';
import styles from './Paragraph.module.css';
/**
 * Используется для основного текста.
 *
 * @see https://vkcom.github.io/VKUI/#/Paragraph
 */ export const Paragraph = ({ className, Component = 'span', normalize = false, inline = false, ...restProps })=>{
    return /*#__PURE__*/ _jsx(Typography, {
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: classNames(className, styles['Paragraph']),
        ...restProps
    });
};

//# sourceMappingURL=Paragraph.js.map