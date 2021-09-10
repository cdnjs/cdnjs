(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('primeng/api'), require('primeng/ripple'), require('@angular/animations'), require('primeng/utils')) :
    typeof define === 'function' && define.amd ? define('primeng/overlaypanel', ['exports', '@angular/core', '@angular/common', 'primeng/dom', 'primeng/api', 'primeng/ripple', '@angular/animations', 'primeng/utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.overlaypanel = {}), global.ng.core, global.ng.common, global.primeng.dom, global.primeng.api, global.primeng.ripple, global.ng.animations, global.primeng.utils));
}(this, (function (exports, i0, i2, dom, i1, i3, animations, utils) { 'use strict';

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
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);

    var OverlayPanel = /** @class */ (function () {
        function OverlayPanel(el, renderer, cd, zone, config, overlayService) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.zone = zone;
            this.config = config;
            this.overlayService = overlayService;
            this.dismissable = true;
            this.appendTo = 'body';
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.focusOnShow = true;
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
            this.onShow = new i0.EventEmitter();
            this.onHide = new i0.EventEmitter();
            this.overlayVisible = false;
            this.render = false;
            this.selfClick = false;
        }
        OverlayPanel.prototype.ngAfterContentInit = function () {
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
                _this.cd.markForCheck();
            });
        };
        OverlayPanel.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener && this.dismissable) {
                this.zone.runOutsideAngular(function () {
                    var documentEvent = dom.DomHandler.isIOS() ? 'touchstart' : 'click';
                    var documentTarget = _this.el ? _this.el.nativeElement.ownerDocument : 'document';
                    _this.documentClickListener = _this.renderer.listen(documentTarget, documentEvent, function (event) {
                        if (!_this.container.contains(event.target) && _this.target !== event.target && !_this.target.contains(event.target) && !_this.selfClick) {
                            _this.zone.run(function () {
                                _this.hide();
                            });
                        }
                        _this.selfClick = false;
                        _this.cd.markForCheck();
                    });
                });
            }
        };
        OverlayPanel.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
                this.selfClick = false;
            }
        };
        OverlayPanel.prototype.toggle = function (event, target) {
            var _this = this;
            if (this.overlayVisible) {
                if (this.hasTargetChanged(event, target)) {
                    this.destroyCallback = function () {
                        _this.show(null, (target || event.currentTarget || event.target));
                    };
                }
                this.hide();
            }
            else {
                this.show(event, target);
            }
        };
        OverlayPanel.prototype.show = function (event, target) {
            this.target = target || event.currentTarget || event.target;
            this.overlayVisible = true;
            this.render = true;
            this.cd.markForCheck();
        };
        OverlayPanel.prototype.onOverlayClick = function (event) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
            this.selfClick = true;
        };
        OverlayPanel.prototype.hasTargetChanged = function (event, target) {
            return this.target != null && this.target !== (target || event.currentTarget || event.target);
        };
        OverlayPanel.prototype.appendContainer = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.container);
                else
                    dom.DomHandler.appendChild(this.container, this.appendTo);
            }
        };
        OverlayPanel.prototype.restoreAppend = function () {
            if (this.container && this.appendTo) {
                this.el.nativeElement.appendChild(this.container);
            }
        };
        OverlayPanel.prototype.align = function () {
            if (this.autoZIndex) {
                utils.ZIndexUtils.set('overlay', this.container, this.baseZIndex + this.config.zIndex.overlay);
            }
            dom.DomHandler.absolutePosition(this.container, this.target);
            var containerOffset = dom.DomHandler.getOffset(this.container);
            var targetOffset = dom.DomHandler.getOffset(this.target);
            var arrowLeft = 0;
            if (containerOffset.left < targetOffset.left) {
                arrowLeft = targetOffset.left - containerOffset.left;
            }
            this.container.style.setProperty('--overlayArrowLeft', arrowLeft + "px");
            if (containerOffset.top < targetOffset.top) {
                dom.DomHandler.addClass(this.container, 'p-overlaypanel-flipped');
            }
        };
        OverlayPanel.prototype.onAnimationStart = function (event) {
            var _this = this;
            if (event.toState === 'open') {
                this.container = event.element;
                this.onShow.emit(null);
                this.appendContainer();
                this.align();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                this.bindScrollListener();
                if (this.focusOnShow) {
                    this.focus();
                }
                this.overlayEventListener = function (e) {
                    if (_this.container && _this.container.contains(e.target)) {
                        _this.selfClick = true;
                    }
                };
                this.overlaySubscription = this.overlayService.clickObservable.subscribe(this.overlayEventListener);
            }
        };
        OverlayPanel.prototype.onAnimationEnd = function (event) {
            switch (event.toState) {
                case 'void':
                    if (this.destroyCallback) {
                        this.destroyCallback();
                        this.destroyCallback = null;
                    }
                    if (this.overlaySubscription) {
                        this.overlaySubscription.unsubscribe();
                    }
                    break;
                case 'close':
                    if (this.autoZIndex) {
                        utils.ZIndexUtils.clear(this.container);
                    }
                    if (this.overlaySubscription) {
                        this.overlaySubscription.unsubscribe();
                    }
                    this.onContainerDestroy();
                    this.onHide.emit({});
                    this.render = false;
                    break;
            }
        };
        OverlayPanel.prototype.focus = function () {
            var focusable = dom.DomHandler.findSingle(this.container, '[autofocus]');
            if (focusable) {
                this.zone.runOutsideAngular(function () {
                    setTimeout(function () { return focusable.focus(); }, 5);
                });
            }
        };
        OverlayPanel.prototype.hide = function () {
            this.overlayVisible = false;
            this.cd.markForCheck();
        };
        OverlayPanel.prototype.onCloseClick = function (event) {
            this.hide();
            event.preventDefault();
        };
        OverlayPanel.prototype.onWindowResize = function (event) {
            this.hide();
        };
        OverlayPanel.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        OverlayPanel.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        OverlayPanel.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.target, function () {
                    if (_this.overlayVisible) {
                        _this.hide();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        OverlayPanel.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        OverlayPanel.prototype.onContainerDestroy = function () {
            this.target = null;
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
            this.unbindScrollListener();
        };
        OverlayPanel.prototype.ngOnDestroy = function () {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }
            if (this.container && this.autoZIndex) {
                utils.ZIndexUtils.clear(this.container);
            }
            this.target = null;
            this.destroyCallback = null;
            if (this.container) {
                this.restoreAppend();
                this.onContainerDestroy();
            }
            if (this.overlaySubscription) {
                this.overlaySubscription.unsubscribe();
            }
        };
        return OverlayPanel;
    }());
    OverlayPanel.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: OverlayPanel, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.NgZone }, { token: i1__namespace.PrimeNGConfig }, { token: i1__namespace.OverlayService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    OverlayPanel.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: OverlayPanel, selector: "p-overlayPanel", inputs: { dismissable: "dismissable", showCloseIcon: "showCloseIcon", style: "style", styleClass: "styleClass", appendTo: "appendTo", autoZIndex: "autoZIndex", ariaCloseLabel: "ariaCloseLabel", baseZIndex: "baseZIndex", focusOnShow: "focusOnShow", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onShow: "onShow", onHide: "onHide" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: i1.PrimeTemplate }], ngImport: i0__namespace, template: "\n        <div *ngIf=\"render\" [ngClass]=\"'p-overlaypanel p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"onOverlayClick($event)\"\n            [@animation]=\"{value: (overlayVisible ? 'open': 'close'), params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\"\n                (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\">\n            <div class=\"p-overlaypanel-content\">\n                <ng-content></ng-content>\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </div>\n            <button *ngIf=\"showCloseIcon\" type=\"button\" class=\"p-overlaypanel-close p-link\" (click)=\"onCloseClick($event)\" (keydown.enter)=\"hide()\" [attr.aria-label]=\"ariaCloseLabel\" pRipple>\n                <span class=\"p-overlaypanel-close-icon pi pi-times\"></span>\n            </button>\n        </div>\n    ", isInline: true, styles: [".p-overlaypanel{position:absolute;margin-top:10px;top:0;left:0}.p-overlaypanel-flipped{margin-top:0;margin-bottom:10px}.p-overlaypanel-close{display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-overlaypanel:after,.p-overlaypanel:before{bottom:100%;left:calc(0 + 1.25rem);left:calc(var(--overlayArrowLeft, 0) + 1.25rem);content:\" \";height:0;width:0;position:absolute;pointer-events:none}.p-overlaypanel:after{border-width:8px;margin-left:-8px}.p-overlaypanel:before{border-width:10px;margin-left:-10px}.p-overlaypanel-shifted:after,.p-overlaypanel-shifted:before{left:auto;right:1.25em;margin-left:auto}.p-overlaypanel-flipped:after,.p-overlaypanel-flipped:before{bottom:auto;top:100%}.p-overlaypanel.p-overlaypanel-flipped:after,.p-overlaypanel.p-overlaypanel-flipped:before{border-bottom-color:transparent}"], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3__namespace.Ripple, selector: "[pRipple]" }], animations: [
            animations.trigger('animation', [
                animations.state('void', animations.style({
                    transform: 'scaleY(0.8)',
                    opacity: 0
                })),
                animations.state('close', animations.style({
                    opacity: 0
                })),
                animations.state('open', animations.style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
                animations.transition('void => open', animations.animate('{{showTransitionParams}}')),
                animations.transition('open => close', animations.animate('{{hideTransitionParams}}')),
            ])
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: OverlayPanel, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-overlayPanel',
                        template: "\n        <div *ngIf=\"render\" [ngClass]=\"'p-overlaypanel p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"onOverlayClick($event)\"\n            [@animation]=\"{value: (overlayVisible ? 'open': 'close'), params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\"\n                (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\">\n            <div class=\"p-overlaypanel-content\">\n                <ng-content></ng-content>\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </div>\n            <button *ngIf=\"showCloseIcon\" type=\"button\" class=\"p-overlaypanel-close p-link\" (click)=\"onCloseClick($event)\" (keydown.enter)=\"hide()\" [attr.aria-label]=\"ariaCloseLabel\" pRipple>\n                <span class=\"p-overlaypanel-close-icon pi pi-times\"></span>\n            </button>\n        </div>\n    ",
                        animations: [
                            animations.trigger('animation', [
                                animations.state('void', animations.style({
                                    transform: 'scaleY(0.8)',
                                    opacity: 0
                                })),
                                animations.state('close', animations.style({
                                    opacity: 0
                                })),
                                animations.state('open', animations.style({
                                    transform: 'translateY(0)',
                                    opacity: 1
                                })),
                                animations.transition('void => open', animations.animate('{{showTransitionParams}}')),
                                animations.transition('open => close', animations.animate('{{hideTransitionParams}}')),
                            ])
                        ],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./overlaypanel.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.NgZone }, { type: i1__namespace.PrimeNGConfig }, { type: i1__namespace.OverlayService }]; }, propDecorators: { dismissable: [{
                    type: i0.Input
                }], showCloseIcon: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], appendTo: [{
                    type: i0.Input
                }], autoZIndex: [{
                    type: i0.Input
                }], ariaCloseLabel: [{
                    type: i0.Input
                }], baseZIndex: [{
                    type: i0.Input
                }], focusOnShow: [{
                    type: i0.Input
                }], showTransitionOptions: [{
                    type: i0.Input
                }], hideTransitionOptions: [{
                    type: i0.Input
                }], onShow: [{
                    type: i0.Output
                }], onHide: [{
                    type: i0.Output
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [i1.PrimeTemplate]
                }] } });
    var OverlayPanelModule = /** @class */ (function () {
        function OverlayPanelModule() {
        }
        return OverlayPanelModule;
    }());
    OverlayPanelModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: OverlayPanelModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    OverlayPanelModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: OverlayPanelModule, declarations: [OverlayPanel], imports: [i2.CommonModule, i3.RippleModule, i1.SharedModule], exports: [OverlayPanel, i1.SharedModule] });
    OverlayPanelModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: OverlayPanelModule, imports: [[i2.CommonModule, i3.RippleModule, i1.SharedModule], i1.SharedModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: OverlayPanelModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule, i3.RippleModule, i1.SharedModule],
                        exports: [OverlayPanel, i1.SharedModule],
                        declarations: [OverlayPanel]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.OverlayPanel = OverlayPanel;
    exports.OverlayPanelModule = OverlayPanelModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-overlaypanel.umd.js.map
