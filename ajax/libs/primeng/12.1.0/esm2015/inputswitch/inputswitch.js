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
        this.onChange = new EventEmitter();
        this.checked = false;
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
        this.updateModel(event, !this.checked);
    }
    updateModel(event, value) {
        this.checked = value;
        this.onModelChange(this.checked);
        this.onChange.emit({
            originalEvent: event,
            checked: this.checked
        });
    }
    onFocus(event) {
        this.focused = true;
    }
    onBlur(event) {
        this.focused = false;
        this.onModelTouched();
    }
    writeValue(checked) {
        this.checked = checked;
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
InputSwitch.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputSwitch, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
InputSwitch.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: InputSwitch, selector: "p-inputSwitch", inputs: { style: "style", styleClass: "styleClass", tabindex: "tabindex", inputId: "inputId", name: "name", disabled: "disabled", readonly: "readonly", ariaLabelledBy: "ariaLabelledBy" }, outputs: { onChange: "onChange" }, providers: [INPUTSWITCH_VALUE_ACCESSOR], ngImport: i0, template: `
        <div [ngClass]="{'p-inputswitch p-component': true, 'p-inputswitch-checked': checked, 'p-disabled': disabled, 'p-focus': focused}" 
            [ngStyle]="style" [class]="styleClass" (click)="onClick($event, cb)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [attr.tabindex]="tabindex" [checked]="checked" (change)="onInputChange($event)"
                    (focus)="onFocus($event)" (blur)="onBlur($event)" [disabled]="disabled" role="switch" [attr.aria-checked]="checked" [attr.aria-labelledby]="ariaLabelledBy"/>
            </div>
            <span class="p-inputswitch-slider"></span>
        </div>
    `, isInline: true, styles: [".p-inputswitch{position:relative;display:inline-block;-webkit-user-select:none;-ms-user-select:none;user-select:none}.p-inputswitch-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0}.p-inputswitch-slider:before{position:absolute;content:\"\";top:50%}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputSwitch, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-inputSwitch',
                    template: `
        <div [ngClass]="{'p-inputswitch p-component': true, 'p-inputswitch-checked': checked, 'p-disabled': disabled, 'p-focus': focused}" 
            [ngStyle]="style" [class]="styleClass" (click)="onClick($event, cb)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [attr.tabindex]="tabindex" [checked]="checked" (change)="onInputChange($event)"
                    (focus)="onFocus($event)" (blur)="onBlur($event)" [disabled]="disabled" role="switch" [attr.aria-checked]="checked" [attr.aria-labelledby]="ariaLabelledBy"/>
            </div>
            <span class="p-inputswitch-slider"></span>
        </div>
    `,
                    providers: [INPUTSWITCH_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./inputswitch.css']
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRzd2l0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvaW5wdXRzd2l0Y2gvaW5wdXRzd2l0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFtQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuSixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUFzQixNQUFNLGdCQUFnQixDQUFDOzs7QUFFdEUsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQVE7SUFDN0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUMxQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFtQkYsTUFBTSxPQUFPLFdBQVc7SUE0QnBCLFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBVi9CLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUzRCxZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFekIsa0JBQWEsR0FBYSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFFbkMsbUJBQWMsR0FBYSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFFUSxDQUFDO0lBRTdDLE9BQU8sQ0FBQyxLQUFZLEVBQUUsRUFBb0I7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO0lBQ0wsQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUFZO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLE1BQU0sWUFBWSxHQUF1QixLQUFLLENBQUMsTUFBTyxDQUFDLE9BQU8sQ0FBQztZQUMvRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztTQUN6QztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBWTtRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBWSxFQUFFLEtBQWM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDZixhQUFhLEVBQUUsS0FBSztZQUNwQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDeEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFZO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBWTtRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQVk7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBWTtRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBWTtRQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsR0FBWTtRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7O3dHQW5GUSxXQUFXOzRGQUFYLFdBQVcsdVFBTFQsQ0FBQywwQkFBMEIsQ0FBQywwQkFWN0I7Ozs7Ozs7OztLQVNUOzJGQU1RLFdBQVc7a0JBakJ2QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUU7Ozs7Ozs7OztLQVNUO29CQUNELFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO29CQUN2QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUNuQzt3R0FHWSxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLE9BQU87c0JBQWYsS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBRUksUUFBUTtzQkFBakIsTUFBTTs7QUF5RVgsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQTNGakIsV0FBVyxhQXVGVixZQUFZLGFBdkZiLFdBQVc7K0dBMkZYLGlCQUFpQixZQUpqQixDQUFDLFlBQVksQ0FBQzsyRkFJZCxpQkFBaUI7a0JBTDdCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0JBQ3RCLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCxmb3J3YXJkUmVmLEV2ZW50RW1pdHRlcixPdXRwdXQsQ2hhbmdlRGV0ZWN0b3JSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUixDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgSU5QVVRTV0lUQ0hfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElucHV0U3dpdGNoKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1pbnB1dFN3aXRjaCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3AtaW5wdXRzd2l0Y2ggcC1jb21wb25lbnQnOiB0cnVlLCAncC1pbnB1dHN3aXRjaC1jaGVja2VkJzogY2hlY2tlZCwgJ3AtZGlzYWJsZWQnOiBkaXNhYmxlZCwgJ3AtZm9jdXMnOiBmb2N1c2VkfVwiIFxuICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIChjbGljayk9XCJvbkNsaWNrKCRldmVudCwgY2IpXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCAjY2IgdHlwZT1cImNoZWNrYm94XCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCIgW2NoZWNrZWRdPVwiY2hlY2tlZFwiIChjaGFuZ2UpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgcm9sZT1cInN3aXRjaFwiIFthdHRyLmFyaWEtY2hlY2tlZF09XCJjaGVja2VkXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtaW5wdXRzd2l0Y2gtc2xpZGVyXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW0lOUFVUU1dJVENIX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2lucHV0c3dpdGNoLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIElucHV0U3dpdGNoIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcbiAgICBcbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCwgY2I6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGUoZXZlbnQpO1xuICAgICAgICAgICAgY2IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXRDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgY29uc3QgaW5wdXRDaGVja2VkID0gKDxIVE1MSW5wdXRFbGVtZW50PiBldmVudC50YXJnZXQpLmNoZWNrZWQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGV2ZW50LCBpbnB1dENoZWNrZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGV2ZW50LCAhdGhpcy5jaGVja2VkKTtcbiAgICB9XG5cbiAgICB1cGRhdGVNb2RlbChldmVudDogRXZlbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgY2hlY2tlZDogdGhpcy5jaGVja2VkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRm9jdXMoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25CbHVyKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUoY2hlY2tlZDogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBjaGVja2VkO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuICAgIFxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtJbnB1dFN3aXRjaF0sXG4gICAgZGVjbGFyYXRpb25zOiBbSW5wdXRTd2l0Y2hdXG59KVxuZXhwb3J0IGNsYXNzIElucHV0U3dpdGNoTW9kdWxlIHsgfVxuIl19