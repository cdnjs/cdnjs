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
    checkIsNotAutoPlacement: function() {
        return checkIsNotAutoPlacement;
    },
    convertFloatingDataToReactCSSProperties: function() {
        return convertFloatingDataToReactCSSProperties;
    },
    getArrowCoordsByMiddlewareData: function() {
        return getArrowCoordsByMiddlewareData;
    },
    getAutoPlacementAlign: function() {
        return getAutoPlacementAlign;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
function checkIsNotAutoPlacement(placement) {
    return !placement.startsWith('auto');
}
function getAutoPlacementAlign(placement) {
    const align = placement.replace(/auto-|auto/, '');
    return align === 'start' || align === 'end' ? align : null;
}
function convertFloatingDataToReactCSSProperties(strategy, x, y, initialWidth = 'max-content', middlewareData) {
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
const getArrowCoordsByMiddlewareData = (middlewareData)=>{
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