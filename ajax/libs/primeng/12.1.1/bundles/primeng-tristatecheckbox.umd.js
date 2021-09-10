(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/tristatecheckbox', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.tristatecheckbox = {}), global.ng.core, global.ng.common, global.ng.forms));
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

    var TRISTATECHECKBOX_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return TriStateCheckbox; }),
        multi: true
    };
    var TriStateCheckbox = /** @class */ (function () {
        function TriStateCheckbox(cd) {
            this.cd = cd;
            this.checkboxTrueIcon = 'pi pi-check';
            this.checkboxFalseIcon = 'pi pi-times';
            this.onChange = new i0.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        TriStateCheckbox.prototype.onClick = function (event, input) {
            if (!this.disabled && !this.readonly) {
                this.toggle(event);
                this.focused = true;
                input.focus();
            }
        };
        TriStateCheckbox.prototype.onKeydown = function (event) {
            if (event.keyCode == 32) {
                event.preventDefault();
            }
        };
        TriStateCheckbox.prototype.onKeyup = function (event) {
            if (event.keyCode == 32 && !this.readonly) {
                this.toggle(event);
                event.preventDefault();
            }
        };
        TriStateCheckbox.prototype.toggle = function (event) {
            if (this.value == null || this.value == undefined)
                this.value = true;
            else if (this.value == true)
                this.value = false;
            else if (this.value == false)
                this.value = null;
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        };
        TriStateCheckbox.prototype.onFocus = function () {
            this.focused = true;
        };
        TriStateCheckbox.prototype.onBlur = function () {
            this.focused = false;
            this.onModelTouched();
        };
        TriStateCheckbox.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        TriStateCheckbox.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        TriStateCheckbox.prototype.writeValue = function (value) {
            this.value = value;
            this.cd.markForCheck();
        };
        TriStateCheckbox.prototype.setDisabledState = function (disabled) {
            this.disabled = disabled;
            this.cd.markForCheck();
        };
        return TriStateCheckbox;
    }());
    TriStateCheckbox.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TriStateCheckbox, deps: [{ token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    TriStateCheckbox.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TriStateCheckbox, selector: "p-triStateCheckbox", inputs: { disabled: "disabled", name: "name", ariaLabelledBy: "ariaLabelledBy", tabindex: "tabindex", inputId: "inputId", style: "style", styleClass: "styleClass", label: "label", readonly: "readonly", checkboxTrueIcon: "checkboxTrueIcon", checkboxFalseIcon: "checkboxFalseIcon" }, outputs: { onChange: "onChange" }, host: { classAttribute: "p-element" }, providers: [TRISTATECHECKBOX_VALUE_ACCESSOR], ngImport: i0__namespace, template: "\n        <div [ngStyle]=\"style\" [ngClass]=\"{'p-checkbox p-component': true,'p-checkbox-disabled': disabled, 'p-checkbox-focused': focused}\" [class]=\"styleClass\">\n            <div class=\"p-hidden-accessible\">\n                <input #input type=\"text\" [attr.id]=\"inputId\" [name]=\"name\" [attr.tabindex]=\"tabindex\" [readonly]=\"readonly\" [disabled]=\"disabled\" (keyup)=\"onKeyup($event)\" (keydown)=\"onKeydown($event)\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [attr.aria-labelledby]=\"ariaLabelledBy\" inputmode=\"none\">\n            </div>\n            <div class=\"p-checkbox-box\" (click)=\"onClick($event,input)\"  role=\"checkbox\" [attr.aria-checked]=\"value === true\"\n                [ngClass]=\"{'p-highlight':value!=null,'p-disabled':disabled,'p-focus':focused}\">\n                <span class=\"p-checkbox-icon\" [ngClass]=\"value === true ? checkboxTrueIcon : value === false ? checkboxFalseIcon : ''\"></span>\n            </div>\n        </div>\n        <label class=\"p-checkbox-label\" (click)=\"onClick($event,input)\"\n               [ngClass]=\"{'p-checkbox-label-active':value!=null, 'p-disabled':disabled, 'p-checkbox-label-focus':focused}\"\n               *ngIf=\"label\" [attr.for]=\"inputId\">{{label}}</label>\n    ", isInline: true, directives: [{ type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TriStateCheckbox, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-triStateCheckbox',
                        template: "\n        <div [ngStyle]=\"style\" [ngClass]=\"{'p-checkbox p-component': true,'p-checkbox-disabled': disabled, 'p-checkbox-focused': focused}\" [class]=\"styleClass\">\n            <div class=\"p-hidden-accessible\">\n                <input #input type=\"text\" [attr.id]=\"inputId\" [name]=\"name\" [attr.tabindex]=\"tabindex\" [readonly]=\"readonly\" [disabled]=\"disabled\" (keyup)=\"onKeyup($event)\" (keydown)=\"onKeydown($event)\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [attr.aria-labelledby]=\"ariaLabelledBy\" inputmode=\"none\">\n            </div>\n            <div class=\"p-checkbox-box\" (click)=\"onClick($event,input)\"  role=\"checkbox\" [attr.aria-checked]=\"value === true\"\n                [ngClass]=\"{'p-highlight':value!=null,'p-disabled':disabled,'p-focus':focused}\">\n                <span class=\"p-checkbox-icon\" [ngClass]=\"value === true ? checkboxTrueIcon : value === false ? checkboxFalseIcon : ''\"></span>\n            </div>\n        </div>\n        <label class=\"p-checkbox-label\" (click)=\"onClick($event,input)\"\n               [ngClass]=\"{'p-checkbox-label-active':value!=null, 'p-disabled':disabled, 'p-checkbox-label-focus':focused}\"\n               *ngIf=\"label\" [attr.for]=\"inputId\">{{label}}</label>\n    ",
                        providers: [TRISTATECHECKBOX_VALUE_ACCESSOR],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                    type: i0.Input
                }], name: [{
                    type: i0.Input
                }], ariaLabelledBy: [{
                    type: i0.Input
                }], tabindex: [{
                    type: i0.Input
                }], inputId: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], label: [{
                    type: i0.Input
                }], readonly: [{
                    type: i0.Input
                }], checkboxTrueIcon: [{
                    type: i0.Input
                }], checkboxFalseIcon: [{
                    type: i0.Input
                }], onChange: [{
                    type: i0.Output
                }] } });
    var TriStateCheckboxModule = /** @class */ (function () {
        function TriStateCheckboxModule() {
        }
        return TriStateCheckboxModule;
    }());
    TriStateCheckboxModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TriStateCheckboxModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    TriStateCheckboxModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TriStateCheckboxModule, declarations: [TriStateCheckbox], imports: [i1.CommonModule], exports: [TriStateCheckbox] });
    TriStateCheckboxModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TriStateCheckboxModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TriStateCheckboxModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
                        exports: [TriStateCheckbox],
                        declarations: [TriStateCheckbox]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TRISTATECHECKBOX_VALUE_ACCESSOR = TRISTATECHECKBOX_VALUE_ACCESSOR;
    exports.TriStateCheckbox = TriStateCheckbox;
    exports.TriStateCheckboxModule = TriStateCheckboxModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tristatecheckbox.umd.js.map
