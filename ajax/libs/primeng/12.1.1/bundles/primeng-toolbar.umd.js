(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/toolbar', ['exports', '@angular/core', '@angular/common', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.toolbar = {}), global.ng.core, global.ng.common, global.primeng.api));
}(this, (function (exports, i0, i1, api) { 'use strict';

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

    var Toolbar = /** @class */ (function () {
        function Toolbar(el) {
            this.el = el;
        }
        Toolbar.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Toolbar.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'left':
                        _this.leftTemplate = item.template;
                        break;
                    case 'right':
                        _this.rightTemplate = item.template;
                        break;
                }
            });
        };
        return Toolbar;
    }());
    Toolbar.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Toolbar, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Toolbar.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Toolbar, selector: "p-toolbar", inputs: { style: "style", styleClass: "styleClass" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: api.PrimeTemplate }], ngImport: i0__namespace, template: "\n        <div [ngClass]=\"'p-toolbar p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\" role=\"toolbar\">\n            <ng-content></ng-content>\n            <div class=\"p-toolbar-group-left\" *ngIf=\"leftTemplate\">\n                <ng-container *ngTemplateOutlet=\"leftTemplate\"></ng-container>\n            </div>\n            <div class=\"p-toolbar-group-right\" *ngIf=\"rightTemplate\">\n                <ng-container *ngTemplateOutlet=\"rightTemplate\"></ng-container>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-toolbar{justify-content:space-between;flex-wrap:wrap}.p-toolbar,.p-toolbar-group-left,.p-toolbar-group-right{display:flex;align-items:center}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Toolbar, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-toolbar',
                        template: "\n        <div [ngClass]=\"'p-toolbar p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\" role=\"toolbar\">\n            <ng-content></ng-content>\n            <div class=\"p-toolbar-group-left\" *ngIf=\"leftTemplate\">\n                <ng-container *ngTemplateOutlet=\"leftTemplate\"></ng-container>\n            </div>\n            <div class=\"p-toolbar-group-right\" *ngIf=\"rightTemplate\">\n                <ng-container *ngTemplateOutlet=\"rightTemplate\"></ng-container>\n            </div>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./toolbar.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }] } });
    var ToolbarModule = /** @class */ (function () {
        function ToolbarModule() {
        }
        return ToolbarModule;
    }());
    ToolbarModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToolbarModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ToolbarModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToolbarModule, declarations: [Toolbar], imports: [i1.CommonModule], exports: [Toolbar] });
    ToolbarModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToolbarModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToolbarModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [Toolbar],
                        declarations: [Toolbar]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Toolbar = Toolbar;
    exports.ToolbarModule = ToolbarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-toolbar.umd.js.map
