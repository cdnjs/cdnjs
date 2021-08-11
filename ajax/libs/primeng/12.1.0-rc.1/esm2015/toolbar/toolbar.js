import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class Toolbar {
    constructor(el) {
        this.el = el;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'left':
                    this.leftTemplate = item.template;
                    break;
                case 'right':
                    this.rightTemplate = item.template;
                    break;
            }
        });
    }
}
Toolbar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Toolbar, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
Toolbar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Toolbar, selector: "p-toolbar", inputs: { style: "style", styleClass: "styleClass" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div [ngClass]="'p-toolbar p-component'" [ngStyle]="style" [class]="styleClass" role="toolbar">
            <ng-content></ng-content>
            <div class="p-toolbar-group-left" *ngIf="leftTemplate">
                <ng-container *ngTemplateOutlet="leftTemplate"></ng-container>
            </div>
            <div class="p-toolbar-group-right" *ngIf="rightTemplate">
                <ng-container *ngTemplateOutlet="rightTemplate"></ng-container>
            </div>
        </div>
    `, isInline: true, styles: [".p-toolbar{justify-content:space-between;flex-wrap:wrap}.p-toolbar,.p-toolbar-group-left,.p-toolbar-group-right{display:flex;align-items:center}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Toolbar, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-toolbar',
                    template: `
        <div [ngClass]="'p-toolbar p-component'" [ngStyle]="style" [class]="styleClass" role="toolbar">
            <ng-content></ng-content>
            <div class="p-toolbar-group-left" *ngIf="leftTemplate">
                <ng-container *ngTemplateOutlet="leftTemplate"></ng-container>
            </div>
            <div class="p-toolbar-group-right" *ngIf="rightTemplate">
                <ng-container *ngTemplateOutlet="rightTemplate"></ng-container>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./toolbar.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ToolbarModule {
}
ToolbarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ToolbarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ToolbarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ToolbarModule, declarations: [Toolbar], imports: [CommonModule], exports: [Toolbar] });
ToolbarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ToolbarModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ToolbarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Toolbar],
                    declarations: [Toolbar]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy90b29sYmFyL3Rvb2xiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFZLHVCQUF1QixFQUFFLGlCQUFpQixFQUFvQixlQUFlLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ3hLLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQWMsYUFBYSxFQUFDLE1BQU0sYUFBYSxDQUFDOzs7QUFtQnZELE1BQU0sT0FBTyxPQUFPO0lBWWhCLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUcsQ0FBQztJQUV0QyxtQkFBbUI7UUFDakIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELGtCQUFrQjtRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDNUIsUUFBTyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ25CLEtBQUssTUFBTTtvQkFDUCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3RDLE1BQU07Z0JBRU4sS0FBSyxPQUFPO29CQUNSLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDdkMsTUFBTTthQUNUO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztvR0E5QlEsT0FBTzt3RkFBUCxPQUFPLGlJQU1DLGFBQWEsNkJBckJwQjs7Ozs7Ozs7OztLQVVUOzJGQUtRLE9BQU87a0JBakJuQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7S0FVVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQztpQkFDL0I7aUdBR1ksS0FBSztzQkFBYixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRTBCLFNBQVM7c0JBQXhDLGVBQWU7dUJBQUMsYUFBYTs7QUFpQ2xDLE1BQU0sT0FBTyxhQUFhOzswR0FBYixhQUFhOzJHQUFiLGFBQWEsaUJBdkNiLE9BQU8sYUFtQ04sWUFBWSxhQW5DYixPQUFPOzJHQXVDUCxhQUFhLFlBSmIsQ0FBQyxZQUFZLENBQUM7MkZBSWQsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztvQkFDbEIsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO2lCQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LEVsZW1lbnRSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBBZnRlckNvbnRlbnRJbml0LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Jsb2NrYWJsZVVJLCBQcmltZVRlbXBsYXRlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10b29sYmFyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIidwLXRvb2xiYXIgcC1jb21wb25lbnQnXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIHJvbGU9XCJ0b29sYmFyXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10b29sYmFyLWdyb3VwLWxlZnRcIiAqbmdJZj1cImxlZnRUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJsZWZ0VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtdG9vbGJhci1ncm91cC1yaWdodFwiICpuZ0lmPVwicmlnaHRUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJyaWdodFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL3Rvb2xiYXIuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVG9vbGJhciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsQmxvY2thYmxlVUkge1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIGxlZnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHJpZ2h0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgZ2V0QmxvY2thYmxlRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVmdFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yaWdodFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1Rvb2xiYXJdLFxuICAgIGRlY2xhcmF0aW9uczogW1Rvb2xiYXJdXG59KVxuZXhwb3J0IGNsYXNzIFRvb2xiYXJNb2R1bGUgeyB9XG4iXX0=