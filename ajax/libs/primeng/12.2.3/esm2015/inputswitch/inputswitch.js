import { NgModule, Component, Input, forwardRef, EventEmitter, Output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const INPUTSWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputSwitch),
    multi: true
};
export class InputSwitch {
    constructor(cd) {
        this.cd = cd;
        this.trueValue = true;
        this.falseValue = false;
        this.onChange = new EventEmitter();
        this.modelValue = false;
        this.focused = false;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    onClick(event, cb) {
        if (!this.disabled && !this.readonly) {
            event.preventDefault();
            this.toggle(event);
            cb.focus();
        }
    }
    onInputChange(event) {
        if (!this.readonly) {
            const inputChecked = event.target.checked;
            this.updateModel(event, inputChecked);
        }
    }
    toggle(event) {
        this.updateModel(event, !this.checked());
    }
    updateModel(event, value) {
        this.modelValue = value ? this.trueValue : this.falseValue;
        this.onModelChange(this.modelValue);
        this.onChange.emit({
            originalEvent: event,
            checked: this.modelValue
        });
    }
    onFocus(event) {
        this.focused = true;
    }
    onBlur(event) {
        this.focused = false;
        this.onModelTouched();
    }
    writeValue(value) {
        this.modelValue = value;
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
        return this.modelValue === this.trueValue;
    }
}
InputSwitch.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputSwitch, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
InputSwitch.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: InputSwitch, selector: "p-inputSwitch", inputs: { style: "style", styleClass: "styleClass", tabindex: "tabindex", inputId: "inputId", name: "name", disabled: "disabled", readonly: "readonly", trueValue: "trueValue", falseValue: "falseValue", ariaLabelledBy: "ariaLabelledBy" }, outputs: { onChange: "onChange" }, host: { classAttribute: "p-element" }, providers: [INPUTSWITCH_VALUE_ACCESSOR], ngImport: i0, template: `
        <div [ngClass]="{'p-inputswitch p-component': true, 'p-inputswitch-checked': checked(), 'p-disabled': disabled, 'p-focus': focused}"
            [ngStyle]="style" [class]="styleClass" (click)="onClick($event, cb)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [attr.tabindex]="tabindex" [checked]="checked()" (change)="onInputChange($event)"
                    (focus)="onFocus($event)" (blur)="onBlur($event)" [disabled]="disabled" role="switch" [attr.aria-checked]="checked()" [attr.aria-labelledby]="ariaLabelledBy"/>
            </div>
            <span class="p-inputswitch-slider"></span>
        </div>
    `, isInline: true, styles: [".p-inputswitch{position:relative;display:inline-block;-webkit-user-select:none;-ms-user-select:none;user-select:none}.p-inputswitch-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0}.p-inputswitch-slider:before{position:absolute;content:\"\";top:50%}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputSwitch, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-inputSwitch',
                    template: `
        <div [ngClass]="{'p-inputswitch p-component': true, 'p-inputswitch-checked': checked(), 'p-disabled': disabled, 'p-focus': focused}"
            [ngStyle]="style" [class]="styleClass" (click)="onClick($event, cb)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [attr.tabindex]="tabindex" [checked]="checked()" (change)="onInputChange($event)"
                    (focus)="onFocus($event)" (blur)="onBlur($event)" [disabled]="disabled" role="switch" [attr.aria-checked]="checked()" [attr.aria-labelledby]="ariaLabelledBy"/>
            </div>
            <span class="p-inputswitch-slider"></span>
        </div>
    `,
                    providers: [INPUTSWITCH_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./inputswitch.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], inputId: [{
                type: Input
            }], name: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], trueValue: [{
                type: Input
            }], falseValue: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], onChange: [{
                type: Output
            }] } });
export class InputSwitchModule {
}
InputSwitchModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputSwitchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
InputSwitchModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputSwitchModule, declarations: [InputSwitch], imports: [CommonModule], exports: [InputSwitch] });
InputSwitchModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputSwitchModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputSwitchModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [InputSwitch],
                    declarations: [InputSwitch]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRzd2l0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvaW5wdXRzd2l0Y2gvaW5wdXRzd2l0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFtQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuSixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUFzQixNQUFNLGdCQUFnQixDQUFDOzs7QUFFdEUsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQVE7SUFDN0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUMxQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFzQkYsTUFBTSxPQUFPLFdBQVc7SUFnQ3BCLFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBaEJoQyxjQUFTLEdBQVEsSUFBSSxDQUFDO1FBRXRCLGVBQVUsR0FBUSxLQUFLLENBQUM7UUFJdkIsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTNELGVBQVUsR0FBUSxLQUFLLENBQUM7UUFFeEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QixrQkFBYSxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUVuQyxtQkFBYyxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQUVRLENBQUM7SUFFN0MsT0FBTyxDQUFDLEtBQVksRUFBRSxFQUFvQjtRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEMsS0FBSyxDQUFD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QUVHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBRUksUUFBUTtzQkFBakIsTUFBTTs7QUE2RVgsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQW5HakIsV0FBVyxhQStGVixZQUFZLGFBL0ZiLFdBQVc7K0dBbUdYLGlCQUFpQixZQUpqQixDQUFDLFlBQVksQ0FBQzsyRkFJZCxpQkFBaUI7a0JBTDdCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0JBQ3RCLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCxmb3J3YXJkUmVmLEV2ZW50RW1pdHRlcixPdXRwdXQsQ2hhbmdlRGV0ZWN0b3JSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUixDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgSU5QVVRTV0lUQ0hfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElucHV0U3dpdGNoKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1pbnB1dFN3aXRjaCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3AtaW5wdXRzd2l0Y2ggcC1jb21wb25lbnQnOiB0cnVlLCAncC1pbnB1dHN3aXRjaC1jaGVja2VkJzogY2hlY2tlZCgpLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkLCAncC1mb2N1cyc6IGZvY3VzZWR9XCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQsIGNiKVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgI2NiIHR5cGU9XCJjaGVja2JveFwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFtjaGVja2VkXT1cImNoZWNrZWQoKVwiIChjaGFuZ2UpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgcm9sZT1cInN3aXRjaFwiIFthdHRyLmFyaWEtY2hlY2tlZF09XCJjaGVja2VkKClcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIi8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1pbnB1dHN3aXRjaC1zbGlkZXJcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbSU5QVVRTV0lUQ0hfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vaW5wdXRzd2l0Y2guY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRTd2l0Y2ggaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSB0cnVlVmFsdWU6IGFueSA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBmYWxzZVZhbHVlOiBhbnkgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgbW9kZWxWYWx1ZTogYW55ID0gZmFsc2U7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50LCBjYjogSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZShldmVudCk7XG4gICAgICAgICAgICBjYi5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dENoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dENoZWNrZWQgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+IGV2ZW50LnRhcmdldCkuY2hlY2tlZDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZXZlbnQsIGlucHV0Q2hlY2tlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZXZlbnQsICF0aGlzLmNoZWNrZWQoKSk7XG4gICAgfVxuXG4gICAgdXBkYXRlTW9kZWwoZXZlbnQ6IEV2ZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm1vZGVsVmFsdWUgPSB2YWx1ZSA/IHRoaXMudHJ1ZVZhbHVlIDogdGhpcy5mYWxzZVZhbHVlO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5tb2RlbFZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgY2hlY2tlZDogdGhpcy5tb2RlbFZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRm9jdXMoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25CbHVyKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb2RlbFZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGNoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsVmFsdWUgPT09IHRoaXMudHJ1ZVZhbHVlO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbSW5wdXRTd2l0Y2hdLFxuICAgIGRlY2xhcmF0aW9uczogW0lucHV0U3dpdGNoXVxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dFN3aXRjaE1vZHVsZSB7IH1cbiJdfQ==