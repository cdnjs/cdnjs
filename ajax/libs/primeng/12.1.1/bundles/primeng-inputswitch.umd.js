(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/inputswitch', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.inputswitch = {}), global.ng.core, global.ng.common, global.ng.forms));
}(this, (function (exports, i0, i1, forms) { 'use strict';

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

    var INPUTSWITCH_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return InputSwitch; }),
        multi: true
    };
    var InputSwitch = /** @class */ (function () {
        function InputSwitch(cd) {
            this.cd = cd;
            this.onChange = new i0.EventEmitter();
            this.checked = false;
            this.focused = false;
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        InputSwitch.prototype.onClick = function (event, cb) {
            if (!this.disabled && !this.readonly) {
                event.preventDefault();
                this.toggle(event);
                cb.focus();
            }
        };
        InputSwitch.prototype.onInputChange = function (event) {
            if (!this.readonly) {
                var inputChecked = event.target.checked;
                this.updateModel(event, inputChecked);
            }
        };
        InputSwitch.prototype.toggle = function (event) {
            this.updateModel(event, !this.checked);
        };
        InputSwitch.prototype.updateModel = function (event, value) {
            this.checked = value;
            this.onModelChange(this.checked);
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
        };
        InputSwitch.prototype.onFocus = function (event) {
            this.focused = true;
        };
        InputSwitch.prototype.onBlur = function (event) {
            this.focused = false;
            this.onModelTouched();
        };
        InputSwitch.prototype.writeValue = function (checked) {
            this.checked = checked;
            this.cd.markForCheck();
        };
        InputSwitch.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        InputSwitch.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        InputSwitch.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        return InputSwitch;
    }());
    InputSwitch.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputSwitch, deps: [{ token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    InputSwitch.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: InputSwitch, selector: "p-inputSwitch", inputs: { style: "style", styleClass: "styleClass", tabindex: "tabindex", inputId: "inputId", name: "name", disabled: "disabled", readonly: "readonly", ariaLabelledBy: "ariaLabelledBy" }, outputs: { onChange: "onChange" }, host: { classAttribute: "p-element" }, providers: [INPUTSWITCH_VALUE_ACCESSOR], ngImport: i0__namespace, template: "\n        <div [ngClass]=\"{'p-inputswitch p-component': true, 'p-inputswitch-checked': checked, 'p-disabled': disabled, 'p-focus': focused}\"\n            [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"onClick($event, cb)\">\n            <div class=\"p-hidden-accessible\">\n                <input #cb type=\"checkbox\" [attr.id]=\"inputId\" [attr.name]=\"name\" [attr.tabindex]=\"tabindex\" [checked]=\"checked\" (change)=\"onInputChange($event)\"\n                    (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" [disabled]=\"disabled\" role=\"switch\" [attr.aria-checked]=\"checked\" [attr.aria-labelledby]=\"ariaLabelledBy\"/>\n            </div>\n            <span class=\"p-inputswitch-slider\"></span>\n        </div>\n    ", isInline: true, styles: [".p-inputswitch{position:relative;display:inline-block;-webkit-user-select:none;-ms-user-select:none;user-select:none}.p-inputswitch-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0}.p-inputswitch-slider:before{position:absolute;content:\"\";top:50%}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputSwitch, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-inputSwitch',
                        template: "\n        <div [ngClass]=\"{'p-inputswitch p-component': true, 'p-inputswitch-checked': checked, 'p-disabled': disabled, 'p-focus': focused}\"\n            [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"onClick($event, cb)\">\n            <div class=\"p-hidden-accessible\">\n                <input #cb type=\"checkbox\" [attr.id]=\"inputId\" [attr.name]=\"name\" [attr.tabindex]=\"tabindex\" [checked]=\"checked\" (change)=\"onInputChange($event)\"\n                    (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" [disabled]=\"disabled\" role=\"switch\" [attr.aria-checked]=\"checked\" [attr.aria-labelledby]=\"ariaLabelledBy\"/>\n            </div>\n            <span class=\"p-inputswitch-slider\"></span>\n        </div>\n    ",
                        providers: [INPUTSWITCH_VALUE_ACCESSOR],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./inputswitch.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], tabindex: [{
                    type: i0.Input
                }], inputId: [{
                    type: i0.Input
                }], name: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], readonly: [{
                    type: i0.Input
                }], ariaLabelledBy: [{
                    type: i0.Input
                }], onChange: [{
                    type: i0.Output
                }] } });
    var InputSwitchModule = /** @class */ (function () {
        function InputSwitchModule() {
        }
        return InputSwitchModule;
    }());
    InputSwitchModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputSwitchModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    InputSwitchModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputSwitchModule, declarations: [InputSwitch], imports: [i1.CommonModule], exports: [InputSwitch] });
    InputSwitchModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputSwitchModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputSwitchModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [InputSwitch],
                        declarations: [InputSwitch]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.INPUTSWITCH_VALUE_ACCESSOR = INPUTSWITCH_VALUE_ACCESSOR;
    exports.InputSwitch = InputSwitch;
    exports.InputSwitchModule = InputSwitchModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-inputswitch.umd.js.map
