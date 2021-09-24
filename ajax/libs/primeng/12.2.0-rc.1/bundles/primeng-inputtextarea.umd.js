(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/inputtextarea', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.inputtextarea = {}), global.ng.core, global.ng.common, global.ng.forms));
}(this, (function (exports, i0, common, i1) { 'use strict';

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
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var InputTextarea = /** @class */ (function () {
        function InputTextarea(el, ngModel, control, cd) {
            this.el = el;
            this.ngModel = ngModel;
            this.control = control;
            this.cd = cd;
            this.onResize = new i0.EventEmitter();
        }
        InputTextarea.prototype.ngOnInit = function () {
            var _this = this;
            if (this.ngModel) {
                this.ngModelSubscription = this.ngModel.valueChanges.subscribe(function () {
                    _this.updateState();
                });
            }
            if (this.control) {
                this.ngControlSubscription = this.control.valueChanges.subscribe(function () {
                    _this.updateState();
                });
            }
        };
        InputTextarea.prototype.ngAfterViewInit = function () {
            if (this.autoResize)
                this.resize();
            this.updateFilledState();
            this.cd.detectChanges();
        };
        InputTextarea.prototype.onInput = function (e) {
            this.updateState();
        };
        InputTextarea.prototype.updateFilledState = function () {
            this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
        };
        InputTextarea.prototype.onFocus = function (e) {
            if (this.autoResize) {
                this.resize(e);
            }
        };
        InputTextarea.prototype.onBlur = function (e) {
            if (this.autoResize) {
                this.resize(e);
            }
        };
        InputTextarea.prototype.resize = function (event) {
            this.el.nativeElement.style.height = 'auto';
            this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';
            if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
                this.el.nativeElement.style.overflowY = "scroll";
                this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
            }
            else {
                this.el.nativeElement.style.overflow = "hidden";
            }
            this.onResize.emit(event || {});
        };
        InputTextarea.prototype.updateState = function () {
            this.updateFilledState();
            if (this.autoResize) {
                this.resize();
            }
        };
        InputTextarea.prototype.ngOnDestroy = function () {
            if (this.ngModelSubscription) {
                this.ngModelSubscription.unsubscribe();
            }
            if (this.ngControlSubscription) {
                this.ngControlSubscription.unsubscribe();
            }
        };
        return InputTextarea;
    }());
    InputTextarea.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputTextarea, deps: [{ token: i0__namespace.ElementRef }, { token: i1__namespace.NgModel, optional: true }, { token: i1__namespace.NgControl, optional: true }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    InputTextarea.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: InputTextarea, selector: "[pInputTextarea]", inputs: { autoResize: "autoResize" }, outputs: { onResize: "onResize" }, host: { listeners: { "input": "onInput($event)", "focus": "onFocus($event)", "blur": "onBlur($event)" }, properties: { "class.p-filled": "filled", "class.p-inputtextarea-resizable": "autoResize" }, classAttribute: "p-inputtextarea p-inputtext p-component p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputTextarea, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pInputTextarea]',
                        host: {
                            'class': 'p-inputtextarea p-inputtext p-component p-element',
                            '[class.p-filled]': 'filled',
                            '[class.p-inputtextarea-resizable]': 'autoResize'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ElementRef }, { type: i1__namespace.NgModel, decorators: [{
                            type: i0.Optional
                        }] }, { type: i1__namespace.NgControl, decorators: [{
                            type: i0.Optional
                        }] }, { type: i0__namespace.ChangeDetectorRef }];
        }, propDecorators: { autoResize: [{
                    type: i0.Input
                }], onResize: [{
                    type: i0.Output
                }], onInput: [{
                    type: i0.HostListener,
                    args: ['input', ['$event']]
                }], onFocus: [{
                    type: i0.HostListener,
                    args: ['focus', ['$event']]
                }], onBlur: [{
                    type: i0.HostListener,
                    args: ['blur', ['$event']]
                }] } });
    var InputTextareaModule = /** @class */ (function () {
        function InputTextareaModule() {
        }
        return InputTextareaModule;
    }());
    InputTextareaModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputTextareaModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    InputTextareaModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputTextareaModule, declarations: [InputTextarea], imports: [common.CommonModule], exports: [InputTextarea] });
    InputTextareaModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputTextareaModule, imports: [[common.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputTextareaModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule],
                        exports: [InputTextarea],
                        declarations: [InputTextarea]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.InputTextarea = InputTextarea;
    exports.InputTextareaModule = InputTextareaModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-inputtextarea.umd.js.map
