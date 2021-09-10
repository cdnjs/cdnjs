import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class GMap {
    constructor(el, differs, cd, zone) {
        this.el = el;
        this.cd = cd;
        this.zone = zone;
        this.onMapClick = new EventEmitter();
        this.onOverlayClick = new EventEmitter();
        this.onOverlayDblClick = new EventEmitter();
        this.onOverlayDragStart = new EventEmitter();
        this.onOverlayDrag = new EventEmitter();
        this.onOverlayDragEnd = new EventEmitter();
        this.onMapReady = new EventEmitter();
        this.onMapDragEnd = new EventEmitter();
        this.onZoomChanged = new EventEmitter();
        this.differ = differs.find([]).create(null);
    }
    ngAfterViewChecked() {
        if (!this.map && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    }
    initialize() {
        this.map = new google.maps.Map(this.el.nativeElement.children[0], this.options);
        this.onMapReady.emit({
            map: this.map
        });
        if (this.overlays) {
            for (let overlay of this.overlays) {
                overlay.setMap(this.map);
                this.bindOverlayEvents(overlay);
            }
        }
        this.map.addListener('click', (event) => {
            this.zone.run(() => {
                this.onMapClick.emit(event);
            });
        });
        this.map.addListener('dragend', (event) => {
            this.zone.run(() => {
                this.onMapDragEnd.emit(event);
            });
        });
        this.map.addListener('zoom_changed', (event) => {
            this.zone.run(() => {
                this.onZoomChanged.emit(event);
            });
        });
    }
    bindOverlayEvents(overlay) {
        overlay.addListener('click', (event) => {
            this.zone.run(() => {
                this.onOverlayClick.emit({
                    originalEvent: event,
                    'overlay': overlay,
                    map: this.map
                });
            });
        });
        overlay.addListener('dblclick', (event) => {
            this.zone.run(() => {
                this.onOverlayDblClick.emit({
                    originalEvent: event,
                    'overlay': overlay,
                    map: this.map
                });
            });
        });
        if (overlay.getDraggable()) {
            this.bindDragEvents(overlay);
        }
    }
    ngDoCheck() {
        let changes = this.differ.diff(this.overlays);
        if (changes && this.map) {
            changes.forEachRemovedItem((record) => {
                google.maps.event.clearInstanceListeners(record.item);
                record.item.setMap(null);
            });
            changes.forEachAddedItem((record) => {
                record.item.setMap(this.map);
                record.item.addListener('click', (event) => {
                    this.zone.run(() => {
                        this.onOverlayClick.emit({
                            originalEvent: event,
                            overlay: record.item,
                            map: this.map
                        });
                    });
                });
                if (record.item.getDraggable()) {
                    this.bindDragEvents(record.item);
                }
            });
        }
    }
    bindDragEvents(overlay) {
        overlay.addListener('dragstart', (event) => {
            this.zone.run(() => {
                this.onOverlayDragStart.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: this.map
                });
            });
        });
        overlay.addListener('drag', (event) => {
            this.zone.run(() => {
                this.onOverlayDrag.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: this.map
                });
            });
        });
        overlay.addListener('dragend', (event) => {
            this.zone.run(() => {
                this.onOverlayDragEnd.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: this.map
                });
            });
        });
    }
    getMap() {
        return this.map;
    }
}
GMap.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: GMap, deps: [{ token: i0.ElementRef }, { token: i0.IterableDiffers }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
GMap.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: GMap, selector: "p-gmap", inputs: { style: "style", styleClass: "styleClass", options: "options", overlays: "overlays" }, outputs: { onMapClick: "onMapClick", onOverlayClick: "onOverlayClick", onOverlayDblClick: "onOverlayDblClick", onOverlayDragStart: "onOverlayDragStart", onOverlayDrag: "onOverlayDrag", onOverlayDragEnd: "onOverlayDragEnd", onMapReady: "onMapReady", onMapDragEnd: "onMapDragEnd", onZoomChanged: "onZoomChanged" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `<div [ngStyle]="style" [class]="styleClass"></div>`, isInline: true, directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: GMap, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-gmap',
                    template: `<div [ngStyle]="style" [class]="styleClass"></div>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.IterableDiffers }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], options: [{
                type: Input
            }], overlays: [{
                type: Input
            }], onMapClick: [{
                type: Output
            }], onOverlayClick: [{
                type: Output
            }], onOverlayDblClick: [{
                type: Output
            }], onOverlayDragStart: [{
                type: Output
            }], onOverlayDrag: [{
                type: Output
            }], onOverlayDragEnd: [{
                type: Output
            }], onMapReady: [{
                type: Output
            }], onMapDragEnd: [{
                type: Output
            }], onZoomChanged: [{
                type: Output
            }] } });
class GMapModule {
}
GMapModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: GMapModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GMapModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: GMapModule, declarations: [GMap], imports: [CommonModule], exports: [GMap] });
GMapModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: GMapModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: GMapModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [GMap],
                    declarations: [GMap]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { GMap, GMapModule };
//# sourceMappingURL=primeng-gmap.js.map
