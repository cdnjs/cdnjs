import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { Typography } from '../Typography';
import styles from './Subhead.module.css';
const sizeYClassNames = {
    none: styles['Subhead--sizeY-none'],
    ['compact']: styles['Subhead--sizeY-compact']
};
/**
 * Используется для подзаголовков 2 уровня.
 *
 * @see https://vkcom.github.io/VKUI/#/Subhead
 */ export const Subhead = ({ className, Component = 'span', normalize = true, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(Typography, {
        Component: Component,
        normalize: normalize,
        className: classNames(className, styles['Subhead'], sizeY !== 'regular' && sizeYClassNames[sizeY]),
        ...restProps
    });
};

//# sourceMappingURL=Subhead.js.map