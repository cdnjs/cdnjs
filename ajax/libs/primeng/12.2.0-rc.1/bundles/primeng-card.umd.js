(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/card', ['exports', '@angular/core', '@angular/common', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.card = {}), global.ng.core, global.ng.common, global.primeng.api));
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

    var Card = /** @class */ (function () {
        function Card(el) {
            this.el = el;
        }
        Card.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'title':
                        _this.titleTemplate = item.template;
                        break;
                    case 'subtitle':
                        _this.subtitleTemplate = item.template;
                        break;
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                    default:
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        Card.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        return Card;
    }());
    Card.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Card, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Card.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Card, selector: "p-card", inputs: { header: "header", subheader: "subheader", style: "style", styleClass: "styleClass" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "headerFacet", first: true, predicate: api.Header, descendants: true }, { propertyName: "footerFacet", first: true, predicate: api.Footer, descendants: true }, { propertyName: "templates", predicate: api.PrimeTemplate }], ngImport: i0__namespace, template: "\n        <div [ngClass]=\"'p-card p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-card-header\" *ngIf=\"headerFacet || headerTemplate\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n            </div>\n            <div class=\"p-card-body\">\n                <div class=\"p-card-title\" *ngIf=\"header || titleTemplate\">\n                    {{header}}\n                    <ng-container *ngTemplateOutlet=\"titleTemplate\"></ng-container>\n                </div>\n                <div class=\"p-card-subtitle\" *ngIf=\"subheader || subtitleTemplate\">\n                    {{subheader}}\n                    <ng-container *ngTemplateOutlet=\"subtitleTemplate\"></ng-container>\n                </div>\n                <div class=\"p-card-content\">\n                    <ng-content></ng-content>\n                    <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                </div>\n                <div class=\"p-card-footer\" *ngIf=\"footerFacet || footerTemplate\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                    <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n                </div>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-card-header img{width:100%}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Card, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-card',
                        template: "\n        <div [ngClass]=\"'p-card p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-card-header\" *ngIf=\"headerFacet || headerTemplate\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n            </div>\n            <div class=\"p-card-body\">\n                <div class=\"p-card-title\" *ngIf=\"header || titleTemplate\">\n                    {{header}}\n                    <ng-container *ngTemplateOutlet=\"titleTemplate\"></ng-container>\n                </div>\n                <div class=\"p-card-subtitle\" *ngIf=\"subheader || subtitleTemplate\">\n                    {{subheader}}\n                    <ng-container *ngTemplateOutlet=\"subtitleTemplate\"></ng-container>\n                </div>\n                <div class=\"p-card-content\">\n                    <ng-content></ng-content>\n                    <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                </div>\n                <div class=\"p-card-footer\" *ngIf=\"footerFacet || footerTemplate\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                    <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n                </div>\n            </div>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./card.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { header: [{
                    type: i0.Input
                }], subheader: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], headerFacet: [{
                    type: i0.ContentChild,
                    args: [api.Header]
                }], footerFacet: [{
                    type: i0.ContentChild,
                    args: [api.Footer]
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }] } });
    var CardModule = /** @class */ (function () {
        function CardModule() {
        }
        return CardModule;
    }());
    CardModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CardModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    CardModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CardModule, declarations: [Card], imports: [i1.CommonModule], exports: [Card, api.SharedModule] });
    CardModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CardModule, imports: [[i1.CommonModule], api.SharedModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: CardModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [Card, api.SharedModule],
                        declarations: [Card]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Card = Card;
    exports.CardModule = CardModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-card.umd.js.map
