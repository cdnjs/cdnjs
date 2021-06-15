(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('primeng/dom'), require('primeng/utils')) :
    typeof define === 'function' && define.amd ? define('primeng/badge', ['exports', '@angular/core', '@angular/common', 'primeng/api', 'primeng/dom', 'primeng/utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.badge = {}), global.ng.core, global.ng.common, global.primeng.api, global.primeng.dom, global.primeng.utils));
}(this, (function (exports, i0, i1, api, dom, utils) { 'use strict';

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

    var BadgeDirective = /** @class */ (function () {
        function BadgeDirective(el) {
            this.el = el;
            this.iconPos = 'left';
        }
        BadgeDirective.prototype.ngAfterViewInit = function () {
            this.id = utils.UniqueComponentId() + '_badge';
            var el = this.el.nativeElement.nodeName.indexOf("-") != -1 ? this.el.nativeElement.firstChild : this.el.nativeElement;
            var badge = document.createElement('span');
            badge.id = this.id;
            badge.className = 'p-badge p-component';
            if (this.severity) {
                dom.DomHandler.addClass(badge, 'p-badge-' + this.severity);
            }
            if (this.value != null) {
                badge.appendChild(document.createTextNode(this.value));
                if (String(this.value).length === 1) {
                    dom.DomHandler.addClass(badge, 'p-badge-no-gutter');
                }
            }
            else {
                dom.DomHandler.addClass(badge, 'p-badge-dot');
            }
            dom.DomHandler.addClass(el, 'p-overlay-badge');
            el.appendChild(badge);
            this.initialized = true;
        };
        Object.defineProperty(BadgeDirective.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (val) {
                if (val !== this._value) {
                    this._value = val;
                    if (this.initialized) {
                        var badge = document.getElementById(this.id);
                        if (this._value) {
                            if (dom.DomHandler.hasClass(badge, 'p-badge-dot'))
                                dom.DomHandler.removeClass(badge, 'p-badge-dot');
                            if (String(this._value).length === 1) {
                                dom.DomHandler.addClass(badge, 'p-badge-no-gutter');
                            }
                            else {
                                dom.DomHandler.removeClass(badge, 'p-badge-no-gutter');
                            }
                        }
                        else if (!this._value && !dom.DomHandler.hasClass(badge, 'p-badge-dot')) {
                            dom.DomHandler.addClass(badge, 'p-badge-dot');
                        }
                        badge.innerHTML = '';
                        badge.appendChild(document.createTextNode(this._value));
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        BadgeDirective.prototype.ngOnDestroy = function () {
            this.initialized = false;
        };
        return BadgeDirective;
    }());
    BadgeDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BadgeDirective, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    BadgeDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.4", type: BadgeDirective, selector: "[pBadge]", inputs: { iconPos: "iconPos", value: "value", severity: "severity" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BadgeDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pBadge]'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { iconPos: [{
                    type: i0.Input
                }], value: [{
                    type: i0.Input
                }], severity: [{
                    type: i0.Input
                }] } });
    var Badge = /** @class */ (function () {
        function Badge() {
        }
        Badge.prototype.containerClass = function () {
            return {
                'p-badge p-component': true,
                'p-badge-no-gutter': this.value != undefined && String(this.value).length === 1,
                'p-badge-lg': this.size === 'large',
                'p-badge-xl': this.size === 'xlarge',
                'p-badge-info': this.severity === 'info',
                'p-badge-success': this.severity === 'success',
                'p-badge-warning': this.severity === 'warning',
                'p-badge-danger': this.severity === 'danger'
            };
        };
        return Badge;
    }());
    Badge.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: Badge, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    Badge.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: Badge, selector: "p-badge", inputs: { styleClass: "styleClass", style: "style", size: "size", severity: "severity", value: "value" }, ngImport: i0__namespace, template: "\n        <span [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\">\n                {{value}}\n        </span>\n    ", isInline: true, styles: [".p-badge{display:inline-block;border-radius:10px;text-align:center;padding:0 .5rem}.p-overlay-badge{position:relative}.p-overlay-badge .p-badge{position:absolute;top:0;right:0;transform:translate(50%,-50%);transform-origin:100% 0;margin:0}.p-badge-dot{width:.5rem;min-width:.5rem;height:.5rem}.p-badge-dot,.p-badge-no-gutter{border-radius:50%;padding:0}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: Badge, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-badge',
                        template: "\n        <span [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\">\n                {{value}}\n        </span>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./badge.css']
                    }]
            }], propDecorators: { styleClass: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }], severity: [{
                    type: i0.Input
                }], value: [{
                    type: i0.Input
                }] } });
    var BadgeModule = /** @class */ (function () {
        function BadgeModule() {
        }
        return BadgeModule;
    }());
    BadgeModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BadgeModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    BadgeModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BadgeModule, declarations: [Badge, BadgeDirective], imports: [i1.CommonModule], exports: [Badge, BadgeDirective, api.SharedModule] });
    BadgeModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BadgeModule, imports: [[i1.CommonModule], api.SharedModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BadgeModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [Badge, BadgeDirective, api.SharedModule],
                        declarations: [Badge, BadgeDirective]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Badge = Badge;
    exports.BadgeDirective = BadgeDirective;
    exports.BadgeModule = BadgeModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-badge.umd.js.map
