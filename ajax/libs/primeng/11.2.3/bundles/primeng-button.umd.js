(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('primeng/dom'), require('@angular/common'), require('primeng/ripple'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/button', ['exports', '@angular/core', 'primeng/dom', '@angular/common', 'primeng/ripple', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.button = {}), global.ng.core, global.primeng.dom, global.ng.common, global.primeng.ripple, global.primeng.api));
}(this, (function (exports, core, dom, common, ripple, api) { 'use strict';

    var ButtonDirective = /** @class */ (function () {
        function ButtonDirective(el) {
            this.el = el;
            this.iconPos = 'left';
        }
        ButtonDirective.prototype.ngAfterViewInit = function () {
            this._initialStyleClass = this.el.nativeElement.className;
            dom.DomHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());
            if (this.icon) {
                var iconElement = document.createElement("span");
                iconElement.className = 'p-button-icon';
                iconElement.setAttribute("aria-hidden", "true");
                var iconPosClass = this.label ? 'p-button-icon-' + this.iconPos : null;
                if (iconPosClass) {
                    dom.DomHandler.addClass(iconElement, iconPosClass);
                }
                dom.DomHandler.addMultipleClasses(iconElement, this.icon);
                this.el.nativeElement.appendChild(iconElement);
            }
            var labelElement = document.createElement("span");
            if (this.icon && !this.label) {
                labelElement.setAttribute('aria-hidden', 'true');
            }
            labelElement.className = 'p-button-label';
            labelElement.appendChild(document.createTextNode(this.label || '&nbsp;'));
            this.el.nativeElement.appendChild(labelElement);
            this.initialized = true;
        };
        ButtonDirective.prototype.getStyleClass = function () {
            var styleClass = 'p-button p-component';
            if (this.icon && !this.label) {
                styleClass = styleClass + ' p-button-icon-only';
            }
            return styleClass;
        };
        ButtonDirective.prototype.setStyleClass = function () {
            var styleClass = this.getStyleClass();
            this.el.nativeElement.className = styleClass + ' ' + this._initialStyleClass;
        };
        Object.defineProperty(ButtonDirective.prototype, "label", {
            get: function () {
                return this._label;
            },
            set: function (val) {
                this._label = val;
                if (this.initialized) {
                    dom.DomHandler.findSingle(this.el.nativeElement, '.p-button-label').textContent = this._label || '&nbsp;';
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
                    if (this.iconPos)
                        dom.DomHandler.findSingle(this.el.nativeElement, '.p-button-icon').className = 'p-button-icon p-button-icon-' + this.iconPos + ' ' + this._icon;
                    else
                        dom.DomHandler.findSingle(this.el.nativeElement, '.p-button-icon').className = 'p-button-icon ' + this._icon;
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
    ButtonDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[pButton]'
                },] }
    ];
    ButtonDirective.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    ButtonDirective.propDecorators = {
        iconPos: [{ type: core.Input }],
        label: [{ type: core.Input }],
        icon: [{ type: core.Input }]
    };
    var Button = /** @class */ (function () {
        function Button() {
            this.type = "button";
            this.iconPos = 'left';
            this.onClick = new core.EventEmitter();
            this.onFocus = new core.EventEmitter();
            this.onBlur = new core.EventEmitter();
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
    Button.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-button',
                    template: "\n        <button [attr.type]=\"type\" [class]=\"styleClass\" [ngStyle]=\"style\" [disabled]=\"disabled\"\n            [ngClass]=\"{'p-button p-component':true,\n                        'p-button-icon-only': (icon && !label),\n                        'p-button-vertical': (iconPos === 'top' || iconPos === 'bottom') && label}\"\n                        (click)=\"onClick.emit($event)\" (focus)=\"onFocus.emit($event)\" (blur)=\"onBlur.emit($event)\" pRipple>\n            <ng-content></ng-content>\n            <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            <span [ngClass]=\"{'p-button-icon': true,\n                        'p-button-icon-left': iconPos === 'left' && label,\n                        'p-button-icon-right': iconPos === 'right' && label,\n                        'p-button-icon-top': iconPos === 'top' && label,\n                        'p-button-icon-bottom': iconPos === 'bottom' && label}\"\n                        [class]=\"icon\" *ngIf=\"icon\" [attr.aria-hidden]=\"true\"></span>\n            <span class=\"p-button-label\" [attr.aria-hidden]=\"icon && !label\">{{label||'&nbsp;'}}</span>\n            <span [ngClass]=\"badgeStyleClass()\" *ngIf=\"badge\" [class]=\"badgeClass\">{{badge}}</span>\n        </button>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    Button.propDecorators = {
        type: [{ type: core.Input }],
        iconPos: [{ type: core.Input }],
        icon: [{ type: core.Input }],
        badge: [{ type: core.Input }],
        label: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        badgeClass: [{ type: core.Input }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }],
        onClick: [{ type: core.Output }],
        onFocus: [{ type: core.Output }],
        onBlur: [{ type: core.Output }]
    };
    var ButtonModule = /** @class */ (function () {
        function ButtonModule() {
        }
        return ButtonModule;
    }());
    ButtonModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, ripple.RippleModule],
                    exports: [ButtonDirective, Button],
                    declarations: [ButtonDirective, Button]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Button = Button;
    exports.ButtonDirective = ButtonDirective;
    exports.ButtonModule = ButtonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-button.umd.js.map
