(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('@angular/router'), require('primeng/ripple'), require('primeng/tooltip')) :
    typeof define === 'function' && define.amd ? define('primeng/megamenu', ['exports', '@angular/core', '@angular/common', 'primeng/api', '@angular/router', 'primeng/ripple', 'primeng/tooltip'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.megamenu = {}), global.ng.core, global.ng.common, global.primeng.api, global.ng.router, global.primeng.ripple, global.primeng.tooltip));
}(this, (function (exports, i0, i1, api, i4, i3, i2) { 'use strict';

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
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

    var MegaMenu = /** @class */ (function () {
        function MegaMenu(el, renderer, cd) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.orientation = 'horizontal';
            this.autoZIndex = true;
            this.baseZIndex = 0;
        }
        MegaMenu.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'start':
                        _this.startTemplate = item.template;
                        break;
                    case 'end':
                        _this.endTemplate = item.template;
                        break;
                }
            });
        };
        MegaMenu.prototype.onCategoryMouseEnter = function (event, menuitem) {
            if (menuitem.disabled) {
                event.preventDefault();
                return;
            }
            if (this.activeItem) {
                this.activeItem = menuitem;
            }
        };
        MegaMenu.prototype.onCategoryClick = function (event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }
            if (!item.url) {
                event.preventDefault();
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }
            if (item.items) {
                if (this.activeItem && this.activeItem === item) {
                    this.activeItem = null;
                    this.unbindDocumentClickListener();
                }
                else {
                    this.activeItem = item;
                    this.bindDocumentClickListener();
                }
            }
        };
        MegaMenu.prototype.itemClick = function (event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }
            if (!item.url) {
                event.preventDefault();
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }
            this.activeItem = null;
        };
        MegaMenu.prototype.getColumnClass = function (menuitem) {
            var length = menuitem.items ? menuitem.items.length : 0;
            var columnClass;
            switch (length) {
                case 2:
                    columnClass = 'p-megamenu-col-6';
                    break;
                case 3:
                    columnClass = 'p-megamenu-col-4';
                    break;
                case 4:
                    columnClass = 'p-megamenu-col-3';
                    break;
                case 6:
                    columnClass = 'p-megamenu-col-2';
                    break;
                default:
                    columnClass = 'p-megamenu-col-12';
                    break;
            }
            return columnClass;
        };
        MegaMenu.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                this.documentClickListener = function (event) {
                    if (_this.el && !_this.el.nativeElement.contains(event.target)) {
                        _this.activeItem = null;
                        _this.unbindDocumentClickListener();
                        _this.cd.markForCheck();
                    }
                };
                document.addEventListener('click', this.documentClickListener);
            }
        };
        MegaMenu.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        };
        return MegaMenu;
    }());
    MegaMenu.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MegaMenu, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    MegaMenu.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: MegaMenu, selector: "p-megaMenu", inputs: { model: "model", style: "style", styleClass: "styleClass", orientation: "orientation", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: api.PrimeTemplate }], ngImport: i0__namespace, template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\"\n            [ngClass]=\"{'p-megamenu p-component':true,'p-megamenu-horizontal': orientation == 'horizontal','p-megamenu-vertical': orientation == 'vertical'}\">\n            <div class=\"p-megamenu-start\" *ngIf=\"startTemplate\">\n                <ng-container *ngTemplateOutlet=\"startTemplate\"></ng-container>\n            </div>\n            <ul class=\"p-megamenu-root-list\" role=\"menubar\">\n                <ng-template ngFor let-category [ngForOf]=\"model\">\n                    <li *ngIf=\"category.separator\" class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': category.visible === false}\">\n                    <li *ngIf=\"!category.separator\" [ngClass]=\"{'p-menuitem':true,'p-menuitem-active':category==activeItem, 'p-hidden': category.visible === false}\" pTooltip [tooltipOptions]=\"category.tooltipOptions\"\n                        (mouseenter)=\"onCategoryMouseEnter($event, category)\">\n                        <a *ngIf=\"!category.routerLink\" [href]=\"category.url||'#'\" [attr.target]=\"category.target\" [attr.title]=\"category.title\" [attr.id]=\"category.id\" (click)=\"onCategoryClick($event, category)\" [attr.tabindex]=\"category.tabindex ? category.tabindex : '0'\"\n                            [ngClass]=\"{'p-menuitem-link':true,'p-disabled':category.disabled}\" [ngStyle]=\"category.style\" [class]=\"category.styleClass\" pRipple>\n                            <span class=\"p-menuitem-icon\" *ngIf=\"category.icon\" [ngClass]=\"category.icon\"></span>\n                            <span class=\"p-menuitem-text\" *ngIf=\"category.escape !== false; else categoryHtmlLabel\">{{category.label}}</span>\n                            <ng-template #categoryHtmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"category.label\"></span></ng-template>\n                            <span *ngIf=\"category.items\" class=\"p-submenu-icon pi\" [ngClass]=\"{'pi-angle-down':orientation=='horizontal','pi-angle-right':orientation=='vertical'}\"></span>\n                        </a>\n                        <a *ngIf=\"category.routerLink\" [routerLink]=\"category.routerLink\" [queryParams]=\"category.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"category.routerLinkActiveOptions||{exact:false}\" [attr.tabindex]=\"category.tabindex ? category.tabindex : '0'\"\n                            [attr.target]=\"category.target\" [attr.title]=\"category.title\" [attr.id]=\"category.id\"\n                            (click)=\"onCategoryClick($event, category)\" [ngClass]=\"{'p-menuitem-link':true,'p-disabled':category.disabled}\" [ngStyle]=\"category.style\" [class]=\"category.styleClass\"\n                            [fragment]=\"category.fragment\" [queryParamsHandling]=\"category.queryParamsHandling\" [preserveFragment]=\"category.preserveFragment\" [skipLocationChange]=\"category.skipLocationChange\" [replaceUrl]=\"category.replaceUrl\" [state]=\"category.state\" pRipple>\n                            <span class=\"p-menuitem-icon\" *ngIf=\"category.icon\" [ngClass]=\"category.icon\"></span>\n                            <span class=\"p-menuitem-text\" *ngIf=\"category.escape !== false; else categoryHtmlRouteLabel\">{{category.label}}</span>\n                            <ng-template #categoryHtmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"category.label\"></span></ng-template>\n                        </a>\n                        <div class=\"p-megamenu-panel\" *ngIf=\"category.items\">\n                            <div class=\"p-megamenu-grid\">\n                                <ng-template ngFor let-column [ngForOf]=\"category.items\">\n                                    <div [class]=\"getColumnClass(category)\">\n                                        <ng-template ngFor let-submenu [ngForOf]=\"column\">\n                                            <ul class=\"p-megamenu-submenu\" role=\"menu\">\n                                                <li class=\"p-megamenu-submenu-header\">\n                                                    <span *ngIf=\"submenu.escape !== false; else submenuHtmlLabel\">{{submenu.label}}</span>\n                                                    <ng-template #submenuHtmlLabel><span [innerHTML]=\"submenu.label\"></span></ng-template>\n                                                </li>\n                                                <ng-template ngFor let-item [ngForOf]=\"submenu.items\">\n                                                    <li *ngIf=\"item.separator\" class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': item.visible === false}\" role=\"separator\">\n                                                    <li *ngIf=\"!item.separator\" class=\"p-menuitem\" [ngClass]=\"{'p-hidden': item.visible === false}\" role=\"none\" pTooltip [tooltipOptions]=\"item.tooltipOptions\">\n                                                        <a *ngIf=\"!item.routerLink\" role=\"menuitem\" [href]=\"item.url||'#'\" class=\"p-menuitem-link\" [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\"\n                                                            [ngClass]=\"{'p-disabled':item.disabled}\" (click)=\"itemClick($event, item)\" pRipple>\n                                                            <span class=\"p-menuitem-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                                                            <span class=\"p-menuitem-text\" *ngIf=\"item.escape !== false; else htmlLabel\">{{item.label}}</span>\n                                                            <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                                                        </a>\n                                                        <a *ngIf=\"item.routerLink\" role=\"menuitem\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\"\n                                                            [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"p-menuitem-link\"\n                                                             [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\"\n                                                            [ngClass]=\"{'p-disabled':item.disabled}\" (click)=\"itemClick($event, item)\"\n                                                            [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\" pRipple>\n                                                            <span class=\"p-menuitem-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                                                            <span class=\"p-menuitem-text\" *ngIf=\"item.escape !== false; else htmlRouteLabel\">{{item.label}}</span>\n                                                            <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                                                        </a>\n                                                    </li>\n                                                </ng-template>\n                                            </ul>\n                                        </ng-template>\n                                    </div>\n                                </ng-template>\n                            </div>\n                        </div>\n                    </li>\n                </ng-template>\n                <div class=\"p-megamenu-end\" *ngIf=\"endTemplate; else legacy\">\n                    <ng-container *ngTemplateOutlet=\"endTemplate\"></ng-container>\n                </div>\n                <ng-template #legacy>\n                    <div class=\"p-megamenu-end\">\n                        <ng-content></ng-content>\n                    </div>\n                </ng-template>\n            </ul>\n        </div>\n    ", isInline: true, styles: [".p-megamenu-root-list{margin:0;padding:0;list-style:none}.p-megamenu-root-list>.p-menuitem{position:relative}.p-megamenu .p-menuitem-link{cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden;position:relative}.p-megamenu .p-menuitem-text{line-height:1}.p-megamenu-panel{display:none;position:absolute;width:auto;z-index:1}.p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{display:block}.p-megamenu-submenu{margin:0;padding:0;list-style:none}.p-megamenu-horizontal .p-megamenu-root-list{display:flex;align-items:center;flex-wrap:wrap}.p-megamenu-vertical .p-megamenu-root-list{flex-direction:column}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{left:100%;top:0}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem>.p-menuitem-link>.p-submenu-icon{margin-left:auto}.p-megamenu-grid{display:flex}.p-megamenu-col-2,.p-megamenu-col-3,.p-megamenu-col-4,.p-megamenu-col-6,.p-megamenu-col-12{flex:0 0 auto;padding:.5rem}.p-megamenu-col-2{width:16.6667%}.p-megamenu-col-3{width:25%}.p-megamenu-col-4{width:33.3333%}.p-megamenu-col-6{width:50%}.p-megamenu-col-12{width:100%}"], directives: [{ type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2__namespace.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i3__namespace.Ripple, selector: "[pRipple]" }, { type: i4__namespace.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i4__namespace.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MegaMenu, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-megaMenu',
                        template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\"\n            [ngClass]=\"{'p-megamenu p-component':true,'p-megamenu-horizontal': orientation == 'horizontal','p-megamenu-vertical': orientation == 'vertical'}\">\n            <div class=\"p-megamenu-start\" *ngIf=\"startTemplate\">\n                <ng-container *ngTemplateOutlet=\"startTemplate\"></ng-container>\n            </div>\n            <ul class=\"p-megamenu-root-list\" role=\"menubar\">\n                <ng-template ngFor let-category [ngForOf]=\"model\">\n                    <li *ngIf=\"category.separator\" class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': category.visible === false}\">\n                    <li *ngIf=\"!category.separator\" [ngClass]=\"{'p-menuitem':true,'p-menuitem-active':category==activeItem, 'p-hidden': category.visible === false}\" pTooltip [tooltipOptions]=\"category.tooltipOptions\"\n                        (mouseenter)=\"onCategoryMouseEnter($event, category)\">\n                        <a *ngIf=\"!category.routerLink\" [href]=\"category.url||'#'\" [attr.target]=\"category.target\" [attr.title]=\"category.title\" [attr.id]=\"category.id\" (click)=\"onCategoryClick($event, category)\" [attr.tabindex]=\"category.tabindex ? category.tabindex : '0'\"\n                            [ngClass]=\"{'p-menuitem-link':true,'p-disabled':category.disabled}\" [ngStyle]=\"category.style\" [class]=\"category.styleClass\" pRipple>\n                            <span class=\"p-menuitem-icon\" *ngIf=\"category.icon\" [ngClass]=\"category.icon\"></span>\n                            <span class=\"p-menuitem-text\" *ngIf=\"category.escape !== false; else categoryHtmlLabel\">{{category.label}}</span>\n                            <ng-template #categoryHtmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"category.label\"></span></ng-template>\n                            <span *ngIf=\"category.items\" class=\"p-submenu-icon pi\" [ngClass]=\"{'pi-angle-down':orientation=='horizontal','pi-angle-right':orientation=='vertical'}\"></span>\n                        </a>\n                        <a *ngIf=\"category.routerLink\" [routerLink]=\"category.routerLink\" [queryParams]=\"category.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"category.routerLinkActiveOptions||{exact:false}\" [attr.tabindex]=\"category.tabindex ? category.tabindex : '0'\"\n                            [attr.target]=\"category.target\" [attr.title]=\"category.title\" [attr.id]=\"category.id\"\n                            (click)=\"onCategoryClick($event, category)\" [ngClass]=\"{'p-menuitem-link':true,'p-disabled':category.disabled}\" [ngStyle]=\"category.style\" [class]=\"category.styleClass\"\n                            [fragment]=\"category.fragment\" [queryParamsHandling]=\"category.queryParamsHandling\" [preserveFragment]=\"category.preserveFragment\" [skipLocationChange]=\"category.skipLocationChange\" [replaceUrl]=\"category.replaceUrl\" [state]=\"category.state\" pRipple>\n                            <span class=\"p-menuitem-icon\" *ngIf=\"category.icon\" [ngClass]=\"category.icon\"></span>\n                            <span class=\"p-menuitem-text\" *ngIf=\"category.escape !== false; else categoryHtmlRouteLabel\">{{category.label}}</span>\n                            <ng-template #categoryHtmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"category.label\"></span></ng-template>\n                        </a>\n                        <div class=\"p-megamenu-panel\" *ngIf=\"category.items\">\n                            <div class=\"p-megamenu-grid\">\n                                <ng-template ngFor let-column [ngForOf]=\"category.items\">\n                                    <div [class]=\"getColumnClass(category)\">\n                                        <ng-template ngFor let-submenu [ngForOf]=\"column\">\n                                            <ul class=\"p-megamenu-submenu\" role=\"menu\">\n                                                <li class=\"p-megamenu-submenu-header\">\n                                                    <span *ngIf=\"submenu.escape !== false; else submenuHtmlLabel\">{{submenu.label}}</span>\n                                                    <ng-template #submenuHtmlLabel><span [innerHTML]=\"submenu.label\"></span></ng-template>\n                                                </li>\n                                                <ng-template ngFor let-item [ngForOf]=\"submenu.items\">\n                                                    <li *ngIf=\"item.separator\" class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': item.visible === false}\" role=\"separator\">\n                                                    <li *ngIf=\"!item.separator\" class=\"p-menuitem\" [ngClass]=\"{'p-hidden': item.visible === false}\" role=\"none\" pTooltip [tooltipOptions]=\"item.tooltipOptions\">\n                                                        <a *ngIf=\"!item.routerLink\" role=\"menuitem\" [href]=\"item.url||'#'\" class=\"p-menuitem-link\" [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\"\n                                                            [ngClass]=\"{'p-disabled':item.disabled}\" (click)=\"itemClick($event, item)\" pRipple>\n                                                            <span class=\"p-menuitem-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                                                            <span class=\"p-menuitem-text\" *ngIf=\"item.escape !== false; else htmlLabel\">{{item.label}}</span>\n                                                            <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                                                        </a>\n                                                        <a *ngIf=\"item.routerLink\" role=\"menuitem\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\"\n                                                            [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"p-menuitem-link\"\n                                                             [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\"\n                                                            [ngClass]=\"{'p-disabled':item.disabled}\" (click)=\"itemClick($event, item)\"\n                                                            [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\" pRipple>\n                                                            <span class=\"p-menuitem-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                                                            <span class=\"p-menuitem-text\" *ngIf=\"item.escape !== false; else htmlRouteLabel\">{{item.label}}</span>\n                                                            <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                                                        </a>\n                                                    </li>\n                                                </ng-template>\n                                            </ul>\n                                        </ng-template>\n                                    </div>\n                                </ng-template>\n                            </div>\n                        </div>\n                    </li>\n                </ng-template>\n                <div class=\"p-megamenu-end\" *ngIf=\"endTemplate; else legacy\">\n                    <ng-container *ngTemplateOutlet=\"endTemplate\"></ng-container>\n                </div>\n                <ng-template #legacy>\n                    <div class=\"p-megamenu-end\">\n                        <ng-content></ng-content>\n                    </div>\n                </ng-template>\n            </ul>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./megamenu.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { model: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], orientation: [{
                    type: i0.Input
                }], autoZIndex: [{
                    type: i0.Input
                }], baseZIndex: [{
                    type: i0.Input
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }] } });
    var MegaMenuModule = /** @class */ (function () {
        function MegaMenuModule() {
        }
        return MegaMenuModule;
    }());
    MegaMenuModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MegaMenuModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    MegaMenuModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MegaMenuModule, declarations: [MegaMenu], imports: [i1.CommonModule, i4.RouterModule, i3.RippleModule, i2.TooltipModule], exports: [MegaMenu, i4.RouterModule, i2.TooltipModule] });
    MegaMenuModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MegaMenuModule, imports: [[i1.CommonModule, i4.RouterModule, i3.RippleModule, i2.TooltipModule], i4.RouterModule, i2.TooltipModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MegaMenuModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i4.RouterModule, i3.RippleModule, i2.TooltipModule],
                        exports: [MegaMenu, i4.RouterModule, i2.TooltipModule],
                        declarations: [MegaMenu]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MegaMenu = MegaMenu;
    exports.MegaMenuModule = MegaMenuModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-megamenu.umd.js.map
