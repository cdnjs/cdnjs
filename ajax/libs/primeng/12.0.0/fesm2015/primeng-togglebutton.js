import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, Input, Output, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from 'primeng/ripple';
import { RippleModule } from 'primeng/ripple';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const TOGGLEBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleButton),
    multi: true
};
class ToggleButton {
    constructor(cd) {
        this.cd = cd;
        this.iconPos = 'left';
        this.onChange = new EventEmitter();
        this.checked = false;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    toggle(event) {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
            this.cd.markForCheck();
        }
    }
    onBlur() {
        this.onModelTouched();
    }
    writeValue(value) {
        this.checked = value;
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
    get hasOnLabel() {
        return this.onLabel && this.onLabel.length > 0;
    }
    get hasOffLabel() {
        return this.onLabel && this.onLabel.length > 0;
    }
}
ToggleButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ToggleButton, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ToggleButton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: ToggleButton, selector: "p-toggleButton", inputs: { onLabel: "onLabel", offLabel: "offLabel", onIcon: "onIcon", offIcon: "offIcon", ariaLabelledBy: "ariaLabelledBy", disabled: "disabled", style: "style", styleClass: "styleClass", inputId: "inputId", tabindex: "tabindex", iconPos: "iconPos" }, outputs: { onChange: "onChange" }, providers: [TOGGLEBUTTON_VALUE_ACCESSOR], ngImport: i0, template: `
        <div [ngClass]="{'p-button p-togglebutton p-component': true, 'p-button-icon-only': (onIcon && offIcon && !hasOnLabel && !hasOffLabel),'p-highlight': checked,'p-disabled':disabled}" 
                        [ngStyle]="style" [class]="styleClass" (click)="toggle($event)" (keydown.enter)="toggle($event)"
                        [attr.tabindex]="disabled ? null : '0'" role="checkbox" [attr.aria-checked]="checked" pRipple>
            <span *ngIf="onIcon||offIcon" [class]="checked ? this.onIcon : this.offIcon" 
                [ngClass]="{'p-button-icon': true, 'p-button-icon-left': (iconPos === 'left'), 'p-button-icon-right': (iconPos === 'right')}"></span>
            <span class="p-button-label">{{checked ? hasOnLabel ? onLabel : '' : hasOffLabel ? offLabel : ''}}</span>
        </div>
    `, isInline: true, styles: [".p-button{margin:0;display:inline-flex;cursor:pointer;-webkit-user-select:none;-ms-user-select:none;user-select:none;align-items:center;vertical-align:bottom;text-align:center;overflow:hidden;position:relative}.p-button-label{flex:1 1 auto}.p-button-icon-right{order:1}.p-button:disabled{cursor:default}.p-button-icon-only{justify-content:center}.p-button-icon-only .p-button-label{visibility:hidden;width:0;flex:0 0 auto}.p-button-vertical{flex-direction:column}.p-button-icon-bottom{order:2}.p-buttonset .p-button{margin:0}.p-buttonset .p-button:not(:last-child){border-right:0}.p-buttonset .p-button:not(:first-of-type):not(:last-of-type){border-radius:0}.p-buttonset .p-button:first-of-type{border-top-right-radius:0;border-bottom-right-radius:0}.p-buttonset .p-button:last-of-type{border-top-left-radius:0;border-bottom-left-radius:0}.p-buttonset .p-button:focus{position:relative;z-index:1}.p-button-label{transition:all .2s}"], directives: [{ type: i1.Ripple, selector: "[pRipple]" }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ToggleButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-toggleButton',
                    template: `
        <div [ngClass]="{'p-button p-togglebutton p-component': true, 'p-button-icon-only': (onIcon && offIcon && !hasOnLabel && !hasOffLabel),'p-highlight': checked,'p-disabled':disabled}" 
                        [ngStyle]="style" [class]="styleClass" (click)="toggle($event)" (keydown.enter)="toggle($event)"
                        [attr.tabindex]="disabled ? null : '0'" role="checkbox" [attr.aria-checked]="checked" pRipple>
            <span *ngIf="onIcon||offIcon" [class]="checked ? this.onIcon : this.offIcon" 
                [ngClass]="{'p-button-icon': true, 'p-button-icon-left': (iconPos === 'left'), 'p-button-icon-right': (iconPos === 'right')}"></span>
            <span class="p-button-label">{{checked ? hasOnLabel ? onLabel : '' : hasOffLabel ? offLabel : ''}}</span>
        </div>
    `,
                    providers: [TOGGLEBUTTON_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styleUrls: ['../button/button.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { onLabel: [{
                type: Input
            }], offLabel: [{
                type: Input
            }], onIcon: [{
                type: Input
            }], offIcon: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], disabled: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], inputId: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], iconPos: [{
                type: Input
            }], onChange: [{
                type: Output
            }] } });
class ToggleButtonModule {
}
ToggleButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ToggleButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ToggleButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ToggleButtonModule, declarations: [ToggleButton], imports: [CommonModule, RippleModule], exports: [ToggleButton] });
ToggleButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ToggleButtonModule, imports: [[CommonModule, RippleModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: ToggleButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule],
                    exports: [ToggleButton],
                    declarations: [ToggleButton]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TOGGLEBUTTON_VALUE_ACCESSOR, ToggleButton, ToggleButtonModule };
//# sourceMappingURL=primeng-togglebutton.js.map
