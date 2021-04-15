"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Splitter = void 0;
const drag_listener_1 = require("../utils/drag-listener");
const utils_1 = require("../utils/utils");
/** @internal */
class Splitter {
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
            dragHandleElement.style.top = utils_1.numberToPixels(-handleExcessPos);
            dragHandleElement.style.height = utils_1.numberToPixels(this._size + handleExcessSize);
            this._element.classList.add("lm_vertical" /* Vertical */);
            this._element.style.height = utils_1.numberToPixels(this._size);
        }
        else {
            dragHandleElement.style.left = utils_1.numberToPixels(-handleExcessPos);
            dragHandleElement.style.width = utils_1.numberToPixels(this._size + handleExcessSize);
            this._element.classList.add("lm_horizontal" /* Horizontal */);
            this._element.style.width = utils_1.numberToPixels(this._size);
        }
        this._element.appendChild(dragHandleElement);
        this._dragListener = new drag_listener_1.DragListener(this._element, [dragHandleElement]);
    }
    get element() { return this._element; }
    destroy() {
        this._element.remove();
    }
    on(eventName, callback) {
        this._dragListener.on(eventName, callback);
    }
}
exports.Splitter = Splitter;
//# sourceMappingURL=splitter.js.map