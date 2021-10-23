"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJQueryLeftAndTop = exports.getJQueryOffset = void 0;
const utils_1 = require("./utils");
/** @internal */
function getJQueryOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft,
    };
}
exports.getJQueryOffset = getJQueryOffset;
/** @internal */
function getJQueryLeftAndTop(element) {
    const style = getComputedStyle(element, null);
    const leftAndTop = {
        left: utils_1.pixelsToNumber(style.left),
        top: utils_1.pixelsToNumber(style.top),
    };
    return leftAndTop;
}
exports.getJQueryLeftAndTop = getJQueryLeftAndTop;
//# sourceMappingURL=jquery-legacy.js.map