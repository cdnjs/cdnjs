import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class Timeline {
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
Timeline.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Timeline, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
Timeline.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: Timeline, selector: "p-timeline", inputs: { value: "value", style: "style", styleClass: "styleClass", align: "align", layout: "layout" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Timeline, decorators: [{
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
                    styleUrls: ['./timeline.css']
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
export class TimelineModule {
}
TimelineModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TimelineModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TimelineModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TimelineModule, declarations: [Timeline], imports: [CommonModule], exports: [Timeline, SharedModule] });
TimelineModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TimelineModule, imports: [[CommonModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TimelineModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Timeline, SharedModule],
                    declarations: [Timeline]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvdGltZWxpbmUvdGltZWxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFjLHVCQUF1QixFQUFFLGlCQUFpQixFQUFvQixlQUFlLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQzVLLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQWMsYUFBYSxFQUFFLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQzs7O0FBb0NyRSxNQUFNLE9BQU8sUUFBUTtJQW9CakIsWUFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFaekIsVUFBSyxHQUFXLE1BQU0sQ0FBQztRQUV2QixXQUFNLEdBQVcsVUFBVSxDQUFDO0lBVUEsQ0FBQztJQUV0QyxtQkFBbUI7UUFDZixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM1QixRQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDbkIsS0FBSyxTQUFTO29CQUNWLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDekMsTUFBTTtnQkFFTixLQUFLLFVBQVU7b0JBQ1gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQzFDLE1BQU07Z0JBRU4sS0FBSyxRQUFRO29CQUNULElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDeEMsTUFBTTthQUNUO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztxR0ExQ1EsUUFBUTt5RkFBUixRQUFRLG9MQVlBLGFBQWEsNkJBNUNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBMkJUOzJGQUtRLFFBQVE7a0JBbENwQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTJCVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2lCQUNoQztpR0FHWSxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLE1BQU07c0JBQWQsS0FBSztnQkFFMEIsU0FBUztzQkFBeEMsZUFBZTt1QkFBQyxhQUFhOztBQXVDbEMsTUFBTSxPQUFPLGNBQWM7OzJHQUFkLGNBQWM7NEdBQWQsY0FBYyxpQkFuRGQsUUFBUSxhQStDUCxZQUFZLGFBL0NiLFFBQVEsRUFnREcsWUFBWTs0R0FHdkIsY0FBYyxZQUpkLENBQUMsWUFBWSxDQUFDLEVBQ0gsWUFBWTsyRkFHdkIsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7b0JBQ2pDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztpQkFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlICxDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24sIEFmdGVyQ29udGVudEluaXQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QmxvY2thYmxlVUksIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdGltZWxpbmUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cInsncC10aW1lbGluZSBwLWNvbXBvbmVudCc6IHRydWUsIFxuICAgICAgICAgICAgICAgICdwLXRpbWVsaW5lLWxlZnQnOiBhbGlnbiA9PT0gJ2xlZnQnLFxuICAgICAgICAgICAgICAgICdwLXRpbWVsaW5lLXJpZ2h0JzogYWxpZ24gPT09ICdyaWdodCcsXG4gICAgICAgICAgICAgICAgJ3AtdGltZWxpbmUtdG9wJzogYWxpZ24gPT09ICd0b3AnLFxuICAgICAgICAgICAgICAgICdwLXRpbWVsaW5lLWJvdHRvbSc6IGFsaWduID09PSAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAncC10aW1lbGluZS1hbHRlcm5hdGUnOiBhbGlnbiA9PT0gJ2FsdGVybmF0ZScsXG4gICAgICAgICAgICAgICAgJ3AtdGltZWxpbmUtdmVydGljYWwnOiBsYXlvdXQgPT09ICd2ZXJ0aWNhbCcsXG4gICAgICAgICAgICAgICAgJ3AtdGltZWxpbmUtaG9yaXpvbnRhbCc6IGxheW91dCA9PT0gJ2hvcml6b250YWwnfVwiPlxuICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZXZlbnQgb2YgdmFsdWU7IGxldCBsYXN0PWxhc3RcIiBjbGFzcz1cInAtdGltZWxpbmUtZXZlbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10aW1lbGluZS1ldmVudC1vcHBvc2l0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwib3Bwb3NpdGVUZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogZXZlbnR9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtdGltZWxpbmUtZXZlbnQtc2VwYXJhdG9yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtYXJrZXJUZW1wbGF0ZTsgZWxzZSBtYXJrZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtYXJrZXJUZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogZXZlbnR9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI21hcmtlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRpbWVsaW5lLWV2ZW50LW1hcmtlclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIWxhc3RcIiBjbGFzcz1cInAtdGltZWxpbmUtZXZlbnQtY29ubmVjdG9yXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtdGltZWxpbmUtZXZlbnQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBldmVudH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGltZWxpbmUuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGltZWxpbmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBCbG9ja2FibGVVSSB7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55W107XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYWxpZ246IHN0cmluZyA9ICdsZWZ0JztcblxuICAgIEBJbnB1dCgpIGxheW91dDogc3RyaW5nID0gJ3ZlcnRpY2FsJztcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIG9wcG9zaXRlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBtYXJrZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdvcHBvc2l0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3Bwb3NpdGVUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtYXJrZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1RpbWVsaW5lLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1RpbWVsaW5lXVxufSlcbmV4cG9ydCBjbGFzcyBUaW1lbGluZU1vZHVsZSB7IH1cbiJdfQ==