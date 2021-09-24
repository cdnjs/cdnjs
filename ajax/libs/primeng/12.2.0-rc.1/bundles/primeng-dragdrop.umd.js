(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/dragdrop', ['exports', '@angular/core', '@angular/common', 'primeng/dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.dragdrop = {}), global.ng.core, global.ng.common, global.primeng.dom));
}(this, (function (exports, i0, common, dom) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    var Draggable = /** @class */ (function () {
        function Draggable(el, zone) {
            this.el = el;
            this.zone = zone;
            this.onDragStart = new i0.EventEmitter();
            this.onDragEnd = new i0.EventEmitter();
            this.onDrag = new i0.EventEmitter();
        }
        Object.defineProperty(Draggable.prototype, "pDraggableDisabled", {
            get: function () {
                return this._pDraggableDisabled;
            },
            set: function (_pDraggableDisabled) {
                this._pDraggableDisabled = _pDraggableDisabled;
                if (this._pDraggableDisabled) {
                    this.unbindMouseListeners();
                }
                else {
                    this.el.nativeElement.draggable = true;
                    this.bindMouseListeners();
                }
            },
            enumerable: false,
            configurable: true
        });
        Draggable.prototype.ngAfterViewInit = function () {
            if (!this.pDraggableDisabled) {
                this.el.nativeElement.draggable = true;
                this.bindMouseListeners();
            }
        };
        Draggable.prototype.bindDragListener = function () {
            var _this = this;
            if (!this.dragListener) {
                this.zone.runOutsideAngular(function () {
                    _this.dragListener = _this.drag.bind(_this);
                    _this.el.nativeElement.addEventListener('drag', _this.dragListener);
                });
            }
        };
        Draggable.prototype.unbindDragListener = function () {
            var _this = this;
            if (this.dragListener) {
                this.zone.runOutsideAngular(function () {
                    _this.el.nativeElement.removeEventListener('drag', _this.dragListener);
                    _this.dragListener = null;
                });
            }
        };
        Draggable.prototype.bindMouseListeners = function () {
            var _this = this;
            if (!this.mouseDownListener && !this.mouseUpListener) {
                this.zone.runOutsideAngular(function () {
                    _this.mouseDownListener = _this.mousedown.bind(_this);
                    _this.mouseUpListener = _this.mouseup.bind(_this);
                    _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
                    _this.el.nativeElement.addEventListener('mouseup', _this.mouseUpListener);
                });
            }
        };
        Draggable.prototype.unbindMouseListeners = function () {
            var _this = this;
            if (this.mouseDownListener && this.mouseUpListener) {
                this.zone.runOutsideAngular(function () {
                    _this.el.nativeElement.removeEventListener('mousedown', _this.mouseDownListener);
                    _this.el.nativeElement.removeEventListener('mouseup', _this.mouseUpListener);
                    _this.mouseDownListener = null;
                    _this.mouseUpListener = null;
                });
            }
        };
        Draggable.prototype.drag = function (event) {
            this.onDrag.emit(event);
        };
        Draggable.prototype.dragStart = function (event) {
            if (this.allowDrag() && !this.pDraggableDisabled) {
                if (this.dragEffect) {
                    event.dataTransfer.effectAllowed = this.dragEffect;
                }
                event.dataTransfer.setData('text', this.scope);
                this.onDragStart.emit(event);
                this.bindDragListener();
            }
            else {
                event.preventDefault();
            }
        };
        Draggable.prototype.dragEnd = function (event) {
            this.onDragEnd.emit(event);
            this.unbindDragListener();
        };
        Draggable.prototype.mousedown = function (event) {
            this.handle = event.target;
        };
        Draggable.prototype.mouseup = function (event) {
            this.handle = null;
        };
        Draggable.prototype.allowDrag = function () {
            if (this.dragHandle && this.handle)
                return dom.DomHandler.matches(this.handle, this.dragHandle);
            else
                return true;
        };
        Draggable.prototype.ngOnDestroy = function () {
            this.unbindDragListener();
            this.unbindMouseListeners();
        };
        return Draggable;
    }());
    Draggable.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Draggable, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    Draggable.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: Draggable, selector: "[pDraggable]", inputs: { scope: ["pDraggable", "scope"], dragEffect: "dragEffect", dragHandle: "dragHandle", pDraggableDisabled: "pDraggableDisabled" }, outputs: { onDragStart: "onDragStart", onDragEnd: "onDragEnd", onDrag: "onDrag" }, host: { listeners: { "dragstart": "dragStart($event)", "dragend": "dragEnd($event)" }, classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Draggable, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pDraggable]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }]; }, propDecorators: { scope: [{
                    type: i0.Input,
                    args: ['pDraggable']
                }], dragEffect: [{
                    type: i0.Input
                }], dragHandle: [{
                    type: i0.Input
                }], onDragStart: [{
                    type: i0.Output
                }], onDragEnd: [{
                    type: i0.Output
                }], onDrag: [{
                    type: i0.Output
                }], pDraggableDisabled: [{
                    type: i0.Input
                }], dragStart: [{
                    type: i0.HostListener,
                    args: ['dragstart', ['$event']]
                }], dragEnd: [{
                    type: i0.HostListener,
                    args: ['dragend', ['$event']]
                }] } });
    var Droppable = /** @class */ (function () {
        function Droppable(el, zone) {
            this.el = el;
            this.zone = zone;
            this.onDragEnter = new i0.EventEmitter();
            this.onDragLeave = new i0.EventEmitter();
            this.onDrop = new i0.EventEmitter();
        }
        Droppable.prototype.ngAfterViewInit = function () {
            if (!this.pDroppableDisabled) {
                this.bindDragOverListener();
            }
        };
        Droppable.prototype.bindDragOverListener = function () {
            var _this = this;
            if (!this.dragOverListener) {
                this.zone.runOutsideAngular(function () {
                    _this.dragOverListener = _this.dragOver.bind(_this);
                    _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
                });
            }
        };
        Droppable.prototype.unbindDragOverListener = function () {
            var _this = this;
            if (this.dragOverListener) {
                this.zone.runOutsideAngular(function () {
                    _this.el.nativeElement.removeEventListener('dragover', _this.dragOverListener);
                    _this.dragOverListener = null;
                });
            }
        };
        Droppable.prototype.dragOver = function (event) {
            event.preventDefault();
        };
        Droppable.prototype.drop = function (event) {
            if (this.allowDrop(event)) {
                dom.DomHandler.removeClass(this.el.nativeElement, 'p-draggable-enter');
                event.preventDefault();
                this.onDrop.emit(event);
            }
        };
        Droppable.prototype.dragEnter = function (event) {
            event.preventDefault();
            if (this.dropEffect) {
                event.dataTransfer.dropEffect = this.dropEffect;
            }
            dom.DomHandler.addClass(this.el.nativeElement, 'p-draggable-enter');
            this.onDragEnter.emit(event);
        };
        Droppable.prototype.dragLeave = function (event) {
            event.preventDefault();
            dom.DomHandler.removeClass(this.el.nativeElement, 'p-draggable-enter');
            this.onDragLeave.emit(event);
        };
        Droppable.prototype.allowDrop = function (event) {
            var dragScope = event.dataTransfer.getData('text');
            if (typeof (this.scope) == "string" && dragScope == this.scope) {
                return true;
            }
            else if (this.scope instanceof Array) {
                for (var j = 0; j < this.scope.length; j++) {
                    if (dragScope == this.scope[j]) {
                        return true;
                    }
                }
            }
            return false;
        };
        Droppable.prototype.ngOnDestroy = function () {
            this.unbindDragOverListener();
        };
        return Droppable;
    }());
    Droppable.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Droppable, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    Droppable.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: Droppable, selector: "[pDroppable]", inputs: { scope: ["pDroppable", "scope"], pDroppableDisabled: "pDroppableDisabled", dropEffect: "dropEffect" }, outputs: { onDragEnter: "onDragEnter", onDragLeave: "onDragLeave", onDrop: "onDrop" }, host: { listeners: { "drop": "drop($event)", "dragenter": "dragEnter($event)", "dragleave": "dragLeave($event)" }, classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Droppable, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pDroppable]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }]; }, propDecorators: { scope: [{
                    type: i0.Input,
                    args: ['pDroppable']
                }], pDroppableDisabled: [{
                    type: i0.Input
                }], dropEffect: [{
                    type: i0.Input
                }], onDragEnter: [{
                    type: i0.Output
                }], onDragLeave: [{
                    type: i0.Output
                }], onDrop: [{
                    type: i0.Output
                }], drop: [{
                    type: i0.HostListener,
                    args: ['drop', ['$event']]
                }], dragEnter: [{
                    type: i0.HostListener,
                    args: ['dragenter', ['$event']]
                }], dragLeave: [{
                    type: i0.HostListener,
                    args: ['dragleave', ['$event']]
                }] } });
    var DragDropModule = /** @class */ (function () {
        function DragDropModule() {
        }
        return DragDropModule;
    }());
    DragDropModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DragDropModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DragDropModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DragDropModule, declarations: [Draggable, Droppable], imports: [common.CommonModule], exports: [Draggable, Droppable] });
    DragDropModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DragDropModule, imports: [[common.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DragDropModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule],
                        exports: [Draggable, Droppable],
                        declarations: [Draggable, Droppable]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DragDropModule = DragDropModule;
    exports.Draggable = Draggable;
    exports.Droppable = Droppable;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-dragdrop.umd.js.map
