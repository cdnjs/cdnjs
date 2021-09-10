(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/focustrap', ['exports', '@angular/core', '@angular/common', 'primeng/dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.focustrap = {}), global.ng.core, global.ng.common, global.primeng.dom));
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

    var FocusTrap = /** @class */ (function () {
        function FocusTrap(el) {
            this.el = el;
        }
        FocusTrap.prototype.onkeydown = function (e) {
            if (this.pFocusTrapDisabled !== true) {
                e.preventDefault();
                var focusableElements = dom.DomHandler.getFocusableElements(this.el.nativeElement);
                if (focusableElements && focusableElements.length > 0) {
                    if (!focusableElements[0].ownerDocument.activeElement) {
                        focusableElements[0].focus();
                    }
                    else {
                        var focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);
                        if (e.shiftKey) {
                            if (focusedIndex == -1 || focusedIndex === 0)
                                focusableElements[focusableElements.length - 1].focus();
                            else
                                focusableElements[focusedIndex - 1].focus();
                        }
                        else {
                            if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                                focusableElements[0].focus();
                            else
                                focusableElements[focusedIndex + 1].focus();
                        }
                    }
                }
            }
        };
        return FocusTrap;
    }());
    FocusTrap.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FocusTrap, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    FocusTrap.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: FocusTrap, selector: "[pFocusTrap]", inputs: { pFocusTrapDisabled: "pFocusTrapDisabled" }, host: { listeners: { "keydown.tab": "onkeydown($event)", "keydown.shift.tab": "onkeydown($event)" }, classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FocusTrap, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pFocusTrap]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { pFocusTrapDisabled: [{
                    type: i0.Input
                }], onkeydown: [{
                    type: i0.HostListener,
                    args: ['keydown.tab', ['$event']]
                }, {
                    type: i0.HostListener,
                    args: ['keydown.shift.tab', ['$event']]
                }] } });
    var FocusTrapModule = /** @class */ (function () {
        function FocusTrapModule() {
        }
        return FocusTrapModule;
    }());
    FocusTrapModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FocusTrapModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    FocusTrapModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FocusTrapModule, declarations: [FocusTrap], imports: [common.CommonModule], exports: [FocusTrap] });
    FocusTrapModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FocusTrapModule, imports: [[common.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FocusTrapModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule],
                        exports: [FocusTrap],
                        declarations: [FocusTrap]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.FocusTrap = FocusTrap;
    exports.FocusTrapModule = FocusTrapModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-focustrap.umd.js.map
