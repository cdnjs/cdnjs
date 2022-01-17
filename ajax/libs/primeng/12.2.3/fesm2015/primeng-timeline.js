import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ContentChildren, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';

class Timeline {
    constructor(el) {
        this.el = el;
        this.align = 'left';
        this.layout = 'vertical';
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'opposite':
                    this.oppositeTemplate = item.template;
                    break;
                case 'marker':
                    this.markerTemplate = item.template;
                    break;
            }
        });
    }
}
Timeline.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Timeline, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
Timeline.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Timeline, selector: "p-timeline", inputs: { value: "value", style: "style", styleClass: "styleClass", align: "align", layout: "layout" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="{'p-timeline p-component': true,
                'p-timeline-left': align === 'left',
                'p-timeline-right': align === 'right',
                'p-timeline-top': align === 'top',
                'p-timeline-bottom': align === 'bottom',
                'p-timeline-alternate': align === 'alternate',
                'p-timeline-vertical': layout === 'vertical',
                'p-timeline-horizontal': layout === 'horizontal'}">
            <div *ngFor="let event of value; let last=last" class="p-timeline-event">
                <div class="p-timeline-event-opposite">
                    <ng-container *ngTemplateOutlet="oppositeTemplate; context: {$implicit: event}"></ng-container>
                </div>
                <div class="p-timeline-event-separator">
                    <ng-container *ngIf="markerTemplate; else marker">
                        <ng-container *ngTemplateOutlet="markerTemplate; context: {$implicit: event}"></ng-container>
                    </ng-container>
                    <ng-template #marker>
                        <div class="p-timeline-event-marker"></div>
                    </ng-template>
                    <div *ngIf="!last" class="p-timeline-event-connector"></div>
                </div>
                <div class="p-timeline-event-content">
                    <ng-container *ngTemplateOutlet="contentTemplate; context: {$implicit: event}"></ng-container>
                </div>
            </div>
        </div>
    `, isInline: true, styles: [".p-timeline{display:flex;flex-grow:1;flex-direction:column}.p-timeline-left .p-timeline-event-opposite{text-align:right}.p-timeline-left .p-timeline-event-content{text-align:left}.p-timeline-right .p-timeline-event{flex-direction:row-reverse}.p-timeline-right .p-timeline-event-opposite{text-align:left}.p-timeline-right .p-timeline-event-content{text-align:right}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(2n){flex-direction:row-reverse}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite{text-align:right}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(2n) .p-timeline-event-opposite,.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content{text-align:left}.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(2n) .p-timeline-event-content{text-align:right}.p-timeline-event{display:flex;position:relative;min-height:70px}.p-timeline-event:last-child{min-height:0}.p-timeline-event-content,.p-timeline-event-opposite{flex:1;padding:0 1rem}.p-timeline-event-separator{flex:0;display:flex;align-items:center;flex-direction:column}.p-timeline-event-marker{display:flex;align-self:baseline}.p-timeline-event-connector{flex-grow:1}.p-timeline-horizontal{flex-direction:row}.p-timeline-horizontal .p-timeline-event{flex-direction:column;flex:1}.p-timeline-horizontal .p-timeline-event:last-child{flex:0}.p-timeline-horizontal .p-timeline-event-separator{flex-direction:row}.p-timeline-horizontal .p-timeline-event-connector{width:100%}.p-timeline-bottom .p-timeline-event,.p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(2n){flex-direction:column-reverse}"], directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Timeline, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-timeline',
                    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="{'p-timeline p-component': true,
                'p-timeline-left': align === 'left',
                'p-timeline-right': align === 'right',
                'p-timeline-top': align === 'top',
                'p-timeline-bottom': align === 'bottom',
                'p-timeline-alternate': align === 'alternate',
                'p-timeline-vertical': layout === 'vertical',
                'p-timeline-horizontal': layout === 'horizontal'}">
            <div *ngFor="let event of value; let last=last" class="p-timeline-event">
                <div class="p-timeline-event-opposite">
                    <ng-container *ngTemplateOutlet="oppositeTemplate; context: {$implicit: event}"></ng-container>
                </div>
                <div class="p-timeline-event-separator">
                    <ng-container *ngIf="markerTemplate; else marker">
                        <ng-container *ngTemplateOutlet="markerTemplate; context: {$implicit: event}"></ng-container>
                    </ng-container>
                    <ng-template #marker>
                        <div class="p-timeline-event-marker"></div>
                    </ng-template>
                    <div *ngIf="!last" class="p-timeline-event-connector"></div>
                </div>
                <div class="p-timeline-event-content">
                    <ng-container *ngTemplateOutlet="contentTemplate; context: {$implicit: event}"></ng-container>
                </div>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./timeline.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { value: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], align: [{
                type: Input
            }], layout: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class TimelineModule {
}
TimelineModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TimelineModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TimelineModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TimelineModule, declarations: [Timeline], imports: [CommonModule], exports: [Timeline, SharedModule] });
TimelineModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TimelineModule, imports: [[CommonModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TimelineModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Timeline, SharedModule],
                    declarations: [Timeline]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { Timeline, TimelineModule };
//# sourceMappingURL=primeng-timeline.js.map
