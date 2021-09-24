(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/animations'), require('primeng/dom'), require('primeng/utils'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/scrolltop', ['exports', '@angular/core', '@angular/common', '@angular/animations', 'primeng/dom', 'primeng/utils', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.scrolltop = {}), global.ng.core, global.ng.common, global.ng.animations, global.primeng.dom, global.primeng.utils, global.primeng.api));
}(this, (function (exports, i0, i2, animations, dom, utils, i1) { 'use strict';

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

    var ScrollTop = /** @class */ (function () {
        function ScrollTop(el, cd, config) {
            this.el = el;
            this.cd = cd;
            this.config = config;
            this.target = "window";
            this.threshold = 400;
            this.icon = "pi pi-chevron-up";
            this.behavior = "smooth";
            this.showTransitionOptions = '.15s';
            this.hideTransitionOptions = '.15s';
            this.visible = false;
        }
        ScrollTop.prototype.ngOnInit = function () {
            if (this.target === 'window')
                this.bindDocumentScrollListener();
            else if (this.target === 'parent')
                this.bindParentScrollListener();
        };
        ScrollTop.prototype.onClick = function () {
            var scrollElement = this.target === 'window' ? window : this.el.nativeElement.parentElement;
            scrollElement.scroll({
                top: 0,
                behavior: this.behavior
            });
        };
        ScrollTop.prototype.onEnter = function (event) {
            switch (event.toState) {
                case 'open':
                    this.overlay = event.element;
                    utils.ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
                    break;
                case 'void':
                    this.overlay = null;
                    break;
            }
        };
        ScrollTop.prototype.onLeave = function (event) {
            switch (event.toState) {
                case 'void':
                    utils.ZIndexUtils.clear(event.element);
                    break;
            }
        };
        ScrollTop.prototype.checkVisibility = function (scrollY) {
            if (scrollY > this.threshold)
                this.visible = true;
            else
                this.visible = false;
            this.cd.markForCheck();
        };
        ScrollTop.prototype.bindParentScrollListener = function () {
            var _this = this;
            this.scrollListener = function () {
                _this.checkVisibility(_this.el.nativeElement.parentElement.scrollTop);
            };
            this.el.nativeElement.parentElement.addEventListener('scroll', this.scrollListener);
        };
        ScrollTop.prototype.bindDocumentScrollListener = function () {
            var _this = this;
            this.scrollListener = function () {
                _this.checkVisibility(dom.DomHandler.getWindowScrollTop());
            };
            window.addEventListener('scroll', this.scrollListener);
        };
        ScrollTop.prototype.unbindParentScrollListener = function () {
            if (this.scrollListener) {
                this.el.nativeElement.parentElement.removeEventListener('scroll', this.scrollListener);
                this.scrollListener = null;
            }
        };
        ScrollTop.prototype.unbindDocumentScrollListener = function () {
            if (this.scrollListener) {
                window.removeEventListener('scroll', this.scrollListener);
                this.scrollListener = null;
            }
        };
        ScrollTop.prototype.containerClass = function () {
            return {
                'p-scrolltop p-link p-component': true,
                'p-scrolltop-sticky': this.target !== 'window'
            };
        };
        ScrollTop.prototype.ngOnDestroy = function () {
            if (this.target === 'window')
                this.unbindDocumentScrollListener();
            else if (this.target === 'parent')
                this.unbindParentScrollListener();
            if (this.overlay) {
                utils.ZIndexUtils.clear(this.overlay);
                this.overlay = null;
            }
        };
        return ScrollTop;
    }());
    ScrollTop.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ScrollTop, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }, { token: i1__namespace.PrimeNGConfig }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ScrollTop.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ScrollTop, selector: "p-scrollTop", inputs: { styleClass: "styleClass", style: "style", target: "target", threshold: "threshold", icon: "icon", behavior: "behavior", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace, template: "\n        <button  *ngIf=\"visible\" [@animation]=\"{value: 'open', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@animation.start)=\"onEnter($event)\" (@animation.done)=\"onLeave($event)\"\n            [ngClass]=\"containerClass()\" (click)=\"onClick()\" [class]=\"styleClass\" [ngStyle]=\"style\" type=\"button\">\n            <span [class]=\"icon\" [ngClass]=\"'p-scrolltop-icon'\"></span>\n        </button>\n    ", isInline: true, styles: [".p-scrolltop{position:fixed;bottom:20px;right:20px;display:flex;align-items:center;justify-content:center}.p-scrolltop-sticky{position:sticky}.p-scrolltop-sticky.p-link{margin-left:auto}"], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
            animations.trigger('animation', [
                animations.state('void', animations.style({
                    opacity: 0
                })),
                animations.state('open', animations.style({
                    opacity: 1
                })),
                animations.transition('void => open', animations.animate('{{showTransitionParams}}')),
                animations.transition('open => void', animations.animate('{{hideTransitionParams}}')),
            ])
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ScrollTop, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-scrollTop',
                        template: "\n        <button  *ngIf=\"visible\" [@animation]=\"{value: 'open', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@animation.start)=\"onEnter($event)\" (@animation.done)=\"onLeave($event)\"\n            [ngClass]=\"containerClass()\" (click)=\"onClick()\" [class]=\"styleClass\" [ngStyle]=\"style\" type=\"button\">\n            <span [class]=\"icon\" [ngClass]=\"'p-scrolltop-icon'\"></span>\n        </button>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./scrolltop.css'],
                        animations: [
                            animations.trigger('animation', [
                                animations.state('void', animations.style({
                                    opacity: 0
                                })),
                                animations.state('open', animations.style({
                                    opacity: 1
                                })),
                                animations.transition('void => open', animations.animate('{{showTransitionParams}}')),
                                animations.transition('open => void', animations.animate('{{hideTransitionParams}}')),
                            ])
                        ],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }, { type: i1__namespace.PrimeNGConfig }]; }, propDecorators: { styleClass: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], target: [{
                    type: i0.Input
                }], threshold: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], behavior: [{
                    type: i0.Input
                }], showTransitionOptions: [{
                    type: i0.Input
                }], hideTransitionOptions: [{
                    type: i0.Input
                }] } });
    var ScrollTopModule = /** @class */ (function () {
        function ScrollTopModule() {
        }
        return ScrollTopModule;
    }());
    ScrollTopModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ScrollTopModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ScrollTopModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ScrollTopModule, declarations: [ScrollTop], imports: [i2.CommonModule], exports: [ScrollTop] });
    ScrollTopModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ScrollTopModule, imports: [[i2.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ScrollTopModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule],
                        exports: [ScrollTop],
                        declarations: [ScrollTop]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ScrollTop = ScrollTop;
    exports.ScrollTopModule = ScrollTopModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-scrolltop.umd.js.map
