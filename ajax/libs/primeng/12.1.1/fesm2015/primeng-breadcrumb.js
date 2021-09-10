import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i2 from 'primeng/tooltip';
import { TooltipModule } from 'primeng/tooltip';

class Breadcrumb {
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
Breadcrumb.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Breadcrumb, selector: "p-breadcrumb", inputs: { model: "model", style: "style", styleClass: "styleClass", home: "home" }, outputs: { onItemClick: "onItemClick" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
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
            }], onItemClick: [{
                type: Output
            }] } });
class BreadcrumbModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { Breadcrumb, BreadcrumbModule };
//# sourceMappingURL=primeng-breadcrumb.js.map
