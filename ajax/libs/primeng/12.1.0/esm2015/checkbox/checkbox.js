import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Checkbox),
    multi: true
};
export class Checkbox {
    constructor(cd) {
        this.cd = cd;
        this.checkboxIcon = 'pi pi-check';
        this.onChange = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.focused = false;
        this.checked = false;
    }
    onClick(event, checkbox, focus) {
        event.preventDefault();
        if (this.disabled || this.readonly) {
            return;
        }
        this.checked = !this.checked;
        this.updateModel(event);
        if (focus) {
            checkbox.focus();
        }
    }
    updateModel(event) {
        if (!this.binary) {
            if (this.checked)
                this.addValue();
            else
                this.removeValue();
            this.onModelChange(this.model);
            if (this.formControl) {
                this.formControl.setValue(this.model);
            }
        }
        else {
            this.onModelChange(this.checked);
        }
        this.onChange.emit({ checked: this.checked, originalEvent: event });
    }
    handleChange(event) {
        if (!this.readonly) {
            this.checked = event.target.checked;
            this.updateModel(event);
        }
    }
    isChecked() {
        if (this.binary)
            return this.model;
        else
            return this.model && this.model.indexOf(this.value) > -1;
    }
    removeValue() {
        this.model = this.model.filter(val => val !== this.value);
    }
    addValue() {
        if (this.model)
            this.model = [...this.model, this.value];
        else
            this.model = [this.value];
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
        this.checked = this.isChecked();
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
}
Checkbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Checkbox, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
Checkbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Checkbox, selector: "p-checkbox", inputs: { value: "value", name: "name", disabled: "disabled", binary: "binary", label: "label", ariaLabelledBy: "ariaLabelledBy", ariaLabel: "ariaLabel", tabindex: "tabindex", inputId: "inputId", style: "style", styleClass: "styleClass", labelStyleClass: "labelStyleClass", formControl: "formControl", checkboxIcon: "checkboxIcon", readonly: "readonly", required: "required" }, outputs: { onChange: "onChange" }, providers: [CHECKBOX_VALUE_ACCESSOR], viewQueries: [{ propertyName: "inputViewChild", first: true, predicate: ["cb"], descendants: true }], ngImport: i0, template: `
        <div [ngStyle]="style" [ngClass]="{'p-checkbox p-component': true, 'p-checkbox-checked': checked, 'p-checkbox-disabled': disabled, 'p-checkbox-focused': focused}" [class]="styleClass">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [readonly]="readonly" [value]="value" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()"
                (change)="handleChange($event)" [disabled]="disabled" [attr.tabindex]="tabindex" [attr.aria-labelledby]="ariaLabelledBy" [attr.aria-label]="ariaLabel" [attr.aria-checked]="checked" [attr.required]="required">
            </div>
            <div class="p-checkbox-box" (click)="onClick($event,cb,true)"
                        [ngClass]="{'p-highlight': checked, 'p-disabled': disabled, 'p-focus': focused}">
                <span class="p-checkbox-icon" [ngClass]="checked ? checkboxIcon : null"></span>
            </div>
        </div>
        <label (click)="onClick($event,cb,true)" [class]="labelStyleClass"
                [ngClass]="{'p-checkbox-label': true, 'p-checkbox-label-active':checked, 'p-disabled':disabled, 'p-checkbox-label-focus':focused}"
                *ngIf="label" [attr.for]="inputId">{{label}}</label>
    `, isInline: true, styles: [".p-checkbox{display:inline-flex;cursor:pointer;-webkit-user-select:none;-ms-user-select:none;user-select:none;vertical-align:bottom}.p-checkbox-disabled{cursor:default!important;pointer-events:none}.p-checkbox-box{display:flex;justify-content:center;align-items:center}p-checkbox{display:inline-flex;vertical-align:bottom;align-items:center}.p-checkbox-label{line-height:1}"], directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Checkbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-checkbox',
                    template: `
        <div [ngStyle]="style" [ngClass]="{'p-checkbox p-component': true, 'p-checkbox-checked': checked, 'p-checkbox-disabled': disabled, 'p-checkbox-focused': focused}" [class]="styleClass">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [readonly]="readonly" [value]="value" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()"
                (change)="handleChange($event)" [disabled]="disabled" [attr.tabindex]="tabindex" [attr.aria-labelledby]="ariaLabelledBy" [attr.aria-label]="ariaLabel" [attr.aria-checked]="checked" [attr.required]="required">
            </div>
            <div class="p-checkbox-box" (click)="onClick($event,cb,true)"
                        [ngClass]="{'p-highlight': checked, 'p-disabled': disabled, 'p-focus': focused}">
                <span class="p-checkbox-icon" [ngClass]="checked ? checkboxIcon : null"></span>
            </div>
        </div>
        <label (click)="onClick($event,cb,true)" [class]="labelStyleClass"
                [ngClass]="{'p-checkbox-label': true, 'p-checkbox-label-active':checked, 'p-disabled':disabled, 'p-checkbox-label-focus':focused}"
                *ngIf="label" [attr.for]="inputId">{{label}}</label>
    `,
                    providers: [CHECKBOX_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./checkbox.css']
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
            }], inputViewChild: [{
                type: ViewChild,
                args: ['cb']
            }], onChange: [{
                type: Output
            }] } });
export class CheckboxModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvY2hlY2tib3gvY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFtQixTQUFTLEVBQVksdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEssT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxpQkFBaUIsRUFBb0MsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRXBGLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFRO0lBQzFDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFDdkMsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBd0JGLE1BQU0sT0FBTyxRQUFRO0lBZ0RqQixZQUFvQixFQUFxQjtRQUFyQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQXBCaEMsaUJBQVksR0FBVyxhQUFhLENBQUM7UUFRcEMsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSTNELGtCQUFhLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRXBDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFekIsWUFBTyxHQUFZLEtBQUssQ0FBQztJQUVtQixDQUFDO0lBRTdDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEtBQWE7UUFDaEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hDLE9B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WUFBWSxhQWhKYixRQUFROzRHQW9KUixjQUFjLFlBSmQsQ0FBQyxZQUFZLENBQUM7MkZBSWQsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztvQkFDbkIsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO2lCQUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsZm9yd2FyZFJlZixDaGFuZ2VEZXRlY3RvclJlZixWaWV3Q2hpbGQsRWxlbWVudFJlZixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IENIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDaGVja2JveCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY2hlY2tib3gnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nU3R5bGVdPVwic3R5bGVcIiBbbmdDbGFzc109XCJ7J3AtY2hlY2tib3ggcC1jb21wb25lbnQnOiB0cnVlLCAncC1jaGVja2JveC1jaGVja2VkJzogY2hlY2tlZCwgJ3AtY2hlY2tib3gtZGlzYWJsZWQnOiBkaXNhYmxlZCwgJ3AtY2hlY2tib3gtZm9jdXNlZCc6IGZvY3VzZWR9XCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNjYiB0eXBlPVwiY2hlY2tib3hcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCIgW3ZhbHVlXT1cInZhbHVlXCIgW2NoZWNrZWRdPVwiY2hlY2tlZFwiIChmb2N1cyk9XCJvbkZvY3VzKClcIiAoYmx1cik9XCJvbkJsdXIoKVwiXG4gICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJoYW5kbGVDaGFuZ2UoJGV2ZW50KVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIiBbYXR0ci5hcmlhLWNoZWNrZWRdPVwiY2hlY2tlZFwiIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWNoZWNrYm94LWJveFwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudCxjYix0cnVlKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3AtaGlnaGxpZ2h0JzogY2hlY2tlZCwgJ3AtZGlzYWJsZWQnOiBkaXNhYmxlZCwgJ3AtZm9jdXMnOiBmb2N1c2VkfVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1jaGVja2JveC1pY29uXCIgW25nQ2xhc3NdPVwiY2hlY2tlZCA/IGNoZWNrYm94SWNvbiA6IG51bGxcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxsYWJlbCAoY2xpY2spPVwib25DbGljaygkZXZlbnQsY2IsdHJ1ZSlcIiBbY2xhc3NdPVwibGFiZWxTdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3AtY2hlY2tib3gtbGFiZWwnOiB0cnVlLCAncC1jaGVja2JveC1sYWJlbC1hY3RpdmUnOmNoZWNrZWQsICdwLWRpc2FibGVkJzpkaXNhYmxlZCwgJ3AtY2hlY2tib3gtbGFiZWwtZm9jdXMnOmZvY3VzZWR9XCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cImxhYmVsXCIgW2F0dHIuZm9yXT1cImlucHV0SWRcIj57e2xhYmVsfX08L2xhYmVsPlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbQ0hFQ0tCT1hfVkFMVUVfQUNDRVNTT1JdLFxuICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9jaGVja2JveC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBiaW5hcnk6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGxhYmVsU3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBcbiAgICBASW5wdXQoKSBjaGVja2JveEljb246IHN0cmluZyA9ICdwaSBwaS1jaGVjayc7XG4gICAgXG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIEBWaWV3Q2hpbGQoJ2NiJykgaW5wdXRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIG1vZGVsOiBhbnk7XG4gICAgXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICAgICAgXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIFxuICAgIGNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgb25DbGljayhldmVudCxjaGVja2JveCxmb2N1czpib29sZWFuKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZXZlbnQpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGZvY3VzKSB7XG4gICAgICAgICAgICBjaGVja2JveC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZU1vZGVsKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5iaW5hcnkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrZWQpXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRWYWx1ZSgpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVmFsdWUoKTtcblxuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMubW9kZWwpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodGhpcy5tb2RlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtjaGVja2VkOnRoaXMuY2hlY2tlZCwgb3JpZ2luYWxFdmVudDogZXZlbnR9KTtcbiAgICB9XG4gICAgXG4gICAgaGFuZGxlQ2hhbmdlKGV2ZW50KcKge1xuICAgICAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0NoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmJpbmFyeSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmluZGV4T2YodGhpcy52YWx1ZSkgPiAtMTtcbiAgICB9XG5cbiAgICByZW1vdmVWYWx1ZSgpIHtcbiAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMubW9kZWwuZmlsdGVyKHZhbCA9PiB2YWwgIT09IHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIGFkZFZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlbClcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBbLi4udGhpcy5tb2RlbCwgdGhpcy52YWx1ZV07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBbdGhpcy52YWx1ZV07XG4gICAgfVxuICAgIFxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIGZvY3VzKCkge1xuICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgIFxuICAgIHdyaXRlVmFsdWUobW9kZWw6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLmlzQ2hlY2tlZCgpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cbiAgICBcbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQ2hlY2tib3hdLFxuICAgIGRlY2xhcmF0aW9uczogW0NoZWNrYm94XVxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveE1vZHVsZSB7IH1cbiJdfQ==