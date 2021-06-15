import { NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
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
        this.subscription.unsubscribe();
    }
}
Steps.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Steps, deps: [{ token: i1.Router }, { token: i1.ActivatedRoute }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
Steps.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: Steps, selector: "p-steps", inputs: { activeIndex: "activeIndex", model: "model", readonly: "readonly", style: "style", styleClass: "styleClass" }, outputs: { activeIndexChange: "activeIndexChange" }, ngImport: i0, template: `
        <div [ngClass]="{'p-steps p-component':true,'p-readonly':readonly}" [ngStyle]="style" [class]="styleClass">
            <ul role="tablist">
                <li *ngFor="let item of model; let i = index" class="p-steps-item" #menuitem [ngStyle]="item.style" [class]="item.styleClass" role="tab" [attr.aria-selected]="i === activeIndex" [attr.aria-expanded]="i === activeIndex"
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
    `, isInline: true, styles: [".p-steps{position:relative}.p-steps ul{padding:0;margin:0;list-style-type:none;display:flex}.p-steps-item{position:relative;display:flex;justify-content:center;flex:1 1 auto}.p-steps-item .p-menuitem-link{display:inline-flex;flex-direction:column;align-items:center;overflow:hidden;text-decoration:none}.p-steps.p-steps-readonly .p-steps-item{cursor:auto}.p-steps-item.p-steps-current .p-menuitem-link{cursor:default}.p-steps-title{white-space:nowrap}.p-steps-number{display:flex;align-items:center;justify-content:center}.p-steps-title{display:block}"], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i1.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Steps, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-steps',
                    template: `
        <div [ngClass]="{'p-steps p-component':true,'p-readonly':readonly}" [ngStyle]="style" [class]="styleClass">
            <ul role="tablist">
                <li *ngFor="let item of model; let i = index" class="p-steps-item" #menuitem [ngStyle]="item.style" [class]="item.styleClass" role="tab" [attr.aria-selected]="i === activeIndex" [attr.aria-expanded]="i === activeIndex"
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
                    styleUrls: ['./steps.css']
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
StepsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: StepsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StepsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: StepsModule, declarations: [Steps], imports: [CommonModule, RouterModule], exports: [Steps, RouterModule] });
StepsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: StepsModule, imports: [[CommonModule, RouterModule], RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: StepsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule],
                    exports: [Steps, RouterModule],
                    declarations: [Steps]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc3RlcHMvc3RlcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQXVDLE1BQU0sZUFBZSxDQUFDO0FBQzVKLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUMsWUFBWSxFQUF5QixNQUFNLGlCQUFpQixDQUFDOzs7O0FBaUNyRSxNQUFNLE9BQU8sS0FBSztJQWNkLFlBQW9CLE1BQWMsRUFBVSxLQUFvQixFQUFVLEVBQXFCO1FBQTNFLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFlO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFadEYsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFJeEIsYUFBUSxHQUFhLElBQUksQ0FBQztRQU16QixzQkFBaUIsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUUrQixDQUFDO0lBSXBHLFFBQVE7UUFDSixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFZLEVBQUUsSUFBYyxFQUFFLENBQVM7UUFDN0MsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsSUFBSTtnQkFDVixLQUFLLEVBQUUsQ0FBQzthQUNYLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELHFCQUFxQixDQUFDLElBQWM7UUFDaEMsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDL0QsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFjLEVBQUUsS0FBYTtRQUNsQyxJQUFJLElBQUksQ0FBQyxVQUFVO1lBQ2YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDOztZQUV0SyxPQUFPLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFDLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDOztrR0F4RFEsS0FBSztzRkFBTCxLQUFLLDROQTVCSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F1QlQ7MkZBS1EsS0FBSztrQkE5QmpCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F1QlQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7aUJBQzdCOzBKQUdZLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUksaUJBQWlCO3NCQUExQixNQUFNOztBQW9EWCxNQUFNLE9BQU8sV0FBVzs7d0dBQVgsV0FBVzt5R0FBWCxXQUFXLGlCQWhFWCxLQUFLLGFBNERKLFlBQVksRUFBQyxZQUFZLGFBNUQxQixLQUFLLEVBNkRFLFlBQVk7eUdBR25CLFdBQVcsWUFKWCxDQUFDLFlBQVksRUFBQyxZQUFZLENBQUMsRUFDcEIsWUFBWTsyRkFHbkIsV0FBVztrQkFMdkIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO29CQUNwQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUMsWUFBWSxDQUFDO29CQUM3QixZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUM7aUJBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24sIE9uSW5pdCwgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TWVudUl0ZW19IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7Um91dGVyTW9kdWxlLCBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1zdGVwcycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3Atc3RlcHMgcC1jb21wb25lbnQnOnRydWUsJ3AtcmVhZG9ubHknOnJlYWRvbmx5fVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDx1bCByb2xlPVwidGFibGlzdFwiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtb2RlbDsgbGV0IGkgPSBpbmRleFwiIGNsYXNzPVwicC1zdGVwcy1pdGVtXCIgI21lbnVpdGVtIFtuZ1N0eWxlXT1cIml0ZW0uc3R5bGVcIiBbY2xhc3NdPVwiaXRlbS5zdHlsZUNsYXNzXCIgcm9sZT1cInRhYlwiIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiaSA9PT0gYWN0aXZlSW5kZXhcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImkgPT09IGFjdGl2ZUluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydwLWhpZ2hsaWdodCBwLXN0ZXBzLWN1cnJlbnQnOiBpc0FjdGl2ZShpdGVtLCBpKSwgJ3AtZGlzYWJsZWQnOiBpdGVtLmRpc2FibGVkIHx8IChyZWFkb25seSAmJiAhaXNBY3RpdmUoaXRlbSwgaSkpfVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cImlzQ2xpY2thYmxlUm91dGVyTGluayhpdGVtKTsgZWxzZSBlbHNlQmxvY2tcIiBbcm91dGVyTGlua109XCJpdGVtLnJvdXRlckxpbmtcIiBbcXVlcnlQYXJhbXNdPVwiaXRlbS5xdWVyeVBhcmFtc1wiIHJvbGU9XCJwcmVzZW50YXRpb25cIiBbcm91dGVyTGlua0FjdGl2ZV09XCIncC1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIiBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiaXRlbS5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc3x8e2V4YWN0OmZhbHNlfVwiIGNsYXNzPVwicC1tZW51aXRlbS1saW5rXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgaXRlbSwgaSlcIiAoa2V5ZG93bi5lbnRlcik9XCJpdGVtQ2xpY2soJGV2ZW50LCBpdGVtLCBpKVwiIFthdHRyLnRhcmdldF09XCJpdGVtLnRhcmdldFwiIFthdHRyLmlkXT1cIml0ZW0uaWRcIiBbYXR0ci50YWJpbmRleF09XCJpdGVtLmRpc2FibGVkIHx8IHJlYWRvbmx5ID8gbnVsbCA6IChpdGVtLnRhYmluZGV4ID8gaXRlbS50YWJpbmRleCA6ICcwJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cIml0ZW0uZnJhZ21lbnRcIiBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJpdGVtLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIiBbcHJlc2VydmVGcmFnbWVudF09XCJpdGVtLnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cIml0ZW0uc2tpcExvY2F0aW9uQ2hhbmdlXCIgW3JlcGxhY2VVcmxdPVwiaXRlbS5yZXBsYWNlVXJsXCIgW3N0YXRlXT1cIml0ZW0uc3RhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1zdGVwcy1udW1iZXJcIj57e2kgKyAxfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtc3RlcHMtdGl0bGVcIiAqbmdJZj1cIml0ZW0uZXNjYXBlICE9PSBmYWxzZTsgZWxzZSBodG1sTGFiZWxcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbExhYmVsPjxzcGFuIGNsYXNzPVwicC1zdGVwcy10aXRsZVwiIFtpbm5lckhUTUxdPVwiaXRlbS5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZWxzZUJsb2NrPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgW2F0dHIuaHJlZl09XCJpdGVtLnVybFwiIGNsYXNzPVwicC1tZW51aXRlbS1saW5rXCIgcm9sZT1cInByZXNlbnRhdGlvblwiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBpdGVtLCBpKVwiIChrZXlkb3duLmVudGVyKT1cIml0ZW1DbGljaygkZXZlbnQsIGl0ZW0sIGkpXCIgW2F0dHIudGFyZ2V0XT1cIml0ZW0udGFyZ2V0XCIgW2F0dHIuaWRdPVwiaXRlbS5pZFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIml0ZW0uZGlzYWJsZWR8fChpICE9PSBhY3RpdmVJbmRleCAmJiByZWFkb25seSkgPyBudWxsIDogKGl0ZW0udGFiaW5kZXggPyBpdGVtLnRhYmluZGV4IDogJzAnKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1zdGVwcy1udW1iZXJcIj57e2kgKyAxfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXN0ZXBzLXRpdGxlXCIgKm5nSWY9XCJpdGVtLmVzY2FwZSAhPT0gZmFsc2U7IGVsc2UgaHRtbFJvdXRlTGFiZWxcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxSb3V0ZUxhYmVsPjxzcGFuIGNsYXNzPVwicC1zdGVwcy10aXRsZVwiIFtpbm5lckhUTUxdPVwiaXRlbS5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vc3RlcHMuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU3RlcHMgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgXG4gICAgQElucHV0KCkgYWN0aXZlSW5kZXg6IG51bWJlciA9IDA7XG4gICAgXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XG4gICAgXG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW4gPSAgdHJ1ZTtcbiAgICBcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuICAgICAgICBcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQE91dHB1dCgpIGFjdGl2ZUluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6QWN0aXZhdGVkUm91dGUsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cbiAgICBcbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jZC5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxuICAgIFxuICAgIGl0ZW1DbGljayhldmVudDogRXZlbnQsIGl0ZW06IE1lbnVJdGVtLCBpOiBudW1iZXIpwqB7XG4gICAgICAgIGlmICh0aGlzLnJlYWRvbmx5IHx8IGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgaWYgKCFpdGVtLnVybCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGl0ZW0uY29tbWFuZCkgeyAgICAgICAgICAgIFxuICAgICAgICAgICAgaXRlbS5jb21tYW5kKHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgICAgICAgIGluZGV4OiBpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQ2xpY2thYmxlUm91dGVyTGluayhpdGVtOiBNZW51SXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbS5yb3V0ZXJMaW5rICYmICF0aGlzLnJlYWRvbmx5ICYmICFpdGVtLmRpc2FibGVkO1xuICAgIH1cblxuICAgIGlzQWN0aXZlKGl0ZW06IE1lbnVJdGVtLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChpdGVtLnJvdXRlckxpbmspXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZXIuaXNBY3RpdmUoaXRlbS5yb3V0ZXJMaW5rLCBmYWxzZSkgfHwgdGhpcy5yb3V0ZXIuaXNBY3RpdmUodGhpcy5yb3V0ZXIuY3JlYXRlVXJsVHJlZShbaXRlbS5yb3V0ZXJMaW5rXSwge3JlbGF0aXZlVG86IHRoaXMucm91dGV9KS50b1N0cmluZygpLCBmYWxzZSk7XG4gICAgICAgIGVsc2UgICAgXG4gICAgICAgICAgICByZXR1cm4gaW5kZXggPT09IHRoaXMuYWN0aXZlSW5kZXg7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsUm91dGVyTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbU3RlcHMsUm91dGVyTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTdGVwc11cbn0pXG5leHBvcnQgY2xhc3MgU3RlcHNNb2R1bGUgeyB9Il19