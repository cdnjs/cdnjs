"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropTargetIndicator = void 0;
const utils_1 = require("../utils/utils");
/** @internal */
class DropTargetIndicator {
    constructor() {
        // Maybe use container instead of Document Body?
        this._element = document.createElement('div');
        this._element.classList.add("lm_dropTargetIndicator" /* DropTargetIndicator */);
        const innerElement = document.createElement('div');
        innerElement.classList.add("lm_inner" /* Inner */);
        this._element.appendChild(innerElement);
        document.body.appendChild(this._element);
    }
    destroy() {
        this._element.remove();
    }
    highlightArea(area) {
        this._element.style.left = utils_1.numberToPixels(area.x1);
        this._element.style.top = utils_1.numberToPixels(area.y1);
        this._element.style.width = utils_1.numberToPixels(area.x2 - area.x1);
        this._element.style.height = utils_1.numberToPixels(area.y2 - area.y1);
        this._element.style.display = 'block';
    }
    hide() {
        utils_1.setElementDisplayVisibility(this._element, false);
    }
}
exports.DropTargetIndicator = DropTargetIndicator;
//# sourceMappingURL=drop-target-indicator.js.map