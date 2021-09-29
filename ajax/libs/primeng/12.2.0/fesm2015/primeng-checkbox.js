import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ViewChild, Output, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ObjectUtils } from 'primeng/utils';

const CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Checkbox),
    multi: true
};
class Checkbox {
    constructor(cd) {
        this.cd = cd;
        this.checkboxIcon = 'pi pi-check';
        this.trueValue = true;
        this.falseValue = false;
        this.onChange = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.focused = false;
    }
    onClick(event, checkbox, focus) {
        event.preventDefault();
        if (this.disabled || this.readonly) {
            return;
        }
        this.updateModel(event);
        if (focus) {
            checkbox.focus();
        }
    }
    updateModel(event) {
        let newModelValue;
        if (!this.binary) {
            if (this.checked())
                newModelValue = this.model.filter(val => !ObjectUtils.equals(val, this.value));
            else
                newModelValue = this.model ? [...this.model, this.value] : [this.value];
            this.onModelChange(newModelValue);
            this.model = newModelValue;
            if (this.formControl) {
                this.formControl.setValue(newModelValue);
            }
        }
        else {
            newModelValue = this.checked() ? this.falseValue : this.trueValue;
            this.model = newModelValue;
            this.onModelChange(newModelValue);
        }
        this.onChange.emit({ checked: newModelValue, originalEvent: event });
    }
    handleChange(event) {
        if (!this.readonly) {
            this.updateModel(event);
        }
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
        this.onModelTouched();
    }
    focus() {
        this.inputViewChild.nativeElement.focus();
    }
    writeValue(model) {
        this.model = model;
        this.cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
        this.cd.markForCheck();
    }
    checked() {
        return this.binary ? this.model === this.trueValue : ObjectUtils.contains(this.value, this.model);
    }
}
Checkbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Checkbox, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
Checkbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Checkbox, selector: "p-checkbox", inputs: { value: "value", name: "name", disabled: "disabled", binary: "binary", label: "label", ariaLabelledBy: "ariaLabelledBy", ariaLabel: "ariaLabel", tabindex: "tabindex", inputId: "inputId", style: "style", styleClass: "styleClass", labelStyleClass: "labelStyleClass", formControl: "formControl", checkboxIcon: "checkboxIcon", readonly: "readonly", required: "required", trueValue: "trueValue", falseValue: "falseValue" }, outputs: { onChange: "onChange" }, host: { classAttribute: "p-element" }, providers: [CHECKBOX_VALUE_ACCESSOR], viewQueries: [{ propertyName: "inputViewChild", first: true, predicate: ["cb"], descendants: true }], ngImport: i0, template: `
        <div [ngStyle]="style" [ngClass]="{'p-checkbox p-component': true, 'p-checkbox-checked': checked(), 'p-checkbox-disabled': disabled, 'p-checkbox-focused': focused}" [class]="styleClass">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [readonly]="readonly" [value]="value" [checked]="checked()" (focus)="onFocus()" (blur)="onBlur()"
                (change)="handleChange($event)" [disabled]="disabled" [attr.tabindex]="tabindex" [attr.aria-labelledby]="ariaLabelledBy" [attr.aria-label]="ariaLabel" [attr.aria-checked]="checked()" [attr.required]="required">
            </div>
            <div class="p-checkbox-box" (click)="onClick($event,cb,true)"
                        [ngClass]="{'p-highlight': checked(), 'p-disabled': disabled, 'p-focus': focused}">
                <span class="p-checkbox-icon" [ngClass]="checked() ? checkboxIcon : null"></span>
            </div>
        </div>
        <label (click)="onClick($event,cb,true)" [class]="labelStyleClass"
                [ngClass]="{'p-checkbox-label': true, 'p-checkbox-label-active':checked(), 'p-disabled':disabled, 'p-checkbox-label-focus':focused}"
                *ngIf="label" [attr.for]="inputId">{{label}}</label>
    `, isInline: true, styles: [".p-checkbox{display:inline-flex;cursor:pointer;-webkit-user-select:none;-ms-user-select:none;user-select:none;vertical-align:bottom;position:relative}.p-checkbox-disabled{cursor:default!important;pointer-events:none}.p-checkbox-box{display:flex;justify-content:center;align-items:center}p-checkbox{display:inline-flex;vertical-align:bottom;align-items:center}.p-checkbox-label{line-height:1}"], directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Checkbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-checkbox',
                    template: `
        <div [ngStyle]="style" [ngClass]="{'p-checkbox p-component': true, 'p-checkbox-checked': checked(), 'p-checkbox-disabled': disabled, 'p-checkbox-focused': focused}" [class]="styleClass">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [readonly]="readonly" [value]="value" [checked]="checked()" (focus)="onFocus()" (blur)="onBlur()"
                (change)="handleChange($event)" [disabled]="disabled" [attr.tabindex]="tabindex" [attr.aria-labelledby]="ariaLabelledBy" [attr.aria-label]="ariaLabel" [attr.aria-checked]="checked()" [attr.required]="required">
            </div>
            <div class="p-checkbox-box" (click)="onClick($event,cb,true)"
                        [ngClass]="{'p-highlight': checked(), 'p-disabled': disabled, 'p-focus': focused}">
                <span class="p-checkbox-icon" [ngClass]="checked() ? checkboxIcon : null"></span>
            </div>
        </div>
        <label (click)="onClick($event,cb,true)" [class]="labelStyleClass"
                [ngClass]="{'p-checkbox-label': true, 'p-checkbox-label-active':checked(), 'p-disabled':disabled, 'p-checkbox-label-focus':focused}"
                *ngIf="label" [attr.for]="inputId">{{label}}</label>
    `,
                    providers: [CHECKBOX_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./checkbox.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { value: [{
                type: Input
            }], name: [{
                type: Input
            }], disabled: [{
                type: Input
            }], binary: [{
                type: Input
            }], label: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], inputId: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], labelStyleClass: [{
                type: Input
            }], formControl: [{
                type: Input
            }], checkboxIcon: [{
                type: Input
            }], readonly: [{
                type: Input
            }], required: [{
                type: Input
            }], trueValue: [{
                type: Input
            }], falseValue: [{
                type: Input
            }], inputViewChild: [{
                type: ViewChild,
                args: ['cb']
            }], onChange: [{
                type: Output
            }] } });
class CheckboxModule {
}
CheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CheckboxModule, declarations: [Checkbox], imports: [CommonModule], exports: [Checkbox] });
CheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CheckboxModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Checkbox],
                    declarations: [Checkbox]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { CHECKBOX_VALUE_ACCESSOR, Checkbox, CheckboxModule };
//# sourceMappingURL=primeng-checkbox.js.map
