/**
 * dd-resizable-handle.ts 10.3.1
 * Copyright (c) 2021-2022 Alain Dumesny - see GridStack root license
 */
import { isTouch, pointerdown, touchend, touchmove, touchstart } from './dd-touch';
class DDResizableHandle {
    constructor(host, dir, option) {
        this.host = host;
        this.dir = dir;
        this.option = option;
        /** @internal true after we've moved enough pixels to start a resize */
        this.moving = false;
        // create var event binding so we can easily remove and still look like TS methods (unlike anonymous functions)
        this._mouseDown = this._mouseDown.bind(this);
        this._mouseMove = this._mouseMove.bind(this);
        this._mouseUp = this._mouseUp.bind(this);
        this._keyEvent = this._keyEvent.bind(this);
        this._init();
    }
    /** @internal */
    _init() {
        const el = this.el = document.createElement('div');
        el.classList.add('ui-resizable-handle');
        el.classList.add(`${DDResizableHandle.prefix}${this.dir}`);
        el.style.zIndex = '100';
        el.style.userSelect = 'none';
        this.host.appendChild(this.el);
        this.el.addEventListener('mousedown', this._mouseDown);
        if (isTouch) {
            this.el.addEventListener('touchstart', touchstart);
            this.el.addEventListener('pointerdown', pointerdown);
            // this.el.style.touchAction = 'none'; // not needed unlike pointerdown doc comment
        }
        return this;
    }
    /** call this when resize handle needs to be removed and cleaned up */
    destroy() {
        if (this.moving)
            this._mouseUp(this.mouseDownEvent);
        this.el.removeEventListener('mousedown', this._mouseDown);
        if (isTouch) {
            this.el.removeEventListener('touchstart', touchstart);
            this.el.removeEventListener('pointerdown', pointerdown);
        }
        this.host.removeChild(this.el);
        delete this.el;
        delete this.host;
        return this;
    }
    /** @internal called on mouse down on us: capture move on the entire document (mouse might not stay on us) until we release the mouse */
    _mouseDown(e) {
        this.mouseDownEvent = e;
        document.addEventListener('mousemove', this._mouseMove, { capture: true, passive: true }); // capture, not bubble
        document.addEventListener('mouseup', this._mouseUp, true);
        if (isTouch) {
            this.el.addEventListener('touchmove', touchmove);
            this.el.addEventListener('touchend', touchend);
        }
        e.stopPropagation();
        e.preventDefault();
    }
    /** @internal */
    _mouseMove(e) {
        let s = this.mouseDownEvent;
        if (this.moving) {
            this._triggerEvent('move', e);
        }
        else if (Math.abs(e.x - s.x) + Math.abs(e.y - s.y) > 2) {
            // don't start unless we've moved at least 3 pixels
            this.moving = true;
            this._triggerEvent('start', this.mouseDownEvent);
            this._triggerEvent('move', e);
            // now track keyboard events to cancel
            document.addEventListener('keydown', this._keyEvent);
        }
        e.stopPropagation();
        // e.preventDefault(); passive = true
    }
    /** @internal */
    _mouseUp(e) {
        if (this.moving) {
            this._triggerEvent('stop', e);
            document.removeEventListener('keydown', this._keyEvent);
        }
        document.removeEventListener('mousemove', this._mouseMove, true);
        document.removeEventListener('mouseup', this._mouseUp, true);
        if (isTouch) {
            this.el.removeEventListener('touchmove', touchmove);
            this.el.removeEventListener('touchend', touchend);
        }
        delete this.moving;
        delete this.mouseDownEvent;
        e.stopPropagation();
        e.preventDefault();
    }
    /** @internal call when keys are being pressed - use Esc to cancel */
    _keyEvent(e) {
        if (e.key === 'Escape') {
            this.host.gridstackNode?.grid?.engine.restoreInitial();
            this._mouseUp(this.mouseDownEvent);
        }
    }
    /** @internal */
    _triggerEvent(name, event) {
        if (this.option[name])
            this.option[name](event);
        return this;
    }
}
/** @internal */
DDResizableHandle.prefix = 'ui-resizable-';
export { DDResizableHandle };
//# sourceMappingURL=dd-resizable-handle.js.map