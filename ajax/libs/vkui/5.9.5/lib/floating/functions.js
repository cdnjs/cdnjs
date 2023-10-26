import * as React from "react";
export function checkIsNotAutoPlacement(placement) {
    return !placement.startsWith("auto");
}
export function getAutoPlacementAlign(placement) {
    var align = placement.replace(/auto-|auto/, "");
    return align === "start" || align === "end" ? align : null;
}
/**
 * Note: не используем `translate3d`, чтобы в лишний раз не выносить в отдельный слой и не занимать память в GPU.
 *
 * см. https://floating-ui.com/docs/react#positioning
 */ export function convertFloatingDataToReactCSSProperties(strategy, x, y) {
    var initialWidth = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "max-content";
    var styles = {
        position: strategy,
        top: y,
        right: "auto",
        bottom: "auto",
        left: x
    };
    if (initialWidth !== null) {
        styles.width = initialWidth;
    }
    return styles;
}

//# sourceMappingURL=functions.js.map