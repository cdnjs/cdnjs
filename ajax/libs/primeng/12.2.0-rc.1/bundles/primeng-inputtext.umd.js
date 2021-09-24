(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/inputtext', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.inputtext = {}), global.ng.core, global.ng.common, global.ng.forms));
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

    var InputText = /** @class */ (function () {
        function InputText(el, ngModel) {
            this.el = el;
            this.ngModel = ngModel;
        }
        InputText.prototype.ngDoCheck = function () {
            this.updateFilledState();
        };
        InputText.prototype.onInput = function (e) {
            this.updateFilledState();
        };
        InputText.prototype.updateFilledState = function () {
            this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) ||
                (this.ngModel && this.ngModel.model);
        };
        return InputText;
    }());
    InputText.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputText, deps: [{ token: i0__namespace.ElementRef }, { token: i1__namespace.NgModel, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    InputText.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: InputText, selector: "[pInputText]", host: { listeners: { "input": "onInput($event)" }, properties: { "class.p-filled": "filled" }, classAttribute: "p-inputtext p-component p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputText, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pInputText]',
                        host: {
                            'class': 'p-inputtext p-component p-element',
                            '[class.p-filled]': 'filled'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ElementRef }, { type: i1__namespace.NgModel, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { onInput: [{
                    type: i0.HostListener,
                    args: ['input', ['$event']]
                }] } });
    var InputTextModule = /** @class */ (function () {
        function InputTextModule() {
        }
        return InputTextModule;
    }());
    InputTextModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputTextModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    InputTextModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputTextModule, declarations: [InputText], imports: [common.CommonModule], exports: [InputText] });
    InputTextModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputTextModule, imports: [[common.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputTextModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule],
                        exports: [InputText],
                        declarations: [InputText]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.InputText = InputText;
    exports.InputTextModule = InputTextModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-inputtext.umd.js.map
