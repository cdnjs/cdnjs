(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom'), require('primeng/utils'), require('rxjs'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/dynamicdialog', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom', 'primeng/utils', 'rxjs', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.dynamicdialog = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom, global.primeng.utils, global.rxjs, global.primeng.api));
}(this, (function (exports, i0, animations, i4, dom, utils, rxjs, i3) { 'use strict';

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
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);

    var DynamicDialogContent = /** @class */ (function () {
        function DynamicDialogContent(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
        return DynamicDialogContent;
    }());
    DynamicDialogContent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DynamicDialogContent, deps: [{ token: i0__namespace.ViewContainerRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    DynamicDialogContent.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: DynamicDialogContent, selector: "[pDynamicDialogContent]", host: { classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DynamicDialogContent, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pDynamicDialogContent]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ViewContainerRef }]; } });

    var DynamicDialogConfig = /** @class */ (function () {
        function DynamicDialogConfig() {
        }
        return DynamicDialogConfig;
    }());

    var DynamicDialogRef = /** @class */ (function () {
        function DynamicDialogRef() {
            this._onClose = new rxjs.Subject();
            this.onClose = this._onClose.asObservable();
            this._onDestroy = new rxjs.Subject();
            this.onDestroy = this._onDestroy.asObservable();
        }
        DynamicDialogRef.prototype.close = function (result) {
            this._onClose.next(result);
        };
        DynamicDialogRef.prototype.destroy = function () {
            this._onDestroy.next();
        };
        return DynamicDialogRef;
    }());

    var showAnimation = animations.animation([
        animations.style({ transform: '{{transform}}', opacity: 0 }),
        animations.animate('{{transition}}', animations.style({ transform: 'none', opacity: 1 }))
    ]);
    var hideAnimation = animations.animation([
        animations.animate('{{transition}}', animations.style({ transform: '{{transform}}', opacity: 0 }))
    ]);
    var DynamicDialogComponent = /** @class */ (function () {
        function DynamicDialogComponent(componentFactoryResolver, cd, renderer, config, dialogRef, zone, primeNGConfig) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.cd = cd;
            this.renderer = renderer;
            this.config = config;
            this.dialogRef = dialogRef;
            this.zone = zone;
            this.primeNGConfig = primeNGConfig;
            this.visible = true;
            this.transformOptions = "scale(0.7)";
        }
        DynamicDialogComponent.prototype.ngAfterViewInit = function () {
            this.loadChildComponent(this.childComponentType);
            this.cd.detectChanges();
        };
        DynamicDialogComponent.prototype.loadChildComponent = function (componentType) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
            var viewContainerRef = this.insertionPoint.viewContainerRef;
            viewContainerRef.clear();
            this.componentRef = viewContainerRef.createComponent(componentFactory);
        };
        DynamicDialogComponent.prototype.moveOnTop = function () {
            if (this.config.autoZIndex !== false) {
                utils.ZIndexUtils.set('modal', this.container, (this.config.baseZIndex || 0) + this.primeNGConfig.zIndex.modal);
                this.wrapper.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1);
            }
        };
        DynamicDialogComponent.prototype.onAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.container = event.element;
                    this.wrapper = this.container.parentElement;
                    this.moveOnTop();
                    this.bindGlobalListeners();
                    if (this.config.modal !== false) {
                        this.enableModality();
                    }
                    this.focus();
                    break;
                case 'void':
                    this.onContainerDestroy();
                    break;
            }
        };
        DynamicDialogComponent.prototype.onAnimationEnd = function (event) {
            if (event.toState === 'void') {
                this.dialogRef.destroy();
            }
        };
        DynamicDialogComponent.prototype.onContainerDestroy = function () {
            this.unbindGlobalListeners();
            if (this.container && this.config.autoZIndex !== false) {
                utils.ZIndexUtils.clear(this.container);
            }
            if (this.config.modal !== false) {
                this.disableModality();
            }
            this.container = null;
        };
        DynamicDialogComponent.prototype.close = function () {
            this.visible = false;
            this.cd.markForCheck();
        };
        DynamicDialogComponent.prototype.hide = function () {
            if (this.dialogRef) {
                this.dialogRef.close();
            }
        };
        DynamicDialogComponent.prototype.enableModality = function () {
            var _this = this;
            if (this.config.closable !== false && this.config.dismissableMask) {
                this.maskClickListener = this.renderer.listen(this.wrapper, 'mousedown', function (event) {
                    if (_this.wrapper && _this.wrapper.isSameNode(event.target)) {
                        _this.hide();
                    }
                });
            }
            if (this.config.modal !== false) {
                dom.DomHandler.addClass(document.body, 'p-overflow-hidden');
            }
        };
        DynamicDialogComponent.prototype.disableModality = function () {
            if (this.wrapper) {
                if (this.config.dismissableMask) {
                    this.unbindMaskClickListener();
                }
                if (this.config.modal !== false) {
                    dom.DomHandler.removeClass(document.body, 'p-overflow-hidden');
                }
                if (!this.cd.destroyed) {
                    this.cd.detectChanges();
                }
            }
        };
        DynamicDialogComponent.prototype.onKeydown = function (event) {
            if (event.which === 9) {
                event.preventDefault();
                var focusableElements = dom.DomHandler.getFocusableElements(this.container);
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
        };
        DynamicDialogComponent.prototype.focus = function () {
            var focusable = dom.DomHandler.findSingle(this.container, '[autofocus]');
            if (focusable) {
                this.zone.runOutsideAngular(function () {
                    setTimeout(function () { return focusable.focus(); }, 5);
                });
            }
        };
        DynamicDialogComponent.prototype.bindGlobalListeners = function () {
            this.bindDocumentKeydownListener();
            if (this.config.closeOnEscape !== false && this.config.closable !== false) {
                this.bindDocumentEscapeListener();
            }
        };
        DynamicDialogComponent.prototype.unbindGlobalListeners = function () {
            this.unbindDocumentKeydownListener();
            this.unbindDocumentEscapeListener();
        };
        DynamicDialogComponent.prototype.bindDocumentKeydownListener = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.documentKeydownListener = _this.onKeydown.bind(_this);
                window.document.addEventListener('keydown', _this.documentKeydownListener);
            });
        };
        DynamicDialogComponent.prototype.unbindDocumentKeydownListener = function () {
            if (this.documentKeydownListener) {
                window.document.removeEventListener('keydown', this.documentKeydownListener);
                this.documentKeydownListener = null;
            }
        };
        DynamicDialogComponent.prototype.bindDocumentEscapeListener = function () {
            var _this = this;
            var documentTarget = this.maskViewChild ? this.maskViewChild.nativeElement.ownerDocument : 'document';
            this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', function (event) {
                if (event.which == 27) {
                    if (parseInt(_this.container.style.zIndex) == (dom.DomHandler.zindex + (_this.config.baseZIndex ? _this.config.baseZIndex : 0))) {
                        _this.hide();
                    }
                }
            });
        };
        DynamicDialogComponent.prototype.unbindDocumentEscapeListener = function () {
            if (this.documentEscapeListener) {
                this.documentEscapeListener();
                this.documentEscapeListener = null;
            }
        };
        DynamicDialogComponent.prototype.unbindMaskClickListener = function () {
            if (this.maskClickListener) {
                this.maskClickListener();
                this.maskClickListener = null;
            }
        };
        DynamicDialogComponent.prototype.ngOnDestroy = function () {
            this.onContainerDestroy();
            if (this.componentRef) {
                this.componentRef.destroy();
            }
        };
        return DynamicDialogComponent;
    }());
    DynamicDialogComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DynamicDialogComponent, deps: [{ token: i0__namespace.ComponentFactoryResolver }, { token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.Renderer2 }, { token: DynamicDialogConfig }, { token: DynamicDialogRef }, { token: i0__namespace.NgZone }, { token: i3__namespace.PrimeNGConfig }], target: i0__namespace.ɵɵFactoryTarget.Component });
    DynamicDialogComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: DynamicDialogComponent, selector: "p-dynamicDialog", host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "insertionPoint", first: true, predicate: DynamicDialogContent, descendants: true }, { propertyName: "maskViewChild", first: true, predicate: ["mask"], descendants: true }], ngImport: i0__namespace, template: "\n        <div #mask [ngClass]=\"{'p-dialog-mask':true, 'p-component-overlay p-dialog-mask-scrollblocker': config.modal !== false}\">\n            <div [ngClass]=\"{'p-dialog p-dynamic-dialog p-component':true, 'p-dialog-rtl': config.rtl}\" [ngStyle]=\"config.style\" [class]=\"config.styleClass\"\n                [@animation]=\"{value: 'visible', params: {transform: transformOptions, transition: config.transitionOptions || '150ms cubic-bezier(0, 0, 0.2, 1)'}}\"\n                (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\" role=\"dialog\" *ngIf=\"visible\"\n                [style.width]=\"config.width\" [style.height]=\"config.height\">\n                <div class=\"p-dialog-header\" *ngIf=\"config.showHeader === false ? false: true\">\n                    <span class=\"p-dialog-title\">{{config.header}}</span>\n                    <div class=\"p-dialog-header-icons\">\n                        <button [ngClass]=\"'p-dialog-header-icon p-dialog-header-maximize p-link'\" type=\"button\" (click)=\"hide()\" (keydown.enter)=\"hide()\" *ngIf=\"config.closable !== false\">\n                            <span class=\"p-dialog-header-close-icon pi pi-times\"></span>\n                        </button>\n                    </div>\n                </div>\n                <div class=\"p-dialog-content\" [ngStyle]=\"config.contentStyle\">\n                    <ng-template pDynamicDialogContent></ng-template>\n                </div>\n                <div class=\"p-dialog-footer\" *ngIf=\"config.footer\">\n                    {{config.footer}}\n                </div>\n            </div>\n        </div>\n\t", isInline: true, styles: [".p-dialog-mask{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;pointer-events:none;background-color:transparent;transition-property:background-color}.p-dialog,.p-dialog-mask.p-component-overlay{pointer-events:auto}.p-dialog{display:flex;flex-direction:column;max-height:90%;transform:scale(1);position:relative}.p-dialog-content{overflow-y:auto;flex-grow:1}.p-dialog-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0}.p-dialog-footer{flex-shrink:0}.p-dialog .p-dialog-header-icons{display:flex;align-items:center}.p-dialog .p-dialog-header-icon{display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-dialog-mask.p-dialog-mask-leave{background-color:transparent}.p-fluid .p-dialog-footer .p-button{width:auto}.p-dialog-bottom-left .p-dialog,.p-dialog-bottom-right .p-dialog,.p-dialog-bottom .p-dialog,.p-dialog-left .p-dialog,.p-dialog-right .p-dialog,.p-dialog-top-left .p-dialog,.p-dialog-top-right .p-dialog,.p-dialog-top .p-dialog{margin:.75rem;transform:translateZ(0)}.p-dialog-maximized{transition:none;transform:none;width:100vw!important;height:100vh!important;top:0!important;left:0!important;max-height:100%;height:100%}.p-dialog-maximized .p-dialog-content{flex-grow:1}.p-dialog-left{justify-content:flex-start}.p-dialog-right{justify-content:flex-end}.p-dialog-top,.p-dialog-top-left{align-items:flex-start}.p-dialog-top-left{justify-content:flex-start}.p-dialog-top-right{justify-content:flex-end;align-items:flex-start}.p-dialog-bottom{align-items:flex-end}.p-dialog-bottom-left{justify-content:flex-start;align-items:flex-end}.p-dialog-bottom-right{justify-content:flex-end;align-items:flex-end}.p-dialog .p-resizable-handle{position:absolute;font-size:.1px;display:block;cursor:se-resize;width:12px;height:12px;right:1px;bottom:1px}.p-confirm-dialog .p-dialog-content{display:flex;align-items:center}"], directives: [{ type: i0__namespace.forwardRef(function () { return i4__namespace.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i0__namespace.forwardRef(function () { return i4__namespace.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i0__namespace.forwardRef(function () { return i4__namespace.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i0__namespace.forwardRef(function () { return DynamicDialogContent; }), selector: "[pDynamicDialogContent]" }], animations: [
            animations.trigger('animation', [
                animations.transition('void => visible', [
                    animations.useAnimation(showAnimation)
                ]),
                animations.transition('visible => void', [
                    animations.useAnimation(hideAnimation)
                ])
            ])
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.Default, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DynamicDialogComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-dynamicDialog',
                        template: "\n        <div #mask [ngClass]=\"{'p-dialog-mask':true, 'p-component-overlay p-dialog-mask-scrollblocker': config.modal !== false}\">\n            <div [ngClass]=\"{'p-dialog p-dynamic-dialog p-component':true, 'p-dialog-rtl': config.rtl}\" [ngStyle]=\"config.style\" [class]=\"config.styleClass\"\n                [@animation]=\"{value: 'visible', params: {transform: transformOptions, transition: config.transitionOptions || '150ms cubic-bezier(0, 0, 0.2, 1)'}}\"\n                (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\" role=\"dialog\" *ngIf=\"visible\"\n                [style.width]=\"config.width\" [style.height]=\"config.height\">\n                <div class=\"p-dialog-header\" *ngIf=\"config.showHeader === false ? false: true\">\n                    <span class=\"p-dialog-title\">{{config.header}}</span>\n                    <div class=\"p-dialog-header-icons\">\n                        <button [ngClass]=\"'p-dialog-header-icon p-dialog-header-maximize p-link'\" type=\"button\" (click)=\"hide()\" (keydown.enter)=\"hide()\" *ngIf=\"config.closable !== false\">\n                            <span class=\"p-dialog-header-close-icon pi pi-times\"></span>\n                        </button>\n                    </div>\n                </div>\n                <div class=\"p-dialog-content\" [ngStyle]=\"config.contentStyle\">\n                    <ng-template pDynamicDialogContent></ng-template>\n                </div>\n                <div class=\"p-dialog-footer\" *ngIf=\"config.footer\">\n                    {{config.footer}}\n                </div>\n            </div>\n        </div>\n\t",
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
                        changeDetection: i0.ChangeDetectionStrategy.Default,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['../dialog/dialog.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ComponentFactoryResolver }, { type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.Renderer2 }, { type: DynamicDialogConfig }, { type: DynamicDialogRef }, { type: i0__namespace.NgZone }, { type: i3__namespace.PrimeNGConfig }]; }, propDecorators: { insertionPoint: [{
                    type: i0.ViewChild,
                    args: [DynamicDialogContent]
                }], maskViewChild: [{
                    type: i0.ViewChild,
                    args: ['mask']
                }] } });
    var DynamicDialogModule = /** @class */ (function () {
        function DynamicDialogModule() {
        }
        return DynamicDialogModule;
    }());
    DynamicDialogModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DynamicDialogModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DynamicDialogModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DynamicDialogModule, declarations: [DynamicDialogComponent, DynamicDialogContent], imports: [i4.CommonModule] });
    DynamicDialogModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DynamicDialogModule, imports: [[i4.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DynamicDialogModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i4.CommonModule],
                        declarations: [DynamicDialogComponent, DynamicDialogContent],
                        entryComponents: [DynamicDialogComponent]
                    }]
            }] });

    var DynamicDialogInjector = /** @class */ (function () {
        function DynamicDialogInjector(_parentInjector, _additionalTokens) {
            this._parentInjector = _parentInjector;
            this._additionalTokens = _additionalTokens;
        }
        DynamicDialogInjector.prototype.get = function (token, notFoundValue, flags) {
            var value = this._additionalTokens.get(token);
            if (value)
                return value;
            return this._parentInjector.get(token, notFoundValue);
        };
        return DynamicDialogInjector;
    }());

    var DialogService = /** @class */ (function () {
        function DialogService(componentFactoryResolver, appRef, injector) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.appRef = appRef;
            this.injector = injector;
            this.dialogComponentRefMap = new Map();
        }
        DialogService.prototype.open = function (componentType, config) {
            var dialogRef = this.appendDialogComponentToBody(config);
            this.dialogComponentRefMap.get(dialogRef).instance.childComponentType = componentType;
            return dialogRef;
        };
        DialogService.prototype.appendDialogComponentToBody = function (config) {
            var _this = this;
            var map = new WeakMap();
            map.set(DynamicDialogConfig, config);
            var dialogRef = new DynamicDialogRef();
            map.set(DynamicDialogRef, dialogRef);
            var sub = dialogRef.onClose.subscribe(function () {
                _this.dialogComponentRefMap.get(dialogRef).instance.close();
            });
            var destroySub = dialogRef.onDestroy.subscribe(function () {
                _this.removeDialogComponentFromBody(dialogRef);
                destroySub.unsubscribe();
                sub.unsubscribe();
            });
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicDialogComponent);
            var componentRef = componentFactory.create(new DynamicDialogInjector(this.injector, map));
            this.appRef.attachView(componentRef.hostView);
            var domElem = componentRef.hostView.rootNodes[0];
            document.body.appendChild(domElem);
            this.dialogComponentRefMap.set(dialogRef, componentRef);
            return dialogRef;
        };
        DialogService.prototype.removeDialogComponentFromBody = function (dialogRef) {
            if (!dialogRef || !this.dialogComponentRefMap.has(dialogRef)) {
                return;
            }
            var dialogComponentRef = this.dialogComponentRefMap.get(dialogRef);
            this.appRef.detachView(dialogComponentRef.hostView);
            dialogComponentRef.destroy();
            this.dialogComponentRefMap.delete(dialogRef);
        };
        return DialogService;
    }());
    DialogService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DialogService, deps: [{ token: i0__namespace.ComponentFactoryResolver }, { token: i0__namespace.ApplicationRef }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    DialogService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DialogService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: DialogService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i0__namespace.ComponentFactoryResolver }, { type: i0__namespace.ApplicationRef }, { type: i0__namespace.Injector }]; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DialogService = DialogService;
    exports.DynamicDialogComponent = DynamicDialogComponent;
    exports.DynamicDialogConfig = DynamicDialogConfig;
    exports.DynamicDialogInjector = DynamicDialogInjector;
    exports.DynamicDialogModule = DynamicDialogModule;
    exports.DynamicDialogRef = DynamicDialogRef;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-dynamicdialog.umd.js.map
