import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ContentChild, ContentChildren, ViewChild, Output, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { Header, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import * as i1 from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';

class VirtualScroller {
    constructor(el) {
        this.el = el;
        this.delay = 250;
        this.trackBy = (index, item) => item;
        this.onLazyLoad = new EventEmitter();
        this._totalRecords = 0;
        this.page = 0;
        this._first = 0;
    }
    get totalRecords() {
        return this._totalRecords;
    }
    set totalRecords(val) {
        this._totalRecords = val;
        console.log("totalRecords is deprecated, provide a value with the length of virtual items instead.");
    }
    get first() {
        return this._first;
    }
    set first(val) {
        this._first = val;
        console.log("first property is deprecated, use scrollToIndex function to scroll a specific item.");
    }
    get cache() {
        return this._cache;
    }
    set cache(val) {
        this._cache = val;
        console.log("cache is deprecated as it is always on.");
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'loadingItem':
                    this.loadingItemTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    onScrollIndexChange(index) {
        if (this.lazy) {
            if (this.virtualScrollTimeout) {
                clearTimeout(this.virtualScrollTimeout);
            }
            this.virtualScrollTimeout = setTimeout(() => {
                let page = Math.floor(index / this.rows);
                let virtualScrollOffset = page === 0 ? 0 : (page - 1) * this.rows;
                let virtualScrollChunkSize = page === 0 ? this.rows * 2 : this.rows * 3;
                if (page !== this.virtualPage) {
                    this.virtualPage = page;
                    this.onLazyLoad.emit({ first: virtualScrollOffset, rows: virtualScrollChunkSize });
                }
            }, this.delay);
        }
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    //@deprecated
    scrollTo(index, mode) {
        this.scrollToIndex(index, mode);
    }
    scrollToIndex(index, mode) {
        if (this.viewport) {
            this.viewport.scrollToIndex(index, mode);
        }
    }
}
VirtualScroller.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: VirtualScroller, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
VirtualScroller.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: VirtualScroller, selector: "p-virtualScroller", inputs: { value: "value", itemSize: "itemSize", style: "style", styleClass: "styleClass", scrollHeight: "scrollHeight", lazy: "lazy", rows: "rows", minBufferPx: "minBufferPx", maxBufferPx: "maxBufferPx", delay: "delay", trackBy: "trackBy", totalRecords: "totalRecords", first: "first", cache: "cache" }, outputs: { onLazyLoad: "onLazyLoad" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "header", first: true, predicate: Header, descendants: true }, { propertyName: "footer", first: true, predicate: Footer, descendants: true }, { propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "viewport", first: true, predicate: CdkVirtualScrollViewport, descendants: true }], ngImport: i0, template: `
        <div [ngClass]="'p-virtualscroller p-component'" [ngStyle]="style" [class]="styleClass">
            <div class="p-virtualscroller-header" *ngIf="header || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div #content class="p-virtualscroller-content">
                <div class="p-virtualscroller-list">
                    <cdk-virtual-scroll-viewport #viewport [ngStyle]="{'height': scrollHeight}" tabindex="0" [itemSize]="itemSize" [minBufferPx]="minBufferPx" [maxBufferPx]="maxBufferPx" (scrolledIndexChange)="onScrollIndexChange($event)">
                        <ng-container *cdkVirtualFor="let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd;">
                            <div [ngStyle]="{'height': itemSize + 'px'}" class="p-virtualscroller-item">
                                <ng-container *ngTemplateOutlet="item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}"></ng-container>
                            </div>
                        </ng-container>
                    </cdk-virtual-scroll-viewport>
                </div>
            </div>
            <div class="p-virtualscroller-footer" *ngIf="footer || footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `, isInline: true, styles: ["cdk-virtual-scroll-viewport{outline:0 none}"], components: [{ type: i1.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation"], outputs: ["scrolledIndexChange"] }], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { type: i1.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: VirtualScroller, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-virtualScroller',
                    template: `
        <div [ngClass]="'p-virtualscroller p-component'" [ngStyle]="style" [class]="styleClass">
            <div class="p-virtualscroller-header" *ngIf="header || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div #content class="p-virtualscroller-content">
                <div class="p-virtualscroller-list">
                    <cdk-virtual-scroll-viewport #viewport [ngStyle]="{'height': scrollHeight}" tabindex="0" [itemSize]="itemSize" [minBufferPx]="minBufferPx" [maxBufferPx]="maxBufferPx" (scrolledIndexChange)="onScrollIndexChange($event)">
                        <ng-container *cdkVirtualFor="let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd;">
                            <div [ngStyle]="{'height': itemSize + 'px'}" class="p-virtualscroller-item">
                                <ng-container *ngTemplateOutlet="item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}"></ng-container>
                            </div>
                        </ng-container>
                    </cdk-virtual-scroll-viewport>
                </div>
            </div>
            <div class="p-virtualscroller-footer" *ngIf="footer || footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./virtualscroller.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { value: [{
                type: Input
            }], itemSize: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], lazy: [{
                type: Input
            }], rows: [{
                type: Input
            }], minBufferPx: [{
                type: Input
            }], maxBufferPx: [{
                type: Input
            }], delay: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], header: [{
                type: ContentChild,
                args: [Header]
            }], footer: [{
                type: ContentChild,
                args: [Footer]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], viewport: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport]
            }], onLazyLoad: [{
                type: Output
            }], totalRecords: [{
                type: Input
            }], first: [{
                type: Input
            }], cache: [{
                type: Input
            }] } });
class VirtualScrollerModule {
}
VirtualScrollerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: VirtualScrollerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VirtualScrollerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: VirtualScrollerModule, declarations: [VirtualScroller], imports: [CommonModule, ScrollingModule], exports: [VirtualScroller, SharedModule, ScrollingModule] });
VirtualScrollerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: VirtualScrollerModule, imports: [[CommonModule, ScrollingModule], SharedModule, ScrollingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: VirtualScrollerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ScrollingModule],
                    exports: [VirtualScroller, SharedModule, ScrollingModule],
                    declarations: [VirtualScroller]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { VirtualScroller, VirtualScrollerModule };
//# sourceMappingURL=primeng-virtualscroller.js.map
