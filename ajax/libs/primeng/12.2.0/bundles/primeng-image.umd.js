(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('@angular/animations'), require('primeng/dom'), require('primeng/utils')) :
    typeof define === 'function' && define.amd ? define('primeng/image', ['exports', '@angular/core', '@angular/common', 'primeng/api', '@angular/animations', 'primeng/dom', 'primeng/utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.image = {}), global.ng.core, global.ng.common, global.primeng.api, global.ng.animations, global.primeng.dom, global.primeng.utils));
})(this, (function (exports, i0, i2, i1, animations, dom, utils) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var Image = /** @class */ (function () {
        function Image(config, cd) {
            this.config = config;
            this.cd = cd;
            this.preview = false;
            this.showTransitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
            this.onShow = new i0.EventEmitter();
            this.onHide = new i0.EventEmitter();
            this.maskVisible = false;
            this.previewVisible = false;
            this.rotate = 0;
            this.scale = 1;
            this.previewClick = false;
        }
        Image.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'indicator':
                        _this.indicatorTemplate = item.template;
                        break;
                    default:
                        _this.indicatorTemplate = item.template;
                        break;
                }
            });
        };
        Image.prototype.onImageClick = function () {
            if (this.preview) {
                this.maskVisible = true;
                this.previewVisible = true;
            }
        };
        Image.prototype.onMaskClick = function () {
            if (!this.previewClick) {
                this.previewVisible = false;
                this.rotate = 0;
                this.scale = 1;
            }
            this.previewClick = false;
        };
        Image.prototype.onPreviewImageClick = function () {
            this.previewClick = true;
        };
        Image.prototype.rotateRight = function () {
            this.rotate += 90;
            this.previewClick = true;
        };
        Image.prototype.rotateLeft = function () {
            this.rotate -= 90;
            this.previewClick = true;
        };
        Image.prototype.zoomIn = function () {
            this.scale = this.scale + 0.1;
            this.previewClick = true;
        };
        Image.prototype.zoomOut = function () {
            this.scale = this.scale - 0.1;
            this.previewClick = true;
        };
        Image.prototype.zoomDisabled = function () {
            return this.scale <= 0.5 || this.scale >= 1.5;
        };
        Image.prototype.onAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.container = event.element;
                    this.wrapper = this.container.parentElement;
                    this.appendContainer();
                    this.moveOnTop();
                    break;
                case 'void':
                    dom.DomHandler.addClass(this.wrapper, 'p-component-overlay-leave');
                    break;
            }
        };
        Image.prototype.onAnimationEnd = function (event) {
            switch (event.toState) {
                case 'void':
                    utils.ZIndexUtils.clear(this.container);
                    this.maskVisible = false;
                    this.container = null;
                    this.wrapper = null;
                    this.cd.markForCheck();
                    this.onHide.emit({});
                    break;
                case 'visible':
                    this.onShow.emit({});
                    break;
            }
        };
        Image.prototype.moveOnTop = function () {
            utils.ZIndexUtils.set('modal', this.container, this.config.zIndex.modal);
            this.wrapper.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1);
        };
        Image.prototype.appendContainer = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.wrapper);
                else
                    dom.DomHandler.appendChild(this.wrapper, this.appendTo);
            }
        };
        Image.prototype.imagePreviewStyle = function () {
            return { transform: 'rotate(' + this.rotate + 'deg) scale(' + this.scale + ')' };
        };
        Image.prototype.containerClass = function () {
            return {
                'p-image p-component': true,
                'p-image-preview-container': this.preview
            };
        };
        return Image;
    }());
    Image.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Image, deps: [{ token: i1__namespace.PrimeNGConfig }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Image.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Image, selector: "p-image", inputs: { imageClass: "imageClass", imageStyle: "imageStyle", styleClass: "styleClass", style: "style", src: "src", alt: "alt", width: "width", height: "height", appendTo: "appendTo", preview: "preview", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onShow: "onShow", onHide: "onHide" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: i1.PrimeTemplate }], viewQueries: [{ propertyName: "mask", first: true, predicate: ["mask"], descendants: true }], ngImport: i0__namespace, template: "\n        <span [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <img [attr.src]=\"src\" [attr.alt]=\"alt\" [attr.width]=\"width\" [attr.height]=\"height\" [ngStyle]=\"imageStyle\" [class]=\"imageClass\" />\n            <div class=\"p-image-preview-indicator\" *ngIf=\"preview\" (click)=\"onImageClick()\">\n                <ng-container *ngIf=\"indicatorTemplate;else defaultTemplate\">\n                    <ng-container *ngTemplateOutlet=\"indicatorTemplate\"></ng-container>\n                </ng-container>\n                <ng-template #defaultTemplate>\n                    <i class=\"p-image-preview-icon pi pi-eye\"></i>\n                </ng-template>\n            </div>\n            <div #mask class=\"p-image-mask p-component-overlay p-component-overlay-enter\" *ngIf=\"maskVisible\" (click)=\"onMaskClick()\">\n                <div class=\"p-image-toolbar\">\n                    <button class=\"p-image-action p-link\" (click)=\"rotateRight()\" type=\"button\">\n                        <i class=\"pi pi-refresh\"></i>\n                    </button>\n                    <button class=\"p-image-action p-link\" (click)=\"rotateLeft()\" type=\"button\">\n                        <i class=\"pi pi-undo\"></i>\n                    </button>\n                    <button class=\"p-image-action p-link\" (click)=\"zoomOut()\" type=\"button\" [disabled]=\"zoomDisabled()\">\n                        <i class=\"pi pi-search-minus\"></i>\n                    </button>\n                    <button class=\"p-image-action p-link\" (click)=\"zoomIn()\" type=\"button\" [disabled]=\"zoomDisabled()\">\n                        <i class=\"pi pi-search-plus\"></i>\n                    </button>\n                    <button class=\"p-image-action p-link\" type=\"button\">\n                        <i class=\"pi pi-times\"></i>\n                    </button>\n                </div>\n                <div *ngIf=\"previewVisible\" [@animation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\"\n                    (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\">\n                    <img [attr.src]=\"src\" class=\"p-image-preview\" [ngStyle]=\"imagePreviewStyle()\" (click)=\"onPreviewImageClick()\"/>\n                </div>\n            </div>\n        </span>\n    ", isInline: true, styles: [".p-image-mask{display:flex;align-items:center;justify-content:center}.p-image-preview-container{position:relative;display:inline-block}.p-image-preview-indicator{position:absolute;left:0;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s}.p-image-preview-icon{font-size:1.5rem}.p-image-preview-container:hover>.p-image-preview-indicator{opacity:1;cursor:pointer}.p-image-preview-container>img{cursor:pointer}.p-image-toolbar{position:absolute;top:0;right:0;display:flex}.p-image-action.p-link{display:flex;justify-content:center;align-items:center}.p-image-preview{transition:transform .15s;max-width:100vw;max-height:100vh}"], directives: [{ type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [
            animations.trigger('animation', [
                animations.transition('void => visible', [
                    animations.style({ transform: 'scale(0.7)', opacity: 0 }),
                    animations.animate('{{showTransitionParams}}')
                ]),
                animations.transition('visible => void', [
                    animations.animate('{{hideTransitionParams}}', animations.style({ transform: 'scale(0.7)', opacity: 0 }))
                ])
            ])
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Image, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-image',
                        template: "\n        <span [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <img [attr.src]=\"src\" [attr.alt]=\"alt\" [attr.width]=\"width\" [attr.height]=\"height\" [ngStyle]=\"imageStyle\" [class]=\"imageClass\" />\n            <div class=\"p-image-preview-indicator\" *ngIf=\"preview\" (click)=\"onImageClick()\">\n                <ng-container *ngIf=\"indicatorTemplate;else defaultTemplate\">\n                    <ng-container *ngTemplateOutlet=\"indicatorTemplate\"></ng-container>\n                </ng-container>\n                <ng-template #defaultTemplate>\n                    <i class=\"p-image-preview-icon pi pi-eye\"></i>\n                </ng-template>\n            </div>\n            <div #mask class=\"p-image-mask p-component-overlay p-component-overlay-enter\" *ngIf=\"maskVisible\" (click)=\"onMaskClick()\">\n                <div class=\"p-image-toolbar\">\n                    <button class=\"p-image-action p-link\" (click)=\"rotateRight()\" type=\"button\">\n                        <i class=\"pi pi-refresh\"></i>\n                    </button>\n                    <button class=\"p-image-action p-link\" (click)=\"rotateLeft()\" type=\"button\">\n                        <i class=\"pi pi-undo\"></i>\n                    </button>\n                    <button class=\"p-image-action p-link\" (click)=\"zoomOut()\" type=\"button\" [disabled]=\"zoomDisabled()\">\n                        <i class=\"pi pi-search-minus\"></i>\n                    </button>\n                    <button class=\"p-image-action p-link\" (click)=\"zoomIn()\" type=\"button\" [disabled]=\"zoomDisabled()\">\n                        <i class=\"pi pi-search-plus\"></i>\n                    </button>\n                    <button class=\"p-image-action p-link\" type=\"button\">\n                        <i class=\"pi pi-times\"></i>\n                    </button>\n                </div>\n                <div *ngIf=\"previewVisible\" [@animation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\"\n                    (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\">\n                    <img [attr.src]=\"src\" class=\"p-image-preview\" [ngStyle]=\"imagePreviewStyle()\" (click)=\"onPreviewImageClick()\"/>\n                </div>\n            </div>\n        </span>\n    ",
                        animations: [
                            animations.trigger('animation', [
                                animations.transition('void => visible', [
                                    animations.style({ transform: 'scale(0.7)', opacity: 0 }),
                                    animations.animate('{{showTransitionParams}}')
                                ]),
                                animations.transition('visible => void', [
                                    animations.animate('{{hideTransitionParams}}', animations.style({ transform: 'scale(0.7)', opacity: 0 }))
                                ])
                            ])
                        ],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./image.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.PrimeNGConfig }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { imageClass: [{
                    type: i0.Input
                }], imageStyle: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], src: [{
                    type: i0.Input
                }], alt: [{
                    type: i0.Input
                }], width: [{
                    type: i0.Input
                }], height: [{
                    type: i0.Input
                }], appendTo: [{
                    type: i0.Input
                }], preview: [{
                    type: i0.Input
                }], showTransitionOptions: [{
                    type: i0.Input
                }], hideTransitionOptions: [{
                    type: i0.Input
                }], onShow: [{
                    type: i0.Output
                }], onHide: [{
                    type: i0.Output
                }], mask: [{
                    type: i0.ViewChild,
                    args: ['mask']
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [i1.PrimeTemplate]
                }] } });
    var ImageModule = /** @class */ (function () {
        function ImageModule() {
        }
        return ImageModule;
    }());
    ImageModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ImageModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ImageModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ImageModule, declarations: [Image], imports: [i2.CommonModule], exports: [Image, i1.SharedModule] });
    ImageModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ImageModule, imports: [[i2.CommonModule], i1.SharedModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ImageModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule],
                        exports: [Image, i1.SharedModule],
                        declarations: [Image]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Image = Image;
    exports.ImageModule = ImageModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=primeng-image.umd.js.map
