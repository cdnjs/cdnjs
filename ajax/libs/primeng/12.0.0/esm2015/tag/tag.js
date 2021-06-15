import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class Tag {
    containerClass() {
        return {
            'p-tag p-component': true,
            'p-tag-info': this.severity === 'info',
            'p-tag-success': this.severity === 'success',
            'p-tag-warning': this.severity === 'warning',
            'p-tag-danger': this.severity === 'danger',
            'p-tag-rounded': this.rounded
        };
    }
}
Tag.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Tag, deps: [], target: i0.ɵɵFactoryTarget.Component });
Tag.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: Tag, selector: "p-tag", inputs: { styleClass: "styleClass", style: "style", severity: "severity", value: "value", icon: "icon", rounded: "rounded" }, ngImport: i0, template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
            <span class="p-tag-icon" [ngClass]="icon" *ngIf="icon"></span>
            <span class="p-tag-value">{{value}}</span>
        </span>
    `, isInline: true, styles: [".p-tag{display:inline-flex;align-items:center;justify-content:center}.p-tag-icon,.p-tag-icon.pi,.p-tag-value{line-height:1.5}.p-tag.p-tag-rounded{border-radius:10rem}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Tag, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-tag',
                    template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
            <span class="p-tag-icon" [ngClass]="icon" *ngIf="icon"></span>
            <span class="p-tag-value">{{value}}</span>
        </span>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./tag.css']
                }]
        }], propDecorators: { styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], severity: [{
                type: Input
            }], value: [{
                type: Input
            }], icon: [{
                type: Input
            }], rounded: [{
                type: Input
            }] } });
export class TagModule {
}
TagModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TagModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TagModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TagModule, declarations: [Tag], imports: [CommonModule], exports: [Tag] });
TagModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TagModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TagModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Tag],
                    declarations: [Tag]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3RhZy90YWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBZS9DLE1BQU0sT0FBTyxHQUFHO0lBZVosY0FBYztRQUNWLE9BQU87WUFDSCxtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLFlBQVksRUFBRSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU07WUFDdEMsZUFBZSxFQUFFLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUztZQUM1QyxlQUFlLEVBQUUsSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTO1lBQzVDLGNBQWMsRUFBRSxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVE7WUFDMUMsZUFBZSxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ2hDLENBQUM7SUFDTixDQUFDOztnR0F4QlEsR0FBRztvRkFBSCxHQUFHLDJLQVhGOzs7Ozs7S0FNVDsyRkFLUSxHQUFHO2tCQWJmLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLE9BQU87b0JBQ2pCLFFBQVEsRUFBRTs7Ozs7O0tBTVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUM7aUJBQzNCOzhCQUdZLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFRyxPQUFPO3NCQUFmLEtBQUs7O0FBb0JWLE1BQU0sT0FBTyxTQUFTOztzR0FBVCxTQUFTO3VHQUFULFNBQVMsaUJBaENULEdBQUcsYUE0QkYsWUFBWSxhQTVCYixHQUFHO3VHQWdDSCxTQUFTLFlBSlQsQ0FBQyxZQUFZLENBQUM7MkZBSWQsU0FBUztrQkFMckIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQztvQkFDZCxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ3RCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdGFnJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJjb250YWluZXJDbGFzcygpXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXRhZy1pY29uXCIgW25nQ2xhc3NdPVwiaWNvblwiICpuZ0lmPVwiaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC10YWctdmFsdWVcIj57e3ZhbHVlfX08L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFnLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRhZyB7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc2V2ZXJpdHk6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcm91bmRlZDogYm9vbGVhbjtcbiAgICBcblxuICAgIGNvbnRhaW5lckNsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtdGFnIHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICdwLXRhZy1pbmZvJzogdGhpcy5zZXZlcml0eSA9PT0gJ2luZm8nLFxuICAgICAgICAgICAgJ3AtdGFnLXN1Y2Nlc3MnOiB0aGlzLnNldmVyaXR5ID09PSAnc3VjY2VzcycsXG4gICAgICAgICAgICAncC10YWctd2FybmluZyc6IHRoaXMuc2V2ZXJpdHkgPT09ICd3YXJuaW5nJyxcbiAgICAgICAgICAgICdwLXRhZy1kYW5nZXInOiB0aGlzLnNldmVyaXR5ID09PSAnZGFuZ2VyJyxcbiAgICAgICAgICAgICdwLXRhZy1yb3VuZGVkJzogdGhpcy5yb3VuZGVkXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtUYWddLFxuICAgIGRlY2xhcmF0aW9uczogW1RhZ11cbn0pXG5leHBvcnQgY2xhc3MgVGFnTW9kdWxlIHsgfVxuIl19