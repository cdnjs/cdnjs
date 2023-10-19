import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { SizeType } from '../../../lib/adaptivity';
import { Typography } from '../Typography';
import styles from './Subhead.module.css';
const sizeYClassNames = {
    none: styles['Subhead--sizeY-none'],
    [SizeType.COMPACT]: styles['Subhead--sizeY-compact']
};
/**
 * Используется для подзаголовков 2 уровня.
 *
 * @see https://vkcom.github.io/VKUI/#/Subhead
 */ export const Subhead = ({ className, Component = 'h5', normalize = true, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(Typography, {
        Component: Component,
        normalize: normalize,
        className: classNames(className, styles['Subhead'], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY]),
        ...restProps
    });
};

//# sourceMappingURL=Subhead.js.map