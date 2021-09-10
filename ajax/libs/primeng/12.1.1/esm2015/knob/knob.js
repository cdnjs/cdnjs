import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const KNOB_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Knob),
    multi: true
};
export class Knob {
    constructor(cd, el) {
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
        this.onChange = new EventEmitter();
        this.radius = 40;
        this.midX = 50;
        this.midY = 50;
        this.minRadians = 4 * Math.PI / 3;
        this.maxRadians = -Math.PI / 3;
        this.value = null;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    mapRange(x, inMin, inMax, outMin, outMax) {
        return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
    onClick(event) {
        if (!this.disabled && !this.readonly) {
            this.updateValue(event.offsetX, event.offsetY);
        }
    }
    updateValue(offsetX, offsetY) {
        let dx = offsetX - this.size / 2;
        let dy = this.size / 2 - offsetY;
        let angle = Math.atan2(dy, dx);
        let start = -Math.PI / 2 - Math.PI / 6;
        this.updateModel(angle, start);
    }
    updateModel(angle, start) {
        let mappedValue;
        if (angle > this.maxRadians)
            mappedValue = this.mapRange(angle, this.minRadians, this.maxRadians, this.min, this.max);
        else if (angle < start)
            mappedValue = this.mapRange(angle + 2 * Math.PI, this.minRadians, this.maxRadians, this.min, this.max);
        else
            return;
        let newValue = Math.round((mappedValue - this.min) / this.step) * this.step + this.min;
        this.value = newValue;
        this.onModelChange(this.value);
        this.onChange.emit(this.value);
    }
    onMouseDown(event) {
        if (!this.disabled && !this.readonly) {
            this.windowMouseMoveListener = this.onMouseMove.bind(this);
            this.windowMouseUpListener = this.onMouseUp.bind(this);
            window.addEventListener('mousemove', this.windowMouseMoveListener);
            window.addEventListener('mouseup', this.windowMouseUpListener);
            event.preventDefault();
        }
    }
    onMouseUp(event) {
        if (!this.disabled && !this.readonly) {
            window.removeEventListener('mousemove', this.windowMouseMoveListener);
            window.removeEventListener('mouseup', this.windowMouseUpListener);
            this.windowMouseUpListener = null;
            this.windowMouseMoveListener = null;
            event.preventDefault();
        }
    }
    onTouchStart(event) {
        if (!this.disabled && !this.readonly) {
            this.windowTouchMoveListener = this.onTouchMove.bind(this);
            this.windowTouchEndListener = this.onTouchEnd.bind(this);
            window.addEventListener('touchmove', this.windowTouchMoveListener);
            window.addEventListener('touchend', this.windowTouchEndListener);
            event.preventDefault();
        }
    }
    onTouchEnd(event) {
        if (!this.disabled && !this.readonly) {
            window.removeEventListener('touchmove', this.windowTouchMoveListener);
            window.removeEventListener('touchend', this.windowTouchEndListener);
            this.windowTouchMoveListener = null;
            this.windowTouchEndListener = null;
            event.preventDefault();
        }
    }
    onMouseMove(event) {
        if (!this.disabled && !this.readonly) {
            this.updateValue(event.offsetX, event.offsetY);
            event.preventDefault();
        }
    }
    onTouchMove(event) {
        if (!this.disabled && !this.readonly && event.touches.length == 1) {
            const rect = this.el.nativeElement.children[0].getBoundingClientRect();
            const touch = event.targetTouches.item(0);
            const offsetX = touch.clientX - rect.left;
            const offsetY = touch.clientY - rect.top;
            this.updateValue(offsetX, offsetY);
        }
    }
    writeValue(value) {
        this.value = value;
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
    containerClass() {
        return {
            'p-knob p-component': true,
            'p-disabled': this.disabled
        };
    }
    rangePath() {
        return `M ${this.minX()} ${this.minY()} A ${this.radius} ${this.radius} 0 1 1 ${this.maxX()} ${this.maxY()}`;
    }
    valuePath() {
        return `M ${this.zeroX()} ${this.zeroY()} A ${this.radius} ${this.radius} 0 ${this.largeArc()} ${this.sweep()} ${this.valueX()} ${this.valueY()}`;
    }
    zeroRadians() {
        if (this.min > 0 && this.max > 0)
            return this.mapRange(this.min, this.min, this.max, this.minRadians, this.maxRadians);
        else
            return this.mapRange(0, this.min, this.max, this.minRadians, this.maxRadians);
    }
    valueRadians() {
        return this.mapRange(this._value, this.min, this.max, this.minRadians, this.maxRadians);
    }
    minX() {
        return this.midX + Math.cos(this.minRadians) * this.radius;
    }
    minY() {
        return this.midY - Math.sin(this.minRadians) * this.radius;
    }
    maxX() {
        return this.midX + Math.cos(this.maxRadians) * this.radius;
    }
    maxY() {
        return this.midY - Math.sin(this.maxRadians) * this.radius;
    }
    zeroX() {
        return this.midX + Math.cos(this.zeroRadians()) * this.radius;
    }
    zeroY() {
        return this.midY - Math.sin(this.zeroRadians()) * this.radius;
    }
    valueX() {
        return this.midX + Math.cos(this.valueRadians()) * this.radius;
    }
    valueY() {
        return this.midY - Math.sin(this.valueRadians()) * this.radius;
    }
    largeArc() {
        return Math.abs(this.zeroRadians() - this.valueRadians()) < Math.PI ? 0 : 1;
    }
    sweep() {
        return this.valueRadians() > this.zeroRadians() ? 0 : 1;
    }
    valueToDisplay() {
        return this.valueTemplate.replace("{value}", this._value.toString());
    }
    get _value() {
        return this.value != null ? this.value : this.min;
    }
}
Knob.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Knob, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
Knob.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Knob, selector: "p-knob", inputs: { styleClass: "styleClass", style: "style", severity: "severity", valueColor: "valueColor", rangeColor: "rangeColor", textColor: "textColor", valueTemplate: "valueTemplate", name: "name", size: "size", step: "step", min: "min", max: "max", strokeWidth: "strokeWidth", disabled: "disabled", showValue: "showValue", readonly: "readonly" }, outputs: { onChange: "onChange" }, host: { classAttribute: "p-element" }, providers: [KNOB_VALUE_ACCESSOR], ngImport: i0, template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
        <svg viewBox="0 0 100 100" [style.width]="size + 'px'" [style.height]="size + 'px'" (click)="onClick($event)" (mousedown)="onMouseDown($event)" (mouseup)="onMouseUp($event)"
            (touchstart)="onTouchStart($event)" (touchend)="onTouchEnd($event)">
            <path [attr.d]="rangePath()" [attr.stroke-width]="strokeWidth" [attr.stroke]="rangeColor" class="p-knob-range"></path>
            <path [attr.d]="valuePath()" [attr.stroke-width]="strokeWidth" [attr.stroke]="valueColor" class="p-knob-value"></path>
            <text *ngIf="showValue" [attr.x]="50" [attr.y]="57" text-anchor="middle" [attr.fill]="textColor" class="p-knob-text" [attr.name]="name">{{valueToDisplay()}}</text>
        </svg>
        </div>
    `, isInline: true, styles: ["@keyframes dash-frame{to{stroke-dashoffset:0}}.p-knob-range{fill:none;transition:stroke .1s ease-in}.p-knob-value{animation-name:dash-frame;animation-fill-mode:forwards;fill:none}.p-knob-text{font-size:1.3rem;text-align:center}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Knob, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-knob',
                    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
        <svg viewBox="0 0 100 100" [style.width]="size + 'px'" [style.height]="size + 'px'" (click)="onClick($event)" (mousedown)="onMouseDown($event)" (mouseup)="onMouseUp($event)"
            (touchstart)="onTouchStart($event)" (touchend)="onTouchEnd($event)">
            <path [attr.d]="rangePath()" [attr.stroke-width]="strokeWidth" [attr.stroke]="rangeColor" class="p-knob-range"></path>
            <path [attr.d]="valuePath()" [attr.stroke-width]="strokeWidth" [attr.stroke]="valueColor" class="p-knob-value"></path>
            <text *ngIf="showValue" [attr.x]="50" [attr.y]="57" text-anchor="middle" [attr.fill]="textColor" class="p-knob-text" [attr.name]="name">{{valueToDisplay()}}</text>
        </svg>
        </div>
    `,
                    providers: [KNOB_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./knob.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; }, propDecorators: { styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], severity: [{
                type: Input
            }], valueColor: [{
                type: Input
            }], rangeColor: [{
                type: Input
            }], textColor: [{
                type: Input
            }], valueTemplate: [{
                type: Input
            }], name: [{
                type: Input
            }], size: [{
                type: Input
            }], step: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], strokeWidth: [{
                type: Input
            }], disabled: [{
                type: Input
            }], showValue: [{
                type: Input
            }], readonly: [{
                type: Input
            }], onChange: [{
                type: Output
            }] } });
export class KnobModule {
}
KnobModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: KnobModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
KnobModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: KnobModule, declarations: [Knob], imports: [CommonModule], exports: [Knob] });
KnobModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: KnobModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: KnobModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Knob],
                    declarations: [Knob]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9rbm9iL2tub2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBaUMsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2SyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUVuRCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBUTtJQUNwQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ25DLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQXNCRixNQUFNLE9BQU8sSUFBSTtJQTREYixZQUFvQixFQUFxQixFQUFVLEVBQWM7UUFBN0MsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBcER4RCxlQUFVLEdBQVcsNkJBQTZCLENBQUM7UUFFbkQsZUFBVSxHQUFXLDZCQUE2QixDQUFDO1FBRW5ELGNBQVMsR0FBVyxvQ0FBb0MsQ0FBQztRQUV6RCxrQkFBYSxHQUFXLFNBQVMsQ0FBQztRQUlsQyxTQUFJLEdBQVcsR0FBRyxDQUFDO1FBRW5CLFNBQUksR0FBVyxDQUFDLENBQUM7UUFFakIsUUFBRyxHQUFXLENBQUMsQ0FBQztRQUVoQixRQUFHLEdBQVcsR0FBRyxDQUFDO1FBRWxCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBSXpCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUV6QixhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7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c0JBQXJCLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRUcsR0FBRztzQkFBWCxLQUFLO2dCQUVHLEdBQUc7c0JBQVgsS0FBSztnQkFFRyxXQUFXO3NCQUFuQixLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsU0FBUztzQkFBakIsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVJLFFBQVE7c0JBQWpCLE1BQU07O0FBd05YLE1BQU0sT0FBTyxVQUFVOzt1R0FBVixVQUFVO3dHQUFWLFVBQVUsaUJBMVBWLElBQUksYUFzUEgsWUFBWSxhQXRQYixJQUFJO3dHQTBQSixVQUFVLFlBSlYsQ0FBQyxZQUFZLENBQUM7MkZBSWQsVUFBVTtrQkFMdEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztvQkFDZixZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUM7aUJBQ3ZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCwgZm9yd2FyZFJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEVsZW1lbnRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IEtOT0JfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBLbm9iKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWtub2InLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIj5cbiAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiBbc3R5bGUud2lkdGhdPVwic2l6ZSArICdweCdcIiBbc3R5bGUuaGVpZ2h0XT1cInNpemUgKyAncHgnXCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50KVwiIChtb3VzZXVwKT1cIm9uTW91c2VVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICh0b3VjaHN0YXJ0KT1cIm9uVG91Y2hTdGFydCgkZXZlbnQpXCIgKHRvdWNoZW5kKT1cIm9uVG91Y2hFbmQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPHBhdGggW2F0dHIuZF09XCJyYW5nZVBhdGgoKVwiIFthdHRyLnN0cm9rZS13aWR0aF09XCJzdHJva2VXaWR0aFwiIFthdHRyLnN0cm9rZV09XCJyYW5nZUNvbG9yXCIgY2xhc3M9XCJwLWtub2ItcmFuZ2VcIj48L3BhdGg+XG4gICAgICAgICAgICA8cGF0aCBbYXR0ci5kXT1cInZhbHVlUGF0aCgpXCIgW2F0dHIuc3Ryb2tlLXdpZHRoXT1cInN0cm9rZVdpZHRoXCIgW2F0dHIuc3Ryb2tlXT1cInZhbHVlQ29sb3JcIiBjbGFzcz1cInAta25vYi12YWx1ZVwiPjwvcGF0aD5cbiAgICAgICAgICAgIDx0ZXh0ICpuZ0lmPVwic2hvd1ZhbHVlXCIgW2F0dHIueF09XCI1MFwiIFthdHRyLnldPVwiNTdcIiB0ZXh0LWFuY2hvcj1cIm1pZGRsZVwiIFthdHRyLmZpbGxdPVwidGV4dENvbG9yXCIgY2xhc3M9XCJwLWtub2ItdGV4dFwiIFthdHRyLm5hbWVdPVwibmFtZVwiPnt7dmFsdWVUb0Rpc3BsYXkoKX19PC90ZXh0PlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtLTk9CX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2tub2IuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgS25vYiB7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc2V2ZXJpdHk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHZhbHVlQ29sb3I6IHN0cmluZyA9IFwidmFyKC0tcHJpbWFyeS1jb2xvciwgQmxhY2spXCI7XG5cbiAgICBASW5wdXQoKSByYW5nZUNvbG9yOiBzdHJpbmcgPSBcInZhcigtLXN1cmZhY2UtZCwgTGlnaHRHcmF5KVwiO1xuXG4gICAgQElucHV0KCkgdGV4dENvbG9yOiBzdHJpbmcgPSBcInZhcigtLXRleHQtY29sb3Itc2Vjb25kYXJ5LCBCbGFjaylcIjtcblxuICAgIEBJbnB1dCgpIHZhbHVlVGVtcGxhdGU6IHN0cmluZyA9IFwie3ZhbHVlfVwiO1xuXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2l6ZTogbnVtYmVyID0gMTAwO1xuXG4gICAgQElucHV0KCkgc3RlcDogbnVtYmVyID0gMTtcblxuICAgIEBJbnB1dCgpIG1pbjogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIG1heDogbnVtYmVyID0gMTAwO1xuXG4gICAgQElucHV0KCkgc3Ryb2tlV2lkdGg6IG51bWJlciA9IDE0O1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzaG93VmFsdWU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICByYWRpdXM6IG51bWJlciA9IDQwO1xuXG4gICAgbWlkWDogbnVtYmVyID0gNTA7XG5cbiAgICBtaWRZOiBudW1iZXIgPSA1MDtcblxuICAgIG1pblJhZGlhbnM6IG51bWJlciA9IDQgKiBNYXRoLlBJIC8gMztcblxuICAgIG1heFJhZGlhbnM6IG51bWJlciA9IC1NYXRoLlBJIC8gMztcblxuICAgIHZhbHVlOiBudW1iZXIgPSBudWxsO1xuXG4gICAgd2luZG93TW91c2VNb3ZlTGlzdGVuZXI6IGFueTtcblxuICAgIHdpbmRvd01vdXNlVXBMaXN0ZW5lcjogYW55O1xuXG4gICAgd2luZG93VG91Y2hNb3ZlTGlzdGVuZXI6IGFueTtcblxuICAgIHdpbmRvd1RvdWNoRW5kTGlzdGVuZXI6IGFueTtcblxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7IH1cblxuICAgIG1hcFJhbmdlKHgsIGluTWluLCBpbk1heCwgb3V0TWluLCBvdXRNYXgpIHtcbiAgICAgICAgcmV0dXJuICh4IC0gaW5NaW4pICogKG91dE1heCAtIG91dE1pbikgLyAoaW5NYXggLSBpbk1pbikgKyBvdXRNaW47XG4gICAgfVxuXG4gICAgb25DbGljayhldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZXZlbnQub2Zmc2V0WCwgZXZlbnQub2Zmc2V0WSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVWYWx1ZShvZmZzZXRYLCBvZmZzZXRZKSB7XG4gICAgICAgIGxldCBkeCA9IG9mZnNldFggLSB0aGlzLnNpemUgLyAyO1xuICAgICAgICBsZXQgZHkgPSAgdGhpcy5zaXplIC8gMiAtIG9mZnNldFk7XG4gICAgICAgIGxldCBhbmdsZSA9IE1hdGguYXRhbjIoZHksIGR4KTtcbiAgICAgICAgbGV0IHN0YXJ0ID0gLU1hdGguUEkgLyAyIC0gTWF0aC5QSSAvIDY7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwoYW5nbGUsIHN0YXJ0KTtcbiAgICB9XG5cbiAgICB1cGRhdGVNb2RlbChhbmdsZSwgc3RhcnQpIHtcbiAgICAgICAgbGV0IG1hcHBlZFZhbHVlO1xuICAgICAgICBpZiAoYW5nbGUgPiB0aGlzLm1heFJhZGlhbnMpXG4gICAgICAgICAgICBtYXBwZWRWYWx1ZSA9IHRoaXMubWFwUmFuZ2UoYW5nbGUsIHRoaXMubWluUmFkaWFucywgdGhpcy5tYXhSYWRpYW5zLCB0aGlzLm1pbiwgdGhpcy5tYXgpO1xuICAgICAgICBlbHNlIGlmIChhbmdsZSA8IHN0YXJ0KVxuICAgICAgICAgICAgbWFwcGVkVmFsdWUgPSB0aGlzLm1hcFJhbmdlKGFuZ2xlICsgMiAqIE1hdGguUEksIHRoaXMubWluUmFkaWFucywgdGhpcy5tYXhSYWRpYW5zLCB0aGlzLm1pbiwgdGhpcy5tYXgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gTWF0aC5yb3VuZCgobWFwcGVkVmFsdWUgLSB0aGlzLm1pbikgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwICsgdGhpcy5taW47XG4gICAgICAgIHRoaXMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICB0aGlzLndpbmRvd01vdXNlTW92ZUxpc3RlbmVyID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpXG4gICAgICAgICAgICB0aGlzLndpbmRvd01vdXNlVXBMaXN0ZW5lciA9IHRoaXMub25Nb3VzZVVwLmJpbmQodGhpcylcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLndpbmRvd01vdXNlTW92ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy53aW5kb3dNb3VzZVVwTGlzdGVuZXIpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VVcChldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLndpbmRvd01vdXNlTW92ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy53aW5kb3dNb3VzZVVwTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy53aW5kb3dNb3VzZVVwTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy53aW5kb3dNb3VzZU1vdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgdGhpcy53aW5kb3dUb3VjaE1vdmVMaXN0ZW5lciA9IHRoaXMub25Ub3VjaE1vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMud2luZG93VG91Y2hFbmRMaXN0ZW5lciA9IHRoaXMub25Ub3VjaEVuZC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMud2luZG93VG91Y2hNb3ZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy53aW5kb3dUb3VjaEVuZExpc3RlbmVyKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMud2luZG93VG91Y2hNb3ZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy53aW5kb3dUb3VjaEVuZExpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMud2luZG93VG91Y2hNb3ZlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy53aW5kb3dUb3VjaEVuZExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZXZlbnQub2Zmc2V0WCwgZXZlbnQub2Zmc2V0WSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ub3VjaE1vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnJlYWRvbmx5ICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCB0b3VjaCA9IGV2ZW50LnRhcmdldFRvdWNoZXMuaXRlbSgwKTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFggPSB0b3VjaC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IHRvdWNoLmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUob2Zmc2V0WCwgb2Zmc2V0WSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1rbm9iIHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICdwLWRpc2FibGVkJzogdGhpcy5kaXNhYmxlZFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJhbmdlUGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIGBNICR7dGhpcy5taW5YKCl9ICR7dGhpcy5taW5ZKCl9IEEgJHt0aGlzLnJhZGl1c30gJHt0aGlzLnJhZGl1c30gMCAxIDEgJHt0aGlzLm1heFgoKX0gJHt0aGlzLm1heFkoKX1gO1xuICAgIH1cblxuICAgIHZhbHVlUGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIGBNICR7dGhpcy56ZXJvWCgpfSAke3RoaXMuemVyb1koKX0gQSAke3RoaXMucmFkaXVzfSAke3RoaXMucmFkaXVzfSAwICR7dGhpcy5sYXJnZUFyYygpfSAke3RoaXMuc3dlZXAoKX0gJHt0aGlzLnZhbHVlWCgpfSAke3RoaXMudmFsdWVZKCl9YDtcbiAgICB9XG5cbiAgICB6ZXJvUmFkaWFucygpIHtcbiAgICAgICAgaWYgKHRoaXMubWluID4gMCAmJiB0aGlzLm1heCA+IDApXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBSYW5nZSh0aGlzLm1pbiwgdGhpcy5taW4sIHRoaXMubWF4LCB0aGlzLm1pblJhZGlhbnMsIHRoaXMubWF4UmFkaWFucyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcFJhbmdlKDAsIHRoaXMubWluLCB0aGlzLm1heCwgdGhpcy5taW5SYWRpYW5zLCB0aGlzLm1heFJhZGlhbnMpO1xuICAgIH1cblxuICAgIHZhbHVlUmFkaWFucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwUmFuZ2UodGhpcy5fdmFsdWUsIHRoaXMubWluLCB0aGlzLm1heCwgdGhpcy5taW5SYWRpYW5zLCB0aGlzLm1heFJhZGlhbnMpO1xuICAgIH1cblxuICAgIG1pblgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pZFggKyBNYXRoLmNvcyh0aGlzLm1pblJhZGlhbnMpICogdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgbWluWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlkWSAtIE1hdGguc2luKHRoaXMubWluUmFkaWFucykgKiB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICBtYXhYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWRYICsgTWF0aC5jb3ModGhpcy5tYXhSYWRpYW5zKSAqIHRoaXMucmFkaXVzO1xuICAgIH1cblxuICAgIG1heFkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pZFkgLSBNYXRoLnNpbih0aGlzLm1heFJhZGlhbnMpICogdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgemVyb1goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pZFggKyBNYXRoLmNvcyh0aGlzLnplcm9SYWRpYW5zKCkpICogdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgemVyb1koKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pZFkgLSBNYXRoLnNpbih0aGlzLnplcm9SYWRpYW5zKCkpICogdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgdmFsdWVYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWRYICsgTWF0aC5jb3ModGhpcy52YWx1ZVJhZGlhbnMoKSkgKiB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICB2YWx1ZVkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pZFkgLSBNYXRoLnNpbih0aGlzLnZhbHVlUmFkaWFucygpKSAqIHRoaXMucmFkaXVzO1xuICAgIH1cblxuICAgIGxhcmdlQXJjKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5hYnModGhpcy56ZXJvUmFkaWFucygpIC0gdGhpcy52YWx1ZVJhZGlhbnMoKSkgPCBNYXRoLlBJID8gMCA6IDE7XG4gICAgfVxuXG4gICAgc3dlZXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlUmFkaWFucygpID4gdGhpcy56ZXJvUmFkaWFucygpID8gMCA6IDE7XG4gICAgfVxuXG4gICAgdmFsdWVUb0Rpc3BsYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlVGVtcGxhdGUucmVwbGFjZShcInt2YWx1ZX1cIiwgdGhpcy5fdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgZ2V0IF92YWx1ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSAhPSBudWxsID8gdGhpcy52YWx1ZSA6IHRoaXMubWluO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbS25vYl0sXG4gICAgZGVjbGFyYXRpb25zOiBbS25vYl1cbn0pXG5leHBvcnQgY2xhc3MgS25vYk1vZHVsZSB7IH1cbiJdfQ==