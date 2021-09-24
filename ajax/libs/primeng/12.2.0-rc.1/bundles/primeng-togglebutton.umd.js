(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/ripple'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/togglebutton', ['exports', '@angular/core', '@angular/common', 'primeng/ripple', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.togglebutton = {}), global.ng.core, global.ng.common, global.primeng.ripple, global.ng.forms));
}(this, (function (exports, i0, i2, i1, forms) { 'use strict';

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

    var TOGGLEBUTTON_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return ToggleButton; }),
        multi: true
    };
    var ToggleButton = /** @class */ (function () {
        function ToggleButton(cd) {
            this.cd = cd;
            this.iconPos = 'left';
            this.onChange = new i0.EventEmitter();
            this.checked = false;
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        ToggleButton.prototype.toggle = function (event) {
            if (!this.disabled) {
                this.checked = !this.checked;
                this.onModelChange(this.checked);
                this.onModelTouched();
                this.onChange.emit({
                    originalEvent: event,
                    checked: this.checked
                });
                this.cd.markForCheck();
            }
        };
        ToggleButton.prototype.onBlur = function () {
            this.onModelTouched();
        };
        ToggleButton.prototype.writeValue = function (value) {
            this.checked = value;
            this.cd.markForCheck();
        };
        ToggleButton.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        ToggleButton.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        ToggleButton.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        Object.defineProperty(ToggleButton.prototype, "hasOnLabel", {
            get: function () {
                return this.onLabel && this.onLabel.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ToggleButton.prototype, "hasOffLabel", {
            get: function () {
                return this.onLabel && this.onLabel.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        return ToggleButton;
    }());
    ToggleButton.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToggleButton, deps: [{ token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ToggleButton.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ToggleButton, selector: "p-toggleButton", inputs: { onLabel: "onLabel", offLabel: "offLabel", onIcon: "onIcon", offIcon: "offIcon", ariaLabelledBy: "ariaLabelledBy", disabled: "disabled", style: "style", styleClass: "styleClass", inputId: "inputId", tabindex: "tabindex", iconPos: "iconPos" }, outputs: { onChange: "onChange" }, host: { classAttribute: "p-element" }, providers: [TOGGLEBUTTON_VALUE_ACCESSOR], ngImport: i0__namespace, template: "\n        <div [ngClass]=\"{'p-button p-togglebutton p-component': true, 'p-button-icon-only': (onIcon && offIcon && !hasOnLabel && !hasOffLabel),'p-highlight': checked,'p-disabled':disabled}\"\n                        [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"toggle($event)\" (keydown.enter)=\"toggle($event)\"\n                        [attr.tabindex]=\"disabled ? null : '0'\" role=\"checkbox\" [attr.aria-checked]=\"checked\" pRipple>\n            <span *ngIf=\"onIcon||offIcon\" [class]=\"checked ? this.onIcon : this.offIcon\"\n                [ngClass]=\"{'p-button-icon': true, 'p-button-icon-left': (iconPos === 'left'), 'p-button-icon-right': (iconPos === 'right')}\"></span>\n            <span class=\"p-button-label\">{{checked ? hasOnLabel ? onLabel : '' : hasOffLabel ? offLabel : ''}}</span>\n        </div>\n    ", isInline: true, styles: [".p-button{margin:0;display:inline-flex;cursor:pointer;-webkit-user-select:none;-ms-user-select:none;user-select:none;align-items:center;vertical-align:bottom;text-align:center;overflow:hidden;position:relative}.p-button-label{flex:1 1 auto}.p-button-icon-right{order:1}.p-button:disabled{cursor:default}.p-button-icon-only{justify-content:center}.p-button-icon-only .p-button-label{visibility:hidden;width:0;flex:0 0 auto}.p-button-vertical{flex-direction:column}.p-button-icon-bottom{order:2}.p-buttonset .p-button{margin:0}.p-buttonset .p-button:not(:last-child){border-right:0}.p-buttonset .p-button:not(:first-of-type):not(:last-of-type){border-radius:0}.p-buttonset .p-button:first-of-type{border-top-right-radius:0;border-bottom-right-radius:0}.p-buttonset .p-button:last-of-type{border-top-left-radius:0;border-bottom-left-radius:0}.p-buttonset .p-button:focus{position:relative;z-index:1}.p-button-label{transition:all .2s}"], directives: [{ type: i1__namespace.Ripple, selector: "[pRipple]" }, { type: i2__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToggleButton, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-toggleButton',
                        template: "\n        <div [ngClass]=\"{'p-button p-togglebutton p-component': true, 'p-button-icon-only': (onIcon && offIcon && !hasOnLabel && !hasOffLabel),'p-highlight': checked,'p-disabled':disabled}\"\n                        [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"toggle($event)\" (keydown.enter)=\"toggle($event)\"\n                        [attr.tabindex]=\"disabled ? null : '0'\" role=\"checkbox\" [attr.aria-checked]=\"checked\" pRipple>\n            <span *ngIf=\"onIcon||offIcon\" [class]=\"checked ? this.onIcon : this.offIcon\"\n                [ngClass]=\"{'p-button-icon': true, 'p-button-icon-left': (iconPos === 'left'), 'p-button-icon-right': (iconPos === 'right')}\"></span>\n            <span class=\"p-button-label\">{{checked ? hasOnLabel ? onLabel : '' : hasOffLabel ? offLabel : ''}}</span>\n        </div>\n    ",
                        providers: [TOGGLEBUTTON_VALUE_ACCESSOR],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        styleUrls: ['../button/button.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { onLabel: [{
                    type: i0.Input
                }], offLabel: [{
                    type: i0.Input
                }], onIcon: [{
                    type: i0.Input
                }], offIcon: [{
                    type: i0.Input
                }], ariaLabelledBy: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], inputId: [{
                    type: i0.Input
                }], tabindex: [{
                    type: i0.Input
                }], iconPos: [{
                    type: i0.Input
                }], onChange: [{
                    type: i0.Output
                }] } });
    var ToggleButtonModule = /** @class */ (function () {
        function ToggleButtonModule() {
        }
        return ToggleButtonModule;
    }());
    ToggleButtonModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToggleButtonModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ToggleButtonModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToggleButtonModule, declarations: [ToggleButton], imports: [i2.CommonModule, i1.RippleModule], exports: [ToggleButton] });
    ToggleButtonModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToggleButtonModule, imports: [[i2.CommonModule, i1.RippleModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToggleButtonModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule, i1.RippleModule],
                        exports: [ToggleButton],
                        declarations: [ToggleButton]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TOGGLEBUTTON_VALUE_ACCESSOR = TOGGLEBUTTON_VALUE_ACCESSOR;
    exports.ToggleButton = ToggleButton;
    exports.ToggleButtonModule = ToggleButtonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-togglebutton.umd.js.map
