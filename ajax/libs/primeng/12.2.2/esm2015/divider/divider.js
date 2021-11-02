import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class Divider {
    constructor() {
        this.layout = "horizontal";
        this.type = "solid";
    }
    containerClass() {
        return {
            'p-divider p-component': true,
            'p-divider-horizontal': this.layout === "horizontal",
            'p-divider-vertical': this.layout === "vertical",
            'p-divider-solid': this.type === "solid",
            'p-divider-dashed': this.type === "dashed",
            'p-divider-dotted': this.type === "dotted",
            'p-divider-left': this.layout === 'horizontal' && (!this.align || this.align === 'left'),
            'p-divider-center': (this.layout === 'horizontal' && this.align === 'center') || (this.layout === 'vertical' && (!this.align || this.align === 'center')),
            'p-divider-right': this.layout === 'horizontal' && this.align === 'right',
            'p-divider-top': this.layout === 'vertical' && (this.align === 'top'),
            'p-divider-bottom': this.layout === 'vertical' && this.align === 'bottom'
        };
    }
}
Divider.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Divider, deps: [], target: i0.ɵɵFactoryTarget.Component });
Divider.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Divider, selector: "p-divider", inputs: { styleClass: "styleClass", style: "style", layout: "layout", type: "type", align: "align" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" role="separator">
            <div class="p-divider-content">
                <ng-content></ng-content>
            </div>
        </div>
    `, isInline: true, styles: [".p-divider-horizontal{display:flex;width:100%;position:relative;align-items:center}.p-divider-horizontal:before{position:absolute;display:block;top:50%;left:0;width:100%;content:\"\"}.p-divider-horizontal.p-divider-left{justify-content:flex-start}.p-divider-horizontal.p-divider-right{justify-content:flex-end}.p-divider-horizontal.p-divider-center{justify-content:center}.p-divider-content{z-index:1}.p-divider-vertical{min-height:100%;margin:0 1rem;display:flex;position:relative;justify-content:center}.p-divider-vertical:before{position:absolute;display:block;top:0;left:50%;height:100%;content:\"\"}.p-divider-vertical.p-divider-top{align-items:flex-start}.p-divider-vertical.p-divider-center{align-items:center}.p-divider-vertical.p-divider-bottom{align-items:flex-end}.p-divider-solid.p-divider-horizontal:before{border-top-style:solid}.p-divider-solid.p-divider-vertical:before{border-left-style:solid}.p-divider-dashed.p-divider-horizontal:before{border-top-style:dashed}.p-divider-dashed.p-divider-vertical:before{border-left-style:dashed}.p-divider-dotted.p-divider-horizontal:before{border-top-style:dotted;border-left-style:dotted}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Divider, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-divider',
                    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" role="separator">
            <div class="p-divider-content">
                <ng-content></ng-content>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./divider.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], propDecorators: { styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], layout: [{
                type: Input
            }], type: [{
                type: Input
            }], align: [{
                type: Input
            }] } });
export class DividerModule {
}
DividerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DividerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DividerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DividerModule, declarations: [Divider], imports: [CommonModule], exports: [Divider] });
DividerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DividerModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DividerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Divider],
                    declarations: [Divider]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9kaXZpZGVyL2RpdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBa0IvQyxNQUFNLE9BQU8sT0FBTztJQWhCcEI7UUFzQmEsV0FBTSxHQUFXLFlBQVksQ0FBQztRQUU5QixTQUFJLEdBQVcsT0FBTyxDQUFDO0tBbUJuQztJQWZHLGNBQWM7UUFDVixPQUFPO1lBQ0gsdUJBQXVCLEVBQUUsSUFBSTtZQUM3QixzQkFBc0IsRUFBRSxJQUFJLENBQUMsTUFBTSxLQUFLLFlBQVk7WUFDcEQsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVO1lBQ2hELGlCQUFpQixFQUFFLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTztZQUN4QyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVE7WUFDMUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRO1lBQzFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxNQUFNLEtBQUssWUFBWSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDO1lBQ3hGLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUM7WUFDekosaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE1BQU0sS0FBSyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxPQUFPO1lBQ3pFLGVBQWUsRUFBRSxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDO1lBQ3JFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUTtTQUM1RSxDQUFDO0lBQ04sQ0FBQzs7b0dBMUJRLE9BQU87d0ZBQVAsT0FBTyw4TEFkTjs7Ozs7O0tBTVQ7MkZBUVEsT0FBTztrQkFoQm5CLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRTs7Ozs7O0tBTVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzVCLElBQUksRUFBRTt3QkFDRixPQUFPLEVBQUUsV0FBVztxQkFDdkI7aUJBQ0o7OEJBR1ksVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsTUFBTTtzQkFBZCxLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7O0FBd0JWLE1BQU0sT0FBTyxhQUFhOzswR0FBYixhQUFhOzJHQUFiLGFBQWEsaUJBbENiLE9BQU8sYUE4Qk4sWUFBWSxhQTlCYixPQUFPOzJHQWtDUCxhQUFhLFlBSmIsQ0FBQyxZQUFZLENBQUM7MkZBSWQsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztvQkFDbEIsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO2lCQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWRpdmlkZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiByb2xlPVwic2VwYXJhdG9yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kaXZpZGVyLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2RpdmlkZXIuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRGl2aWRlciB7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgbGF5b3V0OiBzdHJpbmcgPSBcImhvcml6b250YWxcIjtcblxuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZyA9IFwic29saWRcIjtcblxuICAgIEBJbnB1dCgpIGFsaWduOiBzdHJpbmc7XG5cbiAgICBjb250YWluZXJDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLWRpdmlkZXIgcC1jb21wb25lbnQnOiB0cnVlLFxuICAgICAgICAgICAgJ3AtZGl2aWRlci1ob3Jpem9udGFsJzogdGhpcy5sYXlvdXQgPT09IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgICAgICAgJ3AtZGl2aWRlci12ZXJ0aWNhbCc6IHRoaXMubGF5b3V0ID09PSBcInZlcnRpY2FsXCIsXG4gICAgICAgICAgICAncC1kaXZpZGVyLXNvbGlkJzogdGhpcy50eXBlID09PSBcInNvbGlkXCIsXG4gICAgICAgICAgICAncC1kaXZpZGVyLWRhc2hlZCc6IHRoaXMudHlwZSA9PT0gXCJkYXNoZWRcIixcbiAgICAgICAgICAgICdwLWRpdmlkZXItZG90dGVkJzogdGhpcy50eXBlID09PSBcImRvdHRlZFwiLFxuICAgICAgICAgICAgJ3AtZGl2aWRlci1sZWZ0JzogdGhpcy5sYXlvdXQgPT09ICdob3Jpem9udGFsJyAmJiAoIXRoaXMuYWxpZ24gfHwgdGhpcy5hbGlnbiA9PT0gJ2xlZnQnKSxcbiAgICAgICAgICAgICdwLWRpdmlkZXItY2VudGVyJzogKHRoaXMubGF5b3V0ID09PSAnaG9yaXpvbnRhbCcgJiYgdGhpcy5hbGlnbiA9PT0gJ2NlbnRlcicpIHx8ICh0aGlzLmxheW91dCA9PT0gJ3ZlcnRpY2FsJyAmJiAoIXRoaXMuYWxpZ24gfHwgdGhpcy5hbGlnbiA9PT0gJ2NlbnRlcicpKSxcbiAgICAgICAgICAgICdwLWRpdmlkZXItcmlnaHQnOiB0aGlzLmxheW91dCA9PT0gJ2hvcml6b250YWwnICYmIHRoaXMuYWxpZ24gPT09ICdyaWdodCcsXG4gICAgICAgICAgICAncC1kaXZpZGVyLXRvcCc6IHRoaXMubGF5b3V0ID09PSAndmVydGljYWwnICYmICh0aGlzLmFsaWduID09PSAndG9wJyksXG4gICAgICAgICAgICAncC1kaXZpZGVyLWJvdHRvbSc6IHRoaXMubGF5b3V0ID09PSAndmVydGljYWwnICYmIHRoaXMuYWxpZ24gPT09ICdib3R0b20nXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtEaXZpZGVyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtEaXZpZGVyXVxufSlcbmV4cG9ydCBjbGFzcyBEaXZpZGVyTW9kdWxlIHsgfVxuIl19