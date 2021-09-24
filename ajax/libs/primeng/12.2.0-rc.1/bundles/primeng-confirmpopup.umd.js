(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('primeng/button'), require('primeng/utils'), require('@angular/animations'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/confirmpopup', ['exports', '@angular/core', '@angular/common', 'primeng/api', 'primeng/button', 'primeng/utils', '@angular/animations', 'primeng/dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.confirmpopup = {}), global.ng.core, global.ng.common, global.primeng.api, global.primeng.button, global.primeng.utils, global.ng.animations, global.primeng.dom));
}(this, (function (exports, i0, i2, i1, i3, utils, animations, dom) { 'use strict';

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

    var ConfirmPopup = /** @class */ (function () {
        function ConfirmPopup(el, confirmationService, renderer, cd, config, overlayService) {
            var _this = this;
            this.el = el;
            this.confirmationService = confirmationService;
            this.renderer = renderer;
            this.cd = cd;
            this.config = config;
            this.overlayService = overlayService;
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.subscription = this.confirmationService.requireConfirmation$.subscribe(function (confirmation) {
                if (!confirmation) {
                    _this.hide();
                    return;
                }
                if (confirmation.key === _this.key) {
                    _this.confirmation = confirmation;
                    if (_this.confirmation.accept) {
                        _this.confirmation.acceptEvent = new i0.EventEmitter();
                        _this.confirmation.acceptEvent.subscribe(_this.confirmation.accept);
                    }
                    if (_this.confirmation.reject) {
                        _this.confirmation.rejectEvent = new i0.EventEmitter();
                        _this.confirmation.rejectEvent.subscribe(_this.confirmation.reject);
                    }
                    _this.visible = true;
                }
            });
        }
        Object.defineProperty(ConfirmPopup.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
                this.cd.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        ConfirmPopup.prototype.onAnimationStart = function (event) {
            if (event.toState === 'open') {
                this.container = event.element;
                document.body.appendChild(this.container);
                this.align();
                this.bindListeners();
            }
        };
        ConfirmPopup.prototype.onAnimationEnd = function (event) {
            switch (event.toState) {
                case 'void':
                    this.onContainerDestroy();
                    break;
            }
        };
        ConfirmPopup.prototype.align = function () {
            if (this.autoZIndex) {
                utils.ZIndexUtils.set('overlay', this.container, this.config.zIndex.overlay);
            }
            dom.DomHandler.absolutePosition(this.container, this.confirmation.target);
            var containerOffset = dom.DomHandler.getOffset(this.container);
            var targetOffset = dom.DomHandler.getOffset(this.confirmation.target);
            var arrowLeft = 0;
            if (containerOffset.left < targetOffset.left) {
                arrowLeft = targetOffset.left - containerOffset.left;
            }
            this.container.style.setProperty('--overlayArrowLeft', arrowLeft + "px");
            if (containerOffset.top < targetOffset.top) {
                dom.DomHandler.addClass(this.container, 'p-confirm-popup-flipped');
            }
        };
        ConfirmPopup.prototype.hide = function () {
            this.visible = false;
        };
        ConfirmPopup.prototype.accept = function () {
            if (this.confirmation.acceptEvent) {
                this.confirmation.acceptEvent.emit();
            }
            this.hide();
        };
        ConfirmPopup.prototype.reject = function () {
            if (this.confirmation.rejectEvent) {
                this.confirmation.rejectEvent.emit();
            }
            this.hide();
        };
        ConfirmPopup.prototype.onOverlayClick = function (event) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
        };
        ConfirmPopup.prototype.bindListeners = function () {
            this.bindDocumentClickListener();
            this.bindDocumentResizeListener();
            this.bindScrollListener();
        };
        ConfirmPopup.prototype.unbindListeners = function () {
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
            this.unbindScrollListener();
        };
        ConfirmPopup.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                var documentEvent = dom.DomHandler.isIOS() ? 'touchstart' : 'click';
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : document;
                this.documentClickListener = this.renderer.listen(documentTarget, documentEvent, function (event) {
                    var targetElement = _this.confirmation.target;
                    if (_this.container !== event.target && !_this.container.contains(event.target) &&
                        targetElement !== event.target && !targetElement.contains(event.target)) {
                        _this.hide();
                    }
                });
            }
        };
        ConfirmPopup.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        ConfirmPopup.prototype.onWindowResize = function () {
            this.hide();
        };
        ConfirmPopup.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        ConfirmPopup.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        ConfirmPopup.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.confirmation.target, function () {
                    if (_this.visible) {
                        _this.hide();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        ConfirmPopup.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        ConfirmPopup.prototype.unsubscribeConfirmationSubscriptions = function () {
            if (this.confirmation) {
                if (this.confirmation.acceptEvent) {
                    this.confirmation.acceptEvent.unsubscribe();
                }
                if (this.confirmation.rejectEvent) {
                    this.confirmation.rejectEvent.unsubscribe();
                }
            }
        };
        ConfirmPopup.prototype.onContainerDestroy = function () {
            this.unbindListeners();
            this.unsubscribeConfirmationSubscriptions();
            if (this.autoZIndex) {
                utils.ZIndexUtils.clear(this.container);
            }
            this.confirmation = null;
            this.container = null;
        };
        ConfirmPopup.prototype.restoreAppend = function () {
            if (this.container) {
                document.body.removeChild(this.container);
            }
            this.onContainerDestroy();
        };
        Object.defineProperty(ConfirmPopup.prototype, "acceptButtonLabel", {
            get: function () {
                return this.confirmation.acceptLabel || this.config.getTranslation(i1.TranslationKeys.ACCEPT);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfirmPopup.prototype, "rejectButtonLabel", {
            get: function () {
                return this.confirmation.rejectLabel || this.config.getTranslation(i1.TranslationKeys.REJECT);
            },
            enumerable: false,
            configurable: true
        });
        ConfirmPopup.prototype.ngOnDestroy = function () {
            this.restoreAppend();
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return ConfirmPopup;
    }());
    ConfirmPopup.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ConfirmPopup, deps: [{ token: i0__namespace.ElementRef }, { token: i1__namespace.ConfirmationService }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ChangeDetectorRef }, { token: i1__namespace.PrimeNGConfig }, { token: i1__namespace.OverlayService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ConfirmPopup.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ConfirmPopup, selector: "p-confirmPopup", inputs: { key: "key", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", style: "style", styleClass: "styleClass", visible: "visible" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <div *ngIf=\"visible\" [ngClass]=\"'p-confirm-popup p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"onOverlayClick($event)\"\n            [@animation]=\"{value: 'open', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\"\n            (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\">\n            <div #content class=\"p-confirm-popup-content\">\n                <i [ngClass]=\"'p-confirm-popup-icon'\" [class]=\"confirmation.icon\" *ngIf=\"confirmation.icon\"></i>\n                <span class=\"p-confirm-popup-message\">{{confirmation.message}}</span>\n            </div>\n            <div class=\"p-confirm-popup-footer\">\n                <button type=\"button\" pButton [icon]=\"confirmation.rejectIcon\" [label]=\"rejectButtonLabel\" (click)=\"reject()\" [ngClass]=\"'p-confirm-popup-reject p-button-sm'\"\n                    [class]=\"confirmation.rejectButtonStyleClass || 'p-button-text'\" *ngIf=\"confirmation.rejectVisible !== false\" [attr.aria-label]=\"rejectButtonLabel\"></button>\n                <button type=\"button\" pButton [icon]=\"confirmation.acceptIcon\" [label]=\"acceptButtonLabel\" (click)=\"accept()\" [ngClass]=\"'p-confirm-popup-accept p-button-sm'\"\n                    [class]=\"confirmation.acceptButtonStyleClass\" *ngIf=\"confirmation.acceptVisible !== false\" [attr.aria-label]=\"acceptButtonLabel\"></button>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-confirm-popup{position:absolute;margin-top:10px;top:0;left:0}.p-confirm-popup-flipped{margin-top:0;margin-bottom:10px}.p-confirm-popup:after,.p-confirm-popup:before{bottom:100%;left:calc(0 + 1.25rem);left:calc(var(--overlayArrowLeft, 0) + 1.25rem);content:\" \";height:0;width:0;position:absolute;pointer-events:none}.p-confirm-popup:after{border-width:8px;margin-left:-8px}.p-confirm-popup:before{border-width:10px;margin-left:-10px}.p-confirm-popup-flipped:after,.p-confirm-popup-flipped:before{bottom:auto;top:100%}.p-confirm-popup.p-confirm-popup-flipped:after,.p-confirm-popup.p-confirm-popup-flipped:before{border-bottom-color:transparent}.p-confirm-popup .p-confirm-popup-content{display:flex;align-items:center}"], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3__namespace.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }], animations: [
            animations.trigger('animation', [
                animations.state('void', animations.style({
                    transform: 'scaleY(0.8)',
                    opacity: 0
                })),
                animations.state('open', animations.style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
                animations.transition('void => open', animations.animate('{{showTransitionParams}}')),
                animations.transition('open => void', animations.animate('{{hideTransitionParams}}')),
            ])
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ConfirmPopup, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-confirmPopup',
                        template: "\n        <div *ngIf=\"visible\" [ngClass]=\"'p-confirm-popup p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"onOverlayClick($event)\"\n            [@animation]=\"{value: 'open', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\"\n            (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\">\n            <div #content class=\"p-confirm-popup-content\">\n                <i [ngClass]=\"'p-confirm-popup-icon'\" [class]=\"confirmation.icon\" *ngIf=\"confirmation.icon\"></i>\n                <span class=\"p-confirm-popup-message\">{{confirmation.message}}</span>\n            </div>\n            <div class=\"p-confirm-popup-footer\">\n                <button type=\"button\" pButton [icon]=\"confirmation.rejectIcon\" [label]=\"rejectButtonLabel\" (click)=\"reject()\" [ngClass]=\"'p-confirm-popup-reject p-button-sm'\"\n                    [class]=\"confirmation.rejectButtonStyleClass || 'p-button-text'\" *ngIf=\"confirmation.rejectVisible !== false\" [attr.aria-label]=\"rejectButtonLabel\"></button>\n                <button type=\"button\" pButton [icon]=\"confirmation.acceptIcon\" [label]=\"acceptButtonLabel\" (click)=\"accept()\" [ngClass]=\"'p-confirm-popup-accept p-button-sm'\"\n                    [class]=\"confirmation.acceptButtonStyleClass\" *ngIf=\"confirmation.acceptVisible !== false\" [attr.aria-label]=\"acceptButtonLabel\"></button>\n            </div>\n        </div>\n    ",
                        animations: [
                            animations.trigger('animation', [
                                animations.state('void', animations.style({
                                    transform: 'scaleY(0.8)',
                                    opacity: 0
                                })),
                                animations.state('open', animations.style({
                                    transform: 'translateY(0)',
                                    opacity: 1
                                })),
                                animations.transition('void => open', animations.animate('{{showTransitionParams}}')),
                                animations.transition('open => void', animations.animate('{{hideTransitionParams}}')),
                            ])
                        ],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./confirmpopup.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i1__namespace.ConfirmationService }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ChangeDetectorRef }, { type: i1__namespace.PrimeNGConfig }, { type: i1__namespace.OverlayService }]; }, propDecorators: { key: [{
                    type: i0.Input
                }], showTransitionOptions: [{
                    type: i0.Input
                }], hideTransitionOptions: [{
                    type: i0.Input
                }], autoZIndex: [{
                    type: i0.Input
                }], baseZIndex: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], visible: [{
                    type: i0.Input
                }] } });
    var ConfirmPopupModule = /** @class */ (function () {
        function ConfirmPopupModule() {
        }
        return ConfirmPopupModule;
    }());
    ConfirmPopupModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ConfirmPopupModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ConfirmPopupModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ConfirmPopupModule, declarations: [ConfirmPopup], imports: [i2.CommonModule, i3.ButtonModule], exports: [ConfirmPopup] });
    ConfirmPopupModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ConfirmPopupModule, imports: [[i2.CommonModule, i3.ButtonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ConfirmPopupModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule, i3.ButtonModule],
                        exports: [ConfirmPopup],
                        declarations: [ConfirmPopup]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ConfirmPopup = ConfirmPopup;
    exports.ConfirmPopupModule = ConfirmPopupModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-confirmpopup.umd.js.map
