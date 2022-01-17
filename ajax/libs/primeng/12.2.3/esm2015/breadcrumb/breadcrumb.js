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
Breadcrumb.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Breadcrumb, selector: "p-breadcrumb", inputs: { model: "model", style: "style", styleClass: "styleClass", home: "home", homeAriaLabel: "homeAriaLabel" }, outputs: { onItemClick: "onItemClick" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-breadcrumb p-component'">
            <ul>
                <li [class]="home.styleClass" [ngClass]="{'p-breadcrumb-home': true, 'p-disabled':home.disabled}" [ngStyle]="home.style" *ngIf="home" pTooltip [tooltipOptions]="home.tooltipOptions">
                    <a *ngIf="!home.routerLink" [attr.aria-label]="homeAriaLabel" [href]="home.url ? home.url : null" class="p-menuitem-link" (click)="itemClick($event, home)"
                        [attr.target]="home.target" [attr.title]="home.title" [attr.id]="home.id" [attr.tabindex]="home.disabled ? null : '0'">
                        <span *ngIf="home.icon" class="p-menuitem-icon" [ngClass]="home.icon||'pi pi-home'"></span>
                        <ng-container *ngIf="home.label">
                            <span *ngIf="home.escape !== false; else htmlHomeLabel" class="p-menuitem-text">{{home.label}}</span>
                            <ng-template #htmlHomeLabel><span class="p-menuitem-text" [innerHTML]="home.label"></span></ng-template>
                        </ng-container>
                    </a>
                    <a *ngIf="home.routerLink" [routerLink]="home.routerLink" [attr.aria-label]="homeAriaLabel" [queryParams]="home.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="home.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link" (click)="itemClick($event, home)"
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
    `, isInline: true, styles: [".p-breadcrumb{overflow-x:auto}.p-breadcrumb ul{margin:0;padding:0;list-style-type:none;display:flex;align-items:center;flex-wrap:nowrap}.p-breadcrumb .p-menuitem-text{line-height:1}.p-breadcrumb .p-menuitem-link{text-decoration:none}.p-breadcrumb::-webkit-scrollbar{display:none}"], directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i3.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Breadcrumb, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-breadcrumb',
                    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-breadcrumb p-component'">
            <ul>
                <li [class]="home.styleClass" [ngClass]="{'p-breadcrumb-home': true, 'p-disabled':home.disabled}" [ngStyle]="home.style" *ngIf="home" pTooltip [tooltipOptions]="home.tooltipOptions">
                    <a *ngIf="!home.routerLink" [attr.aria-label]="homeAriaLabel" [href]="home.url ? home.url : null" class="p-menuitem-link" (click)="itemClick($event, home)"
                        [attr.target]="home.target" [attr.title]="home.title" [attr.id]="home.id" [attr.tabindex]="home.disabled ? null : '0'">
                        <span *ngIf="home.icon" class="p-menuitem-icon" [ngClass]="home.icon||'pi pi-home'"></span>
                        <ng-container *ngIf="home.label">
                            <span *ngIf="home.escape !== false; else htmlHomeLabel" class="p-menuitem-text">{{home.label}}</span>
                            <ng-template #htmlHomeLabel><span class="p-menuitem-text" [innerHTML]="home.label"></span></ng-template>
                        </ng-container>
                    </a>
                    <a *ngIf="home.routerLink" [routerLink]="home.routerLink" [attr.aria-label]="homeAriaLabel" [queryParams]="home.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="home.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link" (click)="itemClick($event, home)"
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
                    styleUrls: ['./breadcrumb.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], propDecorators: { model: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], home: [{
                type: Input
            }], homeAriaLabel: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9icmVhZGNydW1iL2JyZWFkY3J1bWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBMkQ5QyxNQUFNLE9BQU8sVUFBVTtJQXpEdkI7UUFxRWMsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztLQThCakU7SUE1QkcsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFjO1FBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLElBQUksRUFBRSxJQUFJO2FBQ2IsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNsQixhQUFhLEVBQUUsS0FBSztZQUNwQixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNiLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7O3VHQXpDUSxVQUFVOzJGQUFWLFVBQVUsd1BBdkRUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQStDVDsyRkFRUSxVQUFVO2tCQXpEdEIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQStDVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO29CQUMvQixJQUFJLEVBQUU7d0JBQ0YsT0FBTyxFQUFFLFdBQVc7cUJBQ3ZCO2lCQUNKOzhCQUdZLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRUcsYUFBYTtzQkFBckIsS0FBSztnQkFFSSxXQUFXO3NCQUFwQixNQUFNOztBQXFDWCxNQUFNLE9BQU8sZ0JBQWdCOzs2R0FBaEIsZ0JBQWdCOzhHQUFoQixnQkFBZ0IsaUJBakRoQixVQUFVLGFBNkNULFlBQVksRUFBQyxZQUFZLEVBQUMsYUFBYSxhQTdDeEMsVUFBVSxFQThDRSxZQUFZLEVBQUMsYUFBYTs4R0FHdEMsZ0JBQWdCLFlBSmhCLENBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxhQUFhLENBQUMsRUFDN0IsWUFBWSxFQUFDLGFBQWE7MkZBR3RDLGdCQUFnQjtrQkFMNUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLGFBQWEsQ0FBQztvQkFDbEQsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxhQUFhLENBQUM7b0JBQ2hELFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQztpQkFDN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtNZW51SXRlbX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtSb3V0ZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1Rvb2x0aXBNb2R1bGV9IGZyb20gJ3ByaW1lbmcvdG9vbHRpcCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1icmVhZGNydW1iJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbbmdDbGFzc109XCIncC1icmVhZGNydW1iIHAtY29tcG9uZW50J1wiPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIDxsaSBbY2xhc3NdPVwiaG9tZS5zdHlsZUNsYXNzXCIgW25nQ2xhc3NdPVwieydwLWJyZWFkY3J1bWItaG9tZSc6IHRydWUsICdwLWRpc2FibGVkJzpob21lLmRpc2FibGVkfVwiIFtuZ1N0eWxlXT1cImhvbWUuc3R5bGVcIiAqbmdJZj1cImhvbWVcIiBwVG9vbHRpcCBbdG9vbHRpcE9wdGlvbnNdPVwiaG9tZS50b29sdGlwT3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFob21lLnJvdXRlckxpbmtcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImhvbWVBcmlhTGFiZWxcIiBbaHJlZl09XCJob21lLnVybCA/IGhvbWUudXJsIDogbnVsbFwiIGNsYXNzPVwicC1tZW51aXRlbS1saW5rXCIgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGhvbWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhcmdldF09XCJob21lLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cImhvbWUudGl0bGVcIiBbYXR0ci5pZF09XCJob21lLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiaG9tZS5kaXNhYmxlZCA/IG51bGwgOiAnMCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaG9tZS5pY29uXCIgY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJob21lLmljb258fCdwaSBwaS1ob21lJ1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJob21lLmxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJob21lLmVzY2FwZSAhPT0gZmFsc2U7IGVsc2UgaHRtbEhvbWVMYWJlbFwiIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCI+e3tob21lLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sSG9tZUxhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJob21lLmxhYmVsXCI+PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cImhvbWUucm91dGVyTGlua1wiIFtyb3V0ZXJMaW5rXT1cImhvbWUucm91dGVyTGlua1wiIFthdHRyLmFyaWEtbGFiZWxdPVwiaG9tZUFyaWFMYWJlbFwiIFtxdWVyeVBhcmFtc109XCJob21lLnF1ZXJ5UGFyYW1zXCIgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3AtbWVudWl0ZW0tbGluay1hY3RpdmUnXCIgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cImhvbWUucm91dGVyTGlua0FjdGl2ZU9wdGlvbnN8fHtleGFjdDpmYWxzZX1cIiBjbGFzcz1cInAtbWVudWl0ZW0tbGlua1wiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBob21lKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YXJnZXRdPVwiaG9tZS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJob21lLnRpdGxlXCIgW2F0dHIuaWRdPVwiaG9tZS5pZFwiIFthdHRyLnRhYmluZGV4XT1cImhvbWUuZGlzYWJsZWQgPyBudWxsIDogJzAnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmcmFnbWVudF09XCJob21lLmZyYWdtZW50XCIgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiaG9tZS5xdWVyeVBhcmFtc0hhbmRsaW5nXCIgW3ByZXNlcnZlRnJhZ21lbnRdPVwiaG9tZS5wcmVzZXJ2ZUZyYWdtZW50XCIgW3NraXBMb2NhdGlvbkNoYW5nZV09XCJob21lLnNraXBMb2NhdGlvbkNoYW5nZVwiIFtyZXBsYWNlVXJsXT1cImhvbWUucmVwbGFjZVVybFwiIFtzdGF0ZV09XCJob21lLnN0YXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImhvbWUuaWNvblwiIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiaG9tZS5pY29ufHwncGkgcGktaG9tZSdcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaG9tZS5sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaG9tZS5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxIb21lUm91dGVMYWJlbFwiIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCI+e3tob21lLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sSG9tZVJvdXRlTGFiZWw+PHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cImhvbWUubGFiZWxcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwLWJyZWFkY3J1bWItY2hldnJvbiBwaSBwaS1jaGV2cm9uLXJpZ2h0XCIgKm5nSWY9XCJtb2RlbCYmaG9tZVwiPjwvbGk+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1pdGVtIGxldC1lbmQ9XCJsYXN0XCIgW25nRm9yT2ZdPVwibW9kZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIFtjbGFzc109XCJpdGVtLnN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJpdGVtLnN0eWxlXCIgW25nQ2xhc3NdPVwieydwLWRpc2FibGVkJzppdGVtLmRpc2FibGVkfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhaXRlbS5yb3V0ZXJMaW5rXCIgW2F0dHIuaHJlZl09XCJpdGVtLnVybCA/IGl0ZW0udXJsIDogbnVsbFwiIGNsYXNzPVwicC1tZW51aXRlbS1saW5rXCIgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGl0ZW0pXCIgcFRvb2x0aXAgW3Rvb2x0aXBPcHRpb25zXT1cIml0ZW0udG9vbHRpcE9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhcmdldF09XCJpdGVtLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cIml0ZW0udGl0bGVcIiBbYXR0ci5pZF09XCJpdGVtLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS5kaXNhYmxlZCA/IG51bGwgOiAnMCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0uaWNvblwiIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtLmxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxMYWJlbFwiIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbExhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJpdGVtLmxhYmVsXCI+PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIml0ZW0ucm91dGVyTGlua1wiIFtyb3V0ZXJMaW5rXT1cIml0ZW0ucm91dGVyTGlua1wiIFtxdWVyeVBhcmFtc109XCJpdGVtLnF1ZXJ5UGFyYW1zXCIgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3AtbWVudWl0ZW0tbGluay1hY3RpdmUnXCIgIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJpdGVtLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zfHx7ZXhhY3Q6ZmFsc2V9XCIgY2xhc3M9XCJwLW1lbnVpdGVtLWxpbmtcIiAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhcmdldF09XCJpdGVtLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cIml0ZW0udGl0bGVcIiBbYXR0ci5pZF09XCJpdGVtLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS5kaXNhYmxlZCA/IG51bGwgOiAnMCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmcmFnbWVudF09XCJpdGVtLmZyYWdtZW50XCIgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiaXRlbS5xdWVyeVBhcmFtc0hhbmRsaW5nXCIgW3ByZXNlcnZlRnJhZ21lbnRdPVwiaXRlbS5wcmVzZXJ2ZUZyYWdtZW50XCIgW3NraXBMb2NhdGlvbkNoYW5nZV09XCJpdGVtLnNraXBMb2NhdGlvbkNoYW5nZVwiIFtyZXBsYWNlVXJsXT1cIml0ZW0ucmVwbGFjZVVybFwiIFtzdGF0ZV09XCJpdGVtLnN0YXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpdGVtLmljb25cIiBjbGFzcz1cInAtbWVudWl0ZW0taWNvblwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXRlbS5sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0uZXNjYXBlICE9PSBmYWxzZTsgZWxzZSBodG1sUm91dGVMYWJlbFwiIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbFJvdXRlTGFiZWw+PHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cIml0ZW0ubGFiZWxcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1icmVhZGNydW1iLWNoZXZyb24gcGkgcGktY2hldnJvbi1yaWdodFwiICpuZ0lmPVwiIWVuZFwiPjwvbGk+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9icmVhZGNydW1iLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWIge1xuXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaG9tZTogTWVudUl0ZW07XG5cbiAgICBASW5wdXQoKSBob21lQXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KCkgb25JdGVtQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgaXRlbUNsaWNrKGV2ZW50LCBpdGVtOiBNZW51SXRlbSnCoHtcbiAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWl0ZW0udXJsKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW0uY29tbWFuZCkge1xuICAgICAgICAgICAgaXRlbS5jb21tYW5kKHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25JdGVtQ2xpY2suZW1pdCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Ib21lQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9tZSkge1xuICAgICAgICAgICAgdGhpcy5pdGVtQ2xpY2soZXZlbnQsIHRoaXMuaG9tZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxSb3V0ZXJNb2R1bGUsVG9vbHRpcE1vZHVsZV0sXG4gICAgZXhwb3J0czogW0JyZWFkY3J1bWIsUm91dGVyTW9kdWxlLFRvb2x0aXBNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0JyZWFkY3J1bWJdXG59KVxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWJNb2R1bGUgeyB9XG4iXX0=