(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/ripple'), require('primeng/dom'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/sidebar', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/ripple', 'primeng/dom', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.sidebar = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.ripple, global.primeng.dom, global.primeng.api));
}(this, (function (exports, i0, animations, i1, i2, dom, api) { 'use strict';

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

    var showAnimation = animations.animation([
        animations.style({ transform: '{{transform}}', opacity: 0 }),
        animations.animate('{{transition}}')
    ]);
    var hideAnimation = animations.animation([
        animations.animate('{{transition}}', animations.style({ transform: '{{transform}}', opacity: 0 }))
    ]);
    var Sidebar = /** @class */ (function () {
        function Sidebar(el, renderer, cd) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.blockScroll = false;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.modal = true;
            this.dismissible = true;
            this.showCloseIcon = true;
            this.closeOnEscape = true;
            this.transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
            this.onShow = new i0.EventEmitter();
            this.onHide = new i0.EventEmitter();
            this.visibleChange = new i0.EventEmitter();
            this._position = "left";
            this._fullScreen = false;
            this.transformOptions = "translate3d(-100%, 0px, 0px)";
        }
        Sidebar.prototype.ngAfterViewInit = function () {
            this.initialized = true;
        };
        Sidebar.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                    default:
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        Object.defineProperty(Sidebar.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (val) {
                this._visible = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Sidebar.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (value) {
                this._position = value;
                switch (value) {
                    case 'left':
                        this.transformOptions = "translate3d(-100%, 0px, 0px)";
                        break;
                    case 'right':
                        this.transformOptions = "translate3d(100%, 0px, 0px)";
                        break;
                    case 'bottom':
                        this.transformOptions = "translate3d(0px, 100%, 0px)";
                        break;
                    case 'top':
                        this.transformOptions = "translate3d(0px, -100%, 0px)";
                        break;
                }
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(Sidebar.prototype, "fullScreen", {
            get: function () {
                return this._fullScreen;
            },
            set: function (value) {
                this._fullScreen = value;
                if (value)
                    this.transformOptions = "none";
            },
            enumerable: false,
            configurable: true
        });
        Sidebar.prototype.show = function () {
            if (this.autoZIndex) {
                this.container.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
            }
            if (this.modal) {
                this.enableModality();
            }
            this.onShow.emit({});
        };
        Sidebar.prototype.hide = function () {
            this.onHide.emit({});
            if (this.modal) {
                this.disableModality();
            }
        };
        Sidebar.prototype.close = function (event) {
            this.hide();
            this.visibleChange.emit(false);
            event.preventDefault();
        };
        Sidebar.prototype.enableModality = function () {
            var _this = this;
            if (!this.mask) {
                this.mask = document.createElement('div');
                this.mask.style.zIndex = String(parseInt(this.container.style.zIndex) - 1);
                dom.DomHandler.addMultipleClasses(this.mask, 'p-component-overlay p-sidebar-mask');
                if (this.dismissible) {
                    this.maskClickListener = this.renderer.listen(this.mask, 'click', function (event) {
                        if (_this.dismissible) {
                            _this.close(event);
                        }
                    });
                }
                document.body.appendChild(this.mask);
                if (this.blockScroll) {
                    dom.DomHandler.addClass(document.body, 'p-overflow-hidden');
                }
            }
        };
        Sidebar.prototype.disableModality = function () {
            if (this.mask) {
                this.unbindMaskClickListener();
                document.body.removeChild(this.mask);
                if (this.blockScroll) {
                    dom.DomHandler.removeClass(document.body, 'p-overflow-hidden');
                }
                this.mask = null;
            }
        };
        Sidebar.prototype.onAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.container = event.element;
                    this.appendContainer();
                    this.show();
                    if (this.closeOnEscape) {
                        this.bindDocumentEscapeListener();
                    }
                    break;
                case 'void':
                    this.hide();
                    this.unbindGlobalListeners();
                    break;
            }
        };
        Sidebar.prototype.appendContainer = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.container);
                else
                    dom.DomHandler.appendChild(this.container, this.appendTo);
            }
        };
        Sidebar.prototype.bindDocumentEscapeListener = function () {
            var _this = this;
            var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', function (event) {
                if (event.which == 27) {
                    if (parseInt(_this.container.style.zIndex) === (dom.DomHandler.zindex + _this.baseZIndex)) {
                        _this.close(event);
                    }
                }
            });
        };
        Sidebar.prototype.unbindDocumentEscapeListener = function () {
            if (this.documentEscapeListener) {
                this.documentEscapeListener();
                this.documentEscapeListener = null;
            }
        };
        Sidebar.prototype.unbindMaskClickListener = function () {
            if (this.maskClickListener) {
                this.maskClickListener();
                this.maskClickListener = null;
            }
        };
        Sidebar.prototype.unbindGlobalListeners = function () {
            this.unbindMaskClickListener();
            this.unbindDocumentEscapeListener();
        };
        Sidebar.prototype.ngOnDestroy = function () {
            this.initialized = false;
            if (this.visible) {
                this.hide();
            }
            if (this.appendTo && this.container) {
                this.el.nativeElement.appendChild(this.container);
            }
            this.unbindGlobalListeners();
        };
        return Sidebar;
    }());
    Sidebar.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: Sidebar, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Sidebar.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: Sidebar, selector: "p-sidebar", inputs: { appendTo: "appendTo", blockScroll: "blockScroll", style: "style", styleClass: "styleClass", ariaCloseLabel: "ariaCloseLabel", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", modal: "modal", dismissible: "dismissible", showCloseIcon: "showCloseIcon", closeOnEscape: "closeOnEscape", transitionOptions: "transitionOptions", visible: "visible", position: "position", fullScreen: "fullScreen" }, outputs: { onShow: "onShow", onHide: "onHide", visibleChange: "visibleChange" }, queries: [{ propertyName: "templates", predicate: api.PrimeTemplate }], ngImport: i0__namespace, template: "\n        <div #container [ngClass]=\"{'p-sidebar':true, 'p-sidebar-active': visible,\n            'p-sidebar-left': (position === 'left' && !fullScreen), 'p-sidebar-right': (position === 'right' && !fullScreen),\n            'p-sidebar-top': (position === 'top' && !fullScreen), 'p-sidebar-bottom': (position === 'bottom' && !fullScreen),\n            'p-sidebar-full': fullScreen}\"  *ngIf=\"visible\" [@panelState]=\"{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}\" (@panelState.start)=\"onAnimationStart($event)\" [ngStyle]=\"style\" [class]=\"styleClass\"  role=\"complementary\" [attr.aria-modal]=\"modal\">\n            <div class=\"p-sidebar-header\">\n                <button type=\"button\" class=\"p-sidebar-close p-sidebar-icon p-link\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\" [attr.aria-label]=\"ariaCloseLabel\"  *ngIf=\"showCloseIcon\" pRipple>\n                    <span class=\"p-sidebar-close-icon pi pi-times\"></span>\n                </button>\n            </div>\n            <div class=\"p-sidebar-content\">\n                <ng-content></ng-content>\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-sidebar{position:fixed;transition:transform .3s;display:flex;flex-direction:column}.p-sidebar-content{position:relative;overflow-y:auto}.p-sidebar-header{display:flex;align-items:center;justify-content:flex-end}.p-sidebar-icon{display:flex;align-items:center;justify-content:center}.p-sidebar-mask{transition-property:background-color}.p-sidebar-mask,.p-sidebar-mask.p-sidebar-mask-leave.p-component-overlay{background-color:transparent}.p-sidebar-left{top:0;left:0;width:20rem;height:100%}.p-sidebar-right{top:0;right:0;width:20rem;height:100%}.p-sidebar-top{top:0;left:0;width:100%;height:10rem}.p-sidebar-bottom{bottom:0;left:0;width:100%;height:10rem}.p-sidebar-full{width:100%;height:100%;top:0;left:0;transition:none}.p-sidebar-left.p-sidebar-sm,.p-sidebar-right.p-sidebar-sm{width:20rem}.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-md{width:40rem}.p-sidebar-left.p-sidebar-lg,.p-sidebar-right.p-sidebar-lg{width:60rem}.p-sidebar-bottom.p-sidebar-sm,.p-sidebar-top.p-sidebar-sm{height:10rem}.p-sidebar-bottom.p-sidebar-md,.p-sidebar-top.p-sidebar-md{height:20rem}.p-sidebar-bottom.p-sidebar-lg,.p-sidebar-top.p-sidebar-lg{height:30rem}@media screen and (max-width:64em){.p-sidebar-left.p-sidebar-lg,.p-sidebar-left.p-sidebar-md,.p-sidebar-right.p-sidebar-lg,.p-sidebar-right.p-sidebar-md{width:20rem}}"], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2__namespace.Ripple, selector: "[pRipple]" }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [
            animations.trigger('panelState', [
                animations.transition('void => visible', [
                    animations.useAnimation(showAnimation)
                ]),
                animations.transition('visible => void', [
                    animations.useAnimation(hideAnimation)
                ])
            ])
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: Sidebar, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-sidebar',
                        template: "\n        <div #container [ngClass]=\"{'p-sidebar':true, 'p-sidebar-active': visible,\n            'p-sidebar-left': (position === 'left' && !fullScreen), 'p-sidebar-right': (position === 'right' && !fullScreen),\n            'p-sidebar-top': (position === 'top' && !fullScreen), 'p-sidebar-bottom': (position === 'bottom' && !fullScreen),\n            'p-sidebar-full': fullScreen}\"  *ngIf=\"visible\" [@panelState]=\"{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}\" (@panelState.start)=\"onAnimationStart($event)\" [ngStyle]=\"style\" [class]=\"styleClass\"  role=\"complementary\" [attr.aria-modal]=\"modal\">\n            <div class=\"p-sidebar-header\">\n                <button type=\"button\" class=\"p-sidebar-close p-sidebar-icon p-link\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\" [attr.aria-label]=\"ariaCloseLabel\"  *ngIf=\"showCloseIcon\" pRipple>\n                    <span class=\"p-sidebar-close-icon pi pi-times\"></span>\n                </button>\n            </div>\n            <div class=\"p-sidebar-content\">\n                <ng-content></ng-content>\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </div>\n        </div>\n    ",
                        animations: [
                            animations.trigger('panelState', [
                                animations.transition('void => visible', [
                                    animations.useAnimation(showAnimation)
                                ]),
                                animations.transition('visible => void', [
                                    animations.useAnimation(hideAnimation)
                                ])
                            ])
                        ],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./sidebar.css']
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { appendTo: [{
                    type: i0.Input
                }], blockScroll: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], ariaCloseLabel: [{
                    type: i0.Input
                }], autoZIndex: [{
                    type: i0.Input
                }], baseZIndex: [{
                    type: i0.Input
                }], modal: [{
                    type: i0.Input
                }], dismissible: [{
                    type: i0.Input
                }], showCloseIcon: [{
                    type: i0.Input
                }], closeOnEscape: [{
                    type: i0.Input
                }], transitionOptions: [{
                    type: i0.Input
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }], onShow: [{
                    type: i0.Output
                }], onHide: [{
                    type: i0.Output
                }], visibleChange: [{
                    type: i0.Output
                }], visible: [{
                    type: i0.Input
                }], position: [{
                    type: i0.Input
                }], fullScreen: [{
                    type: i0.Input
                }] } });
    var SidebarModule = /** @class */ (function () {
        function SidebarModule() {
        }
        return SidebarModule;
    }());
    SidebarModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: SidebarModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    SidebarModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: SidebarModule, declarations: [Sidebar], imports: [i1.CommonModule, i2.RippleModule], exports: [Sidebar] });
    SidebarModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: SidebarModule, imports: [[i1.CommonModule, i2.RippleModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: SidebarModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i2.RippleModule],
                        exports: [Sidebar],
                        declarations: [Sidebar]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Sidebar = Sidebar;
    exports.SidebarModule = SidebarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-sidebar.umd.js.map
