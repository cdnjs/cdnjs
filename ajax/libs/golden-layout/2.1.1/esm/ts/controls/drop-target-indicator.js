import { numberToPixels, setElementDisplayVisibility } from '../utils/utils';
/** @internal */
export class DropTargetIndicator {
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
        this._element.style.left = numberToPixels(area.x1);
        this._element.style.top = numberToPixels(area.y1);
        this._element.style.width = numberToPixels(area.x2 - area.x1);
        this._element.style.height = numberToPixels(area.y2 - area.y1);
        this._element.style.display = 'block';
    }
    hide() {
        setElementDisplayVisibility(this._element, false);
    }
}
//# sourceMappingURL=drop-target-indicator.js.map