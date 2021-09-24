(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('primeng/ripple'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('primeng/panel', ['exports', '@angular/core', '@angular/common', 'primeng/api', 'primeng/ripple', '@angular/animations'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.panel = {}), global.ng.core, global.ng.common, global.primeng.api, global.primeng.ripple, global.ng.animations));
}(this, (function (exports, i0, i1, api, i2, animations) { 'use strict';

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
    var Panel = /** @class */ (function () {
        function Panel(el) {
            this.el = el;
            this.collapsed = false;
            this.expandIcon = 'pi pi-plus';
            this.collapseIcon = 'pi pi-minus';
            this.showHeader = true;
            this.toggler = "icon";
            this.collapsedChange = new i0.EventEmitter();
            this.onBeforeToggle = new i0.EventEmitter();
            this.onAfterToggle = new i0.EventEmitter();
            this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
            this.id = "p-panel-" + idx++;
        }
        Panel.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                    case 'icons':
                        _this.iconTemplate = item.template;
                        break;
                    default:
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        Panel.prototype.onHeaderClick = function (event) {
            if (this.toggler === 'header') {
                this.toggle(event);
            }
        };
        Panel.prototype.onIconClick = function (event) {
            if (this.toggler === 'icon') {
                this.toggle(event);
            }
        };
        Panel.prototype.toggle = function (event) {
            if (this.animating) {
                return false;
            }
            this.animating = true;
            this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
            if (this.toggleable) {
                if (this.collapsed)
                    this.expand(event);
                else
                    this.collapse(event);
            }
            event.preventDefault();
        };
        Panel.prototype.expand = function (event) {
            this.collapsed = false;
            this.collapsedChange.emit(this.collapsed);
        };
        Panel.prototype.collapse = function (event) {
            this.collapsed = true;
            this.collapsedChange.emit(this.collapsed);
        };
        Panel.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Panel.prototype.onToggleDone = function (event) {
            this.animating = false;
            this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        };
        return Panel;
    }());
    Panel.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Panel, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Panel.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Panel, selector: "p-panel", inputs: { toggleable: "toggleable", header: "header", collapsed: "collapsed", style: "style", styleClass: "styleClass", expandIcon: "expandIcon", collapseIcon: "collapseIcon", showHeader: "showHeader", toggler: "toggler", transitionOptions: "transitionOptions" }, outputs: { collapsedChange: "collapsedChange", onBeforeToggle: "onBeforeToggle", onAfterToggle: "onAfterToggle" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "footerFacet", first: true, predicate: api.Footer, descendants: true }, { propertyName: "templates", predicate: api.PrimeTemplate }], ngImport: i0__namespace, template: "\n        <div [attr.id]=\"id\" [ngClass]=\"{'p-panel p-component': true, 'p-panel-toggleable': toggleable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-panel-header\" *ngIf=\"showHeader\" (click)=\"onHeaderClick($event)\" [attr.id]=\"id + '-titlebar'\">\n                <span class=\"p-panel-title\" *ngIf=\"header\" [attr.id]=\"id + '_header'\">{{header}}</span>\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                <div class=\"p-panel-icons\">\n                    <ng-template *ngTemplateOutlet=\"iconTemplate\"></ng-template>\n                    <button *ngIf=\"toggleable\" type=\"button\" [attr.id]=\"id + '-label'\" class=\"p-panel-header-icon p-panel-toggler p-link\" pRipple\n                        (click)=\"onIconClick($event)\" (keydown.enter)=\"onIconClick($event)\" [attr.aria-controls]=\"id + '-content'\" role=\"tab\" [attr.aria-expanded]=\"!collapsed\">\n                        <span [class]=\"collapsed ? expandIcon : collapseIcon\"></span>\n                    </button>\n                </div>\n            </div>\n            <div [attr.id]=\"id + '-content'\" class=\"p-toggleable-content\" [@panelContent]=\"collapsed ? {value: 'hidden', params: {transitionParams: animating ? transitionOptions : '0ms', height: '0', opacity:'0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*', opacity: '1'}}\" (@panelContent.done)=\"onToggleDone($event)\"\n                role=\"region\" [attr.aria-hidden]=\"collapsed\" [attr.aria-labelledby]=\"id  + '-titlebar'\">\n                <div class=\"p-panel-content\">\n                    <ng-content></ng-content>\n                    <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                </div>\n\n                <div class=\"p-panel-footer\" *ngIf=\"footerFacet || footerTemplate\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                    <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n                </div>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-panel-header{display:flex;justify-content:space-between;align-items:center}.p-panel-title{line-height:1}.p-panel-header-icon{display:inline-flex;justify-content:center;align-items:center;cursor:pointer;text-decoration:none;overflow:hidden;position:relative}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2__namespace.Ripple, selector: "[pRipple]" }], animations: [
            animations.trigger('panelContent', [
                animations.state('hidden', animations.style({
                    height: '0',
                    overflow: 'hidden'
                })),
                animations.state('void', animations.style({
                    height: '{{height}}'
                }), { params: { height: '0' } }),
                animations.state('visible', animations.style({
                    height: '*'
                })),
                animations.transition('visible <=> hidden', [animations.style({ overflow: 'hidden' }), animations.animate('{{transitionParams}}')]),
                animations.transition('void => hidden', animations.animate('{{transitionParams}}')),
                animations.transition('void => visible', animations.animate('{{transitionParams}}'))
            ])
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Panel, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-panel',
                        template: "\n        <div [attr.id]=\"id\" [ngClass]=\"{'p-panel p-component': true, 'p-panel-toggleable': toggleable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-panel-header\" *ngIf=\"showHeader\" (click)=\"onHeaderClick($event)\" [attr.id]=\"id + '-titlebar'\">\n                <span class=\"p-panel-title\" *ngIf=\"header\" [attr.id]=\"id + '_header'\">{{header}}</span>\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                <div class=\"p-panel-icons\">\n                    <ng-template *ngTemplateOutlet=\"iconTemplate\"></ng-template>\n                    <button *ngIf=\"toggleable\" type=\"button\" [attr.id]=\"id + '-label'\" class=\"p-panel-header-icon p-panel-toggler p-link\" pRipple\n                        (click)=\"onIconClick($event)\" (keydown.enter)=\"onIconClick($event)\" [attr.aria-controls]=\"id + '-content'\" role=\"tab\" [attr.aria-expanded]=\"!collapsed\">\n                        <span [class]=\"collapsed ? expandIcon : collapseIcon\"></span>\n                    </button>\n                </div>\n            </div>\n            <div [attr.id]=\"id + '-content'\" class=\"p-toggleable-content\" [@panelContent]=\"collapsed ? {value: 'hidden', params: {transitionParams: animating ? transitionOptions : '0ms', height: '0', opacity:'0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*', opacity: '1'}}\" (@panelContent.done)=\"onToggleDone($event)\"\n                role=\"region\" [attr.aria-hidden]=\"collapsed\" [attr.aria-labelledby]=\"id  + '-titlebar'\">\n                <div class=\"p-panel-content\">\n                    <ng-content></ng-content>\n                    <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                </div>\n\n                <div class=\"p-panel-footer\" *ngIf=\"footerFacet || footerTemplate\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                    <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n                </div>\n            </div>\n        </div>\n    ",
                        animations: [
                            animations.trigger('panelContent', [
                                animations.state('hidden', animations.style({
                                    height: '0',
                                    overflow: 'hidden'
                                })),
                                animations.state('void', animations.style({
                                    height: '{{height}}'
                                }), { params: { height: '0' } }),
                                animations.state('visible', animations.style({
                                    height: '*'
                                })),
                                animations.transition('visible <=> hidden', [animations.style({ overflow: 'hidden' }), animations.animate('{{transitionParams}}')]),
                                animations.transition('void => hidden', animations.animate('{{transitionParams}}')),
                                animations.transition('void => visible', animations.animate('{{transitionParams}}'))
                            ])
                        ],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./panel.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { toggleable: [{
                    type: i0.Input
                }], header: [{
                    type: i0.Input
                }], collapsed: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], expandIcon: [{
                    type: i0.Input
                }], collapseIcon: [{
                    type: i0.Input
                }], showHeader: [{
                    type: i0.Input
                }], toggler: [{
                    type: i0.Input
                }], collapsedChange: [{
                    type: i0.Output
                }], onBeforeToggle: [{
                    type: i0.Output
                }], onAfterToggle: [{
                    type: i0.Output
                }], transitionOptions: [{
                    type: i0.Input
                }], footerFacet: [{
                    type: i0.ContentChild,
                    args: [api.Footer]
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }] } });
    var PanelModule = /** @class */ (function () {
        function PanelModule() {
        }
        return PanelModule;
    }());
    PanelModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: PanelModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    PanelModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: PanelModule, declarations: [Panel], imports: [i1.CommonModule, api.SharedModule, i2.RippleModule], exports: [Panel, api.SharedModule] });
    PanelModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: PanelModule, imports: [[i1.CommonModule, api.SharedModule, i2.RippleModule], api.SharedModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: PanelModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, api.SharedModule, i2.RippleModule],
                        exports: [Panel, api.SharedModule],
                        declarations: [Panel]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Panel = Panel;
    exports.PanelModule = PanelModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-panel.umd.js.map
