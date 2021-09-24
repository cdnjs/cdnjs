(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/api'), require('primeng/ripple')) :
    typeof define === 'function' && define.amd ? define('primeng/fieldset', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/api', 'primeng/ripple'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.fieldset = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.api, global.primeng.ripple));
}(this, (function (exports, i0, animations, i1, api, i2) { 'use strict';

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
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

    var idx = 0;
    var Fieldset = /** @class */ (function () {
        function Fieldset(el) {
            this.el = el;
            this.collapsed = false;
            this.collapsedChange = new i0.EventEmitter();
            this.onBeforeToggle = new i0.EventEmitter();
            this.onAfterToggle = new i0.EventEmitter();
            this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
            this.id = "p-fieldset-" + idx++;
        }
        Fieldset.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        Fieldset.prototype.toggle = function (event) {
            if (this.animating) {
                return false;
            }
            this.animating = true;
            this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
            this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
            event.preventDefault();
        };
        Fieldset.prototype.expand = function (event) {
            this.collapsed = false;
            this.collapsedChange.emit(this.collapsed);
        };
        Fieldset.prototype.collapse = function (event) {
            this.collapsed = true;
            this.collapsedChange.emit(this.collapsed);
        };
        Fieldset.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Fieldset.prototype.onToggleDone = function (event) {
            this.animating = false;
        };
        return Fieldset;
    }());
    Fieldset.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Fieldset, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Fieldset.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Fieldset, selector: "p-fieldset", inputs: { legend: "legend", toggleable: "toggleable", collapsed: "collapsed", style: "style", styleClass: "styleClass", transitionOptions: "transitionOptions" }, outputs: { collapsedChange: "collapsedChange", onBeforeToggle: "onBeforeToggle", onAfterToggle: "onAfterToggle" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: api.PrimeTemplate }], ngImport: i0__namespace, template: "\n        <fieldset [attr.id]=\"id\" [ngClass]=\"{'p-fieldset p-component': true, 'p-fieldset-toggleable': toggleable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <legend class=\"p-fieldset-legend\">\n                <ng-container *ngIf=\"toggleable; else legendContent\">\n                    <a tabindex=\"0\" (click)=\"toggle($event)\" (keydown.enter)=\"toggle($event)\" [attr.aria-controls]=\"id + '-content'\" [attr.aria-expanded]=\"!collapsed\" pRipple>\n                        <span class=\"p-fieldset-toggler pi\" *ngIf=\"toggleable\" [ngClass]=\"{'pi-minus': !collapsed,'pi-plus':collapsed}\"></span>\n                        <ng-container *ngTemplateOutlet=\"legendContent\"></ng-container>\n                    </a>\n                </ng-container>\n                <ng-template #legendContent>\n                    <span class=\"p-fieldset-legend-text\">{{legend}}</span>\n                    <ng-content select=\"p-header\"></ng-content>\n                    <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                </ng-template>\n            </legend>\n            <div [attr.id]=\"id + '-content'\" class=\"p-toggleable-content\" [@fieldsetContent]=\"collapsed ? {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}}\"\n                        [attr.aria-labelledby]=\"id\" [attr.aria-hidden]=\"collapsed\"\n                         (@fieldsetContent.done)=\"onToggleDone($event)\" role=\"region\">\n                <div class=\"p-fieldset-content\">\n                    <ng-content></ng-content>\n                    <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                </div>\n            </div>\n        </fieldset>\n    ", isInline: true, styles: [".p-fieldset-legend>a,.p-fieldset-legend>span{display:flex;align-items:center;justify-content:center}.p-fieldset-toggleable .p-fieldset-legend a{cursor:pointer;-webkit-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;position:relative}.p-fieldset-legend-text{line-height:1}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.Ripple, selector: "[pRipple]" }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [
            animations.trigger('fieldsetContent', [
                animations.state('hidden', animations.style({
                    height: '0',
                    overflow: 'hidden'
                })),
                animations.state('visible', animations.style({
                    height: '*'
                })),
                animations.transition('visible <=> hidden', [animations.style({ overflow: 'hidden' }), animations.animate('{{transitionParams}}')]),
                animations.transition('void => *', animations.animate(0))
            ])
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Fieldset, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-fieldset',
                        template: "\n        <fieldset [attr.id]=\"id\" [ngClass]=\"{'p-fieldset p-component': true, 'p-fieldset-toggleable': toggleable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <legend class=\"p-fieldset-legend\">\n                <ng-container *ngIf=\"toggleable; else legendContent\">\n                    <a tabindex=\"0\" (click)=\"toggle($event)\" (keydown.enter)=\"toggle($event)\" [attr.aria-controls]=\"id + '-content'\" [attr.aria-expanded]=\"!collapsed\" pRipple>\n                        <span class=\"p-fieldset-toggler pi\" *ngIf=\"toggleable\" [ngClass]=\"{'pi-minus': !collapsed,'pi-plus':collapsed}\"></span>\n                        <ng-container *ngTemplateOutlet=\"legendContent\"></ng-container>\n                    </a>\n                </ng-container>\n                <ng-template #legendContent>\n                    <span class=\"p-fieldset-legend-text\">{{legend}}</span>\n                    <ng-content select=\"p-header\"></ng-content>\n                    <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                </ng-template>\n            </legend>\n            <div [attr.id]=\"id + '-content'\" class=\"p-toggleable-content\" [@fieldsetContent]=\"collapsed ? {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}}\"\n                        [attr.aria-labelledby]=\"id\" [attr.aria-hidden]=\"collapsed\"\n                         (@fieldsetContent.done)=\"onToggleDone($event)\" role=\"region\">\n                <div class=\"p-fieldset-content\">\n                    <ng-content></ng-content>\n                    <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                </div>\n            </div>\n        </fieldset>\n    ",
                        animations: [
                            animations.trigger('fieldsetContent', [
                                animations.state('hidden', animations.style({
                                    height: '0',
                                    overflow: 'hidden'
                                })),
                                animations.state('visible', animations.style({
                                    height: '*'
                                })),
                                animations.transition('visible <=> hidden', [animations.style({ overflow: 'hidden' }), animations.animate('{{transitionParams}}')]),
                                animations.transition('void => *', animations.animate(0))
                            ])
                        ],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./fieldset.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { legend: [{
                    type: i0.Input
                }], toggleable: [{
                    type: i0.Input
                }], collapsed: [{
                    type: i0.Input
                }], collapsedChange: [{
                    type: i0.Output
                }], onBeforeToggle: [{
                    type: i0.Output
                }], onAfterToggle: [{
                    type: i0.Output
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], transitionOptions: [{
                    type: i0.Input
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }] } });
    var FieldsetModule = /** @class */ (function () {
        function FieldsetModule() {
        }
        return FieldsetModule;
    }());
    FieldsetModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FieldsetModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    FieldsetModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FieldsetModule, declarations: [Fieldset], imports: [i1.CommonModule, i2.RippleModule], exports: [Fieldset, api.SharedModule] });
    FieldsetModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FieldsetModule, imports: [[i1.CommonModule, i2.RippleModule], api.SharedModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: FieldsetModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i2.RippleModule],
                        exports: [Fieldset, api.SharedModule],
                        declarations: [Fieldset]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Fieldset = Fieldset;
    exports.FieldsetModule = FieldsetModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-fieldset.umd.js.map
