import { NgModule, Component, Input, Output, Inject, forwardRef, ViewChild, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { ContextMenuService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ZIndexUtils } from 'primeng/utils';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/tooltip";
import * as i3 from "primeng/ripple";
import * as i4 from "@angular/router";
import * as i5 from "primeng/api";
export class ContextMenuSub {
    constructor(contextMenu) {
        this.leafClick = new EventEmitter();
        this.contextMenu = contextMenu;
    }
    ngOnInit() {
        this.activeItemKeyChangeSubscription = this.contextMenu.contextMenuService.activeItemKeyChange$.pipe(takeUntil(this.contextMenu.ngDestroy$)).subscribe((activeItemKey) => {
            this.activeItemKey = activeItemKey;
            if (this.isActive(this.parentItemKey) && DomHandler.hasClass(this.sublistViewChild.nativeElement, 'p-submenu-list-active')) {
                this.contextMenu.positionSubmenu(this.sublistViewChild.nativeElement);
            }
            this.contextMenu.cd.markForCheck();
        });
    }
    onItemMouseEnter(event, item, key) {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
        if (item.disabled) {
            return;
        }
        if (item.items) {
            let childSublist = DomHandler.findSingle(event.currentTarget, '.p-submenu-list');
            DomHandler.addClass(childSublist, 'p-submenu-list-active');
        }
        this.contextMenu.contextMenuService.changeKey(key);
    }
    onItemMouseLeave(event, item) {
        if (item.disabled) {
            return;
        }
        if (this.contextMenu.el.nativeElement.contains(event.toElement)) {
            if (item.items) {
                this.contextMenu.removeActiveFromSubLists(event.currentTarget);
            }
            if (!this.root) {
                this.contextMenu.contextMenuService.changeKey(this.parentItemKey);
            }
        }
    }
    onItemClick(event, item, menuitem, key) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        if (item.items) {
            let childSublist = DomHandler.findSingle(menuitem, '.p-submenu-list');
            if (childSublist) {
                if (this.isActive(key) && DomHandler.hasClass(childSublist, 'p-submenu-list-active')) {
                    this.contextMenu.removeActiveFromSubLists(menuitem);
                }
                else {
                    DomHandler.addClass(childSublist, 'p-submenu-list-active');
                }
                this.contextMenu.contextMenuService.changeKey(key);
            }
        }
        if (!item.items) {
            this.onLeafClick();
        }
    }
    onLeafClick() {
        if (this.root) {
            this.contextMenu.hide();
        }
        this.leafClick.emit();
    }
    getKey(index) {
        return this.root ? String(index) : this.parentItemKey + '_' + index;
    }
    isActive(key) {
        return (this.activeItemKey && (this.activeItemKey.startsWith(key + '_') || this.activeItemKey === key));
    }
}
ContextMenuSub.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ContextMenuSub, deps: [{ token: forwardRef(() => ContextMenu) }], target: i0.ɵɵFactoryTarget.Component });
ContextMenuSub.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ContextMenuSub, selector: "p-contextMenuSub", inputs: { item: "item", root: "root", parentItemKey: "parentItemKey" }, outputs: { leafClick: "leafClick" }, viewQueries: [{ propertyName: "sublistViewChild", first: true, predicate: ["sublist"], descendants: true }, { propertyName: "menuitemViewChild", first: true, predicate: ["menuitem"], descendants: true }], ngImport: i0, template: `
        <ul #sublist [ngClass]="{'p-submenu-list':!root}">
            <ng-template ngFor let-child let-index="index" [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" #menuitem class="p-menu-separator" [ngClass]="{'p-hidden': child.visible === false}" role="separator">
                <li *ngIf="!child.separator" #menuitem [ngClass]="{'p-menuitem':true,'p-menuitem-active': isActive(getKey(index)),'p-hidden': child.visible === false}" [ngStyle]="child.style" [class]="child.styleClass" pTooltip [tooltipOptions]="child.tooltipOptions"
                    (mouseenter)="onItemMouseEnter($event,child,getKey(index))" (mouseleave)="onItemMouseLeave($event,child)" role="none" [attr.data-ik]="getKey(index)">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url ? child.url : null" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [attr.tabindex]="child.disabled ? null : '0'" (click)="onItemClick($event, child, menuitem, getKey(index))" [ngClass]="{'p-menuitem-link':true,'p-disabled':child.disabled}" pRipple
                        [attr.aria-haspopup]="item.items != null" [attr.aria-expanded]="isActive(getKey(index))">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlLabel">{{child.label}}</span>
                        <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-submenu-icon pi pi-angle-right" *ngIf="child.items"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'p-menuitem-link-active'" role="menuitem"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.disabled ? null : '0'"
                        (click)="onItemClick($event, child, menuitem, getKey(index))" [ngClass]="{'p-menuitem-link':true,'p-disabled':child.disabled}"
                         pRipple [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{child.label}}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-submenu-icon pi pi-angle-right" *ngIf="child.items"></span>
                    </a>
                    <p-contextMenuSub [parentItemKey]="getKey(index)" [item]="child" *ngIf="child.items" (leafClick)="onLeafClick()"></p-contextMenuSub>
                </li>
            </ng-template>
        </ul>
    `, isInline: true, components: [{ type: ContextMenuSub, selector: "p-contextMenuSub", inputs: ["item", "root", "parentItemKey"], outputs: ["leafClick"] }], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3.Ripple, selector: "[pRipple]" }, { type: i4.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }, { type: i4.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "routerLinkActive"], exportAs: ["routerLinkActive"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ContextMenuSub, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-contextMenuSub',
                    template: `
        <ul #sublist [ngClass]="{'p-submenu-list':!root}">
            <ng-template ngFor let-child let-index="index" [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" #menuitem class="p-menu-separator" [ngClass]="{'p-hidden': child.visible === false}" role="separator">
                <li *ngIf="!child.separator" #menuitem [ngClass]="{'p-menuitem':true,'p-menuitem-active': isActive(getKey(index)),'p-hidden': child.visible === false}" [ngStyle]="child.style" [class]="child.styleClass" pTooltip [tooltipOptions]="child.tooltipOptions"
                    (mouseenter)="onItemMouseEnter($event,child,getKey(index))" (mouseleave)="onItemMouseLeave($event,child)" role="none" [attr.data-ik]="getKey(index)">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url ? child.url : null" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [attr.tabindex]="child.disabled ? null : '0'" (click)="onItemClick($event, child, menuitem, getKey(index))" [ngClass]="{'p-menuitem-link':true,'p-disabled':child.disabled}" pRipple
                        [attr.aria-haspopup]="item.items != null" [attr.aria-expanded]="isActive(getKey(index))">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlLabel">{{child.label}}</span>
                        <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-submenu-icon pi pi-angle-right" *ngIf="child.items"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'p-menuitem-link-active'" role="menuitem"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.disabled ? null : '0'"
                        (click)="onItemClick($event, child, menuitem, getKey(index))" [ngClass]="{'p-menuitem-link':true,'p-disabled':child.disabled}"
                         pRipple [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{child.label}}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-submenu-icon pi pi-angle-right" *ngIf="child.items"></span>
                    </a>
                    <p-contextMenuSub [parentItemKey]="getKey(index)" [item]="child" *ngIf="child.items" (leafClick)="onLeafClick()"></p-contextMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => ContextMenu)]
                }] }]; }, propDecorators: { item: [{
                type: Input
            }], root: [{
                type: Input
            }], parentItemKey: [{
                type: Input
            }], leafClick: [{
                type: Output
            }], sublistViewChild: [{
                type: ViewChild,
                args: ['sublist']
            }], menuitemViewChild: [{
                type: ViewChild,
                args: ['menuitem']
            }] } });
export class ContextMenu {
    constructor(el, renderer, cd, zone, contextMenuService, config) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.contextMenuService = contextMenuService;
        this.config = config;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.triggerEvent = 'contextmenu';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.ngDestroy$ = new Subject();
    }
    ngAfterViewInit() {
        if (this.global) {
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.triggerEventListener = this.renderer.listen(documentTarget, this.triggerEvent, (event) => {
                this.show(event);
                event.preventDefault();
            });
        }
        else if (this.target) {
            this.triggerEventListener = this.renderer.listen(this.target, this.triggerEvent, (event) => {
                this.show(event);
                event.preventDefault();
                event.stopPropagation();
            });
        }
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
    }
    show(event) {
        this.clearActiveItem();
        this.position(event);
        this.moveOnTop();
        this.containerViewChild.nativeElement.style.display = 'block';
        DomHandler.fadeIn(this.containerViewChild.nativeElement, 250);
        this.bindGlobalListeners();
        if (event) {
            event.preventDefault();
        }
        this.onShow.emit();
    }
    hide() {
        this.containerViewChild.nativeElement.style.display = 'none';
        if (this.autoZIndex) {
            ZIndexUtils.clear(this.containerViewChild.nativeElement);
        }
        this.unbindGlobalListeners();
        this.onHide.emit();
    }
    moveOnTop() {
        if (this.autoZIndex && this.containerViewChild && this.containerViewChild.nativeElement.style.display !== 'block') {
            ZIndexUtils.set('menu', this.containerViewChild.nativeElement, this.baseZIndex + this.config.zIndex.menu);
        }
    }
    toggle(event) {
        if (this.containerViewChild.nativeElement.offsetParent)
            this.hide();
        else
            this.show(event);
    }
    position(event) {
        if (event) {
            let left = event.pageX + 1;
            let top = event.pageY + 1;
            let width = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetWidth : DomHandler.getHiddenElementOuterWidth(this.containerViewChild.nativeElement);
            let height = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetHeight : DomHandler.getHiddenElementOuterHeight(this.containerViewChild.nativeElement);
            let viewport = DomHandler.getViewport();
            //flip
            if (left + width - document.body.scrollLeft > viewport.width) {
                left -= width;
            }
            //flip
            if (top + height - document.body.scrollTop > viewport.height) {
                top -= height;
            }
            //fit
            if (left < document.body.scrollLeft) {
                left = document.body.scrollLeft;
            }
            //fit
            if (top < document.body.scrollTop) {
                top = document.body.scrollTop;
            }
            this.containerViewChild.nativeElement.style.left = left + 'px';
            this.containerViewChild.nativeElement.style.top = top + 'px';
        }
    }
    positionSubmenu(sublist) {
        let parentMenuItem = sublist.parentElement.parentElement;
        let viewport = DomHandler.getViewport();
        let sublistWidth = sublist.offsetParent ? sublist.offsetWidth : DomHandler.getHiddenElementOuterWidth(sublist);
        let sublistHeight = sublist.offsetHeight ? sublist.offsetHeight : DomHandler.getHiddenElementOuterHeight(sublist);
        let itemOuterWidth = DomHandler.getOuterWidth(parentMenuItem.children[0]);
        let itemOuterHeight = DomHandler.getOuterHeight(parentMenuItem.children[0]);
        let containerOffset = DomHandler.getOffset(parentMenuItem.parentElement);
        sublist.style.zIndex = ++DomHandler.zindex;
        if ((parseInt(containerOffset.top) + itemOuterHeight + sublistHeight) > (viewport.height - DomHandler.calculateScrollbarHeight())) {
            sublist.style.removeProperty('top');
            sublist.style.bottom = '0px';
        }
        else {
            sublist.style.removeProperty('bottom');
            sublist.style.top = '0px';
        }
        if ((parseInt(containerOffset.left) + itemOuterWidth + sublistWidth) > (viewport.width - DomHandler.calculateScrollbarWidth())) {
            sublist.style.left = -sublistWidth + 'px';
        }
        else {
            sublist.style.left = itemOuterWidth + 'px';
        }
    }
    isItemMatched(menuitem) {
        return DomHandler.hasClass(menuitem, 'p-menuitem') && !DomHandler.hasClass(menuitem.children[0], 'p-disabled');
    }
    findNextItem(menuitem, isRepeated) {
        let nextMenuitem = menuitem.nextElementSibling;
        if (nextMenuitem) {
            return this.isItemMatched(nextMenuitem) ? nextMenuitem : this.findNextItem(nextMenuitem, isRepeated);
        }
        else {
            let firstItem = menuitem.parentElement.children[0];
            return this.isItemMatched(firstItem) ? firstItem : (!isRepeated ? this.findNextItem(firstItem, true) : null);
        }
    }
    findPrevItem(menuitem, isRepeated) {
        let prevMenuitem = menuitem.previousElementSibling;
        if (prevMenuitem) {
            return this.isItemMatched(prevMenuitem) ? prevMenuitem : this.findPrevItem(prevMenuitem, isRepeated);
        }
        else {
            let lastItem = menuitem.parentElement.children[menuitem.parentElement.children.length - 1];
            return this.isItemMatched(lastItem) ? lastItem : (!isRepeated ? this.findPrevItem(lastItem, true) : null);
        }
    }
    getActiveItem() {
        let activeItemKey = this.contextMenuService.activeItemKey;
        return activeItemKey == null ? null : DomHandler.findSingle(this.containerViewChild.nativeElement, '.p-menuitem[data-ik="' + activeItemKey + '"]');
    }
    clearActiveItem() {
        if (this.contextMenuService.activeItemKey) {
            this.removeActiveFromSubLists(this.containerViewChild.nativeElement);
            this.contextMenuService.reset();
        }
    }
    removeActiveFromSubLists(el) {
        let sublists = DomHandler.find(el, '.p-submenu-list-active');
        for (let sublist of sublists) {
            DomHandler.removeClass(sublist, 'p-submenu-list-active');
        }
    }
    removeActiveFromSublist(menuitem) {
        if (menuitem) {
            let sublist = DomHandler.findSingle(menuitem, '.p-submenu-list');
            if (sublist && DomHandler.hasClass(menuitem, 'p-submenu-list-active')) {
                DomHandler.removeClass(menuitem, 'p-submenu-list-active');
            }
        }
    }
    bindGlobalListeners() {
        if (!this.documentClickListener) {
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.documentClickListener = this.renderer.listen(documentTarget, 'click', (event) => {
                if (this.containerViewChild.nativeElement.offsetParent && this.isOutsideClicked(event) && !event.ctrlKey && event.button !== 2) {
                    this.hide();
                }
            });
        }
        this.zone.runOutsideAngular(() => {
            if (!this.windowResizeListener) {
                this.windowResizeListener = this.onWindowResize.bind(this);
                window.addEventListener('resize', this.windowResizeListener);
            }
        });
        if (!this.documentKeydownListener) {
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.documentKeydownListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
                let activeItem = this.getActiveItem();
                switch (event.key) {
                    case 'ArrowDown':
                        if (activeItem) {
                            this.removeActiveFromSublist(activeItem);
                            activeItem = this.findNextItem(activeItem);
                        }
                        else {
                            let firstItem = DomHandler.findSingle(this.containerViewChild.nativeElement, '.p-menuitem-link').parentElement;
                            activeItem = this.isItemMatched(firstItem) ? firstItem : this.findNextItem(firstItem);
                        }
                        if (activeItem) {
                            this.contextMenuService.changeKey(activeItem.getAttribute('data-ik'));
                        }
                        event.preventDefault();
                        break;
                    case 'ArrowUp':
                        if (activeItem) {
                            this.removeActiveFromSublist(activeItem);
                            activeItem = this.findPrevItem(activeItem);
                        }
                        else {
                            let sublist = DomHandler.findSingle(this.containerViewChild.nativeElement, 'ul');
                            let lastItem = sublist.children[sublist.children.length - 1];
                            activeItem = this.isItemMatched(lastItem) ? lastItem : this.findPrevItem(lastItem);
                        }
                        if (activeItem) {
                            this.contextMenuService.changeKey(activeItem.getAttribute('data-ik'));
                        }
                        event.preventDefault();
                        break;
                    case 'ArrowRight':
                        if (activeItem) {
                            let sublist = DomHandler.findSingle(activeItem, '.p-submenu-list');
                            if (sublist) {
                                DomHandler.addClass(sublist, 'p-submenu-list-active');
                                activeItem = DomHandler.findSingle(sublist, '.p-menuitem-link:not(.p-disabled)').parentElement;
                                if (activeItem) {
                                    this.contextMenuService.changeKey(activeItem.getAttribute('data-ik'));
                                }
                            }
                        }
                        event.preventDefault();
                        break;
                    case 'ArrowLeft':
                        if (activeItem) {
                            let sublist = activeItem.parentElement;
                            if (sublist && DomHandler.hasClass(sublist, 'p-submenu-list-active')) {
                                DomHandler.removeClass(sublist, 'p-submenu-list-active');
                                activeItem = sublist.parentElement.parentElement;
                                if (activeItem) {
                                    this.contextMenuService.changeKey(activeItem.getAttribute('data-ik'));
                                }
                            }
                        }
                        event.preventDefault();
                        break;
                    case 'Escape':
                        this.hide();
                        event.preventDefault();
                        break;
                    case 'Enter':
                        if (activeItem) {
                            this.handleItemClick(event, this.findModelItemFromKey(this.contextMenuService.activeItemKey), activeItem);
                        }
                        event.preventDefault();
                        break;
                    default:
                        break;
                }
            });
        }
    }
    findModelItemFromKey(key) {
        if (key == null || !this.model) {
            return null;
        }
        let indexes = key.split('_');
        return indexes.reduce((item, currentIndex) => {
            return item ? item.items[currentIndex] : this.model[currentIndex];
        }, null);
    }
    handleItemClick(event, item, menuitem) {
        if (!item || item.disabled) {
            return;
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        if (item.items) {
            let childSublist = DomHandler.findSingle(menuitem, '.p-submenu-list');
            if (childSublist) {
                if (DomHandler.hasClass(childSublist, 'p-submenu-list-active')) {
                    this.removeActiveFromSubLists(menuitem);
                }
                else {
                    DomHandler.addClass(childSublist, 'p-submenu-list-active');
                    this.positionSubmenu(childSublist);
                }
            }
        }
        if (!item.items) {
            this.hide();
        }
    }
    unbindGlobalListeners() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
        if (this.windowResizeListener) {
            window.removeEventListener('resize', this.windowResizeListener);
            this.windowResizeListener = null;
        }
        if (this.documentKeydownListener) {
            this.documentKeydownListener();
            this.documentKeydownListener = null;
        }
    }
    onWindowResize(event) {
        if (this.containerViewChild.nativeElement.offsetParent) {
            this.hide();
        }
    }
    isOutsideClicked(event) {
        return !(this.containerViewChild.nativeElement.isSameNode(event.target) || this.containerViewChild.nativeElement.contains(event.target));
    }
    ngOnDestroy() {
        this.unbindGlobalListeners();
        if (this.triggerEventListener) {
            this.triggerEventListener();
        }
        if (this.containerViewChild && this.autoZIndex) {
            ZIndexUtils.clear(this.containerViewChild.nativeElement);
        }
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }
}
ContextMenu.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ContextMenu, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i5.ContextMenuService }, { token: i5.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
ContextMenu.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ContextMenu, selector: "p-contextMenu", inputs: { model: "model", global: "global", target: "target", style: "style", styleClass: "styleClass", appendTo: "appendTo", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", triggerEvent: "triggerEvent" }, outputs: { onShow: "onShow", onHide: "onHide" }, viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="'p-contextmenu p-component'" [class]="styleClass" [ngStyle]="style">
            <p-contextMenuSub [item]="model" [root]="true"></p-contextMenuSub>
        </div>
    `, isInline: true, styles: [".p-contextmenu{position:absolute;display:none}.p-contextmenu ul{margin:0;padding:0;list-style:none}.p-contextmenu .p-submenu-list{position:absolute;min-width:100%;z-index:1;display:none}.p-contextmenu .p-menuitem-link{cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden;position:relative}.p-contextmenu .p-menuitem-text{line-height:1}.p-contextmenu .p-menuitem{position:relative}.p-contextmenu .p-menuitem-link .p-submenu-icon{margin-left:auto}.p-contextmenu .p-menuitem-active>p-contextmenusub>.p-submenu-list.p-submenu-list-active{display:block!important}"], components: [{ type: ContextMenuSub, selector: "p-contextMenuSub", inputs: ["item", "root", "parentItemKey"], outputs: ["leafClick"] }], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ContextMenu, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-contextMenu',
                    template: `
        <div #container [ngClass]="'p-contextmenu p-component'" [class]="styleClass" [ngStyle]="style">
            <p-contextMenuSub [item]="model" [root]="true"></p-contextMenuSub>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./contextmenu.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i5.ContextMenuService }, { type: i5.PrimeNGConfig }]; }, propDecorators: { model: [{
                type: Input
            }], global: [{
                type: Input
            }], target: [{
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
            }], triggerEvent: [{
                type: Input
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }] } });
export class ContextMenuModule {
}
ContextMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ContextMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ContextMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ContextMenuModule, declarations: [ContextMenu, ContextMenuSub], imports: [CommonModule, RouterModule, RippleModule, TooltipModule], exports: [ContextMenu, RouterModule, TooltipModule] });
ContextMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ContextMenuModule, providers: [ContextMenuService], imports: [[CommonModule, RouterModule, RippleModule, TooltipModule], RouterModule, TooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ContextMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, RippleModule, TooltipModule],
                    exports: [ContextMenu, RouterModule, TooltipModule],
                    declarations: [ContextMenu, ContextMenuSub],
                    providers: [ContextMenuService]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dG1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvY29udGV4dG1lbnUvY29udGV4dG1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBQyxTQUFTLEVBQW9DLEtBQUssRUFBQyxNQUFNLEVBQVcsTUFBTSxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQVEsWUFBWSxFQUFDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUMzTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQVksa0JBQWtCLEVBQWlCLE1BQU0sYUFBYSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7O0FBa0NoRCxNQUFNLE9BQU8sY0FBYztJQXNCdkIsWUFBbUQsV0FBVztRQWRwRCxjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFleEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUEwQixDQUFDO0lBQ2xELENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLCtCQUErQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJ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RSxDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLGFBQWEsQ0FBQztvQkFDL0QsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFDLFlBQVksRUFBQyxhQUFhLENBQUM7b0JBQ2pELFlBQVksRUFBRSxDQUFDLFdBQVcsRUFBQyxjQUFjLENBQUM7b0JBQzFDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2lCQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyVmlld0luaXQsT25EZXN0cm95LElucHV0LE91dHB1dCxSZW5kZXJlcjIsSW5qZWN0LGZvcndhcmRSZWYsVmlld0NoaWxkLE5nWm9uZSxFdmVudEVtaXR0ZXIsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBNZW51SXRlbSwgQ29udGV4dE1lbnVTZXJ2aWNlLCBQcmltZU5HQ29uZmlnIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgWkluZGV4VXRpbHMgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY29udGV4dE1lbnVTdWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx1bCAjc3VibGlzdCBbbmdDbGFzc109XCJ7J3Atc3VibWVudS1saXN0Jzohcm9vdH1cIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY2hpbGQgbGV0LWluZGV4PVwiaW5kZXhcIiBbbmdGb3JPZl09XCIocm9vdCA/IGl0ZW0gOiBpdGVtLml0ZW1zKVwiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cImNoaWxkLnNlcGFyYXRvclwiICNtZW51aXRlbSBjbGFzcz1cInAtbWVudS1zZXBhcmF0b3JcIiBbbmdDbGFzc109XCJ7J3AtaGlkZGVuJzogY2hpbGQudmlzaWJsZSA9PT0gZmFsc2V9XCIgcm9sZT1cInNlcGFyYXRvclwiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFjaGlsZC5zZXBhcmF0b3JcIiAjbWVudWl0ZW0gW25nQ2xhc3NdPVwieydwLW1lbnVpdGVtJzp0cnVlLCdwLW1lbnVpdGVtLWFjdGl2ZSc6IGlzQWN0aXZlKGdldEtleShpbmRleCkpLCdwLWhpZGRlbic6IGNoaWxkLnZpc2libGUgPT09IGZhbHNlfVwiIFtuZ1N0eWxlXT1cImNoaWxkLnN0eWxlXCIgW2NsYXNzXT1cImNoaWxkLnN0eWxlQ2xhc3NcIiBwVG9vbHRpcCBbdG9vbHRpcE9wdGlvbnNdPVwiY2hpbGQudG9vbHRpcE9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJvbkl0ZW1Nb3VzZUVudGVyKCRldmVudCxjaGlsZCxnZXRLZXkoaW5kZXgpKVwiIChtb3VzZWxlYXZlKT1cIm9uSXRlbU1vdXNlTGVhdmUoJGV2ZW50LGNoaWxkKVwiIHJvbGU9XCJub25lXCIgW2F0dHIuZGF0YS1pa109XCJnZXRLZXkoaW5kZXgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIWNoaWxkLnJvdXRlckxpbmtcIiBbYXR0ci5ocmVmXT1cImNoaWxkLnVybCA/IGNoaWxkLnVybCA6IG51bGxcIiBbYXR0ci50YXJnZXRdPVwiY2hpbGQudGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiY2hpbGQudGl0bGVcIiBbYXR0ci5pZF09XCJjaGlsZC5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJjaGlsZC5kaXNhYmxlZCA/IG51bGwgOiAnMCdcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCBjaGlsZCwgbWVudWl0ZW0sIGdldEtleShpbmRleCkpXCIgW25nQ2xhc3NdPVwieydwLW1lbnVpdGVtLWxpbmsnOnRydWUsJ3AtZGlzYWJsZWQnOmNoaWxkLmRpc2FibGVkfVwiIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGFzcG9wdXBdPVwiaXRlbS5pdGVtcyAhPSBudWxsXCIgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJpc0FjdGl2ZShnZXRLZXkoaW5kZXgpKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIiAqbmdJZj1cImNoaWxkLmljb25cIiBbbmdDbGFzc109XCJjaGlsZC5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cImNoaWxkLmVzY2FwZSAhPT0gZmFsc2U7IGVsc2UgaHRtbExhYmVsXCI+e3tjaGlsZC5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sTGFiZWw+PHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cImNoaWxkLmxhYmVsXCI+PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtc3VibWVudS1pY29uIHBpIHBpLWFuZ2xlLXJpZ2h0XCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cImNoaWxkLnJvdXRlckxpbmtcIiBbcm91dGVyTGlua109XCJjaGlsZC5yb3V0ZXJMaW5rXCIgW3F1ZXJ5UGFyYW1zXT1cImNoaWxkLnF1ZXJ5UGFyYW1zXCIgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3AtbWVudWl0ZW0tbGluay1hY3RpdmUnXCIgcm9sZT1cIm1lbnVpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJjaGlsZC5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc3x8e2V4YWN0OmZhbHNlfVwiIFthdHRyLnRhcmdldF09XCJjaGlsZC50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJjaGlsZC50aXRsZVwiIFthdHRyLmlkXT1cImNoaWxkLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiY2hpbGQuZGlzYWJsZWQgPyBudWxsIDogJzAnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsIGNoaWxkLCBtZW51aXRlbSwgZ2V0S2V5KGluZGV4KSlcIiBbbmdDbGFzc109XCJ7J3AtbWVudWl0ZW0tbGluayc6dHJ1ZSwncC1kaXNhYmxlZCc6Y2hpbGQuZGlzYWJsZWR9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlIFtmcmFnbWVudF09XCJjaGlsZC5mcmFnbWVudFwiIFtxdWVyeVBhcmFtc0hhbmRsaW5nXT1cImNoaWxkLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIiBbcHJlc2VydmVGcmFnbWVudF09XCJjaGlsZC5wcmVzZXJ2ZUZyYWdtZW50XCIgW3NraXBMb2NhdGlvbkNoYW5nZV09XCJjaGlsZC5za2lwTG9jYXRpb25DaGFuZ2VcIiBbcmVwbGFjZVVybF09XCJjaGlsZC5yZXBsYWNlVXJsXCIgW3N0YXRlXT1cImNoaWxkLnN0YXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0taWNvblwiICpuZ0lmPVwiY2hpbGQuaWNvblwiIFtuZ0NsYXNzXT1cImNoaWxkLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiICpuZ0lmPVwiY2hpbGQuZXNjYXBlICE9PSBmYWxzZTsgZWxzZSBodG1sUm91dGVMYWJlbFwiPnt7Y2hpbGQubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbFJvdXRlTGFiZWw+PHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cImNoaWxkLmxhYmVsXCI+PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtc3VibWVudS1pY29uIHBpIHBpLWFuZ2xlLXJpZ2h0XCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8cC1jb250ZXh0TWVudVN1YiBbcGFyZW50SXRlbUtleV09XCJnZXRLZXkoaW5kZXgpXCIgW2l0ZW1dPVwiY2hpbGRcIiAqbmdJZj1cImNoaWxkLml0ZW1zXCIgKGxlYWZDbGljayk9XCJvbkxlYWZDbGljaygpXCI+PC9wLWNvbnRleHRNZW51U3ViPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3VsPlxuICAgIGAsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudVN1YiB7XG5cbiAgICBASW5wdXQoKSBpdGVtOiBNZW51SXRlbTtcblxuICAgIEBJbnB1dCgpIHJvb3Q6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBwYXJlbnRJdGVtS2V5OiBhbnk7XG5cbiAgICBAT3V0cHV0KCkgbGVhZkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ3N1Ymxpc3QnKSBzdWJsaXN0Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnbWVudWl0ZW0nKSBtZW51aXRlbVZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIGNvbnRleHRNZW51OiBDb250ZXh0TWVudTtcblxuICAgIGFjdGl2ZUl0ZW1LZXk6IHN0cmluZztcblxuICAgIGhpZGVUaW1lb3V0OiBhbnk7XG5cbiAgICBhY3RpdmVJdGVtS2V5Q2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQ29udGV4dE1lbnUpKSBjb250ZXh0TWVudSkge1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51ID0gY29udGV4dE1lbnUgYXMgQ29udGV4dE1lbnU7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbUtleUNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuY29udGV4dE1lbnUuY29udGV4dE1lbnVTZXJ2aWNlLmFjdGl2ZUl0ZW1LZXlDaGFuZ2UkLnBpcGUodGFrZVVudGlsKHRoaXMuY29udGV4dE1lbnUubmdEZXN0cm95JCkpLnN1YnNjcmliZSgoYWN0aXZlSXRlbUtleSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtS2V5ID0gYWN0aXZlSXRlbUtleTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUodGhpcy5wYXJlbnRJdGVtS2V5KSAmJiBEb21IYW5kbGVyLmhhc0NsYXNzKHRoaXMuc3VibGlzdFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAncC1zdWJtZW51LWxpc3QtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51LnBvc2l0aW9uU3VibWVudSh0aGlzLnN1Ymxpc3RWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uSXRlbU1vdXNlRW50ZXIoZXZlbnQsIGl0ZW0sIGtleSkge1xuICAgICAgICBpZiAodGhpcy5oaWRlVGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZVRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5oaWRlVGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgIGxldCBjaGlsZFN1Ymxpc3QgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoZXZlbnQuY3VycmVudFRhcmdldCwgJy5wLXN1Ym1lbnUtbGlzdCcpO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhjaGlsZFN1Ymxpc3QsICdwLXN1Ym1lbnUtbGlzdC1hY3RpdmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUuY29udGV4dE1lbnVTZXJ2aWNlLmNoYW5nZUtleShrZXkpO1xuICAgIH1cblxuICAgIG9uSXRlbU1vdXNlTGVhdmUoZXZlbnQsIGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbnRleHRNZW51LmVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoPE5vZGU+IGV2ZW50LnRvRWxlbWVudCkpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudS5yZW1vdmVBY3RpdmVGcm9tU3ViTGlzdHMoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5yb290KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudS5jb250ZXh0TWVudVNlcnZpY2UuY2hhbmdlS2V5KHRoaXMucGFyZW50SXRlbUtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1DbGljayhldmVudCwgaXRlbSwgbWVudWl0ZW0sIGtleSkge1xuICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXRlbS51cmwgJiYgIWl0ZW0ucm91dGVyTGluaykge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtLmNvbW1hbmQpIHtcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS5pdGVtcykge1xuICAgICAgICAgICAgbGV0IGNoaWxkU3VibGlzdCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShtZW51aXRlbSwgJy5wLXN1Ym1lbnUtbGlzdCcpO1xuXG4gICAgICAgICAgICBpZiAoY2hpbGRTdWJsaXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUoa2V5KSAmJiBEb21IYW5kbGVyLmhhc0NsYXNzKGNoaWxkU3VibGlzdCwgJ3Atc3VibWVudS1saXN0LWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUucmVtb3ZlQWN0aXZlRnJvbVN1Ykxpc3RzKG1lbnVpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoY2hpbGRTdWJsaXN0LCAncC1zdWJtZW51LWxpc3QtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudS5jb250ZXh0TWVudVNlcnZpY2UuY2hhbmdlS2V5KGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMub25MZWFmQ2xpY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTGVhZkNsaWNrKCkge1xuICAgICAgICBpZiAodGhpcy5yb290KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51LmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGVhZkNsaWNrLmVtaXQoKTtcbiAgICB9XG5cbiAgICBnZXRLZXkoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm9vdCA/IFN0cmluZyhpbmRleCkgOiB0aGlzLnBhcmVudEl0ZW1LZXkgKyAnXycgKyBpbmRleDtcbiAgICB9XG5cbiAgICBpc0FjdGl2ZShrZXkpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmFjdGl2ZUl0ZW1LZXkgJiYodGhpcy5hY3RpdmVJdGVtS2V5LnN0YXJ0c1dpdGgoa2V5ICsgJ18nKSB8fCB0aGlzLmFjdGl2ZUl0ZW1LZXkgPT09IGtleSkpO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWNvbnRleHRNZW51JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwiJ3AtY29udGV4dG1lbnUgcC1jb21wb25lbnQnXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiPlxuICAgICAgICAgICAgPHAtY29udGV4dE1lbnVTdWIgW2l0ZW1dPVwibW9kZWxcIiBbcm9vdF09XCJ0cnVlXCI+PC9wLWNvbnRleHRNZW51U3ViPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vY29udGV4dG1lbnUuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XG5cbiAgICBASW5wdXQoKSBnbG9iYWw6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSB0YXJnZXQ6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogYW55O1xuXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgdHJpZ2dlckV2ZW50OiBzdHJpbmcgPSAnY29udGV4dG1lbnUnO1xuXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25IaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYW55O1xuXG4gICAgZG9jdW1lbnRLZXlkb3duTGlzdGVuZXI6IGFueTtcblxuICAgIHdpbmRvd1Jlc2l6ZUxpc3RlbmVyOiBhbnk7XG5cbiAgICB0cmlnZ2VyRXZlbnRMaXN0ZW5lcjogYW55O1xuXG4gICAgbmdEZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgem9uZTogTmdab25lLCBwdWJsaWMgY29udGV4dE1lbnVTZXJ2aWNlOiBDb250ZXh0TWVudVNlcnZpY2UsIHByaXZhdGUgY29uZmlnOiBQcmltZU5HQ29uZmlnKSB7IH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2xvYmFsKSB7XG4gICAgICAgICAgICBjb25zdCBkb2N1bWVudFRhcmdldDogYW55ID0gdGhpcy5lbCA/IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50IDogJ2RvY3VtZW50JztcblxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnRMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50VGFyZ2V0LCB0aGlzLnRyaWdnZXJFdmVudCwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50TGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLnRhcmdldCwgdGhpcy50cmlnZ2VyRXZlbnQsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhldmVudCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsIHRoaXMuYXBwZW5kVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdyhldmVudD86IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbihldmVudCk7XG4gICAgICAgIHRoaXMubW92ZU9uVG9wKCk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIERvbUhhbmRsZXIuZmFkZUluKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsIDI1MCk7XG4gICAgICAgIHRoaXMuYmluZEdsb2JhbExpc3RlbmVycygpO1xuXG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25TaG93LmVtaXQoKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVuYmluZEdsb2JhbExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLm9uSGlkZS5lbWl0KCk7XG4gICAgfVxuXG4gICAgbW92ZU9uVG9wKCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4ICYmIHRoaXMuY29udGFpbmVyVmlld0NoaWxkICYmIHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSAhPT0gJ2Jsb2NrJykge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuc2V0KCdtZW51JywgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgdGhpcy5iYXNlWkluZGV4ICsgdGhpcy5jb25maWcuekluZGV4Lm1lbnUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlKGV2ZW50PzogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vZmZzZXRQYXJlbnQpXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zaG93KGV2ZW50KTtcbiAgICB9XG5cbiAgICBwb3NpdGlvbihldmVudD86IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgbGVmdCA9IGV2ZW50LnBhZ2VYICsgMTtcbiAgICAgICAgICAgIGxldCB0b3AgPSBldmVudC5wYWdlWSArIDE7XG4gICAgICAgICAgICBsZXQgd2lkdGggPSB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudCA/IHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggOiBEb21IYW5kbGVyLmdldEhpZGRlbkVsZW1lbnRPdXRlcldpZHRoKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQub2Zmc2V0UGFyZW50ID8gdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgOiBEb21IYW5kbGVyLmdldEhpZGRlbkVsZW1lbnRPdXRlckhlaWdodCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGxldCB2aWV3cG9ydCA9IERvbUhhbmRsZXIuZ2V0Vmlld3BvcnQoKTtcblxuICAgICAgICAgICAgLy9mbGlwXG4gICAgICAgICAgICBpZiAobGVmdCArIHdpZHRoIC0gZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0ID4gdmlld3BvcnQud2lkdGgpIHtcbiAgICAgICAgICAgICAgICBsZWZ0IC09IHdpZHRoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2ZsaXBcbiAgICAgICAgICAgIGlmICh0b3AgKyBoZWlnaHQgLSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA+IHZpZXdwb3J0LmhlaWdodCkge1xuICAgICAgICAgICAgICAgIHRvcCAtPSBoZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vZml0XG4gICAgICAgICAgICBpZiAobGVmdCA8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vZml0XG4gICAgICAgICAgICBpZiAodG9wIDwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3ApIHtcbiAgICAgICAgICAgICAgICB0b3AgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IHRvcCArICdweCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb3NpdGlvblN1Ym1lbnUoc3VibGlzdCkge1xuICAgICAgICBsZXQgcGFyZW50TWVudUl0ZW0gPSBzdWJsaXN0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgbGV0IHZpZXdwb3J0ID0gRG9tSGFuZGxlci5nZXRWaWV3cG9ydCgpO1xuICAgICAgICBsZXQgc3VibGlzdFdpZHRoID0gc3VibGlzdC5vZmZzZXRQYXJlbnQgPyBzdWJsaXN0Lm9mZnNldFdpZHRoIDogRG9tSGFuZGxlci5nZXRIaWRkZW5FbGVtZW50T3V0ZXJXaWR0aChzdWJsaXN0KTtcbiAgICAgICAgbGV0IHN1Ymxpc3RIZWlnaHQgPSBzdWJsaXN0Lm9mZnNldEhlaWdodCA/IHN1Ymxpc3Qub2Zmc2V0SGVpZ2h0IDogRG9tSGFuZGxlci5nZXRIaWRkZW5FbGVtZW50T3V0ZXJIZWlnaHQoc3VibGlzdCk7XG4gICAgICAgIGxldCBpdGVtT3V0ZXJXaWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aChwYXJlbnRNZW51SXRlbS5jaGlsZHJlblswXSk7XG4gICAgICAgIGxldCBpdGVtT3V0ZXJIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHBhcmVudE1lbnVJdGVtLmNoaWxkcmVuWzBdKTtcbiAgICAgICAgbGV0IGNvbnRhaW5lck9mZnNldCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHBhcmVudE1lbnVJdGVtLnBhcmVudEVsZW1lbnQpO1xuXG4gICAgICAgIHN1Ymxpc3Quc3R5bGUuekluZGV4ID0gKytEb21IYW5kbGVyLnppbmRleDtcblxuICAgICAgICBpZiAoKHBhcnNlSW50KGNvbnRhaW5lck9mZnNldC50b3ApICsgaXRlbU91dGVySGVpZ2h0ICsgc3VibGlzdEhlaWdodCkgPiAodmlld3BvcnQuaGVpZ2h0IC0gRG9tSGFuZGxlci5jYWxjdWxhdGVTY3JvbGxiYXJIZWlnaHQoKSkpIHtcbiAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RvcCcpO1xuICAgICAgICAgICAgc3VibGlzdC5zdHlsZS5ib3R0b20gPSAnMHB4JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2JvdHRvbScpO1xuICAgICAgICAgICAgc3VibGlzdC5zdHlsZS50b3AgPSAnMHB4JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgocGFyc2VJbnQoY29udGFpbmVyT2Zmc2V0LmxlZnQpICsgaXRlbU91dGVyV2lkdGggKyBzdWJsaXN0V2lkdGgpID4gKHZpZXdwb3J0LndpZHRoIC0gRG9tSGFuZGxlci5jYWxjdWxhdGVTY3JvbGxiYXJXaWR0aCgpKSkge1xuICAgICAgICAgICAgc3VibGlzdC5zdHlsZS5sZWZ0ID0gLXN1Ymxpc3RXaWR0aCArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdWJsaXN0LnN0eWxlLmxlZnQgPSBpdGVtT3V0ZXJXaWR0aCArICdweCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0l0ZW1NYXRjaGVkKG1lbnVpdGVtKSB7XG4gICAgICAgIHJldHVybiBEb21IYW5kbGVyLmhhc0NsYXNzKG1lbnVpdGVtLCAncC1tZW51aXRlbScpICYmICFEb21IYW5kbGVyLmhhc0NsYXNzKG1lbnVpdGVtLmNoaWxkcmVuWzBdLCAncC1kaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGZpbmROZXh0SXRlbShtZW51aXRlbSwgaXNSZXBlYXRlZD8pIHtcbiAgICAgICAgbGV0IG5leHRNZW51aXRlbSA9IG1lbnVpdGVtLm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAobmV4dE1lbnVpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc0l0ZW1NYXRjaGVkKG5leHRNZW51aXRlbSkgPyBuZXh0TWVudWl0ZW0gOiB0aGlzLmZpbmROZXh0SXRlbShuZXh0TWVudWl0ZW0sIGlzUmVwZWF0ZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IGZpcnN0SXRlbSA9IG1lbnVpdGVtLnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMF07XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzSXRlbU1hdGNoZWQoZmlyc3RJdGVtKSA/IGZpcnN0SXRlbSA6ICghaXNSZXBlYXRlZCA/IHRoaXMuZmluZE5leHRJdGVtKGZpcnN0SXRlbSwgdHJ1ZSkgOiBudWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRQcmV2SXRlbShtZW51aXRlbSwgaXNSZXBlYXRlZD8pIHtcbiAgICAgICAgbGV0IHByZXZNZW51aXRlbSA9IG1lbnVpdGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKHByZXZNZW51aXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNJdGVtTWF0Y2hlZChwcmV2TWVudWl0ZW0pID8gcHJldk1lbnVpdGVtIDogdGhpcy5maW5kUHJldkl0ZW0ocHJldk1lbnVpdGVtLCBpc1JlcGVhdGVkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBsYXN0SXRlbSA9IG1lbnVpdGVtLnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bbWVudWl0ZW0ucGFyZW50RWxlbWVudC5jaGlsZHJlbi5sZW5ndGggLSAxXTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNJdGVtTWF0Y2hlZChsYXN0SXRlbSkgPyBsYXN0SXRlbSA6ICghaXNSZXBlYXRlZCA/IHRoaXMuZmluZFByZXZJdGVtKGxhc3RJdGVtLCB0cnVlKSA6IG51bGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QWN0aXZlSXRlbSgpIHtcbiAgICAgICAgbGV0IGFjdGl2ZUl0ZW1LZXkgPSB0aGlzLmNvbnRleHRNZW51U2VydmljZS5hY3RpdmVJdGVtS2V5O1xuXG4gICAgICAgIHJldHVybiBhY3RpdmVJdGVtS2V5ID09IG51bGwgPyBudWxsIDogRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC1tZW51aXRlbVtkYXRhLWlrPVwiJyArIGFjdGl2ZUl0ZW1LZXkgKyAnXCJdJyk7XG4gICAgfVxuXG4gICAgY2xlYXJBY3RpdmVJdGVtKCkge1xuICAgICAgICBpZiAodGhpcy5jb250ZXh0TWVudVNlcnZpY2UuYWN0aXZlSXRlbUtleSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBY3RpdmVGcm9tU3ViTGlzdHModGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51U2VydmljZS5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlQWN0aXZlRnJvbVN1Ykxpc3RzKGVsKSB7XG4gICAgICAgIGxldCBzdWJsaXN0cyA9IERvbUhhbmRsZXIuZmluZChlbCwgJy5wLXN1Ym1lbnUtbGlzdC1hY3RpdmUnKTtcblxuICAgICAgICBmb3IgKGxldCBzdWJsaXN0IG9mIHN1Ymxpc3RzKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHN1Ymxpc3QsICdwLXN1Ym1lbnUtbGlzdC1hY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUFjdGl2ZUZyb21TdWJsaXN0KG1lbnVpdGVtKSB7XG4gICAgICAgIGlmIChtZW51aXRlbSkge1xuICAgICAgICAgICAgbGV0IHN1Ymxpc3QgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUobWVudWl0ZW0sICcucC1zdWJtZW51LWxpc3QnKTtcblxuICAgICAgICAgICAgaWYgKHN1Ymxpc3QgJiYgRG9tSGFuZGxlci5oYXNDbGFzcyhtZW51aXRlbSwgJ3Atc3VibWVudS1saXN0LWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhtZW51aXRlbSwgJ3Atc3VibWVudS1saXN0LWFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZEdsb2JhbExpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgY29uc3QgZG9jdW1lbnRUYXJnZXQ6IGFueSA9IHRoaXMuZWwgPyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudCA6ICdkb2N1bWVudCc7XG5cbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnRUYXJnZXQsICdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudCAmJiB0aGlzLmlzT3V0c2lkZUNsaWNrZWQoZXZlbnQpICYmICFldmVudC5jdHJsS2V5ICYmIGV2ZW50LmJ1dHRvbiAhPT0gMikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMud2luZG93UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMud2luZG93UmVzaXplTGlzdGVuZXIgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMud2luZG93UmVzaXplTGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRLZXlkb3duTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvY3VtZW50VGFyZ2V0OiBhbnkgPSB0aGlzLmVsID8gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQgOiAnZG9jdW1lbnQnO1xuXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50S2V5ZG93bkxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnRUYXJnZXQsICdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZUl0ZW0gPSB0aGlzLmdldEFjdGl2ZUl0ZW0oKTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWN0aXZlRnJvbVN1Ymxpc3QoYWN0aXZlSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlSXRlbSA9IHRoaXMuZmluZE5leHRJdGVtKGFjdGl2ZUl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpcnN0SXRlbSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtbWVudWl0ZW0tbGluaycpLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlSXRlbSA9IHRoaXMuaXNJdGVtTWF0Y2hlZChmaXJzdEl0ZW0pID8gZmlyc3RJdGVtIDogdGhpcy5maW5kTmV4dEl0ZW0oZmlyc3RJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51U2VydmljZS5jaGFuZ2VLZXkoYWN0aXZlSXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWsnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBY3RpdmVGcm9tU3VibGlzdChhY3RpdmVJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVJdGVtID0gdGhpcy5maW5kUHJldkl0ZW0oYWN0aXZlSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3VibGlzdCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFzdEl0ZW0gPSBzdWJsaXN0LmNoaWxkcmVuW3N1Ymxpc3QuY2hpbGRyZW4ubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlSXRlbSA9IHRoaXMuaXNJdGVtTWF0Y2hlZChsYXN0SXRlbSkgPyBsYXN0SXRlbSA6IHRoaXMuZmluZFByZXZJdGVtKGxhc3RJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51U2VydmljZS5jaGFuZ2VLZXkoYWN0aXZlSXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWsnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1Ymxpc3QgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoYWN0aXZlSXRlbSwgJy5wLXN1Ym1lbnUtbGlzdCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1Ymxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhzdWJsaXN0LCAncC1zdWJtZW51LWxpc3QtYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlSXRlbSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShzdWJsaXN0LCAnLnAtbWVudWl0ZW0tbGluazpub3QoLnAtZGlzYWJsZWQpJykucGFyZW50RWxlbWVudDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudVNlcnZpY2UuY2hhbmdlS2V5KGFjdGl2ZUl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlrJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1Ymxpc3QgPSBhY3RpdmVJdGVtLnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VibGlzdCAmJiBEb21IYW5kbGVyLmhhc0NsYXNzKHN1Ymxpc3QsICdwLXN1Ym1lbnUtbGlzdC1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHN1Ymxpc3QsICdwLXN1Ym1lbnUtbGlzdC1hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVJdGVtID0gc3VibGlzdC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnVTZXJ2aWNlLmNoYW5nZUtleShhY3RpdmVJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1paycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVJdGVtQ2xpY2soZXZlbnQsIHRoaXMuZmluZE1vZGVsSXRlbUZyb21LZXkodGhpcy5jb250ZXh0TWVudVNlcnZpY2UuYWN0aXZlSXRlbUtleSksIGFjdGl2ZUl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZE1vZGVsSXRlbUZyb21LZXkoa2V5KSB7XG4gICAgICAgIGlmIChrZXkgPT0gbnVsbCB8fCAhdGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW5kZXhlcyA9IGtleS5zcGxpdCgnXycpO1xuICAgICAgICByZXR1cm4gaW5kZXhlcy5yZWR1Y2UoKGl0ZW0sIGN1cnJlbnRJbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0gPyBpdGVtLml0ZW1zW2N1cnJlbnRJbmRleF0gOiB0aGlzLm1vZGVsW2N1cnJlbnRJbmRleF07XG4gICAgICAgIH0sIG51bGwpO1xuICAgIH1cblxuICAgIGhhbmRsZUl0ZW1DbGljayhldmVudCwgaXRlbSwgbWVudWl0ZW0pIHtcbiAgICAgICAgaWYgKCFpdGVtIHx8IGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtLmNvbW1hbmQpIHtcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS5pdGVtcykge1xuICAgICAgICAgICAgbGV0IGNoaWxkU3VibGlzdCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShtZW51aXRlbSwgJy5wLXN1Ym1lbnUtbGlzdCcpO1xuXG4gICAgICAgICAgICBpZiAoY2hpbGRTdWJsaXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoY2hpbGRTdWJsaXN0LCAncC1zdWJtZW51LWxpc3QtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBY3RpdmVGcm9tU3ViTGlzdHMobWVudWl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhjaGlsZFN1Ymxpc3QsICdwLXN1Ym1lbnUtbGlzdC1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvblN1Ym1lbnUoY2hpbGRTdWJsaXN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kR2xvYmFsTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy53aW5kb3dSZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMud2luZG93UmVzaXplTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy53aW5kb3dSZXNpemVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudEtleWRvd25MaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEtleWRvd25MaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEtleWRvd25MaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbldpbmRvd1Jlc2l6ZShldmVudCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNPdXRzaWRlQ2xpY2tlZChldmVudDogRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuICEodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGV2ZW50LnRhcmdldCkgfHwgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRHbG9iYWxMaXN0ZW5lcnMoKTtcblxuICAgICAgICBpZiAodGhpcy50cmlnZ2VyRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnRMaXN0ZW5lcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyVmlld0NoaWxkICYmIHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uZ0Rlc3Ryb3kkLm5leHQodHJ1ZSk7XG4gICAgICAgIHRoaXMubmdEZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIH1cblxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsUm91dGVyTW9kdWxlLFJpcHBsZU1vZHVsZSxUb29sdGlwTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQ29udGV4dE1lbnUsUm91dGVyTW9kdWxlLFRvb2x0aXBNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0NvbnRleHRNZW51LENvbnRleHRNZW51U3ViXSxcbiAgICBwcm92aWRlcnM6IFtDb250ZXh0TWVudVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51TW9kdWxlIHsgfVxuIl19