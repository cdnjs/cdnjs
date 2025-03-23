import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { stopPropagation } from '../../lib/utils';
import { useDragAndDrop } from './useDragAndDrop';
import { useHorizontalScrollController } from './useHorizontalScrollController';
export const ScrollX = ({ barHandlers, boxRef, autoHideScrollbar, autoHideScrollbarDelay })=>{
    const { barRef: barX, trackerVisible: horizontalTrackerVisible, trackerRef: trackerX, resize: horizontalScrollResize, scroll: horizontalScroll, dragStart: onHorizontalDragStart, dragging: onHorizontalDragging, dragEnd: onHorizontalDragEnd, trackerMouseEnter: onHorizontalTrackerMouseEnter, trackerMouseLeave: onHorizontalTrackerMouseLeave } = useHorizontalScrollController(boxRef, autoHideScrollbar, autoHideScrollbarDelay);
    const { onDragStart: onMouseDown } = useDragAndDrop(onHorizontalDragStart, onHorizontalDragging, onHorizontalDragEnd);
    React.useImperativeHandle(barHandlers, ()=>({
            resize: horizontalScrollResize,
            scroll: horizontalScroll
        }), [
        horizontalScrollResize,
        horizontalScroll
    ]);
    return /*#__PURE__*/ _jsx("div", {
        className: "vkuiCustomScrollView__barX",
        ref: barX,
        onClick: stopPropagation,
        children: /*#__PURE__*/ _jsx("div", {
            className: classNames("vkuiCustomScrollView__trackerX", !horizontalTrackerVisible && "vkuiCustomScrollView__trackerX--hidden"),
            onMouseEnter: autoHideScrollbar ? onHorizontalTrackerMouseEnter : undefined,
            onMouseLeave: autoHideScrollbar ? onHorizontalTrackerMouseLeave : undefined,
            ref: trackerX,
            onMouseDown: onMouseDown
        })
    });
};

//# sourceMappingURL=ScrollX.js.map