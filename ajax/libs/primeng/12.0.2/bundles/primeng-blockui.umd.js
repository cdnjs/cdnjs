(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/blockui', ['exports', '@angular/core', '@angular/common', 'primeng/dom', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.blockui = {}), global.ng.core, global.ng.common, global.primeng.dom, global.primeng.api));
}(this, (function (exports, i0, i1, dom, api) { 'use strict';

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

    var BlockUI = /** @class */ (function () {
        function BlockUI(el, cd) {
            this.el = el;
            this.cd = cd;
            this.autoZIndex = true;
            this.baseZIndex = 0;
        }
        Object.defineProperty(BlockUI.prototype, "blocked", {
            get: function () {
                return this._blocked;
            },
            set: function (val) {
                this._blocked = val;
                if (this.mask && this.mask.nativeElement) {
                    if (this._blocked)
                        this.block();
                    else
                        this.unblock();
                }
            },
            enumerable: false,
            configurable: true
        });
        BlockUI.prototype.ngAfterViewInit = function () {
            if (this.target && !this.target.getBlockableElement) {
                throw 'Target of BlockUI must implement BlockableUI interface';
            }
        };
        BlockUI.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                    default:
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        BlockUI.prototype.block = function () {
            if (this.target) {
                this.target.getBlockableElement().appendChild(this.mask.nativeElement);
                this.target.getBlockableElement().style.position = 'relative';
            }
            else {
                document.body.appendChild(this.mask.nativeElement);
            }
            if (this.autoZIndex) {
                this.mask.nativeElement.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
            }
        };
        BlockUI.prototype.unblock = function () {
            this.el.nativeElement.appendChild(this.mask.nativeElement);
        };
        BlockUI.prototype.ngOnDestroy = function () {
            this.unblock();
        };
        return BlockUI;
    }());
    BlockUI.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: BlockUI, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    BlockUI.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: BlockUI, selector: "p-blockUI", inputs: { target: "target", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", styleClass: "styleClass", blocked: "blocked" }, queries: [{ propertyName: "templates", predicate: api.PrimeTemplate }], viewQueries: [{ propertyName: "mask", first: true, predicate: ["mask"], descendants: true }], ngImport: i0__namespace, template: "\n        <div #mask [class]=\"styleClass\" [ngClass]=\"{'p-blockui-document':!target, 'p-blockui p-component-overlay': true}\" [ngStyle]=\"{display: blocked ? 'flex' : 'none'}\">\n            <ng-content></ng-content>\n            <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n        </div>\n    ", isInline: true, styles: [".p-blockui{top:0;left:0;width:100%;height:100%;background-color:transparent;transition-property:background-color;display:flex;align-items:center;justify-content:center}.p-blockui,.p-blockui.p-component-overlay{position:absolute}.p-blockui-document.p-component-overlay{position:fixed}.p-blockui-leave.p-component-overlay{background-color:transparent}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: BlockUI, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-blockUI',
                        template: "\n        <div #mask [class]=\"styleClass\" [ngClass]=\"{'p-blockui-document':!target, 'p-blockui p-component-overlay': true}\" [ngStyle]=\"{display: blocked ? 'flex' : 'none'}\">\n            <ng-content></ng-content>\n            <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./blockui.css']
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { target: [{
                    type: i0.Input
                }], autoZIndex: [{
                    type: i0.Input
                }], baseZIndex: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }], mask: [{
                    type: i0.ViewChild,
                    args: ['mask']
                }], blocked: [{
                    type: i0.Input
                }] } });
    var BlockUIModule = /** @class */ (function () {
        function BlockUIModule() {
        }
        return BlockUIModule;
    }());
    BlockUIModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: BlockUIModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    BlockUIModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: BlockUIModule, declarations: [BlockUI], imports: [i1.CommonModule], exports: [BlockUI] });
    BlockUIModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: BlockUIModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: BlockUIModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [BlockUI],
                        declarations: [BlockUI]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BlockUI = BlockUI;
    exports.BlockUIModule = BlockUIModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-blockui.umd.js.map
