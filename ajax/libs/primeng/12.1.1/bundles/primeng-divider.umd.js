(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/divider', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.divider = {}), global.ng.core, global.ng.common));
}(this, (function (exports, i0, i1) { 'use strict';

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

    var Divider = /** @class */ (function () {
        function Divider() {
            this.layout = "horizontal";
            this.type = "solid";
        }
        Divider.prototype.containerClass = function () {
            return {
                'p-divider p-component': true,
                'p-divider-horizontal': this.layout === "horizontal",
                'p-divider-vertical': this.layout === "vertical",
                'p-divider-solid': this.type === "solid",
                'p-divider-dashed': this.type === "dashed",
                'p-divider-dotted': this.type === "dotted",
                'p-divider-left': this.layout === 'horizontal' && (!this.align || this.align === 'left'),
                'p-divider-center': (this.layout === 'horizontal' && this.align === 'center') || (this.layout === 'vertical' && (!this.align || this.align === 'center')),
                'p-divider-right': this.layout === 'horizontal' && this.align === 'right',
                'p-divider-top': this.layout === 'vertical' && (this.align === 'top'),
                'p-divider-bottom': this.layout === 'vertical' && this.align === 'bottom'
            };
        };
        return Divider;
    }());
    Divider.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Divider, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    Divider.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Divider, selector: "p-divider", inputs: { styleClass: "styleClass", style: "style", layout: "layout", type: "type", align: "align" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <div [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\" role=\"separator\">\n            <div class=\"p-divider-content\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-divider-horizontal{display:flex;width:100%;position:relative;align-items:center}.p-divider-horizontal:before{position:absolute;display:block;top:50%;left:0;width:100%;content:\"\"}.p-divider-horizontal.p-divider-left{justify-content:flex-start}.p-divider-horizontal.p-divider-right{justify-content:flex-end}.p-divider-horizontal.p-divider-center{justify-content:center}.p-divider-content{z-index:1}.p-divider-vertical{min-height:100%;margin:0 1rem;display:flex;position:relative;justify-content:center}.p-divider-vertical:before{position:absolute;display:block;top:0;left:50%;height:100%;content:\"\"}.p-divider-vertical.p-divider-top{align-items:flex-start}.p-divider-vertical.p-divider-center{align-items:center}.p-divider-vertical.p-divider-bottom{align-items:flex-end}.p-divider-solid.p-divider-horizontal:before{border-top-style:solid}.p-divider-solid.p-divider-vertical:before{border-left-style:solid}.p-divider-dashed.p-divider-horizontal:before{border-top-style:dashed}.p-divider-dashed.p-divider-vertical:before{border-left-style:dashed}.p-divider-dotted.p-divider-horizontal:before{border-top-style:dotted;border-left-style:dotted}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Divider, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-divider',
                        template: "\n        <div [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\" role=\"separator\">\n            <div class=\"p-divider-content\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./divider.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], propDecorators: { styleClass: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], layout: [{
                    type: i0.Input
                }], type: [{
                    type: i0.Input
                }], align: [{
                    type: i0.Input
                }] } });
    var DividerModule = /** @class */ (function () {
        function DividerModule() {
        }
        return DividerModule;
    }());
    DividerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DividerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DividerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DividerModule, declarations: [Divider], imports: [i1.CommonModule], exports: [Divider] });
    DividerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DividerModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DividerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [Divider],
                        declarations: [Divider]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Divider = Divider;
    exports.DividerModule = DividerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-divider.umd.js.map
