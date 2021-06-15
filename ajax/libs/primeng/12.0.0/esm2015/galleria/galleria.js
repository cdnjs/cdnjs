import { NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ContentChildren, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { UniqueComponentId } from 'primeng/utils';
import { DomHandler } from 'primeng/dom';
import { RippleModule } from 'primeng/ripple';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
export class Galleria {
    constructor(element, cd) {
        this.element = element;
        this.cd = cd;
        this.fullScreen = false;
        this.numVisible = 3;
        this.showItemNavigators = false;
        this.showThumbnailNavigators = true;
        this.showItemNavigatorsOnHover = false;
        this.changeItemOnIndicatorHover = false;
        this.circular = false;
        this.autoPlay = false;
        this.transitionInterval = 4000;
        this.showThumbnails = true;
        this.thumbnailsPosition = "bottom";
        this.verticalThumbnailViewPortHeight = "300px";
        this.showIndicators = false;
        this.showIndicatorsOnItem = false;
        this.indicatorsPosition = "bottom";
        this.baseZIndex = 0;
        this.activeIndexChange = new EventEmitter();
        this.visibleChange = new EventEmitter();
        this._visible = false;
        this._activeIndex = 0;
    }
    get activeIndex() {
        return this._activeIndex;
    }
    ;
    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
    }
    get visible() {
        return this._visible;
    }
    ;
    set visible(visible) {
        this._visible = visible;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerFacet = item.template;
                    break;
                case 'footer':
                    this.footerFacet = item.template;
                    break;
                case 'indicator':
                    this.indicatorFacet = item.template;
                    break;
                case 'caption':
                    this.captionFacet = item.template;
                    break;
            }
        });
    }
    ngOnChanges(simpleChanges) {
        if (this.fullScreen && simpleChanges.visible) {
            if (simpleChanges.visible.currentValue) {
                DomHandler.addClass(document.body, 'p-overflow-hidden');
                this.zIndex = String(this.baseZIndex + ++DomHandler.zindex);
            }
            else {
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }
        }
    }
    onMaskHide() {
        this.visible = false;
        this.visibleChange.emit(false);
    }
    onActiveItemChange(index) {
        if (this.activeIndex !== index) {
            this.activeIndex = index;
            this.activeIndexChange.emit(index);
        }
    }
    ngOnDestroy() {
        if (this.fullScreen) {
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }
    }
}
Galleria.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Galleria, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
Galleria.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: Galleria, selector: "p-galleria", inputs: { activeIndex: "activeIndex", fullScreen: "fullScreen", id: "id", value: "value", numVisible: "numVisible", responsiveOptions: "responsiveOptions", showItemNavigators: "showItemNavigators", showThumbnailNavigators: "showThumbnailNavigators", showItemNavigatorsOnHover: "showItemNavigatorsOnHover", changeItemOnIndicatorHover: "changeItemOnIndicatorHover", circular: "circular", autoPlay: "autoPlay", transitionInterval: "transitionInterval", showThumbnails: "showThumbnails", thumbnailsPosition: "thumbnailsPosition", verticalThumbnailViewPortHeight: "verticalThumbnailViewPortHeight", showIndicators: "showIndicators", showIndicatorsOnItem: "showIndicatorsOnItem", indicatorsPosition: "indicatorsPosition", baseZIndex: "baseZIndex", maskClass: "maskClass", containerClass: "containerClass", containerStyle: "containerStyle", visible: "visible" }, outputs: { activeIndexChange: "activeIndexChange", visibleChange: "visibleChange" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "mask", first: true, predicate: ["mask"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <div *ngIf="fullScreen;else windowed">
            <div *ngIf="visible" #mask [ngClass]="{'p-galleria-mask p-component-overlay':true, 'p-galleria-visible': this.visible}" [class]="maskClass" [ngStyle]="{'zIndex':zIndex}">
                <p-galleriaContent [value]="value" [activeIndex]="activeIndex" (maskHide)="onMaskHide()" (activeItemChange)="onActiveItemChange($event)" [ngStyle]="containerStyle"></p-galleriaContent>
            </div>
        </div>

        <ng-template #windowed>
            <p-galleriaContent [value]="value" [activeIndex]="activeIndex" (activeItemChange)="onActiveItemChange($event)"></p-galleriaContent>
        </ng-template>
    `, isInline: true, styles: [".p-galleria-content,.p-galleria-item-wrapper{display:flex;flex-direction:column}.p-galleria-item-wrapper{position:relative}.p-galleria-item-container{position:relative;display:flex;height:100%}.p-galleria-item-nav{position:absolute;top:50%;margin-top:-.5rem;display:inline-flex;justify-content:center;align-items:center;overflow:hidden}.p-galleria-item-prev{left:0;border-top-left-radius:0;border-bottom-left-radius:0}.p-galleria-item-next{right:0;border-top-right-radius:0;border-bottom-right-radius:0}.p-galleria-item{display:flex;justify-content:center;align-items:center;height:100%;width:100%}.p-galleria-item-nav-onhover .p-galleria-item-nav{pointer-events:none;opacity:0;transition:opacity .2s ease-in-out}.p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav{pointer-events:all;opacity:1}.p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav.p-disabled{pointer-events:none}.p-galleria-caption{position:absolute;bottom:0;left:0;width:100%}.p-galleria-thumbnail-wrapper{display:flex;flex-direction:column;overflow:auto;flex-shrink:0}.p-galleria-thumbnail-next,.p-galleria-thumbnail-prev{align-self:center;flex:0 0 auto;overflow:hidden;position:relative}.p-galleria-thumbnail-next,.p-galleria-thumbnail-next span,.p-galleria-thumbnail-prev,.p-galleria-thumbnail-prev span{display:flex;justify-content:center;align-items:center}.p-galleria-thumbnail-container{display:flex;flex-direction:row}.p-galleria-thumbnail-items-container{overflow:hidden}.p-galleria-thumbnail-items{display:flex}.p-galleria-thumbnail-item{overflow:auto;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:.5}.p-galleria-thumbnail-item:hover{opacity:1;transition:opacity .3s}.p-galleria-thumbnail-item-current{opacity:1}.p-galleria-thumbnails-left .p-galleria-content,.p-galleria-thumbnails-left .p-galleria-item-wrapper,.p-galleria-thumbnails-right .p-galleria-content,.p-galleria-thumbnails-right .p-galleria-item-wrapper{flex-direction:row}.p-galleria-thumbnails-left p-galleriaitem,.p-galleria-thumbnails-top p-galleriaitem{order:2}.p-galleria-thumbnails-left p-galleriathumbnails,.p-galleria-thumbnails-top p-galleriathumbnails{order:1}.p-galleria-thumbnails-left .p-galleria-thumbnail-container,.p-galleria-thumbnails-right .p-galleria-thumbnail-container{flex-direction:column;flex-grow:1}.p-galleria-thumbnails-left .p-galleria-thumbnail-items,.p-galleria-thumbnails-right .p-galleria-thumbnail-items{flex-direction:column;height:100%}.p-galleria-thumbnails-left .p-galleria-thumbnail-wrapper,.p-galleria-thumbnails-right .p-galleria-thumbnail-wrapper{height:100%}.p-galleria-indicators{display:flex;align-items:center;justify-content:center}.p-galleria-indicator>button{display:inline-flex;align-items:center}.p-galleria-indicators-left .p-galleria-item-wrapper,.p-galleria-indicators-right .p-galleria-item-wrapper{flex-direction:row;align-items:center}.p-galleria-indicators-left .p-galleria-item-container,.p-galleria-indicators-top .p-galleria-item-container{order:2}.p-galleria-indicators-left .p-galleria-indicators,.p-galleria-indicators-top .p-galleria-indicators{order:1}.p-galleria-indicators-left .p-galleria-indicators,.p-galleria-indicators-right .p-galleria-indicators{flex-direction:column}.p-galleria-indicator-onitem .p-galleria-indicators{position:absolute;display:flex;z-index:1}.p-galleria-indicator-onitem.p-galleria-indicators-top .p-galleria-indicators{top:0;left:0;width:100%;align-items:flex-start}.p-galleria-indicator-onitem.p-galleria-indicators-right .p-galleria-indicators{right:0;top:0;height:100%;align-items:flex-end}.p-galleria-indicator-onitem.p-galleria-indicators-bottom .p-galleria-indicators{bottom:0;left:0;width:100%;align-items:flex-end}.p-galleria-indicator-onitem.p-galleria-indicators-left .p-galleria-indicators{left:0;top:0;height:100%;align-items:flex-start}.p-galleria-mask{position:fixed;left:0;width:100%;height:100%;background-color:transparent;transition-property:background-color}.p-galleria-close,.p-galleria-mask{top:0;display:flex;align-items:center;justify-content:center}.p-galleria-close{position:absolute;right:0;overflow:hidden}.p-galleria-mask .p-galleria-item-nav{position:fixed;top:50%;margin-top:-.5rem}.p-galleria-mask.p-galleria-mask-leave{background-color:transparent}.p-items-hidden .p-galleria-thumbnail-item{visibility:hidden}.p-items-hidden .p-galleria-thumbnail-item.p-galleria-thumbnail-item-active{visibility:visible}"], components: [{ type: i0.forwardRef(function () { return GalleriaContent; }), selector: "p-galleriaContent", inputs: ["activeIndex", "value"], outputs: ["maskHide", "activeItemChange"] }], directives: [{ type: i0.forwardRef(function () { return i1.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i0.forwardRef(function () { return i1.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i0.forwardRef(function () { return i1.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Galleria, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-galleria',
                    template: `
        <div *ngIf="fullScreen;else windowed">
            <div *ngIf="visible" #mask [ngClass]="{'p-galleria-mask p-component-overlay':true, 'p-galleria-visible': this.visible}" [class]="maskClass" [ngStyle]="{'zIndex':zIndex}">
                <p-galleriaContent [value]="value" [activeIndex]="activeIndex" (maskHide)="onMaskHide()" (activeItemChange)="onActiveItemChange($event)" [ngStyle]="containerStyle"></p-galleriaContent>
            </div>
        </div>

        <ng-template #windowed>
            <p-galleriaContent [value]="value" [activeIndex]="activeIndex" (activeItemChange)="onActiveItemChange($event)"></p-galleriaContent>
        </ng-template>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./galleria.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { activeIndex: [{
                type: Input
            }], fullScreen: [{
                type: Input
            }], id: [{
                type: Input
            }], value: [{
                type: Input
            }], numVisible: [{
                type: Input
            }], responsiveOptions: [{
                type: Input
            }], showItemNavigators: [{
                type: Input
            }], showThumbnailNavigators: [{
                type: Input
            }], showItemNavigatorsOnHover: [{
                type: Input
            }], changeItemOnIndicatorHover: [{
                type: Input
            }], circular: [{
                type: Input
            }], autoPlay: [{
                type: Input
            }], transitionInterval: [{
                type: Input
            }], showThumbnails: [{
                type: Input
            }], thumbnailsPosition: [{
                type: Input
            }], verticalThumbnailViewPortHeight: [{
                type: Input
            }], showIndicators: [{
                type: Input
            }], showIndicatorsOnItem: [{
                type: Input
            }], indicatorsPosition: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], maskClass: [{
                type: Input
            }], containerClass: [{
                type: Input
            }], containerStyle: [{
                type: Input
            }], mask: [{
                type: ViewChild,
                args: ['mask', { static: false }]
            }], visible: [{
                type: Input
            }], activeIndexChange: [{
                type: Output
            }], visibleChange: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class GalleriaContent {
    constructor(galleria, cd) {
        this.galleria = galleria;
        this.cd = cd;
        this.value = [];
        this.maskHide = new EventEmitter();
        this.activeItemChange = new EventEmitter();
        this.id = this.galleria.id || UniqueComponentId();
        this.slideShowActicve = false;
        this._activeIndex = 0;
        this.slideShowActive = true;
    }
    get activeIndex() {
        return this._activeIndex;
    }
    ;
    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
    }
    galleriaClass() {
        const thumbnailsPosClass = this.galleria.showThumbnails && this.getPositionClass('p-galleria-thumbnails', this.galleria.thumbnailsPosition);
        const indicatorPosClass = this.galleria.showIndicators && this.getPositionClass('p-galleria-indicators', this.galleria.indicatorsPosition);
        return (this.galleria.containerClass ? this.galleria.containerClass + " " : '') + (thumbnailsPosClass ? thumbnailsPosClass + " " : '') + (indicatorPosClass ? indicatorPosClass + " " : '');
    }
    startSlideShow() {
        this.interval = setInterval(() => {
            let activeIndex = (this.galleria.circular && (this.value.length - 1) === this.activeIndex) ? 0 : (this.activeIndex + 1);
            this.onActiveIndexChange(activeIndex);
            this.activeIndex = activeIndex;
        }, this.galleria.transitionInterval);
        this.slideShowActive = true;
    }
    stopSlideShow() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.slideShowActive = false;
    }
    getPositionClass(preClassName, position) {
        const positions = ['top', 'left', 'bottom', 'right'];
        const pos = positions.find(item => item === position);
        return pos ? `${preClassName}-${pos}` : '';
    }
    isVertical() {
        return this.galleria.thumbnailsPosition === 'left' || this.galleria.thumbnailsPosition === 'right';
    }
    onActiveIndexChange(index) {
        if (this.activeIndex !== index) {
            this.activeIndex = index;
            this.activeItemChange.emit(this.activeIndex);
        }
    }
}
GalleriaContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: GalleriaContent, deps: [{ token: Galleria }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
GalleriaContent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: GalleriaContent, selector: "p-galleriaContent", inputs: { activeIndex: "activeIndex", value: "value" }, outputs: { maskHide: "maskHide", activeItemChange: "activeItemChange" }, ngImport: i0, template: `
        <div [attr.id]="id" *ngIf="value && value.length > 0" [ngClass]="{'p-galleria p-component': true, 'p-galleria-fullscreen': this.galleria.fullScreen, 
            'p-galleria-indicator-onitem': this.galleria.showIndicatorsOnItem, 'p-galleria-item-nav-onhover': this.galleria.showItemNavigatorsOnHover && !this.galleria.fullScreen}"
            [ngStyle]="!galleria.fullScreen ? galleria.containerStyle : {}" [class]="galleriaClass()">
            <button *ngIf="galleria.fullScreen" type="button" class="p-galleria-close p-link" (click)="maskHide.emit()" pRipple>
                <span class="p-galleria-close-icon pi pi-times"></span>
            </button>
            <div *ngIf="galleria.templates && galleria.headerFacet" class="p-galleria-header">
                <p-galleriaItemSlot type="header" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
            <div class="p-galleria-content">
                <p-galleriaItem [value]="value" [activeIndex]="activeIndex" [circular]="galleria.circular" [templates]="galleria.templates" (onActiveIndexChange)="onActiveIndexChange($event)" 
                    [showIndicators]="galleria.showIndicators" [changeItemOnIndicatorHover]="galleria.changeItemOnIndicatorHover" [indicatorFacet]="galleria.indicatorFacet"
                    [captionFacet]="galleria.captionFacet" [showItemNavigators]="galleria.showItemNavigators" [autoPlay]="galleria.autoPlay" [slideShowActive]="slideShowActive"
                    (startSlideShow)="startSlideShow()" (stopSlideShow)="stopSlideShow()"></p-galleriaItem>

                <p-galleriaThumbnails *ngIf="galleria.showThumbnails" [containerId]="id" [value]="value" (onActiveIndexChange)="onActiveIndexChange($event)" [activeIndex]="activeIndex" [templates]="galleria.templates"
                    [numVisible]="galleria.numVisible" [responsiveOptions]="galleria.responsiveOptions" [circular]="galleria.circular"
                    [isVertical]="isVertical()" [contentHeight]="galleria.verticalThumbnailViewPortHeight" [showThumbnailNavigators]="galleria.showThumbnailNavigators"
                    [slideShowActive]="slideShowActive" (stopSlideShow)="stopSlideShow()"></p-galleriaThumbnails>
            </div>
            <div *ngIf="galleria.templates && galleria.footerFacet" class="p-galleria-footer">
                <p-galleriaItemSlot type="footer" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
        </div>
    `, isInline: true, components: [{ type: i0.forwardRef(function () { return GalleriaItemSlot; }), selector: "p-galleriaItemSlot", inputs: ["templates", "index", "item", "type"] }, { type: i0.forwardRef(function () { return GalleriaItem; }), selector: "p-galleriaItem", inputs: ["circular", "value", "showItemNavigators", "showIndicators", "slideShowActive", "changeItemOnIndicatorHover", "autoPlay", "templates", "indicatorFacet", "captionFacet", "activeIndex"], outputs: ["startSlideShow", "stopSlideShow", "onActiveIndexChange"] }, { type: i0.forwardRef(function () { return GalleriaThumbnails; }), selector: "p-galleriaThumbnails", inputs: ["containerId", "value", "isVertical", "slideShowActive", "circular", "responsiveOptions", "contentHeight", "showThumbnailNavigators", "templates", "numVisible", "activeIndex"], outputs: ["onActiveIndexChange", "stopSlideShow"] }], directives: [{ type: i0.forwardRef(function () { return i1.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i0.forwardRef(function () { return i1.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i0.forwardRef(function () { return i1.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i0.forwardRef(function () { return i2.Ripple; }), selector: "[pRipple]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: GalleriaContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-galleriaContent',
                    template: `
        <div [attr.id]="id" *ngIf="value && value.length > 0" [ngClass]="{'p-galleria p-component': true, 'p-galleria-fullscreen': this.galleria.fullScreen, 
            'p-galleria-indicator-onitem': this.galleria.showIndicatorsOnItem, 'p-galleria-item-nav-onhover': this.galleria.showItemNavigatorsOnHover && !this.galleria.fullScreen}"
            [ngStyle]="!galleria.fullScreen ? galleria.containerStyle : {}" [class]="galleriaClass()">
            <button *ngIf="galleria.fullScreen" type="button" class="p-galleria-close p-link" (click)="maskHide.emit()" pRipple>
                <span class="p-galleria-close-icon pi pi-times"></span>
            </button>
            <div *ngIf="galleria.templates && galleria.headerFacet" class="p-galleria-header">
                <p-galleriaItemSlot type="header" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
            <div class="p-galleria-content">
                <p-galleriaItem [value]="value" [activeIndex]="activeIndex" [circular]="galleria.circular" [templates]="galleria.templates" (onActiveIndexChange)="onActiveIndexChange($event)" 
                    [showIndicators]="galleria.showIndicators" [changeItemOnIndicatorHover]="galleria.changeItemOnIndicatorHover" [indicatorFacet]="galleria.indicatorFacet"
                    [captionFacet]="galleria.captionFacet" [showItemNavigators]="galleria.showItemNavigators" [autoPlay]="galleria.autoPlay" [slideShowActive]="slideShowActive"
                    (startSlideShow)="startSlideShow()" (stopSlideShow)="stopSlideShow()"></p-galleriaItem>

                <p-galleriaThumbnails *ngIf="galleria.showThumbnails" [containerId]="id" [value]="value" (onActiveIndexChange)="onActiveIndexChange($event)" [activeIndex]="activeIndex" [templates]="galleria.templates"
                    [numVisible]="galleria.numVisible" [responsiveOptions]="galleria.responsiveOptions" [circular]="galleria.circular"
                    [isVertical]="isVertical()" [contentHeight]="galleria.verticalThumbnailViewPortHeight" [showThumbnailNavigators]="galleria.showThumbnailNavigators"
                    [slideShowActive]="slideShowActive" (stopSlideShow)="stopSlideShow()"></p-galleriaThumbnails>
            </div>
            <div *ngIf="galleria.templates && galleria.footerFacet" class="p-galleria-footer">
                <p-galleriaItemSlot type="footer" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: Galleria }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { activeIndex: [{
                type: Input
            }], value: [{
                type: Input
            }], maskHide: [{
                type: Output
            }], activeItemChange: [{
                type: Output
            }] } });
export class GalleriaItemSlot {
    get item() {
        return this._item;
    }
    ;
    set item(item) {
        this._item = item;
        if (this.templates) {
            this.templates.forEach((item) => {
                if (item.getType() === this.type) {
                    switch (this.type) {
                        case 'item':
                        case 'caption':
                        case 'thumbnail':
                            this.context = { $implicit: this.item };
                            this.contentTemplate = item.template;
                            break;
                    }
                }
            });
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            if (item.getType() === this.type) {
                switch (this.type) {
                    case 'item':
                    case 'caption':
                    case 'thumbnail':
                        this.context = { $implicit: this.item };
                        this.contentTemplate = item.template;
                        break;
                    case 'indicator':
                        this.context = { $implicit: this.index };
                        this.contentTemplate = item.template;
                        break;
                    default:
                        this.context = {};
                        this.contentTemplate = item.template;
                        break;
                }
            }
        });
    }
}
GalleriaItemSlot.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: GalleriaItemSlot, deps: [], target: i0.ɵɵFactoryTarget.Component });
GalleriaItemSlot.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: GalleriaItemSlot, selector: "p-galleriaItemSlot", inputs: { templates: "templates", index: "index", item: "item", type: "type" }, ngImport: i0, template: `
        <ng-container *ngIf="contentTemplate">
            <ng-container *ngTemplateOutlet="contentTemplate; context: context"></ng-container>
        </ng-container>
    `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: GalleriaItemSlot, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-galleriaItemSlot',
                    template: `
        <ng-container *ngIf="contentTemplate">
            <ng-container *ngTemplateOutlet="contentTemplate; context: context"></ng-container>
        </ng-container>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { templates: [{
                type: Input
            }], index: [{
                type: Input
            }], item: [{
                type: Input
            }], type: [{
                type: Input
            }] } });
export class GalleriaItem {
    constructor() {
        this.circular = false;
        this.showItemNavigators = false;
        this.showIndicators = true;
        this.slideShowActive = true;
        this.changeItemOnIndicatorHover = true;
        this.autoPlay = false;
        this.startSlideShow = new EventEmitter();
        this.stopSlideShow = new EventEmitter();
        this.onActiveIndexChange = new EventEmitter();
        this._activeIndex = 0;
    }
    get activeIndex() {
        return this._activeIndex;
    }
    ;
    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
        this.activeItem = this.value[this._activeIndex];
    }
    ngOnInit() {
        if (this.autoPlay) {
            this.startSlideShow.emit();
        }
    }
    next() {
        let nextItemIndex = this.activeIndex + 1;
        let activeIndex = this.circular && this.value.length - 1 === this.activeIndex
            ? 0
            : nextItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
    }
    prev() {
        let prevItemIndex = this.activeIndex !== 0 ? this.activeIndex - 1 : 0;
        let activeIndex = this.circular && this.activeIndex === 0
            ? this.value.length - 1
            : prevItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
    }
    stopTheSlideShow() {
        if (this.slideShowActive && this.stopSlideShow) {
            this.stopSlideShow.emit();
        }
    }
    navForward(e) {
        this.stopTheSlideShow();
        this.next();
        if (e && e.cancelable) {
            e.preventDefault();
        }
    }
    navBackward(e) {
        this.stopTheSlideShow();
        this.prev();
        if (e && e.cancelable) {
            e.preventDefault();
        }
    }
    onIndicatorClick(index) {
        this.stopTheSlideShow();
        this.onActiveIndexChange.emit(index);
    }
    onIndicatorMouseEnter(index) {
        if (this.changeItemOnIndicatorHover) {
            this.stopTheSlideShow();
            this.onActiveIndexChange.emit(index);
        }
    }
    onIndicatorKeyDown(index) {
        this.stopTheSlideShow();
        this.onActiveIndexChange.emit(index);
    }
    isNavForwardDisabled() {
        return !this.circular && this.activeIndex === (this.value.length - 1);
    }
    isNavBackwardDisabled() {
        return !this.circular && this.activeIndex === 0;
    }
    isIndicatorItemActive(index) {
        return this.activeIndex === index;
    }
}
GalleriaItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: GalleriaItem, deps: [], target: i0.ɵɵFactoryTarget.Component });
GalleriaItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: GalleriaItem, selector: "p-galleriaItem", inputs: { circular: "circular", value: "value", showItemNavigators: "showItemNavigators", showIndicators: "showIndicators", slideShowActive: "slideShowActive", changeItemOnIndicatorHover: "changeItemOnIndicatorHover", autoPlay: "autoPlay", templates: "templates", indicatorFacet: "indicatorFacet", captionFacet: "captionFacet", activeIndex: "activeIndex" }, outputs: { startSlideShow: "startSlideShow", stopSlideShow: "stopSlideShow", onActiveIndexChange: "onActiveIndexChange" }, ngImport: i0, template: `
        <div class="p-galleria-item-wrapper">
            <div class="p-galleria-item-container">
                <button *ngIf="showItemNavigators" type="button" [ngClass]="{'p-galleria-item-prev p-galleria-item-nav p-link': true, 'p-disabled': this.isNavBackwardDisabled()}" (click)="navBackward($event)" [disabled]="isNavBackwardDisabled()" pRipple>
                    <span class="p-galleria-item-prev-icon pi pi-chevron-left"></span>
                </button>
                <p-galleriaItemSlot type="item" [item]="activeItem" [templates]="templates" class="p-galleria-item"></p-galleriaItemSlot>
                <button *ngIf="showItemNavigators" type="button" [ngClass]="{'p-galleria-item-next p-galleria-item-nav p-link': true,'p-disabled': this.isNavForwardDisabled()}" (click)="navForward($event)"  [disabled]="isNavForwardDisabled()" pRipple>
                    <span class="p-galleria-item-next-icon pi pi-chevron-right"></span>
                </button>
                <div class="p-galleria-caption" *ngIf="captionFacet">
                    <p-galleriaItemSlot type="caption" [item]="activeItem" [templates]="templates"></p-galleriaItemSlot>
                </div>
            </div>
            <ul *ngIf="showIndicators" class="p-galleria-indicators p-reset">
                <li *ngFor="let item of value; let index = index;" tabindex="0"
                    (click)="onIndicatorClick(index)" (mouseenter)="onIndicatorMouseEnter(index)" (keydown.enter)="onIndicatorKeyDown(index)"
                    [ngClass]="{'p-galleria-indicator': true,'p-highlight': isIndicatorItemActive(index)}">
                    <button type="button" tabIndex="-1" class="p-link" *ngIf="!indicatorFacet">
                    </button>
                    <p-galleriaItemSlot type="indicator" [index]="index" [templates]="templates"></p-galleriaItemSlot>
                </li>
            </ul>
        </div>
    `, isInline: true, components: [{ type: GalleriaItemSlot, selector: "p-galleriaItemSlot", inputs: ["templates", "index", "item", "type"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.Ripple, selector: "[pRipple]" }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: GalleriaItem, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-galleriaItem',
                    template: `
        <div class="p-galleria-item-wrapper">
            <div class="p-galleria-item-container">
                <button *ngIf="showItemNavigators" type="button" [ngClass]="{'p-galleria-item-prev p-galleria-item-nav p-link': true, 'p-disabled': this.isNavBackwardDisabled()}" (click)="navBackward($event)" [disabled]="isNavBackwardDisabled()" pRipple>
                    <span class="p-galleria-item-prev-icon pi pi-chevron-left"></span>
                </button>
                <p-galleriaItemSlot type="item" [item]="activeItem" [templates]="templates" class="p-galleria-item"></p-galleriaItemSlot>
                <button *ngIf="showItemNavigators" type="button" [ngClass]="{'p-galleria-item-next p-galleria-item-nav p-link': true,'p-disabled': this.isNavForwardDisabled()}" (click)="navForward($event)"  [disabled]="isNavForwardDisabled()" pRipple>
                    <span class="p-galleria-item-next-icon pi pi-chevron-right"></span>
                </button>
                <div class="p-galleria-caption" *ngIf="captionFacet">
                    <p-galleriaItemSlot type="caption" [item]="activeItem" [templates]="templates"></p-galleriaItemSlot>
                </div>
            </div>
            <ul *ngIf="showIndicators" class="p-galleria-indicators p-reset">
                <li *ngFor="let item of value; let index = index;" tabindex="0"
                    (click)="onIndicatorClick(index)" (mouseenter)="onIndicatorMouseEnter(index)" (keydown.enter)="onIndicatorKeyDown(index)"
                    [ngClass]="{'p-galleria-indicator': true,'p-highlight': isIndicatorItemActive(index)}">
                    <button type="button" tabIndex="-1" class="p-link" *ngIf="!indicatorFacet">
                    </button>
                    <p-galleriaItemSlot type="indicator" [index]="index" [templates]="templates"></p-galleriaItemSlot>
                </li>
            </ul>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { circular: [{
                type: Input
            }], value: [{
                type: Input
            }], showItemNavigators: [{
                type: Input
            }], showIndicators: [{
                type: Input
            }], slideShowActive: [{
                type: Input
            }], changeItemOnIndicatorHover: [{
                type: Input
            }], autoPlay: [{
                type: Input
            }], templates: [{
                type: Input
            }], indicatorFacet: [{
                type: Input
            }], captionFacet: [{
                type: Input
            }], startSlideShow: [{
                type: Output
            }], stopSlideShow: [{
                type: Output
            }], onActiveIndexChange: [{
                type: Output
            }], activeIndex: [{
                type: Input
            }] } });
export class GalleriaThumbnails {
    constructor(cd) {
        this.cd = cd;
        this.isVertical = false;
        this.slideShowActive = false;
        this.circular = false;
        this.contentHeight = "300px";
        this.showThumbnailNavigators = true;
        this.onActiveIndexChange = new EventEmitter();
        this.stopSlideShow = new EventEmitter();
        this.startPos = null;
        this.thumbnailsStyle = null;
        this.sortedResponsiveOptions = null;
        this.totalShiftedItems = 0;
        this.page = 0;
        this._numVisible = 0;
        this.d_numVisible = 0;
        this._oldNumVisible = 0;
        this._activeIndex = 0;
        this._oldactiveIndex = 0;
    }
    get numVisible() {
        return this._numVisible;
    }
    ;
    set numVisible(numVisible) {
        this._numVisible = numVisible;
        this._oldNumVisible = this.d_numVisible;
        this.d_numVisible = numVisible;
    }
    get activeIndex() {
        return this._activeIndex;
    }
    ;
    set activeIndex(activeIndex) {
        this._oldactiveIndex = this._activeIndex;
        this._activeIndex = activeIndex;
    }
    ngOnInit() {
        this.createStyle();
        if (this.responsiveOptions) {
            this.bindDocumentListeners();
        }
    }
    ngAfterContentChecked() {
        let totalShiftedItems = this.totalShiftedItems;
        if ((this._oldNumVisible !== this.d_numVisible || this._oldactiveIndex !== this._activeIndex) && this.itemsContainer) {
            if (this._activeIndex <= this.getMedianItemIndex()) {
                totalShiftedItems = 0;
            }
            else if (this.value.length - this.d_numVisible + this.getMedianItemIndex() < this._activeIndex) {
                totalShiftedItems = this.d_numVisible - this.value.length;
            }
            else if (this.value.length - this.d_numVisible < this._activeIndex && this.d_numVisible % 2 === 0) {
                totalShiftedItems = (this._activeIndex * -1) + this.getMedianItemIndex() + 1;
            }
            else {
                totalShiftedItems = (this._activeIndex * -1) + this.getMedianItemIndex();
            }
            if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }
            if (this.itemsContainer && this.itemsContainer.nativeElement) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
            }
            if (this._oldactiveIndex !== this._activeIndex) {
                DomHandler.removeClass(this.itemsContainer.nativeElement, 'p-items-hidden');
                this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
            }
            this._oldactiveIndex = this._activeIndex;
            this._oldNumVisible = this.d_numVisible;
        }
    }
    ngAfterViewInit() {
        this.calculatePosition();
    }
    createStyle() {
        if (!this.thumbnailsStyle) {
            this.thumbnailsStyle = document.createElement('style');
            this.thumbnailsStyle.type = 'text/css';
            document.body.appendChild(this.thumbnailsStyle);
        }
        let innerHTML = `
            #${this.containerId} .p-galleria-thumbnail-item {
                flex: 1 0 ${(100 / this.d_numVisible)}%
            }
        `;
        if (this.responsiveOptions) {
            this.sortedResponsiveOptions = [...this.responsiveOptions];
            this.sortedResponsiveOptions.sort((data1, data2) => {
                const value1 = data1.breakpoint;
                const value2 = data2.breakpoint;
                let result = null;
                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2, undefined, { numeric: true });
                else
                    result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                return -1 * result;
            });
            for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
                let res = this.sortedResponsiveOptions[i];
                innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.containerId} .p-galleria-thumbnail-item {
                            flex: 1 0 ${(100 / res.numVisible)}%
                        }
                    }
                `;
            }
        }
        this.thumbnailsStyle.innerHTML = innerHTML;
    }
    calculatePosition() {
        if (this.itemsContainer && this.sortedResponsiveOptions) {
            let windowWidth = window.innerWidth;
            let matchedResponsiveData = {
                numVisible: this._numVisible
            };
            for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
                let res = this.sortedResponsiveOptions[i];
                if (parseInt(res.breakpoint, 10) >= windowWidth) {
                    matchedResponsiveData = res;
                }
            }
            if (this.d_numVisible !== matchedResponsiveData.numVisible) {
                this.d_numVisible = matchedResponsiveData.numVisible;
                this.cd.markForCheck();
            }
        }
    }
    getTabIndex(index) {
        return this.isItemActive(index) ? 0 : null;
    }
    navForward(e) {
        this.stopTheSlideShow();
        let nextItemIndex = this._activeIndex + 1;
        if (nextItemIndex + this.totalShiftedItems > this.getMedianItemIndex() && ((-1 * this.totalShiftedItems) < this.getTotalPageNumber() - 1 || this.circular)) {
            this.step(-1);
        }
        let activeIndex = this.circular && (this.value.length - 1) === this._activeIndex ? 0 : nextItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    navBackward(e) {
        this.stopTheSlideShow();
        let prevItemIndex = this._activeIndex !== 0 ? this._activeIndex - 1 : 0;
        let diff = prevItemIndex + this.totalShiftedItems;
        if ((this.d_numVisible - diff - 1) > this.getMedianItemIndex() && ((-1 * this.totalShiftedItems) !== 0 || this.circular)) {
            this.step(1);
        }
        let activeIndex = this.circular && this._activeIndex === 0 ? this.value.length - 1 : prevItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    onItemClick(index) {
        this.stopTheSlideShow();
        let selectedItemIndex = index;
        if (selectedItemIndex !== this._activeIndex) {
            const diff = selectedItemIndex + this.totalShiftedItems;
            let dir = 0;
            if (selectedItemIndex < this._activeIndex) {
                dir = (this.d_numVisible - diff - 1) - this.getMedianItemIndex();
                if (dir > 0 && (-1 * this.totalShiftedItems) !== 0) {
                    this.step(dir);
                }
            }
            else {
                dir = this.getMedianItemIndex() - diff;
                if (dir < 0 && (-1 * this.totalShiftedItems) < this.getTotalPageNumber() - 1) {
                    this.step(dir);
                }
            }
            this.activeIndex = selectedItemIndex;
            this.onActiveIndexChange.emit(this.activeIndex);
        }
    }
    step(dir) {
        let totalShiftedItems = this.totalShiftedItems + dir;
        if (dir < 0 && (-1 * totalShiftedItems) + this.d_numVisible > (this.value.length - 1)) {
            totalShiftedItems = this.d_numVisible - this.value.length;
        }
        else if (dir > 0 && totalShiftedItems > 0) {
            totalShiftedItems = 0;
        }
        if (this.circular) {
            if (dir < 0 && this.value.length - 1 === this._activeIndex) {
                totalShiftedItems = 0;
            }
            else if (dir > 0 && this._activeIndex === 0) {
                totalShiftedItems = this.d_numVisible - this.value.length;
            }
        }
        if (this.itemsContainer) {
            DomHandler.removeClass(this.itemsContainer.nativeElement, 'p-items-hidden');
            this.itemsContainer.nativeElement.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }
        this.totalShiftedItems = totalShiftedItems;
    }
    stopTheSlideShow() {
        if (this.slideShowActive && this.stopSlideShow) {
            this.stopSlideShow.emit();
        }
    }
    changePageOnTouch(e, diff) {
        if (diff < 0) { // left
            this.navForward(e);
        }
        else { // right
            this.navBackward(e);
        }
    }
    getTotalPageNumber() {
        return this.value.length > this.d_numVisible ? (this.value.length - this.d_numVisible) + 1 : 0;
    }
    getMedianItemIndex() {
        let index = Math.floor(this.d_numVisible / 2);
        return (this.d_numVisible % 2) ? index : index - 1;
    }
    onTransitionEnd() {
        if (this.itemsContainer && this.itemsContainer.nativeElement) {
            DomHandler.addClass(this.itemsContainer.nativeElement, 'p-items-hidden');
            this.itemsContainer.nativeElement.style.transition = '';
        }
    }
    onTouchEnd(e) {
        let touchobj = e.changedTouches[0];
        if (this.isVertical) {
            this.changePageOnTouch(e, (touchobj.pageY - this.startPos.y));
        }
        else {
            this.changePageOnTouch(e, (touchobj.pageX - this.startPos.x));
        }
    }
    onTouchMove(e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    onTouchStart(e) {
        let touchobj = e.changedTouches[0];
        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    }
    isNavBackwardDisabled() {
        return (!this.circular && this._activeIndex === 0) || (this.value.length <= this.d_numVisible);
    }
    isNavForwardDisabled() {
        return (!this.circular && this._activeIndex === (this.value.length - 1)) || (this.value.length <= this.d_numVisible);
    }
    firstItemAciveIndex() {
        return this.totalShiftedItems * -1;
    }
    lastItemActiveIndex() {
        return this.firstItemAciveIndex() + this.d_numVisible - 1;
    }
    isItemActive(index) {
        return this.firstItemAciveIndex() <= index && this.lastItemActiveIndex() >= index;
    }
    bindDocumentListeners() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = () => {
                this.calculatePosition();
            };
            window.addEventListener('resize', this.documentResizeListener);
        }
    }
    unbindDocumentListeners() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    ngOnDestroy() {
        if (this.responsiveOptions) {
            this.unbindDocumentListeners();
        }
        if (this.thumbnailsStyle) {
            this.thumbnailsStyle.parentNode.removeChild(this.thumbnailsStyle);
        }
    }
}
GalleriaThumbnails.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: GalleriaThumbnails, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
GalleriaThumbnails.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: GalleriaThumbnails, selector: "p-galleriaThumbnails", inputs: { containerId: "containerId", value: "value", isVertical: "isVertical", slideShowActive: "slideShowActive", circular: "circular", responsiveOptions: "responsiveOptions", contentHeight: "contentHeight", showThumbnailNavigators: "showThumbnailNavigators", templates: "templates", numVisible: "numVisible", activeIndex: "activeIndex" }, outputs: { onActiveIndexChange: "onActiveIndexChange", stopSlideShow: "stopSlideShow" }, viewQueries: [{ propertyName: "itemsContainer", first: true, predicate: ["itemsContainer"], descendants: true }], ngImport: i0, template: `
        <div class="p-galleria-thumbnail-wrapper">
            <div class="p-galleria-thumbnail-container">
                <button *ngIf="showThumbnailNavigators" type="button" [ngClass]="{'p-galleria-thumbnail-prev p-link': true, 'p-disabled': this.isNavBackwardDisabled()}" (click)="navBackward($event)" [disabled]="isNavBackwardDisabled()" pRipple>
                    <span [ngClass]="{'p-galleria-thumbnail-prev-icon pi': true, 'pi-chevron-left': !this.isVertical, 'pi-chevron-up': this.isVertical}"></span>
                </button>
                <div class="p-galleria-thumbnail-items-container" [ngStyle]="{'height': isVertical ? contentHeight : ''}">
                    <div #itemsContainer class="p-galleria-thumbnail-items" (transitionend)="onTransitionEnd()"
                        (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" (touchend)="onTouchEnd($event)">
                        <div *ngFor="let item of value; let index = index;" [ngClass]="{'p-galleria-thumbnail-item': true, 'p-galleria-thumbnail-item-current': activeIndex === index, 'p-galleria-thumbnail-item-active': isItemActive(index),
                            'p-galleria-thumbnail-item-start': firstItemAciveIndex() === index, 'p-galleria-thumbnail-item-end': lastItemActiveIndex() === index }">
                            <div class="p-galleria-thumbnail-item-content" [attr.tabindex]="getTabIndex(index)" (click)="onItemClick(index)" (keydown.enter)="onItemClick(index)">
                                <p-galleriaItemSlot type="thumbnail" [item]="item" [templates]="templates"></p-galleriaItemSlot>
                            </div>
                        </div>
                    </div>
                </div>
                <button *ngIf="showThumbnailNavigators" type="button" [ngClass]="{'p-galleria-thumbnail-next p-link': true, 'p-disabled': this.isNavForwardDisabled()}" (click)="navForward($event)" [disabled]="isNavForwardDisabled()" pRipple>
                    <span [ngClass]="{'p-galleria-thumbnail-next-icon pi': true, 'pi-chevron-right': !this.isVertical, 'pi-chevron-down': this.isVertical}"></span>
                </button>
            </div>
        </div>
    `, isInline: true, components: [{ type: GalleriaItemSlot, selector: "p-galleriaItemSlot", inputs: ["templates", "index", "item", "type"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.Ripple, selector: "[pRipple]" }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: GalleriaThumbnails, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-galleriaThumbnails',
                    template: `
        <div class="p-galleria-thumbnail-wrapper">
            <div class="p-galleria-thumbnail-container">
                <button *ngIf="showThumbnailNavigators" type="button" [ngClass]="{'p-galleria-thumbnail-prev p-link': true, 'p-disabled': this.isNavBackwardDisabled()}" (click)="navBackward($event)" [disabled]="isNavBackwardDisabled()" pRipple>
                    <span [ngClass]="{'p-galleria-thumbnail-prev-icon pi': true, 'pi-chevron-left': !this.isVertical, 'pi-chevron-up': this.isVertical}"></span>
                </button>
                <div class="p-galleria-thumbnail-items-container" [ngStyle]="{'height': isVertical ? contentHeight : ''}">
                    <div #itemsContainer class="p-galleria-thumbnail-items" (transitionend)="onTransitionEnd()"
                        (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" (touchend)="onTouchEnd($event)">
                        <div *ngFor="let item of value; let index = index;" [ngClass]="{'p-galleria-thumbnail-item': true, 'p-galleria-thumbnail-item-current': activeIndex === index, 'p-galleria-thumbnail-item-active': isItemActive(index),
                            'p-galleria-thumbnail-item-start': firstItemAciveIndex() === index, 'p-galleria-thumbnail-item-end': lastItemActiveIndex() === index }">
                            <div class="p-galleria-thumbnail-item-content" [attr.tabindex]="getTabIndex(index)" (click)="onItemClick(index)" (keydown.enter)="onItemClick(index)">
                                <p-galleriaItemSlot type="thumbnail" [item]="item" [templates]="templates"></p-galleriaItemSlot>
                            </div>
                        </div>
                    </div>
                </div>
                <button *ngIf="showThumbnailNavigators" type="button" [ngClass]="{'p-galleria-thumbnail-next p-link': true, 'p-disabled': this.isNavForwardDisabled()}" (click)="navForward($event)" [disabled]="isNavForwardDisabled()" pRipple>
                    <span [ngClass]="{'p-galleria-thumbnail-next-icon pi': true, 'pi-chevron-right': !this.isVertical, 'pi-chevron-down': this.isVertical}"></span>
                </button>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { containerId: [{
                type: Input
            }], value: [{
                type: Input
            }], isVertical: [{
                type: Input
            }], slideShowActive: [{
                type: Input
            }], circular: [{
                type: Input
            }], responsiveOptions: [{
                type: Input
            }], contentHeight: [{
                type: Input
            }], showThumbnailNavigators: [{
                type: Input
            }], templates: [{
                type: Input
            }], onActiveIndexChange: [{
                type: Output
            }], stopSlideShow: [{
                type: Output
            }], itemsContainer: [{
                type: ViewChild,
                args: ['itemsContainer']
            }], numVisible: [{
                type: Input
            }], activeIndex: [{
                type: Input
            }] } });
export class GalleriaModule {
}
GalleriaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: GalleriaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GalleriaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: GalleriaModule, declarations: [Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails], imports: [CommonModule, SharedModule, RippleModule], exports: [CommonModule, Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails, SharedModule] });
GalleriaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: GalleriaModule, imports: [[CommonModule, SharedModule, RippleModule], CommonModule, SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: GalleriaModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, RippleModule],
                    exports: [CommonModule, Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails, SharedModule],
                    declarations: [Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvZ2FsbGVyaWEvZ2FsbGVyaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQXNCLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQWlGLGlCQUFpQixFQUFtQyxNQUFNLGVBQWUsQ0FBQztBQUN4UixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBbUI5QyxNQUFNLE9BQU8sUUFBUTtJQXFGakIsWUFBbUIsT0FBbUIsRUFBUyxFQUFxQjtRQUFqRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUEzRTNELGVBQVUsR0FBWSxLQUFLLENBQUM7UUFNNUIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUl2Qix1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFFcEMsNEJBQXVCLEdBQVksSUFBSSxDQUFDO1FBRXhDLDhCQUF5QixHQUFZLEtBQUssQ0FBQztRQUUzQywrQkFBMEIsR0FBWSxLQUFLLENBQUM7UUFFNUMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRTFCLHVCQUFrQixHQUFXLElBQUksQ0FBQztRQUVsQyxtQkFBYyxHQUFZLElBQUksQ0FBQztRQUUvQix1QkFBa0IsR0FBVyxRQUFRLENBQUM7UUFFdEMsb0NB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RUFBRSxrQkFBa0IsQ0FBQztpQkFDaEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLE9uRGVzdHJveSxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3Q2hpbGQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZiwgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudENoZWNrZWQsIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3RvclJlZiwgQWZ0ZXJWaWV3SW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSwgUHJpbWVUZW1wbGF0ZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnOyAgXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1nYWxsZXJpYScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAqbmdJZj1cImZ1bGxTY3JlZW47ZWxzZSB3aW5kb3dlZFwiPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cInZpc2libGVcIiAjbWFzayBbbmdDbGFzc109XCJ7J3AtZ2FsbGVyaWEtbWFzayBwLWNvbXBvbmVudC1vdmVybGF5Jzp0cnVlLCAncC1nYWxsZXJpYS12aXNpYmxlJzogdGhpcy52aXNpYmxlfVwiIFtjbGFzc109XCJtYXNrQ2xhc3NcIiBbbmdTdHlsZV09XCJ7J3pJbmRleCc6ekluZGV4fVwiPlxuICAgICAgICAgICAgICAgIDxwLWdhbGxlcmlhQ29udGVudCBbdmFsdWVdPVwidmFsdWVcIiBbYWN0aXZlSW5kZXhdPVwiYWN0aXZlSW5kZXhcIiAobWFza0hpZGUpPVwib25NYXNrSGlkZSgpXCIgKGFjdGl2ZUl0ZW1DaGFuZ2UpPVwib25BY3RpdmVJdGVtQ2hhbmdlKCRldmVudClcIiBbbmdTdHlsZV09XCJjb250YWluZXJTdHlsZVwiPjwvcC1nYWxsZXJpYUNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPG5nLXRlbXBsYXRlICN3aW5kb3dlZD5cbiAgICAgICAgICAgIDxwLWdhbGxlcmlhQ29udGVudCBbdmFsdWVdPVwidmFsdWVcIiBbYWN0aXZlSW5kZXhdPVwiYWN0aXZlSW5kZXhcIiAoYWN0aXZlSXRlbUNoYW5nZSk9XCJvbkFjdGl2ZUl0ZW1DaGFuZ2UoJGV2ZW50KVwiPjwvcC1nYWxsZXJpYUNvbnRlbnQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2dhbGxlcmlhLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcmlhIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgZ2V0IGFjdGl2ZUluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICB9O1xuXG4gICAgc2V0IGFjdGl2ZUluZGV4KGFjdGl2ZUluZGV4KSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXg7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZnVsbFNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnlbXTtcblxuICAgIEBJbnB1dCgpIG51bVZpc2libGU6IG51bWJlciA9IDM7XG5cbiAgICBASW5wdXQoKSByZXNwb25zaXZlT3B0aW9uczogYW55W107XG5cbiAgICBASW5wdXQoKSBzaG93SXRlbU5hdmlnYXRvcnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNob3dUaHVtYm5haWxOYXZpZ2F0b3JzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNob3dJdGVtTmF2aWdhdG9yc09uSG92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGNoYW5nZUl0ZW1PbkluZGljYXRvckhvdmVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBjaXJjdWxhcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgYXV0b1BsYXk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25JbnRlcnZhbDogbnVtYmVyID0gNDAwMDtcblxuICAgIEBJbnB1dCgpIHNob3dUaHVtYm5haWxzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHRodW1ibmFpbHNQb3NpdGlvbjogc3RyaW5nID0gXCJib3R0b21cIjtcblxuICAgIEBJbnB1dCgpIHZlcnRpY2FsVGh1bWJuYWlsVmlld1BvcnRIZWlnaHQ6IHN0cmluZyA9IFwiMzAwcHhcIjtcblxuICAgIEBJbnB1dCgpIHNob3dJbmRpY2F0b3JzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBzaG93SW5kaWNhdG9yc09uSXRlbTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgaW5kaWNhdG9yc1Bvc2l0aW9uOiBzdHJpbmcgPSBcImJvdHRvbVwiO1xuXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIG1hc2tDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgY29udGFpbmVyQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGNvbnRhaW5lclN0eWxlOiBhbnk7XG5cbiAgICBAVmlld0NoaWxkKCdtYXNrJywge3N0YXRpYzogZmFsc2V9KSBtYXNrOiBFbGVtZW50UmVmO1xuXG4gICAgQElucHV0KCkgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH07XG5cbiAgICBzZXQgdmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2aXNpYmxlO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBhY3RpdmVJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgdmlzaWJsZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG5cdEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuXG4gICAgX3Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIF9hY3RpdmVJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGhlYWRlckZhY2V0OiBhbnk7XG5cbiAgICBmb290ZXJGYWNldDogYW55O1xuXG4gICAgaW5kaWNhdG9yRmFjZXQ6IGFueTtcblxuICAgIGNhcHRpb25GYWNldDogYW55O1xuXG4gICAgekluZGV4OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyRmFjZXQgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyRmFjZXQgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2luZGljYXRvcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kaWNhdG9yRmFjZXQgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NhcHRpb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcHRpb25GYWNldCA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKHNpbXBsZUNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKHRoaXMuZnVsbFNjcmVlbiAmJiBzaW1wbGVDaGFuZ2VzLnZpc2libGUpIHtcbiAgICAgICAgICAgIGlmIChzaW1wbGVDaGFuZ2VzLnZpc2libGUuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuekluZGV4ID0gU3RyaW5nKHRoaXMuYmFzZVpJbmRleCArICsrRG9tSGFuZGxlci56aW5kZXgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICdwLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uTWFza0hpZGUoKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgfVxuXG4gICAgb25BY3RpdmVJdGVtQ2hhbmdlKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4ICE9PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleENoYW5nZS5lbWl0KGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5mdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICdwLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZ2FsbGVyaWFDb250ZW50JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFthdHRyLmlkXT1cImlkXCIgKm5nSWY9XCJ2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiAwXCIgW25nQ2xhc3NdPVwieydwLWdhbGxlcmlhIHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtZ2FsbGVyaWEtZnVsbHNjcmVlbic6IHRoaXMuZ2FsbGVyaWEuZnVsbFNjcmVlbiwgXG4gICAgICAgICAgICAncC1nYWxsZXJpYS1pbmRpY2F0b3Itb25pdGVtJzogdGhpcy5nYWxsZXJpYS5zaG93SW5kaWNhdG9yc09uSXRlbSwgJ3AtZ2FsbGVyaWEtaXRlbS1uYXYtb25ob3Zlcic6IHRoaXMuZ2FsbGVyaWEuc2hvd0l0ZW1OYXZpZ2F0b3JzT25Ib3ZlciAmJiAhdGhpcy5nYWxsZXJpYS5mdWxsU2NyZWVufVwiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCIhZ2FsbGVyaWEuZnVsbFNjcmVlbiA/IGdhbGxlcmlhLmNvbnRhaW5lclN0eWxlIDoge31cIiBbY2xhc3NdPVwiZ2FsbGVyaWFDbGFzcygpXCI+XG4gICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiZ2FsbGVyaWEuZnVsbFNjcmVlblwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInAtZ2FsbGVyaWEtY2xvc2UgcC1saW5rXCIgKGNsaWNrKT1cIm1hc2tIaWRlLmVtaXQoKVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWdhbGxlcmlhLWNsb3NlLWljb24gcGkgcGktdGltZXNcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJnYWxsZXJpYS50ZW1wbGF0ZXMgJiYgZ2FsbGVyaWEuaGVhZGVyRmFjZXRcIiBjbGFzcz1cInAtZ2FsbGVyaWEtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPHAtZ2FsbGVyaWFJdGVtU2xvdCB0eXBlPVwiaGVhZGVyXCIgW3RlbXBsYXRlc109XCJnYWxsZXJpYS50ZW1wbGF0ZXNcIj48L3AtZ2FsbGVyaWFJdGVtU2xvdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZ2FsbGVyaWEtY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxwLWdhbGxlcmlhSXRlbSBbdmFsdWVdPVwidmFsdWVcIiBbYWN0aXZlSW5kZXhdPVwiYWN0aXZlSW5kZXhcIiBbY2lyY3VsYXJdPVwiZ2FsbGVyaWEuY2lyY3VsYXJcIiBbdGVtcGxhdGVzXT1cImdhbGxlcmlhLnRlbXBsYXRlc1wiIChvbkFjdGl2ZUluZGV4Q2hhbmdlKT1cIm9uQWN0aXZlSW5kZXhDaGFuZ2UoJGV2ZW50KVwiIFxuICAgICAgICAgICAgICAgICAgICBbc2hvd0luZGljYXRvcnNdPVwiZ2FsbGVyaWEuc2hvd0luZGljYXRvcnNcIiBbY2hhbmdlSXRlbU9uSW5kaWNhdG9ySG92ZXJdPVwiZ2FsbGVyaWEuY2hhbmdlSXRlbU9uSW5kaWNhdG9ySG92ZXJcIiBbaW5kaWNhdG9yRmFjZXRdPVwiZ2FsbGVyaWEuaW5kaWNhdG9yRmFjZXRcIlxuICAgICAgICAgICAgICAgICAgICBbY2FwdGlvbkZhY2V0XT1cImdhbGxlcmlhLmNhcHRpb25GYWNldFwiIFtzaG93SXRlbU5hdmlnYXRvcnNdPVwiZ2FsbGVyaWEuc2hvd0l0ZW1OYXZpZ2F0b3JzXCIgW2F1dG9QbGF5XT1cImdhbGxlcmlhLmF1dG9QbGF5XCIgW3NsaWRlU2hvd0FjdGl2ZV09XCJzbGlkZVNob3dBY3RpdmVcIlxuICAgICAgICAgICAgICAgICAgICAoc3RhcnRTbGlkZVNob3cpPVwic3RhcnRTbGlkZVNob3coKVwiIChzdG9wU2xpZGVTaG93KT1cInN0b3BTbGlkZVNob3coKVwiPjwvcC1nYWxsZXJpYUl0ZW0+XG5cbiAgICAgICAgICAgICAgICA8cC1nYWxsZXJpYVRodW1ibmFpbHMgKm5nSWY9XCJnYWxsZXJpYS5zaG93VGh1bWJuYWlsc1wiIFtjb250YWluZXJJZF09XCJpZFwiIFt2YWx1ZV09XCJ2YWx1ZVwiIChvbkFjdGl2ZUluZGV4Q2hhbmdlKT1cIm9uQWN0aXZlSW5kZXhDaGFuZ2UoJGV2ZW50KVwiIFthY3RpdmVJbmRleF09XCJhY3RpdmVJbmRleFwiIFt0ZW1wbGF0ZXNdPVwiZ2FsbGVyaWEudGVtcGxhdGVzXCJcbiAgICAgICAgICAgICAgICAgICAgW251bVZpc2libGVdPVwiZ2FsbGVyaWEubnVtVmlzaWJsZVwiIFtyZXNwb25zaXZlT3B0aW9uc109XCJnYWxsZXJpYS5yZXNwb25zaXZlT3B0aW9uc1wiIFtjaXJjdWxhcl09XCJnYWxsZXJpYS5jaXJjdWxhclwiXG4gICAgICAgICAgICAgICAgICAgIFtpc1ZlcnRpY2FsXT1cImlzVmVydGljYWwoKVwiIFtjb250ZW50SGVpZ2h0XT1cImdhbGxlcmlhLnZlcnRpY2FsVGh1bWJuYWlsVmlld1BvcnRIZWlnaHRcIiBbc2hvd1RodW1ibmFpbE5hdmlnYXRvcnNdPVwiZ2FsbGVyaWEuc2hvd1RodW1ibmFpbE5hdmlnYXRvcnNcIlxuICAgICAgICAgICAgICAgICAgICBbc2xpZGVTaG93QWN0aXZlXT1cInNsaWRlU2hvd0FjdGl2ZVwiIChzdG9wU2xpZGVTaG93KT1cInN0b3BTbGlkZVNob3coKVwiPjwvcC1nYWxsZXJpYVRodW1ibmFpbHM+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJnYWxsZXJpYS50ZW1wbGF0ZXMgJiYgZ2FsbGVyaWEuZm9vdGVyRmFjZXRcIiBjbGFzcz1cInAtZ2FsbGVyaWEtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPHAtZ2FsbGVyaWFJdGVtU2xvdCB0eXBlPVwiZm9vdGVyXCIgW3RlbXBsYXRlc109XCJnYWxsZXJpYS50ZW1wbGF0ZXNcIj48L3AtZ2FsbGVyaWFJdGVtU2xvdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyaWFDb250ZW50IHtcblxuICAgIEBJbnB1dCgpIGdldCBhY3RpdmVJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlSW5kZXg7XG4gICAgfTtcblxuICAgIHNldCBhY3RpdmVJbmRleChhY3RpdmVJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXg7XG4gICAgfVxuXG4gICAgQElucHV0KCkgdmFsdWU6IGFueVtdID0gW107XG5cbiAgICBAT3V0cHV0KCkgbWFza0hpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIGFjdGl2ZUl0ZW1DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgaWQ6IHN0cmluZyA9IHRoaXMuZ2FsbGVyaWEuaWQgfHwgVW5pcXVlQ29tcG9uZW50SWQoKTtcblxuICAgIHNsaWRlU2hvd0FjdGljdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIF9hY3RpdmVJbmRleDogbnVtYmVyID0gMDtcblxuICAgIHNsaWRlU2hvd0FjdGl2ZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBpbnRlcnZhbDogYW55O1xuXG4gICAgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbGxlcmlhOiBHYWxsZXJpYSwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XG5cbiAgICBnYWxsZXJpYUNsYXNzKCkge1xuICAgICAgICBjb25zdCB0aHVtYm5haWxzUG9zQ2xhc3MgPSB0aGlzLmdhbGxlcmlhLnNob3dUaHVtYm5haWxzICYmIHRoaXMuZ2V0UG9zaXRpb25DbGFzcygncC1nYWxsZXJpYS10aHVtYm5haWxzJywgdGhpcy5nYWxsZXJpYS50aHVtYm5haWxzUG9zaXRpb24pO1xuICAgICAgICBjb25zdCBpbmRpY2F0b3JQb3NDbGFzcyA9IHRoaXMuZ2FsbGVyaWEuc2hvd0luZGljYXRvcnMgJiYgdGhpcy5nZXRQb3NpdGlvbkNsYXNzKCdwLWdhbGxlcmlhLWluZGljYXRvcnMnLCB0aGlzLmdhbGxlcmlhLmluZGljYXRvcnNQb3NpdGlvbik7XG5cbiAgICAgICAgcmV0dXJuICh0aGlzLmdhbGxlcmlhLmNvbnRhaW5lckNsYXNzID8gdGhpcy5nYWxsZXJpYS5jb250YWluZXJDbGFzcyArIFwiIFwiIDogJycpICsgKHRodW1ibmFpbHNQb3NDbGFzcyA/IHRodW1ibmFpbHNQb3NDbGFzcyArIFwiIFwiIDogJycpICsgKGluZGljYXRvclBvc0NsYXNzID8gaW5kaWNhdG9yUG9zQ2xhc3MgKyBcIiBcIiA6ICcnKTtcbiAgICB9XG5cbiAgICBzdGFydFNsaWRlU2hvdygpIHtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBhY3RpdmVJbmRleCA9ICh0aGlzLmdhbGxlcmlhLmNpcmN1bGFyICYmICh0aGlzLnZhbHVlLmxlbmd0aCAtIDEpID09PSB0aGlzLmFjdGl2ZUluZGV4KSA/IDAgOiAodGhpcy5hY3RpdmVJbmRleCArIDEpO1xuICAgICAgICAgICAgdGhpcy5vbkFjdGl2ZUluZGV4Q2hhbmdlKGFjdGl2ZUluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleDtcbiAgICAgICAgfSwgdGhpcy5nYWxsZXJpYS50cmFuc2l0aW9uSW50ZXJ2YWwpO1xuXG4gICAgICAgIHRoaXMuc2xpZGVTaG93QWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdG9wU2xpZGVTaG93KCkge1xuICAgICAgICBpZiAodGhpcy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2xpZGVTaG93QWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0UG9zaXRpb25DbGFzcyhwcmVDbGFzc05hbWUsIHBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IFsndG9wJywgJ2xlZnQnLCAnYm90dG9tJywgJ3JpZ2h0J107XG4gICAgICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9ucy5maW5kKGl0ZW0gPT4gaXRlbSA9PT0gcG9zaXRpb24pO1xuXG4gICAgICAgIHJldHVybiBwb3MgPyBgJHtwcmVDbGFzc05hbWV9LSR7cG9zfWAgOiAnJztcbiAgICB9XG5cbiAgICBpc1ZlcnRpY2FsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYWxsZXJpYS50aHVtYm5haWxzUG9zaXRpb24gPT09ICdsZWZ0JyB8fCB0aGlzLmdhbGxlcmlhLnRodW1ibmFpbHNQb3NpdGlvbiA9PT0gJ3JpZ2h0JztcbiAgICB9XG5cbiAgICBvbkFjdGl2ZUluZGV4Q2hhbmdlKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4ICE9PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtQ2hhbmdlLmVtaXQodGhpcy5hY3RpdmVJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1nYWxsZXJpYUl0ZW1TbG90JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29udGVudFRlbXBsYXRlXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlOyBjb250ZXh0OiBjb250ZXh0XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIGAsXG4gICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBHYWxsZXJpYUl0ZW1TbG90IHtcbiAgICBASW5wdXQoKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGdldCBpdGVtKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtO1xuICAgIH07XG5cbiAgICBzZXQgaXRlbShpdGVtOmFueSkge1xuICAgICAgICB0aGlzLl9pdGVtID0gaXRlbTtcbiAgICAgICAgaWYgKHRoaXMudGVtcGxhdGVzKSB7XG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0VHlwZSgpID09PSB0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjYXB0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RodW1ibmFpbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0geyRpbXBsaWNpdDogdGhpcy5pdGVtfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgY29udGV4dDphbnk7XG5cbiAgICBfaXRlbTphbnk7XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLmdldFR5cGUoKSA9PT0gdGhpcy50eXBlKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2FwdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RodW1ibmFpbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQgPSB7JGltcGxpY2l0OiB0aGlzLml0ZW19O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaW5kaWNhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IHskaW1wbGljaXQ6IHRoaXMuaW5kZXh9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWdhbGxlcmlhSXRlbScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInAtZ2FsbGVyaWEtaXRlbS13cmFwcGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1nYWxsZXJpYS1pdGVtLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzaG93SXRlbU5hdmlnYXRvcnNcIiB0eXBlPVwiYnV0dG9uXCIgW25nQ2xhc3NdPVwieydwLWdhbGxlcmlhLWl0ZW0tcHJldiBwLWdhbGxlcmlhLWl0ZW0tbmF2IHAtbGluayc6IHRydWUsICdwLWRpc2FibGVkJzogdGhpcy5pc05hdkJhY2t3YXJkRGlzYWJsZWQoKX1cIiAoY2xpY2spPVwibmF2QmFja3dhcmQoJGV2ZW50KVwiIFtkaXNhYmxlZF09XCJpc05hdkJhY2t3YXJkRGlzYWJsZWQoKVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1nYWxsZXJpYS1pdGVtLXByZXYtaWNvbiBwaSBwaS1jaGV2cm9uLWxlZnRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPHAtZ2FsbGVyaWFJdGVtU2xvdCB0eXBlPVwiaXRlbVwiIFtpdGVtXT1cImFjdGl2ZUl0ZW1cIiBbdGVtcGxhdGVzXT1cInRlbXBsYXRlc1wiIGNsYXNzPVwicC1nYWxsZXJpYS1pdGVtXCI+PC9wLWdhbGxlcmlhSXRlbVNsb3Q+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNob3dJdGVtTmF2aWdhdG9yc1wiIHR5cGU9XCJidXR0b25cIiBbbmdDbGFzc109XCJ7J3AtZ2FsbGVyaWEtaXRlbS1uZXh0IHAtZ2FsbGVyaWEtaXRlbS1uYXYgcC1saW5rJzogdHJ1ZSwncC1kaXNhYmxlZCc6IHRoaXMuaXNOYXZGb3J3YXJkRGlzYWJsZWQoKX1cIiAoY2xpY2spPVwibmF2Rm9yd2FyZCgkZXZlbnQpXCIgIFtkaXNhYmxlZF09XCJpc05hdkZvcndhcmREaXNhYmxlZCgpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWdhbGxlcmlhLWl0ZW0tbmV4dC1pY29uIHBpIHBpLWNoZXZyb24tcmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZ2FsbGVyaWEtY2FwdGlvblwiICpuZ0lmPVwiY2FwdGlvbkZhY2V0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxwLWdhbGxlcmlhSXRlbVNsb3QgdHlwZT1cImNhcHRpb25cIiBbaXRlbV09XCJhY3RpdmVJdGVtXCIgW3RlbXBsYXRlc109XCJ0ZW1wbGF0ZXNcIj48L3AtZ2FsbGVyaWFJdGVtU2xvdD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHVsICpuZ0lmPVwic2hvd0luZGljYXRvcnNcIiBjbGFzcz1cInAtZ2FsbGVyaWEtaW5kaWNhdG9ycyBwLXJlc2V0XCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIHZhbHVlOyBsZXQgaW5kZXggPSBpbmRleDtcIiB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25JbmRpY2F0b3JDbGljayhpbmRleClcIiAobW91c2VlbnRlcik9XCJvbkluZGljYXRvck1vdXNlRW50ZXIoaW5kZXgpXCIgKGtleWRvd24uZW50ZXIpPVwib25JbmRpY2F0b3JLZXlEb3duKGluZGV4KVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncC1nYWxsZXJpYS1pbmRpY2F0b3InOiB0cnVlLCdwLWhpZ2hsaWdodCc6IGlzSW5kaWNhdG9ySXRlbUFjdGl2ZShpbmRleCl9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHRhYkluZGV4PVwiLTFcIiBjbGFzcz1cInAtbGlua1wiICpuZ0lmPVwiIWluZGljYXRvckZhY2V0XCI+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8cC1nYWxsZXJpYUl0ZW1TbG90IHR5cGU9XCJpbmRpY2F0b3JcIiBbaW5kZXhdPVwiaW5kZXhcIiBbdGVtcGxhdGVzXT1cInRlbXBsYXRlc1wiPjwvcC1nYWxsZXJpYUl0ZW1TbG90PlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyaWFJdGVtIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIGNpcmN1bGFyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55W107XG5cbiAgICBASW5wdXQoKSBzaG93SXRlbU5hdmlnYXRvcnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNob3dJbmRpY2F0b3JzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNsaWRlU2hvd0FjdGl2ZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBjaGFuZ2VJdGVtT25JbmRpY2F0b3JIb3ZlcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBhdXRvUGxheTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIEBJbnB1dCgpIGluZGljYXRvckZhY2V0OiBhbnk7XG5cbiAgICBASW5wdXQoKSBjYXB0aW9uRmFjZXQ6IGFueTtcblxuICAgIEBPdXRwdXQoKSBzdGFydFNsaWRlU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgc3RvcFNsaWRlU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uQWN0aXZlSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KCkgZ2V0IGFjdGl2ZUluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICB9O1xuXG4gICAgc2V0IGFjdGl2ZUluZGV4KGFjdGl2ZUluZGV4KSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXg7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IHRoaXMudmFsdWVbdGhpcy5fYWN0aXZlSW5kZXhdO1xuICAgIH1cblxuICAgIF9hY3RpdmVJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGFjdGl2ZUl0ZW06IGFueTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvUGxheSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydFNsaWRlU2hvdy5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICBsZXQgbmV4dEl0ZW1JbmRleCA9IHRoaXMuYWN0aXZlSW5kZXggKyAxO1xuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSB0aGlzLmNpcmN1bGFyICYmIHRoaXMudmFsdWUubGVuZ3RoIC0gMSA9PT0gdGhpcy5hY3RpdmVJbmRleFxuICAgICAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICAgICAgOiBuZXh0SXRlbUluZGV4O1xuICAgICAgICB0aGlzLm9uQWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChhY3RpdmVJbmRleCk7XG4gICAgfVxuXG4gICAgcHJldigpIHtcbiAgICAgICAgbGV0IHByZXZJdGVtSW5kZXggPSB0aGlzLmFjdGl2ZUluZGV4ICE9PSAwID8gdGhpcy5hY3RpdmVJbmRleCAtIDEgOiAwO1xuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSB0aGlzLmNpcmN1bGFyICYmIHRoaXMuYWN0aXZlSW5kZXggPT09IDBcbiAgICAgICAgICAgICAgICA/IHRoaXMudmFsdWUubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgIDogcHJldkl0ZW1JbmRleFxuICAgICAgICB0aGlzLm9uQWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChhY3RpdmVJbmRleCk7XG4gICAgfVxuXG4gICAgc3RvcFRoZVNsaWRlU2hvdygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVTaG93QWN0aXZlICYmIHRoaXMuc3RvcFNsaWRlU2hvdykge1xuICAgICAgICAgICAgdGhpcy5zdG9wU2xpZGVTaG93LmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdkZvcndhcmQoZSkge1xuICAgICAgICB0aGlzLnN0b3BUaGVTbGlkZVNob3coKTtcbiAgICAgICAgdGhpcy5uZXh0KCk7XG5cbiAgICAgICAgaWYgKGUgJiYgZS5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuYXZCYWNrd2FyZChlKSB7XG4gICAgICAgIHRoaXMuc3RvcFRoZVNsaWRlU2hvdygpO1xuICAgICAgICB0aGlzLnByZXYoKTtcblxuICAgICAgICBpZiAoZSAmJiBlLmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5kaWNhdG9yQ2xpY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zdG9wVGhlU2xpZGVTaG93KCk7XG4gICAgICAgIHRoaXMub25BY3RpdmVJbmRleENoYW5nZS5lbWl0KGluZGV4KTtcbiAgICB9XG5cbiAgICBvbkluZGljYXRvck1vdXNlRW50ZXIoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hhbmdlSXRlbU9uSW5kaWNhdG9ySG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcFRoZVNsaWRlU2hvdygpO1xuICAgICAgICAgICAgdGhpcy5vbkFjdGl2ZUluZGV4Q2hhbmdlLmVtaXQoaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbmRpY2F0b3JLZXlEb3duKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc3RvcFRoZVNsaWRlU2hvdygpO1xuICAgICAgICB0aGlzLm9uQWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChpbmRleCk7XG4gICAgfVxuXG4gICAgaXNOYXZGb3J3YXJkRGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5jaXJjdWxhciAmJiB0aGlzLmFjdGl2ZUluZGV4ID09PSAodGhpcy52YWx1ZS5sZW5ndGggLSAxKTtcbiAgICB9XG5cbiAgICBpc05hdkJhY2t3YXJkRGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5jaXJjdWxhciAmJiB0aGlzLmFjdGl2ZUluZGV4ID09PSAwO1xuICAgIH1cblxuICAgIGlzSW5kaWNhdG9ySXRlbUFjdGl2ZShpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVJbmRleCA9PT0gaW5kZXg7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZ2FsbGVyaWFUaHVtYm5haWxzJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicC1nYWxsZXJpYS10aHVtYm5haWwtd3JhcHBlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZ2FsbGVyaWEtdGh1bWJuYWlsLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzaG93VGh1bWJuYWlsTmF2aWdhdG9yc1wiIHR5cGU9XCJidXR0b25cIiBbbmdDbGFzc109XCJ7J3AtZ2FsbGVyaWEtdGh1bWJuYWlsLXByZXYgcC1saW5rJzogdHJ1ZSwgJ3AtZGlzYWJsZWQnOiB0aGlzLmlzTmF2QmFja3dhcmREaXNhYmxlZCgpfVwiIChjbGljayk9XCJuYXZCYWNrd2FyZCgkZXZlbnQpXCIgW2Rpc2FibGVkXT1cImlzTmF2QmFja3dhcmREaXNhYmxlZCgpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gW25nQ2xhc3NdPVwieydwLWdhbGxlcmlhLXRodW1ibmFpbC1wcmV2LWljb24gcGknOiB0cnVlLCAncGktY2hldnJvbi1sZWZ0JzogIXRoaXMuaXNWZXJ0aWNhbCwgJ3BpLWNoZXZyb24tdXAnOiB0aGlzLmlzVmVydGljYWx9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWdhbGxlcmlhLXRodW1ibmFpbC1pdGVtcy1jb250YWluZXJcIiBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IGlzVmVydGljYWwgPyBjb250ZW50SGVpZ2h0IDogJyd9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgI2l0ZW1zQ29udGFpbmVyIGNsYXNzPVwicC1nYWxsZXJpYS10aHVtYm5haWwtaXRlbXNcIiAodHJhbnNpdGlvbmVuZCk9XCJvblRyYW5zaXRpb25FbmQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAodG91Y2hzdGFydCk9XCJvblRvdWNoU3RhcnQoJGV2ZW50KVwiICh0b3VjaG1vdmUpPVwib25Ub3VjaE1vdmUoJGV2ZW50KVwiICh0b3VjaGVuZCk9XCJvblRvdWNoRW5kKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgdmFsdWU7IGxldCBpbmRleCA9IGluZGV4O1wiIFtuZ0NsYXNzXT1cInsncC1nYWxsZXJpYS10aHVtYm5haWwtaXRlbSc6IHRydWUsICdwLWdhbGxlcmlhLXRodW1ibmFpbC1pdGVtLWN1cnJlbnQnOiBhY3RpdmVJbmRleCA9PT0gaW5kZXgsICdwLWdhbGxlcmlhLXRodW1ibmFpbC1pdGVtLWFjdGl2ZSc6IGlzSXRlbUFjdGl2ZShpbmRleCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3AtZ2FsbGVyaWEtdGh1bWJuYWlsLWl0ZW0tc3RhcnQnOiBmaXJzdEl0ZW1BY2l2ZUluZGV4KCkgPT09IGluZGV4LCAncC1nYWxsZXJpYS10aHVtYm5haWwtaXRlbS1lbmQnOiBsYXN0SXRlbUFjdGl2ZUluZGV4KCkgPT09IGluZGV4IH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1nYWxsZXJpYS10aHVtYm5haWwtaXRlbS1jb250ZW50XCIgW2F0dHIudGFiaW5kZXhdPVwiZ2V0VGFiSW5kZXgoaW5kZXgpXCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKGluZGV4KVwiIChrZXlkb3duLmVudGVyKT1cIm9uSXRlbUNsaWNrKGluZGV4KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cC1nYWxsZXJpYUl0ZW1TbG90IHR5cGU9XCJ0aHVtYm5haWxcIiBbaXRlbV09XCJpdGVtXCIgW3RlbXBsYXRlc109XCJ0ZW1wbGF0ZXNcIj48L3AtZ2FsbGVyaWFJdGVtU2xvdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic2hvd1RodW1ibmFpbE5hdmlnYXRvcnNcIiB0eXBlPVwiYnV0dG9uXCIgW25nQ2xhc3NdPVwieydwLWdhbGxlcmlhLXRodW1ibmFpbC1uZXh0IHAtbGluayc6IHRydWUsICdwLWRpc2FibGVkJzogdGhpcy5pc05hdkZvcndhcmREaXNhYmxlZCgpfVwiIChjbGljayk9XCJuYXZGb3J3YXJkKCRldmVudClcIiBbZGlzYWJsZWRdPVwiaXNOYXZGb3J3YXJkRGlzYWJsZWQoKVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cInsncC1nYWxsZXJpYS10aHVtYm5haWwtbmV4dC1pY29uIHBpJzogdHJ1ZSwgJ3BpLWNoZXZyb24tcmlnaHQnOiAhdGhpcy5pc1ZlcnRpY2FsLCAncGktY2hldnJvbi1kb3duJzogdGhpcy5pc1ZlcnRpY2FsfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyaWFUaHVtYm5haWxzIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgY29udGFpbmVySWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnlbXTtcblxuICAgIEBJbnB1dCgpIGlzVmVydGljYWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNsaWRlU2hvd0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgY2lyY3VsYXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHJlc3BvbnNpdmVPcHRpb25zOiBhbnlbXTtcblxuICAgIEBJbnB1dCgpIGNvbnRlbnRIZWlnaHQ6IHN0cmluZyA9IFwiMzAwcHhcIjtcblxuICAgIEBJbnB1dCgpIHNob3dUaHVtYm5haWxOYXZpZ2F0b3JzID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XG5cbiAgICBAT3V0cHV0KCkgb25BY3RpdmVJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgc3RvcFNsaWRlU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdpdGVtc0NvbnRhaW5lcicpIGl0ZW1zQ29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gICAgQElucHV0KCkgZ2V0IG51bVZpc2libGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX251bVZpc2libGU7XG4gICAgfTtcblxuICAgIHNldCBudW1WaXNpYmxlKG51bVZpc2libGUpIHtcbiAgICAgICAgdGhpcy5fbnVtVmlzaWJsZSA9IG51bVZpc2libGU7XG4gICAgICAgIHRoaXMuX29sZE51bVZpc2libGUgPSB0aGlzLmRfbnVtVmlzaWJsZTtcbiAgICAgICAgdGhpcy5kX251bVZpc2libGUgPSBudW1WaXNpYmxlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBhY3RpdmVJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlSW5kZXg7XG4gICAgfTtcblxuICAgIHNldCBhY3RpdmVJbmRleChhY3RpdmVJbmRleCkge1xuICAgICAgICB0aGlzLl9vbGRhY3RpdmVJbmRleCA9IHRoaXMuX2FjdGl2ZUluZGV4O1xuICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4O1xuICAgIH1cbiAgICBcbiAgICBpbmRleDogbnVtYmVyO1xuXG4gICAgc3RhcnRQb3MgPSBudWxsO1xuICAgIFxuICAgIHRodW1ibmFpbHNTdHlsZSA9IG51bGw7XG5cbiAgICBzb3J0ZWRSZXNwb25zaXZlT3B0aW9ucyA9IG51bGw7XG5cbiAgICB0b3RhbFNoaWZ0ZWRJdGVtczogbnVtYmVyID0gMDtcblxuICAgIHBhZ2U6IG51bWJlciA9IDA7XG5cbiAgICBkb2N1bWVudFJlc2l6ZUxpc3RlbmVyOiBhbnk7XG5cbiAgICBfbnVtVmlzaWJsZTpudW1iZXIgPSAwO1xuXG4gICAgZF9udW1WaXNpYmxlOiBudW1iZXIgPSAwO1xuXG4gICAgX29sZE51bVZpc2libGU6IG51bWJlciA9IDA7XG5cbiAgICBfYWN0aXZlSW5kZXg6IG51bWJlciA9IDA7XG4gICAgXG4gICAgX29sZGFjdGl2ZUluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlU3R5bGUoKTtcblxuXHRcdGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XG5cdFx0XHR0aGlzLmJpbmREb2N1bWVudExpc3RlbmVycygpO1xuXHRcdH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgICAgIGxldCB0b3RhbFNoaWZ0ZWRJdGVtcyA9IHRoaXMudG90YWxTaGlmdGVkSXRlbXM7XG5cbiAgICAgICAgaWYgKCh0aGlzLl9vbGROdW1WaXNpYmxlICE9PSB0aGlzLmRfbnVtVmlzaWJsZSB8fCB0aGlzLl9vbGRhY3RpdmVJbmRleCAhPT0gdGhpcy5fYWN0aXZlSW5kZXgpICYmIHRoaXMuaXRlbXNDb250YWluZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVJbmRleCA8PSB0aGlzLmdldE1lZGlhbkl0ZW1JbmRleCgpKSB7XG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy52YWx1ZS5sZW5ndGggLSB0aGlzLmRfbnVtVmlzaWJsZSArIHRoaXMuZ2V0TWVkaWFuSXRlbUluZGV4KCkgPCB0aGlzLl9hY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zID0gdGhpcy5kX251bVZpc2libGUgLSB0aGlzLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWUubGVuZ3RoIC0gdGhpcy5kX251bVZpc2libGUgPCB0aGlzLl9hY3RpdmVJbmRleCAmJiB0aGlzLmRfbnVtVmlzaWJsZSAlIDIgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0b3RhbFNoaWZ0ZWRJdGVtcyA9ICh0aGlzLl9hY3RpdmVJbmRleCAqIC0xKSArIHRoaXMuZ2V0TWVkaWFuSXRlbUluZGV4KCkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSAodGhpcy5fYWN0aXZlSW5kZXggKiAtMSkgKyB0aGlzLmdldE1lZGlhbkl0ZW1JbmRleCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodG90YWxTaGlmdGVkSXRlbXMgIT09IHRoaXMudG90YWxTaGlmdGVkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdG90YWxTaGlmdGVkSXRlbXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLml0ZW1zQ29udGFpbmVyICYmIHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSB0aGlzLmlzVmVydGljYWwgPyBgdHJhbnNsYXRlM2QoMCwgJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuZF9udW1WaXNpYmxlKX0lLCAwKWAgOiBgdHJhbnNsYXRlM2QoJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuZF9udW1WaXNpYmxlKX0lLCAwLCAwKWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vbGRhY3RpdmVJbmRleCAhPT0gdGhpcy5fYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudCwgJ3AtaXRlbXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSAndHJhbnNmb3JtIDUwMG1zIGVhc2UgMHMnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9vbGRhY3RpdmVJbmRleCA9IHRoaXMuX2FjdGl2ZUluZGV4O1xuICAgICAgICAgICAgdGhpcy5fb2xkTnVtVmlzaWJsZSA9IHRoaXMuZF9udW1WaXNpYmxlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuXHRcdHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICBjcmVhdGVTdHlsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRodW1ibmFpbHNTdHlsZSkge1xuICAgICAgICAgICAgdGhpcy50aHVtYm5haWxzU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgdGhpcy50aHVtYm5haWxzU3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMudGh1bWJuYWlsc1N0eWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAjJHt0aGlzLmNvbnRhaW5lcklkfSAucC1nYWxsZXJpYS10aHVtYm5haWwtaXRlbSB7XG4gICAgICAgICAgICAgICAgZmxleDogMSAwICR7ICgxMDAvIHRoaXMuZF9udW1WaXNpYmxlKSB9JVxuICAgICAgICAgICAgfVxuICAgICAgICBgO1xuXG4gICAgICAgIGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnRlZFJlc3BvbnNpdmVPcHRpb25zID0gWy4uLnRoaXMucmVzcG9uc2l2ZU9wdGlvbnNdO1xuICAgICAgICAgICAgdGhpcy5zb3J0ZWRSZXNwb25zaXZlT3B0aW9ucy5zb3J0KChkYXRhMSwgZGF0YTIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZTEgPSBkYXRhMS5icmVha3BvaW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlMiA9IGRhdGEyLmJyZWFrcG9pbnQ7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IC0xO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlMSAhPSBudWxsICYmIHZhbHVlMiA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZTEgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZTIgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB2YWx1ZTEubG9jYWxlQ29tcGFyZSh2YWx1ZTIsIHVuZGVmaW5lZCwgeyBudW1lcmljOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMSA8IHZhbHVlMikgPyAtMSA6ICh2YWx1ZTEgPiB2YWx1ZTIpID8gMSA6IDA7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gLTEgKiByZXN1bHQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNvcnRlZFJlc3BvbnNpdmVPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IHRoaXMuc29ydGVkUmVzcG9uc2l2ZU9wdGlvbnNbaV07XG5cbiAgICAgICAgICAgICAgICBpbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke3Jlcy5icmVha3BvaW50fSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIyR7dGhpcy5jb250YWluZXJJZH0gLnAtZ2FsbGVyaWEtdGh1bWJuYWlsLWl0ZW0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IDEgMCAkeyAoMTAwLyByZXMubnVtVmlzaWJsZSkgfSVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGh1bWJuYWlsc1N0eWxlLmlubmVySFRNTCA9IGlubmVySFRNTDtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbXNDb250YWluZXIgJiYgdGhpcy5zb3J0ZWRSZXNwb25zaXZlT3B0aW9ucykge1xuICAgICAgICAgICAgbGV0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICBsZXQgbWF0Y2hlZFJlc3BvbnNpdmVEYXRhID0ge1xuICAgICAgICAgICAgICAgIG51bVZpc2libGU6IHRoaXMuX251bVZpc2libGVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zb3J0ZWRSZXNwb25zaXZlT3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLnNvcnRlZFJlc3BvbnNpdmVPcHRpb25zW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHJlcy5icmVha3BvaW50LCAxMCkgPj0gd2luZG93V2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZFJlc3BvbnNpdmVEYXRhID0gcmVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZF9udW1WaXNpYmxlICE9PSBtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZF9udW1WaXNpYmxlID0gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVZpc2libGU7XG4gICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFRhYkluZGV4KGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzSXRlbUFjdGl2ZShpbmRleCkgPyAwIDogbnVsbDtcbiAgICB9XG5cbiAgICBuYXZGb3J3YXJkKGUpIHtcbiAgICAgICAgdGhpcy5zdG9wVGhlU2xpZGVTaG93KCk7XG5cbiAgICAgICAgbGV0IG5leHRJdGVtSW5kZXggPSB0aGlzLl9hY3RpdmVJbmRleCArIDE7XG4gICAgICAgIGlmIChuZXh0SXRlbUluZGV4ICsgdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyA+IHRoaXMuZ2V0TWVkaWFuSXRlbUluZGV4KCkgJiYgKCgtMSAqIHRoaXMudG90YWxTaGlmdGVkSXRlbXMpIDwgdGhpcy5nZXRUb3RhbFBhZ2VOdW1iZXIoKSAtIDEgfHwgdGhpcy5jaXJjdWxhcikpIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcCgtMSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSB0aGlzLmNpcmN1bGFyICYmICh0aGlzLnZhbHVlLmxlbmd0aCAtIDEpID09PSB0aGlzLl9hY3RpdmVJbmRleCA/IDAgOiBuZXh0SXRlbUluZGV4O1xuICAgICAgICB0aGlzLm9uQWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChhY3RpdmVJbmRleCk7XG5cbiAgICAgICAgaWYgKGUuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmF2QmFja3dhcmQoZSkge1xuICAgICAgICB0aGlzLnN0b3BUaGVTbGlkZVNob3coKTtcblxuICAgICAgICBsZXQgcHJldkl0ZW1JbmRleCA9IHRoaXMuX2FjdGl2ZUluZGV4ICE9PSAwID8gdGhpcy5fYWN0aXZlSW5kZXggLSAxIDogMDtcbiAgICAgICAgbGV0IGRpZmYgPSBwcmV2SXRlbUluZGV4ICsgdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcztcbiAgICAgICAgaWYgKCh0aGlzLmRfbnVtVmlzaWJsZSAtIGRpZmYgLSAxKSA+IHRoaXMuZ2V0TWVkaWFuSXRlbUluZGV4KCkgJiYgKCgtMSAqIHRoaXMudG90YWxTaGlmdGVkSXRlbXMpICE9PSAwIHx8IHRoaXMuY2lyY3VsYXIpKSB7XG4gICAgICAgICAgICB0aGlzLnN0ZXAoMSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSB0aGlzLmNpcmN1bGFyICYmIHRoaXMuX2FjdGl2ZUluZGV4ID09PSAwID8gdGhpcy52YWx1ZS5sZW5ndGggLSAxIDogcHJldkl0ZW1JbmRleDtcbiAgICAgICAgdGhpcy5vbkFjdGl2ZUluZGV4Q2hhbmdlLmVtaXQoYWN0aXZlSW5kZXgpO1xuXG4gICAgICAgIGlmIChlLmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbUNsaWNrKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc3RvcFRoZVNsaWRlU2hvdygpO1xuXG4gICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleCA9IGluZGV4O1xuICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT09IHRoaXMuX2FjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICBjb25zdCBkaWZmID0gc2VsZWN0ZWRJdGVtSW5kZXggKyB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zO1xuICAgICAgICAgICAgbGV0IGRpciA9IDA7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggPCB0aGlzLl9hY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgICAgIGRpciA9ICh0aGlzLmRfbnVtVmlzaWJsZSAtIGRpZmYgLSAxKSAtIHRoaXMuZ2V0TWVkaWFuSXRlbUluZGV4KCk7XG4gICAgICAgICAgICAgICAgaWYgKGRpciA+IDAgJiYgKC0xICogdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcykgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwKGRpcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlyID0gdGhpcy5nZXRNZWRpYW5JdGVtSW5kZXgoKSAtIGRpZmY7XG4gICAgICAgICAgICAgICAgaWYgKGRpciA8IDAgJiYgKC0xICogdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcykgPCB0aGlzLmdldFRvdGFsUGFnZU51bWJlcigpIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXAoZGlyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSBzZWxlY3RlZEl0ZW1JbmRleDtcbiAgICAgICAgICAgIHRoaXMub25BY3RpdmVJbmRleENoYW5nZS5lbWl0KHRoaXMuYWN0aXZlSW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RlcChkaXIpIHtcbiAgICAgICAgbGV0IHRvdGFsU2hpZnRlZEl0ZW1zID0gdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyArIGRpcjtcblxuICAgICAgICBpZiAoZGlyIDwgMCAmJiAoLTEgKiB0b3RhbFNoaWZ0ZWRJdGVtcykgKyB0aGlzLmRfbnVtVmlzaWJsZSA+ICh0aGlzLnZhbHVlLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICB0b3RhbFNoaWZ0ZWRJdGVtcyA9IHRoaXMuZF9udW1WaXNpYmxlIC0gdGhpcy52YWx1ZS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGlyID4gMCAmJiB0b3RhbFNoaWZ0ZWRJdGVtcyA+IDApIHtcbiAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNpcmN1bGFyKSB7XG4gICAgICAgICAgICBpZiAoZGlyIDwgMCAmJiB0aGlzLnZhbHVlLmxlbmd0aCAtIDEgPT09IHRoaXMuX2FjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyID4gMCAmJiB0aGlzLl9hY3RpdmVJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zID0gdGhpcy5kX251bVZpc2libGUgLSB0aGlzLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLml0ZW1zQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudCwgJ3AtaXRlbXMtaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdGhpcy5pc1ZlcnRpY2FsID8gYHRyYW5zbGF0ZTNkKDAsICR7dG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLmRfbnVtVmlzaWJsZSl9JSwgMClgIDogYHRyYW5zbGF0ZTNkKCR7dG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLmRfbnVtVmlzaWJsZSl9JSwgMCwgMClgO1xuICAgICAgICAgICAgdGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSAndHJhbnNmb3JtIDUwMG1zIGVhc2UgMHMnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyA9IHRvdGFsU2hpZnRlZEl0ZW1zO1xuICAgIH1cblxuICAgIHN0b3BUaGVTbGlkZVNob3coKSB7XG4gICAgICAgIGlmICh0aGlzLnNsaWRlU2hvd0FjdGl2ZSAmJiB0aGlzLnN0b3BTbGlkZVNob3cpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcFNsaWRlU2hvdy5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VQYWdlT25Ub3VjaChlLCBkaWZmKSB7XG4gICAgICAgIGlmIChkaWZmIDwgMCkgeyAgICAgICAgICAgLy8gbGVmdFxuICAgICAgICAgICAgdGhpcy5uYXZGb3J3YXJkKGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAgICAgICAgICAgICAgICAgICAgLy8gcmlnaHRcbiAgICAgICAgICAgIHRoaXMubmF2QmFja3dhcmQoZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZ2V0VG90YWxQYWdlTnVtYmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS5sZW5ndGggPiB0aGlzLmRfbnVtVmlzaWJsZSA/ICh0aGlzLnZhbHVlLmxlbmd0aCAtIHRoaXMuZF9udW1WaXNpYmxlKSArIDEgOiAwO1xuICAgIH1cblxuICAgIGdldE1lZGlhbkl0ZW1JbmRleCgpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcih0aGlzLmRfbnVtVmlzaWJsZSAvIDIpO1xuXG4gICAgICAgIHJldHVybiAodGhpcy5kX251bVZpc2libGUgJSAyKSA/IGluZGV4IDogaW5kZXggLSAxO1xuICAgIH1cblxuICAgIG9uVHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbXNDb250YWluZXIgJiYgdGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudCwgJ3AtaXRlbXMtaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ub3VjaEVuZChlKSB7XG4gICAgICAgIGxldCB0b3VjaG9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG5cbiAgICAgICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYWdlT25Ub3VjaChlLCAodG91Y2hvYmoucGFnZVkgLSB0aGlzLnN0YXJ0UG9zLnkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlUGFnZU9uVG91Y2goZSwgKHRvdWNob2JqLnBhZ2VYIC0gdGhpcy5zdGFydFBvcy54KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRvdWNoTW92ZShlKSB7XG4gICAgICAgIGlmIChlLmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVG91Y2hTdGFydChlKSB7XG4gICAgICAgIGxldCB0b3VjaG9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG5cbiAgICAgICAgdGhpcy5zdGFydFBvcyA9IHtcbiAgICAgICAgICAgIHg6IHRvdWNob2JqLnBhZ2VYLFxuICAgICAgICAgICAgeTogdG91Y2hvYmoucGFnZVlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpc05hdkJhY2t3YXJkRGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAoIXRoaXMuY2lyY3VsYXIgJiYgdGhpcy5fYWN0aXZlSW5kZXggPT09IDApIHx8ICh0aGlzLnZhbHVlLmxlbmd0aCA8PSB0aGlzLmRfbnVtVmlzaWJsZSk7XG4gICAgfVxuXG4gICAgaXNOYXZGb3J3YXJkRGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAoIXRoaXMuY2lyY3VsYXIgJiYgdGhpcy5fYWN0aXZlSW5kZXggPT09ICh0aGlzLnZhbHVlLmxlbmd0aCAtIDEpKSB8fCAodGhpcy52YWx1ZS5sZW5ndGggPD0gdGhpcy5kX251bVZpc2libGUpO1xuICAgIH1cblxuICAgIGZpcnN0SXRlbUFjaXZlSW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zICogLTE7XG4gICAgfVxuXG4gICAgbGFzdEl0ZW1BY3RpdmVJbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3RJdGVtQWNpdmVJbmRleCgpICsgdGhpcy5kX251bVZpc2libGUgLSAxO1xuICAgIH1cblxuICAgIGlzSXRlbUFjdGl2ZShpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maXJzdEl0ZW1BY2l2ZUluZGV4KCkgPD0gaW5kZXggJiYgdGhpcy5sYXN0SXRlbUFjdGl2ZUluZGV4KCkgPj0gaW5kZXg7XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmKHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XG5cdFx0XHR0aGlzLnVuYmluZERvY3VtZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50aHVtYm5haWxzU3R5bGUpIHtcbiAgICAgICAgICAgIHRoaXMudGh1bWJuYWlsc1N0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy50aHVtYm5haWxzU3R5bGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFNoYXJlZE1vZHVsZSwgUmlwcGxlTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQ29tbW9uTW9kdWxlLCBHYWxsZXJpYSwgR2FsbGVyaWFDb250ZW50LCBHYWxsZXJpYUl0ZW1TbG90LCBHYWxsZXJpYUl0ZW0sIEdhbGxlcmlhVGh1bWJuYWlscywgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtHYWxsZXJpYSwgR2FsbGVyaWFDb250ZW50LCBHYWxsZXJpYUl0ZW1TbG90LCBHYWxsZXJpYUl0ZW0sIEdhbGxlcmlhVGh1bWJuYWlsc11cbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyaWFNb2R1bGUgeyB9Il19