import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, ViewChild, ContentChildren, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Chips),
    multi: true
};
class Chips {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.allowDuplicate = true;
        this.onAdd = new EventEmitter();
        this.onRemove = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onChipClick = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    onClick() {
        this.inputViewChild.nativeElement.focus();
    }
    onInput() {
        this.updateFilledState();
    }
    onPaste(event) {
        if (!this.disabled) {
            if (this.separator) {
                let pastedData = (event.clipboardData || window['clipboardData']).getData('Text');
                pastedData.split(this.separator).forEach(val => {
                    this.addItem(event, val, true);
                });
                this.inputViewChild.nativeElement.value = '';
            }
            this.updateFilledState();
        }
    }
    updateFilledState() {
        if (!this.value || this.value.length === 0) {
            this.filled = (this.inputViewChild.nativeElement && this.inputViewChild.nativeElement.value != '');
        }
        else {
            this.filled = true;
        }
    }
    onItemClick(event, item) {
        this.onChipClick.emit({
            originalEvent: event,
            value: item
        });
    }
    writeValue(value) {
        this.value = value;
        this.updateMaxedOut();
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
    resolveFieldData(data, field) {
        if (data && field) {
            if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                let fields = field.split('.');
                let value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    }
    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.focus = false;
        if (this.addOnBlur && this.inputViewChild.nativeElement.value) {
            this.addItem(event, this.inputViewChild.nativeElement.value, false);
        }
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    removeItem(event, index) {
        if (this.disabled) {
            return;
        }
        let removedItem = this.value[index];
        this.value = this.value.filter((val, i) => i != index);
        this.onModelChange(this.value);
        this.onRemove.emit({
            originalEvent: event,
            value: removedItem
        });
        this.updateFilledState();
        this.updateMaxedOut();
    }
    addItem(event, item, preventDefault) {
        this.value = this.value || [];
        if (item && item.trim().length) {
            if (this.allowDuplicate || this.value.indexOf(item) === -1) {
                this.value = [...this.value, item];
                this.onModelChange(this.value);
                this.onAdd.emit({
                    originalEvent: event,
                    value: item
                });
            }
        }
        this.updateFilledState();
        this.updateMaxedOut();
        this.inputViewChild.nativeElement.value = '';
        if (preventDefault) {
            event.preventDefault();
        }
    }
    onKeydown(event) {
        switch (event.which) {
            //backspace
            case 8:
                if (this.inputViewChild.nativeElement.value.length === 0 && this.value && this.value.length > 0) {
                    this.value = [...this.value];
                    let removedItem = this.value.pop();
                    this.onModelChange(this.value);
                    this.onRemove.emit({
                        originalEvent: event,
                        value: removedItem
                    });
                    this.updateFilledState();
                }
                break;
            //enter
            case 13:
                this.addItem(event, this.inputViewChild.nativeElement.value, true);
                break;
            case 9:
                if (this.addOnTab && this.inputViewChild.nativeElement.value !== '') {
                    this.addItem(event, this.inputViewChild.nativeElement.value, true);
                }
                break;
            default:
                if (this.max && this.value && this.max === this.value.length) {
                    event.preventDefault();
                }
                else if (this.separator) {
                    if (this.separator === ',' && event.which === 188) {
                        this.addItem(event, this.inputViewChild.nativeElement.value, true);
                    }
                }
                break;
        }
    }
    updateMaxedOut() {
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.max && this.value && this.max === this.value.length)
                this.inputViewChild.nativeElement.disabled = true;
            else
                this.inputViewChild.nativeElement.disabled = this.disabled || false;
        }
    }
}
Chips.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Chips, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
Chips.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Chips, selector: "p-chips", inputs: { style: "style", styleClass: "styleClass", disabled: "disabled", field: "field", placeholder: "placeholder", max: "max", ariaLabelledBy: "ariaLabelledBy", tabindex: "tabindex", inputId: "inputId", allowDuplicate: "allowDuplicate", inputStyle: "inputStyle", inputStyleClass: "inputStyleClass", addOnTab: "addOnTab", addOnBlur: "addOnBlur", separator: "separator" }, outputs: { onAdd: "onAdd", onRemove: "onRemove", onFocus: "onFocus", onBlur: "onBlur", onChipClick: "onChipClick" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "focus" }, classAttribute: "p-element p-inputwrapper" }, providers: [CHIPS_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "inputViewChild", first: true, predicate: ["inputtext"], descendants: true }], ngImport: i0, template: `
        <div [ngClass]="'p-chips p-component'" [ngStyle]="style" [class]="styleClass" (click)="onClick()">
            <ul [ngClass]="{'p-inputtext p-chips-multiple-container':true,'p-focus':focus,'p-disabled':disabled}">
                <li #token *ngFor="let item of value; let i = index;" class="p-chips-token" (click)="onItemClick($event, item)">
                    <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
                    <span *ngIf="!itemTemplate" class="p-chips-token-label">{{field ? resolveFieldData(item,field) : item}}</span>
                    <span *ngIf="!disabled" class="p-chips-token-icon pi pi-times-circle" (click)="removeItem($event,i)"></span>
                </li>
                <li class="p-chips-input-token">
                    <input #inputtext type="text" [attr.id]="inputId" [attr.placeholder]="(value && value.length ? null : placeholder)" [attr.tabindex]="tabindex" (keydown)="onKeydown($event)"
                    (input)="onInput()" (paste)="onPaste($event)" [attr.aria-labelledby]="ariaLabelledBy" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" [disabled]="disabled" [ngStyle]="inputStyle" [class]="inputStyleClass">
                </li>
            </ul>
        </div>
    `, isInline: true, styles: [".p-chips{display:inline-flex}.p-chips-multiple-container{margin:0;padding:0;list-style-type:none;cursor:text;overflow:hidden;display:flex;align-items:center;flex-wrap:wrap}.p-chips-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-chips-input-token{flex:1 1 auto;display:inline-flex}.p-chips-token-icon{cursor:pointer}.p-chips-input-token input{border:0;outline:0 none;background-color:transparent;margin:0;padding:0;box-shadow:none;border-radius:0;width:100%}.p-fluid .p-chips{display:flex}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Chips, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-chips',
                    template: `
        <div [ngClass]="'p-chips p-component'" [ngStyle]="style" [class]="styleClass" (click)="onClick()">
            <ul [ngClass]="{'p-inputtext p-chips-multiple-container':true,'p-focus':focus,'p-disabled':disabled}">
                <li #token *ngFor="let item of value; let i = index;" class="p-chips-token" (click)="onItemClick($event, item)">
                    <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
                    <span *ngIf="!itemTemplate" class="p-chips-token-label">{{field ? resolveFieldData(item,field) : item}}</span>
                    <span *ngIf="!disabled" class="p-chips-token-icon pi pi-times-circle" (click)="removeItem($event,i)"></span>
                </li>
                <li class="p-chips-input-token">
                    <input #inputtext type="text" [attr.id]="inputId" [attr.placeholder]="(value && value.length ? null : placeholder)" [attr.tabindex]="tabindex" (keydown)="onKeydown($event)"
                    (input)="onInput()" (paste)="onPaste($event)" [attr.aria-labelledby]="ariaLabelledBy" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" [disabled]="disabled" [ngStyle]="inputStyle" [class]="inputStyleClass">
                </li>
            </ul>
        </div>
    `,
                    host: {
                        'class': 'p-element p-inputwrapper',
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focus'
                    },
                    providers: [CHIPS_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./chips.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], disabled: [{
                type: Input
            }], field: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], max: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], inputId: [{
                type: Input
            }], allowDuplicate: [{
                type: Input
            }], inputStyle: [{
                type: Input
            }], inputStyleClass: [{
                type: Input
            }], addOnTab: [{
                type: Input
            }], addOnBlur: [{
                type: Input
            }], separator: [{
                type: Input
            }], onAdd: [{
                type: Output
            }], onRemove: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onChipClick: [{
                type: Output
            }], inputViewChild: [{
                type: ViewChild,
                args: ['inputtext']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class ChipsModule {
}
ChipsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ChipsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ChipsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ChipsModule, declarations: [Chips], imports: [CommonModule, InputTextModule, SharedModule], exports: [Chips, InputTextModule, SharedModule] });
ChipsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ChipsModule, imports: [[CommonModule, InputTextModule, SharedModule], InputTextModule, SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ChipsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, InputTextModule, SharedModule],
                    exports: [Chips, InputTextModule, SharedModule],
                    declarations: [Chips]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { CHIPS_VALUE_ACCESSOR, Chips, ChipsModule };
//# sourceMappingURL=primeng-chips.js.map
