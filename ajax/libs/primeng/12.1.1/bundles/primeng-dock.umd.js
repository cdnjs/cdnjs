(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('@angular/router'), require('primeng/ripple'), require('primeng/tooltip')) :
    typeof define === 'function' && define.amd ? define('primeng/dock', ['exports', '@angular/core', '@angular/common', 'primeng/api', '@angular/router', 'primeng/ripple', 'primeng/tooltip'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.dock = {}), global.ng.core, global.ng.common, global.primeng.api, global.ng.router, global.primeng.ripple, global.primeng.tooltip));
}(this, (function (exports, i0, i1, api, i2, i3, i4) { 'use strict';

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
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);

    var Dock = /** @class */ (function () {
        function Dock(el, cd) {
            this.el = el;
            this.cd = cd;
            this.model = null;
            this.position = "bottom";
            this.currentIndex = -3;
        }
        Dock.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    default:
                        _this.itemTemplate = item.template;
                        break;
                }
            });
        };
        Dock.prototype.onListMouseLeave = function () {
            this.currentIndex = -3;
            this.cd.markForCheck();
        };
        Dock.prototype.onItemMouseEnter = function (index) {
            this.currentIndex = index;
            if (index === 1) {
            }
            this.cd.markForCheck();
        };
        Dock.prototype.onItemClick = function (e, item) {
            if (item.command) {
                item.command({ originalEvent: e, item: item });
            }
        };
        Object.defineProperty(Dock.prototype, "containerClass", {
            get: function () {
                var _a;
                return _a = {},
                    _a['p-dock p-component ' + (" p-dock-" + this.position)] = true,
                    _a;
            },
            enumerable: false,
            configurable: true
        });
        Dock.prototype.isClickableRouterLink = function (item) {
            return item.routerLink && !item.disabled;
        };
        Dock.prototype.itemClass = function (index) {
            return {
                'p-dock-item': true,
                'p-dock-item-second-prev': (this.currentIndex - 2) === index,
                'p-dock-item-prev': (this.currentIndex - 1) === index,
                'p-dock-item-current': this.currentIndex === index,
                'p-dock-item-next': (this.currentIndex + 1) === index,
                'p-dock-item-second-next': (this.currentIndex + 2) === index
            };
        };
        return Dock;
    }());
    Dock.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Dock, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Dock.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Dock, selector: "p-dock", inputs: { id: "id", style: "style", styleClass: "styleClass", model: "model", position: "position" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: api.PrimeTemplate }], ngImport: i0__namespace, template: "\n        <div [attr.id]=\"id\" [ngClass]=\"containerClass\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul #list class=\"p-dock-list\" role=\"menu\" (mouseleave)=\"onListMouseLeave()\">\n                <li *ngFor=\"let item of model; let i = index\" [ngClass]=\"itemClass(i)\" (mouseenter)=\"onItemMouseEnter(i)\">\n                    <a *ngIf=\"isClickableRouterLink(item); else elseBlock\" pRipple [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\"\n                        [ngClass]=\"{'p-disabled':item.disabled}\" class=\"p-dock-action\"  role=\"menuitem\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" (click)=\"onItemClick($event, item)\" (keydown.enter)=\"onItemClick($event, item, i)\"\n                        [attr.target]=\"item.target\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')\"  pTooltip [tooltipOptions]=\"item.tooltipOptions\"\n                        [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\">\n                            <span class=\"p-dock-action-icon\" *ngIf=\"item.icon && !itemTemplate\" [ngClass]=\"item.icon\"></span>\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n                    </a>\n                    <ng-template #elseBlock>\n                        <a [tooltipPosition]=\"item.tooltipPosition\" [attr.href]=\"item.url||null\" class=\"p-dock-action\"  role=\"menuitem\" pRipple (click)=\"onItemClick($event, item)\"  pTooltip [tooltipOptions]=\"item.tooltipOptions\"\n                            [ngClass]=\"{'p-disabled':item.disabled}\" (keydown.enter)=\"onItemClick($event, item, i)\" [attr.target]=\"item.target\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')\">\n                            <span class=\"p-dock-action-icon\" *ngIf=\"item.icon && !itemTemplate\" [ngClass]=\"item.icon\"></span>\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n                        </a>\n                    </ng-template>\n                </li>\n            </ul>\n        </div>\n    ", isInline: true, styles: [".p-dock{position:absolute;z-index:1;pointer-events:none}.p-dock,.p-dock-list{display:flex;justify-content:center;align-items:center}.p-dock-list{margin:0;padding:0;list-style:none;pointer-events:auto}.p-dock-item{transition:all .2s cubic-bezier(.4,0,.2,1);will-change:transform}.p-dock-action{display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;cursor:default}.p-dock-item-second-next,.p-dock-item-second-prev{transform:scale(1.2)}.p-dock-item-next,.p-dock-item-prev{transform:scale(1.4)}.p-dock-item-current{transform:scale(1.6);z-index:1}.p-dock-top{left:0;top:0;width:100%}.p-dock-top .p-dock-item{transform-origin:center top}.p-dock-bottom{left:0;bottom:0;width:100%}.p-dock-bottom .p-dock-item{transform-origin:center bottom}.p-dock-right{right:0;top:0;height:100%}.p-dock-right .p-dock-item{transform-origin:center right}.p-dock-right .p-dock-list{flex-direction:column}.p-dock-left{left:0;top:0;height:100%}.p-dock-left .p-dock-item{transform-origin:center left}.p-dock-left .p-dock-list{flex-direction:column}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i3__namespace.Ripple, selector: "[pRipple]" }, { type: i4__namespace.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Dock, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-dock',
                        template: "\n        <div [attr.id]=\"id\" [ngClass]=\"containerClass\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul #list class=\"p-dock-list\" role=\"menu\" (mouseleave)=\"onListMouseLeave()\">\n                <li *ngFor=\"let item of model; let i = index\" [ngClass]=\"itemClass(i)\" (mouseenter)=\"onItemMouseEnter(i)\">\n                    <a *ngIf=\"isClickableRouterLink(item); else elseBlock\" pRipple [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\"\n                        [ngClass]=\"{'p-disabled':item.disabled}\" class=\"p-dock-action\"  role=\"menuitem\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" (click)=\"onItemClick($event, item)\" (keydown.enter)=\"onItemClick($event, item, i)\"\n                        [attr.target]=\"item.target\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')\"  pTooltip [tooltipOptions]=\"item.tooltipOptions\"\n                        [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\">\n                            <span class=\"p-dock-action-icon\" *ngIf=\"item.icon && !itemTemplate\" [ngClass]=\"item.icon\"></span>\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n                    </a>\n                    <ng-template #elseBlock>\n                        <a [tooltipPosition]=\"item.tooltipPosition\" [attr.href]=\"item.url||null\" class=\"p-dock-action\"  role=\"menuitem\" pRipple (click)=\"onItemClick($event, item)\"  pTooltip [tooltipOptions]=\"item.tooltipOptions\"\n                            [ngClass]=\"{'p-disabled':item.disabled}\" (keydown.enter)=\"onItemClick($event, item, i)\" [attr.target]=\"item.target\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')\">\n                            <span class=\"p-dock-action-icon\" *ngIf=\"item.icon && !itemTemplate\" [ngClass]=\"item.icon\"></span>\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n                        </a>\n                    </ng-template>\n                </li>\n            </ul>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./dock.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { id: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], model: [{
                    type: i0.Input
                }], position: [{
                    type: i0.Input
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }] } });
    var DockModule = /** @class */ (function () {
        function DockModule() {
        }
        return DockModule;
    }());
    DockModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DockModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DockModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DockModule, declarations: [Dock], imports: [i1.CommonModule, i2.RouterModule, i3.RippleModule, i4.TooltipModule], exports: [Dock, api.SharedModule, i4.TooltipModule, i2.RouterModule] });
    DockModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DockModule, imports: [[i1.CommonModule, i2.RouterModule, i3.RippleModule, i4.TooltipModule], api.SharedModule, i4.TooltipModule, i2.RouterModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DockModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i2.RouterModule, i3.RippleModule, i4.TooltipModule],
                        exports: [Dock, api.SharedModule, i4.TooltipModule, i2.RouterModule],
                        declarations: [Dock]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Dock = Dock;
    exports.DockModule = DockModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-dock.umd.js.map
