import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
import * as i3 from "primeng/button";
import * as i4 from "primeng/tooltip";
import * as i5 from "@angular/router";
export class SpeedDial {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.model = null;
        this.direction = 'up';
        this.transitionDelay = 30;
        this.type = 'linear';
        this.radius = 0;
        this.mask = false;
        this.disabled = false;
        this.hideOnClickOutside = true;
        this.showIcon = 'pi pi-plus';
        this.rotateAnimation = true;
        this.onVisibleChange = new EventEmitter();
        this.visibleChange = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.isItemClicked = false;
        this._visible = false;
    }
    get visible() {
        return this._visible;
    }
    set visible(value) {
        this._visible = value;
        if (this._visible) {
            this.bindDocumentClickListener();
        }
        else {
            this.unbindDocumentClickListener();
        }
    }
    ngAfterViewInit() {
        if (this.type !== 'linear') {
            const button = DomHandler.findSingle(this.container.nativeElement, '.p-speeddial-button');
            const firstItem = DomHandler.findSingle(this.list.nativeElement, '.p-speeddial-item');
            if (button && firstItem) {
                const wDiff = Math.abs(button.offsetWidth - firstItem.offsetWidth);
                const hDiff = Math.abs(button.offsetHeight - firstItem.offsetHeight);
                this.list.nativeElement.style.setProperty('--item-diff-x', `${wDiff / 2}px`);
                this.list.nativeElement.style.setProperty('--item-diff-y', `${hDiff / 2}px`);
            }
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'button':
                    this.buttonTemplate = item.template;
                    break;
            }
        });
    }
    show() {
        this.onVisibleChange.emit(true);
        this.visibleChange.emit(true);
        this._visible = true;
        this.onShow.emit();
        this.bindDocumentClickListener();
        this.cd.markForCheck();
    }
    hide() {
        this.onVisibleChange.emit(false);
        this.visibleChange.emit(false);
        this._visible = false;
        this.onHide.emit();
        this.unbindDocumentClickListener();
        this.cd.markForCheck();
    }
    onButtonClick(event) {
        this.visible ? this.hide() : this.show();
        this.onClick.emit(event);
        this.isItemClicked = true;
    }
    onItemClick(e, item) {
        if (item.command) {
            item.command({ originalEvent: e, item });
        }
        this.hide();
        this.isItemClicked = true;
    }
    calculatePointStyle(index) {
        const type = this.type;
        if (type !== 'linear') {
            const length = this.model.length;
            const radius = this.radius || (length * 20);
            if (type === 'circle') {
                const step = 2 * Math.PI / length;
                return {
                    left: `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`,
                    top: `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`,
                };
            }
            else if (type === 'semi-circle') {
                const direction = this.direction;
                const step = Math.PI / (length - 1);
                const x = `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`;
                const y = `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`;
                if (direction === 'up') {
                    return { left: x, bottom: y };
                }
                else if (direction === 'down') {
                    return { left: x, top: y };
                }
                else if (direction === 'left') {
                    return { right: y, top: x };
                }
                else if (direction === 'right') {
                    return { left: y, top: x };
                }
            }
            else if (type === 'quarter-circle') {
                const direction = this.direction;
                const step = Math.PI / (2 * (length - 1));
                const x = `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`;
                const y = `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`;
                if (direction === 'up-left') {
                    return { right: x, bottom: y };
                }
                else if (direction === 'up-right') {
                    return { left: x, bottom: y };
                }
                else if (direction === 'down-left') {
                    return { right: y, top: x };
                }
                else if (direction === 'down-right') {
                    return { left: y, top: x };
                }
            }
        }
        return {};
    }
    calculateTransitionDelay(index) {
        const length = this.model.length;
        return (this.visible ? index : length - index - 1) * this.transitionDelay;
    }
    containerClass() {
        return {
            ['p-speeddial p-component' + ` p-speeddial-${this.type}`]: true,
            [`p-speeddial-direction-${this.direction}`]: this.type !== 'circle',
            'p-speeddial-opened': this.visible,
            'p-disabled': this.disabled
        };
    }
    buttonClass() {
        return {
            'p-speeddial-button p-button-rounded': true,
            'p-speeddial-rotate': this.rotateAnimation && !this.hideIcon,
            [this.buttonClassName]: true
        };
    }
    get buttonIconClass() {
        return ((!this.visible && this.showIcon) || !this.hideIcon) ? this.showIcon : this.hideIcon;
    }
    getItemStyle(index) {
        const transitionDelay = this.calculateTransitionDelay(index);
        const pointStyle = this.calculatePointStyle(index);
        return Object.assign({ transitionDelay: `${transitionDelay}ms` }, pointStyle);
    }
    isClickableRouterLink(item) {
        return item.routerLink && !this.disabled && !item.disabled;
    }
    isOutsideClicked(event) {
        return this.container && !(this.container.nativeElement.isSameNode(event.target) || this.container.nativeElement.contains(event.target) || this.isItemClicked);
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener && this.hideOnClickOutside) {
            this.documentClickListener = (event) => {
                if (this.visible && this.isOutsideClicked(event)) {
                    this.hide();
                }
                this.isItemClicked = false;
            };
            document.addEventListener('click', this.documentClickListener);
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            document.removeEventListener('click', this.documentClickListener);
            this.documentClickListener = null;
        }
    }
    ngOnDestroy() {
        this.unbindDocumentClickListener();
    }
}
SpeedDial.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SpeedDial, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
SpeedDial.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: SpeedDial, selector: "p-speedDial", inputs: { id: "id", model: "model", visible: "visible", style: "style", className: "className", direction: "direction", transitionDelay: "transitionDelay", type: "type", radius: "radius", mask: "mask", disabled: "disabled", hideOnClickOutside: "hideOnClickOutside", buttonStyle: "buttonStyle", buttonClassName: "buttonClassName", maskStyle: "maskStyle", maskClassName: "maskClassName", showIcon: "showIcon", hideIcon: "hideIcon", rotateAnimation: "rotateAnimation" }, outputs: { onVisibleChange: "onVisibleChange", visibleChange: "visibleChange", onClick: "onClick", onShow: "onShow", onHide: "onHide" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true }, { propertyName: "list", first: true, predicate: ["list"], descendants: true }], ngImport: i0, template: `
        <div #container [attr.id]="id" [ngClass]="containerClass()" [class]="className" [ngStyle]="style">
            <button pRipple pButton [style]="buttonStyle" [icon]="buttonIconClass" [ngClass]="buttonClass()" (click)="onButtonClick($event)">
                <ng-container *ngIf="buttonTemplate">
                    <ng-container *ngTemplateOutlet="buttonTemplate"></ng-container>
                </ng-container>
            </button>
            <ul #list class="p-speeddial-list" role="menu">
                <li *ngFor="let item of model; let i = index" [ngStyle]="getItemStyle(i)" class="p-speeddial-item" pTooltip [tooltipOptions]="item.tooltipOptions">
                    <a *ngIf="isClickableRouterLink(item); else elseBlock" pRipple [routerLink]="item.routerLink" [queryParams]="item.queryParams" class="p-speeddial-action" [ngClass]="{'p-disabled':item.disabled}"  role="menuitem" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" (click)="onItemClick($event, item)" (keydown.enter)="onItemClick($event, item, i)"
                        [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')"
                        [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                            <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                    </a>
                    <ng-template #elseBlock>
                        <a [attr.href]="item.url||null" class="p-speeddial-action" role="menuitem" pRipple (click)="onItemClick($event, item)" [ngClass]="{'p-disabled':item.disabled}"
                            (keydown.enter)="onItemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')">
                            <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
        <div *ngIf="mask && visible" [ngClass]="{'p-speeddial-mask': true, 'p-speeddial-mask-visible': visible}" [class]="maskClassName" [ngStyle]="maskStyle"></div>
    `, isInline: true, styles: [".p-speeddial{position:absolute;display:flex;z-index:1}.p-speeddial-list{margin:0;padding:0;list-style:none;display:flex;align-items:center;justify-content:center;transition:top 0s linear .2s;pointer-events:none}.p-speeddial-item{transform:scale(0);opacity:0;transition:transform .2s cubic-bezier(.4,0,.2,1) 0ms,opacity .8s;will-change:transform}.p-speeddial-action{display:flex;align-items:center;justify-content:center;border-radius:50%;position:relative;overflow:hidden;cursor:pointer}.p-speeddial-circle .p-speeddial-item,.p-speeddial-quarter-circle .p-speeddial-item,.p-speeddial-semi-circle .p-speeddial-item{position:absolute}.p-speeddial-rotate{transition:transform .25s cubic-bezier(.4,0,.2,1) 0ms;will-change:transform}.p-speeddial-mask{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;transition:opacity .25s cubic-bezier(.25,.8,.25,1)}.p-speeddial-mask-visible{pointer-events:none;opacity:1;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.p-speeddial-opened .p-speeddial-list{pointer-events:auto}.p-speeddial-opened .p-speeddial-item{transform:scale(1);opacity:1}.p-speeddial-opened .p-speeddial-rotate{transform:rotate(45deg)}.p-speeddial-direction-up{align-items:center}.p-speeddial-direction-up,.p-speeddial-direction-up .p-speeddial-list{flex-direction:column-reverse}.p-speeddial-direction-down{align-items:center;flex-direction:column}.p-speeddial-direction-down .p-speeddial-list{flex-direction:column}.p-speeddial-direction-left{justify-content:center;flex-direction:row-reverse}.p-speeddial-direction-left .p-speeddial-list{flex-direction:row-reverse}.p-speeddial-direction-right{justify-content:center;flex-direction:row}.p-speeddial-direction-right .p-speeddial-list{flex-direction:row}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.Ripple, selector: "[pRipple]" }, { type: i3.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i5.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SpeedDial, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-speedDial',
                    template: `
        <div #container [attr.id]="id" [ngClass]="containerClass()" [class]="className" [ngStyle]="style">
            <button pRipple pButton [style]="buttonStyle" [icon]="buttonIconClass" [ngClass]="buttonClass()" (click)="onButtonClick($event)">
                <ng-container *ngIf="buttonTemplate">
                    <ng-container *ngTemplateOutlet="buttonTemplate"></ng-container>
                </ng-container>
            </button>
            <ul #list class="p-speeddial-list" role="menu">
                <li *ngFor="let item of model; let i = index" [ngStyle]="getItemStyle(i)" class="p-speeddial-item" pTooltip [tooltipOptions]="item.tooltipOptions">
                    <a *ngIf="isClickableRouterLink(item); else elseBlock" pRipple [routerLink]="item.routerLink" [queryParams]="item.queryParams" class="p-speeddial-action" [ngClass]="{'p-disabled':item.disabled}"  role="menuitem" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" (click)="onItemClick($event, item)" (keydown.enter)="onItemClick($event, item, i)"
                        [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')"
                        [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                            <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                    </a>
                    <ng-template #elseBlock>
                        <a [attr.href]="item.url||null" class="p-speeddial-action" role="menuitem" pRipple (click)="onItemClick($event, item)" [ngClass]="{'p-disabled':item.disabled}"
                            (keydown.enter)="onItemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')">
                            <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
        <div *ngIf="mask && visible" [ngClass]="{'p-speeddial-mask': true, 'p-speeddial-mask-visible': visible}" [class]="maskClassName" [ngStyle]="maskStyle"></div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./speeddial.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { id: [{
                type: Input
            }], model: [{
                type: Input
            }], visible: [{
                type: Input
            }], style: [{
                type: Input
            }], className: [{
                type: Input
            }], direction: [{
                type: Input
            }], transitionDelay: [{
                type: Input
            }], type: [{
                type: Input
            }], radius: [{
                type: Input
            }], mask: [{
                type: Input
            }], disabled: [{
                type: Input
            }], hideOnClickOutside: [{
                type: Input
            }], buttonStyle: [{
                type: Input
            }], buttonClassName: [{
                type: Input
            }], maskStyle: [{
                type: Input
            }], maskClassName: [{
                type: Input
            }], showIcon: [{
                type: Input
            }], hideIcon: [{
                type: Input
            }], rotateAnimation: [{
                type: Input
            }], onVisibleChange: [{
                type: Output
            }], visibleChange: [{
                type: Output
            }], onClick: [{
                type: Output
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], container: [{
                type: ViewChild,
                args: ['container']
            }], list: [{
                type: ViewChild,
                args: ['list']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class SpeedDialModule {
}
SpeedDialModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SpeedDialModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SpeedDialModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SpeedDialModule, declarations: [SpeedDial], imports: [CommonModule, ButtonModule, RippleModule, TooltipModule, RouterModule], exports: [SpeedDial, SharedModule, ButtonModule, TooltipModule, RouterModule] });
SpeedDialModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SpeedDialModule, imports: [[CommonModule, ButtonModule, RippleModule, TooltipModule, RouterModule], SharedModule, ButtonModule, TooltipModule, RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SpeedDialModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ButtonModule, RippleModule, TooltipModule, RouterModule],
                    exports: [SpeedDial, SharedModule, ButtonModule, TooltipModule, RouterModule],
                    declarations: [SpeedDial]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWRkaWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3NwZWVkZGlhbC9zcGVlZGRpYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFjLHVCQUF1QixFQUFFLGlCQUFpQixFQUFpQyxlQUFlLEVBQWEsTUFBTSxFQUFFLFlBQVksRUFBcUIsU0FBUyxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUNwUSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQVksTUFBTSxhQUFhLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7QUFpQy9DLE1BQU0sT0FBTyxTQUFTO0lBNEVsQixZQUFvQixFQUFjLEVBQVMsRUFBcUI7UUFBNUMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBeEV2RCxVQUFLLEdBQVUsSUFBSSxDQUFDO1FBb0JwQixjQUFTLEdBQVksSUFBSSxDQUFBO1FBRXpCLG9CQUFlLEdBQVcsRUFBRSxDQUFDO1FBRTdCLFNBQUksR0FBWSxRQUFRLENBQUE7UUFFeEIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUVuQixTQUFJLEdBQVksS0FBSyxDQUFDO1FBRXRCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFMUIsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBVW5D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QUVlLFNBQVM7c0JBQXhDLGVBQWU7dUJBQUMsYUFBYTs7QUF5TWxDLE1BQU0sT0FBTyxlQUFlOzs0R0FBZixlQUFlOzZHQUFmLGVBQWUsaUJBM1FmLFNBQVMsYUF1UVIsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksYUF2UXRFLFNBQVMsRUF3UUcsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWTs2R0FHbkUsZUFBZSxZQUpmLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQyxFQUMzRCxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZOzJGQUduRSxlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUM7b0JBQ2hGLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUM7b0JBQzdFLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQztpQkFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBUZW1wbGF0ZVJlZiwgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkLCBPbkRlc3Ryb3ksIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSwgUHJpbWVUZW1wbGF0ZSwgTWVudUl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XG5pbXBvcnQgeyBSaXBwbGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc3BlZWREaWFsJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW2F0dHIuaWRdPVwiaWRcIiBbbmdDbGFzc109XCJjb250YWluZXJDbGFzcygpXCIgW2NsYXNzXT1cImNsYXNzTmFtZVwiIFtuZ1N0eWxlXT1cInN0eWxlXCI+XG4gICAgICAgICAgICA8YnV0dG9uIHBSaXBwbGUgcEJ1dHRvbiBbc3R5bGVdPVwiYnV0dG9uU3R5bGVcIiBbaWNvbl09XCJidXR0b25JY29uQ2xhc3NcIiBbbmdDbGFzc109XCJidXR0b25DbGFzcygpXCIgKGNsaWNrKT1cIm9uQnV0dG9uQ2xpY2soJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJidXR0b25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYnV0dG9uVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPHVsICNsaXN0IGNsYXNzPVwicC1zcGVlZGRpYWwtbGlzdFwiIHJvbGU9XCJtZW51XCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIG1vZGVsOyBsZXQgaSA9IGluZGV4XCIgW25nU3R5bGVdPVwiZ2V0SXRlbVN0eWxlKGkpXCIgY2xhc3M9XCJwLXNwZWVkZGlhbC1pdGVtXCIgcFRvb2x0aXAgW3Rvb2x0aXBPcHRpb25zXT1cIml0ZW0udG9vbHRpcE9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJpc0NsaWNrYWJsZVJvdXRlckxpbmsoaXRlbSk7IGVsc2UgZWxzZUJsb2NrXCIgcFJpcHBsZSBbcm91dGVyTGlua109XCJpdGVtLnJvdXRlckxpbmtcIiBbcXVlcnlQYXJhbXNdPVwiaXRlbS5xdWVyeVBhcmFtc1wiIGNsYXNzPVwicC1zcGVlZGRpYWwtYWN0aW9uXCIgW25nQ2xhc3NdPVwieydwLWRpc2FibGVkJzppdGVtLmRpc2FibGVkfVwiICByb2xlPVwibWVudWl0ZW1cIiBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiaXRlbS5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc3x8e2V4YWN0OmZhbHNlfVwiIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsIGl0ZW0pXCIgKGtleWRvd24uZW50ZXIpPVwib25JdGVtQ2xpY2soJGV2ZW50LCBpdGVtLCBpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci5pZF09XCJpdGVtLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS5kaXNhYmxlZCB8fCByZWFkb25seSA/IG51bGwgOiAoaXRlbS50YWJpbmRleCA/IGl0ZW0udGFiaW5kZXggOiAnMCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmcmFnbWVudF09XCJpdGVtLmZyYWdtZW50XCIgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiaXRlbS5xdWVyeVBhcmFtc0hhbmRsaW5nXCIgW3ByZXNlcnZlRnJhZ21lbnRdPVwiaXRlbS5wcmVzZXJ2ZUZyYWdtZW50XCIgW3NraXBMb2NhdGlvbkNoYW5nZV09XCJpdGVtLnNraXBMb2NhdGlvbkNoYW5nZVwiIFtyZXBsYWNlVXJsXT1cIml0ZW0ucmVwbGFjZVVybFwiIFtzdGF0ZV09XCJpdGVtLnN0YXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXNwZWVkZGlhbC1hY3Rpb24taWNvblwiICpuZ0lmPVwiaXRlbS5pY29uXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZWxzZUJsb2NrPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgW2F0dHIuaHJlZl09XCJpdGVtLnVybHx8bnVsbFwiIGNsYXNzPVwicC1zcGVlZGRpYWwtYWN0aW9uXCIgcm9sZT1cIm1lbnVpdGVtXCIgcFJpcHBsZSAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCBpdGVtKVwiIFtuZ0NsYXNzXT1cInsncC1kaXNhYmxlZCc6aXRlbS5kaXNhYmxlZH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgaXRlbSwgaSlcIiBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci5pZF09XCJpdGVtLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS5kaXNhYmxlZHx8KGkgIT09IGFjdGl2ZUluZGV4ICYmIHJlYWRvbmx5KSA/IG51bGwgOiAoaXRlbS50YWJpbmRleCA/IGl0ZW0udGFiaW5kZXggOiAnMCcpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXNwZWVkZGlhbC1hY3Rpb24taWNvblwiICpuZ0lmPVwiaXRlbS5pY29uXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIm1hc2sgJiYgdmlzaWJsZVwiIFtuZ0NsYXNzXT1cInsncC1zcGVlZGRpYWwtbWFzayc6IHRydWUsICdwLXNwZWVkZGlhbC1tYXNrLXZpc2libGUnOiB2aXNpYmxlfVwiIFtjbGFzc109XCJtYXNrQ2xhc3NOYW1lXCIgW25nU3R5bGVdPVwibWFza1N0eWxlXCI+PC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL3NwZWVkZGlhbC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTcGVlZERpYWwgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG1vZGVsOiBhbnlbXSA9IG51bGw7XG5cbiAgICBASW5wdXQoKSBnZXQgdmlzaWJsZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9XG4gICAgc2V0IHZpc2libGUodmFsdWU6YW55KSB7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIGNsYXNzTmFtZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZGlyZWN0aW9uOiBzdHJpbmcgPSAgJ3VwJ1xuXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbkRlbGF5OiBudW1iZXIgPSAzMDtcblxuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZyA9ICAnbGluZWFyJ1xuXG4gICAgQElucHV0KCkgcmFkaXVzOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgbWFzazogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGhpZGVPbkNsaWNrT3V0c2lkZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBidXR0b25TdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgYnV0dG9uQ2xhc3NOYW1lOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBtYXNrU3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIG1hc2tDbGFzc05hbWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHNob3dJY29uOiBzdHJpbmcgPSAncGkgcGktcGx1cyc7XG5cbiAgICBASW5wdXQoKSBoaWRlSWNvbjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcm90YXRlQW5pbWF0aW9uOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBPdXRwdXQoKSBvblZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIHZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25IaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lcjogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ2xpc3QnKSBsaXN0OiBFbGVtZW50UmVmO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgYnV0dG9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBpc0l0ZW1DbGlja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBfdmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPT0gJ2xpbmVhcicpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnLnAtc3BlZWRkaWFsLWJ1dHRvbicpO1xuICAgICAgICAgICAgY29uc3QgZmlyc3RJdGVtID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMubGlzdC5uYXRpdmVFbGVtZW50LCAnLnAtc3BlZWRkaWFsLWl0ZW0nKTtcblxuICAgICAgICAgICAgaWYgKGJ1dHRvbiAmJiBmaXJzdEl0ZW0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3RGlmZiA9IE1hdGguYWJzKGJ1dHRvbi5vZmZzZXRXaWR0aCAtIGZpcnN0SXRlbS5vZmZzZXRXaWR0aCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaERpZmYgPSBNYXRoLmFicyhidXR0b24ub2Zmc2V0SGVpZ2h0IC0gZmlyc3RJdGVtLm9mZnNldEhlaWdodCk7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0taXRlbS1kaWZmLXgnLCBgJHt3RGlmZiAvIDJ9cHhgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1pdGVtLWRpZmYteScsIGAke2hEaWZmIC8gMn1weGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2goaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdidXR0b24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5vblZpc2libGVDaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICAgICAgdGhpcy52aXNpYmxlQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KCk7XG4gICAgICAgIHRoaXMuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMub25WaXNpYmxlQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkhpZGUuZW1pdCgpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uQnV0dG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKTtcbiAgICAgICAgdGhpcy5vbkNsaWNrLmVtaXQoZXZlbnQpXG4gICAgICAgIHRoaXMuaXNJdGVtQ2xpY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25JdGVtQ2xpY2soZSwgaXRlbSkge1xuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoeyBvcmlnaW5hbEV2ZW50OiBlLCBpdGVtIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaWRlKCk7XG5cbiAgICAgICAgdGhpcy5pc0l0ZW1DbGlja2VkID0gdHJ1ZTtcbiAgICB9XG5cblxuICAgIGNhbGN1bGF0ZVBvaW50U3R5bGUoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMudHlwZTtcblxuICAgICAgICBpZiAodHlwZSAhPT0gJ2xpbmVhcicpIHtcbiAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubW9kZWwubGVuZ3RoO1xuICAgICAgICAgICAgY29uc3QgcmFkaXVzID0gdGhpcy5yYWRpdXMgfHwgKGxlbmd0aCAqIDIwKTtcblxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdjaXJjbGUnKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcCA9IDIgKiBNYXRoLlBJIC8gbGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogYGNhbGMoJHtyYWRpdXMgKiBNYXRoLmNvcyhzdGVwICogaW5kZXgpfXB4ICsgdmFyKC0taXRlbS1kaWZmLXgsIDBweCkpYCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBgY2FsYygke3JhZGl1cyAqIE1hdGguc2luKHN0ZXAgKiBpbmRleCl9cHggKyB2YXIoLS1pdGVtLWRpZmYteSwgMHB4KSlgLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdzZW1pLWNpcmNsZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGVwID0gTWF0aC5QSSAvIChsZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gYGNhbGMoJHtyYWRpdXMgKiBNYXRoLmNvcyhzdGVwICogaW5kZXgpfXB4ICsgdmFyKC0taXRlbS1kaWZmLXgsIDBweCkpYDtcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gYGNhbGMoJHtyYWRpdXMgKiBNYXRoLnNpbihzdGVwICogaW5kZXgpfXB4ICsgdmFyKC0taXRlbS1kaWZmLXksIDBweCkpYDtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAndXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGxlZnQ6IHgsIGJvdHRvbTogeSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdkb3duJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBsZWZ0OiB4LCB0b3A6IHkgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcmlnaHQ6IHksIHRvcDogeCB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbGVmdDogeSwgdG9wOiB4IH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3F1YXJ0ZXItY2lyY2xlJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0ZXAgPSBNYXRoLlBJIC8gKDIgKiAobGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHggPSBgY2FsYygke3JhZGl1cyAqIE1hdGguY29zKHN0ZXAgKiBpbmRleCl9cHggKyB2YXIoLS1pdGVtLWRpZmYteCwgMHB4KSlgO1xuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBgY2FsYygke3JhZGl1cyAqIE1hdGguc2luKHN0ZXAgKiBpbmRleCl9cHggKyB2YXIoLS1pdGVtLWRpZmYteSwgMHB4KSlgO1xuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICd1cC1sZWZ0Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyByaWdodDogeCwgYm90dG9tOiB5IH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3VwLXJpZ2h0Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBsZWZ0OiB4LCBib3R0b206IHkgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZG93bi1sZWZ0Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyByaWdodDogeSwgdG9wOiB4IH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rvd24tcmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGxlZnQ6IHksIHRvcDogeCB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVUcmFuc2l0aW9uRGVsYXkoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5tb2RlbC5sZW5ndGg7XG5cbiAgICAgICAgcmV0dXJuICh0aGlzLnZpc2libGUgPyBpbmRleCA6IGxlbmd0aCAtIGluZGV4IC0gMSkgKiB0aGlzLnRyYW5zaXRpb25EZWxheTtcbiAgICB9XG5cbiAgICBjb250YWluZXJDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFsncC1zcGVlZGRpYWwgcC1jb21wb25lbnQnICsgYCBwLXNwZWVkZGlhbC0ke3RoaXMudHlwZX1gXTogdHJ1ZSxcbiAgICAgICAgICAgIFtgcC1zcGVlZGRpYWwtZGlyZWN0aW9uLSR7dGhpcy5kaXJlY3Rpb259YF06IHRoaXMudHlwZSAhPT0gJ2NpcmNsZScsXG4gICAgICAgICAgICAncC1zcGVlZGRpYWwtb3BlbmVkJzogdGhpcy52aXNpYmxlLFxuICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYnV0dG9uQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1zcGVlZGRpYWwtYnV0dG9uIHAtYnV0dG9uLXJvdW5kZWQnOiB0cnVlLFxuICAgICAgICAgICAgJ3Atc3BlZWRkaWFsLXJvdGF0ZSc6IHRoaXMucm90YXRlQW5pbWF0aW9uICYmICF0aGlzLmhpZGVJY29uLFxuICAgICAgICAgICAgW3RoaXMuYnV0dG9uQ2xhc3NOYW1lXTogdHJ1ZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldCBidXR0b25JY29uQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiAoKCF0aGlzLnZpc2libGUgJiYgdGhpcy5zaG93SWNvbikgfHwgIXRoaXMuaGlkZUljb24pID8gdGhpcy5zaG93SWNvbiA6IHRoaXMuaGlkZUljb247XG4gICAgfVxuXG4gICAgZ2V0SXRlbVN0eWxlKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb25EZWxheSA9IHRoaXMuY2FsY3VsYXRlVHJhbnNpdGlvbkRlbGF5KGluZGV4KTtcbiAgICAgICAgY29uc3QgcG9pbnRTdHlsZSA9IHRoaXMuY2FsY3VsYXRlUG9pbnRTdHlsZShpbmRleCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uRGVsYXk6IGAke3RyYW5zaXRpb25EZWxheX1tc2AsXG4gICAgICAgICAgICAuLi5wb2ludFN0eWxlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaXNDbGlja2FibGVSb3V0ZXJMaW5rKGl0ZW06IE1lbnVJdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnJvdXRlckxpbmsgJiYgIXRoaXMuZGlzYWJsZWQgJiYgIWl0ZW0uZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgaXNPdXRzaWRlQ2xpY2tlZChldmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIgJiYgISh0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LmlzU2FtZU5vZGUoZXZlbnQudGFyZ2V0KSB8fCB0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgfHwgdGhpcy5pc0l0ZW1DbGlja2VkKTtcbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyICYmIHRoaXMuaGlkZU9uQ2xpY2tPdXRzaWRlKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGUgJiYgdGhpcy5pc091dHNpZGVDbGlja2VkKGV2ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlzSXRlbUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBCdXR0b25Nb2R1bGUsIFJpcHBsZU1vZHVsZSwgVG9vbHRpcE1vZHVsZSwgUm91dGVyTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbU3BlZWREaWFsLCBTaGFyZWRNb2R1bGUsIEJ1dHRvbk1vZHVsZSwgVG9vbHRpcE1vZHVsZSwgUm91dGVyTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTcGVlZERpYWxdXG59KVxuZXhwb3J0IGNsYXNzIFNwZWVkRGlhbE1vZHVsZSB7IH1cbiJdfQ==