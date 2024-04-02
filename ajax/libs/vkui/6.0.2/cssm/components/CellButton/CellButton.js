import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { SimpleCell } from '../SimpleCell/SimpleCell';
import styles from './CellButton.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/CellButton
 */ export const CellButton = ({ centered = false, mode = 'primary', className, ...restProps })=>{
    return /*#__PURE__*/ React.createElement(SimpleCell, {
        ...restProps,
        className: classNames(styles['CellButton'], mode === 'danger' && styles['CellButton--mode-danger'], centered && styles['CellButton--centered'], className)
    });
};

//# sourceMappingURL=CellButton.js.map