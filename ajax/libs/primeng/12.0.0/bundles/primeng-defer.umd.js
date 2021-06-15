(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/defer', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.defer = {}), global.ng.core, global.ng.common));
}(this, (function (exports, i0, common) { 'use strict';

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

    var DeferredLoader = /** @class */ (function () {
        function DeferredLoader(el, renderer, viewContainer, cd) {
            this.el = el;
            this.renderer = renderer;
            this.viewContainer = viewContainer;
            this.cd = cd;
            this.onLoad = new i0.EventEmitter();
        }
        DeferredLoader.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.shouldLoad()) {
                this.load();
            }
            if (!this.isLoaded()) {
                this.documentScrollListener = this.renderer.listen('window', 'scroll', function () {
                    if (_this.shouldLoad()) {
                        _this.load();
                        _this.documentScrollListener();
                        _this.documentScrollListener = null;
                    }
                });
            }
        };
        DeferredLoader.prototype.shouldLoad = function () {
            if (this.isLoaded()) {
                return false;
            }
            else {
                var rect = this.el.nativeElement.getBoundingClientRect();
                var docElement = document.documentElement;
                var winHeight = docElement.clientHeight;
                return (winHeight >= rect.top);
            }
        };
        DeferredLoader.prototype.load = function () {
            this.view = this.viewContainer.createEmbeddedView(this.template);
            this.onLoad.emit();
            this.cd.detectChanges();
        };
        DeferredLoader.prototype.isLoaded = function () {
            return this.view != null;
        };
        DeferredLoader.prototype.ngOnDestroy = function () {
            this.view = null;
            if (this.documentScrollListener) {
                this.documentScrollListener();
            }
        };
        return DeferredLoader;
    }());
    DeferredLoader.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: DeferredLoader, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ViewContainerRef }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    DeferredLoader.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.4", type: DeferredLoader, selector: "[pDefer]", outputs: { onLoad: "onLoad" }, queries: [{ propertyName: "template", first: true, predicate: i0.TemplateRef, descendants: true }], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: DeferredLoader, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pDefer]'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ViewContainerRef }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { onLoad: [{
                    type: i0.Output
                }], template: [{
                    type: i0.ContentChild,
                    args: [i0.TemplateRef]
                }] } });
    var DeferModule = /** @class */ (function () {
        function DeferModule() {
        }
        return DeferModule;
    }());
    DeferModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: DeferModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DeferModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: DeferModule, declarations: [DeferredLoader], imports: [common.CommonModule], exports: [DeferredLoader] });
    DeferModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: DeferModule, imports: [[common.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: DeferModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule],
                        exports: [DeferredLoader],
                        declarations: [DeferredLoader]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DeferModule = DeferModule;
    exports.DeferredLoader = DeferredLoader;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-defer.umd.js.map
