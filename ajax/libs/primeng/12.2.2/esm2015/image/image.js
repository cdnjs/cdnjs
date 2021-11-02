import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { trigger, style, transition, animate, } from '@angular/animations';
import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
export class Image {
    constructor(config, cd) {
        this.config = config;
        this.cd = cd;
        this.preview = false;
        this.showTransitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.maskVisible = false;
        this.previewVisible = false;
        this.rotate = 0;
        this.scale = 1;
        this.previewClick = false;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'indicator':
                    this.indicatorTemplate = item.template;
                    break;
                default:
                    this.indicatorTemplate = item.template;
                    break;
            }
        });
    }
    onImageClick() {
        if (this.preview) {
            this.maskVisible = true;
            this.previewVisible = true;
        }
    }
    onMaskClick() {
        if (!this.previewClick) {
            this.previewVisible = false;
            this.rotate = 0;
            this.scale = 1;
        }
        this.previewClick = false;
    }
    onPreviewImageClick() {
        this.previewClick = true;
    }
    rotateRight() {
        this.rotate += 90;
        this.previewClick = true;
    }
    rotateLeft() {
        this.rotate -= 90;
        this.previewClick = true;
    }
    zoomIn() {
        this.scale = this.scale + 0.1;
        this.previewClick = true;
    }
    zoomOut() {
        this.scale = this.scale - 0.1;
        this.previewClick = true;
    }
    zoomDisabled() {
        return this.scale <= 0.5 || this.scale >= 1.5;
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container.parentElement;
                this.appendContainer();
                this.moveOnTop();
                break;
            case 'void':
                DomHandler.addClass(this.wrapper, 'p-component-overlay-leave');
                break;
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                ZIndexUtils.clear(this.container);
                this.maskVisible = false;
                this.container = null;
                this.wrapper = null;
                this.cd.markForCheck();
                this.onHide.emit({});
                break;
            case 'visible':
                this.onShow.emit({});
                break;
        }
    }
    moveOnTop() {
        ZIndexUtils.set('modal', this.container, this.config.zIndex.modal);
        this.wrapper.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1);
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.wrapper);
            else
                DomHandler.appendChild(this.wrapper, this.appendTo);
        }
    }
    imagePreviewStyle() {
        return { transform: 'rotate(' + this.rotate + 'deg) scale(' + this.scale + ')' };
    }
    containerClass() {
        return {
            'p-image p-component': true,
            'p-image-preview-container': this.preview
        };
    }
}
Image.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Image, deps: [{ token: i1.PrimeNGConfig }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
Image.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Image, selector: "p-image", inputs: { imageClass: "imageClass", imageStyle: "imageStyle", styleClass: "styleClass", style: "style", src: "src", alt: "alt", width: "width", height: "height", appendTo: "appendTo", preview: "preview", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onShow: "onShow", onHide: "onHide" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "mask", first: true, predicate: ["mask"], descendants: true }], ngImport: i0, template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <img [attr.src]="src" [attr.alt]="alt" [attr.width]="width" [attr.height]="height" [ngStyle]="imageStyle" [class]="imageClass" />
            <div class="p-image-preview-indicator" *ngIf="preview" (click)="onImageClick()">
                <ng-container *ngIf="indicatorTemplate;else defaultTemplate">
                    <ng-container *ngTemplateOutlet="indicatorTemplate"></ng-container>
                </ng-container>
                <ng-template #defaultTemplate>
                    <i class="p-image-preview-icon pi pi-eye"></i>
                </ng-template>
            </div>
            <div #mask class="p-image-mask p-component-overlay p-component-overlay-enter" *ngIf="maskVisible" (click)="onMaskClick()">
                <div class="p-image-toolbar">
                    <button class="p-image-action p-link" (click)="rotateRight()" type="button">
                        <i class="pi pi-refresh"></i>
                    </button>
                    <button class="p-image-action p-link" (click)="rotateLeft()" type="button">
                        <i class="pi pi-undo"></i>
                    </button>
                    <button class="p-image-action p-link" (click)="zoomOut()" type="button" [disabled]="zoomDisabled()">
                        <i class="pi pi-search-minus"></i>
                    </button>
                    <button class="p-image-action p-link" (click)="zoomIn()" type="button" [disabled]="zoomDisabled()">
                        <i class="pi pi-search-plus"></i>
                    </button>
                    <button class="p-image-action p-link" type="button">
                        <i class="pi pi-times"></i>
                    </button>
                </div>
                <div *ngIf="previewVisible" [@animation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
                    (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)">
                    <img [attr.src]="src" class="p-image-preview" [ngStyle]="imagePreviewStyle()" (click)="onPreviewImageClick()"/>
                </div>
            </div>
        </span>
    `, isInline: true, styles: [".p-image-mask{display:flex;align-items:center;justify-content:center}.p-image-preview-container{position:relative;display:inline-block}.p-image-preview-indicator{position:absolute;left:0;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s}.p-image-preview-icon{font-size:1.5rem}.p-image-preview-container:hover>.p-image-preview-indicator{opacity:1;cursor:pointer}.p-image-preview-container>img{cursor:pointer}.p-image-toolbar{position:absolute;top:0;right:0;display:flex}.p-image-action.p-link{display:flex;justify-content:center;align-items:center}.p-image-preview{transition:transform .15s;max-width:100vw;max-height:100vh}"], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [
        trigger('animation', [
            transition('void => visible', [
                style({ transform: 'scale(0.7)', opacity: 0 }),
                animate('{{showTransitionParams}}')
            ]),
            transition('visible => void', [
                animate('{{hideTransitionParams}}', style({ transform: 'scale(0.7)', opacity: 0 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Image, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-image',
                    template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <img [attr.src]="src" [attr.alt]="alt" [attr.width]="width" [attr.height]="height" [ngStyle]="imageStyle" [class]="imageClass" />
            <div class="p-image-preview-indicator" *ngIf="preview" (click)="onImageClick()">
                <ng-container *ngIf="indicatorTemplate;else defaultTemplate">
                    <ng-container *ngTemplateOutlet="indicatorTemplate"></ng-container>
                </ng-container>
                <ng-template #defaultTemplate>
                    <i class="p-image-preview-icon pi pi-eye"></i>
                </ng-template>
            </div>
            <div #mask class="p-image-mask p-component-overlay p-component-overlay-enter" *ngIf="maskVisible" (click)="onMaskClick()">
                <div class="p-image-toolbar">
                    <button class="p-image-action p-link" (click)="rotateRight()" type="button">
                        <i class="pi pi-refresh"></i>
                    </button>
                    <button class="p-image-action p-link" (click)="rotateLeft()" type="button">
                        <i class="pi pi-undo"></i>
                    </button>
                    <button class="p-image-action p-link" (click)="zoomOut()" type="button" [disabled]="zoomDisabled()">
                        <i class="pi pi-search-minus"></i>
                    </button>
                    <button class="p-image-action p-link" (click)="zoomIn()" type="button" [disabled]="zoomDisabled()">
                        <i class="pi pi-search-plus"></i>
                    </button>
                    <button class="p-image-action p-link" type="button">
                        <i class="pi pi-times"></i>
                    </button>
                </div>
                <div *ngIf="previewVisible" [@animation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
                    (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)">
                    <img [attr.src]="src" class="p-image-preview" [ngStyle]="imagePreviewStyle()" (click)="onPreviewImageClick()"/>
                </div>
            </div>
        </span>
    `,
                    animations: [
                        trigger('animation', [
                            transition('void => visible', [
                                style({ transform: 'scale(0.7)', opacity: 0 }),
                                animate('{{showTransitionParams}}')
                            ]),
                            transition('visible => void', [
                                animate('{{hideTransitionParams}}', style({ transform: 'scale(0.7)', opacity: 0 }))
                            ])
                        ])
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./image.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.PrimeNGConfig }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { imageClass: [{
                type: Input
            }], imageStyle: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], src: [{
                type: Input
            }], alt: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], preview: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], mask: [{
                type: ViewChild,
                args: ['mask']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ImageModule {
}
ImageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ImageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ImageModule, declarations: [Image], imports: [CommonModule], exports: [Image, SharedModule] });
ImageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ImageModule, imports: [[CommonModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ImageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Image, SharedModule],
                    declarations: [Image]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvaW1hZ2UvaW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0Qix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBaUMsZUFBZSxFQUFhLE1BQU0sRUFBRSxZQUFZLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoUCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQWlCLE1BQU0sYUFBYSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEdBQWtCLE1BQU0scUJBQXFCLENBQUM7QUFDdEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBMEQ1QyxNQUFNLE9BQU8sS0FBSztJQWtEZCxZQUFvQixNQUFxQixFQUFVLEVBQXFCO1FBQXBELFdBQU0sR0FBTixNQUFNLENBQWU7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQTlCL0QsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QiwwQkFBcUIsR0FBVyxrQ0FBa0MsQ0FBQztRQUVuRSwwQkFBcUIsR0FBVyxrQ0FBa0MsQ0FBQztRQUVsRSxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0MsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBUXpELGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRTdCLG1CQUFjLEdBQWEsS0FBSyxDQUFDO1FBRWpDLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFFbkIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUVsQixpQkFBWSxHQUFZLEtBQUss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YSxDQUFDO29CQUMxQixJQUFJLEVBQUU7d0JBQ0YsT0FBTyxFQUFFLFdBQVc7cUJBQ3ZCO2lCQUNKO29JQUdZLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxHQUFHO3NCQUFYLEtBQUs7Z0JBRUcsR0FBRztzQkFBWCxLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxNQUFNO3NCQUFkLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxPQUFPO3NCQUFmLEtBQUs7Z0JBRUcscUJBQXFCO3NCQUE3QixLQUFLO2dCQUVHLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBRUcsTUFBTTtzQkFBZixNQUFNO2dCQUVZLElBQUk7c0JBQXRCLFNBQVM7dUJBQUMsTUFBTTtnQkFFZSxTQUFTO3NCQUF4QyxlQUFlO3VCQUFDLGFBQWE7O0FBNklsQyxNQUFNLE9BQU8sV0FBVzs7d0dBQVgsV0FBVzt5R0FBWCxXQUFXLGlCQTdLWCxLQUFLLGFBeUtKLFlBQVksYUF6S2IsS0FBSyxFQTBLRyxZQUFZO3lHQUdwQixXQUFXLFlBSlgsQ0FBQyxZQUFZLENBQUMsRUFDTixZQUFZOzJGQUdwQixXQUFXO2tCQUx2QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQztvQkFDOUIsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDO2lCQUN4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmLCBDb250ZW50Q2hpbGQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgVGVtcGxhdGVSZWYsIEFmdGVyQ29udGVudEluaXQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSwgUHJpbWVUZW1wbGF0ZSwgUHJpbWVOR0NvbmZpZyB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7dHJpZ2dlcixzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGUsIEFuaW1hdGlvbkV2ZW50LH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgWkluZGV4VXRpbHMgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWltYWdlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJjb250YWluZXJDbGFzcygpXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiPlxuICAgICAgICAgICAgPGltZyBbYXR0ci5zcmNdPVwic3JjXCIgW2F0dHIuYWx0XT1cImFsdFwiIFthdHRyLndpZHRoXT1cIndpZHRoXCIgW2F0dHIuaGVpZ2h0XT1cImhlaWdodFwiIFtuZ1N0eWxlXT1cImltYWdlU3R5bGVcIiBbY2xhc3NdPVwiaW1hZ2VDbGFzc1wiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1pbWFnZS1wcmV2aWV3LWluZGljYXRvclwiICpuZ0lmPVwicHJldmlld1wiIChjbGljayk9XCJvbkltYWdlQ2xpY2soKVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpbmRpY2F0b3JUZW1wbGF0ZTtlbHNlIGRlZmF1bHRUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaW5kaWNhdG9yVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJwLWltYWdlLXByZXZpZXctaWNvbiBwaSBwaS1leWVcIj48L2k+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAjbWFzayBjbGFzcz1cInAtaW1hZ2UtbWFzayBwLWNvbXBvbmVudC1vdmVybGF5IHAtY29tcG9uZW50LW92ZXJsYXktZW50ZXJcIiAqbmdJZj1cIm1hc2tWaXNpYmxlXCIgKGNsaWNrKT1cIm9uTWFza0NsaWNrKClcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1pbWFnZS10b29sYmFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWltYWdlLWFjdGlvbiBwLWxpbmtcIiAoY2xpY2spPVwicm90YXRlUmlnaHQoKVwiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwicGkgcGktcmVmcmVzaFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWltYWdlLWFjdGlvbiBwLWxpbmtcIiAoY2xpY2spPVwicm90YXRlTGVmdCgpXCIgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJwaSBwaS11bmRvXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInAtaW1hZ2UtYWN0aW9uIHAtbGlua1wiIChjbGljayk9XCJ6b29tT3V0KClcIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cInpvb21EaXNhYmxlZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cInBpIHBpLXNlYXJjaC1taW51c1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWltYWdlLWFjdGlvbiBwLWxpbmtcIiAoY2xpY2spPVwiem9vbUluKClcIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cInpvb21EaXNhYmxlZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cInBpIHBpLXNlYXJjaC1wbHVzXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInAtaW1hZ2UtYWN0aW9uIHAtbGlua1wiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwicGkgcGktdGltZXNcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJwcmV2aWV3VmlzaWJsZVwiIFtAYW5pbWF0aW9uXT1cInt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHtzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zfX1cIlxuICAgICAgICAgICAgICAgICAgICAoQGFuaW1hdGlvbi5zdGFydCk9XCJvbkFuaW1hdGlvblN0YXJ0KCRldmVudClcIiAoQGFuaW1hdGlvbi5kb25lKT1cIm9uQW5pbWF0aW9uRW5kKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBbYXR0ci5zcmNdPVwic3JjXCIgY2xhc3M9XCJwLWltYWdlLXByZXZpZXdcIiBbbmdTdHlsZV09XCJpbWFnZVByZXZpZXdTdHlsZSgpXCIgKGNsaWNrKT1cIm9uUHJldmlld0ltYWdlQ2xpY2soKVwiLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NwYW4+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ2FuaW1hdGlvbicsIFtcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIFtcbiAgICAgICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDAuNyknLCBvcGFjaXR5OiAwIH0pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gdm9pZCcsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDAuNyknLCBvcGFjaXR5OiAwIH0pKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vaW1hZ2UuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2UgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICAgIEBJbnB1dCgpIGltYWdlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGltYWdlU3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzcmM6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFsdDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgd2lkdGg6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueTtcblxuICAgIEBJbnB1dCgpIHByZXZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzE1MG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJztcblxuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzE1MG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJztcblxuICAgIEBPdXRwdXQoKSBvblNob3c6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uSGlkZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdtYXNrJykgbWFzazogRWxlbWVudFJlZjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIGluZGljYXRvclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgbWFza1Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByZXZpZXdWaXNpYmxlOiBib29sZWFuID0gIGZhbHNlO1xuXG4gICAgcm90YXRlOiBudW1iZXIgPSAwO1xuXG4gICAgc2NhbGU6IG51bWJlciA9IDE7XG5cbiAgICBwcmV2aWV3Q2xpY2s6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG5cbiAgICB3cmFwcGVyOiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBQcmltZU5HQ29uZmlnLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2luZGljYXRvcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kaWNhdG9yVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRpY2F0b3JUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uSW1hZ2VDbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJldmlldykge1xuICAgICAgICAgICAgdGhpcy5tYXNrVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnByZXZpZXdWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTWFza0NsaWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJldmlld0NsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpZXdWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnJvdGF0ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnNjYWxlID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJldmlld0NsaWNrID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25QcmV2aWV3SW1hZ2VDbGljaygpIHtcbiAgICAgICAgdGhpcy5wcmV2aWV3Q2xpY2sgPSB0cnVlO1xuICAgIH1cblxuICAgIHJvdGF0ZVJpZ2h0KCkge1xuICAgICAgICB0aGlzLnJvdGF0ZSArPSA5MDtcbiAgICAgICAgdGhpcy5wcmV2aWV3Q2xpY2sgPSB0cnVlO1xuICAgIH1cblxuICAgIHJvdGF0ZUxlZnQoKSB7XG4gICAgICAgIHRoaXMucm90YXRlIC09IDkwO1xuICAgICAgICB0aGlzLnByZXZpZXdDbGljayA9IHRydWU7XG4gICAgfVxuXG4gICAgem9vbUluKCkge1xuICAgICAgICB0aGlzLnNjYWxlID0gdGhpcy5zY2FsZSArIDAuMTtcbiAgICAgICAgdGhpcy5wcmV2aWV3Q2xpY2sgPSB0cnVlO1xuICAgIH1cblxuICAgIHpvb21PdXQoKSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSB0aGlzLnNjYWxlIC0gMC4xO1xuICAgICAgICB0aGlzLnByZXZpZXdDbGljayA9IHRydWU7XG4gICAgfVxuXG4gICAgem9vbURpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZSA8PSAwLjUgfHwgdGhpcy5zY2FsZSA+PSAxLjU7XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZXZlbnQuZWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZXIgPSB0aGlzLmNvbnRhaW5lci5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ29udGFpbmVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlT25Ub3AoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMud3JhcHBlciwgJ3AtY29tcG9uZW50LW92ZXJsYXktbGVhdmUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25FbmQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcih0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXNrVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpZGUuZW1pdCh7fSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25TaG93LmVtaXQoe30pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlT25Ub3AoKSB7XG4gICAgICAgIFpJbmRleFV0aWxzLnNldCgnbW9kYWwnLCB0aGlzLmNvbnRhaW5lciwgdGhpcy5jb25maWcuekluZGV4Lm1vZGFsKTtcbiAgICAgICAgdGhpcy53cmFwcGVyLnN0eWxlLnpJbmRleCA9IFN0cmluZyhwYXJzZUludCh0aGlzLmNvbnRhaW5lci5zdHlsZS56SW5kZXgsIDEwKSAtIDEpO1xuICAgIH1cblxuICAgIGFwcGVuZENvbnRhaW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyLCB0aGlzLmFwcGVuZFRvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGltYWdlUHJldmlld1N0eWxlKCkge1xuICAgICAgICByZXR1cm4ge3RyYW5zZm9ybTogJ3JvdGF0ZSgnICsgdGhpcy5yb3RhdGUgKyAnZGVnKSBzY2FsZSgnICsgdGhpcy5zY2FsZSArICcpJ307XG4gICAgfVxuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1pbWFnZSBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1pbWFnZS1wcmV2aWV3LWNvbnRhaW5lcic6IHRoaXMucHJldmlld1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbSW1hZ2UsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbSW1hZ2VdXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlTW9kdWxlIHsgfVxuIl19