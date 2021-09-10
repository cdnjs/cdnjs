(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('primeng/dom'), require('@angular/common'), require('primeng/ripple'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/button', ['exports', '@angular/core', 'primeng/dom', '@angular/common', 'primeng/ripple', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.button = {}), global.ng.core, global.primeng.dom, global.ng.common, global.primeng.ripple, global.primeng.api));
}(this, (function (exports, i0, dom, i2, i1, api) { 'use strict';

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

    var ButtonDirective = /** @class */ (function () {
        function ButtonDirective(el) {
            this.el = el;
            this.iconPos = 'left';
            this.loadingIcon = "pi pi-spinner pi-spin";
            this._loading = false;
        }
        ButtonDirective.prototype.ngAfterViewInit = function () {
            this._initialStyleClass = this.el.nativeElement.className;
            dom.DomHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());
            if (this.icon) {
                this.createIconEl();
            }
            var labelElement = document.createElement("span");
            if (this.icon && !this.label) {
                labelElement.setAttribute('aria-hidden', 'true');
            }
            labelElement.className = 'p-button-label';
            if (this.label)
                labelElement.appendChild(document.createTextNode(this.label));
            else
                labelElement.innerHTML = '&nbsp;';
            this.el.nativeElement.appendChild(labelElement);
            this.initialized = true;
        };
        ButtonDirective.prototype.getStyleClass = function () {
            var styleClass = 'p-button p-component';
            if (this.icon && !this.label) {
                styleClass = styleClass + ' p-button-icon-only';
            }
            if (this.loading) {
                styleClass = styleClass + ' p-disabled p-button-loading';
                if (!this.icon && this.label)
                    styleClass = styleClass + ' p-button-loading-label-only';
            }
            return styleClass;
        };
        ButtonDirective.prototype.setStyleClass = function () {
            var styleClass = this.getStyleClass();
            this.el.nativeElement.className = styleClass + ' ' + this._initialStyleClass;
        };
        ButtonDirective.prototype.createIconEl = function () {
            var iconElement = document.createElement("span");
            iconElement.className = 'p-button-icon';
            iconElement.setAttribute("aria-hidden", "true");
            var iconPosClass = this.label ? 'p-button-icon-' + this.iconPos : null;
            if (iconPosClass) {
                dom.DomHandler.addClass(iconElement, iconPosClass);
            }
            dom.DomHandler.addMultipleClasses(iconElement, this.getIconClass());
            var labelEl = dom.DomHandler.findSingle(this.el.nativeElement, '.p-button-label');
            if (labelEl)
                this.el.nativeElement.insertBefore(iconElement, labelEl);
            else
                this.el.nativeElement.appendChild(iconElement);
        };
        ButtonDirective.prototype.getIconClass = function () {
            return this.loading ? 'p-button-loading-icon ' + this.loadingIcon : this._icon;
        };
        ButtonDirective.prototype.setIconClass = function () {
            var iconElement = dom.DomHandler.findSingle(this.el.nativeElement, '.p-button-icon');
            if (iconElement) {
                if (this.iconPos)
                    iconElement.className = 'p-button-icon p-button-icon-' + this.iconPos + ' ' + this.getIconClass();
                else
                    iconElement.className = 'p-button-icon ' + this.getIconClass();
            }
            else {
                this.createIconEl();
            }
        };
        ButtonDirective.prototype.removeIconElement = function () {
            var iconElement = dom.DomHandler.findSingle(this.el.nativeElement, '.p-button-icon');
            this.el.nativeElement.removeChild(iconElement);
        };
        Object.defineProperty(ButtonDirective.prototype, "label", {
            get: function () {
                return this._label;
            },
            set: function (val) {
                this._label = val;
                if (this.initialized) {
                    dom.DomHandler.findSingle(this.el.nativeElement, '.p-button-label').textContent = this._label || '&nbsp;';
                    this.setIconClass();
                    this.setStyleClass();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ButtonDirective.prototype, "icon", {
            get: function () {
                return this._icon;
            },
            set: function (val) {
                this._icon = val;
                if (this.initialized) {
                    this.setIconClass();
                    this.setStyleClass();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ButtonDirective.prototype, "loading", {
            get: function () {
                return this._loading;
            },
            set: function (val) {
                this._loading = val;
                if (this.initialized) {
                    if (this.loading || this.icon)
                        this.setIconClass();
                    else
                        this.removeIconElement();
                    this.setStyleClass();
                }
            },
            enumerable: false,
            configurable: true
        });
        ButtonDirective.prototype.ngOnDestroy = function () {
            this.initialized = false;
        };
        return ButtonDirective;
    }());
    ButtonDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ButtonDirective, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    ButtonDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: ButtonDirective, selector: "[pButton]", inputs: { iconPos: "iconPos", loadingIcon: "loadingIcon", label: "label", icon: "icon", loading: "loading" }, host: { classAttribute: "p-element" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ButtonDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pButton]',
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { iconPos: [{
                    type: i0.Input
                }], loadingIcon: [{
                    type: i0.Input
                }], label: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], loading: [{
                    type: i0.Input
                }] } });
    var Button = /** @class */ (function () {
        function Button() {
            this.type = "button";
            this.iconPos = 'left';
            this.loading = false;
            this.loadingIcon = "pi pi-spinner pi-spin";
            this.onClick = new i0.EventEmitter();
            this.onFocus = new i0.EventEmitter();
            this.onBlur = new i0.EventEmitter();
        }
        Button.prototype.ngAfterContentInit = function () {
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
        Button.prototype.badgeStyleClass = function () {
            return {
                'p-badge p-component': true,
                'p-badge-no-gutter': this.badge && String(this.badge).length === 1
            };
        };
        return Button;
    }());
    Button.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Button, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    Button.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Button, selector: "p-button", inputs: { type: "type", iconPos: "iconPos", icon: "icon", badge: "badge", label: "label", disabled: "disabled", loading: "loading", loadingIcon: "loadingIcon", style: "style", styleClass: "styleClass", badgeClass: "badgeClass" }, outputs: { onClick: "onClick", onFocus: "onFocus", onBlur: "onBlur" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: api.PrimeTemplate }], ngImport: i0__namespace, template: "\n        <button [attr.type]=\"type\" [class]=\"styleClass\" [ngStyle]=\"style\" [disabled]=\"disabled || loading\"\n            [ngClass]=\"{'p-button p-component':true,\n                        'p-button-icon-only': (icon && !label),\n                        'p-button-vertical': (iconPos === 'top' || iconPos === 'bottom') && label,\n                        'p-disabled': this.disabled || this.loading,\n                        'p-button-loading': this.loading,\n                        'p-button-loading-label-only': this.loading && !this.icon && this.label}\"\n                        (click)=\"onClick.emit($event)\" (focus)=\"onFocus.emit($event)\" (blur)=\"onBlur.emit($event)\" pRipple>\n            <ng-content></ng-content>\n            <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            <span [ngClass]=\"{'p-button-icon': true,\n                        'p-button-icon-left': iconPos === 'left' && label,\n                        'p-button-icon-right': iconPos === 'right' && label,\n                        'p-button-icon-top': iconPos === 'top' && label,\n                        'p-button-icon-bottom': iconPos === 'bottom' && label}\"\n                        [class]=\"loading ? 'p-button-loading-icon ' + loadingIcon : icon\" *ngIf=\"!contentTemplate && (icon||loading)\" [attr.aria-hidden]=\"true\"></span>\n            <span class=\"p-button-label\" [attr.aria-hidden]=\"icon && !label\" *ngIf=\"!contentTemplate\">{{label||'&nbsp;'}}</span>\n            <span [ngClass]=\"badgeStyleClass()\" [class]=\"badgeClass\" *ngIf=\"!contentTemplate && badge\">{{badge}}</span>\n        </button>\n    ", isInline: true, directives: [{ type: i1__namespace.Ripple, selector: "[pRipple]" }, { type: i2__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Button, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-button',
                        template: "\n        <button [attr.type]=\"type\" [class]=\"styleClass\" [ngStyle]=\"style\" [disabled]=\"disabled || loading\"\n            [ngClass]=\"{'p-button p-component':true,\n                        'p-button-icon-only': (icon && !label),\n                        'p-button-vertical': (iconPos === 'top' || iconPos === 'bottom') && label,\n                        'p-disabled': this.disabled || this.loading,\n                        'p-button-loading': this.loading,\n                        'p-button-loading-label-only': this.loading && !this.icon && this.label}\"\n                        (click)=\"onClick.emit($event)\" (focus)=\"onFocus.emit($event)\" (blur)=\"onBlur.emit($event)\" pRipple>\n            <ng-content></ng-content>\n            <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            <span [ngClass]=\"{'p-button-icon': true,\n                        'p-button-icon-left': iconPos === 'left' && label,\n                        'p-button-icon-right': iconPos === 'right' && label,\n                        'p-button-icon-top': iconPos === 'top' && label,\n                        'p-button-icon-bottom': iconPos === 'bottom' && label}\"\n                        [class]=\"loading ? 'p-button-loading-icon ' + loadingIcon : icon\" *ngIf=\"!contentTemplate && (icon||loading)\" [attr.aria-hidden]=\"true\"></span>\n            <span class=\"p-button-label\" [attr.aria-hidden]=\"icon && !label\" *ngIf=\"!contentTemplate\">{{label||'&nbsp;'}}</span>\n            <span [ngClass]=\"badgeStyleClass()\" [class]=\"badgeClass\" *ngIf=\"!contentTemplate && badge\">{{badge}}</span>\n        </button>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], propDecorators: { type: [{
                    type: i0.Input
                }], iconPos: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], badge: [{
                    type: i0.Input
                }], label: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], loading: [{
                    type: i0.Input
                }], loadingIcon: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], badgeClass: [{
                    type: i0.Input
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [api.PrimeTemplate]
                }], onClick: [{
                    type: i0.Output
                }], onFocus: [{
                    type: i0.Output
                }], onBlur: [{
                    type: i0.Output
                }] } });
    var ButtonModule = /** @class */ (function () {
        function ButtonModule() {
        }
        return ButtonModule;
    }());
    ButtonModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ButtonModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ButtonModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ButtonModule, declarations: [ButtonDirective, Button], imports: [i2.CommonModule, i1.RippleModule], exports: [ButtonDirective, Button] });
    ButtonModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ButtonModule, imports: [[i2.CommonModule, i1.RippleModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ButtonModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule, i1.RippleModule],
                        exports: [ButtonDirective, Button],
                        declarations: [ButtonDirective, Button]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Button = Button;
    exports.ButtonDirective = ButtonDirective;
    exports.ButtonModule = ButtonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-button.umd.js.map
