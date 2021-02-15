import { NgModule, Component, ElementRef, Input, Output, EventEmitter, forwardRef, Renderer2, NgZone, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Slider),
    multi: true
};
export class Slider {
    constructor(el, renderer, ngZone, cd) {
        this.el = el;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.cd = cd;
        this.min = 0;
        this.max = 100;
        this.orientation = 'horizontal';
        this.tabindex = 0;
        this.onChange = new EventEmitter();
        this.onSlideEnd = new EventEmitter();
        this.handleValues = [];
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.handleIndex = 0;
    }
    onMouseDown(event, index) {
        if (this.disabled) {
            return;
        }
        this.dragging = true;
        this.updateDomData();
        this.sliderHandleClick = true;
        if (this.range && this.handleValues && this.handleValues[0] === this.max) {
            this.handleIndex = 0;
        }
        else {
            this.handleIndex = index;
        }
        this.bindDragListeners();
        event.target.focus();
        event.preventDefault();
        if (this.animate) {
            DomHandler.removeClass(this.el.nativeElement.children[0], 'p-slider-animate');
        }
    }
    onTouchStart(event, index) {
        if (this.disabled) {
            return;
        }
        var touchobj = event.changedTouches[0];
        this.startHandleValue = (this.range) ? this.handleValues[index] : this.handleValue;
        this.dragging = true;
        if (this.range && this.handleValues && this.handleValues[0] === this.max) {
            this.handleIndex = 0;
        }
        else {
            this.handleIndex = index;
        }
        if (this.orientation === 'horizontal') {
            this.startx = parseInt(touchobj.clientX, 10);
            this.barWidth = this.el.nativeElement.children[0].offsetWidth;
        }
        else {
            this.starty = parseInt(touchobj.clientY, 10);
            this.barHeight = this.el.nativeElement.children[0].offsetHeight;
        }
        if (this.animate) {
            DomHandler.removeClass(this.el.nativeElement.children[0], 'p-slider-animate');
        }
        event.preventDefault();
    }
    onTouchMove(event, index) {
        if (this.disabled) {
            return;
        }
        var touchobj = event.changedTouches[0], handleValue = 0;
        if (this.orientation === 'horizontal') {
            handleValue = Math.floor(((parseInt(touchobj.clientX, 10) - this.startx) * 100) / (this.barWidth)) + this.startHandleValue;
        }
        else {
            handleValue = Math.floor(((this.starty - parseInt(touchobj.clientY, 10)) * 100) / (this.barHeight)) + this.startHandleValue;
        }
        this.setValueFromHandle(event, handleValue);
        event.preventDefault();
    }
    onTouchEnd(event, index) {
        if (this.disabled) {
            return;
        }
        this.dragging = false;
        if (this.range)
            this.onSlideEnd.emit({ originalEvent: event, values: this.values });
        else
            this.onSlideEnd.emit({ originalEvent: event, value: this.value });
        if (this.animate) {
            DomHandler.addClass(this.el.nativeElement.children[0], 'p-slider-animate');
        }
        event.preventDefault();
    }
    onBarClick(event) {
        if (this.disabled) {
            return;
        }
        if (!this.sliderHandleClick) {
            this.updateDomData();
            this.handleChange(event);
        }
        this.sliderHandleClick = false;
    }
    onHandleKeydown(event, handleIndex) {
        if (this.disabled) {
            return;
        }
        if (event.which == 38 || event.which == 39) {
            this.spin(event, 1, handleIndex);
        }
        else if (event.which == 37 || event.which == 40) {
            this.spin(event, -1, handleIndex);
        }
    }
    spin(event, dir, handleIndex) {
        let step = (this.step || 1) * dir;
        if (this.range) {
            this.handleIndex = handleIndex;
            this.updateValue(this.values[this.handleIndex] + step);
            this.updateHandleValue();
        }
        else {
            this.updateValue(this.value + step);
            this.updateHandleValue();
        }
        event.preventDefault();
    }
    handleChange(event) {
        let handleValue = this.calculateHandleValue(event);
        this.setValueFromHandle(event, handleValue);
    }
    bindDragListeners() {
        this.ngZone.runOutsideAngular(() => {
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            if (!this.dragListener) {
                this.dragListener = this.renderer.listen(documentTarget, 'mousemove', (event) => {
                    if (this.dragging) {
                        this.ngZone.run(() => {
                            this.handleChange(event);
                        });
                    }
                });
            }
            if (!this.mouseupListener) {
                this.mouseupListener = this.renderer.listen(documentTarget, 'mouseup', (event) => {
                    if (this.dragging) {
                        this.dragging = false;
                        this.ngZone.run(() => {
                            if (this.range)
                                this.onSlideEnd.emit({ originalEvent: event, values: this.values });
                            else
                                this.onSlideEnd.emit({ originalEvent: event, value: this.value });
                            if (this.animate) {
                                DomHandler.addClass(this.el.nativeElement.children[0], 'p-slider-animate');
                            }
                        });
                    }
                });
            }
        });
    }
    unbindDragListeners() {
        if (this.dragListener) {
            this.dragListener();
        }
        if (this.mouseupListener) {
            this.mouseupListener();
        }
    }
    setValueFromHandle(event, handleValue) {
        let newValue = this.getValueFromHandle(handleValue);
        if (this.range) {
            if (this.step) {
                this.handleStepChange(newValue, this.values[this.handleIndex]);
            }
            else {
                this.handleValues[this.handleIndex] = handleValue;
                this.updateValue(newValue, event);
            }
        }
        else {
            if (this.step) {
                this.handleStepChange(newValue, this.value);
            }
            else {
                this.handleValue = handleValue;
                this.updateValue(newValue, event);
            }
        }
        this.cd.markForCheck();
    }
    handleStepChange(newValue, oldValue) {
        let diff = (newValue - oldValue);
        let val = oldValue;
        if (diff < 0) {
            val = oldValue + Math.ceil(newValue / this.step - oldValue / this.step) * this.step;
        }
        else if (diff > 0) {
            val = oldValue + Math.floor(newValue / this.step - oldValue / this.step) * this.step;
        }
        this.updateValue(val);
        this.updateHandleValue();
    }
    writeValue(value) {
        if (this.range)
            this.values = value || [0, 0];
        else
            this.value = value || 0;
        this.updateHandleValue();
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
    get rangeStartLeft() {
        return this.isVertical() ? 'auto' : this.handleValues[0] + '%';
    }
    get rangeStartBottom() {
        return this.isVertical() ? this.handleValues[0] + '%' : 'auto';
    }
    get rangeEndLeft() {
        return this.isVertical() ? 'auto' : this.handleValues[1] + '%';
    }
    get rangeEndBottom() {
        return this.isVertical() ? this.handleValues[1] + '%' : 'auto';
    }
    isVertical() {
        return this.orientation === 'vertical';
    }
    updateDomData() {
        let rect = this.el.nativeElement.children[0].getBoundingClientRect();
        this.initX = rect.left + DomHandler.getWindowScrollLeft();
        this.initY = rect.top + DomHandler.getWindowScrollTop();
        this.barWidth = this.el.nativeElement.children[0].offsetWidth;
        this.barHeight = this.el.nativeElement.children[0].offsetHeight;
    }
    calculateHandleValue(event) {
        if (this.orientation === 'horizontal')
            return ((event.pageX - this.initX) * 100) / (this.barWidth);
        else
            return (((this.initY + this.barHeight) - event.pageY) * 100) / (this.barHeight);
    }
    updateHandleValue() {
        if (this.range) {
            this.handleValues[0] = (this.values[0] < this.min ? 0 : this.values[0] - this.min) * 100 / (this.max - this.min);
            this.handleValues[1] = (this.values[1] > this.max ? 100 : this.values[1] - this.min) * 100 / (this.max - this.min);
        }
        else {
            if (this.value < this.min)
                this.handleValue = 0;
            else if (this.value > this.max)
                this.handleValue = 100;
            else
                this.handleValue = (this.value - this.min) * 100 / (this.max - this.min);
        }
    }
    updateValue(val, event) {
        if (this.range) {
            let value = val;
            if (this.handleIndex == 0) {
                if (value < this.min) {
                    value = this.min;
                    this.handleValues[0] = 0;
                }
                else if (value > this.values[1]) {
                    value = this.values[1];
                    this.handleValues[0] = this.handleValues[1];
                }
                this.sliderHandleStart.nativeElement.focus();
            }
            else {
                if (value > this.max) {
                    value = this.max;
                    this.handleValues[1] = 100;
                }
                else if (value < this.values[0]) {
                    value = this.values[0];
                    this.handleValues[1] = this.handleValues[0];
                }
                this.sliderHandleEnd.nativeElement.focus();
            }
            this.values[this.handleIndex] = this.getNormalizedValue(value);
            this.values = this.values.slice();
            this.onModelChange(this.values);
            this.onChange.emit({ event: event, values: this.values });
        }
        else {
            if (val < this.min) {
                val = this.min;
                this.handleValue = 0;
            }
            else if (val > this.max) {
                val = this.max;
                this.handleValue = 100;
            }
            this.value = this.getNormalizedValue(val);
            this.onModelChange(this.value);
            this.onChange.emit({ event: event, value: this.value });
            this.sliderHandle.nativeElement.focus();
        }
    }
    getValueFromHandle(handleValue) {
        return (this.max - this.min) * (handleValue / 100) + this.min;
    }
    getDecimalsCount(value) {
        if (value && Math.floor(value) !== value)
            return value.toString().split(".")[1].length || 0;
        return 0;
    }
    getNormalizedValue(val) {
        let decimalsCount = this.getDecimalsCount(this.step);
        if (decimalsCount > 0) {
            return +val.toFixed(decimalsCount);
        }
        else {
            return Math.floor(val);
        }
    }
    ngOnDestroy() {
        this.unbindDragListeners();
    }
}
Slider.decorators = [
    { type: Component, args: [{
                selector: 'p-slider',
                template: `
        <div [ngStyle]="style" [class]="styleClass" [ngClass]="{'p-slider p-component':true,'p-disabled':disabled,
            'p-slider-horizontal':orientation == 'horizontal','p-slider-vertical':orientation == 'vertical','p-slider-animate':animate}"
            (click)="onBarClick($event)">
            <span *ngIf="range && orientation == 'horizontal'" class="p-slider-range" [ngStyle]="{'left':handleValues[0] + '%',width: (handleValues[1] - handleValues[0] + '%')}"></span>
            <span *ngIf="range && orientation == 'vertical'" class="p-slider-range" [ngStyle]="{'bottom':handleValues[0] + '%',height: (handleValues[1] - handleValues[0] + '%')}"></span>
            <span *ngIf="!range && orientation=='vertical'" class="p-slider-range" [ngStyle]="{'height': handleValue + '%'}"></span>
            <span *ngIf="!range && orientation=='horizontal'" class="p-slider-range" [ngStyle]="{'width': handleValue + '%'}"></span>
            <span #sliderHandle *ngIf="!range" [attr.tabindex]="disabled ? null : tabindex" (keydown)="onHandleKeydown($event)" class="p-slider-handle" (mousedown)="onMouseDown($event)" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" (touchend)="onTouchEnd($event)"
                [style.transition]="dragging ? 'none': null" [ngStyle]="{'left': orientation == 'horizontal' ? handleValue + '%' : null,'bottom': orientation == 'vertical' ? handleValue + '%' : null}"
                [attr.aria-valuemin]="min" [attr.aria-valuenow]="value" [attr.aria-valuemax]="max" [attr.aria-labelledby]="ariaLabelledBy"></span>
            <span #sliderHandleStart *ngIf="range" [attr.tabindex]="disabled ? null : tabindex" (keydown)="onHandleKeydown($event,0)" (mousedown)="onMouseDown($event,0)" (touchstart)="onTouchStart($event,0)" (touchmove)="onTouchMove($event,0)" (touchend)="onTouchEnd($event)" [style.transition]="dragging ? 'none': null" class="p-slider-handle" 
                [ngStyle]="{'left': rangeStartLeft, 'bottom': rangeStartBottom}" [ngClass]="{'p-slider-handle-active':handleIndex==0}"
                [attr.aria-valuemin]="min" [attr.aria-valuenow]="value ? value[0] : null" [attr.aria-valuemax]="max" [attr.aria-labelledby]="ariaLabelledBy"></span>
            <span #sliderHandleEnd *ngIf="range" [attr.tabindex]="disabled ? null : tabindex" (keydown)="onHandleKeydown($event,1)" (mousedown)="onMouseDown($event,1)" (touchstart)="onTouchStart($event,1)" (touchmove)="onTouchMove($event,1)" (touchend)="onTouchEnd($event)" [style.transition]="dragging ? 'none': null" class="p-slider-handle" 
                [ngStyle]="{'left': rangeEndLeft, 'bottom': rangeEndBottom}" [ngClass]="{'p-slider-handle-active':handleIndex==1}"
                [attr.aria-valuemin]="min" [attr.aria-valuenow]="value ? value[1] : null" [attr.aria-valuemax]="max" [attr.aria-labelledby]="ariaLabelledBy"></span>
        </div>
    `,
                providers: [SLIDER_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-slider{position:relative}.p-slider .p-slider-handle{cursor:grab;touch-action:none}.p-slider-range,.p-slider .p-slider-handle{display:block;position:absolute}.p-slider-horizontal .p-slider-range{height:100%;left:0;top:0}.p-slider-horizontal .p-slider-handle{top:50%}.p-slider-vertical{height:100px}.p-slider-vertical .p-slider-handle{left:50%}.p-slider-vertical .p-slider-range{bottom:0;left:0;width:100%}"]
            },] }
];
Slider.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
Slider.propDecorators = {
    animate: [{ type: Input }],
    disabled: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    orientation: [{ type: Input }],
    step: [{ type: Input }],
    range: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    ariaLabelledBy: [{ type: Input }],
    tabindex: [{ type: Input }],
    onChange: [{ type: Output }],
    onSlideEnd: [{ type: Output }],
    sliderHandle: [{ type: ViewChild, args: ["sliderHandle",] }],
    sliderHandleStart: [{ type: ViewChild, args: ["sliderHandleStart",] }],
    sliderHandleEnd: [{ type: ViewChild, args: ["sliderHandleEnd",] }]
};
export class SliderModule {
}
SliderModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Slider],
                declarations: [Slider]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9zbGlkZXIvIiwic291cmNlcyI6WyJzbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFhLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUMsTUFBTSxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3TSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUMsaUJBQWlCLEVBQXVCLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQVE7SUFDeEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNyQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUE0QkYsTUFBTSxPQUFPLE1BQU07SUFzRWYsWUFBbUIsRUFBYyxFQUFTLFFBQW1CLEVBQVUsTUFBYyxFQUFTLEVBQXFCO1FBQWhHLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBaEUxRyxRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBRWhCLFFBQUcsR0FBVyxHQUFHLENBQUM7UUFFbEIsZ0JBQVcsR0FBVyxZQUFZLENBQUM7UUFZbkMsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUVwQixhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBY3RELGlCQUFZLEdBQWEsRUFBRSxDQUFDO1FBRTVCLGtCQUFhLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBa0JwQyxnQkFBVyxHQUFXLENBQUMsQ0FBQztJQVF1RixDQUFDO0lBRXZILFdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBYTtRQUM1QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7U0FDeEI7YUFDSTtZQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQzVCO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdkIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztTQUNqRjtJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQWE7UUFDN0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsT0FBTztTQUNWO1FBRUQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbkYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3RFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUM1QjtRQUVELElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxZQUFZLEVBQUU7WUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7U0FDakU7YUFDSTtZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1NBQ25FO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztTQUNqRjtRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFhO1FBQzVCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE9BQU87U0FDVjtRQUVELElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQ3RDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFFaEIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFlBQVksRUFBRTtZQUNuQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1NBQzlIO2FBQ0k7WUFDRCxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDO1NBQ2hJO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztRQUU1QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFLLEVBQUUsS0FBYTtRQUMzQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUV0QixJQUFJLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQzs7WUFFbEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUVwRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1NBQzlFO1FBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBSztRQUNaLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7SUFFRCxlQUFlLENBQUMsS0FBSyxFQUFFLFdBQW1CO1FBQ3RDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE9BQU87U0FDVjtRQUNELElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUU7WUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQ3BDO2FBQ0ksSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFBRTtZQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQVcsRUFBRSxXQUFtQjtRQUN4QyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRWxDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7YUFDSTtZQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUM1QjtRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQVk7UUFDckIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELGlCQUFpQjtRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQy9CLE1BQU0sY0FBYyxHQUFRLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1lBRXZGLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDNUUsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTs0QkFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDN0IsQ0FBQyxDQUFDLENBQUM7cUJBQ047Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN2QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDN0UsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO3dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7NEJBQ2pCLElBQUksSUFBSSxDQUFDLEtBQUs7Z0NBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQzs7Z0NBRWxFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7NEJBRXBFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQ0FDZCxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDOzZCQUM5RTt3QkFDTCxDQUFDLENBQUMsQ0FBQztxQkFDTjtnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsbUJBQW1CO1FBQ2YsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtRQUVELElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsS0FBWSxFQUFFLFdBQWdCO1FBQzdDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVwRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2FBQ2xFO2lCQUNJO2dCQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFdBQVcsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDckM7U0FDSjthQUNJO1lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNYLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9DO2lCQUNJO2dCQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO2dCQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNyQztTQUNKO1FBRUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsUUFBZ0IsRUFBRSxRQUFnQjtRQUMvQyxJQUFJLElBQUksR0FBRyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUNqQyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUM7UUFFbkIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQ1YsR0FBRyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN2RjthQUNJLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtZQUNmLEdBQUcsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDeEY7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNqQixJQUFJLElBQUksQ0FBQyxLQUFLO1lBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLElBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7O1lBRTNCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFFLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFZO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFZO1FBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxHQUFZO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksY0FBYztRQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ25FLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNuRSxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDbkUsQ0FBQztJQUVELElBQUksY0FBYztRQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ25FLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFVBQVUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsYUFBYTtRQUNULElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3JFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQzlELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUNwRSxDQUFDO0lBRUQsb0JBQW9CLENBQUMsS0FBSztRQUN0QixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssWUFBWTtZQUNqQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7WUFFNUQsT0FBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVELGlCQUFpQjtRQUNiLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakgsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0SDthQUNJO1lBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHO2dCQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztpQkFDcEIsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHO2dCQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQzs7Z0JBRXZCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoRjtJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsR0FBVyxFQUFFLEtBQWE7UUFDbEMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBRWhCLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ2xCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDNUI7cUJBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDN0IsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDL0M7Z0JBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNoRDtpQkFDSTtnQkFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNsQixLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7aUJBQzlCO3FCQUNJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzdCLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQy9DO2dCQUVELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQzlDO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1NBQzNEO2FBQ0k7WUFDRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNoQixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDZixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQzthQUN4QjtpQkFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNyQixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDZixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQzthQUMxQjtZQUVWLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWpDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDM0M7SUFDTCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsV0FBbUI7UUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEUsQ0FBQztJQUVKLGdCQUFnQixDQUFDLEtBQWE7UUFDN0IsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLO1lBQ3ZDLE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVELGtCQUFrQixDQUFDLEdBQVc7UUFDN0IsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLGFBQWEsR0FBRyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbkM7YUFDSTtZQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QjtJQUNGLENBQUM7SUFFRSxXQUFXO1FBQ1AsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDL0IsQ0FBQzs7O1lBcmRKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FrQlQ7Z0JBQ0QsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFFeEM7OztZQXBDNEIsVUFBVTtZQUFzRCxTQUFTO1lBQUMsTUFBTTtZQUFDLGlCQUFpQjs7O3NCQXVDMUgsS0FBSzt1QkFFTCxLQUFLO2tCQUVMLEtBQUs7a0JBRUwsS0FBSzswQkFFTCxLQUFLO21CQUVMLEtBQUs7b0JBRUwsS0FBSztvQkFFTCxLQUFLO3lCQUVMLEtBQUs7NkJBRUwsS0FBSzt1QkFFTCxLQUFLO3VCQUVMLE1BQU07eUJBRU4sTUFBTTsyQkFFTixTQUFTLFNBQUMsY0FBYztnQ0FFeEIsU0FBUyxTQUFDLG1CQUFtQjs4QkFFN0IsU0FBUyxTQUFDLGlCQUFpQjs7QUFtYWhDLE1BQU0sT0FBTyxZQUFZOzs7WUFMeEIsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO2dCQUNqQixZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUM7YUFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBSZW5kZXJlcjIsTmdab25lLENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IFNMSURFUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2xpZGVyKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1zbGlkZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ0NsYXNzXT1cInsncC1zbGlkZXIgcC1jb21wb25lbnQnOnRydWUsJ3AtZGlzYWJsZWQnOmRpc2FibGVkLFxuICAgICAgICAgICAgJ3Atc2xpZGVyLWhvcml6b250YWwnOm9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJywncC1zbGlkZXItdmVydGljYWwnOm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcsJ3Atc2xpZGVyLWFuaW1hdGUnOmFuaW1hdGV9XCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkJhckNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwicmFuZ2UgJiYgb3JpZW50YXRpb24gPT0gJ2hvcml6b250YWwnXCIgY2xhc3M9XCJwLXNsaWRlci1yYW5nZVwiIFtuZ1N0eWxlXT1cInsnbGVmdCc6aGFuZGxlVmFsdWVzWzBdICsgJyUnLHdpZHRoOiAoaGFuZGxlVmFsdWVzWzFdIC0gaGFuZGxlVmFsdWVzWzBdICsgJyUnKX1cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cInJhbmdlICYmIG9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCdcIiBjbGFzcz1cInAtc2xpZGVyLXJhbmdlXCIgW25nU3R5bGVdPVwieydib3R0b20nOmhhbmRsZVZhbHVlc1swXSArICclJyxoZWlnaHQ6IChoYW5kbGVWYWx1ZXNbMV0gLSBoYW5kbGVWYWx1ZXNbMF0gKyAnJScpfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXJhbmdlICYmIG9yaWVudGF0aW9uPT0ndmVydGljYWwnXCIgY2xhc3M9XCJwLXNsaWRlci1yYW5nZVwiIFtuZ1N0eWxlXT1cInsnaGVpZ2h0JzogaGFuZGxlVmFsdWUgKyAnJSd9XCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhcmFuZ2UgJiYgb3JpZW50YXRpb249PSdob3Jpem9udGFsJ1wiIGNsYXNzPVwicC1zbGlkZXItcmFuZ2VcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzogaGFuZGxlVmFsdWUgKyAnJSd9XCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gI3NsaWRlckhhbmRsZSAqbmdJZj1cIiFyYW5nZVwiIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gbnVsbCA6IHRhYmluZGV4XCIgKGtleWRvd24pPVwib25IYW5kbGVLZXlkb3duKCRldmVudClcIiBjbGFzcz1cInAtc2xpZGVyLWhhbmRsZVwiIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50KVwiICh0b3VjaHN0YXJ0KT1cIm9uVG91Y2hTdGFydCgkZXZlbnQpXCIgKHRvdWNobW92ZSk9XCJvblRvdWNoTW92ZSgkZXZlbnQpXCIgKHRvdWNoZW5kKT1cIm9uVG91Y2hFbmQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLnRyYW5zaXRpb25dPVwiZHJhZ2dpbmcgPyAnbm9uZSc6IG51bGxcIiBbbmdTdHlsZV09XCJ7J2xlZnQnOiBvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCcgPyBoYW5kbGVWYWx1ZSArICclJyA6IG51bGwsJ2JvdHRvbSc6IG9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcgPyBoYW5kbGVWYWx1ZSArICclJyA6IG51bGx9XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbWluXT1cIm1pblwiIFthdHRyLmFyaWEtdmFsdWVub3ddPVwidmFsdWVcIiBbYXR0ci5hcmlhLXZhbHVlbWF4XT1cIm1heFwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuICNzbGlkZXJIYW5kbGVTdGFydCAqbmdJZj1cInJhbmdlXCIgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQgPyBudWxsIDogdGFiaW5kZXhcIiAoa2V5ZG93bik9XCJvbkhhbmRsZUtleWRvd24oJGV2ZW50LDApXCIgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQsMClcIiAodG91Y2hzdGFydCk9XCJvblRvdWNoU3RhcnQoJGV2ZW50LDApXCIgKHRvdWNobW92ZSk9XCJvblRvdWNoTW92ZSgkZXZlbnQsMClcIiAodG91Y2hlbmQpPVwib25Ub3VjaEVuZCgkZXZlbnQpXCIgW3N0eWxlLnRyYW5zaXRpb25dPVwiZHJhZ2dpbmcgPyAnbm9uZSc6IG51bGxcIiBjbGFzcz1cInAtc2xpZGVyLWhhbmRsZVwiIFxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsnbGVmdCc6IHJhbmdlU3RhcnRMZWZ0LCAnYm90dG9tJzogcmFuZ2VTdGFydEJvdHRvbX1cIiBbbmdDbGFzc109XCJ7J3Atc2xpZGVyLWhhbmRsZS1hY3RpdmUnOmhhbmRsZUluZGV4PT0wfVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW1pbl09XCJtaW5cIiBbYXR0ci5hcmlhLXZhbHVlbm93XT1cInZhbHVlID8gdmFsdWVbMF0gOiBudWxsXCIgW2F0dHIuYXJpYS12YWx1ZW1heF09XCJtYXhcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAjc2xpZGVySGFuZGxlRW5kICpuZ0lmPVwicmFuZ2VcIiBbYXR0ci50YWJpbmRleF09XCJkaXNhYmxlZCA/IG51bGwgOiB0YWJpbmRleFwiIChrZXlkb3duKT1cIm9uSGFuZGxlS2V5ZG93bigkZXZlbnQsMSlcIiAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudCwxKVwiICh0b3VjaHN0YXJ0KT1cIm9uVG91Y2hTdGFydCgkZXZlbnQsMSlcIiAodG91Y2htb3ZlKT1cIm9uVG91Y2hNb3ZlKCRldmVudCwxKVwiICh0b3VjaGVuZCk9XCJvblRvdWNoRW5kKCRldmVudClcIiBbc3R5bGUudHJhbnNpdGlvbl09XCJkcmFnZ2luZyA/ICdub25lJzogbnVsbFwiIGNsYXNzPVwicC1zbGlkZXItaGFuZGxlXCIgXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwieydsZWZ0JzogcmFuZ2VFbmRMZWZ0LCAnYm90dG9tJzogcmFuZ2VFbmRCb3R0b219XCIgW25nQ2xhc3NdPVwieydwLXNsaWRlci1oYW5kbGUtYWN0aXZlJzpoYW5kbGVJbmRleD09MX1cIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVtaW5dPVwibWluXCIgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJ2YWx1ZSA/IHZhbHVlWzFdIDogbnVsbFwiIFthdHRyLmFyaWEtdmFsdWVtYXhdPVwibWF4XCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW1NMSURFUl9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9zbGlkZXIuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVyIGltcGxlbWVudHMgT25EZXN0cm95LENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIEBJbnB1dCgpIGFuaW1hdGU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIG1pbjogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIG1heDogbnVtYmVyID0gMTAwO1xuXG4gICAgQElucHV0KCkgb3JpZW50YXRpb246IHN0cmluZyA9ICdob3Jpem9udGFsJztcblxuICAgIEBJbnB1dCgpIHN0ZXA6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHJhbmdlOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcblxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uU2xpZGVFbmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBWaWV3Q2hpbGQoXCJzbGlkZXJIYW5kbGVcIikgc2xpZGVySGFuZGxlOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZChcInNsaWRlckhhbmRsZVN0YXJ0XCIpIHNsaWRlckhhbmRsZVN0YXJ0OiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZChcInNsaWRlckhhbmRsZUVuZFwiKSBzbGlkZXJIYW5kbGVFbmQ6IEVsZW1lbnRSZWY7XG5cbiAgICBwdWJsaWMgdmFsdWU6IG51bWJlcjtcbiAgICBcbiAgICBwdWJsaWMgdmFsdWVzOiBudW1iZXJbXTtcbiAgICBcbiAgICBwdWJsaWMgaGFuZGxlVmFsdWU6IG51bWJlcjtcbiAgICBcbiAgICBwdWJsaWMgaGFuZGxlVmFsdWVzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBcbiAgICBwdWJsaWMgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBwdWJsaWMgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gICAgXG4gICAgcHVibGljIGRyYWdnaW5nOiBib29sZWFuO1xuICAgIFxuICAgIHB1YmxpYyBkcmFnTGlzdGVuZXI6IGFueTtcbiAgICBcbiAgICBwdWJsaWMgbW91c2V1cExpc3RlbmVyOiBhbnk7XG4gICAgICAgIFxuICAgIHB1YmxpYyBpbml0WDogbnVtYmVyO1xuICAgIFxuICAgIHB1YmxpYyBpbml0WTogbnVtYmVyO1xuICAgIFxuICAgIHB1YmxpYyBiYXJXaWR0aDogbnVtYmVyO1xuICAgIFxuICAgIHB1YmxpYyBiYXJIZWlnaHQ6IG51bWJlcjtcbiAgICBcbiAgICBwdWJsaWMgc2xpZGVySGFuZGxlQ2xpY2s6IGJvb2xlYW47XG4gICAgXG4gICAgcHVibGljIGhhbmRsZUluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgcHVibGljIHN0YXJ0SGFuZGxlVmFsdWU6IGFueTtcblxuICAgIHB1YmxpYyBzdGFydHg6IG51bWJlcjtcblxuICAgIHB1YmxpYyBzdGFydHk6IG51bWJlcjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIG5nWm9uZTogTmdab25lLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuICAgIFxuICAgIG9uTW91c2VEb3duKGV2ZW50LCBpbmRleD86bnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZURvbURhdGEoKTtcbiAgICAgICAgdGhpcy5zbGlkZXJIYW5kbGVDbGljayA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnJhbmdlICYmIHRoaXMuaGFuZGxlVmFsdWVzICYmIHRoaXMuaGFuZGxlVmFsdWVzWzBdID09PSB0aGlzLm1heCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUluZGV4ID0gaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJpbmREcmFnTGlzdGVuZXJzKCk7XG4gICAgICAgIGV2ZW50LnRhcmdldC5mb2N1cygpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGUpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAncC1zbGlkZXItYW5pbWF0ZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ub3VjaFN0YXJ0KGV2ZW50LCBpbmRleD86bnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG91Y2hvYmogPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgdGhpcy5zdGFydEhhbmRsZVZhbHVlID0gKHRoaXMucmFuZ2UpID8gdGhpcy5oYW5kbGVWYWx1ZXNbaW5kZXhdIDogdGhpcy5oYW5kbGVWYWx1ZTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnJhbmdlICYmIHRoaXMuaGFuZGxlVmFsdWVzICYmIHRoaXMuaGFuZGxlVmFsdWVzWzBdID09PSB0aGlzLm1heCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUluZGV4ID0gaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0eCA9IHBhcnNlSW50KHRvdWNob2JqLmNsaWVudFgsIDEwKTtcbiAgICAgICAgICAgIHRoaXMuYmFyV2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0ub2Zmc2V0V2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0eSA9IHBhcnNlSW50KHRvdWNob2JqLmNsaWVudFksIDEwKTtcbiAgICAgICAgICAgIHRoaXMuYmFySGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLm9mZnNldEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGUpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAncC1zbGlkZXItYW5pbWF0ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblRvdWNoTW92ZShldmVudCwgaW5kZXg/Om51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIgdG91Y2hvYmogPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXSxcbiAgICAgICAgaGFuZGxlVmFsdWUgPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIGhhbmRsZVZhbHVlID0gTWF0aC5mbG9vcigoKHBhcnNlSW50KHRvdWNob2JqLmNsaWVudFgsIDEwKSAtIHRoaXMuc3RhcnR4KSAqIDEwMCkgLyAodGhpcy5iYXJXaWR0aCkpICsgdGhpcy5zdGFydEhhbmRsZVZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGFuZGxlVmFsdWUgPSBNYXRoLmZsb29yKCgodGhpcy5zdGFydHkgLSBwYXJzZUludCh0b3VjaG9iai5jbGllbnRZLCAxMCkpICogMTAwKSAvICh0aGlzLmJhckhlaWdodCkpICArIHRoaXMuc3RhcnRIYW5kbGVWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0VmFsdWVGcm9tSGFuZGxlKGV2ZW50LCBoYW5kbGVWYWx1ZSk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblRvdWNoRW5kKGV2ZW50LCBpbmRleD86bnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5yYW5nZSlcbiAgICAgICAgICAgIHRoaXMub25TbGlkZUVuZC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWVzOiB0aGlzLnZhbHVlc30pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLm9uU2xpZGVFbmQuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIHZhbHVlOiB0aGlzLnZhbHVlfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0ZSkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICdwLXNsaWRlci1hbmltYXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIFxuICAgIG9uQmFyQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLnNsaWRlckhhbmRsZUNsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURvbURhdGEoKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zbGlkZXJIYW5kbGVDbGljayA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uSGFuZGxlS2V5ZG93bihldmVudCwgaGFuZGxlSW5kZXg/Om51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC53aGljaCA9PSAzOCB8fCBldmVudC53aGljaCA9PSAzOSkge1xuICAgICAgICAgICAgdGhpcy5zcGluKGV2ZW50LCAxLCBoYW5kbGVJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQud2hpY2ggPT0gMzcgfHwgZXZlbnQud2hpY2ggPT0gNDApIHtcbiAgICAgICAgICAgIHRoaXMuc3BpbihldmVudCwgLTEsIGhhbmRsZUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzcGluKGV2ZW50LCBkaXI6IG51bWJlciwgaGFuZGxlSW5kZXg/Om51bWJlcikge1xuICAgICAgICBsZXQgc3RlcCA9ICh0aGlzLnN0ZXAgfHwgMSkgKiBkaXI7XG5cbiAgICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlSW5kZXggPSBoYW5kbGVJbmRleDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUodGhpcy52YWx1ZXNbdGhpcy5oYW5kbGVJbmRleF0gKyBzdGVwKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGFuZGxlVmFsdWUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUodGhpcy52YWx1ZSArIHN0ZXApO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIYW5kbGVWYWx1ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGxldCBoYW5kbGVWYWx1ZSA9IHRoaXMuY2FsY3VsYXRlSGFuZGxlVmFsdWUoZXZlbnQpO1xuICAgICAgICB0aGlzLnNldFZhbHVlRnJvbUhhbmRsZShldmVudCwgaGFuZGxlVmFsdWUpO1xuICAgIH1cbiAgICBcbiAgICBiaW5kRHJhZ0xpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZG9jdW1lbnRUYXJnZXQ6IGFueSA9IHRoaXMuZWwgPyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudCA6ICdkb2N1bWVudCc7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5kcmFnTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50VGFyZ2V0LCAnbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5tb3VzZXVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNldXBMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50VGFyZ2V0LCAnbW91c2V1cCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yYW5nZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNsaWRlRW5kLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZXM6IHRoaXMudmFsdWVzfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2xpZGVFbmQuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIHZhbHVlOiB0aGlzLnZhbHVlfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAncC1zbGlkZXItYW5pbWF0ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICB1bmJpbmREcmFnTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5kcmFnTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLm1vdXNldXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5tb3VzZXVwTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFZhbHVlRnJvbUhhbmRsZShldmVudDogRXZlbnQsIGhhbmRsZVZhbHVlOiBhbnkpIHtcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy5nZXRWYWx1ZUZyb21IYW5kbGUoaGFuZGxlVmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGVwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTdGVwQ2hhbmdlKG5ld1ZhbHVlLCB0aGlzLnZhbHVlc1t0aGlzLmhhbmRsZUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlc1t0aGlzLmhhbmRsZUluZGV4XSA9IGhhbmRsZVZhbHVlOyAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKG5ld1ZhbHVlLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7ICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5zdGVwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTdGVwQ2hhbmdlKG5ld1ZhbHVlLCB0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlID0gaGFuZGxlVmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShuZXdWYWx1ZSwgZXZlbnQpO1xuICAgICAgICAgICAgfSAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgXG4gICAgaGFuZGxlU3RlcENoYW5nZShuZXdWYWx1ZTogbnVtYmVyLCBvbGRWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBkaWZmID0gKG5ld1ZhbHVlIC0gb2xkVmFsdWUpO1xuICAgICAgICBsZXQgdmFsID0gb2xkVmFsdWU7XG4gICAgICAgIFxuICAgICAgICBpZiAoZGlmZiA8IDApIHtcbiAgICAgICAgICAgIHZhbCA9IG9sZFZhbHVlICsgTWF0aC5jZWlsKG5ld1ZhbHVlIC8gdGhpcy5zdGVwIC0gb2xkVmFsdWUgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRpZmYgPiAwKSB7XG4gICAgICAgICAgICB2YWwgPSBvbGRWYWx1ZSArIE1hdGguZmxvb3IobmV3VmFsdWUgLyB0aGlzLnN0ZXAgLSBvbGRWYWx1ZSAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUodmFsKTtcbiAgICAgICAgdGhpcy51cGRhdGVIYW5kbGVWYWx1ZSgpO1xuICAgIH1cbiAgICBcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJhbmdlKVxuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXx8WzAsMF07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZXx8MDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudXBkYXRlSGFuZGxlVmFsdWUoKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG4gICAgXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IHJhbmdlU3RhcnRMZWZ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZlcnRpY2FsKCkgPyAnYXV0bycgOiB0aGlzLmhhbmRsZVZhbHVlc1swXSArICclJztcbiAgICB9XG4gICAgXG4gICAgZ2V0IHJhbmdlU3RhcnRCb3R0b20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmVydGljYWwoKSA/IHRoaXMuaGFuZGxlVmFsdWVzWzBdICsgJyUnIDogJ2F1dG8nO1xuICAgIH1cbiAgICBcbiAgICBnZXQgcmFuZ2VFbmRMZWZ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZlcnRpY2FsKCkgPyAnYXV0bycgOiB0aGlzLmhhbmRsZVZhbHVlc1sxXSArICclJztcbiAgICB9XG4gICAgXG4gICAgZ2V0IHJhbmdlRW5kQm90dG9tKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZlcnRpY2FsKCkgPyB0aGlzLmhhbmRsZVZhbHVlc1sxXSArICclJyA6ICdhdXRvJztcbiAgICB9XG4gICAgXG4gICAgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCc7XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZURvbURhdGEoKTogdm9pZCB7XG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLmluaXRYID0gcmVjdC5sZWZ0ICsgRG9tSGFuZGxlci5nZXRXaW5kb3dTY3JvbGxMZWZ0KCk7XG4gICAgICAgIHRoaXMuaW5pdFkgPSByZWN0LnRvcCArIERvbUhhbmRsZXIuZ2V0V2luZG93U2Nyb2xsVG9wKCk7XG4gICAgICAgIHRoaXMuYmFyV2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0ub2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuYmFySGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLm9mZnNldEhlaWdodDtcbiAgICB9XG4gICAgXG4gICAgY2FsY3VsYXRlSGFuZGxlVmFsdWUoZXZlbnQpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKVxuICAgICAgICAgICAgcmV0dXJuICgoZXZlbnQucGFnZVggLSB0aGlzLmluaXRYKSAqIDEwMCkgLyAodGhpcy5iYXJXaWR0aCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybigoKHRoaXMuaW5pdFkgKyB0aGlzLmJhckhlaWdodCkgLSBldmVudC5wYWdlWSkgKiAxMDApIC8gKHRoaXMuYmFySGVpZ2h0KTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlSGFuZGxlVmFsdWUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlc1swXSA9ICh0aGlzLnZhbHVlc1swXSA8IHRoaXMubWluID8gMCA6IHRoaXMudmFsdWVzWzBdIC0gdGhpcy5taW4pICogMTAwIC8gKHRoaXMubWF4IC0gdGhpcy5taW4pO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVWYWx1ZXNbMV0gPSAodGhpcy52YWx1ZXNbMV0gPiB0aGlzLm1heCA/IDEwMCA6IHRoaXMudmFsdWVzWzFdIC0gdGhpcy5taW4pICogMTAwIC8gKHRoaXMubWF4IC0gdGhpcy5taW4pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgPCB0aGlzLm1pbilcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlID0gMDtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWUgPiB0aGlzLm1heClcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlID0gMTAwO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWUgPSAodGhpcy52YWx1ZSAtIHRoaXMubWluKSAqIDEwMCAvICh0aGlzLm1heCAtIHRoaXMubWluKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB1cGRhdGVWYWx1ZSh2YWw6IG51bWJlciwgZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdmFsO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVJbmRleCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgdGhpcy5taW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLm1pbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVWYWx1ZXNbMF0gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA+IHRoaXMudmFsdWVzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZXNbMV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWVzWzBdID0gdGhpcy5oYW5kbGVWYWx1ZXNbMV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJIYW5kbGVTdGFydC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPiB0aGlzLm1heCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMubWF4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlc1sxXSA9IDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPCB0aGlzLnZhbHVlc1swXSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVzWzBdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlc1sxXSA9IHRoaXMuaGFuZGxlVmFsdWVzWzBdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVySGFuZGxlRW5kLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy52YWx1ZXNbdGhpcy5oYW5kbGVJbmRleF0gPSB0aGlzLmdldE5vcm1hbGl6ZWRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlcyA9IHRoaXMudmFsdWVzLnNsaWNlKCk7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZXMpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtldmVudDogZXZlbnQsIHZhbHVlczogdGhpcy52YWx1ZXN9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh2YWwgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMubWluO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodmFsID4gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLm1heDtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlID0gMTAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG5cdFx0XHR0aGlzLnZhbHVlID0gdGhpcy5nZXROb3JtYWxpemVkVmFsdWUodmFsKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtldmVudDogZXZlbnQsIHZhbHVlOiB0aGlzLnZhbHVlfSk7XG4gICAgICAgICAgICB0aGlzLnNsaWRlckhhbmRsZS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgICAgICBcbiAgICBnZXRWYWx1ZUZyb21IYW5kbGUoaGFuZGxlVmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodGhpcy5tYXggLSB0aGlzLm1pbikgKiAoaGFuZGxlVmFsdWUgLyAxMDApICsgdGhpcy5taW47XG4gICAgfVxuXHRcblx0Z2V0RGVjaW1hbHNDb3VudCh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcblx0XHRpZiAodmFsdWUgJiYgTWF0aC5mbG9vcih2YWx1ZSkgIT09IHZhbHVlKVxuXHRcdFx0cmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpWzFdLmxlbmd0aCB8fCAwO1xuXHRcdHJldHVybiAwO1xuXHR9XG5cdFxuXHRnZXROb3JtYWxpemVkVmFsdWUodmFsOiBudW1iZXIpOiBudW1iZXIge1xuXHRcdGxldCBkZWNpbWFsc0NvdW50ID0gdGhpcy5nZXREZWNpbWFsc0NvdW50KHRoaXMuc3RlcCk7XG5cdFx0aWYgKGRlY2ltYWxzQ291bnQgPiAwKSB7XG5cdFx0XHRyZXR1cm4gK3ZhbC50b0ZpeGVkKGRlY2ltYWxzQ291bnQpO1xuXHRcdH0gXG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih2YWwpO1xuXHRcdH1cblx0fVxuICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmluZERyYWdMaXN0ZW5lcnMoKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1NsaWRlcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbU2xpZGVyXVxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZXJNb2R1bGUgeyB9XG4iXX0=