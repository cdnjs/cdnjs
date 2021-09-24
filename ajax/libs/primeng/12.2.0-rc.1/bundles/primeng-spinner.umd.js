(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/inputtext'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/spinner', ['exports', '@angular/core', '@angular/common', 'primeng/inputtext', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.spinner = {}), global.ng.core, global.ng.common, global.primeng.inputtext, global.ng.forms));
}(this, (function (exports, i0, i1, inputtext, forms) { 'use strict';

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

    var SPINNER_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return Spinner; }),
        multi: true
    };
    var Spinner = /** @class */ (function () {
        function Spinner(el, cd) {
            this.el = el;
            this.cd = cd;
            this.onChange = new i0.EventEmitter();
            this.onFocus = new i0.EventEmitter();
            this.onBlur = new i0.EventEmitter();
            this._step = 1;
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
            this.keyPattern = /[0-9\+\-]/;
            this.negativeSeparator = '-';
        }
        Object.defineProperty(Spinner.prototype, "step", {
            get: function () {
                return this._step;
            },
            set: function (val) {
                this._step = val;
                if (this._step != null) {
                    var tokens = this.step.toString().split(/[,]|[.]/);
                    this.calculatedPrecision = tokens[1] ? tokens[1].length : undefined;
                }
            },
            enumerable: false,
            configurable: true
        });
        Spinner.prototype.ngOnInit = function () {
            if (this.formatInput) {
                this.localeDecimalSeparator = (1.1).toLocaleString().substring(1, 2);
                this.localeThousandSeparator = (1000).toLocaleString().substring(1, 2);
                this.thousandRegExp = new RegExp("[" + (this.thousandSeparator || this.localeThousandSeparator) + "]", 'gim');
                if (this.decimalSeparator && this.thousandSeparator && this.decimalSeparator === this.thousandSeparator) {
                    console.warn("thousandSeparator and decimalSeparator cannot have the same value.");
                }
            }
        };
        Spinner.prototype.repeat = function (event, interval, dir) {
            var _this = this;
            var i = interval || 500;
            this.clearTimer();
            this.timer = setTimeout(function () {
                _this.repeat(event, 40, dir);
            }, i);
            this.spin(event, dir);
        };
        Spinner.prototype.spin = function (event, dir) {
            var step = this.step * dir;
            var currentValue;
            var precision = this.getPrecision();
            if (this.value)
                currentValue = (typeof this.value === 'string') ? this.parseValue(this.value) : this.value;
            else
                currentValue = 0;
            if (precision)
                this.value = parseFloat(this.toFixed(currentValue + step, precision));
            else
                this.value = currentValue + step;
            if (this.maxlength !== undefined && this.value.toString().length > this.maxlength) {
                this.value = currentValue;
            }
            if (this.min !== undefined && this.value < this.min) {
                this.value = this.min;
            }
            if (this.max !== undefined && this.value > this.max) {
                this.value = this.max;
            }
            this.formatValue();
            this.onModelChange(this.value);
            this.onChange.emit(event);
        };
        Spinner.prototype.getPrecision = function () {
            return this.precision === undefined ? this.calculatedPrecision : this.precision;
        };
        Spinner.prototype.toFixed = function (value, precision) {
            var power = Math.pow(10, precision || 0);
            return String(Math.round(value * power) / power);
        };
        Spinner.prototype.onUpButtonMousedown = function (event) {
            if (!this.disabled) {
                this.inputfieldViewChild.nativeElement.focus();
                this.repeat(event, null, 1);
                this.updateFilledState();
                event.preventDefault();
            }
        };
        Spinner.prototype.onUpButtonMouseup = function (event) {
            if (!this.disabled) {
                this.clearTimer();
            }
        };
        Spinner.prototype.onUpButtonMouseleave = function (event) {
            if (!this.disabled) {
                this.clearTimer();
            }
        };
        Spinner.prototype.onDownButtonMousedown = function (event) {
            if (!this.disabled) {
                this.inputfieldViewChild.nativeElement.focus();
                this.repeat(event, null, -1);
                this.updateFilledState();
                event.preventDefault();
            }
        };
        Spinner.prototype.onDownButtonMouseup = function (event) {
            if (!this.disabled) {
                this.clearTimer();
            }
        };
        Spinner.prototype.onDownButtonMouseleave = function (event) {
            if (!this.disabled) {
                this.clearTimer();
            }
        };
        Spinner.prototype.onInputKeydown = function (event) {
            if (event.which == 38) {
                this.spin(event, 1);
                event.preventDefault();
            }
            else if (event.which == 40) {
                this.spin(event, -1);
                event.preventDefault();
            }
        };
        Spinner.prototype.onInputChange = function (event) {
            this.onChange.emit(event);
        };
        Spinner.prototype.onInput = function (event) {
            this.value = this.parseValue(event.target.value);
            this.onModelChange(this.value);
            this.updateFilledState();
        };
        Spinner.prototype.onInputBlur = function (event) {
            this.focus = false;
            this.formatValue();
            this.onModelTouched();
            this.onBlur.emit(event);
        };
        Spinner.prototype.onInputFocus = function (event) {
            this.focus = true;
            this.onFocus.emit(event);
        };
        Spinner.prototype.parseValue = function (val) {
            var value;
            var precision = this.getPrecision();
            if (val.trim() === '') {
                value = null;
            }
            else {
                if (this.formatInput) {
                    val = val.replace(this.thousandRegExp, '');
                }
                if (precision) {
                    val = this.formatInput ? val.replace(this.decimalSeparator || this.localeDecimalSeparator, '.') : val.replace(',', '.');
                    value = parseFloat(val);
                }
                else {
                    value = parseInt(val, 10);
                }
                if (!isNaN(value)) {
                    if (this.max !== null && value > this.max) {
                        value = this.max;
                    }
                    if (this.min !== null && value < this.min) {
                        value = this.min;
                    }
                }
                else {
                    value = null;
                }
            }
            return value;
        };
        Spinner.prototype.formatValue = function () {
            var value = this.value;
            var precision = this.getPrecision();
            if (value != null) {
                if (this.formatInput) {
                    value = value.toLocaleString(undefined, { maximumFractionDigits: 20 });
                    if (this.decimalSeparator && this.thousandSeparator) {
                        value = value.split(this.localeDecimalSeparator);
                        if (precision && value[1]) {
                            value[1] = (this.decimalSeparator || this.localeDecimalSeparator) + value[1];
                        }
                        if (this.thousandSeparator && value[0].length > 3) {
                            value[0] = value[0].replace(new RegExp("[" + this.localeThousandSeparator + "]", 'gim'), this.thousandSeparator);
                        }
                        value = value.join('');
                    }
                }
                this.formattedValue = value.toString();
            }
            else {
                this.formattedValue = null;
            }
            if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
                this.inputfieldViewChild.nativeElement.value = this.formattedValue;
            }
        };
        Spinner.prototype.clearTimer = function () {
            if (this.timer) {
                clearInterval(this.timer);
            }
        };
        Spinner.prototype.writeValue = function (value) {
            this.value = value;
            this.formatValue();
            this.updateFilledState();
            this.cd.markForCheck();
        };
        Spinner.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        Spinner.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        Spinner.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        Spinner.prototype.updateFilledState = function () {
            this.filled = (this.value !== undefined && this.value != null);
        };
        return Spinner;
    }());
    Spinner.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Spinner, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Spinner.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Spinner, selector: "p-spinner", inputs: { min: "min", max: "max", maxlength: "maxlength", size: "size", placeholder: "placeholder", inputId: "inputId", disabled: "disabled", readonly: "readonly", tabindex: "tabindex", required: "required", name: "name", ariaLabelledBy: "ariaLabelledBy", inputStyle: "inputStyle", inputStyleClass: "inputStyleClass", formatInput: "formatInput", decimalSeparator: "decimalSeparator", thousandSeparator: "thousandSeparator", precision: "precision", step: "step" }, outputs: { onChange: "onChange", onFocus: "onFocus", onBlur: "onBlur" }, host: { properties: { "class.ui-inputwrapper-filled": "filled", "class.ui-inputwrapper-focus": "focus" }, classAttribute: "p-element" }, providers: [SPINNER_VALUE_ACCESSOR], viewQueries: [{ propertyName: "inputfieldViewChild", first: true, predicate: ["inputfield"], descendants: true }], ngImport: i0__namespace, template: "\n        <span class=\"ui-spinner ui-widget ui-corner-all\">\n            <input #inputfield type=\"text\" [attr.id]=\"inputId\" [value]=\"formattedValue||null\" [attr.name]=\"name\" [attr.aria-valumin]=\"min\" [attr.aria-valuemax]=\"max\" [attr.aria-valuenow]=\"value\" [attr.aria-labelledby]=\"ariaLabelledBy\"\n            [attr.size]=\"size\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [attr.placeholder]=\"placeholder\" [disabled]=\"disabled\" [readonly]=\"readonly\" [attr.required]=\"required\"\n            (keydown)=\"onInputKeydown($event)\" (blur)=\"onInputBlur($event)\" (input)=\"onInput($event)\" (change)=\"onInputChange($event)\" (focus)=\"onInputFocus($event)\"\n            [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [ngClass]=\"'ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all'\">\n            <button type=\"button\" [ngClass]=\"{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}\" [disabled]=\"disabled||readonly\" tabindex=\"-1\" [attr.readonly]=\"readonly\"\n                (mouseleave)=\"onUpButtonMouseleave($event)\" (mousedown)=\"onUpButtonMousedown($event)\" (mouseup)=\"onUpButtonMouseup($event)\">\n                <span class=\"ui-spinner-button-icon pi pi-caret-up ui-clickable\"></span>\n            </button>\n            <button type=\"button\" [ngClass]=\"{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}\" [disabled]=\"disabled||readonly\" tabindex=\"-1\" [attr.readonly]=\"readonly\"\n                (mouseleave)=\"onDownButtonMouseleave($event)\" (mousedown)=\"onDownButtonMousedown($event)\" (mouseup)=\"onDownButtonMouseup($event)\">\n                <span class=\"ui-spinner-button-icon pi pi-caret-down ui-clickable\"></span>\n            </button>\n        </span>\n    ", isInline: true, styles: [".ui-spinner{display:inline-block;overflow:visible;padding:0;position:relative;vertical-align:middle}.ui-spinner-input{vertical-align:middle;padding-right:1.5em}.ui-spinner-button{cursor:default;display:block;height:50%;margin:0;overflow:hidden;padding:0;position:absolute;right:0;text-align:center;vertical-align:middle;width:1.5em}.ui-spinner .ui-spinner-button-icon{position:absolute;top:50%;left:50%;margin-top:-.5em;margin-left:-.5em;width:1em}.ui-spinner-up{top:0}.ui-spinner-down{bottom:0}.ui-fluid .ui-spinner{width:100%}.ui-fluid .ui-spinner .ui-spinner-input{padding-right:2em;width:100%}.ui-fluid .ui-spinner .ui-spinner-button{width:1.5em}.ui-fluid .ui-spinner .ui-spinner-button .ui-spinner-button-icon{left:.7em}"], directives: [{ type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Spinner, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-spinner',
                        template: "\n        <span class=\"ui-spinner ui-widget ui-corner-all\">\n            <input #inputfield type=\"text\" [attr.id]=\"inputId\" [value]=\"formattedValue||null\" [attr.name]=\"name\" [attr.aria-valumin]=\"min\" [attr.aria-valuemax]=\"max\" [attr.aria-valuenow]=\"value\" [attr.aria-labelledby]=\"ariaLabelledBy\"\n            [attr.size]=\"size\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [attr.placeholder]=\"placeholder\" [disabled]=\"disabled\" [readonly]=\"readonly\" [attr.required]=\"required\"\n            (keydown)=\"onInputKeydown($event)\" (blur)=\"onInputBlur($event)\" (input)=\"onInput($event)\" (change)=\"onInputChange($event)\" (focus)=\"onInputFocus($event)\"\n            [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [ngClass]=\"'ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all'\">\n            <button type=\"button\" [ngClass]=\"{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}\" [disabled]=\"disabled||readonly\" tabindex=\"-1\" [attr.readonly]=\"readonly\"\n                (mouseleave)=\"onUpButtonMouseleave($event)\" (mousedown)=\"onUpButtonMousedown($event)\" (mouseup)=\"onUpButtonMouseup($event)\">\n                <span class=\"ui-spinner-button-icon pi pi-caret-up ui-clickable\"></span>\n            </button>\n            <button type=\"button\" [ngClass]=\"{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}\" [disabled]=\"disabled||readonly\" tabindex=\"-1\" [attr.readonly]=\"readonly\"\n                (mouseleave)=\"onDownButtonMouseleave($event)\" (mousedown)=\"onDownButtonMousedown($event)\" (mouseup)=\"onDownButtonMouseup($event)\">\n                <span class=\"ui-spinner-button-icon pi pi-caret-down ui-clickable\"></span>\n            </button>\n        </span>\n    ",
                        host: {
                            'class': 'p-element',
                            '[class.ui-inputwrapper-filled]': 'filled',
                            '[class.ui-inputwrapper-focus]': 'focus'
                        },
                        providers: [SPINNER_VALUE_ACCESSOR],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./spinner.css']
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { onChange: [{
                    type: i0.Output
                }], onFocus: [{
                    type: i0.Output
                }], onBlur: [{
                    type: i0.Output
                }], min: [{
                    type: i0.Input
                }], max: [{
                    type: i0.Input
                }], maxlength: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }], placeholder: [{
                    type: i0.Input
                }], inputId: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], readonly: [{
                    type: i0.Input
                }], tabindex: [{
                    type: i0.Input
                }], required: [{
                    type: i0.Input
                }], name: [{
                    type: i0.Input
                }], ariaLabelledBy: [{
                    type: i0.Input
                }], inputStyle: [{
                    type: i0.Input
                }], inputStyleClass: [{
                    type: i0.Input
                }], formatInput: [{
                    type: i0.Input
                }], decimalSeparator: [{
                    type: i0.Input
                }], thousandSeparator: [{
                    type: i0.Input
                }], precision: [{
                    type: i0.Input
                }], inputfieldViewChild: [{
                    type: i0.ViewChild,
                    args: ['inputfield']
                }], step: [{
                    type: i0.Input
                }] } });
    var SpinnerModule = /** @class */ (function () {
        function SpinnerModule() {
        }
        return SpinnerModule;
    }());
    SpinnerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SpinnerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    SpinnerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SpinnerModule, declarations: [Spinner], imports: [i1.CommonModule, inputtext.InputTextModule], exports: [Spinner] });
    SpinnerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SpinnerModule, imports: [[i1.CommonModule, inputtext.InputTextModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: SpinnerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, inputtext.InputTextModule],
                        exports: [Spinner],
                        declarations: [Spinner]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.SPINNER_VALUE_ACCESSOR = SPINNER_VALUE_ACCESSOR;
    exports.Spinner = Spinner;
    exports.SpinnerModule = SpinnerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-spinner.umd.js.map
