import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, Injectable, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import * as i0 from "@angular/core";
export const RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButton),
    multi: true
};
export class RadioControlRegistry {
    constructor() {
        this.accessors = [];
    }
    add(control, accessor) {
        this.accessors.push([control, accessor]);
    }
    remove(accessor) {
        this.accessors = this.accessors.filter((c) => {
            return c[1] !== accessor;
        });
    }
    select(accessor) {
        this.accessors.forEach((c) => {
            if (this.isSameGroup(c, accessor) && c[1] !== accessor) {
                c[1].writeValue(accessor.value);
            }
        });
    }
    isSameGroup(controlPair, accessor) {
        if (!controlPair[0].control) {
            return false;
        }
        return controlPair[0].control.root === accessor.control.control.root && controlPair[1].name === accessor.name;
    }
}
RadioControlRegistry.ɵprov = i0.ɵɵdefineInjectable({ factory: function RadioControlRegistry_Factory() { return new RadioControlRegistry(); }, token: RadioControlRegistry, providedIn: "root" });
RadioControlRegistry.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
export class RadioButton {
    constructor(cd, injector, registry) {
        this.cd = cd;
        this.injector = injector;
        this.registry = registry;
        this.onClick = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        if (this.formControlName) {
            this.control = this.injector.get(NgControl);
            this.checkName();
            this.registry.add(this.control, this);
        }
    }
    handleClick(event, radioButton, focus) {
        event.preventDefault();
        if (this.disabled) {
            return;
        }
        this.select(event);
        if (focus) {
            radioButton.focus();
        }
    }
    select(event) {
        if (!this.disabled) {
            this.inputViewChild.nativeElement.checked = true;
            this.checked = true;
            this.onModelChange(this.value);
            if (this.formControlName) {
                this.registry.select(this);
            }
            this.onClick.emit(event);
        }
    }
    writeValue(value) {
        this.checked = (value == this.value);
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            this.inputViewChild.nativeElement.checked = this.checked;
        }
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
    onInputFocus(event) {
        this.focused = true;
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.focused = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    onChange(event) {
        this.select(event);
    }
    focus() {
        this.inputViewChild.nativeElement.focus();
    }
    ngOnDestroy() {
        if (this.formControlName) {
            this.registry.remove(this);
        }
    }
    checkName() {
        if (this.name && this.formControlName && this.name !== this.formControlName) {
            this.throwNameError();
        }
        if (!this.name && this.formControlName) {
            this.name = this.formControlName;
        }
    }
    throwNameError() {
        throw new Error(`
          If you define both a name and a formControlName attribute on your radio button, their values
          must match. Ex: <p-radioButton formControlName="food" name="food"></p-radioButton>
        `);
    }
}
RadioButton.decorators = [
    { type: Component, args: [{
                selector: 'p-radioButton',
                template: `
        <div [ngStyle]="style" [ngClass]="{'p-radiobutton p-component':true,'p-radiobutton-checked': checked, 'p-radiobutton-disabled': disabled, 'p-radiobutton-focused': focused}" [class]="styleClass">
            <div class="p-hidden-accessible">
                <input #rb type="radio" [attr.id]="inputId" [attr.name]="name" [attr.value]="value" [attr.tabindex]="tabindex" [attr.aria-labelledby]="ariaLabelledBy"
                    [checked]="checked" (change)="onChange($event)" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" [disabled]="disabled">
            </div>
            <div (click)="handleClick($event, rb, true)" role="radio" [attr.aria-checked]="checked"
                [ngClass]="{'p-radiobutton-box':true,
                'p-highlight': checked, 'p-disabled': disabled, 'p-focus': focused}">
                <span class="p-radiobutton-icon"></span>
            </div>
        </div>
        <label (click)="select($event)" [class]="labelStyleClass"
            [ngClass]="{'p-radiobutton-label':true, 'p-radiobutton-label-active':rb.checked, 'p-disabled':disabled, 'p-radiobutton-label-focus':focused}"
            *ngIf="label" [attr.for]="inputId">{{label}}</label>
    `,
                providers: [RADIO_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
RadioButton.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Injector },
    { type: RadioControlRegistry }
];
RadioButton.propDecorators = {
    value: [{ type: Input }],
    formControlName: [{ type: Input }],
    name: [{ type: Input }],
    disabled: [{ type: Input }],
    label: [{ type: Input }],
    tabindex: [{ type: Input }],
    inputId: [{ type: Input }],
    ariaLabelledBy: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    labelStyleClass: [{ type: Input }],
    onClick: [{ type: Output }],
    onFocus: [{ type: Output }],
    onBlur: [{ type: Output }],
    inputViewChild: [{ type: ViewChild, args: ['rb',] }]
};
export class RadioButtonModule {
}
RadioButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [RadioButton],
                declarations: [RadioButton]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9idXR0b24uanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3JhZGlvYnV0dG9uLyIsInNvdXJjZXMiOlsicmFkaW9idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBWSxZQUFZLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsRUFBQyx1QkFBdUIsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUM5TCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUF3QixTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFbEYsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQVE7SUFDckMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUMxQyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFLRixNQUFNLE9BQU8sb0JBQW9CO0lBSGpDO1FBSVksY0FBUyxHQUFVLEVBQUUsQ0FBQztLQTJCakM7SUF6QkcsR0FBRyxDQUFDLE9BQWtCLEVBQUUsUUFBcUI7UUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQXFCO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN6QyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQXFCO1FB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ImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LE91dHB1dCxFbGVtZW50UmVmLEV2ZW50RW1pdHRlcixmb3J3YXJkUmVmLFZpZXdDaGlsZCxDaGFuZ2VEZXRlY3RvclJlZixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIE9uSW5pdCwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5nQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgUkFESU9fVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSYWRpb0J1dHRvbiksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvQ29udHJvbFJlZ2lzdHJ5IHtcbiAgICBwcml2YXRlIGFjY2Vzc29yczogYW55W10gPSBbXTtcblxuICAgIGFkZChjb250cm9sOiBOZ0NvbnRyb2wsIGFjY2Vzc29yOiBSYWRpb0J1dHRvbikge1xuICAgICAgICB0aGlzLmFjY2Vzc29ycy5wdXNoKFtjb250cm9sLCBhY2Nlc3Nvcl0pO1xuICAgIH1cblxuICAgIHJlbW92ZShhY2Nlc3NvcjogUmFkaW9CdXR0b24pIHtcbiAgICAgICAgdGhpcy5hY2Nlc3NvcnMgPSB0aGlzLmFjY2Vzc29ycy5maWx0ZXIoKGMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjWzFdICE9PSBhY2Nlc3NvcjtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzZWxlY3QoYWNjZXNzb3I6IFJhZGlvQnV0dG9uKSB7XG4gICAgICAgIHRoaXMuYWNjZXNzb3JzLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2FtZUdyb3VwKGMsIGFjY2Vzc29yKSAmJiBjWzFdICE9PSBhY2Nlc3Nvcikge1xuICAgICAgICAgICAgICAgIGNbMV0ud3JpdGVWYWx1ZShhY2Nlc3Nvci52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTYW1lR3JvdXAoY29udHJvbFBhaXI6IFtOZ0NvbnRyb2wsIFJhZGlvQnV0dG9uXSwgYWNjZXNzb3I6IFJhZGlvQnV0dG9uKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghY29udHJvbFBhaXJbMF0uY29udHJvbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbnRyb2xQYWlyWzBdLmNvbnRyb2wucm9vdCA9PT0gYWNjZXNzb3IuY29udHJvbC5jb250cm9sLnJvb3QgJiYgY29udHJvbFBhaXJbMV0ubmFtZSA9PT0gYWNjZXNzb3IubmFtZTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1yYWRpb0J1dHRvbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cInsncC1yYWRpb2J1dHRvbiBwLWNvbXBvbmVudCc6dHJ1ZSwncC1yYWRpb2J1dHRvbi1jaGVja2VkJzogY2hlY2tlZCwgJ3AtcmFkaW9idXR0b24tZGlzYWJsZWQnOiBkaXNhYmxlZCwgJ3AtcmFkaW9idXR0b24tZm9jdXNlZCc6IGZvY3VzZWR9XCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNyYiB0eXBlPVwicmFkaW9cIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2F0dHIudmFsdWVdPVwidmFsdWVcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cImNoZWNrZWRcIiAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudClcIiAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgcmIsIHRydWUpXCIgcm9sZT1cInJhZGlvXCIgW2F0dHIuYXJpYS1jaGVja2VkXT1cImNoZWNrZWRcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncC1yYWRpb2J1dHRvbi1ib3gnOnRydWUsXG4gICAgICAgICAgICAgICAgJ3AtaGlnaGxpZ2h0JzogY2hlY2tlZCwgJ3AtZGlzYWJsZWQnOiBkaXNhYmxlZCwgJ3AtZm9jdXMnOiBmb2N1c2VkfVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1yYWRpb2J1dHRvbi1pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bGFiZWwgKGNsaWNrKT1cInNlbGVjdCgkZXZlbnQpXCIgW2NsYXNzXT1cImxhYmVsU3R5bGVDbGFzc1wiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3AtcmFkaW9idXR0b24tbGFiZWwnOnRydWUsICdwLXJhZGlvYnV0dG9uLWxhYmVsLWFjdGl2ZSc6cmIuY2hlY2tlZCwgJ3AtZGlzYWJsZWQnOmRpc2FibGVkLCAncC1yYWRpb2J1dHRvbi1sYWJlbC1mb2N1cyc6Zm9jdXNlZH1cIlxuICAgICAgICAgICAgKm5nSWY9XCJsYWJlbFwiIFthdHRyLmZvcl09XCJpbnB1dElkXCI+e3tsYWJlbH19PC9sYWJlbD5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW1JBRElPX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBSYWRpb0J1dHRvbiBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55O1xuXG4gICAgQElucHV0KCkgZm9ybUNvbnRyb2xOYW1lOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBsYWJlbFN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKSBvbkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgncmInKSBpbnB1dFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIHB1YmxpYyBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgcHVibGljIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgcHVibGljIGNoZWNrZWQ6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgZm9jdXNlZDogYm9vbGVhbjtcblxuICAgIGNvbnRyb2w6IE5nQ29udHJvbDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIHJlZ2lzdHJ5OiBSYWRpb0NvbnRyb2xSZWdpc3RyeSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5mb3JtQ29udHJvbE5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbCA9IHRoaXMuaW5qZWN0b3IuZ2V0KE5nQ29udHJvbCk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTmFtZSgpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5hZGQodGhpcy5jb250cm9sLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBoYW5kbGVDbGljayhldmVudCwgcmFkaW9CdXR0b24sIGZvY3VzKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0KGV2ZW50KTtcblxuICAgICAgICBpZiAoZm9jdXMpIHtcbiAgICAgICAgICAgIHJhZGlvQnV0dG9uLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgc2VsZWN0KGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNvbnRyb2xOYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25DbGljay5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gKHZhbHVlID09IHRoaXMudmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkICYmIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmNoZWNrZWQgPSB0aGlzLmNoZWNrZWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbklucHV0Rm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkZvY3VzLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uSW5wdXRCbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmZvcm1Db250cm9sTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeS5yZW1vdmUodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrTmFtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubmFtZSAmJiB0aGlzLmZvcm1Db250cm9sTmFtZSAmJiB0aGlzLm5hbWUgIT09IHRoaXMuZm9ybUNvbnRyb2xOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnRocm93TmFtZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLm5hbWUgJiYgdGhpcy5mb3JtQ29udHJvbE5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuZm9ybUNvbnRyb2xOYW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0aHJvd05hbWVFcnJvcigpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgICAgICBJZiB5b3UgZGVmaW5lIGJvdGggYSBuYW1lIGFuZCBhIGZvcm1Db250cm9sTmFtZSBhdHRyaWJ1dGUgb24geW91ciByYWRpbyBidXR0b24sIHRoZWlyIHZhbHVlc1xuICAgICAgICAgIG11c3QgbWF0Y2guIEV4OiA8cC1yYWRpb0J1dHRvbiBmb3JtQ29udHJvbE5hbWU9XCJmb29kXCIgbmFtZT1cImZvb2RcIj48L3AtcmFkaW9CdXR0b24+XG4gICAgICAgIGApO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbUmFkaW9CdXR0b25dLFxuICAgIGRlY2xhcmF0aW9uczogW1JhZGlvQnV0dG9uXVxufSlcbmV4cG9ydCBjbGFzcyBSYWRpb0J1dHRvbk1vZHVsZSB7IH0iXX0=