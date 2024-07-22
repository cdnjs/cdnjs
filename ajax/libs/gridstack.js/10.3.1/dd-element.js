/**
 * dd-elements.ts 10.3.1
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
import { DDResizable } from './dd-resizable';
import { DDDraggable } from './dd-draggable';
import { DDDroppable } from './dd-droppable';
export class DDElement {
    static init(el) {
        if (!el.ddElement) {
            el.ddElement = new DDElement(el);
        }
        return el.ddElement;
    }
    constructor(el) {
        this.el = el;
    }
    on(eventName, callback) {
        if (this.ddDraggable && ['drag', 'dragstart', 'dragstop'].indexOf(eventName) > -1) {
            this.ddDraggable.on(eventName, callback);
        }
        else if (this.ddDroppable && ['drop', 'dropover', 'dropout'].indexOf(eventName) > -1) {
            this.ddDroppable.on(eventName, callback);
        }
        else if (this.ddResizable && ['resizestart', 'resize', 'resizestop'].indexOf(eventName) > -1) {
            this.ddResizable.on(eventName, callback);
        }
        return this;
    }
    off(eventName) {
        if (this.ddDraggable && ['drag', 'dragstart', 'dragstop'].indexOf(eventName) > -1) {
            this.ddDraggable.off(eventName);
        }
        else if (this.ddDroppable && ['drop', 'dropover', 'dropout'].indexOf(eventName) > -1) {
            this.ddDroppable.off(eventName);
        }
        else if (this.ddResizable && ['resizestart', 'resize', 'resizestop'].indexOf(eventName) > -1) {
            this.ddResizable.off(eventName);
        }
        return this;
    }
    setupDraggable(opts) {
        if (!this.ddDraggable) {
            this.ddDraggable = new DDDraggable(this.el, opts);
        }
        else {
            this.ddDraggable.updateOption(opts);
        }
        return this;
    }
    cleanDraggable() {
        if (this.ddDraggable) {
            this.ddDraggable.destroy();
            delete this.ddDraggable;
        }
        return this;
    }
    setupResizable(opts) {
        if (!this.ddResizable) {
            this.ddResizable = new DDResizable(this.el, opts);
        }
        else {
            this.ddResizable.updateOption(opts);
        }
        return this;
    }
    cleanResizable() {
        if (this.ddResizable) {
            this.ddResizable.destroy();
            delete this.ddResizable;
        }
        return this;
    }
    setupDroppable(opts) {
        if (!this.ddDroppable) {
            this.ddDroppable = new DDDroppable(this.el, opts);
        }
        else {
            this.ddDroppable.updateOption(opts);
        }
        return this;
    }
    cleanDroppable() {
        if (this.ddDroppable) {
            this.ddDroppable.destroy();
            delete this.ddDroppable;
        }
        return this;
    }
}
//# sourceMappingURL=dd-element.js.map