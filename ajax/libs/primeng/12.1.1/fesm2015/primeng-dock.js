import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ContentChildren, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import * as i2 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i3 from 'primeng/ripple';
import { RippleModule } from 'primeng/ripple';
import * as i4 from 'primeng/tooltip';
import { TooltipModule } from 'primeng/tooltip';

class Dock {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.model = null;
        this.position = "bottom";
        this.currentIndex = -3;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    onListMouseLeave() {
        this.currentIndex = -3;
        this.cd.markForCheck();
    }
    onItemMouseEnter(index) {
        this.currentIndex = index;
        if (index === 1) {
        }
        this.cd.markForCheck();
    }
    onItemClick(e, item) {
        if (item.command) {
            item.command({ originalEvent: e, item });
        }
    }
    get containerClass() {
        return {
            ['p-dock p-component ' + ` p-dock-${this.position}`]: true
        };
    }
    isClickableRouterLink(item) {
        return item.routerLink && !item.disabled;
    }
    itemClass(index) {
        return {
            'p-dock-item': true,
            'p-dock-item-second-prev': (this.currentIndex - 2) === index,
            'p-dock-item-prev': (this.currentIndex - 1) === index,
            'p-dock-item-current': this.currentIndex === index,
            'p-dock-item-next': (this.currentIndex + 1) === index,
            'p-dock-item-second-next': (this.currentIndex + 2) === index
        };
    }
}
Dock.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Dock, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
Dock.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Dock, selector: "p-dock", inputs: { id: "id", style: "style", styleClass: "styleClass", model: "model", position: "position" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div [attr.id]="id" [ngClass]="containerClass" [ngStyle]="style" [class]="styleClass">
            <ul #list class="p-dock-list" role="menu" (mouseleave)="onListMouseLeave()">
                <li *ngFor="let item of model; let i = index" [ngClass]="itemClass(i)" (mouseenter)="onItemMouseEnter(i)">
                    <a *ngIf="isClickableRouterLink(item); else elseBlock" pRipple [routerLink]="item.routerLink" [queryParams]="item.queryParams"
                        [ngClass]="{'p-disabled':item.disabled}" class="p-dock-action"  role="menuitem" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" (click)="onItemClick($event, item)" (keydown.enter)="onItemClick($event, item, i)"
                        [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')"  pTooltip [tooltipOptions]="item.tooltipOptions"
                        [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                            <span class="p-dock-action-icon" *ngIf="item.icon && !itemTemplate" [ngClass]="item.icon"></span>
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
                    </a>
                    <ng-template #elseBlock>
                        <a [tooltipPosition]="item.tooltipPosition" [attr.href]="item.url||null" class="p-dock-action"  role="menuitem" pRipple (click)="onItemClick($event, item)"  pTooltip [tooltipOptions]="item.tooltipOptions"
                            [ngClass]="{'p-disabled':item.disabled}" (keydown.enter)="onItemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')">
                            <span class="p-dock-action-icon" *ngIf="item.icon && !itemTemplate" [ngClass]="item.icon"></span>
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
    `, isInline: true, styles: [".p-dock{position:absolute;z-index:1;pointer-events:none}.p-dock,.p-dock-list{display:flex;justify-content:center;align-items:center}.p-dock-list{margin:0;padding:0;list-style:none;pointer-events:auto}.p-dock-item{transition:all .2s cubic-bezier(.4,0,.2,1);will-change:transform}.p-dock-action{display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;cursor:default}.p-dock-item-second-next,.p-dock-item-second-prev{transform:scale(1.2)}.p-dock-item-next,.p-dock-item-prev{transform:scale(1.4)}.p-dock-item-current{transform:scale(1.6);z-index:1}.p-dock-top{left:0;top:0;width:100%}.p-dock-top .p-dock-item{transform-origin:center top}.p-dock-bottom{left:0;bottom:0;width:100%}.p-dock-bottom .p-dock-item{transform-origin:center bottom}.p-dock-right{right:0;top:0;height:100%}.p-dock-right .p-dock-item{transform-origin:center right}.p-dock-right .p-dock-list{flex-direction:column}.p-dock-left{left:0;top:0;height:100%}.p-dock-left .p-dock-item{transform-origin:center left}.p-dock-left .p-dock-list{flex-direction:column}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i3.Ripple, selector: "[pRipple]" }, { type: i4.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Dock, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-dock',
                    template: `
        <div [attr.id]="id" [ngClass]="containerClass" [ngStyle]="style" [class]="styleClass">
            <ul #list class="p-dock-list" role="menu" (mouseleave)="onListMouseLeave()">
                <li *ngFor="let item of model; let i = index" [ngClass]="itemClass(i)" (mouseenter)="onItemMouseEnter(i)">
                    <a *ngIf="isClickableRouterLink(item); else elseBlock" pRipple [routerLink]="item.routerLink" [queryParams]="item.queryParams"
                        [ngClass]="{'p-disabled':item.disabled}" class="p-dock-action"  role="menuitem" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" (click)="onItemClick($event, item)" (keydown.enter)="onItemClick($event, item, i)"
                        [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')"  pTooltip [tooltipOptions]="item.tooltipOptions"
                        [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                            <span class="p-dock-action-icon" *ngIf="item.icon && !itemTemplate" [ngClass]="item.icon"></span>
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
                    </a>
                    <ng-template #elseBlock>
                        <a [tooltipPosition]="item.tooltipPosition" [attr.href]="item.url||null" class="p-dock-action"  role="menuitem" pRipple (click)="onItemClick($event, item)"  pTooltip [tooltipOptions]="item.tooltipOptions"
                            [ngClass]="{'p-disabled':item.disabled}" (keydown.enter)="onItemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')">
                            <span class="p-dock-action-icon" *ngIf="item.icon && !itemTemplate" [ngClass]="item.icon"></span>
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./dock.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { id: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], model: [{
                type: Input
            }], position: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class DockModule {
}
DockModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DockModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DockModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DockModule, declarations: [Dock], imports: [CommonModule, RouterModule, RippleModule, TooltipModule], exports: [Dock, SharedModule, TooltipModule, RouterModule] });
DockModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DockModule, imports: [[CommonModule, RouterModule, RippleModule, TooltipModule], SharedModule, TooltipModule, RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: DockModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, RippleModule, TooltipModule],
                    exports: [Dock, SharedModule, TooltipModule, RouterModule],
                    declarations: [Dock]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { Dock, DockModule };
//# sourceMappingURL=primeng-dock.js.map
