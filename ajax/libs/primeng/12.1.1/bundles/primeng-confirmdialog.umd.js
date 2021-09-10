(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom'), require('primeng/api'), require('primeng/button'), require('primeng/utils'), require('primeng/ripple')) :
    typeof define === 'function' && define.amd ? define('primeng/confirmdialog', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom', 'primeng/api', 'primeng/button', 'primeng/utils', 'primeng/ripple'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.confirmdialog = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom, global.primeng.api, global.primeng.button, global.primeng.utils, global.primeng.ripple));
}(this, (function (exports, i0, animations, i2, dom, i1, i4, utils, i3) { 'use strict';

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
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);

    var showAnimation = animations.animation([
        animations.style({ transform: '{{transform}}', opacity: 0 }),
        animations.animate('{{transition}}', animations.style({ transform: 'none', opacity: 1 }))
    ]);
    var hideAnimation = animations.animation([
        animations.animate('{{transition}}', animations.style({ transform: '{{transform}}', opacity: 0 }))
    ]);
    var ConfirmDialog = /** @class */ (function () {
        function ConfirmDialog(el, renderer, confirmationService, zone, cd, config) {
            var _this = this;
            this.el = el;
            this.renderer = renderer;
            this.confirmationService = confirmationService;
            this.zone = zone;
            this.cd = cd;
            this.config = config;
            this.acceptIcon = 'pi pi-check';
            this.acceptVisible = true;
            this.rejectIcon = 'pi pi-times';
            this.rejectVisible = true;
            this.closeOnEscape = true;
            this.blockScroll = true;
            this.closable = true;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
            this.focusTrap = true;
            this.defaultFocus = 'accept';
            this.onHide = new i0.EventEmitter();
            this._position = "center";
            this.transformOptions = "scale(0.7)";
            this.id = utils.UniqueComponentId();
            this.subscription = this.confirmationService.requireConfirmation$.subscribe(function (confirmation) {
                if (!confirmation) {
                    _this.hide();
                    return;
                }
                if (confirmation.key === _this.key) {
                    _this.confirmation = confirmation;
                    _this.confirmationOptions = {
                        message: _this.confirmation.message || _this.message,
                        icon: _this.confirmation.icon || _this.icon,
                        header: _this.confirmation.header || _this.header,
                        rejectVisible: _this.confirmation.rejectVisible == null ? _this.rejectVisible : _this.confirmation.rejectVisible,
                        acceptVisible: _this.confirmation.acceptVisible == null ? _this.acceptVisible : _this.confirmation.acceptVisible,
                        acceptLabel: _this.confirmation.acceptLabel || _this.acceptLabel,
                        rejectLabel: _this.confirmation.rejectLabel || _this.rejectLabel,
                        acceptIcon: _this.confirmation.acceptIcon || _this.acceptIcon,
                        rejectIcon: _this.confirmation.rejectIcon || _this.rejectIcon,
                        acceptButtonStyleClass: _this.confirmation.acceptButtonStyleClass || _this.acceptButtonStyleClass,
                        rejectButtonStyleClass: _this.confirmation.rejectButtonStyleClass || _this.rejectButtonStyleClass,
                        defaultFocus: _this.confirmation.defaultFocus || _this.defaultFocus,
                        blockScroll: (_this.confirmation.blockScroll === false || _this.confirmation.blockScroll === true) ? _this.confirmation.blockScroll : _this.blockScroll,
                        closeOnEscape: (_this.confirmation.closeOnEscape === false || _this.confirmation.closeOnEscape === true) ? _this.confirmation.closeOnEscape : _this.closeOnEscape,
                        dismissableMask: (_this.confirmation.dismissableMask === false || _this.confirmation.dismissableMask === true) ? _this.confirmation.dismissableMask : _this.dismissableMask
                    };
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
        Object.defineProperty(ConfirmDialog.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
                if (this._visible && !this.maskVisible) {
                    this.maskVisible = true;
                }
                this.cd.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfirmDialog.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (value) {
                this._position = value;
                switch (value) {
                    case 'top-left':
                    case 'bottom-left':
                    case 'left':
                        this.transformOptions = "translate3d(-100%, 0px, 0px)";
                        break;
                    case 'top-right':
                    case 'bottom-right':
                    case 'right':
                        this.transformOptions = "translate3d(100%, 0px, 0px)";
                        break;
                    case 'bottom':
                        this.transformOptions = "translate3d(0px, 100%, 0px)";
                        break;
                    case 'top':
                        this.transformOptions = "translate3d(0px, -100%, 0px)";
                        break;
                    default:
                        this.transformOptions = "scale(0.7)";
                        break;
                }
            },
            enumerable: false,
            configurable: true
        });
        ;
        ConfirmDialog.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                }
            });
        };
        ConfirmDialog.prototype.ngOnInit = function () {
            var _this = this;
            if (this.breakpoints) {
                this.createStyle();
            }
            this.translationSubscription = this.config.translationObserver.subscribe(function () {
                if (_this.visible) {
                    _this.cd.markForCheck();
                }
            });
        };
        ConfirmDialog.prototype.option = function (name) {
            var source = this.confirmationOptions || this;
            if (source.hasOwnProperty(name)) {
                return source[name];
            }
            return undefined;
        };
        ConfirmDialog.prototype.onAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.container = event.element;
                    this.wrapper = this.container.parentElement;
                    this.contentContainer = dom.DomHandler.findSingle(this.container, '.p-dialog-content');
                    this.container.setAttribute(this.id, '');
                    var element = this.getElementToFocus();
                    if (element) {
                        element.focus();
                    }
                    this.appendContainer();
                    this.moveOnTop();
                    this.bindGlobalListeners();
                    this.enableModality();
                    break;
            }
        };
        ConfirmDialog.prototype.onAnimationEnd = function (event) {
            switch (event.toState) {
                case 'void':
                    this.onOverlayHide();
                    break;
            }
        };
        ConfirmDialog.prototype.getElementToFocus = function () {
            switch (this.option('defaultFocus')) {
                case 'accept':
                    return dom.DomHandler.findSingle(this.container, '.p-confirm-dialog-accept');
                case 'reject':
                    return dom.DomHandler.findSingle(this.container, '.p-confirm-dialog-reject');
                case 'close':
                    return dom.DomHandler.findSingle(this.container, '.p-dialog-header-close');
                case 'none':
                    return null;
                //backward compatibility
                default:
                    return dom.DomHandler.findSingle(this.container, '.p-confirm-dialog-accept');
            }
        };
        ConfirmDialog.prototype.appendContainer = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.wrapper);
                else
                    dom.DomHandler.appendChild(this.wrapper, this.appendTo);
            }
        };
        ConfirmDialog.prototype.restoreAppend = function () {
            if (this.wrapper && this.appendTo) {
                this.el.nativeElement.appendChild(this.wrapper);
            }
        };
        ConfirmDialog.prototype.enableModality = function () {
            var _this = this;
            if (this.option('blockScroll')) {
                dom.DomHandler.addClass(document.body, 'p-overflow-hidden');
            }
            if (this.option('dismissableMask')) {
                this.maskClickListener = this.renderer.listen(this.wrapper, 'mousedown', function (event) {
                    if (_this.wrapper && _this.wrapper.isSameNode(event.target)) {
                        _this.close(event);
                    }
                });
            }
        };
        ConfirmDialog.prototype.disableModality = function () {
            this.maskVisible = false;
            if (this.option('blockScroll')) {
                dom.DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }
            if (this.dismissableMask) {
                this.unbindMaskClickListener();
            }
            if (this.container && !this.cd['destroyed']) {
                this.cd.detectChanges();
            }
        };
        ConfirmDialog.prototype.createStyle = function () {
            if (!this.styleElement) {
                this.styleElement = document.createElement('style');
                this.styleElement.type = 'text/css';
                document.head.appendChild(this.styleElement);
                var innerHTML = '';
                for (var breakpoint in this.breakpoints) {
                    innerHTML += "\n                    @media screen and (max-width: " + breakpoint + ") {\n                        .p-dialog[" + this.id + "] {\n                            width: " + this.breakpoints[breakpoint] + " !important;\n                        }\n                    }\n                ";
                }
                this.styleElement.innerHTML = innerHTML;
            }
        };
        ConfirmDialog.prototype.close = function (event) {
            if (this.confirmation.rejectEvent) {
                this.confirmation.rejectEvent.emit(i1.ConfirmEventType.CANCEL);
            }
            this.hide(i1.ConfirmEventType.CANCEL);
            event.preventDefault();
        };
        ConfirmDialog.prototype.hide = function (type) {
            this.onHide.emit(type);
            this.visible = false;
            this.confirmation = null;
            this.confirmationOptions = null;
        };
        ConfirmDialog.prototype.moveOnTop = function () {
            if (this.autoZIndex) {
                this.container.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
                this.wrapper.style.zIndex = String(this.baseZIndex + (dom.DomHandler.zindex - 1));
            }
        };
        ConfirmDialog.prototype.getMaskClass = function () {
            var maskClass = { 'p-dialog-mask p-component-overlay': true, 'p-dialog-mask-scrollblocker': this.blockScroll };
            maskClass[this.getPositionClass().toString()] = true;
            return maskClass;
        };
        ConfirmDialog.prototype.getPositionClass = function () {
            var _this = this;
            var positions = ['left', 'right', 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'];
            var pos = positions.find(function (item) { return item === _this.position; });
            return pos ? "p-dialog-" + pos : '';
        };
        ConfirmDialog.prototype.bindGlobalListeners = function () {
            var _this = this;
            if ((this.option('closeOnEscape') && this.closable) || this.focusTrap && !this.documentEscapeListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', function (event) {
                    if (event.which == 27 && (_this.option('closeOnEscape') && _this.closable)) {
                        if (parseInt(_this.container.style.zIndex) === (dom.DomHandler.zindex + _this.baseZIndex) && _this.visible) {
                            _this.close(event);
                        }
                    }
                    if (event.which === 9 && _this.focusTrap) {
                        event.preventDefault();
                        var focusableElements = dom.DomHandler.getFocusableElements(_this.container);
                        if (focusableElements && focusableElements.length > 0) {
                            if (!focusableElements[0].ownerDocument.activeElement) {
                                focusableElements[0].focus();
                            }
                            else {
                                var focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);
                                if (event.shiftKey) {
                                    if (focusedIndex == -1 || focusedIndex === 0)
                                        focusableElements[focusableElements.length - 1].focus();
                                    else
                                        focusableElements[focusedIndex - 1].focus();
                                }
                                else {
                                    if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                                        focusableElements[0].focus();
                                    else
                                        focusableElements[focusedIndex + 1].focus();
                                }
                            }
                        }
                    }
                });
            }
        };
        ConfirmDialog.prototype.unbindGlobalListeners = function () {
            if (this.documentEscapeListener) {
                this.documentEscapeListener();
                this.documentEscapeListener = null;
            }
        };
        ConfirmDialog.prototype.unbindMaskClickListener = function () {
            if (this.maskClickListener) {
                this.maskClickListener();
                this.maskClickListener = null;
            }
        };
        ConfirmDialog.prototype.onOverlayHide = function () {
            this.disableModality();
            this.unbindGlobalListeners();
            this.container = null;
        };
        ConfirmDialog.prototype.destroyStyle = function () {
            if (this.styleElement) {
                document.head.removeChild(this.styleElement);
                this.styleElement = null;
            }
        };
        ConfirmDialog.prototype.ngOnDestroy = function () {
            this.restoreAppend();
            this.onOverlayHide();
            this.subscription.unsubscribe();
            if (this.translationSubscription) {
                this.translationSubscription.unsubscribe();
            }
            this.destroyStyle();
        };
        ConfirmDialog.prototype.accept = function () {
            if (this.confirmation && this.confirmation.acceptEvent) {
                this.confirmation.acceptEvent.emit();
            }
            this.hide(i1.ConfirmEventType.ACCEPT);
        };
        ConfirmDialog.prototype.reject = function () {
            if (this.confirmation && this.confirmation.rejectEvent) {
                this.confirmation.rejectEvent.emit(i1.ConfirmEventType.REJECT);
            }
            this.hide(i1.ConfirmEventType.REJECT);
        };
        Object.defineProperty(ConfirmDialog.prototype, "acceptButtonLabel", {
            get: function () {
                return this.option('acceptLabel') || this.config.getTranslation(i1.TranslationKeys.ACCEPT);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfirmDialog.prototype, "rejectButtonLabel", {
            get: function () {
                return this.option('rejectLabel') || this.config.getTranslation(i1.TranslationKeys.REJECT);
            },
            enumerable: false,
            configurable: true
        });
        return ConfirmDialog;
    }());
    ConfirmDialog.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ConfirmDialog, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: i1__namespace.ConfirmationService }, { token: i0__namespace.NgZone }, { token: i0__namespace.ChangeDetectorRef }, { token: i1__namespace.PrimeNGConfig }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ConfirmDialog.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ConfirmDialog, selector: "p-confirmDialog", inputs: { header: "header", icon: "icon", message: "message", style: "style", styleClass: "styleClass", maskStyleClass: "maskStyleClass", acceptIcon: "acceptIcon", acceptLabel: "acceptLabel", acceptAriaLabel: "acceptAriaLabel", acceptVisible: "acceptVisible", rejectIcon: "rejectIcon", rejectLabel: "rejectLabel", rejectAriaLabel: "rejectAriaLabel", rejectVisible: "rejectVisible", acceptButtonStyleClass: "acceptButtonStyleClass", rejectButtonStyleClass: "rejectButtonStyleClass", closeOnEscape: "closeOnEscape", dismissableMask: "dismissableMask", blockScroll: "blockScroll", rtl: "rtl", closable: "closable", appendTo: "appendTo", key: "key", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", transitionOptions: "transitionOptions", focusTrap: "focusTrap", defaultFocus: "defaultFocus", breakpoints: "breakpoints", visible: "visible", position: "position" }, outputs: { onHide: "onHide" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "footer", first: true, predicate: i1.Footer, descendants: true }, { propertyName: "templates", predicate: i1.PrimeTemplate }], viewQueries: [{ propertyName: "contentViewChild", first: true, predicate: ["content"], descendants: true }], ngImport: i0__namespace, template: "\n        <div [class]=\"maskStyleClass\" [ngClass]=\"getMaskClass()\" *ngIf=\"maskVisible\">\n            <div [ngClass]=\"{'p-dialog p-confirm-dialog p-component':true,'p-dialog-rtl':rtl}\" [ngStyle]=\"style\" [class]=\"styleClass\" (mousedown)=\"moveOnTop()\"\n                [@animation]=\"{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}\" (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\" *ngIf=\"visible\">\n                <div class=\"p-dialog-header\" *ngIf=\"headerTemplate\">\n                    <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                </div>\n                <div class=\"p-dialog-header\" *ngIf=\"!headerTemplate\">\n                    <span class=\"p-dialog-title\" *ngIf=\"option('header')\">{{option('header')}}</span>\n                    <div class=\"p-dialog-header-icons\">\n                        <button *ngIf=\"closable\" type=\"button\" [ngClass]=\"{'p-dialog-header-icon p-dialog-header-close p-link':true}\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\">\n                            <span class=\"pi pi-times\"></span>\n                        </button>\n                    </div>\n                </div>\n                <div #content class=\"p-dialog-content\">\n                    <i [ngClass]=\"'p-confirm-dialog-icon'\" [class]=\"option('icon')\" *ngIf=\"option('icon')\"></i>\n                    <span class=\"p-confirm-dialog-message\" [innerHTML]=\"option('message')\"></span>\n                </div>\n                <div class=\"p-dialog-footer\" *ngIf=\"footer || footerTemplate\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                    <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n                </div>\n                <div class=\"p-dialog-footer\" *ngIf=\"!footer && !footerTemplate\">\n                    <button type=\"button\" pRipple pButton [icon]=\"option('rejectIcon')\" [label]=\"rejectButtonLabel\" (click)=\"reject()\" [ngClass]=\"'p-confirm-dialog-reject'\" [class]=\"option('rejectButtonStyleClass')\" *ngIf=\"option('rejectVisible')\" [attr.aria-label]=\"rejectAriaLabel\"></button>\n                    <button type=\"button\" pRipple pButton [icon]=\"option('acceptIcon')\" [label]=\"acceptButtonLabel\" (click)=\"accept()\" [ngClass]=\"'p-confirm-dialog-accept'\" [class]=\"option('acceptButtonStyleClass')\" *ngIf=\"option('acceptVisible')\" [attr.aria-label]=\"acceptAriaLabel\"></button>\n                </div>\n            </div>\n        </div>\n    ", isInline: true, styles: [".p-dialog-mask{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;pointer-events:none;background-color:transparent;transition-property:background-color}.p-dialog,.p-dialog-mask.p-component-overlay{pointer-events:auto}.p-dialog{display:flex;flex-direction:column;max-height:90%;transform:scale(1);position:relative}.p-dialog-content{overflow-y:auto;flex-grow:1}.p-dialog-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0}.p-dialog-footer{flex-shrink:0}.p-dialog .p-dialog-header-icons{display:flex;align-items:center}.p-dialog .p-dialog-header-icon{display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-dialog-mask.p-dialog-mask-leave{background-color:transparent}.p-fluid .p-dialog-footer .p-button{width:auto}.p-dialog-bottom-left .p-dialog,.p-dialog-bottom-right .p-dialog,.p-dialog-bottom .p-dialog,.p-dialog-left .p-dialog,.p-dialog-right .p-dialog,.p-dialog-top-left .p-dialog,.p-dialog-top-right .p-dialog,.p-dialog-top .p-dialog{margin:.75rem;transform:translateZ(0)}.p-dialog-maximized{transition:none;transform:none;width:100vw!important;height:100vh!important;top:0!important;left:0!important;max-height:100%;height:100%}.p-dialog-maximized .p-dialog-content{flex-grow:1}.p-dialog-left{justify-content:flex-start}.p-dialog-right{justify-content:flex-end}.p-dialog-top,.p-dialog-top-left{align-items:flex-start}.p-dialog-top-left{justify-content:flex-start}.p-dialog-top-right{justify-content:flex-end;align-items:flex-start}.p-dialog-bottom{align-items:flex-end}.p-dialog-bottom-left{justify-content:flex-start;align-items:flex-end}.p-dialog-bottom-right{justify-content:flex-end;align-items:flex-end}.p-dialog .p-resizable-handle{position:absolute;font-size:.1px;display:block;cursor:se-resize;width:12px;height:12px;right:1px;bottom:1px}.p-confirm-dialog .p-dialog-content{display:flex;align-items:center}"], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3__namespace.Ripple, selector: "[pRipple]" }, { type: i4__namespace.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }], animations: [
            animations.trigger('animation', [
                animations.transition('void => visible', [
                    animations.useAnimation(showAnimation)
                ]),
                animations.transition('visible => void', [
                    animations.useAnimation(hideAnimation)
                ])
            ])
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ConfirmDialog, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-confirmDialog',
                        template: "\n        <div [class]=\"maskStyleClass\" [ngClass]=\"getMaskClass()\" *ngIf=\"maskVisible\">\n            <div [ngClass]=\"{'p-dialog p-confirm-dialog p-component':true,'p-dialog-rtl':rtl}\" [ngStyle]=\"style\" [class]=\"styleClass\" (mousedown)=\"moveOnTop()\"\n                [@animation]=\"{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}\" (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\" *ngIf=\"visible\">\n                <div class=\"p-dialog-header\" *ngIf=\"headerTemplate\">\n                    <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                </div>\n                <div class=\"p-dialog-header\" *ngIf=\"!headerTemplate\">\n                    <span class=\"p-dialog-title\" *ngIf=\"option('header')\">{{option('header')}}</span>\n                    <div class=\"p-dialog-header-icons\">\n                        <button *ngIf=\"closable\" type=\"button\" [ngClass]=\"{'p-dialog-header-icon p-dialog-header-close p-link':true}\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\">\n                            <span class=\"pi pi-times\"></span>\n                        </button>\n                    </div>\n                </div>\n                <div #content class=\"p-dialog-content\">\n                    <i [ngClass]=\"'p-confirm-dialog-icon'\" [class]=\"option('icon')\" *ngIf=\"option('icon')\"></i>\n                    <span class=\"p-confirm-dialog-message\" [innerHTML]=\"option('message')\"></span>\n                </div>\n                <div class=\"p-dialog-footer\" *ngIf=\"footer || footerTemplate\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                    <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n                </div>\n                <div class=\"p-dialog-footer\" *ngIf=\"!footer && !footerTemplate\">\n                    <button type=\"button\" pRipple pButton [icon]=\"option('rejectIcon')\" [label]=\"rejectButtonLabel\" (click)=\"reject()\" [ngClass]=\"'p-confirm-dialog-reject'\" [class]=\"option('rejectButtonStyleClass')\" *ngIf=\"option('rejectVisible')\" [attr.aria-label]=\"rejectAriaLabel\"></button>\n                    <button type=\"button\" pRipple pButton [icon]=\"option('acceptIcon')\" [label]=\"acceptButtonLabel\" (click)=\"accept()\" [ngClass]=\"'p-confirm-dialog-accept'\" [class]=\"option('acceptButtonStyleClass')\" *ngIf=\"option('acceptVisible')\" [attr.aria-label]=\"acceptAriaLabel\"></button>\n                </div>\n            </div>\n        </div>\n    ",
                        animations: [
                            animations.trigger('animation', [
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
                        styleUrls: ['../dialog/dialog.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: i1__namespace.ConfirmationService }, { type: i0__namespace.NgZone }, { type: i0__namespace.ChangeDetectorRef }, { type: i1__namespace.PrimeNGConfig }]; }, propDecorators: { header: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], message: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], maskStyleClass: [{
                    type: i0.Input
                }], acceptIcon: [{
                    type: i0.Input
                }], acceptLabel: [{
                    type: i0.Input
                }], acceptAriaLabel: [{
                    type: i0.Input
                }], acceptVisible: [{
                    type: i0.Input
                }], rejectIcon: [{
                    type: i0.Input
                }], rejectLabel: [{
                    type: i0.Input
                }], rejectAriaLabel: [{
                    type: i0.Input
                }], rejectVisible: [{
                    type: i0.Input
                }], acceptButtonStyleClass: [{
                    type: i0.Input
                }], rejectButtonStyleClass: [{
                    type: i0.Input
                }], closeOnEscape: [{
                    type: i0.Input
                }], dismissableMask: [{
                    type: i0.Input
                }], blockScroll: [{
                    type: i0.Input
                }], rtl: [{
                    type: i0.Input
                }], closable: [{
                    type: i0.Input
                }], appendTo: [{
                    type: i0.Input
                }], key: [{
                    type: i0.Input
                }], autoZIndex: [{
                    type: i0.Input
                }], baseZIndex: [{
                    type: i0.Input
                }], transitionOptions: [{
                    type: i0.Input
                }], focusTrap: [{
                    type: i0.Input
                }], defaultFocus: [{
                    type: i0.Input
                }], breakpoints: [{
                    type: i0.Input
                }], visible: [{
                    type: i0.Input
                }], position: [{
                    type: i0.Input
                }], onHide: [{
                    type: i0.Output
                }], footer: [{
                    type: i0.ContentChild,
                    args: [i1.Footer]
                }], contentViewChild: [{
                    type: i0.ViewChild,
                    args: ['content']
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [i1.PrimeTemplate]
                }] } });
    var ConfirmDialogModule = /** @class */ (function () {
        function ConfirmDialogModule() {
        }
        return ConfirmDialogModule;
    }());
    ConfirmDialogModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ConfirmDialogModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ConfirmDialogModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ConfirmDialogModule, declarations: [ConfirmDialog], imports: [i2.CommonModule, i4.ButtonModule, i3.RippleModule], exports: [ConfirmDialog, i4.ButtonModule, i1.SharedModule] });
    ConfirmDialogModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ConfirmDialogModule, imports: [[i2.CommonModule, i4.ButtonModule, i3.RippleModule], i4.ButtonModule, i1.SharedModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ConfirmDialogModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule, i4.ButtonModule, i3.RippleModule],
                        exports: [ConfirmDialog, i4.ButtonModule, i1.SharedModule],
                        declarations: [ConfirmDialog]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ConfirmDialog = ConfirmDialog;
    exports.ConfirmDialogModule = ConfirmDialogModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-confirmdialog.umd.js.map
