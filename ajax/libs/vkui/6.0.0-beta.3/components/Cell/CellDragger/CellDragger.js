import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon24Reorder, Icon24ReorderIos } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { useDraggableWithDomApi } from '../../../hooks/useDraggableWithDomApi';
import { usePlatform } from '../../../hooks/usePlatform';
import { useIsomorphicLayoutEffect } from '../../../lib/useIsomorphicLayoutEffect';
import { Touch } from '../../Touch/Touch';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
export const CellDragger = (_param)=>{
    var { elRef, disabled, className, onDragStateChange, onDragFinish, children } = _param, restProps = _object_without_properties(_param, [
        "elRef",
        "disabled",
        "className",
        "onDragStateChange",
        "onDragFinish",
        "children"
    ]);
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
    return /*#__PURE__*/ React.createElement(Touch, _object_spread({
        className: classNames("vkuiCellDragger", className),
        onStart: disabled ? undefined : onDragStart,
        onMoveY: disabled ? undefined : onDragMove,
        onEnd: disabled ? undefined : onDragEnd
    }, restProps), children && /*#__PURE__*/ React.createElement(VisuallyHidden, null, children), /*#__PURE__*/ React.createElement(Icon, {
        className: "vkuiCellDragger__icon"
    }));
};

//# sourceMappingURL=CellDragger.js.map