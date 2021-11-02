import * as i0 from '@angular/core';
import { EventEmitter, Directive, Optional, Input, Output, HostListener, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i1 from '@angular/forms';

class InputTextarea {
    constructor(el, ngModel, control, cd) {
        this.el = el;
        this.ngModel = ngModel;
        this.control = control;
        this.cd = cd;
        this.onResize = new EventEmitter();
    }
    ngOnInit() {
        if (this.ngModel) {
            this.ngModelSubscription = this.ngModel.valueChanges.subscribe(() => {
                this.updateState();
            });
        }
        if (this.control) {
            this.ngControlSubscription = this.control.valueChanges.subscribe(() => {
                this.updateState();
            });
        }
    }
    ngAfterViewInit() {
        if (this.autoResize)
            this.resize();
        this.updateFilledState();
        this.cd.detectChanges();
    }
    onInput(e) {
        this.updateState();
    }
    updateFilledState() {
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
    }
    onFocus(e) {
        if (this.autoResize) {
            this.resize(e);
        }
    }
    onBlur(e) {
        if (this.autoResize) {
            this.resize(e);
        }
    }
    resize(event) {
        this.el.nativeElement.style.height = 'auto';
        this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';
        if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
            this.el.nativeElement.style.overflowY = "scroll";
            this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
        }
        else {
            this.el.nativeElement.style.overflow = "hidden";
        }
        this.onResize.emit(event || {});
    }
    updateState() {
        this.updateFilledState();
        if (this.autoResize) {
            this.resize();
        }
    }
    ngOnDestroy() {
        if (this.ngModelSubscription) {
            this.ngModelSubscription.unsubscribe();
        }
        if (this.ngControlSubscription) {
            this.ngControlSubscription.unsubscribe();
        }
    }
}
InputTextarea.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputTextarea, deps: [{ token: i0.ElementRef }, { token: i1.NgModel, optional: true }, { token: i1.NgControl, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
InputTextarea.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: InputTextarea, selector: "[pInputTextarea]", inputs: { autoResize: "autoResize" }, outputs: { onResize: "onResize" }, host: { listeners: { "input": "onInput($event)", "focus": "onFocus($event)", "blur": "onBlur($event)" }, properties: { "class.p-filled": "filled", "class.p-inputtextarea-resizable": "autoResize" }, classAttribute: "p-inputtextarea p-inputtext p-component p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputTextarea, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pInputTextarea]',
                    host: {
                        'class': 'p-inputtextarea p-inputtext p-component p-element',
                        '[class.p-filled]': 'filled',
                        '[class.p-inputtextarea-resizable]': 'autoResize'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NgModel, decorators: [{
                    type: Optional
                }] }, { type: i1.NgControl, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { autoResize: [{
                type: Input
            }], onResize: [{
                type: Output
            }], onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }], onFocus: [{
                type: HostListener,
                args: ['focus', ['$event']]
            }], onBlur: [{
                type: HostListener,
                args: ['blur', ['$event']]
            }] } });
class InputTextareaModule {
}
InputTextareaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputTextareaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
InputTextareaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputTextareaModule, declarations: [InputTextarea], imports: [CommonModule], exports: [InputTextarea] });
InputTextareaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputTextareaModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputTextareaModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [InputTextarea],
                    declarations: [InputTextarea]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { InputTextarea, InputTextareaModule };
//# sourceMappingURL=primeng-inputtextarea.js.map
