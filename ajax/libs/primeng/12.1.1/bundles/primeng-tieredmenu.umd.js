(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('@angular/router'), require('primeng/ripple'), require('@angular/animations'), require('primeng/utils'), require('primeng/tooltip'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/tieredmenu', ['exports', '@angular/core', '@angular/common', 'primeng/dom', '@angular/router', 'primeng/ripple', '@angular/animations', 'primeng/utils', 'primeng/tooltip', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.tieredmenu = {}), global.ng.core, global.ng.common, global.primeng.dom, global.ng.router, global.primeng.ripple, global.ng.animations, global.primeng.utils, global.primeng.tooltip, global.primeng.api));
}(this, (function (exports, i0, i1, dom, i4, i3, animations, utils, i2, i5) { 'use strict';

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
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);

    var TieredMenuSub = /** @class */ (function () {
        function TieredMenuSub(el, renderer, cd) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.leafClick = new i0.EventEmitter();
            this.keydownItem = new i0.EventEmitter();
            this.menuHoverActive = false;
        }
        Object.defineProperty(TieredMenuSub.prototype, "parentActive", {
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
        TieredMenuSub.prototype.onItemClick = function (event, item) {
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
        TieredMenuSub.prototype.onItemMouseEnter = function (event, item) {
            if (item.disabled || this.mobileActive) {
                event.preventDefault();
                return;
            }
            if (this.root) {
                if (this.activeItem || this.autoDisplay || this.popup) {
                    this.activeItem = item;
                    this.bindDocumentClickListener();
                }
            }
            else {
                this.activeItem = item;
                this.bindDocumentClickListener();
            }
        };
        TieredMenuSub.prototype.onLeafClick = function () {
            this.activeItem = null;
            if (this.root) {
                this.unbindDocumentClickListener();
            }
            this.leafClick.emit();
        };
        TieredMenuSub.prototype.onItemKeyDown = function (event, item) {
            var listItem = event.currentTarget.parentElement;
            switch (event.key) {
                case 'ArrowDown':
                    var nextItem = this.findNextItem(listItem);
                    if (nextItem) {
                        nextItem.children[0].focus();
                    }
                    event.preventDefault();
                    break;
                case 'ArrowUp':
                    var prevItem = this.findPrevItem(listItem);
                    if (prevItem) {
                        prevItem.children[0].focus();
                    }
                    event.preventDefault();
                    break;
                case 'ArrowRight':
                    if (item.items) {
                        this.activeItem = item;
                        if (this.root) {
                            this.bindDocumentClickListener();
                        }
                        setTimeout(function () {
                            listItem.children[1].children[0].children[0].children[0].focus();
                        }, 50);
                    }
                    event.preventDefault();
                    break;
                default:
                    break;
            }
            this.keydownItem.emit({
                originalEvent: event,
                element: listItem
            });
        };
        TieredMenuSub.prototype.findNextItem = function (item) {
            var nextItem = item.nextElementSibling;
            if (nextItem)
                return dom.DomHandler.hasClass(nextItem, 'p-disabled') || !dom.DomHandler.hasClass(nextItem, 'p-menuitem') ? this.findNextItem(nextItem) : nextItem;
            else
                return null;
        };
        TieredMenuSub.prototype.findPrevItem = function (item) {
            var prevItem = item.previousElementSibling;
            if (prevItem)
                return dom.DomHandler.hasClass(prevItem, 'p-disabled') || !dom.DomHandler.hasClass(prevItem, 'p-menuitem') ? this.findPrevItem(prevItem) : prevItem;
            else
                return null;
        };
        TieredMenuSub.prototype.onChildItemKeyDown = function (event) {
            if (event.originalEvent.key === 'ArrowLeft') {
                this.activeItem = null;
                if (this.root) {
                    this.unbindDocumentClickListener();
                }
                event.element.parentElement.parentElement.parentElement.children[0].focus();
            }
        };
        TieredMenuSub.prototype.bindDocumentClickListener = function () {
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
        TieredMenuSub.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        };
        TieredMenuSub.prototype.ngOnDestroy = function () {
            this.unbindDocumentClickListener();
        };
        return TieredMenuSub;
    }());
    TieredMenuSub.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TieredMenuSub, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    TieredMenuSub.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TieredMenuSub, selector: "p-tieredMenuSub", inputs: { item: "item", root: "root", autoDisplay: "autoDisplay", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", mobileActive: "mobileActive", popup: "popup", parentActive: "parentActive" }, outputs: { leafClick: "leafClick", keydownItem: "keydownItem" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <ul [ngClass]=\"{'p-submenu-list': !root}\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': child.visible === false}\">\n                <li *ngIf=\"!child.separator\" #listItem [ngClass]=\"{'p-menuitem':true, 'p-menuitem-active': child === activeItem, 'p-hidden': child.visible === false}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\" pTooltip [tooltipOptions]=\"child.tooltipOptions\">\n                    <a *ngIf=\"!child.routerLink\" (keydown)=\"onItemKeyDown($event, child)\" [attr.href]=\"child.url\" [attr.data-automationid]=\"child.automationId\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                         (click)=\"onItemClick($event, child)\" (mouseenter)=\"onItemMouseEnter($event,child)\"\n                         [ngClass]=\"{'p-menuitem-link':true,'p-disabled':child.disabled}\"\n                         [attr.tabindex]=\"child.disabled ? null : '0'\" [attr.aria-haspopup]=\"item.items != null\" [attr.aria-expanded]=\"item === activeItem\" pRipple>\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\" *ngIf=\"child.escape !== false; else htmlLabel\">{{child.label}}</span>\n                        <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"child.label\"></span></ng-template>\n                        <span class=\"p-submenu-icon pi pi-angle-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" (keydown)=\"onItemKeyDown($event, child)\" [routerLink]=\"child.routerLink\" [attr.data-automationid]=\"child.automationId\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\"\n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.disabled ? null : '0'\" role=\"menuitem\"\n                        (click)=\"onItemClick($event, child)\" (mouseenter)=\"onItemMouseEnter($event,child)\"  [ngClass]=\"{'p-menuitem-link':true,'p-disabled':child.disabled}\"\n                        [fragment]=\"child.fragment\" [queryParamsHandling]=\"child.queryParamsHandling\" [preserveFragment]=\"child.preserveFragment\" [skipLocationChange]=\"child.skipLocationChange\" [replaceUrl]=\"child.replaceUrl\" [state]=\"child.state\" pRipple>\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\" *ngIf=\"child.escape !== false; else htmlRouteLabel\">{{child.label}}</span>\n                        <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"child.label\"></span></ng-template>\n                        <span class=\"p-submenu-icon pi pi-angle-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <p-tieredMenuSub (keydownItem)=\"onChildItemKeyDown($event)\" [parentActive]=\"child === activeItem\" [item]=\"child\" *ngIf=\"child.items\" [mobileActive]=\"mobileActive\" [autoDisplay]=\"autoDisplay\" (leafClick)=\"onLeafClick()\" [popup]=\"popup\"></p-tieredMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    ", isInline: true, components: [{ type: TieredMenuSub, selector: "p-tieredMenuSub", inputs: ["item", "root", "autoDisplay", "autoZIndex", "baseZIndex", "mobileActive", "popup", "parentActive"], outputs: ["leafClick", "keydownItem"] }], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3__namespace.Ripple, selector: "[pRipple]" }, { type: i4__namespace.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i4__namespace.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }], encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TieredMenuSub, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-tieredMenuSub',
                        template: "\n        <ul [ngClass]=\"{'p-submenu-list': !root}\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': child.visible === false}\">\n                <li *ngIf=\"!child.separator\" #listItem [ngClass]=\"{'p-menuitem':true, 'p-menuitem-active': child === activeItem, 'p-hidden': child.visible === false}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\" pTooltip [tooltipOptions]=\"child.tooltipOptions\">\n                    <a *ngIf=\"!child.routerLink\" (keydown)=\"onItemKeyDown($event, child)\" [attr.href]=\"child.url\" [attr.data-automationid]=\"child.automationId\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                         (click)=\"onItemClick($event, child)\" (mouseenter)=\"onItemMouseEnter($event,child)\"\n                         [ngClass]=\"{'p-menuitem-link':true,'p-disabled':child.disabled}\"\n                         [attr.tabindex]=\"child.disabled ? null : '0'\" [attr.aria-haspopup]=\"item.items != null\" [attr.aria-expanded]=\"item === activeItem\" pRipple>\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\" *ngIf=\"child.escape !== false; else htmlLabel\">{{child.label}}</span>\n                        <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"child.label\"></span></ng-template>\n                        <span class=\"p-submenu-icon pi pi-angle-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" (keydown)=\"onItemKeyDown($event, child)\" [routerLink]=\"child.routerLink\" [attr.data-automationid]=\"child.automationId\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\"\n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.disabled ? null : '0'\" role=\"menuitem\"\n                        (click)=\"onItemClick($event, child)\" (mouseenter)=\"onItemMouseEnter($event,child)\"  [ngClass]=\"{'p-menuitem-link':true,'p-disabled':child.disabled}\"\n                        [fragment]=\"child.fragment\" [queryParamsHandling]=\"child.queryParamsHandling\" [preserveFragment]=\"child.preserveFragment\" [skipLocationChange]=\"child.skipLocationChange\" [replaceUrl]=\"child.replaceUrl\" [state]=\"child.state\" pRipple>\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\" *ngIf=\"child.escape !== false; else htmlRouteLabel\">{{child.label}}</span>\n                        <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"child.label\"></span></ng-template>\n                        <span class=\"p-submenu-icon pi pi-angle-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <p-tieredMenuSub (keydownItem)=\"onChildItemKeyDown($event)\" [parentActive]=\"child === activeItem\" [item]=\"child\" *ngIf=\"child.items\" [mobileActive]=\"mobileActive\" [autoDisplay]=\"autoDisplay\" (leafClick)=\"onLeafClick()\" [popup]=\"popup\"></p-tieredMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    ",
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { item: [{
                    type: i0.Input
                }], root: [{
                    type: i0.Input
                }], autoDisplay: [{
                    type: i0.Input
                }], autoZIndex: [{
                    type: i0.Input
                }], baseZIndex: [{
                    type: i0.Input
                }], mobileActive: [{
                    type: i0.Input
                }], popup: [{
                    type: i0.Input
                }], parentActive: [{
                    type: i0.Input
                }], leafClick: [{
                    type: i0.Output
                }], keydownItem: [{
                    type: i0.Output
                }] } });
    var TieredMenu = /** @class */ (function () {
        function TieredMenu(el, renderer, cd, config, overlayService) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.config = config;
            this.overlayService = overlayService;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
        }
        TieredMenu.prototype.toggle = function (event) {
            if (this.visible)
                this.hide();
            else
                this.show(event);
            this.preventDocumentDefault = true;
        };
        TieredMenu.prototype.show = function (event) {
            this.target = event.currentTarget;
            this.visible = true;
            this.parentActive = true;
            this.preventDocumentDefault = true;
            this.cd.markForCheck();
        };
        TieredMenu.prototype.onOverlayClick = function (event) {
            if (this.popup) {
                this.overlayService.add({
                    originalEvent: event,
                    target: this.el.nativeElement
                });
            }
            this.preventDocumentDefault = true;
        };
        TieredMenu.prototype.onOverlayAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    if (this.popup) {
                        this.container = event.element;
                        this.moveOnTop();
                        this.appendOverlay();
                        dom.DomHandler.absolutePosition(this.container, this.target);
                        this.bindDocumentClickListener();
                        this.bindDocumentResizeListener();
                        this.bindScrollListener();
                    }
                    break;
                case 'void':
                    this.onOverlayHide();
                    break;
            }
        };
        TieredMenu.prototype.onOverlayAnimationEnd = function (event) {
            switch (event.toState) {
                case 'void':
                    utils.ZIndexUtils.clear(event.element);
                    break;
            }
        };
        TieredMenu.prototype.appendOverlay = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.container);
                else
                    dom.DomHandler.appendChild(this.container, this.appendTo);
            }
        };
        TieredMenu.prototype.restoreOverlayAppend = function () {
            if (this.container && this.appendTo) {
                this.el.nativeElement.appendChild(this.container);
            }
        };
        TieredMenu.prototype.moveOnTop = function () {
            if (this.autoZIndex) {
                utils.ZIndexUtils.set('menu', this.container, this.baseZIndex + this.config.zIndex.menu);
            }
        };
        TieredMenu.prototype.hide = function () {
            this.visible = false;
            this.parentActive = false;
            this.cd.markForCheck();
        };
        TieredMenu.prototype.onWindowResize = function () {
            this.hide();
        };
        TieredMenu.prototype.onLeafClick = function () {
            if (this.popup) {
                this.hide();
            }
            this.unbindDocumentClickListener();
        };
        TieredMenu.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentClickListener = this.renderer.listen(documentTarget, 'click', function () {
                    if (!_this.preventDocumentDefault && _this.popup) {
                        _this.hide();
                    }
                    _this.preventDocumentDefault = false;
                });
            }
        };
        TieredMenu.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        TieredMenu.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        TieredMenu.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        TieredMenu.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.target, function () {
                    if (_this.visible) {
                        _this.hide();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        TieredMenu.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        TieredMenu.prototype.onOverlayHide = function () {
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
            this.unbindScrollListener();
            this.preventDocumentDefault = false;
            this.target = null;
        };
        TieredMenu.prototype.ngOnDestroy = function () {
            if (this.popup) {
                if (this.scrollHandler) {
                    this.scrollHandler.destroy();
                    this.scrollHandler = null;
                }
                if (this.container && this.autoZIndex) {
                    utils.ZIndexUtils.clear(this.container);
                }
                this.restoreOverlayAppend();
                this.onOverlayHide();
            }
        };
        return TieredMenu;
    }());
    TieredMenu.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TieredMenu, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ChangeDetectorRef }, { token: i5__namespace.PrimeNGConfig }, { token: i5__namespace.OverlayService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    TieredMenu.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TieredMenu, selector: "p-tieredMenu", inputs: { model: "model", popup: "popup", style: "style", styleClass: "styleClass", appendTo: "appendTo", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", autoDisplay: "autoDisplay", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <div [ngClass]=\"{'p-tieredmenu p-component':true, 'p-tieredmenu-overlay':popup}\" [class]=\"styleClass\" [ngStyle]=\"style\" (click)=\"onOverlayClick($event)\"\n            [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"popup !== true\"\n            (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationEnd($event)\" *ngIf=\"!popup || visible\">\n            <p-tieredMenuSub [item]=\"model\" root=\"root\" [parentActive]=\"parentActive\" [baseZIndex]=\"baseZIndex\" [autoZIndex]=\"autoZIndex\" (leafClick)=\"onLeafClick()\"\n                [autoDisplay]=\"autoDisplay\" [popup]=\"popup\"></p-tieredMenuSub>\n        </div>\n    ", isInline: true, styles: [".p-tieredmenu-overlay{position:absolute;top:0;left:0}.p-tieredmenu ul{margin:0;padding:0;list-style:none}.p-tieredmenu .p-submenu-list{position:absolute;min-width:100%;z-index:1;display:none}.p-tieredmenu .p-menuitem-link{cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden;position:relative}.p-tieredmenu .p-menuitem-text{line-height:1}.p-tieredmenu .p-menuitem{position:relative}.p-tieredmenu .p-menuitem-link .p-submenu-icon{margin-left:auto}.p-tieredmenu .p-menuitem-active>p-tieredmenusub>.p-submenu-list{display:block;left:100%;top:0}"], components: [{ type: TieredMenuSub, selector: "p-tieredMenuSub", inputs: ["item", "root", "autoDisplay", "autoZIndex", "baseZIndex", "mobileActive", "popup", "parentActive"], outputs: ["leafClick", "keydownItem"] }], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
            animations.trigger('overlayAnimation', [
                animations.transition(':enter', [
                    animations.style({ opacity: 0, transform: 'scaleY(0.8)' }),
                    animations.animate('{{showTransitionParams}}')
                ]),
                animations.transition(':leave', [
                    animations.animate('{{hideTransitionParams}}', animations.style({ opacity: 0 }))
                ])
            ])
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TieredMenu, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-tieredMenu',
                        template: "\n        <div [ngClass]=\"{'p-tieredmenu p-component':true, 'p-tieredmenu-overlay':popup}\" [class]=\"styleClass\" [ngStyle]=\"style\" (click)=\"onOverlayClick($event)\"\n            [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"popup !== true\"\n            (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationEnd($event)\" *ngIf=\"!popup || visible\">\n            <p-tieredMenuSub [item]=\"model\" root=\"root\" [parentActive]=\"parentActive\" [baseZIndex]=\"baseZIndex\" [autoZIndex]=\"autoZIndex\" (leafClick)=\"onLeafClick()\"\n                [autoDisplay]=\"autoDisplay\" [popup]=\"popup\"></p-tieredMenuSub>\n        </div>\n    ",
                        animations: [
                            animations.trigger('overlayAnimation', [
                                animations.transition(':enter', [
                                    animations.style({ opacity: 0, transform: 'scaleY(0.8)' }),
                                    animations.animate('{{showTransitionParams}}')
                                ]),
                                animations.transition(':leave', [
                                    animations.animate('{{hideTransitionParams}}', animations.style({ opacity: 0 }))
                                ])
                            ])
                        ],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./tieredmenu.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ChangeDetectorRef }, { type: i5__namespace.PrimeNGConfig }, { type: i5__namespace.OverlayService }]; }, propDecorators: { model: [{
                    type: i0.Input
                }], popup: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], appendTo: [{
                    type: i0.Input
                }], autoZIndex: [{
                    type: i0.Input
                }], baseZIndex: [{
                    type: i0.Input
                }], autoDisplay: [{
                    type: i0.Input
                }], showTransitionOptions: [{
                    type: i0.Input
                }], hideTransitionOptions: [{
                    type: i0.Input
                }] } });
    var TieredMenuModule = /** @class */ (function () {
        function TieredMenuModule() {
        }
        return TieredMenuModule;
    }());
    TieredMenuModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TieredMenuModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    TieredMenuModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TieredMenuModule, declarations: [TieredMenu, TieredMenuSub], imports: [i1.CommonModule, i4.RouterModule, i3.RippleModule, i2.TooltipModule], exports: [TieredMenu, i4.RouterModule, i2.TooltipModule] });
    TieredMenuModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TieredMenuModule, imports: [[i1.CommonModule, i4.RouterModule, i3.RippleModule, i2.TooltipModule], i4.RouterModule, i2.TooltipModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TieredMenuModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i4.RouterModule, i3.RippleModule, i2.TooltipModule],
                        exports: [TieredMenu, i4.RouterModule, i2.TooltipModule],
                        declarations: [TieredMenu, TieredMenuSub]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TieredMenu = TieredMenu;
    exports.TieredMenuModule = TieredMenuModule;
    exports.TieredMenuSub = TieredMenuSub;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tieredmenu.umd.js.map
