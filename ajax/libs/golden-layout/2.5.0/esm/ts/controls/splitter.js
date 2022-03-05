import { DragListener } from '../utils/drag-listener';
import { numberToPixels } from '../utils/utils';
/** @internal */
export class Splitter {
    constructor(_isVertical, _size, grabSize) {
        this._isVertical = _isVertical;
        this._size = _size;
        this._grabSize = grabSize < this._size ? this._size : grabSize;
        this._element = document.createElement('div');
        this._element.classList.add("lm_splitter" /* Splitter */);
        const dragHandleElement = document.createElement('div');
        dragHandleElement.classList.add("lm_drag_handle" /* DragHandle */);
        const handleExcessSize = this._grabSize - this._size;
        const handleExcessPos = handleExcessSize / 2;
        if (this._isVertical) {
            dragHandleElement.style.top = numberToPixels(-handleExcessPos);
            dragHandleElement.style.height = numberToPixels(this._size + handleExcessSize);
            this._element.classList.add("lm_vertical" /* Vertical */);
            this._element.style.height = numberToPixels(this._size);
        }
        else {
            dragHandleElement.style.left = numberToPixels(-handleExcessPos);
            dragHandleElement.style.width = numberToPixels(this._size + handleExcessSize);
            this._element.classList.add("lm_horizontal" /* Horizontal */);
            this._element.style.width = numberToPixels(this._size);
        }
        this._element.appendChild(dragHandleElement);
        this._dragListener = new DragListener(this._element, [dragHandleElement]);
    }
    get element() { return this._element; }
    destroy() {
        this._element.remove();
    }
    on(eventName, callback) {
        this._dragListener.on(eventName, callback);
    }
}
//# sourceMappingURL=splitter.js.map