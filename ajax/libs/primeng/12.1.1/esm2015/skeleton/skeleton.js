import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class Skeleton {
    constructor() {
        this.shape = "rectangle";
        this.animation = "wave";
        this.borderRadius = null;
        this.size = null;
        this.width = "100%";
        this.height = "1rem";
    }
    containerClass() {
        return {
            'p-skeleton p-component': true,
            'p-skeleton-circle': this.shape === 'circle',
            'p-skeleton-none': this.animation === 'none'
        };
    }
    containerStyle() {
        if (this.size)
            return Object.assign(Object.assign({}, this.style), { width: this.size, height: this.size, borderRadius: this.borderRadius });
        else
            return Object.assign(Object.assign({}, this.style), { width: this.width, height: this.height, borderRadius: this.borderRadius });
    }
}
Skeleton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Skeleton, deps: [], target: i0.ɵɵFactoryTarget.Component });
Skeleton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Skeleton, selector: "p-skeleton", inputs: { styleClass: "styleClass", style: "style", shape: "shape", animation: "animation", borderRadius: "borderRadius", size: "size", width: "width", height: "height" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="containerStyle()">
        </div>
    `, isInline: true, styles: [".p-skeleton{position:relative;overflow:hidden}.p-skeleton:after{content:\"\";animation:p-skeleton-animation 1.2s infinite;height:100%;left:0;position:absolute;right:0;top:0;transform:translateX(-100%);z-index:1}.p-skeleton.p-skeleton-circle{border-radius:50%}.p-skeleton-none:after{animation:none}@keyframes p-skeleton-animation{0%{transform:translateX(-100%)}to{transform:translateX(100%)}}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Skeleton, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-skeleton',
                    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="containerStyle()">
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./skeleton.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], propDecorators: { styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], shape: [{
                type: Input
            }], animation: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], size: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }] } });
export class SkeletonModule {
}
SkeletonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SkeletonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SkeletonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SkeletonModule, declarations: [Skeleton], imports: [CommonModule], exports: [Skeleton] });
SkeletonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SkeletonModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SkeletonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Skeleton],
                    declarations: [Skeleton]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc2tlbGV0b24vc2tlbGV0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBZS9DLE1BQU0sT0FBTyxRQUFRO0lBYnJCO1FBbUJhLFVBQUssR0FBVyxXQUFXLENBQUM7UUFFNUIsY0FBUyxHQUFXLE1BQU0sQ0FBQztRQUUzQixpQkFBWSxHQUFXLElBQUksQ0FBQztRQUU1QixTQUFJLEdBQVcsSUFBSSxDQUFDO1FBRXBCLFVBQUssR0FBVyxNQUFNLENBQUM7UUFFdkIsV0FBTSxHQUFXLE1BQU0sQ0FBQztLQWdCcEM7SUFkRyxjQUFjO1FBQ1YsT0FBTztZQUNILHdCQUF3QixFQUFFLElBQUk7WUFDOUIsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRO1lBQzVDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTTtTQUMvQyxDQUFDO0lBQ04sQ0FBQztJQUVELGNBQWM7UUFDVixJQUFJLElBQUksQ0FBQyxJQUFJO1lBQ0wsdUNBQVcsSUFBSSxDQUFDLEtBQUssS0FBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksSUFBRTs7WUFFN0YsdUNBQVcsSUFBSSxDQUFDLEtBQUssS0FBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksSUFBRTtJQUM1RyxDQUFDOztxR0EvQlEsUUFBUTt5RkFBUixRQUFRLHFRQVhQOzs7S0FHVDsyRkFRUSxRQUFRO2tCQWJwQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUU7OztLQUdUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzdCLElBQUksRUFBRTt3QkFDRixPQUFPLEVBQUUsV0FBVztxQkFDdkI7aUJBQ0o7OEJBR1ksVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRUcsWUFBWTtzQkFBcEIsS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLE1BQU07c0JBQWQsS0FBSzs7QUF1QlYsTUFBTSxPQUFPLGNBQWM7OzJHQUFkLGNBQWM7NEdBQWQsY0FBYyxpQkF2Q2QsUUFBUSxhQW1DUCxZQUFZLGFBbkNiLFFBQVE7NEdBdUNSLGNBQWMsWUFKZCxDQUFDLFlBQVksQ0FBQzsyRkFJZCxjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc2tlbGV0b24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwiY29udGFpbmVyU3R5bGUoKVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2tlbGV0b24uY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2tlbGV0b24ge1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHNoYXBlOiBzdHJpbmcgPSBcInJlY3RhbmdsZVwiO1xuXG4gICAgQElucHV0KCkgYW5pbWF0aW9uOiBzdHJpbmcgPSBcIndhdmVcIjtcblxuICAgIEBJbnB1dCgpIGJvcmRlclJhZGl1czogc3RyaW5nID0gbnVsbDtcblxuICAgIEBJbnB1dCgpIHNpemU6IHN0cmluZyA9IG51bGw7XG5cbiAgICBASW5wdXQoKSB3aWR0aDogc3RyaW5nID0gXCIxMDAlXCI7XG5cbiAgICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZyA9IFwiMXJlbVwiO1xuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1za2VsZXRvbiBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1za2VsZXRvbi1jaXJjbGUnOiB0aGlzLnNoYXBlID09PSAnY2lyY2xlJyxcbiAgICAgICAgICAgICdwLXNrZWxldG9uLW5vbmUnOiB0aGlzLmFuaW1hdGlvbiA9PT0gJ25vbmUnXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29udGFpbmVyU3R5bGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnNpemUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsuLi50aGlzLnN0eWxlLCB3aWR0aDogdGhpcy5zaXplLCBoZWlnaHQ6IHRoaXMuc2l6ZSwgYm9yZGVyUmFkaXVzOiB0aGlzLmJvcmRlclJhZGl1c307XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsuLi50aGlzLnN0eWxlLCB3aWR0aDogdGhpcy53aWR0aCwgaGVpZ2h0OiB0aGlzLmhlaWdodCwgYm9yZGVyUmFkaXVzOiB0aGlzLmJvcmRlclJhZGl1c307XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtTa2VsZXRvbl0sXG4gICAgZGVjbGFyYXRpb25zOiBbU2tlbGV0b25dXG59KVxuZXhwb3J0IGNsYXNzIFNrZWxldG9uTW9kdWxlIHsgfVxuIl19