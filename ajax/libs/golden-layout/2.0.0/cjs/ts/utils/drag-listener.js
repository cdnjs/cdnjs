"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragListener = void 0;
const event_emitter_1 = require("./event-emitter");
/** @internal */
class DragListener extends event_emitter_1.EventEmitter {
    constructor(_eElement, extraAllowableChildTargets) {
        super();
        this._eElement = _eElement;
        this._mouseTouchTracking = false;
        this._mouseDownEventListener = (ev) => this.onMouseDown(ev);
        this._mouseMoveEventListener = (ev) => this.onMouseMove(ev);
        this._mouseUpEventListener = (ev) => this.onMouseUp(ev);
        this._touchStartEventListener = (ev) => this.onTouchStart(ev);
        this._touchMoveEventListener = (ev) => this.onTouchMove(ev);
        this._touchEndEventListener = (ev) => this.onTouchEnd(ev);
        this._timeout = undefined;
        this._allowableTargets = [_eElement, ...extraAllowableChildTargets];
        this._oDocument = document;
        this._eBody = document.body;
        /**
         * The delay after which to start the drag in milliseconds
         * Do NOT make too short (previous value of 200 was not long enough for my touchpad)
         * Should generally rely on the mouse move to start drag.  Not this delay.
         */
        this._nDelay = 1800;
        /**
         * The distance the mouse needs to be moved to qualify as a drag
         * Previous comment: works better with delay only
         * ???
         * Probably somehow needs tuning for different devices
         */
        this._nDistance = 10;
        this._nX = 0;
        this._nY = 0;
        this._nOriginalX = 0;
        this._nOriginalY = 0;
        this._dragging = false;
        this._eElement.addEventListener('mousedown', this._mouseDownEventListener, { passive: true });
        this._eElement.addEventListener('touchstart', this._touchStartEventListener, { passive: true });
    }
    destroy() {
        this.checkRemoveMouseTouchTrackingEventListeners();
        this._eElement.removeEventListener('mousedown', this._mouseDownEventListener);
        this._eElement.removeEventListener('touchstart', this._touchStartEventListener);
    }
    cancelDrag() {
        const dragEvent = {
            mouseEvent: undefined,
            touchEvent: undefined,
            pageX: -1,
            pageY: -1,
        };
        this.processDragStop(dragEvent);
    }
    onMouseDown(oEvent) {
        if (this._allowableTargets.includes(oEvent.target) && oEvent.button === 0) {
            const coordinates = this.getMouseCoordinates(oEvent);
            this.processMouseDownTouchStart(coordinates);
        }
    }
    onTouchStart(oEvent) {
        // oEvent.preventDefault();
        if (this._allowableTargets.includes(oEvent.target)) {
            const coordinates = this.getTouchCoordinates(oEvent);
            if (coordinates !== undefined) {
                this.processMouseDownTouchStart(coordinates);
            }
        }
    }
    processMouseDownTouchStart(coordinates) {
        this._nOriginalX = coordinates.x;
        this._nOriginalY = coordinates.y;
        this._oDocument.addEventListener('mousemove', this._mouseMoveEventListener);
        this._oDocument.addEventListener('touchmove', this._touchMoveEventListener, { passive: true });
        this._oDocument.addEventListener('mouseup', this._mouseUpEventListener, { passive: true });
        this._oDocument.addEventListener('touchend', this._touchEndEventListener, { passive: true });
        this._mouseTouchTracking = true;
        this._timeout = setTimeout(() => this.startDrag(), this._nDelay);
    }
    onMouseMove(oEvent) {
        if (this._mouseTouchTracking) {
            oEvent.preventDefault();
            const coordinates = this.getMouseCoordinates(oEvent);
            const dragEvent = {
                mouseEvent: oEvent,
                touchEvent: undefined,
                pageX: coordinates.x,
                pageY: coordinates.y,
            };
            this.processDragMove(dragEvent);
        }
    }
    onTouchMove(oEvent) {
        if (this._mouseTouchTracking) {
            // oEvent.preventDefault();
            const coordinates = this.getTouchCoordinates(oEvent);
            if (coordinates !== undefined) {
                const dragEvent = {
                    mouseEvent: undefined,
                    touchEvent: oEvent,
                    pageX: coordinates.x,
                    pageY: coordinates.y,
                };
                this.processDragMove(dragEvent);
            }
        }
    }
    processDragMove(dragEvent) {
        this._nX = dragEvent.pageX - this._nOriginalX;
        this._nY = dragEvent.pageY - this._nOriginalY;
        if (this._dragging === false) {
            if (Math.abs(this._nX) > this._nDistance ||
                Math.abs(this._nY) > this._nDistance) {
                this.startDrag();
            }
        }
        if (this._dragging) {
            this.emit('drag', this._nX, this._nY, dragEvent);
        }
    }
    onMouseUp(oEvent) {
        const coordinates = this.getMouseCoordinates(oEvent);
        const dragEvent = {
            mouseEvent: oEvent,
            touchEvent: undefined,
            pageX: coordinates.x,
            pageY: coordinates.y,
        };
        this.processDragStop(dragEvent);
    }
    onTouchEnd(oEvent) {
        let coordinates = this.getTouchCoordinates(oEvent);
        if (coordinates === undefined) {
            // not sure what else to do here
            coordinates = {
                x: this._nOriginalX,
                y: this._nOriginalY,
            };
        }
        const dragEvent = {
            mouseEvent: undefined,
            touchEvent: oEvent,
            pageX: coordinates.x,
            pageY: coordinates.y,
        };
        this.processDragStop(dragEvent);
    }
    processDragStop(dragEvent) {
        var _a;
        if (this._timeout !== undefined) {
            clearTimeout(this._timeout);
            this._timeout = undefined;
        }
        this.checkRemoveMouseTouchTrackingEventListeners();
        if (this._dragging === true) {
            this._eBody.classList.remove("lm_dragging" /* Dragging */);
            this._eElement.classList.remove("lm_dragging" /* Dragging */);
            (_a = this._oDocument.querySelector('iframe')) === null || _a === void 0 ? void 0 : _a.style.setProperty('pointer-events', '');
            this._dragging = false;
            this.emit('dragStop', dragEvent);
        }
    }
    checkRemoveMouseTouchTrackingEventListeners() {
        if (this._mouseTouchTracking) {
            this._oDocument.removeEventListener('mousemove', this._mouseMoveEventListener);
            this._oDocument.removeEventListener('touchmove', this._touchMoveEventListener);
            this._oDocument.removeEventListener('mouseup', this._mouseUpEventListener);
            this._oDocument.removeEventListener('touchend', this._touchEndEventListener);
            this._mouseTouchTracking = false;
        }
    }
    startDrag() {
        var _a;
        if (this._timeout !== undefined) {
            clearTimeout(this._timeout);
            this._timeout = undefined;
        }
        this._dragging = true;
        this._eBody.classList.add("lm_dragging" /* Dragging */);
        this._eElement.classList.add("lm_dragging" /* Dragging */);
        (_a = this._oDocument.querySelector('iframe')) === null || _a === void 0 ? void 0 : _a.style.setProperty('pointer-events', 'none');
        this.emit('dragStart', this._nOriginalX, this._nOriginalY);
    }
    getMouseCoordinates(event) {
        const result = {
            x: event.pageX,
            y: event.pageY
        };
        return result;
    }
    getTouchCoordinates(event) {
        const targetTouches = event.targetTouches;
        if (targetTouches.length === 0) {
            return undefined;
        }
        else {
            const targetTouch = event.targetTouches[0];
            const result = {
                x: targetTouch.pageX,
                y: targetTouch.pageY
            };
            return result;
        }
    }
}
exports.DragListener = DragListener;
//# sourceMappingURL=drag-listener.js.map