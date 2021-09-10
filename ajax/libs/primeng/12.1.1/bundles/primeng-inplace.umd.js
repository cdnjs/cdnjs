(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/button'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/inplace', ['exports', '@angular/core', '@angular/common', 'primeng/button', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.inplace = {}), global.ng.core, global.ng.common, global.primeng.button, global.primeng.api));
}(this, (function (exports, i0, i1, i2, api) { 'use strict';

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

    var InplaceDisplay = /** @class */ (function () {
        function InplaceDisplay() {
        }
        return InplaceDisplay;
    }());
    InplaceDisplay.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InplaceDisplay, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    InplaceDisplay.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: InplaceDisplay, selector: "p-inplaceDisplay", host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: '<ng-content></ng-content>', isInline: true });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InplaceDisplay, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-inplaceDisplay',
                        template: '<ng-content></ng-content>',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }] });
    var InplaceContent = /** @class */ (function () {
        function InplaceContent() {
        }
        return InplaceContent;
    }());
    InplaceContent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InplaceContent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    InplaceContent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: InplaceContent, selector: "p-inplaceContent", host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: '<ng-content></ng-content>', isInline: true });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InplaceContent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-inplaceContent',
                        template: '<ng-content></ng-content>',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }] });
    var Inplace = /** @class */ (function () {
        function Inplace(cd) {
            this.cd = cd;
            this.closeIcon = 'pi pi-times';
            this.onActivate = new i0.EventEmitter();
            this.onDeactivate = new i0.EventEmitter();
        }
        Inplace.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'display':
                        _this.displayTemplate = item.template;
                        break;
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        Inplace.prototype.onActivateClick = function (event) {
            if (!this.preventClick)
                this.activate(event);
        };
        Inplace.prototype.onDeactivateClick = function (event) {
            if (!this.preventClick)
                this.deactivate(event);
        };
        Inplace.prototype.activate = function (event) {
            if (!this.disabled) {
                this.active = true;
                this.onActivate.emit(event);
                this.cd.markForCheck();
            }
        };
        Inplace.prototype.deactivate = function (event) {
            if (!this.disabled) {
                this.active = false;
                this.hover = false;
                this.onDeactivate.emit(event);
                this.cd.markForCheck();
            }
        };
        Inplace.prototype.onKeydown = function (event) {
            if (event.which === 13) {
                this.activate(event);
                event.preventDefault();
            }
        };
        return Inplace;
    }());
    Inplace.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Inplace, deps: [{ token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Inplace.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Inplace, selector: "p-inplace", inputs: { active: "active", closable: "closable", disabled: "disabled", preventClick: "preventClick", style: "style", styleClass: "styleClass", closeIcon: "closeIcon" }, outputs: { onActivate: "onActivate", onDeactivate: "onDeactivate" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: api.PrimeTemplate }], ngImport: i0__namespace, template: "\n        <div [ngClass]=\"{'p-inplace p-component': true, 'p-inplace-closable': closable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-inplace-display\" (click)=\"onActivateClick($event)\" tabindex=\"0\" (keydown)=\"onKeydown($event)\"\n                [ngClass]=\"{'p-disabled':disabled}\" *ngIf=\"!active\">\n                <ng-content select=\"[pInplaceDisplay]\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"displayTemplate\"></ng-container>\n            </div>\n            <div class=\"p-inplace-content\" *ngIf=\"active\">\n                <ng-content select=\"[pInplaceContent]\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                <button type=\"button\" [icon]=\"closeIcon\" pButton (click)=\"onDeactivateClick($event)\" *ngIf=\"closable\"></button>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-inplace .p-inplace-display{display:inline;cursor:pointer}.p-inplace .p-inplace-content{display:inline}.p-fluid .p-inplace.p-inplace-closable .p-inplace-content{display:flex}.p-fluid .p-inplace.p-inplace-closable .p-inplace-content>.p-inputtext{flex:1 1 auto;width:1%}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2__namespace.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Inplace, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-inplace',
                        template: "\n        <div [ngClass]=\"{'p-inplace p-component': true, 'p-inplace-closable': closable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-inplace-display\" (click)=\"onActivateClick($event)\" tabindex=\"0\" (keydown)=\"onKeydown($event)\"\n                [ngClass]=\"{'p-disabled':disabled}\" *ngIf=\"!active\">\n                <ng-content select=\"[pInplaceDisplay]\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"displayTemplate\"></ng-container>\n            </div>\n            <div class=\"p-inplace-content\" *ngIf=\"active\">\n                <ng-content select=\"[pInplaceContent]\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                <button type=\"button\" [icon]=\"closeIcon\" pButton (click)=\"onDeactivateClick($event)\" *ngIf=\"closable\"></button>\n            </div>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./inplace.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { active: [{
                    type: i0.Input
                }], closable: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], preventClick: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], closeIcon: [{
                    type: i0.Input
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }], onActivate: [{
                    type: i0.Output
                }], onDeactivate: [{
                    type: i0.Output
                }] } });
    var InplaceModule = /** @class */ (function () {
        function InplaceModule() {
        }
        return InplaceModule;
    }());
    InplaceModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InplaceModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    InplaceModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InplaceModule, declarations: [Inplace, InplaceDisplay, InplaceContent], imports: [i1.CommonModule, i2.ButtonModule], exports: [Inplace, InplaceDisplay, InplaceContent, i2.ButtonModule] });
    InplaceModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InplaceModule, imports: [[i1.CommonModule, i2.ButtonModule], i2.ButtonModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InplaceModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i2.ButtonModule],
                        exports: [Inplace, InplaceDisplay, InplaceContent, i2.ButtonModule],
                        declarations: [Inplace, InplaceDisplay, InplaceContent]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Inplace = Inplace;
    exports.InplaceContent = InplaceContent;
    exports.InplaceDisplay = InplaceDisplay;
    exports.InplaceModule = InplaceModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-inplace.umd.js.map
