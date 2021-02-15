import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const TRISTATECHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TriStateCheckbox),
    multi: true
};
export class TriStateCheckbox {
    constructor(cd) {
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    onClick(event, input) {
        if (!this.disabled && !this.readonly) {
            this.toggle(event);
            this.focused = true;
            input.focus();
        }
    }
    onKeydown(event) {
        if (event.keyCode == 32) {
            event.preventDefault();
        }
    }
    onKeyup(event) {
        if (event.keyCode == 32 && !this.readonly) {
            this.toggle(event);
            event.preventDefault();
        }
    }
    toggle(event) {
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
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
        this.onModelTouched();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    writeValue(value) {
        this.value = value;
        this.cd.markForCheck();
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
        this.cd.markForCheck();
    }
}
TriStateCheckbox.decorators = [
    { type: Component, args: [{
                selector: 'p-triStateCheckbox',
                template: `
        <div [ngStyle]="style" [ngClass]="{'p-checkbox p-component': true,'p-checkbox-disabled': disabled, 'p-checkbox-focused': focused}" [class]="styleClass">
            <div class="p-hidden-accessible">
                <input #input type="text" [attr.id]="inputId" [name]="name" [attr.tabindex]="tabindex" [readonly]="readonly" [disabled]="disabled" (keyup)="onKeyup($event)" (keydown)="onKeydown($event)" (focus)="onFocus()" (blur)="onBlur()" [attr.aria-labelledby]="ariaLabelledBy" inputmode="none">
            </div>
            <div class="p-checkbox-box" (click)="onClick($event,input)"  role="checkbox" [attr.aria-checked]="value === true"
                [ngClass]="{'p-highlight':value!=null,'p-disabled':disabled,'p-focus':focused}">
                <span class="p-checkbox-icon pi" [ngClass]="{'pi-check':value==true,'pi-times':value==false}"></span>
            </div>
        </div>
        <label class="p-checkbox-label" (click)="onClick($event,input)"
               [ngClass]="{'p-checkbox-label-active':value!=null, 'p-disabled':disabled, 'p-checkbox-label-focus':focused}"
               *ngIf="label" [attr.for]="inputId">{{label}}</label>
    `,
                providers: [TRISTATECHECKBOX_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] }
];
TriStateCheckbox.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
TriStateCheckbox.propDecorators = {
    disabled: [{ type: Input }],
    name: [{ type: Input }],
    ariaLabelledBy: [{ type: Input }],
    tabindex: [{ type: Input }],
    inputId: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    label: [{ type: Input }],
    readonly: [{ type: Input }],
    onChange: [{ type: Output }]
};
export class TriStateCheckboxModule {
}
TriStateCheckboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [TriStateCheckbox],
                declarations: [TriStateCheckbox]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpc3RhdGVjaGVja2JveC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvdHJpc3RhdGVjaGVja2JveC8iLCJzb3VyY2VzIjpbInRyaXN0YXRlY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLGlCQUFpQixFQUFDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25KLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsaUJBQWlCLEVBQXVCLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQVE7SUFDbEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQXNCRixNQUFNLE9BQU8sZ0JBQWdCO0lBRXpCLFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBb0IvQixhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFNM0Qsa0JBQWEsR0FBYSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFFbkMsbUJBQWMsR0FBYSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUE1QlEsQ0FBQztJQThCN0MsT0FBTyxDQUFDLEtBQVksRUFBRSxLQUF1QjtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDakI7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQW9CO1FBQzFCLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQUU7WUFDckIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFvQjtRQUN4QixJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBWTtRQUNmLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTO1lBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ2pCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2FBQ2xCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRXRCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2YsYUFBYSxFQUFFLEtBQUs7WUFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ3BCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQVk7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQVk7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGdCQUFnQixDQUFDLFFBQWlCO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBakhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7S0FhVDtnQkFDRCxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztnQkFDNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3hDOzs7WUE3QitELGlCQUFpQjs7O3VCQWtDNUUsS0FBSzttQkFFTCxLQUFLOzZCQUVMLEtBQUs7dUJBRUwsS0FBSztzQkFFTCxLQUFLO29CQUVMLEtBQUs7eUJBRUwsS0FBSztvQkFFTCxLQUFLO3VCQUVMLEtBQUs7dUJBRUwsTUFBTTs7QUErRVgsTUFBTSxPQUFPLHNCQUFzQjs7O1lBTGxDLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUMzQixZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUNuQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsZm9yd2FyZFJlZixDaGFuZ2VEZXRlY3RvclJlZixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgVFJJU1RBVEVDSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVHJpU3RhdGVDaGVja2JveCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdHJpU3RhdGVDaGVja2JveCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cInsncC1jaGVja2JveCBwLWNvbXBvbmVudCc6IHRydWUsJ3AtY2hlY2tib3gtZGlzYWJsZWQnOiBkaXNhYmxlZCwgJ3AtY2hlY2tib3gtZm9jdXNlZCc6IGZvY3VzZWR9XCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNpbnB1dCB0eXBlPVwidGV4dFwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbbmFtZV09XCJuYW1lXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiBbcmVhZG9ubHldPVwicmVhZG9ubHlcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAoa2V5dXApPVwib25LZXl1cCgkZXZlbnQpXCIgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudClcIiAoZm9jdXMpPVwib25Gb2N1cygpXCIgKGJsdXIpPVwib25CbHVyKClcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIiBpbnB1dG1vZGU9XCJub25lXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWNoZWNrYm94LWJveFwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudCxpbnB1dClcIiAgcm9sZT1cImNoZWNrYm94XCIgW2F0dHIuYXJpYS1jaGVja2VkXT1cInZhbHVlID09PSB0cnVlXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3AtaGlnaGxpZ2h0Jzp2YWx1ZSE9bnVsbCwncC1kaXNhYmxlZCc6ZGlzYWJsZWQsJ3AtZm9jdXMnOmZvY3VzZWR9XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWNoZWNrYm94LWljb24gcGlcIiBbbmdDbGFzc109XCJ7J3BpLWNoZWNrJzp2YWx1ZT09dHJ1ZSwncGktdGltZXMnOnZhbHVlPT1mYWxzZX1cIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cInAtY2hlY2tib3gtbGFiZWxcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQsaW5wdXQpXCJcbiAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncC1jaGVja2JveC1sYWJlbC1hY3RpdmUnOnZhbHVlIT1udWxsLCAncC1kaXNhYmxlZCc6ZGlzYWJsZWQsICdwLWNoZWNrYm94LWxhYmVsLWZvY3VzJzpmb2N1c2VkfVwiXG4gICAgICAgICAgICAgICAqbmdJZj1cImxhYmVsXCIgW2F0dHIuZm9yXT1cImlucHV0SWRcIj57e2xhYmVsfX08L2xhYmVsPlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbVFJJU1RBVEVDSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBUcmlTdGF0ZUNoZWNrYm94IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IgIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbjtcblxuICAgIHZhbHVlOiBhbnk7XG5cbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCwgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZShldmVudCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAzMikge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMzIgJiYgIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGV2ZW50KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09IG51bGwgfHwgdGhpcy52YWx1ZSA9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgZWxzZSBpZiAodGhpcy52YWx1ZSA9PSB0cnVlKVxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGZhbHNlO1xuICAgICAgICBlbHNlIGlmICh0aGlzLnZhbHVlID09IGZhbHNlKVxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtUcmlTdGF0ZUNoZWNrYm94XSxcbiAgICBkZWNsYXJhdGlvbnM6IFtUcmlTdGF0ZUNoZWNrYm94XVxufSlcbmV4cG9ydCBjbGFzcyBUcmlTdGF0ZUNoZWNrYm94TW9kdWxlIHsgfVxuIl19