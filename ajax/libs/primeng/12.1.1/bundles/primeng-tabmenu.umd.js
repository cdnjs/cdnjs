(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/ripple'), require('primeng/api'), require('@angular/router'), require('primeng/dom'), require('primeng/tooltip')) :
    typeof define === 'function' && define.amd ? define('primeng/tabmenu', ['exports', '@angular/core', '@angular/common', 'primeng/ripple', 'primeng/api', '@angular/router', 'primeng/dom', 'primeng/tooltip'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.tabmenu = {}), global.ng.core, global.ng.common, global.primeng.ripple, global.primeng.api, global.ng.router, global.primeng.dom, global.primeng.tooltip));
}(this, (function (exports, i0, i1, i3, api, i4, dom, i2) { 'use strict';

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
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

    var TabMenu = /** @class */ (function () {
        function TabMenu() {
        }
        TabMenu.prototype.ngAfterContentInit = function () {
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
        TabMenu.prototype.ngAfterViewInit = function () {
            this.updateInkBar();
        };
        TabMenu.prototype.ngAfterViewChecked = function () {
            if (this.tabChanged) {
                this.updateInkBar();
                this.tabChanged = false;
            }
        };
        TabMenu.prototype.itemClick = function (event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }
            this.activeItem = item;
            this.tabChanged = true;
        };
        TabMenu.prototype.updateInkBar = function () {
            var tabHeader = dom.DomHandler.findSingle(this.navbar.nativeElement, 'li.p-highlight');
            if (tabHeader) {
                this.inkbar.nativeElement.style.width = dom.DomHandler.getWidth(tabHeader) + 'px';
                this.inkbar.nativeElement.style.left = dom.DomHandler.getOffset(tabHeader).left - dom.DomHandler.getOffset(this.navbar.nativeElement).left + 'px';
            }
        };
        return TabMenu;
    }());
    TabMenu.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TabMenu, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    TabMenu.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TabMenu, selector: "p-tabMenu", inputs: { model: "model", activeItem: "activeItem", popup: "popup", style: "style", styleClass: "styleClass" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: api.PrimeTemplate }], viewQueries: [{ propertyName: "navbar", first: true, predicate: ["navbar"], descendants: true }, { propertyName: "inkbar", first: true, predicate: ["inkbar"], descendants: true }], ngImport: i0__namespace, template: "\n        <div [ngClass]=\"'p-tabmenu p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul #navbar class=\"p-tabmenu-nav p-reset\" role=\"tablist\">\n                <li *ngFor=\"let item of model; let i = index\" role=\"tab\" [ngStyle]=\"item.style\" [class]=\"item.styleClass\" [attr.aria-selected]=\"activeItem==item\" [attr.aria-expanded]=\"activeItem==item\"\n                    [ngClass]=\"{'p-tabmenuitem':true,'p-disabled':item.disabled,'p-highlight':activeItem==item,'p-hidden': item.visible === false}\" pTooltip [tooltipOptions]=\"item.tooltipOptions\">\n                    <a *ngIf=\"!item.routerLink\" [attr.href]=\"item.url\" class=\"p-menuitem-link\" role=\"presentation\" (click)=\"itemClick($event,item)\" (keydown.enter)=\"itemClick($event,item)\" [attr.tabindex]=\"item.disabled ? null : '0'\"\n                        [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\" pRipple>\n                        <ng-container *ngIf=\"!itemTemplate\">\n                            <span class=\"p-menuitem-icon\" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"p-menuitem-text\" *ngIf=\"item.escape !== false; else htmlLabel\">{{item.label}}</span>\n                            <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                        </ng-container>\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                    </a>\n                    <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\"\n                        role=\"presentation\" class=\"p-menuitem-link\" (click)=\"itemClick($event,item)\" (keydown.enter)=\"itemClick($event,item)\" [attr.tabindex]=\"item.disabled ? null : '0'\"\n                        [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\"\n                        [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\" pRipple>\n                        <ng-container *ngIf=\"!itemTemplate\">\n                            <span class=\"p-menuitem-icon\" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"p-menuitem-text\" *ngIf=\"item.escape !== false; else htmlRouteLabel\">{{item.label}}</span>\n                            <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                        </ng-container>\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                    </a>\n                </li>\n                <li #inkbar class=\"p-tabmenu-ink-bar\"></li>\n            </ul>\n        </div>\n    ", isInline: true, styles: [".p-tabmenu{overflow-x:auto}.p-tabmenu-nav{display:flex;margin:0;padding:0;list-style-type:none;flex-wrap:nowrap}.p-tabmenu-nav a{cursor:pointer;-webkit-user-select:none;-ms-user-select:none;user-select:none;display:flex;align-items:center;position:relative;text-decoration:none;overflow:hidden}.p-tabmenu-nav a:focus{z-index:1}.p-tabmenu-nav .p-menuitem-text{line-height:1}.p-tabmenu-ink-bar{display:none;z-index:1}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2__namespace.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace.Ripple, selector: "[pRipple]" }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4__namespace.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i4__namespace.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TabMenu, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-tabMenu',
                        template: "\n        <div [ngClass]=\"'p-tabmenu p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul #navbar class=\"p-tabmenu-nav p-reset\" role=\"tablist\">\n                <li *ngFor=\"let item of model; let i = index\" role=\"tab\" [ngStyle]=\"item.style\" [class]=\"item.styleClass\" [attr.aria-selected]=\"activeItem==item\" [attr.aria-expanded]=\"activeItem==item\"\n                    [ngClass]=\"{'p-tabmenuitem':true,'p-disabled':item.disabled,'p-highlight':activeItem==item,'p-hidden': item.visible === false}\" pTooltip [tooltipOptions]=\"item.tooltipOptions\">\n                    <a *ngIf=\"!item.routerLink\" [attr.href]=\"item.url\" class=\"p-menuitem-link\" role=\"presentation\" (click)=\"itemClick($event,item)\" (keydown.enter)=\"itemClick($event,item)\" [attr.tabindex]=\"item.disabled ? null : '0'\"\n                        [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\" pRipple>\n                        <ng-container *ngIf=\"!itemTemplate\">\n                            <span class=\"p-menuitem-icon\" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"p-menuitem-text\" *ngIf=\"item.escape !== false; else htmlLabel\">{{item.label}}</span>\n                            <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                        </ng-container>\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                    </a>\n                    <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\"\n                        role=\"presentation\" class=\"p-menuitem-link\" (click)=\"itemClick($event,item)\" (keydown.enter)=\"itemClick($event,item)\" [attr.tabindex]=\"item.disabled ? null : '0'\"\n                        [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\"\n                        [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\" pRipple>\n                        <ng-container *ngIf=\"!itemTemplate\">\n                            <span class=\"p-menuitem-icon\" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"p-menuitem-text\" *ngIf=\"item.escape !== false; else htmlRouteLabel\">{{item.label}}</span>\n                            <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                        </ng-container>\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                    </a>\n                </li>\n                <li #inkbar class=\"p-tabmenu-ink-bar\"></li>\n            </ul>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./tabmenu.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], propDecorators: { model: [{
                    type: i0.Input
                }], activeItem: [{
                    type: i0.Input
                }], popup: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], navbar: [{
                    type: i0.ViewChild,
                    args: ['navbar']
                }], inkbar: [{
                    type: i0.ViewChild,
                    args: ['inkbar']
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }] } });
    var TabMenuModule = /** @class */ (function () {
        function TabMenuModule() {
        }
        return TabMenuModule;
    }());
    TabMenuModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TabMenuModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    TabMenuModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TabMenuModule, declarations: [TabMenu], imports: [i1.CommonModule, i4.RouterModule, api.SharedModule, i3.RippleModule, i2.TooltipModule], exports: [TabMenu, i4.RouterModule, api.SharedModule, i2.TooltipModule] });
    TabMenuModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TabMenuModule, imports: [[i1.CommonModule, i4.RouterModule, api.SharedModule, i3.RippleModule, i2.TooltipModule], i4.RouterModule, api.SharedModule, i2.TooltipModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TabMenuModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i4.RouterModule, api.SharedModule, i3.RippleModule, i2.TooltipModule],
                        exports: [TabMenu, i4.RouterModule, api.SharedModule, i2.TooltipModule],
                        declarations: [TabMenu]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TabMenu = TabMenu;
    exports.TabMenuModule = TabMenuModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tabmenu.umd.js.map
