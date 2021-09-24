(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/styleclass', ['exports', '@angular/common', '@angular/core', 'primeng/dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.styleclass = {}), global.ng.common, global.ng.core, global.primeng.dom));
}(this, (function (exports, common, i0, dom) { 'use strict';

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

    var StyleClass = /** @class */ (function () {
        function StyleClass(el, renderer) {
            this.el = el;
            this.renderer = renderer;
        }
        StyleClass.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.eventListener = this.renderer.listen(this.el.nativeElement, 'click', function () {
                _this.target = _this.resolveTarget();
                if (_this.toggleClass) {
                    if (dom.DomHandler.hasClass(_this.target, _this.toggleClass))
                        dom.DomHandler.removeClass(_this.target, _this.toggleClass);
                    else
                        dom.DomHandler.addClass(_this.target, _this.toggleClass);
                }
                else {
                    if (_this.target.offsetParent === null)
                        _this.enter();
                    else
                        _this.leave();
                }
            });
        };
        StyleClass.prototype.enter = function () {
            var _this = this;
            if (this.enterActiveClass) {
                if (!this.animating) {
                    this.animating = true;
                    if (this.enterActiveClass === 'slidedown') {
                        this.target.style.height = '0px';
                        dom.DomHandler.removeClass(this.target, 'hidden');
                        this.target.style.maxHeight = this.target.scrollHeight + 'px';
                        dom.DomHandler.addClass(this.target, 'hidden');
                        this.target.style.height = '';
                    }
                    dom.DomHandler.addClass(this.target, this.enterActiveClass);
                    if (this.enterClass) {
                        dom.DomHandler.removeClass(this.target, this.enterClass);
                    }
                    this.enterListener = this.renderer.listen(this.target, 'animationend', function () {
                        dom.DomHandler.removeClass(_this.target, _this.enterActiveClass);
                        if (_this.enterToClass) {
                            dom.DomHandler.addClass(_this.target, _this.enterToClass);
                        }
                        _this.enterListener();
                        if (_this.enterActiveClass === 'slidedown') {
                            _this.target.style.maxHeight = '';
                        }
                        _this.animating = false;
                    });
                }
            }
            else {
                if (this.enterClass) {
                    dom.DomHandler.removeClass(this.target, this.enterClass);
                }
                if (this.enterToClass) {
                    dom.DomHandler.addClass(this.target, this.enterToClass);
                }
            }
            if (this.hideOnOutsideClick) {
                this.bindDocumentListener();
            }
        };
        StyleClass.prototype.leave = function () {
            var _this = this;
            if (this.leaveActiveClass) {
                if (!this.animating) {
                    this.animating = true;
                    dom.DomHandler.addClass(this.target, this.leaveActiveClass);
                    if (this.leaveClass) {
                        dom.DomHandler.removeClass(this.target, this.leaveClass);
                    }
                    this.leaveListener = this.renderer.listen(this.target, 'animationend', function () {
                        dom.DomHandler.removeClass(_this.target, _this.leaveActiveClass);
                        if (_this.leaveToClass) {
                            dom.DomHandler.addClass(_this.target, _this.leaveToClass);
                        }
                        _this.leaveListener();
                        _this.animating = false;
                    });
                }
            }
            else {
                if (this.leaveClass) {
                    dom.DomHandler.removeClass(this.target, this.leaveClass);
                }
                if (this.leaveToClass) {
                    dom.DomHandler.addClass(this.target, this.leaveToClass);
                }
            }
            if (this.hideOnOutsideClick) {
                this.unbindDocumentListener();
            }
        };
        StyleClass.prototype.resolveTarget = function () {
            if (this.target) {
                return this.target;
            }
            switch (this.selector) {
                case '@next':
                    return this.el.nativeElement.nextElementSibling;
                case '@prev':
                    return this.el.nativeElement.previousElementSibling;
                case '@parent':
                    return this.el.nativeElement.parentElement;
                case '@grandparent':
                    return this.el.nativeElement.parentElement.parentElement;
                default:
                    return document.querySelector(this.selector);
            }
        };
        StyleClass.prototype.bindDocumentListener = function () {
            var _this = this;
            if (!this.documentListener) {
                this.documentListener = this.renderer.listen(this.el.nativeElement.ownerDocument, 'click', function (event) {
                    if (getComputedStyle(_this.target).getPropertyValue('position') === 'static') {
                        _this.unbindDocumentListener();
                    }
                    else if (!_this.el.nativeElement.isSameNode(event.target) && !_this.el.nativeElement.contains(event.target) && !_this.target.contains(event.target)) {
                        _this.leave();
                    }
                });
            }
        };
        StyleClass.prototype.unbindDocumentListener = function () {
            if (this.documentListener) {
                this.documentListener();
                this.documentListener = null;
            }
        };
        StyleClass.prototype.ngOnDestroy = function () {
            this.target = null;
            if (this.eventListener) {
                this.eventListener();
            }
            this.unbindDocumentListener();
        };
        return StyleClass;
    }());
    StyleClass.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: StyleClass, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    StyleClass.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: StyleClass, selector: "[pStyleClass]", inputs: { selector: ["pStyleClass", "selector"], enterClass: "enterClass", enterActiveClass: "enterActiveClass", enterToClass: "enterToClass", leaveClass: "leaveClass", leaveActiveClass: "leaveActiveClass", leaveToClass: "leaveToClass", hideOnOutsideClick: "hideOnOutsideClick", toggleClass: "toggleClass" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: StyleClass, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pStyleClass]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }]; }, propDecorators: { selector: [{
                    type: i0.Input,
                    args: ['pStyleClass']
                }], enterClass: [{
                    type: i0.Input
                }], enterActiveClass: [{
                    type: i0.Input
                }], enterToClass: [{
                    type: i0.Input
                }], leaveClass: [{
                    type: i0.Input
                }], leaveActiveClass: [{
                    type: i0.Input
                }], leaveToClass: [{
                    type: i0.Input
                }], hideOnOutsideClick: [{
                    type: i0.Input
                }], toggleClass: [{
                    type: i0.Input
                }] } });
    var StyleClassModule = /** @class */ (function () {
        function StyleClassModule() {
        }
        return StyleClassModule;
    }());
    StyleClassModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: StyleClassModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    StyleClassModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: StyleClassModule, declarations: [StyleClass], imports: [common.CommonModule], exports: [StyleClass] });
    StyleClassModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: StyleClassModule, imports: [[common.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: StyleClassModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule],
                        exports: [StyleClass],
                        declarations: [StyleClass]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.StyleClass = StyleClass;
    exports.StyleClassModule = StyleClassModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-styleclass.umd.js.map
