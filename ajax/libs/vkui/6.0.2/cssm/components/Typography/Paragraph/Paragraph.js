import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Typography } from '../Typography';
import styles from './Paragraph.module.css';
/**
 * Используется для основного текста.
 *
 * @see https://vkcom.github.io/VKUI/#/Paragraph
 */ export const Paragraph = ({ className, Component = 'span', normalize = false, ...restProps })=>{
    return /*#__PURE__*/ React.createElement(Typography, {
        Component: Component,
        normalize: normalize,
        className: classNames(className, styles['Paragraph']),
        ...restProps
    });
};

//# sourceMappingURL=Paragraph.js.map