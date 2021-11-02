import { NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
import * as i3 from "primeng/tooltip";
export class Steps {
    constructor(router, route, cd) {
        this.router = router;
        this.route = route;
        this.cd = cd;
        this.activeIndex = 0;
        this.readonly = true;
        this.activeIndexChange = new EventEmitter();
    }
    ngOnInit() {
        this.subscription = this.router.events.subscribe(() => this.cd.markForCheck());
    }
    itemClick(event, item, i) {
        if (this.readonly || item.disabled) {
            event.preventDefault();
            return;
        }
        this.activeIndexChange.emit(i);
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item,
                index: i
            });
        }
    }
    isClickableRouterLink(item) {
        return item.routerLink && !this.readonly && !item.disabled;
    }
    isActive(item, index) {
        if (item.routerLink)
            return this.router.isActive(item.routerLink, false) || this.router.isActive(this.router.createUrlTree([item.routerLink], { relativeTo: this.route }).toString(), false);
        else
            return index === this.activeIndex;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
Steps.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Steps, deps: [{ token: i1.Router }, { token: i1.ActivatedRoute }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
Steps.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Steps, selector: "p-steps", inputs: { activeIndex: "activeIndex", model: "model", readonly: "readonly", style: "style", styleClass: "styleClass" }, outputs: { activeIndexChange: "activeIndexChange" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div [ngClass]="{'p-steps p-component':true,'p-readonly':readonly}" [ngStyle]="style" [class]="styleClass">
            <ul role="tablist">
                <li *ngFor="let item of model; let i = index" class="p-steps-item" #menuitem [ngStyle]="item.style" [class]="item.styleClass" role="tab" [attr.aria-selected]="i === activeIndex" [attr.aria-expanded]="i === activeIndex" pTooltip [tooltipOptions]="item.tooltipOptions"
                    [ngClass]="{'p-highlight p-steps-current': isActive(item, i), 'p-disabled': item.disabled || (readonly && !isActive(item, i))}">
                    <a *ngIf="isClickableRouterLink(item); else elseBlock" [routerLink]="item.routerLink" [queryParams]="item.queryParams" role="presentation" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link"
                        (click)="itemClick($event, item, i)" (keydown.enter)="itemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')"
                        [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                        <span class="p-steps-number">{{i + 1}}</span>
                        <span class="p-steps-title" *ngIf="item.escape !== false; else htmlLabel">{{item.label}}</span>
                        <ng-template #htmlLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                    </a>
                    <ng-template #elseBlock>
                        <a [attr.href]="item.url" class="p-menuitem-link" role="presentation" (click)="itemClick($event, item, i)" (keydown.enter)="itemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id"
                            [attr.tabindex]="item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')">
                            <span class="p-steps-number">{{i + 1}}</span>
                            <span class="p-steps-title" *ngIf="item.escape !== false; else htmlRouteLabel">{{item.label}}</span>
                            <ng-template #htmlRouteLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
    `, isInline: true, styles: [".p-steps{position:relative}.p-steps ul{padding:0;margin:0;list-style-type:none;display:flex}.p-steps-item{position:relative;display:flex;justify-content:center;flex:1 1 auto}.p-steps-item .p-menuitem-link{display:inline-flex;flex-direction:column;align-items:center;overflow:hidden;text-decoration:none}.p-steps.p-steps-readonly .p-steps-item{cursor:auto}.p-steps-item.p-steps-current .p-menuitem-link{cursor:default}.p-steps-title{white-space:nowrap}.p-steps-number{display:flex;align-items:center;justify-content:center}.p-steps-title{display:block}"], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i1.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Steps, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-steps',
                    template: `
        <div [ngClass]="{'p-steps p-component':true,'p-readonly':readonly}" [ngStyle]="style" [class]="styleClass">
            <ul role="tablist">
                <li *ngFor="let item of model; let i = index" class="p-steps-item" #menuitem [ngStyle]="item.style" [class]="item.styleClass" role="tab" [attr.aria-selected]="i === activeIndex" [attr.aria-expanded]="i === activeIndex" pTooltip [tooltipOptions]="item.tooltipOptions"
                    [ngClass]="{'p-highlight p-steps-current': isActive(item, i), 'p-disabled': item.disabled || (readonly && !isActive(item, i))}">
                    <a *ngIf="isClickableRouterLink(item); else elseBlock" [routerLink]="item.routerLink" [queryParams]="item.queryParams" role="presentation" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link"
                        (click)="itemClick($event, item, i)" (keydown.enter)="itemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')"
                        [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                        <span class="p-steps-number">{{i + 1}}</span>
                        <span class="p-steps-title" *ngIf="item.escape !== false; else htmlLabel">{{item.label}}</span>
                        <ng-template #htmlLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                    </a>
                    <ng-template #elseBlock>
                        <a [attr.href]="item.url" class="p-menuitem-link" role="presentation" (click)="itemClick($event, item, i)" (keydown.enter)="itemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id"
                            [attr.tabindex]="item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')">
                            <span class="p-steps-number">{{i + 1}}</span>
                            <span class="p-steps-title" *ngIf="item.escape !== false; else htmlRouteLabel">{{item.label}}</span>
                            <ng-template #htmlRouteLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./steps.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i1.ActivatedRoute }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { activeIndex: [{
                type: Input
            }], model: [{
                type: Input
            }], readonly: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], activeIndexChange: [{
                type: Output
            }] } });
export class StepsModule {
}
StepsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: StepsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StepsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: StepsModule, declarations: [Steps], imports: [CommonModule, RouterModule, TooltipModule], exports: [Steps, RouterModule, TooltipModule] });
StepsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: StepsModule, imports: [[CommonModule, RouterModule, TooltipModule], RouterModule, TooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: StepsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, TooltipModule],
                    exports: [Steps, RouterModule, TooltipModule],
                    declarations: [Steps]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc3RlcHMvc3RlcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQXVDLE1BQU0sZUFBZSxDQUFDO0FBQzVKLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUMsWUFBWSxFQUF5QixNQUFNLGlCQUFpQixDQUFDO0FBRXJFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFtQzlDLE1BQU0sT0FBTyxLQUFLO0lBY2QsWUFBb0IsTUFBYyxFQUFVLEtBQW9CLEVBQVUsRUFBcUI7UUFBM0UsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWU7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQVp0RixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUl4QixhQUFRLEdBQWEsSUFBSSxDQUFDO1FBTXpCLHNCQUFpQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRStCLENBQUM7SUFJcEcsUUFBUTtRQUNKLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQVksRUFBRSxJQUFjLEVBQUUsQ0FBUztRQUM3QyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLElBQUksRUFBRSxJQUFJO2dCQUNWLEtBQUssRUFBRSxDQUFDO2FBQ1gsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQscUJBQXFCLENBQUMsSUFBYztRQUNoQyxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUMvRCxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQWMsRUFBRSxLQUFhO1FBQ2xDLElBQUksSUFBSSxDQUFDLFVBQVU7WUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7O1lBRXRLLE9BQU8sS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUMsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNuQztJQUNMLENBQUM7O2tHQTFEUSxLQUFLO3NGQUFMLEtBQUssbVFBL0JKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXVCVDsyRkFRUSxLQUFLO2tCQWpDakIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsU0FBUztvQkFDbkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXVCVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDMUIsSUFBSSxFQUFFO3dCQUNGLE9BQU8sRUFBRSxXQUFXO3FCQUN2QjtpQkFDSjswSkFHWSxXQUFXO3NCQUFuQixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVJLGlCQUFpQjtzQkFBMUIsTUFBTTs7QUFzRFgsTUFBTSxPQUFPLFdBQVc7O3dHQUFYLFdBQVc7eUdBQVgsV0FBVyxpQkFsRVgsS0FBSyxhQThESixZQUFZLEVBQUMsWUFBWSxFQUFDLGFBQWEsYUE5RHhDLEtBQUssRUErREUsWUFBWSxFQUFDLGFBQWE7eUdBR2pDLFdBQVcsWUFKWCxDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsYUFBYSxDQUFDLEVBQ2xDLFlBQVksRUFBQyxhQUFhOzJGQUdqQyxXQUFXO2tCQUx2QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsYUFBYSxDQUFDO29CQUNsRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLGFBQWEsQ0FBQztvQkFDM0MsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDO2lCQUN4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkluaXQsIE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01lbnVJdGVtfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1JvdXRlck1vZHVsZSwgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7VG9vbHRpcE1vZHVsZX0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXN0ZXBzJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsncC1zdGVwcyBwLWNvbXBvbmVudCc6dHJ1ZSwncC1yZWFkb25seSc6cmVhZG9ubHl9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPHVsIHJvbGU9XCJ0YWJsaXN0XCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIG1vZGVsOyBsZXQgaSA9IGluZGV4XCIgY2xhc3M9XCJwLXN0ZXBzLWl0ZW1cIiAjbWVudWl0ZW0gW25nU3R5bGVdPVwiaXRlbS5zdHlsZVwiIFtjbGFzc109XCJpdGVtLnN0eWxlQ2xhc3NcIiByb2xlPVwidGFiXCIgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpID09PSBhY3RpdmVJbmRleFwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiaSA9PT0gYWN0aXZlSW5kZXhcIiBwVG9vbHRpcCBbdG9vbHRpcE9wdGlvbnNdPVwiaXRlbS50b29sdGlwT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncC1oaWdobGlnaHQgcC1zdGVwcy1jdXJyZW50JzogaXNBY3RpdmUoaXRlbSwgaSksICdwLWRpc2FibGVkJzogaXRlbS5kaXNhYmxlZCB8fCAocmVhZG9ubHkgJiYgIWlzQWN0aXZlKGl0ZW0sIGkpKX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJpc0NsaWNrYWJsZVJvdXRlckxpbmsoaXRlbSk7IGVsc2UgZWxzZUJsb2NrXCIgW3JvdXRlckxpbmtdPVwiaXRlbS5yb3V0ZXJMaW5rXCIgW3F1ZXJ5UGFyYW1zXT1cIml0ZW0ucXVlcnlQYXJhbXNcIiByb2xlPVwicHJlc2VudGF0aW9uXCIgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3AtbWVudWl0ZW0tbGluay1hY3RpdmUnXCIgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cIml0ZW0ucm91dGVyTGlua0FjdGl2ZU9wdGlvbnN8fHtleGFjdDpmYWxzZX1cIiBjbGFzcz1cInAtbWVudWl0ZW0tbGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgaXRlbSwgaSlcIiAoa2V5ZG93bi5lbnRlcik9XCJpdGVtQ2xpY2soJGV2ZW50LCBpdGVtLCBpKVwiIFthdHRyLnRhcmdldF09XCJpdGVtLnRhcmdldFwiIFthdHRyLmlkXT1cIml0ZW0uaWRcIiBbYXR0ci50YWJpbmRleF09XCJpdGVtLmRpc2FibGVkIHx8IHJlYWRvbmx5ID8gbnVsbCA6IChpdGVtLnRhYmluZGV4ID8gaXRlbS50YWJpbmRleCA6ICcwJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cIml0ZW0uZnJhZ21lbnRcIiBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJpdGVtLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIiBbcHJlc2VydmVGcmFnbWVudF09XCJpdGVtLnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cIml0ZW0uc2tpcExvY2F0aW9uQ2hhbmdlXCIgW3JlcGxhY2VVcmxdPVwiaXRlbS5yZXBsYWNlVXJsXCIgW3N0YXRlXT1cIml0ZW0uc3RhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1zdGVwcy1udW1iZXJcIj57e2kgKyAxfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtc3RlcHMtdGl0bGVcIiAqbmdJZj1cIml0ZW0uZXNjYXBlICE9PSBmYWxzZTsgZWxzZSBodG1sTGFiZWxcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbExhYmVsPjxzcGFuIGNsYXNzPVwicC1zdGVwcy10aXRsZVwiIFtpbm5lckhUTUxdPVwiaXRlbS5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZWxzZUJsb2NrPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgW2F0dHIuaHJlZl09XCJpdGVtLnVybFwiIGNsYXNzPVwicC1tZW51aXRlbS1saW5rXCIgcm9sZT1cInByZXNlbnRhdGlvblwiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBpdGVtLCBpKVwiIChrZXlkb3duLmVudGVyKT1cIml0ZW1DbGljaygkZXZlbnQsIGl0ZW0sIGkpXCIgW2F0dHIudGFyZ2V0XT1cIml0ZW0udGFyZ2V0XCIgW2F0dHIuaWRdPVwiaXRlbS5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS5kaXNhYmxlZHx8KGkgIT09IGFjdGl2ZUluZGV4ICYmIHJlYWRvbmx5KSA/IG51bGwgOiAoaXRlbS50YWJpbmRleCA/IGl0ZW0udGFiaW5kZXggOiAnMCcpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXN0ZXBzLW51bWJlclwiPnt7aSArIDF9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtc3RlcHMtdGl0bGVcIiAqbmdJZj1cIml0ZW0uZXNjYXBlICE9PSBmYWxzZTsgZWxzZSBodG1sUm91dGVMYWJlbFwiPnt7aXRlbS5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbFJvdXRlTGFiZWw+PHNwYW4gY2xhc3M9XCJwLXN0ZXBzLXRpdGxlXCIgW2lubmVySFRNTF09XCJpdGVtLmxhYmVsXCI+PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9zdGVwcy5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTdGVwcyBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGFjdGl2ZUluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XG5cbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbiA9ICB0cnVlO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKSBhY3RpdmVJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOkFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XG5cbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jZC5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxuXG4gICAgaXRlbUNsaWNrKGV2ZW50OiBFdmVudCwgaXRlbTogTWVudUl0ZW0sIGk6IG51bWJlcinCoHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkgfHwgaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChpKTtcblxuICAgICAgICBpZiAoIWl0ZW0udXJsKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW0uY29tbWFuZCkge1xuICAgICAgICAgICAgaXRlbS5jb21tYW5kKHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgICAgICAgIGluZGV4OiBpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQ2xpY2thYmxlUm91dGVyTGluayhpdGVtOiBNZW51SXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbS5yb3V0ZXJMaW5rICYmICF0aGlzLnJlYWRvbmx5ICYmICFpdGVtLmRpc2FibGVkO1xuICAgIH1cblxuICAgIGlzQWN0aXZlKGl0ZW06IE1lbnVJdGVtLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChpdGVtLnJvdXRlckxpbmspXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZXIuaXNBY3RpdmUoaXRlbS5yb3V0ZXJMaW5rLCBmYWxzZSkgfHwgdGhpcy5yb3V0ZXIuaXNBY3RpdmUodGhpcy5yb3V0ZXIuY3JlYXRlVXJsVHJlZShbaXRlbS5yb3V0ZXJMaW5rXSwge3JlbGF0aXZlVG86IHRoaXMucm91dGV9KS50b1N0cmluZygpLCBmYWxzZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBpbmRleCA9PT0gdGhpcy5hY3RpdmVJbmRleDtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsUm91dGVyTW9kdWxlLFRvb2x0aXBNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtTdGVwcyxSb3V0ZXJNb2R1bGUsVG9vbHRpcE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbU3RlcHNdXG59KVxuZXhwb3J0IGNsYXNzIFN0ZXBzTW9kdWxlIHsgfVxuIl19