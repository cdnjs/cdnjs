import * as i0 from '@angular/core';
import { forwardRef, Component, ViewEncapsulation, Inject, Input, EventEmitter, ChangeDetectionStrategy, ViewChild, Output, NgModule } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import * as i2 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i3 from 'primeng/ripple';
import { RippleModule } from 'primeng/ripple';
import * as i5 from 'primeng/tooltip';
import { TooltipModule } from 'primeng/tooltip';
import * as i4 from 'primeng/api';

class MenuItemContent {
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
class Menu {
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
class MenuModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { Menu, MenuItemContent, MenuModule };
//# sourceMappingURL=primeng-menu.js.map
