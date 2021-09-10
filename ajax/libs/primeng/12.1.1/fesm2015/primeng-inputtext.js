import * as i0 from '@angular/core';
import { Directive, Optional, HostListener, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i1 from '@angular/forms';

class InputText {
    constructor(el, ngModel) {
        this.el = el;
        this.ngModel = ngModel;
    }
    ngDoCheck() {
        this.updateFilledState();
    }
    onInput(e) {
        this.updateFilledState();
    }
    updateFilledState() {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) ||
            (this.ngModel && this.ngModel.model);
    }
}
InputText.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputText, deps: [{ token: i0.ElementRef }, { token: i1.NgModel, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
InputText.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.5", type: InputText, selector: "[pInputText]", host: { listeners: { "input": "onInput($event)" }, properties: { "class.p-filled": "filled" }, classAttribute: "p-inputtext p-component p-element" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputText, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pInputText]',
                    host: {
                        'class': 'p-inputtext p-component p-element',
                        '[class.p-filled]': 'filled'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NgModel, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }] } });
class InputTextModule {
}
InputTextModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputTextModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
InputTextModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputTextModule, declarations: [InputText], imports: [CommonModule], exports: [InputText] });
InputTextModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputTextModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputTextModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [InputText],
                    declarations: [InputText]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { InputText, InputTextModule };
//# sourceMappingURL=primeng-inputtext.js.map
