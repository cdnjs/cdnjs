(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/knob', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.knob = {}), global.ng.core, global.ng.common, global.ng.forms));
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

    var KNOB_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return Knob; }),
        multi: true
    };
    var Knob = /** @class */ (function () {
        function Knob(cd, el) {
            this.cd = cd;
            this.el = el;
            this.valueColor = "var(--primary-color, Black)";
            this.rangeColor = "var(--surface-d, LightGray)";
            this.textColor = "var(--text-color-secondary, Black)";
            this.valueTemplate = "{value}";
            this.size = 100;
            this.step = 1;
            this.min = 0;
            this.max = 100;
            this.strokeWidth = 14;
            this.showValue = true;
            this.readonly = false;
            this.onChange = new i0.EventEmitter();
            this.radius = 40;
            this.midX = 50;
            this.midY = 50;
            this.minRadians = 4 * Math.PI / 3;
            this.maxRadians = -Math.PI / 3;
            this.value = null;
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        Knob.prototype.mapRange = function (x, inMin, inMax, outMin, outMax) {
            return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
        };
        Knob.prototype.onClick = function (event) {
            if (!this.disabled && !this.readonly) {
                this.updateValue(event.offsetX, event.offsetY);
            }
        };
        Knob.prototype.updateValue = function (offsetX, offsetY) {
            var dx = offsetX - this.size / 2;
            var dy = this.size / 2 - offsetY;
            var angle = Math.atan2(dy, dx);
            var start = -Math.PI / 2 - Math.PI / 6;
            this.updateModel(angle, start);
        };
        Knob.prototype.updateModel = function (angle, start) {
            var mappedValue;
            if (angle > this.maxRadians)
                mappedValue = this.mapRange(angle, this.minRadians, this.maxRadians, this.min, this.max);
            else if (angle < start)
                mappedValue = this.mapRange(angle + 2 * Math.PI, this.minRadians, this.maxRadians, this.min, this.max);
            else
                return;
            var newValue = Math.round((mappedValue - this.min) / this.step) * this.step + this.min;
            this.value = newValue;
            this.onModelChange(this.value);
            this.onChange.emit(this.value);
        };
        Knob.prototype.onMouseDown = function (event) {
            if (!this.disabled && !this.readonly) {
                this.windowMouseMoveListener = this.onMouseMove.bind(this);
                this.windowMouseUpListener = this.onMouseUp.bind(this);
                window.addEventListener('mousemove', this.windowMouseMoveListener);
                window.addEventListener('mouseup', this.windowMouseUpListener);
                event.preventDefault();
            }
        };
        Knob.prototype.onMouseUp = function (event) {
            if (!this.disabled && !this.readonly) {
                window.removeEventListener('mousemove', this.windowMouseMoveListener);
                window.removeEventListener('mouseup', this.windowMouseUpListener);
                this.windowMouseUpListener = null;
                this.windowMouseMoveListener = null;
                event.preventDefault();
            }
        };
        Knob.prototype.onTouchStart = function (event) {
            if (!this.disabled && !this.readonly) {
                this.windowTouchMoveListener = this.onTouchMove.bind(this);
                this.windowTouchEndListener = this.onTouchEnd.bind(this);
                window.addEventListener('touchmove', this.windowTouchMoveListener);
                window.addEventListener('touchend', this.windowTouchEndListener);
                event.preventDefault();
            }
        };
        Knob.prototype.onTouchEnd = function (event) {
            if (!this.disabled && !this.readonly) {
                window.removeEventListener('touchmove', this.windowTouchMoveListener);
                window.removeEventListener('touchend', this.windowTouchEndListener);
                this.windowTouchMoveListener = null;
                this.windowTouchEndListener = null;
                event.preventDefault();
            }
        };
        Knob.prototype.onMouseMove = function (event) {
            if (!this.disabled && !this.readonly) {
                this.updateValue(event.offsetX, event.offsetY);
                event.preventDefault();
            }
        };
        Knob.prototype.onTouchMove = function (event) {
            if (!this.disabled && !this.readonly && event.touches.length == 1) {
                var rect = this.el.nativeElement.children[0].getBoundingClientRect();
                var touch = event.targetTouches.item(0);
                var offsetX = touch.clientX - rect.left;
                var offsetY = touch.clientY - rect.top;
                this.updateValue(offsetX, offsetY);
            }
        };
        Knob.prototype.writeValue = function (value) {
            this.value = value;
            this.cd.markForCheck();
        };
        Knob.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        Knob.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        Knob.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        Knob.prototype.containerClass = function () {
            return {
                'p-knob p-component': true,
                'p-disabled': this.disabled
            };
        };
        Knob.prototype.rangePath = function () {
            return "M " + this.minX() + " " + this.minY() + " A " + this.radius + " " + this.radius + " 0 1 1 " + this.maxX() + " " + this.maxY();
        };
        Knob.prototype.valuePath = function () {
            return "M " + this.zeroX() + " " + this.zeroY() + " A " + this.radius + " " + this.radius + " 0 " + this.largeArc() + " " + this.sweep() + " " + this.valueX() + " " + this.valueY();
        };
        Knob.prototype.zeroRadians = function () {
            if (this.min > 0 && this.max > 0)
                return this.mapRange(this.min, this.min, this.max, this.minRadians, this.maxRadians);
            else
                return this.mapRange(0, this.min, this.max, this.minRadians, this.maxRadians);
        };
        Knob.prototype.valueRadians = function () {
            return this.mapRange(this._value, this.min, this.max, this.minRadians, this.maxRadians);
        };
        Knob.prototype.minX = function () {
            return this.midX + Math.cos(this.minRadians) * this.radius;
        };
        Knob.prototype.minY = function () {
            return this.midY - Math.sin(this.minRadians) * this.radius;
        };
        Knob.prototype.maxX = function () {
            return this.midX + Math.cos(this.maxRadians) * this.radius;
        };
        Knob.prototype.maxY = function () {
            return this.midY - Math.sin(this.maxRadians) * this.radius;
        };
        Knob.prototype.zeroX = function () {
            return this.midX + Math.cos(this.zeroRadians()) * this.radius;
        };
        Knob.prototype.zeroY = function () {
            return this.midY - Math.sin(this.zeroRadians()) * this.radius;
        };
        Knob.prototype.valueX = function () {
            return this.midX + Math.cos(this.valueRadians()) * this.radius;
        };
        Knob.prototype.valueY = function () {
            return this.midY - Math.sin(this.valueRadians()) * this.radius;
        };
        Knob.prototype.largeArc = function () {
            return Math.abs(this.zeroRadians() - this.valueRadians()) < Math.PI ? 0 : 1;
        };
        Knob.prototype.sweep = function () {
            return this.valueRadians() > this.zeroRadians() ? 0 : 1;
        };
        Knob.prototype.valueToDisplay = function () {
            return this.valueTemplate.replace("{value}", this._value.toString());
        };
        Object.defineProperty(Knob.prototype, "_value", {
            get: function () {
                return this.value != null ? this.value : this.min;
            },
            enumerable: false,
            configurable: true
        });
        return Knob;
    }());
    Knob.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Knob, deps: [{ token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Knob.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Knob, selector: "p-knob", inputs: { styleClass: "styleClass", style: "style", severity: "severity", valueColor: "valueColor", rangeColor: "rangeColor", textColor: "textColor", valueTemplate: "valueTemplate", name: "name", size: "size", step: "step", min: "min", max: "max", strokeWidth: "strokeWidth", disabled: "disabled", showValue: "showValue", readonly: "readonly" }, outputs: { onChange: "onChange" }, host: { classAttribute: "p-element" }, providers: [KNOB_VALUE_ACCESSOR], ngImport: i0__namespace, template: "\n        <div [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\">\n        <svg viewBox=\"0 0 100 100\" [style.width]=\"size + 'px'\" [style.height]=\"size + 'px'\" (click)=\"onClick($event)\" (mousedown)=\"onMouseDown($event)\" (mouseup)=\"onMouseUp($event)\"\n            (touchstart)=\"onTouchStart($event)\" (touchend)=\"onTouchEnd($event)\">\n            <path [attr.d]=\"rangePath()\" [attr.stroke-width]=\"strokeWidth\" [attr.stroke]=\"rangeColor\" class=\"p-knob-range\"></path>\n            <path [attr.d]=\"valuePath()\" [attr.stroke-width]=\"strokeWidth\" [attr.stroke]=\"valueColor\" class=\"p-knob-value\"></path>\n            <text *ngIf=\"showValue\" [attr.x]=\"50\" [attr.y]=\"57\" text-anchor=\"middle\" [attr.fill]=\"textColor\" class=\"p-knob-text\" [attr.name]=\"name\">{{valueToDisplay()}}</text>\n        </svg>\n        </div>\n    ", isInline: true, styles: ["@keyframes dash-frame{to{stroke-dashoffset:0}}.p-knob-range{fill:none;transition:stroke .1s ease-in}.p-knob-value{animation-name:dash-frame;animation-fill-mode:forwards;fill:none}.p-knob-text{font-size:1.3rem;text-align:center}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Knob, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-knob',
                        template: "\n        <div [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\">\n        <svg viewBox=\"0 0 100 100\" [style.width]=\"size + 'px'\" [style.height]=\"size + 'px'\" (click)=\"onClick($event)\" (mousedown)=\"onMouseDown($event)\" (mouseup)=\"onMouseUp($event)\"\n            (touchstart)=\"onTouchStart($event)\" (touchend)=\"onTouchEnd($event)\">\n            <path [attr.d]=\"rangePath()\" [attr.stroke-width]=\"strokeWidth\" [attr.stroke]=\"rangeColor\" class=\"p-knob-range\"></path>\n            <path [attr.d]=\"valuePath()\" [attr.stroke-width]=\"strokeWidth\" [attr.stroke]=\"valueColor\" class=\"p-knob-value\"></path>\n            <text *ngIf=\"showValue\" [attr.x]=\"50\" [attr.y]=\"57\" text-anchor=\"middle\" [attr.fill]=\"textColor\" class=\"p-knob-text\" [attr.name]=\"name\">{{valueToDisplay()}}</text>\n        </svg>\n        </div>\n    ",
                        providers: [KNOB_VALUE_ACCESSOR],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./knob.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.ElementRef }]; }, propDecorators: { styleClass: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], severity: [{
                    type: i0.Input
                }], valueColor: [{
                    type: i0.Input
                }], rangeColor: [{
                    type: i0.Input
                }], textColor: [{
                    type: i0.Input
                }], valueTemplate: [{
                    type: i0.Input
                }], name: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }], step: [{
                    type: i0.Input
                }], min: [{
                    type: i0.Input
                }], max: [{
                    type: i0.Input
                }], strokeWidth: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], showValue: [{
                    type: i0.Input
                }], readonly: [{
                    type: i0.Input
                }], onChange: [{
                    type: i0.Output
                }] } });
    var KnobModule = /** @class */ (function () {
        function KnobModule() {
        }
        return KnobModule;
    }());
    KnobModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: KnobModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    KnobModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: KnobModule, declarations: [Knob], imports: [i1.CommonModule], exports: [Knob] });
    KnobModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: KnobModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: KnobModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [Knob],
                        declarations: [Knob]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.KNOB_VALUE_ACCESSOR = KNOB_VALUE_ACCESSOR;
    exports.Knob = Knob;
    exports.KnobModule = KnobModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-knob.umd.js.map
