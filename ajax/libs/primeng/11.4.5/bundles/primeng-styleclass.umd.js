(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/styleclass', ['exports', '@angular/common', '@angular/core', 'primeng/dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.styleclass = {}), global.ng.common, global.ng.core, global.primeng.dom));
}(this, (function (exports, common, core, dom) { 'use strict';

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
    StyleClass.decorators = [
        { type: core.Directive, args: [{
                    selector: '[pStyleClass]'
                },] }
    ];
    StyleClass.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 }
    ]; };
    StyleClass.propDecorators = {
        selector: [{ type: core.Input, args: ['pStyleClass',] }],
        enterClass: [{ type: core.Input }],
        enterActiveClass: [{ type: core.Input }],
        enterToClass: [{ type: core.Input }],
        leaveClass: [{ type: core.Input }],
        leaveActiveClass: [{ type: core.Input }],
        leaveToClass: [{ type: core.Input }],
        hideOnOutsideClick: [{ type: core.Input }],
        toggleClass: [{ type: core.Input }]
    };
    var StyleClassModule = /** @class */ (function () {
        function StyleClassModule() {
        }
        return StyleClassModule;
    }());
    StyleClassModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [StyleClass],
                    declarations: [StyleClass]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.StyleClass = StyleClass;
    exports.StyleClassModule = StyleClassModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-styleclass.umd.js.map
