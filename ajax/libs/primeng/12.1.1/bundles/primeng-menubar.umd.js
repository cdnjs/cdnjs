(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/utils'), require('primeng/api'), require('@angular/router'), require('primeng/ripple'), require('primeng/tooltip')) :
    typeof define === 'function' && define.amd ? define('primeng/menubar', ['exports', '@angular/core', '@angular/common', 'primeng/utils', 'primeng/api', '@angular/router', 'primeng/ripple', 'primeng/tooltip'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.menubar = {}), global.ng.core, global.ng.common, global.primeng.utils, global.primeng.api, global.ng.router, global.primeng.ripple, global.primeng.tooltip));
}(this, (function (exports, i0, i1, utils, i5, i4, i3, i2) { 'use strict';

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
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

    var MenubarSub = /** @class */ (function () {
        function MenubarSub(el, renderer, cd) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.leafClick = new i0.EventEmitter();
            this.menuHoverActive = false;
        }
        Object.defineProperty(MenubarSub.prototype, "parentActive", {
            get: function () {
                return this._parentActive;
            },
            set: function (value) {
                if (!this.root) {
                    this._parentActive = value;
                    if (!value)
                        this.activeItem = null;
                }
            },
            enumerable: false,
            configurable: true
        });
        MenubarSub.prototype.onItemClick = function (event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }
            if (!item.url && !item.routerLink) {
                event.preventDefault();
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }
            if (item.items) {
                if (this.activeItem && item === this.activeItem) {
                    this.activeItem = null;
                    this.unbindDocumentClickListener();
                }
                else {
                    this.activeItem = item;
                    if (this.root) {
                        this.bindDocumentClickListener();
                    }
                }
            }
            if (!item.items) {
                this.onLeafClick();
            }
        };
        MenubarSub.prototype.onItemMouseEnter = function (event, item) {
            if (item.disabled || this.mobileActive) {
                event.preventDefault();
                return;
            }
            if (this.root) {
                if (this.activeItem || this.autoDisplay) {
                    this.activeItem = item;
                    this.bindDocumentClickListener();
                }
            }
            else {
                this.activeItem = item;
                this.bindDocumentClickListener();
            }
        };
        MenubarSub.prototype.onLeafClick = function () {
            this.activeItem = null;
            if (this.root) {
                this.unbindDocumentClickListener();
            }
            this.leafClick.emit();
        };
        MenubarSub.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                this.documentClickListener = function (event) {
                    if (_this.el && !_this.el.nativeElement.contains(event.target)) {
                        _this.activeItem = null;
                        _this.cd.markForCheck();
                        _this.unbindDocumentClickListener();
                    }
                };
                document.addEventListener('click', this.documentClickListener);
            }
        };
        MenubarSub.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        };
        MenubarSub.prototype.ngOnDestroy = function () {
            this.unbindDocumentClickListener();
        };
        return MenubarSub;
    }());
    MenubarSub.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MenubarSub, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    MenubarSub.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: MenubarSub, selector: "p-menubarSub", inputs: { item: "item", root: "root", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", mobileActive: "mobileActive", autoDisplay: "autoDisplay", parentActive: "parentActive" }, outputs: { leafClick: "leafClick" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <ul [ngClass]=\"{'p-submenu-list': !root, 'p-menubar-root-list': root}\" [attr.role]=\"root ? 'menubar' : 'menu'\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': child.visible === false}\" role=\"separator\">\n                <li *ngIf=\"!child.separator\" #listItem [ngClass]=\"{'p-menuitem':true, 'p-menuitem-active': child === activeItem, 'p-hidden': child.visible === false}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\" role=\"none\" pTooltip [tooltipOptions]=\"child.tooltipOptions\">\n                    <a *ngIf=\"!child.routerLink\" [attr.href]=\"child.url\" [attr.data-automationid]=\"child.automationId\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" role=\"menuitem\"\n                        (click)=\"onItemClick($event, child)\" (mouseenter)=\"onItemMouseEnter($event,child)\"\n                         [ngClass]=\"{'p-menuitem-link':true,'p-disabled':child.disabled}\" [attr.tabindex]=\"child.disabled ? null : '0'\" [attr.aria-haspopup]=\"item.items != null\" [attr.aria-expanded]=\"item === activeItem\" pRipple>\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\" *ngIf=\"child.escape !== false; else htmlLabel\">{{child.label}}</span>\n                        <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"child.label\"></span></ng-template>\n                        <span class=\"p-submenu-icon pi\" *ngIf=\"child.items\" [ngClass]=\"{'pi-angle-down':root,'pi-angle-right':!root}\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [attr.data-automationid]=\"child.automationId\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\"\n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.disabled ? null : '0'\" role=\"menuitem\"\n                        (click)=\"onItemClick($event, child)\" (mouseenter)=\"onItemMouseEnter($event,child)\"\n                        [ngClass]=\"{'p-menuitem-link':true,'p-disabled':child.disabled}\"\n                        [fragment]=\"child.fragment\" [queryParamsHandling]=\"child.queryParamsHandling\" [preserveFragment]=\"child.preserveFragment\" [skipLocationChange]=\"child.skipLocationChange\" [replaceUrl]=\"child.replaceUrl\" [state]=\"child.state\" pRipple>\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\" *ngIf=\"child.escape !== false; else htmlRouteLabel\">{{child.label}}</span>\n                        <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"child.label\"></span></ng-template>\n                        <span class=\"p-submenu-icon pi\" *ngIf=\"child.items\" [ngClass]=\"{'pi-angle-down':root,'pi-angle-right':!root}\"></span>\n                    </a>\n                    <p-menubarSub [parentActive]=\"child === activeItem\" [item]=\"child\" *ngIf=\"child.items\" [mobileActive]=\"mobileActive\" [autoDisplay]=\"autoDisplay\" (leafClick)=\"onLeafClick()\"></p-menubarSub>\n                </li>\n            </ng-template>\n        </ul>\n    ", isInline: true, components: [{ type: MenubarSub, selector: "p-menubarSub", inputs: ["item", "root", "autoZIndex", "baseZIndex", "mobileActive", "autoDisplay", "parentActive"], outputs: ["leafClick"] }], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3__namespace.Ripple, selector: "[pRipple]" }, { type: i4__namespace.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i4__namespace.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }], encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MenubarSub, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-menubarSub',
                        template: "\n        <ul [ngClass]=\"{'p-submenu-list': !root, 'p-menubar-root-list': root}\" [attr.role]=\"root ? 'menubar' : 'menu'\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': child.visible === false}\" role=\"separator\">\n                <li *ngIf=\"!child.separator\" #listItem [ngClass]=\"{'p-menuitem':true, 'p-menuitem-active': child === activeItem, 'p-hidden': child.visible === false}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\" role=\"none\" pTooltip [tooltipOptions]=\"child.tooltipOptions\">\n                    <a *ngIf=\"!child.routerLink\" [attr.href]=\"child.url\" [attr.data-automationid]=\"child.automationId\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" role=\"menuitem\"\n                        (click)=\"onItemClick($event, child)\" (mouseenter)=\"onItemMouseEnter($event,child)\"\n                         [ngClass]=\"{'p-menuitem-link':true,'p-disabled':child.disabled}\" [attr.tabindex]=\"child.disabled ? null : '0'\" [attr.aria-haspopup]=\"item.items != null\" [attr.aria-expanded]=\"item === activeItem\" pRipple>\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\" *ngIf=\"child.escape !== false; else htmlLabel\">{{child.label}}</span>\n                        <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"child.label\"></span></ng-template>\n                        <span class=\"p-submenu-icon pi\" *ngIf=\"child.items\" [ngClass]=\"{'pi-angle-down':root,'pi-angle-right':!root}\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [attr.data-automationid]=\"child.automationId\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\"\n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.disabled ? null : '0'\" role=\"menuitem\"\n                        (click)=\"onItemClick($event, child)\" (mouseenter)=\"onItemMouseEnter($event,child)\"\n                        [ngClass]=\"{'p-menuitem-link':true,'p-disabled':child.disabled}\"\n                        [fragment]=\"child.fragment\" [queryParamsHandling]=\"child.queryParamsHandling\" [preserveFragment]=\"child.preserveFragment\" [skipLocationChange]=\"child.skipLocationChange\" [replaceUrl]=\"child.replaceUrl\" [state]=\"child.state\" pRipple>\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\" *ngIf=\"child.escape !== false; else htmlRouteLabel\">{{child.label}}</span>\n                        <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"child.label\"></span></ng-template>\n                        <span class=\"p-submenu-icon pi\" *ngIf=\"child.items\" [ngClass]=\"{'pi-angle-down':root,'pi-angle-right':!root}\"></span>\n                    </a>\n                    <p-menubarSub [parentActive]=\"child === activeItem\" [item]=\"child\" *ngIf=\"child.items\" [mobileActive]=\"mobileActive\" [autoDisplay]=\"autoDisplay\" (leafClick)=\"onLeafClick()\"></p-menubarSub>\n                </li>\n            </ng-template>\n        </ul>\n    ",
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { item: [{
                    type: i0.Input
                }], root: [{
                    type: i0.Input
                }], autoZIndex: [{
                    type: i0.Input
                }], baseZIndex: [{
                    type: i0.Input
                }], mobileActive: [{
                    type: i0.Input
                }], autoDisplay: [{
                    type: i0.Input
                }], parentActive: [{
                    type: i0.Input
                }], leafClick: [{
                    type: i0.Output
                }] } });
    var Menubar = /** @class */ (function () {
        function Menubar(el, renderer, cd, config) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.config = config;
            this.autoZIndex = true;
            this.baseZIndex = 0;
        }
        Menubar.prototype.ngAfterContentInit = function () {
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
        Menubar.prototype.toggle = function (event) {
            if (this.mobileActive) {
                this.hide();
                utils.ZIndexUtils.clear(this.rootmenu.el.nativeElement);
            }
            else {
                this.mobileActive = true;
                utils.ZIndexUtils.set('menu', this.rootmenu.el.nativeElement, this.config.zIndex.menu);
            }
            this.bindOutsideClickListener();
            event.preventDefault();
        };
        Menubar.prototype.bindOutsideClickListener = function () {
            var _this = this;
            if (!this.outsideClickListener) {
                this.outsideClickListener = function (event) {
                    if (_this.mobileActive && _this.rootmenu.el.nativeElement !== event.target && !_this.rootmenu.el.nativeElement.contains(event.target)
                        && _this.menubutton.nativeElement !== event.target && !_this.menubutton.nativeElement.contains(event.target)) {
                        _this.hide();
                    }
                };
                document.addEventListener('click', this.outsideClickListener);
            }
        };
        Menubar.prototype.hide = function () {
            this.mobileActive = false;
            this.cd.markForCheck();
            utils.ZIndexUtils.clear(this.rootmenu.el.nativeElement);
            this.unbindOutsideClickListener();
        };
        Menubar.prototype.onLeafClick = function () {
            this.hide();
        };
        Menubar.prototype.unbindOutsideClickListener = function () {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        };
        Menubar.prototype.ngOnDestroy = function () {
            this.unbindOutsideClickListener();
        };
        return Menubar;
    }());
    Menubar.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Menubar, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ChangeDetectorRef }, { token: i5__namespace.PrimeNGConfig }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Menubar.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Menubar, selector: "p-menubar", inputs: { model: "model", style: "style", styleClass: "styleClass", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", autoDisplay: "autoDisplay" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: i5.PrimeTemplate }], viewQueries: [{ propertyName: "menubutton", first: true, predicate: ["menubutton"], descendants: true }, { propertyName: "rootmenu", first: true, predicate: ["rootmenu"], descendants: true }], ngImport: i0__namespace, template: "\n        <div [ngClass]=\"{'p-menubar p-component':true, 'p-menubar-mobile-active': mobileActive}\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <div class=\"p-menubar-start\" *ngIf=\"startTemplate\">\n                <ng-container *ngTemplateOutlet=\"startTemplate\"></ng-container>\n            </div>\n            <a #menubutton tabindex=\"0\" class=\"p-menubar-button\" (click)=\"toggle($event)\">\n                <i class=\"pi pi-bars\"></i>\n            </a>\n            <p-menubarSub #rootmenu [item]=\"model\" root=\"root\" [baseZIndex]=\"baseZIndex\" (leafClick)=\"onLeafClick()\" [autoZIndex]=\"autoZIndex\" [mobileActive]=\"mobileActive\" [autoDisplay]=\"autoDisplay\"></p-menubarSub>\n            <div class=\"p-menubar-end\" *ngIf=\"endTemplate; else legacy\">\n                <ng-container *ngTemplateOutlet=\"endTemplate\"></ng-container>\n            </div>\n            <ng-template #legacy>\n                <div class=\"p-menubar-end\">\n                    <ng-content></ng-content>\n                </div>\n            </ng-template>\n        </div>\n    ", isInline: true, styles: [".p-menubar{display:flex;align-items:center}.p-menubar ul{margin:0;padding:0;list-style:none}.p-menubar .p-menuitem-link{cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden;position:relative}.p-menubar .p-menuitem-text{line-height:1}.p-menubar .p-menuitem{position:relative}.p-menubar-root-list{display:flex;align-items:center}.p-menubar-root-list>li ul{display:none;z-index:1}.p-menubar-root-list>.p-menuitem-active>p-menubarsub>.p-submenu-list{display:block}.p-menubar .p-submenu-list{display:none;position:absolute;z-index:1}.p-menubar .p-submenu-list>.p-menuitem-active>p-menubarsub>.p-submenu-list{display:block;left:100%;top:0}.p-menubar .p-submenu-list .p-menuitem-link .p-submenu-icon{margin-left:auto}.p-menubar .p-menubar-custom,.p-menubar .p-menubar-end{margin-left:auto;align-self:center}.p-menubar-button{display:none;cursor:pointer;align-items:center;justify-content:center}"], components: [{ type: MenubarSub, selector: "p-menubarSub", inputs: ["item", "root", "autoZIndex", "baseZIndex", "mobileActive", "autoDisplay", "parentActive"], outputs: ["leafClick"] }], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Menubar, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-menubar',
                        template: "\n        <div [ngClass]=\"{'p-menubar p-component':true, 'p-menubar-mobile-active': mobileActive}\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <div class=\"p-menubar-start\" *ngIf=\"startTemplate\">\n                <ng-container *ngTemplateOutlet=\"startTemplate\"></ng-container>\n            </div>\n            <a #menubutton tabindex=\"0\" class=\"p-menubar-button\" (click)=\"toggle($event)\">\n                <i class=\"pi pi-bars\"></i>\n            </a>\n            <p-menubarSub #rootmenu [item]=\"model\" root=\"root\" [baseZIndex]=\"baseZIndex\" (leafClick)=\"onLeafClick()\" [autoZIndex]=\"autoZIndex\" [mobileActive]=\"mobileActive\" [autoDisplay]=\"autoDisplay\"></p-menubarSub>\n            <div class=\"p-menubar-end\" *ngIf=\"endTemplate; else legacy\">\n                <ng-container *ngTemplateOutlet=\"endTemplate\"></ng-container>\n            </div>\n            <ng-template #legacy>\n                <div class=\"p-menubar-end\">\n                    <ng-content></ng-content>\n                </div>\n            </ng-template>\n        </div>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./menubar.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ChangeDetectorRef }, { type: i5__namespace.PrimeNGConfig }]; }, propDecorators: { model: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], autoZIndex: [{
                    type: i0.Input
                }], baseZIndex: [{
                    type: i0.Input
                }], autoDisplay: [{
                    type: i0.Input
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [i5.PrimeTemplate]
                }], menubutton: [{
                    type: i0.ViewChild,
                    args: ['menubutton']
                }], rootmenu: [{
                    type: i0.ViewChild,
                    args: ['rootmenu']
                }] } });
    var MenubarModule = /** @class */ (function () {
        function MenubarModule() {
        }
        return MenubarModule;
    }());
    MenubarModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MenubarModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    MenubarModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MenubarModule, declarations: [Menubar, MenubarSub], imports: [i1.CommonModule, i4.RouterModule, i3.RippleModule, i2.TooltipModule], exports: [Menubar, i4.RouterModule, i2.TooltipModule] });
    MenubarModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MenubarModule, imports: [[i1.CommonModule, i4.RouterModule, i3.RippleModule, i2.TooltipModule], i4.RouterModule, i2.TooltipModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: MenubarModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i4.RouterModule, i3.RippleModule, i2.TooltipModule],
                        exports: [Menubar, i4.RouterModule, i2.TooltipModule],
                        declarations: [Menubar, MenubarSub]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Menubar = Menubar;
    exports.MenubarModule = MenubarModule;
    exports.MenubarSub = MenubarSub;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-menubar.umd.js.map
