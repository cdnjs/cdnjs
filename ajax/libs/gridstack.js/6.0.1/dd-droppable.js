"use strict";
/**
 * dd-droppable.ts 6.0.1
 * Copyright (c) 2021-2022 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDDroppable = void 0;
const dd_manager_1 = require("./dd-manager");
const dd_base_impl_1 = require("./dd-base-impl");
const utils_1 = require("./utils");
const dd_touch_1 = require("./dd-touch");
// let count = 0; // TEST
class DDDroppable extends dd_base_impl_1.DDBaseImplement {
    constructor(el, opts = {}) {
        super();
        this.el = el;
        this.option = opts;
        // create var event binding so we can easily remove and still look like TS methods (unlike anonymous functions)
        this._mouseEnter = this._mouseEnter.bind(this);
        this._mouseLeave = this._mouseLeave.bind(this);
        this.enable();
        this._setupAccept();
    }
    on(event, callback) {
        super.on(event, callback);
    }
    off(event) {
        super.off(event);
    }
    enable() {
        if (this.disabled === false)
            return;
        super.enable();
        this.el.classList.add('ui-droppable');
        this.el.classList.remove('ui-droppable-disabled');
        this.el.addEventListener('mouseenter', this._mouseEnter);
        this.el.addEventListener('mouseleave', this._mouseLeave);
        if (dd_touch_1.isTouch) {
            this.el.addEventListener('pointerenter', dd_touch_1.pointerenter);
            this.el.addEventListener('pointerleave', dd_touch_1.pointerleave);
        }
    }
    disable(forDestroy = false) {
        if (this.disabled === true)
            return;
        super.disable();
        this.el.classList.remove('ui-droppable');
        if (!forDestroy)
            this.el.classList.add('ui-droppable-disabled');
        this.el.removeEventListener('mouseenter', this._mouseEnter);
        this.el.removeEventListener('mouseleave', this._mouseLeave);
        if (dd_touch_1.isTouch) {
            this.el.removeEventListener('pointerenter', dd_touch_1.pointerenter);
            this.el.removeEventListener('pointerleave', dd_touch_1.pointerleave);
        }
    }
    destroy() {
        this.disable(true);
        this.el.classList.remove('ui-droppable');
        this.el.classList.remove('ui-droppable-disabled');
        super.destroy();
    }
    updateOption(opts) {
        Object.keys(opts).forEach(key => this.option[key] = opts[key]);
        this._setupAccept();
        return this;
    }
    /** @internal called when the cursor enters our area - prepare for a possible drop and track leaving */
    _mouseEnter(e) {
        // console.log(`${count++} Enter ${this.el.id || (this.el as GridHTMLElement).gridstack.opts.id}`); // TEST
        if (!dd_manager_1.DDManager.dragElement)
            return;
        if (!this._canDrop())
            return;
        e.preventDefault();
        e.stopPropagation();
        // make sure when we enter this, that the last one gets a leave FIRST to correctly cleanup as we don't always do
        if (dd_manager_1.DDManager.dropElement && dd_manager_1.DDManager.dropElement !== this) {
            dd_manager_1.DDManager.dropElement._mouseLeave(e);
        }
        dd_manager_1.DDManager.dropElement = this;
        const ev = utils_1.Utils.initEvent(e, { target: this.el, type: 'dropover' });
        if (this.option.over) {
            this.option.over(ev, this._ui(dd_manager_1.DDManager.dragElement));
        }
        this.triggerEvent('dropover', ev);
        this.el.classList.add('ui-droppable-over');
        // console.log('tracking'); // TEST
    }
    /** @internal called when the item is leaving our area, stop tracking if we had moving item */
    _mouseLeave(e) {
        var _a;
        // console.log(`${count++} Leave ${this.el.id || (this.el as GridHTMLElement).gridstack.opts.id}`); // TEST
        if (!dd_manager_1.DDManager.dragElement || dd_manager_1.DDManager.dropElement !== this)
            return;
        e.preventDefault();
        e.stopPropagation();
        const ev = utils_1.Utils.initEvent(e, { target: this.el, type: 'dropout' });
        if (this.option.out) {
            this.option.out(ev, this._ui(dd_manager_1.DDManager.dragElement));
        }
        this.triggerEvent('dropout', ev);
        if (dd_manager_1.DDManager.dropElement === this) {
            delete dd_manager_1.DDManager.dropElement;
            // console.log('not tracking'); // TEST
            // if we're still over a parent droppable, send it an enter as we don't get one from leaving nested children
            let parentDrop;
            let parent = this.el.parentElement;
            while (!parentDrop && parent) {
                parentDrop = (_a = parent.ddElement) === null || _a === void 0 ? void 0 : _a.ddDroppable;
                parent = parent.parentElement;
            }
            if (parentDrop) {
                parentDrop._mouseEnter(e);
            }
        }
    }
    /** item is being dropped on us - called by the drag mouseup handler - this calls the client drop event */
    drop(e) {
        e.preventDefault();
        const ev = utils_1.Utils.initEvent(e, { target: this.el, type: 'drop' });
        if (this.option.drop) {
            this.option.drop(ev, this._ui(dd_manager_1.DDManager.dragElement));
        }
        this.triggerEvent('drop', ev);
    }
    /** @internal true if element matches the string/method accept option */
    _canDrop() {
        return dd_manager_1.DDManager.dragElement && (!this.accept || this.accept(dd_manager_1.DDManager.dragElement.el));
    }
    /** @internal */
    _setupAccept() {
        if (!this.option.accept)
            return this;
        if (typeof this.option.accept === 'string') {
            this.accept = (el) => el.matches(this.option.accept);
        }
        else {
            this.accept = this.option.accept;
        }
        return this;
    }
    /** @internal */
    _ui(drag) {
        return Object.assign({ draggable: drag.el }, drag.ui());
    }
}
exports.DDDroppable = DDDroppable;
//# sourceMappingURL=dd-droppable.js.map