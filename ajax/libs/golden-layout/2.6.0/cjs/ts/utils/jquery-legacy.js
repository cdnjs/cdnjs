"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJQueryLeftAndTop = void 0;
const utils_1 = require("./utils");
/** @internal */
function getJQueryLeftAndTop(element) {
    const style = getComputedStyle(element, null);
    const leftAndTop = {
        left: (0, utils_1.pixelsToNumber)(style.left),
        top: (0, utils_1.pixelsToNumber)(style.top),
    };
    return leftAndTop;
}
exports.getJQueryLeftAndTop = getJQueryLeftAndTop;
//# sourceMappingURL=jquery-legacy.js.map