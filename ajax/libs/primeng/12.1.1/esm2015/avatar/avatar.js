import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class Avatar {
    constructor() {
        this.size = "normal";
        this.shape = "square";
    }
    containerClass() {
        return {
            'p-avatar p-component': true,
            'p-avatar-image': this.image != null,
            'p-avatar-circle': this.shape === 'circle',
            'p-avatar-lg': this.size === 'large',
            'p-avatar-xl': this.size === 'xlarge'
        };
    }
}
Avatar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Avatar, deps: [], target: i0.ɵɵFactoryTarget.Component });
Avatar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Avatar, selector: "p-avatar", inputs: { label: "label", icon: "icon", image: "image", size: "size", shape: "shape", style: "style", styleClass: "styleClass" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
            <span class="p-avatar-text" *ngIf="label; else iconTemplate">{{label}}</span>
            <ng-template #iconTemplate><span [class]="icon" [ngClass]="'p-avatar-icon'" *ngIf="icon; else imageTemplate"></span></ng-template>
            <ng-template #imageTemplate><img [src]="image" *ngIf="image"></ng-template>
        </div>
    `, isInline: true, styles: [".p-avatar{display:inline-flex;align-items:center;justify-content:center;width:2rem;height:2rem;font-size:1rem}.p-avatar.p-avatar-image{background-color:transparent}.p-avatar.p-avatar-circle{border-radius:50%;overflow:hidden}.p-avatar .p-avatar-icon{font-size:1rem}.p-avatar img{width:100%;height:100%}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Avatar, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-avatar',
                    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
            <span class="p-avatar-text" *ngIf="label; else iconTemplate">{{label}}</span>
            <ng-template #iconTemplate><span [class]="icon" [ngClass]="'p-avatar-icon'" *ngIf="icon; else imageTemplate"></span></ng-template>
            <ng-template #imageTemplate><img [src]="image" *ngIf="image"></ng-template>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./avatar.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], propDecorators: { label: [{
                type: Input
            }], icon: [{
                type: Input
            }], image: [{
                type: Input
            }], size: [{
                type: Input
            }], shape: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }] } });
export class AvatarModule {
}
AvatarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: AvatarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AvatarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: AvatarModule, declarations: [Avatar], imports: [CommonModule], exports: [Avatar] });
AvatarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: AvatarModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: AvatarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Avatar],
                    declarations: [Avatar]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2F2YXRhci9hdmF0YXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBbUIvQyxNQUFNLE9BQU8sTUFBTTtJQWpCbkI7UUF5QmEsU0FBSSxHQUFXLFFBQVEsQ0FBQztRQUV4QixVQUFLLEdBQVcsUUFBUSxDQUFDO0tBZXJDO0lBVEcsY0FBYztRQUNWLE9BQU87WUFDSCxzQkFBc0IsRUFBRSxJQUFJO1lBQzVCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSTtZQUNwQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVE7WUFDMUMsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTztZQUNwQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRO1NBQ3hDLENBQUM7SUFDTixDQUFDOzttR0F4QlEsTUFBTTt1RkFBTixNQUFNLHlOQWZMOzs7Ozs7O0tBT1Q7MkZBUVEsTUFBTTtrQkFqQmxCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFFBQVEsRUFBRTs7Ozs7OztLQU9UO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO29CQUMzQixJQUFJLEVBQUU7d0JBQ0YsT0FBTyxFQUFFLFdBQVc7cUJBQ3ZCO2lCQUNKOzhCQUdZLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7O0FBa0JWLE1BQU0sT0FBTyxZQUFZOzt5R0FBWixZQUFZOzBHQUFaLFlBQVksaUJBaENaLE1BQU0sYUE0QkwsWUFBWSxhQTVCYixNQUFNOzBHQWdDTixZQUFZLFlBSlosQ0FBQyxZQUFZLENBQUM7MkZBSWQsWUFBWTtrQkFMeEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztvQkFDakIsWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDO2lCQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1hdmF0YXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1hdmF0YXItdGV4dFwiICpuZ0lmPVwibGFiZWw7IGVsc2UgaWNvblRlbXBsYXRlXCI+e3tsYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNpY29uVGVtcGxhdGU+PHNwYW4gW2NsYXNzXT1cImljb25cIiBbbmdDbGFzc109XCIncC1hdmF0YXItaWNvbidcIiAqbmdJZj1cImljb247IGVsc2UgaW1hZ2VUZW1wbGF0ZVwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNpbWFnZVRlbXBsYXRlPjxpbWcgW3NyY109XCJpbWFnZVwiICpuZ0lmPVwiaW1hZ2VcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXZhdGFyLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEF2YXRhciB7XG5cbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaW1hZ2U6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHNpemU6IHN0cmluZyA9IFwibm9ybWFsXCI7XG5cbiAgICBASW5wdXQoKSBzaGFwZTogc3RyaW5nID0gXCJzcXVhcmVcIjtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBjb250YWluZXJDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLWF2YXRhciBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1hdmF0YXItaW1hZ2UnOiB0aGlzLmltYWdlICE9IG51bGwsXG4gICAgICAgICAgICAncC1hdmF0YXItY2lyY2xlJzogdGhpcy5zaGFwZSA9PT0gJ2NpcmNsZScsXG4gICAgICAgICAgICAncC1hdmF0YXItbGcnOiB0aGlzLnNpemUgPT09ICdsYXJnZScsXG4gICAgICAgICAgICAncC1hdmF0YXIteGwnOiB0aGlzLnNpemUgPT09ICd4bGFyZ2UnXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtBdmF0YXJdLFxuICAgIGRlY2xhcmF0aW9uczogW0F2YXRhcl1cbn0pXG5leHBvcnQgY2xhc3MgQXZhdGFyTW9kdWxlIHsgfVxuIl19