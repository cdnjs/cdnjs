import { pixelsToNumber } from './utils';
/** @internal */
export function getJQueryOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft,
    };
}
/** @internal */
export function getJQueryLeftAndTop(element) {
    const style = getComputedStyle(element, null);
    const leftAndTop = {
        left: pixelsToNumber(style.left),
        top: pixelsToNumber(style.top),
    };
    return leftAndTop;
}
//# sourceMappingURL=jquery-legacy.js.map