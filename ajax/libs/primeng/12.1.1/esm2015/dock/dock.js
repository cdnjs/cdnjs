import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/tooltip";
export class Dock {
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
export class DockModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9kb2NrL2RvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0Qix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBaUMsZUFBZSxFQUFnQyxNQUFNLGVBQWUsQ0FBQztBQUMvTSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7OztBQWlDaEQsTUFBTSxPQUFPLElBQUk7SUFrQmIsWUFBb0IsRUFBYyxFQUFTLEVBQXFCO1FBQTVDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQVZ2RCxVQUFLLEdBQVUsSUFBSSxDQUFDO1FBRXBCLGFBQVEsR0FBVyxRQUFRLENBQUM7UUFTakMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM1QixRQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDbkIsS0FBSyxNQUFNO29CQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDdEMsTUFBTTtnQkFFTjtvQkFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3RDLE1BQU07YUFD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QUFJLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUM7b0JBQzFELFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQztpQkFDdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgQ29udGVudENoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24sIFRlbXBsYXRlUmVmLCBBZnRlckNvbnRlbnRJbml0LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvdG9vbHRpcCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1kb2NrJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFthdHRyLmlkXT1cImlkXCIgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8dWwgI2xpc3QgY2xhc3M9XCJwLWRvY2stbGlzdFwiIHJvbGU9XCJtZW51XCIgKG1vdXNlbGVhdmUpPVwib25MaXN0TW91c2VMZWF2ZSgpXCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIG1vZGVsOyBsZXQgaSA9IGluZGV4XCIgW25nQ2xhc3NdPVwiaXRlbUNsYXNzKGkpXCIgKG1vdXNlZW50ZXIpPVwib25JdGVtTW91c2VFbnRlcihpKVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cImlzQ2xpY2thYmxlUm91dGVyTGluayhpdGVtKTsgZWxzZSBlbHNlQmxvY2tcIiBwUmlwcGxlIFtyb3V0ZXJMaW5rXT1cIml0ZW0ucm91dGVyTGlua1wiIFtxdWVyeVBhcmFtc109XCJpdGVtLnF1ZXJ5UGFyYW1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncC1kaXNhYmxlZCc6aXRlbS5kaXNhYmxlZH1cIiBjbGFzcz1cInAtZG9jay1hY3Rpb25cIiAgcm9sZT1cIm1lbnVpdGVtXCIgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cIml0ZW0ucm91dGVyTGlua0FjdGl2ZU9wdGlvbnN8fHtleGFjdDpmYWxzZX1cIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCBpdGVtKVwiIChrZXlkb3duLmVudGVyKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgaXRlbSwgaSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFyZ2V0XT1cIml0ZW0udGFyZ2V0XCIgW2F0dHIuaWRdPVwiaXRlbS5pZFwiIFthdHRyLnRhYmluZGV4XT1cIml0ZW0uZGlzYWJsZWQgfHwgcmVhZG9ubHkgPyBudWxsIDogKGl0ZW0udGFiaW5kZXggPyBpdGVtLnRhYmluZGV4IDogJzAnKVwiICBwVG9vbHRpcCBbdG9vbHRpcE9wdGlvbnNdPVwiaXRlbS50b29sdGlwT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZnJhZ21lbnRdPVwiaXRlbS5mcmFnbWVudFwiIFtxdWVyeVBhcmFtc0hhbmRsaW5nXT1cIml0ZW0ucXVlcnlQYXJhbXNIYW5kbGluZ1wiIFtwcmVzZXJ2ZUZyYWdtZW50XT1cIml0ZW0ucHJlc2VydmVGcmFnbWVudFwiIFtza2lwTG9jYXRpb25DaGFuZ2VdPVwiaXRlbS5za2lwTG9jYXRpb25DaGFuZ2VcIiBbcmVwbGFjZVVybF09XCJpdGVtLnJlcGxhY2VVcmxcIiBbc3RhdGVdPVwiaXRlbS5zdGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1kb2NrLWFjdGlvbi1pY29uXCIgKm5nSWY9XCJpdGVtLmljb24gJiYgIWl0ZW1UZW1wbGF0ZVwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZWxzZUJsb2NrPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgW3Rvb2x0aXBQb3NpdGlvbl09XCJpdGVtLnRvb2x0aXBQb3NpdGlvblwiIFthdHRyLmhyZWZdPVwiaXRlbS51cmx8fG51bGxcIiBjbGFzcz1cInAtZG9jay1hY3Rpb25cIiAgcm9sZT1cIm1lbnVpdGVtXCIgcFJpcHBsZSAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCBpdGVtKVwiICBwVG9vbHRpcCBbdG9vbHRpcE9wdGlvbnNdPVwiaXRlbS50b29sdGlwT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydwLWRpc2FibGVkJzppdGVtLmRpc2FibGVkfVwiIChrZXlkb3duLmVudGVyKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgaXRlbSwgaSlcIiBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci5pZF09XCJpdGVtLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS5kaXNhYmxlZHx8KGkgIT09IGFjdGl2ZUluZGV4ICYmIHJlYWRvbmx5KSA/IG51bGwgOiAoaXRlbS50YWJpbmRleCA/IGl0ZW0udGFiaW5kZXggOiAnMCcpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWRvY2stYWN0aW9uLWljb25cIiAqbmdJZj1cIml0ZW0uaWNvbiAmJiAhaXRlbVRlbXBsYXRlXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW19XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9kb2NrLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIERvY2sgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbW9kZWw6IGFueVtdID0gbnVsbDtcblxuICAgIEBJbnB1dCgpIHBvc2l0aW9uOiBzdHJpbmcgPSBcImJvdHRvbVwiO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgY3VycmVudEluZGV4OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gLTM7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2goaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkxpc3RNb3VzZUxlYXZlKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IC0zO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uSXRlbU1vdXNlRW50ZXIoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSBpbmRleDtcblxuICAgICAgICBpZiAoaW5kZXggPT09IDEpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbkl0ZW1DbGljayhlLCBpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtLmNvbW1hbmQpIHtcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7IG9yaWdpbmFsRXZlbnQ6IGUsIGl0ZW0gfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBbJ3AtZG9jayBwLWNvbXBvbmVudCAnICsgYCBwLWRvY2stJHt0aGlzLnBvc2l0aW9ufWBdOiB0cnVlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaXNDbGlja2FibGVSb3V0ZXJMaW5rKGl0ZW06IGFueSkge1xuICAgICAgICByZXR1cm4gaXRlbS5yb3V0ZXJMaW5rICYmICFpdGVtLmRpc2FibGVkO1xuICAgIH1cblxuICAgIGl0ZW1DbGFzcyhpbmRleCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtZG9jay1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICdwLWRvY2staXRlbS1zZWNvbmQtcHJldic6ICh0aGlzLmN1cnJlbnRJbmRleCAtIDIpID09PSBpbmRleCxcbiAgICAgICAgICAgICdwLWRvY2staXRlbS1wcmV2JzogKHRoaXMuY3VycmVudEluZGV4IC0gMSkgPT09IGluZGV4LFxuICAgICAgICAgICAgJ3AtZG9jay1pdGVtLWN1cnJlbnQnOiB0aGlzLmN1cnJlbnRJbmRleCA9PT0gaW5kZXgsXG4gICAgICAgICAgICAncC1kb2NrLWl0ZW0tbmV4dCc6ICh0aGlzLmN1cnJlbnRJbmRleCArIDEpID09PSBpbmRleCxcbiAgICAgICAgICAgICdwLWRvY2staXRlbS1zZWNvbmQtbmV4dCc6ICh0aGlzLmN1cnJlbnRJbmRleCArIDIpID09PSBpbmRleFxuICAgICAgICB9XG4gICAgfVxuXG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBSaXBwbGVNb2R1bGUsIFRvb2x0aXBNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtEb2NrLCBTaGFyZWRNb2R1bGUsIFRvb2x0aXBNb2R1bGUsIFJvdXRlck1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbRG9ja11cbn0pXG5leHBvcnQgY2xhc3MgRG9ja01vZHVsZSB7IH1cbiJdfQ==