import { NgModule, Component, ElementRef, Input, Output, EventEmitter, forwardRef, Renderer2, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const COLORPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ColorPicker),
    multi: true
};
export class ColorPicker {
    constructor(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.format = 'hex';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
        this.onChange = new EventEmitter();
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.value = { h: 0, s: 100, b: 100 };
        this.defaultColor = 'ff0000';
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    set colorSelector(element) {
        this.colorSelectorViewChild = element;
    }
    set colorHandle(element) {
        this.colorHandleViewChild = element;
    }
    set hue(element) {
        this.hueViewChild = element;
    }
    set hueHandle(element) {
        this.hueHandleViewChild = element;
    }
    onHueMousedown(event) {
        if (this.disabled) {
            return;
        }
        this.bindDocumentMousemoveListener();
        this.bindDocumentMouseupListener();
        this.hueDragging = true;
        this.pickHue(event);
    }
    pickHue(event) {
        let top = this.hueViewChild.nativeElement.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        this.value = this.validateHSB({
            h: Math.floor(360 * (150 - Math.max(0, Math.min(150, (event.pageY - top)))) / 150),
            s: this.value.s,
            b: this.value.b
        });
        this.updateColorSelector();
        this.updateUI();
        this.updateModel();
        this.onChange.emit({ originalEvent: event, value: this.getValueToUpdate() });
    }
    onColorMousedown(event) {
        if (this.disabled) {
            return;
        }
        this.bindDocumentMousemoveListener();
        this.bindDocumentMouseupListener();
        this.colorDragging = true;
        this.pickColor(event);
    }
    pickColor(event) {
        let rect = this.colorSelectorViewChild.nativeElement.getBoundingClientRect();
        let top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        let left = rect.left + document.body.scrollLeft;
        let saturation = Math.floor(100 * (Math.max(0, Math.min(150, (event.pageX - left)))) / 150);
        let brightness = Math.floor(100 * (150 - Math.max(0, Math.min(150, (event.pageY - top)))) / 150);
        this.value = this.validateHSB({
            h: this.value.h,
            s: saturation,
            b: brightness
        });
        this.updateUI();
        this.updateModel();
        this.onChange.emit({ originalEvent: event, value: this.getValueToUpdate() });
    }
    getValueToUpdate() {
        let val;
        switch (this.format) {
            case 'hex':
                val = '#' + this.HSBtoHEX(this.value);
                break;
            case 'rgb':
                val = this.HSBtoRGB(this.value);
                break;
            case 'hsb':
                val = this.value;
                break;
        }
        return val;
    }
    updateModel() {
        this.onModelChange(this.getValueToUpdate());
    }
    writeValue(value) {
        if (value) {
            switch (this.format) {
                case 'hex':
                    this.value = this.HEXtoHSB(value);
                    break;
                case 'rgb':
                    this.value = this.RGBtoHSB(value);
                    break;
                case 'hsb':
                    this.value = value;
                    break;
            }
        }
        else {
            this.value = this.HEXtoHSB(this.defaultColor);
        }
        this.updateColorSelector();
        this.updateUI();
        this.cd.markForCheck();
    }
    updateColorSelector() {
        if (this.colorSelectorViewChild) {
            const hsb = {};
            hsb.s = 100;
            hsb.b = 100;
            hsb.h = this.value.h;
            this.colorSelectorViewChild.nativeElement.style.backgroundColor = '#' + this.HSBtoHEX(hsb);
        }
    }
    updateUI() {
        if (this.colorHandleViewChild && this.hueHandleViewChild.nativeElement) {
            this.colorHandleViewChild.nativeElement.style.left = Math.floor(150 * this.value.s / 100) + 'px';
            this.colorHandleViewChild.nativeElement.style.top = Math.floor(150 * (100 - this.value.b) / 100) + 'px';
            this.hueHandleViewChild.nativeElement.style.top = Math.floor(150 - (150 * this.value.h / 360)) + 'px';
        }
        this.inputBgColor = '#' + this.HSBtoHEX(this.value);
    }
    onInputFocus() {
        this.onModelTouched();
    }
    show() {
        this.overlayVisible = true;
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                if (!this.inline) {
                    this.overlay = event.element;
                    this.appendOverlay();
                    if (this.autoZIndex) {
                        this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                    }
                    this.alignOverlay();
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                    this.bindScrollListener();
                    this.updateColorSelector();
                    this.updateUI();
                }
                break;
            case 'void':
                this.onOverlayHide();
                break;
        }
    }
    onOverlayAnimationEnd(event) {
        switch (event.toState) {
            case 'visible':
                if (!this.inline) {
                    this.onShow.emit({});
                }
                break;
            case 'void':
                this.onHide.emit({});
                break;
        }
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
        }
    }
    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
    alignOverlay() {
        if (this.appendTo)
            DomHandler.absolutePosition(this.overlay, this.inputViewChild.nativeElement);
        else
            DomHandler.relativePosition(this.overlay, this.inputViewChild.nativeElement);
    }
    hide() {
        this.overlayVisible = false;
        this.cd.markForCheck();
    }
    onInputClick() {
        this.selfClick = true;
        this.togglePanel();
    }
    togglePanel() {
        if (!this.overlayVisible)
            this.show();
        else
            this.hide();
    }
    onInputKeydown(event) {
        switch (event.which) {
            //space
            case 32:
                this.togglePanel();
                event.preventDefault();
                break;
            //escape and tab
            case 27:
            case 9:
                this.hide();
                break;
        }
    }
    onPanelClick() {
        this.selfClick = true;
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
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.documentClickListener = this.renderer.listen(documentTarget, 'click', () => {
                if (!this.selfClick) {
                    this.overlayVisible = false;
                    this.unbindDocumentClickListener();
                }
                this.selfClick = false;
                this.cd.markForCheck();
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    bindDocumentMousemoveListener() {
        if (!this.documentMousemoveListener) {
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.documentMousemoveListener = this.renderer.listen(documentTarget, 'mousemove', (event) => {
                if (this.colorDragging) {
                    this.pickColor(event);
                }
                if (this.hueDragging) {
                    this.pickHue(event);
                }
            });
        }
    }
    unbindDocumentMousemoveListener() {
        if (this.documentMousemoveListener) {
            this.documentMousemoveListener();
            this.documentMousemoveListener = null;
        }
    }
    bindDocumentMouseupListener() {
        if (!this.documentMouseupListener) {
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.documentMouseupListener = this.renderer.listen(documentTarget, 'mouseup', () => {
                this.colorDragging = false;
                this.hueDragging = false;
                this.unbindDocumentMousemoveListener();
                this.unbindDocumentMouseupListener();
            });
        }
    }
    unbindDocumentMouseupListener() {
        if (this.documentMouseupListener) {
            this.documentMouseupListener();
            this.documentMouseupListener = null;
        }
    }
    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    onWindowResize() {
        this.hide();
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.containerViewChild.nativeElement, () => {
                if (this.overlayVisible) {
                    this.hide();
                }
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    validateHSB(hsb) {
        return {
            h: Math.min(360, Math.max(0, hsb.h)),
            s: Math.min(100, Math.max(0, hsb.s)),
            b: Math.min(100, Math.max(0, hsb.b))
        };
    }
    validateRGB(rgb) {
        return {
            r: Math.min(255, Math.max(0, rgb.r)),
            g: Math.min(255, Math.max(0, rgb.g)),
            b: Math.min(255, Math.max(0, rgb.b))
        };
    }
    validateHEX(hex) {
        var len = 6 - hex.length;
        if (len > 0) {
            var o = [];
            for (var i = 0; i < len; i++) {
                o.push('0');
            }
            o.push(hex);
            hex = o.join('');
        }
        return hex;
    }
    HEXtoRGB(hex) {
        let hexValue = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
        return { r: hexValue >> 16, g: (hexValue & 0x00FF00) >> 8, b: (hexValue & 0x0000FF) };
    }
    HEXtoHSB(hex) {
        return this.RGBtoHSB(this.HEXtoRGB(hex));
    }
    RGBtoHSB(rgb) {
        var hsb = {
            h: 0,
            s: 0,
            b: 0
        };
        var min = Math.min(rgb.r, rgb.g, rgb.b);
        var max = Math.max(rgb.r, rgb.g, rgb.b);
        var delta = max - min;
        hsb.b = max;
        hsb.s = max != 0 ? 255 * delta / max : 0;
        if (hsb.s != 0) {
            if (rgb.r == max) {
                hsb.h = (rgb.g - rgb.b) / delta;
            }
            else if (rgb.g == max) {
                hsb.h = 2 + (rgb.b - rgb.r) / delta;
            }
            else {
                hsb.h = 4 + (rgb.r - rgb.g) / delta;
            }
        }
        else {
            hsb.h = -1;
        }
        hsb.h *= 60;
        if (hsb.h < 0) {
            hsb.h += 360;
        }
        hsb.s *= 100 / 255;
        hsb.b *= 100 / 255;
        return hsb;
    }
    HSBtoRGB(hsb) {
        var rgb = {
            r: null, g: null, b: null
        };
        let h = hsb.h;
        let s = hsb.s * 255 / 100;
        let v = hsb.b * 255 / 100;
        if (s == 0) {
            rgb = {
                r: v,
                g: v,
                b: v
            };
        }
        else {
            let t1 = v;
            let t2 = (255 - s) * v / 255;
            let t3 = (t1 - t2) * (h % 60) / 60;
            if (h == 360)
                h = 0;
            if (h < 60) {
                rgb.r = t1;
                rgb.b = t2;
                rgb.g = t2 + t3;
            }
            else if (h < 120) {
                rgb.g = t1;
                rgb.b = t2;
                rgb.r = t1 - t3;
            }
            else if (h < 180) {
                rgb.g = t1;
                rgb.r = t2;
                rgb.b = t2 + t3;
            }
            else if (h < 240) {
                rgb.b = t1;
                rgb.r = t2;
                rgb.g = t1 - t3;
            }
            else if (h < 300) {
                rgb.b = t1;
                rgb.g = t2;
                rgb.r = t2 + t3;
            }
            else if (h < 360) {
                rgb.r = t1;
                rgb.g = t2;
                rgb.b = t1 - t3;
            }
            else {
                rgb.r = 0;
                rgb.g = 0;
                rgb.b = 0;
            }
        }
        return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
    }
    RGBtoHEX(rgb) {
        var hex = [
            rgb.r.toString(16),
            rgb.g.toString(16),
            rgb.b.toString(16)
        ];
        for (var key in hex) {
            if (hex[key].length == 1) {
                hex[key] = '0' + hex[key];
            }
        }
        return hex.join('');
    }
    HSBtoHEX(hsb) {
        return this.RGBtoHEX(this.HSBtoRGB(hsb));
    }
    onOverlayHide() {
        this.unbindScrollListener();
        this.unbindDocumentResizeListener();
        this.unbindDocumentClickListener();
        this.overlay = null;
    }
    ngOnDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
}
ColorPicker.decorators = [
    { type: Component, args: [{
                selector: 'p-colorPicker',
                template: `
        <div #container [ngStyle]="style" [class]="styleClass" [ngClass]="{'p-colorpicker p-component':true,'p-colorpicker-overlay':!inline,'p-colorpicker-dragging':colorDragging||hueDragging}">
            <input #input type="text" *ngIf="!inline" class="p-colorpicker-preview p-inputtext" readonly="readonly" [ngClass]="{'p-disabled': disabled}"
                (focus)="onInputFocus()" (click)="onInputClick()" (keydown)="onInputKeydown($event)" [attr.id]="inputId" [attr.tabindex]="tabindex" [disabled]="disabled"
                [style.backgroundColor]="inputBgColor">
            <div *ngIf="inline || overlayVisible" [ngClass]="{'p-colorpicker-panel': true, 'p-colorpicker-overlay-panel':!inline, 'p-disabled': disabled}" (click)="onPanelClick()"
                [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="inline === true" 
                    (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationEnd($event)">
                <div class="p-colorpicker-content">
                    <div #colorSelector class="p-colorpicker-color-selector" (mousedown)="onColorMousedown($event)">
                        <div class="p-colorpicker-color">
                            <div #colorHandle class="p-colorpicker-color-handle"></div>
                        </div>
                    </div>
                    <div #hue class="p-colorpicker-hue" (mousedown)="onHueMousedown($event)">
                        <div #hueHandle class="p-colorpicker-hue-handle"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
                animations: [
                    trigger('overlayAnimation', [
                        transition(':enter', [
                            style({ opacity: 0, transform: 'scaleY(0.8)' }),
                            animate('{{showTransitionParams}}')
                        ]),
                        transition(':leave', [
                            animate('{{hideTransitionParams}}', style({ opacity: 0 }))
                        ])
                    ])
                ],
                providers: [COLORPICKER_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-colorpicker{display:inline-block}.p-colorpicker-dragging{cursor:pointer}.p-colorpicker-overlay{position:relative}.p-colorpicker-panel{height:166px;position:relative;width:193px}.p-colorpicker-overlay-panel{position:absolute}.p-colorpicker-preview{cursor:pointer}.p-colorpicker-panel .p-colorpicker-content{position:relative}.p-colorpicker-panel .p-colorpicker-color-selector{height:150px;left:8px;position:absolute;top:8px;width:150px}.p-colorpicker-panel .p-colorpicker-color{height:150px;width:150px}.p-colorpicker-panel .p-colorpicker-color-handle{border-radius:100%;border-style:solid;border-width:1px;cursor:pointer;height:10px;left:150px;margin:-5px 0 0 -5px;opacity:.85;position:absolute;top:0;width:10px}.p-colorpicker-panel .p-colorpicker-hue{height:150px;left:167px;opacity:.85;position:absolute;top:8px;width:17px}.p-colorpicker-panel .p-colorpicker-hue-handle{border-style:solid;border-width:2px;cursor:pointer;height:10px;left:0;margin-left:-2px;margin-top:-5px;opacity:.85;position:absolute;top:150px;width:21px}"]
            },] }
];
ColorPicker.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
ColorPicker.propDecorators = {
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    inline: [{ type: Input }],
    format: [{ type: Input }],
    appendTo: [{ type: Input }],
    disabled: [{ type: Input }],
    tabindex: [{ type: Input }],
    inputId: [{ type: Input }],
    autoZIndex: [{ type: Input }],
    baseZIndex: [{ type: Input }],
    showTransitionOptions: [{ type: Input }],
    hideTransitionOptions: [{ type: Input }],
    onChange: [{ type: Output }],
    onShow: [{ type: Output }],
    onHide: [{ type: Output }],
    containerViewChild: [{ type: ViewChild, args: ['container',] }],
    inputViewChild: [{ type: ViewChild, args: ['input',] }],
    colorSelector: [{ type: ViewChild, args: ['colorSelector',] }],
    colorHandle: [{ type: ViewChild, args: ['colorHandle',] }],
    hue: [{ type: ViewChild, args: ['hue',] }],
    hueHandle: [{ type: ViewChild, args: ['hueHandle',] }]
};
export class ColorPickerModule {
}
ColorPickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [ColorPicker],
                declarations: [ColorPicker]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JwaWNrZXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2NvbG9ycGlja2VyLyIsInNvdXJjZXMiOlsiY29sb3JwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pNLE9BQU8sRUFBRSxPQUFPLEVBQVMsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQWtCLE1BQU0scUJBQXFCLENBQUM7QUFDakcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEUsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFRO0lBQzNDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7SUFDMUMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBeUNGLE1BQU0sT0FBTyxXQUFXO0lBK0VwQixZQUFtQixFQUFjLEVBQVMsUUFBbUIsRUFBUyxFQUFxQjtRQUF4RSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBdkVsRixXQUFNLEdBQVcsS0FBSyxDQUFDO1FBVXZCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUV2QiwwQkFBcUIsR0FBVyxpQ0FBaUMsQ0FB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R0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFBO2FBQUM7aUJBQzVDLElBQUksQ0FBQyxHQUFDLEdBQUcsRUFBRTtnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUE7YUFBQztpQkFDNUMsSUFBSSxDQUFDLEdBQUMsR0FBRyxFQUFFO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQTthQUFDO2lCQUM1QyxJQUFJLENBQUMsR0FBQyxHQUFHLEVBQUU7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFBO2FBQUM7aUJBQzVDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO2FBQUM7U0FDbkM7UUFDRCxPQUFPLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQUc7UUFDUixJQUFJLEdB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VyxDQUFDO2FBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIFJlbmRlcmVyMiwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3RvclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUsIEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRG9tSGFuZGxlciwgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBDT0xPUlBJQ0tFUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENvbG9yUGlja2VyKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWNvbG9yUGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ0NsYXNzXT1cInsncC1jb2xvcnBpY2tlciBwLWNvbXBvbmVudCc6dHJ1ZSwncC1jb2xvcnBpY2tlci1vdmVybGF5JzohaW5saW5lLCdwLWNvbG9ycGlja2VyLWRyYWdnaW5nJzpjb2xvckRyYWdnaW5nfHxodWVEcmFnZ2luZ31cIj5cbiAgICAgICAgICAgIDxpbnB1dCAjaW5wdXQgdHlwZT1cInRleHRcIiAqbmdJZj1cIiFpbmxpbmVcIiBjbGFzcz1cInAtY29sb3JwaWNrZXItcHJldmlldyBwLWlucHV0dGV4dFwiIHJlYWRvbmx5PVwicmVhZG9ubHlcIiBbbmdDbGFzc109XCJ7J3AtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIlxuICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoKVwiIChjbGljayk9XCJvbklucHV0Q2xpY2soKVwiIChrZXlkb3duKT1cIm9uSW5wdXRLZXlkb3duKCRldmVudClcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiaW5wdXRCZ0NvbG9yXCI+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaW5saW5lIHx8IG92ZXJsYXlWaXNpYmxlXCIgW25nQ2xhc3NdPVwieydwLWNvbG9ycGlja2VyLXBhbmVsJzogdHJ1ZSwgJ3AtY29sb3JwaWNrZXItb3ZlcmxheS1wYW5lbCc6IWlubGluZSwgJ3AtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIiAoY2xpY2spPVwib25QYW5lbENsaWNrKClcIlxuICAgICAgICAgICAgICAgIFtAb3ZlcmxheUFuaW1hdGlvbl09XCJ7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319XCIgW0AuZGlzYWJsZWRdPVwiaW5saW5lID09PSB0cnVlXCIgXG4gICAgICAgICAgICAgICAgICAgIChAb3ZlcmxheUFuaW1hdGlvbi5zdGFydCk9XCJvbk92ZXJsYXlBbmltYXRpb25TdGFydCgkZXZlbnQpXCIgKEBvdmVybGF5QW5pbWF0aW9uLmRvbmUpPVwib25PdmVybGF5QW5pbWF0aW9uRW5kKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jb2xvcnBpY2tlci1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgI2NvbG9yU2VsZWN0b3IgY2xhc3M9XCJwLWNvbG9ycGlja2VyLWNvbG9yLXNlbGVjdG9yXCIgKG1vdXNlZG93bik9XCJvbkNvbG9yTW91c2Vkb3duKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWNvbG9ycGlja2VyLWNvbG9yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAjY29sb3JIYW5kbGUgY2xhc3M9XCJwLWNvbG9ycGlja2VyLWNvbG9yLWhhbmRsZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICNodWUgY2xhc3M9XCJwLWNvbG9ycGlja2VyLWh1ZVwiIChtb3VzZWRvd24pPVwib25IdWVNb3VzZWRvd24oJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAjaHVlSGFuZGxlIGNsYXNzPVwicC1jb2xvcnBpY2tlci1odWUtaGFuZGxlXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICdzY2FsZVkoMC44KSd9KSxcbiAgICAgICAgICAgICAgICBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKVxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW0NPTE9SUElDS0VSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2NvbG9ycGlja2VyLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENvbG9yUGlja2VyIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaW5saW5lOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgZm9ybWF0OiBzdHJpbmcgPSAnaGV4JztcblxuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBhbnk7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcuMTJzIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJztcblxuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xcyBsaW5lYXInO1xuXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblNob3c6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uSGlkZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JykgaW5wdXRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICB2YWx1ZTogYW55ID0ge2g6MCwgczogMTAwLCBiOiAxMDB9O1xuXG4gICAgaW5wdXRCZ0NvbG9yOiBzdHJpbmc7XG5cbiAgICBzaG93bjogYm9vbGVhbjtcblxuICAgIG92ZXJsYXlWaXNpYmxlOiBib29sZWFuO1xuXG4gICAgZGVmYXVsdENvbG9yOiBzdHJpbmcgPSAnZmYwMDAwJztcblxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogRnVuY3Rpb247XG5cbiAgICBkb2N1bWVudFJlc2l6ZUxpc3RlbmVyOiBhbnk7XG5cbiAgICBkb2N1bWVudE1vdXNlbW92ZUxpc3RlbmVyOiBGdW5jdGlvbjtcblxuICAgIGRvY3VtZW50TW91c2V1cExpc3RlbmVyOiBGdW5jdGlvbjtcblxuICAgIGRvY3VtZW50SHVlTW92ZUxpc3RlbmVyOiBGdW5jdGlvbjtcblxuICAgIHNjcm9sbEhhbmRsZXI6IGFueTtcblxuICAgIHNlbGZDbGljazogYm9vbGVhbjtcblxuICAgIGNvbG9yRHJhZ2dpbmc6IGJvb2xlYW47XG5cbiAgICBodWVEcmFnZ2luZzogYm9vbGVhbjtcblxuICAgIG92ZXJsYXk6IEhUTUxEaXZFbGVtZW50O1xuXG4gICAgY29sb3JTZWxlY3RvclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIGNvbG9ySGFuZGxlVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgaHVlVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgaHVlSGFuZGxlVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIEBWaWV3Q2hpbGQoJ2NvbG9yU2VsZWN0b3InKSBzZXQgY29sb3JTZWxlY3RvcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuY29sb3JTZWxlY3RvclZpZXdDaGlsZCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZCgnY29sb3JIYW5kbGUnKSBzZXQgY29sb3JIYW5kbGUoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmNvbG9ySGFuZGxlVmlld0NoaWxkID0gZWxlbWVudDtcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKCdodWUnKSBzZXQgaHVlKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5odWVWaWV3Q2hpbGQgPSBlbGVtZW50O1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoJ2h1ZUhhbmRsZScpIHNldCBodWVIYW5kbGUoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmh1ZUhhbmRsZVZpZXdDaGlsZCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgb25IdWVNb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYmluZERvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRNb3VzZXVwTGlzdGVuZXIoKTtcblxuICAgICAgICB0aGlzLmh1ZURyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5waWNrSHVlKGV2ZW50KTtcbiAgICB9XG5cbiAgICBwaWNrSHVlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGxldCB0b3A6IG51bWJlciA9IHRoaXMuaHVlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWxpZGF0ZUhTQih7XG4gICAgICAgICAgICBoOiBNYXRoLmZsb29yKDM2MCAqICgxNTAgLSBNYXRoLm1heCgwLCBNYXRoLm1pbigxNTAsIChldmVudC5wYWdlWSAtIHRvcCkpKSkgLyAxNTApLFxuICAgICAgICAgICAgczogdGhpcy52YWx1ZS5zLFxuICAgICAgICAgICAgYjogdGhpcy52YWx1ZS5iXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ29sb3JTZWxlY3RvcigpO1xuICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwoKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWU6IHRoaXMuZ2V0VmFsdWVUb1VwZGF0ZSgpfSk7XG4gICAgfVxuXG4gICAgb25Db2xvck1vdXNlZG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmJpbmREb2N1bWVudE1vdXNldXBMaXN0ZW5lcigpO1xuXG4gICAgICAgIHRoaXMuY29sb3JEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMucGlja0NvbG9yKGV2ZW50KTtcbiAgICB9XG5cbiAgICBwaWNrQ29sb3IoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLmNvbG9yU2VsZWN0b3JWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbGV0IHRvcCA9IHJlY3QudG9wICsgKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDApO1xuICAgICAgICBsZXQgbGVmdCA9IHJlY3QubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcbiAgICAgICAgbGV0IHNhdHVyYXRpb24gPSBNYXRoLmZsb29yKDEwMCAqIChNYXRoLm1heCgwLCBNYXRoLm1pbigxNTAsIChldmVudC5wYWdlWCAtIGxlZnQpKSkpIC8gMTUwKTtcbiAgICAgICAgbGV0IGJyaWdodG5lc3MgPSBNYXRoLmZsb29yKDEwMCAqICgxNTAgLSBNYXRoLm1heCgwLCBNYXRoLm1pbigxNTAsIChldmVudC5wYWdlWSAtIHRvcCkpKSkgLyAxNTApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWxpZGF0ZUhTQih7XG4gICAgICAgICAgICBoOiB0aGlzLnZhbHVlLmgsXG4gICAgICAgICAgICBzOiBzYXR1cmF0aW9uLFxuICAgICAgICAgICAgYjogYnJpZ2h0bmVzc1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwoKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWU6IHRoaXMuZ2V0VmFsdWVUb1VwZGF0ZSgpfSk7XG4gICAgfVxuXG4gICAgZ2V0VmFsdWVUb1VwZGF0ZSgpIHtcbiAgICAgICAgbGV0IHZhbDogYW55O1xuICAgICAgICBzd2l0Y2godGhpcy5mb3JtYXQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgICAgICAgICAgdmFsID0gJyMnICsgdGhpcy5IU0J0b0hFWCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdyZ2InOlxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuSFNCdG9SR0IodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnaHNiJzpcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZGVsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5nZXRWYWx1ZVRvVXBkYXRlKCkpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLmZvcm1hdCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLkhFWHRvSFNCKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JnYic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLlJHQnRvSFNCKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2hzYic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLkhFWHRvSFNCKHRoaXMuZGVmYXVsdENvbG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlQ29sb3JTZWxlY3RvcigpO1xuICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29sb3JTZWxlY3RvcigpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sb3JTZWxlY3RvclZpZXdDaGlsZCkge1xuICAgICAgICAgICAgY29uc3QgaHNiOiBhbnkgPSB7fTtcbiAgICAgICAgICAgIGhzYi5zID0gMTAwO1xuICAgICAgICAgICAgaHNiLmIgPSAxMDA7XG4gICAgICAgICAgICBoc2IuaCA9IHRoaXMudmFsdWUuaDtcblxuICAgICAgICAgICAgdGhpcy5jb2xvclNlbGVjdG9yVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMnICsgdGhpcy5IU0J0b0hFWChoc2IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlVUkoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbG9ySGFuZGxlVmlld0NoaWxkICYmIHRoaXMuaHVlSGFuZGxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3JIYW5kbGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gIE1hdGguZmxvb3IoMTUwICogdGhpcy52YWx1ZS5zIC8gMTAwKSArICdweCc7XG4gICAgICAgICAgICB0aGlzLmNvbG9ySGFuZGxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gIE1hdGguZmxvb3IoMTUwICogKDEwMCAtIHRoaXMudmFsdWUuYikgLyAxMDApICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuaHVlSGFuZGxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5mbG9vcigxNTAgLSAoMTUwICogdGhpcy52YWx1ZS5oIC8gMzYwKSkgKyAncHgnO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlucHV0QmdDb2xvciA9ICcjJyArIHRoaXMuSFNCdG9IRVgodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgb25JbnB1dEZvY3VzKCkge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheSA9IGV2ZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuekluZGV4ID0gU3RyaW5nKHRoaXMuYmFzZVpJbmRleCArICgrK0RvbUhhbmRsZXIuemluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnbk92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbG9yU2VsZWN0b3IoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlubGluZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KHt9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGlkZS5lbWl0KHt9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBlbmRPdmVybGF5KCkge1xuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JylcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXksIHRoaXMuYXBwZW5kVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZU92ZXJsYXlBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlnbk92ZXJsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKVxuICAgICAgICAgICAgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMub3ZlcmxheSwgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgRG9tSGFuZGxlci5yZWxhdGl2ZVBvc2l0aW9uKHRoaXMub3ZlcmxheSwgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25JbnB1dENsaWNrKCkge1xuICAgICAgICB0aGlzLnNlbGZDbGljayA9IHRydWU7XG4gICAgICAgIHRoaXMudG9nZ2xlUGFuZWwoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVQYW5lbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlKVxuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIG9uSW5wdXRLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHN3aXRjaChldmVudC53aGljaCkge1xuICAgICAgICAgICAgLy9zcGFjZVxuICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZVBhbmVsKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL2VzY2FwZSBhbmQgdGFiXG4gICAgICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBhbmVsQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuc2VsZkNsaWNrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgY29uc3QgZG9jdW1lbnRUYXJnZXQ6IGFueSA9IHRoaXMuZWwgPyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudCA6ICdkb2N1bWVudCc7XG5cbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnRUYXJnZXQsICdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2VsZkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGZDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudE1vdXNlbW92ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICBjb25zdCBkb2N1bWVudFRhcmdldDogYW55ID0gdGhpcy5lbCA/IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50IDogJ2RvY3VtZW50JztcblxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlbW92ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnRUYXJnZXQsICdtb3VzZW1vdmUnLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb2xvckRyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja0NvbG9yKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5odWVEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tIdWUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlbW92ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50TW91c2V1cExpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRNb3VzZXVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvY3VtZW50VGFyZ2V0OiBhbnkgPSB0aGlzLmVsID8gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQgOiAnZG9jdW1lbnQnO1xuXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2V1cExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnRUYXJnZXQsICdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaHVlRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50TW91c2V1cExpc3RlbmVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50TW91c2V1cExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudE1vdXNldXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNldXBMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNldXBMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbldpbmRvd1Jlc2l6ZSgpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgYmluZFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbmV3IENvbm5lY3RlZE92ZXJsYXlTY3JvbGxIYW5kbGVyKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICB1bmJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZUhTQihoc2IpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGg6IE1hdGgubWluKDM2MCwgTWF0aC5tYXgoMCwgaHNiLmgpKSxcbiAgICAgICAgICAgIHM6IE1hdGgubWluKDEwMCwgTWF0aC5tYXgoMCwgaHNiLnMpKSxcbiAgICAgICAgICAgIGI6IE1hdGgubWluKDEwMCwgTWF0aC5tYXgoMCwgaHNiLmIpKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhbGlkYXRlUkdCKHJnYikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcjogTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCByZ2IucikpLFxuICAgICAgICAgICAgZzogTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCByZ2IuZykpLFxuICAgICAgICAgICAgYjogTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCByZ2IuYikpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFsaWRhdGVIRVgoaGV4KSB7XG4gICAgICAgIHZhciBsZW4gPSA2IC0gaGV4Lmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA+IDApIHtcbiAgICAgICAgICAgIHZhciBvID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8bGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvLnB1c2goJzAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG8ucHVzaChoZXgpO1xuICAgICAgICAgICAgaGV4ID0gby5qb2luKCcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGV4O1xuICAgIH1cblxuICAgIEhFWHRvUkdCKGhleCkge1xuICAgICAgICBsZXQgaGV4VmFsdWUgPSBwYXJzZUludCgoKGhleC5pbmRleE9mKCcjJykgPiAtMSkgPyBoZXguc3Vic3RyaW5nKDEpIDogaGV4KSwgMTYpO1xuICAgICAgICByZXR1cm4ge3I6IGhleFZhbHVlID4+IDE2LCBnOiAoaGV4VmFsdWUgJiAweDAwRkYwMCkgPj4gOCwgYjogKGhleFZhbHVlICYgMHgwMDAwRkYpfTtcbiAgICB9XG5cbiAgICBIRVh0b0hTQihoZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuUkdCdG9IU0IodGhpcy5IRVh0b1JHQihoZXgpKTtcbiAgICB9XG5cbiAgICBSR0J0b0hTQihyZ2IpIHtcbiAgICAgICAgdmFyIGhzYiA9IHtcbiAgICAgICAgICAgIGg6IDAsXG4gICAgICAgICAgICBzOiAwLFxuICAgICAgICAgICAgYjogMFxuICAgICAgICB9O1xuICAgICAgICB2YXIgbWluID0gTWF0aC5taW4ocmdiLnIsIHJnYi5nLCByZ2IuYik7XG4gICAgICAgIHZhciBtYXggPSBNYXRoLm1heChyZ2IuciwgcmdiLmcsIHJnYi5iKTtcbiAgICAgICAgdmFyIGRlbHRhID0gbWF4IC0gbWluO1xuICAgICAgICBoc2IuYiA9IG1heDtcbiAgICAgICAgaHNiLnMgPSBtYXggIT0gMCA/IDI1NSAqIGRlbHRhIC8gbWF4IDogMDtcbiAgICAgICAgaWYgKGhzYi5zICE9IDApIHtcbiAgICAgICAgICAgIGlmIChyZ2IuciA9PSBtYXgpIHtcbiAgICAgICAgICAgICAgICBoc2IuaCA9IChyZ2IuZyAtIHJnYi5iKSAvIGRlbHRhO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZ2IuZyA9PSBtYXgpIHtcbiAgICAgICAgICAgICAgICBoc2IuaCA9IDIgKyAocmdiLmIgLSByZ2IucikgLyBkZWx0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaHNiLmggPSA0ICsgKHJnYi5yIC0gcmdiLmcpIC8gZGVsdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoc2IuaCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGhzYi5oICo9IDYwO1xuICAgICAgICBpZiAoaHNiLmggPCAwKSB7XG4gICAgICAgICAgICBoc2IuaCArPSAzNjA7XG4gICAgICAgIH1cbiAgICAgICAgaHNiLnMgKj0gMTAwLzI1NTtcbiAgICAgICAgaHNiLmIgKj0gMTAwLzI1NTtcbiAgICAgICAgcmV0dXJuIGhzYjtcbiAgICB9XG5cbiAgICBIU0J0b1JHQihoc2IpIHtcbiAgICAgICAgdmFyIHJnYiA9IHtcbiAgICAgICAgICAgIHI6IG51bGwsIGc6IG51bGwsIGI6IG51bGxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGg6IG51bWJlciA9IGhzYi5oO1xuICAgICAgICBsZXQgczogbnVtYmVyID0gaHNiLnMqMjU1LzEwMDtcbiAgICAgICAgbGV0IHY6IG51bWJlciA9IGhzYi5iKjI1NS8xMDA7XG4gICAgICAgIGlmIChzID09IDApIHtcbiAgICAgICAgICAgIHJnYiA9IHtcbiAgICAgICAgICAgICAgICByOiB2LFxuICAgICAgICAgICAgICAgIGc6IHYsXG4gICAgICAgICAgICAgICAgYjogdlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHQxOiBudW1iZXIgPSB2O1xuICAgICAgICAgICAgbGV0IHQyOiBudW1iZXIgPSAoMjU1LXMpKnYvMjU1O1xuICAgICAgICAgICAgbGV0IHQzOiBudW1iZXIgPSAodDEtdDIpKihoJTYwKS82MDtcbiAgICAgICAgICAgIGlmIChoPT0zNjApIGggPSAwO1xuICAgICAgICAgICAgaWYgKGg8NjApIHtyZ2Iucj10MTtcdHJnYi5iPXQyOyByZ2IuZz10Mit0M31cbiAgICAgICAgICAgIGVsc2UgaWYgKGg8MTIwKSB7cmdiLmc9dDE7IHJnYi5iPXQyO1x0cmdiLnI9dDEtdDN9XG4gICAgICAgICAgICBlbHNlIGlmIChoPDE4MCkge3JnYi5nPXQxOyByZ2Iucj10MjtcdHJnYi5iPXQyK3QzfVxuICAgICAgICAgICAgZWxzZSBpZiAoaDwyNDApIHtyZ2IuYj10MTsgcmdiLnI9dDI7XHRyZ2IuZz10MS10M31cbiAgICAgICAgICAgIGVsc2UgaWYgKGg8MzAwKSB7cmdiLmI9dDE7IHJnYi5nPXQyO1x0cmdiLnI9dDIrdDN9XG4gICAgICAgICAgICBlbHNlIGlmIChoPDM2MCkge3JnYi5yPXQxOyByZ2IuZz10MjtcdHJnYi5iPXQxLXQzfVxuICAgICAgICAgICAgZWxzZSB7cmdiLnI9MDsgcmdiLmc9MDtcdHJnYi5iPTB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtyOk1hdGgucm91bmQocmdiLnIpLCBnOk1hdGgucm91bmQocmdiLmcpLCBiOk1hdGgucm91bmQocmdiLmIpfTtcbiAgICB9XG5cbiAgICBSR0J0b0hFWChyZ2IpIHtcbiAgICAgICAgdmFyIGhleCA9IFtcbiAgICAgICAgICAgIHJnYi5yLnRvU3RyaW5nKDE2KSxcbiAgICAgICAgICAgIHJnYi5nLnRvU3RyaW5nKDE2KSxcbiAgICAgICAgICAgIHJnYi5iLnRvU3RyaW5nKDE2KVxuICAgICAgICBdO1xuXG4gICAgICAgIGZvcih2YXIga2V5IGluIGhleCkge1xuICAgICAgICAgICAgaWYgKGhleFtrZXldLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgaGV4W2tleV0gPSAnMCcgKyBoZXhba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBoZXguam9pbignJyk7XG4gICAgfVxuXG4gICAgSFNCdG9IRVgoaHNiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLlJHQnRvSEVYKHRoaXMuSFNCdG9SR0IoaHNiKSk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5SGlkZSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gbnVsbDtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlc3RvcmVPdmVybGF5QXBwZW5kKCk7XG4gICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQ29sb3JQaWNrZXJdLFxuICAgIGRlY2xhcmF0aW9uczogW0NvbG9yUGlja2VyXVxufSlcbmV4cG9ydCBjbGFzcyBDb2xvclBpY2tlck1vZHVsZSB7IH1cbiJdfQ==