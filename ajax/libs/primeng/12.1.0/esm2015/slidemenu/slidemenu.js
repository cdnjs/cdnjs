import { NgModule, Component, Input, Inject, forwardRef, ViewChild, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';
import { ZIndexUtils } from 'primeng/utils';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/tooltip";
import * as i3 from "@angular/router";
import * as i4 from "primeng/api";
export class SlideMenuSub {
    constructor(slideMenu) {
        this.backLabel = 'Back';
        this.easing = 'ease-out';
        this.slideMenu = slideMenu;
    }
    itemClick(event, item, listitem) {
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
        if (item.items && !this.slideMenu.animating) {
            this.slideMenu.left -= this.slideMenu.menuWidth;
            this.activeItem = listitem;
            this.slideMenu.animating = true;
            setTimeout(() => this.slideMenu.animating = false, this.effectDuration);
        }
        if (!item.items && this.slideMenu.popup) {
            this.slideMenu.hide();
        }
    }
    ngOnDestroy() {
        this.activeItem = null;
    }
}
SlideMenuSub.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SlideMenuSub, deps: [{ token: forwardRef(() => SlideMenu) }], target: i0.ɵɵFactoryTarget.Component });
SlideMenuSub.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: SlideMenuSub, selector: "p-slideMenuSub", inputs: { item: "item", root: "root", backLabel: "backLabel", menuWidth: "menuWidth", effectDuration: "effectDuration", easing: "easing", index: "index" }, ngImport: i0, template: `
        <ul [ngClass]="{'p-slidemenu-rootlist':root, 'p-submenu-list':!root, 'p-active-submenu': (-slideMenu.left == (index * menuWidth))}"
            [style.width.px]="menuWidth" [style.left.px]="root ? slideMenu.left : slideMenu.menuWidth"
            [style.transitionProperty]="root ? 'left' : 'none'" [style.transitionDuration]="effectDuration + 'ms'" [style.transitionTimingFunction]="easing">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="p-menu-separator" [ngClass]="{'p-hidden': child.visible === false}">
                <li *ngIf="!child.separator" #listitem [ngClass]="{'p-menuitem':true,'p-menuitem-active':listitem==activeItem,'p-hidden': child.visible === false}" pTooltip [tooltipOptions]="child.tooltipOptions"
                    [class]="child.styleClass" [ngStyle]="child.style">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url" class="p-menuitem-link" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [ngClass]="{'p-disabled':child.disabled}" [attr.tabindex]="child.disabled ? null : '0'"
                        (click)="itemClick($event, child, listitem)">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text">{{child.label}}</span>
                        <span class="p-submenu-icon pi pi-fw pi-angle-right" *ngIf="child.items"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" [href]="child.url" class="p-menuitem-link"
                        [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.disabled ? null : '0'"
                        [ngClass]="{'p-disabled':child.disabled}"
                        (click)="itemClick($event, child, listitem)"
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text">{{child.label}}</span>
                        <span class="p-submenu-icon pi pi-fw pi-caret-right" *ngIf="child.items"></span>
                    </a>
                    <p-slideMenuSub class="p-submenu" [item]="child" [index]="index + 1" [menuWidth]="menuWidth" *ngIf="child.items"></p-slideMenuSub>
                </li>
            </ng-template>
        </ul>
    `, isInline: true, components: [{ type: SlideMenuSub, selector: "p-slideMenuSub", inputs: ["item", "root", "backLabel", "menuWidth", "effectDuration", "easing", "index"] }], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i3.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SlideMenuSub, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-slideMenuSub',
                    template: `
        <ul [ngClass]="{'p-slidemenu-rootlist':root, 'p-submenu-list':!root, 'p-active-submenu': (-slideMenu.left == (index * menuWidth))}"
            [style.width.px]="menuWidth" [style.left.px]="root ? slideMenu.left : slideMenu.menuWidth"
            [style.transitionProperty]="root ? 'left' : 'none'" [style.transitionDuration]="effectDuration + 'ms'" [style.transitionTimingFunction]="easing">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="p-menu-separator" [ngClass]="{'p-hidden': child.visible === false}">
                <li *ngIf="!child.separator" #listitem [ngClass]="{'p-menuitem':true,'p-menuitem-active':listitem==activeItem,'p-hidden': child.visible === false}" pTooltip [tooltipOptions]="child.tooltipOptions"
                    [class]="child.styleClass" [ngStyle]="child.style">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url" class="p-menuitem-link" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [ngClass]="{'p-disabled':child.disabled}" [attr.tabindex]="child.disabled ? null : '0'"
                        (click)="itemClick($event, child, listitem)">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text">{{child.label}}</span>
                        <span class="p-submenu-icon pi pi-fw pi-angle-right" *ngIf="child.items"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" [href]="child.url" class="p-menuitem-link"
                        [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.disabled ? null : '0'"
                        [ngClass]="{'p-disabled':child.disabled}"
                        (click)="itemClick($event, child, listitem)"
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text">{{child.label}}</span>
                        <span class="p-submenu-icon pi pi-fw pi-caret-right" *ngIf="child.items"></span>
                    </a>
                    <p-slideMenuSub class="p-submenu" [item]="child" [index]="index + 1" [menuWidth]="menuWidth" *ngIf="child.items"></p-slideMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => SlideMenu)]
                }] }]; }, propDecorators: { item: [{
                type: Input
            }], root: [{
                type: Input
            }], backLabel: [{
                type: Input
            }], menuWidth: [{
                type: Input
            }], effectDuration: [{
                type: Input
            }], easing: [{
                type: Input
            }], index: [{
                type: Input
            }] } });
export class SlideMenu {
    constructor(el, renderer, cd, config, overlayService) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.config = config;
        this.overlayService = overlayService;
        this.menuWidth = 190;
        this.viewportHeight = 180;
        this.effectDuration = 250;
        this.easing = 'ease-out';
        this.backLabel = 'Back';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.left = 0;
        this.animating = false;
    }
    ngAfterViewChecked() {
        if (!this.viewportUpdated && !this.popup && this.containerViewChild) {
            this.updateViewPort();
            this.viewportUpdated = true;
        }
    }
    set container(element) {
        this.containerViewChild = element;
    }
    set backward(element) {
        this.backwardViewChild = element;
    }
    set slideMenuContent(element) {
        this.slideMenuContentViewChild = element;
    }
    updateViewPort() {
        this.slideMenuContentViewChild.nativeElement.style.height = this.viewportHeight - DomHandler.getHiddenElementOuterHeight(this.backwardViewChild.nativeElement) + 'px';
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
        this.visible = true;
        this.preventDocumentDefault = true;
        this.cd.markForCheck();
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
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                if (this.popup) {
                    this.updateViewPort();
                    this.moveOnTop();
                    this.onShow.emit({});
                    this.appendOverlay();
                    DomHandler.absolutePosition(this.containerViewChild.nativeElement, this.target);
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
                ZIndexUtils.clear(event.element);
                break;
        }
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
    }
    restoreOverlayAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
    }
    moveOnTop() {
        if (this.autoZIndex) {
            ZIndexUtils.set('menu', this.containerViewChild.nativeElement, this.baseZIndex + this.config.zIndex.menu);
        }
    }
    hide() {
        this.visible = false;
        this.cd.markForCheck();
    }
    onWindowResize() {
        this.hide();
    }
    goBack() {
        this.left += this.menuWidth;
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.documentClickListener = this.renderer.listen(documentTarget, 'click', () => {
                if (!this.preventDocumentDefault) {
                    this.hide();
                    this.cd.detectChanges();
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
        this.left = 0;
    }
    ngOnDestroy() {
        if (this.popup) {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }
            this.restoreOverlayAppend();
            this.onOverlayHide();
        }
    }
}
SlideMenu.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SlideMenu, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i4.PrimeNGConfig }, { token: i4.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
SlideMenu.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: SlideMenu, selector: "p-slideMenu", inputs: { model: "model", popup: "popup", style: "style", styleClass: "styleClass", menuWidth: "menuWidth", viewportHeight: "viewportHeight", effectDuration: "effectDuration", easing: "easing", backLabel: "backLabel", appendTo: "appendTo", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onShow: "onShow", onHide: "onHide" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true }, { propertyName: "backward", first: true, predicate: ["backward"], descendants: true }, { propertyName: "slideMenuContent", first: true, predicate: ["slideMenuContent"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="{'p-slidemenu p-component':true, 'p-slidemenu-overlay':popup}"
            [class]="styleClass" [ngStyle]="style" (click)="onOverlayClick($event)"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="popup !== true"
            (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationEnd($event)" *ngIf="!popup || visible">
            <div class="p-slidemenu-wrapper" [style.height]="left ? viewportHeight + 'px' : 'auto'">
                <div #slideMenuContent class="p-slidemenu-content">
                    <p-slideMenuSub [item]="model" root="root" [index]="0" [menuWidth]="menuWidth" [effectDuration]="effectDuration" [easing]="easing"></p-slideMenuSub>
                </div>
                <div #backward class="p-slidemenu-backward" [style.display]="left ? 'block' : 'none'" (click)="goBack()">
                    <span class="p-slidemenu-backward-icon pi pi-fw pi-caret-left"></span><span>{{backLabel}}</span>
                </div>
            </div>
        </div>
    `, isInline: true, styles: [".p-slidemenu{width:12.5rem}.p-slidemenu.p-slidemenu-overlay{position:absolute;top:0;left:0}.p-slidemenu ul{list-style:none;margin:0;padding:0}.p-slidemenu .p-slidemenu-rootlist{position:absolute;top:0}.p-slidemenu .p-submenu-list{display:none;position:absolute;top:0;width:12.5rem}.p-slidemenu .p-menuitem-link{cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden}.p-slidemenu .p-menuitem-icon,.p-slidemenu .p-menuitem-text{vertical-align:middle}.p-slidemenu .p-menuitem{position:relative}.p-slidemenu .p-menuitem-link .p-submenu-icon{margin-left:auto}.p-slidemenu .p-slidemenu-wrapper{position:relative}.p-slidemenu .p-slidemenu-content{overflow-x:hidden;overflow-y:auto;position:relative}.p-slidemenu-backward{position:absolute;bottom:0;width:100%;cursor:pointer;display:none}.p-slidemenu-backward .p-slidemenu-backward-icon,.p-slidemenu-backward span{vertical-align:middle}.p-slidemenu .p-menuitem-active{position:static}.p-slidemenu .p-menuitem-active>.p-submenu>.p-submenu-list{display:block}.p-slidemenu .p-active-submenu>.p-menuitem-active>.p-submenu>.p-submenu-list,.p-slidemenu ul:not(.p-active-submenu)>.p-menuitem:not(.p-menuitem-active){display:none}.p-slidemenu .p-active-submenu>.p-menuitem-active~.p-menuitem{display:block}"], components: [{ type: SlideMenuSub, selector: "p-slideMenuSub", inputs: ["item", "root", "backLabel", "menuWidth", "effectDuration", "easing", "index"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SlideMenu, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-slideMenu',
                    template: `
        <div #container [ngClass]="{'p-slidemenu p-component':true, 'p-slidemenu-overlay':popup}"
            [class]="styleClass" [ngStyle]="style" (click)="onOverlayClick($event)"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="popup !== true"
            (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationEnd($event)" *ngIf="!popup || visible">
            <div class="p-slidemenu-wrapper" [style.height]="left ? viewportHeight + 'px' : 'auto'">
                <div #slideMenuContent class="p-slidemenu-content">
                    <p-slideMenuSub [item]="model" root="root" [index]="0" [menuWidth]="menuWidth" [effectDuration]="effectDuration" [easing]="easing"></p-slideMenuSub>
                </div>
                <div #backward class="p-slidemenu-backward" [style.display]="left ? 'block' : 'none'" (click)="goBack()">
                    <span class="p-slidemenu-backward-icon pi pi-fw pi-caret-left"></span><span>{{backLabel}}</span>
                </div>
            </div>
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
                    styleUrls: ['./slidemenu.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i4.PrimeNGConfig }, { type: i4.OverlayService }]; }, propDecorators: { model: [{
                type: Input
            }], popup: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], menuWidth: [{
                type: Input
            }], viewportHeight: [{
                type: Input
            }], effectDuration: [{
                type: Input
            }], easing: [{
                type: Input
            }], backLabel: [{
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
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], container: [{
                type: ViewChild,
                args: ['container']
            }], backward: [{
                type: ViewChild,
                args: ['backward']
            }], slideMenuContent: [{
                type: ViewChild,
                args: ['slideMenuContent']
            }] } });
export class SlideMenuModule {
}
SlideMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SlideMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SlideMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SlideMenuModule, declarations: [SlideMenu, SlideMenuSub], imports: [CommonModule, RouterModule, TooltipModule], exports: [SlideMenu, RouterModule, TooltipModule] });
SlideMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SlideMenuModule, imports: [[CommonModule, RouterModule, TooltipModule], RouterModule, TooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SlideMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, TooltipModule],
                    exports: [SlideMenu, RouterModule, TooltipModule],
                    declarations: [SlideMenu, SlideMenuSub]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVtZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3NsaWRlbWVudS9zbGlkZW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQXVDLEtBQUssRUFBVyxNQUFNLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFtQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwTixPQUFPLEVBQUMsT0FBTyxFQUFPLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBQzFGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFFLDZCQUE2QixFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXRFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7O0FBb0M5QyxNQUFNLE9BQU8sWUFBWTtJQWtCckIsWUFBaUQsU0FBUztRQVpqRCxjQUFTLEdBQVcsTUFBTSxDQUFDO1FBTTNCLFdBQU0sR0FBVyxVQUFVLENBQUM7UUFPakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFzQixDQUFDO0lBQzVDLENBQUM7SUFJRCxTQUFTLENBQUMsS0FBSyxFQUFFLElBQWMsRUFBRSxRQUFhO1FBQzFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztT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VUFBVTtzQkFBbEIsS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFFRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBRUksTUFBTTtzQkFBZixNQUFNO2dCQUVHLE1BQU07c0JBQWYsTUFBTTtnQkFtQ3FCLFNBQVM7c0JBQXBDLFNBQVM7dUJBQUMsV0FBVztnQkFJSyxRQUFRO3NCQUFsQyxTQUFTO3VCQUFDLFVBQVU7Z0JBSWMsZ0JBQWdCO3NCQUFsRCxTQUFTO3VCQUFDLGtCQUFrQjs7QUFtTGpDLE1BQU0sT0FBTyxlQUFlOzs0R0FBZixlQUFlOzZHQUFmLGVBQWUsaUJBOVBmLFNBQVMsRUEzRlQsWUFBWSxhQXFWWCxZQUFZLEVBQUMsWUFBWSxFQUFDLGFBQWEsYUExUHhDLFNBQVMsRUEyUEUsWUFBWSxFQUFDLGFBQWE7NkdBR3JDLGVBQWUsWUFKZixDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsYUFBYSxDQUFDLEVBQzlCLFlBQVksRUFBQyxhQUFhOzJGQUdyQyxlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsYUFBYSxDQUFDO29CQUNsRCxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLGFBQWEsQ0FBQztvQkFDL0MsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFDLFlBQVksQ0FBQztpQkFDekMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyVmlld0NoZWNrZWQsT25EZXN0cm95LElucHV0LFJlbmRlcmVyMixJbmplY3QsZm9yd2FyZFJlZixWaWV3Q2hpbGQsT3V0cHV0LEV2ZW50RW1pdHRlcixDaGFuZ2VEZXRlY3RvclJlZixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0cmlnZ2VyLHN0YXRlLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZSxBbmltYXRpb25FdmVudH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RG9tSGFuZGxlciwgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7TWVudUl0ZW0sIE92ZXJsYXlTZXJ2aWNlLCBQcmltZU5HQ29uZmlnfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7WkluZGV4VXRpbHN9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHtUb29sdGlwTW9kdWxlfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc2xpZGVNZW51U3ViJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dWwgW25nQ2xhc3NdPVwieydwLXNsaWRlbWVudS1yb290bGlzdCc6cm9vdCwgJ3Atc3VibWVudS1saXN0Jzohcm9vdCwgJ3AtYWN0aXZlLXN1Ym1lbnUnOiAoLXNsaWRlTWVudS5sZWZ0ID09IChpbmRleCAqIG1lbnVXaWR0aCkpfVwiXG4gICAgICAgICAgICBbc3R5bGUud2lkdGgucHhdPVwibWVudVdpZHRoXCIgW3N0eWxlLmxlZnQucHhdPVwicm9vdCA/IHNsaWRlTWVudS5sZWZ0IDogc2xpZGVNZW51Lm1lbnVXaWR0aFwiXG4gICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvblByb3BlcnR5XT1cInJvb3QgPyAnbGVmdCcgOiAnbm9uZSdcIiBbc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uXT1cImVmZmVjdER1cmF0aW9uICsgJ21zJ1wiIFtzdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb25dPVwiZWFzaW5nXCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWNoaWxkIFtuZ0Zvck9mXT1cIihyb290ID8gaXRlbSA6IGl0ZW0uaXRlbXMpXCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiY2hpbGQuc2VwYXJhdG9yXCIgY2xhc3M9XCJwLW1lbnUtc2VwYXJhdG9yXCIgW25nQ2xhc3NdPVwieydwLWhpZGRlbic6IGNoaWxkLnZpc2libGUgPT09IGZhbHNlfVwiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFjaGlsZC5zZXBhcmF0b3JcIiAjbGlzdGl0ZW0gW25nQ2xhc3NdPVwieydwLW1lbnVpdGVtJzp0cnVlLCdwLW1lbnVpdGVtLWFjdGl2ZSc6bGlzdGl0ZW09PWFjdGl2ZUl0ZW0sJ3AtaGlkZGVuJzogY2hpbGQudmlzaWJsZSA9PT0gZmFsc2V9XCIgcFRvb2x0aXAgW3Rvb2x0aXBPcHRpb25zXT1cImNoaWxkLnRvb2x0aXBPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cImNoaWxkLnN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJjaGlsZC5zdHlsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFjaGlsZC5yb3V0ZXJMaW5rXCIgW2F0dHIuaHJlZl09XCJjaGlsZC51cmxcIiBjbGFzcz1cInAtbWVudWl0ZW0tbGlua1wiIFthdHRyLnRhcmdldF09XCJjaGlsZC50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJjaGlsZC50aXRsZVwiIFthdHRyLmlkXT1cImNoaWxkLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncC1kaXNhYmxlZCc6Y2hpbGQuZGlzYWJsZWR9XCIgW2F0dHIudGFiaW5kZXhdPVwiY2hpbGQuZGlzYWJsZWQgPyBudWxsIDogJzAnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBjaGlsZCwgbGlzdGl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0taWNvblwiICpuZ0lmPVwiY2hpbGQuaWNvblwiIFtuZ0NsYXNzXT1cImNoaWxkLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiPnt7Y2hpbGQubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1zdWJtZW51LWljb24gcGkgcGktZncgcGktYW5nbGUtcmlnaHRcIiAqbmdJZj1cImNoaWxkLml0ZW1zXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiY2hpbGQucm91dGVyTGlua1wiIFtyb3V0ZXJMaW5rXT1cImNoaWxkLnJvdXRlckxpbmtcIiBbcXVlcnlQYXJhbXNdPVwiY2hpbGQucXVlcnlQYXJhbXNcIiBbcm91dGVyTGlua0FjdGl2ZV09XCIncC1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cImNoaWxkLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zfHx7ZXhhY3Q6ZmFsc2V9XCIgW2hyZWZdPVwiY2hpbGQudXJsXCIgY2xhc3M9XCJwLW1lbnVpdGVtLWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFyZ2V0XT1cImNoaWxkLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cImNoaWxkLnRpdGxlXCIgW2F0dHIuaWRdPVwiY2hpbGQuaWRcIiBbYXR0ci50YWJpbmRleF09XCJjaGlsZC5kaXNhYmxlZCA/IG51bGwgOiAnMCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydwLWRpc2FibGVkJzpjaGlsZC5kaXNhYmxlZH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGNoaWxkLCBsaXN0aXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cImNoaWxkLmZyYWdtZW50XCIgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiY2hpbGQucXVlcnlQYXJhbXNIYW5kbGluZ1wiIFtwcmVzZXJ2ZUZyYWdtZW50XT1cImNoaWxkLnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cImNoaWxkLnNraXBMb2NhdGlvbkNoYW5nZVwiIFtyZXBsYWNlVXJsXT1cImNoaWxkLnJlcGxhY2VVcmxcIiBbc3RhdGVdPVwiY2hpbGQuc3RhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgKm5nSWY9XCJjaGlsZC5pY29uXCIgW25nQ2xhc3NdPVwiY2hpbGQuaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCI+e3tjaGlsZC5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXN1Ym1lbnUtaWNvbiBwaSBwaS1mdyBwaS1jYXJldC1yaWdodFwiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPHAtc2xpZGVNZW51U3ViIGNsYXNzPVwicC1zdWJtZW51XCIgW2l0ZW1dPVwiY2hpbGRcIiBbaW5kZXhdPVwiaW5kZXggKyAxXCIgW21lbnVXaWR0aF09XCJtZW51V2lkdGhcIiAqbmdJZj1cImNoaWxkLml0ZW1zXCI+PC9wLXNsaWRlTWVudVN1Yj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC91bD5cbiAgICBgLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVNZW51U3ViIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGl0ZW06IE1lbnVJdGVtO1xuXG4gICAgQElucHV0KCkgcm9vdDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGJhY2tMYWJlbDogc3RyaW5nID0gJ0JhY2snO1xuXG4gICAgQElucHV0KCkgbWVudVdpZHRoOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBlZmZlY3REdXJhdGlvbjogYW55O1xuXG4gICAgQElucHV0KCkgZWFzaW5nOiBzdHJpbmcgPSAnZWFzZS1vdXQnO1xuXG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcblxuICAgIHNsaWRlTWVudTogU2xpZGVNZW51O1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IFNsaWRlTWVudSkpIHNsaWRlTWVudSkge1xuICAgICAgICB0aGlzLnNsaWRlTWVudSA9IHNsaWRlTWVudSBhcyBTbGlkZU1lbnU7XG4gICAgfVxuXG4gICAgYWN0aXZlSXRlbTogYW55O1xuXG4gICAgaXRlbUNsaWNrKGV2ZW50LCBpdGVtOiBNZW51SXRlbSwgbGlzdGl0ZW06IGFueSnCoHtcbiAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWl0ZW0udXJsKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW0uY29tbWFuZCkge1xuICAgICAgICAgICAgaXRlbS5jb21tYW5kKHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtLml0ZW1zICYmICF0aGlzLnNsaWRlTWVudS5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVNZW51LmxlZnQgLT0gdGhpcy5zbGlkZU1lbnUubWVudVdpZHRoO1xuXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBsaXN0aXRlbTtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVNZW51LmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2xpZGVNZW51LmFuaW1hdGluZyA9IGZhbHNlLCB0aGlzLmVmZmVjdER1cmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXRlbS5pdGVtcyAmJiB0aGlzLnNsaWRlTWVudS5wb3B1cCkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZU1lbnUuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc2xpZGVNZW51JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwieydwLXNsaWRlbWVudSBwLWNvbXBvbmVudCc6dHJ1ZSwgJ3Atc2xpZGVtZW51LW92ZXJsYXknOnBvcHVwfVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgKGNsaWNrKT1cIm9uT3ZlcmxheUNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgW0BvdmVybGF5QW5pbWF0aW9uXT1cInt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHtzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zfX1cIiBbQC5kaXNhYmxlZF09XCJwb3B1cCAhPT0gdHJ1ZVwiXG4gICAgICAgICAgICAoQG92ZXJsYXlBbmltYXRpb24uc3RhcnQpPVwib25PdmVybGF5QW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiIChAb3ZlcmxheUFuaW1hdGlvbi5kb25lKT1cIm9uT3ZlcmxheUFuaW1hdGlvbkVuZCgkZXZlbnQpXCIgKm5nSWY9XCIhcG9wdXAgfHwgdmlzaWJsZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtc2xpZGVtZW51LXdyYXBwZXJcIiBbc3R5bGUuaGVpZ2h0XT1cImxlZnQgPyB2aWV3cG9ydEhlaWdodCArICdweCcgOiAnYXV0bydcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNzbGlkZU1lbnVDb250ZW50IGNsYXNzPVwicC1zbGlkZW1lbnUtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8cC1zbGlkZU1lbnVTdWIgW2l0ZW1dPVwibW9kZWxcIiByb290PVwicm9vdFwiIFtpbmRleF09XCIwXCIgW21lbnVXaWR0aF09XCJtZW51V2lkdGhcIiBbZWZmZWN0RHVyYXRpb25dPVwiZWZmZWN0RHVyYXRpb25cIiBbZWFzaW5nXT1cImVhc2luZ1wiPjwvcC1zbGlkZU1lbnVTdWI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAjYmFja3dhcmQgY2xhc3M9XCJwLXNsaWRlbWVudS1iYWNrd2FyZFwiIFtzdHlsZS5kaXNwbGF5XT1cImxlZnQgPyAnYmxvY2snIDogJ25vbmUnXCIgKGNsaWNrKT1cImdvQmFjaygpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1zbGlkZW1lbnUtYmFja3dhcmQtaWNvbiBwaSBwaS1mdyBwaS1jYXJldC1sZWZ0XCI+PC9zcGFuPjxzcGFuPnt7YmFja0xhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ292ZXJsYXlBbmltYXRpb24nLCBbXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlWSgwLjgpJ30pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgne3toaWRlVHJhbnNpdGlvblBhcmFtc319Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9zbGlkZW1lbnUuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVNZW51IGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdO1xuXG4gICAgQElucHV0KCkgcG9wdXA6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbWVudVdpZHRoOiBudW1iZXIgPSAxOTA7XG5cbiAgICBASW5wdXQoKSB2aWV3cG9ydEhlaWdodDogbnVtYmVyID0gMTgwO1xuXG4gICAgQElucHV0KCkgZWZmZWN0RHVyYXRpb246IGFueSA9IDI1MDtcblxuICAgIEBJbnB1dCgpIGVhc2luZzogc3RyaW5nID0gJ2Vhc2Utb3V0JztcblxuICAgIEBJbnB1dCgpIGJhY2tMYWJlbDogc3RyaW5nID0gJ0JhY2snO1xuXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueTtcblxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xMnMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknO1xuXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnLjFzIGxpbmVhcic7XG5cbiAgICBAT3V0cHV0KCkgb25TaG93OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY29udGFpbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgYmFja3dhcmRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBzbGlkZU1lbnVDb250ZW50Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XG5cbiAgICBkb2N1bWVudFJlc2l6ZUxpc3RlbmVyOiBhbnk7XG5cbiAgICBwcmV2ZW50RG9jdW1lbnREZWZhdWx0OiBib29sZWFuO1xuXG4gICAgc2Nyb2xsSGFuZGxlcjogYW55O1xuXG4gICAgbGVmdDogbnVtYmVyID0gMDtcblxuICAgIGFuaW1hdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgdGFyZ2V0OiBhbnk7XG5cbiAgICB2aXNpYmxlOiBib29sZWFuO1xuXG4gICAgdmlld3BvcnRVcGRhdGVkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGNvbmZpZzogUHJpbWVOR0NvbmZpZywgcHVibGljIG92ZXJsYXlTZXJ2aWNlOiBPdmVybGF5U2VydmljZSkge31cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdwb3J0VXBkYXRlZCAmJiAhdGhpcy5wb3B1cCAmJiB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3UG9ydCgpO1xuICAgICAgICAgICAgdGhpcy52aWV3cG9ydFVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgc2V0IGNvbnRhaW5lcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyVmlld0NoaWxkID0gZWxlbWVudDtcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKCdiYWNrd2FyZCcpIHNldCBiYWNrd2FyZChlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuYmFja3dhcmRWaWV3Q2hpbGQgPSBlbGVtZW50O1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoJ3NsaWRlTWVudUNvbnRlbnQnKSBzZXQgc2xpZGVNZW51Q29udGVudChlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuc2xpZGVNZW51Q29udGVudFZpZXdDaGlsZCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgdXBkYXRlVmlld1BvcnQoKSB7XG4gICAgICAgIHRoaXMuc2xpZGVNZW51Q29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IHRoaXMudmlld3BvcnRIZWlnaHQgLSBEb21IYW5kbGVyLmdldEhpZGRlbkVsZW1lbnRPdXRlckhlaWdodCh0aGlzLmJhY2t3YXJkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpICsgJ3B4JztcbiAgICB9XG5cbiAgICB0b2dnbGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZSlcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnNob3coZXZlbnQpO1xuXG4gICAgICAgIHRoaXMucHJldmVudERvY3VtZW50RGVmYXVsdCA9IHRydWU7XG4gICAgfVxuXG4gICAgc2hvdyhldmVudCkge1xuICAgICAgICB0aGlzLnRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMucHJldmVudERvY3VtZW50RGVmYXVsdCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucG9wdXApIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVNlcnZpY2UuYWRkKHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMuZWwubmF0aXZlRWxlbWVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9wdXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3UG9ydCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVPblRvcCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KHt9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWJzb2x1dGVQb3NpdGlvbih0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCB0aGlzLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25IaWRlLmVtaXQoe30pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk92ZXJsYXlBbmltYXRpb25FbmQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcihldmVudC5lbGVtZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kT3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsIHRoaXMuYXBwZW5kVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZU92ZXJsYXlBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlT25Ub3AoKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLnNldCgnbWVudScsIHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsIHRoaXMuYmFzZVpJbmRleCArIHRoaXMuY29uZmlnLnpJbmRleC5tZW51KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uV2luZG93UmVzaXplKCkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMubGVmdCArPSB0aGlzLm1lbnVXaWR0aDtcbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICBjb25zdCBkb2N1bWVudFRhcmdldDogYW55ID0gdGhpcy5lbCA/IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50IDogJ2RvY3VtZW50JztcblxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudFRhcmdldCwgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kU2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBuZXcgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXIodGhpcy50YXJnZXQsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHVuYmluZFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIudW5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uT3ZlcmxheUhpZGUoKcKge1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICB0aGlzLmxlZnQgPSAwO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5wb3B1cCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZXN0b3JlT3ZlcmxheUFwcGVuZCgpO1xuICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFJvdXRlck1vZHVsZSxUb29sdGlwTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbU2xpZGVNZW51LFJvdXRlck1vZHVsZSxUb29sdGlwTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTbGlkZU1lbnUsU2xpZGVNZW51U3ViXVxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZU1lbnVNb2R1bGUgeyB9XG4iXX0=