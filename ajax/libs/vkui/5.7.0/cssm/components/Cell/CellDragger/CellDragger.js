import * as React from 'react';
import { Icon24Reorder, Icon24ReorderIos } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../../hooks/usePlatform';
import { Platform } from '../../../lib/platform';
import { Touch } from '../../Touch/Touch';
import styles from './CellDragger.module.css';
export const CellDragger = ({ onDragStart, onDragMove, onDragEnd, onClick, className, ...restProps })=>{
    const platform = usePlatform();
    const handleClick = (event)=>{
        event.preventDefault();
        if (onClick) {
            onClick(event);
        }
    };
    return /*#__PURE__*/ React.createElement(Touch, {
        className: classNames(styles['CellDragger'], className),
        onStart: onDragStart,
        onMoveY: onDragMove,
        onEnd: onDragEnd,
        onClick: handleClick,
        ...restProps
    }, platform === Platform.IOS ? /*#__PURE__*/ React.createElement(Icon24ReorderIos, null) : /*#__PURE__*/ React.createElement(Icon24Reorder, null));
};

//# sourceMappingURL=CellDragger.js.map