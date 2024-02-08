import * as React from 'react';
import { Icon24Reorder, Icon24ReorderIos } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { useDraggableWithDomApi } from '../../../hooks/useDraggableWithDomApi';
import { usePlatform } from '../../../hooks/usePlatform';
import { useIsomorphicLayoutEffect } from '../../../lib/useIsomorphicLayoutEffect';
import { Touch } from '../../Touch/Touch';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import styles from './CellDragger.module.css';
export const CellDragger = ({ elRef, disabled, className, onDragStateChange, onDragFinish, children, ...restProps })=>{
    const platform = usePlatform();
    const Icon = platform === 'ios' ? Icon24ReorderIos : Icon24Reorder;
    const { dragging, onDragStart, onDragMove, onDragEnd } = useDraggableWithDomApi({
        elRef,
        onDragFinish
    });
    useIsomorphicLayoutEffect(()=>{
        if (onDragStateChange) {
            onDragStateChange(dragging);
        }
    }, [
        dragging,
        onDragStateChange
    ]);
    return /*#__PURE__*/ React.createElement(Touch, {
        className: classNames(styles['CellDragger'], className),
        onStart: disabled ? undefined : onDragStart,
        onMoveY: disabled ? undefined : onDragMove,
        onEnd: disabled ? undefined : onDragEnd,
        ...restProps
    }, children && /*#__PURE__*/ React.createElement(VisuallyHidden, null, children), /*#__PURE__*/ React.createElement(Icon, {
        className: styles['CellDragger__icon']
    }));
};

//# sourceMappingURL=CellDragger.js.map