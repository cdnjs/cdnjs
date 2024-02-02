import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Typography } from '../Typography';
import styles from './Footnote.module.css';
/**
 * Используется для основных подписей.
 *
 * @see https://vkcom.github.io/VKUI/#/Footnote
 */ export const Footnote = ({ className, caps, Component = 'span', normalize = true, ...restProps })=>/*#__PURE__*/ React.createElement(Typography, {
        Component: Component,
        normalize: normalize,
        className: classNames(className, styles['Footnote'], caps && styles['Footnote--caps']),
        ...restProps
    });

//# sourceMappingURL=Footnote.js.map