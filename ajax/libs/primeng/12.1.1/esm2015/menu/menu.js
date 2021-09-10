import { NgModule, Component, Input, Output, EventEmitter, ViewChild, Inject, forwardRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/api";
import * as i5 from "primeng/tooltip";
export class MenuItemContent {
    constructor(menu) {
        this.menu = menu;
    }
}
MenuItemContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MenuItemContent, deps: [{ token: forwardRef(() => Menu) }], target: i0.ɵɵFactoryTarget.Component });
MenuItemContent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: MenuItemContent, selector: "[pMenuItemContent]", inputs: { item: ["pMenuItemContent", "item"] }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <a *ngIf="!item.routerLink" [attr.href]="item.url||null" class="p-menuitem-link" [attr.tabindex]="item.disabled ? null : '0'" [attr.data-automationid]="item.automationId" [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id"
            [ngClass]="{'p-disabled':item.disabled}" (click)="menu.itemClick($event, item)" role="menuitem">
            <span class="p-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{item.label}}</span>
            <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
        </a>
        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [attr.data-automationid]="item.automationId" [queryParams]="item.queryParams" [routerLinkActive]="'p-menuitem-link-active'"
            [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled ? null : '0'"
            [attr.title]="item.title" [ngClass]="{'p-disabled':item.disabled}" (click)="menu.itemClick($event, item)" role="menuitem" pRipple
            [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
            <span class="p-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlRouteLabel">{{item.label}}</span>
            <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
        </a>
    `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i3.Ripple, selector: "[pRipple]" }, { type: i2.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MenuItemContent, decorators: [{
            type: Component,
            args: [{
                    selector: '[pMenuItemContent]',
                    template: `
        <a *ngIf="!item.routerLink" [attr.href]="item.url||null" class="p-menuitem-link" [attr.tabindex]="item.disabled ? null : '0'" [attr.data-automationid]="item.automationId" [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id"
            [ngClass]="{'p-disabled':item.disabled}" (click)="menu.itemClick($event, item)" role="menuitem">
            <span class="p-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{item.label}}</span>
            <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
        </a>
        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [attr.data-automationid]="item.automationId" [queryParams]="item.queryParams" [routerLinkActive]="'p-menuitem-link-active'"
            [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled ? null : '0'"
            [attr.title]="item.title" [ngClass]="{'p-disabled':item.disabled}" (click)="menu.itemClick($event, item)" role="menuitem" pRipple
            [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
            <span class="p-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlRouteLabel">{{item.label}}</span>
            <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
        </a>
    `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => Menu)]
                }] }]; }, propDecorators: { item: [{
                type: Input,
                args: ["pMenuItemContent"]
            }] } });
export class Menu {
    constructor(el, renderer, cd, config, overlayService) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.config = config;
        this.overlayService = overlayService;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
    }
    toggle(event) {
        if (this.visible)
            this.hide();
        else
            this.show(event);
        this.preventDocumentDefault = true;
    }
    show(event) {
        this.target = event.currentTarget;
        this.relativeAlign = event.relativeAlign;
        this.visible = true;
        this.preventDocumentDefault = true;
        this.cd.markForCheck();
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                if (this.popup) {
                    this.container = event.element;
                    this.moveOnTop();
                    this.onShow.emit({});
                    this.appendOverlay();
                    this.alignOverlay();
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                    this.bindScrollListener();
                }
                break;
            case 'void':
                this.onOverlayHide();
                this.onHide.emit({});
                break;
        }
    }
    onOverlayAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                if (this.autoZIndex) {
                    ZIndexUtils.clear(event.element);
                }
                break;
        }
    }
    alignOverlay() {
        if (this.relativeAlign)
            DomHandler.relativePosition(this.container, this.target);
        else
            DomHandler.absolutePosition(this.container, this.target);
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }
    restoreOverlayAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    }
    moveOnTop() {
        if (this.autoZIndex) {
            ZIndexUtils.set('menu', this.container, this.baseZIndex + this.config.zIndex.menu);
        }
    }
    hide() {
        this.visible = false;
        this.relativeAlign = false;
        this.cd.markForCheck();
    }
    onWindowResize() {
        this.hide();
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
        if (this.popup) {
            this.hide();
        }
    }
    onOverlayClick(event) {
        if (this.popup) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
        }
        this.preventDocumentDefault = true;
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.documentClickListener = this.renderer.listen(documentTarget, 'click', () => {
                if (!this.preventDocumentDefault) {
                    this.hide();
                }
                this.preventDocumentDefault = false;
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
                if (this.visible) {
                    this.hide();
                }
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.preventDocumentDefault = false;
        this.target = null;
    }
    ngOnDestroy() {
        if (this.popup) {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }
            if (this.container && this.autoZIndex) {
                ZIndexUtils.clear(this.container);
            }
            this.restoreOverlayAppend();
            this.onOverlayHide();
        }
    }
    hasSubMenu() {
        if (this.model) {
            for (var item of this.model) {
                if (item.items) {
                    return true;
                }
            }
        }
        return false;
    }
}
Menu.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Menu, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i4.PrimeNGConfig }, { token: i4.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
Menu.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Menu, selector: "p-menu", inputs: { model: "model", popup: "popup", style: "style", styleClass: "styleClass", appendTo: "appendTo", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onShow: "onShow", onHide: "onHide" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="{'p-menu p-component': true, 'p-menu-overlay': popup}"
            [class]="styleClass" [ngStyle]="style" *ngIf="!popup || visible" (click)="onOverlayClick($event)"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="popup !== true" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationEnd($event)">
            <ul class="p-menu-list p-reset">
                <ng-template ngFor let-submenu [ngForOf]="model" *ngIf="hasSubMenu()">
                    <li class="p-menu-separator" *ngIf="submenu.separator" [ngClass]="{'p-hidden': submenu.visible === false}"></li>
                    <li class="p-submenu-header" [attr.data-automationid]="submenu.automationId" *ngIf="!submenu.separator" [ngClass]="{'p-hidden': submenu.visible === false}">
                        <span *ngIf="submenu.escape !== false; else htmlSubmenuLabel">{{submenu.label}}</span>
                        <ng-template #htmlSubmenuLabel><span [innerHTML]="submenu.label"></span></ng-template>
                    </li>
                    <ng-template ngFor let-item [ngForOf]="submenu.items">
                        <li class="p-menu-separator" *ngIf="item.separator" [ngClass]="{'p-hidden': (item.visible === false || submenu.visible === false)}"></li>
                        <li class="p-menuitem" *ngIf="!item.separator" [pMenuItemContent]="item" [ngClass]="{'p-hidden': (item.visible === false || submenu.visible === false)}" [ngStyle]="item.style" [class]="item.styleClass"></li>
                    </ng-template>
                </ng-template>
                <ng-template ngFor let-item [ngForOf]="model" *ngIf="!hasSubMenu()">
                    <li class="p-menu-separator" *ngIf="item.separator" [ngClass]="{'p-hidden': item.visible === false}"></li>
                    <li class="p-menuitem" *ngIf="!item.separator" [pMenuItemContent]="item" [ngClass]="{'p-hidden': item.visible === false}" [ngStyle]="item.style" [class]="item.styleClass" pTooltip [tooltipOptions]="item.tooltipOptions"></li>
                </ng-template>
            </ul>
        </div>
    `, isInline: true, styles: [".p-menu-overlay{position:absolute;top:0;left:0}.p-menu ul{margin:0;padding:0;list-style:none}.p-menu .p-menuitem-link{cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden;position:relative}.p-menu .p-menuitem-text{line-height:1}"], components: [{ type: MenuItemContent, selector: "[pMenuItemContent]", inputs: ["pMenuItemContent"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }], animations: [
        trigger('overlayAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scaleY(0.8)' }),
                animate('{{showTransitionParams}}')
            ]),
            transition(':leave', [
                animate('{{hideTransitionParams}}', style({ opacity: 0 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Menu, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-menu',
                    template: `
        <div #container [ngClass]="{'p-menu p-component': true, 'p-menu-overlay': popup}"
            [class]="styleClass" [ngStyle]="style" *ngIf="!popup || visible" (click)="onOverlayClick($event)"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="popup !== true" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationEnd($event)">
            <ul class="p-menu-list p-reset">
                <ng-template ngFor let-submenu [ngForOf]="model" *ngIf="hasSubMenu()">
                    <li class="p-menu-separator" *ngIf="submenu.separator" [ngClass]="{'p-hidden': submenu.visible === false}"></li>
                    <li class="p-submenu-header" [attr.data-automationid]="submenu.automationId" *ngIf="!submenu.separator" [ngClass]="{'p-hidden': submenu.visible === false}">
                        <span *ngIf="submenu.escape !== false; else htmlSubmenuLabel">{{submenu.label}}</span>
                        <ng-template #htmlSubmenuLabel><span [innerHTML]="submenu.label"></span></ng-template>
                    </li>
                    <ng-template ngFor let-item [ngForOf]="submenu.items">
                        <li class="p-menu-separator" *ngIf="item.separator" [ngClass]="{'p-hidden': (item.visible === false || submenu.visible === false)}"></li>
                        <li class="p-menuitem" *ngIf="!item.separator" [pMenuItemContent]="item" [ngClass]="{'p-hidden': (item.visible === false || submenu.visible === false)}" [ngStyle]="item.style" [class]="item.styleClass"></li>
                    </ng-template>
                </ng-template>
                <ng-template ngFor let-item [ngForOf]="model" *ngIf="!hasSubMenu()">
                    <li class="p-menu-separator" *ngIf="item.separator" [ngClass]="{'p-hidden': item.visible === false}"></li>
                    <li class="p-menuitem" *ngIf="!item.separator" [pMenuItemContent]="item" [ngClass]="{'p-hidden': item.visible === false}" [ngStyle]="item.style" [class]="item.styleClass" pTooltip [tooltipOptions]="item.tooltipOptions"></li>
                </ng-template>
            </ul>
        </div>
    `,
                    animations: [
                        trigger('overlayAnimation', [
                            transition(':enter', [
                                style({ opacity: 0, transform: 'scaleY(0.8)' }),
                                animate('{{showTransitionParams}}')
                            ]),
                            transition(':leave', [
                                animate('{{hideTransitionParams}}', style({ opacity: 0 }))
                            ])
                        ])
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./menu.css'],
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i4.PrimeNGConfig }, { type: i4.OverlayService }]; }, propDecorators: { model: [{
                type: Input
            }], popup: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }] } });
export class MenuModule {
}
MenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MenuModule, declarations: [Menu, MenuItemContent], imports: [CommonModule, RouterModule, RippleModule, TooltipModule], exports: [Menu, RouterModule, TooltipModule] });
MenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MenuModule, imports: [[CommonModule, RouterModule, RippleModule, TooltipModule], RouterModule, TooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, RippleModule, TooltipModule],
                    exports: [Menu, RouterModule, TooltipModule],
                    declarations: [Menu, MenuItemContent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9tZW51L21lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQXNCLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFXLFNBQVMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFtQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuTSxPQUFPLEVBQUMsT0FBTyxFQUFPLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBQzFGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFFLDZCQUE2QixFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXRFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7QUF5QjlDLE1BQU0sT0FBTyxlQUFlO0lBTXhCLFlBQTRDLElBQUk7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFZLENBQUM7SUFDN0IsQ0FBQzs7NEdBUlEsZUFBZSxrQkFNSixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO2dHQU5qQyxlQUFlLGlKQXJCZDs7Ozs7Ozs7Ozs7Ozs7O0tBZVQ7MkZBTVEsZUFBZTtrQkF2QjNCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7S0FlVDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMs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O3VCQUFDLFdBQVc7Z0JBRVosTUFBTTtzQkFBZixNQUFNO2dCQUVHLE1BQU07c0JBQWYsTUFBTTs7QUF3T1gsTUFBTSxPQUFPLFVBQVU7O3VHQUFWLFVBQVU7d0dBQVYsVUFBVSxpQkFoUVYsSUFBSSxFQXRESixlQUFlLGFBa1RkLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLGFBQWEsYUE1UHJELElBQUksRUE2UEUsWUFBWSxFQUFDLGFBQWE7d0dBR2hDLFVBQVUsWUFKVixDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLGFBQWEsQ0FBQyxFQUNoRCxZQUFZLEVBQUMsYUFBYTsyRkFHaEMsVUFBVTtrQkFMdEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxhQUFhLENBQUM7b0JBQy9ELE9BQU8sRUFBRSxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUMsYUFBYSxDQUFDO29CQUMxQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUMsZUFBZSxDQUFDO2lCQUN2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsT25EZXN0cm95LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsUmVuZGVyZXIyLFZpZXdDaGlsZCxJbmplY3QsZm9yd2FyZFJlZixDaGFuZ2VEZXRlY3RvclJlZixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0cmlnZ2VyLHN0YXRlLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZSxBbmltYXRpb25FdmVudH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RG9tSGFuZGxlciwgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7TWVudUl0ZW0sIE92ZXJsYXlTZXJ2aWNlLCBQcmltZU5HQ29uZmlnfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1pJbmRleFV0aWxzfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtSaXBwbGVNb2R1bGV9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7VG9vbHRpcE1vZHVsZX0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbcE1lbnVJdGVtQ29udGVudF0nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxhICpuZ0lmPVwiIWl0ZW0ucm91dGVyTGlua1wiIFthdHRyLmhyZWZdPVwiaXRlbS51cmx8fG51bGxcIiBjbGFzcz1cInAtbWVudWl0ZW0tbGlua1wiIFthdHRyLnRhYmluZGV4XT1cIml0ZW0uZGlzYWJsZWQgPyBudWxsIDogJzAnXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uaWRdPVwiaXRlbS5hdXRvbWF0aW9uSWRcIiBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJpdGVtLnRpdGxlXCIgW2F0dHIuaWRdPVwiaXRlbS5pZFwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3AtZGlzYWJsZWQnOml0ZW0uZGlzYWJsZWR9XCIgKGNsaWNrKT1cIm1lbnUuaXRlbUNsaWNrKCRldmVudCwgaXRlbSlcIiByb2xlPVwibWVudWl0ZW1cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiICpuZ0lmPVwiaXRlbS5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxMYWJlbFwiPnt7aXRlbS5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sTGFiZWw+PHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cIml0ZW0ubGFiZWxcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9hPlxuICAgICAgICA8YSAqbmdJZj1cIml0ZW0ucm91dGVyTGlua1wiIFtyb3V0ZXJMaW5rXT1cIml0ZW0ucm91dGVyTGlua1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbmlkXT1cIml0ZW0uYXV0b21hdGlvbklkXCIgW3F1ZXJ5UGFyYW1zXT1cIml0ZW0ucXVlcnlQYXJhbXNcIiBbcm91dGVyTGlua0FjdGl2ZV09XCIncC1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIlxuICAgICAgICAgICAgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cIml0ZW0ucm91dGVyTGlua0FjdGl2ZU9wdGlvbnN8fHtleGFjdDpmYWxzZX1cIiBjbGFzcz1cInAtbWVudWl0ZW0tbGlua1wiIFthdHRyLnRhcmdldF09XCJpdGVtLnRhcmdldFwiIFthdHRyLmlkXT1cIml0ZW0uaWRcIiBbYXR0ci50YWJpbmRleF09XCJpdGVtLmRpc2FibGVkID8gbnVsbCA6ICcwJ1wiXG4gICAgICAgICAgICBbYXR0ci50aXRsZV09XCJpdGVtLnRpdGxlXCIgW25nQ2xhc3NdPVwieydwLWRpc2FibGVkJzppdGVtLmRpc2FibGVkfVwiIChjbGljayk9XCJtZW51Lml0ZW1DbGljaygkZXZlbnQsIGl0ZW0pXCIgcm9sZT1cIm1lbnVpdGVtXCIgcFJpcHBsZVxuICAgICAgICAgICAgW2ZyYWdtZW50XT1cIml0ZW0uZnJhZ21lbnRcIiBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJpdGVtLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIiBbcHJlc2VydmVGcmFnbWVudF09XCJpdGVtLnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cIml0ZW0uc2tpcExvY2F0aW9uQ2hhbmdlXCIgW3JlcGxhY2VVcmxdPVwiaXRlbS5yZXBsYWNlVXJsXCIgW3N0YXRlXT1cIml0ZW0uc3RhdGVcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiICpuZ0lmPVwiaXRlbS5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxSb3V0ZUxhYmVsXCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxSb3V0ZUxhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJpdGVtLmxhYmVsXCI+PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYT5cbiAgICBgLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWVudUl0ZW1Db250ZW50IHtcblxuICAgIEBJbnB1dChcInBNZW51SXRlbUNvbnRlbnRcIikgaXRlbTogTWVudUl0ZW07XG5cbiAgICBtZW51OiBNZW51O1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1lbnUpKSBtZW51KSB7XG4gICAgICAgIHRoaXMubWVudSA9IG1lbnUgYXMgTWVudTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1tZW51JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwieydwLW1lbnUgcC1jb21wb25lbnQnOiB0cnVlLCAncC1tZW51LW92ZXJsYXknOiBwb3B1cH1cIlxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiICpuZ0lmPVwiIXBvcHVwIHx8IHZpc2libGVcIiAoY2xpY2spPVwib25PdmVybGF5Q2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICBbQG92ZXJsYXlBbmltYXRpb25dPVwie3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3Nob3dUcmFuc2l0aW9uUGFyYW1zOiBzaG93VHJhbnNpdGlvbk9wdGlvbnMsIGhpZGVUcmFuc2l0aW9uUGFyYW1zOiBoaWRlVHJhbnNpdGlvbk9wdGlvbnN9fVwiIFtALmRpc2FibGVkXT1cInBvcHVwICE9PSB0cnVlXCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIiAoQG92ZXJsYXlBbmltYXRpb24uZG9uZSk9XCJvbk92ZXJsYXlBbmltYXRpb25FbmQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwicC1tZW51LWxpc3QgcC1yZXNldFwiPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtc3VibWVudSBbbmdGb3JPZl09XCJtb2RlbFwiICpuZ0lmPVwiaGFzU3ViTWVudSgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInAtbWVudS1zZXBhcmF0b3JcIiAqbmdJZj1cInN1Ym1lbnUuc2VwYXJhdG9yXCIgW25nQ2xhc3NdPVwieydwLWhpZGRlbic6IHN1Ym1lbnUudmlzaWJsZSA9PT0gZmFsc2V9XCI+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1zdWJtZW51LWhlYWRlclwiIFthdHRyLmRhdGEtYXV0b21hdGlvbmlkXT1cInN1Ym1lbnUuYXV0b21hdGlvbklkXCIgKm5nSWY9XCIhc3VibWVudS5zZXBhcmF0b3JcIiBbbmdDbGFzc109XCJ7J3AtaGlkZGVuJzogc3VibWVudS52aXNpYmxlID09PSBmYWxzZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwic3VibWVudS5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxTdWJtZW51TGFiZWxcIj57e3N1Ym1lbnUubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbFN1Ym1lbnVMYWJlbD48c3BhbiBbaW5uZXJIVE1MXT1cInN1Ym1lbnUubGFiZWxcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1pdGVtIFtuZ0Zvck9mXT1cInN1Ym1lbnUuaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInAtbWVudS1zZXBhcmF0b3JcIiAqbmdJZj1cIml0ZW0uc2VwYXJhdG9yXCIgW25nQ2xhc3NdPVwieydwLWhpZGRlbic6IChpdGVtLnZpc2libGUgPT09IGZhbHNlIHx8wqBzdWJtZW51LnZpc2libGUgPT09IGZhbHNlKX1cIj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1tZW51aXRlbVwiICpuZ0lmPVwiIWl0ZW0uc2VwYXJhdG9yXCIgW3BNZW51SXRlbUNvbnRlbnRdPVwiaXRlbVwiIFtuZ0NsYXNzXT1cInsncC1oaWRkZW4nOiAoaXRlbS52aXNpYmxlID09PSBmYWxzZSB8fCBzdWJtZW51LnZpc2libGUgPT09IGZhbHNlKX1cIiBbbmdTdHlsZV09XCJpdGVtLnN0eWxlXCIgW2NsYXNzXT1cIml0ZW0uc3R5bGVDbGFzc1wiPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gW25nRm9yT2ZdPVwibW9kZWxcIiAqbmdJZj1cIiFoYXNTdWJNZW51KClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1tZW51LXNlcGFyYXRvclwiICpuZ0lmPVwiaXRlbS5zZXBhcmF0b3JcIiBbbmdDbGFzc109XCJ7J3AtaGlkZGVuJzogaXRlbS52aXNpYmxlID09PSBmYWxzZX1cIj48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwLW1lbnVpdGVtXCIgKm5nSWY9XCIhaXRlbS5zZXBhcmF0b3JcIiBbcE1lbnVJdGVtQ29udGVudF09XCJpdGVtXCIgW25nQ2xhc3NdPVwieydwLWhpZGRlbic6IGl0ZW0udmlzaWJsZSA9PT0gZmFsc2V9XCIgW25nU3R5bGVdPVwiaXRlbS5zdHlsZVwiIFtjbGFzc109XCJpdGVtLnN0eWxlQ2xhc3NcIiBwVG9vbHRpcCBbdG9vbHRpcE9wdGlvbnNdPVwiaXRlbS50b29sdGlwT3B0aW9uc1wiPjwvbGk+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICdzY2FsZVkoMC44KSd9KSxcbiAgICAgICAgICAgICAgICBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKVxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vbWVudS5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNZW51IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdO1xuXG4gICAgQElucHV0KCkgcG9wdXA6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueTtcblxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xMnMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknO1xuXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnLjFzIGxpbmVhcic7XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAT3V0cHV0KCkgb25TaG93OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcblxuICAgIHNjcm9sbEhhbmRsZXI6IGFueTtcblxuICAgIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYW55O1xuXG4gICAgZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogYW55O1xuXG4gICAgcHJldmVudERvY3VtZW50RGVmYXVsdDogYm9vbGVhbjtcblxuICAgIHRhcmdldDogYW55O1xuXG4gICAgdmlzaWJsZTogYm9vbGVhbjtcblxuICAgIHJlbGF0aXZlQWxpZ246IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGNvbmZpZzogUHJpbWVOR0NvbmZpZywgcHVibGljIG92ZXJsYXlTZXJ2aWNlOiBPdmVybGF5U2VydmljZSkge31cblxuICAgIHRvZ2dsZShldmVudCkge1xuICAgICAgICBpZiAodGhpcy52aXNpYmxlKVxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc2hvdyhldmVudCk7XG5cbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzaG93KGV2ZW50KSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgdGhpcy5yZWxhdGl2ZUFsaWduID0gZXZlbnQucmVsYXRpdmVBbGlnbjtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbk92ZXJsYXlBbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvcHVwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZXZlbnQuZWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlT25Ub3AoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNob3cuZW1pdCh7fSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsaWduT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGlkZS5lbWl0KHt9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcihldmVudC5lbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsaWduT3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVsYXRpdmVBbGlnbilcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVsYXRpdmVQb3NpdGlvbih0aGlzLmNvbnRhaW5lciwgdGhpcy50YXJnZXQpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5jb250YWluZXIsIHRoaXMudGFyZ2V0KTtcbiAgICB9XG5cbiAgICBhcHBlbmRPdmVybGF5KCkge1xuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JylcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyLCB0aGlzLmFwcGVuZFRvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVPdmVybGF5QXBwZW5kKCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVPblRvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuc2V0KCdtZW51JywgdGhpcy5jb250YWluZXIsIHRoaXMuYmFzZVpJbmRleCArIHRoaXMuY29uZmlnLnpJbmRleC5tZW51KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlbGF0aXZlQWxpZ24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbldpbmRvd1Jlc2l6ZSgpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgaXRlbUNsaWNrKGV2ZW50LCBpdGVtOiBNZW51SXRlbSnCoHtcbiAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWl0ZW0udXJsKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW0uY29tbWFuZCkge1xuICAgICAgICAgICAgaXRlbS5jb21tYW5kKHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBvcHVwKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uT3ZlcmxheUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnBvcHVwKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlTZXJ2aWNlLmFkZCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0PXRydWVcbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICBjb25zdCBkb2N1bWVudFRhcmdldDogYW55ID0gdGhpcy5lbCA/IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50IDogJ2RvY3VtZW50JztcblxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudFRhcmdldCwgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucHJldmVudERvY3VtZW50RGVmYXVsdCA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG5ldyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlcih0aGlzLnRhcmdldCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgdW5iaW5kU2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5SGlkZSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMucG9wdXApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcih0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVzdG9yZU92ZXJsYXlBcHBlbmQoKTtcbiAgICAgICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzU3ViTWVudSgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGl0ZW0gb2YgdGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsUm91dGVyTW9kdWxlLFJpcHBsZU1vZHVsZSxUb29sdGlwTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbTWVudSxSb3V0ZXJNb2R1bGUsVG9vbHRpcE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbTWVudSxNZW51SXRlbUNvbnRlbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVNb2R1bGUgeyB9XG4iXX0=