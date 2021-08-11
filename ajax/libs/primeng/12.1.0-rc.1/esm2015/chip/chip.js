import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class Chip {
    constructor() {
        this.removeIcon = "pi pi-times-circle";
        this.onRemove = new EventEmitter();
        this.visible = true;
    }
    containerClass() {
        return {
            'p-chip p-component': true,
            'p-chip-image': this.image != null
        };
    }
    close(event) {
        this.visible = false;
        this.onRemove.emit(event);
    }
}
Chip.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Chip, deps: [], target: i0.ɵɵFactoryTarget.Component });
Chip.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Chip, selector: "p-chip", inputs: { label: "label", icon: "icon", image: "image", style: "style", styleClass: "styleClass", removable: "removable", removeIcon: "removeIcon" }, outputs: { onRemove: "onRemove" }, ngImport: i0, template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" *ngIf="visible">
            <ng-content></ng-content>
            <img [src]="image" *ngIf="image;else iconTemplate">
            <ng-template #iconTemplate><span *ngIf="icon" [class]="icon" [ngClass]="'p-chip-icon'"></span></ng-template>
            <div class="p-chip-text" *ngIf="label">{{label}}</div>
            <span *ngIf="removable" tabindex="0" [class]="removeIcon" [ngClass]="'pi-chip-remove-icon'" (click)="close($event)" (keydown.enter)="close($event)"></span>
        </div>
    `, isInline: true, styles: [".p-chip{display:inline-flex;align-items:center}.p-chip-icon.pi,.p-chip-text{line-height:1.5}.pi-chip-remove-icon{line-height:1.5;cursor:pointer}.p-chip img{border-radius:50%}"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Chip, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-chip',
                    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" *ngIf="visible">
            <ng-content></ng-content>
            <img [src]="image" *ngIf="image;else iconTemplate">
            <ng-template #iconTemplate><span *ngIf="icon" [class]="icon" [ngClass]="'p-chip-icon'"></span></ng-template>
            <div class="p-chip-text" *ngIf="label">{{label}}</div>
            <span *ngIf="removable" tabindex="0" [class]="removeIcon" [ngClass]="'pi-chip-remove-icon'" (click)="close($event)" (keydown.enter)="close($event)"></span>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./chip.css']
                }]
        }], propDecorators: { label: [{
                type: Input
            }], icon: [{
                type: Input
            }], image: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], removable: [{
                type: Input
            }], removeIcon: [{
                type: Input
            }], onRemove: [{
                type: Output
            }] } });
export class ChipModule {
}
ChipModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ChipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ChipModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ChipModule, declarations: [Chip], imports: [CommonModule], exports: [Chip] });
ChipModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ChipModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ChipModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Chip],
                    declarations: [Chip]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9jaGlwL2NoaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0gsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFpQi9DLE1BQU0sT0FBTyxJQUFJO0lBZmpCO1FBNkJhLGVBQVUsR0FBVyxvQkFBb0IsQ0FBQztRQUV6QyxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFM0QsWUFBTyxHQUFZLElBQUksQ0FBQztLQWEzQjtJQVhHLGNBQWM7UUFDVixPQUFPO1lBQ0gsb0JBQW9CLEVBQUUsSUFBSTtZQUMxQixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJO1NBQ3JDLENBQUM7SUFDTixDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQUs7UUFDUCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM3QixDQUFDOztpR0E5QlEsSUFBSTtxRkFBSixJQUFJLHVPQWJIOzs7Ozs7OztLQVFUOzJGQUtRLElBQUk7a0JBZmhCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLFFBQVEsRUFBRTs7Ozs7Ozs7S0FRVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQztpQkFDNUI7OEJBR1ksS0FBSztzQkFBYixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsU0FBUztzQkFBakIsS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVJLFFBQVE7c0JBQWpCLE1BQU07O0FBc0JYLE1BQU0sT0FBTyxVQUFVOzt1R0FBVixVQUFVO3dHQUFWLFVBQVUsaUJBdENWLElBQUksYUFrQ0gsWUFBWSxhQWxDYixJQUFJO3dHQXNDSixVQUFVLFlBSlYsQ0FBQyxZQUFZLENBQUM7MkZBSWQsVUFBVTtrQkFMdEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztvQkFDZixZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUM7aUJBQ3ZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1jaGlwJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzKClcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgKm5nSWY9XCJ2aXNpYmxlXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8aW1nIFtzcmNdPVwiaW1hZ2VcIiAqbmdJZj1cImltYWdlO2Vsc2UgaWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2ljb25UZW1wbGF0ZT48c3BhbiAqbmdJZj1cImljb25cIiBbY2xhc3NdPVwiaWNvblwiIFtuZ0NsYXNzXT1cIidwLWNoaXAtaWNvbidcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWNoaXAtdGV4dFwiICpuZ0lmPVwibGFiZWxcIj57e2xhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwicmVtb3ZhYmxlXCIgdGFiaW5kZXg9XCIwXCIgW2NsYXNzXT1cInJlbW92ZUljb25cIiBbbmdDbGFzc109XCIncGktY2hpcC1yZW1vdmUtaWNvbidcIiAoY2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImNsb3NlKCRldmVudClcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9jaGlwLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENoaXAge1xuXG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGljb246IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGltYWdlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcmVtb3ZhYmxlOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcmVtb3ZlSWNvbjogc3RyaW5nID0gXCJwaSBwaS10aW1lcy1jaXJjbGVcIjtcblxuICAgIEBPdXRwdXQoKSBvblJlbW92ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICB2aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnRhaW5lckNsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtY2hpcCBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1jaGlwLWltYWdlJzogdGhpcy5pbWFnZSAhPSBudWxsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2xvc2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25SZW1vdmUuZW1pdChldmVudClcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0NoaXBdLFxuICAgIGRlY2xhcmF0aW9uczogW0NoaXBdXG59KVxuZXhwb3J0IGNsYXNzIENoaXBNb2R1bGUgeyB9XG4iXX0=