import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { Typography } from '../Typography';
import styles from './Text.module.css';
const sizeYClassNames = {
    none: styles['Text--sizeY-none'],
    ['compact']: styles['Text--sizeY-compact']
};
/**
 * Основной наборный текст.
 *
 * @see https://vkcom.github.io/VKUI/#/Text
 */ export const Text = ({ className, Component = 'span', normalize = true, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(Typography, {
        Component: Component,
        normalize: normalize,
        className: classNames(className, styles['Text'], sizeY !== 'regular' && sizeYClassNames[sizeY]),
        ...restProps
    });
};

//# sourceMappingURL=Text.js.map