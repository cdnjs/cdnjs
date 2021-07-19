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
Divider.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Divider, selector: "p-divider", inputs: { styleClass: "styleClass", style: "style", layout: "layout", type: "type", align: "align" }, ngImport: i0, template: `
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
                    styleUrls: ['./divider.css']
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9kaXZpZGVyL2RpdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBZS9DLE1BQU0sT0FBTyxPQUFPO0lBYnBCO1FBbUJhLFdBQU0sR0FBVyxZQUFZLENBQUM7UUFFOUIsU0FBSSxHQUFXLE9BQU8sQ0FBQztLQXFCbkM7SUFmRyxjQUFjO1FBQ1YsT0FBTztZQUNILHVCQUF1QixFQUFFLElBQUk7WUFDN0Isc0JBQXNCLEVBQUUsSUFBSSxDQUFDLE1BQU0sS0FBSyxZQUFZO1lBQ3BELG9CQUFvQixFQUFFLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVTtZQUNoRCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU87WUFDeEMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRO1lBQzFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUTtZQUMxQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTSxLQUFLLFlBQVksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQztZQUN4RixrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDO1lBQ3pKLGlCQUFpQixFQUFFLElBQUksQ0FBQyxNQUFNLEtBQUssWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTztZQUN6RSxlQUFlLEVBQUUsSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztZQUNyRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVE7U0FDNUUsQ0FBQztJQUNOLENBQUM7O29HQTVCUSxPQUFPO3dGQUFQLE9BQU8sdUpBWE47Ozs7OztLQU1UOzJGQUtRLE9BQU87a0JBYm5CLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRTs7Ozs7O0tBTVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7aUJBQy9COzhCQUdZLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLE1BQU07c0JBQWQsS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLOztBQTBCVixNQUFNLE9BQU8sYUFBYTs7MEdBQWIsYUFBYTsyR0FBYixhQUFhLGlCQXBDYixPQUFPLGFBZ0NOLFlBQVksYUFoQ2IsT0FBTzsyR0FvQ1AsYUFBYSxZQUpiLENBQUMsWUFBWSxDQUFDOzJGQUlkLGFBQWE7a0JBTHpCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7b0JBQ2xCLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24sIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1kaXZpZGVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzKClcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgcm9sZT1cInNlcGFyYXRvclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGl2aWRlci1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9kaXZpZGVyLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIERpdmlkZXIge1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIGxheW91dDogc3RyaW5nID0gXCJob3Jpem9udGFsXCI7XG4gICAgXG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nID0gXCJzb2xpZFwiO1xuXG4gICAgQElucHV0KCkgYWxpZ246IHN0cmluZztcblxuICAgIFxuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1kaXZpZGVyIHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICdwLWRpdmlkZXItaG9yaXpvbnRhbCc6IHRoaXMubGF5b3V0ID09PSBcImhvcml6b250YWxcIixcbiAgICAgICAgICAgICdwLWRpdmlkZXItdmVydGljYWwnOiB0aGlzLmxheW91dCA9PT0gXCJ2ZXJ0aWNhbFwiLFxuICAgICAgICAgICAgJ3AtZGl2aWRlci1zb2xpZCc6IHRoaXMudHlwZSA9PT0gXCJzb2xpZFwiLFxuICAgICAgICAgICAgJ3AtZGl2aWRlci1kYXNoZWQnOiB0aGlzLnR5cGUgPT09IFwiZGFzaGVkXCIsXG4gICAgICAgICAgICAncC1kaXZpZGVyLWRvdHRlZCc6IHRoaXMudHlwZSA9PT0gXCJkb3R0ZWRcIixcbiAgICAgICAgICAgICdwLWRpdmlkZXItbGVmdCc6IHRoaXMubGF5b3V0ID09PSAnaG9yaXpvbnRhbCcgJiYgKCF0aGlzLmFsaWduIHx8IHRoaXMuYWxpZ24gPT09ICdsZWZ0JyksXG4gICAgICAgICAgICAncC1kaXZpZGVyLWNlbnRlcic6ICh0aGlzLmxheW91dCA9PT0gJ2hvcml6b250YWwnICYmIHRoaXMuYWxpZ24gPT09ICdjZW50ZXInKSB8fCAodGhpcy5sYXlvdXQgPT09ICd2ZXJ0aWNhbCcgJiYgKCF0aGlzLmFsaWduIHx8IHRoaXMuYWxpZ24gPT09ICdjZW50ZXInKSksXG4gICAgICAgICAgICAncC1kaXZpZGVyLXJpZ2h0JzogdGhpcy5sYXlvdXQgPT09ICdob3Jpem9udGFsJyAmJiB0aGlzLmFsaWduID09PSAncmlnaHQnLFxuICAgICAgICAgICAgJ3AtZGl2aWRlci10b3AnOiB0aGlzLmxheW91dCA9PT0gJ3ZlcnRpY2FsJyAmJiAodGhpcy5hbGlnbiA9PT0gJ3RvcCcpLFxuICAgICAgICAgICAgJ3AtZGl2aWRlci1ib3R0b20nOiB0aGlzLmxheW91dCA9PT0gJ3ZlcnRpY2FsJyAmJiB0aGlzLmFsaWduID09PSAnYm90dG9tJ1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbRGl2aWRlcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbRGl2aWRlcl1cbn0pXG5leHBvcnQgY2xhc3MgRGl2aWRlck1vZHVsZSB7IH1cbiJdfQ==