(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom'), require('@angular/router'), require('primeng/utils'), require('primeng/tooltip'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/slidemenu', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom', '@angular/router', 'primeng/utils', 'primeng/tooltip', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.slidemenu = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom, global.ng.router, global.primeng.utils, global.primeng.tooltip, global.primeng.api));
}(this, (function (exports, i0, animations, i1, dom, i3, utils, i2, i4) { 'use strict';

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
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);

    var SlideMenuSub = /** @class */ (function () {
        function SlideMenuSub(slideMenu) {
            this.backLabel = 'Back';
            this.easing = 'ease-out';
            this.slideMenu = slideMenu;
        }
        SlideMenuSub.prototype.itemClick = function (event, item, listitem) {
            var _this = this;
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
            if (item.items && !this.slideMenu.animating) {
                this.slideMenu.left -= this.slideMenu.menuWidth;
                this.activeItem = listitem;
                this.slideMenu.animating = true;
                setTimeout(function () { return _this.slideMenu.animating = false; }, this.effectDuration);
            }
            if (!item.items && this.slideMenu.popup) {
                this.slideMenu.hide();
            }
        };
        SlideMenuSub.prototype.ngOnDestroy = function () {
            this.activeItem = null;
        };
        return SlideMenuSub;
    }());
    SlideMenuSub.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SlideMenuSub, deps: [{ token: i0.forwardRef(function () { return SlideMenu; }) }], target: i0__namespace.ɵɵFactoryTarget.Component });
    SlideMenuSub.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: SlideMenuSub, selector: "p-slideMenuSub", inputs: { item: "item", root: "root", backLabel: "backLabel", menuWidth: "menuWidth", effectDuration: "effectDuration", easing: "easing", index: "index" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <ul [ngClass]=\"{'p-slidemenu-rootlist':root, 'p-submenu-list':!root, 'p-active-submenu': (-slideMenu.left == (index * menuWidth))}\"\n            [style.width.px]=\"menuWidth\" [style.left.px]=\"root ? slideMenu.left : slideMenu.menuWidth\"\n            [style.transitionProperty]=\"root ? 'left' : 'none'\" [style.transitionDuration]=\"effectDuration + 'ms'\" [style.transitionTimingFunction]=\"easing\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': child.visible === false}\">\n                <li *ngIf=\"!child.separator\" #listitem [ngClass]=\"{'p-menuitem':true,'p-menuitem-active':listitem==activeItem,'p-hidden': child.visible === false}\" pTooltip [tooltipOptions]=\"child.tooltipOptions\"\n                    [class]=\"child.styleClass\" [ngStyle]=\"child.style\">\n                    <a *ngIf=\"!child.routerLink\" [attr.href]=\"child.url\" class=\"p-menuitem-link\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                        [ngClass]=\"{'p-disabled':child.disabled}\" [attr.tabindex]=\"child.disabled ? null : '0'\"\n                        (click)=\"itemClick($event, child, listitem)\">\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\">{{child.label}}</span>\n                        <span class=\"p-submenu-icon pi pi-fw pi-angle-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\"\n                        [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" [href]=\"child.url\" class=\"p-menuitem-link\"\n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.disabled ? null : '0'\"\n                        [ngClass]=\"{'p-disabled':child.disabled}\"\n                        (click)=\"itemClick($event, child, listitem)\"\n                        [fragment]=\"child.fragment\" [queryParamsHandling]=\"child.queryParamsHandling\" [preserveFragment]=\"child.preserveFragment\" [skipLocationChange]=\"child.skipLocationChange\" [replaceUrl]=\"child.replaceUrl\" [state]=\"child.state\">\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\">{{child.label}}</span>\n                        <span class=\"p-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <p-slideMenuSub class=\"p-submenu\" [item]=\"child\" [index]=\"index + 1\" [menuWidth]=\"menuWidth\" *ngIf=\"child.items\"></p-slideMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    ", isInline: true, components: [{ type: SlideMenuSub, selector: "p-slideMenuSub", inputs: ["item", "root", "backLabel", "menuWidth", "effectDuration", "easing", "index"] }], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3__namespace.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i3__namespace.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }], encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SlideMenuSub, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-slideMenuSub',
                        template: "\n        <ul [ngClass]=\"{'p-slidemenu-rootlist':root, 'p-submenu-list':!root, 'p-active-submenu': (-slideMenu.left == (index * menuWidth))}\"\n            [style.width.px]=\"menuWidth\" [style.left.px]=\"root ? slideMenu.left : slideMenu.menuWidth\"\n            [style.transitionProperty]=\"root ? 'left' : 'none'\" [style.transitionDuration]=\"effectDuration + 'ms'\" [style.transitionTimingFunction]=\"easing\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': child.visible === false}\">\n                <li *ngIf=\"!child.separator\" #listitem [ngClass]=\"{'p-menuitem':true,'p-menuitem-active':listitem==activeItem,'p-hidden': child.visible === false}\" pTooltip [tooltipOptions]=\"child.tooltipOptions\"\n                    [class]=\"child.styleClass\" [ngStyle]=\"child.style\">\n                    <a *ngIf=\"!child.routerLink\" [attr.href]=\"child.url\" class=\"p-menuitem-link\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                        [ngClass]=\"{'p-disabled':child.disabled}\" [attr.tabindex]=\"child.disabled ? null : '0'\"\n                        (click)=\"itemClick($event, child, listitem)\">\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\">{{child.label}}</span>\n                        <span class=\"p-submenu-icon pi pi-fw pi-angle-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\"\n                        [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" [href]=\"child.url\" class=\"p-menuitem-link\"\n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.disabled ? null : '0'\"\n                        [ngClass]=\"{'p-disabled':child.disabled}\"\n                        (click)=\"itemClick($event, child, listitem)\"\n                        [fragment]=\"child.fragment\" [queryParamsHandling]=\"child.queryParamsHandling\" [preserveFragment]=\"child.preserveFragment\" [skipLocationChange]=\"child.skipLocationChange\" [replaceUrl]=\"child.replaceUrl\" [state]=\"child.state\">\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\">{{child.label}}</span>\n                        <span class=\"p-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <p-slideMenuSub class=\"p-submenu\" [item]=\"child\" [index]=\"index + 1\" [menuWidth]=\"menuWidth\" *ngIf=\"child.items\"></p-slideMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    ",
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i0.forwardRef(function () { return SlideMenu; })]
                        }] }];
        }, propDecorators: { item: [{
                    type: i0.Input
                }], root: [{
                    type: i0.Input
                }], backLabel: [{
                    type: i0.Input
                }], menuWidth: [{
                    type: i0.Input
                }], effectDuration: [{
                    type: i0.Input
                }], easing: [{
                    type: i0.Input
                }], index: [{
                    type: i0.Input
                }] } });
    var SlideMenu = /** @class */ (function () {
        function SlideMenu(el, renderer, cd, config, overlayService) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.config = config;
            this.overlayService = overlayService;
            this.menuWidth = 190;
            this.viewportHeight = 180;
            this.effectDuration = 250;
            this.easing = 'ease-out';
            this.backLabel = 'Back';
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
            this.onShow = new i0.EventEmitter();
            this.onHide = new i0.EventEmitter();
            this.left = 0;
            this.animating = false;
        }
        SlideMenu.prototype.ngAfterViewChecked = function () {
            if (!this.viewportUpdated && !this.popup && this.containerViewChild) {
                this.updateViewPort();
                this.viewportUpdated = true;
            }
        };
        Object.defineProperty(SlideMenu.prototype, "container", {
            set: function (element) {
                this.containerViewChild = element;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SlideMenu.prototype, "backward", {
            set: function (element) {
                this.backwardViewChild = element;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SlideMenu.prototype, "slideMenuContent", {
            set: function (element) {
                this.slideMenuContentViewChild = element;
            },
            enumerable: false,
            configurable: true
        });
        SlideMenu.prototype.updateViewPort = function () {
            this.slideMenuContentViewChild.nativeElement.style.height = this.viewportHeight - dom.DomHandler.getHiddenElementOuterHeight(this.backwardViewChild.nativeElement) + 'px';
        };
        SlideMenu.prototype.toggle = function (event) {
            if (this.visible)
                this.hide();
            else
                this.show(event);
            this.preventDocumentDefault = true;
        };
        SlideMenu.prototype.show = function (event) {
            this.target = event.currentTarget;
            this.visible = true;
            this.preventDocumentDefault = true;
            this.cd.markForCheck();
        };
        SlideMenu.prototype.onOverlayClick = function (event) {
            if (this.popup) {
                this.overlayService.add({
                    originalEvent: event,
                    target: this.el.nativeElement
                });
            }
            this.preventDocumentDefault = true;
        };
        SlideMenu.prototype.onOverlayAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    if (this.popup) {
                        this.updateViewPort();
                        this.moveOnTop();
                        this.onShow.emit({});
                        this.appendOverlay();
                        dom.DomHandler.absolutePosition(this.containerViewChild.nativeElement, this.target);
                        this.bindDocumentClickListener();
                        this.bindDocumentResizeListener();
                        this.bindScrollListener();
                    }
                    break;
                case 'void':
                    this.onOverlayHide();
                    this.onHide.emit({});
                    break;
            }
        };
        SlideMenu.prototype.onOverlayAnimationEnd = function (event) {
            switch (event.toState) {
                case 'void':
                    utils.ZIndexUtils.clear(event.element);
                    break;
            }
        };
        SlideMenu.prototype.appendOverlay = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.containerViewChild.nativeElement);
                else
                    dom.DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
            }
        };
        SlideMenu.prototype.restoreOverlayAppend = function () {
            if (this.container && this.appendTo) {
                this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
            }
        };
        SlideMenu.prototype.moveOnTop = function () {
            if (this.autoZIndex) {
                utils.ZIndexUtils.set('menu', this.containerViewChild.nativeElement, this.baseZIndex + this.config.zIndex.menu);
            }
        };
        SlideMenu.prototype.hide = function () {
            this.visible = false;
            this.cd.markForCheck();
        };
        SlideMenu.prototype.onWindowResize = function () {
            this.hide();
        };
        SlideMenu.prototype.goBack = function () {
            this.left += this.menuWidth;
        };
        SlideMenu.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentClickListener = this.renderer.listen(documentTarget, 'click', function () {
                    if (!_this.preventDocumentDefault) {
                        _this.hide();
                        _this.cd.detectChanges();
                    }
                    _this.preventDocumentDefault = false;
                });
            }
        };
        SlideMenu.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        SlideMenu.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        SlideMenu.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        SlideMenu.prototype.bindScrollListener = function () {
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
        SlideMenu.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        SlideMenu.prototype.onOverlayHide = function () {
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
            this.unbindScrollListener();
            this.preventDocumentDefault = false;
            this.target = null;
            this.left = 0;
        };
        SlideMenu.prototype.ngOnDestroy = function () {
            if (this.popup) {
                if (this.scrollHandler) {
                    this.scrollHandler.destroy();
                    this.scrollHandler = null;
                }
                this.restoreOverlayAppend();
                this.onOverlayHide();
            }
        };
        return SlideMenu;
    }());
    SlideMenu.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SlideMenu, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ChangeDetectorRef }, { token: i4__namespace.PrimeNGConfig }, { token: i4__namespace.OverlayService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    SlideMenu.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: SlideMenu, selector: "p-slideMenu", inputs: { model: "model", popup: "popup", style: "style", styleClass: "styleClass", menuWidth: "menuWidth", viewportHeight: "viewportHeight", effectDuration: "effectDuration", easing: "easing", backLabel: "backLabel", appendTo: "appendTo", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onShow: "onShow", onHide: "onHide" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true }, { propertyName: "backward", first: true, predicate: ["backward"], descendants: true }, { propertyName: "slideMenuContent", first: true, predicate: ["slideMenuContent"], descendants: true }], ngImport: i0__namespace, template: "\n        <div #container [ngClass]=\"{'p-slidemenu p-component':true, 'p-slidemenu-overlay':popup}\"\n            [class]=\"styleClass\" [ngStyle]=\"style\" (click)=\"onOverlayClick($event)\"\n            [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"popup !== true\"\n            (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationEnd($event)\" *ngIf=\"!popup || visible\">\n            <div class=\"p-slidemenu-wrapper\" [style.height]=\"left ? viewportHeight + 'px' : 'auto'\">\n                <div #slideMenuContent class=\"p-slidemenu-content\">\n                    <p-slideMenuSub [item]=\"model\" root=\"root\" [index]=\"0\" [menuWidth]=\"menuWidth\" [effectDuration]=\"effectDuration\" [easing]=\"easing\"></p-slideMenuSub>\n                </div>\n                <div #backward class=\"p-slidemenu-backward\" [style.display]=\"left ? 'block' : 'none'\" (click)=\"goBack()\">\n                    <span class=\"p-slidemenu-backward-icon pi pi-fw pi-caret-left\"></span><span>{{backLabel}}</span>\n                </div>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-slidemenu{width:12.5rem}.p-slidemenu.p-slidemenu-overlay{position:absolute;top:0;left:0}.p-slidemenu ul{list-style:none;margin:0;padding:0}.p-slidemenu .p-slidemenu-rootlist{position:absolute;top:0}.p-slidemenu .p-submenu-list{display:none;position:absolute;top:0;width:12.5rem}.p-slidemenu .p-menuitem-link{cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden}.p-slidemenu .p-menuitem-icon,.p-slidemenu .p-menuitem-text{vertical-align:middle}.p-slidemenu .p-menuitem{position:relative}.p-slidemenu .p-menuitem-link .p-submenu-icon{margin-left:auto}.p-slidemenu .p-slidemenu-wrapper{position:relative}.p-slidemenu .p-slidemenu-content{overflow-x:hidden;overflow-y:auto;position:relative}.p-slidemenu-backward{position:absolute;bottom:0;width:100%;cursor:pointer;display:none}.p-slidemenu-backward .p-slidemenu-backward-icon,.p-slidemenu-backward span{vertical-align:middle}.p-slidemenu .p-menuitem-active{position:static}.p-slidemenu .p-menuitem-active>.p-submenu>.p-submenu-list{display:block}.p-slidemenu .p-active-submenu>.p-menuitem-active>.p-submenu>.p-submenu-list,.p-slidemenu ul:not(.p-active-submenu)>.p-menuitem:not(.p-menuitem-active){display:none}.p-slidemenu .p-active-submenu>.p-menuitem-active~.p-menuitem{display:block}"], components: [{ type: SlideMenuSub, selector: "p-slideMenuSub", inputs: ["item", "root", "backLabel", "menuWidth", "effectDuration", "easing", "index"] }], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
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
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SlideMenu, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-slideMenu',
                        template: "\n        <div #container [ngClass]=\"{'p-slidemenu p-component':true, 'p-slidemenu-overlay':popup}\"\n            [class]=\"styleClass\" [ngStyle]=\"style\" (click)=\"onOverlayClick($event)\"\n            [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"popup !== true\"\n            (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationEnd($event)\" *ngIf=\"!popup || visible\">\n            <div class=\"p-slidemenu-wrapper\" [style.height]=\"left ? viewportHeight + 'px' : 'auto'\">\n                <div #slideMenuContent class=\"p-slidemenu-content\">\n                    <p-slideMenuSub [item]=\"model\" root=\"root\" [index]=\"0\" [menuWidth]=\"menuWidth\" [effectDuration]=\"effectDuration\" [easing]=\"easing\"></p-slideMenuSub>\n                </div>\n                <div #backward class=\"p-slidemenu-backward\" [style.display]=\"left ? 'block' : 'none'\" (click)=\"goBack()\">\n                    <span class=\"p-slidemenu-backward-icon pi pi-fw pi-caret-left\"></span><span>{{backLabel}}</span>\n                </div>\n            </div>\n        </div>\n    ",
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
                        styleUrls: ['./slidemenu.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ChangeDetectorRef }, { type: i4__namespace.PrimeNGConfig }, { type: i4__namespace.OverlayService }]; }, propDecorators: { model: [{
                    type: i0.Input
                }], popup: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], menuWidth: [{
                    type: i0.Input
                }], viewportHeight: [{
                    type: i0.Input
                }], effectDuration: [{
                    type: i0.Input
                }], easing: [{
                    type: i0.Input
                }], backLabel: [{
                    type: i0.Input
                }], appendTo: [{
                    type: i0.Input
                }], autoZIndex: [{
                    type: i0.Input
                }], baseZIndex: [{
                    type: i0.Input
                }], showTransitionOptions: [{
                    type: i0.Input
                }], hideTransitionOptions: [{
                    type: i0.Input
                }], onShow: [{
                    type: i0.Output
                }], onHide: [{
                    type: i0.Output
                }], container: [{
                    type: i0.ViewChild,
                    args: ['container']
                }], backward: [{
                    type: i0.ViewChild,
                    args: ['backward']
                }], slideMenuContent: [{
                    type: i0.ViewChild,
                    args: ['slideMenuContent']
                }] } });
    var SlideMenuModule = /** @class */ (function () {
        function SlideMenuModule() {
        }
        return SlideMenuModule;
    }());
    SlideMenuModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SlideMenuModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    SlideMenuModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SlideMenuModule, declarations: [SlideMenu, SlideMenuSub], imports: [i1.CommonModule, i3.RouterModule, i2.TooltipModule], exports: [SlideMenu, i3.RouterModule, i2.TooltipModule] });
    SlideMenuModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SlideMenuModule, imports: [[i1.CommonModule, i3.RouterModule, i2.TooltipModule], i3.RouterModule, i2.TooltipModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SlideMenuModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i3.RouterModule, i2.TooltipModule],
                        exports: [SlideMenu, i3.RouterModule, i2.TooltipModule],
                        declarations: [SlideMenu, SlideMenuSub]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.SlideMenu = SlideMenu;
    exports.SlideMenuModule = SlideMenuModule;
    exports.SlideMenuSub = SlideMenuSub;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-slidemenu.umd.js.map
