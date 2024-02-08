import * as React from 'react';
export function checkIsNotAutoPlacement(placement) {
    return !placement.startsWith('auto');
}
export function getAutoPlacementAlign(placement) {
    const align = placement.replace(/auto-|auto/, '');
    return align === 'start' || align === 'end' ? align : null;
}
/**
 * Note: не используем `translate3d`, чтобы в лишний раз не выносить в отдельный слой и не занимать память в GPU.
 *
 * см. https://floating-ui.com/docs/react#positioning
 */ export function convertFloatingDataToReactCSSProperties(strategy, x, y, initialWidth = 'max-content', middlewareData) {
    const styles = {
        position: strategy,
        top: y,
        right: 'auto',
        bottom: 'auto',
        left: x
    };
    if (initialWidth !== null) {
        styles.width = initialWidth;
    }
    if (middlewareData) {
        const hide = middlewareData.hide;
        if (hide && hide.referenceHidden) {
            styles['visibility'] = 'hidden';
        }
    }
    return styles;
}
export const getArrowCoordsByMiddlewareData = (middlewareData)=>{
    const coords = {
        x: 0,
        y: 0
    };
    if (middlewareData.arrow) {
        const { x = 0, y = 0 } = middlewareData.arrow;
        coords.x = x;
        coords.y = y;
    }
    return coords;
};

//# sourceMappingURL=functions.js.map