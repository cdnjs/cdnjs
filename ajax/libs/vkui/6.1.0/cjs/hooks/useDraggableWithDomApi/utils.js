"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getTargetIsOverOrUnderElData: function() {
        return getTargetIsOverOrUnderElData;
    },
    setDraggingItemShiftStyles: function() {
        return setDraggingItemShiftStyles;
    },
    setInitialDraggingItemStyles: function() {
        return setInitialDraggingItemStyles;
    },
    setInitialPlaceholderItemStyles: function() {
        return setInitialPlaceholderItemStyles;
    },
    setInitialSiblingItemStyles: function() {
        return setInitialSiblingItemStyles;
    },
    setSiblingItemsShiftStyles: function() {
        return setSiblingItemsShiftStyles;
    },
    unsetInitialDraggingItemStyles: function() {
        return unsetInitialDraggingItemStyles;
    },
    unsetInitialPlaceholderItemStyles: function() {
        return unsetInitialPlaceholderItemStyles;
    },
    unsetInitialSiblingItemStyles: function() {
        return unsetInitialSiblingItemStyles;
    }
});
const getTargetIsOverOrUnderElData = (clientY, elRect)=>{
    const elRectHalfHeight = elRect.height / 2;
    return {
        isUnderEl: clientY <= elRect.bottom - elRectHalfHeight,
        isOverEl: clientY >= elRect.top + elRectHalfHeight
    };
};
const setDraggingItemShiftStyles = (draggingEl, nextShiftY)=>{
    requestAnimationFrame(()=>{
        draggingEl.style.transform = `translateY(${nextShiftY}px)`;
    });
};
const setSiblingItemsShiftStyles = ([{ el, draggingElRect: { height } }, direction])=>{
    requestAnimationFrame(()=>{
        if (direction === 'up') {
            el.style.setProperty('transition', 'transform 0.3s ease-in 0s');
            el.style.removeProperty('transform');
        } else {
            el.style.setProperty('transition', 'transform 0.3s ease-out 0s');
            el.style.setProperty('transform', `translateY(${height}px)`);
        }
    });
};
const setInitialDraggingItemStyles = ({ el, draggingElRect })=>{
    const { top, left, width, height } = draggingElRect;
    requestAnimationFrame(()=>{
        // Inspired by https://github.com/hello-pangea/dnd
        el.style.setProperty('pointer-events', 'none');
        el.style.setProperty('position', 'fixed');
        el.style.setProperty('top', `${top}px`);
        el.style.setProperty('left', `${left}px`);
        el.style.setProperty('width', `${width}px`);
        el.style.setProperty('height', `${height}px`);
        el.style.setProperty('z-index', 'var(--vkui_internal--z_index_cell_dragging)');
        el.style.setProperty('box-sizing', 'border-box');
        el.style.setProperty('transform', 'translateY(0)');
    });
};
const unsetInitialDraggingItemStyles = ({ el })=>{
    requestAnimationFrame(()=>{
        el.style.removeProperty('pointer-events');
        el.style.removeProperty('position');
        el.style.removeProperty('top');
        el.style.removeProperty('left');
        el.style.removeProperty('width');
        el.style.removeProperty('height');
        el.style.removeProperty('z-index');
        el.style.removeProperty('box-sizing');
        el.style.removeProperty('transform');
    });
};
const setInitialPlaceholderItemStyles = ({ el, draggingElRect })=>{
    if (el.firstElementChild) {
        return;
    }
    const { width, height } = draggingElRect;
    const node = el.cloneNode();
    node.style.setProperty('display', 'block');
    node.style.setProperty('width', `${width}px`);
    node.style.setProperty('height', `${height}px`);
    node.style.setProperty('pointer-events', 'none');
    el.appendChild(node);
};
const unsetInitialPlaceholderItemStyles = ({ el })=>{
    if (el.firstElementChild) {
        el.firstElementChild.remove();
    }
};
const setInitialSiblingItemStyles = ({ el, shifted, draggingElRect })=>{
    const { height } = draggingElRect;
    requestAnimationFrame(()=>{
        el.style.setProperty('pointer-events', 'none');
        el.style.setProperty('transition', 'none 0s ease 0s');
        if (shifted) {
            el.style.setProperty('transform', `translateY(${height}px)`);
        }
    });
};
const unsetInitialSiblingItemStyles = ({ el })=>{
    requestAnimationFrame(()=>{
        el.style.removeProperty('pointer-events');
        el.style.removeProperty('transition');
        el.style.removeProperty('transform');
    });
};

//# sourceMappingURL=utils.js.map