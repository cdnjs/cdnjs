(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('@angular/cdk/scrolling')) :
    typeof define === 'function' && define.amd ? define('primeng/virtualscroller', ['exports', '@angular/core', '@angular/common', 'primeng/api', '@angular/cdk/scrolling'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.virtualscroller = {}), global.ng.core, global.ng.common, global.primeng.api, global.ng.cdk.scrolling));
}(this, (function (exports, i0, i2, api, i1) { 'use strict';

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
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var VirtualScroller = /** @class */ (function () {
        function VirtualScroller(el) {
            this.el = el;
            this.delay = 250;
            this.trackBy = function (index, item) { return item; };
            this.onLazyLoad = new i0.EventEmitter();
            this._totalRecords = 0;
            this.page = 0;
            this._first = 0;
        }
        Object.defineProperty(VirtualScroller.prototype, "totalRecords", {
            get: function () {
                return this._totalRecords;
            },
            set: function (val) {
                this._totalRecords = val;
                console.log("totalRecords is deprecated, provide a value with the length of virtual items instead.");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VirtualScroller.prototype, "first", {
            get: function () {
                return this._first;
            },
            set: function (val) {
                this._first = val;
                console.log("first property is deprecated, use scrollToIndex function to scroll a specific item.");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VirtualScroller.prototype, "cache", {
            get: function () {
                return this._cache;
            },
            set: function (val) {
                this._cache = val;
                console.log("cache is deprecated as it is always on.");
            },
            enumerable: false,
            configurable: true
        });
        VirtualScroller.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    case 'loadingItem':
                        _this.loadingItemTemplate = item.template;
                        break;
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                    default:
                        _this.itemTemplate = item.template;
                        break;
                }
            });
        };
        VirtualScroller.prototype.onScrollIndexChange = function (index) {
            var _this = this;
            if (this.lazy) {
                if (this.virtualScrollTimeout) {
                    clearTimeout(this.virtualScrollTimeout);
                }
                this.virtualScrollTimeout = setTimeout(function () {
                    var page = Math.floor(index / _this.rows);
                    var virtualScrollOffset = page === 0 ? 0 : (page - 1) * _this.rows;
                    var virtualScrollChunkSize = page === 0 ? _this.rows * 2 : _this.rows * 3;
                    if (page !== _this.virtualPage) {
                        _this.virtualPage = page;
                        _this.onLazyLoad.emit({ first: virtualScrollOffset, rows: virtualScrollChunkSize });
                    }
                }, this.delay);
            }
        };
        VirtualScroller.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        //@deprecated
        VirtualScroller.prototype.scrollTo = function (index, mode) {
            this.scrollToIndex(index, mode);
        };
        VirtualScroller.prototype.scrollToIndex = function (index, mode) {
            if (this.viewport) {
                this.viewport.scrollToIndex(index, mode);
            }
        };
        return VirtualScroller;
    }());
    VirtualScroller.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: VirtualScroller, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    VirtualScroller.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: VirtualScroller, selector: "p-virtualScroller", inputs: { value: "value", itemSize: "itemSize", style: "style", styleClass: "styleClass", scrollHeight: "scrollHeight", lazy: "lazy", rows: "rows", minBufferPx: "minBufferPx", maxBufferPx: "maxBufferPx", delay: "delay", trackBy: "trackBy", totalRecords: "totalRecords", first: "first", cache: "cache" }, outputs: { onLazyLoad: "onLazyLoad" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "header", first: true, predicate: api.Header, descendants: true }, { propertyName: "footer", first: true, predicate: api.Footer, descendants: true }, { propertyName: "templates", predicate: api.PrimeTemplate }], viewQueries: [{ propertyName: "viewport", first: true, predicate: i1.CdkVirtualScrollViewport, descendants: true }], ngImport: i0__namespace, template: "\n        <div [ngClass]=\"'p-virtualscroller p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-virtualscroller-header\" *ngIf=\"header || headerTemplate\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n            </div>\n            <div #content class=\"p-virtualscroller-content\">\n                <div class=\"p-virtualscroller-list\">\n                    <cdk-virtual-scroll-viewport #viewport [ngStyle]=\"{'height': scrollHeight}\" tabindex=\"0\" [itemSize]=\"itemSize\" [minBufferPx]=\"minBufferPx\" [maxBufferPx]=\"maxBufferPx\" (scrolledIndexChange)=\"onScrollIndexChange($event)\">\n                        <ng-container *cdkVirtualFor=\"let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd;\">\n                            <div [ngStyle]=\"{'height': itemSize + 'px'}\" class=\"p-virtualscroller-item\">\n                                <ng-container *ngTemplateOutlet=\"item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}\"></ng-container>\n                            </div>\n                        </ng-container>\n                    </cdk-virtual-scroll-viewport>\n                </div>\n            </div>\n            <div class=\"p-virtualscroller-footer\" *ngIf=\"footer || footerTemplate\">\n                <ng-content select=\"p-footer\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n            </div>\n        </div>\n    ", isInline: true, styles: ["cdk-virtual-scroll-viewport{outline:0 none}"], components: [{ type: i1__namespace.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation"], outputs: ["scrolledIndexChange"] }], directives: [{ type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1__namespace.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { type: i1__namespace.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.Default, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: VirtualScroller, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-virtualScroller',
                        template: "\n        <div [ngClass]=\"'p-virtualscroller p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-virtualscroller-header\" *ngIf=\"header || headerTemplate\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n            </div>\n            <div #content class=\"p-virtualscroller-content\">\n                <div class=\"p-virtualscroller-list\">\n                    <cdk-virtual-scroll-viewport #viewport [ngStyle]=\"{'height': scrollHeight}\" tabindex=\"0\" [itemSize]=\"itemSize\" [minBufferPx]=\"minBufferPx\" [maxBufferPx]=\"maxBufferPx\" (scrolledIndexChange)=\"onScrollIndexChange($event)\">\n                        <ng-container *cdkVirtualFor=\"let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd;\">\n                            <div [ngStyle]=\"{'height': itemSize + 'px'}\" class=\"p-virtualscroller-item\">\n                                <ng-container *ngTemplateOutlet=\"item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}\"></ng-container>\n                            </div>\n                        </ng-container>\n                    </cdk-virtual-scroll-viewport>\n                </div>\n            </div>\n            <div class=\"p-virtualscroller-footer\" *ngIf=\"footer || footerTemplate\">\n                <ng-content select=\"p-footer\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n            </div>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.Default,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./virtualscroller.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { value: [{
                    type: i0.Input
                }], itemSize: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], scrollHeight: [{
                    type: i0.Input
                }], lazy: [{
                    type: i0.Input
                }], rows: [{
                    type: i0.Input
                }], minBufferPx: [{
                    type: i0.Input
                }], maxBufferPx: [{
                    type: i0.Input
                }], delay: [{
                    type: i0.Input
                }], trackBy: [{
                    type: i0.Input
                }], header: [{
                    type: i0.ContentChild,
                    args: [api.Header]
                }], footer: [{
                    type: i0.ContentChild,
                    args: [api.Footer]
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }], viewport: [{
                    type: i0.ViewChild,
                    args: [i1.CdkVirtualScrollViewport]
                }], onLazyLoad: [{
                    type: i0.Output
                }], totalRecords: [{
                    type: i0.Input
                }], first: [{
                    type: i0.Input
                }], cache: [{
                    type: i0.Input
                }] } });
    var VirtualScrollerModule = /** @class */ (function () {
        function VirtualScrollerModule() {
        }
        return VirtualScrollerModule;
    }());
    VirtualScrollerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: VirtualScrollerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    VirtualScrollerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: VirtualScrollerModule, declarations: [VirtualScroller], imports: [i2.CommonModule, i1.ScrollingModule], exports: [VirtualScroller, api.SharedModule, i1.ScrollingModule] });
    VirtualScrollerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: VirtualScrollerModule, imports: [[i2.CommonModule, i1.ScrollingModule], api.SharedModule, i1.ScrollingModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: VirtualScrollerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule, i1.ScrollingModule],
                        exports: [VirtualScroller, api.SharedModule, i1.ScrollingModule],
                        declarations: [VirtualScroller]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.VirtualScroller = VirtualScroller;
    exports.VirtualScrollerModule = VirtualScrollerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-virtualscroller.umd.js.map
