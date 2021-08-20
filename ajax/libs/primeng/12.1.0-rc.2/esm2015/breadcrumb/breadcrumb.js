import { NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/tooltip";
import * as i3 from "@angular/router";
export class Breadcrumb {
    constructor() {
        this.onItemClick = new EventEmitter();
    }
    itemClick(event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        this.onItemClick.emit({
            originalEvent: event,
            item: item
        });
    }
    onHomeClick(event) {
        if (this.home) {
            this.itemClick(event, this.home);
        }
    }
}
Breadcrumb.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Breadcrumb, deps: [], target: i0.ɵɵFactoryTarget.Component });
Breadcrumb.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Breadcrumb, selector: "p-breadcrumb", inputs: { model: "model", style: "style", styleClass: "styleClass", home: "home" }, outputs: { onItemClick: "onItemClick" }, ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-breadcrumb p-component'">
            <ul>
                <li [class]="home.styleClass" [ngClass]="{'p-breadcrumb-home': true, 'p-disabled':home.disabled}" [ngStyle]="home.style" *ngIf="home" pTooltip [tooltipOptions]="home.tooltipOptions">
                    <a *ngIf="!home.routerLink" [href]="home.url ? home.url : null" class="p-menuitem-link" (click)="itemClick($event, home)"
                        [attr.target]="home.target" [attr.title]="home.title" [attr.id]="home.id" [attr.tabindex]="home.disabled ? null : '0'">
                        <span *ngIf="home.icon" class="p-menuitem-icon" [ngClass]="home.icon||'pi pi-home'"></span>
                        <ng-container *ngIf="home.label">
                            <span *ngIf="home.escape !== false; else htmlHomeLabel" class="p-menuitem-text">{{home.label}}</span>
                            <ng-template #htmlHomeLabel><span class="p-menuitem-text" [innerHTML]="home.label"></span></ng-template>
                        </ng-container>
                    </a>
                    <a *ngIf="home.routerLink" [routerLink]="home.routerLink" [queryParams]="home.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="home.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link" (click)="itemClick($event, home)"
                        [attr.target]="home.target" [attr.title]="home.title" [attr.id]="home.id" [attr.tabindex]="home.disabled ? null : '0'"
                        [fragment]="home.fragment" [queryParamsHandling]="home.queryParamsHandling" [preserveFragment]="home.preserveFragment" [skipLocationChange]="home.skipLocationChange" [replaceUrl]="home.replaceUrl" [state]="home.state">
                        <span *ngIf="home.icon" class="p-menuitem-icon" [ngClass]="home.icon||'pi pi-home'"></span>
                        <ng-container *ngIf="home.label">
                            <span *ngIf="home.escape !== false; else htmlHomeRouteLabel" class="p-menuitem-text">{{home.label}}</span>
                            <ng-template #htmlHomeRouteLabel><span class="p-menuitem-text" [innerHTML]="home.label"></span></ng-template>
                        </ng-container>
                    </a>
                </li>
                <li class="p-breadcrumb-chevron pi pi-chevron-right" *ngIf="model&&home"></li>
                <ng-template ngFor let-item let-end="last" [ngForOf]="model">
                    <li [class]="item.styleClass" [ngStyle]="item.style" [ngClass]="{'p-disabled':item.disabled}">
                        <a *ngIf="!item.routerLink" [attr.href]="item.url ? item.url : null" class="p-menuitem-link" (click)="itemClick($event, item)" pTooltip [tooltipOptions]="item.tooltipOptions"
                            [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id" [attr.tabindex]="item.disabled ? null : '0'">
                            <span *ngIf="item.icon" class="p-menuitem-icon" [ngClass]="item.icon"></span>
                            <ng-container *ngIf="item.label">
                                <span *ngIf="item.escape !== false; else htmlLabel" class="p-menuitem-text">{{item.label}}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            </ng-container>
                        </a>
                        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams" [routerLinkActive]="'p-menuitem-link-active'"  [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link" (click)="itemClick($event, item)"
                            [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id" [attr.tabindex]="item.disabled ? null : '0'"
                            [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                            <span *ngIf="item.icon" class="p-menuitem-icon" [ngClass]="item.icon"></span>
                            <ng-container *ngIf="item.label">
                                <span *ngIf="item.escape !== false; else htmlRouteLabel" class="p-menuitem-text">{{item.label}}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            </ng-container>
                        </a>
                    </li>
                    <li class="p-breadcrumb-chevron pi pi-chevron-right" *ngIf="!end"></li>
                </ng-template>
            </ul>
        </div>
    `, isInline: true, styles: [".p-breadcrumb{overflow-x:auto}.p-breadcrumb ul{margin:0;padding:0;list-style-type:none;display:flex;align-items:center;flex-wrap:nowrap}.p-breadcrumb .p-menuitem-text{line-height:1}.p-breadcrumb .p-menuitem-link{text-decoration:none}"], directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i3.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Breadcrumb, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-breadcrumb',
                    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-breadcrumb p-component'">
            <ul>
                <li [class]="home.styleClass" [ngClass]="{'p-breadcrumb-home': true, 'p-disabled':home.disabled}" [ngStyle]="home.style" *ngIf="home" pTooltip [tooltipOptions]="home.tooltipOptions">
                    <a *ngIf="!home.routerLink" [href]="home.url ? home.url : null" class="p-menuitem-link" (click)="itemClick($event, home)"
                        [attr.target]="home.target" [attr.title]="home.title" [attr.id]="home.id" [attr.tabindex]="home.disabled ? null : '0'">
                        <span *ngIf="home.icon" class="p-menuitem-icon" [ngClass]="home.icon||'pi pi-home'"></span>
                        <ng-container *ngIf="home.label">
                            <span *ngIf="home.escape !== false; else htmlHomeLabel" class="p-menuitem-text">{{home.label}}</span>
                            <ng-template #htmlHomeLabel><span class="p-menuitem-text" [innerHTML]="home.label"></span></ng-template>
                        </ng-container>
                    </a>
                    <a *ngIf="home.routerLink" [routerLink]="home.routerLink" [queryParams]="home.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="home.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link" (click)="itemClick($event, home)"
                        [attr.target]="home.target" [attr.title]="home.title" [attr.id]="home.id" [attr.tabindex]="home.disabled ? null : '0'"
                        [fragment]="home.fragment" [queryParamsHandling]="home.queryParamsHandling" [preserveFragment]="home.preserveFragment" [skipLocationChange]="home.skipLocationChange" [replaceUrl]="home.replaceUrl" [state]="home.state">
                        <span *ngIf="home.icon" class="p-menuitem-icon" [ngClass]="home.icon||'pi pi-home'"></span>
                        <ng-container *ngIf="home.label">
                            <span *ngIf="home.escape !== false; else htmlHomeRouteLabel" class="p-menuitem-text">{{home.label}}</span>
                            <ng-template #htmlHomeRouteLabel><span class="p-menuitem-text" [innerHTML]="home.label"></span></ng-template>
                        </ng-container>
                    </a>
                </li>
                <li class="p-breadcrumb-chevron pi pi-chevron-right" *ngIf="model&&home"></li>
                <ng-template ngFor let-item let-end="last" [ngForOf]="model">
                    <li [class]="item.styleClass" [ngStyle]="item.style" [ngClass]="{'p-disabled':item.disabled}">
                        <a *ngIf="!item.routerLink" [attr.href]="item.url ? item.url : null" class="p-menuitem-link" (click)="itemClick($event, item)" pTooltip [tooltipOptions]="item.tooltipOptions"
                            [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id" [attr.tabindex]="item.disabled ? null : '0'">
                            <span *ngIf="item.icon" class="p-menuitem-icon" [ngClass]="item.icon"></span>
                            <ng-container *ngIf="item.label">
                                <span *ngIf="item.escape !== false; else htmlLabel" class="p-menuitem-text">{{item.label}}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            </ng-container>
                        </a>
                        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams" [routerLinkActive]="'p-menuitem-link-active'"  [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link" (click)="itemClick($event, item)"
                            [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id" [attr.tabindex]="item.disabled ? null : '0'"
                            [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                            <span *ngIf="item.icon" class="p-menuitem-icon" [ngClass]="item.icon"></span>
                            <ng-container *ngIf="item.label">
                                <span *ngIf="item.escape !== false; else htmlRouteLabel" class="p-menuitem-text">{{item.label}}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            </ng-container>
                        </a>
                    </li>
                    <li class="p-breadcrumb-chevron pi pi-chevron-right" *ngIf="!end"></li>
                </ng-template>
            </ul>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./breadcrumb.css']
                }]
        }], propDecorators: { model: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], home: [{
                type: Input
            }], onItemClick: [{
                type: Output
            }] } });
export class BreadcrumbModule {
}
BreadcrumbModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: BreadcrumbModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BreadcrumbModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: BreadcrumbModule, declarations: [Breadcrumb], imports: [CommonModule, RouterModule, TooltipModule], exports: [Breadcrumb, RouterModule, TooltipModule] });
BreadcrumbModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: BreadcrumbModule, imports: [[CommonModule, RouterModule, TooltipModule], RouterModule, TooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: BreadcrumbModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, TooltipModule],
                    exports: [Breadcrumb, RouterModule, TooltipModule],
                    declarations: [Breadcrumb]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9icmVhZGNydW1iL2JyZWFkY3J1bWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBd0Q5QyxNQUFNLE9BQU8sVUFBVTtJQXREdkI7UUFnRWMsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztLQThCakU7SUE1QkcsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFjO1FBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLElBQUksRUFBRSxJQUFJO2FBQ2IsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNsQixhQUFhLEVBQUUsS0FBSztZQUNwQixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNiLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7O3VHQXZDUSxVQUFVOzJGQUFWLFVBQVUsaUxBcERUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQStDVDsyRkFLUSxVQUFVO2tCQXREdEIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQStDVDtvQkFDRixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDOUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2lCQUNsQzs4QkFHWSxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUVJLFdBQVc7c0JBQXBCLE1BQU07O0FBcUNYLE1BQU0sT0FBTyxnQkFBZ0I7OzZHQUFoQixnQkFBZ0I7OEdBQWhCLGdCQUFnQixpQkEvQ2hCLFVBQVUsYUEyQ1QsWUFBWSxFQUFDLFlBQVksRUFBQyxhQUFhLGFBM0N4QyxVQUFVLEVBNENFLFlBQVksRUFBQyxhQUFhOzhHQUd0QyxnQkFBZ0IsWUFKaEIsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLGFBQWEsQ0FBQyxFQUM3QixZQUFZLEVBQUMsYUFBYTsyRkFHdEMsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsYUFBYSxDQUFDO29CQUNsRCxPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUMsWUFBWSxFQUFDLGFBQWEsQ0FBQztvQkFDaEQsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDO2lCQUM3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01lbnVJdGVtfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7VG9vbHRpcE1vZHVsZX0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWJyZWFkY3J1bWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cIidwLWJyZWFkY3J1bWIgcC1jb21wb25lbnQnXCI+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgPGxpIFtjbGFzc109XCJob21lLnN0eWxlQ2xhc3NcIiBbbmdDbGFzc109XCJ7J3AtYnJlYWRjcnVtYi1ob21lJzogdHJ1ZSwgJ3AtZGlzYWJsZWQnOmhvbWUuZGlzYWJsZWR9XCIgW25nU3R5bGVdPVwiaG9tZS5zdHlsZVwiICpuZ0lmPVwiaG9tZVwiIHBUb29sdGlwIFt0b29sdGlwT3B0aW9uc109XCJob21lLnRvb2x0aXBPcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIWhvbWUucm91dGVyTGlua1wiIFtocmVmXT1cImhvbWUudXJsID8gaG9tZS51cmwgOiBudWxsXCIgY2xhc3M9XCJwLW1lbnVpdGVtLWxpbmtcIiAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgaG9tZSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFyZ2V0XT1cImhvbWUudGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiaG9tZS50aXRsZVwiIFthdHRyLmlkXT1cImhvbWUuaWRcIiBbYXR0ci50YWJpbmRleF09XCJob21lLmRpc2FibGVkID8gbnVsbCA6ICcwJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJob21lLmljb25cIiBjbGFzcz1cInAtbWVudWl0ZW0taWNvblwiIFtuZ0NsYXNzXT1cImhvbWUuaWNvbnx8J3BpIHBpLWhvbWUnXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhvbWUubGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImhvbWUuZXNjYXBlICE9PSBmYWxzZTsgZWxzZSBodG1sSG9tZUxhYmVsXCIgY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIj57e2hvbWUubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxIb21lTGFiZWw+PHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cImhvbWUubGFiZWxcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiaG9tZS5yb3V0ZXJMaW5rXCIgW3JvdXRlckxpbmtdPVwiaG9tZS5yb3V0ZXJMaW5rXCIgW3F1ZXJ5UGFyYW1zXT1cImhvbWUucXVlcnlQYXJhbXNcIiBbcm91dGVyTGlua0FjdGl2ZV09XCIncC1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIiBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiaG9tZS5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc3x8e2V4YWN0OmZhbHNlfVwiIGNsYXNzPVwicC1tZW51aXRlbS1saW5rXCIgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGhvbWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhcmdldF09XCJob21lLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cImhvbWUudGl0bGVcIiBbYXR0ci5pZF09XCJob21lLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiaG9tZS5kaXNhYmxlZCA/IG51bGwgOiAnMCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cImhvbWUuZnJhZ21lbnRcIiBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJob21lLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIiBbcHJlc2VydmVGcmFnbWVudF09XCJob21lLnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cImhvbWUuc2tpcExvY2F0aW9uQ2hhbmdlXCIgW3JlcGxhY2VVcmxdPVwiaG9tZS5yZXBsYWNlVXJsXCIgW3N0YXRlXT1cImhvbWUuc3RhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaG9tZS5pY29uXCIgY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJob21lLmljb258fCdwaSBwaS1ob21lJ1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJob21lLmxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJob21lLmVzY2FwZSAhPT0gZmFsc2U7IGVsc2UgaHRtbEhvbWVSb3V0ZUxhYmVsXCIgY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIj57e2hvbWUubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxIb21lUm91dGVMYWJlbD48c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiIFtpbm5lckhUTUxdPVwiaG9tZS5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInAtYnJlYWRjcnVtYi1jaGV2cm9uIHBpIHBpLWNoZXZyb24tcmlnaHRcIiAqbmdJZj1cIm1vZGVsJiZob21lXCI+PC9saT5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gbGV0LWVuZD1cImxhc3RcIiBbbmdGb3JPZl09XCJtb2RlbFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgW2NsYXNzXT1cIml0ZW0uc3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cIml0ZW0uc3R5bGVcIiBbbmdDbGFzc109XCJ7J3AtZGlzYWJsZWQnOml0ZW0uZGlzYWJsZWR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFpdGVtLnJvdXRlckxpbmtcIiBbYXR0ci5ocmVmXT1cIml0ZW0udXJsID8gaXRlbS51cmwgOiBudWxsXCIgY2xhc3M9XCJwLW1lbnVpdGVtLWxpbmtcIiAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgaXRlbSlcIiBwVG9vbHRpcCBbdG9vbHRpcE9wdGlvbnNdPVwiaXRlbS50b29sdGlwT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFyZ2V0XT1cIml0ZW0udGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiaXRlbS50aXRsZVwiIFthdHRyLmlkXT1cIml0ZW0uaWRcIiBbYXR0ci50YWJpbmRleF09XCJpdGVtLmRpc2FibGVkID8gbnVsbCA6ICcwJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5pY29uXCIgY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIml0ZW0ubGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpdGVtLmVzY2FwZSAhPT0gZmFsc2U7IGVsc2UgaHRtbExhYmVsXCIgY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sTGFiZWw+PHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cIml0ZW0ubGFiZWxcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiaXRlbS5yb3V0ZXJMaW5rXCIgW3JvdXRlckxpbmtdPVwiaXRlbS5yb3V0ZXJMaW5rXCIgW3F1ZXJ5UGFyYW1zXT1cIml0ZW0ucXVlcnlQYXJhbXNcIiBbcm91dGVyTGlua0FjdGl2ZV09XCIncC1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIiAgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cIml0ZW0ucm91dGVyTGlua0FjdGl2ZU9wdGlvbnN8fHtleGFjdDpmYWxzZX1cIiBjbGFzcz1cInAtbWVudWl0ZW0tbGlua1wiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFyZ2V0XT1cIml0ZW0udGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiaXRlbS50aXRsZVwiIFthdHRyLmlkXT1cIml0ZW0uaWRcIiBbYXR0ci50YWJpbmRleF09XCJpdGVtLmRpc2FibGVkID8gbnVsbCA6ICcwJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cIml0ZW0uZnJhZ21lbnRcIiBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJpdGVtLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIiBbcHJlc2VydmVGcmFnbWVudF09XCJpdGVtLnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cIml0ZW0uc2tpcExvY2F0aW9uQ2hhbmdlXCIgW3JlcGxhY2VVcmxdPVwiaXRlbS5yZXBsYWNlVXJsXCIgW3N0YXRlXT1cIml0ZW0uc3RhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0uaWNvblwiIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtLmxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxSb3V0ZUxhYmVsXCIgY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sUm91dGVMYWJlbD48c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiIFtpbm5lckhUTUxdPVwiaXRlbS5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwLWJyZWFkY3J1bWItY2hldnJvbiBwaSBwaS1jaGV2cm9uLXJpZ2h0XCIgKm5nSWY9XCIhZW5kXCI+PC9saT5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vYnJlYWRjcnVtYi5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iIHtcblxuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGhvbWU6IE1lbnVJdGVtO1xuXG4gICAgQE91dHB1dCgpIG9uSXRlbUNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGl0ZW1DbGljayhldmVudCwgaXRlbTogTWVudUl0ZW0pwqB7XG4gICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpdGVtLnVybCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtLmNvbW1hbmQpIHtcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uSXRlbUNsaWNrLmVtaXQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uSG9tZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmhvbWUpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbUNsaWNrKGV2ZW50LCB0aGlzLmhvbWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsUm91dGVyTW9kdWxlLFRvb2x0aXBNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtCcmVhZGNydW1iLFJvdXRlck1vZHVsZSxUb29sdGlwTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtCcmVhZGNydW1iXVxufSlcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iTW9kdWxlIHsgfVxuIl19