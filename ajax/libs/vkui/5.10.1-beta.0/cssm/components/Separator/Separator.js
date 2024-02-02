import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Separator.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */ export const Separator = ({ wide, ...restProps })=>/*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['Separator'], !wide && styles['Separator--padded'])
    }, /*#__PURE__*/ React.createElement("hr", {
        className: styles['Separator__in']
    }));

//# sourceMappingURL=Separator.js.map